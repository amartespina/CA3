let sortAscendingOrder = true
let superheroesToView = []
let primeravez = true
let hideSearch = true
let hideAddSuperhero = true
let hideModifySuperhero = true
let uniqueId = 1
let encontrado = false 
let admin = false 



function playAudio(){
    console.log("funcion play audio")
    var audio = document.getElementById("audio");
    audio.play()
}

// Show 
function showSearchByName(){
    
    if(hideSearch){
        document.getElementById("searchByName").style.display = "block";
        hideSearch = false
    }
    else {document.getElementById("searchByName").style.display = "none"; hideSearch=true}

}

function showAddSuperhero(){
    
    if(hideAddSuperhero){
        document.getElementById("FormToAddSuperhero").style.display = "block";
        hideAddSuperhero = false
    }
    else {document.getElementById("FormToAddSuperhero").style.display = "none"; hideAddSuperhero=true}

}

function showModifySuperhero(){
    
    if(hideModifySuperhero){
        document.getElementById("formToModifySuperhero").style.display = "block";
        hideModifySuperhero = false
    }
    else {document.getElementById("formToModifySuperhero").style.display = "none"; hideModifySuperhero=true}

}

// READ USERS AND VALIDATION 
    window.onload = () =>
{
    let url = `users.json`      /* name of the JSON file */
    
    fetch(url)
    .then(response => response.json())
    .then(jsonData => 
    {
        peopleData = jsonData
        console.log(peopleData)
    }
    )
}

function UserValidation(){
    let username= document.getElementById('email').value
    let password= document.getElementById('password').value

    //let jsonUser = JSON.stringify(peopleData)
    peopleData.forEach(person => {
        if(person.email === username && person.password=== password && person.isAdministrator==="true"){
            encontrado  = true 
            admin = true 
        }
        if(person.email === username && person.password=== password && person.isAdministrator==="false"){
            encontrado  = true 
            admin = false 
        }
    })
    if(!encontrado){ document.getElementById("nomatch").style.display='block';playAudio()}
    if(encontrado && admin){
        document.getElementById("page").style.display='block';
        document.getElementById("log-in-part").style.display= 'none';   
        document.getElementById("navmodifysuperhero").style.display='block';
        document.getElementById("navaddsuperhero").style.display='block';
        
    } 
    if(encontrado && !admin){ 
    document.getElementById("page").style.display='block';
    document.getElementById("log-in-part").style.display= 'none'
    }
        
}


function viewJSONData(arrayToView){
    let url = `superhero.json`
    // let url = `https://pkgstore.datahub.io/five-thirty-eight/comic-characters/dc-wikia-data_json/data/8b35699325a97475673d4255ab21d4df/dc-wikia-data_json.json`
    fetch(url)
    .then(response => response.json())
    .then(jsonData => 
    
    {
        if(primeravez){jsonData.forEach(superhero =>{
            let newSuperhero = {identificationNumber:uniqueId, align: superhero.align, alive: superhero.alive, appearances: superhero.appearances, eye: superhero.eye, firstAppearance: superhero.firstAppearance, hair: superhero.hair, id: superhero.id, name: superhero.name, pageId: superhero.page_id, sex:superhero.sex }
            uniqueId++
            superheroesToView.push(newSuperhero)
            primeravez = false
        })
    }
    {

        htmlString = `
        <table class="content-table">
            <thead>             
                    <tr>
                            <th> Identification <br> Number </th>
                              
                            <th> Align <ion-icon name="caret-down-outline" onclick="sortResultsbyAlign()"></ion-icon> </th>
                            <th> Alive <ion-icon name="caret-down-outline" onclick="sortResultsbyAlive()"></ion-icon></th>
                            <th> Eye <ion-icon name="caret-down-outline" onclick="sortResultsbyEye()"></ion-icon> </th>
                            <th> Hair <ion-icon name="caret-down-outline" onclick="sortResultsbyHair()"></ion-icon></th>
                            <th> Id <ion-icon name="caret-down-outline" onclick="sortResultsbyId()"></ion-icon></th>
                            <th> Sex <ion-icon name="caret-down-outline" onclick="sortResultsbySex()"></ion-icon></th>
                            <th> Name </th>`
    
                            if(admin){
                            htmlString+= `<th> </th>`
                            } 
        htmlString+=`
                    </tr>
            </thead>`
        arrayToView.map(superhero =>
        {
            htmlString +=              
            `<tbody>
                <tr> 
                    <td>${superhero.identificationNumber} </td>
                    <td>${superhero.align}</td>
                    <td>${superhero.alive}</td>
                    <td>${superhero.eye}</td>
                    <td>${superhero.hair}</td>
                    <td>${superhero.id}</td>
                    <td>${superhero.sex}</td>
                    <td>${superhero.name}</td>`
                    if(admin){
                    htmlString+= `<td  ><button onclick="deleteSuperhero(${superhero.identificationNumber})">Delete</button></td>`
                    }

               htmlString += `</tr>
            </tbody> `
        })
        //htmlString += `</table><br>${jsonData.length} records found.`
        htmlString += `</table>`
        document.getElementById('showsuperheroes').innerHTML = htmlString
    }})
}



// ADD  MODIFY AND DELETE 
function modifySuperhero(IdentificationNumber,align, alive, eye, hair, id, sex, name)

{


    superheroesToView.forEach(superhero => {
        
        if (superhero.identificationNumber === parseInt(IdentificationNumber))
        {
            //update the rest of the details
            superhero.align = align
            superhero.alive = alive
            superhero.eye = eye
            superhero.hair = hair
            superhero.id = id
            superhero.sex = sex
            superhero.name = name
        }
    })
    viewJSONData(superheroesToView)
}
function addSuperhero(align, alive, eye, hair, id, sex, name ){

    let newSuperhero = {identificationNumber:uniqueId, align: align, alive:alive ,eye:eye, hair:hair, id:id, sex:sex, name:name }

    superheroesToView.push(newSuperhero)
    uniqueId++
    viewJSONData(superheroesToView)

}

function deleteSuperhero(id)
{
    let selectedIndex = -1
    superheroesToView.forEach((superhero, index) => {
        if (superhero.identificationNumber === parseInt(id))
        {
            selectedIndex = index
        }
    })
    if (selectedIndex >= 0)
    {
        superheroesToView.splice(selectedIndex, 1)   

    }
    viewJSONData(superheroesToView)
}




 //  Search 

   function search(value){
    searchValue = value
   if(searchValue === "") {viewJSONData(superheroesToView)} 
    else { 
    let displayedsuperheroes = superheroesToView.filter(superhero => 
    superhero.name.includes(searchValue) || superhero.name.toLocaleLowerCase().includes(searchValue)
    )

    viewJSONData(displayedsuperheroes)}
}

function searchByAlign(align){
        const selectedHeroes = superheroes.filter(superhero => superhero.i=== align)
        viewJSONData(selectedHeroes)
    }   
 function searchByEye(eye){
        const selectedHeroesEye = superheroes.filter(superhero => superhero.eye===eye)
        viewJSONData(selectedHeroesEye)
    }
    
    



//  Sort 

function sortResultsbyAlign(){
    viewJSONData()
    let superheroesToSort = [...superheroesToView]
    if (sortAscendingOrder){
        superheroesToSort.sort((a, b) => a.align < b.align?1:-1) 
        sortAscendingOrder = false
                            }
    else{
        superheroesToSort.sort((a, b) =>  a.align< b.align?-1:1) 
        sortAscendingOrder = true   
        }  
    viewJSONData(superheroesToSort)
}
function sortResultsbyAlive(){
    viewJSONData()
    let superheroesToSort = [...superheroesToView]
    if (sortAscendingOrder){
        superheroesToSort.sort((a, b) => a.alive < b.alive?1:-1) 
        sortAscendingOrder = false
                            }
    else{
        superheroesToSort.sort((a, b) =>  a.alive< b.alive?-1:1) 
        sortAscendingOrder = true   
        }  
    viewJSONData(superheroesToSort)
}
function sortResultsbyEye(){
    viewJSONData()
    let superheroesToSort = [...superheroesToView]
    if (sortAscendingOrder){
        superheroesToSort.sort((a, b) => a.eye < b.eye?1:-1) 
        sortAscendingOrder = false
                            }
    else{
        superheroesToSort.sort((a, b) =>  a.eye< b.eye?-1:1) 
        sortAscendingOrder = true   
        }  
    viewJSONData(superheroesToSort)
}
function sortResultsbyHair(){
    let superheroesToSort = [...superheroesToView]
    if (sortAscendingOrder){
        superheroesToSort.sort((a, b) => a.hair < b.hair?1:-1) 
        sortAscendingOrder = false
                            }
    else{
        superheroesToSort.sort((a, b) =>  a.hair< b.hair?-1:1) 
        sortAscendingOrder = true   
        }  
    viewJSONData(superheroesToSort)
}

function sortResultsbyId(){
    viewJSONData()
    let superheroesToSort = [...superheroesToView]
    if (sortAscendingOrder){
        superheroesToSort.sort((a, b) => a.id < b.id?1:-1) 
        sortAscendingOrder = false
                            }
    else{
        superheroesToSort.sort((a, b) =>  a.id< b.id?-1:1) 
        sortAscendingOrder = true   
        }  
    viewJSONData(superheroesToSort)
}
function sortResultsbySex(){
    viewJSONData()
    let superheroesToSort = [...superheroesToView]
    if (sortAscendingOrder){
        superheroesToSort.sort((a, b) => a.sex < b.sex?1:-1) 
        sortAscendingOrder = false
                            }
    else{
        superheroesToSort.sort((a, b) =>  a.sex< b.sex?-1:1) 
        sortAscendingOrder = true   
        }  
    viewJSONData(superheroesToSort)
}

function filterAlive(){
    let aliveSuperheroes = superheroesToView.filter(superhero => superhero.alive === 'deceased characters')
    viewJSONData(aliveSuperheroes)
}
function filterFemale(){
    let aliveSuperheroes = superheroesToView.filter(superhero => superhero.sex === 'female characters')
    viewJSONData(aliveSuperheroes)
}





 /** Añado pero al darle a mostrar me los muestra x2
     * Al eliminar taconsolembien. 
     *
     *  */ 
    //let superheroes= $.getJSON("https://pkgstore.datahub.io/five-thirty-eight/comic-characters/dc-wikia-data_json/data/8b35699325a97475673d4255ab21d4df/dc-wikia-data_json.json") 


 



let sortAscendingOrder = true
let superheroesToView = []
let primeravez = true
let hideSearch = true
let hideAddSuperhero = true
let hideModifySuperhero = true
let uniqueId = 1
let encontrado = false 
let admin = false 
// Json data tiene los usuarios y contraseñas 

let peopleData

function prueba(argumento){
    console.log(argumento)
}
// FUunciones show 
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

// Leer Usuarios 
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





function viewJSONData(arrayToView){
    console.log("funcion viewJSONData")
    let url = `superhero.json`
    fetch(url)
    .then(response => response.json())
    .then(jsonData => 
    
    {
        if(primeravez){jsonData.forEach(superhero =>{
            console.log("primeraveztrue")
            let newSuperhero = {identificationNumber:uniqueId, align: superhero.align, alive: superhero.alive, appearances: superhero.appearances, eye: superhero.eye, firstAppearance: superhero.firstAppearance, hair: superhero.hair, id: superhero.id, name: superhero.name, pageId: superhero.page_id, sex:superhero.sex }
            uniqueId++
            superheroesToView.push(newSuperhero)
            primeravez = false
        })
    }
    {

    /**
     * model: car["car model"]
     */
        htmlString = `
        <table class="content-table">
            <thead>             
                    <tr>
                            <th> Identification <br> Number </th>    
                            <th> Align </th>
                            <th onclick="sortResultsbyAlive()"> Alive </th>
                            <th> Eye </th>
                            <th> Hair </th>
                            <th> Id </th>
                            <th> Sex </th>
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

function deleteSuperhero(id)
{
    console.log("funcion eliminar")
    console.log(id)
    //selectedIndex corresponds to the array key
    let selectedIndex = -1
    //iterate through the cars array to find the element to remove
    superheroesToView.forEach((superhero, index) => {
        if (superhero.identificationNumber === parseInt(id))
        {
            selectedIndex = index
        }
    })
    if (selectedIndex >= 0)
    {
        superheroesToView.splice(selectedIndex, 1)   
        console.log(superheroesToView)     
    }
    viewJSONData(superheroesToView)
}

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


 function UserValidation(){
        let username= document.getElementById('email').value
        let password= document.getElementById('password').value

        console.log('el username es  es' + username)
        console.log('la contrasña es' + password)

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
        if(!encontrado){ document.getElementById("nomatch").style.display='block';}
        if(encontrado && admin){console.log("welcomeadmin"  )
            document.getElementById("page").style.display='block';
            document.getElementById("log-in-part").style.display= 'none';   
            document.getElementById("navmodifysuperhero").style.display='block';
            document.getElementById("navaddsuperhero").style.display='block';
            
        } 
        if(encontrado && !admin){ console.log("welcome not admin")
        document.getElementById("page").style.display='block';
        document.getElementById("log-in-part").style.display= 'none'
        }
            
 }
     

   /** 
   function UserValidation(){
    let username= document.getElementById('email').value
    let password= document.getElementById('password').value
    console.log('el username es  es' + username)
    console.log('la contrasña es' + password)
    //let jsonUser = JSON.stringify(peopleData)
     for (var i in peopleData){
        if (peopleData[i].email === username && peopleData[i].password === password && peopleData[i].isAdministrator === "true") {
            alert("Welcome " + peopleData[i].name + " you are administrator")
            document.getElementById("log-in-part").style.display= 'none';
            document.getElementById("page").style.display='block';
            console.log(peopleData[i])   
        }
        else if (peopleData[i].email === username && peopleData[i].password === password && peopleData[i].isAdministrator === "false") {
            console.log("caso no adminsitrador")
            alert("Welcome " + peopleData[i].name + " you are not administrator")   
            console.log(peopleData[i])  
        }
        else {
            alert("You are not registred")}

        
    }
}

    */ 
     

   function search(value){
    searchValue = value
    //filter function. Cunado utilizamos la funcion serach utilizamos el filter-
   if(searchValue === "") {viewJSONData(superheroesToView)} 
    else { 
    let displayedsuperheroes = superheroesToView.filter(superhero => 
    superhero.name.includes(searchValue) || superhero.name.toLocaleLowerCase().includes(searchValue)
    )
    console.log(displayedsuperheroes)
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
    
    

    function addSuperhero(align, alive, eye, hair, id, sex, name ){
        console.log("funcion addSuperhero")
        let newSuperhero = {identificationNumber:uniqueId, align: align, alive:alive ,eye:eye, hair:hair, id:id, sex:sex, name:name }
        console.log(newSuperhero)
        superheroesToView.push(newSuperhero)
        uniqueId++
        viewJSONData(superheroesToView)

    }


    function sortResultsbyAlive(){
        console.log("estamos en sortResults")
    if (sortAscendingOrder){
        // sorted in ascending order
        // sort the employee array by forename in descending order
        superheroesToSort.sort((a, b) => a.alive < b.alive?1:-1) 
        sortAscendingOrder = false
                            }
    else{
        // sorted in descending order
        // sort the employee array by forename in ascending order
        superheroesToSort.sort((a, b) =>  a.alive< b.alive?-1:1) 
        sortAscendingOrder = true   
        }  
    // output the resulting array in a table
    viewJSONData(superheroesToSort)
    console.log(superheroesToSort)

}






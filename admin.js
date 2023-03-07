 /** Solo tiene que aparecer hasta sex ? 
     * He modificado el dataset. Estaba "first Appearance" y lo he ocnvertido a "FirstAppearance"
     * No he puesto gsm porque todo era null 
     * */ 
    //let superheroes= $.getJSON("https://pkgstore.datahub.io/five-thirty-eight/comic-characters/dc-wikia-data_json/data/8b35699325a97475673d4255ab21d4df/dc-wikia-data_json.json") 


 



let sortAscendingOrder = true
    
let uniqueId = 0
// Json data tiene los usuarios y contraseñas 

let peopleData


    window.onload = () =>
{
    let url = `users.json`      /* name of the JSON file */

    fetch(url)
    .then(response => response.json())
    .then(jsonData => 
    {
        peopleData = jsonData
    }
    )
}



function viewJSONData(arrayToView){
    let superheroesTOView = []
    
    console.log("funcion viewJSONData")
    let url = `superhero.json`
    fetch(url)
    .then(response => response.json())
    .then(jsonData => 
    {
        jsonData.forEach(superhero =>{
            let newSuperhero = {identificationNumber:uniqueId, align: superhero.align, alive: superhero.alive, appearances: superhero.appearances, eye: superhero.eye, firstAppearance: superhero.firstAppearance, hair: superhero.hair, id: superhero.id, name: superhero.name, pageId: superhero.page_id, sex:superhero.sex }
            uniqueId++
            superheroesTOView.push(newSuperhero)
            
        })

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
                            <th> Name </th>
                     </tr>
            </thead>`
        superheroesTOView.map(superhero =>
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
                    <td>${superhero.name}</td>
                    <td><button onclick="deleteSuperhero(${superhero.identificationNumber})">Delete</button></td>
                </tr>
            </tbody> `
        })
        htmlString += `</table><br>${jsonData.length} records found.`
        document.getElementById('prueba').innerHTML = htmlString
    })
}

function deleteSuperhero(id)
{
    console.log("funcion eliminar")
    console.log(id)
    //selectedIndex corresponds to the array key
    let selectedIndex = -1
    //iterate through the cars array to find the element to remove
    superheroesTOView.forEach((superhero, index) => {
        if (superhero.identificationNumber === parseInt(id))
        {
            selectedIndex = index
        }
    })
    if (selectedIndex >= 0)
    {
        superheroesTOView.splice(selectedIndex, 1)   
        console.log(superheroesTOView)     
    }
    viewJSONData()
}


    function UserValidation(){
        
        let username= document.getElementById('email').value
        let password= document.getElementById('password').value
        console.log('la contrasña es' + username)
        console.log('la contrasña es' + password)
        //let jsonUser = JSON.stringify(peopleData)
         for (var i in peopleData){
            if (peopleData[i].email === username && peopleData[i].password === password && peopleData[i].isAdministrator === "true") {
                
                alert("Welcome " + peopleData[i].name + " you are administrator")
                document.getElementById("log-in-part").style.display= 'none';
                document.getElementById("page").style.display='block';
                
                break;
            }
            if (peopleData[i].email === username && peopleData[i].password === password && peopleData[i].isAdministrator === "false") {
                alert("Welcome " + peopleData[i].name + " you are not administrator")   
                break;
            }
            else alert("You are not registred")
            break
         }
               

   }

/** 
    function viewJSONData(arrayToView){
        let preuba = 1
        htmlString = 
        `
        <p> ${arrayToView.length} items found </p>
        <table class="content-table">
            <thead>             
                    <tr>
                            <th> Identification Number </th>    
                            <th> Align </th>
                            <th onclick="sortResultsbyAlive()"> Alive </th>
                            <th onclick="sortResults()"> Appearances </th>
                            <th> Eye </th>
                            <th> First Appearance </th>
                            <th> Hair </th>
                            <th> Id </th>
                            <th> Name </th>
                            <th> page Id </th>
                            <th> Sex </th>
                     </tr>
            </thead>`
        arrayToView.forEach(element => 
            htmlString += 
             
                                                    `<tbody>
                                                        <tr> 
                                                            <td>${element.align} </td>
                                                            <td>${element.alive}</td>
                                                            <td>${element.appearances}</td>
                                                            <td>${element.eye}</td>
                                                            <td>${element.firstAppearance}
                                                            <td>${element.hair}</td>
                                                            <td>${element.id}</td>
                                                            <td>${element.name}</td>
                                                            <td>${element.pageId}</td>
                                                            <td>${element.sex}</td>
                                                        </tr>
                                                     
                                                    </tbody>`
                                     
                            )
                                                    

        htmlString += `</table>`

                document.getElementById("iddesuperheroes").innerHTML = htmlString    
    }
*/



/** 
    function search(value){
            searchValue = value
            //filter function. Cunado utilizamos la funcion serach utilizamos el filter-
           if(searchValue === "") {viewJSONData(superheroes)} 
            else { 
            let displayedsuperheroes = superheroes.filter(superhero => 
            superhero.align.includes(searchValue) || superhero.align.toLowerCase().includes(searchValue) ||
            superhero.alive.includes(searchValue) || superhero.alive.toLowerCase().includes(searchValue) ||
            superhero.appearances == searchValue || // Todo tipo integer. Por eso lo ponemos asi. 
            superhero.eye.includes(searchValue) || superhero.eye.toLocaleLowerCase().includes(searchValue) || 
            superhero.firstAppearance.includes(searchValue) || superhero.firstAppearance.toLocaleLowerCase().includes(searchValue) ||
            superhero.hair.includes(searchValue) || superhero.hair.toLocaleLowerCase().includes(searchValue) ||
            superhero.id.includes(searchValue) || superhero.id.toLocaleLowerCase().includes(searchValue) ||
            superhero.name.includes(searchValue) || superhero.name.toLocaleLowerCase().includes(searchValue) ||
            superhero.pageId == searchValue ||  // Todo tipo integer. Por eso lo ponemos asi.
            superhero.sex == searchValue || superhero.sex.toLowerCase == searchValue // Lo pongo asi porque female contiene a male 
       
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
    
    */

    function addSuperhero(align, alive, eye, hair, id, sex, name ){
        let newsuperheroesTOView = []
        console.log("funcion addSuperhero")
        let newSuperhero = {identificationNumber:uniqueId, align: align, alive:alive ,eye:eye, hair:hair, id:id, sex:sex, name:name }
        console.log(newSuperhero)
        newsuperheroesTOView.push(newSuperhero)
        console.log(newsuperheroesTOView)
        viewJSONData(newsuperheroesTOView)

    }


    function prueba(saludo){
        console.log(saludo); 
    }


    


    /**
     * function searchCarsByID(id)
{
    const selectedCars = cars.filter(car => car.id === parseInt(id))
    displayCars(selectedCars)
    //return selectedCars[0]
}
     */


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






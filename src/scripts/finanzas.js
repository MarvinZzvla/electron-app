import { getAllDocs, getFinanzas } from "../../firebase.js";
let databaseName = localStorage.getItem('database')
let datetime = new Date();
let dateFormat = `${datetime.getFullYear()}/${datetime.getMonth() + 1}/${datetime.getDate()}`
let date = new Date().toLocaleDateString().split('/')
document.getElementById("btnFinanzasDate").addEventListener("click",setDate)

if (date[1].length > 1 && date[0].length > 1) {
    date = `${date[2]}-${date[1]}-${date[0]}`
}
else if (date[0].length == 1 && date[1].length == 1) {
    date = `${date[2]}-0${date[1]}-0${date[0]}`
}
else if (date[0].length == 1 && date[1].length > 1) {
    date = `${date[2]}-${date[1]}-0${date[0]}`
}
else {
    date = `${date[2]}-0${date[1]}-${date[0]}`
}

init()
async function init() {
    let month = new Date().toLocaleDateString("es-MX", { "month": "long" })
    month = (month.charAt(0).toLocaleUpperCase()) + month.slice(1)
    document.getElementById("dateShow").innerHTML = datetime.toLocaleDateString()
    document.getElementById('dateVentas').defaultValue = date
    document.getElementById("dateToday").innerHTML = datetime.toLocaleDateString()
    document.getElementById("dateMonth").innerHTML = month
    document.getElementById("dateYear").innerHTML = datetime.toLocaleDateString().slice(4)
    // const result = await getFinanzas(dateFormat.split('/'), databaseName)
    // printScreen(result)
}


function setDate(){
    let date =  document.getElementById("dateVentas").value
    let myDate = new Date(date)
    console.log(myDate)
}

function printScreen(result) {
    let month = new Date().toLocaleDateString("es-MX", { "month": "long" })
    month = (month.charAt(0).toLocaleUpperCase()) + month.slice(1)
    document.getElementById("dateToday").innerHTML = datetime.toLocaleDateString()
    document.getElementById("dateMonth").innerHTML = month
    document.getElementById("dateYear").innerHTML = datetime.toLocaleDateString().slice(4)


    // datetime.toLocaleDateString().split('/')[1]
}
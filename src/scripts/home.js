

/***** GET DATABASE NAME AND PUT IT ON THE TITLE */
export let databaseOnlyName  = localStorage.getItem("database").split('~')[0]
document.getElementById("title").innerHTML = databaseOnlyName

/******* GET THE CHOICES ON THE MENU AND ADD A EVENT LISTENER WHEN CLICKED */
let rows = document.getElementsByClassName("row")
let listArrow = Array.from(rows).forEach(function (row) {
    row.addEventListener("click", function (e) {
        if(e.target.innerHTML == "Ventas" || e.target.innerHTML == "Productos"
        || e.target.innerHTML == "Finanzas" || e.target.innerHTML == "Usuarios"){
            //CALL SWITCH FUNCTION
            choiceMenu(e.target.innerHTML)
        }
    })
})


/*************************************************
 *  FUNCTION TO DISPLAY OPTIONS
 *************************************************/
function choiceMenu(choiceMenuItem) {
    switch(choiceMenuItem){
        case "Ventas":
            console.log("Aqui es la opcion de ventas")
            window.location.replace('./src/html/ventasHome.html')
            break;

        case "Productos":
            console.log("Aqui es la opcion de productos")
            window.location.replace('./src/html/productosHome.html')
            break;

        case "Finanzas":
            console.log("Aqui es la opcion de finanzas")
            window.location.replace('./src/html/finanzasHome.html')
            break;

        case "Usuarios":
            console.log("Aqui es la opcion de usuarios")
            window.location.replace('./src/html/usuariosHome.html')
            break;
    }
}

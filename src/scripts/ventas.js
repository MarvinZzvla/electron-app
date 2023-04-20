import { getAllDocs, deleteProduct } from '../../firebase.js'

let totalVentas = 0
let databaseName = localStorage.getItem('database')
let date = new Date().toLocaleDateString().split('/')
let nameProduct;
date[1].length >1 ? date = `${date[2]}-${date[1]}-${date[0]}` : date =`${date[2]}-0${date[1]}-${date[0]}`



let thisdate = new Date()
let dateFormat = `/${thisdate.getFullYear()}/${thisdate.getMonth() + 1}/${thisdate.getDate()}`
//CAL INIT FUNCTION
init()

async function init() {
    /*****GET DATA TODAY *******/
    document.getElementById('dateShow').innerHTML = thisdate.toLocaleDateString()
    document.getElementById('dateVentas').defaultValue = date

    let docRef = 'Ventas/' + databaseName + dateFormat
   // console.log(docRef)
    const result = await getAllDocs(databaseName, docRef)
    //console.log(result.docs[0].data())
    printElement(result)
}


/******EACH WHEN NEW DATE IS SELECTED ********/
document.getElementById('btnVentaDate').addEventListener('click', async function (e) {
    e.preventDefault();
    let myDate = new Date((document.getElementById('dateVentas').value))
    dateFormat = `/${myDate.getFullYear()}/${myDate.getMonth() + 1}/${myDate.getDate() + 1}`
    //console.log(dateFormat)
    document.getElementById('dateShow').innerHTML = myDate.toJSON().slice(0, 10)

    let docRef = 'Ventas/' + databaseName + dateFormat
    const result = await getAllDocs(databaseName, docRef)

    printElement(result)
})
 /***********************************
  * PRINT ELEMENT ON SCREEN
  ***********************************/
function printElement(result) {
    //console.log(thisdate.toLocaleDateString());
   document.getElementById('listVentas').replaceChildren()
   totalVentas = 0
    if(result.docs.length !== 0) {
        
        result.docs.forEach(element => {
            let cantidad = element.data().cantidad
            let product = element.data().name
            let precio = element.data().precio * cantidad
            let productDate = element.data().date.split('- ')
            console.log(productDate[1])
            totalVentas += precio
           
        
    let html = '<div class="listProductos row shadow p-3 mb-5 bg-body-tertiary rounded"><div class="col"><h3>'+product+'</h3></div><div class="row"><div class="col-1"><h6>Cantidad:'+ cantidad+'</h6></div><div class="col-2"><h6 style="margin-left:50px;" alt="">'+productDate[1]+'</h6></div><div class="col-6"></div><div class="col-1"><h6>Precio:'+precio+'</h6></div><div class="col-1"></div><div class="container col-1 "><img class="items-products" data-bs-toggle="modal" data-bs-target="#exampleModal2" src="../img/delete.png" alt="'+productDate[1]+'"style="width: 50%; min-width:32px;"></div></div></div>'
            document.getElementById("listVentas").insertAdjacentHTML('afterbegin', html)
          });
    }

    console.log("Total de ventas: " + totalVentas);
    getNameItem()
}


/*************************************
 * GET NAME OF ITEM TO DELETE
 *************************************/
function getNameItem(){
let items = document.getElementsByClassName("items-products")
  let list = Array.from(items).forEach(function (item) {
    item.addEventListener("click", async function(e){
      nameProduct = e.target.alt
      console.log(nameProduct)
    })
  })
}

/************************************
 * DELETE A ITEM FROM VENTAS
 ************************************/
document.getElementById("btnBorrar").addEventListener("click", async function (){
    const route =  '/Ventas/' + databaseName + dateFormat
    const result = await deleteProduct(databaseName,route,"/"+nameProduct)
    if(result){
      console.log("Borrado con exito")
    } else{console.log("Ocurrio un error")}
    window.location.reload()
    
})


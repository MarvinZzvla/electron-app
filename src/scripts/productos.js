import{getAllDocs,deleteProduct} from '../../firebase.js'
 
let nameProduct;
let databaseName = localStorage.getItem('database')
const result = await getAllDocs(databaseName,'Productos')
console.log(result.docs)

result.docs.forEach(element => {
    let cantidad = element.data().cantidad
    let product = element.data().name
    let precio = element.data().precio

    let html = '<div class="listProductos row shadow p-3 mb-5 bg-body-tertiary rounded"><div class="col"><h3>'+product+'</h3></div><div class="row"><div class="col-1"><h6>Cantidad:'+ cantidad+'</h6></div><div class="col-8"></div><div class="col-1"><h6>Precio:'+precio+'</h6></div><div class="col-1"></div><div class="container col-1 "><img class="items-products" data-bs-toggle="modal" data-bs-target="#exampleModal" src="../img/delete.png" alt="'+product+'"style="width: 50%; min-width:32px;"></div></div></div>'
    document.getElementById("listProducts").insertAdjacentHTML("afterend", html)
  });

  let items = document.getElementsByClassName("items-products")
  let list = Array.from(items).forEach(function (item) {
    item.addEventListener("click", async function(e){
      nameProduct = e.target.alt
    })
  })

  document.getElementById("btnBorrar").addEventListener("click", async function(i){
    const result = await deleteProduct(nameProduct,databaseName)
    if(result){
      console.log("Borrado con exito")
    } else{console.log("Ocurrio un error")}
    
    window.location.reload()
})
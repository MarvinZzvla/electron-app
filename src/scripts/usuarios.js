import{getAllDocs,deleteProduct} from '../../firebase.js'
 
let nameProduct;
let databaseName = localStorage.getItem('database')
const result = await getAllDocs(databaseName,'Usuarios')
console.log(result.docs)

result.docs.forEach(element => {
    let name = element.data().name + ' ' + element.data().apellido
    let email = element.data().email
    let phone = element.data().phone
    let uid = element.data().uid

    let html = '<div class="listProductos row shadow p-3 mb-5 bg-body-tertiary rounded"><div class="col"><h3>'+name+'</h3></div><div class="row"><div class="col-1"><h6>Email:'+ email+'</h6></div><div class="col-7"></div><div class="col-2"><h6>Telefono:'+phone+'</h6></div><div class="col-1"></div><div class="container col-1 "><img class="items-products" data-bs-toggle="modal" data-bs-target="#exampleModal2" src="../img/delete.png" alt="'+uid+'"style="width: 50%; min-width:32px;"></div></div></div>'
    document.getElementById("listUsers").insertAdjacentHTML("afterend", html)
  });

  let items = document.getElementsByClassName("items-products")
  let list = Array.from(items).forEach(function (item) {
    item.addEventListener("click", async function(e){
      nameProduct = e.target.alt
      console.log(nameProduct)
    })
  })

  document.getElementById("btnBorrar").addEventListener("click", async function(i){
    const route = "/Usuarios/"
    const result = await deleteProduct(databaseName,route,nameProduct)
    if(result){
      console.log("Borrado con exito")
    } else{console.log("Ocurrio un error")}
    
    window.location.reload()
})
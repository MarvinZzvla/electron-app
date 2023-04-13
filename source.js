import { login, search } from './firebase.js'

if(localStorage.getItem('isLogged')){
    window.location.replace('./home.html')
}

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    let form = this.getElementsByClassName('form-control')
    // form[0].value = username
    // form[1].value = password
    if (form[0].value != "" && form[1].value != "") {
        const answer = await login(form[0].value, form[1].value)
        if(answer.isLoggedIn){
            loginSuccess(answer.dataUser.user, form[1].value);
        }
        else{alert("Login failure")}
    }


})

async function loginSuccess(user, pass) {
    localStorage.setItem("email",user.email)
    localStorage.setItem("password",pass)
    localStorage.setItem("uid",user.uid)
    let database = await search(user.uid)
    localStorage.setItem("database",database.database)
    localStorage.setItem("isLogged",true)
    
    window.location.replace('./home.html')
}


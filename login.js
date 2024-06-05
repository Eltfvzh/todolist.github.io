const id = document.getElementsByName("id")[0]
const password = document.getElementsByName("password")[0]
const login = document.querySelector(".Log-btn")
const storedId = localStorage.getItem("id")
const storedPass = localStorage.getItem("password")

login.onclick = () => {

    if( id.value == storedId && password.value == storedPass){
        alert("Login Sukses")
        window.location.href = "todolist/index.html"
    }else{
       alert("Login Gagal") 
    }
}
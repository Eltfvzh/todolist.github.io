const id = document.getElementsByName("id")[0]
const password = document.getElementsByName("password")[0]
const submit = document.querySelector(".btn-regist")

console.log (id)


submit.onclick = () => {
    var konfirmasi = confirm("regist Berhasil")
    console.log(konfirmasi)
    if (konfirmasi === true) {
        window.location.href = "login.html"
    } else {
        alert("You pressed Cancel!");
    }
    console.log("first")
    localStorage.setItem("id", id.value)
    localStorage.setItem("password", password.value)
}
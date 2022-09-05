import { Api } from "./api.js";

const btnLogout = document.querySelector("#btn__Logout")
const btnPostar = document.querySelector(".postar")

btnLogout.addEventListener('click', (event) => {
    event.preventDefault()
    localStorage.clear()
    window.location.href = "../../../index.html"
})
btnPostar.addEventListener('click', (event) => {
    event.preventDefault()
    Api.criarPost()
})

Api.pegarUsuario()
// Api.gerarUsers()
Api.pegarNumeroPagina()

Api.conferenciaLoginHome()
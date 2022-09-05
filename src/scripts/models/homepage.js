import { Api } from "./api.js";

const btnLogout = document.querySelector("#btn__Logout")
const btnPostar = document.querySelector(".postar")
const containerSeguir = document.querySelector(".containerSeguir")

btnLogout.addEventListener('click', (event) => {
    event.preventDefault()
    localStorage.clear()
    window.location.href = "../../../index.html"
})
btnPostar.addEventListener('click', (event) => {
    event.preventDefault()
    Api.criarPost()
})
containerSeguir.addEventListener('click', (event) => {
    event.preventDefault()
    if(event.target.nodeName == 'BUTTON') {
        if(event.target.classList[0] == 'btnSeguir' || event.target.classList[1] == 'btnSeguir' || event.target.classList[2] == 'btnSeguir'){
            Api.seguir(event.target.id, event.target.classList[1])
        }
        else if(event.target.classList[0] == 'btnSeguindo' || event.target.classList[1] == 'btnSeguindo' || event.target.classList[2] == 'btnSeguindo'){
            Api.desseguir(event.target.classList[2], event.target.classList[1])
        }
    }
})

Api.pegarUsuario()

Api.gerarUsers()

Api.pegarNumeroPagina()

Api.conferenciaLoginHome()
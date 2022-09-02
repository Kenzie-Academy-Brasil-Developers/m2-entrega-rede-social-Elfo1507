import { Api } from "./models/api.js";

const btnLogin = document.querySelector("#btn__logar")
const btnIrProRegistro = document.querySelector("#ir__registro")

btnLogin.addEventListener('click', (event) => {
    event.preventDefault()
    Api.login(Api.criarBodyLogin())
})

btnIrProRegistro.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = "../../src/pages/cadastro.html"
})

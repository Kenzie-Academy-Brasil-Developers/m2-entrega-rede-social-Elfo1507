import { Api } from "./models/api.js";

const btnLogin = document.querySelector("#btn__logar")
const btnIrProCadastro = document.querySelector("#ir__cadastro")

btnLogin.addEventListener('click', (event) => {
    event.preventDefault()
    Api.login(Api.criarBodyLogin())
})

btnIrProCadastro.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = "../../src/pages/cadastro.html"
})

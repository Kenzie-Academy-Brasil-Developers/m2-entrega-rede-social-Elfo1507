import { Api } from "./api.js";

const btnCadastro = document.querySelector("#btn__cadastrar")
const btnIrProLogin = document.querySelector("#ir__cadastro")

btnCadastro.addEventListener('click', (event) => {
    event.preventDefault()
    Api.cadastro(Api.criarBodyCadastro)
})

btnIrProLogin.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = "../../../index.html"
})
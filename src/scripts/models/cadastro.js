import { Api } from "./api.js";

const btnCadastro = document.querySelector("#btn__cadastrar")
const btnIrProLogin = document.querySelector("#ir__cadastro")
const btnIrProLogin2 = document.querySelector(".ir__Login")
const btnIrProCadastro = document.querySelector(".ir__cadastro")

class Cadastro{
    static estiloBtn(){
        const estiloBtnLoginClasse = document.querySelector(".ir__Login") 
        const estiloBtnCadastroClasse = document.querySelector(".ir__cadastro")
        if(window.location.href == "../../../src/pages/cadastro.html"){
            estiloBtnLoginClasse.classList.add("btnForaPagina")
            estiloBtnCadastroClasse.classList.remove("btnForaPagina")
        }
    }
}

Cadastro.estiloBtn()

btnCadastro.addEventListener('click', (event) => {
    event.preventDefault()
    Api.cadastro(Api.criarBodyCadastro)
})

btnIrProLogin.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = "../../../index.html"
})
btnIrProLogin2.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = "../../../index.html"
})
btnIrProCadastro.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.reload()
})
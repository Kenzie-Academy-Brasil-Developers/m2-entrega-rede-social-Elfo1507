import { Api } from "./models/api.js";

const btnLogin = document.querySelector("#btn__logar")
const btnIrProCadastro = document.querySelector("#ir__cadastro")
const btnIrProCadastro2 = document.querySelector(".ir__cadastro")
const btnIrProLogin = document.querySelector(".ir__Login")

Api.conferenciaLoginPage()

class Login{
    static estiloBtn(){
        const estiloBtnLoginClasse = document.querySelector(".ir__Login") 
        const estiloBtnCadastroClasse = document.querySelector(".ir__cadastro")
        if(window.location.href == "../../index.html"){
            console.log("foi")
            estiloBtnLoginClasse.classList.remove("btnForaPagina")
            estiloBtnCadastroClasse.classList.add("btnForaPagina")
        }
    }
}

Login.estiloBtn()

btnLogin.addEventListener('click', (event) => {
    event.preventDefault()
    Api.login(Api.criarBodyLogin())
})

btnIrProCadastro.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = "../../src/pages/cadastro.html"
})
btnIrProCadastro2.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = "../../src/pages/cadastro.html"
})
btnIrProLogin.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.reload()
})


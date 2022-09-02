class Api{
    static baseUrl = "https://m2-rede-social.herokuapp.com/api/"
    static headersNoAuth = {
        "Content-Type": "application/json"
    }
    static criarBodyLogin(){
        const emailLogin = document.querySelector("#email__Login")
        const senhaLogin = document.querySelector("#senha__Login")
        let body = {
            email: emailLogin.value,
            password: senhaLogin.value,
        }
        return body
    }
    static async login(body){
        fetch(`${this.baseUrl}users/login/`, {
            method: "POST",
            headers: this.headersNoAuth,
            body: JSON.stringify(body),       
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.token == undefined){
                alert("email ou senha incorretos")
                window.location.reload()
            } else {
                localStorage.setItem("@RedeSocial: Token", res.token)
                localStorage.setItem("@RedeSocial: userID", res.user_uuid)
            }
        })
        .catch(err => console.log(err))
    }
    static criarBodyCadastro(){
        const usernameCadastro = document.querySelector("#username__cadastro")
        const emailCadastro = document.querySelector("#email__cadastro")
        const senhaCadastro = document.querySelector("senha__cadastro")
        const cargoCadastro = document.querySelector("#cargo__cadastro")
        const imgCadastro = document.querySelector("#imagem__cadastro")
        let body = {
            username: usernameCadastro.value,
            email: emailCadastro.value,
            password: senhaCadastro.value,
            work_at: cargoCadastro.value,
            image: imgCadastro.value,
        }
        return body
    }
    static async cadastro(body){
        fetch(`${this.baseUrl}users/`, {
            method: "POST",
            headers: this.headersNoAuth,
            body: JSON.stringify(body) 
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }
}

export {Api}
class Api{
    static baseUrl = "https://m2-rede-social.herokuapp.com/api/"
    static headers = {
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
            headers: this.headers,
            body: JSON.stringify(body),       
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.non_field_errors[0] == ["Unable to log in with provided credentials."]){
                alert("email ou senha incorretos")
                window.location.reload()
            } else {
                localStorage.setItem("@RedeSocial: Token", res.token)
                localStorage.setItem("@RedeSocial: userID", res.user_uuid)
            }
        })
        .catch(err => console.log(err))
    }
}

export {Api}
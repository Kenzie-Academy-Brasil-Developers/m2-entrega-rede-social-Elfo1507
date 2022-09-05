class Api{
    static baseUrl = "https://m2-rede-social.herokuapp.com/api/"
    static headersNoAuth = {
        "Content-Type": "application/json"
    }
    static headersAuth = {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("@RedeSocial: Token")}`
    }
    static page = 1
    static numPage = 1
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
                window.location.href = "../../../index.html"
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
        .then(console.log(body))
        .catch(err => console.log(err))
    }
    static conferenciaLoginPage(){
        if(localStorage.getItem("@RedeSocial: Token") != undefined || localStorage.getItem("@RedeSocial: Token") != null){
            alert("usuario já logado")
            window.location.href = "../../../src/pages/homepage.html"
        }
    }
    static conferenciaLoginHome(){
        if(localStorage.getItem("@RedeSocial: Token") == undefined || localStorage.getItem("@RedeSocial: Token") == null){
            alert("usuario não reconhecido")
            window.location.href = "../../../index.html"
        }
    }
    static async pegarUsuario(){
        fetch(`${this.baseUrl}users/${localStorage.getItem("@RedeSocial: userID")}/`, {
            method: "GET",
            headers: this.headersAuth
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            let imgUsuario = document.querySelector("#imagemUsuario")
            let nomeUsuario = document.querySelector("#nomeUsuario")
            let cargoUsuario = document.querySelector("#cargoUsuario")
            let seguidoresUsuario = document.querySelector("#seguidoresUsuario")
            imgUsuario.src = res.image
            nomeUsuario.innerText = res.username
            cargoUsuario.innerText = res.work_at
            seguidoresUsuario.innerText = `${res.followers_amount} seguidores`
        })
    }
    static async gerarUsers(){
        fetch(`${this.baseUrl}users/?page=${this.numPage}`, {
            method: "GET",
            headers: this.headersAuth
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.count)
            this.gerarSeguidores(res.count)
        })
    }
    static async pegarNumeroPagina(){
        let numPag
        fetch(`${this.baseUrl}posts/?limit=10&offset=${this.numPage}`, {
            method: "GET",
            headers: this.headersAuth
        })
        .then(res => res.json())
        .then(res => {
            this.gerarPosts(Math.floor(res.count / 10) + 1)
        })
    }
    static async gerarPosts(num){
        fetch(`${this.baseUrl}posts/?limit=10&offset=${num}`, {
            method: "GET",
            headers: this.headersAuth
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            let postsCertos = res.results.reverse()
            let containerPosts = document.querySelector("#posts")
            containerPosts.innerHTML = ''
            for(let i = 0; i < postsCertos.length; i++){
                let li = document.createElement("li")
                let cardPessoa = document.createElement("div")
                let imgUsuario = document.createElement("img")
                let cargoNome = document.createElement("div")
                let nome = document.createElement("h6")
                let cargo = document.createElement("p")
                let conteudoPost = document.createElement("div")
                let tituloPost = document.createElement("h3")
                let post = document.createElement("p")
                let peDoPost = document.createElement("div")
                let btnAbrirPost = document.createElement("button")
                let like = document.createElement("img")
                let numLike = document.createElement("span")
                cardPessoa.classList.add("cardPessoa")
                imgUsuario.src = postsCertos[i].author.image
                nome.innerText = postsCertos[i].author.username
                cargo.innerText = postsCertos[i].author.work_at
                conteudoPost.classList.add("postContent")
                tituloPost.innerText = postsCertos[i].title
                post.innerText = postsCertos[i].description
                peDoPost.classList.add("footerPost")
                btnAbrirPost.classList.add("abrirPost")
                btnAbrirPost.innerText = "Abrir post"
                like.src = "../../../src/assets/heartBlack.png"
                numLike.innerText = postsCertos[i].likes.length
                li.classList.add("primeiro")
                cargoNome.append(nome, cargo)
                cardPessoa.append(imgUsuario, cargoNome)
                conteudoPost.append(tituloPost, post)
                peDoPost.append(btnAbrirPost, like, numLike)
                li.append(cardPessoa, conteudoPost, peDoPost)
                containerPosts.appendChild(li)
            }
        })
    }
    static async criarPost(){
        let assunto = document.querySelector("#inputAssunto").value
        let conteudo = document.querySelector("#inputConteudo").value
        let body = {
            title: assunto,
            description: conteudo
        }
        fetch(`${this.baseUrl}posts/`, {
            method: "POST",
            headers: this.headersAuth,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.pegarNumeroPagina()
            // let ref = document.querySelector(".primeiro")
            // let containerPosts = document.querySelector("#posts")
            // let li = document.createElement("li")
            // let cardPessoa = document.createElement("div")
            // let imgUsuario = document.createElement("img")
            // let cargoNome = document.createElement("div")
            // let nome = document.createElement("h6")
            // let cargo = document.createElement("p")
            // let conteudoPost = document.createElement("div")
            // let tituloPost = document.createElement("h3")
            // let post = document.createElement("p")
            // let peDoPost = document.createElement("div")
            // let btnAbrirPost = document.createElement("button")
            // let like = document.createElement("img")
            // let numLike = document.createElement("span")
            // li.classList.add("primeiro")
            // cardPessoa.classList.add("cardPessoa")
            // imgUsuario.src = res.author.image
            // nome.innerText = res.author.username
            // cargo.innerText = res.author.work_at
            // conteudoPost.classList.add("postContent")
            // tituloPost.innerText = res.title
            // post.innerText = res.description
            // peDoPost.classList.add("footerPost")
            // btnAbrirPost.classList.add("abrirPost")
            // btnAbrirPost.innerText = "Abrir post"
            // like.src = "../../../src/assets/heartBlack.png"
            // numLike.innerText = res.likes.length
            // cargoNome.append(nome, cargo)
            // cardPessoa.append(imgUsuario, cargoNome)
            // conteudoPost.append(tituloPost, post)
            // peDoPost.append(btnAbrirPost, like, numLike)
            // li.append(cardPessoa, conteudoPost, peDoPost)
            // containerPosts.insertBefore(li, ref)
        })
    }
    static async gerarSeguidores(num){
        fetch(`${this.baseUrl}users/?limit=10&offset=${Math.floor(Math.random() * Math.floor(num / 10))}`, {
            method: "GET",
            headers: this.headersAuth,
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            let containerSeguir = document.querySelector(".containerSeguir")
            for(let i = 0; i < 3; i++){
                let valueRandom = Math.floor(Math.random() * res.results.length)
                let li = document.createElement("li")
                let card = document.createElement("div")
                let img = document.createElement("img")
                let cargoNome = document.createElement("div")
                let nome = document.createElement("h6")
                let cargo = document.createElement("p")
                let btnSeguir = document.createElement("button")
                img.src = res.results[valueRandom].image
                nome.innerText = res.results[valueRandom].username
                cargo.innerText = res.results[valueRandom].work_at
                btnSeguir.innerText = 'seguir'
                btnSeguir.classList.add("btnSeguir")
                btnSeguir.classList.add(`num${i}`)
                btnSeguir.setAttribute('id', res.results[valueRandom].uuid)
                card.classList.add("cardPessoa")
                cargoNome.append(nome, cargo)
                card.append(img, cargoNome)
                li.append(card, btnSeguir)
                containerSeguir.append(li)
            }
        })
    }
    static async seguir(num, num2){
        let body = {
            following_users_uuid: num
        }
        console.log(JSON.stringify(body))
        fetch(`${this.baseUrl}users/follow/`, {
            method: 'POST',
            headers: this.headersAuth,
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((res) => {
            let btn = document.querySelector(`.${num2}`)
            btn.classList.remove("btnSeguir")
            btn.classList.add("btnSeguindo")
            btn.classList.add(res.uuid)
            btn.innerText = 'seguindo'
            console.log(res)
        })
    }
    static async desseguir(num, num2){
        fetch(`${this.baseUrl}users/unfollow/${num}`, {
            method: 'DELETE',
            headers: this.headersAuth
        })
        .then(() => {
            let btn = document.querySelector(`.${num2}`)
            btn.classList.remove(num)
            btn.classList.remove("btnSeguindo")
            btn.classList.add("btnSeguir")
            btn.innerText = 'seguir'
        })
    }
}

export {Api}
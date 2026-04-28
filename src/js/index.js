const buscarUsuario = document.querySelector(".form-p")
const userRepoContent = document.querySelector(".user-repor")

buscarUsuario.addEventListener("submit", async (e) => {
    e.preventDefault()

    try {
        resetForm()

        const username = e.target.querySelector("#buscar").value

        if (!username.trim()) {
            alert("Digite um nome de usuario")
            return
        }

        const userData = await verUsuario(username)

        if (userData) {
            const userRepo = await verRepositorios(username)
            displayUser(userData, userRepo)
        }

        e.target.querySelector("#buscar").value = ""

    } catch (error) {
        throw new Error(`Erro em buscar usuario ${error}`)
    }
})

async function verUsuario(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`)

        if (!response.ok) {
            alert("Usuario nao encontrado")
            return null
        }

        const data = await response.json()
        return data

    } catch (error) {
        throw new Error(`Erro em ver usuario ${error}`)
    }
}

async function verRepositorios(username) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`
        )

        if (!response.ok) {
            throw new Error("Erro ao buscar repositorio")
        }

        const data = await response.json()
        return data

    } catch (error) {
        throw new Error(`Erro em ver o repositorio ${error}`)

    }
}

function displayUser(userData, userRepo) {
    try {
        document.querySelector(".container-s").classList.remove("hide")
        document.querySelector(".perfil").src = userData.avatar_url
        document.querySelector(".perfil").alt = userData.name
        document.querySelector(".user-n").textContent = userData.name
        document.querySelector(".user-l").textContent = userData.login
        document.querySelector(".user-f").textContent = userData.followers
        document.querySelector(".user-b").textContent = userData.bio

        if (userRepo.length > 0) {
            userRepo.forEach(repositorio => {
                try {
                    const userRepoLi = document.createElement("li")
                    userRepoLi.classList.add("repo")

                    const header = document.createElement("header")
                    userRepoLi.appendChild(header)

                    const repoTitulo = document.createElement("strong")
                    repoTitulo.classList.add("titulo-repo")
                    repoTitulo.textContent = repositorio.name
                    header.appendChild(repoTitulo)

                    const link = document.createElement("a")
                    link.classList.add("link-repo")
                    link.href = repositorio.html_url
                    link.target = "_blank"
                    link.textContent = "Ir para o repo"
                    header.appendChild(link)

                    const descricao = document.createElement("p")
                    descricao.classList.add("des")
                    descricao.textContent = repositorio.description ?? "Sem descricao"
                    userRepoLi.appendChild(descricao)

                    const criarContainer = document.createElement("div")
                    criarContainer.classList.add("cri")
                    criarContainer.textContent = "Criado em:"
                    userRepoLi.appendChild(criarContainer)

                    const repoData = document.createElement("span")
                    repoData.classList.add("data")

                    const verData = new Date(repositorio.created_at)
                    const formate = new Intl.DateTimeFormat("pt-BR").format(verData)
                    repoData.textContent = formate

                    criarContainer.appendChild(repoData)
                    userRepoContent.appendChild(userRepoLi)

                } catch (error) {
                    throw new Error(`Erro ao renderizar repositorios do usuario ${error}`)
                }
            })
        } else {
            userRepoContent.textContent = "Nenhum repositorio encontrado"
            userRepoContent.classList.add("no-repo")
        }

    } catch (error) {
        throw new Error(`Erro ao mostrar dados do usuario ${error}`)
    }
}

function resetForm() {
    try {
        document.querySelector(".container-s").classList.add("hide")
        userRepoContent.classList.remove("no-repo")
        while (userRepoContent.firstChild) {
            userRepoContent.removeChild(userRepoContent.firstChild)
        }
    } catch (error) {
        throw new Error(`Erro ao resetar o formulario ${error}`)
    }
}
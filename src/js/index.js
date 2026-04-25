const buscarUsuario = document.querySelector(".form-p")

buscarUsuario.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log("é o batmannn")

    const username = e.target.querySelector("#buscar").value
    const userData = await verUsuario(username)
    const userRepo = await verRepositorios(username)

    displayUser(userData, userRepo)

})

async function verUsuario(username) {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()
    return data
}

async function verRepositorios(username) {
    const response = await fetch(`https://api.github.com/${username}/repos?sort=update&per_page=4`)
    const data = await response.json()
    return data
}

function displayUser(userData, userRepo) {
    document.querySelector(".perfil").src = userData.avatar_url
    document.querySelector(".perfil").alt = userData.name
    document.querySelector(".user-n").textContent = userData.name
    document.querySelector(".user-l").textContent = userData.login
    document.querySelector(".user-f").textContent = userData.followers
    document.querySelector(".user-b").textContent = userData.bio

    userRepo.array.forEach(repositorio => {
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
        
    });
}
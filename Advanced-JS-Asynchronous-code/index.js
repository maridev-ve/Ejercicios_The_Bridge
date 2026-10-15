

function getAllBreeds() {
    const url = "https://dog.ceo/api/breeds/list/all"
    return fetch(url)
        .then(res => res.json())
        .then(data => Object.keys(data.message))
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
//getAllBreeds().then(rrazas => console.log(rrazas));

/***************************** EJERCICIO 2***************************************/


function getRandomDog() {
    const url = "https://dog.ceo/api/breeds/image/random";
    return fetch(url)
        .then(res => res.json())
        .then(data => data.message)
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
};
getRandomDog().then(imagen => console.log(imagen));


/***************************** EJERCICIO 3***************************************/

function getAllImagesByBreed() {
    const url = "https://dog.ceo/api/breed/komondor/images"
    return fetch(url)
        .then(res => res.json())
        .then(data => data.message)
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
getAllImagesByBreed().then(imagenes => console.log(imagenes));


/***************************** EJERCICIO 4 ***************************************/

function getAllImagesByBreed2(breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images`
    return fetch(url)
        .then(resultado => resultado.json())
        .then(raza => raza.message)
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
getAllImagesByBreed2("komondor").then( imagenes => console.log(imagenes))


/***************************** EJERCICIO 5 ***************************************/

function getGitHubUserProfile(username) {
    const url = `https://api.github.com/users/${username}`
    return fetch(url)
        .then(res => res.json())
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
getGitHubUserProfile('alenriquez96').then( userGithub => console.log(userGithub))


/***************************** EJERCICIO 6 ***************************************/

function printGithubUserProfile(username) {
    const url = `https://api.github.com/users/${username}`
    return fetch(url)
        .then(res => res.json())
        .then(user => ({ name: user.name, img: user.avatar_url }))
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
getGitHubUserProfile('alenriquez96').then( user => console.log(user))


/***************************** EJERCICIO 7 ***************************************/

const section = document.getElementById("card")
function getAndPrintGitHubUserProfile(username) {
    const url = `https://api.github.com/users/${username}`
    return fetch(url)
        .then(res => res.json())
        .then(user => (`<section>
    <img src="${user.avatar_url}" alt="${user.name}">
    <h1>${user.name}</h1>
    <p>Public repos: ${user.public_repos}</p>
</section>`))
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
getAndPrintGitHubUserProfile('alenriquez96').then(card => section.innerHTML += card)


/***************************** EJERCICIO 8 ***************************************/

const input = document.getElementById("input")
const button = document.getElementById("button")

button.addEventListener("click", () => {
    getAndPrintGitHubUserProfile(input.value).then(card => section.innerHTML = card);

})


/***************************** EJERCICIO 9 ***************************************/
// Ejemplo de ARRAY de usuarios para probarlo:
const listaUsuarios = ["octocat", "alenoir", "midudev"];

function fetchGithubUsers(userNames) {
  // Paso 1: Mapear el array para hacer un fetch por cada usuario (obtenemos un array de promesas)
  const promesasFetch = userNames.map((name) => {
    return fetch(`https://api.github.com/users/${name}`).then((res) =>
      res.json(),
    ); // Convertimos cada respuesta a JSON directamente
  });
  

  // Paso 2: Usar Promise.all() para resolver todas las peticiones a la vez
  return Promise.all(promesasFetch)
    .then((usersData) => {
      // Paso 3: Cuando Promise.all() termina, recorremos los resultados
      usersData.forEach((user) => {
        // Imprimir por consola la URL del repositorio de cada usuario
        console.log("URL del repositorio:", user.html_url);

        // Imprimir por consola el nombre de cada usuario
        console.log("Nombre del usuario:", user.name || user.login);
      });
      return usersData;
    })
    .catch((error) => console.error("Error en las peticiones:", error));
}

fetchGithubUsers(listaUsuarios);
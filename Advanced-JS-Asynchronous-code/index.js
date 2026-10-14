
//devuelva un array de strings con todas las razas de perro.
function getAllBreeds() {
    //https://dog.ceo/api/breeds/list/all
    const url = "api_dog.json"
    return fetch(url)
        .then(res => res.json())
        .then(data => Object.keys(data.message))
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
//getAllBreeds().then(rrazas => console.log(rrazas));

/***************************** EJERCICIO 2***************************************/
//que obtenga una imagen random de una raza

function getRandomDog() {
    //https://dog.ceo/api/breeds/image/random
    const url = "api_imgDog.json";
    return fetch(url)
        .then(res => res.json())
        .then(data => data.message)
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
};
//getRandomDog().then(imagen => console.log(imagen));


/***************************** EJERCICIO 3***************************************/
//obtenga todas las imágenes de la raza komondor.

//https://dog.ceo/api/breed/hound/images
function getAllImagesByBreed() {
    const url = "komondor.json"
    return fetch(url)
        .then(res => res.json())
        .then(data => data.message)
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
//getAllImagesByBreed().then(imagenes => console.log(imagenes));


/***************************** EJERCICIO 4 ***************************************/
//que devuelva las imágenes de la raza pasada por el argumento
//`https://dog.ceo/api/breed/${breed}/images`

function getAllImagesByBreed2(breed) {
    const url = `${breed}.json`
    return fetch(url)
        .then(resultado => resultado.json())
        .then(raza => raza.message)
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
//getAllImagesByBreed2("komondor").then( imagenes => console.log(imagenes))


/***************************** EJERCICIO 5 ***************************************/
// que obtenga el perfil de usuario de github a partir de su nombre de usuario
// `https://api.github.com/users/${username}`
function getGitHubUserProfile(username) {
    const url = `${username}.json`
    return fetch(url)
        .then(res => res.json())
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
//getGitHubUserProfile('alenriquez96').then( userGithub => console.log(userGithub))


/***************************** EJERCICIO 6 ***************************************/
//que reciba como argumento el nombre de un usuario (username),
// retorne {img, name} y pinte la foto y el nombre en el DOM.
// `https://api.github.com/users/${username}`
function printGithubUserProfile(username) {
    const url = `${username}.json`
    return fetch(url)
        .then(res => res.json())
        .then(user => { user.name, user.img })
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
//getGitHubUserProfile('alenriquez96').then( user => console.log(user))


/***************************** EJERCICIO 7 ***************************************/
//que contenga una petición a la API para obtener información de ese usuario y devuelva 
// un string que represente una tarjeta HTML como en el ejemplo, la estructura 
// debe ser exactamente la misma:
function getAndPrintGitHubUserProfile(username) {
    const url = `${username}.json`
    return fetch(url)
        .then(res => res.json())
        .then(user => (`<section>
    <img src="${user.img} "alt=${user.alt}>
    <h1>${user.name}</h1>
    <p>Public repos: ${user.public_repos}</p>
</section>`))
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}
etAndPrintGitHubUserProfile('alenriquez96').then(card => console.log(card))


/***************************** EJERCICIO 8 ***************************************/




/***************************** EJERCICIO 9 ***************************************/


/*********************************** EJERCICIO 4 ***************************************************/
async function getRandomPokemon() {
    try {
        let randomPokemon = Math.floor(Math.random() * 1025 + 1)
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
        let data = await response.json();
        return data
    }

    catch (error) {
        console.error("Error al intentar", error);
    }
}
//getRandomPokemon(7).then( pokemon => console.log(pokemon))



/*********************************** EJERCICIO 2 ***************************************************/
async function getImageAndName(pokemon) {

    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        let data = await response.json();
        let name = data.name;
        let img = data.sprites.front_default;
        return { name, img }
    }


    catch (error) {
        console.error("Error al intentar", error);
    }
};

//async function getImageAndName(pokemon) {}

/*********************************** EJERCICIO 3 ***************************************************/
async function printImageAndName() {
    try {
        let data = await getImageAndName("pikachu");
        let card =
            `<section>
    <img src="${data.img}" alt="${data.name}">
    <h1>${data.name}</h1>
    </section>`
        return card
    }

    catch (error) {
        console.error("Error al intentar", error);
    }
}
//printImageAndName().then( card1 => card.innerHTML += card1)


/*********************************** EJERCICIO 4 ***************************************************/
async function getRandomDogImage() {
    try {
        let url = await fetch("https://dog.ceo/api/breeds/image/random")
        let res = await url.json();
        let image = res.message;
        return image
    }

    catch (error) {
        console.error("Error al intentar", error);
    }
}
//getRandomDogImage().then( img => console.log(img))


/*********************************** EJERCICIO 5 ***************************************************/
async function getRandomPokemonImage() {
    try {
        let randomPokemon = await getRandomPokemon()
        let imgRandom = randomPokemon.sprites.front_default;
        return imgRandom
    }

    catch (error) {
        console.error("Error al intentar", error);
    }
}
//getRandomPokemonImage().then( imgRandom => console.log(imgRandom))



/*********************************** EJERCICIO 6 ***************************************************/
const container = document.getElementById("containerFight")
async function printPugVsPikachu() {
    try {
        const [imgPokemon, imgDog] = await Promise.all([
            getRandomPokemonImage(),
            getRandomDogImage()
        ]);
        let fight = `<section>
            <img src="${imgPokemon}" alt="${imgPokemon}">
            <h1>VS</h1>
            <img src="${imgDog}" alt="${imgDog}">
         </section>`
        container.innerHTML = fight
    }
    catch (error) {
        console.log("error al intentar", error);

    }
}
//printPugVsPikachu()


/*********************************** EJERCICIO 7 ***************************************************/
//que retorne un personaje aleatorio.
async function getRandomCharacter() {
    try {
        let randomCharacter = Math.floor(Math.random() * 826 + 1)
        let url = await fetch(`https://rickandmortyapi.com/api/character/${randomCharacter}`);
        let data = await url.json();
        return data
    }
    catch (error) {
        console.log("error al intentar", error);

    }
}
//getRandomCharacter()


/*********************************** EJERCICIO 8 ***************************************************/
async function getRandomCharacterInfo() {
    try {
        let res = await getRandomCharacter();
        let img = res.image;
        let name = res.name;
        let episodes = res.episode;
        console.log(res);
        

        let url = await fetch(res.episode[0])
        let data = await url.json();
        let firstEpisode = data.name;
        let dateEpisode = data.air_date;
        
        return {img, name, episodes, firstEpisode, dateEpisode}

        

    }
    catch (error) {
        console.log("error al intentar", error);
    }
}


/*********************************** EJERCICIO 9 ***************************************************/
const containerCharacter = document.getElementById("containerCharacter");

async function printRandomCharacter() {
    try {
        const { img, name, episodes, firstEpisode, dateEpisode } = await getRandomCharacterInfo();
        containerCharacter.innerHTML = `<section>
            <img src="${img}" alt="${name}">
            <h2>${name}</h2>
            <p>Aparece en ${episodes.length} episodios</p>
            <p>Primer episodio: ${firstEpisode} (${dateEpisode})</p>
        </section>`;
    }
    catch (error) {
        console.log("error al intentar", error);
    }
}
printRandomCharacter();
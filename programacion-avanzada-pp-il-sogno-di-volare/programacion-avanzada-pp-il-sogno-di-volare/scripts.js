
const civilAircrafts = [
    'assets/avion-civil-1.jpg',
    'assets/avion-civil-2.jpg',
    'assets/avion-civil-3.jpg',
    'assets/avion-civil-4.jpg',
    'assets/avion-civil-5.jpg'
];

const militaryAircrafts = [
    'assets/avion-militar-1.jpg',
    'assets/avion-militar-2.jpg',
    'assets/avion-militar-3.jpg',
    'assets/avion-militar-4.jpg',
    'assets/avion-militar-5.jpg'
];

const civilHelicopters = [
    'assets/helicoptero-civil-1.jpg',
    'assets/helicoptero-civil-2.jpg',
    'assets/helicoptero-civil-3.jpg',
    'assets/helicoptero-civil-4.jpg',
    'assets/helicoptero-civil-5.jpg'
];

const militaryHelicopter = [
    'assets/helicoptero-militar-1.jpg',
    'assets/helicoptero-militar-2.jpg',
    'assets/helicoptero-militar-3.jpg',
    'assets/helicoptero-militar-4.jpg',
    'assets/helicoptero-militar-5.jpg'
];

//Sabe que imagenes hay
class Gallery {
    constructor(civilImages, militaryImages) {
        this.civilImages = civilImages
        this.militaryImages = militaryImages

    }

    getRandomCivil() {
        const randomCivil = Math.floor(Math.random() * this.civilImages.length)
        return this.civilImages[randomCivil]
    }

    getRandomMilitary() {
        const randomMilitary = Math.floor(Math.random() * this.militaryImages.length)
        return this.militaryImages[randomMilitary]
    }

    getAll() {
        const allImages = [...this.civilImages, ...this.militaryImages]
        return allImages
    }
}

//sabe como pintarlas
class Painter {
    constructor() {
        this.createGallery()
    }

    createGallery() {
        this.gallery = document.createElement("section");
        document.body.append(this.gallery)
    }

    createImageTag(imageUrl) {
        const pictureContainer = document.createElement("picture")
        const img = document.createElement("img")
        img.src = imageUrl;
        pictureContainer.appendChild(img)

        return pictureContainer
    }
    
    paintSingleImage(imageUrl) {
        const image = this.createImageTag(imageUrl)
        this.gallery.appendChild(image)
    }
    
    paintMultipleImages(arrayOfImages) {
        for (let i = 0; i < arrayOfImages.length; i++) {
            this.paintSingleImage(arrayOfImages[i]);
            
        }
    }
}

//OBJETOS CREADOS
const aircrafts = new Gallery(civilAircrafts, militaryAircrafts);
const helicopters = new Gallery(civilHelicopters, militaryHelicopter);
const painter = new Painter();

// EL . Significa(De este objeto dame ...)
console.log(aircrafts.getRandomCivil());
console.log(aircrafts.getRandomMilitary());
console.log(aircrafts.getAll());
console.log(painter.createImageTag('assets/avion-civil-1.jpg'))
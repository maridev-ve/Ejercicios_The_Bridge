class Warrior {
    constructor(life, power) {
        this.life = life
        this.power = power
    }

    attack() {
        const power = this.power;
        return power
    }
    defend(damage){
     return console.log(this.life -= damage);
    }
}

class Maya extends Warrior {
    drinkColaCao(){
        this.power += 10
    }
}


class Aztec extends Warrior {
    drinkNesquik(){
        this.life += 10
    }
}
//creamos los objetos
const maya = new Maya(150, 20)
const azteca = new Aztec(100, 30)

//accedemos a lo que tiene el objeto dentro
azteca.drinkNesquik()  
maya.drinkColaCao()

//pelea(se lee primero de dentro hacia fuera)
const theAztecRemainingLife = azteca.defend(maya.attack())
const theMayaRemainingLife = maya.defend(azteca.attack())

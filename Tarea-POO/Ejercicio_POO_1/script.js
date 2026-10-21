class Persona {
    constructor(nombre, edad, genero) {
        this.nombre = nombre;
        this.edad = edad;
        this.genero = genero
    }
    obtDetalles() {
        return `${this.nombre} tiene ${this.edad} años y es ${this.genero}`;
    }
}

class Estudiante extends Persona {
    constructor(nombre, edad, genero, curso, grupo) {
        super(nombre, edad, genero)
        this.curso = curso;
        this.grupo = grupo
        
    }
    registrar() {
        return `${this.obtDetalles()}, estudia ${this.curso} y está en el grupo ${this.grupo}`
    }
}

class Profesor extends Persona{
    constructor(nombre, edad, genero, asignatura, nivel){
        super(nombre, edad, genero);
        this.asignatura = asignatura;
        this.nivel= nivel;
    }
    asignar(){
        return `${this.nombre}, tiene la asignatura de ${this.asignatura} y su nivel es ${this.nivel} `
    }
}
const persona = new Persona("Mariela", 25, "Mujer");
console.log(persona.obtDetalles());

const estudiante = new Estudiante("Daniel", 25, "Hombre", "Desarrollo con IA", "The Bridge")
console.log(estudiante.registrar())
console.log(estudiante.obtDetalles())

const profe = new Profesor("Luis", 30,"Hombre", "POO", 3)
console.log(profe.asignar());
console.log(profe.obtDetalles());


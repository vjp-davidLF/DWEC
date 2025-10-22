const disco = {
    titulo: "Tenemos",
    autor: "David",
    año: 2006,
    ventas: 2000,
    
    // Método que devuelve la información del disco formateada
    getInfo() {
        return `El titulo es ${this.titulo}, el autor es ${this.autor}, ` +
               `el año de salida fue en ${this.año} y las ventas ese año fueron ${this.ventas}.`;
    }
};

console.log(disco.getInfo());
console.log("");


const calle = {
    nombre: "Calle Principal",
    longitud: 9087,
    lista: [
        { nombre: "Madrid center" },
        { nombre: "Barcelona center" },
        { nombre: "Sevilla center" }
    ],
    
    // Método que itera sobre los establecimientos y los formatea numerados
    getInfo() {
        // map() transforma cada establecimiento en un string numerado
        // join() une todos los elementos con "; "
        const listaEstablecimientos = this.lista
            .map((establecimiento, indice) => `${indice + 1}. ${establecimiento.nombre}`)
            .join("; ");
        
        return `El nombre es ${this.nombre}, la longitud es ${this.longitud} metros. ` +
               `La lista de establecimientos es: ${listaEstablecimientos}.`;
    }
};

console.log(calle.getInfo());
console.log("");



// Objeto persona que será el dueño del coche
const persona = {
    nombre: "David",
    edad: 20
};

// Objeto marca del coche
const marca = {
    nombre: "BMW"
};

// Objeto coche con referencias a persona y marca
const coche = {
    modelo: "e36",
    dueño: persona,      // Referencia al objeto persona
    marca: marca,        // Referencia al objeto marca
    año: 2010,
    
    // Método que accede a propiedades anidadas (this.dueño.nombre)
    getInfo() {
        // Variable intermedia para mejor legibilidad
        const infoDueño = `${this.dueño.nombre} (edad: ${this.dueño.edad} años)`;
        
        return `El modelo es ${this.modelo}, el dueño es ${infoDueño}, ` +
               `la marca es ${this.marca.nombre} y fue creada en el año ${this.año}.`;
    }
};

console.log(coche.getInfo());
console.log("");



// Objeto director con sus obras
const director = {
    nombre: "David",
    apellidos: "García Millan",
    nacimiento: 1998,
    obras: [
        { titulo: "Madriguera" },
        { titulo: "Lemon" },
        { titulo: "Github" }
    ]
};

// Objetos actores
const actor1 = {
    nombre: "Juan",
    edad: 30,
    actuaciones: 15
};

const actor2 = {
    nombre: "María",
    edad: 28,
    actuaciones: 12
};

const actor3 = {
    nombre: "Carlos",
    edad: 35,
    actuaciones: 20
};

// Objeto obra que contiene director y array de actores
const obra = {
    titulo: "Ya",
    fecha: "23-12-2000",
    director: director,              // Objeto anidado
    actores: [actor1, actor2, actor3], // Array de objetos
    
    // Método que muestra información de la obra, director y actores
    getInfo() {
        // Información básica de la obra
        let informacion = `La obra de teatro '${this.titulo}' fue estrenada el ${this.fecha}.\n`;
        
        // Acceso a propiedades anidadas del director
        informacion += `Director: ${this.director.nombre} ${this.director.apellidos} ` +
                      `(nacido en ${this.director.nacimiento}).\n`;
        
        // Iterar sobre las obras del director con map() y join()
        const obrasDirector = this.director.obras
            .map((obraDirector, indice) => `${indice + 1}. ${obraDirector.titulo}`)
            .join("; ");
        
        informacion += `Sus obras: ${obrasDirector}.\n`;
        
        // Iterar sobre los actores con forEach()
        informacion += "Actores:\n";
        this.actores.forEach((actor, indice) => {
            informacion += `  ${indice + 1}. ${actor.nombre} ` +
                          `(edad: ${actor.edad} años, actuaciones: ${actor.actuaciones} veces)\n`;
        });
        
        return informacion;
    }
};

console.log(obra.getInfo());
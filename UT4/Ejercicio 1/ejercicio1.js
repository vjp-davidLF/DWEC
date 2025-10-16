// Definimos un objeto llamado 'persona' que contiene información personal y laboral.
var persona = {
    // Propiedad que almacena el nombre de la persona.
    nombre : "David",
    // Propiedad que almacena la edad de la persona.
    "edad" : 19,
    // Propiedad que contiene una lista de trabajos realizados por la persona.
    trabajos : [
        {
            // Descripción del primer trabajo realizado.
            descripcion : "Desarrollador web",
            // Periodo de duración del primer trabajo.
            duracion : "2025-2030"
        },
        {
            // Descripción del segundo trabajo realizado.
            descripcion : "Diseñador web",
            // Periodo de duración del segundo trabajo.
            duracion : "2030-2035"
        },
        {
            // Descripción del tercer trabajo realizado.
            descripcion : "Programador",
            // Periodo de duración del tercer trabajo.
            duracion : "2035-2040"
        }
    ]
}

// Añadimos un método al objeto 'persona' para generar una descripción detallada.
persona.getInfo = function () {
    // Creamos una cadena inicial con el nombre y la edad de la persona.
    let cadenaDevuelta = " Mi nombre es " +this.nombre+ " y tengo " +this.edad+ ". ";
    
    // Añadimos información sobre los trabajos realizados.
    cadenaDevuelta += " Los trabajos que he realizado son: ";
    for (let i = 0; i < this.trabajos.length; i++) {
        let t = this.trabajos[i]; // Obtenemos el trabajo actual de la lista.
        // Añadimos la descripción y duración del trabajo a la cadena.
        cadenaDevuelta += (i + 1) + ". " + t.descripcion + " (" + t.duracion + ")";
        // Si no es el último trabajo, añadimos un punto y coma como separador.
        if (i < this.trabajos.length - 1) cadenaDevuelta += "; ";
    }
    // Finalizamos la cadena con un punto.
    cadenaDevuelta += ".";

    // Devolvemos la cadena completa con toda la información.
    return cadenaDevuelta;
}

// Mostramos en la consola la información generada por el método 'getInfo'.
console.log(persona.getInfo());



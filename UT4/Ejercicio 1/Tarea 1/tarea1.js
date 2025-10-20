var disco = {
    titulo : "Tenemos",
    autor : "David",
    año : 2006,
    ventas : 2000,
        getInfo () {
        let todo =
        "El titulo es " +this.titulo+ " , el autor es " +this.autor+ ", el año de salida fue en " +this.año+ " y las ventas ese año fueron " +this.ventas+"."
         return todo;
    }
}

    console.log(disco.getInfo());

var calle = {
    nombre: "Calle",
    longitud: 9087,
    lista: [
        { nombre: "Madrid center" },
        { nombre: "Barcelona center" },
        { nombre: "Sevilla center" }
    ],
    getInfo() {
        let cadenaDevuelta = "El nombre es " +this.nombre+ ", la longitud es " +this.longitud+".";

        cadenaDevuelta += "La lista es: ";

        for (let i = 0; i < this.lista.length; i++) {
        let t = this.lista[i]; // Obtenemos el trabajo actual de la lista.
        // Añadimos la descripción y duración del trabajo a la cadena.
        cadenaDevuelta += (i + 1) + ". " + t.nombre;
        // Si no es el último trabajo, añadimos un punto y coma como separador.
        if (i < this.lista.length - 1) cadenaDevuelta += "; ";
    }
         // Finalizamos la cadena con un punto.
         cadenaDevuelta += ".";

         // Devolvemos la cadena completa con toda la información.
        return cadenaDevuelta;
    }

};

  console.log(calle.getInfo());
  
var persona = {
    nombre : "David",
    edad : 20,
}

var marca = {
    nombre : "BMW"
}

var coche = {
    modelo : "e36",
    dueño : persona,
    marca : marca,

        getInfo () {
        let todo =
        "El modelo es " + this.modelo + " , el dueño es " + this.dueño + " y la marca es " + this.marca + ".";
         return todo;
    }
}

    console.log(coche.getInfo());

    var director = {
        nombre : "David",
        apellidos :"García Millan",
        nacimiento : 12-23-1998,
        obras : [
            {
                titulo : "Madriguera"
            },
                        {
                titulo : "Lemon"
            },
                        {
                titulo : "Github"
            }
        ],
        getInfo () {
        let todo =
        "El nombre es " + this.nombre + " , los apellidos son " + this.apellidos + " el nacimiento es " + this.nacimiento + ".";

        todo += "Las obras son:";
        for (let i = 0; i < this.obras.length; i++) {
        let t = this.obras[i]; // Obtenemos el trabajo actual de la lista.
        // Añadimos la descripción y duración del trabajo a la cadena.
        todo += (i + 1) + ". " + t.titulo;
        // Si no es el último trabajo, añadimos un punto y coma como separador.
        if (i < this.obras.length - 1) todo += "; ";
    }
         // Finalizamos la cadena con un punto.
         todo += ".";

         // Devolvemos la cadena completa con toda la información.
        return todo;
    }
}

    

    var obra = {
        titulo : "Ya",
        fecha : "23-21-2000",
        director : director

    }
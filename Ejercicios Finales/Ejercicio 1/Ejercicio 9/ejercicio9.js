class PlatoCocina {
    constructor(nombrePlato, duracionMinutos, dificultad) {
        this.nombrePlato = nombrePlato;
        this.duracionMinutos = duracionMinutos;
        this.dificultad = dificultad;
    }

    toString() {
        return "El plato " + this.nombrePlato + " tiene una duración de " + this.duracionMinutos + " minutos con dificultad " + this.dificultad;
    }
}

function pintarMapa(mapa) {
    mapa.forEach(function(ingredientes, plato) {
        console.log(plato.toString());
        console.log("Ingredientes: " + ingredientes.join(", "));
        console.log("");
    });
}

let mapaPlatos = new Map();

mapaPlatos.set(new PlatoCocina("Garbanzos", 60, 6), ["Garbanzos", "Sal", "Patatas", "Chorizo", "Zanahorias"]);
mapaPlatos.set(new PlatoCocina("Tortilla Española", 45, 7), ["Huevos", "Sal", "Patatas", "Aceite", "Cebolla"]);
mapaPlatos.set(new PlatoCocina("Berenjenas rellenas", 150, 8), ["Berenjenas", "Carne", "Tomate", "Sal", "Queso", "Pimientos", "Tomates", "Bechamel"]);

pintarMapa(mapaPlatos);

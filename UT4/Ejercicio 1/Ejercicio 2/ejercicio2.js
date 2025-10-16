let monumento = {
    /* Guarda cada monumento como una ficha con id, nombre, descripción y coordenadas.
    Las fotos las almaceno fuera y en la ficha pongo la ruta.
    Para mapas uso GeoJSON o lat/lon y añado índices geoespaciales para búsquedas.
    Accedo y modifico todo con operaciones CRUD desde una API.*/
    "uri": {
        "type": "uri",
            "value": "http://opendata.caceres.es/recurso/turismo/monumentos/Monumento/28-palacio-de-ovando,mogollon,perero-y-paredes"
    },
    "geo_long": {
        "type": "typed-literal",
            "datatype": "http://www.w3.org/2001/XMLSchema#double",
                "value": "-6.37022"
    },
    "geo_lat": {
        "type": "typed-literal",
            "datatype": "http://www.w3.org/2001/XMLSchema#double",
                "value": "39.475"
    },
    "clase": {
        "type": "typed-literal",
            "datatype": "http://www.w3.org/2001/XMLSchema#string",
                "value": "PALACIO "
    },
    "rdfs_label": {
        "type": "typed-literal",
            "datatype": "http://www.w3.org/2001/XMLSchema#string",
                "value": "Palacio de Ovando,Mogollon,Perero y Paredes"
    },
    "tieneEnlaceSIG": {
        "type": "typed-literal",
            "datatype": "http://www.w3.org/2001/XMLSchema#string",
                "value": "http://sig.caceres.es/serweb/fichasig/fichatoponimia.php?mslink=1181 "
    }
};

// Método para obtener información del monumento
monumento.getInfo = function () {
    let todo = 
    "El nombre del monumento  es: " +monumento.rdfs_label.value+ ". "+
    "El tipo de monumento es: " +monumento.clase.value+ ". "+
    "La latitud es: " +monumento.geo_lat.value+ ". "+
    "La longitud es: " +monumento.geo_long.value+ ". "+
    "La url es: " +monumento.uri.value+ ". "

    return todo;
}

// Pruebas de acceso a propiedades
console.log("El nombre del monumento  es: " +monumento.rdfs_label.value+ ". " );
console.log("El tipo de monumento es: " +monumento.clase.value+ ". ");

// Muestra la información completa del monumento
console.log(monumento.getInfo());

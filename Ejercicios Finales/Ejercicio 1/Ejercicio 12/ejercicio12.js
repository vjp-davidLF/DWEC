function mediaAritmetica() {
    if (arguments.length === 0) return 0;
    
    let suma = 0;
    for (let i = 0; i < arguments.length; i++) {
        suma += arguments[i];
    }
    return suma / arguments.length;
}

function pintarMedias(mapa) {
    mapa.forEach(function(notas, estudiante) {
        const media = mediaAritmetica.apply(null, notas);
        console.log(estudiante + " - Media: " + media.toFixed(2));
    });
}

function estudianteMejorMedia(mapa) {
    let mejorEstudiante = "";
    let mejorMedia = -1;
    
    mapa.forEach(function(notas, estudiante) {
        const media = mediaAritmetica.apply(null, notas);
        if (media > mejorMedia) {
            mejorMedia = media;
            mejorEstudiante = estudiante;
        }
    });
    
    console.log("\nMejor estudiante: " + mejorEstudiante + " con media: " + mejorMedia.toFixed(2));
}

function ordenarPorMedia(mapa) {
    const estudiantes = [];
    
    mapa.forEach(function(notas, estudiante) {
        const media = mediaAritmetica.apply(null, notas);
        estudiantes.push({ nombre: estudiante, media: media });
    });
    
    estudiantes.sort(function(a, b) {
        return b.media - a.media;
    });
    
    console.log("\nEstudiantes ordenados por media:");
    estudiantes.forEach(function(est) {
        console.log(est.nombre + " - " + est.media.toFixed(2));
    });
}

let mapaEstudiantes = new Map();

mapaEstudiantes.set("Ana", [8, 7, 9, 8, 7, 9]);
mapaEstudiantes.set("Luis", [6, 7, 5, 8, 6, 7]);
mapaEstudiantes.set("María", [9, 9, 10, 9, 8, 9]);
mapaEstudiantes.set("Carlos", [7, 6, 8, 7, 7, 6]);

pintarMedias(mapaEstudiantes);
estudianteMejorMedia(mapaEstudiantes);
ordenarPorMedia(mapaEstudiantes);

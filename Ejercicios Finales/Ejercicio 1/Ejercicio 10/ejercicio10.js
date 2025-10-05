function sumarLongitudes(...cadenas) {
    if (!cadenas.every(function(elemento) { return typeof elemento === 'string'; })) {
        console.log("Error: Todos los argumentos deben ser cadenas");
        return;
    }
    
    const total = cadenas.reduce(function(suma, cadena) {
        return suma + cadena.length;
    }, 0);
    
    console.log("Suma total de longitudes: " + total);
}

sumarLongitudes("hola", "mundo", "javascript");
sumarLongitudes("uno", "dos", "tres", "cuatro");
sumarLongitudes("test", 123, "error");
sumarLongitudes("a", "bb", "ccc", "dddd");

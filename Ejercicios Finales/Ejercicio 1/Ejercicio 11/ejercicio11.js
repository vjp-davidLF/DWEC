function filtrarPares() {
    const numeros = [];
    
    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'number') {
            numeros.push(arguments[i]);
        }
    }
    
    const pares = numeros.filter(function(numero) {
        return numero % 2 === 0;
    });
    
    if (pares.length > 0) {
        console.log("Números pares: [" + pares + "]");
    }
}

filtrarPares(1, 2, 3, 4, 5, 6, 7, 8);
filtrarPares(10, "hola", 15, 20, true, 25, 30);
filtrarPares("texto", true, false);
filtrarPares(11, 13, 15, 17, 19);

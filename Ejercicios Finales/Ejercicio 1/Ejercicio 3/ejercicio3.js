
function contarElementos(array) {
    let numeros = 0;
    let cadenas = 0;
    let otros = 0;

    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === "number") {
            numeros++;
        } else if (typeof array[i] === "string") {
            cadenas++;
        } else {
            otros++;
        }
    }

    console.log("Elementos de tipo número:", numeros);
    console.log("Elementos de tipo cadena:", cadenas);
    console.log("Elementos de otro tipo:", otros);
}


contarElementos([1, "hola", 2, "mundo", true, 3]);
contarElementos(["cadena", 4, false, 5, "otro"]);
contarElementos([6, 7, 8, 9, 10]);
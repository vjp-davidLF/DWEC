function eliminarRepetidos(array) {
    const unicos = [];
    const repetidos = [];
    
    for (let i = 0; i < array.length; i++) {
        if (unicos.indexOf(array[i]) === -1) {
            unicos.push(array[i]);
        } else if (repetidos.indexOf(array[i]) === -1) {
            repetidos.push(array[i]);
        }
    }
    
    console.log("Array original: [" + array + "]");
    console.log("Sin repetidos: [" + unicos + "]");
    console.log("Elementos repetidos: [" + repetidos + "]");
}

const datos1 = [1, 2, 3, 2, 4, 1, 5];
const datos2 = ["a", "b", "c", "a", "d", "b"];

eliminarRepetidos(datos1);
console.log("");
eliminarRepetidos(datos2);

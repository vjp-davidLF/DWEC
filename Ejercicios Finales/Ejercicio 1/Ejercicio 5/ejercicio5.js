function ordenarArray(array) {
    const longitudArray = array.length;

    for (let i = 0; i < longitudArray - 1; i++) {
        let indiceMinimo = i;
        for (let j = i + 1; j < longitudArray; j++) {
            if (array[j] < array[indiceMinimo]) {
                indiceMinimo = j;
            }
        }

        if (indiceMinimo !== i) {
            let temp = array[i];
            array[i] = array[indiceMinimo];
            array[indiceMinimo] = temp;
        }
    }
    return array;
}


let arrayEjemplo = [64, 25, 12, 22, 11];
console.log("Array antes de ordenar:", arrayEjemplo);
ordenarArray(arrayEjemplo);
console.log("Array después de ordenar:", arrayEjemplo);


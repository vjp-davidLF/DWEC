function procesarArray(array) {
    if (!array.every(function(elemento) { return typeof elemento === 'number'; })) {
        alert("Error");
        return;
    }
    
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i] * 2;
    }
    
    if (array.every(function(numero) { return numero % 2 === 0; })) {
        console.log("Éxito: Todos los elementos son pares");
    } else {
        console.log("Error: No todos los elementos son pares");
    }
}

const datos1 = [1, 2, 3, 4, 5];
const datos2 = [2, 4, 6, 8];
const datos3 = [1, "dos", 3];

procesarArray(datos1);
console.log(datos1);

procesarArray(datos2);
console.log(datos2);

procesarArray(datos3);

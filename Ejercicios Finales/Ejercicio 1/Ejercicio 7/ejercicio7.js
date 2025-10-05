function todosPares(array) {
    return array.every(function(numero) {
        return numero % 2 === 0;
    });
}

const numeros1 = [2, 4, 6, 8, 10];
const numeros2 = [2, 4, 5, 8, 10];

console.log("Array: [" + numeros1 + "]");
console.log("¿Todos son pares?: " + todosPares(numeros1) + "\n");

console.log("Array: [" + numeros2 + "]");
console.log("¿Todos son pares?: " + todosPares(numeros2));
console.log("Array: [" + numeros2 + "]");
console.log("¿Todos son pares?: " + todosPares(numeros2));


function mayorDeNumeros(...numeros) {

    if (!numeros.every(numero => typeof numero == 'number')) {
        return undefined;
    }

    return Math.max(...numeros);
}


let array1 = [3, 7, 2, 9];
let array2 = [10, 5, 'hola', 8];
let array3 = [1, 2, 3, 4, 5];

console.log(mayorDeNumeros(...array1)); 
console.log(mayorDeNumeros(...array2)); 
console.log(mayorDeNumeros(...array3)); 
console.log(mayorDeNumeros(100, 200, 50));
console.log(mayorDeNumeros(1, 'a', 3));
let array = [2, 3, 4, 5];
console.log("Array inicial: " + array.join('#'));

array.unshift(0, 1);
console.log("1) Después de añadir al inicio: " + array.join('#'));

array.push(6, 7, 8);
console.log("2) Después de añadir al final: " + array.join('#'));

array.splice(3, 3);
console.log("3) Después de eliminar posiciones 3,4,5: " + array.join('#'));

array.splice(array.length - 1, 0, 6, 3);
console.log("4) Después de insertar antes del último: " + array.join('#'));

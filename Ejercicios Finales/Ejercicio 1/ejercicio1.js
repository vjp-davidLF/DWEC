
function cadenas(cadena1, cadena2) {
    cadena1 = "Esto es la primera cadena";
    cadena2 = "Esto es la cadena numero 2";

    if (typeof cadena1 !== "string" || typeof cadena2 !== "string") {
        console.log("Esto no es una cadena")
        return;
    }
    else {
        console.log("Las dos son cadenas")
    }
    if (cadena1.length > cadena2.length) {
        console.log("La cadena numero 2 es más corta");
    } else if (cadena2.length > cadena1.length) {
        console.log("La cadena numero 1 es más corta");
    }
    else {
        console.log("Las dos son iguales");
    }
}

console.log(cadenas());
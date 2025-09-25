function cadenas(cadena1, cadena2) {


    if (typeof cadena1 !== "string" || typeof cadena2 !== "string") {
        console.log("Esto no es una cadena");
        return;
    }
    else {
        console.log("Las dos son cadenas");
    }


    if (cadena1 == cadena2.split().reverse().join()) {
        console.log("Son iguales");
    } else if (cadena2 == cadena1.split().reverse().join()) {
        console.log("Son iguales");
    }
    else {
        console.log("No son iguales");
    }


}
    console.log("hola", "adios");
    cadenas("hola", "adios");

    console.log("ana", "ana");
    cadenas("ana", "ana");

    console.log(3, "adios");
    cadenas(3, "adios");


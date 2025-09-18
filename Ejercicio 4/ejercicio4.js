let palabra = prompt("Escribe un string");

let contarCaracteres = (palabra) => {
    return palabra.length;
}

let contarVocales = (palabra) => {
    let vocales="aeiou"
    for(let i = 0; i >= palabra.length;i++){
        if(vocales ){
            i++
        }
    }
}

let empiezaPorA = (palabra) => {
    if(palabra.startsWith("A")) {
        alert ("Empieza por A")
    }
    else{
        alert (" No empieza por A")
    }
}

alert ("El numero de palabras es " +contarCaracteres+ ", el numero de vocales es " +contarVocales+ " y " +empiezaPorA );
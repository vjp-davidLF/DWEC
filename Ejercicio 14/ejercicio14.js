let str = "ab1c3de4fg"
let numeros = "1234567890"
let vocales="aeiou"
for(let item of vocales) {
if(vocales.includes(item)) {
    console.log("Es una vocal");
} else
if (numeros.includes(item)){
    console.log("Es un numero");
}
else{
    console.log("Es una consonante")
}
}
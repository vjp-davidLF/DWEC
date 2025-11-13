var Circulo = /** @class */ (function () {
    function Circulo(radio) {
        this.radio = radio;
    }
    Circulo.prototype.getArea = function () {
        return 3.14 * Math.pow(this.radio, 2);
    };
    Circulo.prototype.pintarInfo = function () {
        return "La figura es un circulo que tiwene como radio " + this.radio + " y tiene como área " + this.getArea;
    };
    return Circulo;
}());
var Rectangulo = /** @class */ (function () {
    function Rectangulo(lado1, lado2) {
        this.lado1 = lado1;
        this.lado2 = lado2;
    }
    Rectangulo.prototype.getArea = function () {
        return this.lado1 * this.lado2;
    };
    Rectangulo.prototype.pintarInfo = function () {
        return "La figura es un rectangulo y los lados cortos miden " + this.lado1 + " y los lados largos miden " + this.lado2 + " el área final es: " + this.getArea;
    };
    return Rectangulo;
}());
var Triangulo = /** @class */ (function () {
    function Triangulo(base, altura) {
        this.base = base;
        this.altura = altura;
    }
    Triangulo.prototype.getArea = function () {
        return (this.base * this.altura) / 2;
    };
    Triangulo.prototype.pintarInfo = function () {
        return "la figura es un triangulo con base de " + this.base + " altura de " + this.altura + "y un área total de " + this.getArea;
    };
    return Triangulo;
}());
var figuras = [new Circulo(3), new Rectangulo(4, 6), new Triangulo(3, 6)];
function pintarInfoFiguras(figuras) {
    figuras.forEach(function (figuras) {
        console.log(figuras.pintarInfo());
        console.log(figuras.getArea());
    });
}
pintarInfoFiguras(figuras);

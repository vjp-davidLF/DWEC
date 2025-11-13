interface BiDimensional {
    getArea(): Number;
    pintarInfo();
}

class Circulo implements BiDimensional {
    constructor(public radio: 3) { }
    getArea(): Number {
        return 3.14 * Math.pow(this.radio, 2);
    }

    pintarInfo() {
        return "La figura es un circulo que tiwene como radio " + this.radio + " y tiene como área " + this.getArea;
    }


}

class Rectangulo implements BiDimensional {
    constructor(public lado1: 4, public lado2: 6) { }
    getArea(): Number {
        return this.lado1 * this.lado2;

    }
    pintarInfo() {
        return "La figura es un rectangulo y los lados cortos miden " + this.lado1 + " y los lados largos miden " + this.lado2 + " el área final es: " + this.getArea;
    }
}

class Triangulo implements BiDimensional {
    constructor(public base: 3, public altura: 6) { }
    getArea(): Number {
        return (this.base * this.altura) / 2;
    }

    pintarInfo() {
        return "la figura es un triangulo con base de " + this.base + " altura de " + this.altura + "y un área total de " + this.getArea;
    }
}

let figuras = [new Circulo(3), new Rectangulo(4, 6), new Triangulo(3, 6)];

function pintarInfoFiguras(figuras:BiDimensional[]) {
    figuras.forEach(figuras => {
        console.log(figuras.pintarInfo());
        console.log(figuras.getArea());
    });
}

pintarInfoFiguras(figuras);
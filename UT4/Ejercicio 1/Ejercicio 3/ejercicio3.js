// Clase Ciclomotor
class Ciclomotor {
  constructor(marca, aceleracion = 10, desaceleracion = 5) {
    this.numRuedas = 2;
    this.velocidadMaxima = 120;
    this.velocidadActual = 0;
    this.marca = marca;
    this.aceleracion = aceleracion;
    this.desaceleracion = desaceleracion;
    this.encendida = false;
  }

  // Enciende el moto
  arrancar() {
    this.encendida = true;
    console.log("Se mete y gira la llave, la moto arranca.");
  }

  // Aumenta la velocidad
  acelerar() {
    if (this.encendida) {
      this.velocidadActual = this.velocidadActual + this.aceleracion;
      if (this.velocidadActual > this.velocidadMaxima) {
        this.velocidadActual = this.velocidadMaxima;
      }
    } else {
      console.log("La moto debe estar encendida para acelerar.");
    }
  }

  // Disminuye la velocidad
  frenar() {
    this.velocidadActual = this.velocidadActual - this.desaceleracion;
    if (this.velocidadActual < 0) {
      this.velocidadActual = 0;
    }
  }

  // Muestra los datos de la moto
  mostrarInfo() {
    let estado;
    if (this.encendida) {
      estado = "Encendida";
    } else {
      estado = "Apagada";
    }

    console.log("---- " + this.marca + " ----");
    console.log("Ruedas: " + this.numRuedas);
    console.log("Velocidad máxima: " + this.velocidadMaxima + " km/h");
    console.log("Velocidad actual: " + this.velocidadActual + " km/h");
    console.log("Aceleración: " + this.aceleracion);
    console.log("Desaceleración: " + this.desaceleracion);
    console.log("Encendida: " + estado);
    console.log("");
  }
}

// Clase Scooter que hereda de Ciclomotor
class Scooter extends Ciclomotor {
  constructor(marca) {
    super(marca);
  }

  // La Scooter se arranca diferente
  arrancar() {
    this.encendida = true;
    console.log("Se acerca la llave y se pulsa el botón, la moto arranca.");
  }
}

// Clase MotoCross que hereda de Ciclomotor
class MotoCross extends Ciclomotor {
  constructor(marca, aceleracion, desaceleracion) {
    super(marca, aceleracion, desaceleracion);
    this.velocidadMaxima = 90;
    this.marchaActual = 0;
  }

  // La MotoCross levanta la pata de cabra al arrancar
  arrancar() {
    console.log("Se levanta la pata de cabra.");
    this.encendida = true;
    console.log("Se mete y gira la llave, la moto arranca.");
  }

  // Al acelerar cambia la marcha
  acelerar() {
    this.velocidadActual = this.velocidadActual + this.aceleracion;
    if (this.velocidadActual > this.velocidadMaxima) {
      this.velocidadActual = this.velocidadMaxima;
    }
    this.ajustarMarcha();
  }

  // Al frenar cambia la marcha
  frenar() {
    this.velocidadActual = this.velocidadActual - this.desaceleracion;
    if (this.velocidadActual < 0) {
      this.velocidadActual = 0;
    }
    this.ajustarMarcha();
  }

  // Cambia la marcha según la velocidad
  ajustarMarcha() {
    if (this.velocidadActual == 0) {
      this.marchaActual = 0;
    } else if (this.velocidadActual <= 10) {
      this.marchaActual = 1;
    } else if (this.velocidadActual <= 30) {
      this.marchaActual = 2;
    } else {
      this.marchaActual = 3;
    }
  }

  // Muestra los datos incluyendo la marcha
  mostrarInfo() {
    let estado;
    if (this.encendida) {
      estado = "Encendida";
    } else {
      estado = "Apagada";
    }

    console.log("---- " + this.marca + " ----");
    console.log("Ruedas: " + this.numRuedas);
    console.log("Velocidad máxima: " + this.velocidadMaxima + " km/h");
    console.log("Velocidad actual: " + this.velocidadActual + " km/h");
    console.log("Marcha: " + this.marchaActual);
    console.log("Aceleración: " + this.aceleracion);
    console.log("Desaceleración: " + this.desaceleracion);
    console.log("Encendida: " + estado);
    console.log("");
  }
}

// Consola

console.log("======== PRUEBA 1: CICLOMOTOR YAMAHA ========\n");
let ciclomotor = new Ciclomotor("Yamaha", 70, 20);
console.log("LA MOTO INICIALMENTE:");
ciclomotor.mostrarInfo();

console.log("ARRANCAMOS Y ACELERAMOS:");
ciclomotor.arrancar();
ciclomotor.acelerar();
ciclomotor.mostrarInfo();

console.log("ACELERAMOS MAS:");
ciclomotor.acelerar();
ciclomotor.mostrarInfo();

console.log("FRENAMOS:");
ciclomotor.frenar();
ciclomotor.mostrarInfo();



console.log("\n======== PRUEBA 2: SCOOTER YAMAHA ========\n");
let scooter = new Scooter("Yamaha");
console.log("LA MOTO INICIALMENTE:");
scooter.mostrarInfo();

console.log("ARRANCAMOS Y ACELERAMOS:");
scooter.arrancar();
scooter.acelerar();
scooter.mostrarInfo();

console.log("ACELERAMOS MAS:");
scooter.acelerar();
scooter.mostrarInfo();

console.log("FRENAMOS:");
scooter.frenar();
scooter.mostrarInfo();



console.log("\n======== PRUEBA 3: MOTOCROSS HONDA ========\n");
let motoMotoCross = new MotoCross("Honda", 10, 5);
console.log("LA MOTO DE MOTOCROSS INICIALMENTE:");
motoMotoCross.mostrarInfo();

console.log("ARRANCAMOS Y ACELERAMOS:");
motoMotoCross.arrancar();
motoMotoCross.acelerar();
motoMotoCross.mostrarInfo();

console.log("ACELERAMOS MAS:");
motoMotoCross.acelerar();
motoMotoCross.mostrarInfo();

console.log("FRENAMOS:");
motoMotoCross.frenar();
motoMotoCross.mostrarInfo();


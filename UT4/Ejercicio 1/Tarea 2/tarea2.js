// Clase Trabajador: Representa un empleado del restaurante
class Trabajador {
  // Constructor que recibe nombre, horas semanales y salario por hora
  constructor(nombre, numHorasSemanales, salarioporHora) {
    this.nombre = nombre;
    this.numHorasSemanales = numHorasSemanales;
    this.salarioporHora = salarioporHora;
  }

  // Método que calcula cuánto gana el trabajador en una semana
  getSaldoSemanal() {
    return this.numHorasSemanales * this.salarioporHora;
  }

  // Método que muestra la información del trabajador
  pintarInfo() {
    console.log(`El nombre del trabajador es: ${this.nombre}`);
    console.log(`El número de horas semanales: ${this.numHorasSemanales}`);
    console.log(`El precio/hora: ${this.salarioporHora}`);
  }
}

// Clase Restaurante: Gestiona un restaurante y sus trabajadores
class Restaurante {
  // Constructor que recibe el nombre del restaurante
  constructor(nombre) {
    this.nombre = nombre;
    this.trabajadores = []; // Array vacío para guardar los trabajadores
  }

  // Método que añade un trabajador al array de trabajadores
  anadirTrabajador(trabajador) {
    this.trabajadores.push(trabajador);
  }

  // Método que muestra la información del restaurante y de todos sus trabajadores
  pintarInfo() {
    console.log(`INFORMACIÓN DEL RESTAURANTE ${this.nombre}`);
    console.log(`INFORMACIÓN DEL RESTAURANTE ${this.nombre}`);
    
    // Recorro el array de trabajadores para mostrar cada uno
    this.trabajadores.forEach((trabajador, indice) => {
      console.log(`Trabajador ${indice}:`);
      trabajador.pintarInfo();
    });
  }

  // Método que suma el salario semanal de todos los trabajadores
  getPagosSemaanales() {
    let totalPagos = 0;
    
    // Recorro cada trabajador y sumo su saldo semanal
    this.trabajadores.forEach((trabajador) => {
      totalPagos = totalPagos + trabajador.getSaldoSemanal();
    });
    
    return totalPagos;
  }
}

// Código de prueba: crear un restaurante y añadir trabajadores
let restaurante = new Restaurante("La tapería");
restaurante.pintarInfo(); // Primero sin trabajadores

// Crear tres trabajadores y añadirlos al restaurante
restaurante.anadirTrabajador(new Trabajador("Pepe", 40, 10));
restaurante.anadirTrabajador(new Trabajador("Laura", 35, 15));
restaurante.anadirTrabajador(new Trabajador("Marcos", 20, 10));

// Mostrar información del restaurante con los trabajadores
restaurante.pintarInfo();

// Mostrar el total que hay que pagar a los trabajadores en una semana
console.log("Mantener a los trabajadores del restaurante cuesta: " + restaurante.getPagosSemaanales());

import { crearHeader } from '../components/header.js';
import { Producto } from '../clases/Producto.js';
import '../../styles/main.css';

document.addEventListener('DOMContentLoaded', async () => {
  crearHeader();
  await cargarProductosDestacados();
  inicializarBootstrap();
});

/**
 * Carga los productos destacados desde el servidor (uno de cada categoría)
 * @returns {Promise<void>}
 */
async function cargarProductosDestacados() {
  try {
    const electronica = await fetch('http://localhost:3000/electronica').then(r => r.json());
    const muebles = await fetch('http://localhost:3000/muebles').then(r => r.json());
    const decoracion = await fetch('http://localhost:3000/decoracion').then(r => r.json());
    
    const contenedor = document.getElementById('productosDestacados');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    const productosDestacados = [
      electronica[0],
      muebles[0],
      decoracion[0]
    ].filter(p => p);
    
    productosDestacados.forEach(producto => {
      const divProducto = Producto.getDivFromProducto(producto);
      contenedor.appendChild(divProducto);
    });
    
  } catch (error) {
    console.error('Error al cargar productos destacados:', error);
    mostrarError('No se pudieron cargar los productos destacados');
  }
}

/**
 * Inicializa los componentes de Bootstrap en la página
 */
function inicializarBootstrap() {
  if (typeof bootstrap !== 'undefined') {
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
      new bootstrap.Dropdown(dropdown);
    });
  }
}

/**
 * Muestra un mensaje de error en el contenedor de productos
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarError(mensaje) {
  const contenedor = document.getElementById('productosDestacados');
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning" role="alert">
          <i class="bi bi-exclamation-triangle me-2"></i>
          ${mensaje}. Asegúrate de que el servidor JSON está ejecutándose.
        </div>
      </div>
    `;
  }
}
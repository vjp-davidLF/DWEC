import { crearHeader } from '../components/header.js';
import { Producto } from '../clases/Producto.js';
import '../../styles/main.css';

// Cuando la página carga, configuramos todo
document.addEventListener('DOMContentLoaded', async () => {
  // Primero creamos el menú de navegación
  crearHeader();
  
  // Luego cargamos algunos productos destacados para la página principal
  await cargarProductosDestacados();
  
  // Por último inicializamos Bootstrap si está disponible
  inicializarBootstrap();
});

// Carga productos de todas las categorías para mostrar en la home
// Muestra 1 producto de cada categoría
async function cargarProductosDestacados() {
  try {
    // Cargar un producto de cada categoría
    const [electronica, muebles, decoracion] = await Promise.all([
      fetch('http://localhost:3000/electronica').then(r => r.json()),
      fetch('http://localhost:3000/muebles').then(r => r.json()),
      fetch('http://localhost:3000/decoracion').then(r => r.json())
    ]);
    
    const contenedor = document.getElementById('productosDestacados');
    if (!contenedor) return;
    
    // Limpiar contenedor
    contenedor.innerHTML = '';
    
    // Mostrar 1 producto de cada categoría
    const productosDestacados = [
      electronica[0],
      muebles[0],
      decoracion[0]
    ].filter(p => p); // Filtrar undefined por si alguna categoría está vacía
    
    productosDestacados.forEach(producto => {
      const divProducto = Producto.getDivFromProducto(producto);
      contenedor.appendChild(divProducto);
    });
    
  } catch (error) {
    console.error('Error al cargar productos destacados:', error);
    mostrarError('No se pudieron cargar los productos destacados');
  }
}

function inicializarBootstrap() {
  // Inicializar dropdowns de Bootstrap
  if (typeof bootstrap !== 'undefined') {
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
      new bootstrap.Dropdown(dropdown);
    });
  }
}

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
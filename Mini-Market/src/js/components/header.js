// Función auxiliar para marcar la página activa en el menú
// Revisa la URL actual y añade la clase 'active' si coincide
function activarPagina(pagina) {
  const currentPage = window.location.pathname.split('/').pop();
  return currentPage === `${pagina}.html` ? 'active' : '';
}

// Crea el header de navegación y lo añade a todas las páginas
// Incluye menú responsive, categorías y carrito de compra
export function crearHeader() {
  const header = document.createElement('header');
  header.className = 'navbar';
  header.innerHTML = `
    <div class="container">
      <a class="navbar-brand" href="index.html">
        <span class="logo-box">MM</span>
        <span class="logo-text">Mini-Market</span>
      </a>
      
      <nav class="navbar-nav">
        <a class="nav-link ${activarPagina('index')}" href="index.html">Inicio</a>
        <a class="nav-link ${activarPagina('electronica')}" href="electronica.html">Electrónica</a>
        <a class="nav-link ${activarPagina('muebles')}" href="muebles.html">Muebles</a>
        <a class="nav-link ${activarPagina('decoracion')}" href="decoracion.html">Decoración</a>
        <a class="nav-link ${activarPagina('cesta')}" href="cesta.html">
          <span id="textocesta">Carrito (0)</span>
        </a>
      </nav>
    </div>
  `;
  
  // Insertar el header al principio del body
  document.body.insertBefore(header, document.body.firstChild);
  
  // Actualizar el contador del carrito si la clase está disponible
  if (typeof Carrito !== 'undefined') {
    Carrito.actualizacabeceraCarrito();
  }
}
/**
 * Determina si la página actual debe estar marcada como activa
 * @param {string} pagina - Nombre de la página sin extensión
 * @returns {string} 'active' si es la página actual, '' en caso contrario
 */
function activarPagina(pagina) {
  const currentPage = window.location.pathname.split('/').pop();
  return currentPage === `${pagina}.html` ? 'active' : '';
}

/**
 * Crea e inserta el header de navegación en la página
 */
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
  
  document.body.insertBefore(header, document.body.firstChild);
  
  if (typeof Carrito !== 'undefined') {
    Carrito.actualizacabeceraCarrito();
  }
}
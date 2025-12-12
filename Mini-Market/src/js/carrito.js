

const CARRITO_KEY = 'mini-market-carrito';



/**
 * Obtiene todos los productos del carrito desde localStorage.
 * @returns {Array} Lista de productos en el carrito.
 */
export function obtenerCarrito() {
    const carritoJSON = localStorage.getItem(CARRITO_KEY);
    return carritoJSON ? JSON.parse(carritoJSON) : [];
}

/**
 * Guarda el carrito completo en localStorage.
 * @param {Array} carrito - Lista de productos.
 */
function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

/**
 * Añade un producto al carrito.
 * @param {Object} producto - Producto a añadir.
 */
export function añadirAlCarrito(producto) {
    const carrito = obtenerCarrito();
    carrito.push(producto);
    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

/**
 * Elimina un producto del carrito por su índice.
 * @param {number} indice - Índice del producto a eliminar.
 */
export function eliminarDelCarrito(indice) {
    const carrito = obtenerCarrito();
    carrito.splice(indice, 1);
    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

/**
 * Obtiene el número total de productos en el carrito.
 * @returns {number} Cantidad de productos.
 */
export function obtenerTotalProductos() {
    return obtenerCarrito().length;
}

/**
 * Actualiza el contador del carrito en el header.
 */
export function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-cesta');
    if (contador) {
        contador.textContent = obtenerTotalProductos();
    }
}

/**
 * Calcula el precio total de todos los productos en el carrito.
 * @returns {number} Precio total.
 */
export function calcularPrecioTotal() {
    const carrito = obtenerCarrito();
    return carrito.reduce((total, producto) => total + parseFloat(producto.precio), 0);
}
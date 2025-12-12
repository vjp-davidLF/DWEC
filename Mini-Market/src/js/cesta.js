
import { cargarHeader } from './header.js';
import { obtenerCarrito, eliminarDelCarrito, calcularPrecioTotal, actualizarContadorCarrito } from './carrito.js';
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar header
    cargarHeader();
    
    // 2. Mostrar carrito
    mostrarCarrito();
    
    // 3. Actualizar contador
    actualizarContadorCarrito();
});

/**
 * Muestra los productos del carrito en la tabla.
 */
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const tbody = document.querySelector('#tabla-cesta tbody');
    const precioTotalElem = document.getElementById('precio-total');
    
    tbody.innerHTML = '';
    
    if (carrito.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">El carrito está vacío.</td></tr>';
        precioTotalElem.textContent = 'Total: 0€';
        return;
    }
    
    carrito.forEach((producto, indice) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.titulo}</td>
            <td>${producto.precio}€</td>
            <td><button class="eliminar" data-indice="${indice}">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
    });
    
    // Actualizar precio total
    precioTotalElem.textContent = `Total: ${calcularPrecioTotal().toFixed(2)}€`;
    
    // Añadir event listeners a los botones eliminar
    document.querySelectorAll('.eliminar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const indice = parseInt(e.target.dataset.indice);
            eliminarDelCarrito(indice);
            mostrarCarrito(); // Actualizar la tabla
        });
    });
}
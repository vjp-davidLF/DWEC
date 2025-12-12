
import { cargarHeader } from './header.js';
import { fetchProductos } from './api.js';
import { añadirAlCarrito, actualizarContadorCarrito } from './carrito.js';
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Cargar header
    cargarHeader();
    
    // 2. Obtener productos destacados (de electrónica)
    const productosDestacados = await fetchProductos('electronica');
    const contenedor = document.getElementById('productos');
    
    // 3. Mostrar productos
    if (productosDestacados.length > 0) {
        contenedor.innerHTML = '<h2>Productos Destacados</h2>';
        productosDestacados.forEach(producto => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <img src="${producto.foto}" width="200" alt="${producto.titulo}">
                <p>${producto.descripcion}</p>
                <p><strong>Precio: ${producto.precio}€</strong></p>
                <button class="comprar" data-id="${producto.id}">Añadir al carrito</button>
                <hr>
            `;
            contenedor.appendChild(div);
        });
        
        // 4. Añadir event listeners a los botones
        document.querySelectorAll('.comprar').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const producto = productosDestacados.find(p => p.id == id);
                if (producto) {
                    añadirAlCarrito(producto);
                    alert(`${producto.titulo} añadido al carrito.`);
                }
            });
        });
    } else {
        contenedor.innerHTML = '<p>No hay productos disponibles.</p>';
    }
    
    // 5. Actualizar contador del carrito
    actualizarContadorCarrito();
});
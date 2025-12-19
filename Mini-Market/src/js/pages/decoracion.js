import { crearHeader } from '../components/header.js';
import { Carrito } from '../clases/Carrito.js';
import '../../styles/main.css';

const API_BASE = 'http://localhost:3000';

/**
 * Obtiene los productos de una categoría específica desde el servidor
 * @param {string} categoria - Nombre de la categoría a obtener
 * @returns {Promise<Array>} Promesa que resuelve con el array de productos
 */
async function fetchProductos(categoria) {
    try {
        const respuesta = await fetch(`${API_BASE}/${categoria}`);
        if (!respuesta.ok) throw new Error('Error al obtener productos');
        const productos = await respuesta.json();
        return productos;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    crearHeader();
    
    const productos = await fetchProductos('decoracion');
    const contenedor = document.getElementById('productos');
    
    if (productos.length > 0) {
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <div class="producto-imagen">
                    <img src="${producto.foto}" alt="${producto.titulo}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="producto-imagen-placeholder" style="display:none;">${producto.titulo}</div>
                </div>
                <div class="producto-info">
                    <p class="producto-categoria">Decoración</p>
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <div class="producto-rating">
                        <span class="stars">★★★★★</span>
                    </div>
                    <p class="producto-precio">${producto.precio}€</p>
                    <button class="btn-carrito comprar" data-id="${producto.id}">
                        Añadir al carrito
                    </button>
                </div>
            `;
            contenedor.appendChild(card);
        });
        
        document.querySelectorAll('.comprar').forEach(boton => {
            boton.addEventListener('click', async (evento) => {
                const id = evento.target.dataset.id;
                const producto = productos.find(p => p.id == id);
                if (producto) {
                    await Carrito.anadirProductoCarrito(producto);
                    alert(`${producto.titulo} añadido al carrito.`);
                }
            });
        });
    } else {
        contenedor.innerHTML = '<p class="no-productos">No hay productos de decoración disponibles.</p>';
    }
    
    await Carrito.actualizacabeceraCarrito();
});

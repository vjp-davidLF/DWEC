import { crearHeader } from '../components/header.js';
import { Carrito } from '../clases/Carrito.js';
import '../../styles/main.css';

const API_BASE = 'http://localhost:3000';

// Función para traer productos desde el servidor JSON
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
    // Creamos el menú de navegación
    crearHeader();
    
    // Traemos los productos de electrónica desde el servidor
    const productos = await fetchProductos('electronica');
    const contenedor = document.getElementById('productos');
    
    // Mostramos los productos en la página
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
                    <p class="producto-categoria">Electrónica</p>
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
        
        // Añadimos los eventos click a todos los botones de compra
        document.querySelectorAll('.comprar').forEach(boton => {
            boton.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                const producto = productos.find(p => p.id == id);
                if (producto) {
                    await Carrito.anadirProductoCarrito(producto);
                    alert(`${producto.titulo} añadido al carrito.`);
                }
            });
        });
    } else {
        contenedor.innerHTML = '<p class="no-productos">No hay productos de electrónica disponibles.</p>';
    }
    
    // Actualizamos el contador del carrito en el header
    await Carrito.actualizacabeceraCarrito();
});

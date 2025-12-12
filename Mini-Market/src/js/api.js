

const API_BASE = 'http://localhost:3000';

/**
 * Obtiene productos de una categoría desde el servidor.
 * @param {string} categoria - Nombre de la categoría ('electronica', 'muebles', 'decoracion').
 * @returns {Promise<Array>} Lista de productos.
 */
export async function fetchProductos(categoria) {
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
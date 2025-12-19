import { DatabaseCarrito } from './DatabaseCarrito.js';

export class Carrito {
    static db = null;

    /**
     * Inicializa la base de datos del carrito
     * @returns {Promise<IDBDatabase>} Promesa que resuelve con la base de datos
     */
    static async inicializarDB() {
        if (!this.db) {
            this.db = await DatabaseCarrito.openDatabase();
        }
        return this.db;
    }

    /**
     * Añade un producto al carrito o incrementa su cantidad si ya existe
     * @param {Object} producto - Producto del servidor a añadir al carrito
     * @returns {Promise<number>} Promesa que resuelve con el ID del producto
     */
    static async anadirProductoCarrito(producto) {
        const db = await this.inicializarDB();
        const productos = await DatabaseCarrito.getAllProducts(db);
        
        // Buscar si el producto ya existe (por el id original del servidor)
        const productoExistente = productos.find(p => p.idServidor === producto.id);
        
        if (productoExistente) {
            // Si existe, incrementar cantidad
            productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
            await DatabaseCarrito.updateProduct(db, productoExistente);
            console.log('Cantidad actualizada:', producto.titulo, 'x', productoExistente.cantidad);
            await this.actualizacabeceraCarrito();
            return productoExistente.id;
        } else {
            // Si no existe, añadir con cantidad 1
            const nuevoProducto = {
                ...producto,
                idServidor: producto.id, // Guardar el id original del servidor
                cantidad: 1
            };
            delete nuevoProducto.id; // Eliminar el id para que IndexedDB genere uno nuevo
            const productId = await DatabaseCarrito.insertProduct(db, nuevoProducto);
            console.log('Producto añadido:', producto.titulo);
            await this.actualizacabeceraCarrito();
            return productId;
        }
    }

    /**
     * Elimina un producto del carrito o decrementa su cantidad
     * @param {number} productoId - ID del producto en IndexedDB
     * @param {HTMLElement} trProducto - Elemento TR de la tabla
     */
    static async eliminaProductoCarrito(productoId, trProducto) {
        const db = await this.inicializarDB();
        const producto = await DatabaseCarrito.getProduct(db, productoId);
        
        if (producto && producto.cantidad > 1) {
            // Si tiene más de 1, decrementar cantidad
            producto.cantidad -= 1;
            await DatabaseCarrito.updateProduct(db, producto);
            // Actualizar solo la cantidad en el DOM
            const cantidadCell = trProducto.querySelector('.cantidad-producto');
            if (cantidadCell) {
                cantidadCell.textContent = producto.cantidad;
            }
        } else {
            // Si tiene 1 o menos, eliminar completamente
            await DatabaseCarrito.deleteProduct(db, productoId);
            trProducto.remove();
        }
        
        await this.actualizacabeceraCarrito();
        await this.calculatePrecioFinal();
    }

    /**
     * Actualiza el contador de productos en el header
     * @returns {Promise<void>}
     */
    static async actualizacabeceraCarrito() {
        const db = await this.inicializarDB();
        const productos = await DatabaseCarrito.getAllProducts(db);
        
        // Contar total de items considerando cantidades
        const totalItems = productos.reduce((sum, p) => sum + (p.cantidad || 1), 0);
        
        const textoCarrito = document.getElementById('textocesta');
        
        if (textoCarrito) {
            textoCarrito.textContent = `Carrito (${totalItems})`;
        }
    }

    /**
     * Calcula el precio total del carrito y lo renderiza en la tabla
     * @returns {Promise<number>} Promesa que resuelve con el total
     */
    static async calculatePrecioFinal() {
        const db = await this.inicializarDB();
        const productos = await DatabaseCarrito.getAllProducts(db);
        
        let total = 0;
        for(let i = 0; i < productos.length; i++) {
            const precio = parseFloat(productos[i].precio) || 0;
            const cantidad = productos[i].cantidad || 1;
            total += precio * cantidad;
        }
        
        // Renderizar el total en los elementos del DOM
        const totalElement = document.getElementById('total');
        const subtotalElement = document.getElementById('subtotal');
        
        if (totalElement) {
            totalElement.textContent = total.toFixed(2) + '€';
        }
        if (subtotalElement) {
            subtotalElement.textContent = total.toFixed(2) + '€';
        }
        
        return total;
    }

    /**
     * Obtiene todos los productos del carrito
     * @returns {Promise<Array>} Promesa que resuelve con los productos
     */
    static async obtenerCarrito() {
        const db = await this.inicializarDB();
        return await DatabaseCarrito.getAllProducts(db);
    }

    /**
     * Vacía completamente el carrito eliminando la base de datos
     * @returns {Promise<void>}
     */
    static async limpiarCarrito() {
        await DatabaseCarrito.deleteDatabase();
        this.db = null;
        await this.inicializarDB();
        await this.actualizacabeceraCarrito();
    }
}

import { DatabaseCarrito } from './DatabaseCarrito.js';

// Clase que maneja toda la lógica del carrito de compras
// Usa IndexedDB para guardar los productos de forma persistente
export class Carrito {
    static db = null;

    // Abre la base de datos si no está ya abierta
    // Así evitamos abrir la conexión varias veces
    static async inicializarDB() {
        if (!this.db) {
            this.db = await DatabaseCarrito.openDatabase();
        }
        return this.db;
    }

    // Añade un producto al carrito y actualiza el contador
    static async anadirProductoCarrito(producto) {
        const db = await this.inicializarDB();
        const productId = await DatabaseCarrito.insertProduct(db, producto);
        await this.actualizacabeceraCarrito();
        return productId;
    }

    // Elimina un producto del carrito y actualiza la vista
    static async eliminaProductoCarrito(productoId, trProducto) {
        const db = await this.inicializarDB();
        await DatabaseCarrito.deleteProduct(db, productoId);
        trProducto.remove();
        await this.actualizacabeceraCarrito();
        await this.calculatePrecioFinal();
    }

    // Actualiza el número de productos en el icono del carrito
    // Se ejecuta cada vez que añadimos o quitamos algo
    static async actualizacabeceraCarrito() {
        const db = await this.inicializarDB();
        const productos = await DatabaseCarrito.getAllProducts(db);
        const textoCarrito = document.getElementById('textocesta');
        
        if (textoCarrito) {
            textoCarrito.textContent = `Carrito (${productos.length})`;
        }
    }

    // Calcula el precio total sumando todos los productos
    static async calculatePrecioFinal() {
        const db = await this.inicializarDB();
        const productos = await DatabaseCarrito.getAllProducts(db);
        
        return productos.reduce((total, producto) => {
            return total + (parseFloat(producto.precio) || 0);
        }, 0);
    }

    // Devuelve todos los productos que hay en el carrito
    static async obtenerCarrito() {
        const db = await this.inicializarDB();
        return await DatabaseCarrito.getAllProducts(db);
    }

    // Vacía completamente el carrito eliminando todos los productos
    static async limpiarCarrito() {
        await DatabaseCarrito.deleteDatabase();
        // Reinicializar la base de datos
        this.db = null;
        await this.inicializarDB();
        await this.actualizacabeceraCarrito();
    }
}

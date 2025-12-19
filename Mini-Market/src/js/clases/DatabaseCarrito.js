const DB_NAME = 'mini-market-db';
const DB_VERSION = 1;
const STORE_NAME = 'carrito';

export class DatabaseCarrito {
    
    /**
     * Abre la base de datos IndexedDB para el carrito
     * @returns {Promise<IDBDatabase>} Promesa que resuelve con la instancia de la base de datos
     */
    static openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                }
            };
        });
    }

    /**
     * Obtiene todos los productos del carrito
     * @param {IDBDatabase} db - Instancia de la base de datos
     * @returns {Promise<Array>} Promesa que resuelve con un array de productos
     */
    static getAllProducts(db) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.getAll();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    /**
     * Obtiene un producto específico por su clave
     * @param {IDBDatabase} db - Instancia de la base de datos
     * @param {number} key - Clave del producto a buscar
     * @returns {Promise<Object>} Promesa que resuelve con el producto encontrado
     */
    static getProduct(db, key) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.get(key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    /**
     * Inserta un nuevo producto en el carrito
     * @param {IDBDatabase} db - Instancia de la base de datos
     * @param {Object} producto - Producto a insertar
     * @returns {Promise<number>} Promesa que resuelve con el ID del producto insertado
     */
    static insertProduct(db, producto) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.add(producto);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    /**
     * Actualiza un producto existente en el carrito
     * @param {IDBDatabase} db - Instancia de la base de datos
     * @param {Object} product - Producto con los datos actualizados
     * @param {number|null} key - Clave del producto (opcional)
     * @returns {Promise<void>} Promesa que resuelve cuando se completa la actualización
     */
    static updateProduct(db, product, key = null) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.put(product);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    /**
     * Elimina un producto del carrito
     * @param {IDBDatabase} db - Instancia de la base de datos
     * @param {number} key - Clave del producto a eliminar
     * @returns {Promise<void>} Promesa que resuelve cuando se completa la eliminación
     */
    static deleteProduct(db, key) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.delete(key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    /**
     * Elimina completamente la base de datos del carrito
     * @returns {Promise<void>} Promesa que resuelve cuando se completa la eliminación
     */
    static deleteDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.deleteDatabase(DB_NAME);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }
}

const DB_NAME = 'mini-market-db';
const DB_VERSION = 1;
const STORE_NAME = 'carrito';

// Clase para manejar IndexedDB y guardar el carrito del usuario
// Todo se guarda en el navegador, así no se pierde al recargar
export class DatabaseCarrito {
    // Abre (o crea) la base de datos IndexedDB
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

    // Obtiene todos los productos guardados en el carrito
    static getAllProducts(db) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.getAll();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    // Busca un producto específico por su ID
    static getProduct(db, key) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.get(key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    // Guarda un nuevo producto en el carrito
    static insertProduct(db, producto) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.add(producto);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    // Actualiza un producto que ya existe en el carrito
    static updateProduct(db, product, key = null) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.put(product);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    // Elimina un producto del carrito por su ID
    static deleteProduct(db, key) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.delete(key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    // Elimina completamente la base de datos (usar con cuidado!)
    static deleteDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.deleteDatabase(DB_NAME);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }
}

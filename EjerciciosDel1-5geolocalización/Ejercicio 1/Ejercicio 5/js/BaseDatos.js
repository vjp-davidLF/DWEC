// Manejador de IndexedDB como se pide en el ejercicio
class ManejadorDB {
    constructor() {
        this.dbName = 'ProductsDB';
        this.dbVersion = 1;
        this.storeName = 'products';
        this.db = null;
    }
    
    // Abrir la base de datos (devuelve Promise)
    abrirDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = (event) => {
                console.error('Error al abrir la base de datos:', event.target.error);
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('Base de datos abierta exitosamente');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                console.log('Actualizando base de datos...');
                const db = event.target.result;
                
                // Crear almacén de objetos si no existe
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { 
                        keyPath: 'id', 
                        autoIncrement: true 
                    });
                    
                    // Crear índices para búsquedas
                    store.createIndex('item', 'item', { unique: false });
                    store.createIndex('marca', 'marca', { unique: false });
                    store.createIndex('cantidad', 'cantidad', { unique: false });
                    
                    console.log('Almacén de objetos creado:', this.storeName);
                }
            };
        });
    }
    
    // Obtener todos los productos (devuelve Promise)
    obtenerTodosLosProductos() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('La base de datos no está abierta'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
            
            request.onerror = (event) => {
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
        });
    }
    
    // Insertar un producto (devuelve Promise)
    insertarProducto(producto) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('La base de datos no está abierta'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add(producto);
            
            request.onerror = (event) => {
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                resolve(event.target.result); // Devuelve el ID generado
            };
        });
    }
    
    // Actualizar un producto
    actualizarProducto(id, producto) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('La base de datos no está abierta'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            
            // Primero obtenemos el producto para actualizarlo con el id
            const productoActualizado = { ...producto, id: id };
            const request = store.put(productoActualizado);
            
            request.onerror = (event) => {
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
        });
    }
    
    // Eliminar un producto
    eliminarProducto(id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('La base de datos no está abierta'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);
            
            request.onerror = (event) => {
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                resolve(true);
            };
        });
    }
    
    // Eliminar todos los productos
    eliminarTodosLosProductos() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('La base de datos no está abierta'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();
            
            request.onerror = (event) => {
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                resolve(true);
            };
        });
    }
    
    // Eliminar la base de datos completa (para limpiar)
    eliminarBD() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.deleteDatabase(this.dbName);
            
            request.onerror = (event) => {
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                this.db = null;
                resolve(true);
            };
        });
    }
}

// Crear instancia global del manejador
const manejadorDB = new ManejadorDB();
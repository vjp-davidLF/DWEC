// ========================================
// GESTOR DE INVENTARIO CON INDEXEDDB
// ========================================
// Este es un ejercicio avanzado que usa IndexedDB
// (una base de datos en el navegador, más potente que localStorage)

// Elementos del DOM que necesitamos
const productForm = document.getElementById('productForm');  // Formulario
const itemInput = document.getElementById('item');  // Nombre del producto
const cantidadInput = document.getElementById('cantidad');  // Cantidad
const precioInput = document.getElementById('precioUnidad');  // Precio por unidad
const marcaInput = document.getElementById('marca');  // Marca
const saveBtn = document.getElementById('saveBtn');  // Botón guardar
const clearFormBtn = document.getElementById('clearFormBtn');  // Limpiar formulario
const refreshBtn = document.getElementById('refreshBtn');  // Recargar lista
const clearAllBtn = document.getElementById('clearAllBtn');  // Eliminar todo
const messageDiv = document.getElementById('message');  // Mostrar mensajes
const productsContainer = document.getElementById('productsContainer');  // Tabla de productos
const statsContainer = document.getElementById('stats');  // Estadísticas
const emptyState = document.getElementById('emptyState');  // Mensaje cuando no hay productos

// Variables globales
let editingProductId = null;  // ID del producto que estamos editando (null si creamos uno nuevo)

// Inicializar la aplicación cuando cargue la página
// Abre la BD y carga los productos
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Abrir (o crear) la base de datos IndexedDB
        await manejadorDB.abrirDB();
        showMessage('Base de datos conectada exitosamente', 'success');
        
        // Cargar y mostrar todos los productos guardados
        await loadProducts();
        
        // Configurar todos los eventos de los botones
        setupEventListeners();
        
    } catch (error) {
        // Si algo falla, mostrar el error
        console.error('Error al inicializar:', error);
        showMessage(`Error al conectar con la base de datos: ${error.message}`, 'error');
    }
});

// Configurar todos los eventos de los botones
// Cada botón ejecuta una función diferente
function setupEventListeners() {
    // Guardar nuevo producto o actualizar uno existente
    saveBtn.addEventListener('click', saveProduct);
    
    // Limpiar el formulario
    clearFormBtn.addEventListener('click', clearForm);
    
    // Actualizar y recargar la lista
    refreshBtn.addEventListener('click', loadProducts);
    
    // Eliminar TODOS los productos (con confirmación)
    clearAllBtn.addEventListener('click', clearAllProducts);
    
    // Permitir guardar al presionar Enter en cualquier campo
    productForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveProduct();
        }
    });
}

// Mostrar un mensaje al usuario
// Los mensajes de éxito desaparecen solos después de 3 segundos
// Los errores se mantienen hasta que el usuario lo vea
function showMessage(text, type = 'info') {
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
    
    // Ocultar mensaje después de 3 segundos (excepto errores)
    if (type !== 'error') {
        setTimeout(() => {
            messageDiv.className = 'message';
        }, 3000);
    }
}

// Validar que el formulario tenga datos válidos
// Devuelve true si todo es válido, false si hay algún error
function validateForm() {
    const item = itemInput.value.trim();
    const cantidad = cantidadInput.value.trim();
    const precio = precioInput.value.trim();
    
    // Validar nombre del producto
    if (!item) {
        showMessage('El nombre del producto es requerido', 'error');
        itemInput.focus();
        return false;
    }
    
    // Validar cantidad
    if (!cantidad || isNaN(cantidad) || parseInt(cantidad) < 0) {
        showMessage('La cantidad debe ser un número válido (0 o mayor)', 'error');
        cantidadInput.focus();
        return false;
    }
    
    // Validar precio
    if (!precio || isNaN(precio) || parseFloat(precio) < 0) {
        showMessage('El precio debe ser un número válido (0 o mayor)', 'error');
        precioInput.focus();
        return false;
    }
    
    return true;  // Todo es válido
}

// Limpiar formulario
function clearForm() {
    itemInput.value = '';
    cantidadInput.value = '';
    precioInput.value = '';
    marcaInput.value = '';
    editingProductId = null;
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Guardar Producto';
    saveBtn.className = 'btn btn-success';
    showMessage('Formulario limpiado', 'info');
    itemInput.focus();
}

// Guardar producto (crear o actualizar)
async function saveProduct() {
    if (!validateForm()) return;
    
    try {
        // Crear objeto producto
        const producto = new Producto(
            itemInput.value.trim(),
            parseInt(cantidadInput.value),
            parseFloat(precioInput.value),
            marcaInput.value.trim() || "-"
        );
        
        let message = '';
        
        if (editingProductId) {
            // Actualizar producto existente
            await manejadorDB.actualizarProducto(editingProductId, producto.toObject());
            message = `Producto "${producto.item}" actualizado exitosamente`;
        } else {
            // Insertar nuevo producto
            await manejadorDB.insertarProducto(producto.toObject());
            message = `Producto "${producto.item}" agregado exitosamente`;
        }
        
        showMessage(message, 'success');
        clearForm();
        await loadProducts();
        
    } catch (error) {
        console.error('Error al guardar producto:', error);
        showMessage(`Error al guardar: ${error.message}`, 'error');
    }
}

// Cargar y mostrar productos
async function loadProducts() {
    try {
        const productos = await manejadorDB.obtenerTodosLosProductos();
        displayProducts(productos);
        updateStats(productos);
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
        showMessage(`Error al cargar productos: ${error.message}`, 'error');
    }
}

// Mostrar productos en la tabla
function displayProducts(productos) {
    if (productos.length === 0) {
        productsContainer.innerHTML = `
            <div class="empty-state" id="emptyState">
                <i class="fas fa-box-open"></i>
                <h3>No hay productos</h3>
                <p>Agrega tu primer producto usando el formulario</p>
            </div>
        `;
        return;
    }
    
    // Crear tabla
    let tableHTML = `
        <table class="products-table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Marca</th>
                    <th>Valor Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Ordenar productos por nombre
    productos.sort((a, b) => a.item.localeCompare(b.item));
    
    // Agregar cada producto a la tabla
    productos.forEach(producto => {
        const valorTotal = producto.cantidad * producto.precioUnidad;
        
        tableHTML += `
            <tr>
                <td>${producto.item}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precioUnidad.toFixed(2)}€</td>
                <td>${producto.marca}</td>
                <td class="total-value">${valorTotal.toFixed(2)}€</td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn edit-btn" data-id="${producto.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${producto.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    productsContainer.innerHTML = tableHTML;
    
    // Configurar eventos para botones de acción
    setupActionButtons();
}

// Configurar eventos para botones de editar/eliminar
function setupActionButtons() {
    // Botones de editar
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const productId = parseInt(this.getAttribute('data-id'));
            await editProduct(productId);
        });
    });
    
    // Botones de eliminar
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const productId = parseInt(this.getAttribute('data-id'));
            await deleteProduct(productId);
        });
    });
}

// Editar producto
async function editProduct(productId) {
    try {
        const productos = await manejadorDB.obtenerTodosLosProductos();
        const producto = productos.find(p => p.id === productId);
        
        if (producto) {
            // Rellenar formulario con datos del producto
            itemInput.value = producto.item;
            cantidadInput.value = producto.cantidad;
            precioInput.value = producto.precioUnidad;
            marcaInput.value = producto.marca;
            
            // Cambiar modo a edición
            editingProductId = productId;
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar Producto';
            saveBtn.className = 'btn btn-success';
            
            showMessage(`Editando producto: "${producto.item}"`, 'info');
            itemInput.focus();
        }
    } catch (error) {
        console.error('Error al cargar producto para editar:', error);
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Eliminar producto
async function deleteProduct(productId) {
    try {
        const productos = await manejadorDB.obtenerTodosLosProductos();
        const producto = productos.find(p => p.id === productId);
        
        if (!producto) {
            showMessage('Producto no encontrado', 'error');
            return;
        }
        
        if (confirm(`¿Estás seguro de que quieres eliminar "${producto.item}"?`)) {
            await manejadorDB.eliminarProducto(productId);
            showMessage(`Producto "${producto.item}" eliminado`, 'success');
            await loadProducts();
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        showMessage(`Error al eliminar: ${error.message}`, 'error');
    }
}

// Eliminar todos los productos
async function clearAllProducts() {
    try {
        const productos = await manejadorDB.obtenerTodosLosProductos();
        
        if (productos.length === 0) {
            showMessage('No hay productos para eliminar', 'info');
            return;
        }
        
        if (confirm(`¿Estás seguro de que quieres eliminar TODOS los productos (${productos.length})?`)) {
            await manejadorDB.eliminarTodosLosProductos();
            showMessage('Todos los productos han sido eliminados', 'success');
            await loadProducts();
            clearForm();
        }
    } catch (error) {
        console.error('Error al eliminar todos los productos:', error);
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Actualizar estadísticas
function updateStats(productos) {
    const totalProductos = productos.length;
    const totalCantidad = productos.reduce((sum, p) => sum + p.cantidad, 0);
    const valorTotalInventario = productos.reduce((sum, p) => {
        return sum + (p.cantidad * p.precioUnidad);
    }, 0);
    
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${totalProductos}</div>
            <div class="stat-label">Productos Totales</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${totalCantidad}</div>
            <div class="stat-label">Unidades en Stock</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${valorTotalInventario.toFixed(2)}€</div>
            <div class="stat-label">Valor del Inventario</div>
        </div>
    `;
}
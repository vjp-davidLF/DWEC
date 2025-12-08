// Clase Producto como se pide en el ejercicio
class Producto {
    constructor(item, cantidad, precioUnidad, marca = "-") {
        this.item = item || "-";
        this.cantidad = cantidad || 0;
        this.precioUnidad = precioUnidad || 0;
        this.marca = marca || "-";
    }
    
    // Método para calcular el valor total
    get valorTotal() {
        return this.cantidad * this.precioUnidad;
    }
    
    // Método estático para crear fila de tabla (como pide el ejercicio)
    static devolverTRProducto(producto) {
        const tr = document.createElement('tr');
        
        // Calcular valor total
        const valorTotal = producto.cantidad * producto.precioUnidad;
        
        tr.innerHTML = `
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
        `;
        
        return tr;
    }
    
    // Método para convertir a objeto simple
    toObject() {
        return {
            item: this.item,
            cantidad: this.cantidad,
            precioUnidad: this.precioUnidad,
            marca: this.marca,
            valorTotal: this.valorTotal
        };
    }
}
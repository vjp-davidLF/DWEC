import { crearHeader } from '../components/header.js';
import { Producto } from '../clases/Producto.js';
import { Carrito } from '../clases/Carrito.js';
import { DatabaseCarrito } from '../clases/DatabaseCarrito.js';
import '../../styles/main.css';

// Cuando carga la página del carrito, configuramos todo
document.addEventListener('DOMContentLoaded', async () => {
  // Primero creamos el header
  crearHeader();
  
  // Mostramos todos los productos que el usuario tiene en el carrito
  await mostrarProductosCarrito();
  
  // Conectamos el botón de finalizar compra
  const btnFinalizar = document.getElementById('pagar');
  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', finalizarCompra);
  }
  
  // Conectar botón de vaciar carrito
  const btnVaciar = document.getElementById('vaciar-carrito');
  if (btnVaciar) {
    btnVaciar.addEventListener('click', async () => {
      if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        try {
          await Carrito.limpiarCarrito();
          location.reload();
        } catch (error) {
          console.error('Error al vaciar carrito:', error);
          alert('Error al vaciar el carrito');
        }
      }
    });
  }
  
  // Conectar botón de seguir comprando
  const btnContinuar = document.getElementById('continuar-comprando');
  if (btnContinuar) {
    btnContinuar.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});

// Muestra todos los productos que hay en el carrito
// Si está vacío, muestra un mensaje bonito
async function mostrarProductosCarrito() {
  try {
    const db = await DatabaseCarrito.openDatabase();
    const productosBD = await DatabaseCarrito.getAllProducts(db);
    db.close();
    
    const tabla = document.getElementById('tablaCarrito');
    const tbody = tabla.querySelector('tbody');
    
    // Limpiamos la tabla antes de mostrar los productos
    tbody.innerHTML = '';
    
    if (productosBD.length === 0) {
      // Si no hay productos, mostramos un mensaje amigable
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center py-5">
            <i class="bi bi-cart-x display-1 text-muted"></i>
            <h4 class="mt-3">Tu carrito está vacío</h4>
            <p class="text-muted">Añade algunos productos para comenzar</p>
            <a href="index.html" class="btn btn-primary mt-2">
              <i class="bi bi-arrow-left me-1"></i>Ir a la tienda
            </a>
          </td>
        </tr>
      `;
      
      // Deshabilitar botón de pagar
      const btnPagar = document.getElementById('pagar');
      if (btnPagar) {
        btnPagar.disabled = true;
      }
      
      return;
    }
    
    // Habilitar botón de pagar si hay productos
    const btnPagar = document.getElementById('pagar');
    if (btnPagar) {
      btnPagar.disabled = false;
    }
    
    // Añadimos cada producto como una fila en la tabla
    productosBD.forEach(productoBD => {
      const trProducto = Producto.getTrFromProductoBD(productoBD);
      tbody.appendChild(trProducto);
    });
    
    // Calculamos y mostramos el precio total
    const total = await Carrito.calculatePrecioFinal();
    const totalElement = document.getElementById('total');
    const subtotalElement = document.getElementById('subtotal');
    
    if (totalElement) {
      totalElement.textContent = total.toFixed(2) + '€';
    }
    if (subtotalElement) {
      subtotalElement.textContent = total.toFixed(2) + '€';
    }
    
  } catch (error) {
    console.error('Error al mostrar productos del carrito:', error);
    mostrarError('Error al cargar el carrito');
  }
}

// Procesa la compra final y vacía el carrito
async function finalizarCompra() {
  if (!confirm('¿Estás seguro de que quieres finalizar el pedido?')) {
    return;
  }
  
  try {
    await DatabaseCarrito.deleteDatabase();
    await Carrito.actualizacabeceraCarrito();
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 100);
  } catch (error) {
    console.error('Error al finalizar compra:', error);
    window.location.href = 'index.html';
  }
}

function mostrarError(mensaje) {
  const tbody = document.querySelector('#tablaCarrito tbody');
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center py-5 text-danger">
          <i class="bi bi-exclamation-triangle display-1"></i>
          <h4 class="mt-3">Error</h4>
          <p>${mensaje}</p>
        </td>
      </tr>
    `;
  }
}
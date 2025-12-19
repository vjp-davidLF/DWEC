import { Carrito } from './Carrito.js';

export class Producto {
  // Convierte un producto del servidor en una tarjeta HTML
  // Crea todo el HTML necesario y añade el evento de click al botón
  static getDivFromProducto(producto) {
    const div = document.createElement('div');
    div.className = 'col-md-4 mb-4';
    div.innerHTML = `
      <div class="card h-100">
        <img src="${producto.foto}" class="card-img-top" alt="${producto.titulo}" style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.titulo}</h5>
          <p class="card-text flex-grow-1">${producto.descripcion.substring(0, 100)}...</p>
          <div class="mt-auto">
            <p class="card-text fw-bold">${producto.precio} €</p>
            <button class="btn btn-primary btn-add-cart" data-producto='${JSON.stringify(producto)}'>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Evento para añadir al carrito
    const btn = div.querySelector('.btn-add-cart');
    btn.addEventListener('click', async () => {
      const productoData = JSON.parse(btn.dataset.producto);
      await Carrito.anadirProductoCarrito(productoData);
    });
    
    return div;
  }

  // Convierte un producto del carrito en una fila de tabla
  // Se usa para mostrar los productos en la página del carrito
  static getTrFromProductoBD(productoBD) {
    const tr = document.createElement('tr');
    tr.className = 'producto';
    tr.innerHTML = `
      <td>
        <img src="${productoBD.foto}" alt="${productoBD.titulo}" 
             style="width: 80px; height: 80px; object-fit: cover;">
      </td>
      <td class="align-middle">${productoBD.titulo}</td>
      <td class="align-middle precio-producto">${productoBD.precio} €</td>
      <td class="align-middle">
        <button class="btn btn-danger btn-sm btn-eliminar" 
                data-id="${productoBD.id}">
          Eliminar
        </button>
      </td>
    `;
    
    // Evento para eliminar del carrito
    const btnEliminar = tr.querySelector('.btn-eliminar');
    btnEliminar.addEventListener('click', async () => {
      await Carrito.eliminaProductoCarrito(productoBD.id, tr);
    });
    
    return tr;
  }
}
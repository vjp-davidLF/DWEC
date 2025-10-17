// URL del archivo JSON con los datos de restaurantes desde GitHub
const jsonUrl = 'https://raw.githubusercontent.com/fredericsangar/backupOpendataCCJSON/master/restaurantes.json';

// Se ejecuta cuando el documento está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const cargarBtn = document.getElementById('cargar');
    const tbody = document.getElementById('lista-restaurantes');

    // Al hacer clic en el botón, se cargan los restaurantes
    cargarBtn.addEventListener('click', () => {
        cargarRestaurantes();
    });

    // Realiza una petición XMLHttpRequest al servidor
    function cargarRestaurantes() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', jsonUrl, true);
        
        // Se ejecuta cada vez que cambia el estado de la petición
        xhr.addEventListener('readystatechange', () => {
            // readyState 4 significa que la petición se completó
            if (xhr.readyState === 4) {
                // status 200 significa que la respuesta fue exitosa
                if (xhr.status === 200) {
                    procesarDatos(xhr.responseText);
                } else {
                    mostrarError(`Error HTTP: ${xhr.status}`);
                }
            }
        });
        
        // Envía la petición al servidor
        xhr.send();
    }

    // Parsea el JSON y llena la tabla con los datos
    function procesarDatos(respuesta) {
        try {
            const data = JSON.parse(respuesta);
            
            // Valida que la estructura del JSON sea correcta
            if (!data.results || !data.results.bindings) {
                throw new Error('Estructura de datos incorrecta');
            }
            
            const restaurantes = data.results.bindings;
            tbody.innerHTML = '';
            
            // Si no hay restaurantes, muestra un mensaje
            if (restaurantes.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay restaurantes</td></tr>';
                return;
            }
            
            // Itera sobre cada restaurante y crea una fila en la tabla
            restaurantes.forEach((rest, index) => {
                crearFila(rest, index);
            });
        } catch (err) {
            mostrarError(`Error al procesar datos: ${err.message}`);
        }
    }

    // Crea una fila de la tabla con los datos de un restaurante
    function crearFila(restaurante, index) {
        const nombre = restaurante.rdfs_label?.value || '-';
        const web = restaurante.schema_url?.value || '';
        const calle = restaurante.schema_address_streetAddress?.value || '';
        const ciudad = restaurante.schema_address_addressLocality?.value || '';
        const direccion = calle && ciudad ? `${calle}, ${ciudad}` : calle || ciudad || '-';
        const aforo = restaurante.om_capacidadPersonas?.value || '-';
        const numero = index + 1;
        
        // Crea un elemento <tr> y lo llena con los datos
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${numero}</td>
            <td>${nombre}</td>
            <td>${web ? `<a href="${web}" target="_blank">${web}</a>` : '-'}</td>
            <td>${direccion}</td>
            <td>${aforo}</td>
        `;
        tbody.appendChild(fila);
    }

    // Muestra un mensaje de error en la tabla
    function mostrarError(mensaje) {
        tbody.innerHTML = `<tr><td colspan='5' style='text-align:center; color:red;'>${mensaje}</td></tr>`;
    }
});
// =====================================
// EJERCICIO 2: MAPA DE PLASENCIA
// =====================================
// Variables para gestionar los elementos del mapa
let map = null;
let markers = [];  // Array de marcadores
let circles = [];  // Array de círculos
let polygons = [];  // Array de polígonos

// Coordenadas del centro de Plasencia (Extremadura, España)
const PLASENCIA_CENTER = [40.0286, -6.0883];

// Datos de los puntos de interés de Plasencia
// Cada punto tiene info diferente según su tipo (marcador, círculo o polígono)
const puntosInteres = {
    ayuntamiento: {
        nombre: "Ayuntamiento de Plasencia",
        coordenadas: [40.0292, -6.0908],
        tipo: "marker",
        color: "#e74c3c",
        icono: "fas fa-university",
        descripcion: "El Ayuntamiento de Plasencia es el órgano de gobierno local de la ciudad. Se encuentra en la Plaza Mayor, en un edificio histórico que data del siglo XVI.",
        enlace: "https://www.aytoplasencia.es/",
        enlaceTexto: "Visitar web oficial",
        radio: null // No aplica para marcador
    },
    
    piscina: {
        nombre: "Piscina Bioclimática de Plasencia",
        coordenadas: [40.0325, -6.1012],
        tipo: "circle",
        color: "#3498db",
        icono: "fas fa-swimming-pool",
        descripcion: "Instalación deportiva cubierta con condiciones climáticas controladas. Ofrece natación recreativa y deportiva durante todo el año.",
        enlace: "https://www.aytoplasencia.es/turismo/ocio-y-deporte/piscina-bioclimatica/",
        enlaceTexto: "Más información",
        radio: 80 // Radio en metros
    },
    
    instituto: {
        nombre: "IES Valle del Jerte",
        coordenadas: [40.0278, -6.0854],
        tipo: "polygon",
        color: "#2ecc71",
        icono: "fas fa-school",
        descripcion: "Instituto de Educación Secundaria ubicado en Plasencia. Ofrece formación en ESO, Bachillerato y ciclos formativos.",
        enlace: "http://iesvalledeljerte.educarex.es/",
        enlaceTexto: "Web del instituto",
        puntos: [
            [40.0280, -6.0850],
            [40.0275, -6.0858],
            [40.0270, -6.0850],
            [40.0275, -6.0842],
            [40.0280, -6.0850] // Cierra el polígono
        ]
    },
    
    estacion: {
        nombre: "Estación de Trenes de Plasencia",
        coordenadas: [40.0245, -6.0950],
        tipo: "polygon",
        color: "#f39c12",
        icono: "fas fa-train",
        descripcion: "Estación de ferrocarril que conecta Plasencia con Madrid y otras ciudades de Extremadura. Inaugurada en 1927.",
        enlace: "https://www.renfe.com/es/es",
        enlaceTexto: "Horarios y tarifas",
        puntos: [
            [40.0248, -6.0953],
            [40.0242, -6.0955],
            [40.0240, -6.0947],
            [40.0246, -6.0945],
            [40.0248, -6.0953] // Cierra el polígono
        ]
    }
};

// Inicializar el mapa de Plasencia
// Crea el mapa, añade la capa base, dibuja elementos y configura eventos
function initMap() {
    // Crear mapa centrado en las coordenadas de Plasencia
    map = L.map('map').setView(PLASENCIA_CENTER, 14);
    
    // Añadir capa de OpenStreetMap (mapa base)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(map);
    
    // Crear todos los elementos del mapa (marcadores, círculos, polígonos)
    crearElementosMapa();
    
    // Configurar los botones de la leyenda para que sean clickeables
    configurarLeyenda();
    
    // Añadir una escala en la esquina inferior izquierda
    L.control.scale({imperial: false, position: 'bottomleft'}).addTo(map);
}

// Crear todos los elementos en el mapa
// Recorre los puntos de interés y los dibuja según su tipo
function crearElementosMapa() {
    // Recorrer todos los puntos de interés guardados
    Object.keys(puntosInteres).forEach(key => {
        const punto = puntosInteres[key];
        
        // Dibujar el elemento según su tipo
        switch(punto.tipo) {
            case 'marker':
                crearMarcador(punto, key);
                break;
            case 'circle':
                crearCirculo(punto, key);
                break;
            case 'polygon':
                crearPoligono(punto, key);
                break;
            // default: no hacer nada si el tipo no es válido
        }
    });
}

// Crear un marcador
function crearMarcador(punto, id) {
    // Crear icono personalizado
    const icon = L.divIcon({
        html: `<div style="
            background-color: ${punto.color};
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
            border: 3px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            cursor: pointer;
        ">
            <i class="${punto.icono}"></i>
        </div>`,
        className: 'custom-div-icon',
        iconSize: [35, 35],
        iconAnchor: [17, 17]
    });
    
    // Crear marcador
    const marker = L.marker(punto.coordenadas, { icon: icon })
        .addTo(map)
        .bindPopup(crearPopupContent(punto));
    
    // Guardar referencia
    markers.push({ id, marker });
    
    // Configurar eventos
    marker.on('click', function() {
        actualizarInfoBox(punto);
        resaltarElemento(id);
        map.setView(punto.coordenadas, 16);
    });
    
    marker.on('mouseover', function() {
        this.openPopup();
    });
    
    marker.on('mouseout', function() {
        this.closePopup();
    });
}

// Crear un círculo
function crearCirculo(punto, id) {
    const circle = L.circle(punto.coordenadas, {
        color: punto.color,
        fillColor: punto.color,
        fillOpacity: 0.3,
        weight: 2,
        radius: punto.radio
    }).addTo(map)
      .bindPopup(crearPopupContent(punto));
    
    // Guardar referencia
    circles.push({ id, circle });
    
    // Configurar eventos
    circle.on('click', function() {
        actualizarInfoBox(punto);
        resaltarElemento(id);
        map.setView(punto.coordenadas, 16);
    });
    
    circle.on('mouseover', function() {
        this.setStyle({ fillOpacity: 0.5, weight: 3 });
        this.openPopup();
    });
    
    circle.on('mouseout', function() {
        this.setStyle({ fillOpacity: 0.3, weight: 2 });
        this.closePopup();
    });
}

// Crear un polígono
function crearPoligono(punto, id) {
    const polygon = L.polygon(punto.puntos, {
        color: punto.color,
        fillColor: punto.color,
        fillOpacity: 0.4,
        weight: 2
    }).addTo(map)
      .bindPopup(crearPopupContent(punto));
    
    // Guardar referencia
    polygons.push({ id, polygon });
    
    // Configurar eventos
    polygon.on('click', function() {
        actualizarInfoBox(punto);
        resaltarElemento(id);
        
        // Centrar en el polígono
        const bounds = this.getBounds();
        map.fitBounds(bounds);
    });
    
    polygon.on('mouseover', function() {
        this.setStyle({ fillOpacity: 0.6, weight: 3 });
        this.openPopup();
    });
    
    polygon.on('mouseout', function() {
        this.setStyle({ fillOpacity: 0.4, weight: 2 });
        this.closePopup();
    });
}

// Crear contenido para los popups
function crearPopupContent(punto) {
    return `
        <div class="popup-content">
            <h3><i class="${punto.icono}"></i> ${punto.nombre}</h3>
            <p>${punto.descripcion}</p>
            <p><strong>Tipo:</strong> ${punto.tipo === 'marker' ? 'Marcador' : punto.tipo === 'circle' ? 'Círculo' : 'Polígono'}</p>
            <a href="${punto.enlace}" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> ${punto.enlaceTexto}
            </a>
        </div>
    `;
}

// Actualizar el cuadro de información lateral
function actualizarInfoBox(punto) {
    document.getElementById('info-text').innerHTML = `
        <strong>${punto.nombre}</strong><br><br>
        ${punto.descripcion}<br><br>
        <strong>Tipo de elemento:</strong> ${punto.tipo === 'marker' ? 'Marcador' : punto.tipo === 'circle' ? 'Círculo' : 'Polígono'}
    `;
    
    // Mostrar coordenadas
    let coordsText;
    if (punto.tipo === 'polygon') {
        coordsText = `Polígono con ${punto.puntos.length} puntos`;
    } else if (punto.tipo === 'circle') {
        coordsText = `Centro: ${punto.coordenadas[0].toFixed(6)}°, ${punto.coordenadas[1].toFixed(6)}°<br>Radio: ${punto.radio} metros`;
    } else {
        coordsText = `${punto.coordenadas[0].toFixed(6)}°, ${punto.coordenadas[1].toFixed(6)}°`;
    }
    
    document.getElementById('coords-info').innerHTML = `
        <strong>Coordenadas:</strong><br>${coordsText}
    `;
}

// Resaltar elemento en la leyenda
function resaltarElemento(id) {
    // Quitar clase 'active' de todos
    document.querySelectorAll('.legend-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Añadir clase 'active' al elemento correspondiente
    const elemento = document.querySelector(`.legend-item[data-target="${id}"]`);
    if (elemento) {
        elemento.classList.add('active');
    }
}

// Configurar eventos de la leyenda
function configurarLeyenda() {
    document.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const punto = puntosInteres[targetId];
            
            if (punto) {
                // Actualizar información
                actualizarInfoBox(punto);
                resaltarElemento(targetId);
                
                // Centrar mapa en el elemento
                if (punto.tipo === 'polygon') {
                    // Buscar el polígono correspondiente
                    const polyObj = polygons.find(p => p.id === targetId);
                    if (polyObj) {
                        const bounds = polyObj.polygon.getBounds();
                        map.fitBounds(bounds);
                        polyObj.polygon.openPopup();
                    }
                } else if (punto.tipo === 'circle') {
                    // Buscar el círculo correspondiente
                    const circleObj = circles.find(c => c.id === targetId);
                    if (circleObj) {
                        map.setView(punto.coordenadas, 16);
                        circleObj.circle.openPopup();
                    }
                } else {
                    // Buscar el marcador correspondiente
                    const markerObj = markers.find(m => m.id === targetId);
                    if (markerObj) {
                        map.setView(punto.coordenadas, 16);
                        markerObj.marker.openPopup();
                    }
                }
            }
        });
    });
}

// Añadir botones de control para mostrar/ocultar elementos
function agregarControles() {
    // Crear control personalizado
    const controlDiv = L.DomUtil.create('div', 'leaflet-control leaflet-bar custom-control');
    
    controlDiv.innerHTML = `
        <div style="padding: 10px; background: white; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            <h4 style="margin: 0 0 10px 0; color: #2c3e50;">Controles</h4>
            <div style="display: flex; flex-direction: column; gap: 5px;">
                <button id="btn-show-all" style="padding: 8px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer;">Mostrar Todo</button>
                <button id="btn-hide-all" style="padding: 8px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">Ocultar Todo</button>
            </div>
        </div>
    `;
    
    // Añadir al mapa
    L.control({position: 'topright'}).setContent(controlDiv).addTo(map);
    
    // Eventos para los botones
    document.getElementById('btn-show-all').addEventListener('click', function() {
        markers.forEach(m => m.marker.addTo(map));
        circles.forEach(c => c.circle.addTo(map));
        polygons.forEach(p => p.polygon.addTo(map));
    });
    
    document.getElementById('btn-hide-all').addEventListener('click', function() {
        markers.forEach(m => map.removeLayer(m.marker));
        circles.forEach(c => map.removeLayer(c.circle));
        polygons.forEach(p => map.removeLayer(p.polygon));
    });
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    agregarControles();
    
    // Mostrar información del ayuntamiento por defecto
    actualizarInfoBox(puntosInteres.ayuntamiento);
});
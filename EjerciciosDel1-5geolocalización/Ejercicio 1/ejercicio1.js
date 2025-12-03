// Variables globales
let map = null;
let marker = null;
let watchId = null;

// Icono personalizado
const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Inicializar el mapa
function initMap(lat, lon) {
    if (!map) {
        map = L.map('map').setView([lat, lon], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }
    
    // Actualizar vista al centro
    map.setView([lat, lon], map.getZoom());
}

// Actualizar marcador
function updateMarker(lat, lon) {
    if (marker) {
        marker.setLatLng([lat, lon]);
    } else {
        marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
    }
    
    // Agregar popup
    marker.bindPopup(`<b>Estás aquí</b><br>Lat: ${lat.toFixed(6)}<br>Lon: ${lon.toFixed(6)}`).openPopup();
}

// Mostrar coordenadas en el panel
function updateCoordsDisplay(lat, lon, accuracy) {
    document.getElementById('coords').innerHTML = `
        Latitud: ${lat.toFixed(6)}<br>
        Longitud: ${lon.toFixed(6)}<br>
        Precisión: ${accuracy ? accuracy.toFixed(2) + ' m' : 'N/A'}
    `;
    
    const now = new Date();
    document.getElementById('lastUpdate').innerHTML = `
        Última actualización: ${now.toLocaleTimeString()}
    `;
}

// Función principal para obtener y mostrar la posición
function handlePosition(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    
    initMap(lat, lon);
    updateMarker(lat, lon);
    updateCoordsDisplay(lat, lon, accuracy);
}

// Manejo de errores
function handleError(err) {
    console.error('Error de geolocalización:', err);
    let msg = '';
    
    switch(err.code) {
        case err.PERMISSION_DENIED:
            msg = "Permiso denegado por el usuario.";
            break;
        case err.POSITION_UNAVAILABLE:
            msg = "Posición no disponible.";
            break;
        case err.TIMEOUT:
            msg = "Tiempo de espera agotado.";
            break;
        default:
            msg = "Error desconocido.";
    }
    
    document.getElementById('coords').innerHTML = `<strong>Error:</strong> ${msg}`;
}

// Iniciar seguimiento cada 30 segundos
function startTracking() {
    // Opciones de geolocalización
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000 // 30 segundos
    };
    
    // Primera obtención
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handlePosition, handleError, options);
        
        // Seguimiento cada 30 segundos
        watchId = navigator.geolocation.watchPosition(
            handlePosition,
            handleError,
            options
        );
        
        // Actualizar cada 30 segundos (por si acaso)
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(handlePosition, handleError, options);
        }, 30000);
        
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

// Detener seguimiento (opcional)
function stopTracking() {
    if (watchId && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
        console.log("Seguimiento detenido.");
    }
}

// Iniciar cuando la página cargue
window.onload = startTracking;

// Para probar: detener después de 5 minutos (opcional)
// setTimeout(stopTracking, 5 * 60 * 1000);
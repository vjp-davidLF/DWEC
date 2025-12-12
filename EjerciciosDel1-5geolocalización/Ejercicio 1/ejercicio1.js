// Variables globales para gestionar el mapa y la ubicación
let map = null;  // El mapa de Leaflet
let marker = null;  // El marcador que indica donde estamos
let watchId = null;  // ID para poder parar el seguimiento después

// Icono personalizado - usa un icono de geolocalización de flaticon
// TODO: Cambiar icono si flaticon se cae (usar Font Awesome como alternativa)
const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
    iconSize: [40, 40],
    iconAnchor: [20, 40],  // Centro del icono en su punto
    popupAnchor: [0, -40]
});

// Inicializar el mapa con la ubicación del usuario
// Solo se crea una vez, luego solo actualiza la vista
function initMap(lat, lon) {
    if (!map) {
        // Primera vez: crear el mapa centrado en las coordenadas
        map = L.map('map').setView([lat, lon], 15);
        
        // Cargar el mapa de OpenStreetMap (gratuito y sin API key)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }
    
    // Actualizar la vista del mapa a la nueva ubicación
    map.setView([lat, lon], map.getZoom());
}

// Actualizar el marcador en el mapa
// Si ya existe lo movemos, si no lo creamos
function updateMarker(lat, lon) {
    if (marker) {
        // Si el marcador ya está creado, solo lo movemos a las nuevas coordenadas
        marker.setLatLng([lat, lon]);
    } else {
        // Primera vez: crear el marcador en la posición actual
        marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
    }
    
    // Mostrar popup con las coordenadas (útil para ver precisión)
    const coordText = `<b>¡Estás aquí!</b><br>Lat: ${lat.toFixed(6)}<br>Lon: ${lon.toFixed(6)}`;
    marker.bindPopup(coordText).openPopup();
}

// Mostrar las coordenadas actuales en el panel de info
// También muestra la precisión (importante para saber si el GPS es confiable)
function updateCoordsDisplay(lat, lon, accuracy) {
    const latText = lat.toFixed(6);
    const lonText = lon.toFixed(6);
    const precisionText = accuracy ? accuracy.toFixed(2) + ' m' : 'N/A';
    
    document.getElementById('coords').innerHTML = `
        Latitud: ${latText}<br>
        Longitud: ${lonText}<br>
        Precisión: ${precisionText}
    `;
    
    // Actualizar hora de la última actualización
    const now = new Date();
    const timeText = now.toLocaleTimeString();
    document.getElementById('lastUpdate').innerHTML = `
        Última actualización: ${timeText}
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
// ====================================
// BUSCADOR DE BARES EN CÁCERES
// ====================================

// Coordenadas del centro de Cáceres (Extremadura)
const CACERES_CENTER = [39.4752, -6.3724];

// Lista de bares en Cáceres con sus características
// Cada bar tiene: nombre, teléfono, si sirve comida, ubicación y descripción
const bares = [
    {
        id: 1,
        nombre: "Bar La Luna",
        telefono: "927 123 456",
        comida: true,
        coordenadas: [39.4765, -6.3710],
        descripcion: "Bar de copas con amplia selección de cócteles y tapas."
    },
    {
        id: 2,
        nombre: "Pub El Rincón",
        telefono: "927 234 567",
        comida: false,
        coordenadas: [39.4758, -6.3732],
        descripcion: "Pub con música en vivo y ambiente juvenil."
    },
    {
        id: 3,
        nombre: "Cocktail Bar Sunset",
        telefono: "927 345 678",
        comida: true,
        coordenadas: [39.4742, -6.3705],
        descripcion: "Especialistas en cócteles clásicos y modernos."
    },
    {
        id: 4,
        nombre: "Bar El Puerto",
        telefono: "927 456 789",
        comida: true,
        coordenadas: [39.4760, -6.3750],
        descripcion: "Bar tradicional que también sirve raciones y tapas."
    },
    {
        id: 5,
        nombre: "Discobar Neon",
        telefono: "927 567 890",
        comida: false,
        coordenadas: [39.4735, -6.3728],
        descripcion: "Discoteca-bar con pista de baile y DJ."
    },
    {
        id: 6,
        nombre: "Taberna Medieval",
        telefono: "927 678 901",
        comida: true,
        coordenadas: [39.4755, -6.3690],
        descripcion: "Ambiente medieval con cervezas artesanales y platos típicos."
    },
    {
        id: 7,
        nombre: "Bar Jazz&Blues",
        telefono: "927 789 012",
        comida: true,
        coordenadas: [39.4770, -6.3740],
        descripcion: "Bar especializado en música jazz y blues con carta de picoteo."
    },
    {
        id: 8,
        nombre: "Pub La Esquina",
        telefono: "927 890 123",
        comida: false,
        coordenadas: [39.4748, -6.3745],
        descripcion: "Pub pequeño con ambiente acogedor."
    },
    {
        id: 9,
        nombre: "Cervecería Artesanal",
        telefono: "927 901 234",
        comida: true,
        coordenadas: [39.4768, -6.3700],
        descripcion: "Cervezas artesanales y tablas de quesos y embutidos."
    },
    {
        id: 10,
        nombre: "Bar Deportivo",
        telefono: "927 012 345",
        comida: false,
        coordenadas: [39.4730, -6.3715],
        descripcion: "Bar con pantallas para eventos deportivos."
    },
    {
        id: 11,
        nombre: "Cocktail Lounge",
        telefono: "927 112 233",
        comida: true,
        coordenadas: [39.4750, -6.3760],
        descripcion: "Lounge bar con cócteles de autor y sushi."
    },
    {
        id: 12,
        nombre: "Pub Rock&Roll",
        telefono: "927 223 344",
        comida: false,
        coordenadas: [39.4775, -6.3720],
        descripcion: "Pub temático de rock con cervezas internacionales."
    },
    {
        id: 13,
        nombre: "Bar Terraza View",
        telefono: "927 334 455",
        comida: true,
        coordenadas: [39.4780, -6.3735],
        descripcion: "Terraza con vistas y carta de tapas creativas."
    },
    {
        id: 14,
        nombre: "Discoteca Matrix",
        telefono: "927 445 566",
        comida: false,
        coordenadas: [39.4725, -6.3755],
        descripcion: "Discoteca moderna con varias salas de música."
    }
];

// Variables globales para el mapa
let map = null;
let markers = [];  // Array para guardar referencias a los marcadores
let currentFilter = 'all';  // Filtro actual: 'all', 'food', 'nofood'

// Iconos personalizados para diferencia bares con y sin comida
// Verde para los que sirven comida 🍽
const iconWithFood = L.divIcon({
    html: '<div style="background-color: #2ecc71; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">🍽</div>',
    className: 'custom-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

// Rojo para los que no sirven comida 🍸
const iconNoFood = L.divIcon({
    html: '<div style="background-color: #e74c3c; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">🍸</div>',
    className: 'custom-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

// Inicializar el mapa
// Se ejecuta cuando carga la página
function initMap() {
    // Crear el mapa centrado en Cáceres
    map = L.map('map').setView(CACERES_CENTER, 14);
    
    // Cargar la capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    
    // Crear los marcadores para todos los bares
    createMarkers();
    
    // Mostrar lista de bares en el sidebar
    renderBarList();
    
    // Configurar los botones de filtro
    setupFilters();
    
    // Actualizar números en los botones de filtro
    updateCounters();
}

// Crear marcadores en el mapa
function createMarkers() {
    markers = []; // Limpiar array
    
    bares.forEach(bar => {
        // Elegir icono según si sirve comida
        const icon = bar.comida ? iconWithFood : iconNoFood;
        
        // Crear marcador
        const marker = L.marker(bar.coordenadas, { icon: icon })
            .addTo(map)
            .bindPopup(createPopupContent(bar));
        
        // Guardar referencia
        markers.push({
            id: bar.id,
            marker: marker,
            comida: bar.comida
        });
        
        // Evento al hacer clic
        marker.on('click', function() {
            highlightBarCard(bar.id);
        });
    });
}

// Crear contenido para popup
function createPopupContent(bar) {
    const foodText = bar.comida ? 'Sí' : 'No';
    const foodClass = bar.comida ? 'food-yes' : 'food-no';
    
    return `
        <div class="popup-content">
            <h3>${bar.nombre}</h3>
            <p><strong>Teléfono:</strong> ${bar.telefono}</p>
            <p><strong>Sirve comida:</strong> <span class="${foodClass}">${foodText}</span></p>
            <p>${bar.descripcion}</p>
        </div>
    `;
}

// Renderizar lista de bares en el sidebar
function renderBarList() {
    const barList = document.getElementById('barList');
    barList.innerHTML = '';
    
    // Filtrar bares según filtro actual
    let filteredBares = bares;
    if (currentFilter === 'food') {
        filteredBares = bares.filter(bar => bar.comida);
    } else if (currentFilter === 'nofood') {
        filteredBares = bares.filter(bar => !bar.comida);
    }
    
    // Crear tarjetas para cada bar
    filteredBares.forEach(bar => {
        const foodClass = bar.comida ? 'food-yes' : 'food-no';
        const foodText = bar.comida ? 'Sí sirve comida' : 'No sirve comida';
        
        const barCard = document.createElement('div');
        barCard.className = 'bar-card';
        barCard.dataset.id = bar.id;
        barCard.innerHTML = `
            <div class="bar-name">${bar.nombre}</div>
            <div class="bar-info"><strong>Teléfono:</strong> ${bar.telefono}</div>
            <div class="bar-info">
                <strong>Comida:</strong> 
                <span class="food-info ${foodClass}">${foodText}</span>
            </div>
        `;
        
        // Evento al hacer clic en la tarjeta
        barCard.addEventListener('click', function() {
            const barId = parseInt(this.dataset.id);
            centerMapOnBar(barId);
            highlightBarCard(barId);
            openPopup(barId);
        });
        
        barList.appendChild(barCard);
    });
    
    // Si no hay bares con el filtro actual
    if (filteredBares.length === 0) {
        barList.innerHTML = '<p>No hay bares con este filtro.</p>';
    }
}

// Centrar mapa en un bar específico
function centerMapOnBar(barId) {
    const bar = bares.find(b => b.id === barId);
    if (bar && map) {
        map.setView(bar.coordenadas, 16);
    }
}

// Resaltar tarjeta de bar
function highlightBarCard(barId) {
    // Quitar resaltado de todas las tarjetas
    document.querySelectorAll('.bar-card').forEach(card => {
        card.style.backgroundColor = 'white';
    });
    
    // Resaltar tarjeta seleccionada
    const selectedCard = document.querySelector(`.bar-card[data-id="${barId}"]`);
    if (selectedCard) {
        selectedCard.style.backgroundColor = '#e3f2fd';
    }
}

// Abrir popup de un marcador
function openPopup(barId) {
    const markerObj = markers.find(m => m.id === barId);
    if (markerObj) {
        markerObj.marker.openPopup();
    }
}

// Configurar botones de filtro
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Quitar clase active de todos
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Cambiar filtro
            currentFilter = this.dataset.filter;
            
            // Actualizar lista de bares
            renderBarList();
            
            // Actualizar marcadores visibles
            updateVisibleMarkers();
            
            // Actualizar contadores
            updateCounters();
        });
    });
}

// Actualizar marcadores visibles según filtro
function updateVisibleMarkers() {
    markers.forEach(markerObj => {
        if (currentFilter === 'all') {
            markerObj.marker.addTo(map);
        } else if (currentFilter === 'food' && markerObj.comida) {
            markerObj.marker.addTo(map);
        } else if (currentFilter === 'nofood' && !markerObj.comida) {
            markerObj.marker.addTo(map);
        } else {
            map.removeLayer(markerObj.marker);
        }
    });
}

// Actualizar contadores en los botones
function updateCounters() {
    const totalBares = bares.length;
    const withFood = bares.filter(bar => bar.comida).length;
    const withoutFood = totalBares - withFood;
    
    // Actualizar texto de los botones
    document.querySelector('[data-filter="all"]').textContent = `Todos (${totalBares})`;
    document.querySelector('[data-filter="food"]').textContent = `Con comida (${withFood})`;
    document.querySelector('[data-filter="nofood"]').textContent = `Sin comida (${withoutFood})`;
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', initMap);
// Clave para localStorage
const STORAGE_KEY = 'userAges';

// Elementos del DOM
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const saveBtn = document.getElementById('saveBtn');
const searchBtn = document.getElementById('searchBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const refreshBtn = document.getElementById('refreshBtn');
const messageDiv = document.getElementById('message');
const userCountDiv = document.getElementById('userCount');
const usersListDiv = document.getElementById('usersList');

// Cargar usuarios al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    
    // Configurar eventos
    saveBtn.addEventListener('click', saveUser);
    searchBtn.addEventListener('click', searchUser);
    clearAllBtn.addEventListener('click', clearAllUsers);
    refreshBtn.addEventListener('click', loadUsers);
    
    // También buscar al presionar Enter en el campo de nombre
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchUser();
        }
    });
    
    // También guardar al presionar Enter en el campo de edad
    ageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveUser();
        }
    });
});

// Obtener usuarios de localStorage
function getUsers() {
    const usersJSON = localStorage.getItem(STORAGE_KEY);
    if (usersJSON) {
        return JSON.parse(usersJSON);
    }
    return {};
}

// Guardar usuarios en localStorage
function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Mostrar mensaje
function showMessage(text, type = 'info') {
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
    
    // Ocultar mensaje después de 3 segundos (excepto si es error)
    if (type !== 'error') {
        setTimeout(() => {
            messageDiv.className = 'message';
        }, 3000);
    }
}

// Validar entrada
function validateInput() {
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    
    if (!name) {
        showMessage('Por favor, introduce un nombre', 'error');
        nameInput.focus();
        return false;
    }
    
    if (name.length < 2) {
        showMessage('El nombre debe tener al menos 2 caracteres', 'error');
        nameInput.focus();
        return false;
    }
    
    // Solo validar edad si se proporciona
    if (age && (isNaN(age) || age < 1 || age > 120)) {
        showMessage('La edad debe ser un número entre 1 y 120', 'error');
        ageInput.focus();
        return false;
    }
    
    return true;
}

// Guardar usuario
function saveUser() {
    if (!validateInput()) return;
    
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    
    if (!age) {
        showMessage('Para guardar, introduce una edad', 'error');
        ageInput.focus();
        return;
    }
    
    const users = getUsers();
    const ageNumber = parseInt(age);
    
    // Verificar si el usuario ya existe
    if (users.hasOwnProperty(name)) {
        const oldAge = users[name];
        if (confirm(`El usuario "${name}" ya existe con edad ${oldAge}. ¿Quieres actualizarla a ${ageNumber}?`)) {
            users[name] = ageNumber;
            saveUsers(users);
            showMessage(`Edad de "${name}" actualizada a ${ageNumber}`, 'success');
        }
    } else {
        users[name] = ageNumber;
        saveUsers(users);
        showMessage(`Usuario "${name}" agregado con edad ${ageNumber}`, 'success');
    }
    
    // Limpiar campos
    nameInput.value = '';
    ageInput.value = '';
    nameInput.focus();
    
    // Actualizar lista
    loadUsers();
}

// Buscar usuario
function searchUser() {
    const name = nameInput.value.trim();
    
    if (!name) {
        showMessage('Introduce un nombre para buscar', 'error');
        return;
    }
    
    const users = getUsers();
    
    if (users.hasOwnProperty(name)) {
        const age = users[name];
        showMessage(`Usuario encontrado: "${name}" tiene ${age} años`, 'success');
        ageInput.value = age; // Rellenar campo de edad
    } else {
        showMessage(`El usuario "${name}" no está registrado. Puedes agregarlo introduciendo una edad.`, 'info');
        ageInput.value = ''; // Limpiar campo de edad
        ageInput.focus();
    }
}

// Cargar y mostrar usuarios
function loadUsers() {
    const users = getUsers();
    const userCount = Object.keys(users).length;
    
    // Actualizar contador
    userCountDiv.textContent = `Total: ${userCount} usuario${userCount !== 1 ? 's' : ''}`;
    
    // Mostrar lista de usuarios
    if (userCount === 0) {
        usersListDiv.innerHTML = `
            <div class="empty-state">
                <p>No hay usuarios registrados todavía.</p>
                <p>¡Agrega el primero!</p>
            </div>
        `;
        return;
    }
    
    // Crear tabla
    let tableHTML = `
        <table class="users-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Ordenar usuarios por nombre
    const sortedNames = Object.keys(users).sort();
    
    sortedNames.forEach(name => {
        const age = users[name];
        tableHTML += `
            <tr>
                <td>${name}</td>
                <td>${age} años</td>
                <td>
                    <button class="action-btn edit-btn" data-name="${name}">Editar</button>
                    <button class="action-btn delete-btn" data-name="${name}">Eliminar</button>
                </td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    usersListDiv.innerHTML = tableHTML;
    
    // Configurar eventos para botones de acción
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            editUser(name);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            deleteUser(name);
        });
    });
}

// Editar usuario
function editUser(name) {
    const users = getUsers();
    
    if (users.hasOwnProperty(name)) {
        const currentAge = users[name];
        
        // Rellenar formulario con datos del usuario
        nameInput.value = name;
        ageInput.value = currentAge;
        
        showMessage(`Editando usuario: "${name}". Modifica la edad y haz clic en Guardar.`, 'info');
        ageInput.focus();
    }
}

// Eliminar usuario
function deleteUser(name) {
    if (confirm(`¿Estás seguro de que quieres eliminar a "${name}"?`)) {
        const users = getUsers();
        
        if (users.hasOwnProperty(name)) {
            delete users[name];
            saveUsers(users);
            showMessage(`Usuario "${name}" eliminado`, 'success');
            loadUsers();
        }
    }
}

// Eliminar todos los usuarios
function clearAllUsers() {
    const users = getUsers();
    const userCount = Object.keys(users).length;
    
    if (userCount === 0) {
        showMessage('No hay usuarios para eliminar', 'info');
        return;
    }
    
    if (confirm(`¿Estás seguro de que quieres eliminar TODOS los usuarios (${userCount})? Esta acción no se puede deshacer.`)) {
        localStorage.removeItem(STORAGE_KEY);
        showMessage('Todos los usuarios han sido eliminados', 'success');
        loadUsers();
        
        // Limpiar formulario
        nameInput.value = '';
        ageInput.value = '';
    }
}
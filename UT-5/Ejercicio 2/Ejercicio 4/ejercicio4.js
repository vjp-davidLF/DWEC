// ejercicio4.js
// Implementación sencilla (nivel novato) para modificar una tarea existente usando PUT

(function () {
	'use strict';

	const API_URL = 'http://localhost:3000/tasks';

	// Elementos del DOM
	const loadBtn = document.getElementById('loadBtn');
	const taskSelect = document.getElementById('taskSelect');
	const editForm = document.getElementById('editForm');
	const statusMsg = document.getElementById('statusMsg');

	// Cache local de tareas para rellenar el formulario
	let tasksCache = [];

	function showMessage(text, isError) {
		statusMsg.textContent = text;
		statusMsg.style.color = isError ? 'red' : 'green';
	}

	// Carga todas las tareas del servidor y llena el select
	async function loadTasks() {
		showMessage('Cargando tareas...', false);
		try {
			const res = await fetch(API_URL);
			if (!res.ok) throw new Error('Respuesta no OK: ' + res.status);
			const data = await res.json();
			tasksCache = Array.isArray(data) ? data : [];
			// Limpiamos y llenamos el select
			taskSelect.innerHTML = '<option value="">-- selecciona una tarea --</option>';
			tasksCache.forEach(t => {
				const title = t.title || ('Tarea ' + (t.id || ''));
				const opt = document.createElement('option');
				opt.value = t.id;
				opt.textContent = title;
				taskSelect.appendChild(opt);
			});
			showMessage('Tareas cargadas: ' + tasksCache.length, false);
		} catch (err) {
			console.error('Error al cargar tareas:', err);
			showMessage('Error al cargar tareas. Comprueba servidor/CORS.', true);
		}
	}

	// Rellena el formulario con los datos de la tarea seleccionada
	function fillFormWithTask(id) {
		const t = tasksCache.find(x => String(x.id) === String(id));
		if (!t) {
			// limpiar campos
			editForm.reset();
			return;
		}
		document.getElementById('title').value = t.title || '';
		document.getElementById('description').value = t.description || '';
		document.getElementById('status').value = t.status || 'pendiente';
		// Si el servidor tiene date en formato ISO, intentamos separar fecha/hora
		if (t.date) {
			const d = new Date(t.date);
			if (!isNaN(d)) {
				// yyyy-mm-dd
				const yyyy = d.getFullYear();
				const mm = String(d.getMonth()+1).padStart(2,'0');
				const dd = String(d.getDate()).padStart(2,'0');
				document.getElementById('date').value = `${yyyy}-${mm}-${dd}`;
				// hh:mm (24h)
				const hh = String(d.getHours()).padStart(2,'0');
				const min = String(d.getMinutes()).padStart(2,'0');
				document.getElementById('time').value = `${hh}:${min}`;
			} else {
				document.getElementById('date').value = '';
				document.getElementById('time').value = '';
			}
		} else {
			document.getElementById('date').value = '';
			document.getElementById('time').value = '';
		}
	}

	// Construye el payload desde el formulario
	function buildPayload() {
		const title = document.getElementById('title').value.trim();
		const description = document.getElementById('description').value.trim();
		const status = document.getElementById('status').value;
		const date = document.getElementById('date').value;
		const time = document.getElementById('time').value;
		let datetime = '';
		if (date) datetime = date + (time ? ('T' + time) : '');
		return { title, description, status, date: datetime };
	}

	// Validación mínima
	function validate() {
		const title = document.getElementById('title').value.trim();
		const description = document.getElementById('description').value.trim();
		if (!title) { showMessage('Introduce un título.', true); return false; }
		if (!description) { showMessage('Introduce una descripción.', true); return false; }
		return true;
	}

	// Envía PUT a /tasks/:id
	async function putTask(id, payload) {
		showMessage('Enviando cambios...', false);
		try {
			const res = await fetch(API_URL + '/' + id, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			// Aceptamos respuestas exitosas usando res.ok (permite 200, 201, etc.)
			if (res.ok) {
				showMessage('Tarea modificada correctamente.', false);
				// opcional: recargar la lista local
				loadTasks();
			} else {
				let text = '';
				try { text = await res.text(); } catch (e) { /* ignore */ }
				showMessage('Error al guardar: ' + res.status + '. ' + text, true);
				console.error('PUT no OK:', res.status, text);
			}
		} catch (err) {
			console.error('Error en PUT:', err);
			showMessage('Error al enviar cambios. Comprueba servidor/CORS.', true);
		}
	}

	// Eventos
	if (loadBtn) {
		loadBtn.addEventListener('click', function () { loadTasks(); });
	}

	if (taskSelect) {
		taskSelect.addEventListener('change', function () {
			const id = taskSelect.value;
			if (id) fillFormWithTask(id);
			else editForm.reset();
		});
	}

	if (editForm) {
		editForm.addEventListener('submit', function (ev) {
			ev.preventDefault();
			const id = taskSelect.value;
			if (!id) { showMessage('Selecciona primero una tarea.', true); return; }
			if (!validate()) return;
			const payload = buildPayload();
			putTask(id, payload);
		});
	}

})();


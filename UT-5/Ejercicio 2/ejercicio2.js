// ejercicio2.js
// Script para obtener y mostrar las tareas que expone el servicio en
// http://localhost:3000/tasks
// Comentarios en español y estructura pensada para principiantes.

(function () {
	'use strict';

	// URL del API. Si tu servidor está en otra ruta, cámbiala aquí.
	const API_URL = 'http://localhost:3000/tasks';

	// Elementos del DOM que usaremos
	const tasksContainer = document.getElementById('tasksContainer');
	const statusEl = document.getElementById('status');
	const refreshBtn = document.getElementById('refreshBtn');
	const helpBtn = document.getElementById('helpBtn');
	const emptyMsg = document.getElementById('emptyMsg');

	// Mapea posibles claves de título/descripcion/estado que vengan en el JSON
	function pickField(obj, names) {
		for (const n of names) {
			if (obj[n] !== undefined && obj[n] !== null) return obj[n];
		}
		return null;
	}

	// Formatea una fecha ISO/epoch a un string legible en español
	function formatDate(value) {
		if (!value) return '';
		const d = new Date(value);
		if (isNaN(d)) return String(value);
		return d.toLocaleString('es-ES');
	}

	// Crea el HTML para una tarjeta de tarea
	function createCard(task) {
		const title = pickField(task, ['title', 'name', 'titulo', 'nombre']) || ('Tarea ' + (task.id || ''));
		const description = pickField(task, ['description', 'descripcion', 'body', 'content']) || '';
		const status = (pickField(task, ['status', 'estado', 'state']) || '').toString().toLowerCase();
		const date = pickField(task, ['date', 'fecha', 'createdAt', 'dueDate']) || '';

		const card = document.createElement('div');
		card.className = 'card';

		const h3 = document.createElement('h3');
		h3.textContent = title;
		card.appendChild(h3);

		const meta = document.createElement('div');
		meta.className = 'meta';
		const formattedDate = formatDate(date);
		meta.textContent = formattedDate;
		card.appendChild(meta);

		// Badge de estado con clases amigables
		if (status) {
			const badge = document.createElement('span');
			badge.className = 'badge ' + (status.includes('pend') ? 'pendiente' : status.includes('hacer') || status.includes('haciendo') ? 'haciendo' : status.includes('compl') || status.includes('complet') ? 'completada' : 'pendiente');
			// Capitalizamos la primera letra para mostrar
			badge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
			card.appendChild(badge);
		}

		if (description) {
			const p = document.createElement('div');
			p.className = 'descripcion';
			p.textContent = description;
			card.appendChild(p);
		}

		return card;
	}

	// Renderiza un array de tareas en la UI
	function renderTasks(tasks) {
		tasksContainer.innerHTML = '';
		if (!Array.isArray(tasks) || tasks.length === 0) {
			emptyMsg.style.display = 'block';
			return;
		}
		emptyMsg.style.display = 'none';

		for (const t of tasks) {
			const card = createCard(t);
			tasksContainer.appendChild(card);
		}
	}

	// Muestra mensajes de estado para el usuario
	function setStatus(text, isError) {
		statusEl.textContent = text;
		statusEl.style.color = isError ? '#c0392b' : '#555';
	}

	// Obtiene las tareas del servidor
	async function fetchTasks() {
		setStatus('Cargando tareas...');
		try {
			const res = await fetch(API_URL, { method: 'GET' });
			if (!res.ok) {
				// Si el servidor responde con un error HTTP
				throw new Error('Error en la respuesta del servidor: ' + res.status + ' ' + res.statusText);
			}
			const data = await res.json();
			// Asumimos que la respuesta es un array de tareas
			renderTasks(data);
			setStatus('Cargadas ' + (Array.isArray(data) ? data.length : 0) + ' tareas');
		} catch (err) {
			// Manejo sencillo de errores para principiantes
			console.error('Error al obtener tareas:', err);
			setStatus('No se pudo cargar las tareas. Comprueba que el servidor está en http://localhost:3000 y que permite CORS.', true);
			tasksContainer.innerHTML = '';
			emptyMsg.style.display = 'block';
		}
	}

	// Inicia comportamiento de botones y carga inicial
	function init() {
		refreshBtn.addEventListener('click', function () {
			fetchTasks();
		});

		helpBtn.addEventListener('click', function () {
			// Mensaje de ayuda simple
			alert('Esta página consulta las tareas del servicio en http://localhost:3000/tasks.\n\nSi ves un error de CORS, habilita CORS en tu servidor o usa un proxy.');
		});

		// Carga automática al abrir la página
		fetchTasks();
	}

	// Espera a que el DOM esté listo
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

})();

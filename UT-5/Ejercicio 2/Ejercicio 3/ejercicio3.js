(function () {
	'use strict';

	const API_URL = 'http://localhost:3000/tasks';

	// Elementos del formulario
	const form = document.getElementById('taskForm');
	const statusDiv = document.getElementById('formStatus');

	// Función auxiliar para mostrar mensajes al usuario
	function showMessage(text, isError) {
		statusDiv.textContent = text;
		statusDiv.style.color = isError ? 'red' : 'green';
	}

	// Construye el objeto que enviaremos al servidor
	function buildPayload() {
		const title = document.getElementById('title').value.trim();
		const description = document.getElementById('description').value.trim();
		const status = document.getElementById('status').value;
		const date = document.getElementById('date').value; // yyyy-mm-dd
		const time = document.getElementById('time').value; // HH:MM

		// Concatenamos fecha y hora si existen, para tener un campo datetime simple
		let datetime = '';
		if (date) {
			datetime = date + (time ? ('T' + time) : '');
		}

		return {
			title: title,
			description: description,
			status: status,
			date: datetime
		};
	}

	// Envia los datos con POST
	async function postTask(payload) {
		// Mostramos mensaje simple mientras se realiza la petición
		showMessage('Enviando...', false);

		try {
			const res = await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			// Aceptamos respuestas exitosas usando res.ok (acepta 200, 201, etc.)
			if (res.ok) {
				showMessage('Tarea creada correctamente. Redirigiendo...', false);
				// Redirigimos a la página de tareas (ubicación relativa)
				setTimeout(function () {
					window.location.href = '../ejercicio2.html';
				}, 900);
			} else {
				// Intentamos leer el cuerpo del error (si existe) para dar mejor feedback
				let text = '';
				try { text = await res.text(); } catch (e) { /* ignore */ }
				showMessage('Error: respuesta del servidor ' + res.status + '. ' + text, true);
				console.error('Respuesta no OK:', res.status, text);
			}
		} catch (err) {
			// Error de red o similar
			showMessage('Error al enviar la tarea. Comprueba el servidor y CORS.', true);
			console.error('Error al hacer POST:', err);
		}
	}

	// Validación muy básica: título y descripción obligatorios
	function validate() {
		const title = document.getElementById('title').value.trim();
		const description = document.getElementById('description').value.trim();
		if (!title) {
			showMessage('Introduce un título.', true);
			return false;
		}
		if (!description) {
			showMessage('Introduce una descripción.', true);
			return false;
		}
		return true;
	}

	// Manejo del submit del formulario
	if (form) {
		form.addEventListener('submit', function (ev) {
			ev.preventDefault();
			statusDiv.textContent = '';
			if (!validate()) return;
			const payload = buildPayload();
			postTask(payload);
		});
	}

})();


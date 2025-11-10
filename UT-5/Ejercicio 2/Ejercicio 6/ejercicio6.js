// ejercicio6.js
// Interfaz con cabecera que permite seleccionar la acción a realizar
// Estilo "principiante": comentarios en español, código sencillo y claro.

(function(){
	'use strict';

	const API_URL = 'http://localhost:3000/tasks';
	const headerEl = document.getElementById('appHeader');
	const contentEl = document.getElementById('content');

	// Tabs disponibles
	const tabs = [
		{ id: 'list', label: 'Tareas' },
		{ id: 'create', label: 'Crear nueva tarea' },
		{ id: 'modify', label: 'Modificar Tarea' },
		{ id: 'delete', label: 'Eliminar tarea' }
	];

	// Estado simple
	let current = 'list';

	// Crear cabecera con pestañas
	function createHeader(){
		headerEl.innerHTML = '';
		const logo = document.createElement('div');
		logo.className = 'logo';
		logo.textContent = '\uD83D\uDCD6 Tareas';
		headerEl.appendChild(logo);

		const nav = document.createElement('nav');
		nav.className = 'nav-tabs';
		nav.setAttribute('role','tablist');

		for (const t of tabs){
			const btn = document.createElement('button');
			btn.className = 'nav-tab';
			btn.textContent = t.label;
			btn.dataset.tab = t.id;
			btn.addEventListener('click', function(){
				setActive(t.id);
			});
			nav.appendChild(btn);
		}
		headerEl.appendChild(nav);
		setActive(current);
	}

	// Pone activa una pestaña y muestra su vista
	function setActive(id){
		current = id;
		const buttons = headerEl.querySelectorAll('.nav-tab');
		buttons.forEach(b => b.classList.toggle('active', b.dataset.tab === id));
		// Mostrar vista correspondiente
		if (id === 'list') renderList();
		else if (id === 'create') renderCreate();
		else if (id === 'modify') renderModify();
		else if (id === 'delete') renderDelete();
	}

	/* ---------- UTILIDADES ---------- */
	function showStatus(msg, isError){
		// mensaje sencillo en la parte superior del content
		let s = contentEl.querySelector('.status-msg');
		if (!s){
			s = document.createElement('div');
			s.className = 'status-msg small-muted';
			contentEl.prepend(s);
		}
		s.textContent = msg;
		s.style.color = isError ? '#c62828' : '#333';
	}

	async function getTasks(){
		try{
			const res = await fetch(API_URL);
			if (!res.ok) throw new Error('Error ' + res.status);
			const data = await res.json();
			return data;
		}catch(err){
			console.error('getTasks', err);
			showStatus('Error al cargar tareas. Comprueba servidor/CORS.', true);
			return [];
		}
	}

	/* ---------- VISTAS ---------- */
	// Lista simple de tareas (vista principal)
	async function renderList(){
		contentEl.innerHTML = '';
		const h = document.createElement('h2');
		h.textContent = 'Tareas en el servidor';
		contentEl.appendChild(h);

		showStatus('Cargando tareas...');
		const tasks = await getTasks();

		const grid = document.createElement('div');
		grid.className = 'cards-grid';

		if (!tasks || tasks.length === 0){
			const no = document.createElement('div');
			no.className = 'card';
			no.textContent = 'No hay tareas en el servidor.';
			grid.appendChild(no);
		} else {
			for (const t of tasks){
				const c = document.createElement('div');
				c.className = 'card';
				const title = document.createElement('div');
				title.className = 'title';
				title.textContent = t.title || ('Tarea ' + (t.id||''));
				c.appendChild(title);

				if (t.description){
					const d = document.createElement('div');
					d.textContent = t.description;
					c.appendChild(d);
				}

				const meta = document.createElement('div');
				meta.className = 'small-muted';
				meta.textContent = (t.status ? t.status + ' ' : '') + (t.date ? '- ' + t.date : '');
				c.appendChild(meta);

				grid.appendChild(c);
			}
		}

		contentEl.appendChild(grid);
		showStatus('Cargadas ' + (tasks.length||0) + ' tareas');
	}

	// Formulario sencillo para crear una tarea
	function renderCreate(){
		contentEl.innerHTML = '';
		const h = document.createElement('h2'); h.textContent = 'Crear nueva tarea'; contentEl.appendChild(h);

		const form = document.createElement('form');
		form.className = 'card';

		// Título
		form.appendChild(makeRow('Título', createInput('title')));
		// Descripción
		form.appendChild(makeRow('Descripción', createTextarea('description')));
		// Estado
		const sel = document.createElement('select'); sel.name = 'status';
		['pendiente','haciendo','hecho'].forEach(s=>{ const o=document.createElement('option'); o.value=s; o.textContent=s; sel.appendChild(o); });
		form.appendChild(makeRow('Estado', sel));
		// Fecha
		form.appendChild(makeRow('Fecha (YYYY-MM-DD)', createInput('date','date')));
		// Hora
		form.appendChild(makeRow('Hora', createInput('time','time')));

		const submit = document.createElement('button'); submit.type='submit'; submit.className='btn primary'; submit.textContent='Enviar';
		form.appendChild(submit);

		form.addEventListener('submit', async function(e){
			e.preventDefault();
			const data = {
				title: form.elements['title'].value.trim(),
				description: form.elements['description'].value.trim(),
				status: form.elements['status'].value,
				date: form.elements['date'].value || '',
				time: form.elements['time'].value || ''
			};
			if (!data.title){ showStatus('El título es obligatorio', true); return; }
			submit.disabled = true; submit.textContent = 'Enviando...';
			try{
				const res = await fetch(API_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
				if (res.ok){
					showStatus('Tarea creada correctamente');
					form.reset();
				} else {
					let txt=''; try{ txt = await res.text(); }catch(e){}
					showStatus('Error al crear: ' + res.status + ' ' + txt, true);
				}
			}catch(err){ console.error('POST',err); showStatus('Error al crear tarea. Comprueba servidor/CORS.', true); }
			submit.disabled=false; submit.textContent='Enviar';
		});

		contentEl.appendChild(form);
		showStatus('Rellena el formulario y pulsa Enviar');
	}

	// Vista para modificar tareas (seleccionar + form con datos)
	async function renderModify(){
		contentEl.innerHTML = '';
		const h = document.createElement('h2'); h.textContent = 'Modificar Tareas en el servidor'; contentEl.appendChild(h);

		const tasks = await getTasks();
		if (!tasks || tasks.length===0){
			const no = document.createElement('div'); no.className='card'; no.textContent='No hay tareas para modificar.'; contentEl.appendChild(no); return;
		}

		const sel = document.createElement('select'); sel.className='card';
		tasks.forEach(t=>{ const o=document.createElement('option'); o.value=t.id; o.textContent=(t.id+' - '+(t.title||'Sin título')); sel.appendChild(o); });
		contentEl.appendChild(sel);

		const form = document.createElement('form'); form.className='card';
		form.appendChild(makeRow('Título', createInput('title')));
		form.appendChild(makeRow('Descripción', createTextarea('description')));
		const statusSel = document.createElement('select'); statusSel.name='status'; ['pendiente','haciendo','hecho'].forEach(s=>{ const o=document.createElement('option'); o.value=s; o.textContent=s; statusSel.appendChild(o); });
		form.appendChild(makeRow('Estado', statusSel));
		form.appendChild(makeRow('Fecha (YYYY-MM-DD)', createInput('date','date')));
		const submit = document.createElement('button'); submit.className='btn primary'; submit.type='submit'; submit.textContent='Actualizar'; form.appendChild(submit);

		// Al cambiar selección, rellenar
		sel.addEventListener('change', function(){
			const id = sel.value; const t = tasks.find(x=>String(x.id)===String(id));
			if (!t) return;
			form.elements['title'].value = t.title||'';
			form.elements['description'].value = t.description||'';
			form.elements['status'].value = t.status||'pendiente';
			form.elements['date'].value = t.date||'';
		});
		// inicializar con primera
		sel.dispatchEvent(new Event('change'));

		form.addEventListener('submit', async function(e){
			e.preventDefault();
			const id = sel.value;
			const payload = {
				title: form.elements['title'].value.trim(),
				description: form.elements['description'].value.trim(),
				status: form.elements['status'].value,
				date: form.elements['date'].value||''
			};
			if (!payload.title){ showStatus('El título es obligatorio', true); return; }
			submit.disabled=true; submit.textContent='Actualizando...';
			try{
				const res = await fetch(API_URL + '/' + id, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
				if (res.ok){ showStatus('Tarea actualizada correctamente'); }
				else { let txt=''; try{ txt = await res.text(); }catch(e){} showStatus('Error al actualizar: '+res.status+' '+txt, true); }
			}catch(err){ console.error('PUT',err); showStatus('Error en la actualización. Comprueba servidor/CORS.', true); }
			submit.disabled=false; submit.textContent='Actualizar';
		});

		contentEl.appendChild(form);
		showStatus('Selecciona una tarea, edita los campos y pulsa Actualizar');
	}

	// Vista para eliminar tareas: lista con botón eliminar (elimina del servidor y del DOM)
	async function renderDelete(){
		contentEl.innerHTML = '';
		const h = document.createElement('h2'); h.textContent = 'Eliminar tarea'; contentEl.appendChild(h);

		const tasks = await getTasks();
		if (!tasks || tasks.length===0){ const no=document.createElement('div'); no.className='card'; no.textContent='No hay tareas para eliminar.'; contentEl.appendChild(no); return; }

		const grid = document.createElement('div'); grid.className='cards-grid';
		for (const t of tasks){
			const c = document.createElement('div'); c.className='card';
			const title = document.createElement('div'); title.className='title'; title.textContent = t.title || ('Tarea ' + (t.id||'')); c.appendChild(title);
			if (t.description){ const d=document.createElement('div'); d.textContent = t.description; c.appendChild(d); }
			const meta = document.createElement('div'); meta.className='small-muted'; meta.textContent = t.status || ''; c.appendChild(meta);

			const del = document.createElement('button'); del.className='btn danger'; del.textContent='Eliminar Tarea';
			del.addEventListener('click', async function(){
				if (!confirm('¿Eliminar la tarea "' + (t.title||'') + '"?')) return;
				del.disabled = true; del.textContent = 'Eliminando...';
				try{
					const res = await fetch(API_URL + '/' + t.id, { method:'DELETE' });
					if (res.ok){
						// eliminar del DOM
						c.remove();
						showStatus('Tarea eliminada correctamente');
					} else {
						let txt=''; try{ txt = await res.text(); }catch(e){}
						showStatus('Error al eliminar: '+res.status+' '+txt, true);
						del.disabled=false; del.textContent='Eliminar Tarea';
					}
				}catch(err){ console.error('DELETE',err); showStatus('Error al eliminar. Comprueba servidor/CORS.', true); del.disabled=false; del.textContent='Eliminar Tarea'; }
			});
			c.appendChild(del);
			grid.appendChild(c);
		}

		contentEl.appendChild(grid);
		showStatus('Pulsa Eliminar en la tarea que quieras borrar');
	}

	/* ---------- HELPERS ---------- */
	function makeRow(labelText, control){
		const row = document.createElement('div'); row.className='form-row';
		const label = document.createElement('label'); label.textContent = labelText; row.appendChild(label);
		row.appendChild(control); return row;
	}

	function createInput(name, type='text'){
		const i = document.createElement('input'); i.type = type; i.name = name; return i;
	}

	function createTextarea(name){ const t = document.createElement('textarea'); t.name=name; t.rows=4; return t; }

	// Inicializar UI
	createHeader();

})();


// ejercicio5.js
// Permite listar tareas y eliminarlas (DELETE) contra http://localhost:3000/tasks
// Versión sencilla para un principiante: comenta en español y maneja errores básicos.

(function(){
    'use strict';

    const API_URL = 'http://localhost:3000/tasks';

    const tasksContainer = document.getElementById('tasksContainer');
    const statusEl = document.getElementById('status');
    const refreshBtn = document.getElementById('refreshBtn');
    const emptyMsg = document.getElementById('emptyMsg');

    // Mostrar mensajes sencillos
    function setStatus(text, isError){
        statusEl.textContent = text;
        statusEl.style.color = isError ? '#c0392b' : '#555';
    }

    // Crear tarjeta DOM para una tarea
    function createCard(task){
        const card = document.createElement('div');
        card.className = 'card';
        // Título
        const h3 = document.createElement('h3');
        h3.textContent = task.title || ('Tarea ' + (task.id||''));
        h3.style.margin = '6px 0';
        card.appendChild(h3);
        // Descripción
        if (task.description){
            const p = document.createElement('div');
            p.className = 'descripcion';
            p.textContent = task.description;
            card.appendChild(p);
        }
        // Fecha/estado (simple)
        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.style.fontSize = '12px';
        if (task.status) meta.textContent = task.status + (task.date ? ' - ' + task.date : '');
        card.appendChild(meta);

        // Botón eliminar
        const btn = document.createElement('button');
        btn.textContent = 'Eliminar Tarea';
        btn.style.marginTop = '8px';
        btn.addEventListener('click', function(){
            if (!confirm('¿Eliminar la tarea "' + (task.title||'') + '"?')) return;
            deleteTask(task.id, card, btn);
        });
        card.appendChild(btn);

        return card;
    }

    // Renderizar lista de tareas
    function renderTasks(tasks){
        tasksContainer.innerHTML = '';
        if (!Array.isArray(tasks) || tasks.length===0){
            emptyMsg.classList.remove('hidden');
            return;
        }
        emptyMsg.classList.add('hidden');
        for (const t of tasks){
            const c = createCard(t);
            tasksContainer.appendChild(c);
        }
    }

    // Obtener tareas del servidor
    async function fetchTasks(){
        setStatus('Cargando tareas...');
        try{
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Respuesta no OK: ' + res.status);
            const data = await res.json();
            renderTasks(data);
            setStatus('Cargadas ' + (Array.isArray(data)?data.length:0) + ' tareas');
        }catch(err){
            console.error('Error al obtener tareas', err);
            setStatus('Error al cargar tareas. Comprueba servidor/CORS.', true);
            tasksContainer.innerHTML = '';
            emptyMsg.classList.remove('hidden');
        }
    }

    // Eliminar tarea con DELETE
    async function deleteTask(id, cardEl, btn){
        btn.disabled = true; btn.textContent = 'Eliminando...';
        try{
            const res = await fetch(API_URL + '/' + id, { method: 'DELETE' });
            if (res.ok){
                // Nota: comportamiento intencionalmente limitado (nivel novato):
                // en lugar de eliminar inmediatamente la tarjeta del DOM, la marcamos
                // visualmente como "eliminada" y dejamos que el usuario recargue
                // la lista si lo desea. Esto es un pequeño fallo de usabilidad.
                cardEl.classList.add('deleted');
                const info = document.createElement('div');
                info.style.fontSize = '12px';
                info.style.color = '#a00';
                info.textContent = 'Eliminada (actualiza la página para sincronizar)';
                cardEl.appendChild(info);
                setStatus('Tarea marcada como eliminada (no eliminada del DOM).', false);
                // no recargamos automáticamente la lista
            } else {
                let text = '';
                try{ text = await res.text(); }catch(e){}
                setStatus('Error al eliminar: ' + res.status + '. ' + text, true);
                console.error('DELETE no OK:', res.status, text);
                btn.disabled = false; btn.textContent = 'Eliminar Tarea';
            }
        }catch(err){
            console.error('Error en DELETE', err);
            setStatus('Error al eliminar. Comprueba servidor/CORS.', true);
            btn.disabled = false; btn.textContent = 'Eliminar Tarea';
        }
    }

    // Eventos
    if (refreshBtn) refreshBtn.addEventListener('click', fetchTasks);

    // Carga inicial
    fetchTasks();

})();

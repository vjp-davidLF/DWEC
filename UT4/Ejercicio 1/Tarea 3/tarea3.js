// URL de la API con los posts
const URL_POSTS = "https://jsonplaceholder.typicode.com/posts";
const URL_USUARIOS = "https://jsonplaceholder.typicode.com/users";
const URL_COMENTARIOS = "https://jsonplaceholder.typicode.com/comments";

// Objeto para guardar los datos de la API
const datos = {
  posts: [],
  usuarios: {},
  comentarios: {}
};

// Función para cargar todos los posts cuando se carga la página
async function cargarPosts() {
  try {
    // Obtenemos todos los posts de la API
    const respuesta = await fetch(URL_POSTS);
    datos.posts = await respuesta.json();

    // Cargamos los usuarios y comentarios
    await cargarUsuarios();
    await cargarComentarios();

    // Mostramos los posts en la página
    mostrarPosts();
  } catch (error) {
    console.error("Error al cargar los posts:", error);
  }
}

// Función para cargar todos los usuarios
async function cargarUsuarios() {
  try {
    const respuesta = await fetch(URL_USUARIOS);
    const usuarios = await respuesta.json();

    // Guardamos los usuarios en un objeto con su ID como clave
    usuarios.forEach((usuario) => {
      datos.usuarios[usuario.id] = usuario;
    });
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}

// Función para cargar todos los comentarios
async function cargarComentarios() {
  try {
    const respuesta = await fetch(URL_COMENTARIOS);
    const comentarios = await respuesta.json();

    // Agrupamos los comentarios por postId
    comentarios.forEach((comentario) => {
      if (!datos.comentarios[comentario.postId]) {
        datos.comentarios[comentario.postId] = [];
      }
      datos.comentarios[comentario.postId].push(comentario);
    });
  } catch (error) {
    console.error("Error al cargar comentarios:", error);
  }
}

// Función auxiliar para crear un post en el HTML
function crearPost(post) {
  const div = document.createElement("div");
  div.classList.add("entrada");

  // Obtenemos el usuario que creó el post
  const usuario = datos.usuarios[post.userId];

  // HTML del post con título, contenido y botones
  div.innerHTML = `
    <p><strong>TITULO: </strong>${post.title}</p>
    <div>
      <p><strong>Contenido:</strong> ${post.body}</p>
      <button class="mostrarUsuario">Usuario del Post</button>
      <button class="mostrarComentarios">Mostrar comentarios</button>
      <div class="usuario d-none">
        <p><strong>NOMBRE USUARIO: </strong><span id="nombreUser">${usuario.name}</span></p>
      </div>
      <div class="comentarios d-none">
        <p><strong>Comentarios:</strong></p>
      </div>
    </div>
  `;

  // Agregamos los eventos a los botones
  agregarEventosMostrarUsuario(div, usuario);
  agregarEventosMostrarComentarios(div, post.id);

  return div;
}

// Función para mostrar/ocultar el usuario del post
function agregarEventosMostrarUsuario(div, usuario) {
  const botonUsuario = div.querySelector(".mostrarUsuario");
  const usuarioDiv = div.querySelector(".usuario");

  botonUsuario.addEventListener("click", function () {
    // Si está visible lo ocultamos, si no lo mostramos
    if (usuarioDiv.classList.includes("d-none")) {
      usuarioDiv.classList.remove("d-none");
    } else {
      usuarioDiv.classList.add("d-none");
    }
  });
}

// Función para mostrar/ocultar los comentarios del post
function agregarEventosMostrarComentarios(div, postId) {
  const botonComentarios = div.querySelector(".mostrarComentarios");
  const comentariosDiv = div.querySelector(".comentarios");

  botonComentarios.addEventListener("click", function () {
    // Si está visible lo ocultamos
    if (comentariosDiv.classList.includes("d-none")) {
      comentariosDiv.classList.remove("d-none");

      // Obtenemos los comentarios de este post
      const comentarios = datos.comentarios[postId] || [];

      // Limpiamos los comentarios previos
      const listaComentarios = comentariosDiv.querySelector("p:last-child") || comentariosDiv;

      // Agregamos cada comentario
      comentarios.forEach((comentario) => {
        const pComentario = document.createElement("p");
        pComentario.textContent = `- ${comentario.name}`;
        comentariosDiv.appendChild(pComentario);
      });
    } else {
      comentariosDiv.classList.add("d-none");
      // Limpiamos los comentarios del DOM
      const parrafos = comentariosDiv.querySelectorAll("p");
      parrafos.forEach((p, indice) => {
        if (indice > 0) {
          p.remove();
        }
      });
    }
  });
}

// Función para mostrar todos los posts en la página
function mostrarPosts() {
  const contenedor = document.getElementById("entradas");

  // Recorremos los primeros 10 posts para mostrarlos
  for (let i = 0; i < 10 && i < datos.posts.length; i++) {
    const post = datos.posts[i];
    const postDiv = crearPost(post);
    contenedor.appendChild(postDiv);
  }
}

// Cuando se carga la página, cargamos los posts
window.addEventListener("load", cargarPosts);

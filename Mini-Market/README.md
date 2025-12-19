# Mini-Market

## Descripción
Tienda online interactiva construida con HTML, CSS, JavaScript vanilla y Webpack.

## Estructura del Proyecto

```
mini-market/
├── src/
│   ├── js/
│   │   ├── clases/
│   │   │   ├── DatabaseCarrito.js    # Manejo de localStorage para el carrito
│   │   │   ├── Carrito.js             # Lógica del carrito de compras
│   │   │   └── Producto.js            # Modelo de datos del producto
│   │   ├── pages/
│   │   │   ├── index.js               # Página principal
│   │   │   ├── electronica.js         # Página de electrónica
│   │   │   ├── muebles.js             # Página de muebles
│   │   │   ├── decoracion.js          # Página de decoración
│   │   │   ├── cesta.js               # Página del carrito
│   │   │   └── api.js                 # Funciones para consumir la API
│   │   └── components/
│   │       └── header.js              # Componente del header reutilizable
│   ├── styles/
│   │   └── main.css                   # Estilos principales
│   └── templates/
│       ├── index.html
│       ├── electronica.html
│       ├── muebles.html
│       ├── decoracion.html
│       └── cesta.html
├── server/
│   ├── db.json                        # Base de datos JSON
│   └── package.json
├── package.json
├── webpack.config.js
└── README.md
```

## Instalación

```bash
npm install
cd server && npm install && cd ..
```

## Ejecución

### Terminal 1 - Servidor de desarrollo (API)
```bash
npm run server
```

### Terminal 2 - Servidor de Webpack
```bash
npm run dev
```

Accede a: `http://localhost:8080`

## Construcción para Producción

```bash
npm run build
```

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Bundler**: Webpack 5
- **Estilos**: CSS Vanilla
- **Servidor API**: json-server (para desarrollo)
- **LocalStorage**: Para persistencia del carrito

## Características

- ✅ Carrito de compras con persistencia en localStorage
- ✅ Múltiples categorías de productos
- ✅ Consumo de API REST
- ✅ Diseño responsivo
- ✅ Módulos ES6 organizados
- ✅ Clases de JavaScript para mejor OOP
- ✅ Componentes reutilizables

## Notas de Desarrollo

- Los archivos JavaScript utilizan módulos ES6 (import/export)
- El carrito se sincroniza automáticamente con localStorage
- El header se carga dinámicamente en todas las páginas
- Los estilos están centralizados en `src/styles/main.css`

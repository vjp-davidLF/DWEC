// src/js/header.js

export function cargarHeader() {
    const headerHTML = `
        <header style="background-color: #f8f9fa; padding: 1rem; border-bottom: 1px solid #ddd;">
            <h1>Mini-Market</h1>
            <nav>
                <ul style="display: flex; list-style: none; gap: 1rem; padding: 0;">
                    <li><a href="index.html">Inicio</a></li>
                    <li>
                        <a href="#">Categorías</a>
                        <ul>
                            <li><a href="electronica.html">Electrónica</a></li>
                            <li><a href="muebles.html">Muebles</a></li>
                            <li><a href="decoracion.html">Decoración</a></li>
                        </ul>
                    </li>
                    <li><a href="cesta.html">Cesta de la compra (<span id="contador-cesta">0</span>)</a></li>
                </ul>
            </nav>
        </header>
    `;

    const headerContainer = document.getElementById('header');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
    }
}
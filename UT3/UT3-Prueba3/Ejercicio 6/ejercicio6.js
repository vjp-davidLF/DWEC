document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('contenedorGeneral');
    let colors = ['red', 'blue', 'green', 'yellow'];
    let matriz = 10;

    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${matriz}, 30px)`;
    container.style.gridTemplateRows = `repeat(${matriz}, 30px)`;
    container.style.gap = '2px';

    for (let i = 0; i < matriz; i++) {
        for (let j = 0; j < matriz; j++) {
            let celda = document.createElement('div');
            celda.classList.add('celda');
            celda.dataset.colorIndex = 0;
            celda.style.backgroundColor = colors[0];
            celda.style.width = '30px';
            celda.style.height = '30px';
            celda.style.border = '1px solid #ccc';
            celda.style.cursor = 'pointer';
            celda.addEventListener('click', function () {
                let currentIndex = parseInt(this.dataset.colorIndex);
                let nextIndex = (currentIndex + 1) % colors.length;
                this.dataset.colorIndex = nextIndex;
                this.style.backgroundColor = colors[nextIndex];
            });
            container.appendChild(celda);
        }
    }
        celda.addEventListener('click', function (event) {
            event.preventDefault();
            event.addEventListener;
            let currentIndex = parseInt(this.dataset.colorIndex);
            let prevIndex = (currentIndex - 1 + colors.length) % colors.length;
            this.dataset.colorIndex = prevIndex;
            this.style.backgroundColor = colors[prevIndex];
        });
});



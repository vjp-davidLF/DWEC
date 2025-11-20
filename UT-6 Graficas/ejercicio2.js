let chart = null;

function generarGrafica() {
    const salarioInicial = parseFloat(document.getElementById('salarioInicial').value);
    
    // Validar input
    if (isNaN(salarioInicial) || salarioInicial <= 0) {
        alert('Por favor ingresa un salario válido');
        return;
    }
    
    // Calcular la progresión salarial con 3% de incremento anual
    const datos = calcularProgresionSalarial(salarioInicial);
    
    // Generar la gráfica
    mostrarGrafica(datos);
    
    // Mostrar análisis estadístico
    mostrarAnalisis(datos, salarioInicial);
}

function calcularProgresionSalarial(salarioInicial) {
    const incremento = 0.03; // 3% anual
    const anos = 10;
    const datos = [];
    
    let salarioActual = salarioInicial;
    for (let i = 1; i <= anos; i++) {
        datos.push({
            ano: i,
            salario: salarioActual,
            incrementoAnual: i > 1 ? salarioActual - datos[i - 2].salario : 0
        });
        salarioActual *= (1 + incremento);
    }
    
    return datos;
}

function mostrarGrafica(datos) {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    
    const anos = datos.map(d => 'Año ' + d.ano);
    const salarios = datos.map(d => Math.round(d.salario * 100) / 100);
    
    // Destruir gráfica anterior si existe
    if (chart) {
        chart.destroy();
    }
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: anos,
            datasets: [
                {
                    label: 'Salario Anual (€)',
                    data: salarios,
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#007bff',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: '#0056b3'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Progresión Salarial con Incremento Anual del 3%',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '€ ' + value.toLocaleString('es-ES', {maximumFractionDigits: 0});
                        }
                    },
                    title: {
                        display: true,
                        text: 'Salario (€)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Años'
                    }
                }
            }
        }
    });
}

function mostrarAnalisis(datos, salarioInicial) {
    // Calcular estadísticas
    const salarios = datos.map(d => d.salario);
    const salarioFinal = salarios[salarios.length - 1];
    const incrementoTotal = salarioFinal - salarioInicial;
    const porcentajeTotal = ((incrementoTotal / salarioInicial) * 100).toFixed(2);
    const salarioPromedio = (salarios.reduce((a, b) => a + b, 0) / salarios.length).toFixed(2);
    const salarioMinimo = Math.min(...salarios).toFixed(2);
    const salarioMaximo = Math.max(...salarios).toFixed(2);
    
    // Calcular incrementos anuales
    const incrementosAnuales = [];
    for (let i = 1; i < datos.length; i++) {
        incrementosAnuales.push(datos[i].salario - datos[i - 1].salario);
    }
    const incrementoPromedioAnual = (incrementosAnuales.reduce((a, b) => a + b, 0) / incrementosAnuales.length).toFixed(2);
    const incrementoMaximoAnual = Math.max(...incrementosAnuales).toFixed(2);
    
    // Generar contenido HTML del análisis
    let analysisGridHTML = `
        <div class="stat-box">
            <div class="stat-label">Salario Inicial</div>
            <div class="stat-value">€ ${salarioInicial.toLocaleString('es-ES', {maximumFractionDigits: 2})}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Salario Final (Año 10)</div>
            <div class="stat-value">€ ${salarioFinal.toLocaleString('es-ES', {maximumFractionDigits: 2})}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Incremento Total</div>
            <div class="stat-value">€ ${incrementoTotal.toLocaleString('es-ES', {maximumFractionDigits: 2})}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Porcentaje Total</div>
            <div class="stat-value">${porcentajeTotal}%</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Salario Promedio</div>
            <div class="stat-value">€ ${parseFloat(salarioPromedio).toLocaleString('es-ES', {maximumFractionDigits: 2})}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Incremento Promedio Anual</div>
            <div class="stat-value">€ ${parseFloat(incrementoPromedioAnual).toLocaleString('es-ES', {maximumFractionDigits: 2})}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Incremento Máximo Anual</div>
            <div class="stat-value">€ ${parseFloat(incrementoMaximoAnual).toLocaleString('es-ES', {maximumFractionDigits: 2})}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Rango Salarial</div>
            <div class="stat-value">€ ${(parseFloat(salarioMaximo) - parseFloat(salarioMinimo)).toLocaleString('es-ES', {maximumFractionDigits: 2})}</div>
        </div>
    `;
    
    let analysisTextHTML = `
        <h3 style="margin-top: 0; color: #333;">Resumen Ejecutivo</h3>
        <p>Con un salario inicial de <strong>€ ${salarioInicial.toLocaleString('es-ES', {maximumFractionDigits: 2})}</strong> y una tasa de incremento anual consistente del 3%, el empleado experimentará un crecimiento salarial significativo a lo largo de la década. El salario final alcanzado en el año 10 será de <strong>€ ${salarioFinal.toLocaleString('es-ES', {maximumFractionDigits: 2})}</strong>, lo que representa un incremento acumulado de <strong>€ ${incrementoTotal.toLocaleString('es-ES', {maximumFractionDigits: 2})} (${porcentajeTotal}%)</strong>.</p>
        
        <h3 style="color: #333;">Análisis de Crecimiento</h3>
        <p>El modelo de incremento del 3% anual genera un efecto de capitalización, donde el aumento en términos absolutos es mayor en los años posteriores debido a que se aplica sobre un salario base más elevado. El incremento anual promedio de <strong>€ ${parseFloat(incrementoPromedioAnual).toLocaleString('es-ES', {maximumFractionDigits: 2})}</strong> muestra una tendencia de crecimiento gradual, alcanzando su máximo de <strong>€ ${parseFloat(incrementoMaximoAnual).toLocaleString('es-ES', {maximumFractionDigits: 2})}</strong> en el décimo año.</p>
        
        <h3 style="color: #333;">Conclusiones</h3>
        <p>La progresión salarial muestra una curva de crecimiento exponencial caracterizada por incrementos anuales progresivos. Con una tasa de incremento del 3% anual, el empleado puede anticipar un incremento salarial total del ${porcentajeTotal}% al final del período de 10 años. El salario promedio durante el período es de <strong>€ ${parseFloat(salarioPromedio).toLocaleString('es-ES', {maximumFractionDigits: 2})}</strong>, situándose entre un mínimo de <strong>€ ${parseFloat(salarioMinimo).toLocaleString('es-ES', {maximumFractionDigits: 2})}</strong> y un máximo de <strong>€ ${parseFloat(salarioMaximo).toLocaleString('es-ES', {maximumFractionDigits: 2})}</strong>.</p>
        
        <h3 style="color: #333;">Recomendaciones</h3>
        <p>Este modelo de incremento es positivo para la planificación financiera a largo plazo. Se recomienda que el empleado considere este crecimiento salarial en su planificación de jubilación y presupuestación a futuro. Además, es aconsejable revisitar esta proyección periódicamente para asegurar que se mantiene alineada con las expectativas reales de incremento salarial en la organización.</p>
    `;
    
    // Actualizar elementos del DOM
    document.getElementById('analysisGrid').innerHTML = analysisGridHTML;
    document.getElementById('analysisText').innerHTML = analysisTextHTML;
    document.getElementById('analysisContainer').style.display = 'block';
}

// Generar gráfica al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    generarGrafica();
});

let chartInstance = null;

function cargarCSV() {
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];
    const errorDiv = document.getElementById('error');
    
    if (!file) {
        mostrarError('Por favor selecciona un archivo CSV');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(event) {
        try {
            const csvText = event.target.result;
            const data = parseCSV(csvText);
            
            if (data.length === 0) {
                mostrarError('El CSV no contiene datos válidos');
                return;
            }
            
            crearGrafica(data);
            generarAnalisis(data);
            mostrarInfo(`Se cargaron correctamente ${data.length} registros`);
            errorDiv.style.display = 'none';
        } catch (error) {
            mostrarError('Error al procesar el CSV: ' + error.message);
        }
    };
    
    reader.readAsText(file);
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
        throw new Error('El CSV está vacío o no es válido');
    }
    
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = lines[i].split(',');
        
        const row = {};
        for (let j = 0; j < headers.length; j++) {
            const header = headers[j].trim();
            const value = values[j] ? values[j].trim() : '';
            
            row[header] = isNaN(value) ? value : parseFloat(value);
        }
        
        data.push(row);
    }
    
    return data;
}

function crearGrafica(data) {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    
    const headers = Object.keys(data[0]);
    let numericHeader = null;
    
    for (let header of headers) {
        if (typeof data[0][header] === 'number') {
            numericHeader = header;
            break;
        }
    }
    
    crearGraficaLineas(data, numericHeader || headers[0], ctx);
}

function crearGraficaLineas(data, dataHeader, ctx) {
    const valores = data.map(row => row[dataHeader]);
    
    // Calcular media por bloques de 10,000 registros
    const tamañoBloque = 10000;
    const numBloques = Math.ceil(valores.length / tamañoBloque);
    
    // Crear etiquetas y datos de bloques
    const labels = [];
    const datasBloque = [];
    
    for (let i = 0; i < numBloques; i++) {
        const inicioBloque = i * tamañoBloque;
        const finBloque = Math.min(inicioBloque + tamañoBloque, valores.length);
        
        // Etiqueta del bloque
        labels.push(`Bloque ${i + 1} (${inicioBloque + 1}-${finBloque})`);
        
        // Calcular la media del bloque
        let sumaBloque = 0;
        for (let j = inicioBloque; j < finBloque; j++) {
            sumaBloque += valores[j];
        }
        const mediaBloque = sumaBloque / (finBloque - inicioBloque);
        datasBloque.push(mediaBloque);
    }
    
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    // Guardar datasBloque en una variable global para acceso en tooltip
    window.ultimosDatasBloque = datasBloque;
    
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: `Media por Bloques de 10.000 registros - ${dataHeader}`,
                    data: datasBloque,
                    backgroundColor: '#8B0000',
                    borderColor: '#5C0000',
                    borderWidth: 2,
                    borderRadius: 5,
                    type: 'bar'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Gráfica de Barras - ${dataHeader}`,
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    labels: { font: { size: 12 } }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            return 'Media del bloque: ' + context.parsed.y.toFixed(2);
                        },
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            if (index > 0 && window.ultimosDatasBloque) {
                                const anterior = window.ultimosDatasBloque[index - 1];
                                const actual = window.ultimosDatasBloque[index];
                                const cambio = actual - anterior;
                                const porcentaje = ((cambio / anterior) * 100).toFixed(2);
                                if (cambio > 0) {
                                    return 'Aumento: +' + cambio.toFixed(2) + ' (' + porcentaje + '%)';
                                } else if (cambio < 0) {
                                    return 'Disminucion: ' + cambio.toFixed(2) + ' (' + porcentaje + '%)';
                                } else {
                                    return 'Sin cambios';
                                }
                            }
                            return '';
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Registros',
                        font: { size: 13, weight: 'bold' }
                    },
                    ticks: {
                        font: { size: 10 }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: dataHeader,
                        font: { size: 13, weight: 'bold' }
                    },
                    ticks: {
                        font: { size: 11 },
                        stepSize: 10000,
                        callback: function(value) {
                            return value.toLocaleString('es-ES');
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function generarAnalisis(data) {
    const headers = Object.keys(data[0]);
    let numericHeader = null;
    
    for (let header of headers) {
        if (typeof data[0][header] === 'number') {
            numericHeader = header;
            break;
        }
    }
    
    if (!numericHeader) return;
    
    const valores = data.map(row => row[numericHeader]);
    
    // Calcular estadísticas
    const min = Math.min(...valores);
    const max = Math.max(...valores);
    const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;
    const mediana = calcularMediana(valores);
    const rango = max - min;
    
    // Calcular desviación estándar y varianza
    const varianza = valores.reduce((sum, val) => sum + Math.pow(val - promedio, 2), 0) / valores.length;
    const desviacionEstandar = Math.sqrt(varianza);
    const coeficienteVariacion = (desviacionEstandar / promedio * 100).toFixed(2);
    
    // Calcular tendencia
    const primeros = valores.slice(0, Math.max(1, Math.floor(valores.length / 4))).reduce((a, b) => a + b, 0) / Math.max(1, Math.floor(valores.length / 4));
    const ultimos = valores.slice(Math.max(0, Math.floor(valores.length * 3 / 4))).reduce((a, b) => a + b, 0) / Math.max(1, valores.length - Math.floor(valores.length * 3 / 4));
    const cambioTotal = valores[valores.length - 1] - valores[0];
    const porcentajeCambio = (cambioTotal / valores[0] * 100).toFixed(2);
    const tendencia = ultimos > primeros ? 'al alza' : ultimos < primeros ? 'a la baja' : 'estable';
    
    // Calcular percentiles
    const p25 = calcularPercentil(valores, 0.25);
    const p75 = calcularPercentil(valores, 0.75);
    
    // Contar valores
    const valoresMayores = valores.filter(v => v > promedio).length;
    const valoresMenores = valores.filter(v => v < promedio).length;
    
    // Generar HTML del análisis rápido
    const gridHTML = `
        <div class="stat-box">
            <div class="stat-label">Valor Mínimo</div>
            <div class="stat-value">${min.toFixed(2)}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Valor Máximo</div>
            <div class="stat-value">${max.toFixed(2)}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Promedio</div>
            <div class="stat-value">${promedio.toFixed(2)}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Mediana</div>
            <div class="stat-value">${mediana.toFixed(2)}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Rango</div>
            <div class="stat-value">${rango.toFixed(2)}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Volatilidad</div>
            <div class="stat-value">${coeficienteVariacion}%</div>
        </div>
    `;
    
    const analisisTexto = `
        <strong>RESUMEN EJECUTIVO</strong><br><br>
        <strong>Total de registros analizados:</strong> ${valores.length}<br>
        <strong>Rango de valores:</strong> ${min.toFixed(2)} a ${max.toFixed(2)}<br>
        <strong>Promedio:</strong> ${promedio.toFixed(2)}<br>
        <strong>Tendencia observada:</strong> ${tendencia}<br>
        <strong>Variabilidad:</strong> ${coeficienteVariacion}% (${coeficienteVariacion > 30 ? 'Alta' : coeficienteVariacion > 15 ? 'Moderada' : 'Baja'})
    `;
    
    // Generar análisis detallado profesional
    const analisisDetallado = `
        <div class="analysis-section">
            <div class="section-title">1. DESCRIPCION DE LOS DATOS</div>
            <div class="section-content">
                <p>Se ha analizado un conjunto de datos compuesto por <strong>${valores.length} registros</strong> de la variable <strong>"${numericHeader}"</strong>. 
                Los datos presentan una distribucion que varía desde un mínimo de <strong>${min.toFixed(2)}</strong> hasta un máximo de <strong>${max.toFixed(2)}</strong>, 
                con un rango total de <strong>${rango.toFixed(2)}</strong> unidades.</p>
                <div class="highlight">
                    <strong>OBSERVACION CLAVE:</strong> El rango de <strong>${rango.toFixed(2)}</strong> unidades indica la amplitud total de variacion en los datos, 
                    lo que sugiere una ${rango > (promedio * 0.5) ? 'considerable' : 'moderada'} dispersión en el conjunto de datos.
                </div>
            </div>
        </div>

        <div class="analysis-section">
            <div class="section-title">2. MEDIDAS DE TENDENCIA CENTRAL</div>
            <div class="section-content">
                <p>Las medidas de tendencia central proporcionan un valor representativo del conjunto de datos:</p>
                <div class="info-row">
                    <span class="info-label">Media Aritmetica:</span>
                    <span class="info-value">${promedio.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Mediana:</span>
                    <span class="info-value">${mediana.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Diferencia (Media - Mediana):</span>
                    <span class="info-value">${(promedio - mediana).toFixed(2)}</span>
                </div>
                <div class="interpretation">
                    <strong>INTERPRETACION:</strong> La media de <strong>${promedio.toFixed(2)}</strong> representa el promedio algebraico de todos los valores.
                    La mediana de <strong>${mediana.toFixed(2)}</strong> es el valor central que divide los datos en dos mitades iguales.
                    ${Math.abs(promedio - mediana) > rango * 0.1 
                        ? '<br><strong>HALLAZGO:</strong> La diferencia significativa entre media y mediana sugiere una distribucion sesgada, indicando la presencia de valores atípicos.'
                        : '<br><strong>HALLAZGO:</strong> La similitud entre media y mediana sugiere una distribucion relativamente simétrica.'}
                </div>
            </div>
        </div>

        <div class="analysis-section">
            <div class="section-title">3. MEDIDAS DE DISPERSION Y VARIABILIDAD</div>
            <div class="section-content">
                <p>Estas métricas cuantifican cuánto se dispersan los datos alrededor de la media:</p>
                <div class="info-row">
                    <span class="info-label">Desviacion Estandar:</span>
                    <span class="info-value">${desviacionEstandar.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Varianza:</span>
                    <span class="info-value">${varianza.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Coeficiente de Variacion:</span>
                    <span class="info-value">${coeficienteVariacion}%</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Rango Intercuartilico (IQR):</span>
                    <span class="info-value">${(p75 - p25).toFixed(2)}</span>
                </div>
                <div class="interpretation">
                    <strong>INTERPRETACION:</strong> Una desviacion estándar de <strong>${desviacionEstandar.toFixed(2)}</strong> indica que típicamente los valores 
                    varían <strong>${desviacionEstandar.toFixed(2)}</strong> unidades respecto a la media.
                    El coeficiente de variacion del <strong>${coeficienteVariacion}%</strong> revela una variabilidad <strong>${coeficienteVariacion > 30 ? 'ALTA' : coeficienteVariacion > 15 ? 'MODERADA' : 'BAJA'}</strong>.
                    El rango intercuartilico de <strong>${(p75 - p25).toFixed(2)}</strong> contiene el 50% central de los datos.
                </div>
            </div>
        </div>

        <div class="analysis-section">
            <div class="section-title">4. ANALISIS DE TENDENCIA Y EVOLUCION</div>
            <div class="section-content">
                <p>El análisis temporal revela cómo evolucionan los datos a lo largo del período observado:</p>
                <div class="info-row">
                    <span class="info-label">Valor Inicial (Primer Registro):</span>
                    <span class="info-value">${valores[0].toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Valor Final (Ultimo Registro):</span>
                    <span class="info-value">${valores[valores.length - 1].toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Cambio Absoluto:</span>
                    <span class="info-value">${cambioTotal > 0 ? '+' : ''}${cambioTotal.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Cambio Porcentual:</span>
                    <span class="info-value">${porcentajeCambio > 0 ? '+' : ''}${porcentajeCambio}%</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Tendencia General:</span>
                    <span class="info-value">${tendencia}</span>
                </div>
                <div class="interpretation">
                    <strong>INTERPRETACION:</strong> Los datos muestran una tendencia <strong>${tendencia}</strong> a lo largo del período.
                    Se registró un cambio de <strong>${cambioTotal > 0 ? '+' : ''}${cambioTotal.toFixed(2)}</strong> unidades, equivalente a un <strong>${porcentajeCambio > 0 ? '+' : ''}${porcentajeCambio}%</strong>.
                    Este cambio ${Math.abs(parseFloat(porcentajeCambio)) > 10 ? 'es significativo' : 'es moderado'} y refleja ${tendencia === 'al alza' ? 'un crecimiento en los valores' : tendencia === 'a la baja' ? 'una disminucion en los valores' : 'estabilidad en los valores'}.
                </div>
            </div>
        </div>

        <div class="analysis-section">
            <div class="section-title">5. DISTRIBUCION Y PERCENTILES</div>
            <div class="section-content">
                <p>Análisis de la distribucion de datos en cuartiles:</p>
                <div class="info-row">
                    <span class="info-label">Percentil 25 (Q1):</span>
                    <span class="info-value">${p25.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Mediana (Q2/P50):</span>
                    <span class="info-value">${mediana.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Percentil 75 (Q3):</span>
                    <span class="info-value">${p75.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Valores por categoria:</span>
                    <span class="info-value">Ver tabla inferior</span>
                </div>
                <div class="interpretation">
                    <strong>DISTRIBUCION:</strong><br>
                    • 25% de los datos: ${valores.filter(v => v < p25).length} registros (valores inferiores a ${p25.toFixed(2)})<br>
                    • 50% de los datos: ${valores.filter(v => v >= p25 && v <= p75).length} registros (entre ${p25.toFixed(2)} y ${p75.toFixed(2)})<br>
                    • 25% de los datos: ${valores.filter(v => v > p75).length} registros (valores superiores a ${p75.toFixed(2)})<br>
                    <br><strong>ANALISIS:</strong> El 50% central de los datos (rango intercuartilico) representa la dispersion típica de la mayoria de observaciones.
                </div>
            </div>
        </div>

        <div class="analysis-section">
            <div class="section-title">6. CONCLUSIONES Y RECOMENDACIONES</div>
            <div class="section-content">
                <strong>HALLAZGOS PRINCIPALES:</strong>
                <ul style="color: #555; line-height: 2;">
                    <li><strong>Variabilidad:</strong> El conjunto presenta una variabilidad ${coeficienteVariacion > 30 ? '<strong style="color: #d9534f;">ALTA</strong> - Los datos son muy dispersos y heterogéneos' : coeficienteVariacion > 15 ? '<strong style="color: #f0ad4e;">MODERADA</strong> - Los datos muestran una dispersion razonable pero considerable' : '<strong style="color: #5cb85c;">BAJA</strong> - Los datos son relativamente homogéneos y consistentes'}</li>
                    <li><strong>Tendencia:</strong> ${tendencia === 'al alza' ? 'Se observa un crecimiento general en los valores analizados' : tendencia === 'a la baja' ? 'Se observa una disminucion general en los valores analizados' : 'Los valores permanecen relativamente estables sin cambios significativos'}</li>
                    <li><strong>Distribucion:</strong> ${Math.abs(promedio - mediana) < rango * 0.05 ? 'La distribucion es relativamente simétrica' : 'La distribucion presenta asimetria, sugiriendo valores atípicos'}</li>
                </ul>
                <br>
                <strong>RECOMENDACIONES:</strong>
                <ul style="color: #555; line-height: 2;">
                    <li>Investigar las causas de la variabilidad observada para optimizar procesos</li>
                    <li>Monitorear la tendencia ${tendencia} para tomar decisiones preventivas</li>
                    <li>Identificar y analizar registros en los extremos del rango para comprender anomalías</li>
                </ul>
            </div>
        </div>
    `;
    
    document.getElementById('analysisGrid').innerHTML = gridHTML;
    document.getElementById('analysisText').innerHTML = analisisTexto;
    document.getElementById('analysisContainer').style.display = 'block';
    document.getElementById('detailedAnalysis').innerHTML = analisisDetallado;
    document.getElementById('detailedAnalysis').style.display = 'block';
}

function calcularMediana(valores) {
    const sorted = [...valores].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function calcularPercentil(valores, percentil) {
    const sorted = [...valores].sort((a, b) => a - b);
    const indice = percentil * (sorted.length - 1);
    const inferior = Math.floor(indice);
    const superior = Math.ceil(indice);
    const peso = indice % 1;
    
    if (inferior === superior) {
        return sorted[inferior];
    }
    
    return sorted[inferior] * (1 - peso) + sorted[superior] * peso;
}

function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
    errorDiv.style.color = '#721c24';
}

function mostrarInfo(mensaje) {
    const infoDiv = document.getElementById('info');
    infoDiv.textContent = mensaje;
}



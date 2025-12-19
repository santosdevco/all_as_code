# Responder Preguntas

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
<script src="/javascripts/prompt-builder-clean.js"></script>

<div id="answer-page-container">
    <div style="text-align: center; padding: 40px;">
        <div class="loading-spinner" style="display: inline-block; width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <p style="color: #7f8c8d; margin-top: 20px;">Cargando preguntas...</p>
    </div>
</div>

<style>
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.answer-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.answer-header h1 {
    margin: 0 0 10px 0;
}

.answer-header .meta {
    opacity: 0.9;
    font-size: 0.95em;
}

.error-box {
    background: #fff3cd;
    border: 2px solid #ffc107;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
}

.success-box {
    background: #d4edda;
    border: 2px solid #28a745;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    text-align: center;
}

.form-section {
    background: white;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.submit-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 15px 40px;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
}

.submit-btn:hover {
    background: #218838;
}

.submit-btn:disabled {
    background: #6c757d;
    cursor: not-allowed;
}
</style>

<script>
let currentToken = null;
let analysisData = null;
let promptBuilder = null; // Referencia al builder

// Extraer token de la URL
function getTokenFromURL() {
    // Primero intentar query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = urlParams.get('token');
    if (tokenFromQuery) {
        return tokenFromQuery;
    }
    
    // Fallback: path (para compatibilidad)
    const path = window.location.pathname;
    const match = path.match(/\/answer\/([^\/]+)/);
    return match ? match[1] : null;
}

// Cargar datos del análisis
async function loadAnalysisData() {
    const container = document.getElementById('answer-page-container');
    currentToken = getTokenFromURL();
    
    console.log('🔍 Token extraído de URL:', currentToken);
    console.log('📍 URL completa:', window.location.href);
    
    if (!currentToken) {
        container.innerHTML = `
            <div class="error-box">
                <h2>❌ Token no encontrado</h2>
                <p>Esta URL no es válida. Verifica que hayas copiado la URL completa.</p>
                <p style="color: #666; font-size: 0.85em;">URL actual: ${window.location.href}</p>
            </div>
        `;
        return;
    }
    
    try {
        console.log('📡 Solicitando datos para token:', currentToken);
        analysisData = await window.documentationFlow.getPublicAnalysis(currentToken);
        console.log('✅ Datos recibidos:', {
            type: analysisData.analysis_type,
            title: analysisData.yaml_config.title,
            token: currentToken
        });
        renderAnalysisForm();
        
    } catch (error) {
        console.error('❌ Error cargando análisis:', error);
        container.innerHTML = `
            <div class="error-box">
                <h2>❌ Error cargando preguntas</h2>
                <p>${error.message}</p>
                <p style="color: #666; font-size: 0.9em;">Verifica que el backend esté corriendo y que el token sea válido.</p>
                <p style="color: #666; font-size: 0.85em;">Token: ${currentToken}</p>
            </div>
        `;
    }
}

// Renderizar formulario
function renderAnalysisForm() {
    const container = document.getElementById('answer-page-container');
    const config = analysisData.yaml_config;
    const hasAnswers = analysisData.answers && Object.keys(analysisData.answers).length > 0;
    
    console.log('🎨 Renderizando formulario:', {
        token: currentToken,
        type: analysisData.analysis_type,
        title: config.title,
        iteration: analysisData.current_iteration,
        hasAnswers: hasAnswers
    });
    
    // Header con info del análisis
    const headerHtml = `
        <div class="answer-header">
            <h1>${config.title || 'Cuestionario'}</h1>
            <div class="meta">
                <p>${config.description || ''}</p>
                <p><strong>Tipo de análisis:</strong> ${analysisData.analysis_type}</p>
                <p><strong>Iteración Actual:</strong> ${analysisData.iteration} ${analysisData.iteration_history?.length > 0 ? `| Total Iteraciones: ${analysisData.iteration_history.length + 1}` : ''}</p>
                <p><strong>Token (debug):</strong> <code>${currentToken}</code></p>
                ${hasAnswers ? '<p style="background: #d4edda; color: #155724; padding: 10px; border-radius: 6px; margin-top: 10px;"><strong>✅ Ya hay respuestas guardadas.</strong> Puedes modificarlas y actualizar.</p>' : ''}
            </div>
        </div>
        
        <!-- Pestañas de Iteraciones Históricas -->
        ${analysisData.iteration_history && analysisData.iteration_history.length > 0 ? `
            <div style="background: #f8f9fa; padding: 20px; margin-bottom: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 15px 0; color: #2c3e50;">📚 Contexto de Iteraciones Anteriores</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                    ${analysisData.iteration_history.map((iter) => `
                        <button class="iteration-history-btn" data-iteration="${iter.iteration}" 
                                style="background: white; border: 2px solid #e0e0e0; padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.3s;"
                                onclick="showHistoricalIteration(${iter.iteration})">
                            🔄 Iteración ${iter.iteration}
                            ${iter.answers_provided && Object.keys(iter.answers_provided).length > 0 ? '<span style="color: #27ae60;">✓</span>' : '<span style="color: #95a5a6;">○</span>'}
                        </button>
                    `).join('')}
                    <button class="iteration-history-btn active" data-iteration="${analysisData.iteration}" 
                            style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: bold;"
                            onclick="showCurrentIteration()">
                        🔄 Iteración ${analysisData.iteration} (Actual)
                    </button>
                </div>
                <div id="historical-iteration-content" style="display: none; background: white; padding: 20px; border-radius: 8px; border: 2px solid #3498db;"></div>
            </div>
        ` : ''}
    `;
    
    // Contenedor para el formulario
    container.innerHTML = headerHtml + '<div id="form-container-wrapper"></div>';
    
    const formWrapper = document.getElementById('form-container-wrapper');
    const buttonText = hasAnswers ? '🔄 Actualizar Respuestas' : '✅ Enviar Respuestas';
    
    if (typeof PromptBuilder !== 'undefined' && typeof jsyaml !== 'undefined') {
        // Crear contenedor para PromptBuilder
        formWrapper.innerHTML = `<div id="prompt-builder-container"></div><button type="button" class="submit-btn" id="submit-answers-btn">${buttonText}</button>`;
        
        // Usar PromptBuilder con YAML directo - usar 'answer' como ID
        const yamlText = jsyaml.dump(config);
        promptBuilder = new PromptBuilder('prompt-builder-container', 'answer', yamlText);
        promptBuilder.init().then(() => {
            console.log('✅ Formulario generado con PromptBuilder para token:', currentToken);
            
            // Pre-cargar respuestas si existen
            if (hasAnswers) {
                preloadAnswers(analysisData.answers);
            }
            
            // Ocultar botones de PromptBuilder (copiar respuestas, etc.)
            const pbButtons = document.querySelector('.pb-buttons-container');
            if (pbButtons) pbButtons.style.display = 'none';
            
            // Conectar botón de envío
            document.getElementById('submit-answers-btn').addEventListener('click', handleSubmit);
        }).catch(err => {
            console.error('Error inicializando PromptBuilder:', err);
            promptBuilder = null;
            renderFallbackFormWithSubmit(formWrapper, config);
        });
    } else {
        // Fallback simple
        promptBuilder = null;
        renderFallbackFormWithSubmit(formWrapper, config);
    }
}

// Mostrar iteración histórica
window.showHistoricalIteration = function(iterationNumber) {
    const historyItem = analysisData.iteration_history.find(h => h.iteration === iterationNumber);
    if (!historyItem) {
        console.error('No se encontró iteración', iterationNumber);
        return;
    }
    
    const contentDiv = document.getElementById('historical-iteration-content');
    const formWrapper = document.getElementById('form-container-wrapper');
    
    // Ocultar formulario actual
    formWrapper.style.display = 'none';
    contentDiv.style.display = 'block';
    
    // Actualizar botones activos
    document.querySelectorAll('.iteration-history-btn').forEach(btn => {
        if (parseInt(btn.dataset.iteration) === iterationNumber) {
            btn.style.background = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
            btn.style.color = 'white';
            btn.style.border = 'none';
            btn.style.fontWeight = 'bold';
        } else {
            btn.style.background = 'white';
            btn.style.color = '#2c3e50';
            btn.style.border = '2px solid #e0e0e0';
            btn.style.fontWeight = 'normal';
        }
    });
    
    // Renderizar contenido de la iteración histórica
    const yamlConfig = historyItem.yaml_generated || {};
    const answers = historyItem.answers_provided || {};
    
    let html = `
        <h3 style="color: #2c3e50; margin: 0 0 15px 0;">📜 Iteración ${iterationNumber} (Histórica)</h3>
        <p style="color: #7f8c8d; margin-bottom: 20px;"><strong>Fecha:</strong> ${new Date(historyItem.timestamp).toLocaleString('es-ES')}</p>
    `;
    
    // Renderizar preguntas y respuestas
    if (yamlConfig.sections) {
        yamlConfig.sections.forEach(section => {
            html += `
                <div style="margin-bottom: 25px;">
                    <h4 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 15px; border-radius: 8px; margin: 0 0 15px 0;">
                        ${section.icon || '📌'} ${section.title}
                    </h4>
            `;
            
            section.questions.forEach(q => {
                const answer = answers[q.id];
                if (answer !== undefined) {
                    const displayValue = Array.isArray(answer) ? 
                        `<ul style="margin: 10px 0; padding-left: 20px;">${answer.map(v => `<li>${v}</li>`).join('')}</ul>` :
                        `<p style="margin: 10px 0; color: #2c3e50;">${answer || '<em style="color: #95a5a6;">Sin respuesta</em>'}</p>`;
                    
                    html += `
                        <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-left: 4px solid #3498db; border-radius: 6px;">
                            <strong style="color: #2c3e50;">${q.label || q.question || q.id}</strong>
                            ${q.help ? `<p style="margin: 5px 0 10px 0; color: #7f8c8d; font-size: 0.9em;">${q.help}</p>` : ''}
                            ${displayValue}
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        });
    } else {
        // Sin secciones, mostrar respuestas directamente
        for (const [key, value] of Object.entries(answers)) {
            const displayValue = Array.isArray(value) ? value.join(', ') : value;
            html += `
                <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-left: 4px solid #3498db; border-radius: 6px;">
                    <strong style="color: #2c3e50;">${key}:</strong>
                    <p style="margin: 10px 0 0 0; color: #555;">${displayValue}</p>
                </div>
            `;
        }
    }
    
    contentDiv.innerHTML = html;
};

// Volver a mostrar iteración actual
window.showCurrentIteration = function() {
    const contentDiv = document.getElementById('historical-iteration-content');
    const formWrapper = document.getElementById('form-container-wrapper');
    
    // Mostrar formulario actual
    formWrapper.style.display = 'block';
    contentDiv.style.display = 'none';
    
    // Actualizar botones activos
    document.querySelectorAll('.iteration-history-btn').forEach(btn => {
        if (parseInt(btn.dataset.iteration) === analysisData.iteration) {
            btn.style.background = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
            btn.style.color = 'white';
            btn.style.border = 'none';
            btn.style.fontWeight = 'bold';
        } else {
            btn.style.background = 'white';
            btn.style.color = '#2c3e50';
            btn.style.border = '2px solid #e0e0e0';
            btn.style.fontWeight = 'normal';
        }
    });
};

// Pre-cargar respuestas existentes en el formulario
function preloadAnswers(answers) {
    if (!answers || Object.keys(answers).length === 0) return;
    
    console.log('Pre-cargando respuestas:', answers);
    
    // El formulario de PromptBuilder tiene el ID 'pb-form-answer'
    const form = document.getElementById('pb-form-answer');
    if (!form) {
        console.warn('Formulario no encontrado, reintentando en 500ms...');
        setTimeout(() => preloadAnswers(answers), 500);
        return;
    }
    
    // Llenar cada campo con su valor
    for (const [key, value] of Object.entries(answers)) {
        const field = form.querySelector(`[name="${key}"], [name="${key}[]"]`);
        
        if (!field) {
            console.warn(`Campo no encontrado: ${key}`);
            continue;
        }
        
        // Detectar tipo de campo
        if (field.type === 'checkbox') {
            // Para checkboxes, value es un array
            const checkboxes = form.querySelectorAll(`[name="${key}[]"]`);
            const values = Array.isArray(value) ? value : [value];
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = values.includes(checkbox.value);
            });
        } else if (field.type === 'radio') {
            // Para radio buttons
            const radios = form.querySelectorAll(`[name="${key}"]`);
            radios.forEach(radio => {
                radio.checked = radio.value === value;
            });
        } else {
            // Para text, textarea, select
            field.value = Array.isArray(value) ? value.join(', ') : value;
            
            // Si es un select con opción "Otro", verificar si necesita activar el campo otro
            if (field.tagName === 'SELECT' && value === 'otro') {
                const otroField = form.querySelector(`[name="${key}_otro"]`);
                if (otroField) {
                    otroField.style.display = 'block';
                }
            }
        }
    }
    
    console.log('✅ Respuestas pre-cargadas');
}

// Renderizar formulario fallback con botón de submit
function renderFallbackFormWithSubmit(container, config) {
    container.innerHTML = `
        <form id="answer-form">
            ${renderFallbackForm(config)}
            <button type="submit" class="submit-btn">✅ Enviar Respuestas</button>
        </form>
    `;
    document.getElementById('answer-form').addEventListener('submit', handleSubmit);
}

// Renderizar formulario fallback (sin PromptBuilder)
function renderFallbackForm(config) {
    return config.sections.map(section => `
        <div class="form-section">
            <h3>${section.icon || ''} ${section.title}</h3>
            ${section.questions.map(q => renderQuestion(q)).join('')}
        </div>
    `).join('');
}

// Renderizar pregunta (fallback simple)
function renderQuestion(question) {
    const baseHtml = `<div class="form-group"><label>${question.label}</label>`;
    
    // Función helper para normalizar opciones
    const normalizeOpt = (opt) => {
        if (typeof opt === 'string') return { value: opt, label: opt };
        return { value: opt.value || opt.label, label: opt.label || opt.value };
    };
    
    switch(question.type) {
        case 'text':
            return `${baseHtml}<input type="text" name="${question.id}" placeholder="${question.placeholder || ''}"></div>`;
        
        case 'textarea':
            return `${baseHtml}<textarea name="${question.id}" rows="4" placeholder="${question.placeholder || ''}"></textarea></div>`;
        
        case 'select': {
            const opts = question.options ? question.options.map(normalizeOpt) : [];
            const optionsHtml = opts.map(o => `<option value="${o.value}">${o.label}</option>`).join('');
            return `${baseHtml}<select name="${question.id}" onchange="if(this.value==='__otro__'){document.getElementById('${question.id}_otro').style.display='block';}else{document.getElementById('${question.id}_otro').style.display='none';}">
                <option value="">Selecciona una opción</option>
                ${optionsHtml}
                <option value="__otro__">Otro...</option>
            </select>
            <input type="text" id="${question.id}_otro" name="${question.id}_otro" placeholder="Especifica otra opción..." style="display:none;margin-top:8px;padding:8px;width:100%;border:1px solid #ccc;border-radius:4px;"></div>`;
        }
        
        case 'radio': {
            const opts = question.options ? question.options.map(normalizeOpt) : [];
            const optionsHtml = opts.map(o => `
                <label style="display: block; margin: 5px 0;">
                    <input type="radio" name="${question.id}" value="${o.value}" onchange="document.getElementById('${question.id}_otro').style.display='none';"> ${o.label}
                </label>
            `).join('');
            return `${baseHtml}${optionsHtml}
                <label style="display: block; margin: 5px 0;">
                    <input type="radio" name="${question.id}" value="__otro__" onchange="document.getElementById('${question.id}_otro').style.display='inline-block';"> Otro:
                    <input type="text" id="${question.id}_otro" placeholder="Especifica..." style="display:none;margin-left:8px;padding:4px;">
                </label>
            </div>`;
        }
        
        case 'checkbox': {
            const opts = question.options ? question.options.map(normalizeOpt) : [];
            const optionsHtml = opts.map(o => `
                <label style="display: block; margin: 5px 0;">
                    <input type="checkbox" name="${question.id}" value="${o.value}"> ${o.label}
                </label>
            `).join('');
            return `${baseHtml}${optionsHtml}
                <label style="display: block; margin: 5px 0;">
                    <input type="checkbox" id="${question.id}_otro_check" onchange="document.getElementById('${question.id}_otro').style.display=this.checked?'inline-block':'none';"> Otro:
                    <input type="text" id="${question.id}_otro" name="${question.id}_otro" placeholder="Especifica..." style="display:none;margin-left:8px;padding:4px;">
                </label>
            </div>`;
        }
        
        default:
            return '';
    }
}

// Manejar envío del formulario
async function handleSubmit(event) {
    if (event) event.preventDefault();
    
    const submitBtn = document.getElementById('submit-answers-btn') || 
                      document.querySelector('.submit-btn');
    
    if (!submitBtn) {
        console.error('No se encontró botón de envío');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Enviando...';
    
    try {
        let answers = {};
        
        // Recolectar respuestas usando PromptBuilder si está disponible
        if (promptBuilder && typeof promptBuilder.collectFormData === 'function') {
            answers = promptBuilder.collectFormData();
        } else {
            // Fallback: recolección manual
            const form = document.getElementById('answer-form');
            if (!form) {
                throw new Error('No se encontró el formulario');
            }
            
            const formData = new FormData(form);
            const processedCheckboxes = new Set();
            
            for (const [key, value] of formData.entries()) {
                // Saltar campos _otro que se procesan después
                if (key.endsWith('_otro')) continue;
                
                const input = form.querySelector(`[name="${key}"]`);
                
                // Manejar checkbox múltiple
                if (input && input.type === 'checkbox' && !processedCheckboxes.has(key)) {
                    processedCheckboxes.add(key);
                    const checkboxes = form.querySelectorAll(`[name="${key}"]`);
                    answers[key] = [];
                    checkboxes.forEach(cb => {
                        if (cb.checked) answers[key].push(cb.value);
                    });
                    // Agregar valor de Otro si está marcado
                    const otroCheck = document.getElementById(`${key}_otro_check`);
                    const otroInput = document.getElementById(`${key}_otro`);
                    if (otroCheck && otroCheck.checked && otroInput && otroInput.value.trim()) {
                        answers[key].push(otroInput.value.trim());
                    }
                }
                // Manejar radio con Otro
                else if (input && input.type === 'radio' && value === '__otro__') {
                    const otroInput = document.getElementById(`${key}_otro`);
                    if (otroInput && otroInput.value.trim()) {
                        answers[key] = otroInput.value.trim();
                    }
                }
                // Manejar select con Otro
                else if (input && input.tagName === 'SELECT' && value === '__otro__') {
                    const otroInput = document.getElementById(`${key}_otro`);
                    if (otroInput && otroInput.value.trim()) {
                        answers[key] = otroInput.value.trim();
                    }
                }
                // Valores normales
                else if (!processedCheckboxes.has(key)) {
                    answers[key] = value;
                }
            }
        }
        
        // Enviar al backend
        const hadPreviousAnswers = analysisData.answers && Object.keys(analysisData.answers).length > 0;
        
        await window.apiClient.post(
            window.API_CONFIG.endpoints.updatePublicAnswers(currentToken),
            { answers: answers }
        );
        
        // Mostrar éxito
        const actionText = hadPreviousAnswers ? 'actualizadas' : 'enviadas';
        const successIcon = hadPreviousAnswers ? '🔄' : '✅';
        
        document.getElementById('answer-page-container').innerHTML = `
            <div class="success-box">
                <h2>${successIcon} ¡Respuestas ${actionText} exitosamente!</h2>
                <p>Tus respuestas han sido guardadas. El analista será notificado.</p>
                ${hadPreviousAnswers ? '<p style="margin-top: 10px;">Las respuestas anteriores han sido reemplazadas con las nuevas.</p>' : ''}
                <p style="margin-top: 20px;">Puedes cerrar esta página o <a href="${window.location.href}" style="color: #3498db; text-decoration: underline;">volver a cargar</a> para hacer más cambios.</p>
            </div>
        `;
        
    } catch (error) {
        alert('❌ Error enviando respuestas: ' + error.message);
        submitBtn.disabled = false;
        const hadPreviousAnswers = analysisData.answers && Object.keys(analysisData.answers).length > 0;
        submitBtn.textContent = hadPreviousAnswers ? '🔄 Actualizar Respuestas' : '✅ Enviar Respuestas';
    }
}

// Crear nueva iteración desde la página de respuestas - Con nuevo YAML
window.createNewIterationFromAnswer = async function() {
    if (!analysisData || !analysisData.id) {
        alert('❌ No se pudo obtener el ID del análisis');
        return;
    }

    // Mostrar modal para pegar el nuevo YAML
    const modalHtml = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px;" id="iteration-yaml-modal">
            <div style="background: white; border-radius: 16px; max-width: 900px; width: 100%; max-height: 90vh; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);" onclick="event.stopPropagation()">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: white; padding: 25px;">
                    <h2 style="margin: 0; font-size: 1.5em;">🔄 Nueva Iteración de Seguimiento</h2>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">
                        Iteración actual: ${analysisData.current_iteration} → Nueva: ${analysisData.current_iteration + 1}
                    </p>
                </div>
                
                <!-- Contenido -->
                <div style="padding: 30px; overflow-y: auto; max-height: calc(90vh - 200px);">
                    
                    <!-- Explicación -->
                    <div style="background: #e8f5e9; padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #27ae60;">
                        <h3 style="margin: 0 0 10px 0; color: #27ae60;">💡 ¿Qué es una iteración?</h3>
                        <p style="margin: 0; color: #555; line-height: 1.6;">
                            Las iteraciones permiten hacer <strong>preguntas de seguimiento</strong> basadas en las respuestas anteriores.
                            Usa el botón "📋 Copiar Respuestas", pégalas en Copilot, y genera un nuevo YAML con preguntas más específicas.
                        </p>
                    </div>
                    
                    <!-- Formulario YAML -->
                    <div style="margin-bottom: 20px;">
                        <label for="answer-iteration-yaml" style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50;">
                            Nuevo YAML de Copilot *
                            <span style="color: #7f8c8d; font-weight: normal; font-size: 0.9em;">
                                (Preguntas de seguimiento generadas por Copilot)
                            </span>
                        </label>
                        <textarea id="answer-iteration-yaml" rows="15" 
                                  placeholder="Pega aquí el YAML generado por Copilot con las nuevas preguntas..."
                                  style="width: 100%; padding: 15px; border: 2px solid #3498db; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 0.9em; box-sizing: border-box;"
                                  required></textarea>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="padding: 20px 30px; background: #f8f9fa; border-top: 1px solid #e0e0e0; display: flex; gap: 10px; justify-content: flex-end;">
                    <button onclick="submitIterationFromAnswer()" style="background: #27ae60; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);">
                        ✅ Crear Iteración ${analysisData.current_iteration + 1}
                    </button>
                    <button onclick="document.getElementById('iteration-yaml-modal').remove()" style="background: #95a5a6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

// Enviar nueva iteración desde answer.md
window.submitIterationFromAnswer = async function() {
    const yamlText = document.getElementById('answer-iteration-yaml').value.trim();
    
    if (!yamlText) {
        alert('❌ Debes pegar el YAML generado por Copilot');
        return;
    }
    
    try {
        // Parsear YAML para validar
        const yamlConfig = jsyaml.load(yamlText);
        
        if (!yamlConfig.questions && !yamlConfig.sections) {
            throw new Error('El YAML debe contener "questions" o "sections"');
        }
        
        // Crear nueva iteración con el nuevo YAML
        const response = await window.apiClient.put(
            window.apiClient.endpoints.addIteration(analysisData.id),
            { 
                needs_more_info: true,
                yaml_config: yamlConfig 
            }
        );

        if (response.new_token) {
            const newUrl = `${window.location.origin}/answer/?token=${response.new_token}`;
            
            // Cerrar modal de entrada
            document.getElementById('iteration-yaml-modal').remove();
            
            // Mostrar modal de éxito
            const successModalHtml = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center;" id="iteration-success-modal">
                    <div style="background: white; padding: 30px; border-radius: 12px; max-width: 600px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                        <h2 style="color: #27ae60; margin: 0 0 15px 0;">✅ Iteración ${response.current_iteration} creada</h2>
                        <p style="margin: 0 0 15px 0; color: #555;">
                            Se ha creado la nueva iteración con las preguntas de seguimiento.
                        </p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <strong style="color: #2c3e50;">🔗 URL para compartir:</strong>
                            <input type="text" value="${newUrl}" readonly style="width: 100%; padding: 10px; border: 2px solid #3498db; border-radius: 5px; font-family: monospace; margin-top: 10px; box-sizing: border-box;">
                        </div>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button onclick="navigator.clipboard.writeText('${newUrl}'); alert('URL copiada al portapapeles')" style="flex: 1; background: #3498db; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">📋 Copiar URL</button>
                            <button onclick="window.location.href='${newUrl}'" style="flex: 1; background: #27ae60; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">🔗 Ir a iteración ${response.current_iteration}</button>
                            <button onclick="document.getElementById('iteration-success-modal').remove()" style="background: #95a5a6; color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer;">Cerrar</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', successModalHtml);
        }
    } catch (error) {
        console.error('Error al crear iteración:', error);
        alert('❌ Error al crear la iteración: ' + error.message);
    }
};

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', loadAnalysisData);

// 🔥 CRÍTICO: Detectar cambios de URL (navegación en MkDocs)
// MkDocs es SPA, no recarga el script al navegar
let lastToken = null;

// Polling para detectar cambios de token en la URL
setInterval(() => {
    const newToken = getTokenFromURL();
    if (newToken && newToken !== lastToken) {
        console.log('🔄 Token cambió de', lastToken, 'a', newToken, '- Recargando...');
        lastToken = newToken;
        loadAnalysisData(); // Recargar datos
    }
}, 500); // Cada 500ms chequear si cambió la URL

</script>

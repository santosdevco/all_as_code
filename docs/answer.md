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
    
    if (!currentToken) {
        container.innerHTML = `
            <div class="error-box">
                <h2>❌ Token no encontrado</h2>
                <p>Esta URL no es válida. Verifica que hayas copiado la URL completa.</p>
            </div>
        `;
        return;
    }
    
    try {
        analysisData = await window.documentationFlow.getPublicAnalysis(currentToken);
        renderAnalysisForm();
        
    } catch (error) {
        container.innerHTML = `
            <div class="error-box">
                <h2>❌ Error cargando preguntas</h2>
                <p>${error.message}</p>
                <p style="color: #666; font-size: 0.9em;">Verifica que el backend esté corriendo y que el token sea válido.</p>
            </div>
        `;
    }
}

// Renderizar formulario
function renderAnalysisForm() {
    const container = document.getElementById('answer-page-container');
    const config = analysisData.yaml_config;
    
    // Header con info del análisis
    const headerHtml = `
        <div class="answer-header">
            <h1>${config.title || 'Cuestionario'}</h1>
            <div class="meta">
                <p>${config.description || ''}</p>
                <p><strong>Tipo de análisis:</strong> ${analysisData.analysis_type}</p>
                <p><strong>Iteración:</strong> ${analysisData.current_iteration}</p>
            </div>
        </div>
    `;
    
    // Contenedor para el formulario
    container.innerHTML = headerHtml + '<div id="form-container-wrapper"></div>';
    
    const formWrapper = document.getElementById('form-container-wrapper');
    
    if (typeof PromptBuilder !== 'undefined' && typeof jsyaml !== 'undefined') {
        // Crear contenedor para PromptBuilder
        formWrapper.innerHTML = '<div id="prompt-builder-container"></div><button type="button" class="submit-btn" id="submit-answers-btn">✅ Enviar Respuestas</button>';
        
        // Usar PromptBuilder con YAML directo - usar 'answer' como ID
        const yamlText = jsyaml.dump(config);
        promptBuilder = new PromptBuilder('prompt-builder-container', 'answer', yamlText);
        promptBuilder.init().then(() => {
            console.log('✅ Formulario generado con PromptBuilder');
            
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
    
    switch(question.type) {
        case 'text':
            return `${baseHtml}<input type="text" name="${question.id}" placeholder="${question.placeholder || ''}"></div>`;
        
        case 'textarea':
            return `${baseHtml}<textarea name="${question.id}" rows="4" placeholder="${question.placeholder || ''}"></textarea></div>`;
        
        case 'select':
            return `${baseHtml}<select name="${question.id}">
                <option value="">Selecciona una opción</option>
                ${question.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select></div>`;
        
        case 'radio':
            return `${baseHtml}${question.options.map(opt => `
                <label style="display: block; margin: 5px 0;">
                    <input type="radio" name="${question.id}" value="${opt}"> ${opt}
                </label>
            `).join('')}</div>`;
        
        case 'checkbox':
            return `${baseHtml}${question.options.map(opt => `
                <label style="display: block; margin: 5px 0;">
                    <input type="checkbox" name="${question.id}" value="${opt}"> ${opt}
                </label>
            `).join('')}</div>`;
        
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
            
            for (const [key, value] of formData.entries()) {
                if (answers[key]) {
                    // Checkbox múltiple
                    if (Array.isArray(answers[key])) {
                        answers[key].push(value);
                    } else {
                        answers[key] = [answers[key], value];
                    }
                } else {
                    answers[key] = value;
                }
            }
        }
        
        // Enviar al backend
        await window.apiClient.post(
            window.API_CONFIG.endpoints.updatePublicAnswers(currentToken),
            { answers: answers }
        );
        
        // Mostrar éxito
        document.getElementById('answer-page-container').innerHTML = `
            <div class="success-box">
                <h2>✅ ¡Respuestas enviadas exitosamente!</h2>
                <p>Tus respuestas han sido guardadas. El analista será notificado.</p>
                <p style="margin-top: 20px;">Puedes cerrar esta página.</p>
            </div>
        `;
        
    } catch (error) {
        alert('❌ Error enviando respuestas: ' + error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = '✅ Enviar Respuestas';
    }
}

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', loadAnalysisData);
</script>

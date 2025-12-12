/**
 * PromptBuilder - Sistema de formularios interactivos para generación de prompts
 * 
 * Uso básico:
 * <div data-prompt="07"></div>
 * 
 * Configuración: /ai_prompts/{id}.yaml
 */

class PromptBuilder {
    constructor(containerId, promptId, yamlText = null) {
        this.container = document.getElementById(containerId);
        this.promptId = promptId;
        this.config = null;
        this.formData = {};
        this.yamlText = yamlText; // YAML directo (opcional)
    }

    /**
     * Inicializa el formulario
     * Soporta dos modos:
     * 1. Desde archivo YAML: /ai_prompts/{promptId}.yaml
     * 2. Desde texto YAML directo (this.yamlText)
     */
    async init() {
        try {
            let yamlText;
            
            if (this.yamlText) {
                // Modo 1: YAML directo
                yamlText = this.yamlText;
            } else {
                // Modo 2: Cargar desde archivo
                const response = await fetch(`/ai_prompts/${this.promptId}.yaml`);
                if (!response.ok) {
                    throw new Error(`No se pudo cargar /ai_prompts/${this.promptId}.yaml`);
                }
                yamlText = await response.text();
            }
            
            // Parsear YAML
            if (typeof jsyaml === 'undefined') {
                throw new Error('Librería js-yaml no está cargada');
            }
            
            this.config = jsyaml.load(yamlText);
            
            if (!this.config) {
                throw new Error(`Configuración vacía para prompt ${this.promptId}`);
            }
            
            this.render();
        } catch (error) {
            console.error('Error al cargar configuración:', error);
            this.container.innerHTML = `
                <div class="pb-error">
                    ❌ Error al cargar el formulario: ${error.message}
                </div>
            `;
        }
    }

    /**
     * Renderiza el formulario completo
     */
    render() {
        const html = `
            <div class="prompt-builder">
                <div class="pb-header">
                    <h3>📋 ${this.config.title}</h3>
                    <p class="pb-description">${this.config.description}</p>
                </div>
                
                <div id="pb-form-container-${this.promptId}" class="pb-form-container">
                    ${this.renderWarning()}
                    
                    <form id="pb-form-${this.promptId}">
                        ${this.renderSections()}
                    </form>
                    
                    <button class="pb-generate-btn" onclick="promptBuilderInstances['${this.promptId}'].generatePrompt()">
                        🚀 Generar y Copiar Prompt
                    </button>
                </div>
                
                <button id="pb-show-form-${this.promptId}" class="pb-show-form-btn" style="display: none;" onclick="promptBuilderInstances['${this.promptId}'].toggleFormVisibility()">
                    ⬇️ Mostrar Formulario
                </button>
                
                <div id="pb-output-${this.promptId}" class="pb-output" style="display: none;">
                    <div class="pb-output-actions">
                        <button class="pb-copy-btn" onclick="promptBuilderInstances['${this.promptId}'].copyPrompt()">
                            📋 Copiar
                        </button>
                        <button class="pb-toggle-btn" onclick="promptBuilderInstances['${this.promptId}'].togglePromptView()">
                            👁️ Ocultar
                        </button>
                    </div>
                    <pre id="pb-prompt-text-${this.promptId}"></pre>
                </div>
            </div>
        `;
        
        this.container.innerHTML = html;
    }

    /**
     * Renderiza el mensaje de advertencia
     */
    renderWarning() {
        if (!this.config.warning) return '';
        
        const items = this.config.warning.items
            .map(item => `<li>${item}</li>`)
            .join('');
        
        return `
            <div class="pb-warning">
                <h4>${this.config.warning.title}</h4>
                <p>${this.config.warning.message}</p>
                <ul>${items}</ul>
            </div>
        `;
    }

    /**
     * Renderiza todas las secciones del formulario
     */
    renderSections() {
        return this.config.sections
            .map(section => this.renderSection(section))
            .join('');
    }

    /**
     * Renderiza una sección individual
     */
    renderSection(section) {
        return `
            <div class="pb-section">
                <h4 class="pb-section-title">
                    <span class="pb-section-icon">${section.icon}</span>
                    ${section.title}
                </h4>
                ${section.description ? `<p class="pb-section-description">${section.description}</p>` : ''}
                <div class="pb-questions">
                    ${section.questions.map(q => this.renderQuestion(q)).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Renderiza una pregunta según su tipo
     */
    renderQuestion(question) {
        const methods = {
            'text': () => this.renderText(question),
            'textarea': () => this.renderTextarea(question),
            'select': () => this.renderSelect(question),
            'radio': () => this.renderRadio(question),
            'checkbox': () => this.renderCheckbox(question)
        };
        
        const renderer = methods[question.type];
        return renderer ? renderer() : '';
    }

    /**
     * Renderiza campo de texto
     */
    renderText(q) {
        return `
            <div class="pb-question">
                <label class="pb-label" for="${q.id}">${q.label}</label>
                ${q.help ? `<small class="pb-help">${q.help}</small>` : ''}
                <input 
                    type="text" 
                    id="${q.id}" 
                    name="${q.id}" 
                    placeholder="${q.placeholder || ''}"
                    ${q.required ? 'required' : ''}
                    class="pb-input">
            </div>
        `;
    }

    /**
     * Renderiza textarea
     */
    renderTextarea(q) {
        return `
            <div class="pb-question">
                <label class="pb-label" for="${q.id}">${q.label}</label>
                ${q.help ? `<small class="pb-help">${q.help}</small>` : ''}
                <textarea 
                    id="${q.id}" 
                    name="${q.id}" 
                    rows="${q.rows || 3}"
                    placeholder="${q.placeholder || ''}"
                    class="pb-textarea"></textarea>
            </div>
        `;
    }

    /**
     * Renderiza select dropdown
     */
    renderSelect(q) {
        const options = q.options
            .map(opt => `<option value="${opt.value}" ${opt.value === q.default ? 'selected' : ''}>${opt.label}</option>`)
            .join('');
        
        return `
            <div class="pb-question">
                <label class="pb-label" for="${q.id}">${q.label}</label>
                ${q.help ? `<small class="pb-help">${q.help}</small>` : ''}
                <select id="${q.id}" name="${q.id}" class="pb-select">
                    ${options}
                </select>
                ${q.showOther ? `
                    <input 
                        type="text" 
                        id="${q.id}_other" 
                        placeholder="${q.otherPlaceholder || 'Especifica...'}" 
                        class="pb-input pb-other-input" 
                        style="display:none; margin-top:10px;">
                ` : ''}
            </div>
        `;
    }

    /**
     * Renderiza radio buttons
     */
    renderRadio(q) {
        const options = q.options
            .map(opt => `
                <label class="pb-radio-label">
                    <input 
                        type="radio" 
                        name="${q.id}" 
                        value="${opt.value}"
                        ${opt.value === q.default ? 'checked' : ''}>
                    <span>${opt.label}</span>
                </label>
            `).join('');
        
        return `
            <div class="pb-question">
                <label class="pb-label">${q.label}</label>
                ${q.help ? `<small class="pb-help">${q.help}</small>` : ''}
                <div class="pb-radio-group">
                    ${options}
                </div>
            </div>
        `;
    }

    /**
     * Renderiza checkboxes
     */
    renderCheckbox(q) {
        const options = q.options
            .map(opt => `
                <label class="pb-checkbox-label">
                    <input 
                        type="checkbox" 
                        name="${q.id}[]" 
                        value="${opt.value}"
                        ${opt.checked ? 'checked' : ''}>
                    <span>${opt.label}</span>
                </label>
            `).join('');
        
        return `
            <div class="pb-question">
                <label class="pb-label">${q.label}</label>
                ${q.help ? `<small class="pb-help">${q.help}</small>` : ''}
                <div class="pb-checkbox-group">
                    ${options}
                </div>
            </div>
        `;
    }

    /**
     * Recolecta los datos del formulario
     */
    collectFormData() {
        const formElement = document.getElementById(`pb-form-${this.promptId}`);
        const formData = new FormData(formElement);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key.endsWith('[]')) {
                const cleanKey = key.replace('[]', '');
                if (!data[cleanKey]) data[cleanKey] = [];
                data[cleanKey].push(value);
            } else {
                data[key] = value;
            }
        }
        
        // Procesar checkboxes no marcados
        this.config.sections.forEach(section => {
            section.questions.forEach(q => {
                if (q.type === 'checkbox' && !data[q.id]) {
                    data[q.id] = [];
                }
            });
        });
        
        return data;
    }

    /**
     * Genera el prompt basado en el template
     */
    generatePrompt() {
        const data = this.collectFormData();
        this.formData = data;
        
        let prompt = this.config.template;
        
        // Usar Handlebars si está disponible
        if (typeof Handlebars !== 'undefined') {
            try {
                const template = Handlebars.compile(prompt);
                prompt = template(data);
            } catch (error) {
                console.warn('Error con Handlebars, usando reemplazo simple:', error);
                prompt = this.simpleReplace(prompt, data);
            }
        } else {
            prompt = this.simpleReplace(prompt, data);
        }
        
        // Ocultar formulario y mostrar botón de "Mostrar Formulario"
        const formContainer = document.getElementById(`pb-form-container-${this.promptId}`);
        const showFormBtn = document.getElementById(`pb-show-form-${this.promptId}`);
        
        formContainer.style.display = 'none';
        showFormBtn.style.display = 'block';
        
        // Mostrar y copiar
        const outputDiv = document.getElementById(`pb-output-${this.promptId}`);
        const promptTextDiv = document.getElementById(`pb-prompt-text-${this.promptId}`);
        
        promptTextDiv.textContent = prompt;
        outputDiv.style.display = 'block';
        
        // Auto-copiar
        this.copyPrompt();
        
        // Scroll al output
        outputDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Reemplazo simple de variables {{variable}}
     */
    simpleReplace(template, data) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            if (Array.isArray(data[key])) {
                return data[key].join(', ');
            }
            return data[key] || `[${key}]`;
        });
    }

    /**
     * Copia el prompt al portapapeles
     */
    async copyPrompt() {
        const promptText = document.getElementById(`pb-prompt-text-${this.promptId}`);
        
        if (!promptText || !promptText.textContent) {
            alert('No hay prompt generado para copiar');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(promptText.textContent);
            
            const btn = document.querySelector(`#pb-output-${this.promptId} .pb-copy-btn`);
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = '✅ Copiado!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 3000);
            }
        } catch (error) {
            console.error('Error al copiar:', error);
            alert('Error al copiar. Selecciona y copia manualmente.');
        }
    }

    /**
     * Alterna visibilidad del prompt
     */
    togglePromptView() {
        const promptTextDiv = document.getElementById(`pb-prompt-text-${this.promptId}`);
        const btn = document.querySelector(`#pb-output-${this.promptId} .pb-toggle-btn`);
        
        if (promptTextDiv.style.display === 'none') {
            promptTextDiv.style.display = 'block';
            btn.textContent = '👁️ Ocultar';
        } else {
            promptTextDiv.style.display = 'none';
            btn.textContent = '👁️ Ver Prompt';
        }
    }

    /**
     * Alterna visibilidad del formulario
     */
    toggleFormVisibility() {
        const formContainer = document.getElementById(`pb-form-container-${this.promptId}`);
        const showFormBtn = document.getElementById(`pb-show-form-${this.promptId}`);
        
        if (formContainer.style.display === 'none') {
            // Mostrar formulario
            formContainer.style.display = 'block';
            showFormBtn.textContent = '⬆️ Ocultar Formulario';
            
            // Scroll al formulario
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Ocultar formulario
            formContainer.style.display = 'none';
            showFormBtn.textContent = '⬇️ Mostrar Formulario';
        }
    }
}

// ============================================
// INICIALIZACIÓN GLOBAL
// ============================================

// Almacenar instancias globalmente
window.promptBuilderInstances = {};

/**
 * Auto-inicializar formularios con data-prompt
 */
document.addEventListener('DOMContentLoaded', function() {
    const promptContainers = document.querySelectorAll('[data-prompt]');
    
    promptContainers.forEach(container => {
        const promptId = container.getAttribute('data-prompt');
        const containerId = container.id || `prompt-builder-${promptId}`;
        
        if (!container.id) {
            container.id = containerId;
        }
        
        const builder = new PromptBuilder(containerId, promptId);
        window.promptBuilderInstances[promptId] = builder;
        builder.init();
    });
});

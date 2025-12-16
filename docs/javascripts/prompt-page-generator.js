/**
 * Prompt Page Generator
 * 
 * Genera dinámicamente las páginas de prompts usando un template HTML embebido
 * y configurándolo según los parámetros de cada tipo de documentación.
 * 
 * Uso en Markdown:
 * <div id="prompt-page-root"
 *      data-type="deployment"
 *      data-title="🚀 Deployment e Infraestructura"
 *      data-description="Genera documentación completa de deployment, CI/CD y monitoreo"
 *      data-analysis-path="/prompts/deployment/01-analisis/"
 *      data-output-path="/prompts/deployment/02-salida/">
 * </div>
 * <script src="/javascripts/prompt-page-generator.js"></script>
 */

class PromptPageGenerator {
    constructor(rootElement) {
        this.root = rootElement;
        this.config = {
            type: rootElement.dataset.type,
            title: rootElement.dataset.title,
            description: rootElement.dataset.description,
            analysisPath: rootElement.dataset.analysisPath,
            outputPath: rootElement.dataset.outputPath
        };
    }

    async init() {
        try {
            // Cargar template desde servidor
            const template = await this.loadTemplate();
            
            // Renderizar template en el root
            this.root.innerHTML = `
                <h1>${this.config.title}</h1>
                <p style="font-size: 18px; margin-bottom: 30px;">${this.config.description}</p>
                ${template}
            `;
            
            // IMPORTANTE: Configurar event listeners DESPUÉS de insertar el HTML
            // Usar setTimeout para asegurar que el DOM esté actualizado
            setTimeout(() => {
                this.setupEventListeners();
            }, 100);
            
        } catch (error) {
            console.error('Error al inicializar página de prompt:', error);
            this.root.innerHTML = `
                <div class="admonition error">
                    <p class="admonition-title">Error al cargar la página</p>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }

    /**
     * Carga el template HTML desde el servidor
     * @returns {Promise<string>} Contenido HTML del template
     */
    async loadTemplate() {
        const templatePath = '/assets/templates/prompt-page.html';
        const response = await fetch(templatePath);
        
        if (!response.ok) {
            throw new Error(`No se pudo cargar el template: HTTP ${response.status}`);
        }
        
        return await response.text();
    }

    /**
     * Método obsoleto - mantener por compatibilidad
     * @deprecated Usar loadTemplate() en su lugar
     */
    getTemplate() {
        return `
            <div class="prompt-page-content">
                <!-- PASO 1: Copiar Prompt de Análisis -->
                <h2>📋 PASO 1: Copiar Prompt de Análisis Inicial</h2>
                
                <div style="text-align: center; margin: 30px 0;">
                    <button 
                        id="copy-analysis-btn"
                        data-action="copy-analysis"
                        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                               color: white; 
                               border: none; 
                               padding: 20px 40px; 
                               font-size: 20px; 
                               font-weight: bold; 
                               border-radius: 16px; 
                               cursor: pointer; 
                               box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
                               transition: all 0.3s ease;
                               display: inline-flex;
                               align-items: center;
                               gap: 12px;
                               margin-right: 15px;">
                        <span style="font-size: 28px;">📋</span>
                        Copiar Prompt de Análisis Inicial
                    </button>
                    <button 
                        data-action="view-analysis"
                        style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); 
                               color: #333; 
                               border: none; 
                               padding: 20px 40px; 
                               font-size: 20px; 
                               font-weight: bold; 
                               border-radius: 16px; 
                               cursor: pointer; 
                               box-shadow: 0 6px 20px rgba(168, 237, 234, 0.5);
                               transition: all 0.3s ease;
                               display: inline-flex;
                               align-items: center;
                               gap: 12px;">
                        <span style="font-size: 28px;">👁️</span>
                        Ver Prompt
                    </button>
                </div>

                <div class="admonition tip">
                    <p class="admonition-title">Pega el prompt en Copilot</p>
                    <p>Copilot analizará el <code>@workspace</code> y generará un YAML con preguntas.</p>
                </div>

                <hr>

                <!-- PASO 2: Generar Formulario -->
                <h2>🤖 PASO 2: Generar Formulario de preguntas</h2>

                <div class="admonition warning">
                    <p class="admonition-title">Importante</p>
                    <p>Con el prompt del paso 1, Copilot va a generar un YAML, que copias y pegas a continuación</p>
                </div>

                <hr>

                <div class="pb-warning" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 12px; color: white; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: white;">⚠️ Importante</h3>
                    <p style="margin-bottom: 0;">Copia el YAML completo que generó Copilot y pégalo abajo.</p>
                </div>

                <div style="margin: 30px 0;">
                    <label for="yaml-input" style="display: block; font-size: 18px; font-weight: bold; margin-bottom: 10px;">
                        📄 YAML del Análisis:
                    </label>
                    <textarea 
                        id="yaml-input" 
                        placeholder="Pega aquí el YAML completo que generó Copilot..."
                        style="width: 100%; 
                               height: 200px; 
                               padding: 15px; 
                               font-family: 'Courier New', monospace; 
                               font-size: 14px; 
                               border: 2px solid #667eea; 
                               border-radius: 8px; 
                               background: #f8f9fa;
                               resize: vertical;">
                    </textarea>
                    <button 
                        id="load-yaml-btn"
                        data-action="load-yaml"
                        style="background: linear-gradient(135deg, #f39c12 0%, #f1c40f 100%); 
                               color: white; 
                               border: none; 
                               padding: 15px 30px; 
                               font-size: 18px; 
                               font-weight: bold; 
                               border-radius: 8px; 
                               cursor: pointer; 
                               margin-top: 15px;
                               box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
                               transition: all 0.3s ease;">
                        🚀 Cargar Formulario
                    </button>
                </div>

                <hr>

                <!-- PASO 2.1: Responder Preguntas -->
                <h2>✏️ PASO 2.1: Responder Preguntas</h2>

                <div id="form-container" style="margin: 30px 0;">
                    <!-- El formulario se generará aquí automáticamente -->
                </div>

                <div class="admonition tip">
                    <p class="admonition-title">Después de responder</p>
                    <p>Haz clic en <strong>"📋 Copiar Respuestas"</strong> y pégalas en Copilot (mismo chat).</p>
                </div>

                <div class="admonition warning">
                    <p class="admonition-title">Si la respuesta es un YAML</p>
                    <p>Debes regresar al paso 2.</p>
                </div>

                <div class="admonition warning">
                    <p class="admonition-title">Si la respuesta es 'Todo OK'</p>
                    <p>Debes continuar al paso 3</p>
                </div>

                <!-- PASO 3: Prompt de Formato de Salida -->
                <h2>PASO 3: Prompt de Formato de Salida</h2>

                <div style="text-align: center; margin: 30px 0;">
                    <button 
                        id="copy-output-btn"
                        data-action="copy-output"
                        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                               color: white; 
                               border: none; 
                               padding: 20px 40px; 
                               font-size: 20px; 
                               font-weight: bold; 
                               border-radius: 16px; 
                               cursor: pointer; 
                               box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
                               transition: all 0.3s ease;
                               display: inline-flex;
                               align-items: center;
                               gap: 12px;
                               margin-right: 15px;">
                        <span style="font-size: 28px;">📋</span>
                        Copiar Prompt de Formato de Salida
                    </button>
                    <button 
                        data-action="view-output"
                        style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); 
                               color: #333; 
                               border: none; 
                               padding: 20px 40px; 
                               font-size: 20px; 
                               font-weight: bold; 
                               border-radius: 16px; 
                               cursor: pointer; 
                               box-shadow: 0 6px 20px rgba(168, 237, 234, 0.5);
                               transition: all 0.3s ease;
                               display: inline-flex;
                               align-items: center;
                               gap: 12px;">
                        <span style="font-size: 28px;">👁️</span>
                        Ver Prompt
                    </button>
                </div>

                <div class="admonition tip">
                    <p class="admonition-title">Pega el prompt en Copilot</p>
                    <p>Manteniendo la misma conversación, Copilot generará los archivos de salida de acuerdo a lo especificado en Salida</p>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Botón: Copiar Prompt de Análisis
        const copyAnalysisBtn = this.root.querySelector('#copy-analysis-btn');
        if (copyAnalysisBtn) {
            copyAnalysisBtn.addEventListener('click', () => {
                copyPromptFile(this.config.analysisPath, 'copy-analysis-btn');
            });
        }

        // Botón: Ver Prompt de Análisis
        const viewAnalysisBtn = this.root.querySelector('#open-analysis-btn');
        if (viewAnalysisBtn) {
            viewAnalysisBtn.addEventListener('click', () => {
                window.open(this.config.analysisPath, '_blank');
            });
        }

        // Botón: Cargar Formulario desde YAML
        const loadYamlBtn = this.root.querySelector('#load-yaml-btn');
        if (loadYamlBtn) {
            loadYamlBtn.addEventListener('click', () => {
                loadPromptFromYAML('yaml-input', 'form-container', `${this.config.type}-form`);
            });
        }

        // Botón: Copiar Prompt de Salida
        const copyOutputBtn = this.root.querySelector('#copy-output-btn');
        if (copyOutputBtn) {
            copyOutputBtn.addEventListener('click', () => {
                copyPromptFile(this.config.outputPath, 'copy-output-btn');
            });
        }

        // Botón: Ver Prompt de Salida
        const viewOutputBtn = this.root.querySelector('#open-output-btn');
        if (viewOutputBtn) {
            viewOutputBtn.addEventListener('click', () => {
                window.open(this.config.outputPath, '_blank');
            });
        }
    }
}

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async function() {
    const promptPageRoots = document.querySelectorAll('#prompt-page-root');
    
    for (const root of promptPageRoots) {
        const generator = new PromptPageGenerator(root);
        await generator.init();
    }
});

// También intentar inicializar si el script se carga después del DOMContentLoaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    const promptPageRoots = document.querySelectorAll('#prompt-page-root');
    (async () => {
        for (const root of promptPageRoots) {
            const generator = new PromptPageGenerator(root);
            await generator.init();
        }
    })();
}

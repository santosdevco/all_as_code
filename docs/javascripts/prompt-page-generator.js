/**
 * Prompt Page Generator
 * 
 * Genera dinámicamente las páginas de prompts cargando un template HTML
 * desde el servidor y configurándolo según el tipo de documentación seleccionado.
 */

class PromptPageGenerator {
    constructor(rootElement) {
        this.root = rootElement;
        
        // Tipos de documentación disponibles
        this.documentTypes = {
            'deployment': {
                title: '🚀 Deployment e Infraestructura',
                description: 'Genera documentación completa de deployment, CI/CD y monitoreo',
                analysisPath: '/prompts/deployment/01-analisis/',
                outputPath: '/prompts/deployment/02-salida/'
            },
            'api': {
                title: '📡 Documentación de API',
                description: 'Genera documentación completa de endpoints, autenticación y ejemplos',
                analysisPath: '/prompts/api/01-analisis/',
                outputPath: '/prompts/api/02-salida/'
            },
            'arquitectura': {
                title: '🏗️ Documentación de Arquitectura',
                description: 'Genera diagramas C4, ADRs y decisiones arquitectónicas',
                analysisPath: '/prompts/arquitectura/01-analisis/',
                outputPath: '/prompts/arquitectura/02-salida/'
            }
        };
        
        // Configuración inicial (deployment por defecto)
        this.currentType = 'deployment';
        this.config = this.documentTypes[this.currentType];
    }

    async init() {
        try {
            // Cargar template desde servidor
            const template = await this.loadTemplate();
            
            // Generar opciones del select
            const typeOptions = Object.entries(this.documentTypes)
                .map(([key, value]) => `<option value="${key}">${value.title}</option>`)
                .join('');
            
            // Renderizar con selector sticky
            this.root.innerHTML = `
                <div class="type-selector-sticky">
                    <label for="doc-type-select">📚 Tipo de Documentación:</label>
                    <select id="doc-type-select" class="doc-type-select">
                        ${typeOptions}
                    </select>
                </div>
                
                <div id="content-area">
                    <h1>${this.config.title}</h1>
                    <p style="font-size: 18px; margin-bottom: 30px;">${this.config.description}</p>
                    ${template}
                </div>
            `;
            
            // Configurar event listeners después de insertar el HTML
            setTimeout(() => {
                this.setupEventListeners();
                this.setupTypeSelector();
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
     * Configura el selector de tipo de documentación
     */
    setupTypeSelector() {
        const selector = this.root.querySelector('#doc-type-select');
        if (!selector) return;
        
        selector.addEventListener('change', async (e) => {
            this.currentType = e.target.value;
            this.config = this.documentTypes[this.currentType];
            
            // Recargar solo el área de contenido
            const template = await this.loadTemplate();
            const contentArea = this.root.querySelector('#content-area');
            
            contentArea.innerHTML = `
                <h1>${this.config.title}</h1>
                <p style="font-size: 18px; margin-bottom: 30px;">${this.config.description}</p>
                ${template}
            `;
            
            // Reconfigurar listeners
            setTimeout(() => {
                this.setupEventListeners();
            }, 100);
        });
    }

    /**
     * Configura los event listeners de los botones
     */
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
                console.log('🔍 Botón Cargar Formulario clickeado');
                console.log('currentType:', this.currentType);
                
                // Mostrar la sección del formulario
                const formSection = this.root.querySelector('#form-section');
                if (formSection) {
                    formSection.style.display = 'block';
                }
                
                // Cargar el formulario
                if (typeof loadPromptFromYAML === 'function') {
                    loadPromptFromYAML('yaml-input', 'form-container', `${this.currentType}-form`);
                } else {
                    console.error('loadPromptFromYAML no está disponible');
                    alert('Error: La función loadPromptFromYAML no está cargada');
                }
            });
        } else {
            console.warn('⚠️ Botón #load-yaml-btn no encontrado');
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

# Panel de Proyectos

<style>
.project-panel {
    max-width: 1400px;
    margin: 0 auto;
}

.header-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.tabs-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    border-bottom: 2px solid #e0e0e0;
    flex-wrap: wrap;
}

.tab-btn {
    background: transparent;
    border: none;
    padding: 12px 24px;
    cursor: pointer;
    font-weight: 600;
    color: #7f8c8d;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
}

.tab-btn:hover {
    color: #3498db;
}

.tab-btn.active {
    color: #3498db;
    border-bottom-color: #3498db;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
    animation: fadeIn 0.3s;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.project-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: all 0.3s;
}

.project-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    transform: translateY(-2px);
}

.project-card h3 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.4em;
}

.project-meta {
    color: #7f8c8d;
    font-size: 0.9em;
    margin: 15px 0;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 6px;
}

.btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    margin-right: 10px;
    margin-bottom: 10px;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
}

.btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

.btn-success {
    background: #27ae60;
    box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
}

.btn-success:hover {
    background: #229954;
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
}

.btn-danger {
    background: #e74c3c;
    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
}

.btn-danger:hover {
    background: #c0392b;
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
}

.btn-secondary {
    background: #95a5a6;
    box-shadow: 0 2px 8px rgba(149, 165, 166, 0.3);
}

.btn-secondary:hover {
    background: #7f8c8d;
}

.btn-small {
    padding: 6px 12px;
    font-size: 0.85em;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2c3e50;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    box-sizing: border-box;
    font-family: inherit;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #3498db;
}

.code-block {
    background: #2c3e50;
    color: #ecf0f1;
    padding: 20px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    overflow-x: auto;
    position: relative;
    margin: 15px 0;
}

.copy-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #3498db;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85em;
    transition: background 0.3s;
}

.copy-btn:hover {
    background: #2980b9;
}

.status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: 600;
}

.status-badge.pending {
    background: #fff3cd;
    color: #856404;
}

.status-badge.answered {
    background: #d4edda;
    color: #155724;
}

.status-badge.incomplete {
    background: #ffe5cc;
    color: #cc5500;
}

.analysis-type-badge {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: 600;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin-right: 10px;
}

.grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.hidden {
    display: none;
}
</style>

<div class="project-panel">

<div class="header-section">
    <h1 style="margin: 0 0 10px 0;">🚀 Panel de Gestión de Proyectos</h1>
    <p style="margin: 0; opacity: 0.9;">Sistema de documentación colaborativa con IA</p>
</div>

<!-- Pestañas de navegación -->
<div class="tabs-container">
    <button class="tab-btn active" onclick="switchTab('projects')">📁 Proyectos</button>
    <button class="tab-btn" onclick="switchTab('create-project')">➕ Crear Proyecto</button>
    <button class="tab-btn" onclick="switchTab('prompts-library')">📚 Biblioteca de Prompts</button>
</div>

<!-- TAB: Lista de Proyectos -->
<div id="tab-projects" class="tab-content active">
    <!-- Buscador de Sesiones -->
    <div class="project-card" style="margin-bottom: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
        <div style="display: flex; gap: 15px; align-items: center;">
            <input 
                type="text" 
                id="search-sessions" 
                placeholder="🔍 Buscar sesiones por texto (ej: 'método de deployment', 'autenticación JWT'...)"
                style="flex: 1; padding: 12px 20px; border: 2px solid #3498db; border-radius: 8px; font-size: 1em;"
                oninput="handleSearch()"
            >
            <button class="btn" onclick="clearSearch()">❌ Limpiar</button>
        </div>
        <div id="search-results" style="margin-top: 15px; display: none;"></div>
    </div>
    
    <div id="projects-list">
        <p>Cargando proyectos...</p>
    </div>
</div>

<!-- TAB: Crear Proyecto -->
<div id="tab-create-project" class="tab-content">
    <div class="project-card">
        <h2 style="margin-top: 0;">➕ Crear Nuevo Proyecto</h2>
        
        <div class="form-group">
            <label for="project-name">Nombre del Proyecto *</label>
            <input type="text" id="project-name" placeholder="Ej: Sistema de Facturación v2.0" required>
        </div>
        
        <div class="form-group">
            <label for="project-description">Descripción</label>
            <textarea id="project-description" rows="4" placeholder="Breve descripción del proyecto..."></textarea>
        </div>
        
        <div class="form-group">
            <label for="project-created-by">Creado por</label>
            <input type="email" id="project-created-by" placeholder="tu-email@example.com">
        </div>
        
        <button class="btn btn-success" onclick="createNewProject()">✅ Crear Proyecto</button>
        <button class="btn btn-secondary" onclick="switchTab('projects')">Cancelar</button>
    </div>
</div>

<!-- TAB: Biblioteca de Prompts -->
<div id="tab-prompts-library" class="tab-content">
    <div class="project-card">
        <h2 style="margin-top: 0;">📚 Biblioteca de Prompts de Análisis</h2>
        <p>Prompts preconstruidos para diferentes tipos de análisis. Cópialos y pégalos en el generador de Copilot.</p>
        
        <div id="prompts-list"></div>
    </div>
</div>


<!-- Modal para crear análisis -->
<div id="analysis-modal"
    style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); align-items: center; justify-content: center; z-index: 10000; padding: 20px;">
    <div
        style="background: white; padding: 0; border-radius: 16px; max-width: 900px; width: 100%; max-height: 90vh; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        
        <!-- Header del modal -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 16px 16px 0 0;">
            <h2 style="margin: 0; font-size: 1.5em;">✨ Crear Sesión de Análisis</h2>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Selecciona el tipo de análisis y pega el YAML generado</p>
        </div>

        <!-- Contenido del modal -->
        <div style="padding: 30px; overflow-y: auto; max-height: calc(90vh - 180px);">
            
            <!-- Pestañas -->
            <div style="display: flex; gap: 15px; margin-bottom: 25px; border-bottom: 2px solid #e0e0e0;">
                <button class="tab-btn active" onclick="switchAnalysisTab('config')" id="tab-btn-config">
                    ⚙️ Configuración
                </button>
                <button class="tab-btn" onclick="switchAnalysisTab('prompt')" id="tab-btn-prompt">
                    📝 Ver Prompt de Análisis
                </button>
            </div>

            <!-- Tab: Configuración -->
            <div id="analysis-tab-config" class="analysis-tab-content">
                <div class="form-group">
                    <label for="analysis-type">Tipo de Análisis *</label>
                    <select id="analysis-type" onchange="updateAnalysisPrompt()">
                        <option value="arquitectura">🏗️ Arquitectura</option>
                        <option value="api">🔌 API</option>
                        <option value="deployment">🚀 Deployment</option>
                        <option value="requerimientos">📋 Requerimientos</option>
                        <option value="procesos-negocio">💼 Procesos de Negocio</option>
                        <option value="tecnica">⚙️ Técnica</option>
                        <option value="vista-ejecutiva">👔 Vista Ejecutiva</option>
                        <option value="adr">📐 ADR (Architecture Decision Records)</option>
                        <option value="swagger">📖 Swagger/OpenAPI</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="analysis-yaml">
                        Configuración YAML * 
                        <span style="color: #7f8c8d; font-weight: normal; font-size: 0.9em;">
                            (Generado por Copilot usando el prompt de análisis)
                        </span>
                    </label>
                    <textarea id="analysis-yaml" rows="12" 
                              placeholder="Pega aquí el YAML generado por Copilot..."
                              style="font-family: 'Courier New', monospace; font-size: 0.9em;"
                              required></textarea>
                </div>

                <div class="grid-2">
                    <div class="form-group">
                        <label for="analysis-created-by">Creado por</label>
                        <input type="email" id="analysis-created-by" placeholder="analista@example.com">
                    </div>

                    <div class="form-group">
                        <label for="analysis-assigned-to">Asignado a (experto)</label>
                        <input type="email" id="analysis-assigned-to" placeholder="experto@example.com">
                    </div>
                </div>
            </div>

            <!-- Tab: Prompt de Análisis -->
            <div id="analysis-tab-prompt" class="analysis-tab-content" style="display: none;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h3 style="margin: 0 0 10px 0;">📝 Instrucciones</h3>
                    <ol style="margin: 10px 0; padding-left: 20px; color: #555;">
                        <li>Copia el prompt de análisis usando el botón</li>
                        <li>Pégalo en GitHub Copilot Chat</li>
                        <li>Copilot analizará tu proyecto y generará un YAML con preguntas</li>
                        <li>Copia el YAML generado y pégalo en la pestaña "Configuración"</li>
                    </ol>
                </div>

                <div id="prompt-display" class="code-block">
                    <button class="copy-btn" onclick="copyPromptToClipboard()">📋 Copiar Prompt</button>
                    <pre id="prompt-text" style="margin: 0; white-space: pre-wrap;">Cargando prompt...</pre>
                </div>
            </div>
        </div>

        <!-- Footer del modal -->
        <div style="padding: 20px 30px; background: #f8f9fa; border-top: 1px solid #e0e0e0; display: flex; gap: 10px; justify-content: flex-end;">
            <button class="btn btn-success" onclick="submitAnalysis()">✅ Crear Análisis</button>
            <button class="btn btn-secondary" onclick="closeAnalysisModal()">Cancelar</button>
        </div>
    </div>
</div>

<script>
// ============================================
// DECLARACIÓN DE FUNCIONES GLOBALES (antes de DOMContentLoaded)
// ============================================

// Variables globales
let currentProjectForAnalysis = null;
let currentAnalysisType = 'arquitectura';
let searchTimeout;

// Navegación por pestañas
window.switchTab = function(tabName) {
    console.log('switchTab called:', tabName);
    
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tabs-container .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const tabContent = document.getElementById('tab-' + tabName);
    if (tabContent) {
        tabContent.classList.add('active');
        console.log('✅ Tab activada:', tabName);
    } else {
        console.error('❌ Tab no encontrada:', 'tab-' + tabName);
    }
    
    document.querySelectorAll('.tabs-container .tab-btn').forEach(btn => {
        const onclick = btn.getAttribute('onclick');
        if (onclick && onclick.includes("switchTab('" + tabName + "')")) {
            btn.classList.add('active');
        }
    });
}

// Búsqueda de sesiones
window.handleSearch = async function() {
    console.log('🔍 handleSearch called');
    const searchInput = document.getElementById('search-sessions');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) {
        console.error('❌ Elementos de búsqueda no encontrados');
        return;
    }
    
    const query = searchInput.value.trim();
    console.log('Query:', query);
    
    clearTimeout(searchTimeout);
    
    if (query.length < 3) {
        searchResults.style.display = 'none';
        return;
    }
    
    searchTimeout = setTimeout(async () => {
        try {
            searchResults.innerHTML = '<p>🔍 Buscando...</p>';
            searchResults.style.display = 'block';
            
            const baseUrl = window.location.hostname === 'localhost' 
                ? 'http://localhost:8000' 
                : 'https://fastdocumentationai-backend-1.onrender.com';
            
            console.log('Buscando en:', `${baseUrl}/api/search/analyses?q=${encodeURIComponent(query)}`);
            const response = await fetch(`${baseUrl}/api/search/analyses?q=${encodeURIComponent(query)}&limit=20`);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            
            const sessions = await response.json();
            console.log('✅ Sesiones encontradas:', sessions.length);
            
            if (sessions.length === 0) {
                searchResults.innerHTML = `
                    <div style="padding: 20px; text-align: center; color: #7f8c8d;">
                        <p>😕 No se encontraron sesiones que coincidan con "<strong>${query}</strong>"</p>
                    </div>
                `;
                return;
            }
            
            const getAnalysisTypeEmoji = (type) => {
                const emojis = {
                    'arquitectura': '🏗️', 'api': '🔌', 'deployment': '🚀',
                    'requerimientos': '📋', 'procesos-negocio': '💼', 'tecnica': '⚙️',
                    'vista-ejecutiva': '👔', 'adr': '📐', 'swagger': '📖'
                };
                return emojis[type] || '📄';
            };
            
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleDateString('es-ES', { 
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                });
            };
            
            searchResults.innerHTML = `
                <div style="margin-bottom: 10px; padding: 10px; background: #e8f5e9; border-radius: 6px;">
                    <strong>✨ ${sessions.length} resultado${sessions.length > 1 ? 's' : ''} encontrado${sessions.length > 1 ? 's' : ''}</strong>
                </div>
                ${sessions.map(session => `
                    <div style="padding: 15px; margin-bottom: 10px; background: white; border: 1px solid #e0e0e0; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div style="flex: 1;">
                                <h4 style="margin: 0 0 5px 0; color: #2c3e50;">
                                    ${getAnalysisTypeEmoji(session.analysis_type)} ${session.yaml_config?.title || 'Sin título'}
                                </h4>
                                <p style="margin: 0; color: #7f8c8d; font-size: 0.9em;">
                                    📁 ${session.project_name} | 
                                    📅 ${formatDate(session.updated_at)} |
                                    🔄 Iteración ${session.iteration}
                                </p>
                            </div>
                            <div>
                                ${session.answers && Object.keys(session.answers).length > 0 
                                    ? '<span style="background: #d4edda; color: #155724; padding: 4px 8px; border-radius: 4px; font-size: 0.8em;">✅ Respondida</span>'
                                    : '<span style="background: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 4px; font-size: 0.8em;">⏳ Pendiente</span>'
                                }
                            </div>
                        </div>
                        <div style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
                            <button class="btn btn-small" onclick="window.open('${session.share_url}', '_blank')">
                                📝 Abrir Formulario
                            </button>
                            ${session.answers && Object.keys(session.answers).length > 0 ? `
                                <button class="btn btn-small btn-secondary" onclick="viewAnswersInModal('${session.id}')">
                                    👁️ Ver Respuestas
                                </button>
                                <button class="btn btn-small btn-secondary" onclick="copyOutputPrompt('${session.id}')">
                                    📋 Copiar Prompt 2
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            `;
            
        } catch (error) {
            console.error('Error en búsqueda:', error);
            searchResults.innerHTML = `
                <div style="padding: 20px; background: #fff3cd; border-radius: 6px;">
                    <p style="color: #856404; margin: 0;">⚠️ Error al buscar: ${error.message}</p>
                </div>
            `;
        }
    }, 500);
}

// Limpiar búsqueda
window.clearSearch = function() {
    console.log('🧹 clearSearch called');
    const searchInput = document.getElementById('search-sessions');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.style.display = 'none';
}

console.log('✅ Funciones globales cargadas');

// Prompts de análisis disponibles
const ANALYSIS_PROMPTS = {
    arquitectura: '/prompts/arquitectura/01-analisis.md',
    api: '/prompts/api/01-analisis.md',
    deployment: '/prompts/deployment/01-analisis.md',
    requerimientos: '/prompts/requerimientos/01-analisis.md',
    'procesos-negocio': '/prompts/procesos-negocio/01-analisis.md',
    tecnica: '/prompts/tecnica/01-analisis.md',
    'vista-ejecutiva': '/prompts/vista-ejecutiva/01-analisis.md',
    adr: '/prompts/adr/01-analisis.md',
    swagger: '/prompts/swagger/01-analisis.md'
};

// Cargar proyectos al iniciar
document.addEventListener('DOMContentLoaded', async () => {
    console.log('✅ DOMContentLoaded - Panel de Proyectos');
    console.log('window.documentationFlow:', window.documentationFlow);
    console.log('window.apiClient:', window.apiClient);
    console.log('switchTab function:', typeof window.switchTab);
    
    // Esperar a que los scripts se carguen
    let attempts = 0;
    while (!window.documentationFlow && attempts < 10) {
        console.log('Esperando window.documentationFlow...', attempts);
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    
    if (!window.documentationFlow) {
        console.error('❌ window.documentationFlow no está disponible');
        const projectsList = document.getElementById('projects-list');
        if (projectsList) {
            projectsList.innerHTML = `
                <div class="project-card" style="background: #fff3cd; border-color: #ffc107;">
                    <h3 style="color: #856404; margin-top: 0;">⚠️ Error cargando dependencias</h3>
                    <p>Los scripts necesarios no se cargaron correctamente.</p>
                    <p style="color: #666; font-size: 0.9em;">Recarga la página (Ctrl+R)</p>
                </div>
            `;
        }
        return;
    }
    
    console.log('✅ Cargando proyectos y biblioteca...');
    await loadProjects();
    await loadPromptsLibrary();
    console.log('✅ Panel de proyectos inicializado');
});

// ============================================
// FUNCIONES DE ANÁLISIS Y MODALES
// ============================================

function switchAnalysisTab(tabName) {
    // Ocultar todas las pestañas del modal
    document.querySelectorAll('.analysis-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Desactivar todos los botones
    document.getElementById('tab-btn-config').classList.remove('active');
    document.getElementById('tab-btn-prompt').classList.remove('active');
    
    // Activar pestaña seleccionada
    if (tabName === 'config') {
        document.getElementById('analysis-tab-config').style.display = 'block';
        document.getElementById('tab-btn-config').classList.add('active');
    } else {
        document.getElementById('analysis-tab-prompt').style.display = 'block';
        document.getElementById('tab-btn-prompt').classList.add('active');
        updateAnalysisPrompt();
    }
}

// ============================================
// GESTIÓN DE PROMPTS
// ============================================

async function loadPromptsLibrary() {
    const container = document.getElementById('prompts-list');
    
    const promptsData = [
        { type: 'arquitectura', title: '🏗️ Arquitectura de Software', desc: 'Modelo C4, patrones de diseño, ADRs' },
        { type: 'api', title: '🔌 Documentación de API', desc: 'Endpoints, autenticación, modelos de datos' },
        { type: 'deployment', title: '🚀 Deployment y DevOps', desc: 'CI/CD, infraestructura, monitoreo' },
        { type: 'requerimientos', title: '📋 Análisis de Requerimientos', desc: 'Funcionales, no funcionales, casos de uso' },
        { type: 'procesos-negocio', title: '💼 Procesos de Negocio', desc: 'Workflows, reglas de negocio, actores' },
        { type: 'tecnica', title: '⚙️ Documentación Técnica', desc: 'Implementación, algoritmos, optimización' },
        { type: 'vista-ejecutiva', title: '👔 Vista Ejecutiva', desc: 'Resumen ejecutivo, ROI, métricas clave' },
        { type: 'adr', title: '📐 ADR', desc: 'Architecture Decision Records' },
        { type: 'swagger', title: '📖 Swagger/OpenAPI', desc: 'Generación de especificaciones OpenAPI' }
    ];
    
    container.innerHTML = promptsData.map(p => `
        <div class="project-card" style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="margin: 0 0 5px 0;">${p.title}</h4>
                    <p style="margin: 0; color: #7f8c8d; font-size: 0.9em;">${p.desc}</p>
                </div>
                <div>
                    <button class="btn btn-small" onclick="viewPrompt('${p.type}')">👁️ Ver</button>
                    <button class="btn btn-success btn-small" onclick="copyPrompt('${p.type}')">📋 Copiar</button>
                </div>
            </div>
        </div>
    `).join('');
}

async function viewPrompt(type) {
    try {
        const response = await fetch(ANALYSIS_PROMPTS[type]);
        const content = await response.text();
        
        showPromptModal(type, content);
    } catch (error) {
        alert('❌ Error cargando prompt: ' + error.message);
    }
}

async function copyPrompt(type) {
    try {
        const response = await fetch(ANALYSIS_PROMPTS[type]);
        const content = await response.text();
        
        await navigator.clipboard.writeText(content);
        alert('✅ Prompt copiado al portapapeles');
    } catch (error) {
        alert('❌ Error copiando prompt: ' + error.message);
    }
}

function showPromptModal(type, content) {
    const modal = document.createElement('div');
    // Escapar contenido para evitar problemas con comillas y backticks
    const escapedContent = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    const htmlContent = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10001; display: flex; align-items: center; justify-content: center; padding: 20px;" onclick="this.remove()">
            <div style="background: white; border-radius: 16px; max-width: 1000px; width: 100%; max-height: 90vh; overflow: hidden;" onclick="event.stopPropagation()">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px;">
                    <h2 style="margin: 0;">📝 Prompt: ${type}</h2>
                </div>
                <div style="padding: 30px; overflow-y: auto; max-height: calc(90vh - 180px);">
                    <div class="code-block">
                        <button class="copy-btn" id="modal-copy-btn-${Date.now()}">📋 Copiar</button>
                        <pre style="margin: 0; white-space: pre-wrap;" id="modal-content-${Date.now()}">${htmlContent}</pre>
                    </div>
                </div>
                <div style="padding: 20px 30px; background: #f8f9fa; border-top: 1px solid #e0e0e0; text-align: right;">
                    <button class="btn btn-secondary" onclick="this.closest('[style*=fixed]').remove()">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Agregar event listener para copiar (usando closure para capturar content original)
    const copyBtn = modal.querySelector('.copy-btn');
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(content);
            copyBtn.textContent = '✅ Copiado';
            setTimeout(() => {
                copyBtn.textContent = '📋 Copiar';
            }, 2000);
        } catch (error) {
            console.error('Error copiando:', error);
            alert('❌ Error al copiar');
        }
    });
}

async function updateAnalysisPrompt() {
    const type = document.getElementById('analysis-type').value;
    currentAnalysisType = type;
    
    try {
        const response = await fetch(ANALYSIS_PROMPTS[type]);
        const content = await response.text();
        document.getElementById('prompt-text').textContent = content;
    } catch (error) {
        document.getElementById('prompt-text').textContent = 'Error cargando prompt: ' + error.message;
    }
}

async function copyPromptToClipboard() {
    const text = document.getElementById('prompt-text').textContent;
    try {
        await navigator.clipboard.writeText(text);
        alert('✅ Prompt copiado al portapapeles. Pégalo en Copilot Chat.');
    } catch (error) {
        alert('❌ Error copiando: ' + error.message);
    }
}

// ============================================
// GESTIÓN DE PROYECTOS
// ============================================


async function loadProjects() {
    const container = document.getElementById('projects-list');
    
    try {
        const projects = await window.documentationFlow.listProjects();
        
        if (projects.length === 0) {
            container.innerHTML = `
                <div class="project-card" style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 4em; margin-bottom: 20px;">📁</div>
                    <h3>No hay proyectos aún</h3>
                    <p style="color: #7f8c8d;">Crea tu primer proyecto para comenzar</p>
                    <button class="btn btn-success" onclick="switchTab('create-project')" style="margin-top: 20px;">
                        ➕ Crear Primer Proyecto
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = projects.map(project => `
            <div class="project-card">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 10px 0;">📁 ${project.name}</h3>
                        <p style="margin: 0; color: #555;">${project.description || '<em style="color: #95a5a6;">Sin descripción</em>'}</p>
                    </div>
                    <div>
                        ${getStatusBadge(project.status)}
                    </div>
                </div>
                
                <div class="project-meta">
                    <strong>👤 Creado por:</strong> ${project.created_by} | 
                    <strong>📅 Fecha:</strong> ${formatDate(project.created_at)}
                </div>
                
                <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn btn-success" onclick="openAnalysisModal('${project.id}')">
                        ➕ Nueva Sesión
                    </button>
                    <button class="btn" onclick="viewProjectAnalysis('${project.id}')">
                        📊 Ver Sesiones (${project.analyses_count || 0})
                    </button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error cargando proyectos:', error);
        container.innerHTML = `
            <div class="project-card" style="background: #fff3cd; border-color: #ffc107;">
                <h3 style="color: #856404; margin-top: 0;">⚠️ No se pudieron cargar los proyectos</h3>
                <p>Verifica que el backend esté corriendo en: <code>http://localhost:8000</code></p>
                <p style="color: #666; font-size: 0.9em;"><strong>Error:</strong> ${error.message}</p>
                <button class="btn" onclick="loadProjects()">🔄 Reintentar</button>
            </div>
        `;
    }
}

async function createNewProject() {
    const name = document.getElementById('project-name').value.trim();
    const description = document.getElementById('project-description').value.trim();
    const created_by = document.getElementById('project-created-by').value.trim();
    
    if (!name) {
        alert('❌ El nombre del proyecto es obligatorio');
        return;
    }
    
    try {
        const project = await window.documentationFlow.createProject({
            name: name,
            description: description,
            created_by: created_by || 'user@example.com',
            metadata: {}
        });
        
        // Limpiar formulario
        document.getElementById('project-name').value = '';
        document.getElementById('project-description').value = '';
        document.getElementById('project-created-by').value = '';
        
        alert('✅ Proyecto creado exitosamente!');
        
        // Volver a la pestaña de proyectos
        switchTab('projects');
        await loadProjects();
        
    } catch (error) {
        alert('❌ Error creando proyecto: ' + error.message);
    }
}

function openAnalysisModal(projectId) {
    console.log('Opening modal for project:', projectId);
    currentProjectForAnalysis = projectId;
    const modal = document.getElementById('analysis-modal');
    modal.style.display = 'flex';
    
    // Resetear a la pestaña de configuración
    switchAnalysisTab('config');
    
    // Cargar el prompt actual
    updateAnalysisPrompt();
}

function closeAnalysisModal() {
    console.log('Closing modal');
    currentProjectForAnalysis = null;
    const modal = document.getElementById('analysis-modal');
    modal.style.display = 'none';
}

async function submitAnalysis() {
    const type = document.getElementById('analysis-type').value;
    const yamlText = document.getElementById('analysis-yaml').value.trim();
    const created_by = document.getElementById('analysis-created-by').value.trim();
    const assigned_to = document.getElementById('analysis-assigned-to').value.trim();
    
    if (!currentProjectForAnalysis) {
        alert('❌ Error: No se ha seleccionado un proyecto');
        closeAnalysisModal();
        return;
    }
    
    if (!yamlText) {
        alert('❌ La configuración YAML es obligatoria');
        return;
    }
    
    try {
        // Parsear YAML
        const yamlConfig = jsyaml.load(yamlText);
        
        const analysis = await window.documentationFlow.createAnalysis(
            currentProjectForAnalysis,
            type,
            yamlConfig,
            created_by || 'analista@example.com',
            assigned_to || null
        );
        
        closeAnalysisModal();
        
        // Mostrar URL para compartir
        window.showShareURLModal(analysis.share_url);
        
        // Limpiar formulario
        document.getElementById('analysis-yaml').value = '';
        document.getElementById('analysis-created-by').value = '';
        document.getElementById('analysis-assigned-to').value = '';
        
    } catch (error) {
        alert('❌ Error creando análisis: ' + error.message);
    }
}

async function viewProjectAnalysis(projectId) {
    const container = document.getElementById('projects-list');
    
    try {
        // Obtener proyecto y sus sesiones de análisis
        const project = await window.apiClient.get(window.API_CONFIG.endpoints.project(projectId));
        let analyses = await window.apiClient.get(window.API_CONFIG.endpoints.projectAnalyses(projectId));
        
        // Ordenar: sesiones respondidas primero
        analyses.sort((a, b) => {
            const aHasAnswers = a.answers && Object.keys(a.answers).length > 0;
            const bHasAnswers = b.answers && Object.keys(b.answers).length > 0;
            if (aHasAnswers && !bHasAnswers) return -1;
            if (!aHasAnswers && bHasAnswers) return 1;
            // Si ambos tienen el mismo estado, ordenar por fecha descendente
            return new Date(b.created_at) - new Date(a.created_at);
        });
        
        container.innerHTML = `
            <div style="margin-bottom: 20px;">
                <button class="btn" onclick="loadProjects()">⬅️ Volver a Proyectos</button>
            </div>
            
            <div class="project-card">
                <h2>📁 ${project.name}</h2>
                <p>${project.description || '<em>Sin descripción</em>'}</p>
                <div class="project-meta">
                    <strong>Estado:</strong> ${getStatusBadge(project.status)} |
                    <strong>Creado:</strong> ${formatDate(project.created_at)}
                </div>
                
                <!-- Botones de acción del proyecto -->
                <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap; padding-top: 15px; border-top: 2px solid #e0e0e0;">
                    <button class="btn btn-success" onclick="window.location.href='/admin/massive-response/?project_id=${project.id}'">
                        ✍️ Respuesta Masiva
                    </button>
                    <button class="btn" onclick="exportProjectAnswers('${project.id}')">
                        📦 Exportar Todo el Proyecto
                    </button>
                </div>
            </div>
            
            <h3>📊 Sesiones de Análisis</h3>
            <div id="analysis-sessions-list">
                ${analyses.length === 0 
                    ? '<p style="color: #7f8c8d;">No hay sesiones de análisis aún.</p>'
                    : renderAnalysisSessions(analyses)
                }
            </div>
        `;
        
    } catch (error) {
        console.error('Error cargando análisis:', error);
        alert('❌ Error: ' + error.message);
    }
}

function renderAnalysisSessions(analyses) {
    return analyses.map(analysis => {
        const hasAnswers = analysis.answers && Object.keys(analysis.answers).length > 0;
        
        // Detectar si está incompleta (comparar respuestas con preguntas del YAML)
        let isIncomplete = false;
        let completionStats = '';
        if (hasAnswers && analysis.yaml_config && analysis.yaml_config.questions) {
            const totalQuestions = analysis.yaml_config.questions.length;
            const answeredQuestions = Object.keys(analysis.answers).length;
            isIncomplete = answeredQuestions < totalQuestions;
            if (isIncomplete) {
                completionStats = ` (${answeredQuestions}/${totalQuestions} respondidas)`;
            }
        }
        
        const statusColor = hasAnswers ? (isIncomplete ? '#f39c12' : '#27ae60') : '#95a5a6';
        const statusIcon = hasAnswers ? (isIncomplete ? '⚠️' : '✅') : '⏳';
        const statusText = hasAnswers ? (isIncomplete ? 'Incompleta' : 'Completa') : 'Pendiente';
        
        return `
            <div class="project-card" style="border-left: 5px solid ${statusColor};">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <div style="flex: 1;">
                        <span class="analysis-type-badge">${analysis.analysis_type}</span>
                        <span class="status-badge ${hasAnswers ? (isIncomplete ? 'incomplete' : 'answered') : 'pending'}">
                            ${statusIcon} ${statusText}${completionStats}
                        </span>
                        <h4 style="margin: 10px 0 5px 0;">Iteración ${analysis.iteration}</h4>
                    </div>
                </div>
                
                <div class="project-meta">
                    <strong>📅 Creado:</strong> ${formatDate(analysis.created_at)}<br>
                    ${analysis.updated_at && analysis.updated_at !== analysis.created_at ? 
                        `<strong>🔄 Actualizado:</strong> ${formatDate(analysis.updated_at)}<br>` : ''}
                    <strong>🎫 Token:</strong> <code style="background: #f8f9fa; padding: 2px 6px; border-radius: 4px;">${analysis.share_token}</code>
                </div>
                
                ${hasAnswers ? `
                    <div style="margin-top: 20px; background: ${isIncomplete ? '#fff3cd' : '#d4edda'}; padding: 15px; border-radius: 8px; border-left: 4px solid ${isIncomplete ? '#f39c12' : '#27ae60'};">
                        <strong style="color: ${isIncomplete ? '#856404' : '#155724'};">
                            ${isIncomplete ? '⚠️ El experto respondió parcialmente' : '✅ El experto respondió las preguntas'}
                        </strong>
                        <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn btn-success" onclick="viewAnswersInModal('${analysis.share_token}')">
                                👁️ Ver Respuestas
                            </button>
                            <button class="btn" onclick="copyAnswersFormatted('${analysis.share_token}')">
                                📋 Copiar Respuestas
                            </button>
                            <button class="btn" onclick="createNewIteration('${analysis.id}')">
                                🔄 Nueva Iteración
                            </button>
                            <button class="btn" onclick="copyOutputPrompt('${analysis.analysis_type}')">
                                📄 Copiar Prompt de Salida
                            </button>
                            <button class="btn" onclick="window.open('${analysis.share_url}', '_blank')">
                                📝 Abrir Formulario
                            </button>
                            <button class="btn" onclick="continueDocumentation('${analysis.id}')">
                                ▶️ Continuar Documentación
                            </button>
                        </div>
                        
                        <!-- URL para compartir/modificar -->
                        <details style="margin-top: 15px;">
                            <summary style="cursor: pointer; color: ${isIncomplete ? '#856404' : '#155724'}; font-weight: 600;">🔗 URL del Formulario</summary>
                            <div style="display: flex; gap: 10px; margin-top: 10px;">
                                <input type="text" readonly value="${analysis.share_url || 'Generando...'}" 
                                       style="flex: 1; padding: 10px; border: 2px solid ${isIncomplete ? '#f39c12' : '#27ae60'}; border-radius: 8px; background: white; font-family: monospace; font-size: 0.9em;">
                                <button class="btn btn-success btn-small" onclick="copyShareURL('${analysis.share_url}')">
                                    📋 Copiar
                                </button>
                            </div>
                            <p style="margin: 10px 0 0 0; color: #666; font-size: 0.85em;">
                                💡 Usa esta URL para que otros expertos revisen o modifiquen las respuestas
                            </p>
                        </details>
                    </div>
                ` : `
                    <div style="margin-top: 20px; background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <strong style="color: #856404;">📤 Compartir con experto</strong>
                        <p style="margin: 10px 0 5px 0; color: #666; font-size: 0.9em;">
                            Copia esta URL y envíala al experto que responderá las preguntas:
                        </p>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <input type="text" readonly value="${analysis.share_url || 'Generando...'}" 
                                   style="flex: 1; padding: 10px; border: 2px solid #ffc107; border-radius: 8px; background: white; font-family: monospace; font-size: 0.9em;">
                            <button class="btn btn-success" onclick="copyShareURL('${analysis.share_url}')">
                                📋 Copiar
                            </button>
                        </div>
                    </div>
                `}
            </div>
        `;
    }).join('');
}

async function copyOutputPrompt(analysisType) {
    try {
        // Mapeo de tipos de análisis a rutas de prompts de salida
        const promptPaths = {
            'requerimientos': '/prompts/requerimientos/02-salida',
            'arquitectura': '/prompts/arquitectura/02-salida',
            'tecnica': '/prompts/tecnica/02-salida',
            'deployment': '/prompts/deployment/02-salida',
            'api': '/prompts/api/02-salida',
            'procesos-negocio': '/prompts/procesos-negocio/02-salida',
            'vista-ejecutiva': '/prompts/vista-ejecutiva/02-salida',
            'adr': '/prompts/adr/02-salida',
            'swagger': '/prompts/swagger/02-salida'
        };
        
        const promptPath = promptPaths[analysisType];
        if (!promptPath) {
            alert('❌ No se encontró el prompt de salida para este tipo de análisis');
            return;
        }
        
        // Fetch del contenido del prompt
        const response = await fetch(promptPath);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const promptContent = await response.text();
        
        // Copiar al portapapeles
        await navigator.clipboard.writeText(promptContent);
        alert('✅ Prompt de salida copiado al portapapeles');
        
    } catch (error) {
        console.error('Error copiando prompt de salida:', error);
        alert('❌ Error al copiar el prompt de salida: ' + error.message);
    }
}

function copyShareURL(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('✅ URL copiada al portapapeles. Envíala al experto.');
    }).catch(err => {
        console.error('Error copiando:', err);
        alert('❌ Error al copiar');
    });
}

async function viewAnswersInModal(token) {
    try {
        const analysis = await window.apiClient.get(window.API_CONFIG.endpoints.getPublicAnalysis(token));
        
        // Debug: Ver qué trae el backend
        console.log('📊 Analysis completo:', analysis);
        console.log('📚 Iteration history:', analysis.iteration_history);
        
        // Crear modal para mostrar respuestas
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10001; display: flex; align-items: center; justify-content: center; padding: 20px;" onclick="this.remove()">
                <div style="background: white; border-radius: 16px; max-width: 1200px; width: 100%; max-height: 90vh; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);" onclick="event.stopPropagation()">
                    
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #27ae60 0%, #229954 100%); color: white; padding: 25px;">
                        <h2 style="margin: 0; font-size: 1.5em;">📋 Respuestas del Experto</h2>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">
                            <span class="analysis-type-badge" style="background: rgba(255,255,255,0.2);">
                                ${analysis.analysis_type}
                            </span>
                            Iteración Actual: ${analysis.iteration} ${analysis.iteration_history?.length > 0 ? `| Total Iteraciones: ${analysis.iteration_history.length + 1}` : ''}
                        </p>
                    </div>
                    
                    <!-- Pestañas de Iteraciones -->
                    ${analysis.iteration_history && analysis.iteration_history.length > 0 ? `
                        <div style="padding: 20px 30px; background: #f8f9fa; border-bottom: 2px solid #e0e0e0; overflow-x: auto;">
                            <div style="display: flex; gap: 10px; min-width: max-content;">
                                ${analysis.iteration_history.map((iter, idx) => `
                                    <button class="iteration-tab-btn" data-iteration="${iter.iteration}" 
                                            style="background: white; border: 2px solid #e0e0e0; padding: 10px 20px; border-radius: 8px; cursor: pointer; transition: all 0.3s; white-space: nowrap;"
                                            onclick="switchIterationView(${iter.iteration}, '${token}')">
                                        🔄 Iteración ${iter.iteration}
                                        ${iter.answers_provided ? '<span style="color: #27ae60;">✓</span>' : '<span style="color: #95a5a6;">○</span>'}
                                    </button>
                                `).join('')}
                                <button class="iteration-tab-btn active" data-iteration="${analysis.iteration}" 
                                        style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; white-space: nowrap;"
                                        onclick="switchIterationView(${analysis.iteration}, '${token}')">
                                    🔄 Iteración ${analysis.iteration} (Actual)
                                </button>
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Contenido -->
                    <div style="padding: 30px; overflow-y: auto; max-height: calc(90vh - ${analysis.iteration_history?.length > 0 ? '320' : '200'}px);" id="iteration-content-${token}">
                        
                        <!-- Metadata -->
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                                <div>
                                    <strong style="color: #7f8c8d; font-size: 0.85em;">📅 FECHA RESPUESTA</strong>
                                    <div style="margin-top: 5px; color: #2c3e50;">${formatDate(analysis.updated_at)}</div>
                                </div>
                                <div>
                                    <strong style="color: #7f8c8d; font-size: 0.85em;">👤 ANALISTA</strong>
                                    <div style="margin-top: 5px; color: #2c3e50;">${analysis.created_by || 'N/A'}</div>
                                </div>
                                <div>
                                    <strong style="color: #7f8c8d; font-size: 0.85em;">🎯 TOTAL RESPUESTAS</strong>
                                    <div style="margin-top: 5px; color: #2c3e50; font-size: 1.5em; font-weight: bold;">
                                        ${Object.keys(analysis.answers || {}).length}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Respuestas -->
                        <h3 style="margin: 0 0 20px 0; color: #2c3e50;">📝 Respuestas de Iteración ${analysis.iteration}</h3>
                        ${renderAnswersContent(analysis.answers, analysis.yaml_config)}
                    </div>
                    
                    <!-- Footer -->
                    <div style="padding: 20px 30px; background: #f8f9fa; border-top: 1px solid #e0e0e0; display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
                        <button class="btn btn-success" onclick="copyAnswersJSON('${token}')">
                            📋 Copiar JSON
                        </button>
                        <button class="btn" onclick="copyAnswersFormatted('${token}')">
                            📝 Copiar Formateado
                        </button>
                        <button class="btn btn-secondary" onclick="this.closest('[style*=fixed]').remove()">
                            ✕ Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Guardar datos del análisis en el modal para cambio de iteraciones
        // Buscar el div interno que tiene el onclick
        const modalWrapper = modal.querySelector('[onclick*="this.remove()"]');
        if (modalWrapper) {
            modalWrapper.dataset.analysisData = JSON.stringify(analysis);
        }
        
    } catch (error) {
        console.error('Error cargando respuestas:', error);
        alert('❌ Error: ' + error.message);
    }
}

// Cambiar vista entre iteraciones
async function switchIterationView(iterationNumber, token) {
    const modalWrapper = document.querySelector(`[onclick*="this.remove()"]`);
    if (!modalWrapper || !modalWrapper.dataset.analysisData) {
        console.error('⚠️ No se encontró el modal o los datos de análisis');
        return;
    }
    
    const analysis = JSON.parse(modalWrapper.dataset.analysisData);
    const contentDiv = document.getElementById(`iteration-content-${token}`);
    
    // Actualizar botones activos
    modalWrapper.querySelectorAll('.iteration-tab-btn').forEach(btn => {
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
    
    // Encontrar datos de la iteración
    let iterationData, iterationYaml, iterationAnswers;
    
    if (iterationNumber === analysis.iteration) {
        // Iteración actual
        iterationYaml = analysis.yaml_config;
        iterationAnswers = analysis.answers;
        iterationData = {
            updated_at: analysis.updated_at,
            created_by: analysis.created_by
        };
    } else {
        // Iteración del historial
        const historyItem = analysis.iteration_history.find(h => h.iteration === iterationNumber);
        if (historyItem) {
            console.log('📜 History item encontrado:', historyItem);
            // Los campos son diccionarios directos
            iterationYaml = historyItem.yaml_generated || {};
            iterationAnswers = historyItem.answers_provided || {};
            iterationData = {
                updated_at: historyItem.timestamp || analysis.created_at,
                created_by: analysis.created_by
            };
        } else {
            console.warn(`⚠️ No se encontró iteración ${iterationNumber} en historial`);
        }
    }
    
    // Renderizar contenido de la iteración
    contentDiv.innerHTML = `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                <div>
                    <strong style="color: #7f8c8d; font-size: 0.85em;">📅 FECHA RESPUESTA</strong>
                    <div style="margin-top: 5px; color: #2c3e50;">${formatDate(iterationData.updated_at)}</div>
                </div>
                <div>
                    <strong style="color: #7f8c8d; font-size: 0.85em;">👤 ANALISTA</strong>
                    <div style="margin-top: 5px; color: #2c3e50;">${iterationData.created_by || 'N/A'}</div>
                </div>
                <div>
                    <strong style="color: #7f8c8d; font-size: 0.85em;">🎯 TOTAL RESPUESTAS</strong>
                    <div style="margin-top: 5px; color: #2c3e50; font-size: 1.5em; font-weight: bold;">
                        ${Object.keys(iterationAnswers || {}).length}
                    </div>
                </div>
            </div>
        </div>
        
        <h3 style="margin: 0 0 20px 0; color: #2c3e50;">
            📝 Respuestas de Iteración ${iterationNumber}
            ${iterationNumber < analysis.iteration ? '<span style="color: #7f8c8d; font-size: 0.8em; font-weight: normal;">(Histórica)</span>' : '<span style="color: #27ae60; font-size: 0.8em; font-weight: normal;">(Actual)</span>'}
        </h3>
        ${renderAnswersContent(iterationAnswers, iterationYaml)}
    `;
}

async function viewAnswers(token) {
    await viewAnswersInModal(token);
}

function renderAnswersContent(answers, yamlConfig) {
    if (!answers || Object.keys(answers).length === 0) {
        return `
            <div style="text-align: center; padding: 40px; color: #95a5a6;">
                <div style="font-size: 3em; margin-bottom: 15px;">📭</div>
                <p>No hay respuestas aún</p>
            </div>
        `;
    }
    
    let html = '';
    let questionNumber = 1;
    
    // Agrupar respuestas por sección si hay yaml_config
    if (yamlConfig && yamlConfig.sections) {
        yamlConfig.sections.forEach(section => {
            html += `
                <div style="margin-bottom: 30px;">
                    <h4 style="margin: 0 0 15px 0; padding: 10px 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;">
                        ${section.icon || '📌'} ${section.title}
                    </h4>
            `;
            
            section.questions.forEach(q => {
                const value = answers[q.id];
                if (value !== undefined) {
                    const displayValue = Array.isArray(value) ? 
                        `<ul style="margin: 10px 0; padding-left: 20px;">${value.map(v => `<li>${v}</li>`).join('')}</ul>` :
                        `<p style="margin: 10px 0; color: #2c3e50;">${value || '<em style="color: #95a5a6;">Sin respuesta</em>'}</p>`;
                    
                    html += `
                        <div style="margin-bottom: 20px; padding: 20px; background: white; border: 2px solid #e0e0e0; border-radius: 10px; transition: all 0.3s;">
                            <div style="display: flex; align-items: start; gap: 15px;">
                                <div style="background: #3498db; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">
                                    ${questionNumber++}
                                </div>
                                <div style="flex: 1;">
                                    <strong style="color: #2c3e50; font-size: 1.05em;">${q.label}</strong>
                                    ${q.help ? `<p style="margin: 5px 0; color: #7f8c8d; font-size: 0.9em;">${q.help}</p>` : ''}
                                    <div style="margin-top: 10px;">
                                        ${displayValue}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        });
    } else {
        // Sin yaml_config, mostrar todas las respuestas
        for (const [key, value] of Object.entries(answers)) {
            const displayValue = Array.isArray(value) ? value.join(', ') : value;
            
            html += `
                <div style="margin-bottom: 15px; padding: 20px; background: white; border: 2px solid #e0e0e0; border-radius: 10px;">
                    <strong style="color: #2c3e50; font-size: 1.05em;">${key}:</strong>
                    <div style="margin-top: 10px; color: #34495e;">
                        ${displayValue || '<em style="color: #95a5a6;">Sin respuesta</em>'}
                    </div>
                </div>
            `;
        }
    }
    
    return html;
}

async function copyAnswersJSON(token) {
    try {
        const analysis = await window.apiClient.get(window.API_CONFIG.endpoints.getPublicAnalysis(token));
        const text = JSON.stringify(analysis.answers, null, 2);
        await navigator.clipboard.writeText(text);
        alert('✅ Respuestas copiadas en formato JSON');
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

async function copyAnswersFormatted(token) {
    try {
        const analysis = await window.apiClient.get(window.API_CONFIG.endpoints.getPublicAnalysis(token));
        const config = analysis.yaml_config;
        
        let text = `RESPUESTAS - ${analysis.analysis_type.toUpperCase()}\n`;
        text += `Iteración: ${analysis.iteration}\n`;
        text += `Fecha: ${formatDate(analysis.updated_at)}\n`;
        text += '='.repeat(80) + '\n\n';
        
        // Crear un mapa de preguntas por ID (buscar en todas las secciones)
        const questionsMap = {};
        if (config.sections) {
            config.sections.forEach(section => {
                if (section.questions) {
                    section.questions.forEach(q => {
                        questionsMap[q.id] = q;
                    });
                }
            });
        } else if (config.questions) {
            // Fallback por si el YAML no tiene secciones
            config.questions.forEach(q => {
                questionsMap[q.id] = q;
            });
        }
        
        // Formatear respuestas con pregunta incluida
        for (const [questionId, answer] of Object.entries(analysis.answers || {})) {
            const question = questionsMap[questionId];
            
            // Título de la pregunta
            text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            
            if (question) {
                text += `📌 PREGUNTA [${questionId}]:\n`;
                // Usar label si existe, sino question, sino el id
                const questionText = question.label || question.question || questionId;
                text += `${questionText}\n`;
                if (question.help) {
                    text += `💡 Ayuda: ${question.help}\n`;
                }
            } else {
                text += `📌 PREGUNTA [${questionId}]:\n`;
                text += `(Pregunta no encontrada en configuración)\n`;
            }
            
            text += `\n`;
            
            // Respuesta
            text += `✅ RESPUESTA:\n`;
            if (Array.isArray(answer)) {
                answer.forEach(item => {
                    if (typeof item === 'object') {
                        // Si es un objeto, mostrarlo formateado
                        text += `  • ${JSON.stringify(item, null, 2).split('\n').join('\n    ')}\n`;
                    } else {
                        text += `  • ${item}\n`;
                    }
                });
            } else if (typeof answer === 'object') {
                text += `${JSON.stringify(answer, null, 2)}\n`;
            } else {
                text += `${answer}\n`;
            }
            text += '\n';
        }
        
        text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
        text += '🤖 INSTRUCCIONES PARA COPILOT:\n';
        text += 'Si necesitas más información, genera un nuevo YAML con las preguntas adicionales.\n';
        text += 'Si ya tienes toda la información necesaria, responde: "continuemos al siguiente paso"\n';
        
        await navigator.clipboard.writeText(text);
        alert('✅ Respuestas copiadas en formato de texto con preguntas incluidas');
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

async function copyAnswersToClipboard(token) {
    await copyAnswersJSON(token);
}

async function continueDocumentation(analysisId) {
    // Guardar el ID de la sesión en localStorage para usarlo en el generador
    localStorage.setItem('currentAnalysisId', analysisId);
    window.location.href = '/prompts/generador/';
}

function getStatusBadge(status) {
    const badges = {
        'active': '<span class="status-badge" style="background: #d4edda; color: #155724;">✅ Activo</span>',
        'completed': '<span class="status-badge" style="background: #cce5ff; color: #004085;">🎯 Completado</span>',
        'archived': '<span class="status-badge" style="background: #e2e3e5; color: #383d41;">📦 Archivado</span>'
    };
    return badges[status] || badges['active'];
}

function getAnalysisTypeEmoji(type) {
    const emojis = {
        'arquitectura': '🏗️',
        'api': '🔌',
        'deployment': '🚀',
        'requerimientos': '📋',
        'procesos-negocio': '💼',
        'tecnica': '⚙️',
        'vista-ejecutiva': '👔',
        'adr': '📐',
        'swagger': '📖'
    };
    return emojis[type] || '📄';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ============================================
// RESPUESTA MASIVA Y EXPORTACIÓN
// ============================================

// Exportar todas las respuestas del proyecto
async function exportProjectAnswers(projectId) {
    try {
        const project = await window.apiClient.get(window.API_CONFIG.endpoints.project(projectId));
        const analyses = await window.apiClient.get(window.API_CONFIG.endpoints.projectAnalyses(projectId));
        
        if (analyses.length === 0) {
            alert('❌ No hay sesiones de análisis en este proyecto');
            return;
        }
        
        let exportText = `EXPORTACIÓN COMPLETA DEL PROYECTO\n`;
        exportText += `${'='.repeat(80)}\n`;
        exportText += `📁 Proyecto: ${project.name}\n`;
        exportText += `📅 Fecha de exportación: ${new Date().toLocaleString('es-ES')}\n`;
        exportText += `📊 Total de sesiones: ${analyses.length}\n`;
        exportText += `${'='.repeat(80)}\n\n`;
        
        // Obtener datos completos de cada análisis
        for (const analysis of analyses) {
            try {
                const fullAnalysis = await window.apiClient.get(window.API_CONFIG.endpoints.getPublicAnalysis(analysis.share_token));
                
                exportText += `\n${'━'.repeat(80)}\n`;
                exportText += `📋 SESIÓN: ${fullAnalysis.yaml_config?.title || fullAnalysis.analysis_type}\n`;
                exportText += `🏷️ Tipo: ${fullAnalysis.analysis_type}\n`;
                exportText += `🔄 Iteración Actual: ${fullAnalysis.iteration}\n`;
                exportText += `📅 Creado: ${formatDate(fullAnalysis.created_at)}\n`;
                exportText += `🔄 Actualizado: ${formatDate(fullAnalysis.updated_at)}\n`;
                exportText += `${'━'.repeat(80)}\n\n`;
                
                // Exportar iteraciones históricas
                if (fullAnalysis.iteration_history && fullAnalysis.iteration_history.length > 0) {
                    exportText += `📚 ITERACIONES HISTÓRICAS:\n\n`;
                    
                    fullAnalysis.iteration_history.forEach(histItem => {
                        exportText += `  ┌─ 🔄 Iteración ${histItem.iteration} ─────────────────\n`;
                        exportText += `  │ 📅 ${new Date(histItem.timestamp).toLocaleString('es-ES')}\n`;
                        exportText += `  └─────────────────────────────────────\n\n`;
                        
                        const yamlConfig = histItem.yaml_generated || {};
                        const answers = histItem.answers_provided || {};
                        
                        exportText += formatAnswersForExport(answers, yamlConfig, `    `);
                        exportText += `\n`;
                    });
                }
                
                // Exportar iteración actual
                exportText += `📝 ITERACIÓN ACTUAL (${fullAnalysis.iteration}):\n\n`;
                exportText += formatAnswersForExport(fullAnalysis.answers, fullAnalysis.yaml_config, `  `);
                exportText += `\n\n`;
                
            } catch (error) {
                console.error('Error exportando análisis:', error);
                exportText += `⚠️ Error exportando esta sesión: ${error.message}\n\n`;
            }
        }
        
        exportText += `${'='.repeat(80)}\n`;
        exportText += `FIN DE LA EXPORTACIÓN\n`;
        
        // Mostrar modal de confirmación con preview
        showExportPreview(exportText, project.name);
        
    } catch (error) {
        console.error('Error exportando proyecto:', error);
        alert('❌ Error: ' + error.message);
    }
}

// Formatear respuestas para exportación
function formatAnswersForExport(answers, yamlConfig, indent = '') {
    if (!answers || Object.keys(answers).length === 0) {
        return `${indent}(Sin respuestas)\n`;
    }
    
    let text = '';
    
    // Crear mapa de preguntas
    const questionsMap = {};
    if (yamlConfig?.sections) {
        yamlConfig.sections.forEach(section => {
            if (section.questions) {
                section.questions.forEach(q => {
                    questionsMap[q.id] = { ...q, sectionTitle: section.title, sectionIcon: section.icon };
                });
            }
        });
    }
    
    // Formatear por sección si existe
    if (yamlConfig?.sections) {
        yamlConfig.sections.forEach(section => {
            const sectionHasAnswers = section.questions?.some(q => answers[q.id] !== undefined);
            if (sectionHasAnswers) {
                text += `${indent}${section.icon || '📌'} ${section.title}\n`;
                text += `${indent}${'-'.repeat(40)}\n`;
                
                section.questions.forEach(q => {
                    const answer = answers[q.id];
                    if (answer !== undefined) {
                        text += `${indent}  ❓ ${q.label || q.question || q.id}\n`;
                        if (Array.isArray(answer)) {
                            answer.forEach(item => {
                                text += `${indent}     • ${item}\n`;
                            });
                        } else {
                            text += `${indent}     ✅ ${answer}\n`;
                        }
                        text += `\n`;
                    }
                });
            }
        });
    } else {
        // Sin secciones, listar todas las respuestas
        for (const [key, value] of Object.entries(answers)) {
            text += `${indent}❓ ${key}:\n`;
            if (Array.isArray(value)) {
                value.forEach(item => {
                    text += `${indent}   • ${item}\n`;
                });
            } else {
                text += `${indent}   ✅ ${value}\n`;
            }
            text += `\n`;
        }
    }
    
    return text;
}

// Mostrar preview de exportación
function showExportPreview(content, projectName) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10002; display: flex; align-items: center; justify-content: center; padding: 20px;" onclick="this.remove()">
            <div style="background: white; border-radius: 16px; max-width: 1200px; width: 100%; max-height: 90vh; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);" onclick="event.stopPropagation()">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #27ae60 0%, #229954 100%); color: white; padding: 25px;">
                    <h2 style="margin: 0; font-size: 1.5em;">📦 Exportación Completa del Proyecto</h2>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Proyecto: ${projectName}</p>
                </div>
                
                <!-- Contenido -->
                <div style="padding: 30px; overflow-y: auto; max-height: calc(90vh - 200px);">
                    <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #27ae60;">
                        <p style="margin: 0; color: #155724;">
                            <strong>✅ Exportación generada correctamente</strong><br>
                            <span style="font-size: 0.9em;">Haz clic en el botón de abajo para copiar al portapapeles</span>
                        </p>
                    </div>
                    
                    <h3 style="margin: 0 0 15px 0;">📄 Preview del contenido exportado:</h3>
                    <div style="background: #2c3e50; color: #ecf0f1; padding: 20px; border-radius: 8px; max-height: 400px; overflow-y: auto; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre-wrap;">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                    
                    <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 6px;">
                        <p style="margin: 0; color: #856404;">💡 <strong>Sugerencia:</strong> Pega este contenido en un documento o directamente en Copilot para generar la documentación final.</p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="padding: 20px 30px; background: #f8f9fa; border-top: 1px solid #e0e0e0; display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn btn-success" onclick="copyExportToClipboard(this)">📋 Copiar al Portapapeles</button>
                    <button class="btn btn-secondary" onclick="this.closest('[style*=fixed]').remove()">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    
    // Guardar el contenido en el modal
    modal.querySelector('[style*="fixed"]').dataset.exportContent = content;
    
    document.body.appendChild(modal);
}

// Copiar al portapapeles desde el modal
async function copyExportToClipboard(button) {
    const modalWrapper = button.closest('[style*="fixed"]');
    const content = modalWrapper.dataset.exportContent;
    
    try {
        await navigator.clipboard.writeText(content);
        
        // Cambiar el botón temporalmente
        const originalHTML = button.innerHTML;
        button.innerHTML = '✅ ¡Copiado!';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('Error copiando al portapapeles:', error);
        alert('❌ Error al copiar al portapapeles. Por favor, selecciona y copia manualmente el texto.');
    }
}

// Nueva Iteración - Con nuevo YAML de Copilot
async function createNewIteration(analysisId) {
    try {
        // Obtener análisis actual
        const analysis = await window.apiClient.get(window.API_CONFIG.endpoints.getAnalysis(analysisId));
        
        // Mostrar modal para pegar el nuevo YAML
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10001; display: flex; align-items: center; justify-content: center; padding: 20px;" id="iteration-modal-${analysisId}">
                <div style="background: white; border-radius: 16px; max-width: 900px; width: 100%; max-height: 90vh; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);" onclick="event.stopPropagation()">
                    
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: white; padding: 25px;">
                        <h2 style="margin: 0; font-size: 1.5em;">🔄 Nueva Iteración de Seguimiento</h2>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">
                            Iteración actual: ${analysis.iteration} → Nueva: ${analysis.iteration + 1}
                        </p>
                    </div>
                    
                    <!-- Contenido -->
                    <div style="padding: 30px; overflow-y: auto; max-height: calc(90vh - 200px);">
                        
                        <!-- Explicación -->
                        <div style="background: #e8f5e9; padding: 20px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #27ae60;">
                            <h3 style="margin: 0 0 10px 0; color: #27ae60;">💡 ¿Qué es una iteración?</h3>
                            <p style="margin: 0; color: #555; line-height: 1.6;">
                                Las iteraciones permiten hacer <strong>preguntas de seguimiento</strong> basadas en las respuestas anteriores.
                                Copilot analiza las respuestas previas y genera un nuevo YAML con preguntas más específicas.
                            </p>
                        </div>
                        
                        <!-- Instrucciones -->
                        <div style="background: #fff3cd; padding: 20px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
                            <h3 style="margin: 0 0 10px 0; color: #856404;">📋 Instrucciones</h3>
                            <ol style="margin: 10px 0; padding-left: 20px; color: #555; line-height: 1.8;">
                                <li>Copia las respuestas de la iteración anterior (ya lo hiciste con "📋 Copiar Respuestas")</li>
                                <li>Pégalas en Copilot con el Prompt de Análisis correspondiente</li>
                                <li>Copilot generará un nuevo YAML con preguntas de seguimiento</li>
                                <li>Pega el nuevo YAML aquí abajo</li>
                            </ol>
                        </div>
                        
                        <!-- Formulario YAML -->
                        <div class="form-group">
                            <label for="iteration-yaml-${analysisId}">
                                <strong>Nuevo YAML de Copilot *</strong>
                                <span style="color: #7f8c8d; font-weight: normal; font-size: 0.9em;">
                                    (Preguntas de seguimiento basadas en las respuestas anteriores)
                                </span>
                            </label>
                            <textarea id="iteration-yaml-${analysisId}" rows="15" 
                                      placeholder="Pega aquí el YAML generado por Copilot con las nuevas preguntas..."
                                      style="font-family: 'Courier New', monospace; font-size: 0.9em; width: 100%; padding: 15px; border: 2px solid #3498db; border-radius: 8px;"
                                      required></textarea>
                        </div>
                        
                        <!-- Vista previa (opcional) -->
                        <details style="margin-top: 20px;">
                            <summary style="cursor: pointer; color: #3498db; font-weight: 600; padding: 10px; background: #f8f9fa; border-radius: 6px;">
                                👁️ Ver respuestas de la iteración anterior
                            </summary>
                            <div style="margin-top: 15px; padding: 20px; background: #f8f9fa; border-radius: 8px; max-height: 300px; overflow-y: auto;">
                                ${renderAnswersContent(analysis.answers, analysis.yaml_config)}
                            </div>
                        </details>
                    </div>
                    
                    <!-- Footer -->
                    <div style="padding: 20px 30px; background: #f8f9fa; border-top: 1px solid #e0e0e0; display: flex; gap: 10px; justify-content: flex-end;">
                        <button class="btn btn-success" onclick="submitNewIteration('${analysisId}')">
                            ✅ Crear Iteración ${analysis.iteration + 1}
                        </button>
                        <button class="btn btn-secondary" onclick="document.getElementById('iteration-modal-${analysisId}').remove()">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
    } catch (error) {
        console.error('Error abriendo modal de iteración:', error);
        alert('❌ Error: ' + error.message);
    }
}

// Enviar nueva iteración con YAML personalizado
async function submitNewIteration(analysisId) {
    const yamlText = document.getElementById(`iteration-yaml-${analysisId}`).value.trim();
    
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
        
        // Obtener análisis actual
        const analysis = await window.apiClient.get(window.API_CONFIG.endpoints.getAnalysis(analysisId));
        
        // Crear nueva iteración con el nuevo YAML
        const newIteration = await window.apiClient.put(
            window.API_CONFIG.endpoints.addIteration(analysisId),
            { 
                needs_more_info: true,
                yaml_config: yamlConfig 
            }
        );
        
        // Cerrar modal de entrada
        document.getElementById(`iteration-modal-${analysisId}`).remove();
        
        // Mostrar modal de éxito
        const successModal = document.createElement('div');
        successModal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10002; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div style="background: white; border-radius: 16px; max-width: 600px; width: 100%; padding: 0; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);" onclick="event.stopPropagation()">
                    <div style="background: linear-gradient(135deg, #27ae60 0%, #229954 100%); color: white; padding: 25px;">
                        <h2 style="margin: 0;">✅ Iteración ${newIteration.current_iteration} Creada</h2>
                    </div>
                    <div style="padding: 30px;">
                        <p style="margin: 0 0 20px 0; color: #555;">
                            Se ha creado la iteración <strong>${newIteration.current_iteration}</strong> con las nuevas preguntas de seguimiento.
                        </p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <strong style="color: #2c3e50;">🔗 URL para compartir con el experto:</strong>
                            <div style="display: flex; gap: 10px; margin-top: 10px;">
                                <input type="text" readonly value="${newIteration.share_url}" 
                                       style="flex: 1; padding: 10px; border: 2px solid #3498db; border-radius: 8px; font-family: monospace; font-size: 0.9em;">
                                <button class="btn btn-success btn-small" onclick="copyShareURL('${newIteration.share_url}')">
                                    📋 Copiar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style="padding: 20px 30px; background: #f8f9fa; border-top: 1px solid #e0e0e0; display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
                        <button class="btn btn-success" onclick="window.open('${newIteration.share_url}', '_blank'); this.remove();">
                            📝 Abrir Formulario
                        </button>
                        <button class="btn" onclick="this.closest('[style*=fixed]').remove(); viewProjectAnalysis('${analysis.project_id}');">
                            🔄 Ver Todas las Sesiones
                        </button>
                        <button class="btn btn-secondary" onclick="this.closest('[style*=fixed]').remove();">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(successModal);
        
    } catch (error) {
        console.error('Error creando iteración:', error);
        alert('❌ Error al crear iteración: ' + error.message);
    }
}

console.log('✅ Panel de Proyectos: Script cargado');
console.log('switchTab:', typeof window.switchTab);
console.log('handleSearch:', typeof window.handleSearch);
console.log('clearSearch:', typeof window.clearSearch);
</script>


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
let currentProjectForAnalysis = null;
let currentAnalysisType = 'arquitectura';

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
    await loadProjects();
    await loadPromptsLibrary();
});

// ============================================
// NAVEGACIÓN POR PESTAÑAS
// ============================================

function switchTab(tabName) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.tabs-container .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activar pestaña seleccionada
    const tabContent = document.getElementById('tab-' + tabName);
    const tabButtons = document.querySelectorAll('.tabs-container .tab-btn');
    
    if (tabContent) {
        tabContent.classList.add('active');
    }
    
    // Activar botón correspondiente
    tabButtons.forEach(btn => {
        if (btn.textContent.includes(tabName === 'projects' ? 'Proyectos' : 
                                       tabName === 'create-project' ? 'Crear Proyecto' : 
                                       'Biblioteca de Prompts')) {
            btn.classList.add('active');
        }
    });
}

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
                            <button class="btn btn-success" onclick="viewAnswersInModal('${analysis.id}')">
                                👁️ Ver Respuestas
                            </button>
                            <button class="btn" onclick="copyAnswersFormatted('${analysis.id}')">
                                📋 Copiar Respuestas
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
            'requerimientos': '/prompts/requerimientos/02-salida.md',
            'arquitectura': '/prompts/arquitectura/02-salida.md',
            'tecnica': '/prompts/tecnica/02-salida.md',
            'deployment': '/prompts/deployment/02-salida.md',
            'api': '/prompts/api/02-salida.md',
            'procesos-negocio': '/prompts/procesos-negocio/02-salida.md',
            'vista-ejecutiva': '/prompts/vista-ejecutiva/02-salida.md',
            'adr': '/prompts/adr/02-salida.md',
            'swagger': '/prompts/swagger/02-salida.md'
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

async function viewAnswersInModal(analysisId) {
    try {
        const analysis = await window.apiClient.get(window.API_CONFIG.endpoints.getAnalysis(analysisId));
        
        // Crear modal para mostrar respuestas
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10001; display: flex; align-items: center; justify-content: center; padding: 20px;" onclick="this.remove()">
                <div style="background: white; border-radius: 16px; max-width: 1000px; width: 100%; max-height: 90vh; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);" onclick="event.stopPropagation()">
                    
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #27ae60 0%, #229954 100%); color: white; padding: 25px;">
                        <h2 style="margin: 0; font-size: 1.5em;">📋 Respuestas del Experto</h2>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">
                            <span class="analysis-type-badge" style="background: rgba(255,255,255,0.2);">
                                ${analysis.analysis_type}
                            </span>
                            Iteración ${analysis.iteration}
                        </p>
                    </div>
                    
                    <!-- Contenido -->
                    <div style="padding: 30px; overflow-y: auto; max-height: calc(90vh - 200px);">
                        
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
                        <h3 style="margin: 0 0 20px 0; color: #2c3e50;">📝 Respuestas Detalladas</h3>
                        ${renderAnswersContent(analysis.answers, analysis.yaml_config)}
                    </div>
                    
                    <!-- Footer -->
                    <div style="padding: 20px 30px; background: #f8f9fa; border-top: 1px solid #e0e0e0; display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
                        <button class="btn btn-success" onclick="copyAnswersJSON('${analysisId}')">
                            📋 Copiar JSON
                        </button>
                        <button class="btn" onclick="copyAnswersFormatted('${analysisId}')">
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
        
    } catch (error) {
        console.error('Error cargando respuestas:', error);
        alert('❌ Error: ' + error.message);
    }
}

async function viewAnswers(analysisId) {
    await viewAnswersInModal(analysisId);
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

async function copyAnswersJSON(analysisId) {
    try {
        const analysis = await window.apiClient.get(window.API_CONFIG.endpoints.getAnalysis(analysisId));
        const text = JSON.stringify(analysis.answers, null, 2);
        await navigator.clipboard.writeText(text);
        alert('✅ Respuestas copiadas en formato JSON');
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

async function copyAnswersFormatted(analysisId) {
    try {
        const analysis = await window.apiClient.get(window.API_CONFIG.endpoints.getAnalysis(analysisId));
        let text = `RESPUESTAS - ${analysis.analysis_type.toUpperCase()}\n`;
        text += `Iteración: ${analysis.iteration}\n`;
        text += `Fecha: ${formatDate(analysis.updated_at)}\n`;
        text += '='.repeat(50) + '\n\n';
        
        for (const [key, value] of Object.entries(analysis.answers || {})) {
            text += `${key}:\n`;
            if (Array.isArray(value)) {
                value.forEach(v => text += `  - ${v}\n`);
            } else {
                text += `  ${value}\n`;
            }
            text += '\n';
        }
        text += 'Si tienes mas preguntas coloca en el output del chat el yaml, si ya no tienes mas preguntas imprime: \'continuemos al siguiete paso\''
        await navigator.clipboard.writeText(text);
        alert('✅ Respuestas copiadas en formato de texto');
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

async function copyAnswersToClipboard(analysisId) {
    await copyAnswersJSON(analysisId);
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
    return badges[status] || `<span class="status-badge">${status}</span>`;
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
</script>

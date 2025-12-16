# Panel de Proyectos

<style>
.project-panel {
    max-width: 1200px;
    margin: 0 auto;
}

.project-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.project-card h3 {
    margin-top: 0;
    color: #2c3e50;
}

.project-meta {
    color: #7f8c8d;
    font-size: 0.9em;
    margin: 10px 0;
}

.btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    margin-right: 10px;
}

.btn:hover {
    background: #2980b9;
}

.btn-success {
    background: #27ae60;
}

.btn-success:hover {
    background: #229954;
}

.btn-danger {
    background: #e74c3c;
}

.btn-danger:hover {
    background: #c0392b;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #2c3e50;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

.hidden {
    display: none;
}
</style>

<div class="project-panel">
    
## Crear Nuevo Proyecto

<div id="create-project-form">
    <div class="form-group">
        <label for="project-name">Nombre del Proyecto *</label>
        <input type="text" id="project-name" placeholder="Ej: Sistema de Facturación v2.0" required>
    </div>
    
    <div class="form-group">
        <label for="project-description">Descripción</label>
        <textarea id="project-description" rows="3" placeholder="Breve descripción del proyecto..."></textarea>
    </div>
    
    <div class="form-group">
        <label for="project-created-by">Creado por</label>
        <input type="email" id="project-created-by" placeholder="tu-email@example.com">
    </div>
    
    <button class="btn btn-success" onclick="createNewProject()">➕ Crear Proyecto</button>
</div>

---

## Proyectos Existentes

<div id="projects-list">
    <p>Cargando proyectos...</p>
</div>


<!-- Modal para crear análisis -->
<div id="analysis-modal"
    style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); align-items: center; justify-content: center; z-index: 10000;">
    <div
        style="background: white; padding: 30px; border-radius: 12px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
        <h2 style="margin-top: 0;">Crear Sesión de Análisis</h2>

        <div class="form-group">
            <label for="analysis-type">Tipo de Análisis *</label>
            <select id="analysis-type">
                <option value="arquitectura">Arquitectura</option>
                <option value="api">API</option>
                <option value="deployment">Deployment</option>
                <option value="requerimientos">Requerimientos</option>
                <option value="procesos-negocio">Procesos de Negocio</option>
                <option value="tecnica">Técnica</option>
                <option value="vista-ejecutiva">Vista Ejecutiva</option>
                <option value="adr">ADR (Architecture Decision Records)</option>
                <option value="swagger">Swagger/OpenAPI</option>
            </select>
        </div>

        <div class="form-group">
            <label for="analysis-yaml">Configuración YAML *</label>
            <textarea id="analysis-yaml" rows="10" placeholder="Pega aquí el YAML generado por Copilot..."
                required></textarea>
        </div>

        <div class="form-group">
            <label for="analysis-created-by">Creado por</label>
            <input type="email" id="analysis-created-by" placeholder="analista@example.com">
        </div>

        <div class="form-group">
            <label for="analysis-assigned-to">Asignado a</label>
            <input type="email" id="analysis-assigned-to" placeholder="experto@example.com">
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
            <button class="btn btn-success" onclick="submitAnalysis()">✅ Crear Análisis</button>
            <button class="btn" onclick="closeAnalysisModal()">Cancelar</button>
        </div>
    </div>
</div>

<script>
let currentProjectForAnalysis = null;

// Cargar proyectos al iniciar
document.addEventListener('DOMContentLoaded', async () => {
    await loadProjects();
});

async function loadProjects() {
    const container = document.getElementById('projects-list');
    
    try {
        const projects = await window.documentationFlow.listProjects();
        
        if (projects.length === 0) {
            container.innerHTML = '<p style="color: #7f8c8d;">No hay proyectos aún. Crea uno nuevo arriba.</p>';
            return;
        }
        
        container.innerHTML = projects.map(project => `
            <div class="project-card">
                <h3>📁 ${project.name}</h3>
                <p>${project.description || '<em>Sin descripción</em>'}</p>
                <div class="project-meta">
                    <strong>Estado:</strong> ${getStatusBadge(project.status)} |
                    <strong>Creado:</strong> ${formatDate(project.created_at)} |
                    <strong>Por:</strong> ${project.created_by}
                </div>
                <div style="margin-top: 15px;">
                    <button class="btn" onclick="openAnalysisModal('${project.id}')">
                        ➕ Nueva Sesión de Análisis
                    </button>
                    <button class="btn" onclick="viewProjectAnalysis('${project.id}')">
                        📊 Ver Análisis
                    </button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error cargando proyectos:', error);
        container.innerHTML = `
            <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 6px;">
                <strong>⚠️ No se pudieron cargar los proyectos</strong>
                <p>Verifica que el backend esté corriendo en: <code>http://localhost:8000</code></p>
                <p style="color: #666; font-size: 0.9em;">Error: ${error.message}</p>
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
        const analyses = await window.apiClient.get(window.API_CONFIG.endpoints.projectAnalyses(projectId));
        
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
        const hasAnswers = analysis.expert_answers && Object.keys(analysis.expert_answers).length > 0;
        const statusColor = hasAnswers ? '#27ae60' : '#95a5a6';
        const statusText = hasAnswers ? '✅ Respondido' : '⏳ Pendiente';
        
        return `
            <div class="project-card" style="border-left: 4px solid ${statusColor};">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 10px 0;">
                            ${analysis.analysis_type} - Iteración ${analysis.current_iteration}
                        </h4>
                        <div class="project-meta">
                            <strong>Estado:</strong> <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span><br>
                            <strong>Creado:</strong> ${formatDate(analysis.created_at)}<br>
                            ${analysis.last_updated ? `<strong>Actualizado:</strong> ${formatDate(analysis.last_updated)}<br>` : ''}
                            <strong>Token:</strong> <code>${analysis.share_token}</code>
                        </div>
                        
                        ${hasAnswers ? `
                            <div style="margin-top: 15px;">
                                <button class="btn btn-success" onclick="viewAnswers('${analysis.id}')">
                                    👁️ Ver Respuestas
                                </button>
                                <button class="btn" onclick="continueDocumentation('${analysis.id}')">
                                    📝 Continuar Documentación
                                </button>
                            </div>
                        ` : `
                            <div style="margin-top: 15px; padding: 10px; background: #fff3cd; border-radius: 4px;">
                                <strong>📤 Compartir con experto:</strong><br>
                                <input type="text" readonly value="${analysis.share_url || 'Generando...'}" 
                                       style="width: 100%; margin-top: 5px;" 
                                       onclick="this.select(); document.execCommand('copy'); alert('✅ URL copiada')">
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

async function viewAnswers(analysisId) {
    try {
        const analysis = await window.apiClient.get(window.API_CONFIG.endpoints.getAnalysis(analysisId));
        
        // Crear modal para mostrar respuestas
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px;" onclick="this.remove()">
                <div style="background: white; border-radius: 12px; max-width: 800px; max-height: 90vh; overflow-y: auto; padding: 30px;" onclick="event.stopPropagation()">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="margin: 0;">📋 Respuestas del Experto</h2>
                        <button onclick="this.closest('[style*=fixed]').remove()" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer;">✕ Cerrar</button>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <strong>Tipo de análisis:</strong> ${analysis.analysis_type}<br>
                        <strong>Iteración:</strong> ${analysis.current_iteration}<br>
                        <strong>Respondido:</strong> ${formatDate(analysis.last_updated)}
                    </div>
                    
                    <div>
                        ${renderAnswersContent(analysis.expert_answers, analysis.yaml_config)}
                    </div>
                    
                    <div style="margin-top: 20px; text-align: right;">
                        <button class="btn" onclick="copyAnswersToClipboard(${JSON.stringify(analysis.expert_answers).replace(/"/g, '&quot;')})">
                            📋 Copiar Respuestas
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

function renderAnswersContent(answers, yamlConfig) {
    if (!answers || Object.keys(answers).length === 0) {
        return '<p style="color: #7f8c8d;">No hay respuestas aún.</p>';
    }
    
    // Agrupar por secciones si hay yaml_config
    let html = '';
    
    for (const [key, value] of Object.entries(answers)) {
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        
        html += `
            <div style="margin-bottom: 15px; padding: 15px; background: white; border: 1px solid #e0e0e0; border-radius: 6px;">
                <strong style="color: #2c3e50;">${key}:</strong>
                <div style="margin-top: 5px; color: #34495e;">
                    ${displayValue || '<em style="color: #95a5a6;">Sin respuesta</em>'}
                </div>
            </div>
        `;
    }
    
    return html;
}

function copyAnswersToClipboard(answers) {
    const text = JSON.stringify(answers, null, 2);
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Respuestas copiadas al portapapeles');
    }).catch(err => {
        console.error('Error copiando:', err);
    });
}

async function continueDocumentation(analysisId) {
    // Guardar el ID de la sesión en localStorage para usarlo en el generador
    localStorage.setItem('currentAnalysisId', analysisId);
    window.location.href = '/prompts/generador/';
}

function getStatusBadge(status) {
    const badges = {
        'active': '<span style="background: #27ae60; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.85em;">Activo</span>',
        'completed': '<span style="background: #3498db; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.85em;">Completado</span>',
        'archived': '<span style="background: #95a5a6; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.85em;">Archivado</span>'
    };
    return badges[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}
</script>

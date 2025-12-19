/**
 * Gestor del flujo completo de documentación con Backend
 * 
 * Maneja la creación de proyectos, sesiones de análisis, iteraciones y 
 * guardado de documentación generada.
 */

class DocumentationFlowManager {
    constructor() {
        this.currentProject = null;
        this.currentAnalysis = null;
        this.useBackend = this.checkBackendAvailable();
    }
    
    /**
     * Verifica si el backend está disponible
     */
    async checkBackendAvailable() {
        try {
            const response = await window.apiClient.get(window.API_CONFIG.endpoints.health);
            console.log('✅ Backend conectado:', response);
            return true;
        } catch (error) {
            console.warn('⚠️ Backend no disponible, usando modo standalone');
            return false;
        }
    }
    
    /**
     * Crea un nuevo proyecto
     */
    async createProject(projectData) {
        if (!this.useBackend) {
            console.log('Modo standalone: proyecto no guardado en backend');
            return { id: 'local-' + Date.now(), ...projectData };
        }
        
        try {
            const project = await window.apiClient.post(
                window.API_CONFIG.endpoints.projects,
                {
                    name: projectData.name,
                    description: projectData.description || '',
                    created_by: projectData.created_by || 'user@example.com',
                    metadata: projectData.metadata || {}
                }
            );
            
            this.currentProject = project;
            console.log('✅ Proyecto creado:', project);
            return project;
        } catch (error) {
            console.error('Error creando proyecto:', error);
            throw error;
        }
    }
    
    /**
     * Crea una nueva sesión de análisis
     */
    async createAnalysis(projectId, analysisType, yamlConfig, createdBy, assignedTo) {
        if (!this.useBackend) {
            console.log('Modo standalone: análisis no guardado en backend');
            return { 
                id: 'local-analysis-' + Date.now(),
                share_url: '#standalone-mode'
            };
        }
        
        try {
            const analysis = await window.apiClient.post(
                window.API_CONFIG.endpoints.createAnalysis(projectId),
                {
                    project_id: projectId,
                    analysis_type: analysisType,
                    yaml_config: yamlConfig,
                    created_by: createdBy,
                    assigned_to: assignedTo
                }
            );
            
            this.currentAnalysis = analysis;
            console.log('✅ Análisis creado:', analysis);
            console.log('📤 URL para compartir:', analysis.share_url);
            
            return analysis;
        } catch (error) {
            console.error('Error creando análisis:', error);
            throw error;
        }
    }
    
    /**
     * Agrega una nueva iteración (nuevo YAML de Copilot)
     */
    async addIteration(analysisId, yamlConfig, needsMoreInfo = true) {
        if (!this.useBackend) {
            console.log('Modo standalone: iteración no guardada');
            return { iteration: 2, share_url: '#standalone-mode' };
        }
        
        try {
            const analysis = await window.apiClient.put(
                window.API_CONFIG.endpoints.addIteration(analysisId),
                {
                    yaml_config: yamlConfig,
                    needs_more_info: needsMoreInfo
                }
            );
            
            this.currentAnalysis = analysis;
            console.log('✅ Iteración agregada:', analysis);
            console.log('📤 Nueva URL para compartir:', analysis.share_url);
            
            return analysis;
        } catch (error) {
            console.error('Error agregando iteración:', error);
            throw error;
        }
    }
    
    /**
     * Marca el análisis como completo
     */
    async completeAnalysis(analysisId) {
        if (!this.useBackend) {
            console.log('Modo standalone: análisis marcado como completo localmente');
            return { status: 'completed' };
        }
        
        try {
            const analysis = await window.apiClient.put(
                window.API_CONFIG.endpoints.completeAnalysis(analysisId)
            );
            
            console.log('✅ Análisis completado:', analysis);
            return analysis;
        } catch (error) {
            console.error('Error completando análisis:', error);
            throw error;
        }
    }
    
    /**
     * Guarda documentos generados por Copilot
     */
    async saveGeneratedDocs(projectId, analysisSessionId, files, generatedBy) {
        if (!this.useBackend) {
            console.log('Modo standalone: documentos no guardados en backend');
            return { files_count: files.length };
        }
        
        try {
            const doc = await window.apiClient.post(
                window.API_CONFIG.endpoints.generateDocs(projectId),
                {
                    analysis_session_id: analysisSessionId,
                    files: files.map(f => ({
                        path: f.path,
                        content: f.content
                    })),
                    generated_by: generatedBy
                }
            );
            
            console.log('✅ Documentos guardados:', doc);
            return doc;
        } catch (error) {
            console.error('Error guardando documentos:', error);
            throw error;
        }
    }
    
    /**
     * Obtiene análisis público por token (para URLs compartidas)
     */
    async getPublicAnalysis(token) {
        try {
            const analysis = await window.apiClient.get(
                window.API_CONFIG.endpoints.getPublicAnalysis(token)
            );
            
            console.log('✅ Análisis público obtenido:', analysis);
            return analysis;
        } catch (error) {
            console.error('Error obteniendo análisis público:', error);
            throw error;
        }
    }
    
    /**
     * Lista proyectos
     */
    async listProjects(filters = {}) {
        if (!this.useBackend) {
            return [];
        }
        
        try {
            const params = new URLSearchParams(filters).toString();
            const endpoint = window.API_CONFIG.endpoints.projects + (params ? `?${params}` : '');
            const projects = await window.apiClient.get(endpoint);
            
            console.log('✅ Proyectos obtenidos:', projects);
            return projects;
        } catch (error) {
            console.error('Error listando proyectos:', error);
            return [];
        }
    }
}

// Instancia global
window.documentationFlow = new DocumentationFlowManager();

// Función helper para mostrar modal con URL de compartir
window.showShareURLModal = function(shareUrl) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 12px; max-width: 600px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
            <h2 style="margin-top: 0; color: #2c3e50;">🔗 URL para Compartir</h2>
            <p style="color: #7f8c8d;">Envía esta URL a la persona que debe responder las preguntas:</p>
            
            <div style="background: #ecf0f1; padding: 15px; border-radius: 6px; margin: 20px 0; word-break: break-all;">
                <code id="share-url-text" style="color: #2980b9; font-size: 14px;">${shareUrl}</code>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button onclick="navigator.clipboard.writeText('${shareUrl}').then(() => alert('✅ URL copiada!')); this.parentElement.parentElement.parentElement.remove();" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    📋 Copiar URL
                </button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #95a5a6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar con click fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
};

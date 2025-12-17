/**
 * Configuración de la API Backend
 */

const API_CONFIG = {
    // URL base de la API (cambiar según entorno)
    baseURL: window.location.hostname === 'localhost' 
        ? 'http://localhost:8000'  // Desarrollo local
        : 'https://fastdocumentationai-backend-1.onrender.com',  // Producción
    
    // Endpoints
    endpoints: {
        // Proyectos
        projects: '/api/projects/',
        project: (id) => `/api/projects/${id}/`,
        
        // Análisis
        createAnalysis: (projectId) => `/api/projects/${projectId}/analysis`,
        getAnalysis: (analysisId) => `/api/analysis/${analysisId}`,
        addIteration: (analysisId) => `/api/analysis/${analysisId}/iteration`,
        completeAnalysis: (analysisId) => `/api/analysis/${analysisId}/complete`,
        projectAnalyses: (projectId) => `/api/projects/${projectId}/analyses`,
        
        // Respuestas públicas
        getPublicAnalysis: (token) => `/api/answer/${token}`,
        updatePublicAnswers: (token) => `/api/answer/${token}`,
        
        // Documentos generados
        generateDocs: (projectId) => `/api/projects/${projectId}/generate-docs`,
        projectDocs: (projectId) => `/api/projects/${projectId}/docs`,
        
        // Info
        analysisTypes: '/api/analysis-types',
        health: '/health'
    },
    
    // Headers por defecto
    defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

/**
 * Cliente HTTP para hacer requests a la API
 */
class APIClient {
    constructor(config) {
        this.config = config;
    }
    
    /**
     * Método genérico para hacer requests
     */
    async request(endpoint, options = {}) {
        const url = `${this.config.baseURL}${endpoint}`;
        const headers = {
            ...this.config.defaultHeaders,
            ...(options.headers || {})
        };
        
        const config = {
            ...options,
            headers
        };
        
        try {
            const response = await fetch(url, config);
            
            // Si la respuesta es 204 No Content, no hay body
            if (response.status === 204) {
                return { success: true };
            }
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.detail || `HTTP Error ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    }
    
    // Métodos HTTP
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Instancia global del cliente
window.apiClient = new APIClient(API_CONFIG);
window.API_CONFIG = API_CONFIG;

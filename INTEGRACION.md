# 🔗 Integración Frontend-Backend

Este documento explica cómo está integrado el frontend (MkDocs) con el backend (FastAPI).

## 📋 Componentes

### Backend
- **FastAPI + Beanie + MongoDB**: `/backend/`
- **Puerto**: 8000
- **Swagger**: http://localhost:8000/docs

### Frontend
- **MkDocs Material**: `/docs/`
- **Puerto**: 8001
- **URL**: http://localhost:8001

## 🚀 Inicio Rápido

### Opción 1: Docker Compose (Recomendado)

```bash
./start.sh
# Selecciona opción 1: Docker Compose
```

Esto levanta:
- MongoDB en puerto 27017
- Backend en puerto 8000
- Frontend en puerto 8001

### Opción 2: Desarrollo Local

```bash
# Terminal 1: Backend
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py

# Terminal 2: MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Terminal 3: Frontend
mkdocs serve -a localhost:8001
```

## 🔧 Arquitectura de Integración

### 1. Archivos JavaScript

```
docs/javascripts/
├── api-client.js              # Cliente HTTP para el backend
├── documentation-flow.js      # Gestor del flujo completo
├── prompt-builder-clean.js    # Constructor de formularios (modificado)
├── prompt-helpers.js          # Utilidades
└── prompt-page-generator.js   # Generador de páginas
```

### 2. Configuración API

En `api-client.js`:

```javascript
window.API_CONFIG = {
    baseURL: 'http://localhost:8000/api',
    endpoints: {
        projects: '/projects',
        createAnalysis: (id) => `/projects/${id}/analysis`,
        updatePublicAnswers: (token) => `/answer/${token}`,
        // ... más endpoints
    }
};
```

### 3. Flujo de Trabajo

#### A. Modo Standalone (Sin Backend)
```
Usuario → Copilot genera YAML → Usuario copia a prompts/generador.md → 
Usuario responde → Copilot analiza → Repite hasta "todo ok"
```

#### B. Modo Colaborativo (Con Backend)

1. **Crear Proyecto** (Panel de Proyectos)
```javascript
await window.documentationFlow.createProject({
    name: "Sistema XYZ",
    description: "Sistema de facturación",
    created_by: "analista@empresa.com"
});
```

2. **Crear Sesión de Análisis**
```javascript
const analysis = await window.documentationFlow.createAnalysis(
    projectId,
    'arquitectura',      // Tipo
    yamlConfig,          // YAML parseado
    'analista@empresa.com',
    'experto@empresa.com'
);

// Retorna: { id, share_url, share_token }
```

3. **Compartir URL**
```
http://localhost:8001/answer/abc123xyz456
```

4. **Experto Responde**
- Abre la URL compartida
- Ve el formulario generado desde el YAML
- Llena las respuestas
- Click en "Enviar Respuestas"
- Frontend POST a `/api/answer/{token}` con `{ answers: {...} }`

5. **Analista Revisa**
```javascript
const analysis = await window.apiClient.get(
    `/analysis/${analysisId}`
);

// analysis.answers contiene las respuestas del experto
```

6. **Iteración** (si necesita más info)
```javascript
await window.documentationFlow.addIteration(
    analysisId,
    nuevoYamlConfig,
    needsMoreInfo: true
);

// Genera nueva share_url con el YAML actualizado
```

7. **Completar Análisis**
```javascript
await window.documentationFlow.completeAnalysis(analysisId);
```

8. **Guardar Documentos Generados**
```javascript
await window.documentationFlow.saveGeneratedDocs(
    projectId,
    analysisId,
    [
        { path: '/docs/arquitectura.md', content: '...' },
        { path: '/docs/api.md', content: '...' }
    ],
    'copilot'
);
```

## 🔗 Integración Automática

### En `prompt-builder-clean.js`

```javascript
async copyAnswers() {
    const data = this.collectFormData();
    const shareToken = this.getShareTokenFromURL();
    
    // Intenta guardar en backend
    if (shareToken && typeof window.apiClient !== 'undefined') {
        try {
            await window.apiClient.post(
                window.API_CONFIG.endpoints.updatePublicAnswers(shareToken),
                { answers: data }
            );
            console.log('✅ Respuestas guardadas en backend');
        } catch (error) {
            console.warn('⚠️ Backend no disponible, solo clipboard');
        }
    }
    
    // Siempre copia al clipboard (compatible con modo standalone)
    const prompt = this.generatePrompt(data);
    await navigator.clipboard.writeText(prompt);
    alert('✅ Copiado!');
}
```

## 📁 Páginas Clave

### 1. Panel de Proyectos (`/panel-proyectos.md`)
- Lista todos los proyectos
- Permite crear nuevos proyectos
- Botón "Nueva Sesión de Análisis" por proyecto
- Modal para configurar análisis (tipo + YAML)

### 2. Generador (`/prompts/generador.md`)
- Modo original: Pega YAML manualmente
- Ahora puede recibir YAML desde el backend vía URL params

### 3. Responder (`/answer.md`)
- Página pública para URLs compartidas
- Extrae token de la URL: `/answer/{token}`
- GET `/api/answer/{token}` → carga YAML
- Renderiza formulario dinámico
- POST `/api/answer/{token}` → guarda respuestas

## 🔒 Seguridad

### Tokens de Compartir
```python
# backend/src/utils/token_generator.py
def generate_token(length: int = 32) -> str:
    return secrets.token_urlsafe(length)
```

- 32 caracteres URL-safe
- No expira (por ahora)
- Solo permite GET/POST de respuestas
- No permite modificar configuración

### CORS
```python
# backend/src/config/settings.py
ALLOWED_ORIGINS = [
    "http://localhost:8001",
    "http://127.0.0.1:8001"
]
```

## 🧪 Testing

### 1. Verificar Backend
```bash
curl http://localhost:8000/health
# {"status":"healthy"}

curl http://localhost:8000/docs
# Abre Swagger UI
```

### 2. Verificar Frontend
```bash
# En la consola del navegador (http://localhost:8001)
await window.documentationFlow.checkBackendAvailable()
# true si está conectado
```

### 3. Test Completo

```javascript
// 1. Crear proyecto
const project = await window.documentationFlow.createProject({
    name: "Test Project",
    description: "Prueba de integración",
    created_by: "test@example.com"
});

// 2. Preparar YAML
const yamlText = `
title: Test Analysis
description: Prueba
sections:
  - title: Preguntas
    questions:
      - id: q1
        type: text
        label: ¿Cuál es tu nombre?
`;

const yamlConfig = jsyaml.load(yamlText);

// 3. Crear análisis
const analysis = await window.documentationFlow.createAnalysis(
    project.id,
    'arquitectura',
    yamlConfig,
    'test@example.com',
    'expert@example.com'
);

console.log('Share URL:', analysis.share_url);

// 4. Abrir la share URL en otra pestaña
// 5. Responder las preguntas
// 6. Verificar que las respuestas se guardaron
const updated = await window.apiClient.get(`/analysis/${analysis.id}`);
console.log('Answers:', updated.answers);
```

## 🐛 Troubleshooting

### Backend no conecta
```bash
# Verifica que MongoDB esté corriendo
docker ps | grep mongodb

# Verifica logs del backend
docker-compose logs backend

# Verifica puerto 8000
lsof -i :8000
```

### Frontend no carga scripts
```bash
# Verifica que los archivos existan
ls docs/javascripts/

# Verifica mkdocs.yml
grep "extra_javascript" mkdocs.yml
```

### CORS errors
```python
# backend/src/main.py
# Verifica que el origen esté permitido
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8001"],  # ← Debe coincidir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📚 Próximos Pasos

- [ ] Autenticación con JWT
- [ ] Tokens con expiración
- [ ] Notificaciones por email
- [ ] Dashboard de analytics
- [ ] Exportar respuestas a PDF
- [ ] Integración con GitHub Issues
- [ ] Webhooks para automatización

## 💡 Tips

1. **Desarrollo**: Usa modo local con hot-reload
2. **Testing**: Usa Docker Compose
3. **Producción**: Agrega Nginx como reverse proxy
4. **Debug**: Abre Swagger UI en http://localhost:8000/docs
5. **Logs**: `docker-compose logs -f backend` para ver logs en tiempo real

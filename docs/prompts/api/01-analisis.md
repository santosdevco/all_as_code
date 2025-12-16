# 🔍 Prompt de Análisis - Documentación de API

## ROL
Eres un **Senior API Architect** experto en diseño y documentación de APIs REST/GraphQL.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para documentar la **API completa**: endpoints, autenticación, schemas, ejemplos.

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** hallazgos en consola (NO generar archivos)
3. **Generar** YAML con preguntas sobre lo que no está claro

## ARCHIVOS DE SALIDA (se generarán en siguiente prompt)
- `ai_docs/03-api/01-endpoints.md`
- `ai_docs/03-api/02-autenticacion.md`

---

## FASE 1: ANÁLISIS EXHAUSTIVO

### 📡 Endpoints
- Rutas definidas (Express, FastAPI, etc.)
- Métodos HTTP (GET, POST, PUT, DELETE)
- Parámetros (query, path, body)
- Responses (status codes, schemas)

### 🔐 Autenticación
- JWT, OAuth, API Keys
- Middleware de autenticación
- Roles y permisos

### 📊 Schemas
- Modelos de datos
- Validaciones (Joi, Yup, Pydantic)
- OpenAPI/Swagger specs

---

## FASE 2: GENERAR REPORTE EN CONSOLA

```
================================================================================
📊 ANÁLISIS DE API - [NOMBRE_PROYECTO]
================================================================================

📡 ENDPOINTS ENCONTRADOS:
   - GET /users
   - POST /users
   - GET /users/:id

🔐 AUTENTICACIÓN:
   - JWT detectado
   - Middleware: authMiddleware.js

❓ PREGUNTAR:
   - ¿Qué roles existen?
   - ¿Rate limiting configurado?
```

---

## FASE 3: GENERAR YAML

```yaml
# ============================================
# EJEMPLO YAML - PROMPT BUILDER
# ============================================
# Formato compatible con prompt-builder-clean.js
# Una pregunta de cada tipo soportado

title: "📋 Ejemplo de Formulario"
description: "Formulario de ejemplo con los 5 tipos de preguntas disponibles"

# OPCIONAL: Advertencia
warning:
  title: "⚠️ Nota Importante"
  message: "Este es un ejemplo de advertencia"
  items:
    - "Punto 1 de la advertencia"
    - "Punto 2 de la advertencia"

sections:
  - icon: "🎯"
    title: "Información del Proyecto"
    description: "Datos básicos del proyecto"
    questions:
      # 1. TEXTO SIMPLE
      - id: projectName
        type: text
        label: "Nombre del Proyecto:"
        placeholder: "Ej: Mi API Backend"
        required: true
        help: "Nombre oficial del proyecto"
      
      # 2. TEXTAREA
      - id: description
        type: textarea
        label: "Descripción:"
        placeholder: "Describe brevemente el proyecto..."
        rows: 4
        help: "Resumen del propósito del proyecto"
      
      # 3. SELECT (con opción "Otro")
      - id: projectType
        type: select
        label: "Tipo de proyecto:"
        options:
          - value: api
            label: "API REST"
          - value: webapp
            label: "Aplicación Web"
          - value: mobile
            label: "App Móvil"
          - value: otro
            label: "Otro"
        default: api
        showOther: true
        otherPlaceholder: "Especifica el tipo"
        help: "Selecciona el tipo principal"
      
      # 4. RADIO BUTTONS
      - id: hasDocker
        type: radio
        label: "¿Usa Docker?"
        options:
          - value: si
            label: "Sí"
          - value: no
            label: "No"
          - value: nolose
            label: "No sé"
        default: si
        help: "¿El proyecto está contenedorizado?"
      
      # 5. CHECKBOXES
      - id: environments
        type: checkbox
        label: "Ambientes (marca todos los que apliquen):"
        options:
          - value: dev
            label: "Desarrollo"
            checked: true
          - value: staging
            label: "Staging"
          - value: prod
            label: "Producción"
        help: "Selecciona todos los ambientes activos"

```
```
5 Tipos de Preguntas Soportadas:
text - Campo de texto simple
textarea - Texto multi-línea
select - Lista desplegable (con opción "Otro")
radio - Botones de opción (selección única)
checkbox - Casillas múltiples
Propiedades Comunes:
id - Identificador único
type - Tipo de campo
label - Etiqueta visible
help - Texto de ayuda (opcional)
Propiedades Específicas:
TEXT: placeholder, required
TEXTAREA: placeholder, rows
SELECT: options, default, showOther, otherPlaceholder
RADIO: options, default
CHECKBOX: options (con checked)
```
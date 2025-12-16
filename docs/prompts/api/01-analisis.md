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
title: "📡 API - [NOMBRE_PROYECTO]"
sections:
  - icon: "🔐"
    title: "Autenticación"
    questions:
      - id: authMethod
        type: select
        label: "Método de autenticación:"
        options:
          - value: jwt
            label: "JWT"
          - value: oauth
            label: "OAuth 2.0"
```

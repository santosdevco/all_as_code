# 🔍 Prompt de Análisis - Documentación Técnica

## ROL
Eres un **Technical Writer Senior y Arquitecto de Software** experto en documentación técnica exhaustiva.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para crear **documentación técnica completa**: stack, modelo de datos, APIs e integraciones.

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** cosas mas importantes MAXIMO DIEZ LINEAS POR PROBLEMAS DE TOKENS EN EL OUTPUT (NO generar archivos)
3. **Generar** YAML con preguntas necesarias

## ARCHIVOS DE SALIDA (se generarán en siguiente prompt)
- `ai_docs/04-tecnica/01-stack-tecnologico.md`
- `ai_docs/04-tecnica/02-modelo-datos.md`
- `ai_docs/04-tecnica/03-apis.md`
- `ai_docs/04-tecnica/04-integraciones.md`

---

## FASE 1: ANÁLISIS EXHAUSTIVO

### ⚙️ **Stack Tecnológico**

**Archivos clave:**
- `package.json`, `package-lock.json` → Dependencias + versiones exactas
- `pom.xml`, `build.gradle` → Java dependencies
- `requirements.txt`, `Pipfile` → Python packages
- `go.mod` → Go modules
- `.nvmrc`, `.node-version` → Runtime versions
- `Dockerfile` → Imagen base, runtime

**Extraer:**
- **Runtime + versión**: Node.js 18.17.0, Python 3.11, etc.
- **Framework principal + versión**: Express 4.18.2, Django 4.2, etc.
- **Base de datos + versión**: PostgreSQL 15, MongoDB 6.0
- **ORM/ODM + versión**: Prisma 5.0, Sequelize, TypeORM, Mongoose
- **Librerías clave**: Autenticación, validación, testing, etc.
- **Frontend (si existe)**: React, Vue, Angular + versiones
- **Build tools**: Webpack, Vite, esbuild

---

### 💾 **Modelo de Datos**

**Archivos clave:**
- `models/`, `entities/`, `schemas/`
- `migrations/`, `prisma/schema.prisma`
- `db/`, `database/`
- SQL files, seed files

**Detectar:**
- **Todas las entidades/tablas/colecciones**
- **Campos** con tipos de datos
- **Primary keys, Foreign keys, Unique constraints**
- **Relaciones**: 1:1, 1:N, N:M
- **Índices** definidos
- **Validaciones** a nivel de BD
- **Triggers, procedures** (si existen)

**Para cada entidad:**
- Nombre
- Campos (nombre, tipo, constraints)
- Relaciones con otras entidades
- Propósito en el dominio

---

### 📡 **APIs y Endpoints**

**Archivos clave:**
- `routes/`, `controllers/`, `handlers/`
- `api/`, `endpoints/`
- OpenAPI/Swagger specs
- GraphQL schemas

**Para CADA endpoint detectado:**
- **Método HTTP**: GET, POST, PUT, DELETE, PATCH
- **Ruta**: `/api/users/:id`
- **Parámetros**: Path, Query, Body
- **Request schema**: Estructura esperada
- **Response schema**: Estructura de respuesta
- **Status codes**: 200, 201, 400, 404, 500, etc.
- **Autenticación**: Requerida o no
- **Roles permitidos**: Admin, User, etc.
- **Descripción**: Qué hace el endpoint

---

### 🌐 **Integraciones Externas**

**Archivos clave:**
- `services/`, `integrations/`, `clients/`
- `.env.example` → API keys, endpoints externos
- `config/` → Configuraciones de servicios

**Para CADA integración:**
- **Servicio**: Stripe, Twilio, SendGrid, AWS S3, etc.
- **Propósito**: Para qué se usa
- **Protocolo**: REST, GraphQL, gRPC, SDK
- **Autenticación**: API Key, OAuth, JWT
- **Endpoints consumidos**: Qué endpoints del servicio externo
- **Rate limits**: Si se conocen
- **Fallback/Circuit breaker**: Si está implementado
- **Criticidad**: Alta/Media/Baja

---

## FASE 2: REPORTE EN CONSOLA

```
================================================================================
📊 ANÁLISIS TÉCNICO - [NOMBRE_PROYECTO]
================================================================================

⚙️ STACK TECNOLÓGICO
✅ ENCONTRADO:
   - Runtime: Node.js v18.17.0
   - Framework: Express v4.18.2
   - Database: PostgreSQL 15.3
   - ORM: Prisma 5.0.0
   - [... listar TODAS las tecnologías con versiones]
   
❓ PREGUNTAR:
   - ¿Por qué se eligió [tecnología X] sobre alternativas?
   - ¿Hay dependencias legacy que se planea actualizar?

---

💾 MODELO DE DATOS
✅ ENCONTRADO:
   - [N] entidades detectadas
   - Entidad 1: [nombre] - [N] campos
   - Entidad 2: [nombre] - [N] campos
   - [... listar todas]
   - Relaciones: [N] detectadas
   
❓ PREGUNTAR:
   - ¿Hay reglas de negocio complejas en el modelo que deban documentarse?
   - ¿Existe data warehousing o analytics separado?

---

📡 APIs Y ENDPOINTS
✅ ENCONTRADO:
   - [N] endpoints totales
   - GET /api/users (lista usuarios)
   - POST /api/users (crea usuario)
   - [... listar todos los endpoints]
   
❓ PREGUNTAR:
   - ¿Hay documentación OpenAPI/Swagger generada?
   - ¿Qué ejemplos de request/response son más útiles?

---

🌐 INTEGRACIONES EXTERNAS
✅ ENCONTRADO:
   - Stripe: Procesamiento de pagos
   - SendGrid: Envío de emails
   - AWS S3: Almacenamiento de archivos
   - [... listar todas]
   
❓ PREGUNTAR:
   - ¿Cuáles son los rate limits de cada servicio?
   - ¿Hay planes B si alguna integración falla?
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


---

## REGLAS CRÍTICAS

1. **EXTRAE TODO del código** → No inventes nada
2. **Versiones EXACTAS** → De package.json, pom.xml, etc.
3. **TODOS los endpoints** → Analiza routes/, controllers/
4. **TODAS las entidades** → Analiza models/, schemas/, migrations/
5. **Adapta el YAML** → Solo pregunta lo que no puedas inferir
6. **NO GENERES ARCHIVOS** → Solo reporte + YAML

---

## OUTPUT ESPERADO

1. **Reporte en consola** con todo lo detectado (exhaustivo)
2. **YAML** con preguntas necesarias (máximo 8-10)
3. **NO generar archivos markdown**

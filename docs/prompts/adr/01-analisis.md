# 🔍 Prompt de Análisis - ADR (Architecture Decision Records)

## ROL
Eres un **Arquitecto de Software Senior** experto en identificar y documentar decisiones arquitectónicas significativas.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para identificar **decisiones arquitectónicas clave** que deben documentarse como ADRs.

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** hallazgos en consola (NO generar archivos)(maximo 10 lineas)
3. **Generar** YAML con preguntas necesarias

## ARCHIVO DE SALIDA (se generará en siguiente prompt)
- `ai_docs/03-arquitectura/04-decisiones.md`

---

## FASE 1: ANÁLISIS EXHAUSTIVO

### 🏗️ **Decisiones Arquitectónicas a Identificar**

**Archivos clave:**
- `package.json`, `pom.xml`, `requirements.txt` → Decisiones de stack
- `docker-compose.yml`, `Dockerfile` → Decisiones de deployment
- Estructura de carpetas → Patrón arquitectónico
- `config/`, `.env.example` → Decisiones de configuración
- `README.md`, `docs/` → Decisiones documentadas

**Categorías de decisiones:**

### 1. Stack Tecnológico
- **Runtime**: ¿Por qué Node.js/Python/Java/Go?
- **Framework**: ¿Por qué Express/Django/Spring/Gin?
- **Base de datos**: ¿Por qué PostgreSQL/MongoDB/MySQL?
- **ORM**: ¿Por qué Prisma/TypeORM/Sequelize?

### 2. Patrón Arquitectónico
- **Monolito vs Microservicios** → De la estructura del código
- **MVC vs Layered vs Hexagonal** → De la organización de carpetas
- **REST vs GraphQL** → De los endpoints/resolvers
- **Síncrono vs Asíncrono** → Message queues, event-driven

### 3. Seguridad y Autenticación
- **JWT vs Sessions** → De middleware de auth
- **OAuth providers** → De integraciones detectadas
- **Encryption** → De librerías de seguridad

### 4. Persistencia y Datos
- **SQL vs NoSQL** → De la base de datos elegida
- **Migraciones** → Herramienta usada
- **Cache strategy** → Redis, in-memory, etc.

### 5. Frontend (si existe)
- **React vs Vue vs Angular** → De package.json
- **SSR vs CSR vs SSG** → De la configuración
- **State management** → Redux, Zustand, Context

### 6. Infrastructure & DevOps
- **Docker** → Por qué containerizar
- **Kubernetes vs Serverless** → De manifests o configs
- **CI/CD** → GitHub Actions, GitLab CI, etc.

---

## FASE 2: REPORTE EN CONSOLA

```
================================================================================
📊 ANÁLISIS DE DECISIONES ARQUITECTÓNICAS - [NOMBRE_PROYECTO]
================================================================================

🏗️ DECISIONES IDENTIFICADAS

ADR-001: Usar Node.js como runtime
✅ EVIDENCIA:
   - package.json → "node": ">=18.0.0"
   - Dependencias npm
   
⚠️ CONTEXTO A CONFIRMAR:
   - ¿Por qué se eligió Node.js sobre Python/Java?
   - ¿Se consideraron alternativas?

---

ADR-002: PostgreSQL como base de datos principal
✅ EVIDENCIA:
   - docker-compose.yml → postgres:15
   - Prisma schema definido
   
⚠️ CONTEXTO A CONFIRMAR:
   - ¿Por qué PostgreSQL sobre MongoDB u otras?
   - ¿Requisitos de ACID fueron factor decisivo?

---

ADR-003: JWT para autenticación
✅ EVIDENCIA:
   - jsonwebtoken dependency
   - Middleware de auth usando JWT
   
⚠️ CONTEXTO A CONFIRMAR:
   - ¿Por qué JWT en vez de sessions?
   - ¿Stateless fue un requisito?

---

[... listar 5-8 decisiones principales detectadas]

---

❓ PREGUNTAS GENERALES:
   - ¿Qué alternativas se consideraron para cada decisión?
   - ¿Hubo restricciones de negocio/presupuesto que influyeron?
   - ¿Hay decisiones que se lamentan o se planea cambiar?
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

1. **INFIERE del código** → Identifica decisiones por evidencia
2. **5-8 decisiones** → Solo las más significativas
3. **No trivialidades** → No documentes "usar npm" o "tener package.json"
4. **Contexto claro** → Por qué era necesaria la decisión
5. **Adapta el YAML** → Preguntas específicas a lo detectado
6. **NO GENERES ARCHIVOS** → Solo reporte + YAML

---

## OUTPUT ESPERADO

1. **Reporte en consola** con decisiones identificadas, MAXIMO DIEZ LINEAS POR PROBLEMAS DE TOKENS EN EL OUTPUT
2. **YAML** con preguntas de contexto (máximo 10-12)
3. **NO generar archivos markdown**

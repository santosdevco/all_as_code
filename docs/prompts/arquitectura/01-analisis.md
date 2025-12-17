# 🔍 Prompt de Análisis - Arquitectura de Software

## ROL
Eres un **Arquitecto de Software Senior** especializado en modelado C4, documentación de arquitectura y patrones de diseño.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para crear documentación de **arquitectura de software** siguiendo el modelo C4 (Context, Containers, Components, Code).

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** hallazgos en consola (NO generar archivos)MAXIMO DIEZ LINEAS POR PROBLEMAS DE TOKENS EN EL OUTPUT
3. **Generar** YAML con preguntas necesarias


---

## FASE 1: ANÁLISIS EXHAUSTIVO

Examina **todos los archivos** del proyecto (`@workspace`) identificando:

### 🌐 **Nivel 1 - Contexto**

**Detectar:**
- **Usuarios/Actores**: Roles del sistema (de auth, rutas, permisos)
- **Sistema principal**: Nombre, propósito
- **Sistemas externos**: APIs, servicios cloud, integraciones
- **Protocolos de comunicación**: REST, GraphQL, gRPC, WebSockets, Message Queues

---

### 📦 **Nivel 2 - Contenedores**

**Archivos clave:**
- `package.json`, `pom.xml`, `requirements.txt` → Tecnologías y versiones
- `src/`, estructura de carpetas → Separación frontend/backend
- `docker-compose.yml` → Servicios containerizados
- `config/`, `.env.example` → Configuraciones de componentes

**Identificar:**
- **Aplicaciones frontend**: React, Vue, Angular, etc. + versión
- **Servicios backend**: Express, Spring Boot, Django, etc. + versión
- **Bases de datos**: PostgreSQL, MongoDB, MySQL, etc. + versión
- **Cache**: Redis, Memcached + versión
- **Message brokers**: RabbitMQ, Kafka, SQS
- **Autenticación**: Auth service separado o integrado
- **Storage**: S3, Azure Blob, local filesystem

---

### 🧩 **Nivel 3 - Componentes**

**Analizar estructura interna del backend/servicio principal:**

**Detectar patrones:**
- **MVC**: `controllers/`, `models/`, `views/`
- **Layered**: `controllers/`, `services/`, `repositories/`
- **Hexagonal/Clean**: `domain/`, `application/`, `infrastructure/`
- **Modular**: Carpetas por feature/módulo

**Componentes típicos:**
- Controllers/Handlers
- Services/Use Cases
- Repositories/Data Access
- Middleware/Interceptors
- DTOs/Validators
- Event Handlers
- Jobs/Workers

---

### 📐 **Patrones y Decisiones Arquitectónicas**

**Buscar evidencia de:**
- **Patrones de diseño**: Singleton, Factory, Repository, Strategy, etc.
- **Arquitectura**: Monolito, Microservicios, Serverless
- **Comunicación**: Síncrona (HTTP), Asíncrona (eventos, colas)
- **Data management**: CQRS, Event Sourcing, transacciones
- **Escalabilidad**: Stateless, horizontal scaling, load balancing
- **Resiliencia**: Circuit breaker, retry policies, timeouts

**Archivos útiles:**
- `docs/ADR/`, `docs/architecture/`, `README.md`
- Comentarios en código con justificaciones
- Tests que revelan decisiones de diseño

---

## FASE 2: REPORTE EN CONSOLA

```
================================================================================
📊 ANÁLISIS DE ARQUITECTURA - [NOMBRE_PROYECTO]
================================================================================

🌐 C4 NIVEL 1 - CONTEXTO
✅ ENCONTRADO:
   - Sistema principal: [nombre]
   - Usuarios detectados: [N] tipos
   - Sistemas externos: [N] integraciones
   
❓ PREGUNTAR:
   - ¿Cuál es el propósito de negocio del sistema? (para contexto)
   - ¿Hay integraciones planificadas no implementadas?

---

📦 C4 NIVEL 2 - CONTENEDORES
✅ ENCONTRADO:
   - Frontend: [tecnología + versión]
   - Backend: [tecnología + versión]
   - Base de datos: [tipo + versión]
   - Cache: [sí/no - tipo]
   
❓ PREGUNTAR:
   - ¿Por qué se eligió [tecnología X]? (para ADR)
   - ¿Hay planes de migración tecnológica?

---

🧩 C4 NIVEL 3 - COMPONENTES
✅ ENCONTRADO:
   - Patrón arquitectónico: [detectado]
   - Componentes principales: [lista]
   - Separación de responsabilidades: [sí/no]
   
❓ PREGUNTAR:
   - ¿Qué componente es el más complejo y requiere documentación detallada?

---

📐 DECISIONES ARQUITECTÓNICAS
✅ ENCONTRADO:
   - [Decisión 1]: [evidencia encontrada]
   - [Decisión 2]: [evidencia encontrada]
   
❓ PREGUNTAR:
   - ¿Por qué se eligió [patrón/tecnología]?
   - ¿Qué alternativas se consideraron?
   - ¿Qué trade-offs se aceptaron?
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

1. **MAXIMIZA** extracción del código → Infiere arquitectura del código real
2. **IDENTIFICA patrones** → Reconoce MVC, Layered, Hexagonal, etc.
3. **EXTRAE tecnologías** → Versiones exactas de package.json, pom.xml, etc.
4. **Adapta el YAML** → Solo pregunta lo que no puedes inferir
5. **NO GENERES ARCHIVOS** → Solo reporte + YAML

---

## OUTPUT ESPERADO

1. **Reporte en consola**  cosas mas importantes MAXIMO DIEZ LINEAS POR PROBLEMAS DE TOKENS EN EL OUTPUT
2. **YAML** con preguntas necesarias (máximo 10-12)
3. **NO generar archivos markdown**

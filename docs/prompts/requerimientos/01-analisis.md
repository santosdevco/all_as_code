# 🔍 Prompt de Análisis - Documentación de Requerimientos

## ROL
Eres un **Business Analyst Senior y Requirements Engineer** experto en ingeniería de requisitos, análisis de sistemas y especificación de software.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para documentar **requisitos funcionales y no funcionales**.

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** hallazgos en consola (NO generar archivos)MAXIMO DIEZ LINEAS POR PROBLEMAS DE TOKENS EN EL OUTPUT
3. **Generar** YAML con preguntas categorizadas en 3 niveles:
   - ✅ **YA_SABEMOS**: Información encontrada con certeza en el código
   - ⚠️ **VALIDAR**: Información parcial que requiere confirmación
   - ❓ **NO_SABEMOS**: Información que no está en el código

## ARCHIVOS DE SALIDA

Este prompt no genera archivos de salida, solo un YAML en consola con preguntas

---

## FASE 1: ANÁLISIS EXHAUSTIVO DEL WORKSPACE

Examina **todos los archivos** del proyecto (`@workspace`) buscando evidencia de:

### 📋 **Requisitos Funcionales**

**Archivos a buscar:**
- `routes/`, `controllers/`, `handlers/`, `api/`, `endpoints/`
- `services/`, `use-cases/`, `domain/`
- `models/`, `entities/`, `schemas/`
- `middleware/`, `guards/`, `validators/`
- `tests/`, `*.test.js`, `*.spec.ts`
- `README.md`, `docs/`, `swagger/`, `openapi/`

**Qué analizar por CADA endpoint/funcionalidad:**

1. **Método HTTP** (GET, POST, PUT, DELETE, PATCH)
2. **Ruta/Endpoint** (`/api/users`, `/products/:id`)
3. **Descripción** (inferir del nombre de la función/comentarios)
4. **Parámetros**: 
   - Path params (`/:id`)
   - Query params (`?page=1&limit=10`)
   - Body (analizar schemas de validación)
5. **Validaciones**:
   - Schemas (Joi, Yup, Zod, class-validator)
   - Reglas de negocio en código
   - Constraints de BD
6. **Autenticación/Autorización**:
   - Middleware de auth (`@UseGuards`, `authMiddleware`)
   - Roles permitidos (`@Roles(['admin'])`)
7. **Respuestas esperadas**:
   - Status codes (200, 201, 400, 404, etc.)
   - Estructura de respuesta
8. **Operación CRUD**: Create / Read / Update / Delete
9. **Módulo/Dominio**: A qué módulo pertenece (users, products, auth, etc.)
10. **Tests existentes**: ¿Hay tests que validen esta funcionalidad?

**Ejemplo de extracción:**

```javascript
// Archivo: src/routes/users.js
router.post('/users', 
  authMiddleware,
  validate(userSchema),
  userController.create
);

// Inferir:
// - RF: Crear usuario
// - Método: POST
// - Endpoint: /api/users
// - Autenticación: Sí
// - Validaciones: userSchema (nombre, email, password)
// - Rol: cualquier usuario autenticado
// - Status esperados: 201, 400, 401, 409
```

---

### 🚀 **Rendimiento (RNF)**

**Archivos a buscar:**
- `package.json` → scripts de benchmark, artillery, k6, jmeter
- `config/`, `.env.example` → timeouts, connection pools
- `cache/`, `redis/` → estrategias de cache
- Rate limiting middleware
- `cluster.js`, workers config

**Qué analizar:**
- **Timeouts configurados** (request timeout, query timeout)
- **Connection pools** (tamaño min/max)
- **Cache strategies** (Redis, Memcached, in-memory)
- **Rate limiting** (requests/ventana de tiempo)
- **Workers/Clusters** (número de procesos)
- **Compression** (gzip, brotli)

---

### 🔒 **Seguridad (RNF)**

**Archivos a buscar:**
- `middleware/auth*`, `middleware/security*`
- `config/security*`, `passport/`, `jwt/`
- `.env.example` → secretos, API keys
- `helmet`, `cors`, `csurf` configuración
- Password hashing (bcrypt, argon2)
- Input validation libraries

**Qué analizar:**
- **Mecanismo de autenticación**: JWT, Sessions, OAuth, API Keys
- **Password hashing**: bcrypt, argon2, rounds/iterations
- **Validación de entrada**: express-validator, Joi, Zod
- **Security headers**: Helmet configurado
- **CORS**: Orígenes permitidos
- **CSRF protection**: Habilitado o no
- **HTTPS enforcement**: Redirect o solo HTTPS
- **Secrets management**: Variables de entorno, Vault, etc.
- **Cumplimiento normativo**: Comentarios sobre GDPR, PCI-DSS, etc.

---

### 📈 **Escalabilidad (RNF)**

**Archivos a buscar:**
- `docker-compose.yml` → replicas
- `kubernetes/` → HPA, replicas
- `cluster.js`, PM2 config
- Load balancer config
- Stateless design patterns

**Qué analizar:**
- **Réplicas configuradas**: Número de instancias
- **Autoscaling**: HPA en K8s, AWS ASG
- **Métricas de scaling**: CPU, memoria, custom
- **Load balancers**: nginx, haproxy, ALB
- **Diseño stateless**: Sin sesiones en memoria
- **Session storage**: Redis, DB-based sessions

---

### ⏱️ **Disponibilidad (RNF)**

**Archivos a buscar:**
- Health check endpoints (`/health`, `/ready`, `/live`)
- Backup scripts (`backup.sh`, cron jobs)
- Monitoring config (Prometheus, Datadog)
- Redundancy config (multi-AZ, multi-region)

**Qué analizar:**
- **Health checks**: Endpoints y qué verifican
- **Backup scripts**: Frecuencia, destino, retención
- **Redundancia**: Multi-AZ, multi-región
- **Monitoring**: Herramientas configuradas
- **Alerting**: Configuración de alertas
- **Disaster recovery**: Planes documentados

---

### 🔧 **Mantenibilidad (RNF)**

**Archivos a buscar:**
- `tests/` → cobertura
- `.eslintrc`, `.prettierrc`, `tsconfig.json`
- `docs/`, `README.md`, `CONTRIBUTING.md`
- `swagger/`, `openapi/` → API docs
- Logging libraries (winston, bunyan, pino)

**Qué analizar:**
- **Test coverage**: Config de Jest/Mocha, % de cobertura
- **Linting**: ESLint, Prettier, reglas configuradas
- **Type safety**: TypeScript, Flow
- **Documentación**: README, ADRs, runbooks
- **API docs**: Swagger, OpenAPI, JSDoc
- **Logging**: Niveles, formato, centralizado
- **Versionado de API**: `/v1`, `/v2` en rutas

---

### 👥 **Usabilidad (RNF)**

**Archivos a buscar:**
- `frontend/`, `public/`, `views/`
- `i18n/`, `locales/`, `translations/`
- Responsive design libraries
- Accessibility libraries (a11y)
- `.browserslistrc`, `babel.config.js`

**Qué analizar:**
- **Framework frontend**: React, Vue, Angular, etc.
- **Responsive design**: CSS frameworks, media queries
- **Internationalization**: i18n config, idiomas soportados
- **Accesibilidad**: aria-labels, librerías a11y
- **Browser support**: Browserslist config
- **UI/UX libraries**: Material-UI, Ant Design, etc.

---

### 🌐 **Integración (RNF)**

**Archivos a buscar:**
- `services/`, `integrations/`, `api/clients/`
- `config/integrations*`
- `.env.example` → API keys de servicios externos
- Webhooks handlers
- Message queue config (RabbitMQ, Kafka, SQS)

**Qué analizar:**
- **APIs externas**: Clientes configurados (Stripe, Twilio, etc.)
- **Webhooks**: Endpoints que reciben webhooks
- **Message queues**: RabbitMQ, Kafka, SQS, Redis Pub/Sub
- **Event-driven**: Event handlers, event bus
- **Protocolos**: REST, GraphQL, gRPC, WebSockets
- **Autenticación externa**: OAuth providers

---

### 💰 **Costo (RNF)**

**Archivos a buscar:**
- `docker-compose.yml` → servicios
- `kubernetes/` → resource limits
- `terraform/`, `cloudformation/` → recursos cloud
- `.github/workflows/` → CI/CD usage

**Qué analizar:**
- **Cloud provider**: AWS, GCP, Azure, IBM Cloud
- **Servicios cloud utilizados**: EC2, RDS, S3, Lambda, etc.
- **Resource limits**: CPU, memoria por servicio
- **Instance types**: t3.micro, m5.large, etc.
- **Storage**: Tamaño, tipo (SSD, HDD)
- **Data transfer**: Egress, CDN

---

## FASE 2: GENERAR REPORTE EN CONSOLA

**⚠️ NO GENERES ARCHIVOS**. Muestra el análisis directamente aquí en formato estructurado:

```
================================================================================
📊 ANÁLISIS DE REQUERIMIENTOS - [NOMBRE_PROYECTO]
================================================================================

📋 REQUISITOS FUNCIONALES DETECTADOS
================================================================================

Total encontrado: [N] funcionalidades

RF-001: Crear Usuario
✅ ENCONTRADO:
   - Método: POST
   - Endpoint: /api/users
   - Archivo: src/routes/users.js (línea 15)
   - Autenticación: Requerida (JWT)
   - Roles: Todos los usuarios autenticados
   - Validaciones detectadas:
     * email: requerido, formato email
     * password: min 8 caracteres, 1 mayúscula, 1 número
     * nombre: requerido, max 100 caracteres
   - Status codes: 201, 400, 401, 409
   - Tests: ✅ Sí (tests/users.test.js)

RF-002: Listar Usuarios
✅ ENCONTRADO:
   - Método: GET
   - Endpoint: /api/users
   - Archivo: src/routes/users.js (línea 20)
   - Query params: page, limit, search
   - Autenticación: Requerida
   - Roles: Solo admin
   - Paginación: Sí (default: 10/página)
   - Tests: ✅ Sí

[... continuar con TODAS las funcionalidades detectadas ...]

❓ PREGUNTAS SOBRE FUNCIONALIDADES:
   - ¿Hay funcionalidades planificadas pero NO implementadas?
   - ¿Alguna funcionalidad tiene prioridad diferente a Must Have?
   - ¿Quién es el rol/usuario que ejecuta cada funcionalidad?
   - ¿Cuál es el beneficio de negocio de cada funcionalidad?

---

🚀 RENDIMIENTO
================================================================================

✅ ENCONTRADO:
   - Timeout de request: 30s (config/server.js)
   - Connection pool: min 2, max 10 (config/database.js)
   - Cache: Redis configurado (TTL: 3600s)
   - Rate limiting: 100 req/15min por IP

❓ PREGUNTAR:
   - ¿Cuál es el tiempo de respuesta máximo aceptable? (promedio, P95)
   - ¿Cuántos usuarios concurrentes esperados? (mín/promedio/pico)
   - ¿Throughput esperado? (TPS/RPM)
   - ¿Crecimiento de datos esperado? (año 1/2/3)

---

🔒 SEGURIDAD
================================================================================

✅ ENCONTRADO:
   - Autenticación: JWT (jsonwebtoken)
   - Password hashing: bcrypt (10 rounds)
   - Validación de entrada: express-validator
   - Security headers: Helmet configurado
   - CORS: Habilitado (origins: localhost:3000, app.com)

❓ PREGUNTAR:
   - ¿Nivel de seguridad requerido? (básico/medio/alto/crítico)
   - ¿Datos sensibles que maneja? (PII, financieros, salud, etc.)
   - ¿Cumplimiento normativo necesario? (GDPR, PCI-DSS, HIPAA, etc.)

---

[... continuar con todas las categorías de RNF ...]

```

---

## FASE 3: GENERAR YAML PARA FORMULARIO

Genera un YAML en consola **compatible con el sistema de formularios** usando SOLO preguntas tipo `select`, `radio`, `checkbox`, `text` y `textarea`.
Este yaml contendra preguntas de cosas que encontraste pero necesitas confirmar
Cosas que no encontraste y sabes que son muy imporantes
El formato yaml es asi
**Formato EXACTO:**

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

1. **MAXIMIZA extracción automática** → Analiza TODO el código exhaustivamente
2. **DETALLA CADA FUNCIONALIDAD** → Un RF por cada endpoint/operación detectada
3. **MINIMIZA preguntas** → Solo pregunta lo IMPOSIBLE de determinar del código 
4. **USA SOLO TIPOS DE FORMULARIO VÁLIDOS**:
   - `select` → Opciones mutuamente excluyentes
   - `radio` → Sí/No o pocas opciones
   - `checkbox` → Múltiples opciones
   - `text` → Texto corto (números, listas simples)
   - `textarea` → Texto largo (descripciones, listas detalladas)
5. **INCLUYE VALORES INFERIDOS** → Si puedes deducir algo del código, repórtalo
6. **CATEGORIZA CORRECTAMENTE** → Solo incluye secciones donde falte información
7. **NO GENERES ARCHIVOS** → Solo output en consola + YAML


---

## OUTPUT ESPERADO

1. **Reporte en consola** con análisis corto, solo cosas mas importantes MAXIMO DIEZ LINEAS POR PROBLEMAS DE TOKENS EN EL OUTPUT
2. **YAML para formulario** con SOLO las preguntas necesarias
3. **NO generar archivos markdown** (eso será después con las respuestas + 02-salida.md)

# 🔍 Prompt de Análisis - Documentación de Deployment e Infraestructura

## ROL
Eres un **Senior DevOps Architect y Site Reliability Engineer** experto en análisis de infraestructura cloud-native.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para documentar la arquitectura de **deployment, CI/CD y monitoreo**.

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** hallazgos en consola (NO generar archivos)
3. **Generar** YAML con preguntas categorizadas en 3 niveles:
   - ✅ **YA_SABEMOS**: Información encontrada con certeza en el código
   - ⚠️ **VALIDAR**: Información parcial que requiere confirmación
   - ❓ **NO_SABEMOS**: Información que no está en el código

## ARCHIVOS DE SALIDA (se generarán en siguiente prompt)
- `ai_docs/06-infraestructura/01-deployment.md`
- `ai_docs/06-infraestructura/02-ci-cd.md`
- `ai_docs/06-infraestructura/03-monitoreo.md`

---

## FASE 1: ANÁLISIS EXHAUSTIVO DEL WORKSPACE

Examina **todos los archivos** del proyecto (`@workspace`) buscando evidencia de:

### 🐳 **Contenedorización**
**Archivos a buscar:**
- `Dockerfile`, `Dockerfile.*` (dev, prod, staging)
- `docker-compose.yml`, `docker-compose.*.yml`
- `.dockerignore`

**Qué analizar:**
- Imagen base (FROM)
- Puertos expuestos (EXPOSE, ports:)
- Variables de entorno (ENV, environment:)
- Volúmenes montados
- Multi-stage builds
- Comandos de inicio (CMD, ENTRYPOINT)
- Servicios en docker-compose (db, redis, cache, etc.)

---

### ☁️ **Cloud Provider**
**Archivos a buscar:**
- `terraform/` o `.tf` files → Revisar `provider` blocks
- `cloudformation/` o `.yaml` templates
- `pulumi/`, `cdk/`
- `.bluemix/`, `manifest.yml` (IBM Cloud)
- `app.yaml`, `cloudbuild.yaml` (GCP)
- ARM templates, Bicep files (Azure)
- `.aws/`, AWS CLI configs

**Qué analizar:**
- Provider declarado en IaC
- Servicios cloud referenciados (S3, RDS, Cloud Storage, etc.)
- SDKs instalados (aws-sdk, @google-cloud, ibm-cloud-sdk)

---

### ☸️ **Orquestación (Kubernetes)**
**Archivos a buscar:**
- `k8s/`, `kubernetes/`, `manifests/`
- `charts/`, `Chart.yaml`, `values.yaml` (Helm)
- `kustomization.yaml` (Kustomize)
- `deployment.yaml`, `service.yaml`, `ingress.yaml`
- `configmap.yaml`, `secret.yaml`

**Qué analizar:**
- Deployments: replicas, estrategia (RollingUpdate), resource limits
- Services: tipo (ClusterIP, LoadBalancer, NodePort)
- Ingress: hosts, paths, TLS
- Namespaces utilizados
- Helm charts y valores customizados

---

### 🔄 **CI/CD Pipeline**
**Archivos a buscar:**
- `.github/workflows/*.yml` (GitHub Actions)
- `.gitlab-ci.yml` (GitLab CI)
- `Jenkinsfile` (Jenkins)
- `.circleci/config.yml` (CircleCI)
- `azure-pipelines.yml` (Azure DevOps)
- `.travis.yml` (Travis CI)
- `.bluemix/toolchain.yml`, `pipeline.yml` (IBM Toolchain)

**Qué analizar:**
- **Stages/Jobs** del pipeline (build, test, deploy, etc.)
- **Triggers** (push, PR, schedule)
- **Ambientes** donde se despliega (dev, staging, prod)
- **Deploy automático** o manual (approval gates)
- **Estrategia Git** (GitFlow, trunk-based, feature branches)
- **Artefactos** generados (Docker images, binaries, packages)
- **Secrets** utilizados (API keys, tokens, credentials)

---

### 🗄️ **Base de Datos**
**Archivos a buscar:**
- `package.json` → Dependencias (pg, mysql2, mongodb, sequelize, prisma)
- `requirements.txt` → Paquetes (psycopg2, pymongo, sqlalchemy)
- `pom.xml`, `build.gradle` → JDBC drivers
- `prisma/schema.prisma`, `migrations/`
- `alembic/`, `flyway/` (migration tools)
- `.env.example`, `config/database.js`

**Qué analizar:**
- **Tipo de BD**: PostgreSQL, MySQL, MongoDB, Redis, etc.
- **ORM/ODM**: Prisma, TypeORM, Sequelize, SQLAlchemy
- **Migraciones**: Tool usado, ubicación de archivos
- **Conexión**: Variables de env (DATABASE_URL, DB_HOST, etc.)

---

### 📊 **Monitoreo y Observabilidad**
**Archivos a buscar:**
- `prometheus.yml`, ServiceMonitor CRDs
- `grafana/`, dashboards JSON
- `datadog.yaml`, referencias a DD_API_KEY
- `newrelic.yml`, NEW_RELIC_LICENSE_KEY
- Sentry config (`sentry.properties`, SENTRY_DSN)
- Logging libraries (winston, bunyan, logrus, python logging)

**Qué analizar:**
- **APM/Métricas**: Prometheus, Datadog, New Relic, CloudWatch
- **Logging**: Centralized logging (ELK, Splunk, CloudWatch Logs)
- **Error tracking**: Sentry, Rollbar, Bugsnag
- **Alerting**: Configuraciones de alertas, canales (Slack, email, PagerDuty)
- **Tracing**: OpenTelemetry, Jaeger, Zipkin

---

### 🌍 **Ambientes y Configuración**
**Archivos a buscar:**
- `.env.example`, `.env.development`, `.env.production`
- `config/`, archivos por ambiente (development.js, production.js)
- Scripts de deployment (`deploy.sh`, `scripts/deploy-*.sh`)

**Qué analizar:**
- **Ambientes disponibles**: dev, staging, qa, prod
- **URLs/Endpoints** por ambiente
- **Variables de entorno** críticas
- **Secrets management**: AWS Secrets Manager, IBM Key Protect, Vault

---

### 🔒 **Seguridad y Networking**
**Archivos a buscar:**
- Security groups en IaC
- Ingress/Egress rules
- SSL/TLS certificates config
- WAF rules (AWS WAF, Cloudflare)

**Qué analizar:**
- **Load Balancer**: Tipo (ALB, NLB, CLB), listeners
- **Certificados SSL**: Let's Encrypt, ACM, gestión manual
- **WAF**: Configurado o no
- **Firewall**: Security groups, network policies

---

### 📈 **Escalabilidad y Alta Disponibilidad**
**Archivos a buscar:**
- Autoscaling configs (HPA en K8s, ASG en AWS)
- Resource limits en manifests
- README.md sección de deployment

**Qué analizar:**
- **Tipo de escalamiento**: Horizontal (más instancias), Vertical (más recursos)
- **Autoscaling**: Configurado, métricas (CPU, memoria, custom)
- **Min/Max instancias**
- **Multi-AZ**, **Multi-region**
- **Health checks**, **Liveness/Readiness probes**

---

## FASE 2: GENERAR REPORTE EN CONSOLA

**⚠️ NO GENERES ARCHIVOS**. Muestra el análisis directamente aquí en formato estructurado:

```
================================================================================
📊 ANÁLISIS DE INFRAESTRUCTURA - [NOMBRE_PROYECTO]
================================================================================

🐳 CONTENEDORIZACIÓN
✅ ENCONTRADO:
   - Dockerfile: Sí
   - Imagen base: node:18-alpine
   - Puerto: 3000
   - docker-compose.yml: Sí, servicios: app, postgres, redis

❓ PREGUNTAR:
   - ¿En qué ambientes se usa Docker? (dev, test, staging, prod)
   - ¿Dónde se almacenan las imágenes? (Docker Hub, ECR, GCR, etc.)

---

☁️ CLOUD PROVIDER
✅ ENCONTRADO:
   - Terraform con provider AWS
   - Servicios: EC2, RDS, S3

❓ PREGUNTAR:
   - ¿Qué región de AWS?
   - ¿Es multi-cloud o solo AWS?

---

[... continuar con todas las categorías ...]
```

---

## FASE 3: GENERAR YAML PARA FORMULARIO

Genera un YAML **compatible con el sistema de formularios** usando SOLO preguntas tipo `select`, `radio`, `checkbox` y `text`.

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

1. **MAXIMIZA extracción automática** → Muestra TODO lo que encuentres en el reporte de consola
2. **MINIMIZA preguntas** → Solo pregunta lo IMPOSIBLE de determinar del código
3. **USA SOLO TIPOS DE FORMULARIO VÁLIDOS**:
   - `select` → Opciones mutuamente excluyentes
   - `radio` → Sí/No o pocas opciones
   - `checkbox` → Múltiples opciones
   - `text` → Texto corto (nombres, IDs)
   - `textarea` → Texto largo (URLs, configuraciones)
4. **SIEMPRE incluye opción "No sé / A investigar"** cuando sea aplicable
5. **CATEGORIZA CORRECTAMENTE** → Solo incluye secciones donde falte información
6. **NO GENERES ARCHIVOS** → Solo output en consola + YAML
7. **EL YAML SE USARÁ EN FORMULARIO WEB** → Debe ser compatible con `prompt-builder-clean.js`

---

## OUTPUT ESPERADO

1. **Reporte en consola** con análisis categorizado (✅ ENCONTRADO / ❓ PREGUNTAR)
2. **YAML para formulario** con SOLO las preguntas necesarias
3. **NO generar archivos markdown** (eso será después con las respuestas + 02-salida.md)

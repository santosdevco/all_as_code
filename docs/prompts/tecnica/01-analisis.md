# 🔍 Prompt de Análisis - Documentación Técnica

## ROL
Eres un **Technical Writer Senior y Arquitecto de Software** experto en documentación técnica exhaustiva.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para crear **documentación técnica completa**: stack, modelo de datos, APIs e integraciones.

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** hallazgos en consola (NO generar archivos)
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
title: "🚀 Deployment - [NOMBRE_PROYECTO]"
description: "Yaml de ejemplo genera preguntas que concideres, que no puedas inferir del codigo."

sections:
  # ============================================
  # SOLO INCLUIR SECCIONES DONDE FALTE INFO
  # ============================================
  
  - icon: "☁️"
    title: "Cloud Provider"
    description: "Información sobre el proveedor cloud"
    questions:
      # ❓ Pregunta sobre qué encontraste parcialmente
      - id: cloudProvider
        type: checkbox
        label: "¿Qué cloud providers usa el proyecto?"
        options:
          - value: aws
            label: "AWS"
          - value: gcp
            label: "GCP"
          - value: azure
            label: "Azure"
          - value: ibm
            label: "IBM Cloud"
          - value: onpremise
            label: "On-Premise"
        help: "Se detectó AWS en Terraform. Confirma si hay otros providers."
      
      - id: awsRegion
        type: select
        label: "Región principal de AWS:"
        options:
          - value: us-east-1
            label: "us-east-1 (N. Virginia)"
          - value: us-west-2
            label: "us-west-2 (Oregon)"
          - value: eu-west-1
            label: "eu-west-1 (Irlanda)"
          - value: nolose
            label: "No sé / A investigar"
        help: "Región donde corre producción"
  
  - icon: "🚀"
    title: "Plataforma de Deployment"
    questions:
      - id: deployPlatform
        type: select
        label: "¿Dónde se ejecuta en producción?"
        options:
          - value: kubernetes
            label: "Kubernetes"
          - value: ecs
            label: "AWS ECS"
          - value: vm
            label: "Máquinas Virtuales"
          - value: nolose
            label: "No sé / A investigar"
  
  - icon: "🔄"
    title: "CI/CD"
    questions:
      - id: cicdTool
        type: radio
        label: "Herramienta de CI/CD:"
        options:
          - value: github-actions
            label: "GitHub Actions"
          - value: gitlab-ci
            label: "GitLab CI"
          - value: jenkins
            label: "Jenkins"
          - value: noaplica
            label: "No hay CI/CD configurado"
        help: "No se detectó archivo de CI/CD. Confirma cuál usan."
      
      - id: autoDeploy
        type: radio
        label: "¿Deploy automático a producción?"
        options:
          - value: si
            label: "Sí, automático"
          - value: manual
            label: "No, requiere aprobación manual"
          - value: nolose
            label: "No sé / A investigar"
  
  - icon: "🌍"
    title: "Ambientes y URLs"
    questions:
      - id: environments
        type: checkbox
        label: "¿Qué ambientes existen?"
        options:
          - value: dev
            label: "Development"
          - value: staging
            label: "Staging"
          - value: prod
            label: "Production"
      
      - id: envUrls
        type: textarea
        label: "URLs de los ambientes:"
        placeholder: |
          Dev: https://dev.miapp.com
          Staging: https://staging.miapp.com
          Prod: https://miapp.com
        help: "Una URL por línea"
  
  - icon: "📊"
    title: "Monitoreo"
    questions:
      - id: monitoring
        type: checkbox
        label: "Herramientas de monitoreo:"
        options:
          - value: prometheus
            label: "Prometheus + Grafana"
          - value: datadog
            label: "Datadog"
          - value: newrelic
            label: "New Relic"
          - value: cloudwatch
            label: "CloudWatch"
          - value: noaplica
            label: "No hay monitoreo configurado"
        help: "No se detectó monitoreo. ¿Se usa alguno?"
      
      - id: hasAlerting
        type: radio
        label: "¿Hay alertas configuradas?"
        options:
          - value: si
            label: "Sí"
          - value: no
            label: "No"
          - value: nolose
            label: "No sé / A investigar"
  
  - icon: "🗄️"
    title: "Base de Datos"
    questions:
      - id: dbProvider
        type: select
        label: "Proveedor de base de datos:"
        options:
          - value: rds
            label: "AWS RDS"
          - value: cloud-sql
            label: "Google Cloud SQL"
          - value: self-hosted
            label: "Auto-gestionada (en VMs)"
          - value: nolose
            label: "No sé / A investigar"
        help: "Se detectó PostgreSQL. ¿Dónde está alojada?"
      
      - id: hasBackups
        type: radio
        label: "¿Backups automáticos configurados?"
        options:
          - value: si
            label: "Sí"
          - value: no
            label: "No"
          - value: nolose
            label: "No sé / A investigar"

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

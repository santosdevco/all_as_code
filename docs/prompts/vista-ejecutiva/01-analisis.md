# 🔍 Prompt de Análisis - Vista Ejecutiva

## ROL
Eres un **Business Analyst Senior** experto en traducir sistemas técnicos a lenguaje de negocio para stakeholders ejecutivos.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para crear documentación de **Vista Ejecutiva** dirigida a C-level, Product Owners y stakeholders no técnicos.

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** hallazgos en consola (NO generar archivos)
3. **Generar** YAML con preguntas necesarias



## FASE 1: ANÁLISIS EXHAUSTIVO

Examina **todos los archivos** del proyecto (`@workspace`) buscando:

### 📋 **Información de Negocio**

**Archivos clave:**
- `README.md`, `docs/`, `CHANGELOG.md`
- `package.json` → description, keywords
- Comentarios en código con contexto de negocio
- Issues, PRs (si hay acceso)
- Tests → nombres descriptivos de funcionalidades

**Qué extraer:**
- **Problema que resuelve**: ¿Qué pain point atiende?
- **Propuesta de valor**: ¿Cómo mejora el negocio?
- **Dominio de negocio**: Fintech, Healthcare, E-commerce, etc.
- **Usuarios objetivo**: Roles, perfiles
- **Casos de uso principales**: Top 5-10 funcionalidades desde perspectiva de negocio
- **Métricas mencionadas**: KPIs, SLAs, objetivos cuantitativos

---

### 👥 **Usuarios y Roles**

**Analizar:**
- Middleware de autenticación → roles detectados (admin, user, manager, etc.)
- Rutas protegidas → qué rol accede a qué funcionalidad
- Frontend → componentes por tipo de usuario
- Tests → describe("Como [ROL]...")

**Extraer:**
- Tipos de usuarios del sistema
- Jerarquía de permisos
- Casos de uso por rol

---

### 🌐 **Sistemas Externos e Integraciones**

**Detectar:**
- APIs consumidas (payment gateways, CRMs, ERPs, etc.)
- Servicios cloud (AWS S3, SendGrid, Twilio, etc.)
- Dependencias críticas para operación
- Webhooks entrantes/salientes

**Categorizar por impacto:**
- Crítico: Sistema no funciona sin esto
- Importante: Funcionalidad limitada sin esto
- Opcional: Feature adicional

---

### 📊 **Arquitectura de Alto Nivel**

**Identificar componentes principales:**
- Frontend (si existe)
- Backend/API
- Base de datos
- Cache
- Message queues
- Workers/Background jobs

**Simplificar a nivel ejecutivo:**
- "Aplicación web" en vez de "React SPA"
- "Base de datos" en vez de "PostgreSQL 15 con Prisma ORM"
- "Sistema de pagos" en vez de "Stripe API v2023-10"

---

### ⚠️ **Riesgos y Dependencias**

**Inferir de:**
- Dependencias externas sin fallback
- Single points of failure
- Tecnologías legacy o descontinuadas
- Integraciones sin error handling robusto
- Ausencia de tests en áreas críticas

---

## FASE 2: REPORTE EN CONSOLA

Muestra el análisis así:

```
================================================================================
📊 ANÁLISIS DE VISTA EJECUTIVA - [NOMBRE_PROYECTO]
================================================================================

🎯 PROPÓSITO DEL SISTEMA
✅ ENCONTRADO:
   - Descripción: [del README/package.json]
   - Dominio: [inferido]
   - Problema que resuelve: [inferido del contexto]

❓ PREGUNTAR:
   - ¿Cuáles son los objetivos estratégicos del negocio?
   - ¿Qué métricas de éxito se están midiendo actualmente?

---

👥 USUARIOS Y ROLES
✅ ENCONTRADO:
   - [N] tipos de usuarios detectados: [lista]
   - Casos de uso principales: [top 5]

❓ PREGUNTAR:
   - ¿Qué beneficios tangibles obtiene cada tipo de usuario?
   - ¿Cuál es el perfil demográfico/profesional de cada rol?

---

🌐 INTEGRACIONES CRÍTICAS
✅ ENCONTRADO:
   - [Servicio 1]: [propósito inferido]
   - [Servicio 2]: [propósito inferido]

❓ PREGUNTAR:
   - ¿Qué impacto tiene cada integración en el negocio?
   - ¿Hay planes de reemplazar alguna integración?

---

⚠️ RIESGOS TÉCNICOS IDENTIFICADOS
   - [Riesgo 1]: [descripción]
   - [Riesgo 2]: [descripción]

❓ PREGUNTAR:
   - ¿Cuál es la tolerancia al riesgo del negocio?
   - ¿Hay presupuesto asignado para mitigación de riesgos?
```

---

## FASE 3: GENERAR YAML

Genera un YAML **solo con las preguntas necesarias** siguiendo este formato:

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

# NO incluir template aquí - el template se agregará automáticamente
# al unir las respuestas con el prompt de salida (02-salida.md)
```


---

## REGLAS CRÍTICAS

1. **MAXIMIZA** extracción del código → Infiere todo lo posible
2. **MINIMIZA** preguntas → Solo lo imposible de inferir
3. **USA lenguaje de NEGOCIO** → No tecnicismos en el reporte
4. **Adapta el YAML** → Solo pregunta lo que realmente necesitas confirmar
5. **NO GENERES ARCHIVOS** → Solo reporte + YAML en consolaa

---

## OUTPUT ESPERADO

1. **Reporte en consola** con hallazgos de negocio
2. **YAML** con preguntas necesarias (máximo 10-15 preguntas)
3. **NO generar archivos markdown**

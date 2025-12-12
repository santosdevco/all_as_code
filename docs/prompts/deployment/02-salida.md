# 📝 Especificación de Salida - Documentación de Deployment

## CONTEXTO

Recibirás la información completa del proyecto que incluye:

1. **Análisis automático** del código (lo que se encontró en archivos)
2. **Respuestas del equipo** (lo que no estaba en el código)

---

## TAREA: Generar 3 Archivos de Documentación

Con toda la información proporcionada, genera exactamente estos 3 archivos:

---

## ARCHIVO 1: `ai_docs/06-infraestructura/01-deployment.md`

### Estructura requerida:

```markdown
# Deployment - [NOMBRE_PROYECTO]

## 📊 Diagrama de Arquitectura

[Genera diagrama Mermaid mostrando la arquitectura completa]

**Componentes:**
- Usuario/Internet
- Load Balancer (especificar tipo)
- Instancias de aplicación (cantidad, tipo)
- Base de datos (tipo, managed/self-hosted)
- Servicios externos
- Zonas de disponibilidad (si aplica)

## 🌍 Ambientes

### Development
- **URL**: [URL proporcionada]
- **Configuración**: [Detalles específicos]
- **Acceso**: [Cómo acceder]

### Staging
- **URL**: [URL proporcionada]
- **Configuración**: [Diferencias con prod]
- **Uso**: Testing pre-producción

### Production
- **URL**: [URL proporcionada]
- **Configuración**: [Especificaciones]
- **Alta disponibilidad**: [Estrategias]

## 📦 Contenedorización

### Docker

**Dockerfile** (`[ubicación]`):
- **Imagen base**: `[imagen]`
- **Puerto expuesto**: `[puerto]`
- **Variables de entorno críticas**:
  ```
  [Listar variables del .env.example]
  ```

**Docker Compose** (si aplica):
- **Servicios**:
  - `app`: [Descripción]
  - `[otros servicios]`: [Descripción]

**Registry**: [AWS ECR / Docker Hub / etc]
- **Repositorio**: `[URL del registry]`
- **Naming**: `[proyecto]:[tag]`

## ☸️ Orquestación Kubernetes

**Cluster**: [EKS / GKE / AKS / on-prem]
- **Nombre**: `[nombre-cluster]`
- **Región**: `[región]`
- **Versión**: `[versión K8s]`

**Namespace**: `[namespace]`

### Deployment
```yaml
# Extracto relevante del deployment
replicas: [N]
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: [N]
    maxUnavailable: [N]
```

**Resource Limits**:
- CPU: `[límites]`
- Memory: `[límites]`

### Service
- **Tipo**: `[ClusterIP / LoadBalancer / NodePort]`
- **Puerto**: `[puerto]`

### Ingress
- **Host**: `[dominio]`
- **TLS**: ✅ / ❌
- **Certificado**: [Let's Encrypt / ACM / manual]

## 📈 Escalabilidad

### Horizontal Pod Autoscaler (HPA)
```yaml
minReplicas: [N]
maxReplicas: [N]
metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: [N]%
```

### Estrategias de HA
- [Listar estrategias: Multi-AZ, multi-región, etc.]

## 🔒 Seguridad y Networking

### Load Balancer
- **Tipo**: [ALB / NLB / CLB]
- **Listeners**: 
  - HTTP (80) → HTTPS redirect
  - HTTPS (443) → Target Group

### Certificados SSL/TLS
- **Gestión**: [Let's Encrypt / AWS ACM / manual]
- **Renovación**: [Automática / manual]

### WAF
- **Configurado**: ✅ / ❌
- **Reglas**: [Si aplica, listar reglas principales]

### Security Groups / Firewall
**Inbound**:
- 80/TCP: HTTP (redirect a HTTPS)
- 443/TCP: HTTPS
- [Otros puertos necesarios]

**Outbound**:
- Permitir todo (o especificar restricciones)

## 💾 Persistencia y Backups

### Base de Datos
- **Tipo**: [PostgreSQL / MySQL / MongoDB]
- **Provider**: [AWS RDS / Cloud SQL / auto-gestionado]
- **Versión**: `[versión]`
- **Instancia**: `[tipo de instancia]`

### Backups
- **Automáticos**: ✅ / ❌
- **Frecuencia**: [diario / cada 6h / etc]
- **Retención**: [7 días / 30 días / etc]
- **Restore**: [Proceso de restauración]

### Migraciones
- **Tool**: [Prisma / Flyway / Alembic / etc]
- **Ubicación**: `[directorio]`
- **Aplicación**: 
  ```bash
  [Comando para aplicar migraciones]
  ```

## 🏗️ Infraestructura como Código

- **Tool**: [Terraform / CloudFormation / Pulumi]
- **Ubicación**: `[directorio]`
- **Proveedor**: [AWS / GCP / Azure / IBM Cloud]

**Comandos principales**:
```bash
# Inicializar
[comando init]

# Plan
[comando plan]

# Apply
[comando apply]
```

---

## ARCHIVO 2: `ai_docs/06-infraestructura/02-ci-cd.md`

### Estructura requerida:

```markdown
# CI/CD Pipeline - [NOMBRE_PROYECTO]

## 🛠️ Herramienta

**Platform**: [GitHub Actions / GitLab CI / Jenkins / etc]
**Archivo**: `[ruta al archivo de config]`

## 📊 Diagrama del Pipeline

[Genera flowchart Mermaid mostrando el flujo completo]

**Stages**:
1. Trigger (push, PR, merge)
2. [Stage 1]: [Descripción]
3. [Stage 2]: [Descripción]
4. ...
5. Deploy
6. Verificación
7. Rollback (si falla)

## ⚙️ Stages Detallados

### 1. [Nombre del Stage]
**Qué hace**: [Descripción]

**Comandos ejecutados**:
```bash
[Comandos del stage]
```

**Artefactos generados**: [Listar]

**Tiempo estimado**: ~[X] minutos

**Se ejecuta cuando**: [Condiciones]

---

[Repetir para cada stage]

---

### Deploy a Staging
**Trigger**: Automático en merge a `develop`

**Pasos**:
1. [Paso 1]
2. [Paso 2]
3. ...

**Verificación post-deploy**:
- Health check en `[URL]`
- Smoke tests
- [Otros checks]

---

### Deploy a Production
**Trigger**: [Manual / Automático] en merge a `[branch]`

**Approval Gate**: ✅ / ❌ [Si requiere aprobación manual]

**Pasos**:
1. [Paso 1]
2. [Paso 2]
3. ...

**Estrategia de deploy**: [Blue/Green / Rolling / Canary]

## 🌿 Estrategia de Branching

**Modelo**: [GitFlow / Trunk-based / GitHub Flow]

**Branches principales**:
- `main`: Producción
- `develop`: Desarrollo
- `feature/*`: Features
- `hotfix/*`: Hotfixes

**Protecciones**:
- `main`: Requiere PR review, CI passing
- `develop`: Requiere CI passing

**Merge strategy**: [Squash / Rebase / Merge commit]

## 🚀 Proceso de Deployment

### Flujo completo

```
Developer → Commit → Push → CI Pipeline
                              ↓
                         [Tests pass?]
                              ↓
                    [Build Docker image]
                              ↓
                    [Push to registry]
                              ↓
                    [Deploy to staging]
                              ↓
                    [Smoke tests]
                              ↓
               [Approval for prod] (si aplica)
                              ↓
                    [Deploy to prod]
                              ↓
               [Health checks + monitoring]
```

### Rollback

**Trigger**: [Automático si falla health check / Manual]

**Proceso**:
```bash
[Comandos o procedimiento de rollback]
```

## 🔐 Secrets y Variables

### Secrets
Almacenados en: [GitHub Secrets / GitLab CI/CD Variables / Jenkins Credentials]

**Lista de secrets**:
- `AWS_ACCESS_KEY_ID`: Acceso a AWS
- `AWS_SECRET_ACCESS_KEY`: Secret de AWS
- `DOCKER_USERNAME`: Usuario registry
- `DOCKER_PASSWORD`: Password registry
- `DATABASE_URL`: URL de BD (por ambiente)
- [Otros secrets]

### Variables de Entorno

**Por ambiente**:

**Development**:
```
NODE_ENV=development
LOG_LEVEL=debug
[Otras variables]
```

**Staging**:
```
NODE_ENV=staging
LOG_LEVEL=info
[Otras variables]
```

**Production**:
```
NODE_ENV=production
LOG_LEVEL=error
[Otras variables]
```

### Rotación de Credentials
**Frecuencia**: [Mensual / Trimestral / Anual]
**Proceso**: [Describir proceso]

---

## ARCHIVO 3: `ai_docs/06-infraestructura/03-monitoreo.md`

### Estructura requerida:

```markdown
# Monitoreo y Observabilidad - [NOMBRE_PROYECTO]

## 🛠️ Stack de Herramientas

[SI HAY MONITOREO CONFIGURADO:]

### APM y Métricas
- **[Datadog / New Relic / Prometheus]**: [Descripción]
- **Dashboards**: [URLs de acceso]

### Logs Centralizados
- **[ELK / Splunk / CloudWatch Logs]**: [Descripción]
- **Retención**: [Periodo]

### Error Tracking
- **[Sentry / Rollbar]**: [Descripción]
- **DSN**: `[DSN o config]`

---

[SI NO HAY MONITOREO:]

## ⚠️ Monitoreo No Configurado

**RECOMENDACIONES CRÍTICAS:**

### 1. Métricas de Aplicación (URGENTE)

**Opciones recomendadas**:

**Opción A: Prometheus + Grafana** (Open Source)
- **Pros**: Gratuito, flexible, estándar industria
- **Cons**: Requiere gestión de infraestructura
- **Setup**: [Guía rápida]

**Opción B: Datadog** (SaaS)
- **Pros**: Listo para usar, soporte completo
- **Cons**: Costo mensual
- **Setup**: [Guía rápida]

**Opción C: New Relic** (SaaS)
- **Pros**: APM completo, fácil integración
- **Cons**: Costo
- **Setup**: [Guía rápida]

### 2. Logs Centralizados (ALTA PRIORIDAD)

[Recomendar según cloud provider]

**Para AWS**:
- CloudWatch Logs (integración nativa)

**Para GCP**:
- Google Cloud Logging

**Para on-prem/multi-cloud**:
- ELK Stack (Elasticsearch + Logstash + Kibana)

### 3. Error Tracking (RECOMENDADO)

**Sentry** (recomendado):
```bash
npm install @sentry/node
# o
pip install sentry-sdk
```

**Configuración mínima**:
```javascript
// Para Node.js
Sentry.init({ dsn: "YOUR_DSN" });
```

---

[SI SÍ HAY MONITOREO:]

## 📈 Métricas Monitoreadas

### Infraestructura
- **CPU**: % utilización por instancia/pod
- **Memoria**: Uso y límites
- **Disco**: Espacio disponible, IOPS
- **Red**: Throughput in/out, latencia

### Aplicación
- **Request Rate**: Requests por minuto (RPM)
- **Response Time**: 
  - p50: `[valor]`
  - p95: `[valor]`
  - p99: `[valor]`
- **Error Rate**: % de requests con error
- **Throughput**: Requests procesados exitosamente

### Base de Datos
- **Conexiones activas**: Actual vs máximo
- **Query Performance**: Slow queries
- **Locks**: Lock waits
- **Replication Lag**: (si aplica)

### Métricas de Negocio (Custom)
[Listar métricas específicas del negocio, ej:]
- Usuarios activos
- Transacciones por hora
- Tasa de conversión
- [Otras métricas]

## 🚨 Alertas

**Configuradas**: ✅ / ❌

[SI HAY ALERTAS:]

**Canales**: [Slack / Email / PagerDuty / etc]

### Alertas Críticas (P0/P1)

**1. [Nombre de alerta]**
- **Condición**: [Trigger condition]
- **Threshold**: [Valor]
- **Acción**: [Qué hacer]
- **Escalation**: [A quién notificar]

**2. [Otra alerta]**
[...]

### Alertas de Warning (P2/P3)
[Listar alertas no críticas]

### On-Call Rotation
[Si existe, describir rotación y procedimientos]

---

[SI NO HAY ALERTAS:]

### Alertas Recomendadas

**Configurar inmediatamente**:
1. **High Error Rate**: Error rate > 5% por 5 minutos
2. **High Latency**: p95 > 1s por 5 minutos
3. **CPU/Memory High**: > 80% por 10 minutos
4. **Database Connections**: > 90% del límite
5. **Disk Space**: < 20% disponible

---

## 📝 Logs

### Estrategia de Logging

**Niveles utilizados**:
- `ERROR`: Errores que afectan funcionalidad
- `WARN`: Situaciones anormales pero recuperables
- `INFO`: Información importante (inicios, shutdowns)
- `DEBUG`: Información detallada para debugging (solo en dev)

**Formato**: [JSON / Plain text]

**Campos incluidos**:
- timestamp
- level
- message
- context (user_id, request_id, etc.)
- [Otros campos]

### Centralización
- **Sistema**: [ELK / Splunk / CloudWatch Logs]
- **Retención**: [7 días / 30 días / 90 días]
- **Acceso**: [URL o procedimiento]

### Búsqueda y Análisis
**Queries comunes**:
```
[Ejemplos de queries útiles]
```

## 🔍 Tracing Distribuido

[SI HAY TRACING:]
- **Herramienta**: [Jaeger / Zipkin / Datadog APM / New Relic]
- **Configuración**: [Detalles]
- **Service Map**: [URL o ubicación]

[SI NO HAY:]
**Recomendación**: Implementar OpenTelemetry para tracing distribuido

## 📊 Dashboards

### Dashboard de Overview
- **URL**: `[URL]`
- **Métricas principales**:
  - Request rate
  - Error rate
  - Latency (p50, p95, p99)
  - Apdex score

### Dashboard por Servicio
[Listar dashboards específicos]

### SLIs y SLOs

**SLI (Service Level Indicators)**:
- Availability: [X]%
- Latency p95: < [X]ms
- Error rate: < [X]%

**SLO (Service Level Objectives)**:
- Uptime: [X]% mensual
- [Otros objetivos]

**SLA (Service Level Agreements)**: [Si aplica]

---

```

---

## REGLAS CRÍTICAS PARA LA GENERACIÓN

1. **USA TODA LA INFORMACIÓN PROPORCIONADA** → Está completa arriba (análisis + respuestas)
2. **SÉ ESPECÍFICO Y TÉCNICO** → Usa valores reales, no placeholders genéricos
3. **GENERA DIAGRAMAS MERMAID** → Usa la sintaxis correcta de Mermaid
4. **MARCA INCERTIDUMBRES** → Si algo aún no está claro, usa `[⚠️ VALIDAR: ...]`
5. **CITA ARCHIVOS** → Referencia archivos específicos cuando menciones configuraciones
6. **USA SECCIONES CONDICIONALES** → Si no hay monitoreo, incluye recomendaciones; si hay, documéntalo
7. **CREA LA CARPETA** → Ejecuta `mkdir -p ai_docs/06-infraestructura/` antes de generar archivos
8. **GUARDA AUTOMÁTICAMENTE** → Genera y guarda los 3 archivos sin pedir confirmación
9. **NO INVENTES** → Si una información no fue proporcionada, márcala como [⚠️ PENDIENTE]

---

## VALIDACIONES FINALES

Antes de entregar, verifica:
- ✅ Los 3 archivos fueron creados en `ai_docs/06-infraestructura/`
- ✅ Todos los diagramas Mermaid tienen sintaxis válida
- ✅ No hay placeholders sin completar (excepto los marcados con ⚠️ VALIDAR)
- ✅ Las URLs, comandos y configuraciones son específicas del proyecto
- ✅ Se integraron todas las respuestas del YAML
- ✅ El contenido es útil y accionable para el equipo de DevOps

---

## OUTPUT

Los 3 archivos markdown completos, guardados en `ai_docs/06-infraestructura/`:
1. `01-deployment.md`
2. `02-ci-cd.md`
3. `03-monitoreo.md`

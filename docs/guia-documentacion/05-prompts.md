# 🤖 Prompts para Agentes IA

## 🎯 Objetivo

Proporcionar prompts estructurados y probados para que los agentes de IA generen documentación consistente, completa y de alta calidad siguiendo el formato estándar de la organización.

---

## ⚠️ REGLAS CRÍTICAS DE FORMATO (Leer Primero)

Antes de ejecutar cualquier prompt, asegúrate de incluir estas reglas en tu conversación con el agente IA:

### 📝 Regla #1: Saltos de Línea Antes de Listas

**Problema**: Markdown no renderiza listas correctamente si no hay una línea en blanco antes.

❌ **INCORRECTO**:
```markdown
A continuación:
- Elemento 1
- Elemento 2
```

✅ **CORRECTO**:
```markdown
A continuación:

- Elemento 1
- Elemento 2
```

**Instrucción para IA**: "SIEMPRE deja una línea en blanco antes de cualquier lista (-, *, 1., etc.)"

---

### 🎨 Regla #2: Comillas en Labels de Mermaid

**Problema**: Mermaid genera errores de sintaxis cuando los labels tienen espacios o caracteres especiales sin comillas.

❌ **INCORRECTO**:
```mermaid
graph TB
    A[Web App React] --> B[API Gateway]
    C[Order Service] --> D[(Base de Datos)]
```

✅ **CORRECTO**:
```mermaid
graph TB
    A["Web App React"] --> B["API Gateway"]
    C["Order Service"] --> D[("Base de Datos")]
```

**Regla Simple**: Si el label tiene:

- Espacios
- Acentos (á, é, í, ó, ú, ñ)
- Símbolos especiales (-, +, /, etc.)
- Saltos de línea (`<br/>`)

→ **DEBE estar entre comillas dobles**

**Instrucción para IA**: "En diagramas Mermaid, SIEMPRE usa comillas dobles en labels que contengan espacios, acentos, símbolos o `<br/>`"

---

### 📋 Checklist Pre-Prompt

Antes de copiar un prompt al agente IA, verifica:

- [ ] Has leído estas reglas críticas
- [ ] Vas a recordarle al agente estas reglas en tu mensaje
- [ ] Tienes acceso al repositorio del proyecto
- [ ] Has ejecutado los prompts anteriores (si aplica)

---

## 📋 Índice de Prompts

| Prompt | Objetivo | Output Esperado |
|--------|----------|-----------------|
| [01 - Análisis Inicial](#prompt-01-análisis-inicial-del-proyecto) | Entender el proyecto | Resumen ejecutivo |
| [02 - Vista Ejecutiva](#prompt-02-generar-vista-ejecutiva) | Documentación para stakeholders | `01-vista-ejecutiva.md` |
| [03 - Arquitectura C4](#prompt-03-generar-arquitectura-c4) | Diagramas de arquitectura | `02-arquitectura/*.md` |
| [04 - Documentación Técnica](#prompt-04-generar-documentación-técnica) | APIs, modelos, stack | `03-tecnico/*.md` |
| [05 - Procesos de Negocio](#prompt-05-generar-procesos-de-negocio) | Casos de uso y flujos | `04-procesos-negocio/*.md` |
| [06 - Infraestructura](#prompt-06-generar-documentación-de-infraestructura) | DevOps y deployment | `05-infraestructura/*.md` |
| [07 - ADRs](#prompt-07-generar-adrs) | Decisiones de arquitectura | `02-arquitectura/04-decisiones.md` |

---

## 🎬 Flujo de Trabajo Completo

```mermaid
flowchart LR
    Start([Proyecto a Documentar]) --> P01[Prompt 01<br/>Análisis Inicial]
    P01 --> Review1{Revisar<br/>Output}
    Review1 -->|OK| P02[Prompt 02<br/>Vista Ejecutiva]
    Review1 -->|Ajustar| P01
    
    P02 --> P03[Prompt 03<br/>Arquitectura C4]
    P03 --> P04[Prompt 04<br/>Docs Técnica]
    P04 --> P05[Prompt 05<br/>Procesos Negocio]
    P05 --> P06[Prompt 06<br/>Infraestructura]
    P06 --> P07[Prompt 07<br/>ADRs]
    
    P07 --> Integrate[Integrar al Hub Central]
    Integrate --> End([Documentación Completa])
    
    style Start fill:#4caf50,color:#fff
    style End fill:#2196f3,color:#fff
    style P01 fill:#ff9800,color:#fff
    style Review1 fill:#ffa726,color:#fff
```

---

## 🔍 Prompt 01: Análisis Inicial del Proyecto

### Objetivo
Que el agente entienda el proyecto, su propósito, tecnologías y estructura antes de generar documentación.

### Contexto Requerido
- Acceso al repositorio del proyecto
- README.md (si existe)
- Archivos de configuración (package.json, requirements.txt, etc.)

### Prompt

```
# ROL
Eres un Arquitecto de Software Senior con 15+ años de experiencia analizando proyectos para crear documentación técnica de arquitectura. Tu especialidad es entender sistemas complejos rápidamente y comunicarlos de forma clara.

# CONTEXTO
Vas a analizar un proyecto de software para generar documentación estandarizada siguiendo el formato de la organización. Este es el primer paso: entender el proyecto.

# PROYECTO
Repositorio: [RUTA_DEL_REPOSITORIO]

# TAREA
Analiza el proyecto y genera un reporte ejecutivo de análisis con la siguiente estructura:

## 1. Identificación del Proyecto

- **Nombre del Proyecto**: [Inferir del package.json, README, o nombre del repositorio]
- **Tipo de Proyecto**: [Web App / Mobile App / API / Microservicio / CLI Tool / Librería / etc.]
- **Propósito Principal**: [En una frase, qué hace este sistema]

## 2. Stack Tecnológico

### Backend
- **Lenguaje principal**: [Ej: Node.js, Python, Java, etc.]
- **Framework**: [Ej: Express, FastAPI, Spring Boot, etc.]
- **Base de datos**: [Ej: PostgreSQL, MongoDB, MySQL, etc.]
- **ORM/ODM**: [Ej: Prisma, TypeORM, SQLAlchemy, etc.]

### Frontend (si aplica)
- **Framework**: [Ej: React, Vue, Angular, etc.]
- **Lenguaje**: [JavaScript, TypeScript]
- **Build Tool**: [Vite, Webpack, etc.]

### Infraestructura y DevOps
- **Containerización**: [Docker, Podman, etc.]
- **Orquestación**: [Docker Compose, Kubernetes, etc.]
- **CI/CD**: [GitHub Actions, GitLab CI, Jenkins, etc.]
- **Cloud Provider**: [AWS, GCP, Azure, On-Premise]

### Otras Tecnologías Relevantes
- [Cache: Redis, Memcached]
- [Message Queue: RabbitMQ, Kafka]
- [Monitoring: Prometheus, Datadog]
- etc.

## 3. Estructura del Proyecto

Analiza la estructura de carpetas y describe:

- **Patrón de arquitectura**: [MVC, Clean Architecture, Hexagonal, Microservicios, Monolito Modular, etc.]
- **Organización de código**: [Descripción de carpetas principales]
- **Puntos de entrada**: [Archivos principales: index.js, main.py, etc.]

## 4. Integraciones Identificadas

Lista sistemas externos con los que este proyecto se integra:

- [Nombre del sistema/API externa]: [Propósito de la integración]
- [Ejemplo: Stripe API]: [Procesamiento de pagos]

## 5. Modelo de Datos Preliminar

Identifica las entidades principales del dominio:

- [Entidad 1]: [Breve descripción]
- [Entidad 2]: [Breve descripción]

## 6. Casos de Uso Evidentes

Lista 3-5 casos de uso principales que identificas:

1. [Caso de uso 1]
2. [Caso de uso 2]
3. [Caso de uso 3]

## 7. Observaciones y Preguntas

- [Cualquier cosa que no esté clara]
- [Decisiones arquitectónicas que notes]
- [Puntos que requieren clarificación]

# FORMATO DE SALIDA
- Usa Markdown estándar
- Sé específico y concreto
- Si algo no está claro, márcalo como [REQUIERE CLARIFICACIÓN]
- Prioriza hechos sobre suposiciones

# REGLAS CRÍTICAS DE FORMATO

## Listas en Markdown
⚠️ **MUY IMPORTANTE**: SIEMPRE deja una línea en blanco antes de cualquier lista.

❌ **INCORRECTO**:
```
A continuación:
- Elemento 1
- Elemento 2
```

✅ **CORRECTO**:
```
A continuación:

- Elemento 1
- Elemento 2
```

## Diagramas Mermaid
⚠️ **MUY IMPORTANTE**: SIEMPRE usa comillas dobles en labels que contengan espacios o caracteres especiales.

❌ **INCORRECTO**:
```mermaid
graph TB
    A[Web App React] --> B[API Gateway]
    C[Order Service] --> D[(Base de Datos)]
```

✅ **CORRECTO**:
```mermaid
graph TB
    A["Web App React"] --> B["API Gateway"]
    C["Order Service"] --> D[("Base de Datos")]
```

**Regla**: Si un label tiene espacios, acentos, símbolos especiales, o saltos de línea (`<br/>`), DEBE estar entre comillas dobles.

# RESTRICCIONES
- NO generes código
- NO hagas suposiciones sin evidencia en el código
- SI encuentras múltiples opciones posibles, lista todas
- Enfócate en HECHOS verificables del código
```

### Ejemplo de Output Esperado

```markdown
## 1. Identificación del Proyecto

- **Nombre del Proyecto**: E-commerce Platform API
- **Tipo de Proyecto**: REST API / Backend Service
- **Propósito Principal**: API backend para plataforma de comercio electrónico B2C

## 2. Stack Tecnológico

### Backend
- **Lenguaje principal**: Node.js 18.x
- **Framework**: Express.js 4.18
- **Base de datos**: PostgreSQL 15
- **ORM/ODM**: Prisma 5.x

### Frontend
- No aplica (API pura)

### Infraestructura y DevOps
- **Containerización**: Docker
- **Orquestación**: Docker Compose
- **CI/CD**: GitHub Actions
- **Cloud Provider**: AWS (evidenciado por configuración de S3 y RDS)

### Otras Tecnologías Relevantes
- Cache: Redis 7.x
- Message Queue: RabbitMQ 3.x
- Authentication: JWT (jsonwebtoken)
- Email: SendGrid API
- Payments: Stripe API

[...]
```

---

## 📊 Prompt 02: Generar Vista Ejecutiva

### Objetivo
Crear el documento de Vista Ejecutiva orientado a stakeholders no técnicos.

### Contexto Requerido
- Output del Prompt 01 (Análisis Inicial)
- Conversación con Product Owner o Tech Lead (opcional pero recomendado)

### Prompt

```
# ROL
Eres un Business Analyst y Arquitecto de Soluciones que traduce sistemas técnicos complejos a lenguaje de negocio para stakeholders ejecutivos.

# CONTEXTO
Has analizado el proyecto [NOMBRE_PROYECTO] y ahora debes crear la documentación de Vista Ejecutiva siguiendo el formato estándar de la organización.

# INPUT
Usa el siguiente análisis del proyecto:

[PEGAR AQUÍ EL OUTPUT DEL PROMPT 01]

# INFORMACIÓN ADICIONAL DEL PRODUCT OWNER
[Si tienes información de negocio, métricas, KPIs, objetivos estratégicos, pégalos aquí]

# TAREA
Genera el archivo `01-vista-ejecutiva.md` con la siguiente estructura ESTRICTA:

```markdown
# 📊 Vista Ejecutiva: [Nombre del Proyecto]

## 🎯 Resumen Ejecutivo

[3-4 párrafos respondiendo:
1. ¿Qué problema de negocio resuelve?
2. ¿Cómo lo resuelve? (alto nivel, SIN tecnicismos)
3. ¿Qué valor aporta a la organización?
4. ¿Cuáles son las métricas de éxito?]

---

## 💼 Valor de Negocio

### Objetivos Estratégicos

- **Objetivo 1**: [Inferir o usar información del PO]
- **Objetivo 2**: [...]
- **Objetivo 3**: [...]

### Métricas de Éxito (KPIs)

| Métrica | Objetivo | Actual | Estado |
|---------|----------|--------|--------|
| [Ej: Usuarios activos mensuales] | [10,000] | [Si conoces el dato actual] | ⚠️ |
| [Ej: Tiempo promedio de transacción] | [< 2 min] | [REQUIERE DATO] | ⚠️ |

[NOTA: Si no tienes datos reales, marca como "REQUIERE DATO" para revisión humana]

---

## 👥 Usuarios y Casos de Uso Principales

[Identifica del código los tipos de usuarios y sus casos de uso principales]

### Usuario Tipo 1: [Nombre del Rol]

**Perfil:** [Descripción]

**Casos de Uso:**
1. [Caso de uso 1]
2. [Caso de uso 2]

**Beneficios:**
- [Beneficio tangible 1]
- [Beneficio tangible 2]

---

## 📊 Vista General del Sistema

### Contexto del Sistema

```mermaid
graph TB
    %% IMPORTANTE: Genera un diagrama C4 NIVEL 1 (Contexto)
    %% - Una sola caja para el sistema principal
    %% - Usuarios como actores
    %% - Sistemas externos con línea punteada
    %% - Máximo 7 elementos
```

**Descripción:** [Explica el diagrama en lenguaje de negocio, SIN tecnicismos]

---

## ⚠️ Riesgos y Dependencias

### Riesgos Principales

[Identifica riesgos basándote en las integraciones y tecnologías críticas]

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| [Ej: Dependencia de API externa X] | Media | Alto | [Ej: Implementar circuit breaker y cache] |

### Dependencias Críticas

- **[Sistema/Servicio 1]**: [Por qué es crítico]
- **[Sistema/Servicio 2]**: [Por qué es crítico]

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: [FECHA_ACTUAL YYYY-MM-DD]</small>
</div>
```

# REGLAS ESTRICTAS

## Formato Markdown
1. USA EXACTAMENTE la estructura markdown proporcionada
2. ⚠️ **CRÍTICO**: Deja una línea en blanco ANTES de cada lista
3. NO inventes métricas - si no las conoces, marca como "REQUIERE DATO"
4. USA lenguaje de NEGOCIO, no técnico (no menciones "microservicios", "API REST", etc.)
5. Máximo 3 páginas cuando se renderice
6. INCLUYE emojis en los títulos según el formato

## Diagramas Mermaid
7. ⚠️ **CRÍTICO**: SIEMPRE usa comillas dobles en labels con espacios o caracteres especiales
8. El diagrama Mermaid debe ser C4 NIVEL 1 (contexto) solamente
9. Ejemplo correcto: `A["Web App"]` en vez de `A[Web App]`
10. Si usas `<br/>` en labels, DEBE estar entre comillas: `A["App<br/>React"]`

# OUTPUT
Devuelve SOLO el contenido del archivo markdown, sin explicaciones adicionales.
```

---

## 🏗️ Prompt 03: Generar Arquitectura C4

### Objetivo
Crear los documentos de arquitectura con diagramas C4 niveles 1, 2 y 3.

### Prompt

```
# ROL
Eres un Arquitecto de Software especializado en modelado C4 y documentación de arquitectura.

# CONTEXTO
Vas a generar la documentación de arquitectura del proyecto [NOMBRE_PROYECTO] siguiendo el modelo C4 (Context, Containers, Components, Code).

# INPUT
Análisis del proyecto:
[PEGAR OUTPUT DEL PROMPT 01]

# TAREA
Genera 3 archivos de documentación de arquitectura:

## ARCHIVO 1: `02-arquitectura/01-contexto.md`

```markdown
# 🌐 Arquitectura - Nivel 1: Contexto

## 🎯 Objetivo

Mostrar el sistema en su contexto, identificando usuarios y sistemas externos con los que interactúa.

---

## 📊 Diagrama de Contexto (C4 - Nivel 1)

```mermaid
graph TB
    %% Usuarios/Actores
    [Usuario1][👤 Nombre del Usuario]
    [Usuario2][👤 Otro Usuario]
    
    subgraph "Nuestro Sistema"
        Sistema[🏢 [Nombre del Sistema]]
    end
    
    %% Sistemas Externos
    ExtSys1[🌐 [Sistema Externo 1]<br/>[Proveedor]]
    ExtSys2[💾 [Sistema Externo 2]<br/>[Proveedor]]
    
    %% Relaciones
    Usuario1 -->|[acción]| Sistema
    Sistema -->|[propósito]| ExtSys1
    
    %% Estilos
    style Sistema fill:#1e88e5,color:#fff,stroke:#fff,stroke-width:3px
    style ExtSys1 fill:#999,stroke:#333,stroke-dasharray: 5
    style ExtSys2 fill:#999,stroke:#333,stroke-dasharray: 5
```

**Interpretación:**
[Explica el diagrama: quiénes son los usuarios, qué hace el sistema, con qué sistemas externos se integra y por qué]

---

## 👥 Actores del Sistema

### [Tipo de Usuario 1]
**Rol:** [Descripción]
**Interacciones:** [Qué hace con el sistema]

### [Tipo de Usuario 2]
[...]

---

## 🔗 Sistemas Externos

### [Sistema Externo 1] - [Proveedor]
**Propósito:** [Para qué se usa]
**Tipo de integración:** [REST API / SOAP / gRPC / Message Queue / etc.]
**Criticidad:** Alta / Media / Baja

[...]

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: [FECHA_ACTUAL]</small>
</div>
```

## ARCHIVO 2: `02-arquitectura/02-contenedores.md`

[Genera siguiendo el mismo patrón pero con diagrama C4 NIVEL 2]
[Muestra: Web App, Mobile App, API Services, Databases, Caches, Message Queues]
[Incluye tecnologías y versiones en cada contenedor]

## ARCHIVO 3: `02-arquitectura/03-componentes.md`

[Genera diagrama C4 NIVEL 3 para el componente más complejo/importante]
[Muestra la estructura interna: Controllers, Services, Repositories, etc.]

# REGLAS CRÍTICAS DE FORMATO

## Markdown
⚠️ **MUY IMPORTANTE**: Deja una línea en blanco ANTES de cada lista.

## Diagramas Mermaid
⚠️ **MUY IMPORTANTE**: SIEMPRE usa comillas dobles en labels con espacios o caracteres especiales.

### Niveles C4
1. C4 Nivel 1: Solo una caja para tu sistema, máximo 7 elementos totales
2. C4 Nivel 2: Muestra aplicaciones, servicios, bases de datos, caches
3. C4 Nivel 3: Muestra componentes internos de UN servicio específico

### Sintaxis de Labels
- ✅ CORRECTO: `WebApp["Web Application<br/>React + TypeScript"]`
- ❌ INCORRECTO: `WebApp[Web Application<br/>React + TypeScript]`
- ✅ CORRECTO: `API["API Gateway"]`
- ❌ INCORRECTO: `API[API Gateway]`
- **Regla**: Si tiene espacios, acentos, símbolos o `<br/>`, DEBE tener comillas dobles

### Colores Consistentes
- Sistema propio: #1e88e5 (azul)
- Externos: #999 con stroke-dasharray: 5 (gris punteado)
- Frontend: #42a5f5 (azul claro)
- Backend: #66bb6a (verde)
- Database: #ffa726 (naranja)
- Cache: #ef5350 (rojo)
- Auth: #ab47bc (morado)

### Otras Reglas
- Incluye TECNOLOGÍA y VERSIÓN en contenedores nivel 2
- Usa subgraph para agrupar elementos relacionados

# OUTPUT
Devuelve los 3 archivos markdown separados claramente.
```

---

## 💻 Prompt 04: Generar Documentación Técnica

### Objetivo
Generar documentación técnica detallada: Stack, Modelo de Datos, APIs, Integraciones.

### Prompt

```
# ROL
Eres un Technical Writer especializado en documentación de APIs y arquitectura de software.

# CONTEXTO
Vas a generar la documentación técnica detallada del proyecto [NOMBRE_PROYECTO].

# INPUT
[PEGAR OUTPUT DEL PROMPT 01]

# ACCESO AL CÓDIGO
Tienes acceso completo al repositorio para analizar:
- Rutas/endpoints definidos
- Modelos de datos/esquemas de base de datos
- Configuraciones de APIs externas
- Archivos de migración de BD

# TAREA
Genera 4 archivos:

## ARCHIVO 1: `03-tecnico/01-stack-tecnologico.md`

Documenta TODO el stack con versiones específicas y justificación:

```markdown
# ⚙️ Stack Tecnológico

## Backend

### Runtime y Lenguaje
- **Node.js**: v18.17.0
  - **Por qué**: [Justificación basada en el contexto del proyecto]
- **TypeScript**: v5.1.6
  - **Por qué**: [Justificación]

### Framework Web
- **Express.js**: v4.18.2
  - **Por qué**: [...]

[Continuar con TODAS las tecnologías identificadas]
```

## ARCHIVO 2: `03-tecnico/02-modelo-datos.md`

```markdown
# 💾 Modelo de Datos

## 📊 Diagrama Entidad-Relación

```mermaid
erDiagram
    %% ANALIZA el código y genera el ERD COMPLETO
    %% Incluye TODAS las tablas/colecciones
    %% Marca PK, FK, UK correctamente
    %% Incluye tipos de datos y constraints
```

## Entidades

### [Entidad 1]

**Descripción:** [Qué representa en el dominio del negocio]

**Campos:**

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Identificador único |
| [campo2] | [tipo] | [constraints] | [descripción] |

**Relaciones:**
- [relación con otra entidad]

**Índices:**
- [listar índices importantes]

[Repetir para TODAS las entidades identificadas en el código]
```

## ARCHIVO 3: `03-tecnico/03-apis.md`

[Documenta TODOS los endpoints que encuentres en el código]
[Usa el formato de plantilla de API documentation]
[Incluye request/response examples reales del código]

## ARCHIVO 4: `03-tecnico/04-integraciones.md`

[Documenta todas las integraciones con sistemas externos]
[Incluye: qué servicio, para qué se usa, cómo se autentican, rate limits si los conoces]

# REGLAS CRÍTICAS

## Formato Markdown
⚠️ **MUY IMPORTANTE**: Deja una línea en blanco ANTES de cada lista.

## Diagramas Mermaid (ERD)
⚠️ **MUY IMPORTANTE**: Usa comillas dobles en nombres de entidades/campos con espacios.

Ejemplo correcto:
```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ "ORDER_ITEM" : contains
```

## Validación de Información
1. NO inventes información - todo debe venir del código fuente
2. Si usas un ORM, analiza los modelos/schemas
3. Para APIs, busca archivos de rutas (routes/, controllers/, handlers/)
4. Para el modelo de datos, busca migraciones, schemas, models/
5. Marca como [REQUIERE VERIFICACIÓN] si algo no está claro
6. Incluye ejemplos de código REALES del proyecto cuando sea relevante

# OUTPUT
Los 4 archivos markdown completos.
```

---

## 🔄 Prompt 05: Generar Procesos de Negocio

### Objetivo
Documentar casos de uso y flujos funcionales con diagramas de secuencia.

### Prompt

```
# ROL
Eres un Analista de Negocio que documenta procesos funcionales y casos de uso.

# CONTEXTO
Analizar los flujos de negocio del proyecto [NOMBRE_PROYECTO] y documentarlos de forma que los stakeholders de negocio los entiendan.

# INPUT
[PEGAR OUTPUT DEL PROMPT 01]

# TAREA
Genera 2 archivos:

## ARCHIVO 1: `04-procesos-negocio/01-casos-uso.md`

Identifica del código los 5-10 casos de uso principales y documéntalos:

```markdown
# 📋 Casos de Uso

## Caso de Uso 1: [Nombre]

**Actores:** [Quién participa]
**Precondiciones:** [Qué debe ser cierto antes]
**Trigger:** [Qué inicia este flujo]

**Flujo Principal:**
1. [Paso 1]
2. [Paso 2]
3. [...]

**Flujo Alternativo - [Escenario]:**
1a. [Si ocurre X, entonces...]

**Postcondiciones:** [Estado del sistema después]
**Reglas de Negocio:**
- [Regla 1]
- [Regla 2]
```

## ARCHIVO 2: `04-procesos-negocio/02-flujos-funcionales.md`

Genera diagramas de SECUENCIA para los 3 flujos más importantes:

```markdown
# 🔄 Flujos Funcionales

## Flujo 1: [Nombre del Proceso]

```mermaid
sequenceDiagram
    %% Genera el diagrama basándote en el CÓDIGO REAL
    %% Analiza controllers, services, y cómo fluyen las llamadas
    %% Incluye TODOS los participantes relevantes
```

**Descripción del Flujo:**
[Explica paso a paso qué sucede]

**Validaciones:**
- [Qué se valida en cada paso]

**Casos de Error:**
- [Qué puede fallar y cómo se maneja]

---
```

# REGLAS CRÍTICAS DE FORMATO

## Markdown
⚠️ **MUY IMPORTANTE**: Deja una línea en blanco ANTES de cada lista.

## Diagramas de Secuencia en Mermaid
⚠️ **MUY IMPORTANTE**: Usa comillas dobles en nombres de participantes con espacios.

Ejemplos:
- ✅ CORRECTO: `participant API as "API Gateway"`
- ❌ INCORRECTO: `participant API as API Gateway`
- ✅ CORRECTO: `W->>A: POST /api/orders<br/>{items, payment}`
- ⚠️ NOTA: Los textos en flechas generalmente NO necesitan comillas

## Instrucciones para Diagramas
1. Analiza el código de los endpoints principales
2. Sigue el flujo real de llamadas (Controller → Service → Repository → DB)
3. Incluye validaciones y llamadas a APIs externas
4. Muestra casos de error con notas
5. Usa `actor` para usuarios humanos
6. Usa flechas sólidas (->> o ->>) para llamadas síncronas
7. Usa flechas punteadas (-->> o -->>) para respuestas

# OUTPUT
Los 2 archivos markdown completos.
```

---

## 🚀 Prompt 06: Generar Documentación de Infraestructura

### Objetivo
Documentar deployment, CI/CD, monitoreo.

### Prompt

```
# ROL
Eres un DevOps Engineer/SRE documentando la infraestructura y procesos operacionales.

# CONTEXTO
Documentar la infraestructura y estrategia de deployment del proyecto [NOMBRE_PROYECTO].

# INPUT
[PEGAR OUTPUT DEL PROMPT 01]

# ARCHIVOS A ANALIZAR
- Dockerfile, docker-compose.yml
- Archivos de CI/CD (.github/workflows/, .gitlab-ci.yml, etc.)
- Archivos de infraestructura como código (terraform/, cloudformation/, k8s/)
- Scripts de deployment

# TAREA
Genera 3 archivos:

## ARCHIVO 1: `05-infraestructura/01-deployment.md`

```markdown
# 🚀 Arquitectura de Deployment

## 📊 Diagrama de Infraestructura

```mermaid
graph TB
    %% Genera diagrama basado en docker-compose, k8s manifests, o configuración cloud
    %% Muestra: Load Balancers, Servers/Containers, Databases, Redes
    %% Incluye subnets, security groups si es cloud
```

## Ambientes

### Desarrollo
[Configuración del ambiente local]

### Staging
[Si existe, configuración]

### Producción
[Configuración de producción]

## Escalabilidad
[Cómo escala horizontalmente/verticalmente]

## Alta Disponibilidad
[Estrategia de HA, si existe]

## Backups
[Estrategia de backup y recovery]
```

## ARCHIVO 2: `05-infraestructura/02-ci-cd.md`

[Documenta el pipeline basado en archivos de CI/CD]
[Incluye diagrama del pipeline como flowchart]
[Explica cada etapa: build, test, security scan, deploy]

## ARCHIVO 3: `05-infraestructura/03-monitoreo.md`

[Documenta estrategia de monitoreo, logs, alertas]
[Si hay Prometheus, Grafana, Datadog, New Relic, etc.]

# OUTPUT
Los 3 archivos markdown completos.
```

---

## 📜 Prompt 07: Generar ADRs

### Objetivo
Documentar decisiones de arquitectura importantes basándote en el análisis del código.

### Prompt

```
# ROL
Eres un Arquitecto de Software Senior documentando decisiones arquitectónicas (Architecture Decision Records - ADRs).

# CONTEXTO
Basándote en el análisis del proyecto [NOMBRE_PROYECTO], vas a inferir y documentar las decisiones de arquitectura más relevantes.

# INPUT
[PEGAR OUTPUT DEL PROMPT 01 y también de los prompts de arquitectura]

# TAREA
Genera el archivo: `02-arquitectura/04-decisiones.md`

Identifica las 5-8 decisiones arquitectónicas más significativas del proyecto y documéntalas usando el formato ADR estándar.

Ejemplos de decisiones a documentar:
- Elección de stack tecnológico (ej: "Por qué Node.js y no Python")
- Patrón de arquitectura (ej: "Microservicios vs Monolito")
- Elección de base de datos (ej: "PostgreSQL vs MongoDB")
- Estrategia de autenticación (ej: "JWT vs Sessions")
- Uso de cache (ej: "Implementar Redis para cache")

```markdown
# 🏗️ Decisiones de Arquitectura (ADRs)

## 📋 Índice de Decisiones

| ID | Título | Estado | Fecha |
|----|--------|--------|-------|
| ADR-001 | [Título] | Aceptada ✅ | [Inferir de git history o poner fecha actual] |
| ADR-002 | [Título] | Aceptada ✅ | [...] |

---

## ADR-001: [Título de la Decisión]

**Estado:** Aceptada ✅

**Fecha:** [YYYY-MM-DD]

**Contexto:**
[Explica POR QUÉ se tomó esta decisión. Qué problema resolvía, qué restricciones había]

**Decisión:**
[QUÉ se decidió hacer específicamente]

**Alternativas Consideradas:**

### Alternativa 1: [Nombre]
**Pros:**
- [Ventaja 1]

**Contras:**
- [Desventaja 1]

**Razón de rechazo:** [Por qué NO se eligió]

### Alternativa 2: [...]

**Consecuencias:**

✅ **Positivas:**
- [Consecuencia positiva]

⚠️ **Negativas (Trade-offs):**
- [Consecuencia negativa o compromiso]

---

[Repetir para cada ADR identificado]
```

# IMPORTANTE
- INFIERE las decisiones basándote en lo que ves en el código
- Si no estás seguro del contexto, usa lenguaje como "Aparentemente se decidió X porque..."
- Marca con [REQUIERE VALIDACIÓN POR EQUIPO] las partes donde hiciste suposiciones
- Las ADRs deben ser sobre DECISIONES SIGNIFICATIVAS, no trivialidades

# OUTPUT
El archivo markdown completo con todas las ADRs identificadas.
```

---

## ✅ Checklist de Generación de Documentación

Antes de considerar la documentación completa, verifica:

- [ ] **Prompt 01 ejecutado** - Análisis inicial completo
- [ ] **Prompt 02 ejecutado** - Vista Ejecutiva generada y revisada
- [ ] **Prompt 03 ejecutado** - Diagramas C4 (L1, L2, L3) generados
- [ ] **Prompt 04 ejecutado** - Docs técnica (Stack, Modelo, APIs, Integraciones)
- [ ] **Prompt 05 ejecutado** - Casos de uso y flujos de secuencia
- [ ] **Prompt 06 ejecutado** - Infraestructura y DevOps
- [ ] **Prompt 07 ejecutado** - ADRs documentados
- [ ] **Revisión humana** - Alguien del equipo ha revisado la documentación
- [ ] **Correcciones aplicadas** - Datos marcados como "REQUIERE DATO" han sido completados
- [ ] **Diagramas validados** - Los diagramas Mermaid renderizan correctamente
- [ ] **mkdocs.yml actualizado** - La navegación incluye el nuevo proyecto
- [ ] **Integrado al Hub** - La carpeta docs/ se copió al proyecto central

---

## 🔄 Mantenimiento de Documentación

### Cuándo Re-ejecutar los Prompts

- **Cambio mayor de arquitectura**: Re-ejecutar Prompts 03, 07
- **Nuevas APIs/Endpoints**: Re-ejecutar Prompt 04
- **Cambio de infraestructura**: Re-ejecutar Prompt 06
- **Nuevos casos de uso**: Re-ejecutar Prompt 05
- **Cambios de stack**: Re-ejecutar Prompt 04

### Prompt de Actualización Incremental

```
# ROL
Eres un Technical Writer actualizando documentación existente.

# CONTEXTO
El proyecto [NOMBRE_PROYECTO] ha tenido cambios y su documentación debe actualizarse.

# CAMBIOS RECIENTES
[Describir qué cambió: nuevo endpoint, nueva integración, cambio de infraestructura, etc.]

# DOCUMENTOS EXISTENTES
[Pegar la sección específica que necesita actualizarse]

# TAREA
Actualiza SOLO la sección afectada manteniendo el formato estándar. No regeneres todo.

# OUTPUT
Solo la sección actualizada en markdown.
```

---

## 💡 Tips para Mejores Resultados

1. **Prompt Chaining**: Ejecuta los prompts en orden secuencial
2. **Valida cada etapa**: Revisa el output antes de pasar al siguiente prompt
3. **Proporciona contexto rico**: Mientras más contexto des al agente, mejor resultado
4. **Itera**: Si el resultado no es satisfactorio, refina el prompt con más detalles
5. **Mantén coherencia**: Usa los mismos términos en todos los prompts
6. **Humaniza**: La IA genera el 90%, el humano valida y refina el 10%

---

## 🚀 Siguiente Paso

Continúa con **[Workflow de Integración](/guia-documentacion/06-workflow/)** para aprender cómo integrar la documentación generada al Hub Central.

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: 2025-12-10</small>
</div>

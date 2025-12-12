# 🤖 Prompts para Agentes IA

## 🎯 Objetivo

Proporcionar prompts listos para usar con GitHub Copilot (modo agente) que generen documentación consistente y completa siguiendo el formato estándar de la organización.

---

## 📊 Listado de Prompts Disponibles

!!! info "Total: 10 Prompts (9 Obligatorios + 1 Opcional)"

**PROMPTS OBLIGATORIOS** (ejecutar en orden para TODOS los proyectos):

| # | Nombre | Archivos Generados | Tiempo |
|---|--------|-------------------|--------|
| 01 | Análisis Inicial | `ai_docs/00-analisis-inicial.md` | 5-10 min |
| 02 | Vista Ejecutiva | `ai_docs/02-vista-ejecutiva.md` | 10-15 min |
| 03 | Arquitectura C4 | `ai_docs/03-arquitectura/*.md` (4 archivos) | 15-20 min |
| 04 | Stack Tecnológico | `ai_docs/04-tecnico/01-stack-tecnologico.md` | 10-15 min |
| 05 | Modelo de Datos | `ai_docs/04-tecnico/02-modelo-datos.md` | 10-15 min |
| 06 | Casos de Uso | `ai_docs/05-procesos-negocio/*.md` (2 archivos) | 15-20 min |
| 07 | Deployment | `ai_docs/06-infraestructura/*.md` (3 archivos) | 15-20 min |
| 08 | Decisiones Técnicas | `ai_docs/03-arquitectura/04-decisiones.md` | 10-15 min |
| 09 | Archivos de Repositorio | `README.md`, `CONTRIBUTING.md`, etc. | 10-15 min |

**PROMPTS OPCIONALES** (ejecutar solo si aplica):

| # | Nombre | Cuándo Usar | Archivos Generados | Tiempo |
|---|--------|-------------|-------------------|--------|
| 10 | API REST (OpenAPI/Swagger) | ✅ Solo si tu proyecto **ES una API REST** con endpoints HTTP | `openapi.yaml`, `swagger-ui.html`, `ai_docs/08-api-reference.md` | 10-15 min |

!!! warning "📍 Prompt 10 - Solo para APIs REST"
    **Ejecuta el Prompt 10 ÚNICAMENTE si:**
    
    ✅ Tu proyecto expone endpoints HTTP (GET, POST, PUT, DELETE, etc.)
    ✅ Quieres documentación interactiva tipo Swagger UI
    ✅ Otros equipos necesitan consumir tu API
    
    **NO ejecutes el Prompt 10 si:**
    
    ❌ Es una aplicación web frontend sin API backend propia
    ❌ Es un script, CLI o herramienta de línea de comandos
    ❌ Es una biblioteca/librería/package
    ❌ No tiene endpoints HTTP

---

## 🚀 CÓMO USAR ESTA GUÍA - Paso a Paso

### Flujo de Trabajo Simple

```mermaid
flowchart LR
    A["1️⃣ Abre el<br/>proyecto"] --> B["2️⃣ Selecciona<br/>el prompt"]
    B --> C["3️⃣ COMPLETA<br/>los campos<br/>⚠️ IMPORTANTE"]
    C --> D["4️⃣ Copia y pega<br/>en Copilot"]
    D --> E["5️⃣ Revisa el<br/>output"]
    
    style A fill:#4caf50,color:#fff
    style C fill:#ff5722,color:#fff
    style E fill:#2196f3,color:#fff
```

### Pasos Detallados

**1. Abre tu proyecto en VS Code**

```bash
cd /ruta/a/tu/proyecto
code .
```

**2. Abre GitHub Copilot en modo agente**

- Presiona `Ctrl+Shift+I` (o `Cmd+Shift+I` en Mac)

- O haz clic en el ícono de Copilot en la barra lateral

**3. Selecciona el prompt que necesitas**

- Empieza siempre con el **Prompt 01** (Análisis Inicial)

- Luego sigue el orden numérico

**4. ⚠️ IMPORTANTE: COMPLETA los campos antes de copiar**

Cada prompt tiene campos marcados con:

- `[COMPLETA AQUÍ: descripción]` → Debes reemplazar esto con tu información

- `[NOMBRE_PROYECTO]` → Nombre de tu proyecto

- `[URL_REPO]` → URL del repositorio

- Etc.

**5. Copia el prompt completo y pégalo en Copilot**

**6. Espera a que Copilot genere el documento**

**7. Revisa el output y guarda el archivo**

---

## 💡 Ejemplo Práctico: Cómo Completar un Prompt

### ❌ INCORRECTO - No copies así

```
# CONTEXTO
Estás analizando el proyecto: [COMPLETA: Nombre del proyecto]
Ruta del repositorio: [COMPLETA: Ruta del repositorio]
```

### ✅ CORRECTO - Completa PRIMERO los campos

```
# CONTEXTO
Estás analizando el proyecto: Sistema de Gestión de Pedidos
Ruta del repositorio: /home/santos/proyectos/pedidos-api
```

### 📝 Cómo Hacerlo

1. **Copia el prompt a un editor de texto** (Notepad, VS Code, etc.)

2. **Busca** todas las ocurrencias de `[COMPLETA:...]`

3. **Reemplaza** con tu información real

4. **Copia** el prompt completo ya modificado

5. **Pega** en GitHub Copilot

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
    A["Web App React"] --> B["API Gateway"]
    C["Order Service"] --> D["(Base de Datos)"]
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
| [02 - Requerimientos](#prompt-02-generar-análisis-de-requerimientos) | Requisitos funcionales y no funcionales | `01-requerimientos.md` |
| [03 - Vista Ejecutiva](#prompt-03-generar-vista-ejecutiva) | Documentación para stakeholders | `02-vista-ejecutiva.md` |
| [04 - Arquitectura C4](#prompt-04-generar-arquitectura-c4) | Diagramas de arquitectura | `03-arquitectura/*.md` |
| [05 - Documentación Técnica](#prompt-05-generar-documentación-técnica) | APIs, modelos, stack | `04-tecnico/*.md` |
| [06 - Procesos de Negocio](#prompt-06-generar-procesos-de-negocio) | Casos de uso y flujos | `05-procesos-negocio/*.md` |
| [07 - Infraestructura](#prompt-07-generar-documentación-de-infraestructura) | DevOps y deployment | `06-infraestructura/*.md` |
| [08 - ADRs](#prompt-08-generar-adrs) | Decisiones de arquitectura | `03-arquitectura/04-decisiones.md` |

---

## 🎬 Flujo de Trabajo Completo

```mermaid
flowchart LR
    Start(["Proyecto a Documentar"]) --> P01["Prompt 01<br/>Análisis Inicial"]
    P01 --> Review1{Revisar<br/>Output}
    Review1 -->|OK| P02["Prompt 02<br/>Requerimientos"]
    Review1 -->|Ajustar| P01
    
    P02 --> P03["Prompt 03<br/>Vista Ejecutiva"]
    P03 --> P04["Prompt 04<br/>Arquitectura C4"]
    P04 --> P05["Prompt 05<br/>Docs Técnica"]
    P05 --> P06["Prompt 06<br/>Procesos Negocio"]
    P06 --> P07["Prompt 07<br/>Infraestructura"]
    P07 --> P08["Prompt 08<br/>ADRs"]
    
    P08 --> Integrate["Integrar al Hub Central"]
    Integrate --> End(["Documentación Completa"])
    
    style Start fill:#4caf50,color:#fff
    style End fill:#2196f3,color:#fff
    style P01 fill:#ff9800,color:#fff
    style Review1 fill:#ffa726,color:#fff
```

---

## 🔍 Prompt 01: Análisis Inicial del Proyecto

### Objetivo
Que el agente entienda el proyecto, su propósito, tecnologías y estructura antes de generar documentación. **IMPORTANTE:** Este análisis se guardará en `ai_docs/00-analisis-inicial.md` para referencia futura.

### 📝 Información que Necesitas Antes de Ejecutar

Antes de copiar este prompt, asegúrate de:

- ✅ Tener el proyecto abierto en VS Code

- ✅ Conocer la ruta del repositorio

- 📂 Tener acceso a README.md y archivos de configuración

### 🔧 Campos a Completar ANTES de Copiar

Busca y reemplaza en el prompt:

1. `[COMPLETA: Nombre del proyecto]` → Ej: "E-commerce API" o inferir del repositorio

### 📋 Prompt (Copiar después de completar el campo)

```
# ROL
Eres un Arquitecto de Software Senior con 15+ años de experiencia analizando proyectos para crear documentación técnica de arquitectura. Tu especialidad es entender sistemas complejos rápidamente y comunicarlos de forma clara.

# CONTEXTO
Vas a analizar un proyecto de software para generar documentación estandarizada siguiendo el formato de la organización. Este es el primer paso: entender el proyecto completamente.

# PROYECTO
Nombre del proyecto: [COMPLETA: Nombre del proyecto]

IMPORTANTE: Usa @workspace para analizar todos los archivos del proyecto actual.

# TAREA
Analiza el proyecto y genera el archivo `ai_docs/00-analisis-inicial.md` con un análisis completo del proyecto.

Este análisis servirá como:
- ✅ Documentación base para referencia futura
- ✅ Validación de información para otros prompts
- ✅ Fuente de verdad para entender el proyecto

## ESTRUCTURA DEL ANÁLISIS:

## 1. Identificación del Proyecto

- **Nombre del Proyecto**: [Inferir del package.json, README, o nombre del repositorio]

- **Tipo de Proyecto**: [Web App / Mobile App / API / Microservicio / CLI Tool / Librería / etc.]

- **Propósito Principal**: [Descripción en 2-3 párrafos de qué hace este sistema y por qué existe]

- **Dominio de Negocio**: [E-commerce, Fintech, Salud, Educación, etc.]

## 2. Stack Tecnológico Completo

### Backend

- **Lenguaje principal**: [Ej: Node.js 18.x, Python 3.11, Java 17, etc.] + versión
- **Framework**: [Ej: Express 4.18, FastAPI 0.109, Spring Boot 3.x, etc.] + versión
- **Base de datos**: [Ej: PostgreSQL 15, MongoDB 6.0, MySQL 8.0, etc.] + versión
- **ORM/ODM**: [Ej: Prisma 5.x, TypeORM, SQLAlchemy, etc.] + versión

### Frontend (si aplica)

- **Framework**: [Ej: React 18.x, Vue 3.x, Angular 17, etc.] + versión
- **Lenguaje**: [JavaScript, TypeScript 5.x]
- **Build Tool**: [Vite 5.x, Webpack 5.x, etc.] + versión
- **Estilos**: [Tailwind, CSS Modules, Styled Components, etc.]

### Infraestructura y DevOps

- **Containerización**: [Docker 24.x, Podman, etc.]
- **Orquestación**: [Docker Compose, Kubernetes 1.28, etc.]
- **CI/CD**: [GitHub Actions, GitLab CI, Jenkins, etc.]
- **Cloud Provider**: [AWS, GCP, Azure, On-Premise] + servicios específicos

### Otras Tecnologías Relevantes

- **Cache**: [Redis 7.x, Memcached, etc.]
- **Message Queue**: [RabbitMQ, Kafka, SQS, etc.]
- **Monitoring**: [Prometheus, Datadog, New Relic, etc.]
- **Logging**: [Winston, Pino, ELK Stack, etc.]
- **Testing**: [Jest, Pytest, JUnit, etc.]

## 3. Análisis de Dependencias (NUEVO)

### Dependencias de Producción

Analiza el archivo de dependencias (package.json, requirements.txt, pom.xml, go.mod, etc.) y genera una tabla:

| Dependencia | Versión Actual | Última Versión | Estado | Propósito |
|-------------|----------------|----------------|--------|-----------|
| express | 4.18.2 | 4.18.2 | ✅ Actualizado | Framework web |
| prisma | 5.7.0 | 5.8.1 | ⚠️ Disponible 5.8.1 | ORM |
| lodash | 4.17.20 | 4.17.21 | ⚠️ Desactualizado | Utilidades |

**Análisis:**
- Total de dependencias de producción: [número]
- Dependencias actualizadas: [número y %]
- Dependencias con actualizaciones menores disponibles: [número]
- Dependencias con actualizaciones mayores disponibles: [número]
- ⚠️ Dependencias deprecadas (si las hay): [lista]

### Dependencias de Desarrollo

Lista las más importantes (no todas) con su propósito:

- [Nombre]: [Versión] - [Para qué se usa]

Ejemplo:
- typescript: 5.3.3 - Tipado estático
- jest: 29.7.0 - Testing
- eslint: 8.56.0 - Linting

### Vulnerabilidades Conocidas (si detectas)

⚠️ Si identificas dependencias con vulnerabilidades conocidas o muy desactualizadas, menciónalas:

- [Dependencia]: [Versión actual] → Problema: [descripción breve]

## 4. Estructura del Proyecto

### Patrón de Arquitectura

[MVC, Clean Architecture, Hexagonal, Microservicios, Monolito Modular, etc.]

### Árbol de Carpetas Principales

/
├── src/
│   ├── controllers/    - Controladores de rutas (descripción)
│   ├── services/       - Lógica de negocio (descripción)
│   ├── models/         - Modelos de datos (descripción)
│   ├── routes/         - Definición de rutas (descripción)
│   └── utils/          - Utilidades compartidas (descripción)
├── tests/              - Tests unitarios e integración
├── config/             - Archivos de configuración
└── docs/               - Documentación

### Archivos de Configuración Relevantes

Describe el propósito de cada archivo de configuración importante:

- **package.json / requirements.txt**: [Qué define, scripts importantes]
- **tsconfig.json**: [Configuración de TypeScript] (si aplica)
- **webpack.config.js / vite.config.ts**: [Configuración de build] (si aplica)
- **.env.example**: [Variables de entorno requeridas]
- **Dockerfile**: [Imagen base, puertos, comandos]
- **docker-compose.yml**: [Servicios definidos]
- **.github/workflows** o **.gitlab-ci.yml**: [Pipelines de CI/CD]
- **jest.config.js / pytest.ini**: [Configuración de tests]

### Puntos de Entrada

- **Archivo principal**: [index.js, main.py, App.java, etc.]
- **Puerto por defecto**: [3000, 8080, etc.]
- **Comando de inicio**: [npm start, python main.py, etc.]

## 5. Integraciones Identificadas

Lista sistemas externos con los que este proyecto se integra:

| Sistema Externo | Protocolo | Propósito | Autenticación |
|-----------------|-----------|-----------|---------------|
| Stripe API | REST | Procesamiento de pagos | API Key |
| SendGrid | REST | Envío de emails | API Key |
| Auth0 | OAuth2 | Autenticación de usuarios | Client Secret |

## 6. Modelo de Datos Preliminar

Identifica las entidades principales del dominio basándote en:
- Modelos/Entities del código
- Esquema de base de datos
- Migraciones

| Entidad | Descripción | Atributos Principales |
|---------|-------------|-----------------------|
| User | Usuario del sistema | id, email, name, role |
| Order | Pedido realizado | id, userId, total, status |
| Product | Producto en catálogo | id, name, price, stock |

## 7. Casos de Uso Evidentes

Lista 5-10 casos de uso principales que identificas del código:

1. **Registro de usuario**: Crear cuenta nueva con validación de email
2. **Autenticación**: Login con JWT
3. **Crear pedido**: Proceso completo desde carrito hasta pago
4. **Gestión de productos**: CRUD de productos (admin)
5. **Procesamiento de pagos**: Integración con Stripe

## 8. Ejecución Local (análisis preliminar)

### Prerequisitos

Lista lo que se necesita instalar:

- [Node.js 18+ / Python 3.11+ / Java 17+]
- [Docker / PostgreSQL / etc.]

### Pasos de Instalación (inferidos)

# Clonar repositorio
git clone [URL]

# Instalar dependencias
npm install  # o pip install -r requirements.txt, etc.

# Configurar variables de entorno
cp .env.example .env

# Ejecutar migraciones (si aplica)
npm run migrate

# Iniciar en desarrollo
npm run dev

## 9. Variables de Entorno Identificadas

Analiza el código y archivos .env.example para listar todas las variables:

| Variable | Descripción | Requerido | Valor por Defecto |
|----------|-------------|-----------|-------------------|
| DATABASE_URL | URL de PostgreSQL | ✅ Sí | - |
| JWT_SECRET | Secret para tokens | ✅ Sí | - |
| PORT | Puerto del servidor | ❌ No | 3000 |
| NODE_ENV | Ambiente | ❌ No | development |

## 10. Accesos (si están documentados)

Si encuentras URLs o accesos documentados:

- **Producción**: [URL]
- **Staging**: [URL]
- **Desarrollo**: http://localhost:3000
- **Documentación API**: [Swagger/OpenAPI URL]
- **Monitoreo**: [Dashboard URL]

## 11. Observaciones Críticas

### Buenas Prácticas Detectadas

- ✅ [Ejemplo: "Uso de TypeScript para type safety"]
- ✅ [Ejemplo: "Tests con >80% de cobertura"]
- ✅ [Ejemplo: "Variables de entorno bien documentadas"]

### Áreas de Mejora / Deuda Técnica

- ⚠️ [Ejemplo: "Dependencias desactualizadas"]
- ⚠️ [Ejemplo: "Falta documentación de APIs"]
- ⚠️ [Ejemplo: "Sin manejo de errores centralizado"]

### Preguntas que Requieren Clarificación

- ❓ [Ejemplo: "¿Cuál es el SLA de producción?"]
- ❓ [Ejemplo: "¿Hay plan de migración a microservicios?"]

## 12. Recomendaciones Iniciales

Basándote en el análisis:

1. **Seguridad**: [Recomendaciones de seguridad]
2. **Performance**: [Optimizaciones sugeridas]
3. **Mantenibilidad**: [Mejoras en código/estructura]
4. **Documentación**: [Qué documentar con prioridad]

# ARCHIVO DE SALIDA

ai_docs/00-analisis-inicial.md

⚠️ IMPORTANTE:
- Crea el archivo EXACTAMENTE en la ruta: ai_docs/00-analisis-inicial.md
- Si la carpeta ai_docs/ no existe, créala primero
- Guarda el archivo automáticamente
- Este archivo servirá como REFERENCIA para todos los demás prompts

# REGLAS CRÍTICAS DE FORMATO

## Listas en Markdown
⚠️ **MUY IMPORTANTE**: SIEMPRE deja una línea en blanco antes de cualquier lista.

❌ **INCORRECTO**:
A continuación:
- Elemento 1

- Elemento 2

✅ **CORRECTO**:

A continuación:

- Elemento 1

- Elemento 2


## Diagramas Mermaid
⚠️ **MUY IMPORTANTE**: SIEMPRE usa comillas dobles en labels que contengan espacios o caracteres especiales.

❌ **INCORRECTO**:

graph TB
    A[Web App React] --> B[API Gateway]
    C[Order Service] --> D[(Base de Datos)]


✅ **CORRECTO**:

graph TB
    A["Web App React"] --> B["API Gateway"]
    C["Order Service"] --> D[("Base de Datos")]


**Regla**: Si un label tiene espacios, acentos, símbolos especiales, o saltos de línea (`<br/>`), DEBE estar entre comillas dobles.

# RESTRICCIONES

- NO generes código

- NO hagas suposiciones sin evidencia en el código

- SI encuentras múltiples opciones posibles, lista todas

- Enfócate en HECHOS verificables del código


### Ejemplo de Output Esperado


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

## 📋 Prompt 02: Generar Análisis de Requerimientos

### Objetivo
Analizar el proyecto y generar un documento completo de requisitos funcionales y no funcionales.

### 📝 Información que Necesitas Antes de Ejecutar

Antes de copiar este prompt, asegúrate de tener:

- ✅ Output del Prompt 01 (Análisis Inicial) ejecutado

- ✅ Acceso al código fuente del proyecto abierto en VS Code

- ✅ Nombre exacto del proyecto

- 📞 *Opcional pero recomendado*: Conversación con Product Owner o stakeholders

### 🔧 Campos a Completar ANTES de Copiar

Busca y reemplaza en el prompt:

1. `[COMPLETA: Nombre del proyecto]` → Ej: "Sistema de Gestión de Inventarios"

2. `[COMPLETA: Ruta del repositorio]` → Ej: "/home/usuario/proyectos/inventario-api"

### 📋 Prompt (Copiar después de completar los campos)

```
# ROL
Eres un Business Analyst Senior especializado en ingeniería de requisitos, análisis de sistemas y documentación de proyectos de software.

# CONTEXTO
Estás analizando el proyecto: [COMPLETA: Nombre del proyecto]

Ruta del repositorio: [COMPLETA: Ruta del repositorio]

Tienes acceso a:

- Código fuente completo del repositorio (usa @workspace para analizarlo)

- Resultado del análisis inicial del proyecto (Prompt 01)

- Conversaciones con stakeholders (si las has tenido)

# TAREA
Genera el documento `01-requerimientos.md` que contenga un análisis exhaustivo de requisitos funcionales y no funcionales.

# REGLAS CRÍTICAS DE FORMATO

1. **LISTAS**: SIEMPRE deja una línea en blanco antes de cualquier lista (-, *, 1.)

2. **DIAGRAMAS MERMAID**: 
   - Si un label tiene espacios, acentos (á,é,í,ó,ú,ñ), símbolos o <br/> → DEBE estar entre comillas dobles
   - Ejemplo CORRECTO: A["Web App"] --> B["API Gateway"]
   - Ejemplo INCORRECTO: A[Web App] --> B[API Gateway]

# ESTRUCTURA DEL DOCUMENTO

## 1. Requisitos Funcionales

Para CADA funcionalidad del sistema:

**Formato Historia de Usuario:**

- Como [tipo de usuario]

- Quiero [acción]

- Para [beneficio]

**Criterios de Aceptación:** (específicos y medibles)
**Prioridad:** Must Have / Should Have / Could Have / Won't Have
**Módulo:** [nombre del módulo]
**Estimación:** [puntos o días]

Genera al menos 15-20 requisitos funcionales cubriendo TODAS las funcionalidades principales del sistema.

## 2. Cuestionario de Requisitos No Funcionales

Basándote en el análisis del código, infraestructura y mejores prácticas, responde TODAS estas preguntas:

### 🚀 Rendimiento

1. Tiempo de respuesta máximo aceptable

2. Usuarios concurrentes esperados (mín/promedio/pico)

3. Throughput esperado (TPS/RPM)

4. Tamaño de datos (inicial/crecimiento/3 años)

### 🔒 Seguridad

5. Nivel de seguridad requerido

6. Datos sensibles que maneja

7. Cumplimiento normativo necesario

8. Mecanismos de autenticación requeridos

### 📈 Escalabilidad

9. ¿Escalado horizontal automático?

10. Crecimiento esperado de usuarios (año 1/2/3)

11. ¿Múltiples regiones geográficas?

### ⏱️ Disponibilidad

12. SLA requerido (99.9% / 99.95% / 99.99%)

13. ¿Operación 24/7?

14. Estrategia de backup (frecuencia/retención/RPO/RTO)

### 🔧 Mantenibilidad

15. Nivel de documentación requerido

16. Capacidad de debugging en producción

17. ¿Versionado de API?

### 👥 Usabilidad

18. Dispositivos a soportar

19. Nivel de accesibilidad WCAG

20. Navegadores a soportar

21. ¿Soporte multiidioma?

### 🌐 Integración

22. Sistemas externos con los que debe integrarse

23. ¿Debe exponer APIs para terceros?

### 💰 Costo

24. Presupuesto de infraestructura mensual

25. Preferencia de hosting

## 3. Especificación Detallada de RNF

Convierte las respuestas anteriores en especificaciones técnicas concretas:

- RNF-001: Rendimiento

- RNF-002: Escalabilidad

- RNF-003: Disponibilidad

- RNF-004: Seguridad

- RNF-005: Mantenibilidad

- RNF-006: Usabilidad

- RNF-007: Compatibilidad

## 4. Matriz de Trazabilidad

Crea una tabla que conecte:

- ID de Requisito

- Tipo (Funcional/No Funcional)

- Componente que lo implementa

- Test ID

- Estado actual

## 5. Priorización MoSCoW

Clasifica TODOS los requisitos funcionales en:

- Must Have (críticos)

- Should Have (importantes)

- Could Have (deseables)

- Won't Have (excluidos de esta versión)

## 6. Diagrama de Trazabilidad

Genera un diagrama Mermaid que muestre:

- Requisitos funcionales conectados a componentes

- Requisitos no funcionales conectados a infraestructura

# OUTPUT ESPERADO

Un documento markdown completo, estructurado, con:

✅ 15-20 requisitos funcionales detallados
✅ Todas las 25 preguntas de RNF respondidas
✅ 7 especificaciones de RNF cuantificadas
✅ Matriz de trazabilidad completa
✅ Priorización MoSCoW aplicada
✅ Diagramas Mermaid correctamente formateados
✅ Secciones de validación y mejores prácticas

# FORMATO DE ENTREGA

ARCHIVO DE SALIDA: ai_docs/01-requerimientos.md

⚠️ IMPORTANTE: 
- Crea el archivo EXACTAMENTE en la ruta: ai_docs/01-requerimientos.md
- Si la carpeta ai_docs/ no existe, créala primero
- Guarda el archivo automáticamente

REQUISITOS DEL DOCUMENTO:
- Sé específico con números y métricas
- Basa tus respuestas en evidencia del código
- Si algo no se puede determinar del código, indica "A definir con stakeholders"
- Todos los diagramas Mermaid deben tener labels entre comillas dobles si contienen espacios
- Todas las listas deben tener línea en blanco anterior
```

### Validación del Output

Verifica que el documento generado tenga:

- [ ] Al menos 15 requisitos funcionales con formato de historia de usuario

- [ ] Las 25 preguntas del cuestionario RNF respondidas

- [ ] 7 especificaciones de RNF con valores numéricos concretos

- [ ] Matriz de trazabilidad con al menos 20 entradas

- [ ] Priorización MoSCoW completa

- [ ] Al menos 2 diagramas Mermaid correctamente formateados

- [ ] Sección de checklist de completitud

- [ ] Todas las listas tienen línea en blanco antes

### Refinamiento

Si el documento necesita mejoras:

```
El documento de requerimientos está bien, pero necesito que:

1. Agregues más detalle a los criterios de aceptación de RF-[XX], RF-[YY] y RF-[ZZ]

2. Especifiques valores numéricos concretos en RNF-001 (Rendimiento) - actualmente están muy genéricos

3. Amplíes la matriz de trazabilidad para incluir TODOS los requisitos funcionales

4. Agregues un diagrama de priorización cuadrante (Impacto vs Esfuerzo)

Recuerda las reglas de formato:

- Línea en blanco antes de listas

- Comillas dobles en labels de Mermaid con espacios
```

---

## 📊 Prompt 03: Generar Vista Ejecutiva

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

graph TB
    %% IMPORTANTE: Genera un diagrama C4 NIVEL 1 (Contexto)
    %% - Una sola caja para el sistema principal
    %% - Usuarios como actores
    %% - Sistemas externos con línea punteada
    %% - Máximo 10 elementos


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

# ARCHIVO DE SALIDA

ai_docs/02-vista-ejecutiva.md

⚠️ IMPORTANTE:
- Crea el archivo EXACTAMENTE en la ruta: ai_docs/02-vista-ejecutiva.md
- Si la carpeta ai_docs/ no existe, créala primero
- Guarda el archivo automáticamente

# OUTPUT
Devuelve SOLO el contenido del archivo markdown, sin explicaciones adicionales.
```

---

## 🏗️ Prompt 04: Generar Arquitectura C4

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

# 🌐 Arquitectura - Nivel 1: Contexto

## 🎯 Objetivo

Mostrar el sistema en su contexto, identificando usuarios y sistemas externos con los que interactúa.

---

## 📊 Diagrama de Contexto (C4 - Nivel 1)

graph TB
    %% Usuarios/Actores
    [Usuario1]["👤 Nombre del Usuario"]
    [Usuario2]["👤 Otro Usuario"]
    
    subgraph "Nuestro Sistema"
        Sistema[🏢 ["Nombre del Sistema"]]
    end
    
    %% Sistemas Externos
    ExtSys1[🌐 ["Sistema Externo 1"]<br/>[Proveedor]]
    ExtSys2[💾 ["Sistema Externo 2"]<br/>[Proveedor]]
    
    %% Relaciones
    Usuario1 -->|["acción"]| Sistema
    Sistema -->|["propósito"]| ExtSys1
    
    %% Estilos
    style Sistema fill:#1e88e5,color:#fff,stroke:#fff,stroke-width:3px
    style ExtSys1 fill:#999,stroke:#333,stroke-dasharray: 5
    style ExtSys2 fill:#999,stroke:#333,stroke-dasharray: 5

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

# ARCHIVOS DE SALIDA

Genera los siguientes 4 archivos:

1. ai_docs/03-arquitectura/01-contexto.md
2. ai_docs/03-arquitectura/02-contenedores.md
3. ai_docs/03-arquitectura/03-componentes.md
4. ai_docs/03-arquitectura/04-decisiones.md

⚠️ IMPORTANTE:
- Crea la carpeta ai_docs/03-arquitectura/ si no existe
- Genera los 4 archivos en esa carpeta
- Guarda cada archivo automáticamente

# OUTPUT
Devuelve los 3 archivos markdown separados claramente.
```

---

## 💻 Prompt 05: Generar Documentación Técnica

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


## ARCHIVO 2: `03-tecnico/02-modelo-datos.md`

# 💾 Modelo de Datos

## 📊 Diagrama Entidad-Relación

erDiagram
    %% ANALIZA el código y genera el ERD COMPLETO
    %% Incluye TODAS las tablas/colecciones
    %% Marca PK, FK, UK correctamente
    %% Incluye tipos de datos y constraints


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
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ "ORDER_ITEM" : contains


## Validación de Información

1. NO inventes información - todo debe venir del código fuente

2. Si usas un ORM, analiza los modelos/schemas

3. Para APIs, busca archivos de rutas (routes/, controllers/, handlers/)

4. Para el modelo de datos, busca migraciones, schemas, models/

5. Marca como [REQUIERE VERIFICACIÓN] si algo no está claro

6. Incluye ejemplos de código REALES del proyecto cuando sea relevante

# ARCHIVOS DE SALIDA

Genera los siguientes 4 archivos:

1. ai_docs/04-tecnico/01-stack-tecnologico.md
2. ai_docs/04-tecnico/02-modelo-datos.md
3. ai_docs/04-tecnico/03-apis.md
4. ai_docs/04-tecnico/04-integraciones.md

⚠️ IMPORTANTE:
- Crea la carpeta ai_docs/04-tecnico/ si no existe
- Genera los 4 archivos en esa carpeta
- Guarda cada archivo automáticamente

# OUTPUT
Los 4 archivos markdown completos.
```

---

## 🔄 Prompt 06: Generar Procesos de Negocio

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

## ARCHIVO 2: `04-procesos-negocio/02-flujos-funcionales.md`

Genera diagramas de SECUENCIA para los 3 flujos más importantes:

# 🔄 Flujos Funcionales

## Flujo 1: [Nombre del Proceso]


sequenceDiagram
    %% Genera el diagrama basándote en el CÓDIGO REAL
    %% Analiza controllers, services, y cómo fluyen las llamadas
    %% Incluye TODOS los participantes relevantes

**Descripción del Flujo:**
[Explica paso a paso qué sucede]

**Validaciones:**

- [Qué se valida en cada paso]

**Casos de Error:**

- [Qué puede fallar y cómo se maneja]

---

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

# ARCHIVOS DE SALIDA

Genera los siguientes 2 archivos:

1. ai_docs/05-procesos-negocio/01-casos-uso.md
2. ai_docs/05-procesos-negocio/02-flujos-funcionales.md

⚠️ IMPORTANTE:
- Crea la carpeta ai_docs/05-procesos-negocio/ si no existe
- Genera los 2 archivos en esa carpeta
- Guarda cada archivo automáticamente

# OUTPUT
Los 2 archivos markdown completos.
```

---

## 🚀 Prompt 07: Generar Documentación de Infraestructura

### Objetivo
Documentar deployment, CI/CD, monitoreo.

!!! success "✨ Sistema de 2 Fases - Nuevo!"
    Este prompt ahora usa un **sistema inteligente de 2 fases**:
    
    **Fase 1**: Copilot **analiza tu código automáticamente** y genera un cuestionario personalizado  
    **Fase 2**: Solo respondes **lo que falta** - el resto ya está pre-llenado del código
    
    📚 [Ver guía completa del Sistema de 2 Fases →](13-sistema-dos-fases.md)

---

### 🔍 FASE 1: Análisis Inicial (Genera Cuestionario Personalizado)

<div style="text-align: center; margin: 30px 0;">
    <button 
        onclick="loadPromptForm('00')" 
        style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); 
               color: white; 
               border: none; 
               padding: 16px 32px; 
               font-size: 18px; 
               font-weight: bold; 
               border-radius: 12px; 
               cursor: pointer; 
               box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4);
               transition: all 0.3s ease;
               display: inline-flex;
               align-items: center;
               gap: 10px;">
        <span style="font-size: 24px;">🔍</span>
        1. Cargar Prompt de Análisis Inicial
    </button>
</div>

<div id="prompt-00-container"></div>

!!! info "¿Qué hace el Prompt de Análisis?"
    1. **Analiza @workspace** completo
    2. **Detecta automáticamente**:
       - ✅ Dockerfile y docker-compose
       - ✅ CI/CD (GitHub Actions, GitLab CI, Jenkins)
       - ✅ Cloud Provider (AWS, IBM Cloud, GCP, Azure)
       - ✅ Base de datos (PostgreSQL, MySQL, MongoDB)
       - ✅ Monitoreo (Prometheus, Datadog, etc.)
    3. **Genera archivo YAML** con:
       - `auto_extracted`: Info encontrada en el código
       - `sections`: SOLO preguntas sobre lo que NO encontró
       - `template`: Pre-llenado con la info del código

**Pasos:**

1. Click en "🔍 1. Cargar Prompt de Análisis Inicial" arriba
2. Copia el prompt generado
3. Pégalo en Copilot: `@workspace [prompt]`
4. Copilot responderá con un archivo YAML personalizado
5. Guárdalo en: `docs/ai_prompts/07-generated.yaml`

---

### 📋 FASE 2: Completar Información Faltante

Una vez que tengas el archivo `07-generated.yaml`:

<div style="text-align: center; margin: 30px 0;">
    <button 
        onclick="loadPromptForm('07-generated')" 
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
               color: white; 
               border: none; 
               padding: 16px 32px; 
               font-size: 18px; 
               font-weight: bold; 
               border-radius: 12px; 
               cursor: pointer; 
               box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
               transition: all 0.3s ease;
               display: inline-flex;
               align-items: center;
               gap: 10px;">
        <span style="font-size: 24px;">📋</span>
        2. Cargar Cuestionario Personalizado
    </button>
</div>

<div id="prompt-07-generated-container"></div>

!!! tip "💡 Ventajas del Sistema de 2 Fases"
    **Antes**: 50+ preguntas genéricas → 15-20 minutos  
    **Ahora**: Solo 2-10 preguntas (lo que falta) → 2-3 minutos
    
    **Información auto-extraída**:
    - ✅ Docker: Detectado ✓ (node:18-alpine)
    - ✅ CI/CD: github-actions (.github/workflows/deploy.yml)
    - ✅ Base de Datos: postgresql (prisma)
    - ❌ Cloud Provider: ? (requiere respuesta)
    - ❌ Plataforma: ? (requiere respuesta)

---

### 💡 Cómo Usar el Cuestionario Generado

1. **Revisa la información auto-extraída** (sección verde ✅)
2. **Responde SOLO las preguntas faltantes** (lo que Copilot no pudo determinar)
3. **Haz clic en "Generar Prompt"**
4. **Copia el prompt** que combina:
   - ✅ Info del código (auto-extraída)
   - ❌ Tus respuestas (info faltante)
5. **Pégalo en Copilot** para generar la documentación completa

---

### 🔄 Alternativa: Formulario Estático (Sin Análisis)

Si prefieres el formulario tradicional (todas las preguntas):

<div style="text-align: center; margin: 30px 0;">
    <button 
        onclick="loadPromptForm('07')" 
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
               color: white; 
               border: none; 
               padding: 16px 32px; 
               font-size: 18px; 
               font-weight: bold; 
               border-radius: 12px; 
               cursor: pointer; 
               box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
               transition: all 0.3s ease;
               display: inline-flex;
               align-items: center;
               gap: 10px;">
        <span style="font-size: 24px;">📋</span>
        Formulario Completo (Tradicional)
    </button>
</div>

<div id="prompt-07-container"></div>

!!! warning "⚠️ Necesitas información del equipo de DevOps"
    El formulario estático requiere responder TODAS las preguntas manualmente.
    
    **Recomendado**: Usa el Sistema de 2 Fases arriba para ahorrar tiempo.

---

### 📋 Prompt Manual (Si prefieres no usar el formulario)

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

# 🚀 Arquitectura de Deployment

## 📊 Diagrama de Infraestructura

graph TB
    %% Genera diagrama basado en docker-compose, k8s manifests, o configuración cloud
    %% Muestra: Load Balancers, Servers/Containers, Databases, Redes
    %% Incluye subnets, security groups si es cloud

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

## ARCHIVO 2: `05-infraestructura/02-ci-cd.md`

[Documenta el pipeline basado en archivos de CI/CD]
[Incluye diagrama del pipeline como flowchart]
[Explica cada etapa: build, test, security scan, deploy]

## ARCHIVO 3: `05-infraestructura/03-monitoreo.md`

[Documenta estrategia de monitoreo, logs, alertas]
[Si hay Prometheus, Grafana, Datadog, New Relic, etc.]

# ARCHIVOS DE SALIDA

Genera los siguientes 3 archivos:

1. ai_docs/06-infraestructura/01-deployment.md
2. ai_docs/06-infraestructura/02-ci-cd.md
3. ai_docs/06-infraestructura/03-monitoreo.md

⚠️ IMPORTANTE:
- Crea la carpeta ai_docs/06-infraestructura/ si no existe
- Genera los 3 archivos en esa carpeta
- Guarda cada archivo automáticamente

# OUTPUT
Los 3 archivos markdown completos.
```

---

## 📜 Prompt 08: Generar ADRs

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

# IMPORTANTE

- INFIERE las decisiones basándote en lo que ves en el código

- Si no estás seguro del contexto, usa lenguaje como "Aparentemente se decidió X porque..."

- Marca con [REQUIERE VALIDACIÓN POR EQUIPO] las partes donde hiciste suposiciones

- Las ADRs deben ser sobre DECISIONES SIGNIFICATIVAS, no trivialidades

# ARCHIVO DE SALIDA

ai_docs/03-arquitectura/04-decisiones.md

⚠️ IMPORTANTE:
- Crea el archivo en la carpeta ai_docs/03-arquitectura/
- Si la carpeta no existe, créala primero
- Guarda el archivo automáticamente

# OUTPUT
El archivo markdown completo con todas las ADRs identificadas.
```

---

## 📝 Prompt 09: Generar Archivos Complementarios del Repositorio

**Propósito:** Generar archivos esenciales del repositorio basándose en la documentación AI generada.

**Modo:** `@workspace` (OBLIGATORIO)

**Prerequisito:** Haber ejecutado Prompts 01-08 y tener la carpeta `ai_docs/` completa.

**Tiempo estimado:** 8-10 minutos

```
# ROL
Eres un Senior Developer preparando un repositorio completo y profesional.

# CONTEXTO
Proyecto "[COMPLETAR: nombre del proyecto]"

Ya existe documentación completa en la carpeta ai_docs/ con:
- 01-requerimientos.md
- 02-vista-ejecutiva.md
- 03-arquitectura/ (C4 + ADRs)
- 04-tecnico/ (Stack, APIs, etc.)
- 05-procesos-negocio/
- 06-infraestructura/

# TAREA
Genera archivos complementarios del repositorio basándote en la documentación ai_docs/ existente.

## ARCHIVOS A GENERAR:

### 1. README.md (raíz del proyecto)

**Si NO existe README.md o está vacío/incompleto**, genera uno completo con:

- **Encabezado**: Nombre + descripción breve (1-2 líneas)
- **Badges**: Build status, coverage, version, license
- **Contexto General**: ¿Qué es y para qué sirve? (2-3 párrafos)
- **Arquitectura**: Diagrama de alto nivel (extraído de ai_docs/03-arquitectura/01-contexto.md)
- **Tecnologías**: Stack principal (extraído de ai_docs/04-tecnico/01-stack-tecnologico.md)
- **Dependencias**: Principales librerías y versiones
- **Estructura del Proyecto**: Árbol de carpetas con descripción
  /src
    /controllers  - Lógica de negocio
    /models       - Modelos de datos
    ...
- **Ejecución Local**: Paso a paso (basado en ai_docs/06-infraestructura/01-deployment.md)
  - Prerequisitos
  - Instalación
  - Configuración
  - Ejecutar desarrollo
  - Ejecutar tests
- **Variables de Entorno** (si aplica): Tabla explicando cada variable
  - Nombre | Descripción | Valor por defecto | Requerido
- **Accesos**: URLs de ambientes, dashboards, logs
  - Producción: [URL]
  - Staging: [URL]
  - Monitoring: [URL]
- **Aplicaciones Externas** (si aplica): APIs de terceros, servicios externos
- **Cómo Contribuir**: Link a CONTRIBUTING.md o guía breve
- **Recomendaciones**: Buenas prácticas, convenciones del proyecto
- **Licencia**: Tipo de licencia

**Si ya existe README.md completo**, analízalo y solo complementa secciones faltantes.

### 2. .gitignore (raíz del proyecto)

**Si NO existe .gitignore**, genera uno apropiado para el stack tecnológico del proyecto.

**Incluir siempre:**
# Build artifacts
site/
dist/
build/

# AI-generated docs (opcional, depende de la estrategia)
# ai_docs/

# Environment
.env
.env.local

# Dependencies
node_modules/
venv/
__pycache__/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/


### 3. CHANGELOG.md (raíz del proyecto)

**Si NO existe CHANGELOG.md**, genera uno inicial con:

- Formato: [Keep a Changelog](https://keepachangelog.com/)
- Versión actual (extraída de package.json, pom.xml, etc.)
- Secciones: Added, Changed, Deprecated, Removed, Fixed, Security
- Historial desde la versión 1.0.0 o la más antigua identificable

**Si ya existe CHANGELOG.md**, valida que esté al día con la última versión.

Ejemplo:
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2025-12-10

### Added
- Nueva integración con servicio de pagos Stripe
- Endpoint /api/v1/payments

### Changed
- Migración de MySQL 5.7 a PostgreSQL 14
- Actualización de dependencias críticas

### Fixed
- Bug en cálculo de descuentos aplicados

## [2.0.0] - 2025-11-01
...

### 4. .env.example (raíz del proyecto)

**Si aplica** (detectar si el proyecto usa variables de entorno):

**Si NO existe .env.example**, genera uno con TODAS las variables necesarias:

- Analiza el código fuente para detectar variables de entorno
- Analiza ai_docs/04-tecnico/04-integraciones.md
- Incluye comentarios explicativos
- NO incluir valores sensibles (usar placeholders)

Ejemplo:
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
DATABASE_POOL_SIZE=10

# API Keys (obtener de https://dashboard.stripe.com)
STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXX

# Email Service
SENDGRID_API_KEY=SG.XXXXXXXXXXXXXXXX
FROM_EMAIL=noreply@example.com

# Application
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug

# JWT
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRATION=7d

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CACHE=false

**Si ya existe .env.example**, asegúrate de que esté completo y documentado.

### 5. CONTRIBUTING.md (raíz del proyecto)

**Si NO existe CONTRIBUTING.md**, genera una guía de contribución:

- Código de conducta
- Cómo reportar bugs
- Cómo proponer features
- Proceso de desarrollo:
  - Branching strategy (git flow, trunk-based, etc.)
  - Convenciones de commits (Conventional Commits)
  - Code style y linters
  - Testing requerido
  - Pull Request process
- Contacto del equipo

Ejemplo breve:
# Contribuir a [Proyecto]

## 🐛 Reportar Bugs

Abre un issue en GitHub con:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Versión del software

## 💡 Proponer Features

1. Abre un issue de tipo "Feature Request"
2. Explica el caso de uso
3. Espera feedback del equipo antes de implementar

## 🔀 Proceso de Desarrollo

1. Fork del repositorio
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Commits siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
   - `feat: agregar endpoint de usuarios`
   - `fix: corregir validación de email`
   - `docs: actualizar README`
4. Tests: `npm test` (100% de cobertura requerido)
5. Push: `git push origin feature/mi-feature`
6. Abre un Pull Request

## 📋 Code Style

- ESLint + Prettier (JavaScript/TypeScript)
- Black (Python)
- Ejecutar `npm run lint` antes de commit

## ✅ Pull Request Checklist

- [ ] Tests pasan
- [ ] Código linted
- [ ] Documentación actualizada
- [ ] CHANGELOG.md actualizado
- [ ] Sin conflictos con main

**Si ya existe CONTRIBUTING.md completo**, no regenerar.

## INSTRUCCIONES ESPECIALES:

1. **Analiza primero** qué archivos ya existen en el repositorio
2. **No sobrescribas** archivos completos sin avisar
3. **Complementa** archivos existentes si están incompletos
4. **Extrae información** de ai_docs/ para mantener coherencia
5. **Detecta el stack** para generar .gitignore apropiado
6. **Usa el análisis inicial** (Prompt 01) como base

## ARCHIVOS DE SALIDA:

1. README.md (raíz)
2. .gitignore (raíz) - asegurar que incluya `site/`
3. CHANGELOG.md (raíz)
4. .env.example (raíz, solo si aplica)
5. CONTRIBUTING.md (raíz)

⚠️ IMPORTANTE:
- Crea los archivos EXACTAMENTE en la raíz del proyecto
- Si un archivo ya existe, analízalo y solo complementa secciones faltantes
- NO borres contenido existente
- Basate en ai_docs/ para mantener coherencia con la documentación generada
- Agrega `site/` al .gitignore para excluir builds de MkDocs

# OUTPUT
Los archivos markdown/texto correspondientes guardados en la raíz del proyecto.
```

---

## 📝 Prompt 10: Generar Documentación de API (OpenAPI/Swagger) [OPCIONAL]

!!! warning "⚠️ PROMPT OPCIONAL - Solo para APIs REST"
    **Este prompt es OPCIONAL y solo debes ejecutarlo si:**
    
    ✅ Tu proyecto **ES una API REST** que expone endpoints HTTP
    ✅ Necesitas documentación interactiva tipo Swagger UI
    ✅ Otros equipos/clientes consumirán tu API
    
    **NO ejecutes este prompt si:**
    
    ❌ Tu proyecto es frontend sin API backend propia
    ❌ Es un script, CLI o herramienta de consola
    ❌ Es una librería/biblioteca/package
    ❌ No tiene endpoints HTTP
    
    **Decisión rápida:** ¿Tu código tiene rutas como `/users`, `/api/products`, `POST /orders`? 
    
    - **SÍ** → Ejecuta este prompt
    - **NO** → Salta al siguiente paso

### Cuándo Usar Este Prompt

```mermaid
flowchart TD
    A{¿Tu proyecto<br/>expone endpoints<br/>HTTP?} -->|SÍ| B[✅ Ejecuta<br/>Prompt 10]
    A -->|NO| C[❌ Omite este<br/>prompt]
    
    B --> D[Genera:<br/>- openapi.yaml<br/>- swagger-ui.html<br/>- ai_docs/08-api-reference.md]
    C --> E[Continúa con<br/>revisión final]
    
    style B fill:#4caf50,color:#fff
    style C fill:#ff5722,color:#fff
```

### Ejemplos de Proyectos que SÍ Necesitan Este Prompt

✅ **API REST de E-commerce** con endpoints:

- `GET /products`
- `POST /orders`
- `PUT /users/{id}`

✅ **Backend de aplicación móvil** con:

- `POST /auth/login`
- `GET /api/v1/feed`

✅ **Microservicio** que expone:

- `GET /health`
- `POST /webhooks`

### Ejemplos de Proyectos que NO Necesitan Este Prompt

❌ **Aplicación React/Vue/Angular** sin backend propio
❌ **Script Python** que procesa datos
❌ **CLI en Node.js** para automatización
❌ **Librería npm/pypi** sin servidor HTTP

---

**Propósito:** Generar documentación completa de API en formato OpenAPI 3.0 que se pueda renderizar en Swagger UI.

**Modo:** `@workspace` (OBLIGATORIO)

**Prerequisito:** Haber ejecutado Prompts 01-05 (especialmente Prompt 05 que tiene el análisis de APIs).

**Tiempo estimado:** 10-15 minutos

```
# ROL
Eres un API Architect Senior especializado en documentación de APIs con OpenAPI 3.0 y Swagger.

# CONTEXTO
Proyecto "[COMPLETAR: nombre del proyecto]"

Ya existe documentación técnica en ai_docs/04-tecnico/03-apis.md con información básica de los endpoints.

# TAREA
Genera documentación completa de API en formato OpenAPI 3.0 que se pueda:
- ✅ Renderizar en Swagger UI
- ✅ Importar en Postman
- ✅ Usar para generar código (SDK clients)
- ✅ Integrar con herramientas de testing

## INFORMACIÓN REQUERIDA:

### Configuración General de la API

- **Nombre de la API**: [COMPLETAR: ej. "E-commerce API"]
- **Versión**: [COMPLETAR: ej. "1.0.0" o inferir de package.json]

### Configuración de Servidores (Hosts)

**⚠️ IMPORTANTE:** El OpenAPI generará un dropdown con todos los servidores disponibles.

**COMPLETA LOS HOSTS DISPONIBLES:**

- **Producción**: [COMPLETAR: ej. "https://api.example.com" o "a definir"]
- **QA/Testing**: [COMPLETAR: ej. "https://api-qa.example.com" o "a definir"]
- **Staging**: [COMPLETAR: ej. "https://api-staging.example.com" o "a definir"]
- **Desarrollo**: [COMPLETAR: ej. "https://api-dev.example.com" o "a definir"]
- **Local**: [COMPLETAR: ej. "http://localhost:3000" o "http://localhost:8080"]
- **Otro (manual)**: [COMPLETAR: Si necesitas un host adicional, escríbelo aquí]

**Path Base (si aplica)**: [COMPLETAR: ej. "/api/v1" o "/v2" o dejar vacío si no hay]

### Autenticación

- **Tipo**: [COMPLETAR: "Bearer Token (JWT)" / "API Key" / "OAuth2" / "Basic Auth" / "None"]
- **Header de autenticación**: [COMPLETAR: ej. "Authorization" o "X-API-Key"]
- **Formato del token**: [COMPLETAR: ej. "Bearer {token}" o "apikey {key}"]

### Headers Globales (si aplica)

Headers que se deben enviar en TODAS las requests:

- [COMPLETAR: ej. "X-Client-Version: 1.0.0" o "ninguno"]
- [COMPLETAR: ej. "X-Request-ID: {uuid}" o "ninguno"]
- [COMPLETAR: ej. "Content-Type: application/json" - este es estándar]

## ARCHIVOS A GENERAR:

### 1. openapi.json (raíz del proyecto)

**⚠️ NOMBRE FIJO:** El archivo DEBE llamarse `openapi.json` (NO `.yaml`, usar JSON)

Genera el archivo completo OpenAPI 3.0 con:

**Estructura:**

{
  "openapi": "3.0.3",
  "info": {
    "title": "[Nombre de la API]",
    "description": "[Descripción detallada]\n\n## Autenticación\n\n[Explicar cómo autenticarse]\n\n## Rate Limiting\n\n[Si aplica]\n\n## Versionado\n\n[Explicar estrategia]",
    "version": "[versión]",
    "contact": {
      "name": "[Equipo responsable]",
      "email": "[email de contacto]",
      "url": "[URL del equipo]"
    },
    "license": {
      "name": "[Licencia, ej. MIT]",
      "url": "[URL de la licencia]"
    }
  },
  "servers": [
    {
      "url": "[COMPLETAR: URL Producción + Path Base]",
      "description": "🚀 Producción"
    },
    {
      "url": "[COMPLETAR: URL QA + Path Base]",
      "description": "🧪 QA/Testing"
    },
    {
      "url": "[COMPLETAR: URL Staging + Path Base]",
      "description": "🎭 Staging"
    },
    {
      "url": "[COMPLETAR: URL Desarrollo + Path Base]",
      "description": "🔧 Desarrollo"
    },
    {
      "url": "[COMPLETAR: URL Local + Path Base]",
      "description": "💻 Local"
    }
  ]

,
  "security": [
    { "[Tipo de auth configurado]": [] }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "description": "Token JWT obtenido del endpoint /auth/login.\n\nEjemplo:\n\nAuthorization: Bearer eyJhbGci...\n"
      },
      "apiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-Key",
        "description": "API Key obtenida del dashboard.\n\nEjemplo:\n\nX-API-Key: sk_live_abc123\n"
      },
      "oauth2Auth": {
        "type": "oauth2",
        "flows": {
          "authorizationCode": {
            "authorizationUrl": "https://auth.example.com/oauth/authorize",
            "tokenUrl": "https://auth.example.com/oauth/token",
            "scopes": {
            read:users: Leer información de usuarios
            write:users: Modificar usuarios
            read:orders: Leer pedidos
            write:orders: Crear/modificar pedidos

  # PARÁMETROS REUTILIZABLES
  parameters:
    # Headers dinámicos globales
    ClientVersionHeader:
      name: X-Client-Version
      in: header
      required: false
      schema:
        type: string
        example: "1.0.0"
      description: Versión del cliente que consume la API
    
    RequestIdHeader:
      name: X-Request-ID
      in: header
      required: false
      schema:
        type: string
        format: uuid
        example: "550e8400-e29b-41d4-a716-446655440000"
      description: ID único de la request para trazabilidad
    
    # Query params comunes
    PageParam:
      name: page
      in: query
      required: false
      schema:
        type: integer
        minimum: 1
        default: 1
      description: Número de página (paginación)
    
    LimitParam:
      name: limit
      in: query
      required: false
      schema:
        type: integer
        minimum: 1
        maximum: 100
        default: 20
      description: Cantidad de items por página
    
    SortParam:
      name: sort
      in: query
      required: false
      schema:
        type: string
        example: "-createdAt"
      description: |
        Campo por el cual ordenar. 
        Prefijo `-` para orden descendente.
        Ejemplo: `createdAt` (ascendente) o `-createdAt` (descendente)

  # SCHEMAS (MODELOS)
  schemas:
    # MODELOS DE DATOS
    # Analiza el código y genera schemas para TODAS las entidades
    
    User:
      type: object
      required:
        - id
        - email
        - name
      properties:
        id:
          type: string
          format: uuid
          example: "550e8400-e29b-41d4-a716-446655440000"
          description: ID único del usuario
        email:
          type: string
          format: email
          example: "usuario@example.com"
          description: Email del usuario (único)
        name:
          type: string
          minLength: 2
          maxLength: 100
          example: "Juan Pérez"
          description: Nombre completo del usuario
        role:
          type: string
          enum:
            - admin
            - user
            - guest
          example: "user"
          description: Rol del usuario en el sistema
        createdAt:
          type: string
          format: date-time
          example: "2025-12-11T10:30:00Z"
          description: Fecha de creación
        updatedAt:
          type: string
          format: date-time
          example: "2025-12-11T10:30:00Z"
          description: Fecha de última actualización
    
    # REQUESTS (Input)
    CreateUserRequest:
      type: object
      required:
        - email
        - password
        - name
      properties:
        email:
          type: string
          format: email
          example: "nuevo@example.com"
        password:
          type: string
          format: password
          minLength: 8
          example: "SecurePass123!"
          description: Contraseña (mínimo 8 caracteres)
        name:
          type: string
          minLength: 2
          maxLength: 100
          example: "María García"
    
    UpdateUserRequest:
      type: object
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 100
          example: "María García López"
        email:
          type: string
          format: email
          example: "maria.garcia@example.com"
    
    # RESPONSES (Output)
    UserResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          $ref: '#/components/schemas/User'
        message:
          type: string
          example: "Usuario obtenido exitosamente"
    
    UsersListResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        data:
          type: array
          items:
            $ref: '#/components/schemas/User'
        pagination:
          $ref: '#/components/schemas/Pagination'
        message:
          type: string
          example: "Usuarios obtenidos exitosamente"
    
    # PAGINACIÓN
    Pagination:
      type: object
      properties:
        page:
          type: integer
          example: 1
          description: Página actual
        limit:
          type: integer
          example: 20
          description: Items por página
        total:
          type: integer
          example: 150
          description: Total de items
        totalPages:
          type: integer
          example: 8
          description: Total de páginas
    
    # ERRORES
    ErrorResponse:
      type: object
      required:
        - success
        - error
      properties:
        success:
          type: boolean
          example: false
        error:
          type: object
          properties:
            code:
              type: string
              example: "VALIDATION_ERROR"
              description: Código interno del error
            message:
              type: string
              example: "El email es inválido"
              description: Mensaje legible del error
            details:
              type: array
              items:
                type: object
                properties:
                  field:
                    type: string
                    example: "email"
                  message:
                    type: string
                    example: "Formato de email inválido"
    
    ValidationError:
      allOf:
        - $ref: '#/components/schemas/ErrorResponse'
        - type: object
          properties:
            error:
              type: object
              properties:
                code:
                  type: string
                  example: "VALIDATION_ERROR"

  # RESPUESTAS REUTILIZABLES
  responses:
    Unauthorized:
      description: No autenticado - Token inválido o expirado
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            success: false
            error:
              code: "UNAUTHORIZED"
              message: "Token inválido o expirado"
    
    Forbidden:
      description: No autorizado - Permisos insuficientes
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            success: false
            error:
              code: "FORBIDDEN"
              message: "No tienes permisos para realizar esta acción"
    
    NotFound:
      description: Recurso no encontrado
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            success: false
            error:
              code: "NOT_FOUND"
              message: "El recurso solicitado no existe"
    
    ValidationError:
      description: Error de validación
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ValidationError'
          example:
            success: false
            error:
              code: "VALIDATION_ERROR"
              message: "Errores de validación"
              details:
                - field: "email"
                  message: "Email inválido"
                - field: "password"
                  message: "Contraseña debe tener mínimo 8 caracteres"
    
    ServerError:
      description: Error interno del servidor
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            success: false
            error:
              code: "INTERNAL_SERVER_ERROR"
              message: "Ha ocurrido un error inesperado"

# PATHS (ENDPOINTS)
paths:
  # AUTENTICACIÓN
  /auth/login:
    post:
      tags:
        - Autenticación
      summary: Iniciar sesión
      description: Autenticar usuario y obtener token JWT
      operationId: login
      security: []  # Este endpoint NO requiere autenticación
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                  format: email
                  example: "usuario@example.com"
                password:
                  type: string
                  format: password
                  example: "MiPassword123!"
      responses:
        '200':
          description: Login exitoso
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      token:
                        type: string
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        description: Token JWT
                      expiresIn:
                        type: integer
                        example: 3600
                        description: Tiempo de expiración en segundos
                      user:
                        $ref: '#/components/schemas/User'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '400':
          $ref: '#/components/responses/ValidationError'
  
  # USUARIOS
  /users:
    get:
      tags:
        - Usuarios
      summary: Listar usuarios
      description: Obtener listado paginado de usuarios
      operationId: listUsers
      parameters:
        - $ref: '#/components/parameters/PageParam'
        - $ref: '#/components/parameters/LimitParam'
        - $ref: '#/components/parameters/SortParam'
        - $ref: '#/components/parameters/ClientVersionHeader'
        - $ref: '#/components/parameters/RequestIdHeader'
        - name: role
          in: query
          required: false
          schema:
            type: string
            enum:
              - admin
              - user
              - guest
          description: Filtrar por rol
        - name: search
          in: query
          required: false
          schema:
            type: string
          description: Buscar por nombre o email
      responses:
        '200':
          description: Lista de usuarios
          headers:
            X-Request-ID:
              schema:
                type: string
                format: uuid
              description: ID de la request para trazabilidad
            X-RateLimit-Limit:
              schema:
                type: integer
              description: Límite de requests por hora
            X-RateLimit-Remaining:
              schema:
                type: integer
              description: Requests restantes en la ventana actual
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UsersListResponse'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '500':
          $ref: '#/components/responses/ServerError'
    
    post:
      tags:
        - Usuarios
      summary: Crear usuario
      description: Crear un nuevo usuario en el sistema
      operationId: createUser
      parameters:
        - $ref: '#/components/parameters/ClientVersionHeader'
        - $ref: '#/components/parameters/RequestIdHeader'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: Usuario creado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '400':
          $ref: '#/components/responses/ValidationError'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '409':
          description: Conflicto - Email ya existe
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          $ref: '#/components/responses/ServerError'
  
  /users/{userId}:
    parameters:
      - name: userId
        in: path
        required: true
        schema:
          type: string
          format: uuid
        description: ID del usuario
    
    get:
      tags:
        - Usuarios
      summary: Obtener usuario por ID
      description: Obtener información detallada de un usuario específico
      operationId: getUserById
      parameters:
        - $ref: '#/components/parameters/ClientVersionHeader'
        - $ref: '#/components/parameters/RequestIdHeader'
      responses:
        '200':
          description: Usuario encontrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/ServerError'
    
    put:
      tags:
        - Usuarios
      summary: Actualizar usuario
      description: Actualizar información de un usuario existente
      operationId: updateUser
      parameters:
        - $ref: '#/components/parameters/ClientVersionHeader'
        - $ref: '#/components/parameters/RequestIdHeader'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateUserRequest'
      responses:
        '200':
          description: Usuario actualizado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '400':
          $ref: '#/components/responses/ValidationError'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/ServerError'
    
    delete:
      tags:
        - Usuarios
      summary: Eliminar usuario
      description: Eliminar un usuario del sistema (soft delete)
      operationId: deleteUser
      parameters:
        - $ref: '#/components/parameters/ClientVersionHeader'
        - $ref: '#/components/parameters/RequestIdHeader'
      responses:
        '204':
          description: Usuario eliminado exitosamente
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/ServerError'

# IMPORTANTE: Analiza el código y genera paths para TODOS los endpoints del proyecto
# Sigue el patrón de los ejemplos de arriba

tags:
  - name: Autenticación
    description: Endpoints de autenticación y autorización
  - name: Usuarios
    description: Gestión de usuarios
  - name: [AGREGAR MÁS TAGS según los recursos del proyecto]


### 2. ai_docs/08-api-reference.md (documentación markdown)

**⚠️ IMPORTANTE:** Este archivo debe IMPORTAR automáticamente el `openapi.json` para que se renderice en el hub de documentación.

Genera documentación complementaria en Markdown:

# 📖 Referencia de API

## 🎯 Documentación Interactiva (Swagger UI)

!!! info "🚀 Selector de Servidor"
    El Swagger UI de abajo incluye un **dropdown de servidores** donde puedes elegir:
    
    - 🚀 **Producción** - [URL de producción]
    - 🧪 **QA/Testing** - [URL de QA]
    - 🎭 **Staging** - [URL de staging]
    - 🔧 **Desarrollo** - [URL de desarrollo]
    - 💻 **Local** - [URL local]
    
    También puedes **escribir manualmente** cualquier URL personalizada en el campo "Server URL".

<swagger-ui src="../openapi.json"/>

!!! tip "💡 Cómo Usar el Swagger UI"
    1. **Selecciona el servidor** en el dropdown superior (Producción, QA, Local, etc.)
    2. Haz clic en **"Authorize"** (candado) para configurar tu token
    3. **Expande un endpoint** y haz clic en "Try it out"
    4. **Completa los parámetros** requeridos
    5. Haz clic en **"Execute"** para probar la API en vivo
    6. Puedes **cambiar de servidor** en cualquier momento sin recargar

---

## Información General

- **Nombre**: [Nombre de la API]
- **Versión**: [versión]
- **Formato**: JSON
- **Charset**: UTF-8

### Servidores Disponibles

| Ambiente | URL | Descripción |
|----------|-----|-------------|
| 🚀 Producción | [URL] | Ambiente productivo - datos reales |
| 🧪 QA/Testing | [URL] | Ambiente de pruebas - datos de test |
| 🎭 Staging | [URL] | Pre-producción - datos de staging |
| 🔧 Desarrollo | [URL] | Ambiente de desarrollo |
| 💻 Local | [URL] | Servidor local para desarrollo |

## Autenticación

[Explicación detallada de cómo autenticarse]

### Ejemplo de Autenticación

# 1. Obtener token
curl -X POST [URL_BASE]/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "MiPassword123!"
  }'

# Respuesta:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}

# 2. Usar el token en requests
curl -X GET [URL_BASE]/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."


## Rate Limiting

[Explicar límites de rate]

## Versionado

[Explicar estrategia de versionado de la API]

## Headers Globales

Estos headers se recomiendan en todas las requests:

| Header | Tipo | Requerido | Descripción |
|--------|------|-----------|-------------|
| `Authorization` | string | ✅ Sí (excepto /auth/*) | Token de autenticación |
| `Content-Type` | string | ✅ Sí | `application/json` |
| `X-Client-Version` | string | ❌ No | Versión del cliente |
| `X-Request-ID` | string (UUID) | ❌ No | ID único para trazabilidad |

## Códigos de Estado HTTP

| Código | Significado | Cuándo se usa |
|--------|-------------|---------------|
| 200 | OK | Request exitosa (GET, PUT, PATCH) |
| 201 | Created | Recurso creado exitosamente (POST) |
| 204 | No Content | Recurso eliminado exitosamente (DELETE) |
| 400 | Bad Request | Error de validación |
| 401 | Unauthorized | Token inválido o expirado |
| 403 | Forbidden | Permisos insuficientes |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto (ej: email duplicado) |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Internal Server Error | Error del servidor |

## Formato de Respuestas

### Respuesta Exitosa

{
  "success": true,
  "data": {
    // Datos del recurso
  },
  "message": "Operación exitosa"
}

### Respuesta de Error

{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensaje legible del error",
    "details": [
      {
        "field": "campo",
        "message": "Descripción del error"
      }
    ]
  }
}

## Paginación

Endpoints que retornan listas usan paginación:

### Query Parameters

- `page` (integer): Número de página (default: 1)
- `limit` (integer): Items por página (default: 20, max: 100)
- `sort` (string): Campo de ordenamiento (prefijo `-` para descendente)

### Respuesta con Paginación

{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}

## Filtrado y Búsqueda

[Explicar cómo funcionan los filtros en los endpoints]

## Ejemplos Completos

### Crear Usuario

curl -X POST https://api.example.com/v1/users \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -H "X-Request-ID: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "email": "nuevo@example.com",
    "password": "SecurePass123!",
    "name": "María García"
  }'

### Listar Usuarios con Filtros

curl -X GET "https://api.example.com/v1/users?page=1&limit=10&role=admin&sort=-createdAt" \
  -H "Authorization: Bearer {token}"


## Testing con Swagger UI

Para probar la API interactivamente:

1. Visita: `https://api.example.com/docs`
2. Haz clic en "Authorize"
3. Ingresa tu token JWT
4. Explora y prueba los endpoints

## Importar en Postman

1. Descarga `openapi.yaml`
2. Abre Postman → Import → Sube el archivo
3. Se creará una colección completa con todos los endpoints

## Generar SDKs

Puedes generar clientes automáticamente usando [OpenAPI Generator](https://openapi-generator.tech/):

# JavaScript/TypeScript
openapi-generator-cli generate -i openapi.yaml -g typescript-axios -o ./sdk/typescript

# Python
openapi-generator-cli generate -i openapi.yaml -g python -o ./sdk/python

# Java
openapi-generator-cli generate -i openapi.yaml -g java -o ./sdk/java


## Recursos Adicionales

- [Especificación OpenAPI 3.0](https://swagger.io/specification/)
- [Documentación completa del proyecto](../README.md)
- [Guía de integración](./04-tecnico/04-integraciones.md)

## INSTRUCCIONES ESPECIALES:

1. **Analiza el código REAL del proyecto** (controllers, routes, services)
2. **Extrae información de `ai_docs/04-tecnico/03-apis.md`** si existe
3. **Genera schemas para TODAS las entidades** del modelo de datos
4. **Incluye ejemplos reales** de requests y responses
5. **Documenta TODOS los endpoints** que encuentres en el código
6. **Headers dinámicos** deben estar en `components/parameters` para reutilizarse
7. **Usa referencias ($ref)** para evitar duplicación
8. **Genera FORMATO JSON** (NO YAML) - el archivo debe ser `openapi.json`
9. **Configura TODOS los servidores** proporcionados (producción, QA, staging, dev, local)
10. **Usa emojis** en las descripciones de servidores para mejor UX

## CONFIGURACIÓN DE SERVIDORES - IMPORTANTE:

**El array `servers` debe incluir TODOS los ambientes especificados:**

"servers": [
  {
    "url": "[URL_PRODUCCION][PATH_BASE]",
    "description": "🚀 Producción"
  },
  {
    "url": "[URL_QA][PATH_BASE]",
    "description": "🧪 QA/Testing"
  },
  {
    "url": "[URL_STAGING][PATH_BASE]",
    "description": "🎭 Staging"
  },
  {
    "url": "[URL_DEV][PATH_BASE]",
    "description": "🔧 Desarrollo"
  },
  {
    "url": "[URL_LOCAL][PATH_BASE]",
    "description": "💻 Local"
  }
]

**⚠️ IMPORTANTE:** 
- Si algún host se completó como "a definir", NO lo incluyas en el array
- Concatena la URL base + Path Base (ej: `https://api.example.com` + `/api/v1` = `https://api.example.com/api/v1`)
- El usuario podrá **elegir el servidor** desde un dropdown en Swagger UI
- También podrá **escribir manualmente** cualquier URL personalizada

## HEADERS DINÁMICOS - CONFIGURACIÓN:

Para que Swagger UI permita configurar headers dinámicamente:

{
  "components": {
    "parameters": {
      "ClientVersionHeader": {
        "name": "X-Client-Version",
        "in": "header",
        "required": false,
        "schema": {
          "type": "string",
          "example": "1.0.0"
        },
        "description": "Versión del cliente (configurable por request)"
      }
    }
  }
}

## ARCHIVOS DE SALIDA:

1. **openapi.json** (raíz del proyecto) ← FORMATO JSON
2. **ai_docs/08-api-reference.md** ← Debe incluir `<swagger-ui src="../openapi.json"/>`

⚠️ IMPORTANTE:
- El archivo openapi.json DEBE ser válido según OpenAPI 3.0.3
- Formato JSON (NO YAML)
- Incluye TODOS los endpoints del proyecto
- Headers dinámicos en components/parameters
- Usa $ref para reutilización
- Ejemplos realistas en cada endpoint
- Códigos de error completos
- Todos los servidores configurados en el array `servers`
- El markdown debe importar el JSON con la etiqueta `<swagger-ui>`

# OUTPUT
Los archivos generados automáticamente.
```

---

## ✅ Checklist de Generación de Documentación

Antes de considerar la documentación completa, verifica:

- [ ] **Prompt 01 ejecutado** - Análisis inicial completo

- [ ] **Prompt 02 ejecutado** - Requerimientos funcionales y no funcionales documentados

- [ ] **Prompt 03 ejecutado** - Vista Ejecutiva generada y revisada

- [ ] **Prompt 04 ejecutado** - Diagramas C4 (L1, L2, L3) generados

- [ ] **Prompt 05 ejecutado** - Docs técnica (Stack, Modelo, APIs, Integraciones)

- [ ] **Prompt 06 ejecutado** - Casos de uso y flujos de secuencia

- [ ] **Prompt 07 ejecutado** - Infraestructura y DevOps

- [ ] **Prompt 08 ejecutado** - ADRs documentados

- [ ] **Prompt 09 ejecutado** - Archivos complementarios del repositorio (README, .gitignore, CHANGELOG, .env.example, CONTRIBUTING)

- [ ] **Prompt 10 ejecutado** - Documentación de API OpenAPI/Swagger (openapi.yaml + ai_docs/08-api-reference.md)

- [ ] **Revisión humana** - Alguien del equipo ha revisado la documentación

- [ ] **Correcciones aplicadas** - Datos marcados como "REQUIERE DATO" han sido completados

- [ ] **Diagramas validados** - Los diagramas Mermaid renderizan correctamente

- [ ] **mkdocs.yml actualizado** - La navegación incluye el nuevo proyecto

- [ ] **Integrado al Hub** - La carpeta ai_docs/ está lista para usar

---

## 🔄 Mantenimiento de Documentación

### Cuándo Re-ejecutar los Prompts

- **Cambio mayor de arquitectura**: Re-ejecutar Prompts 04, 08

- **Nuevos requisitos funcionales**: Re-ejecutar Prompt 02

- **Nuevas APIs/Endpoints**: Re-ejecutar Prompt 05

- **Cambio de infraestructura**: Re-ejecutar Prompt 07

- **Nuevos casos de uso**: Re-ejecutar Prompt 06

- **Cambios de stack**: Re-ejecutar Prompt 05

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

7. **Empezar de 0 si es necesario**: A veces es mejor volver a iniciar con un prompt mas refinado y mas especifico que tratar de moldear algo que en un principio se fue por donde no se queria, la IA suele cometer mas errores en este escenario.
8. **Modularizacion**: manejar la documentacion en archivos separados facilita a la ia analizar y modificar sin usar tanta memoria mejorando el contexto.

9. **Iniciar un nuevo chat cuando sea necesario** entre mas largo el chat mas contexto que quizas no es necesario para lo que estas solicitando en el momento especifico, se demora mas, comete mas errores y consume mas tokens. 

---

## 🔄 Qué Hacer Si Hay Inconsistencias

### Problema: El Análisis Inicial No Coincide con Archivos Generados

Es normal que al ejecutar los prompts 02-09, notes que la información generada no coincide 100% con el análisis inicial (Prompt 01). Esto puede pasar por varias razones:

1. **El agente IA interpretó algo diferente** en cada ejecución
2. **El contexto cambió** entre prompts (código actualizado)
3. **Información faltante** que se completó con suposiciones

### ✅ Proceso de Validación y Corrección

#### PASO 1: Identifica las Inconsistencias

Compara el archivo `ai_docs/00-analisis-inicial.md` con los archivos generados después:

**Ejemplo de inconsistencia:**

```markdown
# En 00-analisis-inicial.md
- Base de datos: PostgreSQL 15

# En 04-tecnico/01-stack-tecnologico.md
- Base de datos: MySQL 8.0
```

#### PASO 2: Verifica la Realidad

Revisa el código fuente para confirmar cuál es la información correcta:

```bash
# Revisa archivos de configuración
cat package.json
cat docker-compose.yml
cat .env.example

# Busca en el código
grep -r "postgres\|mysql" src/
```

#### PASO 3: Decide la Acción

Tienes 3 opciones:

##### Opción A: Corregir el Archivo Específico ✅ (Recomendado para inconsistencias menores)

Si solo 1-2 archivos tienen errores pequeños:

```
@workspace

Necesito corregir el archivo ai_docs/04-tecnico/01-stack-tecnologico.md

PROBLEMA: El archivo dice que usamos MySQL, pero en realidad usamos PostgreSQL 15.

TAREA: 
1. Abre ai_docs/04-tecnico/01-stack-tecnologico.md
2. Busca la sección de Base de Datos
3. Reemplaza "MySQL 8.0" por "PostgreSQL 15"
4. Asegúrate de mantener el formato de la tabla
5. Guarda el archivo

ARCHIVO DE SALIDA: ai_docs/04-tecnico/01-stack-tecnologico.md (actualizado)
```

##### Opción B: Re-ejecutar el Prompt Completo ⚠️ (Para inconsistencias mayores)

Si todo el archivo está mal o tiene muchas inconsistencias:

1. **Borra el archivo incorrecto** (opcional, puedes pedir a Copilot que lo sobrescriba)
2. **Re-ejecuta el prompt correspondiente** con información más específica

**Ejemplo mejorado del Prompt 05:**

```
@workspace

CONTEXTO: Estoy re-generando el archivo 04-tecnico/01-stack-tecnologico.md porque 
la versión anterior tenía información incorrecta.

INFORMACIÓN CORRECTA (validada del código):
- Base de datos: PostgreSQL 15 (NO MySQL)
- ORM: Prisma 5.7 (NO TypeORM)
- Framework: Express 4.18
- Lenguaje: TypeScript 5.3

TAREA: Genera el archivo ai_docs/04-tecnico/01-stack-tecnologico.md usando 
esta información CORRECTA.

[... resto del prompt original ...]

⚠️ SOBRESCRIBE el archivo existente con la información correcta.
```

##### Opción C: Re-generar Todo Desde Cero 🔴 (Última opción)

Si hay MUCHAS inconsistencias en MÚLTIPLES archivos:

1. **Borra la carpeta ai_docs/** completa
2. **Re-ejecuta el Prompt 01** con información MÁS ESPECÍFICA:

```
@workspace

ROL: Eres un Arquitecto Senior analizando el proyecto.

PROYECTO: [Nombre]

⚠️ INFORMACIÓN ESPECÍFICA QUE DEBES USAR:

- Base de datos: PostgreSQL 15 (confirmado en docker-compose.yml)
- Framework backend: Express 4.18 (confirmado en package.json)
- ORM: Prisma 5.7 (confirmado en package.json)
- Frontend: React 18 con TypeScript
- Cloud: AWS (usa RDS, S3, EC2)

TAREA: Analiza el proyecto usando ESTA información como base de verdad.
Genera ai_docs/00-analisis-inicial.md

[... resto del prompt ...]
```

3. **Re-ejecuta todos los prompts 02-09** en orden

#### PASO 4: Documenta los Cambios

Si hiciste correcciones manuales, documéntalas en el archivo de análisis inicial:

```markdown
# En ai_docs/00-analisis-inicial.md

## Correcciones Realizadas

**Fecha:** 2025-12-11

**Cambios:**
- ✅ Corregida base de datos de MySQL a PostgreSQL 15
- ✅ Actualizado ORM de TypeORM a Prisma 5.7
- ✅ Confirmado deployment en AWS (no Azure)

**Archivos afectados:**
- ai_docs/04-tecnico/01-stack-tecnologico.md (re-generado)
- ai_docs/06-infraestructura/01-deployment.md (corregido manualmente)
```

### 🎯 Mejores Prácticas para Evitar Inconsistencias

#### 1. Sé Específico en el Prompt 01

❌ **Genérico:**
```
Analiza el proyecto y genera el análisis inicial.
```

✅ **Específico:**
```
Analiza el proyecto "E-commerce API".

INFORMACIÓN CLAVE:
- Es un sistema de e-commerce B2C
- Stack: Node.js + Express + PostgreSQL + React
- Infraestructura: AWS (ECS + RDS + S3)
- Usuarios estimados: 10,000 concurrentes
```

#### 2. Valida el Análisis Inicial ANTES de Continuar

Después del Prompt 01, **revisa `ai_docs/00-analisis-inicial.md` línea por línea** y corrige cualquier error ANTES de ejecutar los Prompts 02-09.

#### 3. Usa el Análisis Inicial como Referencia

Al ejecutar Prompts 02-09, menciona explícitamente:

```
IMPORTANTE: Consulta ai_docs/00-analisis-inicial.md para mantener coherencia.
```

#### 4. Ejecuta en Sesiones Cortas

No ejecutes los 9 prompts en una sola sesión de chat. Divide en sesiones:

**Sesión 1:**
- Prompt 01 (análisis)
- PAUSA → Revisar y validar

**Sesión 2 (nuevo chat):**
- Prompts 02-04 (requerimientos + vista ejecutiva + arquitectura)
- PAUSA → Revisar coherencia

**Sesión 3 (nuevo chat):**
- Prompts 05-07 (técnico + procesos + infraestructura)
- PAUSA → Revisar coherencia

**Sesión 4 (nuevo chat):**
- Prompts 08-09 (apéndices + archivos del repo)
- PAUSA → Revisión final

#### 5. Mantén un Checklist de Validación

Crea un archivo `VALIDACION.md` en la raíz con:

```markdown
# Checklist de Validación

## Información Crítica a Validar

- [ ] Nombre del proyecto: [CORRECTO / INCORRECTO]
- [ ] Base de datos: [PostgreSQL 15]
- [ ] Framework: [Express 4.18]
- [ ] Cloud: [AWS]
- [ ] Usuarios concurrentes: [10,000]

## Archivos Generados

- [ ] 00-analisis-inicial.md → Revisado y correcto
- [ ] 01-requerimientos.md → Coherente con análisis inicial
- [ ] 02-vista-ejecutiva.md → Números coinciden
- [ ] 03-arquitectura/*.md → Diagramas coherentes
- [ ] 04-tecnico/*.md → Stack correcto
- [ ] 05-procesos-negocio/*.md → Casos de uso reales
- [ ] 06-infraestructura/*.md → Infraestructura correcta
- [ ] README.md → Información precisa

## Inconsistencias Encontradas

| Archivo | Problema | Solución | Estado |
|---------|----------|----------|--------|
| 04-tecnico/01-stack.md | Decía MySQL en vez de PostgreSQL | Re-generado Prompt 05 | ✅ Resuelto |
```

### 📌 Regla de Oro

> **"El análisis inicial (Prompt 01) es la fuente de verdad. Si otros archivos no coinciden, revisa el análisis inicial primero. Si el análisis inicial está mal, corrígelo ANTES de continuar."**

---

## 🚀 Siguiente Paso

Continúa con **[Workflow de Integración](/guia-documentacion/06-workflow/)** para aprender cómo integrar la documentación generada al Hub Central.

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: 2025-12-11</small>
</div>

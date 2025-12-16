# 🔍 Prompt de Análisis - ADR (Architecture Decision Records)

## ROL
Eres un **Arquitecto de Software Senior** experto en identificar y documentar decisiones arquitectónicas significativas.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para identificar **decisiones arquitectónicas clave** que deben documentarse como ADRs.

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** hallazgos en consola (NO generar archivos)
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
title: "🏗️ ADR - Decisiones Arquitectónicas - [NOMBRE_PROYECTO]"
description: "Este yaml es solo un ejemplo de formato, has las preguntas de acuerdo a lo que no puedas inferir del codigo o necesites confirmar"

sections:
  - icon: "⚙️"
    title: "Stack Tecnológico"
    questions:
      - id: decision_runtime
        type: textarea
        label: "¿Por qué se eligió [RUNTIME_DETECTADO]?"
        placeholder: |
          Contexto: Necesitábamos un runtime con buen performance para I/O
          Alternativas consideradas: Python (rechazado por performance), Java (rechazado por complejidad)
          Razón: Node.js ofrece mejor I/O asíncrono y el equipo tiene experiencia
        help: "Detectado: [RUNTIME] v[VERSION]"
        required: false
      
      - id: decision_framework
        type: textarea
        label: "¿Por qué se eligió [FRAMEWORK_DETECTADO]?"
        placeholder: |
          Express: Simplicidad, ecosistema maduro, flexibilidad
          Rechazamos NestJS por overhead innecesario para nuestro caso de uso
        help: "Detectado: [FRAMEWORK] v[VERSION]"
        required: false
  
  - icon: "💾"
    title: "Base de Datos"
    questions:
      - id: decision_database
        type: textarea
        label: "¿Por qué se eligió [DB_DETECTADA]?"
        placeholder: |
          PostgreSQL elegido por:
          - Necesidad de transacciones ACID
          - Joins complejos en queries
          - Madurez y confiabilidad
          
          MongoDB considerado pero rechazado por falta de consistencia transaccional
        help: "Detectado: [DATABASE] v[VERSION]"
        required: false
      
      - id: decision_cache
        type: textarea
        label: "¿Por qué se implementó cache con [CACHE_DETECTADO]?"
        placeholder: "Redis para sesiones y rate limiting, reduce latencia en 80%"
        help: "Detectado: [CACHE_TYPE] si aplica"
        required: false
  
  - icon: "🔒"
    title: "Autenticación y Seguridad"
    questions:
      - id: decision_auth
        type: textarea
        label: "¿Por qué se eligió [AUTH_MECHANISM]?"
        placeholder: |
          JWT elegido por:
          - Diseño stateless requerido para escalabilidad horizontal
          - No necesitar shared session store
          - Mobile apps requieren tokens
          
          Sessions rechazadas por necesidad de Redis compartido
        help: "Detectado: [AUTH_TYPE]"
        required: false
  
  - icon: "🏛️"
    title: "Patrón Arquitectónico"
    questions:
      - id: decision_arquitectura
        type: textarea
        label: "¿Por qué se eligió [PATRON_DETECTADO]?"
        placeholder: |
          Monolito modular elegido por:
          - Tamaño del equipo (3 devs)
          - Complejidad de deployment reducida
          - Facilidad de debugging
          
          Microservicios considerados pero rechazados por overhead operacional
        help: "Detectado: [PATRON_ARQUITECTONICO]"
        required: false
      
      - id: decision_comunicacion
        type: textarea
        label: "¿Por qué [REST/GraphQL/gRPC]?"
        placeholder: "REST por simplicidad y compatibilidad con todos los clientes"
        help: "Detectado: [PROTOCOLO]"
        required: false
  
  - icon: "📋"
    title: "Otras Decisiones"
    questions:
      - id: decisiones_adicionales
        type: textarea
        label: "¿Hay otras decisiones arquitectónicas significativas no cubiertas?"
        placeholder: |
          - Uso de TypeScript para type safety
          - Estructura monorepo con workspaces
          - Event-driven con RabbitMQ para procesos asíncronos
        required: false
      
      - id: decisiones_lamentadas
        type: textarea
        label: "¿Hay decisiones que se lamentan o se planea cambiar?"
        placeholder: "Considerar migrar de MongoDB a PostgreSQL en Q2 por problemas de consistencia"
        required: false

# NO incluir template aquí
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

1. **Reporte en consola** con decisiones identificadas
2. **YAML** con preguntas de contexto (máximo 10-12)
3. **NO generar archivos markdown**

# 📐 Decisiones Arquitectónicas (ADRs)

## 🎯 Objetivo

Documentar decisiones arquitectónicas importantes del sistema WhatHelp Chat API, incluyendo contexto, alternativas evaluadas, razones de elección y consecuencias (trade-offs) aceptadas.

---

## 📋 Índice de Decisiones

| ID | Decisión | Estado | Fecha | Impacto |
|----|----------|--------|-------|---------|
| ADR-001 | Usar PostgreSQL como base de datos principal | Aceptada | Heredado (pre-2024) | Alto |
| ADR-002 | Integrar IBM Watson Assistant como chatbot | Aceptada | Heredado (pre-2024) | Alto |
| ADR-003 | Arquitectura de monolito en vez de microservicios | Aceptada | Heredado (pre-2024) | Alto |
| ADR-004 | Usar IBM Cloud Object Storage para archivos | Aceptada | Heredado (pre-2024) | Medio |
| ADR-005 | Implementar cache Redis con fallback a DB | Aceptada | 2024 | Medio |
| ADR-006 | Usar Socket.IO sin Redis Adapter (temporal) | En revisión | 2024 | Alto |
| ADR-007 | Cron jobs en monolito con flags de control | Obsoleta | Heredado → Q1 2026 | Alto |
| ADR-008 | No usar TypeScript (JavaScript puro) | Aceptada | Heredado (pre-2024) | Medio |
| ADR-009 | PM2 como orquestador (deprecado) | Obsoleta | Heredado → Q1 2026 | Bajo |
| ADR-010 | Cache TTL: Watson 1h, Usuarios 15min, Salas 5min | Aceptada | 2024 | Bajo |
| ADR-011 | Axede como proveedor WhatsApp Business API | Aceptada | Heredado (pre-2024) | Alto |
| ADR-012 | Dividir backend en 2 servicios (API vs Cron) | Planificada | Q1 2026 | Alto |

---

## ADR-001: Usar PostgreSQL como Base de Datos Principal

### Estado
**Aceptada** (Heredado de desarrollo anterior)

### Contexto

El sistema necesitaba una base de datos relacional para almacenar:

- Conversaciones con historial completo y búsquedas complejas

- Relaciones entre entidades (agentes, usuarios, salas, mensajes)

- Transacciones ACID para operaciones críticas (asignación de conversaciones, transferencias)

- Reportes y métricas agregadas

**Restricciones:**

- Proyecto heredado de un desarrollo anterior de propósito general

- Equipo con experiencia en SQL

### Decisión

Usar **PostgreSQL** como base de datos principal del sistema.

**Razón oficial (del formulario):** *"Aplicación heredada de un desarrollo anterior de propósito general"*

### Alternativas Consideradas

1. **MongoDB (NoSQL)**
   - **Pros:** Esquema flexible, buena performance para writes masivos, escalado horizontal nativo
   - **Contras:** Sin transacciones ACID multi-documento (en versiones antiguas), queries complejos menos eficientes, equipo sin experiencia
   - **Por qué se rechazó:** Necesidad de transacciones y joins complejos

2. **MySQL**
   - **Pros:** Similar a PostgreSQL, gran comunidad, hosting barato
   - **Contras:** Menor soporte para JSON, full-text search menos potente, menor extensibilidad
   - **Por qué se rechazó:** PostgreSQL tiene mejores features para el caso de uso

3. **Microsoft SQL Server**
   - **Pros:** Integración nativa con Azure/IBM Cloud, herramientas enterprise
   - **Contras:** Costos de licenciamiento, vendor lock-in
   - **Por qué se rechazó:** Costos y complejidad innecesaria

### Consecuencias

**Positivas:**

- ✅ Transacciones ACID garantizan consistencia en operaciones críticas

- ✅ Índices optimizados mejoran performance de queries (50-150ms ganados)

- ✅ Full-text search nativo para búsquedas en mensajes

- ✅ Soporte JSON para datos semi-estructurados (metadata de mensajes)

- ✅ Extensibilidad con pgcrypto, pg_trgm, etc.

- ✅ Equipo familiarizado con SQL

**Negativas (Trade-offs aceptados):**

- ❌ Escalado horizontal complejo (requiere sharding manual o Citus)

- ❌ Performance de writes menor que NoSQL (aceptable para 1-1,000 msg/día)

- ❌ Schema rígido dificulta cambios rápidos de modelo

**Riesgos y mitigaciones:**

- **Riesgo:** Queries lentos en tablas grandes
  - **Mitigación:** 8 índices estratégicos aplicados (ver db/migrations/)

- **Riesgo:** Deadlocks en alta concurrencia
  - **Mitigación:** Timeouts configurados, retry logic en queries críticas

### Métricas Actuales

- **Pool de conexiones:** max: 20, min: 5

- **Queries optimizadas:** 50-150ms de mejora con índices

- **Tablas principales:** 36 tablas (rooms, messages, agents, queues, etc.)

### Referencias

- Configuración pool: `app/services/postgresql.js`

- Índices aplicados: `db/migrations/*.sql`

- Optimizaciones: `OPTIMIZACIONES_ADICIONALES.md`

---

## ADR-002: Integrar IBM Watson Assistant como Chatbot

### Estado
**Aceptada** (En evaluación de migración futura)

### Contexto

El sistema requería un asistente virtual para:

- Atender primera línea de soporte (reducir carga de agentes humanos)

- Capturar información inicial de usuarios (nombre, tipo de consulta, etc.)

- Resolver consultas frecuentes automáticamente

- Detectar intenciones y enrutar a área correcta

- Procesar lenguaje natural en español

**Restricciones:**

- Aplicación nativa de IBM Cloud

- Posible requisito contractual con IBM

### Decisión

Usar **IBM Watson Assistant v10.0.0** como motor de chatbot.

**Razón oficial (del formulario):** *"Aplicación nativa de IBM Cloud"*

### Alternativas Consideradas

1. **Google Dialogflow**
   - **Pros:** Excelente NLU, integración con Google Cloud, pricing competitivo
   - **Contras:** Vendor lock-in a Google, migración compleja desde IBM Cloud
   - **Por qué se rechazó:** No alineado con ecosistema IBM Cloud del cliente

2. **Rasa Open Source**
   - **Pros:** Self-hosted, sin costos de API, control total, customizable
   - **Contras:** Requiere expertise en ML/NLP, mantenimiento complejo, hosting adicional
   - **Por qué se rechazó:** Equipo sin experiencia en ML, overhead operacional

3. **Twilio Autopilot**
   - **Pros:** Integración nativa con Twilio WhatsApp, fácil setup
   - **Contras:** Menos potente en NLU que Watson/Dialogflow, vendor lock-in
   - **Por qué se rechazó:** Cliente ya tenía contrato IBM

4. **Microsoft Bot Framework + LUIS**
   - **Pros:** Integración con Teams (ya usado), Azure ecosystem
   - **Contras:** Ecosistema diferente a IBM Cloud
   - **Por qué se rechazó:** No alineado con IBM Cloud

### Consecuencias

**Positivas:**

- ✅ NLU potente para español (entrenado por IBM)

- ✅ Integración nativa con IBM Cloud (mismo proveedor que hosting)

- ✅ SDK oficial de Node.js bien documentado

- ✅ Capacidades de diálogo multi-turn (contexto de conversación)

- ✅ Integración con Watson Discovery (futuro)

**Negativas (Trade-offs aceptados):**

- ❌ Vendor lock-in a IBM Watson

- ❌ Costos por API call (pricing basado en uso)

- ❌ Latencia adicional en cada mensaje (mitigado con cache de sesiones)

- ❌ Dependencia de servicio externo (si Watson falla, solo queda modo humano)

**Riesgos y mitigaciones:**

- **Riesgo:** Watson Assistant no disponible
  - **Mitigación:** Try-catch en código, fallback a agente humano directo

- **Riesgo:** Latencia alta en Watson API
  - **Mitigación:** Cache de session IDs (TTL: 1h, mejora 80-200ms)

- **Riesgo:** Costos escalados con alto volumen
  - **Mitigación:** Monitorear usage, evaluar alternativas si volumen crece 10x

### Estado Actual

**En evaluación de migración:** Según respuesta del formulario (`watson_migration_plans: evaluating`), se está considerando migrar a otra plataforma en el futuro.

**Posibles razones:**

- Costos acumulados

- Limitaciones de Watson Assistant

- Alternativas más potentes (GPT-4, Claude, Gemini con function calling)

### Métricas Actuales

- **Cache de sesiones:** TTL 1h, reducción 80-200ms latencia

- **SLA esperado:** No especificado en respuestas (campo vacío)

- **Failover:** Básico (try-catch, sin circuit breaker)

### Referencias

- Integración: `app/logic/AssistantLogic.js`

- Service wrapper: `app/services/watson/assistant.js`

- Cache: `app/logic/WatsonSessionId.js`

- Optimización: `CACHE_IMPLEMENTATION.md`

---

## ADR-003: Arquitectura de Monolito en vez de Microservicios

### Estado
**Aceptada** (Con plan de evolución a 2 servicios en Q1 2026)

### Contexto

El sistema necesitaba ser desarrollado rápidamente con equipo pequeño, priorizando:

- Time-to-market rápido

- Simplicidad de despliegue

- Bajo overhead operacional

- Equipo pequeño sin experiencia en microservicios

**Restricciones:**

- Aplicación heredada con esta arquitectura

- Volumen bajo (1-1,000 mensajes/día)

- 1 instancia en producción suficiente

### Decisión

Usar **arquitectura de monolito modular** con todos los componentes en un único proceso Node.js.

**Razón oficial (del formulario):** *"Aplicación heredada con esta arquitectura"*

**Trade-off aceptado (del formulario):** *"Monolito para gestión de cambios"*

### Alternativas Consideradas

1. **Microservicios (WhatsApp Service + Watson Service + API Service + Cron Service)**
   - **Pros:** Escalado independiente, deployments independientes, fault isolation
   - **Contras:** Complejidad operacional 10x, overhead de red, consistencia distribuida, equipo pequeño
   - **Por qué se rechazó:** Overhead innecesario para el volumen actual, equipo pequeño

2. **Serverless (AWS Lambda / IBM Cloud Functions)**
   - **Pros:** Auto-scaling, pay-per-use, sin gestión de infraestructura
   - **Contras:** Cold starts, límites de ejecución, stateless (problemático para WebSockets), debugging complejo
   - **Por qué se rechazó:** WebSockets difíciles de implementar, vendor lock-in extremo

3. **Modular Monolith con Domain Boundaries**
   - **Pros:** Balance entre simplicidad y modularidad, evolución futura a microservicios
   - **Contras:** Requiere disciplina en boundaries, puede acumular deuda técnica
   - **Por qué se aceptó (variante elegida):** Se implementó separación en capas (Controllers, Logic, Services)

### Consecuencias

**Positivas:**

- ✅ Despliegue simple (un único Dockerfile)

- ✅ Debugging más fácil (un solo proceso, un solo log)

- ✅ No hay overhead de red entre componentes

- ✅ Transacciones simples (todo en un DB, sin distributed transactions)

- ✅ Menor complejidad operacional (1 proceso vs 5+ servicios)

- ✅ Desarrollo rápido (cambios no requieren coordinar múltiples repos)

**Negativas (Trade-offs aceptados):**

- ❌ No se pueden escalar componentes independientemente (ej: solo cron jobs)

- ❌ Fallo de un componente tumba todo el sistema

- ❌ Deployments all-or-nothing (riesgo mayor)

- ❌ Dificultad para equipos grandes (merge conflicts en mono-repo)

- ❌ Límites de escalado vertical (CPU/RAM de una máquina)

**Riesgos y mitigaciones:**

- **Riesgo:** Cron jobs generan race conditions con múltiples instancias
  - **Mitigación:** Flags en DB (temporal), **Q1 2026: Dividir en 2 servicios**

- **Riesgo:** Socket.IO sin Redis Adapter impide escalado horizontal
  - **Mitigación:** **Q1 2026: Implementar Redis Adapter**

- **Riesgo:** Deuda técnica acumulada (ej: Room.js con 750 líneas)
  - **Mitigación:** Refactorización planificada (ver ADR-012)

### Evolución Planificada (Q1 2026)

**División en 2 servicios:**

1. **Servicio API + WebSockets (múltiples instancias)**
   - Controllers + Logic + Services
   - Socket.IO con Redis Adapter
   - Escalado horizontal completo

2. **Servicio Cron Jobs (instancia única)**
   - queue.js, rooms.js, room_files.js, report.js
   - Sin escalado (no necesario)
   - Elimina race conditions

**Futuro (Fase 2):** Migración a Kafka con IBM para event-driven architecture

### Referencias

- Respuesta formulario: `why_monolith: "Aplicación heredada con esta arquitectura"`

- Plan división: Respuesta `cron_solution`

- Problemas detectados: Respuesta `problematic_component`

---

## ADR-004: Usar IBM Cloud Object Storage para Archivos

### Estado
**Aceptada**

### Contexto

El sistema necesitaba almacenar archivos adjuntos enviados por usuarios y agentes:

- Imágenes (capturas de pantalla, fotos)

- Documentos (PDFs, Word, Excel)

- Audios (notas de voz)

- Archivos temporales de reportes

**Restricciones:**

- Aplicación nativa de IBM Cloud

- Almacenamiento en filesystem local no escalable

### Decisión

Usar **IBM Cloud Object Storage (COS)** con SDK v1.14.1 (S3-compatible).

**Razón oficial (del formulario):** *"Aplicación nativa de IBM Cloud"*

### Alternativas Consideradas

1. **AWS S3**
   - **Pros:** Líder del mercado, pricing competitivo, mejor ecosistema, multi-región
   - **Contras:** Vendor diferente a IBM Cloud (donde está la app), costos de egress entre clouds
   - **Por qué se rechazó:** Cliente quiere todo en IBM Cloud

2. **Azure Blob Storage**
   - **Pros:** Integración con Teams (ya usado), pricing similar a S3
   - **Contras:** Vendor diferente, complejidad multi-cloud
   - **Por qué se rechazó:** No alineado con IBM Cloud

3. **Filesystem Local (servidor)**
   - **Pros:** Gratis, simple, sin latencia de red
   - **Contras:** No escalable, backups manuales, pérdida de datos si server falla
   - **Por qué se rechazó:** No es production-ready

4. **PostgreSQL (BYTEA o Large Objects)**
   - **Pros:** Todo en un solo lugar, transaccional
   - **Contras:** Performance horrible para archivos grandes, backups pesados, no recomendado
   - **Por qué se rechazó:** Antipatrón conocido

### Consecuencias

**Positivas:**

- ✅ Almacenamiento ilimitado (pay-per-use)

- ✅ Durabilidad 99.999999999% (11 nines)

- ✅ API S3-compatible (fácil migrar a otro proveedor si necesario)

- ✅ CDN integrado para servir archivos rápido

- ✅ Lifecycle policies para eliminación automática

**Negativas (Trade-offs aceptados):**

- ❌ Vendor lock-in a IBM Cloud

- ❌ Costos por GB almacenado + requests

- ❌ Latencia adicional vs filesystem local (aceptable)

- ❌ Dependencia de servicio externo (si COS falla, no se pueden enviar archivos)

**Riesgos y mitigaciones:**

- **Riesgo:** IBM COS no disponible
  - **Mitigación:** Try-catch en código, mensajes de texto siguen funcionando

- **Riesgo:** Costos escalados con alto volumen de archivos
  - **Mitigación:** Cron job de limpieza (room_files.js, ejecuta 23:30 diario)

### Métricas Actuales

- **Limpieza automática:** 23:30 diario (archivos antiguos)

- **Retención:** No especificado en respuestas

### Referencias

- Service wrapper: `app/services/storage.js`

- Cron limpieza: `app/cron/room_files.js`

---

## ADR-005: Implementar Cache Redis con Fallback Automático

### Estado
**Aceptada** (Solo en desarrollo, producción en Q1 2026)

### Contexto

El sistema tenía problemas de performance:

- Queries repetitivas a PostgreSQL (session IDs de Watson, datos de usuarios)

- Latencia 80-200ms en cada request a Watson API

- Volumen creciente de mensajes degradaba performance

**Objetivo:** Reducir latencia 15-35% sin romper la aplicación si cache falla.

### Decisión

Implementar **Redis 4.6.0** como capa de cache con **fallback automático a PostgreSQL** si Redis no está disponible.

### Alternativas Consideradas

1. **Memcached**
   - **Pros:** Más simple que Redis, menor footprint de memoria
   - **Contras:** Sin persistencia, sin estructuras de datos avanzadas, sin pub/sub (necesario para Socket.IO adapter futuro)
   - **Por qué se rechazó:** Redis más versátil para necesidades futuras

2. **Cache en memoria (Node.js)**
   - **Pros:** Zero latency, sin dependencias externas
   - **Contras:** Memoria limitada del proceso Node.js, no compartido entre instancias, se pierde al reiniciar
   - **Por qué se rechazó:** No escalable a múltiples instancias

3. **No usar cache (solo PostgreSQL)**
   - **Pros:** Simplicidad, un componente menos
   - **Contras:** Performance degradada (80-200ms más lento)
   - **Por qué se rechazó:** Latencia inaceptable

### Consecuencias

**Positivas:**

- ✅ **Mejora de performance: 80-200ms (15-35%)** según CACHE_IMPLEMENTATION.md

- ✅ Fallback automático: si Redis falla, consulta PostgreSQL (resiliente)

- ✅ No rompe la aplicación si Redis no está disponible

- ✅ Preparación para Socket.IO Redis Adapter (Q1 2026)

- ✅ Reduce carga en PostgreSQL (menos queries)

**Negativas (Trade-offs aceptados):**

- ❌ Eventual consistency: datos en cache pueden estar desactualizados (TTL configurable)

- ❌ Componente adicional para mantener (Redis server)

- ❌ Uso de memoria adicional

- ❌ Complejidad en invalidación de cache

**Riesgos y mitigaciones:**

- **Riesgo:** Cache stale (datos desactualizados)
  - **Mitigación:** TTLs ajustados (Watson: 1h, Usuarios: 15min, Salas: 5min)

- **Riesgo:** Redis falla y degrada performance
  - **Mitigación:** Fallback automático a DB (código continúa funcionando)

- **Riesgo:** Cache stampede (múltiples requests regeneran cache simultáneamente)
  - **Mitigación:** Implementado en código (verificar cache.js)

### Configuración de TTLs (ver ADR-010)

| Tipo de Dato | TTL | Justificación |
|--------------|-----|---------------|
| Watson Session IDs | 1 hora | Sesiones estables durante conversación |
| Usuarios | 15 minutos | Datos cambian poco |
| Salas Activas | 5 minutos | Datos muy dinámicos |

### Estado Actual

- ✅ **Desarrollo:** Implementado y funcionando

- ❌ **Producción:** Aún no desplegado

- 📅 **Plan:** Integración en Q1 2026

**Razón del delay (del formulario):** *"Se está implementando, saldrá en el Q1 2026"*

### Métricas

- **Mejora esperada:** 80-200ms (15-35%)

- **Hit rate esperado:** >80% en Watson sessions (inferido)

### Referencias

- Implementación: `app/services/cache.js` (257 líneas)

- Documentación: `CACHE_IMPLEMENTATION.md`

- Uso: `app/logic/WatsonSessionId.js`, `app/logic/Agent.js`, etc.

---

## ADR-006: Usar Socket.IO sin Redis Adapter (Temporal)

### Estado
**En revisión** → **Será resuelto en Q1 2026**

### Contexto

El sistema necesitaba comunicación en tiempo real entre agentes y backend:

- Notificaciones de nuevas conversaciones

- Mensajes en tiempo real

- Actualizaciones de estado de conversaciones

- Indicadores de "agente escribiendo"

**Restricción actual:** Solo 1 instancia en producción, pero se planea escalar horizontalmente.

### Decisión (Temporal)

Usar **Socket.IO 4.5.2 SIN Redis Adapter** en la configuración actual.

**Razón:** Con 1 instancia, Redis Adapter no es necesario (todas las conexiones están en el mismo proceso).

### Problema Identificado

**Del formulario (`problematic_component`):**
> *"Configuración de sockets sin adapter (redis), cron jobs en monolito (al escalar horizontal hay condición de carrera)"*

**Impacto:**

- ❌ No se puede escalar horizontalmente (múltiples instancias)

- ❌ Si se despliegan 2+ instancias:
  - Agente conectado a Instancia A no recibe eventos de Instancia B
  - Mensajes se pierden entre instancias
  - Experiencia de usuario rota

### Alternativas Consideradas

1. **Socket.IO con Redis Adapter (planificado Q1 2026)**
   - **Pros:** Eventos compartidos entre instancias, escalado horizontal completo
   - **Contras:** Requiere Redis en producción (aún no desplegado)
   - **Estado:** **Planificado para Q1 2026**

2. **WebSockets nativos + Redis Pub/Sub**
   - **Pros:** Sin dependencia de Socket.IO, más control
   - **Contras:** Más código custom, sin auto-reconnect ni rooms de Socket.IO
   - **Por qué se rechazó:** Reescritura completa, no justificado

3. **Server-Sent Events (SSE)**
   - **Pros:** Unidireccional server → client suficiente para notificaciones
   - **Contras:** No bidireccional, sin binary support
   - **Por qué se rechazó:** Necesidad de comunicación bidireccional

4. **GraphQL Subscriptions**
   - **Pros:** Moderno, tipado, integrado con GraphQL (si se usa)
   - **Contras:** No se usa GraphQL en el proyecto, overhead innecesario
   - **Por qué se rechazó:** No alineado con stack actual

### Consecuencias Actuales

**Positivas (con 1 instancia):**

- ✅ Funciona correctamente con 1 instancia

- ✅ Simple, sin componentes adicionales

- ✅ Latencia baja (todo en mismo proceso)

**Negativas (al escalar):**

- ❌ **Bloqueador crítico para escalado horizontal**

- ❌ Eventos no se propagan entre instancias

- ❌ Experiencia de usuario degradada con múltiples instancias

### Plan de Resolución (Q1 2026)

**Del formulario (`socket_adapter_timeline`):** *"Q1 2026"*

**Pasos:**

1. Desplegar Redis en producción

2. Implementar Socket.IO Redis Adapter

3. Configurar adapter en `app/app.js`:
   ```javascript
   const { createAdapter } = require('@socket.io/redis-adapter');
   const { createClient } = require('redis');
   
   const pubClient = createClient({ url: process.env.REDIS_URL });
   const subClient = pubClient.duplicate();
   
   io.adapter(createAdapter(pubClient, subClient));
   ```

4. Testing con múltiples instancias

5. Deploy gradual (canary deployment)

### Referencias

- Configuración actual: `app/app.js` (Socket.IO sin adapter)

- Lógica de eventos: `app/logic/Socket.js`

- Plan: Respuesta formulario `socket_adapter_timeline: q1-2026`

---

## ADR-007: Cron Jobs en Monolito con Flags de Control

### Estado
**Obsoleta** → **Será reemplazada en Q1 2026**

### Contexto

El sistema necesitaba tareas programadas:

- Asignar conversaciones en cola cada 30s

- Cerrar salas inactivas automáticamente

- Limpiar archivos antiguos (23:30 diario)

- Generar reportes (23:45 diario)

**Restricción inicial:** Monolito con 1 instancia, cron jobs ejecutándose en el mismo proceso.

### Decisión (Temporal)

Implementar **cron jobs dentro del monolito** con **flags de control en PostgreSQL** para evitar ejecución duplicada.

**Mecanismo:**

- Tabla `general_configurations` con flags `IN_PROGRESS` / `FINALIZED`

- Antes de ejecutar, verificar flag

- Si `IN_PROGRESS`, skip (otra instancia ejecutando)

- Si `FINALIZED`, cambiar a `IN_PROGRESS`, ejecutar, cambiar a `FINALIZED`

### Problema Identificado

**Del formulario (`problematic_component`):**
> *"Cron jobs en monolito (al escalar horizontal hay condición de carrera)"*

**Impacto:**

- ⚠️ Flags en DB no son 100% confiables (race condition entre SELECT y UPDATE)

- ⚠️ Posible ejecución duplicada si 2 instancias leen flag simultáneamente

- ⚠️ Posible deadlock en high concurrency

**Ejemplo de race condition:**
```
T0: Instancia A lee flag = FINALIZED
T1: Instancia B lee flag = FINALIZED (antes de que A actualice)
T2: Instancia A actualiza flag = IN_PROGRESS, ejecuta tarea
T3: Instancia B actualiza flag = IN_PROGRESS, ejecuta tarea (duplicado!)
```

### Alternativas Consideradas

1. **Cron jobs en servicio separado (planificado Q1 2026)**
   - **Pros:** Solo 1 instancia del servicio cron, cero race conditions
   - **Contras:** Requiere división de backend (2 servicios)
   - **Estado:** **Planificado para Q1 2026**

2. **Redis Distributed Lock (RedLock)**
   - **Pros:** Lock atómico, previene race conditions 100%
   - **Contras:** Requiere Redis en producción (aún no desplegado)
   - **Por qué se rechazó temporalmente:** Redis aún no en producción

3. **PostgreSQL Advisory Locks**
   - **Pros:** Locks nativos de PostgreSQL, sin componentes adicionales
   - **Contras:** Pueden generar deadlocks, requiere gestión cuidadosa
   - **Por qué se rechazó:** Complejidad similar a flags, mismo problema de race conditions

4. **External Cron Service (AWS EventBridge, IBM Cloud Functions)**
   - **Pros:** Serverless, sin gestión de infraestructura, cron scheduling nativo
   - **Contras:** Vendor lock-in, costos adicionales, invocaciones HTTP tienen latencia
   - **Por qué se rechazó:** Overhead innecesario, preferible servicio interno

### Consecuencias Actuales

**Positivas (con 1 instancia):**

- ✅ Funciona correctamente con 1 instancia

- ✅ Simple, todo en un proceso

- ✅ No requiere componentes adicionales

**Negativas (al escalar):**

- ❌ Race condition potencial con múltiples instancias

- ❌ Posible ejecución duplicada de tareas

- ❌ **Bloqueador para escalado horizontal**

### Plan de Resolución (Q1 2026)

**Del formulario (`cron_solution`):**
> *"Se dividirá el back en dos servicios dejando los crons job en un servicio que solo tendrá una instancia, más adelante se migrará a Kafka con IBM, eso está para una segunda fase en el mismo Q1 2026"*

**Arquitectura futura:**

```
┌─────────────────────────────┐
│ Servicio 1: API + WebSockets│
│ - Controllers               │
│ - Logic                     │
│ - Services                  │
│ - Socket.IO (Redis Adapter) │
│ → Múltiples instancias      │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Servicio 2: Cron Jobs       │
│ - queue.js (cada 30s)       │
│ - rooms.js (horarios)       │
│ - room_files.js (23:30)     │
│ - report.js (23:45)         │
│ → Instancia ÚNICA           │
└─────────────────────────────┘
```

**Fase 2:** Migración a **Kafka con IBM** para event-driven architecture.

### Referencias

- Cron jobs: `app/cron/*.js`

- Flags control: Tabla `general_configurations`

- Plan: Respuesta formulario `cron_solution`

---

## ADR-008: No Usar TypeScript (JavaScript Puro)

### Estado
**Aceptada** (Heredado, sin planes de migración)

### Contexto

El proyecto fue desarrollado originalmente en JavaScript puro sin TypeScript.

### Decisión

Mantener **JavaScript puro (sin TypeScript)** en todo el codebase.

**Razón oficial (del formulario):** *"Aplicación heredada con esas características"*

### Alternativas Consideradas

1. **Migrar a TypeScript**
   - **Pros:** Type safety, mejor autocompletado IDE, refactoring más seguro, menos bugs en runtime
   - **Contras:** Curva de aprendizaje, tiempo de migración alto, equipo sin experiencia, compilación adicional
   - **Por qué se rechazó:** Costo de migración muy alto para proyecto ya funcional

2. **TypeScript solo en código nuevo**
   - **Pros:** Adopción gradual, menor riesgo
   - **Contras:** Codebase mixto (confuso), tooling más complejo
   - **Por qué se rechazó:** Complejidad de mantener 2 estilos

3. **JSDoc con type annotations**
   - **Pros:** Type hints sin compilación, compatible con JavaScript
   - **Contras:** Menos potente que TypeScript, verboso
   - **Por qué se rechazó:** No implementado, equipo no lo usa

### Consecuencias

**Positivas:**

- ✅ No requiere compilación (desarrollo más rápido)

- ✅ Curva de aprendizaje menor (equipo ya conoce JavaScript)

- ✅ Ecosystem de Node.js completo sin fricción

**Negativas (Trade-offs aceptados):**

- ❌ Bugs de tipos en runtime (ej: `undefined is not a function`)

- ❌ Refactoring más peligroso (sin type safety)

- ❌ Autocompletado IDE limitado

- ❌ Documentación de tipos manual (comentarios)

**Riesgos y mitigaciones:**

- **Riesgo:** Bugs de tipos en producción
  - **Mitigación:** Testing manual exhaustivo (según respuestas: `testing_strategy: manual`)

- **Riesgo:** Refactoring genera regresiones
  - **Mitigación:** Code reviews, testing pre-deploy

### Estado de Testing

Según respuestas del formulario: `testing_strategy: ['manual', 'none']`

**Recomendación:** Sin TypeScript, testing automatizado es CRÍTICO. Priorizar:

- Unit tests (Jest) para Logic Layer

- Integration tests (Supertest) para API

- E2E tests (Cypress) para flujos críticos

### Referencias

- Respuesta formulario: `why_no_typescript: "Aplicación heredada con esas características"`

---

## ADR-009: PM2 como Orquestador (Deprecado)

### Estado
**Obsoleta** → **Se eliminará**

### Contexto

El sistema necesitaba gestión de procesos Node.js:

- Auto-restart si el proceso falla

- Load balancing (cluster mode)

- Logs centralizados

- Monitoring básico

### Decisión (Heredada)

Usar **PM2** como orquestador de procesos (configurado en `ecosystem.config.js`).

### Problema Identificado

**Del formulario (`why_pm2`):**
> *"PM2 está en desuso, se puede eliminar"*

**Razones para eliminar:**

- ⚠️ No se usa realmente (1 instancia en producción)

- ⚠️ Overhead innecesario

- ⚠️ Herramienta redundante si se migra a Kubernetes o Docker Swarm

### Alternativas para Reemplazo

1. **Kubernetes**
   - **Pros:** Orquestación enterprise, auto-scaling, self-healing, multi-cloud
   - **Contras:** Complejidad alta, overhead operacional, requiere expertise
   - **Estado:** No confirmado en respuestas

2. **Docker Swarm**
   - **Pros:** Más simple que Kubernetes, integrado en Docker
   - **Contras:** Menos features, comunidad menor
   - **Estado:** No confirmado en respuestas

3. **Systemd (Linux)**
   - **Pros:** Nativo en Linux, simple, auto-restart
   - **Contras:** No tiene clustering ni load balancing
   - **Estado:** Opción ligera para instancia única

4. **Sin orquestador (solo Docker)**
   - **Pros:** Simplicidad máxima
   - **Contras:** Sin auto-restart automático (depende de Docker restart policy)
   - **Estado:** Suficiente para desarrollo

### Plan

**Eliminar PM2** y decidir orquestador definitivo basado en estrategia de escalado:

- Si se queda en 1 instancia: Systemd o Docker restart policy

- Si escala horizontalmente: Kubernetes o Docker Swarm

### Referencias

- Configuración: `ecosystem.config.js`

- Respuesta formulario: `why_pm2: "PM2 está en desuso se puede eliminar"`

---

## ADR-010: Cache TTL: Watson 1h, Usuarios 15min, Salas 5min

### Estado
**Aceptada**

### Contexto

Con la implementación de Redis cache (ADR-005), se necesitaba definir TTLs (Time To Live) para cada tipo de dato cacheado.

**Criterios:**

- Balance entre performance (TTL largo) y freshness (TTL corto)

- Frecuencia de cambio de cada tipo de dato

- Impacto de datos stale en experiencia de usuario

### Decisión

Configurar TTLs diferenciados por tipo de dato:

| Tipo de Dato | TTL | Razón |
|--------------|-----|-------|
| **Watson Session IDs** | **1 hora (3600s)** | Sesiones estables durante conversación activa |
| **Usuarios** | **15 minutos (900s)** | Datos de perfil cambian poco frecuentemente |
| **Salas Activas** | **5 minutos (300s)** | Estado de salas es muy dinámico |

### Justificación (del formulario - campo vacío)

El formulario no especificó razones, se infiere del comportamiento de los datos:

**Watson Session IDs (1h):**

- ✅ Sesiones Watson duran típicamente <1h (timeout de Watson)

- ✅ No hay problema si session ID en cache expira (se crea nueva automáticamente)

- ✅ Reduce drásticamente calls a Watson API (80-200ms ganados)

**Usuarios (15min):**

- ✅ Datos de perfil (nombre, email, rol) cambian poco

- ✅ 15min es aceptable para propagación de cambios (ej: cambio de rol)

- ⚠️ Si se actualiza rol, tarda hasta 15min en reflejarse (aceptable)

**Salas Activas (5min):**

- ✅ Estado de salas cambia constantemente (nuevos mensajes, transferencias, cierres)

- ⚠️ TTL muy largo causaría datos stale (agente ve sala como activa cuando ya cerró)

- ✅ 5min es balance entre performance y freshness

### Alternativas Consideradas

1. **TTL único para todos (ej: 10min)**
   - **Pros:** Simplicidad
   - **Contras:** Subóptimo para cada tipo de dato
   - **Por qué se rechazó:** Diferentes datos tienen diferentes características

2. **TTL muy cortos (ej: 1min)**
   - **Pros:** Datos siempre frescos
   - **Contras:** Hit rate bajo, poco beneficio de cache
   - **Por qué se rechazó:** Desperdicia potencial de cache

3. **TTL muy largos (ej: 1 día)**
   - **Pros:** Hit rate altísimo, máxima performance
   - **Contras:** Datos muy stale, bugs difíciles de detectar
   - **Por qué se rechazó:** Experiencia de usuario degradada

### Consecuencias

**Positivas:**

- ✅ Balance óptimo entre performance y freshness

- ✅ Hit rates altos donde importa (Watson sessions)

- ✅ Datos razonablemente actualizados

**Negativas (Trade-offs aceptados):**

- ⚠️ Eventual consistency: cambios tardan hasta TTL en propagarse

- ⚠️ Posibles bugs sutiles si no se invalida cache manualmente en cambios críticos

**Riesgos y mitigaciones:**

- **Riesgo:** Cambio crítico (ej: desactivar agente) tarda 15min en cache
  - **Mitigación:** Invalidación manual de cache en operaciones críticas

### Referencias

- Configuración: `app/services/cache.js`

- Documentación: `CACHE_IMPLEMENTATION.md`

- Respuesta formulario: `cache_ttl_reasoning: "No sé"` (campo sin especificar)

---

## ADR-011: Axede como Proveedor WhatsApp Business API

### Estado
**Aceptada**

### Contexto

El sistema necesitaba integración con WhatsApp Business API para:

- Enviar y recibir mensajes de texto

- Enviar mensajes multimedia (imágenes, documentos, audios)

- Recibir webhooks de eventos (nuevos mensajes, estados de entrega)

- Gestionar sesiones de conversación

**Restricción:** WhatsApp Business API requiere proveedor oficial (no se puede acceder directo).

### Decisión

Usar **Axede** como proveedor oficial de WhatsApp Business API.

### Alternativas Consideradas

1. **Twilio**
   - **Pros:** Líder del mercado, mejor documentación, SDK maduro, features adicionales (Autopilot, Studio)
   - **Contras:** Pricing más alto, vendor lock-in
   - **Por qué se rechazó:** No especificado en respuestas, posiblemente costo o contrato existente

**Del formulario (`alternatives_considered`):** *"Twilio"*

2. **MessageBird**
   - **Pros:** Multi-canal (WhatsApp, SMS, Voice), pricing competitivo
   - **Contras:** Menos features que Twilio
   - **Por qué se rechazó:** No especificado

3. **360Dialog**
   - **Pros:** Especializado en WhatsApp, buen pricing
   - **Contras:** Menos conocido
   - **Por qué se rechazó:** No especificado

### Consecuencias

**Positivas:**

- ✅ Integración funcional con WhatsApp Business API

- ✅ Webhooks confiables para recepción de mensajes

- ✅ Soporte para multimedia

**Negativas (Trade-offs aceptados):**

- ❌ Vendor lock-in a Axede

- ❌ Migración a otro proveedor requiere reescribir integración

- ❌ Dependencia crítica: si Axede falla, todo el canal WhatsApp cae

**Riesgos y mitigaciones:**

- **Riesgo:** Axede API no disponible
  - **Mitigación:** No detectado en código (sin circuit breaker ni fallback)

- **Riesgo:** Cambios en API de Axede rompen integración
  - **Mitigación:** Versionado de API (asumido), testing pre-deploy

### Métricas

- **Criticidad:** 🔴 Crítica (sin Axede, no hay comunicación con usuarios finales)

- **SLA:** No especificado en respuestas

- **Failover:** No detectado en código

### Referencias

- Integración: `app/services/axedeapi.js`

- Webhook handler: `app/controllers/whatsappController.js` (579 líneas)

- Lógica: `app/logic/ExternalRoom.js`

---

## ADR-012: Dividir Backend en 2 Servicios (API vs Cron)

### Estado
**Planificada** → **Q1 2026**

### Contexto

El monolito actual tiene problemas de escalabilidad:

- Socket.IO sin Redis Adapter impide múltiples instancias (ADR-006)

- Cron jobs con race conditions al escalar (ADR-007)

- Necesidad de escalar horizontalmente confirmada (del formulario: `horizontal_scaling_plan: si`)

### Decisión

**Dividir el backend en 2 servicios independientes:**

#### Servicio 1: API + WebSockets (Múltiples Instancias)
**Responsabilidades:**

- Controllers (18 archivos)

- Logic Layer (26 clases)

- Services (7 + watson/)

- Middlewares (7 archivos)

- Socket.IO con **Redis Adapter**

**Características:**

- ✅ Stateless (puede escalar horizontalmente)

- ✅ Load balancer delante (NGINX, HAProxy, etc.)

- ✅ Auto-scaling basado en CPU/memoria

- ✅ Redis Adapter para Socket.IO (eventos compartidos)

#### Servicio 2: Cron Jobs (Instancia Única)
**Responsabilidades:**

- `queue.js` (asignación auto cada 30s)

- `rooms.js` (cierre auto, encuestas)

- `room_files.js` (limpieza archivos 23:30)

- `report.js` (reportes 23:45)

**Características:**

- ✅ Solo 1 instancia (cero race conditions)

- ✅ Comparte DB con Servicio 1

- ✅ Puede invocar API del Servicio 1 si necesario

### Plan de Implementación (Q1 2026)

**Del formulario (`cron_solution`):**
> *"Se dividirá el back en dos servicios dejando los crons job en un servicio que solo tendrá una instancia, más adelante se migrará a Kafka con IBM, eso está para una segunda fase en el mismo Q1 2026"*

**Fase 1 (Q1 2026):**

1. Desplegar Redis en producción

2. Implementar Redis Adapter en Socket.IO

3. Extraer cron jobs a servicio separado

4. Configurar deployment de 2 servicios

5. Testing con múltiples instancias del Servicio 1

6. Deploy gradual (canary)

**Fase 2 (Q1 2026 - posterior):**

7. Migración a **Kafka con IBM** para event-driven architecture

8. Desacoplamiento total entre servicios

9. Escalabilidad horizontal completa

### Arquitectura Futura

```
┌──────────────────────────────────────┐
│      Load Balancer (NGINX/HAProxy)   │
└──────────────────────────────────────┘
               │
     ┌─────────┴─────────┐
     │                   │
┌────▼─────┐       ┌────▼─────┐       ┌──────────┐
│Servicio 1│       │Servicio 1│  ...  │Servicio 1│
│Instancia │       │Instancia │       │Instancia │
│    #1    │       │    #2    │       │    #N    │
└──────────┘       └──────────┘       └──────────┘
     │                   │                   │
     └───────────┬───────┴───────────────────┘
                 │
         ┌───────▼───────┐
         │  Redis Adapter │
         │  (Socket.IO)   │
         └───────┬───────┘
                 │
         ┌───────▼───────┐
         │  PostgreSQL   │
         └───────────────┘
                 ▲
                 │
         ┌───────┴───────┐
         │  Servicio 2   │
         │  (Cron Jobs)  │
         │  1 instancia  │
         └───────────────┘
```

### Consecuencias

**Positivas:**

- ✅ Escalado horizontal completo del API

- ✅ Cero race conditions en cron jobs

- ✅ Fault isolation (fallo de cron no afecta API)

- ✅ Deployments independientes (API vs Cron)

- ✅ Optimización de recursos (escalar solo lo necesario)

**Negativas (Trade-offs aceptados):**

- ❌ Complejidad operacional aumenta (2 servicios vs 1)

- ❌ Deployment más complejo (orquestar 2 servicios)

- ❌ Debugging distribuido (logs en múltiples lugares)

- ❌ Requiere Redis en producción (componente adicional)

**Riesgos y mitigaciones:**

- **Riesgo:** Complejidad de deployment
  - **Mitigación:** Docker Compose o Kubernetes (orquestación automática)

- **Riesgo:** Redis SPOF (Single Point of Failure)
  - **Mitigación:** Redis Sentinel o ElastiCache (HA)

- **Riesgo:** Logs distribuidos dificultan debugging
  - **Mitigación:** Centralizar logs (ELK Stack, Grafana Loki)

### Próximos Pasos

1. ✅ Documentar arquitectura actual (este documento)

2. ⏳ Desplegar Redis en producción (Q1 2026)

3. ⏳ Implementar Redis Adapter (Q1 2026)

4. ⏳ Extraer cron jobs a servicio separado (Q1 2026)

5. ⏳ Migración a Kafka con IBM (Fase 2, Q1 2026)

### Referencias

- Plan: Respuesta formulario `cron_solution`

- Problemas actuales: ADR-006, ADR-007

- Escalado horizontal: Respuesta `horizontal_scaling_plan: si`

---

## 📊 Resumen de Decisiones

### Decisiones Vigentes (Aceptadas)

| ADR | Decisión | Impacto | Revisión Futura |
|-----|----------|---------|-----------------|
| ADR-001 | PostgreSQL | Alto | No planificada |
| ADR-002 | IBM Watson Assistant | Alto | En evaluación |
| ADR-003 | Monolito Modular | Alto | Q1 2026 (división en 2) |
| ADR-004 | IBM Cloud Object Storage | Medio | No planificada |
| ADR-005 | Redis Cache con Fallback | Medio | Producción Q1 2026 |
| ADR-008 | JavaScript (sin TypeScript) | Medio | No planificada |
| ADR-010 | Cache TTLs diferenciados | Bajo | Ajuste según métricas |
| ADR-011 | Axede WhatsApp API | Alto | No planificada |

### Decisiones Temporales (En Revisión)

| ADR | Decisión | Problema | Resolución |
|-----|----------|----------|------------|
| ADR-006 | Socket.IO sin Redis Adapter | No escalable | Q1 2026 |
| ADR-007 | Cron jobs con flags | Race conditions | Q1 2026 |

### Decisiones Obsoletas (Deprecadas)

| ADR | Decisión | Razón | Reemplazo |
|-----|----------|-------|-----------|
| ADR-009 | PM2 como orquestador | En desuso | Por definir (K8s/Swarm/Systemd) |

### Decisiones Futuras (Planificadas)

| ADR | Decisión | Timeline | Impacto |
|-----|----------|----------|---------|
| ADR-012 | Dividir backend en 2 servicios | Q1 2026 | Alto |
| - | Migración a Kafka con IBM | Q1 2026 (Fase 2) | Alto |
| - | Evaluación migración Watson | TBD | Alto |

---

## 🔄 Proceso de ADR

### Cuándo crear un ADR

- Decisiones arquitectónicas que impactan múltiples componentes

- Trade-offs significativos entre alternativas

- Cambios difíciles de revertir (ej: elección de DB, framework)

- Restricciones de negocio o técnicas importantes

### Plantilla de ADR

```markdown
## ADR-XXX: [Título]

### Estado
[Propuesta / Aceptada / Rechazada / Obsoleta / En revisión]

### Contexto
[Problema a resolver, restricciones]

### Decisión
[Qué se decidió hacer]

### Alternativas Consideradas

1. **[Alternativa 1]**
   - Pros: [...]
   - Contras: [...]
   - Por qué se rechazó: [...]

### Consecuencias
**Positivas:** [Beneficios]
**Negativas (Trade-offs):** [Compromisos aceptados]
**Riesgos:** [Riesgos y mitigaciones]

### Referencias
[Links a código, docs, tickets]
```

---

## 📚 Referencias Externas

- [Architecture Decision Records (ADR) - GitHub](https://adr.github.io/)

- [Documenting Architecture Decisions - Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

- [ADR Tools](https://github.com/npryce/adr-tools)

---

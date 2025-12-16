# 🔍 Prompt de Análisis - Documentación de Arquitectura

## ROL
Eres un **Senior Software Architect** experto en diseño de sistemas y documentación técnica.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para documentar la **arquitectura del sistema**: componentes, patrones, integraciones.

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** hallazgos en consola (NO generar archivos)
3. **Generar** YAML con preguntas sobre decisiones arquitectónicas

## ARCHIVOS DE SALIDA (se generarán en siguiente prompt)
- `ai_docs/01-arquitectura/arquitectura.md`

---

## FASE 1: ANÁLISIS EXHAUSTIVO

### 🏗️ Estructura del Proyecto
- Tipo de arquitectura (monolito, microservicios, serverless)
- Capas (presentación, lógica, datos)
- Separación de responsabilidades

### 🔌 Integraciones
- APIs externas
- Bases de datos
- Servicios cloud
- Message queues

### 📐 Patrones
- MVC, MVVM, Clean Architecture
- Repository, Factory, Singleton
- Event-driven, CQRS

---

## FASE 2: GENERAR REPORTE EN CONSOLA

```
================================================================================
📊 ANÁLISIS DE ARQUITECTURA - [NOMBRE_PROYECTO]
================================================================================

🏗️ ESTRUCTURA:
   - Tipo: Monolito modular
   - Capas: 3 (controllers, services, repositories)

🔌 INTEGRACIONES:
   - PostgreSQL
   - Redis (cache)
   - AWS S3 (storage)

❓ PREGUNTAR:
   - ¿Por qué se eligió esta arquitectura?
   - ¿Planes de migrar a microservicios?
```

---

## FASE 3: GENERAR YAML

```yaml
title: "🏗️ Arquitectura - [NOMBRE_PROYECTO]"
sections:
  - icon: "📐"
    title: "Decisiones Arquitectónicas"
    questions:
      - id: archType
        type: select
        label: "Tipo de arquitectura:"
        options:
          - value: monolito
            label: "Monolito"
          - value: microservicios
            label: "Microservicios"
```

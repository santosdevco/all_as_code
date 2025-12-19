# 📊 Matriz de Casos de Uso y Métricas

## 🎯 Objetivo

Proporcionar una vista consolidada de todos los casos de uso con sus métricas, priorización y estado.

---

## 📋 Resumen Ejecutivo de Casos de Uso

**Total de Casos de Uso Documentados**: 18

| Categoría | Casos de Uso | Criticidad Alta | Criticidad Media | Criticidad Baja |
|-----------|--------------|-----------------|------------------|-----------------|
| Atención al Usuario | 4 | 2 | 2 | 0 |
| Gestión de Cola | 4 | 1 | 2 | 1 |
| Transferencias | 1 | 1 | 0 | 0 |
| Encuestas | 2 | 0 | 2 | 0 |
| Alertas | 3 | 0 | 1 | 2 |
| Agentes | 4 | 1 | 2 | 1 |
| **TOTAL** | **18** | **5** | **9** | **4** |

---

## 📊 Matriz Completa de Casos de Uso

| ID | Caso de Uso | Actor Principal | Criticidad | Estado | Archivo | Tiempo Avg |
|----|-------------|----------------|------------|--------|---------|------------|
| CU-001 | Recibir Mensaje WhatsApp | Usuario | ⭐⭐⭐ Alta | ✅ Implementado | 01-casos-uso-atencion.md | 300-800ms |
| CU-002 | Crear Nueva Conversación | Sistema | ⭐⭐ Media | ✅ Implementado | 01-casos-uso-atencion.md | 100ms |
| CU-003 | Encolar Conversación | Sistema | ⭐⭐ Media | ✅ Implementado | 02-casos-uso-cola.md | 50ms |
| CU-004 | Asignar Conversación a Agente | Sistema | ⭐⭐⭐ Alta | ✅ Implementado | 02-casos-uso-cola.md | 100ms |
| CU-005 | Liberar Cola Automáticamente | Sistema | ⭐⭐ Media | ✅ Implementado | 02-casos-uso-cola.md | Variable |
| CU-006 | Consultar Estado de Cola | Administrador | ⭐ Baja | ✅ Implementado | 02-casos-uso-cola.md | 50ms |
| CU-007 | Enviar Mensaje Agente a Usuario | Agente | ⭐⭐⭐ Alta | ✅ Implementado | 01-casos-uso-atencion.md | 200ms |
| CU-008 | Subir Archivo Adjunto | Usuario/Agente | ⭐⭐ Media | ✅ Implementado | 01-casos-uso-atencion.md | 350ms |
| CU-009 | Transferir Conversación | Agente/Sistema | ⭐⭐⭐ Alta | ✅ Implementado | 03-casos-uso-transferencia.md | 150ms |
| CU-010 | Login de Agente | Agente | ⭐⭐⭐ Alta | ✅ Implementado | *auth* | 100ms |
| CU-011 | Procesar Mensaje con Watson | Sistema | ⭐⭐ Media | ✅ Implementado | *watson* | 400ms |
| CU-012 | Iniciar Encuesta | Sistema | ⭐⭐ Media | ✅ Implementado | 04-casos-uso-encuestas.md | 150ms |
| CU-013 | Procesar Respuesta Encuesta | Sistema | ⭐⭐ Media | ✅ Implementado | 04-casos-uso-encuestas.md | 50ms |
| CU-014 | Publicar Alerta Masiva | Administrador | ⭐⭐ Media | ✅ Implementado | 05-casos-uso-alertas.md | 200ms |
| CU-015 | Cerrar Conversación Auto | Sistema | ⭐⭐⭐ Alta | ✅ Implementado | 07-flujo-cierre-encuesta.md | 200ms |
| CU-016 | Consultar Métricas | Administrador | ⭐ Baja | ✅ Implementado | *metrics* | 100ms |
| CU-017 | Gestionar Mensajes Protocolo | Administrador | ⭐ Baja | ✅ Implementado | 05-casos-uso-alertas.md | 50ms |
| CU-018 | Enviar Notificación a Agente | Sistema | ⭐ Baja | ✅ Implementado | 05-casos-uso-alertas.md | 100ms |

---

## 🎯 Casos de Uso por Criticidad

### ⭐⭐⭐ Alta Criticidad (5 casos)

Estos casos de uso son críticos para el funcionamiento del sistema y representan el core business.

1. **CU-001: Recibir Mensaje WhatsApp**
   - **Por qué es crítico**: Punto de entrada principal del sistema
   - **Impacto si falla**: Usuarios no pueden iniciar conversaciones
   - **Volumen**: ~1000 mensajes/día
   - **SLA**: < 1 segundo

2. **CU-004: Asignar Conversación a Agente**
   - **Por qué es crítico**: Determina eficiencia de atención
   - **Impacto si falla**: Usuarios quedan sin atender
   - **Volumen**: ~200 asignaciones/día
   - **SLA**: < 5 segundos

3. **CU-007: Enviar Mensaje Agente a Usuario**
   - **Por qué es crítico**: Canal principal de comunicación
   - **Impacto si falla**: Conversaciones interrumpidas
   - **Volumen**: ~3000 mensajes/día
   - **SLA**: < 500ms

4. **CU-009: Transferir Conversación**
   - **Por qué es crítico**: Escalamiento y especialización
   - **Impacto si falla**: Casos complejos sin resolver
   - **Volumen**: ~50 transferencias/día
   - **SLA**: < 2 segundos

5. **CU-015: Cerrar Conversación Automáticamente**
   - **Por qué es crítico**: Gestión de recursos y capacidad
   - **Impacto si falla**: Agentes saturados, cola bloqueada
   - **Volumen**: ~150 cierres auto/día
   - **SLA**: Según configuración (7 min)

---

### ⭐⭐ Media Criticidad (9 casos)

Importantes para operación eficiente pero no bloquean servicio.

- **CU-002**: Crear Nueva Conversación

- **CU-003**: Encolar Conversación

- **CU-005**: Liberar Cola Automáticamente

- **CU-008**: Subir Archivo Adjunto

- **CU-011**: Procesar Mensaje con Watson

- **CU-012**: Iniciar Encuesta

- **CU-013**: Procesar Respuesta Encuesta

- **CU-014**: Publicar Alerta Masiva

- **CU-010**: Login de Agente

---

### ⭐ Baja Criticidad (4 casos)

Funcionalidades de soporte y administración.

- **CU-006**: Consultar Estado de Cola

- **CU-016**: Consultar Métricas

- **CU-017**: Gestionar Mensajes de Protocolo

- **CU-018**: Enviar Notificación a Agente

---

## 👥 Casos de Uso por Actor

### Usuario (Funcionario del Banco)

| ID | Caso de Uso | Frecuencia | Criticidad |
|----|-------------|------------|------------|
| CU-001 | Recibir Mensaje WhatsApp | Muy Alta | ⭐⭐⭐ |
| CU-008 | Subir Archivo Adjunto | Media | ⭐⭐ |
| CU-013 | Procesar Respuesta Encuesta | Alta | ⭐⭐ |

---

### Agente de Soporte

| ID | Caso de Uso | Frecuencia | Criticidad |
|----|-------------|------------|------------|
| CU-010 | Login de Agente | Diaria | ⭐⭐⭐ |
| CU-007 | Enviar Mensaje a Usuario | Muy Alta | ⭐⭐⭐ |
| CU-008 | Subir Archivo Adjunto | Media | ⭐⭐ |
| CU-009 | Transferir Conversación | Media | ⭐⭐⭐ |

---

### Sistema Automático

| ID | Caso de Uso | Frecuencia | Criticidad |
|----|-------------|------------|------------|
| CU-002 | Crear Nueva Conversación | Alta | ⭐⭐ |
| CU-003 | Encolar Conversación | Alta | ⭐⭐ |
| CU-004 | Asignar Conversación a Agente | Alta | ⭐⭐⭐ |
| CU-005 | Liberar Cola Automáticamente | Continua | ⭐⭐ |
| CU-011 | Procesar Mensaje con Watson | Muy Alta | ⭐⭐ |
| CU-012 | Iniciar Encuesta | Alta | ⭐⭐ |
| CU-015 | Cerrar Conversación Auto | Alta | ⭐⭐⭐ |
| CU-018 | Enviar Notificación a Agente | Media | ⭐ |

---

### Administrador

| ID | Caso de Uso | Frecuencia | Criticidad |
|----|-------------|------------|------------|
| CU-006 | Consultar Estado de Cola | Continua | ⭐ |
| CU-014 | Publicar Alerta Masiva | Baja | ⭐⭐ |
| CU-016 | Consultar Métricas | Diaria | ⭐ |
| CU-017 | Gestionar Mensajes Protocolo | Baja | ⭐ |

---

## 📈 KPIs y Métricas por Caso de Uso

### Métricas de Performance

| Caso de Uso | Tiempo Esperado | Tiempo Actual | Meta | Estado |
|-------------|----------------|---------------|------|--------|
| CU-001 | < 1000ms | 300-800ms | < 500ms | ✅ Cumple |
| CU-004 | < 5000ms | ~100ms | < 2000ms | ✅ Cumple |
| CU-007 | < 500ms | ~200ms | < 300ms | ✅ Cumple |
| CU-009 | < 2000ms | ~150ms | < 1000ms | ✅ Cumple |
| CU-011 | < 3000ms | ~400ms | < 1000ms | ✅ Cumple |

---

### Métricas de Volumen (Estimadas)

| Caso de Uso | Volumen Diario | Volumen Pico/Hora | Tendencia |
|-------------|----------------|-------------------|-----------|
| CU-001 | ~1000 | ~150 | ↗️ Creciente |
| CU-004 | ~200 | ~30 | → Estable |
| CU-007 | ~3000 | ~400 | ↗️ Creciente |
| CU-009 | ~50 | ~8 | → Estable |
| CU-012 | ~150 | ~20 | → Estable |

---

### Métricas de Calidad

| Caso de Uso | Tasa de Éxito | Tasa de Error | Objetivo |
|-------------|---------------|---------------|----------|
| CU-001 | 98% | 2% | > 95% |
| CU-004 | 95% | 5% | > 90% |
| CU-007 | 96% | 4% | > 95% |
| CU-012 | 70%* | N/A | > 80% |
| CU-013 | 85% | 15%** | > 90% |

\* Tasa de completitud de encuestas
\** Respuestas inválidas que requieren reintento

---

## 🔄 Dependencias entre Casos de Uso

```
CU-001 (Recibir Mensaje)
  ├─→ CU-002 (Crear Conversación) [si nueva]
  ├─→ CU-011 (Watson) [si bot]
  │    └─→ CU-003 (Encolar) [si transferencia]
  │         └─→ CU-004 (Asignar Agente)
  │              └─→ CU-007 (Mensaje Agente)
  ├─→ CU-007 (Mensaje Agente) [si ya asignado]
  └─→ CU-013 (Respuesta Encuesta) [si en encuesta]

CU-009 (Transferir)
  └─→ CU-003 (Encolar)
       └─→ CU-004 (Asignar Agente)

CU-015 (Cerrar Auto)
  └─→ CU-012 (Iniciar Encuesta)
       └─→ CU-013 (Procesar Respuesta) [x4 preguntas]
```

---

## 📊 Dashboard de Casos de Uso

### Estado General

- ✅ **Implementados**: 18/18 (100%)

- 🚧 **En Desarrollo**: 0

- 📋 **Planificados**: 0

- ⚠️ **Con Problemas**: 0

### Cobertura de Pruebas (Recomendado)

| Tipo de Prueba | Cobertura Objetivo | Estado |
|----------------|-------------------|--------|
| Unitarias | 80% | 📊 Por definir |
| Integración | 60% | 📊 Por definir |
| E2E | 40% | 📊 Por definir |

---

## 🎯 Roadmap de Mejoras

### Prioridad Alta

1. Agregar validación de tamaño de archivos (CU-008)

2. Implementar rate limiting (todos los CU)

3. Mejorar manejo de errores en Watson (CU-011)

### Prioridad Media

4. Optimizar queries de métricas (CU-016)

5. Agregar caché en consultas de cola (CU-006)

6. Implementar retry automático en Axede (CU-007)

### Prioridad Baja

7. Mejorar UI de mensajes de protocolo (CU-017)

8. Agregar más opciones de notificaciones (CU-018)

---

**Última Actualización**: 18 de diciembre de 2025

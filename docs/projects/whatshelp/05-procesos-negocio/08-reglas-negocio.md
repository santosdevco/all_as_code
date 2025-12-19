# 📋 Reglas de Negocio Consolidadas

## 🎯 Objetivo

Consolidar todas las reglas de negocio del sistema WhatHelp Chat API.

---

## 📊 Resumen de Reglas

**Total de Reglas Identificadas**: 69

| Categoría | Cantidad |
|-----------|----------|
| Gestión de Conversaciones | 15 |
| Cola y Asignación | 12 |
| Encuestas | 10 |
| Watson Assistant | 8 |
| Transferencias | 7 |
| Mensajería y Archivos | 9 |
| Horarios y Automatización | 5 |
| Seguridad y Permisos | 8 |

---

## 🔐 Seguridad y Permisos

- **RN-001**: Un usuario solo puede tener una conversación activa a la vez

- **RN-011**: Agente solo puede enviar mensajes a salas asignadas

- **RN-031**: Una conversación solo puede tener un agente activo a la vez

- **RN-054**: Solo un banner activo por administrador

- **RN-056**: Banner visible en endpoint público sin autenticación

- **RN-058**: Mensajes de protocolo pueden ser específicos por nivel

- **RN-061**: Solo canales WhatsApp autorizados pueden enviar mensajes

- **RN-063**: Cierre manual requiere motivo obligatorio para agentes

---

## 💬 Gestión de Conversaciones

- **RN-002**: Conversaciones fuera de horario (L-D 07:00-22:00) se cierran automáticamente

- **RN-003**: Si conversación está en encuesta, solo se aceptan respuestas de encuesta

- **RN-004**: Los mensajes se almacenan incluso si hay error en el envío de respuesta

- **RN-005**: La sesión de Watson se crea solo una vez por conversación

- **RN-006**: Todas las salas nuevas inician con Watson Assistant

- **RN-007**: Estado inicial de encuesta siempre es 'PENDING'

- **RN-008**: Estado inicial de cola siempre es 'PENDING'

- **RN-009**: Se usa transacción para garantizar consistencia en creación de sala

- **RN-010**: Optimización con CTEs reduce 6 queries a 1 query

- **RN-026**: Conversaciones en cola NO tienen agente asignado

- **RN-044**: Usuario NO pierde contexto de conversación tras transferencia

- **RN-064**: Cierre automático a los 7 minutos de inactividad

- **RN-065**: Cierre por horario NO genera encuesta

- **RN-067**: Agente debe esperar a que usuario complete encuesta

- **RN-068**: Usuario puede responder encuesta en su tiempo (no expira)

---

## 🚦 Cola y Asignación de Agentes

- **RN-023**: Solo Watson puede iniciar encolamiento (usuarios NO pueden solicitar agente directamente)

- **RN-024**: Cola opera con estrategia FIFO (First In, First Out)

- **RN-025**: Una conversación solo puede estar una vez en cola

- **RN-027**: Tiempo de espera se calcula desde created_at de queue

- **RN-028**: Máximo 5 conversaciones activas por agente

- **RN-029**: Estrategia FIFO estricta (primera en cola, primera asignada)

- **RN-030**: Agentes Nivel 2 solo toman conversaciones de área 5

- **RN-032**: El contador active_rooms es crítico para disponibilidad

- **RN-033**: Se priorizan agentes con menos salas activas

- **RN-034**: releaseQueue se ejecuta automáticamente en múltiples eventos

- **RN-035**: No hay límite de tiempo en cola (solo depende de disponibilidad)

- **RN-069**: Contador active_rooms se decrementa automáticamente al cerrar

---

## 🔄 Transferencias entre Áreas

- **RN-038**: Transferencias son bidireccionales: Nivel 1 ↔ Nivel 2

- **RN-039**: Criterio de escalamiento: Complejidad del soporte requerido

- **RN-040**: Solo agentes de Nivel 2 pueden atender salas de área 5

- **RN-041**: Se registran devoluciones de Nivel 2 a Nivel 1 para métricas

- **RN-042**: Transferencia desasigna agente actual automáticamente

- **RN-043**: Sistema intenta asignar inmediatamente a agente disponible

- **RN-037**: Se diferencia entre WhatsApp (área 4) y Nivel 2 (área 5)

---

## 📊 Encuestas de Satisfacción

- **RN-045**: Encuesta se activa al cerrar conversación

- **RN-046**: Encuesta consta de 4 preguntas obligatorias

- **RN-047**: Conversación permanece cerrada durante encuesta

- **RN-048**: Usuario puede responder en su tiempo (no expira)

- **RN-049**: Preguntas: NPS (0-10), Resolución (sí/no), Satisfacción (1-5), Comentarios (texto)

- **RN-050**: Validaciones estrictas por tipo de pregunta

- **RN-051**: Encuestas negativas (score < 2) generan alerta por email

- **RN-052**: No se puede saltar preguntas (flujo secuencial)

- **RN-053**: Comentarios limitados a 250 caracteres

- **RN-066**: Encuestas con score < 2 generan email a supervisores

---

## 🤖 Watson Assistant

- **RN-062**: SLA de Watson: timeout 10 segundos

- **Watso Transferencia**: Completar flujo (action) definido para captura de información

- **watsonMaxAttempts**: 0 - No se permite transferencia por petición directa de usuarios

- **Intenciones**: Se rastrean y reportan para análisis (intentionTracking = sí)

- **Detección**: Sistema detecta action = "transfer_to_agent" para encolar

- **Fallback**: Si Watson falla, mensaje genérico y posible encolamiento

- **Sesión**: Una sesión por conversación, se mantiene durante toda la interacción

- **Context**: Se preserva contexto entre mensajes del mismo usuario

---

## 📎 Mensajería y Archivos

- **RN-012**: Archivos se almacenan en Cloud Object Storage (COS)

- **RN-013**: Mensajes de transferencia no se envían a WhatsApp

- **RN-014**: Audio se envía como HTML con tag `<audio>`

- **RN-015**: Nombre de archivo en COS: `{roomId}_{timestamp}_{extension}`

- **RN-016**: **FALTANTE**: No hay límite de tamaño configurado para archivos

- **RN-017**: Archivos de agente se almacenan en COS

- **RN-018**: Archivos de usuario quedan en Axede (solo URL)

- **RN-019**: Audio se convierte a HTML para visualización

- **RN-020**: Formato de nombre: único por sala y timestamp

**⚠️ Puntos de Mejora**:

- Agregar validación de tamaño máximo

- Agregar validación de tipos permitidos

- Configurar límite (fileUploadLimits: no hay límite configurado)

---

## ⏰ Horarios y Automatización

- **Horario de Atención**: Lunes a Domingo 07:00 - 22:00

- **Cierre por Inactividad**: 7 minutos sin actividad

- **Comportamiento Fuera de Horario**: Cierre automático (close)

- **Cron Jobs**: 
  - Cierre de salas inactivas
  - Cierre por horario
  - Procesamiento de cola
  - Limpieza de archivos

**RN-036**: Tiempo en cola se calcula en tiempo real desde encolamiento

---

## 📢 Alertas Masivas y Mensajes de Protocolo

- **RN-055**: Publicar nuevo banner desactiva el anterior del mismo admin

- **RN-057**: Imágenes de banners en carpeta `MASS_ALERTS/` de COS

- **RN-059**: Position determina orden de visualización de mensajes de protocolo

- **RN-060**: Plantillas son de la entidad (institucionales)

**Propósito Alertas Masivas**: Reducir chats en cola durante fallas masivas en productos digitales

**Uso Mensajes de Protocolo**: Plantillas institucionales para estandarizar comunicación

---

## 📈 Métricas y Reporting

- **Frecuencia**: Tiempo real (realtime)

- **Tracking**: Intenciones de Watson se rastrean para análisis

- **Motivos de Cierre**: Obligatorio para agentes (closureReasonsRequired = agent_only)

- **Reportes**: 
  - Métricas de conversaciones
  - Tópicos de Watson
  - Login/Logout de agentes
  - Opciones de reportes personalizados

---

## 🌐 Canales de Comunicación

- **Canal Principal**: WhatsApp

- **Canal Secundario**: Microsoft Teams (en desuso - teamsVsWhatsappDiff)

- **Diferencias**: Teams no está en uso activo por los usuarios

---

## ✅ Cumplimiento y Validaciones

### Validaciones Obligatorias

1. **Autenticación**: JWT válido en todas las rutas protegidas

2. **Permisos**: Validación de permisos por rol (agent/user/admin)

3. **Estado de Sala**: Validación de estados permitidos

4. **Encuesta**: Validación estricta según tipo de pregunta

5. **Cola**: Validación de no-duplicados

6. **Agente**: Validación de capacidad (active_rooms < 5)

### Validaciones Recomendadas (Faltantes)

1. **Archivos**: Tamaño máximo y tipos permitidos

2. **Rate Limiting**: Límite de peticiones por tiempo

3. **Input Sanitization**: Validación de inputs maliciosos

4. **SQL Injection**: Uso de prepared statements (✅ implementado)

---

## 🔍 Matriz de Dependencias

| Regla | Depende de | Impacta a |
|-------|-----------|-----------|
| RN-001 | RN-026 | RN-044 |
| RN-024 | RN-029 | RN-033 |
| RN-028 | RN-032 | RN-069 |
| RN-038 | RN-039, RN-040 | RN-041 |
| RN-045 | RN-046 | RN-051 |

---

## 📌 Reglas Críticas de Negocio

### Top 10 Reglas Más Importantes

1. **RN-001**: Una sala activa por usuario (integridad de datos)

2. **RN-024**: Cola FIFO (equidad en atención)

3. **RN-028**: Máx 5 salas por agente (calidad de servicio)

4. **RN-038**: Transferencias bidireccionales (flexibilidad operativa)

5. **RN-045**: Encuesta al cerrar (medición de calidad)

6. **RN-051**: Alertas por encuestas negativas (gestión de calidad)

7. **RN-002**: Cierre fuera de horario (cumplimiento operativo)

8. **RN-023**: Solo Watson inicia encolamiento (control de flujo)

9. **RN-064**: Cierre por inactividad 7 min (eficiencia)

10. **RN-011**: Permisos de sala (seguridad)

---

**Última Actualización**: 18 de diciembre de 2025

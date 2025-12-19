# 📋 Procesos de Negocio - WhatHelp Chat API

## 🎯 Objetivo

Documentar los procesos de negocio, casos de uso y flujos funcionales del sistema desde una perspectiva entendible por stakeholders no técnicos.

---

## 📚 Estructura de Documentación

### Casos de Uso por Dominio

1. **[01-casos-uso-atencion.md](./01-casos-uso-atencion.md)** - Atención al Usuario
   - Recepción de mensajes WhatsApp
   - Gestión de conversaciones
   - Transferencia a agentes

2. **[02-casos-uso-cola.md](./02-casos-uso-cola.md)** - Gestión de Cola
   - Encolamiento de conversaciones
   - Asignación de agentes
   - Liberación de cola

3. **[03-casos-uso-agentes.md](./03-casos-uso-agentes.md)** - Gestión de Agentes
   - Login/Logout de agentes
   - Gestión de salas activas
   - Mensajes de agente a usuario

4. **[04-casos-uso-encuestas.md](./04-casos-uso-encuestas.md)** - Encuestas de Satisfacción
   - Activación de encuesta
   - Recolección de respuestas
   - Procesamiento de resultados

5. **[05-casos-uso-watson.md](./05-casos-uso-watson.md)** - Asistente Virtual Watson
   - Creación de sesiones
   - Procesamiento de mensajes
   - Detección de transferencias

6. **[06-casos-uso-alertas.md](./06-casos-uso-alertas.md)** - Alertas y Notificaciones
   - Alertas masivas (banners)
   - Notificaciones a agentes
   - Mensajes de protocolo

### Flujos Funcionales

7. **[07-flujo-whatsapp-entrada.md](./07-flujo-whatsapp-entrada.md)** - Flujo de Mensaje Entrante WhatsApp

8. **[08-flujo-asignacion-agente.md](./08-flujo-asignacion-agente.md)** - Flujo de Asignación de Agente

9. **[09-flujo-transferencia.md](./09-flujo-transferencia.md)** - Flujo de Transferencia entre Áreas

10. **[10-flujo-cierre-conversacion.md](./10-flujo-cierre-conversacion.md)** - Flujo de Cierre de Conversación

11. **[11-flujo-encuesta.md](./11-flujo-encuesta.md)** - Flujo de Encuesta Post-Atención

12. **[12-flujo-cron-jobs.md](./12-flujo-cron-jobs.md)** - Procesos Automáticos y Cron Jobs

### Información Adicional

13. **[13-reglas-negocio.md](./13-reglas-negocio.md)** - Reglas de Negocio Consolidadas

14. **[14-matriz-casos-uso.md](./14-matriz-casos-uso.md)** - Matriz y Métricas de Casos de Uso

---

## 📊 Resumen Ejecutivo

### Casos de Uso Totales: 18

| Criticidad | Cantidad | Porcentaje |
|------------|----------|------------|
| Alta       | 8        | 44%        |
| Media      | 7        | 39%        |
| Baja       | 3        | 17%        |

### Flujos Principales: 6

Todos los flujos incluyen diagramas de secuencia detallados.

### Reglas de Negocio Identificadas: 25+

---

## 🎯 Casos de Uso por Criticidad

### Alta Criticidad

- CU-001: Recibir Mensaje WhatsApp

- CU-004: Asignar Conversación a Agente

- CU-007: Enviar Mensaje Agente a Usuario

- CU-009: Transferir Conversación entre Áreas

- CU-010: Crear Sesión Watson

- CU-015: Cerrar Conversación Automáticamente

### Media Criticidad

- CU-002: Crear Nueva Conversación

- CU-003: Encolar Conversación

- CU-011: Procesar Mensaje con Watson

- CU-012: Iniciar Encuesta de Satisfacción

- CU-014: Publicar Alerta Masiva

### Baja Criticidad

- CU-016: Consultar Métricas

- CU-017: Gestionar Mensajes de Protocolo

- CU-018: Registrar Log de Agente

---

## 🔄 Flujos Principales

1. **Atención WhatsApp**: Usuario → Watson → Cola → Agente

2. **Asignación**: Cola FIFO → Agente disponible (máx 5 salas)

3. **Transferencia**: Nivel 1 ↔ Nivel 2 (bidireccional)

4. **Cierre**: Conversación → Encuesta → Finalización

5. **Procesos Automáticos**: Cierre por inactividad (7 min) + Cierre por horario

---

## 📅 Información del Sistema

**Horario de Atención**: Lunes a Domingo 07:00 - 22:00

**Tiempo de Cierre Automático**: 7 minutos de inactividad

**Capacidad por Agente**: 5 conversaciones simultáneas

**Cola**: FIFO (Primero en llegar, primero en atender)

**Canal Principal**: WhatsApp (Teams en desuso)

---

## 📖 Cómo Usar Esta Documentación

1. **Para entender un proceso específico**: Ir al archivo de casos de uso correspondiente

2. **Para ver el flujo técnico**: Consultar los archivos de flujos funcionales

3. **Para validar reglas de negocio**: Ver archivo de reglas consolidadas

4. **Para métricas y priorización**: Consultar matriz de casos de uso

---

**Última Actualización**: 18 de diciembre de 2025

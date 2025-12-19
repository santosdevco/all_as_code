# 📋 Casos de Uso - Gestión de Cola

## 🎯 Objetivo

Documentar los casos de uso relacionados con el sistema de cola para asignación de conversaciones a agentes.

---

## 📊 Casos de Uso en Este Módulo

| ID | Caso de Uso | Actor | Criticidad | Estado |
|----|-------------|-------|------------|--------|
| CU-003 | Encolar Conversación | Sistema | Media | ✅ Implementado |
| CU-004 | Asignar Conversación a Agente | Sistema | Alta | ✅ Implementado |
| CU-005 | Liberar Cola Automáticamente | Sistema | Media | ✅ Implementado |
| CU-006 | Consultar Estado de Cola | Administrador | Baja | ✅ Implementado |

---

## CU-003: Encolar Conversación

### Descripción
El sistema coloca una conversación en cola de espera cuando Watson Assistant determina que requiere atención humana.

### Actores

- **Primario**: Sistema

- **Secundarios**: Watson Assistant, Usuario (en espera)

### Precondiciones

- Conversación activa

- Watson detectó transferencia a agente humano

- Usuario completó flujo de captura de información en Watson

### Trigger

- **Evento**: Watson retorna acción de transferencia

- **Origen**: Respuesta de Watson Assistant con flag de transferencia

---

#### Flujo Principal (Happy Path)

1. Watson Assistant procesa mensaje del usuario

2. Watson detecta que conversación debe transferirse a agente (acción completada)

3. Sistema recibe indicador de transferencia de Watson

4. Sistema valida que no existe entrada duplicada en cola para esa sala

5. Sistema crea registro en tabla `queues`:
   - room_id: ID de la conversación
   - area_id: Área destino (Nivel 1 o Nivel 2)
   - created_at: Timestamp de encolamiento

6. Sistema actualiza estado de sala:
   - queue: 'IN QUEUE'

7. Sistema desasigna a Watson de la sala (agent_rooms.status = false)

8. Sistema crea log en room_logs (categoria: QUEUE)

9. Sistema calcula tiempo de espera

10. Sistema emite evento Socket.IO a administradores (ON_QUEUE)

11. Sistema notifica usuario: "En breve un asesor te atenderá"

12. **Postcondición**: Conversación en cola esperando agente disponible

---

#### Flujos Alternativos

**FA-1: Transferencia Directa a Nivel 2**

5a. Si Watson determina que requiere Nivel 2:
   - area_id = 5 (Nivel 2)
   - Cola específica para agentes especializados
   - Continúa flujo normal

**FA-2: Usuario Ya en Cola**

4a. Si ya existe registro en cola para esa sala:
   - Sistema NO crea duplicado
   - Retorna información de cola existente
   - Termina

---

#### Flujos de Excepción

**FE-1: No Hay Agentes Disponibles**

Xa. Sistema encola de todas formas:
   - Usuario espera en cola
   - Tiempo de espera se acumula
   - Cuando agente esté disponible, se asignará por FIFO

**FE-2: Fuera de Horario**

Xa. Si se intenta encolar fuera de horario (antes 07:00 o después 22:00):
   - Sistema encola temporalmente
   - Cron job de cierre automático detecta sala
   - Sistema cierra sala (CLOSED_BY_SCHEDULE)
   - Se elimina de cola

---

#### Reglas de Negocio

- **RN-023**: Solo Watson puede iniciar encolamiento (usuarios NO pueden solicitar agente directamente - watsonMaxAttempts = 0)

- **RN-024**: Cola opera con estrategia FIFO (First In, First Out)

- **RN-025**: Una conversación solo puede estar una vez en cola

- **RN-026**: Conversaciones en cola NO tienen agente asignado

- **RN-027**: Tiempo de espera se calcula desde created_at de queue

---

#### Postcondiciones

**Éxito**:

- Conversación en tabla queues

- Estado de sala: queue = 'IN QUEUE'

- Watson desasignado

- Usuario notificado de espera

- Administradores ven conversación en cola

**Fallo**:

- Conversación puede quedar en estado inconsistente

- Usuario no recibe notificación

---

#### Información Técnica

**Métodos**: 

- `Room.transfer_queue()` (para encolar)

- Llamado desde Watson cuando detecta transferencia

**Archivo**: `app/logic/Room.js`

**Estado**: ✅ Implementado

---

## CU-004: Asignar Conversación a Agente

### Descripción
El sistema asigna automáticamente una conversación de la cola al primer agente disponible siguiendo estrategia FIFO.

### Actores

- **Primario**: Sistema

- **Secundarios**: Agente, Usuario, Administrador

### Precondiciones

- Conversación en cola (estado: IN QUEUE)

- Agente disponible (active_rooms < 5)

- Agente online y autenticado

### Trigger

- **Evento**: Agente se conecta o libera una sala

- **Origen**: Socket.IO evento "RELEASE_QUEUE" o conexión de agente

---

#### Flujo Principal (Happy Path)

1. Sistema detecta que agente está disponible (active_rooms < 5)

2. Sistema consulta primera conversación en cola (ORDER BY id ASC - FIFO)

3. Sistema valida que agente puede tomar la sala:
   - Agente online = true
   - Agente active_rooms < 5
   - Agente pertenece al área correcta (si aplica Nivel 2)

4. Sistema elimina conversación de tabla `queues`

5. Sistema valida que sala no tenga ya un agente asignado (evitar duplicados)

6. Sistema crea registro en `agent_rooms`:
   - agent_id: ID del agente
   - room_id: ID de la sala
   - status: true

7. Sistema consulta salas activas del agente

8. Sistema actualiza contador de agente:
   - active_rooms = COUNT de agent_rooms con status = true

9. Sistema actualiza estado de sala:
   - queue: 'COMPLETED'

10. Sistema guarda mensaje automático: "{nombre_agente} se ha unido a la conversación"

11. Sistema emite eventos Socket.IO:
    - A agente: Nueva sala asignada (ON_ASSIGNED_QUEUE)
    - A sala: Agente se unió (ON_MESSAGE)
    - A administradores: Actualización de cola (ON_RELEASE_QUEUE)

12. Usuario ve mensaje de agente asignado en WhatsApp

13. **Postcondición**: Agente y usuario pueden conversar

---

#### Flujos Alternativos

**FA-1: Múltiples Conversaciones en Cola**

2a. Si hay varias conversaciones esperando:
   - Sistema toma la más antigua (FIFO)
   - Repite proceso para siguiente agente disponible
   - Continúa hasta vaciar cola o agotar agentes

**FA-2: Agente de Nivel 2**

3a. Si conversación requiere Nivel 2:
   - Sistema filtra solo agentes con level_two = true
   - Asigna solo a agentes especializados
   - Continúa flujo normal

---

#### Flujos de Excepción

**FE-1: Sala Ya Tiene Agente**

5a. Si al validar, sala ya tiene agente asignado:
   - Sistema ejecuta ROLLBACK
   - No se asigna segundo agente
   - Sistema retorna error: "sala ya transferida"
   - Cola se liberó pero sala no se asignó (inconsistencia)

**FE-2: Agente Llega a Límite Durante Asignación**

3a. Si entre validación y asignación, agente llega a 5 salas:
   - Asignación falla
   - Conversación puede salir de cola sin asignarse
   - Requiere evento RELEASE_QUEUE manual

**FE-3: Usuario Se Desconectó**

Xa. Sistema asigna de todas formas:
   - Conversación queda asignada
   - Cuando usuario regrese, continuará con ese agente
   - user_online se actualiza dinámicamente

---

#### Reglas de Negocio

- **RN-028**: Máximo 5 conversaciones activas por agente (maxActiveRoomsAgent = 5)

- **RN-029**: Estrategia FIFO estricta (primera en cola, primera asignada)

- **RN-030**: Agentes Nivel 2 solo toman conversaciones de área 5

- **RN-031**: Una conversación solo puede tener un agente activo a la vez

- **RN-032**: El contador active_rooms es crítico para disponibilidad

---

#### Postcondiciones

**Éxito**:

- Conversación removida de cola

- Agente asignado a sala

- Contador active_rooms incrementado

- Eventos Socket.IO emitidos

- Usuario y agente pueden conversar

**Fallo**:

- Conversación puede salir de cola sin asignarse

- Estado inconsistente requiere corrección manual

---

#### Información Técnica

**Métodos**: 

- `Queue.release(agent, queueRoom)`

- `releaseQueue(io)` - Helper que itera agentes disponibles

**Archivos**: 

- `app/logic/Queue.js`

- `app/helpers/queue.js`

**Estado**: ✅ Implementado

**Optimización**: 

- Se ejecuta automáticamente cuando:
  - Agente se conecta
  - Agente cierra una sala
  - Agente solicita manualmente (RELEASE_QUEUE)

---

## CU-005: Liberar Cola Automáticamente

### Descripción
El sistema asigna automáticamente todas las conversaciones en cola a agentes disponibles cuando hay capacidad.

### Actores

- **Primario**: Sistema

- **Secundarios**: Agentes disponibles, Usuarios en espera

### Precondiciones

- Existen conversaciones en cola

- Existen agentes online con capacidad (active_rooms < 5)

### Trigger

- **Evento**: Socket.IO "RELEASE_QUEUE"

- **Origen**: Agente se conecta, cierra sala, o solicita manualmente

---

#### Flujo Principal (Happy Path)

1. Sistema recibe evento RELEASE_QUEUE

2. Sistema consulta todos los agentes disponibles:
   - online = true
   - active_rooms < 5
   - Ordenados por active_rooms ASC (menos ocupados primero)

3. Sistema consulta todas las conversaciones en cola (ORDER BY id ASC)

4. Para cada agente disponible:
   - Sistema calcula cuántas salas puede tomar (5 - active_rooms)
   - Sistema asigna conversaciones hasta llenar capacidad

5. Para cada asignación:
   - Sistema ejecuta CU-004 (Asignar Conversación a Agente)

6. Sistema continúa hasta que:
   - Cola vacía, O
   - No hay más agentes con capacidad

7. Sistema emite evento final de actualización de cola

8. **Postcondición**: Máxima cantidad de conversaciones asignadas

---

#### Flujos Alternativos

**FA-1: Solo Agentes Nivel 1 Disponibles**

2a. Si solo hay agentes de Nivel 1:
   - Sistema asigna solo conversaciones de área 4 (Nivel 1)
   - Conversaciones de área 5 (Nivel 2) quedan en cola
   - Continúa

**FA-2: Cola Vacía**

3a. Si no hay conversaciones en cola:
   - Sistema termina inmediatamente
   - No se realiza ninguna asignación

---

#### Flujos de Excepción

**FE-1: Todos los Agentes Ocupados**

2a. Si todos los agentes tienen active_rooms = 5:
   - Sistema no puede asignar
   - Conversaciones permanecen en cola
   - Esperan a que algún agente se libere

---

#### Reglas de Negocio

- **RN-033**: Se priorizan agentes con menos salas activas

- **RN-034**: Proceso se ejecuta automáticamente en múltiples eventos

- **RN-035**: No hay límite de tiempo en cola (solo depende de disponibilidad)

---

#### Postcondiciones

**Éxito**:

- Máximo de conversaciones asignadas

- Agentes trabajando a capacidad

- Cola reducida o vacía

**Fallo**:

- Conversaciones permanecen en cola

- Usuarios siguen esperando

---

#### Información Técnica

**Método**: `releaseQueue(io)`

**Archivo**: `app/helpers/queue.js`

**Estado**: ✅ Implementado

**Eventos que lo Disparan**:

- Agente se conecta (Socket.IO connection)

- Agente cierra sala

- Agente solicita manualmente (botón en UI)

- Sala se transfiere

---

## CU-006: Consultar Estado de Cola

### Descripción
Un administrador consulta el estado actual de la cola para monitoreo y gestión.

### Actores

- **Primario**: Administrador

- **Secundarios**: Sistema de reporting

### Precondiciones

- Administrador autenticado

- Permiso de administrador

### Trigger

- **Evento**: `GET /queue`

- **Origen**: Dashboard de administración

---

#### Flujo Principal (Happy Path)

1. Administrador accede a dashboard

2. Sistema consulta tabla `queues`

3. Para cada conversación en cola, sistema obtiene:
   - room_id: ID de la sala
   - phone_number: Número del usuario
   - new_area: Nombre del área (WhatsApp o Nivel 2)
   - minutes: Minutos en espera (calculado desde created_at)

4. Sistema retorna lista ordenada por tiempo de espera (más antiguos primero)

5. Dashboard muestra información en tiempo real

6. **Postcondición**: Administrador ve estado de la cola

---

#### Flujos Alternativos

**FA-1: Filtrar Solo Nivel 2**

2a. Si query param `lvltwo=true`:
   - Sistema filtra solo conversaciones con area_id = 5
   - Retorna solo cola de Nivel 2

---

#### Reglas de Negocio

- **RN-036**: Tiempo se calcula en tiempo real desde encolamiento

- **RN-037**: Se diferencia entre WhatsApp (área 4) y Nivel 2 (área 5)

---

#### Información Técnica

**Endpoint**: `GET /queue?lvltwo={true|false}`

**Archivo**: `app/controllers/queueController.js`

**Estado**: ✅ Implementado

---

**Última Actualización**: 18 de diciembre de 2025

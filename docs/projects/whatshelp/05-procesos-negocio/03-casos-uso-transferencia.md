# 📋 Casos de Uso - Transferencia de Conversaciones

## 🎯 Objetivo

Documentar el caso de uso de transferencia de conversaciones entre áreas y niveles de soporte.

---

## 📊 Casos de Uso en Este Módulo

| ID | Caso de Uso | Actor | Criticidad | Estado |
|----|-------------|-------|------------|--------|
| CU-009 | Transferir Conversación entre Áreas | Agente/Sistema | Alta | ✅ Implementado |

---

## CU-009: Transferir Conversación entre Áreas

### Descripción
Un agente transfiere una conversación a otra área de soporte (escalamiento a Nivel 2 o devolución a Nivel 1) basándose en la complejidad del caso.

### Actores

- **Primario**: Agente

- **Secundarios**: Sistema de Cola, Usuario, Agente receptor

### Precondiciones

- Agente autenticado

- Conversación activa asignada al agente

- Área destino válida y activa

### Trigger

- **Evento**: `POST /rooms/transfer/:area_id`

- **Origen**: Agente selecciona área destino en interfaz

---

#### Flujo Principal (Happy Path)

1. Agente determina que conversación requiere transferencia

2. Agente selecciona área destino en interfaz

3. Sistema valida autenticación del agente (JWT)

4. Sistema valida datos:
   - roomId: ID de la sala a transferir
   - area_id: ID del área destino
   - ticket: Número de ticket (opcional)

5. Sistema desactiva asignación actual del agente:
   - agent_rooms.status = false (para agente actual)

6. Sistema actualiza sala:
   - area_id = área destino
   - queue = 'IN QUEUE'

7. Sistema crea registro en tabla `queues`:
   - room_id: ID de la sala
   - area_id: ID del área destino

8. Si es transferencia a Nivel 1 (área_id = 4):
   - Sistema registra retorno en tabla room_returns
   - Marca sala como "retornada"

9. Sistema crea log de transferencia en room_logs

10. Sistema decrementa contador active_rooms del agente actual

11. Sistema ejecuta liberación automática de cola (releaseQueue)

12. Sistema emite eventos Socket.IO:
    - A sala: Notificación de transferencia (ON_TRANSFER)
    - A administradores: Actualización de transferencia (ON_TRANSFER_ROOM)

13. Usuario recibe notificación: "Tu conversación ha sido transferida"

14. Sistema asigna automáticamente a agente disponible del área destino

15. **Postcondición**: Conversación transferida y asignada a nueva área

---

#### Flujos Alternativos

**FA-1: Transferencia de Nivel 1 a Nivel 2 (Escalamiento)**

Criterio: Complejidad del soporte requerido supera capacidad de Nivel 1

2a. Agente determina que caso es complejo
3a. Agente selecciona área 5 (Nivel 2)
5a. Sistema encola en área 5
6a. Solo agentes con level_two = true pueden tomar la sala
7a. Continúa flujo normal

**FA-2: Transferencia de Nivel 2 a Nivel 1 (Devolución)**

Criterio: Caso resuelto o no requiere especialización

2a. Agente de Nivel 2 determina que caso puede manejarlo Nivel 1
3a. Agente selecciona área 4 (Nivel 1/WhatsApp)
8a. Sistema registra devolución (saveReturnRoom)
9a. Sistema marca para métricas de retorno
10a. Continúa flujo normal

**FA-3: Transferencia con Ticket**

4a. Si agente proporciona número de ticket:
   - Sistema asocia ticket a la transferencia
   - Se usa para tracking y reportes
   - Continúa flujo normal

---

#### Flujos de Excepción

**FE-1: Área Destino No Existe**

4a. Si area_id no es válido:
   - Sistema retorna error 404
   - No se realiza transferencia
   - Agente recibe notificación de error

**FE-2: No Hay Agentes Disponibles en Área Destino**

14a. Si no hay agentes disponibles en área destino:
   - Conversación queda en cola
   - Usuario espera asignación
   - Cuando agente se conecte, se asignará automáticamente

**FE-3: Agente No Tiene Permiso**

3a. Si agente intenta transferir sala que no tiene asignada:
   - Sistema retorna 401 Unauthorized
   - No se procesa transferencia

---

#### Reglas de Negocio

- **RN-038**: Transferencias son bidireccionales: Nivel 1 ↔ Nivel 2 (returnToLevel1 = sí)

- **RN-039**: Criterio de escalamiento: "Complejidad del soporte requerido por parte del funcionario" (level2Criteria)

- **RN-040**: Solo agentes de Nivel 2 pueden atender salas de área 5

- **RN-041**: Se registran devoluciones de Nivel 2 a Nivel 1 para métricas

- **RN-042**: Transferencia desasigna agente actual automáticamente

- **RN-043**: Sistema intenta asignar inmediatamente a agente disponible

- **RN-044**: Usuario NO pierde contexto de conversación (historial se mantiene)

---

#### Postcondiciones

**Éxito**:

- Conversación en área destino

- Agente original desasignado

- Contador active_rooms actualizado

- Registro en cola

- Log de transferencia creado

- Usuario notificado

- Nueva asignación (si hay agente disponible)

**Fallo**:

- Conversación puede quedar en estado inconsistente

- Requiere corrección manual

---

#### Información Técnica

**Endpoint**: `POST /rooms/transfer/:area_id`

**Body**:
```json
{
  "roomId": 123,
  "ticket": "TK-12345" // opcional
}
```

**Archivos**: 

- `app/controllers/roomController.js` (room_transfer)

- `app/logic/Room.js` (transfer_queue, saveReturnRoom)

**Estado**: ✅ Implementado

**Métricas Relacionadas**:

- Cantidad de escalamientos Nivel 1 → Nivel 2

- Cantidad de devoluciones Nivel 2 → Nivel 1

- Tiempo promedio en cada nivel

- Tasa de resolución por nivel

---

### Criterios de Transferencia

#### Escalamiento a Nivel 2 (Área 5)

**Casos Comunes**:

- Problema técnico complejo que supera conocimiento de Nivel 1

- Requiere acceso a sistemas especializados

- Requiere permisos o autorizaciones especiales

- Caso recurrente que no se ha podido resolver

- Solicitud específica de soporte avanzado

**Decisión**: Agente de Nivel 1 determina basándose en complejidad

#### Devolución a Nivel 1 (Área 4)

**Casos Comunes**:

- Problema resuelto por Nivel 2

- Caso que no requería especialización

- Seguimiento post-resolución

- Información adicional proporcionada permite manejo en Nivel 1

**Decisión**: Agente de Nivel 2 determina que ya no requiere especialización

---

### Flujo de Bidireccionalidad

```
┌─────────────┐                    ┌─────────────┐
│   Nivel 1   │ ←── Devolución ──  │   Nivel 2   │
│   (Área 4)  │                    │   (Área 5)  │
│  WhatsApp   │  ── Escalamiento → │ Especializado│
└─────────────┘                    └─────────────┘
      ↑                                    ↑
      │                                    │
   FIFO Cola                           FIFO Cola
   (5 salas/agente)                   (5 salas/agente)
```

---

**Última Actualización**: 18 de diciembre de 2025

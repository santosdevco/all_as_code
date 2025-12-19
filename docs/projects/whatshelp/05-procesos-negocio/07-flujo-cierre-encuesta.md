# 🔄 Flujo Funcional - Cierre de Conversación y Encuesta

## 🎯 Objetivo

Documentar el flujo completo de cierre de conversación seguido de encuesta de satisfacción.

---

## 📊 Información del Flujo

| Propiedad | Valor |
|-----------|-------|
| **Nombre** | Cierre de Conversación + Encuesta |
| **Participantes** | 5 (Agente/Sistema, API, Logic, DB, WhatsApp) |
| **Complejidad** | Media |
| **Asíncrono** | No |
| **Tiempo Promedio** | 200-400ms |

---

## 🔄 Diagrama de Secuencia

```mermaid
sequenceDiagram
    actor Trigger as Agente/Cron
    participant API as API Backend
    participant Room as Room Logic
    participant Survey as Survey Logic
    participant DB as PostgreSQL
    participant Axede as WhatsApp/Axede
    participant Socket as Socket.IO
    actor Usuario

    alt Cierre Manual (Agente)
        Trigger->>API: POST /rooms/:id/close<br/>{closure_reason_id}
        API->>Room: close_room(room_id, status, closure_reason, send_survey)
    else Cierre Automático (Inactividad)
        Note over Trigger: Cron detecta 7 min inactividad
        Trigger->>Room: close_room(room_id, "CLOSED_BY_INACTIVITY", null, true)
    else Cierre por Horario
        Note over Trigger: Cron detecta fuera de horario
        Trigger->>Room: close_room(room_id, "CLOSED_BY_SCHEDULE", null, false)
    end
    
    Room->>DB: BEGIN TRANSACTION
    
    Room->>DB: UPDATE rooms SET<br/>status = $1,<br/>closed_reason_id = $2,<br/>updated_at = NOW()
    
    Room->>DB: UPDATE agent_rooms SET<br/>status = false<br/>WHERE room_id = $1
    
    Room->>DB: SELECT COUNT(*) active_rooms<br/>FROM agent_rooms<br/>WHERE agent_id AND status = true
    
    Room->>DB: UPDATE agents SET<br/>active_rooms = $1
    
    Room->>DB: UPDATE rooms SET<br/>survey = 'IN PROGRESS'<br/>WHERE send_survey = true
    
    Room->>DB: INSERT room_logs<br/>(category: 'CLOSE', description)
    
    Room->>DB: UPDATE metrics SET<br/>end_date_room = NOW()
    
    Room->>DB: COMMIT
    
    Room->>Socket: emit("ON_CLOSE_ROOM")<br/>to room and admin
    
    alt Enviar Encuesta (send_survey = true)
        Room->>Survey: Iniciar encuesta
        Survey->>DB: INSERT general_surveys<br/>(room_id, user_id, agent_id, step: 1)
        Survey->>Axede: Enviar Pregunta 1 (NPS)
        Axede-->>Usuario: "¿Recomendarías este canal? (0-10)"
        
        Note over Usuario: Usuario responde...
        
        Usuario->>Axede: "8"
        Axede->>API: POST /whatsapp/external
        API->>Survey: Validar respuesta (0-10)
        
        alt Respuesta válida
            Survey->>DB: UPDATE general_surveys<br/>SET answer_1 = 8, step = 2
            
            alt Score < 2 (Calificación negativa)
                Survey->>Survey: sendEmail("Encuesta negativa")
                Note over Survey: Email a supervisores
            end
            
            Survey->>Axede: Enviar Pregunta 2<br/>"¿Fue resuelta? (sí/no)"
            Axede-->>Usuario: Pregunta 2
            
            Note over Usuario: Continúa encuesta...
            
            loop Para cada pregunta (2, 3, 4)
                Usuario->>Axede: Respuesta
                Axede->>API: POST /whatsapp/external
                API->>Survey: Validar y guardar
                Survey->>DB: UPDATE general_surveys
                Survey->>Axede: Siguiente pregunta o despedida
                Axede-->>Usuario: Siguiente mensaje
            end
            
            Note over Survey: Pregunta 4 completada
            
            Survey->>DB: UPDATE rooms SET<br/>survey = 'COMPLETED'
            Survey->>Axede: "¡Muchas gracias,<br/>te esperamos pronto! 😁"
            Axede-->>Usuario: Mensaje de despedida
            
        else Respuesta inválida
            Survey->>Axede: "Ingrese un número<br/>válido entre 0 y 10"
            Axede-->>Usuario: Mensaje de error
            Note over Usuario: Debe responder nuevamente
        end
        
    else No enviar encuesta (afterHours)
        Note over Room: Cierre por horario<br/>No encuesta
    end
    
    Room-->>API: {success: true, room_id}
    API-->>Trigger: 200 OK
```

---

## 📋 Descripción Detallada

### Tipos de Cierre

#### 1. Cierre Manual (Agente)

- **Trigger**: Agente presiona "Cerrar conversación"

- **Motivo**: Obligatorio (closureReasonsRequired = agent_only)

- **Encuesta**: Sí (send_survey = true)

- **Estado**: 'CLOSED'

#### 2. Cierre Automático por Inactividad

- **Trigger**: Cron job detecta 7 minutos sin actividad

- **Tiempo**: autoCloseRoomTime = 7 minutos

- **Encuesta**: Sí

- **Estado**: 'CLOSED_BY_INACTIVITY'

#### 3. Cierre por Horario

- **Trigger**: Cron job fuera de L-D 07:00-22:00

- **Comportamiento**: afterHoursBehavior = close

- **Encuesta**: No

- **Estado**: 'CLOSED_BY_SCHEDULE'

---

### Proceso de Cierre (Paso a Paso)

**Paso 1**: Actualizar estado de sala
```sql
UPDATE rooms SET 
  status = 'CLOSED',
  closed_reason_id = 5,
  updated_at = NOW()
WHERE id = 123
```

**Paso 2**: Desasignar agente
```sql
UPDATE agent_rooms SET status = false
WHERE room_id = 123
```

**Paso 3**: Actualizar contador del agente
```sql
-- Contar salas activas
SELECT COUNT(*) FROM agent_rooms 
WHERE agent_id = 10 AND status = true

-- Actualizar contador
UPDATE agents SET active_rooms = 4
WHERE id = 10
```

**Paso 4**: Iniciar encuesta (si aplica)
```sql
UPDATE rooms SET survey = 'IN PROGRESS'
WHERE id = 123 AND send_survey = true
```

**Paso 5**: Registrar en logs y métricas
```sql
INSERT INTO room_logs (room_id, category, description)
VALUES (123, 'CLOSE', 'Closed by agent with reason_id 5')

UPDATE metrics SET end_date_room = NOW()
WHERE room_id = 123
```

---

### Flujo de Encuesta (4 Preguntas)

#### Pregunta 1: NPS (0-10)
```
"¿Recomendarías este canal a un compañero 
para sus consultas o solicitudes?

Califica de 0 a 10, siendo:
0 = definitivamente no lo recomendaría
10 = lo recomendaría totalmente"
```
**Validación**: Número entero entre 0 y 10

**Acción especial**: Si respuesta < 2 → Email de alerta

---

#### Pregunta 2: Resolución (Sí/No)
```
"¿Fue resuelta su consulta o solicitud?

Responda sí o no"
```
**Validación**: Texto = "sí", "si" o "no" (case insensitive)

---

#### Pregunta 3: Satisfacción (1-5)
```
"¿Qué tan satisfecho estás con la atención 
del servicio por el canal digital?

Califica:
5 = totalmente satisfecho
4 = satisfecho
3 = parcialmente satisfecho
2 = insatisfecho
1 = muy insatisfecho"
```
**Validación**: Número entero entre 1 y 5

---

#### Pregunta 4: Comentarios (Texto Libre)
```
"📝 Escribe tu respuesta en un solo mensaje, 
sin usar Enviar.

Es importante para nosotros conocer más de 
tu experiencia, por favor, deja tus 
observaciones acerca del servicio.

📌 Usa enviar hasta el final; responde todo 
en un solo mensaje"
```
**Validación**: Texto libre, máximo 250 caracteres

---

## 📊 Reglas de Negocio

- **RN-063**: Cierre manual requiere motivo (closure_reason_id)

- **RN-064**: Cierre automático a los 7 minutos de inactividad

- **RN-065**: Cierre por horario NO genera encuesta

- **RN-066**: Encuestas con score < 2 generan alerta por email

- **RN-067**: Agente debe esperar a que usuario complete encuesta para ver resultado

- **RN-068**: Usuario puede responder encuesta en su tiempo (no expira)

- **RN-069**: Contador active_rooms se decrementa automáticamente

---

## 🚨 Casos de Error

### Error 1: Usuario No Responde Encuesta
**Situación**: Usuario cierra WhatsApp sin completar encuesta

**Manejo**:

- Sala queda con survey = 'IN PROGRESS'

- Cuando usuario regrese y envíe mensaje:
  - Sistema detecta encuesta pendiente
  - Continúa desde pregunta actual
  - Usuario puede completar en cualquier momento

**No hay timeout** para encuestas.

---

### Error 2: Respuesta Inválida en Encuesta
**Situación**: Usuario responde "regular" en pregunta Sí/No

**Manejo**:

1. Sistema valida respuesta según tipo de pregunta

2. Detecta que "regular" no está en ["sí", "si", "no"]

3. Envía mensaje de error específico

4. NO avanza pregunta

5. Usuario debe responder nuevamente

**Mensajes de Error**:

- Pregunta 1: "Ingrese un número válido entre 0 y 10"

- Pregunta 2: "Por favor, ingresa solo sí o no"

- Pregunta 3: "Ingrese un número válido entre 1 y 5"

- Pregunta 4: "Comentario muy largo (máx 250 caracteres)"

---

## ⏱️ Métricas

### Tiempos de Ejecución

| Operación | Tiempo Promedio |
|-----------|----------------|
| Cierre de sala | ~200ms |
| Inicio de encuesta | ~150ms |
| Validación de respuesta | ~50ms |
| Encuesta completa (4 preguntas) | Variable (depende de usuario) |

### KPIs de Encuesta

- **Tasa de Respuesta**: % de usuarios que completan encuesta

- **NPS Promedio**: Promedio de pregunta 1

- **Tasa de Resolución**: % de "sí" en pregunta 2

- **Satisfacción Promedio**: Promedio de pregunta 3

- **Alertas Generadas**: Count de scores < 2

---

**Última Actualización**: 18 de diciembre de 2025

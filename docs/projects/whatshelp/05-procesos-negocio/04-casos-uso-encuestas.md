# 📋 Casos de Uso - Encuestas de Satisfacción

## 🎯 Objetivo

Documentar el proceso de encuestas de satisfacción post-atención.

---

## 📊 Casos de Uso en Este Módulo

| ID | Caso de Uso | Actor | Criticidad | Estado |
|----|-------------|-------|------------|--------|
| CU-012 | Iniciar Encuesta de Satisfacción | Sistema | Media | ✅ Implementado |
| CU-013 | Procesar Respuesta de Encuesta | Sistema | Media | ✅ Implementado |

---

## CU-012: Iniciar Encuesta de Satisfacción

### Descripción
El sistema inicia automáticamente una encuesta de satisfacción cuando se cierra una conversación.

### Actores

- **Primario**: Sistema

- **Secundarios**: Usuario

### Precondiciones

- Conversación cerrada

- Usuario respondió durante la conversación

### Trigger

- **Evento**: Cierre de conversación (surveyTrigger = close)

- **Origen**: Agente cierra sala o cierre automático

---

#### Flujo Principal

1. Sistema detecta cierre de conversación

2. Sistema actualiza estado de sala:
   - status = 'CLOSED' o 'CLOSED_BY_SCHEDULE'
   - survey = 'IN PROGRESS'

3. Sistema prepara primera pregunta de encuesta:
   - Pregunta 1: NPS - "¿Recomendarías este canal?" (0-10)

4. Sistema envía pregunta a usuario vía WhatsApp

5. Sistema registra inicio de encuesta en general_surveys

6. Usuario recibe pregunta en WhatsApp

7. **Postcondición**: Encuesta iniciada, esperando respuesta

---

#### Reglas de Negocio

- **RN-045**: Encuesta se activa al cerrar conversación (surveyTrigger = close)

- **RN-046**: Encuesta consta de 4 preguntas obligatorias

- **RN-047**: Conversación permanece cerrada durante encuesta

- **RN-048**: Usuario puede responder en su tiempo (no expira)

---

#### Información Técnica

**Archivo**: `app/logic/GeneralSurvey.js`

**Estado**: ✅ Implementado

---

## CU-013: Procesar Respuesta de Encuesta

### Descripción
El sistema valida y procesa cada respuesta de la encuesta, avanzando a la siguiente pregunta.

### Actores

- **Primario**: Sistema

- **Secundarios**: Usuario

### Precondiciones

- Encuesta en progreso (survey = 'IN PROGRESS')

- Usuario envió respuesta

### Trigger

- **Evento**: Usuario envía mensaje mientras survey = 'IN PROGRESS'

- **Origen**: POST /whatsapp/external

---

#### Flujo Principal

1. Sistema recibe mensaje del usuario

2. Sistema detecta que sala tiene survey = 'IN PROGRESS'

3. Sistema obtiene pregunta actual y validación requerida

4. Sistema valida respuesta según tipo:
   - **Pregunta 1** (NPS 0-10): Número entre 0 y 10
   - **Pregunta 2** (Sí/No): Texto "sí", "si" o "no"
   - **Pregunta 3** (Satisfacción): Número entre 1 y 5
   - **Pregunta 4** (Comentario): Texto libre máx 250 caracteres

5. Si respuesta es válida:
   - Sistema guarda respuesta en general_surveys
   - Sistema avanza a siguiente pregunta
   - Sistema envía siguiente pregunta a usuario

6. Si es última pregunta:
   - Sistema actualiza survey = 'COMPLETED'
   - Sistema envía mensaje de despedida

7. **Postcondición**: Respuesta guardada, encuesta avanzada o completada

---

#### Flujos Alternativos

**FA-1: Respuesta Inválida**

4a. Si respuesta no cumple validación:
   - Sistema envía mensaje de error específico
   - Sistema NO avanza pregunta
   - Usuario debe responder nuevamente
   - Retorna a paso 1

---

#### Flujos de Excepción

**FE-1: Calificación Negativa (score < 2)**

5a. Si respuesta de Pregunta 1 es menor a 2:
   - Sistema guarda respuesta normalmente
   - Sistema envía email de alerta (surveyNegativeAction = nolose)
   - Email a: Equipo de calidad/supervisores
   - Asunto: "MAX. Encuesta negativa"
   - Continúa con siguiente pregunta

---

#### Reglas de Negocio

- **RN-049**: Preguntas de la encuesta:
  1. NPS: ¿Recomendarías? (0-10)
  2. Resolución: ¿Fue resuelta? (sí/no)
  3. Satisfacción: ¿Qué tan satisfecho? (1-5)
  4. Comentarios: Observaciones (texto libre)
  

- **RN-050**: Validaciones estrictas por tipo de pregunta

- **RN-051**: Encuestas negativas generan alerta por email

- **RN-052**: No se puede saltar preguntas (secuencial)

- **RN-053**: Comentarios limitados a 250 caracteres

---

#### Postcondiciones

**Éxito**:

- Respuesta guardada

- Encuesta completada o avanzada

- Email enviado si calificación negativa

**Fallo**:

- Usuario recibe mensaje de error

- Debe responder nuevamente

---

#### Información Técnica

**Archivos**: 

- `app/controllers/whatsappController.js` (validación)

- `app/logic/GeneralSurvey.js` (getSurveyStep)

**Estado**: ✅ Implementado

---

### Estructura de Encuesta

```yaml
Pregunta 1 - NPS:
  tipo: number
  rango: 0-10
  validación: número válido
  error: "Ingrese un número válido entre 0 y 10"

Pregunta 2 - Resolución:
  tipo: string
  opciones: ["sí", "si", "no"]
  validación: texto coincide con opciones
  error: "Por favor, ingresa solo sí o no"

Pregunta 3 - Satisfacción:
  tipo: number
  rango: 1-5
  validación: número válido
  error: "Ingrese un número válido entre 1 y 5"

Pregunta 4 - Comentarios:
  tipo: free text
  max_length: 250
  validación: longitud
  error: "Comentario muy largo (máx 250 caracteres)"
```

---

**Última Actualización**: 18 de diciembre de 2025

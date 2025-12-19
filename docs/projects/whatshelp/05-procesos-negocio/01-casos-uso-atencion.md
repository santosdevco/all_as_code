# 📋 Casos de Uso - Atención al Usuario

## 🎯 Objetivo

Documentar los casos de uso relacionados con la atención de usuarios a través de WhatsApp.

---

## 📊 Casos de Uso en Este Módulo

| ID | Caso de Uso | Actor | Criticidad | Estado |
|----|-------------|-------|------------|--------|
| CU-001 | Recibir Mensaje WhatsApp | Usuario | Alta | ✅ Implementado |
| CU-002 | Crear Nueva Conversación | Sistema | Media | ✅ Implementado |
| CU-007 | Enviar Mensaje Agente a Usuario | Agente | Alta | ✅ Implementado |
| CU-008 | Subir Archivo Adjunto | Usuario/Agente | Media | ✅ Implementado |

---

## CU-001: Recibir Mensaje WhatsApp

### Descripción
Un usuario envía un mensaje a través de WhatsApp y el sistema lo recibe, procesa y determina si debe atenderlo Watson (bot) o un agente humano.

### Actores

- **Primario**: Usuario (funcionario del banco)

- **Secundarios**: Watson Assistant, Sistema de WhatsApp (Axede), Sistema de Cola

### Precondiciones

- Usuario tiene acceso a WhatsApp

- Canal WhatsApp configurado y activo

- Horario de atención vigente (L-D 07:00-22:00)

### Trigger

- **Evento**: `POST /whatsapp/external`

- **Origen**: API de Axede (proveedor WhatsApp)

---

#### Flujo Principal (Happy Path)

1. Usuario envía mensaje por WhatsApp

2. Sistema recibe webhook de Axede con datos del mensaje (WaId, Body, ProfileName, Token, ChannelId)

3. Sistema autentica o crea usuario basado en número de teléfono (WaId)

4. Sistema verifica si el usuario tiene una conversación activa:
   - Consulta salas con estado OPEN
   - Consulta salas con encuesta IN PROGRESS

5. Si no tiene conversación activa, sistema crea nueva sala

6. Si es conversación nueva, sistema crea sesión de Watson en paralelo

7. Sistema guarda información del canal externo (Token, ChannelId)

8. Sistema determina el flujo de atención:
   - Si sala está con agente asignado → envía mensaje al agente vía Socket
   - Si sala está con Watson → procesa mensaje con Watson Assistant

9. Sistema guarda el mensaje en base de datos

10. **Postcondición**: Mensaje procesado y usuario en flujo de atención

---

#### Flujos Alternativos

**FA-1: Usuario con Conversación Activa**

4a. Si usuario ya tiene conversación OPEN:
   - Sistema reutiliza sala existente
   - No crea nueva sesión de Watson
   - Continúa con paso 8

**FA-2: Usuario en Encuesta**

4b. Si usuario tiene sala con survey = 'IN PROGRESS':
   - Sistema valida respuesta de encuesta (ver CU-012)
   - No procesa con Watson
   - Guarda respuesta y avanza a siguiente pregunta
   - Retorna confirmación

**FA-3: Mensaje con Archivo Adjunto**

2a. Si mensaje incluye MediaContentType0:
   - Sistema identifica tipo (image/video/audio/file)
   - Guarda URL del archivo (MediaUrl0)
   - Agrega variable TypeFile al contexto
   - Continúa con flujo normal

---

#### Flujos de Excepción

**FE-1: Fuera de Horario de Atención**

Xa. Si mensaje llega fuera de horario (antes 07:00 o después 22:00):
   - Sistema crea conversación
   - Cron job detecta conversación fuera de horario
   - Sistema cierra conversación automáticamente (CLOSED_BY_SCHEDULE)
   - No se asigna a cola ni agente

**FE-2: Error de Watson**

8a. Si Watson Assistant no responde:
   - Sistema registra error
   - Sistema envía mensaje genérico al usuario
   - Sistema puede encolar para atención humana (según configuración)

**FE-3: Error de Axede (WhatsApp)**

Xa. Si API de Axede falla al enviar respuesta:
   - Sistema registra error en logs
   - Marca mensaje como FAILED
   - Guarda en pending_messages para reintento

---

#### Reglas de Negocio

- **RN-001**: Un usuario solo puede tener una conversación activa a la vez

- **RN-002**: Conversaciones fuera de horario (L-D 07:00-22:00) se cierran automáticamente

- **RN-003**: Si conversación está en encuesta, solo se aceptan respuestas de encuesta

- **RN-004**: Los mensajes se almacenan incluso si hay error en el envío de respuesta

- **RN-005**: La sesión de Watson se crea solo una vez por conversación

---

#### Postcondiciones

**Éxito**:

- Mensaje guardado en base de datos

- Usuario tiene sala activa

- Usuario en flujo de Watson o con agente asignado

- Respuesta enviada al usuario vía WhatsApp

**Fallo**:

- Error registrado en logs

- Mensaje puede quedar en estado FAILED

- Usuario puede quedar sin respuesta (requiere reintento manual)

---

#### Información Técnica

**Endpoint**: `POST /whatsapp/external`

**Archivos**: 

- `app/controllers/whatsappController.js` (messageApi)

- `app/logic/Room.js` (create_room, get_room_id)

- `app/logic/Auth.js` (loginUserWhatsapp)

**Estado**: ✅ Implementado

**Optimizaciones Aplicadas**:

- Creación paralela de sesión Watson + ExternalRoom

- Caché de salas activas (5 minutos)

- Batch insert con CTEs para reducir queries

---

## CU-002: Crear Nueva Conversación

### Descripción
El sistema crea una nueva conversación (sala) cuando un usuario envía su primer mensaje o después de cerrar una conversación anterior.

### Actores

- **Primario**: Sistema

- **Secundarios**: Usuario, Watson Assistant

### Precondiciones

- Usuario autenticado

- No existe conversación activa para el usuario

- Área por defecto configurada (área WhatsApp)

### Trigger

- **Evento**: Detección de usuario sin sala activa

- **Origen**: Interno del sistema

---

#### Flujo Principal (Happy Path)

1. Sistema detecta que usuario no tiene sala activa

2. Sistema inicia transacción de base de datos

3. Sistema crea nuevo registro en tabla `rooms`:
   - survey: 'PENDING'
   - queue: 'PENDING'
   - area_id: Área WhatsApp (configurada)
   - user_id: ID del usuario
   - user_online: true

4. Sistema crea log inicial de sala (categoria: INIT)

5. Sistema asigna Watson Assistant a la sala (agent_rooms)

6. Sistema crea log de transferencia a Watson (categoria: WATSON_ASSISTANT)

7. Sistema crea registro de métricas (start_date_room)

8. Sistema confirma transacción

9. Sistema invalida caché de sala activa del usuario

10. Sistema emite evento Socket.IO a administradores (ON_NEW_ROOM_ASSISTANT)

11. **Postcondición**: Sala creada y lista para recibir mensajes

---

#### Flujos Alternativos

**FA-1: Usuario con Sala en Encuesta**

1a. Si usuario tiene sala con survey = 'IN PROGRESS':
   - Sistema NO crea nueva sala
   - Reutiliza sala existente
   - Continúa flujo de encuesta

---

#### Flujos de Excepción

**FE-1: Error en Creación**

Xa. Si falla cualquier paso:
   - Sistema ejecuta ROLLBACK de transacción
   - No se crea sala
   - Error se propaga al caller
   - Usuario recibirá error en próximo intento

---

#### Reglas de Negocio

- **RN-006**: Todas las salas nuevas inician con Watson Assistant

- **RN-007**: Estado inicial de encuesta siempre es 'PENDING'

- **RN-008**: Estado inicial de cola siempre es 'PENDING'

- **RN-009**: Se usa transacción para garantizar consistencia

- **RN-010**: Optimización: Se usa un solo query con CTEs (6 queries → 1)

---

#### Postcondiciones

**Éxito**:

- Sala creada en base de datos

- Watson Assistant asignado

- Logs de sala registrados

- Métricas inicializadas

- Caché invalidado

- Evento emitido a administradores

**Fallo**:

- Rollback completo

- No se crea ningún registro

- Caché no afectado

---

#### Información Técnica

**Método**: `Room.create_room(user_id, area_id, assistant_id, io)`

**Archivo**: `app/logic/Room.js`

**Estado**: ✅ Implementado y Optimizado

**Performance**:

- Tiempo promedio: ~50-100ms

- Optimización con CTEs reduce latencia en 60%

---

## CU-007: Enviar Mensaje Agente a Usuario

### Descripción
Un agente envía un mensaje (texto o archivo) a un usuario a través de WhatsApp durante una conversación activa.

### Actores

- **Primario**: Agente

- **Secundarios**: Sistema de WhatsApp (Axede), Usuario

### Precondiciones

- Agente autenticado

- Agente tiene sala asignada

- Conversación en estado OPEN

- Usuario online

### Trigger

- **Evento**: `POST /messages` o `POST /messages/file`

- **Origen**: Agente desde aplicación web

---

#### Flujo Principal (Happy Path)

1. Agente escribe mensaje en interfaz

2. Agente envía mensaje al sistema

3. Sistema valida autenticación del agente (JWT)

4. Sistema valida que agente tiene permiso sobre la sala (onlyRoomMessage)

5. Sistema valida datos del mensaje (roomId, body, type, phone_number)

6. Si es archivo, sistema procesa:
   - Extrae buffer del archivo
   - Determina tipo (image/video/audio/document)
   - Sube archivo a Cloud Object Storage (COS)
   - Genera URL pública

7. Sistema guarda mensaje en base de datos con estado 'SAVED'

8. Sistema prepara mensaje para API de Axede:
   - Formato: messages, waId, token, channelId

9. Sistema envía mensaje vía Axede:
   - Si es texto: sendMessageTxt()
   - Si es archivo: sendMessageFile() (base64)

10. Sistema emite evento Socket.IO a la sala (ON_MESSAGE)

11. Usuario recibe mensaje en WhatsApp

12. **Postcondición**: Mensaje enviado y guardado

---

#### Flujos Alternativos

**FA-1: Mensaje de Transferencia**

5a. Si fromModel = 'transfer':
   - Sistema NO envía a WhatsApp
   - Solo guarda mensaje informativo en BD
   - Emite evento Socket.IO
   - Termina

**FA-2: Archivo de Audio**

6a. Si archivo es audio (audio/ogg):
   - Sistema guarda en COS
   - Sistema genera tag HTML `<audio controls>`
   - Envía URL del audio
   - Continúa flujo

---

#### Flujos de Excepción

**FE-1: Error de Axede**

9a. Si API de Axede falla:
   - Sistema registra error en logs
   - Mensaje queda guardado en BD
   - Sistema registra en pending_messages
   - Usuario NO recibe mensaje
   - Agente ve mensaje enviado (pero falló)

**FE-2: Error de COS (Cloud Object Storage)**

6a. Si falla subida de archivo:
   - Sistema lanza excepción
   - No se guarda mensaje
   - Agente recibe error
   - Debe reintentar

**FE-3: Sala No Autorizada**

4a. Si agente no tiene permiso sobre sala:
   - Sistema retorna 401 Unauthorized
   - No se procesa mensaje
   - Agente recibe error de permisos

---

#### Reglas de Negocio

- **RN-011**: Agente solo puede enviar mensajes a salas asignadas

- **RN-012**: Archivos se almacenan en COS (no en BD)

- **RN-013**: Mensajes de transferencia no se envían a WhatsApp

- **RN-014**: Audio se envía como HTML con tag `<audio>`

- **RN-015**: Nombre de archivo en COS: `{roomId}_{timestamp}_{extension}`

- **RN-016**: No hay límite de tamaño configurado para archivos

---

#### Postcondiciones

**Éxito**:

- Mensaje guardado en BD

- Archivo en COS (si aplica)

- Mensaje enviado a WhatsApp

- Socket.IO emitido

- Usuario recibe mensaje

**Fallo**:

- Mensaje puede quedar en BD sin enviar

- Error registrado en logs

- Agente notificado del error

---

#### Información Técnica

**Endpoints**: 

- `POST /messages` (texto)

- `POST /messages/file` (archivos)

**Archivos**: 

- `app/controllers/messageController.js` (save)

- `app/services/storage.js` (uploadObject)

- `app/services/axedeapi.js` (sendMessageTxt, sendMessageFile)

**Estado**: ✅ Implementado

**Limitaciones**:

- No hay límite de tamaño para archivos

- No hay validación de tipo de archivo (se acepta cualquiera)

---

## CU-008: Subir Archivo Adjunto

### Descripción
Usuario o agente envía un archivo adjunto (imagen, video, audio, documento) durante una conversación.

### Actores

- **Primario**: Usuario o Agente

- **Secundarios**: Cloud Object Storage (COS), Sistema de WhatsApp

### Precondiciones

- Conversación activa

- Archivo válido disponible

### Trigger

- **Usuario**: Envía archivo por WhatsApp

- **Agente**: Usa endpoint `POST /messages/file`

---

#### Flujo Principal (Happy Path)

1. Actor selecciona archivo para enviar

2. Sistema recibe archivo:
   - **Usuario**: Vía webhook de Axede (MediaUrl0, MediaContentType0)
   - **Agente**: Vía multipart/form-data (multer)

3. Sistema determina tipo de archivo:
   - image/* → tipo: "image"
   - video/* → tipo: "video"
   - audio/* → tipo: "html" (con tag audio)
   - otros → tipo: "file"

4. Sistema procesa según origen:
   - **Usuario**: Guarda URL de Axede directamente
   - **Agente**: Sube archivo a COS

5. Si es de agente, sistema genera nombre único:
   - Formato: `{roomId}_{timestamp}_{extension}`

6. Sistema sube archivo a IBM Cloud Object Storage

7. Sistema obtiene URL pública del archivo

8. Si es audio, sistema crea HTML: `<audio controls><source src="{url}"></audio>`

9. Sistema guarda mensaje con URL en base de datos

10. Sistema envía archivo al destinatario:
    - **A Usuario**: vía Axede (sendMessageFile con base64)
    - **A Agente**: vía Socket.IO

11. **Postcondición**: Archivo disponible y mensaje enviado

---

#### Flujos Alternativos

**FA-1: Audio de Usuario**

3a. Si usuario envía audio:
   - Sistema guarda URL de Axede
   - Genera tag HTML `<audio>`
   - Agente ve reproductor en interfaz

**FA-2: Imagen de Agente**

3b. Si agente envía imagen:
   - Sistema sube a COS
   - Envía a Axede como base64
   - Usuario ve imagen en WhatsApp

---

#### Flujos de Excepción

**FE-1: Error de COS**

6a. Si falla subida a COS:
   - Sistema lanza excepción
   - No se guarda mensaje
   - Error retornado al agente
   - Requiere reintento manual

**FE-2: Error de Axede al Enviar Archivo**

10a. Si falla envío a Axede:
   - Archivo YA está en COS
   - Mensaje guardado en BD
   - Usuario no recibe archivo
   - Se registra en pending_messages

**FE-3: Archivo Muy Grande**

Xa. Si archivo excede límites del sistema:
   - **Actual**: No hay validación (potencial problema)
   - **Recomendado**: Rechazar con error 413

---

#### Reglas de Negocio

- **RN-017**: Archivos de agente se almacenan en COS

- **RN-018**: Archivos de usuario quedan en Axede (solo URL)

- **RN-019**: Audio se convierte a HTML para visualización

- **RN-020**: Formato de nombre: único por sala y timestamp

- **RN-021**: **FALTANTE**: No hay validación de tamaño máximo

- **RN-022**: **FALTANTE**: No hay validación de tipos permitidos

---

#### Postcondiciones

**Éxito**:

- Archivo almacenado (COS o Axede)

- URL guardada en mensaje

- Destinatario recibe archivo

- Tipo de archivo correctamente identificado

**Fallo**:

- Error de almacenamiento

- Archivo no enviado

- Mensaje puede quedar sin archivo

---

#### Información Técnica

**Endpoints**: 

- `POST /messages/file` (agente)

- `POST /whatsapp/external` (usuario con MediaContentType0)

**Archivos**: 

- `app/controllers/messageController.js`

- `app/controllers/whatsappController.js`

- `app/services/storage.js`

**Estado**: ✅ Implementado

**Puntos de Mejora**:

- ⚠️ Agregar validación de tamaño

- ⚠️ Agregar validación de tipos permitidos

- ⚠️ Configurar límite máximo

---

**Última Actualización**: 18 de diciembre de 2025

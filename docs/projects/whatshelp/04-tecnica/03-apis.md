# 📡 Documentación de APIs

## 🎯 Objetivo

Documentar todos los endpoints REST de la API WhatHelp Chat.

---

## 📊 Resumen de Endpoints

**Total endpoints**: 92

### Distribución por Categoría

| Categoría | Cantidad | Descripción |
|-----------|----------|-------------|
| Autenticación | 7 | Login, logout, registro |
| Mensajes | 5 | Envío y consulta de mensajes |
| Encuestas | 3 | Encuestas de satisfacción |
| Alertas | 5 | Alertas y notificaciones |
| Métricas | 6 | Reportes y estadísticas |
| Áreas | 5 | Gestión de áreas de atención |
| Watson Assistant | 4 | Integración con bot |
| Mensajes de Protocolo | 4 | Respuestas rápidas |
| Razones de Cierre | 4 | Motivos de cierre |
| Agentes | 14 | Gestión de agentes |
| Usuarios | 7 | Gestión de usuarios |
| Salas | 8 | Gestión de conversaciones |
| Cola | 1 | Estado de cola |
| Notificaciones | 3 | Suscripciones email |
| Alertas Masivas | 4 | Banners del sistema |
| Sistema | 4 | Health checks, info |
| Integraciones | 3 | WhatsApp, Teams |
| Externos | 5 | Webhooks y logs |

### Por Método HTTP

| Método | Cantidad |
|--------|----------|
| GET | 45 |
| POST | 28 |
| PUT | 14 |
| DELETE | 5 |

### Por Tipo de Autenticación

| Tipo | Cantidad |
|------|----------|
| 🔓 Público | 18 |
| 🔒 JWT Requerido | 64 |
| 👮 Solo Agentes | 10 |

---

## 🔗 Endpoints Detallados

### 🔓 Endpoints Públicos

#### GET `/api/`

**Descripción**: Información básica del API

**Autenticación**: ❌ No requerida

**Response** (200):
```json
{
  "teamDevelopment": "Transformation and Innovation Team",
  "aplicationName": "API_CHAT",
  "licence": "© 2025 All rights reserved",
  "version": "2.1.2"
}
```

---

#### GET `/api/health`

**Descripción**: Health check con información de la instancia

**Autenticación**: ❌ No requerida

**Response** (200):
```json
{
  "status": "healthy",
  "timestamp": "2025-12-18T20:00:00.000Z",
  "instance": {
    "id": "hostname-12345-abc123",
    "name": "api-chat-instance-1",
    "pid": 12345,
    "uptime": 86400,
    "memory": {
      "rss": 123456789,
      "heapTotal": 98765432,
      "heapUsed": 87654321,
      "external": 1234567
    },
    "version": "2.1.2"
  }
}
```

**Headers de Respuesta**:

- `X-Instance-ID`: ID único de la instancia

- `X-Instance-Name`: Nombre de la instancia

---

#### GET `/api/cache/stats`

**Descripción**: Estadísticas del caché Redis

**Autenticación**: ❌ No requerida

**Response** (200):
```json
{
  "cache": {
    "hits": 1234,
    "misses": 567,
    "errors": 12,
    "hitRate": 0.685
  },
  "timestamp": "2025-12-18T20:00:00.000Z"
}
```

---

#### GET `/api/instance`

**Descripción**: Información detallada de la instancia del servidor

**Autenticación**: ❌ No requerida

**Response** (200):
```json
{
  "instance": {
    "id": "hostname-12345-abc123",
    "name": "api-chat-instance-1",
    "pid": 12345,
    "hostname": "api-server-01",
    "platform": "linux",
    "arch": "x64",
    "nodeVersion": "v20.0.0",
    "uptime": 86400,
    "memory": {...},
    "cpus": 4
  },
  "timestamp": "2025-12-18T20:00:00.000Z"
}
```

---

#### GET `/api/public/banner`

**Descripción**: Obtener banners/alertas masivas activas

**Autenticación**: ❌ No requerida

**Controller**: `massAlertController.getBanner`

**Response** (200):
```json
{
  "banners": [
    {
      "id": 1,
      "message": "Mantenimiento programado el 20/12",
      "created_at": "2025-12-18T10:00:00.000Z"
    }
  ]
}
```

---

#### POST `/api/whatsapp/external`

**Descripción**: Webhook para recibir mensajes desde WhatsApp

**Autenticación**: ❌ No requerida (validación por token de canal)

**Controller**: `whatsappController.messageApi`

**Body**:
```json
{
  "from": "+573001234567",
  "body": "Hola, necesito ayuda",
  "type": "text",
  "channelId": "whatsapp-channel-id"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Mensaje recibido"
}
```

---

#### POST `/api/watson/assistant/teams/messages`

**Descripción**: Webhook para recibir mensajes desde Microsoft Teams

**Autenticación**: ❌ No requerida (validación por Microsoft)

**Controller**: `teamsController.message`

**Body**:
```json
{
  "type": "message",
  "text": "Hola desde Teams",
  "from": {
    "id": "teams-user-id",
    "name": "Usuario Teams"
  },
  "conversation": {
    "id": "teams-conversation-id"
  }
}
```

---

### 🔐 Autenticación

#### POST `/api/auth/login`

**Descripción**: Login de usuarios finales

**Autenticación**: ❌ No requerida

**Validaciones**:

- `username`: Requerido

- `password`: Requerido

- `recaptcha`: Validación con Google reCAPTCHA

**Body**:
```json
{
  "username": "usuario123",
  "password": "contraseña123"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "usuario123",
    "fullname": "Juan Pérez",
    "email": "juan@example.com",
    "status": "ACTIVE"
  }
}
```

**Status Codes**:

- `200`: Login exitoso

- `400`: Validación fallida

- `401`: Credenciales inválidas

- `403`: Usuario inactivo

---

#### POST `/api/auth/agent/login`

**Descripción**: Login de agentes

**Autenticación**: ❌ No requerida

**Validaciones**:

- `username`: Requerido

- `password`: Requerido

**Body**:
```json
{
  "username": "agente01",
  "password": "contraseña123"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "agent": {
    "id": 1,
    "username": "agente01",
    "fullname": "María García",
    "email": "maria@example.com",
    "online": true,
    "rooms": 5,
    "active_rooms": 2,
    "admin": false,
    "areas": [
      {"id": 1, "name": "Soporte Técnico"}
    ]
  }
}
```

---

#### DELETE `/api/auth/agent/logout/:agent`

**Descripción**: Logout de agente

**Autenticación**: ❌ No requerida

**Path Parameters**:

- `agent`: ID del agente

**Response** (200):
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

---

#### POST `/api/auth/admin/login`

**Descripción**: Login de administradores

**Autenticación**: ❌ No requerida

**Validaciones**:

- `username`: Requerido

- `password`: Requerido

**Body**: Igual que `/api/auth/agent/login`

**Response**: Similar a agent login, con campo `admin: true`

---

#### GET `/api/auth/profile`

**Descripción**: Obtener perfil del usuario autenticado

**Autenticación**: ✅ JWT Requerido

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response** (200):
```json
{
  "id": 1,
  "username": "usuario123",
  "fullname": "Juan Pérez",
  "email": "juan@example.com",
  "phone_number": "+573001234567",
  "status": "ACTIVE",
  "type": "user"
}
```

**Status Codes**:

- `200`: Éxito

- `401`: Token inválido o expirado

---

#### GET `/api/auth/areas`

**Descripción**: Listar áreas de atención activas (para selector en login)

**Autenticación**: ❌ No requerida

**Controller**: `areaController.getActive`

**Response** (200):
```json
{
  "areas": [
    {
      "id": 1,
      "name": "Soporte Técnico",
      "bot": true,
      "assistant_id": "watson-assistant-id-1"
    },
    {
      "id": 2,
      "name": "SAP",
      "bot": true,
      "assistant_id": "watson-assistant-id-2"
    }
  ]
}
```

---

### 💬 Mensajes

#### POST `/api/messages`

**Descripción**: Enviar mensaje de texto en una sala

**Autenticación**: ✅ JWT Requerido

**Permisos**: Usuario debe pertenecer a la sala

**Validaciones**:

- `roomId`: Requerido

- `fromModel`: Requerido (User, Agent, Bot)

- `type`: Requerido (text, image, file)

- `body`: Requerido

- `read`: Requerido (boolean)

- `phone_number`: Requerido

**Body**:
```json
{
  "roomId": 123,
  "fromModel": "User",
  "type": "text",
  "body": "Hola, necesito ayuda con mi cuenta",
  "read": false,
  "phone_number": "+573001234567"
}
```

**Response** (201):
```json
{
  "message": {
    "id": 456,
    "room_id": 123,
    "from_model": "User",
    "from": 1,
    "type": "text",
    "body": "Hola, necesito ayuda con mi cuenta",
    "status": "sent",
    "read": false,
    "created_at": "2025-12-18T20:00:00.000Z"
  }
}
```

**Status Codes**:

- `201`: Mensaje creado

- `400`: Validación fallida

- `403`: Sin permiso para la sala

- `404`: Sala no encontrada

---

#### POST `/api/messages/file`

**Descripción**: Enviar archivo en una sala

**Autenticación**: ✅ JWT Requerido

**Permisos**: Usuario debe pertenecer a la sala

**Content-Type**: `multipart/form-data`

**Form Data**:

- `file`: Archivo (max 10MB)

- `roomId`: ID de la sala

- `phone_number`: Teléfono del usuario

**Validación de archivos**:

- Tipos permitidos: Detectados con `file-type` v7.7.1

- Tamaño máximo: Configurado en multer

**Response** (201):
```json
{
  "message": {
    "id": 457,
    "room_id": 123,
    "from_model": "User",
    "type": "file",
    "body": "https://storage.ibm.com/bucket/file123.pdf",
    "status": "sent",
    "created_at": "2025-12-18T20:00:00.000Z"
  }
}
```

---

#### GET `/api/rooms/:id/messages`

**Descripción**: Obtener todos los mensajes de una sala

**Autenticación**: ✅ JWT Requerido

**Permisos**: Usuario debe pertenecer a la sala (`onlyRoom`)

**Path Parameters**:

- `id`: ID de la sala

**Query Parameters** (opcional):

- `limit`: Cantidad de mensajes (default: 50)

- `offset`: Paginación

**Response** (200):
```json
{
  "messages": [
    {
      "id": 456,
      "room_id": 123,
      "from_model": "User",
      "from": 1,
      "type": "text",
      "body": "Hola, necesito ayuda",
      "status": "sent",
      "read": true,
      "created_at": "2025-12-18T19:00:00.000Z",
      "intentions": [
        {"key": "greeting", "value": "0.95"}
      ]
    },
    {
      "id": 457,
      "room_id": 123,
      "from_model": "Agent",
      "from": 5,
      "type": "text",
      "body": "Hola, ¿en qué puedo ayudarte?",
      "status": "sent",
      "read": true,
      "created_at": "2025-12-18T19:01:00.000Z"
    }
  ],
  "total": 2
}
```

---

#### GET `/api/room/:roomId/messages/file/download/:path`

**Descripción**: Descargar archivo de un mensaje

**Autenticación**: ✅ JWT Requerido

**Permisos**: Usuario debe pertenecer a la sala (`onlyRoomId`)

**Path Parameters**:

- `roomId`: ID de la sala

- `path`: Path del archivo en storage

**Response** (200):

- Archivo binario con headers:
  - `Content-Type`: MIME type del archivo
  - `Content-Disposition`: attachment; filename="..."

**Status Codes**:

- `200`: Archivo descargado

- `403`: Sin permiso

- `404`: Archivo no encontrado

---

#### GET `/api/FileDonw/:filename/:tokenfile`

**Descripción**: Descarga externa de archivo con token

**Autenticación**: ❌ No requerida (validación por token)

**Path Parameters**:

- `filename`: Nombre del archivo

- `tokenfile`: Token de validación

**Controller**: `messageController.downloadFileExternal`

---

### 📊 Encuestas

#### GET `/api/surveys`

**Descripción**: Listar todas las encuestas de satisfacción

**Autenticación**: ✅ JWT Requerido

**Controller**: `surveyController.getAll`

**Response** (200):
```json
{
  "surveys": [
    {
      "id": 1,
      "room_id": 123,
      "score": "10",
      "message": "Excelente servicio",
      "comment": "Muy rápida la atención",
      "created_at": "2025-12-18T20:00:00.000Z"
    }
  ]
}
```

---

#### POST `/api/surveys`

**Descripción**: Crear encuesta de satisfacción

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `score`: Requerido (1-10)

- `message`: Requerido

**Body**:
```json
{
  "room_id": 123,
  "score": "10",
  "message": "Excelente servicio",
  "comment": "Muy rápida la atención"
}
```

---

#### POST `/api/general/survey`

**Descripción**: Crear encuesta general (múltiples preguntas)

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `room_id`: Requerido

- `user_id`: Requerido

- `agent_id`: Requerido

- `answers`: Array requerido

**Body**:
```json
{
  "room_id": 123,
  "user_id": 1,
  "agent_id": 5,
  "answers": [
    {
      "question_cod": 1,
      "type": "rating",
      "question": "¿Cómo calificas la atención?",
      "answer": "10"
    },
    {
      "question_cod": 2,
      "type": "text",
      "question": "¿Comentarios adicionales?",
      "answer": "Muy buena atención"
    }
  ]
}
```

---

### 🚨 Alertas y Notificaciones

#### GET `/api/home/agents`

**Descripción**: Últimas desconexiones de agentes

**Autenticación**: ✅ JWT Requerido

**Controller**: `alertController.getLastDesconnetionAgents`

---

#### GET `/api/home/messages`

**Descripción**: Últimos mensajes sin responder

**Autenticación**: ✅ JWT Requerido

**Controller**: `alertController.getLastMessageNotAnswered`

---

#### POST `/api/home/alert`

**Descripción**: Enviar alerta a agente específico

**Autenticación**: ✅ JWT Requerido

**Controller**: `alertController.sendAlertToAgent`

---

#### POST `/api/home/agent`

**Descripción**: Notificar desconexión de agente

**Autenticación**: ✅ JWT Requerido

**Controller**: `alertController.sendDisconnectionAgent`

---

#### POST `/api/home/queue`

**Descripción**: Notificar mensaje en cola

**Autenticación**: ✅ JWT Requerido

**Controller**: `alertController.sendMessageToQueue`

---

#### POST `/api/external/log/:agent/:type_log`

**Descripción**: Guardar log externo de agente

**Autenticación**: ❌ No requerida

**Path Parameters**:

- `agent`: ID del agente

- `type_log`: Tipo de log

**Controller**: `alertController.saveLogAgentGeneral`

---

### 📈 Métricas

#### GET `/api/metrics`

**Descripción**: Obtener métricas generales

**Autenticación**: ✅ JWT Requerido

**Controller**: `metricsController.getAll`

**Query Parameters**:

- `start_date`: Fecha inicio (YYYY-MM-DD)

- `end_date`: Fecha fin (YYYY-MM-DD)

- `area_id`: Filtrar por área

- `agent_id`: Filtrar por agente

---

#### GET `/api/metricsTopics`

**Descripción**: Métricas por tópicos/intenciones

**Autenticación**: ✅ JWT Requerido

**Controller**: `metricsController.getAllTopics`

---

#### GET `/api/metricsOptionsReports`

**Descripción**: Opciones disponibles para reportes

**Autenticación**: ✅ JWT Requerido

**Controller**: `metricsController.getAllOptionsReports`

---

#### GET `/api/metricsLoginLogout`

**Descripción**: Métricas de login/logout de agentes

**Autenticación**: ✅ JWT Requerido

**Controller**: `metricsController.getAllLoginLogout`

---

#### GET `/api/metricsGeneralConfiguration`

**Descripción**: Obtener configuración general del sistema

**Autenticación**: ✅ JWT Requerido

**Controller**: `metricsController.getGeneralConfiguration`

---

#### POST `/api/setGeneralConfiguration`

**Descripción**: Establecer configuración general

**Autenticación**: ✅ JWT Requerido

**Controller**: `metricsController.setGeneralConfiguration`

---

### 🏢 Áreas

#### GET `/api/areas`

**Descripción**: Listar todas las áreas

**Autenticación**: ✅ JWT Requerido

**Controller**: `areaController.getAll`

---

#### POST `/api/areas`

**Descripción**: Crear nueva área

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `name`: Requerido, único

- `bot`: Requerido (boolean)

**Body**:
```json
{
  "name": "Ventas",
  "bot": true,
  "assistant_id": "watson-assistant-id"
}
```

---

#### PUT `/api/areas/:id`

**Descripción**: Actualizar área existente

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `name`: Requerido

- `bot`: Requerido

- `status`: Requerido

---

#### PUT `/api/agents/:agent_id/area/:area_id/join`

**Descripción**: Asignar agente a un área

**Autenticación**: ✅ JWT Requerido

**Path Parameters**:

- `agent_id`: ID del agente

- `area_id`: ID del área

**Controller**: `areaController.joinAgent`

---

#### DELETE `/api/agents/:agent_id/area/:area_id/leave`

**Descripción**: Quitar agente de un área

**Autenticación**: ✅ JWT Requerido

**Controller**: `areaController.leaveAgent`

---

### 🤖 Watson Assistant

#### POST `/api/watson/assistant/request-session`

**Descripción**: Solicitar nueva sesión de Watson

**Autenticación**: ✅ JWT Requerido

**Controller**: `assistantController.requestSession`

---

#### POST `/api/watson/assistant/create-session`

**Descripción**: Crear sesión de Watson para una sala

**Autenticación**: ✅ JWT Requerido

**Controller**: `assistantController.createSession`

---

#### POST `/api/watson/assistant/messages`

**Descripción**: Enviar mensaje a Watson Assistant

**Autenticación**: ✅ JWT Requerido

**Permisos**: Solo usuarios (`onlyUser`)

**Validaciones**:

- `body`: Requerido

- `sessionId`: Requerido

**Body**:
```json
{
  "body": "Necesito resetear mi contraseña",
  "sessionId": "watson-session-id-123"
}
```

**Response** (200):
```json
{
  "output": {
    "generic": [
      {
        "response_type": "text",
        "text": "Te ayudaré a resetear tu contraseña..."
      }
    ],
    "intents": [
      {"intent": "password_reset", "confidence": 0.98}
    ],
    "entities": []
  }
}
```

---

#### POST `/api/watson/assistant/messages/file`

**Descripción**: Enviar archivo a Watson Assistant

**Autenticación**: ✅ JWT Requerido

**Permisos**: Solo usuarios (`onlyUser`)

**Content-Type**: `multipart/form-data`

---

### 📋 Mensajes de Protocolo (Respuestas Rápidas)

#### GET `/api/pmessages`

**Descripción**: Listar mensajes de protocolo

**Autenticación**: ✅ JWT Requerido

**Controller**: `pmessageController.getAll`

---

#### POST `/api/pmessages`

**Descripción**: Crear mensaje de protocolo

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `position`: Requerido

- `title`: Requerido

- `message`: Requerido

- `lvltwo`: Requerido

---

#### PUT `/api/pmessages/:id`

**Descripción**: Actualizar mensaje de protocolo

**Autenticación**: ✅ JWT Requerido

---

#### DELETE `/api/pmessages/:id`

**Descripción**: Eliminar mensaje de protocolo

**Autenticación**: ✅ JWT Requerido

---

### 📝 Razones de Cierre

#### GET `/api/closure_reasons`

**Descripción**: Listar razones de cierre

**Autenticación**: ✅ JWT Requerido

---

#### POST `/api/closure_reasons`

**Descripción**: Crear razón de cierre

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `title`: Requerido

- `message`: Requerido

- `lvltwo`: Requerido

---

#### PUT `/api/closure_reasons/:id`

**Descripción**: Actualizar razón de cierre

**Autenticación**: ✅ JWT Requerido

---

#### DELETE `/api/closure_reasons/:id`

**Descripción**: Eliminar razón de cierre

**Autenticación**: ✅ JWT Requerido

---

### 👨‍💼 Agentes

#### GET `/api/agents`

**Descripción**: Listar todos los agentes

**Autenticación**: ✅ JWT Requerido

**Controller**: `agentController.getAll`

---

#### GET `/api/agents/admin/active`

**Descripción**: Agentes activos (vista admin)

**Autenticación**: ✅ JWT Requerido

**Controller**: `agentController.getAgentActive`

---

#### GET `/api/agents/admin/tmo`

**Descripción**: TMO (Tiempo Medio de Operación) de agentes

**Autenticación**: ✅ JWT Requerido

**Controller**: `agentController.getAgentTMO`

---

#### GET `/api/admin/agents/:id`

**Descripción**: Obtener agente por ID

**Autenticación**: ✅ JWT Requerido

---

#### GET `/api/agents/:id/history/rooms`

**Descripción**: Historial de salas atendidas por agente

**Autenticación**: ✅ JWT Requerido

---

#### POST `/api/agents`

**Descripción**: Crear nuevo agente

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `fullname`: Requerido

- `username`: Requerido, único

- `password`: Requerido

- `email`: Requerido, único, formato email

- `phone_number`: Requerido

- `rooms`: Requerido (capacidad máxima)

- `admin`: Requerido (boolean)

- `status`: Requerido

**Body**:
```json
{
  "fullname": "María García",
  "username": "maria.garcia",
  "password": "contraseña123",
  "email": "maria@example.com",
  "phone_number": "+573001234567",
  "rooms": 5,
  "admin": false,
  "status": "ACTIVE"
}
```

---

#### PUT `/api/agents/:id`

**Descripción**: Actualizar agente

**Autenticación**: ✅ JWT Requerido

**Validaciones**: Similares a POST

---

#### PUT `/api/agents/debug/:id`

**Descripción**: Actualizar agente (modo debug)

**Autenticación**: ✅ JWT Requerido

---

#### PUT `/api/agents/:id/password`

**Descripción**: Cambiar contraseña de agente

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `password`: Requerido

---

#### PUT `/api/online/agents`

**Descripción**: Cambiar estado online del agente

**Autenticación**: ✅ JWT Requerido

**Permisos**: Solo agentes (`validAgent`)

**Body**:
```json
{
  "online": true
}
```

---

#### PUT `/api/request/agents`

**Descripción**: Solicitar desconexión

**Autenticación**: ✅ JWT Requerido

**Permisos**: Solo agentes

---

#### GET `/api/agents/areas`

**Descripción**: Áreas disponibles para transferencia

**Autenticación**: ✅ JWT Requerido

**Permisos**: Solo agentes

---

#### GET `/api/agents/logs/line`

**Descripción**: Logs de conexión/desconexión

**Autenticación**: ✅ JWT Requerido

**Permisos**: Solo agentes

---

### 👥 Usuarios

#### GET `/api/users`

**Descripción**: Listar todos los usuarios

**Autenticación**: ✅ JWT Requerido

---

#### GET `/api/users/:id/history/rooms`

**Descripción**: Historial de conversaciones del usuario

**Autenticación**: ✅ JWT Requerido

---

#### POST `/api/users`

**Descripción**: Crear nuevo usuario

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `fullname`: Requerido

- `username`: Requerido, único

- `password`: Requerido

- `email`: Requerido, formato email

- `status`: Requerido

- `phoneNumber`: Requerido

---

#### PUT `/api/users/:id`

**Descripción**: Actualizar usuario

**Autenticación**: ✅ JWT Requerido

---

#### PUT `/api/users/:id/password`

**Descripción**: Cambiar contraseña de usuario

**Autenticación**: ✅ JWT Requerido

---

#### PUT `/api/users/:id/activate`

**Descripción**: Activar usuario pendiente

**Autenticación**: ✅ JWT Requerido

---

#### GET `/api/users/status/pending`

**Descripción**: Usuarios con estado PENDING

**Autenticación**: ✅ JWT Requerido

---

### 🏠 Salas (Rooms)

#### GET `/api/rooms`

**Descripción**: Listar salas del agente autenticado

**Autenticación**: ✅ JWT Requerido

**Permisos**: Solo agentes (`onlyAgent`)

---

#### GET `/api/rooms/assistant/all`

**Descripción**: Todas las salas atendidas por bot

**Autenticación**: ✅ JWT Requerido

---

#### GET `/api/rooms/:id`

**Descripción**: Obtener detalles de una sala

**Autenticación**: ✅ JWT Requerido

**Permisos**: Usuario debe pertenecer a la sala

---

#### PUT `/api/rooms/user/transfer/:area_id`

**Descripción**: Transferir sala a otra área (desde usuario)

**Autenticación**: ✅ JWT Requerido

---

#### PUT `/api/agents/rooms/area/:area_id/transfer`

**Descripción**: Transferir sala a otra área (desde agente)

**Autenticación**: ✅ JWT Requerido

**Permisos**: Solo agentes

**Validaciones**:

- `roomId`: Requerido

---

#### DELETE `/api/user/rooms/close`

**Descripción**: Cerrar sala (desde usuario)

**Autenticación**: ✅ JWT Requerido

---

#### DELETE `/api/rooms/:id/close`

**Descripción**: Cerrar sala (desde agente/admin)

**Autenticación**: ✅ JWT Requerido

**Permisos**: Usuario debe pertenecer a la sala

---

#### GET `/api/admin/rooms/counts`

**Descripción**: Contadores de salas por estado

**Autenticación**: ✅ JWT Requerido

---

#### POST `/api/rooms/search/tickets`

**Descripción**: Buscar salas por números de ticket

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `tickets`: Array requerido

**Body**:
```json
{
  "tickets": [123, 456, 789]
}
```

---

#### GET `/api/agents/rooms`

**Descripción**: Salas asignadas al agente

**Autenticación**: ✅ JWT Requerido

**Permisos**: Solo agentes

---

### 📋 Cola

#### GET `/api/queue`

**Descripción**: Estado actual de la cola de espera

**Autenticación**: ✅ JWT Requerido

**Controller**: `queueController.getAll`

**Response** (200):
```json
{
  "queue": [
    {
      "id": 1,
      "room_id": 123,
      "area_id": 1,
      "position": 1,
      "created_at": "2025-12-18T20:00:00.000Z",
      "wait_time": 120
    }
  ],
  "total": 1
}
```

---

### 🔔 Notificaciones

#### GET `/api/notifications`

**Descripción**: Listar emails suscritos a notificaciones

**Autenticación**: ✅ JWT Requerido

---

#### POST `/api/notifications`

**Descripción**: Suscribir email a notificaciones

**Autenticación**: ✅ JWT Requerido

**Validaciones**:

- `email`: Requerido, formato email

---

#### DELETE `/api/notifications/:id`

**Descripción**: Eliminar suscripción

**Autenticación**: ✅ JWT Requerido

---

#### POST `/api/webpush/subscribe`

**Descripción**: Suscribir a push notifications

**Autenticación**: ❌ No requerida

**Controller**: `authController.saveSubscription`

---

#### GET `/api/publicKeyweb`

**Descripción**: Obtener clave pública VAPID para web push

**Autenticación**: ❌ No requerida

---

### 📢 Alertas Masivas

#### GET `/api/mass-alerts`

**Descripción**: Listar alertas masivas

**Autenticación**: ✅ JWT Requerido

---

#### POST `/api/mass-alerts`

**Descripción**: Crear alerta masiva con archivo opcional

**Autenticación**: ✅ JWT Requerido

**Content-Type**: `multipart/form-data`

**Validaciones**:

- `message`: Requerido

---

#### PUT `/api/mass-alerts/:id`

**Descripción**: Actualizar alerta masiva

**Autenticación**: ✅ JWT Requerido

---

#### DELETE `/api/mass-alerts/:id`

**Descripción**: Eliminar alerta masiva (soft delete)

**Autenticación**: ✅ JWT Requerido

---

## 🔒 Middlewares de Seguridad

### validJWT

Valida token JWT en header `Authorization: Bearer <token>`

**Ubicación en flujo**: Después de endpoints públicos

### validAgent

Valida que el usuario autenticado sea un agente

**Ubicación en flujo**: Después de validJWT

### validRequest

Valida errores de express-validator

### validRecaptchar

Valida Google reCAPTCHA en login de usuarios

### validFiles

Valida tipo y tamaño de archivos subidos

### Permisos Personalizados

- `onlyRoom`: Usuario debe pertenecer a la sala

- `onlyAgent`: Solo agentes pueden acceder

- `onlyRoomId`: Validación por ID de sala

- `onlyRoomMessage`: Validación para envío de mensajes

- `onlyUserRoomMessage`: Usuario específico de la sala

- `onlyUser`: Solo usuarios finales

---

## 📖 Documentación OpenAPI/Swagger

**Estado**: ❌ No implementada

**Recomendación**: Implementar con `swagger-jsdoc` y `swagger-ui-express`

---

## 🛡️ Rate Limiting

**Estado**: ❌ No implementado

**Recomendación**: Implementar con `express-rate-limit`

**Endpoints prioritarios**:

- Login endpoints (prevenir brute force)

- Endpoints públicos (prevenir abuso)

- Endpoints de creación (prevenir spam)

---

## 🔄 Códigos de Estado HTTP

| Código | Descripción | Uso |
|--------|-------------|-----|
| 200 | OK | Operación exitosa (GET, PUT, DELETE) |
| 201 | Created | Recurso creado (POST) |
| 400 | Bad Request | Validación fallida |
| 401 | Unauthorized | Token inválido o ausente |
| 403 | Forbidden | Sin permisos para la operación |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

## 📝 Ejemplo de Flujo Completo

### Caso de Uso: Usuario inicia conversación

```bash
# 1. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario123",
    "password": "pass123"
  }'

# Response: { "token": "eyJhbG...", "user": {...} }

# 2. Crear sesión Watson
curl -X POST http://localhost:3000/api/watson/assistant/create-session \
  -H "Authorization: Bearer eyJhbG..." \
  -H "Content-Type: application/json"

# Response: { "sessionId": "watson-session-123" }

# 3. Enviar mensaje a Watson
curl -X POST http://localhost:3000/api/watson/assistant/messages \
  -H "Authorization: Bearer eyJhbG..." \
  -H "Content-Type: application/json" \
  -d '{
    "body": "Necesito ayuda con mi cuenta",
    "sessionId": "watson-session-123"
  }'

# Response: Respuesta del bot o transferencia a agente

# 4. Si fue transferido, obtener mensajes de la sala
curl -X GET http://localhost:3000/api/rooms/123/messages \
  -H "Authorization: Bearer eyJhbG..."

# 5. Enviar mensaje al agente
curl -X POST http://localhost:3000/api/messages \
  -H "Authorization: Bearer eyJhbG..." \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": 123,
    "fromModel": "User",
    "type": "text",
    "body": "¿Pueden ayudarme?",
    "read": false,
    "phone_number": "+573001234567"
  }'

# 6. Al finalizar, crear encuesta
curl -X POST http://localhost:3000/api/surveys \
  -H "Authorization: Bearer eyJhbG..." \
  -H "Content-Type: application/json" \
  -d '{
    "room_id": 123,
    "score": "10",
    "message": "Excelente servicio",
    "comment": "Muy rápida la atención"
  }'
```

---

## 🔗 Referencias

- **Base URL**: `http://localhost:3000/api` (desarrollo)

- **Versión**: 2.1.2

- **Equipo**: Transformation and Innovation Team

- **Licencia**: © 2025 All rights reserved

---

## 📊 Resumen por Números

- **Total endpoints**: 92

- **Endpoints públicos**: 18

- **Endpoints autenticados**: 74

- **Endpoints solo agentes**: 10

- **Controladores**: 14

- **Middlewares de validación**: 6

- **Middlewares de permisos**: 6

# Requisitos Funcionales - WhatHelp Chat API

## 🎯 Propósito

Este documento especifica todos los requisitos funcionales del sistema WhatHelp Chat API, describiendo QUÉ debe hacer el sistema desde la perspectiva del usuario.

**Contexto del Proyecto:**

El propósito principal del sistema es permitir que los usuarios tengan acceso a la información de IBM Watson Assistant, donde están los flujos pre-entrenados que las entidades necesitan y también la base de conocimiento con los documentos de las entidades. Es una plataforma de autogestión para entidades como Banco de Bogotá.

**Usuarios del Sistema:**

- **Users:** Usuario final de una entidad (por ejemplo de Banco Austro) que se logea e interactúa con el chatbot WhatHelp para resolver una pregunta o caso

- **Agents:** Quien atiende a un User cuando este pide ser atendido por un agente, debido a que los flujos de Watson Assistant no resolvieron su caso

- **Admin:** Quien tiene acceso a la vista de administración, donde se ven las métricas de los agentes y opciones de configuración

**Valor de Negocio:**

Generar una plataforma donde las entidades tengan una opción de autogestión para sus usuarios.

---

## 📊 Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| **Total de requisitos** | 76 |
| **Implementados** | 76 |
| **En desarrollo** | 0 |
| **Planificados** | 0 |
| **Must Have** | 76 |
| **Should Have** | 0 |
| **Could Have** | 0 |
| **Cobertura de Tests** | 0% |

---

## 📁 Estructura de Documentación

Los requisitos funcionales están organizados por módulos para facilitar su lectura y mantenimiento:

### Módulos Documentados

1. **[Autenticación y Sesiones](./funcionales/01-autenticacion.md)** (8 RF)
   - Login de usuarios, agentes y administradores
   - Registro y aprobación de usuarios
   - Gestión de sesiones JWT
   - Web Push subscriptions

2. **[Mensajes y Chat](./funcionales/02-mensajes.md)** (Próximamente)
   - Envío y recepción de mensajes
   - Archivos adjuntos
   - Historial de conversaciones

3. **[Salas y Conversaciones](./funcionales/03-salas.md)** (Próximamente)
   - Creación y gestión de salas
   - Transferencias entre agentes/áreas
   - Cierre de conversaciones

4. **[Watson Assistant](./funcionales/04-watson.md)** (Próximamente)
   - Sesiones de Watson
   - Integración con flujos
   - Procesamiento de intenciones

5. **[Integraciones Externas](./funcionales/05-integraciones.md)** (Próximamente)
   - WhatsApp (Axede)
   - Microsoft Teams
   - Oracle B2C (ITSM)

6. **[Administración](./funcionales/06-administracion.md)** (Próximamente)
   - Gestión de agentes
   - Gestión de áreas
   - Configuración del sistema
   - Métricas y reportes

7. **[Encuestas y Calidad](./funcionales/07-encuestas.md)** (Próximamente)
   - Encuestas de satisfacción
   - Encuestas generales
   - Análisis de calidad

8. **[Sistema y Monitoreo](./funcionales/08-sistema.md)** (Próximamente)
   - Health checks
   - Estadísticas de caché
   - Notificaciones
   - Alertas masivas

---

## 📊 Resumen por Módulo

| Módulo | Total RF | Implementados | Must Have | Tests |
|--------|----------|---------------|-----------|-------|
| Autenticación | 8 | 8 | 8 | 0 |
| Mensajes | 6 | 6 | 6 | 0 |
| Salas | 12 | 12 | 12 | 0 |
| Watson Assistant | 5 | 5 | 5 | 0 |
| Integraciones | 8 | 8 | 8 | 0 |
| Administración | 25 | 25 | 25 | 0 |
| Encuestas | 3 | 3 | 3 | 0 |
| Sistema | 9 | 9 | 9 | 0 |
| **TOTAL** | **76** | **76** | **76** | **0** |

---

## 📋 Requisitos Funcionales

### RF-001: Información del Sistema

**Historia de Usuario:**

- **Como** desarrollador o administrador del sistema

- **Quiero** consultar información básica de la API

- **Para** verificar que el servicio está funcionando y conocer su versión

**Endpoint/Operación:**
```
GET /api/
```

**Criterios de Aceptación:**

- [ ] El endpoint `/api/` responde con método GET

- [ ] Retorna status 200 con información del sistema

- [ ] Incluye nombre del equipo de desarrollo

- [ ] Incluye nombre de la aplicación

- [ ] Incluye licencia y año actual

- [ ] Incluye versión del sistema (2.1.2)

- [ ] No requiere autenticación

**Detalles Técnicos:**

- **Módulo:** Sistema

- **Archivo:** `app/routes/api.js` (línea 56)

- **Autenticación:** No

- **Roles permitidos:** Público

- **Parámetros:** Ninguno

- **Respuestas:**
  - `200`: Información del sistema exitosamente

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-002: Health Check

**Historia de Usuario:**

- **Como** sistema de monitoreo o administrador

- **Quiero** verificar el estado de salud del servicio

- **Para** asegurar que la API está operativa y conocer métricas de la instancia

**Endpoint/Operación:**
```
GET /api/health
```

**Criterios de Aceptación:**

- [ ] El endpoint `/api/health` responde con método GET

- [ ] Retorna status 200 cuando el servicio está saludable

- [ ] Incluye timestamp de la verificación

- [ ] Incluye información de la instancia (ID, nombre, PID)

- [ ] Incluye uptime del proceso

- [ ] Incluye información de memoria

- [ ] Incluye versión del sistema

- [ ] No requiere autenticación

**Detalles Técnicos:**

- **Módulo:** Sistema / Monitoreo

- **Archivo:** `app/routes/api.js` (línea 67)

- **Autenticación:** No

- **Roles permitidos:** Público

- **Parámetros:** Ninguno

- **Respuestas:**
  - `200`: Servicio saludable con métricas

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-003: Estadísticas de Caché

**Historia de Usuario:**

- **Como** administrador del sistema

- **Quiero** consultar estadísticas del sistema de caché Redis

- **Para** monitorear el rendimiento y efectividad del caché

**Endpoint/Operación:**
```
GET /api/cache/stats
```

**Criterios de Aceptación:**

- [ ] El endpoint `/api/cache/stats` responde con método GET

- [ ] Retorna status 200 con estadísticas de caché

- [ ] Incluye número de hits (aciertos)

- [ ] Incluye número de misses (fallos)

- [ ] Incluye número de errores

- [ ] Incluye estado de conexión a Redis

- [ ] Incluye timestamp de la consulta

- [ ] No requiere autenticación

**Detalles Técnicos:**

- **Módulo:** Sistema / Caché

- **Archivo:** `app/routes/api.js` (línea 84)

- **Autenticación:** No

- **Roles permitidos:** Público

- **Parámetros:** Ninguno

- **Respuestas:**
  - `200`: Estadísticas de caché

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-004: Información de Instancia

**Historia de Usuario:**

- **Como** administrador del sistema

- **Quiero** consultar información detallada de la instancia

- **Para** diagnosticar problemas y verificar configuración del servidor

**Endpoint/Operación:**
```
GET /api/instance
```

**Criterios de Aceptación:**

- [ ] El endpoint `/api/instance` responde con método GET

- [ ] Retorna status 200 con información de la instancia

- [ ] Incluye ID de instancia

- [ ] Incluye nombre de instancia

- [ ] Incluye PID del proceso

- [ ] Incluye hostname del servidor

- [ ] Incluye plataforma y arquitectura

- [ ] Incluye versión de Node.js

- [ ] Incluye uptime y uso de memoria

- [ ] Incluye número de CPUs

- [ ] No requiere autenticación

**Detalles Técnicos:**

- **Módulo:** Sistema / Diagnóstico

- **Archivo:** `app/routes/api.js` (línea 93)

- **Autenticación:** No

- **Roles permitidos:** Público

- **Parámetros:** Ninguno

- **Respuestas:**
  - `200`: Información detallada de la instancia

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-005: Obtener Clave Pública Web Push

**Historia de Usuario:**

- **Como** aplicación web cliente

- **Quiero** obtener la clave pública para notificaciones web push

- **Para** poder suscribir usuarios a notificaciones push

**Endpoint/Operación:**
```
GET /api/publicKeyweb
```

**Criterios de Aceptación:**

- [ ] El endpoint `/api/publicKeyweb` responde con método GET

- [ ] Retorna la clave pública VAPID configurada

- [ ] No requiere autenticación

- [ ] Retorna texto plano con la clave

**Detalles Técnicos:**

- **Módulo:** Notificaciones

- **Archivo:** `app/routes/api.js` (línea 112)

- **Autenticación:** No

- **Roles permitidos:** Público

- **Parámetros:** Ninguno

- **Respuestas:**
  - `200`: Clave pública VAPID

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-006: Suscripción a Notificaciones Web Push

**Historia de Usuario:**

- **Como** usuario autenticado

- **Quiero** suscribirme a notificaciones web push

- **Para** recibir notificaciones en mi navegador

**Endpoint/Operación:**
```
POST /api/webpush/subscribe
```

**Criterios de Aceptación:**

- [ ] El endpoint `/api/webpush/subscribe` acepta método POST

- [ ] Requiere autenticación válida

- [ ] Guarda la suscripción del usuario

- [ ] Retorna confirmación de suscripción exitosa

- [ ] Retorna status 401 si no está autenticado

**Detalles Técnicos:**

- **Módulo:** Notificaciones

- **Archivo:** `app/routes/api.js` (línea 113)

- **Autenticación:** Sí (validJWT)

- **Roles permitidos:** Usuarios autenticados

- **Parámetros:**
  - **Body:** Datos de suscripción web push

- **Respuestas:**
  - `200`: Suscripción guardada exitosamente
  - `401`: No autenticado

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-007: Descargar Archivo Externo

**Historia de Usuario:**

- **Como** usuario con token válido

- **Quiero** descargar archivos compartidos en conversaciones

- **Para** acceder a documentos adjuntos

**Endpoint/Operación:**
```
GET /api/FileDonw/:filename/:tokenfile
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método GET con parámetros de ruta

- [ ] Valida el token del archivo

- [ ] Retorna el archivo solicitado

- [ ] Retorna status 404 si el archivo no existe

- [ ] Retorna status 401 si el token es inválido

**Detalles Técnicos:**

- **Módulo:** Mensajes / Archivos

- **Archivo:** `app/routes/api.js` (línea 114)

- **Autenticación:** Token en parámetro

- **Roles permitidos:** Usuarios con token válido

- **Parámetros:**
  - **Path:** `filename` (nombre del archivo), `tokenfile` (token de seguridad)

- **Respuestas:**
  - `200`: Archivo descargado
  - `401`: Token inválido
  - `404`: Archivo no encontrado

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-008: Obtener Banner de Alertas Masivas (Público)

**Historia de Usuario:**

- **Como** usuario final

- **Quiero** ver banners de alertas masivas activas

- **Para** estar informado de mensajes importantes del sistema

**Endpoint/Operación:**
```
GET /api/public/banner
```

**Criterios de Aceptación:**

- [ ] El endpoint `/api/public/banner` responde con método GET

- [ ] Retorna banners de alertas masivas activas

- [ ] No requiere autenticación

- [ ] Filtra solo alertas masivas visibles públicamente

- [ ] Retorna status 200 con lista de banners

**Detalles Técnicos:**

- **Módulo:** Alertas Masivas

- **Archivo:** `app/routes/api.js` (línea 127)

- **Autenticación:** No

- **Roles permitidos:** Público

- **Parámetros:** Ninguno

- **Respuestas:**
  - `200`: Lista de banners activos

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-009: Mensaje desde Microsoft Teams

**Historia de Usuario:**

- **Como** sistema externo (Microsoft Teams)

- **Quiero** enviar mensajes del usuario a Watson Assistant

- **Para** procesar conversaciones de Teams con el asistente virtual

**Endpoint/Operación:**
```
POST /api/watson/assistant/teams/messages
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Procesa mensajes provenientes de Microsoft Teams

- [ ] Envía el mensaje a Watson Assistant

- [ ] Retorna la respuesta del asistente

- [ ] Maneja errores de Watson Assistant

- [ ] No requiere autenticación JWT (autenticación externa)

**Detalles Técnicos:**

- **Módulo:** Integraciones / Teams

- **Archivo:** `app/routes/api.js` (línea 134)

- **Autenticación:** No (validación externa)

- **Roles permitidos:** Sistema Teams

- **Parámetros:**
  - **Body:** Mensaje de Teams

- **Respuestas:**
  - `200`: Respuesta de Watson Assistant
  - `500`: Error procesando mensaje

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-010: Webhook de WhatsApp (Externo)

**Historia de Usuario:**

- **Como** sistema externo (Axede - WhatsApp)

- **Quiero** enviar mensajes de WhatsApp al sistema

- **Para** procesar conversaciones de usuarios vía WhatsApp

**Endpoint/Operación:**
```
POST /api/whatsapp/external
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Procesa mensajes de WhatsApp enviados por Axede

- [ ] Autentica/registra al usuario automáticamente

- [ ] Crea sala de conversación si no existe

- [ ] Envía mensaje a Watson Assistant

- [ ] Gestiona transferencia a agente humano si es necesario

- [ ] Soporta mensajes de texto y multimedia

- [ ] Retorna confirmación de procesamiento

- [ ] Implementa caché para optimizar performance

**Detalles Técnicos:**

- **Módulo:** Integraciones / WhatsApp

- **Archivo:** `app/routes/api.js` (línea 135), `app/controllers/whatsappController.js`

- **Autenticación:** API Key de Axede

- **Roles permitidos:** Sistema Axede

- **Parámetros:**
  - **Body:** `ProfileName`, `WaId`, `Body`, `MediaContentType0`, `MediaUrl0`, `Token`, `ChannelId`

- **Respuestas:**
  - `200`: Mensaje procesado exitosamente
  - `500`: Error procesando mensaje

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-011: Guardar Log de Agente General

**Historia de Usuario:**

- **Como** sistema de monitoreo externo

- **Quiero** registrar logs de actividad de agentes

- **Para** mantener trazabilidad de acciones

**Endpoint/Operación:**
```
POST /api/external/log/:agent/:type_log
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Registra logs con ID de agente y tipo de log

- [ ] Retorna confirmación de log guardado

- [ ] No requiere autenticación JWT

**Detalles Técnicos:**

- **Módulo:** Alertas / Logs

- **Archivo:** `app/routes/api.js` (línea 142)

- **Autenticación:** No

- **Roles permitidos:** Sistema externo

- **Parámetros:**
  - **Path:** `agent` (ID del agente), `type_log` (tipo de log)

- **Respuestas:**
  - `200`: Log guardado
  - `500`: Error guardando log

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-012: Login de Usuario

**Historia de Usuario:**

- **Como** usuario final

- **Quiero** iniciar sesión con mis credenciales

- **Para** acceder a la plataforma de chat y conversar con el asistente

**Endpoint/Operación:**
```
POST /api/auth/login
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Valida que el campo `username` sea requerido

- [ ] Valida que el campo `password` sea requerido

- [ ] Valida reCAPTCHA para prevenir bots

- [ ] Verifica credenciales contra la base de datos

- [ ] Verifica que el usuario esté activo (no inactivo ni pendiente)

- [ ] Requiere campo `areaId` para usuarios

- [ ] Crea o recupera sala de conversación

- [ ] Genera token JWT válido

- [ ] Retorna status 200 con usuario y token si es exitoso

- [ ] Retorna status 401 si credenciales incorrectas

- [ ] Retorna status 403 si usuario inactivo o pendiente

- [ ] Retorna status 404 si falta areaId

**Detalles Técnicos:**

- **Módulo:** Autenticación

- **Archivo:** `app/routes/api.js` (línea 143), `app/controllers/authController.js` (línea 8)

- **Autenticación:** No (este endpoint genera autenticación)

- **Roles permitidos:** Usuarios finales

- **Parámetros:**
  - **Body:** `username` (requerido), `password` (requerido), `areaId` (requerido para users)

- **Respuestas:**
  - `200`: Login exitoso con token JWT
  - `400`: Validación fallida
  - `401`: Credenciales incorrectas
  - `403`: Usuario inactivo o pendiente
  - `404`: areaId requerido

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-013: Login de Agente

**Historia de Usuario:**

- **Como** agente de atención

- **Quiero** iniciar sesión con mis credenciales de agente

- **Para** acceder al panel de atención y gestionar conversaciones

**Endpoint/Operación:**
```
POST /api/auth/agent/login
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Valida que el campo `username` sea requerido

- [ ] Valida que el campo `password` sea requerido

- [ ] Verifica credenciales contra tabla de agentes

- [ ] Verifica que el agente esté activo

- [ ] Genera token JWT con modelo "agents"

- [ ] Retorna status 200 con datos del agente y token

- [ ] Retorna status 401 si credenciales incorrectas

- [ ] Retorna status 403 si agente inactivo

- [ ] No requiere reCAPTCHA (endpoint interno)

**Detalles Técnicos:**

- **Módulo:** Autenticación / Agentes

- **Archivo:** `app/routes/api.js` (línea 151), `app/controllers/authController.js` (línea 48)

- **Autenticación:** No (este endpoint genera autenticación)

- **Roles permitidos:** Agentes

- **Parámetros:**
  - **Body:** `username` (requerido), `password` (requerido)

- **Respuestas:**
  - `200`: Login exitoso con token JWT
  - `400`: Validación fallida
  - `401`: Credenciales incorrectas
  - `403`: Agente inactivo

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-014: Logout de Agente

**Historia de Usuario:**

- **Como** agente de atención

- **Quiero** cerrar mi sesión

- **Para** registrar mi desconexión y liberar salas asignadas

**Endpoint/Operación:**
```
DELETE /api/auth/agent/logout/:agent
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método DELETE

- [ ] Registra el logout del agente en logs

- [ ] Actualiza estado del agente a offline

- [ ] Libera salas asignadas

- [ ] Retorna confirmación de logout exitoso

**Detalles Técnicos:**

- **Módulo:** Autenticación / Agentes

- **Archivo:** `app/routes/api.js` (línea 159)

- **Autenticación:** No requerida

- **Roles permitidos:** Sistema

- **Parámetros:**
  - **Path:** `agent` (ID del agente)

- **Respuestas:**
  - `200`: Logout exitoso
  - `500`: Error en logout

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-015: Login de Administrador

**Historia de Usuario:**

- **Como** administrador del sistema

- **Quiero** iniciar sesión con credenciales de administrador

- **Para** acceder al panel de administración y configurar el sistema

**Endpoint/Operación:**
```
POST /api/auth/admin/login
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Valida que el campo `username` sea requerido

- [ ] Valida que el campo `password` sea requerido

- [ ] Verifica que el usuario tenga rol de administrador

- [ ] Genera token JWT con privilegios de admin

- [ ] Retorna status 200 con datos y token

- [ ] Retorna status 401 si credenciales incorrectas

- [ ] Retorna status 403 si no tiene rol admin

**Detalles Técnicos:**

- **Módulo:** Autenticación / Administración

- **Archivo:** `app/routes/api.js` (línea 160)

- **Autenticación:** No (este endpoint genera autenticación)

- **Roles permitidos:** Administradores

- **Parámetros:**
  - **Body:** `username` (requerido), `password` (requerido)

- **Respuestas:**
  - `200`: Login exitoso con token JWT
  - `400`: Validación fallida
  - `401`: Credenciales incorrectas
  - `403`: Sin permisos de admin

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-016: Solicitud de Registro de Usuario

**Historia de Usuario:**

- **Como** usuario nuevo

- **Quiero** solicitar registro en el sistema

- **Para** crear una cuenta y esperar aprobación

**Endpoint/Operación:**
```
POST /api/auth/request
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Valida que `uid` sea requerido

- [ ] Valida que `fullname` sea requerido

- [ ] Valida que `password` sea requerido y cumpla política (8+ caracteres, mayúscula, minúscula, número, carácter especial)

- [ ] Valida que `email` sea requerido y tenga formato válido

- [ ] Valida que `phone_number` sea requerido

- [ ] Crea usuario con estado "pending"

- [ ] Hashea la contraseña con bcrypt (10 rounds)

- [ ] Retorna status 201 si se crea exitosamente

- [ ] Retorna status 400 si validación falla

- [ ] Retorna status 409 si el email ya existe

**Detalles Técnicos:**

- **Módulo:** Autenticación / Registro

- **Archivo:** `app/routes/api.js` (línea 168)

- **Autenticación:** No

- **Roles permitidos:** Público

- **Parámetros:**
  - **Body:** `uid` (requerido), `fullname` (requerido), `password` (requerido, min 8), `email` (requerido, email válido), `phone_number` (requerido)

- **Respuestas:**
  - `201`: Usuario registrado, pendiente de aprobación
  - `400`: Validación fallida
  - `409`: Email duplicado

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-017: Solicitud de Login Simplificado

**Historia de Usuario:**

- **Como** usuario nuevo desde WhatsApp

- **Quiero** registrarme automáticamente con datos básicos

- **Para** acceder rápidamente al servicio de chat

**Endpoint/Operación:**
```
POST /api/auth/request/login
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Valida que `uid` sea requerido

- [ ] Valida que `fullname` sea requerido

- [ ] Valida que `email` sea requerido y tenga formato válido

- [ ] Valida que `area_id` sea requerido

- [ ] Crea o recupera usuario automáticamente

- [ ] No requiere contraseña (para usuarios de WhatsApp)

- [ ] Retorna status 200 con usuario creado/recuperado

- [ ] Retorna status 400 si validación falla

**Detalles Técnicos:**

- **Módulo:** Autenticación / WhatsApp

- **Archivo:** `app/routes/api.js` (línea 178)

- **Autenticación:** No

- **Roles permitidos:** Público (WhatsApp)

- **Parámetros:**
  - **Body:** `uid` (requerido), `fullname` (requerido), `email` (requerido, email válido), `area_id` (requerido)

- **Respuestas:**
  - `200`: Usuario creado/recuperado
  - `400`: Validación fallida

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-018: Obtener Áreas Activas (Público)

**Historia de Usuario:**

- **Como** usuario que va a registrarse

- **Quiero** ver las áreas de atención disponibles

- **Para** seleccionar el área correcta al crear mi cuenta

**Endpoint/Operación:**
```
GET /api/auth/areas
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método GET

- [ ] Retorna solo áreas activas

- [ ] No requiere autenticación

- [ ] Retorna status 200 con lista de áreas

- [ ] Filtra áreas por estado activo

**Detalles Técnicos:**

- **Módulo:** Áreas / Autenticación

- **Archivo:** `app/routes/api.js` (línea 188)

- **Autenticación:** No

- **Roles permitidos:** Público

- **Parámetros:** Ninguno

- **Respuestas:**
  - `200`: Lista de áreas activas

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-019: Obtener Perfil de Usuario Autenticado

**Historia de Usuario:**

- **Como** usuario autenticado

- **Quiero** consultar mi información de perfil

- **Para** verificar mis datos y configuración

**Endpoint/Operación:**
```
GET /api/auth/profile
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método GET

- [ ] Requiere autenticación JWT válida

- [ ] Retorna datos del perfil del usuario autenticado

- [ ] Retorna status 200 con perfil

- [ ] Retorna status 401 si no está autenticado

- [ ] No expone información sensible (password)

**Detalles Técnicos:**

- **Módulo:** Autenticación

- **Archivo:** `app/routes/api.js` (línea 206)

- **Autenticación:** Sí (validJWT)

- **Roles permitidos:** Usuarios autenticados

- **Parámetros:** Ninguno (usa token JWT)

- **Respuestas:**
  - `200`: Perfil del usuario
  - `401`: No autenticado

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-020: Guardar Mensaje en Sala

**Historia de Usuario:**

- **Como** usuario o agente en una conversación

- **Quiero** enviar un mensaje de texto

- **Para** comunicarme en la sala de chat

**Endpoint/Operación:**
```
POST /api/messages
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Requiere autenticación JWT válida

- [ ] Valida que `roomId` sea requerido

- [ ] Valida que `fromModel` sea requerido (users/agents)

- [ ] Valida que `type` sea requerido

- [ ] Valida que `body` sea requerido

- [ ] Valida que `read` sea requerido

- [ ] Valida que `phone_number` sea requerido

- [ ] Verifica permisos sobre la sala (onlyRoomMessage middleware)

- [ ] Guarda el mensaje en la base de datos

- [ ] Emite evento Socket.IO para actualización en tiempo real

- [ ] Retorna status 201 con mensaje guardado

- [ ] Retorna status 400 si validación falla

- [ ] Retorna status 401 si no autenticado

- [ ] Retorna status 403 si no tiene permisos sobre la sala

**Detalles Técnicos:**

- **Módulo:** Mensajes

- **Archivo:** `app/routes/api.js` (línea 211), `app/controllers/messageController.js`

- **Autenticación:** Sí (validJWT)

- **Roles permitidos:** Users, Agents (con permiso sobre la sala)

- **Parámetros:**
  - **Body:** `roomId` (requerido), `fromModel` (requerido), `type` (requerido), `body` (requerido), `read` (requerido), `phone_number` (requerido)

- **Respuestas:**
  - `201`: Mensaje guardado
  - `400`: Validación fallida
  - `401`: No autenticado
  - `403`: Sin permisos sobre la sala

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-021: Obtener Mensajes de una Sala

**Historia de Usuario:**

- **Como** usuario o agente con acceso a una sala

- **Quiero** ver el historial de mensajes

- **Para** revisar la conversación completa

**Endpoint/Operación:**
```
GET /api/rooms/:id/messages
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método GET

- [ ] Requiere autenticación JWT válida

- [ ] Verifica permisos sobre la sala (onlyRoom middleware)

- [ ] Retorna mensajes ordenados por fecha

- [ ] Soporta paginación (implícito)

- [ ] Retorna status 200 con lista de mensajes

- [ ] Retorna status 401 si no autenticado

- [ ] Retorna status 403 si no tiene permisos sobre la sala

- [ ] Retorna status 404 si la sala no existe

**Detalles Técnicos:**

- **Módulo:** Mensajes

- **Archivo:** `app/routes/api.js` (línea 223)

- **Autenticación:** Sí (validJWT)

- **Roles permitidos:** Users, Agents (con permiso sobre la sala)

- **Parámetros:**
  - **Path:** `id` (ID de la sala)

- **Respuestas:**
  - `200`: Lista de mensajes
  - `401`: No autenticado
  - `403`: Sin permisos
  - `404`: Sala no encontrada

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-022: Enviar Mensaje con Archivo Adjunto

**Historia de Usuario:**

- **Como** usuario o agente en una conversación

- **Quiero** enviar un archivo adjunto (imagen, documento, etc.)

- **Para** compartir información multimedia

**Endpoint/Operación:**
```
POST /api/messages/file
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST con multipart/form-data

- [ ] Requiere autenticación JWT válida

- [ ] Acepta un archivo mediante multer (campo "file")

- [ ] Valida tipo y tamaño de archivo (validFiles middleware)

- [ ] Verifica permisos sobre la sala (onlyUserRoomMessage middleware)

- [ ] Sube el archivo a IBM Cloud Object Storage

- [ ] Guarda mensaje con referencia al archivo

- [ ] Retorna status 201 con mensaje y URL del archivo

- [ ] Retorna status 400 si archivo inválido

- [ ] Retorna status 401 si no autenticado

- [ ] Retorna status 403 si no tiene permisos

- [ ] Retorna status 413 si archivo muy grande

**Detalles Técnicos:**

- **Módulo:** Mensajes / Archivos

- **Archivo:** `app/routes/api.js` (línea 225)

- **Autenticación:** Sí (validJWT)

- **Roles permitidos:** Users, Agents (con permiso sobre la sala)

- **Parámetros:**
  - **Body (multipart):** `file` (archivo), otros campos de mensaje

- **Respuestas:**
  - `201`: Archivo subido y mensaje guardado
  - `400`: Archivo inválido
  - `401`: No autenticado
  - `403`: Sin permisos
  - `413`: Archivo muy grande

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-023: Descargar Archivo de Sala

**Historia de Usuario:**

- **Como** usuario o agente con acceso a una sala

- **Quiero** descargar un archivo compartido en la conversación

- **Para** acceder a documentos adjuntos

**Endpoint/Operación:**
```
GET /api/room/:roomId/messages/file/download/:path
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método GET

- [ ] Requiere autenticación JWT válida

- [ ] Verifica permisos sobre la sala (onlyRoomId middleware)

- [ ] Descarga archivo desde IBM Cloud Object Storage

- [ ] Retorna el archivo con headers correctos

- [ ] Retorna status 200 con archivo

- [ ] Retorna status 401 si no autenticado

- [ ] Retorna status 403 si no tiene permisos

- [ ] Retorna status 404 si archivo no existe

**Detalles Técnicos:**

- **Módulo:** Mensajes / Archivos

- **Archivo:** `app/routes/api.js` (línea 230)

- **Autenticación:** Sí (validJWT)

- **Roles permitidos:** Users, Agents (con permiso sobre la sala)

- **Parámetros:**
  - **Path:** `roomId` (ID de sala), `path` (ruta del archivo)

- **Respuestas:**
  - `200`: Archivo descargado
  - `401`: No autenticado
  - `403`: Sin permisos
  - `404`: Archivo no encontrado

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-024: Listar Encuestas

**Historia de Usuario:**

- **Como** usuario autenticado

- **Quiero** ver las encuestas disponibles

- **Para** conocer las opciones de calificación del servicio

**Endpoint/Operación:**
```
GET /api/surveys
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método GET

- [ ] Requiere autenticación JWT válida

- [ ] Retorna lista de encuestas activas

- [ ] Retorna status 200 con encuestas

- [ ] Retorna status 401 si no autenticado

**Detalles Técnicos:**

- **Módulo:** Encuestas

- **Archivo:** `app/routes/api.js` (línea 237)

- **Autenticación:** Sí (validJWT)

- **Roles permitidos:** Usuarios autenticados

- **Parámetros:** Ninguno

- **Respuestas:**
  - `200`: Lista de encuestas
  - `401`: No autenticado

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-025: Guardar Respuesta de Encuesta

**Historia de Usuario:**

- **Como** usuario que finalizó una conversación

- **Quiero** calificar el servicio recibido

- **Para** proporcionar feedback sobre mi experiencia

**Endpoint/Operación:**
```
POST /api/surveys
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Requiere autenticación JWT válida

- [ ] Valida que `score` sea requerido

- [ ] Valida que `message` sea requerido

- [ ] Guarda la respuesta de encuesta

- [ ] Asocia encuesta con sala/usuario

- [ ] Retorna status 201 con encuesta guardada

- [ ] Retorna status 400 si validación falla

- [ ] Retorna status 401 si no autenticado

**Detalles Técnicos:**

- **Módulo:** Encuestas

- **Archivo:** `app/routes/api.js` (línea 238)

- **Autenticación:** Sí (validJWT)

- **Roles permitidos:** Users

- **Parámetros:**
  - **Body:** `score` (requerido), `message` (requerido)

- **Respuestas:**
  - `201`: Encuesta guardada
  - `400`: Validación fallida
  - `401`: No autenticado

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

### RF-026: Guardar Encuesta General

**Historia de Usuario:**

- **Como** usuario que finalizó una conversación

- **Quiero** responder una encuesta general detallada

- **Para** proporcionar feedback completo sobre la atención

**Endpoint/Operación:**
```
POST /api/general/survey
```

**Criterios de Aceptación:**

- [ ] El endpoint acepta método POST

- [ ] Requiere autenticación JWT válida

- [ ] Valida que `room_id` sea requerido

- [ ] Valida que `user_id` sea requerido

- [ ] Valida que `agent_id` sea requerido

- [ ] Valida que `answers` sea requerido (array de respuestas)

- [ ] Guarda todas las respuestas de la encuesta

- [ ] Retorna status 201 con encuesta guardada

- [ ] Retorna status 400 si validación falla

- [ ] Retorna status 401 si no autenticado

**Detalles Técnicos:**

- **Módulo:** Encuestas

- **Archivo:** `app/routes/api.js` (línea 248)

- **Autenticación:** Sí (validJWT)

- **Roles permitidos:** Users

- **Parámetros:**
  - **Body:** `room_id` (requerido), `user_id` (requerido), `agent_id` (requerido), `answers` (requerido, array)

- **Respuestas:**
  - `201`: Encuesta general guardada
  - `400`: Validación fallida
  - `401`: No autenticado

**Prioridad:** Must Have

**Estado:** ✅ Implementado

**Tests:** ❌ No

---

Debido a la extensión del documento, continuaré con los requisitos funcionales restantes en el siguiente fragmento. Por ahora, he documentado 26 de los 76 requisitos funcionales identificados.

¿Deseas que continúe con el resto de los requisitos funcionales (RF-027 a RF-076) o prefieres que genere directamente el segundo archivo de requisitos no funcionales?

# 📋 Casos de Uso - Alertas y Notificaciones

## 🎯 Objetivo

Documentar casos de uso relacionados con alertas masivas, notificaciones a agentes y mensajes de protocolo.

---

## 📊 Casos de Uso en Este Módulo

| ID | Caso de Uso | Actor | Criticidad | Estado |
|----|-------------|-------|------------|--------|
| CU-014 | Publicar Alerta Masiva (Banner) | Administrador | Media | ✅ Implementado |
| CU-017 | Gestionar Mensajes de Protocolo | Administrador | Baja | ✅ Implementado |
| CU-018 | Enviar Notificación a Agente | Sistema | Baja | ✅ Implementado |

---

## CU-014: Publicar Alerta Masiva (Banner)

### Descripción
Un administrador publica una alerta masiva (banner) visible para todos los usuarios, utilizada principalmente para notificar fallas masivas en productos digitales.

### Actores

- **Primario**: Administrador

- **Secundarios**: Usuarios (funcionarios)

### Precondiciones

- Administrador autenticado

- Permiso de administrador

### Trigger

- **Evento**: `POST /mass-alerts`

- **Origen**: Panel de administración

---

#### Flujo Principal

1. Administrador accede a módulo de alertas masivas

2. Administrador redacta mensaje de alerta

3. Administrador opcionalmente adjunta imagen

4. Sistema valida autenticación y permisos

5. Si hay imagen:
   - Sistema sube imagen a Cloud Object Storage
   - Genera URL pública

6. Sistema desactiva alertas masivas anteriores del mismo administrador

7. Sistema crea nueva alerta en tabla `mass_alerts`:
   - message: Texto de la alerta
   - image: URL de la imagen (si aplica)
   - created_by: ID del administrador
   - deleted: false

8. Sistema emite evento Socket.IO a todos los usuarios

9. Usuarios ven banner en aplicación WhatsApp

10. **Postcondición**: Alerta visible para todos los usuarios

---

#### Propósito de Negocio

**Objetivo**: Reducir chats en cola durante eventos masivos

**Casos de Uso**:

- Falla masiva en producto digital (ej: App móvil no funciona)

- Mantenimiento programado de servicios

- Cambios de horario excepcionales

- Alertas importantes para todos los funcionarios

**Impacto**: 

- Usuarios ven la alerta antes de iniciar conversación

- Reducción de consultas repetitivas

- Información proactiva sobre problemas conocidos

---

#### Reglas de Negocio

- **RN-054**: Solo un banner activo por administrador

- **RN-055**: Publicar nuevo banner desactiva el anterior del mismo admin

- **RN-056**: Banner visible en endpoint público `/public/banner`

- **RN-057**: Imágenes se almacenan en COS bajo carpeta `MASS_ALERTS/`

---

#### Información Técnica

**Endpoints**: 

- `POST /mass-alerts` (crear)

- `GET /public/banner` (consultar activos)

- `DELETE /mass-alerts/:id` (eliminar)

**Archivo**: `app/controllers/massAlertController.js`

**Estado**: ✅ Implementado

---

## CU-017: Gestionar Mensajes de Protocolo

### Descripción
Administradores gestionan plantillas de mensajes predefinidos que los agentes pueden usar durante la atención.

### Actores

- **Primario**: Administrador (gestión), Agente (uso)

- **Secundarios**: Sistema

### Precondiciones

- Usuario autenticado con permisos

### Trigger

- **Gestión**: `POST /pmessages`, `PUT /pmessages/:id`

- **Uso**: Agente selecciona mensaje en interfaz

---

#### Flujo Principal

1. Administrador crea mensaje de protocolo:
   - position: Orden de visualización
   - title: Título del mensaje
   - message: Texto del mensaje
   - lvltwo: Si es para Nivel 2 (true/false)

2. Sistema guarda en tabla `protocol_messages`

3. Agentes ven mensajes disponibles en su interfaz

4. Agente selecciona mensaje de protocolo

5. Sistema inserta mensaje en conversación

6. Usuario recibe mensaje predefinido

7. **Postcondición**: Mensaje de protocolo utilizado

---

#### Propósito de Negocio

**Objetivo**: Estandarizar comunicación con usuarios

**Casos de Uso**:

- Saludos institucionales

- Procedimientos estándar

- Políticas de la entidad

- Despedidas formales

- Instrucciones comunes

**Beneficios**:

- Consistencia en comunicación

- Rapidez en respuestas

- Cumplimiento de protocolo institucional

---

#### Reglas de Negocio

- **RN-058**: Mensajes pueden ser específicos por nivel (Nivel 1 / Nivel 2)

- **RN-059**: Position determina orden de visualización

- **RN-060**: Plantillas son de la entidad (institucionales)

---

#### Información Técnica

**Endpoint**: `GET /pmessages?lvltwo={true|false}`

**Archivo**: `app/controllers/pmessageController.js`

**Estado**: ✅ Implementado

---

## CU-018: Enviar Notificación a Agente

### Descripción
El sistema envía notificaciones push a agentes para alertas importantes.

### Actores

- **Primario**: Sistema

- **Secundarios**: Agente

### Precondiciones

- Agente tiene notificaciones habilitadas

- Agente tiene token de suscripción web push

### Trigger

- **Evento**: Sistema detecta condición de alerta

- **Origen**: Interno (timeouts, asignaciones, etc.)

---

#### Flujo Principal

1. Sistema detecta evento que requiere notificación

2. Sistema consulta token web push del agente

3. Sistema prepara payload de notificación

4. Sistema envía push notification usando VAPID

5. Agente recibe notificación en navegador/dispositivo

6. **Postcondición**: Agente notificado

---

#### Tipos de Notificaciones

- Nueva conversación asignada

- Mensaje de usuario sin responder (timeout)

- Alertas del sistema

- Cambios de estado en conversaciones

---

#### Información Técnica

**Método**: Web Push API con VAPID

**Archivo**: `app/logic/Alert.js`

**Estado**: ✅ Implementado

---

**Última Actualización**: 18 de diciembre de 2025

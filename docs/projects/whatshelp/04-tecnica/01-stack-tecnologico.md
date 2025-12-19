# ⚙️ Stack Tecnológico

## 🎯 Objetivo

Documentar todas las tecnologías utilizadas en el proyecto WhatHelp Chat API con versiones exactas y justificaciones.

---

## 🖥️ Backend

### Runtime y Lenguaje

**Node.js**: v20 (node:20-slim)

- **Por qué**: Node.js es ideal para aplicaciones en tiempo real con alta concurrencia, especialmente para sistemas de chat que requieren comunicación bidireccional mediante WebSockets.

- **Versión soportada**: Node.js v20 LTS

- **Plan de actualización**: Está planeada una migración a versiones más recientes según roadmap del equipo.

### Framework Web

**Express**: v4.21.2

- **Por qué**: Framework web minimalista y flexible, ampliamente adoptado en la industria, con gran ecosistema de middleware.

- **Configuración**: 
  - Servidor HTTP estándar
  - Configuración HTTPS comentada disponible para producción
  - Soporte para multi-instancia con load balancing

### Base de Datos

**PostgreSQL**: v16.10.0

- **Por qué**: Base de datos relacional robusta con excelente soporte para transacciones ACID y concurrencia.

- **Driver**: pg v8.5.1

- **Schema**: banco_bgta_chat

- **Connection pool**: Configurado mediante driver pg

- **Estrategia de migrations**: SQL manual (scripts ubicados en `db/migrations/`)

### Caché y Mensajería

**Redis**: v4.6.0 (cliente Node.js)

- **Estado actual**: Configurado pero no utilizado en producción (versión 0 reportada)

- **Propósito previsto**:
  - Sistema de caché con fallback automático
  - Adapter para Socket.IO en arquitectura multi-instancia
  - Pub/Sub para sincronización entre instancias

- **Características**:
  - Reconexión automática
  - Fail-safe (la aplicación continúa sin caché si Redis falla)
  - Métricas de hit/miss

### Comunicación en Tiempo Real

**Socket.io**: v4.5.2

- **Por qué**: Biblioteca líder para comunicación bidireccional en tiempo real, esencial para un sistema de chat.

- **Configuración**:
  - Connection State Recovery habilitado (10 minutos)
  - Ping interval: 30 segundos
  - Ping timeout: 30 segundos
  - Upgrade timeout: 20 segundos

**@socket.io/redis-adapter**: v8.2.1

- **Propósito**: Permite escalabilidad horizontal sincronizando eventos entre múltiples instancias del servidor

- **Estado**: Configurado para uso futuro con Redis

### Librerías Principales

#### Autenticación y Seguridad

| Librería | Versión | Propósito |
|----------|---------|-----------|
| jsonwebtoken | v9.0.2 | Generación y validación de tokens JWT para autenticación |
| bcryptjs | v3.0.2 | Hashing seguro de contraseñas con salt |
| helmet | v6.2.0 | Middleware de seguridad HTTP (headers seguros) |
| helmet-csp | v3.3.1 | Content Security Policy para prevenir XSS |
| express-validator | v6.15.0 | Validación y sanitización de datos de entrada |
| express-session | v1.18.2 | Manejo de sesiones del lado del servidor |
| cookie-parser | v1.4.5 | Parser de cookies HTTP |
| cookie-session | v2.1.1 | Sesiones basadas en cookies |
| strict-transport-security | v0.3.0 | HSTS para forzar HTTPS |
| cors | v2.8.5 | Control de CORS para requests cross-origin |

#### IBM Cloud Services

| Librería | Versión | Propósito |
|----------|---------|-----------|
| ibm-watson | v10.0.0 | SDK oficial de IBM Watson para integración con Watson Assistant |
| ibm-cos-sdk | v1.14.1 | SDK de IBM Cloud Object Storage (S3-compatible) para archivos |

#### Utilidades y Herramientas

| Librería | Versión | Propósito |
|----------|---------|-----------|
| axios | v1.11.0 | Cliente HTTP para consumir APIs externas |
| multer | v2.0.2 | Middleware para manejo de uploads multipart/form-data |
| node-cron | v4.2.1 | Scheduler para tareas programadas (cierres automáticos, notificaciones) |
| morgan | v1.10.1 | Logger HTTP para debugging y monitoreo |
| dotenv | v17.0.0 | Carga de variables de entorno desde archivo .env |
| web-push | v3.6.7 | Implementación de Web Push Protocol para notificaciones push |
| crypto-js | v4.1.1 | Librería de criptografía para cifrado de datos |
| pg-format | v1.0.4 | Formateo seguro de queries SQL (prevención de SQL injection) |
| file-type | v7.7.1 | Detección de tipo MIME de archivos |

---

## 🎨 Frontend

**No detectado en este repositorio**

Este proyecto es una API backend pura. El frontend está separado en otro repositorio.

---

## 🛠️ Herramientas de Desarrollo

### Testing

**Estado**: No se detectaron frameworks de testing configurados.

**Recomendación**: Considerar implementar Jest o Mocha con Chai para testing unitario e integración.

### Linting/Formatting

**Estado**: No se detectaron herramientas de linting/formatting.

**Recomendación**: Considerar ESLint + Prettier para mantener consistencia de código.

### Process Manager

**PM2**: Configurado mediante `ecosystem.config.js`

- **Nombre de la aplicación**: max

- **Script de inicio**: ./index.js

- **Watch mode**: Activado

- **Entorno**: production

### Build Tools

**No aplica**: Proyecto en JavaScript puro sin necesidad de transpilación.

---

## 📦 Gestión de Dependencias

### Package Manager

**npm**: Versión según entorno

- `package.json` y `package-lock.json` presentes

- Scripts disponibles:
  - `npm start`: Producción con Node
  - `npm run dev`: Desarrollo con --watch flag
  - `npm run nodemon`: Desarrollo con nodemon

### Estrategia de Versiones

**Mayormente Fixed Versions**:

- Uso de `^` (compatible con minor/patch): Mayoría de dependencias

- Permite actualizaciones automáticas de parches de seguridad

- Control explícito de versiones mayores

### DevDependencies

| Librería | Versión | Propósito |
|----------|---------|-----------|
| nodemon | v3.1.10 | Hot-reload para desarrollo |

---

## 🐳 Containerización

### Docker

**3 Dockerfiles detectados**:

1. **Dockerfile**: Producción
   - Base: `node:20-slim` (Linux AMD64)
   - Multi-stage: Base stage
   - Usuario: node (non-root)
   - Puerto: 8080
   - Comando: `node ./index.js`

2. **Dockerfile.dev**: Desarrollo

3. **Dockerfile11**: [REQUIERE VERIFICACIÓN]

**Docker Compose**: No detectado en el workspace actual.

---

## 📊 Arquitectura de Deployment

### Multi-instancia

**Soporte**: Configurado para múltiples instancias

- Identificador único por instancia: `hostname-pid-timestamp`

- Variable de entorno: `INSTANCE_NAME`

- Headers de respuesta:
  - `X-Instance-ID`: ID único de la instancia
  - `X-Instance-Name`: Nombre de la instancia

- Logging con identificador de instancia

### Load Balancing

**Listo para**: Balanceador de carga externo (Nginx, HAProxy, AWS ALB, etc.)

- Endpoint `/api/health` para health checks

- Endpoint `/api/instance` para info detallada de cada instancia

- Sticky sessions no requeridas (stateless con JWT)

---

## 🔄 Jobs Programados (Cron)

Implementados con `node-cron` v4.2.1:

| Job | Frecuencia | Propósito |
|-----|------------|-----------|
| Encolamiento | Cada 1 minuto | Transferencia automática de salas en cola |
| Notificación cola larga | Cada 2 minutos | Alertar sobre colas con espera prolongada |
| Cierre por inactividad | Cada 1 minuto | Cerrar salas donde el usuario está inactivo |
| Salir de cola | Cada 7 minutos | Procesar usuarios que abandonan la cola |
| Limpieza de archivos | [REQUIERE VERIFICACIÓN] | Eliminar archivos temporales |
| Reportes | [REQUIERE VERIFICACIÓN] | Generación de reportes programados |

---

## 📝 Deuda Técnica Identificada

### Alta Prioridad

1. **Testing**: Sin cobertura de tests automatizados

2. **Documentación API**: No existe Swagger/OpenAPI

3. **Rate Limiting**: No implementado (riesgo de abuso)

4. **TypeScript**: No planeada migración (mayor type safety)

### Media Prioridad

1. **Redis**: Configurado pero no en uso en producción

2. **Linting**: Sin ESLint/Prettier configurado

3. **Circuit Breaker**: No implementado en integraciones externas

4. **Migrations Tool**: Uso de SQL manual (considerar Flyway/Liquibase)

### Baja Prioridad

1. **Tablas Legacy**: `membership` y `ubicaciones_ada` no utilizadas

2. **Actualización Node.js**: Planeada pero no ejecutada

3. **Docker**: 3 Dockerfiles (consolidar si es posible)

---

## 📋 Versiones Resumidas

```yaml
runtime:
  node: "20"

framework:
  express: "4.21.2"

database:
  postgresql: "16.10.0"
  pg-driver: "8.5.1"

cache:
  redis-client: "4.6.0"
  redis-server: "No en uso"

realtime:
  socket.io: "4.5.2"
  redis-adapter: "8.2.1"

security:
  jsonwebtoken: "9.0.2"
  bcryptjs: "3.0.2"
  helmet: "6.2.0"
  express-validator: "6.15.0"

ibm-cloud:
  ibm-watson: "10.0.0"
  ibm-cos-sdk: "1.14.1"

utilities:
  axios: "1.11.0"
  multer: "2.0.2"
  node-cron: "4.2.1"
  web-push: "3.6.7"

devtools:
  nodemon: "3.1.10"
  pm2: "Configurado"
```

---

## 🔗 Referencias

- [Node.js Documentation](https://nodejs.org/docs/latest-v20.x/api/)

- [Express.js Guide](https://expressjs.com/)

- [Socket.IO Documentation](https://socket.io/docs/v4/)

- [PostgreSQL 16 Documentation](https://www.postgresql.org/docs/16/)

- [IBM Watson Documentation](https://cloud.ibm.com/docs/watson)

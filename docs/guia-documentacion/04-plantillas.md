# 📋 Plantillas de Documentos

## 🎯 Objetivo

Proporcionar plantillas reutilizables para cada tipo de documento, listas para copiar y personalizar.

---

## 📦 Plantilla: Introducción de Proyecto

```markdown
# 🔷 [Nombre del Proyecto]

## 🎯 Propósito

[Una breve descripción del proyecto en 2-3 párrafos. Explica QUÉ hace el sistema, PARA QUIÉN es, y POR QUÉ existe.]

---

## 📊 Información General

| Atributo | Valor |
|----------|-------|
| **Nombre del Proyecto** | [Nombre] |
| **Versión Actual** | [x.y.z] |
| **Estado** | ✅ En Producción / 🚧 En Desarrollo / 📝 Planificado |
| **Equipo Responsable** | [Nombre del equipo] |
| **Tech Lead** | [Nombre] |
| **Product Owner** | [Nombre] |
| **Repositorio** | [URL del repositorio] |
| **Ambiente de Producción** | [URL] |
| **Fecha de Inicio** | [YYYY-MM-DD] |
| **Última Actualización** | [YYYY-MM-DD] |

---

## 🎭 Stakeholders

### Usuarios Principales

| Tipo de Usuario | Cantidad Aprox | Descripción |
|-----------------|----------------|-------------|
| [Rol 1] | [#] | [Breve descripción] |
| [Rol 2] | [#] | [Breve descripción] |

### Equipo de Desarrollo

| Rol | Nombre | Responsabilidad |
|-----|--------|-----------------|
| Tech Lead | [Nombre] | [Responsabilidad] |
| Backend Dev | [Nombre] | [Responsabilidad] |
| Frontend Dev | [Nombre] | [Responsabilidad] |
| DevOps | [Nombre] | [Responsabilidad] |

---

## 🗺️ Navegación de la Documentación

Esta documentación está organizada por audiencia y nivel de detalle:

- 📊 **[Vista Ejecutiva](01-vista-ejecutiva.md)** - Para gerentes y stakeholders de negocio
- 🏗️ **[Arquitectura](02-arquitectura/)** - Diagramas C4 y decisiones arquitectónicas
- 👨‍💻 **[Documentación Técnica](03-tecnico/)** - APIs, modelo de datos, stack tecnológico
- 🔄 **[Procesos de Negocio](04-procesos-negocio/)** - Casos de uso y flujos funcionales
- 🚀 **[Infraestructura](05-infraestructura/)** - Deployment, CI/CD, monitoreo
- 📚 **[Apéndices](06-apendices/)** - Glosario, referencias, changelog

---

## 🚀 Quick Start

### Para Desarrolladores Nuevos

1. Lee la [Vista Ejecutiva](01-vista-ejecutiva.md) para entender el contexto
2. Revisa el [Diagrama de Contenedores](02-arquitectura/02-contenedores.md) para conocer la arquitectura
3. Consulta el [Stack Tecnológico](03-tecnico/01-stack-tecnologico.md) y [APIs](03-tecnico/03-apis.md)
4. Clona el repositorio y sigue el README para configuración local

### Para Arquitectos

1. Revisa todos los [diagramas C4](02-arquitectura/)
2. Lee las [Decisiones de Arquitectura (ADRs)](02-arquitectura/04-decisiones.md)
3. Consulta las [Integraciones](03-tecnico/04-integraciones.md)

### Para Product Owners

1. Lee la [Vista Ejecutiva](01-vista-ejecutiva.md)
2. Revisa [Casos de Uso](04-procesos-negocio/01-casos-uso.md)
3. Consulta [Flujos Funcionales](04-procesos-negocio/02-flujos-funcionales.md)

---

## 📞 Contacto

- **Slack**: #[nombre-del-canal]
- **Email del Equipo**: [email]
- **Documentación Técnica**: [Confluence/Notion/etc]
- **Board de Tareas**: [Jira/Linear/etc]

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: YYYY-MM-DD</small>
</div>
```

---

## 📊 Plantilla: Vista Ejecutiva

```markdown
# 📊 Vista Ejecutiva: [Nombre del Proyecto]

## 🎯 Resumen Ejecutivo

[3-4 párrafos explicando:
1. Qué problema de negocio resuelve este sistema
2. Cómo lo resuelve (alto nivel, sin tecnicismos)
3. Qué valor aporta a la organización
4. Métricas de éxito]

---

## 💼 Valor de Negocio

### Objetivos Estratégicos

- **Objetivo 1**: [Descripción]
- **Objetivo 2**: [Descripción]
- **Objetivo 3**: [Descripción]

### Métricas de Éxito (KPIs)

| Métrica | Objetivo | Actual | Estado |
|---------|----------|--------|--------|
| [Métrica 1] | [Valor objetivo] | [Valor actual] | ✅ / ⚠️ / ❌ |
| [Métrica 2] | [Valor objetivo] | [Valor actual] | ✅ / ⚠️ / ❌ |
| [Métrica 3] | [Valor objetivo] | [Valor actual] | ✅ / ⚠️ / ❌ |

---

## 💰 Retorno de Inversión (ROI)

| Concepto | Valor |
|----------|-------|
| **Inversión Total** | $[XXX,XXX] |
| **Ahorro Anual Estimado** | $[XXX,XXX] |
| **Ingresos Adicionales Anuales** | $[XXX,XXX] |
| **ROI Estimado** | [XX]% |
| **Tiempo de Recuperación** | [X] meses |

### Desglose de Beneficios

- **Ahorro en costos operativos**: $[XXX] por [concepto]
- **Aumento en productividad**: [XX]% en [área]
- **Reducción de errores**: [XX]% en [proceso]
- **Nuevos ingresos**: $[XXX] por [nuevo canal/servicio]

---

## 👥 Usuarios y Casos de Uso Principales

### Usuario Tipo 1: [Nombre del Rol]

**Perfil:** [Breve descripción del usuario]

**Casos de Uso:**
1. [Caso de uso 1]
2. [Caso de uso 2]
3. [Caso de uso 3]

**Beneficios:**
- [Beneficio 1]
- [Beneficio 2]

### Usuario Tipo 2: [Nombre del Rol]

[Repetir estructura]

---

## 📊 Vista General del Sistema

### Contexto del Sistema

[Diagrama C4 Nivel 1]

```mermaid
graph TB
    %% Tu diagrama de contexto aquí
```

**Descripción:** [Explicar el diagrama en lenguaje de negocio]

---

## ⚠️ Riesgos y Dependencias

### Riesgos Principales

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| [Riesgo 1] | Alta/Media/Baja | Alto/Medio/Bajo | [Estrategia de mitigación] |
| [Riesgo 2] | Alta/Media/Baja | Alto/Medio/Bajo | [Estrategia de mitigación] |

### Dependencias Críticas

- **[Sistema/Servicio 1]**: [Por qué es crítico y qué pasa si falla]
- **[Sistema/Servicio 2]**: [Por qué es crítico y qué pasa si falla]

---

## 📅 Roadmap

### Completado ✅

- [Hito 1] - [Fecha]
- [Hito 2] - [Fecha]

### En Progreso 🚧

- [Hito actual] - ETA: [Fecha]

### Planificado 📝

- [Q1 2026] [Feature/Mejora]
- [Q2 2026] [Feature/Mejora]

---

## 📈 Impacto Esperado

[Gráfico o tabla mostrando el impacto esperado en métricas clave antes/después]

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: YYYY-MM-DD</small>
</div>
```

---

## 🏗️ Plantilla: Decisiones de Arquitectura (ADR)

```markdown
# 🏗️ Decisiones de Arquitectura (ADRs)

## 📋 Índice de Decisiones

| ID | Título | Estado | Fecha |
|----|--------|--------|-------|
| ADR-001 | [Título] | Aceptada ✅ | YYYY-MM-DD |
| ADR-002 | [Título] | En Revisión 🔄 | YYYY-MM-DD |
| ADR-003 | [Título] | Superseded ⏭️ | YYYY-MM-DD |

---

## ADR-001: [Título de la Decisión]

**Estado:** Aceptada ✅ / En Revisión 🔄 / Rechazada ❌ / Superseded ⏭️

**Fecha:** YYYY-MM-DD

**Autores:** [Nombres]

**Revisores:** [Nombres]

---

### Contexto

[Describe la situación que llevó a tomar esta decisión. 
¿Qué problema estamos resolviendo? 
¿Qué restricciones técnicas o de negocio tenemos?]

---

### Decisión

[Qué decidimos hacer. Ser específico y claro.]

Hemos decidido [DECISIÓN ESPECÍFICA].

---

### Alternativas Consideradas

#### Alternativa 1: [Nombre]

**Descripción:** [Breve descripción]

**Pros:**
- ✅ [Pro 1]
- ✅ [Pro 2]

**Contras:**
- ❌ [Contra 1]
- ❌ [Contra 2]

**Razón de rechazo:** [Por qué no elegimos esta]

#### Alternativa 2: [Nombre]

[Repetir estructura]

---

### Consecuencias

#### Positivas ✅

- [Consecuencia positiva 1]
- [Consecuencia positiva 2]

#### Negativas ⚠️

- [Consecuencia negativa o trade-off 1]
- [Consecuencia negativa o trade-off 2]

#### Neutral ℹ️

- [Algo que cambia pero no es bueno ni malo]

---

### Validación

**Criterios de Éxito:**
- [ ] [Criterio 1]
- [ ] [Criterio 2]

**Métricas a Monitorear:**
- [Métrica 1]: Target [valor]
- [Métrica 2]: Target [valor]

---

### Referencias

- [Enlace a documentación relevante]
- [Enlace a spike/POC realizado]
- [Artículo o paper que influyó]

---
```

---

## 💻 Plantilla: Documentación de API

```markdown
# 🌐 API: [Nombre del Servicio]

## 📋 Información General

| Atributo | Valor |
|----------|-------|
| **Base URL (Prod)** | https://api.example.com/v1 |
| **Base URL (Staging)** | https://api-staging.example.com/v1 |
| **Versión Actual** | v1 |
| **Autenticación** | Bearer Token (JWT) |
| **Rate Limit** | 1000 req/hora por API key |
| **Formato** | JSON |

---

## 🔐 Autenticación

Todas las peticiones requieren un token JWT en el header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Obtener Token

**POST** `/auth/login`

```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response 200
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "refreshToken": "..."
}
```

---

## 📡 Endpoints

### [Recurso 1]

#### Listar Todos

**GET** `/api/[recurso]`

**Query Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `page` | number | No | Número de página (default: 1) |
| `limit` | number | No | Items por página (default: 20, max: 100) |
| `sort` | string | No | Campo para ordenar (ej: "name", "-createdAt") |
| `filter` | string | No | Filtro (ej: "status:active") |

**Respuesta 200:**

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Example",
      "status": "active",
      "createdAt": "2025-12-10T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

#### Obtener por ID

**GET** `/api/[recurso]/:id`

**Path Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | uuid | ID del recurso |

**Respuesta 200:**

```json
{
  "id": "uuid",
  "name": "Example",
  "status": "active",
  "createdAt": "2025-12-10T10:00:00Z",
  "updatedAt": "2025-12-10T11:00:00Z"
}
```

**Errores:**

- `404` - Recurso no encontrado

---

#### Crear

**POST** `/api/[recurso]`

**Request Body:**

```json
{
  "name": "New Item",
  "status": "active",
  "metadata": {
    "key": "value"
  }
}
```

**Validación:**

- `name`: String, requerido, 3-100 caracteres
- `status`: Enum ["active", "inactive"], requerido
- `metadata`: Object, opcional

**Respuesta 201:**

```json
{
  "id": "uuid",
  "name": "New Item",
  "status": "active",
  "createdAt": "2025-12-10T12:00:00Z"
}
```

**Errores:**

- `400` - Validación fallida
- `409` - Conflicto (ej: nombre duplicado)

---

#### Actualizar

**PUT** `/api/[recurso]/:id`

[Seguir estructura similar]

---

#### Eliminar

**DELETE** `/api/[recurso]/:id`

**Respuesta 204:** (Sin contenido)

**Errores:**

- `404` - Recurso no encontrado
- `409` - No se puede eliminar (ej: tiene dependencias)

---

## ⚠️ Códigos de Error

| Código | Significado | Acción |
|--------|-------------|--------|
| 400 | Bad Request | Verificar formato de datos |
| 401 | Unauthorized | Renovar token |
| 403 | Forbidden | Verificar permisos |
| 404 | Not Found | Verificar ID del recurso |
| 409 | Conflict | Resolver conflicto (ej: duplicado) |
| 422 | Validation Error | Corregir datos según mensaje |
| 429 | Rate Limit Exceeded | Esperar y reintentar |
| 500 | Internal Server Error | Contactar soporte |

---

## 📊 Ejemplos Completos

### Flujo de Creación de Orden

```bash
# 1. Login
curl -X POST https://api.example.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# 2. Crear orden
curl -X POST https://api.example.com/v1/orders \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"productId": "uuid", "quantity": 2}
    ],
    "shippingAddress": {...}
  }'

# 3. Verificar estado
curl -X GET https://api.example.com/v1/orders/<ORDER_ID> \
  -H "Authorization: Bearer <TOKEN>"
```

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: YYYY-MM-DD</small>
</div>
```

---

## 🚀 Cómo Usar Estas Plantillas

1. **Copia la plantilla** correspondiente
2. **Reemplaza** los placeholders `[...]` con información real
3. **Elimina** secciones que no apliquen
4. **Personaliza** según necesidades específicas
5. **Valida** con el checklist de formato

---

## 🚀 Siguiente Paso

Continúa con **[Prompts para Agentes IA](/guia-documentacion/05-prompts/)** para aprender cómo generar esta documentación automáticamente.

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: 2025-12-10</small>
</div>

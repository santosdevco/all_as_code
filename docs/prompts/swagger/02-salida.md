# CONTEXTO
Recibes:

1. **Análisis del código** (endpoints, models, auth)
2. **Respuestas del formulario YAML** (URLs, configuración)

# TAREA
Genera 2 archivos:

1. **openapi.json** (raíz del proyecto) - Especificación OpenAPI 3.0 completa
2. **ai_docs/08-api-reference.md** - Documentación complementaria en Markdown

# GUÍAS DE IMPLEMENTACIÓN

## Archivo 1: openapi.json

**Ubicación:** `/openapi.json` (raíz del proyecto)

**Formato:** JSON válido según OpenAPI 3.0.3

**Estructura:**

```json
{
  "openapi": "3.0.3",
  "info": {
    "title": "[nombre_api del formulario]",
    "version": "[version_api del formulario]",
    "description": "API RESTful completa"
  },
  "servers": [
    {
      "url": "[url_produccion + base_path]",
      "description": "🚀 Producción"
    }
    // INCLUIR SOLO servidores donde URL != "a definir"
    // Formato: URL_BASE + BASE_PATH concatenados
  ],
  "components": {
    "securitySchemes": {
      // Configurar según tipo_auth del formulario
    },
    "schemas": {
      // Generar desde models detectados en análisis
    },
    "parameters": {
      // Headers dinámicos desde headers_globales
    }
  },
  "paths": {
    // Generar desde endpoints detectados en análisis
  }
}
```

**Requisitos Críticos:**

- **Servers:** Solo incluir URLs válidas (excluir "a definir")
- **Paths:** Extraer de controllers/routes del análisis
- **Schemas:** Generar desde models/entities detectados
- **Security:** Configurar según tipo de auth detectado
- **Examples:** Incluir ejemplos realistas en requests/responses
- **Usar $ref** para evitar duplicación

## Archivo 2: ai_docs/08-api-reference.md

**Estructura:**

```markdown
# 📖 Referencia de API

## 🎯 Documentación Interactiva (Swagger UI)

!!! info "🚀 Selector de Servidor"
    El Swagger UI incluye un dropdown de servidores donde puedes elegir:
    
    [LISTAR SOLO SERVIDORES VÁLIDOS CON EMOJIS]
    
    También puedes escribir manualmente cualquier URL personalizada.

<swagger-ui src="../openapi.json"/>

!!! tip "💡 Cómo Usar el Swagger UI"
    1. Selecciona el servidor en el dropdown
    2. Haz clic en "Authorize" para configurar tu token
    3. Expande un endpoint y haz clic en "Try it out"
    4. Completa los parámetros requeridos
    5. Haz clic en "Execute" para probar la API en vivo

---

## Información General

- **Nombre:** [nombre_api]
- **Versión:** [version_api]
- **Formato:** JSON
- **Charset:** UTF-8

### Servidores Disponibles

| Ambiente | URL | Descripción |
|----------|-----|-------------|
[TABLA SOLO CON SERVIDORES VÁLIDOS]

## Autenticación

[EXPLICAR SEGÚN tipo_auth DEL FORMULARIO]

### Ejemplo de Autenticación

[GENERAR EJEMPLO CURL CON ENDPOINT DE LOGIN DETECTADO]

## Rate Limiting

[USAR rate_limiting DEL FORMULARIO O INDICAR "No configurado"]

## Versionado

[USAR estrategia_versionado DEL FORMULARIO O INFERIR DE base_path]

## Headers Globales

[TABLA CON headers_globales DEL FORMULARIO + Content-Type]

## Códigos de Estado HTTP

[TABLA ESTÁNDAR: 200, 201, 204, 400, 401, 403, 404, 409, 429, 500]

## Formato de Respuestas

[EJEMPLOS JSON DE SUCCESS Y ERROR]

## Paginación

[EXPLICAR SI SE DETECTÓ PAGINACIÓN EN ANÁLISIS]

## Ejemplos Completos

[GENERAR 2-3 EJEMPLOS CURL DE ENDPOINTS PRINCIPALES]

## Testing con Swagger UI

[INSTRUCCIONES CON URL DEL SERVIDOR]

## Importar en Postman

[INSTRUCCIONES PARA IMPORTAR openapi.json]

## Generar SDKs

[EJEMPLOS DE GENERACIÓN DE CLIENTES]

## Recursos Adicionales

- [Especificación OpenAPI 3.0](https://swagger.io/specification/)
- [Documentación técnica](./04-tecnico/03-apis.md)
```

# REGLAS DE IMPLEMENTACIÓN

**OpenAPI JSON:**

1. Analiza TODOS los endpoints del código (no solo ejemplos)
2. Genera schemas para TODAS las entidades detectadas
3. Concatena URL base + base_path en cada servidor
4. Excluye servidores con URL "a definir"
5. Usa emojis en descripciones de servidores
6. Headers dinámicos en components/parameters para reutilización
7. Formato JSON válido (NO YAML)
8. Incluye examples realistas en cada endpoint

**Markdown:**

1. Importa openapi.json con `<swagger-ui src="../openapi.json"/>`
2. Lista solo servidores válidos (excluye "a definir")
3. Genera ejemplos curl con URLs reales del formulario
4. Tabla de headers globales desde formulario
5. Explicación de autenticación según tipo detectado
6. Usa admonitions (!!!info, !!!tip) para destacar información

# PROCESO DE EJECUCIÓN

1. **Parsear respuestas del formulario**
2. **Combinar con análisis de código**
3. **Generar openapi.json completo** con todos los endpoints
4. **Validar JSON** (sintaxis correcta)
5. **Generar markdown** complementario
6. **Verificar importación** (`<swagger-ui>` apunta a ruta correcta)

## OUTPUT

Genera automáticamente los 2 archivos sin confirmación previa.

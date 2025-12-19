# 🔌 Integración de Swagger UI en MkDocs

## 🎯 Objetivo

Aprender a integrar documentación de API interactiva (Swagger UI) en MkDocs para que los equipos puedan:

- ✅ Ver documentación de APIs renderizada profesionalmente

- ✅ **Probar endpoints directamente desde la documentación**

- ✅ Ejecutar requests POST, PUT, DELETE sin Postman

- ✅ Configurar headers dinámicamente

- ✅ Mantener la documentación de API sincronizada con el código

---

## 📦 Prerequisitos

### 1. Instalar el Plugin

El plugin ya está configurado en `requirements.txt`:

```bash
pip install mkdocs-swagger-ui-tag
```

### 2. Verificar Configuración en mkdocs.yml

```yaml
plugins:
  - search:
      lang: es
  - mermaid2:
      version: 11.12.0
  - swagger-ui-tag:
      background: White           # Fondo del Swagger UI
      docExpansion: none          # Endpoints colapsados por defecto
      filter: ""                  # Sin filtro inicial
      syntaxHighlightTheme: monokai  # Tema de código
      tryItOutEnabled: true       # ✅ PERMITE EJECUTAR REQUESTS
```

**Opciones importantes:**

- `tryItOutEnabled: true` → **CRÍTICO** para permitir ejecutar requests

- `docExpansion: none` → Endpoints colapsados (más limpio)

- `docExpansion: list` → Mostrar solo tags

- `docExpansion: full` → Todo expandido

---

## 🚀 Cómo Usar

### Método 1: Archivo Local en el Proyecto

Si el archivo `openapi.yaml` está en la raíz del proyecto documentado:

```markdown
# API de E-commerce

Esta es nuestra API REST para la plataforma de e-commerce.

<swagger-ui src="https://raw.githubusercontent.com/tu-usuario/tu-repo/main/openapi.yaml"/>
```

### Método 2: Archivo en el Hub de Documentación

Si copias el `openapi.yaml` al hub de documentación:

**Estructura:**
```
docs/
  proyectos/
    ecommerce-api/
      openapi.yaml          ← Aquí
      00-analisis.md
      01-requerimientos.md
      ...
```

**En tu markdown:**
```markdown
# API Reference

<swagger-ui src="../openapi.yaml"/>
```

### Método 3: URL Remota

Si el proyecto expone su OpenAPI en producción:

```markdown
<swagger-ui src="https://api.example.com/openapi.yaml"/>
```

---

## 📝 Ejemplo Completo de Documento

Crea un archivo `docs/proyectos/mi-api/api-reference.md`:

```markdown
# 📖 Referencia de API - E-commerce

## Información General

- **URL Base (Producción)**: https://api.ecommerce.com/v1

- **URL Base (Staging)**: https://api-staging.ecommerce.com/v1

- **Versión**: 1.0.0

- **Autenticación**: Bearer Token (JWT)

## Autenticación Rápida

Para probar la API:

1. **Obtén un token** usando el endpoint `/auth/login`

2. **Haz clic en "Authorize"** en Swagger UI (botón verde arriba a la derecha)

3. **Ingresa**: `Bearer {tu-token-aqui}`

4. **Prueba cualquier endpoint** haciendo clic en "Try it out"

---

## 🔍 Explorador de API Interactivo

Usa la interfaz de abajo para explorar y probar todos los endpoints:

<swagger-ui src="../openapi.yaml"/>

---

## 💡 Guía de Uso de Swagger UI

### Ejecutar un Request GET

1. **Expande el endpoint** haciendo clic en él (ej: `GET /users`)

2. Haz clic en **"Try it out"**

3. **Configura parámetros** (query params, headers)

4. Haz clic en **"Execute"**

5. **Ve la respuesta** debajo

### Ejecutar un Request POST

1. **Expande el endpoint** (ej: `POST /users`)

2. Haz clic en **"Try it out"**

3. **Edita el JSON** del Request Body

4. **Configura headers** si es necesario

5. Haz clic en **"Execute"**

6. **Ve la respuesta** (201 Created, 400 Error, etc.)

### Configurar Headers Dinámicamente

Si tu API requiere headers personalizados:

1. **Expande el endpoint**

2. Busca la sección **"Parameters"**

3. Los headers configurables aparecen listados (ej: `X-Client-Version`)

4. **Ingresa el valor** deseado

5. Ejecuta la request

### Autorización con Bearer Token

1. Haz clic en **"Authorize"** (botón con candado verde)

2. En el modal que aparece, ingresa: `Bearer eyJhbG...`

3. Haz clic en **"Authorize"**

4. Haz clic en **"Close"**

5. Ahora todas las requests incluirán el header `Authorization`

---

## 📁 Estructura Recomendada

Para un proyecto documentado con API:

```
docs/
  proyectos/
    ecommerce-api/
      00-analisis-inicial.md
      01-requerimientos.md
      02-vista-ejecutiva.md
      03-arquitectura/
        01-contexto.md
        02-contenedores.md
        03-componentes.md
        04-decisiones.md
      04-tecnico/
        01-stack-tecnologico.md
        02-modelo-datos.md
        03-apis.md              ← Descripción general
        04-integraciones.md
      05-procesos-negocio/
      06-infraestructura/
      07-apendices/
      08-api-reference.md       ← 🆕 SWAGGER UI AQUÍ
      openapi.yaml              ← 🆕 Especificación OpenAPI
```

---

## 🔗 Integración con mkdocs.yml

Agrega la página de API Reference a tu navegación:

```yaml
nav:
  - Proyectos:
      - E-commerce API:
          - Inicio: proyectos/ecommerce-api/00-analisis-inicial.md
          - Requerimientos: proyectos/ecommerce-api/01-requerimientos.md
          - Vista Ejecutiva: proyectos/ecommerce-api/02-vista-ejecutiva.md
          - Arquitectura:
              - Contexto: proyectos/ecommerce-api/03-arquitectura/01-contexto.md
              - Contenedores: proyectos/ecommerce-api/03-arquitectura/02-contenedores.md
              - Componentes: proyectos/ecommerce-api/03-arquitectura/03-componentes.md
              - Decisiones: proyectos/ecommerce-api/03-arquitectura/04-decisiones.md
          - Técnico:
              - Stack: proyectos/ecommerce-api/04-tecnico/01-stack-tecnologico.md
              - Modelo de Datos: proyectos/ecommerce-api/04-tecnico/02-modelo-datos.md
              - APIs (General): proyectos/ecommerce-api/04-tecnico/03-apis.md
              - Integraciones: proyectos/ecommerce-api/04-tecnico/04-integraciones.md
          - 📖 API Reference (Swagger): proyectos/ecommerce-api/08-api-reference.md  # ← AQUÍ
```

---

## 🎨 Personalización de Swagger UI

### Cambiar Tema de Código

En `mkdocs.yml`:

```yaml
plugins:
  - swagger-ui-tag:
      syntaxHighlightTheme: monokai  # monokai, agate, nord, obsidian, tomorrow-night
```

### Cambiar Expansión por Defecto

```yaml
plugins:
  - swagger-ui-tag:
      docExpansion: list  # none, list, full
```

- `none`: Todo colapsado

- `list`: Tags expandidos, endpoints colapsados

- `full`: Todo expandido

### Deshabilitar "Try it out" (solo lectura)

```yaml
plugins:
  - swagger-ui-tag:
      tryItOutEnabled: false  # Deshabilita ejecución de requests
```

---

## 🔒 Consideraciones de Seguridad

### Ambientes de Testing

⚠️ **IMPORTANTE:** Swagger UI ejecuta requests REALES contra tu API.

**Mejores prácticas:**

1. **Apunta a ambiente de staging/testing** en la documentación pública
   ```yaml
   servers:
     - url: https://api-staging.example.com/v1
       description: Staging (usar para pruebas)
   ```

2. **No incluyas tokens reales** en los ejemplos de OpenAPI
   ```yaml
   components:
     examples:
       BearerToken:
         value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example-not-real"
   ```

3. **Documenta cómo obtener tokens de prueba**
   ```markdown
   ## Obtener Token de Prueba
   
   Para testing, usa estas credenciales:
   - Email: `test@example.com`
   - Password: `TestPassword123!`
   ```

### Autenticación en Producción

Si expones Swagger UI en producción:

- ✅ Usa HTTPS siempre

- ✅ Implementa rate limiting

- ✅ No muestres errores detallados

- ✅ Requiere autenticación para la documentación (básico o OAuth)

---

## 🚀 Workflow: Del Código a la Documentación

### Paso 1: Generar openapi.yaml

Ejecuta **Prompt 10** de la guía de prompts para generar `openapi.yaml` automáticamente desde el código.

### Paso 2: Copiar al Hub de Documentación

```bash
# Desde el proyecto
cp openapi.yaml ../hub-documentacion/docs/proyectos/mi-api/

# También copia la documentación markdown
cp ai_docs/08-api-reference.md ../hub-documentacion/docs/proyectos/mi-api/
```

### Paso 3: Actualizar mkdocs.yml

Agrega la página a la navegación (ver ejemplo arriba).

### Paso 4: Validar Localmente

```bash
cd hub-documentacion
mkdocs serve
```

Abre http://localhost:8000 y navega a la página de API Reference.

### Paso 5: Publicar

```bash
mkdocs build
# O tu proceso de CI/CD
```

---

## 🐛 Troubleshooting

### Error: "Swagger UI no se renderiza"

**Problema:** La página muestra el tag `<swagger-ui>` como texto plano.

**Solución:**

1. Verifica que instalaste el plugin: `pip install mkdocs-swagger-ui-tag`

2. Confirma que está en `mkdocs.yml` bajo `plugins:`

3. Reinicia `mkdocs serve`

### Error: "Failed to load API definition"

**Problema:** Swagger UI no puede cargar el archivo YAML.

**Solución:**

1. Verifica la ruta del archivo: `<swagger-ui src="../openapi.yaml"/>`

2. Asegúrate de que `openapi.yaml` esté en la ubicación correcta

3. Si usas URL remota, verifica CORS

### Error: "Try it out" no funciona

**Problema:** El botón "Execute" no hace nada.

**Solución:**

1. Verifica `tryItOutEnabled: true` en `mkdocs.yml`

2. Revisa la consola del navegador (F12)

3. Confirma que la URL del servidor sea accesible

### CORS Error al ejecutar requests

**Problema:** Error CORS al ejecutar requests desde Swagger UI.

**Solución:**

En tu API, configura CORS para permitir requests desde el dominio de la documentación:

```javascript
// Express.js ejemplo
app.use(cors({
  origin: [
    'http://localhost:8000',           // Desarrollo
    'https://docs.tuempresa.com'       // Producción
  ]
}));
```

---

## 📚 Recursos Adicionales

- [mkdocs-swagger-ui-tag - GitHub](https://github.com/blueswen/mkdocs-swagger-ui-tag)

- [OpenAPI Specification](https://swagger.io/specification/)

- [Swagger UI Configuration](https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/)

---

## ✅ Checklist de Implementación

- [ ] Plugin `mkdocs-swagger-ui-tag` instalado

- [ ] Configuración agregada a `mkdocs.yml`

- [ ] Archivo `openapi.yaml` generado (Prompt 10)

- [ ] Archivo `openapi.yaml` copiado al hub de docs

- [ ] Página markdown creada con tag `<swagger-ui>`

- [ ] Navegación actualizada en `mkdocs.yml`

- [ ] Probado localmente con `mkdocs serve`

- [ ] CORS configurado en la API (si aplica)

- [ ] Documentación publicada

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: 2025-12-11</small>
</div>

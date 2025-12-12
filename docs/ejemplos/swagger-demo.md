# 🎮 Demo: Swagger UI Interactivo

Esta es una demostración de cómo se ve y funciona Swagger UI integrado en MkDocs.

## 🎯 Qué Puedes Hacer Aquí

✅ **Explorar** todos los endpoints de la API
✅ **Probar** requests directamente (GET, POST, DELETE)
✅ **Configurar** headers dinámicamente
✅ **Autenticarte** con Bearer tokens
✅ **Ver** ejemplos de requests y responses

---

## 🔐 Prueba de Autenticación

### Paso 1: Obtén un Token

1. Expande el endpoint **`POST /auth/login`** (abajo)
2. Haz clic en **"Try it out"**
3. Usa estas credenciales de prueba:
   ```json
   {
     "email": "test@example.com",
     "password": "TestPassword123!"
   }
   ```
4. Haz clic en **"Execute"**
5. **Copia el token** de la respuesta

### Paso 2: Autoriza Requests

1. Haz clic en el botón **"Authorize"** (arriba a la derecha, con candado 🔓)
2. Pega el token copiado con el formato: `Bearer {tu-token}`
3. Haz clic en **"Authorize"** en el modal
4. Cierra el modal

### Paso 3: Prueba Endpoints Protegidos

Ahora puedes probar endpoints como `GET /users` o `POST /users` que requieren autenticación.

---

## 📝 Prueba de Requests POST

### Crear un Usuario

1. Expande **`POST /users`**
2. Haz clic en **"Try it out"**
3. **Edita el JSON** del request body:
   ```json
   {
     "email": "maria@example.com",
     "password": "MiPassword123!",
     "name": "María García"
   }
   ```
4. **Configura headers** opcionales (ej: `X-Client-Version: 1.2.0`)
5. Haz clic en **"Execute"**
6. **Ve la respuesta** (201 Created si es exitoso)

---

## 🔍 Explorador de API Interactivo

<swagger-ui src="../ejemplos/openapi-ejemplo.yaml"/>

---

## 💡 Tips de Uso

### Headers Dinámicos

Los headers configurables aparecen en la sección **"Parameters"** de cada endpoint:

- `X-Client-Version`: Versión de tu aplicación cliente
- `X-Request-ID`: ID único para rastrear la request en logs

### Filtros en Endpoints GET

Algunos endpoints como `GET /users` permiten filtros:

- `page=1`: Número de página
- `limit=20`: Cantidad de resultados
- `role=admin`: Filtrar por rol

**Ejemplo:** Prueba `GET /users?page=1&limit=5&role=admin`

### Ver el cURL Generado

Después de ejecutar una request:

1. Baja a la sección **"Responses"**
2. Haz clic en **"cURL"**
3. Copia el comando completo para usar en terminal

---

## 🎨 Este es un Ejemplo de Demostración

⚠️ **Nota:** Esta es una API de ejemplo con datos ficticios. En tu proyecto real:

1. Genera tu propio `openapi.yaml` con **Prompt 10**
2. Cópialo a `docs/proyectos/tu-api/openapi.yaml`
3. Crea una página similar a esta
4. Usa `<swagger-ui src="../openapi.yaml"/>`

---

<div style="text-align: center; margin-top: 50px;">
    <p><strong>🚀 ¿Listo para documentar tu propia API?</strong></p>
    <p>Consulta la <a href="../guia-documentacion/11-integracion-swagger/">Guía de Integración Swagger</a></p>
</div>

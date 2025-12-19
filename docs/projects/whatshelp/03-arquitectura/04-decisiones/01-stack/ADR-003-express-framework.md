# ADR-003: Express.js como Framework Web

**Estado:** ✅ Aceptada

**Fecha:** 2021-Q1 (Inicio del proyecto)

**Categoría:** Stack Tecnológico

**Autores:** Equipo IBM-I+D, TSS Colombia

---

## Contexto

### Situación

Con Node.js seleccionado como runtime (ADR-001), se necesitaba un framework web para:

- Crear API REST con rutas CRUD

- Manejar middleware (autenticación, validación, seguridad)

- Parsear request bodies (JSON, form-data, multipart)

- Servir archivos estáticos

- Integrar con Socket.IO para WebSockets

- Manejo de errores centralizado

### Restricciones

**Equipo:**

- Sin experiencia previa en frameworks Node.js específicos

- Necesidad de curva de aprendizaje mínima

- Preferencia por soluciones simples y directas

**Proyecto:**

- Timeline ajustado

- No se requería estructura opinionated compleja

- Flexibilidad para integrar librerías externas

**Técnicas:**

- Ecosistema de middleware amplio

- Documentación abundante

- Comunidad activa

---

## Decisión

**Se decidió:** Usar **Express.js v4.21+** como framework web principal.

### Implementación

**Versión utilizada:**
```json
// package.json
{
  "dependencies": {
    "express": "^4.21.2",
    "express-session": "^1.18.2",
    "express-validator": "^6.15.0"
  }
}
```

**Estructura de aplicación:**
```javascript
// app/app.js
const express = require("express");
const router = require("./routes/api");

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
    this.routers();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cookieParser());
    this.app.use(helmet()); // Seguridad
    // ... más middlewares
  }

  routers() {
    this.app.use("/api", router);
    this.app.use(errorHandler.errors);
  }
}
```

**Organización de rutas:**
```javascript
// app/routes/api.js
const { Router } = require("express");
const router = Router();

// Middlewares de validación
const { validJWT } = require("../middlewares/valid-jwt");
const { validAgent } = require("../middlewares/valid-agent");

// Controllers
const authController = require("../controllers/authController");
const roomController = require("../controllers/roomController");

// Rutas
router.post("/auth/login", authController.login);
router.get("/rooms", validJWT, roomController.getRooms);
// ... 50+ endpoints
```

---

## Alternativas Consideradas

### Alternativa 1: Fastify

**Descripción:** Framework web de alta performance

**Pros:**

- ✅ ~2x más rápido que Express en benchmarks

- ✅ Schema validation built-in (JSON Schema)

- ✅ TypeScript support nativo

- ✅ Async/await first

**Contras:**

- ❌ Ecosistema de plugins menor que Express

- ❌ Equipo sin experiencia

- ❌ Performance extra no crítica para este proyecto

- ❌ Algunos middleware Express incompatibles

**Razón de rechazo:** Performance no era cuello de botella, ecosistema Express más maduro, equipo sin experiencia

---

### Alternativa 2: NestJS

**Descripción:** Framework opinionated inspirado en Angular

**Pros:**

- ✅ Arquitectura enterprise-grade

- ✅ TypeScript nativo

- ✅ Dependency injection

- ✅ Decoradores y módulos estructurados

- ✅ OpenAPI/Swagger integrado

**Contras:**

- ❌ Curva de aprendizaje muy alta

- ❌ Overhead arquitectural para proyecto simple

- ❌ Equipo pequeño no justifica complejidad

- ❌ Desarrollo más lento inicialmente

**Razón de rechazo:** Complejidad innecesaria, curva de aprendizaje muy alta, timeline ajustado

---

### Alternativa 3: Koa

**Descripción:** Framework minimalista por creadores de Express

**Pros:**

- ✅ Más moderno que Express

- ✅ Async/await nativo

- ✅ Middleware más elegante (context)

- ✅ Sin callback hell

**Contras:**

- ❌ Ecosistema más pequeño

- ❌ Menos middleware disponibles

- ❌ Comunidad menor

- ❌ Documentación menos abundante

**Razón de rechazo:** Ecosistema Express mucho más grande, documentación superior, comunidad más activa

---

### Alternativa 4: Framework Personalizado

**Descripción:** Usar solo `http` module de Node.js

**Pros:**

- ✅ Control total

- ✅ Cero dependencias framework

- ✅ Máxima flexibilidad

**Contras:**

- ❌ Reinventar la rueda

- ❌ Desarrollo mucho más lento

- ❌ Más bugs potenciales

- ❌ Sin beneficio real

**Razón de rechazo:** No tiene sentido para un proyecto real con timeline

---

## Tabla Comparativa de Alternativas

| Criterio | Express (Elegido) | Fastify | NestJS | Koa |
|----------|------------------|---------|--------|-----|
| **Curva de aprendizaje** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Ecosistema middleware** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Documentación** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Comunidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Complejidad** | Baja | Baja | Alta | Baja |
| **Flexibilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Velocidad desarrollo** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |

---

## Consecuencias

### ✅ Positivas

1. **Ecosistema gigante:** Miles de middleware disponibles (helmet, cors, morgan, multer, etc.)

2. **Curva de aprendizaje mínima:** Equipo productivo desde día 1

3. **Documentación excelente:** Fácil encontrar ejemplos y soluciones

4. **Flexibilidad total:** No impone estructura, se adapta a nuestro patrón de capas

5. **Integración perfecta:** Socket.IO, Multer, JWT, todo funciona out-of-the-box

6. **Debugging simple:** Stack traces claros, herramientas maduras

7. **Community support:** Stack Overflow lleno de respuestas

8. **Estabilidad:** Express 4.x extremadamente estable (desde 2014)

### ⚠️ Negativas (Trade-offs)

1. **Performance no óptima:** ~20-30% más lento que Fastify (no crítico para nuestro caso)

2. **Callback-based:** Aunque se puede usar async/await, diseño original usa callbacks

3. **Sin TypeScript nativo:** Requiere tipos de @types/express

4. **Sin schema validation built-in:** Requiere express-validator

5. **Middleware bloat:** Fácil agregar muchos middleware innecesarios

### 🔄 Neutral

1. **Falta de opinión:** Beneficio y problema (libertad vs. guía)

2. **Modernidad:** No es el framework más moderno, pero es maduro

3. **Mantenimiento:** Express 5 en desarrollo desde años (no es problema)

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| **Middleware malicioso** | Baja | Alto | Auditoría de dependencias, usar solo paquetes confiables |
| **Middleware order bugs** | Media | Medio | Documentación clara, tests de integración |
| **Error handling inconsistente** | Media | Alto | Middleware centralizado de errores implementado |
| **Request timeout issues** | Baja | Medio | Timeouts configurados en reverse proxy/load balancer |
| **Express 5 breaking changes** | Baja | Bajo | Express 4 mantenido indefinidamente |

---

## Decisiones Relacionadas

- **Depende de [ADR-001](./ADR-001-nodejs-runtime.md):** Express requiere Node.js

- **Ver [ADR-006](../03-comunicacion/ADR-006-socketio.md):** Socket.IO integrado con Express server

- **Ver [ADR-014](../04-arquitectura/ADR-014-helmet-security.md):** Helmet middleware para seguridad

- **Ver [ADR-007](../03-comunicacion/ADR-007-jwt-auth.md):** JWT middleware en Express

---

## Middleware Stack Implementado

```javascript
// Orden de middleware (crítico)
app.use(cors());                           // 1. CORS
app.use(helmet());                         // 2. Security headers
app.use(express.static("public"));         // 3. Archivos estáticos
app.use(morgan("dev"));                    // 4. Logging
app.use(express.json());                   // 5. JSON parsing
app.use(express.urlencoded({ extended: true })); // 6. URL-encoded
app.use(cookieParser());                   // 7. Cookies
app.use(cookieSession({ ... }));           // 8. Sessions

// Rutas
app.use("/api", router);                   // 9. API routes

// Error handling (DEBE IR AL FINAL)
app.use(errorHandler.errors);              // 10. Error handler
```

---

## Referencias

- [Express.js Official Documentation](https://expressjs.com/)

- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

- [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)

- [Node.js Best Practices - Express](https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices)

---

## Métricas

**Middleware utilizados (selección):**

- `helmet` - Seguridad

- `cors` - CORS policy

- `morgan` - HTTP logging

- `multer` - File uploads

- `express-validator` - Validación de requests

- `cookie-parser` - Cookies

- `express-session` - Sessions

**Endpoints totales:** ~50+ rutas API

**Performance:**

- Overhead middleware: ~2-5ms por request

- Tiempo total request: Variable (10ms-500ms dependiendo de lógica)

---

## Notas Adicionales

### ¿Por qué NO migrar a Fastify/NestJS?

**Fastify:**

- ✅ Performance mejoraría ~30%

- ❌ Migración costosa (reescribir middleware, rutas)

- ❌ Beneficio marginal (DB y Watson son cuellos de botella, no Express)

- **Conclusión:** No justificado

**NestJS:**

- ✅ Mejor arquitectura para proyectos grandes

- ✅ TypeScript nativo

- ❌ Refactor completo necesario

- ❌ Curva de aprendizaje alta

- ❌ Proyecto funcional actualmente

- **Conclusión:** Para proyectos nuevos, no para migración

### Lecciones Aprendidas

✅ **Simplicidad ganó:** Express permitió desarrollo rápido sin complejidad innecesaria  
✅ **Ecosistema crítico:** Miles de middleware ahorraron semanas de desarrollo  
⚠️ **TypeScript hubiera ayudado:** Pero el costo de setup inicial no lo justificaba en ese momento

---

📅 **Última actualización:** 18 de diciembre de 2025

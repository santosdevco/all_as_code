# 📝 Especificación de Salida - Arquitectura de Software


## TAREA

En base al analiss y las respuestas de las preguntas Genera 4 archivos siguiendo el modelo C4:

1. `ai_docs/03-arquitectura/01-contexto.md` (C4 Nivel 1)
2. `ai_docs/03-arquitectura/02-contenedores.md` (C4 Nivel 2)
3. `ai_docs/03-arquitectura/03-componentes.md` (C4 Nivel 3)
4. `ai_docs/03-arquitectura/04-decisiones.md` (ADRs)

---

## GUÍAS DE ESTILO PARA DIAGRAMAS C4

### Nivel 1 - Contexto
- **Máximo 10 elementos** totales
- **1 caja central** para tu sistema
- **Usuarios externos** como actores
- **Sistemas externos** con borde punteado
- **Labels simples** describiendo relaciones

### Nivel 2 - Contenedores
- **Muestra aplicaciones**, servicios, DBs, caches
- **Incluye tecnología + versión** en cada contenedor
- **Usa subgraph** para agrupar relacionados
- **Protocolos de comunicación** en las flechas

### Nivel 3 - Componentes
- **Solo del componente más complejo** (1 servicio/módulo)
- **Muestra estructura interna**: Controllers, Services, Repositories
- **Flujo de datos** entre componentes
- **Responsabilidades** de cada componente

### Reglas Mermaid CRÍTICAS
- ✅ Labels con espacios → **SIEMPRE entre comillas dobles**
- ✅ Ejemplo correcto: `API["API Gateway<br/>Express 4.18"]`
- ❌ Ejemplo incorrecto: `API[API Gateway<br/>Express 4.18]`
- ✅ Línea en blanco **ANTES de cada lista**

### Paleta de Colores Consistente
```
Sistema principal: #1e88e5 (azul)
Externos: #999 + stroke-dasharray:5 (gris punteado)
Frontend: #42a5f5 (azul claro)
Backend: #66bb6a (verde)
Database: #ffa726 (naranja)
Cache: #ef5350 (rojo)
Auth: #ab47bc (morado)
Message Queue: #26a69a (teal)
```

---

## ESTRUCTURA DE ARCHIVOS

### ARCHIVO 1: `01-contexto.md`

```markdown
# 🌐 Arquitectura - Nivel 1: Contexto

## 🎯 Objetivo

Mostrar el sistema en su contexto: usuarios y sistemas externos.

---

## 📊 Diagrama de Contexto (C4 - Nivel 1)

[Genera diagrama Mermaid con:]
- Sistema principal (1 caja)
- Usuarios/Actores (2-4 personas)
- Sistemas externos (máximo 5-6)
- Relaciones con labels descriptivos

**Interpretación:**

[Explicación en 2-3 párrafos del diagrama]

---

## 👥 Actores del Sistema

[Para cada tipo de usuario detectado]

### [Tipo de Usuario]
**Rol:** [Descripción]
**Interacciones:** [Qué hace]

---

## 🔗 Sistemas Externos

[Para cada integración detectada]

### [Sistema Externo] - [Proveedor]
**Propósito:** [Para qué se integra]
**Protocolo:** [REST/GraphQL/gRPC/etc]
**Criticidad:** Alta/Media/Baja

---
```

### ARCHIVO 2: `02-contenedores.md`

```markdown
# 📦 Arquitectura - Nivel 2: Contenedores

## 🎯 Objetivo

Mostrar las aplicaciones y servicios que componen el sistema.

---

## 📊 Diagrama de Contenedores (C4 - Nivel 2)

[Genera diagrama Mermaid mostrando:]
- Frontend apps (si existen)
- Backend services
- Databases
- Caches
- Message queues
- Auth services
- **Tecnología + versión en cada contenedor**

---

## 🖥️ Contenedores Detectados

[Para cada contenedor del diagrama]

### [Nombre del Contenedor]

**Tecnología:** [Tech + Versión]
**Responsabilidad:** [Qué hace]
**Puerto:** [Si aplica]
**Escalabilidad:** [Stateless/Stateful]
**Datos almacenados:** [Si aplica]

---

## 🔄 Flujos de Comunicación

[Describe los flujos principales del sistema]

### Flujo 1: [Nombre del flujo]

1. Usuario → [Paso 1]
2. [Componente A] → [Componente B]: [Acción]
3. ...

---
```

### ARCHIVO 3: `03-componentes.md`

```markdown
# 🧩 Arquitectura - Nivel 3: Componentes

## 🎯 Objetivo

Detallar la estructura interna del componente más complejo: **[NOMBRE]**

---

## 📊 Diagrama de Componentes (C4 - Nivel 3)

[Genera diagrama Mermaid mostrando:]
- Componentes internos del servicio
- Relaciones entre componentes
- Flujo de datos
- Responsabilidades

---

## 🏗️ Patrón Arquitectónico

**Patrón detectado:** [MVC / Layered / Hexagonal / etc]

**Justificación:** [Del formulario o inferida]

---

## 📦 Componentes Principales

[Para cada componente del diagrama]

### [Nombre del Componente]

**Responsabilidad:** [Qué hace]
**Ubicación:** `[ruta del código]`
**Dependencias:** [Lista de otros componentes]
**Patrones aplicados:** [Si hay]

---

## 🔄 Flujos Internos Detallados

[Diagramas de secuencia para operaciones clave]

### Operación: [Nombre]

[Diagrama Mermaid sequenceDiagram]

---
```

### ARCHIVO 4: `04-decisiones.md`

```markdown
# 📐 Decisiones Arquitectónicas (ADRs)

## 🎯 Objetivo

Documentar decisiones arquitectónicas importantes y su contexto.

---

## 📋 Índice de Decisiones

| ID | Decisión | Estado | Fecha |
|----|----------|--------|-------|
| ADR-001 | [Título] | Aceptada | [Fecha] |
| ADR-002 | [Título] | Aceptada | [Fecha] |

---

[Para cada decisión arquitectónica importante]

## ADR-001: [Título de la Decisión]

### Estado
**Aceptada** | En revisión | Rechazada | Obsoleta

### Contexto

[Problema que se necesitaba resolver]
[Restricciones que se tenían]

### Decisión

[Qué se decidió hacer]
[Tecnología/Patrón elegido]

### Alternativas Consideradas

[Del formulario o inferidas]

1. **[Alternativa 1]**
   - Pros: [...]
   - Contras: [...]
   
2. **[Alternativa 2]**
   - Pros: [...]
   - Contras: [...]

### Consecuencias

**Positivas:**
- [Beneficio 1]
- [Beneficio 2]

**Negativas (Trade-offs aceptados):**
- [Trade-off 1]
- [Trade-off 2]

**Riesgos:**
- [Riesgo 1 y mitigación]

### Referencias

- [Documentación técnica]
- [Links útiles]

---
```

---

## REGLAS DE IMPLEMENTACIÓN

### 1. Diagramas
- Usa **Mermaid** para todos los diagramas
- Incluye **diagramas de secuencia** donde sea útil
- **Flowcharts** para flujos de negocio
- **C4 diagrams** para arquitectura

### 2. Contenido
- **Extrae del código** todo lo posible
- **Combina** con respuestas del formulario
- **No inventes** si no hay información → marca "A definir"
- **Incluye rutas de archivos** reales del proyecto

### 3. Decisiones Arquitectónicas
- **Mínimo 3 ADRs** documentados
- **Infiere decisiones** del código (ej: "Se eligió REST sobre GraphQL")
- **Usa respuestas** del formulario para justificaciones

### 4. Formato
- **Línea en blanco antes de listas** → SIEMPRE
- **Labels Mermaid con espacios** → Entre comillas dobles
- **Código de ejemplo** → Usa bloques de código apropiados
- **Tablas bien formadas** → Con headers y alineación

### 5. Creación de Archivos
- **Ruta**: `ai_docs/03-arquitectura/[nombre].md`
- **Crear carpeta** si no existe
- **4 archivos** exactamente
- **Guardar automáticamente**

---

## PROCESO DE EJECUCIÓN

1. **Leer** análisis + respuestas del formulario
2. **Generar los 4 archivos** con diagramas apropiados
3. **Verificar**:
   - Diagramas con labels correctos
   - Listas con línea en blanco anterior
   - Tecnologías + versiones correctas
   - ADRs completos y justificados
4. **Guardar** en rutas especificadas

---

## EJEMPLO DE DECISIÓN INFERIDA

**Si detectas:**
- `package.json`: `"express": "^4.18.2"`
- No hay GraphQL
- Estructura REST clara

**Genera ADR:**

```markdown
## ADR-001: Usar REST API en vez de GraphQL

### Contexto
Necesitábamos exponer endpoints para el frontend y clientes móviles.

### Decisión
Implementar API REST usando Express.js

### Alternativas Consideradas
1. **GraphQL**: Rechazado por complejidad innecesaria para casos de uso simples
2. **gRPC**: Rechazado por necesidad de compatibilidad web directa

### Consecuencias
**Positivas:** Simplicidad, ecosistema maduro, fácil debugging
**Trade-offs:** Menos flexibilidad que GraphQL para queries complejas
```

# 🔍 Prompt de Análisis - Procesos de Negocio

## ROL
Eres un **Business Analyst Senior** experto en análisis de procesos, casos de uso y flujos funcionales.

## CONTEXTO
Vas a analizar el proyecto actual (`@workspace`) para documentar **procesos de negocio, casos de uso y flujos funcionales** en lenguaje entendible por stakeholders.

## OBJETIVO
1. **Analizar** el workspace exhaustivamente
2. **Reportar** hallazgos en consola (NO generar archivos)
3. **Generar** YAML con preguntas necesarias

---

## FASE 1: ANÁLISIS EXHAUSTIVO

### 📋 **Casos de Uso**

**Archivos clave:**
- `routes/`, `controllers/`, `handlers/`
- `services/`, `use-cases/`
- Tests → Descripciones de comportamiento esperado
- `README.md`, `docs/` → Funcionalidades descritas

**Identificar top 5-10 casos de uso principales:**

Para cada caso de uso detectado:
- **Nombre**: Qué hace (ej: "Crear Pedido", "Procesar Pago")
- **Actores**: Quién lo ejecuta (usuario, admin, sistema externo)
- **Trigger**: Qué lo inicia (endpoint, evento, cron job)
- **Flujo principal**: Pasos del happy path
- **Flujos alternativos**: Qué pasa si algo falla o cambia
- **Precondiciones**: Estado requerido antes de ejecutar
- **Postcondiciones**: Estado resultante después
- **Reglas de negocio**: Validaciones, constraints

**Ejemplo de análisis:**
```javascript
// src/controllers/orders.js
router.post('/orders', auth, validate(orderSchema), async (req, res) => {
  // 1. Validar inventario
  // 2. Calcular total
  // 3. Procesar pago
  // 4. Crear orden
  // 5. Enviar confirmación
})

// Inferir caso de uso: "Crear Pedido"
// Actor: Usuario autenticado
// Trigger: POST /api/orders
// Flujo: validar → calcular → pagar → crear → notificar
```

---

### 🔄 **Flujos Funcionales**

**Analizar flujo completo de llamadas:**

Para los 3-5 flujos más complejos/importantes:
- **Controller** → Recibe request, valida
- **Service** → Lógica de negocio
- **Repository** → Acceso a datos
- **External APIs** → Integraciones
- **Events/Jobs** → Asíncronos

**Detectar:**
- **Validaciones** en cada paso
- **Llamadas a APIs externas** (Stripe, SendGrid, etc.)
- **Transacciones** de base de datos
- **Manejo de errores** (try/catch, rollbacks)
- **Eventos disparados** (webhooks, colas)
- **Casos edge** documentados en tests

---

### 🎯 **Reglas de Negocio**

**Buscar en:**
- Validaciones (Joi, Zod, class-validator)
- Lógica condicional en services
- Constraints de BD
- Comentarios explicando "por qué"
- Tests que validan reglas específicas

**Ejemplos:**
- "El descuento máximo es 20%"
- "Solo admins pueden eliminar usuarios"
- "Pedidos > $100 tienen envío gratis"
- "Un usuario solo puede tener 1 pedido activo"

---

## FASE 2: REPORTE EN CONSOLA

```
================================================================================
📊 ANÁLISIS DE PROCESOS DE NEGOCIO - [NOMBRE_PROYECTO]
================================================================================

📋 CASOS DE USO DETECTADOS
✅ ENCONTRADO: [N] casos de uso principales

CU-001: Crear Usuario
  - Actor: Visitante
  - Trigger: POST /api/users
  - Flujo: validar email → hash password → crear en BD → enviar email bienvenida
  - Reglas: email único, password min 8 caracteres

CU-002: Procesar Pedido
  - Actor: Usuario autenticado
  - Trigger: POST /api/orders
  - Flujo: validar inventario → calcular total → procesar pago → crear orden
  - Reglas: inventario suficiente, pago exitoso requerido
  
[... listar todos los detectados]

❓ PREGUNTAR:
   - ¿Qué casos de uso son más críticos para el negocio?
   - ¿Hay reglas de negocio complejas que requieran explicación adicional?

---

🔄 FLUJOS FUNCIONALES COMPLEJOS
✅ ENCONTRADO: [N] flujos que requieren diagramas de secuencia

Flujo 1: Proceso de Pago
  - Participantes: Usuario, API, Servicio Pago, Stripe, Base Datos, Email Service
  - Pasos: [N] detectados
  - Integraciones externas: Stripe
  
Flujo 2: Generación de Reporte
  - Participantes: [detectados]
  - Asíncrono: Sí (background job)
  
❓ PREGUNTAR:
   - ¿Qué flujos son más importantes para documentar en detalle?
   - ¿Hay escenarios de error específicos que deban destacarse?
```

---

## FASE 3: GENERAR YAML

```yaml
title: "🔄 Procesos de Negocio - [NOMBRE_PROYECTO]"
description: "Este yaml es solo para mostrarte el formato, crea las preguntas de acuerdo a lo que no puedes inferir del codigo"

sections:
  - icon: "📋"
    title: "Casos de Uso"
    questions:
      - id: casos_uso_prioritarios
        type: checkbox
        label: "¿Qué casos de uso son más críticos para el negocio?"
        options:
          - value: cu1
            label: "[CU-001]: Crear Usuario"
          - value: cu2
            label: "[CU-002]: Procesar Pedido"
          # [Generar opción por cada CU detectado]
        help: "Selecciona los top 5 más importantes"
        required: false
      
      - id: reglas_negocio_adicionales
        type: textarea
        label: "¿Hay reglas de negocio que no estén en el código pero deban documentarse?"
        placeholder: |
          - Descuentos solo aplican en horario 9-18h
          - Reembolsos requieren aprobación manual del gerente
        help: "Detectadas [N] reglas en el código"
        required: false
  
  - icon: "🔄"
    title: "Flujos Funcionales"
    questions:
      - id: flujos_prioritarios
        type: checkbox
        label: "¿Qué flujos requieren documentación detallada?"
        options:
          # [Generar opción por cada flujo complejo detectado]
          - value: flujo1
            label: "Proceso de Pago (integra con Stripe)"
          - value: flujo2
            label: "Generación de Reportes (asíncrono)"
        help: "Selecciona los 3 más importantes"
        required: false
      
      - id: escenarios_error
        type: textarea
        label: "¿Qué escenarios de error son más comunes o críticos?"
        placeholder: |
          - Pago rechazado por Stripe: se reversa la reserva de inventario
          - Email no se envía: se reintenta en background job
        required: false
  
  - icon: "🎯"
    title: "Contexto de Negocio"
    questions:
      - id: objetivos_procesos
        type: textarea
        label: "¿Cuál es el objetivo de negocio de cada proceso principal?"
        placeholder: |
          Proceso de Pago: Asegurar transacciones seguras y rápidas
          Generación de Reportes: Proveer insights para toma de decisiones
        required: false

# NO incluir template aquí
```

---

## REGLAS CRÍTICAS

1. **INFIERE del código** → Sigue el flujo real de llamadas
2. **Top 5-10 casos de uso** → Los más representativos
3. **Top 3-5 flujos** → Los más complejos o críticos
4. **Lenguaje de NEGOCIO** → No tecnicismos excesivos
5. **Adapta el YAML** → Opciones dinámicas basadas en lo detectado
6. **NO GENERES ARCHIVOS** → Solo reporte + YAML

---

## OUTPUT ESPERADO

1. **Reporte en consola** con casos de uso y flujos detectados
2. **YAML** con preguntas necesarias (máximo 8-10)
3. **NO generar archivos markdown**

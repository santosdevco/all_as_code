# Tipos de Diagramas: La Abstracción Correcta

## 🎨 El Arte de Elegir el Diagrama Correcto

### El Error Más Común
❌ Mostrarle **código** a un Gerente  
❌ Mostrarle **diagramas de contexto** a un Desarrollador  
❌ Usar **un solo tipo de diagrama** para todo

### La Regla de Oro
> **Cada audiencia necesita un nivel de abstracción diferente**

## 📊 Tipos de Diagramas y Sus Propósitos

| Tipo de Diagrama | Propósito | Audiencia | Caso de Uso |
|-----------------|-----------|-----------|-------------|
| **C4 Model** (Contexto/Contenedores) | Visión general del sistema | CEO, Gerentes, Stakeholders | "¿Qué hace el sistema y qué tecnologías usa?" |
| **Diagramas de Secuencia** | Flujo temporal de operaciones | Desarrolladores, Arquitectos | "¿Por qué esto es lento?" |
| **Diagramas de Flujo de Datos (DFD)** | Movimiento de información | Seguridad, Compliance, Auditores | "¿Dónde viajan datos sensibles?" |
| **Diagramas de Componentes** | Estructura interna del código | Desarrolladores | "¿Cómo está organizado internamente?" |
| **Diagramas de Despliegue** | Infraestructura física | DevOps, SRE | "¿Dónde se ejecuta cada cosa?" |
| **Grafos de Dependencias** | Relaciones entre módulos | Arquitectos | "¿Qué impacto tiene cambiar X?" |

---

## 🏗️ Modelo C4: "Zoom" en la Arquitectura

El **Modelo C4** (Context, Containers, Components, Code) permite hacer "zoom" progresivo.

### El Concepto
* **Nivel 1 (Contexto):** El "País" → ¿Quién usa el sistema y con qué interactúa?
* **Nivel 2 (Contenedores):** La "Ciudad" → ¿Qué aplicaciones/servicios y qué tecnología?
* **Nivel 3 (Componentes):** El "Edificio" → ¿Cómo está organizado el código internamente?
* **Nivel 4 (Código):** Los "Planos" → Clases, funciones (raramente se diagrama)

---

## 🔍 Ejemplo Práctico: Sistema de Pagos (Nivel C4)

### Nivel 1+2: Contexto y Contenedores
Este diagrama se genera **en tiempo real**. Si cambiamos la tecnología, cambiamos el texto.

=== "📊 Diagrama"

    ```mermaid
    graph TB
        %% Nivel 1: Personas
        User((Cliente))
        Admin((Administrador))

        %% Nivel 2: Sistemas (Contenedores)
        subgraph "Nube AWS (Nuestro Sistema)"
            SPA[Web App Single Page<br/>React]
            API[API Gateway<br/>Node.js]
            DB[(Base de Datos<br/>PostgreSQL)]
        end

        %% Sistemas Externos
        Bank[Pasarela de Pagos<br/>Stripe/PayPal]
        Email[Servicio de Correo<br/>SendGrid]

        %% Relaciones
        User -->|HTTPS| SPA
        Admin -->|HTTPS| SPA
        SPA -->|JSON/REST| API
        API -->|SQL| DB
        API -->|API Call| Bank
        API -->|SMTP| Email

        %% Estilos
        classDef system fill:#1f618d,stroke:#fff,color:#fff;
        classDef external fill:#999,stroke:#333,stroke-dasharray: 5 5;
        class SPA,API,DB system;
        class Bank,Email external;
    ```

=== "📋 Código Mermaid"

    Copia este código para usarlo en [Mermaid Live](https://mermaid.live):

    ```text
    graph TB
        %% Nivel 1: Personas
        User((Cliente))
        Admin((Administrador))

        %% Nivel 2: Sistemas (Contenedores)
        subgraph "Nube AWS (Nuestro Sistema)"
            SPA[Web App Single Page<br/>React]
            API[API Gateway<br/>Node.js]
            DB[(Base de Datos<br/>PostgreSQL)]
        end

        %% Sistemas Externos
        Bank[Pasarela de Pagos<br/>Stripe/PayPal]
        Email[Servicio de Correo<br/>SendGrid]

        %% Relaciones
        User -->|HTTPS| SPA
        Admin -->|HTTPS| SPA
        SPA -->|JSON/REST| API
        API -->|SQL| DB
        API -->|API Call| Bank
        API -->|SMTP| Email

        %% Estilos
        classDef system fill:#1f618d,stroke:#fff,color:#fff;
        classDef external fill:#999,stroke:#333,stroke-dasharray: 5 5;
        class SPA,API,DB system;
        class Bank,Email external;
    ```
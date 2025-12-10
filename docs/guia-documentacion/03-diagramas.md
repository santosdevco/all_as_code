# 📊 Catálogo de Diagramas Mermaid

## 🎯 Objetivo

Conocer todos los tipos de diagramas disponibles en Mermaid y **cuándo usar cada uno** según el contexto y la audiencia.

---

## 🧭 Guía Rápida de Selección

```mermaid
flowchart TD
    Start{¿Qué quieres<br/>mostrar?}
    
    Start -->|Sistemas y contexto| C4Context["Diagrama C4 Contexto"]
    Start -->|Aplicaciones y DBs| C4Container["Diagrama C4 Contenedores"]
    Start -->|Clases y módulos| C4Component["Diagrama C4 Componentes"]
    Start -->|Interacciones en tiempo| Sequence["Diagrama de Secuencia"]
    Start -->|Proceso con decisiones| Flowchart["Diagrama de Flujo"]
    Start -->|Ciclo de vida| State["Diagrama de Estados"]
    Start -->|Modelo de datos| ERD["Diagrama ER"]
    Start -->|Infraestructura| Deployment["Diagrama de Deployment"]
    
    style C4Context fill:#e91e63,color:#fff
    style C4Container fill:#9c27b0,color:#fff
    style C4Component fill:#3f51b5,color:#fff
    style Sequence fill:#2196f3,color:#fff
    style Flowchart fill:#4caf50,color:#fff
    style State fill:#ff9800,color:#fff
    style ERD fill:#f44336,color:#fff
    style Deployment fill:#607d8b,color:#fff
```

---

## 1️⃣ Diagrama C4 - Nivel 1: Contexto

### 📋 Cuándo Usar

- Vista macro del sistema

- Mostrar usuarios y sistemas externos

- Presentaciones ejecutivas

- Onboarding de nuevos miembros

### 👥 Audiencia
Ejecutivos, Product Owners, Stakeholders de negocio

### 🎨 Ejemplo

```mermaid
graph TB
    Cliente["👤 Cliente Final"]
    Admin["👤 Administrador"]
    Proveedor["👤 Proveedor"]
    
    subgraph "Nuestros Sistemas"
        Ecommerce["🏢 Plataforma E-commerce"]
    end
    
    PaymentGW["💳 Pasarela de Pago<br/>Stripe"]
    ShippingAPI["📦 API de Envíos<br/>FedEx"]
    EmailService["📧 Servicio Email<br/>SendGrid"]
    
    Cliente -->|Compra productos| Ecommerce
    Admin -->|Gestiona catálogo| Ecommerce
    Proveedor -->|Actualiza stock| Ecommerce
    
    Ecommerce -->|Procesa pagos| PaymentGW
    Ecommerce -->|Calcula envío| ShippingAPI
    Ecommerce -->|Envía notificaciones| EmailService
    
    style Ecommerce fill:#1e88e5,color:#fff,stroke:#fff,stroke-width:3px
    style PaymentGW fill:#999,stroke:#333,stroke-dasharray: 5
    style ShippingAPI fill:#999,stroke:#333,stroke-dasharray: 5
    style EmailService fill:#999,stroke:#333,stroke-dasharray: 5
```

### 💡 Mejores Prácticas

- Usar **una sola caja** para tu sistema

- Sistemas externos con **línea punteada**

- Máximo **5-7 elementos** para claridad

- Enfocarse en **qué hace el sistema**, no **cómo**

---

## 2️⃣ Diagrama C4 - Nivel 2: Contenedores

### 📋 Cuándo Usar

- Mostrar aplicaciones y bases de datos

- Explicar arquitectura de alto nivel

- Decisiones de stack tecnológico

- Discusiones de arquitectura

### 👥 Audiencia
Arquitectos, Tech Leads, Engineering Managers

### 🎨 Ejemplo

```mermaid
graph TB
    subgraph "Plataforma E-commerce"
        WebApp["Web Application<br/>React 18<br/>Port: 3000"]
        MobileApp["Mobile App<br/>React Native<br/>iOS + Android"]
        APIGateway["API Gateway<br/>Node.js + Express<br/>Port: 8080"]
        AuthService["Auth Service<br/>Node.js<br/>Port: 8081"]
        ProductService["Product Service<br/>Node.js<br/>Port: 8082"]
        OrderService["Order Service<br/>Node.js<br/>Port: 8083"]
        
        MainDB["(Main Database<br/>PostgreSQL 15)"]
        Cache["(Cache<br/>Redis 7)"]
        Queue["(Message Queue<br/>RabbitMQ)"]
    end
    
    Cliente["👤 Cliente"] -->|HTTPS| WebApp
    Cliente -->|HTTPS| MobileApp
    
    WebApp -->|JSON/REST| APIGateway
    MobileApp -->|JSON/REST| APIGateway
    
    APIGateway --> AuthService
    APIGateway --> ProductService
    APIGateway --> OrderService
    
    AuthService --> MainDB
    AuthService --> Cache
    
    ProductService --> MainDB
    ProductService --> Cache
    
    OrderService --> MainDB
    OrderService --> Queue
    
    Queue --> EmailWorker["Email Worker<br/>Node.js"]
    EmailWorker --> SendGrid["📧 SendGrid API"]
    
    style WebApp fill:#42a5f5,color:#fff
    style MobileApp fill:#42a5f5,color:#fff
    style APIGateway fill:#66bb6a,color:#fff
    style AuthService fill:#ab47bc,color:#fff
    style ProductService fill:#ff7043,color:#fff
    style OrderService fill:#ffa726,color:#fff
    style MainDB fill:#f44336,color:#fff
    style Cache fill:#ef5350,color:#fff
    style Queue fill:#ec407a,color:#fff
```

### 💡 Mejores Prácticas

- Incluir **tecnología y versión** en cada contenedor

- Diferenciar **frontend, backend, datos**

- Mostrar **puertos** cuando sea relevante

- Usar colores **consistentes por tipo**

---

## 3️⃣ Diagrama C4 - Nivel 3: Componentes

### 📋 Cuándo Usar

- Detallar estructura interna de un servicio

- Explicar patrones de diseño

- Onboarding de desarrolladores

- Code reviews arquitectónicos

### 👥 Audiencia
Desarrolladores, Arquitectos técnicos

### 🎨 Ejemplo

```mermaid
graph TB
    subgraph "Order Service - Componentes"
        Controller["Order Controller<br/>REST Endpoints"]
        Validator["Request Validator<br/>Joi schemas"]
        
        subgraph "Business Logic"
            OrderManager["Order Manager"]
            PricingEngine["Pricing Engine"]
            InventoryChecker["Inventory Checker"]
        end
        
        subgraph "External Clients"
            PaymentClient["Payment Client"]
            EmailClient["Email Client"]
            ShippingClient["Shipping Client"]
        end
        
        Repository["Order Repository<br/>Data Access Layer"]
        EventPublisher["Event Publisher<br/>Domain Events"]
    end
    
    APIGateway["API Gateway"] --> Controller
    
    Controller --> Validator
    Validator --> OrderManager
    
    OrderManager --> PricingEngine
    OrderManager --> InventoryChecker
    OrderManager --> PaymentClient
    OrderManager --> EmailClient
    OrderManager --> ShippingClient
    OrderManager --> Repository
    OrderManager --> EventPublisher
    
    Repository --> DB[(PostgreSQL)]
    EventPublisher --> Queue[(RabbitMQ)]
    
    PaymentClient --> Stripe["Stripe API"]
    
    style Controller fill:#42a5f5,color:#fff
    style Validator fill:#66bb6a,color:#fff
    style OrderManager fill:#ffa726,color:#fff
    style PricingEngine fill:#ab47bc,color:#fff
    style Repository fill:#ef5350,color:#fff
```

### 💡 Mejores Prácticas

- Mostrar **responsabilidades claras** de cada componente

- Agrupar por **capas** (Controller, Service, Repository)

- No mostrar **métodos individuales** (muy detallado)

- Enfocarse en **flujo de datos**

---

## 4️⃣ Diagrama de Secuencia

### 📋 Cuándo Usar

- Mostrar interacciones entre componentes **en el tiempo**

- Flujos de autenticación/autorización

- Procesos de negocio paso a paso

- Debugging de flujos complejos

### 👥 Audiencia
Desarrolladores, Analistas de negocio, QA

### 🎨 Ejemplo

```mermaid
sequenceDiagram
    actor Usuario
    participant Web as Web App
    participant API as API Gateway
    participant Auth as Auth Service
    participant Order as Order Service
    participant Payment as Payment Service
    participant DB as Database
    participant Queue as Message Queue
    
    Usuario->>Web: Click "Checkout"
    Web->>API: POST /api/orders<br/>{items, payment}
    
    API->>Auth: Validate JWT token
    Auth-->>API: Token valid ✅
    
    API->>Order: Create order
    
    Order->>DB: Check inventory
    DB-->>Order: Stock available
    
    Order->>Payment: Process payment
    Payment->>Payment: Call Stripe API
    Payment-->>Order: Payment successful 💳
    
    Order->>DB: Save order
    Order->>DB: Update inventory
    
    Order->>Queue: Publish OrderCreated event
    
    Order-->>API: 201 Created<br/>{orderId, status}
    API-->>Web: Order response
    Web-->>Usuario: Show confirmation ✅
    
    Note over Queue: Email worker<br/>picks up event
    Queue->>EmailWorker: OrderCreated
    EmailWorker->>EmailWorker: Send confirmation email
```

### 💡 Mejores Prácticas

- Usar **actores** para usuarios humanos

- Flechas **sólidas** para llamadas síncronas

- Flechas **punteadas** para respuestas

- Incluir **notas** para aclaraciones

- Mostrar **errores** con color diferente

---

## 5️⃣ Diagrama de Flujo

### 📋 Cuándo Usar

- Procesos con **decisiones condicionales**

- Algoritmos de negocio

- Flujos de aprobación

- Troubleshooting guides

### 👥 Audiencia
Analistas de negocio, Desarrolladores, QA

### 🎨 Ejemplo

```mermaid
flowchart TD
    Start(["Usuario solicita<br/>devolución"]) --> Check1{¿Dentro de<br/>30 días?}
    
    Check1 -->|No| Reject1["❌ Rechazar solicitud"]
    Check1 -->|Sí| Check2{¿Producto<br/>sellado?}
    
    Check2 -->|No| Check3{¿Producto<br/>defectuoso?}
    Check2 -->|Sí| Approve["✅ Aprobar devolución"]
    
    Check3 -->|No| Reject2["❌ Rechazar solicitud"]
    Check3 -->|Sí| Approve
    
    Approve --> Refund["Procesar reembolso"]
    Refund --> Notify["Notificar al cliente"]
    Notify --> End([Fin])
    
    Reject1 --> NotifyReject["Notificar rechazo"]
    Reject2 --> NotifyReject
    NotifyReject --> End
    
    style Start fill:#4caf50,color:#fff
    style End fill:#f44336,color:#fff
    style Approve fill:#66bb6a,color:#fff
    style Reject1 fill:#ef5350,color:#fff
    style Reject2 fill:#ef5350,color:#fff
    style Check1 fill:#ffa726,color:#fff
    style Check2 fill:#ffa726,color:#fff
    style Check3 fill:#ffa726,color:#fff
```

### 💡 Mejores Prácticas

- Usar **rombos** para decisiones

- **Inicio/Fin** con formas redondeadas

- Colores **verde para éxito**, **rojo para error**

- Mantener el flujo de **arriba hacia abajo** o **izquierda a derecha**

---

## 6️⃣ Diagrama de Estados

### 📋 Cuándo Usar

- Ciclo de vida de entidades

- Máquinas de estado

- Workflow de aprobaciones

- Estados de pedidos/tickets

### 👥 Audiencia
Desarrolladores, Analistas de negocio, Product Owners

### 🎨 Ejemplo

```mermaid
stateDiagram-v2
    [*] --> Carrito: Agregar producto
    
    Carrito --> Checkout: Iniciar checkout
    Carrito --> [*]: Abandonar
    
    Checkout --> ProcesandoPago: Confirmar
    Checkout --> Carrito: Cancelar
    
    ProcesandoPago --> PagoConfirmado: Pago exitoso
    ProcesandoPago --> PagoFallido: Pago rechazado
    
    PagoFallido --> Checkout: Reintentar
    PagoFallido --> [*]: Cancelar orden
    
    PagoConfirmado --> EnPreparacion: Asignar a almacén
    
    EnPreparacion --> Enviado: Despachar
    
    Enviado --> Entregado: Confirmar entrega
    Enviado --> EnDevolucion: Cliente rechaza
    
    Entregado --> [*]
    
    EnDevolucion --> Reembolsado: Procesar reembolso
    Reembolsado --> [*]
    
    note right of ProcesandoPago
        Timeout: 5 minutos
        Después cancela automáticamente
    end note
    
    note right of Enviado
        SLA: 3-5 días hábiles
    end note
```

### 💡 Mejores Prácticas

- Mostrar **todas las transiciones posibles**

- Incluir **condiciones** en las flechas

- Usar **notas** para SLAs y timeouts

- Indicar **estado inicial** con `[*]`

---

## 7️⃣ Diagrama Entidad-Relación (ERD)

### 📋 Cuándo Usar

- Diseño de base de datos

- Modelo de dominio

- Análisis de requisitos de datos

- Migraciones de esquema

### 👥 Audiencia
Desarrolladores, DBAs, Arquitectos de datos

### 🎨 Ejemplo

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        uuid id PK
        string email UK "Unique index"
        string password_hash
        string first_name
        string last_name
        string phone
        timestamp created_at
        timestamp updated_at
    }
    
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        uuid id PK
        uuid customer_id FK
        decimal total_amount
        string status "draft|pending|paid|shipped|delivered"
        jsonb shipping_address
        jsonb billing_address
        timestamp created_at
        timestamp paid_at
        timestamp shipped_at
    }
    
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT {
        uuid id PK
        string sku UK
        string name
        text description
        decimal price
        int stock_quantity
        boolean is_active
        uuid category_id FK
        timestamp created_at
    }
    
    ORDER_ITEM {
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price "Price at order time"
        decimal discount
    }
    
    CATEGORY ||--o{ PRODUCT : contains
    CATEGORY {
        uuid id PK
        string name UK
        string slug UK
        text description
        uuid parent_id FK "Self-reference"
    }
    
    CUSTOMER ||--o{ REVIEW : writes
    PRODUCT ||--o{ REVIEW : receives
    REVIEW {
        uuid id PK
        uuid customer_id FK
        uuid product_id FK
        int rating "1-5"
        text comment
        timestamp created_at
    }
```

### 💡 Mejores Prácticas

- Marcar **PK** (Primary Key) y **FK** (Foreign Key)

- Marcar **UK** (Unique Key)

- Indicar **tipo de datos** y **constraints**

- Usar cardinalidad: `||--o{` (uno a muchos), `||--||` (uno a uno)

- Incluir **índices importantes** como comentarios

---

## 8️⃣ Diagrama de Deployment/Infraestructura

### 📋 Cuándo Usar

- Arquitectura de infraestructura

- Planes de disaster recovery

- Explicar topología de red

- Documentación de DevOps

### 👥 Audiencia
DevOps, SRE, Arquitectos de infraestructura

### 🎨 Ejemplo

```mermaid
graph TB
    subgraph "Internet"
        Users["👥 Usuarios"]
    end
    
    subgraph "AWS Cloud"
        subgraph "Route 53"
            DNS[DNS]
        end
        
        subgraph "CloudFront CDN"
            CDN["CloudFront Distribution"]
        end
        
        subgraph "VPC 10.0.0.0/16"
            subgraph "Public Subnet 10.0.1.0/24"
                ALB["Application Load Balancer"]
                NAT["NAT Gateway"]
            end
            
            subgraph "Private Subnet - App<br/>10.0.10.0/24"
                ASG["Auto Scaling Group"]
                ECS1["ECS Task 1<br/>Web + API"]
                ECS2["ECS Task 2<br/>Web + API"]
                ECS3["ECS Task 3<br/>Web + API"]
            end
            
            subgraph "Private Subnet - Data<br/>10.0.20.0/24"
                RDSPrimary["(RDS Primary<br/>PostgreSQL)"]
                RDSReplica["(RDS Replica<br/>Read-only)"]
                ElastiCache["(ElastiCache<br/>Redis Cluster)"]
            end
        end
        
        S3Static["S3 Bucket<br/>Static Assets"]
        S3Backup["S3 Bucket<br/>DB Backups"]
        
        CloudWatch["CloudWatch<br/>Logs + Metrics"]
    end
    
    Users --> DNS
    DNS --> CDN
    CDN --> S3Static
    CDN --> ALB
    
    ALB --> ASG
    ASG --> ECS1
    ASG --> ECS2
    ASG --> ECS3
    
    ECS1 --> RDSPrimary
    ECS2 --> RDSPrimary
    ECS3 --> RDSReplica
    
    ECS1 --> ElastiCache
    ECS2 --> ElastiCache
    ECS3 --> ElastiCache
    
    RDSPrimary -.Replication.-> RDSReplica
    RDSPrimary -.Backup.-> S3Backup
    
    ECS1 --> NAT
    ECS2 --> NAT
    ECS3 --> NAT
    
    ECS1 -.Logs.-> CloudWatch
    ECS2 -.Logs.-> CloudWatch
    ECS3 -.Logs.-> CloudWatch
    
    style Users fill:#64b5f6,color:#fff
    style ALB fill:#ff9800,color:#fff
    style ECS1 fill:#66bb6a,color:#fff
    style ECS2 fill:#66bb6a,color:#fff
    style ECS3 fill:#66bb6a,color:#fff
    style RDSPrimary fill:#f44336,color:#fff
    style RDSReplica fill:#ef5350,color:#fff
    style ElastiCache fill:#ab47bc,color:#fff
```

### 💡 Mejores Prácticas

- Mostrar **CIDR blocks** de subnets

- Diferenciar **Public vs Private subnets**

- Indicar **replicación** con línea punteada

- Incluir **servicios de monitoreo**

- Marcar **alta disponibilidad** claramente

---

## 9️⃣ Diagrama de Gantt

### 📋 Cuándo Usar

- Planificación de proyectos

- Roadmaps de producto

- Timelines de migración

- Planes de implementación

### 👥 Audiencia
Project Managers, Product Owners, Stakeholders

### 🎨 Ejemplo

```mermaid
gantt
    title Roadmap de Implementación E-commerce Q1 2025
    dateFormat YYYY-MM-DD
    section Fase 1: MVP
    Diseño UI/UX           :done, des1, 2025-01-01, 2025-01-15
    Setup Backend          :done, dev1, 2025-01-10, 2025-01-25
    Integración Stripe     :done, dev2, 2025-01-20, 2025-02-05
    Testing MVP            :active, test1, 2025-02-01, 2025-02-15
    
    section Fase 2: Features
    Sistema de Reviews     :rev1, 2025-02-10, 2025-02-28
    Wishlist               :wish1, 2025-02-20, 2025-03-10
    Recomendaciones IA     :ai1, 2025-03-01, 2025-03-20
    
    section Fase 3: Optimización
    Performance Tuning     :perf1, 2025-03-15, 2025-03-30
    SEO Implementation     :seo1, 2025-03-20, 2025-04-05
    
    section Lanzamiento
    Beta Testing           :crit, beta, 2025-04-01, 2025-04-15
    Go Live                :milestone, live, 2025-04-15, 1d
```

### 💡 Mejores Prácticas

- Marcar hitos con `:milestone`

- Usar `:done`, `:active`, `:crit` para estado

- Agrupar en **secciones lógicas**

- Mostrar **dependencias** con fechas superpuestas

---

## 🔟 Diagrama de Pastel (Pie Chart)

### 📋 Cuándo Usar

- Distribución de recursos

- Composición de usuarios

- Breakdown de costos

- Análisis de métricas

### 👥 Audiencia
Ejecutivos, Product Owners, Analistas

### 🎨 Ejemplo

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'pie1':'#1e88e5', 'pie2':'#66bb6a', 'pie3':'#ffa726', 'pie4':'#ab47bc', 'pie5':'#ef5350'}}}%%
pie title Distribución de Tráfico por Fuente
    "Búsqueda Orgánica" : 42
    "Redes Sociales" : 28
    "Email Marketing" : 15
    "Tráfico Directo" : 10
    "Publicidad Pagada" : 5
```

### 💡 Mejores Prácticas

- Máximo **5-7 segmentos** para legibilidad

- Ordenar de **mayor a menor**

- Usar **colores distintos** para cada segmento

- Incluir **porcentajes** en el título

---

## ✅ Matriz de Selección Rápida

| Necesitas Mostrar | Diagrama Recomendado | Nivel C4 |
|-------------------|----------------------|----------|
| Sistema en contexto general | C4 Contexto | L1 |
| Aplicaciones y bases de datos | C4 Contenedores | L2 |
| Estructura interna de código | C4 Componentes | L3 |
| Llamadas entre servicios | Secuencia | - |
| Proceso con if/else | Flowchart | - |
| Estados de una entidad | State Diagram | - |
| Tablas y relaciones | ERD | - |
| Infraestructura cloud | Deployment | - |
| Timeline de proyecto | Gantt | - |
| Distribución porcentual | Pie Chart | - |

---

## 🚀 Siguiente Paso

Continúa con **[Plantillas Reutilizables](/guia-documentacion/04-plantillas/)** para obtener templates listos para usar en tu documentación.

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: 2025-12-10</small>
</div>

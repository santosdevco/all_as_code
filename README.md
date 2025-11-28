# Capacitación: Documentación y Diagramas as Code


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
    
## 🎯 Descripción

Material de capacitación sobre **MkDocs + Mermaid** para documentar arquitectura de software.

Esta presentación es una **demo en vivo** de las herramientas que se explican.

## 📚 Contenido

1. **Introducción** - Por qué "Documentation as Code"
2. **Tipos de Diagramas** - C4, Secuencia, DFD y cuándo usar cada uno
3. **Rendimiento** - Detectar cuellos de botella con diagramas de secuencia
4. **Seguridad** - Auditar flujos de datos sensibles con DFD
5. **Tutorial Práctico** - Cómo implementar MkDocs + Mermaid desde cero

## 🚀 Uso Rápido

### Ver la presentación localmente

```bash
# 1. Instalar dependencias (solo primera vez)
pip install -r requirements.txt

# 2. Levantar servidor de desarrollo
mkdocs serve

# 3. Abrir en el navegador
# http://127.0.0.1:8000
```

La documentación se actualiza automáticamente cuando guardas cambios.

### Generar sitio estático

```bash
mkdocs build
```

Esto genera la carpeta `site/` con HTML listo para desplegar.

### Desplegar a GitHub Pages

```bash
mkdocs gh-deploy
```

Sube automáticamente a `https://tu-usuario.github.io/tu-repo`

## 📂 Estructura del Proyecto

```
.
├── mkdocs.yml                    # Configuración de MkDocs
├── requirements.txt              # Dependencias Python
├── Dockerfile                    # Para ejecutar en contenedor
├── docker-compose.yml            # Orquestación
└── docs/
    ├── index.md                  # Página principal
    ├── 01_abstraccion.md         # Tipos de diagramas (C4)
    ├── 02_rendimiento.md         # Diagramas de secuencia
    ├── 03_seguridad.md           # Diagramas de flujo de datos
    ├── 04_conclusiones.md        # Resumen y próximos pasos
    └── 05_tutorial_mkdocs.md     # Tutorial paso a paso
```

## 🐳 Uso con Docker (Alternativa)

```bash
# Levantar con docker-compose
docker-compose up

# Acceder en http://localhost:8000
```

## 🎓 Para la Capacitación

### Orden de Presentación Sugerido (2 horas)

1. **Introducción** (10 min) - `index.md`
   - Problema actual con documentación tradicional
   - Ventajas de "as code"

2. **Demo en Vivo** (15 min)
   - Mostrar navegación del sitio
   - Editar un diagrama en vivo y ver cambio automático
   - Explicar estructura del proyecto

3. **Tipos de Diagramas** (20 min) - `01_abstraccion.md`
   - C4 Model para diferentes audiencias
   - Tabla de tipos de diagramas
   - Ejemplo práctico

4. **Caso: Rendimiento** (25 min) - `02_rendimiento.md`
   - Problema real: proceso bloqueante
   - Diagrama de secuencia del problema
   - Solución con patrón asíncrono
   - Comparación antes/después

5. **Caso: Seguridad** (25 min) - `03_seguridad.md`
   - Problema real: passwords en logs
   - DFD del problema
   - Solución con sanitización
   - Checklist de seguridad

6. **Tutorial Práctico** (20 min) - `05_tutorial_mkdocs.md`
   - Instalación paso a paso
   - Configuración de mkdocs.yml
   - Sintaxis de Mermaid
   - Comandos esenciales

7. **Ejercicio Hands-on** (15 min)
   - Que los asistentes creen su primer proyecto
   - `mkdocs new test && mkdocs serve`

8. **Q&A y Conclusiones** (10 min) - `04_conclusiones.md`

### Tips para el Presentador

1. **Abre el sitio antes de empezar** - `mkdocs serve`
2. **Ten un editor lado a lado** - VS Code + navegador
3. **Haz cambios en vivo** - Edita un diagrama y muestra la actualización automática
4. **Usa el buscador** - Demuestra la búsqueda integrada
5. **Muestra el modo oscuro** - Toggle en la esquina superior

## 🔧 Personalización

### Cambiar tema/colores

Edita `mkdocs.yml`:

```yaml
theme:
  palette:
    - scheme: default
      primary: blue  # Cambia el color
```

### Agregar nuevas secciones

1. Crea archivo en `docs/nueva_seccion.md`
2. Agrégalo a `nav:` en `mkdocs.yml`:

```yaml
nav:
  - Nueva Sección: nueva_seccion.md
```

### Agregar extensiones

```bash
pip install mkdocs-plugin-nombre
```

Luego agrégalo en `mkdocs.yml`:

```yaml
plugins:
  - nombre-del-plugin
```

## 📖 Recursos Adicionales

- **MkDocs:** https://www.mkdocs.org
- **Material Theme:** https://squidfunk.github.io/mkdocs-material/
- **Mermaid:** https://mermaid.js.org
- **Mermaid Live Editor:** https://mermaid.live

## 🤝 Contribuciones

Para mejorar esta capacitación:

1. Fork el proyecto
2. Crea una rama: `git checkout -b mejora/mi-mejora`
3. Haz commit: `git commit -m "Agregar ejemplo de X"`
4. Push: `git push origin mejora/mi-mejora`
5. Abre un Pull Request

## 📝 Notas

### Metodologías Relacionadas

El proceso de análisis descrito se alinea con:

- **ADR (Architecture Decision Records)** - Documentar decisiones
- **ATAM (Architecture Tradeoff Analysis Method)** - Análisis de trade-offs
- **SEI Architecture Assessment** - Evaluación sistemática

### Tecnologías Alternativas

- **PlantUML:** Más potente pero sintaxis más compleja
- **Diagrams.net (draw.io):** Visual pero no versionable como código
- **Structurizr:** Específico para C4 Model
- **Docusaurus:** Alternativa de Facebook (React-based)

## ❓ Troubleshooting

### Error: "Module not found: mermaid2"

```bash
pip install mkdocs-mermaid2-plugin
```

### Los diagramas no se renderizan

Verifica en `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:mermaid2.fence_mermaid
```

### Puerto 8000 ya en uso

```bash
mkdocs serve -a 127.0.0.1:8001
```

## 📧 Contacto

Para preguntas sobre esta capacitación: [tu-email@empresa.com]

---

**¡Buena suerte con la capacitación!** 🚀

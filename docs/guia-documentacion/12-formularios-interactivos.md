# 📋 Formularios Interactivos para Prompts

## 🎯 ¿Qué es el PromptBuilder?

**PromptBuilder** es una biblioteca JavaScript modular que permite crear formularios interactivos para generar prompts personalizados de IA. En lugar de llenar manualmente los campos de un prompt, el usuario responde preguntas específicas y el sistema genera el prompt completo automáticamente.

## ✨ Características

- ✅ **Configuración JSON** - Define preguntas y opciones en un archivo JSON
- ✅ **Tipos de preguntas** - Text, radio, select, checkbox, textarea
- ✅ **Validaciones** - Campos requeridos y opcionales
- ✅ **Campos condicionales** - Muestra campos "Otro" cuando es necesario
- ✅ **Templates personalizados** - Define cómo se genera el prompt final
- ✅ **Copia al portapapeles** - Un clic para copiar el prompt generado
- ✅ **Responsive** - Funciona en desktop y móvil
- ✅ **Dark mode** - Compatible con tema claro/oscuro de MkDocs

---

## 🚀 Uso Básico

### 1. En tu página Markdown

Simplemente agrega este HTML donde quieras el formulario:

```html
<div data-prompt="07"></div>
```

Donde `"07"` es el ID del prompt definido en `prompts-config.yaml`.

### 2. El sistema automáticamente:

1. ✅ Carga la configuración del prompt desde JSON
2. ✅ Renderiza el formulario con todas las preguntas
3. ✅ Valida las respuestas
4. ✅ Genera el prompt personalizado
5. ✅ Permite copiar al portapapeles

---

## 📝 Configuración de Prompts

Los prompts se configuran en: `/docs/data/prompts-config.yaml`

### ¿Por qué YAML en lugar de JSON?

**Templates largos son más legibles**. Compara:

**❌ JSON** (difícil de leer/editar):
```json
{
  "template": "# ROL\nEres un DevOps...\n\n# CONTEXTO\nDocumentar...\n\n# ARCHIVOS\n- Dockerfile\n- docker-compose.yml"
}
```

**✅ YAML** (fácil de leer/editar):
```yaml
template: |
  # ROL
  Eres un DevOps...
  
  # CONTEXTO
  Documentar...
  
  # ARCHIVOS
  - Dockerfile
  - docker-compose.yml
```

**Ventajas de YAML**:
- ✅ Saltos de línea naturales (no `\n`)
- ✅ Fácil de leer y mantener
- ✅ Soporta comentarios con `#`
- ✅ Sin escape de comillas

### Estructura del YAML

```yaml
"ID_PROMPT":
  title: "Título del formulario"
  description: "Descripción breve de qué genera este prompt"
  warning:
    title: "Título de la advertencia (opcional)"
    message: "Mensaje importante"
    items:
      - "Item 1"
      - "Item 2"
  sections:
    - icon: "📦"
      title: "Nombre de la sección"
      description: "Descripción opcional"
      questions: [...]
  
  # Template con saltos de línea naturales
  template: |
    # ROL
    Eres un experto...
    
    # CONTEXTO
    Variables: {{projectName}}
    
    # TAREA
    Generar documentación...
```

---

## 🔧 Tipos de Preguntas

### 1️⃣ Text Input (Texto simple)

```yaml
- id: projectName
  type: text
  label: "Nombre del Proyecto:"
  placeholder: "Ej: Mi Proyecto API"
  required: true
  help: "El nombre que aparecerá en la documentación"
```

**Genera:**
- Input de texto simple
- Placeholder opcional
- Validación de campo requerido
- Texto de ayuda debajo

---

### 2️⃣ Radio Buttons (Selección única)

```yaml
- id: hasDockerfile
  type: radio
  label: "¿El proyecto tiene Dockerfile?"
  options:
    - value: si
      label: "Sí"
    - value: no
      label: "No"
  default: si
  help: "Busca el archivo Dockerfile en la raíz"
```

**Genera:**
- Grupo de radio buttons
- Opción por defecto seleccionada
- Texto de ayuda

**Variables generadas:**
- `{{hasDockerfile}}` → `"si"` o `"no"`

---

### 3️⃣ Select Dropdown (Lista desplegable)

```yaml
- id: deployPlatform
  type: select
  label: "¿Dónde se despliega en PRODUCCIÓN?"
  options:
    - value: kubernetes
      label: "Kubernetes"
    - value: ecs
      label: "AWS ECS/Fargate"
    - value: heroku
      label: "Heroku"
    - value: otro
      label: "Otro"
  default: kubernetes
  showOther: true
  otherPlaceholder: "Especifica la plataforma..."
  help: "Pregunta al DevOps si no estás seguro"
```

**Genera:**
- Dropdown con todas las opciones
- Si `showOther: true` → muestra campo de texto cuando se selecciona "otro"
- Campo "otro" se oculta/muestra automáticamente

**Variables generadas:**
- `{{deployPlatform}}` → Valor seleccionado
- `{{deployPlatform_other}}` → Texto ingresado en "otro" (si aplica)

---

### 4️⃣ Checkboxes (Selección múltiple)

```yaml
- id: environments
  type: checkbox
  label: "¿Qué ambientes existen?"
  options:
    - value: local
      label: "Local"
      checked: true
    - value: dev
      label: "Development"
    - value: qa
      label: "QA/Testing"
    - value: prod
      label: "Producción"
      checked: true
  showOther: true
  otherPlaceholder: "Otros ambientes..."
```

**Genera:**
- Lista de checkboxes
- Opciones pre-seleccionadas con `checked: true`
- Campo "otro" opcional

**Variables generadas:**
- `{{environments}}` → Array de valores: `["local", "prod"]`
- `{{environments_other}}` → Texto ingresado (si aplica)

---

### 5️⃣ Textarea (Texto multilínea)

```yaml
- id: additionalNotes
  type: textarea
  label: "Notas adicionales:"
  placeholder: "Escribe observaciones importantes..."
  rows: 4
  help: "Información extra que Copilot debe considerar"
```

**Genera:**
- Área de texto multilínea
- Tamaño configurable con `rows`
- Redimensionable verticalmente

---

## 🎨 Template del Prompt

El `template` define cómo se genera el prompt final usando las variables del formulario.

**YAML permite escribir templates largos de forma natural:**

```yaml
template: |
  # ROL
  Eres un DevOps Engineer.
  
  # CONTEXTO
  Proyecto: {{projectName}}
  
  # INFORMACIÓN
  
  ## Docker
  - Tiene Dockerfile: {{hasDockerfile}}
  - Plataforma: {{deployPlatform}}
  
  ## Ambientes
  {{environments}}
  
  # TAREA
  Genera documentación de infraestructura...
```

### Variables disponibles:

- `{{nombreVariable}}` → Se reemplaza con el valor del campo
- Para arrays (checkboxes): `{{environments}}` → `"local, prod"`
- Para "otro": `{{campo_other}}` → Texto ingresado

---

## 📚 Ejemplo Completo: Prompt para Stack Tecnológico

```yaml
"04-stack":
  title: "Cuestionario de Stack Tecnológico"
  description: "Define las tecnologías del proyecto para generar documentación del stack"
  sections:
    -
        "icon": "💻",
        "title": "Backend",
        "questions": [
          {
            "id": "backendLang",
            "type": "select",
            "label": "Lenguaje principal del backend:",
            "options": [
              {"value": "nodejs", "label": "Node.js"},
              {"value": "python", "label": "Python"},
              {"value": "java", "label": "Java"},
              {"value": "csharp", "label": "C#/.NET"},
              {"value": "go", "label": "Go"},
              {"value": "otro", "label": "Otro"}
            ],
            "showOther": true,
            "required": true
          },
          {
            "id": "framework",
            "type": "text",
            "label": "Framework principal:",
            "placeholder": "Ej: Express, FastAPI, Spring Boot",
            "required": true
          }
        ]
      },
      {
        "icon": "🗄️",
        "title": "Base de Datos",
        "questions": [
          {
            "id": "databases",
            "type": "checkbox",
            "label": "Bases de datos utilizadas:",
            "options": [
              {"value": "postgresql", "label": "PostgreSQL"},
              {"value": "mysql", "label": "MySQL"},
              {"value": "mongodb", "label": "MongoDB"},
              {"value": "redis", "label": "Redis"},
              {"value": "otro", "label": "Otro"}
            ],
            "showOther": true
          }
        ]
      }
    ],
    "template": "# ROL\nEres un Technical Writer documentando el stack tecnológico.\n\n# CONTEXTO\nProyecto con las siguientes tecnologías:\n\n## Backend\n- Lenguaje: {{backendLang}}\n- Framework: {{framework}}\n\n## Bases de Datos\n{{databases}}\n\n# TAREA\nGenera ai_docs/04-tecnico/01-stack-tecnologico.md con:\n- Descripción de cada tecnología\n- Versiones utilizadas\n- Justificación de elección\n- Diagramas de dependencias\n\n# OUTPUT\nArchivo markdown completo."
  }
}
```

### Uso en markdown:

```html
<div data-prompt="04-stack"></div>
```

---

## 🎯 Mejores Prácticas

### 1. IDs Descriptivos
```json
✅ BIEN: "deployPlatform", "hasBackups", "cicdTool"
❌ MAL: "q1", "field2", "input3"
```

### 2. Ayuda Contextual
Siempre incluye `help` para preguntas técnicas:
```json
{
  "help": "⚠️ Pregunta al DevOps si no estás seguro"
}
```

### 3. Valores por Defecto
Define `default` para la opción más común:
```json
{
  "default": "si"  // La mayoría de proyectos tienen Dockerfile
}
```

### 4. Opciones "No sé"
Para preguntas técnicas, incluye:
```json
{
  "options": [
    {"value": "si", "label": "Sí"},
    {"value": "no", "label": "No"},
    {"value": "nolose", "label": "No sé / A investigar"}
  ]
}
```

### 5. Secciones Lógicas
Agrupa preguntas relacionadas:
```json
{
  "sections": [
    {"title": "Backend", "questions": [...]},
    {"title": "Frontend", "questions": [...]},
    {"title": "Infraestructura", "questions": [...]}
  ]
}
```

---

## 🔧 Personalización Avanzada

### CSS Personalizado

Agrega estilos en `/docs/stylesheets/extra.css`:

```css
/* Cambiar color del botón generar */
.pb-generate-btn {
  background: #ff5722 !important;
}

/* Estilo de secciones */
.pb-section {
  border-left-color: #9c27b0 !important;
}
```

### Transformaciones Complejas

Si necesitas lógica más compleja para generar el prompt, puedes extender la clase `PromptBuilder` o usar funciones en el template (próximamente).

---

## 📋 Checklist para Crear un Nuevo Prompt

- [ ] Definir ID único del prompt
- [ ] Escribir título y descripción claros
- [ ] Identificar secciones lógicas
- [ ] Listar todas las preguntas necesarias
- [ ] Elegir el tipo de input adecuado para cada pregunta
- [ ] Agregar textos de ayuda (`help`) donde sea necesario
- [ ] Definir valores por defecto razonables
- [ ] Incluir opciones "Otro" donde aplique
- [ ] Escribir el template del prompt
- [ ] Probar con datos reales
- [ ] Documentar el prompt en esta guía

---

## 🐛 Troubleshooting

### El formulario no se muestra

1. Verifica que el ID en `data-prompt="XX"` existe en `prompts-config.yaml`
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que `prompt-builder.js` se está cargando correctamente

### Las variables no se reemplazan

- Asegúrate de usar `{{nombreVariable}}` con llaves dobles
- El `id` del campo debe coincidir con el nombre de la variable
- Los arrays (checkboxes) se convierten automáticamente a string separado por comas

### El campo "Otro" no aparece

- Verifica que `showOther: true` esté en la pregunta
- El valor de la opción debe ser exactamente `"otro"` (minúsculas)

---

## 📚 Prompts Disponibles

| ID | Nombre | Descripción |
|----|--------|-------------|
| `07` | Deployment e Infraestructura | Documenta deployment, CI/CD, monitoreo |
| `04-stack` | Stack Tecnológico | Documenta tecnologías, frameworks, bases de datos |
| *(Agregar más aquí)* | | |

---

## 🚀 Próximas Mejoras

- [ ] Validaciones personalizadas (ej: formato de email, URL)
- [ ] Campos dependientes (mostrar pregunta B solo si respuesta A es X)
- [ ] Exportar/importar respuestas (JSON)
- [ ] Guardar respuestas en localStorage
- [ ] Preview del prompt en tiempo real
- [ ] Soporte para i18n (internacionalización)

---

## 💡 Contribuir

¿Tienes ideas para mejorar el PromptBuilder? ¡Crea un issue o PR!

**Contacto:** [Tu correo o canal de comunicación]

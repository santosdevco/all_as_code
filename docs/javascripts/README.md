# 🚀 PromptBuilder - Sistema Modular de Formularios Interactivos

## 📦 Componentes del Sistema

```
docs/
├── javascripts/
│   ├── prompt-builder.js      # ✅ Biblioteca principal (clase PromptBuilder)
│   └── prompt-builder.css     # ✅ Estilos del formulario
├── ai_prompts/
│   ├── 00-analyzer.yaml       # ✅ Prompt de análisis inicial
│   ├── 07.yaml                # ✅ Configuración estática de deployment
│   └── 07-generated.yaml      # ✅ (Generado por usuario) YAML personalizado
└── guia-documentacion/
    ├── 05-prompts.md          # ✅ Usa el formulario con <div data-prompt="07"></div>
    ├── 12-formularios-interactivos.md  # ✅ Documentación del sistema
    └── test_aiprompt.md       # ✅ Sistema de 2 fases
```

## ✨ ¿Qué Hace?

### Opción 1: Cargar desde archivo YAML

```html
<div data-prompt="07"></div>
```

O con botón on-demand:

```html
<button onclick="loadPromptForm('07')">Cargar Formulario</button>
<div id="prompt-07-container"></div>
```

### Opción 2: Cargar desde YAML pegado (NUEVO ⭐)

```html
<textarea id="yaml-input" placeholder="Pega el YAML aquí..."></textarea>
<button onclick="loadPromptFromYAML('yaml-input', 'output-container', 'my-form')">
    Cargar Formulario
</button>
<div id="output-container"></div>
```

## 🎯 Ventajas vs. Código Inline

### ❌ Antes (HTML inline):
```markdown
<!-- 700+ líneas de HTML/CSS/JS en cada página -->
<div id="form">
  <style>
    .form-section { ... }
    .form-group { ... }
    /* 200 líneas de CSS */
  </style>
  
  <div class="form-section">
    <!-- 300 líneas de HTML -->
  </div>
  
  <script>
    function generatePrompt() {
      // 200 líneas de JavaScript
    }
  </script>
</div>
```

**Problemas:**

- ❌ Código duplicado en cada prompt

- ❌ Difícil de mantener

- ❌ Cambios requieren editar múltiples archivos

- ❌ No reutilizable

### ✅ Ahora (Sistema Modular):

**En el markdown:**
```html
<div data-prompt="07"></div>
```

**Configuración (JSON):**
```json
{
  "07": {
    "title": "Cuestionario de Deployment",
    "sections": [...],
    "template": "..."
  }
}
```

**Ventajas:**

- ✅ 1 línea de código en cada página

- ✅ Configuración centralizada en JSON

- ✅ Fácil de crear nuevos formularios

- ✅ Mantenimiento simple

- ✅ Reutilizable en todos los prompts

## 📚 Crear un Nuevo Formulario

### 1. Edita `/docs/data/prompts-config.json`

```json
{
  "04-stack": {
    "title": "Cuestionario de Stack Tecnológico",
    "description": "Define las tecnologías del proyecto",
    "sections": [
      {
        "icon": "💻",
        "title": "Backend",
        "questions": [
          {
            "id": "backendLang",
            "type": "select",
            "label": "Lenguaje principal:",
            "options": [
              {"value": "nodejs", "label": "Node.js"},
              {"value": "python", "label": "Python"},
              {"value": "java", "label": "Java"}
            ],
            "required": true
          },
          {
            "id": "framework",
            "type": "text",
            "label": "Framework:",
            "placeholder": "Ej: Express, FastAPI",
            "required": true
          }
        ]
      }
    ],
    "template": "# ROL\n...\n\n## Stack\n- Lenguaje: {{backendLang}}\n- Framework: {{framework}}"
  }
}
```

### 2. Usa en cualquier markdown

```html
<div data-prompt="04-stack"></div>
```

¡Eso es todo! El sistema automáticamente:

- Carga la configuración

- Renderiza el formulario

- Genera el prompt con las variables reemplazadas

## 🔧 Tipos de Preguntas Soportados

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| `text` | Input simple | Nombre del proyecto |
| `textarea` | Texto multilínea | Descripción larga |
| `radio` | Selección única | Sí / No / No sé |
| `select` | Dropdown | Plataforma de deploy |
| `checkbox` | Selección múltiple | Herramientas de monitoreo |

**Opciones especiales:**

- `showOther: true` - Agrega campo "Otro" para texto libre

- `required: true` - Campo obligatorio

- `help: "..."` - Texto de ayuda debajo del campo

- `default: "value"` - Valor por defecto

## 🎨 Personalización

### CSS Personalizado

En `/docs/stylesheets/extra.css`:

```css
/* Cambiar color del botón */
.pb-generate-btn {
  background: #ff5722 !important;
}

/* Estilo de secciones */
.pb-section {
  border-left-color: #9c27b0 !important;
}
```

## 🆕 API de Funciones

### `loadPromptForm(promptId)`

Carga un formulario desde archivo YAML.

```javascript
// Carga docs/ai_prompts/07.yaml
loadPromptForm('07');
```

**Parámetros:**

- `promptId` (string): ID del prompt (nombre del archivo sin .yaml)

**Uso en HTML:**
```html
<button onclick="loadPromptForm('07')">Cargar</button>
<div id="prompt-07-container"></div>
```

---

### `loadPromptFromYAML(textareaId, containerId, instanceId)`

Carga un formulario desde YAML pegado en un textarea.

```javascript
loadPromptFromYAML('yaml-input', 'output-div', 'my-unique-id');
```

**Parámetros:**

- `textareaId` (string): ID del textarea con el YAML

- `containerId` (string): ID del div donde renderizar el formulario

- `instanceId` (string): ID único para esta instancia del formulario

**Uso en HTML:**
```html
<textarea id="yaml-input"></textarea>
<button onclick="loadPromptFromYAML('yaml-input', 'output-div', 'form-1')">
    Cargar
</button>
<div id="output-div"></div>
```

**Validaciones:**

- ✅ Verifica que el YAML sea válido antes de cargar

- ✅ Muestra error descriptivo si el YAML es inválido

- ✅ Valida que textarea y container existan

---

### Template con Lógica

Las variables del formulario se reemplazan automáticamente:

```
Template: "Lenguaje: {{backendLang}}"
Datos: {backendLang: "nodejs"}
Resultado: "Lenguaje: nodejs"
```

Para arrays (checkboxes):
```
Datos: {monitoring: ["cloudwatch", "datadog"]}
Resultado: "cloudwatch, datadog"
```

## 📖 Documentación Completa

Ver `/docs/guia-documentacion/12-formularios-interactivos.md` para:

- 📝 Guía completa de configuración

- 🎯 Mejores prácticas

- 🔧 Troubleshooting

- 📚 Ejemplos avanzados

Ver `/docs/guia-documentacion/test_aiprompt.md` para:

- 🔍 Sistema de 2 Fases (Análisis + Formulario)

- 📋 Cómo usar YAML generado dinámicamente

- 🚀 Workflow completo de generación de docs

## 🚀 Próximas Mejoras

- [ ] Validaciones personalizadas (email, URL, regex)

- [ ] Campos condicionales (mostrar B solo si A es X)

- [ ] Exportar/importar respuestas (JSON)

- [ ] LocalStorage para guardar progreso

- [ ] Preview en tiempo real

- [ ] i18n (internacionalización)

- [x] ✅ Cargar YAML desde texto directo (implementado)

## 💡 Contribuir

Para agregar un nuevo formulario:

1. Define la configuración en `prompts-config.json`

2. Usa `<div data-prompt="ID"></div>` en markdown

3. Documenta en `12-formularios-interactivos.md`

---

**¿Preguntas?** Consulta la [documentación completa](guia-documentacion/12-formularios-interactivos.md)

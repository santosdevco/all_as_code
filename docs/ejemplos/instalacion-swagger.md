# 🚀 Instalación y Configuración de Swagger UI

## 📦 Instalación

### 1. Instalar Dependencias

```bash
# Asegúrate de estar en el directorio del hub de documentación
cd /home/santosdev/tbbc/fast-documentation-ai

# Instalar el plugin
pip install mkdocs-swagger-ui-tag

# O usar requirements.txt (ya está actualizado)
pip install -r requirements.txt
```

### 2. Verificar Instalación

```bash
pip list | grep swagger
# Deberías ver: mkdocs-swagger-ui-tag
```

---

## ⚙️ Configuración Ya Aplicada

El archivo `mkdocs.yml` ya está configurado con:

```yaml
plugins:
  - search:
      lang: es
  - mermaid2:
      version: 11.12.0
  - swagger-ui-tag:
      background: White
      docExpansion: none
      filter: ""
      syntaxHighlightTheme: monokai
      tryItOutEnabled: true  # ← Permite ejecutar requests
```

El archivo `requirements.txt` incluye:

```
mkdocs>=1.5
mkdocs-mermaid2-plugin>=1.2.1
Pygments>=2.16.0
mkdocs-material
mkdocs-swagger-ui-tag>=0.6.10  # ← Plugin de Swagger
```

---

## 🧪 Probar Localmente

### 1. Levantar el Servidor

```bash
mkdocs serve
```

### 2. Abrir en el Navegador

```
http://localhost:8000
```

### 3. Navegar a la Demo

Ve a **🎮 Demos → Swagger UI Interactivo** en el menú lateral.

### 4. Probar la API Interactiva

1. Expande `POST /auth/login`
2. Haz clic en "Try it out"
3. Haz clic en "Execute"
4. ¡Ve la respuesta!

---

## 🎯 Próximos Pasos

### Para Documentar Tu Propia API:

1. **Genera `openapi.yaml`** usando **Prompt 10** de la guía
2. **Copia el archivo** al hub de documentación:
   ```bash
   cp tu-proyecto/openapi.yaml docs/proyectos/tu-api/
   ```
3. **Crea una página** como `docs/proyectos/tu-api/api-reference.md`:
   ```markdown
   # API Reference
   
   <swagger-ui src="../openapi.yaml"/>
   ```
4. **Actualiza la navegación** en `mkdocs.yml`

### Referencia Completa

Consulta la [Guía de Integración Swagger](../guia-documentacion/11-integracion-swagger.md) para:
- Configuración avanzada
- Personalización de temas
- Troubleshooting
- Ejemplos completos

---

## ✅ Checklist

- [x] Plugin instalado
- [x] `mkdocs.yml` configurado
- [x] `requirements.txt` actualizado
- [x] Demo funcional en `/ejemplos/swagger-demo/`
- [ ] Generar `openapi.yaml` para tu proyecto (Prompt 10)
- [ ] Copiar al hub de docs
- [ ] Crear página de API Reference
- [ ] Probar localmente

---

<div style="text-align: center; margin-top: 50px;">
    <small>Última actualización: 2025-12-11</small>
</div>

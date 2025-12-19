# Generación de Navegación para MkDocs

## 📋 Contexto

Soy un asistente que ayuda a generar documentación técnica estructurada. Ya he generado múltiples archivos markdown para documentar un proyecto y ahora necesito crear la configuración de navegación (`nav`) para MkDocs.

## 🎯 Tarea

Analiza todos los archivos markdown (`.md`) que se encuentran en la carpeta `docs/projects/{nombre-proyecto}/` del workspace actual y genera la sección `nav` completa para el archivo `mkdocs.yml`.

## 📂 Estructura Esperada

Los archivos están organizados por tipo de documentación:

```
docs/projects/{proyecto}/
├── 01-vista-ejecutiva/
│   └── resumen-ejecutivo.md
├── 02-requerimientos/
│   ├── 01-funcionales.md
│   └── 02-no-funcionales.md
├── 03-arquitectura/
│   ├── 01-contexto.md
│   ├── 02-contenedores.md
│   ├── 03-componentes.md
│   └── 04-decisiones.md
├── 04-tecnica/
│   ├── 01-stack-tecnologico.md
│   ├── 02-modelo-datos.md
│   ├── 03-apis.md
│   └── 04-integraciones.md
├── 05-procesos-negocio/
│   ├── 00-indice.md
│   ├── 01-casos-uso-*.md
│   └── ...
├── 06-infraestructura/
│   ├── 01-deployment.md
│   ├── 02-ci-cd.md
│   └── 03-monitoreo.md
└── 07-swagger/
    └── swagger.md
```

## ✅ Requisitos

1. **Analizar archivos existentes**: Lista todos los archivos `.md` en cada carpeta
2. **Generar estructura jerárquica**: Organiza por secciones principales
3. **Usar nombres descriptivos**: Extrae títulos de los archivos cuando sea posible
4. **Mantener orden lógico**: Sigue el orden numérico de las carpetas (01, 02, 03, etc.)
5. **Agregar emojis**: Usa emojis apropiados para cada sección:
   - 📊 Vista Ejecutiva
   - 📋 Requerimientos
   - 🏗️ Arquitectura
   - 💻 Documentación Técnica
   - 🔄 Procesos de Negocio
   - 🚀 Infraestructura
   - 📖 API Reference

## 📤 Formato de Salida

Genera SOLO la sección `nav` en formato YAML válido para MkDocs:

```yaml
nav:
  - Inicio: index.md
  
  - Proyectos:
    - {Nombre del Proyecto}:
      - 📊 Vista Ejecutiva:
        - projects/{proyecto}/01-vista-ejecutiva/resumen-ejecutivo.md
      
      - 📋 Requerimientos:
        - Funcionales: projects/{proyecto}/02-requerimientos/01-funcionales.md
        - No Funcionales: projects/{proyecto}/02-requerimientos/02-no-funcionales.md
      
      - 🏗️ Arquitectura:
        - Contexto: projects/{proyecto}/03-arquitectura/01-contexto.md
        - Contenedores: projects/{proyecto}/03-arquitectura/02-contenedores.md
        - Componentes: projects/{proyecto}/03-arquitectura/03-componentes.md
        - Decisiones: projects/{proyecto}/03-arquitectura/04-decisiones.md
      
      # ... continuar con todas las secciones encontradas
```

## 🔍 Instrucciones Adicionales

1. **Si hay archivos con índice numérico** (ej: `01-`, `02-`): Usa el orden numérico
2. **Si los archivos tienen título H1** (# Título): Usa ese título en la navegación
3. **Si no hay título**: Usa el nombre del archivo formateado (sin números ni guiones)
4. **Si hay carpetas vacías**: Omítelas de la navegación
5. **Mantén compatibilidad**: La sintaxis debe ser válida para MkDocs Material

## 💡 Ejemplo de Transformación

```
Archivo: 01-stack-tecnologico.md
Título en archivo: # Stack Tecnológico Backend
Resultado nav: Stack Tecnológico: projects/{proyecto}/04-tecnica/01-stack-tecnologico.md
```

## ⚠️ Importante

- **NO** generes archivos, solo la configuración `nav`
- **NO** modifiques archivos existentes
- **Solo** analiza y genera la estructura de navegación
- **Valida** que todas las rutas sean relativas desde `docs/`

## 🎯 Entrega Final

Entrega:
1. ✅ Bloque YAML con la sección `nav` completa
2. ✅ Lista de archivos analizados (para verificación)
3. ✅ Instrucciones de dónde copiar el YAML en `mkdocs.yml`

---

**¿Listo para empezar?** Analiza los archivos y genera la configuración `nav`.

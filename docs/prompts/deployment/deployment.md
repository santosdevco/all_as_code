# 🚀 Deployment e Infraestructura

Genera documentación completa de deployment, CI/CD y monitoreo combinando análisis automático con conocimiento del equipo.

---

## 📋 PASO 1: Copiar Prompt de Análisis

<div style="text-align: center; margin: 30px 0;">
    <button 
        id="copy-analysis-btn"
        onclick="copyPromptFile('/prompts/deployment/01-analisis/', 'copy-analysis-btn')" 
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
               color: white; 
               border: none; 
               padding: 20px 40px; 
               font-size: 20px; 
               font-weight: bold; 
               border-radius: 16px; 
               cursor: pointer; 
               box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
               transition: all 0.3s ease;
               display: inline-flex;
               align-items: center;
               gap: 12px;
               margin-right: 15px;">
        <span style="font-size: 28px;">📋</span>
        Copiar Prompt de Análisis
    </button>
    <button 
        onclick="window.open('/prompts/deployment/01-analisis/', '_blank')" 
        style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); 
               color: #333; 
               border: none; 
               padding: 20px 40px; 
               font-size: 20px; 
               font-weight: bold; 
               border-radius: 16px; 
               cursor: pointer; 
               box-shadow: 0 6px 20px rgba(168, 237, 234, 0.5);
               transition: all 0.3s ease;
               display: inline-flex;
               align-items: center;
               gap: 12px;">
        <span style="font-size: 28px;">👁️</span>
        Ver Prompt
    </button>
</div>

!!! tip "Pega el prompt en Copilot"
    Copilot analizará el `@workspace` y generará un YAML con preguntas categorizadas.

---

## 🤖 PASO 2: Copilot Analiza

Copilot generará:

1. **Reporte en consola** con hallazgos (✅ encontrado / ⚠️ validar / ❓ no encontrado)
2. **YAML con preguntas** sobre lo que no pudo determinar del código

---

## 📝 PASO 3: Pegar YAML y Responder

<div class="pb-warning" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 12px; color: white; margin: 20px 0;">
    <h3 style="margin-top: 0; color: white;">⚠️ Importante</h3>
    <p style="margin-bottom: 0;">Copia el YAML completo que generó Copilot y pégalo abajo. El formulario se llenará automáticamente.</p>
</div>

<div style="margin: 30px 0;">
    <label for="yaml-input" style="display: block; font-size: 18px; font-weight: bold; margin-bottom: 10px;">
        📄 YAML del Análisis de Copilot:
    </label>
    <textarea 
        id="yaml-input" 
        placeholder="Pega aquí el YAML completo que generó Copilot..."
        style="width: 100%; 
               height: 200px; 
               padding: 15px; 
               font-family: 'Courier New', monospace; 
               font-size: 14px; 
               border: 2px solid #667eea; 
               border-radius: 8px; 
               background: #f8f9fa;
               resize: vertical;">
    </textarea>
    <button 
        onclick="loadPromptFromYAML('yaml-input', 'form-container', 'deployment-form')"
        id="load-yaml-btn"
        style="background: linear-gradient(135deg, #f39c12 0%, #f1c40f 100%); 
               color: white; 
               border: none; 
               padding: 15px 30px; 
               font-size: 18px; 
               font-weight: bold; 
               border-radius: 8px; 
               cursor: pointer; 
               margin-top: 15px;
               box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
               transition: all 0.3s ease;">
        🚀 Cargar Formulario
    </button>
</div>

---

## ✏️ PASO 4: Responder Preguntas

<div id="form-container" style="margin: 30px 0;">
    <!-- El formulario se generará aquí automáticamente -->
</div>

---

## 🎯 PASO 5: Generar Prompt Final

<div id="output-container" style="margin: 30px 0;">
    <!-- El prompt final aparecerá aquí -->
</div>

<div style="text-align: center; margin: 40px 0;">
    <p style="font-size: 16px; color: #666;">
        El prompt final combinará tus respuestas con las especificaciones de salida
    </p>
    <button 
        onclick="window.open('/prompts/deployment/02-salida/', '_blank')" 
        style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); 
               color: #333; 
               border: none; 
               padding: 15px 30px; 
               font-size: 16px; 
               font-weight: bold; 
               border-radius: 8px; 
               cursor: pointer; 
               box-shadow: 0 4px 15px rgba(252, 182, 159, 0.4);
               transition: all 0.3s ease;">
        👁️ Ver Especificación de Salida
    </button>
</div>

---

## 📦 Archivos que se Generarán

Una vez pegues el prompt final en Copilot, se generarán automáticamente:

1. **`ai_docs/06-infraestructura/01-deployment.md`**
   - Diagrama de arquitectura
   - Ambientes (dev, staging, prod)
   - Docker y registry
   - Kubernetes (si aplica)
   - Escalabilidad y HA
   - Seguridad (LB, SSL, WAF)
   - Backups y DR

2. **`ai_docs/06-infraestructura/02-ci-cd.md`**
   - Diagrama del pipeline
   - Stages detallados
   - Estrategia de branching
   - Proceso de deployment
   - Secrets y variables
   - Rollback

3. **`ai_docs/06-infraestructura/03-monitoreo.md`**
   - Stack de herramientas
   - Métricas (infra, app, BD, negocio)
   - Alertas configuradas
   - Logs centralizados
   - Tracing distribuido
   - Dashboards y SLIs/SLOs

---

<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; border-radius: 16px; color: white; text-align: center; margin: 40px 0;">
    <h2 style="color: white; margin-top: 0;">✅ ¿Listo?</h2>
    <p style="font-size: 18px; margin-bottom: 30px;">
        Empieza copiando el prompt de análisis y pegándolo en Copilot
    </p>
    <button 
        onclick="copyPromptFile('/prompts/deployment/01-analisis/', 'final-cta-btn')" 
        id="final-cta-btn"
        style="background: white; 
               color: #11998e; 
               border: none; 
               padding: 20px 50px; 
               font-size: 22px; 
               font-weight: bold; 
               border-radius: 12px; 
               cursor: pointer; 
               box-shadow: 0 6px 20px rgba(0,0,0,0.3);
               transition: all 0.3s ease;">
        📋 Copiar Prompt de Análisis
    </button>
</div>

<script>
// Auto-inicializar el formulario con data-prompt attribute si existe
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('form-container');
    if (container && container.dataset.prompt) {
        // Si hay un YAML pre-configurado, cargarlo automáticamente
        // (útil para demos o templates)
    }
});
</script>

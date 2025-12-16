# 🚀 Deployment e Infraestructura

Genera documentación completa de deployment, CI/CD y monitoreo mediante un **proceso iterativo** donde Copilot pregunta hasta obtener toda la información necesaria.

---

## 📋 PASO 1: Copiar Prompt de Análisis Inicial

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
        Copiar Prompt de Análisis Inicial
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
    Copilot analizará el `@workspace` y generará un YAML con preguntas.

---

## 🤖 PASO 2: Generar Formulario de preguntas

!!! warning "Importante"
    Con el prompt del paso 1,  Copilot Va agenerar un YAML, que copias y pegas a continuación

---
<div class="pb-warning" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 12px; color: white; margin: 20px 0;">
    <h3 style="margin-top: 0; color: white;">⚠️ Importante</h3>
    <p style="margin-bottom: 0;">Copia el YAML completo que generó Copilot y pégalo abajo.</p>
</div>

<div style="margin: 30px 0;">
    <label for="yaml-input" style="display: block; font-size: 18px; font-weight: bold; margin-bottom: 10px;">
        📄 YAML del Análisis:
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



## ✏️ PASO 2.1: Responder Preguntas

<div id="form-container" style="margin: 30px 0;">
    <!-- El formulario se generará aquí automáticamente -->
</div>

!!! tip "Después de responder"
    Haz clic en **"📋 Copiar Respuestas"** y pégalas en Copilot (mismo chat).



!!! warning "Si la respuesta es un YAML"
    Debes regresar al paso 2.

    

!!! warning "Si la respuesta es 'Todo OK'"
    Debes continuar al paso 3

## PASO 3: Prompt de Formato de Salida

<div style="text-align: center; margin: 30px 0;">
    <button 
        id="copy-analysis-btn"
        onclick="copyPromptFile('/prompts/deployment/02-salida/', 'copy-salida-btn')" 
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
        Copiar Prompt de Formato de Salida
    </button>
    <button 
        onclick="window.open('/prompts/deployment/02-salida/', '_blank')" 
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
    Manteniendo la misma conversacion copilot generara los archivos de salida de acuerdo a lo especificado en Salida

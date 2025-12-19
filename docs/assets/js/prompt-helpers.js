/**
 * Funciones helper para el sistema de prompts
 * Estas funciones son independientes del PromptBuilder y manejan acciones auxiliares
 */

/**
 * Copia el contenido de una página renderizada al portapapeles
 * Abre la página en una ventana oculta, extrae el contenido y lo copia
 * @param {string} pageUrl - URL de la página a copiar
 * @param {string} btnId - ID del botón que invocó la función
 */
window.copyPromptFile = async function(pageUrl, btnId) {
    const btn = document.getElementById(btnId);
    const originalText = btn ? btn.innerHTML : '';
    
    try {
        if (btn) btn.innerHTML = '⏳ Cargando...';
        
        // Abrir la página y extraer el contenido del artículo
        const response = await fetch(pageUrl);
        if (!response.ok) {
            throw new Error(`No se pudo cargar ${pageUrl}`);
        }
        
        const html = await response.text();
        
        // Crear un elemento temporal para parsear el HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Buscar el contenido del artículo (MkDocs usa .md-content__inner o article)
        const article = doc.querySelector('article.md-content__inner') || 
                       doc.querySelector('article') || 
                       doc.querySelector('.md-content');
        
        if (!article) {
            throw new Error('No se encontró el contenido del artículo');
        }
        
        // Extraer solo el texto
        const content = article.innerText || article.textContent;
        
        // Limpiar espacios en blanco al inicio y final
        const cleanContent = content.trim();
        
        await navigator.clipboard.writeText(cleanContent);
        
        if (btn) {
            btn.innerHTML = '✅ ¡Copiado!';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 3000);
        }
    } catch (error) {
        console.error('Error al copiar archivo:', error);
        if (btn) {
            btn.innerHTML = '❌ Error';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 3000);
        }
        alert('Error al copiar el prompt. Por favor intenta nuevamente.');
    }
};

/**
 * Carga un formulario desde YAML pegado en un textarea
 * @param {string} textareaId - ID del textarea con el YAML
 * @param {string} containerId - ID del contenedor donde renderizar el formulario
 * @param {string} instanceId - ID único para la instancia del PromptBuilder
 */
window.loadPromptFromYAML = function(textareaId, containerId, instanceId) {
    const textarea = document.getElementById(textareaId);
    const container = document.getElementById(containerId);
    
    if (!textarea || !container) {
        console.error('Textarea o contenedor no encontrado');
        alert('Error: Elementos no encontrados');
        return;
    }
    
    const yamlText = textarea.value.trim();
    
    if (!yamlText) {
        alert('Por favor pega el YAML generado por Copilot en el campo de texto');
        return;
    }
    
    try {
        // Validar que sea YAML válido antes de crear la instancia
        if (typeof jsyaml !== 'undefined') {
            jsyaml.load(yamlText);
        }
        
        // Crear instancia con YAML directo
        const builder = new PromptBuilder(containerId, instanceId, yamlText);
        window.promptBuilderInstances[instanceId] = builder;
        builder.init();
    } catch (error) {
        console.error('Error al cargar YAML:', error);
        alert(`Error al procesar el YAML: ${error.message}`);
    }
};

---
title: Respuesta Masiva - Proyecto
hide:
  - navigation
  - toc
---

<style>
    .md-content__inner {
        max-width: 1400px;
        margin: 0 auto;
    }
    
    body {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
    }

    .massive-container {
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        margin: 40px auto;
        padding: 0;
        overflow: hidden;
    }

    .massive-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px;
        text-align: center;
    }

    .massive-header h1 {
        margin: 0 0 10px 0;
        font-size: 2.5em;
    }

    .massive-header p {
        margin: 5px 0;
        opacity: 0.9;
        font-size: 1.1em;
    }

    .session-navigation {
        background: #f8f9fa;
        padding: 20px 40px;
        border-bottom: 2px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
    }

    .session-selector {
        display: flex;
        align-items: center;
        gap: 15px;
        flex: 1;
    }

    .session-selector select {
        flex: 1;
        padding: 12px 20px;
        border: 2px solid #ddd;
        border-radius: 10px;
        font-size: 1em;
        background: white;
        cursor: pointer;
        transition: all 0.3s;
    }

    .session-selector select:hover {
        border-color: #667eea;
    }

    .session-selector select:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .nav-buttons {
        display: flex;
        gap: 10px;
    }

    .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 10px;
        font-size: 1em;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 600;
    }

    .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .btn-success {
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        color: white;
    }

    .btn-success:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(17, 153, 142, 0.4);
    }

    .btn-secondary {
        background: #6c757d;
        color: white;
    }

    .btn-secondary:hover {
        background: #5a6268;
    }

    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .form-container {
        padding: 40px;
    }

    .section {
        margin-bottom: 40px;
        padding: 30px;
        background: #f8f9fa;
        border-radius: 15px;
        border-left: 5px solid #667eea;
    }

    .section-header {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e0e0e0;
    }

    .section-icon {
        font-size: 2em;
        margin-right: 15px;
    }

    .section-title {
        font-size: 1.8em;
        color: #2c3e50;
        margin: 0;
    }

    .form-group {
        margin-bottom: 30px;
    }

    .form-label {
        display: block;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 8px;
        font-size: 1.1em;
    }

    .form-help {
        display: block;
        color: #7f8c8d;
        font-size: 0.9em;
        margin-bottom: 10px;
        font-style: italic;
    }

    .form-control {
        width: 100%;
        padding: 15px;
        border: 2px solid #ddd;
        border-radius: 10px;
        font-size: 1em;
        transition: all 0.3s;
        box-sizing: border-box;
    }

    .form-control:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    textarea.form-control {
        min-height: 120px;
        resize: vertical;
        font-family: inherit;
    }

    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .checkbox-item {
        display: flex;
        align-items: center;
        padding: 12px;
        background: white;
        border-radius: 8px;
        border: 2px solid #e0e0e0;
        transition: all 0.3s;
    }

    .checkbox-item:hover {
        border-color: #667eea;
        background: #f8f9ff;
    }

    .checkbox-item input[type="checkbox"] {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        cursor: pointer;
    }

    .checkbox-item label {
        cursor: pointer;
        user-select: none;
        flex: 1;
    }

    .progress-indicator {
        position: sticky;
        top: 0;
        background: white;
        padding: 15px 40px;
        border-bottom: 2px solid #e0e0e0;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .progress-text {
        font-weight: 600;
        color: #2c3e50;
    }

    .progress-bar-container {
        flex: 1;
        height: 8px;
        background: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
        margin: 0 20px;
    }

    .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        transition: width 0.3s;
    }

    .action-buttons {
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        margin-top: 30px;
        padding-top: 30px;
        border-top: 2px solid #e0e0e0;
    }

    .loading {
        text-align: center;
        padding: 60px;
        font-size: 1.2em;
        color: #667eea;
    }

    .error {
        background: #fee;
        border: 2px solid #fcc;
        color: #c00;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
    }

    .empty-state {
        text-align: center;
        padding: 60px;
        color: #7f8c8d;
    }

    .empty-state-icon {
        font-size: 4em;
        margin-bottom: 20px;
    }

    @media (max-width: 768px) {
        .session-navigation {
            flex-direction: column;
        }
        
        .session-selector {
            width: 100%;
        }
        
        .nav-buttons {
            width: 100%;
            justify-content: stretch;
        }
        
        .nav-buttons button {
            flex: 1;
        }
    }
</style>

<div class="massive-container">
    <div class="massive-header">
        <h1>✍️ Respuesta Masiva</h1>
        <p id="project-name">Cargando proyecto...</p>
        <p id="session-info">Preparando sesiones...</p>
    </div>

    <div class="session-navigation">
        <div class="session-selector">
            <label style="font-weight: 600; white-space: nowrap;">📋 Sesión:</label>
            <select id="session-select" onchange="switchSession()">
                <option value="">Cargando...</option>
            </select>
        </div>
        <div class="nav-buttons">
            <button class="btn btn-secondary" id="prev-btn" onclick="previousSession()" disabled>
                ← Anterior
            </button>
            <button class="btn btn-primary" id="next-btn" onclick="nextSession()" disabled>
                Siguiente →
            </button>
        </div>
    </div>

    <div class="progress-indicator">
        <span class="progress-text" id="progress-text">0 de 0 completadas</span>
        <div class="progress-bar-container">
            <div class="progress-bar" id="progress-bar" style="width: 0%"></div>
        </div>
        <span class="progress-text" id="progress-percent">0%</span>
    </div>

    <div class="form-container" id="form-container">
        <div class="loading">
            <div style="font-size: 3em; margin-bottom: 20px;">⏳</div>
            <div>Cargando sesiones del proyecto...</div>
        </div>
    </div>

    <div class="action-buttons" id="action-buttons" style="display: none; padding: 0 40px 40px 40px;">
        <button class="btn btn-info" onclick="openCurrentSessionInAnswer()" style="background: #17a2b8; border-color: #17a2b8;">
            🔗 Abrir en /answer
        </button>
        <button class="btn btn-success" onclick="saveCurrentSession()">
            💾 Guardar Sesión Actual
        </button>
        <button class="btn btn-secondary" onclick="returnToPanel()">
            ← Volver al Panel
        </button>
    </div>
</div>

<script>
    // Configuración de API
    const API_BASE_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:8000'
        : 'https://api.yourdomain.com';

    // Estado global
    let projectId = null;
    let projectData = null;
    let allAnalyses = [];
    let currentSessionIndex = 0;
    let sessionAnswers = {}; // Cache de respuestas por sesión
    let hasUnsavedChanges = false; // Rastrear cambios sin guardar

    // Obtener projectId de la URL
    function getProjectIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('project_id');
    }

    // Cargar datos del proyecto
    async function loadProjectData() {
        try {
            projectId = getProjectIdFromUrl();
            
            if (!projectId) {
                showError('No se especificó un proyecto en la URL');
                return;
            }

            // Cargar proyecto
            const projectResponse = await fetch(`${API_BASE_URL}/api/projects/${projectId}`);
            if (!projectResponse.ok) throw new Error('Error cargando proyecto');
            projectData = await projectResponse.json();

            // Cargar análisis del proyecto
            const analysesResponse = await fetch(`${API_BASE_URL}/api/projects/${projectId}/analyses`);
            if (!analysesResponse.ok) throw new Error('Error cargando análisis');
            allAnalyses = await analysesResponse.json();

            if (allAnalyses.length === 0) {
                showEmptyState();
                return;
            }

            // Cargar datos completos de cada análisis
            for (let i = 0; i < allAnalyses.length; i++) {
                const analysis = allAnalyses[i];
                const shareToken = analysis.share_token; // Preservar token
                const fullResponse = await fetch(`${API_BASE_URL}/api/answer/${shareToken}`);
                if (fullResponse.ok) {
                    const fullData = await fullResponse.json();
                    // Asegurar que share_token esté presente
                    allAnalyses[i] = { ...fullData, share_token: shareToken };
                } else {
                    console.error(`Error cargando análisis ${shareToken}`);
                }
            }

            // Actualizar header
            document.getElementById('project-name').textContent = projectData.name;
            document.getElementById('session-info').textContent = 
                `${allAnalyses.length} sesión${allAnalyses.length > 1 ? 'es' : ''} de análisis`;

            // Inicializar selector de sesiones
            initializeSessionSelector();

            // Cargar primera sesión
            loadSession(0);

        } catch (error) {
            console.error('Error:', error);
            showError('Error cargando datos: ' + error.message);
        }
    }

    // Inicializar selector de sesiones
    function initializeSessionSelector() {
        const select = document.getElementById('session-select');
        select.innerHTML = '';

        allAnalyses.forEach((analysis, index) => {
            const option = document.createElement('option');
            option.value = index;
            const category = analysis.analysis_type ? `[${analysis.analysis_type}]` : '';
            const title = analysis.yaml_config?.title || 'Sin título';
            option.textContent = `${index + 1}. ${category} ${title}`;
            select.appendChild(option);
        });

        updateNavigationButtons();
    }

    // Cargar sesión específica
    async function loadSession(index) {
        if (index < 0 || index >= allAnalyses.length) return;

        // Confirmar si hay cambios sin guardar
        if (hasUnsavedChanges && currentSessionIndex !== index) {
            const userChoice = await showSaveDialog();
            
            if (userChoice === 'cancel') {
                // Restaurar selector al índice actual
                document.getElementById('session-select').value = currentSessionIndex;
                return;
            }
            
            if (userChoice === 'save') {
                // Intentar guardar antes de cambiar
                const saved = await saveCurrentSessionSilent();
                if (!saved) {
                    // Si falla el guardado, preguntar si quiere continuar
                    const continueAnyway = window.confirm(
                        '❌ Error al guardar.\n\n¿Deseas continuar sin guardar? Los cambios se perderán.'
                    );
                    if (!continueAnyway) {
                        document.getElementById('session-select').value = currentSessionIndex;
                        return;
                    }
                }
            }
            
            // userChoice === 'discard' -> continuar sin guardar
        }

        // Guardar respuestas de la sesión actual antes de cambiar (en caché)
        if (currentSessionIndex !== index) {
            cacheCurrentSessionAnswers();
        }

        hasUnsavedChanges = false; // Reset al cambiar de sesión
        currentSessionIndex = index;
        const analysis = allAnalyses[index];

        // Actualizar selector
        document.getElementById('session-select').value = index;
        
        // Renderizar formulario
        renderSessionForm(analysis);
        
        // Actualizar botones de navegación
        updateNavigationButtons();
        
        // Actualizar progreso
        updateProgress();

        // Mostrar botones de acción
        document.getElementById('action-buttons').style.display = 'flex';

        // Scroll al top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Renderizar formulario de sesión
    function renderSessionForm(analysis) {
        const container = document.getElementById('form-container');
        
        if (!analysis.yaml_config || !analysis.yaml_config.sections) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⚠️</div>
                    <h2>No hay configuración disponible</h2>
                    <p>Esta sesión no tiene preguntas definidas.</p>
                </div>
            `;
            return;
        }

        const yamlConfig = analysis.yaml_config;
        
        // Obtener respuestas: primero del caché, luego del analysis original
        const analysisKey = analysis.share_token || analysis.id || `session_${currentSessionIndex}`;
        let existingAnswers = {};
        if (sessionAnswers[analysisKey]) {
            existingAnswers = sessionAnswers[analysisKey];
            console.log('✅ Usando respuestas del caché para:', analysisKey, existingAnswers);
        } else if (analysis.answers) {
            existingAnswers = analysis.answers;
            console.log('📄 Usando respuestas originales para:', analysisKey, existingAnswers);
        } else {
            console.log('⚠️ Sin respuestas para:', analysisKey);
        }

        // Agregar header con categoría
        let html = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 5px 0; font-size: 1.8em;">${yamlConfig.title || 'Cuestionario'}</h2>
                <p style="margin: 0; opacity: 0.9; font-size: 1em;">
                    📂 Categoría: <strong>${analysis.analysis_type || 'General'}</strong> | 
                    🔄 Iteración: <strong>${analysis.iteration || 1}</strong>
                </p>
            </div>
        `;

        yamlConfig.sections.forEach(section => {
            if (!section.questions || section.questions.length === 0) return;

            html += `
                <div class="section">
                    <div class="section-header">
                        <span class="section-icon">${section.icon || '📌'}</span>
                        <h2 class="section-title">${section.title}</h2>
                    </div>
            `;

            section.questions.forEach(question => {
                const questionId = question.id;
                const existingValue = existingAnswers[questionId] || '';

                html += `<div class="form-group">`;
                html += `<label class="form-label" for="q_${questionId}">${question.label || question.question || questionId}</label>`;
                
                if (question.help) {
                    html += `<span class="form-help">${question.help}</span>`;
                }

                // Renderizar según el tipo
                if (question.type === 'textarea' || question.type === 'long_text') {
                    html += `<textarea class="form-control" id="q_${questionId}" name="${questionId}" placeholder="${question.placeholder || 'Escribe tu respuesta aquí...'}" oninput="markAsChanged()">${existingValue}</textarea>`;
                } else if (question.type === 'text' || question.type === 'short_text') {
                    html += `<input type="text" class="form-control" id="q_${questionId}" name="${questionId}" value="${existingValue}" placeholder="${question.placeholder || 'Escribe tu respuesta...'}" oninput="markAsChanged()">`;
                } else if (question.type === 'checkbox' && question.options) {
                    html += `<div class="checkbox-group">`;
                    const selectedValues = Array.isArray(existingValue) ? existingValue : [];
                    
                    // Normalizar opciones (pueden ser strings u objetos {value, label})
                    const normalizedOptions = question.options.map(opt => {
                        if (typeof opt === 'string') return { value: opt, label: opt };
                        return { value: opt.value || opt.label, label: opt.label || opt.value };
                    });
                    
                    const optionValues = normalizedOptions.map(o => o.value);
                    
                    normalizedOptions.forEach(option => {
                        const isChecked = selectedValues.includes(option.value);
                        const safeId = option.value.replace(/[^a-zA-Z0-9_-]/g, '_');
                        html += `
                            <div class="checkbox-item">
                                <input type="checkbox" id="q_${questionId}_${safeId}" name="${questionId}" value="${option.value}" ${isChecked ? 'checked' : ''} onchange="markAsChanged()">
                                <label for="q_${questionId}_${safeId}">${option.label}</label>
                            </div>
                        `;
                    });
                    
                    // Agregar opción "Otro"
                    const otherValue = selectedValues.find(v => !optionValues.includes(v)) || '';
                    html += `
                        <div class="checkbox-item">
                            <input type="checkbox" id="q_${questionId}_otro" onchange="toggleOtherInput('${questionId}', this.checked); markAsChanged()" ${otherValue ? 'checked' : ''}>
                            <label for="q_${questionId}_otro">Otro:</label>
                            <input type="text" class="form-control" id="q_${questionId}_otro_text" name="${questionId}_otro" value="${otherValue}" placeholder="Especifica..." style="margin-left: 10px; flex: 1; display: ${otherValue ? 'inline-block' : 'none'};" oninput="markAsChanged()">
                        </div>
                    `;
                    html += `</div>`;
                } else if (question.type === 'radio' && question.options) {
                    html += `<div class="checkbox-group">`;
                    
                    // Normalizar opciones
                    const normalizedOptions = question.options.map(opt => {
                        if (typeof opt === 'string') return { value: opt, label: opt };
                        return { value: opt.value || opt.label, label: opt.label || opt.value };
                    });
                    
                    const optionValues = normalizedOptions.map(o => o.value);
                    
                    normalizedOptions.forEach(option => {
                        const isChecked = existingValue === option.value;
                        const safeId = option.value.replace(/[^a-zA-Z0-9_-]/g, '_');
                        html += `
                            <div class="checkbox-item">
                                <input type="radio" id="q_${questionId}_${safeId}" name="${questionId}" value="${option.value}" ${isChecked ? 'checked' : ''} onchange="markAsChanged()">
                                <label for="q_${questionId}_${safeId}">${option.label}</label>
                            </div>
                        `;
                    });
                    
                    // Agregar opción "Otro" para radio
                    const otherValue = existingValue && !optionValues.includes(existingValue) ? existingValue : '';
                    html += `
                        <div class="checkbox-item">
                            <input type="radio" id="q_${questionId}_otro" name="${questionId}" value="__otro__" ${otherValue ? 'checked' : ''} onchange="toggleOtherInput('${questionId}', true); markAsChanged()">
                            <label for="q_${questionId}_otro">Otro:</label>
                            <input type="text" class="form-control" id="q_${questionId}_otro_text" value="${otherValue}" placeholder="Especifica..." style="margin-left: 10px; flex: 1; display: ${otherValue ? 'inline-block' : 'none'};" oninput="markAsChanged()">
                        </div>
                    `;
                    html += `</div>`;
                } else if (question.type === 'select' && question.options) {
                    html += `<select class="form-control" id="q_${questionId}" name="${questionId}" onchange="toggleSelectOther('${questionId}', this.value); markAsChanged()">`;
                    html += `<option value="">Selecciona una opción...</option>`;
                    
                    // Normalizar opciones
                    const normalizedOptions = question.options.map(opt => {
                        if (typeof opt === 'string') return { value: opt, label: opt };
                        return { value: opt.value || opt.label, label: opt.label || opt.value };
                    });
                    
                    const optionValues = normalizedOptions.map(o => o.value);
                    const hasOtherValue = existingValue && !optionValues.includes(existingValue);
                    
                    normalizedOptions.forEach(option => {
                        const isSelected = existingValue === option.value;
                        html += `<option value="${option.value}" ${isSelected ? 'selected' : ''}>${option.label}</option>`;
                    });
                    
                    html += `<option value="__otro__" ${hasOtherValue ? 'selected' : ''}>Otro...</option>`;
                    html += `</select>`;
                    
                    // Input para "Otro" en select
                    const otherValue = hasOtherValue ? existingValue : '';
                    html += `<input type="text" class="form-control" id="q_${questionId}_otro_text" value="${otherValue}" placeholder="Especifica otra opción..." style="margin-top: 10px; display: ${hasOtherValue ? 'block' : 'none'};" oninput="markAsChanged()">`;
                } else {
                    html += `<input type="text" class="form-control" id="q_${questionId}" name="${questionId}" value="${existingValue}" placeholder="${question.placeholder || 'Escribe tu respuesta...'}" oninput="markAsChanged()">`;
                }

                html += `</div>`;
            });

            html += `</div>`;
        });

        container.innerHTML = html;
    }

    // Cachear respuestas de la sesión actual
    function cacheCurrentSessionAnswers() {
        const analysis = allAnalyses[currentSessionIndex];
        if (!analysis) return;

        const analysisKey = analysis.share_token || analysis.id || `session_${currentSessionIndex}`;
        const answers = collectAnswersFromForm();
        sessionAnswers[analysisKey] = answers;
        console.log('💾 Cacheando respuestas para:', analysisKey, answers);
        console.log('📦 Estado caché:', Object.keys(sessionAnswers));
    }

    // Recopilar respuestas del formulario
    function collectAnswersFromForm() {
        const container = document.getElementById('form-container');
        const inputs = container.querySelectorAll('input, textarea, select');
        const answers = {};
        const processedCheckboxes = new Set();

        inputs.forEach(input => {
            // Saltar inputs de "Otro" que se procesan junto con su grupo
            if (input.id && (input.id.endsWith('_otro') || input.id.endsWith('_otro_text'))) {
                return;
            }

            if (input.type === 'checkbox') {
                const questionId = input.name;
                if (!processedCheckboxes.has(questionId)) {
                    processedCheckboxes.add(questionId);
                    const checkboxes = container.querySelectorAll(`input[name="${questionId}"]`);
                    const values = [];
                    checkboxes.forEach(cb => {
                        if (cb.checked) values.push(cb.value);
                    });
                    // Agregar valor de "Otro" si está marcado
                    const otroCheckbox = container.querySelector(`#q_${questionId}_otro`);
                    const otroText = container.querySelector(`#q_${questionId}_otro_text`);
                    if (otroCheckbox && otroCheckbox.checked && otroText && otroText.value.trim()) {
                        values.push(otroText.value.trim());
                    }
                    if (values.length > 0) {
                        answers[questionId] = values;
                    }
                }
            } else if (input.type === 'radio') {
                const questionId = input.name;
                if (input.checked) {
                    if (input.value === '__otro__') {
                        const otroText = container.querySelector(`#q_${questionId}_otro_text`);
                        if (otroText && otroText.value.trim()) {
                            answers[questionId] = otroText.value.trim();
                        }
                    } else {
                        answers[questionId] = input.value;
                    }
                }
            } else if (input.tagName === 'SELECT') {
                const questionId = input.name;
                if (input.value === '__otro__') {
                    const otroText = container.querySelector(`#q_${questionId}_otro_text`);
                    if (otroText && otroText.value.trim()) {
                        answers[questionId] = otroText.value.trim();
                    }
                } else if (input.value.trim()) {
                    answers[questionId] = input.value.trim();
                }
            } else if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
                if (input.value.trim() && input.name) {
                    answers[input.name] = input.value.trim();
                }
            }
        });

        return answers;
    }

    // Cambiar de sesión desde el selector
    function switchSession() {
        const select = document.getElementById('session-select');
        const index = parseInt(select.value);
        loadSession(index);
    }

    // Navegación: anterior
    function previousSession() {
        if (currentSessionIndex > 0) {
            loadSession(currentSessionIndex - 1);
        }
    }

    // Navegación: siguiente
    function nextSession() {
        if (currentSessionIndex < allAnalyses.length - 1) {
            loadSession(currentSessionIndex + 1);
        }
    }

    // Actualizar botones de navegación
    function updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = currentSessionIndex === 0;
        nextBtn.disabled = currentSessionIndex === allAnalyses.length - 1;
    }

    // Actualizar progreso
    function updateProgress() {
        let completedCount = 0;
        
        allAnalyses.forEach((analysis, index) => {
            const answers = sessionAnswers[analysis.id] || analysis.answers || {};
            const hasAnswers = Object.keys(answers).length > 0;
            if (hasAnswers) completedCount++;
        });

        const total = allAnalyses.length;
        const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

        document.getElementById('progress-text').textContent = `${completedCount} de ${total} completadas`;
        document.getElementById('progress-percent').textContent = `${percent}%`;
        document.getElementById('progress-bar').style.width = `${percent}%`;
    }

    // Guardar sesión actual
    async function saveCurrentSession() {
        cacheCurrentSessionAnswers();
        
        const analysis = allAnalyses[currentSessionIndex];
        
        if (!analysis) {
            alert('❌ Error: No se pudo obtener la sesión actual');
            return;
        }
        
        if (!analysis.share_token) {
            console.error('Análisis sin share_token:', analysis);
            alert('❌ Error: Esta sesión no tiene un token válido. Por favor recarga la página.');
            return;
        }
        
        const answers = sessionAnswers[analysis.id] || {};

        if (Object.keys(answers).length === 0) {
            alert('⚠️ No hay respuestas para guardar en esta sesión');
            return;
        }

        try {
            console.log('Guardando en token:', analysis.share_token);
            const response = await fetch(`${API_BASE_URL}/api/answer/${analysis.share_token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            alert('✅ Sesión guardada correctamente');
            
            // Actualizar análisis con las respuestas guardadas
            allAnalyses[currentSessionIndex].answers = answers;
            hasUnsavedChanges = false; // Resetear flag de cambios
            updateProgress();

        } catch (error) {
            console.error('Error completo:', error);
            alert('❌ Error guardando: ' + error.message);
        }
    }

    // Guardar sesión sin mostrar alertas (para uso interno)
    async function saveCurrentSessionSilent() {
        cacheCurrentSessionAnswers();
        
        const analysis = allAnalyses[currentSessionIndex];
        
        if (!analysis || !analysis.share_token) {
            console.error('Análisis inválido o sin token');
            return false;
        }
        
        const answers = sessionAnswers[analysis.id] || {};

        if (Object.keys(answers).length === 0) {
            return true; // No hay nada que guardar, considerar como éxito
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/answer/${analysis.share_token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }

            // Actualizar análisis con las respuestas guardadas
            allAnalyses[currentSessionIndex].answers = answers;
            hasUnsavedChanges = false;
            updateProgress();
            
            return true;

        } catch (error) {
            console.error('Error guardando silenciosamente:', error);
            return false;
        }
    }

    // Mostrar diálogo personalizado para guardar/descartar/cancelar
    function showSaveDialog() {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 10003; display: flex; align-items: center; justify-content: center; padding: 20px;" id="save-dialog-modal">
                    <div style="background: white; border-radius: 16px; max-width: 500px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.4); overflow: hidden;" onclick="event.stopPropagation()">
                        
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: white; padding: 25px; text-align: center;">
                            <div style="font-size: 3em; margin-bottom: 10px;">⚠️</div>
                            <h2 style="margin: 0; font-size: 1.5em;">Cambios Sin Guardar</h2>
                        </div>
                        
                        <!-- Contenido -->
                        <div style="padding: 30px; text-align: center;">
                            <p style="font-size: 1.1em; color: #2c3e50; margin: 0 0 25px 0;">
                                Tienes cambios sin guardar en la sesión actual.<br>
                                <strong>¿Qué deseas hacer?</strong>
                            </p>
                            
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                <button onclick="window.saveDialogResolve('save')" style="background: linear-gradient(135deg, #27ae60 0%, #229954 100%); color: white; border: none; padding: 15px 25px; border-radius: 10px; font-size: 1.1em; font-weight: bold; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                                    💾 Guardar y Continuar
                                </button>
                                
                                <button onclick="window.saveDialogResolve('discard')" style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; border: none; padding: 15px 25px; border-radius: 10px; font-size: 1.1em; font-weight: bold; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                                    🗑️ Descartar Cambios
                                </button>
                                
                                <button onclick="window.saveDialogResolve('cancel')" style="background: #95a5a6; color: white; border: none; padding: 12px 25px; border-radius: 10px; font-size: 1em; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                                    ← Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            window.saveDialogResolve = (choice) => {
                modal.remove();
                delete window.saveDialogResolve;
                resolve(choice);
            };
        });
    }

    // Volver al panel
    async function returnToPanel() {
        if (hasUnsavedChanges) {
            const userChoice = await showSaveDialog();
            
            if (userChoice === 'cancel') {
                return; // No hacer nada
            }
            
            if (userChoice === 'save') {
                await saveCurrentSessionSilent();
            }
        }
        
        window.location.href = '/admin/panel-proyectos/';
    }

    // Abrir sesión actual en /answer
    function openCurrentSessionInAnswer() {
        const analysis = allAnalyses[currentSessionIndex];
        console.log('🔍 Analysis actual:', analysis);
        console.log('🔍 Share token:', analysis?.share_token);
        
        if (!analysis) {
            alert('⚠️ No se pudo obtener la sesión actual');
            return;
        }
        
        // Intentar múltiples propiedades donde podría estar la URL/token
        const shareToken = analysis.share_token;
        const shareUrl = analysis.share_url;
        
        if (!shareToken && !shareUrl) {
            alert('⚠️ No se pudo obtener el token o URL de la sesión actual');
            console.error('Analysis sin share_token ni share_url:', analysis);
            return;
        }
        
        // Usar share_url si existe, sino construir desde share_token
        const answerUrl = shareUrl || `${window.location.origin}/admin/answer/?token=${shareToken}`;
        window.open(answerUrl, '_blank');
    }

    // Mostrar error
    function showError(message) {
        const container = document.getElementById('form-container');
        container.innerHTML = `
            <div class="error">
                <h2>❌ Error</h2>
                <p>${message}</p>
            </div>
        `;
    }

    // Mostrar estado vacío
    function showEmptyState() {
        const container = document.getElementById('form-container');
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <h2>No hay sesiones de análisis</h2>
                <p>Este proyecto no tiene sesiones de análisis creadas aún.</p>
            </div>
        `;
    }

    // Marcar que hay cambios sin guardar
    function markAsChanged() {
        hasUnsavedChanges = true;
    }

    // Mostrar/ocultar input de "Otro" para checkboxes
    function toggleOtherInput(questionId, show) {
        const otherInput = document.getElementById(`q_${questionId}_otro_text`);
        if (otherInput) {
            otherInput.style.display = show ? 'inline-block' : 'none';
            if (!show) otherInput.value = '';
        }
    }

    // Mostrar/ocultar input de "Otro" para selects
    function toggleSelectOther(questionId, value) {
        const otherInput = document.getElementById(`q_${questionId}_otro_text`);
        if (otherInput) {
            otherInput.style.display = value === '__otro__' ? 'block' : 'none';
            if (value !== '__otro__') otherInput.value = '';
        }
    }

    // Inicializar al cargar la página
    document.addEventListener('DOMContentLoaded', loadProjectData);
</script>

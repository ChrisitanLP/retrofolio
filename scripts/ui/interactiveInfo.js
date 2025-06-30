// scripts/ui/InteractiveInfoWindow.js
export class InteractiveInfoWindow {
  constructor() {
    this.isVisible = false;
    this.currentData = null;
    this.popupElement = null;
    this.keyPressHandled = false;
    this.currentType = 'default';
    
    this.createPopupElement();
    this.bindEvents();
    
    // Registro de tipos de UI disponibles
    this.uiTypes = {
      'default': this.renderDefaultStyle.bind(this),
      'simple': this.renderSimpleStyle.bind(this),
      'gallery': this.renderGalleryStyle.bind(this),
      'project': this.renderProjectStyle.bind(this),
      'principal': this.renderPrincipalStyle.bind(this),
    };
  }

  createPopupElement() {
    // Crear el fondo del modal
    this.modalBackground = document.createElement('div');
    this.modalBackground.className = 'modal-background hidden';

    // Crear el elemento popup principal
    this.popupElement = document.createElement('div');
    this.popupElement.id = 'interactive-popup';
    this.popupElement.className = 'popup hidden';

    this.escape_hint = document.createElement('div');
    this.escape_hint.className = 'modal-background hidden';
    this.escape_hint.innerHTML = `
      <div class="escape-hint">Presiona [ESC] para salir...</div>
    `;

    // Agregar estilos
    this.addStyles();
    
    // Agregar al body
    document.body.appendChild(this.modalBackground);
    document.body.appendChild(this.popupElement);
    document.body.appendChild(this.escape_hint);
  }

  addStyles() {
    // Verificar si ya existen los estilos
    if (document.getElementById('interactive-popup-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'interactive-popup-styles';
    style.textContent = `
      .escape-hint {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: rgb(163, 162, 162);
        font-family: 'Press Start 2P', monospace;
        padding: 6px 10px;
        text-align: center;
        opacity: 0.85;
        z-index: 999;
        pointer-events: none;
      }
    
      .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 995;
      }

      /* Estilos base del popup */
      .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        font-family: 'Press Start 2P', cursive;
      }

      .popup p {
        margin: 0;
        text-align: center;
        font-size: 11px;
        line-height: 1.5;
        word-wrap: break-word;
        color: #1e1e1e;
        text-shadow: 0 0 1px #fff;
      }

      /* === ESTILOS PARA TIPO DEFAULT === */
      .popup.default {
        width: 100vw;
        max-width: 580px;
        aspect-ratio: 3/4;
        background-image: url("static/assets/sprites/UI/afiche_ventana.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        justify-content: space-between;
        padding: 3% 4%;
      }

      .popup.default .popup-title,
      .popup.default .popup-content,
      .popup.default .popup-footer {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
      }

      .popup.default .popup-title {
        flex: 0 0 18%;
        background-image: url("static/assets/sprites/UI/titulo_afiche.png");
      }

      .popup.default .popup-title .title {
        color: #fff;
        font-size: 12px;
        font-weight: 400;
        padding: 2px 15px;
      }

      .popup.default .popup-content {
        flex: 1 1 auto;
        background-image: url("static/assets/sprites/UI/contenido_afiche.png");
        padding: 12% 8%;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }

      .popup.default .popup-content p {
        text-align: justify;
        font-size: 9px;
        color: #1e1e1e;
        text-shadow: 0 0 1px #fff;
        margin-top: 0;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        z-index: 1;
      }

      .popup.default .popup-footer {
        flex: 0 0 15%;
        background-image: url("static/assets/sprites/UI/lenguajes_afiche.png");
        padding: 5px;
        box-sizing: border-box;
      }

      .popup.default .popup-content .link {
        margin-top: 12px;
        font-size: 9px;
        color: #0056b3;
        text-decoration: underline;
        cursor: pointer;
        word-break: break-word;
        text-align: start;
      }

      .popup.default .popup-content .link:hover {
        color: #003f80;
      }

      .popup.default .popup-icons {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        width: 100%;
        height: 100%;
        padding: 5px 1px;
      }

      .popup.default .popup-icons img {
        max-height: 90%;
        max-width: 15%;
        image-rendering: pixelated;
      }

      .popup.default .popup-badge {
        position: absolute;
        bottom: 50px;
        right: 1px;
        width: 35%;
        aspect-ratio: 2 / 1;
        background-image: url("static/assets/sprites/UI/marco_afiche.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        padding: 0px 2px;
      }

      .popup.default .popup-badge img {
        max-height: 90%;
        max-width: 90%;
        image-rendering: pixelated;
        padding-top: 5px;
      }

      /* === ESTILOS PARA TIPO SIMPLE === */
      .popup.simple {
        position: fixed;
        bottom: 8.5%;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 60%;
        min-width: 600px;
        top: auto;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        gap: 0;
      }

      .popup.simple .dialog-image-ii {
          width: 240px;
          height: 240px;
          background-image: url("static/assets/sprites/UI/icon_image.png");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          top: 260px;
          margin-right: auto;
      }

      .popup.simple .dialog-image-ii img {
          width: 55%;
          height: auto;
          object-fit: contain;
      }

      .popup.simple .dialog-link-ii {
        width: 40px;
        height: 40px;
        margin: 0 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 24px;
        color: #fff; /* color blanco para contraste */
        background-color: #555972; /* fondo negro */
        border-radius: 50%; /* forma redonda */
        border: 6px solid #b2adcd; 
        text-shadow: 0 0 1px #fff;
        transition: transform 0.2s ease;
        position: relative;
        top: 190px; 
        margin-right: auto;
        padding: 8px;
      }

      .popup.simple .dialog-link-ii:hover {
        transform: scale(1.2);
        background-color: #222;
      }

      .popup.simple .dialog-content-ii {
          flex: 1;
          background-image: url("static/assets/sprites/UI/window_content.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 100%;
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 23%;
          padding-bottom: 2.5%;
          padding-top: 2.5%;
          padding-right: 2.5%;
          box-sizing: border-box;
          margin-bottom: 20px;
      }

      .popup.simple .dialog-p-ii {
          background-image: url("static/assets/sprites/UI/window_dialog.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 35px 50px;
          box-sizing: border-box;
      }

      .popup.simple .dialog-p-ii p {
          margin: 0;
          font-size: 11px;
          text-align: justify;
          line-height: 1.5;
          color: #1e1e1e;
          text-shadow: 0 0 1px #fff;
          overflow-y: auto;
          max-height: 100%;
          width: 100%;
          word-wrap: break-word;
      }
      
      /* === ESTILOS PARA TIPO GALLERY === */
      .popup.gallery {
          position: fixed;
          bottom: 6%;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 900px;
          min-width: 600px;
          top: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
      }

      .popup.gallery .window-dialog-content{
          margin-top: 3%;
      }

      .popup.gallery .window-gallery-image {
          width: 100%;
          max-width: 95%;
          background-image: url("static/assets/sprites/UI/contenido_afiche_3.png");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 3 / 2;
      }

      .popup.gallery .window-gallery-image img {
          width: 35%;
          height: auto;
          object-fit: contain;
      }

      .popup.gallery .window-gallery-tittle {
          background-image: url("static/assets/sprites/UI/titulo_afiche_3.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 40%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: -3%;
      }

      .popup.gallery .window-gallery-tittle p {
          margin: 0;
          font-size: 10px;
          color: #1e1e1e;
          text-align: center;
      }

      .popup.gallery .window-gallery-content {
          background-image: url("static/assets/sprites/UI/window_content.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 100%;
          max-width: 90%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3.5%;
          padding-left: 10%;
      }

      .popup.gallery .window-dialog-p {
          background-image: url("static/assets/sprites/UI/window_dialog.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 35px 50px;
      }

      .popup.gallery .window-content-p {
          margin: 0;
          font-size: 12px;
          text-align: justify;
          line-height: 1.5;
          word-wrap: break-word;
          color: #1e1e1e;
          text-shadow: 0 0 1px #fff;
          width: 100%;
          overflow-y: auto;
          max-height: 100%;
      }

      /* === ESTILOS PARA TIPO PRINCIPAL === */
      .popup.principal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100vw;
        max-width: 580px;
        aspect-ratio: 3/4;
        background-image: url("static/assets/sprites/UI/afiche_ventana_2.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 3% 4%;
        box-sizing: border-box;
      }

      .popup.principal p {
          margin: 0;
          text-align: center;
          font-size: 11px;
          line-height: 1.5;
          word-wrap: break-word;
          color: #1e1e1e;
          text-shadow: 0 0 1px #fff;
      }

      .popup.principal .principal-title,
      .popup.principal .principal-content,
      .popup.principal .principal-footer {
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
      }

      .popup.principal .principal-title {
        flex: 0 0 18%;
        background-image: url("static/assets/sprites/UI/titulo_afiche.png");
      }

      .popup.principal .principal-title .title{
          color: #fff;
          font-size: 12px;
          font-weight: 400;
          padding: 2px 15px;
      }

      .popup.principal .principal-content {
          flex: 1 1 auto;
          background-image: url("static/assets/sprites/UI/contenido_afiche_2.png");
          padding: 12% 10%;
          box-sizing: border-box;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
      }

      .popup.principal .principal-content p {
        text-align: justify;
        font-size: 10px;
        color: #1e1e1e;
        text-shadow: 0 0 1px #fff;
        margin-top: 0;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        z-index: 1;
        margin-bottom: 5%;
      }

      .popup.principal .principal-footer {
          bottom: 0px; 
          background-image: url("static/assets/sprites/UI/lenguajes_afiche_2.png");
          padding: 5px;
          box-sizing: border-box;
      }

      .popup.principal .principal-icons {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        width: 100%;
        height: 100%;
        padding: 5px 1px;
        margin-bottom: auto;
      }

      .popup.principal .principal-icons img {
        max-height: 90%;
        max-width: 15%;
        image-rendering: pixelated;
      }

      .popup.principal .principal-badge {
          position: absolute;
          bottom: 50px;
          right: 1px;
          width: 35%;
          aspect-ratio: 2 / 1;
          background-image: url("static/assets/sprites/UI/marco_afiche.png");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          padding: 0px 2px;
          z-index: 50;
      }

      .popup.principal .principal-badge img{
          max-height: 90%;
          max-width: 90%;
          image-rendering: pixelated;
          padding-top: 5px;
      }

      .hidden {
        display: none !important;
      }

      @media (min-width: 768px) {
        .popup.default p {
          font-size: 8px;
        }
      }

      @media (min-width: 1024px) {
        .popup.default p {
          font-size: 10px;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  bindEvents() {
    document.addEventListener("keydown", (event) => {
      if (this.keyPressHandled) return;
      
      const key = event.key.toLowerCase();
      
      if (this.isVisible && (key === "e" || key === "x" || key === "escape")) {
        this.hide();
        this.keyPressHandled = true;
      }
    });

    document.addEventListener("keyup", () => {
      this.keyPressHandled = false;
    });
  }

  show(infoData) {
    if (!infoData || this.isVisible) return;

    this.currentData = infoData;
    this.currentType = infoData.type_ui || 'default';
    
    this.populateContent(infoData);

    this.modalBackground.classList.remove('hidden');
    this.popupElement.classList.remove('hidden');
    this.escape_hint.classList.remove('hidden');
    this.isVisible = true;
  }

  hide() {
    if (!this.isVisible) return;
    
    this.modalBackground.classList.add('hidden');
    this.popupElement.classList.add('hidden');
    this.escape_hint.classList.add('hidden');
    this.isVisible = false;
    this.currentData = null;
    this.currentType = 'default';
  }

  populateContent(data) {
    // Determinar el tipo de UI a usar
    const uiType = data.type_ui || data.typeUI || 'default';

    // Limpiar clases CSS anteriores y aplicar solo la clase base + tipo
    this.popupElement.className = 'popup ' + uiType;
    
    // Verificar si existe el renderizador para este tipo
    if (this.uiTypes[uiType]) {
      this.uiTypes[uiType](data);
    } else {
      this.popupElement.className = 'popup default';
      this.renderDefaultStyle(data);
    }
  }

  // === RENDERIZADORES POR TIPO DE UI ===

  renderDefaultStyle(data) {
    this.popupElement.innerHTML = `
      <div class="popup-title">
        <p class="title" id="popup-title-text">${data.title || 'Título'}</p>
      </div>
      <div class="popup-content">
        <div class="popup-badge">
            <img id="popup-badge-img" src="${data.projectIcon || ''}" alt="Project Icon">
        </div>
        <p class="content" id="popup-content-text">${data.content || 'Contenido'}</p>
        ${data.link ? `<a class="content link" href="${data.link}" target="_blank" rel="noopener noreferrer">Ver más</a>` : ''}
      </div>
      <div class="popup-footer">
        <div class="popup-icons" id="popup-icons-container">
          ${this.generateTechIcons(data.technologies || [])}
        </div>
      </div>
    `;
  }

  renderPrincipalStyle(data){
    this.popupElement.innerHTML = `
      <div class="principal-title">
        <p class="title" id="popup-title-text">${data.title || 'Título'}</p>
      </div>
      <div class="principal-content">
        <p class="content" id="popup-content-text">${data.content || 'Contenido'}</p>
        <div class="principal-footer">
          <div class="principal-icons" id="popup-icons-container">
            ${this.generateTechIcons(data.technologies || [])}
          </div>
        </div>
      </div>
    `;
  }

  renderSimpleStyle(data) {
    this.popupElement.innerHTML = `
      <div class="dialog-image-ii">
        <img src="${data.projectIcon || ''}" class="image">
      </div>
      <a href="${data.link}" class="dialog-link-ii" target="_blank" rel="noopener noreferrer" title="Ir al proyecto">
        🔗
      </a>
      <div class="dialog-content-ii">
        <div class="dialog-p-ii">
          <p class="content-p-ii" id="popup-content-text">${data.content || 'Sin descripción disponible'}</p>
        </div>
      </div>
    `;
  }

  renderGalleryStyle(data) {
    this.popupElement.innerHTML = `
      <div class="window-gallery-image">
        <img src="${data.projectIcon || ''}" class="gallery-image">
      </div>
      <div id="window-gallery-dialog" class="window-dialog-content">
        <div class="window-gallery-tittle">
          <p id="popup-title-text">${data.title || 'Proyecto'}</p>
        </div>
        <div class="window-gallery-content">
          <div class="window-dialog-p">
            <p class="window-content-p" id="popup-content-text">${data.content || 'Sin descripción disponible'}</p>
          </div>
        </div>
      </div>
    `;
  }

  renderProjectStyle(data) {
    this.popupElement.innerHTML = `
      <div class="project-header">
        <div class="project-title">${data.title || 'Proyecto'}</div>
        <div class="project-subtitle">Información detallada del proyecto</div>
      </div>
      <div class="project-content">
        <div class="project-description">${data.content || 'Sin descripción disponible'}</div>
        ${data.link ? `<a class="project-link" href="${data.link}" target="_blank" rel="noopener noreferrer">Ver proyecto en vivo</a>` : ''}
      </div>
      <div class="project-tech-grid">
        ${this.generateProjectTechCards(data.technologies || [])}
      </div>
    `;
  }

  // === MÉTODOS AUXILIARES PARA GENERAR CONTENIDO ===

  generateTechIcons(technologies) {
    return technologies.map(tech => 
      `<img src="${tech.icon}" alt="${tech.name}" title="${tech.name}">`
    ).join('');
  }

  generateGalleryTechItems(technologies) {
    return technologies.map(tech => `
      <div class="tech-item">
        <img src="${tech.icon}" alt="${tech.name}">
        <span>${tech.name}</span>
      </div>
    `).join('');
  }

  generateProjectTechCards(technologies) {
    return technologies.map(tech => `
      <div class="project-tech-card">
        <img src="${tech.icon}" alt="${tech.name}">
        <span>${tech.name}</span>
      </div>
    `).join('');
  }

  // === MÉTODOS DE EXTENSIBILIDAD ===

  registerUIType(typeName, renderFunction) {
    if (typeof renderFunction !== 'function') {
      console.error(`El renderizador para '${typeName}' debe ser una función`);
      return false;
    }
    
    this.uiTypes[typeName] = renderFunction.bind(this);
    return true;
  }

  getAvailableUITypes() {
    return Object.keys(this.uiTypes);
  }

  hasUIType(typeName) {
    return typeName in this.uiTypes;
  }

  // === MÉTODOS DE COMPATIBILIDAD ===

  updateTechIcons(technologies) {
    const iconsContainer = document.getElementById('popup-icons-container');
    if (!iconsContainer) return;

    iconsContainer.innerHTML = '';
    technologies.forEach(tech => {
      const img = document.createElement('img');
      img.src = tech.icon;
      img.alt = tech.name;
      img.title = tech.name;
      iconsContainer.appendChild(img);
    });
  }

  get visible() {
    return this.isVisible;
  }

  getCurrentData() {
    return this.currentData;
  }

  getCurrentType() {
    return this.currentType;
  }

  destroy() {
    if (this.popupElement && this.popupElement.parentNode) {
      this.popupElement.parentNode.removeChild(this.popupElement);
    }
    
    if (this.modalBackground && this.modalBackground.parentNode) {
      this.modalBackground.parentNode.removeChild(this.modalBackground);
    }
    
    if (this.escape_hint && this.escape_hint.parentNode) {
      this.escape_hint.parentNode.removeChild(this.escape_hint);
    }
    
    const styles = document.getElementById('interactive-popup-styles');
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
    }
  }
}
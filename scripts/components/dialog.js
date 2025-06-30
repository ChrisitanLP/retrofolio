// scripts/dialog.js - Versión mejorada con funcionalidades adicionales
import { DIALOG_CONFIG } from "../../config/dialog_config.js";
import { PortraitAnimator } from "../ui/portraitAnimator.js";

export class DialogManager {
  constructor() {
    const elements = DIALOG_CONFIG.elements;
    this.dialogBox = document.getElementById(elements.dialogBox);
    this.dialogText = document.getElementById(elements.dialogText);
    this.dialogName = document.getElementById(elements.dialogName);
    this.closeIcon = document.getElementById(elements.closeIcon);
    this.continueHint = document.getElementById(elements.continueHint);

    // Initialize portrait animator
    this.portraitAnimator = new PortraitAnimator(elements.npcPortrait);

    this.currentNPC = null;
    this.currentText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.timer = 0;
    this.typeSpeed = DIALOG_CONFIG.typeSpeed;
    this.isVisible = false;
    this.isDialogComplete = false;
    this.isTyping = false;

    this.gameStartCallback = null;
    this.dialogEndCallback = null; 

    // Bind close icon click event
    this.closeIcon.addEventListener('click', () => {
      this.handleCloseDialog();
    });
  }

  setDialogEndCallback(callback) {
    this.dialogEndCallback = callback;
  }

  setGameStartCallback(callback) {
    this.gameStartCallback = callback;
  }

  isDialogActiveAndBlocking() {
    return this.isVisible && this.currentNPC !== null;
  }

  async showDialog(npc) {
    
    // Always reset when showing dialog for any NPC
    this.currentNPC = npc;
    this.currentText = npc.getCurrentDialog();
    this.displayedText = "";
    this.charIndex = 0;
    this.timer = 0;
    this.isDialogComplete = false;
    this.isTyping = true;

    // Update UI elements
    this.dialogName.textContent = npc.getName();
    this.dialogText.textContent = "";

    // Hide close icon and show continue hint initially
    this.closeIcon.style.display = "none";
    this.continueHint.style.display = "block";

    // Load and start portrait animation
    try {
      const loaded = await this.portraitAnimator.loadSpritesheet(npc.getPortrait());
      if (loaded) {
        this.portraitAnimator.startAnimation();
      } else {
        console.error('Failed to load portrait for NPC:', npc.getName());
      }
    } catch (error) {
      console.error('Error loading portrait:', error);
    }

    // Show dialog box
    this.dialogBox.style.display = "flex";
    this.isVisible = true;
  }

  // Método para mostrar el diálogo del guía (introductorio)
  async showGuideDialog(guide) {
    // Resetear estado
    this.currentNPC = guide;
    this.currentText = guide.getCurrentDialog();
    this.displayedText = "";
    this.charIndex = 0;
    this.timer = 0;
    this.isDialogComplete = false;
    this.isTyping = true;

    // Actualizar elementos UI
    this.dialogName.textContent = guide.getName();
    this.dialogText.textContent = "";

    // Ocultar icono de cerrar y mostrar hint de continuar
    this.closeIcon.style.display = "none";
    this.continueHint.style.display = "block";

    // Crear overlay para bloquear el juego
    this.createOverlay();

    // Cargar y iniciar animación del retrato
    try {
      const loaded = await this.portraitAnimator.loadSpritesheet(guide.getPortrait());
      if (loaded) {
        this.portraitAnimator.startAnimation();
      } else {
        console.error('Error al cargar el retrato del guía');
      }
    } catch (error) {
      console.error('Error cargando retrato:', error);
    }

    // Cambiar el estilo del cuadro de diálogo para el guía
    this.dialogBox.className = "guide-dialog-container";
    this.dialogBox.style.display = "flex";
    this.isVisible = true;
  }

  // Método para crear el overlay que bloquea el juego
  createOverlay() {
    // Crear overlay si no existe
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'dialog-overlay';
      this.overlay.style.position = 'fixed';
      this.overlay.style.top = '0';
      this.overlay.style.left = '0';
      this.overlay.style.width = '100%';
      this.overlay.style.height = '100%';
      this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      this.overlay.style.zIndex = '1000';
      this.overlay.style.display = 'none';
      document.body.appendChild(this.overlay);
    }
    this.overlay.style.display = 'block';
  }

  // Método para ocultar el overlay
  hideOverlay() {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }

  hideDialog() {
    this.dialogBox.style.display = "none";
    this.portraitAnimator.stopAnimation();

    // Ocultar overlay
    this.hideOverlay();
    
    // Restaurar clase original del diálogo
    this.dialogBox.className = "dialog-container";
    
    // Reset current NPC dialog index for fresh conversations
    if (this.currentNPC) {
      this.currentNPC.resetDialog();
    }

    const wasGuideDialog = this.isGuideDialog();
    
    // CORREGIDO: Notificar que el diálogo ha terminado ANTES de limpiar el estado
    if (!wasGuideDialog && this.dialogEndCallback) {
      // Ejecutar callback en el siguiente tick para evitar problemas de sincronización
      setTimeout(() => {
        if (this.dialogEndCallback) {
          this.dialogEndCallback();
        }
      }, 0);
    }
    
    // Limpiar estado
    this.currentNPC = null;
    this.isVisible = false;
    this.isDialogComplete = false;
    this.isTyping = false;
    
    // Reset UI elements
    this.closeIcon.style.display = "none";
    this.continueHint.style.display = "block";
    
    // CORREGIDO: Callback del guía después de limpiar el estado
    if (wasGuideDialog && this.gameStartCallback) {
      setTimeout(() => {
        if (this.gameStartCallback) {
          this.gameStartCallback();
        }
      }, 0);
    }
  }

  isGuideDialog() {
    return this.currentNPC && this.currentNPC.id === "guide";
  }

  handleCloseDialog() {
    if (this.isDialogComplete) {
      this.hideDialog();
    }
  }

  update() {
    if (!this.isVisible || !this.currentNPC) return;

    // CORRECCIÓN: Siempre actualizar la animación del retrato
    this.portraitAnimator.update();

    // CORRECCIÓN: Typewriter effect - asegurar que funcione correctamente
    if (this.isTyping && this.charIndex < this.currentText.length) {
      this.timer++;
      if (this.timer % this.typeSpeed === 0) {
        this.displayedText += this.currentText.charAt(this.charIndex);
        this.dialogText.textContent = this.displayedText;
        this.charIndex++;
      }
    } else if (this.isTyping && this.charIndex >= this.currentText.length) {
      // CORRECCIÓN: Terminamos de escribir
      this.isTyping = false;

      // Check if this is the last dialog message
      if (this.currentNPC.isLastDialog()) {
        if (!this.isDialogComplete) {
          this.isDialogComplete = true;
          // Show close icon and hide continue hint
          this.closeIcon.style.display = "block";
          this.continueHint.style.display = "none";
        }
      }
    }
  }

  handleInteraction() {
    if (!this.currentNPC) {
      return;
    }

    // If dialog is complete (last message), close it
    if (this.isDialogComplete) {
      this.handleCloseDialog();
      return;
    }

    // If text is still typing, complete it immediately
    if (this.isTyping && this.charIndex < this.currentText.length) {
      this.displayedText = this.currentText;
      this.dialogText.textContent = this.displayedText;
      this.charIndex = this.currentText.length;
      this.isTyping = false;
      
      // Check if this was the last dialog after completing text
      if (this.currentNPC.isLastDialog()) {
        this.isDialogComplete = true;
        this.closeIcon.style.display = "block";
        this.continueHint.style.display = "none";
      }
      return;
    }

    // If we can move to next dialog
    if (!this.isTyping && !this.currentNPC.isLastDialog()) {
      this.currentNPC.nextDialog();
      this.currentText = this.currentNPC.getCurrentDialog();
      this.displayedText = "";
      this.charIndex = 0;
      this.timer = 0;
      this.isTyping = true;
      this.dialogText.textContent = "";

      // Restart animation for new dialog
      if (this.portraitAnimator.isLoaded()) {
        this.portraitAnimator.startAnimation();
      }
    }
    
    // CORREGIDO: Si llegamos aquí y es el último diálogo, marcarlo como completo
    if (!this.isTyping && this.currentNPC.isLastDialog()) {
      this.isDialogComplete = true;
      this.closeIcon.style.display = "block";
      this.continueHint.style.display = "none";
    }
  }

  // Handle keyboard input for closing dialog
  handleKeyInput(key) {
    if ((key === "Escape" || key === "e" || key === "E") && this.isDialogComplete) {
      this.handleCloseDialog();
    }
  }
}
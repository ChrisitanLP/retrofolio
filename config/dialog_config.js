// config/dialogConfig.js
export const DIALOG_CONFIG = {
  // Configuración general del sistema de diálogos
  typeSpeed: 3,
  
  // Elementos del DOM
  elements: {
    dialogBox: "dialog",
    dialogText: "dialogText",
    dialogName: "dialogName",
    closeIcon: "closeIcon",
    continueHint: "continueHint",
    npcPortrait: "npcPortrait"
  },
  
  // Estados del diálogo
  states: {
    HIDDEN: 0,
    TYPING: 1,
    WAITING: 2,
    COMPLETE: 3
  }
};

// Configuración específica del GuideNPC
export const GUIDE_CONFIG = {
  id: "guide",
  fallbackDialog: {
    name: "Guía",
    portrait: "",
    messages: ["Bienvenido al portafolio."]
  }
};
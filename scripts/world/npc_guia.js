// scripts/world/npc_guia.js - Versión actualizada

export class GuideNPC {
  constructor() {
    this.id = "guide";
    this.dialogData = DIALOG_DATA["guide"];
    this.dialogIndex = 0;
    this.currentRoom = null;
    this.visitType = "main"; // "main", "firstVisit", "return"
   
    if (!this.dialogData) {
      console.error("No se encontraron datos de diálogo para el guía");
      this.dialogData = {
        name: "Guía",
        portrait: "",
        messages: ["Bienvenido al portafolio."]
      };
    }
  }

  getName() {
    return this.dialogData.name;
  }

  getPortrait() {
    return this.dialogData.portrait;
  }

  // NUEVO: Método para configurar el diálogo según la sala y tipo de visita
  setRoomDialog(roomName, visitType = "firstVisit") {
    this.currentRoom = roomName;
    this.visitType = visitType;
    this.dialogIndex = 0;
  }

  // NUEVO: Método para resetear al diálogo principal
  resetToMainDialog() {
    this.currentRoom = null;
    this.visitType = "main";
    this.dialogIndex = 0;
  }

  getCurrentDialog() {
    let messages;

    // Si estamos en el diálogo principal (sala main o sin configuración específica)
    if (!this.currentRoom || this.visitType === "main") {
      messages = this.dialogData.messages;
    } 
    // Si estamos en una sala específica
    else if (this.dialogData.roomDialogs && 
             this.dialogData.roomDialogs[this.currentRoom] && 
             this.dialogData.roomDialogs[this.currentRoom][this.visitType]) {
      messages = this.dialogData.roomDialogs[this.currentRoom][this.visitType];
    } 
    // Fallback al diálogo principal si no se encuentra la configuración
    else {
      messages = this.dialogData.messages;
    }

    if (!messages || this.dialogIndex >= messages.length) {
      return "Error: No hay más mensajes.";
    }

    return messages[this.dialogIndex];
  }

  nextDialog() {
    let messages = this.getMessagesArray();

    if (this.dialogIndex < messages.length - 1) {
      this.dialogIndex++;
    }
  }

  isLastDialog() {
    let messages = this.getMessagesArray();
    return this.dialogIndex >= messages.length - 1;
  }

  resetDialog() {
    this.dialogIndex = 0;
  }

  // NUEVO: Método auxiliar para obtener el array de mensajes actual
  getMessagesArray() {
    if (!this.currentRoom || this.visitType === "main") {
      return this.dialogData.messages;
    } else if (this.dialogData.roomDialogs && 
               this.dialogData.roomDialogs[this.currentRoom] && 
               this.dialogData.roomDialogs[this.currentRoom][this.visitType]) {
      return this.dialogData.roomDialogs[this.currentRoom][this.visitType];
    } else {
      return this.dialogData.messages;
    }
  }

  // NUEVO: Método de conveniencia para obtener el tipo de visita actual
  getVisitType() {
    return this.visitType;
  }

  // NUEVO: Método de conveniencia para obtener la sala actual
  getCurrentRoom() {
    return this.currentRoom;
  }

  // NUEVO: Método para debugging
  getDebugInfo() {
    return {
      currentRoom: this.currentRoom,
      visitType: this.visitType,
      dialogIndex: this.dialogIndex,
      totalMessages: this.getMessagesArray().length,
      isLastDialog: this.isLastDialog()
    };
  }
}
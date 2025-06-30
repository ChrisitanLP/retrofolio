// scripts/core/main.js - Versión mejorada con MapManager
import { DialogManager } from "../components/dialog.js";
import { Player } from "../components/player.js";
import { WallManager } from "../components/wallManager.js";
import { GestorDecoraciones } from "../world/decoration.js";
import { GuideNPC } from "../world/npc_guia.js";
import { NPC } from "../components/npc.js";
import { MapManager } from "./mapManager.js";
import { MainMapConfig } from "../../data/maps/main_map.js";
import { ProyectosMapConfig } from "../../data/maps/proyectos_map.js";
import { HabilidadesMapConfig } from "../../data/maps/habilidades_map.js";
import { ContactMapConfig } from "../../data/maps/contact_map.js";
import { CollisionWalls } from "../world/collision_wall.js";
import { InteractiveInfoWindow } from "../ui/interactiveInfo.js";
import { GestorDecoracionesInteractivas } from "../world/interactiveDecoration.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    // Inicializar componentes básicos
    this.player = new Player(960, 800);
    this.dialogManager = new DialogManager();
    this.wallManager = new WallManager(this.canvas.width, this.canvas.height);
    
    // CORREGIDO: Inicializar el gestor de decoraciones interactivas correctamente
    this.gestorDecoraciones = new GestorDecoracionesInteractivas(new GestorDecoraciones());
    this.interactiveDecorationManager = this.gestorDecoraciones;
    
    this.guideNPC = new GuideNPC();
    this.collisionWalls = new CollisionWalls();
    this.interactiveInfoWindow = new InteractiveInfoWindow();
    
    // Inicializar MapManager
    this.mapManager = new MapManager(this);
    
    // Estados del juego
    this.gameStarted = false;
    this.introDialogShown = false;
    this.npcs = [];

    // Configuración de mapas disponibles
    this.availableMaps = {
      main: MainMapConfig,
      left: ProyectosMapConfig,
      right: HabilidadesMapConfig,
      bottom: ContactMapConfig
    };

    // Get interaction prompt element
    this.interactionPrompt = document.getElementById("interactionPrompt");
    if (this.interactionPrompt) {
      this.interactionPrompt.style.display = "none";
    }

    // Cargar el mapa inicial
    this.loadMap('left');

    this.floorPattern = null;
    this.loadFloorTexture();

    // Current nearby NPC tracking
    this.nearbyNPC = null;
    this.nearbyDecoration = null;
    this.dialogActive = false;
    this.keyPressHandled = false;

    // Flag para controlar si el prompt está visible
    this.promptVisible = false;

    // Debug mode toggle
    this.debugMode = false;

    // Add interaction keys
    document.addEventListener("keydown", (e) => {
      this.handleKeyPress(e);
    });

    // Agregar keyup para resetear el flag
    document.addEventListener("keyup", (e) => {
      this.handleKeyUp(e);
    });

    this.dialogManager.setGameStartCallback(() => {
      this.gameStarted = true;
      this.dialogActive = false;
      this.checkProximities();
    });

    this.gameLoop();
  }

  // Método para cargar un mapa específico
  async loadMap(mapName) {
    const mapConfig = this.availableMaps[mapName];
    if (!mapConfig) {
      console.error(`Mapa no encontrado: ${mapName}`);
      return;
    }

    try {
      this.nearbyNPC = null;
      this.nearbyDecoration = null;
      this.hideInteractionPrompt();
      this.gestorDecoraciones.limpiarInteractivas();
      await mapConfig.init(this);

      if (this.gameStarted && !this.dialogActive) {
        setTimeout(() => this.checkProximities(), 100);
      }
    } catch (error) {
      console.error(`Error cargando mapa ${mapName}:`, error);
      throw error;
    }
  }

  handleKeyPress(e) {
    if (this.keyPressHandled) return;
    
    const key = e.key.toLowerCase();

    // Debug mode toggle
    if (key === "p") {
      this.debugMode = !this.debugMode;
      this.keyPressHandled = true;
      return;
    }

    // Manejo de teclas para ventana de información interactiva
    if (this.interactiveInfoWindow.visible) {
      if (key === "e" || key === "x" || key === "escape") {
        this.interactiveInfoWindow.hide();
        this.keyPressHandled = true;
        setTimeout(() => this.checkProximities(), 50);
      }
      return;
    }

    if (this.dialogActive && this.dialogManager.isVisible) {
      if (key === " " || key === "enter") {
        e.preventDefault();
        this.dialogManager.handleInteraction();
        this.keyPressHandled = true;
      } else if (key === "escape" || key === "e") {
        if (this.dialogManager.isGuideDialog() && this.dialogManager.isDialogComplete) {
          this.dialogManager.handleKeyInput(key);
          this.keyPressHandled = true;
        } else if (!this.dialogManager.isGuideDialog()) {
          this.dialogManager.handleKeyInput(key);
          this.keyPressHandled = true;
        }
      }
    } else if (!this.dialogActive && this.gameStarted) {
      if ((key === "x" || key === "e")) {
        // Prioridad para decoraciones interactivas
        if (this.nearbyDecoration) {
          this.handleDecorationInteraction();
          this.keyPressHandled = true;
        } else if (this.nearbyNPC) {
          this.startDialog(this.nearbyNPC);
          this.keyPressHandled = true;
        }
      }
    }
  }

  // CORREGIDO: Maneja la interacción con decoraciones
  handleDecorationInteraction() {
    if (this.nearbyDecoration && this.nearbyDecoration.isInteractive) {
      const infoData = this.nearbyDecoration.getInteractionInfo();
      if (infoData) {
        this.interactiveInfoWindow.show(infoData);
        this.hideInteractionPrompt();
      }
    }
  }

  handleKeyUp(e) {
    this.keyPressHandled = false;
  }

  async startGuideDialog() {
    if (this.dialogActive) {
      return;
    }
    
    this.dialogActive = true;
    this.hideInteractionPrompt(); // CORREGIDO: Ocultar prompt durante diálogo
    
    const wasGameStarted = this.gameStarted;
    this.gameStarted = false;
    
    try {
      await this.dialogManager.showGuideDialog(this.guideNPC);
      
      while (this.dialogManager.isVisible) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
    } catch (error) {
      console.error('Error mostrando diálogo del guía:', error);
    } finally {
      this.gameStarted = wasGameStarted || true;
      this.dialogActive = false;
      // CORREGIDO: Verificar proximidades después del diálogo del guía
      if (this.gameStarted) {
        setTimeout(() => this.checkProximities(), 50);
      }
    }
  }

  async startIntroDialog() {
    if (this.introDialogShown) return;
    
    this.introDialogShown = true;
    this.gameStarted = false; 
    this.dialogActive = true;
    this.hideInteractionPrompt(); // CORREGIDO: Ocultar prompt durante intro
    
    try {
      await this.dialogManager.showGuideDialog(this.guideNPC);
    } catch (error) {
      console.error('Error mostrando diálogo introductorio:', error);
    }
  }

  startDialog(npc) {
    if (this.dialogActive) {
      return;
    }
    
    this.dialogActive = true;
    this.hideInteractionPrompt();
    
    // CORREGIDO: Callback para cuando el diálogo termine
    this.dialogManager.setDialogEndCallback(() => {
      this.dialogActive = false;
      // IMPORTANTE: Forzar limpieza del estado de proximidad
      this.nearbyNPC = null;
      this.nearbyDecoration = null;
      
      // Verificar proximidades después de un pequeño delay
      setTimeout(() => {
        if (this.gameStarted && !this.interactiveInfoWindow.visible) {
          this.checkProximities();
        }
      }, 100); // Aumentado el delay para asegurar limpieza
    });
    
    this.dialogManager.showDialog(npc);
  }

  canStartGame() {
    return this.gameStarted;
  }

  showInteractionPrompt(isDecoration = false) {
    // Solo mostrar si no hay diálogos activos y no hay ventanas de información activas
    if (!this.dialogActive && !this.interactiveInfoWindow.visible && this.interactionPrompt) {
      const newText = isDecoration ? "Presiona [X] para inspeccionar" : "Presiona [X] para hablar";
      
      // Solo actualizar si el texto ha cambiado o si el prompt no está visible
      if (this.interactionPrompt.textContent !== newText || !this.promptVisible) {
        this.interactionPrompt.textContent = newText;
        this.interactionPrompt.style.display = "block";
        this.promptVisible = true;
      }
    }
  }

  hideInteractionPrompt() {
    if (this.interactionPrompt && this.promptVisible) {
      this.interactionPrompt.style.display = "none";
      this.promptVisible = false; // CORREGIDO: era true, debe ser false
    }
  }

  resizeCanvas() {
    const oldWidth = this.canvas.width;
    const oldHeight = this.canvas.height;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    if (this.wallManager && (oldWidth !== this.canvas.width || oldHeight !== this.canvas.height)) {
      this.wallManager.updateCanvasSize(this.canvas.width, this.canvas.height);
    }
  }

  async loadFloorTexture() {
    try {
      const floorImage = await Utils.loadImage("static/assets/sprites/tilesets/floor/baldosa.png");

      const scale = 0.4;
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = floorImage.width * scale;
      tempCanvas.height = floorImage.height * scale;

      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.drawImage(floorImage, 0, 0, tempCanvas.width, tempCanvas.height);

      tempCtx.fillStyle = "rgba(255, 255, 255, 0.6)";
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      const scaledFloorImage = new Image();
      scaledFloorImage.src = tempCanvas.toDataURL();

      scaledFloorImage.onload = () => {
        this.floorPattern = this.ctx.createPattern(scaledFloorImage, "repeat");
      };
    } catch (error) {
      console.error("Failed to load floor texture:", error);
    }
  }

  // CORRECCIÓN 3: update() en main.js - mejorar la lógica de limpieza de estado
  update() {
    if (!this.introDialogShown && !this.dialogActive) {
      this.startIntroDialog();
      return;
    }

    if (this.dialogActive && this.dialogManager.isVisible) {
      this.dialogManager.update();
      
      // CORREGIDO: Verificar si el diálogo se cerró desde el DialogManager
      if (!this.dialogManager.isVisible && this.dialogActive) {
        this.dialogActive = false;
        // IMPORTANTE: Limpiar estados de proximidad cuando el diálogo se cierra
        this.nearbyNPC = null;
        this.nearbyDecoration = null;
        
        if (this.gameStarted) {
          setTimeout(() => this.checkProximities(), 100);
        }
      }
      return;
    }

    if (this.gameStarted && !this.dialogActive && !this.interactiveInfoWindow.visible) {
      this.mapManager.checkExitZones(this.player.x, this.player.y);

      if (this.player.canMove !== false) {
        this.player.update(
          this.canvas.width, 
          this.canvas.height, 
          this.wallManager, 
          this.gestorDecoraciones,
          this.npcs,
          this.dialogManager,
          this.collisionWalls
        );
      }

      this.npcs.forEach(npc => npc.update());

      // CORREGIDO: Llamar a checkProximities en cada frame cuando el juego está activo
      this.checkProximities();
    } else {
      // CORREGIDO: Asegurar limpieza cuando el juego no está activo
      this.hideInteractionPrompt();
      this.nearbyNPC = null;
      this.nearbyDecoration = null;
    }
  }

  checkProximities() {
    // No verificar proximidades si el juego no está iniciado o hay diálogos/ventanas activas
    if (!this.gameStarted || this.dialogActive || this.interactiveInfoWindow.visible) {
      this.hideInteractionPrompt();
      this.nearbyNPC = null;
      this.nearbyDecoration = null;
      return;
    }

    // Verificar proximidad con NPCs - CORREGIDO: verificación más estricta
    const currentNearbyNPC = this.npcs.find(npc => {
      if (npc && typeof npc.isNearPlayer === 'function') {
        return npc.isNearPlayer(this.player.x, this.player.y);
      }
      return false;
    });
    
    // Verificar proximidad con decoraciones interactivas
    let decorationProximity = { nearbyInteractive: null, justEnteredRange: false };
    if (this.gestorDecoraciones && this.gestorDecoraciones.checkPlayerProximity) {
      decorationProximity = this.gestorDecoraciones.checkPlayerProximity(this.player.x, this.player.y);
    }
    
    // CORREGIDO: Guardar estados anteriores para comparación
    const previousNearbyNPC = this.nearbyNPC;
    const previousNearbyDecoration = this.nearbyDecoration;
    
    // CORREGIDO: Actualizar estados actuales
    this.nearbyNPC = currentNearbyNPC || null; // Asegurar que sea null si no hay NPC
    this.nearbyDecoration = decorationProximity.nearbyInteractive || null;

    // CORREGIDO: Lógica mejorada para mostrar/ocultar prompt
    const hasNearbyDecoration = this.nearbyDecoration !== null;
    const hasNearbyNPC = this.nearbyNPC !== null;

    if (hasNearbyDecoration) {
      // Prioridad a decoraciones interactivas
      if (previousNearbyDecoration !== this.nearbyDecoration || !this.promptVisible) {
        this.showInteractionPrompt(true);
      }
    } else if (hasNearbyNPC) {
      // Mostrar prompt para NPC solo si no hay decoraciones cerca
      if (previousNearbyNPC !== this.nearbyNPC || !this.promptVisible) {
        this.showInteractionPrompt(false);
      }
    } else {
      // CORREGIDO: No hay nada cerca, asegurar que se oculte el prompt
      if (this.promptVisible || previousNearbyNPC !== null || previousNearbyDecoration !== null) {
        this.hideInteractionPrompt();
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.floorPattern) {
      this.ctx.fillStyle = this.floorPattern;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    if (this.wallManager) {
      this.wallManager.draw(this.ctx);
    }

    this.gestorDecoraciones.dibujarAnteriores(this.ctx, this.player);

    const entities = [
      ...this.npcs.map(npc => ({ obj: npc, type: "npc", y: npc.y })),
      { obj: this.player, type: "player", y: this.player.y }
    ];

    entities.sort((a, b) => a.y - b.y);

    entities.forEach(entity => {
      entity.obj.draw(this.ctx);
    });

    this.gestorDecoraciones.dibujarPosteriores(this.ctx, this.player);

    if (this.debugMode) {
      this.drawDebugInfo();
      this.gestorDecoraciones.dibujarColisionesDebug(this.ctx);
      this.gestorDecoraciones.dibujarZonasSuperioresDebug(this.ctx);
      this.mapManager.drawExitZones(this.ctx);
      this.gestorDecoraciones.drawInteractionRanges(this.ctx);

      this.collisionWalls.setDebugMode(true);
      this.collisionWalls.draw(this.ctx);
    }
  }

  // Método drawDebugInfo modificado - agregar información de ocultación
  drawDebugInfo() {
    if (this.wallManager) {
      this.wallManager.drawCollisionMap(this.ctx, 0.8);
    }

    this.player.drawCollisionBox(this.ctx);

    this.npcs.forEach(npc => {
      npc.drawCollisionBox(this.ctx, "purple");
    });

    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.font = "12px Arial";

    const decoracionesEnZonaSuperior = this.gestorDecoraciones.decoraciones.filter(
      decoracion => decoracion.jugadorEnZonaSuperior(this.player)
    ).length;

    const wallStats = this.collisionWalls.getStats();
    const interactiveStats = this.gestorDecoraciones.getStats();
    
    const debugText = [
      "DEBUG MODE (P to toggle)",
      `Player: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`,
      `Current Map: ${this.mapManager.getCurrentMap()}`,
      `Nearby NPC: ${this.nearbyNPC ? this.nearbyNPC.id : 'None'}`,
      `Nearby Decoration: ${this.nearbyDecoration ? 'Yes' : 'None'}`,
      `Prompt Visible: ${this.promptVisible}`,
      `Wall Manager: ${this.wallManager.isLoaded ? "Loaded" : "Loading..."}`,
      `Collision Walls: ${wallStats.total} total, ${wallStats.active} active, ${wallStats.hidingZones} hiding zones`,
      `Player Hidden: ${this.player.isHidden ? 'Yes' : 'No'}`,
      `Player Opacity: ${this.player.hidingTransition.current.toFixed(2)}`,
      `Decoraciones en zona superior: ${decoracionesEnZonaSuperior}`,
      `Interactive Decorations: ${interactiveStats.total} total, ${interactiveStats.interactive} interactive, ${interactiveStats.inRange} in range`,
      `Game Started: ${this.gameStarted}`,
      `Dialog Active: ${this.dialogActive}`,
      `Transitioning: ${this.mapManager.isTransitioning}`,
      "Red box: Player collision area",
      "Green rectangles: Inactive collision walls",
      "Blue rectangles: Hiding zones",
      "Blue boxes: Decoration collision areas", 
      "Green areas: Depth zones (upper areas of decorations)",
      "Purple boxes: NPC collision areas",
      "Magenta boxes: Exit zones",
      "Yellow circles: Interactive decoration ranges"
    ];

    // NUEVO: Mostrar información específica de la zona de ocultación si está activa
    if (this.player.isHidden && this.player.hidingEffect) {
      debugText.push(`Hiding Zone: ${this.player.hidingEffect.zone.id}`);
      debugText.push(`Hide Type: ${this.player.hidingEffect.type}`);
      debugText.push(`Target Opacity: ${this.player.hidingEffect.opacity}`);
    }

    debugText.forEach((text, index) => {
      const y = 20 + (index * 15);
      this.ctx.strokeText(text, 10, y);
      this.ctx.fillText(text, 10, y);
    });
    
    this.ctx.restore();
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  destroy() {
    if (this.mapManager) {
      this.mapManager.destroy();
    }
  }
}

// Initialize game when page loads
window.addEventListener("load", () => {
  window.game = new Game();
});
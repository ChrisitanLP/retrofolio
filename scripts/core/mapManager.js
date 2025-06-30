// scripts/core/mapManager.js
export class MapManager {
  constructor(game) {
    this.game = game;
    this.currentMap = 'main';
    this.isTransitioning = false;
    this.transitionCallback = null;
    
    // NUEVO: Sistema de tracking de visitas para diálogos del guía
    this.visitedRooms = new Set();
    this.shouldShowGuideDialog = false;
    this.pendingGuideDialog = null;
    
    // Configuración de transición
    this.transitionDuration = 1800; // ms
    this.fadeElement = null;
    
    this.createTransitionOverlay();
    this.setupExitZones();
  }

  createTransitionOverlay() {
    // Crear overlay de transición si no existe
    this.fadeElement = document.getElementById('transition-overlay');
    if (!this.fadeElement) {
      this.fadeElement = document.createElement('div');
      this.fadeElement.id = 'transition-overlay';
      this.fadeElement.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #000;
        opacity: 0;
        pointer-events: none;
        z-index: 1000;
        transition: opacity ${this.transitionDuration / 2}ms ease-in-out;
      `;
      document.body.appendChild(this.fadeElement);
    }
  }

  setupExitZones() {
    // Definir zonas de salida para cada mapa
    this.exitZones = {
      main: [
        {
          name: 'leftExit',
          x: 0, y: 550, width: 90, height: 400,
          targetMap: 'left',
          playerSpawn: { x: 1800, y: 725 }
        },
        {
          name: 'rightExit', 
          x: 1820, y: 550, width: 90, height: 400,
          targetMap: 'right',
          playerSpawn: { x: 100, y: 725 }
        },
        {
          name: 'bottomExit', 
          x: 803, y: 860, width: 300, height: 200,
          targetMap: 'bottom',
          playerSpawn: { x: 960, y: 160 }
        }
      ],
      left: [
        {
          name: 'returnToMain',
          x: 1820, y: 550, width: 90, height: 400,
          targetMap: 'main',
          playerSpawn: { x: 100, y: 725 }
        }
      ],
      right: [
        {
          name: 'returnToMain',
          x: 0, y: 550, width: 90, height: 400,
          targetMap: 'main', 
          playerSpawn: { x: 1800, y: 725 }
        }
      ],
      bottom: [
        {
          name: 'returnToMain',
          x: 803, y: 60, width: 300, height: 50,
          targetMap: 'main', 
          playerSpawn: { x: 960, y: 830 }
        }
      ]
    };
  }

  checkExitZones(playerX, playerY) {
    if (this.isTransitioning) return;

    const currentExitZones = this.exitZones[this.currentMap] || [];
    
    for (const zone of currentExitZones) {
      if (this.isPlayerInZone(playerX, playerY, zone)) {
        this.initiateTransition(zone.targetMap, zone.playerSpawn);
        break;
      }
    }
  }

  isPlayerInZone(playerX, playerY, zone) {
    return playerX >= zone.x && 
           playerX <= zone.x + zone.width &&
           playerY >= zone.y && 
           playerY <= zone.y + zone.height;
  }

  async initiateTransition(targetMap, spawnPosition) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Bloquear movimiento del jugador
    this.game.player.canMove = false;
    
    try {
      // Fase 1: Fundido a negro
      await this.fadeOut();
      
      // Fase 2: Cambiar mapa
      await this.switchToMap(targetMap, spawnPosition);
      
      // Fase 3: Fundido desde negro
      await this.fadeIn();
      
      // NUEVO: Fase 4: Manejar diálogo del guía si es necesario
      await this.handlePostTransitionGuideDialog();
      
    } catch (error) {
      console.error('Error durante la transición:', error);
    } finally {
      // Restaurar movimiento del jugador
      this.game.player.canMove = true;
      this.isTransitioning = false;
    }
  }

  fadeOut() {
    return new Promise((resolve) => {
      this.fadeElement.style.opacity = '1';
      setTimeout(resolve, this.transitionDuration / 2);
    });
  }

  fadeIn() {
    return new Promise((resolve) => {
      this.fadeElement.style.opacity = '0';
      setTimeout(resolve, this.transitionDuration / 2);
    });
  }

  async switchToMap(mapName, spawnPosition) {
    const previousMap = this.currentMap;
    this.currentMap = mapName;
    
    // NUEVO: Preparar diálogo del guía antes del cambio de mapa
    this.prepareGuideDialog(mapName, previousMap);
    
    // Reposicionar jugador
    this.game.player.x = spawnPosition.x;
    this.game.player.y = spawnPosition.y;
    
    // Cargar nuevo mapa
    try {
      await this.game.loadMap(mapName);
    } catch (error) {
      console.error(`Error cargando mapa ${mapName}:`, error);
      // Rollback en caso de error
      this.currentMap = previousMap;
      throw error;
    }
  }

  // NUEVO: Preparar el diálogo del guía según el mapa de destino
  prepareGuideDialog(newMap, previousMap) {
    // Solo mostrar diálogos del guía cuando:
    // 1. Venimos del mapa principal (main)
    // 2. Vamos a una sala secundaria (no main)
    if (previousMap === 'main' && newMap !== 'main') {
      // Determinar si es primera visita o regreso
      const visitType = this.visitedRooms.has(newMap) ? 'return' : 'firstVisit';
      
      // Configurar el diálogo del guía
      this.pendingGuideDialog = {
        room: newMap,
        visitType: visitType
      };
      
      this.shouldShowGuideDialog = true;
      
      // Marcar como visitada
      this.visitedRooms.add(newMap);
    } 
    // Si regresamos al mapa principal, resetear el guía
    else if (newMap === 'main') {
      this.shouldShowGuideDialog = false;
      this.pendingGuideDialog = null;
      
      // Resetear el guía al diálogo principal
      if (this.game.guideNPC) {
        this.game.guideNPC.resetToMainDialog();
      }
    }
  }

  // NUEVO: Manejar el diálogo del guía después de la transición
  async handlePostTransitionGuideDialog() {
    if (this.shouldShowGuideDialog && this.pendingGuideDialog && this.game.guideNPC) {
      // Configurar el diálogo específico de la sala
      this.game.guideNPC.setRoomDialog(
        this.pendingGuideDialog.room, 
        this.pendingGuideDialog.visitType
      );
      
      // Pequeña pausa para que la transición se complete visualmente
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Iniciar el diálogo del guía
      await this.game.startGuideDialog();
      
      // Limpiar flags
      this.shouldShowGuideDialog = false;
      this.pendingGuideDialog = null;
    }
  }

  getCurrentMap() {
    return this.currentMap;
  }

  // NUEVO: Método para verificar si una sala ha sido visitada
  hasVisitedRoom(roomName) {
    return this.visitedRooms.has(roomName);
  }

  // NUEVO: Método para obtener todas las salas visitadas
  getVisitedRooms() {
    return Array.from(this.visitedRooms);
  }

  // NUEVO: Método para resetear el historial de visitas (útil para debugging)
  resetVisitHistory() {
    this.visitedRooms.clear();
  }

  // Debug: dibujar zonas de salida
  drawExitZones(ctx) {
    const zones = this.exitZones[this.currentMap] || [];
    
    ctx.save();
    ctx.strokeStyle = '#ff00ff';
    ctx.fillStyle = 'rgba(255, 0, 255, 0.2)';
    ctx.lineWidth = 2;
    
    zones.forEach(zone => {
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
      
      // Etiqueta
      ctx.fillStyle = '#ff00ff';
      ctx.font = '12px monospace';
      ctx.fillText(zone.name, zone.x + 5, zone.y + 15);
      ctx.fillStyle = 'rgba(255, 0, 255, 0.2)';
    });
    
    // NUEVO: Mostrar información de debug sobre visitas
    if (this.visitedRooms.size > 0) {
      ctx.fillStyle = '#00ff00';
      ctx.font = '14px monospace';
      ctx.fillText(`Salas visitadas: ${Array.from(this.visitedRooms).join(', ')}`, 10, 30);
    }
    
    ctx.restore();
  }

  destroy() {
    if (this.fadeElement) {
      this.fadeElement.remove();
    }
  }
}
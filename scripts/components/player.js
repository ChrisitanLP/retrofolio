import { PLAYER_CONFIG } from "../../config/player_config.js";

export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.frameX = 0;
    this.frameYBase = 0;
    this.sideToggle = 0;
    this.frameCounter = 0;
    this.lastDirection = "down";
    this.sprite = null;
    
    this.scale = PLAYER_CONFIG.scale;
    this.frameWidth = PLAYER_CONFIG.frameWidth;
    this.frameHeight = PLAYER_CONFIG.frameHeight;
    this.totalFrames = PLAYER_CONFIG.totalFrames;
    this.moveSpeed = PLAYER_CONFIG.moveSpeed;
    
    this.collisionWidth = this.frameWidth * this.scale * PLAYER_CONFIG.collisionScale.width;
    this.collisionHeight = this.frameHeight * this.scale * PLAYER_CONFIG.collisionScale.height;
    
    // Nuevas propiedades para animación idle
    this.isIdle = true;
    this.idleFrameCounter = 0;
    this.idleFrameSpeed = PLAYER_CONFIG.idle.frameSpeed; // Velocidad de animación idle (más lenta que caminar)
    this.idleFrameX = 0;
    this.idleMaxFrames = PLAYER_CONFIG.idle.maxFrames; // Frames disponibles para idle
    
    // Mapeo de direcciones para animación idle (corregido según spritesheet)
    this.idleDirectionMap = PLAYER_CONFIG.idle.directionMap;
    
    // Mapeo de direcciones para animación de movimiento
    this.moveDirectionMap = PLAYER_CONFIG.movement.directionMap;
    
    this.keys = { ...PLAYER_CONFIG.controls };

    // NUEVAS PROPIEDADES: Sistema de ocultación
    this.hidingEffect = null; // Efecto de ocultación actual
    this.isHidden = false; // Si el jugador está oculto
    this.hidingTransition = {
      current: 1.0, // Opacidad actual (1.0 = visible, 0.0 = invisible)
      target: 1.0,  // Opacidad objetivo
      speed: 0.1    // Velocidad de transición
    };
    
    this.setupInput();
    this.loadSprite();
  }

  async loadSprite() {
    try {
      this.sprite = await Utils.loadImage("static/assets/sprites/characters/player/RACCOONSPRITESHEET.png");
    } catch (error) {
      console.error("Failed to load player sprite:", error);
    }
  }

  setupInput() {
    document.addEventListener("keydown", (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = false;
      }
    });
  }

  update(canvasWidth, canvasHeight, wallManager = null, gestorDecoraciones = null, npcs = null, dialogManager = null, collisionWalls = null) {
    // MEJORADO: Verificación más específica del estado del diálogo
    if (dialogManager && dialogManager.isDialogActiveAndBlocking()) {
      // Durante el diálogo, mantener animación idle
      this.updateIdleAnimation();
      return;
    }
    
    let moving = false;
    let nextX = this.x;
    let nextY = this.y;
    let currentDirection = this.lastDirection;

    // Detectar movimiento y dirección
    if (this.keys.ArrowDown) {
      nextY += this.moveSpeed;
      currentDirection = "down";
      moving = true;
    } else if (this.keys.ArrowLeft) {
      nextX -= this.moveSpeed;
      currentDirection = "left";
      moving = true;
    } else if (this.keys.ArrowRight) {
      nextX += this.moveSpeed;
      currentDirection = "right";
      moving = true;
    } else if (this.keys.ArrowUp) {
      nextY -= this.moveSpeed;
      currentDirection = "up";
      moving = true;
    }

    if (moving) {
      // El jugador se está moviendo
      this.isIdle = false;
      this.lastDirection = currentDirection;
      this.frameYBase = this.moveDirectionMap[currentDirection];
      
      // Verificar colisión antes de mover
      if (!this.detectCollision(nextX, nextY, canvasWidth, canvasHeight, wallManager, gestorDecoraciones, npcs, collisionWalls)) {
        this.x = nextX;
        this.y = nextY;
      } else {
        // Si hay colisión, intentar movimiento solo en X o solo en Y
        if (!this.detectCollision(nextX, this.y, canvasWidth, canvasHeight, wallManager, gestorDecoraciones, npcs, collisionWalls)) {
          this.x = nextX;
        } else if (!this.detectCollision(this.x, nextY, canvasWidth, canvasHeight, wallManager, gestorDecoraciones, npcs, collisionWalls)) {
          this.y = nextY;
        }
      }
      
      // Actualizar animación de movimiento
      this.updateMovementAnimation();
    } else {
      // El jugador no se está moviendo - activar modo idle
      if (!this.isIdle) {
        this.transitionToIdle();
      }
      this.updateIdleAnimation();
    }
  }

  updateMovementAnimation() {
    this.frameCounter++;
    if (this.frameCounter % 10 === 0) {
      this.frameX = (this.frameX + 1) % this.totalFrames;
      this.sideToggle = 1 - this.sideToggle;
    }
  }

  transitionToIdle() {
    this.isIdle = true;
    this.idleFrameCounter = 0;
    this.idleFrameX = 0;
    
    // Asegurar que usamos la fila correcta para idle según la última dirección
    this.frameYBase = this.idleDirectionMap[this.lastDirection];
    this.frameX = 0; // Comenzar desde el primer frame de idle
    this.sideToggle = 0; // Resetear sideToggle para idle
    
  }

  updateIdleAnimation() {
    this.idleFrameCounter++;
    
    // Animación idle más lenta y sutil
    if (this.idleFrameCounter % this.idleFrameSpeed === 0) {
      this.idleFrameX = (this.idleFrameX + 0) % this.idleMaxFrames;
      this.frameX = this.idleFrameX;
      
      // Para idle, mantenemos la misma fila (dirección) y solo alternamos sideToggle
      // Esto asegura que el personaje permanezca mirando hacia la última dirección
      this.frameYBase = this.idleDirectionMap[this.lastDirection];
      
      // Alternar sutilmente para crear efecto de "respiración"
      if (this.idleFrameX < 1) {
        this.sideToggle = 0;
      } else {
        this.sideToggle = 1;
      }
    }
  }

  detectCollision(x, y, canvasWidth, canvasHeight, wallManager = null, gestorDecoraciones = null, npcs = null, collisionWalls = null) {
    const half = (this.frameWidth * this.scale) / 2;
    
    // Colisión con límites del canvas
    if (x - half < 0 || x + half > canvasWidth || 
        y - half < 0 || y + half > canvasHeight) {
      return true;
    }

    // Colisión con muros usando el nuevo sistema CollisionWalls
    if (collisionWalls && collisionWalls.checkCollision) {
      if (collisionWalls.checkCollision(x, y, this.collisionWidth, this.collisionHeight)) {
        return true;
      }
    }
    
    // Colisión con muros
    if (wallManager && wallManager.isLoaded) {
      if (wallManager.checkCollision(x, y, this.collisionWidth, this.collisionHeight)) {
        return true;
      }
    }
    
    // Colisión con decoraciones
    if (gestorDecoraciones) {
      if (gestorDecoraciones.verificarColisionEnPosicion(x, y, this.collisionWidth, this.collisionHeight)) {
        return true;
      }
    }
    
    // Colisión con NPCs
    if (npcs && Array.isArray(npcs)) {
      for (let npc of npcs) {
        if (npc.colisionaConPosicion && npc.colisionaConPosicion(x, y, this.collisionWidth, this.collisionHeight)) {
          return true;
        }
      }
    }
    
    return false;
  }

  draw(ctx) {
    if (!this.sprite) return;
    
    ctx.drawImage(
      this.sprite,
      this.frameX * this.frameWidth,
      (this.frameYBase + this.sideToggle) * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.x - (this.frameWidth * this.scale) / 2,
      this.y - (this.frameHeight * this.scale) / 2,
      this.frameWidth * this.scale,
      this.frameHeight * this.scale
    );
  }
  
  // Método de debug para visualizar la caja de colisión
  drawCollisionBox(ctx) {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this.x - this.collisionWidth / 2,
      this.y - this.collisionHeight / 2,
      this.collisionWidth,
      this.collisionHeight
    );
    ctx.restore();
  }

  // Método de debug para visualizar el estado actual (mejorado)
  drawDebugInfo(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.font = "12px Arial";
    
    const info = [
      `Estado: ${this.isIdle ? 'Idle' : 'Moviendo'}`,
      `Dirección: ${this.lastDirection}`,
      `Frame X: ${this.frameX}`,
      `Fila Y: ${this.frameYBase}`,
      `SideToggle: ${this.sideToggle}`
    ];
    
    info.forEach((text, index) => {
      const y = this.y - 60 + (index * 15);
      ctx.strokeText(text, this.x - 40, y);
      ctx.fillText(text, this.x - 40, y);
    });
    
    ctx.restore();
  }
}
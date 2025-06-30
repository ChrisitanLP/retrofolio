import { NPC_CONFIG } from "../../config/npc_config.js";

// scripts/npc.js
export class NPC {
  constructor(id, x, y, spriteSrc) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.frameX = 0;
    this.frameY = 0;
    this.frameCounter = 0;
    this.sprite = null;

    // Configuración desde archivo de configuración
    const config = NPC_CONFIG.base;
    this.scale = config.scale;
    this.frameWidth = config.frameWidth;
    this.frameHeight = config.frameHeight;
    
    // === CONFIGURACIÓN ESPECÍFICA PARA ANIMACIÓN DEL CELULAR ===
    this.phoneAnimationConfig = {
      ...NPC_CONFIG.phoneAnimation
    };
    
    // Configuración de animaciones por fila
    this.animationConfig = {
      ...NPC_CONFIG.animations
    };

    this.collisionWidth = this.frameWidth * this.scale * config.collisionScale.width;
    this.collisionHeight = this.frameHeight * this.scale * config.collisionScale.height;

    // Estado actual de animación
    this.currentAnimation = 'walking';
    this.direction = 3;
    this.animationStartFrame = 0;

    // Dialog properties
    this.dialogData = DIALOG_DATA[id];
    
    if (!this.dialogData) {
      this.dialogData = DIALOG_DATA["default"];
    }
    
    this.dialogIndex = 0;

    // === SISTEMA DE COMPORTAMIENTO ALEATORIO ===
    this.behaviorConfig = {
      ...NPC_CONFIG.behavior
    };

    // Estado del comportamiento
    this.behaviorState = {
      isUsingPhone: false,
      lastBehaviorCheck: Date.now(),
      phoneStartTime: 0,
      idleStartTime: 0,
      previousAnimation: 'walking',
      canUseBehavior: true
    };

    // Timer para el comportamiento aleatorio
    this.behaviorTimer = null;

    this.loadSprite(spriteSrc);
    this.setupAnimation();
    this.initializeBehaviorSystem();
  }

  // === INICIALIZACIÓN DEL SISTEMA DE COMPORTAMIENTO ===
  initializeBehaviorSystem() {
    if (!this.behaviorConfig.enabled) return;

    // Crear un intervalo único para cada NPC con un offset aleatorio
    const randomOffset = Math.random() * 2000; // Offset de 0-2 segundos
    
    setTimeout(() => {
      this.behaviorTimer = setInterval(() => {
        this.checkRandomBehavior();
      }, this.behaviorConfig.checkInterval);
    }, randomOffset);
  }

  // === VERIFICACIÓN DE COMPORTAMIENTO ALEATORIO ===
  checkRandomBehavior() {
    if (!this.behaviorConfig.enabled || !this.behaviorState.canUseBehavior) {
      return;
    }

    // No interrumpir si ya está usando el celular
    if (this.behaviorState.isUsingPhone) {
      return;
    }

    // Solo activar si está en idle y ha estado idle lo suficiente
    if (this.currentAnimation !== 'walking') {
      this.behaviorState.idleStartTime = Date.now();
      return;
    }

    const currentTime = Date.now();
    const idleTime = currentTime - this.behaviorState.idleStartTime;

    // Verificar si ha estado idle el tiempo suficiente
    if (idleTime < this.behaviorConfig.minIdleTime) {
      return;
    }

    // Generar número aleatorio y verificar probabilidad
    const randomChance = Math.random();
    
    if (randomChance < this.behaviorConfig.phoneChance) {
      this.startPhoneBehavior();
    }
  }

  // === INICIAR COMPORTAMIENTO DEL CELULAR ===
  startPhoneBehavior() {
    
    this.behaviorState.isUsingPhone = true;
    this.behaviorState.phoneStartTime = Date.now();
    this.behaviorState.previousAnimation = this.currentAnimation;
    
    // Cambiar a animación del celular
    this.setAnimation('phone');
    
    // Programar el final de la animación
    setTimeout(() => {
      this.endPhoneBehavior();
    }, this.behaviorConfig.phoneAnimationDuration);
  }

  // === FINALIZAR COMPORTAMIENTO DEL CELULAR ===
  endPhoneBehavior() {
    if (!this.behaviorState.isUsingPhone) return;
    
    this.behaviorState.isUsingPhone = false;
    this.behaviorState.phoneStartTime = 0;
    
    // Volver a la animación anterior o idle por defecto
    const returnAnimation = this.behaviorState.previousAnimation === 'phone' ? 'walking' : this.behaviorState.previousAnimation;
    this.setAnimation(returnAnimation, this.direction);
    
    // Resetear tiempo de idle
    this.behaviorState.idleStartTime = Date.now();
  }

  // === MÉTODOS DE CONFIGURACIÓN ESPECÍFICOS PARA ANIMACIÓN DEL CELULAR ===
  setPhoneAnimationScale(scale) {
    this.phoneAnimationConfig.scale = scale;
  }

  setPhoneAnimationOffset(offsetX, offsetY) {
    this.phoneAnimationConfig.offsetX = offsetX;
    this.phoneAnimationConfig.offsetY = offsetY;
  }

  setPhoneAnimationDimensions(frameWidth, frameHeight) {
    this.phoneAnimationConfig.frameWidth = frameWidth;
    this.phoneAnimationConfig.frameHeight = frameHeight;
  }

  // Método conveniente para configurar todo de una vez
  configurePhoneAnimation(config) {
    if (config.scale !== undefined) this.phoneAnimationConfig.scale = config.scale;
    if (config.offsetX !== undefined) this.phoneAnimationConfig.offsetX = config.offsetX;
    if (config.offsetY !== undefined) this.phoneAnimationConfig.offsetY = config.offsetY;
    if (config.frameWidth !== undefined) this.phoneAnimationConfig.frameWidth = config.frameWidth;
    if (config.frameHeight !== undefined) this.phoneAnimationConfig.frameHeight = config.frameHeight;
  }

  // === MÉTODOS DE CONFIGURACIÓN PÚBLICA ===
  setBehaviorEnabled(enabled) {
    this.behaviorConfig.enabled = enabled;
    this.behaviorState.canUseBehavior = enabled;
  }

  setPhoneChance(chance) {
    this.behaviorConfig.phoneChance = Math.max(0, Math.min(1, chance));
  }

  setCheckInterval(interval) {
    this.behaviorConfig.checkInterval = Math.max(1000, interval);
    
    // Reiniciar el timer con el nuevo intervalo
    if (this.behaviorTimer) {
      clearInterval(this.behaviorTimer);
      this.initializeBehaviorSystem();
    }
  }

  // === MÉTODOS ORIGINALES MODIFICADOS ===
  async loadSprite(src) {
    try {
      this.sprite = await Utils.loadImage(src);
    } catch (error) {
      console.error(`Failed to load NPC sprite for ${this.id}:`, error);
    }
  }

  setupAnimation() {
    const config = this.animationConfig[this.currentAnimation];
    this.frameY = config.row;
    
    if (this.currentAnimation === 'idle') {
      this.animationStartFrame = this.direction;
      this.totalFrames = 1;
      
    } else if (this.currentAnimation === 'walking' || this.currentAnimation === 'running') {
      this.animationStartFrame = this.direction * 6;
      this.totalFrames = 6;
      
      // Actualizar tiempo de inicio de idle
      if (!this.behaviorState.isUsingPhone) {
        this.behaviorState.idleStartTime = Date.now();
      }
    } else if (this.currentAnimation === 'phone') {
      this.animationStartFrame = 0;
      this.totalFrames = config.frames;
    }
    
    this.frameX = 0;
  }

  setAnimation(animationName, direction = null) {
    // Prevenir cambio de animación si está usando el celular (excepto para finalizar)
    if (this.behaviorState.isUsingPhone && animationName !== 'phone' && animationName !== this.behaviorState.previousAnimation) {
      return;
    }

    if (this.currentAnimation !== animationName || 
        (direction !== null && this.direction !== direction)) {
      
      this.currentAnimation = animationName;
      if (direction !== null) {
        this.direction = direction;
      }
      
      this.setupAnimation();
    }
  }

  update() {
    const config = this.animationConfig[this.currentAnimation];
    this.frameCounter++;
    
    if (this.frameCounter % config.speed === 0) {
      if (this.currentAnimation === 'idle') {
        this.frameX = this.animationStartFrame;
      } else {
        this.frameX = (this.frameX + 1) % this.totalFrames;
      }
    }

    // === ACTUALIZACIÓN DEL SISTEMA DE COMPORTAMIENTO ===
    this.updateBehaviorSystem();
  }

  // === ACTUALIZACIÓN DEL SISTEMA DE COMPORTAMIENTO ===
  updateBehaviorSystem() {
    // Verificar si la animación del celular debe terminar por tiempo
    if (this.behaviorState.isUsingPhone && this.behaviorState.phoneStartTime > 0) {
      const currentTime = Date.now();
      const phoneTime = currentTime - this.behaviorState.phoneStartTime;
      
      if (phoneTime >= this.behaviorConfig.phoneAnimationDuration) {
        this.endPhoneBehavior();
      }
    }
  }

  draw(ctx) {
    if (!this.sprite) return;

    // Determinar si estamos en animación del celular
    const isPhoneAnimation = this.currentAnimation === 'phone';
    
    // Usar configuración específica para celular o la configuración normal
    const currentScale = isPhoneAnimation ? this.phoneAnimationConfig.scale : this.scale;
    const currentFrameWidth = isPhoneAnimation ? this.phoneAnimationConfig.frameWidth : this.frameWidth;
    const currentFrameHeight = isPhoneAnimation ? this.phoneAnimationConfig.frameHeight : this.frameHeight;
    
    // Calcular offsets solo para la animación del celular
    const offsetX = isPhoneAnimation ? this.phoneAnimationConfig.offsetX : 0;
    const offsetY = isPhoneAnimation ? this.phoneAnimationConfig.offsetY : 0;

    let sourceX;
    if (this.currentAnimation === 'idle') {
      sourceX = this.animationStartFrame * this.frameWidth;
    } else {
      sourceX = (this.animationStartFrame + this.frameX) * this.frameWidth;
    }

    const sourceY = this.frameY * this.frameHeight;

    // Calcular posición de renderizado con offsets
    const renderX = this.x - (currentFrameWidth * currentScale) / 2 + offsetX;
    const renderY = this.y - (currentFrameHeight * currentScale) / 2 + offsetY;

    ctx.drawImage(
      this.sprite,
      sourceX,
      sourceY,
      this.frameWidth,  // Siempre usar el frameWidth original del sprite
      this.frameHeight, // Siempre usar el frameHeight original del sprite
      renderX,
      renderY,
      currentFrameWidth * currentScale,
      currentFrameHeight * currentScale
    );
  }

  // === MÉTODOS DE ANIMACIÓN ORIGINALES ===
  setIdle(direction = 3) {
    this.setAnimation('idle', direction);
  }

  setWalking(direction = 3) {
    this.setAnimation('walking', direction);
  }

  setRunning(direction = 3) {
    this.setAnimation('running', direction);
  }

  setPhone() {
    // Permitir forzar la animación del celular externamente
    if (!this.behaviorState.isUsingPhone) {
      this.startPhoneBehavior();
    }
  }

  // === MÉTODOS DE ESTADO ===
  isUsingPhone() {
    return this.behaviorState.isUsingPhone;
  }

  getBehaviorInfo() {
    return {
      enabled: this.behaviorConfig.enabled,
      phoneChance: this.behaviorConfig.phoneChance,
      checkInterval: this.behaviorConfig.checkInterval,
      isUsingPhone: this.behaviorState.isUsingPhone,
      currentAnimation: this.currentAnimation,
      phoneAnimationConfig: { ...this.phoneAnimationConfig }
    };
  }

  // === MÉTODOS DE DIÁLOGO ORIGINALES ===
  getName() {
    const name = this.dialogData?.name || this.id;
    return name;
  }

  getPortrait() {
    const portrait = this.dialogData?.portrait || "";
    return portrait;
  }

  getCurrentDialog() {
    if (!this.dialogData) {
      console.error('ERROR: No dialogData found for NPC:', this.id);
      return "Error: No dialog data available.";
    }
    
    if (!this.dialogData.messages) {
      console.error('ERROR: No messages property in dialogData for NPC:', this.id);
      return "Error: No messages property found.";
    }
    
    if (!Array.isArray(this.dialogData.messages)) {
      console.error('ERROR: messages is not an array for NPC:', this.id, typeof this.dialogData.messages);
      return "Error: Messages is not an array.";
    }
    
    if (this.dialogData.messages.length === 0) {
      console.error('ERROR: Empty messages array for NPC:', this.id);
      return "Error: Empty messages array.";
    }
    
    if (this.dialogIndex < 0 || this.dialogIndex >= this.dialogData.messages.length) {
      console.error('ERROR: Invalid dialog index:', this.dialogIndex, 'for messages length:', this.dialogData.messages.length);
      this.dialogIndex = 0;
    }
    
    const message = this.dialogData.messages[this.dialogIndex];
    return message;
  }

  nextDialog() {
    if (!this.dialogData || !this.dialogData.messages || !Array.isArray(this.dialogData.messages)) {
      console.error('Cannot advance dialog - invalid data for NPC:', this.id);
      return;
    }
    
    if (this.dialogIndex < this.dialogData.messages.length - 1) {
      this.dialogIndex++;
    } else {
    }
  }

  isLastDialog() {
    if (!this.dialogData || !this.dialogData.messages || !Array.isArray(this.dialogData.messages)) {
      console.error('Cannot check last dialog - invalid data for NPC:', this.id);
      return true;
    }
    
    const isLast = this.dialogIndex >= this.dialogData.messages.length - 1;
    return isLast;
  }

  resetDialog() {
    this.dialogIndex = 0;
  }

  isNearPlayer(playerX, playerY, radius = 80) {
    // CORREGIDO: Verificar que las coordenadas sean válidas
    if (typeof playerX !== 'number' || typeof playerY !== 'number' || 
        isNaN(playerX) || isNaN(playerY) || 
        typeof this.x !== 'number' || typeof this.y !== 'number' ||
        isNaN(this.x) || isNaN(this.y)) {
      return false;
    }
    
    const distance = Math.sqrt(
      Math.pow(playerX - this.x, 2) + Math.pow(playerY - this.y, 2)
    );
    
    // CORREGIDO: Verificar que la distancia sea un número válido
    if (isNaN(distance)) {
      return false;
    }
    
    const isNear = distance < radius;
    
    // CORREGIDO: Debug opcional para verificar el funcionamiento
    if (this.debugProximity) {
      console.log(`NPC ${this.id}: Player(${playerX}, ${playerY}) - NPC(${this.x}, ${this.y}) - Distance: ${distance.toFixed(2)} - Near: ${isNear}`);
    }
    
    return isNear;
  }

  // === MÉTODOS DE COLISIÓN ORIGINALES ===
  colisionaCon(jugador) {
    const jugadorAncho = jugador.collisionWidth || jugador.width || jugador.frameWidth * jugador.scale;
    const jugadorAlto = jugador.collisionHeight || jugador.height || jugador.frameHeight * jugador.scale;
    
    const npcIzq = this.x - this.collisionWidth / 2;
    const npcDer = this.x + this.collisionWidth / 2;
    const npcArr = this.y - this.collisionHeight / 2;
    const npcAba = this.y + this.collisionHeight / 2;
    
    const jugadorIzq = jugador.x - jugadorAncho / 2;
    const jugadorDer = jugador.x + jugadorAncho / 2;
    const jugadorArr = jugador.y - jugadorAlto / 2;
    const jugadorAba = jugador.y + jugadorAlto / 2;
    
    return !(npcDer < jugadorIzq || 
             npcIzq > jugadorDer || 
             npcAba < jugadorArr || 
             npcArr > jugadorAba);
  }

  colisionaConPosicion(x, y, ancho, alto) {
    const npcIzq = this.x - this.collisionWidth / 2;
    const npcDer = this.x + this.collisionWidth / 2;
    const npcArr = this.y - this.collisionHeight / 2;
    const npcAba = this.y + this.collisionHeight / 2;
    
    const objetoIzq = x - ancho / 2;
    const objetoDer = x + ancho / 2;
    const objetoArr = y - alto / 2;
    const objetoAba = y + alto / 2;
    
    return !(npcDer < objetoIzq || 
             npcIzq > objetoDer || 
             npcAba < objetoArr || 
             npcArr > objetoAba);
  }

  drawCollisionBox(ctx, color = "purple") {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this.x - this.collisionWidth / 2,
      this.y - this.collisionHeight / 2,
      this.collisionWidth,
      this.collisionHeight
    );
    ctx.restore();
  }

  // === LIMPIEZA DE RECURSOS ===
  destroy() {
    if (this.behaviorTimer) {
      clearInterval(this.behaviorTimer);
      this.behaviorTimer = null;
    }
  }
}
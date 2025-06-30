import { PORTRAIT_CONFIG } from "../../config/portrait_config.js";

// scripts/portraitAnimator.js
export class PortraitAnimator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    
    // Spritesheet properties basadas en tu imagen
    this.spritesheet = null;
    this.spriteWidth = PORTRAIT_CONFIG.sprite.width;   // Ancho de cada sprite
    this.spriteHeight = PORTRAIT_CONFIG.sprite.height;  // Alto de cada sprite
    this.totalColumns = PORTRAIT_CONFIG.sprite.totalColumns;  // Solo 10 sprites útiles en la fila 0
    this.totalRows = PORTRAIT_CONFIG.sprite.totalRows;      // 4 filas en total
    this.targetRow = 0;      // Solo usar la fila 0
    this.totalFrames = PORTRAIT_CONFIG.sprite.totalFrames;   // Solo 10 frames útiles en la fila 0
    this.currentFrame = 0;
    
    // Coordenadas X específicas para cada sprite en la fila 0
    // Medidas aproximadas basadas en tu imagen
    this.spritePositions = [
      2,    // Sprite 0
      98,   // Sprite 1  
      195,  // Sprite 2
      290,  // Sprite 3
      386,  // Sprite 4
      482,  // Sprite 5
      578,  // Sprite 6
      674,  // Sprite 7
      770,  // Sprite 8
      866   // Sprite 9
    ];
    
    // Animation properties
    this.frameCounter = 0;
    this.animationSpeed = PORTRAIT_CONFIG.animation.speed; // frames entre cambios de sprite
    this.isAnimating = false;
    
    // Canvas setup - escalado para mejor visualización
    this.displayScale = PORTRAIT_CONFIG.canvas.displayScale; // Escalar 2x para mejor visibilidad
    this.canvas.width = this.spriteWidth * this.displayScale;
    this.canvas.height = this.spriteHeight * this.displayScale;
    
    // POSICIÓN FIJA PARA EL DESTINO - Aquí está la corrección principal
    this.destX = (this.canvas.width - this.spriteWidth * this.displayScale) / 2;
    this.destY = (this.canvas.height - this.spriteHeight * this.displayScale) / 2;
    
    // Style the canvas
    this.canvas.style.width = (this.spriteWidth * this.displayScale) + 'px';
    this.canvas.style.height = (this.spriteHeight * this.displayScale) + 'px';
    this.canvas.style.imageRendering = PORTRAIT_CONFIG.canvas.imageRendering;
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (error) => {
        console.error('Error loading image:', src, error);
        reject(error);
      };
      img.src = src;
    });
  }

  async loadSpritesheet(imagePath) {
    try {
      this.spritesheet = await this.loadImage(imagePath);
      
      // Verificar que las dimensiones sean correctas
      const expectedWidth = 600; // Aproximadamente 10 * 60
      const expectedHeight = this.spriteHeight * this.totalRows;   // 70 * 4 = 280
      
      if (this.spritesheet.width < expectedWidth || this.spritesheet.height !== expectedHeight) {
      }
      
      this.currentFrame = 0;
      this.draw(); // Dibujar primer frame
      return true;
    } catch (error) {
      console.error("Failed to load spritesheet:", error);
      return false;
    }
  }

  startAnimation() {
    if (!this.spritesheet) {
      return;
    }
    this.isAnimating = true;
    this.currentFrame = 0;
    this.frameCounter = 0;
  }

  stopAnimation() {
    this.isAnimating = false;
    this.currentFrame = 0;
    this.frameCounter = 0;
    if (this.spritesheet) {
      this.draw();
    }
  }

  update() {
    if (!this.isAnimating || !this.spritesheet) return;

    this.frameCounter++;
    
    if (this.frameCounter >= this.animationSpeed) {
      this.frameCounter = 0;
      // Ciclar a través de los 10 frames útiles de la fila 0
      this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
      this.draw();
    }
  }

  draw() {
    if (!this.spritesheet) {
      return;
    }

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Calcular el frame actual en la fila 0 usando posiciones específicas
    const sourceX = this.spritePositions[this.currentFrame];
    const sourceY = this.targetRow * this.spriteHeight;

    try {
      // Dibujar sprite escalado en posición fija
      this.ctx.drawImage(
        this.spritesheet,
        sourceX, sourceY,                                    // Posición source
        this.spriteWidth, this.spriteHeight,                 // Tamaño source
        this.destX, this.destY,                             // Posición destino FIJA
        this.spriteWidth * this.displayScale,              // Ancho destino (escalado)
        this.spriteHeight * this.displayScale              // Alto destino (escalado)
      );
    } catch (error) {
      console.error('Error drawing sprite:', error);
      console.error('Draw parameters:', {
        sourceX, sourceY,
        spriteWidth: this.spriteWidth,
        spriteHeight: this.spriteHeight,
        destX: this.destX,
        destY: this.destY,
        canvasWidth: this.canvas.width,
        canvasHeight: this.canvas.height
      });
    }
  }

  isLoaded() {
    return this.spritesheet !== null;
  }

  // Método para cambiar velocidad de animación
  setAnimationSpeed(speed) {
    this.animationSpeed = speed;
  }
}
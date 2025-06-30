// scripts/components/wallManager.js - Versión corregida con borde negro
export class WallManager {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.wallImage = null;
    this.currentWallImagePath = null;
    this.collisionCanvas = null;
    this.collisionCtx = null;
    this.imageData = null;
    this.isLoaded = false;
    this.isLoading = false;
    
    // NUEVO: Configuración del borde negro
    this.borderPadding = 70; // Tamaño del borde negro en píxeles
    this.gameAreaWidth = canvasWidth - (this.borderPadding * 2);
    this.gameAreaHeight = canvasHeight - (this.borderPadding * 2);
    
    // NUEVO: Canvas separado para el borde negro
    this.borderCanvas = null;
    this.borderCtx = null;
    this.createBorderCanvas();
  }
  
  // NUEVO: Crear canvas separado para el borde negro
  createBorderCanvas() {
    this.borderCanvas = document.createElement('canvas');
    this.borderCanvas.width = this.canvasWidth;
    this.borderCanvas.height = this.canvasHeight;
    this.borderCtx = this.borderCanvas.getContext('2d');
    
    // Dibujar solo el borde negro, dejando el centro transparente
    this.borderCtx.fillStyle = '#000000';
    
    // Borde superior
    this.borderCtx.fillRect(0, 0, this.canvasWidth, this.borderPadding);
    
    // Borde inferior
    this.borderCtx.fillRect(0, this.canvasHeight - this.borderPadding, this.canvasWidth, this.borderPadding);
    
    // Borde izquierdo (sin solapar con superior e inferior)
    this.borderCtx.fillRect(0, this.borderPadding, this.borderPadding, this.gameAreaHeight);
    
    // Borde derecho (sin solapar con superior e inferior)
    this.borderCtx.fillRect(this.canvasWidth - this.borderPadding, this.borderPadding, this.borderPadding, this.gameAreaHeight);
  }
  
  async loadWallImage(imagePath = "static/assets/sprites/tilesets/walls/distribucion_principal.png") {
    // Evitar recargas innecesarias
    if (this.currentWallImagePath === imagePath && this.isLoaded) {
      return;
    }

    this.isLoading = true;
    this.isLoaded = false;
    
    try {
      this.wallImage = await Utils.loadImage(imagePath);
      this.currentWallImagePath = imagePath;
      this.createCollisionMap();
      this.isLoaded = true;
    } catch (error) {
      console.error(`Failed to load wall image: ${imagePath}`, error);
    } finally {
      this.isLoading = false;
    }
  }

  // Método para cambiar dinámicamente la imagen de muros
  async changeWallImage(newImagePath) {
    await this.loadWallImage(newImagePath);
  }
  
  createCollisionMap() {
    if (!this.wallImage) return;

    // Crear un canvas oculto para el mapa de colisión
    this.collisionCanvas = document.createElement('canvas');
    this.collisionCanvas.width = this.canvasWidth;
    this.collisionCanvas.height = this.canvasHeight;
    this.collisionCtx = this.collisionCanvas.getContext('2d');
    
    // CORREGIDO: Primero crear fondo transparente
    this.collisionCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // CORREGIDO: Solo agregar el borde negro para colisiones
    this.collisionCtx.fillStyle = '#000000';
    
    // Borde superior
    this.collisionCtx.fillRect(0, 0, this.canvasWidth, this.borderPadding);
    
    // Borde inferior
    this.collisionCtx.fillRect(0, this.canvasHeight - this.borderPadding, this.canvasWidth, this.borderPadding);
    
    // Borde izquierdo
    this.collisionCtx.fillRect(0, this.borderPadding, this.borderPadding, this.gameAreaHeight);
    
    // Borde derecho
    this.collisionCtx.fillRect(this.canvasWidth - this.borderPadding, this.borderPadding, this.borderPadding, this.gameAreaHeight);
    
    // CORREGIDO: Dibujar la imagen de muros SOLO en el área de juego (centro)
    this.collisionCtx.drawImage(
      this.wallImage,
      0, 0,
      this.wallImage.width, this.wallImage.height,
      this.borderPadding, this.borderPadding,
      this.gameAreaWidth, this.gameAreaHeight
    );
    
    // Obtener los datos de píxeles para verificación de colisión
    this.imageData = this.collisionCtx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
  }
  
  updateCanvasSize(newWidth, newHeight) {
    this.canvasWidth = newWidth;
    this.canvasHeight = newHeight;
    
    // NUEVO: Recalcular área de juego
    this.gameAreaWidth = newWidth - (this.borderPadding * 2);
    this.gameAreaHeight = newHeight - (this.borderPadding * 2);
    
    // Recrear el canvas del borde
    this.createBorderCanvas();
    
    if (this.wallImage && this.isLoaded) {
      this.createCollisionMap();
    }
  }
  
  // NUEVO: Método para establecer el tamaño del borde
  setBorderPadding(padding) {
    this.borderPadding = padding;
    this.gameAreaWidth = this.canvasWidth - (padding * 2);
    this.gameAreaHeight = this.canvasHeight - (padding * 2);
    
    // Recrear el canvas del borde
    this.createBorderCanvas();
    
    if (this.wallImage && this.isLoaded) {
      this.createCollisionMap();
    }
  }
  
  // NUEVO: Métodos para obtener coordenadas del área de juego
  getGameAreaBounds() {
    return {
      x: this.borderPadding,
      y: this.borderPadding,
      width: this.gameAreaWidth,
      height: this.gameAreaHeight
    };
  }
  
  // NUEVO: Verificar si una coordenada está dentro del área de juego
  isInsideGameArea(x, y) {
    return x >= this.borderPadding && 
           x < this.canvasWidth - this.borderPadding &&
           y >= this.borderPadding && 
           y < this.canvasHeight - this.borderPadding;
  }
  
  // Verificar si un píxel específico es una colisión (negro)
  isPixelBlocked(x, y) {
    if (!this.imageData || x < 0 || y < 0 || x >= this.canvasWidth || y >= this.canvasHeight) {
      return true; // Fuera de límites = bloqueado
    }
    
    // NUEVO: Si está fuera del área de juego (en el borde), considerar como bloqueado
    if (!this.isInsideGameArea(x, y)) {
      return true;
    }
    
    const pixelIndex = (Math.floor(y) * this.canvasWidth + Math.floor(x)) * 4;
    const r = this.imageData.data[pixelIndex];
    const g = this.imageData.data[pixelIndex + 1];
    const b = this.imageData.data[pixelIndex + 2];
    const a = this.imageData.data[pixelIndex + 3];
    
    // Verificar si el píxel es negro (muro)
    return r === 0 && g === 0 && b === 0 && a === 255;
  }
  
  // Verificar colisión para un rectángulo (jugador)
  checkCollision(x, y, width, height) {
    if (!this.isLoaded) return false;
    
    // CORREGIDO: Primero verificar si está en el borde negro
    if (!this.isInsideGameArea(x, y)) {
      return true;
    }
    
    // Verificar las esquinas del rectángulo del jugador
    const corners = [
      { x: x - width/2, y: y - height/2 },     // Esquina superior izquierda
      { x: x + width/2, y: y - height/2 },     // Esquina superior derecha
      { x: x - width/2, y: y + height/2 },     // Esquina inferior izquierda
      { x: x + width/2, y: y + height/2 }      // Esquina inferior derecha
    ];
    
    // También verificar puntos intermedios para mejor precisión
    const midPoints = [
      { x: x, y: y - height/2 },               // Centro superior
      { x: x, y: y + height/2 },               // Centro inferior
      { x: x - width/2, y: y },                // Centro izquierdo
      { x: x + width/2, y: y }                 // Centro derecho
    ];
    
    const allPoints = [...corners, ...midPoints];
    
    for (const point of allPoints) {
      if (this.isPixelBlocked(point.x, point.y)) {
        return true;
      }
    }
    
    return false;
  }
  
  // Método para verificar colisión con un margen de seguridad
  checkCollisionWithMargin(x, y, width, height, margin = 2) {
    return this.checkCollision(x, y, width + margin, height + margin);
  }
  
  draw(ctx) {
    // CORREGIDO: No dibujar fondo negro completo aquí
    // Solo dibujar el borde negro
    if (this.borderCanvas) {
      ctx.drawImage(this.borderCanvas, 0, 0);
    }
    
    if (!this.wallImage || !this.isLoaded) {
      // Mostrar indicador de carga si está cargando
      if (this.isLoading) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(
          this.borderPadding, 
          this.borderPadding, 
          this.gameAreaWidth, 
          this.gameAreaHeight
        );
        ctx.fillStyle = '#fff';
        ctx.font = '20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(
          'Cargando mapa...', 
          this.canvasWidth / 2, 
          this.canvasHeight / 2
        );
        ctx.restore();
      }
      return;
    }
    
    // CORREGIDO: Dibujar la imagen de muros escalada al área de juego (con padding)
    // Esto dibuja los muros internos SOBRE las baldosas del piso
    ctx.drawImage(
      this.wallImage,
      0, 0,
      this.wallImage.width, this.wallImage.height,
      this.borderPadding, this.borderPadding,
      this.gameAreaWidth, this.gameAreaHeight
    );
  }
  
  // Método de debug para visualizar el mapa de colisión
  drawCollisionMap(ctx, alpha = 0.3) {
    if (!this.collisionCanvas) return;
    
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(this.collisionCanvas, 0, 0);
    ctx.restore();
  }

  // NUEVO: Método de debug para mostrar el área de juego
  drawGameAreaBorder(ctx) {
    ctx.save();
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this.borderPadding, 
      this.borderPadding, 
      this.gameAreaWidth, 
      this.gameAreaHeight
    );
    ctx.restore();
  }

  // Obtener información del estado actual
  getStatus() {
    return {
      isLoaded: this.isLoaded,
      isLoading: this.isLoading,
      currentImage: this.currentWallImagePath,
      canvasSize: { width: this.canvasWidth, height: this.canvasHeight },
      gameAreaSize: { width: this.gameAreaWidth, height: this.gameAreaHeight },
      borderPadding: this.borderPadding
    };
  }
}
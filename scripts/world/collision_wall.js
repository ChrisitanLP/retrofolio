// scripts/world/collisionWalls.js

export class CollisionWalls {
  constructor() {
    this.walls = [];
    this.debugMode = true; // Para mostrar/ocultar rectángulos de colisión en desarrollo
  }

  init(wallsConfig = []) {
    this.clear();
    
    if (!Array.isArray(wallsConfig)) {
      return;
    }

    wallsConfig.forEach((wallConfig, index) => {
      this.addWall(wallConfig, index);
    });
  }

  addWall(wallConfig, index = null) {
    const wall = {
      x: wallConfig.x || 0,
      y: wallConfig.y || 0,
      width: wallConfig.width || 50,
      height: wallConfig.height || 50,
      hasCollision: wallConfig.hasCollision !== false, // Por defecto true
      id: wallConfig.id || `wall_${index !== null ? index : this.walls.length}`,
      type: wallConfig.type || 'wall', // Para categorizar diferentes tipos de muros
      
      // NUEVA FUNCIONALIDAD: Zonas de ocultación
      isHidingZone: wallConfig.isHidingZone || false, // Si es zona de ocultación
      hideOpacity: wallConfig.hideOpacity || 0.3, // Opacidad cuando está oculto (0-1)
      hideType: wallConfig.hideType || 'fade', // 'fade', 'invisible', 'outline'
      depthLevel: wallConfig.depthLevel || 0 // Nivel de profundidad para ordenamiento
    };

    this.walls.push(wall);
  }

  clear() {
    this.walls = [];
  }

  checkCollision(objX, objY, objWidth, objHeight) {
    const objLeft = objX - objWidth / 2;
    const objRight = objX + objWidth / 2;
    const objTop = objY - objHeight / 2;
    const objBottom = objY + objHeight / 2;

    for (const wall of this.walls) {
      if (!wall.hasCollision) continue;

      const wallLeft = wall.x;
      const wallRight = wall.x + wall.width;
      const wallTop = wall.y;
      const wallBottom = wall.y + wall.height;

      // Verificar si hay intersección entre los rectángulos
      if (objLeft < wallRight && 
          objRight > wallLeft && 
          objTop < wallBottom && 
          objBottom > wallTop) {
        return true;
      }
    }

    return false;
  }

  // NUEVA FUNCIÓN: Verificar si el jugador está en una zona de ocultación
  checkHidingZones(objX, objY, objWidth, objHeight) {
    const objLeft = objX - objWidth / 2;
    const objRight = objX + objWidth / 2;
    const objTop = objY - objHeight / 2;
    const objBottom = objY + objHeight / 2;

    const hidingZones = [];

    for (const wall of this.walls) {
      // Solo verificar muros marcados como zonas de ocultación
      if (!wall.isHidingZone) continue;

      const wallLeft = wall.x;
      const wallRight = wall.x + wall.width;
      const wallTop = wall.y;
      const wallBottom = wall.y + wall.height;

      // Verificar si hay intersección entre los rectángulos
      if (objLeft < wallRight && 
          objRight > wallLeft && 
          objTop < wallBottom && 
          objBottom > wallTop) {
        hidingZones.push(wall);
      }
    }

    return hidingZones;
  }

  // NUEVA FUNCIÓN: Obtener el efecto de ocultación más fuerte
  getHidingEffect(objX, objY, objWidth, objHeight) {
    const hidingZones = this.checkHidingZones(objX, objY, objWidth, objHeight);
    
    if (hidingZones.length === 0) {
      return null;
    }

    // Si hay múltiples zonas, usar la que tenga menor opacidad (más oculta)
    const strongestZone = hidingZones.reduce((strongest, current) => {
      return current.hideOpacity < strongest.hideOpacity ? current : strongest;
    });

    return {
      zone: strongestZone,
      opacity: strongestZone.hideOpacity,
      type: strongestZone.hideType,
      depthLevel: strongestZone.depthLevel,
      isHidden: true
    };
  }

  getCollisionInfo(objX, objY, objWidth, objHeight) {
    const objLeft = objX - objWidth / 2;
    const objRight = objX + objWidth / 2;
    const objTop = objY - objHeight / 2;
    const objBottom = objY + objHeight / 2;

    for (const wall of this.walls) {
      if (!wall.hasCollision) continue;

      const wallLeft = wall.x;
      const wallRight = wall.x + wall.width;
      const wallTop = wall.y;
      const wallBottom = wall.y + wall.height;

      if (objLeft < wallRight && 
          objRight > wallLeft && 
          objTop < wallBottom && 
          objBottom > wallTop) {
        return {
          wall: wall,
          overlapX: Math.min(objRight - wallLeft, wallRight - objLeft),
          overlapY: Math.min(objBottom - wallTop, wallBottom - objTop)
        };
      }
    }

    return null;
  }

  checkCollisionWithWall(wallId, objX, objY, objWidth, objHeight) {
    const wall = this.walls.find(w => w.id === wallId);
    if (!wall || !wall.hasCollision) return false;

    const objLeft = objX - objWidth / 2;
    const objRight = objX + objWidth / 2;
    const objTop = objY - objHeight / 2;
    const objBottom = objY + objHeight / 2;

    const wallLeft = wall.x;
    const wallRight = wall.x + wall.width;
    const wallTop = wall.y;
    const wallBottom = wall.y + wall.height;

    return objLeft < wallRight && 
           objRight > wallLeft && 
           objTop < wallBottom && 
           objBottom > wallTop;
  }

  setWallCollision(wallId, enabled) {
    const wall = this.walls.find(w => w.id === wallId);
    if (wall) {
      wall.hasCollision = enabled;
    }
  }

  // NUEVA FUNCIÓN: Configurar zona de ocultación
  setWallHidingZone(wallId, isHidingZone, hideOpacity = 0.3, hideType = 'fade') {
    const wall = this.walls.find(w => w.id === wallId);
    if (wall) {
      wall.isHidingZone = isHidingZone;
      wall.hideOpacity = hideOpacity;
      wall.hideType = hideType;
    }
  }

  getWall(wallId) {
    return this.walls.find(w => w.id === wallId) || null;
  }

  getAllWalls() {
    return [...this.walls]; // Retorna una copia para evitar modificaciones externas
  }

  getWallsByType(type) {
    return this.walls.filter(w => w.type === type);
  }

  // NUEVA FUNCIÓN: Obtener zonas de ocultación
  getHidingZones() {
    return this.walls.filter(w => w.isHidingZone);
  }

  removeWall(wallId) {
    const initialLength = this.walls.length;
    this.walls = this.walls.filter(w => w.id !== wallId);
    
    if (this.walls.length < initialLength) {
      return true;
    }
    return false;
  }

  setDebugMode(enabled) {
    this.debugMode = enabled;
  }

  draw(ctx) {
    if (!this.debugMode) return;

    ctx.save();
    
    this.walls.forEach(wall => {
      // Color diferente según el tipo de muro
      if (wall.isHidingZone) {
        // Zonas de ocultación en azul
        ctx.strokeStyle = 'rgba(0, 100, 255, 0.8)';
        ctx.fillStyle = 'rgba(0, 100, 255, 0.1)';
      } else if (wall.hasCollision) {
        // Muros con colisión en rojo
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      } else {
        // Muros sin colisión en verde
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
        ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
      }
      
      ctx.lineWidth = 2;
      
      // Dibujar rectángulo
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
      ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
      
      // Dibujar ID del muro
      ctx.fillStyle = wall.isHidingZone ? 'blue' : (wall.hasCollision ? 'red' : 'green');
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        wall.id, 
        wall.x + wall.width / 2, 
        wall.y + wall.height / 2 + 5
      );

      // NUEVA CARACTERÍSTICA: Mostrar información adicional para zonas de ocultación
      if (wall.isHidingZone) {
        ctx.fillStyle = 'blue';
        ctx.font = '8px Arial';
        ctx.fillText(
          `Opacity: ${wall.hideOpacity}`,
          wall.x + wall.width / 2,
          wall.y + wall.height / 2 + 15
        );
        ctx.fillText(
          `Type: ${wall.hideType}`,
          wall.x + wall.width / 2,
          wall.y + wall.height / 2 + 25
        );
      }
    });
    
    ctx.restore();
  }

  getStats() {
    const activeWalls = this.walls.filter(w => w.hasCollision).length;
    const inactiveWalls = this.walls.length - activeWalls;
    const hidingZones = this.walls.filter(w => w.isHidingZone).length;
    
    return {
      total: this.walls.length,
      active: activeWalls,
      inactive: inactiveWalls,
      hidingZones: hidingZones,
      types: [...new Set(this.walls.map(w => w.type))]
    };
  }
}
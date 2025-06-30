// config/playerConfig.js
export const PLAYER_CONFIG = {
  // Dimensiones del sprite
  frameWidth: 32,
  frameHeight: 32,
  
  // Propiedades de escala y movimiento
  scale: 2.8,
  moveSpeed: 3.1,
  
  // Animación
  totalFrames: 4,
  frameCounter: 0,
  
  // Colisiones
  collisionScale: {
    width: 0.24,
    height: 0.40
  },
  
  // Animación idle
  idle: {
    frameSpeed: 15,
    maxFrames: 4,
    directionMap: {
      "down": 0,
      "right": 1,
      "left": 2,
      "up": 3
    }
  },
  
  // Animación de movimiento
  movement: {
    directionMap: {
      "down": 5,
      "left": 7,
      "right": 9,
      "up": 11
    }
  },
  
  // Posición inicial por defecto
  defaultPosition: {
    x: 960,
    y: 800
  },
  
  // Controles
  controls: {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
  }
};
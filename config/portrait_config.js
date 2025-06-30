// config/portraitConfig.js
export const PORTRAIT_CONFIG = {
  // Propiedades del spritesheet
  sprite: {
    width: 60,
    height: 70,
    totalColumns: 10,
    totalRows: 4,
    targetRow: 0,
    totalFrames: 10
  },
  
  // Coordenadas X específicas para cada sprite en la fila 0
  spritePositions: [
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
  ],
  
  // Propiedades de animación
  animation: {
    speed: 10, // frames entre cambios de sprite
    frameCounter: 0,
    currentFrame: 0
  },
  
  // Configuración del canvas
  canvas: {
    displayScale: 2.05,
    imageRendering: 'pixelated'
  }
};
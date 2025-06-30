// config/npcConfig.js
export const NPC_CONFIG = {
  // Configuración base para NPCs
  base: {
    scale: 1.65,
    frameWidth: 27.65,
    frameHeight: 48,
    collisionScale: {
      width: 0.4,
      height: 0.4
    }
  },
  
  // Configuración específica para animación del celular
  phoneAnimation: {
    scale: 1.65,
    offsetX: 0,
    offsetY: 20,
    frameWidth: 27.65,
    frameHeight: 48
  },
  
  // Configuración de animaciones por fila
  animations: {
    idle: { row: 0, frames: 4, speed: 20 },
    walking: { row: 1, frames: 24, speed: 10 },
    running: { row: 2, frames: 24, speed: 10 },
    phone: { row: 7, frames: 9, speed: 12 }
  },
  
  // Sistema de comportamiento aleatorio
  behavior: {
    phoneChance: 0.15,
    checkInterval: 10000,
    phoneAnimationDuration: 2000,
    minIdleTime: 2000,
    enabled: true
  },
};
// data/maps/proyectos_map.js
import { NPC } from "../../scripts/components/npc.js";
import { CollisionWalls } from "../../scripts/world/collision_wall.js";
import { getInteractiveInfo } from "./interactive_info.js";

export const ProyectosMapConfig = {
  name: 'left',
  wallImage: 'static/assets/sprites/tilesets/walls/wall_left.png',
  floorImage: 'static/assets/sprites/tilesets/floor/baldosa.png',
  
  // NPCs específicos del mapa de proyectos
  npcs: [
    {
      id: 'kairo',
      x: 1060,
      y: 700,
      sprite: 'static/assets/sprites/characters/npcs/npc_3.png'
    },
  ],

  walls: [
    {
      id: 'wall_top',
      x: 68, y: 70, width: 1780, height: 170,
      type: 'perimeter',
      hasCollision: true
    },
    {
      id: 'wall_left',
      x: 68, y: 70, width: 84, height: 780,
      type: 'perimeter',
      hasCollision: true
    },
    {
      id: 'wall_right',
      x: 1760, y: 70, width: 90, height: 590,
      type: 'perimeter',
      hasCollision: true
    },
    
  
    {
      id: 'wall_left_bottom',
      x: 68, y: 845, width: 1840, height: 100,
      type: 'internal',
      hasCollision: true
    },
    {
      id: 'wall_left_structure',
      x: 152, y: 480, width: 663, height: 127,
      type: 'structure',
      hasCollision: true
    },
    {
      id: 'wall_right_structure',
      x: 1306, y: 430, width: 505, height: 240,
      type: 'structure',
      hasCollision: true
    }
  ],

  // Decoraciones para el mapa de proyectos
  decorations: [
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/acroware_vitrina.png',
      x: 450, y: 370, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/php_vitrina.png',
      x: 555, y: 370, width: 90, height: 150,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/mysql_vitrina.png',
      x: 338, y: 370, width: 90, height: 150,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/html_poster.png',
      x: 370, y: 180, width: 55, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/js_poster.png',
      x: 530, y: 180, width: 55, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/crisu_vitrina.png',
      x: 1530, y: 360, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/html_poster.png',
      x: 1440, y: 180, width: 55, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/js_poster.png',
      x: 1600, y: 180, width: 55, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/wamo_vitrina.png',
      x: 450, y: 700, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/odoo_vitrina.png',
      x: 555, y: 700, width: 90, height: 150,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/node_vitrina.png',
      x: 338, y: 700, width: 90, height: 150,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/postgresql_poster.png',
      x: 320, y: 540, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/python_poster.png',
      x: 400, y: 540, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/js_poster.png',
      x: 480, y: 540, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/html_poster.png',
      x: 560, y: 540, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1420, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1595, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1770, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 710, y: 610, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/wamo_pixel.png',
      x: 1580, y: 590, width: 95, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/gradux_pixel.png',
      x: 1470, y: 590, width: 75, height: 60,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/sonel_pixel.png',
      x: 1700, y: 590, width: 70, height: 60,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 1295, y: 650, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 830, y: 590, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 670, y: 235, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 1295, y: 235, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 170, y: 235, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 1740, y: 235, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 170, y: 605, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/sonel_vitrina.png',
      x: 1075, y: 450, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/python_vitrina.png',
      x: 1185, y: 450, width: 90, height: 150,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/postgre_vitrina.png',
      x: 962, y: 450, width: 90, height: 150,
      hasCollision: true
    },
    
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 780, y: 235, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1185, y: 235, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/inti_poster.png',
      x: 450, y: 170, width: 75, height: 95,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/gradux_poster.png',
      x: 1520, y: 170, width: 75, height: 95,
      hasCollision: true
    },

    {
      sprite: 'static/assets/sprites/tilesets/decor/contact_map/portrait_poster.png',
      x: 980, y: 170, width: 75, height: 95,
      hasCollision: true
    },
  ],

  // NUEVO: Decoraciones interactivas (con información)
  interactiveDecorations: [
    {
      sprite: 'static/assets/sprites/tilesets/decor/informacion.png',
      x: 1040, y: 190, width: 30, height: 40,
      hasCollision: true,
      infoId: 'retrofolio'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 640, y: 390, width: 45, height: 60,
      hasCollision: true,
      infoId: 'acroware' // ID que corresponde a INTERACTIVE_INFO_DATA
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 1428, y: 390, width: 45, height: 60,
      hasCollision: true,
      infoId: 'crisu'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 640, y: 720, width: 45, height: 60,
      hasCollision: true,
      infoId: 'wamo'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 1000, y: 550, width: 45, height: 60,
      hasCollision: true,
      infoId: 'sonel_analysis'
    },
    {
     sprite: 'static/assets/sprites/tilesets/decor/informacion.png',
      x: 590, y: 190, width: 30, height: 40,
      hasCollision: true,
      infoId: 'inti'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/informacion.png',
      x: 1380, y: 190, width: 30, height: 40,
      hasCollision: true,
      infoId: 'gradux'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/informacion.png',
      x: 622, y: 560, width: 30, height: 40,
      hasCollision: true,
      infoId: 'stack',
      type_ui: 'principal'
    },
  ],

  // Punto de spawn por defecto para este mapa
  defaultSpawn: { x: 1800, y: 400 },

  // Función de inicialización del mapa de proyectos
  async init(game) {
    
    try {
      // Limpiar componentes existentes
      this.cleanup(game);
      
      // Configurar NPCs
      await this.initNPCs(game);

      // NUEVO: Inicializar sistema de colisión de muros
      await this.initCollisionWalls(game);
      
      // Configurar decoraciones
      await this.initDecorations(game);

      // NUEVO: Configurar decoraciones interactivas
      await this.initInteractiveDecorations(game);
      
      // Actualizar wallManager con nueva imagen
      await this.initWalls(game);
      
    } catch (error) {
      console.error('Error inicializando mapa de proyectos:', error);
      throw error;
    }
  },

  // Limpiar componentes existentes
  cleanup(game) {
    // Limpiar NPCs anteriores y sus timers
    if (game.npcs && game.npcs.length > 0) {
      game.npcs.forEach(npc => {
        if (npc.destroy && typeof npc.destroy === 'function') {
          npc.destroy();
        }
      });
      game.npcs = [];
    }

    // Limpiar decoraciones
    if (game.gestorDecoraciones) {
      game.gestorDecoraciones.gestorBase.limpiar();
      game.gestorDecoraciones.limpiarInteractivas();
    }

    // NUEVO: Limpiar sistema de colisión de muros
    if (game.collisionWalls) {
      game.collisionWalls.clear();
    }
  },

  // NUEVO: Método para inicializar el sistema de colisión de muros
  async initCollisionWalls(game) {
    
    // Crear el sistema si no existe
    if (!game.collisionWalls) {
      game.collisionWalls = new CollisionWalls();
    }
    
    // Inicializar con los muros de este mapa
    game.collisionWalls.init(this.walls);
    
    // Activar modo debug si está en desarrollo (opcional)
    game.collisionWalls.setDebugMode(true);
    
  },

  // Inicializar NPCs
  async initNPCs(game) {
    
    for (const npcData of this.npcs) {
      try {
        const npc = new NPC(npcData.id, npcData.x, npcData.y, npcData.sprite);
        game.npcs.push(npc);
      } catch (error) {
        console.error(`Error creando NPC ${npcData.id}:`, error);
      }
    }
    
  },

  // Inicializar decoraciones
  async initDecorations(game) {
    
    for (const decor of this.decorations) {
      try {
        await game.gestorDecoraciones.gestorBase.agregarDesdeConfig(
          decor.sprite, decor.x, decor.y,
          decor.width, decor.height, decor.hasCollision
        );
      } catch (error) {
        console.error(`Error cargando decoración:`, error);
      }
    }
  },

  // NUEVO: Inicializar decoraciones interactivas
  async initInteractiveDecorations(game) {
    for (const decor of this.interactiveDecorations) {
      try {
        // Obtener la información asociada al ID
        const infoData = getInteractiveInfo(decor.infoId);
        
        if (!infoData) {
          // Agregar como decoración normal si no tiene información
          await game.gestorDecoraciones.gestorBase.agregarDesdeConfig(
            decor.sprite, decor.x, decor.y, decor.width, decor.height, decor.hasCollision
          );
          continue;
        }
        
        // NUEVO: Combinar la información con el type_ui de la configuración
        const combinedInfo = {
          ...infoData,
          type_ui: decor.type_ui || infoData.type_ui || 'default'
        };
        
        // Agregar como decoración interactiva
        await game.gestorDecoraciones.agregarInteractivaDesdeConfig(
          decor.sprite, decor.x, decor.y, decor.width, decor.height, 
          decor.hasCollision, combinedInfo
        );
      } catch (error) {
        console.error(`Error cargando decoración interactiva ${decor.infoId}:`, error);
      }
    }
  },

  // Inicializar muros
  async initWalls(game) {
    
    if (game.wallManager) {
      try {
        await game.wallManager.changeWallImage(this.wallImage);
      } catch (error) {
        console.error('Error actualizando imagen de muros:', error);
      }
    }
  }
};
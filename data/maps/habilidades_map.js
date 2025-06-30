// data/maps/habilidades_map.js
import { NPC } from "../../scripts/components/npc.js";
import { CollisionWalls } from "../../scripts/world/collision_wall.js";
import { getInteractiveInfo } from "./interactive_info.js";

export const HabilidadesMapConfig = {
  name: 'right',
  wallImage: 'static/assets/sprites/tilesets/walls/wall_right.png',
  floorImage: 'static/assets/sprites/tilesets/floor/baldosa.png',
  
  // NPCs específicos del mapa de habilidades
  npcs: [
    {
      id: 'varek',
      x: 450,
      y: 550,
      sprite: 'static/assets/sprites/characters/npcs/npc_2.png'
    },
    {
      id: 'nexa',
      x: 1200,
      y: 550,
      sprite: 'static/assets/sprites/characters/npcs/npc_3.png'
    }
  ],

  walls: [
    {
      id: 'wall_top',
      x: 68, y: 70, width: 1780, height: 140,
      type: 'perimeter',
      hasCollision: true
    },
    {
      id: 'wall_left',
      x: 68, y: 70, width: 84, height: 595,
      type: 'perimeter',
      hasCollision: true
    },
    {
      id: 'wall_right',
      x: 1758, y: 70, width: 90, height: 783,
      type: 'perimeter',
      hasCollision: true
    },
    {
      id: 'wall_center',
      x: 760, y: 70, width: 122, height: 580,
      type: 'perimeter',
      hasCollision: true
    },
    
  
    {
      id: 'wall_left_bottom',
      x: 68, y: 860, width: 1840, height: 100,
      type: 'internal',
      hasCollision: true
    },
    {
      id: 'wall_left_bottom_false',
      x: 68, y: 820, width: 1840, height: 95,
      type: 'architecture',
      hasCollision: false,
      isHidingZone: true,           
      hideOpacity: 0.95,           
      hideType: 'outline',             
      depthLevel: 1   
    },
    {
      id: 'wall_left_structure',
      x: 152, y: 555, width: 180, height: 100,
      type: 'structure',
      hasCollision: true
    },
    {
      id: 'wall_left_structure_false',
      x: 152, y: 515, width: 180, height: 95,
      type: 'architecture',
      hasCollision: false,
      isHidingZone: true,           
      hideOpacity: 0.95,           
      hideType: 'outline',             
      depthLevel: 1   
    },
    {
      id: 'wall_center_structure',
      x: 558, y: 555, width: 522, height: 100,
      type: 'structure',
      hasCollision: true
    },
    {
      id: 'wall_center_structure_false',
      x: 558, y: 515, width: 522, height: 95,
      type: 'architecture',
      hasCollision: false,
      isHidingZone: true,           
      hideOpacity: 0.95,           
      hideType: 'outline',             
      depthLevel: 1   
    },
    {
      id: 'wall_right_structure',
      x: 1319, y: 555, width: 505, height: 100,
      type: 'structure',
      hasCollision: true
    },
    {
      id: 'wall_right_structure_false',
      x: 1319, y: 515, width: 505, height: 95,
      type: 'architecture',
      hasCollision: false,
      isHidingZone: true,           
      hideOpacity: 0.95,           
      hideType: 'outline',             
      depthLevel: 1   
    }
  ],

  // Decoraciones para el mapa de habilidades
  decorations: [
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 660, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 190, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 990, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1415, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1650, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 1090, y: 650, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 340, y: 650, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 550, y: 650, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 1310, y: 650, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 1735, y: 650, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 1735, y: 210, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 175, y: 210, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 738, y: 210, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 908, y: 210, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/impaldiesel_vitrina.png',
      x: 298, y: 370, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/eeasa_vitrina.png',
      x: 600, y: 370, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 640, y: 230, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 270, y: 230, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1008, y: 230, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1635, y: 230, width: 110, height: 75,
      hasCollision: true
    },


    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/wamo_poster.png',
      x: 410, y: 160, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/sonel_poster.png',
      x: 500, y: 160, width: 60, height: 80,
      hasCollision: true
    },


    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/gbd_vitrina.png',
      x: 1050, y: 370, width: 200, height: 135,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/web_vitrina.png',
      x: 1320, y: 370, width: 200, height: 135,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/back_vitrina.png',
      x: 1590, y: 370, width: 200, height: 135,
      hasCollision: true
    },

    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/figma_poster.png',
      x: 1530, y: 605, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/boostrap_poster.png',
      x: 780, y: 605, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/boostrap_poster.png',
      x: 870, y: 605, width: 60, height: 80,
      hasCollision: true
    },
  ],

  // NUEVO: Decoraciones interactivas (con información)
  interactiveDecorations: [
    {
      sprite: 'static/assets/sprites/tilesets/decor/informacion.png',
      x: 360, y: 180, width: 30, height: 40,
      hasCollision: true,
      infoId: 'wamo',
      type_ui: 'default'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/informacion.png',
      x: 550, y: 180, width: 30, height: 40,
      hasCollision: true,
      infoId: 'sonel_analysis',
      type_ui: 'default'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 515, y: 455, width: 45, height: 60,
      hasCollision: true,
      infoId: 'impaldiesel',
      type_ui: 'principal'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 380, y: 455, width: 45, height: 60,
      hasCollision: true,
      infoId: 'eeasa',
      type_ui: 'principal'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 1050, y: 462, width: 45, height: 60,
      hasCollision: true,
      infoId: 'database_skills',
      type_ui: 'principal'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 1315, y: 462, width: 45, height: 60,
      hasCollision: true,
      infoId: 'frontend_skills',
      type_ui: 'principal'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 1590, y: 462, width: 45, height: 60,
      hasCollision: true,
      infoId: 'backend_skills',
      type_ui: 'principal'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/stack_vitrina.png',
      x: 1323, y: 205, width: 210, height: 135,
      hasCollision: true,
      infoId: 'ecosystem_tools',
      type_ui: 'principal'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/bd_vitrina.png',
      x: 1150, y: 205, width: 100, height: 135,
      hasCollision: true,
      infoId: 'complementary_db',
      type_ui: 'principal'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/ui_vitrina.png',
      x: 1495, y: 205, width: 100, height: 135,
      hasCollision: true,
      infoId: 'uiux_tools',
      type_ui: 'principal'
    },
  ],

  // Punto de spawn por defecto para este mapa
  defaultSpawn: { x: 100, y: 400 },

  // Función de inicialización del mapa de habilidades
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
      console.error('Error inicializando mapa de habilidades:', error);
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
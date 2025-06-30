// data/maps/main_map.js
import { NPC } from "../../scripts/components/npc.js";
import { CollisionWalls } from "../../scripts/world/collision_wall.js";
import { getInteractiveInfo } from "./interactive_info.js";

export const MainMapConfig = {
  name: 'main',
  wallImage: 'static/assets/sprites/tilesets/walls/wall_principal.png',
  floorImage: 'static/assets/sprites/tilesets/floor/baldosa.png',
  
  // NPCs específicos del mapa principal
  npcs: [
    {
      id: 'lumo',
      x: 852,
      y: 600,
      sprite: 'static/assets/sprites/characters/npcs/npc_1.png'
    },
    {
      id: 'prix', 
      x: 500,
      y: 415,
      sprite: 'static/assets/sprites/characters/npcs/npc_2.png'
    },
    {
      id: 'will', 
      x: 1380,
      y: 480,
      sprite: 'static/assets/sprites/characters/npcs/npc_3.png'
    },
  ],

  walls: [
    // Muros perimetrales
    {
      id: 'wall_top',
      x: 68, y: 70, width: 1780, height: 150,
      type: 'perimeter',
      hasCollision: true
    },
    {
      id: 'wall_left',
      x: 68, y: 70, width: 87, height: 590,
      type: 'perimeter',
      hasCollision: true
    },
    {
      id: 'wall_right',
      x: 1760, y: 70, width: 90, height: 590,
      type: 'perimeter',
      hasCollision: true
    },
    
    // Muros internos específicos del mapa principal
    {
      id: 'wall_left_top',
      x: 614, y: 70, width: 65, height: 328,
      type: 'internal',
      hasCollision: true
    },
    {
      id: 'wall_right_top',
      x: 1248, y: 70, width: 65, height: 328,
      type: 'internal',
      hasCollision: true
    },
    {
      id: 'wall_left_bottom',
      x: 68, y: 845, width: 740, height: 100,
      type: 'internal',
      hasCollision: true
    },
    {
      id: 'wall_right_bottom',
      x: 1099, y: 845, width: 740, height: 100,
      type: 'internal',
      hasCollision: true
    },
    {
      id: 'wall_left_structure',
      x: 155, y: 550, width: 525, height: 110,
      type: 'structure',
      hasCollision: true
    },
    {
      id: 'wall_right_structure',
      x: 1245, y: 550, width: 525, height: 110,
      type: 'structure',
      hasCollision: true
    }
  ],

  // Decoraciones específicas del mapa principal
  decorations: [
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/gut_vitrina.png',
      x: 390, y: 380, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 1235, y: 650, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 690, y: 650, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 648, y: 395, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/penitente_vitrina.png',
      x: 1540, y: 380, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 1282, y: 395, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/yo_cuadro.png',
      x: 970, y: 160, width: 85, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/varandal.png',
      x: 821, y: 220, width: 292, height: 30,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/varandal.png',
      x: 1110, y: 220, width: 292, height: 30,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/meaculpa_vitrina.png',
      x: 1722, y: 210, width: 90, height: 150,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/helmet_vitrina.png',
      x: 1355, y: 210, width: 90, height: 150,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/varandal.png',
      x: 1538, y: 220, width: 300, height: 30,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/dragonslayer_vitrina.png',
      x: 195, y: 210, width: 90, height: 150,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/behelist_vitrina.png',
      x: 572, y: 210, width: 90, height: 150,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/varandal.png',
      x: 384, y: 220, width: 300, height: 30,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 530, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1400, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1700, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1548, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/js_poster.png',
      x: 1800, y: 610, width: 50, height: 70,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/script_vitrina.png',
      x: 970, y: 385, width: 200, height: 130,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/dis_vitrina.png',
      x: 972, y: 555, width: 210, height: 135,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/php_vitrina_2.png',
      x: 795, y: 445, width: 85, height: 175,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/python_vitrina_2.png',
      x: 1150, y: 445, width: 85, height: 175,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/css_poster.png',
      x: 620, y: 610, width: 50, height: 70,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/css_poster.png',
      x: 1305, y: 610, width: 50, height: 70,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 220, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 385, y: 670, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/js_poster.png',
      x: 120, y: 610, width: 50, height: 70,
      hasCollision: true
    },
    
  ],

  interactiveDecorations: [
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/draw_cuadro.png',
      x: 810, y: 170, width: 85, height: 90,
      hasCollision: true,
      infoId: 'draw1',
      type_ui: 'gallery'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/draw_cuadro_2.png',
      x: 1110, y: 170, width: 85, height: 90,
      hasCollision: true,
      infoId: 'draw2',
      type_ui: 'gallery'
    },


    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/guts_cuadro.png',
      x: 390, y: 170, width: 85, height: 90,
      hasCollision: true,
      infoId: 'guts',
      type_ui: 'gallery'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/principal_map/penitente_cuadro.png',
      x: 1535, y: 170, width: 85, height: 90,
      hasCollision: true,
      infoId: 'penitente',
      type_ui: 'gallery'
    },


    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 440, y: 460, width: 45, height: 60,
      hasCollision: true,
      infoId: 'gut_statue',
      type_ui: 'simple'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 1480, y: 460, width: 45, height: 60,
      hasCollision: true,
      infoId: 'penitent_statue',
      type_ui: 'simple'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 960, y: 650, width: 45, height: 60,
      hasCollision: true,
      infoId: 'tecnologias',
      type_ui: 'principal'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/informacion.png',
      x: 905, y: 170, width: 30, height: 40,
      hasCollision: true,
      infoId: 'aboutme',
      type_ui: 'simple'
    },
  ],

  // Punto de spawn por defecto
  defaultSpawn: { x: 960, y: 800 },

  // Función de inicialización del mapa
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
      console.error('Error inicializando mapa principal:', error);
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
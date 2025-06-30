// data/maps/habilidades_map.js
import { NPC } from "../../scripts/components/npc.js";
import { CollisionWalls } from "../../scripts/world/collision_wall.js";
import { getInteractiveInfo } from "./interactive_info.js";

export const ContactMapConfig = {
  name: 'bottom',
  wallImage: 'static/assets/sprites/tilesets/walls/bottom_wall.png',
  floorImage: 'static/assets/sprites/tilesets/floor/baldosa.png',
  
  // NPCs específicos del mapa de habilidades
  npcs: [
    {
      id: 'echo',
      x: 480,
      y: 330,
      sprite: 'static/assets/sprites/characters/npcs/npc_2.png'
    },
    {
      id: 'rune',
      x: 1470,
      y: 330,
      sprite: 'static/assets/sprites/characters/npcs/npc_1.png'
    }
  ],

  walls: [
    {
      id: 'wall_top_left',
      x: 68, y: 70, width: 735, height: 156,
      type: 'perimeter',
      hasCollision: true
    },
    {
      id: 'wall_top_right',
      x: 1093, y: 70, width: 735, height: 156,
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
      x: 1760, y: 70, width: 90, height: 780,
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
      id: 'wall_center_structure',
      x: 597, y: 420, width: 753, height: 133,
      type: 'structure',
      hasCollision: true
    },
    {
      id: 'wall_center_bottom',
      x: 900, y: 420, width: 118, height: 470,
      type: 'structure',
      hasCollision: true
    }
  ],

  // Decoraciones para el mapa de habilidades
  decorations: [
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 1740, y: 215, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 175, y: 215, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 877, y: 538, width: 70, height: 90,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_1.png',
      x: 1045, y: 538, width: 70, height: 90,
      hasCollision: true
    },

    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 800, y: 215, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/arbol_2.png',
      x: 1090, y: 215, width: 60, height: 80,
      hasCollision: true
    },

    {
      sprite: 'static/assets/sprites/tilesets/decor/contact_map/cv_vitrina.png',
      x: 370, y: 430, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/contact_map/git_vitrina.png',
      x: 370, y: 670, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/contact_map/google_vitrina.png',
      x: 1565, y: 430, width: 120, height: 190,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/contact_map/cisco_vitrina.png',
      x: 1565, y: 670, width: 120, height: 190,
      hasCollision: true
    },

    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 660, y: 230, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 300, y: 230, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1240, y: 230, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1612, y: 230, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 1200, y: 550, width: 110, height: 75,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/banca.png',
      x: 740, y: 550, width: 110, height: 75,
      hasCollision: true
    },

    {
      sprite: 'static/assets/sprites/tilesets/decor/contact_map/cursos_vitrina.png',
      x: 1200, y: 695, width: 210, height: 155,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/contact_map/contact_vitrina.png',
      x: 700, y: 695, width: 100, height: 135,
      hasCollision: true
    },


    {
      sprite: 'static/assets/sprites/tilesets/decor/projects_map/react_poster.png',
      x: 415, y: 160, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/hability_map/figma_poster.png',
      x: 485, y: 160, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/python_poster.png',
      x: 555, y: 160, width: 60, height: 80,
      hasCollision: true
    },

    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/html_poster.png',
      x: 1350, y: 160, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/js_poster.png',
      x: 1420, y: 160, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/tecnologias/css_poster.png',
      x: 1490, y: 160, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/contact_map/portrait_poster.png',
      x: 1300, y: 480, width: 60, height: 80,
      hasCollision: true
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/contact_map/portrait_poster.png',
      x: 650, y: 480, width: 60, height: 80,
      hasCollision: true
    },
  ],

  // NUEVO: Decoraciones interactivas (con información)
  interactiveDecorations: [
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 430, y: 520, width: 45, height: 60,
      hasCollision: true,
      infoId: 'cv',
      type_ui: 'simple'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 430, y: 750, width: 45, height: 60,
      hasCollision: true,
      infoId: 'git',
      type_ui: 'simple'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 1500, y: 520, width: 45, height: 60,
      hasCollision: true,
      infoId: 'google',
      type_ui: 'simple'
    },
    {
      sprite: 'static/assets/sprites/tilesets/decor/libro_vitrina.png',
      x: 1500, y: 750, width: 45, height: 60,
      hasCollision: true,
      infoId: 'cisco',
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
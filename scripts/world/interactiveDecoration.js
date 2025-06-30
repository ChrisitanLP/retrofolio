// scripts/world/InteractiveDecoration.js
import { Decoracion } from "./decoration.js";

export class InteractiveDecoration extends Decoracion {
  constructor(imagen, x, y, ancho, alto, conColision = true, infoData = null) {
    super(imagen, x, y, ancho, alto, conColision);
    
    this.isInteractive = infoData !== null;
    this.infoData = infoData;
    this.interactionRange = 80; // Rango de interacción en píxeles
    this.playerInRange = false;
  }

  // Verificar si el jugador está en rango de interacción
  isPlayerInRange(playerX, playerY) {
    const distance = Math.sqrt(
      Math.pow(playerX - this.x, 2) + Math.pow(playerY - this.y, 2)
    );
    
    const wasInRange = this.playerInRange;
    this.playerInRange = distance <= this.interactionRange;
    
    return {
      inRange: this.playerInRange,
      justEntered: this.playerInRange && !wasInRange,
      justLeft: !this.playerInRange && wasInRange
    };
  }

  // Obtener la información de interacción
  getInteractionInfo() {
    return this.infoData;
  }

  // Método para actualizar la información (útil para decoraciones dinámicas)
  updateInfo(newInfoData) {
    this.infoData = newInfoData;
    this.isInteractive = newInfoData !== null;
  }

  // Método de debug para visualizar el rango de interacción
  drawInteractionRange(ctx, color = "blue") {
    if (!this.isInteractive) return;
    
    ctx.save();
    ctx.strokeStyle = color;
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.interactionRange, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.restore();
  }

  // Override del método dibujar para añadir indicador visual (opcional)
  dibujar(ctx) {
    // Dibujar la decoración normal
    super.dibujar(ctx);
    
    // Si es interactiva y el jugador está en rango, añadir un sutil efecto visual
    if (this.isInteractive && this.playerInRange) {
      this.drawInteractionIndicator(ctx);
    }
  }

  // Indicador visual sutil cuando el jugador está en rango
  drawInteractionIndicator(ctx) {
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
    ctx.shadowColor = "yellow";
    ctx.shadowBlur = 10;
    
    // Pequeño brillo alrededor de la decoración
    ctx.fillRect(
      this.x - this.ancho / 2 - 5,
      this.y - this.alto / 2 - 5,
      this.ancho + 10,
      this.alto + 10
    );
    
    ctx.restore();
  }
}

// Extensión del GestorDecoraciones para manejar decoraciones interactivas
export class GestorDecoracionesInteractivas {
  constructor(gestorBase) {
    this.gestorBase = gestorBase;
    this.decoracionesInteractivas = [];
  }

  // Agregar decoración interactiva
  agregarInteractiva(imagen, x, y, ancho, alto, conColision = true, infoData = null) {
    const decoracion = new InteractiveDecoration(imagen, x, y, ancho, alto, conColision, infoData);
    
    // Agregar al gestor base también
    this.gestorBase.agregar(decoracion);
    
    // Mantener referencia separada de las interactivas
    if (decoracion.isInteractive) {
      this.decoracionesInteractivas.push(decoracion);
    }
    
    return decoracion;
  }

  // Agregar decoración interactiva desde configuración
  async agregarInteractivaDesdeConfig(rutaImagen, x, y, ancho, alto, conColision = true, infoData = null) {
    const decoracion = new InteractiveDecoration(rutaImagen, x, y, ancho, alto, conColision, infoData);
    
    // Esperar a que se cargue la imagen
    if (typeof rutaImagen === 'string') {
      await decoracion.cargarImagen(rutaImagen);
    }
    
    // Agregar al gestor base
    this.gestorBase.agregar(decoracion);
    
    // Mantener referencia separada de las interactivas
    if (decoracion.isInteractive) {
      this.decoracionesInteractivas.push(decoracion);
    }
    
    return decoracion;
  }

  // Verificar proximidad del jugador a decoraciones interactivas
  checkPlayerProximity(playerX, playerY) {
    const proximityResults = {
      nearbyInteractive: null,
      justEnteredRange: false,
      justLeftRange: false
    };

    for (const decoracion of this.decoracionesInteractivas) {
      const rangeCheck = decoracion.isPlayerInRange(playerX, playerY);
      
      if (rangeCheck.inRange) {
        proximityResults.nearbyInteractive = decoracion;
      }
      
      if (rangeCheck.justEntered) {
        proximityResults.justEnteredRange = true;
      }
      
      if (rangeCheck.justLeft) {
        proximityResults.justLeftRange = true;
      }
    }

    return proximityResults;
  }

  // Obtener decoración interactiva en posición específica
  getInteractiveAt(x, y) {
    return this.decoracionesInteractivas.find(decoracion => 
      decoracion.contienePunto(x, y) && decoracion.isInteractive
    );
  }

  // Obtener todas las decoraciones interactivas en rango
  getInteractivesInRange(playerX, playerY) {
    return this.decoracionesInteractivas.filter(decoracion => 
      decoracion.isPlayerInRange(playerX, playerY).inRange
    );
  }

  // Método de debug para dibujar rangos de interacción
  drawInteractionRanges(ctx) {
    this.decoracionesInteractivas.forEach(decoracion => {
      decoracion.drawInteractionRange(ctx);
    });
  }

  // Limpiar decoraciones interactivas
  limpiarInteractivas() {
    this.decoracionesInteractivas = [];
    // El gestor base maneja su propia limpieza
  }

  // Obtener estadísticas
  getStats() {
    return {
      total: this.gestorBase.cantidad,
      interactive: this.decoracionesInteractivas.length,
      inRange: this.decoracionesInteractivas.filter(d => d.playerInRange).length
    };
  }

  // Acceso directo a métodos del gestor base
  get decoraciones() {
    return this.gestorBase.decoraciones;
  }

  dibujarTodas(ctx) {
    return this.gestorBase.dibujarTodas(ctx);
  }

  dibujarAnteriores(ctx, jugador) {
    return this.gestorBase.dibujarAnteriores(ctx, jugador);
  }

  dibujarPosteriores(ctx, jugador) {
    return this.gestorBase.dibujarPosteriores(ctx, jugador);
  }

  verificarColisiones(jugador) {
    return this.gestorBase.verificarColisiones(jugador);
  }

  verificarColisionEnPosicion(x, y, ancho, alto) {
    return this.gestorBase.verificarColisionEnPosicion(x, y, ancho, alto);
  }

  dibujarColisionesDebug(ctx) {
    return this.gestorBase.dibujarColisionesDebug(ctx);
  }

  dibujarZonasSuperioresDebug(ctx) {
    return this.gestorBase.dibujarZonasSuperioresDebug(ctx);
  }
}
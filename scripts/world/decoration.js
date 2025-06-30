import { DECORATION_CONFIG } from "../../config/decoration_config.js";

export class Decoracion {
  constructor(imagen, x, y, ancho, alto, conColision = true) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.conColision = conColision; // Permite decoraciones sin colisión
    this.sprite = null;
    this.cargada = false;

    this.factorColision = DECORATION_CONFIG.base.factorColision;
    this.recorteSuperior = DECORATION_CONFIG.base.recorteSuperior;    
    this.zonaProferidadSuperior = DECORATION_CONFIG.base.zonaProferidadSuperior;
    
    // Si recibimos una ruta de imagen, cargarla
    if (typeof imagen === 'string') {
      this.cargarImagen(imagen);
    } else if (imagen instanceof Image) {
      this.sprite = imagen;
      this.cargada = true;
    }
  }

  async cargarImagen(rutaImagen) {
    try {
      this.sprite = await Utils.loadImage(rutaImagen);
      this.cargada = true;
    } catch (error) {
      console.error(`Error cargando decoración: ${rutaImagen}`, error);
    }
  }

  dibujar(ctx) {
    if (!this.sprite || !this.cargada) return;
    
    ctx.drawImage(
      this.sprite,
      this.x - this.ancho / 2,  
      this.y - this.alto / 2,  
      this.ancho,
      this.alto
    );
  }

  jugadorEnZonaSuperior(jugador) {
    const jugadorAncho = jugador.collisionWidth || jugador.width || jugador.frameWidth * jugador.scale;
    const jugadorAlto = jugador.collisionHeight || jugador.height || jugador.frameHeight * jugador.scale;

    const jugadorIzq = jugador.x - jugadorAncho / 2;
    const jugadorDer = jugador.x + jugadorAncho / 2;
    const jugadorArr = jugador.y - jugadorAlto / 2;
    const jugadorAba = jugador.y + jugadorAlto / 2;

    // Definir la zona superior de la decoración
    const decoracionIzq = this.x - this.ancho / 2;
    const decoracionDer = this.x + this.ancho / 2;
    const decoracionArr = this.y - this.alto / 2;
    const altoZonaSuperior = this.alto * this.zonaProferidadSuperior;
    const decoracionZonaSuperiorAba = decoracionArr + altoZonaSuperior;

    // Verificar si el jugador está horizontalmente dentro de la decoración
    const horizontalmenteEnRango = !(jugadorDer < decoracionIzq || jugadorIzq > decoracionDer);
    
    // Verificar si el jugador está en la zona superior verticalmente
    const verticalmenteEnZonaSuperior = !(jugadorAba < decoracionArr || jugadorArr > decoracionZonaSuperiorAba);

    return horizontalmenteEnRango && verticalmenteEnZonaSuperior;
  }

  // NUEVO MÉTODO: Obtiene la profundidad Z para el renderizado
  obtenerProfundidad(jugador) {
    if (this.jugadorEnZonaSuperior(jugador)) {
      // Si el jugador está en la zona superior, la decoración debe renderizarse después (encima)
      return jugador.y + 1000; // Valor alto para asegurar que se dibuje después
    } else {
      // Profundidad normal basada en la posición Y de la decoración
      return this.y;
    }
  }

  // Método de colisión usando AABB (Axis-Aligned Bounding Box)
  colisionaCon(jugador) {
  if (!this.conColision) return false;

  const factor = this.factorColision;
  const recorteSuperior = this.recorteSuperior;

  const decoracionAncho = this.ancho * factor;
  const decoracionAlto = this.alto * factor - recorteSuperior;

  const decoracionIzq = this.x - decoracionAncho / 2;
  const decoracionDer = this.x + decoracionAncho / 2;
  const decoracionArr = this.y - decoracionAlto / 2 + recorteSuperior / 2;
  const decoracionAba = this.y + decoracionAlto / 2 + recorteSuperior / 2;

  const jugadorAncho = jugador.collisionWidth || jugador.width || jugador.frameWidth * jugador.scale;
  const jugadorAlto = jugador.collisionHeight || jugador.height || jugador.frameHeight * jugador.scale;

  const jugadorIzq = jugador.x - jugadorAncho / 2;
  const jugadorDer = jugador.x + jugadorAncho / 2;
  const jugadorArr = jugador.y - jugadorAlto / 2;
  const jugadorAba = jugador.y + jugadorAlto / 2;

  return !(
    decoracionDer < jugadorIzq || 
    decoracionIzq > jugadorDer || 
    decoracionAba < jugadorArr || 
    decoracionArr > jugadorAba
  );
}

  // Método para verificar colisión en una posición específica (útil para predicción)
  colisionaConPosicion(x, y, ancho, alto) {
  if (!this.conColision) return false;

  const factor = this.factorColision;
  const recorteSuperior = this.recorteSuperior;

  const decoracionAncho = this.ancho * factor;
  const decoracionAlto = this.alto * factor - recorteSuperior;

  const decoracionIzq = this.x - decoracionAncho / 2;
  const decoracionDer = this.x + decoracionAncho / 2;
  const decoracionArr = this.y - decoracionAlto / 2 + recorteSuperior / 2;
  const decoracionAba = this.y + decoracionAlto / 2 + recorteSuperior / 2;

  const objetoIzq = x - ancho / 2;
  const objetoDer = x + ancho / 2;
  const objetoArr = y - alto / 2;
  const objetoAba = y + alto / 2;

  return !(
    decoracionDer < objetoIzq || 
    decoracionIzq > objetoDer || 
    decoracionAba < objetoArr || 
    decoracionArr > objetoAba
  );
}

// NUEVO MÉTODO DE DEBUG: Visualizar zona superior de profundidad
  dibujarZonaSuperiorDebug(ctx, color = "green") {
    const decoracionIzq = this.x - this.ancho / 2;
    const decoracionArr = this.y - this.alto / 2;
    const altoZonaSuperior = this.alto * this.zonaProferidadSuperior;

    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(decoracionIzq, decoracionArr, this.ancho, altoZonaSuperior);
    ctx.restore();
  }


  // Método de debug para visualizar la caja de colisión
  dibujarColision(ctx, color = "blue") {
    if (!this.conColision) return;

    const factor = this.factorColision;
    const recorteSuperior = this.recorteSuperior;

    const anchoReducido = this.ancho * factor;
    const altoReducido = this.alto * factor - recorteSuperior;

    const offsetX = this.x - anchoReducido / 2;
    const offsetY = this.y - altoReducido / 2 + recorteSuperior / 2;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(offsetX, offsetY, anchoReducido, altoReducido);
    ctx.restore();
  }

  // Verificar si un punto está dentro de la decoración
  contienePunto(x, y) {
    return x >= this.x - this.ancho / 2 && 
           x <= this.x + this.ancho / 2 && 
           y >= this.y - this.alto / 2 && 
           y <= this.y + this.alto / 2;
  }

  // Método para actualizar posición si es necesario
  mover(nuevaX, nuevaY) {
    this.x = nuevaX;
    this.y = nuevaY;
  }

  // Método para cambiar tamaño
  redimensionar(nuevoAncho, nuevoAlto) {
    this.ancho = nuevoAncho;
    this.alto = nuevoAlto;
  }
}

// Clase auxiliar para manejar múltiples decoraciones
export class GestorDecoraciones {
  constructor() {
    this.decoraciones = [];
  }

  agregar(decoracion) {
    this.decoraciones.push(decoracion);
  }

  agregarDesdeConfig(rutaImagen, x, y, ancho, alto, conColision = true) {
    const decoracion = new Decoracion(rutaImagen, x, y, ancho, alto, conColision);
    this.agregar(decoracion);
    return decoracion;
  }

  obtenerDecoracionesPorProfundidad(jugador) {
    const decoracionesAnteriores = [];
    const decoracionesPosteriores = [];

    this.decoraciones.forEach(decoracion => {
      if (decoracion.jugadorEnZonaSuperior(jugador)) {
        // Decoración debe renderizarse después del jugador (encima)
        decoracionesPosteriores.push(decoracion);
      } else {
        // Decoración debe renderizarse antes del jugador (detrás)
        decoracionesAnteriores.push(decoracion);
      }
    });

    return {
      anteriores: decoracionesAnteriores,
      posteriores: decoracionesPosteriores
    };
  }

  dibujarTodas(ctx) {
    this.decoraciones.forEach(decoracion => {
      decoracion.dibujar(ctx);
    });
  }

  dibujarAnteriores(ctx, jugador) {
    const { anteriores } = this.obtenerDecoracionesPorProfundidad(jugador);
    anteriores.forEach(decoracion => {
      decoracion.dibujar(ctx);
    });
  }

  // NUEVO MÉTODO: Dibujar solo decoraciones posteriores
  dibujarPosteriores(ctx, jugador) {
    const { posteriores } = this.obtenerDecoracionesPorProfundidad(jugador);
    posteriores.forEach(decoracion => {
      decoracion.dibujar(ctx);
    });
  }

  // Método para verificar si hay decoraciones cargadas
  hasDecorations() {
    return this.decoraciones.length > 0;
  }


  verificarColisiones(jugador) {
    return this.decoraciones.some(decoracion => 
      decoracion.colisionaCon(jugador)
    );
  }

  verificarColisionEnPosicion(x, y, ancho, alto) {
    const colision = this.decoraciones.some(decoracion => {
      const resultado = decoracion.colisionaConPosicion(x, y, ancho, alto);
      if (resultado) {
      }
      return resultado;
    });
    return colision;
  }

  dibujarColisionesDebug(ctx) {
    this.decoraciones.forEach(decoracion => {
      decoracion.dibujarColision(ctx);
    });
  }

  dibujarZonasSuperioresDebug(ctx) {
    this.decoraciones.forEach(decoracion => {
      decoracion.dibujarZonaSuperiorDebug(ctx);
    });
  }

  obtenerDecoracionen(x, y) {
    return this.decoraciones.find(decoracion => 
      decoracion.contienePunto(x, y)
    );
  }

  remover(decoracion) {
    const index = this.decoraciones.indexOf(decoracion);
    if (index > -1) {
      this.decoraciones.splice(index, 1);
    }
  }

  limpiar() {
    this.decoraciones = [];
  }

  get cantidad() {
    return this.decoraciones.length;
  }
}
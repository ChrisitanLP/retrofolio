# 🕹️ Retrofolio – Portafolio interactivo estilo videojuego retro

[![HTML5](https://img.shields.io/badge/HTML5-pixel-orange.svg)](#)
[![CSS3](https://img.shields.io/badge/CSS3-pixel-blue.svg)](#)
[![JavaScript](https://img.shields.io/badge/JS-pixel-yellow.svg)](#)

Portafolio personal desarrollado como una experiencia interactiva inspirada en los videojuegos clásicos de consola. El usuario puede desplazarse por un entorno 2D en estilo *pixelart*, explorando mapas, dialogando con NPCs e interactuando con los distintos elementos que representan habilidades, proyectos, certificados y obras visuales del autor.

---

## 📋 Tabla de Contenidos

- [🕹️ Retrofolio – Portafolio interactivo estilo videojuego retro](#️-retrofolio--portafolio-interactivo-estilo-videojuego-retro)
  - [📋 Tabla de Contenidos](#-tabla-de-contenidos)
  - [📌 Características principales](#-características-principales)
  - [🛠️ Requisitos previos](#️-requisitos-previos)
  - [📦 Instalación](#-instalación)
    - [1. Clonar o descargar el proyecto](#1-clonar-o-descargar-el-proyecto)
    - [2. Abrir en navegador](#2-abrir-en-navegador)
  - [📁 Estructura del proyecto](#-estructura-del-proyecto)
    - [📂 Descripción detallada de carpetas](#-descripción-detallada-de-carpetas)
    - [🏗️ Principios de diseño y arquitectura](#️-principios-de-diseño-y-arquitectura)
  - [⚙️ Configuración](#️-configuración)
  - [🚀 Uso](#-uso)
  - [🔧 Personalización](#-personalización)
  - [🛡️ Validación y compatibilidad](#️-validación-y-compatibilidad)
  - [🔍 Solución de problemas](#-solución-de-problemas)
  - [📊 Registro de logs](#-registro-de-logs)
  - [⚠️ Limitaciones](#️-limitaciones)
  - [🤝 Contribución](#-contribución)

---

## 📌 Características principales

* 🎮 Navegación libre por salas interconectadas con diseño tipo RPG clásico.
* 🧑‍💻 Diálogos animados con NPCs que presentan información del portafolio.
* 🖼️ Integración de proyectos, ilustraciones y certificados en formato interactivo.
* 🎨 Interfaz completamente diseñada con *pixel art*.
* 🛠️ Motor de juego propio usando HTML5 Canvas, sin dependencias externas.

---

## 🛠️ Requisitos previos

Solo necesitas un navegador moderno con soporte para:

* HTML5
* CSS3
* JavaScript ES6+

No requiere servidor ni backend.

---

## 📦 Instalación

### 1. Clonar o descargar el proyecto

```bash
git clone https://github.com/crisu-picaihua/portafolio-retro.git
cd portafolio-retro
```

O descarga el `.zip` directamente desde el [repositorio](https://github.com/crisu-picaihua/portafolio-retro).

### 2. Abrir en navegador

Abre el archivo `index.html` en tu navegador preferido:

```bash
start index.html  # En Windows
open index.html   # En MacOS
```

---

## 📁 Estructura del proyecto

```bash
/portafolio-retro/
│
├── index.html                      # Página principal única del portafolio
├── favicon.ico
│
├── config/
│   ├── decoration_config.js 
│   ├── dialog_config.js 
│   ├── npc_config.js 
│   ├── player_config.js 
│   └── portrait_config.js 
│
├── styles/
│   └── style.css                   # Estilos principales
│
├── data/
│   ├── maps/                       # Configuración de cada pantalla/mapa
│   │   ├── main_map.js 
│   │   ├── proyectos_map.js 
│   │   ├── habilidades_map.js 
│   │   └── interactive_info.js  
│   │
│   └── npc_data/                   
│       └── dialog_data.js
│
├── scripts/
│   ├── core/                       # Núcleo del motor
│   │   ├── main.js                 # Lógica principal del juego
│   │   ├── utils.js
│   │   └── mapManager.js          # Gestor de cambios de mapas
│   │
│   ├── components/                # Entidades del juego
│   │   ├── player.js
│   │   ├── npc.js
│   │   ├── dialog.js
│   │   └── wallManager.js
│   │
│   ├── ui/                         # Interfaz gráfica
│   │   ├── portraitAnimator.js
│   │   ├── interactiveInfo.js
│   │   └── transitions.js         # Fundido, animaciones, etc.
│   │
│   └── world/                      # Elementos del entorno
│       ├── decoration.js
│       ├── collision_wall.js
│       ├── interactiveDecoration.js
│       └── npc_guia.js
│
├── static/
│   └── assets/
│       ├── background/             
│       │
│       └── sprites/
│           ├── characters/
│           │   ├── npcs/
│           │   │   └── Portrait/
│           │   └── player/
│           │       └── Portrait/
│           │
│           ├── tilesets/
│           │   ├── decor/
│           │   ├── floor/
│           │   └── walls/
│           │
│           └── UI/
│               ├── buttons/
│               ├── indicators/
│               └── dialog/
│
└── README.md                       # Documentación del proyecto

```

### 📂 Descripción detallada de carpetas

* **`config/`**: Define comportamiento del jugador, NPCs, decoraciones y retratos.
* **`data/maps/`**: Contiene los mapas de navegación como `proyectos_map.js`, `habilidades_map.js`, etc.
* **`scripts/core/`**: Núcleo del juego (`main.js`, `mapManager.js`, `utils.js`).
* **`scripts/components/`**: Entidades como `player.js`, `npc.js`, `dialog.js`.
* **`scripts/ui/`**: Animaciones y elementos gráficos como retratos o transiciones.
* **`static/assets/`**: Sprites, botones, fondos y elementos visuales.

### 🏗️ Principios de diseño y arquitectura

* Arquitectura modular orientada a componentes y entidades.
* Separación clara entre lógica del juego, configuración y presentación.
* Uso exclusivo de tecnologías del navegador para máxima compatibilidad.

---

## ⚙️ Configuración

No requiere configuración adicional.

Sin embargo, puedes personalizar:

* Diálogos: `data/npc_data/dialog_data.js`
* Mapas: `data/maps/*.js`
* Sprites: `static/assets/sprites/`

---

## 🚀 Uso

Explora la versión en línea:
🔗 [**Visitar Retrofolio**]()

Usa las teclas de dirección para moverte (`↑ ↓ ← →`) y la tecla `E` para interactuar con NPCs o elementos interactivos.

---

## 🔧 Personalización

Puedes modificar fácilmente:

* 🎭 Los personajes y sus diálogos.
* 🧭 El diseño de los mapas.
* 🎨 Los colores y estilo visual en `styles/style.css`.

---

## 🛡️ Validación y compatibilidad

Probado en:

* Google Chrome
* Microsoft Edge
* Firefox

Compatible con pantallas desde 1024×768px en adelante.

---

## 🔍 Solución de problemas

| Problema               | Solución sugerida                                                   |
| ---------------------- | ------------------------------------------------------------------- |
| El mapa no carga       | Verifica que las rutas de los scripts sean correctas.               |
| Diálogos no aparecen   | Revisa `dialog_data.js` y la configuración del NPC.                 |
| El jugador no se mueve | Asegúrate de que el evento `keydown` esté registrado correctamente. |

---

## 📊 Registro de logs

Los errores en ejecución se pueden revisar en la consola del navegador (F12 → Console).

---

## ⚠️ Limitaciones

* No está optimizado para dispositivos móviles.
* El sistema de colisiones puede mejorarse para detectar esquinas.

---

## 🤝 Contribución

¡Ideas creativas y mejoras son bienvenidas!

Puedes abrir un *issue* o enviar un *pull request* con mejoras gráficas, nuevas salas, funcionalidades o mejoras al motor.

---

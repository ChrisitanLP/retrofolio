const DIALOG_DATA = {
  kairo: {
    name: "Kairo",
    portrait: "static/assets/sprites/characters/npcs/Portrait/npc_3.png",
    messages: [  
      "Ah, un visitante curioso... ¿te interesan las soluciones reales?",
      "He visto cómo este desarrollador construyó integraciones robustas entre Odoo y WhatsApp, simuladores web y sistemas internos completos.",
      "Cada proyecto aquí no solo funciona, resuelve un problema concreto.",
      "Explora con calma. Yo te puedo señalar cuáles usan Python, Node.js o React si lo necesitas."
    ]
  },
  cat: {
    name: "Cat",
    portrait: "static/assets/sprites/characters/npcs/Portrait/npc_3.png",
    messages: [
      "¡Hola, viajero! Soy Cat, el explorador de proyectos.",
      "Aquí verás creaciones desarrolladas con distintas tecnologías y enfoques.",
      "Cada uno representa un reto resuelto con lógica, diseño y propósito.",
      "Si deseas saber más sobre algún proyecto, estaré encantado de guiarte."
    ]
  },
  lumo: {
    name: "Lumo",
    portrait: "static/assets/sprites/characters/npcs/Portrait/npc_1.png",
    messages: [
      "¡Hola! Soy Lumo, tu guía en esta sala especial.",
      "Aquí conocerás más sobre la persona detrás del código: sus valores, enfoque y visión profesional.",
      "No todo se trata de tecnología; también importa cómo se aplican las ideas con creatividad y propósito.",
      "Explora con libertad y descubre qué impulsa este portafolio desde dentro."
    ]
  },
  varek: {
    name: "Varek",
    portrait: "static/assets/sprites/characters/npcs/Portrait/npc_2.png",
    messages: [
      "¡Hola! Soy Varek, y me encargo de los datos del mundo real.",
      "Este desarrollador ya trabajó con empresas reales: automatizando con Python en EEASA o integrando plataformas en IMPALDIESEL.",
      "También ha creado soluciones desde cero: APIs, módulos personalizados y plataformas empresariales.",
      "Pregúntame por cualquier pasantía o caso de uso y te cuento cómo se resolvió técnicamente."
    ]
  },
  echo: {
    name: "Echo",
    portrait: "static/assets/sprites/characters/npcs/Portrait/npc_2.png",
    messages: [
      "¿Quieres enviar un mensaje o una propuesta laboral?",
      "Yo soy Echo, la encargada de mantener abiertas las líneas de comunicación.",
      "Puedes encontrar correo, LinkedIn y otros medios para contactarlo directamente desde esta sala.",
      "No dudes en acercarte, ¡es fácil conectar con alguien que ya está listo para colaborar!"
    ]
  },
  rune: {
    name: "Rune",
    portrait: "static/assets/sprites/characters/npcs/Portrait/npc_1.png",
    messages: [
      "Soy Rune, el guardián del conocimiento certificado.",
      "En esta sala encontrarás credenciales, cursos completados y logros formativos relevantes.",
      "Cada certificado representa esfuerzo, preparación y compromiso con el crecimiento profesional.",
      "Explora con confianza, estaré aquí para orientarte si necesitas más información."
    ]
  },
  nexa: {
    name: "Nexa",
    portrait: "static/assets/sprites/characters/npcs/Portrait/npc_3.png",
    messages: [
      "¡Hola! Yo soy Nexa.",
      "Aquí verás desde HTML5 Canvas hasta REST APIs y automatización de interfaces con PyAutoGUI.",
      "Este desarrollador domina tanto el frontend moderno como arquitecturas backend limpias y escalables.",
      "¿Buscas algo específico? Puedo hablarte de su stack, frameworks favoritos o incluso microservicios."
    ]
  },

  prix: {
    name: "Prix",
    portrait: "static/assets/sprites/characters/npcs/Portrait/npc_2.png",
    messages: [
      "¿Has oído hablar del Espadachín Negro?",
      "Berserk no es solo una historia de espadas y demonios...",
      "Es una exploración cruda del sufrimiento, la voluntad y la lucha contra el destino.",
      "Este rincón del portafolio es un homenaje a esa obra maestra.",
      "Porque a veces, las sombras también cuentan historias poderosas."
    ]
  },
  will: {
    name: "Will",
    portrait: "static/assets/sprites/characters/npcs/Portrait/npc_3.png",
    messages: [
      "El arte puede doler, y Blasphemous lo demuestra.",
      "Este juego no solo me atrapó por su gameplay brutal...",
      "Sino por su estética pixelart tan detallada, tan agónica y hermosa.",
      "La sección dedicada aquí es mi forma de decir: el arte también puede ser penitencia.",
      "Mira más de cerca... cada píxel está lleno de devoción y condena."
    ]
  },

  default: {
    name: "Unknown",
    portrait: "",
    messages: [
      "Hola viajero."
    ]
  },
  guide: {
    name: "Guía del Museo",
    portrait: "static/assets/sprites/characters/npcs/Portrait/guia.png", // Cambia por tu ruta
    messages: [
      "¡Bienvenido al Museo-Portafolio Digital!",
      "Soy tu guía virtual. Este lugar exhibe proyectos, habilidades y la historia creativa de nuestro desarrollador.",
      "Puedes moverte con las teclas de dirección o WASD. Presiona [X] para interactuar con otros personajes.",
      "Explora las diferentes secciones: cada NPC te contará sobre distintas áreas del portafolio.",
      "¡Que disfrutes tu visita! El recorrido comienza ahora..."
    ],
    roomDialogs: {
      left: {
        firstVisit: [
          "¡Bienvenido a la Sala de Proyectos!",
          "Aquí verás los desarrollos más representativos: desde integraciones empresariales hasta simuladores web  y automatización con Python.",
          "Kairo, tu guía técnico, te explicará la lógica detrás de cada proyecto y cómo se resolvieron necesidades reales.",
          "¡Explora con libertad y conoce las soluciones que demuestran mis capacidades en acción!"
        ],
        return: [
          "Has regresado a la Sala de Proyectos.",
          "¿Hay algún proyecto específico que te interese revisar más a fondo?",
          "Kairo estará encantado de darte más detalles."
        ]
      },
      right: {
        firstVisit: [
          "¡Has llegado a la Sala de Habilidades y Experiencia!",
          "Aquí se muestra mi stack tecnológico, las herramientas dominadas y la experiencia práctica adquirida en pasantías reales.",
          "Nexa, te hablará sobre lenguajes, frameworks y metodologías dominadas.",
          "Por otro lado, Varek, compartirá detalles de las pasantías, proyectos reales y cómo se aplicaron esas habilidades en contextos prácticos.",
          "¡Explora cada rincón y descubre cómo se conecta el conocimiento con la acción!"
        ],
        return: [
          "De vuelta en la Sala de Habilidades y Experiencia.",
          "¿Te interesa profundizar en una habilidad o conocer más sobre una experiencia específica?",
          "Nexa y Varek están listos para asistirte con información clara y útil."
        ]
      },
      bottom: {
        firstVisit: [
          "¡Bienvenido a la Sala de Contacto y Certificados!",
          "Aquí puedes consultar mis certificaciones oficiales, cursos realizados y medios de contacto profesional.",
          "Echo, es quien gestiona todos los medios de contacto disponibles.",
          "Mientras que Rune, resguarda las certificaciones, cursos y credenciales verificadas.",
          "Si deseas validar mi preparación o ponerte en contacto, esta sala es el lugar indicado."
        ],
        return: [
          "Has vuelto a la Sala de Contacto y Certificados.",
          "¿Buscas una certificación específica o un canal directo de comunicación?",
          "Echo y Rune están aquí para guiarte con precisión."
        ]
      },
    }
  }
};
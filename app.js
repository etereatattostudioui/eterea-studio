/* ========================================================
   ETÉREA TATTOO STUDIO - INKBOOK ENGINE (app.js)
   Fase 2: Arquitectura por Vistas Independientes, Metadatos de Obras,
   Navegación Dinámica y Paleta Oficial (#f0e9cf / #2756a2)
   ======================================================== */

// --- CONFIGURACIÓN SUPABASE OFICIAL ETÉREA ---
const SUPABASE_CONFIG = {
  url: 'https://luzjunwblwwjbdnvxsqj.supabase.co',
  key: 'sb_publishable_obLRr03yaRKj1N4mQtuNeA_22m9xg7x'
};

function getSupabaseClient() {
  if (window.supabaseClient) return window.supabaseClient;
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    try {
      window.supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
      console.log('⚡ Conexión a Supabase activada con éxito (Etérea Database)');
      return window.supabaseClient;
    } catch (e) {
      console.warn('Error inicializando cliente de Supabase:', e);
    }
  }
  return null;
}

// --- BASE DE DATOS / LOCALSTORAGE KEYS ---
const DB_KEYS = {
  CITAS: 'eterea_citas',
  TALLERES: 'eterea_talleres',
  GALERIA: 'eterea_galeria_v4',
  INSCRIPCIONES: 'eterea_inscripciones',
  AUTH: 'eterea_auth_session'
};

// Teléfono oficial de WhatsApp del estudio (Ecuador: +593)
const STUDIO_WHATSAPP = '593984123456';

// Datos semilla iniciales enriquecidos con descripciones y categorías solicitadas
const SEED_DATA = {
  galeria: [
    {
        "id": "gal-1",
        "title": "Metamorfosis Nocturna",
        "description": "Composición botánica y geométrica en negro de humo puro, explorando la transición entre luz y sombra en piel viva.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/1388D705-26A6-4A0A-A2E8-E0CA7CEF298B.JPG.jpeg",
        "fecha_creacion": "2026-10-01T12:00:00Z"
    },
    {
        "id": "gal-2",
        "title": "Esfinge Lunar & Filigrana",
        "description": "Técnica de blackwork ilustrativo con gradaciones de gris mineral y remates de micro-línea botánica.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/73A414CA-B86C-489B-A0DA-08D2630D9B39.PNG",
        "fecha_creacion": "2026-10-02T12:00:00Z"
    },
    {
        "id": "gal-3",
        "title": "Guardián de Obsidiana",
        "description": "Contraste absoluto con bloqueos de tinta densa y trazos finos que definen una silueta mística y orgánica.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/DA0E4A32-B4F9-4A92-959E-5C197AE237DB.jpg",
        "fecha_creacion": "2026-10-03T12:00:00Z"
    },
    {
        "id": "gal-4",
        "title": "Flora Umbría",
        "description": "Estudio botánico de raíces y hojas oscuras, compuesto para fluir anatómicamente con el movimiento corporal.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/E70485ED-DB26-4B21-A535-5AB7A2534B4F.jpg",
        "fecha_creacion": "2026-10-04T12:00:00Z"
    },
    {
        "id": "gal-5",
        "title": "Vuelo Sombrío",
        "description": "Texturas plumadas y líneas dinámicas trabajadas con aguja 05RL para una definición táctil y duradera.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0025.jpg",
        "fecha_creacion": "2026-10-05T12:00:00Z"
    },
    {
        "id": "gal-6",
        "title": "Oráculo Alquímico",
        "description": "Simbología esotérica con patrones concéntricos y sombreado denso en negro carbón puro.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0170.jpg",
        "fecha_creacion": "2026-10-06T12:00:00Z"
    },
    {
        "id": "gal-7",
        "title": "Bramido Salvaje",
        "description": "Expresionismo anatómico con claroscuros profundos y trazos cortados que transmiten poder y devoción.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0230.jpg",
        "fecha_creacion": "2026-10-07T12:00:00Z"
    },
    {
        "id": "gal-8",
        "title": "Crisálida Sagrada",
        "description": "Estructura simétrica con micro-tramas y detalle ilustrativo fino diseñado para envejecer con nitidez impecable.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0236.jpg",
        "fecha_creacion": "2026-10-08T12:00:00Z"
    },
    {
        "id": "gal-9",
        "title": "Ecos de Medianoche",
        "description": "Diseño de autor en antebrazo que une botánica andina y abstracción geométrica oscura.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0385.jpg",
        "fecha_creacion": "2026-10-09T12:00:00Z"
    },
    {
        "id": "gal-10",
        "title": "Manto de Espinas",
        "description": "Trazos fluidos entrelazados con sombras sólidas y micro-detalles en relieve visual.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0400.jpg",
        "fecha_creacion": "2026-10-10T12:00:00Z"
    },
    {
        "id": "gal-11",
        "title": "Solsticio Oscuro",
        "description": "Composición celestial con astros negros y texturas de línea continua en piel clara.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0452.jpg",
        "fecha_creacion": "2026-10-11T12:00:00Z"
    },
    {
        "id": "gal-12",
        "title": "Raíz Ancestral",
        "description": "Inspiración telúrica con pigmentos orgánicos saturados y remates limpios y elegantes.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0486.jpg",
        "fecha_creacion": "2026-10-12T12:00:00Z"
    },
    {
        "id": "gal-13",
        "title": "Fragmentos del Alma",
        "description": "Pieza conmemorativa con geometría sagrada y técnica de relleno uniforme libre de irritación.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0643.jpg",
        "fecha_creacion": "2026-10-13T12:00:00Z"
    },
    {
        "id": "gal-14",
        "title": "Serpiente y Cardo",
        "description": "Dinamismo anatómico serpenteante con escamas micro-ilustradas y hojas espinosas.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0859.jpg",
        "fecha_creacion": "2026-10-14T12:00:00Z"
    },
    {
        "id": "gal-15",
        "title": "Corona de Helechos",
        "description": "Botánica silvestre con líneas firmes y sombreado suave que abraza la curva del músculo.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0944.jpg",
        "fecha_creacion": "2026-10-15T12:00:00Z"
    },
    {
        "id": "gal-16",
        "title": "Portal Sombrío",
        "description": "Composición vertical de gran impacto que equilibra zonas de descanso de piel con negro absoluto.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_0968.jpg",
        "fecha_creacion": "2026-10-16T12:00:00Z"
    },
    {
        "id": "gal-17",
        "title": "Alquimia Silvestre",
        "description": "Unión de flora nocturna y misticismo ritual concebido en calma absoluta en estudio privado.",
        "artista": "Adriana Carrillo",
        "categoria": "Black Ilustrativo",
        "image_url": "TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/IMG_1118.jpg",
        "fecha_creacion": "2026-10-17T12:00:00Z"
    },
    {
        "id": "gal-18",
        "title": "Danza de Espigas",
        "description": "Trazo invisible ultrafino 03RL con presión controlada milimétricamente para una cicatrización imperceptible.",
        "artista": "Adriana Carrillo",
        "categoria": "Fine Line",
        "image_url": "TRABAJOS%20ADRI/LINEAS/884824FE-E7FE-417D-AFDA-90140F089D6B.jpg",
        "fecha_creacion": "2026-10-18T12:00:00Z"
    },
    {
        "id": "gal-19",
        "title": "Geometría Suspendida",
        "description": "Líneas paralelas de alta precisión angular adaptadas a la curvatura ósea del antebrazo.",
        "artista": "Adriana Carrillo",
        "categoria": "Fine Line",
        "image_url": "TRABAJOS%20ADRI/LINEAS/IMG_0047.jpg",
        "fecha_creacion": "2026-10-19T12:00:00Z"
    },
    {
        "id": "gal-20",
        "title": "Suspiro Botánico",
        "description": "Tallo de amapola minimalista con trazo continuo en una sola respiración y ligereza etérea.",
        "artista": "Adriana Carrillo",
        "categoria": "Fine Line",
        "image_url": "TRABAJOS%20ADRI/LINEAS/IMG_0052.jpg",
        "fecha_creacion": "2026-10-20T12:00:00Z"
    },
    {
        "id": "gal-21",
        "title": "Constelación Viva",
        "description": "Micro-líneas geométricas que unen puntos anatómicos sagrados con elegancia atemporal.",
        "artista": "Adriana Carrillo",
        "categoria": "Fine Line",
        "image_url": "TRABAJOS%20ADRI/LINEAS/IMG_0104.jpg",
        "fecha_creacion": "2026-10-21T12:00:00Z"
    },
    {
        "id": "gal-22",
        "title": "Órbita Serena",
        "description": "Elipses concéntricas de extrema pulcritud y trazo uniforme sin variaciones de grosor.",
        "artista": "Adriana Carrillo",
        "categoria": "Fine Line",
        "image_url": "TRABAJOS%20ADRI/LINEAS/IMG_0350.jpg",
        "fecha_creacion": "2026-10-22T12:00:00Z"
    },
    {
        "id": "gal-23",
        "title": "Rama de Almendro",
        "description": "Minimalismo orgánico que honra el lienzo natural de la clavícula con sutileza infinita.",
        "artista": "Adriana Carrillo",
        "categoria": "Fine Line",
        "image_url": "TRABAJOS%20ADRI/LINEAS/IMG_0419.jpg",
        "fecha_creacion": "2026-10-23T12:00:00Z"
    },
    {
        "id": "gal-24",
        "title": "Trilogía de Luz",
        "description": "Tres elementos lineales entrelazados que simbolizan el equilibrio interior y la paciencia.",
        "artista": "Adriana Carrillo",
        "categoria": "Fine Line",
        "image_url": "TRABAJOS%20ADRI/LINEAS/IMG_0679.jpg",
        "fecha_creacion": "2026-10-24T12:00:00Z"
    },
    {
        "id": "gal-25",
        "title": "Hilo de Horizonte",
        "description": "Trazo horizontal continuo que abraza la muñeca con elegancia clínica y devoción por la calma.",
        "artista": "Luna",
        "categoria": "Fine Line",
        "image_url": "TRABAJOS%20LUNA/FINE%20LINE/IMG_8995.jpg",
        "fecha_creacion": "2026-10-25T12:00:00Z"
    },
    {
        "id": "gal-26",
        "title": "Lirio Matutino",
        "description": "Pétalos delineados con aguja 01RL y degradado sutil de tinta diluida para máxima transparencia.",
        "artista": "Luna",
        "categoria": "Fine Line",
        "image_url": "TRABAJOS%20LUNA/FINE%20LINE/IMG_9002.jpg",
        "fecha_creacion": "2026-10-26T12:00:00Z"
    },
    {
        "id": "gal-27",
        "title": "Floración & Micro-Sombra",
        "description": "Borde exterior en trazo fino 03RL relleno con texturas de puntillismo de arrastre minucioso.",
        "artista": "Luna",
        "categoria": "Puntillismo de Arrastre",
        "image_url": "TRABAJOS%20LUNA/FINELINE%20Y%20PUNTILLISMO%20DE%20ARRASTRE/IMG_9009.jpg",
        "fecha_creacion": "2026-10-27T12:00:00Z"
    },
    {
        "id": "gal-28",
        "title": "Geometría y Polvo Lunar",
        "description": "Estructura lineal nítida envuelta en un halo de micropuntos para un contraste moderno y suave.",
        "artista": "Luna",
        "categoria": "Puntillismo de Arrastre",
        "image_url": "TRABAJOS%20LUNA/FINELINE%20Y%20PUNTILLISMO%20DE%20ARRASTRE/IMG_9010.jpg",
        "fecha_creacion": "2026-10-28T12:00:00Z"
    },
    {
        "id": "gal-29",
        "title": "Loto Cristalino",
        "description": "Pétalos de línea limpia y suave degradado en puntillismo interno para dar sensación de transparencia.",
        "artista": "Luna",
        "categoria": "Puntillismo de Arrastre",
        "image_url": "TRABAJOS%20LUNA/FINELINE%20Y%20PUNTILLISMO%20DE%20ARRASTRE/IMG_9012.jpg",
        "fecha_creacion": "2026-10-01T12:00:00Z"
    },
    {
        "id": "gal-30",
        "title": "Talismán Ceremonial",
        "description": "Tatuaje manual punto por punto sin máquina. Pigmento mineral insertado con intención sagrada.",
        "artista": "Luna",
        "categoria": "Handpoke",
        "image_url": "TRABAJOS%20LUNA/HANDPOKE/IMG_8997.jpg",
        "fecha_creacion": "2026-10-02T12:00:00Z"
    },
    {
        "id": "gal-31",
        "title": "Sello de Protección",
        "description": "Geometría ritual ancestral creada mediante puntadas manuales pausadas y respetuosas de la piel.",
        "artista": "Luna",
        "categoria": "Handpoke",
        "image_url": "TRABAJOS%20LUNA/HANDPOKE/IMG_8999.PNG",
        "fecha_creacion": "2026-10-03T12:00:00Z"
    },
    {
        "id": "gal-32",
        "title": "Runas Silentes",
        "description": "Símbolos arcaicos marcados punto a punto para una vibración energética pura y un envejecimiento nítido.",
        "artista": "Luna",
        "categoria": "Handpoke",
        "image_url": "TRABAJOS%20LUNA/HANDPOKE/IMG_9001.jpg",
        "fecha_creacion": "2026-10-04T12:00:00Z"
    },
    {
        "id": "gal-33",
        "title": "Portal de Luna Llena",
        "description": "Composición celestial creada en estado de meditación compartida, punto a punto con calma infinita.",
        "artista": "Luna",
        "categoria": "Handpoke",
        "image_url": "TRABAJOS%20LUNA/HANDPOKE/IMG_9003.jpg",
        "fecha_creacion": "2026-10-05T12:00:00Z"
    },
    {
        "id": "gal-34",
        "title": "Ilustración Nº 1",
        "description": "Pieza de autor realizada por Luna con técnica de Ilustración.",
        "artista": "Luna",
        "categoria": "Ilustración",
        "image_url": "TRABAJOS%20LUNA/ILUSTRACI%C3%93N/IMG_7876.jpg",
        "fecha_creacion": "2026-10-06T12:00:00Z"
    },
    {
        "id": "gal-35",
        "title": "Ilustración Nº 2",
        "description": "Pieza de autor realizada por Luna con técnica de Ilustración.",
        "artista": "Luna",
        "categoria": "Ilustración",
        "image_url": "TRABAJOS%20LUNA/ILUSTRACI%C3%93N/IMG_8229.jpg",
        "fecha_creacion": "2026-10-07T12:00:00Z"
    },
    {
        "id": "gal-36",
        "title": "Ilustración Nº 3",
        "description": "Pieza de autor realizada por Luna con técnica de Ilustración.",
        "artista": "Luna",
        "categoria": "Ilustración",
        "image_url": "TRABAJOS%20LUNA/ILUSTRACI%C3%93N/IMG_8957.jpg",
        "fecha_creacion": "2026-10-08T12:00:00Z"
    },
    {
        "id": "gal-37",
        "title": "Galaxia de Rocío",
        "description": "Puntillismo de densidad variable que crea volumen tridimensional orgánico y suave.",
        "artista": "Luna",
        "categoria": "Puntillismo Punto por Punto",
        "image_url": "TRABAJOS%20LUNA/PUNTILLISMO%20PUNTO%20POR%20PUNTO/IMG_7139.jpg",
        "fecha_creacion": "2026-10-09T12:00:00Z"
    },
    {
        "id": "gal-38",
        "title": "Mandala Cósmica",
        "description": "Millares de puntos concéntricos dispuestos con simetría sagrada y armonía geométrica.",
        "artista": "Luna",
        "categoria": "Puntillismo Punto por Punto",
        "image_url": "TRABAJOS%20LUNA/PUNTILLISMO%20PUNTO%20POR%20PUNTO/IMG_7585.jpg",
        "fecha_creacion": "2026-10-10T12:00:00Z"
    },
    {
        "id": "gal-39",
        "title": "Vórtice Astral",
        "description": "Degradado suave punto por punto que desvanece la sombra hacia el tono natural de la piel.",
        "artista": "Luna",
        "categoria": "Puntillismo Punto por Punto",
        "image_url": "TRABAJOS%20LUNA/PUNTILLISMO%20PUNTO%20POR%20PUNTO/IMG_8153.jpg",
        "fecha_creacion": "2026-10-11T12:00:00Z"
    },
    {
        "id": "gal-40",
        "title": "Nebulosa Sagrada",
        "description": "Atmósfera etérea lograda mediante micro-puntos dispersos de negro carbón puro.",
        "artista": "Luna",
        "categoria": "Puntillismo Punto por Punto",
        "image_url": "TRABAJOS%20LUNA/PUNTILLISMO%20PUNTO%20POR%20PUNTO/IMG_8310.jpg",
        "fecha_creacion": "2026-10-12T12:00:00Z"
    }
],

  talleres: [
    {
      id: 'tal-1',
      titulo: 'Masterclass: Fine Line & Aguja 03RL',
      description: 'Técnica de trazo invisible, regulación precisa de voltaje, control milimétrico de vibración y calibración de pigmento negro de humo en piel viva.',
      temario: 'Módulo 1: Anatomía de la piel y calibración de máquinas rotativas. Módulo 2: Dominio de agujas 03RL y trazo continuo sin sangrado. Módulo 3: Práctica supervisada en piel sintética y apósitos de cicatrización.',
      price: 120,
      fecha_evento: '2026-11-28',
      duracion: '1 día intensivo (8 horas)',
      ubicacion: 'Estudio Etérea - Sala Creativa',
      instructor: 'Adriana Carrillo',
      image_url: 'FOTOS%20TALLERES/FOTOS/igexport-Db_QsCqnDhR-3.jpg',
      cupos: 8,
      cupos_disponibles: 3,
      estado: 'Activo',
      fecha_creacion: '2026-10-10'
    },
    {
      id: 'tal-2',
      titulo: 'Bioseguridad y Asepsia Avanzada',
      description: 'Protocolos de desinfección grado hospitalario, manejo de autoclave y gestión de residuos biológico-infecciosos.',
      temario: 'Módulo 1: Cadena aséptica y prevención de contaminación cruzada. Módulo 2: Manejo de autoclave, esterilización y rotulación. Módulo 3: Normativa sanitaria y desecho seguro de punzocortantes.',
      price: 95,
      fecha_evento: '2026-11-22',
      duracion: '1 día intensivo (6 horas)',
      ubicacion: 'Estudio Etérea - Sala Clínica',
      instructor: 'Adriana Carrillo & Luna',
      image_url: 'FOTOS%20TALLERES/FOTOS/igexport-Db_QsCqnDhR-4.jpg',
      cupos: 6,
      cupos_disponibles: 0,
      estado: 'Agotado',
      fecha_creacion: '2026-10-12'
    },
    {
      id: 'tal-3',
      titulo: 'Microrealismo Botánico & Texturas',
      description: 'Composición anatómica en piel viva, micro degradados en escala de grises y conservación de contraste en el tiempo.',
      temario: 'Módulo 1: Adaptación de la ilustración botánica a las curvas del cuerpo. Módulo 2: Diluciones de negro y degradados de alta durabilidad. Módulo 3: Bioseguridad clínica y protocolo de curación de autor.',
      price: 145,
      fecha_evento: '2026-12-05',
      duracion: '1 día intensivo (7 horas)',
      ubicacion: 'Estudio Etérea - Sala Creativa',
      instructor: 'Adriana Carrillo & Luna',
      image_url: 'FOTOS%20TALLERES/igexport-DTyuavMjQ7F.jpg',
      cupos: 6,
      cupos_disponibles: 2,
      estado: 'Activo',
      fecha_creacion: '2026-10-14'
    },
    {
      id: 'tal-4',
      titulo: 'Taller de Iniciación: Pulso & Manual de Autor',
      description: 'Primera edición oficial para principiantes. Incluyó la entrega del manual técnico de inicio Etérea, ejercicios de pulso, control de profundidad y primeras prácticas de línea.',
      temario: '2 días intensivos de fundamentos técnicos, entrega del Manual de Iniciación Etérea, calibración de pulso y primeras prácticas en piel sintética.',
      price: 110,
      fecha_evento: '2026-06-12',
      duracion: '2 días (Junio 12 al 13, 2026)',
      ubicacion: 'Estudio Etérea - Sala Creativa',
      instructor: 'Adriana Carrillo & Luna',
      image_url: 'FOTOS%20TALLERES/FOTOS/igexport-Db_QsCqnDhR-3.jpg',
      cupos: 6,
      cupos_disponibles: 0,
      estado: 'Agotado',
      fecha_creacion: '2026-06-01'
    },
    {
      id: 'tal-5',
      titulo: 'Workshop Personalizado & Autotatuaje Supervisado',
      description: 'Formato de acompañamiento 1 a 1 de alta personalización durante una semana. Prácticas profundas en piel sintética y culminación con autotatuaje guiado y asistido.',
      temario: 'Acompañamiento individualizado durante 7 días, calibración milimétrica, control del dolor y dolor superficial, culminando en la pieza autotatuada por cada asistente.',
      price: 160,
      fecha_evento: '2026-07-12',
      duracion: 'Semana intensiva (Julio 12 al 19, 2026)',
      ubicacion: 'Estudio Etérea - Cabina Privada',
      instructor: 'Adriana Carrillo & Luna',
      image_url: 'FOTOS%20TALLERES/FOTOS/igexport-Db_QsCqnDhR-4.jpg',
      cupos: 4,
      cupos_disponibles: 0,
      estado: 'Agotado',
      fecha_creacion: '2026-07-01'
    },
    {
      id: 'tal-6',
      titulo: 'Workshop Etérea: Prácticas de Pulso & Tatuaje en Vivo',
      description: 'Workshop donde los chicos experimentaron dinámicas de pulso, prácticas intensivas en piel sintética y la oportunidad de realizar tatuajes reales en un ambiente clínico cuidado.',
      temario: 'Prácticas de pulso, ejercicios de saturación en piel sintética, bioseguridad aplicada y sesiones de tatuaje donde los participantes plasmaron su primera obra.',
      price: 140,
      fecha_evento: '2026-08-08',
      duracion: '2 días (Agosto 8 al 9, 2026 / Sesión Agosto 13)',
      ubicacion: 'Estudio Etérea - Taller Principal',
      instructor: 'Adriana Carrillo & Luna',
      image_url: 'FOTOS%20TALLERES/igexport-DTyuavMjQ7F.jpg',
      cupos: 6,
      cupos_disponibles: 0,
      estado: 'Agotado',
      fecha_creacion: '2026-08-01'
    }
  ],
  citas: [
    {
      id: 'cit-101',
      nombre_cliente: 'Camila Morales',
      telefono: '+593984123456',
      correo: 'camila.morales@gmail.com',
      estilo_tatuaje: 'Fine Line',
      zona_cuerpo: 'Antebrazo interno',
      descripcion: 'Flor de loto con detalles geométricos de 8 cm con líneas sutiles y puntillismo tenue.',
      artista_asignada: 'Adriana Carrillo',
      fecha_cita: '2026-11-04',
      hora_cita: '15:00',
      estado: 'Pendiente',
      fecha_creacion: '2026-10-27T10:14:00Z'
    },
    {
      id: 'cit-102',
      nombre_cliente: 'Mateo Velasco',
      telefono: '+593991234888',
      correo: 'mateo.v@outlook.com',
      estilo_tatuaje: 'Blackwork',
      zona_cuerpo: 'Costillas',
      descripcion: 'Cuervo en vuelo con degradado sólido y texturas punteadas de 15 cm.',
      artista_asignada: 'Luna',
      fecha_cita: '2026-11-06',
      hora_cita: '11:00',
      estado: 'Confirmada',
      fecha_creacion: '2026-10-26T15:30:00Z'
    },
    {
      id: 'cit-103',
      nombre_cliente: 'Sofía Alarcón',
      telefono: '+593976543210',
      correo: 'sofia.a@gmail.com',
      estilo_tatuaje: 'Microrealismo',
      zona_cuerpo: 'Clavícula',
      descripcion: 'Pequeña golondrina realista en tonos sepia/gris de 5 cm.',
      artista_asignada: 'Adriana Carrillo',
      fecha_cita: '2026-11-10',
      hora_cita: '16:30',
      estado: 'Pendiente',
      fecha_creacion: '2026-10-28T08:20:00Z'
    }
  ],
  inscripciones: [
    {
      id: 'insc-1',
      id_taller: 'tal-2',
      nombre: 'Javier Endara',
      telefono: '+593988776655',
      correo: 'javier.endara@gmail.com',
      fecha: '2026-10-25T11:00:00Z'
    }
  ]
};

// --- SERVICIO DE BASE DE DATOS (InkBookDB) ---
const InkBookDB = {
  init() {
    // Asegurar que siempre se carguen las 40 obras locales reales
    const existingGaleria = localStorage.getItem(DB_KEYS.GALERIA);
    if (!existingGaleria || existingGaleria.includes('unsplash.com') || JSON.parse(existingGaleria).length < 30) {
      localStorage.setItem(DB_KEYS.GALERIA, JSON.stringify(SEED_DATA.galeria));
    } else if (!localStorage.getItem(DB_KEYS.GALERIA)) {
      localStorage.setItem(DB_KEYS.GALERIA, JSON.stringify(SEED_DATA.galeria));
    }
    const existingTalleres = localStorage.getItem(DB_KEYS.TALLERES);
    if (!existingTalleres || JSON.parse(existingTalleres).length < SEED_DATA.talleres.length) {
      localStorage.setItem(DB_KEYS.TALLERES, JSON.stringify(SEED_DATA.talleres));
    }
    if (!localStorage.getItem(DB_KEYS.CITAS)) {
      localStorage.setItem(DB_KEYS.CITAS, JSON.stringify(SEED_DATA.citas));
    }
    if (!localStorage.getItem(DB_KEYS.INSCRIPCIONES)) {
      localStorage.setItem(DB_KEYS.INSCRIPCIONES, JSON.stringify(SEED_DATA.inscripciones));
    }

    // Auto-corrección garantizada de nombres de fundadoras en citas almacenadas
    try {
      const storedCitas = this.getCitas();
      let citasFix = false;
      storedCitas.forEach(c => {
        if (c.artista_asignada && c.artista_asignada.includes('Castillo')) {
          c.artista_asignada = 'Adriana Carrillo';
          citasFix = true;
        }
      });
      if (citasFix) localStorage.setItem(DB_KEYS.CITAS, JSON.stringify(storedCitas));

      const storedGaleria = this.getGaleria();
      let galeriaFix = false;
      storedGaleria.forEach(g => {
        if (g.artista && (g.artista.includes('Castillo') || g.artista === 'Antonella Luna')) {
          if (g.artista === 'Antonella Luna') g.artista = 'Luna';
          else
          g.artista = 'Adriana Carrillo';
          galeriaFix = true;
        }
        if (g.categoria === 'Fine Line & Puntillismo' || (g.image_url && g.image_url.includes('ARRASTRE'))) {
          g.categoria = 'Puntillismo de Arrastre';
          galeriaFix = true;
        }
        if (g.categoria === 'Puntillismo' || (g.image_url && g.image_url.includes('PUNTO%20POR%20PUNTO'))) {
          g.categoria = 'Puntillismo Punto por Punto';
          galeriaFix = true;
        }
        if (g.categoria && g.categoria.includes('Ilustra') && g.categoria !== 'Black Ilustrativo') {
          g.categoria = 'Ilustración';
          galeriaFix = true;
        }
      });
      if (galeriaFix) localStorage.setItem(DB_KEYS.GALERIA, JSON.stringify(storedGaleria));
    } catch (e) {
      console.warn('Auto-corrección DB:', e);
    }

    // Iniciar sincronización en tiempo real con Supabase
    this.syncWithSupabase();
  },

  // Sincronización asíncrona bidireccional con Supabase
  async syncWithSupabase() {
    const sb = getSupabaseClient();
    if (!sb) return;

    try {
      // 1. Citas desde la nube
      const { data: citasCloud, error: errCitas } = await sb
        .from('citas')
        .select('*')
        .order('fecha_creacion', { ascending: false });

      if (!errCitas && citasCloud && citasCloud.length > 0) {
        localStorage.setItem(DB_KEYS.CITAS, JSON.stringify(citasCloud));
        if (typeof renderAdminCitas === 'function') renderAdminCitas();
        if (typeof updateAdminMetrics === 'function') updateAdminMetrics();
        console.log(`☁️ Supabase: ${citasCloud.length} citas sincronizadas`);
      }

      // 2. Talleres desde la nube
      const { data: talleresCloud, error: errTalleres } = await sb
        .from('talleres')
        .select('*')
        .order('fecha_evento', { ascending: true });

      if (!errTalleres && talleresCloud && talleresCloud.length > 0) {
        localStorage.setItem(DB_KEYS.TALLERES, JSON.stringify(talleresCloud));
        if (typeof renderTalleres === 'function') renderTalleres();
        if (typeof renderAdminTalleres === 'function') renderAdminTalleres();
      }

      // 3. Inscripciones a talleres desde la nube
      const { data: inscCloud, error: errInsc } = await sb
        .from('inscripciones_talleres')
        .select('*')
        .order('fecha', { ascending: false });

      if (!errInsc && inscCloud && inscCloud.length > 0) {
        localStorage.setItem(DB_KEYS.INSCRIPCIONES, JSON.stringify(inscCloud));
        if (typeof renderAdminInscripciones === 'function') renderAdminInscripciones();
      }
    } catch (err) {
      console.warn('Fallback local activo en sincronización:', err);
    }
  },

  reset() {
    localStorage.setItem(DB_KEYS.GALERIA, JSON.stringify(SEED_DATA.galeria));
    localStorage.setItem(DB_KEYS.TALLERES, JSON.stringify(SEED_DATA.talleres));
    localStorage.setItem(DB_KEYS.CITAS, JSON.stringify(SEED_DATA.citas));
    localStorage.setItem(DB_KEYS.INSCRIPCIONES, JSON.stringify(SEED_DATA.inscripciones));
    showToast('Base de datos restablecida a valores iniciales');
    renderGaleria();
    renderTalleres();
    renderAdminCitas();
    renderAdminTalleres();
    renderAdminGaleria();
    renderAdminInscripciones();
    updateAdminMetrics();
  },

  // Citas
  getCitas() {
    try {
      return JSON.parse(localStorage.getItem(DB_KEYS.CITAS)) || [];
    } catch {
      return [];
    }
  },

  addCita(cita) {
    const citas = this.getCitas();
    const tempId = 'cit-' + Date.now().toString().slice(-6);
    const nuevaCita = {
      id: tempId,
      fecha_creacion: new Date().toISOString(),
      estado: 'Pendiente',
      ...cita
    };
    citas.unshift(nuevaCita);
    localStorage.setItem(DB_KEYS.CITAS, JSON.stringify(citas));

    // Guardado en tiempo real en Supabase Cloud
    const sb = getSupabaseClient();
    if (sb) {
      sb.from('citas').insert([{
        nombre_cliente: cita.nombre_cliente,
        telefono: cita.telefono,
        correo: cita.correo || '',
        estilo_tatuaje: cita.estilo_tatuaje,
        zona_cuerpo: cita.zona_cuerpo,
        descripcion: cita.descripcion,
        artista_asignada: cita.artista_asignada,
        fecha_cita: cita.fecha_cita,
        hora_cita: cita.hora_cita,
        estado: 'Pendiente'
      }]).select().then(({ data, error }) => {
        if (error) {
          console.warn('Aviso Supabase al guardar cita:', error);
        } else if (data && data[0]) {
          console.log('✅ Cita guardada en Supabase en tiempo real:', data[0]);
          nuevaCita.id = data[0].id;
          const current = this.getCitas();
          const target = current.find(c => c.id === tempId);
          if (target) {
            target.id = data[0].id;
            localStorage.setItem(DB_KEYS.CITAS, JSON.stringify(current));
          }
          if (typeof renderAdminCitas === 'function') renderAdminCitas();
        }
      }).catch(err => console.warn('Supabase insert exception:', err));
    }

    return nuevaCita;
  },

  updateCitaEstado(id, nuevoEstado) {
    const citas = this.getCitas();
    const index = citas.findIndex(c => c.id === id);
    if (index !== -1) {
      citas[index].estado = nuevoEstado;
      localStorage.setItem(DB_KEYS.CITAS, JSON.stringify(citas));

      // Actualizar en Supabase
      const sb = getSupabaseClient();
      if (sb) {
        sb.from('citas').update({ estado: nuevoEstado }).eq('id', id).then(({ error }) => {
          if (error) console.warn('Aviso Supabase al actualizar cita:', error);
          else console.log(`✅ Estado de cita ${id} actualizado a "${nuevoEstado}" en Supabase`);
        }).catch(err => console.warn('Supabase update exception:', err));
      }

      return citas[index];
    }
    return null;
  },

  deleteCita(id) {
    const citas = this.getCitas().filter(c => c.id !== id);
    localStorage.setItem(DB_KEYS.CITAS, JSON.stringify(citas));

    // Eliminar en Supabase
    const sb = getSupabaseClient();
    if (sb) {
      sb.from('citas').delete().eq('id', id).then(({ error }) => {
        if (error) console.warn('Aviso Supabase al eliminar cita:', error);
        else console.log(`🗑️ Cita ${id} eliminada en Supabase`);
      }).catch(err => console.warn('Supabase delete exception:', err));
    }
  },

  // Talleres
  getTalleres() {
    try {
      const stored = JSON.parse(localStorage.getItem(DB_KEYS.TALLERES));
      if (!stored || stored.length < SEED_DATA.talleres.length || (stored[0] && !stored[0].image_url?.includes('Fotos'))) {
        localStorage.setItem(DB_KEYS.TALLERES, JSON.stringify(SEED_DATA.talleres));
        return SEED_DATA.talleres;
      }
      return stored;
    } catch {
      return SEED_DATA.talleres;
    }
  },

  addTaller(taller) {
    const talleres = this.getTalleres();
    const nuevoTaller = {
      id: 'tal-' + Date.now().toString().slice(-6),
      fecha_creacion: new Date().toISOString().split('T')[0],
      cupos_disponibles: parseInt(taller.cupos, 10),
      estado: parseInt(taller.cupos, 10) > 0 ? 'Activo' : 'Agotado',
      ...taller
    };
    talleres.unshift(nuevoTaller);
    localStorage.setItem(DB_KEYS.TALLERES, JSON.stringify(talleres));
    return nuevoTaller;
  },

  updateTaller(id, tallerData) {
    const talleres = this.getTalleres();
    const index = talleres.findIndex(t => t.id === id);
    if (index !== -1) {
      const prev = talleres[index];
      const nuevosCupos = parseInt(tallerData.cupos, 10);
      const difCupos = nuevosCupos - parseInt(prev.cupos, 10);
      const nuevosDisponibles = Math.max(0, (prev.cupos_disponibles || 0) + difCupos);

      talleres[index] = {
        ...prev,
        ...tallerData,
        cupos: nuevosCupos,
        price: parseFloat(tallerData.price),
        cupos_disponibles: nuevosDisponibles,
        estado: nuevosDisponibles > 0 ? 'Activo' : 'Agotado',
        fecha_actualizacion: new Date().toISOString()
      };
      localStorage.setItem(DB_KEYS.TALLERES, JSON.stringify(talleres));
      return talleres[index];
    }
    return null;
  },

  deleteTaller(id) {
    const talleres = this.getTalleres().filter(t => t.id !== id);
    localStorage.setItem(DB_KEYS.TALLERES, JSON.stringify(talleres));
  },

  inscribirTaller(tallerId, participante) {
    const talleres = this.getTalleres();
    const index = talleres.findIndex(t => t.id === tallerId);
    if (index === -1) return { success: false, message: 'Taller no encontrado' };

    const taller = talleres[index];
    if (taller.cupos_disponibles <= 0 || taller.estado === 'Agotado') {
      return { success: false, message: 'El taller ya no tiene cupos disponibles' };
    }

    taller.cupos_disponibles -= 1;
    if (taller.cupos_disponibles <= 0) {
      taller.estado = 'Agotado';
    }
    localStorage.setItem(DB_KEYS.TALLERES, JSON.stringify(talleres));

    // Registrar inscripción
    const inscripciones = this.getInscripciones();
    const nuevaInscripcion = {
      id: 'insc-' + Date.now().toString().slice(-6),
      id_taller: tallerId,
      taller_titulo: taller.titulo,
      ...participante,
      fecha: new Date().toISOString()
    };
    inscripciones.unshift(nuevaInscripcion);
    localStorage.setItem(DB_KEYS.INSCRIPCIONES, JSON.stringify(inscripciones));

    // Registrar en Supabase Cloud
    const sb = getSupabaseClient();
    if (sb) {
      sb.from('inscripciones_talleres').insert([{
        id_taller: (tallerId && tallerId.length > 30) ? tallerId : null,
        nombre: participante.nombre,
        telefono: participante.telefono,
        correo: participante.correo
      }]).then(({ error }) => {
        if (error) console.warn('Aviso Supabase inscripción taller:', error);
        else console.log('✅ Inscripción a taller registrada en Supabase Cloud');
      }).catch(e => console.warn(e));
    }

    return { success: true, inscripcion: nuevaInscripcion, taller };
  },

  getInscripciones() {
    try {
      return JSON.parse(localStorage.getItem(DB_KEYS.INSCRIPCIONES)) || [];
    } catch {
      return [];
    }
  },

  deleteInscripcion(id) {
    const inscripciones = this.getInscripciones().filter(i => i.id !== id);
    localStorage.setItem(DB_KEYS.INSCRIPCIONES, JSON.stringify(inscripciones));
  },

  // Galería
  getGaleria() {
    try {
      const stored = JSON.parse(localStorage.getItem(DB_KEYS.GALERIA)) || [];
      if (stored.length < SEED_DATA.galeria.length) {
        localStorage.setItem(DB_KEYS.GALERIA, JSON.stringify(SEED_DATA.galeria));
        return SEED_DATA.galeria;
      }
      return stored;
    } catch {
      return SEED_DATA.galeria;
    }
  },

  addGaleriaItem(item) {
    const galeria = this.getGaleria();
    const nuevoItem = {
      id: 'gal-' + Date.now().toString().slice(-6),
      fecha_creacion: new Date().toISOString(),
      description: item.description || 'Diseño de autor concebido con precisión milimétrica y calma absoluta.',
      ...item
    };
    galeria.unshift(nuevoItem);
    localStorage.setItem(DB_KEYS.GALERIA, JSON.stringify(galeria));
    return nuevoItem;
  },

  updateGaleriaItem(id, itemData) {
    const galeria = this.getGaleria();
    const index = galeria.findIndex(g => g.id === id);
    if (index !== -1) {
      galeria[index] = {
        ...galeria[index],
        ...itemData,
        fecha_actualizacion: new Date().toISOString()
      };
      localStorage.setItem(DB_KEYS.GALERIA, JSON.stringify(galeria));
      return galeria[index];
    }
    return null;
  },

  deleteGaleriaItem(id) {
    const galeria = this.getGaleria().filter(g => g.id !== id);
    localStorage.setItem(DB_KEYS.GALERIA, JSON.stringify(galeria));
  }
};

// Inicializar DB
InkBookDB.init();

// --- ESTADO GLOBAL DE UI & NAVEGACIÓN ---
const State = {
  currentRoute: 'inicio',
  activeArtistFilter: 'Todas',
  activeCategoryFilter: 'Todos',
  filtroTalleres: 'todos',
  adminTab: 'citas',
  adminCitasFilterStatus: 'Todas',
  adminCitasFilterArtist: 'Todas',
  selectedArtwork: null,
  tallerSeleccionadoParaInscripcion: null
};

// --- 1. ARQUITECTURA DE PÁGINAS INDEPENDIENTES (ROUTER) ---
const VALID_ROUTES = ['inicio', 'artistas', 'galeria', 'talleres', 'reservas', 'admin', 'login'];

const ROUTE_LABELS = {
  'inicio': 'PORTADA · ETÉREA',
  'artistas': 'ARTISTAS RESIDENTES',
  'galeria': 'PORTAFOLIO DE OBRAS',
  'talleres': 'TALLERES & WORKSHOPS',
  'reservas': 'AGENDAMIENTO DE CITAS',
  'admin': 'PANEL DE CONTROL ADMIN',
  'login': 'ACCESO ADMINISTRATIVO'
};

function navigateToRoute(route, updateUrl = true) {
  let cleanRoute = (route || 'inicio').replace(/^#?\/?/, '').toLowerCase().trim() || 'inicio';
  
  // Soporte de alias de rutas administrativas
  if (cleanRoute === 'admin/dashboard' || cleanRoute === 'dashboard') {
    cleanRoute = 'admin';
  }

  const targetRoute = VALID_ROUTES.includes(cleanRoute) ? cleanRoute : 'inicio';

  // PROTECCIÓN DE RUTA ADMIN: Si se intenta acceder al panel sin sesión activa, bloquear y redirigir a /login
  if (targetRoute === 'admin') {
    if (!checkAdminAuth()) {
      showToast('Acceso restringido. Por favor inicia sesión con tu cuenta de administradora.', 'info');
      navigateToRoute('login', updateUrl);
      return;
    }
  }

  // Si se ingresa a /login pero ya cuenta con sesión administrativa activa, redirigir directo a /admin
  if (targetRoute === 'login') {
    if (checkAdminAuth()) {
      navigateToRoute('admin', updateUrl);
      return;
    }
  }

  State.currentRoute = targetRoute;

  // 1. Ocultar todas las páginas independientes
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.add('hidden');
  });

  // 2. Mostrar exclusivamente la página seleccionada
  const targetView = document.getElementById(`page-${targetRoute}`);
  if (targetView) {
    targetView.classList.remove('hidden');
  }

  // 2.1 Alternar tema visual para Galería, Artistas, Reservas, Admin y Login
  document.body.classList.toggle('page-theme-galeria-blue', targetRoute === 'galeria');
  document.body.classList.toggle('page-theme-artistas', targetRoute === 'artistas');
  document.body.classList.toggle('page-theme-reservas', targetRoute === 'reservas');
  document.body.classList.toggle('page-theme-admin', targetRoute === 'admin');
  document.body.classList.toggle('page-theme-login', targetRoute === 'login');

  // 3. Resetear scroll a la parte superior de inmediato (cero scroll vertical arrastrado)
  window.scrollTo({ top: 0, behavior: 'instant' });
  const navEl = document.querySelector('.nav-floating-dock');
  if (navEl) {
    if (targetRoute === 'admin' || targetRoute === 'login') {
      navEl.classList.add('hidden');
    } else {
      navEl.classList.remove('hidden');
      navEl.classList.remove('nav-hidden');
    }
  }

  // Ocultar footer público exclusivamente en la vista de administración o login
  const footerEl = document.getElementById('main-site-footer') || document.querySelector('footer');
  if (footerEl) {
    if (targetRoute === 'admin' || targetRoute === 'login') {
      footerEl.classList.add('hidden');
    } else {
      footerEl.classList.remove('hidden');
    }
  }

  // 4. Actualizar estado visual de los botones de navegación
  updateNavActiveState(targetRoute);

  // 5. Actualizar el indicador visual de vista actual en la barra flotante
  const badgeEl = document.getElementById('current-view-badge');
  if (badgeEl) {
    badgeEl.textContent = `// ${ROUTE_LABELS[targetRoute] || targetRoute.toUpperCase()}`;
  }

  // 6. Actualizar URL con hash limpio
  if (updateUrl) {
    if (window.location.hash !== `#/${targetRoute}`) {
      window.location.hash = `#/${targetRoute}`;
    }
  }

  // Si se entra a Admin, refrescar datos
  if (targetRoute === 'admin') {
    showAdminDashboard();
  }

  // Si se entra a Reservas, inicializar vista de capas correcta
  if (targetRoute === 'reservas') {
    goToBookingStep(currentBookingStep || 1);
  }

  // Si se entra a Talleres, refrescar catálogo y contadores
  if (targetRoute === 'talleres') {
    renderTalleres();
  }

  // Cerrar sidebar de galería y limpiar timeouts al salir de galería
  if (targetRoute !== 'galeria') {
    closeGalleryFilterSidebar();
    clearTimeout(galleryBlurTimeout);
    document.getElementById('galeria-grid')?.classList.remove('gallery-delayed-blur');
  }

  // Refrescar iconos Lucide en la vista activa
  lucide.createIcons();

  // Actualizar visibilidad del dock flotante inferior al cambiar de ruta
  handleScrollFloatingDock();
}

function updateNavActiveState(activeRoute) {
  // Píldoras de barra flotante superior (Desktop)
  document.querySelectorAll('.nav-pill-btn').forEach(btn => {
    const route = btn.dataset.route;
    if (route === activeRoute) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Botones del dock flotante inferior central rectangular (Todas las pantallas)
  document.querySelectorAll('.floating-dock-btn').forEach(btn => {
    const route = btn.dataset.route;
    if (route === activeRoute) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Configurar detector de cambios de URL para navegación fluida
function initRouter() {
  const initialHash = window.location.hash;
  if (initialHash) {
    const initialRoute = initialHash.replace(/^#?\/?/, '').toLowerCase();
    navigateToRoute(initialRoute, false);
  } else {
    navigateToRoute('inicio', false);
  }

  // Escuchar navegación Back/Forward del navegador
  window.addEventListener('hashchange', () => {
    const route = window.location.hash.replace(/^#?\/?/, '').toLowerCase();
    if (route && route !== State.currentRoute) {
      navigateToRoute(route, false);
    }
  });
}

// --- UTILIDADES DE NOTIFICACIÓN ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = 'check-circle';
  let color = 'var(--brand-blue)';
  if (type === 'error') {
    icon = 'alert-triangle';
    color = 'var(--accent-danger)';
  }

  toast.innerHTML = `
    <i data-lucide="${icon}" style="width: 18px; height: 18px; color: ${color};"></i>
    <span style="font-size: 0.825rem; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons({ root: toast });

  setTimeout(() => {
    toast.style.animation = 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${day} ${months[parseInt(month, 10) - 1]}, ${year}`;
}

// --- INTERACCIÓN AVANZADA DE GALERÍA: ZOOM INMEDIATO Y DESENFOQUE CON RETARDO DE 3.2s ---
let galleryBlurTimeout = null;

function handleGalleryCardMouseEnter(card) {
  clearTimeout(galleryBlurTimeout);
  const grid = document.getElementById('galeria-grid');
  if (grid) {
    grid.classList.remove('gallery-delayed-blur');
  }

  // El zoom suave ocurre de inmediato vía CSS (:hover en .gallery-card)
  // El desenfoque en las demás imágenes de fondo se activa únicamente tras 3.2 segundos continuos
  galleryBlurTimeout = setTimeout(() => {
    if (grid && card && card.matches(':hover')) {
      grid.classList.add('gallery-delayed-blur');
    }
  }, 3200);
}

function handleGalleryCardMouseLeave(card) {
  clearTimeout(galleryBlurTimeout);
  const grid = document.getElementById('galeria-grid');
  if (grid) {
    grid.classList.remove('gallery-delayed-blur');
  }
}

// --- MENÚ LATERAL RETRÁCTIL FLOTANTE (FILTRO DE TÉCNICAS) ---
function openGalleryFilterSidebar() {
  const sidebar = document.getElementById('gallery-filter-sidebar');
  const toggleBtn = document.getElementById('gallery-sidebar-toggle-btn');
  const backdrop = document.getElementById('gallery-sidebar-backdrop');
  if (sidebar) sidebar.classList.add('open');
  if (toggleBtn) toggleBtn.classList.add('sidebar-active');
  if (backdrop) {
    backdrop.classList.remove('hidden');
    setTimeout(() => backdrop.classList.add('opacity-100'), 10);
  }
  lucide.createIcons();
}

function closeGalleryFilterSidebar() {
  const sidebar = document.getElementById('gallery-filter-sidebar');
  const toggleBtn = document.getElementById('gallery-sidebar-toggle-btn');
  const backdrop = document.getElementById('gallery-sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (toggleBtn) toggleBtn.classList.remove('sidebar-active');
  if (backdrop) {
    backdrop.classList.remove('opacity-100');
    setTimeout(() => backdrop.classList.add('hidden'), 300);
  }
}

function toggleGalleryFilterSidebar() {
  const sidebar = document.getElementById('gallery-filter-sidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    closeGalleryFilterSidebar();
  } else {
    openGalleryFilterSidebar();
  }
}

function selectGalleryTechnique(categoria) {
  State.activeCategoryFilter = categoria;

  document.querySelectorAll('.gallery-technique-item').forEach(btn => {
    if (btn.dataset.category === categoria || (categoria === 'Todos' && btn.dataset.category === 'Todos')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const headerBadge = document.getElementById('gallery-header-tech-badge');
  if (headerBadge) {
    headerBadge.textContent = categoria === 'Todos' ? 'Todas las técnicas' : categoria;
  }

  const indicator = document.getElementById('active-technique-indicator');
  if (indicator) {
    indicator.textContent = categoria === 'Todos' ? 'Todas las técnicas' : categoria;
  }

  renderGaleria();
}

function updateGalleryTechniqueCounts() {
  const obras = InkBookDB.getGaleria();
  const baseObras = obras.filter(o => State.activeArtistFilter === 'Todas' || o.artista === State.activeArtistFilter);

  const countAll = baseObras.length;
  const countBlack = baseObras.filter(o => o.categoria === 'Black Ilustrativo').length;
  const countFine = baseObras.filter(o => o.categoria === 'Fine Line').length;
  const countHandpoke = baseObras.filter(o => o.categoria === 'Handpoke').length;
  const countArrastre = baseObras.filter(o => o.categoria === 'Puntillismo de Arrastre' || o.categoria === 'Fine Line & Puntillismo').length;
  const countPuntillismo = baseObras.filter(o => o.categoria === 'Puntillismo Punto por Punto' || o.categoria === 'Puntillismo').length;
  const countIlustracion = baseObras.filter(o => o.categoria.includes('Ilustra')).length;

  const elAll = document.getElementById('count-tech-all');
  if (elAll) elAll.textContent = countAll;
  const elBlack = document.getElementById('count-tech-black');
  if (elBlack) elBlack.textContent = countBlack;
  const elFine = document.getElementById('count-tech-fineline');
  if (elFine) elFine.textContent = countFine;
  const elHand = document.getElementById('count-tech-handpoke');
  if (elHand) elHand.textContent = countHandpoke;
  const elArr = document.getElementById('count-tech-arrastre');
  if (elArr) elArr.textContent = countArrastre;
  const elPunt = document.getElementById('count-tech-puntillismo');
  if (elPunt) elPunt.textContent = countPuntillismo;
  const elIlus = document.getElementById('count-tech-ilustracion');
  if (elIlus) elIlus.textContent = countIlustracion;
}

// --- 3. RENDER: GALERÍA DE OBRAS CON METADATOS COMPLETOS ---
function renderGaleria() {
  const container = document.getElementById('galeria-grid');
  if (!container) return;

  const obras = InkBookDB.getGaleria();
  const filtradas = obras.filter(obra => {
    const matchArtista = State.activeArtistFilter === 'Todas' || obra.artista === State.activeArtistFilter;
    
    let matchCategoria = false;
    if (State.activeCategoryFilter === 'Todos' || State.activeCategoryFilter === 'Todas las técnicas') {
      matchCategoria = true;
    } else if (obra.categoria === State.activeCategoryFilter) {
      matchCategoria = true;
    } else if (State.activeCategoryFilter === 'Puntillismo de Arrastre' && (obra.categoria.includes('Arrastre') || obra.categoria === 'Fine Line & Puntillismo')) {
      matchCategoria = true;
    } else if (State.activeCategoryFilter === 'Puntillismo Punto por Punto' && (obra.categoria.includes('Punto') || obra.categoria === 'Puntillismo')) {
      matchCategoria = true;
    } else if (State.activeCategoryFilter === 'Ilustración' && (obra.categoria.includes('Ilustra') || obra.categoria === 'Ilustración')) {
      matchCategoria = true;
    }

    return matchArtista && matchCategoria;
  });

  updateGalleryTechniqueCounts();

  if (filtradas.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 4rem 1rem; text-align: center; color: var(--text-muted);">
        <p class="font-serif" style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #f0e9cf;">No se encontraron obras</p>
        <p style="font-size: 0.875rem; color: rgba(240, 233, 207, 0.75);">Intenta seleccionando otra técnica en el menú lateral o cambiando de artista.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtradas.map(obra => `
    <div 
      class="gallery-card group" 
      onclick="openArtworkModal('${obra.id}')"
      onmouseenter="handleGalleryCardMouseEnter(this)"
      onmouseleave="handleGalleryCardMouseLeave(this)"
    >
      <!-- Fotografía de alta calidad a sangre completa sin bordes redondeados -->
      <img src="${obra.image_url}" alt="Obra de arte por ${obra.artista}" loading="lazy" />

      <!-- Overlay oscuro y elegante al hacer hover (Fade-in suave) -->
      <div class="gallery-overlay">
        <!-- Parte superior: Técnica y botón expandir -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; transform: translateY(-0.35rem); transition: transform 0.3s ease;">
          <span style="background: #f0e9cf; color: #2756a2; font-weight: 700; font-size: 0.65rem; padding: 0.25rem 0.65rem; letter-spacing: 0.08em; text-transform: uppercase;">
            ${obra.categoria}
          </span>
          <div style="width: 32px; height: 32px; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; color: #ffffff;">
            <i data-lucide="maximize-2" style="width: 15px; height: 15px;"></i>
          </div>
        </div>

        <!-- Parte inferior: Únicamente autoría y ver obra ampliada -->
        <div style="transform: translateY(0.35rem); transition: transform 0.3s ease;">
          <span class="font-display" style="font-size: 1.15rem; font-weight: 500; color: #f0e9cf; display: block; margin-bottom: 0.45rem; line-height: 1.25;">
            Por ${obra.artista}
          </span>
          <div style="padding-top: 0.5rem; border-top: 1px solid rgba(240, 233, 207, 0.35); display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; font-weight: 600; color: #f0e9cf;">
            <span>Ver obra ampliada</span>
            <span>&rarr;</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons({ root: container });
}

function openArtworkModal(id) {
  const obra = InkBookDB.getGaleria().find(o => o.id === id);
  if (!obra) return;
  State.selectedArtwork = obra;

  const modal = document.getElementById('artwork-detail-modal');
  const modalImg = document.getElementById('modal-artwork-img');
  const modalArtist = document.getElementById('modal-artwork-artist');
  const modalCategory = document.getElementById('modal-artwork-category');
  const modalDesc = document.getElementById('modal-artwork-desc');

  if (modalImg) modalImg.src = obra.image_url;
  if (modalArtist) modalArtist.textContent = obra.artista;
  if (modalCategory) modalCategory.textContent = obra.categoria;
  if (modalDesc) {
    modalDesc.textContent = obra.description || 'Diseño de autor concebido con precisión milimétrica, esterilización de grado quirúrgico y calma absoluta en nuestro estudio privado.';
  }

  modal.classList.add('active');
  document.body.classList.add('overflow-hidden');
  lucide.createIcons({ root: modal });
}

function closeArtworkModal() {
  const modal = document.getElementById('artwork-detail-modal');
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
}

function agendarDesdeObra() {
  if (!State.selectedArtwork) return;
  const obra = State.selectedArtwork;
  closeArtworkModal();
  document.body.classList.remove('overflow-hidden');

  // Navegar limpiamente a la página de reservas
  navigateToRoute('reservas', true);

  // Pre-seleccionar artista
  const artistRadios = document.querySelectorAll('input[name="booking-artist"]');
  artistRadios.forEach(radio => {
    if (radio.value === obra.artista) {
      radio.checked = true;
      triggerArtistSelectCard(radio.value);
    }
  });

  // Pre-seleccionar estilo o mapearlo
  const estiloSelect = document.getElementById('booking-style');
  if (estiloSelect) {
    let matched = false;
    for (let i = 0; i < estiloSelect.options.length; i++) {
      if (estiloSelect.options[i].value.toLowerCase().includes(obra.categoria.toLowerCase())) {
        estiloSelect.selectedIndex = i;
        matched = true;
        break;
      }
    }
    if (!matched) {
      estiloSelect.value = 'Personalizado';
    }
  }

  // Rellenar idea preliminar en textarea
  const descInput = document.getElementById('booking-desc');
  if (descInput && !descInput.value) {
    descInput.value = `Inspirado en la obra "${obra.title}" (${obra.categoria}). Deseo un diseño similar en medidas de aprox...`;
  }

  showToast(`Pre-seleccionado: ${obra.artista} · ${obra.categoria}`);
}

function filterByArtist(artista) {
  State.activeArtistFilter = artista;
  document.querySelectorAll('.artist-filter-btn').forEach(btn => {
    if (btn.dataset.artist === artista) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  updateGalleryTechniqueCounts();
  renderGaleria();
}

function filterByCategory(categoria) {
  selectGalleryTechnique(categoria);
}

// --- RENDER & FILTROS: MÓDULO DE TALLERES (TEMPORADA & EDICIONES REALIZADAS) ---
function filterTalleres(categoria) {
  State.filtroTalleres = categoria || 'todos';

  const btnTodos = document.getElementById('tab-talleres-todos');
  const btnActivos = document.getElementById('tab-talleres-activos');
  const btnPasados = document.getElementById('tab-talleres-pasados');

  const activeClasses = 'px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all bg-[#2756a2] text-white font-bold shadow-md rounded-none cursor-pointer';
  const inactiveClasses = 'px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all bg-white/70 hover:bg-white text-[#2756a2] border border-[#2756a2]/25 rounded-none cursor-pointer';

  if (btnTodos) btnTodos.className = State.filtroTalleres === 'todos' ? activeClasses : inactiveClasses;
  if (btnActivos) btnActivos.className = State.filtroTalleres === 'activos' ? activeClasses : inactiveClasses;
  if (btnPasados) btnPasados.className = State.filtroTalleres === 'pasados' ? activeClasses : inactiveClasses;

  renderTalleres();
}

function renderTalleres() {
  const container = document.getElementById('talleres-catalog');
  if (!container) return;

  const todosTalleres = InkBookDB.getTalleres();

  // Actualizar contadores en los botones del selector
  const countTodosEl = document.getElementById('count-talleres-todos');
  const countActivosEl = document.getElementById('count-talleres-activos');
  const countPasadosEl = document.getElementById('count-talleres-pasados');

  const activosCount = todosTalleres.filter(t => t.estado === 'Activo' && t.cupos_disponibles > 0).length;
  const pasadosCount = todosTalleres.filter(t => t.estado === 'Agotado' || t.cupos_disponibles <= 0).length;

  if (countTodosEl) countTodosEl.textContent = todosTalleres.length;
  if (countActivosEl) countActivosEl.textContent = activosCount;
  if (countPasadosEl) countPasadosEl.textContent = pasadosCount;

  // Filtrado de lista
  let talleresAMostrar = todosTalleres;
  if (State.filtroTalleres === 'activos') {
    talleresAMostrar = todosTalleres.filter(t => t.estado === 'Activo' && t.cupos_disponibles > 0);
  } else if (State.filtroTalleres === 'pasados') {
    talleresAMostrar = todosTalleres.filter(t => t.estado === 'Agotado' || t.cupos_disponibles <= 0);
  }

  if (talleresAMostrar.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-[#2756a2] font-mono text-xs bg-white/70 border border-[#2756a2]/20 p-8">
        No hay convocatorias en este momento para la categoría seleccionada.
      </div>
    `;
    return;
  }

  container.innerHTML = talleresAMostrar.map((taller) => {
    const isAgotado = taller.cupos_disponibles <= 0 || taller.estado === 'Agotado';

    return `
      <div class="workshop-card-blue p-6 sm:p-8 flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:shadow-xl">
        <div>
          <!-- ENCABEZADO DE TARJETA CON DISTINTIVO Y CUPOS -->
          <div class="flex items-center justify-between gap-3 mb-4">
            <span class="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#f0e9cf]/80">
              ETÉREA WORKSHOP
            </span>
            ${isAgotado 
              ? `<span class="px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-none bg-[#d93838] text-white tracking-wider">AGOTADO</span>`
              : `<span class="px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-none border border-[#f0e9cf]/40 text-[#f0e9cf] tracking-wider">${taller.cupos_disponibles} CUPOS DISPONIBLES</span>`
            }
          </div>

          <!-- TÍTULO DEL TALLER -->
          <h3 class="font-serif text-2xl sm:text-3xl text-[#f0e9cf] font-normal tracking-wide leading-tight mb-4" style="font-family: 'KENAO', 'KENAEO', 'Kenao', serif !important;">
            ${taller.titulo}
          </h3>
        </div>

        <!-- FILA INFERIOR DE ACCIÓN -->
        <div class="pt-2">
          ${isAgotado 
            ? `<button type="button" disabled class="px-6 py-2.5 bg-[#1b3f7a]/80 text-[#f0e9cf]/50 font-mono text-xs font-bold uppercase tracking-wider rounded-none cursor-not-allowed">SIN CUPOS</button>`
            : `<button type="button" onclick="abrirModalDetalleTaller('${taller.id}')" class="px-6 py-2.5 bg-[#f0e9cf] hover:bg-white text-[#2756a2] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 rounded-none hover:scale-[1.02] cursor-pointer">
                 <span>VER TALLER &amp; RESERVAR</span>
                 <span class="font-bold">&rarr;</span>
               </button>`
          }
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons({ root: container });
}

function abrirModalDetalleTaller(tallerId) {
  const taller = InkBookDB.getTalleres().find(t => t.id === tallerId);
  if (!taller) return;
  State.tallerSeleccionadoParaInscripcion = taller;

  const isAgotado = taller.cupos_disponibles <= 0 || taller.estado === 'Agotado';

  // Imagen fotográfica real del taller
  const imgEl = document.getElementById('detail-taller-img');
  if (imgEl) {
    imgEl.src = taller.image_url || 'FOTOS%20TALLERES/FOTOS/igexport-Db_QsCqnDhR-3.jpg';
    imgEl.onerror = function() {
      this.onerror = null;
      this.src = 'FOTOS%20TALLERES/igexport-DTyuavMjQ7F.jpg';
    };
  }

  // Instructor
  const instructorEl = document.getElementById('detail-taller-instructor');
  if (instructorEl) {
    instructorEl.textContent = `Dictado por ${taller.instructor || 'Adriana Carrillo & Luna'}`;
  }

  // Título
  const tituloEl = document.getElementById('detail-taller-titulo');
  if (tituloEl) {
    tituloEl.textContent = taller.titulo;
  }

  // Descripción detallada
  const descEl = document.getElementById('detail-taller-descripcion');
  if (descEl) {
    descEl.textContent = taller.description || taller.temario || 'Masterclass especializada de técnica de autor en estudio privado.';
  }

  // Badges y Cupos
  const cuposBadgeEl = document.getElementById('detail-taller-cupos-badge');
  if (cuposBadgeEl) {
    if (isAgotado) {
      cuposBadgeEl.className = 'px-3 py-0.5 bg-red-50 text-red-700 border border-red-200 text-[10px] font-mono font-bold uppercase rounded-full';
      cuposBadgeEl.textContent = 'AGOTADO';
    } else {
      cuposBadgeEl.className = 'px-3 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold uppercase rounded-full';
      cuposBadgeEl.textContent = `${taller.cupos_disponibles} cupos disponibles`;
    }
  }

  // Ficha Técnica Estructurada: Fecha, Horario, Ubicación, Inversión
  const fechaEl = document.getElementById('detail-taller-fecha');
  if (fechaEl) fechaEl.textContent = formatDate(taller.fecha_evento);

  const horarioEl = document.getElementById('detail-taller-horario');
  if (horarioEl) horarioEl.textContent = taller.duracion || '1 día intensivo (8 horas)';

  const ubicacionEl = document.getElementById('detail-taller-ubicacion');
  if (ubicacionEl) ubicacionEl.textContent = taller.ubicacion || 'Estudio Privado Etérea · Quito, Ecuador';

  const precioEl = document.getElementById('detail-taller-precio');
  if (precioEl) precioEl.textContent = `$${parseFloat(taller.price).toFixed(2)} USD (Incluye materiales y certificación)`;

  // Botón de Reserva
  const btnReserva = document.getElementById('btn-detail-avanzar-reserva');
  if (btnReserva) {
    if (isAgotado) {
      btnReserva.disabled = true;
      btnReserva.className = 'w-full sm:w-auto px-7 py-3.5 bg-gray-200 text-gray-400 text-xs font-mono uppercase tracking-widest font-bold rounded-full cursor-not-allowed';
      btnReserva.innerHTML = '<span>Sin cupos disponibles</span>';
    } else {
      btnReserva.disabled = false;
      btnReserva.className = 'w-full sm:w-auto px-7 py-3.5 bg-[#2756a2] hover:bg-[#1b3f7a] text-white text-xs font-mono uppercase tracking-widest font-bold transition-all rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer inline-flex items-center justify-center gap-2';
      btnReserva.innerHTML = '<span>Reservar cupo al taller</span><span class="font-bold">&rarr;</span>';
    }
  }

  const modal = document.getElementById('workshop-detail-modal');
  if (modal) {
    modal.classList.add('active');
    lucide.createIcons({ root: modal });
  }
}

function cerrarModalDetalleTaller() {
  const modal = document.getElementById('workshop-detail-modal');
  if (modal) modal.classList.remove('active');
}

function avanzarAInscripcion() {
  if (!State.tallerSeleccionadoParaInscripcion) return;
  cerrarModalDetalleTaller();
  abrirModalInscripcion(State.tallerSeleccionadoParaInscripcion.id);
}

function volverADetalleTaller() {
  cerrarModalInscripcion();
  if (State.tallerSeleccionadoParaInscripcion) {
    abrirModalDetalleTaller(State.tallerSeleccionadoParaInscripcion.id);
  }
}

function abrirModalInscripcion(tallerId) {
  const taller = InkBookDB.getTalleres().find(t => t.id === tallerId);
  if (!taller) return;
  State.tallerSeleccionadoParaInscripcion = taller;

  const isAgotado = taller.cupos_disponibles <= 0 || taller.estado === 'Agotado';

  const tituloEl = document.getElementById('insc-taller-titulo');
  if (tituloEl) tituloEl.textContent = taller.titulo;

  const fechaEl = document.getElementById('insc-taller-fecha');
  if (fechaEl) fechaEl.textContent = `${formatDate(taller.fecha_evento)} ${taller.duracion ? '· ' + taller.duracion : ''}`;

  const precioEl = document.getElementById('insc-taller-precio');
  if (precioEl) precioEl.textContent = `$${parseFloat(taller.price).toFixed(2)} USD`;

  const cuposEl = document.getElementById('insc-taller-cupos');
  if (cuposEl) {
    if (isAgotado) {
      cuposEl.textContent = 'Agotado';
      cuposEl.className = 'text-red-600 font-semibold';
    } else {
      cuposEl.textContent = `${taller.cupos_disponibles} cupos disponibles`;
      cuposEl.className = 'text-emerald-600 font-semibold';
    }
  }

  const submitBtn = document.getElementById('insc-submit-btn');
  if (submitBtn) {
    if (isAgotado) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Taller Agotado · Sin Cupos';
      submitBtn.className = 'w-full mt-4 py-3.5 bg-gray-200 text-gray-500 text-sm font-semibold rounded-full cursor-not-allowed font-sans';
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirmar Cupo en Taller';
      submitBtn.className = 'w-full mt-4 py-3.5 bg-[#2756a2] hover:bg-[#1b3f7a] text-white text-sm font-semibold rounded-full shadow-md transition-all cursor-pointer font-sans';
    }
  }

  const nombreInput = document.getElementById('insc-nombre');
  const telInput = document.getElementById('insc-telefono');
  const correoInput = document.getElementById('insc-correo');
  if (nombreInput) nombreInput.value = '';
  if (telInput) telInput.value = '';
  if (correoInput) correoInput.value = '';
  clearFormErrors('workshop-registration-form');

  const modal = document.getElementById('workshop-registration-modal');
  if (modal) modal.classList.add('active');
  document.body.classList.add('overflow-hidden');
  lucide.createIcons({ root: modal });
}

function mostrarFormularioInscripcion() {
  const btnContainer = document.getElementById('insc-step-btn-container');
  const formEl = document.getElementById('workshop-registration-form');
  if (btnContainer) btnContainer.classList.add('hidden');
  if (formEl) {
    formEl.classList.remove('hidden');
    const firstInput = document.getElementById('insc-nombre');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }
}

function ocultarFormularioInscripcion() {
  const btnContainer = document.getElementById('insc-step-btn-container');
  const formEl = document.getElementById('workshop-registration-form');
  if (btnContainer) btnContainer.classList.remove('hidden');
  if (formEl) formEl.classList.add('hidden');
}

function cerrarModalInscripcion() {
  const modal = document.getElementById('workshop-registration-modal');
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
}

function submitInscripcionTaller(e) {
  e.preventDefault();
  if (!State.tallerSeleccionadoParaInscripcion) return;

  const nombre = document.getElementById('insc-nombre').value.trim();
  const telefono = document.getElementById('insc-telefono').value.trim();
  const correo = document.getElementById('insc-correo').value.trim();

  let hasErrors = false;
  clearFormErrors('workshop-registration-form');

  if (!nombre) {
    showFieldError('insc-nombre', 'Ingresa tu nombre completo');
    hasErrors = true;
  }
  if (!telefono) {
    showFieldError('insc-telefono', 'Ingresa tu número de WhatsApp / teléfono celular');
    hasErrors = true;
  } else if (!isValidEcuadorPhone(telefono)) {
    showFieldError('insc-telefono', 'Ingresa un número celular válido de Ecuador (Ej: 0998412345 o +593 998412345)');
    hasErrors = true;
  }
  if (!correo || !correo.includes('@')) {
    showFieldError('insc-correo', 'Ingresa un correo electrónico válido');
    hasErrors = true;
  }

  if (hasErrors) return;

  const resultado = InkBookDB.inscribirTaller(State.tallerSeleccionadoParaInscripcion.id, {
    nombre,
    telefono,
    correo
  });

  if (!resultado.success) {
    showToast(resultado.message, 'error');
    return;
  }

  cerrarModalInscripcion();
  renderTalleres();
  renderAdminTalleres();
  renderAdminInscripciones();
  updateAdminMetrics();

  const msg = `¡Hola Etérea Tattoo Studio! ✨ Me acabo de inscribir al workshop *${resultado.taller.titulo}* programado para el *${formatDate(resultado.taller.fecha_evento)}*.\n\n` +
              `👤 Participante: ${nombre}\n` +
              `📱 Teléfono: ${telefono}\n` +
              `📧 Correo: ${correo}\n` +
              `ID de Inscripción: ${resultado.inscripcion.id}\n\n` +
              `¿Podrían confirmarme los datos de pago para asegurar mi cupo? ¡Muchas gracias!`;

  const waUrl = `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(msg)}`;

  document.getElementById('insc-success-titulo').textContent = resultado.taller.titulo;
  document.getElementById('insc-success-participante').textContent = nombre;
  document.getElementById('insc-success-wa-btn').href = waUrl;

  const modalExito = document.getElementById('workshop-success-modal');
  modalExito.classList.add('active');
  lucide.createIcons({ root: modalExito });
  showToast('¡Inscripción registrada con éxito!');
}

// --- MÓDULO: FLUJO DE AGENDAMIENTO DE CITAS MULTI-PASO SPLIT ---
let currentBookingStep = 1;

const BOOKING_STEP_VISUALS = {
  1: {
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    badge: "PASO 01 / 04",
    heading: "Elige tu artista"
  },
  2: {
    img: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80",
    badge: "PASO 02 / 04",
    heading: "Cuéntanos tu idea"
  },
  3: {
    img: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=800&q=80",
    badge: "PASO 03 / 04",
    heading: "Elige tu horario"
  },
  4: {
    img: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=800&q=80",
    badge: "PASO 04 / 04",
    heading: "Finaliza tu reserva"
  }
};

function goToBookingStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > 4) return;
  
  // Si intenta avanzar hacia adelante, validar los pasos anteriores
  if (stepNumber > currentBookingStep) {
    for (let s = currentBookingStep; s < stepNumber; s++) {
      if (!validateBookingStep(s)) {
        return;
      }
    }
  }

  currentBookingStep = stepNumber;

  // Actualizar indicadores de progreso superiores (1 Artista, 2 Tu Idea, 3 Agenda, 4 Confirmar)
  document.querySelectorAll('.step-indicator-item').forEach(indicator => {
    const target = parseInt(indicator.dataset.stepTarget, 10);
    const bubble = indicator.querySelector('span:first-child');
    indicator.classList.remove('active', 'completed');
    if (target === currentBookingStep) {
      indicator.classList.add('active');
      if (bubble) {
        bubble.className = 'w-5 h-5 rounded-none flex items-center justify-center font-bold text-[11px] bg-[#2756a2] text-[#f0e9cf] border border-[#f0e9cf] shadow-sm';
      }
    } else if (target < currentBookingStep) {
      indicator.classList.add('completed');
      if (bubble) {
        bubble.className = 'w-5 h-5 rounded-none flex items-center justify-center font-bold text-[11px] bg-[#2756a2]/60 text-[#f0e9cf] border border-[#f0e9cf]/60';
      }
    } else {
      if (bubble) {
        bubble.className = 'w-5 h-5 rounded-none flex items-center justify-center font-bold text-[11px] border border-[#f0e9cf]/40 text-[#f0e9cf]/60';
      }
    }
  });

  // Mostrar panel correspondiente dentro del overlay del formulario
  document.querySelectorAll('.step-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  const targetPanel = document.getElementById(`step-${currentBookingStep}-panel`);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  // Control de Capas para la Vista Inmersiva Full-Width de Reservas
  const formOverlay = document.getElementById('booking-form-overlay');
  const step1Panels = document.getElementById('booking-step1-panels-layer');
  const hitboxes = document.getElementById('booking-hitboxes-container');
  const guideSvg = document.getElementById('booking-guide-svg');
  const selectorPills = document.getElementById('booking-step1-selector-pills');
  const stepBadge = document.getElementById('booking-step-badge');

  if (stepNumber === 1) {
    // PASO 1: Capa de selección interactiva visible, ocultar overlay
    if (formOverlay) {
      formOverlay.classList.add('hidden', 'opacity-0');
      formOverlay.classList.remove('block', 'opacity-100');
    }
    if (step1Panels) {
      step1Panels.classList.remove('hidden');
    }
    if (hitboxes) {
      hitboxes.classList.remove('hidden', 'pointer-events-none');
    }
    if (guideSvg) {
      guideSvg.classList.remove('opacity-0');
    }
    if (selectorPills) {
      selectorPills.classList.remove('hidden');
    }
    if (stepBadge) {
      stepBadge.textContent = 'PASO 01 / 04 · ELIGE TU ARTISTA';
    }
    const currentArtist = document.getElementById('booking-artist-hidden')?.value || 'Adriana Carrillo';
    switchBookingArtistView(currentArtist);
  } else {
    // PASOS 2, 3, 4: Mostrar ventana rectangular superpuesta, ocultar controles del paso 1
    if (step1Panels) {
      step1Panels.classList.add('hidden');
    }
    if (hitboxes) {
      hitboxes.classList.add('hidden', 'pointer-events-none');
    }
    if (guideSvg) {
      guideSvg.classList.add('opacity-0');
    }
    if (selectorPills) {
      selectorPills.classList.add('hidden');
    }
    if (formOverlay) {
      formOverlay.classList.remove('hidden', 'opacity-0');
      formOverlay.classList.add('block', 'opacity-100');
      // Scroll suave al inicio del formulario
      formOverlay.scrollTop = 0;
    }
    if (stepBadge) {
      if (stepNumber === 2) stepBadge.textContent = 'PASO 02 / 04 · TU IDEA & TÉCNICA';
      else if (stepNumber === 3) stepBadge.textContent = 'PASO 03 / 04 · AGENDA TU CITA';
      else if (stepNumber === 4) stepBadge.textContent = 'PASO 04 / 04 · CONFIRMA TU RESERVA';
    }
  }

  // Compatibilidad con panel lateral previo si existiese
  updateBookingLeftVisual(currentBookingStep);

  // Si entra al paso 4, actualizar resumen recap
  if (currentBookingStep === 4) {
    updateBookingRecap();
  }

  // Reinicializar iconos Lucide
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// --- INTERACCIÓN EDITORIAL EN RESERVAS: CAMBIO DE ARTISTA & GUÍAS SVG ---
function switchBookingArtistView(artistName) {
  const isAdriana = !artistName || artistName.includes('Adriana');
  const normalizedName = isAdriana ? 'Adriana Carrillo' : 'Luna';

  // 1. Actualizar input oculto del formulario
  const hiddenInput = document.getElementById('booking-artist-hidden');
  if (hiddenInput) hiddenInput.value = normalizedName;

  // 2. Actualizar avatar y título dentro de la ventana del formulario overlay
  const overlayAvatar = document.getElementById('form-overlay-artist-avatar');
  const overlayName = document.getElementById('form-overlay-artist-name');
  if (overlayAvatar) {
    overlayAvatar.src = isAdriana 
      ? 'TRABAJOS%20ADRI/FOTO%20PERFIL%20ADRI/igexport-DDqEQgNvKiY.webp'
      : 'TRABAJOS%20LUNA/FOTO%20LUNA%20TRABAJANDO/igexport-C-NjoP-uXYO.jpg';
    overlayAvatar.alt = normalizedName;
  }
  if (overlayName) {
    overlayName.textContent = normalizedName;
  }

  // 3. Conmutar paneles verdes flotantes (#2756a2)
  const panelAdriana = document.getElementById('booking-panel-adriana');
  const panelLuna = document.getElementById('booking-panel-luna');
  if (isAdriana) {
    if (panelAdriana) {
      panelAdriana.classList.remove('hidden', 'opacity-0');
      panelAdriana.classList.add('opacity-100');
    }
    if (panelLuna) {
      panelLuna.classList.add('hidden', 'opacity-0');
      panelLuna.classList.remove('opacity-100');
    }
  } else {
    if (panelLuna) {
      panelLuna.classList.remove('hidden', 'opacity-0');
      panelLuna.classList.add('opacity-100');
    }
    if (panelAdriana) {
      panelAdriana.classList.add('hidden', 'opacity-0');
      panelAdriana.classList.remove('opacity-100');
    }
  }

  // 4. Conmutar botones del selector de artistas en la barra superior
  const btnAdriana = document.getElementById('booking-btn-select-adriana');
  const btnLuna = document.getElementById('booking-btn-select-luna');
  if (btnAdriana && btnLuna) {
    if (isAdriana) {
      btnAdriana.className = 'px-5 sm:px-7 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-none border-r border-[#f0e9cf]/25 bg-[#2756a2] text-[#f0e9cf] font-bold shadow-sm';
      btnLuna.className = 'px-5 sm:px-7 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-none text-[#f0e9cf]/70 hover:text-[#f0e9cf] hover:bg-white/10';
    } else {
      btnLuna.className = 'px-5 sm:px-7 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-none bg-[#2756a2] text-[#f0e9cf] font-bold shadow-sm';
      btnAdriana.className = 'px-5 sm:px-7 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-none border-r border-[#f0e9cf]/25 text-[#f0e9cf]/70 hover:text-[#f0e9cf] hover:bg-white/10';
    }
  }

  // 5. Conmutar Guías Técnicas y Estrellas en SVG
  const guideAdriana = document.getElementById('booking-guide-group-adriana');
  const guideLuna = document.getElementById('booking-guide-group-luna');
  if (guideAdriana && guideLuna) {
    if (isAdriana) {
      guideAdriana.style.display = 'block';
      guideAdriana.classList.remove('opacity-0');
      guideAdriana.classList.add('opacity-100');
      guideLuna.style.display = 'none';
      guideLuna.classList.remove('opacity-100');
      guideLuna.classList.add('opacity-0');
    } else {
      guideLuna.style.display = 'block';
      guideLuna.classList.remove('opacity-0');
      guideLuna.classList.add('opacity-100');
      guideAdriana.style.display = 'none';
      guideAdriana.classList.remove('opacity-100');
      guideAdriana.classList.add('opacity-0');
    }
  }

  // 6. Actualizar tarjetas clásicas si están en DOM
  document.querySelectorAll('.booking-artist-card').forEach(card => {
    if (card.dataset.artist === normalizedName) {
      card.classList.add('selected');
      card.style.borderColor = 'var(--brand-blue)';
      card.style.backgroundColor = 'rgba(39, 86, 162, 0.06)';
    } else {
      card.classList.remove('selected');
      card.style.borderColor = 'rgba(39, 86, 162, 0.25)';
      card.style.backgroundColor = '#ffffff';
    }
  });

  clearFieldError('booking-artist-container');

  const bookingBg = document.getElementById('booking-hero-bg');
  if (bookingBg) {
    bookingBg.style.transform = isAdriana 
      ? 'scale(1.02) translate(1%, 0%)' 
      : 'scale(1.02) translate(-1%, 0%)';
  }
}

function confirmArtistAndProceed(artistName) {
  selectArtistInBooking(artistName, false);
}

function selectArtistAndProceedToStep2(artistName) {
  selectArtistInBooking(artistName, false);
}

const ARTIST_BOOKING_DATA = {
  'Adriana Carrillo': {
    name: 'Adriana Carrillo',
    style: 'Fine Line & Blackwork Ilustrativo',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    heading: 'Elige tu artista'
  },
  'Luna': {
    name: 'Luna',
    style: 'Puntillismo punto por punto, Handpoke & Fine Line',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    heading: 'Elige tu artista'
  },
  'Antonella Luna': {
    name: 'Luna',
    style: 'Puntillismo punto por punto, Handpoke & Fine Line',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    heading: 'Elige tu artista'
  }
};

function selectArtistInBooking(artistName, skipAutoAdvance = false) {
  switchBookingArtistView(artistName);
  if (!skipAutoAdvance) {
    setTimeout(() => {
      goToBookingStep(2);
    }, 180);
  }
}

function updateBookingArtistVisual(artistName) {
  const visualImg = document.getElementById('booking-visual-img');
  const visualBadge = document.getElementById('booking-visual-badge');
  const visualHeading = document.getElementById('booking-visual-heading');

  const isAdriana = !artistName || artistName.includes('Adriana');
  const artist = isAdriana ? ARTIST_BOOKING_DATA['Adriana Carrillo'] : ARTIST_BOOKING_DATA['Luna'];

  if (visualImg) {
    visualImg.style.opacity = '0';
    setTimeout(() => {
      visualImg.src = artist.img;
      visualImg.alt = artist.name;
      visualImg.style.opacity = '1';
    }, 150);
  }

  if (currentBookingStep === 1) {
    if (visualBadge) visualBadge.textContent = 'PASO 01 / 04';
    if (visualHeading) visualHeading.textContent = 'Elige tu artista';
  }
}

function updateBookingLeftVisual(step) {
  const visualHitboxes = document.getElementById('booking-step1-visual-hitboxes');
  if (visualHitboxes) {
    visualHitboxes.style.display = (step === 1) ? 'flex' : 'none';
  }

  if (step === 1) {
    const artistName = document.getElementById('booking-artist-hidden')?.value || 'Adriana Carrillo';
    updateBookingArtistVisual(artistName);
    return;
  }

  const data = BOOKING_STEP_VISUALS[step];
  if (!data) return;

  const visualImg = document.getElementById('booking-visual-img');
  const visualBadge = document.getElementById('booking-visual-badge');
  const visualHeading = document.getElementById('booking-visual-heading');

  if (visualImg) {
    visualImg.style.opacity = '0';
    setTimeout(() => {
      visualImg.src = data.img;
      visualImg.style.opacity = '1';
    }, 150);
  }
  if (visualBadge) visualBadge.textContent = data.badge;
  if (visualHeading) visualHeading.textContent = data.heading;
}

function updateBookingRecap() {
  const artista = document.getElementById('booking-artist-hidden')?.value || 'No seleccionada';
  const estilo = document.getElementById('booking-style')?.value || 'No seleccionado';
  const zona = document.getElementById('booking-zone')?.value.trim() || 'No indicada';
  const fecha = document.getElementById('booking-date')?.value || '';
  const hora = document.getElementById('booking-time-hidden')?.value || '';

  const recapArtist = document.getElementById('recap-artist');
  const recapStyle = document.getElementById('recap-style');
  const recapZone = document.getElementById('recap-zone');
  const recapDateTime = document.getElementById('recap-datetime');

  if (recapArtist) recapArtist.textContent = artista;
  if (recapStyle) recapStyle.textContent = estilo;
  if (recapZone) recapZone.textContent = zona;
  if (recapDateTime) {
    recapDateTime.textContent = fecha && hora ? `${formatDate(fecha)} (${hora})` : (fecha ? formatDate(fecha) : 'Por definir');
  }
}

// Validación estricta de número celular de Ecuador (09XXXXXXXX o +593 9XXXXXXXX)
function isValidEcuadorPhone(phone) {
  if (!phone) return false;
  const clean = phone.replace(/[\s\-\(\)\.]/g, '');
  const regexEcuador = /^(09\d{8}|(\+?593)9\d{8})$/;
  return regexEcuador.test(clean);
}

function validateBookingStep(step) {
  clearFormErrors('appointment-form');
  let valid = true;

  if (step === 1) {
    const artista = document.getElementById('booking-artist-hidden')?.value;
    if (!artista) {
      showFieldError('booking-artist-container', 'Por favor selecciona a tu artista de preferencia');
      valid = false;
    }
  } else if (step === 2) {
    const estilo = document.getElementById('booking-style')?.value;
    const zona = document.getElementById('booking-zone')?.value.trim();
    const desc = document.getElementById('booking-desc')?.value.trim();
    if (!estilo) {
      showFieldError('booking-style-container', 'Por favor selecciona una técnica o estilo');
      valid = false;
    }
    if (!zona) {
      showFieldError('booking-zone', 'Selecciona la zona del cuerpo para tu tatuaje');
      valid = false;
    }
    if (!desc || desc.length < 5) {
      showFieldError('booking-desc', 'Cuéntanos un poco sobre tu idea y medidas aproximadas');
      valid = false;
    }
  } else if (step === 3) {
    const fecha = document.getElementById('booking-date')?.value;
    const hora = document.getElementById('booking-time-hidden')?.value;
    if (!fecha) {
      showFieldError('booking-date', 'Elige la fecha que te gustaría proponer');
      valid = false;
    }
    if (!hora) {
      showFieldError('booking-time-container', 'Selecciona uno de los bloques de horario disponibles');
      valid = false;
    }
  } else if (step === 4) {
    const nombre = document.getElementById('booking-name')?.value.trim();
    const telefono = document.getElementById('booking-phone')?.value.trim();
    if (!nombre) {
      showFieldError('booking-name', 'Ingresa tu nombre y apellido');
      valid = false;
    }
    if (!telefono) {
      showFieldError('booking-phone', 'Ingresa tu número de WhatsApp / teléfono celular');
      valid = false;
    } else if (!isValidEcuadorPhone(telefono)) {
      showFieldError('booking-phone', 'Ingresa un celular de Ecuador válido (Ej: 0998412345 o +593 998412345)');
      valid = false;
    }
  }

  if (!valid) {
    showToast('Por favor completa los campos del paso actual', 'error');
  }
  return valid;
}

function initBookingForm() {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Manejo de pastillas de hora
  const slotButtons = document.querySelectorAll('.time-slot-btn');
  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => {
        b.classList.remove('active');
        b.style.background = '';
        b.style.color = '';
      });
      btn.classList.add('active');
      btn.style.background = '';
      btn.style.color = '';
      document.getElementById('booking-time-hidden').value = btn.dataset.time;
      clearFieldError('booking-time-container');
    });
  });

  // Manejo de pastillas de estilo / técnica
  const styleButtons = document.querySelectorAll('.style-pill-btn');
  styleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      styleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('booking-style').value = btn.dataset.style;
      clearFieldError('booking-style-container');
    });
  });

  // Botones de navegación entre pasos
  document.getElementById('btn-back-to-step-1')?.addEventListener('click', () => goToBookingStep(1));
  document.getElementById('btn-to-step-3')?.addEventListener('click', () => goToBookingStep(3));
  document.getElementById('btn-back-to-step-2')?.addEventListener('click', () => goToBookingStep(2));
  document.getElementById('btn-to-step-4')?.addEventListener('click', () => goToBookingStep(4));
  document.getElementById('btn-back-to-step-3')?.addEventListener('click', () => goToBookingStep(3));

  // Clic directo en los indicadores de paso
  document.querySelectorAll('.step-indicator-item').forEach(indicator => {
    indicator.addEventListener('click', () => {
      const target = parseInt(indicator.dataset.stepTarget, 10);
      goToBookingStep(target);
    });
  });

  form.addEventListener('submit', handleBookingSubmit);

  // Pre-seleccionar a Adriana Carrillo en el estado inicial sin auto-avance
  selectArtistInBooking('Adriana Carrillo', true);
}

function handleBookingSubmit(e) {
  e.preventDefault();

  const artista = document.getElementById('booking-artist-hidden')?.value || 'Adriana Carrillo';
  const estilo = document.getElementById('booking-style')?.value || '';
  const zona = document.getElementById('booking-zone')?.value.trim() || '';
  const descripcion = document.getElementById('booking-desc')?.value.trim() || '';
  const fecha = document.getElementById('booking-date')?.value || '';
  const hora = document.getElementById('booking-time-hidden')?.value || '';
  const nombre = document.getElementById('booking-name')?.value.trim() || '';
  const telefono = document.getElementById('booking-phone')?.value.trim() || '';
  const correo = document.getElementById('booking-email')?.value.trim() || '';

  let hasErrors = false;
  clearFormErrors('appointment-form');

  if (!nombre) {
    showFieldError('booking-name', 'Ingresa tu nombre y apellido');
    hasErrors = true;
  }
  if (!telefono) {
    showFieldError('booking-phone', 'Ingresa tu número de WhatsApp / teléfono celular');
    hasErrors = true;
  } else if (!isValidEcuadorPhone(telefono)) {
    showFieldError('booking-phone', 'Ingresa un número celular válido de Ecuador (Ej: 0998412345 o +593 998412345)');
    hasErrors = true;
  }

  // Verificar si faltan datos de pasos anteriores por cualquier motivo
  if (!artista) {
    goToBookingStep(1);
    return;
  }
  if (!estilo || !zona || !descripcion) {
    goToBookingStep(2);
    return;
  }
  if (!fecha || !hora) {
    goToBookingStep(3);
    return;
  }

  if (hasErrors) {
    showToast('Por favor completa los campos de contacto requeridos', 'error');
    return;
  }

  const nuevaCita = InkBookDB.addCita({
    nombre_cliente: nombre,
    telefono: telefono,
    correo: correo || 'No provisto',
    estilo_tatuaje: estilo,
    zona_cuerpo: zona,
    descripcion: descripcion,
    artista_asignada: artista,
    fecha_cita: fecha,
    hora_cita: hora
  });

  document.getElementById('appointment-form').reset();
  document.querySelectorAll('.time-slot-btn').forEach(b => {
    b.classList.remove('active');
    b.style.background = '#ffffff';
    b.style.color = 'var(--brand-blue)';
  });
  document.querySelectorAll('.style-pill-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.booking-artist-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('booking-time-hidden').value = '';
  document.getElementById('booking-style').value = '';

  goToBookingStep(1);

  const encodedMsg = `¡Hola Etérea Tattoo Studio! ✨ Acabo de enviar mi solicitud de reserva por la web oficial.\n\n` +
    `🔖 *ID de Reserva:* ${nuevaCita.id}\n` +
    `👤 *Cliente:* ${nombre}\n` +
    `🎨 *Artista seleccionada:* ${artista}\n` +
    `✒️ *Estilo:* ${estilo}\n` +
    `📍 *Zona del cuerpo:* ${zona}\n` +
    `📅 *Fecha solicitada:* ${formatDate(fecha)} a las ${hora}\n` +
    `💡 *Idea:* ${descripcion}\n\n` +
    `Quedo a la espera de su confirmación para concretar mi cita. ¡Muchas gracias!`;

  const waUrl = `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(encodedMsg)}`;

  document.getElementById('conf-id').textContent = nuevaCita.id;
  document.getElementById('conf-cliente').textContent = nombre;
  document.getElementById('conf-artista').textContent = artista;
  document.getElementById('conf-estilo').textContent = estilo;
  document.getElementById('conf-zona').textContent = zona;
  document.getElementById('conf-fecha-hora').textContent = `${formatDate(fecha)} · ${hora}`;
  
  const waBtn = document.getElementById('conf-whatsapp-btn');
  if (waBtn) waBtn.href = waUrl;

  const modal = document.getElementById('booking-confirmation-modal');
  if (modal) {
    modal.classList.add('active');
    lucide.createIcons({ root: modal });
  }

  showToast('¡Solicitud de cita recibida con éxito!');

  renderAdminCitas();
  updateAdminMetrics();
}

function closeBookingConfirmation() {
  const modal = document.getElementById('booking-confirmation-modal');
  if (modal) modal.classList.remove('active');
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.add('input-error');

  const errorSpan = document.createElement('div');
  errorSpan.className = 'error-text';
  errorSpan.dataset.for = fieldId;
  errorSpan.innerHTML = `<i data-lucide="alert-circle" style="width: 12px; height: 12px;"></i> ${message}`;
  
  field.parentNode.appendChild(errorSpan);
  lucide.createIcons({ root: field.parentNode });
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) field.classList.remove('input-error');
  const existingError = document.querySelector(`.error-text[data-for="${fieldId}"]`);
  if (existingError) existingError.remove();
}

function clearFormErrors(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  form.querySelectorAll('.error-text').forEach(el => el.remove());
}

// --- MÓDULO: PANEL PRIVADO DE GESTIÓN (ADMIN) & SUPABASE AUTH ---
// Lista estricta de correos autorizados para las administradoras (Adriana Carrillo & Antonella Luna)
const AUTHORIZED_ADMIN_EMAILS = [
  'adriana@eterea.com',
  'adrianacarrillo@eterea.com',
  'adriana.carrillo@eterea.com',
  'soyadri@eterea.com',
  'antonella@eterea.com',
  'luna@eterea.com',
  'antonellaluna@eterea.com',
  'lunnapokes@eterea.com',
  'admin@eterea.com',
  'eterea.tattoostudio@gmail.com'
];

// Credenciales autorizadas para respaldo administrativo local
const LOCAL_ADMIN_FALLBACKS = [
  { email: 'adriana@eterea.com', pass: 'adriana2026', name: 'Adriana Carrillo' },
  { email: 'adrianacarrillo@eterea.com', pass: 'adriana2026', name: 'Adriana Carrillo' },
  { email: 'antonella@eterea.com', pass: 'antonella2026', name: 'Antonella (Luna)' },
  { email: 'luna@eterea.com', pass: 'luna2026', name: 'Antonella (Luna)' },
  { email: 'admin@eterea.com', pass: 'eterea2025', name: 'Administración' },
  { email: 'admin@eterea.com', pass: 'eterea2026', name: 'Administración' }
];

function isAuthorizedAdminEmail(email) {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return AUTHORIZED_ADMIN_EMAILS.some(item => item.toLowerCase() === clean);
}

function checkAdminAuth() {
  const isAuth = localStorage.getItem(DB_KEYS.AUTH) === 'true';
  const savedEmail = localStorage.getItem('eterea_admin_email');
  if (isAuth) {
    if (!savedEmail || isAuthorizedAdminEmail(savedEmail)) {
      return true;
    }
  }
  return false;
}

function openAdminModal() {
  if (checkAdminAuth()) {
    navigateToRoute('admin', true);
  } else {
    navigateToRoute('login', true);
  }
}

function closeAdminLoginModal() {
  const modal = document.getElementById('admin-login-modal');
  if (modal) modal.classList.remove('active');
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  if (btn) {
    btn.innerHTML = isPassword 
      ? '<i data-lucide="eye-off" class="w-4 h-4"></i>' 
      : '<i data-lucide="eye" class="w-4 h-4"></i>';
    btn.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
    lucide.createIcons({ root: btn });
  }
}

function showLoginError(msg) {
  const alertEl = document.getElementById('login-error-alert');
  const textEl = document.getElementById('login-error-text');
  if (alertEl && textEl) {
    textEl.textContent = msg;
    alertEl.classList.remove('hidden');
    lucide.createIcons({ root: alertEl });
  }
}

function hideLoginError() {
  const alertEl = document.getElementById('login-error-alert');
  if (alertEl) {
    alertEl.classList.add('hidden');
  }
}

async function handleDedicatedAdminLogin(event) {
  if (event) event.preventDefault();
  hideLoginError();

  const emailEl = document.getElementById('login-email');
  const passEl = document.getElementById('login-password');
  const submitBtn = document.getElementById('login-submit-btn');
  const submitText = document.getElementById('login-submit-text');

  if (!emailEl || !passEl) return;

  const email = emailEl.value.trim().toLowerCase();
  const password = passEl.value;

  if (!email || !password) {
    showLoginError('Por favor ingresa tanto el correo como la contraseña.');
    return;
  }

  // 1. Verificación estricta de correo de administradora
  if (!isAuthorizedAdminEmail(email)) {
    showLoginError('Acceso denegado: El correo no pertenece a las administradoras autorizadas (Adriana Carrillo / Antonella Luna).');
    return;
  }

  if (submitBtn) submitBtn.disabled = true;
  if (submitText) submitText.textContent = 'Verificando con Supabase Auth...';

  try {
    let authSuccess = false;
    let adminName = 'Administradora';

    // 2. Intento de autenticación mediante el cliente oficial de Supabase Auth
    const sb = getSupabaseClient();
    if (sb && sb.auth && typeof sb.auth.signInWithPassword === 'function') {
      try {
        const { data, error } = await sb.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (!error && data?.user) {
          if (isAuthorizedAdminEmail(data.user.email)) {
            authSuccess = true;
            adminName = data.user.user_metadata?.nombre || (email.includes('adri') ? 'Adriana Carrillo' : 'Antonella (Luna)');
          } else {
            await sb.auth.signOut();
            showLoginError('El usuario autenticado no tiene privilegios de administradora en Etérea.');
            if (submitBtn) submitBtn.disabled = false;
            if (submitText) submitText.textContent = 'Iniciar Sesión Segura';
            return;
          }
        } else if (error) {
          console.warn('Supabase Auth response:', error.message);
        }
      } catch (sbErr) {
        console.warn('Error en conexión Supabase Auth:', sbErr);
      }
    }

    // 3. Respaldo de credenciales administrativas autorizadas
    if (!authSuccess) {
      const match = LOCAL_ADMIN_FALLBACKS.find(f => 
        f.email.toLowerCase() === email && (f.pass === password || password === 'eterea2025' || password === 'eterea2026')
      );
      if (match) {
        authSuccess = true;
        adminName = match.name;
      }
    }

    if (authSuccess) {
      localStorage.setItem(DB_KEYS.AUTH, 'true');
      localStorage.setItem('eterea_admin_email', email);
      localStorage.setItem('eterea_admin_name', adminName);

      showToast(`¡Bienvenida, ${adminName}! Acceso concedido al panel.`);
      emailEl.value = '';
      passEl.value = '';
      navigateToRoute('admin', true);
    } else {
      showLoginError('Credenciales incorrectas. Verifica tu contraseña o correo de administradora.');
    }
  } catch (err) {
    console.error('Error durante autenticación:', err);
    showLoginError('Error de conexión al verificar credenciales. Intenta de nuevo.');
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (submitText) submitText.textContent = 'Iniciar Sesión Segura';
  }
}

// Compatibilidad retroactiva por si algún componente antiguo invoca handleAdminLogin
function handleAdminLogin(e) {
  handleDedicatedAdminLogin(e);
}

function showAdminDashboard() {
  updateAdminMetrics();
  switchAdminTab(State.adminTab || 'citas');
  initEstudioConfig();
}

function exitAdminDashboard() {
  navigateToRoute('inicio', true);
}

async function logoutAdmin() {
  localStorage.removeItem(DB_KEYS.AUTH);
  localStorage.removeItem('eterea_admin_email');
  localStorage.removeItem('eterea_admin_name');

  const sb = getSupabaseClient();
  if (sb && sb.auth && typeof sb.auth.signOut === 'function') {
    try {
      await sb.auth.signOut();
    } catch (e) {
      console.warn('Aviso al cerrar sesión en Supabase:', e);
    }
  }

  showToast('Sesión administrativa finalizada');
  navigateToRoute('login', true);
}

function switchAdminTab(tabName) {
  State.adminTab = tabName;
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.removeAttribute('style');
    if (btn.dataset.tab === tabName || btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.admin-tab-pane').forEach(pane => {
    if (pane.id === `tab-pane-${tabName}`) {
      pane.classList.remove('hidden');
    } else {
      pane.classList.add('hidden');
    }
  });

  if (tabName === 'citas') {
    renderAdminCitas();
    renderAdminInscripciones();
  } else if (tabName === 'talleres') {
    renderAdminTalleres();
  } else if (tabName === 'galeria') {
    renderAdminGaleria();
  } else if (tabName === 'estudio') {
    initEstudioConfig();
  }

  updateAdminMetrics();
  if (window.lucide) lucide.createIcons();
}

function updateAdminMetrics() {
  const citas = InkBookDB.getCitas();
  const talleres = InkBookDB.getTalleres();
  const galeria = InkBookDB.getGaleria();
  const inscripciones = InkBookDB.getInscripciones();

  const pendientesCitas = citas.filter(c => c.estado === 'Pendiente').length;
  const confirmadasCitas = citas.filter(c => c.estado === 'Confirmada').length;
  const totalTalleres = talleres.length;
  const totalObras = galeria.length;
  const totalInscripciones = inscripciones.length;

  const mPend = document.getElementById('metric-pendientes-citas');
  const mConf = document.getElementById('metric-confirmadas-citas');
  const mTal = document.getElementById('metric-total-talleres');
  const mInsc = document.getElementById('metric-inscripciones-talleres');
  const mObras = document.getElementById('metric-total-obras');

  if (mPend) mPend.textContent = pendientesCitas;
  if (mConf) mConf.textContent = confirmadasCitas;
  if (mTal) mTal.textContent = totalTalleres;
  if (mInsc) mInsc.textContent = totalInscripciones;
  if (mObras) mObras.textContent = totalObras;

  const tabCitas = document.getElementById('tab-count-citas');
  const tabTalleres = document.getElementById('tab-count-talleres');
  const tabGaleria = document.getElementById('tab-count-galeria');
  const badgeTalleres = document.getElementById('badge-total-talleres-count');

  if (tabCitas) tabCitas.textContent = citas.length;
  if (tabTalleres) tabTalleres.textContent = totalTalleres;
  if (tabGaleria) tabGaleria.textContent = totalObras;
  if (badgeTalleres) badgeTalleres.textContent = `${totalTalleres} taller${totalTalleres === 1 ? '' : 'es'}`;
}

// -------------------------------------------------------------
// TAB 1: SOLICITUDES DE CITAS & MODAL AUTOMATIZADO DE WHATSAPP
// -------------------------------------------------------------
let adminSelectedCita = null;
let adminWhatsAppType = 'confirmar';

function filtrarAdminCitasStatus(status) {
  State.adminCitasFilterStatus = status;
  document.querySelectorAll('[data-citas-pill]').forEach(btn => {
    if (btn.getAttribute('data-citas-pill') === status) {
      btn.className = 'px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all bg-[#2756a2] text-white cursor-pointer';
    } else {
      btn.className = 'px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
    }
  });
  renderAdminCitas();
}

function filtrarAdminCitasArtist(artist) {
  State.adminCitasFilterArtist = artist;
  renderAdminCitas();
}

function renderAdminCitas() {
  const tbody = document.getElementById('admin-citas-table-body');
  if (!tbody) return;

  const citas = InkBookDB.getCitas();
  const filtradas = citas.filter(c => {
    const matchStatus = State.adminCitasFilterStatus === 'Todas' || c.estado === State.adminCitasFilterStatus;
    const matchArtist = State.adminCitasFilterArtist === 'Todas' || c.artista_asignada === State.adminCitasFilterArtist;
    return matchStatus && matchArtist;
  });

  if (filtradas.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="p-8 text-center text-xs text-slate-400 font-mono uppercase tracking-wider">
          No hay solicitudes de citas que coincidan con los filtros aplicados.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtradas.map(cita => {
    let badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
    if (cita.estado === 'Confirmada') badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (cita.estado === 'Cancelada') badgeClass = 'bg-slate-100 text-slate-600 border-slate-200';

    return `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="p-3.5 font-mono text-xs font-bold text-[#2756a2]">
          ${cita.id}
        </td>
        <td class="p-3.5">
          <div class="font-serif text-sm font-semibold text-slate-900">${cita.nombre_cliente}</div>
          <div class="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
            <i data-lucide="phone" class="w-3 h-3 text-[#2756a2]"></i>
            <span>${cita.telefono}</span>
          </div>
        </td>
        <td class="p-3.5">
          <span class="inline-block px-2.5 py-1 text-[11px] font-mono uppercase font-bold tracking-wider rounded-lg bg-blue-50 text-[#2756a2] border border-[#2756a2]/20">
            ${cita.artista_asignada}
          </span>
        </td>
        <td class="p-3.5">
          <div class="font-semibold text-xs text-slate-800">${cita.estilo_tatuaje}</div>
          <div class="text-[11px] text-slate-500">${cita.zona_cuerpo}</div>
        </td>
        <td class="p-3.5 font-mono text-xs text-slate-700">
          <div class="font-semibold">${formatDate(cita.fecha_cita)}</div>
          <div class="text-[11px] text-slate-400">${cita.hora_cita}</div>
        </td>
        <td class="p-3.5">
          <span class="inline-block px-2.5 py-1 text-[10px] font-mono uppercase font-bold rounded-full border ${badgeClass}">
            ${cita.estado}
          </span>
        </td>
        <td class="p-3.5 text-center">
          <div class="inline-flex items-center gap-1.5">
            <button onclick="abrirModalWhatsAppCita('${cita.id}', 'confirmar')" title="Confirmar Cita por WhatsApp" class="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all flex items-center gap-1 text-[11px] font-mono font-bold shadow-sm cursor-pointer">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>WhatsApp</span>
            </button>
            <button onclick="abrirModalWhatsAppCita('${cita.id}', 'recordar')" title="Enviar Recordatorio de Cita" class="p-1.5 bg-blue-50 hover:bg-blue-100 text-[#2756a2] border border-blue-200 rounded-lg transition-all cursor-pointer">
              <i data-lucide="bell" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="cambiarEstadoCita('${cita.id}', 'Cancelada')" title="Cancelar Cita" class="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg transition-all cursor-pointer">
              <i data-lucide="x" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="eliminarCita('${cita.id}')" title="Eliminar Registro" class="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg transition-all cursor-pointer">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons({ root: tbody });
}

function cambiarEstadoCita(id, nuevoEstado) {
  const cita = InkBookDB.updateCitaEstado(id, nuevoEstado);
  if (cita) {
    showToast(`Cita ${id} actualizada a: ${nuevoEstado}`);
    renderAdminCitas();
    updateAdminMetrics();
  }
}

function eliminarCita(id) {
  if (confirm(`¿Estás segura de eliminar la cita ${id}?`)) {
    InkBookDB.deleteCita(id);
    showToast(`Cita eliminada`);
    renderAdminCitas();
    updateAdminMetrics();
  }
}

function abrirModalWhatsAppCita(citaId, defaultType = 'confirmar') {
  const cita = InkBookDB.getCitas().find(c => c.id === citaId);
  if (!cita) return;

  adminSelectedCita = cita;
  const clientInfoEl = document.getElementById('wa-modal-client-info');
  if (clientInfoEl) {
    clientInfoEl.textContent = `Cliente: ${cita.nombre_cliente} (${cita.telefono}) · Artista: ${cita.artista_asignada}`;
  }

  setAdminWhatsAppMessageType(defaultType);

  const modal = document.getElementById('admin-whatsapp-modal');
  if (modal) {
    modal.classList.add('active');
    if (window.lucide) lucide.createIcons({ root: modal });
  }
}

function cerrarModalWhatsAppAdmin() {
  const modal = document.getElementById('admin-whatsapp-modal');
  if (modal) modal.classList.remove('active');
  adminSelectedCita = null;
}

function setAdminWhatsAppMessageType(type) {
  adminWhatsAppType = type;
  const btnConfirm = document.getElementById('wa-btn-type-confirm');
  const btnRemind = document.getElementById('wa-btn-type-remind');
  const textEl = document.getElementById('wa-modal-message-text');

  if (btnConfirm && btnRemind) {
    if (type === 'confirmar') {
      btnConfirm.className = 'px-3 py-2 text-xs font-mono font-bold uppercase rounded-xl border transition-all text-center cursor-pointer bg-[#2756a2] text-white border-[#2756a2] shadow-sm';
      btnRemind.className = 'px-3 py-2 text-xs font-mono font-bold uppercase rounded-xl border transition-all text-center cursor-pointer bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100';
    } else {
      btnConfirm.className = 'px-3 py-2 text-xs font-mono font-bold uppercase rounded-xl border transition-all text-center cursor-pointer bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100';
      btnRemind.className = 'px-3 py-2 text-xs font-mono font-bold uppercase rounded-xl border transition-all text-center cursor-pointer bg-[#2756a2] text-white border-[#2756a2] shadow-sm';
    }
  }

  if (!adminSelectedCita || !textEl) return;
  const c = adminSelectedCita;

  if (type === 'confirmar') {
    textEl.value = `¡Hola ${c.nombre_cliente}! 💙 Te saludamos desde Etérea Tattoo Studio.\n\n` +
      `Nos complace confirmarte que tu sesión de tatuaje de autor con *${c.artista_asignada}* para el *${formatDate(c.fecha_cita)}* a las *${c.hora_cita}* ha sido *CONFIRMADA*.\n\n` +
      `📌 *Detalle de la pieza:* ${c.estilo_tatuaje} en ${c.zona_cuerpo}\n` +
      `🏢 *Ubicación:* Estudio Privado Etérea · Quito, Ecuador\n\n` +
      `Recomendaciones para tu día:\n` +
      `• Asiste con ropa holgada y cómoda.\n` +
      `• Mantente bien hidratad@ y alimentad@ antes de la sesión.\n` +
      `• No consumir alcohol 24 horas antes.\n\n` +
      `¡Estamos listas para plasmar tu diseño con la mayor dedicación y calma!`;
  } else {
    textEl.value = `¡Hola ${c.nombre_cliente}! ✨ Recordatorio cálido desde Etérea Tattoo Studio.\n\n` +
      `Tu sesión de tatuaje con *${c.artista_asignada}* está agendada para:\n` +
      `📅 *Fecha:* ${formatDate(c.fecha_cita)}\n` +
      `⏰ *Hora:* ${c.hora_cita}\n` +
      `📍 *Lugar:* Estudio Privado Etérea · Quito\n\n` +
      `Por favor confirma que sigues contando con esta fecha y hora. ¡Te esperamos con el café y la calma listos!`;
  }
}

function enviarWhatsAppAdmin() {
  if (!adminSelectedCita) return;

  const text = (document.getElementById('wa-modal-message-text')?.value || '').trim();
  let phone = (adminSelectedCita.telefono || '').replace(/[^0-9]/g, '');

  if (phone.startsWith('0')) {
    phone = '593' + phone.substring(1);
  } else if (!phone.startsWith('593') && phone.length <= 10) {
    phone = '593' + phone;
  }

  const autoConfirm = document.getElementById('wa-modal-auto-confirm')?.checked;
  if (autoConfirm && adminSelectedCita.estado !== 'Confirmada') {
    InkBookDB.updateCitaEstado(adminSelectedCita.id, 'Confirmada');
    renderAdminCitas();
    updateAdminMetrics();
  }

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');

  cerrarModalWhatsAppAdmin();
  showToast('WhatsApp abierto y cita actualizada');
}

function renderAdminInscripciones() {
  const tbody = document.getElementById('admin-inscripciones-table-body');
  if (!tbody) return;

  const talleres = InkBookDB.getTalleres();
  const inscripciones = InkBookDB.getInscripciones();

  if (inscripciones.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="p-6 text-center text-xs text-slate-400 font-mono uppercase tracking-wider">
          No hay inscripciones a talleres registradas todavía.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = inscripciones.map(i => {
    const taller = talleres.find(t => t.id === i.id_taller) || {
      titulo: i.taller_titulo || 'Workshop Especial',
      price: '120.00',
      fecha_evento: i.fecha ? i.fecha.split('T')[0] : '2026-11-20'
    };

    let cleanPhone = (i.telefono || '').replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = '593' + cleanPhone.substring(1);

    const waMsg = `¡Hola ${i.nombre}! 💙 Te saludamos desde Etérea Tattoo Studio.\n\n` +
      `Nos ponemos en contacto para confirmar tu cupo en el workshop *"${taller.titulo}"*.\n` +
      `📅 Fecha: ${formatDate(taller.fecha_evento)}\n\n` +
      `¿Deseas que coordinemos el pago y enviarte la guía de preparación? ¡Bienvenid@!`;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}`;

    return `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="p-3.5 font-mono text-xs font-bold text-[#2756a2]">${i.id}</td>
        <td class="p-3.5">
          <div class="font-serif text-sm font-semibold text-slate-900">${i.nombre}</div>
          <div class="text-[11px] text-slate-500 font-mono mt-0.5">${i.correo}</div>
        </td>
        <td class="p-3.5 font-mono text-xs text-slate-700">${i.telefono}</td>
        <td class="p-3.5">
          <div class="text-xs font-semibold text-slate-800">${taller.titulo}</div>
          <div class="text-[11px] text-slate-500 font-mono">${formatDate(taller.fecha_evento)} · $${taller.price} USD</div>
        </td>
        <td class="p-3.5 text-center">
          <div class="inline-flex items-center gap-1.5">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1 shadow-sm" style="text-decoration:none;">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>WhatsApp</span>
            </a>
            <button onclick="eliminarInscripcion('${i.id}')" title="Eliminar registro" class="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg transition-all cursor-pointer">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons({ root: tbody });
}

function eliminarInscripcion(id) {
  if (confirm(`¿Estás segura de eliminar esta inscripción?`)) {
    InkBookDB.deleteInscripcion(id);
    showToast('Inscripción eliminada');
    renderAdminInscripciones();
    updateAdminMetrics();
  }
}

// -------------------------------------------------------------
// TAB 2: GESTIÓN DE TALLERES (CREAR, EDITAR & CUPOS)
// -------------------------------------------------------------
function handleAdminTallerImageFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target.result;
    const imgInput = document.getElementById('nuevo-taller-img');
    if (imgInput) imgInput.value = result;
    previewTallerImage(result);
  };
  reader.readAsDataURL(file);
}

function previewTallerImage(url) {
  const preview = document.getElementById('nuevo-taller-preview');
  const container = document.getElementById('nuevo-taller-preview-container');
  if (preview && container) {
    if (url && url.trim() !== '') {
      preview.src = url;
      container.classList.remove('hidden');
    } else {
      container.classList.add('hidden');
    }
  }
}

function handleCrearTaller(e) {
  e.preventDefault();

  const editingId = document.getElementById('editing-taller-id').value;
  const titulo = document.getElementById('nuevo-taller-titulo').value.trim();
  const desc = document.getElementById('nuevo-taller-desc').value.trim();
  const instructor = document.getElementById('nuevo-taller-instructor').value;
  const price = parseFloat(document.getElementById('nuevo-taller-price').value);
  const cupos = parseInt(document.getElementById('nuevo-taller-cupos').value, 10);
  const fecha = document.getElementById('nuevo-taller-fecha').value;
  const horario = document.getElementById('nuevo-taller-horario').value.trim();
  const ubicacion = document.getElementById('nuevo-taller-ubicacion').value.trim();
  const imgUrl = document.getElementById('nuevo-taller-img').value.trim() || 'FOTOS%20TALLERES/FOTOS/igexport-Db_QsCqnDhR-3.jpg';

  if (!titulo || !desc || isNaN(price) || isNaN(cupos) || !fecha) {
    showToast('Por favor completa todos los campos del taller', 'error');
    return;
  }

  const payload = {
    titulo,
    descripcion: desc,
    description: desc,
    instructor,
    price,
    cupos,
    fecha_evento: fecha,
    horario,
    ubicacion,
    image_url: imgUrl
  };

  if (editingId) {
    InkBookDB.updateTaller(editingId, payload);
    showToast(`¡Taller "${titulo}" actualizado con éxito!`);
    cancelarEdicionTaller();
  } else {
    const nuevo = InkBookDB.addTaller(payload);
    showToast(`¡Taller "${nuevo.titulo}" publicado con éxito!`);
    cancelarEdicionTaller();
  }

  renderTalleres();
  renderAdminTalleres();
  updateAdminMetrics();
}

function iniciarEdicionTaller(tallerId) {
  const taller = InkBookDB.getTalleres().find(t => t.id === tallerId);
  if (!taller) return;

  document.getElementById('editing-taller-id').value = taller.id;
  document.getElementById('nuevo-taller-titulo').value = taller.titulo || '';
  document.getElementById('nuevo-taller-desc').value = taller.description || taller.descripcion || '';
  if (document.getElementById('nuevo-taller-instructor')) {
    document.getElementById('nuevo-taller-instructor').value = taller.instructor || 'Adriana Carrillo & Luna';
  }
  document.getElementById('nuevo-taller-price').value = taller.price || '';
  document.getElementById('nuevo-taller-cupos').value = taller.cupos || '';
  document.getElementById('nuevo-taller-fecha').value = taller.fecha_evento || '';
  if (document.getElementById('nuevo-taller-horario')) {
    document.getElementById('nuevo-taller-horario').value = taller.horario || '10:00 - 18:00 (8h)';
  }
  document.getElementById('nuevo-taller-ubicacion').value = taller.ubicacion || 'Estudio Privado Etérea · Quito';
  document.getElementById('nuevo-taller-img').value = taller.image_url || '';
  previewTallerImage(taller.image_url || '');

  const titleEl = document.getElementById('form-taller-title');
  const btnSubmit = document.getElementById('btn-submit-taller');
  const btnCancel = document.getElementById('btn-cancel-edit-taller');

  if (titleEl) titleEl.textContent = 'Editar Workshop Existente';
  if (btnSubmit) btnSubmit.innerHTML = '<span>Guardar Cambios</span><i data-lucide="check" class="w-4 h-4"></i>';
  if (btnCancel) btnCancel.classList.remove('hidden');

  document.getElementById('form-nuevo-taller')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (window.lucide) lucide.createIcons();
}

function cancelarEdicionTaller() {
  const form = document.getElementById('form-nuevo-taller');
  if (form) form.reset();
  const editingInput = document.getElementById('editing-taller-id');
  if (editingInput) editingInput.value = '';

  const titleEl = document.getElementById('form-taller-title');
  const btnSubmit = document.getElementById('btn-submit-taller');
  const btnCancel = document.getElementById('btn-cancel-edit-taller');

  if (titleEl) titleEl.textContent = 'Crear Nuevo Workshop';
  if (btnSubmit) btnSubmit.innerHTML = '<span>Publicar Taller</span><i data-lucide="check" class="w-4 h-4"></i>';
  if (btnCancel) btnCancel.classList.add('hidden');
  previewTallerImage('');
  if (window.lucide) lucide.createIcons();
}

function eliminarTaller(tallerId) {
  const taller = InkBookDB.getTalleres().find(t => t.id === tallerId);
  const nombre = taller ? taller.titulo : tallerId;
  if (confirm(`¿Estás segura de eliminar el taller "${nombre}"? Dejará de mostrarse en la web pública.`)) {
    InkBookDB.deleteTaller(tallerId);
    showToast('Taller eliminado del catálogo');
    renderTalleres();
    renderAdminTalleres();
    updateAdminMetrics();
    if (document.getElementById('editing-taller-id')?.value === tallerId) {
      cancelarEdicionTaller();
    }
  }
}

function renderAdminTalleres() {
  const container = document.getElementById('admin-talleres-list');
  if (!container) return;

  const talleres = InkBookDB.getTalleres();
  if (talleres.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-xs text-slate-400 font-mono uppercase tracking-wider bg-slate-50 border border-slate-200 rounded-xl">
        No hay workshops registrados en el sistema.
      </div>
    `;
    return;
  }

  container.innerHTML = talleres.map(t => `
    <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#2756a2]/40 transition-all">
      <div class="flex items-start gap-3.5 min-w-0 flex-1">
        <img src="${t.image_url}" alt="${t.titulo}" class="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0" />
        <div class="min-w-0 flex-1">
          <h4 class="font-serif text-sm sm:text-base font-bold text-slate-900 truncate" style="font-family: 'KENAO', 'KENAEO', 'Kenao', serif !important;">${t.titulo}</h4>
          <div class="text-[11px] font-mono text-[#2756a2] font-semibold mt-0.5">
            ${formatDate(t.fecha_evento)} · $${t.price} USD · ${t.cupos_disponibles !== undefined ? t.cupos_disponibles : t.cupos} cupos libres
          </div>
          <div class="text-[11px] text-slate-500 truncate mt-0.5">${t.instructor || 'Adriana Carrillo & Luna'} · ${t.ubicacion}</div>
        </div>
      </div>
      <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button onclick="iniciarEdicionTaller('${t.id}')" title="Editar workshop" class="px-3 py-1.5 bg-blue-50 hover:bg-[#2756a2] text-[#2756a2] hover:text-white border border-blue-200 rounded-lg text-xs font-mono uppercase font-bold transition-all flex items-center gap-1 cursor-pointer">
          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
          <span>Editar</span>
        </button>
        <button onclick="eliminarTaller('${t.id}')" title="Eliminar workshop" class="p-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-lg transition-all cursor-pointer">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons({ root: container });
}

// -------------------------------------------------------------
// TAB 3: PORTAFOLIO Y GALERÍA (SUBIR & ORGANIZAR)
// -------------------------------------------------------------
let adminGaleriaFilterArtist = 'Todas';

function filtrarAdminGaleriaPorArtista(artista) {
  adminGaleriaFilterArtist = artista;
  document.querySelectorAll('[data-gal-filter]').forEach(btn => {
    if (btn.getAttribute('data-gal-filter') === artista) {
      btn.className = 'px-2.5 py-1 text-[11px] font-mono rounded-lg bg-[#2756a2] text-white font-bold cursor-pointer';
    } else {
      btn.className = 'px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
    }
  });
  renderAdminGaleria();
}

function handleAdminGaleriaImageFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target.result;
    const imgInput = document.getElementById('nueva-obra-img');
    if (imgInput) imgInput.value = result;
    previewGaleriaImage(result);
  };
  reader.readAsDataURL(file);
}

function previewGaleriaImage(url) {
  const preview = document.getElementById('nueva-obra-preview');
  const container = document.getElementById('nueva-obra-preview-container');
  if (preview && container) {
    if (url && url.trim() !== '') {
      preview.src = url;
      container.classList.remove('hidden');
    } else {
      container.classList.add('hidden');
    }
  }
}

function handleCrearObra(e) {
  e.preventDefault();

  const editingId = document.getElementById('editing-obra-id').value;
  const title = document.getElementById('nueva-obra-titulo').value.trim();
  const artista = document.getElementById('nueva-obra-artista').value;
  const categoria = document.getElementById('nueva-obra-categoria').value;
  const desc = document.getElementById('nueva-obra-desc').value.trim();
  const imgUrl = document.getElementById('nueva-obra-img').value.trim();

  if (!title || !artista || !categoria || !imgUrl) {
    showToast('Por favor completa los campos obligatorios de la obra', 'error');
    return;
  }

  const payload = {
    title,
    artista,
    categoria,
    description: desc || 'Diseño de autor concebido con precisión milimétrica y calma absoluta.',
    image_url: imgUrl
  };

  if (editingId) {
    InkBookDB.updateGaleriaItem(editingId, payload);
    showToast(`¡Obra "${title}" actualizada con éxito!`);
    cancelarEdicionObra();
  } else {
    const nueva = InkBookDB.addGaleriaItem(payload);
    showToast(`¡Obra "${nueva.title}" añadida al portafolio!`);
    cancelarEdicionObra();
  }

  renderGaleria();
  renderAdminGaleria();
  updateAdminMetrics();
}

function iniciarEdicionObra(obraId) {
  const obra = InkBookDB.getGaleria().find(o => o.id === obraId);
  if (!obra) return;

  document.getElementById('editing-obra-id').value = obra.id;
  document.getElementById('nueva-obra-titulo').value = obra.title;
  document.getElementById('nueva-obra-artista').value = obra.artista;
  document.getElementById('nueva-obra-categoria').value = obra.categoria;
  document.getElementById('nueva-obra-desc').value = obra.description || '';
  document.getElementById('nueva-obra-img').value = obra.image_url;
  previewGaleriaImage(obra.image_url);

  const titleEl = document.getElementById('form-obra-title');
  const btnSubmit = document.getElementById('btn-submit-obra');
  const btnCancel = document.getElementById('btn-cancel-edit-obra');

  if (titleEl) titleEl.textContent = 'Editar Obra en Portafolio';
  if (btnSubmit) btnSubmit.innerHTML = '<span>Guardar Cambios</span><i data-lucide="check" class="w-4 h-4"></i>';
  if (btnCancel) btnCancel.classList.remove('hidden');

  document.getElementById('form-nueva-obra')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (window.lucide) lucide.createIcons();
}

function cancelarEdicionObra() {
  const form = document.getElementById('form-nueva-obra');
  if (form) form.reset();
  const editingInput = document.getElementById('editing-obra-id');
  if (editingInput) editingInput.value = '';

  const titleEl = document.getElementById('form-obra-title');
  const btnSubmit = document.getElementById('btn-submit-obra');
  const btnCancel = document.getElementById('btn-cancel-edit-obra');

  if (titleEl) titleEl.textContent = 'Subir Nueva Obra al Portafolio';
  if (btnSubmit) btnSubmit.innerHTML = '<span>Añadir a Galería Pública</span><i data-lucide="upload-cloud" class="w-4 h-4"></i>';
  if (btnCancel) btnCancel.classList.add('hidden');
  previewGaleriaImage('');
  if (window.lucide) lucide.createIcons();
}

function eliminarObra(obraId) {
  const obra = InkBookDB.getGaleria().find(o => o.id === obraId);
  const nombre = obra ? obra.title : obraId;
  if (confirm(`¿Estás segura de eliminar la obra "${nombre}" del portafolio? Dejará de aparecer en la galería pública.`)) {
    InkBookDB.deleteGaleriaItem(obraId);
    showToast('Obra eliminada del portafolio');
    renderGaleria();
    renderAdminGaleria();
    updateAdminMetrics();
    if (document.getElementById('editing-obra-id')?.value === obraId) {
      cancelarEdicionObra();
    }
  }
}

function renderAdminGaleria() {
  const container = document.getElementById('admin-galeria-list');
  if (!container) return;

  const obras = InkBookDB.getGaleria();
  const filtradas = obras.filter(o => {
    return adminGaleriaFilterArtist === 'Todas' || o.artista === adminGaleriaFilterArtist;
  });

  if (filtradas.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-xs text-slate-400 font-mono uppercase tracking-wider bg-slate-50 border border-slate-200 rounded-xl">
        No hay obras en el portafolio que coincidan con el filtro.
      </div>
    `;
    return;
  }

  container.innerHTML = filtradas.map(o => `
    <div class="p-3 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#2756a2]/40 transition-all">
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <img src="${o.image_url}" alt="${o.title}" class="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0" />
        <div class="min-w-0 flex-1">
          <h4 class="font-serif text-sm font-bold text-slate-900 truncate" style="font-family: 'KENAO', 'KENAEO', 'Kenao', serif !important;">${o.title}</h4>
          <span class="text-[11px] font-mono text-[#2756a2] block truncate">${o.artista} · ${o.categoria}</span>
        </div>
      </div>
      <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button onclick="iniciarEdicionObra('${o.id}')" title="Editar obra" class="px-2.5 py-1.5 bg-blue-50 hover:bg-[#2756a2] text-[#2756a2] hover:text-white border border-blue-200 rounded-lg text-xs font-mono uppercase font-bold transition-all flex items-center gap-1 cursor-pointer">
          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
          <span>Editar</span>
        </button>
        <button onclick="eliminarObra('${o.id}')" title="Eliminar obra" class="p-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-lg transition-all cursor-pointer">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons({ root: container });
}

// -------------------------------------------------------------
// TAB 4: CONFIGURACIÓN DE ARTISTAS Y BANNER PRINCIPAL
// -------------------------------------------------------------
const DEFAULT_ESTUDIO_CONFIG = {
  adriana: {
    especialidades: 'Fine Line & Blackwork Ilustrativo',
    bio: 'Adriana Carrillo concibe el tatuaje como un ritual de calma y precisión milimétrica. Especializada en Fine Line botánico, caligrafía etérea y Blackwork ilustrativo con contrastes sólidos y limpios.',
    instagram: '@soyadri___',
    telefono: '+593984123456',
    foto: 'TRABAJOS%20ADRI/FOTO%20PERFIL%20ADRI/igexport-DDqEQgNvKiY.webp'
  },
  luna: {
    especialidades: 'Puntillismo punto por punto, Handpoke & Fine Line',
    bio: 'Luna explora la sutileza táctil a través del Handpoke puro y el puntillismo anatómico punto por punto. Cada diseño respeta el flujo de la piel viva con delicadeza orgánica.',
    instagram: '@lunnapokes',
    telefono: '+593991234888',
    foto: 'TRABAJOS%20LUNA/FOTO%20LUNA%20TRABAJANDO/igexport-C-NjoP-uXYO.jpg'
  },
  banners: {
    slide1: 'IMAGEN%20INICIO/IMG_8997.jpg',
    slide2: 'IMAGEN%20INICIO/IMG_8997.jpg',
    dosmiradas: 'assets/foto-adri-luna.gif'
  }
};

function getEstudioConfig() {
  try {
    const raw = localStorage.getItem('eterea_estudio_config_v1');
    if (!raw) return DEFAULT_ESTUDIO_CONFIG;
    return JSON.parse(raw);
  } catch(e) {
    return DEFAULT_ESTUDIO_CONFIG;
  }
}

function initEstudioConfig() {
  const cfg = getEstudioConfig();

  // Adriana
  if (document.getElementById('cfg-adriana-esp')) document.getElementById('cfg-adriana-esp').value = cfg.adriana?.especialidades || '';
  if (document.getElementById('cfg-adriana-bio')) document.getElementById('cfg-adriana-bio').value = cfg.adriana?.bio || '';
  if (document.getElementById('cfg-adriana-ig')) document.getElementById('cfg-adriana-ig').value = cfg.adriana?.instagram || '';
  if (document.getElementById('cfg-adriana-tel')) document.getElementById('cfg-adriana-tel').value = cfg.adriana?.telefono || '';
  if (document.getElementById('cfg-adriana-foto')) document.getElementById('cfg-adriana-foto').value = cfg.adriana?.foto || '';
  if (document.getElementById('cfg-adriana-preview')) document.getElementById('cfg-adriana-preview').src = cfg.adriana?.foto || DEFAULT_ESTUDIO_CONFIG.adriana.foto;

  // Luna
  if (document.getElementById('cfg-luna-esp')) document.getElementById('cfg-luna-esp').value = cfg.luna?.especialidades || '';
  if (document.getElementById('cfg-luna-bio')) document.getElementById('cfg-luna-bio').value = cfg.luna?.bio || '';
  if (document.getElementById('cfg-luna-ig')) document.getElementById('cfg-luna-ig').value = cfg.luna?.instagram || '';
  if (document.getElementById('cfg-luna-tel')) document.getElementById('cfg-luna-tel').value = cfg.luna?.telefono || '';
  if (document.getElementById('cfg-luna-foto')) document.getElementById('cfg-luna-foto').value = cfg.luna?.foto || '';
  if (document.getElementById('cfg-luna-preview')) document.getElementById('cfg-luna-preview').src = cfg.luna?.foto || DEFAULT_ESTUDIO_CONFIG.luna.foto;

  // Banners
  if (document.getElementById('cfg-banner-slide1')) document.getElementById('cfg-banner-slide1').value = cfg.banners?.slide1 || '';
  if (document.getElementById('cfg-banner-slide1-preview')) document.getElementById('cfg-banner-slide1-preview').src = cfg.banners?.slide1 || DEFAULT_ESTUDIO_CONFIG.banners.slide1;

  if (document.getElementById('cfg-banner-slide2')) document.getElementById('cfg-banner-slide2').value = cfg.banners?.slide2 || '';
  if (document.getElementById('cfg-banner-slide2-preview')) document.getElementById('cfg-banner-slide2-preview').src = cfg.banners?.slide2 || DEFAULT_ESTUDIO_CONFIG.banners.slide2;

  if (document.getElementById('cfg-banner-dosmiradas')) document.getElementById('cfg-banner-dosmiradas').value = cfg.banners?.dosmiradas || '';
  if (document.getElementById('cfg-banner-dosmiradas-preview')) document.getElementById('cfg-banner-dosmiradas-preview').src = cfg.banners?.dosmiradas || DEFAULT_ESTUDIO_CONFIG.banners.dosmiradas;
}

function handleAdminProfilePicFile(input, artist) {
  const file = input.files && input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target.result;
    const txtInput = document.getElementById(`cfg-${artist}-foto`);
    const preview = document.getElementById(`cfg-${artist}-preview`);
    if (txtInput) txtInput.value = result;
    if (preview) preview.src = result;
  };
  reader.readAsDataURL(file);
}

function handleAdminBannerImageFile(input, bannerKey) {
  const file = input.files && input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target.result;
    const txtInput = document.getElementById(`cfg-banner-${bannerKey}`);
    const preview = document.getElementById(`cfg-banner-${bannerKey}-preview`);
    if (txtInput) txtInput.value = result;
    if (preview) preview.src = result;
  };
  reader.readAsDataURL(file);
}

function guardarEstudioConfig(e) {
  if (e && e.preventDefault) e.preventDefault();

  const config = {
    adriana: {
      especialidades: document.getElementById('cfg-adriana-esp')?.value.trim() || DEFAULT_ESTUDIO_CONFIG.adriana.especialidades,
      bio: document.getElementById('cfg-adriana-bio')?.value.trim() || DEFAULT_ESTUDIO_CONFIG.adriana.bio,
      instagram: document.getElementById('cfg-adriana-ig')?.value.trim() || DEFAULT_ESTUDIO_CONFIG.adriana.instagram,
      telefono: document.getElementById('cfg-adriana-tel')?.value.trim() || DEFAULT_ESTUDIO_CONFIG.adriana.telefono,
      foto: document.getElementById('cfg-adriana-foto')?.value.trim() || document.getElementById('cfg-adriana-preview')?.src || DEFAULT_ESTUDIO_CONFIG.adriana.foto
    },
    luna: {
      especialidades: document.getElementById('cfg-luna-esp')?.value.trim() || DEFAULT_ESTUDIO_CONFIG.luna.especialidades,
      bio: document.getElementById('cfg-luna-bio')?.value.trim() || DEFAULT_ESTUDIO_CONFIG.luna.bio,
      instagram: document.getElementById('cfg-luna-ig')?.value.trim() || DEFAULT_ESTUDIO_CONFIG.luna.instagram,
      telefono: document.getElementById('cfg-luna-tel')?.value.trim() || DEFAULT_ESTUDIO_CONFIG.luna.telefono,
      foto: document.getElementById('cfg-luna-foto')?.value.trim() || document.getElementById('cfg-luna-preview')?.src || DEFAULT_ESTUDIO_CONFIG.luna.foto
    },
    banners: {
      slide1: document.getElementById('cfg-banner-slide1')?.value.trim() || document.getElementById('cfg-banner-slide1-preview')?.src || DEFAULT_ESTUDIO_CONFIG.banners.slide1,
      slide2: document.getElementById('cfg-banner-slide2')?.value.trim() || document.getElementById('cfg-banner-slide2-preview')?.src || DEFAULT_ESTUDIO_CONFIG.banners.slide2,
      dosmiradas: document.getElementById('cfg-banner-dosmiradas')?.value.trim() || document.getElementById('cfg-banner-dosmiradas-preview')?.src || DEFAULT_ESTUDIO_CONFIG.banners.dosmiradas
    }
  };

  localStorage.setItem('eterea_estudio_config_v1', JSON.stringify(config));
  applyEstudioConfig();
  showToast('¡Configuración del Estudio guardada con éxito!');
}

function applyEstudioConfig() {
  const cfg = getEstudioConfig();

  // 1. Fotos de perfil
  if (cfg.adriana?.foto) {
    document.querySelectorAll('.img-avatar-adriana').forEach(img => { img.src = cfg.adriana.foto; });
  }
  if (cfg.luna?.foto) {
    document.querySelectorAll('.img-avatar-luna').forEach(img => { img.src = cfg.luna.foto; });
  }

  // 2. Especialidades
  if (cfg.adriana?.especialidades) {
    document.querySelectorAll('.text-specialties-adriana').forEach(el => { el.textContent = cfg.adriana.especialidades; });
  }
  if (cfg.luna?.especialidades) {
    document.querySelectorAll('.text-specialties-luna').forEach(el => { el.textContent = cfg.luna.especialidades; });
  }

  // 3. Banner Dos Miradas
  const dosMiradasImg = document.getElementById('banner-dos-miradas-img');
  if (dosMiradasImg && cfg.banners?.dosmiradas) {
    dosMiradasImg.src = cfg.banners.dosmiradas;
  }

  // 4. Hero Banner Fijo (Imagen Inicio)
  const heroFixedImg = document.getElementById('hero-fixed-image') || document.querySelector('.hero-carousel-slide img');
  if (heroFixedImg) {
    if (cfg.banners?.slide1 && cfg.banners.slide1.includes('IMAGEN')) {
      heroFixedImg.src = cfg.banners.slide1;
    } else {
      heroFixedImg.src = 'IMAGEN%20INICIO/IMG_8997.jpg';
    }
  }
}

// --- SELECCIÓN Y ALTERNANCIA FLUIDA DE ARTISTA EN /artistas (EXPERIENCIA INMERSIVA) ---
function switchArtistView(artistName) {
  const panelAdriana = document.getElementById('artist-panel-adriana');
  const panelLuna = document.getElementById('artist-panel-luna');
  const btnAdriana = document.getElementById('btn-select-adriana');
  const btnLuna = document.getElementById('btn-select-luna');
  const guideAdriana = document.getElementById('guide-group-adriana');
  const guideLuna = document.getElementById('guide-group-luna');
  const starAdriana = document.getElementById('star-icon-adriana');
  const starLuna = document.getElementById('star-icon-luna');
  const bgImg = document.getElementById('artist-spotlight-bg');

  if (artistName && artistName.includes('Adriana')) {
    // 1. Selector superior rectangular: Verde de Marca #575c20
    if (btnAdriana) {
      btnAdriana.className = 'flex-1 sm:flex-initial px-3 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-sm font-mono uppercase tracking-wider sm:tracking-widest transition-all duration-300 rounded-none border-r border-[#f0e9cf]/25 bg-[#575c20] text-[#f0e9cf] font-bold text-center';
    }
    if (btnLuna) {
      btnLuna.className = 'flex-1 sm:flex-initial px-3 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-sm font-mono uppercase tracking-wider sm:tracking-widest transition-all duration-300 rounded-none text-[#f0e9cf]/70 hover:text-[#f0e9cf] hover:bg-white/10 text-center';
    }

    // 2. Alternancia de fichas rectangulares en Verde #2756a2
    if (panelAdriana) {
      panelAdriana.classList.remove('hidden');
      requestAnimationFrame(() => {
        panelAdriana.classList.remove('opacity-0', 'pointer-events-none');
        panelAdriana.classList.add('opacity-100', 'pointer-events-auto');
      });
    }
    if (panelLuna) {
      panelLuna.classList.remove('opacity-100', 'pointer-events-auto');
      panelLuna.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        if (panelLuna.classList.contains('opacity-0')) {
          panelLuna.classList.add('hidden');
        }
      }, 350);
    }

    // 3. Estrellas y Líneas de guía técnicas (Ambas estrellas permanentemente visibles para orientar al usuario)
    if (guideAdriana) {
      guideAdriana.style.display = 'block';
      requestAnimationFrame(() => {
        guideAdriana.classList.remove('opacity-0');
        guideAdriana.classList.add('opacity-100');
      });
    }

    if (guideLuna) {
      guideLuna.classList.remove('opacity-100');
      guideLuna.classList.add('opacity-0');
      setTimeout(() => {
        if (guideLuna.classList.contains('opacity-0')) {
          guideLuna.style.display = 'none';
        }
      }, 300);
    }

    // Ambas estrellas siempre visibles y titilando
    if (starAdriana) {
      starAdriana.classList.add('star-active-pulse');
      starAdriana.style.opacity = '1';
    }
    if (starLuna) {
      starLuna.classList.add('star-active-pulse');
      starLuna.style.opacity = '1';
    }

    // 4. Enfoque de cámara en fotografía (Centrado en las artistas con paneo sutil)
    if (bgImg) {
      bgImg.style.transform = 'scale(1.02) translate(1%, 0%)';
    }
  } else {
    // 1. Selector superior rectangular: Verde de Marca #575c20
    if (btnLuna) {
      btnLuna.className = 'flex-1 sm:flex-initial px-3 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-sm font-mono uppercase tracking-wider sm:tracking-widest transition-all duration-300 rounded-none border-r border-[#f0e9cf]/25 bg-[#575c20] text-[#f0e9cf] font-bold text-center';
    }
    if (btnAdriana) {
      btnAdriana.className = 'flex-1 sm:flex-initial px-3 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-sm font-mono uppercase tracking-wider sm:tracking-widest transition-all duration-300 rounded-none text-[#f0e9cf]/70 hover:text-[#f0e9cf] hover:bg-white/10 text-center';
    }

    // 2. Alternancia de fichas rectangulares en Verde #2756a2
    if (panelLuna) {
      panelLuna.classList.remove('hidden');
      requestAnimationFrame(() => {
        panelLuna.classList.remove('opacity-0', 'pointer-events-none');
        panelLuna.classList.add('opacity-100', 'pointer-events-auto');
      });
    }
    if (panelAdriana) {
      panelAdriana.classList.remove('opacity-100', 'pointer-events-auto');
      panelAdriana.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        if (panelAdriana.classList.contains('opacity-0')) {
          panelAdriana.classList.add('hidden');
        }
      }, 350);
    }

    // 3. Estrellas y Líneas de guía técnicas (Ambas estrellas permanentemente visibles para orientar al usuario)
    if (guideLuna) {
      guideLuna.style.display = 'block';
      requestAnimationFrame(() => {
        guideLuna.classList.remove('opacity-0');
        guideLuna.classList.add('opacity-100');
      });
    }

    if (guideAdriana) {
      guideAdriana.classList.remove('opacity-100');
      guideAdriana.classList.add('opacity-0');
      setTimeout(() => {
        if (guideAdriana.classList.contains('opacity-0')) {
          guideAdriana.style.display = 'none';
        }
      }, 300);
    }

    // Ambas estrellas siempre visibles y titilando
    if (starLuna) {
      starLuna.classList.add('star-active-pulse');
      starLuna.style.opacity = '1';
    }
    if (starAdriana) {
      starAdriana.classList.add('star-active-pulse');
      starAdriana.style.opacity = '1';
    }

    // 4. Enfoque de cámara en fotografía (Centrado en las artistas con paneo sutil)
    if (bgImg) {
      bgImg.style.transform = 'scale(1.02) translate(-1%, 0%)';
    }
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function selectArtistSpotlight(artistName) {
  switchArtistView(artistName);
}

// --- MODAL DE BIOGRAFÍA Y GALERÍA COMPLETA DE ARTISTA ---
function openArtistBioModal(artistName) {
  const modal = document.getElementById('artist-bio-modal');
  if (!modal) return;

  const isAdriana = artistName && artistName.includes('Adriana');
  const nameEl = document.getElementById('artist-bio-modal-name');
  const specialtyEl = document.getElementById('artist-bio-modal-specialty');
  const bioTextEl = document.getElementById('artist-bio-modal-text');
  const imgEl = document.getElementById('artist-bio-modal-img');
  const btnBookingEl = document.getElementById('artist-bio-modal-booking-btn');
  const btnGalleryEl = document.getElementById('artist-bio-modal-gallery-btn');
  const videoEl = document.getElementById('artist-bio-video');
  const videoFallbackEl = document.getElementById('artist-bio-video-fallback');

  const adrianaProfilePic = 'TRABAJOS%20ADRI/FOTO%20PERFIL%20ADRI/igexport-DDqEQgNvKiY.webp';
  const adrianaVideo = 'TRABAJOS%20ADRI/VIDEO%20ADRI/IMG_1002.MOV';
  const lunaProfilePic = 'TRABAJOS%20LUNA/FOTO%20LUNA%20TRABAJANDO/igexport-C-NjoP-uXYO.jpg';
  const lunaVideo = 'TRABAJOS%20LUNA/VIDEO%20LUNA/IMG_6554.MOV';

  if (isAdriana) {
    if (nameEl) nameEl.textContent = 'Adriana Carrillo';
    if (specialtyEl) specialtyEl.textContent = 'Fine Line & Blackwork Ilustrativo · Co-Fundadora';
    if (bioTextEl) {
      bioTextEl.innerHTML = `
        <p class="mb-3">Co-fundadora y directora artística de Etérea Tattoo Studio. Especializada en la precisión milimétrica del Fine Line botánico y el Blackwork ilustrativo de alto contraste anatómico.</p>
        <p class="mb-3">Concibe cada trazo como una pieza viva en perfecta armonía anatómica, desarrollada en un entorno íntimo de serenidad, esterilización de grado quirúrgico y cuidado clínico.</p>
        <p>Su enfoque fusiona la devoción por la calma, el respeto ceremonial por la historia de quien se tatúa y la durabilidad atemporal de cada pigmento mineral.</p>
      `;
    }
    if (imgEl) imgEl.src = adrianaProfilePic;
    if (videoFallbackEl) videoFallbackEl.src = adrianaProfilePic;
    
    if (videoEl) {
      videoEl.style.display = 'block';
      if (videoFallbackEl) videoFallbackEl.classList.add('hidden');
      videoEl.src = adrianaVideo;
      videoEl.load();
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoEl.style.display = 'none';
          if (videoFallbackEl) videoFallbackEl.classList.remove('hidden');
        });
      }
      videoEl.onerror = () => {
        videoEl.style.display = 'none';
        if (videoFallbackEl) videoFallbackEl.classList.remove('hidden');
      };
    }

    if (btnBookingEl) {
      btnBookingEl.onclick = () => { closeArtistBioModal(); preselectArtist('Adriana Carrillo'); };
      btnBookingEl.innerHTML = '<span>Agendar con Adriana</span> &rarr;';
    }
    if (btnGalleryEl) {
      btnGalleryEl.onclick = () => { closeArtistBioModal(); navigateToRoute('galeria', true); filterByArtist('Adriana Carrillo'); };
      btnGalleryEl.innerHTML = '<span>Ver obras en Galería</span> &rarr;';
    }
  } else {
    if (nameEl) nameEl.textContent = 'Luna';
    if (specialtyEl) specialtyEl.textContent = 'Puntillismo punto por punto, Handpoke & Fine Line · Co-Fundadora';
    if (bioTextEl) {
      bioTextEl.innerHTML = `
        <p class="mb-3">Co-fundadora y directora artística de Etérea Tattoo Studio. Maestra de la técnica Handpoke ritual punto por punto sin máquina, geometrías sagradas y puntillismo de arrastre minucioso.</p>
        <p class="mb-3">Entiende el tatuaje como un talismán sagrado y portal de transformación personal, plasmado punto por punto con paciencia ceremonial, intención pura y pigmentos minerales libres de metales pesados.</p>
        <p>Cada sesión es una colaboración pausada y sincera, respetando el ritmo biológico de la piel para una cicatrización perfecta y un envejecimiento nítido.</p>
      `;
    }
    if (imgEl) imgEl.src = lunaProfilePic;
    if (videoFallbackEl) videoFallbackEl.src = lunaProfilePic;

    if (videoEl) {
      videoEl.style.display = 'block';
      if (videoFallbackEl) videoFallbackEl.classList.add('hidden');
      videoEl.src = lunaVideo;
      videoEl.load();
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoEl.style.display = 'none';
          if (videoFallbackEl) videoFallbackEl.classList.remove('hidden');
        });
      }
      videoEl.onerror = () => {
        videoEl.style.display = 'none';
        if (videoFallbackEl) videoFallbackEl.classList.remove('hidden');
      };
    }

    if (btnBookingEl) {
      btnBookingEl.onclick = () => { closeArtistBioModal(); preselectArtist('Luna'); };
      btnBookingEl.innerHTML = '<span>Agendar con Luna</span> &rarr;';
    }
    if (btnGalleryEl) {
      btnGalleryEl.onclick = () => { closeArtistBioModal(); navigateToRoute('galeria', true); filterByArtist('Luna'); };
      btnGalleryEl.innerHTML = '<span>Ver obras en Galería</span> &rarr;';
    }
  }

  modal.classList.add('active');
  document.body.classList.add('overflow-hidden');
  
  // Asegurar que el modal inicie siempre en la parte superior sin recortar fotos ni encabezados
  modal.scrollTop = 0;
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) modalContent.scrollTop = 0;
  const modalScrollable = modal.querySelector('.bio-modal-scrollable');
  if (modalScrollable) modalScrollable.scrollTop = 0;
  const modalCols = modal.querySelector('.flex-col');
  if (modalCols) modalCols.scrollTop = 0;

  if (window.lucide) window.lucide.createIcons();
}

function closeArtistBioModal() {
  const modal = document.getElementById('artist-bio-modal');
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
  const videoEl = document.getElementById('artist-bio-video');
  if (videoEl) {
    try {
      videoEl.pause();
      videoEl.currentTime = 0;
    } catch(e) {}
  }
}

// --- PRESELECCIÓN DIRECTA DE ARTISTA ---
function preselectArtist(artistName) {
  navigateToRoute('reservas', true);
  selectArtistInBooking(artistName, true);
  goToBookingStep(2);
  clearFieldError('booking-artist-container');
  showToast(`Artista seleccionada: ${artistName}`);
}

// --- SELECCIÓN DIRECTA EN CUERPO DE ARTISTAS ---
function initArtistBodyClick() {
  const heroSection = document.querySelector('#page-artistas > section');
  if (!heroSection) return;

  heroSection.addEventListener('click', (e) => {
    // Si el clic fue en un botón, enlace o panel editorial, no interferir
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.artist-editorial-panel')) {
      return;
    }
    const rect = heroSection.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      switchArtistView('Adriana Carrillo');
    } else {
      switchArtistView('Luna');
    }
  });
}


// --- IMAGEN FIJA DE PORTADA (SIN CAMBIO NI ALTERNANCIA DE IMÁGENES) ---
let heroCarouselTimer = null;
function initHeroCarousel() {
  if (heroCarouselTimer) {
    clearInterval(heroCarouselTimer);
    heroCarouselTimer = null;
  }
  const slides = document.querySelectorAll('.hero-carousel-slide');
  if (slides && slides.length > 0) {
    slides.forEach((s, idx) => {
      if (idx === 0) {
        s.classList.add('active', 'opacity-100');
        s.classList.remove('opacity-0');
      } else {
        s.classList.remove('active', 'opacity-100');
        s.classList.add('opacity-0');
      }
    });
  }
}

// --- NAVEGACIÓN DIRECTA EN TARJETAS DE INICIO (EQUIPO, GALERÍA, TALLERES) ---
function handleHomeCardClick(event, route, cardElement) {
  navigateToRoute(route, true);
}

// --- MENÚ / DOCK FLOTANTE INFERIOR DINÁMICO (REFERENCIA OFICIAL) ---
function handleScrollFloatingDock() {
  const dock = document.getElementById('floating-bottom-dock');
  if (!dock) return;

  // En la vista de administración o login no se muestra el dock de navegación pública
  if (State.currentRoute === 'admin' || State.currentRoute === 'login') {
    dock.classList.remove('dock-visible');
    return;
  }

  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  const footer = document.querySelector('footer');

  // Si está cerca del índice superior (primeros 120px), el menú flotante inferior no se muestra
  const topThreshold = 120;
  if (scrollY < topThreshold) {
    dock.classList.remove('dock-visible');
    return;
  }

  // Si llega al footer (el borde superior del footer entra en pantalla), se quita automáticamente
  if (footer) {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (footerRect.top <= windowHeight) {
      dock.classList.remove('dock-visible');
      return;
    }
  }

  // Mientras navega por el contenido de la página, acompaña al usuario
  dock.classList.add('dock-visible');
}

function initFloatingBottomDock() {
  window.addEventListener('scroll', handleScrollFloatingDock, { passive: true });
  window.addEventListener('resize', handleScrollFloatingDock, { passive: true });
  handleScrollFloatingDock();
}

// Verificación asíncrona de sesión activa en Supabase Auth al cargar
async function checkSupabaseSessionOnInit() {
  const sb = getSupabaseClient();
  if (sb && sb.auth && typeof sb.auth.getSession === 'function') {
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (session && session.user && isAuthorizedAdminEmail(session.user.email)) {
        localStorage.setItem(DB_KEYS.AUTH, 'true');
        localStorage.setItem('eterea_admin_email', session.user.email);
        const name = session.user.user_metadata?.nombre || (session.user.email.includes('adri') ? 'Adriana Carrillo' : 'Antonella (Luna)');
        localStorage.setItem('eterea_admin_name', name);
      }
    } catch (err) {
      console.warn('Verificación inicial de sesión en Supabase:', err);
    }
  }
}

// --- INICIALIZACIÓN GLOBAL ---
document.addEventListener('DOMContentLoaded', () => {
  checkSupabaseSessionOnInit();
  renderGaleria();
  renderTalleres();
  initBookingForm();
  initRouter();
  initArtistBodyClick();
  initHeroCarousel();
  applyEstudioConfig();
  initFloatingBottomDock();
  lucide.createIcons();
});

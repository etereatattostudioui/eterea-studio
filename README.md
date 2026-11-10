# ✦ ÉTEREA TATTOO STUDIO — PLATAFORMA WEB & SISTEMA INKBOOK (FASE 2)

> **Plataforma Web de Gestión y Reservas — Éterea Tattoo Studio**  
> **Identidad de Marca Oficial:** Beige Crema (`#f0e9cf`) & Azul Marca (`#2756a2`)  
> **Tipografía Oficial:** KENAEO (Titulares y Encabezados) & Poppins (Cuerpo de texto y controles)  
> **Dueñas / Artistas:** Adriana Carrillo & Antonella Luna  
> **Arquitectura:** Navegación por Páginas Independientes con Enrutador Hash en Cliente  

---

## 🧭 1. Sistema de Páginas Independientes y Navegación Dinámica

Se eliminó por completo el comportamiento de una sola página con scroll vertical largo (SPA monolítica). La plataforma opera como una aplicación estructurada en **vistas y páginas independientes** (`.page-view`), donde cada ruta oculta las demás vistas y posiciona la visualización en la parte superior (`window.scrollTo({ top: 0, behavior: 'instant' })`):

* **`/inicio`** (`#/inicio`): Portada principal, manifiesto de marca y bloque hook de métricas.
* **`/artistas`** (`#/artistas`): Perfiles autorales completos de Adriana Carrillo y Antonella Luna con especialidades y enlaces directos de agendamiento.
* **`/galeria`** (`#/galeria`): Portafolio con metadatos de obras (*Fine Line*, *Handpoke*, *Microrealismo*, *Botánico*, *Blackwork*, *Puntillismo*), filtros y modal de detalle.
* **`/talleres`** (`#/talleres`): Catálogo dinámico con lógica de cupos automáticos (**`AGOTADO`** vs cupos restantes) e inscripción con comprobante vía WhatsApp.
* **`/reservas`** (`#/reservas`): Flujo de agendamiento en 3 pasos con validación en tiempo real y modal con enlace directo a WhatsApp del estudio.
* **`/admin`** (`#/admin`): Panel privado protegido para las dueñas (Adriana y Antonella) con métricas en tiempo real, gestión de citas, confirmación por WhatsApp y publicador de talleres y obras.

### Barra de Navegación Flotante y Dock Móvil
* **Cápsula Flotante Editorial:** Barra superior dinámica con efecto *glassmorphism* que destaca visualmente la página activa con píldoras en Azul Marca (`#2756a2`) y un indicador con punto contrastado.
* **Breadcrumb en Vivo:** Chip informativo que muestra la sección en la que se encuentra navegando el usuario (`// PORTADA · ÉTEREA`, `// ARTISTAS RESIDENTES`, etc.).
* **Dock Móvil Inferior:** Barra táctil ergonómica para smartphones que permite navegar entre las 5 secciones públicas.

---

## 🌿 2. Banner Principal Full Viewport (Hero) & El Hook

* **Fondo Full Viewport:**  
  Imagen de alta resolución de estudio y arte en piel (`https://images.pexels.com/photos/4273369/pexels-photo-4273369.jpeg`) abarcando el 100% de la altura de pantalla (`100vh`) con overlay editorial en degradado azul profundo y calma visual.
* **Tipografía Editorial:**  
  * Subtítulo superior sutil: `Éterea Tattoo Studio · Adriana Carrillo & Antonella Luna`
  * Título principal: `Un lugar para volver a ti.`
  * Descripción editorial concisa con la visión del estudio.
* **Llamados a la Acción (CTA):**  
  * **"Explorar Portafolio"** (enlace directo a `#/galeria`).  
  * **"Agendar Experiencia"** (enlace directo a `#/reservas`).  
* **Reubicación de Métricas ("El Hook"):**  
  Tarjetas flotantes ubicadas estratégicamente tras el Hero como gancho de confianza:
  1. **2 Artistas:** Fundadoras residentes Adriana Carrillo & Antonella Luna.
  2. **+1,400 Obras:** Fine Line, microrealismo botánico y piezas blackwork exclusivas.
  3. **100% Asepsia Quirúrgica:** Protocolo sanitario hospitalario y material desechable.
  4. **4.9 / 5.0:** Calificación de experiencia y calma en sesión.

---

## 🎨 3. Estructura de Metadatos de Obras (Galería & Base de Datos)

Tanto la interfaz visual como el esquema de base de datos (`supabase-schema.sql` y `InkBookDB`) incorporan la estructura requerida para cada obra:

1. **Fotografía de la Obra:** Soporte para URLs externas y formatos ligeros (< 1MB) con renderizado adaptable.
2. **Nombre de la Obra:** Título autoral visible en tarjeta y modal.
3. **Descripción Corta:** Concepto botánico o técnico de la pieza, visible en la cuadrícula y en el modal de detalle.
4. **Distintivo de Artista Creadora:** Badge que distingue a `Adriana Carrillo` o `Antonella Luna`.
5. **Categoría o Técnica Aplicada:** Clasificación por *Fine Line*, *Handpoke*, *Microrealismo*, *Botánico*, *Blackwork* o *Puntillismo*.
6. **Formulario de Publicación en Admin:** Permite a las dueñas subir nuevas obras con título, artista, categoría, descripción corta y URL de fotografía, actualizando la galería inmediatamente.

---

## 🛡️ 4. Paleta Oficial y Logotipo Vectorial

* **Fondo Base (Beige Crema):** `#f0e9cf`
* **Color Primario (Azul Marca):** `#2756a2`
* **Azul Profundo de Contraste:** `#1b3f7a`
* **Tarjetas:** `#fbf8ef` y `#ffffff`
* **Logotipo Oficial:** Vector SVG exacto extraído de `Colores Eterea.ai`, con la tipografía serif elegante "éterea", la estrella de cuatro puntas sobre la "a" y la leyenda "TATTOO STUDIO" en Azul Marca `#2756a2`.

---

## 🚀 5. Instrucciones de Prueba

1. Abre el archivo [`index.html`](index.html) directamente en cualquier navegador moderno.
2. Navega entre las píldoras del menú: cada sección cargará su vista independiente sin arrastre vertical de scroll.
3. En la sección **Galería**, filtra por artista o por técnica (*Handpoke*, *Botánico*, etc.) y haz clic en cualquier obra para abrir el modal con sus metadatos completos y botón directo para agendar.
4. En la sección **Talleres**, comprueba el control dinámico de cupos y el registro con comprobante para WhatsApp.
5. Haz clic en **"Dueñas"** en la barra superior o ve a `#/admin`:
   * Pulsa *"⚡ Autocompletar credenciales demo"* (`admin@eterea.com` / `eterea2025`).
   * Explora la gestión de citas en vivo, confirmación por WhatsApp y los publicadores inmediatos de obras y talleres.

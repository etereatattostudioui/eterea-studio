-- ========================================================
-- ETÉREA TATTOO STUDIO / INKBOOK - SCHEMA SQL PARA SUPABASE
-- Base de datos completa para Citas, Talleres, Inscripciones y Galería
-- ========================================================

-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA: CITAS (Reservas de Tatuajes)
CREATE TABLE IF NOT EXISTS citas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_cliente VARCHAR(150) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(150),
    estilo_tatuaje VARCHAR(100) NOT NULL,
    zona_cuerpo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    artista_asignada VARCHAR(100) NOT NULL, -- 'Adriana Carrillo' o 'Luna'
    fecha_cita DATE NOT NULL,
    hora_cita TIME NOT NULL,
    estado VARCHAR(30) DEFAULT 'Pendiente', -- 'Pendiente', 'Confirmada', 'Cancelada'
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABLA: TALLERES (Workshops Temporales)
CREATE TABLE IF NOT EXISTS talleres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    fecha_evento DATE NOT NULL,
    ubicacion VARCHAR(200) NOT NULL,
    image_url TEXT,
    cupos INTEGER NOT NULL DEFAULT 10,
    cupos_disponibles INTEGER NOT NULL DEFAULT 10,
    estado VARCHAR(30) DEFAULT 'Activo', -- 'Activo', 'Agotado', 'Finalizado'
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABLA: INSCRIPCIONES A TALLERES
CREATE TABLE IF NOT EXISTS inscripciones_talleres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_taller UUID REFERENCES talleres(id) ON DELETE CASCADE,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABLA: PORTAFOLIO / GALERÍA
CREATE TABLE IF NOT EXISTS galeria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    artista VARCHAR(100) NOT NULL, -- 'Adriana Carrillo' o 'Luna'
    categoria VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================================
-- POLÍTICAS DE ACCESO (Row Level Security - RLS)
-- Permite que tu web pueda leer y registrar citas/talleres sin errores de bloqueo
-- ========================================================

ALTER TABLE citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE talleres ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscripciones_talleres ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;

-- Políticas para citas
DROP POLICY IF EXISTS "Permitir todo a citas" ON citas;
CREATE POLICY "Permitir todo a citas" ON citas FOR ALL USING (true) WITH CHECK (true);

-- Políticas para talleres
DROP POLICY IF EXISTS "Permitir todo a talleres" ON talleres;
CREATE POLICY "Permitir todo a talleres" ON talleres FOR ALL USING (true) WITH CHECK (true);

-- Políticas para inscripciones_talleres
DROP POLICY IF EXISTS "Permitir todo a inscripciones" ON inscripciones_talleres;
CREATE POLICY "Permitir todo a inscripciones" ON inscripciones_talleres FOR ALL USING (true) WITH CHECK (true);

-- Políticas para galeria
DROP POLICY IF EXISTS "Permitir todo a galeria" ON galeria;
CREATE POLICY "Permitir todo a galeria" ON galeria FOR ALL USING (true) WITH CHECK (true);

-- ========================================================
-- DATOS SEMILLA INICIALES (SEED DATA)
-- ========================================================

-- Obras iniciales de Galería
INSERT INTO galeria (title, description, artista, categoria, image_url) VALUES
('Metamorfosis Nocturna', 'Composición botánica y geométrica en negro de humo puro, explorando la transición entre luz y sombra en piel viva.', 'Adriana Carrillo', 'Black Ilustrativo', 'TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/1388D705-26A6-4A0A-A2E8-E0CA7CEF298B.JPG.jpeg'),
('Esfinge Lunar & Filigrana', 'Técnica de blackwork ilustrativo con gradaciones de gris mineral y remates de micro-línea botánica.', 'Adriana Carrillo', 'Black Ilustrativo', 'TRABAJOS%20ADRI/BLACK%20ILUSTRATIVO/73A414CA-B86C-489B-A0DA-08D2630D9B39.PNG'),
('Micro serpiente alquímica', 'Pieza de microrealismo con escamas detalladas y textura de sombra suave.', 'Luna', 'Puntillismo Punto por Punto', 'TRABAJOS%20LUNA/PUNTILLISMO%20PUNTO%20POR%20PUNTO/igexport-C-3w9GfOHhI.jpg'),
('Polilla Nocturna Ornamental', 'Contraste negro profundo, simetría anatómica e inspiración mística.', 'Luna', 'Puntillismo de Arrastre', 'TRABAJOS%20LUNA/PUNTILLISMO%20DE%20ARRASTRE/igexport-C6fVbFmO9hY.jpg')
ON CONFLICT DO NOTHING;

-- Talleres iniciales
INSERT INTO talleres (titulo, description, price, fecha_evento, ubicacion, image_url, cupos, cupos_disponibles, estado) VALUES
('Workshop Etérea: Prácticas de Pulso & Tatuaje en Vivo', 'Workshop intensivo con dinámicas de pulso, ejercicios de saturación en piel sintética y protocolos clínicos.', 140.00, '2026-08-08', 'Estudio Etérea - Taller Principal', 'Fotos%20Talleres/igexport-DTyuavMjQ7F.jpg', 6, 0, 'Agotado')
ON CONFLICT DO NOTHING;

-- Citas de prueba
INSERT INTO citas (nombre_cliente, telefono, correo, estilo_tatuaje, zona_cuerpo, descripcion, artista_asignada, fecha_cita, hora_cita, estado) VALUES
('Camila Morales', '+593984123456', 'camila.morales@gmail.com', 'Fine Line', 'Antebrazo interno', 'Flor de loto con detalles geométricos de 8 cm con líneas sutiles y puntillismo tenue.', 'Adriana Carrillo', '2026-11-04', '15:00', 'Pendiente'),
('Mateo Velasco', '+593991234888', 'mateo.v@outlook.com', 'Puntillismo', 'Costillas', 'Cuervo en vuelo con degradado sólido y texturas punteadas de 15 cm.', 'Luna', '2026-11-06', '11:00', 'Confirmada')
ON CONFLICT DO NOTHING;

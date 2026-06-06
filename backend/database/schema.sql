-- BASE DE DATOS NEON
-- 1. HABILITAR EXTENSIÓN DE INTELIGENCIA ARTIFICIAL
-- Esto permite el uso del tipo de dato VECTOR en Neon para búsquedas de similitud (RAG)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. MÓDULO DE PERSONAL Y ROLES
CREATE TABLE rol_sistema (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

CREATE TABLE empleado (
    id_empleado SERIAL PRIMARY KEY,
    id_rol INT REFERENCES rol_sistema(id_rol),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(8) UNIQUE NOT NULL,
    correo_corporativo VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    fecha_contratacion DATE,
    estado VARCHAR(20) DEFAULT 'Activo'
);

CREATE TABLE usuario_credencial (
    id_usuario SERIAL PRIMARY KEY,
    id_empleado INT REFERENCES empleado(id_empleado) ON DELETE CASCADE,
    password_hash VARCHAR(255) NOT NULL,
    token_sesion VARCHAR(255),
    ultimo_acceso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. MÓDULO DE CLIENTES Y EXPEDIENTES (CORE BUSINESS)
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    tipo_cliente VARCHAR(20) NOT NULL, -- 'Natural' o 'Juridico'
    nombre_razon_social VARCHAR(200) NOT NULL,
    identificador_fiscal VARCHAR(11) UNIQUE NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    direccion TEXT
);

CREATE TABLE caso_legal (
    id_caso SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES cliente(id_cliente),
    id_empleado_responsable INT REFERENCES empleado(id_empleado),
    numero_expediente_judicial VARCHAR(50),
    titulo_caso VARCHAR(200) NOT NULL,
    descripcion_hechos TEXT NOT NULL,
    materia VARCHAR(50), -- Ej: Civil, Penal
    estado VARCHAR(30) DEFAULT 'Abierto',
    fecha_apertura DATE DEFAULT CURRENT_DATE,
    
    -- NUEVOS CAMPOS ESTRATÉGICOS (Notas de Clase)
    juzgado_asignado VARCHAR(100), -- Para contexto del Prompt
    juez_encargado VARCHAR(100),   -- Para contexto del Prompt
    resumen_cliente_ia VARCHAR(500) -- Versión filtrada para el Portal del Cliente
);

-- 4. PORTAL DEL CLIENTE (TRAZABILIDAD Y SOPORTE)
CREATE TABLE interaccion_cliente_ia (
    id_interaccion SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES cliente(id_cliente),
    id_caso INT REFERENCES caso_legal(id_caso), -- Opcional, si la pregunta es sobre un caso específico
    pregunta_cliente TEXT NOT NULL,
    respuesta_ia TEXT NOT NULL,
    fecha_interaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. MÓDULO LEGALTECH: BASE DE CONOCIMIENTO Y RAG
CREATE TABLE documento_adjunto (
    id_documento SERIAL PRIMARY KEY,
    id_caso INT REFERENCES caso_legal(id_caso), -- Puede ser NULL si es jurisprudencia general
    id_empleado_creador INT REFERENCES empleado(id_empleado),
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_almacenamiento_cloud VARCHAR(500) NOT NULL, -- URL del bucket de Storage
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LA TABLA MÁS IMPORTANTE PARA LA IA (Soluciona la Amnesia de RAG)
-- Alternativa de la tabla (solo si n8n es estricto con los nombres de las columnas):
CREATE TABLE fragmento_documento (
    id SERIAL PRIMARY KEY,
    id_documento INT REFERENCES documento_adjunto(id_documento) ON DELETE CASCADE,
    text TEXT NOT NULL,
    embedding VECTOR(3072),
    metadata JSONB
);

-- 6. MÓDULO DE RESULTADOS Y ESTRATEGIA
CREATE TABLE estrategia_ia (
    id_estrategia SERIAL PRIMARY KEY,
    id_caso INT REFERENCES caso_legal(id_caso) ON DELETE CASCADE,
    id_empleado_solicitante INT REFERENCES empleado(id_empleado),
    lineas_investigacion_sugeridas TEXT,
    precedentes_encontrados JSONB, -- Ideal para guardar la lista de documentos vinculados
    porcentaje_viabilidad DECIMAL(5,2),
    borrador_documento_generado TEXT,
    fecha_ejecucion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. ÍNDICE DE SIMILITUD (OPTIMIZACIÓN DE VELOCIDAD)
-- Esto asegura que buscar entre miles de PDFs tome milisegundos y no minutos.
CREATE INDEX ON fragmento_documento USING hnsw (embedding_chunk vector_cosine_ops);
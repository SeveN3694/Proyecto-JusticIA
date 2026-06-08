from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Importar nuestros servicios de IA (se implementarán en los próximos pasos)
from services.MotorBusqueda import MotorBusquedaLegal
from services.ValoradorJuridico import ValoradorJuridico
from services.ProcesadorPDF import ProcesadorPDF
import shutil
import psycopg

def limpiar_db_url(db_url: str) -> str:
    """Limpia y prepara la URL de conexión a Neon DB para psycopg."""
    if not db_url:
        return db_url
        
    import urllib.parse
    parsed = urllib.parse.urlsplit(db_url)
    qs = urllib.parse.parse_qs(parsed.query)
    
    # 1. Eliminar channel_binding que rompe psycopg
    qs.pop('channel_binding', None)
    
    # 2. Agregar endpoint ID si no existe y es una URL de Neon (para SNI routing fallback)
    if 'neon.tech' in parsed.netloc and 'options' not in qs:
        try:
            # parsed.netloc = user:pass@ep-cool-thunder-abhtcfno-pooler.eu-west-2...
            host = parsed.netloc.split('@')[-1].split(':')[0]
            endpoint_id = host.split('.')[0] # NO quitar '-pooler'
            qs['options'] = [f"endpoint={endpoint_id}"]
        except Exception as e:
            print(f"Advertencia: No se pudo extraer el endpoint_id: {e}")
            
    # 3. Asegurar que tenga sslmode=require
    if 'sslmode' not in qs:
        qs['sslmode'] = ['require']
        
    new_query = urllib.parse.urlencode(qs, doseq=True)
    return urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, parsed.path, new_query, parsed.fragment))

load_dotenv()

app = FastAPI(
    title="JusticIA / JusticIA Backend",
    description="Motor RAG y API para Estrategia Legal",
    version="1.0.0"
)

# Configurar CORS para permitir solicitudes desde el frontend en React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción, cambia esto al dominio de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar servicios
motor_busqueda = MotorBusquedaLegal()
valorador = ValoradorJuridico()

# Modelos de Pydantic para validar entradas
class ConsultaEstrategia(BaseModel):
    id_caso: int
    descripcion_hechos: str
    id_empleado_solicitante: int

class EstrategiaResponse(BaseModel):
    borrador_generado: str
    precedentes_usados: list
    porcentaje_viabilidad: float

class ChatCliente(BaseModel):
    pregunta: str
    id_caso: int
    id_cliente: int

@app.get("/")
def read_root():
    return {"status": "ok", "message": "API de JusticIA en línea"}

@app.post("/api/ia/estrategia", response_model=EstrategiaResponse)
async def generar_estrategia_legal(consulta: ConsultaEstrategia):
    """
    Endpoint principal para el flujo RAG.
    1. Busca jurisprudencia similar en Neon.
    2. Genera estrategia con Gemini.
    """
    try:
        # 1. Recuperación (Retrieval) - Modo Local (DESACTIVADO TEMPORALMENTE POR CUOTA)
        try:
            # resultados_rag = motor_busqueda.buscar_similitud(consulta.descripcion_hechos, limite=5)
            # Para evitar el retraso de 40s por la cuota agotada, forzamos el modo Web/Conocimiento Interno:
            print("Saltando búsqueda local por cuota agotada. Usando memoria interna de Gemini...")
            resultados_rag = []
        except Exception as rag_error:
            print(f"Búsqueda vectorial local falló (se usará modo Web): {rag_error}")
            resultados_rag = []
        
        # 2. Generación Aumentada o Web Search (Augmented Generation / Web Grounding)
        estrategia = valorador.generar_estrategia(
            hechos=consulta.descripcion_hechos,
            contexto_legal=resultados_rag
        )
        
        # Opcional: Aquí podrías guardar la estrategia generada en la tabla `estrategia_ia`
        
        return {
            "borrador_generado": estrategia.get("texto_estrategia", "No se pudo generar"),
            "precedentes_usados": resultados_rag,
            "porcentaje_viabilidad": estrategia.get("viabilidad", 0.0)
        }
    except Exception as e:
        print(f"Error generando estrategia: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/documentos/upload")
async def subir_documento(file: UploadFile = File(...), id_empleado: int = Form(1)):
    """
    Recibe un PDF desde el Frontend, extrae su texto, lo divide en chunks,
    genera vectores con Gemini y lo guarda en Neon (Paso 1 del pipeline RAG).
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF")
        
    try:
        # 1. Guardar temporalmente
        temp_file = f"temp_{file.filename}"
        with open(temp_file, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # 2. Procesar (Extraer y Chunking)
        procesador = ProcesadorPDF()
        texto_pdf = procesador.extraer_texto(temp_file)
        chunks = procesador.crear_chunks(texto_pdf)
        
        # Límite para desarrollo: Extraer solo los primeros 3 fragmentos (aprox. 1-2 páginas)
        # Esto previene que PDFs de 13MB tomen demasiado tiempo y agoten el límite de la API
        max_chunks = 3
        if len(chunks) > max_chunks:
            chunks = chunks[:max_chunks]
        
        # 3. Eliminar temporal
        os.remove(temp_file)
        
        if not chunks:
            raise HTTPException(status_code=400, detail="No se pudo extraer texto del PDF")
            
        # 4. Conectar a BD e insertar documento_adjunto
        db_url = os.getenv("NEON_DATABASE_URL")
        
        # Limpiador de URL para compatibilidad entre Neon DB y psycopg
        db_url = limpiar_db_url(db_url)

        conn = psycopg.connect(db_url)
        cursor = conn.cursor()
        
        cursor.execute(
            """
            INSERT INTO documento_adjunto (id_empleado_creador, nombre_archivo, ruta_almacenamiento_cloud)
            VALUES (%s, %s, %s) RETURNING id_documento;
            """,
            (id_empleado, file.filename, "upload_frontend")
        )
        id_documento = cursor.fetchone()[0]
        
        # 5. Insertar vectores uno por uno con retraso para evadir el Rate Limit (15 RPM)
        import time
        for i, chunk in enumerate(chunks):
            # Dormir 4.5 segundos asegura un máximo de ~13 peticiones por minuto
            if i > 0:
                time.sleep(4.5)
                
            vector = motor_busqueda._generar_embedding(chunk)
            vector_str = f"[{','.join(map(str, vector))}]"
            
            cursor.execute(
                """
                INSERT INTO fragmento_documento (id_documento, text, embedding, metadata)
                VALUES (%s, %s, %s::vector, %s);
                """,
                (id_documento, chunk, vector_str, psycopg.types.json.Jsonb({'source': file.filename, 'chunk_index': i}))
            )
            
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"status": "success", "message": f"Documento procesado: {len(chunks)} fragmentos vectorizados."}
        
    except Exception as e:
        print(f"Error procesando documento: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ia/chat")
async def chat_cliente(consulta: ChatCliente):
    """
    Endpoint para responder las dudas del cliente sobre su caso.
    """
    try:
        # En una versión completa, se buscaría el contexto del caso específico en la BD
        # Para la demo, usamos Gemini directamente para responder como asistente legal
        modelo = valorador.modelo
        prompt = f"""
        Eres el asistente legal de élite de la plataforma JusticIA.
        Estás hablando con un cliente sobre su caso legal (ID: {consulta.id_caso}).
        Responde a su pregunta de manera extremadamente profesional, empática y en lenguaje sencillo pero con autoridad.
        Utiliza formato Markdown (como negritas, listas o títulos si es necesario) para estructurar tu respuesta.
        
        PREGUNTA DEL CLIENTE:
        {consulta.pregunta}
        """
        response = modelo.generate_content(prompt)
        
        return {"respuesta": response.text}
    except Exception as e:
        print(f"Error en chat cliente: {e}")
        raise HTTPException(status_code=500, detail="No se pudo procesar la consulta")


import os
import psycopg
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class MotorBusquedaLegal:
    def __init__(self):
        # Configurar la base de datos Neon
        self.db_url = os.getenv("NEON_DATABASE_URL")
        
        # Configurar Gemini
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.embedding_model = "models/gemini-embedding-2"
        
    def _get_db_connection(self):
        """Crea y retorna una conexión a la base de datos PostgreSQL en Neon"""
        try:
            db_url = self.db_url
            if db_url:
                import urllib.parse
                parsed = urllib.parse.urlsplit(db_url)
                qs = urllib.parse.parse_qs(parsed.query)
                qs.pop('channel_binding', None)
                if 'neon.tech' in parsed.netloc and 'options' not in qs:
                    try:
                        host = parsed.netloc.split('@')[-1].split(':')[0]
                        endpoint_id = host.split('.')[0] # NO quitar '-pooler'
                        qs['options'] = [f"endpoint={endpoint_id}"]
                    except Exception:
                        pass
                if 'sslmode' not in qs:
                    qs['sslmode'] = ['require']
                new_query = urllib.parse.urlencode(qs, doseq=True)
                db_url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, parsed.path, new_query, parsed.fragment))
            return psycopg.connect(db_url)
        except Exception as e:
            print(f"Error conectando a la base de datos Neon: {e}")
            raise e

    def _generar_embedding(self, texto: str) -> list[float]:
        """Convierte texto en un vector usando Google Gemini"""
        import time
        max_retries = 3
        for attempt in range(max_retries):
            try:
                result = genai.embed_content(
                    model=self.embedding_model,
                    content=texto,
                    task_type="retrieval_query",
                )
                return result['embedding']
            except Exception as e:
                if "429" in str(e) and attempt < max_retries - 1:
                    print(f" [Rate limit detectado, esperando 20s...] ", end="", flush=True)
                    time.sleep(20)
                else:
                    print(f"Error generando embedding con Gemini: {e}")
                    raise e

    def generar_embedding_batch(self, textos: list[str]) -> list[list[float]]:
        """Convierte una lista de textos en vectores en una sola llamada para evitar Rate Limits"""
        if not textos:
            return []
        try:
            # Pide a la API de Gemini que procese toda la lista de un solo golpe
            result = genai.embed_content(
                model=self.embedding_model,
                content=textos,
                task_type="retrieval_document",
            )
            return result['embedding']
        except Exception as e:
            print(f"Error generando embedding batch con Gemini: {e}")
            raise e

    def buscar_similitud(self, hechos_caso: str, limite: int = 5) -> list[dict]:
        """
        Toma los hechos del caso, los vectoriza y busca en Neon (pgvector)
        los fragmentos de documentos más relevantes (jurisprudencia, leyes).
        """
        # 1. Convertir la consulta en vector
        vector_consulta = self._generar_embedding(hechos_caso)
        
        # 2. Conectar a Neon y ejecutar búsqueda por similitud de coseno (<=>)
        conn = self._get_db_connection()
        cursor = conn.cursor()
        
        # Consulta SQL pura para pgvector adaptada a n8n
        query = """
            SELECT 
                f.id,
                f.text,
                f.metadata,
                d.nombre_archivo,
                1 - (f.embedding <=> %s::vector) AS similitud
            FROM 
                fragmento_documento f
            LEFT JOIN 
                documento_adjunto d ON f.id_documento = d.id_documento
            ORDER BY 
                f.embedding <=> %s::vector
            LIMIT %s;
        """
        
        # Formatear el vector para pgvector: '[0.1, 0.2, ...]'
        vector_str = f"[{','.join(map(str, vector_consulta))}]"
        
        try:
            cursor.execute(query, (vector_str, vector_str, limite))
            resultados = cursor.fetchall()
            
            # Formatear resultados
            documentos_relevantes = []
            for row in resultados:
                metadata = row[2] or {}
                # Si el documento se subió por n8n, el nombre de archivo y página pueden estar en el JSON metadata
                archivo_n8n = metadata.get('source', metadata.get('file_name', 'Documento Base'))
                pagina_n8n = metadata.get('page', metadata.get('loc', {}).get('pageNumber', 'N/A'))
                
                documentos_relevantes.append({
                    "id_fragmento": row[0],
                    "texto": row[1],
                    "pagina": pagina_n8n,
                    "archivo": row[3] or archivo_n8n,
                    "score_similitud": float(row[4])
                })
                
            return documentos_relevantes
            
        except Exception as e:
            print(f"Error en búsqueda vectorial: {e}")
            raise e
        finally:
            cursor.close()
            conn.close()

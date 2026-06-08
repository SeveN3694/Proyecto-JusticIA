import fitz  # PyMuPDF
import re

class ProcesadorPDF:
    def __init__(self, chunk_size=1000, overlap=200):
        """
        Inicializa el procesador de PDFs.
        :param chunk_size: Cantidad de caracteres aproximados por chunk.
        :param overlap: Cantidad de caracteres que se superponen entre chunks para no perder contexto.
        """
        self.chunk_size = chunk_size
        self.overlap = overlap

    def extraer_texto(self, ruta_archivo: str) -> str:
        """
        Lee un PDF y extrae todo su texto limpio.
        """
        texto_completo = ""
        try:
            documento = fitz.open(ruta_archivo)
            for pagina in documento:
                # Extrae texto de cada página
                texto_pagina = pagina.get_text()
                # Limpieza básica de saltos de línea innecesarios
                texto_pagina = re.sub(r'\n+', '\n', texto_pagina)
                texto_completo += texto_pagina + "\n"
            
            documento.close()
            return texto_completo
        except Exception as e:
            print(f"Error al procesar el PDF {ruta_archivo}: {e}")
            return ""

    def crear_chunks(self, texto: str) -> list[str]:
        """
        Divide un texto largo en fragmentos (chunks) más pequeños con superposición.
        Ideal para no sobrepasar los límites de los LLM y tener vectores precisos.
        """
        if not texto:
            return []
            
        chunks = []
        inicio = 0
        longitud_texto = len(texto)

        while inicio < longitud_texto:
            # Encontrar el final del chunk
            fin = inicio + self.chunk_size
            
            # Si no es el final del texto, intentar cortar en un punto limpio (un salto de línea o punto)
            if fin < longitud_texto:
                # Buscar el último salto de línea o punto dentro de un margen razonable hacia atrás
                margen_busqueda = texto[inicio:fin]
                ultimo_punto = margen_busqueda.rfind('.')
                ultimo_salto = margen_busqueda.rfind('\n')
                
                punto_corte = max(ultimo_punto, ultimo_salto)
                if punto_corte > (self.chunk_size * 0.7): # Solo cortar si encontramos un punto más allá del 70% del chunk
                    fin = inicio + punto_corte + 1

            chunk = texto[inicio:fin].strip()
            if chunk:
                chunks.append(chunk)
            
            # Avanzar, restando el overlap para superponer contexto
            inicio = fin - self.overlap

        return chunks

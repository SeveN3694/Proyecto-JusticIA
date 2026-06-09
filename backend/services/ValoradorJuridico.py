import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()

class ValoradorJuridico:
    def __init__(self):
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        # Usaremos Gemini Flash Latest
        self.modelo = genai.GenerativeModel('gemini-flash-latest')
        
    def _construir_prompt(self, hechos: str, contexto_legal: list[dict]) -> str:
        """Construye el prompt maestro inyectando los documentos recuperados por RAG"""
        
        contexto_str = ""
        for i, doc in enumerate(contexto_legal):
            contexto_str += f"\\n--- Documento {i+1} (Archivo: {doc['archivo']}, Pág: {doc['pagina']}) ---\\n"
            contexto_str += f"{doc['texto']}\\n"
            
        prompt = f"""
        Eres "JusticIA", el asistente legal de IA experto de la firma de abogados JusticIA.
        Tu tarea es analizar los hechos de un caso legal y formular una estrategia jurídica sólida
        basada ÚNICAMENTE en la jurisprudencia y documentos de referencia proporcionados.
        
        HECHOS DEL CASO:
        {hechos}
        
        BASE DE CONOCIMIENTO (JURISPRUDENCIA Y DOCUMENTOS):
        {contexto_str if contexto_str else "No se encontraron documentos relevantes."}
        
        INSTRUCCIONES:
        1. Analiza los hechos frente a la base de conocimiento local (si existe).
        2. IMPORTANTE: Si la Base de Conocimiento local está vacía, utiliza tu vasto conocimiento interno del Código Civil, Código Penal del Perú y la jurisprudencia peruana para redactar la estrategia, como un abogado experto.
        3. Redacta una "Estrategia Legal Recomendada" en formato Markdown.
        4. Identifica "Líneas de Investigación" clave.
        5. IMPORTANTE: Sugiere exactamente 3 hitos procesales clave para el Calendario (ej. "Día 15: Vencimiento de apelación").
        6. Calcula un porcentaje estimado de viabilidad matemática (0 a 100) basado en tu análisis legal.
        
        Responde DIRECTAMENTE en formato Markdown con tu estrategia.
        AL FINAL de tu respuesta, en la última línea, debes incluir OBLIGATORIAMENTE el porcentaje de viabilidad y los hitos en este formato exacto JSON (sin tildes en las claves):
        [DATA: {{"viabilidad": 85.5, "hitos": ["Hito 1", "Hito 2", "Hito 3"]}}]
        """
        return prompt

    def generar_estrategia(self, hechos: str, contexto_legal: list[dict]) -> dict:
        """
        Llama al LLM (Gemini) con el contexto RAG para generar la estrategia final.
        """
        prompt = self._construir_prompt(hechos, contexto_legal)
        
        try:
            response = self.modelo.generate_content(prompt)
            texto_respuesta = response.text
            
            import re
            import json
            
            # Buscar el bloque JSON al final del texto
            match = re.search(r'\[DATA:\s*(\{.*?\})\s*\]', texto_respuesta)
            if match:
                try:
                    data_extraida = json.loads(match.group(1))
                    viabilidad_val = float(data_extraida.get("viabilidad", 0.0))
                    hitos_val = data_extraida.get("hitos", [])
                except Exception:
                    viabilidad_val = 0.0
                    hitos_val = []
                texto_estrategia = texto_respuesta[:match.start()].strip()
            else:
                viabilidad_val = 0.0
                hitos_val = []
                texto_estrategia = texto_respuesta.strip()

            return {
                "texto_estrategia": texto_estrategia,
                "viabilidad": viabilidad_val,
                "hitos_sugeridos": hitos_val
            }
                
        except Exception as e:
            print(f"Error generando estrategia con Gemini LLM: {e}")
            raise e

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
        5. Calcula un porcentaje estimado de viabilidad matemática (0 a 100) basado en tu análisis legal.
        
        Responde DIRECTAMENTE en formato Markdown con tu estrategia.
        AL FINAL de tu respuesta, en la última línea, debes incluir OBLIGATORIAMENTE el porcentaje de viabilidad en este formato exacto:
        [VIABILIDAD: 85.5]
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
            
            # Buscar la viabilidad al final del texto
            match = re.search(r'\[VIABILIDAD:\s*([\d\.]+)\]', texto_respuesta)
            if match:
                viabilidad_val = float(match.group(1))
                texto_estrategia = texto_respuesta[:match.start()].strip()
            else:
                viabilidad_val = 0.0
                texto_estrategia = texto_respuesta.strip()

            return {
                "texto_estrategia": texto_estrategia,
                "viabilidad": viabilidad_val
            }
                
        except Exception as e:
            print(f"Error generando estrategia con Gemini LLM: {e}")
            raise e

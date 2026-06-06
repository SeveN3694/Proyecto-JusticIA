import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()

class ValoradorJuridico:
    def __init__(self):
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        # Gemini 1.5 Flash es ideal para tareas de razonamiento rápido y RAG
        self.modelo = genai.GenerativeModel('gemini-1.5-flash')
        
    def _construir_prompt(self, hechos: str, contexto_legal: list[dict]) -> str:
        """Construye el prompt maestro inyectando los documentos recuperados por RAG"""
        
        contexto_str = ""
        for i, doc in enumerate(contexto_legal):
            contexto_str += f"\\n--- Documento {i+1} (Archivo: {doc['archivo']}, Pág: {doc['pagina']}) ---\\n"
            contexto_str += f"{doc['texto']}\\n"
            
        prompt = f"""
        Eres 'CoCounsel', un asistente legal experto de la firma Arxatec/JusticIA.
        Tu tarea es analizar los hechos de un caso legal y formular una estrategia jurídica sólida
        basada ÚNICAMENTE en la jurisprudencia y documentos de referencia proporcionados.
        
        HECHOS DEL CASO:
        {hechos}
        
        BASE DE CONOCIMIENTO (JURISPRUDENCIA Y DOCUMENTOS):
        {contexto_str if contexto_str else "No se encontraron documentos relevantes."}
        
        INSTRUCCIONES:
        1. Analiza los hechos frente a la base de conocimiento.
        2. Redacta una "Estrategia Legal Recomendada" en formato Markdown.
        3. Identifica "Líneas de Investigación" clave.
        4. Calcula un porcentaje estimado de viabilidad matemática (0 a 100) basado en qué tan favorables son los precedentes proporcionados para los hechos descritos.
        
        Responde ESTRICTAMENTE en este formato JSON (sin texto adicional fuera del JSON):
        {{
            "texto_estrategia": "# Estrategia Legal\\n... (tu análisis en markdown)...",
            "viabilidad": 75.5
        }}
        """
        return prompt

    def generar_estrategia(self, hechos: str, contexto_legal: list[dict]) -> dict:
        """
        Llama al LLM (Gemini) con el contexto RAG para generar la estrategia final.
        """
        prompt = self._construir_prompt(hechos, contexto_legal)
        
        try:
            # Generar respuesta
            response = self.modelo.generate_content(prompt)
            texto_respuesta = response.text
            
            # Limpiar posibles delimitadores de código markdown que el LLM suele agregar (```json)
            if texto_respuesta.startswith("```json"):
                texto_respuesta = texto_respuesta[7:]
            if texto_respuesta.startswith("```"):
                texto_respuesta = texto_respuesta[3:]
            if texto_respuesta.endswith("```"):
                texto_respuesta = texto_respuesta[:-3]
                
            # Parsear el JSON
            try:
                resultado = json.loads(texto_respuesta.strip())
                return resultado
            except json.JSONDecodeError:
                # Fallback si el LLM no retorna JSON válido
                return {
                    "texto_estrategia": texto_respuesta,
                    "viabilidad": 0.0
                }
                
        except Exception as e:
            print(f"Error generando estrategia con Gemini LLM: {e}")
            raise e

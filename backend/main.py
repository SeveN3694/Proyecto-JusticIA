from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Importar nuestros servicios de IA (se implementarán en los próximos pasos)
from services.MotorBusqueda import MotorBusquedaLegal
from services.ValoradorJuridico import ValoradorJuridico

load_dotenv()

app = FastAPI(
    title="JusticIA / Arxatec Backend",
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
        # 1. Recuperación (Retrieval)
        resultados_rag = motor_busqueda.buscar_similitud(consulta.descripcion_hechos, limite=5)
        
        # 2. Generación Aumentada (Augmented Generation)
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

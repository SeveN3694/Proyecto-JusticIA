from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

router = APIRouter()

class EventoCalendario(BaseModel):
    id_evento: Optional[str] = None
    id_caso: int
    titulo_evento: str
    fecha_evento: str
    estado: str = "Pendiente"

class RegistroHoras(BaseModel):
    id_caso: int
    cantidad_horas: float
    descripcion_tarea: str
    fecha_registro: Optional[str] = None

# Mock DB para las pruebas locales/UI
MOCK_EVENTOS = [
    EventoCalendario(id_evento="e1", id_caso=1, titulo_evento="Día 1: Ingreso de demanda", fecha_evento="2024-06-05", estado="Completado"),
    EventoCalendario(id_evento="e2", id_caso=1, titulo_evento="Día 15: Presentación de Excepciones", fecha_evento="2024-06-20", estado="Pendiente")
]

MOCK_HORAS = []

@router.get("/calendario/{id_caso}", response_model=List[EventoCalendario])
async def get_eventos(id_caso: int):
    return [e for e in MOCK_EVENTOS if e.id_caso == id_caso]

@router.post("/calendario", response_model=EventoCalendario)
async def crear_evento(evento: EventoCalendario):
    if not evento.id_evento:
        evento.id_evento = str(uuid.uuid4())
    MOCK_EVENTOS.append(evento)
    return evento

@router.put("/calendario/{id_evento}/completar")
async def completar_evento(id_evento: str):
    for e in MOCK_EVENTOS:
        if e.id_evento == id_evento:
            e.estado = "Completado"
            return {"status": "success", "evento": e}
    raise HTTPException(status_code=404, detail="Evento no encontrado")

@router.get("/finanzas/horas/{id_caso}", response_model=List[RegistroHoras])
async def get_horas(id_caso: int):
    return [h for h in MOCK_HORAS if h.id_caso == id_caso]

@router.post("/finanzas/horas", response_model=RegistroHoras)
async def registrar_horas(registro: RegistroHoras):
    if not registro.fecha_registro:
        registro.fecha_registro = datetime.now().isoformat()
    MOCK_HORAS.append(registro)
    return registro

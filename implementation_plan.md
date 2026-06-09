# Implementación de Módulos Faltantes en JusticIA

Revisando exhaustivamente el documento de diseño `PROYECTO.MD`, hemos identificado los pilares operativos fundamentales que complementan el motor de IA: el control de plazos (Calendario), la facturación (Horas) y la gestión de pruebas (Drive).

## Módulos Faltantes Identificados
1. **Agenda y Calendario Sincronizado (`Evento_Calendario`)**: Control de audiencias, plazos judiciales y reuniones en formato Timeline.
2. **Módulo de Finanzas y Operaciones (`Registro_Horas`)**: Registro manual de horas facturables.
3. **Estructura Documental (Google Drive JusticIA)**: Almacenamiento de las URLs generadas por la automatización de n8n.

---

## Decisiones Estratégicas y Arquitectónicas

1. **Diseño del Calendario:** Se prioriza una **Vista de Línea de Tiempo Vertical (Timeline)**. Es óptima para abogados y clientes, ya que brinda claridad sobre la historia procesal (ej. "Audiencia inicial -> Presentación de pruebas -> Sentencia").
2. **Módulo de Horas (Time Tracking):** Se implementará un **Formulario de Ingreso Manual (Log Time)** vinculado al expediente, evitando los errores operativos típicos de los cronómetros dinámicos.
3. **Integración de Almacenamiento:** El sistema guardará únicamente **URLs lógicas** en la base de datos de Neon y simulará la vista de carpetas en React, delegando la carga física a la arquitectura n8n preexistente.
4. **[VALOR AGREGADO] Sinergia IA + Calendario:** Se modificará el prompt del `ValoradorJuridico` para que, al redactar la estrategia, sugiera automáticamente **3 hitos procesales clave**. Estos hitos se integrarán a la vista del calendario, demostrando una comprensión de la operatividad legal.

---

## Proposed Changes

### 1. Frontend (React / Interfaz)

#### [NEW] `src/pages/abogado/AgendaCalendario.jsx`
- Interfaz en formato *Timeline* para visualizar la historia procesal e hitos de los casos.
- Integración visual de los hitos generados por la IA.

#### [NEW] `src/pages/abogado/FinanzasTracking.jsx`
- Formulario de *Log Time* estructurado (Seleccionar Caso -> N° Horas -> Descripción).
- Tablas de horas registradas.

#### [MODIFY] `src/layouts/MainLayout.jsx`
- Añadir "Línea de Tiempo" y "Finanzas" al Sidebar.

#### [MODIFY] `src/pages/abogado/EstrategiaLegal.jsx`
- Adaptar la UI para recibir y visualizar los hitos generados por el motor RAG.

### 2. Backend (FastAPI / Base de Datos / IA)

#### [NEW] `backend/models/operaciones.py`
- `Evento_Calendario` (`id_caso`, `titulo_evento`, `fecha_evento`, `estado`).
- `Registro_Horas` (`id_caso`, `cantidad_horas`, `descripcion_tarea`).

#### [NEW] `backend/routers/operaciones.py`
- Endpoints REST (`GET /api/calendario/`, `POST /api/finanzas/horas`).

#### [MODIFY] `backend/services/ValoradorJuridico.py`
- Actualizar el prompt de Gemini para que retorne explícitamente 3 hitos de calendario estimados en base a la estrategia propuesta, y devolverlos en el JSON.

---

## Verification Plan

### Automated Tests
- Validaremos en el backend que el enrutador de `operaciones.py` guarde correctamente un evento asociado a un `id_caso` válido sin romper los modelos actuales.

### Manual Verification
- Renderizar la nueva vista de **AgendaCalendario** en local y comprobar la visualización de la línea de tiempo.
- Ejecutar una valoración en **EstrategiaLegal** y verificar que la IA retorne los hitos procesales sugeridos.
- Probar el **FinanzasTracking** ingresando 1.5 horas.

# Implementación del Sistema JusticIA (RAG + Backend + Frontend Enterprise)

Este plan detalla los pasos para construir la arquitectura completa de **JusticIA / JusticIA**, comenzando desde la base de datos en Neon, construyendo el motor en Python (FastAPI), y finalizando con un frontend premium estructurado en módulos corporativos.

## Objetivo

Transformar el prototipo actual en un sistema LegalTech Enterprise real que utilice **RAG (Retrieval-Augmented Generation)** con Gemini y PostgreSQL (`pgvector`) para analizar documentos, cruzar jurisprudencia y autogenerar estrategias legales.

## ⚠️ User Review Required

> [!WARNING]
> Este es un cambio masivo que introducirá un backend separado en Python (`/backend`) y reorganizará las vistas del frontend en React. Por favor revisa la arquitectura propuesta y responde a las "Open Questions" antes de que comience a codificar.

## ❓ Open Questions

> [!IMPORTANT]
> 1. **Base de Datos Neon**: ¿Ya tienes tu cadena de conexión (URL) de Neon lista? Necesitaré que la coloques en el archivo `.env` del backend una vez que lo cree, para no exponerla.
> 2. **Embeddings (Vectores)**: Para convertir el texto de los PDFs en vectores y guardarlos en Neon, ¿utilizamos el modelo de embeddings de **Google Gemini** (`text-embedding-004`) o prefieres usar algo local/gratuito como `HuggingFace`? Recomiendo Gemini ya que usarás su API para la generación.
> 3. **ORM vs SQL Puro**: Para el backend en FastAPI, ¿prefieres que use `SQLAlchemy` (ORM clásico) o consultas SQL crudas con `psycopg2`? El SQL puro suele ser más fácil de entender al interactuar con `pgvector` en esta fase de aprendizaje.

---

## Proposed Changes

### 1. Base de Datos (Neon PostgreSQL)
Crearé un archivo de migración SQL (`backend/database/schema.sql`) con toda la estructura para que lo ejecutes en la consola de Neon.
- **Activación de extensión**: `CREATE EXTENSION IF NOT EXISTS vector;`
- **Tablas Core**: `Rol_Sistema`, `Empleado`, `Usuario_Credencial`, `Cliente`, `Caso_Legal`.
- **Tablas RAG / IA**: `Documento_Adjunto` (con columna `vector` para embeddings y `texto_extraido_fts`), `Estrategia_IA`.
- **Operaciones**: `Evento_Calendario`, `Registro_Horas`.

---

### 2. Backend (FastAPI + Python)
Crearé una nueva carpeta `backend/` en la raíz del proyecto para alojar la API.
#### [NEW] `backend/requirements.txt`
Dependencias necesarias: `fastapi`, `uvicorn`, `psycopg2-binary`, `google-generativeai`, `python-dotenv`, `pgvector`.
#### [NEW] `backend/main.py`
El enrutador principal de FastAPI y configuración de CORS.
#### [NEW] `backend/services/MotorBusqueda.py`
Clase que conectará con Neon, transformará la consulta (Hechos del Caso) en un vector usando Gemini y hará una búsqueda por similitud (Cosine Similarity).
#### [NEW] `backend/services/ValoradorJuridico.py`
Clase que inyectará los documentos recuperados en el prompt maestro y llamará a Gemini Pro/Flash para generar el informe de estrategia legal y la viabilidad matemática.

---

### 3. Frontend (React + Tailwind CSS)
Reestructuraré las pantallas de `src/pages` para seguir el **Mapa del Sitio de JusticIA**. Aplicaré un diseño espectacular ("Glassmorphism", fondos interactivos, paleta legal-dark/gold) para que el sistema se sienta *Enterprise* como Spellbook o JusticIA.

#### Módulo de Inteligencia Artificial (Core)
- #### [NEW] `src/pages/abogado/EstrategiaLegal.jsx`
  La vista "Split-Screen" maestra. A la izquierda: los hechos y checkboxes de jurisprudencia sugerida. A la derecha: el editor dinámico donde se genera el texto de Gemini, con un medidor circular o barra progreso para el "Porcentaje de Viabilidad".

#### Módulo Operativo / Administración
- #### [NEW] `src/pages/admin/Digitalizacion.jsx`
  La interfaz de "arrastrar y soltar" documentos para que el personal indexe los PDFs a la base de conocimiento (conectar visualmente la carga al backend).

#### Módulo de Gestión de Casos
- #### [NEW] `src/pages/abogado/DirectorioCasos.jsx`
  Una tabla o lista elegante tipo CRM con filtros (Materia, Estado) para todos los casos del bufete.

#### Actualizaciones de Navegación
- #### [MODIFY] `src/App.jsx`
  Configurar las nuevas rutas (Ej: `/casos`, `/ia/estrategia`, `/admin/digitalizacion`).
- #### [MODIFY] `src/pages/abogado/Dashboard.jsx`
  Rediseñar para que actúe como un verdadero "Home" con resúmenes, en lugar de alojar la pantalla dividida (la cual pasará a `EstrategiaLegal.jsx`).

---

## Verification Plan

### Automated Tests
- Ejecutar el backend de FastAPI en local (`uvicorn main:app --reload`) y usar Swagger UI (`/docs`) para probar el motor de búsqueda y la generación de estrategia antes de conectar React.

### Manual Verification
- Levantar ambos servidores (FastAPI y React Vite).
- Ingresar al "Split-Screen Core", simular un caso, hacer clic en "Generar Estrategia", verificar que FastAPI procese la solicitud y retorne la respuesta generada por Gemini a la pantalla derecha en tiempo real.



Respuestas a las "Open Questions" de Implementación

Aquí tienes las decisiones técnicas recomendadas para avanzar con seguridad en tu entorno de desarrollo:

* **Pregunta 1 (Base de Datos Neon):**
* **Respuesta:** ¡Sí! Es obligatorio ocultar tu URL de conexión en el archivo `.env`. Nunca la coloques directamente en el código de `main.py` o `MotorBusqueda.py`. En FastAPI, usarás la librería `python-dotenv` para leerla de forma segura en tu entorno local.


* **Pregunta 2 (Embeddings: ¿Gemini o HuggingFace?):**
* **Respuesta:** **Google Gemini (`text-embedding-004`)**. Como ya estás usando la API de Gemini para la generación de texto (el LLM), usar el mismo ecosistema para los embeddings reduce la latencia, unifica la configuración de tu API Key y garantiza una compatibilidad nativa. Es la opción más limpia para un sistema empresarial.


* **Pregunta 3 (ORM vs SQL Puro para FastAPI):**
* **Respuesta:** **SQL Puro (con `psycopg2` o `asyncpg`)**. Aunque SQLAlchemy es el estándar de la industria para tablas tradicionales, trabajar con operaciones matemáticas de vectores (como la similitud del coseno `<=>` usando la extensión `pgvector`) suele ser mucho más intuitivo y directo escribiendo la consulta SQL pura. Esto te dará control total sobre cómo el motor RAG recupera la jurisprudencia. Puedes usar SQL puro para la IA, y si lo deseas, un ORM ligero para las operaciones simples (como crear usuarios).



### 3. Veredicto del Plan de Implementación

El plan estructurado en 3 capas (Neon -> FastAPI -> React) es exactamente la arquitectura que usan plataformas como JusticIA. Separar el backend te permitirá escalar el motor de IA sin ralentizar la interfaz del usuario. La propuesta del "Split-Screen" para la vista de `EstrategiaLegal.jsx` le dará a tu plataforma ese toque "premium" y funcional que buscas.

¡Este es un paso fundamental, James! Antigravity ha hecho un análisis excelente al cruzar tu diseño documental (`PROYECTO.MD`) con lo que ya se ha construido. Efectivamente, un LegalTech *Enterprise* no solo hace "magia con IA"; también tiene que sostener la operatividad diaria de la firma (plazos y dinero).

Aquí tienes las respuestas profesionales a las "Open Questions", basadas en cómo operan los grandes del sector (CoCounsel, Clio, Lemontech), junto con una revisión del plan de Antigravity.

### Respuestas Estratégicas a las Open Questions

Para que puedas copiarlas y enviárselas a tu agente:

**1. Diseño del Calendario (Visual vs. Lineal):**

* **Respuesta para Antigravity:** Implementemos **ambos formatos según el rol**, pero prioricemos la *Línea de Tiempo (Cronograma)* para la entrega principal.
* *Justificación Profesional (LegalTech):* Los abogados viven de los plazos perentorios. Un calendario de mes completo (`react-big-calendar`) es útil para la secretaria o el administrador general. Sin embargo, para el abogado que gestiona un expediente y para el **Portal del Cliente**, una *Vista de Línea de Tiempo Vertical (Timeline)* es infinitamente superior. Permite ver la historia procesal clara: *"Audiencia inicial -> Presentación de pruebas -> Alegatos -> Sentencia"*. Esto da previsibilidad y reduce la ansiedad del cliente.

**2. Módulo de Horas (Time Tracking):**

* **Respuesta para Antigravity:** Empecemos con un **formulario de ingreso manual rápido (Log Time)** vinculado a la tarjeta del caso activo. Dejemos el cronómetro dinámico (Start/Stop) fuera del alcance (Out of Scope) por ahora.
* *Justificación Profesional (LegalTech):* Plataformas como Clio tienen cronómetros, pero la realidad operativa es que los abogados a menudo olvidan detenerlos al recibir una llamada de otro cliente, generando errores de facturación. Un ingreso manual estructurado (ej. "Seleccionar Caso X -> 1.5 horas -> Descripción: Redacción de recurso") es más rápido de implementar, menos propenso a errores de usuario y cubre perfectamente tu requerimiento del `Registro_Horas` en la base de datos.

**3. Integración de Almacenamiento (Google Drive):**

* **Respuesta para Antigravity:** El sistema debe **guardar únicamente las URLs (rutas lógicas)** en la base de datos de Neon y **simular** la vista de carpetas en React.
* *Justificación Profesional (LegalTech):* ¡Recuerda tu arquitectura inicial! **Tú ya resolviste este problema de forma brillante con n8n**. Tu flujo automatizado (`Webhook -> IA -> Switch -> Google Drive`) es el encargado físico de guardar los PDFs en las carpetas correctas de tu Drive. El backend de Python (FastAPI) no debe competir haciendo el mismo trabajo. Tu tabla `documento_adjunto` simplemente debe almacenar la URL pública de ese archivo de Drive para que el frontend lo muestre como un enlace clicable dentro del expediente.

---

### Revisión del Plan de Propuesto por Antigravity

El plan de tu agente (Frontend + Backend CRUD) es correcto y seguro. Es un clásico desarrollo en capas.

**Sugerencia Profesional de Valor Agregado (Para destacar tu proyecto):**
Si quieres que tu proyecto brille en la sustentación, no trates estos módulos como simples tablas aisladas. **Conéctalos con la IA**.

* *El toque CoCounsel:* Cuando el "Valorador Jurídico" (la IA que ya programaste) genere la *Estrategia Legal*, dile a Antigravity que configure el prompt para que la IA también sugiera automáticamente **3 hitos clave para el calendario** (ej. "Día 15: Vence plazo de apelación"). Esos hitos sugeridos podrían insertarse directamente en tu nueva tabla `Evento_Calendario`. Esto demuestra que tu IA no solo redacta textos bonitos, sino que entiende la *operatividad procesal* y activa funciones del sistema.

Puedes enviarle las respuestas a Antigravity tal cual están redactadas. Estás a muy pocos pasos de tener un MVP (Producto Mínimo Viable) espectacular y digno de un trabajo de tesis. ¡Adelante!
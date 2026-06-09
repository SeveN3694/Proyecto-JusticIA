# Guía de Prueba: Simulación de un Caso Real en JusticIA
**Caso de Prueba:** Protección y Defensa al Consumidor (Garantía Vehicular)

Bienvenido. Este documento contiene el recorrido interactivo (Walkthrough) paso a paso para que usted mismo pueda probar y evaluar la plataforma JusticIA en todo su esplendor, experimentando los diferentes perfiles del sistema.

---

## FASE 1: Automatización y Apertura (n8n, NeonDB y Drive)
*Esta fase demuestra la agilidad del ingreso de casos y cómo el sistema se conecta con herramientas externas.*

1. **Contexto:** JusticIA no obliga a los abogados a cambiar sus costumbres; pueden usar la plataforma web o simplemente enviar los documentos vía Telegram y el sistema se encarga del resto.
2. **Acción (Formulario de Input):** Diríjase a la pantalla de **"Input del Caso Legal"**.
3. **Ingreso de Datos Reales:** Llena el formulario con los siguientes datos del caso de prueba para que la IA tenga contexto:
   - **Nombre de Cliente:** Juan Pérez
   - **Domicilio:** Av. Javier Prado Este 1234
   - **Distrito/Provincia:** San Borja, Lima
   - **Sumilla (Copia y pega este texto exacto):** 
     > *"Reclamo formal por negativa injustificada de cobertura de garantía automotriz ante fallas severas de motor a los dos meses de compra. El cliente exige el cambio inmediato del vehículo por uno nuevo o la devolución íntegra del dinero ($25,000 USD) sustentándose en la falta de idoneidad del producto y el riesgo a su integridad física."*
4. **Carga de Documento de Prueba:** Haga clic en el botón de adjuntar archivo y seleccione el archivo de prueba: `Carta_Notarial_Juan_Perez.pdf`. *(Nota: Se ha preparado este documento como base fáctica).*
5. **Sincronización (n8n):** Haga clic en "Enviar Caso". Cuando aparezca la notificación verde en pantalla, tenga en cuenta que en ese mismo segundo ocurrió lo siguiente en segundo plano:
   - El PDF original se guardó en la carpeta del caso en **Google Drive** corporativo.
   - Se registró el perfil del cliente en la base de datos estructurada **Neon DB**.
   - El motor vectorizó el PDF usando **Gemini** para prepararlo para la IA.

---

## FASE 2: Ingesta de Conocimiento (Centro de Indexación)
*Evalúe cómo el sistema "aprende" y se nutre de normativas específicas.*

1. **Ingreso:** Entra al sistema usando el rol **Admin/Auxiliar**.
2. **Acción:** Diríjase a la sección **"Centro de Indexación"** (Digitalización).
3. **Carga:** Suba el archivo `0 Código Protección y Defensa Consumidor.pdf`.
4. **Qué sucede aquí:** En esta etapa, el sistema no está simplemente subiendo un PDF a la nube. JusticIA está extrayendo el texto, dividiéndolo en fragmentos lógicos (chunks) y convirtiéndolos en vectores matemáticos usando Gemini y Neon DB. De esta forma, el sistema "aprende" y "entiende" la nueva norma.

---

## FASE 3: La Magia de la IA (Estrategia Legal)
*Compruebe el poder del motor RAG analizando un caso real en segundos.*

1. **Ingreso:** Inicie sesión con el rol **Abogado**.
2. **Acción:** Vaya a la pestaña **"JusticIA IA"** en la barra lateral.
3. **Prueba:** En el cuadro de "Hechos del Caso", copie y pegue este texto exacto:

> **TEXTO PARA COPIAR:**
> El cliente adquirió un vehículo del año 2023 en el concesionario automotriz. A los dos meses de uso, el motor presentó fallas severas, apagándose en plena carretera y poniendo en riesgo su vida. El concesionario se niega a aplicar la garantía argumentando "mal uso por parte del usuario", pero se han negado a emitir y entregar un informe técnico concluyente. El cliente solicita la devolución total de su dinero o el cambio por un vehículo nuevo basándose en la idoneidad del producto bajo las normas del Código de Protección y Defensa del Consumidor.

4. **Acción:** Haga clic en **"Generar Estrategia"**.
5. **Puntos Clave a Observar:**
   - Visualice el **Porcentaje de Viabilidad** matemático calculado por la IA.
   - Desplácese hacia abajo para revisar cómo el LLM cruzó la información con el PDF subido previamente (su base jurisprudencial).
   - **Gestión Inteligente:** Vaya a la sección *"Hitos Procesales Sugeridos para Calendario"* y haga clic en **"Añadir a Agenda"** en al menos dos de las recomendaciones emitidas por la IA.

---

## FASE 4: Operatividad del Despacho (Calendario y Finanzas)
*Evalúe cómo el sistema trasciende el concepto de Chatbot para convertirse en un ERP que gestiona el negocio.*

1. **Acción:** Vaya a **"Agenda y Calendario"** en el panel izquierdo.
2. **Prueba:** Observe cómo los hitos sugeridos por la IA ya están debidamente programados en la línea de tiempo.
3. **Prueba:** Haga clic en **"Nuevo Hito"**. 
   - Título: *Audiencia de Conciliación INDECOPI*
   - Fecha: *(Coloque una fecha de la próxima semana)*
4. **Prueba:** Haga clic en **"Marcar Completado"** en el primer hito de la lista para simular el avance procesal.
5. **Acción:** Vaya a **"Finanzas y Horas"**.
6. **Prueba:** Registre un nuevo tiempo:
   - Cantidad de horas: `2.5`
   - Descripción de la tarea: `Redacción de reclamo ante INDECOPI y validación de estrategia con IA JusticIA.`
7. **Detalle Clave:** Haga clic en "Guardar Tiempo" y observe cómo el "Monto Facturable Est." se actualiza en **Soles (PEN)** automáticamente, monetizando el trabajo legal.

---

## FASE 5: Transparencia y Autogestión (Portal Cliente)
*Compruebe cómo JusticIA otorga valor agregado y tranquilidad al cliente final.*

1. **Ingreso:** Cierre sesión y entre usando el rol **Cliente**.
2. **Visualizar el Cronograma:** Observe la línea de tiempo en el centro de la pantalla. 
   - **El Impacto:** El cliente ya no necesita llamar ansioso al despacho; ingresa a su portal y ve exactamente la misma línea de tiempo actualizada que maneja el abogado (hitos completados y pendientes).
3. **Prueba (Chat IA):** Haga clic en el globo de chat (esquina inferior derecha) para abrir el **Asistente JusticIA**.
4. Copie y pegue estas preguntas una por una:

> **PREGUNTA 1:** 
> Hola, ¿me pueden explicar en términos simples en qué consiste el principio de idoneidad que está en mi reclamo?

> **PREGUNTA 2:** 
> ¿Qué pasa si el concesionario no se presenta a la audiencia de conciliación programada?

5. **Comprobar la IA:** Observe cómo el asistente responde de manera clara, educada y basándose estrictamente en la legalidad peruana.

---

### Notas para el Evaluador
- **Tiempos de Respuesta (RAG):** El cruce semántico y la generación de estrategia pueden tomar entre 5 a 15 segundos dependiendo de las cuotas de red de Gemini API. En ese breve lapso, el sistema está realizando un trabajo de análisis de datos que a un humano le tomaría horas.
- **Entorno de Desarrollo:** Al ejecutarse de forma local usando React Vite en modo `dev`, si alguna pantalla sufre desincronización de estado local, una simple recarga rápida (`F5`) restaura el flujo original.

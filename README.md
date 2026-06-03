justicia-frontend/
│
├── src/
│   ├── assets/              # Imágenes, logos, íconos
│   ├── components/          # Componentes reutilizables
│   │   ├── layout/          # Sidebar, Navbar, Footer
│   │   ├── ui/              # Botones, Modales, Inputs (shadcn/ui)
│   │   └── legal/           # Tarjetas de jurisprudencia, visor PDF
│   ├── hooks/               # Custom hooks (ej. useFetchCases, useAuth)
│   ├── pages/               # Vistas principales (Enrutamiento)
│   │   ├── abogado/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EstrategiaLegal.jsx  # El Split-Screen Core
│   │   │   └── BuscadorGlobal.jsx
│   │   ├── cliente/
│   │   │   ├── PortalCliente.jsx    # Vista resumida y calendario
│   │   │   └── SubirDocumentos.jsx
│   │   └── admin/
│   │       └── Digitalizacion.jsx   # Carga de PDFs y OCR
│   ├── services/            # Llamadas a la API de Python (Axios/Fetch)
│   │   ├── api.js           # Configuración base de Axios
│   │   └── casosService.js
│   ├── utils/               # Funciones de ayuda (formateo de fechas, etc.)
│   ├── App.jsx              # Enrutador principal (React Router)
│   └── main.jsx             # Punto de entrada de React
├── package.json
└── tailwind.config.js       # Configuración de colores y diseño

Set-ExecutionPolicy Unrestricted -Scope Process

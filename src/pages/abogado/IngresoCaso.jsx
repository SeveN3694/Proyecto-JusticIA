import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Send, User, MapPin, Map, FileText, ArrowLeft } from 'lucide-react';
import logoJusticia from '../../assets/JusticIA.png';

export default function IngresoCaso() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("Ningún archivo seleccionado");
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 4000);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("Ningún archivo seleccionado");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Empaqueta todos los datos del formulario (incluyendo el archivo)
    const formData = new FormData(e.target);

    try {
      // 1. Guardar en Backend Local (Neon DB, Expediente, Cliente, Vectores RAG y PDF físico)
      const localResponse = await fetch('http://localhost:8000/api/documentos/upload', {
        method: 'POST',
        body: formData,
      });

      if (!localResponse.ok) {
        let errorMsg = 'Error al crear el expediente en la base de datos local.';
        try {
          const errData = await localResponse.json();
          errorMsg = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
        } catch(e) {}
        throw new Error(errorMsg);
      }

      // 2. Disparar Webhook de n8n (Google Drive + Telegram)
      const webhookUrl = 'https://jamess7.app.n8n.cloud/webhook-test/8ea64518-ca06-4d46-a579-193d5ff0958b';
      const n8nResponse = await fetch(webhookUrl, {
        method: 'POST',
        body: formData, // n8n procesará esto como multipart/form-data
      });

      if (localResponse.ok && n8nResponse.ok) {
        showNotification('success', '¡Expediente creado en Base de Datos y sincronizado con n8n exitosamente!');
        e.target.reset();
        setFileName("Ningún archivo seleccionado");
      } else {
        showNotification('warning', 'Expediente creado localmente, pero error al sincronizar con n8n.');
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      showNotification('error', "Error en el proceso: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto text-neutral-200 flex flex-col items-center py-12 px-6 relative animate-in fade-in duration-500">

      {/* Enterprise Toast Notification */}
      {notification.show && (
        <div className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl border shadow-2xl animate-in slide-in-from-top-10 fade-in duration-300 ${
          notification.type === 'success' ? 'bg-green-900/40 border-green-500/50 text-green-400' :
          notification.type === 'error' ? 'bg-red-900/40 border-red-500/50 text-red-400' :
          'bg-yellow-900/40 border-yellow-500/50 text-yellow-400'
        }`}>
          <div className="w-2 h-2 rounded-full animate-pulse bg-current"></div>
          <p className="text-sm font-medium tracking-wide">{notification.message}</p>
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg bg-legal-panel/85 border border-legal-border rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        
        {/* Header con botón de regresar */}
        <div className="flex items-center justify-between gap-4 mb-8 border-b border-legal-border pb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-wide text-white">Input del Caso Legal</h1>
              <p className="text-xs text-neutral-400 mt-1">Sube los datos básicos del caso y la sumilla para iniciar la automatización.</p>
            </div>
          </div>
          <img 
            src={logoJusticia} 
            alt="JusticIA Logo" 
            className="w-10 h-10 object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform duration-300 hidden sm:block"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Nombre del Cliente */}
          <div className="group">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 group-focus-within:text-gold-primary transition-colors">
              Nombre del Cliente
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-gold-primary transition-colors" />
              <input 
                type="text" name="nombre_cliente" required
                placeholder="Ej. Juan Pérez Maldonado"
                className="w-full bg-neutral-900/50 border border-legal-border rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold-primary/70 focus:ring-1 focus:ring-gold-primary/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Domicilio */}
          <div className="group">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 group-focus-within:text-gold-primary transition-colors">
              Domicilio
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-gold-primary transition-colors" />
              <input 
                type="text" name="domicilio" required
                placeholder="Ej. Av. Larco 123, Dpto. 401"
                className="w-full bg-neutral-900/50 border border-legal-border rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold-primary/70 focus:ring-1 focus:ring-gold-primary/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Distrito y Provincia */}
          <div className="group">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 group-focus-within:text-gold-primary transition-colors">
              Distrito y Provincia del demandante
            </label>
            <div className="relative">
              <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-gold-primary transition-colors" />
              <input 
                type="text" name="distrito_provincia" required
                placeholder="Ej. Miraflores, Lima"
                className="w-full bg-neutral-900/50 border border-legal-border rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold-primary/70 focus:ring-1 focus:ring-gold-primary/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Sumilla */}
          <div className="group">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 group-focus-within:text-gold-primary transition-colors">
              Sumilla
            </label>
            <div className="relative">
              <FileText className="absolute left-4 top-3.5 w-4 h-4 text-neutral-500 group-focus-within:text-gold-primary transition-colors" />
              <textarea 
                name="sumilla" required rows="4"
                placeholder="Escribe un resumen detallado de la pretensión y los hechos principales..."
                className="w-full bg-neutral-900/50 border border-legal-border rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold-primary/70 focus:ring-1 focus:ring-gold-primary/20 transition-all duration-300 resize-none leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* Archivo */}
          <div className="group">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 group-focus-within:text-gold-primary transition-colors">
              Archivo (Pruebas / Expediente)
            </label>
            <div className="relative flex flex-col items-center justify-center bg-neutral-900/30 border-2 border-dashed border-legal-border rounded-xl p-6 hover:border-gold-primary/50 focus-within:border-gold-primary/50 transition-all duration-300 cursor-pointer overflow-hidden group/upload">
              <input 
                type="file" name="archivo" onChange={handleFileChange} required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <Upload className="w-8 h-8 text-neutral-500 group-hover/upload:text-gold-primary transition-colors mb-2 z-10" />
              <span className="text-sm font-semibold text-neutral-300 group-hover/upload:text-white transition-colors truncate max-w-full px-4 z-10 text-center">
                {fileName === "Ningún archivo seleccionado" ? "Hacer clic para subir o arrastrar archivo" : fileName}
              </span>
              <span className="text-xs text-neutral-500 mt-1 z-10">Archivos PDF, DOCX, PNG o JPG (Máx. 10MB)</span>
            </div>
          </div>

          {/* Botón de Envío */}
          <div className="pt-4 border-t border-legal-border">
            <button 
              type="submit" disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 bg-gold-gradient text-black font-extrabold py-3.5 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 tracking-wider shadow-lg shadow-gold-primary/15 uppercase text-xs"
            >
              {isSubmitting ? 'Enviando Caso...' : <><Send className="w-3.5 h-3.5" /> Enviar Caso al Sistema</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
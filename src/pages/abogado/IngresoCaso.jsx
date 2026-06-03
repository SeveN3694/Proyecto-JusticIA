import React, { useState } from 'react';
import { Upload, Send } from 'lucide-react';

export default function IngresoCaso() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("Ningún archivo seleccionado");

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
      // REEMPLAZA ESTA URL CON TU WEBHOOK DE PRODUCCIÓN DE n8n
      const webhookUrl = 'https://jamess7.app.n8n.cloud/webhook-test/8ea64518-ca06-4d46-a579-193d5ff0958b';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData, // n8n procesará esto como multipart/form-data
      });

      if (response.ok) {
        alert("¡Caso enviado a n8n exitosamente!");
        e.target.reset();
        setFileName("Ningún archivo seleccionado");
      } else {
        alert("Error al enviar el caso.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor n8n.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-legal-dark text-neutral-200 p-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-legal-panel border border-legal-border rounded-2xl shadow-2xl p-8">
        
        <div className="mb-8 border-b border-legal-border pb-6">
          <h1 className="text-2xl font-bold tracking-wide text-white">Input del Caso Legal</h1>
          <p className="text-sm text-neutral-400 mt-2">Con este formulario el abogado sube al sistema los datos básicos del caso y una sumilla.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Nombre del Cliente */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Nombre del Cliente</label>
            <input 
              type="text" name="nombre_cliente" required
              className="w-full bg-neutral-900/50 border border-legal-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-gold-primary/70"
            />
          </div>

          {/* Domicilio */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Domicilio</label>
            <input 
              type="text" name="domicilio" required
              className="w-full bg-neutral-900/50 border border-legal-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-gold-primary/70"
            />
          </div>

          {/* Distrito y Provincia */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Distrito y Provincia del demandante</label>
            <input 
              type="text" name="distrito_provincia" required
              className="w-full bg-neutral-900/50 border border-legal-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-gold-primary/70"
            />
          </div>

          {/* Sumilla */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Sumilla</label>
            <textarea 
              name="sumilla" required rows="3"
              className="w-full bg-neutral-900/50 border border-legal-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-gold-primary/70 resize-none"
            ></textarea>
          </div>

          {/* Archivo */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Archivo (Pruebas / Expediente)</label>
            <div className="relative flex items-center bg-neutral-900/50 border border-legal-border rounded-xl overflow-hidden focus-within:border-gold-primary/70 transition-colors">
              <input 
                type="file" name="archivo" onChange={handleFileChange} required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="bg-neutral-800 text-neutral-300 px-4 py-3 border-r border-legal-border flex items-center gap-2 text-sm font-medium">
                <Upload className="w-4 h-4" /> Elegir archivo
              </div>
              <div className="px-4 text-sm text-neutral-400 truncate">
                {fileName}
              </div>
            </div>
          </div>

          {/* Área Legal */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">Área</label>
            <div className="space-y-3">
              {['Derecho Civil', 'Derecho Penal', 'Defensa Consumidor', 'Constitucional'].map((area) => (
                <label key={area} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" name="area_legal" value={area} required
                    className="w-4 h-4 text-gold-primary bg-neutral-900 border-legal-border focus:ring-gold-primary/50 focus:ring-offset-legal-dark"
                  />
                  <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{area}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Botón de Envío */}
          <div className="pt-4 border-t border-legal-border">
            <button 
              type="submit" disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 bg-gold-gradient text-black font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : <><Send className="w-4 h-4" /> Enviar Caso al Sistema</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
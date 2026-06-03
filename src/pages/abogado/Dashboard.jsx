import React, { useState } from 'react';
import { Search, FileText, Brain, CheckCircle, Send, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AbogadoDashboard() {
  const navigate = useNavigate();
  const [viabilidad, setViabilidad] = useState(78);
  const [textoEstrategia, setTextoEstrategia] = useState('');

  return (
    <div className="flex h-screen bg-legal-dark text-neutral-200 overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-16 flex flex-col items-center justify-between py-6 bg-legal-panel border-r border-legal-border">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-gold-primary font-black text-xl tracking-tighter">J<span>.</span></div>
          <button className="p-3 bg-neutral-900 border border-gold-primary/20 rounded-xl text-gold-primary">
            <Brain className="w-5 h-5" />
          </button>
          <button className="p-3 text-neutral-500 hover:text-neutral-200 transition-colors">
            <FileText className="w-5 h-5" />
          </button>
        </div>
        <button onClick={() => navigate('/login')} className="p-3 text-neutral-500 hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* CONTENIDO PRINCIPAL: SPLIT SCREEN */}
      <div className="flex-grow flex">
        
        {/* PANEL IZQUIERDO: Búsqueda y Jurisprudencia (pgvector) */}
        <div className="w-1/2 p-6 flex flex-col border-r border-legal-border bg-gradient-to-b from-neutral-950 to-legal-dark overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-xl font-bold tracking-wide mb-1 text-white">Análisis & Jurisprudencia</h1>
            <p className="text-xs text-neutral-400 uppercase tracking-wider">Motor de consulta cognitiva</p>
          </div>

          {/* Buscador Universal */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text"
              placeholder="Buscar por similitud fáctica o palabras clave..."
              className="w-full bg-legal-panel border border-legal-border rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-gold-primary/50"
            />
          </div>

          {/* Caso Activo Contextual */}
          <div className="bg-legal-panel border border-legal-border p-4 rounded-xl mb-6">
            <span className="text-[10px] bg-gold-primary/10 text-gold-primary border border-gold-primary/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
              Caso Activo
            </span>
            <h3 className="text-sm font-semibold text-white mt-2 mb-1">Expediente #2026-Civil</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Demanda de indemnización por daños y perjuicios derivados de responsabilidad extracontractual. El demandado alega ruptura del nexo causal.
            </p>
          </div>

          {/* Resultados de la Base de Conocimiento */}
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
            <Brain className="w-3.5 h-3.5 text-gold-primary" /> Precedentes Relevantes (pgvector)
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-legal-panel/60 border border-legal-border hover:border-gold-primary/30 rounded-xl transition-all cursor-pointer group">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-white group-hover:text-gold-primary transition-colors">Casación N° 4412-2024 Lima</h4>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">94% Coincidencia</span>
              </div>
              <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                Criterios jurisprudenciales sobre la cuantificación del daño moral en contratos comerciales concurrentes...
              </p>
            </div>

            <div className="p-4 bg-legal-panel/60 border border-legal-border hover:border-gold-primary/30 rounded-xl transition-all cursor-pointer group">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-white group-hover:text-gold-primary transition-colors">Sentencia Tribunal Constitucional 012-2023</h4>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">87% Coincidencia</span>
              </div>
              <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                Delimitación del debido proceso en la incorporación de pruebas extemporáneas documentales...
              </p>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: Redactor de Estrategia */}
        <div className="w-1/2 p-6 flex flex-col bg-legal-panel">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white">Estrategia & Predictibilidad</h2>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">Generación del informe base</p>
            </div>

            {/* Medidor de Viabilidad de Éxito */}
            <div className="flex items-center gap-3 bg-neutral-950 border border-legal-border px-4 py-2 rounded-xl">
              <span className="text-xs text-neutral-400 font-medium">Viabilidad:</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-base font-mono font-bold text-emerald-400">{viabilidad}%</span>
              </div>
            </div>
          </div>

          {/* Área de Redacción */}
          <div className="flex-grow flex flex-col mb-4">
            <textarea 
              className="w-full flex-grow bg-neutral-950/40 border border-legal-border rounded-xl p-4 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-primary/40 resize-none font-sans leading-relaxed"
              placeholder="Escribe la teoría del caso, fundamentos de derecho y la propuesta de defensa en base a los precedentes indexados..."
              value={textoEstrategia}
              onChange={(e) => setTextoEstrategia(e.target.value)}
            />
          </div>

          {/* Barra de Acciones */}
          <div className="flex justify-end gap-3">
            <button className="px-5 py-2.5 border border-legal-border rounded-xl text-xs font-semibold text-neutral-400 hover:bg-neutral-900 transition-colors">
              Guardar Progreso
            </button>
            <button className="px-5 py-2.5 bg-gold-gradient text-black rounded-xl text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-gold-primary/5">
              <Send className="w-3.5 h-3.5" /> Enviar a Revisión de Socio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
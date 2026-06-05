import React from 'react';
import { Calendar, FileCheck, Layers, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoJusticia from '../../assets/JusticIA.png';

export default function ClientePortal() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-legal-dark text-neutral-200">
      
      {/* HEADER DE PORTAL */}
      <header className="bg-legal-panel border-b border-legal-border px-8 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src={logoJusticia} alt="JusticIA Logo" className="w-7 h-7 object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
            <span className="text-lg font-black tracking-widest flex items-baseline">
              <span className="text-transparent bg-clip-text bg-gold-gradient">JUSTIC</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gold-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ml-[1px]">IA</span>
            </span>
          </div>
          <span className="text-neutral-600">|</span>
          <span className="text-xs uppercase tracking-widest text-neutral-400">Portal de Clientes</span>
        </div>
        <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-xs text-neutral-400 hover:text-red-400 transition-colors">
          <LogOut className="w-4 h-4" /> Salir
        </button>
      </header>

      {/* CONTENIDO DEL PORTAL */}
      <main className="max-w-5xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Bienvenido a su Expediente Digital</h1>
          <p className="text-sm text-neutral-400 mt-1">Consulte el estado de sus trámites y defensa en tiempo real.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta de Estado Gráfico */}
          <div className="md:col-span-2 bg-legal-panel border border-legal-border p-6 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold-primary" /> Estado del Caso: #2026-Civil
            </h3>
            
            {/* Timeline Horizontal de Estados */}
            <div className="relative flex justify-between items-center mt-4">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-800 pointer-events-none z-0" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-gold-primary text-black flex items-center justify-center text-xs font-bold">✓</div>
                <span className="text-[11px] text-neutral-300 mt-2 font-medium">Ingresado</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-gold-primary text-black flex items-center justify-center text-xs font-bold">✓</div>
                <span className="text-[11px] text-neutral-300 mt-2 font-medium">Análisis Legal</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-neutral-900 border-2 border-gold-primary text-gold-primary flex items-center justify-center text-xs font-bold animate-pulse">●</div>
                <span className="text-[11px] text-gold-primary mt-2 font-semibold">Diseño de Estrategia</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-600 flex items-center justify-center text-xs"></div>
                <span className="text-[11px] text-neutral-500 mt-2">Aprobado</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-legal-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Resumen Ejecutivo del Abogado</h4>
              <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/50 p-4 rounded-xl border border-legal-border">
                Nos encontramos cruzando los hechos descritos en la entrevista con la jurisprudencia civil del estudio para afinar la viabilidad del éxito. Su estrategia estará disponible para descarga en este panel una vez aprobada por los socios directores.
              </p>
            </div>
          </div>

          {/* Calendario / Hitos Relacionados */}
          <div className="bg-legal-panel border border-legal-border p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-primary" /> Próximos Hitos
              </h3>
              <div className="space-y-4">
                <div className="border-l-2 border-gold-primary pl-3 py-1">
                  <div className="text-xs font-semibold text-white">Reunión de Control Presencial</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">08 de Junio, 2026 - 10:00 AM</div>
                </div>
                <div className="border-l-2 border-neutral-700 pl-3 py-1">
                  <div className="text-xs font-semibold text-neutral-400">Presentación de Carpeta Base</div>
                  <div className="text-[11px] text-neutral-600 mt-0.5">Pendiente de aprobación</div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-neutral-950 border border-legal-border hover:border-gold-primary/30 text-neutral-300 text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
              <FileCheck className="w-4 h-4 text-gold-primary" /> Descargar Estrategia (PDF)
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
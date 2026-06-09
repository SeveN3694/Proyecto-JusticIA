import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Target, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function AgendaCalendario() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEventos = () => {
    fetch('http://localhost:8000/api/calendario/1')
      .then(res => res.json())
      .then(data => {
        setEventos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleNuevoHito = async () => {
    const titulo = prompt("Ingrese el título del nuevo hito:");
    if (!titulo) return;
    const fecha = prompt("Ingrese la fecha (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
    if (!fecha) return;

    try {
      await fetch('http://localhost:8000/api/calendario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_caso: 1, titulo_evento: titulo, fecha_evento: fecha, estado: 'Pendiente' })
      });
      fetchEventos();
    } catch (error) {
      console.error("Error creando hito:", error);
    }
  };

  const handleCompletar = async (id_evento) => {
    try {
      await fetch(`http://localhost:8000/api/calendario/${id_evento}/completar`, {
        method: 'PUT'
      });
      fetchEventos();
    } catch (error) {
      console.error("Error completando hito:", error);
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-700 bg-black text-neutral-200 font-sans p-8 overflow-y-auto">
      
      {/* HEADER */}
      <div className="mb-10 flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-wide text-white">Cronograma Procesal</h1>
          </div>
          <p className="text-sm text-neutral-500 font-medium uppercase tracking-widest ml-14">Caso: EXP-2024-001 (Protección al Consumidor)</p>
        </div>
        
        <button 
          onClick={handleNuevoHito}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <Plus className="w-4 h-4" /> Nuevo Hito
        </button>
      </div>

      {/* TIMELINE */}
      <div className="max-w-4xl relative">
        {/* Línea vertical principal */}
        <div className="absolute left-[28px] top-4 bottom-4 w-1 bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent rounded-full" />

        {loading ? (
          <div className="ml-20 text-neutral-500 animate-pulse">Cargando hitos del servidor...</div>
        ) : (
          <div className="space-y-12">
            {eventos.map((evt, idx) => (
              <div key={idx} className="relative flex items-start group">
                
                {/* Timeline Dot */}
                <div className={`absolute left-0 mt-1 w-14 h-14 rounded-full bg-black border-[3px] flex items-center justify-center transition-all duration-300 shadow-2xl z-10
                  ${evt.estado === 'Completado' ? 'border-emerald-500 text-emerald-500' : 'border-blue-500 text-blue-500'}`}>
                  {evt.estado === 'Completado' ? <CheckCircle className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                </div>

                {/* Content Card */}
                <div className="ml-24 w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl relative overflow-hidden group-hover:-translate-y-1">
                  <div className={`absolute top-0 left-0 w-1 h-full ${evt.estado === 'Completado' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{evt.titulo_evento}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border
                      ${evt.estado === 'Completado' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                      {evt.estado}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      Fecha Estimada: <span className="text-white">{evt.fecha_evento}</span>
                    </div>
                  </div>
                  
                  {evt.estado !== 'Completado' && (
                    <div className="mt-6 flex justify-end">
                      <button 
                        onClick={() => handleCompletar(evt.id_evento)}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
                        Marcar Completado <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State visual para "siguiente paso" */}
            <div className="relative flex items-start group opacity-50">
              <div className="absolute left-0 mt-1 w-14 h-14 rounded-full bg-black border-[3px] border-dashed border-white/20 flex items-center justify-center z-10">
                <AlertCircle className="w-5 h-5 text-white/30" />
              </div>
              <div className="ml-24 w-full border-2 border-dashed border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[120px] cursor-pointer hover:border-white/20 hover:bg-white/[0.02] transition-colors">
                <p className="text-xs uppercase tracking-widest font-bold text-neutral-500">La IA sugerirá nuevos hitos procesales automáticamente</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

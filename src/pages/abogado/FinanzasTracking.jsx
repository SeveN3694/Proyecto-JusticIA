import React, { useState, useEffect } from 'react';
import { DollarSign, Clock, Plus, Save, Activity, Briefcase } from 'lucide-react';
import { API_URL } from '../../config';

export default function FinanzasTracking() {
  const [horas, setHoras] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [nuevaHora, setNuevaHora] = useState({ cantidad: '', descripcion: '' });

  const fetchHoras = () => {
    fetch(`${API_URL}/api/finanzas/horas/1`)
      .then(res => res.json())
      .then(data => {
        setHoras(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHoras();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if(!nuevaHora.cantidad || !nuevaHora.descripcion) return;

    try {
      await fetch(`${API_URL}/api/finanzas/horas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_caso: 1,
          cantidad_horas: parseFloat(nuevaHora.cantidad),
          descripcion_tarea: nuevaHora.descripcion
        })
      });
      setNuevaHora({ cantidad: '', descripcion: '' });
      fetchHoras();
    } catch (e) {
      console.error(e);
    }
  };

  const totalHoras = horas.reduce((acc, curr) => acc + curr.cantidad_horas, 0);

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-700 bg-black text-neutral-200 font-sans p-8 overflow-y-auto">
      
      {/* HEADER */}
      <div className="mb-10 flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-wide text-white">Log de Tiempos y Finanzas</h1>
          </div>
          <p className="text-sm text-neutral-500 font-medium uppercase tracking-widest ml-14">Registro Manual de Horas Facturables</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PANEL IZQUIERDO: Ingreso Manual */}
        <div className="lg:col-span-1">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2 mb-6">
              <Plus className="w-4 h-4 text-emerald-400" /> Nuevo Registro
            </h3>

            <form onSubmit={handleSave} className="flex flex-col gap-5 relative z-10">
              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-2 block">Caso Activo</label>
                <div className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm text-white flex items-center gap-2 opacity-70">
                  <Briefcase className="w-4 h-4 text-neutral-500" /> EXP-2024-001 (Protección al Consumidor)
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-2 block">Cantidad de Horas</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="number" step="0.1" min="0.1"
                    value={nuevaHora.cantidad}
                    onChange={e => setNuevaHora({...nuevaHora, cantidad: e.target.value})}
                    placeholder="Ej: 1.5"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 pl-10 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-2 block">Descripción de la Tarea</label>
                <textarea 
                  value={nuevaHora.descripcion}
                  onChange={e => setNuevaHora({...nuevaHora, descripcion: e.target.value})}
                  placeholder="Ej: Redacción de la estrategia de defensa..."
                  className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 h-24 resize-none"
                />
              </div>

              <button type="submit" className="mt-2 w-full flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-400 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors">
                <Save className="w-4 h-4" /> Guardar Tiempo
              </button>
            </form>
          </div>
        </div>

        {/* PANEL DERECHO: Resumen y Tabla */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Horas Totales (Caso)</p>
                <h3 className="text-3xl font-extrabold text-white">{totalHoras.toFixed(1)} <span className="text-sm text-neutral-500 font-normal">hrs</span></h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-emerald-500/20 rounded-3xl p-6 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <div>
                <p className="text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest mb-1">Monto Facturable Est.</p>
                <h3 className="text-3xl font-extrabold text-emerald-400"><span className="text-sm font-normal text-emerald-500/50">PEN</span> S/ {(totalHoras * 150).toFixed(2)}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="flex-1 bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Registro Histórico</h3>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-3">
                {loading ? (
                  <p className="text-neutral-500 text-sm">Cargando...</p>
                ) : horas.length === 0 ? (
                  <p className="text-neutral-500 text-sm italic">No hay horas registradas aún.</p>
                ) : (
                  horas.slice().reverse().map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#050505] flex items-center justify-center border border-white/5 shrink-0">
                          <span className="text-sm font-bold text-emerald-400">{h.cantidad_horas}h</span>
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium mb-1">{h.descripcion_tarea}</p>
                          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                            {new Date(h.fecha_registro).toLocaleDateString()} a las {new Date(h.fecha_registro).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

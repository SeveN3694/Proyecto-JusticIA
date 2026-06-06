import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, FolderOpen, MoreVertical, Plus, Briefcase, Clock, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_CASOS = [
  { id: 'EXP-2024-001', titulo: 'Divorcio por Causal', cliente: 'Juan Pérez', materia: 'Familia', estado: 'Abierto', fecha: '12/05/2024', avance: 15 },
  { id: 'EXP-2024-002', titulo: 'Indemnización por Accidente', cliente: 'María Gómez', materia: 'Civil', estado: 'En Trámite', fecha: '01/06/2024', avance: 60 },
  { id: 'EXP-2024-003', titulo: 'Despido Arbitrario', cliente: 'Carlos Ruiz', materia: 'Laboral', estado: 'Cerrado', fecha: '15/03/2024', avance: 100 },
  { id: 'EXP-2024-004', titulo: 'Incumplimiento de Contrato', cliente: 'Constructora Alfa', materia: 'Comercial', estado: 'En Trámite', fecha: '28/05/2024', avance: 45 },
  { id: 'EXP-2024-005', titulo: 'Sucesión Intestada', cliente: 'Familia Torres', materia: 'Civil', estado: 'Abierto', fecha: '05/06/2024', avance: 5 },
];

export default function DirectorioCasos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-700 bg-black text-neutral-200 font-sans">
      
      {/* Header Ejecutivo */}
      <div className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl flex items-center px-8 justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <FolderOpen className="w-6 h-6 text-gold-primary" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-white tracking-wide">
              Directorio <span className="text-gold-primary font-normal">| Expedientes</span>
            </h1>
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Gestión Centralizada y Estado Procesal</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/ingreso-caso')}
          className="group relative flex items-center gap-2 bg-gold-gradient text-black font-extrabold py-3 px-6 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all"
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          <Plus className="w-5 h-5 relative z-10" />
          <span className="relative z-10 tracking-wider">NUEVO CASO</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 relative">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 rounded-[2rem] p-6 flex items-center gap-6 shadow-xl group hover:border-gold-primary/30 transition-colors">
               <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                 <Briefcase className="w-6 h-6 text-blue-400" />
               </div>
               <div>
                 <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Total Activos</p>
                 <p className="text-3xl font-extrabold text-white">124</p>
               </div>
            </div>
            <div className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 rounded-[2rem] p-6 flex items-center gap-6 shadow-xl group hover:border-gold-primary/30 transition-colors">
               <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 group-hover:scale-110 transition-transform">
                 <Clock className="w-6 h-6 text-yellow-400" />
               </div>
               <div>
                 <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">En Trámite</p>
                 <p className="text-3xl font-extrabold text-white">89</p>
               </div>
            </div>
            <div className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 rounded-[2rem] p-6 flex items-center gap-6 shadow-xl group hover:border-gold-primary/30 transition-colors">
               <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                 <CheckCircle2 className="w-6 h-6 text-emerald-400" />
               </div>
               <div>
                 <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Resueltos (Mes)</p>
                 <p className="text-3xl font-extrabold text-white">12</p>
               </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col">
            
            {/* Toolbar */}
            <div className="p-6 border-b border-white/5 bg-[#050505] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full max-w-lg group">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/20 to-transparent rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-gold-primary transition-colors z-10" />
                <input 
                  type="text" 
                  placeholder="Buscar por expediente, título o cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-gold-primary/50 outline-none transition-all relative z-10 shadow-inner"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#111] border border-white/10 rounded-xl hover:border-gold-primary/50 hover:bg-[#151515] transition-all text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-gold-primary">
                <Filter className="w-4 h-4" />
                Filtrar Vista
              </button>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#050505] text-[10px] uppercase tracking-widest text-neutral-500 font-bold border-b border-white/5">
                    <th className="p-6 font-bold">Expediente</th>
                    <th className="p-6 font-bold">Título del Caso</th>
                    <th className="p-6 font-bold">Cliente</th>
                    <th className="p-6 font-bold">Materia</th>
                    <th className="p-6 font-bold">Estado</th>
                    <th className="p-6 font-bold">Avance</th>
                    <th className="p-6 text-right font-bold pr-8">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {MOCK_CASOS.map((caso, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="p-6">
                        <span className="font-extrabold text-gold-primary tracking-wider">{caso.id}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-gold-primary/10 transition-colors">
                            <FileText className="w-5 h-5 text-neutral-400 group-hover:text-gold-primary transition-colors" />
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-gold-primary transition-colors">{caso.titulo}</p>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-0.5">{caso.fecha}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-neutral-300 font-medium">{caso.cliente}</td>
                      <td className="p-6">
                        <span className="bg-[#111] border border-white/10 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-neutral-400">
                          {caso.materia}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <div className="relative flex items-center justify-center">
                            <div className={`absolute inset-0 rounded-full blur-[4px] animate-pulse ${caso.estado === 'Abierto' ? 'bg-emerald-500' : caso.estado === 'En Trámite' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                            <div className={`w-2 h-2 rounded-full relative z-10 ${caso.estado === 'Abierto' ? 'bg-emerald-400' : caso.estado === 'En Trámite' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                          </div>
                          <span className="text-neutral-300 font-bold text-xs">{caso.estado}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden w-24">
                            <div 
                              className={`h-full rounded-full ${caso.avance === 100 ? 'bg-emerald-500' : 'bg-gold-gradient'}`}
                              style={{ width: `${caso.avance}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-neutral-400">{caso.avance}%</span>
                        </div>
                      </td>
                      <td className="p-6 pr-8 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-xl text-neutral-400 transition-all">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          <button className="p-2 bg-gold-primary/10 hover:bg-gold-primary text-gold-primary hover:text-black rounded-xl transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 shadow-lg">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

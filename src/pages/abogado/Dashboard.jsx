import React from 'react';
import { Search, FolderOpen, Sparkles, Database, Clock, ArrowRight, Briefcase, Activity, FileText, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-8 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 font-sans text-neutral-200">
      <div className="max-w-7xl mx-auto">

        {/* HEADER & WELCOME */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="relative">
            <div className="absolute -left-4 top-2 w-1 h-12 bg-gold-primary rounded-r-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            <h1 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400 mb-2">
              Bienvenido, <span className="text-gold-primary">Dr. Carmelo</span>
            </h1>
            <p className="text-sm text-neutral-500 font-medium tracking-widest uppercase">Resumen Ejecutivo • Lunes, 5 de Junio</p>
          </div>

          <div className="flex items-center gap-4 bg-legal-panel/80 border border-white/10 p-2.5 pr-6 rounded-full backdrop-blur-md shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-gold-gradient p-[1px] relative group cursor-pointer">
              <div className="absolute inset-0 bg-gold-primary/50 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative z-10">
                <User className="w-5 h-5 text-gold-primary" />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-0.5">Estado del Sistema</p>
              <p className="text-xs font-bold text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" /> RAG & Neon en Línea
              </p>
            </div>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stat 1 */}
          <div className="bg-gradient-to-br from-legal-panel to-[#050505] border border-white/5 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-gold-primary/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gold-primary/5 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out" />
            <div className="flex justify-between items-center relative z-10">
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">Casos Activos</p>
                <h3 className="text-4xl font-extrabold text-white tracking-tight">124</h3>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20 group-hover:scale-110 transition-transform duration-500">
                <Briefcase className="w-7 h-7 text-gold-primary" />
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-gradient-to-br from-legal-panel to-[#050505] border border-white/5 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-emerald-500/5 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out" />
            <div className="flex justify-between items-center relative z-10">
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">Precisión IA (RAG)</p>
                <h3 className="text-4xl font-extrabold text-white tracking-tight">94.2<span className="text-2xl text-emerald-500">%</span></h3>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                <Activity className="w-7 h-7 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-gradient-to-br from-legal-panel to-[#050505] border border-white/5 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-blue-500/5 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out" />
            <div className="flex justify-between items-center relative z-10">
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">Vectores (Neon DB)</p>
                <h3 className="text-4xl font-extrabold text-white tracking-tight">14.2<span className="text-2xl text-blue-500">K</span></h3>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                <FileText className="w-7 h-7 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* MÓDULOS PRINCIPALES */}
        <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 ml-2">Módulos del Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          {/* Tarjeta Nuevo Caso */}
          <div
            onClick={() => navigate('/ingreso-caso')}
            className="relative bg-[#0a0a0a] border border-white/5 hover:border-purple-500/50 p-8 rounded-[2rem] cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.2)] group flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors relative z-10">
              <FolderOpen className="w-7 h-7 text-purple-400 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">Apertura de Caso</h3>
            <p className="text-sm text-neutral-400 mb-6 line-clamp-3 flex-grow font-light leading-relaxed relative z-10">
              Ingresa un nuevo expediente legal, define la sumilla y vincula los documentos iniciales al sistema.
            </p>
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-purple-400 group-hover:gap-3 transition-all relative z-10">
              Nuevo Registro <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Tarjeta IA */}
          <div
            onClick={() => navigate('/estrategia-legal')}
            className="relative bg-[#0a0a0a] border border-white/5 hover:border-gold-primary/50 p-8 rounded-[2rem] cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.2)] group flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gold-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="w-14 h-14 rounded-2xl bg-gold-primary/10 flex items-center justify-center mb-6 border border-gold-primary/20 group-hover:bg-gold-primary/20 transition-colors relative z-10">
              <Sparkles className="w-7 h-7 text-gold-primary group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">JusticIA IA</h3>
            <p className="text-sm text-neutral-400 mb-6 line-clamp-3 flex-grow font-light leading-relaxed relative z-10">
              Genera estrategias automatizadas analizando los hechos cruzados con jurisprudencia vectorial.
            </p>
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gold-primary group-hover:gap-3 transition-all relative z-10">
              Abrir Asistente <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Tarjeta Casos */}
          <div
            onClick={() => navigate('/directorio-casos')}
            className="relative bg-[#0a0a0a] border border-white/5 hover:border-blue-500/50 p-8 rounded-[2rem] cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] group flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors relative z-10">
              <FolderOpen className="w-7 h-7 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">Directorio de Casos</h3>
            <p className="text-sm text-neutral-400 mb-6 line-clamp-3 flex-grow font-light leading-relaxed relative z-10">
              Gestiona tus expedientes, actualiza estados y revisa el progreso judicial del despacho.
            </p>
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-blue-400 group-hover:gap-3 transition-all relative z-10">
              Ver Expedientes <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Tarjeta Indexación */}
          <div
            onClick={() => navigate('/digitalizacion')}
            className="relative bg-[#0a0a0a] border border-white/5 hover:border-emerald-500/50 p-8 rounded-[2rem] cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] group flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors relative z-10">
              <Database className="w-7 h-7 text-emerald-400 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">Centro Indexación</h3>
            <p className="text-sm text-neutral-400 mb-6 line-clamp-3 flex-grow font-light leading-relaxed relative z-10">
              Sube sentencias en PDF. El sistema extraerá el texto, lo vectorizará y lo guardará en PostgreSQL.
            </p>
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-emerald-400 group-hover:gap-3 transition-all relative z-10">
              Subir Documentos <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>

        {/* ACTIVIDAD RECIENTE */}
        <div className="bg-[#050505] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[80px] pointer-events-none" />

          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold-primary" />
            Flujo de Actividad Reciente
          </h3>

          <div className="space-y-6 relative z-10">
            {/* Timeline Line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-[1px] bg-white/10 z-0" />

            {/* Actividad 1 */}
            <div className="flex items-start gap-6 group">
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center shrink-0 mt-1 group-hover:border-gold-primary/50 transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-gold-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl w-full group-hover:bg-white/[0.04] transition-colors">
                <p className="text-sm font-bold text-white mb-1">Estrategia autogenerada para EXP-2024-001</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-500 font-medium">Por JusticIA IA (Gemini 1.5 Pro)</p>
                  <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Hace 2 horas</p>
                </div>
              </div>
            </div>

            {/* Actividad 2 */}
            <div className="flex items-start gap-6 group">
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center shrink-0 mt-1 group-hover:border-emerald-500/50 transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl w-full group-hover:bg-white/[0.04] transition-colors">
                <p className="text-sm font-bold text-white mb-1">3 Documentos nuevos indexados a la base vectorial (Neon)</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-500 font-medium">Por Admin / OCR Service</p>
                  <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Hace 5 horas</p>
                </div>
              </div>
            </div>

            {/* Actividad 3 */}
            <div className="flex items-start gap-6 group">
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center shrink-0 mt-1 group-hover:border-blue-500/50 transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl w-full group-hover:bg-white/[0.04] transition-colors">
                <p className="text-sm font-bold text-white mb-1">Nuevo caso creado: "Demanda Laboral Ruiz"</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-500 font-medium">Por Dr. Martin</p>
                  <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Ayer a las 16:30 hrs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
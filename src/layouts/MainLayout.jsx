import React from 'react';
import { Search, FolderOpen, Sparkles, Database, LogOut } from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import logoJusticia from '../assets/JusticIA.png';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-legal-dark text-neutral-200 overflow-hidden">
      {/* SIDEBAR GLOBAL */}
      <div className="w-20 flex flex-col items-center py-8 bg-legal-panel border-r border-legal-border shadow-2xl z-50 shrink-0">
        <img 
          src={logoJusticia} 
          className="w-10 h-10 object-contain mb-12 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] cursor-pointer hover:scale-110 transition-transform" 
          alt="JusticIA Logo" 
          onClick={() => navigate('/dashboard')}
        />
        
        <div className="flex flex-col items-center space-y-6 flex-grow">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`p-3 rounded-xl relative group transition-all duration-300 ${isActive('/dashboard') ? 'bg-gold-primary/10 border border-gold-primary/30 text-gold-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <FolderOpen className="w-6 h-6" />
            <span className="absolute left-14 bg-black text-xs px-2 py-1 rounded border border-legal-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">Dashboard</span>
          </button>
          
          <button 
            onClick={() => navigate('/estrategia-legal')} 
            className={`p-3 rounded-xl relative group transition-all duration-300 ${isActive('/estrategia-legal') ? 'bg-gold-primary/10 border border-gold-primary/30 text-gold-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Sparkles className="w-6 h-6" />
            <span className="absolute left-14 bg-black text-xs px-2 py-1 rounded border border-legal-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">CoCounsel IA</span>
          </button>
          
          <button 
            onClick={() => navigate('/directorio-casos')} 
            className={`p-3 rounded-xl relative group transition-all duration-300 ${isActive('/directorio-casos') || isActive('/ingreso-caso') ? 'bg-gold-primary/10 border border-gold-primary/30 text-gold-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Search className="w-6 h-6" />
            <span className="absolute left-14 bg-black text-xs px-2 py-1 rounded border border-legal-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">Directorio de Casos</span>
          </button>
          
          <button 
            onClick={() => navigate('/digitalizacion')} 
            className={`p-3 rounded-xl relative group transition-all duration-300 ${isActive('/digitalizacion') ? 'bg-gold-primary/10 border border-gold-primary/30 text-gold-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Database className="w-6 h-6" />
            <span className="absolute left-14 bg-black text-xs px-2 py-1 rounded border border-legal-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">Centro de Indexación</span>
          </button>
        </div>
        
        <button onClick={() => navigate('/login')} className="p-3 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all mt-auto group relative border border-transparent">
          <LogOut className="w-6 h-6" />
          <span className="absolute left-14 bg-black text-xs px-2 py-1 rounded border border-legal-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 text-neutral-200">Cerrar Sesión</span>
        </button>
      </div>

      {/* ÁREA DE CONTENIDO DINÁMICO */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gradient-to-br from-legal-dark to-black relative">
        {/* Glow de fondo global para dar inmersión */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="relative z-10 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

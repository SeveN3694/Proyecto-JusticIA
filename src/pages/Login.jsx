import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import logoJusticia from '../assets/JusticIA.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación de roles para la demostración
    if (username.toLowerCase() === 'cliente') {
      navigate('/cliente/portal');
    } else {
      navigate('/abogado/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-legal-dark overflow-hidden">
      {/* Auras doradas dinámicas en movimiento (Usando inline styles para forzar el difuminado) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Aura 1 - Superior Izquierda */}
        <div className="absolute top-[-15%] left-[-15%] w-[600px] h-[600px] rounded-full bg-gold-primary/25 animate-blob-slow mix-blend-screen" style={{ filter: 'blur(120px)' }} />
        {/* Aura 2 - Inferior Derecha */}
        <div className="absolute bottom-[-15%] right-[-15%] w-[700px] h-[700px] rounded-full bg-gold-light/20 animate-blob-medium mix-blend-screen" style={{ filter: 'blur(140px)' }} />
        {/* Aura 3 - Centro Móvil */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-gold-primary/15 animate-blob-fast mix-blend-screen" style={{ filter: 'blur(110px)' }} />
      </div>

      {/* Efecto de desvanecimiento en bordes */}
      <div className="absolute inset-0 bg-gradient-to-t from-legal-dark via-transparent to-legal-dark pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md p-8 bg-legal-panel/85 border border-legal-border rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 flex items-center justify-center">
            <img
              src={logoJusticia}
              className="w-20 h-20 object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.65)] brightness-125 hover:scale-105 transition-all duration-300 cursor-pointer"
              alt="JusticIA Logo"
            />
          </div>
          <h1 className="text-4xl font-extrabold tracking-widest flex items-baseline justify-center">
            <span className="text-transparent bg-clip-text bg-gold-gradient">JUSTIC</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gold-primary drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] animate-pulse ml-[1px]">IA</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">LegalTech Inteligente</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Usuario / Correo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                required
                className="w-full bg-neutral-900/50 border border-legal-border rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-gold-primary/70 transition-colors"
                placeholder="abogado@estudio.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                className="w-full bg-neutral-900/50 border border-legal-border rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-gold-primary/70 transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold-gradient text-black font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity font-semibold tracking-wide shadow-lg shadow-gold-primary/10"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
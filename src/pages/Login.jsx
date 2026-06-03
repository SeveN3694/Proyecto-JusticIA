import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User } from 'lucide-react';

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
      {/* Efecto de resplandor dorado de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-glow pointer-events-none" />

      <div className="relative w-full max-w-md p-8 bg-legal-panel border border-legal-border rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-gradient-to-br from-neutral-800 to-neutral-900 border border-gold-primary/30 rounded-full mb-3">
            <Shield className="w-8 h-8 text-gold-primary" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gold-gradient">
            JUSTICIA
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
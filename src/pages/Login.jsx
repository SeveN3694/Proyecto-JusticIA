import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Sparkles, Scale, ArrowRight } from 'lucide-react';
import logoJusticia from '../assets/JusticIA.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.toLowerCase() === 'cliente') {
      navigate('/portal-cliente');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black flex overflow-hidden font-sans text-neutral-200">
      
      {/* SECCIÓN IZQUIERDA: Marca y Presentación Empresarial */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 overflow-hidden border-r border-white/5">
        {/* Fondos dinámicos */}
        <div className="absolute inset-0 bg-gradient-to-br from-legal-dark via-[#0a0a0a] to-black z-0" />
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gold-primary/5 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] bg-gold-light/5 rounded-full blur-[120px] pointer-events-none z-0" />
        
        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative group cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {/* El "tintineo" (Shimmer) simulado con un brillo rotatorio y destellos */}
            <div className="absolute inset-0 bg-gold-primary/20 blur-xl rounded-full animate-ping opacity-50" />
            <img
              src={logoJusticia}
              className={`w-12 h-12 object-contain relative z-10 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-500 ${isHovered ? 'brightness-150 scale-110' : 'brightness-125'}`}
              alt="JusticIA Logo"
            />
            {/* Destello giratorio */}
            <div className="absolute top-0 left-0 w-full h-full rounded-full border border-gold-primary/30 border-t-gold-primary animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gold-primary">
            JUSTICIA
          </h1>
        </div>

        {/* Medio: Hero Text */}
        <div className="relative z-10 mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-primary/30 bg-gold-primary/10 text-gold-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            LegalTech Enterprise
          </div>
          <h2 className="text-6xl font-light leading-tight mb-6 text-white">
            Redefiniendo la <br/>
            <span className="font-bold text-transparent bg-clip-text bg-gold-gradient">Estrategia Legal.</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-md font-light leading-relaxed">
            Potenciado por Inteligencia Artificial y bases de datos vectoriales. Analiza jurisprudencia y automatiza expedientes en milisegundos.
          </p>
        </div>

        {/* Inferior: Footer minimalista */}
        <div className="relative z-10 flex items-center gap-8 text-xs text-neutral-500 font-medium tracking-wider uppercase">
          <div className="flex items-center gap-2 hover:text-gold-primary transition-colors cursor-pointer">
            <Scale className="w-4 h-4" /> Privacidad
          </div>
          <div className="hover:text-gold-primary transition-colors cursor-pointer">Términos Legales</div>
          <div className="hover:text-gold-primary transition-colors cursor-pointer">Soporte Corporativo</div>
        </div>
      </div>

      {/* SECCIÓN DERECHA: Formulario de Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative bg-black/95">
        {/* Ruido sutil y luz de fondo */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="w-full max-w-md p-8 sm:p-12 relative z-10">
          
          {/* Logo visible solo en móviles */}
          <div className="flex lg:hidden justify-center mb-10">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gold-primary/20 blur-xl rounded-full animate-ping opacity-50" />
              <img
                src={logoJusticia}
                className="w-16 h-16 object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] brightness-125 animate-pulse"
                alt="JusticIA Logo"
              />
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-2">Bienvenido de nuevo</h3>
            <p className="text-sm text-neutral-400">Ingresa tus credenciales corporativas para acceder a tu despacho virtual.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">ID Corporativo o Correo</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/50 to-gold-primary/0 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center bg-neutral-900 border border-white/10 rounded-xl overflow-hidden transition-all group-focus-within:border-gold-primary/50 group-focus-within:bg-black">
                  <div className="pl-4 pr-3 py-4 flex items-center justify-center text-neutral-500 group-focus-within:text-gold-primary transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent py-4 pr-4 text-sm text-white focus:outline-none placeholder-neutral-700"
                    placeholder="usuario@estudio.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Contraseña Segura</label>
                <a href="#" className="text-[10px] font-bold uppercase text-gold-primary hover:text-white transition-colors">¿Olvidaste tu clave?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/50 to-gold-primary/0 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center bg-neutral-900 border border-white/10 rounded-xl overflow-hidden transition-all group-focus-within:border-gold-primary/50 group-focus-within:bg-black">
                  <div className="pl-4 pr-3 py-4 flex items-center justify-center text-neutral-500 group-focus-within:text-gold-primary transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    required
                    className="w-full bg-transparent py-4 pr-4 text-sm text-white focus:outline-none placeholder-neutral-700 tracking-widest"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full mt-4 flex items-center justify-center gap-3 bg-gold-gradient text-black font-extrabold py-4 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 tracking-wider">ACCEDER AL SISTEMA</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
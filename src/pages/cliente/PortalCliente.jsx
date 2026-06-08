import React, { useState } from 'react';
import { LogOut, User, FileText, MessageSquare, Clock, CheckCircle2, CircleDot, Circle, Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import logoJusticia from '../../assets/JusticIA.png';

export default function PortalCliente() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const enviarConsulta = async () => {
    if (!mensaje.trim()) return;

    const userMsg = mensaje;
    setChatLog(prev => [...prev, { role: 'user', content: userMsg }]);
    setMensaje('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/api/ia/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pregunta: userMsg,
          id_caso: 1,
          id_cliente: 1
        })
      });

      if (!response.ok) {
        throw new Error('Error en el servidor');
      }

      const data = await response.json();
      setChatLog(prev => [...prev, { role: 'ai', content: data.respuesta }]);
    } catch (error) {
      setChatLog(prev => [...prev, { role: 'ai', content: 'Lo siento, ha habido un problema de conexión con la IA. Por favor, intenta de nuevo.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-legal-dark text-neutral-200">
      {/* Header Extranet */}
      <div className="h-20 border-b border-legal-border bg-legal-panel/50 px-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <img src={logoJusticia} alt="JusticIA Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
          <div>
            <h1 className="text-xl font-bold text-gold-primary">JusticIA Extranet</h1>
            <p className="text-xs text-neutral-400">Portal de Transparencia para Clientes</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
              <User className="w-4 h-4 text-neutral-400" />
            </div>
            <span className="text-sm font-medium text-white">Juan Pérez</span>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 flex gap-8">
        
        {/* Columna Izquierda: Estado del Caso */}
        <div className="w-2/3 space-y-6">
          
          {/* Timeline Visual */}
          <div className="bg-legal-panel border border-legal-border rounded-2xl p-8">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-8 flex items-center gap-2">
              <span className="text-gold-primary">⟡</span> ESTADO DEL CASO: #2026-CIVIL
            </h3>
            <div className="relative flex items-center justify-between w-full px-4">
              {/* Línea conectora base */}
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-neutral-800 z-0"></div>
              {/* Línea de progreso (oro) */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 h-[2px] w-[50%] bg-gold-primary/50 z-0"></div>
              
              {/* Pasos */}
              {[
                { label: 'Ingresado', status: 'completed' },
                { label: 'Análisis Legal', status: 'completed' },
                { label: 'Diseño de Estrategia', status: 'current' },
                { label: 'Aprobado', status: 'pending' },
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step.status === 'completed' ? 'bg-gold-primary border-gold-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' :
                    step.status === 'current' ? 'bg-legal-dark border-gold-primary text-gold-primary shadow-[0_0_10px_rgba(212,175,55,0.2)]' :
                    'bg-legal-dark border-neutral-700 text-neutral-700'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                     step.status === 'current' ? <CircleDot className="w-5 h-5" /> : 
                     <Circle className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-bold ${
                    step.status === 'completed' ? 'text-neutral-300' :
                    step.status === 'current' ? 'text-gold-primary' :
                    'text-neutral-600'
                  }`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-legal-panel border border-legal-border rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-gold-primary uppercase tracking-wider mb-1 block">Expediente EXP-2024-001</span>
                <h2 className="text-2xl font-bold text-white">Divorcio por Causal</h2>
              </div>
              <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium">
                En Trámite
              </span>
            </div>
            
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Su caso se encuentra actualmente en la fase de recolección de pruebas. Nuestro equipo legal ha presentado el escrito inicial y estamos a la espera de la notificación al juzgado correspondiente. La IA sugiere que hay una alta probabilidad de resolución en los próximos 3 meses.
            </p>

            <div className="border-t border-legal-border pt-6 mt-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-primary" />
                Línea de Tiempo Reciente
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 text-xs text-neutral-500 font-medium">12 May</div>
                  <div className="flex-1 text-sm text-neutral-300">Presentación de demanda inicial en juzgado de familia.</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 text-xs text-neutral-500 font-medium">05 May</div>
                  <div className="flex-1 text-sm text-neutral-300">Firma de poderes y validación de estrategia legal con IA.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Interacción y Documentos */}
        <div className="w-1/3 space-y-6">

          <div className="bg-legal-panel border border-legal-border rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-neutral-400" />
              Mis Documentos
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-black/30 p-3 rounded-lg border border-legal-border hover:border-gold-primary/30 cursor-pointer">
                <span className="text-sm text-neutral-300">Demanda_Inicial.pdf</span>
                <span className="text-xs text-gold-primary">Ver</span>
              </div>
              <div className="flex items-center justify-between bg-black/30 p-3 rounded-lg border border-legal-border hover:border-gold-primary/30 cursor-pointer">
                <span className="text-sm text-neutral-300">Contrato_Servicios.pdf</span>
                <span className="text-xs text-gold-primary">Ver</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
        {/* Chat Window Popup */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden transform origin-bottom-right mb-4 ${isChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
          <div className="w-[400px] h-[600px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-gold-primary/20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] flex flex-col overflow-hidden">
            {/* Header Chat */}
            <div className="bg-gradient-to-r from-[#111] to-[#050505] border-b border-gold-primary/20 p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-gold-primary/20 animate-ping opacity-50" />
                  <MessageSquare className="w-5 h-5 text-gold-primary relative z-10" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white tracking-wide">Asistente JusticIA</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">En línea</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                <span className="text-neutral-400 text-lg">✕</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-gold-primary/20">
              {chatLog.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 opacity-50">
                  <MessageSquare className="w-12 h-12 text-gold-primary mb-4" />
                  <p className="text-sm text-neutral-400">Pregunte a nuestro asistente sobre el estado de su caso o conceptos legales complejos.</p>
                </div>
              )}
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-[1.5rem] p-4 text-sm shadow-lg ${msg.role === 'user' ? 'bg-gold-gradient text-black font-medium rounded-tr-sm' : 'bg-[#151515] text-neutral-200 border border-white/10 rounded-tl-sm'}`}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <div className="prose prose-sm prose-invert prose-p:leading-relaxed prose-strong:text-gold-primary prose-a:text-gold-light max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#151515] border border-white/10 rounded-[1.5rem] rounded-tl-sm p-4 text-sm text-neutral-400 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-gold-primary" /> Analizando jurisprudencia...
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-5 border-t border-white/5 bg-[#050505] shrink-0">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/20 to-transparent rounded-[1.25rem] blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-end gap-2 bg-[#111] border border-white/10 rounded-[1.25rem] p-2 focus-within:border-gold-primary/50 transition-colors">
                  <textarea 
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarConsulta(); } }}
                    placeholder="Escriba su consulta legal..."
                    className="w-full bg-transparent p-2 text-sm text-white resize-none h-10 max-h-32 focus:outline-none placeholder:text-neutral-600 scrollbar-none"
                  />
                  <button 
                    onClick={enviarConsulta}
                    disabled={isTyping || !mensaje.trim()}
                    className="w-10 h-10 rounded-xl bg-gold-primary text-black flex items-center justify-center shrink-0 disabled:opacity-50 disabled:bg-white/10 disabled:text-neutral-500 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`relative w-16 h-16 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${isChatOpen ? 'bg-[#111] border border-white/10' : 'bg-gold-gradient'}`}
        >
          {!isChatOpen && <div className="absolute inset-0 rounded-full border-2 border-gold-primary/50 animate-ping" />}
          {isChatOpen ? <span className="text-white text-2xl font-light">✕</span> : <MessageSquare className="w-7 h-7 text-black" />}
        </button>
      </div>

    </div>
  );
}
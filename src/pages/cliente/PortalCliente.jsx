import React from 'react';
import { LogOut, User, FileText, MessageSquare, Clock, CheckCircle2, CircleDot, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoJusticia from '../../assets/JusticIA.png';

export default function PortalCliente() {
  const navigate = useNavigate();

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
          <div className="bg-gradient-to-br from-gold-primary/10 to-transparent border border-gold-primary/20 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold-primary" />
              Consulte a JusticIA
            </h3>
            <p className="text-xs text-neutral-400 mb-4">Pregunte a nuestro asistente sobre el estado de su caso (disponible 24/7).</p>
            <textarea 
              placeholder="Ej: ¿Qué significa 'Fase de recolección'?"
              className="w-full bg-black/40 border border-legal-border rounded-xl p-3 text-sm resize-none h-24 mb-3 focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 outline-none"
            />
            <button className="w-full bg-gold-gradient text-black font-bold py-2 rounded-xl text-sm">
              Enviar Consulta
            </button>
          </div>

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
    </div>
  );
}
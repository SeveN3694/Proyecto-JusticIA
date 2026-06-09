import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Sparkles, Scale, FileText, CheckCircle, AlertTriangle, Loader2, Target, BrainCircuit, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { API_URL } from '../../config';

export default function EstrategiaLegal() {
  const navigate = useNavigate();
  const [hechos, setHechos] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [selectedPrecedente, setSelectedPrecedente] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (resultado && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [resultado]);

  const handleGenerate = async () => {
    if (!hechos.trim()) return;
    setIsGenerating(true);

    try {
      // Llamada real al backend FastAPI
      const response = await fetch(`${API_URL}/api/ia/estrategia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_caso: 1, // ID temporal para la demo
          descripcion_hechos: hechos,
          id_empleado_solicitante: 1 // ID temporal
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      setResultado({
        viabilidad: data.porcentaje_viabilidad || 0,
        texto_estrategia: data.borrador_generado,
        precedentes: data.precedentes_usados.map(p => ({
          archivo: p.archivo,
          pagina: p.pagina,
          similitud: p.score_similitud,
          texto: p.texto || "No se pudo recuperar el fragmento del documento."
        })),
        hitos: data.hitos_sugeridos || []
      });
      setIsGenerating(false);
    } catch (error) {
      console.error('Error al generar la estrategia:', error);
      // Fallback visual en caso de que el backend no esté encendido
      setResultado({
        viabilidad: 0,
        texto_estrategia: "# Error de Conexión\n\nNo se pudo conectar con el motor de inferencia (FastAPI). Verifica que el servidor de backend esté corriendo en el puerto 8000.",
        precedentes: [],
        hitos: []
      });
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-700 bg-black text-neutral-200 font-sans">

      {/* Navbar Superior */}
      <div className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl flex items-center px-8 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-gold-primary" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-white tracking-wide">
              Justic IA <span className="text-gold-primary font-normal">| Estrategia RAG</span>
            </h1>
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Motor de Inferencia Gemini + pgvector</p>
          </div>
        </div>
      </div>

      {/* Floating Panels Layout */}
      <div className="flex-1 overflow-hidden p-8 flex flex-col md:flex-row gap-8">

        {/* Panel Izquierdo: Input de Hechos */}
        <div className="w-full md:w-[40%] flex flex-col bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="mb-6 relative z-10 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <Scale className="w-4 h-4 text-gold-primary" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                Hechos del Caso
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mb-6 font-light leading-relaxed">
              Describe los hechos. La IA cruzará el texto con la base vectorial corporativa en milisegundos para encontrar precedentes y formular defensas.
            </p>

            <div className="relative flex-1 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/20 to-gold-primary/0 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <textarea
                value={hechos}
                onChange={(e) => setHechos(e.target.value)}
                placeholder="Ej: El cliente suscribió un contrato de arrendamiento el 01/01/2022. El inquilino dejó de pagar hace 6 meses y se niega a desocupar el inmueble..."
                className="w-full flex-1 bg-[#050505] border border-white/10 rounded-2xl p-6 text-sm text-white focus:outline-none focus:border-gold-primary/50 transition-colors resize-none relative z-10 shadow-inner"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !hechos.trim()}
            className="group relative w-full flex items-center justify-center gap-3 bg-gold-gradient text-black font-extrabold py-5 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10 mt-4"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                <span className="relative z-10 tracking-wider">PROCESANDO...</span>
              </>
            ) : (
              <>
                <BrainCircuit className="w-5 h-5 relative z-10" />
                <span className="relative z-10 tracking-wider">GENERAR ESTRATEGIA</span>
              </>
            )}
          </button>
        </div>

        {/* Panel Derecho: Resultados */}
        <div className="w-full md:w-[60%] bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden flex flex-col">

          {/* Decorative glow background */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[120px] pointer-events-none" />

          {isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center relative animate-in fade-in zoom-in duration-500">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-primary/20 rounded-full blur-3xl animate-pulse" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                  <div className="absolute inset-0 border-t-2 border-gold-primary rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
                  <div className="absolute inset-3 border-r-2 border-white/50 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                  <div className="absolute inset-6 border-b-2 border-gold-primary/30 rounded-full animate-[spin_3s_linear_infinite]" />
                  <BrainCircuit className="w-8 h-8 text-gold-primary animate-pulse" />
                </div>
                <h2 className="font-extrabold text-3xl text-transparent bg-clip-text bg-gold-gradient tracking-wide mb-3">
                  Sintetizando Estrategia...
                </h2>
                <div className="flex items-center gap-3 text-xs font-bold text-neutral-400 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Database className="w-3 h-3 text-gold-primary animate-pulse" />
                  Cruzando Vectores en Neon DB
                </div>
              </div>
            </div>
          ) : resultado ? (
            <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-700 relative z-10">

              {/* Header Reporte */}
              <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <BrainCircuit className="w-6 h-6 text-gold-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-wide">Reporte Estratégico</h3>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-1">Generado en tiempo real • Inteligencia RAG</p>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="flex items-center gap-5 bg-gradient-to-r from-[#111] to-[#0a0a0a] border border-white/10 rounded-full pl-6 pr-2 py-2 shadow-2xl">
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Viabilidad Estimada</span>
                    <span className={`text-xl font-extrabold ${resultado.viabilidad >= 70 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                      {resultado.viabilidad}%
                    </span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${resultado.viabilidad >= 70 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                    <Target className={`w-5 h-5 ${resultado.viabilidad >= 70 ? 'text-emerald-400' : 'text-yellow-400'}`} />
                  </div>
                </div>
              </div>

              {/* Body Reporte (Scrollable) */}
              <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-4 flex flex-col gap-8">

                {/* Texto */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-gold-primary/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="prose prose-invert max-w-none prose-h1:text-3xl prose-h1:font-extrabold prose-h1:tracking-wide prose-h1:text-gold-primary prose-h1:mb-6 prose-h2:text-xl prose-h2:text-white prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-bold prose-h3:text-lg prose-h3:text-gold-primary prose-h3:font-semibold prose-p:text-neutral-300 prose-p:leading-relaxed prose-li:text-neutral-300 prose-li:marker:text-gold-primary prose-strong:text-white prose-strong:font-bold prose-hr:border-white/10 prose-hr:my-8 bg-[#050505] p-10 rounded-[2rem] border border-white/5 shadow-inner relative z-10">
                    <ReactMarkdown>{resultado.texto_estrategia}</ReactMarkdown>
                  </div>
                </div>

                {/* Hitos Procesales Sugeridos */}
                {resultado.hitos && resultado.hitos.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2 ml-2">
                      <Target className="w-3 h-3 text-gold-primary" />
                      Hitos Procesales Sugeridos para Calendario
                    </h4>
                    <div className="flex flex-col gap-3 mb-8">
                      {resultado.hitos.map((hito, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-gold-primary/5 hover:border-gold-primary/20 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-black border-[2px] border-gold-primary/30 flex items-center justify-center group-hover:border-gold-primary transition-colors">
                              <span className="text-xs font-bold text-gold-primary">{i + 1}</span>
                            </div>
                            <p className="text-sm font-bold text-white tracking-wide group-hover:text-gold-primary transition-colors">{hito}</p>
                          </div>
                          <button 
                            onClick={async () => {
                              try {
                                await fetch(`${API_URL}/api/calendario`, {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ id_caso: 1, titulo_evento: hito, fecha_evento: new Date().toISOString().split('T')[0], estado: 'Pendiente' })
                                });
                                alert('Hito agregado a la agenda exitosamente.');
                              } catch(e) {
                                console.error(e);
                              }
                            }}
                            className="text-[10px] uppercase tracking-widest font-bold text-gold-primary/70 hover:text-gold-primary bg-gold-primary/10 px-3 py-1.5 rounded-full transition-colors"
                          >
                            Añadir a Agenda
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Jurisprudencia en layout horizontal de cartas de lujo */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2 ml-2">
                    <Database className="w-3 h-3 text-gold-primary" />
                    Base Jurisprudencial Utilizada (Neon DB)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resultado.precedentes.map((prec, i) => (
                      <div key={i} onClick={() => setSelectedPrecedente(prec)} className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 rounded-[1.5rem] p-6 hover:border-gold-primary/40 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.15)] transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-start justify-between mb-6">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-gold-primary/10 group-hover:scale-110 transition-all duration-500">
                            <FileText className="w-6 h-6 text-neutral-400 group-hover:text-gold-primary transition-colors" />
                          </div>
                          <span className="text-[10px] font-bold text-gold-primary bg-gold-primary/10 border border-gold-primary/20 px-3 py-1.5 rounded-full shadow-inner">
                            {(prec.similitud * 100).toFixed(1)}% Match
                          </span>
                        </div>
                        <div>
                          <p className="font-extrabold text-sm text-white mb-1.5 truncate group-hover:text-gold-primary transition-colors">{prec.archivo}</p>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-gold-primary transition-colors" />
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Página {prec.pagina}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center relative animate-in zoom-in duration-700">
              {/* Anillos concéntricos de energía */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-gold-primary/10 rounded-full animate-[ping_4s_infinite] opacity-50" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold-primary/5 rounded-full animate-[ping_5s_infinite_reverse] opacity-30" />

              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-primary/20 to-black border border-gold-primary/30 flex items-center justify-center mb-8 relative z-10 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                <BrainCircuit className="w-10 h-10 text-gold-primary" />
              </div>

              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 relative z-10 tracking-wide">
                Esperando Hechos
              </h2>
              <p className="text-sm max-w-md mt-4 text-neutral-500 relative z-10 font-light leading-relaxed">
                Ingresa los hechos del caso en el panel de la izquierda. El motor de inferencia analizará la base de datos en milisegundos para formular la estrategia en tiempo real.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Modal Precedente */}
      {selectedPrecedente && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] border border-gold-primary/20 rounded-[2rem] w-full max-w-4xl shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col max-h-[85vh] overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-[#111] flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
                  <Database className="w-5 h-5 text-gold-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm truncate max-w-md">{selectedPrecedente.archivo}</h3>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Página {selectedPrecedente.pagina}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPrecedente(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-8 overflow-y-auto flex-1">
              <p className="text-base md:text-lg leading-loose text-neutral-200 font-normal whitespace-pre-wrap">
                {selectedPrecedente.texto}
              </p>
            </div>
            <div className="p-4 border-t border-white/5 bg-[#050505] flex justify-end shrink-0">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-primary bg-gold-primary/10 px-3 py-1.5 rounded-full border border-gold-primary/20">
                Coincidencia Semántica: {(selectedPrecedente.similitud * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

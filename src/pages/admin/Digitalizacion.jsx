import React, { useState } from 'react';
import { Upload, Database, FileText, CheckCircle2, Zap, Layers, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Digitalizacion() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, processing, success
  const [processingStep, setProcessingStep] = useState(0);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setStatus('processing');
    setProcessingStep(1); 
    
    // Simulación del Pipeline OCR -> Chunking -> Vectorizing
    setTimeout(() => setProcessingStep(2), 1500);
    setTimeout(() => setProcessingStep(3), 3000);
    setTimeout(() => {
      setIsUploading(false);
      setStatus('success');
    }, 4500);
  };

  return (
    <div className="p-10 max-w-5xl mx-auto h-full flex flex-col animate-in fade-in duration-500 font-sans text-neutral-200">
      
      {/* HEADER RESTAURADO */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/5 flex items-center justify-center shadow-lg transition-colors">
            <Database className="w-8 h-8 text-gold-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-wide">
              Centro de <span className="text-gold-primary">Indexación IA</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mt-2">
              Ingesta Vectorial de Jurisprudencia • Neon DB
            </p>
          </div>
        </div>
      </div>

      {/* TARJETA CONTENEDORA PRINCIPAL CON HOVER GRADIENT OVERLAY */}
      <div className="flex-1">
        <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group hover:border-gold-primary/30 transition-colors duration-700">
          
          {/* EL EFECTO DE SOMBRA DORADA: Overlay con opacity-0 al inicio, y opacidad-100 en hover del padre (group) */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {status === 'success' ? (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500 py-8 relative z-10">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="w-full h-full bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                </div>
              </div>
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200 mb-4 tracking-wide">
                Ingesta Exitosa
              </h2>
              <div className="bg-[#111] border border-white/5 rounded-2xl p-6 max-w-lg mx-auto mb-10 shadow-inner">
                 <p className="text-sm text-neutral-400 leading-relaxed">
                   El documento <span className="text-gold-primary font-bold">{file?.name}</span> ha sido procesado por el motor OCR, fragmentado semánticamente y almacenado como <span className="text-white font-bold">vectores de alta dimensión</span> en Neon DB.
                 </p>
              </div>
              <button 
                onClick={() => { setFile(null); setStatus('idle'); setProcessingStep(0); }}
                className="group/btn relative inline-flex items-center justify-center gap-3 bg-[#111] border border-white/10 text-white font-bold py-4 px-10 rounded-full overflow-hidden hover:border-gold-primary/50 transition-all shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                <div className="absolute inset-0 bg-gold-primary/10 translate-y-[100%] group-hover/btn:translate-y-[0%] transition-transform duration-500" />
                <Upload className="w-5 h-5 relative z-10 text-gold-primary" />
                <span className="relative z-10 uppercase tracking-widest text-xs">Procesar Nuevo Archivo</span>
              </button>
            </div>
          ) : status === 'processing' ? (
             <div className="py-12 animate-in fade-in duration-500 relative z-10">
               <div className="text-center mb-16">
                 <h2 className="text-3xl font-extrabold text-white mb-2 tracking-wide">Vectorizando Documento</h2>
                 <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Por favor, no cierre esta ventana</p>
               </div>
               
               <div className="max-w-md mx-auto space-y-8 relative">
                 {/* Línea conectora */}
                 <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-white/5" />

                 {/* Step 1 */}
                 <div className={`flex items-center gap-6 relative z-10 transition-all duration-500 ${processingStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${processingStep > 1 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : processingStep === 1 ? 'bg-gold-primary/20 border-gold-primary/50 text-gold-primary shadow-[0_0_20px_rgba(212,175,55,0.3)] animate-pulse' : 'bg-[#111] border-white/10 text-neutral-500'}`}>
                     {processingStep > 1 ? <CheckCircle2 className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                   </div>
                   <div>
                     <h3 className={`font-bold text-lg ${processingStep >= 1 ? 'text-white' : 'text-neutral-500'}`}>1. Extracción OCR</h3>
                     <p className="text-xs text-neutral-400 mt-1">Leyendo contenido del PDF</p>
                   </div>
                 </div>

                 {/* Step 2 */}
                 <div className={`flex items-center gap-6 relative z-10 transition-all duration-500 ${processingStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${processingStep > 2 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : processingStep === 2 ? 'bg-gold-primary/20 border-gold-primary/50 text-gold-primary shadow-[0_0_20px_rgba(212,175,55,0.3)] animate-pulse' : 'bg-[#111] border-white/10 text-neutral-500'}`}>
                     {processingStep > 2 ? <CheckCircle2 className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
                   </div>
                   <div>
                     <h3 className={`font-bold text-lg ${processingStep >= 2 ? 'text-white' : 'text-neutral-500'}`}>2. Fragmentación Semántica</h3>
                     <p className="text-xs text-neutral-400 mt-1">Dividiendo texto en chunks con contexto</p>
                   </div>
                 </div>

                 {/* Step 3 */}
                 <div className={`flex items-center gap-6 relative z-10 transition-all duration-500 ${processingStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${processingStep > 3 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : processingStep === 3 ? 'bg-gold-primary/20 border-gold-primary/50 text-gold-primary shadow-[0_0_20px_rgba(212,175,55,0.3)] animate-pulse' : 'bg-[#111] border-white/10 text-neutral-500'}`}>
                     {processingStep > 3 ? <CheckCircle2 className="w-6 h-6" /> : <Server className="w-6 h-6" />}
                   </div>
                   <div>
                     <h3 className={`font-bold text-lg ${processingStep >= 3 ? 'text-white' : 'text-neutral-500'}`}>3. Generación de Embeddings</h3>
                     <p className="text-xs text-neutral-400 mt-1">Indexando vectores en Neon DB</p>
                   </div>
                 </div>
               </div>
             </div>
          ) : (
            <div className="space-y-10 relative z-10">

              {/* Título e Instrucciones Unificadas (Enterprise Look) */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-white tracking-wide mb-3">Base de Conocimiento</h2>
                <p className="text-sm text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
                  Alimente el cerebro de la Inteligencia Artificial. Los documentos subidos formarán parte del corpus de <span className="text-gold-primary font-semibold">búsqueda jurisprudencial cruzada</span>.
                </p>
              </div>

              {/* Drag & Drop Zone */}
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`relative overflow-hidden border-2 border-dashed rounded-[2rem] h-[320px] flex flex-col items-center justify-center text-center transition-all duration-500 cursor-pointer group/dropzone ${
                  file ? 'border-gold-primary/50 bg-gold-primary/5 shadow-[0_0_30px_rgba(212,175,55,0.15)]' : 'border-white/10 hover:border-gold-primary/40 bg-[#050505] hover:bg-[#111]'
                }`}
              >
                {/* Glow bar at top on hover */}
                {!file && (
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gold-primary shadow-[0_0_20px_rgba(212,175,55,1)] opacity-0 group-hover/dropzone:opacity-100 transition-opacity duration-500" />
                )}

                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
                
                <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer relative z-10">
                  {file ? (
                    <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gold-primary/30 blur-xl rounded-full animate-pulse" />
                        <FileText className="w-16 h-16 text-gold-primary relative z-10 mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                      </div>
                      <p className="font-extrabold text-white text-xl tracking-wide mb-1">{file.name}</p>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gold-primary/70 mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFile(null); }}
                        className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-white mt-2 px-6 py-3 rounded-full border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/20 transition-all z-20 relative"
                      >
                        Remover Archivo
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-[#111] border border-white/5 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover/dropzone:scale-110 group-hover/dropzone:border-gold-primary/30 group-hover/dropzone:bg-gold-primary/5 transition-all duration-500">
                        <Upload className="w-8 h-8 text-neutral-500 group-hover/dropzone:text-gold-primary transition-colors duration-500" />
                      </div>
                      <p className="text-white font-extrabold text-xl tracking-wide mb-3 group-hover/dropzone:text-gold-primary transition-colors duration-500">Arrastre su expediente aquí</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-hover/dropzone:text-gold-primary/60 transition-colors duration-500">O HAGA CLIC PARA EXPLORAR ARCHIVOS LOCALES</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Botón de Ingesta (Animado y Dorado) */}
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="group/btn relative w-full flex items-center justify-center gap-3 font-extrabold py-5 rounded-[1.5rem] overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed bg-gold-gradient text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] border border-gold-primary/50"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <Zap className="w-5 h-5 relative z-10" />
                <span className="relative z-10 tracking-wider">INICIAR INGESTA VECTORIAL</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

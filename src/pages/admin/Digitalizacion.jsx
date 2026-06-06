import React, { useState } from 'react';
import { UploadCloud, Database, FileText, CheckCircle2, Zap, Layers, Server } from 'lucide-react';
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
    <div className="h-full flex flex-col animate-in fade-in duration-700 bg-black text-neutral-200 font-sans relative overflow-hidden">
      
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Ejecutivo */}
      <div className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl flex items-center px-8 justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Database className="w-6 h-6 text-gold-primary" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-white tracking-wide">
              Data Core <span className="text-gold-primary font-normal">| Indexación</span>
            </h1>
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Ingesta RAG • Vectorización Neon DB</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-3xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-700">
          
          <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {status === 'success' ? (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500 py-8">
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
                className="group relative inline-flex items-center justify-center gap-3 bg-[#111] border border-white/10 text-white font-bold py-4 px-10 rounded-full overflow-hidden hover:border-gold-primary/50 transition-all shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                <div className="absolute inset-0 bg-gold-primary/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500" />
                <UploadCloud className="w-5 h-5 relative z-10 text-gold-primary" />
                <span className="relative z-10 uppercase tracking-widest text-xs">Procesar Nuevo Archivo</span>
              </button>
            </div>
          ) : status === 'processing' ? (
             <div className="py-12 animate-in fade-in duration-500">
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
              
              <div className="text-center">
                <h2 className="text-2xl font-extrabold text-white mb-3 tracking-wide">Base de Conocimiento</h2>
                <p className="text-sm text-neutral-400 font-light max-w-md mx-auto">
                  Alimente el cerebro de la Inteligencia Artificial. Los documentos subidos formarán parte del corpus de <span className="text-gold-primary font-bold">búsqueda jurisprudencial cruzada</span>.
                </p>
              </div>

              {/* Drag & Drop Zone */}
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`relative overflow-hidden border-2 border-dashed rounded-[2rem] p-16 text-center transition-all duration-500 cursor-pointer group ${
                  file ? 'border-gold-primary/50 bg-gold-primary/5' : 'border-white/10 hover:border-gold-primary/40 bg-[#050505] hover:bg-[#111]'
                }`}
              >
                {/* Glow bar at top on hover */}
                {!file && (
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gold-primary shadow-[0_0_20px_rgba(212,175,55,1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}

                {file ? (
                  <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold-primary/20 blur-xl rounded-full" />
                      <FileText className="w-16 h-16 text-gold-primary relative z-10 mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                    </div>
                    <p className="font-bold text-white text-xl tracking-wide">{file.name}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mt-2">{(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 mt-6 px-5 py-2.5 rounded-full border border-red-500/20 hover:bg-red-500/10 transition-colors"
                    >
                      Remover Archivo
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <UploadCloud className="w-10 h-10 text-neutral-400 group-hover:text-gold-primary transition-colors" />
                    </div>
                    <p className="text-white font-extrabold text-xl tracking-wide mb-2">Arrastre su expediente aquí</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">o haga clic para explorar archivos locales</p>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="group relative w-full flex items-center justify-center gap-3 bg-gold-gradient text-black font-extrabold py-5 rounded-[1.5rem] overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
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

import { motion, AnimatePresence } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BentoCard = ({ children, className, delay = 0, id }: { children: React.ReactNode, className?: string, delay?: number, id?: string }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`glass-panel p-8 rounded-[2.5rem] flex flex-col justify-between group hover:scale-[1.01] transition-transform duration-700 ${className}`}
  >
    {children}
  </motion.div>
);

/* Animation Component for USP 2: Native Affordance (Fan & Trash) */
function FanAnimation() {
  const [items, setItems] = useState([0, 1, 2, 3, 4]);
  const [isTrashAnimating, setIsTrashAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * items.length);
      const itemId = items[randomIndex];
      
      // Trigger swipe up
      setItems(prev => prev.filter(id => id !== itemId));
      setIsTrashAnimating(true);
      setTimeout(() => setIsTrashAnimating(false), 500);

      // Respawn after animation
      setTimeout(() => {
        setItems(prev => [...prev, Math.max(...prev, 0) + 1]);
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="relative w-full h-48 mt-8 flex flex-col items-center justify-end perspective-1000">
      {/* The Fan of Squares */}
      <div className="flex gap-2 relative h-32 items-end">
        <AnimatePresence>
          {items.slice(0, 5).map((id, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotate: (index - 2) * 10,
                x: (index - 2) * 10
              }}
              exit={{ 
                y: -150, 
                opacity: 0, 
                scale: 0.8,
                transition: { duration: 0.6, ease: "circIn" }
              }}
              className="w-16 h-20 rounded-xl glass-panel bg-gradient-to-br from-white/20 to-transparent border-white/30 shadow-xl flex-shrink-0"
              style={{ transformOrigin: 'bottom center' }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* The Trash Bin */}
      <motion.div 
        animate={isTrashAnimating ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
        className={`mt-10 p-4 rounded-full ${isTrashAnimating ? 'bg-orange/20 text-orange' : 'bg-white/5 text-[var(--text)]/20'} transition-colors duration-300`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
      </motion.div>
    </div>
  );
}

export function BentoGrid({ isChild = false }: { isChild?: boolean }) {
  const container = useRef<HTMLDivElement>(null);

  const wrapperClass = isChild 
    ? "w-full space-y-24" 
    : "py-32 px-6 max-w-7xl mx-auto w-full space-y-32";

  const Wrapper = isChild ? "div" : "section";

  return (
    <Wrapper id={!isChild ? "features" : undefined} ref={container} className={wrapperClass}>
      
      {/* GRID 1: PRIVACY & TECHNOLOGY */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
        <BentoCard id="privacy" className="md:col-span-8 md:row-span-2 relative min-h-[500px]">
          <div className="max-w-md z-10">
            <span className="text-orange font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">USP 1: Privacy local-first</span>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
              I tuoi ricordi. <br/> <span className="text-glow">Solo tuoi.</span>
            </h3>
            <p className="text-lg text-[var(--text)]/60 font-light leading-relaxed mb-8">
              Nido opera come un sistema a circuito chiuso. Ogni frammento di dato, ogni volto riconosciuto e ogni pattern di duplicazione viene processato nel "Nido" del tuo silicio.
            </p>
            
            {/* Detailed Balloons */}
            <div className="flex flex-wrap gap-3">
               {[
                 { t: "FaceID Analisi Locale", d: "Riconoscimento volti on-device" },
                 { t: "Zero Metadati Cloud", d: "Sempre offline" },
                 { t: "Neural Engine Only", d: "Massima velocità, zero latenza" }
               ].map((b, i) => (
                 <div key={i} className="px-4 py-2 rounded-full glass-panel border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-wider text-[var(--text)]/80">
                   {b.t}
                 </div>
               ))}
            </div>
          </div>
          <div className="absolute right-[-10%] bottom-[-5%] w-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 rotate-12">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-orange"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-4 md:row-span-1 border-white/5">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--text)]/40 mb-6 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
          </div>
          <h4 className="text-xl font-black mb-2">Metadata Scrubbing</h4>
          <p className="text-xs text-[var(--text)]/40 leading-relaxed">Rimuoviamo le tracce GPS e i dati sensibili prima di qualsiasi azione.</p>
        </BentoCard>

        <BentoCard className="md:col-span-4 md:row-span-1 border-white/5">
           <div className="flex gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
           </div>
           <h4 className="text-xl font-black mb-2">Sandbox Isolatta</h4>
           <p className="text-xs text-[var(--text)]/40 leading-relaxed">L'app vive in un'area di memoria ultra-protetta del tuo smartphone.</p>
        </BentoCard>
      </div>

      {/* GRID 2: UX & NATIVE AFFORDANCE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <BentoCard id="experience" className="md:col-span-5 md:row-span-1 min-h-[450px]">
          <div>
            <span className="text-orange font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">USP 2: Native Affordance</span>
            <h3 className="text-3xl font-black tracking-tighter mb-4 leading-none">Interfaccia <br/> Liquida.</h3>
            <p className="text-sm text-[var(--text)]/50 font-light">
              Filtri personalizzati che anticipano il tuo bisogno di spazio. Un gesto, migliaia di GB liberati.
            </p>
          </div>
          <FanAnimation />
        </BentoCard>

        <BentoCard className="md:col-span-7 md:row-span-1 bg-mint/5 border-mint/20">
            <div className="max-w-md">
                <h4 className="text-3xl font-black mb-4 text-mint">Filtri Intelligenti.</h4>
                <div className="grid grid-cols-2 gap-4">
                    {["Screenshot Inutili", "Video Pesanti", "Meme Riconosciuti", "Foto Mosse"].map((f) => (
                        <div key={f} className="p-4 rounded-2xl glass-panel border-mint/10 bg-mint/5 flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-mint">{f}</span>
                            <div className="w-4 h-4 rounded-full border border-mint/20" />
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-sm text-[var(--text)]/40 italic">
                    Nido impara cosa consideri "scarto" e te lo propone a ventaglio per una decisione rapida.
                </p>
            </div>
        </BentoCard>
      </div>

      {/* GRID 3: SECURITY & TRASH */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <BentoCard id="security" className="md:col-span-12 md:row-span-1 flex-row items-center gap-12 py-16">
            <div className="flex-1 space-y-6">
                <span className="text-mint font-bold uppercase tracking-[0.2em] text-[10px] block">USP 3: Sicurezza di eliminazione</span>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                    Il Limbo <br/> dei <span className="text-mint">30 Giorni.</span>
                </h3>
                <p className="text-lg text-[var(--text)]/50 max-w-2xl font-light">
                  Niente panico. Nido non distrugge nulla all'istante. Le tue foto finiscono in una "Safety Zone" protetta per un mese. Hai tutto il tempo di cambiare idea.
                </p>
            </div>
            <div className="hidden lg:flex w-64 h-64 rounded-[3rem] glass-panel border-mint/20 relative items-center justify-center">
                <div className="text-center z-10">
                    <span className="text-6xl font-black text-mint block">30</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-mint/40">Gradi di Sicurezza</span>
                </div>
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-10"
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full stroke-mint stroke-[0.5] fill-none">
                        <circle cx="50" cy="50" r="45" strokeDasharray="5,5" />
                    </svg>
                </motion.div>
            </div>
        </BentoCard>
      </div>

    </Wrapper>
  );
}

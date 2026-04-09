/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type FormEvent } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LiquidGlassCard } from './components/ui/LiquidGlassCard';
import { FluidBackground } from './components/ui/FluidBackground';
import { InteractiveMockup } from './components/mockup/InteractiveMockup';

import { DynamicNavbar } from './components/ui/DynamicNavbar';
import { USPOffline } from './components/sections/USPOffline';
import { USPFluid } from './components/sections/USPFluid';
import { USPZeroAnsia } from './components/sections/USPZeroAnsia';

export default function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "waitlist",
          email: email,
        }).toString(),
      });
      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col font-sans selection:bg-mint/30 overflow-x-hidden">
        <FluidBackground />
        
        <DynamicNavbar />

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative px-6 pt-48 pb-32 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8 max-w-5xl z-10"
            >
              <div className="inline-flex glass-button px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-orange mb-4 border-orange/20">
                Intelligence Privata & Offline
              </div>
              
              <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter text-panna text-glow">
                Non spazzino.<br/>
                <span className="text-orange">Curatore.</span>
              </h1>
              
              <p className="text-xl md:text-3xl text-panna/60 max-w-3xl mx-auto leading-relaxed font-light">
                Nido trasforma il caos della tua galleria in un'esperienza liquida. <br className="hidden md:block" />
                <span className="text-panna font-medium">Privacy assoluta. Azione istantanea.</span>
              </p>

              <div className="flex flex-col items-center gap-6 pt-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
                    <input
                      type="email"
                      placeholder="La tua email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow px-8 py-5 rounded-full bg-white/5 border border-white/10 focus:border-orange/50 outline-none transition-all text-panna placeholder:text-panna/20 text-lg"
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-5 bg-panna text-navy font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-panna/10 flex items-center justify-center gap-3 text-lg disabled:opacity-50"
                    >
                      {isSubmitting ? "Invio..." : "Inizia"}
                      <ArrowRight size={20} />
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4 text-mint font-bold text-xl px-10 py-5 rounded-full glass-panel border-mint/20"
                  >
                    <CheckCircle2 size={24} />
                    Sei nel Nido.
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Interactive Mockup Container */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 relative w-full max-w-[340px] md:max-w-[380px] aspect-[9/19.5]"
            >
              <div className="w-full h-full glass-panel rounded-[3.5rem] border-white/20 p-3 pt-4 shadow-2xl relative z-10">
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-navy rounded-b-2xl z-30 pointer-events-none" />
                
                {/* Mockup Screen Area */}
                <div className="w-full h-full rounded-[2.8rem] overflow-hidden relative border border-white/5">
                  <InteractiveMockup />
                </div>
              </div>
              
              {/* Glow background for mockup */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-orange/5 blur-[100px] -z-10 pointer-events-none" />
            </motion.div>
          </section>

          {/* Vision Section */}
          <section id="soluzione" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <LiquidGlassCard className="max-w-5xl mx-auto border-white/5">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter text-panna">
                      Paghi la <br/>
                      <span className="text-orange">Tassa sulla Pigrizia?</span>
                    </h2>
                    <p className="text-xl text-panna/60 font-light leading-relaxed">
                      Il 90% degli screenshot e delle foto sfocate occupano spazio prezioso solo perché richiedo fatica decisionale. <span className="text-panna font-medium text-glow">Nido decide per te, ma tu hai l'ultima parola.</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                     <div className="glass-panel p-6 rounded-3xl border-white/10 flex items-center justify-between">
                       <span className="text-panna/40 font-bold uppercase tracking-widest text-[10px]">Costo annuale inutile</span>
                       <span className="text-4xl font-black text-orange">€36.00</span>
                     </div>
                     <div className="glass-panel p-6 rounded-3xl border-mint/20 flex items-center justify-between">
                       <span className="text-mint font-bold uppercase tracking-widest text-[10px]">Risparmio con Nido</span>
                       <span className="text-4xl font-black text-mint">100%</span>
                     </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </section>

          {/* Nuove sezioni USP esplose */}
          <USPOffline />
          <USPFluid />
          <USPZeroAnsia />

          {/* Final CTA */}
          <section id="waitlist" className="py-48 px-6 text-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto space-y-12"
              >
                 <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-panna">
                   Dai respiro ai tuoi ricordi.
                 </h2>
                 <div className="flex justify-center">
                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
                        <input
                          type="email"
                          placeholder="Diventa un pioniere"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-grow px-8 py-5 rounded-full bg-white/5 border border-white/10 focus:border-mint/50 outline-none transition-all text-panna placeholder:text-panna/20 text-lg"
                        />
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="px-10 py-5 bg-mint text-navy font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-mint/10 text-lg disabled:opacity-50"
                        >
                          {isSubmitting ? "..." : "Entra ora"}
                        </button>
                      </form>
                    ) : (
                      <div className="text-mint text-3xl font-black">✨ Benvenuto in Nido.</div>
                    )}
                 </div>
              </motion.div>
          </section>
        </main>

        <footer className="py-12 px-12 border-t border-white/5 bg-navy/80 backdrop-blur-3xl">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-panna/20">
               <div className="flex items-center gap-2">
                  <div className="w-4 h-4 glass-button rounded flex items-center justify-center text-[8px] text-orange">N</div>
                  Nido App 2026 — Private Vision
               </div>
               <div className="flex gap-12">
                 <a href="#" className="hover:text-panna/50 transition-colors">Privacy</a>
                 <a href="#" className="hover:text-panna/50 transition-colors">Vision</a>
               </div>
            </div>
        </footer>
      </div>
  );
}

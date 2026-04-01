/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent, type ReactNode } from 'react';
import { Shield, Hand, Trash2, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { InteractiveMockup } from './components/mockup/InteractiveMockup';

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
      alert("Si è verificato un errore durante l'iscrizione. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-offwhite/80 backdrop-blur-md border-b border-navy/5">
        <div className="py-4 px-6 md:px-12 max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="text-2xl font-extrabold tracking-tighter text-navy flex items-center gap-2">
            <div className="w-8 h-8 bg-orange rounded-lg rotate-12 flex items-center justify-center text-white text-xs">N</div>
            Nido
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-bold uppercase tracking-widest text-navy/60">
            <a href="#problema" className="hover:text-navy transition-colors">Il Problema</a>
            <a href="#features" className="hover:text-navy transition-colors">Features</a>
            <a href="#" className="px-5 py-2 bg-navy text-white rounded-full hover:bg-navy/90 transition-all">Waitlist</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="px-6 py-12 md:py-32 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1.5 bg-peach/20 text-navy text-xs font-bold uppercase tracking-widest rounded-full">
                ✨ Il futuro dei tuoi ricordi
              </div>
              <h1 className="text-5xl md:text-8xl font-extrabold leading-[0.9] tracking-tighter text-navy">
                Non il solito <br/>
                <span className="text-orange">spazzino.</span> <br/>
                Il curatore.
              </h1>
              <p className="text-xl md:text-2xl text-navy/70 max-w-xl leading-relaxed font-medium">
                Smetti di pagare la "tassa sulla pigrizia". Nido seleziona la spazzatura offline, tu decidi cosa tenere con uno swipe. <span className="text-navy font-bold">Privacy assoluta, zero ansia.</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                  <input
                    type="email"
                    placeholder="Inserisci la tua email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-8 py-5 rounded-3xl bg-white border-2 border-navy/5 focus:border-orange outline-none transition-all shadow-sm text-lg"
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-5 bg-orange text-white font-extrabold rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange/20 flex items-center justify-center gap-3 text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Invio..." : "Entra ora"}
                    <ArrowRight size={24} />
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-4 text-mint font-bold text-xl bg-mint/10 p-6 rounded-3xl border border-mint/20"
                >
                  <CheckCircle2 size={28} />
                  Sei in lista! Controlla la tua inbox.
                </motion.div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              {/* Premium iPhone Mockup */}
              <div className="w-72 md:w-80 h-[600px] md:h-[650px] bg-navy rounded-[3.5rem] p-4 shadow-[0_50px_100px_-20px_rgba(26,43,60,0.3)] relative overflow-hidden ring-8 ring-navy/5">
                <div className="w-full h-full bg-peach rounded-[2.8rem] overflow-hidden relative">
                  {/* Interactive App Mockup Simulation */}
                  <InteractiveMockup />
                </div>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-navy rounded-b-[1.5rem] z-50 pointer-events-none" />
              </div>
            </motion.div>
            
            {/* Background Accents */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-mint/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange/10 rounded-full blur-[100px] -z-10" />
          </div>
        </section>

        {/* Marquee Section */}
        <div className="py-12 bg-navy overflow-hidden whitespace-nowrap border-y border-white/5">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-20 items-center">
                <span className="text-4xl font-extrabold text-white/20 uppercase tracking-tighter">Privacy Assoluta</span>
                <span className="text-4xl font-extrabold text-orange uppercase tracking-tighter">Zero Ansia</span>
                <span className="text-4xl font-extrabold text-white/20 uppercase tracking-tighter">AI Offline</span>
                <span className="text-4xl font-extrabold text-mint uppercase tracking-tighter">Swipe to Clean</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* The Problem Section */}
        <section id="problema" className="py-32 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter">
                Paghi anche tu la <br/>
                <span className="text-orange underline decoration-peach decoration-8 underline-offset-8">Tassa sulla Pigrizia?</span>
              </h2>
              <p className="text-xl text-navy/70 leading-relaxed font-medium">
                Il 90% delle persone smette di fare pulizia dopo 5 minuti per fatica decisionale. Il risultato? Paghiamo in media <span className="text-navy font-extrabold">36€ all'anno</span> per conservare foto sfocate e screenshot inutili.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-navy/5 relative overflow-hidden">
              <div className="text-8xl font-black text-navy/5 absolute -top-4 -right-4">36€</div>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-peach/20 rounded-full flex items-center justify-center text-peach">
                    <Trash2 size={24} />
                  </div>
                  <div className="font-bold">Foto Sfocate</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center text-mint">
                    <Shield size={24} />
                  </div>
                  <div className="font-bold">Screenshot Dimenticati</div>
                </div>
                <div className="pt-6 border-t border-navy/5">
                  <div className="text-3xl font-extrabold text-orange">Basta Sprechi.</div>
                  <p className="text-sm text-navy/50">Nido recupera il tuo spazio in pochi minuti.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto w-full space-y-20">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">Progettata per la tua pace mentale.</h2>
              <p className="text-xl text-navy/50 max-w-2xl mx-auto">Nessun trucco, solo tecnologia intelligente al servizio dei tuoi ricordi.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <FeatureCard 
                icon={<Shield size={32} />}
                color="bg-mint/10 text-mint"
                title="100% Locale & Privato"
                description="Nessuna foto lascia il tuo telefono. L'intelligenza artificiale lavora offline per garantirti privacy assoluta."
                delay={0}
              />
              <FeatureCard 
                icon={<Hand size={32} />}
                color="bg-orange/10 text-orange"
                title="Native Affordance"
                description="Niente griglie infinite. Rivedi i gruppi di foto simili e scarta la spazzatura con un semplice gesto fluido."
                delay={0.2}
              />
              <FeatureCard 
                icon={<Trash2 size={32} />}
                color="bg-peach/10 text-peach"
                title="Zero Ansia"
                description="Hai eliminato per sbaglio? Nessun problema. Hai 30 giorni per recuperare i tuoi ricordi prima che vengano cancellati."
                delay={0.4}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Final CTA */}
      <footer className="bg-navy text-offwhite py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange via-peach to-mint" />
        
        <div className="max-w-5xl mx-auto text-center space-y-16 relative z-10">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter">Fai spazio ai nuovi ricordi.</h2>
            <p className="text-offwhite/60 text-xl max-w-2xl mx-auto font-medium">
              Iscriviti oggi per avere l'accesso anticipato gratuito quando lanceremo l'app.
            </p>
          </div>

          <div className="flex justify-center">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                <input
                  type="email"
                  placeholder="La tua email migliore"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-8 py-5 rounded-[2rem] bg-white/5 border-2 border-white/10 focus:border-mint outline-none transition-all text-white placeholder:text-white/30 text-lg"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-5 bg-mint text-navy font-extrabold rounded-[2rem] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-mint/20 text-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Invio..." : "Entra nella Waitlist"}
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-mint font-extrabold text-3xl"
              >
                Benvenuto nel Nido! ✨
              </motion.div>
            )}
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-sm text-offwhite/30 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange rounded flex items-center justify-center text-white text-[10px]">N</div>
              Nido App 2026
            </div>
            <div className="flex gap-12">
              <a href="#" className="hover:text-offwhite transition-colors">Privacy</a>
              <a href="#" className="hover:text-offwhite transition-colors">Termini</a>
              <a href="#" className="hover:text-offwhite transition-colors">Contatti</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, color, title, description, delay }: { icon: ReactNode, color: string, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="p-10 rounded-[3rem] bg-offwhite border border-navy/5 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(26,43,60,0.1)] transition-all group"
    >
      <div className={`w-20 h-20 rounded-[1.5rem] ${color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <h3 className="text-2xl font-extrabold tracking-tight mb-4">{title}</h3>
      <p className="text-navy/60 leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}

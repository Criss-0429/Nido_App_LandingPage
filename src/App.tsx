/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { DynamicNavbar } from './components/ui/DynamicNavbar';
import { ExplodingMockup } from './components/mockup/ExplodingMockup';
import { USPShowcase } from './components/sections/USPShowcase';
import { GrainOverlay } from './components/ui/GrainOverlay';

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-mint/30 overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      <GrainOverlay />
      <DynamicNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 pt-48 pb-32 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-12 max-w-6xl z-10"
          >
            <h1 className="maximalist-h1">
              Non il solito spazzino.<br />
              Il <span className="text-[var(--accent)]">Curatore</span> dei tuoi ricordi.
            </h1>

            <p className="text-xl md:text-3xl text-[var(--text)]/60 max-w-3xl mx-auto leading-relaxed font-light">
              Nido non solo libera spazio, <span className="text-[var(--text)] font-medium">custodisce l'essenziale.</span> <br className="hidden md:block" />
              Tecnologia 100% locale per una privacy che ti appartiene.
            </p>

            <div className="flex flex-col items-center gap-6 pt-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
                  <input
                    type="email"
                    placeholder="Inserisci la tua email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-8 py-5 rounded-full bg-white/5 border border-white/10 focus:border-[var(--accent)]/50 outline-none transition-all text-[var(--text)] placeholder:text-[var(--text)]/20 text-lg"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-5 bg-[var(--text)] text-[var(--bg)] font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[var(--text)]/10 flex items-center justify-center gap-3 text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Invio..." : "Entra in waitlist"}
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
        </section>

        {/* Engineering / USPs Section - Height handled by GSAP pinSpacing */}
        <section id="engineering" className="relative py-16 md:py-32 px-6 max-w-7xl mx-auto w-full scroll-mt-24">
          <div className="mb-20 md:mb-32 text-center relative z-10">
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-[var(--text)]">
              Custodia <span className="text-[var(--accent)]">Consapevole.</span>
            </h2>
            <p className="text-xl md:text-2xl text-[var(--text)]/60 max-w-2xl mx-auto font-light leading-relaxed">
              Il controllo torna nelle tue mani. Ogni pixel è curato per te.
            </p>
          </div>

          {/* Main Showcase Layout */}
          <div className="relative">
            <div className="showcase-wrapper flex flex-col md:flex-row gap-12 md:gap-24 items-center min-h-[60vh] md:min-h-0">
              {/* Left: Fixed Mockup Anchor */}
              <div className="w-full md:w-[40%] flex justify-center">
                <div className="relative">
                  <ExplodingMockup isStatic />
                </div>
              </div>

              {/* Right: Modern STEP Showcase */}
              <div className="w-full md:w-[60%] h-full min-h-[500px] md:h-screen relative">
                <USPShowcase />
              </div>
            </div>

            {/* Navigation Anchors - Programmatic Triggers positioned at each 100vh of the scroll */}
            <div className="hidden md:block absolute top-0 left-0 w-full pointer-events-none z-0">
              <div id="privacy-trigger" className="h-[100vh] scroll-mt-32" />
              <div id="filters-trigger" className="h-[100vh] scroll-mt-32" />
              <div id="experience-trigger" className="h-[100vh] scroll-mt-32" />
              <div id="security-trigger" className="h-[100vh] scroll-mt-32" />
            </div>
          </div>
        </section>

        {/* Vision Section / Conversion */}
        <section id="waitlist" className="py-24 md:py-48 px-6 text-center bg-[var(--text)]/5 rounded-[4rem] mx-6 mb-32 border border-[var(--border-color)] scroll-mt-24">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-16"
          >
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-[var(--text)] leading-none uppercase">
              Il tuo Nido. <span className="text-[var(--accent)]">I tuoi ricordi.</span>
            </h2>
            <div className="flex justify-center">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
                  <input
                    type="email"
                    placeholder="Inserisci la tua email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-8 py-5 rounded-full bg-white/5 border border-white/10 focus:border-[var(--accent)]/50 outline-none transition-all text-[var(--text)] placeholder:text-[var(--text)]/20 text-lg"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-5 bg-[var(--text)] text-[var(--bg)] font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[var(--text)]/10 flex items-center justify-center gap-3 text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Invio..." : "Entra in waitlist"}
                    <ArrowRight size={20} />
                  </button>
                </form>
              ) : (
                <div className="text-[var(--accent)] text-4xl font-black italic underline decoration-wavy underline-offset-8">✨ Benvenuto in Nido.</div>
              )}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-24 px-12 border-t border-[var(--border-color)] bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <button
            onClick={scrollToTop}
            className="flex flex-col items-center gap-4 group cursor-pointer"
          >
            <img src="/logo/DarkModeLogo.svg" alt="Nido Logo" className="w-12 h-12 group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out logo-dark" />
            <img src="/logo/LogoNidoApp.svg" alt="Nido Logo" className="w-12 h-12 group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out logo-light" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text)]/20 group-hover:text-[var(--text)] transition-colors">Torna Su</span>
          </button>

          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text)]/30 border-t border-[var(--border-color)] pt-12">
            <div>Nido App 2026 — Visionary Engineering</div>
            <div className="flex gap-12">
              <a href="#" className="hover:text-[var(--text)] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--text)] transition-colors">Manifesto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

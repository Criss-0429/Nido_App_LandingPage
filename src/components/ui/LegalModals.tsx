import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function LegalModals() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'privacy' | 'cookie' | null>(null);

  useEffect(() => {
    const handleOpen = (e: any) => setActiveTab(e.detail);
    window.addEventListener('open-legal', handleOpen);
    return () => window.removeEventListener('open-legal', handleOpen);
  }, []);

  if (!activeTab) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[var(--bg)]/80 backdrop-blur-xl"
          onClick={() => setActiveTab(null)}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl max-h-[85vh] glass-panel rounded-[3rem] overflow-hidden flex flex-col shadow-3xl border-white/20"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                {activeTab === 'privacy' ? <ShieldCheck size={24} /> : <FileText size={24} />}
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">
                  {activeTab === 'privacy' ? 'Privacy Policy' : 'Cookie Policy'}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Ultimo aggiornamento: Aprile 2026</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab(null)}
              className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-8 scrollbar-hide">
            {activeTab === 'privacy' ? (
              <div className="space-y-6 text-[var(--text)]/80 leading-relaxed font-light">
                <section className="space-y-3">
                  <h4 className="text-lg font-bold text-[var(--text)]">1. Titolare del Trattamento</h4>
                  <p>Il titolare del trattamento per Nido App è Cristian La Porta. I dati raccolti (esclusivamente l'indirizzo email per la waitlist) sono trattati nel rispetto del GDPR.</p>
                </section>
                <section className="space-y-3">
                  <h4 className="text-lg font-bold text-[var(--text)]">2. Tipologia di dati raccolti</h4>
                  <p>Attraverso questo sito raccogliamo esclusivamente l'indirizzo email fornito volontariamente dall'utente per l'iscrizione alla lista d'attesa (Waitlist). L'elaborazione delle foto avviene esclusivamente in locale sul dispositivo dell'utente e nessun dato multimediale viene trasmesso ai nostri server.</p>
                </section>
                <section className="space-y-3">
                  <h4 className="text-lg font-bold text-[var(--text)]">3. Finalità del trattamento</h4>
                  <p>La finalità principale è l'invio di aggiornamenti relativi al lancio di Nido App e la gestione della lista d'attesa degli utenti interessati.</p>
                </section>
                <section className="space-y-3">
                  <h4 className="text-lg font-bold text-[var(--text)]">4. Luogo e Modalità del trattamento</h4>
                  <p>I dati sono conservati su server sicuri tramite il servizio Netlify Forms e non vengono ceduti a terze parti per finalità di marketing.</p>
                </section>
              </div>
            ) : (
              <div className="space-y-6 text-[var(--text)]/80 leading-relaxed font-light">
                <section className="space-y-3">
                  <h4 className="text-lg font-bold text-[var(--text)]">Cosa sono i Cookies</h4>
                  <p>I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.</p>
                </section>
                <section className="space-y-3">
                  <h4 className="text-lg font-bold text-[var(--text)]">Cookie Tecnici</h4>
                  <p>Questo sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento della sessione e alla memorizzazione delle tue preferenze sulla privacy.</p>
                </section>
                <section className="space-y-3">
                  <h4 className="text-lg font-bold text-[var(--text)]">Cookie di Terze Parti</h4>
                  <p>Potremmo utilizzare servizi di analisi (come Google Analytics, se abilitato) per monitorare il traffico in modo anonimo, al solo fine di migliorare l'esperienza utente.</p>
                </section>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-white/10 bg-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 opacity-40">
              <Lock size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Connessione Protetta SSL</span>
            </div>
            <button
              onClick={() => setActiveTab(null)}
              className="px-8 py-3 bg-[var(--accent)] text-[var(--bg)] rounded-xl font-black uppercase tracking-widest text-[10px]"
            >
              Ho Capito
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

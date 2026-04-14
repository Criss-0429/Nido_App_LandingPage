import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function LanguageMenu() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-[200]">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[var(--text)] text-[var(--bg)] rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
        aria-label="Cambia lingua"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Globe size={28} className="group-hover:scale-110 transition-transform" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            className="absolute bottom-20 left-0 w-64 glass-panel p-6 rounded-[2rem] space-y-6 pointer-events-auto"
            role="dialog"
            aria-label={t('language')}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-black uppercase tracking-tighter">{t('language')}</h3>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => { setLanguage('it'); setIsOpen(false); }}
                className={`w-full py-4 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${language === 'it' ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-white/5 hover:bg-white/10'}`}
              >
                ITALIANO
              </button>
              <button 
                onClick={() => { setLanguage('en'); setIsOpen(false); }}
                className={`w-full py-4 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${language === 'en' ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-white/5 hover:bg-white/10'}`}
              >
                ENGLISH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cookie, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function CookieBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    marketing: false,
    stats: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        // Fallback
      }
    }

    const handleOpen = () => setIsVisible(true);
    window.addEventListener('open-cookie-settings', handleOpen);
    return () => window.removeEventListener('open-cookie-settings', handleOpen);
  }, []);

  const handleAcceptAll = () => {
    const allOn = { necessary: true, marketing: true, stats: true };
    setPreferences(allOn);
    saveAndClose(allOn);
  };

  const handleRejectAll = () => {
    const onlyNecessary = { necessary: true, marketing: false, stats: false };
    setPreferences(onlyNecessary);
    saveAndClose(onlyNecessary);
  };

  const saveAndClose = (prefs: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allSelected = preferences.marketing && preferences.stats;
  const someSelected = preferences.marketing || preferences.stats;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl z-[300]"
      >
        <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] shadow-2xl border-white/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-transparent" />
          
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                  <Cookie size={20} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter">{t('cookieTitle')}</h3>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors opacity-40 hover:opacity-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-[var(--text)]/70 leading-relaxed font-light">
              {t('cookieDesc')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-2">
              <CookieToggle 
                active={preferences.necessary} 
                disabled={true}
                label={t('cookieNecessary')} 
                onClick={() => {}}
              />
              <CookieToggle 
                active={preferences.marketing} 
                label={t('cookieMarketing')} 
                onClick={() => togglePreference('marketing')}
              />
              <CookieToggle 
                active={preferences.stats} 
                label={t('cookieStats')} 
                onClick={() => togglePreference('stats')}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 pt-2">
              <button 
                onClick={handleRejectAll}
                className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all"
              >
                {t('cookieRejectAll')}
              </button>
              <button 
                onClick={() => allSelected ? handleAcceptAll() : saveAndClose(preferences)}
                className={`flex-[1.5] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl transition-all ${
                  allSelected 
                    ? "bg-[var(--accent)] text-[var(--bg)] shadow-[var(--accent)]/20 hover:scale-[1.02]" 
                    : "bg-white/10 text-[var(--text)] border border-white/20 hover:bg-white/20"
                } active:scale-95`}
              >
                {allSelected ? t('cookieAcceptAll') : t('cookieAcceptSelected')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CookieToggle({ active, label, onClick, disabled = false }: { active: boolean, label: string, onClick: () => void, disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
        active 
          ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--text)]" 
          : "bg-white/5 border-white/10 opacity-40 hover:opacity-100"
      } ${disabled ? "cursor-default opacity-100" : "cursor-pointer"}`}
    >
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${active ? "bg-[var(--accent)] text-[var(--bg)]" : "bg-white/10"}`}>
        {active && <Check size={12} strokeWidth={4} />}
      </div>
    </button>
  );
}

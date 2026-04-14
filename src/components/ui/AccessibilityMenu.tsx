import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Contrast, Type, EyeOff, Underline, RotateCcw, X, Plus, Minus, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const AccessibilityIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="8" r="1" />
    <path d="M7 11c2 0 3 1.5 5 1.5s3-1.5 5-1.5" />
    <path d="M12 12.5v4" />
    <path d="M9 20l3-3.5 3 3.5" />
  </svg>
);

export function AccessibilityMenu() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [readableFont, setReadableFont] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [underlineLinks, setUnderlineLinks] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-accessibility', handleToggle);
    return () => window.removeEventListener('toggle-accessibility', handleToggle);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-high-contrast', highContrast.toString());
    root.setAttribute('data-grayscale', grayscale.toString());
    root.setAttribute('data-readable-font', readableFont.toString());
    root.style.setProperty('--font-scale', fontScale.toString());
    
    if (underlineLinks) {
      document.body.classList.add('underline-links');
    } else {
      document.body.classList.remove('underline-links');
    }
  }, [highContrast, grayscale, readableFont, fontScale, underlineLinks]);

  const resetAll = () => {
    setHighContrast(false);
    setGrayscale(false);
    setReadableFont(false);
    setFontScale(1);
    setUnderlineLinks(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[var(--text)] text-[var(--bg)] rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
        aria-label="Opzioni di accessibilità"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <AccessibilityIcon size={28} className="group-hover:scale-110 transition-transform" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="absolute bottom-20 right-0 w-80 glass-panel p-6 rounded-[2rem] space-y-6 pointer-events-auto"
            role="dialog"
            aria-label={t('accessibilityTitle')}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-black uppercase tracking-tighter">{t('accessibilityTitle')}</h3>
              <button 
                onClick={resetAll}
                className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 flex items-center gap-1 transition-opacity"
              >
                <RotateCcw size={10} /> {t('accessibilityReset')}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <AccessButton 
                active={highContrast} 
                onClick={() => setHighContrast(!highContrast)} 
                icon={<Contrast size={18} />} 
                label={t('lowContrast')} 
              />
              <AccessButton 
                active={grayscale} 
                onClick={() => setGrayscale(!grayscale)} 
                icon={<EyeOff size={18} />} 
                label={t('grayscale')} 
              />
              <AccessButton 
                active={readableFont} 
                onClick={() => setReadableFont(!readableFont)} 
                icon={<Type size={18} />} 
                label={t('readableFont')} 
              />
              <AccessButton 
                active={underlineLinks} 
                onClick={() => setUnderlineLinks(!underlineLinks)} 
                icon={<Underline size={18} />} 
                label={t('underlineLinks')} 
              />
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest opacity-60">{t('textSize')}</span>
                  <span className="text-xs font-black">{Math.round(fontScale * 100)}%</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setFontScale(Math.max(0.8, fontScale - 0.1))}
                    className="flex-grow py-3 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10"
                  >
                    <Minus size={16} />
                  </button>
                  <button 
                    onClick={() => setFontScale(Math.min(2, fontScale + 0.1))}
                    className="flex-grow py-3 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AccessButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
        active 
          ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]" 
          : "bg-white/5 border-white/10 hover:border-white/20"
      }`}
    >
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest text-center">{label}</span>
    </button>
  );
}

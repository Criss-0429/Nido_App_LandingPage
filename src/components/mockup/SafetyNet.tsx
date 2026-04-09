import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { MagneticButton } from '../ui/MagneticButton';

interface SafetyNetProps {
  onNavigate: (screen: string) => void;
}

export function SafetyNet({ onNavigate }: SafetyNetProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-8 relative bg-navy">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="mb-12"
      >
        <div className="w-32 h-32 rounded-full glass-panel border-mint/30 flex items-center justify-center text-mint shadow-[0_0_50px_rgba(138,231,191,0.2)]">
          <ShieldCheck size={60} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-black text-panna mb-4 tracking-tighter text-glow">
          Ottimo lavoro!
        </h1>
        <p className="text-xs text-panna/40 font-bold uppercase tracking-widest leading-loose">
          Hai liberato <span className="text-mint">450 MB</span> di spazio fisico e mentale.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full flex flex-col items-center gap-6"
      >
        <MagneticButton 
          className="w-full bg-panna text-navy"
          onClick={() => onNavigate('dashboard')}
        >
          Svuota il Nido
        </MagneticButton>

        <button
          onClick={() => onNavigate('dashboard')}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-panna/20 hover:text-panna transition-colors"
        >
          Torna alla dashboard
        </button>
      </motion.div>
    </div>
  );
}

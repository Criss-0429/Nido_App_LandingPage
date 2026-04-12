import { ShieldCheck, ArrowRight, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SuccessProps {
  onNavigate: (screen: string) => void;
}

export function Success({ onNavigate }: SuccessProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-[var(--bg)] text-center relative overflow-hidden transition-colors duration-500">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-mint/5 blur-[100px] rounded-full scale-125 pointer-events-none" />

      {/* Hero Illustration */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-12 relative"
      >
        <div className="w-40 h-40 rounded-full bg-mint/10 border-2 border-mint/20 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-mint/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <ShieldCheck size={80} className="text-mint drop-shadow-[0_0_20px_rgba(138,231,191,0.5)]" strokeWidth={1.5} />
        </div>
        {/* Particle blobs */}
        <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-12 h-12 bg-mint/20 blur-xl rounded-full"
        />
      </motion.div>

      {/* Success Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-12 relative z-10"
      >
        <h1 className="text-3xl font-black text-[var(--text)] leading-tight">
          Ottimo lavoro!<br />
          <span className="text-mint">450 MB liberati.</span>
        </h1>
        <p className="text-sm text-[var(--text)]/40 leading-relaxed max-w-[240px] mx-auto">
          Hai scartato 140 screenshot inutili. Sono al sicuro nel tuo Nido per i prossimi 30 giorni.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full space-y-4 relative z-10"
      >
        <button
          className="w-full py-4 rounded-full bg-orange text-[var(--bg)] font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(242,149,89,0.3)]"
        >
          Svuota il Nido ora
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-4 rounded-full bg-[var(--text)]/5 border border-[var(--border-color)] text-[var(--text)]/60 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:text-[var(--text)] transition-all"
        >
          Vai alla Dashboard
          <ArrowRight size={14} />
        </button>

        <div className="pt-6">
            <button className="inline-flex items-center gap-2 text-[10px] font-bold text-mint/60 hover:text-mint transition-colors tracking-widest uppercase">
                <Share2 size={12} />
                Condividi il risultato
            </button>
        </div>
      </motion.div>
    </div>
  );
}

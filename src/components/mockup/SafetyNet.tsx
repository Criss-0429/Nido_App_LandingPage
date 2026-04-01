import { Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface SafetyNetProps {
  onNavigate: (screen: string) => void;
}

export function SafetyNet({ onNavigate }: SafetyNetProps) {
  return (
    <div
      className="h-full min-h-full flex flex-col items-center justify-center px-8 relative w-full"
      style={{ backgroundColor: '#F9F9F7' }}
    >
      {/* Illustration */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        className="mb-12"
      >
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#8AE7BF' }}
        >
          <Shield size={80} strokeWidth={1.5} style={{ color: '#1A2B3C' }} />
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12"
      >
        <h1 className="mb-4 text-3xl font-bold" style={{ color: '#1A2B3C' }}>
          Ottimo lavoro!
          <br />
          Hai liberato 450 MB.
        </h1>
        <p className="text-sm opacity-70 leading-relaxed font-medium" style={{ color: '#1A2B3C' }}>
          Hai scartato tutti gli screenshot inutili. Ricorda: sono stati
          <br />
          spostati nel tuo Nido di sicurezza.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm space-y-4"
      >
        {/* Primary Button */}
        <button
          className="w-full py-4 rounded-full shadow-sm transition-transform active:scale-[0.98] font-bold"
          style={{
            backgroundColor: '#F29559',
            color: '#FFFFFF'
          }}
        >
          Svuota definitivamente ora
        </button>

        {/* Secondary Button */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-4 text-center underline transition-opacity hover:opacity-70 active:opacity-50 font-medium"
          style={{ color: '#1A2B3C' }}
        >
          Torna alla dashboard
        </button>
      </motion.div>
    </div>
  );
}

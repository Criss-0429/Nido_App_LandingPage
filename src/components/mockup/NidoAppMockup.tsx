import { useState } from 'react';
import { Dashboard } from './screens/Dashboard';
import { ReviewRoom } from './screens/ReviewRoom';
import { Success } from './screens/Success';
import { AnimatePresence, motion } from 'motion/react';

type Screen = 'dashboard' | 'review' | 'success';

export function NidoAppMockup() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[var(--bg)] transition-colors duration-500">
      <AnimatePresence mode="wait">
        <motion.div
           key={currentScreen}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.3, ease: 'easeInOut' }}
           className="absolute inset-0"
        >
            {currentScreen === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
            {currentScreen === 'review' && <ReviewRoom onNavigate={handleNavigate} />}
            {currentScreen === 'success' && <Success onNavigate={handleNavigate} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

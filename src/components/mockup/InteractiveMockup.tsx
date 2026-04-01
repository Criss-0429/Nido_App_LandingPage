import { useState } from 'react';
import { ContextDashboard } from './ContextDashboard';
import { ReviewRoom } from './ReviewRoom';
import { SafetyNet } from './SafetyNet';
import { motion, AnimatePresence } from 'motion/react';

type Screen = 'dashboard' | 'review' | 'success';

export function InteractiveMockup() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#F9F9F7]" style={{ fontFamily: '-apple-system, SF Pro Rounded, system-ui, sans-serif' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
           key={currentScreen}
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 1.05 }}
           transition={{ duration: 0.3 }}
           className="w-full h-full absolute inset-0"
        >
          {currentScreen === 'dashboard' && <ContextDashboard onNavigate={handleNavigate} />}
          {currentScreen === 'review' && <ReviewRoom onNavigate={handleNavigate} />}
          {currentScreen === 'success' && <SafetyNet onNavigate={handleNavigate} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

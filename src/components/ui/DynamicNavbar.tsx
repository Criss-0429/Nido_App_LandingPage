import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

export function DynamicNavbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center py-6">
      <motion.div
        initial={false}
        animate={{
          width: isScrolled ? "min(90%, 600px)" : "min(90%, 1200px)",
          borderRadius: isScrolled ? "9999px" : "1.5rem",
          backgroundColor: isScrolled ? "rgba(10, 17, 24, 0.4)" : "rgba(10, 17, 24, 0.2)",
          paddingLeft: isScrolled ? "1.5rem" : "2rem",
          paddingRight: isScrolled ? "1.5rem" : "2rem",
          paddingTop: isScrolled ? "0.75rem" : "1rem",
          paddingBottom: isScrolled ? "0.75rem" : "1rem",
          backdropFilter: "blur(32px)",
          border: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.05)",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
        className="flex justify-between items-center shadow-2xl"
      >
        <div className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-2 text-panna">
          <div className="w-8 h-8 glass-button rounded-xl flex items-center justify-center text-orange text-xs font-bold border-white/20">N</div>
          {!isScrolled && <span>Nido</span>}
        </div>

        <div className="flex gap-4 md:gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-panna/60">
          <a href="#offline" className="hover:text-panna transition-colors">Privacy</a>
          <a href="#fluid" className="hover:text-panna transition-colors">Sistema</a>
          <a href="#ansia" className="hover:text-panna transition-colors">Sicurezza</a>
        </div>

        <a 
          href="#waitlist" 
          className={`glass-button rounded-full text-[11px] font-bold uppercase tracking-widest text-panna transition-all ${
            isScrolled ? "px-4 py-2" : "px-6 py-2"
          }`}
        >
          {isScrolled ? "Join" : "Accesso"}
        </a>
      </motion.div>
    </nav>
  );
}

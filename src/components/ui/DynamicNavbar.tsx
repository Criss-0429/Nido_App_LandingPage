import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center py-6 px-4 sm:px-0">
      <motion.div
        initial={false}
        animate={{
          width: isScrolled ? "min(100%, 680px)" : "min(100%, 1200px)",
          borderRadius: isScrolled ? "9999px" : "1.5rem",
          backgroundColor: isScrolled ? "rgba(var(--bg-rgb), 0.6)" : "transparent",
          paddingLeft: isScrolled ? "1.5rem" : "2rem",
          paddingRight: isScrolled ? "1.5rem" : "2rem",
          paddingTop: isScrolled ? "0.75rem" : "1rem",
          paddingBottom: isScrolled ? "0.75rem" : "1rem",
          backdropFilter: isScrolled ? "blur(32px)" : "none",
          border: isScrolled ? "1px solid var(--border-color)" : "1px solid transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
        className="flex justify-between items-center shadow-2xl overflow-hidden"
      >
        <button 
          onClick={scrollToTop}
          className="text-xl font-black tracking-tighter flex items-center gap-3 text-[var(--text)] group"
        >
          <img 
            src="/logo/DarkModeLogo.svg" 
            alt="Nido Logo" 
            className="w-10 h-10 group-hover:scale-110 transition-transform duration-500 logo-dark"
          />
          <img 
            src="/logo/LogoNidoApp.svg" 
            alt="Nido Logo" 
            className="w-10 h-10 group-hover:scale-110 transition-transform duration-500 logo-light"
          />
          {!isScrolled && <span className="hidden sm:block">Nido</span>}
        </button>

        <div className="flex items-center gap-4 md:gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text)]/40">
          <button onClick={() => scrollToSection('privacy')} className="hover:text-[var(--text)] transition-colors">Privacy</button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-[var(--text)] transition-colors">Experience</button>
          <button onClick={() => scrollToSection('security')} className="hover:text-[var(--text)] transition-colors">Sicurezza</button>
        </div>

        <div className="flex items-center gap-4">
           <ThemeToggle />
           <button 
            onClick={() => scrollToSection('waitlist')}
            className={`transition-all duration-300 bg-[var(--text)] text-[var(--bg)] rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 ${
              isScrolled ? "px-5 py-2" : "px-8 py-3"
            }`}
          >
            {isScrolled ? "Pionieri" : "Diventa un Pionere"}
          </button>
        </div>
      </motion.div>
    </nav>
  );
}

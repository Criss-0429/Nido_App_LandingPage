import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function DynamicNavbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0, autoKill: false },
      ease: "power4.inOut"
    });
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 80, autoKill: false },
        ease: "power3.inOut"
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToUSP = (index: number) => {
    const st = ScrollTrigger.getById("usp-scroll");
    if (st) {
      const scrollPos = st.start + (index * (st.end - st.start) / 3);
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: scrollPos, autoKill: false },
        ease: "power4.out"
      });
    } else {
      // Mobile fallback: scroll to the DOM element
      const element = document.getElementById(`usp-step-${index}`);
      if (element) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: element, offsetY: 100, autoKill: false },
          ease: "power3.inOut"
        });
      }
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: 'Privacy', onClick: () => scrollToUSP(0) },
    { label: 'Filtri', onClick: () => scrollToUSP(1) },
    { label: 'Nativa', onClick: () => scrollToUSP(2) },
    { label: 'Sicurezza', onClick: () => scrollToUSP(3) },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 flex justify-center py-4 md:py-6 px-4">
      <motion.div
        initial={false}
        animate={{
          width: isMenuOpen ? "100%" : isScrolled ? "min(100%, 680px)" : "min(100%, 1200px)",
          height: isMenuOpen ? "100vh" : "auto",
          borderRadius: isMenuOpen ? "0px" : isScrolled ? "9999px" : "1.5rem",
          backgroundColor: isMenuOpen ? "var(--bg)" : isScrolled ? "rgba(var(--bg-rgb), 0.6)" : "transparent",
          backdropFilter: isScrolled || isMenuOpen ? "blur(32px)" : "none",
          border: isScrolled && !isMenuOpen ? "1px solid var(--border-color)" : "1px solid transparent",
        }}
        className="flex flex-col shadow-2xl overflow-hidden relative"
      >
        {/* Main Header Row */}
        <div className="flex justify-between items-center px-6 py-3 min-h-[64px]">
          {/* Logo / Menu Trigger */}
          <motion.button 
            onClick={() => {
                if (window.innerWidth < 768) {
                    if (isMenuOpen) scrollToTop();
                    else setIsMenuOpen(true);
                }
                else scrollToTop();
            }}
            animate={{ rotate: isMenuOpen ? 180 : 0, scale: isMenuOpen ? 0.9 : 1 }}
            className="text-xl font-black tracking-tighter flex items-center gap-3 text-[var(--text)] group z-[110]"
          >
            <div className="relative w-10 h-10">
                <img 
                    src="/logo/DarkModeLogo.svg" 
                    alt="Nido Logo" 
                    className="absolute inset-0 w-full h-full group-hover:scale-110 transition-transform duration-500 logo-dark"
                />
                <img 
                    src="/logo/LogoNidoApp.svg" 
                    alt="Nido Logo" 
                    className="absolute inset-0 w-full h-full group-hover:scale-110 transition-transform duration-500 logo-light"
                />
            </div>
            {!isScrolled && !isMenuOpen && <span className="hidden sm:block">Nido</span>}
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text)]/40">
            {navLinks.map(link => (
                <button key={link.label} onClick={link.onClick} className="hover:text-[var(--text)] transition-colors">
                    {link.label}
                </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:block">
                <ThemeToggle />
             </div>
             <button 
                onClick={() => scrollToSection('waitlist')}
                className={`transition-all duration-300 bg-[var(--text)] text-[var(--bg)] rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 ${
                isScrolled ? "px-5 py-2" : "px-8 py-3"
                }`}
            >
                {isScrolled ? "Riserva" : "Riserva il tuo posto"}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex-grow flex flex-col items-center justify-center gap-12 p-12"
            >
              <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0 } }}
                  onClick={scrollToTop}
                  className="text-5xl font-black uppercase tracking-tighter text-[var(--accent)]"
              >
                  Home
              </motion.button>

              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: (i + 1) * 0.1 } }}
                  onClick={link.onClick}
                  className="text-5xl font-black uppercase tracking-tighter text-[var(--text)]"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="mt-8">
                <ThemeToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>

  );
}

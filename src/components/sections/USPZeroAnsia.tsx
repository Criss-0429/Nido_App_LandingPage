import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export function USPZeroAnsia() {
  const container = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    gsap.from(visualRef.current, {
      x: 100,
      opacity: 0,
      scale: 0.9,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: container });

  return (
    <section id="ansia" ref={container} className="py-24 md:py-48 px-6 min-h-screen flex items-center justify-center relative overflow-hidden bg-navy">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Text Left */}
        <div ref={textRef} className="space-y-8 text-left">
          <div className="inline-flex glass-button px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-peach border-peach/20 shadow-xl liquid-shine">
            Zero Ansia
          </div>
          <h2 className="text-5xl md:text-[5.5rem] font-black leading-[0.85] tracking-tighter text-panna">
            Sbagliato <br/>
            <span className="text-peach">a cancellare?</span> <br/>
            Nessun peso.
          </h2>
          <p className="text-xl md:text-2xl text-panna/60 font-light leading-relaxed max-w-lg">
            Il cestino vitreo di Nido conserva tutto per 30 giorni. Sei sempre al sicuro. Respira.
          </p>
        </div>

        {/* Media Right */}
        <div ref={visualRef} className="relative aspect-square flex items-center justify-center">
          <div className="absolute inset-0 bg-peach/10 blur-[120px] rounded-full scale-125" />
          <div className="glass-panel w-full h-full rounded-[3.5rem] border-white/20 p-8 flex items-center justify-center relative backdrop-blur-3xl overflow-hidden group liquid-shine liquid-shine-peach">
            <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-peach/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
            {/* Struttura che simula un cestino o scudo */}
            <div className="relative w-full h-full flex items-center justify-center flex-col">
              <img src="icon-trash-glass.png" className="w-1/2 h-1/2 drop-shadow-[0_0_50px_rgba(245,184,165,0.5)] transition-transform duration-700 group-hover:-translate-y-4 mb-4" alt="Trash Icon" />
              <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-3 border-peach/30 shadow-[0_0_30px_rgba(245,184,165,0.4)] liquid-shine">
                <span className="w-2 h-2 rounded-full bg-peach animate-pulse"></span>
                <span className="text-sm font-bold text-panna tracking-widest">30 GIORNI</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Blobs (Parallax) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-peach/5 blur-[120px] rounded-full" />
      </div>
    </section>
  );
}

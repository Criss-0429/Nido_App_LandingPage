import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export function USPFluid() {
  const container = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);

  useGSAP(() => {
    gsap.from(visualRef.current, {
      x: -100,
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

    gsap.from(textRef.current, {
      x: 100,
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
  }, { scope: container });

  return (
    <section id="fluid" ref={container} className="py-24 md:py-48 px-6 min-h-screen flex items-center justify-center relative overflow-hidden bg-navy/20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Media Left */}
        <div ref={visualRef} className="relative aspect-square flex items-center justify-center order-2 md:order-1">
          <div className="absolute inset-0 bg-mint/10 blur-[120px] rounded-full scale-125" />
          <div className="glass-panel w-full h-full rounded-[3.5rem] border-white/20 p-8 flex flex-col items-center justify-center relative backdrop-blur-3xl overflow-hidden group liquid-shine liquid-shine-mint">
            <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-mint/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
            <img src="icon-hand-glass.png" className="w-1/2 h-1/2 drop-shadow-[0_0_50px_rgba(138,231,191,0.5)] transition-transform duration-700 group-hover:scale-110 mb-8" alt="Hand Icon" />
            <div className="w-full flex justify-between items-end px-4 border-t border-white/10 pt-6">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-mint mb-1">Recuperato</span>
                    <span className="text-3xl font-black text-panna">4.8GB</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-mint mb-1">Duplicati</span>
                    <span className="text-3xl font-black text-panna">1.2k</span>
                </div>
            </div>
          </div>
        </div>

        {/* Text Right */}
        <div ref={textRef} className="space-y-8 text-left order-1 md:order-2">
          <div className="inline-flex glass-button px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-mint border-mint/20 shadow-xl liquid-shine">
            Native Interface
          </div>
          <h2 className="text-5xl md:text-[5.5rem] font-black leading-[0.85] tracking-tighter text-panna">
            Fluidità <br/>
            <span className="text-mint">nativa,</span> <br/>
            senza sforzo.
          </h2>
          <p className="text-xl md:text-2xl text-panna/60 font-light leading-relaxed max-w-lg">
            Raggruppamento automatico di duplicati e screenshot. Scorri i ricordi con la stessa naturalezza con cui li hai catturati.
          </p>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-mint/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}

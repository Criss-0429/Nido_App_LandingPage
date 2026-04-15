import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export function USPOffline() {
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
      scale: 0.8,
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
    <section id="offline" ref={container} className="py-24 md:py-48 px-6 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div ref={textRef} className="space-y-8 text-left">
          <div className="inline-flex glass-button px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-orange border-orange/20 shadow-xl liquid-shine">
            Privacy Assoluta
          </div>
          <h2 className="text-5xl md:text-[5.5rem] font-black leading-[0.85] tracking-tighter text-panna">
            La tua vita <br/>
            <span className="text-orange">non appartiene</span> <br/>
            al cloud.
          </h2>
          <p className="text-xl md:text-2xl text-panna/60 font-light leading-relaxed max-w-lg">
            Nessuna immagine viene mai caricata. La nostra AI "Liquid Intelligence" vive nel palmo della tua mano per una sicurezza totale che non scende a compromessi.
          </p>
        </div>
        <div ref={visualRef} className="relative aspect-square flex items-center justify-center">
          <div className="absolute inset-0 bg-orange/10 blur-[120px] rounded-full scale-125" />
          <div className="glass-panel w-full h-full rounded-[3.5rem] border-white/20 p-8 flex items-center justify-center relative backdrop-blur-3xl overflow-hidden group liquid-shine liquid-shine-orange">
            <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-orange/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
            <img src="/icon-shield-glass.png" className="w-1/2 h-1/2 drop-shadow-[0_0_50px_rgba(242,149,89,0.5)]" alt="Shield Icon" />
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-orange/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}

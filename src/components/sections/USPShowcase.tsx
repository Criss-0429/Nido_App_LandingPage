import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface USPStep {
  id: string;
  tag: string;
  title: string | React.ReactNode;
  description: string;
  icon?: string;
  color: string;
  stats?: Array<{ label: string; value: string }>;
}

const steps: USPStep[] = [
  {
    id: "privacy",
    tag: "Privacy Assoluta",
    color: "orange",
    title: <>La tua vita <br/><span className="text-[var(--accent)]">non appartiene</span><br/>al cloud.</>,
    description: "Nessuna immagine viene mai caricata. La nostra Liquid Intelligence vive nel palmo della tua mano per una sicurezza totale.",
    icon: "/icon-shield-glass.svg"
  },
  {
    id: "experience",
    tag: "Native Interface",
    color: "mint",
    title: <>Fluidità <br/><span className="text-[var(--accent)]">nativa,</span><br/>senza sforzo.</>,
    description: "Raggruppamento automatico di duplicati e screenshot. Scorri i ricordi con la stessa naturalezza con cui li hai catturati.",
    icon: "/icon-hand-glass.svg",
    stats: [
        { label: "Recuperato", value: "4.8GB" },
        { label: "Duplicati", value: "1.2k" }
    ]
  },
  {
    id: "security",
    tag: "Zero Ansia",
    color: "peach",
    title: <>Sbagliato <br/><span className="text-[var(--accent)]">a cancellare?</span><br/>Nessun peso.</>,
    description: "Il cestino vitreo di Nido conserva tutto per 30 giorni. Sei sempre al sicuro. Respira profondo.",
    icon: "/icon-trash-glass.svg"
  }
];

export function USPShowcase({ isStatic = false }: { isStatic?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Create the timeline for the steps
      // No scope here to allow pinning the parent '.showcase-wrapper'
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".showcase-wrapper", // Pin the specific wrapper in App.tsx
          start: "top top",
          end: "+=300%", // Scroll depth for 3 steps
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Initial state: Hide all steps except the first
      gsap.set(stepsRef.current.slice(1), { opacity: 0, y: 150, rotateX: 10, scale: 0.9, visibility: "hidden" });

      // Animate steps in and out
      stepsRef.current.forEach((step, index) => {
        if (index === 0) {
            // Fade out first step as we move to second
            tl.to(step, { 
                opacity: 0, 
                y: -100, 
                scale: 0.9, 
                rotateX: -10,
                visibility: "hidden", 
                duration: 1 
            }, 0.5);
            return;
        }

        // Feature IN: Slangy, liquid entrance
        tl.fromTo(step, 
          { y: 150, opacity: 0, visibility: "hidden", scale: 0.9, rotateX: 15 },
          { y: 0, opacity: 1, visibility: "visible", scale: 1, rotateX: 0, duration: 1, ease: "power3.out" },
          index - 0.5
        );
        
        // Feature OUT (if not the last one)
        if (index < stepsRef.current.length - 1) {
            tl.to(step, {
                opacity: 0,
                y: -100,
                scale: 0.9,
                rotateX: -15,
                visibility: "hidden",
                duration: 1,
                ease: "power3.in"
            }, index + 0.5);
        }
      });
    });
  }, { dependencies: [isStatic] });

  return (
    <div ref={container} className="relative w-full h-full min-h-[600px] md:min-h-0 flex flex-col md:block items-center justify-center">
      {steps.map((step, index) => (
        <div 
          key={index}
          id={step.id} // Re-add for mobile/direct fallback
          ref={(el) => { if (el) stepsRef.current[index] = el; }}
          className={`
            w-full flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 py-12 md:py-0
            md:absolute md:inset-0
            ${index === 0 ? 'opacity-100 z-10' : 'md:opacity-0 md:z-0'}
          `}
        >
          {/* Tag */}
          <div className={`inline-flex glass-button px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] border-[var(--accent)]/20 shadow-xl`}>
            {step.tag}
          </div>

          {/* Title - Usando drop-shadow per leggibilità su sfondi chiari/scuri */}
          <h2 className="text-5xl md:text-[5.5rem] font-black leading-[0.85] tracking-tighter text-[var(--text)]">
            {step.title}
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-[var(--text)]/60 font-light leading-relaxed max-w-lg">
            {step.description}
          </p>

          {/* Visual Element (Icon/Stats) Inside a Glass Panel */}
          <div className="w-full max-w-sm mt-8">
            <div className="glass-panel p-8 rounded-[3rem] border-white/20 relative group overflow-hidden">
               {/* Internal texture/blur for premium feel */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
               <div className="flex flex-col items-center relative z-10">
                  {step.icon && (
                    <img 
                      src={step.icon} 
                      alt="Icon" 
                      className="w-32 h-32 mb-8 drop-shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] transition-transform duration-700 group-hover:scale-110" 
                    />
                  )}
                  {step.stats && (
                    <div className="w-full grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                      {step.stats.map((s, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-1 opacity-60">{s.label}</span>
                          <span className="text-3xl font-black text-[var(--text)]">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

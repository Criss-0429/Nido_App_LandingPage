import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
    tag: "100% Locale",
    color: "orange",
    title: <>Privacy <br/><span className="text-[var(--accent)]">Silenziosa,</span><br/>solo per te.</>,
    description: "I tuoi ricordi non vanno da nessuna parte. Tutto succede offline, sul tuo telefono. È la sicurezza emotiva di sapere che i tuoi momenti privati restano tali.",
    icon: "/icon-shield-glass.svg"
  },
  {
    id: "filters",
    tag: "Consapevolezza",
    color: "mint",
    title: <>Tu vedi,<br/><span className="text-[var(--accent)]">Nido riflette.</span></>,
    description: "Nido riconosce scontrini e screenshot, ma non decide al posto tuo. Ti aiuta a vedere cosa ingombra, così puoi scegliere cosa custodire con un gesto leggero.",
    icon: "/icon-filter-glass.svg"
  },
  {
    id: "experience",
    tag: "Un Respiro",
    color: "peach",
    title: <>Un gesto <br/><span className="text-[var(--accent)]">naturale,</span><br/>come sfogliare.</>,
    description: "Curare la propria galleria non deve essere un lavoro. Con uno swipe fluido riscopri i tuoi scatti migliori e liberi spazio con naturalezza, senza fatica.",
    icon: "/icon-hand-glass.svg"
  },
  {
    id: "security",
    tag: "Zero Ansia",
    color: "orange",
    title: <>Il diritto <br/><span className="text-[var(--accent)]">di ripensarci</span><br/>senza paura.</>,
    description: "Niente scompare per errore. Le foto scartate riposano nel Cestino per 30 giorni, protette da ogni distrazione. Fare spazio non è mai stato così sicuro.",
    icon: "/icon-trash-glass.svg"
  }
];

export function USPShowcase({ isStatic = false }: { isStatic?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const innerWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Single ScrollTrigger for Pinning and Scrubbing
      gsap.to(innerWrapper.current, {
        y: () => {
             const height = innerWrapper.current?.offsetHeight || 0;
             const containerHeight = container.current?.offsetHeight || 0;
             return -(height - containerHeight);
        },
        ease: "none",
        scrollTrigger: {
          id: "usp-scroll",
          trigger: ".showcase-wrapper",
          start: "top top",
          end: "+=300%", // Adjusted for 4 slides
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });
    });
  }, { dependencies: [isStatic] });

  return (
    <div 
      ref={container} 
      className="relative w-full h-auto md:h-screen px-4 md:px-16 md:[mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] md:[webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
    >
      <div ref={innerWrapper} className="flex flex-col">
        {steps.map((step, index) => (
          <div 
            key={index}
            id={`usp-step-${index}`}
            className="w-full flex-shrink-0 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 py-16 md:min-h-[80vh] overflow-visible mb-[5vh] scroll-mt-32"
          >
            {/* Tag */}
            <div className={`inline-flex glass-button px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] border-[var(--accent)]/20 shadow-xl`}>
              {step.tag}
            </div>

            {/* Title */}
            <h2 className="text-5xl md:text-[5.5rem] font-black leading-[0.85] tracking-tighter text-[var(--text)]">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-[var(--text)]/60 font-light leading-relaxed max-w-xl">
              {step.description}
            </p>

            {/* Visual Element (Icon/Stats) Inside a Glass Panel */}
            <div className="w-full max-w-sm mt-8">
              <div className="glass-panel p-8 rounded-[3rem] border-white/20 relative group overflow-visible">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[3rem]" />
                 <div className="flex flex-col items-center relative z-10">
                    {step.icon && (
                      <img 
                        src={step.icon} 
                        alt="Icon" 
                        className="w-32 h-32 mb-8 drop-shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] transition-transform duration-700 group-hover:scale-110" 
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
    </div>
  );
}

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function USPShowcase({ isStatic = false }: { isStatic?: boolean }) {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const innerWrapper = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: "privacy",
      tag: t('usp1Tag'),
      title: t('usp1Title'),
      description: t('usp1Desc'),
      icon: "icon-shield-glass.png",
      color: "rgba(242, 149, 89, 0.4)"
    },
    {
      id: "filters",
      tag: t('usp2Tag'),
      title: t('usp2Title'),
      description: t('usp2Desc'),
      icon: "icon-filter-glass.png",
      color: "rgba(103, 196, 245, 0.4)"
    },
    {
      id: "experience",
      tag: t('usp3Tag'),
      title: t('usp3Title'),
      description: t('usp3Desc'),
      icon: "icon-hand-glass.png",
      color: "rgba(138, 231, 191, 0.4)"
    },
    {
      id: "security",
      tag: t('usp4Tag'),
      title: t('usp4Title'),
      description: t('usp4Desc'),
      icon: "icon-trash-glass.png",
      color: "var(--color-orange)"
    }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
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
          end: "+=300%",
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
            <div 
              style={{ "--tag-color": step.color, borderColor: `${step.color}33` } as React.CSSProperties}
              className={`inline-flex glass-button usp-tag px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl`}
            >
              {step.tag}
            </div>

            <h2 className="text-5xl md:text-[5.5rem] font-black leading-[1.1] tracking-tighter text-[var(--text)]">
              {step.title.split(',').map((part, i) => (
                <React.Fragment key={i}>
                  {i === 1 ? (
                    <><br /><span style={{ color: step.color }}>{part}</span>{" "}</>
                  ) : (
                    <>{part}{" "}</>
                  )}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-xl md:text-2xl text-[var(--text)]/60 font-light leading-relaxed max-w-xl">
              {step.description}
            </p>

            <div className="w-full max-w-sm mt-8">
              <div className="glass-panel p-8 rounded-[3rem] border-white/20 relative group overflow-visible">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[3rem]" />
                 <div className="flex flex-col items-center relative z-10">
                    {step.icon && (
                      <img 
                        src={step.icon} 
                        alt="Icon" 
                        style={{ filter: `drop-shadow(0 0 20px ${step.color}44)` }}
                        className="w-32 h-32 mb-8 transition-transform duration-700 group-hover:scale-110" 
                      />
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

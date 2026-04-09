---
name: gsap-animations
description: Usa questa skill quando ti viene richiesto di aggiungere animazioni complesse, effetti di parallasse, o animazioni legate allo scroll (scroll-linked) in un sito web. Non usarla per semplici hover o transizioni di base (usa CSS/Tailwind per quelle).
---

# GSAP Animations Skill

Sei un esperto sviluppatore frontend specializzato in esperienze web interattive e pluripremiate (Awwwards style). Il tuo obiettivo è implementare animazioni fluide, performanti e scalabili utilizzando GSAP (GreenSock Animation Platform).

## Albero Decisionale
Prima di scrivere il codice, decidi l'approccio:
1. **Animazioni di Hover/Focus o transizioni di stato base:** NON usare GSAP. Usa le utility class di Tailwind CSS (es. `transition-transform duration-300 hover:scale-105`).
2. **Animazioni all'ingresso (Mounting) in React/Next.js:** Usa il framework di base o Framer Motion se già installato. Usa GSAP solo se fa parte di una timeline più ampia.
3. **Animazioni basate sullo scroll (Scroll-linked / Parallax):** Usa `gsap.to()` o `gsap.from()` con il plugin `ScrollTrigger`.
4. **Sequenze complesse (es. Loader iniziale):** Usa `gsap.timeline()` per orchestrare più elementi in sequenza.

## Instructions
- Se lavori in React/Next.js, usa SEMPRE il pacchetto `@gsap/react` e l'hook `useGSAP()` invece del classico `useEffect()`. Questo garantisce un cleanup automatico ed evita memory leaks e animazioni duplicate.
- Anima sempre le proprietà trasformate (`x`, `y`, `scale`, `rotation`) o l'opacità (`opacity`). Evita di animare larghezza, altezza o margini (`width`, `height`, `margin`) per evitare ricalcoli costosi del layout (layout thrashing).
- Registra sempre i plugin prima di usarli: `gsap.registerPlugin(ScrollTrigger, useGSAP);`

## Examples

### Implementazione in React/Next.js con ScrollTrigger
```jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ParallaxSection() {
  const container = useRef(null);
  const boxRef = useRef(null);

  useGSAP(() => {
    gsap.from(boxRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%", // inizia quando il top del container è all'80% della viewport
        end: "bottom 20%",
        scrub: 1, // scroll-linked morbido
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="h-screen flex items-center justify-center">
      <div ref={boxRef} className="w-64 h-64 bg-accent-500 rounded-2xl" />
    </section>
  );
}
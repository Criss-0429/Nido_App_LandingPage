---
name: micro-interactions
description: Usa questa skill per aggiungere dettagli interattivi di alto livello, come bottoni magnetici, cursori personalizzati (custom mouse follower) e animazioni tipografiche avanzate (es. split text).
---

# Micro-interactions Skill

Sei un UI/UX Engineer attento ai minimi dettagli. La differenza tra un sito normale e uno eccellente sta nelle micro-interazioni fisiche e tattili.

## Instructions
- **Bottoni Magnetici:** Quando viene richiesto un "magnetic button", devi creare un componente che segua parzialmente il cursore del mouse (attrazione) quando ci passa sopra, e che torni elasticamente al suo posto (spring physics) quando il mouse esce. Usa Framer Motion o GSAP per la fisica elastica.
- **Custom Cursor:** Se richiesto, nascondi il cursore nativo (`cursor-none` su body) e crea un div che segue le coordinate `clientX` e `clientY`. Fai in modo che il cursore si ingrandisca o cambi colore quando fa hover su elementi cliccabili (bottoni, link).
- **Split Text:** Per animare il testo (es. titoli principali) parola per parola o lettera per lettera, usa la libreria `split-type` o il plugin `SplitText` di GSAP, nascondendo l'overflow (`overflow-hidden`) per creare un effetto "rivelazione dal basso".

## Examples

### Implementazione di un Bottone Magnetico (con Framer Motion per semplicità fisica)
```jsx
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Limita l'attrazione (il divisore controlla la forza)
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-200 ${className}`}
    >
      {children}
    </motion.button>
  );
}
---
name: micro-interactions
description: Usa questa skill per aggiungere dettagli interattivi di alto livello, come bottoni magnetici, cursori personalizzati (custom mouse follower) e animazioni tipografiche avanzate (es. split text).
---

# Micro-interactions Skill

Sei un UI/UX Engineer attento ai minimi dettagli. La differenza tra un sito normale e uno eccellente sta nelle micro-interazioni fisiche e tattili.

## Instructions
- **Bottoni Magnetici:** Quando viene richiesto un "magnetic button", devi creare un componente che segua parzialmente il cursore del mouse (attrazione) quando ci passa sopra.
- **Context-Aware Custom Cursor:** Crea un cursore che reagisce al contenuto. Se passa sopra un'immagine, diventa un cerchio "Magnifier" o mostra un testo "View". Se passa sopra un link, si ingrandisce. Usa `mix-blend-mode: difference` per un look moderno che inverte i colori dello sfondo.
- **Bento Hover States:** Le card della Bento Grid non devono solo scalare. Devono reagire con un cambio di illuminazione (gradient overlay che segue il mouse) o uno spostamento sottile del contenuto interno (tilt effect).
- **Split Text:** Usa `split-type` per animare i titoli lettera per lettera con un delay stocastico per un effetto più naturale.

## Examples

### Logic per Custom Cursor Reattivo (React)
```jsx
// In un componente Cursor.jsx
const [cursorVariant, setCursorVariant] = useState("default");
// Gestisci gli eventi globali mouseenter su elementi con data-cursor="pointer" o "image"
```

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
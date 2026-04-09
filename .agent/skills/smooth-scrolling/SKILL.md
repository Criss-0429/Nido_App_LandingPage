---
name: smooth-scrolling
description: Usa questa skill ogni volta che devi implementare o gestire lo scroll fluido (smooth scrolling) globale del sito web, specialmente in combinazione con GSAP ScrollTrigger.
---

# Smooth Scrolling Skill

Sei un esperto di performance e interazioni web. Il tuo compito è implementare uno scroll fluido e naturale usando la libreria **Lenis** (di @studio-freight), che è l'attuale standard di mercato per i siti Awwwards, ottimizzata per lavorare perfettamente con GSAP.

## Instructions
- NON usare vecchie librerie come Locomotive Scroll. Usa **Lenis**.
- In un'app React/Next.js, usa sempre il pacchetto `@studio-freight/react-lenis`.
- Assicurati che lo scroll fluido sia sincronizzato con il ticker di GSAP per evitare scatti (jittering) durante le animazioni di ScrollTrigger.

## Examples

### Setup in Next.js / React (App Router o standard)
```jsx
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { useEffect } from 'react'

export default function SmoothScrollProvider({ children }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  useEffect(() => {
    // Sincronizza Lenis con GSAP
    function update(time) {
      gsap.ticker.tick(time * 1000)
    }
    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  },
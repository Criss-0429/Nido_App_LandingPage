# 🤖 AGENT SKILL: MOBILE UI/UX EXPERT (Agent_Mobile_Fix.md)

## IL TUO RUOLO
Agisci come Lead Frontend Developer specializzato in Mobile-First Design e conversioni su smartphone. 

## TASK
La landing page attuale di "Nido App" ha bisogno di una revisione drastica per i dispositivi mobili (schermi < 768px). Gli utenti apriranno questo link al 90% da smartphone.

## DIRETTIVE DI REFACTORING (TAILWIND CSS)

**1. Il "Nido-Burger Menu" (Custom UX):**
- **Elimina** l'icona standard del menu ad hamburger (`<Menu />` o SVG a 3 linee) in visualizzazione mobile.
- **Sostituiscila** con il logo stesso dell'app (la "N" di Nido o il logo SVG). 
- *Comportamento:* Su mobile, il logo deve essere centrato o a destra. Quando l'utente fa TAP sul logo, questo deve animarsi (es. leggera rotazione o scale-down) e far aprire il menu/overlay. Questo rende l'interazione più "brandizzata" e proprietaria.

**2. Gestione degli Spazi (Whitespace) su Mobile:**
Attualmente gli spazi sono calcolati per desktop e risultano eccessivi o rotti su mobile.
- Sulle section container, usa `padding-y` adattivi: `py-12 md:py-24`.
- Per le griglie delle USP (le 3 card), assicurati che su mobile siano impilate: `flex-col md:flex-row` oppure `grid-cols-1 md:grid-cols-3`.
- Riduci il gap su mobile: usa `gap-6` su mobile e `gap-12` su desktop.

**3. Gerarchia Tipografica Mobile:**
- L'headline della Hero su desktop potrebbe essere `text-5xl` o `text-6xl`, ma su mobile si rompe. Impostala a `text-4xl md:text-6xl`.
- Il testo dei paragrafi deve essere leggibile senza zoom: forza un `text-base md:text-lg`.
- La line-height (interlinea) deve essere `leading-relaxed` per migliorare la leggibilità.

**4. Ergonomia e Touch Target (Thumb Zone):**
- I bottoni della Waitlist e gli input form su mobile devono avere un'altezza minima di 48px (`h-12`) per essere facilmente cliccabili con il pollice, senza rischiare miss-click.
- L'input dell'email e il bottone CTA su mobile devono essere in colonna (`flex-col w-full`), occupando il 100% della larghezza. Su desktop possono tornare in linea (`md:flex-row`).

## OUTPUT RICHIESTO
Analizza il codice attuale del file principale (es. `page.tsx` o `index.html`) e applica queste modifiche Tailwind. Restituisci il codice corretto, assicurandoti che non vi siano spazi bianchi infiniti (rimuovi eventuali `h-screen` impropri dalle sezioni centrali).
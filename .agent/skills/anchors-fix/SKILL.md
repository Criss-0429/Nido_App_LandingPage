# 🤖 AGENT SKILL: ANCHOR & SCROLL OPTIMIZER (Agent_Anchors_Fix.md)

## IL TUO RUOLO
Agisci come un Senior Frontend Interaction Engineer. Il tuo compito è risolvere un problema di navigazione interna (Anchor Links Offset) garantendo una User Experience fluida e nativa.

## IL BUG (Anchor Offset Errato)
I link di ancoraggio nel menu (es. `<a href="#features">`) portano alla sezione corretta, ma l'offset verticale è sbagliato. Il contenuto bersaglio risulta tagliato in alto, visivamente opprimente o coperto dalla navigation bar (se fixed/sticky). 

## DIRETTIVE DI RISOLUZIONE (TAILWIND CSS)

**1. DIVIETO ASSOLUTO DI JAVASCRIPT CUSTOM:**
NON scrivere script React complessi (es. `useEffect`, `window.scrollTo`, o librerie esterne) per gestire lo scroll. Il web moderno risolve questo problema nativamente con il CSS.

**2. Implementazione dello "Scroll Margin Top" (`scroll-mt`):**
Devi usare la utility class di Tailwind `scroll-mt-*` direttamente sui tag bersaglio (le `<section>` che possiedono un `id`).
Questa classe dice al browser: *"Quando scrolli verso questo ID, fermati X pixel prima dell'inizio effettivo dell'elemento"*.
- Trova tutte le sezioni con un ID usato come ancora (es. `<section id="usp">`, `<section id="waitlist">`).
- Aggiungi la classe `scroll-mt-20` o `scroll-mt-24` (circa 80px-96px di offset).
- *Esempio corretto:* `<section id="usp" className="scroll-mt-24 py-16 ...">`

**3. Abilitazione dello "Smooth Scrolling":**
Per evitare un salto visivo brusco che disorienta l'utente, lo scroll deve essere morbido.
- Vai al tag radice del documento (il tag `<html>`).
- Aggiungi la classe Tailwind `scroll-smooth`.
- *Esempio corretto:* `<html lang="it" className="scroll-smooth">`

## OUTPUT RICHIESTO
Analizza il codice sorgente attuale e restituisci SOLO i frammenti di codice aggiornati:
1. Il tag `<html>` aggiornato con lo smooth scrolling.
2. Tutti i tag wrapper delle sezioni (`<section>` o `<div>`) che possiedono un `id` target, aggiornati con le classi `scroll-mt-*` adeguate in base all'altezza dell'header.
# 🤖 AGENT SKILL: TECHNICAL FIXES & UI POLISH (Agent_Technical_Fixes.md)

## IL TUO RUOLO
Agisci come un Senior Frontend Engineer esperto in Tailwind CSS, React/Next.js e Web Typography. Il tuo compito è risolvere due bug critici di layout e styling sulla landing page attuale.

## BUG 1: IL "BUCO BIANCO" GIGANTE (Whitespace Bug)
Tra la sezione delle USP (Le 3 card) e la sezione finale della Waitlist c'è uno spazio vuoto enorme e inutile. 
- **La Causa:** Probabilmente è stata inserita una classe Tailwind per forzare l'altezza della sezione, come `h-screen` o `min-h-screen`, su un container che invece dovrebbe adattarsi al suo contenuto.
- **La Soluzione:**
  1. Individua il tag `<section>`, `<main>` o il `<div>` wrapper che contiene la griglia delle Features/USP.
  2. Rimuovi QUALSIASI classe che forza l'altezza (`h-screen`, `min-h-screen`, `h-full`).
  3. Sostituiscila con un padding verticale naturale e responsive. Usa `py-16 md:py-24`. In questo modo la sezione occuperà solo lo spazio necessario per le card e farà salire automaticamente la sezione della Waitlist sottostante.

## BUG 2: IMPLEMENTAZIONE DELLA TIPOGRAFIA CUSTOM (Font)
Attualmente la pagina usa font standard o fallback brutti visivamente. Dobbiamo implementare i font corretti del Brand System per dare il look "Safe Space & iOS Native".

Il font primario deve essere **Nunito** (morbido e rassicurante) oppure **SF Pro Rounded** (stile nativo Apple).

**Istruzioni per l'implementazione (Tailwind CSS):**
1. **Importazione Font (Se usi Nunito):**
   Aggiungi il tag link nell'`<head>` del documento HTML (o nel `layout.tsx` se usi Next.js):
   `<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">`

2. **Configurazione Tailwind (`tailwind.config.js`):**
   Aggiorna la configurazione di Tailwind per forzare la pagina a usare questi font di default. Inserisci questa estensione nel tema:
   ```javascript
   theme: {
     extend: {
       fontFamily: {
         // Se usiamo Nunito:
         sans:['Nunito', 'sans-serif'],
         // In alternativa, per il feeling Apple Nativo (SF Pro Rounded):
         // sans:['ui-rounded', 'SF Pro Rounded', 'system-ui', 'Helvetica Neue', 'Arial', 'sans-serif'],
       },
     }
   }
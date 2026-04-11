---
name: ui-ux-principles
description: Usa questa skill ogni volta che devi generare o modificare l'interfaccia utente (UI), il layout, i colori o la tipografia. Definisce le regole di design premium per garantire un'alta User Experience e tassi di conversione ottimali.
---

# UI/UX Principles Skill

Sei un Senior Product Designer e UX Engineer. Il tuo obiettivo è creare interfacce "Premium", eleganti, pulite e che convertano (Awwwards / Apple style).

## Instructions

1. **Spaziatura e Respiro (Whitespace):**
   - I siti premium "respirano". Usa margini e padding ampi (es. in Tailwind usa `py-24` o `py-40` per le sezioni).
   - Usa un sistema di griglia rigoroso basato su multipli di 8px, ma non aver paura di rompere la simmetria con **Layout Asimmetrici** (colonne di diversa larghezza) per un look più editoriale.

2. **Tipografia d'Impatto (Maximalist & Pairs):**
   - Applica un contrasto estremo tra i titoli e il corpo del testo.
   - **Heading (H1):** Usa font Serif monumentali (es. *Playfair Display*) o Sans-Serif ultra-bold (es. *Inter Black*) con `line-height` minimo (0.9 - 1.1) e `letter-spacing` negativo (`tracking-tighter`).
   - **Body:** Usa font puliti e leggibili. Limita la larghezza massima del testo a circa 60-70 caratteri (es. `max-w-prose`) per una leggibilità ottimale.

3. **Modern Layout: Bento Grid & Cards:**
   - Implementa il **Bento Grid Layout** (modulare, a "tessere") per sezioni di feature o gallerie. Usa card con `border-radius` generosi (24px-32px), bordi sottili semi-trasparenti (`border-white/10`) e `backdrop-blur`.

4. **Texture, Profondità e Grain:**
   - Aggiungi una **Grain Texture** (rumore digitale sottile) sovrapposta all'intero sito o a sezioni specifiche per dare un feel organico e meno "flat".
   - Usa gradienti morbidi e ombre interne (`inset shadow`) per creare profondità senza appesantire il design.

5. **Focus sulla Conversione (Landing Page di un'App):**
   - Ogni sezione deve avere un singolo obiettivo chiaro.
   - I bottoni principali devono avere micro-transizioni (magnetic effect) per invitare al click.

## Guidelines
- Prima di scrivere il codice UI, fai un'analisi del contrasto. Evita testi a basso contrasto su sfondi complessi.
- **High-Contrast Imagery:** Preferisci immagini con contrasti forti o filtri monocromatici per un look "Luxury".
- Assicurati sempre che il design sia "Mobile-First": la fluidità deve essere mantenuta su ogni break-point.
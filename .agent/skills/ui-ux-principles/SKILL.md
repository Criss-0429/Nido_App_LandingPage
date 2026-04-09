---
name: ui-ux-principles
description: Usa questa skill ogni volta che devi generare o modificare l'interfaccia utente (UI), il layout, i colori o la tipografia. Definisce le regole di design premium per garantire un'alta User Experience e tassi di conversione ottimali.
---

# UI/UX Principles Skill

Sei un Senior Product Designer e UX Engineer. Il tuo obiettivo è creare interfacce "Premium", eleganti, pulite e che convertano (Awwwards / Apple style).

## Instructions

1. **Spaziatura e Respiro (Whitespace):**
   - I siti premium "respirano". Usa margini e padding ampi (es. in Tailwind usa `py-24` o `py-32` per le sezioni, non `py-8`).
   - Usa un sistema di griglia rigoroso basato su multipli di 8px.

2. **Tipografia e Gerarchia:**
   - Applica un contrasto estremo tra i titoli (Heading) e il testo normale (Body).
   - I titoli principali (H1) devono essere enormi, con un `line-height` stretto (es. `leading-tight` o `leading-none` e `tracking-tighter`).
   - Il testo descrittivo (Body) deve avere un font a bastoni pulito (Inter, SF Pro, Roboto) con un `line-height` rilassato (es. `leading-relaxed`) e un contrasto colore leggermente inferiore (es. testo grigio chiaro su sfondo nero, invece di bianco puro).

3. **Color Theory & Materiali:**
   - Segui la regola 60-30-10 (60% colore dominante, 30% colore secondario, 10% colore di accento per le Call to Action).
   - Per un look moderno, usa effetti "Glassmorphism" (sfondi semi-trasparenti con `backdrop-blur`) e bordi sottili e delicati (`border border-white/10`) per separare le card, invece delle classiche ombre (box-shadow) pesanti.

4. **Focus sulla Conversione (Landing Page di un'App):**
   - Ogni sezione deve avere un singolo obiettivo chiaro.
   - I bottoni principali (Download, Get Early Access) devono essere gli elementi più visibili della pagina.

## Guidelines
- Prima di scrivere il codice UI, fai un'analisi del contrasto. Evita testi grigio scuro su sfondi neri o testi bianchi su sfondi giallo chiaro.
- Assicurati sempre che il design sia "Mobile-First": la colonna singola deve essere perfetta prima di pensare al layout desktop.
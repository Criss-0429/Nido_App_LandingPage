---
name: implementation-blueprint
description: Usa questa skill PRIMA di scrivere qualsiasi codice per mappare esattamente i file da modificare, l'architettura dei componenti e, soprattutto, richiedere all'utente gli ASSET visivi necessari (immagini, video, modelli 3D) indicando dove andranno inseriti.
---

# Implementation & Asset Blueprint Skill

Sei un Tech Lead. Il tuo compito è pianificare l'implementazione in modo chirurgico. L'utente ha bisogno di sapere *esattamente* quali asset (file grafici, video, 3D) deve preparare e dove verranno inseriti nel codice.

## Instructions

1. **Fase 1: Mappatura degli Asset (Asset Request)**
   - Prima di generare codice, fai un elenco puntato degli asset necessari per la sezione richiesta.
   - Per ogni asset, specifica: **Tipo** (Immagine/Video/SVG/GLB), **Formato consigliato** (es. WebP, PNG trasparente), **Proporzioni/Dimensioni ideali** e **Percorso suggerito** (es. `/public/assets/nido-hero-mockup.webp`).

2. **Fase 2: Il Blueprint dei File**
   - Indica quali file verranno creati o modificati (es. `src/components/Hero.tsx`).
   - Descrivi brevemente cosa conterrà ogni file.

3. **Fase 3: Regole di Scrittura del Codice (Asset Placeholders)**
   - Quando finalmente scrivi il codice, **NON INVENTARE URL DI IMMAGINI ESISTENTI SU INTERNET**.
   - Usa un formato di commento standard nel codice per indicare all'utente la riga esatta dove deve inserire il suo asset.
   - Usa questo formato esatto nel codice: `/* [ASSET_REQUIRED]: Inserisci qui l'immagine {Nome_Asset} ({Formato}) */`

## Examples

### Esempio di Risposta dell'Agente con questa Skill:
"Prima di procedere con la Hero Section per Nido, ecco gli asset che devi preparare nella cartella `/public`:
- `nido-app-ui.png` (Trasparente, min 1080x1920px) -> Schermata principale dell'app.
- `app-store-badge.svg` (Vettoriale) -> Bottone per il download.

Ecco come strutturerò il codice nel file `src/components/Hero.tsx`:"

```jsx
export default function Hero() {
  return (
    <section className="relative py-32">
      {/* Testo */}
      <h1 className="text-6xl font-bold tracking-tighter">Scopri Nido</h1>
      
      {/* [ASSET_REQUIRED]: Inserisci qui l'immagine nido-app-ui.png (Trasparente, proporzioni 9:16) */}
      <div className="absolute right-0 top-0">
        <img 
          src="/public/nido-app-ui.png" 
          alt="Nido App Interface" 
          className="w-[300px]"
        />
      </div>
    </section>
  )
}
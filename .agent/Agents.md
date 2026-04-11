# PROJECT MASTER DIRECTIVE: "NIDO APP" (Agents.md)

**A tutti gli Agenti AI e Collaboratori Umani:** 
Questo documento è la "Single Source of Truth" (Fonte Unica di Verità) del progetto. Contiene il contesto completo, i dati validati, la psicologia dell'utente, le linee guida di design e le direttive operative. Qualsiasi output generato per questo progetto (codice, copy, UI/UX, marketing) DEVE aderire rigorosamente a queste linee guida.

---

## 1. IDENTITÀ DEL PROGETTO
- **Nome in codice:** Nido App (o "Spazio")
- **Tagline:** "Non il solito spazzino anonimo. Il curatore privato dei tuoi ricordi."
- **Core Mission:** Abbattere il carico cognitivo ("Decision Fatigue") e l'ansia emotiva legata alla gestione e alla pulizia dello spazio di archiviazione sugli smartphone.
- **Unfair Advantage:** Architettura Local-First (Zero-Cloud). L'Intelligenza Artificiale lavora offline sul dispositivo. Massima privacy, nessuna foto inviata a server esterni.

---

## 2. IL PROBLEMA VALIDATO (Fondato su Dati Reali)
Il progetto non si basa su ipotesi, ma su un sondaggio validato su ~70 utenti.

- **La Vera Frizione:** Il blocco non è la mancanza di tempo o il non sapere di avere "file spazzatura". È la **Paralisi Decisionale** e il **Campo Minato Emotivo**.
- **Il Limite dei 15 Minuti:** I dati dimostrano che gli utenti crollano (per noia o ansia di cancellare per sbaglio ricordi preziosi) prima dei 15 minuti di pulizia manuale.
- **La "Tassa sulla Pigrizia":** Pur di non affrontare migliaia di micro-decisioni ("Tengo o butto?"), gli utenti adottano *workaround estremi e costosi*: pagano abbonamenti Cloud crescenti (es. iCloud 36€/anno), comprano chiavette USB per fare "dumping" dei dati, o acquistano smartphone da 256GB+.
- **Crisi di Fiducia:** L'80% degli utenti **non si fida** delle app di pulizia terze (paura per la privacy o paura che un algoritmo cancelli foto preziose).

---

## 3. ANALISI COMPETITOR E GAP DI MERCATO
I competitor attuali falliscono per due estremi:
1. **Utility Fredde (es. Smart Cleaners):** Interfacce ansiogene (rosse, allarmistiche), puramente tecniche. Ignorano l'aspetto emotivo del "ricordo", acuendo il "Non mi fido".
2. **App Gamificate (es. Picnic.photos, SwipeWipe):** Usano la UI stile Tinder. *Perché falliscono:* Gamificare la noia non la elimina. Se un utente ha 20.000 foto, chiedergli 20.000 swipe manuali significa causare comunque "Decision Fatigue". Spesso nascondono paywall aggressivi dopo pochi swipe.

---

## 4. LA SOLUZIONE (UX E PARADIGMA)
Nido capovolge il paradigma: **"L'AI seleziona, tu approvi in blocco."**

### Core Features & UX Workflow:
1. **Dashboard di Pre-Filtraggio (Smart Context):** L'utente non vede mai l'intero rullino. Entra in "Stanze" sicure pre-filtrate (es. *Screenshot vecchi di 6 mesi*, *Foto mosse*). Sapere di non avere "ricordi importanti" in quella stanza azzera il carico emotivo.
2. **Review Room (La Filmstrip a Ventaglio):** 
   - *Visuale:* Una foto enorme, centrale e nitida ("Vedi grande, non sbagliare"). In basso, una "Filmstrip" orizzontale (miniature sfocate) per dare il senso di quante foto mancano.
3. **Native Affordance (Swipe UP):** Nessun bottone minuscolo da mirare. Lo scarto avviene tramite uno "Swipe verso l'alto" (gesto muscolare nativo di iOS/Android per chiudere le app). Fluido, ininterrotto, anti-fatica.
4. **Il Cestino dei 30 Giorni (Safety Net):** Le foto scartate non vengono eliminate subito. C'è un limbo di 30 giorni. *Effetto psicologico:* L'utente swipa molto più velocemente perché sa di avere una rete di salvataggio. Nessuna paura di sbagliare.
5. **Dopamine Hit & Exit Strategy:** L'app consiglia di fermarsi ("Hai liberato 1.2GB, ottimo lavoro! Riposati") prevenendo il burnout e permettendo all'utente di uscire in qualsiasi momento incassando i giga liberati.

---

## 5. LINEE GUIDA BRAND IDENTITY & UI (Versione 2.0 - Next-Gen)
Qualsiasi generazione di interfacce o grafiche deve seguire questa evoluzione del Design System:

### Evoluzione Visiva: "Modular Precision"
Il progetto passa da un design puramente "Liquid Glass" a un approccio **Bento Grid Modular**, per riflettere l'ordine e la precisione chirurgica dell'AI locale.

### Palette Colori & Dynamic Theme
- **Modalità Notte (Default):** Navy Blue Notte (`#0A1118`) con testi Bianco Panna (`#FDFCFB`). Accenti in Soft Orange (`#F29559`).
- **Modalità Giorno:** Bianco Panna (`#F9F9F7`) con testi Deep Navy (`#1A2B3C`). Accenti in Mint Green (`#8AE7BF`).
- **Transizione:** Il cambio tema deve essere fluido (GSAP transition) e invertire i colori principali per mantenere il contrasto Luxury.

### Layout & Texture
- **Bento Grid:** Sezioni organizzate in card con `border-radius: 32px`. Uso di `backdrop-blur` e bordi ultra-sottili (`1px white/10`).
- **Grain Overlay:** Applicazione di un disturbo digitale (Grain) sottile su tutto lo sfondo per un feel "Analogico/Premium".

### Tipografia Maximalist
- **H1/H2:** Uso di font Monumentali (es. Inter Black o Playfair Display) con `tracking-tighter` (-0.05em) e `leading-tight`. Il contrasto tra titoli enormi e body text piccolo è fondamentale.

---

## 6. ASSET REQUISITI & FLATICON
Gli asset devono essere minimalisti e iconici. Se mancano icone, cercarle su Flaticon con lo stile "Linear" o "Fill" monocromatico:
- **Icone Dark/Light:** Sun/Moon (minimaliste).
- **Icone Feature:** Privacy (Shield), Velocity (Bolt), Intelligence (Brain/Sparkles).

---

## 7. SYSTEM INSTRUCTIONS PER AGENTI AI
Quando un Agente AI viene interrogato o attivato per lavorare su questo progetto, DEVE applicare le seguenti regole:

1. **Privacy-First:** Privilegia SEMPRE soluzioni "On-Device".
2. **Bento Logic:** Quando proponi nuove sezioni, usa sempre una struttura a griglia modulare (Bento).
3. **High-Contrast Typography:** Mantieni un contrasto estremo tra font.
4. **No Login Wall:** L'app deve funzionare istantaneamente in modalità locale.
5. **Dopamine UX:** L'interfaccia deve premiare l'utente per ogni decisione presa (micro-animazioni di successo).

---
*Fine del Documento. "Less Code, Less Cognitive Load, More Safe Space."*
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

## 5. LINEE GUIDA BRAND IDENTITY & UI
Qualsiasi generazione di interfacce o grafiche deve seguire questo Design System:

### Palette Colori (Obiettivo: Calma, Sicurezza, Privacy)
- **Sfondo App:** Off-White / Panna (`#F9F9F7`). *Mai bianco puro (affatica la vista).*
- **Testo/Scuri:** Deep Navy / Blu Notte (`#1A2B3C`). *Mai nero puro. Trasmette sicurezza istituzionale/crittografica.*
- **Colore Primario (Successo/Via libera):** Mint Green / Verde Salvia tenue (`#8AE7BF` o `#A3C4BC`).
- **Bottoni Azione/Accenti:** Soft Orange (`#F29559`) o Peach (`#F5B8A5`). 
- 🚫 **DIVIETO ASSOLUTO:** Non usare mai il ROSSO o colori fluorescenti/ansiogeni. Nessuna "barra di memoria piena" rossa.

### Tipografia
- San-serif arrotondati, amichevoli e iper-leggibili.
- Primari: *SF Pro Rounded* (iOS native), *Nunito*, *Quicksand* o *Plus Jakarta Sans*.

### Tone of Voice (Copywriting)
- **Empatico, rassicurante, umano, calmo.**
- *Parole SI:* Spazio, Respiro, Nido, Sicurezza, I tuoi ricordi, Offline, Locale, Recupera.
- *Parole NO:* Cancella, Distruggi, Spazzatura, Pericolo, Spazio Esaurito, Cloud.

---

## 6. SYSTEM INSTRUCTIONS PER AGENTI AI
Quando un Agente AI viene interrogato o attivato per lavorare su questo progetto, DEVE applicare le seguenti regole:

1. **Privacy-First:** Se ti viene chiesto di sviluppare una feature tecnica, privilegia SEMPRE soluzioni "On-Device" (CoreML/ML Kit). Rifiuta architetture basate su API Cloud esterne per l'analisi delle foto.
2. **UX Anti-Frizione:** Rifiuta la creazione di griglie fotografiche standard o pulsanti "Seleziona Tutto". Proponi sempre UX basate su *Native Affordance* (gestures) e macro-decisioni.
3. **No Login Wall:** L'app non deve avere obbligo di Login/Registrazione all'avvio. Deve funzionare istantaneamente in modalità locale per costruire immediata fiducia.
4. **Copywriting Rule:** Quando scrivi testi per la UI, landing page o marketing, non far sentire l'utente "in colpa" per il disordine digitale. Poniti come un assistente silenzioso che toglie il "peso" delle decisioni.
5. **Focus sul "Pain" Validato:** Mantieni sempre il focus sul risolvere la "Decision Fatigue". Qualsiasi nuova feature proposta deve rispondere alla domanda: *"Questa feature riduce o aumenta il numero di decisioni che l'utente deve prendere?"* Se lo aumenta, scartala.

---
*Fine del Documento. "Less Code, Less Cognitive Load, More Safe Space."*
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { DynamicNavbar } from './components/ui/DynamicNavbar';
import { SkipLink } from './components/ui/SkipLink';
import { AccessibilityMenu } from './components/ui/AccessibilityMenu';
import { LanguageMenu } from './components/ui/LanguageMenu';
import { CookieBanner } from './components/ui/CookieBanner';
import { LegalModals } from './components/ui/LegalModals';
import { ExplodingMockup } from './components/mockup/ExplodingMockup';
import { USPShowcase } from './components/sections/USPShowcase';
import { useLanguage } from './context/LanguageContext';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const sanitizeEmail = (email: string) => email.trim().replace(/[^a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~@.[\]]/g, '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const sanitizedEmail = sanitizeEmail(email);
    setEmail(sanitizedEmail);
    if (!validateEmail(sanitizedEmail)) {
      setError(language === 'it' ? "Inserisci un indirizzo email valido." : "Please enter a valid email address.");
      return;
    }
    if (!isHuman) {
      setError(language === 'it' ? "Per favore, conferma di non essere un robot." : "Please confirm you are not a robot.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Sostituisci questo URL con l'URL del tuo Google Apps Script dopo il setup
      const GOOGLE_SCRIPT_URL = "https://script.google.com/a/macros/istitutopantheon.it/s/AKfycbzAlC8L6w-rz1srlER6zO4jU3X-eOZgr8x7Wl7VX-o9QJQsGz1U5X3L5KWxCdQwSQRi/exec";

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: sanitizedEmail, date: new Date().toISOString() }),
      });

      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      setError(language === 'it' ? "Errore nell'invio. Riprova più tardi." : "Error sending. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => gsap.to(window, { duration: 1.5, scrollTo: { y: 0 }, ease: "power4.inOut" });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans flex flex-col overflow-x-hidden">
      <SkipLink />
      <DynamicNavbar />
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        <section className="relative px-6 pt-48 pb-32 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="space-y-12 max-w-6xl z-10">
            <h1 className="maximalist-h1 text-4xl md:text-[clamp(5rem,8vw,8.5rem)] leading-tight md:leading-[0.95] tracking-tight">
              {t('heroTitle')}<br />
              {t('heroSubtitle').split(' ').map((word, i) => (
                <span key={i} className={word === 'Curatore' || word === 'Curator' ? "text-[var(--accent)]" : ""}>{i === 0 ? word : ` ${word}`}</span>
              ))}
            </h1>
            <p className="text-base md:text-2xl text-[var(--accent)]/80 font-medium tracking-[0.1em] uppercase leading-relaxed">{t('heroClaim')}</p>
            <div className="flex flex-col items-center gap-6 pt-8">
              {!isSubmitted ? (
                <form name="waitlist" onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl">
                  <p className="hidden"><label><input name="bot-field" /></label></p>
                  <div className="flex flex-col md:flex-row gap-3 w-full">
                    <input name="email" type="email" placeholder={t('waitlistPlaceholder')} required value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }} className="flex-grow min-h-[56px] px-8 py-4 rounded-full bg-white/5 border border-[var(--accent)]/30 focus:border-[var(--accent)]/60 outline-none transition-all text-[var(--text)] placeholder:text-[var(--text)]/50 text-base md:text-lg" />
                    <button type="submit" disabled={isSubmitting} className="px-10 py-4 bg-[var(--accent)] text-[var(--bg)] rounded-full font-black uppercase tracking-widest text-sm shadow-2xl shadow-[var(--accent)]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">{isSubmitting ? '...' : t('waitlistButton')}</button>
                  </div>
                  <div className="flex flex-col gap-3 items-center">
                    <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 group cursor-pointer transition-colors w-fit" onClick={() => { setIsHuman(!isHuman); if (error) setError(null); }}>
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${isHuman ? "bg-[var(--accent)] border-[var(--accent)]" : "border-white/20 group-hover:border-[var(--accent)]/50"}`}>{isHuman && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--bg)]"><polyline points="20 6 9 17 4 12" /></svg>}</div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Non sono un robot</span>
                    </div>
                    <AnimatePresence>{error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-[0.2em] text-center">{error}</motion.div>}</AnimatePresence>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-16 h-16 bg-[var(--accent)]/20 rounded-full flex items-center justify-center text-[var(--accent)]"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></motion.div>
                  <p className="text-xl font-bold uppercase tracking-widest">{t('waitlistSuccess')}</p>
                </div>
              )}
            </div>
          </motion.div>
        </section>
        <section id="engineering" className="relative py-16 md:py-32 px-6 max-w-7xl mx-auto w-full scroll-mt-24">
          <div className="mb-12 md:mb-32 text-center relative z-10">
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-[var(--text)] leading-[1.1]">{t('sectionTitle').split(',').map((part, i) => <span key={i} className={i === 1 ? "text-[var(--accent)]" : ""}>{i === 1 ? ` ${part}` : part}</span>)}</h2>
            <p className="text-base md:text-2xl text-[var(--text)]/60 max-w-2xl mx-auto font-light leading-relaxed">{t('sectionSubtitle')}</p>
          </div>
          <div className="relative">
            <div className="showcase-wrapper flex flex-col md:flex-row gap-12 md:gap-24 items-center min-h-[60vh] md:min-h-0">
              <div className="w-full md:w-[40%] flex justify-center"><div className="relative"><ExplodingMockup isStatic /></div></div>
              <div className="w-full md:w-[60%] h-full min-h-[500px] md:h-screen relative"><USPShowcase /></div>
            </div>
            <div className="hidden md:block absolute top-0 left-0 w-full pointer-events-none z-0">
              <div id="privacy-trigger" className="h-[100vh] scroll-mt-32" /><div id="filters-trigger" className="h-[100vh] scroll-mt-32" /><div id="experience-trigger" className="h-[100vh] scroll-mt-32" /><div id="security-trigger" className="h-[100vh] scroll-mt-32" />
            </div>
          </div>
        </section>
        <section id="waitlist" className="py-24 md:py-48 px-6 text-center bg-[var(--text)]/5 rounded-[4rem] mx-6 mb-32 border border-[var(--border-color)] scroll-mt-24">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto space-y-16">
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-[var(--text)] leading-tight md:leading-none uppercase">{t('visionTitle').split(',').map((part, i) => <span key={i} className={i === 1 ? "text-[var(--accent)]" : ""}>{i === 1 ? ` ${part}` : part}</span>)}</h2>
            <div className="flex justify-center">
              {!isSubmitted ? (
                <form name="waitlist-footer" onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl">
                  <p className="hidden"><label><input name="bot-field" /></label></p>
                  <div className="flex flex-col md:flex-row gap-3 w-full">
                    <input name="email" type="email" placeholder={t('waitlistPlaceholder')} required value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }} className="flex-grow min-h-[56px] px-8 py-4 rounded-full bg-white/5 border border-[var(--accent)]/30 focus:border-[var(--accent)]/60 outline-none transition-all text-[var(--text)] placeholder:text-[var(--text)]/50 text-base md:text-lg" />
                    <button type="submit" disabled={isSubmitting} className="px-10 py-4 bg-[var(--text)] text-[var(--bg)] rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">{isSubmitting ? '...' : t('waitlistButton')}</button>
                  </div>
                  <div className="flex flex-col gap-3 items-center">
                    <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 group cursor-pointer transition-colors w-fit" onClick={() => { setIsHuman(!isHuman); if (error) setError(null); }}>
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${isHuman ? "bg-[var(--accent)] border-[var(--accent)]" : "border-white/20 group-hover:border-[var(--accent)]/50"}`}>{isHuman && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--bg)]"><polyline points="20 6 9 17 4 12" /></svg>}</div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Non sono un robot</span>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-[var(--accent)] text-2xl md:text-4xl font-black italic underline decoration-wavy underline-offset-8">{t('waitlistWelcome')}</div>
              )}
            </div>
          </motion.div>
        </section>
      </main>
      <footer className="py-24 px-12 border-t border-[var(--border-color)] bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <button onClick={scrollToTop} className="flex flex-col items-center gap-4 group cursor-pointer" aria-label="Torna all'inizio della pagina">
            <div className="relative w-12 h-12"><img src="/logo/DarkModeLogo.png" alt="" className="absolute inset-0 w-full h-full group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out logo-dark" /><img src="/logo/LogoNidoApp.png" alt="" className="absolute inset-0 w-full h-full group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out logo-light" /></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text)]/20 group-hover:text-[var(--text)] transition-colors" aria-hidden="true">{t('footerBackToTop')}</span>
          </button>
          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text)]/30 border-t border-[var(--border-color)] pt-12">
            <div>— Nido App 2026 —</div>
            <div className="flex gap-12">
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-legal', { detail: 'privacy' }))} className="hover:text-[var(--accent)] transition-all">Privacy Policy</button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-legal', { detail: 'cookie' }))} className="hover:text-[var(--accent)] transition-all">Cookie Policy</button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))} className="hover:text-[var(--accent)] transition-all">{t('navCookie')}</button>
              <a href="#" className="hover:text-[var(--text)] transition-colors">Manifesto</a>
            </div>
          </div>
        </div>
      </footer>
      <AccessibilityMenu /><LanguageMenu /><CookieBanner /><LegalModals />
    </div>
  );
}
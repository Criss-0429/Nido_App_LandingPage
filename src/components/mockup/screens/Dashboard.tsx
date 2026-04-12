import { Home, Trash2, Settings, ShieldCheck, Zap } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: 'dashboard' | 'review' | 'success') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden bg-[var(--bg)] transition-colors duration-500">
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* User Info */}
        <div className="px-6 pt-12 pb-6">
          <h2 className="text-2xl font-black text-[var(--text)] mb-1">Ciao Marco 👋</h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text)]/40">Pronto a fare spazio?</p>
        </div>

        {/* Status Card */}
        <div className="px-6 mb-6">
          <div className="glass-panel p-5 rounded-[2rem] border-[var(--accent)]/20 bg-[var(--accent)]/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">Analisi Locale</p>
              <p className="text-xs text-[var(--text)]/60 font-medium">Nessuna foto lascia il dispositivo.</p>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="px-6 space-y-4">
          <button
            onClick={() => onNavigate('review')}
            className="w-full glass-panel p-6 rounded-[2.5rem] text-left border-[var(--border-color)] bg-[var(--text)]/[0.03] hover:bg-[var(--text)]/[0.08] transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange/20 flex items-center justify-center text-orange group-hover:scale-110 transition-transform">
                <Zap size={24} fill="currentColor" />
              </div>
              <span className="text-[10px] font-black bg-[var(--bg)]/60 px-3 py-1 rounded-full text-[var(--text)]/40 border border-[var(--border-color)]">450 MB</span>
            </div>
            <h3 className="text-lg font-black text-[var(--text)] mb-1">Screenshot Inutili</h3>
            <p className="text-xs text-[var(--text)]/40 font-medium leading-relaxed">Libera spazio eliminando screenshot dimenticati e duplicati.</p>
          </button>

          <button className="w-full glass-panel p-6 rounded-[2.5rem] text-left border-[var(--border-color)] bg-[var(--text)]/[0.03] opacity-60">
             <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-mint/20 flex items-center justify-center text-mint">
                <Trash2 size={24} />
              </div>
              <span className="text-[10px] font-black bg-[var(--bg)]/60 px-3 py-1 rounded-full text-[var(--text)]/40 border border-[var(--border-color)]">1.2 GB</span>
            </div>
            <h3 className="text-lg font-black text-[var(--text)] mb-1">Foto Mosse</h3>
            <p className="text-xs text-[var(--text)]/40 font-medium leading-relaxed">Trova e rimuovi scatti sfuocati o accidentali.</p>
          </button>
        </div>
      </div>

      {/* Nav bar mockup */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-20">
        <div className="glass-panel py-4 px-8 rounded-full flex justify-between items-center border-[var(--border-color)] bg-[var(--bg)]/80 backdrop-blur-3xl shadow-2xl">
           <button className="text-orange"><Home size={20} /></button>
           <button className="text-[var(--text)]/30"><Trash2 size={20} /></button>
           <button className="text-[var(--text)]/30"><Settings size={20} /></button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `.scrollbar-hide::-webkit-scrollbar { display: none; }`}} />
    </div>
  );
}

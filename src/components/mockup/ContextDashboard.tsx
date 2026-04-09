import { Home, Trash2, Settings, ShieldCheck, Zap } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface ContextDashboardProps {
  onNavigate: (screen: string) => void;
}

export function ContextDashboard({ onNavigate }: ContextDashboardProps) {
  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden bg-navy">
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* User Info */}
        <div className="px-6 pt-12 pb-6">
          <h2 className="text-2xl font-black text-panna mb-1">Ciao Marco 👋</h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-panna/40">Pronto a fare spazio?</p>
        </div>

        {/* Status Card */}
        <div className="px-6 mb-6">
          <div className="glass-panel p-5 rounded-[2rem] border-mint/20 bg-mint/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center text-mint">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-mint">Analisi Locale</p>
              <p className="text-xs text-panna/60 font-medium">Nessuna foto lascia il dispositivo.</p>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="px-6 space-y-4">
          <button
            onClick={() => onNavigate('review')}
            className="w-full glass-panel p-6 rounded-[2.5rem] text-left border-white/5 bg-white/[0.03] hover:bg-white/[0.08] transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange/20 flex items-center justify-center text-orange group-hover:scale-110 transition-transform">
                <Zap size={24} fill="currentColor" />
              </div>
              <span className="text-[10px] font-black bg-navy/60 px-3 py-1 rounded-full text-panna/40 border border-white/5">450 MB</span>
            </div>
            <h3 className="text-lg font-black text-panna mb-1">Screenshot Inutili</h3>
            <p className="text-xs text-panna/40 font-medium leading-relaxed">Libera spazio eliminando screenshot dimenticati e duplicati.</p>
          </button>

          <button className="w-full glass-panel p-6 rounded-[2.5rem] text-left border-white/5 bg-white/[0.03] opacity-60">
             <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-mint/20 flex items-center justify-center text-mint">
                <Trash2 size={24} />
              </div>
              <span className="text-[10px] font-black bg-navy/60 px-3 py-1 rounded-full text-panna/40 border border-white/5">1.2 GB</span>
            </div>
            <h3 className="text-lg font-black text-panna mb-1">Foto Mosse</h3>
            <p className="text-xs text-panna/40 font-medium leading-relaxed">Trova e rimuovi scatti sfuocati o accidentali.</p>
          </button>
        </div>
      </div>

      {/* Nav bar mockup */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-20">
        <div className="glass-panel py-4 px-8 rounded-full flex justify-between items-center border-white/10 bg-navy/80 backdrop-blur-3xl shadow-2xl">
           <button className="text-orange"><Home size={20} /></button>
           <button className="text-panna/30"><Trash2 size={20} /></button>
           <button className="text-panna/30"><Settings size={20} /></button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `.scrollbar-hide::-webkit-scrollbar { display: none; }`}} />
    </div>
  );
}

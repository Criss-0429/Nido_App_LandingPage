import { Home, Trash2, Settings } from 'lucide-react';

interface ContextDashboardProps {
  onNavigate: (screen: string) => void;
}

export function ContextDashboard({ onNavigate }: ContextDashboardProps) {
  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden" style={{ backgroundColor: '#F9F9F7' }}>
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* Top Bar */}
        <div className="px-6 pt-12 pb-4 shrink-0">
          <div className="mb-2" style={{ color: '#1A2B3C' }}>
            <span className="text-2xl font-bold">Ciao Marco 👋</span>
          </div>
          <div className="text-sm opacity-60 font-medium" style={{ color: '#1A2B3C' }}>
            Pronto a fare spazio oggi?
          </div>
        </div>

        {/* Header Card - Mint */}
        <div className="px-6 mb-6 shrink-0">
          <div
            className="rounded-3xl p-6 shadow-sm"
            style={{ backgroundColor: '#8AE7BF' }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl font-bold">✓</div>
              <div>
                <div className="mb-1 font-bold" style={{ color: '#1A2B3C' }}>
                  100% Analisi Locale.
                </div>
                <div className="text-sm opacity-80" style={{ color: '#1A2B3C' }}>
                  Le tue foto sono al sicuro.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Context Blocks */}
        <div className="px-6 space-y-4 shrink-0">
          {/* Card 1 - Peach */}
          <button
            onClick={() => onNavigate('review')}
            className="w-full rounded-3xl p-6 shadow-sm text-left transition-transform active:scale-[0.98]"
            style={{ backgroundColor: '#F5B8A5' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">📱</div>
              <div
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: 'rgba(26, 43, 60, 0.1)', color: '#1A2B3C' }}
              >
                450 MB
              </div>
            </div>
            <h3 className="mb-1 font-bold" style={{ color: '#1A2B3C' }}>
              Screenshot Inutili
            </h3>
            <p className="text-sm opacity-70" style={{ color: '#1A2B3C' }}>
              Rivedi i tuoi screenshot e libera spazio
            </p>
          </button>

          {/* Card 2 - Mint */}
          <button
            className="w-full rounded-3xl p-6 shadow-sm text-left transition-transform active:scale-[0.98]"
            style={{ backgroundColor: '#8AE7BF' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">🌫️</div>
              <div
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: 'rgba(26, 43, 60, 0.1)', color: '#1A2B3C' }}
              >
                1.2 GB
              </div>
            </div>
            <h3 className="mb-1 font-bold" style={{ color: '#1A2B3C' }}>
              Foto Mosse & Sfuocate
            </h3>
            <p className="text-sm opacity-70" style={{ color: '#1A2B3C' }}>
              Elimina le foto di bassa qualità
            </p>
          </button>

          {/* Card 3 - Off-white with Navy border */}
          <button
            className="w-full rounded-3xl p-6 shadow-sm text-left transition-transform active:scale-[0.98]"
            style={{
              backgroundColor: '#F9F9F7',
              border: '2px solid #1A2B3C'
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">📸</div>
              <div
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: 'rgba(26, 43, 60, 0.1)', color: '#1A2B3C' }}
              >
                3.4 GB
              </div>
            </div>
            <h3 className="mb-1 font-bold" style={{ color: '#1A2B3C' }}>
              Scatti Multipli
            </h3>
            <p className="text-sm opacity-70" style={{ color: '#1A2B3C' }}>
              Scegli le migliori da ogni serie
            </p>
          </button>
        </div>
      </div>

      {/* Bottom Navigation - Fixed at bottom of container */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-around pb-8 pt-4 px-6 border-t z-20 backdrop-blur-md rounded-b-[2.8rem]"
        style={{
          backgroundColor: 'rgba(249, 249, 247, 0.95)',
          borderColor: 'rgba(26, 43, 60, 0.1)'
        }}
      >
        <button className="flex flex-col items-center gap-1" style={{ color: '#1A2B3C' }}>
          <Home size={24} strokeWidth={2.5} />
          <span className="text-xs font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 opacity-50" style={{ color: '#1A2B3C' }}>
          <Trash2 size={24} />
          <span className="text-xs font-bold">Cestino</span>
        </button>
        <button className="flex flex-col items-center gap-1 opacity-50" style={{ color: '#1A2B3C' }}>
          <Settings size={24} />
          <span className="text-xs font-bold">Impostazioni</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}

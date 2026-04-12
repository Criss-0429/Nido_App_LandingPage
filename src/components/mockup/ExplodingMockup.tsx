import { NidoAppMockup } from './NidoAppMockup';

export function ExplodingMockup({ isStatic = false }: { isStatic?: boolean }) {
  return (
    <div className="w-[320px] aspect-[9/19.5] relative group">
        {/* Physical Frame Shadow */}
        <div className="absolute inset-0 bg-black/40 blur-3xl rounded-[4rem] translate-y-8 scale-95" />
        
        {/* Device Frame */}
        <div className="absolute inset-[-4px] rounded-[4rem] bg-gradient-to-b from-[#333] via-[#111] to-[#000] p-[2px] shadow-2xl">
            <div className="w-full h-full rounded-[3.8rem] bg-[#0A0A0A] relative overflow-hidden">
                
                {/* Screen Content */}
                <div className="absolute inset-[8px] rounded-[2.8rem] overflow-hidden bg-navy">
                    <NidoAppMockup />
                </div>

                {/* Glass Layer / Reflection */}
                <div className="absolute inset-0 z-20 rounded-[3.8rem] pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-50" />
                <div className="absolute inset-0 z-20 rounded-[3.8rem] pointer-events-none ring-1 ring-inset ring-white/20" />

                {/* Dynamic Notch / Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-end px-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 blur-[2px]" />
                </div>
            </div>
        </div>


    </div>
  );
}

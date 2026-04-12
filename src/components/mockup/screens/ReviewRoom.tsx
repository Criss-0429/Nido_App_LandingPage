import { X, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewRoomProps {
  onNavigate: (screen: string) => void;
}

const mockImages = [
  { id: '1', url: 'https://images.unsplash.com/photo-1587276786304-962ae8e60e5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: '2', url: 'https://images.unsplash.com/photo-1694781664416-d89a0293124a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: '3', url: 'https://images.unsplash.com/photo-1746716809096-94e1924de316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: '4', url: 'https://images.unsplash.com/photo-1661358788054-9988c0778447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' }
];

export function ReviewRoom({ onNavigate }: ReviewRoomProps) {
  const [images, setImages] = useState(mockImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [exitDirection, setExitDirection] = useState<'up' | 'next'>('up');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        const activeItem = scrollRef.current.children[currentIndex] as HTMLElement;
        if (activeItem) {
            scrollRef.current.scrollTo({
                left: activeItem.offsetLeft - scrollRef.current.offsetWidth / 2 + activeItem.offsetWidth / 2,
                behavior: 'smooth'
            });
        }
    }
  }, [currentIndex]);

  const handleDiscard = () => {
    setExitDirection('up');
    setShowHint(false);
    
    setTimeout(() => {
        const newImages = images.filter((_, i) => i !== currentIndex);
        setImages(newImages);
        if (newImages.length === 0) {
            onNavigate('success');
        } else if (currentIndex >= newImages.length) {
            setCurrentIndex(newImages.length - 1);
        }
    }, 200);
  };

  const handleNext = () => {
    setExitDirection('next');
    setShowHint(false);
    if (currentIndex < images.length - 1) {
        setCurrentIndex(v => v + 1);
    } else {
        onNavigate('success');
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="h-full w-full flex flex-col bg-[var(--bg)] relative overflow-hidden transition-colors duration-500">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 relative z-50">
        <div>
          <h2 className="text-xl font-black text-[var(--text)] leading-none mb-1">Screenshot Inutili</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text)]/40">
            {currentIndex + 1} di {images.length}
          </p>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-10 h-10 rounded-full bg-[var(--text)]/5 border border-[var(--border-color)] flex items-center justify-center text-[var(--text)]/60 hover:text-[var(--text)] transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 flex items-center justify-center px-6 relative">
        <div className="relative w-full aspect-[4/5] max-w-[280px]">
          <AnimatePresence mode="wait" custom={exitDirection}>
            <motion.div
              key={images[currentIndex]?.id}
              custom={exitDirection}
              initial={{ opacity: 0, scale: 0.9, x: exitDirection === 'next' ? 100 : 0 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.9,
                y: exitDirection === 'up' ? -500 : 0,
                x: exitDirection === 'next' ? -100 : 0,
                transition: { duration: 0.4, ease: "circIn" }
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, info) => {
                if (info.offset.y < -120) handleDiscard();
              }}
              className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing glass-panel border-[var(--border-color)] bg-black/20 group"
            >
              <img
                src={images[currentIndex]?.url}
                alt="Review"
                className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
              />

              {/* Liquid Shine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />

              {/* Swipe Hint */}
              {showHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none"
                >
                  <ChevronUp size={48} className="text-[var(--accent)] mb-4 animate-bounce" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Scarta in alto</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Filmstrip / Mini Previews Footer */}
      <div className="py-10 relative">
        <div 
          ref={scrollRef}
          className="flex gap-3 px-12 overflow-x-auto scrollbar-hide snap-x no-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {images.map((img, idx) => (
            <button 
              key={img.id}
              onClick={() => {
                setExitDirection(idx > currentIndex ? 'next' : 'up');
                setCurrentIndex(idx);
              }}
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 snap-center ${
                idx === currentIndex 
                ? 'ring-2 ring-[var(--accent)] scale-110 z-10' 
                : 'opacity-40 scale-90'
              }`}
            >
              <img src={img.url} className="w-full h-full object-cover" alt="mini" />
              {idx === currentIndex && (
                <div className="absolute inset-0 bg-[var(--accent)]/20" />
              )}
            </button>
          ))}
        </div>
        
        {/* Glow effect for selection */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[var(--accent)]/10 blur-2xl rounded-full pointer-events-none" />
      </div>

      <style dangerouslySetInnerHTML={{__html: `.scrollbar-hide::-webkit-scrollbar { display: none; }`}} />
    </div>
  );
}

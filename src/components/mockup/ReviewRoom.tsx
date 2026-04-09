import { X, ChevronUp, Trash2, Heart } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';

interface ReviewRoomProps {
  onNavigate: (screen: string) => void;
}

export function ReviewRoom({ onNavigate }: ReviewRoomProps) {
  const initialImages = [
    { id: '1', url: 'https://images.unsplash.com/photo-1587276786304-962ae8e60e5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { id: '2', url: 'https://images.unsplash.com/photo-1694781664416-d89a0293124a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { id: '3', url: 'https://images.unsplash.com/photo-1746716809096-94e1924de316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { id: '4', url: 'https://images.unsplash.com/photo-1661358788054-9988c0778447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { id: '5', url: 'https://images.unsplash.com/photo-1607027340850-44448bd87dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' }
  ];

  const [images, setImages] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [exitDirection, setExitDirection] = useState<'up' | 'fade'>('fade');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-200, 200], [15, -15]);
  const opacity = useTransform(dragY, [0, -200], [1, 0.5]);
  const scale = useTransform(dragY, [0, -200], [1, 0.8]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = currentIndex;
    let minDistance = Infinity;
    
    Array.from(container.children).forEach((child, index) => {
      const childElement = child as HTMLElement;
      const childCenter = childElement.offsetLeft + childElement.clientWidth / 2;
      const distance = Math.abs(scrollCenter - childCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    if (closestIndex !== currentIndex && closestIndex >= 0 && closestIndex < images.length) {
      setExitDirection('fade');
      setCurrentIndex(closestIndex);
      setShowHint(false);
    }
  };

  const handleThumbnailClick = (idx: number) => {
    setShowHint(false);
    setExitDirection('fade');
    setCurrentIndex(idx);
    
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const child = container.children[idx] as HTMLElement;
      
      if (child) {
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const scrollLeft = childCenter - container.clientWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  };

  const handleSwipeUp = () => {
    setShowHint(false);
    setExitDirection('up');
    
    if (images.length <= 1) {
      onNavigate('success');
      return;
    }

    const newImages = images.filter((_, i) => i !== currentIndex);
    setImages(newImages);
    
    if (currentIndex >= newImages.length) {
      const newIndex = newImages.length - 1;
      setCurrentIndex(newIndex);
      setTimeout(() => handleThumbnailClick(newIndex), 50);
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden bg-navy/10">
      {/* Header Mockup */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 shrink-0 z-20">
        <div>
          <h2 className="mb-0.5 text-lg font-black tracking-tight text-panna">Review Room</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-panna/40">
            {currentIndex + 1} / {images.length} SCARTI
          </p>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="p-2 rounded-full glass-button border-white/10 text-panna/60 hover:text-panna"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Review Area */}
      <div className="flex-1 flex items-center justify-center px-6 min-h-0 relative">
        <AnimatePresence mode="popLayout" custom={exitDirection}>
          <motion.div
            key={images[currentIndex]?.id}
            custom={exitDirection}
            style={{ 
              y: dragY,
              rotateX,
              opacity,
              scale,
              transformStyle: 'preserve-3d'
            }}
            variants={{
              initial: { scale: 0.9, opacity: 0, y: 100 },
              animate: { scale: 1, opacity: 1, y: 0 },
              exit: (dir) => ({
                y: dir === 'up' ? -600 : 0,
                opacity: 0,
                scale: dir === 'fade' ? 0.9 : 1.1,
                transition: { type: 'spring', stiffness: 300, damping: 30 }
              })
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="y"
            dragConstraints={{ top: -1000, bottom: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.y < -120 || info.velocity.y < -500) {
                handleSwipeUp();
              }
            }}
            className="w-full h-[360px] glass-panel rounded-[2rem] overflow-hidden border-white/10 shadow-2xl relative cursor-grab active:cursor-grabbing"
          >
            <ImageWithFallback
              src={images[currentIndex]?.url}
              alt="Preview"
              className="w-full h-full object-cover pointer-events-none"
            />
            
            {/* Action Overlays */}
            <motion.div 
              style={{ opacity: useTransform(dragY, [0, -100], [0, 1]) }}
              className="absolute inset-0 bg-orange/40 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none"
            >
              <Trash2 size={80} className="text-white mb-2" />
              <span className="text-white font-black uppercase tracking-[0.2em]">CANCELLA</span>
            </motion.div>

            {showHint && (
              <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 pointer-events-none">
                <ChevronUp className="text-panna animate-bounce" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-panna/60 bg-navy/40 px-4 py-2 rounded-full backdrop-blur-md">
                  Swipe up to clean
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails Strip */}
      <div className="pb-8 pt-4 flex flex-col items-center shrink-0 w-full px-4">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative mb-6 w-full overflow-x-auto snap-x snap-mandatory flex items-center scrollbar-hide py-2 h-[100px]"
          style={{ padding: '0 calc(50% - 25px)' }}
        >
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => handleThumbnailClick(idx)}
              className={`snap-center shrink-0 rounded-xl overflow-hidden transition-all duration-300 mx-1.5 ${
                idx === currentIndex
                  ? 'ring-2 ring-orange scale-110 opacity-100'
                  : 'opacity-30'
              }`}
              style={{ width: '50px', height: '75px' }}
            >
              <img src={img.url} className="w-full h-full object-cover pointer-events-none" alt="" />
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigate('success')}
          className="w-full glass-button py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] text-panna/60 hover:text-orange border-white/5"
        >
          Ho finito di scartare
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}

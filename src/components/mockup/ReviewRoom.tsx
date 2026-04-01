import { X, ChevronUp } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';

interface ReviewRoomProps {
  onNavigate: (screen: string) => void;
}

export function ReviewRoom({ onNavigate }: ReviewRoomProps) {
  const initialImages = [
    { id: '1', url: 'https://images.unsplash.com/photo-1587276786304-962ae8e60e5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMHNjcmVlbnNob3QlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc1MDM5NTQxfDA&ixlib=rb-4.1.0&q=80&w=400' },
    { id: '2', url: 'https://images.unsplash.com/photo-1694781664416-d89a0293124a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2JpbGUlMjBwaG9uZSUyMHNjcmVlbnNob3QlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc1MDM5NTQxfDA&ixlib=rb-4.1.0&q=80&w=400' },
    { id: '3', url: 'https://images.unsplash.com/photo-1746716809096-94e1924de316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2JpbGUlMjBwaG9uZSUyMHNjcmVlbnNob3QlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc1MDM5NTQxfDA&ixlib=rb-4.1.0&q=80&w=400' },
    { id: '4', url: 'https://images.unsplash.com/photo-1661358788054-9988c0778447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtb2JpbGUlMjBwaG9uZSUyMHNjcmVlbnNob3QlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc1MDM5NTQxfDA&ixlib=rb-4.1.0&q=80&w=400' },
    { id: '5', url: 'https://images.unsplash.com/photo-1607027340850-44448bd87dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtb2JpbGUlMjBwaG9uZSUyMHNjcmVlbnNob3QlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc1MDM5NTQxfDA&ixlib=rb-4.1.0&q=80&w=400' }
  ];

  const [images, setImages] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [exitDirection, setExitDirection] = useState<'up' | 'fade'>('fade');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const handleKeep = () => {
    setShowHint(false);
    if (currentIndex < images.length - 1) {
      handleThumbnailClick(currentIndex + 1);
    } else {
      onNavigate('success');
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="h-full min-h-full w-full flex flex-col relative overflow-hidden" style={{ backgroundColor: '#F9F9F7' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 shrink-0">
        <div>
          <h2 className="mb-1 text-xl font-bold" style={{ color: '#1A2B3C' }}>
            Screenshot Inutili
          </h2>
          <p className="text-sm opacity-60 font-bold" style={{ color: '#1A2B3C' }}>
            {currentIndex + 1} di {images.length}
          </p>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="p-2 rounded-full transition-colors hover:bg-black/5"
          style={{ color: '#1A2B3C' }}
        >
          <X size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 flex items-center justify-center px-6 overflow-hidden min-h-0">
        <div className="relative w-full h-[320px] max-h-[60vh] mx-auto">
          <AnimatePresence mode="popLayout" custom={exitDirection}>
            <motion.div
              key={images[currentIndex]?.id}
              custom={exitDirection}
              variants={{
                initial: (dir) => ({ 
                  scale: 0.9, 
                  opacity: 0,
                }),
                animate: { scale: 1, opacity: 1, y: 0, x: 0 },
                exit: (dir) => ({
                  y: dir === 'up' ? -800 : 0,
                  opacity: 0,
                  scale: dir === 'fade' ? 0.9 : 1,
                  transition: { duration: 0.4, ease: 'easeOut' }
                })
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragEnd={(event, info) => {
                if (info.offset.y < -100 || info.velocity.y < -500) {
                  handleSwipeUp();
                }
              }}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing bg-white border border-black/5 flex items-center justify-center"
            >
              <ImageWithFallback
                src={images[currentIndex]?.url}
                alt="Screenshot preview"
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* Swipe Hint Overlay */}
              {showHint && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-none z-10"
                >
                  <div className="flex flex-col items-center gap-3 text-white drop-shadow-md">
                    <ChevronUp size={64} strokeWidth={3} className="animate-bounce" />
                    <p className="text-sm font-bold px-4 py-2 rounded-full bg-black/60 backdrop-blur-md">
                      Swipe up to delete
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pb-10 pt-4 flex flex-col items-center shrink-0 w-full px-6">
        {/* Filmstrip Thumbnails */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative mb-8 w-full overflow-x-auto snap-x snap-mandatory flex items-center scrollbar-hide py-4 h-[110px]"
          style={{ 
            padding: '0 calc(50% - 25px)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => handleThumbnailClick(idx)}
              className={`snap-center shrink-0 rounded-lg overflow-hidden transition-all duration-300 mx-1.5 first:ml-0 last:mr-0 ${
                idx === currentIndex
                  ? 'ring-2 ring-offset-2 ring-[#F29559] scale-110 shadow-lg opacity-100 z-10'
                  : 'opacity-40 hover:opacity-60'
              }`}
              style={{
                width: '50px',
                height: '75px',
                aspectRatio: '50/75'
              }}
            >
              <ImageWithFallback
                src={img.url}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </button>
          ))}
        </div>

        {/* Finish Review Button */}
        <button
          onClick={() => onNavigate('success')}
          className="w-full py-4 rounded-full shadow-sm transition-all active:scale-[0.98] font-bold text-lg border-2 border-[#1A2B3C]/10 hover:bg-[#1A2B3C]/5"
          style={{
            backgroundColor: 'transparent',
            color: '#1A2B3C'
          }}
        >
          Ho finito di scartare
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

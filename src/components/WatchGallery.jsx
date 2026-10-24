import React, { useState } from 'react';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export const WatchGallery = ({ images = [], brand, model }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const validImages = images && images.length > 0
    ? images
    : ['/images/gallery/watch-seamaster-nato-turntable.webp'];

  const currentImage = validImages[selectedIndex] || validImages[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      
      {/* Primary Display Showcase */}
      <div className="relative aspect-[4/3] w-full rounded-md luxury-card overflow-hidden border border-white/10 group flex items-center justify-center bg-dark-900">
        
        {/* Main Watch Image */}
        <img
          src={currentImage}
          alt={`${brand} ${model} - Angle ${selectedIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out cursor-crosshair ${
            isZoomed ? 'scale-125' : 'scale-100 group-hover:scale-105'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Ambient Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 via-transparent to-transparent pointer-events-none" />

        {/* Zoom Hint Icon */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-dark-950/80 border border-white/10 text-neutral-300 hover:text-gold-400 backdrop-blur-md transition-colors"
          title={isZoomed ? "Reset zoom" : "Click to zoom"}
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Previous / Next Arrows (if multiple images) */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-dark-950/70 border border-white/10 text-neutral-300 hover:text-gold-400 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-dark-950/70 border border-white/10 text-neutral-300 hover:text-gold-400 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

      </div>

      {/* Thumbnails Row */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIndex(idx);
                setIsZoomed(false);
              }}
              className={`relative aspect-[4/3] rounded-sm overflow-hidden border transition-all ${
                selectedIndex === idx
                  ? 'border-gold-500 ring-2 ring-gold-500/30 opacity-100'
                  : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

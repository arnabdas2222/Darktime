import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageGalleryBanner = () => {
  // Gallery items supporting .webp, .png, .jpg in 1920x1080 or 1000x1000
  const galleryItems = [
    {
      id: 'custom-1',
      src: '/images/gallery/watch-seamaster-nato-turntable.webp',
      title: 'Omega Seamaster Chronograph "Spec Ops"',
      subtitle: 'Ceramic Bezel • Bond NATO Strap • High-Tech Turntable Studio',
      aspect: '1920x1080 / 1000x1000',
      badge: 'Certified Vault Reference'
    },
    {
      id: 'custom-2',
      src: '/images/gallery/watch-planet-ocean-600m.webp',
      title: 'Omega Seamaster Planet Ocean 600M',
      subtitle: 'Co-Axial Master Chronometer 600m/2000ft • Orange Numerals • Steel Bracelet',
      aspect: '1000x1000',
      badge: 'Deep Ocean Diver'
    },
    {
      id: 'custom-3',
      src: '/images/gallery/watch-seamaster-green-wave.jpg',
      title: 'Omega Seamaster Diver 300M "Green Wave"',
      subtitle: 'Laser-Engraved Wave Dial • Ceramic Bezel • Master Chronometer 8800',
      aspect: '1000x1000',
      badge: 'Collector Edition'
    },
    {
      id: 'custom-4',
      src: '/images/gallery/watch-seamaster-007.jpg',
      title: 'Omega Seamaster Diver 300M "No Time To Die"',
      subtitle: 'Grade 2 Titanium • Tropical Brown Dial • Milanese Titanium Mesh',
      aspect: '1000x1000',
      badge: '007 Heritage'
    },
    {
      id: 'custom-5',
      src: '/images/gallery/watch-seamaster-chrono-wrist.jpg',
      title: 'Omega Seamaster Chronograph Blue',
      subtitle: 'Sunburst Navy Dial • Red Chrono Hands • Tuscan Tan Leather Strap',
      aspect: '1000x1000',
      badge: 'Wrist Performance'
    },
    {
      id: 'custom-6',
      src: '/images/gallery/watch-seamaster-black-wave.jpg',
      title: 'Omega Seamaster Diver 300M Black Ceramic',
      subtitle: 'White Glove Atelier Inspection • High-Gloss Ceramic Dial • Master Chronometer',
      aspect: '1000x1000',
      badge: 'Vault Inspection'
    },
    {
      id: 'custom-7',
      src: '/images/gallery/watch-speedmaster-black.jpg',
      title: 'Omega Speedmaster Dark Side of the Moon',
      subtitle: 'Monobloc Ceramic • Red Racing Subdial Accents • Calibre 9300',
      aspect: '1000x1000',
      badge: 'Ceramic Engineering'
    },
    {
      id: 'custom-8',
      src: '/images/gallery/watch-speedmaster-gold.jpg',
      title: 'Omega Speedmaster Professional 18k Yellow Gold Skeleton',
      subtitle: 'Hand-Engraved Skeleton Movement • Openworked Exhibition Calibre',
      aspect: '1000x1000',
      badge: 'Haute Horlogerie'
    },
    {
      id: 'custom-9',
      src: '/images/gallery/watch-speedmaster-green.jpg',
      title: 'Omega Speedmaster Co-Axial Master Chronometer',
      subtitle: 'Sunburst Olive Green • Tachymetre Bezel • Complete Presentation Box',
      aspect: '1000x1000',
      badge: 'Vault Archive'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeItem = galleryItems[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-400 font-cinzel text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vault Gallery & High-Resolution Exhibits</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-neutral-100 tracking-wider mt-2">
            PRIVATE ATELIER SHOWCASE
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
            High-definition visual archives capturing intricate dial serigraphy, openworked movement finishes, and bespoke metallurgy in ultra-sharp detail.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span>Supports .webp / .png / .jpg (1920x1080 & 1000x1000)</span>
        </div>
      </div>

      {/* Main Feature Banner (Cinematic Hero Stage) */}
      <div className="relative rounded-md overflow-hidden border border-white/10 luxury-card mb-6 group">
        <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[580px] bg-dark-950 flex items-center justify-center overflow-hidden">
          
          {/* Ambient Blurred Backdrop for widescreen feel */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-30 scale-125 transition-all duration-700"
            style={{ backgroundImage: `url(${activeItem.src})` }}
          />

          {/* Sharp Focal Showcase Image */}
          <img
            src={activeItem.src}
            alt={activeItem.title}
            className="relative z-10 max-h-full max-w-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent pointer-events-none z-10" />

          {/* Caption Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 p-5 rounded-md bg-dark-950/80 backdrop-blur-md border border-white/10">
            <div>
              <span className="inline-block text-[10px] uppercase font-bold tracking-[0.25em] text-gold-400 px-2.5 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 mb-2 font-cinzel">
                {activeItem.badge}
              </span>
              <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-neutral-100">
                {activeItem.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                {activeItem.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/40 text-xs text-neutral-200 hover:text-gold-300 transition-colors"
                title="Expand full screen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Resolution</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-dark-900 border border-white/10 hover:border-gold-500/40 text-neutral-300 hover:text-gold-400 flex items-center justify-center transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-dark-900 border border-white/10 hover:border-gold-500/40 text-neutral-300 hover:text-gold-400 flex items-center justify-center transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Grid of Custom Images (9 Exhibits with 1:1 and Widescreen support) */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
        {galleryItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            className={`cursor-pointer rounded-md overflow-hidden border luxury-card transition-all duration-300 group/thumb relative ${
              activeIndex === idx
                ? 'border-gold-500 ring-2 ring-gold-500/30'
                : 'border-white/10 hover:border-gold-500/40 opacity-70 hover:opacity-100'
            }`}
          >
            {/* Thumbnail Box */}
            <div className="relative aspect-square bg-dark-900 flex items-center justify-center overflow-hidden p-1.5">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover rounded-sm group-hover/thumb:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-1.5 left-1.5 right-1.5 text-left">
                <span className="text-[8px] sm:text-[9px] font-cinzel font-semibold text-neutral-200 block truncate">
                  #{idx + 1}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-dark-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-dark-900 border border-white/20 text-neutral-300 hover:text-white transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.src}
              alt={activeItem.title}
              className="max-h-[75vh] max-w-full object-contain rounded-md shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center">
              <h3 className="font-cinzel text-lg font-bold text-neutral-100">
                {activeItem.title}
              </h3>
              <p className="text-xs text-gold-400 font-mono mt-0.5">
                {activeItem.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { CURATED_COLLECTIONS } from '../data/collections';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

export const CollectionsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-dark-900 text-gold-400 text-xs font-cinzel uppercase tracking-[0.2em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Horizons</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-neutral-100 tracking-wider">
          THE DARKTIME COLLECTIONS
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-playfair italic">
          An exploration into high-horology design movements — from astronautical moonwatch chronographs to tourbillons and high-tech ceramic engineering.
        </p>
      </div>

      {/* Collections Stack */}
      <div className="space-y-12">
        {CURATED_COLLECTIONS.map((col, idx) => (
          <div
            key={col.id}
            id={col.id}
            className={`luxury-card rounded-md border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Visual Column */}
            <div className={`lg:col-span-6 relative h-80 sm:h-96 w-full overflow-hidden group ${
              idx % 2 === 1 ? 'lg:order-2' : ''
            }`}>
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded bg-dark-950/80 text-gold-400 border border-gold-500/30 backdrop-blur-md">
                  {col.count}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className={`lg:col-span-6 p-8 sm:p-12 space-y-5 ${
              idx % 2 === 1 ? 'lg:order-1' : ''
            }`}>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-cinzel font-semibold">
                {col.tagline}
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100">
                {col.title}
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {col.description}
              </p>
              <div className="pt-2">
                <Link
                  to={`/watches?brand=${encodeURIComponent(col.filterBrand)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/20"
                >
                  <span>Explore {col.filterBrand} & References</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

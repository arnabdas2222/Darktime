import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export const WatchCard = ({ watch }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(watch.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(watch);
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: watch.currency || 'USD',
    maximumFractionDigits: 0,
  }).format(watch.price);

  const primaryImage = (watch.images && watch.images[0]) || '/images/gallery/watch-seamaster-nato-turntable.webp';

  return (
    <div className="group relative luxury-card rounded-md overflow-hidden flex flex-col h-full border border-white/5 hover:border-gold-500/40 transition-all duration-300">
      
      {/* Image Container with Badges */}
      <div className="relative w-full aspect-[4/3] bg-dark-900 overflow-hidden flex items-center justify-center p-4">
        
        {/* Condition Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm shadow-md backdrop-blur-md ${
            watch.condition === 'New / Unworn'
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
              : watch.condition === 'Vintage'
              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
              : 'bg-dark-950/80 text-neutral-300 border border-white/10'
          }`}>
            {watch.condition}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={favorited ? "Remove from watchlist" : "Add to watchlist"}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-dark-950/70 hover:bg-dark-900 border border-white/10 hover:border-gold-500/40 flex items-center justify-center transition-all backdrop-blur-md group/fav"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorited 
                ? 'fill-gold-400 text-gold-400' 
                : 'text-neutral-400 group-hover/fav:text-gold-400'
            }`}
          />
        </button>

        {/* Product Image with Hover Scale */}
        <Link to={`/watches/${watch.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={primaryImage}
            alt={`${watch.brand} ${watch.model}`}
            loading="lazy"
            className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Availability Strip */}
        {watch.availability && (
          <div className="absolute bottom-2 left-3 z-10 flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 bg-dark-950/90 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5">
            <span className={`w-1.5 h-1.5 rounded-full ${
              watch.availability === 'In Stock'
                ? 'bg-emerald-400 animate-pulse'
                : watch.availability === 'Reserved'
                ? 'bg-amber-400'
                : 'bg-sky-400'
            }`} />
            <span>{watch.availability}</span>
          </div>
        )}
      </div>

      {/* Card Details Body */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-dark-950/40">
        <div>
          {/* Brand */}
          <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase text-gold-400 font-cinzel font-semibold">
            <span>{watch.brand}</span>
            {watch.reference_number && (
              <span className="text-[10px] text-neutral-500 font-mono tracking-normal normal-case">
                Ref. {watch.reference_number.split('.')[0]}
              </span>
            )}
          </div>

          {/* Model Title */}
          <h3 className="mt-1.5 font-cinzel text-sm sm:text-base font-semibold text-neutral-100 group-hover:text-gold-300 transition-colors line-clamp-2 leading-snug">
            <Link to={`/watches/${watch.id}`}>
              {watch.model}
            </Link>
          </h3>

          {/* Key Specs snippet */}
          <div className="mt-2.5 flex items-center gap-2 text-xs text-neutral-400 border-t border-white/5 pt-2.5">
            {watch.case_diameter && <span>{watch.case_diameter}</span>}
            {watch.case_material && (
              <>
                <span>•</span>
                <span className="truncate">{watch.case_material}</span>
              </>
            )}
          </div>
        </div>

        {/* Pricing & Action */}
        <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Offer Price</span>
            <span className="font-cinzel text-lg sm:text-xl font-bold text-neutral-100 tracking-wide">
              {formattedPrice}
            </span>
          </div>

          <Link
            to={`/watches/${watch.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-gold-500/20 text-xs font-medium text-neutral-200 hover:text-gold-300 border border-white/10 hover:border-gold-500/40 transition-all duration-300"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>

    </div>
  );
};

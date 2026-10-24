import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { WatchCard } from '../components/WatchCard';
import { LoadingState } from '../components/LoadingState';
import { Heart, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FavoritesPage = () => {
  const { favoriteWatches, loading } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-400 font-cinzel text-xs uppercase tracking-[0.25em] font-semibold">
            <Heart className="w-3.5 h-3.5 fill-gold-400" />
            <span>Private Portfolio</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-neutral-100 tracking-wider mt-2">
            YOUR WATCHLIST
          </h1>
          <p className="text-neutral-400 text-sm mt-2 max-w-xl">
            Monitored timepieces for immediate acquisition, auction tracking, and provenance updates.
          </p>
        </div>

        <Link
          to="/watches"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 font-semibold"
        >
          <span>Discover More Watches</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingState message="Accessing Saved Horology..." />
      ) : favoriteWatches.length === 0 ? (
        <div className="py-20 px-6 text-center luxury-card rounded-md border border-white/5 my-8">
          <div className="w-16 h-16 rounded-full border border-gold-500/30 bg-dark-900 mx-auto flex items-center justify-center text-gold-400 mb-4">
            <Heart className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="font-cinzel text-xl font-bold text-neutral-200 uppercase tracking-widest">
            Your Watchlist Is Empty
          </h3>
          <p className="text-sm text-neutral-400 max-w-md mx-auto mt-2 leading-relaxed">
            You haven't added any luxury timepieces to your private collection yet. Click the heart icon on any watch in our catalog to save it here.
          </p>
          <div className="mt-6">
            <Link
              to="/watches"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-bold text-xs uppercase tracking-widest hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg"
            >
              <Compass className="w-4 h-4" />
              <span>Explore The Marketplace</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteWatches.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      )}

    </div>
  );
};

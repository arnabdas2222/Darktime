import React from 'react';
import { WatchCard } from './WatchCard';
import { Watch, RotateCcw } from 'lucide-react';

export const WatchGrid = ({ watches, onResetFilters }) => {
  if (!watches || watches.length === 0) {
    return (
      <div className="w-full py-20 px-6 text-center luxury-card rounded-md border border-white/5 my-8">
        <div className="w-16 h-16 rounded-full border border-gold-500/20 bg-dark-900 mx-auto flex items-center justify-center text-gold-400 mb-4">
          <Watch className="w-8 h-8 opacity-60" />
        </div>
        <h3 className="font-cinzel text-xl font-bold text-neutral-200 uppercase tracking-widest">
          No Timepieces Found
        </h3>
        <p className="text-sm text-neutral-400 max-w-md mx-auto mt-2 leading-relaxed">
          We could not match any watches with your selected criteria. Try adjusting your brand, condition, or price range filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-gold-500/50 text-gold-300 hover:bg-gold-500 hover:text-dark-950 font-medium text-xs uppercase tracking-widest transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {watches.map((watch) => (
        <WatchCard key={watch.id} watch={watch} />
      ))}
    </div>
  );
};

import React from 'react';
import { Watch } from 'lucide-react';

export const LoadingState = ({ message = "Curating Haute Horlogerie..." }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing ring */}
        <div className="w-16 h-16 rounded-full border border-gold-500/20 border-t-gold-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Watch className="w-6 h-6 text-gold-400 animate-pulse" />
        </div>
      </div>
      <p className="mt-6 font-cinzel text-xs uppercase tracking-[0.25em] text-neutral-300">
        {message}
      </p>
    </div>
  );
};

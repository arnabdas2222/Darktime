import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ErrorState = ({
  title = "Timepiece Unavailable",
  message = "We were unable to load the requested information from the vault.",
  onRetry
}) => {
  return (
    <div className="max-w-md mx-auto my-16 p-8 luxury-card rounded-md border border-red-500/20 text-center">
      <div className="w-12 h-12 rounded-full border border-red-500/40 bg-red-950/20 flex items-center justify-center mx-auto text-red-400 mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="font-cinzel text-lg font-bold text-neutral-100 uppercase tracking-widest">
        {title}
      </h3>
      <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
        {message}
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-neutral-200 text-xs uppercase tracking-wider rounded-sm border border-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        )}
        <Link
          to="/watches"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold-400 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Browse Marketplace</span>
        </Link>
      </div>
    </div>
  );
};

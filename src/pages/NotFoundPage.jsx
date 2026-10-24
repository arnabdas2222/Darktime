import React from 'react';
import { Link } from 'react-router-dom';
import { Watch, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full luxury-card rounded-md border border-white/10 p-10 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full border border-gold-500/30 bg-dark-900 mx-auto flex items-center justify-center text-gold-400 mb-6">
          <Watch className="w-8 h-8 opacity-70" />
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-cinzel font-semibold">
          Error 404
        </span>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100 mt-2">
          TIME OUT OF JOINT
        </h1>
        <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
          The horological chapter or reference you are seeking does not exist or has been relocated to another vault.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Atelier</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Lock, Globe, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Hero Section */}
      <div className="relative rounded-md overflow-hidden border border-white/10 p-10 sm:p-20 luxury-card text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-cinzel font-semibold">
            The Atelier Standard
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-neutral-100 tracking-wider">
            PRESERVING TIMELESS HOROLOGY
          </h1>
          <p className="text-neutral-300 text-sm sm:text-lg leading-relaxed font-playfair italic">
            Founded with an uncompromising devotion to mechanical purity, DARKTIME curates, authenticates, and safeguards the most exceptional timepieces ever created.
          </p>
        </div>
      </div>

      {/* Philosophy & Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-cinzel font-semibold">
            Geneva Provenance
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-neutral-100 leading-tight">
            INSPECTION BEYOND THE SURFACE
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            In an industry where counterfeits and altered references proliferate, DARKTIME establishes an absolute haven of trust. Each watch entering our vault is disassembled, cataloged, and tested against manufacturer archives in Switzerland.
          </p>
          <ul className="space-y-3 text-xs text-neutral-300">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Microscopic verification of dial serigraphy, bevels, and hands</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Calibre escapement rate, balance amplitude, and beat error diagnostics</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Cross-reference with lost and stolen watch global watch registers</span>
            </li>
          </ul>
        </div>

        <div className="rounded-md overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="/images/gallery/watch-seamaster-black-wave.jpg"
            alt="Master Watchmaker Inspection"
            className="w-full h-96 object-cover"
          />
        </div>
      </div>

      {/* Authentication Charter */}
      <div id="authentication" className="p-8 sm:p-12 rounded-md luxury-card border border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100 uppercase tracking-wider">
            THE FOUR PILLARS OF DARKTIME VAULT
          </h2>
          <p className="text-neutral-400 text-xs mt-2">
            Every transaction is shielded by institutional-grade buyer protection and physical vault inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <ShieldCheck className="w-8 h-8 text-gold-400" />
            <h4 className="font-cinzel text-sm font-bold text-neutral-200">100% Authenticity</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Guaranteed genuine parts down to movement balance wheels, screws, and crystal gasket seals.
            </p>
          </div>

          <div className="space-y-3">
            <Lock className="w-8 h-8 text-gold-400" />
            <h4 className="font-cinzel text-sm font-bold text-neutral-200">Custodial Escrow</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Payment is held safely in Swiss bank custody until you receive the watch and sign off.
            </p>
          </div>

          <div className="space-y-3">
            <Globe className="w-8 h-8 text-gold-400" />
            <h4 className="font-cinzel text-sm font-bold text-neutral-200">Armored Transit</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Discreet door-to-door insured logistics through armored carriers across international borders.
            </p>
          </div>

          <div className="space-y-3">
            <Award className="w-8 h-8 text-gold-400" />
            <h4 className="font-cinzel text-sm font-bold text-neutral-200">2-Year Warranty</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Complimentary mechanical movement warranty backed directly by our accredited master watchmakers.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-6">
        <Link
          to="/watches"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-gold-400 transition-colors shadow-lg"
        >
          <span>Explore The Certified Vault</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Watch, ShieldCheck, Award, Lock, Globe, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-white/5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-200">100% Certified</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Master watchmaker inspection & authentication guarantee</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-200">Escrow Security</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Funds safely held until personal receipt and inspection</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-200">Insured Worldwide</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Discreet armored transport to 130+ nations</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-200">Geneva Standards</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Rigorous COSC & Master Chronometer tolerances</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-gold-500/40 flex items-center justify-center bg-dark-900">
                <Watch className="w-4 h-4 text-gold-400" />
              </div>
              <span className="font-cinzel text-xl font-bold tracking-[0.25em] text-neutral-100">
                DARKTIME
              </span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              DARKTIME is an autonomous luxury watch salon and marketplace dedicated to horological masterpieces, rare vintage references, and certified pre-owned haute horlogerie.
            </p>
            <div className="pt-2 text-xs text-neutral-500 space-y-1">
              <p>DARKTIME Private Vault • Rue du Rhône 42, 1204 Genève</p>
              <p>Direct Concierge: +41 22 555 0199 • concierge@darktime-horology.ch</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-cinzel text-xs uppercase tracking-[0.2em] text-neutral-200 font-semibold">
              Marketplace
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/watches" className="hover:text-gold-300 transition-colors">
                  All Timepieces
                </Link>
              </li>
              <li>
                <Link to="/watches?condition=New+%2F+Unworn" className="hover:text-gold-300 transition-colors">
                  New / Unworn
                </Link>
              </li>
              <li>
                <Link to="/watches?condition=Pre-owned" className="hover:text-gold-300 transition-colors">
                  Certified Pre-owned
                </Link>
              </li>
              <li>
                <Link to="/watches?condition=Vintage" className="hover:text-gold-300 transition-colors">
                  Rare Vintage
                </Link>
              </li>
              <li>
                <Link to="/watches?sort=price-desc" className="hover:text-gold-300 transition-colors">
                  Grand Complications
                </Link>
              </li>
            </ul>
          </div>

          {/* Curated Collections */}
          <div className="space-y-3">
            <h5 className="font-cinzel text-xs uppercase tracking-[0.2em] text-neutral-200 font-semibold">
              Collections
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/collections#grand-complications" className="hover:text-gold-300 transition-colors">
                  Grand Complications
                </Link>
              </li>
              <li>
                <Link to="/collections#dark-ceramic-carbon" className="hover:text-gold-300 transition-colors">
                  Dark Ceramic & Carbon
                </Link>
              </li>
              <li>
                <Link to="/collections#iconic-chronographs" className="hover:text-gold-300 transition-colors">
                  Motorsports Chronographs
                </Link>
              </li>
              <li>
                <Link to="/collections#precious-alloys" className="hover:text-gold-300 transition-colors">
                  Precious Metals & Gold
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier & Client Services */}
          <div className="space-y-3">
            <h5 className="font-cinzel text-xs uppercase tracking-[0.2em] text-neutral-200 font-semibold">
              Concierge
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">
                  The DARKTIME Standard
                </Link>
              </li>
              <li>
                <Link to="/about#authentication" className="hover:text-gold-300 transition-colors">
                  Vault Authentication
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-gold-300 transition-colors">
                  Client Account
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-gold-300 transition-colors">
                  Saved Watchlist
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} DARKTIME Haute Horlogerie S.A. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Escrow</span>
            <span className="hover:text-neutral-400 cursor-pointer">Swiss Horology Registry</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

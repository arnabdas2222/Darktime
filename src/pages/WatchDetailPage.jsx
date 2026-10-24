import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WatchGallery } from '../components/WatchGallery';
import { InquiryModal } from '../components/InquiryModal';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { getWatchById } from '../lib/supabase';
import { useFavorites } from '../context/FavoritesContext';
import { 
  Heart, 
  ShieldCheck, 
  MessageSquare, 
  MapPin, 
  Star, 
  Calendar, 
  Zap, 
  Droplets, 
  Compass, 
  Layers, 
  ChevronRight,
  ArrowLeft,
  Share2,
  Check
} from 'lucide-react';

export const WatchDetailPage = () => {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchErr } = await getWatchById(id);
        if (fetchErr || !data) {
          throw new Error('This reference was not found in the DARKTIME inventory vault.');
        }
        if (mounted) {
          setWatch(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load timepiece information.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDetails();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return <LoadingState message="Accessing Vault Archive & Provenance Record..." />;
  }

  if (error || !watch) {
    return (
      <div className="py-16">
        <ErrorState
          title="Reference Unavailable"
          message={error || "The requested timepiece could not be located."}
        />
      </div>
    );
  }

  const favorited = isFavorite(watch.id);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: watch.currency || 'USD',
    maximumFractionDigits: 0,
  }).format(watch.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb & Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex items-center space-x-2">
          <Link to="/" className="hover:text-gold-300 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link to="/watches" className="hover:text-gold-300 transition-colors">Marketplace</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-gold-400 font-medium">{watch.brand}</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-300 truncate max-w-[200px]">{watch.model}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-dark-900 border border-white/10 text-neutral-300 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share Reference'}</span>
          </button>

          <Link
            to="/watches"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-dark-900 border border-white/10 text-neutral-300 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Gallery & Watch Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Gallery (7 Cols) */}
        <div className="lg:col-span-7">
          <WatchGallery
            images={watch.images}
            brand={watch.brand}
            model={watch.model}
          />

          {/* Seller / Vault Provenance Banner below gallery */}
          <div className="mt-8 p-6 rounded-md luxury-card border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-dark-900 flex items-center justify-center text-gold-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-neutral-100 flex items-center gap-2">
                    <span>{watch.seller_name || 'DARKTIME Certified Vault'}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30">
                      Verified
                    </span>
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      {watch.seller_location || 'Geneva, Switzerland'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                      {watch.seller_rating || 5.0} / 5.0 Collector Score
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pt-2 border-t border-white/5">
              Timepiece physically held in vault storage. Inspected by master watchmakers with complete movement timing certificate and provenance documentation.
            </p>
          </div>
        </div>

        {/* Right Column: Pricing, Specs & CTA (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header & Brand */}
          <div>
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold-400 font-bold">
                {watch.brand}
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm border ${
                watch.condition === 'New / Unworn'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                  : 'bg-dark-950 text-neutral-300 border-white/10'
              }`}>
                {watch.condition}
              </span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100 mt-2 leading-snug">
              {watch.model}
            </h1>

            {watch.reference_number && (
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Reference: <strong className="text-neutral-200">{watch.reference_number}</strong>
              </p>
            )}
          </div>

          {/* Pricing Box */}
          <div className="p-6 rounded-md luxury-card border border-gold-500/20 bg-dark-900/60">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                  Fixed Acquisition Price
                </span>
                <span className="font-cinzel text-3xl sm:text-4xl font-bold gold-gradient-text tracking-wide">
                  {formattedPrice}
                </span>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded ${
                  watch.availability === 'In Stock'
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  {watch.availability}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Includes Swiss Escrow protection & fully insured worldwide transit</span>
            </p>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setInquiryOpen(true)}
                className="w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Seller / Private Inquiry</span>
              </button>

              <button
                onClick={() => toggleFavorite(watch)}
                className={`w-full py-3 rounded-sm border text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all ${
                  favorited
                    ? 'border-gold-500/60 bg-gold-500/10 text-gold-300'
                    : 'border-white/20 bg-dark-900 hover:border-gold-500/40 text-neutral-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-gold-400 text-gold-400' : 'text-neutral-400'}`} />
                <span>{favorited ? 'In Your Watchlist' : 'Add to Watchlist'}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          {watch.description && (
            <div className="space-y-2">
              <h3 className="font-cinzel text-xs uppercase tracking-[0.2em] text-neutral-200 font-bold">
                Atelier Provenance & Overview
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                {watch.description}
              </p>
            </div>
          )}

          {/* Technical Specifications Matrix */}
          <div className="space-y-3 pt-4 border-t border-white/5">
            <h3 className="font-cinzel text-xs uppercase tracking-[0.2em] text-neutral-200 font-bold">
              Technical Specifications
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded bg-dark-900/60 border border-white/5">
                <span className="text-[10px] uppercase text-neutral-500 block">Case Diameter</span>
                <span className="font-medium text-neutral-200">{watch.case_diameter || 'N/A'}</span>
              </div>
              <div className="p-3 rounded bg-dark-900/60 border border-white/5">
                <span className="text-[10px] uppercase text-neutral-500 block">Case Material</span>
                <span className="font-medium text-neutral-200 truncate block">{watch.case_material || 'N/A'}</span>
              </div>
              <div className="p-3 rounded bg-dark-900/60 border border-white/5">
                <span className="text-[10px] uppercase text-neutral-500 block">Movement</span>
                <span className="font-medium text-neutral-200 truncate block">{watch.movement || 'N/A'}</span>
              </div>
              <div className="p-3 rounded bg-dark-900/60 border border-white/5">
                <span className="text-[10px] uppercase text-neutral-500 block">Dial Color</span>
                <span className="font-medium text-neutral-200">{watch.dial_color || 'N/A'}</span>
              </div>
              <div className="p-3 rounded bg-dark-900/60 border border-white/5">
                <span className="text-[10px] uppercase text-neutral-500 block">Water Resistance</span>
                <span className="font-medium text-neutral-200">{watch.water_resistance || 'N/A'}</span>
              </div>
              <div className="p-3 rounded bg-dark-900/60 border border-white/5">
                <span className="text-[10px] uppercase text-neutral-500 block">Power Reserve</span>
                <span className="font-medium text-neutral-200">{watch.power_reserve || 'N/A'}</span>
              </div>
              <div className="p-3 rounded bg-dark-900/60 border border-white/5">
                <span className="text-[10px] uppercase text-neutral-500 block">Bezel</span>
                <span className="font-medium text-neutral-200 truncate block">{watch.bezel_material || 'N/A'}</span>
              </div>
              <div className="p-3 rounded bg-dark-900/60 border border-white/5">
                <span className="text-[10px] uppercase text-neutral-500 block">Production Year</span>
                <span className="font-medium text-neutral-200">{watch.year || 'Modern'}</span>
              </div>
            </div>

            {watch.bracelet_material && (
              <div className="p-3 rounded bg-dark-900/60 border border-white/5 text-xs">
                <span className="text-[10px] uppercase text-neutral-500 block">Strap / Bracelet</span>
                <span className="font-medium text-neutral-200">{watch.bracelet_material}</span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        watch={watch}
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />

    </div>
  );
};

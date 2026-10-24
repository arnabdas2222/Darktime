import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroVideo } from '../components/HeroVideo';
import { WatchCard } from '../components/WatchCard';
import { LoadingState } from '../components/LoadingState';
import { ImageGalleryBanner } from '../components/ImageGalleryBanner';
import { CURATED_COLLECTIONS } from '../data/collections';
import { getWatches } from '../lib/supabase';
import { 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Compass, 
  Lock, 
  Clock, 
  Layers,
  ChevronRight
} from 'lucide-react';

export const HomePage = () => {
  const [featuredWatches, setFeaturedWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const { data } = await getWatches();
        if (mounted) {
          // Select featured watches
          const featured = data.filter(w => w.featured).slice(0, 4);
          setFeaturedWatches(featured.length > 0 ? featured : data.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load featured watches:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Main Luxury Watch Hero Video Section (Omega Inspired) */}
      <HeroVideo
        videoSrc="https://assets.mixkit.co/videos/preview/mixkit-wrist-watch-in-a-studio-setting-42284-large.mp4"
        posterSrc="/images/gallery/watch-seamaster-nato-turntable.webp"
        badge="THE OMEGA & HAUTE HORLOGERIE SPIRIT"
        title="Designed to Stand Out. Built to Last."
        subtitle="Where horological mastery meets timeless aesthetics. Explore extraordinary timepieces engineered with unmatched precision and storied heritage."
        ctaText="Explore Timepieces"
        ctaLink="/watches"
        secondaryCtaText="Curated Collections"
        secondaryCtaLink="/collections"
        align="center"
      />

      {/* 2. Featured Watches Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-gold-400 font-cinzel text-xs uppercase tracking-[0.25em] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vault Highlights</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-neutral-100 tracking-wider mt-2">
              FEATURED ACQUISITIONS
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Each timepiece is thoroughly examined, chronometer-tested, and certified by our master watchmakers.
            </p>
          </div>
          <Link
            to="/watches"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-400 hover:text-gold-300 font-semibold group"
          >
            <span>View All Timepieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <LoadingState message="Inspecting Vault Pieces..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Secondary Cinematic Promotional Section (Omega Craftsmanship Highlight) */}
      <section className="relative w-full py-24 bg-dark-900 border-y border-white/5 overflow-hidden">
        {/* Ambient Dark Gradient Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 filter blur-[1px]"
          style={{ backgroundImage: `url('/images/gallery/watch-speedmaster-gold.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/90 to-dark-950/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-cinzel font-semibold block mb-3">
              HAUTE HORLOGERIE ATELIER
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-neutral-100 tracking-wide leading-tight mb-6">
              THE ART OF CERAMIC & METALLURGY
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-playfair italic">
              From monobloc black zirconium oxide ceramic to 18k proprietary alloys, our timepieces encapsulate the pinnacle of scientific innovation and artisanal hand-chamfering.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10 mb-8">
              <div>
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-400 block">
                  0.01 sec
                </span>
                <span className="text-xs text-neutral-400 uppercase tracking-wider mt-1 block">
                  Chronometric Precision
                </span>
              </div>
              <div>
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-400 block">
                  15,000+
                </span>
                <span className="text-xs text-neutral-400 uppercase tracking-wider mt-1 block">
                  Gauss Magnetic Resistance
                </span>
              </div>
            </div>
            <Link
              to="/watches?condition=New+%2F+Unworn"
              className="inline-flex items-center gap-2 px-7 py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/10"
            >
              <span>Explore Master Chronometers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Luxury Visual Frame */}
          <div className="relative rounded-md overflow-hidden border border-white/10 shadow-2xl group">
            <img
              src="/images/gallery/watch-seamaster-black-wave.jpg"
              alt="Luxury Horology Craftsmanship"
              className="w-full h-96 sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-dark-950/70 backdrop-blur-md border border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-cinzel">DARKTIME Certified</span>
              <p className="text-xs text-neutral-200 mt-1 font-medium">Geneva Seal & Master Chronometer Standard Verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Curated Collections Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-cinzel font-semibold block mb-2">
            Thematic Curations
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-neutral-100 tracking-wider">
            EXPLORE TIMEPIECE PILLARS
          </h2>
          <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
            Navigate through curated horological disciplines, each reflecting decades of innovation and historic mechanical breakthroughs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CURATED_COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              to={`/watches?brand=${encodeURIComponent(col.filterBrand)}`}
              className="group relative h-96 rounded-md overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-end p-8"
            >
              {/* Background Image */}
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />

              {/* Collection Card Content */}
              <div className="relative z-10">
                <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold px-2.5 py-1 rounded bg-dark-900/80 border border-gold-500/30 mb-3">
                  {col.count}
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-neutral-100 group-hover:text-gold-300 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-2 max-w-md line-clamp-2 leading-relaxed">
                  {col.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gold-400 group-hover:text-gold-300 uppercase tracking-widest">
                  <span>Enter Collection</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Custom Exhibition Image Gallery & Banner */}
      <ImageGalleryBanner />

      {/* 6. Why DARKTIME / The Atelier Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="luxury-card p-8 rounded-md border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-full border border-gold-500/30 bg-dark-900 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
              MULTI-POINT VAULT INSPECTION
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every watch undergoes microscopic case inspection, chronocomparator rate stability testing, amplitude check, and waterproof pressure chamber validation.
            </p>
          </div>

          <div className="luxury-card p-8 rounded-md border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-full border border-gold-500/30 bg-dark-900 flex items-center justify-center text-gold-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
              SWISS ESCROW PROTOCOL
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Transactions are held in a secure Swiss custodial account. Funds are released to the seller only after your personal 48-hour inspection period.
            </p>
          </div>

          <div className="luxury-card p-8 rounded-md border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-full border border-gold-500/30 bg-dark-900 flex items-center justify-center text-gold-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
              WHITE-GLOVE CONCIERGE
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Armored door-to-door courier service across Zurich, Geneva, London, Dubai, Tokyo, and New York, complete with transit insurance up to \$1,000,000.
            </p>
          </div>

        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-md overflow-hidden luxury-glass border border-gold-500/30 p-10 sm:p-16 text-center shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-cinzel font-semibold">
              ACCREDITED HOROLOGY NETWORK
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-neutral-100 tracking-wider">
              ACQUIRE YOUR NEXT HOROLOGICAL ICON
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Whether you are expanding a high-complication portfolio or acquiring your first certified vintage chronograph, DARKTIME ensures absolute discretion and verified provenance.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/watches"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg"
              >
                Browse All 12+ Vault References
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto px-8 py-3.5 bg-dark-900 border border-white/20 text-neutral-200 text-xs uppercase tracking-[0.2em] rounded-sm hover:border-gold-500/40 transition-all"
              >
                Our Authentication Charter
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

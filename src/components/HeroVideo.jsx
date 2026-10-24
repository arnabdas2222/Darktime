import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroVideo = ({
  videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-wrist-watch-in-a-studio-setting-42284-large.mp4",
  posterSrc = "/images/gallery/watch-seamaster-nato-turntable.webp",
  badge = "DARKTIME MASTERPIECE SERIES",
  title = "Designed to Stand Out. Built to Last.",
  subtitle = "Where horological mastery meets timeless aesthetics. Explore extraordinary timepieces engineered with unmatched precision and storied heritage.",
  ctaText = "Explore Collection",
  ctaLink = "/watches",
  secondaryCtaText = "Discover Atelier",
  secondaryCtaLink = "/about",
  align = "center" // 'center' or 'left'
}) => {
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay was prevented or video source unavailable; falling back to luxury poster backdrop:", error);
            setVideoError(true);
          });
      }
    }
  }, [videoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="relative w-full h-[88vh] min-h-[600px] max-h-[960px] overflow-hidden bg-dark-950 flex items-center justify-center">
      
      {/* Background Video or Graceful Fallback Poster */}
      {!videoError ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setIsVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-70 scale-100' : 'opacity-40 scale-105'
          }`}
        />
      ) : (
        /* Graceful Poster Fallback with High-Definition Luxury Visuals */
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 scale-100 transition-transform duration-1000 ease-out"
          style={{ backgroundImage: `url(${posterSrc})` }}
        />
      )}

      {/* Cinematic Dark Vignette & Gradient Overlays (Omega style) */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-dark-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-dark-950/40 to-dark-950/90" />

      {/* Content Container */}
      <div className={`relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center ${align === 'left' ? 'md:text-left md:items-start md:mx-0 md:max-w-3xl md:pl-16' : ''}`}>
        
        {/* Prestige Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-dark-900/80 backdrop-blur-md mb-6 shadow-xl mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gold-300">
            {badge}
          </span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-[0.04em] sm:tracking-[0.06em] text-neutral-100 leading-tight sm:leading-snug mb-6 uppercase text-center mx-auto max-w-4xl px-2">
          {title === "Designed to Stand Out. Built to Last." ? (
            <span className="block text-center">
              <span className="inline-block">Designed to Stand Out.</span>{" "}
              <span className="gold-gradient-text inline-block">Built to Last.</span>
            </span>
          ) : (
            <span className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'gold-gradient-text' : ''}>
                  {word}
                </span>
              ))}
            </span>
          )}
        </h1>

        {/* Narrative Subtitle */}
        <p className="font-playfair italic text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal text-center">
          {subtitle}
        </p>

        {/* Call to Actions */}
        <div className={`flex flex-col sm:flex-row items-center gap-4 justify-center w-full ${align === 'left' ? 'md:justify-start' : ''}`}>
          <Link
            to={ctaLink}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 group"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {secondaryCtaText && (
            <Link
              to={secondaryCtaLink}
              className="w-full sm:w-auto px-8 py-3.5 bg-dark-900/80 hover:bg-dark-800 text-neutral-200 border border-white/20 hover:border-gold-500/40 text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 backdrop-blur-md flex items-center justify-center"
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>

      </div>

      {/* Media Controls for Authenticity (Only when video is functional) */}
      {!videoError && (
        <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-dark-900/70 border border-white/10 hover:border-gold-500/40 text-neutral-300 hover:text-gold-300 flex items-center justify-center transition-colors backdrop-blur-md"
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-dark-900/70 border border-white/10 hover:border-gold-500/40 text-neutral-300 hover:text-gold-300 flex items-center justify-center transition-colors backdrop-blur-md"
            title={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none opacity-60">
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Explore Atelier</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-gold-400 to-transparent animate-pulse" />
      </div>

    </div>
  );
};

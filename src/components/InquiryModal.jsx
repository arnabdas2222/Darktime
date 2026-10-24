import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { submitInquiryApi } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const InquiryModal = ({ watch, isOpen, onClose }) => {
  const { user, profile } = useAuth();
  const [name, setName] = useState(profile?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [message, setMessage] = useState(
    `I am interested in acquiring the ${watch?.brand} ${watch?.model} (Ref: ${watch?.reference_number || 'N/A'}). Please confirm availability and escrow delivery arrangements.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !watch) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const { error } = await submitInquiryApi({
        watchId: watch.id,
        userId: user?.id,
        name,
        email,
        phone,
        message,
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Inquiry error:', err);
      setErrorMsg(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg luxury-card border border-white/10 rounded-md p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-cinzel font-semibold">
                Direct Atelier Inquiry
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-100 mt-1">
                Inquire on Timepiece
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {watch.brand} — {watch.model}
              </p>
              <p className="text-xs text-gold-400 font-mono mt-0.5">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: watch.currency || 'USD' }).format(watch.price)}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded bg-red-950/50 border border-red-500/40 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lord Alexander Vance"
                  className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexander@domain.com"
                    className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+41 22 555 0199"
                    className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Private Inquiry Message *
                </label>
                <textarea
                  rows="3"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm p-3 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-500/10 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting Dispatch...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Concierge Inquiry</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-500/70" />
                <span>Protected by Swiss Escrow & Client Discretion Protocol</span>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full border border-gold-500/40 bg-dark-900 mx-auto flex items-center justify-center text-gold-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-neutral-100 uppercase tracking-widest">
              Inquiry Dispatched
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-neutral-200">{name}</strong>. A dedicated senior horologist from {watch.seller_name} will review your request and contact you at <strong className="text-neutral-200">{email}</strong> within 2 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-sm bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-colors"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

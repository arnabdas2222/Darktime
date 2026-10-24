import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Heart, 
  LogOut, 
  Clock, 
  CheckCircle, 
  Sparkles,
  DollarSign,
  Save,
  MessageSquare
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, profile, updateProfile, signOut, isDemoMode } = useAuth();
  const { favoriteIds } = useFavorites();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [currency, setCurrency] = useState(profile?.preferred_currency || 'USD');
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Local inquiries cache
  const [userInquiries, setUserInquiries] = useState([]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setCurrency(profile.preferred_currency || 'USD');
    }

    try {
      const rawInq = localStorage.getItem('darktime_inquiries_cache');
      if (rawInq) {
        setUserInquiries(JSON.parse(rawInq));
      }
    } catch (e) {
      console.warn('Inquiries cache load error:', e);
    }
  }, [profile]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage('');

    try {
      await updateProfile({
        full_name: fullName,
        phone,
        preferred_currency: currency,
      });
      setStatusMessage('Collector profile updated successfully.');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.error('Update profile error:', err);
      setStatusMessage('Failed to update profile: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Profile Header */}
      <div className="luxury-card rounded-md border border-white/10 p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-2xl">
        <div className="w-24 h-24 rounded-full border-2 border-gold-500/50 overflow-hidden bg-dark-900 flex items-center justify-center shrink-0 shadow-xl">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-gold-400" />
          )}
        </div>

        <div className="flex-grow text-center sm:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100">
              {profile?.full_name || 'Accredited Collector'}
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              Verified Tier
            </span>
          </div>
          <p className="text-xs text-neutral-400 flex items-center justify-center sm:justify-start gap-2">
            <Mail className="w-3.5 h-3.5 text-neutral-500" />
            <span>{user?.email}</span>
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-gold-400" />
              <strong>{favoriteIds.length}</strong> Saved in Watchlist
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
              <strong>{userInquiries.length}</strong> Concierge Inquiries
            </span>
          </div>
        </div>

        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-950/40 hover:bg-red-900/40 border border-red-500/30 text-red-300 text-xs uppercase tracking-wider rounded-sm transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Grid: Edit Info & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Settings Form (7 cols) */}
        <div className="lg:col-span-7 luxury-card rounded-md border border-white/10 p-8 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
              COLLECTOR CREDENTIALS
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Update personal concierge communications and preferred acquisition currency.
            </p>
          </div>

          {statusMessage && (
            <div className={`p-3 rounded text-xs flex items-center gap-2 ${
              statusMessage.includes('Failed') 
                ? 'bg-red-950/50 border border-red-500/40 text-red-300' 
                : 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
            }`}>
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Full Collector Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Phone Number / Concierge WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+41 22 555 0199"
                className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Preferred Valuation Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none cursor-pointer"
              >
                <option value="USD">USD ($) - United States Dollar</option>
                <option value="CHF">CHF (Fr.) - Swiss Franc</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Updating Vault...' : 'Save Profile Details'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Actions & Inquiries Overview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Watchlist Quick Access Card */}
          <div className="luxury-card rounded-md border border-white/10 p-6 space-y-4">
            <h3 className="font-cinzel text-sm font-bold text-neutral-200 tracking-wider flex items-center justify-between">
              <span>WATCHLIST OVERVIEW</span>
              <Heart className="w-4 h-4 text-gold-400" />
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              You have <strong className="text-neutral-100">{favoriteIds.length}</strong> timepieces saved for private monitoring and price movement alerts.
            </p>
            <Link
              to="/favorites"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 font-semibold"
            >
              <span>View Full Watchlist</span>
              <span>→</span>
            </Link>
          </div>

          {/* Recent Inquiries List */}
          <div className="luxury-card rounded-md border border-white/10 p-6 space-y-4">
            <h3 className="font-cinzel text-sm font-bold text-neutral-200 tracking-wider flex items-center justify-between">
              <span>CONCIERGE DISPATCHES</span>
              <MessageSquare className="w-4 h-4 text-gold-400" />
            </h3>

            {userInquiries.length === 0 ? (
              <p className="text-xs text-neutral-500 italic py-2">
                No active watch inquiries. You can submit inquiries directly from any watch detail page.
              </p>
            ) : (
              <div className="space-y-3">
                {userInquiries.slice(0, 3).map((inq, i) => (
                  <div key={i} className="p-3 rounded bg-dark-900 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-gold-400 font-medium">Inquiry #{inq.id?.slice(-6)}</span>
                      <span className="text-emerald-400 uppercase font-semibold">{inq.status}</span>
                    </div>
                    <p className="text-xs text-neutral-300 line-clamp-1">{inq.message}</p>
                    <span className="text-[10px] text-neutral-500 block">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

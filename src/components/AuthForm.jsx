import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Watch, Lock, Mail, User, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export const AuthForm = ({ mode = 'signin' }) => {
  const isSignUp = mode === 'signup';
  const { signIn, signUp, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Destination after login
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        await signUp({ email, password, fullName });
      } else {
        await signIn({ email, password });
      }
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto luxury-card rounded-md border border-white/10 p-8 shadow-2xl">
      
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-full border border-gold-500/40 bg-dark-900 mx-auto flex items-center justify-center text-gold-400 mb-3 shadow-lg">
          <Watch className="w-6 h-6" />
        </div>
        <h2 className="font-cinzel text-2xl font-bold tracking-[0.15em] text-neutral-100">
          {isSignUp ? 'JOIN THE ATELIER' : 'CLIENT ACCESS'}
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          {isSignUp 
            ? 'Create your DARKTIME portfolio and access rare private allocations' 
            : 'Access your authenticated watch vault and private inquiries'}
        </p>
      </div>

      {/* Demo Notice Banner */}
      {isDemoMode && (
        <div className="mb-6 p-3 rounded bg-gold-950/30 border border-gold-500/30 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-gold-300 leading-snug">
            <strong>Atelier Demo Mode Active:</strong> You can enter any email & password (or demo credentials) to test authentication, client profile, and watchlist persistence!
          </div>
        </div>
      )}

      {/* Error Notice */}
      {error && (
        <div className="mb-6 p-3 rounded bg-red-950/50 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {isSignUp && (
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Maximilian von Bern"
                className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm pl-10 pr-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@darktime-horology.com"
              className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm pl-10 pr-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm pl-10 pr-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <span>{isSignUp ? 'Create Client Portfolio' : 'Authorize Vault Entry'}</span>
            )}
          </button>
        </div>

      </form>

      {/* Switch Form Mode */}
      <div className="mt-6 pt-5 border-t border-white/5 text-center text-xs text-neutral-400">
        {isSignUp ? (
          <p>
            Already an accredited collector?{' '}
            <Link to="/signin" className="text-gold-400 hover:text-gold-300 font-medium">
              Sign In
            </Link>
          </p>
        ) : (
          <p>
            New to DARKTIME?{' '}
            <Link to="/signup" className="text-gold-400 hover:text-gold-300 font-medium">
              Register Portfolio
            </Link>
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-neutral-500">
        <ShieldCheck className="w-3.5 h-3.5 text-gold-500/60" />
        <span>End-to-End Encrypted Session</span>
      </div>

    </div>
  );
};

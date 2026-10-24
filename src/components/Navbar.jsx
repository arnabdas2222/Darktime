import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { 
  Watch, 
  Heart, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ShieldCheck, 
  Compass, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const { favoriteIds } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserDropdownOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-xs uppercase tracking-[0.2em] transition-colors py-1 ${
      isActive
        ? 'text-gold-400 font-medium border-b-2 border-gold-400'
        : 'text-neutral-300 hover:text-gold-300'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full luxury-glass border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Wordmark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center bg-dark-900 group-hover:border-gold-400 transition-colors">
              <Watch className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.25em] text-neutral-100 group-hover:text-gold-300 transition-colors">
                DARKTIME
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-400 font-sans -mt-1">
                Haute Horlogerie
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/watches" className={navLinkClass}>
              Explore Watches
            </NavLink>
            <NavLink to="/collections" className={navLinkClass}>
              Collections
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Favorites Icon */}
            <Link
              to="/favorites"
              className="relative p-2 text-neutral-300 hover:text-gold-300 transition-colors rounded-full hover:bg-white/5"
              title="Watchlist"
            >
              <Heart className="w-5 h-5" />
              {favoriteIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold-500 text-dark-950 font-bold text-[10px] rounded-full flex items-center justify-center shadow-lg">
                  {favoriteIds.length}
                </span>
              )}
            </Link>

            {/* Authenticated User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-3 pr-2 rounded-full border border-white/10 hover:border-gold-500/40 bg-dark-900 text-neutral-200 transition-all text-xs tracking-wider"
                >
                  <span className="max-w-[120px] truncate text-neutral-300 font-medium">
                    {profile?.full_name || user.email?.split('@')[0]}
                  </span>
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gold-500/20 flex items-center justify-center text-gold-300 text-xs font-semibold">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-52 rounded-md luxury-card border border-white/10 py-1.5 shadow-2xl z-50 animate-fadeIn"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs text-neutral-400">Signed in as</p>
                      <p className="text-xs font-semibold text-neutral-100 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-300 hover:text-gold-300 hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4 text-gold-400" />
                      Client Profile
                    </Link>

                    <Link
                      to="/favorites"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-300 hover:text-gold-300 hover:bg-white/5 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-gold-400" />
                      My Watchlist ({favoriteIds.length})
                    </Link>

                    <div className="border-t border-white/10 my-1"></div>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Non-authenticated Auth Buttons */
              <div className="flex items-center space-x-3">
                <Link
                  to="/signin"
                  className="text-xs uppercase tracking-widest text-neutral-300 hover:text-gold-300 transition-colors px-3 py-1.5"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-xs uppercase tracking-widest px-4 py-2 rounded-sm border border-gold-500/60 text-gold-300 hover:bg-gold-500 hover:text-dark-950 font-medium transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              to="/favorites"
              className="relative p-2 text-neutral-300 hover:text-gold-300"
            >
              <Heart className="w-5 h-5" />
              {favoriteIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold-500 text-dark-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                  {favoriteIds.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-gold-300 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-dark-950/95 backdrop-blur-xl px-6 py-6 space-y-4">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-neutral-300 hover:text-gold-300 py-2 border-b border-white/5"
          >
            Home
          </NavLink>
          <NavLink
            to="/watches"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-neutral-300 hover:text-gold-300 py-2 border-b border-white/5"
          >
            Explore Watches
          </NavLink>
          <NavLink
            to="/collections"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-neutral-300 hover:text-gold-300 py-2 border-b border-white/5"
          >
            Collections
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-neutral-300 hover:text-gold-300 py-2 border-b border-white/5"
          >
            About
          </NavLink>

          {user ? (
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3 py-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Verified Collector: {user.email}</span>
              </div>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-neutral-200 hover:text-gold-300 py-1"
              >
                Client Profile
              </Link>
              <Link
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-neutral-200 hover:text-gold-300 py-1"
              >
                Watchlist ({favoriteIds.length})
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-sm text-red-400 py-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 flex flex-col space-y-3">
              <Link
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm uppercase tracking-widest text-neutral-300 border border-white/20 rounded"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm uppercase tracking-widest bg-gold-500 text-dark-950 font-semibold rounded"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

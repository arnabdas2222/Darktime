import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

const DEMO_USER_KEY = 'darktime_demo_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured());

  // Initialize Auth
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (mounted) {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
              fetchProfile(session.user.id);
            }
          }

          // Listen for auth state changes
          const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (mounted) {
              setSession(session);
              setUser(session?.user ?? null);
              if (session?.user) {
                fetchProfile(session.user.id);
              } else {
                setProfile(null);
              }
            }
          });

          return () => {
            subscription.unsubscribe();
          };
        } catch (err) {
          console.error('Error fetching Supabase session:', err);
        }
      } else {
        // Fallback demo user check
        try {
          const stored = localStorage.getItem(DEMO_USER_KEY);
          if (stored) {
            const demoUser = JSON.parse(stored);
            setUser(demoUser);
            setProfile({
              id: demoUser.id,
              full_name: demoUser.user_metadata?.full_name || 'Lord Horologist',
              email: demoUser.email,
              avatar_url: demoUser.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              phone: '+41 22 555 0199',
              preferred_currency: 'USD'
            });
          }
        } catch (e) {
          console.warn('Demo user load error:', e);
        }
      }

      if (mounted) {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const fetchProfile = async (userId) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data);
      } else {
        // Fallback profile if record not yet generated
        setProfile({
          id: userId,
          email: user?.email,
          full_name: user?.user_metadata?.full_name || user?.email?.split('@')[0],
          avatar_url: null,
          preferred_currency: 'USD'
        });
      }
    } catch (err) {
      console.warn('Error fetching profile:', err);
    }
  };

  const signIn = async ({ email, password }) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    }

    // Demo Mode Sign In
    const demoUser = {
      id: 'demo-user-' + btoa(email).slice(0, 8),
      email,
      user_metadata: {
        full_name: email.split('@')[0].toUpperCase(),
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      }
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    setProfile({
      id: demoUser.id,
      email: demoUser.email,
      full_name: demoUser.user_metadata.full_name,
      avatar_url: demoUser.user_metadata.avatar_url,
      phone: '+41 22 555 0199',
      preferred_currency: 'USD'
    });
    return { user: demoUser, session: { access_token: 'demo_token' } };
  };

  const signUp = async ({ email, password, fullName }) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;
      return data;
    }

    // Demo Mode Sign Up
    const demoUser = {
      id: 'demo-user-' + Date.now(),
      email,
      user_metadata: {
        full_name: fullName || email.split('@')[0],
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      }
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    setProfile({
      id: demoUser.id,
      email: demoUser.email,
      full_name: fullName || demoUser.user_metadata.full_name,
      avatar_url: demoUser.user_metadata.avatar_url,
      phone: '',
      preferred_currency: 'USD'
    });
    return { user: demoUser, session: { access_token: 'demo_token' } };
  };

  const signOut = async () => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
    localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const updateProfile = async (updates) => {
    if (isSupabaseConfigured() && supabase && user) {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.full_name,
          phone: updates.phone,
          preferred_currency: updates.preferred_currency,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    }

    // Demo Mode Update
    const updated = {
      ...profile,
      ...updates
    };
    setProfile(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isDemoMode,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import { createClient } from '@supabase/supabase-js';
import { SAMPLE_WATCHES } from '../data/sampleWatches';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid Supabase configuration is supplied
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

// Create real client or fallback mock client
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Local storage key for fallback favorites & inquiries when Supabase is not connected
const LOCAL_FAVORITES_KEY = 'darktime_favorites_cache';
const LOCAL_INQUIRIES_KEY = 'darktime_inquiries_cache';

// Helper to get local favorites
const getLocalFavorites = () => {
  try {
    const raw = localStorage.getItem(LOCAL_FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// ==========================================
// DATA API (Unified Supabase + Graceful Demo)
// ==========================================

export const getWatches = async () => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('watches')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return { data, error: null, source: 'supabase' };
      }
      if (error) {
        console.warn('Supabase fetch failed, using luxury sample data:', error.message);
      }
    } catch (err) {
      console.warn('Supabase connection error:', err);
    }
  }

  // Fallback to sample luxury watches
  return { data: SAMPLE_WATCHES, error: null, source: 'demo' };
};

export const getWatchById = async (id) => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('watches')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return { data, error: null, source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase getWatchById error:', err);
    }
  }

  // Fallback find in sample data
  const found = SAMPLE_WATCHES.find(w => w.id === id);
  if (found) {
    return { data: found, error: null, source: 'demo' };
  }

  return { data: null, error: new Error('Watch not found'), source: 'demo' };
};

export const getFavorites = async (userId) => {
  if (!userId) return { data: [], error: null };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('watch_id, watches(*)')
        .eq('user_id', userId);

      if (!error && data) {
        // Return array of watch objects
        const watches = data.map(item => item.watches).filter(Boolean);
        return { data: watches, watchIds: data.map(item => item.watch_id), error: null };
      }
    } catch (err) {
      console.warn('Supabase getFavorites error:', err);
    }
  }

  // Local Storage fallback for guest or demo
  const localIds = getLocalFavorites();
  const watches = SAMPLE_WATCHES.filter(w => localIds.includes(w.id));
  return { data: watches, watchIds: localIds, error: null };
};

export const toggleFavoriteApi = async (userId, watchId) => {
  if (isSupabaseConfigured() && supabase && userId) {
    try {
      // Check if already favorited
      const { data: existing } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('watch_id', watchId)
        .maybeSingle();

      if (existing) {
        // Remove
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('watch_id', watchId);
        return { favorited: false, error: null };
      } else {
        // Add
        await supabase
          .from('favorites')
          .insert({ user_id: userId, watch_id: watchId });
        return { favorited: true, error: null };
      }
    } catch (err) {
      console.warn('Supabase toggle favorite error:', err);
    }
  }

  // Local storage fallback
  const current = getLocalFavorites();
  let updated;
  let favorited;
  if (current.includes(watchId)) {
    updated = current.filter(id => id !== watchId);
    favorited = false;
  } else {
    updated = [...current, watchId];
    favorited = true;
  }
  localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(updated));
  return { favorited, error: null };
};

export const submitInquiryApi = async (inquiryData) => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          watch_id: inquiryData.watchId || null,
          user_id: inquiryData.userId || null,
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone || '',
          message: inquiryData.message,
          status: 'pending'
        })
        .select()
        .single();

      if (!error) {
        return { data, error: null };
      }
    } catch (err) {
      console.warn('Supabase submit inquiry error:', err);
    }
  }

  // Demo fallback
  try {
    const raw = localStorage.getItem(LOCAL_INQUIRIES_KEY);
    const inquiries = raw ? JSON.parse(raw) : [];
    const newInquiry = {
      id: 'demo-inq-' + Date.now(),
      created_at: new Date().toISOString(),
      ...inquiryData,
      status: 'pending'
    };
    inquiries.unshift(newInquiry);
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(inquiries));
    return { data: newInquiry, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};

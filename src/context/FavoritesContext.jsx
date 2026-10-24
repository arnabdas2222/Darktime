import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { getFavorites, toggleFavoriteApi } from '../lib/supabase';
import { SAMPLE_WATCHES } from '../data/sampleWatches';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteWatches, setFavoriteWatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    const loadFavorites = async () => {
      setLoading(true);
      try {
        const { data, watchIds } = await getFavorites(user?.id);
        if (isCurrent) {
          setFavoriteWatches(data || []);
          setFavoriteIds(watchIds || []);
        }
      } catch (err) {
        console.error('Failed to load favorites:', err);
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    loadFavorites();

    return () => {
      isCurrent = false;
    };
  }, [user]);

  const isFavorite = (watchId) => {
    return favoriteIds.includes(watchId);
  };

  const toggleFavorite = async (watch) => {
    if (!watch || !watch.id) return;

    const watchId = watch.id;
    const currentlyFavorited = favoriteIds.includes(watchId);

    // Optimistic UI update
    if (currentlyFavorited) {
      setFavoriteIds(prev => prev.filter(id => id !== watchId));
      setFavoriteWatches(prev => prev.filter(w => w.id !== watchId));
    } else {
      setFavoriteIds(prev => [...prev, watchId]);
      setFavoriteWatches(prev => [watch, ...prev]);
    }

    try {
      const { favorited } = await toggleFavoriteApi(user?.id, watchId);
      // Sync state if returned value differs from optimistic
      if (favorited !== !currentlyFavorited) {
        if (favorited) {
          setFavoriteIds(prev => [...new Set([...prev, watchId])]);
        } else {
          setFavoriteIds(prev => prev.filter(id => id !== watchId));
        }
      }
    } catch (err) {
      console.error('Toggle favorite failed:', err);
      // Revert on error
      if (currentlyFavorited) {
        setFavoriteIds(prev => [...prev, watchId]);
        setFavoriteWatches(prev => [watch, ...prev]);
      } else {
        setFavoriteIds(prev => prev.filter(id => id !== watchId));
        setFavoriteWatches(prev => prev.filter(w => w.id !== watchId));
      }
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoriteWatches,
        loading,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

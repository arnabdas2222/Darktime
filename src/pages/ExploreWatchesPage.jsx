import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { WatchGrid } from '../components/WatchGrid';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { getWatches, isSupabaseConfigured } from '../lib/supabase';
import { Sparkles, Database } from 'lucide-react';

export const ExploreWatchesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Primary State
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('demo');

  // Filter States initialized from URL params if present
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'All Brands');
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition') || 'All Conditions');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');

  // Load Watches from Supabase / Local dataset
  const fetchWatchCatalog = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr, source } = await getWatches();
      if (fetchErr) throw fetchErr;
      setWatches(data || []);
      setDataSource(source);
    } catch (err) {
      console.error('Error fetching watches:', err);
      setError(err.message || 'Failed to retrieve timepiece catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchCatalog();
  }, []);

  // Sync state changes with URL query parameters for shareability
  useEffect(() => {
    const params = {};
    if (searchQuery) params.q = searchQuery;
    if (selectedBrand && selectedBrand !== 'All Brands') params.brand = selectedBrand;
    if (selectedCondition && selectedCondition !== 'All Conditions') params.condition = selectedCondition;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sortBy && sortBy !== 'featured') params.sort = sortBy;

    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedBrand, selectedCondition, minPrice, maxPrice, sortBy, setSearchParams]);

  // Filtering & Sorting Logic
  const filteredWatches = useMemo(() => {
    return watches
      .filter((watch) => {
        // Search filter (brand, model, reference number)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchBrand = watch.brand.toLowerCase().includes(q);
          const matchModel = watch.model.toLowerCase().includes(q);
          const matchRef = watch.reference_number?.toLowerCase().includes(q);
          if (!matchBrand && !matchModel && !matchRef) return false;
        }

        // Brand filter
        if (selectedBrand && selectedBrand !== 'All Brands') {
          if (watch.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
        }

        // Condition filter
        if (selectedCondition && selectedCondition !== 'All Conditions') {
          if (watch.condition !== selectedCondition) return false;
        }

        // Min price
        if (minPrice && !isNaN(Number(minPrice))) {
          if (Number(watch.price) < Number(minPrice)) return false;
        }

        // Max price
        if (maxPrice && !isNaN(Number(maxPrice))) {
          if (Number(watch.price) > Number(maxPrice)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return Number(a.price) - Number(b.price);
        }
        if (sortBy === 'price-desc') {
          return Number(b.price) - Number(a.price);
        }
        if (sortBy === 'newest') {
          return new Date(b.created_at || b.year) - new Date(a.created_at || a.year);
        }
        // 'featured'
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [watches, searchQuery, selectedBrand, selectedCondition, minPrice, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All Brands');
    setSelectedCondition('All Conditions');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-400 font-cinzel text-xs uppercase tracking-[0.25em] font-semibold">
            <span>Chrono24-Inspired Marketplace</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-neutral-100 tracking-wider mt-2">
            EXPLORE TIMEPIECES
          </h1>
          <p className="text-neutral-400 text-sm mt-2 max-w-2xl leading-relaxed">
            Browse our authenticated inventory of certified pre-owned and unworn luxury watches. Every reference is backed by our Geneva Vault Escrow guarantee.
          </p>
        </div>

        {/* Data Source Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-dark-900 border border-white/10 text-xs">
          <Database className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-neutral-400">
            Source: <strong className="text-neutral-200">{dataSource === 'supabase' ? 'Supabase PostgreSQL' : 'Certified Vault Dataset'}</strong>
          </span>
        </div>
      </div>

      {/* Search and Filters Controller */}
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        selectedCondition={selectedCondition}
        onConditionChange={setSelectedCondition}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onReset={handleResetFilters}
        totalResults={filteredWatches.length}
      />

      {/* Main Content States */}
      {loading ? (
        <LoadingState message="Querying Certified Vault Inventory..." />
      ) : error ? (
        <ErrorState
          title="Inventory Query Error"
          message={error}
          onRetry={fetchWatchCatalog}
        />
      ) : (
        <WatchGrid
          watches={filteredWatches}
          onResetFilters={handleResetFilters}
        />
      )}

    </div>
  );
};

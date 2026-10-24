import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, X, DollarSign } from 'lucide-react';
import { BRANDS, CONDITIONS } from '../data/sampleWatches';

export const SearchAndFilters = ({
  searchQuery,
  onSearchChange,
  selectedBrand,
  onBrandChange,
  selectedCondition,
  onConditionChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortChange,
  onReset,
  totalResults
}) => {
  const isFiltered =
    Boolean(searchQuery) ||
    (selectedBrand && selectedBrand !== 'All Brands') ||
    (selectedCondition && selectedCondition !== 'All Conditions') ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    sortBy !== 'featured';

  return (
    <div className="w-full luxury-card rounded-md border border-white/10 p-5 mb-8 shadow-xl">
      
      {/* Top Row: Search and Sort */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-grow max-w-2xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by brand, reference, or model (e.g. Speedmaster, Daytona, Nautilus)..."
            className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm pl-10 pr-10 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs uppercase tracking-wider text-neutral-400 whitespace-nowrap hidden sm:inline">
            Sort By:
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm px-3 py-2.5 text-xs uppercase tracking-wider text-neutral-200 focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Additions</option>
          </select>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white/5 my-4" />

      {/* Second Row: Filter Selectors & Price Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        
        {/* Brand Dropdown */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Maison / Brand
          </label>
          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm px-3 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
          >
            {BRANDS.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Condition Dropdown */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Condition
          </label>
          <select
            value={selectedCondition}
            onChange={(e) => onConditionChange(e.target.value)}
            className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm px-3 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
          >
            {CONDITIONS.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Min Price (USD)
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500">$</span>
            <input
              type="number"
              min="0"
              step="1000"
              placeholder="e.g. 10000"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm pl-7 pr-3 py-2 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Max Price (USD)
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500">$</span>
            <input
              type="number"
              min="0"
              step="5000"
              placeholder="e.g. 150000"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 focus:border-gold-500/60 rounded-sm pl-7 pr-3 py-2 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none"
            />
          </div>
        </div>

      </div>

      {/* Filter Stats & Reset Bar */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-neutral-400">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
          <span>Showing <strong className="text-neutral-100">{totalResults}</strong> certified timepieces</span>
        </div>

        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All Filters</span>
          </button>
        )}
      </div>

    </div>
  );
};

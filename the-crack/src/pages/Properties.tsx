import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X, ArrowUpDown } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyCard from '../components/property/PropertyCard';
import PropertyFilterSidebar, { FilterState } from '../components/property/PropertyFilterSidebar';
import { PropertyCardSkeleton } from '../components/ui/Skeleton';

export const Properties: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL search params
  const initialStatus = (searchParams.get('status') as FilterState['status']) || 'All';
  const initialLocation = searchParams.get('location') || 'All';
  const initialType = searchParams.get('type') || 'All';
  const initialBeds = searchParams.get('bedrooms') || 'All';

  const [filters, setFilters] = useState<FilterState>({
    status: initialStatus,
    location: initialLocation,
    type: initialType,
    minPrice: Math.max(0, Number(searchParams.get('minPrice')) || 0),
    maxPrice: Math.max(0, Number(searchParams.get('maxPrice')) || 100000000),
    bedrooms: initialBeds,
    bathrooms: 'All',
    amenities: [],
    searchQuery: searchParams.get('q') || '',
  });

  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.status !== 'All') params.set('status', filters.status);
    if (filters.location !== 'All') params.set('location', filters.location);
    if (filters.type !== 'All') params.set('type', filters.type);
    if (filters.bedrooms !== 'All') params.set('bedrooms', filters.bedrooms);
    if (filters.minPrice > 0) params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice < 100000000) params.set('maxPrice', String(filters.maxPrice));
    if (filters.searchQuery) params.set('q', filters.searchQuery);
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleResetFilters = () => {
    setFilters({
      status: 'All',
      location: 'All',
      type: 'All',
      minPrice: 0,
      maxPrice: 100000000,
      bedrooms: 'All',
      bathrooms: 'All',
      amenities: [],
      searchQuery: '',
    });
  };

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        if (filters.status !== 'All' && p.status !== filters.status) return false;

        if (filters.location !== 'All') {
          if (!p.location.toLowerCase().includes(filters.location.toLowerCase()) &&
              !p.neighborhood.toLowerCase().includes(filters.location.toLowerCase())) {
            return false;
          }
        }

        if (filters.type !== 'All' && p.type !== filters.type) return false;

        if (p.priceNumeric < filters.minPrice || p.priceNumeric > filters.maxPrice) return false;

        if (filters.bedrooms !== 'All') {
          const minBeds = parseInt(filters.bedrooms, 10);
          if (p.bedrooms < minBeds) return false;
        }

        if (filters.bathrooms !== 'All') {
          const minBaths = parseInt(filters.bathrooms, 10);
          if (p.bathrooms < minBaths) return false;
        }

        if (filters.amenities.length > 0) {
          const hasAll = filters.amenities.every((a) =>
            p.amenities.some((pAmenity) => pAmenity.toLowerCase().includes(a.toLowerCase()))
          );
          if (!hasAll) return false;
        }

        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchLocation = p.location.toLowerCase().includes(q);
          const matchNeighborhood = p.neighborhood.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchTitle && !matchLocation && !matchNeighborhood && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.priceNumeric - b.priceNumeric;
        if (sortBy === 'price-high') return b.priceNumeric - a.priceNumeric;
        if (sortBy === 'area-high') return b.areaSqFt - a.areaSqFt;
        if (sortBy === 'popular') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return b.yearBuilt - a.yearBuilt;
      });
  }, [filters, sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.status !== 'All') count++;
    if (filters.location !== 'All') count++;
    if (filters.type !== 'All') count++;
    if (filters.minPrice > 0) count++;
    if (filters.maxPrice < 100000000) count++;
    if (filters.bedrooms !== 'All') count++;
    if (filters.bathrooms !== 'All') count++;
    if (filters.amenities.length > 0) count += filters.amenities.length;
    if (filters.searchQuery) count++;
    return count;
  }, [filters]);

  return (
    <div className="bg-[#F5F2EA] min-h-screen pt-28 pb-24 text-[#11110F]">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="space-y-3 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
            RESIDENTIAL DISCOVERY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#11110F]">
            Find your place.
          </h1>
          <p className="text-sm sm:text-base text-[#736F66] font-light leading-relaxed">
            Search vetted architectural residences, private estates, and skyline penthouses across the nation's premier enclaves.
          </p>
        </div>

        {/* Global Search Bar & View Toggles */}
        <div className="mt-8 pt-6 border-t border-[#D9D4C9] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Keyword Search */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-[#736F66] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by neighborhood, street, or architectural feature..."
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-10 pr-10 py-3 bg-[#FAF8F3] border border-[#D9D4C9] text-xs text-[#11110F] placeholder:text-[#736F66]/60 focus:outline-none focus:border-[#B69A6A]"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#736F66] hover:text-[#11110F]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Controls: Filter Button & Sort */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-wider cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B69A6A]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <div className="flex items-center gap-2 bg-[#FAF8F3] border border-[#D9D4C9] px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#B69A6A]" />
              <span className="text-[#736F66] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-[#11110F] focus:outline-none cursor-pointer font-medium"
              >
                <option value="newest">Newest Listed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area-high">Square Feet: Largest</option>
                <option value="popular">Trophy Collection</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#736F66]">
          <div>
            Showing <span className="font-semibold text-[#11110F]">{filteredProperties.length}</span> exceptional residences
          </div>
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[#A04238] hover:underline cursor-pointer"
            >
              Clear all filters ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-[#FAF8F3] border border-[#D9D4C9] p-6 shadow-sm">
              <PropertyFilterSidebar
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Properties Grid */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <PropertyCardSkeleton key={n} />
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="border border-[#D9D4C9] bg-[#FAF8F3] p-12 text-center space-y-4">
                <Search className="w-10 h-10 text-[#D9D4C9] mx-auto stroke-1" />
                <h3 className="font-serif text-2xl text-[#11110F]">
                  No residences match your criteria.
                </h3>
                <p className="text-xs text-[#736F66] max-w-sm mx-auto leading-relaxed">
                  We could not locate any properties matching your exact parameters. Try widening your price ceiling or resetting filters.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-6 py-3 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.2em] hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end lg:hidden animate-in fade-in duration-200">
          <div className="bg-[#FAF8F3] max-h-[85vh] overflow-y-auto rounded-t-lg border-t border-[#D9D4C9] shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-[#F5F2EA] p-4 border-b border-[#D9D4C9] flex items-center justify-between z-10">
              <h3 className="font-serif text-xl text-[#11110F]">Filter Residences</h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 text-[#736F66] hover:text-[#11110F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <PropertyFilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
              isMobileDrawer
              onCloseMobile={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Properties;

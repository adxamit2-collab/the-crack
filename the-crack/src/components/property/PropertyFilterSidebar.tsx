import React from 'react';
import { RotateCcw } from 'lucide-react';

export interface FilterState {
  status: 'All' | 'For Sale' | 'For Rent';
  location: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  searchQuery: string;
}

interface PropertyFilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

const ALL_AMENITIES = [
  'Private Beach Staircase',
  'Cantilevered Infinity Ocean Pool',
  'Private Key-Locked Elevator Foyer',
  'Direct Central Park Vistas',
  '12-Seat Dolby Atmos Screening Theater',
  'Private 80ft Deepwater Yacht Dock',
  'Direct Hudson River Sunset Vistas',
  'Oxygen-Enriched Master Sleeping Suite',
  'Crestron Whole-Home Automation'
];

export const PropertyFilterSidebar: React.FC<PropertyFilterSidebarProps> = ({
  filters,
  setFilters,
  onReset,
  isMobileDrawer,
  onCloseMobile,
}) => {
  const handleAmenityToggle = (amenity: string) => {
    setFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  return (
    <div className={`space-y-6 ${isMobileDrawer ? 'p-6' : ''}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#D9D4C9]">
        <h3 className="font-serif text-xl text-[#11110F]">Refine Residences</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs uppercase tracking-wider text-[#736F66] hover:text-[#A04238] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Buy / Rent Switch */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.2em] text-[#736F66] font-medium block">
          Acquisition Type
        </label>
        <div className="grid grid-cols-3 gap-1 bg-[#EAE5D9]/70 p-1 border border-[#D9D4C9]/70">
          {(['All', 'For Sale', 'For Rent'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, status: mode }))}
              className={`py-1.5 text-xs uppercase tracking-wider transition-all cursor-pointer font-medium ${
                filters.status === mode
                  ? 'bg-[#11110F] text-[#F5F2EA]'
                  : 'text-[#11110F] hover:bg-white/60'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Location Select */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.2em] text-[#736F66] font-medium block">
          Destination / Enclave
        </label>
        <select
          value={filters.location}
          onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
          className="w-full px-3 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
        >
          <option value="All">All Luxury Markets</option>
          <option value="New York">New York (Manhattan, SoHo, Village)</option>
          <option value="Miami">Miami (Miami Beach, Biscayne)</option>
          <option value="Los Angeles">Los Angeles &amp; Bel Air</option>
          <option value="Beverly Hills">Beverly Hills</option>
          <option value="Malibu">Malibu Coastline</option>
          <option value="Aspen">Aspen &amp; Red Mountain</option>
        </select>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.2em] text-[#736F66] font-medium block">
          Architectural Typology
        </label>
        <select
          value={filters.type}
          onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
          className="w-full px-3 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
        >
          <option value="All">All Typologies</option>
          <option value="Luxury Residence">Luxury Residence / Estate</option>
          <option value="Penthouse">Sky Penthouse</option>
          <option value="City Apartment">Manhattan Loft / Apartment</option>
        </select>
      </div>

      {/* Max Price Range Filter (USD) */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.2em] text-[#736F66] font-medium block">
          Price Limit (USD)
        </label>
        <select
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full px-3 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
        >
          <option value={100000000}>Any Price (Up to $100M+)</option>
          <option value={5000000}>Up to $5,000,000</option>
          <option value={10000000}>Up to $10,000,000</option>
          <option value={15000000}>Up to $15,000,000</option>
          <option value={25000000}>Up to $25,000,000</option>
        </select>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.2em] text-[#736F66] font-medium block">
          Bedrooms
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {['All', '3', '4', '5'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, bedrooms: num }))}
              className={`py-2 text-xs text-center border transition-all cursor-pointer ${
                filters.bedrooms === num
                  ? 'bg-[#11110F] text-[#F5F2EA] border-[#11110F]'
                  : 'bg-white border-[#D9D4C9] text-[#11110F] hover:border-[#B69A6A]'
              }`}
            >
              {num === 'All' ? 'Any' : `${num}+ Beds`}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.2em] text-[#736F66] font-medium block">
          Bathrooms
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {['All', '3', '4', '5'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, bathrooms: num }))}
              className={`py-2 text-xs text-center border transition-all cursor-pointer ${
                filters.bathrooms === num
                  ? 'bg-[#11110F] text-[#F5F2EA] border-[#11110F]'
                  : 'bg-white border-[#D9D4C9] text-[#11110F] hover:border-[#B69A6A]'
              }`}
            >
              {num === 'All' ? 'Any' : `${num}+ Baths`}
            </button>
          ))}
        </div>
      </div>

      {/* Curated Amenities checkboxes */}
      <div className="space-y-2.5 pt-2 border-t border-[#D9D4C9]/60">
        <label className="text-[10px] uppercase tracking-[0.2em] text-[#736F66] font-medium block">
          Signature Amenities
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {ALL_AMENITIES.map((amenity) => {
            const checked = filters.amenities.includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2.5 text-xs text-[#11110F] cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="w-3.5 h-3.5 accent-[#B69A6A] rounded-xs cursor-pointer"
                />
                <span className="group-hover:text-[#B69A6A] transition-colors leading-tight">
                  {amenity}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {isMobileDrawer && (
        <div className="pt-4 border-t border-[#D9D4C9]">
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-full py-3 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.2em] hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};
export default PropertyFilterSidebar;

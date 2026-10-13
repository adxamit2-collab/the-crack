import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, Trash2, Scale, Building2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCompare } from '../context/CompareContext';
import { properties } from '../data/properties';
import PropertyCard from '../components/property/PropertyCard';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const { compareIds, toggleCompare, setIsDrawerOpen } = useCompare();

  const savedProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="bg-[#F5F2EC] min-h-screen pt-28 pb-28 text-[#1B1B19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <span className="text-xs uppercase tracking-[0.24em] text-[#A88A58] font-medium block">
            Private Shortlist
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1B1B19]">
            Saved Residences
          </h1>
          <p className="text-sm sm:text-base text-[#77736B] leading-relaxed font-light">
            Review your shortlisted properties, compare specifications, or arrange consecutive private viewings with your advisor.
          </p>
        </div>

        {savedProperties.length === 0 ? (
          /* Empty State */
          <div className="bg-[#FBF9F5] border border-[#D8D2C7] p-16 text-center space-y-4 max-w-xl mx-auto shadow-sm">
            <Bookmark className="w-12 h-12 text-[#D8D2C7] mx-auto stroke-1" />
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1B1B19]">
              Your shortlist is empty.
            </h2>
            <p className="text-xs sm:text-sm text-[#77736B] leading-relaxed">
              Click the bookmark icon on any property card to save homes for side-by-side comparison or private scheduling.
            </p>
            <div className="pt-4">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#191918] text-[#F5F2EC] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#A88A58] transition-colors"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Action Bar */}
            <div className="mb-8 p-4 bg-[#FBF9F5] border border-[#D8D2C7] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                You have <span className="font-medium text-[#1B1B19]">{savedProperties.length}</span> residence{savedProperties.length > 1 ? 's' : ''} in your private shortlist.
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#191918] text-[#F5F2EC] uppercase tracking-wider text-[11px]"
                >
                  <Scale className="w-3.5 h-3.5 text-[#A88A58]" />
                  <span>Open Comparison Table</span>
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Favorites;

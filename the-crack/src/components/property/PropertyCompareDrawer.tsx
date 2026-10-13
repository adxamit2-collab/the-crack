import React from 'react';
import { Link } from 'react-router-dom';
import { X, Scale, ArrowRight, Trash2 } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { properties } from '../../data/properties';

export const PropertyCompareDrawer: React.FC = () => {
  const { compareIds, removeFromCompare, clearCompare, isDrawerOpen, setIsDrawerOpen } = useCompare();

  if (!isDrawerOpen) return null;

  const selectedProperties = properties.filter((p) => compareIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-300">
      <div className="w-full max-w-4xl bg-[#FBF9F5] h-full shadow-2xl flex flex-col border-l border-[#D8D2C7] animate-in slide-in-from-right duration-400">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#D8D2C7] flex items-center justify-between bg-[#F5F2EC]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#191918] text-[#A88A58]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#1B1B19]">Compare Residences</h2>
              <p className="text-xs text-[#77736B]">
                {selectedProperties.length} of 3 properties selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {selectedProperties.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="text-xs uppercase tracking-wider text-[#77736B] hover:text-[#A84B43] flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close comparison drawer"
              className="p-2 text-[#77736B] hover:text-[#1B1B19] rounded-sm transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <Scale className="w-12 h-12 text-[#D8D2C7] mb-4 stroke-1" />
              <h3 className="font-serif text-xl text-[#1B1B19] mb-2">No properties selected for comparison</h3>
              <p className="text-sm text-[#77736B] max-w-md mb-6 leading-relaxed">
                Click the scale icon on any property card to compare features, floor areas, and finishes side-by-side.
              </p>
              <Link
                to="/properties"
                onClick={() => setIsDrawerOpen(false)}
                className="px-6 py-3 bg-[#191918] text-[#F5F2EC] text-xs uppercase tracking-[0.2em] hover:bg-[#A88A58] transition-colors"
              >
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedProperties.map((property) => (
                  <div
                    key={property.id}
                    className="border border-[#D8D2C7] bg-[#F5F2EC] p-4 relative flex flex-col justify-between"
                  >
                    <button
                      type="button"
                      onClick={() => removeFromCompare(property.id)}
                      className="absolute top-2 right-2 p-1.5 bg-[#191918]/70 text-white hover:bg-[#A84B43] transition-colors z-10"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      <div className="aspect-[16/10] overflow-hidden mb-3">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-[#A88A58] font-medium">
                        {property.location}
                      </div>
                      <h4 className="font-serif text-lg text-[#1B1B19] leading-snug my-1 line-clamp-1">
                        {property.title}
                      </h4>
                      <div className="font-serif text-base font-medium text-[#1B1B19] mb-3">
                        {property.price}
                      </div>
                    </div>

                    <Link
                      to={`/properties/${property.slug}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className="w-full text-center py-2 text-xs uppercase tracking-wider bg-[#191918] text-[#F5F2EC] hover:bg-[#A88A58] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Side-by-Side Matrix */}
              <div className="border border-[#D8D2C7] overflow-x-auto bg-white/70">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    <tr className="border-b border-[#D8D2C7]/60 bg-[#F5F2EC]/60">
                      <td className="p-3.5 font-medium text-[#1B1B19] uppercase tracking-wider w-1/4">Property Type</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="p-3.5 text-[#77736B]">{p.type}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#D8D2C7]/60">
                      <td className="p-3.5 font-medium text-[#1B1B19] uppercase tracking-wider">Neighborhood</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="p-3.5 text-[#77736B]">{p.neighborhood}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#D8D2C7]/60 bg-[#F5F2EC]/60">
                      <td className="p-3.5 font-medium text-[#1B1B19] uppercase tracking-wider">Status</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="p-3.5 text-[#77736B]">{p.status}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#D8D2C7]/60">
                      <td className="p-3.5 font-medium text-[#1B1B19] uppercase tracking-wider">Bedrooms</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="p-3.5 text-[#77736B]">{p.bedrooms} Beds</td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#D8D2C7]/60 bg-[#F5F2EC]/60">
                      <td className="p-3.5 font-medium text-[#1B1B19] uppercase tracking-wider">Bathrooms</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="p-3.5 text-[#77736B]">{p.bathrooms} Baths</td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#D8D2C7]/60">
                      <td className="p-3.5 font-medium text-[#1B1B19] uppercase tracking-wider">Floor Area</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="p-3.5 text-[#77736B]">{p.areaSqFt.toLocaleString()} sqft</td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#D8D2C7]/60 bg-[#F5F2EC]/60">
                      <td className="p-3.5 font-medium text-[#1B1B19] uppercase tracking-wider">Parking Bays</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="p-3.5 text-[#77736B]">{p.parkingSpaces} Dedicated</td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#D8D2C7]/60">
                      <td className="p-3.5 font-medium text-[#1B1B19] uppercase tracking-wider">Year Built</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="p-3.5 text-[#77736B]">{p.yearBuilt}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#D8D2C7]/60 bg-[#F5F2EC]/60">
                      <td className="p-3.5 font-medium text-[#1B1B19] uppercase tracking-wider">Furnished</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="p-3.5 text-[#77736B]">{p.furnishedStatus}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-[#1B1B19] uppercase tracking-wider align-top">Key Amenities</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="p-3.5 text-[#77736B] align-top">
                          <ul className="space-y-1">
                            {p.amenities.slice(0, 4).map((amenity, i) => (
                              <li key={i}>• {amenity}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PropertyCompareDrawer;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Building2, Compass } from 'lucide-react';
import { locations } from '../data/locations';

export const Locations: React.FC = () => {
  return (
    <div className="bg-[#F5F2EA] min-h-screen pt-28 pb-24 text-[#11110F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
            DESTINATION DIRECTORY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#11110F]">
            Places Worth Living
          </h1>
          <p className="text-sm sm:text-base text-[#736F66] leading-relaxed font-light">
            An architectural and market survey of America’s most sought-after luxury enclaves—from Manhattan limestone blocks to the bluffs of Malibu and alpine slopes of Aspen.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="space-y-12">
          {locations.map((loc, idx) => (
            <div
              key={loc.id}
              className={`bg-[#FAF8F3] border border-[#D9D4C9] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group hover:shadow-card-hover transition-all duration-400 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Visual (7 cols) */}
              <div className={`lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#11110F] ${
                idx % 2 === 1 ? 'lg:order-2' : ''
              }`}>
                <img
                  src={loc.heroImage}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>

              {/* Text & Specs (5 cols) */}
              <div className={`lg:col-span-5 p-8 sm:p-10 space-y-5 ${
                idx % 2 === 1 ? 'lg:order-1' : ''
              }`}>
                <div className="flex items-center justify-between border-b border-[#D9D4C9]/60 pb-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A6A] font-medium">
                    MARKET OVERVIEW
                  </span>
                  <span className="text-xs text-[#736F66] font-mono">
                    {loc.propertyCount} Residences
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#11110F]">
                    {loc.name}
                  </h2>
                  <div className="text-xs uppercase tracking-wider text-[#736F66]">
                    {loc.tagline}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#11110F]/80 leading-relaxed font-light">
                  {loc.description}
                </p>

                <div className="p-4 bg-[#F5F2EA] border border-[#D9D4C9]/60 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#736F66] uppercase tracking-wider text-[10px]">Average Luxury Pricing</span>
                    <span className="font-medium text-[#11110F]">{loc.avgPriceRange}</span>
                  </div>
                  <div className="text-[11px] text-[#736F66] pt-1">
                    Signature Enclaves: {loc.popularSpots.slice(0, 3).join(' · ')}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/locations/${loc.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors"
                  >
                    <span>Explore {loc.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Locations;

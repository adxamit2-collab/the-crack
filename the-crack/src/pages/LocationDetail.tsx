import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MapPin, Building2 } from 'lucide-react';
import { locations } from '../data/locations';
import { properties } from '../data/properties';
import PropertyCard from '../components/property/PropertyCard';

export const LocationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const locationItem = locations.find((l) => l.slug === slug);

  if (!locationItem) {
    return (
      <div className="min-h-screen bg-[#F5F2EA] flex items-center justify-center p-6 text-center text-[#11110F]">
        <div className="max-w-md space-y-4">
          <h2 className="font-serif text-3xl">Destination Not Found</h2>
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Destinations</span>
          </Link>
        </div>
      </div>
    );
  }

  const districtProperties = properties.filter(
    (p) =>
      p.location.toLowerCase().includes(locationItem.name.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(locationItem.name.toLowerCase())
  );

  return (
    <div className="bg-[#F5F2EA] min-h-screen pt-20 pb-28 text-[#11110F]">
      {/* Cinematic Hero */}
      <section className="relative h-[65vh] min-h-[460px] bg-[#11110F] flex items-end">
        <img
          src={locationItem.heroImage}
          alt={locationItem.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-[#11110F]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full text-white">
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B69A6A] hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Destinations</span>
          </Link>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] block mb-2 font-semibold">
            TERRITORY DOSSIER · {locationItem.propertyCount} RESIDENCES
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal">
            {locationItem.name}
          </h1>
          <p className="text-sm sm:text-base text-[#F5F2EA]/85 max-w-xl font-light mt-3">
            {locationItem.tagline}
          </p>
        </div>
      </section>

      {/* Narrative & Lifestyle Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Story (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
                TERRITORY PROFILE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#11110F]">
                Market Context &amp; Architectural Heritage
              </h2>
              <p className="text-sm text-[#11110F]/85 leading-relaxed font-light">
                {locationItem.description}
              </p>
            </div>

            {/* Architecture note */}
            <div className="p-6 bg-[#FAF8F3] border border-[#D9D4C9] space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-[#B69A6A] font-semibold">
                ARCHITECTURAL CHARACTER
              </div>
              <p className="text-xs sm:text-sm text-[#11110F]/85 font-light leading-relaxed">
                {locationItem.architectureNotes}
              </p>
            </div>

            {/* Lifestyle Highlights */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[#11110F]">Lifestyle &amp; Accessibility</h3>
              <div className="space-y-2.5">
                {locationItem.lifestyleHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#11110F]/80 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B69A6A] mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F3] border border-[#D9D4C9] p-8 space-y-6">
              <h3 className="font-serif text-2xl text-[#11110F]">Market Metrics</h3>

              <div className="space-y-4 text-xs divide-y divide-[#D9D4C9]/60">
                <div className="pt-3 flex justify-between">
                  <span className="text-[#736F66] uppercase tracking-wider">Average Luxury Valuation</span>
                  <span className="font-medium text-[#11110F]">{locationItem.avgPriceRange}</span>
                </div>
                <div className="pt-3 flex justify-between">
                  <span className="text-[#736F66] uppercase tracking-wider">Active Inventory</span>
                  <span className="font-medium text-[#11110F]">{locationItem.propertyCount} Residences</span>
                </div>
                <div className="pt-3 flex justify-between">
                  <span className="text-[#736F66] uppercase tracking-wider">Market Access</span>
                  <span className="font-medium text-[#11110F]">Private &amp; Public MLS</span>
                </div>
              </div>

              {/* Notable Spots */}
              <div className="pt-2 space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Signature Enclaves</div>
                <div className="flex flex-wrap gap-2">
                  {locationItem.popularSpots.map((spot, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs bg-[#F5F2EA] border border-[#D9D4C9] text-[#11110F]"
                    >
                      {spot}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to={`/properties?location=${locationItem.name}`}
                  className="w-full py-3.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors block text-center"
                >
                  View Residences in {locationItem.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties in this Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t border-[#D9D4C9] pt-16">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
              PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#11110F]">
              Featured Residences in {locationItem.name}
            </h2>
          </div>

          <Link
            to={`/properties?location=${locationItem.name}`}
            className="text-xs uppercase tracking-wider text-[#11110F] hover:text-[#B69A6A] flex items-center gap-1.5"
          >
            <span>View All ({districtProperties.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {districtProperties.length === 0 ? (
          <div className="p-8 border border-[#D9D4C9] bg-[#FAF8F3] text-center text-xs text-[#736F66]">
            Currently accepting private acquisitions in {locationItem.name}. Inquire with an advisor for off-market access.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {districtProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default LocationDetail;

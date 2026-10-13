import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Scale, ArrowUpRight } from 'lucide-react';
import { Property } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useCompare } from '../../context/CompareContext';

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare } = useCompare();

  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  return (
    <div className="group relative bg-[#FAF8F3] border border-[#D9D4C9]/70 overflow-hidden flex flex-col transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-card-hover hover:border-[#B69A6A]/60">
      {/* Image Container (Image First) */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#11110F]">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />

        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] bg-[#11110F]/90 text-[#F5F2EA] backdrop-blur-xs font-medium">
            {property.status}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] bg-[#B69A6A] text-[#11110F] font-semibold">
              Private Collection
            </span>
          )}
        </div>

        {/* Actions: Compare & Save */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(property.id, property.title);
            }}
            aria-label={inCompare ? 'Remove from compare' : 'Compare residence'}
            title="Compare Residence"
            className={`p-2 transition-all duration-300 rounded-xs cursor-pointer ${
              inCompare
                ? 'bg-[#B69A6A] text-[#11110F]'
                : 'bg-[#11110F]/70 text-[#F5F2EA] hover:bg-[#11110F] hover:text-[#B69A6A]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property.id, property.title);
            }}
            aria-label={favorite ? 'Remove from saved' : 'Save residence'}
            title="Save Residence"
            className={`p-2 transition-all duration-300 rounded-xs cursor-pointer ${
              favorite
                ? 'bg-[#B69A6A] text-[#11110F]'
                : 'bg-[#11110F]/70 text-[#F5F2EA] hover:bg-[#11110F] hover:text-[#B69A6A]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${favorite ? 'fill-[#11110F]' : ''}`} />
          </button>
        </div>

        {/* Bottom image overlay metadata */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between z-10 text-white">
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#F5F2EA]/90 drop-shadow-sm font-light">
            {property.neighborhood}
          </span>
          <span className="text-xs uppercase tracking-[0.16em] text-[#B69A6A] font-medium drop-shadow-sm">
            {property.type}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#736F66] font-medium">
            {property.location}
          </div>

          <Link
            to={`/properties/${property.slug}`}
            className="block group-hover:text-[#B69A6A] transition-colors focus:outline-none"
          >
            <h3 className="font-serif text-2xl text-[#11110F] leading-snug">
              {property.title}
            </h3>
          </Link>

          <p className="text-xs text-[#736F66] line-clamp-2 leading-relaxed font-light pt-1">
            {property.subtitle}
          </p>
        </div>

        {/* Card Footer Details */}
        <div className="pt-5 mt-5 border-t border-[#D9D4C9]/60 space-y-3">
          {/* Specs */}
          <div className="text-xs text-[#736F66] font-light flex items-center justify-between">
            <span>{property.bedrooms} Beds</span>
            <span>·</span>
            <span>{property.bathrooms} Baths</span>
            <span>·</span>
            <span>{property.areaSqFt.toLocaleString()} Sq Ft</span>
          </div>

          {/* Price & View CTA */}
          <div className="flex items-center justify-between pt-1">
            <div className="font-serif text-xl sm:text-2xl font-medium text-[#11110F]">
              {property.price}
            </div>

            <Link
              to={`/properties/${property.slug}`}
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] px-3.5 py-2 bg-[#11110F] text-[#F5F2EA] group-hover:bg-[#B69A6A] group-hover:text-[#11110F] transition-all duration-300 font-medium"
            >
              <span>View Residence</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyCard;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Bookmark,
  Share2,
  Scale,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Check,
  Building,
  Bed,
  Bath,
  Car,
  Shield,
  Layers,
  ArrowUpRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { properties } from '../data/properties';
import { agents } from '../data/agents';
import PropertyCard from '../components/property/PropertyCard';
import ViewingBookingModal from '../components/property/ViewingBookingModal';
import { useFavorites } from '../context/FavoritesContext';
import { useCompare } from '../context/CompareContext';
import { useToast } from '../context/ToastContext';

export const PropertyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare } = useCompare();
  const { showToast } = useToast();

  const property = properties.find((p) => p.slug === slug);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Agent
  const agent = agents.find((a) => a.id === property?.agentId) || agents[0];

  // Similar residences
  const similarProperties = properties
    .filter((p) => p.id !== property?.id && (p.location === property?.location || p.type === property?.type))
    .slice(0, 4);

  // Scroll to top and update SEO & Schema.org JSON-LD structured data on slug change
  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (!property) return;

    // Dynamically update document title & meta tags for optimal indexing
    const previousTitle = document.title;
    document.title = `${property.title} – ${property.location} (${property.price}) | THE CRACK`;

    const metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute('content', `${property.title} in ${property.neighborhood}, ${property.location}. ${property.subtitle} Offered at ${property.price}.`);
    }

    // Dynamic OpenGraph updates
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${property.title} | THE CRACK`);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', property.description);

    // Schema.org JSON-LD structured data in USD for search bots
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      '@id': `${window.location.origin}/properties/${property.slug}#listing`,
      name: property.title,
      headline: property.subtitle,
      description: property.description,
      url: window.location.href,
      datePosted: '2026-01-15',
      image: property.images,
      offers: {
        '@type': 'Offer',
        price: property.priceNumeric,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-01-15',
        businessFunction: property.status === 'For Rent' ? 'https://schema.org/LeaseOut' : 'https://schema.org/Sell',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: property.priceNumeric,
          priceCurrency: 'USD',
          unitText: property.pricePeriod === 'month' ? 'monthly' : 'total'
        }
      },
      mainEntity: {
        '@type':
          property.type === 'Penthouse' || property.type === 'City Apartment'
            ? 'Apartment'
            : property.type === 'Family Home'
            ? 'SingleFamilyResidence'
            : 'Accommodation',
        name: property.title,
        description: property.description,
        image: property.images,
        numberOfRooms: property.bedrooms + 2,
        numberOfBedrooms: property.bedrooms,
        numberOfBathroomsTotal: property.bathrooms,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: property.areaSqFt,
          unitCode: 'FTK',
          unitText: 'sq ft'
        },
        yearBuilt: property.yearBuilt,
        address: {
          '@type': 'PostalAddress',
          streetAddress: property.address,
          addressLocality: property.location,
          addressCountry: 'US'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: property.coordinates.lat,
          longitude: property.coordinates.lng
        },
        amenityFeature: property.amenities.map((amenity) => ({
          '@type': 'LocationFeatureSpecification',
          name: amenity,
          value: true
        }))
      },
      realEstateAgent: {
        '@type': 'RealEstateAgent',
        name: 'THE CRACK',
        url: window.location.origin,
        telephone: agent.phone,
        email: agent.email,
        employee: {
          '@type': 'Person',
          name: agent.name,
          jobTitle: agent.title,
          telephone: agent.phone,
          email: agent.email,
          image: agent.image
        }
      }
    };

    let scriptTag = document.getElementById('property-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'property-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(jsonLdData);

    return () => {
      document.title = previousTitle;
      if (metaDescription && prevDesc) {
        metaDescription.setAttribute('content', prevDesc);
      }
      const existingTag = document.getElementById('property-jsonld');
      if (existingTag) {
        existingTag.remove();
      }
    };
  }, [property, agent, slug]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F5F2EA] flex items-center justify-center p-6 text-center text-[#11110F]">
        <div className="max-w-md space-y-4">
          <h2 className="font-serif text-3xl">Residence not found</h2>
          <p className="text-sm text-[#736F66]">
            The residence you requested may have been acquired, transferred, or is retained under private off-market status.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${property.title} | THE CRACK`,
          text: property.subtitle,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareCopied(true);
        showToast('Residence dossier link copied.', 'info', 'Link Copied');
        setTimeout(() => setShareCopied(false), 3000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-[#F5F2EA] min-h-screen pt-24 pb-28 text-[#11110F]">
      {/* Inline Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateListing',
            name: property.title,
            headline: property.subtitle,
            description: property.description,
            image: property.images,
            offers: {
              '@type': 'Offer',
              price: property.priceNumeric,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              businessFunction: property.status === 'For Rent' ? 'https://schema.org/LeaseOut' : 'https://schema.org/Sell'
            },
            mainEntity: {
              '@type':
                property.type === 'Penthouse' || property.type === 'City Apartment'
                  ? 'Apartment'
                  : property.type === 'Family Home'
                  ? 'SingleFamilyResidence'
                  : 'Accommodation',
              name: property.title,
              numberOfBedrooms: property.bedrooms,
              numberOfBathroomsTotal: property.bathrooms,
              floorSize: {
                '@type': 'QuantitativeValue',
                value: property.areaSqFt,
                unitCode: 'FTK'
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: property.address,
                addressLocality: property.location,
                addressCountry: 'US'
              }
            }
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-[#736F66] flex items-center gap-2">
        <Link to="/" className="hover:text-[#11110F] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/properties" className="hover:text-[#11110F] transition-colors">Residences</Link>
        <span>/</span>
        <span className="text-[#11110F] font-medium truncate">{property.title}</span>
      </div>

      {/* ==================================================
          1. LARGE CINEMATIC IMAGE GALLERY
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative bg-[#11110F] overflow-hidden aspect-[16/10] sm:aspect-[21/10] max-h-[640px] border border-[#D9D4C9]">
          <img
            src={property.images[activeImageIndex]}
            alt={`${property.title} - View ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30 pointer-events-none" />

          {/* Controls */}
          <div className="absolute inset-y-0 left-4 flex items-center">
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous Image"
              className="p-3 bg-[#11110F]/70 hover:bg-[#11110F] text-[#F5F2EA] backdrop-blur-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-4 flex items-center">
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next Image"
              className="p-3 bg-[#11110F]/70 hover:bg-[#11110F] text-[#F5F2EA] backdrop-blur-xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
            <div className="bg-[#11110F]/80 backdrop-blur-sm px-3.5 py-1.5 border border-white/20 tracking-[0.2em] font-mono text-[11px]">
              {String(activeImageIndex + 1).padStart(2, '0')} / {String(property.images.length).padStart(2, '0')}
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="bg-[#11110F]/80 hover:bg-[#11110F] backdrop-blur-sm px-3.5 py-1.5 border border-white/20 tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#B69A6A]" />
              <span className="hidden sm:inline">Fullscreen Gallery</span>
            </button>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-2.5 overflow-x-auto pt-3 pb-1">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`relative shrink-0 w-24 h-16 sm:w-32 sm:h-20 border transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? 'border-[#B69A6A] ring-2 ring-[#B69A6A]/30 scale-[1.02]'
                  : 'border-[#D9D4C9]/70 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* ==================================================
          2. PROPERTY HEADER & ACTIONS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#FAF8F3] border border-[#D9D4C9] p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] bg-[#11110F] text-[#F5F2EA] font-medium">
                {property.status}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B69A6A] font-medium">
                {property.type}
              </span>
              <span className="text-xs text-[#736F66]">· Built {property.yearBuilt}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#11110F]">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#736F66] font-light">
              <MapPin className="w-4 h-4 text-[#B69A6A] shrink-0" />
              <span>{property.address}</span>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#11110F] font-medium">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F2EA] border border-[#D9D4C9]">
                <Bed className="w-3.5 h-3.5 text-[#B69A6A]" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F2EA] border border-[#D9D4C9]">
                <Bath className="w-3.5 h-3.5 text-[#B69A6A]" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F2EA] border border-[#D9D4C9]">
                <Maximize2 className="w-3.5 h-3.5 text-[#B69A6A]" />
                <span>{property.areaSqFt.toLocaleString()} Sq Ft</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F2EA] border border-[#D9D4C9]">
                <Car className="w-3.5 h-3.5 text-[#B69A6A]" />
                <span>{property.parkingSpaces} Parking</span>
              </div>
            </div>
          </div>

          <div className="lg:text-right space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#D9D4C9]/60">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[#736F66]">
                Offering Price (USD)
              </div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#11110F]">
                {property.price}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-3.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B69A6A]" />
                <span>REQUEST PRIVATE VIEWING</span>
              </button>

              <button
                type="button"
                onClick={() => toggleFavorite(property.id, property.title)}
                className={`p-3.5 border transition-all cursor-pointer ${
                  favorite
                    ? 'bg-[#B69A6A] text-[#11110F] border-[#B69A6A]'
                    : 'bg-white border-[#D9D4C9] text-[#11110F] hover:border-[#B69A6A]'
                }`}
                title="Save residence"
              >
                <Bookmark className={`w-4 h-4 ${favorite ? 'fill-[#11110F]' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => toggleCompare(property.id, property.title)}
                className={`p-3.5 border transition-all cursor-pointer ${
                  inCompare
                    ? 'bg-[#B69A6A] text-[#11110F] border-[#B69A6A]'
                    : 'bg-white border-[#D9D4C9] text-[#11110F] hover:border-[#B69A6A]'
                }`}
                title="Compare residence"
              >
                <Scale className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-3.5 bg-white border border-[#D9D4C9] text-[#11110F] hover:border-[#B69A6A] transition-all cursor-pointer"
                title="Share dossier"
              >
                {shareCopied ? <Check className="w-4 h-4 text-[#386B52]" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. MAIN SPECS, ARCHITECTURE & STICKY PANEL
          ================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview / Architecture */}
            <div className="bg-[#FAF8F3] border border-[#D9D4C9] p-8 space-y-5">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A6A] font-semibold block">
                ARCHITECTURAL OVERVIEW
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#11110F]">
                Designed for extraordinary living.
              </h2>
              <div className="text-sm text-[#11110F]/85 space-y-4 font-light leading-relaxed">
                <p>{property.description}</p>
                {property.longDescription.map((para, i) => (
                  <p
                    key={i}
                    className={`${!isDescriptionExpanded && i > 0 ? 'hidden' : 'block'}`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {property.longDescription.length > 1 && (
                <button
                  type="button"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-xs uppercase tracking-widest text-[#B69A6A] hover:text-[#11110F] font-medium transition-colors pt-2 cursor-pointer"
                >
                  {isDescriptionExpanded ? 'Read Less' : 'Read Full Architectural Dossier →'}
                </button>
              )}
            </div>

            {/* Property Key Features Table */}
            <div className="bg-[#FAF8F3] border border-[#D9D4C9] p-8 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A6A] font-semibold block">
                SPECIFICATIONS
              </span>
              <h3 className="font-serif text-2xl text-[#11110F]">Property Particulars</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
                <div className="border-b border-[#D9D4C9]/60 pb-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Typology</div>
                  <div className="text-sm font-medium text-[#11110F] mt-0.5">{property.type}</div>
                </div>
                <div className="border-b border-[#D9D4C9]/60 pb-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Bedrooms</div>
                  <div className="text-sm font-medium text-[#11110F] mt-0.5">{property.bedrooms} Suites</div>
                </div>
                <div className="border-b border-[#D9D4C9]/60 pb-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Bathrooms</div>
                  <div className="text-sm font-medium text-[#11110F] mt-0.5">{property.bathrooms} Baths</div>
                </div>
                <div className="border-b border-[#D9D4C9]/60 pb-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Floor Area</div>
                  <div className="text-sm font-medium text-[#11110F] mt-0.5">{property.areaSqFt.toLocaleString()} Sq Ft</div>
                </div>
                <div className="border-b border-[#D9D4C9]/60 pb-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Year Built</div>
                  <div className="text-sm font-medium text-[#11110F] mt-0.5">{property.yearBuilt}</div>
                </div>
                <div className="border-b border-[#D9D4C9]/60 pb-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Parking</div>
                  <div className="text-sm font-medium text-[#11110F] mt-0.5">{property.parkingSpaces} Dedicated Bays</div>
                </div>
                <div className="border-b border-[#D9D4C9]/60 pb-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Furnishing</div>
                  <div className="text-sm font-medium text-[#11110F] mt-0.5">{property.furnishedStatus}</div>
                </div>
                <div className="border-b border-[#D9D4C9]/60 pb-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Tenure</div>
                  <div className="text-sm font-medium text-[#11110F] mt-0.5">Fee Simple Freehold</div>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-[#FAF8F3] border border-[#D9D4C9] p-8 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A6A] font-semibold block">
                AMENITIES &amp; LIFESTYLE
              </span>
              <h3 className="font-serif text-2xl text-[#11110F]">Signature Features</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-[#F5F2EA] border border-[#D9D4C9]/60 text-xs text-[#11110F]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B69A6A]" />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Neighborhood */}
            <div className="bg-[#FAF8F3] border border-[#D9D4C9] p-8 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A6A] font-semibold block">
                LOCATION &amp; NEIGHBORHOOD
              </span>
              <h3 className="font-serif text-2xl text-[#11110F]">Neighborhood Context</h3>
              <p className="text-xs sm:text-sm text-[#736F66] font-light leading-relaxed">
                Located within {property.neighborhood}, {property.location}. Exact private gates, deed history, and structural surveys are disclosed to registered principals under mutual non-disclosure.
              </p>

              <div className="relative aspect-[21/9] w-full bg-[#11110F] border border-[#D9D4C9] overflow-hidden flex items-center justify-center text-white">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D9D4C9_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="w-10 h-10 bg-[#FAF8F3] text-[#11110F] mx-auto flex items-center justify-center rounded-full shadow-lg">
                    <MapPin className="w-5 h-5 text-[#B69A6A]" />
                  </div>
                  <div className="font-serif text-lg font-medium">
                    {property.neighborhood}
                  </div>
                  <div className="text-[10px] text-[#D9D4C9]/70 tracking-widest uppercase">
                    CONFIDENTIAL COORDINATE MAP
                  </div>
                </div>
              </div>

              {/* Surrounding Destinations */}
              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-wider text-[#11110F] font-medium mb-3">
                  Key Surrounding Destinations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {property.nearbyPoints.map((poi, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F5F2EA] border border-[#D9D4C9]/60 flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="font-medium text-[#11110F]">{poi.name}</div>
                        <div className="text-[10px] uppercase text-[#736F66]">{poi.type}</div>
                      </div>
                      <span className="text-xs text-[#B69A6A] font-mono font-medium">{poi.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking / Advisor Panel */}
          <div className="space-y-8">
            <div className="bg-[#FAF8F3] border border-[#D9D4C9] p-6 sm:p-8 space-y-6 sticky top-28 shadow-sm">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
                REPRESENTING ADVISOR
              </span>

              <div className="flex items-center gap-4">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-20 h-20 object-cover border border-[#D9D4C9]"
                />
                <div>
                  <h3 className="font-serif text-xl text-[#11110F]">{agent.name}</h3>
                  <div className="text-xs text-[#B69A6A] font-medium">{agent.title}</div>
                  <div className="text-[11px] text-[#736F66]">{agent.experienceYears} Years Experience</div>
                </div>
              </div>

              <p className="text-xs text-[#736F66] leading-relaxed font-light border-y border-[#D9D4C9]/60 py-4">
                {agent.bio}
              </p>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.18em] hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#B69A6A]" />
                  <span>REQUEST PRIVATE VIEWING</span>
                </button>

                <a
                  href={`tel:${agent.phone}`}
                  className="w-full py-3 border border-[#11110F] text-[#11110F] text-xs uppercase tracking-[0.18em] hover:bg-[#11110F] hover:text-[#F5F2EA] transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {agent.phone}</span>
                </a>

                <Link
                  to={`/agents/${agent.slug}`}
                  className="w-full py-2.5 text-center text-xs text-[#736F66] hover:text-[#11110F] transition-colors block uppercase tracking-wider"
                >
                  View Advisor Profile →
                </Link>
              </div>

              <div className="pt-2 text-center text-[10px] uppercase tracking-widest text-[#736F66]">
                Confidential Fiduciary Representation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Residences */}
      {similarProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="border-t border-[#D9D4C9] pt-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A6A] font-semibold block">
                RELATED HOLDINGS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#11110F]">
                Similar Residences
              </h2>
            </div>
            <Link
              to="/properties"
              className="text-xs uppercase tracking-[0.18em] text-[#11110F] hover:text-[#B69A6A] flex items-center gap-1.5"
            >
              <span>Explore All Residences</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {similarProperties.map((simProp) => (
              <PropertyCard key={simProp.id} property={simProp} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-t border-[#D9D4C9] p-3 px-4 flex items-center justify-between gap-3 shadow-xl">
        <a
          href={`tel:${agent.phone}`}
          className="flex-1 py-3 text-center border border-[#11110F] text-[#11110F] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#B69A6A]" />
          <span>Call Advisor</span>
        </a>

        <button
          type="button"
          onClick={() => setIsBookingModalOpen(true)}
          className="flex-1 py-3 text-center bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#B69A6A]" />
          <span>Request Viewing</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-white border-b border-white/20 pb-4">
            <div className="font-serif text-lg tracking-wide">{property.title}</div>
            <div className="flex items-center gap-6">
              <span className="font-mono text-xs text-[#B69A6A]">
                {String(activeImageIndex + 1).padStart(2, '0')} / {String(property.images.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={property.images[activeImageIndex]}
              alt={property.title}
              className="max-h-full max-w-full object-contain"
            />
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-10 shrink-0 border ${
                  activeImageIndex === idx ? 'border-[#B69A6A]' : 'border-white/20 opacity-40'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <ViewingBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        property={property}
      />
    </div>
  );
};
export default PropertyDetail;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shield,
  Eye,
  Key,
  Crosshair,
  MapPin
} from 'lucide-react';
import { properties } from '../data/properties';
import { locations } from '../data/locations';
import { agents } from '../data/agents';
import { articles } from '../data/articles';
import PropertyCard from '../components/property/PropertyCard';
import ViewingBookingModal from '../components/property/ViewingBookingModal';
import ValuationModal from '../components/property/ValuationModal';
import { useToast } from '../context/ToastContext';
import { saveDemoLead } from '../utils/demoLeadStore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isValuationOpen, setIsValuationOpen] = useState(false);

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      showToast('Please enter a valid email address.', 'error', 'Invalid Email');
      return;
    }
    const saved = saveDemoLead('newsletter');
    setNewsletterSuccess(true);
    showToast(saved ? 'Demo interaction acknowledged. No email was sent or saved.' : 'Demo confirmation shown, but local saving was unavailable.', saved ? 'info' : 'error', 'Demo Mode');
  };

  // Four featured residences
  const featuredResidences = properties.slice(0, 4);

  // The Ocean House for Property Feature Section
  const oceanHouse = properties.find((p) => p.slug === 'the-ocean-house') || properties[0];

  return (
    <div className="bg-[#F5F2EA] text-[#11110F]">
      {/* ==================================================
          SECTION 1: CINEMATIC HERO
          ================================================== */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#11110F]">
        {/* Full Viewport Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2160&q=85"
            alt="THE CRACK Estates Architectural Campaign"
            className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-[#11110F]/55 to-black/45" />
          <div className="absolute inset-0 bg-[#11110F]/20" />
        </div>

        {/* Subtle Vertical Location Indicator on Left (Desktop) */}
        <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 items-center gap-4 -rotate-90 origin-left text-[10px] tracking-[0.35em] text-[#D9D4C9]/70 uppercase">
          <span>NEW YORK</span>
          <span>·</span>
          <span>MIAMI</span>
          <span>·</span>
          <span>LOS ANGELES</span>
          <span>·</span>
          <span>ASPEN</span>
        </div>

        {/* Hero Composition */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center mt-12 sm:mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 bg-white/5 backdrop-blur-md text-[#F5F2EA] text-[10px] sm:text-xs uppercase tracking-[0.28em] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Sparkles className="w-3 h-3 text-[#B69A6A]" />
            <span>Exceptional places. Extraordinary living.</span>
          </div>

          <h1 className="font-serif text-white text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight leading-[1.02] font-normal drop-shadow-md">
            A different <br />
            <span className="italic font-light text-[#F5F2EA]/95">kind of living.</span>
          </h1>

          <p className="mt-8 text-sm sm:text-base md:text-lg text-[#F5F2EA]/85 max-w-xl font-light leading-relaxed">
            Exceptional residences for those who expect more from where they live. Curated across Manhattan, Beverly Hills, Malibu, Miami Beach, and Aspen.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-4 bg-[#F5F2EA] text-[#11110F] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B69A6A] hover:text-[#11110F] transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
            >
              <span>Explore Residences</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/40 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/10 backdrop-blur-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book a Private Viewing</span>
              <ArrowRight className="w-4 h-4 text-[#B69A6A]" />
            </button>
          </div>
        </div>

        {/* Minimal Property Metadata at Bottom */}
        <div className="absolute bottom-6 inset-x-0 z-20 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-white/70 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light">
          <div>MANHATTAN, NEW YORK · $8,750,000</div>
          <div className="hidden sm:block">5 BED · 6 BATH · 5,420 SQ FT</div>
          <div>PRIVATE HOLDINGS DESK</div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2: EDITORIAL INTRODUCTION (Split Layout)
          ================================================== */}
      <section className="py-28 sm:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Oversized Statement */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
              THE THE CRACK APPROACH
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#11110F] leading-[1.12] font-normal">
              “We don’t simply find addresses. We find places that become part of your story.”
            </h2>
            <div className="pt-4 text-sm sm:text-base text-[#736F66] font-light leading-relaxed max-w-xl space-y-4">
              <p>
                In a market saturated with superficial listings and transactional brokerages, THE CRACK operates as an architectural advisory and private acquisition council.
              </p>
              <p>
                Every property in our collection is audited for pure natural illumination, structural pedigree, acoustic isolation, and long-term capital resilience.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#11110F] border-b border-[#11110F] pb-1 hover:text-[#B69A6A] hover:border-[#B69A6A] transition-colors"
              >
                <span>Read The THE CRACK Manifesto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Architectural Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] bg-[#11110F] overflow-hidden border border-[#D9D4C9] shadow-restrained">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                alt="Architectural Detailing"
                className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FAF8F3] border border-[#D9D4C9] p-4 text-[10px] uppercase tracking-[0.2em] text-[#736F66] hidden sm:block">
              01 / ARCHITECTURAL INTEGRITY
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3: FEATURED RESIDENCES
          ================================================== */}
      <section className="py-24 bg-[#FAF8F3] border-y border-[#D9D4C9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A6A] font-semibold block">
                CURATED PORTFOLIO
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#11110F]">
                Exceptional Residences
              </h2>
              <p className="text-sm text-[#736F66] font-light">
                A considered collection of remarkable homes across premier United States destinations.
              </p>
            </div>

            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#11110F] hover:text-[#B69A6A] transition-colors pb-1 border-b border-[#11110F] hover:border-[#B69A6A]"
            >
              <span>Explore All Residences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Image-First Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {featuredResidences.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4: HUGE EDITORIAL PROPERTY FEATURE
          ================================================== */}
      <section className="py-28 sm:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large Architectural Image */}
          <div className="lg:col-span-7">
            <div className="aspect-[16/11] bg-[#11110F] overflow-hidden border border-[#D9D4C9] shadow-2xl relative group">
              <img
                src={oceanHouse.images[0]}
                alt={oceanHouse.title}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#11110F]/85 backdrop-blur-xs text-white text-[10px] uppercase tracking-[0.22em] px-3 py-1 font-medium">
                Trophy Coastal Holding
              </div>
            </div>
          </div>

          {/* Right: Asymmetrical Editorial Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
              01 / PRIVATE COLLECTION
            </span>

            <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#11110F] leading-tight">
              {oceanHouse.title}
            </h3>

            <div className="text-xs uppercase tracking-[0.2em] text-[#736F66]">
              {oceanHouse.neighborhood} · {oceanHouse.location}
            </div>

            <div className="font-serif text-3xl sm:text-4xl text-[#11110F] font-medium">
              {oceanHouse.price}
            </div>

            <p className="text-sm text-[#736F66] font-light leading-relaxed">
              {oceanHouse.description}
            </p>

            <div className="pt-2 text-xs text-[#11110F] font-light flex items-center gap-6 border-y border-[#D9D4C9] py-3">
              <span>{oceanHouse.bedrooms} Suites</span>
              <span>·</span>
              <span>{oceanHouse.bathrooms} Baths</span>
              <span>·</span>
              <span>{oceanHouse.areaSqFt.toLocaleString()} Sq Ft</span>
            </div>

            <div className="pt-4">
              <Link
                to={`/properties/${oceanHouse.slug}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B69A6A] hover:text-[#11110F] transition-all"
              >
                <span>View Residence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5: DESTINATIONS ("Places Worth Living")
          ================================================== */}
      <section className="py-24 bg-[#FAF8F3] border-y border-[#D9D4C9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A6A] font-semibold block">
                GEOGRAPHIC REACH
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#11110F]">
                Places Worth Living
              </h2>
              <p className="text-sm text-[#736F66] font-light">
                From Manhattan pre-war cooperatives to Malibu surf bluffs and Aspen ski estates.
              </p>
            </div>

            <Link
              to="/locations"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#11110F] hover:text-[#B69A6A] transition-colors pb-1 border-b border-[#11110F]"
            >
              <span>All Destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Large Destination Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.slice(0, 6).map((loc) => (
              <div
                key={loc.id}
                className="group relative aspect-[4/3] bg-[#11110F] overflow-hidden border border-[#D9D4C9]"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#B69A6A]">
                    {loc.propertyCount} Available Residences
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-[#D9D4C9]/80 line-clamp-2 font-light">
                    {loc.description}
                  </p>
                  <div className="pt-2">
                    <Link
                      to={`/locations/${loc.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-white hover:text-[#B69A6A] transition-colors"
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
      </section>

      {/* ==================================================
          SECTION 6: WHY THE CRACK (4 Principles)
          ================================================== */}
      <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-20 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
            THE PHILOSOPHY
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#11110F] leading-tight">
            More than a transaction.
          </h2>
          <p className="text-sm sm:text-base text-[#736F66] font-light leading-relaxed">
            We operate with four steadfast commitments that distinguish our advisory from conventional real-estate brokerages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#D9D4C9] pt-16">
          {/* 01 Discretion */}
          <div className="space-y-4">
            <div className="font-serif text-4xl text-[#B69A6A] font-light">01</div>
            <h3 className="font-serif text-2xl text-[#11110F]">Discretion</h3>
            <p className="text-xs sm:text-sm text-[#736F66] font-light leading-relaxed">
              Our most significant transactions occur in silence. We protect client privacy, holding structures, and negotiations under rigorous confidentiality.
            </p>
          </div>

          {/* 02 Perspective */}
          <div className="space-y-4">
            <div className="font-serif text-4xl text-[#B69A6A] font-light">02</div>
            <h3 className="font-serif text-2xl text-[#11110F]">Perspective</h3>
            <p className="text-xs sm:text-sm text-[#736F66] font-light leading-relaxed">
              We look past cosmetic staging to audit structural integrity, light paths, and generational resale value through an architect’s lens.
            </p>
          </div>

          {/* 03 Access */}
          <div className="space-y-4">
            <div className="font-serif text-4xl text-[#B69A6A] font-light">03</div>
            <h3 className="font-serif text-2xl text-[#11110F]">Access</h3>
            <p className="text-xs sm:text-sm text-[#736F66] font-light leading-relaxed">
              Decades of relationships unlock private pocket listings, generational estates, and off-market penthouses before public discovery.
            </p>
          </div>

          {/* 04 Precision */}
          <div className="space-y-4">
            <div className="font-serif text-4xl text-[#B69A6A] font-light">04</div>
            <h3 className="font-serif text-2xl text-[#11110F]">Precision</h3>
            <p className="text-xs sm:text-sm text-[#736F66] font-light leading-relaxed">
              Every valuation, title deed audit, and contract is executed with forensic clarity to protect family capital and ensure effortless settlement.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7: PRIVATE COLLECTION (Dark Obsidian Section)
          ================================================== */}
      <section className="bg-[#11110F] text-[#F5F2EA] py-28 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
              OFF-MARKET &amp; TROPHY HOLDINGS
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-white">
              Residences beyond ordinary.
            </h2>
            <p className="text-sm text-[#D9D4C9]/75 font-light leading-relaxed">
              A private preview of ultra-luxury residences available strictly through qualified confidential representation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* $24,500,000 Beverly Hills Estate */}
            <div className="border border-white/15 bg-white/[0.02] overflow-hidden group">
              <div className="aspect-[16/11] overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                  alt="Beverly Hills Estate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="font-serif text-2xl sm:text-3xl text-white">$24,500,000</div>
                <h4 className="font-serif text-xl text-[#B69A6A]">Beverly Hills Estate</h4>
                <p className="text-xs text-[#D9D4C9]/70 font-light">
                  Promontory modern compound wrapped in mature olive groves and city lights.
                </p>
                <div className="pt-3">
                  <Link
                    to="/properties/beverly-hills-estate"
                    className="text-xs uppercase tracking-wider text-white hover:text-[#B69A6A] inline-flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* $12,800,000 Oceanfront Malibu Residence */}
            <div className="border border-white/15 bg-white/[0.02] overflow-hidden group">
              <div className="aspect-[16/11] overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
                  alt="Oceanfront Malibu Residence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="font-serif text-2xl sm:text-3xl text-white">$12,800,000</div>
                <h4 className="font-serif text-xl text-[#B69A6A]">Oceanfront Malibu Residence</h4>
                <p className="text-xs text-[#D9D4C9]/70 font-light">
                  Blufftop modern villa overlooking Point Dume and crashing Pacific surf.
                </p>
                <div className="pt-3">
                  <Link
                    to="/properties/ocean-crest"
                    className="text-xs uppercase tracking-wider text-white hover:text-[#B69A6A] inline-flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* $9,750,000 Central Park Penthouse */}
            <div className="border border-white/15 bg-white/[0.02] overflow-hidden group">
              <div className="aspect-[16/11] overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Central Park Penthouse"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="font-serif text-2xl sm:text-3xl text-white">$9,750,000</div>
                <h4 className="font-serif text-xl text-[#B69A6A]">Central Park Penthouse</h4>
                <p className="text-xs text-[#D9D4C9]/70 font-light">
                  Duplex crown crowning Central Park South with 1,200 sq ft private terrace.
                </p>
                <div className="pt-3">
                  <Link
                    to="/properties/central-park-penthouse"
                    className="text-xs uppercase tracking-wider text-white hover:text-[#B69A6A] inline-flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8: HOW THE CRACK WORKS (3 Steps)
          ================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A6A] font-semibold">
            THE PROCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#11110F]">
            How THE CRACK Works
          </h2>
          <p className="text-sm text-[#736F66] font-light">
            A frictionless, unhurried advisory journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#FAF8F3] border border-[#D9D4C9] space-y-4">
            <div className="font-serif text-4xl text-[#B69A6A] font-light">01</div>
            <h3 className="font-serif text-2xl text-[#11110F]">DISCOVER</h3>
            <p className="text-xs sm:text-sm text-[#736F66] font-light leading-relaxed">
              Tell us what extraordinary means to you—from floor ceiling ratios and light orientation to private dockage requirements.
            </p>
          </div>

          <div className="p-8 bg-[#FAF8F3] border border-[#D9D4C9] space-y-4">
            <div className="font-serif text-4xl text-[#B69A6A] font-light">02</div>
            <h3 className="font-serif text-2xl text-[#11110F]">CURATE</h3>
            <p className="text-xs sm:text-sm text-[#736F66] font-light leading-relaxed">
              We privately source and vet off-market residences aligned precisely with your capital and lifestyle specifications.
            </p>
          </div>

          <div className="p-8 bg-[#FAF8F3] border border-[#D9D4C9] space-y-4">
            <div className="font-serif text-4xl text-[#B69A6A] font-light">03</div>
            <h3 className="font-serif text-2xl text-[#11110F]">ARRIVE</h3>
            <p className="text-xs sm:text-sm text-[#736F66] font-light leading-relaxed">
              Experience shortlisted homes through discreet private viewings, accompanied by comprehensive structural dossiers.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9: AGENTS ("Meet Your Advisor")
          ================================================== */}
      <section className="py-24 bg-[#FAF8F3] border-y border-[#D9D4C9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A6A] font-semibold block">
                PRIVATE ADVISORY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#11110F]">
                Meet Your Advisor
              </h2>
              <p className="text-sm text-[#736F66] font-light">
                Accomplished estate specialists managing key US luxury markets.
              </p>
            </div>

            <Link
              to="/agents"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#11110F] hover:text-[#B69A6A] transition-colors pb-1 border-b border-[#11110F]"
            >
              <span>View All Advisors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-[#F5F2EA] border border-[#D9D4C9] overflow-hidden flex flex-col justify-between group hover:shadow-card-hover transition-all duration-300"
              >
                <div>
                  <div className="aspect-[4/5] overflow-hidden bg-[#11110F]">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69A6A] font-medium block">
                      {agent.title}
                    </span>
                    <h3 className="font-serif text-xl text-[#11110F]">
                      {agent.name}
                    </h3>
                    <div className="text-xs text-[#736F66]">
                      {agent.locations.join(' · ')}
                    </div>
                    {agent.salesVolume && (
                      <div className="text-[11px] text-[#11110F] font-medium pt-1">
                        {agent.salesVolume}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    to={`/agents/${agent.slug}`}
                    className="w-full py-2.5 text-center text-xs uppercase tracking-[0.18em] border border-[#11110F] text-[#11110F] group-hover:bg-[#11110F] group-hover:text-[#F5F2EA] transition-colors block font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10: TESTIMONIAL (Minimal Fullscreen)
          ================================================== */}
      <section className="py-28 sm:py-36 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold">
          CLIENT EXPERIENCE
        </span>

        <blockquote className="font-serif text-3xl sm:text-5xl text-[#11110F] leading-snug font-normal italic">
          “THE CRACK understood what we were looking for before we could put it into words.”
        </blockquote>

        <div className="space-y-1">
          <div className="text-xs uppercase tracking-widest text-[#11110F] font-semibold">
            Sophia &amp; James
          </div>
          <div className="text-xs text-[#736F66]">
            Manhattan, New York
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 11: JOURNAL (Luxury Editorial Magazine)
          ================================================== */}
      <section className="py-24 bg-[#FAF8F3] border-y border-[#D9D4C9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B69A6A] font-semibold block">
                THE JOURNAL
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#11110F]">
                Architectural Thought
              </h2>
              <p className="text-sm text-[#736F66] font-light">
                Essays on coastal architecture, alpine capital value, and private acquisition.
              </p>
            </div>

            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#11110F] hover:text-[#B69A6A] transition-colors pb-1 border-b border-[#11110F]"
            >
              <span>All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-[#F5F2EA] border border-[#D9D4C9] flex flex-col justify-between group hover:shadow-card-hover transition-all duration-300"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#11110F]">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-600"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#B69A6A] font-medium block">
                      {article.category}
                    </span>
                    <Link
                      to={`/journal/${article.slug}`}
                      className="block group-hover:text-[#B69A6A] transition-colors"
                    >
                      <h3 className="font-serif text-lg text-[#11110F] leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#736F66] line-clamp-2 leading-relaxed font-light">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/journal/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#11110F] group-hover:text-[#B69A6A] font-medium transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 12: NEWSLETTER / PRIVATE ACCESS (Dark Section)
          ================================================== */}
      <section className="bg-[#11110F] text-[#F5F2EA] py-28 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
            PRIVATE SYNDICATE
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            See what others don’t.
          </h2>
          <p className="text-sm text-[#D9D4C9]/80 leading-relaxed font-light max-w-lg mx-auto">
            Receive private listings, market intelligence and residences before they reach the public market.
          </p>

          {newsletterSuccess ? (
            <div className="p-4 border border-[#B69A6A] bg-[#B69A6A]/15 text-[#F5F2EA] text-xs">
              Demo interaction acknowledged. Your email was not sent or saved.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-white/10 border border-white/20 text-[#F5F2EA] placeholder:text-[#D9D4C9]/50 text-xs focus:outline-none focus:border-[#B69A6A]"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#B69A6A] text-[#11110F] text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors shrink-0 cursor-pointer"
              >
                REQUEST ACCESS
              </button>
            </form>
          )}

          <p className="text-[10px] text-[#736F66] tracking-wide">
            Strict confidentiality guaranteed. No public marketing dissemination.
          </p>
        </div>
      </section>

      {/* ==================================================
          SECTION 13: FINAL CTA (Full-Screen Image)
          ================================================== */}
      <section className="relative min-h-[70vh] flex items-center justify-center p-8 bg-[#11110F] overflow-hidden text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
          alt="Architectural Estate"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-black/40 to-[#11110F]" />

        <div className="relative z-10 max-w-3xl space-y-8">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-tight">
            “Your next address <br />
            <span className="italic font-light">should feel inevitable.”</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-4 bg-[#F5F2EA] text-[#11110F] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B69A6A] transition-colors"
            >
              EXPLORE RESIDENCES
            </Link>

            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/50 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition-colors cursor-pointer"
            >
              SPEAK WITH AN ADVISOR
            </button>
          </div>
        </div>
      </section>

      {/* Global Modals */}
      <ViewingBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <ValuationModal
        isOpen={isValuationOpen}
        onClose={() => setIsValuationOpen(false)}
      />
    </div>
  );
};
export default Home;

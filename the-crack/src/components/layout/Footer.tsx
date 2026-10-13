import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#11110F] text-[#F5F2EA] border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block group">
              <span className="font-serif tracking-[0.24em] text-2xl font-semibold uppercase text-[#F5F2EA] group-hover:text-[#B69A6A] transition-colors">
                THE CRACK
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-[#736F66] -mt-0.5">
                Exceptional places. Extraordinary living.
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#D9D4C9]/75 font-light max-w-sm leading-relaxed">
              Private luxury residential real estate for discerning buyers, sellers, and investors. Representing architectural estates, skyline penthouses, and private coastal holdings across the United States and international capitals.
            </p>

            <div className="pt-2">
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#B69A6A] hover:text-[#F5F2EA] transition-colors"
              >
                <span>Represent your residence with THE CRACK</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Residences Col */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#B69A6A] font-medium">Residences</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#D9D4C9]/80 font-light">
              <li>
                <Link to="/properties" className="hover:text-[#F5F2EA] transition-colors">
                  All Residences
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Penthouse" className="hover:text-[#F5F2EA] transition-colors">
                  Penthouses &amp; Sky Suites
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-[#F5F2EA] transition-colors">
                  Prime Destinations
                </Link>
              </li>
              <li>
                <Link to="/properties?status=For+Rent" className="hover:text-[#F5F2EA] transition-colors">
                  Luxury Leases
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-[#F5F2EA] transition-colors">
                  Private Shortlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Advisory & Company Col */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#B69A6A] font-medium">Company</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#D9D4C9]/80 font-light">
              <li>
                <Link to="/about" className="hover:text-[#F5F2EA] transition-colors">
                  About THE CRACK
                </Link>
              </li>
              <li>
                <Link to="/agents" className="hover:text-[#F5F2EA] transition-colors">
                  Advisors
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-[#F5F2EA] transition-colors">
                  Private Valuation
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-[#F5F2EA] transition-colors">
                  The Journal
                </Link>
              </li>
              <li>
                <Link to="/about#contact" className="hover:text-[#F5F2EA] transition-colors">
                  Contact Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#B69A6A] font-medium">Private Desk</h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#D9D4C9]/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B69A6A] shrink-0 mt-0.5" />
                <span className="leading-snug">740 Madison Avenue, New York, NY 10065</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B69A6A] shrink-0" />
                <a href="tel:+12125550198" className="hover:text-[#F5F2EA] transition-colors">
                  +1 (212) 555-0198
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B69A6A] shrink-0" />
                <a href="mailto:private@veraestates.com" className="hover:text-[#F5F2EA] transition-colors">
                  private@veraestates.com
                </a>
              </div>

              {/* Social Icons */}
              <div className="pt-3 flex items-center gap-4 text-[#D9D4C9]/70">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="hover:text-[#B69A6A] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-[#B69A6A] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#736F66]">
          <div className="flex items-center gap-6">
            <span>© 2026 THE CRACK. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">New York · Miami · Los Angeles · Aspen · London</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span className="hover:text-[#D9D4C9] transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-[#D9D4C9] transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-[#D9D4C9] transition-colors cursor-pointer">Accessibility</span>
            <span className="text-[#D9D4C9]/60">|</span>
            <span className="text-[#D9D4C9]/90 tracking-wide font-normal">Designed &amp; developed by <span className="text-[#B69A6A] font-medium">Adx Amit</span></span>
          </div>

          <div className="text-[#B69A6A] font-medium tracking-wide">
            Find a place worth calling home.
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

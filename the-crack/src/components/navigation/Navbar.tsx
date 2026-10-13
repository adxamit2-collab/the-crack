import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bookmark, Scale, Search, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useCompare } from '../../context/CompareContext';
import { useTheme } from '../../context/ThemeContext';
import ViewingBookingModal from '../property/ViewingBookingModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const location = useLocation();
  const { favoritesCount } = useFavorites();
  const { compareCount, setIsDrawerOpen } = useCompare();
  const { theme, toggleTheme, isDark } = useTheme();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Residences', href: '/properties' },
    { label: 'Locations', href: '/locations' },
    { label: 'Advisors', href: '/agents' },
    { label: 'Sell With Us', href: '/list-property' },
    { label: 'Journal', href: '/journal' },
    { label: 'About', href: '/about' },
  ];

  const isTransparent = isHome && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isTransparent
            ? 'bg-transparent text-white py-6 border-b border-white/10'
            : 'bg-[#F5F2EA]/95 dark:bg-[#0C0C0A]/95 backdrop-blur-md text-[#11110F] dark:text-[#F5F2EA] py-4 border-b border-[#D9D4C9]/70 dark:border-white/10 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Logo */}
            <Link
              to="/"
              className="flex flex-col group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B69A6A]"
            >
              <span
                className={`font-serif tracking-[0.24em] text-lg sm:text-xl font-semibold uppercase transition-colors duration-300 ${
                  isTransparent
                    ? 'text-white group-hover:text-[#F5F2EA]/85'
                    : 'text-[#11110F] dark:text-[#F5F2EA] group-hover:text-[#B69A6A]'
                }`}
              >
                THE CRACK
              </span>
              <span
                className={`text-[9px] tracking-[0.28em] uppercase -mt-1 font-light transition-colors ${
                  isTransparent ? 'text-white/70' : 'text-[#736F66] dark:text-[#9E988D]'
                }`}
              >
                New York · Miami · Los Angeles · Aspen
              </span>
            </Link>

            {/* CENTER: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-[11px] uppercase tracking-[0.16em] transition-all duration-300 relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B69A6A] ${
                      isTransparent
                        ? isActive
                          ? 'text-white font-medium after:w-full'
                          : 'text-white/80 hover:text-white'
                        : isActive
                        ? 'text-[#11110F] dark:text-[#F5F2EA] font-medium after:w-full'
                        : 'text-[#736F66] dark:text-[#A39E93] hover:text-[#11110F] dark:hover:text-[#F5F2EA]'
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#B69A6A] after:transition-all after:duration-300 ${
                      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: Actions */}
            <div className="hidden lg:flex items-center gap-3.5">
              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className={`p-2 rounded-full transition-all duration-300 relative flex items-center justify-center cursor-pointer ${
                  isTransparent
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : isDark
                    ? 'text-[#C5A059] hover:text-[#E2C78A] hover:bg-white/10'
                    : 'text-[#736F66] hover:text-[#11110F] hover:bg-black/5'
                }`}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-[#C5A059] transition-transform duration-500 hover:rotate-90" />
                ) : (
                  <Moon className="w-4 h-4 text-[#11110F] transition-transform duration-500 hover:-rotate-12" />
                )}
              </button>

              {/* Search Icon Link */}
              <Link
                to="/properties"
                aria-label="Search residences"
                className={`p-2 transition-colors ${
                  isTransparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#736F66] dark:text-[#A39E93] hover:text-[#11110F] dark:hover:text-[#F5F2EA]'
                }`}
                title="Search Residences"
              >
                <Search className="w-4 h-4" />
              </Link>

              {/* Compare Button */}
              {compareCount > 0 && (
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="Compare properties"
                  className={`flex items-center gap-1.5 text-[10px] tracking-wider uppercase px-2.5 py-1.5 border transition-all ${
                    isTransparent
                      ? 'border-white/20 text-white hover:bg-white/10'
                      : 'border-[#D9D4C9] dark:border-[#2C2A25] text-[#11110F] dark:text-[#F5F2EA] hover:bg-[#EAE5D9] dark:hover:bg-[#191916]'
                  }`}
                  title="Compare selected residences"
                >
                  <Scale className="w-3.5 h-3.5 text-[#B69A6A]" />
                  <span>Compare ({compareCount})</span>
                </button>
              )}

              {/* Shortlist Link */}
              <Link
                to="/favorites"
                aria-label={`View Shortlist with ${favoritesCount} saved properties`}
                className={`flex items-center gap-1.5 text-[11px] tracking-wider uppercase px-2.5 py-1.5 transition-all ${
                  isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-[#736F66] dark:text-[#A39E93] hover:text-[#11110F] dark:hover:text-[#F5F2EA]'
                }`}
                title="View Saved Residences"
              >
                <Bookmark className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-[#B69A6A] text-[#B69A6A]' : ''}`} />
                <span>Saved {favoritesCount > 0 && `(${favoritesCount})`}</span>
              </Link>

              {/* Private Viewing CTA */}
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className={`text-[11px] uppercase tracking-[0.18em] px-4 py-2.5 font-medium transition-all duration-300 shadow-sm flex items-center gap-1.5 cursor-pointer ${
                  isTransparent
                    ? 'bg-white text-[#11110F] hover:bg-[#F5F2EA]'
                    : 'bg-[#11110F] dark:bg-[#C5A059] text-[#F5F2EA] dark:text-[#0C0C0A] hover:bg-[#B69A6A] hover:text-[#11110F] dark:hover:bg-[#D4AF37]'
                }`}
              >
                <span>Private Viewing</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              {/* Mobile Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Light Mode' : 'Dark Mode'}
                className={`p-1.5 rounded-full cursor-pointer transition-colors ${
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : isDark
                    ? 'text-[#C5A059] hover:bg-white/10'
                    : 'text-[#11110F] hover:bg-black/5'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4 text-[#C5A059]" /> : <Moon className="w-4 h-4" />}
              </button>

              <Link
                to="/properties"
                aria-label="Search"
                className={`p-1.5 ${isTransparent ? 'text-white' : 'text-[#11110F] dark:text-[#F5F2EA]'}`}
              >
                <Search className="w-4 h-4" />
              </Link>

              <Link
                to="/favorites"
                aria-label="View Saved"
                className={`p-1.5 relative ${isTransparent ? 'text-white' : 'text-[#11110F] dark:text-[#F5F2EA]'}`}
              >
                <Bookmark className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-[#B69A6A] text-[#B69A6A]' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#B69A6A]" />
                )}
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                className={`p-1.5 focus:outline-none ${isTransparent ? 'text-white' : 'text-[#11110F] dark:text-[#F5F2EA]'}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#11110F] text-[#F5F2EA] flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif tracking-[0.24em] text-xl font-semibold uppercase text-[#F5F2EA]"
            >
              THE CRACK
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation"
              className="p-2 text-[#D9D4C9] hover:text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-5 my-auto py-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl sm:text-4xl text-[#F5F2EA]/90 hover:text-[#B69A6A] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs tracking-[0.2em] uppercase text-[#B69A6A] flex items-center gap-2 pt-2"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved Residences ({favoritesCount})</span>
            </Link>

            {/* Appearance switcher row inside mobile menu */}
            <div className="flex items-center justify-between py-3 border-t border-b border-white/10 mt-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9D4C9]">Appearance</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 border border-white/20 text-xs tracking-wider uppercase text-[#F5F2EA] hover:border-[#B69A6A] transition-colors cursor-pointer"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-[#C5A059]" /> : <Moon className="w-3.5 h-3.5 text-white" />}
                <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookingModalOpen(true);
              }}
              className="w-full py-4 text-center text-xs uppercase tracking-[0.2em] font-medium bg-[#B69A6A] text-[#11110F] hover:bg-white transition-colors cursor-pointer"
            >
              Book a Private Viewing
            </button>
            <div className="text-[10px] tracking-widest uppercase text-[#736F66] text-center">
              New York · Miami · Los Angeles · Aspen
            </div>
          </div>
        </div>
      )}

      {/* Global Booking Modal */}
      <ViewingBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};
export default Navbar;

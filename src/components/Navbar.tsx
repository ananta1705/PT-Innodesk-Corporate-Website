import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { NAV_LINKS } from '../data/siteContent';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#06112F]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Left: Original PT Innodesk Logo */}
        <a
          href="#beranda"
          onClick={(e) => handleLinkClick(e, 'beranda')}
          className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-[#3D8BFF]"
          aria-label="PT Innodesk — Kembali ke Beranda"
        >
          <BrandLogo theme="dark" />
        </a>

        {/* Center: Desktop Navigation Links (Beranda, Tentang, Layanan, Cara Kerja, Solusi, Kontak) */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-[#3D8BFF] font-semibold'
                    : 'text-slate-200 hover:text-[#3D8BFF]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3D8BFF] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Primary CTA (Konsultasi) & Mobile Hamburger Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#kontak"
            onClick={(e) => handleLinkClick(e, 'kontak')}
            className="hidden sm:inline-flex items-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] text-white text-xs sm:text-[13px] font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-[#1769F5]/25 transition-colors duration-200 whitespace-nowrap min-h-[42px]"
          >
            <span>Konsultasi</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            ref={toggleBtnRef}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-panel"
          aria-label="Navigasi Mobile"
          className="lg:hidden bg-[#081A42] border-t border-white/10 px-4 sm:px-6 py-4 space-y-1 shadow-xl"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                  isActive
                    ? 'bg-[#1769F5]/20 text-[#3D8BFF] font-semibold'
                    : 'text-slate-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-60" aria-hidden="true" />
              </a>
            );
          })}

          <div className="pt-3 mt-2 border-t border-white/10">
            <a
              href="#kontak"
              onClick={(e) => handleLinkClick(e, 'kontak')}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-md min-h-[44px]"
            >
              <span>Konsultasi</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

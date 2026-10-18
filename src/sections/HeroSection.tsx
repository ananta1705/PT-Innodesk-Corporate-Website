import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Cpu, BarChart3, Layers } from 'lucide-react';
import { HERO_CONTENT } from '../data/siteContent';
import { HeroIsometricGraphic } from '../components/HeroIsometricGraphic';
import { getAllSiteContent } from '../services/siteContentService';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [heroData, setHeroData] = useState({
    eyebrow: HERO_CONTENT.eyebrow,
    headlineLine1: HERO_CONTENT.headlineLine1,
    headlineHighlight: HERO_CONTENT.headlineHighlight,
    description: HERO_CONTENT.description,
    primaryCta: HERO_CONTENT.primaryCta,
    secondaryCta: HERO_CONTENT.secondaryCta,
  });

  useEffect(() => {
    let isMounted = true;
    async function loadDynamicHero() {
      try {
        const res = await getAllSiteContent();
        if (isMounted && res.data?.hero) {
          setHeroData(res.data.hero);
        }
      } catch (e) {
        // Fallback gracefully
      }
    }
    loadDynamicHero();
    return () => {
      isMounted = false;
    };
  }, []);

  const indicatorIcons = [Cpu, BarChart3, Layers];

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-br from-[#06112F] via-[#081A42] to-[#0A2258] text-white pt-12 pb-14 lg:pt-16 lg:pb-18"
    >
      {/* Subtle Ambient Dot Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(61, 139, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy, CTAs & Three Approach Indicators */}
          <div className="lg:col-span-6">
            <p className="text-[#3D8BFF] text-xs font-bold uppercase tracking-[0.14em] mb-3.5">
              {heroData.eyebrow}
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight leading-[1.15] text-white text-balance">
              {heroData.headlineLine1}
              <br />
              <span className="text-[#3D8BFF]">{heroData.headlineHighlight}</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-[15.5px] leading-[1.65] mt-4 mb-8 max-w-[500px]">
              {heroData.description}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#kontak"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('kontak');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-lg shadow-lg shadow-[#1769F5]/30 transition-colors duration-200 min-h-[44px]"
              >
                <span>{heroData.primaryCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#layanan"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('layanan');
                }}
                className="inline-flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/30 hover:border-[#3D8BFF] text-white text-xs sm:text-sm font-medium px-6 py-3.5 rounded-lg transition-colors duration-200 min-h-[44px]"
              >
                <Compass className="w-4 h-4 text-[#3D8BFF]" aria-hidden="true" />
                <span>{heroData.secondaryCta}</span>
              </a>
            </div>

            {/* Three Benefit/Approach Indicators */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-3 gap-x-5 sm:gap-x-6 text-xs sm:text-[13px] text-slate-200">
              {HERO_CONTENT.indicators.map((item, idx) => {
                const IconComp = indicatorIcons[idx] || Cpu;
                return (
                  <React.Fragment key={item.id}>
                    <div className="flex items-center gap-2">
                      <IconComp
                        className="w-4 h-4 text-[#3D8BFF] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </div>
                    {idx < HERO_CONTENT.indicators.length - 1 && (
                      <span
                        className="hidden sm:inline-block h-4 w-px bg-white/15"
                        aria-hidden="true"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right Column: Original IoT & Device Integration Illustration */}
          <div className="lg:col-span-6">
            <HeroIsometricGraphic />
          </div>
        </div>
      </div>
    </section>
  );
};

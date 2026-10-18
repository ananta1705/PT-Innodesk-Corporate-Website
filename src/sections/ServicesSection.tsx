import React from 'react';
import { Cpu, Activity, Code2, GitMerge, Compass, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { SERVICES_CONTENT, SERVICES_DATA } from '../data/siteContent';

interface ServicesSectionProps {
  onOpenServiceDetail: (service: ServiceItem) => void;
  onOpenAllServices: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenServiceDetail,
  onOpenAllServices,
}) => {
  const renderIcon = (iconType: ServiceItem['icon']) => {
    switch (iconType) {
      case 'iot':
        return <Cpu className="w-6 h-6 text-[#1769F5]" strokeWidth={1.8} aria-hidden="true" />;
      case 'monitoring':
        return <Activity className="w-6 h-6 text-[#1769F5]" strokeWidth={1.8} aria-hidden="true" />;
      case 'software':
        return <Code2 className="w-6 h-6 text-[#1769F5]" strokeWidth={1.8} aria-hidden="true" />;
      case 'automation':
        return <GitMerge className="w-6 h-6 text-[#1769F5]" strokeWidth={1.8} aria-hidden="true" />;
      case 'consulting':
        return <Compass className="w-6 h-6 text-[#1769F5]" strokeWidth={1.8} aria-hidden="true" />;
    }
  };

  return (
    <section
      id="layanan"
      className="py-16 lg:py-22 bg-[#F7F9FC] relative border-b border-[#E5EAF2]"
    >
      {/* Subtle Background Dots */}
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Eyebrow & Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[#1769F5] text-xs font-bold uppercase tracking-[0.15em] mb-2">
            <span>{SERVICES_CONTENT.eyebrow}</span>
            <span className="w-6 h-[1.5px] bg-[#1769F5]/45" aria-hidden="true" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#111827] tracking-tight leading-tight">
            {SERVICES_CONTENT.headingPrefix}
            <span className="text-[#1769F5]">{SERVICES_CONTENT.headingHighlight}</span>
          </h2>
          <p className="text-sm sm:text-[15px] text-[#5F6B7A] leading-relaxed mt-3">
            {SERVICES_CONTENT.intro}
          </p>
        </div>

        {/* 5 Service Cards Grid (1 col mobile, 2/3 tablet, 5 desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {SERVICES_DATA.map((service) => (
            <article
              key={service.id}
              className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(17,24,39,0.04)] hover:shadow-[0_10px_28px_rgba(23,105,245,0.1)] border border-[#E5EAF2] hover:border-[#3D8BFF]/50 transition-all duration-200 flex flex-col items-center text-center justify-between group"
            >
              <div className="flex flex-col items-center">
                {/* Pale-Blue Circular Icon Container */}
                <div className="w-14 h-14 rounded-full bg-[#EAF2FF] group-hover:bg-[#DBEAFE] flex items-center justify-center mb-4 transition-colors duration-200">
                  {renderIcon(service.icon)}
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-[#111827] group-hover:text-[#1769F5] leading-snug mb-2.5 transition-colors duration-200">
                  {service.title}
                </h3>

                {/* Concise Description */}
                <p className="text-xs sm:text-[13px] text-[#5F6B7A] leading-relaxed mb-5">
                  {service.shortDescription}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenServiceDetail(service)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1769F5] hover:text-[#1256CE] py-1.5 px-3 rounded-md hover:bg-[#EAF2FF]/60 transition-colors cursor-pointer min-h-[38px]"
              >
                <span>Pelajari Layanan</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onOpenAllServices}
            className="inline-flex items-center justify-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] text-white text-xs sm:text-[13px] font-semibold px-6 py-3 rounded-lg shadow-md shadow-[#1769F5]/20 transition-colors duration-200 min-h-[44px] cursor-pointer"
          >
            <span>{SERVICES_CONTENT.ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

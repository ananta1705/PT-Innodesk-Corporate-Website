import React from 'react';
import {
  ArrowRight,
  Compass,
  GitMerge,
  LayoutDashboard,
  Layers,
  Info,
} from 'lucide-react';
import { PortfolioConceptItem, WhyChooseItem } from '../types';
import {
  SOLUTIONS_CONTENT,
  PORTFOLIO_CONCEPTS,
  WHY_CHOOSE_CONTENT,
} from '../data/siteContent';
import {
  SmartMonitoringThumb,
  OperationalDashboardThumb,
  DeviceIntegrationThumb,
} from '../components/PortfolioThumbnails';

interface PortfolioSectionProps {
  onOpenPortfolioDetail: (item: PortfolioConceptItem) => void;
  onDiscussConcept: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onOpenPortfolioDetail,
  onDiscussConcept,
}) => {
  const renderWhyIcon = (icon: WhyChooseItem['icon']) => {
    switch (icon) {
      case 'context':
        return <Compass className="w-5 h-5 text-[#1769F5]" aria-hidden="true" />;
      case 'integration':
        return <GitMerge className="w-5 h-5 text-[#1769F5]" aria-hidden="true" />;
      case 'clarity':
        return <LayoutDashboard className="w-5 h-5 text-[#1769F5]" aria-hidden="true" />;
      case 'scalability':
        return <Layers className="w-5 h-5 text-[#1769F5]" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="solusi"
      className="py-16 lg:py-22 bg-[#F7F9FC] relative border-b border-[#E5EAF2]"
    >
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 4.7 SOLUTIONS & CONCEPT PORTFOLIO (Responsive Card Grid) */}
          <div className="lg:col-span-7">
            <div className="mb-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[#1769F5] text-xs font-bold uppercase tracking-[0.15em] mb-1.5">
                <span>{SOLUTIONS_CONTENT.eyebrow}</span>
                <span className="w-6 h-[1.5px] bg-[#1769F5]/45" aria-hidden="true" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                {SOLUTIONS_CONTENT.headingPrefix}
                <span className="text-[#1769F5]">{SOLUTIONS_CONTENT.headingHighlight}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#5F6B7A] mt-2 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {SOLUTIONS_CONTENT.intro}
              </p>
            </div>

            {/* 3 Concept Cards Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PORTFOLIO_CONCEPTS.map((concept) => (
                <article
                  key={concept.id}
                  className="bg-white rounded-xl overflow-hidden shadow-[0_4px_18px_rgba(17,24,39,0.05)] hover:shadow-[0_10px_26px_rgba(23,105,245,0.1)] border border-[#E5EAF2] hover:border-[#3D8BFF]/60 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Local SVG Concept Thumbnail */}
                    <div className="aspect-[16/11] w-full overflow-hidden bg-[#EAF2FF] relative">
                      {concept.thumbType === 'monitoring' && <SmartMonitoringThumb />}
                      {concept.thumbType === 'dashboard' && <OperationalDashboardThumb />}
                      {concept.thumbType === 'integration' && <DeviceIntegrationThumb />}
                      <span className="absolute top-2.5 left-2.5 bg-[#06112F]/90 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
                        {concept.category}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#1769F5] transition-colors leading-snug">
                        {concept.title}
                      </h3>
                      <p className="text-xs text-[#5F6B7A] mt-1.5 line-clamp-2 leading-relaxed">
                        {concept.shortSummary}
                      </p>

                      {/* Tags Row */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {concept.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium bg-[#F7F9FC] border border-[#E5EAF2] text-[#5F6B7A] px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Working Lihat Detail Button */}
                  <div className="px-4 pb-4 pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenPortfolioDetail(concept)}
                      className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#1769F5] hover:text-[#1256CE] pt-2.5 border-t border-[#E5EAF2] min-h-[38px] cursor-pointer"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E5EAF2]">
              <p className="text-xs text-[#5F6B7A]">
                Ketiga kartu di atas merupakan <strong>Ilustrasi Konsep</strong> untuk menggambarkan
                area solusi IoT yang dapat disesuaikan.
              </p>
              <button
                type="button"
                onClick={onDiscussConcept}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1769F5] hover:underline whitespace-nowrap cursor-pointer shrink-0"
              >
                <span>Diskusikan Konsep Anda</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* 4.8 WHY PT INNODESK (Pendekatan yang Berangkat dari Kebutuhan) */}
          <div className="lg:col-span-5">
            <div className="mb-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[#1769F5] text-xs font-bold uppercase tracking-[0.15em] mb-1.5">
                <span>{WHY_CHOOSE_CONTENT.eyebrow}</span>
                <span className="w-6 h-[1.5px] bg-[#1769F5]/45" aria-hidden="true" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                {WHY_CHOOSE_CONTENT.headingPrefix}
                <span className="text-[#1769F5]">{WHY_CHOOSE_CONTENT.headingHighlight}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#5F6B7A] mt-2 leading-relaxed">
                {WHY_CHOOSE_CONTENT.intro}
              </p>
            </div>

            {/* White Elevated Value-Proposition Panel */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(17,24,39,0.05)] border border-[#E5EAF2]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_CHOOSE_CONTENT.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF2] flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#EAF2FF] flex items-center justify-center mb-3">
                        {renderWhyIcon(item.icon)}
                      </div>
                      <h3 className="text-sm font-bold text-[#111827] mb-1.5 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#5F6B7A] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[#E5EAF2] flex items-start gap-2.5 text-xs text-[#5F6B7A]">
                <Info className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Prinsip kerja untuk memastikan solusi IoT dan integrasi sistem tetap relevan serta
                  mudah dipelihara.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

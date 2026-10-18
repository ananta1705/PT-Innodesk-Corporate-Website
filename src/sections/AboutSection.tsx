import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ABOUT_CONTENT } from '../data/siteContent';
import { AboutOfficeGraphic } from '../components/AboutOfficeGraphic';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section id="tentang" className="py-16 lg:py-22 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Team/Workspace Visual + Floating Pendekatan Terintegrasi Card */}
          <div className="lg:col-span-6">
            <AboutOfficeGraphic />
          </div>

          {/* Right Column: About PT Innodesk Copy, 4 Principles & CTA to Workflow */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-[#1769F5] text-xs font-bold uppercase tracking-[0.15em] mb-2.5">
              <span>{ABOUT_CONTENT.eyebrow}</span>
              <span className="w-8 h-[1.5px] bg-[#1769F5]/45" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#111827] leading-[1.2] tracking-tight mb-4 text-balance">
              {ABOUT_CONTENT.headingPrefix}
              <span className="text-[#1769F5]">{ABOUT_CONTENT.headingHighlight}</span>
            </h2>

            <p className="text-sm sm:text-[15px] text-[#5F6B7A] leading-[1.7] mb-3.5">
              {ABOUT_CONTENT.overview}
            </p>

            <p className="text-sm sm:text-[15px] text-[#5F6B7A] leading-[1.7] mb-6">
              {ABOUT_CONTENT.secondaryText}
            </p>

            {/* 4 Principles + CTA to IoT Workflow Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-2">
              <ul className="space-y-2.5">
                {ABOUT_CONTENT.principles.map((principle, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2.5 text-sm font-semibold text-[#111827]"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#1769F5] fill-[#EAF2FF] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cara-kerja"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('cara-kerja');
                }}
                className="self-start sm:self-end inline-flex items-center gap-2 bg-white hover:bg-[#F7F9FC] text-[#111827] border border-[#E5EAF2] hover:border-[#1769F5] text-xs sm:text-[13px] font-semibold px-5 py-3 rounded-lg shadow-2xs transition-colors duration-200 min-h-[44px] whitespace-nowrap"
              >
                <span>{ABOUT_CONTENT.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#1769F5]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

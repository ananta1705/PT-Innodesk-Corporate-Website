import React from 'react';
import { Cpu, Network, BarChart3, Compass } from 'lucide-react';
import { CAPABILITIES_BAND } from '../data/siteContent';
import { CapabilityBandItem } from '../types';

export const CapabilitiesSection: React.FC = () => {
  const renderIcon = (icon: CapabilityBandItem['icon']) => {
    switch (icon) {
      case 'device':
        return <Cpu className="w-6 h-6 text-[#3D8BFF]" aria-hidden="true" />;
      case 'architecture':
        return <Network className="w-6 h-6 text-[#3D8BFF]" aria-hidden="true" />;
      case 'visualization':
        return <BarChart3 className="w-6 h-6 text-[#3D8BFF]" aria-hidden="true" />;
      case 'planning':
        return <Compass className="w-6 h-6 text-[#3D8BFF]" aria-hidden="true" />;
    }
  };

  return (
    <section
      aria-label="Fokus Kapabilitas Solusi IoT PT Innodesk"
      className="bg-gradient-to-r from-[#06112F] via-[#081A42] to-[#06112F] text-white py-9 border-y border-white/10"
    >
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0 lg:divide-x divide-white/10">
          {CAPABILITIES_BAND.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center lg:justify-center gap-3 sm:gap-3.5 p-3 sm:py-2 sm:px-4 rounded-xl sm:rounded-none bg-white/5 sm:bg-transparent"
            >
              <div className="w-11 h-11 rounded-full bg-[#1769F5]/15 border border-[#3D8BFF]/35 flex items-center justify-center shrink-0">
                {renderIcon(item.icon)}
              </div>
              <div>
                <h3 className="text-xs sm:text-[15px] font-extrabold text-[#3D8BFF] leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-snug">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

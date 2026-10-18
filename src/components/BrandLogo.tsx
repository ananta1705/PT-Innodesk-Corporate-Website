import React from 'react';
import { COMPANY_INFO } from '../data/siteContent';

interface BrandLogoProps {
  theme?: 'dark' | 'light';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ theme = 'dark' }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Original PT Innodesk Geometric Circuit-Bridge & Node Mark */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
          theme === 'dark'
            ? 'bg-[#081A42] border-[#3D8BFF]/35 shadow-[0_0_16px_rgba(23,105,245,0.25)]'
            : 'bg-[#EAF2FF] border-[#1769F5]/20'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {/* Outer rounded tech frame */}
          <rect
            x="4"
            y="4"
            width="12"
            height="12"
            rx="3"
            fill="#1769F5"
          />
          <rect
            x="20"
            y="20"
            width="12"
            height="12"
            rx="3"
            fill="#3D8BFF"
          />
          {/* Interconnecting circuit bridge */}
          <path
            d="M16 10H23C24.6569 10 26 11.3431 26 13V20"
            stroke={theme === 'dark' ? '#60A5FA' : '#1769F5'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M10 16V23C10 24.6569 11.3431 26 13 26H20"
            stroke={theme === 'dark' ? '#60A5FA' : '#1769F5'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Node terminals */}
          <circle cx="26" cy="10" r="2.5" fill="#3D8BFF" />
          <circle cx="10" cy="26" r="2.5" fill="#1769F5" />
          <circle cx="10" cy="10" r="2" fill="#FFFFFF" />
          <circle cx="26" cy="26" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* PT Innodesk Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={`text-lg sm:text-[19px] font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#111827]'
          }`}
        >
          {COMPANY_INFO.name}
        </span>
        <span
          className={`text-[9px] font-semibold uppercase tracking-[0.18em] mt-1 ${
            theme === 'dark' ? 'text-slate-300' : 'text-[#5F6B7A]'
          }`}
        >
          {COMPANY_INFO.tagline}
        </span>
      </div>
    </div>
  );
};

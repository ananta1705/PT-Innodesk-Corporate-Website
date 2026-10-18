import React from 'react';
import { Layers } from 'lucide-react';
import { ABOUT_CONTENT } from '../data/siteContent';

export const AboutOfficeGraphic: React.FC = () => {
  return (
    <div className="relative pb-6 sm:pr-6">
      {/* Main Team & Engineering Workspace Visual */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(6,17,47,0.08)] border border-[#E5EAF2] bg-[#F7F9FC] aspect-[16/10]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 640 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="officeWallBg" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E5EAF2" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="glassPartition" x1="120" y1="0" x2="540" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F7F9FC" />
              <stop offset="50%" stopColor="#EAF2FF" />
              <stop offset="100%" stopColor="#DBEAFE" />
            </linearGradient>
            <linearGradient id="deskSurface" x1="40" y1="270" x2="560" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E6C29F" />
              <stop offset="100%" stopColor="#C89D74" />
            </linearGradient>
          </defs>

          <rect width="640" height="400" fill="url(#officeWallBg)" />

          {/* Left Architecture Wall */}
          <rect x="0" y="0" width="135" height="300" fill="#F7F9FC" />
          <rect x="24" y="92" width="46" height="60" rx="3" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          <rect x="33" y="103" width="28" height="38" fill="#EAF2FF" />

          {/* Glass Office Partition */}
          <rect x="135" y="10" width="380" height="245" fill="url(#glassPartition)" stroke="#1E293B" strokeWidth="6" />
          <line x1="255" y1="10" x2="255" y2="255" stroke="#1E293B" strokeWidth="5" />
          <line x1="385" y1="10" x2="385" y2="255" stroke="#1E293B" strokeWidth="5" />
          <line x1="135" y1="185" x2="515" y2="185" stroke="#1E293B" strokeWidth="4" />

          {/* Subtle City/Campus Silhouette */}
          <rect x="160" y="55" width="55" height="125" fill="#94A3B8" opacity="0.22" />
          <rect x="275" y="38" width="75" height="142" fill="#64748B" opacity="0.18" />
          <rect x="410" y="65" width="68" height="115" fill="#94A3B8" opacity="0.22" />

          {/* Right Office Column */}
          <rect x="515" y="0" width="125" height="310" fill="#E5EAF2" />

          {/* Team Member 2 (Center Systems Engineer) */}
          <g transform="translate(232, 130)">
            <path d="M18 68 C18 48 74 48 74 68 L82 115 H10 L18 68 Z" fill="#081A42" />
            <path d="M38 62 L46 82 L54 62 Z" fill="#93C5FD" />
            <rect x="40" y="45" width="12" height="14" rx="4" fill="#D9A07E" />
            <ellipse cx="46" cy="30" rx="16" ry="19" fill="#E5B293" />
            <path d="M30 26 C30 10 62 10 62 26 C62 18 54 14 46 14 C38 14 30 18 30 26 Z" fill="#111827" />
          </g>

          {/* Team Member 3 (Right Software Analyst) */}
          <g transform="translate(340, 152)">
            <path d="M22 72 C22 54 78 54 78 72 L88 130 H12 L22 72 Z" fill="#1E293B" />
            <path d="M40 66 L50 108 L60 66 Z" fill="#FFFFFF" />
            <rect x="44" y="48" width="12" height="16" rx="4" fill="#E5B293" />
            <path d="M28 30 C26 10 74 10 72 30 L78 78 H22 L28 30 Z" fill="#111827" />
            <ellipse cx="50" cy="34" rx="15" ry="18" fill="#ECC0A3" />
          </g>

          {/* Collaboration Desk */}
          <polygon points="30,275 495,245 615,320 120,400 30,400" fill="url(#deskSurface)" />
          <polygon points="120,400 615,320 615,336 145,400" fill="#A47850" />

          {/* Laptop on Desk */}
          <g transform="translate(278, 208)">
            <polygon points="0,0 70,-6 66,42 -4,48" fill="#06112F" stroke="#475569" strokeWidth="1.5" />
            <polygon points="-4,48 66,42 82,50 12,56" fill="#64748B" />
          </g>

          {/* Dual Monitors Showing System Architecture */}
          <g transform="translate(195, 190)">
            <rect x="0" y="0" width="88" height="58" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="5" y="5" width="78" height="46" fill="#06112F" />
            <rect x="12" y="14" width="28" height="14" rx="1" fill="#1769F5" />
            <rect x="44" y="14" width="32" height="14" rx="1" fill="#3D8BFF" />
            <rect x="12" y="32" width="64" height="12" rx="1" fill="#1E293B" />
            <rect x="38" y="58" width="12" height="16" fill="#CBD5E1" />
            <ellipse cx="44" cy="74" rx="20" ry="4" fill="#E2E8F0" />
          </g>

          <g transform="translate(168, 214)">
            <polygon points="0,4 94,-10 94,54 0,68" fill="#F7F9FC" stroke="#CBD5E1" strokeWidth="2" />
            <polygon points="5,8 89,-5 89,47 5,60" fill="#FFFFFF" />
            <polygon points="10,14 44,9 44,32 10,37" fill="#1769F5" opacity="0.88" />
            <polygon points="48,8 84,3 84,26 48,31" fill="#3D8BFF" opacity="0.85" />
            <polygon points="10,41 84,30 84,43 10,54" fill="#E5EAF2" />
            <rect x="42" y="60" width="10" height="26" fill="#94A3B8" />
            <ellipse cx="47" cy="86" rx="22" ry="5" fill="#CBD5E1" />
          </g>

          {/* Team Member 1 (Foreground Lead Engineer) */}
          <g transform="translate(22, 148)">
            <rect x="-8" y="95" width="26" height="120" rx="8" fill="#06112F" />
            <path d="M12 86 C14 68 62 68 68 88 L92 168 L18 190 Z" fill="#06112F" />
            <path d="M55 112 L122 136 L142 128 L148 136 L118 150 L48 132 Z" fill="#081A42" />
            <ellipse cx="148" cy="132" rx="9" ry="5" fill="#E5B293" />
            <rect x="34" y="64" width="16" height="18" rx="4" fill="#D9A07E" />
            <ellipse cx="46" cy="46" rx="20" ry="23" fill="#E5B293" />
            <path d="M26 44 C24 20 64 16 66 36 C56 26 42 28 34 48 Z" fill="#111827" />
            <rect x="52" y="38" width="14" height="8" rx="2" stroke="#1E293B" strokeWidth="2" fill="none" />
            <line x1="40" y1="41" x2="52" y2="41" stroke="#1E293B" strokeWidth="2" />
          </g>

          <polygon points="155,298 205,286 214,296 164,308" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        </svg>
      </div>

      {/* Floating Blue Capability Card (Presents Real Principle, NOT Invented Years Stat) */}
      <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-0 sm:right-0 sm:max-w-[215px] bg-gradient-to-b from-[#1769F5] to-[#081A42] text-white rounded-xl p-4 sm:p-5 shadow-[0_14px_30px_rgba(8,26,66,0.32)] border-2 border-white flex sm:flex-col items-center sm:text-center gap-3.5 sm:gap-2">
        <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <Layers className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#93C5FD]">
            {ABOUT_CONTENT.floatingCard.badge}
          </span>
          <span className="block text-base sm:text-lg font-extrabold tracking-tight leading-snug mt-0.5">
            {ABOUT_CONTENT.floatingCard.title}
          </span>
          <span className="block text-xs text-blue-100 leading-tight mt-1">
            {ABOUT_CONTENT.floatingCard.subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};

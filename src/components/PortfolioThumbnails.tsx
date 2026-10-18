import React from 'react';

export const SmartMonitoringThumb: React.FC = () => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover"
    aria-hidden="true"
  >
    <rect width="280" height="180" fill="#F7F9FC" />
    {/* Header Bar */}
    <rect width="280" height="22" fill="#081A42" />
    <circle cx="12" cy="11" r="3" fill="#3D8BFF" />
    <circle cx="22" cy="11" r="3" fill="#93C5FD" />
    <rect x="175" y="7" width="90" height="8" rx="4" fill="#1769F5" />

    {/* Telemetry Cards Grid */}
    <rect x="14" y="32" width="120" height="62" rx="6" fill="#FFFFFF" stroke="#E5EAF2" />
    <rect x="24" y="42" width="54" height="6" rx="2" fill="#1769F5" />
    <rect x="24" y="54" width="84" height="10" rx="2" fill="#06112F" />
    <rect x="24" y="70" width="66" height="5" rx="2" fill="#5F6B7A" opacity="0.5" />

    <rect x="146" y="32" width="120" height="62" rx="6" fill="#06112F" />
    <circle cx="174" cy="63" r="16" stroke="#3D8BFF" strokeWidth="3" />
    <rect x="200" y="48" width="52" height="7" rx="2" fill="#93C5FD" />
    <rect x="200" y="61" width="38" height="6" rx="2" fill="#3D8BFF" />
    <rect x="200" y="72" width="44" height="5" rx="2" fill="#64748B" />

    {/* Bottom Trend Graph */}
    <rect x="14" y="104" width="252" height="62" rx="6" fill="#FFFFFF" stroke="#E5EAF2" />
    <polyline
      points="28,148 68,132 108,140 148,120 188,128 228,114 252,122"
      stroke="#1769F5"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="148" cy="120" r="3.5" fill="#1769F5" />
    <circle cx="228" cy="114" r="3.5" fill="#3D8BFF" />
  </svg>
);

export const OperationalDashboardThumb: React.FC = () => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover"
    aria-hidden="true"
  >
    <rect width="280" height="180" fill="#F7F9FC" />
    {/* Top App Bar */}
    <rect width="280" height="20" fill="#FFFFFF" />
    <rect x="14" y="6" width="48" height="7" rx="2" fill="#06112F" />
    <rect x="110" y="7" width="65" height="5" rx="2" fill="#94A3B8" />
    <circle cx="258" cy="10" r="4" fill="#1769F5" />

    {/* Summary Banner */}
    <rect x="14" y="28" width="252" height="30" rx="5" fill="#EAF2FF" />
    <rect x="26" y="37" width="96" height="6" rx="2" fill="#1769F5" />
    <rect x="26" y="47" width="64" height="4" rx="2" fill="#5F6B7A" />

    {/* 3 Module Panels */}
    {[0, 1, 2].map((col) => {
      const x = 14 + col * 86;
      const accents = ['#1769F5', '#081A42', '#3D8BFF'];
      return (
        <g key={col} transform={`translate(${x}, 68)`}>
          <rect width="78" height="98" rx="6" fill="#FFFFFF" stroke="#E5EAF2" />
          <rect x="8" y="8" width="62" height="44" rx="4" fill="#F7F9FC" />
          <rect x="16" y="20" width="46" height="8" rx="2" fill={accents[col]} />
          <rect x="16" y="34" width="32" height="6" rx="2" fill="#93C5FD" />
          <rect x="10" y="62" width="48" height="5" rx="2" fill="#111827" />
          <rect x="10" y="72" width="34" height="4" rx="2" fill="#5F6B7A" />
          <rect x="10" y="82" width="58" height="8" rx="3" fill="#EAF2FF" />
        </g>
      );
    })}
  </svg>
);

export const DeviceIntegrationThumb: React.FC = () => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="innoPipelineBg" x1="0" y1="0" x2="280" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#06112F" />
        <stop offset="60%" stopColor="#081A42" />
        <stop offset="100%" stopColor="#06112F" />
      </linearGradient>
    </defs>
    <rect width="280" height="180" fill="url(#innoPipelineBg)" />

    <circle cx="225" cy="38" r="50" fill="#1769F5" opacity="0.2" />
    <circle cx="48" cy="142" r="42" fill="#3D8BFF" opacity="0.15" />

    {/* Top Architecture Tag */}
    <rect x="75" y="20" width="130" height="16" rx="8" fill="#081A42" stroke="#3D8BFF" strokeWidth="1" />
    <text x="140" y="31" textAnchor="middle" fill="#93C5FD" fontSize="7" fontWeight="700" letterSpacing="1.4">
      KONSEP ARSITEKTUR
    </text>

    {/* Center Concept Title */}
    <text x="140" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="800" letterSpacing="0.8">
      INTEGRASI
    </text>
    <text x="140" y="96" textAnchor="middle" fill="#3D8BFF" fontSize="18" fontWeight="800" letterSpacing="1">
      SISTEM &amp; IOT
    </text>

    {/* Connected Pipeline Nodes */}
    <rect x="36" y="118" width="58" height="38" rx="5" fill="#081A42" stroke="#1769F5" />
    <rect x="46" y="136" width="6" height="12" rx="1" fill="#3D8BFF" />
    <rect x="56" y="130" width="6" height="18" rx="1" fill="#60A5FA" />
    <rect x="66" y="124" width="6" height="24" rx="1" fill="#1769F5" />

    <line x1="94" y1="137" x2="186" y2="137" stroke="#3D8BFF" strokeWidth="1.5" strokeDasharray="3 3" />
    <circle cx="140" cy="137" r="6" fill="#1769F5" stroke="#93C5FD" strokeWidth="1.5" />

    <rect x="186" y="118" width="58" height="38" rx="5" fill="#081A42" stroke="#3D8BFF" />
    <circle cx="215" cy="137" r="10" stroke="#60A5FA" strokeWidth="2" />
    <circle cx="215" cy="137" r="4" fill="#3D8BFF" />
  </svg>
);

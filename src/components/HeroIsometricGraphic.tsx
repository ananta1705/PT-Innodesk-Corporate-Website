import React from 'react';

export const HeroIsometricGraphic: React.FC = () => {
  return (
    <div
      className="relative w-full max-w-[560px] mx-auto select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle blue glow behind the illustration */}
      <div className="absolute inset-0 -m-4 bg-radial from-[#1769F5]/30 via-[#1769F5]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 640 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_18px_32px_rgba(6,17,47,0.65)]"
      >
        <defs>
          <linearGradient id="innoScreen" x1="220" y1="65" x2="505" y2="295" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0C245E" />
            <stop offset="60%" stopColor="#081A42" />
            <stop offset="100%" stopColor="#06112F" />
          </linearGradient>

          <linearGradient id="innoBezel" x1="210" y1="60" x2="525" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3D8BFF" />
            <stop offset="100%" stopColor="#1769F5" />
          </linearGradient>

          <linearGradient id="innoBaseTop" x1="125" y1="255" x2="485" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="55%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1769F5" />
          </linearGradient>

          <linearGradient id="innoBaseEdge" x1="125" y1="305" x2="485" y2="410" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#1769F5" />
          </linearGradient>

          <linearGradient id="innoPanel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1769F5" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#0E4BCE" stopOpacity="0.88" />
          </linearGradient>

          <linearGradient id="innoCloud" x1="475" y1="28" x2="600" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1769F5" />
          </linearGradient>
        </defs>

        {/* Isometric Technical Floor Grid */}
        <g opacity="0.2" stroke="#3D8BFF" strokeWidth="1">
          <line x1="65" y1="325" x2="380" y2="178" />
          <line x1="115" y1="360" x2="430" y2="213" />
          <line x1="165" y1="395" x2="480" y2="248" />
          <line x1="215" y1="430" x2="530" y2="283" />
          <line x1="265" y1="448" x2="580" y2="301" />

          <line x1="340" y1="182" x2="585" y2="330" />
          <line x1="280" y1="212" x2="525" y2="360" />
          <line x1="220" y1="242" x2="465" y2="390" />
          <line x1="160" y1="272" x2="405" y2="420" />
          <line x1="100" y1="302" x2="345" y2="445" />
        </g>

        {/* Subtle Node Connection Lines */}
        <g stroke="#3D8BFF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.55">
          <path d="M165 160 L265 145" />
          <path d="M180 265 L250 240" />
          <path d="M495 105 L445 145" />
          <path d="M465 360 L395 330" />
        </g>

        {/* Glowing Node Dots */}
        <circle cx="95" cy="110" r="2.5" fill="#3D8BFF" opacity="0.8" />
        <circle cx="285" cy="44" r="3" fill="#60A5FA" opacity="0.7" />
        <circle cx="440" cy="48" r="2" fill="#93C5FD" opacity="0.8" />
        <circle cx="590" cy="175" r="2.5" fill="#38BDF8" opacity="0.7" />

        {/* ==================== TOP RIGHT: CLOUD & DATA SYNC MOTIF ==================== */}
        <g transform="translate(472, 26)">
          <path
            d="M36 76 H106 C120 76 132 65 132 51 C132 39 122 29 110 28 C106 12 91 2 73 2 C54 2 38 15 35 34 C21 35 12 46 12 58 C12 68 22 76 36 76 Z"
            fill="#081A42"
            transform="translate(5, 6)"
          />
          <path
            d="M36 76 H106 C120 76 132 65 132 51 C132 39 122 29 110 28 C106 12 91 2 73 2 C54 2 38 15 35 34 C21 35 12 46 12 58 C12 68 22 76 36 76 Z"
            fill="url(#innoCloud)"
            stroke="#93C5FD"
            strokeWidth="1.5"
          />
          {/* Upward Telemetry Sync Arrow */}
          <path
            d="M72 22 L56 41 H66 V60 H78 V41 H88 L72 22 Z"
            fill="#FFFFFF"
          />
        </g>

        {/* ==================== UPPER LEFT: FLOATING TELEMETRY / CODE PANEL ==================== */}
        <g transform="translate(72, 108) skewY(-17)">
          <rect
            x="0"
            y="0"
            width="108"
            height="76"
            rx="8"
            fill="#081A42"
            stroke="#3D8BFF"
            strokeWidth="2"
          />
          <circle cx="13" cy="12" r="2.5" fill="#3D8BFF" />
          <circle cx="21" cy="12" r="2.5" fill="#60A5FA" />
          <circle cx="29" cy="12" r="2.5" fill="#1769F5" />
          {/* Telemetry waveform & code lines */}
          <rect x="13" y="24" width="48" height="4" rx="2" fill="#3D8BFF" />
          <rect x="13" y="33" width="76" height="4" rx="2" fill="#93C5FD" opacity="0.85" />
          <rect x="21" y="42" width="60" height="4" rx="2" fill="#38BDF8" opacity="0.9" />
          <rect x="21" y="51" width="44" height="4" rx="2" fill="#60A5FA" opacity="0.75" />
          <rect x="13" y="60" width="68" height="4" rx="2" fill="#93C5FD" opacity="0.65" />
        </g>

        {/* ==================== MIDDLE LEFT: IOT GATEWAY / SERVER STACK ==================== */}
        <g transform="translate(100, 222)">
          <polygon points="48,26 96,50 48,74 0,50" fill="#081A42" stroke="#3D8BFF" strokeWidth="1.2" />
          <polygon points="0,50 48,74 48,84 0,60" fill="#06112F" />
          <polygon points="48,74 96,50 96,60 48,84" fill="#1769F5" />

          {/* Gateway Module 2 */}
          <g transform="translate(8, -14)">
            <polygon points="40,16 80,36 40,56 0,36" fill="#3D8BFF" />
            <polygon points="0,36 40,56 40,70 0,50" fill="#1769F5" />
            <polygon points="40,56 80,36 80,50 40,70" fill="#1256CE" />
            <circle cx="13" cy="46" r="2" fill="#93C5FD" />
            <circle cx="21" cy="50" r="2" fill="#93C5FD" />
          </g>

          {/* Gateway Module 1 (Top) */}
          <g transform="translate(8, -34)">
            <polygon points="40,16 80,36 40,56 0,36" fill="#93C5FD" />
            <polygon points="0,36 40,56 40,70 0,50" fill="#3D8BFF" />
            <polygon points="40,56 80,36 80,50 40,70" fill="#1769F5" />
            <circle cx="13" cy="46" r="2" fill="#FFFFFF" />
            <circle cx="21" cy="50" r="2" fill="#BAE6FD" />
          </g>
        </g>

        {/* ==================== CENTER: ISOMETRIC LAPTOP & DASHBOARD ==================== */}
        <polygon
          points="135,312 315,234 495,318 315,404"
          fill="#03091C"
          opacity="0.75"
        />

        {/* Laptop Lid */}
        <path
          d="M276 64 L504 160 C510 163 514 170 513 177 L490 312 L254 204 L266 70 C267 65 271 62 276 64 Z"
          fill="url(#innoBezel)"
        />

        {/* Laptop Display */}
        <path
          d="M272 70 L498 165 L480 302 L256 199 Z"
          fill="url(#innoScreen)"
          stroke="#60A5FA"
          strokeWidth="1.5"
        />

        {/* Structured Code & Architecture Lines on Screen */}
        <g opacity="0.92">
          <line x1="282" y1="90" x2="332" y2="111" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <line x1="280" y1="103" x2="365" y2="139" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="288" y1="116" x2="348" y2="141" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="286" y1="127" x2="374" y2="164" stroke="#3D8BFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="292" y1="140" x2="346" y2="162" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="282" y1="148" x2="360" y2="181" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="280" y1="160" x2="335" y2="183" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="286" y1="173" x2="368" y2="208" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="274" y1="184" x2="352" y2="218" stroke="#3D8BFF" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Floating Blue Dashboard Card on Right Side of Laptop Screen */}
        <g>
          <path
            d="M396 146 L494 188 L478 286 L380 243 Z"
            fill="url(#innoPanel)"
            stroke="#93C5FD"
            strokeWidth="1.5"
          />
          <line x1="406" y1="168" x2="454" y2="188" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="403" y1="182" x2="474" y2="212" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="401" y1="196" x2="460" y2="221" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="398" y1="210" x2="468" y2="240" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="395" y1="224" x2="446" y2="246" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="393" y1="237" x2="463" y2="267" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Laptop Keyboard Base */}
        <path
          d="M254 202 L482 303 L336 384 C326 389 313 389 303 384 L126 292 C119 288 119 280 126 276 L254 202 Z"
          fill="url(#innoBaseTop)"
        />
        <path
          d="M122 286 L303 382 C313 387 326 387 336 382 L482 303 L482 314 L336 394 C326 399 313 399 303 394 L122 298 Z"
          fill="url(#innoBaseEdge)"
        />

        {/* Keyboard Matrix */}
        <polygon
          points="254,218 450,304 386,340 192,252"
          fill="#06112F"
          stroke="#3D8BFF"
          strokeWidth="1"
        />
        <g stroke="#3D8BFF" strokeWidth="0.9" opacity="0.6">
          <line x1="242" y1="225" x2="438" y2="311" />
          <line x1="230" y1="232" x2="426" y2="318" />
          <line x1="218" y1="239" x2="414" y2="325" />
          <line x1="206" y1="246" x2="402" y2="332" />
          <line x1="273" y1="226" x2="211" y2="260" />
          <line x1="303" y1="239" x2="241" y2="273" />
          <line x1="333" y1="252" x2="271" y2="286" />
          <line x1="363" y1="265" x2="301" y2="299" />
          <line x1="393" y1="278" x2="331" y2="312" />
          <line x1="423" y1="291" x2="361" y2="325" />
        </g>

        {/* Trackpad */}
        <polygon
          points="240,288 300,316 270,334 210,305"
          fill="#1769F5"
          opacity="0.55"
          stroke="#93C5FD"
          strokeWidth="1"
        />

        {/* ==================== BOTTOM LEFT: CONNECTED EDGE TABLET ==================== */}
        <g transform="translate(86, 322)">
          <polygon points="48,2 114,34 66,64 0,32" fill="#081A42" transform="translate(0, 5)" />
          <polygon
            points="48,2 114,34 66,64 0,32"
            fill="#06112F"
            stroke="#60A5FA"
            strokeWidth="1.5"
          />
          <line x1="46" y1="16" x2="86" y2="35" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="22" x2="78" y2="41" stroke="#3D8BFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="27" x2="64" y2="43" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* ==================== BOTTOM RIGHT: MOBILE MONITORING SCREEN ==================== */}
        <g transform="translate(422, 338)">
          <polygon points="42,0 95,25 53,55 0,30" fill="#081A42" transform="translate(0, 5)" />
          <polygon
            points="42,0 95,25 53,55 0,30"
            fill="#06112F"
            stroke="#60A5FA"
            strokeWidth="1.5"
          />
          <polygon points="42,9 78,26 62,38 26,21" fill="#1769F5" opacity="0.9" />
          <line x1="22" y1="26" x2="52" y2="40" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="31" x2="40" y2="42" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* ==================== RIGHT: SENSOR NODE / SMART DEVICE POD ==================== */}
        <g transform="translate(518, 236)">
          <ellipse cx="30" cy="82" rx="22" ry="9" fill="#03091C" opacity="0.65" />
          <polygon points="30,30 56,44 30,58 4,44" fill="#60A5FA" />
          <polygon points="4,44 30,58 30,82 4,68" fill="#1769F5" />
          <polygon points="30,58 56,44 56,68 30,82" fill="#0E4BCE" />
          {/* Signal rings above sensor node */}
          <path d="M20 20 Q30 12 40 20" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 12 Q30 2 46 12" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
          <circle cx="30" cy="27" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

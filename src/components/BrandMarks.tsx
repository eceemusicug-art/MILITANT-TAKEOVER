/**
 * Hand-drawn brand marks (inline SVG).
 * MICIO — red tile, white brush-script wordmark, angled white bar.
 * FOOTPLUG — red sneaker wordmark with plug + tagline on white.
 * DualSense-style gamepad for the PS5 games station.
 */

export function FootPlugLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 150"
      className={className}
      role="img"
      aria-label="FootPlug — The Foot Plug"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="220" height="150" rx="14" fill="#FFFFFF" />
      {/* sneaker collar hint */}
      <path
        d="M38 52 C48 44 62 44 72 52 C78 57 86 56 92 48 L98 54 C90 64 76 68 64 62 C54 57 46 58 40 62 Z"
        fill="#D61E2A"
      />
      {/* tongue + lace ticks */}
      <path d="M104 34 L128 30 L132 44 L108 50 Z" fill="#D61E2A" />
      <g fill="#D61E2A">
        <rect x="118" y="46" width="9" height="22" rx="4.5" transform="rotate(24 118 46)" />
        <rect x="131" y="50" width="9" height="22" rx="4.5" transform="rotate(24 131 50)" />
        <rect x="144" y="54" width="9" height="22" rx="4.5" transform="rotate(24 144 54)" />
        <rect x="157" y="58" width="9" height="20" rx="4.5" transform="rotate(24 157 58)" />
      </g>
      {/* FOOTPLUG wordmark forming the shoe body */}
      <text
        x="112"
        y="102"
        textAnchor="middle"
        fill="#D61E2A"
        fontFamily="'Anton', 'Arial Black', sans-serif"
        fontSize="44"
        fontWeight="400"
        letterSpacing="1"
      >
        FOOTPLUG
      </text>
      {/* sole */}
      <path
        d="M18 108 Q112 116 202 96 L202 106 Q112 126 18 118 Z"
        fill="#D61E2A"
      />
      {/* plug mark above the G */}
      <g
        stroke="#0A0A0A"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        transform="translate(172 30)"
      >
        <line x1="4" y1="0" x2="4" y2="10" />
        <line x1="14" y1="0" x2="14" y2="10" />
        <path d="M0 10 L0 20 C0 27 4 30 9 30 C14 30 18 27 18 20 L18 10 Z" />
        <path d="M9 30 C9 38 15 38 11 44 C7 50 15 52 11 60" />
      </g>
      {/* tagline */}
      <text
        x="110"
        y="138"
        textAnchor="middle"
        fill="#0A0A0A"
        fontFamily="'Inter', Arial, sans-serif"
        fontSize="17"
        fontWeight="500"
        letterSpacing="2.5"
      >
        THE FOOT PLUG
      </text>
    </svg>
  );
}

export function MicioLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Micio"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="micio-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0102A" />
          <stop offset="55%" stopColor="#E10F28" />
          <stop offset="100%" stopColor="#C20B21" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="18" fill="url(#micio-red)" />
      {/* brush-script wordmark */}
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Yellowtail', 'Brush Script MT', cursive"
        fontSize="72"
        fontWeight="400"
      >
        Micio
      </text>
      {/* angled marker bar */}
      <path d="M24 146 L178 133 L175 162 L27 172 Z" fill="#FFFFFF" />
    </svg>
  );
}

export function Ps5Pad({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 96"
      className={className}
      role="img"
      aria-label="PlayStation 5 controller"
    >
      <defs>
        <linearGradient id="pad-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7F9FE" />
          <stop offset="62%" stopColor="#E4E9F4" />
          <stop offset="100%" stopColor="#C3CCDD" />
        </linearGradient>
        <linearGradient id="pad-grip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAF0FA" />
          <stop offset="100%" stopColor="#AFBACC" />
        </linearGradient>
        <linearGradient id="pad-light" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6ED4FF" />
          <stop offset="100%" stopColor="#A9E6FF" />
        </linearGradient>
      </defs>

      {/* grips behind the body */}
      <path
        d="M24 44 C15 52 10 64 13 75 C15 83 23 88 30 84 C37 80 41 70 43 59 Z"
        fill="url(#pad-grip)"
      />
      <path
        d="M104 44 C113 52 118 64 115 75 C113 83 105 88 98 84 C91 80 87 70 85 59 Z"
        fill="url(#pad-grip)"
      />

      {/* main body */}
      <path
        d="M34 14 C56 8 72 8 94 14 C106 17 115 24 119 34 C123 45 120 57 111 65 C103 72 92 73 85 66 C80 61 77 55 75 50 C73 46 69 44 64 44 C59 44 55 46 53 50 C51 55 48 61 43 66 C36 73 25 72 17 65 C8 57 5 45 9 34 C13 24 22 17 34 14 Z"
        fill="url(#pad-shell)"
        stroke="#98A5BC"
        strokeWidth="1.2"
      />

      {/* light bar wrapping the touchpad */}
      <path
        d="M46 24 C39 29 39 45 46 50"
        fill="none"
        stroke="url(#pad-light)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M82 24 C89 29 89 45 82 50"
        fill="none"
        stroke="url(#pad-light)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* touchpad */}
      <rect x="47" y="25" width="34" height="18" rx="6" fill="#D5DDEB" stroke="#8E9BB3" strokeWidth="1" />
      <rect x="52" y="30" width="24" height="8" rx="4" fill="#B9C4D6" opacity="0.65" />

      {/* D-pad */}
      <rect x="22" y="42" width="17" height="6" rx="3" fill="#20283B" />
      <rect x="27.5" y="36.5" width="6" height="17" rx="3" fill="#20283B" />

      {/* face buttons */}
      <circle cx="98" cy="37" r="3.6" fill="#20283B" />
      <circle cx="105" cy="44.5" r="3.6" fill="#20283B" />
      <circle cx="98" cy="52" r="3.6" fill="#20283B" />
      <circle cx="91" cy="44.5" r="3.6" fill="#20283B" />

      {/* sticks */}
      <circle cx="51" cy="56" r="9" fill="#20283B" />
      <circle cx="51" cy="56" r="5" fill="#39445E" />
      <circle cx="77" cy="56" r="9" fill="#20283B" />
      <circle cx="77" cy="56" r="5" fill="#39445E" />

      {/* centre PS button */}
      <circle cx="64" cy="51" r="3.4" fill="#20283B" />
    </svg>
  );
}

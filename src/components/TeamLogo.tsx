import React from 'react';

interface TeamLogoProps {
  customLogoUrl?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withGlow?: boolean;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({
  customLogoUrl,
  className = '',
  size = 'md',
  withGlow = false,
}) => {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-48 h-48 sm:w-60 sm:h-60',
  };

  if (customLogoUrl) {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden bg-[#070b14] border border-cyan-500/40 p-1.5 transition-all ${
          withGlow ? 'ring-2 ring-cyan-400/50 shadow-2xl shadow-cyan-500/30' : ''
        } ${sizeMap[size]} ${className}`}
      >
        <img
          src={customLogoUrl}
          alt="Team Prometheus Official Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
    );
  }

  // High-fidelity vector rendition faithfully matching Team Prometheus's cybernetic logo:
  // - Arched glowing cyan 'PROMETHEUS' typography
  // - Planetary sphere with atmospheric glow
  // - Circuit-trace cybernetic human profile head
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl bg-[#03060c] border border-cyan-500/40 overflow-hidden transition-all ${
        withGlow ? 'shadow-2xl shadow-cyan-500/25 ring-2 ring-cyan-400/40' : ''
      } ${sizeMap[size]} ${className}`}
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Team Prometheus Official Cybernetic Insignia"
      >
        <defs>
          {/* Deep Space Background */}
          <radialGradient id="spaceGlow" cx="50%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#081426" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#03060c" stopOpacity="1" />
          </radialGradient>

          {/* Planetary Limb Glow */}
          <radialGradient id="planetLimb" cx="50%" cy="30%" r="60%">
            <stop offset="70%" stopColor="#050a14" stopOpacity="0" />
            <stop offset="92%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="98%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e0f2fe" stopOpacity="1" />
          </radialGradient>

          {/* Cyan Glow Filter for PROMETHEUS Text */}
          <filter id="neonCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Circuit Trace Silver Gradient */}
          <linearGradient id="circuitSilver" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Arched Text Path */}
          <path
            id="textPathArc"
            d="M 50 160 A 160 160 0 0 1 350 160"
            fill="none"
          />
        </defs>

        {/* Space Backdrop */}
        <rect width="400" height="400" fill="url(#spaceGlow)" />

        {/* Star speckles */}
        <circle cx="45" cy="60" r="1" fill="#fff" opacity="0.6" />
        <circle cx="120" cy="40" r="1.5" fill="#bae6fd" opacity="0.8" />
        <circle cx="280" cy="50" r="1.2" fill="#fff" opacity="0.5" />
        <circle cx="360" cy="90" r="1" fill="#7dd3fc" opacity="0.7" />
        <circle cx="30" cy="220" r="1.2" fill="#fff" opacity="0.4" />
        <circle cx="370" cy="290" r="1.5" fill="#38bdf8" opacity="0.6" />
        <circle cx="80" cy="340" r="1" fill="#fff" opacity="0.5" />

        {/* Planetary Sphere Body */}
        <circle cx="200" cy="220" r="155" fill="#040812" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.9" />
        <circle cx="200" cy="220" r="155" fill="url(#planetLimb)" />

        {/* Atmospheric Halo Ring */}
        <circle
          cx="200"
          cy="220"
          r="157"
          stroke="#38bdf8"
          strokeWidth="2.5"
          opacity="0.75"
          strokeDasharray="180 8 40 10 90 6"
        />

        {/* Arched Text: PROMETHEUS */}
        <text
          fill="#38bdf8"
          fontSize="34"
          fontWeight="900"
          fontFamily="'Space Grotesk', system-ui, sans-serif"
          letterSpacing="12"
          filter="url(#neonCyanGlow)"
          textAnchor="middle"
        >
          <textPath href="#textPathArc" startOffset="50%">
            PROMETHEUS
          </textPath>
        </text>

        {/* Circuit Board Cybernetic Profile Head (Facing Right) */}
        <g transform="translate(10, 10)">
          {/* Cybernetic Face Outer Contour & Profile */}
          {/* Forehead to Nose, Lips, Chin, Neck */}
          <path
            d="M 230 145 C 245 155 260 172 268 190 C 272 198 276 208 282 215 C 285 218 290 220 293 222 C 288 226 280 228 278 232 C 275 237 282 242 284 246 C 280 250 274 252 271 257 C 267 263 268 270 262 277 C 255 285 244 295 240 310 C 238 318 234 326 230 332"
            stroke="url(#circuitSilver)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Eye Orbit Circuitry */}
          <polygon
            points="248,206 262,209 252,216"
            fill="#030712"
            stroke="#e2e8f0"
            strokeWidth="1.5"
          />
          <circle cx="254" cy="211" r="2.5" fill="#38bdf8" />

          {/* Ear Sensor Coil */}
          <path
            d="M 205 215 C 215 215 220 222 220 230 C 220 242 210 250 200 252 C 195 253 192 248 195 242 C 198 236 205 235 208 230"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="204" cy="230" r="3" fill="#38bdf8" />

          {/* Motherboard Trace Lines streaming from back of head / occipital region */}
          {/* Horizontal Trace Bus 1 */}
          <path d="M 120 150 L 160 150 L 180 165 L 220 165" stroke="#94a3b8" strokeWidth="1.8" fill="none" />
          <circle cx="120" cy="150" r="2.5" fill="#e2e8f0" />
          <circle cx="220" cy="165" r="2.5" fill="#38bdf8" />

          {/* Trace Bus 2 */}
          <path d="M 105 165 L 145 165 L 165 180 L 235 180" stroke="#cbd5e1" strokeWidth="1.8" fill="none" />
          <circle cx="105" cy="165" r="2.5" fill="#e2e8f0" />
          <circle cx="235" cy="180" r="2.5" fill="#38bdf8" />

          {/* Trace Bus 3 */}
          <path d="M 90 180 L 135 180 L 150 195 L 225 195" stroke="#94a3b8" strokeWidth="1.8" fill="none" />
          <circle cx="90" cy="180" r="2.5" fill="#e2e8f0" />

          {/* Trace Bus 4 */}
          <path d="M 115 195 L 140 195 L 155 210 L 195 210" stroke="#cbd5e1" strokeWidth="1.8" fill="none" />
          <circle cx="115" cy="195" r="2.5" fill="#e2e8f0" />

          {/* Trace Bus 5 (Temple & Cheek) */}
          <path d="M 130 210 L 160 210 L 175 225 L 245 225" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <circle cx="130" cy="210" r="2.5" fill="#e2e8f0" />
          <circle cx="245" cy="225" r="2.5" fill="#38bdf8" />

          {/* Trace Bus 6 */}
          <path d="M 120 225 L 150 225 L 170 240 L 230 240" stroke="#94a3b8" strokeWidth="1.8" fill="none" />
          <circle cx="120" cy="225" r="2.5" fill="#e2e8f0" />

          {/* Trace Bus 7 (Jawline) */}
          <path d="M 135 240 L 165 240 L 180 255 L 250 255" stroke="#cbd5e1" strokeWidth="1.8" fill="none" />
          <circle cx="135" cy="240" r="2.5" fill="#e2e8f0" />
          <circle cx="250" cy="255" r="2.5" fill="#38bdf8" />

          {/* Trace Bus 8 (Lower Jaw & Chin) */}
          <path d="M 150 255 L 180 255 L 195 270 L 240 270" stroke="#94a3b8" strokeWidth="1.8" fill="none" />
          <circle cx="150" cy="255" r="2.5" fill="#e2e8f0" />

          {/* Trace Bus 9 (Neck Cables) */}
          <path d="M 140 270 L 170 270 L 185 285 L 225 285" stroke="#cbd5e1" strokeWidth="1.8" fill="none" />
          <circle cx="140" cy="270" r="2.5" fill="#e2e8f0" />

          {/* Trace Bus 10 */}
          <path d="M 125 285 L 160 285 L 175 300 L 215 300" stroke="#94a3b8" strokeWidth="1.8" fill="none" />
          <circle cx="125" cy="285" r="2.5" fill="#e2e8f0" />

          {/* Low Frequency Floating Nodes */}
          <path d="M 110 300 L 145 300 L 160 315 L 205 315" stroke="#cbd5e1" strokeWidth="1.8" fill="none" />
          <circle cx="110" cy="300" r="2.5" fill="#e2e8f0" />
          <circle cx="205" cy="315" r="2.5" fill="#38bdf8" />

          <path d="M 100 315 L 130 315 L 145 330 L 180 330" stroke="#64748b" strokeWidth="1.8" fill="none" />
          <circle cx="100" cy="315" r="2.5" fill="#94a3b8" />
        </g>
      </svg>
    </div>
  );
};

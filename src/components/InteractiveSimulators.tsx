import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Activity, Sun, Orbit, Satellite, Flame } from 'lucide-react';

// 1. Exoplanet Transit Light Curve Simulator
export const TransitSimulator: React.FC = () => {
  const [planetRadius, setPlanetRadius] = useState<number>(1.8); // Earth radii
  const [orbitalPeriod, setOrbitalPeriod] = useState<number>(3.5); // days
  const [transitPhase, setTransitPhase] = useState<number>(50); // 0 to 100%

  // Compute depth: proportional to (Rp/Rstar)^2
  const depthPpm = Math.round(Math.pow(planetRadius / 10, 2) * 10000);
  const isTransiting = transitPhase > 35 && transitPhase < 65;
  const currentDip = isTransiting
    ? (1 - Math.cos(((transitPhase - 50) / 15) * Math.PI)) * 0.5 * (depthPpm / 1000)
    : 0;

  return (
    <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 text-xs font-mono space-y-4">
      <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
        <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
          <Activity className="w-3.5 h-3.5" />
          TRANSIT LIGHT CURVE SIMULATOR
        </span>
        <span className="text-amber-400">{depthPpm} PPM DIP</span>
      </div>

      {/* SVG Light Curve Graph */}
      <div className="relative h-24 w-full bg-[#05080f] rounded-lg border border-slate-800/80 p-2 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Relative Flux: 1.000</span>
          <span>Target: Kepler-442b analog</span>
        </div>

        {/* Dynamic Light Curve Wave */}
        <svg viewBox="0 0 300 80" className="w-full h-14 overflow-visible">
          {/* Baseline Grid */}
          <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

          {/* Light curve path with transit dip */}
          <path
            d={`M 0 20 L 105 20 Q 150 ${20 + Math.min(48, currentDip * 4)} 195 20 L 300 20`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Current transit cursor */}
          <circle
            cx={transitPhase * 3}
            cy={20 + (isTransiting ? Math.min(48, currentDip * 4) : 0)}
            r="4"
            fill="#f59e0b"
          />
        </svg>

        <div className="flex justify-between text-[10px] text-slate-500">
          <span>T - 12h</span>
          <span className="text-cyan-400">Mid-Transit (T0)</span>
          <span>T + 12h</span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-2.5">
        <div>
          <div className="flex justify-between text-[11px] text-slate-300 mb-1">
            <span>Exoplanet Radius:</span>
            <span className="text-cyan-400 font-bold">{planetRadius} R⊕ (Earth Radii)</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="4.0"
            step="0.1"
            value={planetRadius}
            onChange={(e) => setPlanetRadius(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-slate-300 mb-1">
            <span>Transit Phase Scrub:</span>
            <span className="text-amber-400">{transitPhase}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={transitPhase}
            onChange={(e) => setTransitPhase(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>
      </div>
    </div>
  );
};

// 2. Solar Flare Telemetry Simulator
export const SolarFlareSimulator: React.FC = () => {
  const [flareClass, setFlareClass] = useState<'C' | 'M' | 'X'>('M');
  const [activeAlert, setActiveAlert] = useState(false);

  const fluxValues = {
    C: { label: 'Class C4.2 (Moderate)', flux: '4.2 × 10⁻⁶ W/m²', impact: 'Minimal Ionospheric Drift', color: 'text-emerald-400', bar: 'w-1/3 bg-emerald-500' },
    M: { label: 'Class M7.8 (Strong)', flux: '7.8 × 10⁻⁵ W/m²', impact: 'Brief High-Frequency Radio Blackout', color: 'text-amber-400', bar: 'w-2/3 bg-amber-500' },
    X: { label: 'Class X2.4 (Severe)', flux: '2.4 × 10⁻⁴ W/m²', impact: 'Major Satellite Telemetry Degrade', color: 'text-rose-400', bar: 'w-full bg-rose-500' },
  };

  const current = fluxValues[flareClass];

  return (
    <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 text-xs font-mono space-y-4">
      <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
        <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <Sun className="w-3.5 h-3.5" />
          SDO AIA 193Å SOLAR WIND TELEMETRY
        </span>
        <span className={current.color}>{flareClass}-CLASS FLUX</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(['C', 'M', 'X'] as const).map((cls) => (
          <button
            key={cls}
            onClick={() => {
              setFlareClass(cls);
              setActiveAlert(cls === 'X');
            }}
            className={`py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
              flareClass === cls
                ? 'bg-amber-950/40 border-amber-500 text-white font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cls}-Class
          </button>
        ))}
      </div>

      <div className="p-3 bg-[#05080f] rounded-lg border border-slate-800 space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-400">Peak X-Ray Flux:</span>
          <span className="text-white font-semibold">{current.flux}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Ionospheric Effect:</span>
          <span className={current.color}>{current.impact}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
          <div className={`h-full ${current.bar} transition-all duration-300`} />
        </div>
      </div>
    </div>
  );
};

// 3. Lunar South Pole Hazard & Slope Radar
export const LunarSlopeSimulator: React.FC = () => {
  const [roverAngle, setRoverAngle] = useState<number>(11); // degrees slope
  const isSafe = roverAngle <= 15;

  return (
    <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 text-xs font-mono space-y-4">
      <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
        <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
          <Orbit className="w-3.5 h-3.5" />
          LRO LOLA TRAVERSABILITY GRAPH
        </span>
        <span className={isSafe ? 'text-emerald-400' : 'text-rose-400'}>
          {isSafe ? 'TRAVERSABLE' : 'HAZARD WARNING'}
        </span>
      </div>

      {/* Slope Pitch Indicator */}
      <div className="relative h-20 bg-[#05080f] rounded-lg border border-slate-800 p-3 flex items-center justify-center overflow-hidden">
        {/* Horizon tilt line */}
        <div
          className="w-48 h-1 bg-cyan-400/80 rounded transition-transform duration-200 shadow-md shadow-cyan-500/20"
          style={{ transform: `rotate(${-roverAngle}deg)` }}
        />
        <div className="absolute text-[11px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
          Incline: {roverAngle}° / 15° Max
        </div>
      </div>

      <div>
        <div className="flex justify-between text-[11px] text-slate-300 mb-1">
          <span>Regolith Slope Incline:</span>
          <span className={isSafe ? 'text-cyan-400' : 'text-rose-400'}>
            {roverAngle}° Grade
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="28"
          value={roverAngle}
          onChange={(e) => setRoverAngle(parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>
    </div>
  );
};

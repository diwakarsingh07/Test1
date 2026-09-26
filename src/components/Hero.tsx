import React from 'react';
import { ArrowDown, Flame, Compass, Sparkles, Orbit, Radio, ShieldCheck } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface HeroProps {
  customLogoUrl: string | null;
  onOpenLogoModal: () => void;
  daysRemaining: number;
}

export const Hero: React.FC<HeroProps> = ({
  customLogoUrl,
  onOpenLogoModal,
  daysRemaining,
}) => {
  return (
    <section id="mission" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quiet, unboxed metadata kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-6 tracking-wide">
          <span>NASA SPACE APPS CHALLENGE 2026</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span>OFFICIAL PROJECT LAUNCHPAD</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="text-amber-400 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            STAGING PORTAL
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              TEAM{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400">
                PROTHEMUS
              </span>
              <br />
              <span className="text-2xl sm:text-4xl xl:text-5xl font-light text-slate-300">
                Igniting the Fire of Discovery
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              We are preparing our submission for the world’s largest annual space & science hackathon.
              Leveraging open NASA telemetry, Earth observation fleets, and astrodynamic algorithms,
              our project will be deployed and revealed here on <strong className="text-white font-medium">November 14, 2026</strong>.
            </p>

            {/* Unboxed Metadata Metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Target: 14 Nov 2026</span>
              </div>
              <span className="text-slate-700" aria-hidden="true">/</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Sprint Window: 48 Hours</span>
              </div>
              <span className="text-slate-700" aria-hidden="true">/</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Payload: Open Science</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#countdown"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm rounded-lg shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                <span>Launch Countdown</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#showcase"
                className="px-6 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-medium rounded-lg transition-all"
              >
                Explore Project Labs
              </a>

              <button
                onClick={onOpenLogoModal}
                className="px-4 py-3 text-xs font-mono text-amber-300 hover:text-amber-200 bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/30 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{customLogoUrl ? 'Manage Logo' : 'Upload Team Logo'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Insignia & Telemetry Stage */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md p-8 rounded-2xl bg-gradient-to-b from-[#0b1120] to-[#070b14] border border-slate-800/90 shadow-2xl relative group">
              
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Orbit className="w-4 h-4 text-cyan-400" />
                  <span>MISSION EMBLEM</span>
                </div>
                <span className="text-amber-400">T-{daysRemaining} DAYS</span>
              </div>

              {/* Insignia Centerpiece */}
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="relative">
                  {/* Subtle pulsing concentric ring */}
                  <div className="absolute -inset-4 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '40s' }} />
                  <div className="absolute -inset-8 rounded-full border border-dashed border-amber-500/10 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
                  
                  <TeamLogo
                    customLogoUrl={customLogoUrl}
                    size="xl"
                    withGlow
                    className="relative z-10"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-white tracking-wide uppercase">
                  Team Prothemus
                </h3>
                <p className="mt-1 text-xs text-slate-400 font-mono">
                  {customLogoUrl ? 'Custom Team Insignia Loaded' : 'Official Promethean Flame Crest'}
                </p>

                {/* Logo Action Trigger */}
                <button
                  onClick={onOpenLogoModal}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline underline-offset-4 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{customLogoUrl ? 'Replace or reset logo' : 'Drop your team logo here'}</span>
                </button>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>SECTOR: GLOBAL</span>
                <span>STATUS: STAGED</span>
                <span>CHALLENGE: 2026</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

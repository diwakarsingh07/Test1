import React, { useState, useEffect } from 'react';
import { Sparkles, Radio, Calendar, Menu, X, ArrowUpRight } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface HeaderProps {
  customLogoUrl: string | null;
  onOpenLogoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ customLogoUrl, onOpenLogoModal }) => {
  const [utcTime, setUtcTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toISOString().substring(11, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#05070c]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand & Crest */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={onOpenLogoModal}
              title="Click to change or inspect team insignia"
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
            >
              <TeamLogo
                customLogoUrl={customLogoUrl}
                size="md"
                className="group-hover:border-cyan-400 transition-colors"
              />
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white uppercase">
                  Team Prothemus
                </span>
                <span className="text-slate-600" aria-hidden="true">/</span>
                <span className="text-xs font-mono text-cyan-400 tracking-wider">
                  2026
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono tracking-tight">
                <span>NASA Space Apps Challenge</span>
                <span aria-hidden="true">·</span>
                <span>Nov 14 Launch</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links (Clean unboxed text with hover underline) */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a
              href="#mission"
              className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-cyan-400"
            >
              Mission Brief
            </a>
            <a
              href="#countdown"
              className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-cyan-400"
            >
              Launch Clock
            </a>
            <a
              href="#showcase"
              className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-cyan-400"
            >
              Project Labs
            </a>
            <a
              href="#manifest"
              className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-cyan-400"
            >
              Crew Roster
            </a>
            <a
              href="#dispatch"
              className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-cyan-400"
            >
              Alerts
            </a>
          </nav>

          {/* Right Action & Orbital Telemetry */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live Clock */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{utcTime || '00:00:00 UTC'}</span>
            </div>

            <button
              onClick={onOpenLogoModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{customLogoUrl ? 'Change Logo' : 'Upload Logo'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenLogoModal}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/70 border border-slate-700/70 rounded-lg"
              title="Logo settings"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#070a12] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Clock: {utcTime}</span>
          </div>
          <a
            href="#mission"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-200 hover:text-cyan-400 py-1"
          >
            Mission Brief
          </a>
          <a
            href="#countdown"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-200 hover:text-cyan-400 py-1"
          >
            Launch Clock & Countdown
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-200 hover:text-cyan-400 py-1"
          >
            Project Labs & Concepts
          </a>
          <a
            href="#manifest"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-200 hover:text-cyan-400 py-1"
          >
            Crew Roster
          </a>
          <a
            href="#dispatch"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-200 hover:text-cyan-400 py-1"
          >
            Mission Alerts & Transmission
          </a>
        </div>
      )}
    </header>
  );
};

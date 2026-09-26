import React from 'react';
import { ExternalLink, Sparkles, Heart } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface FooterProps {
  customLogoUrl: string | null;
  onOpenLogoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ customLogoUrl, onOpenLogoModal }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#04060a] text-slate-400 text-xs font-mono py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-800/60">
          
          <div className="flex items-center gap-3">
            <TeamLogo customLogoUrl={customLogoUrl} size="sm" />
            <div>
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <span>TEAM PROTHEMUS</span>
                <span className="text-slate-600" aria-hidden="true">/</span>
                <span className="text-cyan-400 text-xs font-normal">NASA SPACE APPS 2026</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Staged for global hackathon launch on November 14, 2026
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a
              href="https://www.spaceappschallenge.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>NASA Space Apps Official</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>

            <a
              href="https://data.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>NASA Open Data Portal</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>

            <button
              onClick={onOpenLogoModal}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Logo Manager</span>
            </button>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Team Prothemus. Built for the NASA International Space Apps Challenge.
          </div>

          <div className="flex items-center gap-2">
            <span>Open Science</span>
            <span aria-hidden="true">·</span>
            <span>Planetary Data</span>
            <span aria-hidden="true">·</span>
            <span>Launch Date: 14 Nov 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Send, CheckCircle2, Radio, Copy, Check, Share2, Bell } from 'lucide-react';

export const MissionDispatch: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transmissionCode, setTransmissionCode] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    const code = `PROTHEMUS-${Math.floor(1000 + Math.random() * 9000)}-ALPHA`;
    setTransmissionCode(code);
    setIsSubmitted(true);

    // Save to local storage
    const existing = JSON.parse(localStorage.getItem('prothemus_subscribers') || '[]');
    existing.push({ email, code, timestamp: new Date().toISOString() });
    localStorage.setItem('prothemus_subscribers', JSON.stringify(existing));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="dispatch" className="py-24 border-t border-slate-800/80 bg-[#05070c] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0c1326] to-[#070b14] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          
          {/* Subtle cosmic accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-amber-400 to-cyan-500" />

          <div className="text-center max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>ORBITAL TRANSMISSION DISPATCH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Get Notified When We Deploy
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Subscribe to receive the live link and release notes when Team Prothemus launches its final project at the NASA Space Apps Challenge 2026 on <strong className="text-white">November 14</strong>.
            </p>
          </div>

          {/* Form */}
          <div className="mt-8 max-w-md mx-auto">
            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#090f1d] border border-emerald-500/40 text-center space-y-3 font-mono">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide uppercase">
                  Telemetry Channel Established
                </h4>
                <p className="text-xs text-slate-300">
                  Notification confirmed for: <span className="text-cyan-300">{email}</span>
                </p>
                <div className="p-2.5 bg-black/40 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                  TRANSMISSION ID: <span className="text-amber-400 font-bold">{transmissionCode}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 cursor-pointer pt-1"
                >
                  Register another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="astronaut@agency.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-[#070b14] border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder-slate-500 rounded-xl focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Notify Me</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] font-mono text-slate-500 text-center">
                  Zero spam · Strictly mission launch alerts & open-source repository release
                </p>
              </form>
            )}
          </div>

          {/* Quick Share Link */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Mission Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy Mission URL</span>
                </>
              )}
            </button>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                'Tracking Team Prothemus for NASA Space Apps Challenge 2026! Hackathon kickoff on Nov 14, 2026: '
              )}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Share on X</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

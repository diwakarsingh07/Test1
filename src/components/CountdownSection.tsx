import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, CheckCircle2, ChevronRight, Globe, BellRing } from 'lucide-react';
import { MISSION_MILESTONES } from '../data/mockData';
import { CountdownTime } from '../types';

interface CountdownSectionProps {
  onCountdownUpdate?: (time: CountdownTime) => void;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ onCountdownUpdate }) => {
  // Target: November 14, 2026 00:00:00 UTC
  const targetDateUtc = new Date(Date.UTC(2026, 10, 14, 0, 0, 0)); // Month index 10 is November
  // Reference start for progress calculation (October 1, 2026)
  const startDate = new Date(Date.UTC(2026, 9, 1, 0, 0, 0));

  const [useUtc, setUseUtc] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const calculateTime = (): CountdownTime => {
    const now = new Date();
    const diff = targetDateUtc.getTime() - now.getTime();

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        progressPercent: 100,
        isLaunched: true,
      };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const totalSpan = targetDateUtc.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    const progressPercent = Math.min(100, Math.max(0, (elapsed / totalSpan) * 100));

    return {
      days,
      hours,
      minutes,
      seconds,
      totalSeconds,
      progressPercent,
      isLaunched: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTime();
      setTimeLeft(updated);
      if (onCountdownUpdate) {
        onCountdownUpdate(updated);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Generate ICS calendar event
  const handleDownloadCalendar = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Team Prothemus//NASA Space Apps 2026//EN',
      'BEGIN:VEVENT',
      'UID:nasa-space-apps-2026-prothemus',
      'DTSTAMP:20260926T000000Z',
      'DTSTART:20261114T000000Z',
      'DTEND:20261116T235959Z',
      'SUMMARY:NASA Space Apps Challenge 2026 - Hackathon Launch',
      'DESCRIPTION:Global 48-hour hackathon kickoff. Team Prothemus deploying space science project.',
      'LOCATION:Global / Online',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'nasa-space-apps-2026-launch.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Google Calendar link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'NASA Space Apps Challenge 2026 — Team Prothemus'
  )}&dates=20261114T000000Z/20261116T235959Z&details=${encodeURIComponent(
    'Official hackathon kickoff for NASA Space Apps Challenge 2026. Staged by Team Prothemus.'
  )}&location=Global`;

  return (
    <section id="countdown" className="py-20 border-t border-slate-800/80 bg-[#06080e]/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <span>ORBITAL COUNTDOWN</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>14 NOVEMBER 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Mission Launch Clock
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Synchronized global countdown to the commencement of the 48-hour NASA Space Apps Challenge hackathon.
            </p>
          </div>

          {/* Timezone switcher */}
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
              <button
                type="button"
                onClick={() => setUseUtc(true)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  useUtc ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                UTC Clock
              </button>
              <button
                type="button"
                onClick={() => setUseUtc(false)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  !useUtc ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Local System Time
              </button>
            </div>
          </div>
        </div>

        {/* High-Contrast Countdown Digits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Days */}
          <div className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0c1222] to-[#070b14] border border-slate-800 shadow-xl text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
            <div className="text-5xl sm:text-7xl lg:text-8xl font-bold font-mono text-white tracking-tight tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase">
              Days
            </div>
            <div className="mt-1 text-[11px] text-slate-500 font-mono">
              ~{(timeLeft.days / 7).toFixed(1)} WEEKS
            </div>
          </div>

          {/* Hours */}
          <div className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0c1222] to-[#070b14] border border-slate-800 shadow-xl text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
            <div className="text-5xl sm:text-7xl lg:text-8xl font-bold font-mono text-white tracking-tight tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase">
              Hours
            </div>
            <div className="mt-1 text-[11px] text-slate-500 font-mono">
              24-HR CYCLE
            </div>
          </div>

          {/* Minutes */}
          <div className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0c1222] to-[#070b14] border border-slate-800 shadow-xl text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />
            <div className="text-5xl sm:text-7xl lg:text-8xl font-bold font-mono text-white tracking-tight tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-amber-400 uppercase">
              Minutes
            </div>
            <div className="mt-1 text-[11px] text-slate-500 font-mono">
              PRECISION
            </div>
          </div>

          {/* Seconds */}
          <div className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0c1222] to-[#070b14] border border-slate-800 shadow-xl text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />
            <div className="text-5xl sm:text-7xl lg:text-8xl font-bold font-mono text-amber-400 tracking-tight tabular-nums animate-pulse">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-amber-400 uppercase">
              Seconds
            </div>
            <div className="mt-1 text-[11px] text-slate-500 font-mono">
              HEARTBEAT
            </div>
          </div>

        </div>

        {/* Progress Metric & Staging Status */}
        <div className="mt-8 p-6 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>ORBITAL TRAJECTORY PROGRESS TO HACKATHON</span>
            </div>
            <span className="text-cyan-300 font-semibold">{timeLeft.progressPercent.toFixed(1)}% COMPLETE</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-cyan-400 transition-all duration-1000"
              style={{ width: `${Math.max(5, timeLeft.progressPercent)}%` }}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  Target:{' '}
                  {useUtc
                    ? targetDateUtc.toUTCString()
                    : targetDateUtc.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                title="Download .ics file for Apple Calendar, Outlook, etc."
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Download .ICS</span>
              </button>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                title="Add event to Google Calendar"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Calendar</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mission Milestones Track */}
        <div className="mt-14">
          <div className="text-xs font-mono text-cyan-400 mb-1">ROADMAP TO LAUNCH</div>
          <h3 className="text-xl font-bold text-white mb-6">Mission Milestones & Preparation</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {MISSION_MILESTONES.map((milestone, idx) => (
              <div
                key={milestone.id}
                className={`p-5 rounded-xl border transition-all ${
                  milestone.status === 'completed'
                    ? 'bg-slate-900/40 border-slate-800/90 text-slate-400'
                    : milestone.status === 'current'
                    ? 'bg-gradient-to-b from-cyan-950/30 to-slate-900/60 border-cyan-500/50 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-900/20 border-slate-800/60 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-slate-400 font-semibold">{milestone.date}</span>
                  {milestone.status === 'completed' && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      DONE
                    </span>
                  )}
                  {milestone.status === 'current' && (
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      ACTIVE
                    </span>
                  )}
                  {milestone.status === 'upcoming' && (
                    <span className="text-slate-500">T-MINUS</span>
                  )}
                </div>

                <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
                  {idx + 1}. {milestone.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

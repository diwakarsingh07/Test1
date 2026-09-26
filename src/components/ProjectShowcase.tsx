import React, { useState } from 'react';
import { ExternalLink, Database, Cpu, Layers, ArrowUpRight, X, Sparkles, Filter } from 'lucide-react';
import { INITIAL_CHALLENGE_TRACKS } from '../data/mockData';
import { ChallengeTrack, ChallengeCategory } from '../types';
import { TransitSimulator, SolarFlareSimulator, LunarSlopeSimulator } from './InteractiveSimulators';

export const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory>('all');
  const [activeModalTrack, setActiveModalTrack] = useState<ChallengeTrack | null>(null);

  const filteredTracks = selectedCategory === 'all'
    ? INITIAL_CHALLENGE_TRACKS
    : INITIAL_CHALLENGE_TRACKS.filter((t) => t.category === selectedCategory);

  const filterTabs: Array<{ id: ChallengeCategory; label: string }> = [
    { id: 'all', label: 'All Mission Tracks' },
    { id: 'planetary', label: 'Exoplanets & Astrobiology' },
    { id: 'deepspace', label: 'Heliophysics & Solar' },
    { id: 'climate', label: 'Earth & Climate' },
    { id: 'orbital', label: 'Lunar & Artemis' },
  ];

  return (
    <section id="showcase" className="py-24 border-t border-slate-800/80 bg-[#05070c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <span>PROJECT LABS & ARCHITECTURE</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>NASA SPACE APPS 2026 STAGING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Interactive Mission Showcase
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Team Prothemus is prototyping open-science solutions across four primary NASA challenge tracks. Test the real-time simulation previews and inspect the target data architectures below.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs font-mono text-slate-500">
            SHOWING {filteredTracks.length} OF {INITIAL_CHALLENGE_TRACKS.length} LAB CONCEPTS
          </div>
        </div>

        {/* Filter Segmented Control (Buttons, functional) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto mb-10 max-w-fit">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Concept Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTracks.map((track) => (
            <div
              key={track.id}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0a0f1d] to-[#070b14] border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all duration-200"
            >
              <div>
                {/* Clean unboxed category header */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800/70">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-semibold">{track.trackCode}</span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span>{track.categoryLabel}</span>
                  </div>
                  <span className="text-amber-400/90">{track.status}</span>
                </div>

                {/* Title & Tagline */}
                <h3 className="mt-4 text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {track.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 font-normal leading-relaxed">
                  {track.tagline}
                </p>

                {/* Problem Statement snippet */}
                <p className="mt-3 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {track.problemBrief}
                </p>

                {/* NASA Open Datasets (Clean text list with separators, no pills) */}
                <div className="mt-5 pt-4 border-t border-slate-800/70">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Target NASA Open Datasets:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 font-mono">
                    {track.nasaDatasets.map((ds, i) => (
                      <React.Fragment key={ds}>
                        <span className="hover:text-cyan-300 transition-colors">{ds}</span>
                        {i < track.nasaDatasets.length - 1 && (
                          <span className="text-slate-600" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Embedded Interactive Telemetry Simulator Widget */}
                <div className="mt-6">
                  {track.previewType === 'transit' && <TransitSimulator />}
                  {track.previewType === 'solar' && <SolarFlareSimulator />}
                  {track.previewType === 'orbit' && <LunarSlopeSimulator />}
                  {track.previewType === 'spectral' && <TransitSimulator />}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400">
                  <span className="text-slate-500">{track.featuredMetric.label}:</span>{' '}
                  <span className="text-cyan-400 font-semibold">{track.featuredMetric.value}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalTrack(track)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Architecture Deep Dive</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Architecture Deep Dive */}
        {activeModalTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#090d18] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                    <span>{activeModalTrack.trackCode}</span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span>{activeModalTrack.categoryLabel}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {activeModalTrack.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalTrack(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6 text-sm text-slate-300">
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Challenge Problem Statement
                  </h4>
                  <p className="leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    {activeModalTrack.problemBrief}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Proposed Team Prothemus Architecture
                  </h4>
                  <p className="leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    {activeModalTrack.proposedSolution}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Integrated NASA Open Data Sources
                  </h4>
                  <ul className="space-y-2">
                    {activeModalTrack.nasaDatasets.map((ds) => (
                      <li key={ds} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{ds}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Technical Stack & Algorithms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalTrack.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 border border-slate-700/80 rounded text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveModalTrack(null)}
                  className="px-5 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Close Specification
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

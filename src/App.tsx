/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CountdownSection } from './components/CountdownSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CrewManifest } from './components/CrewManifest';
import { MissionDispatch } from './components/MissionDispatch';
import { Footer } from './components/Footer';
import { LogoUploadModal } from './components/LogoUploadModal';
import { CountdownTime } from './types';

export default function App() {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('team_prothemus_custom_logo');
  });
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number>(49);

  // Target: November 14, 2026 UTC
  useEffect(() => {
    const targetDateUtc = new Date(Date.UTC(2026, 10, 14, 0, 0, 0));
    const now = new Date();
    const diff = targetDateUtc.getTime() - now.getTime();
    if (diff > 0) {
      setDaysRemaining(Math.ceil(diff / (1000 * 3600 * 24)));
    } else {
      setDaysRemaining(0);
    }
  }, []);

  const handleSaveLogo = (url: string | null, name: string) => {
    if (url) {
      localStorage.setItem('team_prothemus_custom_logo', url);
      setCustomLogoUrl(url);
    } else {
      localStorage.removeItem('team_prothemus_custom_logo');
      setCustomLogoUrl(null);
    }
  };

  const handleCountdownUpdate = (time: CountdownTime) => {
    setDaysRemaining(time.days);
  };

  return (
    <div className="relative min-h-screen bg-[#05070c] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Starfield Canvas Background */}
      <CosmicBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Header
          customLogoUrl={customLogoUrl}
          onOpenLogoModal={() => setIsLogoModalOpen(true)}
        />

        {/* Main Content Flows */}
        <main className="flex-1">
          {/* Hero & Mission Briefing */}
          <Hero
            customLogoUrl={customLogoUrl}
            onOpenLogoModal={() => setIsLogoModalOpen(true)}
            daysRemaining={daysRemaining}
          />

          {/* Launch Countdown to Nov 14, 2026 */}
          <CountdownSection onCountdownUpdate={handleCountdownUpdate} />

          {/* Interactive Project Showcase & Innovation Gallery */}
          <ProjectShowcase />

          {/* Crew Manifest & Team Roster */}
          <CrewManifest />

          {/* Mission Dispatch & Notification Terminal */}
          <MissionDispatch />
        </main>

        {/* Footer */}
        <Footer
          customLogoUrl={customLogoUrl}
          onOpenLogoModal={() => setIsLogoModalOpen(true)}
        />

        {/* Modal for Uploading and Inspecting Team Logo */}
        <LogoUploadModal
          isOpen={isLogoModalOpen}
          onClose={() => setIsLogoModalOpen(false)}
          customLogoUrl={customLogoUrl}
          onSaveLogo={handleSaveLogo}
        />
      </div>
    </div>
  );
}

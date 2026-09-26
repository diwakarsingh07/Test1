# 🚀 Team Prothemus — NASA Space Apps Challenge 2026

[![NASA Space Apps Challenge](https://img.shields.io/badge/NASA-Space%20Apps%20Challenge%202026-blue.svg?logo=nasa&logoColor=white)](https://www.spaceappschallenge.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Official coming soon web portal, countdown telemetry station, and interactive project showcase for **Team Prothemus** participating in the **NASA International Space Apps Challenge 2026** (Launching November 14, 2026).

---

## 🌌 Overview

Team Prothemus is preparing for the NASA Space Apps Challenge 2026, focusing on open space science datasets, planetary habitability analytics, orbital solar flare early-warning telemetry, and autonomous lunar exploration algorithms.

This web application serves as our public mission portal featuring:
- **Mission Countdown**: Synchronized live launch clock targeting November 14, 2026 with calendar event (.ics) export.
- **Interactive Project Showcase**: Pre-hackathon concept labs across planetary science, solar physics, climate modeling, and rover robotics with interactive telemetry simulations.
- **Dynamic Team Crest & Logo Stage**: High-contrast cybernetic insignia with integrated drag-and-drop custom logo upload and persistence.
- **Mission Manifest**: Team roster management and mission roadmap.
- **Alert Dispatch**: Real-time launch alert dispatch terminal with client persistence.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Motion](https://motion.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)

---

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/team-prothemus-nasa-spaceapps-2026.git
cd team-prothemus-nasa-spaceapps-2026
```

### 2. Install Dependencies
```bash
npm install
# or
bun install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` or the port displayed in your terminal.

### 4. Build for Production
```bash
npm run build
```
Production assets will be output to the `/dist` directory, ready to deploy to GitHub Pages, Vercel, Netlify, or Cloud Run.

---

## 📂 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/         # Modular UI components
│   │   ├── CosmicBackground.tsx    # Interactive celestial particle canvas
│   │   ├── CountdownSection.tsx    # Live countdown clock & calendar generator
│   │   ├── CrewManifest.tsx        # Team roster with editable member profiles
│   │   ├── Footer.tsx              # Space Apps credentials & resource links
│   │   ├── Header.tsx              # Mission navigation & orbital clock
│   │   ├── Hero.tsx                # Mission brief & insignia showcase
│   │   ├── InteractiveSimulators.tsx # Interactive exoplanet & solar telemetry
│   │   ├── LogoUploadModal.tsx     # Custom logo upload & preview manager
│   │   ├── MissionDispatch.tsx     # Launch alert transmission terminal
│   │   ├── ProjectShowcase.tsx     # Filterable challenge tracks & modals
│   │   └── TeamLogo.tsx            # Cybernetic circuit emblem component
│   ├── data/
│   │   └── mockData.ts             # Challenge tracks, milestones, and crew data
│   ├── types.ts                    # TypeScript definitions
│   ├── App.tsx                     # Main application layout
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global Tailwind CSS directives
├── index.html                      # SEO metadata & page shell
├── metadata.json                   # Applet configuration
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite build configuration
```

---

## 🛰️ NASA Space Apps Challenge Details

- **Event**: NASA International Space Apps Challenge 2026
- **Global Hackathon Kickoff**: November 14, 2026 (00:00 UTC)
- **Duration**: 48-Hour Global Collaborative Sprint
- **Team**: Team Prothemus
- **Official Portal**: [spaceappschallenge.org](https://www.spaceappschallenge.org/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

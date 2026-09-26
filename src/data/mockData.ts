import { ChallengeTrack, TeamMember, Milestone } from '../types';

export const INITIAL_CHALLENGE_TRACKS: ChallengeTrack[] = [
  {
    id: 'exoplanet-transit',
    trackCode: 'EXO-2026-T1',
    title: 'Exoplanet Transit Light Curve & Biosignature Analyzer',
    category: 'planetary',
    categoryLabel: 'Exoplanetary Science',
    tagline: 'Detecting habitable atmospheres through stellar flux perturbation signatures.',
    problemBrief: 'Thousands of candidate exoplanets lurk in uncurated stellar photometry from TESS and Kepler. Identifying rare habitable-zone terrestrial worlds requires distinguishing minute planetary transits from stellar pulsations, starspots, and instrumental drift.',
    proposedSolution: 'An open-source interactive WebGL light-curve folding engine with integrated Fourier detrending and deep convolutional transit vetting, allowing researchers to simulate atmospheric transmission spectra in real time.',
    nasaDatasets: [
      'NASA Exoplanet Archive (Caltech/IPAC)',
      'TESS 2-Minute Cadence SPOC Light Curves',
      'Kepler Q1-Q17 Stellar Flux Records',
      'JWST Transmission Spectroscopy Benchmark'
    ],
    techStack: ['TypeScript', 'WebGL Shader Canvas', 'NumPy/SciPy Wasm', 'Tailwind CSS'],
    previewType: 'transit',
    status: 'Primary Shortlist',
    featuredMetric: {
      label: 'Detection Threshold',
      value: '18 ppm flux dip'
    }
  },
  {
    id: 'solar-weather',
    trackCode: 'HELIOS-2026-S4',
    title: 'Heliosphere Solar Flare & Geomagnetic Disturbance Early Warning',
    category: 'deepspace',
    categoryLabel: 'Space Weather',
    tagline: 'Predicting coronal mass ejections before they impact orbital satellites and grids.',
    problemBrief: 'Extreme solar events can sever satellite telemetry, degrade GPS constellations, and endanger astronauts aboard the ISS and upcoming Artemis missions. Current warning windows often leave mission controllers with fewer than 30 minutes of actionable forewarning.',
    proposedSolution: 'A multi-spectral magnetogram stream processor that detects flare eruption vectors at extreme ultraviolet wavelengths (SDO 193Å and 131Å) to provide probabilistic 12-hour geomagnetic storm trajectories.',
    nasaDatasets: [
      'NASA Solar Dynamics Observatory (SDO/AIA)',
      'SOHO LASCO Coronagraph Telemetry',
      'NOAA SWPC Real-Time Solar Wind (RTSW)',
      'ACE & DSCOVR Magnetometer Streams'
    ],
    techStack: ['React', 'Streaming Telemetry Visualizer', 'Vector Math', 'WebAudio Alert System'],
    previewType: 'solar',
    status: 'In Active Exploration',
    featuredMetric: {
      label: 'Early Warning Window',
      value: '+14.2 Hours'
    }
  },
  {
    id: 'climate-earth-resilience',
    trackCode: 'EARTH-2026-E2',
    title: 'Multi-Sensor Wildfire Spread Vectoring & Thermal Anomaly Grid',
    category: 'climate',
    categoryLabel: 'Earth Observation',
    tagline: 'Combining thermal infrared orbital passes with terrain wind vectors for disaster response.',
    problemBrief: 'Wildfires moving across complex topography frequently jump containment lines due to erratic canopy wind shifts and undetected ember spotting, causing catastrophic loss of life and ecosystems.',
    proposedSolution: 'A near-real-time thermal anomaly vector model that fuses MODIS and VIIRS satellite hotspot pings with global topography and meteorological wind fields, outputting 6-hour dynamic perimeter forecasts.',
    nasaDatasets: [
      'NASA FIRMS (Fire Information for Resource Management)',
      'Landsat 8 & 9 Thermal Infrared Sensor (TIRS)',
      'ECOSTRESS ISS Surface Temperature Radiometer',
      'NASA SRTM Digital Elevation Model 30m'
    ],
    techStack: ['GeoJSON Parser', 'Canvas Heatmap Engine', 'Lucide Vector Icons', 'Fast Data Pipeline'],
    previewType: 'spectral',
    status: 'In Active Exploration',
    featuredMetric: {
      label: 'Spatial Resolution',
      value: '375m VIIRS Fusion'
    }
  },
  {
    id: 'artemis-lunar-nav',
    trackCode: 'LUNA-2026-A3',
    title: 'Autonomous Lunar Surface Traversability & Hazard Avoidance',
    category: 'orbital',
    categoryLabel: 'Artemis & Lunar Systems',
    tagline: 'High-contrast shadow navigation for rovers operating in South Pole permanently shadowed regions.',
    problemBrief: 'The lunar South Pole features extreme low-angle solar illumination, cast shadows hundreds of meters long, and volatile cryogenic regolith traps that can permanently immobilize autonomous scientific rovers.',
    proposedSolution: 'A 3D traversability graph mapper utilizing LOLA laser altimetry and Diviner thermal inertia maps to compute minimum-energy, safe-slope traverse corridors for next-generation lunar exploration vehicles.',
    nasaDatasets: [
      'Lunar Reconnaissance Orbiter LOLA Altimetry Grid',
      'Diviner Lunar Radiometer Experiment Rock Abundance',
      'LROC Narrow Angle Camera Orthomosaic',
      'NASA Artemis VIPER Traverse Test Scenarios'
    ],
    techStack: ['3D Vector Math', 'Elevation Matrix Interpolator', 'Dynamic Waypoints', 'Motion UI'],
    previewType: 'orbit',
    status: 'Architecture Draft',
    featuredMetric: {
      label: 'Slope Tolerance',
      value: '≤ 15° Grade'
    }
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Lead Commander',
    role: 'Flight Director & Full-Stack Architect',
    callsign: 'Prometheus-1',
    bio: 'Overseeing mission telemetry, systems architecture, and web delivery for Team Prothemus. Passionate about open space science and planetary data tools.',
    specialty: 'Distributed Systems & Web Graphics',
    skills: ['TypeScript', 'WebGL', 'API Architecture', 'Mission Planning']
  },
  {
    id: 'member-2',
    name: 'Orbital Specialist',
    role: 'Astrodynamics & Data Engineer',
    callsign: 'Apex-2',
    bio: 'Specializing in satellite orbital mechanics, sensor calibration, and NASA Open Data pipeline integration.',
    specialty: 'Astrodynamics & Python Pipelines',
    skills: ['Orbital Mechanics', 'SciPy', 'NASA APIs', 'Data Cleaning']
  },
  {
    id: 'member-3',
    name: 'Payload Engineer',
    role: 'Planetary Science & Machine Learning',
    callsign: 'Nova-3',
    bio: 'Deep-diving into multispectral imagery, exoplanetary transit vetting, and neural signal classification.',
    specialty: 'Computer Vision & Deep Learning',
    skills: ['PyTorch', 'Spectroscopy', 'Feature Extraction', 'Model Optimization']
  },
  {
    id: 'member-4',
    name: 'Communications Officer',
    role: 'UI/UX & Science Visualizer',
    callsign: 'Radiant-4',
    bio: 'Crafting intuitive telemetry displays, tactile interactive charts, and accessible scientific storytelling.',
    specialty: 'Interactive UI & Data Visualization',
    skills: ['UI/UX Design', 'Design Systems', 'Data Viz', 'Accessibility']
  }
];

export const MISSION_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    date: 'OCTOBER 2026',
    title: 'Squad Commission & Team Prothemus Assembly',
    description: 'Core team formed, mission parameters established, and collaborative developer environment initialized.',
    status: 'completed'
  },
  {
    id: 'm2',
    date: 'EARLY NOVEMBER 2026',
    title: 'NASA Challenge Statements Release & Track Scoping',
    description: 'Deep-dive into official NASA Space Apps 2026 challenge briefs, datasets calibration, and architecture blueprints.',
    status: 'current'
  },
  {
    id: 'm3',
    date: 'NOVEMBER 14, 2026',
    title: 'NASA Space Apps Challenge Global Launch',
    description: '48-hour global sprint begins worldwide. Team Prothemus commences intensive solution build, testing, and deployment.',
    status: 'upcoming'
  },
  {
    id: 'm4',
    date: 'NOVEMBER 16, 2026',
    title: 'Executive Submission & Project Deployment',
    description: 'Final code repository, video presentation, and live production app submission to NASA Global Judges.',
    status: 'upcoming'
  }
];

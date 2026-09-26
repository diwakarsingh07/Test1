export type ChallengeCategory = 'all' | 'planetary' | 'climate' | 'deepspace' | 'orbital';

export interface ChallengeTrack {
  id: string;
  trackCode: string;
  title: string;
  category: ChallengeCategory;
  categoryLabel: string;
  tagline: string;
  problemBrief: string;
  proposedSolution: string;
  nasaDatasets: string[];
  techStack: string[];
  previewType: 'transit' | 'solar' | 'orbit' | 'spectral';
  status: 'In Active Exploration' | 'Primary Shortlist' | 'Architecture Draft';
  featuredMetric: {
    label: string;
    value: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  callsign: string;
  bio: string;
  specialty: string;
  skills: string[];
  github?: string;
  linkedin?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  progressPercent: number;
  isLaunched: boolean;
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface CustomLogoData {
  dataUrl: string;
  fileName: string;
  uploadedAt: string;
}

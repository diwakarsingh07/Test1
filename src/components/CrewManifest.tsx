import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Edit3, Trash2, Check, X, Shield, Terminal, Sparkles, RotateCcw } from 'lucide-react';
import { INITIAL_TEAM_MEMBERS } from '../data/mockData';
import { TeamMember } from '../types';

export const CrewManifest: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('team_prothemus_roster');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_TEAM_MEMBERS;
      }
    }
    return INITIAL_TEAM_MEMBERS;
  });

  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    callsign: '',
    bio: '',
    specialty: '',
    skills: '',
  });

  const saveToStorage = (updated: TeamMember[]) => {
    setTeam(updated);
    localStorage.setItem('team_prothemus_roster', JSON.stringify(updated));
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsAddingNew(false);
    setFormData({
      name: member.name,
      role: member.role,
      callsign: member.callsign,
      bio: member.bio,
      specialty: member.specialty,
      skills: member.skills.join(', '),
    });
  };

  const handleOpenAdd = () => {
    setIsAddingNew(true);
    setEditingMember(null);
    setFormData({
      name: '',
      role: 'Mission Specialist',
      callsign: `Prothemus-${team.length + 1}`,
      bio: 'Team Prothemus payload engineer contributing to NASA Space Apps 2026.',
      specialty: 'Space Science & Engineering',
      skills: 'Python, Git, Data Analysis',
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const skillList = formData.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (isAddingNew) {
      const newMember: TeamMember = {
        id: `member-${Date.now()}`,
        name: formData.name,
        role: formData.role,
        callsign: formData.callsign || `Prothemus-${team.length + 1}`,
        bio: formData.bio,
        specialty: formData.specialty,
        skills: skillList.length > 0 ? skillList : ['Space Systems'],
      };
      saveToStorage([...team, newMember]);
    } else if (editingMember) {
      const updated = team.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              name: formData.name,
              role: formData.role,
              callsign: formData.callsign,
              bio: formData.bio,
              specialty: formData.specialty,
              skills: skillList,
            }
          : m
      );
      saveToStorage(updated);
    }

    setEditingMember(null);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    const updated = team.filter((m) => m.id !== id);
    saveToStorage(updated);
  };

  const handleResetRoster = () => {
    saveToStorage(INITIAL_TEAM_MEMBERS);
  };

  return (
    <section id="manifest" className="py-24 border-t border-slate-800/80 bg-[#06080e]/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <span>CREW MANIFEST</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>TEAM PROTHEMUS FLIGHT COMPLEMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Mission Personnel
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Meet the minds driving Team Prothemus. You can personalize team members, assign mission callsigns, and customize roles.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Teammate</span>
            </button>

            <button
              onClick={handleResetRoster}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Reset roster to default presets"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Crew Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#0a0f1d] to-[#070b14] border border-slate-800 hover:border-slate-700 shadow-xl flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Header Call Sign */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-3 border-b border-slate-800/80">
                  <span className="text-cyan-400 font-semibold">{member.callsign}</span>
                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(member)}
                      className="p-1 text-slate-400 hover:text-cyan-300 rounded cursor-pointer"
                      title="Edit member profile"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {team.length > 1 && (
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 rounded cursor-pointer"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Name & Role (Clean editorial) */}
                <h3 className="mt-4 text-lg font-bold text-white tracking-tight">
                  {member.name}
                </h3>
                <p className="text-xs text-amber-400/90 font-mono mt-0.5">
                  {member.role}
                </p>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed font-normal">
                  {member.bio}
                </p>

                {/* Specialty */}
                <div className="mt-4 pt-3 border-t border-slate-800/70 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500">Core Specialty:</span>{' '}
                  <span className="text-slate-200">{member.specialty}</span>
                </div>
              </div>

              {/* Skills text list with separators */}
              <div className="mt-4 pt-3 border-t border-slate-800/70 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-slate-400">
                {member.skills.map((skill, idx) => (
                  <React.Fragment key={skill}>
                    <span className="text-slate-300">{skill}</span>
                    {idx < member.skills.length - 1 && (
                      <span className="text-slate-600" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Editing or Adding Team Member */}
        {(editingMember || isAddingNew) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-[#090d18] border border-slate-700 rounded-2xl shadow-2xl p-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">
                  {isAddingNew ? 'Add Crew Member' : 'Edit Member Profile'}
                </h3>
                <button
                  onClick={() => {
                    setEditingMember(null);
                    setIsAddingNew(false);
                  }}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveForm} className="mt-4 space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Mission Role</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Lead Astronomer"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Callsign</label>
                    <input
                      type="text"
                      value={formData.callsign}
                      onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                      placeholder="e.g. Prothemus-1"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Core Specialty</label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    placeholder="e.g. Neural Networks & Photometry"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Mission Bio</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Brief background and mission focus..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="Python, Astrodynamics, React, WebGL"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMember(null);
                      setIsAddingNew(false);
                    }}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

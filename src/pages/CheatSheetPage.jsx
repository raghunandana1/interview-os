import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Award,
  DollarSign,
  HelpCircle,
  ExternalLink,
  Copy,
  Check,
  Edit3,
  Save
} from 'lucide-react';

export function CheatSheetPage() {
  const { cheatSheet, updateCheatSheet, showToast } = useApp();
  const [copiedKey, setCopiedKey] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(cheatSheet);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast("Copied to clipboard.", "success");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = () => {
    updateCheatSheet(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Interview Cheat Sheet
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Single-pane battle station for live interview rounds — elevator pitch, quantifiable metrics, negotiation bounds, and reverse questions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setFormData(cheatSheet);
                setIsEditing(true);
              }
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            {isEditing ? (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Content</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. 60-Second Elevator Pitch */}
          <div className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-400" />
                <h2 className="font-display font-bold text-sm text-white">
                  60-Second Elevator Pitch
                </h2>
              </div>
              <button
                onClick={() => handleCopy(cheatSheet.elevatorPitch, 'pitch')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                {copiedKey === 'pitch' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Pitch</span>
              </button>
            </div>

            {isEditing ? (
              <textarea
                rows={6}
                value={formData.elevatorPitch}
                onChange={(e) => setFormData({ ...formData, elevatorPitch: e.target.value })}
                className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-zinc-200 font-sans focus:outline-none focus:border-red-500/50 leading-relaxed"
              />
            ) : (
              <p className="text-xs text-zinc-300 leading-relaxed font-sans bg-black/30 p-4 rounded-xl border border-white/5">
                {cheatSheet.elevatorPitch}
              </p>
            )}
          </div>

          {/* 2. Key Quantifiable Metrics & Wins */}
          <div className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h2 className="font-display font-bold text-sm text-white">
                Quantifiable High-Impact Achievements
              </h2>
            </div>

            <div className="space-y-2">
              {(cheatSheet.keyAchievements || []).map((win, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-200 group hover:border-white/10 transition-all"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{win}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(win, `win-${idx}`)}
                    className="opacity-40 group-hover:opacity-100 transition-opacity p-1 text-zinc-400 hover:text-white flex-shrink-0"
                    title="Copy metric"
                  >
                    {copiedKey === `win-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3. Salary Target & Negotiation Floor */}
          <div className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <h2 className="font-display font-bold text-sm text-white">
                Compensation & Negotiation Floor
              </h2>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between">
                <span className="text-zinc-500 text-xs">Target Base Salary</span>
                <span className="text-white font-semibold">{cheatSheet.salaryExpectations?.targetBase}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between">
                <span className="text-zinc-500 text-xs">Annual Equity Target</span>
                <span className="text-emerald-400 font-semibold">{cheatSheet.salaryExpectations?.equityTarget}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between">
                <span className="text-zinc-500 text-xs">Target Total Comp</span>
                <span className="text-emerald-300 font-semibold">{cheatSheet.salaryExpectations?.targetTotalComp}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between">
                <span className="text-zinc-500 text-xs">Hard Walk-Away Floor</span>
                <span className="text-zinc-300 font-semibold">{cheatSheet.salaryExpectations?.walkAwayFloor}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-red-500/20 flex items-center justify-between">
                <span className="text-rose-300 text-xs">Current Active Leverage</span>
                <span className="text-rose-400 font-semibold">{cheatSheet.salaryExpectations?.currentActiveOffer}</span>
              </div>
            </div>
          </div>

          {/* 4. Killer Reverse-Interview Questions */}
          <div className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-sky-400" />
              <h2 className="font-display font-bold text-sm text-white">
                Reverse-Interview Questions
              </h2>
            </div>

            <div className="space-y-2">
              {(cheatSheet.questionsToAskInterviewers || []).map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 group hover:border-white/10 transition-all"
                >
                  <p className="leading-relaxed">"{q}"</p>
                  <button
                    onClick={() => handleCopy(q, `rq-${idx}`)}
                    className="opacity-40 group-hover:opacity-100 transition-opacity p-1 text-zinc-400 hover:text-white flex-shrink-0"
                  >
                    {copiedKey === `rq-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Quick Links */}
          <div className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 shadow-lg space-y-3">
            <h2 className="font-display font-bold text-sm text-white">
              Candidate Dossier Links
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {(cheatSheet.savedLinks || []).map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 hover:text-white hover:border-white/20 transition-all"
                >
                  <span className="truncate pr-1 text-xs">{link.label}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheatSheetPage;

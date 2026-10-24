import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Zap,
  Copy,
  Check,
  ExternalLink,
  DollarSign,
  Award,
  HelpCircle,
  FileText,
  Edit3,
  Save
} from 'lucide-react';

export function CheatSheetDrawer() {
  const { isCheatSheetOpen, setIsCheatSheetOpen, cheatSheet, updateCheatSheet, showToast } = useApp();
  const [copiedKey, setCopiedKey] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(cheatSheet);

  if (!isCheatSheetOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCheatSheetOpen(false)}
      />

      {/* Drawer */}
      <aside className="relative w-full sm:w-[560px] bg-[#090b12]/95 backdrop-blur-3xl border-l border-white/10 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-white">
              <Zap className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-white">
                Live Interview HUD
              </h2>
              <p className="text-xs text-zinc-400">
                Elevator pitch, key metrics, salary bounds & reverse questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setFormData(cheatSheet);
                  setIsEditing(true);
                }
              }}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>

            <button
              onClick={() => setIsCheatSheetOpen(false)}
              className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. 60-Second Elevator Pitch */}
          <div className="p-5 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-400" />
                <h3 className="font-display font-bold text-sm text-white">
                  60-Second Elevator Pitch
                </h3>
              </div>
              <button
                onClick={() => handleCopy(cheatSheet.elevatorPitch, 'pitch')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                {copiedKey === 'pitch' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy</span>
              </button>
            </div>

            {isEditing ? (
              <textarea
                value={formData.elevatorPitch}
                onChange={(e) => setFormData({ ...formData, elevatorPitch: e.target.value })}
                rows={5}
                className="w-full text-xs bg-black/60 border border-white/15 rounded-xl p-3 text-zinc-200 focus:outline-none focus:border-red-500/50 font-sans leading-relaxed"
              />
            ) : (
              <p className="text-xs leading-relaxed text-zinc-300 font-sans">
                {cheatSheet.elevatorPitch}
              </p>
            )}
          </div>

          {/* 2. Key Quantifiable Wins */}
          <div className="p-5 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h3 className="font-display font-bold text-sm text-white">
                Key Quantifiable Achievements
              </h3>
            </div>

            <div className="space-y-2">
              {(cheatSheet.keyAchievements || []).map((win, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 group hover:border-white/10 transition-all"
                >
                  <div className="flex items-start gap-2">
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

          {/* 3. Salary Target & Negotiation Bounds */}
          <div className="p-5 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <h3 className="font-display font-bold text-sm text-white">
                Salary Target & Negotiation Bounds
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-xs block mb-0.5">Target Base</span>
                <span className="text-white font-semibold">{cheatSheet.salaryExpectations?.targetBase}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-xs block mb-0.5">Target Total Comp</span>
                <span className="text-emerald-400 font-semibold">{cheatSheet.salaryExpectations?.targetTotalComp}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-xs block mb-0.5">Walk-Away Floor</span>
                <span className="text-zinc-300 font-semibold">{cheatSheet.salaryExpectations?.walkAwayFloor}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-xs block mb-0.5">Active Leverage</span>
                <span className="text-rose-400 font-semibold">{cheatSheet.salaryExpectations?.currentActiveOffer}</span>
              </div>
            </div>
          </div>

          {/* 4. High-Signal Reverse Questions */}
          <div className="p-5 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-sky-400" />
              <h3 className="font-display font-bold text-sm text-white">
                Questions to Ask Interviewers
              </h3>
            </div>

            <div className="space-y-2">
              {(cheatSheet.questionsToAskInterviewers || []).map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 group hover:border-white/10 transition-all"
                >
                  <p className="leading-relaxed">"{q}"</p>
                  <button
                    onClick={() => handleCopy(q, `q-${idx}`)}
                    className="opacity-40 group-hover:opacity-100 transition-opacity p-1 text-zinc-400 hover:text-white flex-shrink-0"
                  >
                    {copiedKey === `q-${idx}` ? (
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
          <div className="p-5 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3">
            <h3 className="font-display font-bold text-sm text-white">
              Candidate Dossier Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(cheatSheet.savedLinks || []).map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 hover:text-white hover:border-white/20 transition-all"
                >
                  <span className="truncate pr-1">{link.label}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default CheatSheetDrawer;

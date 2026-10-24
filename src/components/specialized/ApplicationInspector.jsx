import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  DollarSign,
  ExternalLink,
  Users,
  Clock,
  Trash2,
  Edit2,
  Save
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STAGES = ['Applied', 'Phone Screen', 'Technical', 'Onsite', 'Offer', 'Rejected'];

export function ApplicationInspector({ application, onClose }) {
  const {
    updateApplication,
    deleteApplication,
    advanceApplicationStage,
    companyResearch,
    updateCompanyResearch,
    contacts,
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [appForm, setAppForm] = useState(application || {});

  const companyContacts = contacts.filter(
    (c) => (c.company || '').toLowerCase().trim() === (application?.company || '').toLowerCase().trim()
  );

  const research = companyResearch[application?.company] || {
    mission: "No research notes yet recorded for this company.",
    recentNews: "Search recent engineering blogs and press releases.",
    culture: "Document team rituals, values, and interview expectations.",
    techStack: "Core languages, frameworks, and infra.",
    questionsForThem: ["What is the biggest engineering priority for this team over the next 6 months?"]
  };

  const [researchForm, setResearchForm] = useState(research);

  if (!application) return null;

  const handleStageSelect = (newStage) => {
    advanceApplicationStage(application.id, newStage);
    if (newStage === 'Offer') {
      confetti({
        particleCount: 110,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#10b981', '#f59e0b', '#ffffff']
      });
    }
  };

  const handleSaveApp = () => {
    updateApplication(application.id, appForm);
    setIsEditing(false);
  };

  const handleSaveResearch = () => {
    updateCompanyResearch(application.company, researchForm);
  };

  const formatHumanDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="relative w-full sm:w-[600px] bg-[#090b12]/95 backdrop-blur-3xl border-l border-white/10 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-black/40 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/30 to-rose-950/40 border border-red-500/30 flex items-center justify-center font-display font-bold text-lg text-white shadow-inner">
              {application.companyLogoText || application.company.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg text-white">
                  {application.company}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-medium ${
                    application.stage === 'Offer'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : application.stage === 'Rejected'
                      ? 'bg-rose-950/30 text-rose-400 border border-rose-900/30'
                      : 'bg-white/5 text-zinc-300 border border-white/10'
                  }`}
                >
                  {application.stage}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-medium mt-0.5">
                {application.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm(`Delete application for ${application.company}?`)) {
                  deleteApplication(application.id);
                  onClose();
                }
              }}
              className="p-2 rounded-full text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Delete Application"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stage Stepper */}
        <div className="px-6 py-3 border-b border-white/5 bg-white/[0.01]">
          <div className="text-xs text-zinc-400 mb-2 flex items-center justify-between">
            <span>Pipeline Progression</span>
            <span className="text-red-400">Click to advance</span>
          </div>

          <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1">
            {STAGES.map((stg, idx) => {
              const isCurrent = application.stage === stg;
              const isPast =
                STAGES.indexOf(application.stage) > idx && application.stage !== 'Rejected';

              return (
                <button
                  key={stg}
                  type="button"
                  onClick={() => handleStageSelect(stg)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-sans transition-all text-center whitespace-nowrap cursor-pointer ${
                    isCurrent
                      ? stg === 'Offer'
                        ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                        : 'bg-white text-black font-semibold shadow-sm'
                      : isPast
                      ? 'bg-white/10 text-zinc-300'
                      : 'bg-white/[0.03] text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  {stg}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-nav Tabs */}
        <div className="px-6 pt-3 border-b border-white/5 flex gap-4">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'company-research', label: 'Company Dossier' },
            { id: 'contacts', label: `Network (${companyContacts.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 text-xs block mb-0.5">Compensation</span>
                  <span className="text-zinc-200 font-semibold">{application.salary || 'Not specified'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 text-xs block mb-0.5">Workplace & Location</span>
                  <span className="text-zinc-200">{application.location || application.workplaceType}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 text-xs block mb-0.5">Applied Date</span>
                  <span className="text-zinc-200">{formatHumanDate(application.dateApplied)}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 text-xs block mb-0.5">Next Round</span>
                  <span className="text-red-400 font-semibold">
                    {application.nextInterviewDate
                      ? new Date(application.nextInterviewDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'None scheduled'}
                  </span>
                </div>
              </div>

              {application.postingUrl && (
                <a
                  href={application.postingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-200 hover:text-white hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                    <span>View Official Requisition / Posting</span>
                  </div>
                </a>
              )}

              <div className="p-5 rounded-xl bg-[#0c0e15] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">
                    Strategy & Round Notes
                  </span>
                  <button
                    onClick={() => {
                      if (isEditing) {
                        handleSaveApp();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
                    <span>{isEditing ? 'Save' : 'Edit'}</span>
                  </button>
                </div>

                {isEditing ? (
                  <textarea
                    rows={4}
                    value={appForm.notes}
                    onChange={(e) => setAppForm({ ...appForm, notes: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-red-500/50 leading-relaxed font-sans"
                  />
                ) : (
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {application.notes || 'No specific notes recorded yet.'}
                  </p>
                )}
              </div>

              {companyContacts.length > 0 && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <Users className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      Internal Connection Available
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      You know {companyContacts.map((c) => c.name).join(', ')} at {application.company}. Switch to the Network tab to copy warm referral outreach messages.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COMPANY DOSSIER */}
          {activeTab === 'company-research' && (
            <div className="space-y-4 text-xs font-sans">
              <div className="p-5 rounded-xl bg-[#0c0e15] border border-white/10 space-y-2">
                <span className="text-xs font-semibold text-white block">
                  Company Mission
                </span>
                <textarea
                  rows={2}
                  value={researchForm.mission}
                  onChange={(e) => setResearchForm({ ...researchForm, mission: e.target.value })}
                  onBlur={handleSaveResearch}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-zinc-200 focus:outline-none focus:border-red-500/40 leading-relaxed"
                />
              </div>

              <div className="p-5 rounded-xl bg-[#0c0e15] border border-white/10 space-y-2">
                <span className="text-xs font-semibold text-white block">
                  Recent News & Strategy
                </span>
                <textarea
                  rows={2}
                  value={researchForm.recentNews}
                  onChange={(e) => setResearchForm({ ...researchForm, recentNews: e.target.value })}
                  onBlur={handleSaveResearch}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-zinc-200 focus:outline-none focus:border-red-500/40 leading-relaxed"
                />
              </div>

              <div className="p-5 rounded-xl bg-[#0c0e15] border border-white/10 space-y-2">
                <span className="text-xs font-semibold text-white block">
                  Engineering Culture & Values
                </span>
                <textarea
                  rows={2}
                  value={researchForm.culture}
                  onChange={(e) => setResearchForm({ ...researchForm, culture: e.target.value })}
                  onBlur={handleSaveResearch}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-zinc-200 focus:outline-none focus:border-red-500/40 leading-relaxed"
                />
              </div>

              <div className="p-5 rounded-xl bg-[#0c0e15] border border-white/10 space-y-2">
                <span className="text-xs font-semibold text-white block">
                  Primary Tech Stack
                </span>
                <input
                  type="text"
                  value={researchForm.techStack || ''}
                  onChange={(e) => setResearchForm({ ...researchForm, techStack: e.target.value })}
                  onBlur={handleSaveResearch}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-zinc-200 focus:outline-none focus:border-red-500/40"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleSaveResearch}
                  className="px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm cursor-pointer"
                >
                  Save Dossier Notes
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="space-y-3">
              {companyContacts.length === 0 ? (
                <div className="p-16 text-center rounded-2xl bg-white/[0.01] border border-dashed border-white/10">
                  <Users className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                  <p className="text-xs text-zinc-400">
                    No contacts currently logged at {application.company}.
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Add alumni or recruiters in the Networking tab to surface them here.
                  </p>
                </div>
              ) : (
                companyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-5 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600/30 to-rose-950/40 border border-red-500/30 flex items-center justify-center text-xs font-bold text-white">
                          {contact.name[0]}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white">{contact.name}</h4>
                          <span className="text-xs text-zinc-400">{contact.role}</span>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10 font-sans">
                        {contact.status}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 italic">
                      "{contact.notes}"
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
                      <span>Met: {contact.howWeMet}</span>
                      {contact.linkedIn && (
                        <a
                          href={contact.linkedIn}
                          target="_blank"
                          rel="noreferrer"
                          className="text-red-400 hover:text-red-300 flex items-center gap-1 font-medium"
                        >
                          <span>LinkedIn</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default ApplicationInspector;

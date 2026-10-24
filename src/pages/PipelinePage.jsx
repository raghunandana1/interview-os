import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationInspector } from '../components/specialized/ApplicationInspector';
import {
  Briefcase,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Plus,
  DollarSign,
  ChevronRight,
  ExternalLink,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STAGE_TABS = [
  { id: 'ALL', label: 'All Active' },
  { id: 'Applied', label: 'Applied' },
  { id: 'Phone Screen', label: 'Phone Screen' },
  { id: 'Technical', label: 'Technical' },
  { id: 'Onsite', label: 'Onsite Loop' },
  { id: 'Offer', label: 'Offers' },
  { id: 'Rejected', label: 'Archived' },
];

export function PipelinePage() {
  const {
    applications,
    contacts,
    stats,
    advanceApplicationStage,
    setIsQuickAddOpen,
    setQuickAddType,
  } = useApp();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' (Cupertino Product Staging) | 'table'
  const [selectedStageTab, setSelectedStageTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      if (selectedStageTab === 'ALL') {
        if (app.stage === 'Rejected') return false; // Show active by default
      } else if (app.stage !== selectedStageTab) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          app.company.toLowerCase().includes(q) ||
          app.role.toLowerCase().includes(q) ||
          (app.notes && app.notes.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [applications, selectedStageTab, searchQuery]);

  const handleAdvance = (e, app) => {
    e.stopPropagation();
    const stageOrder = ['Applied', 'Phone Screen', 'Technical', 'Onsite', 'Offer'];
    const currIdx = stageOrder.indexOf(app.stage);
    if (currIdx !== -1 && currIdx < stageOrder.length - 1) {
      const nextStage = stageOrder[currIdx + 1];
      advanceApplicationStage(app.id, nextStage);
      if (nextStage === 'Offer') {
        confetti({
          particleCount: 110,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#10b981', '#f59e0b', '#ffffff']
        });
      }
    }
  };

  const formatHumanDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* Clean Cupertino Header */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Application Pipeline
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Track interview progression, compensation leverage, and company intelligence across active search cycles.
          </p>
        </div>

        {/* Action Controls: Search, View Mode, New Application */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 w-48 sm:w-56"
            />
          </div>

          <div className="flex items-center p-0.5 rounded-full bg-black/40 border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Cupertino Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Data Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              setQuickAddType('application');
              setIsQuickAddOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* Cupertino Segmented Stage Tabs */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {STAGE_TABS.map((tab) => {
          const active = selectedStageTab === tab.id;
          const count =
            tab.id === 'ALL'
              ? applications.filter((a) => a.stage !== 'Rejected').length
              : applications.filter((a) => a.stage === tab.id).length;

          return (
            <button
              key={tab.id}
              onClick={() => setSelectedStageTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/5'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-sans font-semibold leading-none ${
                  active ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CUPERTINO PRODUCT STAGING GRID (3-Column Generous Cards) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredApps.length === 0 ? (
            <div className="col-span-full p-16 text-center rounded-2xl bg-white/[0.01] border border-dashed border-white/10">
              <Briefcase className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-zinc-400 font-medium">No applications found in this stage.</p>
              <p className="text-xs text-zinc-500 mt-1">
                Use the New Application button to add target companies.
              </p>
            </div>
          ) : (
            filteredApps.map((app) => {
              const matchedContacts = contacts.filter(
                (c) => (c.company || '').toLowerCase().trim() === app.company.toLowerCase().trim()
              );

              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="group relative rounded-2xl bg-[#0c0e15]/90 hover:bg-[#11131c] border border-white/10 hover:border-red-500/40 transition-all p-5 shadow-lg flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Top Row: Company Emblem, Brand, Stage Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/30 to-rose-950/40 border border-red-500/30 flex items-center justify-center font-display font-bold text-sm text-white shadow-inner flex-shrink-0">
                          {app.companyLogoText || app.company.slice(0, 3)}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-base text-white group-hover:text-red-300 transition-colors">
                            {app.company}
                          </h3>
                          <span className="text-xs text-zinc-400 block line-clamp-1">
                            {app.role}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase ${
                          app.stage === 'Offer'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : app.stage === 'Rejected'
                            ? 'bg-rose-950/30 text-rose-400 border border-rose-900/30'
                            : 'bg-white/5 text-zinc-300 border border-white/10'
                        }`}
                      >
                        {app.stage}
                      </span>
                    </div>

                    {/* Metadata Badges */}
                    <div className="space-y-2 pt-1">
                      {app.salary && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                          <DollarSign className="w-3.5 h-3.5 flex-shrink-0 text-emerald-500" />
                          <span>{app.salary}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-zinc-500" />
                        <span>{app.location || app.workplaceType}</span>
                      </div>

                      {app.nextInterviewDate && (
                        <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-xs text-rose-300 flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                          <span>
                            Next round:{' '}
                            <strong className="text-white">
                              {new Date(app.nextInterviewDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </strong>
                          </span>
                        </div>
                      )}

                      {matchedContacts.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                          <Users className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                          <span>
                            Inside connection:{' '}
                            <strong className="text-white">
                              {matchedContacts.map((c) => c.name).join(', ')}
                            </strong>
                          </span>
                        </div>
                      )}
                    </div>

                    {app.notes && (
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed pt-1">
                        {app.notes}
                      </p>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-4">
                    <span className="text-xs text-zinc-500 font-sans">
                      Applied {formatHumanDate(app.dateApplied)}
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {app.stage !== 'Offer' && app.stage !== 'Rejected' && (
                        <button
                          type="button"
                          onClick={(e) => handleAdvance(e, app)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 hover:text-white text-xs font-medium border border-white/10 transition-all cursor-pointer"
                        >
                          <span>Advance</span>
                          <ArrowRight className="w-3 h-3 text-red-400" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* HIGH-DENSITY LEDGER TABLE VIEW */}
      {/* ───────────────────────────────────────────────────────────── */}
      {viewMode === 'table' && (
        <div className="rounded-2xl bg-white/[0.015] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-black/50 border-b border-white/10 text-zinc-400 font-sans text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Company & Role</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Compensation Band</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Internal Contacts</th>
                  <th className="px-4 py-3">Applied Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApps.map((app) => {
                  const matchedContacts = contacts.filter(
                    (c) => (c.company || '').toLowerCase().trim() === app.company.toLowerCase().trim()
                  );

                  return (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600/30 to-rose-950/40 border border-red-500/30 flex items-center justify-center font-display font-bold text-xs text-white">
                            {app.companyLogoText || app.company.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-display font-bold text-white group-hover:text-red-300 transition-colors">
                              {app.company}
                            </div>
                            <div className="text-xs text-zinc-400">{app.role}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-sans font-medium ${
                            app.stage === 'Offer'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : app.stage === 'Rejected'
                              ? 'bg-rose-950/30 text-rose-400 border border-rose-900/30'
                              : 'bg-white/5 text-zinc-300 border border-white/10'
                          }`}
                        >
                          {app.stage}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-zinc-300 font-medium">
                        {app.salary || '—'}
                      </td>

                      <td className="px-4 py-3.5 text-zinc-400">
                        {app.location || app.workplaceType}
                      </td>

                      <td className="px-4 py-3.5">
                        {matchedContacts.length > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10 text-xs">
                            <Users className="w-3.5 h-3.5 text-red-400" />
                            <span>{matchedContacts.map((c) => c.name).join(', ')}</span>
                          </span>
                        ) : (
                          <span className="text-zinc-600 text-xs">None logged</span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-zinc-400 text-xs">
                        {formatHumanDate(app.dateApplied)}
                      </td>

                      <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-3 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-medium transition-all shadow-sm"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* Slide-over Application Inspector */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedApp && (
        <ApplicationInspector
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}

export default PipelinePage;

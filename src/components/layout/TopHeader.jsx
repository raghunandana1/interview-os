import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Upload,
  RotateCcw,
  ChevronDown
} from 'lucide-react';

export function TopHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    applications,
    questions,
    contacts,
    calendarEvents,
    user,
    setIsCheatSheetOpen,
    setIsQuickAddOpen,
    setQuickAddType,
    exportDataJSON,
    importDataJSON,
    resetToDemoData,
  } = useApp();

  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const [isDataMenuOpen, setIsDataMenuOpen] = useState(false);
  const actionsRef = useRef(null);
  const dataRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionsRef.current && !actionsRef.current.contains(e.target)) {
        setIsActionsDropdownOpen(false);
      }
      if (dataRef.current && !dataRef.current.contains(e.target)) {
        setIsDataMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    {
      label: 'Pipeline',
      to: '/workspace',
      count: applications.filter((a) => a.stage !== 'Rejected').length,
      isActive: (pathname) => pathname === '/workspace' || pathname.includes('/pipeline'),
    },
    {
      label: 'STAR Bank',
      to: '/questions',
      count: questions.length,
      isActive: (pathname) => pathname.includes('/questions'),
    },
    {
      label: 'Calendar',
      to: '/calendar',
      count: calendarEvents.length,
      isActive: (pathname) => pathname.includes('/calendar'),
    },
    {
      label: 'Networking',
      to: '/networking',
      count: contacts.length,
      isActive: (pathname) => pathname.includes('/networking'),
    },
    {
      label: 'Cheat Sheet',
      to: '/cheatsheet',
      isActive: (pathname) => pathname.includes('/cheatsheet'),
    },
    {
      label: 'Analytics',
      to: '/analytics',
      isActive: (pathname) => pathname.includes('/analytics'),
    },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (content) {
        importDataJSON(content);
        setIsDataMenuOpen(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="h-16 bg-[#06070a]/90 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 flex items-center justify-between z-40 relative shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      {/* Hidden File Input for JSON Restore */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        className="hidden"
      />

      {/* Left: Brand Monogram Wordmark */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer group select-none"
          title="InterviewOS Flagship Showcase"
        >
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-rose-400">
            InterviewOS
          </span>
        </div>
      </div>

      {/* Center: Apple macOS Segmented Navigation Bar (Pure Typography - Zero Emojis/Icons) */}
      <nav className="hidden md:flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex-shrink-0 mx-2">
        {navItems.map((item) => {
          const active = item.isActive(location.pathname);
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.to)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-gradient-to-b from-white to-zinc-200 text-black font-semibold shadow-[0_2px_14px_rgba(255,255,255,0.25)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span>{item.label}</span>
              {typeof item.count === 'number' && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-sans font-semibold leading-none ${
                    active ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Live HUD, Add, Backup & Candidate Profile */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Live Interview HUD Button */}
        <button
          type="button"
          onClick={() => setIsCheatSheetOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm"
          title="Open Live Interview HUD (Cmd+J)"
        >
          <span className="text-xs font-medium">Live HUD</span>
          <span className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] rounded bg-white/5 text-zinc-400 border border-white/5 font-sans">
            ⌘J
          </span>
        </button>

        {/* Quick Add Button */}
        <div className="relative" ref={actionsRef}>
          <button
            type="button"
            onClick={() => setIsActionsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <span>Add</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {isActionsDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-[#0c0d14]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-1 space-y-0.5 font-sans text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setQuickAddType('application');
                    setIsQuickAddOpen(true);
                    setIsActionsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  Job Application
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuickAddType('question');
                    setIsQuickAddOpen(true);
                    setIsActionsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  STAR Question
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuickAddType('contact');
                    setIsQuickAddOpen(true);
                    setIsActionsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  Networking Contact
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuickAddType('event');
                    setIsQuickAddOpen(true);
                    setIsActionsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Data Tools */}
        <div className="relative" ref={dataRef}>
          <button
            type="button"
            onClick={() => setIsDataMenuOpen((prev) => !prev)}
            className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            title="Backup & Restore JSON Data"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {isDataMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[#0c0d14]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-1 space-y-1 font-sans text-xs">
                <button
                  type="button"
                  onClick={() => {
                    exportDataJSON();
                    setIsDataMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  Export JSON Backup
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-left px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  Restore from JSON
                </button>

                <div className="border-t border-white/5 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Reset all data to the default flagship dataset?")) {
                      resetToDemoData();
                      setIsDataMenuOpen(false);
                    }
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-rose-300 hover:text-rose-100 hover:bg-rose-500/10 transition-all cursor-pointer"
                >
                  Reset Demo Data
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-4 w-px bg-white/10 hidden sm:block" />

        {/* Current Candidate Identity - With Guaranteed No-Clip */}
        <div className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-all backdrop-blur-md shadow-sm flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600/40 to-rose-600/30 border border-red-500/40 flex items-center justify-center text-[10px] font-sans font-bold text-white select-none">
            {user.avatarBadge}
          </div>
          <span className="font-medium text-white/90 text-xs tracking-tight whitespace-nowrap">
            {user.name}
          </span>
        </div>
      </div>
    </header>
  );
}

export default TopHeader;

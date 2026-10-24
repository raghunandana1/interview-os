import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Briefcase,
  HelpCircle,
  Users,
  Calendar
} from 'lucide-react';

export function QuickAddModal() {
  const {
    isQuickAddOpen,
    setIsQuickAddOpen,
    quickAddType,
    setQuickAddType,
    addApplication,
    addQuestion,
    addContact,
    addCalendarEvent,
  } = useApp();

  const [appForm, setAppForm] = useState({
    company: '',
    role: '',
    stage: 'Applied',
    salary: '',
    location: '',
    workplaceType: 'Remote',
    postingUrl: '',
    priority: 'High',
    notes: '',
  });

  const [qForm, setQForm] = useState({
    category: 'Behavioral',
    question: '',
    situation: '',
    task: '',
    action: '',
    result: '',
    tags: '',
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    company: '',
    role: '',
    howWeMet: '',
    linkedIn: '',
    email: '',
    followUpDue: '',
    notes: '',
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    company: '',
    type: 'Technical Round',
    date: new Date().toISOString().substring(0, 10),
    time: '14:00 - 15:00',
    interviewer: '',
    meetingLink: '',
    notes: '',
  });

  if (!isQuickAddOpen) return null;

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (!appForm.company || !appForm.role) return;
    addApplication(appForm);
    setIsQuickAddOpen(false);
    setAppForm({
      company: '',
      role: '',
      stage: 'Applied',
      salary: '',
      location: '',
      workplaceType: 'Remote',
      postingUrl: '',
      priority: 'High',
      notes: '',
    });
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!qForm.question) return;
    addQuestion({
      ...qForm,
      tags: qForm.tags ? qForm.tags.split(',').map((t) => t.trim()) : ['STAR Prep'],
    });
    setIsQuickAddOpen(false);
    setQForm({
      category: 'Behavioral',
      question: '',
      situation: '',
      task: '',
      action: '',
      result: '',
      tags: '',
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.company) return;
    addContact(contactForm);
    setIsQuickAddOpen(false);
    setContactForm({
      name: '',
      company: '',
      role: '',
      howWeMet: '',
      linkedIn: '',
      email: '',
      followUpDue: '',
      notes: '',
    });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.company) return;
    addCalendarEvent(eventForm);
    setIsQuickAddOpen(false);
    setEventForm({
      title: '',
      company: '',
      type: 'Technical Round',
      date: new Date().toISOString().substring(0, 10),
      time: '14:00 - 15:00',
      interviewer: '',
      meetingLink: '',
      notes: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => setIsQuickAddOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#090b12]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <h3 className="font-display font-bold text-base text-white">
            Quick Add
          </h3>
          <button
            onClick={() => setIsQuickAddOpen(false)}
            className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/40 border border-white/5 max-w-fit">
            {[
              { id: 'application', label: 'Application', icon: Briefcase },
              { id: 'question', label: 'STAR Question', icon: HelpCircle },
              { id: 'contact', label: 'Contact', icon: Users },
              { id: 'event', label: 'Interview Event', icon: Calendar },
            ].map((tab) => {
              const active = quickAddType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setQuickAddType(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {quickAddType === 'application' && (
            <form onSubmit={handleApplicationSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Netflix, OpenAI, Stripe"
                    value={appForm.company}
                    onChange={(e) => setAppForm({ ...appForm, company: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Software Engineer"
                    value={appForm.role}
                    onChange={(e) => setAppForm({ ...appForm, role: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Pipeline Stage
                  </label>
                  <select
                    value={appForm.stage}
                    onChange={(e) => setAppForm({ ...appForm, stage: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Phone Screen">Phone Screen</option>
                    <option value="Technical">Technical</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Offer">Offer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Workplace Type
                  </label>
                  <select
                    value={appForm.workplaceType}
                    onChange={(e) => setAppForm({ ...appForm, workplaceType: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={appForm.priority}
                    onChange={(e) => setAppForm({ ...appForm, priority: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $210k - $250k + Equity"
                    value={appForm.salary}
                    onChange={(e) => setAppForm({ ...appForm, salary: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Job Posting URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://company.com/careers/..."
                    value={appForm.postingUrl}
                    onChange={(e) => setAppForm({ ...appForm, postingUrl: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Strategy Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Key talking points or recruiter details..."
                  value={appForm.notes}
                  onChange={(e) => setAppForm({ ...appForm, notes: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500/50 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold shadow-sm cursor-pointer"
                >
                  Save Application
                </button>
              </div>
            </form>
          )}

          {quickAddType === 'question' && (
            <form onSubmit={handleQuestionSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Category
                  </label>
                  <select
                    value={qForm.category}
                    onChange={(e) => setQForm({ ...qForm, category: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  >
                    <option value="Behavioral">Behavioral</option>
                    <option value="Technical">Technical</option>
                    <option value="Company-Specific">Company-Specific</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Leadership, Outage, Architecture"
                    value={qForm.tags}
                    onChange={(e) => setQForm({ ...qForm, tags: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Question Prompt *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tell me about a time you handled a major production outage..."
                  value={qForm.question}
                  onChange={(e) => setQForm({ ...qForm, question: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                />
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Situation
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Context, constraints, environment..."
                    value={qForm.situation}
                    onChange={(e) => setQForm({ ...qForm, situation: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500/50 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Task
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Your specific responsibility or goal..."
                    value={qForm.task}
                    onChange={(e) => setQForm({ ...qForm, task: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500/50 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Action
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Concrete steps you took, technical trade-offs..."
                    value={qForm.action}
                    onChange={(e) => setQForm({ ...qForm, action: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500/50 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-400 mb-1">
                    Result
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Quantified outcome, metrics moved, lessons learned..."
                    value={qForm.result}
                    onChange={(e) => setQForm({ ...qForm, result: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500/50 leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold shadow-sm cursor-pointer"
                >
                  Save STAR Question
                </button>
              </div>
            </form>
          )}

          {quickAddType === 'contact' && (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Target Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google, Stripe, Meta"
                    value={contactForm.company}
                    onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Title / Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering Manager, Staff SWE"
                    value={contactForm.role}
                    onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={contactForm.followUpDue}
                    onChange={(e) => setContactForm({ ...contactForm, followUpDue: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={contactForm.linkedIn}
                    onChange={(e) => setContactForm({ ...contactForm, linkedIn: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    How You Met
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alumni meetup, ex-colleague"
                    value={contactForm.howWeMet}
                    onChange={(e) => setContactForm({ ...contactForm, howWeMet: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Context Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Discussion points or referral agreement..."
                  value={contactForm.notes}
                  onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500/50 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold shadow-sm cursor-pointer"
                >
                  Save Contact
                </button>
              </div>
            </form>
          )}

          {quickAddType === 'event' && (
            <form onSubmit={handleEventSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google Systems Design Screen"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google"
                    value={eventForm.company}
                    onChange={(e) => setEventForm({ ...eventForm, company: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Interview Type
                  </label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  >
                    <option value="Phone Screen">Phone Screen</option>
                    <option value="Technical Round">Technical Round</option>
                    <option value="System Design">System Design</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="Onsite Loop">Onsite Loop</option>
                    <option value="Mock Interview">Mock Interview</option>
                    <option value="Coffee Chat">Coffee Chat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Time Window
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 14:00 - 15:30"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Interviewer Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Marcus Vance"
                    value={eventForm.interviewer}
                    onChange={(e) => setEventForm({ ...eventForm, interviewer: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://zoom.us/j/..."
                    value={eventForm.meetingLink}
                    onChange={(e) => setEventForm({ ...eventForm, meetingLink: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Preparation Checklist
                </label>
                <textarea
                  rows={2}
                  placeholder="Key topics to review before joining..."
                  value={eventForm.notes}
                  onChange={(e) => setEventForm({ ...eventForm, notes: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500/50 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold shadow-sm cursor-pointer"
                >
                  Schedule Interview
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuickAddModal;

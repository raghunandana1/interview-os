import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Plus,
  Search,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Trash2,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export function NetworkingPage() {
  const {
    contacts,
    referralTemplates,
    deleteContact,
    setIsQuickAddOpen,
    setQuickAddType,
    user,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(referralTemplates[0]);
  const [targetContact, setTargetContact] = useState(contacts[0] || null);
  const [copiedKey, setCopiedKey] = useState(null);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          (c.role && c.role.toLowerCase().includes(q)) ||
          (c.howWeMet && c.howWeMet.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [contacts, searchQuery]);

  const generatedMessage = useMemo(() => {
    if (!selectedTemplate) return '';
    const name = targetContact ? targetContact.name.split(' ')[0] : '[Contact Name]';
    const company = targetContact ? targetContact.company : '[Company]';
    const role = targetContact ? targetContact.role : 'Staff Software Engineer';
    const yourName = user.name || 'Candidate';

    return selectedTemplate.body
      .replace(/{name}/g, name)
      .replace(/{company}/g, company)
      .replace(/{role}/g, role)
      .replace(/{yourName}/g, yourName)
      .replace(/{university}/g, 'SIT Pune')
      .replace(/{resumeLink}/g, 'https://portfolio.dev/resume.pdf')
      .replace(/{postingUrl}/g, `https://${company.toLowerCase()}.com/careers`)
      .replace(/{linkedInUrl}/g, 'https://linkedin.com/in/engineering-lead');
  }, [selectedTemplate, targetContact, user]);

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopiedKey('template');
    showToast("Referral outreach template copied.", "success");
    setTimeout(() => setCopiedKey(null), 2000);
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Networking CRM & Rolodex
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Personal contact log, automated follow-up cadences, and customized referral outreach templates.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 w-48 sm:w-56"
            />
          </div>

          <button
            onClick={() => {
              setQuickAddType('contact');
              setIsQuickAddOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-zinc-400 font-medium">
              Directory ({filteredContacts.length} contacts)
            </span>
            <span className="text-xs text-zinc-500">
              Select a contact to customize outreach
            </span>
          </div>

          {filteredContacts.length === 0 ? (
            <div className="p-16 text-center rounded-2xl bg-white/[0.01] border border-dashed border-white/10">
              <Users className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-zinc-400 font-medium">No contacts found.</p>
              <p className="text-xs text-zinc-500 mt-1">Log internal champions, alumni, or recruiters above.</p>
            </div>
          ) : (
            filteredContacts.map((contact) => {
              const isSelected = targetContact?.id === contact.id;

              return (
                <div
                  key={contact.id}
                  onClick={() => setTargetContact(contact)}
                  className={`p-5 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-950/30 to-[#0e101a] border-red-500/50 shadow-md'
                      : 'bg-[#0c0e15]/90 hover:bg-[#11131c] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600/30 to-rose-950/40 border border-red-500/30 flex items-center justify-center font-display font-bold text-sm text-white">
                        {contact.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-sm text-white">
                            {contact.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-zinc-300">
                            {contact.company}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-400">{contact.role}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-medium ${
                          contact.status === 'Needs Follow-up'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : contact.status === 'In Touch'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/5 text-zinc-300 border border-white/10'
                        }`}
                      >
                        {contact.status}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete ${contact.name}?`)) {
                            deleteContact(contact.id);
                          }
                        }}
                        className="p-1 rounded-full text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete contact"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {contact.notes && (
                    <p className="text-xs text-zinc-300 italic pt-2 leading-relaxed">
                      "{contact.notes}"
                    </p>
                  )}

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 mt-2">
                    <span>Met via: {contact.howWeMet}</span>
                    <div className="flex items-center gap-3">
                      {contact.linkedIn && (
                        <a
                          href={contact.linkedIn}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1 font-medium"
                        >
                          <span>LinkedIn</span>
                          <ExternalLink className="w-3 h-3 text-red-500" />
                        </a>
                      )}
                      <span>Follow-up: {formatHumanDate(contact.followUpDue) || 'None set'}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Outreach Generator */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0c0e15]/90 border border-white/10 p-5 space-y-4 sticky top-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="font-display font-bold text-sm text-white">
              Referral Message Engine
            </h2>
            <button
              onClick={handleCopyTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              {copiedKey === 'template' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-black" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Target Contact</span>
            <span className="text-xs font-semibold text-white">
              {targetContact ? `${targetContact.name} (${targetContact.company})` : 'Select a contact'}
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 font-medium block">
              Outreach Archetype
            </label>
            <div className="grid grid-cols-2 gap-2">
              {referralTemplates.map((tmpl) => {
                const active = selectedTemplate.id === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl)}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                      active
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'bg-black/40 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div>{tmpl.name}</div>
                    <span className={`text-[10px] block ${active ? 'text-zinc-600' : 'text-zinc-500'}`}>
                      {tmpl.relationship}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div>
              <span className="text-xs text-zinc-400 font-medium block mb-1">
                Subject
              </span>
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white">
                {selectedTemplate.subject
                  .replace(/{role}/g, targetContact?.role || 'Role')
                  .replace(/{company}/g, targetContact?.company || 'Company')}
              </div>
            </div>

            <div>
              <span className="text-xs text-zinc-400 font-medium block mb-1">
                Body
              </span>
              <textarea
                rows={9}
                readOnly
                value={generatedMessage}
                className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-zinc-200 font-sans leading-relaxed focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkingPage;

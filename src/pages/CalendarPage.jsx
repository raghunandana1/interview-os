import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Plus,
  ExternalLink,
  Building2,
  User,
  Trash2
} from 'lucide-react';

const EVENT_TYPES = ['All', 'Technical Round', 'Onsite Loop', 'Phone Screen', 'Mock Interview', 'Coffee Chat'];

export function CalendarPage() {
  const {
    calendarEvents,
    deleteCalendarEvent,
    setIsQuickAddOpen,
    setQuickAddType,
  } = useApp();

  const [selectedType, setSelectedType] = useState('All');

  const sortedEvents = useMemo(() => {
    return [...calendarEvents]
      .filter((e) => selectedType === 'All' || e.type === selectedType)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [calendarEvents, selectedType]);

  const nextUpcoming = sortedEvents[0];

  const formatHumanDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
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
            Interview Schedule
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Upcoming technical screens, onsite loops, and peer mock interviews with prep notes.
          </p>
        </div>

        <button
          onClick={() => {
            setQuickAddType('event');
            setIsQuickAddOpen(true);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Schedule Interview</span>
        </button>
      </div>

      {/* Focus Highlight Card */}
      {nextUpcoming && (
        <div className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 hover:border-red-500/30 transition-all shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white">
              <CalendarIcon className="w-6 h-6 text-red-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-400 font-medium">
                  Next Milestone
                </span>
                <span className="text-xs text-zinc-500">•</span>
                <span className="text-xs text-zinc-400">
                  {formatHumanDate(nextUpcoming.date)} at {nextUpcoming.time}
                </span>
              </div>
              <h2 className="font-display font-bold text-xl text-white">
                {nextUpcoming.title} ({nextUpcoming.company})
              </h2>
              <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
                {nextUpcoming.notes}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {nextUpcoming.meetingLink && (
              <a
                href={nextUpcoming.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <Video className="w-3.5 h-3.5 text-black" />
                <span>Join Meeting</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Type Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {EVENT_TYPES.map((type) => {
          const active = selectedType === type;
          const count =
            type === 'All'
              ? calendarEvents.length
              : calendarEvents.filter((e) => e.type === type).length;

          return (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/5'
              }`}
            >
              <span>{type}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-sans font-semibold ${
                  active ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {sortedEvents.length === 0 ? (
          <div className="p-16 text-center rounded-2xl bg-white/[0.01] border border-dashed border-white/10">
            <CalendarIcon className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm text-zinc-400 font-medium">No interviews scheduled in this view.</p>
            <p className="text-xs text-zinc-500 mt-1">
              Add upcoming technical screens or mock interviews above.
            </p>
          </div>
        ) : (
          sortedEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-5 rounded-2xl bg-[#0c0e15]/90 hover:bg-[#11131c] border border-white/10 hover:border-red-500/30 transition-all shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white/[0.03] border border-white/5 text-center flex-shrink-0">
                  <span className="text-xs text-red-400 uppercase font-medium">
                    {new Date(evt.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="font-display font-bold text-lg text-white leading-none mt-0.5">
                    {new Date(evt.date).getDate()}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-sans font-medium bg-white/5 text-zinc-300 border border-white/10">
                      {evt.type}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{evt.time}</span>
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-zinc-500" />
                      <span className="text-white font-medium">{evt.company}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-sm text-white">
                    {evt.title}
                  </h3>

                  {evt.interviewer && (
                    <div className="text-xs text-zinc-400">
                      Interviewer: <span className="text-zinc-200">{evt.interviewer}</span>
                    </div>
                  )}

                  {evt.notes && (
                    <p className="text-xs text-zinc-400 leading-relaxed pt-0.5 max-w-2xl">
                      {evt.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                {evt.meetingLink && (
                  <a
                    href={evt.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white text-xs font-medium border border-white/10 transition-all"
                  >
                    <Video className="w-3.5 h-3.5 text-red-400" />
                    <span>Join</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500" />
                  </a>
                )}

                <button
                  onClick={() => {
                    if (window.confirm("Delete this calendar event?")) {
                      deleteCalendarEvent(evt.id);
                    }
                  }}
                  className="p-2 rounded-full text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete event"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarPage;

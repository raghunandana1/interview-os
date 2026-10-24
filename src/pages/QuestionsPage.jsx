import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Plus,
  Search,
  Star,
  CheckCircle2,
  Clock,
  Flame,
  ChevronDown,
  ChevronUp,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CATEGORIES = ['All', 'Behavioral', 'Technical', 'Company-Specific', 'Custom', 'Favorites'];

export function QuestionsPage() {
  const {
    questions,
    incrementPracticeCount,
    toggleQuestionFavorite,
    deleteQuestion,
    setIsQuickAddOpen,
    setQuickAddType,
    stats,
    showToast,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState(new Set(questions.map((q) => q.id)));
  const [copiedKey, setCopiedKey] = useState(null);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedCategory === 'Favorites') {
        if (!q.isFavorite) return false;
      } else if (selectedCategory !== 'All' && q.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          q.question.toLowerCase().includes(query) ||
          (q.situation && q.situation.toLowerCase().includes(query)) ||
          (q.action && q.action.toLowerCase().includes(query)) ||
          (q.tags && q.tags.some((t) => t.toLowerCase().includes(query)))
        );
      }
      return true;
    });
  }, [questions, selectedCategory, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePracticeDrill = (id, e) => {
    e.stopPropagation();
    incrementPracticeCount(id);
    confetti({
      particleCount: 45,
      spread: 55,
      origin: { y: 0.7 },
      colors: ['#ef4444', '#f43f5e', '#ffffff']
    });
  };

  const handleCopyStar = (q, e) => {
    e.stopPropagation();
    const formatted = `QUESTION: ${q.question}\n\nSITUATION:\n${q.situation}\n\nTASK:\n${q.task}\n\nACTION:\n${q.action}\n\nRESULT:\n${q.result}`;
    navigator.clipboard.writeText(formatted);
    setCopiedKey(q.id);
    showToast("STAR response copied to clipboard.", "success");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatHumanDate = (isoStr) => {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* Header */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Question & Answer Bank
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Battle-tested STAR-format responses categorized for behavioral, system design, and technical mastery.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search prompts or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 w-44 sm:w-56"
            />
          </div>

          <button
            onClick={() => {
              setQuickAddType('question');
              setIsQuickAddOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add STAR Question</span>
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* Practice Streak Subtitle Bar */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold text-white">
              {stats.currentStreak}-Day Rehearsal Streak
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {stats.totalPracticedTimes} practice sessions completed across your question catalog.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpandedIds(new Set(questions.map((q) => q.id)))}
            className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium border border-white/5 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedIds(new Set())}
            className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium border border-white/5 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* Category Filter Pills */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          const count =
            cat === 'All'
              ? questions.length
              : cat === 'Favorites'
              ? questions.filter((q) => q.isFavorite).length
              : questions.filter((q) => q.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/5'
              }`}
            >
              <span>{cat}</span>
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
      {/* Questions List */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-16 text-center rounded-2xl bg-white/[0.01] border border-dashed border-white/10">
            <HelpCircle className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm text-zinc-400 font-medium">No STAR questions found in this view.</p>
            <p className="text-xs text-zinc-500 mt-1">
              Add your structured behavioral or technical responses above.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedIds.has(q.id);

            return (
              <div
                key={q.id}
                className="rounded-2xl bg-[#0c0e15]/90 hover:bg-[#11131c] border border-white/10 hover:border-red-500/30 transition-all p-5 shadow-lg space-y-4"
              >
                {/* Top Row: Category, Tags, Practice Button */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-sans font-medium bg-white/5 text-zinc-300 border border-white/10">
                        {q.category}
                      </span>

                      {(q.tags || []).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-white/[0.03] text-zinc-400 border border-white/5 text-xs font-sans"
                        >
                          {t}
                        </span>
                      ))}

                      {q.lastPracticed && (
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-600" />
                          <span>Practiced {formatHumanDate(q.lastPracticed)}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-white leading-snug">
                      "{q.question}"
                    </h3>
                  </div>

                  {/* Actions: Favorite Star, Copy, Drill Counter */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleQuestionFavorite(q.id)}
                      className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 transition-colors"
                      title={q.isFavorite ? "Unstar" : "Star as favorite"}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          q.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-zinc-500'
                        }`}
                      />
                    </button>

                    <button
                      onClick={(e) => handleCopyStar(q, e)}
                      className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                      title="Copy full STAR text"
                    >
                      {copiedKey === q.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handlePracticeDrill(q.id, e)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm transition-all cursor-pointer"
                      title="Log 1 rehearsal drill"
                    >
                      <Zap className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                      <span>{q.practiceCount || 0} Drills</span>
                    </button>

                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* STAR Section Blocks */}
                {isExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-white/5 animate-in fade-in duration-150">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                      <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wide">
                        Situation
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {q.situation || 'No situation provided.'}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                      <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wide">
                        Task
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {q.task || 'No task objective provided.'}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5 md:col-span-2">
                      <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wide">
                        Action
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {q.action || 'No concrete actions documented.'}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5 md:col-span-2">
                      <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                        Result & Impact
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                        {q.result || 'No quantifiable result noted.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default QuestionsPage;

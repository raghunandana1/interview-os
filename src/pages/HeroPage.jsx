import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  HelpCircle,
  Calendar,
  Users,
  Zap,
  BarChart3,
  ChevronDown,
  Shield,
  Award,
  DollarSign,
  Sparkles,
  X,
  Check,
  ExternalLink
} from 'lucide-react';
import { InteractiveWavesBackground } from '../components/canvas/InteractiveWavesBackground';
import { useApp } from '../context/AppContext';

const PLAYBOOKS = {
  starBlueprint: {
    id: 'starBlueprint',
    tag: 'Executive Repertoire Protocol',
    title: 'The STAR Response Blueprint',
    subtitle: 'Standardized framework for structuring high-impact, 3-minute behavioral and architectural answers.',
    sections: [
      {
        heading: '1. Situation: High-Stakes Grounding (30s)',
        body: 'Set the technical and operational context immediately. Quantify the stakes (e.g. 14% failure rate, 50M records, tight regulatory deadline) rather than vague background details.',
      },
      {
        heading: '2. Task: Direct Ownership (20s)',
        body: 'State explicitly what YOU were held accountable for. Clarify the boundary between team goals and your individual architectural responsibility.',
      },
      {
        heading: '3. Action: Concrete Engineering & Trade-offs (90s)',
        body: 'Detail the concrete technical mechanisms you implemented (e.g. circuit breakers, Redis idempotency keys, Web Workers for INP). Address alternatives considered and why you rejected them.',
      },
      {
        heading: '4. Result: Quantified Business & System Impact (40s)',
        body: 'Conclude with verifiable metrics: P99 latency dropped by 64%, zero duplicate transactions, $180k/yr cloud savings, or 6 team promotions.',
      },
    ],
  },
  offerLeverage: {
    id: 'offerLeverage',
    tag: 'Compensation & Negotiation SOP',
    title: 'Offer Leverage & Total Comp Protocol',
    subtitle: 'Strategic execution playbooks for negotiating senior and staff compensation packages.',
    sections: [
      {
        heading: '1. Anchor to Market Data & Walk-Away Floors',
        body: 'Establish your target base, equity ceiling, and hard walk-away floor before initial recruiter screens. Never state a number first during early rounds.',
      },
      {
        heading: '2. Compounding Competing Timelines',
        body: 'Synchronize onsite loops across tier-1 targets to produce concurrent offer windows. Competing offers create genuine market pricing leverage.',
      },
      {
        heading: '3. Negotiation via Collaborative Framing',
        body: 'Present competing compensation respectfully as a decision parameter rather than an ultimatum: "Stripe offered $390k TC; if you can bridge the base to $270k, I will sign immediately."',
      },
    ],
  },
  reverseQuestions: {
    id: 'reverseQuestions',
    tag: 'Interview Discovery Protocol',
    title: 'High-Signal Reverse Questions',
    subtitle: 'Vetting team velocity, technical debt, and executive leadership reality.',
    sections: [
      {
        heading: 'Velocity & Delivery Blockers',
        body: '"What is the single biggest architectural bottleneck currently preventing this engineering team from shipping twice as fast?"',
      },
      {
        heading: 'Incident Culture & Blamelessness',
        body: '"How does the platform group handle post-mortems when an outage occurs? Are incidents treated as learning rituals or escalation vectors?"',
      },
      {
        heading: 'Technical Trade-off Resolution',
        body: '"When Staff engineers and Product Leads disagree on velocity versus architectural debt, how are decisions resolved?"',
      },
    ],
  },
  privacySovereignty: {
    id: 'privacySovereignty',
    tag: 'Data Sovereignty & Local Security',
    title: 'Candidate Privacy & Data Ownership',
    subtitle: 'Zero third-party telemetry, per-user encryption, and complete JSON offline portability.',
    sections: [
      {
        heading: '100% Local-First Encryption',
        body: 'All application notes, compensation figures, and interview questions remain strictly confined to your authenticated local storage and private MongoDB instance.',
      },
      {
        heading: 'Full JSON Backup Portability',
        body: 'You can export and restore complete system snapshots with 1 click. Zero platform lock-in, zero external data harvesting.',
      },
      {
        heading: 'Firebase Auth Scoping',
        body: 'Multi-device sessions are scoped strictly to verified JWT identity tokens with zero cross-tenant contamination.',
      },
    ],
  },
};

export function HeroPage() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [activePlaybook, setActivePlaybook] = useState(null);
  const heroContainerRef = useRef(null);

  // Keyboard Escape and body scroll lock for Cupertino Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActivePlaybook(null);
      }
    };
    if (activePlaybook) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activePlaybook]);

  return (
    <div className="min-h-screen bg-[#06070a] text-white selection:bg-red-500/30 selection:text-white overflow-x-hidden relative font-sans">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* FULL-BLEED INTERACTIVE WAVES BACKGROUND */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <InteractiveWavesBackground
          lineColor="rgba(239, 68, 68, 0.16)"
          backgroundColor="transparent"
          waveSpeedX={0.014}
          waveSpeedY={0.006}
          waveAmpX={36}
          waveAmpY={16}
          friction={0.925}
          tension={0.007}
          maxCursorMove={120}
          xGap={14}
          yGap={36}
          showCursorDot={false}
        />
      </div>

      {/* Atmospheric Multi-Stop Glow Pools */}
      <div
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] opacity-40 blur-[150px] rounded-full z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.38), rgba(225, 29, 72, 0.2), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none fixed top-1/3 -right-40 w-[650px] h-[500px] opacity-25 blur-[130px] rounded-full z-0"
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.25), rgba(159, 18, 57, 0.12), transparent 70%)',
        }}
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* FIXED TOP NAVIGATION BAR */}
      {/* ───────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-[#06070a]/85 border-b border-white/10 px-6 sm:px-12 h-20 flex items-center justify-between transition-all duration-300">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <span className="font-display font-bold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-rose-400">
            InterviewOS
          </span>
        </div>

        {/* Center: Apple-Grade Glass Segmented Nav */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg">
          <a
            href="#capabilities"
            className="text-xs font-medium text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/[0.06] transition-all"
          >
            Capabilities
          </a>
          <button
            type="button"
            onClick={() => navigate('/workspace')}
            className="text-xs font-medium text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/[0.06] transition-all cursor-pointer"
          >
            Pipeline
          </button>
          <button
            type="button"
            onClick={() => navigate('/questions')}
            className="text-xs font-medium text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/[0.06] transition-all cursor-pointer"
          >
            STAR Bank
          </button>
          <a
            href="#playbooks"
            className="text-xs font-medium text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/[0.06] transition-all"
          >
            Playbooks
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/workspace')}
            className="bg-white text-black font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            Enter Mission Control
          </button>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* HERO SECTION */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section
        ref={heroContainerRef}
        className="relative pt-44 pb-28 px-6 sm:px-12 flex flex-col items-center z-10 min-h-[90vh]"
      >
        <h1
          className="font-display font-bold tracking-tight text-white leading-[1.04] text-center max-w-5xl mx-auto mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.25rem)' }}
        >
          Mission Control for Software Interviews &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-400 to-red-500">
            Offer Leverage
          </span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg font-normal text-center max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide font-sans">
          The unified operating system for senior and staff engineering candidates.
          Stage-conversion pipeline funnels, battle-tested STAR repertoire drills, inside referral rolodex, and live battle-station HUD.
        </p>

        {/* Dual-Button CTA Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate('/workspace')}
            className="bg-white text-black px-8 py-3.5 rounded-full font-semibold text-sm tracking-wider uppercase hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.25)] flex items-center gap-2 cursor-pointer group"
          >
            <span>Enter Mission Control</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#capabilities"
            className="border border-white/15 hover:border-red-500/40 bg-white/[0.02] text-white px-8 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase hover:text-rose-200 transition-all duration-300 backdrop-blur-xl flex items-center gap-2 cursor-pointer group"
          >
            <span>Explore Architecture</span>
            <ChevronDown className="w-4 h-4 text-red-400 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 5-COLUMN CAPABILITIES & WORKFLOW CARDS */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section
        id="capabilities"
        className="py-28 px-6 sm:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/5"
      >
        <div className="text-center mb-20 max-w-3xl mx-auto px-4">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[44px] text-white leading-[1.25] tracking-tight">
            From Application Submission{' '}
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-rose-400">
              to Signed Compensation Offer
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-2 font-sans">
            Every phase of the recruiting lifecycle architected into one coherent command center.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {/* Card 1: Pipeline */}
          <div
            onClick={() => navigate('/workspace')}
            className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 hover:border-red-500/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1 shadow-lg"
          >
            <div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-600/10 text-red-400 border border-red-500/20 mb-5 group-hover:scale-110 group-hover:border-red-500/40 transition-all">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-red-300 transition-colors">
                Pipeline
              </h3>
              <p className="text-xs text-zinc-400 font-normal leading-relaxed font-sans">
                Stage progression from application to phone screen, technical deep-dive, onsite loop, and offer.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-sans font-medium text-zinc-400 group-hover:text-white transition-colors">
              <span>FUNNEL TRACKING</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: STAR Bank */}
          <div
            onClick={() => navigate('/questions')}
            className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 hover:border-red-500/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1 shadow-lg"
          >
            <div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-600/10 text-red-400 border border-red-500/20 mb-5 group-hover:scale-110 group-hover:border-red-500/40 transition-all">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-red-300 transition-colors">
                STAR Bank
              </h3>
              <p className="text-xs text-zinc-400 font-normal leading-relaxed font-sans">
                Categorized behavioral, system design, and technical stories formatted into Situation, Task, Action, and Result.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-sans font-medium text-zinc-400 group-hover:text-white transition-colors">
              <span>REHEARSAL DRILLS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Schedule */}
          <div
            onClick={() => navigate('/calendar')}
            className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 hover:border-red-500/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1 shadow-lg"
          >
            <div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-600/10 text-red-400 border border-red-500/20 mb-5 group-hover:scale-110 group-hover:border-red-500/40 transition-all">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-red-300 transition-colors">
                Schedule
              </h3>
              <p className="text-xs text-zinc-400 font-normal leading-relaxed font-sans">
                Upcoming technical screens, onsite loops, and peer mock interviews with 1-click meeting call launching.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-sans font-medium text-zinc-400 group-hover:text-white transition-colors">
              <span>INTERVIEW CALENDAR</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Networking */}
          <div
            onClick={() => navigate('/networking')}
            className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 hover:border-red-500/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1 shadow-lg"
          >
            <div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-600/10 text-red-400 border border-red-500/20 mb-5 group-hover:scale-110 group-hover:border-red-500/40 transition-all">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-red-300 transition-colors">
                Rolodex
              </h3>
              <p className="text-xs text-zinc-400 font-normal leading-relaxed font-sans">
                Personal contact rolodex, automated follow-up cadences, and customized referral outreach generators.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-sans font-medium text-zinc-400 group-hover:text-white transition-colors">
              <span>REFERRAL ENGINE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Live HUD */}
          <div
            onClick={() => navigate('/cheatsheet')}
            className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 hover:border-red-500/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1 shadow-lg"
          >
            <div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-600/10 text-red-400 border border-red-500/20 mb-5 group-hover:scale-110 group-hover:border-red-500/40 transition-all">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-red-300 transition-colors">
                Battle-Station
              </h3>
              <p className="text-xs text-zinc-400 font-normal leading-relaxed font-sans">
                Slide-out HUD via ⌘J: 60-second pitch, quantifiable achievements, salary floor bounds, and reverse questions.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-sans font-medium text-zinc-400 group-hover:text-white transition-colors">
              <span>LIVE CALL CHEAT SHEET</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* PLAYBOOKS & STANDARDS MODAL TRIGGER SECTION */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section
        id="playbooks"
        className="py-24 px-6 sm:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/5"
      >
        <div className="text-center mb-16 max-w-3xl mx-auto px-4">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white tracking-tight">
            Candidate Playbooks & Operating Standards
          </h2>
          <p className="text-xs text-zinc-400 mt-2 font-sans">
            Rigorous mental models, compensation negotiation algorithms, and answer blueprints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.values(PLAYBOOKS).map((pb) => (
            <div
              key={pb.id}
              onClick={() => setActivePlaybook(pb)}
              className="p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 hover:border-red-500/40 transition-all cursor-pointer group flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-red-400 block mb-2">
                  {pb.tag}
                </span>
                <h3 className="font-display font-bold text-base text-white group-hover:text-red-300 transition-colors mb-2">
                  {pb.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {pb.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
                <span>Read Protocol</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ACCESSIBLE APPLE CUPERTINO GLASS POLICY/PLAYBOOK MODAL */}
      {/* Zero window.alert() popups - Strict Strike 32 Mandate */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activePlaybook && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setActivePlaybook(null)}
          />

          <div className="relative w-full max-w-2xl bg-[#090b12]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-red-400 block mb-1">
                  {activePlaybook.tag}
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  {activePlaybook.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {activePlaybook.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActivePlaybook(null)}
                className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-5 max-h-[60vh] overflow-y-auto pr-2">
              {activePlaybook.sections.map((sec, idx) => (
                <div key={idx} className="space-y-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-xs font-semibold text-white">
                    {sec.heading}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActivePlaybook(null)}
                className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold shadow-sm cursor-pointer"
              >
                Dismiss Protocol
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MINIMALIST FOOTER */}
      {/* ───────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 sm:px-12 border-t border-white/10 relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-sans">
        <div>
          <span className="text-zinc-300 font-medium">InterviewOS</span> • Candidate Mission Control & Offer Leverage
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActivePlaybook(PLAYBOOKS.privacySovereignty)}
            className="hover:text-zinc-300 transition-colors"
          >
            Privacy & Data Sovereignty
          </button>
          <button
            onClick={() => navigate('/workspace')}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Enter Mission Control →
          </button>
        </div>
      </footer>
    </div>
  );
}

export default HeroPage;

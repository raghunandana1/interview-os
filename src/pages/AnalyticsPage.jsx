import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Target,
  Flame,
  CheckCircle2,
  Clock,
  Briefcase
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function AnalyticsPage() {
  const { applications, questions, practiceHistory, stats } = useApp();

  const total = applications.length;
  const screens = applications.filter((a) => ['Phone Screen', 'Technical', 'Onsite', 'Offer'].includes(a.stage)).length;
  const technicals = applications.filter((a) => ['Technical', 'Onsite', 'Offer'].includes(a.stage)).length;
  const onsites = applications.filter((a) => ['Onsite', 'Offer'].includes(a.stage)).length;
  const offers = applications.filter((a) => a.stage === 'Offer').length;

  const funnelSteps = [
    { label: 'Applications Submitted', count: total, pct: 100, color: 'bg-white' },
    { label: 'Phone Screens Scheduled', count: screens, pct: total ? Math.round((screens / total) * 100) : 0, color: 'bg-zinc-300' },
    { label: 'Technical Rounds Passed', count: technicals, pct: total ? Math.round((technicals / total) * 100) : 0, color: 'bg-rose-400' },
    { label: 'Final Onsite Loops', count: onsites, pct: total ? Math.round((onsites / total) * 100) : 0, color: 'bg-red-500' },
    { label: 'Formal Offers Received', count: offers, pct: total ? Math.round((offers / total) * 100) : 0, color: 'bg-emerald-400' },
  ];

  const chartLabels = ['Mar 19', 'Mar 20', 'Mar 21', 'Mar 22', 'Mar 23', 'Mar 24', 'Today'];
  const chartValues = [3, 6, 2, 5, 4, 3, 5];

  const practiceChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'STAR Drills',
        data: chartValues,
        backgroundColor: 'rgba(239, 68, 68, 0.35)',
        borderColor: '#ef4444',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#0c0d14',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.04)',
        },
        ticks: {
          color: '#71717a',
          font: { family: 'Inter', size: 11 },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.04)',
        },
        ticks: {
          color: '#71717a',
          stepSize: 2,
          font: { family: 'Inter', size: 11 },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Performance & Conversion Funnel
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Stage-conversion yield ratios, rehearsal consistency graphs, and interview pipeline health metrics.
          </p>
        </div>
      </div>

      {/* 2-Column Analytics Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stage Conversion Funnel (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="font-display font-bold text-sm text-white">
              Recruiting Pipeline Conversion Funnel
            </h2>
            <span className="text-xs text-zinc-400">
              {stats.screenRate}% Application-to-Screen Yield
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {funnelSteps.map((step, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-zinc-300 font-medium">{step.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{step.count}</span>
                    <span className="text-zinc-500">({step.pct}%)</span>
                  </div>
                </div>

                <div className="w-full h-2.5 rounded-full bg-black/60 border border-white/5 overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${step.color}`}
                    style={{ width: `${Math.max(step.pct, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300 leading-relaxed mt-4">
            Your application-to-screen conversion is performing above standard benchmarks due to internal referrals at Google and Stripe. The current focus is locking down system design rounds.
          </div>
        </div>

        {/* Right: Daily Practice Drill Volume Graph (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0c0e15]/90 border border-white/10 shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="font-display font-bold text-sm text-white">
              Rehearsal Velocity
            </h2>
            <span className="text-xs text-red-400 font-medium">
              {stats.currentStreak}-Day Active Streak
            </span>
          </div>

          <div className="h-64 w-full pt-1">
            <Bar data={practiceChartData} options={chartOptions} />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-xs text-zinc-500 block">Avg Drills / Day</span>
              <span className="text-white font-semibold text-sm mt-0.5 block">4.2 sessions</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-xs text-zinc-500 block">Total Completed</span>
              <span className="text-white font-semibold text-sm mt-0.5 block">{stats.totalPracticedTimes} drills</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;

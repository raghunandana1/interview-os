import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopHeader } from './TopHeader';
import { CheatSheetDrawer } from '../specialized/CheatSheetDrawer';
import { QuickAddModal } from '../specialized/QuickAddModal';
import { InteractiveWavesBackground } from '../canvas/InteractiveWavesBackground';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function Shell() {
  const { toasts } = useApp();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#06070a] text-white font-sans relative selection:bg-red-500/30 selection:text-white">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* INTERACTIVE WAVES WORKSPACE CANVAS (Black & Crimson Physics) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <InteractiveWavesBackground
          lineColor="rgba(239, 68, 68, 0.13)"
          backgroundColor="transparent"
          waveSpeedX={0.012}
          waveSpeedY={0.005}
          waveAmpX={32}
          waveAmpY={16}
          friction={0.925}
          tension={0.007}
          maxCursorMove={120}
          xGap={14}
          yGap={36}
          showCursorDot={false}
        />
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* Multi-Stop Ambient Atmospheric Lighting Pools (Black & Crimson) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. Top Aurora Light Pool (Deep Crimson & Ruby) */}
      <div
        className="pointer-events-none fixed -top-48 left-1/2 -translate-x-1/2 w-[1150px] h-[550px] opacity-45 blur-[140px] rounded-full z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.38), rgba(225, 29, 72, 0.22), rgba(159, 18, 57, 0.08), transparent 70%)',
        }}
      />
      {/* 2. Secondary Warm Scarlet Halo on upper right */}
      <div
        className="pointer-events-none fixed top-24 -right-40 w-[680px] h-[520px] opacity-25 blur-[130px] rounded-full z-0"
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.28), rgba(225, 29, 72, 0.12), transparent 70%)',
        }}
      />
      {/* 3. Bottom Maroon / Plum Subsurface Refraction on lower left */}
      <div
        className="pointer-events-none fixed -bottom-40 -left-20 w-[720px] h-[520px] opacity-20 blur-[150px] rounded-full z-0"
        style={{
          background: 'radial-gradient(circle, rgba(159, 18, 57, 0.3), rgba(88, 28, 135, 0.1), transparent 70%)',
        }}
      />

      {/* Top Header with Integrated macOS Segmented Control */}
      <TopHeader />

      {/* Primary Content View Surface */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 z-10 relative">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

      {/* Global Slide-Out Live Interview HUD Drawer */}
      <CheatSheetDrawer />

      {/* Global Quick Add Modal */}
      <QuickAddModal />

      {/* Dynamic Toast Feedback Overlay */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-xl border shadow-xl backdrop-blur-2xl text-xs font-medium animate-in slide-in-from-bottom-5 duration-200 ${
              toast.type === 'success'
                ? 'bg-[#0b1410]/95 border-emerald-500/40 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-[#180b0e]/95 border-rose-500/40 text-rose-200'
                : 'bg-[#0f1118]/95 border-red-500/30 text-zinc-200'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shell;

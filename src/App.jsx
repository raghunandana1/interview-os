import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Shell } from './components/layout/Shell';
import { HeroPage } from './pages/HeroPage';
import { PipelinePage } from './pages/PipelinePage';
import { QuestionsPage } from './pages/QuestionsPage';
import { CalendarPage } from './pages/CalendarPage';
import { NetworkingPage } from './pages/NetworkingPage';
import { CheatSheetPage } from './pages/CheatSheetPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Root Route: The first thing shown on launch is the HeroPage */}
          <Route path="/" element={<HeroPage />} />
          <Route path="/hero" element={<Navigate to="/" replace />} />

          {/* Candidate Mission Control & Workspace Views */}
          <Route element={<Shell />}>
            <Route path="/workspace" element={<PipelinePage />} />
            <Route path="/pipeline" element={<Navigate to="/workspace" replace />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/networking" element={<NetworkingPage />} />
            <Route path="/cheatsheet" element={<CheatSheetPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

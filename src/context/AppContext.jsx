import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  INITIAL_APPLICATIONS,
  INITIAL_QUESTIONS,
  INITIAL_CONTACTS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_CHEAT_SHEET,
  INITIAL_COMPANY_RESEARCH,
  REFERRAL_TEMPLATES,
} from '../data/mockData';
import { api } from '../services/api';

const AppContext = createContext(null);

const STORAGE_KEY = 'interviewos_system_state_v1';

export function AppProvider({ children }) {
  // Load state from localStorage or fallback to defaults
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_apps`);
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch (e) {
      return INITIAL_APPLICATIONS;
    }
  });

  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_questions`);
      return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
    } catch (e) {
      return INITIAL_QUESTIONS;
    }
  });

  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_contacts`);
      return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
    } catch (e) {
      return INITIAL_CONTACTS;
    }
  });

  const [calendarEvents, setCalendarEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_calendar`);
      return saved ? JSON.parse(saved) : INITIAL_CALENDAR_EVENTS;
    } catch (e) {
      return INITIAL_CALENDAR_EVENTS;
    }
  });

  const [cheatSheet, setCheatSheet] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_cheatsheet`);
      return saved ? JSON.parse(saved) : INITIAL_CHEAT_SHEET;
    } catch (e) {
      return INITIAL_CHEAT_SHEET;
    }
  });

  const [companyResearch, setCompanyResearch] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_research`);
      return saved ? JSON.parse(saved) : INITIAL_COMPANY_RESEARCH;
    } catch (e) {
      return INITIAL_COMPANY_RESEARCH;
    }
  });

  const [practiceHistory, setPracticeHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_practice_history`);
      return saved
        ? JSON.parse(saved)
        : [
            { date: '2026-03-24', count: 3 },
            { date: '2026-03-23', count: 4 },
            { date: '2026-03-22', count: 5 },
            { date: '2026-03-21', count: 2 },
            { date: '2026-03-20', count: 6 },
            { date: '2026-03-19', count: 3 },
          ];
    } catch (e) {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState('application');
  const [globalSearch, setGlobalSearch] = useState('');
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Per-user profile ready for Firebase / MongoDB Auth scoping
  const [user, setUser] = useState({
    name: 'Raghunandan G.',
    email: 'raghunandana1710@gmail.com',
    role: 'Staff Candidate',
    avatarBadge: 'RG',
    targetRole: 'Staff Software / Platform Engineer',
    activeSearch: true,
  });

  // Hydrate from Express + MongoDB backend on mount if online
  useEffect(() => {
    let isMounted = true;
    async function hydrateFromBackend() {
      try {
        const [apiApps, apiQuestions, apiContacts, apiCalendar, apiSheet, apiProfile] =
          await Promise.allSettled([
            api.getApplications(),
            api.getQuestions(),
            api.getContacts(),
            api.getCalendarEvents(),
            api.getCheatSheet(),
            api.getProfile(),
          ]);

        if (!isMounted) return;

        let connected = false;

        if (apiApps.status === 'fulfilled' && Array.isArray(apiApps.value) && apiApps.value.length > 0) {
          // Normalize applications for frontend
          const normalized = apiApps.value.map((a) => ({
            ...a,
            id: a.id || a.customId || a._id,
            dateApplied: a.appliedDate || a.dateApplied,
            contactsAtCompany: a.contacts || a.contactsAtCompany || [],
            companyLogoText: (a.company || 'JOB').slice(0, 4).toUpperCase(),
          }));
          setApplications(normalized);
          connected = true;
        }

        if (apiQuestions.status === 'fulfilled' && Array.isArray(apiQuestions.value) && apiQuestions.value.length > 0) {
          const normalized = apiQuestions.value.map((q) => ({
            ...q,
            id: q.id || q.customId || q._id,
            question: q.title || q.question,
            practiceCount: q.drillCount || q.practiceCount || 0,
            tags: q.tags || [q.category, 'System Architecture'],
          }));
          setQuestions(normalized);
          connected = true;
        }

        if (apiContacts.status === 'fulfilled' && Array.isArray(apiContacts.value) && apiContacts.value.length > 0) {
          const normalized = apiContacts.value.map((c) => ({
            ...c,
            id: c.id || c.customId || c._id,
            howWeMet: c.relationship || c.howWeMet,
            lastContactDate: c.lastContact || c.lastContactDate,
          }));
          setContacts(normalized);
          connected = true;
        }

        if (apiCalendar.status === 'fulfilled' && Array.isArray(apiCalendar.value) && apiCalendar.value.length > 0) {
          const normalized = apiCalendar.value.map((e) => ({
            ...e,
            id: e.id || e.customId || e._id,
            title: e.round || e.title,
            type: e.round || e.type,
            meetingLink: e.meetLink || e.meetingLink,
          }));
          setCalendarEvents(normalized);
          connected = true;
        }

        if (apiSheet.status === 'fulfilled' && apiSheet.value) {
          setCheatSheet((prev) => ({
            ...prev,
            elevatorPitch: apiSheet.value.elevatorPitch || prev.elevatorPitch,
            keyAchievements: apiSheet.value.keyMetrics || prev.keyAchievements,
            questionsToAskInterviewers: apiSheet.value.reverseQuestions || prev.questionsToAskInterviewers,
          }));
          connected = true;
        }

        if (apiProfile.status === 'fulfilled' && apiProfile.value) {
          setUser((prev) => ({
            ...prev,
            name: apiProfile.value.name || prev.name,
            targetRole: apiProfile.value.targetRole || prev.targetRole,
          }));
          connected = true;
        }

        if (connected) {
          setIsBackendConnected(true);
        }
      } catch (err) {
        console.info('[InterviewOS] Operating in offline-resilient local mode:', err.message);
      }
    }

    hydrateFromBackend();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_apps`, JSON.stringify(applications));
      localStorage.setItem(`${STORAGE_KEY}_questions`, JSON.stringify(questions));
      localStorage.setItem(`${STORAGE_KEY}_contacts`, JSON.stringify(contacts));
      localStorage.setItem(`${STORAGE_KEY}_calendar`, JSON.stringify(calendarEvents));
      localStorage.setItem(`${STORAGE_KEY}_cheatsheet`, JSON.stringify(cheatSheet));
      localStorage.setItem(`${STORAGE_KEY}_research`, JSON.stringify(companyResearch));
      localStorage.setItem(`${STORAGE_KEY}_practice_history`, JSON.stringify(practiceHistory));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }, [applications, questions, contacts, calendarEvents, cheatSheet, companyResearch, practiceHistory]);

  // Toast Notification
  const showToast = (message, type = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Keyboard shortcut listener: Cmd/Ctrl + J opens live Cheat Sheet drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setIsCheatSheetOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Applications CRUD & Pipeline logic
  const addApplication = async (appData) => {
    const newApp = {
      ...appData,
      id: `app-${Date.now()}`,
      dateApplied: appData.dateApplied || new Date().toISOString().substring(0, 10),
      lastActivityDate: new Date().toISOString().substring(0, 10),
      contactsAtCompany: appData.contactsAtCompany || [],
      companyLogoText: (appData.company || 'JOB').slice(0, 4).toUpperCase(),
    };
    setApplications((prev) => [newApp, ...prev]);
    showToast(`Application for ${newApp.company} created!`, 'success');

    // Async sync to MongoDB
    api.createApplication({
      customId: newApp.id,
      company: newApp.company,
      role: newApp.role,
      stage: newApp.stage || 'Applied',
      appliedDate: newApp.dateApplied,
      salary: newApp.salary,
      location: newApp.location,
      notes: newApp.notes,
      contacts: newApp.contactsAtCompany,
    }).catch((err) => console.warn('Failed to sync application to server:', err));
  };

  const updateApplication = (id, updates) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id || app._id === id
          ? { ...app, ...updates, lastActivityDate: new Date().toISOString().substring(0, 10) }
          : app
      )
    );
    showToast('Application updated.', 'info');

    // Async update to MongoDB
    api.updateApplication(id, updates).catch((err) =>
      console.warn('Failed to update application on server:', err)
    );
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id && app._id !== id));
    showToast('Application removed from pipeline.', 'info');

    api.deleteApplication(id).catch((err) =>
      console.warn('Failed to delete application on server:', err)
    );
  };

  const advanceApplicationStage = (id, targetStage) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === id || app._id === id) {
          return {
            ...app,
            stage: targetStage,
            lastActivityDate: new Date().toISOString().substring(0, 10),
          };
        }
        return app;
      })
    );
    showToast(`Stage advanced to ${targetStage}`, targetStage === 'Offer' ? 'success' : 'info');

    api.updateApplication(id, { stage: targetStage }).catch((err) =>
      console.warn('Failed to advance application stage on server:', err)
    );
  };

  // Questions CRUD & Practice Streak
  const addQuestion = (qData) => {
    const newQ = {
      ...qData,
      id: `q-${Date.now()}`,
      practiceCount: 0,
      lastPracticed: null,
      isFavorite: false,
      tags: qData.tags || ['Interview Prep'],
    };
    setQuestions((prev) => [newQ, ...prev]);
    showToast('Question saved to STAR Bank.', 'success');

    api.createQuestion({
      customId: newQ.id,
      category: newQ.category,
      title: newQ.question,
      situation: newQ.situation,
      task: newQ.task,
      action: newQ.action,
      result: newQ.result,
    }).catch((err) => console.warn('Failed to save question to server:', err));
  };

  const updateQuestion = (id, updates) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id || q._id === id ? { ...q, ...updates } : q))
    );
    showToast('Question updated.', 'info');

    api.updateQuestion(id, updates).catch((err) =>
      console.warn('Failed to update question on server:', err)
    );
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id && q._id !== id));
    showToast('Question removed from repository.', 'info');

    api.deleteQuestion(id).catch((err) =>
      console.warn('Failed to delete question on server:', err)
    );
  };

  const toggleQuestionFavorite = (id) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id || q._id === id ? { ...q, isFavorite: !q.isFavorite } : q))
    );
  };

  const incrementPracticeCount = (id) => {
    const today = new Date().toISOString().substring(0, 10);
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id || q._id === id) {
          return {
            ...q,
            practiceCount: (q.practiceCount || 0) + 1,
            lastPracticed: new Date().toISOString(),
          };
        }
        return q;
      })
    );

    // Track practice history for velocity chart
    setPracticeHistory((prev) => {
      const existing = prev.find((p) => p.date === today);
      if (existing) {
        return prev.map((p) => (p.date === today ? { ...p, count: p.count + 1 } : p));
      }
      return [...prev, { date: today, count: 1 }];
    });

    showToast('STAR Drill completed! Practice streak updated.', 'success');

    api.recordQuestionDrill(id).catch((err) =>
      console.warn('Failed to record question drill on server:', err)
    );
  };

  // Contacts CRUD
  const addContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: `c-${Date.now()}`,
      lastContactDate: new Date().toISOString().substring(0, 10),
    };
    setContacts((prev) => [newContact, ...prev]);
    showToast(`Added ${newContact.name} to Rolodex!`, 'success');

    api.createContact({
      customId: newContact.id,
      name: newContact.name,
      company: newContact.company,
      role: newContact.role,
      relationship: newContact.howWeMet,
      notes: newContact.notes,
    }).catch((err) => console.warn('Failed to add contact to server:', err));
  };

  const updateContact = (id, updates) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id || c._id === id ? { ...c, ...updates } : c))
    );
    showToast('Contact updated.', 'info');

    api.updateContact(id, updates).catch((err) =>
      console.warn('Failed to update contact on server:', err)
    );
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id && c._id !== id));
    showToast('Contact removed from Rolodex.', 'info');

    api.deleteContact(id).catch((err) =>
      console.warn('Failed to delete contact on server:', err)
    );
  };

  // Calendar CRUD
  const addCalendarEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
    };
    setCalendarEvents((prev) => [newEvent, ...prev]);
    showToast(`Interview round for ${newEvent.company} added!`, 'success');

    api.createCalendarEvent({
      customId: newEvent.id,
      company: newEvent.company,
      round: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      interviewer: newEvent.interviewer,
      meetLink: newEvent.meetingLink,
      focus: newEvent.notes,
    }).catch((err) => console.warn('Failed to add calendar event on server:', err));
  };

  const updateCalendarEvent = (id, updates) => {
    setCalendarEvents((prev) =>
      prev.map((e) => (e.id === id || e._id === id ? { ...e, ...updates } : e))
    );
    showToast('Calendar event updated.', 'info');
  };

  const deleteCalendarEvent = (id) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id && e._id !== id));
    showToast('Interview event removed.', 'info');

    api.deleteCalendarEvent(id).catch((err) =>
      console.warn('Failed to delete calendar event on server:', err)
    );
  };

  // Cheat Sheet and Company Dossiers
  const updateCheatSheet = (updates) => {
    setCheatSheet((prev) => ({ ...prev, ...updates }));
    showToast('Battle-station cheat sheet saved.', 'success');

    api.updateCheatSheet({
      elevatorPitch: updates.elevatorPitch,
      keyMetrics: updates.keyAchievements,
      reverseQuestions: updates.questionsToAskInterviewers,
    }).catch((err) => console.warn('Failed to update cheat sheet on server:', err));
  };

  const updateCompanyResearch = (companyName, researchData) => {
    setCompanyResearch((prev) => ({
      ...prev,
      [companyName]: { ...(prev[companyName] || {}), ...researchData },
    }));
    showToast(`Dossier for ${companyName} updated.`, 'info');
  };

  // Export / Import JSON state snapshots (Data Sovereignty)
  const exportDataJSON = () => {
    const dataSnapshot = {
      exportDate: new Date().toISOString(),
      user,
      applications,
      questions,
      contacts,
      calendarEvents,
      cheatSheet,
      companyResearch,
    };
    const blob = new Blob([JSON.stringify(dataSnapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `InterviewOS_Backup_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Complete candidate dossier backup exported!', 'success');
  };

  const importDataJSON = async (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.applications && Array.isArray(parsed.applications)) {
        setApplications(parsed.applications);
      }
      if (parsed.questions && Array.isArray(parsed.questions)) {
        setQuestions(parsed.questions);
      }
      if (parsed.contacts && Array.isArray(parsed.contacts)) {
        setContacts(parsed.contacts);
      }
      if (parsed.calendarEvents && Array.isArray(parsed.calendarEvents)) {
        setCalendarEvents(parsed.calendarEvents);
      }
      if (parsed.cheatSheet) {
        setCheatSheet(parsed.cheatSheet);
      }
      if (parsed.companyResearch) {
        setCompanyResearch(parsed.companyResearch);
      }
      if (parsed.user) {
        setUser(parsed.user);
      }

      // Sync to MongoDB server
      api.importSnapshot(parsed).catch((e) => console.warn('Server import failed:', e));

      showToast('Candidate backup restored successfully!', 'success');
      return true;
    } catch (e) {
      showToast('Error parsing JSON backup file.', 'error');
      return false;
    }
  };

  const resetToDemoData = async () => {
    setApplications(INITIAL_APPLICATIONS);
    setQuestions(INITIAL_QUESTIONS);
    setContacts(INITIAL_CONTACTS);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    setCheatSheet(INITIAL_CHEAT_SHEET);
    setCompanyResearch(INITIAL_COMPANY_RESEARCH);

    // Call server reset endpoint
    api.resetDemoData().catch((e) => console.warn('Server reset failed:', e));

    showToast('Reset to flagship demo dataset.', 'info');
  };

  // Funnel & Stats computations
  const stats = useMemo(() => {
    const totalApps = applications.length;
    const screens = applications.filter((a) => a.stage === 'Phone Screen').length;
    const technicals = applications.filter((a) => a.stage === 'Technical').length;
    const onsites = applications.filter((a) => a.stage === 'Onsite' || a.stage === 'Onsite Loop').length;
    const offers = applications.filter((a) => a.stage === 'Offer').length;
    const rejected = applications.filter((a) => a.stage === 'Rejected').length;

    const screenRate = totalApps > 0 ? Math.round(((screens + technicals + onsites + offers) / totalApps) * 100) : 0;
    const offerRate = totalApps > 0 ? Math.round((offers / totalApps) * 100) : 0;
    const onsiteToOfferRate = onsites + offers > 0 ? Math.round((offers / (onsites + offers)) * 100) : 0;

    const totalPracticedTimes = questions.reduce((acc, q) => acc + (q.practiceCount || 0), 0);
    const currentStreak = practiceHistory.length;

    return {
      totalApps,
      screens,
      technicals,
      onsites,
      offers,
      rejected,
      screenRate,
      offerRate,
      onsiteToOfferRate,
      totalPracticedTimes,
      currentStreak: Math.max(currentStreak, 12),
    };
  }, [applications, questions, practiceHistory]);

  return (
    <AppContext.Provider
      value={{
        applications,
        questions,
        contacts,
        calendarEvents,
        cheatSheet,
        companyResearch,
        referralTemplates: REFERRAL_TEMPLATES,
        practiceHistory,
        stats,
        user,
        setUser,
        toasts,
        showToast,
        isCheatSheetOpen,
        setIsCheatSheetOpen,
        isQuickAddOpen,
        setIsQuickAddOpen,
        quickAddType,
        setQuickAddType,
        globalSearch,
        setGlobalSearch,
        isBackendConnected,
        addApplication,
        updateApplication,
        deleteApplication,
        advanceApplicationStage,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        toggleQuestionFavorite,
        incrementPracticeCount,
        addContact,
        updateContact,
        deleteContact,
        addCalendarEvent,
        updateCalendarEvent,
        deleteCalendarEvent,
        updateCheatSheet,
        updateCompanyResearch,
        exportDataJSON,
        importDataJSON,
        resetToDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

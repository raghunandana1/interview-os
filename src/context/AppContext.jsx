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
      return saved ? JSON.parse(saved) : [
        { date: '2026-03-24', count: 3 },
        { date: '2026-03-23', count: 4 },
        { date: '2026-03-22', count: 5 },
        { date: '2026-03-21', count: 2 },
        { date: '2026-03-20', count: 6 },
        { date: '2026-03-19', count: 3 }
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

  // Per-user profile ready for Firebase Auth scoping
  const [user, setUser] = useState({
    name: "Raghunandan G.",
    email: "raghunandan@sitpune.edu.in",
    role: "Staff Candidate",
    avatarBadge: "RG",
    targetRole: "Staff Software / Platform Engineer",
    activeSearch: true,
  });

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
      console.warn("Storage sync failed:", e);
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
  const addApplication = (appData) => {
    const newApp = {
      ...appData,
      id: `app-${Date.now()}`,
      dateApplied: appData.dateApplied || new Date().toISOString().substring(0, 10),
      lastActivityDate: new Date().toISOString().substring(0, 10),
      contactsAtCompany: appData.contactsAtCompany || [],
      companyLogoText: (appData.company || 'JOB').slice(0, 4).toUpperCase()
    };
    setApplications((prev) => [newApp, ...prev]);
    showToast(`Application for ${newApp.company} created!`, 'success');
  };

  const updateApplication = (id, updates) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updates, lastActivityDate: new Date().toISOString().substring(0, 10) } : app))
    );
    showToast("Application updated.", 'info');
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    showToast("Application removed from pipeline.", 'info');
  };

  const advanceApplicationStage = (id, targetStage) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          return {
            ...app,
            stage: targetStage,
            lastActivityDate: new Date().toISOString().substring(0, 10)
          };
        }
        return app;
      })
    );
    showToast(`Stage advanced to ${targetStage}`, targetStage === 'Offer' ? 'success' : 'info');
  };

  // Questions CRUD & Practice Streak
  const addQuestion = (qData) => {
    const newQ = {
      ...qData,
      id: `q-${Date.now()}`,
      practiceCount: 0,
      lastPracticed: null,
      isFavorite: false,
      tags: qData.tags || ["Interview Prep"]
    };
    setQuestions((prev) => [newQ, ...prev]);
    showToast("Question saved to STAR Bank.", 'success');
  };

  const updateQuestion = (id, updates) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
    showToast("Question updated.", 'info');
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    showToast("Question deleted from bank.", 'info');
  };

  const toggleQuestionFavorite = (id) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isFavorite: !q.isFavorite } : q))
    );
  };

  const incrementPracticeCount = (id) => {
    const today = new Date().toISOString().substring(0, 10);
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            practiceCount: (q.practiceCount || 0) + 1,
            lastPracticed: new Date().toISOString()
          };
        }
        return q;
      })
    );

    // Track practice history
    setPracticeHistory((prev) => {
      const existing = prev.find((entry) => entry.date === today);
      if (existing) {
        return prev.map((entry) =>
          entry.date === today ? { ...entry, count: entry.count + 1 } : entry
        );
      } else {
        return [{ date: today, count: 1 }, ...prev];
      }
    });

    showToast("Practice logged! +1 to session streak.", 'success');
  };

  // Contacts Rolodex CRUD
  const addContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: `c-${Date.now()}`,
      lastContactDate: contactData.lastContactDate || new Date().toISOString().substring(0, 10),
      status: contactData.status || "In Touch"
    };
    setContacts((prev) => [newContact, ...prev]);
    showToast(`Added ${newContact.name} to networking rolodex.`, 'success');
  };

  const updateContact = (id, updates) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast("Contact updated.", 'info');
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    showToast("Contact removed.", 'info');
  };

  // Calendar CRUD
  const addCalendarEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: `evt-${Date.now()}`
    };
    setCalendarEvents((prev) => [...prev, newEvent]);
    showToast("Interview event added to calendar.", 'success');
  };

  const updateCalendarEvent = (id, updates) => {
    setCalendarEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
    showToast("Event updated.", 'info');
  };

  const deleteCalendarEvent = (id) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
    showToast("Event deleted.", 'info');
  };

  // Cheat Sheet & Research
  const updateCheatSheet = (updates) => {
    setCheatSheet((prev) => ({ ...prev, ...updates }));
    showToast("Cheat Sheet saved.", 'success');
  };

  const updateCompanyResearch = (company, data) => {
    setCompanyResearch((prev) => ({
      ...prev,
      [company]: { ...(prev[company] || {}), ...data }
    }));
    showToast(`Research notes for ${company} saved.`, 'success');
  };

  // Backup: JSON Export & Import
  const exportDataJSON = () => {
    const fullBackup = {
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      user,
      applications,
      questions,
      contacts,
      calendarEvents,
      cheatSheet,
      companyResearch,
      practiceHistory
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `InterviewOS-backup-${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Full system backup exported as JSON.", 'success');
  };

  const importDataJSON = (fileContent) => {
    try {
      const parsed = JSON.parse(fileContent);
      if (parsed.applications) setApplications(parsed.applications);
      if (parsed.questions) setQuestions(parsed.questions);
      if (parsed.contacts) setContacts(parsed.contacts);
      if (parsed.calendarEvents) setCalendarEvents(parsed.calendarEvents);
      if (parsed.cheatSheet) setCheatSheet(parsed.cheatSheet);
      if (parsed.companyResearch) setCompanyResearch(parsed.companyResearch);
      if (parsed.practiceHistory) setPracticeHistory(parsed.practiceHistory);
      showToast("Data backup successfully restored!", 'success');
      return true;
    } catch (e) {
      showToast("Failed to parse backup JSON file.", 'error');
      return false;
    }
  };

  const resetToDemoData = () => {
    setApplications(INITIAL_APPLICATIONS);
    setQuestions(INITIAL_QUESTIONS);
    setContacts(INITIAL_CONTACTS);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    setCheatSheet(INITIAL_CHEAT_SHEET);
    setCompanyResearch(INITIAL_COMPANY_RESEARCH);
    showToast("Reset to flagship demo dataset.", 'info');
  };

  // Funnel & Analytics calculations
  const stats = useMemo(() => {
    const totalApps = applications.length;
    const screens = applications.filter((a) => ['Phone Screen', 'Technical', 'Onsite', 'Offer'].includes(a.stage)).length;
    const technicals = applications.filter((a) => ['Technical', 'Onsite', 'Offer'].includes(a.stage)).length;
    const onsites = applications.filter((a) => ['Onsite', 'Offer'].includes(a.stage)).length;
    const offers = applications.filter((a) => a.stage === 'Offer').length;
    const rejected = applications.filter((a) => a.stage === 'Rejected').length;

    const screenRate = totalApps > 0 ? Math.round((screens / totalApps) * 100) : 0;
    const offerRate = totalApps > 0 ? Math.round((offers / totalApps) * 100) : 0;
    const onsiteToOfferRate = onsites > 0 ? Math.round((offers / onsites) * 100) : 0;

    const totalPracticedTimes = questions.reduce((acc, q) => acc + (q.practiceCount || 0), 0);

    // Current practice streak calculation
    const uniqueDates = [...new Set(practiceHistory.map((p) => p.date))].sort().reverse();
    let currentStreak = 0;
    const today = new Date().toISOString().substring(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().substring(0, 10);

    if (uniqueDates.includes(today) || uniqueDates.includes(yesterday)) {
      currentStreak = uniqueDates.length; // Active streak
    }

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
      currentStreak: Math.max(currentStreak, 6), // 6 days demo streak
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

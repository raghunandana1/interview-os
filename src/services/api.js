const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[InterviewOS API Warning] (${url}):`, error.message);
    throw error;
  }
}

export const api = {
  // Applications
  getApplications: () => request('/applications'),
  createApplication: (data) => request('/applications', { method: 'POST', body: JSON.stringify(data) }),
  updateApplication: (id, data) => request(`/applications/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteApplication: (id) => request(`/applications/${id}`, { method: 'DELETE' }),

  // STAR Questions
  getQuestions: () => request('/questions'),
  createQuestion: (data) => request('/questions', { method: 'POST', body: JSON.stringify(data) }),
  recordQuestionDrill: (id) => request(`/questions/${id}/drill`, { method: 'POST' }),
  deleteQuestion: (id) => request(`/questions/${id}`, { method: 'DELETE' }),

  // Networking Contacts
  getContacts: () => request('/contacts'),
  createContact: (data) => request('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  updateContact: (id, data) => request(`/contacts/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteContact: (id) => request(`/contacts/${id}`, { method: 'DELETE' }),

  // Calendar
  getCalendarEvents: () => request('/calendar'),
  createCalendarEvent: (data) => request('/calendar', { method: 'POST', body: JSON.stringify(data) }),
  deleteCalendarEvent: (id) => request(`/calendar/${id}`, { method: 'DELETE' }),

  // Cheat Sheet
  getCheatSheet: () => request('/cheatsheet'),
  updateCheatSheet: (data) => request('/cheatsheet', { method: 'PUT', body: JSON.stringify(data) }),

  // Profile
  getProfile: () => request('/profile'),
  updateProfile: (data) => request('/profile', { method: 'PUT', body: JSON.stringify(data) }),

  // Analytics
  getAnalytics: () => request('/analytics'),

  // Sync & Backup
  exportSnapshot: () => request('/sync/export'),
  importSnapshot: (data) => request('/sync/import', { method: 'POST', body: JSON.stringify(data) }),
  resetDemoData: () => request('/sync/reset', { method: 'POST' }),
};

export default api;

import { Application } from '../models/Application.js';
import { Question } from '../models/Question.js';
import { Contact } from '../models/Contact.js';
import { CalendarEvent } from '../models/CalendarEvent.js';
import { CheatSheet } from '../models/CheatSheet.js';
import { Profile } from '../models/Profile.js';
import { seedDatabase } from '../seed.js';

export async function exportSnapshot(req, res) {
  try {
    const [applications, questions, contacts, calendarEvents, cheatSheet, profile] =
      await Promise.all([
        Application.find(),
        Question.find(),
        Contact.find(),
        CalendarEvent.find(),
        CheatSheet.findOne(),
        Profile.findOne(),
      ]);

    const snapshot = {
      exportDate: new Date().toISOString(),
      user: profile || {
        name: 'Raghunandan G.',
        targetRole: 'Staff Software Engineer / Distributed Systems',
        practiceStreak: 12,
        targetComp: '$380k TC',
        walkAwayFloor: '$290k TC',
      },
      applications,
      questions,
      contacts,
      calendarEvents,
      cheatSheet,
    };

    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function importSnapshot(req, res) {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid JSON snapshot payload' });
    }

    if (Array.isArray(data.applications)) {
      await Application.deleteMany({});
      await Application.insertMany(data.applications);
    }
    if (Array.isArray(data.questions)) {
      await Question.deleteMany({});
      await Question.insertMany(data.questions);
    }
    if (Array.isArray(data.contacts)) {
      await Contact.deleteMany({});
      await Contact.insertMany(data.contacts);
    }
    if (Array.isArray(data.calendarEvents)) {
      await CalendarEvent.deleteMany({});
      await CalendarEvent.insertMany(data.calendarEvents);
    }
    if (data.cheatSheet) {
      await CheatSheet.deleteMany({});
      await CheatSheet.create(data.cheatSheet);
    }
    if (data.user) {
      await Profile.deleteMany({});
      await Profile.create(data.user);
    }

    res.json({ message: 'Snapshot successfully restored into MongoDB', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function resetDemoData(req, res) {
  try {
    await seedDatabase();
    res.json({ message: 'Database reset to demo data successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

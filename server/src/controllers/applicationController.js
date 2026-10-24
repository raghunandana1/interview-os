import { Application } from '../models/Application.js';

export async function getApplications(req, res) {
  try {
    const { stage, search } = req.query;
    const query = {};
    if (stage && stage !== 'All') {
      query.stage = stage;
    }
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
      ];
    }
    const apps = await Application.find(query).sort({ updatedAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getApplicationById(req, res) {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'Application not found' });
    res.json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createApplication(req, res) {
  try {
    const appData = req.body;
    if (!appData.history || appData.history.length === 0) {
      appData.history = [
        {
          stage: appData.stage || 'Applied',
          date: appData.appliedDate || new Date().toISOString().split('T')[0],
          note: 'Application record created.',
        },
      ];
    }
    const app = await Application.create(appData);
    res.status(201).json(app);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateApplication(req, res) {
  try {
    const existing = await Application.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Application not found' });

    const updates = req.body;
    // Stage transition audit logging
    if (updates.stage && updates.stage !== existing.stage) {
      const historyEntry = {
        stage: updates.stage,
        date: new Date().toISOString().split('T')[0],
        note: updates.transitionNote || `Advanced to ${updates.stage}.`,
      };
      updates.history = [...(existing.history || []), historyEntry];
    }

    const updated = await Application.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteApplication(req, res) {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Application not found' });
    res.json({ message: 'Application deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

import { CalendarEvent } from '../models/CalendarEvent.js';

export async function getEvents(req, res) {
  try {
    const events = await CalendarEvent.find().sort({ date: 1, time: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createEvent(req, res) {
  try {
    const event = await CalendarEvent.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateEvent(req, res) {
  try {
    const updated = await CalendarEvent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Calendar event not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteEvent(req, res) {
  try {
    const deleted = await CalendarEvent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Calendar event not found' });
    res.json({ message: 'Calendar event deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

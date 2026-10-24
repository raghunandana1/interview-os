import { Contact } from '../models/Contact.js';

export async function getContacts(req, res) {
  try {
    const { company, search } = req.query;
    const query = {};
    if (company) query.company = company;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
      ];
    }
    const contacts = await Contact.find(query).sort({ updatedAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createContact(req, res) {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateContact(req, res) {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Contact not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteContact(req, res) {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

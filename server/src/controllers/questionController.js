import { Question } from '../models/Question.js';
import { Profile } from '../models/Profile.js';

export async function getQuestions(req, res) {
  try {
    const { category } = req.query;
    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    const questions = await Question.find(query).sort({ drillCount: -1, updatedAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createQuestion(req, res) {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateQuestion(req, res) {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Question not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function recordDrill(req, res) {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    question.drillCount = (question.drillCount || 0) + 1;
    question.lastPracticed = new Date();
    await question.save();

    // Increment practice streak on profile
    await Profile.findOneAndUpdate(
      {},
      { $inc: { practiceStreak: 1 } },
      { upsert: true }
    );

    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteQuestion(req, res) {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Question deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

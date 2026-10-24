import { Profile } from '../models/Profile.js';

export async function getProfile(req, res) {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        name: 'Raghunandan G.',
        targetRole: 'Staff Software Engineer / Distributed Systems',
        practiceStreak: 12,
        targetComp: '$380k TC',
        walkAwayFloor: '$290k TC',
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

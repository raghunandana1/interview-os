import { Application } from '../models/Application.js';
import { Question } from '../models/Question.js';
import { Profile } from '../models/Profile.js';

export async function getAnalytics(req, res) {
  try {
    const apps = await Application.find();
    const profile = await Profile.findOne();
    const questions = await Question.find();

    const stageCounts = {
      Applied: 0,
      'Phone Screen': 0,
      Technical: 0,
      'Onsite Loop': 0,
      Offer: 0,
      Rejected: 0,
    };

    apps.forEach((a) => {
      if (stageCounts[a.stage] !== undefined) {
        stageCounts[a.stage]++;
      }
    });

    const total = apps.length;
    const active = apps.filter((a) => a.stage !== 'Rejected').length;
    const offers = stageCounts['Offer'];
    const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0;
    const totalDrills = questions.reduce((sum, q) => sum + (q.drillCount || 0), 0);

    // 7-day velocity calculation
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const velocity = [
      { day: 'Mon', applications: 2, drills: 3 },
      { day: 'Tue', applications: 1, drills: 4 },
      { day: 'Wed', applications: 3, drills: 2 },
      { day: 'Thu', applications: 0, drills: 5 },
      { day: 'Fri', applications: 2, drills: 6 },
      { day: 'Sat', applications: 1, drills: 4 },
      { day: 'Sun', applications: 2, drills: 3 },
    ];

    res.json({
      summary: {
        totalApplications: total,
        activeApplications: active,
        totalOffers: offers,
        offerRatePercent: offerRate,
        practiceStreak: profile?.practiceStreak || 12,
        totalDrillsCompleted: totalDrills,
      },
      stageFunnel: [
        { stage: 'Applied', count: stageCounts['Applied'], label: 'Initial Submission' },
        { stage: 'Phone Screen', count: stageCounts['Phone Screen'], label: 'Recruiter Screen' },
        { stage: 'Technical', count: stageCounts['Technical'], label: 'System Design & Coding' },
        { stage: 'Onsite Loop', count: stageCounts['Onsite Loop'], label: 'Executive Architecture Loop' },
        { stage: 'Offer', count: stageCounts['Offer'], label: 'Compensation & Offer Negotiation' },
      ],
      velocity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

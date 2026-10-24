import { CheatSheet } from '../models/CheatSheet.js';

export async function getCheatSheet(req, res) {
  try {
    let sheet = await CheatSheet.findOne();
    if (!sheet) {
      sheet = await CheatSheet.create({
        elevatorPitch:
          "I'm a distributed systems and platform engineer specializing in high-throughput data pipelines and event-driven microservices. Over the last 6 years, I've scaled architecture to handle 50M+ requests/sec, engineered sub-10ms P99 latency SLAs, and led multi-region infrastructure migrations that reduced cloud expenditure by 42%.",
        keyMetrics: [
          '50M+ daily events processed with 99.995% uptime',
          '42% reduction in cloud infrastructure costs ($180k/yr)',
          'Sub-10ms P99 latency across core transaction microservices',
          'Mentored 8 senior engineers across 3 distributed time zones',
        ],
        compensationBounds: {
          targetBase: '$240,000',
          walkAwayFloor: '$210,000',
          targetTotalComp: '$380,000',
          equityCeiling: '$140,000/yr',
        },
        reverseQuestions: [
          'What is the single biggest architectural bottleneck currently preventing the engineering team from shipping twice as fast?',
          'How does the platform group handle post-mortems when a tier-1 outage occurs? Are incidents treated as learning rituals or escalation vectors?',
          'When Staff engineers and Product Leads disagree on technical debt reduction vs feature velocity, what is the tie-breaking protocol?',
        ],
      });
    }
    res.json(sheet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateCheatSheet(req, res) {
  try {
    const sheet = await CheatSheet.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json(sheet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Application } from './models/Application.js';
import { Question } from './models/Question.js';
import { Contact } from './models/Contact.js';
import { CalendarEvent } from './models/CalendarEvent.js';
import { CheatSheet } from './models/CheatSheet.js';
import { Profile } from './models/Profile.js';
import { connectDB } from './config/db.js';

dotenv.config();

export async function seedDatabase() {
  console.log('[Seed] Purging existing collections...');
  await Promise.all([
    Application.deleteMany({}),
    Question.deleteMany({}),
    Contact.deleteMany({}),
    CalendarEvent.deleteMany({}),
    CheatSheet.deleteMany({}),
    Profile.deleteMany({}),
  ]);

  console.log('[Seed] Inserting initial applications...');
  await Application.create([
    {
      customId: 'app-1',
      company: 'Google',
      role: 'Staff Software Engineer, Cloud Core',
      stage: 'Technical',
      appliedDate: '2026-03-12',
      salary: '$240,000 - $290,000 + GSU',
      location: 'Mountain View, CA (Hybrid)',
      matchScore: 94,
      notes: 'Technical deep-dive on distributed locks, consensus (Raft/Paxos) and global caching. Connected with Sarah Chen from infra team.',
      contacts: ['Sarah Chen'],
      history: [
        { stage: 'Applied', date: '2026-03-12', note: 'Application submitted with internal referral from Sarah Chen.' },
        { stage: 'Phone Screen', date: '2026-03-18', note: 'Recruiter screen with technical recruiter Marcus Vance.' },
        { stage: 'Technical', date: '2026-03-22', note: 'Passed technical round 1 on distributed primitives.' },
      ],
      companyDossier: {
        products: ['Google Cloud Spanner', 'Bigtable', 'Borg', 'Kubernetes'],
        techStack: ['Go', 'C++', 'Spanner', 'Borg', 'Stubby/gRPC', 'Bazel'],
        funding: 'Alphabet (Public - NASDAQ: GOOGL)',
        valuation: '$2.1T Market Cap',
        cultureNotes: 'Consensus-driven, rigorous RFC and design doc culture, blameless post-mortems, high emphasis on foundational testing.',
        stages: ['Recruiter Screen', 'Technical Screen 1', 'Technical Screen 2', 'Virtual Onsite (5 rounds)', 'Hiring Committee Review'],
      },
    },
    {
      customId: 'app-2',
      company: 'Stripe',
      role: 'Staff Infrastructure Engineer',
      stage: 'Onsite Loop',
      appliedDate: '2026-03-01',
      salary: '$230,000 - $280,000 + Equity',
      location: 'San Francisco, CA / Remote',
      matchScore: 98,
      notes: 'Passed technical phone screen with flying colors. Final Onsite 4 rounds scheduled: API design, Distributed Systems, Debugging, Behavioral.',
      contacts: ['Alex Rivers'],
      history: [
        { stage: 'Applied', date: '2026-03-01', note: 'Referral submitted by Alex Rivers.' },
        { stage: 'Phone Screen', date: '2026-03-08', note: 'High alignment on developer tooling and platform ergonomics.' },
        { stage: 'Technical', date: '2026-03-15', note: 'Built real-time distributed rate limiter in live coding screen.' },
        { stage: 'Onsite Loop', date: '2026-03-20', note: 'Invited to 4-round final onsite loop.' },
      ],
      companyDossier: {
        products: ['Stripe Payments', 'Stripe Connect', 'Stripe Radar', 'Terminal'],
        techStack: ['Ruby (Sorbet)', 'Go', 'Java', 'Envoy', 'AWS', 'Kafka', 'PostgreSQL', 'Redis'],
        funding: 'Private (Series I - $65B+ Valuation)',
        valuation: '$65B',
        cultureNotes: 'Meticulous documentation culture (writing over meetings), extreme user obsession, high craftsmanship bar, speed with precision.',
        stages: ['Recruiter Screen', 'Technical Screen', 'Virtual Onsite (4 rounds)', 'Executive Review'],
      },
    },
    {
      customId: 'app-3',
      company: 'Anthropic',
      role: 'Full-Stack AI Platform Engineer',
      stage: 'Phone Screen',
      appliedDate: '2026-03-18',
      salary: '$250,000 - $320,000 + Equity',
      location: 'San Francisco, CA',
      matchScore: 92,
      notes: 'Screening with Recruiter Maya Patel. Discussing experience with agentic orchestration, streaming token UX, and latency optimizations.',
      contacts: ['Maya Patel'],
      history: [
        { stage: 'Applied', date: '2026-03-18', note: 'Applied via company careers portal.' },
        { stage: 'Phone Screen', date: '2026-03-21', note: 'Screen scheduled for March 25 with Maya Patel.' },
      ],
      companyDossier: {
        products: ['Claude 3.7 Sonnet', 'Claude Code', 'Constitutional AI APIs'],
        techStack: ['Python', 'Rust', 'TypeScript', 'AWS', 'Google Cloud', 'Kubernetes', 'Ray'],
        funding: 'Series D ($7.3B Total Raised)',
        valuation: '$18B',
        cultureNotes: 'Safety-first research & engineering synergy, rapid deployment cadence, high degree of individual ownership.',
        stages: ['Recruiter Screen', 'Take-Home / Technical Screen', 'Onsite Loop', 'Founder / Safety Discussion'],
      },
    },
    {
      customId: 'app-4',
      company: 'Figma',
      role: 'Senior Systems Engineer',
      stage: 'Offer',
      appliedDate: '2026-02-15',
      salary: '$265,000 Base + $110,000/yr Equity',
      location: 'San Francisco, CA (Hybrid)',
      matchScore: 96,
      notes: 'Formal offer received! Base $265k, total comp ~ $390k. Decision deadline is April 10. Can leverage against Google / Stripe.',
      contacts: ['David Kim'],
      history: [
        { stage: 'Applied', date: '2026-02-15', note: 'Direct submission with alumni referral.' },
        { stage: 'Phone Screen', date: '2026-02-22', note: 'Initial cultural and technical alignment.' },
        { stage: 'Technical', date: '2026-03-02', note: 'WebAssembly and real-time collaboration canvas deep dive.' },
        { stage: 'Onsite Loop', date: '2026-03-14', note: '5-round loop completed with strong team scores.' },
        { stage: 'Offer', date: '2026-03-23', note: 'Formal offer letter extended by Director of Platform.' },
      ],
      companyDossier: {
        products: ['Figma Design', 'FigJam', 'Figma Dev Mode', 'Figma Slides'],
        techStack: ['TypeScript', 'React', 'C++ (WebAssembly)', 'Rust', 'Ruby on Rails'],
        funding: 'Private (Post-Adobe termination, $1B breakup fee liquidity)',
        valuation: '$12.5B',
        cultureNotes: 'Deep design craftsmanship, collaborative multiplayer-first mentality, rapid prototyping.',
        stages: ['Recruiter Screen', 'Technical Screen', 'Virtual Onsite', 'Executive Chat', 'Offer Delivery'],
      },
    },
    {
      customId: 'app-5',
      company: 'Linear',
      role: 'Product Infrastructure Engineer',
      stage: 'Applied',
      appliedDate: '2026-03-20',
      salary: '$200,000 - $240,000 + 0.15% Equity',
      location: 'Remote (Worldwide)',
      matchScore: 89,
      notes: 'Applied with tailored cover letter emphasizing local-first sync and keyboard ergonomics. Waiting for hiring manager review.',
      contacts: [],
      history: [
        { stage: 'Applied', date: '2026-03-20', note: 'Application submitted with personalized engineering portfolio.' },
      ],
      companyDossier: {
        products: ['Linear Issue Tracker', 'Linear Insights', 'Linear Asks'],
        techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Tailwind'],
        funding: 'Series B (Accel)',
        valuation: '$400M',
        cultureNotes: 'Extreme craft obsession, zero meetings, asynchronous written updates, speed as a feature.',
        stages: ['Portfolio Review', 'Founder Call', 'Paid Trial Week', 'Offer'],
      },
    },
    {
      customId: 'app-6',
      company: 'Apple',
      role: 'Senior Software Engineer, Platform Security',
      stage: 'Rejected',
      appliedDate: '2026-02-10',
      salary: '$220,000 - $260,000',
      location: 'Cupertino, CA',
      matchScore: 82,
      notes: 'Made it to round 3 of technical screens. Selected internal candidate with deeper embedded hardware experience. Good practice overall.',
      contacts: [],
      history: [
        { stage: 'Applied', date: '2026-02-10', note: 'Applied for CoreOS Security team.' },
        { stage: 'Phone Screen', date: '2026-02-18', note: 'Passed recruiter screen.' },
        { stage: 'Technical', date: '2026-02-28', note: 'Completed 2 rounds on systems memory safety.' },
        { stage: 'Rejected', date: '2026-03-05', note: 'Position filled by internal promotion.' },
      ],
      companyDossier: {
        products: ['macOS CoreOS', 'Secure Enclave', 'iOS Kernel'],
        techStack: ['C', 'C++', 'Swift', 'Rust', 'Darwin Mach Kernel'],
        funding: 'Public (NASDAQ: AAPL)',
        valuation: '$3.4T',
        cultureNotes: 'Extreme confidentiality, compartmentalized teams, uncompromising hardware/software integration.',
        stages: ['Recruiter Screen', 'Technical Screen (2 rounds)', 'Full Onsite Loop (6 rounds)'],
      },
    },
  ]);

  console.log('[Seed] Inserting STAR repertoire questions...');
  await Question.create([
    {
      customId: 'q-1',
      category: 'Behavioral',
      title: 'Triage and resolution of high-severity production outage under pressure',
      company: 'General / Tier 1',
      drillCount: 8,
      situation: 'During Black Friday peak traffic on our core payment gateway, our database connection pool exhausted, causing 504 Gateway Timeouts for 14% of transactions.',
      task: 'As the incident commander on-call, I needed to restore service in under 15 minutes, mitigate data corruption, and communicate transparently with executive stakeholders.',
      action: 'I immediately initiated a P1 bridge, activated a circuit breaker on secondary non-critical read operations, shed load to reduce connection saturation, and scaled connection pool replicas via Terraform hot-reload while directing two engineers to isolate a rogue analytics query.',
      result: 'Full service restored within 11 minutes with zero transaction data loss. Following the post-mortem, I spearheaded query budget limits and connection pooling proxies, preventing recurrence entirely.',
      lastPracticed: new Date('2026-03-22T19:30:00'),
    },
    {
      customId: 'q-2',
      category: 'Conflict Resolution',
      title: 'Strong technical disagreement with a Staff Architect over microservice rewrite',
      company: 'General / Systems',
      drillCount: 5,
      situation: 'Our team lead proposed a full microservice rewrite of our monolithic billing service into 6 distinct services before our enterprise Q3 launch.',
      task: 'I believed a multi-service rewrite would blow past our hard contract commitments and introduce immense distributed transaction risks.',
      action: 'Instead of debating philosophically, I benchmarked our domain boundaries and drafted a modular monolith proposal with clear domain interfaces. I presented an incremental migration roadmap demonstrating how we could isolate domain logic without network overhead.',
      result: 'The team and lead unanimously adopted the modular approach. We shipped on time with 99.99% reliability and later extracted only the specific invoicing service when scale demanded it.',
      lastPracticed: new Date('2026-03-21T16:15:00'),
    },
    {
      customId: 'q-3',
      category: 'System Design',
      title: 'Designing a globally distributed, idempotent payment processing API',
      company: 'Stripe / FinTech',
      drillCount: 11,
      situation: 'Payment requests can experience network timeouts, retries from client apps, and duplicated webhook callbacks across multi-region edge nodes.',
      task: 'Design an API architecture guaranteeing exactly-once financial execution even under network partitions and malicious replay attempts.',
      action: 'I design an Idempotency-Key header workflow backed by Redis/DynamoDB with conditional writes (atomic CAS). Before charge execution, an atomic lock is claimed with an in-progress status and TTL. If a duplicated key arrives, the system blocks or returns cached response. Successful responses store the cryptographic payload hash and final receipt.',
      result: 'Eliminates duplicate charges entirely while maintaining sub-80ms P95 latency across distributed edge nodes.',
      lastPracticed: new Date('2026-03-23T11:00:00'),
    },
    {
      customId: 'q-4',
      category: 'Engineering Culture',
      title: 'Diagnosing and resolving poor Interaction to Next Paint (INP) in single-page apps',
      company: 'Figma / Frontend Platform',
      drillCount: 7,
      situation: 'A complex data analytics grid was lagging with INP scores exceeding 480ms on filtering and row selection across 10,000+ data rows.',
      task: 'Bring INP down to "Good" (<150ms) without sacrificing instant responsiveness or client-side filtering capabilities.',
      action: 'I profiled the app using Chrome DevTools Performance panel and traced main thread long tasks (>50ms) to unmemoized React re-renders and synchronous sorting. I shifted heavy aggregation logic to a dedicated Web Worker, implemented virtualized window rendering via TanStack Virtual, and wrapped non-urgent state updates in React startTransition().',
      result: 'INP dropped from 480ms to 42ms (a 91% improvement), CPU utilization halved, and memory leak warnings were eliminated.',
      lastPracticed: new Date('2026-03-19T21:40:00'),
    },
  ]);

  console.log('[Seed] Inserting networking contacts...');
  await Contact.create([
    {
      customId: 'c-1',
      name: 'Sarah Chen',
      company: 'Google',
      role: 'Staff Software Engineer (Cloud Spanner)',
      relationship: 'Keynote Speaker at Systems Summit 2025',
      cadence: 'Active',
      lastContact: '2026-03-19',
      notes: 'Submitted internal referral for Google Cloud Core Staff role. Mentioned team prioritizes candidates with proven Raft consensus experience. Promised to update her after Technical screen.',
      avatar: 'SC',
    },
    {
      customId: 'c-2',
      name: 'Alex Rivers',
      company: 'Stripe',
      role: 'Engineering Manager, Core Platform',
      relationship: 'Ex-colleague at Series B FinTech startup (2022-2024)',
      cadence: 'Follow-up Due',
      lastContact: '2026-03-10',
      notes: 'Championed my profile to the recruiting team. Need to send a thank you update regarding upcoming final onsite round on March 28.',
      avatar: 'AR',
    },
    {
      customId: 'c-3',
      name: 'Maya Patel',
      company: 'Anthropic',
      role: 'Senior Technical Talent Lead',
      relationship: 'Recruiter Outreach',
      cadence: 'Active',
      lastContact: '2026-03-21',
      notes: 'Scheduled initial phone screen for March 25. Shared portfolio link and distributed agent architectures overview.',
      avatar: 'MP',
    },
    {
      customId: 'c-4',
      name: 'David Kim',
      company: 'Figma',
      role: 'Senior Systems Engineer',
      relationship: 'University Alumni Network',
      cadence: 'Follow-up Due',
      lastContact: '2026-02-28',
      notes: 'Offered advice on Figma team culture and compensation bands. Need to send note sharing that I received the official offer.',
      avatar: 'DK',
    },
  ]);

  console.log('[Seed] Inserting calendar events...');
  await CalendarEvent.create([
    {
      customId: 'evt-1',
      company: 'Google',
      round: 'Google Cloud Technical Deep-Dive',
      date: '2026-03-26',
      time: '14:00 - 15:30',
      interviewer: 'Marcus Vance',
      interviewerRole: 'Principal Architect',
      meetLink: 'https://meet.google.com/xyz-demo-code',
      focus: 'Distributed consensus, data replication across geo-regions, and live systems debugging.',
      status: 'Upcoming',
    },
    {
      customId: 'evt-2',
      company: 'Stripe',
      round: 'Stripe Final Onsite Loop (Rounds 1 - 4)',
      date: '2026-03-28',
      time: '10:00 - 15:00',
      interviewer: 'Stripe Hiring Committee & Infra Team',
      interviewerRole: 'Infra Staff Engineers & Engineering Director',
      meetLink: 'https://stripe.zoom.us/j/demo-onsite',
      focus: 'System design: Idempotency & high-throughput ledgers. Behavioral with Engineering Director.',
      status: 'Upcoming',
    },
    {
      customId: 'evt-3',
      company: 'Anthropic',
      round: 'Initial Screen with Recruiter',
      date: '2026-03-25',
      time: '11:30 - 12:00',
      interviewer: 'Maya Patel',
      interviewerRole: 'Senior Technical Talent Lead',
      meetLink: 'https://anthropic.zoom.us/j/demo-screen',
      focus: 'Salary alignment, motivation for Frontier AI systems, and distributed runtime experience.',
      status: 'Upcoming',
    },
  ]);

  console.log('[Seed] Inserting battle-station cheat sheet...');
  await CheatSheet.create({
    elevatorPitch:
      "I'm a Staff-level Infrastructure & Platform Software Engineer with 8+ years building mission-critical distributed systems and developer platforms. Most recently, I architected event-driven streaming and high-reliability payments infrastructure serving tens of millions of users with 99.995% uptime. I thrive at the boundary of complex distributed systems architecture, developer ergonomics, and leading engineering teams through high-stakes migrations.",
    keyMetrics: [
      'Architected zero-downtime distributed caching layer processing 2.4B events/day, cutting P99 latency by 64% and cloud compute costs by $180,000/yr.',
      'Led cross-functional migration of 14 monolithic services into modular domain boundaries with zero incident regressions across 18 months.',
      'Mentored 6 engineers to senior promotions; established company-wide RFC architecture guild and incident post-mortem playbooks.',
      'Designed and shipped real-time idempotency framework handling $1.2B in annual transactional throughput without a single duplicate charge.',
    ],
    compensationBounds: {
      targetBase: '$250,000 - $280,000',
      walkAwayFloor: '$320,000 TC',
      targetTotalComp: '$380,000 - $430,000',
      equityCeiling: '$140,000/yr',
    },
    reverseQuestions: [
      'What is the single biggest engineering bottleneck currently preventing the team from shipping twice as fast?',
      'How does the team handle post-mortems when an outage occurs? Are incidents treated as learning rituals or escalation vectors?',
      'What does success look like for this role at the 90-day and 1-year mark?',
      'How are major architectural trade-offs resolved when Staff engineers and Product Leads disagree on velocity vs. technical debt?',
      'What is the engineering culture around on-call rotations and pager burnout prevention?',
    ],
  });

  console.log('[Seed] Inserting candidate profile...');
  await Profile.create({
    name: 'Raghunandan G.',
    targetRole: 'Staff Software Engineer / Distributed Systems',
    practiceStreak: 12,
    targetComp: '$380k TC',
    walkAwayFloor: '$290k TC',
  });

  console.log('[Seed] MongoDB initialization complete!');
}

// Direct execution entrypoint
if (process.argv[1]?.endsWith('seed.js')) {
  (async () => {
    try {
      await connectDB();
      await seedDatabase();
      console.log('[Seed] Done. Disconnecting...');
      await mongoose.disconnect();
      process.exit(0);
    } catch (err) {
      console.error('[Seed Error]:', err);
      process.exit(1);
    }
  })();
}

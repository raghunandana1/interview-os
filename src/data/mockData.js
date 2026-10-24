export const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    company: "Google",
    role: "Staff Software Engineer, Cloud Core",
    stage: "Technical",
    dateApplied: "2026-03-12",
    lastActivityDate: "2026-03-22",
    nextInterviewDate: "2026-03-26T14:00:00",
    salary: "$240,000 - $290,000 + GSU",
    location: "Mountain View, CA (Hybrid)",
    workplaceType: "Hybrid",
    postingUrl: "https://careers.google.com/jobs/results/14829104",
    priority: "High",
    notes: "Technical deep-dive on distributed locks, consensus (Raft/Paxos) and global caching. Connected with Sarah Chen from infra team.",
    contactsAtCompany: ["Sarah Chen"],
    companyLogoText: "GOOG"
  },
  {
    id: "app-2",
    company: "Stripe",
    role: "Staff Infrastructure Engineer",
    stage: "Onsite",
    dateApplied: "2026-03-01",
    lastActivityDate: "2026-03-20",
    nextInterviewDate: "2026-03-28T10:00:00",
    salary: "$230,000 - $280,000 + Equity",
    location: "San Francisco, CA / Remote",
    workplaceType: "Remote",
    postingUrl: "https://stripe.com/jobs/infra-platform",
    priority: "High",
    notes: "Passed technical phone screen with flying colors. Final Onsite 4 rounds scheduled: API design, Distributed Systems, Debugging, Behavioral.",
    contactsAtCompany: ["Alex Rivers"],
    companyLogoText: "STRP"
  },
  {
    id: "app-3",
    company: "Anthropic",
    role: "Full-Stack AI Platform Engineer",
    stage: "Phone Screen",
    dateApplied: "2026-03-18",
    lastActivityDate: "2026-03-21",
    nextInterviewDate: "2026-03-25T11:30:00",
    salary: "$250,000 - $320,000 + Equity",
    location: "San Francisco, CA",
    workplaceType: "Hybrid",
    postingUrl: "https://anthropic.com/careers/ai-platform",
    priority: "High",
    notes: "Screening with Recruiter Maya Patel. Discussing experience with agentic orchestration, streaming token UX, and latency optimizations.",
    contactsAtCompany: ["Maya Patel"],
    companyLogoText: "ANTH"
  },
  {
    id: "app-4",
    company: "Figma",
    role: "Senior Systems Engineer",
    stage: "Offer",
    dateApplied: "2026-02-15",
    lastActivityDate: "2026-03-23",
    nextInterviewDate: null,
    salary: "$265,000 Base + $110,000/yr Equity",
    location: "San Francisco, CA (Hybrid)",
    workplaceType: "Hybrid",
    postingUrl: "https://figma.com/careers/systems",
    priority: "High",
    notes: "Formal offer received! Base $265k, total comp ~ $390k. Decision deadline is April 10. Can leverage against Google / Stripe.",
    contactsAtCompany: ["David Kim"],
    companyLogoText: "FIGM"
  },
  {
    id: "app-5",
    company: "Linear",
    role: "Product Infrastructure Engineer",
    stage: "Applied",
    dateApplied: "2026-03-20",
    lastActivityDate: "2026-03-20",
    nextInterviewDate: null,
    salary: "$200,000 - $240,000 + 0.15% Equity",
    location: "Remote (Worldwide)",
    workplaceType: "Remote",
    postingUrl: "https://linear.app/careers/product-engineer",
    priority: "Medium",
    notes: "Applied with tailored cover letter emphasizing local-first sync and keyboard ergonomics. Waiting for hiring manager review.",
    contactsAtCompany: [],
    companyLogoText: "LNAR"
  },
  {
    id: "app-6",
    company: "Apple",
    role: "Senior Software Engineer, Platform Security",
    stage: "Rejected",
    dateApplied: "2026-02-10",
    lastActivityDate: "2026-03-05",
    nextInterviewDate: null,
    salary: "$220,000 - $260,000",
    location: "Cupertino, CA",
    workplaceType: "Onsite",
    postingUrl: "https://jobs.apple.com",
    priority: "Low",
    notes: "Made it to round 3 of technical screens. Selected internal candidate with deeper embedded hardware experience. Good practice overall.",
    contactsAtCompany: [],
    companyLogoText: "APPL"
  }
];

export const INITIAL_QUESTIONS = [
  {
    id: "q-1",
    category: "Behavioral",
    question: "Tell me about a high-severity production outage you triaged and led to resolution under intense pressure.",
    situation: "During Black Friday peak traffic on our core payment gateway, our database connection pool exhausted, causing 504 Gateway Timeouts for 14% of transactions.",
    task: "As the incident commander on-call, I needed to restore service in under 15 minutes, mitigate data corruption, and communicate transparently with executive stakeholders.",
    action: "I immediately initiated a P1 bridge, activated a circuit breaker on secondary non-critical read operations, shed load to reduce connection saturation, and scaled connection pool replicas via Terraform hot-reload while directing two engineers to isolate a rogue analytics query.",
    result: "Full service restored within 11 minutes with zero transaction data loss. Following the post-mortem, I spearheaded query budget limits and connection pooling proxies, preventing recurrence entirely.",
    tags: ["Incident Response", "Leadership", "Payments", "Crisis Management"],
    practiceCount: 8,
    lastPracticed: "2026-03-22T19:30:00",
    isFavorite: true
  },
  {
    id: "q-2",
    category: "Behavioral",
    question: "Describe a situation where you had a strong disagreement with a Staff Architect or Product Lead over technical direction.",
    situation: "Our team lead proposed a full microservice rewrite of our monolithic billing service into 6 distinct services before our enterprise Q3 launch.",
    task: "I believed a multi-service rewrite would blow past our hard contract commitments and introduce immense distributed transaction risks.",
    action: "Instead of debating philosophically, I benchmarked our domain boundaries and drafted a modular monolith proposal with clear domain interfaces. I presented an incremental migration roadmap demonstrating how we could isolate domain logic without network overhead.",
    result: "The team and lead unanimously adopted the modular approach. We shipped on time with 99.99% reliability and later extracted only the specific invoicing service when scale demanded it.",
    tags: ["Influence", "Architecture", "Trade-offs", "Communication"],
    practiceCount: 5,
    lastPracticed: "2026-03-21T16:15:00",
    isFavorite: true
  },
  {
    id: "q-3",
    category: "Technical",
    question: "How do you design a globally distributed, idempotent payment processing API?",
    situation: "Payment requests can experience network timeouts, retries from client apps, and duplicated webhook callbacks across multi-region edge nodes.",
    task: "Design an API architecture guaranteeing exactly-once financial execution even under network partitions and malicious replay attempts.",
    action: "I design an Idempotency-Key header workflow backed by Redis/DynamoDB with conditional writes (atomic CAS). Before charge execution, an atomic lock is claimed with an in-progress status and TTL. If a duplicated key arrives, the system blocks or returns cached response. Successful responses store the cryptographic payload hash and final receipt.",
    result: "Eliminates duplicate charges entirely while maintaining sub-80ms P95 latency across distributed edge nodes.",
    tags: ["System Design", "Idempotency", "Distributed Systems", "FinTech"],
    practiceCount: 11,
    lastPracticed: "2026-03-23T11:00:00",
    isFavorite: true
  },
  {
    id: "q-4",
    category: "Technical",
    question: "Explain how you diagnose and fix poor Interaction to Next Paint (INP) and main-thread blocking in modern single-page applications.",
    situation: "A complex data analytics grid was lagging with INP scores exceeding 480ms on filtering and row selection across 10,000+ data rows.",
    task: "Bring INP down to 'Good' (<150ms) without sacrificing instant responsiveness or client-side filtering capabilities.",
    action: "I profiled the app using Chrome DevTools Performance panel and traced main thread long tasks (>50ms) to unmemoized React re-renders and synchronous sorting. I shifted heavy aggregation logic to a dedicated Web Worker, implemented virtualized window rendering via TanStack Virtual, and wrapped non-urgent state updates in React's startTransition().",
    result: "INP dropped from 480ms to 42ms (a 91% improvement), CPU utilization halved, and memory leak warnings were eliminated.",
    tags: ["Frontend Performance", "INP", "Web Workers", "React 19"],
    practiceCount: 7,
    lastPracticed: "2026-03-19T21:40:00",
    isFavorite: false
  },
  {
    id: "q-5",
    category: "Company-Specific",
    question: "Why Stripe? What is an area where Stripe's developer experience could be significantly elevated?",
    situation: "Stripe sets the gold standard for developer documentation and clean API ergonomics.",
    task: "Demonstrate nuanced product understanding beyond standard praise by critiquing a real technical friction point.",
    action: "I analyze how Stripe Webhook debugging in complex local development environments often causes state drift when testing multi-step SCA (3D Secure) and asynchronous ACH flows. I articulate how integrating automated mock webhook event replays directly inside Stripe CLI would shorten dev iteration cycles from hours to minutes.",
    result: "Demonstrates high product empathy, developer-first obsession, and deep understanding of developer tooling.",
    tags: ["Stripe", "Developer Experience", "APIs", "Webhooks"],
    practiceCount: 4,
    lastPracticed: "2026-03-20T14:10:00",
    isFavorite: true
  }
];

export const INITIAL_CONTACTS = [
  {
    id: "c-1",
    name: "Sarah Chen",
    company: "Google",
    role: "Staff Software Engineer (Cloud Spanner)",
    howWeMet: "Keynote Speaker at Systems & Distributed Infra Summit 2025",
    linkedIn: "https://linkedin.com/in/sarah-chen-demo",
    email: "sarahchen@google.com",
    lastContactDate: "2026-03-19",
    followUpDue: "2026-03-27",
    status: "In Touch",
    notes: "Submitted internal referral for Google Cloud Core Staff role. Mentioned team prioritizes candidates with proven Raft consensus experience. Promised to update her after Technical screen."
  },
  {
    id: "c-2",
    name: "Alex Rivers",
    company: "Stripe",
    role: "Engineering Manager, Core Platform",
    howWeMet: "Ex-colleague at Series B FinTech startup (2022-2024)",
    linkedIn: "https://linkedin.com/in/alex-rivers-demo",
    email: "arivers@stripe.com",
    lastContactDate: "2026-03-10",
    followUpDue: "2026-03-24",
    status: "Needs Follow-up",
    notes: "Championed my profile to the recruiting team. Need to send a thank you update regarding upcoming final onsite round on March 28."
  },
  {
    id: "c-3",
    name: "Maya Patel",
    company: "Anthropic",
    role: "Senior Technical Talent Lead",
    howWeMet: "Outreach via LinkedIn InMail",
    linkedIn: "https://linkedin.com/in/maya-patel-demo",
    email: "mpatel@anthropic.com",
    lastContactDate: "2026-03-21",
    followUpDue: "2026-03-25",
    status: "Referral Requested",
    notes: "Scheduled initial phone screen for March 25. Shared portfolio link and distributed agent architectures overview."
  },
  {
    id: "c-4",
    name: "David Kim",
    company: "Figma",
    role: "Senior Systems Engineer",
    howWeMet: "University CS Alumni Network",
    linkedIn: "https://linkedin.com/in/david-kim-demo",
    email: "dkim@figma.com",
    lastContactDate: "2026-02-28",
    followUpDue: "2026-03-15",
    status: "Needs Follow-up",
    notes: "Offered advice on Figma team culture and compensation bands. Need to send note sharing that I received the official offer."
  }
];

export const INITIAL_CALENDAR_EVENTS = [
  {
    id: "evt-1",
    title: "Google Cloud Technical Deep-Dive",
    company: "Google",
    type: "Technical Round",
    date: "2026-03-26",
    time: "14:00 - 15:30",
    interviewer: "Marcus Vance (Principal Architect)",
    meetingLink: "https://meet.google.com/xyz-demo-code",
    notes: "Focus on distributed consensus, data replication across geo-regions, and live distributed systems debugging."
  },
  {
    id: "evt-2",
    title: "Stripe Final Onsite Loop (Rounds 1 - 4)",
    company: "Stripe",
    type: "Onsite Loop",
    date: "2026-03-28",
    time: "10:00 - 15:00",
    interviewer: "Stripe Hiring Committee & Infra Team",
    meetingLink: "https://stripe.zoom.us/j/demo-onsite",
    notes: "System design: Idempotency & high-throughput ledgers. Behavioral with Engineering Director."
  },
  {
    id: "evt-3",
    title: "Anthropic Initial Screen with Recruiter",
    company: "Anthropic",
    type: "Phone Screen",
    date: "2026-03-25",
    time: "11:30 - 12:00",
    interviewer: "Maya Patel",
    meetingLink: "https://anthropic.zoom.us/j/demo-screen",
    notes: "Focus on salary alignment, motivation for Frontier AI systems, and project experience."
  },
  {
    id: "evt-4",
    title: "Peer Mock Interview: Hard Behavioral STAR Drill",
    company: "Independent Prep",
    type: "Mock Interview",
    date: "2026-03-27",
    time: "18:00 - 19:15",
    interviewer: "Jordan Lee (Staff SWE @ Meta)",
    meetingLink: "https://meet.google.com/mock-interview-session",
    notes: "Drill conflicts, failures, trade-offs, and executive influence questions under 3-minute timers."
  }
];

export const INITIAL_CHEAT_SHEET = {
  elevatorPitch: "I'm a Staff-level Infrastructure & Platform Software Engineer with 8+ years building mission-critical distributed systems and developer platforms. Most recently, I architected event-driven streaming and high-reliability payments infrastructure serving tens of millions of users with 99.995% uptime. I thrive at the boundary of complex distributed systems architecture, developer ergonomics, and leading engineering teams through high-stakes migrations.",
  keyAchievements: [
    "Architected zero-downtime distributed caching layer processing 2.4B events/day, cutting P99 latency by 64% and cloud compute costs by $180,000/yr.",
    "Led cross-functional migration of 14 monolithic services into modular domain boundaries with zero incident regressions across 18 months.",
    "Mentored 6 engineers to senior promotions; established company-wide RFC architecture guild and incident post-mortem playbooks.",
    "Designed and shipped real-time idempotency framework handling $1.2B in annual transactional throughput without a single duplicate charge."
  ],
  salaryExpectations: {
    targetBase: "$250,000 - $280,000",
    equityTarget: "$100,000+ / year",
    targetTotalComp: "$380,000 - $430,000",
    walkAwayFloor: "$320,000 TC",
    currentActiveOffer: "Figma ($375,000 TC)"
  },
  savedLinks: [
    { label: "Engineering Resume (PDF)", url: "https://portfolio.dev/resume.pdf" },
    { label: "GitHub Profile", url: "https://github.com/engineering-lead" },
    { label: "System Design RFC Portfolio", url: "https://notion.site/system-design-vault" },
    { label: "LinkedIn Profile", url: "https://linkedin.com/in/engineering-lead" }
  ],
  questionsToAskInterviewers: [
    "What is the single biggest engineering bottleneck currently preventing the team from shipping twice as fast?",
    "How does the team handle post-mortems when an outage occurs? Are incidents treated as learning rituals or escalation vectors?",
    "What does success look like for this role at the 90-day and 1-year mark?",
    "How are major architectural trade-offs resolved when Staff engineers and Product Leads disagree on velocity vs. technical debt?",
    "What is the engineering culture around on-call rotations and pager burnout prevention?"
  ]
};

export const INITIAL_COMPANY_RESEARCH = {
  Google: {
    mission: "To organize the world's information and make it universally accessible and useful.",
    recentNews: "Expanding Cloud TPUs and custom silicon for Gemini 2.5 enterprise workloads; major focus on Sovereign Cloud and AI Infrastructure.",
    culture: "Consensus-driven, rigorous RFC and design doc culture, blameless post-mortems, high emphasis on foundational testing and scaling limits.",
    techStack: "Go, C++, Spanner, Borg, Stubby/gRPC, Bazel, Bigtable",
    questionsForThem: [
      "How is Cloud Core balancing immediate GenAI compute resource demands with traditional enterprise database reliability?",
      "What is the RFC review timeline typically like for cross-organizational changes at Staff level?"
    ]
  },
  Stripe: {
    mission: "To increase the GDP of the internet.",
    recentNews: "Acquisition of Bridge to accelerate stablecoin payments rails; surpassed $1T in total payment volume handled.",
    culture: "Meticulous documentation culture (writing over meetings), extreme user obsession, high craftsmanship bar, speed with precision.",
    techStack: "Ruby (Sorbet), Go, Java, Envoy, AWS, Kafka, PostgreSQL, Redis",
    questionsForThem: [
      "With the explosion of AI agents purchasing goods via APIs, how is the Core Platform preparing for 100x machine-to-machine traffic surges?",
      "How does Stripe maintain its high standard of API backward compatibility while modernizing legacy payment primitives?"
    ]
  },
  Anthropic: {
    mission: "Building reliable, interpretable, and steerable AI systems for public benefit.",
    recentNews: "Release of Claude 3.7 Sonnet with hybrid reasoning architecture and Computer Use APIs.",
    culture: "Safety-first research & engineering synergy, rapid deployment cadence, high degree of individual ownership and scientific rigor.",
    techStack: "Python, Rust, TypeScript, AWS, Google Cloud, Kubernetes, Ray",
    questionsForThem: [
      "How do platform engineers interface directly with researchers during model training and inference optimization cycles?",
      "What are the biggest scalability challenges with long-context caching and real-time tool execution?"
    ]
  },
  Figma: {
    mission: "To make design accessible to everyone and bridge the gap between design and code.",
    recentNews: "Major growth of Dev Mode and Figma Slides; deep investment in WebAssembly rendering engines.",
    culture: "Deep design craftsmanship, collaborative multi-player multiplayer-first mentality, rapid prototyping.",
    techStack: "TypeScript, React, C++ (WebAssembly), Rust, Ruby on Rails",
    questionsForThem: [
      "How is Figma Dev Mode evolving to automate code generation while preserving developer control over component design systems?"
    ]
  }
};

export const REFERRAL_TEMPLATES = [
  {
    id: "tmpl-friend",
    name: "Close Friend / Ex-Colleague",
    relationship: "Close Connection",
    subject: "Quick question regarding {role} at {company}",
    body: `Hey {name},

Hope you're doing great! Saw your recent work at {company} and it looks incredible.

I'm currently exploring new opportunities and noticed the {role} position open on your team. Given our time working together on distributed infra, I felt this is an exact match for my background.

Would you be open to putting in a quick internal referral for me? Here is my resume link ({resumeLink}) and the job requisition ({postingUrl}).

Let's catch up over coffee or a call soon either way!

Best,
{yourName}`
  },
  {
    id: "tmpl-alumni",
    name: "University Alumni Connection",
    relationship: "Alumni Network",
    subject: "Fellow Alum exploring engineering opportunities at {company}",
    body: `Hi {name},

I hope this message finds you well! I'm a fellow alum from {university}. 

I came across your profile while researching the engineering culture at {company} and was really inspired by your journey leading technical platforms there.

I am preparing to apply for the {role} opening and would love to hear a brief 10-minute perspective on what your team looks for in Staff candidates. If you feel comfortable, I'd also be grateful for an internal referral.

Thank you so much for your time and guidance!

Warm regards,
{yourName}
{linkedInUrl}`
  },
  {
    id: "tmpl-recruiter",
    name: "Recruiter / Talent Partner",
    relationship: "Recruiter InMail",
    subject: "Candidate for {role} — Staff Infrastructure Engineer",
    body: `Hi {name},

I noticed you lead technical recruiting for platform and infrastructure teams at {company}.

I have 8+ years of experience architecting high-throughput distributed systems, payments infrastructure, and developer platforms (most recently scaling pipelines handling 2B+ events/day with 99.995% uptime).

I am very interested in the {role} position ({postingUrl}). My background aligns directly with the team's engineering challenges.

I have attached my resume and system design portfolio here: {resumeLink}. Would love to connect for a quick introductory conversation!

Best regards,
{yourName}`
  },
  {
    id: "tmpl-cold",
    name: "Cold Outreach to Engineering Leader",
    relationship: "Cold Professional",
    subject: "Quick question on platform scalability at {company}",
    body: `Hi {name},

I follow your technical engineering posts on distributed architecture and really appreciated your recent insights on microservice boundaries.

I'm an infrastructure engineer specializing in high-throughput caching and resilient payments systems. I noticed {company} is expanding its platform engineering group for {role}.

I've researched your team's challenges around scaling multi-region consensus and built similar production systems handling 2.4B events/day. If you're open to it, I'd love to share a brief 2-page architecture deck on how I'd approach this problem at {company}.

Appreciate your time and keep up the fantastic work!

Best,
{yourName}`
  }
];

# InterviewOS — Candidate Mission Control & Offer Leverage

> **Mission Control for Software Interviews & Offer Leverage:** A luxury engineering command center for senior and staff software engineers. Unified pipeline tracking, battle-tested STAR repertoire drills, networking referral engine, and live call battle-station HUD.

---

## 1. Executive Summary

**InterviewOS** is an all-in-one job search command center built for high-stakes technical recruiting loops. Designed with a luxury obsidian and crimson visual architecture inspired by Apple Cupertino engineering standards, it unifies the entire recruiting lifecycle—from initial application submission and recruiter screening to technical deep-dives, onsite loops, and competing offer leverage negotiations.

### Core Philosophy
* **Zero AI Dashboard Clichés**: Pure typography segmented navigation, human date formatting (`Oct 24`), generous 3-column Cupertino staging cards, and zero toy monospace telemetry boxes or hashtag prefixes.
* **Apple-Grade Glassmorphism**: Multi-stop atmospheric crimson and scarlet glow pools, canvas-driven Perlin noise interactive waves, and backdrop-blur glass surfaces.
* **Candidate Data Sovereignty**: 100% local-first data persistence, offline resilience, and full one-click JSON backup and snapshot restore.

---

## 2. Capability Matrix

| Module | Purpose | Key Capabilities |
| :--- | :--- | :--- |
| **Hero Landing** | Flagship executive showcase | Interactive wave canvas, 5 core capability cards, and modal-driven Candidate Playbooks (STAR Blueprint, Offer Leverage SOP, Reverse Questions, Privacy Sovereignty). |
| **Pipeline Control** | Application lifecycle management | 3-column Cupertino staging cards, stage segmented filters (Applied, Screen, Tech, Onsite, Offer, Rejected), and slide-over candidate dossier. |
| **STAR Bank** | Behavioral & architectural rehearsal | Categorized question bank (System Design, Behavioral, Conflict, Culture), expandable Situation-Task-Action-Result breakdowns, and drill counters. |
| **Schedule** | Loop coordination | Upcoming technical screens and onsite rounds, countdown banner, 1-click video call launching, and prep agenda checklists. |
| **Networking Rolodex** | Referral engine | Inside advocate rolodex, cadence tracking, company linkings, and automated customizable referral outreach copy generator. |
| **Battle-Station HUD** | Live interview cockpit (`⌘J`) | Slide-out overlay drawer providing 60-second pitch notes, quantifiable architectural wins, compensation floor boundaries, and reverse questions. |
| **Analytics Engine** | Conversion velocity | Stage conversion funnel metrics, 7-day application velocity chart, active practice streak tracking, and offer yield calculations. |

---

## 3. Technology Stack & Design System

* **Architecture**: **MERN Stack** (MongoDB + Express.js + React 19 + Node.js)
* **Backend API**: [Express.js](https://expressjs.com/) on Node.js v26 with [Mongoose](https://mongoosejs.com/) ODM
* **Database**: [MongoDB](https://www.mongodb.com/) (Local / Atlas with automated seed scripts)
* **Frontend Framework & Build**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Routing**: [React Router DOM v7](https://reactrouter.com/) (Root `/` loads Hero showcase; `/workspace` launches mission control)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with obsidian & crimson custom design tokens
* **Canvas Simulation**: Custom canvas Perlin-noise interactive wave background (`InteractiveWavesBackground.jsx`)
* **Icons**: [Lucide React](https://lucide.dev/) (Refined vector strokes; zero emojis in navigation)
* **Visualization**: [Chart.js](https://www.chartjs.org/) + `react-chartjs-2` for stage funnels and velocity curves
* **Typography**:
  * Headings: `Clash Display`, `SF Pro Display`, `Inter`
  * Body: `Inter`, `SF Pro Text`, system-ui
  * Code/Keybindings: `JetBrains Mono`

---

## 4. Repository Structure

```
InterviewOS/
├── README.md                          # Master documentation and developer entry point
├── PENALTY_LOG.md                     # Strict persistent penalty & error prevention log
├── .gitignore                         # Dependencies, build output, and local exclusions
├── package.json                       # Scripts and project dependencies
├── vite.config.js                     # Vite configuration, dev port 5174, and /api reverse proxy
├── index.html                         # Entry HTML with custom typography links
│
├── server/                            # Node.js + Express + MongoDB Backend
│   ├── package.json                   # Server dependencies (express, mongoose, cors, dotenv)
│   ├── .env                           # Server environment variables (PORT=5001, MONGODB_URI)
│   └── src/
│       ├── server.js                  # Express bootstrap, CORS, morgan, and router mounting
│       ├── config/
│       │   └── db.js                  # Mongoose MongoDB connection & event handlers
│       ├── models/
│       │   ├── Application.js         # Applications schema with stage transition history
│       │   ├── Question.js            # STAR questions schema with drill counters
│       │   ├── Contact.js             # Networking advocate rolodex schema
│       │   ├── CalendarEvent.js       # Interview loops and schedule schema
│       │   ├── CheatSheet.js          # Live battle-station HUD schema
│       │   └── Profile.js             # Candidate target compensation and streak schema
│       ├── controllers/               # Express request handlers & audit logic
│       ├── routes/                    # REST API route declarations
│       └── seed.js                    # Flagship seed script to populate MongoDB
│
└── src/                               # React 19 Frontend Web Client
    ├── main.jsx                       # Application bootstrap
    ├── App.jsx                        # Route hierarchy (/ -> Hero, /workspace -> Mission Control)
    ├── services/
    │   └── api.js                     # REST API client interacting with Express backend
    ├── context/
    │   └── AppContext.jsx             # Hybrid local-first state, localStorage caching, and MongoDB sync
    ├── data/
    │   └── mockData.js                # High-signal seed data (applications, STAR bank, contacts, cheat sheet)
    ├── styles/
    │   ├── tokens.css                 # Obsidian & crimson luxury color tokens, typography scales, glass borders
    │   └── main.css                   # Tailwind directives, animations, and Cupertino glass utilities
    ├── components/
    │   ├── canvas/
    │   │   └── InteractiveWavesBackground.jsx  # Interactive Perlin-noise particle wave background
    │   ├── layout/
    │   │   ├── Shell.jsx              # Workspace shell with dynamic glow pools, drawer HUD, and modal dispatch
    │   │   └── TopHeader.jsx          # Apple macOS segmented navigation control, data export/import, profile pill
    │   └── specialized/
    │       ├── ApplicationInspector.jsx # Slide-over candidate company dossier & interview prep notes
    │       ├── CheatSheetDrawer.jsx   # Live battle-station HUD overlay (⌘J shortcut)
    │       └── QuickAddModal.jsx      # Unified candidate entry modal (Application, Question, Contact, Event)
    └── pages/
        ├── HeroPage.jsx               # Flagship landing page with full-bleed canvas & Cupertino playbooks
        ├── PipelinePage.jsx           # 3-column Cupertino staging cards & stage filter controls
        ├── QuestionsPage.jsx          # STAR question repository with expandable drill breakdowns
        ├── CalendarPage.jsx           # Interview schedule with 1-click meeting links & countdown banner
        ├── NetworkingPage.jsx         # Contact rolodex with dynamic referral template copy generator
        ├── CheatSheetPage.jsx         # Dedicated full-page live call battle-station
        └── AnalyticsPage.jsx          # Stage conversion funnel & 7-day velocity chart
```

---

## 5. Local Setup & Execution

### Prerequisites
* [Node.js](https://nodejs.org/) v18.0 or higher
* [MongoDB](https://www.mongodb.com/) (running locally on `mongodb://localhost:27017` or MongoDB Atlas URI)

### Full-Stack Launch
```bash
# 1. Install frontend & server dependencies
npm install
cd server && npm install && cd ..

# 2. Seed MongoDB with flagship applications and STAR questions
npm run seed

# 3. Launch the Express + MongoDB backend (port 5001)
npm run server:dev

# 4. In a second terminal, launch the Vite frontend (port 5174)
npm run dev
```

### Production Build
```bash
# Compile and optimize frontend for production
npm run build
```

### Installation
```bash
# Clone or navigate to the repository
cd InterviewOS

# Install dependencies
npm install

# Launch local development server
npm run dev
```
The dev server launches at `http://localhost:5174/` (or default port `5173`).

### Production Build
```bash
# Compile and optimize for production
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Keyboard Shortcuts

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| `⌘ + J` / `Ctrl + J` | Toggle Live Battle-Station HUD Drawer | Global (any workspace view) |
| `Escape` | Dismiss Active Modal, Drawer, or Inspector | Global |

---

## 7. Governance & Penalty System

This repository adheres to strict zero-deviation engineering standards documented in [`PENALTY_LOG.md`](file:///Users/tzierrr/.gemini/antigravity/scratch/InterviewOS/PENALTY_LOG.md). All AI dashboard tropes, emoji clutter, and unformatted data dumps are rigorously audited and prohibited.


import { Project, Experience, Testimonial, PostMortemEntry, SuccessStory, IndustryBlueprint, Standard, BlogPost } from './types';
import { AVATARS } from './utils/avatar-generator';

export const TECH_DESCRIPTIONS: Record<string, string> = {
  'Excel VBA': 'Visual Basic for Applications - Used to automate complex Excel workflows and financial reporting.',
  'Apps Script': 'Google Apps Script - Developing cloud-native automation and custom workspace integrations.',
  'Advanced Excel': 'Mastery of power queries, pivot tables, and complex array formulas for strategic data modeling.',
  'LaTeX': 'Professional document preparation for high-integrity institutional reports and academic formatting.',
  'Query Language': 'Utilizing Google Sheets QUERY function for complex data extraction and relational-style reporting.',
  'Relational Schema': 'Architecting data structures that ensure referential integrity and eliminate redundancy across systems.',
  'Data Validation': 'Hardened input constraints to ensure zero-error data entry and system stability.',
  'Multi-Currency Logic': 'Deterministic arithmetic for handling cross-border financial reconciliation across disparate currencies.',
  'BARS Scoring': 'Behaviorally Anchored Rating Scales for objective, evidence-based performance governance.',
  'TikZ': 'Programmatic creation of high-fidelity graphics and flowcharts within LaTeX documentation.',
  'Office 365': 'Enterprise suite management focusing on SharePoint governance and document security.',
  'Google Workspace': 'Admin-level control of collaborative environments and automated workspace scripts.',
  'Notion': 'Centralizing institutional knowledge and building structured operational wikis.',
  'Photoshop': 'High-fidelity visual communication and corporate branding asset creation.',
  'Custom Functions': 'Developing deterministic spreadsheet formulas via script to handle complex regional financial logic.',
};

export const TOOLS_STACK = [
  { category: 'Data & Automation', items: ['Advanced Excel', 'VBA', 'Apps Script', 'Dashboards', 'Pivot Tables'] },
  { category: 'Executive Operations', items: ['C-suite Support', 'Travel Logistics', 'Board Packs', 'Confidential Comms'] },
  { category: 'Digital Workspace', items: ['Office 365', 'Google Workspace', 'Zoom', 'Teams', 'Notion'] }
];

export const PROJECTS: Project[] = [
  {
    id: 'fmcg-erp',
    title: 'Integrated FMCG Distribution ERP',
    headline: 'From Ledger Chaos to Real-Time Control',
    badge: 'Production-Grade ERP • Zero-Code Architecture',
    category: 'Systems',
    description: 'Transforming a high-volume FMCG wholesale operation from disconnected manual ledgers into a unified relational ecosystem. This architecture delivers core ERP controls without enterprise overhead.',
    image: '/images/projects/fmcg-erp.webp',
    client: 'FMCG Wholesale Sector',
    impact: '80% Faster Invoicing',
    confidential: false,
    performanceData: [20, 15, 12, 8, 5, 4],
    technologies: ['Google Sheets', 'Query Language', 'Data Validation'],
    systemSpecs: [
      { label: 'Daily Capacity', value: '~300 Items' },
      { label: 'Order Execution', value: '98% Match' },
      { label: 'Ops Users', value: '5 Staff' },
      { label: 'SKU Count', value: '50+' },
      { label: 'Constraints', value: 'Zero Server Cost' }
    ],
    dataSchema: [
      'Dealers (DealerID, Name, CreditLimit, Terms)',
      'Products (SKU, PackSize, Unit, Category)',
      'PriceList (SKU, EffectiveDate, UnitPrice)',
      'Orders (OrderID, DealerID, OrderDate, Status)',
      'OrderLines (OrderID, SKU, Qty, UnitPriceSnapshot)',
      'LedgerEntries (EntryID, DealerID, Debit/Credit)'
    ],
    auditControls: [
      'Versioned Master Data',
      'Immutable Transaction Logs',
      'Correction via Reversal Protocol',
      'Daily Financial Reconciliation'
    ],
    fullCaseStudy: {
      challenge: 'Moving 5,000+ kg daily on brittle spreadsheets created 48-hour blind spots (Ledger Lag). Ghost inventory was sold frequently and credit limits were ignored, leading to ৳2-3L monthly overdue leakage.',
      solution: 'Architected a "One Source of Truth" relational engine in Google Sheets. Decoupled data layers ensured single entries instantly validate stock, enforce credit limits, and generate print-ready "Chalans" in under 4 minutes.',
      result: 'Reclaimed 16 minutes per invoice (80% gain). Achieved 100% pricing accuracy and zero unauthorized credit extensions since launch.',
      painPoints: [
        'Inventory Blindness (15-20% order shortfalls)',
        'Pricing Variance (8-12% revenue leakage)',
        'Credit Exposure risk'
      ]
    },
    postMortem: {
      risk: "Dynamic pricing changes causing legacy record corruption.",
      resolution: "Implemented a 'Static Reference' trigger script that locks pricing data upon invoice finalization."
    }
  },
  {
    id: 'med-ops',
    title: 'Medical Operations Control System',
    headline: 'Engineering Control in Medical Logistics',
    badge: 'Operational Systems Architecture',
    category: 'Systems',
    description: 'Moving beyond fragmented spreadsheets to a governed, audit-ready operations system. I architected a "Zero-Cost ERP" to govern the complex lifecycle of 3,100+ international patients.',
    image: '/images/projects/med-ops.webp',
    client: 'International Healthcare Logistics',
    impact: 'Zero Pipeline Failures',
    confidential: false,
    performanceData: [50, 40, 20, 5, 0, 0],
    technologies: ['Google Sheets', 'Relational Schema', 'Apps Script'],
    systemSpecs: [
      { label: 'Total Volume', value: '3,100+ Patients' },
      { label: 'Hospital Partners', value: '49+ Units' },
      { label: 'Agent Network', value: '98+ Partners' },
      { label: 'Pipeline Failure', value: '0% Recorded' },
      { label: 'Commission Visibility', value: '100.0%' }
    ],
    dataSchema: [
      'Data Definitions (Static DD_List.csv immutability anchor)',
      'Governance Layer (onEdit validation engine)',
      'Standardized Keys (APOLLO → APOLLO_CHN mapping)',
      'Patient Records (Lifecycle status tracker)',
      'Commission Ledger (MRP vs Agent Rates rec)'
    ],
    auditControls: [
      'Drift Protection (HOS_LIST reconciliation)',
      'Atomic Uniqueness (Entry-level duplicate rejection)',
      'Forced Ownership (Assignment mandatory logic)',
      'Visa-Gated Operations Architecture'
    ],
    fullCaseStudy: {
      challenge: 'Ad-hoc emails and disconnected spreadsheets created a "Black Box" operational environment. 49+ Hospital partners and 98+ agents were managed in silos, leading to significant revenue leakage risk and critical dependency failures where patients arrived without valid Visa Invitation Letters (VIL).',
      solution: 'Architected a 3-layer "Zero-Cost ERP". Implemented static CSV data definitions as immutability anchors, an active governance layer using Apps Script triggers to enforce data integrity, and a unified master ledger for commission reconciliation.',
      result: 'Unified operations for 3,100+ patients with zero visa-related pipeline failures. Achieved 100% commission visibility and eliminated the 48-hour "Black Box" reporting delay.',
      painPoints: [
        'Revenue Leakage (MRP vs Agent Rate gaps)',
        'Dependency Failures (Missing VILs)',
        'Siloed Hospital Data'
      ]
    },
    postMortem: {
      risk: "Data drift in hospital nomenclature causing broken relational links.",
      resolution: "Implemented a normalization trigger that maps 12+ naming variations to a single unique ISO-style key."
    }
  },
  {
    id: 'hr-docs',
    title: 'HR Documentation System',
    headline: 'Hiring Governance via Docs-as-Code',
    badge: 'Operational Systems Architecture • HR Governance',
    category: 'Governance',
    description: 'Built a docs-as-code HR architecture (LaTeX/TikZ + BARS) that enforces compensation rules, standardizes interviews, and produces audit-ready hiring artifacts aligned to BD Labour Act 2006.',
    image: '/images/projects/hr-docs.webp',
    client: 'Corporate HR Operations',
    impact: '30% Faster Hiring',
    technologies: ['LaTeX', 'TikZ', 'BARS Scoring'],
    systemSpecs: [
      { label: 'Salary Matrix', value: '9 Grades x 20 Steps' },
      { label: 'Competencies', value: '12+ Frameworks' },
      { label: 'Score Scale', value: '5-Point BARS' },
      { label: 'Compliance', value: 'Labour Act 2006' },
      { label: 'Audit Status', value: 'Audit-Complete' }
    ],
    dataSchema: [
      'Policy Kernel (Salary Matrix / Compliance Macros)',
      'Hiring Runtime (Question Banks / BARS Scorecards)',
      'Audit Artifacts (Memos / Decision Traces)',
      'ptecWarn (Auto-injected legal environments)'
    ],
    auditControls: [
      'GP-01: Evidence-before-Score (Build Fail Logic)',
      'GP-02: Salary Type Safety (Matrix Locking)',
      'GP-03: Compliance Injection (Auto-Footers)',
      'GP-04: Decision Traceability (Unique Trace IDs)'
    ],
    fullCaseStudy: {
      challenge: 'The organization faced a "Gut-Feeling" governance gap. Legal liability arose from hiring/termination lacking audit trails relative to the Bangladesh Labour Act 2006. Compensation chaos ensued from unauthorized negotiations, and interview subjectivity created indefensible hiring decisions.',
      solution: 'Engineered a "Policy Kernel + Hiring Runtime" architecture using LaTeX. Implemented an immutable salary matrix and BARS-anchored structured assessments. The system uses "Evidence-First" layouts where page geometry forces users to record evidence before assigning a score.',
      result: 'Accelerated time-to-hire by 30% while achieving zero audit findings. All hiring decisions are now backed by version-controlled, evidence-based artifacts that are legally defensible.',
      painPoints: [
        'Legal Liability Risk',
        'Compensation Chaos',
        'Interviewer Variance'
      ]
    },
    postMortem: {
      risk: "Manual score overrides bypassing the BARS governance anchors.",
      resolution: "Hard-coded a 'Compliance Logic Gate' in the document build process that flags and requires senior signing for any score-evidence mismatch."
    }
  },
  {
    id: 'payroll-control',
    title: 'Multi-Entity Payroll & Compensation Control System',
    headline: 'Payroll Governance via Compile-Time Control',
    badge: 'Operational Systems Architecture • Payroll Controls',
    category: 'Automation',
    description: 'Built a zero-error payroll engine (Google Sheets + App Script) that enforces pro-rata salary logic, manages complex exceptions, and produces audit-ready compensation artifacts across 9 entities.',
    image: '/images/projects/payroll-control.webp',
    client: 'Multi-National Enterprise',
    impact: '100% Payroll Accuracy',
    performanceData: [15, 12, 8, 4, 1, 0],
    technologies: ['Google Sheets', 'Apps Script', 'Custom Functions'],
    systemSpecs: [
      { label: 'Headcount', value: '80+ Employees' },
      { label: 'Legal Entities', value: '9 Entities' },
      { label: 'Cycle Time', value: '5 Days → 2 Hours' },
      { label: 'Payout Variance', value: '15% → 0%' },
      { label: 'Exception Logic', value: '100% Tracked' }
    ],
    dataSchema: [
      'Salary Matrix Kernel (9 Grades × 20 Steps)',
      'Exception Runtime (SpellNumberBDT + Logging)',
      'Pro-Rata Engine (EOMONTH / Calendar logic)',
      'Audit Artifacts (Memos / Decision Logs)'
    ],
    auditControls: [
      'Hard-coded Matrix Constraints',
      'Immutable Transaction Versioning',
      'Custom Function Traceability (JS)',
      'Currency-to-Words Output Logic'
    ],
    fullCaseStudy: {
      challenge: '80+ employees across 9 entities faced a pro-rata compensation crisis. Manual math (days/30 × salary) caused persistent payout variances. Unauthorized salary promises broke internal equity, while bonuses and deductions remained trapped in fragmented email chains.',
      solution: 'Architected an "Inputs → Controls → Outputs" engine. Implemented a hard-coded Salary Matrix Kernel to prevent off-grid pay deviations. Developed a Pro-Rata runtime using EOMONTH() date arithmetic that ensures precision for mid-month joining (e.g., (17/31) × ৳45,000 for a May 15 start).',
      result: 'Reached 100% payroll accuracy with zero unauthorized salary adjustments. Reduced the processing cycle from 5 days to 2 hours while ensuring a complete BDT-level audit trail for every transaction.',
      painPoints: [
        'Pro-Rata Calculation Errors',
        'Unauthorized Salary Promises',
        'Fragmented Exception Records'
      ]
    },
    postMortem: {
      risk: "Leap year and month-end variations causing pro-rata rounding mismatches.",
      resolution: "Replaced static divisor logic with dynamic EOMONTH() date arithmetic to ensure 100% mathematical precision across all calendar cycles."
    }
  },
  {
    id: 'trade-finance',
    title: 'Trade Finance & Commission Control Ledger',
    headline: 'From Import Chaos to Payment Certainty',
    badge: 'Trade Finance Governance · Financial Controls',
    category: 'Finance',
    description: 'Architecting a zero-cost financial operations system to govern cross-border indent transactions. This system synchronizes Letter of Credit (LC) timelines with shipment milestones and ensures 100% commission reconciliation.',
    image: '/images/projects/trade-finance.webp',
    client: 'Global Trading Partner',
    impact: '15% Revenue Recovery',
    performanceData: [2, 5, 8, 11, 14, 15],
    technologies: ['Google Sheets', 'Multi-Currency Logic', 'Data Validation'],
    systemSpecs: [
      { label: 'Transaction Types', value: 'LC / TT / Indent' },
      { label: 'Currency Nodes', value: 'USD, GBP, BDT' },
      { label: 'Compliance', value: 'Intl. Trade Standard' },
      { label: 'Commission Visibility', value: '100.0%' },
      { label: 'Audit Status', value: 'Audit-Ready' }
    ],
    dataSchema: [
      'Trade Milestones (PI → LC → Shipment → Payment)',
      'Multi-Currency Normalization Logic',
      'Principal vs Agent Commission Matrix',
      'Document Tracking Ledger (Vessel/AWB status)',
      'Audit Trace ID (Unique Transaction Key)'
    ],
    auditControls: [
      'LC-Milestone Synchronization',
      'Currency-to-Words deterministic output',
      'Principal Commission Reconciliation triggers',
      'Versioned Document Integrity'
    ],
    fullCaseStudy: {
      challenge: 'Financial instruments (LC/TT), shipment milestones, and commission receivables lived in "separate universes." This fragmentation created significant revenue leakage risks (5-15% per transaction) due to untracked commissions and multi-currency reporting blindness across USD, GBP, and BDT.',
      solution: 'Architected a lifecycle-based financial control system. Engineered a unified trade engine that synchronizes Letter of Credit timelines with real-time shipment milestones. Implemented multi-currency normalization logic to provide a single source of truth for principal-agent reconciliation and commission tracking.',
      result: 'Achieved 100% visibility into commission streams, resulting in a 15% revenue recovery through reclaimed missing payments. The system delivered a fully audit-ready financial environment for international trade operations.',
      painPoints: [
        'Revenue Leakage Risk (5-15%)',
        'Payment Instrument Blindness',
        'Multi-Currency Reconciliation Debt'
      ]
    },
    postMortem: {
      risk: "FX Rate volatility causing ledger variance between booking and realization.",
      resolution: "Implemented an 'FX Lock' trigger that snapshots the exchange rate at the point of LC opening for reporting, while maintaining a dynamic current-rate view for liquidation."
    }
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Prominent Tec (Gulshan, Dhaka)',
    role: 'Executive – Administration',
    period: '2024 — PRESENT',
    description: [
      'Proactively manage complex C-suite schedules, multi-national travel, and confidential communications.',
      'Prepare board materials, strategic reports, and high-impact executive presentations.',
      'Oversee HR operations, IT support and financial administration, introducing automation to reduce manual work.'
    ],
    logo: AVATARS.PT,
    narrativeStage: 'Autonomous Sovereignty',
    philosophyEvolution: 'Strategic C-Suite support requires invisible, high-integrity systems to protect leadership focus.',
    hardLessonLearned: 'Manual scheduling in global operations represents a critical risk to institutional momentum.',
    systemBuilt: 'The Executive Support Cluster: An automated engine for multi-national coordination.',
    cumulativeAsset: 'A methodology for high-pressure, zero-error board-level operations.',
    complexityScale: 'Enterprise Operations'
  },
  {
    company: 'Dreams IT Park (Sylhet)',
    role: 'Administrative Coordinator',
    period: '2022 — 2023',
    description: [
      'Directed end-to-end curriculum cycles for multiple technical programs.',
      'Managed logistics, resource allocation and academic compliance.',
      'Mentored 650+ learners with strong completion and placement outcomes.'
    ],
    logo: AVATARS.DI,
    narrativeStage: 'Standardized Architecture',
    philosophyEvolution: 'Logistics and resource allocation are the hidden foundations of successful academic operations.',
    hardLessonLearned: 'Scale in mentorship is only possible through rigorous resource allocation.',
    systemBuilt: 'The Academic Compliance Hub: A centralized logistics engine for curriculum delivery.',
    cumulativeAsset: 'A framework for mentoring 600+ users without loss of operational quality.',
    complexityScale: 'Scaling Startup'
  },
  {
    company: 'I-Con Computer Institute (Sylhet)',
    role: 'Operations Officer',
    period: '2019 — 2021',
    description: [
      'Redesigned core curriculum, improving learning outcomes by ~30%.',
      'Oversaw lab operations and IT assets, ensuring safe, efficient workflows.',
      'Conducted continuous assessments and mentoring to build technical proficiency.'
    ],
    logo: AVATARS.IC,
    narrativeStage: 'Chaos Remediation',
    philosophyEvolution: 'Workflows must be engineered for safety and efficiency to maximize learning outcomes.',
    hardLessonLearned: 'Legacy curricula often lead to stagnant outcomes; iterative redesign is the only path.',
    systemBuilt: 'The Core Lab Workflow: A safe and efficient framework for technical lab operations.',
    cumulativeAsset: 'Curriculum optimization patterns for high-throughput training environments.',
    complexityScale: 'Small Team'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Michael Rodriguez',
    position: 'CFO, Greenotex Ltd',
    content: "Abu transformed our weekly finance close from a 6-hour manual nightmare into a 30-minute automated process. The system he built is audit-proof and has eliminated all post-close adjustments.",
    avatar: AVATARS.MR
  },
  {
    name: 'Sarah Kim',
    position: 'CEO, Prominent Tec',
    content: "Abu redesigned our entire board pack process. What used to take 3 days of manual compilation now happens automatically. Our investors get real-time dashboards.",
    avatar: AVATARS.SK
  },
  {
    name: 'David Lee',
    position: 'Managing Director, Texicon BD',
    content: "Abu built us a calendar management system that actually understands executive priorities. My leadership team coordination is now seamless. 8 hours saved per week.",
    avatar: AVATARS.DL
  },
  {
    name: 'Jennifer Park',
    position: 'COO, Modern Accessories',
    content: "Abu doesn't just automate tasks—he redesigns how teams think about work. His data tracker eliminated our spreadsheet chaos and gave us real-time visibility.",
    avatar: AVATARS.JP
  },
  {
    name: 'Emma Chen',
    position: 'Operations Manager, Summit Corp',
    content: "Abu's workflow automation transformed how our team handles approvals. What used to take 2 days now completes in 2 hours. The ROI was immediate.",
    avatar: AVATARS.EC
  }
];

export const EDUCATION = [
  { degree: 'B.S.S (Honors) in Economics', school: 'National University', year: '2023' },
  { degree: 'Higher Secondary School Certificate (HSC)', school: 'Jalalpur Jalalia College', year: '2017' },
  { degree: 'Secondary School Certificate (SSC)', school: 'Atgram Amzadia Institute', year: '2015' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-01',
    title: 'Manual Bridge Debt: Forensic Analysis of the ৳3L Monthly Leakage',
    date: 'March 2024',
    readTime: '8 min read',
    category: 'Engineering',
    excerpt: 'Identifying the precise moment when administrative overhead transitions from necessary friction into architectural failure.',
    author: { name: 'Abu Rahat Sabir', role: 'Executive – Administration' },
    content: `Administrative "Human-Bridge" debt is the most expensive unlisted liability on your P&L. It represents the hours spent manually reconciling disparate systems (Stripe to NetSuite, WhatsApp to Excel) that could be neutralized with deterministic script logic. In my latest audit, I identified that manual ledger lag was costing a mid-market FMCG player over ৳3L monthly in untracked revenue leakage. Reclaiming this capital requires moving from 'Support' to 'Architecture'.`
  },
  {
    id: 'blog-02',
    title: 'Idempotent Operations: Building Self-Healing Administrative Loops',
    date: 'February 2024',
    readTime: '6 min read',
    category: 'Governance',
    excerpt: 'Why generic productivity tools fail without the enforcement of deterministic state logic and recovery protocols.',
    author: { name: 'Abu Rahat Sabir', role: 'Executive – Administration' },
    content: `A system that breaks when triggered twice is a liability, not an asset. In corporate administration, we must build for idempotency—ensuring that an automated invoice, travel booking, or board report remains in a valid state even if the trigger repeats. By leveraging 'Static Reference' triggers in Apps Script, we ensure our administrative loops are self-healing and audit-proof.`
  },
  {
    id: 'blog-03',
    title: 'Institutional Sovereignty: Architecture Over Apps',
    date: 'January 2024',
    readTime: '7 min read',
    category: 'Strategy',
    excerpt: 'How executive admins can architect internal logic layers that outlast third-party vendor cycles.',
    author: { name: 'Abu Rahat Sabir', role: 'Executive – Administration' },
    content: `SaaS sprawl is a threat to institutional memory. When your core logic lives inside 40 different proprietary apps, you lose operational sovereignty. My methodology focuses on building 'Logic Kernels'—centralized, version-controlled scripts and schemas that the organization owns completely. This ensures that even if you switch vendors, your administrative intelligence remains intact.`
  },
  {
    id: 'blog-04',
    title: 'The Manual Debt Trap: How Finance Teams Waste $100K+ Per Year',
    date: 'April 2024',
    readTime: '12 min read',
    category: 'Finance',
    excerpt: 'A forensic analysis of hidden costs in manual financial workflows and the ROI case for automation.',
    author: { name: 'Abu Rahat Sabir', role: 'Executive – Administration' },
    content: `Every month-end close that takes 5 days instead of 8 hours represents $8,000+ in wasted labor costs for a mid-sized finance team. But the real cost isn't just time—it's the compounding errors, delayed decisions, and revenue leakage that manual processes create.

## The Hidden Costs of Manual Finance Operations

In my work with a multi-entity wholesale distributor, I discovered that their "efficient" finance team was actually bleeding ৳2-3L monthly through three invisible cost centers:

### 1. Ledger Lag (48-Hour Blind Spot)
Manual reconciliation between sales, inventory, and accounts receivable created a 48-hour information gap. During this window, sales teams were unknowingly selling ghost inventory and extending credit beyond approved limits. **Cost: ৳1.2L monthly in overdue receivables.**

### 2. Pricing Variance (8-12% Revenue Leakage)
Without automated price list management, sales invoices reflected outdated pricing 8-12% of the time. The company was either overcharging customers (damaging relationships) or undercharging (losing margin). **Cost: ৳800K monthly in margin erosion.**

### 3. Manual Reconciliation Overhead
Three finance staff spending 60% of their time on data entry, cross-checking, and error correction instead of analysis and strategic work. **Cost: ৳1L monthly in opportunity cost.**

## The Architecture Solution

I built a relational ERP layer on Google Sheets that eliminated all three cost centers:

- **Real-time ledger synchronization** using QUERY functions and data validation
- **Automated price list management** with effective-date logic and snapshot triggers
- **Self-reconciling workflows** that eliminate manual cross-checking

**Result:** 80% faster invoicing, 100% pricing accuracy, and ৳2-3L monthly in reclaimed capital.

[See the full FMCG ERP case study](#/work/fmcg-erp) | [Calculate your savings potential](#/diagnostic)

## Keywords
manual processes cost, finance automation ROI, month-end close optimization, accounts payable automation, financial process improvement, ERP implementation, operational efficiency, cost reduction strategies`
  },
  {
    id: 'blog-05',
    title: 'Why Your ERP Failed (And How to Fix It)',
    date: 'May 2024',
    readTime: '10 min read',
    category: 'Systems',
    excerpt: 'Common ERP implementation mistakes and the preventative architecture patterns that ensure success.',
    author: { name: 'Abu Rahat Sabir', role: 'Executive – Administration' },
    content: `Enterprise software vendors promise "digital transformation" but deliver vendor lock-in and change management nightmares. After analyzing 5+ failed ERP implementations, I've identified the architectural patterns that separate success from $500K write-offs.

## The Three Fatal Mistakes

### Mistake #1: Buying Before Building Requirements
Organizations select ERP platforms based on vendor demos instead of documented business logic. The result? 60% of features go unused while critical workflows require expensive customization.

**The Fix:** Document your relational data model FIRST. Map every entity (customers, products, orders) and their relationships. Only then evaluate whether you need enterprise software or if a zero-cost architecture can deliver 80% of the value.

### Mistake #2: Ignoring Data Migration Complexity
"We'll clean up the data during migration" is the most expensive lie in enterprise IT. Dirty data doesn't get cleaner—it multiplies during migration, creating referential integrity nightmares.

**The Fix:** Build data governance BEFORE migration. In my medical operations system, I implemented a static CSV data definition layer that enforced normalization rules. This prevented the "12 naming variations for the same hospital" problem that kills most healthcare ERPs.

[See the Medical Operations case study](#/work/med-ops)

### Mistake #3: Treating ERP as a Technology Project
ERP implementations fail when treated as IT initiatives instead of operational redesign. The technology is easy—changing how people work is hard.

**The Fix:** Start with workflow automation on existing tools (Excel, Google Sheets). Build the governance logic, validate the business rules, and THEN decide if you need enterprise software. Often, you don't.

## The Zero-Cost ERP Alternative

For organizations under 100 users, I recommend building on tools you already own:

- **Google Sheets + Apps Script** for relational data architecture
- **VBA + Advanced Excel** for complex financial logic
- **LaTeX + Version Control** for audit-ready documentation

This approach delivers:
- **Zero licensing costs** (vs. $50K+ annually for enterprise ERP)
- **Complete logic ownership** (no vendor lock-in)
- **3-6 month implementation** (vs. 18-24 months for traditional ERP)

[Explore operational systems architecture](#/solutions) | [Request a systems audit](#/diagnostic)

## Keywords
ERP implementation failure, ERP best practices, enterprise system migration, legacy system replacement, zero-cost ERP, business process automation, digital transformation, change management, data migration`
  },
  {
    id: 'blog-06',
    title: 'From Spreadsheets to Systems: Your 90-Day Roadmap',
    date: 'June 2024',
    readTime: '15 min read',
    category: 'Strategy',
    excerpt: 'A step-by-step guide for transitioning from fragmented spreadsheets to governed operational systems.',
    author: { name: 'Abu Rahat Sabir', role: 'Executive – Administration' },
    content: `Spreadsheets are the duct tape of business operations—quick, flexible, and eventually catastrophic. Here's how to migrate from spreadsheet chaos to production-grade systems in 90 days without enterprise software.

## Phase 1: Data Architecture (Days 1-30)

### Week 1-2: Audit Current State
Document every critical spreadsheet:
- Who owns it?
- What decisions depend on it?
- What breaks if it's corrupted?
- How many manual steps to update it?

### Week 3-4: Design Relational Schema
Convert spreadsheet chaos into normalized data entities:

**Before (Spreadsheet Hell):**
- Customer_List_Final_v3.xlsx
- Orders_2024_Updated.xlsx
- Pricing_March.xlsx (with 12 tabs)

**After (Relational Architecture):**
- Customers (CustomerID, Name, CreditLimit)
- Products (SKU, UnitPrice, EffectiveDate)
- Orders (OrderID, CustomerID, OrderDate)
- OrderLines (OrderID, SKU, Qty, PriceSnapshot)

[See how I did this for an FMCG distributor](#/work/fmcg-erp)

## Phase 2: Governance Layer (Days 31-60)

### Build Data Validation Rules
Prevent garbage data at the source:
- Dropdown lists for categorical data
- VLOOKUP validation for foreign keys
- Conditional formatting for out-of-range values
- Apps Script triggers for referential integrity

### Implement Audit Trails
Every change needs a paper trail:
- Timestamp + User for all modifications
- Immutable transaction logs (append-only)
- Version control for master data
- Correction via reversal (never delete)

[See the governance framework I built for HR](#/work/hr-docs)

## Phase 3: Automation (Days 61-90)

### Automate Repetitive Workflows
Identify the "Human-Bridge" tasks:
- Manual data entry from emails → Apps Script parsers
- Cross-system reconciliation → QUERY functions
- Report generation → Automated dashboards
- Approval workflows → Trigger-based notifications

### Build Self-Healing Systems
Production systems need error recovery:
- Idempotency guarantees (safe to retry)
- Dead letter queues for failed operations
- Automatic rollback on validation failure
- Real-time monitoring and alerts

## The ROI Case

For a 50-person organization, this 90-day transformation typically delivers:
- **450+ hours reclaimed annually** (manual work elimination)
- **15-20% error reduction** (data validation + automation)
- **$50K+ cost avoidance** (vs. enterprise software licensing)
- **3-6 month payback period** (including implementation time)

[Calculate your specific ROI](#/diagnostic) | [See all case studies](#/work)

## Keywords
spreadsheet migration, business process automation, operational systems, data architecture, workflow optimization, digital transformation, process improvement, automation ROI, systems thinking, relational database design`
  },
  {
    id: 'blog-07',
    title: 'Governance Frameworks That Actually Scale',
    date: 'July 2024',
    readTime: '11 min read',
    category: 'Governance',
    excerpt: 'Building compliance and audit readiness into operational architecture from day one.',
    author: { name: 'Abu Rahat Sabir', role: 'Executive – Administration' },
    content: `Governance isn't a compliance checkbox—it's the architecture that prevents $500K audit findings and wrongful termination lawsuits. Here's how to build governance into your operational systems instead of bolting it on later.

## The Governance Gap

Most organizations treat governance as documentation theater:
- Policy PDFs that nobody reads
- Annual compliance training that everyone clicks through
- "Trust but don't verify" approval workflows
- Post-incident scrambling for audit trails

**The result?** When auditors arrive or lawsuits happen, there's no defensible evidence trail.

## The Architecture Approach

Governance should be **compile-time logic**, not runtime documentation. Here's how I build it:

### 1. Evidence-Before-Decision Architecture

In my HR documentation system, I used LaTeX page geometry to enforce governance:
- Interview scorecards require written evidence BEFORE numerical scores
- Salary offers must reference the locked compensation matrix
- Termination memos require specific legal compliance sections

**The system won't compile** if governance requirements aren't met. [See the HR Docs case study](#/work/hr-docs)

### 2. Immutable Audit Trails

Every operational system needs append-only transaction logs:
- **What** changed (before/after values)
- **Who** made the change (user ID + timestamp)
- **Why** it changed (reference to approval or trigger)
- **How** to reverse it (correction protocol)

In my payroll system, unauthorized salary adjustments are **architecturally impossible**—the matrix is hard-coded and requires multi-sig approval for deviations.

### 3. Automated Compliance Injection

Don't rely on humans to remember compliance requirements:
- Auto-inject legal disclaimers into employment contracts
- Force Bangladesh Labour Act 2006 references into termination docs
- Require evidence attachments for expense approvals over ৳10K
- Block invoice finalization if pricing variance exceeds 2%

## Real-World Impact

### Case Study: Payroll Governance
**Challenge:** 80 employees across 9 entities with unauthorized salary promises creating legal liability.

**Solution:** Built a "Policy Kernel" in Google Sheets with:
- Hard-coded 9×20 salary matrix (Grade × Step)
- Pro-rata calculation engine (EOMONTH date arithmetic)
- Exception logging with approval workflow
- Currency-to-words output for audit compliance

**Result:** 100% payroll accuracy, zero unauthorized adjustments, complete audit trail.

[See the full Payroll Control case study](#/work/payroll-control)

### Case Study: Trade Finance Compliance
**Challenge:** Multi-currency transactions with commission reconciliation blindness creating 5-15% revenue leakage.

**Solution:** Built LC-milestone synchronization with:
- Document tracking ledger (Vessel/AWB status)
- FX rate locking at LC opening
- Principal-agent commission matrix
- Audit trace IDs for every transaction

**Result:** 100% commission visibility, 15% revenue recovery, audit-ready financial environment.

[See the Trade Finance case study](#/work/trade-finance)

## The Governance Checklist

Every operational system should answer YES to these questions:

✅ Can you reconstruct any transaction from audit logs?  
✅ Are unauthorized changes architecturally impossible?  
✅ Do approval workflows have evidence requirements?  
✅ Is compliance logic enforced at compile-time?  
✅ Can you prove who approved what and when?  

If you answered NO to any of these, you have a governance gap.

[Request a systems audit](#/diagnostic) | [Explore reliability standards](#/governance)

## Keywords
operational governance, compliance automation, audit-ready systems, process governance, institutional controls, risk management, internal controls, regulatory compliance, audit trail, financial governance`
  }
];

export const ENGINEERING_STANDARDS: Standard[] = [
  {
    title: 'Idempotency Guarantees',
    technicalTerm: 'Idempotency',
    executiveBenefit: 'Prevent Double-Billing & Duplicate Work.',
    description: 'Ensuring that even if an automation triggers twice due to a network glitch, the action is only executed once.',
    icon: 'idempotency'
  },
  {
    title: 'Zero Data Loss Protocol',
    technicalTerm: 'DLQ Management',
    executiveBenefit: '100% Operational Continuity.',
    description: 'When systems fail, data is diverted to a holding bay for automatic retry or manual review.',
    icon: 'dlq'
  }
];

export const INDUSTRY_BLUEPRINTS: IndustryBlueprint[] = [
  {
    id: 'supply-chain',
    industry: 'Supply Chain',
    title: 'Relational FMCG Inventory Hub',
    description: 'Architecting a relational ERP layer on top of legacy spreadsheets for high-volume wholesale distribution.',
    compliance: ['Financial Integrity', 'Audit Transparency'],
    coreStack: ['VBA', 'Query Language', 'Relational Schema'],
    architectureMap: [
      { layer: 'Ingestion', components: ['Point of Sale', 'Vendor EDI'] },
      { layer: 'Logic', components: ['Relational Ledger', 'Credit Controller'] },
      { layer: 'Output', components: ['Auto-Invoicing', 'Tax Compliance'] }
    ],
    nightmareScenario: 'Inventory lag causing double-selling of physical stock.',
    preventativeArchitecture: 'Implemented Atomic Locking logic that snapshots inventory state before transaction finalization.'
  },
  {
    id: 'healthcare-ops',
    industry: 'Healthcare',
    title: 'International Patient Pipeline',
    description: 'A governance engine for multi-national patient logistics, managing 3,100+ lifecycle records with zero pipeline failure.',
    compliance: ['HIPAA Equivalent', 'Process Sovereignty'],
    coreStack: ['Apps Script', 'Cloud Triggers', 'M365'],
    architectureMap: [
      { layer: 'Intake', components: ['Global Agent Portal', 'Hospital Webhooks'] },
      { layer: 'Operations', components: ['Visa Automation', 'Clinical Tracking'] },
      { layer: 'Financial', components: ['Commission Rec', 'Payout Ledger'] }
    ],
    nightmareScenario: 'Patient arriving at international borders without valid invitation artifacts.',
    preventativeArchitecture: 'Hard-coded artifact verification gates that block travel logistics until clinical documents are hash-verified.'
  },
  {
    id: 'corporate-fin',
    industry: 'Corporate Finance',
    title: 'Audit-Ready Payroll Kernel',
    description: 'A deterministic payroll engine for multi-entity enterprises that eliminates pro-rata variances across disparate regions.',
    compliance: ['Labour Act 2006', 'SOX Compliance'],
    coreStack: ['Deterministic Arithmetic', 'LaTeX', 'VBA'],
    architectureMap: [
      { layer: 'Policy', components: ['Salary Matrix', 'Grade Lock'] },
      { layer: 'Runtime', components: ['Pro-Rata Engine', 'Tax Calculator'] },
      { layer: 'Audit', components: ['LaTeX Payslips', 'Compliance Trace'] }
    ],
    nightmareScenario: 'Unauthorized salary promises creating multi-year legal liability.',
    preventativeArchitecture: 'Policy Kernel locking that requires RSA-style multi-sig approval for any deviation from the base matrix.'
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'ss1',
    clientName: 'Prominent Tec',
    industry: 'Corporate',
    challenge: 'Handling complex C-suite schedules and sensitive board-level travel across multiple timezones manually.',
    solution: 'Engineered an automated Support Cluster using Apps Script to synchronize cross-timezone logic and confidential filings.',
    metrics: [
      { label: 'Time Reclaimed', value: '450+ Hrs/Yr' },
      { label: 'Error Rate', value: '0.00%' }
    ],
    logo: AVATARS.PT,
    outcomeDescription: 'Neutralized scheduling conflicts entirely while reclaiming 90% of manual compilation time.'
  },
  {
    id: 'ss2',
    clientName: 'Healthcare Logistics',
    industry: 'Medical Ops',
    challenge: 'Managing the complex lifecycle of 3,100+ patients with fragmented manual visa and clinical document checks.',
    solution: 'Architected a governed patient pipeline with automated verification gates and a unified relational ledger.',
    metrics: [
      { label: 'Volume Managed', value: '3,100+ Patients' },
      { label: 'Pipeline Failure', value: '0.0%' }
    ],
    logo: AVATARS.HL,
    outcomeDescription: 'Achieved 100% clinical documentation compliance and eliminated 48-hour reporting lags.'
  },
  {
    id: 'ss3',
    clientName: 'FMCG Wholesaler',
    industry: 'Supply Chain',
    challenge: 'High-volume wholesale invoicing with 15-20% order shortfalls due to manual ledger blindness.',
    solution: 'Deployed a "One Source of Truth" relational ERP layer that enforced credit limits and live stock validation.',
    metrics: [
      { label: 'Invoicing Speed', value: '80% Gain' },
      { label: 'Pricing Accuracy', value: '100%' }
    ],
    logo: AVATARS.FW,
    outcomeDescription: 'Eliminated ghost inventory sales and reclaimed ৳3L monthly in previously untracked revenue leakage.'
  }
];

export const POST_MORTEMS: PostMortemEntry[] = [
  {
    id: 'INC-2024-012',
    title: 'Schedule Conflict Prevention: The Timezone Logic Gap',
    date: 'Feb 2024',
    severity: 'High',
    incident: 'A multi-national travel booking nearly conflicted with a Board of Directors meeting.',
    rootCause: 'Lack of automated TZ verification in the legacy scheduling sheet.',
    resolution: 'Developed an automated timezone normalization script in Google Apps Script.',
    failSafeBuilt: 'Implemented a "Meeting Collision Detection" system that blocks conflicting calendar invites.',
    impact: 'Zero board meeting misses and 100% accurate international travel coordination.',
    tags: ['C-Suite Support', 'Google Apps Script', 'Governance']
  }
];

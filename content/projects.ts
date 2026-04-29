import { Project, Experience, Testimonial, PostMortemEntry, SuccessStory, IndustryBlueprint, Standard, BlogPost } from '../types';
import { WORK_ROUTE_TITLES } from './work-route-titles';

export const PROJECTS: Project[] = [
  {
    id: 'fmcg-erp',
    title: WORK_ROUTE_TITLES['fmcg-erp'],
    headline: 'From Ledger Chaos to Real-Time Control',
    badge: 'Production-Grade ERP • Zero-Code Architecture',
    category: 'Systems',
    description: 'A 106-column spreadsheet couldn\'t keep up with a business growing 66× in 14 months. I replaced it with a modular, field-ready operations system — purpose-built for R Group\'s DOHA Brand distribution across Sylhet Division.',
    image: '/images/projects/fmcg-erp.webp',
    client: 'FMCG Wholesale Sector',
    impact: '80% Faster Invoicing',
    confidential: false,
    completionDate: '2023-10-01',
    performanceData: [20, 15, 12, 8, 5, 4],
    technologies: ['Google Sheets', 'Query Language', 'Data Validation'],
    relevantFor: ['Operations Leaders', 'Founders'],

    // Hero metadata
    role: 'Systems Builder',
    industry: 'FMCG Distribution',
    timeline: 'Sep \'22 – Oct \'23',
    stack: 'Sheets → ERP',
    location: 'Sylhet, Bangladesh',
    readTime: '~8 min',
    caseStudyNumber: '01',

    // Problem section
    whatBroke: [
      'Returns, commissions, transport costs, and salaries crammed into one notes column — unsearchable, unstructured, unauditable',
      'No inventory layer — stock availability unknown without physically counting the warehouse',
      'SR commission: "983×15=14,745" typed by hand into a memo field every month. No verification possible.',
      '৳15,46,032 outstanding across 9 accounts — visible only to someone who knew to scroll to the right row',
      'Same 5 kg chili at ৳320, ৳335, ৳345, ৳385 across four consecutive orders — no price catalog'
    ],
    whatSystemDoes: [
      'Single source of truth for all 14 dealer accounts — balances, payment history, and running dues in one view',
      'Live inventory updated on every dispatch and return, linked to each delivery memo by order ID',
      'Commission engine: monthly kg × ৳15 per SR, auto-calculated on save — with advance deductions and multi-SR territories',
      'Dashboard shows every dealer\'s current due, advance credit, and last payment date in a single screen',
      'Versioned price catalog — one rate change applies forward to all dealers automatically'
    ],

    // System Design section
    systemSpecs: [
      { label: 'Daily Capacity', value: '~300 Items' },
      { label: 'Order Execution', value: '98% Match' },
      { label: 'Ops Users', value: '5 Staff' },
      { label: 'SKU Count', value: '50+' },
      { label: 'Constraints', value: 'Zero Server Cost' }
    ],
    modules: [
      { number: 'MODULE 01', title: 'Order Mgmt', subtitle: 'Entry · invoice · memo' },
      { number: 'MODULE 02', title: 'Dealer CRM', subtitle: 'Profiles · credit · history' },
      { number: 'MODULE 03', title: 'Product Catalog', subtitle: 'SKUs · pricing · history' },
      { number: 'MODULE 04', title: 'Inventory', subtitle: 'Stock · dispatch · returns' },
      { number: 'MODULE 05', title: 'SR Commission', subtitle: 'Auto-calc · territories' },
      { number: 'MODULE 06', title: 'Ledger', subtitle: 'Debit · credit · dues' },
      { number: 'MODULE 07', title: 'Returns', subtitle: 'Damage · short · defect' },
      { number: 'MODULE 08', title: 'Analytics', subtitle: 'KPIs · rankings · trends', highlight: true }
    ],

    // Features section
    features: [
      {
        number: '01',
        title: 'Multi-SKU order entry with live invoice',
        description: 'Select dealer, add any combination of product × size × quantity. Auto-calculates line totals, applies previous balance, generates a printed-quality memo. 7 product lines × 6 size variants, real-time total.',
        badge: 'Order management'
      },
      {
        number: '02',
        title: 'Rolling dealer ledger',
        description: 'Every dealer has a live account — 11 columns including prev balance, grand total, paid, running due, advance credit, and bank split. Payments via bank/bKash/cash reconciled. ৳2,49,24,450 total tracked.',
        badge: 'Finance'
      },
      {
        number: '03',
        title: 'Automated commission engine',
        description: 'SR commissions at ৳15/kg calculated automatically from monthly lifting volume. Handles partial months, advance deductions, and multi-SR territories. 22 commission events structured from raw notes.',
        badge: 'Finance'
      },
      {
        number: '04',
        title: 'Return & damage tracking',
        description: 'Every return event logged against the original memo — damage, production defect, short delivery. Each linked to original memo, with estimated kg and value, credit status, and resolution timeline.',
        badge: 'Returns'
      },
      {
        number: '05',
        title: 'Versioned price catalog',
        description: 'Price changes tracked with effective dates and reason codes — Chili +20.3%, Coriander +13.8%, Cumin +27.6% — tracked with effective dates and reason codes.',
        badge: 'Products'
      },
      {
        number: '06',
        title: 'Dashboard & analytics',
        description: 'Running dues by dealer, product mix donut, stacked volume trend, dealer performance ranking — all real data, zero manual work.',
        badge: 'Analytics'
      }
    ],

    // Before & After section
    beforeAfterTitle: 'Same workflows. Completely different outcomes.',
    beforeAfterSubtitle: 'The business didn\'t change. The structure around it did. Here\'s what the same daily tasks looked like before and after — in time, accuracy, and visibility.',
    beforeAfter: [
      {
        task: 'Recording a delivery',
        before: 'Add row to massive sheet. Type dealer name by hand. No link to inventory, no credit check, no code. Invisible to anyone who didn\'t write it.',
        after: 'Select dealer from validated list. System checks credit. Order ID auto-generates. Inventory adjusted in real time.'
      },
      {
        task: 'Onboarding a new dealer',
        before: 'Copy 106 columns from previous dealer block, adjust headers. Risk of formula error on every cell.',
        after: 'One record added to the dealers table. Ledger, commission tracking, inventory all work immediately.'
      },
      {
        task: 'Monthly business overview',
        before: 'Impossible without manually summing across all 14 dealer sections. Never happened in practice.',
        after: 'Dashboard KPIs, revenue chart, product mix, and dealer ranking update automatically from live data.'
      }
    ],

    // Impact / Results section
    highlightCards: [
      {
        indicator: '↑',
        title: '৳15,46,032 outstanding — 9 accounts',
        description: 'Dealers 977, 974, 975, 976 each carry ৳2L–৳4.6L unpaid from Aug 2023 deliveries. Surfaced immediately on dashboard.',
        color: 'red'
      },
      {
        indicator: '~',
        title: '18 return events · 3 still pending credit',
        description: 'Pattern identified: 10 of 18 returns clustered in Aug–Sep 2023 — same months as peak volume. Previously invisible in the sheet.',
        color: 'yellow'
      },
      {
        indicator: '↑',
        title: 'Revenue grew 66× in 14 months',
        description: 'Monthly orders from ৳57,640 (Sep 2022) to ৳38,70,740 (Oct 2023). 9 new dealers onboarded in a single quarter without losing track of a single balance.',
        color: 'blue'
      }
    ],
    resultStats: [
      { value: '2.37', label: 'Crore BDT · Total order value', description: '109 delivery memos fully reconciled with bank, bKash, and cash across 14 dealer accounts' },
      { value: '88,699', label: 'KG · Total dispatched', description: 'Chili 52% · Turmeric 28% · Coriander 19% · Tea & others 2% — tracked per SKU per delivery' },
      { value: '66×', label: 'Revenue growth', description: 'Monthly value from ৳57,640 (Sep 2022) to ৳38,70,740 (Oct 2023) — largest month on record' },
      { value: '14', label: 'Dealer accounts', description: '9 new accounts onboarded in one quarter (Feb–Apr 2023) without losing any balance history' }
    ],
    monthlyData: [
      { month: 'Sep 22', orders: 58, payments: 50 },
      { month: 'Oct 22', orders: 120, payments: 100 },
      { month: 'Nov 22', orders: 180, payments: 160 },
      { month: 'Dec 22', orders: 220, payments: 200 },
      { month: 'Jan 23', orders: 310, payments: 290 },
      { month: 'Feb 23', orders: 580, payments: 550 },
      { month: 'Mar 23', orders: 780, payments: 720 },
      { month: 'Apr 23', orders: 1050, payments: 980 },
      { month: 'May 23', orders: 1380, payments: 1290 },
      { month: 'Jun 23', orders: 1620, payments: 1540 },
      { month: 'Jul 23', orders: 1480, payments: 1410 },
      { month: 'Aug 23', orders: 3200, payments: 2800 },
      { month: 'Sep 23', orders: 3650, payments: 3100 },
      { month: 'Oct 23', orders: 3871, payments: 3600 }
    ],

    // Design Approach / Research section
    designPrinciples: [
      {
        title: 'The current mess is the spec',
        subtitle: 'PRINCIPLE 01',
        description: 'The most important step wasn\'t asking what should happen — it was mapping exactly what was actually happening. Every person had added a column to solve their own problem.',
        quote: 'The sheet had 106 columns. Nobody knows what half of them mean.'
      },
      {
        title: 'Model entities before screens',
        subtitle: 'PRINCIPLE 02',
        description: 'Most tools are built interface-first — screens before systems, features before data models. This project reversed that order deliberately. The screens clinched — they\'re just views over the entities that already existed.',
        quote: 'A good data model makes every screen obvious by definition.'
      },
      {
        title: 'One module, one concern',
        subtitle: 'PRINCIPLE 03',
        description: 'Ledger handles finance. Returns handles stock. Commission handles SR pay. Each module surfaces only what\'s relevant. The dashboard aggregates — it doesn\'t own anything.',
        quote: 'A system that can be understood by someone who didn\'t build it is a healthy, not an accident.'
      }
    ],
    researchTimeline: [
      {
        stage: '01',
        title: 'The sheet was the symptom, not the disease',
        quote: '"The sheet had 106 columns. Nobody knows what half of them mean?"',
        badges: ['Root cause identification', 'Data model analysis', 'BD Labour workflow'],
        content: 'The real problem wasn\'t the spreadsheet — it was that the business had no data model underneath it. Every person added a column to solve their own problem. Returns, salaries, commissions, and transport costs all shared one free-text notes field because there was nowhere else to put them. The final insight: this wasn\'t a UI problem. It was a structural one. The shape would survive any redesign until the underlying entities were defined.'
      },
      {
        stage: '02',
        title: 'Structure the entities and everything else resolves',
        badges: ['Entity design', 'Relational mapping', 'Normalization'],
        content: 'Dealer. Product. Price (by date). Order. Order line. Payment. Return. Once those seven entities were defined with clear relationships, every UI question answered itself. What does an invoice look like? It\'s an order with its lines, the current price snapshot, and the dealer\'s running balance. No ambiguity.'
      },
      {
        stage: '03',
        title: 'Build for the field, not the office',
        badges: ['Field testing', 'Edge cases', 'User workflows'],
        content: 'SR commission territories overlap. Dealers split payments across bank and bKash and cash in the same week. Prices change mid-month. Returns come back three deliveries later. None of these are edge cases — they\'re the actual workflow. Every module was stress-tested against real scenarios from the field before it was considered done.'
      },
      {
        stage: '04',
        title: '9 new dealers in one quarter, no balance lost',
        badges: ['Scale test', 'Onboarding', 'Data integrity'],
        content: 'The system onboarded 9 new dealer accounts between Feb–Apr 2023 during the highest-growth quarter on record. Zero formula errors. Zero missing balance entries. Each new dealer was operational in under 10 minutes — one row in the Dealers table, and every module worked immediately.'
      },
      {
        stage: '05',
        title: 'Returns were a hidden quality-control signal',
        badges: ['Pattern analysis', 'QC insight', 'Business intelligence'],
        content: '18 return events were logged across 14 months. 10 of them clustered in Aug–Sep 2023 — the same months as peak volume. Three were still pending credit resolution at handoff. Previously invisible. The returns module didn\'t just track credits — it surfaced a supplier quality problem that had been completely hidden inside a notes column.'
      }
    ],

    liveDemo: {
      description: 'The system is deployed and actively managing R Group\'s distribution operations across Sylhet Division.'
    },

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
    id: 'mocs',
    title: WORK_ROUTE_TITLES.mocs,
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
    relevantFor: ['Operations Leaders', 'Executive Assistants'],
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
      'Standardized Keys (APOLLO â†’ APOLLO_CHN mapping)',
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
    title: WORK_ROUTE_TITLES['hr-docs'],
    headline: 'Hiring Governance via Docs-as-Code',
    badge: 'Operational Systems Architecture • HR Governance',
    category: 'Governance',
    description: 'Built a docs-as-code HR architecture (LaTeX/TikZ + BARS) that enforces compensation rules, standardizes interviews, and produces audit-ready hiring artifacts aligned to BD Labour Act 2006.',
    image: '/images/projects/hr-docs.webp',
    client: 'Corporate HR Operations',
    impact: '30% Faster Hiring',
    technologies: ['LaTeX', 'TikZ', 'BARS Scoring'],
    relevantFor: ['Hiring Managers', 'Operations Leaders'],
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
    relevantFor: ['Operations Leaders', 'Founders'],
    systemSpecs: [
      { label: 'Headcount', value: '80+ Employees' },
      { label: 'Legal Entities', value: '9 Entities' },
      { label: 'Cycle Time', value: '5 Days â†’ 2 Hours' },
      { label: 'Payout Variance', value: '15% â†’ 0%' },
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
    badge: 'Trade Finance Governance Â· Financial Controls',
    category: 'Finance',
    description: 'Architecting a zero-cost financial operations system to govern cross-border indent transactions. This system synchronizes Letter of Credit (LC) timelines with shipment milestones and ensures 100% commission reconciliation.',
    image: '/images/projects/trade-finance.webp',
    client: 'Global Trading Partner',
    impact: '15% Revenue Recovery',
    performanceData: [2, 5, 8, 11, 14, 15],
    technologies: ['Google Sheets', 'Multi-Currency Logic', 'Data Validation'],
    relevantFor: ['Founders', 'Operations Leaders'],
    systemSpecs: [
      { label: 'Transaction Types', value: 'LC / TT / Indent' },
      { label: 'Currency Nodes', value: 'USD, GBP, BDT' },
      { label: 'Compliance', value: 'Intl. Trade Standard' },
      { label: 'Commission Visibility', value: '100.0%' },
      { label: 'Audit Status', value: 'Audit-Ready' }
    ],
    dataSchema: [
      'Trade Milestones (PI â†’ LC â†’ Shipment â†’ Payment)',
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

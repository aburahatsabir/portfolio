import { Project, Experience, Testimonial, PostMortemEntry, SuccessStory, IndustryBlueprint, Standard, BlogPost } from '../types';

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
    relevantFor: ['Operations Leaders', 'Founders'],
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
      challenge: 'Moving 5,000+ kg daily on brittle spreadsheets created 48-hour blind spots (Ledger Lag). Ghost inventory was sold frequently and credit limits were ignored, leading to à§³2-3L monthly overdue leakage.',
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
    title: 'HR Documentation System',
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

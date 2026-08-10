import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS, PROJECTS } from '../constants';
import { getWorkRoutePath } from '../content/work-route-titles';
import OptimizedImage from './OptimizedImage';
import NotFoundPage from './NotFoundPage';
import SectionLabel from './shared/SectionLabel';

const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
        }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        }
    }
};

interface PersonaConfig {
    id: string;
    headline: string;
    subheadline: string;
    whoThisIsFor?: string[];
    problemStatement?: {
        title: string;
        description: string;
    };
    painPoints: Array<{
        icon: React.ReactNode;
        title: string;
        description: string;
    }>;
    solution: {
        title: string;
        description: string;
        features: string[];
    };
    pillars?: Array<{
        title: string;
        positioning: string;
        outcomes: string[];
    }>;
    operatingModel?: Array<{
        step: string;
        description: string;
    }>;
    compatibility?: string | {
        environments: Array<{
            name: string;
            attributes: string[];
        }>;
        statement: string;
    };
    differentiation?: {
        title: string;
        description: string;
    };
    toolStack?: {
        title: string;
        items: string[];
    };
    finalStatement?: string;
    governance?: string[];
    caseReferences?: Array<{
        sector: string;
        challenge: string;
        outcome: string;
    }>;
    metrics: Array<{
        value: string;
        label: string;
    }>;
    cta: {
        primary: string;
        primaryLink: string;
        secondary: string;
        secondaryLink: string;
    };
    ctaSubtext?: {
        primary: string;
        secondary: string;
    };
    faq?: Array<{
        question: string;
        answer: string;
    }>;
    relevantCaseStudies: string[];
    relevantTestimonials: number[];
}

const PERSONAS: Record<string, PersonaConfig> = {
    'executive-assistants': {
        id: 'executive-assistants',
        headline: 'Executive Operations & Systems',
        subheadline: 'Strategic operations support for CEOs and senior leadership. Protecting principal time, structuring decisions, and enforcing disciplined execution across complex, confidential work.',
        whoThisIsFor: [
            'CEOs & Managing Directors',
            'Country Heads & Chair Offices',
            'Founders Scaling Operations',
            'MNC Leadership Teams',
            'Executive Search & HR'
        ],
        problemStatement: {
            title: 'The core problem: Urgency without structure.',
            description: 'When requests hit from every direction and priorities shift hourly, ownership breaks down. The result isn\'t just lost time—it is missed decisions, dropped handoffs, and exposed confidentiality risks. The root cause is never a lack of effort; it is a lack of structure.'
        },
        painPoints: [],
        solution: {
            title: 'Operational Resolution',
            description: 'I design disciplined execution frameworks that enforce accountability, guarantee predictability, and reclaim your time.',
            features: [
                'Time protection and structured request filtering',
                'Decision flow and follow-up tracking with defined owners',
                'Board-level documentation and preparation',
                'Inter-departmental and cross-functional coordination'
            ]
        },
        pillars: [
            {
                title: 'Executive Time Protection',
                positioning: 'Calendar and request rules designed to protect focus blocks, decision windows, and priority order. Meetings, briefs, and approvals are filtered by importance and timing — not urgency.',
                outcomes: [
                    'Filtering operational noise before it reaches the Principal',
                    'Focusing executive attention on high-value decision points',
                    'Protecting strategic bandwidth with structured request protocols'
                ]
            },
            {
                title: 'Decision & Follow-Up Systems',
                positioning: 'Leadership decisions converted into clear action logs with owners, deadlines, and escalation points. Follow-up does not depend on memory or message history.',
                outcomes: [
                    'Enforcing follow-up loops across departments with defined accountability',
                    'Ensuring executive directives are fully executed to close',
                    'Predictable progress tracking with named escalation paths'
                ]
            },
            {
                title: 'Operational Coordination',
                positioning: 'Finance, HR, Operations, Legal, and external stakeholders aligned around one execution rhythm. Board prep, reporting cycles, and leadership communication stay synchronised.',
                outcomes: [
                    'Bridging communication gaps between cross-functional teams',
                    'Zero-intervention logistical management across departments',
                    'Stakeholder alignment with consistent delivery timelines'
                ]
            },
            {
                title: 'Crisis & Risk Management',
                positioning: 'When urgency strikes, clear heads and structured responses matter. Sensitive escalations handled, misinformation contained, and the right people informed—without panic or delay.',
                outcomes: [
                    'Spotting operational risks before they reach the Principal',
                    'Resolving escalations calmly and with clear ownership',
                    'Staying composed and decisive under pressure'
                ]
            }
        ],
        operatingModel: [
            {
                step: 'Morning Briefing',
                description: 'Aligning on priorities and triaging urgent requests. The day starts with clarity, not chaos.'
            },
            {
                step: 'Active Execution',
                description: 'Managing stakeholder coordination, clearing inbox bottlenecks, and executing workflows autonomously.'
            },
            {
                step: 'Preparation & Reporting',
                description: 'Board packs, critical documents, and weekly reports are gathered and finalized well ahead of schedule.'
            },
            {
                step: 'Relentless Follow-Up',
                description: 'Chasing down pending items, holding teams accountable to deadlines, and ensuring no tasks fall through the cracks.'
            },
            {
                step: 'End-of-Day Debrief',
                description: 'A quick summary of completed work and a structured preview of tomorrow for a clean clock-out.'
            }
        ],
        compatibility: {
            environments: [
                {
                    name: 'Bangladesh Corporate Dynamics',
                    attributes: [
                        'Local hierarchy navigation',
                        'Strict confidentiality norms',
                        'Fast-changing executive direction'
                    ]
                },
                {
                    name: 'MNC Framework Standards',
                    attributes: [
                        'Reporting discipline',
                        'Documentation quality',
                        'Cross-border coordination'
                    ]
                }
            ],
            statement: 'A single, ruthless execution standard applied homogeneously across both environments.'
        },
        differentiation: {
            title: 'From task management to executive reliability.',
            description: 'I don’t just finish tasks; I build the systems that protect your time. By structuring decision flows and follow-up, I turn your office into a predictable, high-speed unit. The result is total execution consistency and faster decision speed for you.'
        },
        toolStack: {
            title: 'Structure comes first. Tools support the model.',
            items: [
                'Core Stack: Microsoft 365, Google Workspace, Excel/VBA, and Apps Script to enforce ownership, timeline control, documentation discipline, and secure communication flow.',
                'Relational Tracking: Auditable systems built on existing organisational tools — no new subscriptions required.',
                'Governed Communication: Structured protocols for high-stakes correspondence, board-level reporting, and role-based confidential access control.',
                'Documentation Libraries: SOPs and institutional records that preserve knowledge beyond any single team member.'
            ]
        },
        finalStatement: 'I am the infrastructure that allows you to lead.',
        caseReferences: [
            {
                sector: 'Manufacturing Group',
                challenge: 'Board pack inputs arrived from five production units without a single owner, causing version conflicts and last-minute preparation failures.',
                outcome: 'Built a centralised submission and review flow with defined cutoff points. Board pack readiness moved to a predictable 24–48 hour pre-meeting timeline, eliminating documentation errors.'
            },
            {
                sector: 'Executive Office',
                challenge: 'CEO and functional heads issued overlapping urgent requests with no priority logic, creating calendar conflict and decision bottlenecks across departments.',
                outcome: 'Introduced priority routing and escalation logic. Calendar conflict resolved. Decision throughput improved with a defined triage and handoff protocol.'
            },
            {
                sector: 'HR & Payroll Operations',
                challenge: 'Sensitive personnel files and payroll data were being shared through inconsistent channels with no access control or audit trail.',
                outcome: 'Applied role-based file access and controlled approval paths. Confidential handling became traceable, auditable, and review-ready — with zero incidents since implementation.'
            },
            {
                sector: 'Cross-Functional Delivery',
                challenge: 'Vendor and internal deliverables were agreed in meetings but follow-through was inconsistent, with no central ownership log or closure tracking.',
                outcome: 'Centralised action tracking with accountable owners and due dates. Closure rate improved significantly and leadership updates became cleaner, more reliable, and less time-consuming.'
            }
        ],
        metrics: [
            { value: '8–12 hrs', label: 'Time Reclaimed / Wk' },
            { value: '90%+', label: 'Closed Actions' },
            { value: '24–48 hrs', label: 'Reporting Speed' },
            { value: 'Zero', label: 'Security Leaks' },
            { value: '100%', label: 'Execution Rate' }
        ],
        cta: {
            primary: 'Start Hiring Conversation',
            primaryLink: '/contact',
            secondary: 'Review Operating Approach',
            secondaryLink: '/about'
        },
        relevantCaseStudies: ['payroll-control', 'hr-docs'],
        relevantTestimonials: [1, 2]
    },
    'operations-leaders': {
        id: 'operations-leaders',
        headline: 'Scale Your Operations Without the Chaos.',
        subheadline: 'Transforming fragile workflows into predictable, high-speed operations. Eliminating manual bottlenecks so your team can focus on execution, not administration.',
        whoThisIsFor: [
            'COOs & Operations Directors',
            'Plant & Factory Managers',
            'General Managers & Country Heads',
            'Supply Chain & Logistics Leaders',
            'MNC Regional Operations Teams'
        ],
        problemStatement: {
            title: 'Growth stalls when processes live in people\'s heads.',
            description: 'Every new order, new hire, and new location adds administrative weight. Teams spend their Fridays manually consolidating spreadsheets just to figure out what happened all week. Critical tasks depend on specific individuals, creating invisible single points of failure. The result isn\'t just lost time—it\'s margin-crushing inefficiency and a constant cycle of firefighting.'
        },
        painPoints: [
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                ),
                title: 'The Hero Dependency',
                description: 'Crucial workflows depend on specific individuals working late. When they are on leave or overloaded, the entire process simply stops.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                ),
                title: 'The Reporting Black Hole',
                description: 'Data is fragmented across emails, WhatsApp, and disconnected spreadsheets, causing agonizingly slow reporting cycles and decision paralysis.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                ),
                title: 'Margin-Crushing Headcount',
                description: 'Capacity is locked to people. Every time business grows 10%, you have to hire more staff just to handle the administrative mess.'
            }
        ],
        solution: {
            title: 'Governed Operations',
            description: 'I act as your strategic operations partner, designing bulletproof workflows and reporting frameworks that scale your capacity—built entirely on the tools your team already uses.',
            features: []
        },
        pillars: [
            {
                title: 'Single Source of Truth',
                positioning: 'Ending the multi-spreadsheet chaos. We create unified, reliable trackers using the tools you already own so everyone looks at the same numbers in real-time, eliminating duplicate entry and manual errors.',
                outcomes: [
                    'Eliminating duplicate data entry and manual errors across departments',
                    'Providing real-time visibility without hours of manual consolidation',
                    'Enforcing strict data integrity so information never drifts'
                ]
            },
            {
                title: 'Automated Handoffs & Approvals',
                positioning: 'Work moves forward automatically. We convert manual approvals and task routing into strict workflows, removing human bottlenecks and scaling your team\'s throughput without adding headcount.',
                outcomes: [
                    'Removing human bottlenecks from critical approval chains',
                    'Scaling process throughput without adding new headcount',
                    'Building self-healing systems that flag exceptions immediately'
                ]
            },
            {
                title: 'Real-Time Visibility',
                positioning: 'You get dashboards that tell you what\'s breaking before the customer complains. We surface your exact operational SLAs instantly, replacing subjective verbal updates with auditable, live data.',
                outcomes: [
                    'Generating decision-ready, executive-level reports in minutes',
                    'Replacing subjective verbal updates with auditable, live data',
                    'Detecting threshold breaches before minor issues compound'
                ]
            },
            {
                title: 'Built-In Accountability',
                positioning: 'The process enforces the rules so you don\'t have to micromanage. Regulatory demands, whether it\'s the BD Labour Act or trade compliance, are embedded directly into how daily work gets done.',
                outcomes: [
                    'Enforcing internal policies and local regulatory standards at the data-entry level',
                    'Implementing role-based access with fully immutable transaction logs',
                    'Creating resilient governance that survives employee turnover'
                ]
            }
        ],
        operatingModel: [
            {
                step: 'Operations Audit',
                description: 'Where is the bleeding occurring? We map your existing workflows, data silos, and ownership gaps to pinpoint the exact bottlenecks holding your team back.'
            },
            {
                step: 'Workflow Design',
                description: 'Creating the ideal, streamlined workflow for your specific team and constraints, defining exactly what happens, and who is responsible for it.'
            },
            {
                step: 'Tool Configuration',
                description: 'Setting up the strict logic, trackers, and automated dashboards heavily utilizing the software stack you already own (like Excel and Google Workspace).'
            },
            {
                step: 'Team Adoption',
                description: 'Deploying the system with parallel runs, training your team, and embedding standard operating procedures so flawless execution becomes natural rapidly.'
            },
            {
                step: 'Optimization & Support',
                description: 'Refining the process, adjusting operational thresholds, and ensuring the architectural setup scales smoothly alongside your organization\'s volume.'
            }
        ],
        compatibility: {
            environments: [
                {
                    name: 'Bangladesh Corporate Dynamics',
                    attributes: [
                        'Bridging the gap from legacy manual systems',
                        'Adapting cleanly to hierarchical approval cultures',
                        'Enforcing local regulatory compliance (Labour, VAT, Tax)'
                    ]
                },
                {
                    name: 'MNC Framework Standards',
                    attributes: [
                        'Ensuring global reporting compliance and audit readiness',
                        'Implementing cross-border data governance protocols',
                        'Structuring clear regional-to-HQ escalation paths'
                    ]
                }
            ],
            statement: 'One unified operating standard. Seamlessly adapted to local realities and global demands.'
        },
        differentiation: {
            title: 'From manual firefighting to autonomous execution.',
            description: 'I do not just optimize your team\'s spreadsheets; I replace them with governed systems. Your operations will run according to logical, strict workflows using the software you likely already pay for. By building structural logic directly within familiar tools, your team isn\'t forced to learn complex new SaaS interfaces, and you are saved from expensive vendor lock-in.'
        },
        toolStack: {
            title: 'Maximizing the tools you already pay for.',
            items: [
                'Core Trackers: Advanced Google Sheets and Excel setups acting as strict, single-source-of-truth records.',
                'Workflow Engines: Apps Script, VBA, and Custom Functions turn manual handoffs into rapid self-auditing pipelines.',
                'Reporting Dashboards: Auto-refreshing KPI views built specifically for non-technical stakeholders to make fast, informed choices.',
                'Governance Enablers: Role-based access protocols and embedded SOPs enforcing operational compliance without introducing new friction.'
            ]
        },
        finalStatement: 'Scale capacity. Eliminate dependency.',
        caseReferences: [
            {
                sector: 'FMCG Distribution Network',
                challenge: 'Thousands of deliveries tracked on brittle spreadsheets. Ghost inventory generated daily, credit limits ignored, and 48-hour reporting blind spots led to significant revenue leakage.',
                outcome: 'Built a centralized relational tracking engine. Delivered 80% faster invoicing workflows, full pricing accuracy, and near-zero unauthorized credit extensions.'
            },
            {
                sector: 'International Healthcare Logistics',
                challenge: 'Patient pipelines, hospital relations, and agency commissions managed in siloed systems. Unreconciled accounts and tracking failures caused unpredictable execution.',
                outcome: 'Deployed a 3-layer Zero-Cost ERP yielding complete cross-functional visibility, eliminated pipeline failures, and fully auditable commission trails.'
            }
        ],
        metrics: [
            { value: '3,100+', label: 'Records Governed' },
            { value: '0%', label: 'Pipeline Failures' },
            { value: '80%+', label: 'Efficiency Gains' },
            { value: '<24hrs', label: 'Reporting Cycle' },
            { value: '100%', label: 'Audit Compliance' }
        ],
        cta: {
            primary: 'Discuss Your Operations',
            primaryLink: '/contact',
            secondary: 'Review System Cases',
            secondaryLink: '/work'
        },
        ctaSubtext: {
            primary: 'No commitment. Let\'s map your bottlenecks.',
            secondary: 'Documented production evidence.'
        },
        relevantCaseStudies: ['mocs', 'fmcg-erp'],
        relevantTestimonials: [0, 1]
    },
    'founders': {
        id: 'founders',
        headline: 'Scale Your Revenue. Stop Scaling Your Chaos.',
        subheadline: 'Most founders try to solve growth by throwing more money at software or hiring more people for manual work. I build the silent operational engines that let your current team handle triple the volume—without breaking a sweat.',
        whoThisIsFor: [
            'Early-Stage Founders',
            'SME Owners Scaling Operations',
            'Bootstrapped Startups',
            'Non-Technical CEOs',
            'Growth-Stage Leadership Teams'
        ],
        problemStatement: {
            title: 'Revenue is scaling. Profit isn\'t.',
            description: 'Revenue is up, but so is your headcount, your error rate, and your daily stress. You spend more time putting out fires over lost orders, botched payroll, or delayed reports than you do focusing on actual strategy. The business is outgrowing the systems that got you here.'
        },
        painPoints: [
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
                title: 'The Hiring Reflex',
                description: 'Every time there\'s a new bottleneck, your first instinct is to hire another junior employee to manage spreadsheets. You are building a company reliant on human copy-pasting, which destroys your margin as you scale.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                ),
                title: 'The "Check On It" Tax',
                description: 'You can\'t fully step away. If you don\'t double-check the payroll, the inventory count, or the commission ledger yourself, mistakes happen. Your business relies entirely on your constant babysitting.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                ),
                title: 'Flying Blind on Gut Instinct',
                description: 'You need to make a critical financial decision today, but your team needs 48 hours to manually compile the data from five different places. By the time you get the report, the numbers are already old.'
            }
        ],
        solution: {
            title: 'Operations on Autopilot.',
            description: 'I architect the systems that make your existing operations run flawlessly in the background. We eliminate the manual chaos without disrupting your team, turning your daily operations into a unified, predictable engine.',
            features: []
        },
        pillars: [
            {
                title: 'Bulletproof Reliability',
                positioning: 'We replace fragile, manual routines with systems that simply don\'t make mistakes. Because they run automatically, whether it\'s 50 orders a day or 5,000, the engine processes them with zero dropped balls.',
                outcomes: [
                    'Eliminate human error from your most critical operational daily loops',
                    'Zero reliance on tribal knowledge — the system knows exactly what to do',
                    'Consistent, perfect execution of your business rules every single time'
                ]
            },
            {
                title: 'Triple The Work. Same Team.',
                positioning: 'Your best people are freed from mindless data entry. We automate the admin so your core team can focus on actual growth, client relationships, and strategy instead of copy-pasting numbers.',
                outcomes: [
                    'Scale your output exponentially without scaling your headcount',
                    'Drastically improve employee retention by removing the worst parts of their job',
                    'Turn operational bottlenecks into competitive advantages'
                ]
            },
            {
                title: 'Pure Margin Expansion',
                positioning: 'Every system I build is designed to stop cash leaks permanently. Whether it\'s recovering lost commissions, eliminating redundant tools, or delaying the need for three new hires — it all goes straight to your bottom line.',
                outcomes: [
                    'Concrete monthly savings documented and measurable from day one',
                    'Investment recovered within 3–6 months, then pure profit',
                    'Capital freed from operations redeployed to actual market growth'
                ]
            },
            {
                title: 'True Founder Freedom',
                positioning: 'The business runs the process. The process runs the people. When the operations are systemized, you finally get your time back. You can leave for a week and know nothing will break.',
                outcomes: [
                    'Step away from daily fire-fighting and focus on high-level strategy',
                    'New team members onboard to a running system instantly',
                    'Investor and board audits are clean, documented, and ready from day one'
                ]
            }
        ],
        operatingModel: [
            {
                step: 'Find The Bleeding',
                description: 'We identify exactly where you are losing money to manual errors, redundant tools, and wasted human hours. We put a hard number on the monthly waste.'
            },
            {
                step: 'Design The Engine',
                description: 'I map out the custom system that will process your daily operations on autopilot, showing you the exact impact on your headcount and margin.'
            },
            {
                step: 'The Silent Build',
                description: 'I build the solution in the background. There is zero disruption to your daily operations while the new engine is constructed.'
            },
            {
                step: 'Parallel Testing',
                description: 'We run the new fully-automated system alongside your old manual one until your team trusts it 100%. We only switch over when you are ready.'
            },
            {
                step: 'Keys to the Kingdom',
                description: 'I hand over the fully documented system. Your team is trained, the process belongs to your business entirely, and I step away. No ongoing retainers.'
            }
        ],
        compatibility: {
            environments: [
                {
                    name: 'Bangladesh Startups & SMEs',
                    attributes: [
                        'Tight budgets where every taka of saved burn matters',
                        'WhatsApp-first teams that need simple, familiar inputs',
                        'VAT, Tax, and Labour Act compliance built directly in'
                    ]
                },
                {
                    name: 'MNC & International Operations',
                    attributes: [
                        'Multi-entity and multi-currency financial tracking',
                        'Investor reporting and board-level audit readiness',
                        'Cross-border compliance with clear documentation trails'
                    ]
                }
            ],
            statement: 'The same clean, owned system — regardless of company size or geography.'
        },
        differentiation: {
            title: 'Consultants advise. Agencies retain. I build and leave.',
            description: 'Consultants give you a 50-page PDF of advice you won\'t read. Agencies want a monthly retainer to manage the mess. I actually build the machine that fixes the mess, hand it to you, and leave. You get a permanent upgrade to your business with zero ongoing fees.'
        },
        toolStack: {
            title: 'The Operational Capabilities.',
            items: [
                'Automated Order & Inventory Engines: Tracking stock, raising alerts, and processing invoices instantly. No more "ghost inventory" or missed shipments.',
                'Financial & Compliance Ledgers: Payroll, commissions, and VAT processed perfectly accurately in minutes instead of days. Full audit trails.',
                'Executive Dashboards: Your entire business health, updated live on your phone, without waiting 48 hours for the finance team back at the office.',
                'Process Independence: Works across your entire org without you needing to install new apps. If you can open a link, the system works for you.'
            ]
        },
        caseReferences: [
            {
                sector: 'FMCG Distribution Network',
                challenge: 'A Dhaka-based wholesale distributor was losing ৳2–3L every month — not to theft, but to confusion. Invoices took 20 minutes to generate. Credit limits were guesswork. Nobody knew actual inventory until it was already gone.',
                outcome: 'Rebuilt the entire operation into an automated engine. Invoicing dropped to 4 minutes per order. Inventory became real-time and accurate. Credit limits were enforced automatically. Total headcount added: zero.'
            },
            {
                sector: 'International Trade Finance',
                challenge: 'Agent commissions across USD, GBP, and BDT were tracked in three separate, disconnected places. Nobody knew exactly what was owed or when. 5–15% per transaction was quietly disappearing every month.',
                outcome: 'One unified tracking ledger replaced the scattered records. Full commission visibility from day one. 15% in previously lost revenue was recovered immediately.'
            }
        ],
        metrics: [
            { value: '৳2–3L', label: 'Monthly Margin Added' },
            { value: '100%', label: 'Process Accuracy' },
            { value: '3–6 mo', label: 'ROI Payback' },
            { value: 'Unlimited', label: 'Volume Capacity' },
            { value: 'Zero', label: 'New Hires Needed' }
        ],
        finalStatement: 'Build once. Scale forever.',
        cta: {
            primary: 'Book a Free Stack Audit',
            primaryLink: '/contact',
            secondary: 'See Real Production Cases',
            secondaryLink: '/work'
        },
        ctaSubtext: {
            primary: 'No commitment. 30 minutes to find your leaks and calculate your exact monthly saving.',
            secondary: 'Real systems. Real numbers. Documented results.'
        },
        relevantCaseStudies: ['trade-finance', 'fmcg-erp'],
        relevantTestimonials: [0, 1]
    },
    'hiring-managers': {
        id: 'hiring-managers',
        headline: 'Expert Executive Operations',
        subheadline: 'Proven track record in C-suite support, enterprise automation, and operational governance',
        painPoints: [
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                ),
                title: 'Talent Scalability',
                description: 'Difficulty finding roles that combine technical skills with business acumen'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
                title: 'Technical Trust',
                description: 'Verifying automation expertise beyond claims with production-grade results'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                ),
                title: 'Execution Standards',
                description: 'Need for zero-error candidates who can operate autonomously at C-suite levels'
            }
        ],
        solution: {
            title: 'Verified Technical Utility',
            description: 'Portfolio of production systems serving 3,100+ users with documented efficiency gains and zero failures.',
            features: [
                'Current: Executive – Administration at Prominent Tec',
                'Tech Stack: VBA, Apps Script, SQL, LaTeX',
                'Built 5+ production ERPs for enterprise use',
                'Experience with BD Labour Act & Compliance',
                'Advanced C-suite lifecycle management'
            ]
        },
        metrics: [
            { value: '6+', label: 'Years Experience' },
            { value: '5', label: 'Production Systems' },
            { value: '3,100+', label: 'Users Supported' }
        ],
        cta: {
            primary: 'Review Credentials',
            primaryLink: '/about',
            secondary: 'Request Resume',
            secondaryLink: '/contact'
        },
        relevantCaseStudies: ['payroll-control', 'hr-docs', 'mocs'],
        relevantTestimonials: [0, 1, 2]
    }
};

interface PersonaSpecificContentProps {
    personaId: string;
}

const PersonaSpecificContent: React.FC<PersonaSpecificContentProps> = ({ personaId }) => {
    const persona = PERSONAS[personaId];

    if (!persona) {
        return (
            <NotFoundPage
                title="Persona Not Found"
                message="This audience page is not available. Browse the audience directory or return to the portfolio index."
            />
        );
    }

    const relevantCaseStudies = PROJECTS.filter(p => persona.relevantCaseStudies.includes(p.id));
    const relevantTestimonials = persona.relevantTestimonials.map(idx => TESTIMONIALS[idx]);

    return (
        <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white text-slate-900 font-sans">

            {/* 01: HERO / EXECUTIVE BRIEFING */}
            <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 border-b border-slate-200/60 bg-[#FBFBFA]">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl"
                    >
                        <motion.div variants={revealVariants} className="mb-8 md:mb-12">
                            <span className="mono text-[10px] font-bold text-slate-900 tracking-[0.3em] uppercase">Executive Briefing</span>
                        </motion.div>

                        <motion.h1 variants={revealVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[900] tracking-tighter leading-[1.02] text-slate-900 mb-6 md:mb-8">
                            {persona.headline}
                        </motion.h1>

                        <motion.p variants={revealVariants} className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                            {persona.subheadline}
                        </motion.p>

                        {persona.whoThisIsFor && (
                            <motion.div variants={revealVariants} className="pt-8 mt-8 md:pt-12 md:mt-12 border-t border-slate-200/60 flex flex-col md:flex-row md:items-start gap-8 md:gap-16">

                                <div className="flex flex-wrap gap-x-8 gap-y-4">
                                    {persona.whoThisIsFor.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 bg-blue-600/80" />
                                            <span className="text-xs md:text-sm font-bold text-slate-900 text-tight">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 02: PERFORMANCE INDEX (METRICS) */}
            <section className="relative z-10 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-slate-100 border-y border-slate-100">
                        {persona.metrics.map((metric, i) => (
                            <div key={i} className="bg-white py-8 md:py-10 px-4 md:px-6 group hover:bg-slate-50 transition-colors duration-500">
                                <span className="block mono text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2 group-hover:text-blue-600 transition-colors">
                                    {metric.label}
                                </span>
                                <span className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
                                    {metric.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 03: THE BOTTLENECK (CHALLENGE) */}
            {persona.problemStatement && (
                <section className="relative z-10 py-16 md:py-32 bg-[#FBFBFA]">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-24">
                            <div className="col-span-12 lg:col-span-5 space-y-4 md:space-y-8 lg:sticky lg:top-32 h-fit">
                                <div className="mb-6 md:mb-8">
                                    <span className="mono text-[9px] md:text-[10px] font-bold text-slate-900 tracking-[0.3em] uppercase">The Bottleneck</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-[900] text-tighter leading-[1.1] text-slate-900 max-w-full md:max-w-none pr-2 md:pr-0 lg:-mr-24 xl:-mr-32 relative z-10 w-full lg:w-[130%]">
                                    {persona.problemStatement.title}
                                </h2>
                            </div>

                            <div className="col-span-12 lg:col-span-7 space-y-6 md:space-y-12">
                                <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed">
                                    {persona.problemStatement.description}
                                </p>

                                <div className="grid gap-4 md:gap-6">
                                    {(persona.painPoints && persona.painPoints.length > 0 ? persona.painPoints : [
                                        { title: 'Fragmented Communication', description: 'Communication channels lack structure.' },
                                        { title: 'Unclear Task Ownership', description: 'Decision loops are often left open.' },
                                        { title: 'Unfiltered Urgencies', description: 'High-value time lost to operational noise.' }
                                    ]).map((pt, i) => (
                                        <div key={i} className="p-5 md:p-8 bg-white border border-slate-200/60 rounded-lg group hover:border-blue-200 transition-all duration-300">
                                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-2 flex items-center gap-3">
                                                <span className="text-blue-600">0{i + 1}</span> {pt.title}
                                            </h4>
                                            {pt.description && (
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                                    {pt.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 04: RESOLUTION ARCHITECTURE (SOLUTION) */}
            <section className="py-24 md:py-40 bg-[#FBFBFA] border-y border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                            <div className="mb-8">
                                <span className="mono text-[9px] md:text-[10px] font-bold text-slate-900 tracking-[0.3em] uppercase">Resolution</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-[900] text-tighter leading-[1.05] text-slate-900 mb-8">
                                {persona.solution.title}
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-[1.6]">
                                {persona.solution.description}
                            </p>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="flex flex-col">
                                {(persona.pillars || []).map((pillar, i) => (
                                    <div key={i} className="p-6 md:p-10 bg-white border border-slate-100 rounded-xl group hover:border-blue-200 transition-all duration-500 my-4">
                                        <div className="grid md:grid-cols-12 gap-6 md:gap-8">
                                            <div className="md:col-span-4">
                                                <span className="mono text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-3 md:mb-4">Pillar 0{i + 1}</span>
                                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{pillar.title}</h3>
                                            </div>
                                            <div className="md:col-span-8 space-y-4 md:space-y-6">
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                                    {pillar.positioning}
                                                </p>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {pillar.outcomes.map((outcome, j) => (
                                                        <div key={j} className="flex items-start gap-3 text-[11px] font-bold text-slate-700 tracking-tight">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600/40 mt-1.5 shrink-0" />
                                                            {outcome}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {!persona.pillars && persona.solution.features.map((feature, i) => (
                                    <div key={i} className="py-8 border-b border-slate-200/60 flex items-center justify-between group">
                                        <div className="flex items-center gap-6">
                                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em]">0{i + 1}</span>
                                            <span className="text-lg md:text-xl font-[900] text-slate-900 text-tight group-hover:text-blue-600 transition-colors duration-500">{feature}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 05: OPERATING PROTOCOL */}
            {persona.operatingModel && (
                <section className="py-24 md:py-40 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200/60 pb-12">
                            <div>
                                <div className="mb-8">
                                    <span className="mono text-[9px] md:text-[10px] font-bold text-slate-900 tracking-[0.3em] uppercase">Operating Protocol</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-[900] text-tighter leading-[1.05] text-slate-900">
                                    Execution Rhythm.
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-px bg-slate-200 border border-slate-200 overflow-hidden rounded-lg">
                            {persona.operatingModel.map((item, i) => (
                                <div key={i} className="bg-white p-6 md:p-8 space-y-4 md:space-y-6 hover:bg-slate-50 transition-colors duration-500">
                                    <span className="mono text-[10px] font-bold text-slate-300 block">STEP 0{i + 1}</span>
                                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                                        {item.step}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {persona.compatibility && (
                            <div className="mt-24 md:mt-48 border-t border-slate-100 pt-24 md:pt-40 relative">
                                {/* Section vertical axis (Core Theme consistency) */}
                                <div className="absolute left-[41.666%] top-0 bottom-0 w-px bg-slate-100 hidden lg:block"></div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 relative">
                                    {/* Column 01: The Strategic Architecture Heading */}
                                    <div className="md:col-span-12 lg:col-span-5 lg:pr-14 space-y-12">
                                        <div className="space-y-8">
                                            <div className="mb-8">
                                                <span className="mono text-[9px] md:text-[10px] font-bold text-slate-900 tracking-[0.3em] uppercase">Governance</span>
                                            </div>
                                            <div className="space-y-10">
                                                <h2 className="text-4xl md:text-5xl lg:text-7xl font-[900] tracking-tighter leading-[0.92] text-slate-900">
                                                    Operating <br />
                                                    <span className="text-slate-400">Architecture.</span>
                                                </h2>

                                                {/* Strategic Statement moved here */}
                                                <div className="space-y-6">
                                                    <div className="text-xl md:text-2xl lg:text-3xl font-[900] text-slate-900 tracking-tighter leading-[1.1] italic relative">
                                                        <div className="absolute -left-6 top-1 bottom-1 w-1 bg-blue-700 opacity-20"></div>
                                                        "{typeof persona.compatibility === 'object' ? persona.compatibility.statement : persona.compatibility}"
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="md:col-span-12 lg:col-span-7 lg:pl-14">
                                        {typeof persona.compatibility === 'object' && (
                                            <div className="space-y-16">
                                                <div className="grid grid-cols-2 gap-12 lg:gap-16">
                                                    {persona.compatibility.environments.map((env, i) => (
                                                        <div key={i} className="space-y-10">
                                                            <div className="pb-4 border-b border-slate-100/60 flex items-center justify-between group/ledger">
                                                                <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase group-hover/ledger:text-blue-700 transition-colors">
                                                                    {env.name}
                                                                </h4>
                                                                <div className="flex gap-1.5">
                                                                    <div className="w-1 h-1 rounded-full bg-blue-700"></div>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-6">
                                                                {env.attributes.map((attr, j) => (
                                                                    <div key={j} className="group/item flex items-start gap-3">
                                                                        <div className="w-1 h-1 rounded-full bg-slate-200 mt-2 shrink-0 group-hover/item:bg-blue-700 transition-colors"></div>
                                                                        <p className="text-[13px] md:text-[14px] font-medium text-slate-600 group-hover/item:text-slate-900 transition-colors leading-snug">
                                                                            {attr}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* SECTION 06: PRODUCTION EVIDENCE (CASE STUDIES) */}
            {relevantCaseStudies.length > 0 && (
                <section className="relative z-10 py-12 md:py-20 bg-white overflow-hidden border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
                        <div className="mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="mb-8">
                                    <span className="mono text-[9px] md:text-[10px] font-bold text-slate-900 tracking-[0.3em] uppercase">The Ledger</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-[900] text-tighter leading-[1.05] text-slate-900">
                                    Production Evidence.
                                </h2>
                            </motion.div>
                        </div>

                        <div className="relative">
                            {relevantCaseStudies.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative group"
                                >
                                    <a
                                        href={getWorkRoutePath(project.id) ?? `/work/${project.id}`}
                                        className="block py-8 md:py-10 border-t border-slate-100 relative z-10"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.history.pushState({}, '', getWorkRoutePath(project.id) ?? `/work/${project.id}`);
                                            window.dispatchEvent(new PopStateEvent('popstate'));
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative">
                                            <div className="md:col-span-3">
                                                <span className="mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600 transition-colors duration-400">
                                                    {project.category}
                                                </span>
                                            </div>

                                            <div className="md:col-span-12 lg:col-span-5">
                                                <motion.h3
                                                    whileHover={{ x: 6 }}
                                                    className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-tight transition-colors duration-400 group-hover:text-blue-600"
                                                >
                                                    {project.title}
                                                </motion.h3>
                                            </div>

                                            <div className="md:col-span-12 lg:col-span-3">
                                                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-400">
                                                    {project.headline}
                                                </p>
                                            </div>

                                            <div className="hidden lg:flex lg:col-span-1 justify-end">
                                                <div className="w-10 h-10 flex items-center justify-center">
                                                    <span className="text-xl text-slate-300 font-light group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-400">
                                                        →
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    {i === relevantCaseStudies.length - 1 && (
                                        <div className="border-b border-slate-100 w-full" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 07: FIELD REFERENCES (SECTORS) */}
            {persona.caseReferences && (
                <section className="py-24 md:py-40 bg-white border-b border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                            <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-8">
                                <div className="mb-8">
                                    <span className="mono text-[9px] md:text-[10px] font-bold text-slate-900 tracking-[0.3em] uppercase">Field References</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-[900] text-tighter leading-[1.05] text-slate-900">
                                    Delivered in Practice.
                                </h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-[1.8] pt-2">
                                    Sector-level transparency. Client identity protected by NDA.
                                </p>
                            </div>

                            <div className="lg:col-span-8 space-y-6">
                                {persona.caseReferences.map((ref, i) => (
                                    <div key={i} className="bg-white border border-slate-200/60 p-6 md:p-10 rounded-xl space-y-8 md:space-y-10 group hover:border-blue-200 transition-all">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                                            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">{ref.sector}</span>
                                            <span className="mono text-[10px] text-slate-300 font-bold">REF/0{i + 1}</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                                            <div className="space-y-3">
                                                <span className="mono text-[9px] font-bold text-slate-400 uppercase tracking-widest block">The Challenge</span>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{ref.challenge}</p>
                                            </div>
                                            <div className="space-y-3">
                                                <span className="mono text-[9px] font-bold text-blue-600 uppercase tracking-widest block">The Outcome</span>
                                                <p className="text-sm text-slate-900 font-bold leading-relaxed">{ref.outcome}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 08: SOVEREIGNTY (DIFFERENTIATION) */}
            {(persona.differentiation || persona.toolStack) && (
                <section className="relative z-10 py-16 md:py-32 bg-[#FBFBFA] border-y border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-24">
                            {persona.differentiation && (
                                <div className="col-span-12 lg:col-span-6 space-y-8 md:space-y-12">
                                    <div className="space-y-4">
                                        <div className="mb-8">
                                            <span className="mono text-[9px] md:text-[10px] font-bold text-slate-900 tracking-[0.3em] uppercase">The Differential</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.05] text-slate-900">
                                            {persona.differentiation.title}
                                        </h3>
                                    </div>
                                    <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed pl-6 md:pl-8 border-l-2 border-slate-100 italic">
                                        {persona.differentiation.description}
                                    </p>
                                </div>
                            )}

                            {persona.toolStack && (
                                <div className="col-span-12 lg:col-span-6 space-y-8 md:space-y-12">
                                    <div className="space-y-4">
                                        <div className="mb-8">
                                            <span className="mono text-[9px] md:text-[10px] font-bold text-slate-900 tracking-[0.3em] uppercase">Technical Sovereignty</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.05] text-slate-900">
                                            {persona.toolStack.title}
                                        </h3>
                                    </div>
                                    <div className="grid gap-4">
                                        {persona.toolStack.items.map((item, i) => {
                                            const [title, desc] = item.split(':');
                                            return (
                                                <div key={i} className="p-4 md:p-6 bg-white border border-slate-100 rounded-lg group hover:border-blue-100 transition-all">
                                                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-2 block">{title}</span>
                                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* 09: VALIDATION (TESTIMONIALS) */}
            {relevantTestimonials.length > 0 && (
                <section className="py-20 md:py-32 bg-[#FBFBFA] border-y border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200/60 pb-8"
                        >
                            <div>
                                <div className="mb-8">
                                    <span className="mono text-[9px] md:text-[10px] font-bold text-slate-900 tracking-[0.3em] uppercase">Validation Protocol</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-[900] text-tighter leading-[1.05] text-slate-900">
                                    Verified Impact.
                                </h2>
                            </div>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-px bg-slate-200/70 border border-slate-200/70 overflow-hidden rounded-xl">
                            {relevantTestimonials.map((testimonial, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="bg-white p-6 md:p-10 hover:bg-slate-50 transition-colors duration-700 flex flex-col justify-between group relative"
                                >
                                    <div className="flex-1">
                                        <div className="mb-6 md:mb-8">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-200 group-hover:text-blue-600 transition-colors duration-700">
                                                <path d="M10 7L8 11H11V17H5V11L7 7H10ZM19 7L17 11H20V17H14V11L16 7H19Z" fill="currentColor" />
                                            </svg>
                                        </div>

                                        <p className="text-lg md:text-xl text-slate-800 font-medium tracking-tight leading-[1.5] group-hover:text-slate-900 transition-colors duration-700 mb-8 md:mb-10">
                                            {testimonial.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-4 pt-6 md:pt-8 border-t border-slate-100 group-hover:border-slate-200 transition-colors duration-700 mt-auto">
                                        <div className="flex items-center gap-4 md:gap-5">
                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60 shadow-sm">
                                                <OptimizedImage
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    width={56}
                                                    height={56}
                                                    className="w-full h-full object-cover transition-all duration-700 grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:scale-105"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-sm md:text-[15px] font-bold text-slate-900 tracking-tight leading-tight mb-1">
                                                    {testimonial.name}
                                                </div>
                                                <div className="mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    {testimonial.position}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 10: DEPLOYMENT (CTA) */}
            <section className="py-24 md:py-32 lg:py-40 bg-[#FBFBFA] flex flex-col justify-center min-h-[60vh]">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center w-full">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-[900] text-tighter text-slate-900 leading-[1.05]">
                        {persona.finalStatement || 'I am the infrastructure that allows you to lead.'}
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12 md:mt-16">
                        <a
                            href={persona.cta.primaryLink}
                            className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-500 text-center rounded-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState({}, '', persona.cta.primaryLink);
                                window.dispatchEvent(new PopStateEvent('popstate'));
                                window.scrollTo(0, 0);
                            }}
                        >
                            {persona.cta.primary}
                        </a>
                        <a
                            href={persona.cta.secondaryLink}
                            className="w-full sm:w-auto px-12 py-5 bg-white border border-slate-200/60 text-slate-500 font-bold text-[11px] uppercase tracking-[0.2em] hover:border-slate-900 hover:text-slate-900 transition-all duration-500 text-center rounded-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState({}, '', persona.cta.secondaryLink);
                                window.dispatchEvent(new PopStateEvent('popstate'));
                                window.scrollTo(0, 0);
                            }}
                        >
                            {persona.cta.secondary}
                        </a>
                    </div>

                </div>
            </section >
        </div >
    );
};

export default PersonaSpecificContent;

import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS, PROJECTS } from '../constants';
import OptimizedImage from './OptimizedImage';
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
        headline: 'A Calm, Reliable Executive Office.',
        subheadline: 'For leaders who need strong executive support: clear priorities, protected time, and fast follow-through on confidential work.',
        whoThisIsFor: [
            'CEOs and Managing Directors',
            'Country Heads and Chair Offices',
            'Founders Scaling Operations',
            'Executive Search and HR Teams',
            'Regional Leadership Teams'
        ],
        problemStatement: {
            title: 'When everything is urgent, priorities disappear.',
            description: 'Most executive offices lose time in three places: calendar conflict, unclear ownership, and follow-up gaps. The result is avoidable stress, delayed decisions, and repeated status chasing.'
        },
        painPoints: [
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                ),
                title: 'Calendar Collisions',
                description: 'Back-to-back requests and last-minute changes force constant context switching for the principal.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ),
                title: 'Follow-Up Drift',
                description: 'Decisions are made in meetings, but actions get delayed because no single follow-up system exists.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ),
                title: 'Confidentiality Risk',
                description: 'Sensitive files and approvals pass through inconsistent channels, creating avoidable exposure.'
            }
        ],
        solution: {
            title: 'Executive Office Control',
            description: 'I set up a practical operating rhythm so the office stays organized even during high-pressure weeks.',
            features: [
                'Priority and calendar triage rules',
                'Decision and action tracking with named owners',
                'Board pack and reporting preparation',
                'Confidential workflow access controls'
            ]
        },
        pillars: [
            {
                title: 'Priority and Calendar Control',
                positioning: 'Your calendar becomes intentional, not reactive. Meetings and requests are filtered by business value and timing.',
                outcomes: [
                    'Fewer interruptions to strategic focus time',
                    'Better meeting quality and decision readiness',
                    'Less last-minute reshuffling across teams'
                ]
            },
            {
                title: 'Decision Follow-Through',
                positioning: 'Every decision is tracked to completion with a named owner and a due date.',
                outcomes: [
                    'Reduced need for repeated status chasing',
                    'Higher close rate on executive actions',
                    'Clear escalation path when deadlines slip'
                ]
            },
            {
                title: 'Leadership Communication Rhythm',
                positioning: 'Board updates, weekly summaries, and cross-functional communications follow a predictable cadence.',
                outcomes: [
                    'Cleaner reporting with fewer version conflicts',
                    'Faster preparation for critical meetings',
                    'More confidence across internal stakeholders'
                ]
            },
            {
                title: 'Quiet Risk Handling',
                positioning: 'Sensitive issues are triaged quickly and handled discreetly with the right people involved at the right time.',
                outcomes: [
                    'Stronger confidentiality discipline',
                    'Calmer response during urgent incidents',
                    'Better executive trust in office operations'
                ]
            }
        ],
        operatingModel: [
            {
                step: 'Daily Priority Setup',
                description: 'Start each day with a clear list of must-win outcomes and risk items.'
            },
            {
                step: 'Execution and Coordination',
                description: 'Run communications, meetings, and approvals against defined priority rules.'
            },
            {
                step: 'Decision Log Management',
                description: 'Capture decisions in one place and assign owners with due dates immediately.'
            },
            {
                step: 'End-of-Day Closeout',
                description: 'Send a concise completion summary and highlight items that need escalation.'
            },
            {
                step: 'Weekly Reliability Reset',
                description: 'Review recurring friction points and tune process rules for the next week.'
            }
        ],
        compatibility: {
            environments: [
                {
                    name: 'Bangladesh Corporate Dynamics',
                    attributes: [
                        'Works with hierarchy-driven approval styles',
                        'Supports high confidentiality expectations',
                        'Handles frequent priority changes gracefully'
                    ]
                },
                {
                    name: 'MNC Framework Standards',
                    attributes: [
                        'Consistent reporting and documentation quality',
                        'Structured cross-functional coordination',
                        'Strong readiness for leadership reviews'
                    ]
                }
            ],
            statement: 'One disciplined execution standard, adapted to local and global work cultures.'
        },
        differentiation: {
            title: 'Support that reduces stress, not just workload.',
            description: 'This is not task chasing. It is a reliable office operating model that protects leader focus, closes loops quickly, and keeps sensitive work under control.'
        },
        toolStack: {
            title: 'How the work is managed day to day.',
            items: [
                'Calendar and Priority Rules: Structured triage so high-value work gets first access to executive time.',
                'Action and Follow-Up Tracking: One shared view of commitments, owners, deadlines, and escalation points.',
                'Reporting Packs: Consistent templates for board notes, leadership briefs, and cross-team updates.',
                'Confidential Workflows: Controlled access and approval paths for personnel and financial information.'
            ]
        },
        finalStatement: 'Your office runs smoothly, even on your busiest week.',
        caseReferences: [
            {
                sector: 'Manufacturing Group',
                challenge: 'Board pack inputs arrived from five units without clear ownership, causing version conflicts and late preparation.',
                outcome: 'Introduced a submission and review workflow with deadlines and owners. Board packs became ready 24â€“48 hours before meetings.'
            },
            {
                sector: 'Executive Office',
                challenge: 'Overlapping urgent requests from multiple leaders created calendar conflict and delayed decisions.',
                outcome: 'Applied routing and priority rules. Calendar conflict dropped and decision throughput improved.'
            },
            {
                sector: 'HR and Payroll Operations',
                challenge: 'Sensitive personnel files were being shared through inconsistent channels.',
                outcome: 'Set role-based access and approval controls. Confidential handling became traceable and incident-free.'
            },
            {
                sector: 'Cross-Functional Delivery',
                challenge: 'Meeting actions were agreed but not consistently closed due to weak ownership tracking.',
                outcome: 'Centralized action logs with owners and due dates. Closure rates improved and leadership updates became clearer.'
            }
        ],
        metrics: [
            { value: '8â€“12 hrs', label: 'Executive Time Saved/Week' },
            { value: '90%+', label: 'Action Closure Rate' },
            { value: '24â€“48 hrs', label: 'Board Pack Readiness' },
            { value: '0', label: 'Confidentiality Incidents' },
            { value: '100%', label: 'Tracked Decisions' }
        ],
        cta: {
            primary: 'Discuss Executive Support',
            primaryLink: '/contact',
            secondary: 'View Related Case Studies',
            secondaryLink: '/work'
        },
        ctaSubtext: {
            primary: 'No commitment. 30 minutes to map your office priorities.',
            secondary: 'Real scenarios. Documented outcomes.'
        },
        relevantCaseStudies: ['payroll-control', 'hr-docs'],
        relevantTestimonials: [1, 2]
    },
    'operations-leaders': {
        id: 'operations-leaders',
        headline: 'Stabilize, Scale, Succeed.',
        subheadline: 'For operations leaders who need reliable execution: structured workflows, clear oversight, and cleaner data for decision making.',
        whoThisIsFor: [
            'COOs and Operations Directors',
            'Departmental Heads (HR, Finance, Logistics)',
            'Supply Chain and Distribution Leads',
            'Project Management Office (PMO)',
            'Regional Operations Managers'
        ],
        problemStatement: {
            title: 'Scaling without structure is scaling chaos.',
            description: 'Operational risk creates friction in three core areas: data fragmentation, manual dependency, and lack of audit trails. This leads to slow delivery, rising costs, and high management overhead.'
        },
        painPoints: [
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                ),
                title: 'Fragile Workflows',
                description: 'Processes depend on individual memory rather than documentation, making scaling impossible.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                ),
                title: 'Data Fragmentation',
                description: 'Critical operational data lives in silos, preventing a unified view of performance.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                ),
                title: 'Manual Overhead',
                description: 'Teams spend more time on status updates and manual coordination than on actual delivery.'
            }
        ],
        solution: {
            title: 'Structured Operational Control',
            description: 'I design and implement governance systems that turn fragmented tasks into a predictable production line.',
            features: []
        },
        pillars: [
            {
                title: 'Systematic Governance',
                positioning: 'Standardize how data is captured, moved, and reported across departments.',
                outcomes: [
                    'Consistent reporting quality across units',
                    'Reduced data entry errors and reversals',
                    'Easier audit and compliance tracking'
                ]
            },
            {
                title: 'Process Automation',
                positioning: 'Identify and automate repetitive steps in high-volume operational workflows.',
                outcomes: [
                    'Significant reduction in manual rework',
                    'Faster turnaround for critical business steps',
                    'Increased team capacity without hiring'
                ]
            },
            {
                title: 'Operational Visibility',
                positioning: 'Create real-time views of performance and bottlenecks for leadership teams.',
                outcomes: [
                    'Faster identification of operational leaks',
                    'More proactive response to blockers',
                    'Higher confidence in resource allocation'
                ]
            },
            {
                title: 'Reliable Team Handover',
                positioning: 'Document systems so clearly that they run independently of the person who built them.',
                outcomes: [
                    'Shorter onboarding time for new staff',
                    'Less founder/leader intervention in daily tasks',
                    'Durable operational memory'
                ]
            }
        ],
        operatingModel: [
            {
                step: 'Systems Audit',
                description: 'Map current workflows to find leaks, bottlenecks, and manual friction points.'
            },
            {
                step: 'Design Governance',
                description: 'Define the rules, tools, and owners needed for a stable operating environment.'
            },
            {
                step: 'Prototype Build',
                description: 'Deliver a working model for a single high-impact workflow to prove the value.'
            },
            {
                step: 'Rollout and Refine',
                description: 'Scale the system across related units, tuning rules based on production feedback.'
            },
            {
                step: 'Continuous Governance',
                description: 'Maintain the system through regular audits and performance reviews.'
            }
        ],
        compatibility: {
            environments: [
                {
                    name: 'Bangladesh Core Operations',
                    attributes: [
                        'Works with existing local team habits',
                        'Supports practical, high-impact tool choices',
                        'Handles local compliance and reporting nuances'
                    ]
                },
                {
                    name: 'MNC Operational Standards',
                    attributes: [
                        'Meets formal documentation and audit needs',
                        'Enables structured cross-border coordination',
                        'Provides scalable reporting for regional leaders'
                    ]
                }
            ],
            statement: 'A disciplined framework for operations that bridges the gap between local speed and global standards.'
        },
        differentiation: {
            title: 'Systems that serve people, not the other way around.',
            description: 'Successful operations are about consistency and control. I build the systems that ensure your team can deliver high-quality output every single day.'
        },
        toolStack: {
            title: 'Tools used to enforce governance.',
            items: [
                'Advanced Spreadsheet Control: Complex ledgers with role-based access and data validation.',
                'Workflow Automation: VBA, Apps Script, and low-code tools to bridge process gaps.',
                'Reporting Architecture: KPI dashboards that give a single source of truth for leaders.',
                'Docs-as-Code: Documentation that lives where the work happens, keeping SOPs current.'
            ]
        },
        finalStatement: 'Operations that stay stable under pressure.',
        caseReferences: [
            {
                sector: 'Medical Logistics',
                challenge: 'Patient records and partner commissions were tracked in disparate sheets with no central audit path.',
                outcome: 'Built an integrated control ledger. Lost revenue recovery hit 15% and audit readiness reached 100%.'
            },
            {
                sector: 'Manufacturing & FMCG',
                challenge: 'The invoicing and order flow was manual, leading to frequent pricing errors and stock mismatches.',
                outcome: 'Introduced structured validation rules. Error rates dropped to near zero and capacity doubled.'
            },
            {
                sector: 'Government Relations & HR',
                challenge: 'Sensitive personnel files and approvals were managed over email with no version control.',
                outcome: 'Implemented a docs-as-code documentation system. Confidentiality record remained 100% stable.'
            },
            {
                sector: 'Operations Logistics',
                challenge: 'Daily reporting for high-volume units took hours of manual compilation every morning.',
                outcome: 'Automated the data aggregation process. Reports now arrive in minutes, not hours.'
            }
        ],
        metrics: [
            { value: '5', label: 'Production Systems Built' },
            { value: '3,100+', label: 'Records Governed' },
            { value: '100%', label: 'Audit Readiness' },
            { value: '<1%', label: 'Process Failure Rate' },
            { value: '40%+', label: 'Manual Rework Reduction' }
        ],
        cta: {
            primary: 'Book an Operational Review',
            primaryLink: '/contact',
            secondary: 'Review Case Evidence',
            secondaryLink: '/work'
        },
        ctaSubtext: {
            primary: 'No commitment. Map your bottlenecks in 30 minutes.',
            secondary: 'Documented production evidence.'
        },
        relevantCaseStudies: ['med-ops', 'fmcg-erp'],
        relevantTestimonials: [0, 1]
    },
    'founders': {
        id: 'founders',
        headline: 'Grow Revenue Without Growing Chaos.',
        subheadline: 'For founders who want better margins, clearer numbers, and less daily operational stress as the business scales.',
        whoThisIsFor: [
            'Startup Founders',
            'SME Owners',
            'Bootstrapped Teams',
            'Non-Technical CEOs',
            'Growth-Stage Leadership Teams'
        ],
        problemStatement: {
            title: 'If you must check everything yourself, growth will stall.',
            description: 'Many founders grow sales but stay trapped in daily operational checking. Manual steps, tool sprawl, and delayed reports eat margin and drain leadership time.'
        },
        painPoints: [
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ),
                title: 'Hiring to Patch Process Gaps',
                description: 'Headcount keeps increasing to handle manual coordination that should be structured and repeatable.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ),
                title: 'Too Many Tools, Low Trust in Data',
                description: 'Key numbers live in different places, so decision-making depends on manual checking.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                ),
                title: 'Delayed Decisions',
                description: 'By the time reports are ready, the business has already moved and opportunities are missed.'
            }
        ],
        solution: {
            title: 'Lean, Predictable Operations',
            description: 'I help founders simplify core operations so work runs reliably, numbers stay clear, and growth does not require constant firefighting.',
            features: []
        },
        pillars: [
            {
                title: 'Protect Margin',
                positioning: 'Fix repetitive leaks in order flow, payroll, reconciliation, and exception handling.',
                outcomes: [
                    'Lower monthly operational waste',
                    'Fewer avoidable errors and reversals',
                    'Clear visibility into where money is lost or recovered'
                ]
            },
            {
                title: 'Increase Team Capacity',
                positioning: 'Let the same team handle more volume by reducing manual coordination and rework.',
                outcomes: [
                    'Higher output without proportional hiring',
                    'Less burnout from repetitive administrative tasks',
                    'Better use of skilled team time'
                ]
            },
            {
                title: 'Improve Decision Speed',
                positioning: 'Leadership gets cleaner numbers faster, so important decisions do not wait for manual report assembly.',
                outcomes: [
                    'Shorter reporting turnaround',
                    'Higher confidence in day-to-day decisions',
                    'Faster response to operational issues'
                ]
            },
            {
                title: 'Reduce Founder Load',
                positioning: 'Shift from founder-dependent execution to a process that runs reliably with clear ownership.',
                outcomes: [
                    'Less need for daily founder intervention',
                    'Easier onboarding of new team members',
                    'More founder time for strategy and growth'
                ]
            }
        ],
        operatingModel: [
            {
                step: 'Leak Discovery',
                description: 'Identify where margin and time are being lost in current workflows.'
            },
            {
                step: 'Flow Redesign',
                description: 'Redesign high-impact processes so execution is clear, repeatable, and easy to adopt.'
            },
            {
                step: 'Build on Existing Stack',
                description: 'Implement improvements using tools the team already understands.'
            },
            {
                step: 'Parallel Validation',
                description: 'Run old and new methods in parallel until output quality is consistent.'
            },
            {
                step: 'Handover and Enablement',
                description: 'Document key workflows and train owners so the process stays stable.'
            }
        ],
        compatibility: {
            environments: [
                {
                    name: 'Bangladesh Startups and SMEs',
                    attributes: [
                        'Works with lean budgets and small teams',
                        'Supports practical chat-first and spreadsheet-heavy operations',
                        'Handles local VAT, tax, and labour needs'
                    ]
                },
                {
                    name: 'MNC and International Operations',
                    attributes: [
                        'Supports multi-entity and multi-currency reporting',
                        'Improves leadership and investor reporting readiness',
                        'Strengthens documented control across regions'
                    ]
                }
            ],
            statement: 'A practical operating model that scales from local teams to international workflows.'
        },
        differentiation: {
            title: 'Working systems, not long advisory decks.',
            description: 'The goal is simple: measurable operational improvement you can own and run. No dependency-heavy setup and no unnecessary complexity.'
        },
        toolStack: {
            title: 'Where improvements usually happen first.',
            items: [
                'Sales and Order Flow: Cleaner handoff from order capture to invoicing and fulfillment.',
                'Finance Controls: Better payroll, commission, and reconciliation discipline with clear audit trails.',
                'Founder Dashboards: Fast daily view of key business numbers without manual report chasing.',
                'Documentation and SOPs: Clear process notes so performance does not depend on one person.'
            ]
        },
        finalStatement: 'Build once. Operate with confidence.',
        caseReferences: [
            {
                sector: 'FMCG Distribution Network',
                challenge: 'A wholesale business was losing BDT 2\u20133L monthly due to order confusion, weak credit control, and delayed inventory visibility.',
                outcome: 'Reworked the flow with better controls and tracking. Invoice time dropped sharply, inventory visibility improved, and no extra headcount was needed.'
            },
            {
                sector: 'International Trade Finance',
                challenge: 'Commission tracking was split across disconnected records in multiple currencies.',
                outcome: 'Unified the ledger and reporting logic. Visibility improved immediately and lost revenue recovery reached 15%.'
            }
        ],
        metrics: [
            { value: 'BDT 2\u20133L', label: 'Monthly Margin Opportunity' },
            { value: '100%', label: 'Tracked Critical Processes' },
            { value: '3\u20136 mo', label: 'Typical Payback Window' },
            { value: '2x', label: 'Capacity Potential' },
            { value: '0', label: 'Mandatory New Hires' }
        ],
        cta: {
            primary: 'Book a Free Operations Audit',
            primaryLink: '/contact',
            secondary: 'See Founder-Relevant Cases',
            secondaryLink: '/work'
        },
        ctaSubtext: {
            primary: 'No commitment. 30 minutes to map your operational gaps.',
            secondary: 'Real systems. Documented results.'
        },
        relevantCaseStudies: ['trade-finance', 'fmcg-erp'],
        relevantTestimonials: [0, 1]
    },

    'hiring-managers': {
        id: 'hiring-managers',
        headline: 'Hire With Evidence, Not Guesswork.',
        subheadline: 'For hiring teams evaluating executive operations talent: this page focuses on proven outcomes, working style, and role fit.',
        whoThisIsFor: [
            'HR Directors & Talent Acquisition Leads',
            'COOs and Operations Leaders',
            'Executive Search Firms',
            'Leadership Teams Hiring Trusted Operators',
            'Outsourcing and Agency Recruiters'
        ],
        problemStatement: {
            title: 'Strong CVs are common. Reliable execution is rare.',
            description: 'Interview performance does not always predict day-one delivery. Hiring risk usually comes from three gaps: proof of execution, speed to productivity, and trust with confidential work.'
        },
        painPoints: [
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                ),
                title: 'Resume Overlap',
                description: 'Many candidates use similar keywords, making true role fit hard to judge.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ),
                title: '90-Day Ramp Risk',
                description: 'Hiring teams need someone who can stabilize quickly, not spend months figuring out the operating rhythm.'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                ),
                title: 'Trust and Confidentiality',
                description: 'Executive and personnel workflows require discipline under pressure and careful data handling.'
            }
        ],
        solution: {
            title: 'A Verifiable Candidate Profile',
            description: 'This portfolio is structured as hiring evidence: real scenarios, measurable outcomes, and references you can validate.',
            features: [
                'Current role & organization',
                'Tech stack proficiency',
                'Number of production systems built',
                'Regulatory/compliance experience',
                'Years of C-suite support'
            ]
        },
        pillars: [
            {
                title: 'Executive Office Experience',
                positioning: 'Hands-on support for principal time management, follow-through, and cross-team coordination.',
                outcomes: [
                    '8â€“12 hours of executive time recovered weekly',
                    'Consistent action closure across departments',
                    'Cleaner communication rhythm with leadership teams'
                ]
            },
            {
                title: 'Proven Operational Delivery',
                positioning: 'Built and maintained production workflows that improved speed and reduced recurring process failure.',
                outcomes: [
                    '5 production systems delivered',
                    '3,100+ records handled in daily operations',
                    'Strong reliability under real business pressure'
                ]
            },
            {
                title: 'Compliance and Confidentiality Discipline',
                positioning: 'Sensitive data handling and process controls are treated as core responsibilities, not afterthoughts.',
                outcomes: [
                    'Role-based access and control-driven workflows',
                    'Consistent audit readiness for critical processes',
                    'Zero reported confidentiality incidents'
                ]
            },
            {
                title: 'Autonomous Ownership',
                positioning: 'Able to take a process from problem discovery to stable handover with minimal supervision.',
                outcomes: [
                    'Faster transition from onboarding to delivery',
                    'Better closure rate on open actions',
                    'Reduced management overhead for hiring leaders'
                ]
            }
        ],
        operatingModel: [
            {
                step: 'Week 1: Alignment',
                description: 'Understand leadership priorities, risks, and immediate operational pressure points.'
            },
            {
                step: 'Weeks 2â€“4: Stabilize',
                description: 'Create clear tracking, reporting rhythm, and owner visibility for urgent workflows.'
            },
            {
                step: 'Month 2: Improve',
                description: 'Implement high-impact process fixes and remove repeated friction in coordination and follow-up.'
            },
            {
                step: 'Month 3: Standardize',
                description: 'Document SOPs, handover rules, and review cadence to make execution consistent.'
            },
            {
                step: 'Post 90 Days: Optimize',
                description: 'Refine edge cases using production feedback and maintain reliability at higher volume.'
            }
        ],
        compatibility: {
            environments: [
                {
                    name: 'Bangladesh Corporate Dynamics',
                    attributes: [
                        'Works well within hierarchy-based decision environments',
                        'Strong local compliance awareness',
                        'Comfort with high-context stakeholder communication'
                    ]
                },
                {
                    name: 'MNC Framework Standards',
                    attributes: [
                        'Structured reporting and documentation habits',
                        'Cross-functional and cross-border coordination readiness',
                        'Consistent execution under formal governance expectations'
                    ]
                }
            ],
            statement: 'One clear operating standard that adapts to local and global teams.'
        },
        differentiation: {
            title: 'Not just a resume narrative. A delivery record.',
            description: 'You are not asked to trust claims blindly. You can review case evidence, outcomes, and working approach before making a hiring decision.'
        },
        toolStack: {
            title: 'Tools used to deliver outcomes.',
            items: [
                'Core Productivity: Microsoft 365, Google Workspace, and advanced spreadsheet workflows.',
                'Automation Support: VBA and Apps Script for repetitive operational steps.',
                'Reporting Discipline: KPI dashboards and structured management reporting.',
                'Documentation Quality: SOP and process records that enable clean team handover.'
            ]
        },
        finalStatement: 'Reliable execution. Zero guesswork.',
        caseReferences: [
            {
                sector: 'Executive Office (Manufacturing Group)',
                challenge: 'Leadership managed five units with no central board-pack flow and frequent data gaps.',
                outcome: 'Implemented a structured submission process. Board packs became consistently ready before meeting day.'
            },
            {
                sector: 'FMCG Operations',
                challenge: 'High daily transaction volume was manually tracked with slow invoicing and recurring errors.',
                outcome: 'Improved process flow reduced invoice time and raised reliability without additional headcount.'
            },
            {
                sector: 'HR and Payroll',
                challenge: 'Personnel files were shared through uncontrolled channels with weak traceability.',
                outcome: 'Role-based access controls improved confidentiality and audit readiness.'
            },
            {
                sector: 'Medical Logistics',
                challenge: 'Patient and partner operations ran in disconnected trackers causing handoff failures.',
                outcome: 'Introduced a unified workflow with end-to-end visibility and more stable execution.'
            }
        ],
        metrics: [
            { value: '6+', label: 'Years in Operations' },
            { value: '5', label: 'Production Systems Built' },
            { value: '3,100+', label: 'Records Governed' },
            { value: '100%', label: 'Confidentiality Record' },
            { value: '0', label: 'Security Incidents' }
        ],
        cta: {
            primary: 'Review Executive Portfolio',
            primaryLink: '/resume.pdf',
            secondary: 'Schedule a Screening Call',
            secondaryLink: '/contact'
        },
        ctaSubtext: {
            primary: 'Detailed operational history and systems architecture portfolio.',
            secondary: '20-minute intro call. Direct, no fluff.'
        },
        faq: [
            {
                question: 'What\'s your core value in a team?',
                answer: 'Systems thinking and autonomous execution. I build the infrastructure so the team runs predictably without constant micromanagement.'
            },
            {
                question: 'Can you work under pressure at C-suite pace?',
                answer: 'Already doing it. I filter operational noise before it reaches the Principal and resolve escalations calmly with clear ownership.'
            },
            {
                question: 'How do you handle confidential information?',
                answer: 'Everything is governed by role-based access and audit trails. I maintain a zero-incident track record when handling sensitive executive or personnel data.'
            },
            {
                question: 'What\'s your technology comfort level?',
                answer: 'I build production-grade systems using VBA, Apps Script, SQL-logic, and LaTeX. But my real skill is designing the logical process, not just using the tool.'
            },
            {
                question: 'Why should we hire you over someone with a CS degree?',
                answer: 'Because I don\'t just write code â€” I solve operational problems. Every system I\'ve built exists because a real business was bleeding money or losing time.'
            }
        ],
        relevantCaseStudies: ['payroll-control', 'hr-docs'],
        relevantTestimonials: [0, 2]
    }
};

interface PersonaSpecificContentProps {
    personaId: string;
}

const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};



const PersonaSpecificContent: React.FC<PersonaSpecificContentProps> = ({ personaId }) => {
    const persona = PERSONAS[personaId];

    if (!persona) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Error 404</p>
                    <h1 className="text-xl font-medium text-zinc-900">Persona Not Found</h1>
                    <a href="/" className="inline-block text-zinc-500 hover:text-zinc-800 text-[11px] font-medium tracking-widest uppercase transition-colors pt-4">Return to Index</a>
                </div>
            </div>
        );
    }

    const relevantCaseStudies = PROJECTS.filter(p => persona.relevantCaseStudies.includes(p.id));
    const relevantTestimonials = persona.relevantTestimonials.map(idx => TESTIMONIALS[idx]);

    return (
        <div className="min-h-screen bg-white selection:bg-zinc-100 selection:text-zinc-900 text-zinc-900 font-sans antialiased">

            {/* 01: HERO */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-24">
                <div className="max-w-5xl mx-auto px-6 md:px-8">
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
                        <motion.div variants={fadeUp} className="mb-8">
                            <span className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase">Executive Briefing</span>
                        </motion.div>

                        <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-900 mb-6 leading-[1.15]">
                            {persona.headline}
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-base md:text-lg text-zinc-500 font-normal leading-relaxed max-w-2xl">
                            {persona.subheadline}
                        </motion.p>

                        {persona.whoThisIsFor && (
                            <motion.div variants={fadeUp} className="pt-12 mt-12 border-t border-zinc-100">
                                <div className="flex flex-wrap gap-x-8 gap-y-4">
                                    {persona.whoThisIsFor.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-zinc-300" />
                                            <span className="text-[13px] font-medium text-zinc-600">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 02: METRICS */}
            <section className="border-t border-zinc-100 bg-zinc-50/50">
                <div className="max-w-5xl mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
                        {persona.metrics.map((metric, i) => (
                            <div key={i} className="flex flex-col space-y-2">
                                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
                                    {metric.label}
                                </span>
                                <span className="text-2xl font-medium text-zinc-900 tracking-tight">
                                    {metric.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 03: THE BOTTLENECK */}
            {persona.problemStatement && (
                <section className="py-20 md:py-32 border-t border-zinc-100">
                    <div className="max-w-5xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                            <div className="md:col-span-4 space-y-6 lg:sticky lg:top-32 h-fit">
                                <span className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase block">The Bottleneck</span>
                                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900 leading-[1.2]">
                                    {persona.problemStatement.title}
                                </h2>
                            </div>

                            <div className="md:col-span-8 md:pl-8 xl:pl-16 space-y-12">
                                <p className="text-base text-zinc-500 leading-relaxed font-normal">
                                    {persona.problemStatement.description}
                                </p>

                                <div className="space-y-12">
                                    {(persona.painPoints && persona.painPoints.length > 0 ? persona.painPoints : []).map((pt, i) => (
                                        <div key={i} className="space-y-3">
                                            <h4 className="text-sm font-medium text-zinc-900 flex items-center gap-4">
                                                <span className="text-[10px] text-zinc-400 font-mono tracking-widest">0{i + 1}</span>
                                                {pt.title}
                                            </h4>
                                            {pt.description && (
                                                <p className="text-sm text-zinc-500 leading-relaxed pl-8">
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

            {/* 04: RESOLUTION */}
            <section className="py-20 md:py-32 bg-zinc-50/30 border-t border-zinc-100">
                <div className="max-w-5xl mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                        <div className="md:col-span-4 space-y-6 lg:sticky lg:top-32 h-fit">
                            <span className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase block">Resolution</span>
                            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900 leading-[1.2]">
                                {persona.solution.title}
                            </h2>
                            <p className="text-sm text-zinc-500 leading-relaxed font-normal">
                                {persona.solution.description}
                            </p>
                        </div>

                        <div className="md:col-span-8 md:pl-8 xl:pl-16">
                            <div className="grid gap-12">
                                {(persona.pillars || []).map((pillar, i) => (
                                    <div key={i} className="space-y-4">
                                        <h3 className="text-lg font-medium text-zinc-900 tracking-tight">{pillar.title}</h3>
                                        <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
                                            {pillar.positioning}
                                        </p>
                                        <ul className="space-y-2 pt-2">
                                            {pillar.outcomes.map((outcome, j) => (
                                                <li key={j} className="flex items-start gap-3 text-[13px] text-zinc-600">
                                                    <span className="w-1 h-1 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                                                    {outcome}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                                {!persona.pillars && persona.solution.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-4 py-4 border-b border-zinc-100 last:border-0">
                                        <span className="text-[10px] font-medium text-zinc-400 font-mono tracking-widest">0{i + 1}</span>
                                        <span className="text-sm font-medium text-zinc-900">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 05: OPERATING PROTOCOL */}
            {persona.operatingModel && (
                <section className="py-20 md:py-32 border-t border-zinc-100">
                    <div className="max-w-5xl mx-auto px-6 md:px-8">
                        <div className="mb-16 md:mb-20 space-y-6">
                            <span className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase block">Operating Protocol</span>
                            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900">
                                Execution Rhythm
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-zinc-100 border border-zinc-100 rounded-lg overflow-hidden">
                            {persona.operatingModel.map((item, i) => (
                                <div key={i} className="bg-white p-6 space-y-4 hover:bg-zinc-50/50 transition-colors">
                                    <span className="text-[10px] font-medium text-zinc-400 font-mono">STEP 0{i + 1}</span>
                                    <h3 className="text-sm font-medium text-zinc-900">
                                        {item.step}
                                    </h3>
                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {persona.compatibility && (
                            <div className="mt-24 md:mt-32 pt-20 md:pt-24 border-t border-zinc-100">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                                    <div className="md:col-span-5 space-y-8">
                                        <span className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase block">Governance</span>
                                        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900">
                                            Operating Architecture
                                        </h2>
                                        <div className="text-lg md:text-xl font-medium text-zinc-800 tracking-tight leading-snug pt-4">
                                            "{typeof persona.compatibility === 'object' ? persona.compatibility.statement : persona.compatibility}"
                                        </div>
                                    </div>

                                    <div className="md:col-span-7 md:pl-8 xl:pl-16">
                                        {typeof persona.compatibility === 'object' && (
                                            <div className="grid sm:grid-cols-2 gap-12">
                                                {persona.compatibility.environments.map((env, i) => (
                                                    <div key={i} className="space-y-6">
                                                        <h4 className="text-xs font-medium text-zinc-900 tracking-widest uppercase border-b border-zinc-100 pb-4">
                                                            {env.name}
                                                        </h4>
                                                        <div className="space-y-4">
                                                            {env.attributes.map((attr, j) => (
                                                                <div key={j} className="flex items-start gap-3">
                                                                    <div className="w-1 h-1 rounded-full bg-zinc-300 mt-2 shrink-0"></div>
                                                                    <p className="text-[13px] text-zinc-600 flex-1">
                                                                        {attr}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 06: PRODUCTION EVIDENCE */}
            {relevantCaseStudies.length > 0 && (
                <section className="py-20 md:py-32 bg-zinc-50/50 border-t border-zinc-100">
                    <div className="max-w-5xl mx-auto px-6 md:px-8">
                        <div className="mb-16 space-y-6">
                            <span className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase block">The Ledger</span>
                            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900">
                                Production Evidence
                            </h2>
                        </div>

                        <div className="border-t border-zinc-200/50">
                            {relevantCaseStudies.map((project, i) => (
                                <a
                                    key={project.id}
                                    href={`/work/${project.id}`}
                                    className="block py-8 border-b border-zinc-200/50 group"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.history.pushState({}, '', `/work/${project.id}`);
                                        window.dispatchEvent(new Event('popstate'));
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                        <div className="md:col-span-3">
                                            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest group-hover:text-zinc-900 transition-colors">
                                                {project.category}
                                            </span>
                                        </div>

                                        <div className="md:col-span-6">
                                            <h3 className="text-lg md:text-xl font-medium tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <div className="md:col-span-3 text-right hidden md:block">
                                            <span className="text-zinc-300 group-hover:text-zinc-900 transition-colors text-lg inline-block group-hover:translate-x-1 duration-300">
                                                â†’
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 07: FIELD REFERENCES */}
            {persona.caseReferences && (
                <section className="py-20 md:py-32 border-t border-zinc-100">
                    <div className="max-w-5xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                            <div className="md:col-span-4 space-y-6 lg:sticky lg:top-32 h-fit">
                                <span className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase block">Field References</span>
                                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900">
                                    Delivered in Practice
                                </h2>
                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest pt-2">
                                    Sector-level transparency. Client identity protected by NDA.
                                </p>
                            </div>

                            <div className="md:col-span-8 md:pl-8 xl:pl-16 space-y-8">
                                {persona.caseReferences.map((ref, i) => (
                                    <div key={i} className="pt-8 border-t border-zinc-100 first:border-0 first:pt-0">
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="text-xs font-medium text-zinc-900 uppercase tracking-widest">{ref.sector}</span>
                                            <span className="text-[10px] text-zinc-400 font-mono">REF/0{i + 1}</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest block">The Challenge</span>
                                                <p className="text-sm text-zinc-500 leading-relaxed">{ref.challenge}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-medium text-zinc-800 uppercase tracking-widest block">The Outcome</span>
                                                <p className="text-sm text-zinc-900 font-medium leading-relaxed">{ref.outcome}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 08: SOVEREIGNTY / DIFFERENTIATION */}
            {(persona.differentiation || persona.toolStack) && (
                <section className="py-20 md:py-32 bg-zinc-50/50 border-t border-zinc-100">
                    <div className="max-w-5xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                            {persona.differentiation && (
                                <div className="space-y-8">
                                    <span className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase block">The Differential</span>
                                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-zinc-900 leading-[1.3]">
                                        {persona.differentiation.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-normal">
                                        {persona.differentiation.description}
                                    </p>
                                </div>
                            )}

                            {persona.toolStack && (
                                <div className="space-y-8">
                                    <span className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase block">Technical Sovereignty</span>
                                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-zinc-900 leading-[1.3]">
                                        {persona.toolStack.title}
                                    </h3>
                                    <div className="space-y-6 pt-4">
                                        {persona.toolStack.items.map((item, i) => {
                                            const parts = item.split(':');
                                            const title = parts[0];
                                            const desc = parts.length > 1 ? parts.slice(1).join(':').trim() : '';
                                            return (
                                                <div key={i} className="space-y-2">
                                                    <span className="text-xs font-medium text-zinc-900 uppercase tracking-widest block">{title}</span>
                                                    {desc && <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>}
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

            {/* 09: VALIDATION */}
            {relevantTestimonials.length > 0 && (
                <section className="py-20 md:py-32 border-t border-zinc-100">
                    <div className="max-w-5xl mx-auto px-6 md:px-8">
                        <div className="mb-16 space-y-6">
                            <span className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase block">Validation Protocol</span>
                            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900">
                                Verified Impact
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
                            {relevantTestimonials.map((testimonial, i) => (
                                <div key={i} className="space-y-8">
                                    <p className="text-base md:text-lg text-zinc-800 leading-[1.6] font-normal tracking-tight">
                                        "{testimonial.content}"
                                    </p>

                                    <div className="flex items-center gap-4 pt-6 border-t border-zinc-100">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-100 shrink-0">
                                            <OptimizedImage
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-zinc-900">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">
                                                {testimonial.position}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 10: DEPLOYMENT */}
            <section className="py-32 md:py-48 bg-zinc-50/50 border-t border-zinc-100 flex flex-col justify-center">
                <div className="max-w-3xl mx-auto px-6 md:px-8 text-center w-full">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-900 leading-[1.15]">
                        {persona.finalStatement || 'The infrastructure that allows you to lead.'}
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                        <a
                            href={persona.cta.primaryLink}
                            className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 text-white font-medium text-[11px] uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-none"
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState({}, '', persona.cta.primaryLink);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo(0, 0);
                            }}
                        >
                            {persona.cta.primary}
                        </a>
                        <a
                            href={persona.cta.secondaryLink}
                            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-zinc-200 text-zinc-600 font-medium text-[11px] uppercase tracking-widest hover:border-zinc-300 hover:text-zinc-900 transition-colors rounded-none"
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState({}, '', persona.cta.secondaryLink);
                                window.dispatchEvent(new Event('popstate'));
                                window.scrollTo(0, 0);
                            }}
                        >
                            {persona.cta.secondary}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PersonaSpecificContent;

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
                description: 'Managing stakeholder coordination, clearing inbox bottlenecks, and executing cross-functional workflows autonomously.'
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
            title: 'Traditional admin support focuses on task completion. I focus on executive operating reliability.',
            description: 'I do not only manage requests — I build repeatable systems for decision flow, follow-up control, and leadership visibility. My approach is rooted in systems thinking, ensuring the executive office functions as a predictable, auditable unit. I create institutional memory so the office is never dependent on one person\'s recall or availability. The role output is not activity volume. The role output is decision speed, execution consistency, and reduced coordination risk.'
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
            secondaryLink: '/contact'
        },
        relevantCaseStudies: ['payroll-control', 'hr-docs'],
        relevantTestimonials: [1, 2]
    },
    'operations-leaders': {
        id: 'operations-leaders',
        headline: 'Scale Systems Without Headcount',
        subheadline: 'Enterprise-grade operational architecture that eliminates bottlenecks and multiplies team capacity',
        painPoints: [
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                ),
                title: 'Process Bottlenecks',
                description: 'Workflows dependent on specific people, creating single points of failure'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                ),
                title: 'Data Reconciliation',
                description: 'Manual data entry and reconciliation across disconnected operational silos'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                ),
                title: 'Capacity Limits',
                description: 'Growth stalls because every new order requires proportional headcount increase'
            }
        ],
        solution: {
            title: 'Zero-Cost ERP Systems',
            description: 'I architect relational data systems and governance frameworks that scale operations without enterprise software costs.',
            features: [
                'Relational data architecture on existing tools',
                'Workflow orchestration with idempotency',
                'Real-time operational KPI dashboards',
                'Governance frameworks with compliance controls',
                'Self-healing automation architectures'
            ]
        },
        metrics: [
            { value: '3,100+', label: 'Records Managed' },
            { value: '0%', label: 'Pipeline Failures' },
            { value: '80%', label: 'Efficiency Gains' }
        ],
        cta: {
            primary: 'Explore Solutions',
            primaryLink: '/solutions',
            secondary: 'System Audit',
            secondaryLink: '/contact'
        },
        relevantCaseStudies: ['med-ops', 'fmcg-erp', 'payroll-control'],
        relevantTestimonials: [0, 2]
    },
    'founders': {
        id: 'founders',
        headline: 'Eliminate $50K In SaaS Overhead',
        subheadline: 'Institutional sovereignty through owned logic kernels that eliminate SaaS sprawl and vendor lock-in',
        painPoints: [
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
                title: 'SaaS Sprawl',
                description: 'Paying for multiple overlapping tools, losing capital to redundant subscriptions'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                ),
                title: 'Vendor Lock-in',
                description: 'Core logic trapped in proprietary platforms, making migration impossible'
            },
            {
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                ),
                title: 'Human-Bridge Debt',
                description: 'Teams manually bridging disconnected systems instead of doing strategic work'
            }
        ],
        solution: {
            title: 'Institutional Sovereignty',
            description: 'I build logic kernels you own completely—centralized, version-controlled systems that outlast vendor cycles.',
            features: [
                'Custom automation scripts you control',
                'Relational data architecture independently owned',
                'Deterministic logic with full audit trails',
                'Migration-ready systems with zero lock-in',
                'ROI-positive automation (3-6mo payback)'
            ]
        },
        metrics: [
            { value: '৳2-3L', label: 'Monthly Savings' },
            { value: '100%', label: 'Logic Ownership' },
            { value: '3-6mo', label: 'ROI Payback' }
        ],
        cta: {
            primary: 'Calculate ROI',
            primaryLink: '/work',
            secondary: 'See Cases',
            secondaryLink: '/work'
        },
        relevantCaseStudies: ['trade-finance', 'fmcg-erp', 'hr-docs'],
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
        relevantCaseStudies: ['payroll-control', 'hr-docs', 'med-ops'],
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
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-6">
                    <p className="mono text-[10px] text-slate-400 uppercase tracking-widest">Error 404</p>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Persona Not Found</h1>
                    <a href="/" className="inline-block text-blue-600 hover:text-blue-700 text-sm font-semibold tracking-tight border-b border-blue-600/30">Return to Index</a>
                </div>
            </div>
        );
    }

    const relevantCaseStudies = PROJECTS.filter(p => persona.relevantCaseStudies.includes(p.id));
    const relevantTestimonials = persona.relevantTestimonials.map(idx => TESTIMONIALS[idx]);

    return (
        <div className="min-h-screen bg-[#FBFBFA] selection:bg-blue-700 selection:text-white text-slate-900">

            {/* SECTION 01: EXECUTIVE BRIEFING (HERO) */}
            <section className="relative z-10 pt-28 md:pt-40 pb-16 md:pb-24 border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-12 gap-y-12">
                        <div className="col-span-12 lg:col-span-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-6 md:space-y-8"
                            >
                                <div className="mb-6 md:mb-8">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Executive Briefing</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-slate-900 max-w-4xl">
                                    {persona.headline}
                                </h1>

                                <p className="text-base md:text-lg lg:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                                    {persona.subheadline}
                                </p>

                                {persona.whoThisIsFor && (
                                    <div className="pt-8 md:pt-12 mt-8 md:mt-12 flex flex-wrap items-start gap-x-8 gap-y-4 border-t border-slate-100">
                                        <div className="flex items-center gap-3 w-full md:w-auto mb-1 md:mb-0">
                                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Target Focus</span>
                                        </div>
                                        <div className="flex flex-wrap gap-x-6 gap-y-3">
                                            {persona.whoThisIsFor.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <span className="text-[11px] font-black text-slate-900 tracking-tight">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 02: PERFORMANCE INDEX (METRICS) */}
            <section className="relative z-10 bg-white border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-slate-100 border-y border-slate-100">
                        {persona.metrics.map((metric, i) => (
                            <div key={i} className="bg-white py-8 md:py-10 px-4 md:px-6 group hover:bg-slate-50 transition-colors duration-500">
                                <span className="block mono text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-blue-600 transition-colors">
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
                                <div className="mb-4 md:mb-6">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">The Bottleneck</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900 max-w-full md:max-w-none pr-2 md:pr-0 lg:-mr-24 xl:-mr-32 relative z-10 w-full lg:w-[130%]">
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

            {/* SECTION 04: RESOLUTION ARCHITECTURE (SOLUTION) */}
            <section className="relative z-10 py-16 md:py-32 bg-white border-y border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-24">
                        <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8 lg:sticky lg:top-32 h-fit">
                            <div className="mb-6">
                                <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Resolution</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900">
                                {persona.solution.title}
                            </h2>
                            <p className="text-base text-slate-500 font-medium leading-relaxed">
                                {persona.solution.description}
                            </p>
                        </div>

                        <div className="col-span-12 lg:col-span-8 space-y-4">
                            {(persona.pillars || []).map((pillar, i) => (
                                <div key={i} className="p-6 md:p-10 bg-[#FBFBFA] border border-slate-100 rounded-xl group hover:bg-slate-50 transition-all duration-500">
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
                                                        <div className="w-1 h-1 rounded-full bg-blue-600/40 mt-1.5 shrink-0" />
                                                        {outcome}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {!persona.pillars && persona.solution.features.map((feature, i) => (
                                <div key={i} className="p-6 md:p-8 bg-[#FBFBFA] border border-slate-100 rounded-lg flex items-center justify-between group hover:bg-slate-50 transition-all">
                                    <span className="text-base md:text-lg font-bold text-slate-900 tracking-tight">{feature}</span>
                                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4">→</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 05: OPERATING PROTOCOL (PROCESS) */}
            {persona.operatingModel && (
                <section className="relative z-10 py-16 md:py-32 bg-[#FBFBFA]">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-20">
                            <div className="col-span-12 lg:col-span-6 space-y-4 md:space-y-6">
                                <div className="mb-6">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Operating Protocol</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900">
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
                                            <div className="flex items-center gap-4">
                                                <SectionLabel variant="secondary">GOVERNANCE</SectionLabel>
                                            </div>
                                            <div className="space-y-10">
                                                <h2 className="text-4xl md:text-5xl lg:text-7xl font-[900] tracking-tighter leading-[0.92] text-slate-900">
                                                    Operating <br />
                                                    <span className="text-slate-400">Architecture.</span>
                                                </h2>

                                                {/* Strategic Statement moved here */}
                                                <div className="space-y-6">
                                                    <p className="text-xl md:text-2xl lg:text-3xl font-[900] text-slate-900 tracking-tighter leading-[1.1] italic relative">
                                                        <div className="absolute -left-6 top-1 bottom-1 w-1 bg-blue-700 opacity-20"></div>
                                                        "{typeof persona.compatibility === 'object' ? persona.compatibility.statement : persona.compatibility}"
                                                    </p>
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
                                                            <div className="pb-4 border-b border-slate-100/60 flex items-center justify-between">
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
                <section className="relative z-10 py-16 md:py-32 bg-[#FBFBFA] border-y border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="flex items-center justify-between mb-10 md:mb-20">
                            <div className="space-y-4">
                                <div className="mb-4 md:mb-6">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">The Ledger</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-slate-900">
                                    Production Evidence.
                                </h2>
                            </div>
                        </div>

                        <div className="divide-y divide-slate-100 border-t border-slate-100">
                            {relevantCaseStudies.map((project, i) => (
                                <a
                                    key={project.id}
                                    href={`/work/${project.id}`}
                                    className="group flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-12 items-start md:items-center hover:md:px-6 transition-all duration-500 ease-[0.16,1,0.3,1]"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.history.pushState({}, '', `/work/${project.id}`);
                                        window.dispatchEvent(new PopStateEvent('popstate'));
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    <div className="md:col-span-2">
                                        <span className="mono text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                                            {project.category}
                                        </span>
                                    </div>
                                    <div className="md:col-span-6">
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:md:translate-x-2 transition-transform duration-500 tracking-tight">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <div className="md:col-span-3">
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed md:pr-8 line-clamp-2">
                                            {project.headline}
                                        </p>
                                    </div>
                                    <div className="hidden md:flex md:col-span-1 justify-end">
                                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300">
                                            <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION 07: FIELD REFERENCES (SECTORS) */}
            {persona.caseReferences && (
                <section className="relative z-10 py-16 md:py-32 bg-[#FBFBFA]">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-24">
                            <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">
                                <div className="mb-4 md:mb-6">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Field References</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-slate-900">
                                    Delivered in Practice.
                                </h2>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed uppercase tracking-widest">
                                    Sector-level transparency. Client identity protected by NDA.
                                </p>
                            </div>

                            <div className="col-span-12 lg:col-span-8 space-y-6">
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

            {/* SECTION 08: SOVEREIGNTY (DIFFERENTIATION) */}
            {(persona.differentiation || persona.toolStack) && (
                <section className="relative z-10 py-16 md:py-32 bg-[#FBFBFA] border-y border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-24">
                            {persona.differentiation && (
                                <div className="col-span-12 lg:col-span-6 space-y-8 md:space-y-12">
                                    <div className="space-y-4">
                                        <div className="mb-6">
                                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">The Differential</span>
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
                                        <div className="mb-6">
                                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Technical Sovereignty</span>
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

            {/* SECTION 09: VALIDATION (TESTIMONIALS) */}
            {relevantTestimonials.length > 0 && (
                <section className="relative z-10 py-16 md:py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="mb-10 md:mb-20">
                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Validation Protocol</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {relevantTestimonials.map((testimonial, i) => (
                                <div key={i} className="bg-white p-6 md:p-12 rounded-xl border border-slate-200/60 space-y-6 md:space-y-10 group">
                                    <p className="text-base md:text-xl text-slate-700 font-medium leading-relaxed italic">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center gap-4 md:gap-5 pt-6 md:pt-10 border-t border-slate-100">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                                            <OptimizedImage
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-[13px] font-bold text-slate-900 tracking-tight">{testimonial.name}</div>
                                            <div className="mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{testimonial.position}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION 10: DEPLOYMENT (CTA) */}
            <section className="relative z-10 py-24 md:py-48 bg-white overflow-hidden border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-10 md:space-y-16">
                    <div className="space-y-5 md:space-y-6">
                        <div className="inline-flex items-center gap-4 bg-[#FBFBFA] px-4 py-2 rounded-full border border-slate-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                            <span className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">Available for Engagement</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl lg:text-[80px] font-bold tracking-tight text-slate-900 leading-[1.05]">
                            {persona.finalStatement || 'I am the infrastructure that allows you to lead.'}
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12">
                        <a
                            href={persona.cta.primaryLink}
                            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-slate-900 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 rounded-lg shadow-sm text-center"
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
                            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white border border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-widest hover:border-slate-300 hover:text-slate-900 transition-all duration-300 rounded-lg shadow-sm text-center"
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

                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
                        Established in Dhaka. Operating Worldwide.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PersonaSpecificContent;

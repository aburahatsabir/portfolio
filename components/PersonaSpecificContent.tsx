import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS, PROJECTS } from '../constants';

interface PersonaConfig {
    id: string;
    headline: string;
    subheadline: string;
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
    relevantCaseStudies: string[];
    relevantTestimonials: number[];
}

const PERSONAS: Record<string, PersonaConfig> = {
    'executive-assistants': {
        id: 'executive-assistants',
        headline: 'Reclaim 10+ Hours Every Week',
        subheadline: 'Automated executive support systems that eliminate repetitive admin work and coordination chaos',
        painPoints: [
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                ),
                title: 'Manual Scheduling Chaos',
                description: 'Coordinating C-suite calendars across multiple timezones with constant conflicts and last-minute changes'
            },
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                ),
                title: 'Repetitive Admin Tasks',
                description: 'Spending hours on expense reports, travel bookings, and board pack compilation that could be automated'
            },
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                ),
                title: 'C-Suite Coordination Complexity',
                description: 'Managing confidential communications and ensuring nothing falls through the cracks across multiple executives'
            }
        ],
        solution: {
            title: 'Automated Support Clusters',
            description: 'I build intelligent automation systems that handle the repetitive work while you focus on strategic support.',
            features: [
                'Timezone-aware scheduling automation with conflict detection',
                'Automated board pack compilation from multiple data sources',
                'Travel logistics coordination with real-time updates',
                'Expense report automation with approval workflows',
                'Confidential document management systems'
            ]
        },
        metrics: [
            { value: '450+', label: 'Hours Reclaimed/Year' },
            { value: '0%', label: 'Scheduling Conflicts' },
            { value: '90%', label: 'Manual Work Eliminated' }
        ],
        cta: {
            primary: 'See How I Automated Executive Operations',
            primaryLink: '#/work',
            secondary: 'Schedule a Consultation',
            secondaryLink: '#/contact'
        },
        relevantCaseStudies: ['fmcg-erp', 'med-ops'],
        relevantTestimonials: [1, 2]
    },
    'operations-leaders': {
        id: 'operations-leaders',
        headline: 'Build Systems That Scale Without Hiring',
        subheadline: 'Enterprise-grade operational architecture that eliminates bottlenecks and multiplies team capacity',
        painPoints: [
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                ),
                title: 'Process Bottlenecks',
                description: 'Critical workflows depend on specific people, creating single points of failure and capacity constraints'
            },
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                ),
                title: 'Manual Workflow Overhead',
                description: 'Teams spending 60%+ of their time on manual data entry, reconciliation, and status updates'
            },
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                ),
                title: 'Team Capacity Limits',
                description: 'Growth stalls because every new customer requires proportional headcount increase'
            }
        ],
        solution: {
            title: 'Zero-Cost ERP Systems',
            description: 'I architect relational data systems and governance frameworks that scale operations without enterprise software costs.',
            features: [
                'Relational data architecture on existing tools (Google Sheets, Excel)',
                'Automated workflow orchestration with idempotency guarantees',
                'Real-time operational dashboards and KPI tracking',
                'Governance frameworks with built-in compliance controls',
                'Self-healing systems with automatic error recovery'
            ]
        },
        metrics: [
            { value: '3,100+', label: 'Records Managed' },
            { value: '0%', label: 'Pipeline Failures' },
            { value: '80%', label: 'Efficiency Gains' }
        ],
        cta: {
            primary: 'Explore Operational Systems Architecture',
            primaryLink: '#/solutions',
            secondary: 'Request Systems Audit',
            secondaryLink: '#/diagnostic'
        },
        relevantCaseStudies: ['med-ops', 'fmcg-erp', 'payroll-control'],
        relevantTestimonials: [3, 4]
    },
    'founders': {
        id: 'founders',
        headline: 'Save $50K/Year in Unnecessary Overhead',
        subheadline: 'Institutional sovereignty through owned logic kernels that eliminate SaaS sprawl and vendor lock-in',
        painPoints: [
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
                title: 'SaaS Sprawl',
                description: 'Paying for 40+ tools with overlapping features, losing $50K+ annually to redundant subscriptions'
            },
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                ),
                title: 'Vendor Lock-In',
                description: 'Core business logic trapped in proprietary platforms, making migration impossible and pricing unpredictable'
            },
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                ),
                title: 'Operational Inefficiency',
                description: 'Teams manually bridging disconnected systems, creating "Human-Bridge" debt that scales with headcount'
            }
        ],
        solution: {
            title: 'Institutional Sovereignty',
            description: 'I build logic kernels you own completely—centralized, version-controlled systems that outlast vendor cycles.',
            features: [
                'Custom automation scripts you control (VBA, Apps Script)',
                'Relational data architecture independent of SaaS platforms',
                'Deterministic business logic with full audit trails',
                'Migration-ready systems with zero vendor lock-in',
                'ROI-positive automation (payback in 3-6 months)'
            ]
        },
        metrics: [
            { value: '৳2-3L', label: 'Monthly Savings' },
            { value: '100%', label: 'Logic Ownership' },
            { value: '3-6mo', label: 'ROI Payback' }
        ],
        cta: {
            primary: 'Calculate Your Savings Potential',
            primaryLink: '#/diagnostic',
            secondary: 'See Case Studies',
            secondaryLink: '#/work'
        },
        relevantCaseStudies: ['trade-finance', 'fmcg-erp', 'hr-docs'],
        relevantTestimonials: [0, 1]
    },
    'hiring-managers': {
        id: 'hiring-managers',
        headline: 'Expert Executive Operations Professional',
        subheadline: 'Proven track record in C-suite support, enterprise automation, and operational governance',
        painPoints: [
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                ),
                title: 'Finding Qualified Talent',
                description: 'Executive admin roles require rare combination of technical skills, business acumen, and discretion'
            },
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
                title: 'Verifying Technical Skills',
                description: 'Candidates claim automation expertise but lack portfolio of production systems and measurable results'
            },
            {
                icon: (
                    <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                ),
                title: 'Cultural Fit Assessment',
                description: 'Need someone who can operate autonomously at C-suite level with zero-error execution standards'
            }
        ],
        solution: {
            title: 'Proven Enterprise Experience',
            description: 'Portfolio of production systems serving 3,100+ users with documented efficiency gains and zero failures.',
            features: [
                'Current: Executive – Administration at Prominent Tec (2024-Present)',
                'Technical: VBA, Apps Script, Advanced Excel, LaTeX, Relational Data Architecture',
                'Operational: C-suite scheduling, board materials, confidential communications',
                'Systems: Built 5+ production ERPs managing $100K+ in operational value',
                'Governance: Audit-ready frameworks compliant with BD Labour Act 2006'
            ]
        },
        metrics: [
            { value: '6+', label: 'Years Experience' },
            { value: '5', label: 'Production Systems' },
            { value: '3,100+', label: 'Users Supported' }
        ],
        cta: {
            primary: 'Review My Professional Background',
            primaryLink: '#/about',
            secondary: 'Download Resume',
            secondaryLink: '#/contact'
        },
        relevantCaseStudies: ['payroll-control', 'hr-docs', 'med-ops'],
        relevantTestimonials: [1, 2, 3]
    }
};

interface PersonaSpecificContentProps {
    personaId: string;
}

const PersonaSpecificContent: React.FC<PersonaSpecificContentProps> = ({ personaId }) => {
    const persona = PERSONAS[personaId];

    if (!persona) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Persona Not Found</h1>
                    <a href="#/" className="text-blue-700 hover:underline">Return to Home</a>
                </div>
            </div>
        );
    }

    const relevantCaseStudies = PROJECTS.filter(p => persona.relevantCaseStudies.includes(p.id));
    const relevantTestimonials = persona.relevantTestimonials.map(idx => TESTIMONIALS[idx]);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                            <span className="w-2 h-2 bg-blue-700 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                Persona-Specific Solutions
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900">
                            {persona.headline}
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            {persona.subheadline}
                        </p>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
                            {persona.metrics.map((metric, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl md:text-5xl font-black text-blue-700 mb-2">
                                        {metric.value}
                                    </div>
                                    <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                                        {metric.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pain Points */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                            Sound Familiar?
                        </h2>
                        <p className="text-lg text-slate-600">
                            These are the challenges I solve every day
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {persona.painPoints.map((pain, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow"
                            >
                                <div className="mb-4">{pain.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{pain.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{pain.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                            {persona.solution.title}
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            {persona.solution.description}
                        </p>
                    </div>

                    <div className="bg-slate-900 text-white p-10 rounded-3xl">
                        <ul className="space-y-4">
                            {persona.solution.features.map((feature, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-lg">{feature}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Relevant Case Studies */}
            {relevantCaseStudies.length > 0 && (
                <section className="py-20 px-6 bg-slate-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                                Relevant Case Studies
                            </h2>
                            <p className="text-lg text-slate-600">
                                Real systems built for challenges like yours
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {relevantCaseStudies.slice(0, 3).map((project, idx) => (
                                <motion.a
                                    key={project.id}
                                    href="#/work/{project.id}"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "#/work/" + project.id;
                                        window.scrollTo(0, 0);
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-700 transition-all group cursor-pointer"
                                >
                                    <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">
                                        {project.category}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-600 mb-4">{project.headline}</p>
                                    <div className="flex items-center gap-2 text-blue-700 font-semibold">
                                        <span>View Case Study</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials */}
            {relevantTestimonials.length > 0 && (
                <section className="py-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                                What Others Say
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {relevantTestimonials.map((testimonial, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-slate-50 p-8 rounded-2xl"
                                >
                                    <p className="text-lg text-slate-700 mb-6 italic">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-4">
                                        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                                        <div>
                                            <div className="font-bold text-slate-900">{testimonial.name}</div>
                                            <div className="text-sm text-slate-600">{testimonial.position}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 px-6 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-slate-300 mb-10">
                        Let's discuss how I can help solve your specific challenges
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={persona.cta.primaryLink}
                            className="px-10 py-5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
                        >
                            {persona.cta.primary}
                        </a>
                        <a
                            href={persona.cta.secondaryLink}
                            className="px-10 py-5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
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

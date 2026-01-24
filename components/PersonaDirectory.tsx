import React from 'react';
import { motion } from 'framer-motion';

const PersonaDirectory: React.FC = () => {
    const personas = [
        {
            id: 'executive-assistants',
            title: 'For Executive Assistants',
            headline: 'Reclaim 10+ Hours Every Week',
            description: 'Automated executive support systems that eliminate repetitive admin work and coordination chaos',
            icon: (
                <svg className="w-14 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            metrics: ['450+ Hours/Year', '0% Conflicts', '90% Automation'],
            color: 'from-blue-500 to-blue-700'
        },
        {
            id: 'operations-leaders',
            title: 'For Operations Leaders',
            headline: 'Build Systems That Scale Without Hiring',
            description: 'Enterprise-grade operational architecture that eliminates bottlenecks and multiplies team capacity',
            icon: (
                <svg className="w-14 h-14 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            metrics: ['3,100+ Records', '0% Failures', '80% Efficiency'],
            color: 'from-purple-500 to-purple-700'
        },
        {
            id: 'founders',
            title: 'For Founders',
            headline: 'Save $50K/Year in Unnecessary Overhead',
            description: 'Institutional sovereignty through owned logic kernels that eliminate SaaS sprawl and vendor lock-in',
            icon: (
                <svg className="w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            metrics: ['৳2-3L Savings', '100% Ownership', '3-6mo ROI'],
            color: 'from-green-500 to-green-700'
        },
        {
            id: 'hiring-managers',
            title: 'For Hiring Managers',
            headline: 'Expert Executive Operations Professional',
            description: 'Proven track record in C-suite support, enterprise automation, and operational governance',
            icon: (
                <svg className="w-14 h-14 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            metrics: ['6+ Years', '5 Systems', '3,100+ Users'],
            color: 'from-orange-500 to-orange-700'
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                        <span className="w-2 h-2 bg-blue-700 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                            Solutions For Every Role
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6">
                        Find Your Path to<br />
                        <span className="text-blue-700">Operational Excellence</span>
                    </h1>

                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Tailored solutions for your specific role and challenges. Choose your path below.
                    </p>
                </motion.div>

                {/* Persona Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {personas.map((persona, idx) => (
                        <motion.a
                            key={persona.id}
                            href={`#/persona/${persona.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative bg-white border-2 border-slate-200 rounded-3xl p-8 hover:border-blue-700 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="mb-4">{persona.icon}</div>

                            {/* Title */}
                            <div className="text-sm font-bold uppercase tracking-wider text-blue-700 mb-2">
                                {persona.title}
                            </div>

                            {/* Headline */}
                            <h2 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                                {persona.headline}
                            </h2>

                            {/* Description */}
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {persona.description}
                            </p>

                            {/* Metrics */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {persona.metrics.map((metric, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg"
                                    >
                                        {metric}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex items-center gap-2 text-blue-700 font-bold group-hover:gap-4 transition-all">
                                <span>Explore Solutions</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>

                            {/* Gradient Accent */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${persona.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300 blur-2xl`}></div>
                        </motion.a>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-slate-600 mb-6">
                        Not sure which path is right for you?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#/work"
                            className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-blue-700 transition-all"
                        >
                            View All Case Studies
                        </a>
                        <a
                            href="#/contact"
                            className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-xl font-bold text-sm uppercase tracking-wider hover:border-blue-700 hover:text-blue-700 transition-all"
                        >
                            Get in Touch
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PersonaDirectory;

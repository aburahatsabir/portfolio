import React from 'react';
import { motion } from 'framer-motion';
import { trackCustomEvent } from '../utils/analytics';
import SectionLabel from './shared/SectionLabel';

const PersonaDirectory: React.FC = () => {
    const personas = [
        {
            id: 'executive-assistants',
            title: 'Executive Assistants',
            subtitle: 'Leadership Architecture',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            accentColor: 'text-blue-600'
        },
        {
            id: 'operations-leaders',
            title: 'Operations Leaders',
            subtitle: 'Systems Engineering',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            accentColor: 'text-blue-700'
        },
        {
            id: 'founders',
            title: 'Founders & CEOs',
            subtitle: 'Strategic Sovereignty',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            accentColor: 'text-slate-900'
        },
        {
            id: 'hiring-managers',
            title: 'Hiring Managers',
            subtitle: 'Impact & Governance',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            accentColor: 'text-slate-700'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <div className="min-h-screen bg-white relative selection:bg-blue-700 selection:text-white">
            {/* Sophisticated Background Pattern (Home Hero Style) */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.3]"></div>
                <div className="absolute top-0 right-0 w-[45%] h-full bg-slate-50/50 border-l border-slate-100 hidden lg:block"></div>
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-full pointer-events-none"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-32 lg:pt-48 pb-32 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-4xl mb-24 lg:mb-32"
                >
                    <motion.div variants={itemVariants} className="mb-8">
                        <SectionLabel variant="secondary">Strategic Portals</SectionLabel>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-8xl lg:text-[105px] font-[900] tracking-[-0.04em] leading-[0.88] text-slate-900 mb-8"
                    >
                        Built for Your <br />
                        <span className="text-blue-700">Mandate.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl"
                    >
                        Select your operational perspective to access specialized frameworks tailored to your unique institutional challenges.
                    </motion.p>
                </motion.div>

                {/* Portal Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {personas.map((persona) => (
                        <motion.a
                            key={persona.id}
                            href={`/persona/${persona.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                trackCustomEvent('persona_select', {
                                    event_category: 'User Segmentation',
                                    persona_id: persona.id,
                                    persona_title: persona.title
                                });
                                window.history.pushState({}, '', `/persona/${persona.id}`);
                                window.dispatchEvent(new PopStateEvent('popstate'));
                                window.scrollTo(0, 0);
                            }}
                            variants={itemVariants}
                            className="group relative h-[360px] bg-white border border-slate-100 rounded-2xl p-10 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-slate-200 active:scale-[0.98]"
                        >
                            {/* Accent Layer */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50/50 border-l border-b border-slate-100 -skew-x-12 translate-x-8 -translate-y-8 pointer-events-none group-hover:bg-blue-50/30 transition-colors" />

                            <div className="relative">
                                {/* Icon Container */}
                                <div className="mb-8">
                                    <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-500 group-hover:bg-slate-900 group-hover:border-slate-800 group-hover:shadow-xl group-hover:scale-110">
                                        <div className="text-slate-600 group-hover:text-white transition-colors duration-500">
                                            {persona.icon}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-blue-700 transition-colors">
                                        {persona.subtitle}
                                    </span>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                                        {persona.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="relative flex justify-between items-center pt-8 border-t border-slate-50">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Select pathway</span>
                                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-blue-700 group-hover:border-blue-700 group-hover:shadow-lg transition-all duration-500">
                                    <svg className="w-4 h-4 text-slate-400 group-hover:!text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Footer Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-20 border-t border-slate-100"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                        <div className="space-y-2 text-center sm:text-left">
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest text-blue-700">Archival Research</h4>
                            <p className="text-slate-500 font-medium">Deep dives into previous operational mandates and architectural builds.</p>
                        </div>

                        <a
                            href="/work"
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState({}, '', '/work');
                                window.dispatchEvent(new PopStateEvent('popstate'));
                                window.scrollTo(0, 0);
                            }}
                            className="group relative px-12 py-6 bg-white border border-slate-100 rounded-xl font-black text-[11px] uppercase tracking-[0.4em] text-slate-500 hover:text-blue-700 flex items-center gap-4 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-600/20 active:scale-[0.98]"
                        >
                            <span className="relative z-10 transition-colors duration-500">View Full Case Archive</span>
                            <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="relative z-10"
                            >
                                <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-700 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.div>

                            {/* Subtle Hover Tint */}
                            <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/10 transition-colors duration-500 rounded-xl" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PersonaDirectory;

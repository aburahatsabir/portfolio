import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './shared/SectionLabel';

const PersonaCTA: React.FC = () => {
    const personas = [
        {
            id: 'executive-assistants',
            title: 'Executive Assistants',
            description: 'Administrative architecture for executive support teams.',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: 'operations-leaders',
            title: 'Operations Leaders',
            description: 'Automated governance and systems at scale.',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            id: 'founders',
            title: 'Founders & CEOs',
            description: 'Office of the CEO as a flawless operating system.',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            )
        },
        {
            id: 'hiring-managers',
            title: 'Hiring Managers',
            description: 'Evidence-based impact with measurable ROI.',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
    ];

    return (
        <section id="solutions-directory" className="py-16 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <SectionLabel>Outcome Pathways</SectionLabel>
                            <div className="h-px bg-slate-100 flex-1" />
                        </div>

                        <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-900 mb-8">
                            Built for Your <br />
                            <span className="text-slate-400">Mandate.</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                            Select your operational perspective to access specialized frameworks tailored to your unique institutional challenges.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {personas.map((persona, idx) => (
                        <motion.a
                            key={persona.id}
                            href={`/persona/${persona.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState({}, '', `/persona/${persona.id}`);
                                window.dispatchEvent(new PopStateEvent('popstate'));
                                window.scrollTo(0, 0);
                            }}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative h-full bg-white border border-slate-200/60 rounded-[1.5rem] p-6 transition-all duration-300 hover:border-slate-300/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                        >
                            {/* Icon */}
                            <div className="mb-6">
                                <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 [&>svg]:stroke-slate-700 [&>svg]:transition-all [&>svg]:duration-300 group-hover:[&>svg]:stroke-white group-hover:[&>svg]:scale-110">
                                    {persona.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4 mb-6">
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                                    {persona.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    {persona.description}
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300 group-hover:text-blue-600">
                                <span>Explore</span>
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PersonaCTA;

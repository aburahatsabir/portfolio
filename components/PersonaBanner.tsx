import React from 'react';
import { motion } from 'framer-motion';
import { trackCustomEvent } from '../utils/analytics';
import SectionLabel from './shared/SectionLabel';

const PersonaBanner: React.FC = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="py-24 md:py-32 px-6 bg-white relative overflow-hidden"
        >

            <div className="max-w-7xl mx-auto relative">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-1.5 h-1.5 bg-blue-700"></div>
                                    <SectionLabel variant="secondary">Inquiry</SectionLabel>
                                </div>
                                <div className="h-px bg-slate-100 flex-1"></div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-5xl md:text-7xl font-[900] text-slate-900 tracking-tighter leading-[0.95]">
                                    Find Your <br />
                                    <span className="text-slate-400">Solution.</span>
                                </h3>
                                <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl">
                                    Strategic frameworks tailored for <span className="text-slate-900 font-bold">Founders, Operations Leaders,</span> and <span className="text-slate-900 font-bold">Executive Assistants.</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Action Node */}
                    <div className="lg:col-span-4 flex lg:justify-end">
                        <motion.a
                            href="/solutions"
                            onClick={() => trackCustomEvent('cta_click', {
                                event_category: 'CTA Engagement',
                                cta_text: 'Explore Role-Specific Solutions',
                                cta_location: 'persona_cta_banner'
                            })}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative inline-flex items-center gap-6 py-4 px-8 bg-slate-900 text-white rounded-lg overflow-hidden transition-all duration-500 hover:bg-blue-700 hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.3)] shadow-2xl"
                        >
                            <div className="relative flex flex-col items-start gap-0.5">
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Deployment</span>
                                <span className="text-sm font-black tracking-tight whitespace-nowrap">Explore Solutions</span>
                            </div>

                            <div className="relative w-8 h-8 flex items-center justify-center border border-white/10 rounded-full group-hover:border-white/30 transition-colors">
                                <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </motion.a>
                    </div>
                </div>

            </div>
        </motion.section>
    );
};

export default PersonaBanner;

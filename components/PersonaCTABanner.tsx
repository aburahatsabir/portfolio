import React from 'react';
import { motion } from 'framer-motion';
import { trackCustomEvent } from '../utils/analytics';

const PersonaCTABanner: React.FC = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-16 px-6"
        >
            <div className="max-w-4xl mx-auto">
                <a
                    href="#/for"
                    onClick={() => trackCustomEvent('cta_click', {
                        event_category: 'CTA Engagement',
                        cta_text: 'Explore Role-Specific Solutions',
                        cta_location: 'persona_cta_banner'
                    })}
                    className="group block p-8 bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-blue-100 hover:border-blue-700 rounded-2xl transition-all hover:shadow-lg"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 bg-blue-700 rounded-full animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                    Find Your Solution
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                                Explore Role-Specific Solutions
                            </h3>
                            <p className="text-slate-600 font-medium">
                                Tailored approaches for Executive Assistants, Operations Leaders, Founders, and Hiring Managers
                            </p>
                        </div>

                        <div className="flex items-center gap-3 px-6 py-3 bg-blue-700 text-white rounded-xl font-bold text-sm uppercase tracking-wider group-hover:bg-blue-800 transition-all whitespace-nowrap">
                            <span>View All</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </a>
            </div>
        </motion.section>
    );
};

export default PersonaCTABanner;

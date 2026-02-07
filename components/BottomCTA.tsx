import React from 'react';
import { motion } from 'framer-motion';
import { trackContactCTA } from '../utils/analytics';

interface BottomCTAProps {
    variant?: 'default' | 'case-study';
}

const BottomCTA: React.FC<BottomCTAProps> = ({ variant = 'default' }) => {
    const titles = {
        default: 'Ready to Reclaim Your Time?',
        'case-study': 'Get This for Your Team?'
    };

    const subtitles = {
        default: 'See exactly where you\'re losing hours to manual work',
        'case-study': 'Schedule a free 15-minute diagnostic call'
    };

    return (
        <section className="py-16 md:py-32 bg-white border-t border-slate-100 flex flex-col items-center justify-center text-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
            >
                <div className="flex flex-col items-center gap-4">
                    <span className="mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                        // NEXT_STEP
                    </span>
                    <h3 className="text-4xl md:text-6xl font-[900] tracking-tighter text-slate-950">
                        {titles[variant]}
                    </h3>
                    <p className="text-lg text-slate-600 font-medium max-w-md">
                        {subtitles[variant]}
                    </p>
                </div>

                <a
                    href="/contact"
                    onClick={() => trackContactCTA({
                        location: `bottom_cta_${variant}`,
                        conversionType: 'contact_form',
                        label: 'bottom_page_cta'
                    })}
                    className="group inline-flex items-center gap-4 px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-slate-900/10 active:scale-95"
                >
                    {variant === 'default' ? "Get Free Process Audit" : "Schedule Free 15-Min Call"}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </motion.div>
        </section>
    );
};

export default BottomCTA;

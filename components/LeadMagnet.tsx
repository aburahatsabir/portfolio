import React from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '../utils/analytics';

const LeadMagnet: React.FC = () => {
    const handleDownload = () => {
        // Track download event
        trackEvent({
            category: 'Lead Magnet',
            action: 'Download',
            label: 'Operational Readiness Audit',
            value: 1
        });

        // Create download link
        const link = document.createElement('a');
        link.href = '/resources/operational-readiness-audit.md';
        link.download = '10-Point-Operational-Readiness-Audit.md';
        link.click();
    };

    return (
        <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-[4rem] p-12 md:p-16 shadow-2xl"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest mb-8">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Free Resource
                    </div>

                    <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                        {/* Content */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
                                    Is Your Organization <span className="text-blue-700">Bleeding</span> $100K+/Year?
                                </h2>
                                <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                    Download the <strong>10-Point Operational Readiness Audit</strong> to identify hidden inefficiencies in 10 minutes.
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-4">
                                <p className="text-sm font-black uppercase tracking-widest text-slate-500">What You'll Discover:</p>
                                <ul className="space-y-3">
                                    {[
                                        'Quantify hours lost to manual processes',
                                        'Identify month-end close bottlenecks',
                                        'Assess data integrity and audit risk',
                                        'Calculate ROI of automation solutions',
                                        'Get a personalized 90-day roadmap'
                                    ].map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-slate-700 font-medium">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <motion.button
                                onClick={handleDownload}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full md:w-auto px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 group"
                            >
                                Download Free Audit
                                <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                </svg>
                            </motion.button>

                            <p className="text-xs text-slate-500 font-medium">
                                No email required. Instant download. Based on 6+ years of operational governance work.
                            </p>
                        </div>

                        {/* Visual */}
                        <div className="relative hidden md:block">
                            <div className="absolute -inset-4 bg-blue-700/10 blur-3xl rounded-full"></div>
                            <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-[3rem] p-8 border border-slate-300/50">
                                <div className="space-y-6">
                                    {/* Mock audit items */}
                                    {[
                                        { label: 'Process Automation', score: 2, color: 'red' },
                                        { label: 'Month-End Close', score: 3, color: 'yellow' },
                                        { label: 'Data Integrity', score: 4, color: 'emerald' },
                                        { label: 'Systems Integration', score: 2, color: 'red' },
                                        { label: 'Audit Readiness', score: 3, color: 'yellow' }
                                    ].map((item, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black uppercase tracking-wider text-slate-700">{item.label}</span>
                                                <span className={`text-xs font-black px-2 py-1 rounded ${item.color === 'red' ? 'bg-red-500/20 text-red-700' :
                                                    item.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-700' :
                                                        'bg-emerald-500/20 text-emerald-700'
                                                    }`}>
                                                    {item.score}/5
                                                </span>
                                            </div>
                                            <div className="h-2 bg-slate-300 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${item.color === 'red' ? 'bg-red-500' :
                                                        item.color === 'yellow' ? 'bg-yellow-500' :
                                                            'bg-emerald-500'
                                                        }`}
                                                    style={{ width: `${(item.score / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Total score */}
                                    <div className="pt-6 border-t border-slate-300">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-black uppercase tracking-wider text-slate-900">Total Score</span>
                                            <span className="text-3xl font-black text-slate-900">14/50</span>
                                        </div>
                                        <p className="text-xs text-red-600 font-bold mt-2">🚨 Critical Risk — Immediate Action Required</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LeadMagnet;

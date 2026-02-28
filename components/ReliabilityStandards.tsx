import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './shared/SectionLabel';

interface Principle {
    id: string;
    title: string;
    concept: string;
    description: string;
    benefit: string;
    icon: React.ReactNode;
}

const ReliabilityCard: React.FC<{ principle: Principle; index: number }> = ({ principle, index }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="group relative"
        >
            {/* Premium Card Container - Match Design System */}
            <div className="relative h-full bg-white border border-slate-200/60 rounded-2xl p-8 transition-all duration-300 hover:border-blue-200 hover:shadow-xl">

                {/* Icon - Larger, More Premium */}
                <div className="mb-6">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 [&>svg]:stroke-white [&>svg]:transition-transform [&>svg]:duration-300 group-hover:[&>svg]:scale-110">
                        {principle.icon}
                    </div>
                </div>

                {/* Content Stack */}
                <div className="space-y-4 mb-6">
                    {/* Eyebrow Label */}
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] leading-none">
                        {principle.concept}
                    </p>

                    {/* Title - Match System Typography */}
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                        {principle.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {principle.description}
                    </p>
                </div>

                {/* Outcome Footer */}
                <div className="pt-5 border-t border-slate-100">
                    <div className="space-y-1">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                            Outcome
                        </p>
                        <p className="text-xs font-semibold text-slate-900">
                            {principle.benefit}
                        </p>
                    </div>
                </div>

                {/* Subtle Corner Indicator */}
                <div className="absolute top-5 right-5 w-1 h-1 rounded-full bg-slate-200 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-blue-500" />
            </div>
        </motion.article>
    );
};

const ReliabilityStandards: React.FC = () => {
    const principles: Principle[] = [
        {
            id: 'MAN-01',
            title: 'Repeatable Workflows',
            concept: 'Reliable Process Design',
            description: 'Core workflows are built to run consistently, even if repeated multiple times. This prevents duplicate actions and keeps records accurate.',
            benefit: 'Accurate Records and Outputs',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        },
        {
            id: 'MAN-02',
            title: 'Fallback and Recovery',
            concept: 'Continuity Planning',
            description: 'When a tool or vendor is unavailable, work is safely paused and resumed through fallback paths so business operations keep moving.',
            benefit: 'Stable Day-to-Day Delivery',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        },
        {
            id: 'MAN-03',
            title: 'Proactive Monitoring',
            concept: 'Operational Health Checks',
            description: 'Key workflow signals are monitored regularly to catch delays, error patterns, and bottlenecks before they affect leadership decisions.',
            benefit: 'Fewer Escalations and Surprises',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" /></svg>
        },
        {
            id: 'MAN-04',
            title: 'Version Control',
            concept: 'Documented Governance',
            description: 'Policies, workflows, and logic updates are documented and tracked. Teams can review changes, restore versions, and pass audits with confidence.',
            benefit: 'Audit-Ready Confidence',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        }
    ];

    return (
        <section id="governance" className="py-16 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header - Match Design System Pattern */}
                <div className="max-w-3xl mb-20">
                    {/* Section Label */}
                    <div className="flex items-center gap-4 mb-8">
                        <SectionLabel>Reliability Framework</SectionLabel>
                        <div className="h-px bg-slate-100 flex-1" />
                    </div>

                    {/* Title - Match System Typography */}
                    <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-900 mb-8">
                        Built For <br />
                        <span className="text-slate-400">Reliability.</span>
                    </h2>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                        A practical standard for corporate administration: workflows stay dependable, measurable, and recoverable as teams grow and responsibilities expand.
                    </p>
                </div>

                {/* Cards Grid - Match System Spacing */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {principles.map((p, idx) => (
                        <ReliabilityCard key={p.id} principle={p} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReliabilityStandards;

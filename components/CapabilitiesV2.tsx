import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './shared/SectionLabel';

interface Capability {
    title: string;
    desc: string;
    icon: React.ReactNode;
    tags: string[];
    size: 'large' | 'medium' | 'small';
    color: string;
    stats?: { label: string; value: string };
}

const BentoCard: React.FC<{ capability: Capability; index: number }> = ({ capability, index }) => {
    const isLarge = capability.size === 'large';
    const isMedium = capability.size === 'medium';

    const moduleIds = ['ARCH-25', 'AUTO-09', 'REV-14', 'EXEC-04'];
    const statusCodes = ['[SECURE]', '[STABLE]', '[ACTIVE]', '[LOCKED]'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
            }}
            className={`
        group relative overflow-hidden rounded-[2.5rem] border border-slate-200/50 bg-white p-10 lg:p-12
        transition-all duration-700 hover:shadow-[0_80px_120px_-20px_rgba(15,23,42,0.15)] hover:border-blue-600/30
        ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
        ${isMedium ? 'md:col-span-2 md:row-span-1' : ''}
        ${!isLarge && !isMedium ? 'md:col-span-1 md:row-span-1' : ''}
        flex flex-col justify-between min-h-[380px] md:min-h-0
      `}
        >
            {/* Alignment Grid Overlay (Decorative) */}
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                </div>
            </div>

            <div className="relative z-10 space-y-12">
                {/* Module Metadata Header */}
                <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                    <div className="flex flex-col">
                        <span className="mono text-[8px] font-black text-slate-400 uppercase tracking-[0.25em] leading-none mb-1.5">Module_ID</span>
                        <span className="mono text-[12px] font-black text-slate-900 leading-none">{moduleIds[index]}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="mono text-[8px] font-black text-slate-400 uppercase tracking-[0.25em] leading-none mb-1.5">System_Status</span>
                        <span className="mono text-[12px] font-black text-blue-600 leading-none tracking-tighter">{statusCodes[index]}</span>
                    </div>
                </div>

                {/* Icon & Label */}
                <div className="space-y-8">
                    <div className={`
                w-16 h-16 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-2xl 
                group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500 border border-white/10
            `}>
                        {capability.icon}
                    </div>

                    <div className="space-y-5">
                        <h3 className={`
                    font-[900] tracking-tightest leading-[1.05] text-slate-950 group-hover:text-blue-700 transition-colors
                    ${isLarge ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}
                `}>
                            {capability.title}
                        </h3>
                        <p className={`
                    font-medium text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors
                    ${isLarge ? 'text-xl md:text-2xl' : 'text-base opacity-90'}
                `}>
                            {capability.desc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Details */}
            <div className="relative z-10 mt-12 pt-10 border-t border-slate-50 flex items-center justify-between">
                <div className="flex gap-2.5">
                    {capability.tags.slice(0, isLarge ? 3 : 2).map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-lg text-[9px] font-black mono uppercase tracking-tight bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-slate-100/50 group-hover:border-blue-100">
                            {tag}
                        </span>
                    ))}
                </div>

                {isLarge && capability.stats ? (
                    <div className="flex flex-col items-end">
                        <span className="mono text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{capability.stats.label}</span>
                        <span className="text-2xl font-black text-slate-950 tracking-tightest">{capability.stats.value}</span>
                    </div>
                ) : (
                    <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Industrial Shimmer & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-slate-50/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-1000" />
        </motion.div>
    );
};

const CapabilitiesV2: React.FC = () => {
    const capabilities: Capability[] = [
        {
            title: 'Systems Architecture & Governance',
            desc: 'I architect industrial-grade operational frameworks with precise data governance and auditability, ensuring administrative sovereignty for growing organizations.',
            size: 'large',
            color: 'blue',
            stats: { label: 'Audit_Ready', value: '100.0%' },
            tags: ['ARCHITECTURE', 'GOVERNANCE', 'SECURITY'],
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            title: 'AI-Augmented Automation',
            desc: 'Reclaiming high-value time by deploying bespoke AI agents and automation scripts that handle complex back-office workflows with zero latency and high precision.',
            size: 'medium',
            color: 'slate',
            tags: ['AI_AGENTS', 'WORKFLOW'],
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: 'Revenue Operations',
            desc: 'Financial tracking systems that seal revenue leaks and provide real-time visibility into complex commission structures.',
            size: 'small',
            color: 'blue',
            tags: ['REV_OPS', 'FINTECH'],
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            title: 'Executive Infrastructure',
            desc: 'Sophisticated support systems designed for the C-Suite, managing confidential board-level operations with absolute discretion.',
            size: 'small',
            color: 'slate',
            tags: ['C_SUITE', 'TRUST'],
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

    return (
        <section id="capabilities" className="py-32 md:py-64 bg-white relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[1000px] h-[1000px] bg-slate-50 rounded-full blur-[140px] opacity-60 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
                    <div className="max-w-5xl w-full space-y-10">
                        <div className="flex items-center gap-6">
                            <SectionLabel>Strategic Capabilities</SectionLabel>
                            <div className="h-px bg-slate-100 flex-1 opacity-50"></div>
                        </div>

                        <h2 className="text-5xl md:text-[9rem] font-[900] tracking-tightest leading-[0.82] text-slate-950 uppercase">
                            Operational <br />
                            <span className="text-slate-100">Sovereignty.</span>
                        </h2>

                        <p className="text-xl md:text-3xl text-slate-500 font-medium leading-relaxed max-w-4xl tracking-tight">
                            I architect high-fidelity systems that bridge the gap between strategic intent and operational reality, delivering military-grade precision to modern executive teams.
                        </p>
                    </div>

                    <div className="hidden lg:flex flex-col items-end gap-4 shrink-0">
                        <div className="px-7 py-5 rounded-3xl bg-slate-950 text-white flex items-center gap-5 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.3)] border border-white/5">
                            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                            <div className="flex flex-col">
                                <span className="mono text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] leading-none mb-1">Active_Governance</span>
                                <span className="text-xl font-black tracking-tighter leading-none">STATUS: OPERATIONAL</span>
                            </div>
                        </div>
                        <div className="mono text-[10px] font-black text-slate-300 tracking-[0.4em] uppercase">Ref_ID: 2026.EXEC.AUTH</div>
                    </div>
                </div>

                {/* Mathematically Balanced 4-column Bento Grid (4x2 units) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12">
                    {capabilities.map((cap, idx) => (
                        <BentoCard key={cap.title} capability={cap} index={idx} />
                    ))}
                </div>
            </div>

            <style>{`
        .tracking-tightest {
          letter-spacing: -0.06em;
        }
      `}</style>
        </section>
    );
};

export default CapabilitiesV2;

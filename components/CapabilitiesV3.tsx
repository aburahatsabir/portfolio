import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './shared/SectionLabel';

interface Capability {
    title: string;
    desc: string;
    icon: React.ReactNode;
    tags: string[];
    size: 'large' | 'medium' | 'small';
    id: string;
    status: string;
}

const CapabilityCard: React.FC<{ capability: Capability; index: number }> = ({ capability, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1]
            }}
            className="group relative overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white p-6 transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] hover:border-blue-200 flex flex-col justify-between"
        >
            <div className="space-y-5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500 [&>svg]:group-hover:stroke-white">
                    {capability.icon}
                </div>

                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-700 transition-colors">
                        {capability.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium group-hover:text-slate-600 transition-colors">
                        {capability.desc}
                    </p>
                </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-50 flex flex-wrap gap-2">
                {capability.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-[8px] font-bold mono uppercase bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Hover Alignment Indicator */}
            <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-blue-500/20 rounded-full" />
            </div>
        </motion.div>
    );
};

const CapabilitiesV3: React.FC = () => {
    const capabilities: Capability[] = [
        {
            id: 'ADMIN-ARCH',
            status: 'STABLE',
            title: 'Administrative Operations Architecture',
            desc: 'Designing the "Executive Engine"—from board-level coordination to confidential workflow management, ensuring your administrative infrastructure matches institutional standards.',
            size: 'large',
            tags: ['Executive Systems', 'Strategic Support'],
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: 'WORK-AUTO',
            status: 'ACTIVE',
            title: 'High-Reliability Workflow Automation',
            desc: 'Eliminating manual bottlenecks through custom automation (Excel, Google Sheets, Apps Script). I build systems that process data with machine precision while preserving human judgment.',
            size: 'medium',
            tags: ['Process Automation', 'Scripting'],
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            id: 'REC-OPS',
            status: 'MONITOR',
            title: 'Recovery Operations & Financial Controls',
            desc: 'Exposing hidden capital leakage through precision tracking—custom dashboards for revenue recovery, multi-currency reconciliation, and expense governance.',
            size: 'small',
            tags: ['Revenue Recovery', 'Expense Control'],
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            id: 'GOV-KNOW',
            status: 'SECURE',
            title: 'Institutional Governance & Knowledge',
            desc: 'Safeguarding your business through documented standards and reliable SOPs. I ensure that institutional knowledge survives personnel changes and audit requirements.',
            size: 'small',
            tags: ['SOP Architecture', 'Governance'],
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        }
    ];

    return (
        <section id="capabilities" className="py-24 md:py-32 bg-white border-t border-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                    <div className="max-w-2xl space-y-6">
                        <div className="flex items-center gap-4">
                            <SectionLabel>Strategic Capabilities</SectionLabel>
                            <div className="h-px bg-slate-100 flex-1" />
                        </div>
                        <h1 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-900">
                            Operational <br />
                            <span className="text-slate-400">Excellence.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl pt-2">
                            I architect AI-augmented systems that merge strategic design with advanced automation—transforming complex operations into lean, self-governing assets.
                        </p>


                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {capabilities.map((cap, idx) => (
                        <CapabilityCard key={cap.title} capability={cap} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CapabilitiesV3;

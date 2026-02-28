import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './shared/SectionLabel';

interface Capability {
    title: string;
    desc: string;
    icon: React.ReactNode;
    tags: string[];
}

const CapabilityCard: React.FC<{ capability: Capability; index: number }> = ({ capability, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="group relative"
        >
            {/* Card Container */}
            <div className="relative h-full bg-white border border-slate-200/60 rounded-2xl p-8 transition-all duration-300 hover:border-slate-300/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

                {/* Icon */}
                <div className="mb-6">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-blue-200 [&>svg]:stroke-slate-400 [&>svg]:transition-colors [&>svg]:duration-500 group-hover:[&>svg]:stroke-blue-600">
                        {capability.icon}
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-6">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                        {capability.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {capability.desc}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                    {capability.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-50 rounded transition-colors duration-300 group-hover:text-slate-700 group-hover:bg-slate-100"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Subtle hover indicator */}
                <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-slate-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
        </motion.div>
    );
};

const CapabilitiesPremium: React.FC = () => {
    const capabilities: Capability[] = [
        {
            title: 'Executive Operations Architecture',
            desc: 'Building the "Office of the CEO" as a scalable operating system—from board preparation to confidential workflows, ensuring executive infrastructure matches business standards.',
            tags: ['C-Suite Systems', 'Confidential Ops'],
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: 'AI-Augmented Process Automation',
            desc: 'Combining hard-coded logic (VBA, Apps Script) with AI copilots to automate complex workflows—using prompt playbooks and guardrails to maintain judgment at machine speed.',
            tags: ['AI Copilots', 'Prompt Engineering'],
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: 'Revenue Operations & Financial Intelligence',
            desc: 'Building precision tracking systems that expose financial blind spots—commissions, multi-currency reconciliation, and revenue recovery to prevent capital leakage.',
            tags: ['Revenue Ops', 'Compensation'],
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            title: 'Systems Governance & Knowledge Continuity',
            desc: 'Creating audit-ready environments with explicit ownership and documented standards—SOPs, compliance rules, that ensure systems survive personnel changes.',
            tags: ['SOP Architecture', 'Compliance'],
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        }
    ];

    return (
        <section id="capabilities" className="py-16 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="max-w-3xl mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <SectionLabel>Strategic Capabilities</SectionLabel>
                        <div className="h-px bg-slate-100 flex-1" />
                    </div>

                    <h1 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-900 mb-8">
                        Operational <br />
                        <span className="text-slate-400">Excellence.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                        I architect AI-augmented systems that merge strategic design with advanced automation—transforming complex operations into lean, self-governing assets.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {capabilities.map((cap, idx) => (
                        <CapabilityCard key={cap.title} capability={cap} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CapabilitiesPremium;

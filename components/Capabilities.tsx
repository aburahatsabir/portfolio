
import React from 'react';
import { motion } from 'framer-motion';
import { TOOLS_STACK } from '../constants';
import SectionLabel from './shared/SectionLabel';

const CapabilityModule: React.FC<{
  title: string;
  desc: string;
  icon: React.ReactNode;
  index: number;
  tags: string[];
}> = ({ title, desc, icon, index, tags }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] hover:border-blue-600/40 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(15,23,42,0.06)] overflow-hidden"
    >
      {/* Subtle Internal Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite] pointer-events-none" />

      <div className="p-10 md:p-12 flex-1 flex flex-col">
        {/* Hardware Socket Icon */}
        <div className="relative mb-10 w-16 h-16">
          <div className="absolute inset-0 bg-slate-100 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
          <div className="relative w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-blue-600 transition-all duration-500 border border-white/10">
            {icon}
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <h4 className="text-2xl font-[900] text-slate-900 tracking-tighter leading-[1.1] group-hover:text-blue-700 transition-colors">
            {title}
          </h4>
          <p className="text-lg text-slate-500 font-medium leading-relaxed group-hover:text-slate-600 transition-colors">
            {desc}
          </p>
        </div>
      </div>

      {/* Simplified Tag Matrix Footer */}
      <div className="px-10 py-8 bg-slate-50/50 rounded-b-[2.5rem] flex flex-wrap gap-2.5 group-hover:bg-blue-50/30 transition-all duration-500 border-t border-slate-50">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 bg-white border border-slate-200/50 rounded-xl mono text-[9px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-blue-700 group-hover:border-blue-200 transition-all"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Capabilities: React.FC = () => {
  const corePrinciples = [
    {
      title: 'Data Systems & Automation',
      desc: 'Architecting high-concurrency Excel VBA engines and cloud-native Apps Script workers to neutralize operational latency.',
      tags: ['VBA', 'APPS_SCRIPT', 'ETL_LOGIC'],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: 'Executive Infrastructure',
      desc: 'Orchestrating C-suite operations through deterministic travel logistics and high-fidelity institutional governance.',
      tags: ['C-SUITE', 'LOGISTICS', 'GOVERNANCE'],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Deterministic Workspaces',
      desc: 'Governance of Microsoft 365 and Google Workspace clusters to build zero-friction, sovereign admin environments.',
      tags: ['SECURITY', 'M365', 'WORKSPACE'],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Technical Documentation',
      desc: 'Engineering high-integrity LaTeX documentation and TikZ schematics for professional institutional handovers.',
      tags: ['LATEX', 'TIKZ', 'SCHEMA'],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    }
  ];

  return (
    <section id="capabilities" className="py-32 md:py-48 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
          <div className="max-w-4xl w-full space-y-8">
            <div className="flex items-center gap-4">
              <SectionLabel>Core Expertise</SectionLabel>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>

            <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-950">
              Operational <br />
              <span className="text-slate-400">Modalities.</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl pt-2">
              I merge administrative precision with clinical technical automation to build the logic layers that scale without operational debt.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-4 shrink-0 pb-2">
            <div className="flex flex-col items-end gap-1">
              <span className="mono text-[9px] font-black text-slate-400 uppercase tracking-widest">Reliability Index</span>
              <span className="text-5xl font-black text-slate-950 tracking-tighter leading-none">99.8%</span>
            </div>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-8 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: i < 4 ? '100%' : '60%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-blue-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {corePrinciples.map((item, idx) => (
            <CapabilityModule
              key={item.title}
              {...item}
              index={idx}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Capabilities;

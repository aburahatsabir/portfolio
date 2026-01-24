
import React from 'react';
import { motion } from 'framer-motion';

interface Pillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  kpi: string;
  kpiLabel: string;
  icon: React.ReactNode;
  metrics: string[];
}

const RoiCard: React.FC<{ pillar: Pillar; index: number }> = ({ pillar, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] p-10 md:p-12 hover:border-blue-600/30 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.05)] transition-all duration-700 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Identity & Indicator */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500 shadow-sm">
              {pillar.icon}
            </div>
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                {pillar.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-6 flex-1">
          <h4 className="text-3xl font-[900] text-slate-900 tracking-tighter leading-none group-hover:text-blue-700 transition-colors">
            {pillar.title}
          </h4>
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
            {pillar.description}
          </p>

          <div className="pt-6 space-y-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Mechanism Inventory</p>
            {pillar.metrics.map((metric) => (
              <div key={metric} className="flex items-center gap-3 text-xs font-bold text-slate-700 bg-slate-50/50 p-3 rounded-xl border border-slate-50 group-hover:bg-white group-hover:border-slate-100 transition-all">
                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                {metric}
              </div>
            ))}
          </div>
        </div>

        {/* Quantified Result Footer */}
        <div className="mt-12 pt-8 border-t border-slate-50 flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{pillar.kpiLabel}</p>
            <p className="text-5xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">
              {pillar.kpi}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const AdministrativeRoiFramework: React.FC = () => {
  const pillars: Pillar[] = [
    {
      id: 'vendor',
      index: '01',
      title: 'Vendor Consolidation',
      subtitle: 'Capital Reclamation',
      description: 'Systematically auditing SaaS redundancy to eliminate overlapping functionality and unauthorized "Ghost Licenses."',
      kpi: '25%',
      kpiLabel: 'Avg. Annual SaaS Savings',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      metrics: ['License Audit Automation', 'Feature Overlap Mapping', 'Contract Renewal Governance']
    },
    {
      id: 'latency',
      index: '02',
      title: 'Latency Reduction',
      subtitle: 'Process Velocity',
      description: 'Removing "Human-in-the-loop" friction from core business processes through deterministic VBA and cloud script engines.',
      kpi: '85%',
      kpiLabel: 'Process Throughput Gain',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      metrics: ['Self-Service Provisioning', 'Automated Financial Recs', 'Zero-Manual Onboarding']
    },
    {
      id: 'risk',
      index: '03',
      title: 'Risk Mitigation',
      subtitle: 'Compliance Sovereignty',
      description: 'Hardening institutional governance through Zero-Trust IAM and automated audit trails, transforming compliance into a passive system.',
      kpi: '0.0',
      kpiLabel: 'Critical Audit Deficiencies',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-.382-3.016z" /></svg>,
      metrics: ['Least-Privilege Enforcement', 'Automated Offboarding', 'Real-time Audit Logging']
    }
  ];

  return (
    <section id="roi-framework" className="py-32 md:py-48 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Standardized Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
          <div className="max-w-4xl w-full space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Performance Metrics</span>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-950">
              Strategic <br />
              <span className="text-slate-400">ROI.</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl pt-2">
              I don't just "administer"; I engineer profit. My framework is built on three pillars that reclaim capital and mitigate enterprise risk through clinical precision.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-6 shrink-0 pb-2">
             <div className="flex flex-col items-end gap-1">
                <span className="mono text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Asset Yield</span>
                <span className="text-5xl font-black text-slate-950 tracking-tighter leading-none">$2.4M+</span>
             </div>
             <div className="px-6 py-3 bg-blue-600 rounded-xl shadow-xl shadow-blue-200">
                <p className="text-[9px] font-black text-blue-100 uppercase tracking-widest mb-1 text-center">Efficiency Delta</p>
                <p className="text-2xl font-black text-white leading-none">400%</p>
             </div>
          </div>
        </div>

        {/* Global ROI Dashboard Summary Bar */}
        <div className="mb-12 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 grid md:grid-cols-4 gap-8">
           {[
             { label: 'Reclaimed Hours', val: '12,400+', unit: 'Hrs/Yr', color: 'text-blue-600' },
             { label: 'Error Incidence', val: '0.00', unit: '% Rate', color: 'text-emerald-500' },
             { label: 'Compliance Index', val: '100', unit: '/ 100', color: 'text-slate-900' },
             { label: 'Process Velocity', val: '12.4x', unit: 'Increase', color: 'text-blue-600' },
           ].map(stat => (
             <div key={stat.label} className="space-y-1 text-center md:text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                   <span className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.val}</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase">{stat.unit}</span>
                </div>
             </div>
           ))}
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <RoiCard key={pillar.id} pillar={pillar} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdministrativeRoiFramework;

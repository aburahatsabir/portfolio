
import React from 'react';
import { motion } from 'framer-motion';

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] p-10 md:p-12 hover:border-blue-600/30 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.05)] transition-all duration-700 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Header: ID & Meta */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500 shadow-lg">
              {principle.icon}
            </div>
            <span className="mono text-[10px] font-black text-slate-400 tracking-widest uppercase">
              {principle.id} // SECURE
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Active node</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-4 flex-1">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">{principle.concept}</p>
          <h4 className="text-2xl md:text-3xl font-[900] text-slate-900 tracking-tighter leading-tight group-hover:text-blue-700 transition-colors">
            {principle.title}
          </h4>
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
            {principle.description}
          </p>
        </div>

        {/* Footer: Quantified ROI */}
        <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Institutional Asset</p>
            <p className="text-sm font-black text-slate-900 tracking-tight">{principle.benefit}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ReliabilityStandards: React.FC = () => {
  const principles: Principle[] = [
    {
      id: 'MAN-01',
      title: 'Idempotency Guarantees',
      concept: 'Atomic Transaction Logic',
      description: 'Eliminating partial state failures by ensuring every automation is natively idempotent. Retries are safe by design—zero duplicates, zero revenue leakage.',
      benefit: 'Immutable Financial Integrity',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
    },
    {
      id: 'MAN-02',
      title: 'Circuit Breaker Patterns',
      concept: 'Cascading Failure Mitigation',
      description: 'Real-time monitoring of upstream API health. If a vendor platform degrades, circuit breakers trip instantly to park data in a Dead Letter Queue (DLQ).',
      benefit: 'Systemic Outage Containment',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    },
    {
      id: 'MAN-03',
      title: 'Four Golden Signals',
      concept: 'Observability Telemetry',
      description: 'Monitoring Latency, Traffic, Errors, and Saturation. Detecting architectural rot and rate-limiting bottlenecks weeks before they impact the P&L.',
      benefit: 'Proactive Operational Oversight',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" /></svg>
    },
    {
      id: 'MAN-04',
      title: 'Governance-as-Code',
      concept: 'Versioned Administrative State',
      description: 'Treating operations as a codebase with Git-based version control. Allowing point-in-time recovery and absolute audit transparency during due diligence.',
      benefit: 'Auditable Sovereign Assets',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    }
  ];

  return (
    <section id="governance" className="py-32 md:py-48 bg-white relative overflow-hidden">
      {/* Sophisticated Background Element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Standardized Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
          <div className="max-w-4xl w-full space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Reliability Protocol</span>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>

            <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-950">
              The Reliability <br />
              <span className="text-slate-400">Manifesto.</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl pt-2">
              Engineering administrative infrastructure with the same clinical rigor reserved for high-frequency trading. Stability is not a target—it is the baseline.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-4 shrink-0 pb-2">
            <div className="flex flex-col items-end gap-1">
              <span className="mono text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol Uptime</span>
              <span className="text-5xl font-black text-slate-950 tracking-tighter leading-none">99.99%</span>
            </div>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-8 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: i < 4 ? '100%' : '90%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                    className="w-full bg-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modular Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {principles.map((p, idx) => (
            <ReliabilityCard key={p.id} principle={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReliabilityStandards;

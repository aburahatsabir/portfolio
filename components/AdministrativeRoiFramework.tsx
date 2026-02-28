
import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './shared/SectionLabel';

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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col h-full bg-white border border-slate-200/60 rounded-2xl p-8 transition-all duration-500 hover:border-slate-300/80 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.04)] overflow-hidden"
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Header Stack */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 [&>svg]:text-slate-400 group-hover:bg-white group-hover:text-blue-600 group-hover:[&>svg]:text-blue-600 group-hover:border-blue-200 transition-all duration-500">
            {pillar.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] leading-none mb-1.5">
              {pillar.id.replace('-', ' ')}
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              {pillar.subtitle}
            </span>
          </div>
        </div>

        {/* Core Content */}
        <div className="flex-1 space-y-5 mb-8">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
            {pillar.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {pillar.description}
          </p>
        </div>

        {/* Minimalist Multi-Metric */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between mb-8">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
              Performance Yield
            </p>
            <p className="text-sm font-bold text-slate-900">
              {pillar.kpiLabel}
            </p>
          </div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            {pillar.kpi}
          </div>
        </div>

        {/* Operational Components List */}
        <div className="pt-6 border-t border-slate-100">
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-4">
            Operational Components
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            {pillar.metrics.map((metric) => (
              <div key={metric} className="flex items-center gap-3 group/item">
                <div className="w-1 h-1 rounded-full bg-slate-200 group-hover/item:bg-blue-500 transition-all" />
                <span className="text-[11px] font-bold text-slate-500 group-hover/item:text-slate-900 transition-colors">
                  {metric}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle hover indicator */}
      <div className="absolute top-6 right-6 w-1 h-1 rounded-full bg-slate-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.article>
  );
};

const AdministrativeRoiFramework: React.FC = () => {
  const pillars: Pillar[] = [
    {
      id: 'financial-yield',
      index: '01',
      title: 'Revenue Recovery',
      subtitle: 'Capital Recovery Yield',
      description: 'Transforming fragmented processes into high-yield assets. I stop revenue leakage and reclaim lost capital through forensic administrative oversight and structural cost avoidance.',
      kpi: '15%',
      kpiLabel: 'Recovered Revenue Leakage',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      metrics: ['Revenue Leakage Recovery', 'Cost Avoidance Modeling', 'Asset Multiplier Yield', 'Multi-currency reconciliation clarity']
    },
    {
      id: 'decision-velocity',
      index: '02',
      title: 'Executive Velocity',
      subtitle: 'Leadership Time Recovery',
      description: 'Eliminating the "Administrative Noise" that slows down the C-Suite. I reclaim hundreds of hours annually for strategic decision-making, business growth, and executive focus.',
      kpi: '450+',
      kpiLabel: 'Hrs Reclaimed/Yr',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      metrics: ['Calendar conflict reduction', 'Board-prep turnaround discipline', 'Decision-Support Clarity', 'Silent-Reporting Systems']
    },
    {
      id: 'cycle-compression',
      index: '03',
      title: 'Process Acceleration',
      subtitle: 'Structured Pipelines',
      description: 'Manual administrative workflows are redesigned into structured execution pipelines, cutting processing delays while improving consistency, control, and operational precision.',
      kpi: '5D→2H',
      kpiLabel: 'Processing Cycle',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      metrics: ['Payroll cycle redesign', 'Invoicing workflow automation', 'Approval queue reduction', 'Knowledge Transfer Velocity']
    }
  ];

  return (
    <section id="roi-framework" className="py-32 md:py-48 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Standardized Section Header */}
        <div className="max-w-4xl w-full space-y-8 mb-24">
          <div className="flex items-center gap-4">
            <SectionLabel>Performance Metrics</SectionLabel>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>

          <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-950">
            Strategic <br />
            <span className="text-slate-400">ROI.</span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl pt-2">
            I architect institutional-grade operations infrastructure that transforms administrative overhead into strategic leverage—optimizing financial capital and executive time.
          </p>
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

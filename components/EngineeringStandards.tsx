
import React from 'react';
import { motion } from 'framer-motion';
import { ENGINEERING_STANDARDS } from '../constants';

const EngineeringStandards: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'idempotency':
        return (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'dlq':
        return (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      case 'circuit':
        return (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'security':
        return (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-.382-3.016z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="engineering-standards" className="py-40 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none select-none">
        <div className="text-[150px] font-black text-slate-900 leading-none rotate-90 origin-top-right uppercase">
          Quality Standards
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20 border-b border-slate-100 pb-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-slate-900 text-blue-400 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Institutional Quality Baseline
            </div>
            <h2 className="text-4xl md:text-6xl font-[900] tracking-tighter text-slate-900 leading-[0.95]">
              Engineering <br />
              <span className="text-blue-600">Standards.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Applying the same architectural rigor to business operations usually reserved for high-traffic financial software. Hardened infrastructure designed for scale.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Audit Registry</p>
             <p className="font-mono text-[11px] text-slate-400 bg-slate-50 px-3 py-1 rounded-md border border-slate-100 uppercase tracking-tighter">Certified Infrastructure</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGINEERING_STANDARDS.map((std, idx) => (
            <motion.div
              key={std.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {getIcon(std.icon)}
                </div>
                <span className="font-mono text-[9px] text-slate-300 font-black group-hover:text-blue-400 transition-colors">
                  QA_0{idx + 1}
                </span>
              </div>
              
              <div className="space-y-4 flex-1">
                <div>
                  <h4 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {std.title}
                  </h4>
                  <p className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 mt-1">
                    {std.technicalTerm}
                  </p>
                </div>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {std.description}
                </p>
              </div>

              <div className="pt-6 mt-8 border-t border-slate-200/60">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Executive Benefit</p>
                </div>
                <p className="text-xs font-black text-slate-900 leading-snug">
                  {std.executiveBenefit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringStandards;

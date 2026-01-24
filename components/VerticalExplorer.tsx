
import React from 'react';
import { motion } from 'framer-motion';
import { INDUSTRY_BLUEPRINTS } from '../constants';

const BlueprintCard: React.FC<{ blueprint: any; index: number }> = ({ blueprint, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="group relative flex flex-col h-full bg-white border border-slate-100 rounded-[3rem] p-10 md:p-14 hover:border-blue-600/30 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-700 overflow-hidden"
    >
      {/* Background Indexing */}
      <div className="absolute -top-6 -right-6 text-[140px] font-black text-slate-900 opacity-[0.02] pointer-events-none select-none group-hover:opacity-[0.04] transition-opacity">
        0{index + 1}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Logic */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-slate-900 text-blue-400 rounded-lg text-[9px] font-black uppercase tracking-[0.3em] border border-slate-800">
              PRTCL_ID: {blueprint.id.toUpperCase()}
            </span>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>
          <h4 className="text-4xl font-[900] tracking-tighter text-slate-900 leading-none group-hover:text-blue-700 transition-colors">
            {blueprint.industry}.
          </h4>
        </header>

        {/* Story Content */}
        <div className="flex-1 space-y-10">
          <div className="space-y-4">
             <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">The Friction</h5>
             <p className="text-lg text-slate-600 font-medium leading-relaxed italic border-l-2 border-slate-100 pl-6">
               "{blueprint.nightmareScenario}"
             </p>
          </div>

          <div className="space-y-4">
             <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">The Architecture</h5>
             <p className="text-xl font-black text-slate-900 leading-tight">
               {blueprint.title}
             </p>
             <p className="text-base text-slate-500 font-medium leading-relaxed">
               {blueprint.description}
             </p>
          </div>

          <div className="pt-8 grid gap-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Compliance Nodes</h5>
            <div className="flex flex-wrap gap-2">
              {blueprint.compliance.map((c: string) => (
                <span key={c} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 transition-all uppercase tracking-tighter">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Outcome Footer */}
        <footer className="mt-16 pt-10 border-t border-slate-50 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Remediation Status</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-sm font-black text-slate-900">Governed</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.hash = '#/contact'}
            className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 shadow-xl"
            aria-label={`Inquire about ${blueprint.industry} solutions`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </footer>
      </div>
    </motion.div>
  );
};

const VerticalExplorer: React.FC = () => {
  return (
    <section id="verticals" className="py-40 bg-white relative overflow-hidden">
      {/* Structural Background Lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px)', backgroundSize: '25% 100%' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600">Sector Sovereignty</span>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-950">
              Industry <br />
              <span className="text-slate-400">Outcomes.</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              I deploy clinical architectures designed for the specific regulatory and operational pressures of these primary sectors.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2 shrink-0 pb-4">
             <span className="mono text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Models</span>
             <div className="flex gap-1.5">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="w-8 h-1.5 bg-blue-600 rounded-full"></div>
               ))}
             </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {INDUSTRY_BLUEPRINTS.map((blueprint, idx) => (
            <BlueprintCard 
              key={blueprint.id} 
              blueprint={blueprint} 
              index={idx} 
            />
          ))}
        </div>

        {/* Technical Transference Note */}
        <div className="mt-24 p-12 bg-slate-50 border border-slate-100 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-12 group">
           <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <div className="space-y-1">
                 <h5 className="text-xl font-black text-slate-900 tracking-tight">Custom Architectural Design.</h5>
                 <p className="text-slate-500 font-medium">Don't see your vertical? I build tailored logic layers for emerging organizational sectors.</p>
              </div>
           </div>
           <button 
             onClick={() => window.location.hash = '#/contact'}
             className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 whitespace-nowrap"
           >
             Request Sector Audit
           </button>
        </div>
      </div>
    </section>
  );
};

export default VerticalExplorer;

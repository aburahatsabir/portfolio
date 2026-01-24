
import React from 'react';
import { motion } from 'framer-motion';

const GlobalInfrastructure: React.FC = () => {
  const regions = [
    { name: 'US-EAST-1', status: 'Optimal', latency: '12ms', color: 'bg-emerald-500' },
    { name: 'EU-CENTRAL-1', status: 'Optimal', latency: '24ms', color: 'bg-emerald-500' },
    { name: 'AP-SOUTHEAST-2', status: 'Maintenance', latency: '82ms', color: 'bg-amber-500' },
    { name: 'SA-EAST-1', status: 'Optimal', latency: '44ms', color: 'bg-emerald-500' },
  ];

  return (
    <section className="py-40 bg-slate-950 relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-24 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500 mb-8">Operational Scale</h2>
              <h3 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">Global <br />Remediation.</h3>
              <p className="mt-8 text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
                Architecting systems that transcend borders. I deploy high-availability clusters designed for jurisdictional sovereignty and multi-region failover.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
               <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] space-y-6 group hover:border-blue-500/50 transition-all">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Infrastructure Nodes</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">142</span>
                    <span className="text-blue-500 font-black text-xs uppercase tracking-widest">Active Pods</span>
                  </div>
                  <div className="flex gap-1.5 pt-4">
                     {Array.from({ length: 12 }).map((_, i) => (
                       <motion.div 
                        key={i} 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 h-6 bg-blue-500/20 rounded-full border border-blue-500/10" 
                       />
                     ))}
                  </div>
               </div>
               <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] space-y-6 group hover:border-emerald-500/50 transition-all">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Uptime Reliability</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">99.9</span>
                    <span className="text-emerald-500 font-black text-xs uppercase tracking-widest">% Guaranteed</span>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                     <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '99.9%' }}
                          transition={{ duration: 2, ease: "circOut" }}
                          className="h-full bg-emerald-500" 
                        />
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="relative">
            {/* Visual Node Map Simulation */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-[4rem] p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-right">
                  <div className="text-[80px] font-black text-white leading-none">GLOBAL</div>
               </div>

               <div className="space-y-10 relative z-10">
                  <div className="flex justify-between items-center mb-12">
                     <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Network Telemetry</span>
                     </div>
                     <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-500/20">Operational</span>
                  </div>

                  <div className="space-y-4">
                     {regions.map((region, idx) => (
                       <motion.div 
                        key={region.name}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between group/item hover:border-blue-500/30 transition-all"
                       >
                          <div className="flex items-center gap-5">
                             <div className={`w-3 h-3 rounded-full ${region.color} shadow-lg shadow-emerald-500/20`}></div>
                             <span className="text-sm font-black text-slate-300 group-hover/item:text-white transition-colors uppercase tracking-tight">{region.name}</span>
                          </div>
                          <div className="flex items-center gap-8">
                             <div className="hidden sm:block text-right">
                                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Latency</p>
                                <p className="text-xs font-bold text-blue-400 font-mono">{region.latency}</p>
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-widest">{region.status}</span>
                          </div>
                       </motion.div>
                     ))}
                  </div>

                  <div className="pt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 grayscale group-hover:grayscale-0 transition-all">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <p className="text-xs font-bold text-slate-500 leading-tight">Data Synchronization <br />Active Across Regions</p>
                     </div>
                     <button className="px-8 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40">
                        View Details
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalInfrastructure;

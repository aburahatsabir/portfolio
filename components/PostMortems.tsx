
import React from 'react';
import { motion } from 'framer-motion';
import { POST_MORTEMS } from '../constants';

const PostMortems: React.FC = () => {
  return (
    <section id="post-mortems" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6">War Stories</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">System Post-Mortems.</h3>
            <p className="mt-8 text-xl text-slate-500 leading-relaxed font-medium">
              Real-world incident reports where deep troubleshooting and proactive architectural shifts prevented enterprise-level failure.
            </p>
          </div>
          <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-4 shadow-xl">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-xs font-black uppercase tracking-widest">3 Incidents Analyzed</span>
          </div>
        </div>

        <div className="space-y-12">
          {POST_MORTEMS.map((pm, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              key={pm.id} 
              className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden"
            >
              <div className="grid lg:grid-cols-[300px_1fr] min-h-[450px]">
                {/* Status Sidebar */}
                <div className="bg-slate-950 p-10 flex flex-col justify-between text-white relative">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px]"></div>
                   <div className="space-y-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Incident ID</span>
                        <span className="text-lg font-black font-mono tracking-tight text-blue-400">{pm.id}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</span>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                           <span className="text-xs font-black uppercase tracking-widest">Resolved</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Severity</span>
                        <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit ${
                          pm.severity === 'Critical' ? 'bg-red-500/20 text-red-500' : 
                          pm.severity === 'High' ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'
                        }`}>
                          {pm.severity}
                        </span>
                      </div>
                   </div>

                   <div className="pt-10 border-t border-slate-800">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Quantified Impact</p>
                      <p className="text-2xl font-black text-white leading-tight">{pm.impact}</p>
                   </div>
                </div>

                {/* Main Content */}
                <div className="p-10 lg:p-16 flex flex-col justify-between">
                  <div className="space-y-12">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight">{pm.title}</h4>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{pm.date}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">The Incident</h5>
                        <p className="text-slate-600 font-medium leading-relaxed italic border-l-2 border-slate-100 pl-6">
                          "{pm.incident}"
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Root Cause Analysis</h5>
                        <p className="text-slate-600 font-medium leading-relaxed">
                          {pm.rootCause}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                      <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Resolution Strategy</h5>
                        <p className="text-slate-900 font-bold leading-relaxed">
                          {pm.resolution}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Fail-Safe Built</h5>
                        <p className="text-slate-900 font-bold leading-relaxed">
                          {pm.failSafeBuilt}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-wrap gap-2 pt-8 border-t border-slate-50">
                    {pm.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostMortems;

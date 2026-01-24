
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DocumentationShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="governance-architecture" className="py-40 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-24 items-start mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12 sticky top-40"
          >
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-[0.3em] shadow-lg shadow-blue-500/20">
                  Governance Protocol
                </div>
                <div className="h-px bg-slate-100 flex-1"></div>
              </div>
              <h2 className="text-5xl md:text-7xl font-[900] tracking-tighter leading-[0.9] text-slate-900">
                Process <br />
                <span className="text-blue-600">Governance.</span>
              </h2>
              <p className="mt-8 text-xl text-slate-500 font-medium leading-relaxed">
                I don't build "Black Boxes." My methodology focuses on <span className="text-slate-900 font-bold italic">Institutional Sovereignty</span>—ensuring your team owns the logic, the maps, and the audit trails from Day 1.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { label: 'Asset Ownership', desc: 'All source files, logic maps, and SOPs reside in your sovereign workspace.' },
                { label: 'Transferable Knowledge', desc: 'Zero "Consultancy-Lock." I engineer systems that your internal ops team can maintain.' },
                { label: 'Audit Readiness', desc: 'Every line of automation logic is documented for institutional compliance scrutiny.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 font-black text-xs shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    0{i+1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">{item.label}</h4>
                    <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={openModal}
              className="w-full py-6 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-4 shadow-2xl group active:scale-95"
            >
              <span>Preview Handoff Package</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </motion.div>

          <div className="grid gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white border border-slate-100 rounded-[4rem] p-12 shadow-sm hover:shadow-2xl transition-all overflow-hidden cursor-pointer"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 border border-slate-100 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Institutional Wiki</span>
                    <h4 className="text-3xl font-black text-slate-900 tracking-tight">Standard Operating Procedures.</h4>
                  </div>
                </div>
                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">Sovereign Asset</div>
              </div>

              <div className="aspect-[16/8] bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden relative group-hover:bg-blue-50/20 transition-colors">
                <div className="absolute inset-0 p-8 flex gap-8 opacity-40 blur-[1px] group-hover:blur-0 transition-all duration-700 select-none">
                  <div className="w-48 shrink-0 space-y-6 pt-4 border-r border-slate-200 pr-8">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-3 bg-slate-200 rounded w-full" style={{ width: `${80 + Math.random() * 20}%` }}></div>
                    ))}
                  </div>
                  <div className="flex-1 space-y-8">
                    <div className="h-10 bg-slate-200 rounded-xl w-3/4 mb-8"></div>
                    <div className="space-y-4">
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                      <div className="h-4 bg-slate-200 rounded w-11/12"></div>
                      <div className="h-4 bg-slate-200 rounded w-10/12"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 pt-12">
                       {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-white border border-slate-100 rounded-2xl shadow-sm"></div>)}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
              </div>

              <div className="mt-10 grid sm:grid-cols-2 gap-8 items-end">
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  Every logic branch and API dependency is indexed in a centralized Knowledge Base, preventing "Tribal Knowledge" bottlenecks.
                </p>
                <div className="flex flex-col items-end gap-2">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                   <p className="font-mono text-[10px] text-slate-300">SOP_DOCUMENTED</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative bg-slate-950 rounded-[4rem] p-12 shadow-sm hover:shadow-2xl transition-all overflow-hidden cursor-pointer border border-slate-900"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-blue-500 border border-slate-800 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.483V8.517a2 2 0 011.553-1.943L9 5.236m10 14.764l5.447-2.724A2 2 0 0021 15.483V8.517a2 2 0 00-1.553-1.943L15 5.236m-6 0l6 0m-6 0l-3.211-1.606A2 2 0 015.789 2H9m6 3.236l3.211-1.606A2 2 0 0018.211 2H15m-6 3.236V20m6-14.764V20" /></svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Logic Mapping</span>
                    <h4 className="text-3xl font-black text-white tracking-tight">Architecture Specifications.</h4>
                  </div>
                </div>
                <div className="px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-500/20">Active Schema</div>
              </div>

              <div className="aspect-[16/8] bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden relative group-hover:bg-slate-800 transition-colors">
                <div className="absolute inset-0 opacity-20 blur-[1px] group-hover:blur-0 transition-all duration-700 select-none">
                  <svg className="w-full h-full p-12" viewBox="0 0 800 400">
                    <circle cx="200" cy="200" r="50" fill="none" stroke="#3b82f6" strokeWidth="4" />
                    <rect x="450" y="150" width="180" height="100" rx="20" fill="none" stroke="#1e293b" strokeWidth="4" />
                    <path d="M 250 200 L 450 200" stroke="#3b82f6" strokeWidth="2" strokeDasharray="10 10" />
                    <circle cx="600" cy="100" r="30" fill="none" stroke="#10b981" strokeWidth="4" />
                    <path d="M 540 150 L 600 130" stroke="#10b981" strokeWidth="2" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="#f43f5e" strokeWidth="4" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              </div>

              <div className="mt-10 grid sm:grid-cols-2 gap-8 items-end">
                <p className="text-lg text-slate-400 font-medium leading-relaxed">
                  Full-stack visibility across all API webhooks, database triggers, and third-party vendor dependencies.
                </p>
                <div className="flex flex-col items-end gap-2">
                   <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Logic Integrity</p>
                   <p className="font-mono text-[10px] text-blue-500">VERIFIED_INFRASTRUCTURE</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-12 md:p-20 bg-slate-50 border border-slate-100 rounded-[5rem] relative overflow-hidden group shadow-sm"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 blur-[120px] pointer-events-none"></div>
          <div className="grid lg:grid-cols-[1fr_300px] gap-16 items-center relative z-10 text-center lg:text-left">
             <div className="space-y-8">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                   <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-blue-600 border border-slate-100 shadow-xl">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                   </div>
                   <div>
                     <h4 className="text-3xl font-black tracking-tight leading-tight text-slate-900">Transferable Governance Guarantee.</h4>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mt-1">Institutional Stability Commitment</p>
                   </div>
                </div>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                  My engagement ends only when your internal leadership has absolute command over the new infrastructure. I provide 1:1 briefing sessions, loom walkthroughs, and technical handoff manifests to ensure long-term continuity.
                </p>
             </div>
             <div className="flex flex-col gap-4">
               <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
                 Request Sample SOP
               </button>
               <button className="px-10 py-5 bg-white text-slate-500 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-all">
                 View Logic Map Demo
               </button>
             </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-5xl bg-white rounded-[4rem] shadow-2xl p-10 md:p-20 max-h-[92vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-16 border-b border-slate-100 pb-12">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                    Professional Handoff
                  </div>
                  <h4 className="text-5xl font-black text-slate-900 tracking-tighter">Handoff Specification.</h4>
                </div>
                <button onClick={closeModal} className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-all group">
                  <svg className="w-7 h-7 text-slate-400 group-hover:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  { title: 'Source Logic Maps', body: 'Editable Miro or Lucid source files exposing every database trigger and API webhook branch.', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A2 2 0 013 15.483V8.517a2 2 0 011.553-1.943L9 5.236m10 14.764l5.447-2.724A2 2 0 0021 15.483V8.517a2 2 0 00-1.553-1.943L15 5.236m-6 0l6 0m-6 0l-3.211-1.606A2 2 0 015.789 2H9m6 3.236l3.211-1.606A2 2 0 0018.211 2H15m-6 3.236V20m6-14.764V20" /></svg> },
                  { title: 'Governance Wiki', body: 'Notion or SharePoint based library of SOPs, logic flowcharts, and incident response guides.', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
                  { title: 'Vendor Audit Trail', body: 'Full inventory of all third-party vendor API keys, service accounts, and rotation schedules.', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg> }
                ].map((item, idx) => (
                  <div key={idx} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-6 group hover:border-blue-200 transition-all">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h5 className="text-xl font-black text-slate-900 leading-tight">{item.title}</h5>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="p-12 bg-slate-950 text-white rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] pointer-events-none"></div>
                <div className="max-w-md space-y-6 relative z-10 text-center md:text-left">
                  <h5 className="text-2xl font-black tracking-tight leading-tight">Institutional <br />Transference Complete.</h5>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    This package ensures your administrative architecture remains a sovereign asset. I build infrastructure that empowers your team to operate without external dependencies.
                  </p>
                </div>
                <button className="bg-blue-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40 relative z-10 whitespace-nowrap active:scale-95">
                   Request Audit Template
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DocumentationShowcase;

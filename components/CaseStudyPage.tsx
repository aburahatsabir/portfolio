
import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, TECH_DESCRIPTIONS } from '../constants';

const TechnicalArtifact: React.FC<{ title: string; children: React.ReactNode; id?: string }> = ({ title, children, id }) => (
   <div className="p-10 md:p-14 bg-slate-50 border border-slate-100 rounded-[4rem] relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] font-mono text-[80px] font-black pointer-events-none select-none">ARTIFACT_{id || '01'}</div>
      <div className="relative z-10 space-y-10">
         <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">{title}</h4>
         </div>
         {children}
      </div>
   </div>
);

const CaseStudyPage: React.FC<{ projectId: string }> = ({ projectId }) => {
   const project = PROJECTS.find(p => p.id === projectId);

   if (!project) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center space-y-8 pt-32">
            <h2 className="text-3xl font-black text-slate-900">Record Not Found.</h2>
            <a href="#/work" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Return to Archives</a>
         </div>
      );
   }

   return (
      <div className="bg-white min-h-screen pt-32 pb-40 selection:bg-blue-600 selection:text-white">
         <div className="max-w-7xl mx-auto px-6">
            {/* Navigation */}
            <div className="mb-20 flex justify-between items-center">
               <a href="#/work" className="inline-flex items-center gap-3 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] transition-all group">
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                  Archives / Back to Work
               </a>
               <div className="flex items-center gap-3">
                  <span className="mono text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                     Remediation Verified
                  </span>
               </div>
            </div>

            {/* Hero Section */}
            <header className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start mb-32">
               <div className="space-y-12">
                  <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{project.category}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audit ID // {project.id.toUpperCase()}</span>
                     </div>
                     <h1 className="text-5xl md:text-8xl font-[900] text-slate-900 tracking-tighter leading-[0.92]">
                        {project.title}
                     </h1>
                     <p className="text-2xl md:text-3xl text-blue-600 font-black tracking-tight leading-tight">
                        {project.headline}
                     </p>
                  </div>

                  <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-8">
                     "{project.description}"
                  </p>
               </div>

               <div className="space-y-10">
                  <div className="aspect-[4/3] rounded-[3.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl relative group">
                     <img src={project.image} alt={project.title} width={1600} height={1200} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     {project.systemSpecs?.map((spec, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
                           <p className="text-base font-black text-slate-900">{spec.value}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </header>

            {/* The Narrative Section */}
            <div className="grid lg:grid-cols-[1fr_350px] gap-24 mb-40">
               <article className="space-y-24">
                  <section className="space-y-10">
                     <div className="flex items-center gap-4">
                        <span className="mono text-xs font-black text-blue-600">[01]</span>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Forensic Challenge.</h3>
                     </div>
                     <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        {project.fullCaseStudy?.challenge}
                     </p>
                     <div className="grid md:grid-cols-2 gap-6 pt-6">
                        {project.fullCaseStudy?.painPoints?.map((pain, i) => (
                           <div key={i} className="flex gap-4 items-center p-6 bg-red-50/50 border border-red-100 rounded-2xl">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">{pain}</p>
                           </div>
                        ))}
                     </div>
                  </section>

                  <section className="space-y-10">
                     <div className="flex items-center gap-4">
                        <span className="mono text-xs font-black text-blue-600">[02]</span>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Remediation Logic.</h3>
                     </div>
                     <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        {project.fullCaseStudy?.solution}
                     </p>
                  </section>

                  <section className="space-y-10">
                     <div className="flex items-center gap-4">
                        <span className="mono text-xs font-black text-blue-600">[03]</span>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Institutional Outcome.</h3>
                     </div>
                     <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        {project.fullCaseStudy?.result}
                     </p>
                  </section>
               </article>

               <aside className="space-y-12">
                  <div className="p-10 rounded-[3rem] bg-slate-900 text-white space-y-8 sticky top-32">
                     <div className="space-y-2">
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em]">Remediation Impact</p>
                        <h4 className="text-4xl font-black tracking-tighter text-white">{project.impact}</h4>
                     </div>
                     <div className="h-px bg-slate-800"></div>
                     <div className="space-y-6">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stack Inventory</p>
                        <div className="flex flex-wrap gap-2">
                           {project.technologies.map(tech => (
                              <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase text-slate-300">{tech}</span>
                           ))}
                        </div>
                     </div>
                     <button onClick={() => window.location.hash = '#/contact'} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20">
                        Request Full Audit
                     </button>
                  </div>
               </aside>
            </div>

            {/* Technical Artifacts: The "Showcase" */}
            <div className="space-y-20 pt-20 border-t border-slate-100">
               <div className="text-center max-w-2xl mx-auto space-y-6 mb-20">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600">Technical Evidence Lab</h2>
                  <h3 className="text-4xl md:text-6xl font-[900] text-slate-900 tracking-tighter leading-tight">System Artifacts.</h3>
                  <p className="text-lg text-slate-500 font-medium">Visual proof of the deterministic logic layers implemented during this remediation.</p>
               </div>

               <div className="grid lg:grid-cols-2 gap-8">
                  {/* Artifact 1: Schema Map */}
                  <TechnicalArtifact title="Relational Architecture Map" id="01_SCHEMA">
                     <div className="space-y-6">
                        <div className="grid gap-4">
                           {project.dataSchema?.map((entity, i) => (
                              <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center justify-between group-hover:border-blue-200 transition-all">
                                 <div className="flex items-center gap-5">
                                    <span className="mono text-[10px] text-slate-300 font-black">0{i + 1}</span>
                                    <p className="font-mono text-sm font-black text-slate-900">{entity.split('(')[0].trim()}</p>
                                 </div>
                                 <div className="hidden md:block">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{entity.includes('ID') ? 'PRIMARY_KEY' : 'DATA_NODE'}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-md">
                           Entities are normalized to 3NF to ensure zero data redundancy and deterministic referential integrity.
                        </p>
                     </div>
                  </TechnicalArtifact>

                  {/* Artifact 2: Performance Delta */}
                  <TechnicalArtifact title="Operational Throughput Gain" id="02_DELTA">
                     <div className="space-y-12 py-10">
                        <div className="space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-[10px] font-black text-slate-400 uppercase">Legacy Manual Process</span>
                              <span className="text-2xl font-black text-slate-400">20 Min / Task</span>
                           </div>
                           <div className="h-3 bg-slate-100 rounded-full w-full"></div>
                        </div>
                        <div className="space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-[10px] font-black text-blue-600 uppercase">Remediated System</span>
                              <span className="text-2xl font-black text-blue-600">4 Min / Task</span>
                           </div>
                           <div className="h-3 bg-blue-600 rounded-full w-[20%] relative overflow-hidden">
                              <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-white/20"></motion.div>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Velocity Gain</p>
                              <p className="text-4xl font-black text-slate-900 tracking-tighter">80.0%</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Error Frequency</p>
                              <p className="text-4xl font-black text-emerald-600 tracking-tighter">0.0%</p>
                           </div>
                        </div>
                     </div>
                  </TechnicalArtifact>
               </div>

               {/* Artifact 3: Script Logic */}
               <div className="p-10 md:p-20 bg-slate-900 rounded-[5rem] border border-slate-800 relative overflow-hidden group shadow-3xl shadow-slate-900/40">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[120px] pointer-events-none"></div>
                  <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center relative z-10">
                     <div className="space-y-8">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-lg">JS</div>
                           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Governance-as-Code</h4>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">Immutable <br />Integrity Anchors.</h3>
                        <p className="text-lg text-slate-400 leading-relaxed font-medium">
                           The system enforces data integrity through server-side triggers that intercept manual edits and validate them against institutional rules before committing to the ledger.
                        </p>
                        <div className="flex items-center gap-4">
                           <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Idempotency Checked</span>
                           </div>
                        </div>
                     </div>

                     <div className="bg-slate-950 rounded-3xl p-8 border border-white/5 font-mono text-xs leading-relaxed relative shadow-inner overflow-hidden">
                        <div className="absolute top-4 right-6 text-[9px] font-black text-slate-700 uppercase tracking-widest">system_governance.gs</div>
                        <div className="space-y-1">
                           <p className="text-slate-500">// Remediation: Static reference price lock</p>
                           <p><span className="text-blue-500">function</span> <span className="text-emerald-400">onEntryCommit</span>(e) {`{`}</p>
                           <p className="pl-6 text-slate-300"><span className="text-blue-500">const</span> ledger = e.source.<span className="text-amber-400">getSheetByName</span>(<span className="text-blue-300">'TX_LOG'</span>);</p>
                           <p className="pl-6 text-slate-300"><span className="text-blue-500">const</span> status = <span className="text-emerald-400">validateIntegrity</span>(e.value);</p>
                           <p className="pl-6 text-slate-600">...</p>
                           <p className="pl-6 text-slate-300"><span className="text-blue-500">if</span> (status === <span className="text-blue-300">'APPROVED'</span>) {`{`}</p>
                           <p className="pl-12 text-emerald-500">ledger.<span className="text-amber-400">appendRow</span>([Date.<span className="text-amber-400">now</span>(), e.user, e.payload]);</p>
                           <p className="pl-12 text-blue-500">ledger.<span className="text-amber-400">getRange</span>(lastRow).<span className="text-amber-400">protect</span>();</p>
                           <p className="pl-6 text-slate-300">{`}`}</p>
                           <p className="text-slate-300">{`}`}</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Risk Audit Post Mortem */}
            <div className="mt-40 bg-slate-50 rounded-[4rem] p-12 md:p-24 border border-slate-100 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] pointer-events-none"></div>
               <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-10">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Resilience Audit Locked</span>
                     </div>
                     <h4 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">System Resilience <br />& Forensic Governance.</h4>
                     <p className="text-xl text-slate-500 font-medium leading-relaxed">
                        Building a system is secondary to ensuring it doesn't fail silently. My audits identify the nightmare scenarios before they manifest.
                     </p>
                  </div>

                  <div className="space-y-6">
                     <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-2">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                           Identified Forensic Risk
                        </h5>
                        <p className="text-lg text-slate-900 font-bold italic">"{project.postMortem?.risk}"</p>
                     </div>
                     <div className="p-8 bg-blue-600 rounded-3xl text-white shadow-xl space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl"></div>
                        <h5 className="text-xs font-black uppercase tracking-widest text-blue-100">Idempotent Resolution</h5>
                        <p className="text-lg font-black leading-relaxed">"{project.postMortem?.resolution}"</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Closing CTA */}
            <div className="mt-40 text-center space-y-12">
               <div className="max-w-2xl mx-auto space-y-6">
                  <h4 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">Require a similar <br />remediation?</h4>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed">My audits are clinical, ROI-focused, and designed for organizations scaling beyond manual capabilities.</p>
               </div>
               <div className="flex flex-wrap justify-center gap-6">
                  <button onClick={() => window.location.hash = '#/contact'} className="px-12 py-6 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95">Schedule Briefing</button>
                  <button onClick={() => window.location.hash = '#/work'} className="px-12 py-6 bg-slate-100 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all active:scale-95">Return to Archives</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CaseStudyPage;

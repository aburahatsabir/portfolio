import React from 'react';
import { motion } from 'framer-motion';

const Solutions: React.FC = () => {
  const categories = [
    {
      title: 'Executive Operations & Support',
      description: 'Calendar and meeting management, travel logistics, board materials, and confidential communication — all organised into clean, repeatable systems that protect leadership time.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      tools: ['Office 365', 'Google Workspace', 'Zoom', 'Calendar Ops']
    },
    {
      title: 'Workflow & Data Automation',
      description: 'I design and build automations using Excel, Google Sheets, and Apps Script to handle reporting, approvals, and status tracking — reducing manual work and error-prone copy-paste.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      tools: ['Excel VBA', 'Apps Script', 'Dashboards', 'API Integrations']
    },
    {
      title: 'Training, Documentation & Handover',
      description: 'Clear guides, walkthroughs, and team training so your new systems are easy to adopt, simple to maintain, and still working long after the initial setup.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      tools: ['Standard Operating Procedures', 'Loom Guides', 'Wiki Docs', 'Mentorship']
    }
  ];

  const methodology = [
    { step: '01', title: 'Audit & Analyze', desc: 'I start by auditing current workflows to find bottlenecks. I identify exactly where time is lost and where processes break down.' },
    { step: '02', title: 'Strategy & Plan', desc: 'I design a tailored solution—whether it’s a new C-Suite filing protocol, a travel logistics system, or a data tracking method.' },
    { step: '03', title: 'Build & Automate', desc: 'I implement the solution using tools like Excel, Apps Script, and automation platforms to eliminate manual work and ensure accuracy.' },
    { step: '04', title: 'Execute & Train', desc: 'I deploy the system and train your team (leveraging my teaching background) to ensure seamless adoption and long-term success.' }
  ];

  return (
    <section id="solutions" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">Administrative Product Catalog</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">Expertise built for the <span className="text-blue-600">modern enterprise.</span></h3>
          <p className="text-xl text-slate-500 font-medium">I don’t just fix systems; I re-architect them for peak efficiency. Here is how I transform organizations.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group h-full flex flex-col"
            >
              <div className="text-blue-600 mb-8 w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">{cat.icon}</div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{cat.title}</h3>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed flex-1">{cat.description}</p>
              <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                {cat.tools.map(tool => (
                  <span key={tool} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest">{tool}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 bg-slate-900 text-white rounded-[4rem] p-12 md:p-24 relative overflow-hidden group shadow-3xl shadow-slate-950/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[150px] pointer-events-none group-hover:bg-blue-600/20 transition-all duration-1000"></div>
          
          <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-400">The Systems Architecture Lifecycle</h3>
                <h4 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">How I Work.</h4>
                <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                  My approach bridges the gap between administrative chaos and operational clarity. I don’t just complete tasks; I build systems.
                </p>
              </div>

              <div className="grid gap-12">
                {methodology.map((item, i) => (
                  <div key={i} className="flex gap-8 group/item">
                    <span className="text-blue-500 font-black text-2xl font-mono opacity-40 group-hover/item:opacity-100 transition-opacity">{item.step}</span>
                    <div className="space-y-2">
                      <h4 className="font-black text-2xl tracking-tight text-white">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center sticky top-40">
              <div className="w-full max-w-sm aspect-square bg-gradient-to-tr from-blue-600 to-indigo-900 rounded-[3.5rem] flex items-center justify-center p-12 shadow-[0_50px_100px_-20px_rgba(37,99,235,0.4)] border border-blue-400/20 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]"></div>
                 <div className="text-center space-y-6 relative z-10">
                    <div className="flex justify-center">
                      <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-5xl font-black tracking-tighter text-white">99.9%</div>
                      <div className="text-blue-200 font-black uppercase tracking-[0.2em] text-[10px] mt-2">Uptime Strategy Guaranteed</div>
                    </div>
                    <div className="pt-8 flex flex-wrap justify-center gap-2">
                      {['Audit', 'SOP', 'VBA', 'Apps Script'].map(t => (
                        <span key={t} className="px-3 py-1 bg-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-white border border-white/10">{t}</span>
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
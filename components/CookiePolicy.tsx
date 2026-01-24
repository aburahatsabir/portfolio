
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const CookiePolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cookieCategories = [
    {
      id: "ESS-01",
      title: "Essential Infrastructure",
      subtitle: "System Integrity & Security",
      description: "These cookies are mandatory for the architectural stability of the site. They manage session state, CSRF protection, and load balancing across our global nodes.",
      impact: "Critical",
      expiry: "Session-based",
      tags: ["Security", "Sovereignty"]
    },
    {
      id: "ANA-02",
      title: "Diagnostic Analytics",
      subtitle: "Performance & Load Monitoring",
      description: "Used to monitor system latency and traffic distribution. We utilize de-identified telemetry to ensure our Diagnostic Core maintains sub-second response times.",
      impact: "Moderate",
      expiry: "12 Months",
      tags: ["Observability", "ROI"]
    },
    {
      id: "FUN-03",
      title: "Functional Preference",
      subtitle: "User Experience Personalization",
      description: "Stored parameters for UI preferences, such as selected industry blueprints or saved ROI calculations, to ensure persistence across sessions.",
      impact: "Low",
      expiry: "6 Months",
      tags: ["Experience", "Sustenance"]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-16">
          <a 
            href="#/" 
            className="inline-flex items-center gap-3 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] transition-all group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Return to Core Infrastructure
          </a>
        </div>

        {/* Header Section */}
        <header className="space-y-8 mb-20 border-b border-slate-100 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Institutional Governance v1.4
          </div>
          <h1 className="text-5xl md:text-7xl font-[900] text-slate-900 tracking-tighter leading-none">
            Cookie <span className="text-blue-600">Audit.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-6 pt-4">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Last Telemetry Audit: Nov 02, 2024</p>
            <div className="hidden md:block h-1 w-1 rounded-full bg-slate-200"></div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Protocol: TELEMETRY_LOCKED_1.4</p>
          </div>
        </header>

        {/* Introduction */}
        <div className="prose prose-slate max-w-none mb-24">
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            AdminPro utilizes a clinical approach to data tracking. We believe in <span className="text-slate-900 font-bold underline decoration-blue-500 decoration-2">Telemetry Transparency</span>: every cookie served is a functional component of the system architecture, not a marketing byproduct.
          </p>
        </div>

        {/* Forensic Cookie Inventory */}
        <div className="space-y-12 mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">System Inventory & Risk Rating</h2>
          {cookieCategories.map((category, idx) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-10 bg-slate-50 border border-slate-100 rounded-[3rem] hover:bg-white hover:border-blue-200 hover:shadow-2xl transition-all duration-500"
            >
              <div className="grid md:grid-cols-[120px_1fr] gap-8 items-start">
                <div className="flex flex-col gap-4">
                   <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-mono text-xs font-black text-slate-400 group-hover:text-blue-600 transition-colors">
                     {category.id}
                   </div>
                   <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-center ${
                     category.impact === 'Critical' ? 'bg-red-50 text-red-500 border border-red-100' :
                     category.impact === 'Moderate' ? 'bg-amber-50 text-amber-500 border border-amber-100' :
                     'bg-emerald-50 text-emerald-500 border border-emerald-100'
                   }`}>
                     {category.impact} Risk
                   </span>
                </div>
                <div className="space-y-6">
                   <div>
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">{category.subtitle}</h3>
                     <h4 className="text-2xl font-black text-slate-900 tracking-tight">{category.title}</h4>
                   </div>
                   <p className="text-slate-600 font-medium leading-relaxed">{category.description}</p>
                   <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200/60">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Persistence</p>
                        <p className="text-xs font-bold text-slate-900">{category.expiry}</p>
                      </div>
                      <div className="h-8 w-px bg-slate-200"></div>
                      <div className="flex gap-2">
                        {category.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white border border-slate-100 rounded-md text-[9px] font-black uppercase text-slate-500">{tag}</span>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Diagnostic Disclosure */}
        <div className="p-12 bg-slate-900 text-white rounded-[4rem] relative overflow-hidden mb-24 shadow-3xl shadow-slate-900/40">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shrink-0">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="space-y-6">
                <h4 className="text-2xl font-black tracking-tight">AI Telemetry Notice</h4>
                <p className="text-slate-400 font-medium leading-relaxed">
                  The Principal Diagnostic Core (powered by Gemini 3 Pro) uses localized session tokens to maintain context during system audits. This data is de-identified before transmission to the reasoning engine and is not used for institutional model training.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Gemini-Engine-Lock Verified</span>
                </div>
              </div>
           </div>
        </div>

        {/* Governance Control Section */}
        <div className="space-y-12">
           <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">User Autonomy</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">Sovereign Control.</h3>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 rounded-[3rem] border border-slate-100 bg-slate-50 space-y-6">
                <h5 className="text-xl font-black">Browser-Level Control</h5>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Users can manage tracking via browser settings. Note that disabling "Essential" infrastructure may lead to system-wide failures in the ROI Calculator and Diagnostic Core.
                </p>
              </div>
              <div className="p-10 rounded-[3rem] border border-slate-100 bg-slate-50 space-y-6">
                <h5 className="text-xl font-black">Do Not Track (DNT)</h5>
                <p className="text-slate-500 font-medium leading-relaxed">
                  We respect the "Do Not Track" (DNT) signal. When enabled, we automatically restrict telemetry to only those components required for site delivery.
                </p>
              </div>
           </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center space-y-8">
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Require a deeper technical audit of our stack?</p>
          <div className="flex flex-wrap justify-center gap-6">
             <a href="#/contact" className="px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
               Request Forensic Data Export
             </a>
             <a href="#/" className="px-12 py-6 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
               Return to Dashboard
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;

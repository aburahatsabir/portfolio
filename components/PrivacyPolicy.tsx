
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "01",
      title: "Information Sovereignty",
      subtitle: "Data Ownership & Collection",
      content: "As a Principal Systems Architect, I operate under the mandate of Least-Privilege. Any data collected—including corporate identity, operational friction reports, and system audit telemetry—is treated as institutional property. We do not sell, trade, or monetize your infrastructure data."
    },
    {
      id: "02",
      title: "Diagnostic Telemetry",
      subtitle: "Usage & Audit Logs",
      content: "Interaction with the Principal Diagnostic Core (AI Assistant) may generate logs to improve reasoning accuracy. These logs are de-identified at the source and encrypted in transit. We collect technical metadata (browser type, session duration) strictly for performance optimization."
    },
    {
      id: "03",
      title: "Security Protocols",
      subtitle: "Zero-Trust Architecture",
      content: "All communications are secured via TLS 1.3. We leverage HashiCorp Vault for secrets management and strictly adhere to SOC2 Type II administrative standards. Any PII (Personally Identifiable Information) shared during discovery is handled via isolated, encrypted storage buckets."
    },
    {
      id: "04",
      title: "Third-Party Governance",
      subtitle: "Service Interoperability",
      content: "We utilize Gemini 3 Pro (Google GenAI) for diagnostic reasoning. Data sent to the Diagnostic Core is subject to enterprise-grade privacy filters. We do not allow third-party trackers or advertising beacons to execute within the AdminPro environment."
    },
    {
      id: "05",
      title: "Institutional Rights",
      subtitle: "Compliance & GDPR",
      content: "Entities retain the absolute right to request an immediate 'System Purge' of all submitted diagnostic data. Under GDPR and CCPA mandates, you may request a copy of all stored telemetry by initiating a Formal Data Audit request via the contact protocol."
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
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Institutional Governance v1.4
          </div>
          <h1 className="text-5xl md:text-7xl font-[900] text-slate-900 tracking-tighter leading-none">
            Privacy <span className="text-blue-600">Protocol.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-6 pt-4">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Last Audit: October 14, 2024</p>
            <div className="hidden md:block h-1 w-1 rounded-full bg-slate-200"></div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Effective Version: LOCKED_4.0</p>
          </div>
        </header>

        {/* Policy Content */}
        <div className="space-y-24">
          {sections.map((section) => (
            <motion.section 
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-[100px_1fr] gap-8"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-black text-slate-400 mb-4">
                  {section.id}
                </div>
                <div className="flex-1 w-px bg-gradient-to-b from-slate-100 via-slate-100 to-transparent"></div>
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">{section.subtitle}</h2>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{section.title}</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Governance Footer Card */}
        <div className="mt-32 p-12 bg-slate-50 rounded-[3.5rem] border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px]"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
              <h4 className="text-2xl font-black text-slate-900 mb-4">Data Sovereignty Commitment.</h4>
              <p className="text-slate-500 font-medium leading-relaxed">
                I believe that security is not a compliance checkbox, but a foundational design principle. My systems are built to ensure your business remains the sole sovereign of its information.
              </p>
            </div>
            <div className="shrink-0 flex gap-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-blue-600 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SOC2 Grade</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-blue-600 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AES-256</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Contact Link */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 font-bold text-sm mb-6 uppercase tracking-widest">Questions regarding this protocol?</p>
          <a href="#/contact" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
            Secure Legal Inquiry
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

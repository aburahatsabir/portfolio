
import React from 'react';
import { motion } from 'framer-motion';

const SecurityGovernance: React.FC = () => {
  const securityStack = [
    { 
      name: 'Okta / IAM', 
      role: 'Identity Sovereignty', 
      description: 'Zero-Trust access control with automated lifecycle management.', 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
    },
    { 
      name: 'HashiCorp Vault', 
      role: 'Secrets Governance', 
      description: 'Centralized management of API keys and database credentials.', 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> 
    },
    { 
      name: 'SOC2 Type II', 
      role: 'Institutional Compliance', 
      description: 'Architecting for strict organizational and data security standards.', 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg> 
    }
  ];

  return (
    <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500 mb-6">Security & Sovereignty</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Institutional-Grade <br />
                <span className="text-blue-500">Risk Mitigation.</span>
              </h3>
            </div>
            
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
              I don't just build systems; I harden them. My "Zero-Trust" approach ensures that your operational infrastructure is a fortress, not a liability.
            </p>

            <div className="grid gap-6">
              {securityStack.map((item, i) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 flex items-start gap-8 group hover:border-blue-500/50 transition-all"
                >
                  <div className="text-blue-500">{item.icon}</div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-xl font-black text-white">{item.name}</h4>
                      <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 px-2 py-1 bg-blue-500/10 rounded">{item.role}</span>
                    </div>
                    <p className="text-slate-400 font-medium">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-[120px]"></div>
            <div className="bg-slate-900 rounded-[4rem] p-12 border border-slate-800 relative overflow-hidden">
               <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-8">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                     <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest">ENCRYPTION ACTIVE</span>
               </div>
               
               <div className="space-y-6 font-mono text-[11px] text-blue-400/80">
                  <p><span className="text-slate-500">SESSION:</span> SECURE_HANDSHAKE_INITIATED</p>
                  <p><span className="text-slate-500">STATUS:</span> ROTATING_ACCESS_KEYS</p>
                  <p><span className="text-slate-500">POLICY:</span> OKTA_POLICY_ENFORCED</p>
                  <div className="h-px bg-slate-800 my-4"></div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                        <p className="text-slate-500 mb-2 uppercase tracking-tighter text-[9px]">Identity Integrity</p>
                        <p className="text-xl font-black text-emerald-500">VERIFIED</p>
                     </div>
                     <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                        <p className="text-slate-500 mb-2 uppercase tracking-tighter text-[9px]">Audit Trail</p>
                        <p className="text-xl font-black text-blue-500">IMMUTABLE</p>
                     </div>
                  </div>
               </div>

               <div className="mt-12 p-6 bg-slate-950 rounded-3xl border border-slate-800 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Institutional Compliance</p>
                  <p className="text-base text-white font-bold">Policy Compliance Verified</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityGovernance;

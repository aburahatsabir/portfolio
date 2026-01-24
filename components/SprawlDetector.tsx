
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SprawlDetector: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    employees: 50,
    departments: 3,
    tools: [] as string[]
  });

  const toolCategories = ['SaaS (CRM/ERP)', 'Communication', 'Project Management', 'Cloud Infrastructure', 'Marketing Tech'];

  const calculateEstimate = () => {
    const baselineSprawl = data.employees * 0.15; // 15% of employees typically "buy their own"
    const deptComplexity = data.departments * 1200; // $1.2k leakage per dept
    const wastedLicenses = Math.floor(baselineSprawl * 45); // Avg $45/mo/license
    const yearlyWaste = (wastedLicenses * 12) + deptComplexity;
    
    return {
      waste: yearlyWaste,
      ghostUsers: Math.floor(baselineSprawl),
      securityRisk: data.departments > 5 ? 'High' : 'Medium'
    };
  };

  const results = calculateEstimate();

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-6">
           <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">The Sprawl Detector</h2>
           <h3 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">Expose your <br />Shadow IT.</h3>
           <p className="text-xl text-slate-500 font-medium">Quantify the unmanaged SaaS risk and license redundancy hiding in your organization.</p>
        </div>

        <div className="bg-slate-50 rounded-[3.5rem] border border-slate-100 p-8 md:p-16 shadow-sm">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Total Headcount</label>
                      <span className="text-2xl font-black text-slate-900">{data.employees} Users</span>
                   </div>
                   <input 
                    type="range" min="10" max="1000" step="10" value={data.employees}
                    onChange={(e) => setData({...data, employees: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                   />
                </div>
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Active Departments</label>
                      <span className="text-2xl font-black text-slate-900">{data.departments} Depts</span>
                   </div>
                   <div className="grid grid-cols-5 gap-4">
                     {[1,3,5,10,20].map(val => (
                       <button 
                        key={val}
                        onClick={() => setData({...data, departments: val})}
                        className={`py-4 rounded-2xl font-black text-sm border transition-all ${
                          data.departments === val ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'
                        }`}
                       >
                         {val}
                       </button>
                     ))}
                   </div>
                </div>
                <button 
                  onClick={() => setStep(1)}
                  className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-lg hover:bg-black transition-all shadow-xl"
                >
                  Analyze Risk Architecture
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
                 <div className="text-center p-12 bg-white rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px]"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Estimated SaaS Leakage</p>
                    <p className="text-6xl font-black text-slate-900 tracking-tighter">${results.waste.toLocaleString()}<span className="text-2xl text-slate-400">/yr</span></p>
                    <div className="mt-8 flex justify-center gap-8">
                       <div>
                          <p className="text-2xl font-black text-red-500">{results.ghostUsers}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Ghost Users</p>
                       </div>
                       <div className="w-px h-12 bg-slate-100"></div>
                       <div>
                          <p className="text-2xl font-black text-amber-500">{results.securityRisk}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Compliance Risk</p>
                       </div>
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white space-y-4">
                       <h5 className="text-xs font-black uppercase tracking-widest text-blue-400">The Problem</h5>
                       <p className="text-sm text-slate-400 font-medium leading-relaxed">
                         Without a centralized governance layer, departments buy tools in silos. This results in "Ghost Licenses"—active subscriptions for employees who have left, and unencrypted data silos that fail SOC2 audits.
                       </p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-blue-600 text-white space-y-4">
                       <h5 className="text-xs font-black uppercase tracking-widest text-blue-100">The Partner Solution</h5>
                       <p className="text-sm text-blue-50 font-medium leading-relaxed">
                         I implement an **SaaS Observability Layer** that auto-discovers tool usage through IAM audit logs, instantly flagging redundant spend and orphaned access.
                       </p>
                    </div>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 py-6 bg-blue-600 text-white rounded-3xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                       Get a Governance Audit
                    </button>
                    <button onClick={() => setStep(0)} className="flex-1 py-6 bg-slate-200 text-slate-600 rounded-3xl font-black text-lg hover:bg-slate-300 transition-all">
                       Recalculate
                    </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SprawlDetector;

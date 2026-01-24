
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const RoiCalculator: React.FC = () => {
  const [employees, setEmployees] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(65);

  const annualLoss = useMemo(() => {
    return employees * hoursPerWeek * 52 * hourlyRate;
  }, [employees, hoursPerWeek, hourlyRate]);

  const potentialSavings = useMemo(() => annualLoss * 0.82, [annualLoss]);

  return (
    <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 opacity-5 -z-0 blur-[120px]"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">The ROI Audit</h2>
            <h3 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Calculate your <br />
              <span className="text-blue-500 underline decoration-slate-800">Manual Debt.</span>
            </h3>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              Most enterprises lose hundreds of thousands annually to inefficient "human-bridge" tasks. 
              My systems typically reclaim 82% of this wasted capital.
            </p>
            
            <div className="space-y-12 pt-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Team Size</label>
                  <span className="text-xl font-black">{employees} Employees</span>
                </div>
                <input 
                  type="range" min="5" max="500" step="5" value={employees} 
                  onChange={(e) => setEmployees(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Weekly Manual Hours / Person</label>
                  <span className="text-xl font-black">{hoursPerWeek} Hours</span>
                </div>
                <input 
                  type="range" min="1" max="20" step="1" value={hoursPerWeek} 
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Avg. Internal Hourly Rate</label>
                  <span className="text-xl font-black">${hourlyRate}/hr</span>
                </div>
                <input 
                  type="range" min="30" max="250" step="5" value={hourlyRate} 
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white text-slate-900 rounded-[4rem] p-12 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-100"
          >
            <div className="space-y-12">
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Annual Operational Leakage</p>
                <p className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter">
                  ${annualLoss.toLocaleString()}
                </p>
              </div>

              <div className="p-10 bg-blue-50 rounded-[3rem] border border-blue-100 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Partner-Driven Recovery Projection</p>
                <p className="text-5xl font-black text-blue-700 tracking-tight">
                  -${potentialSavings.toLocaleString()}
                </p>
                <p className="mt-6 text-sm font-bold text-blue-600/60 leading-relaxed uppercase tracking-widest">
                  Potential reclaimed capital per fiscal year.
                </p>
              </div>

              <div className="space-y-6 pt-4 text-center">
                <p className="text-slate-500 font-medium leading-relaxed">
                  Calculated based on average automation efficiency gains for teams in the {employees > 100 ? 'Enterprise' : 'Mid-Market'} sector.
                </p>
                <button className="w-full py-6 bg-black text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3">
                  Get Detailed Efficiency Audit
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;

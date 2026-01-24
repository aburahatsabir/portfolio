
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line,
  CartesianGrid
} from 'recharts';

const ObservabilityMissionControl: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<number>(142);
  const [healthScore, setHealthScore] = useState<number>(98.4);
  const [chartData, setChartData] = useState<any[]>([]);

  // Generate initial data
  useEffect(() => {
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: i,
      latency: 20 + Math.random() * 15,
      errorRate: Math.random() * 0.8,
      utilization: 45 + Math.random() * 20
    }));
    setChartData(initialData);

    const interval = setInterval(() => {
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setHealthScore(prev => Math.min(100, Math.max(94, prev + (Math.random() * 0.4 - 0.2))));
      
      setChartData(prev => {
        const nextTime = prev[prev.length - 1].time + 1;
        const newDataPoint = {
          time: nextTime,
          latency: 20 + Math.random() * 15,
          errorRate: Math.random() < 0.05 ? 1.5 + Math.random() : Math.random() * 0.8,
          utilization: 45 + Math.random() * 25
        };
        return [...prev.slice(1), newDataPoint];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const dataStreams = [
    { label: 'API Integrity', value: '100%', status: 'optimal' },
    { label: 'IAM Compliance', value: '99.2%', status: 'optimal' },
    { label: 'Cost Efficiency', value: '94.0%', status: 'warning' },
    { label: 'Shadow IT Sprawl', value: '2.4%', status: 'optimal' },
  ];

  return (
    <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-600/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-center">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500">Professional Observability</h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-white">The Governance <br /><span className="text-blue-500">Mission Control.</span></h3>
              <p className="text-xl text-slate-400 font-medium max-w-lg leading-relaxed">
                I don't build "set-and-forget" automations. I deploy self-healing infrastructure with deep visibility, giving leadership a real-time pulse on operational integrity.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {dataStreams.map((stream, i) => (
                <motion.div 
                  key={stream.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-2xl group hover:border-blue-500/50 transition-all"
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">{stream.label}</p>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-black font-mono">{stream.value}</span>
                    <div className={`w-2 h-2 rounded-full ${stream.status === 'optimal' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-500/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative bg-slate-900 rounded-[4rem] border border-slate-800 p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
               {/* Dashboard Header */}
               <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Real-time Telemetry</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-lg text-blue-500 text-[9px] font-black uppercase tracking-widest">
                     <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
                     Live Monitoring
                  </div>
               </div>

               {/* New Metrics Dashboard Section */}
               <div className="grid gap-6 mb-8">
                  {/* Primary Latency Chart */}
                  <div className="bg-slate-950/50 p-6 rounded-[2.5rem] border border-slate-800 h-64">
                    <div className="flex justify-between items-center mb-4">
                       <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Endpoint Latency (ms)</h5>
                       <span className="text-blue-500 font-mono text-xs">AVG: 24.2ms</span>
                    </div>
                    <ResponsiveContainer width="100%" height="80%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={[0, 50]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px', color: '#fff' }}
                          itemStyle={{ color: '#3b82f6' }}
                          labelStyle={{ display: 'none' }}
                        />
                        <Area type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLatency)" isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Error Rate Chart */}
                    <div className="bg-slate-950/50 p-6 rounded-[2.5rem] border border-slate-800 h-48">
                      <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Error Frequency (%)</h5>
                      <ResponsiveContainer width="100%" height="70%">
                        <LineChart data={chartData}>
                          <XAxis dataKey="time" hide />
                          <YAxis hide domain={[0, 5]} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '10px' }} labelStyle={{ display: 'none' }} />
                          <Line type="stepAfter" dataKey="errorRate" stroke="#f43f5e" strokeWidth={2} dot={false} isAnimationActive={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Utilization Chart */}
                    <div className="bg-slate-950/50 p-6 rounded-[2.5rem] border border-slate-800 h-48">
                      <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Utilization</h5>
                      <ResponsiveContainer width="100%" height="70%">
                        <AreaChart data={chartData}>
                          <XAxis dataKey="time" hide />
                          <YAxis hide domain={[0, 100]} />
                          <Area type="monotone" dataKey="utilization" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} isAnimationActive={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
               </div>

               {/* Operational Summary */}
               <div className="grid grid-cols-2 gap-10 p-6 bg-slate-950/30 rounded-[2.5rem] border border-slate-800/50">
                  <div className="space-y-4">
                     <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Health Status</h5>
                     <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16">
                           <svg className="w-full h-full transform -rotate-90">
                              <circle cx="32" cy="32" r="28" fill="none" stroke="#1e293b" strokeWidth="6" />
                              <motion.circle 
                                cx="32" cy="32" r="28" 
                                fill="none" 
                                stroke="#3b82f6" 
                                strokeWidth="6" 
                                strokeDasharray="176"
                                animate={{ strokeDashoffset: 176 - (176 * (healthScore/100)) }}
                              />
                           </svg>
                           <span className="absolute inset-0 flex items-center justify-center text-xs font-black font-mono">{healthScore.toFixed(0)}%</span>
                        </div>
                        <p className="text-lg font-black font-mono">STABLE</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Distribution</h5>
                     <div className="flex flex-wrap gap-1.5">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div 
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                            className="w-4 h-4 rounded-sm bg-blue-500/50 border border-blue-500/30"
                          />
                        ))}
                     </div>
                  </div>
               </div>

               {/* Logs */}
               <div className="mt-6 bg-black/50 rounded-3xl p-6 font-mono text-[9px] space-y-2 border border-slate-800">
                  <p className="text-slate-500"><span className="text-emerald-500">[OK]</span> HEALTH_CHECK: Verification successful.</p>
                  <p className="text-slate-500"><span className="text-blue-500">[SYS]</span> EVENT: Scaling resources for load.</p>
                  <p className="text-slate-500"><span className="text-amber-500">[WRN]</span> MEMORY: Capacity threshold warning.</p>
               </div>

               <div className="flex gap-4 mt-8">
                  <button className="flex-1 py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                     Analytics
                  </button>
                  <button className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all">
                     System Status
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObservabilityMissionControl;

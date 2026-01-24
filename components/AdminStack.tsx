
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOOLS_STACK } from '../constants';

const OrbitTool: React.FC<{ 
  name: string; 
  radius: number; 
  angle: number; 
  duration: number; 
  delay: number;
  isActive: boolean;
  onHover: (active: boolean) => void;
}> = ({ name, radius, angle, duration, delay, isActive, onHover }) => {
  return (
    <motion.div
      initial={{ rotate: angle }}
      animate={{ rotate: angle + 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay
      }}
      className="absolute top-1/2 left-1/2"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
    >
      <motion.div
        animate={{ rotate: -(angle + 360) }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div 
          className="group relative"
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        >
          {/* Connecting Line to Center (Visible on Hover) */}
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: radius, opacity: 0.2 }}
                exit={{ height: 0, opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 w-px bg-blue-600 origin-top pointer-events-none"
                style={{ transform: 'rotate(0deg)' }}
              />
            )}
          </AnimatePresence>

          {/* Tool Node */}
          <div className={`
            w-12 h-12 bg-white border rounded-2xl flex items-center justify-center p-2 
            transition-all duration-500 cursor-crosshair relative z-20
            ${isActive ? 'border-blue-600 shadow-2xl scale-125 -translate-y-1' : 'border-slate-100 shadow-sm scale-100'}
          `}>
            <span className={`text-[7px] font-black uppercase tracking-tighter text-center leading-none ${isActive ? 'text-blue-600' : 'text-slate-900'}`}>
              {name}
            </span>
          </div>

          {/* Minimal Tooltip */}
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 pointer-events-none z-50"
              >
                <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap shadow-2xl border border-slate-800">
                  {name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdminStack: React.FC = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <section className="py-48 bg-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 border border-slate-900 rounded-full scale-[1.5]"></div>
        <div className="absolute inset-0 border border-slate-900 rounded-full scale-[2.0]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-32 items-center">
          <div className="space-y-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Enterprise Infrastructure</span>
                <div className="h-px bg-slate-100 flex-1"></div>
              </div>
              
              <h3 className="text-6xl md:text-8xl font-[900] tracking-tighter leading-[0.9] text-slate-950">
                Stack <br />
                <span className="text-slate-400">Dynamics.</span>
              </h3>
              
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-sm">
                Visualizing the orbital logic of a sovereign enterprise stack. I build systems where tools don't just exist—they interact with <span className="text-slate-950 font-bold italic">clinical precision</span>.
              </p>
            </div>
            
            <div className="grid gap-8">
              {TOOLS_STACK.map((group, i) => (
                <div key={group.category} className="flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    0{i+1}
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-1">{group.category}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                      Governing {group.items.length} critical infrastructure endpoints.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 flex items-center gap-6">
               <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Systems Active</span>
               </div>
            </div>
          </div>

          <div className="relative aspect-square flex items-center justify-center">
            {/* Center Core: The Architecture Nucleus */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative z-30 w-40 h-40 bg-slate-950 rounded-[3rem] flex items-center justify-center text-white shadow-[0_40px_100px_-20px_rgba(15,23,42,0.4)] border border-slate-800 group"
            >
              <div className="text-center space-y-1">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500 mb-1 opacity-60">Operations</div>
                <div className="text-2xl font-black tracking-tighter leading-none">CORE</div>
              </div>
              
              {/* Outer Core Aura */}
              <motion.div 
                animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 bg-blue-600 rounded-[3rem] -z-10"
              />
              <motion.div 
                animate={{ scale: [1, 1.1], opacity: [0.1, 0.05] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                className="absolute -inset-8 border border-blue-500/20 rounded-[4rem] -z-20"
              />
            </motion.div>

            {/* Orbital Paths (Thin Slate Rings) */}
            {[200, 300, 400].map((radius, i) => (
              <div 
                key={i} 
                className="absolute rounded-full border border-slate-100 border-dashed"
                style={{ width: radius * 2, height: radius * 2, opacity: 1 - i * 0.2 }}
              />
            ))}

            {/* tool mapping with specific radii and orbital logic */}
            {TOOLS_STACK.map((group, groupIdx) => {
              const radius = 200 + groupIdx * 100;
              return group.items.map((item, itemIdx) => {
                const angle = (itemIdx / group.items.length) * 360;
                // Faster orbits closer to center
                const duration = 25 + groupIdx * 15; 
                
                return (
                  <OrbitTool 
                    key={item}
                    name={item}
                    radius={radius}
                    angle={angle}
                    duration={duration}
                    delay={groupIdx * 3 + itemIdx}
                    isActive={hoveredTool === item}
                    onHover={(active) => setHoveredTool(active ? item : null)}
                  />
                );
              });
            })}

            {/* Abstract Radial Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/5 rounded-full blur-[120px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminStack;


import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from './shared/SectionLabel';
import { trackProjectClick } from '../utils/analytics';


const Sparkline: React.FC<{ data: number[]; color?: string }> = ({ data, color = "text-blue-600" }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 30;

  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((val - min) / range) * height
  }));

  const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} `;

  return (
    <div className="w-full h-8 flex items-end">
      <svg viewBox={`0 0 ${width} ${height} `} className="w-full h-full overflow-visible">
        <motion.path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={color}
        />
      </svg>
    </div>
  );
};

const Work: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Automation' | 'Systems' | 'Governance' | 'Finance'>('All');

  const counts = useMemo(() => ({
    All: PROJECTS.length,
    Automation: PROJECTS.filter(p => p.category === 'Automation').length,
    Systems: PROJECTS.filter(p => p.category === 'Systems').length,
    Governance: PROJECTS.filter(p => p.category === 'Governance').length,
    Finance: PROJECTS.filter(p => p.category === 'Finance').length,
  }), []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeFilter as any);
  }, [activeFilter]);

  const filterOptions: ('All' | 'Automation' | 'Systems' | 'Governance' | 'Finance')[] = ['All', 'Automation', 'Systems', 'Governance', 'Finance'];

  return (
    <section id="work" className="py-32 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
              <SectionLabel>Enterprise Proof</SectionLabel>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>
            <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-900">
              Case <span className="text-slate-400">Studies.</span>
            </h2>
          </div>

          <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pb-2">
            <nav role="tablist" className="inline-flex items-center bg-slate-100/50 p-1 rounded-[1.25rem] border border-slate-200/40">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`group relative flex items - center gap - 2 px - 6 py - 2.5 rounded - [1rem] transition - all duration - 300 whitespace - nowrap outline - none ${activeFilter === filter ? 'text-white' : 'text-slate-500 hover:text-slate-900'
                    } `}
                >
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.1em]">{filter}</span>
                  {activeFilter === filter && (
                    <motion.div layoutId="activeFilter" className="absolute inset-0 bg-slate-900 rounded-[1rem] z-0 shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="group cursor-pointer"
                onClick={() => {
                  trackProjectClick({
                    projectName: project.title,
                    projectCategory: project.category
                  });
                  window.location.hash = "#/work/" + project.id;
                }}

              >
                <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-3 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden rounded-[1.8rem] relative bg-slate-50">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-1.5">{project.category} • {project.client}</p>
                    <h4 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-6">{project.title}</h4>

                    <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-6 rounded-3xl mt-auto">
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2">Impact</p>
                        <p className="text-sm font-black text-slate-900 mb-2">{project.impact}</p>
                        {project.performanceData && <Sparkline data={project.performanceData} />}
                      </div>
                      <div className="flex flex-col justify-end">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">Full Audit Record →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Work;

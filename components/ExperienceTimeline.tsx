
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import SectionLabel from './shared/SectionLabel';

const ExperienceNode: React.FC<{
  exp: any;
  index: number;
  isActive: boolean;
  onClick: () => void
}> = ({ exp, index, isActive, onClick }) => {
  return (
    <div className="relative pl-20 md:pl-40 pb-16 last:pb-0">
      {/* 
        Mathematically Centered Vertical Rail 
      */}
      <div
        className="absolute top-0 bottom-0 w-px bg-slate-200 overflow-hidden"
        style={{ left: 'var(--timeline-center)' }}
      >
        <div className="relative h-full w-full -translate-x-1/2">
          {isActive && (
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '100%' }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-full h-32 bg-gradient-to-b from-transparent via-blue-600 to-transparent"
            />
          )}
        </div>
      </div>

      {/* 
        Mathematically Centered Stepper Indicator 
      */}
      <button
        onClick={onClick}
        className={`absolute top-1 w-8 h-8 rounded-full border flex items-center justify-center z-10 transition-all duration-500 bg-white group focus:outline-none -translate-x-1/2 ${isActive ? 'border-blue-600 shadow-lg shadow-blue-500/10' : 'border-slate-300 hover:border-blue-500'
          }`}
        style={{ left: 'var(--timeline-center)' }}
      >
        <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-blue-600 scale-125' : 'bg-slate-300 group-hover:bg-blue-600'}`}></div>
      </button>

      <div className="transition-all duration-500">
        <div className="flex flex-col gap-6">
          {/* Header Block */}
          <div className="space-y-1">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <h3
                onClick={onClick}
                className="text-2xl md:text-3xl font-[900] text-slate-900 tracking-tighter leading-none cursor-pointer hover:text-blue-600 transition-colors"
              >
                {exp.role}
              </h3>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                {exp.period}
              </span>
            </div>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
              {exp.company}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-2 pb-8 space-y-10">
                  {/* Responsibilities */}
                  <ul className="grid gap-5">
                    {exp.description.map((item: string, dIdx: number) => (
                      <li key={dIdx} className="flex gap-4 items-start group/li">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0 opacity-60"></span>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>

                  {/* Redesigned Signature Spotlight Node */}
                  <div className="relative pl-10">
                    {/* Vertical Logic Accent */}
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-600 to-slate-200 rounded-full"></div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Primary Institutional Asset</span>
                          <span className="h-px bg-slate-100 flex-1"></span>
                        </div>
                        <h4 className="text-3xl md:text-5xl font-[900] tracking-tighter text-slate-900 leading-[1.05]">
                          {exp.systemBuilt}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Efficiency Gain</p>
                          <p className="text-xl font-black text-slate-900 tracking-tight">{exp.cumulativeAsset}</p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</p>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <p className="text-xs font-black uppercase text-slate-900 tracking-wider">Operational</p>
                          </div>
                        </div>

                        <button
                          onClick={() => window.location.hash = '#/contact'}
                          className="mt-2 md:mt-0 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
                        >
                          Request Unredacted Logs →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ExperienceTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section
      id="experience"
      className="py-32 bg-white relative [--timeline-center:40px] md:[--timeline-center:80px]"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24 space-y-6">
          <div className="flex items-center gap-4">
            <SectionLabel>Professional Record</SectionLabel>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>
          <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-none text-slate-900">
            Career Path.
          </h2>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
            A strategic chronicle of executive support and systems engineering, mapping high-impact tenure and organizational transformation.
          </p>
        </div>

        <div className="max-w-4xl">
          {EXPERIENCES.map((exp, idx) => (
            <ExperienceNode
              key={idx}
              exp={exp}
              index={idx}
              isActive={activeIndex === idx}
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;


import React from 'react';
import { motion } from 'framer-motion';
import { SUCCESS_STORIES } from '../constants';
import BentoCard from './shared/BentoCard';
import SectionLabel from './shared/SectionLabel';

const OutcomeCard: React.FC<{ story: any; index: number }> = ({ story, index }) => {
  return (
    <BentoCard
      variant="compact"
      hoverEffect="border"
      animationDelay={index * 0.1}
      showPattern={false}
      className="h-full"
    >
      {/* Client Identity */}
      <header className="flex items-center gap-5 mb-10 pb-8 border-b border-slate-50">
        <div className="w-12 h-12 rounded-xl bg-slate-50 p-2 border border-slate-100 group-hover:bg-blue-600 transition-colors duration-500 flex items-center justify-center shrink-0">
          <img
            src={story.logo}
            alt={`${story.clientName} logo`}
            width={128}
            height={128}
            className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:brightness-0 group-hover:invert transition-all duration-500"
          />
        </div>
        <div>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">{story.clientName}</h4>
          <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">{story.industry}</p>
        </div>
      </header>

      {/* Logic Narrative */}
      <div className="flex-1 space-y-10">
        <div className="space-y-3">
          <SectionLabel as="h5" variant="secondary" className="tracking-[0.3em]">Institutional Friction</SectionLabel>
          <p className="text-base text-slate-600 font-medium leading-relaxed italic">
            "{story.challenge}"
          </p>
        </div>

        <div className="space-y-3">
          <SectionLabel as="h5" className="tracking-[0.3em]">Remediation Architecture</SectionLabel>
          <p className="text-base text-slate-900 font-bold leading-relaxed">
            {story.solution}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6">
          {story.metrics.map((metric: any, mIdx: number) => (
            <div key={mIdx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 group-hover:bg-blue-50/50 transition-colors">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{metric.label}</p>
              <p className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Outcome Footer */}
      <footer className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Audit Verified</span>
        </div>
        <button
          onClick={() => window.location.hash = '#/work'}
          className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-slate-900 transition-colors"
        >
          View Record →
        </button>
      </footer>
    </BentoCard>
  );
};

const SuccessStories: React.FC = () => {
  return (
    <section id="success-stories" className="py-32 bg-white relative overflow-hidden">
      {/* Minimal Background Asset */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px)', backgroundSize: '33.33% 100%' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
              <SectionLabel>Performance Records</SectionLabel>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>

            <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-950">
              Enterprise <br />
              <span className="text-slate-400">Outcomes.</span>
            </h2>

            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
              Unredacted remediation reports of my latest administrative builds, focusing on clinical precision and reclaimed operational capital.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2 shrink-0 pb-4">
            <span className="mono text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Status</span>
            <div className="flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-10 h-1.5 bg-blue-600 rounded-full"></div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story, idx) => (
            <OutcomeCard
              key={story.id}
              story={story}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

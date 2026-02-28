import React from 'react';
import { motion } from 'framer-motion';
import { SUCCESS_STORIES } from '../constants';
import SectionLabel from './shared/SectionLabel';
import OptimizedImage from './OptimizedImage';
import { SuccessStory } from '../types';

const OutcomeCard: React.FC<{ story: SuccessStory; index: number }> = ({ story, index }) => {
  // Map industry to specific icons for minimalist variety
  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'Executive Operations':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Medical Operations':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'Distribution and Supply Chain':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <motion.a
      href="/work"
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState({}, '', '/work');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo(0, 0);
      }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative block h-full bg-white border border-slate-200/60 rounded-[1.5rem] p-8 transition-all duration-300 hover:border-slate-300/80 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)]"
    >
      {/* Icon - Standard Premium Pattern */}
      <div className="mb-8">
        <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 [&>svg]:stroke-slate-700 [&>svg]:transition-all [&>svg]:duration-300 group-hover:[&>svg]:stroke-white group-hover:[&>svg]:scale-110">
          {getIndustryIcon(story.industry)}
        </div>
      </div>

      {/* Content Stack */}
      <div className="space-y-6 mb-8">
        {/* Client & Industry */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-1">
            {story.clientName}
          </h3>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.15em] leading-none">
            {story.industry}
          </p>
        </div>

        <div className="space-y-4">
          {/* Operational Risk */}
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">
              Operational Risk
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {story.operationalRisk}
            </p>
          </div>

          {/* System Built */}
          <div className="pt-4 border-t border-slate-100/60">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">
              System Built
            </p>
            <p className="text-sm text-slate-900 leading-snug font-bold">
              {story.systemBuilt}
            </p>
          </div>

          {/* Measured Outcome */}
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">
              Outcome
            </p>
            <p className="text-sm text-slate-900 leading-relaxed font-bold">
              {story.measuredOutcome}
            </p>
          </div>
        </div>
      </div>

      {/* Footer - Minimalist Result Label */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
            Verified Record
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300 group-hover:text-blue-600">
          <span>Explore</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Subtle hover indicator */}
      <div className="absolute top-6 right-6 w-1 h-1 rounded-full bg-slate-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.a>
  );
};

const SuccessStories: React.FC = () => {
  return (
    <section id="success-stories" className="py-16 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-4 mb-8">
            <SectionLabel>Enterprise Outcomes</SectionLabel>
            <div className="h-px bg-slate-100 flex-1" />
          </div>

          <h1 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-900 mb-8">
            Proven <br />
            <span className="text-slate-400">Impact.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl">
            Real-world systems that solved critical operational problems—proven results with verified metrics.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUCCESS_STORIES.map((story, idx) => (
            <OutcomeCard key={story.id} story={story} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

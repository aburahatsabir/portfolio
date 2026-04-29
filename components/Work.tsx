import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from './shared/SectionLabel';
import { trackProjectClick } from '../utils/analytics';
import OptimizedImage from './OptimizedImage';
import { getWorkRoutePath } from '../content/work-route-titles';

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const Work: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Automation' | 'Systems' | 'Governance' | 'Finance'>('All');

  const counts = useMemo(
    () => ({
      All: PROJECTS.length,
      Automation: PROJECTS.filter((p) => p.category === 'Automation').length,
      Systems: PROJECTS.filter((p) => p.category === 'Systems').length,
      Governance: PROJECTS.filter((p) => p.category === 'Governance').length,
      Finance: PROJECTS.filter((p) => p.category === 'Finance').length,
    }),
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const filterOptions: ('All' | 'Automation' | 'Systems' | 'Governance' | 'Finance')[] = [
    'All',
    'Automation',
    'Systems',
    'Governance',
    'Finance',
  ];

  const openProject = (project: (typeof PROJECTS)[number]) => {
    const projectPath = getWorkRoutePath(project.id) ?? `/work/${project.id}`;

    trackProjectClick({
      projectName: project.title,
      projectCategory: project.category,
    });
    window.history.pushState({}, '', projectPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="work" className="py-16 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24"
        >
          <motion.div variants={revealVariants} className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
              <SectionLabel>Institutional Outcomes</SectionLabel>
              <div className="h-px bg-slate-100 flex-1" />
            </div>
            <h1 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-900">
              Enterprise <br />
              <span className="text-slate-400">Records.</span>
            </h1>
          </motion.div>

          <motion.div variants={revealVariants} className="w-full lg:w-auto">
            <nav
              role="tablist"
              className="inline-flex items-center bg-slate-100/50 p-1 rounded-[1.25rem] border border-slate-200/40"
            >
              {filterOptions.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`group relative flex items-center gap-2 px-6 py-2.5 rounded-[1rem] transition-all duration-300 whitespace-nowrap outline-none ${activeFilter === filter ? 'text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.1em]">
                    {filter}
                  </span>

                  {activeFilter === filter && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-slate-900 rounded-[1rem] z-0 shadow-lg shadow-slate-900/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={revealVariants}
                className="group cursor-pointer h-full"
                role="link"
                tabIndex={0}
                aria-label={`View full case study and audit record for ${project.title}`}
                onClick={() => openProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProject(project);
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-[1.5rem] bg-white border border-slate-200/60 shadow-sm group-hover:shadow-xl group-hover:border-slate-300/80 transition-all duration-500 h-full flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden relative bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200/60">
                    <OptimizedImage
                      src={project.image}
                      srcSet={`${project.image.replace('.webp', '-600w.webp')} 600w, ${project.image.replace('.webp', '-900w.webp')} 900w, ${project.image.replace('.webp', '-1140w.webp')} 1140w, ${project.image.replace('.webp', '-1920w.webp')} 1920w`}
                      sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) calc(50vw - 36px), calc(33.33vw - 40px)"
                      alt={project.title}
                      width={1920}
                      height={1048}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-[9px] text-slate-400">&bull;</span>
                      <span className="text-[9px] font-medium text-slate-500">{project.client}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 line-clamp-2">
                      {project.title}
                    </h3>

                    {project.relevantFor && project.relevantFor.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                        {project.relevantFor.slice(0, 3).map((persona) => (
                          <span
                            key={persona}
                            className="text-[8px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-semibold uppercase tracking-wide"
                          >
                            {persona}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Impact</p>
                          <p className="text-sm font-bold text-slate-900 truncate">{project.impact}</p>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 group-hover:text-blue-600 transition-all duration-300 ml-3 flex-shrink-0">
                          <span className="text-[9px] font-bold uppercase tracking-wider hidden sm:inline">Case Study</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;

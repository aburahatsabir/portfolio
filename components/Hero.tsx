

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackContactCTA } from '../utils/analytics';
import SectionLabel from './shared/SectionLabel';

interface HeroContent {
  index: string;
  image: string;
  title: React.JSX.Element;
  subhead?: string;
  description: string;
  statLabel: string;
  statValue: string;
  statUnit: string;
}

const Hero: React.FC = () => {
  const [activeMandate, setActiveMandate] = useState<'sovereignty' | 'efficiency'>('sovereignty');

  const content: Record<'sovereignty' | 'efficiency', HeroContent> = {
    sovereignty: {
      index: "01",
      image: "./images/hero/Abu Rahat Hero 01.webp",
      title: <>Engineering <br /><span className="text-blue-700">Institutional</span> <br />Sovereignty.</>,
      description: "I design self-governing operations infrastructure for organizations that refuse to hire their way out of inefficiency—eliminating the 'Human-Bridge' debt between silos.",
      statLabel: "Tenure in Operations",
      statValue: "6+",
      statUnit: "Years"
    },
    efficiency: {
      index: "02",
      image: "./images/hero/Abu Rahat Hero 02.webp",
      title: <>Reclaiming <br /><span className="text-blue-700">Operational</span> <br />Capital.</>,
      description: "I architect operational systems that eliminate administrative overhead—reclaiming executive time while your processes run flawlessly without constant supervision.",
      statLabel: "Average Efficiency",
      statValue: "90%",
      statUnit: "Gain"
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    },
    tap: { scale: 0.98 }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-40 pb-20 overflow-hidden bg-white selection:bg-blue-700 selection:text-white">
      {/* Sophisticated Background Architecture */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.3]"></div>
        <div className="absolute top-0 right-0 w-[45%] h-full bg-slate-50/50 border-l border-slate-100 hidden lg:block"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 w-full"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
          <div className="relative z-10 space-y-8 lg:space-y-10">
            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4"
              >
                <div className="inline-flex p-1 bg-white/50 backdrop-blur-xl border border-slate-100 rounded-xl relative overflow-hidden group/toggle max-w-fit">
                  {/* High-Precision Indicator */}
                  <div className="absolute inset-1 w-[calc(50%-4px)] h-[calc(100%-8px)] pointer-events-none">
                    <motion.div
                      layoutId="mandate-active"
                      initial={false}
                      animate={{
                        x: activeMandate === 'sovereignty' ? 0 : '100%',
                        marginLeft: activeMandate === 'sovereignty' ? 0 : '8px'
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 40, mass: 0.8 }}
                      className="absolute inset-0 bg-slate-900 rounded-lg shadow-2xl shadow-slate-900/20"
                    />
                  </div>

                  <button
                    onClick={() => setActiveMandate('sovereignty')}
                    className="relative px-6 py-2 transition-all duration-300 z-10"
                  >
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] font-mono transition-colors duration-500 ${activeMandate === 'sovereignty' ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                      Sovereignty
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveMandate('efficiency')}
                    className="relative px-6 py-2 transition-all duration-300 z-10"
                  >
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] font-mono transition-colors duration-500 ${activeMandate === 'efficiency' ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                      Efficiency
                    </span>
                  </button>
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMandate}
                  initial={{ opacity: 0, x: -15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <h1 className="text-6xl md:text-8xl lg:text-[105px] font-[900] tracking-[-0.04em] leading-[0.88] text-slate-900">
                    {content[activeMandate].title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">
                    {content[activeMandate].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-8">
              <a
                href="/contact"
                onClick={() => trackContactCTA({
                  location: 'hero_section',
                  conversionType: 'contact_form',
                  label: 'free_audit_cta'
                })}
                className="w-full sm:w-auto relative group active:scale-[0.97] transition-transform duration-200"
              >
                {/* Sophisticated Glow Layer */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative px-14 py-6 bg-slate-950 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all duration-300 border border-white/5 overflow-hidden">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                  <span className="relative z-10">Start Discussion</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </div>
              </a>

              <a
                href="/work"
                className="w-full sm:w-auto group relative flex items-center justify-center active:scale-[0.98] transition-transform"
              >
                <div className="relative px-12 py-6 bg-white border border-slate-100 rounded-xl font-black text-[11px] uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 flex items-center justify-center transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200">
                  <span className="relative z-10">Case Studies</span>
                </div>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-12 border-t border-slate-100 flex flex-wrap items-center gap-x-10 gap-y-6">
              <SectionLabel variant="muted">Core Expertise</SectionLabel>
              <div className="flex gap-8">
                {['Automation', 'Optimization', 'Integration'].map(name => (
                  <div key={name} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                    <span className="text-[11px] font-black text-slate-900 tracking-tight">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Architectural Frame */}
            <div className="absolute -inset-10 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <motion.div
              className="relative z-10 p-2 bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.08)] border border-slate-100 group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-50">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={content[activeMandate].image}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={content[activeMandate].image}
                    alt={`Abu Rahat Sabir - ${activeMandate}`}
                    width={800}
                    height={1000}
                    fetchPriority="high"
                    loading="eager"
                    className="w-full h-full object-cover grayscale brightness-[1.05] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  />
                </AnimatePresence>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Telemetry Node - Premium Card */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-4 z-20"
              >
                <div className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={content[activeMandate].statLabel}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                      >
                        {content[activeMandate].statLabel}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={content[activeMandate].statValue}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl font-black text-white tracking-tight"
                      >
                        {content[activeMandate].statValue}
                      </motion.p>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={content[activeMandate].statUnit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[9px] font-semibold uppercase text-blue-400 tracking-[0.108em]"
                      >
                        {content[activeMandate].statUnit}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

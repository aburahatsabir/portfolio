
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackContactCTA } from '../utils/analytics';


const Hero: React.FC = () => {
  const [activeMandate, setActiveMandate] = useState<'sovereignty' | 'efficiency'>('sovereignty');

  const content = {
    sovereignty: {
      image: "./images/hero/Abu Rahat Hero 01.webp",
      title: <>Engineering <br /><span className="text-blue-700">Institutional</span> <br />Sovereignty.</>,
      description: "I design self-healing administrative systems for leaders who demand precision. My work at Prominent Tec eliminates the 'Human-Bridge' debt between silos.",
      statLabel: "Tenure in Operations",
      statValue: "6+",
      statUnit: "Years"
    },
    efficiency: {
      image: "./images/hero/Abu Rahat Hero 02.webp",
      title: <>Reclaiming <br /><span className="text-blue-700">Operational</span> <br />Capital.</>,
      description: "Optimizing executive operations through VBA and Apps Script. I turn 6-hour closing cycles into 30-minute automated validations.",
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
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
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-white selection:bg-blue-700 selection:text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.4]"></div>
      <div className="absolute top-0 right-0 w-[45%] h-full bg-slate-50/70 -z-10 border-l border-slate-200/50 hidden lg:block"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 w-full"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
          <div className="relative z-10 space-y-12">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-blue-700 shadow-[0_0_10px_rgba(29,78,216,0.4)]"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Systems Strategy
              </p>
            </motion.div>

            <div className="space-y-8">
              <motion.div variants={itemVariants} className="flex gap-3">
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setActiveMandate('sovereignty')}
                  className={`relative overflow-hidden text-[10px] font-black uppercase tracking-[0.2em] px-7 py-3.5 rounded-xl transition-all border ${activeMandate === 'sovereignty'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xl shadow-slate-900/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                    }`}
                >
                  Sovereignty
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setActiveMandate('efficiency')}
                  className={`relative overflow-hidden text-[10px] font-black uppercase tracking-[0.2em] px-7 py-3.5 rounded-xl transition-all border ${activeMandate === 'efficiency'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xl shadow-slate-900/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                    }`}
                >
                  Efficiency
                </motion.button>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMandate}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-6xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-900 mb-8">
                    {content[activeMandate].title}
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl">
                    {content[activeMandate].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-5">
              <a
                href="#/contact"
                onClick={() => trackContactCTA({
                  location: 'hero_section',
                  conversionType: 'contact_form',
                  label: 'lets_talk_cta'
                })}
                className="w-full sm:w-auto px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-95"
              >
                Let's Talk
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>

              <a
                href="#/work"
                className="w-full sm:w-auto px-12 py-6 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center justify-center active:scale-95"
              >
                Case Studies
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-12 border-t border-slate-200 flex items-center gap-10 opacity-60">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Core Expertise</p>
              <div className="flex gap-10">
                {['Excel VBA', 'Apps Script', 'Workflow Design'].map(name => (
                  <span key={name} className="text-sm font-black text-slate-900">{name}</span>
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
            <div className="absolute -inset-10 bg-blue-700/5 blur-[100px] rounded-full pointer-events-none"></div>

            <motion.div
              className="relative z-10 p-5 bg-white rounded-[4.5rem] shadow-[0_60px_100px_-20px_rgba(15,23,42,0.1)] border border-slate-200/60 group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3.8rem] bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={content[activeMandate].image}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={content[activeMandate].image}
                    alt={`Abu Rahat Sabir - ${activeMandate === 'sovereignty' ? 'Engineering Institutional Sovereignty' : 'Reclaiming Operational Capital'}`}
                    width={800}
                    height={1000}
                    fetchPriority="high"
                    loading="eager"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] brightness-[1.02] group-hover:scale-[1.02]"
                  />
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-10 p-0.5 bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl z-20 overflow-hidden"
              >
                <div className="px-8 py-6 rounded-[1.9rem] flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={content[activeMandate].statLabel}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-500"
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
                        className="text-4xl font-black text-white tracking-tighter"
                      >
                        {content[activeMandate].statValue}
                      </motion.p>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={content[activeMandate].statUnit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[8px] font-black uppercase text-blue-500 tracking-[0.2em]"
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

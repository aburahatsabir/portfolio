import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EDUCATION } from '../constants';
import { generateAvatar } from '../utils/avatar-generator';
import BentoCard from './shared/BentoCard';
import SectionLabel from './shared/SectionLabel';
import OptimizedImage from './OptimizedImage';


const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void; index: string }> = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <div className={`group transition-all duration-500 border-l-2 ${isOpen ? 'bg-slate-50/50 border-blue-600' : 'border-transparent hover:bg-slate-50/30'}`}>
      <button
        type="button"
        onClick={onClick}
        className="w-full py-6 px-6 flex items-start justify-between text-left"
      >
        <div className="flex gap-6">
          <span className="text-[10px] font-mono font-bold text-slate-300 pt-1.5">{index}</span>
          <h4 className={`text-base md:text-lg font-bold tracking-tight leading-tight transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
            {question}
          </h4>
        </div>
        <div className="pt-1 select-none">
          <span className={`text-2xl leading-none font-light transition-all duration-300 inline-block ${isOpen ? 'text-blue-600 rotate-0' : 'text-slate-300'}`}>
            {isOpen ? '−' : '+'}
          </span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-[4.5rem] pr-10 text-[14px] md:text-[15px] text-slate-500 font-medium leading-relaxed max-w-2xl whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AboutProps {
  showStrategicPillars?: boolean;
}

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

const About: React.FC<AboutProps> = ({ showStrategicPillars = true }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Who are you?",
      answer: "Abu Rahat Sabir—an operations architect who translates executive intent into stable infrastructure. I've spent 7+ years at Prominent Tec and Dreams IT building systems that eliminate operational friction. I provide international, C-suite grade support that scales with your growth."
    },
    {
      question: "What can you build?",
      answer: "Bespoke 'internal engines' for FMCG, Healthcare, and Finance. I build end-to-end automation for invoicing, payroll, and reporting using tools you already own (Excel, Google Workspace). Results: 80% faster processing and zero-error reliability with no recurring license costs."
    },
    {
      question: "How do you work?",
      answer: "Through 'Silent Architecture.' I observe your existing workflows for 3-5 days, then deploy a non-disruptive prototype within 2 weeks. Everything is built for handoff: full documentation and 90-day post-launch support. You own the code, the logic, and the results."
    },
    {
      question: "What results do you deliver?",
      answer: "I turn weeks of administrative work into hours of automated precision. I've recovered 15% in previously leaked revenue and reduced 5-day payroll cycles to 2 hours. My systems stay stable for years, stopping revenue leakage and surfacing hidden operational profits."
    },
    {
      question: "Why hire you?",
      answer: "I bridge the gap between 'messy' manual reality and boardroom expectations. Unlike bloated enterprise software, my solutions are lightweight, zero-cost, and built specifically for your governance needs. I don't just fix spreadsheets; I build institutional stability."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div>
          <div className="max-w-3xl mb-20">
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <SectionLabel>Profile</SectionLabel>
                <div className="h-px bg-slate-100 flex-1" />
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="grid lg:grid-cols-2 gap-16 items-end"
          >
            {/* Left: Name + Descriptor */}
            <motion.div variants={revealVariants} className="space-y-10">
              <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-900">
                Abu Rahat <br />
                <span className="text-slate-400">Sabir.</span>
              </h2>

              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl">
                Operations architect specializing in <span className="text-slate-900 font-bold">institutional stability</span> and bespoke automation that eliminates operational friction.
              </p>
            </motion.div>

            {/* Right: Structured Metadata (Profile 02 Telemetry Style) */}
            <motion.div
              variants={revealVariants}
              className="flex flex-wrap gap-x-14 gap-y-10 lg:justify-end pb-4 max-w-xs ml-auto"
            >
              <div className="space-y-2 group/meta">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover/meta:text-blue-600 transition-colors">Location</p>
                <p className="text-base font-black text-slate-900 tracking-tight">Dhaka, BD</p>
              </div>
              <div className="space-y-2 group/meta">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover/meta:text-blue-600 transition-colors">Tenure</p>
                <p className="text-base font-black text-slate-900 tracking-tight">7+ Years</p>
              </div>
              <div className="space-y-2 group/meta">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover/meta:text-blue-600 transition-colors">Status</p>
                <div className="flex items-center gap-2">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                  <p className="text-base font-black text-slate-900 tracking-tight">Active</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Integrated Architectural Grid: Sections 01 & 02 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-slate-100 mt-20 relative group/grid">
          {/* Section Vertical Axis */}
          <div className="absolute left-[41.666%] top-0 bottom-0 w-px bg-slate-100 hidden lg:block"></div>

          {/* Section 01: Academic Ledger (6 Columns) */}
          <div className="lg:col-span-6 pt-16 pb-16 lg:pr-14 border-b lg:border-b-0 border-slate-100">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="space-y-12"
            >
              <motion.div variants={revealVariants} className="space-y-6">
                <div className="flex items-center gap-3">
                  <SectionLabel variant="secondary">GOVERNANCE</SectionLabel>
                </div>
                <h3 className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-none">
                  Academic <br />Registry.
                </h3>
              </motion.div>

              <motion.div variants={revealVariants} className="py-2">
                <div className="grid grid-cols-12 gap-6 mb-8 pb-4 border-b border-slate-100/50">
                  <div className="col-span-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Cycle</div>
                  <div className="col-span-9 text-[9px] font-black text-slate-400 uppercase tracking-widest">Credential</div>
                </div>

                <div className="space-y-8">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-6 items-start group/ledger">
                      <div className="col-span-3 pt-1">
                        <span className="text-[11px] font-black text-slate-900/40 tracking-tight group-hover/ledger:text-blue-700 transition-colors">[{edu.year}]</span>
                      </div>
                      <div className="col-span-9">
                        <h4 className="text-lg font-black text-slate-900 tracking-tight mb-0.5 group-hover/ledger:text-blue-700 transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-[13px] font-bold text-slate-400 tracking-tight">{edu.school}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Section 02: Strategic Methodology (6 Columns) */}
          <div className="lg:col-span-6 pt-16 pb-16 lg:pl-14">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="space-y-12"
            >
              <motion.div variants={revealVariants} className="space-y-6">
                <div className="flex items-center gap-3">
                  <SectionLabel variant="secondary">METHODOLOGY</SectionLabel>
                </div>
                <h3 className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-none">
                  Operations as <br />Infrastructure.
                </h3>
              </motion.div>

              <div className="space-y-8">
                <motion.div variants={revealVariants} className="relative pl-8 border-l-2 border-blue-700">
                  <p className="text-xl font-black text-slate-900 leading-[1.1] tracking-tight italic">
                    "If there's a more efficient way to do something, I'll find it—and if not, I'll build one."
                  </p>
                </motion.div>

                <div className="space-y-6">
                  {[
                    { id: '01', title: 'Executive Infrastructure.', desc: 'Building systems for leadership teams that convert manual overhead into automated advantage.' },
                    { id: '02', title: 'System Convergence.', desc: 'Operating at the intersection of administration and tech to outperform traditional workflows.' },
                    { id: '03', title: 'Operational Scope.', desc: 'From data systems to process redesigns—solutions that eliminate friction and multiply leverage.' }
                  ].map((item) => (
                    <motion.div variants={revealVariants} key={item.id} className="grid grid-cols-12 gap-6 group/item">
                      <div className="col-span-2 pt-1">
                        <span className="text-[11px] font-black text-blue-700 tracking-tight">{item.id} /</span>
                      </div>
                      <div className="col-span-10">
                        <p className="text-base font-bold text-slate-900 tracking-tight leading-snug mb-1">
                          {item.title}
                        </p>
                        <p className="text-[14px] font-medium text-slate-500 tracking-tight leading-relaxed max-w-sm">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>



        {/* Premium Professional Briefing Section */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <BentoCard className="md:col-span-12 overflow-visible" title="" subtitle="" badge="">
            <div className="grid md:grid-cols-12 gap-12 lg:gap-24 items-start relative">
              {/* Left Column: Briefing Meta */}
              <div className="md:col-span-4 space-y-10 lg:sticky lg:top-10">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 bg-blue-700"></div>
                      <SectionLabel variant="secondary">Briefing</SectionLabel>
                    </div>
                    <div className="h-px bg-slate-100 flex-1"></div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Executive FAQ</p>
                    <h4 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter leading-[1.1]">
                      Operational <br />
                      <span className="text-slate-400">Briefing.</span>
                    </h4>
                  </div>

                  <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
                    Budget range, timeline, disruption risk, and ownership—decisive answers for leaders scaling operations.
                  </p>
                </div>

                <div className="pt-6">
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 hover:text-blue-700 transition-colors"
                  >
                    <span>Start Discussion</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Column: Inquiry Nodes */}
              <div className="md:col-span-8 -mt-2">
                <div className="border-t border-slate-100">
                  {faqs.map((faq, idx) => (
                    <FAQItem
                      key={idx}
                      index={`0${idx + 1}`}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFaqIndex === idx}
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>
        </motion.div>
      </div>

      {/* Structural Animation Definitions */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default About;

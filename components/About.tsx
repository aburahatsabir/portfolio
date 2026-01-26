import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EDUCATION } from '../constants';
import { generateAvatar } from '../utils/avatar-generator';
import BentoCard from './shared/BentoCard';

const TelemetryData: React.FC<{ label: string; value: string; trend?: string }> = ({ label, value, trend }) => (
  <div className="space-y-1">
    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 font-mono">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-black text-slate-900 tracking-tighter">{value}</span>
      {trend && <span className="text-[10px] font-black text-blue-600">{trend}</span>}
    </div>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void; index: string }> = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <div className={`transition-all duration-500 ${isOpen ? 'bg-slate-50 border-y border-slate-100' : 'border-b border-slate-100 hover:bg-slate-50/50'}`}>
      <button
        onClick={onClick}
        className="w-full py-7 px-4 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-8">
          <span className="text-[11px] font-mono font-black text-slate-300 group-hover:text-blue-600 transition-colors">[{index}]</span>
          <h4 className={`text-lg font-bold tracking-tight leading-tight transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
            {question}
          </h4>
        </div>
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-slate-900 border-slate-900 rotate-180' : 'border-slate-200 group-hover:border-blue-600 group-hover:bg-blue-50'}`}>
          <svg className={`w-4 h-4 transition-colors ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-20 pr-10 text-[15px] text-slate-500 font-medium leading-relaxed max-w-2xl">
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

const About: React.FC<AboutProps> = ({ showStrategicPillars = true }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Role at Prominent Tec?",
      answer: "I serve as an Executive Admin, handling C-suite operations, financial file organization, and sensitive communications. My primary value-add is the automation of slow, manual administrative processes using Excel VBA and Google Apps Script."
    },
    {
      question: "Academic background in Economics?",
      answer: "I hold a B.S.S (Honors) in Economics from National University (2023). This quantitative foundation allows me to approach organizational efficiency through a lens of statistical analysis and macroscopic logic."
    },
    {
      question: "The E-LearnEx initiative?",
      answer: "Previously, I taught ICT in Sylhet and mentored 650+ students. This led to founding E-LearnEx, a community focused on providing accessible global education resources to thousands of learners."
    }
  ];

  return (
    <section id="about" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-3xl space-y-6">
            <h1 className="sr-only">About Abu Rahat Sabir - Executive Architect</h1>
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600">Executive Identity</h2>
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.92] text-slate-900">
              Abu Rahat <br />
              <span className="text-slate-400">Sabir.</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Identity Card */}
          <BentoCard
            className="md:col-span-8"
            title="Strategic Methodology"
            subtitle="Core Philosophy"
            badge="EXECUTIVE OPERATIONS"
          >
            <div className="space-y-12">
              <p className="text-3xl font-black text-slate-900 leading-[1.1] tracking-tight">
                "If there’s a more efficient way to do something, I’ll find it—and if not, I’ll build one."
              </p>
              <div className="space-y-6 text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                <p>
                  I am Abu Rahat Sabir. Based in Gulshan, Dhaka, I work at the intersection of administration and technology. I help leadership teams move from messy, manual work to clear, reliable systems.
                </p>
                <p className="text-slate-900 font-bold border-l-4 border-blue-600 pl-6">
                  Whether you need a smarter spreadsheet, a more organised digital workspace, or a full process redesign, I bring together admin experience, teaching skills, and automation to make work feel lighter.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-10 border-t border-slate-100">
                <TelemetryData label="Students Mentored" value="650+" trend="+ verified" />
                <TelemetryData label="Time Reclaimed" value="90%" trend="Automation" />
                <TelemetryData label="B.S.S CGPA" value="3.21" />
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 font-mono">Endorsed</p>
                  <div className="text-xl font-serif italic text-slate-400 select-none">Sabir</div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Academic Profile */}
          <BentoCard
            className="md:col-span-4 bg-slate-50 border-transparent shadow-none"
            title="Education"
            subtitle="Academic Record"
          >
            <div className="space-y-10 flex flex-col h-full">
              <div className="space-y-6 flex-1">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-200 group-hover:border-blue-600 transition-colors">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-all"></div>
                    <h5 className="text-[15px] font-black text-slate-900 leading-tight">{edu.degree}</h5>
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">{edu.school} ({edu.year})</p>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Service Modalities (Strategic Pillars) */}
          {showStrategicPillars && (
            <BentoCard className="md:col-span-12" title="Engagement Models" subtitle="Strategic Pillars">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-12 rounded-[2.5rem] bg-slate-900 text-white group/mod relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Support & Strategy</span>
                    </div>
                    <h5 className="text-3xl font-black tracking-tighter">Executive Operations.</h5>
                    <p className="text-base text-slate-400 font-medium leading-relaxed max-w-sm">
                      Calendar and meeting management, travel logistics, and board materials organised into repeatable systems.
                    </p>
                  </div>
                </div>

                <div className="p-12 rounded-[2.5rem] bg-blue-600 text-white group/mod relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">System Design</span>
                    </div>
                    <h5 className="text-3xl font-black tracking-tighter">Workflow Automation.</h5>
                    <p className="text-base text-blue-50 font-medium leading-relaxed max-w-sm">
                      Reducing error-prone copy-paste via Excel, Google Sheets, and Apps Script automations that fit your team.
                    </p>
                  </div>
                </div>
              </div>
            </BentoCard>
          )}

          {/* Premium Professional Briefing Section */}
          <BentoCard className="md:col-span-12 overflow-visible" title="" subtitle="" badge="">
            <div className="grid md:grid-cols-12 gap-12 lg:gap-24 items-start relative">
              {/* Left Column: Briefing Meta */}
              <div className="md:col-span-4 space-y-10 lg:sticky lg:top-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Technical Inquiries</p>
                    <h4 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-tight">Professional <br />Briefing</h4>
                  </div>

                  <p className="text-[15px] text-slate-500 font-medium leading-relaxed max-w-xs">
                    Direct clarifications from Abu Rahat Sabir on administrative engagement, data governance, and system integrity standards.
                  </p>
                </div>

                <div className="pt-4">
                  <a
                    href="#/contact"
                    className="group relative w-full lg:w-fit px-12 py-6 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-600 transition-all active:scale-95 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                    <span className="relative z-10">Initiate Discussion</span>
                    <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                <div className="pt-8 border-t border-slate-100 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={generateAvatar({ name: i === 1 ? 'MR' : i === 2 ? 'SK' : 'DL', background: '0f172a', color: 'fff' })}
                          alt={`Endorsement from ${i === 1 ? 'Executive Partner' : i === 2 ? 'Operations Director' : 'C-Suite Member'}`}
                          width={256}
                          height={256}
                        />
                      </div>
                    ))}

                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trusted by C-Suite Partners</p>
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

                <div className="mt-8 p-6 bg-blue-50/30 rounded-[2rem] border border-blue-100/30 flex items-center justify-between gap-6 group cursor-pointer hover:bg-blue-50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-xs font-bold text-slate-600">Require an unredacted system audit for your entity?</p>
                  </div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:underline">Inquire →</span>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
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

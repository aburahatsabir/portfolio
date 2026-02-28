import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCES } from '../content/experiences';
import SectionLabel from './shared/SectionLabel';

interface ExperienceCardProps {
    exp: typeof EXPERIENCES[0];
    index: number;
    isActive: boolean;
    onClick: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, index, isActive, onClick }) => {
    return (
        <div className="relative pl-20 md:pl-40 pb-16 last:pb-0">
            {/* Timeline line */}
            <div
                className="absolute top-0 bottom-0 w-px bg-slate-200 overflow-hidden"
                style={{ left: 'var(--timeline-center)' }}
            >
                <div className="relative h-full w-full -translate-x-1/2">
                    {isActive && (
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: '100%' }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            className="w-full h-32 bg-gradient-to-b from-transparent via-blue-600 to-transparent"
                        />
                    )}
                </div>
            </div>

            {/* Timeline dot */}
            <button
                type="button"
                onClick={onClick}
                aria-label={`View details for ${exp.role} at ${exp.company}, ${exp.period}`}
                className={`absolute top-1 w-8 h-8 rounded-full border flex items-center justify-center z-10 transition-all duration-500 bg-white group focus:outline-none -translate-x-1/2 ${isActive
                    ? 'border-blue-600 shadow-lg shadow-blue-500/10'
                    : 'border-slate-300 hover:border-blue-500'
                    }`}
                style={{ left: 'var(--timeline-center)' }}
            >
                <div
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive
                        ? 'bg-blue-600 scale-125'
                        : 'bg-slate-300 group-hover:bg-blue-600'
                        }`}
                />
            </button>

            {/* Content */}
            <div className="transition-all duration-500">
                <div className="flex flex-col gap-6">
                    {/* Header */}
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

                    {/* Expanded Content */}
                    <AnimatePresence mode="wait">
                        {isActive && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="pt-2 pb-6">
                                    {/* Description List */}
                                    <ul className="grid gap-4">
                                        {exp.description.map((desc, i) => (
                                            <li key={i} className="flex gap-4 items-start">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0 opacity-60" />
                                                <p className="text-base text-slate-600 font-medium leading-relaxed">
                                                    {desc}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>

                                    {exp.metrics && exp.metrics.length > 0 && (
                                        <div className="mt-8 grid grid-cols-2 gap-4">
                                            {exp.metrics.map((metric, i) => (
                                                <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group/metric">
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{metric.label}</p>
                                                    <p className="text-xl font-black text-slate-900 group-hover/metric:text-blue-600 transition-colors">{metric.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
            className="py-16 md:py-32 bg-white relative [--timeline-center:40px] md:[--timeline-center:80px]"
        >
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mb-24 space-y-6">
                    <div className="flex items-center gap-4">
                        <SectionLabel>Professional Record</SectionLabel>
                        <div className="h-px bg-slate-100 flex-1" />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-none text-slate-900">
                        Career Path.
                    </h2>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                        A strategic chronicle of executive support and systems engineering, mapping
                        high-impact tenure and organizational transformation.
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-4xl">
                    {EXPERIENCES.map((exp, i) => (
                        <ExperienceCard
                            key={i}
                            exp={exp}
                            index={i}
                            isActive={activeIndex === i}
                            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { trackContactCTA } from '../utils/analytics';
import SectionLabel from './shared/SectionLabel';

const SovereigntyEfficiencyCTA: React.FC = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

    const cardVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section className="py-24 md:py-40 bg-white relative overflow-hidden">
            {/* Architectural Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.4]"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                className="max-w-[1400px] mx-auto px-6 relative z-10"
            >
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 md:mb-32">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <SectionLabel variant="secondary">Core Mandates</SectionLabel>
                            <div className="h-px bg-slate-200 w-24" />
                        </div>
                        <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.9] text-slate-900">
                            Sovereignty &<br />
                            <span className="text-slate-400">Efficiency.</span>
                        </h2>
                    </div>
                    <div className="md:max-w-xs md:mb-4">
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">
                            Two foundational pillars of institutional excellence. Select a mandate to explore the architectural approach.
                        </p>
                    </div>
                </div>

                {/* Dual Card System */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
                    {/* Sovereignty Card - Dark/Command */}
                    <motion.div
                        variants={cardVariants}
                        onMouseEnter={() => setHoveredCard('sovereignty')}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="group relative h-[600px] md:h-[700px] flex flex-col justify-between p-10 md:p-14 rounded-[2.5rem] bg-slate-950 text-white overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-slate-900/50 hover:scale-[1.01]"
                    >
                        {/* Background Atmospherics */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950"></div>
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                        {/* Top Content */}
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-12">
                                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800/50 backdrop-blur-md">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgb(59,130,246)] animate-pulse"></span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">01 // Control</span>
                                </div>
                                <svg className={`w-8 h-8 text-slate-700 transition-all duration-500 ${hoveredCard === 'sovereignty' ? 'rotate-45 text-white scale-110' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1] mb-6 group-hover:translate-x-2 transition-transform duration-500">
                                Institutional<br />Sovereignty.
                            </h3>
                            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-sm group-hover:text-slate-300 transition-colors duration-500">
                                Eliminate external dependencies. Build a self-correcting, autonomous infrastructure that you own completely.
                            </p>
                        </div>

                        {/* Telemetry/Data Graphic */}
                        <div className="relative z-10 mt-auto pt-12 border-t border-slate-800/50">
                            <div className="grid grid-cols-2 gap-8 mb-10">
                                <div>
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Dependency</div>
                                    <div className="flex items-end gap-2">
                                        <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: "100%" }}
                                                whileInView={{ width: "0%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                                className="h-full bg-red-500"
                                            />
                                        </div>
                                        <span className="text-xs font-mono text-slate-500">0%</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Ownership</div>
                                    <div className="flex items-end gap-2">
                                        <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                                className="h-full bg-blue-500 shadow-[0_0_10px_rgb(59,130,246)]"
                                            />
                                        </div>
                                        <span className="text-xs font-mono text-blue-400">100%</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <a
                                    href="/contact"
                                    onClick={() => trackContactCTA({ location: 'sovereignty_card', conversionType: 'contact_form' })}
                                    className="group/btn inline-flex items-center justify-between w-full px-8 py-6 bg-white text-slate-950 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-50 transition-all duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                                >
                                    <span>Establish Sovereignty</span>
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Efficiency Card - Light/Speed */}
                    <motion.div
                        variants={cardVariants}
                        onMouseEnter={() => setHoveredCard('efficiency')}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="group relative h-[600px] md:h-[700px] flex flex-col justify-between p-10 md:p-14 rounded-[2.5rem] bg-slate-50 border border-slate-200 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-slate-200 hover:scale-[1.01]"
                    >
                        {/* Background Atmospherics */}
                        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.3]"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        {/* Top Content */}
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-12">
                                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-[pulse_2s_infinite]"></span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">02 // Velocity</span>
                                </div>
                                <svg className={`w-8 h-8 text-slate-300 transition-all duration-500 ${hoveredCard === 'efficiency' ? '-rotate-12 text-indigo-600 scale-110' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1] text-slate-900 mb-6 group-hover:translate-x-2 transition-transform duration-500">
                                Operational<br />Efficiency.
                            </h3>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm group-hover:text-slate-800 transition-colors duration-500">
                                Reclaim executive time. Automate friction. Deploy systems that run faster than human intervention allows.
                            </p>
                        </div>

                        {/* Telemetry/Data Graphic */}
                        <div className="relative z-10 mt-auto pt-12 border-t border-slate-200">
                            <div className="flex justify-between items-end mb-10">
                                <div>
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">Time Reclaimed</div>
                                    <div className="text-6xl font-black text-slate-900 tracking-tighter">
                                        90%
                                    </div>
                                </div>
                                <div className="h-16 flex items-end gap-1.5">
                                    {[20, 35, 50, 65, 80, 45, 60, 90, 75, 100].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: "10%" }}
                                            whileInView={{ height: `${h}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: i * 0.05 + 0.5 }}
                                            className="w-1.5 bg-indigo-500 rounded-t-sm opacity-20 group-hover:opacity-100 transition-opacity"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <a
                                    href="/contact"
                                    onClick={() => trackContactCTA({ location: 'efficiency_card', conversionType: 'contact_form' })}
                                    className="group/btn inline-flex items-center justify-between w-full px-8 py-6 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-200"
                                >
                                    <span>Maximize Efficiency</span>
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default SovereigntyEfficiencyCTA;

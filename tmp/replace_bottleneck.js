const fs = require('fs');

let content = fs.readFileSync('components/PersonaSpecificContent.tsx', 'utf-8');

const metricsTarget = `            {/* 02: PERFORMANCE INDEX (METRICS) */}
            <section className="border-b border-slate-200/60 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/60">
                        {persona.metrics.map((metric, i) => (
                            <div key={i} className="py-12 md:py-16 px-4 md:px-8 group hover:bg-[#FBFBFA] transition-colors duration-700 flex flex-col justify-center">
                                <span className="mono text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 group-hover:text-blue-600 transition-colors duration-500">
                                    {metric.label}
                                </span>
                                <span className="text-4xl md:text-5xl font-[900] text-slate-900 text-tighter tabular-nums">
                                    {metric.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>`;

const metricsReplacement = `            {/* SECTION 02: PERFORMANCE INDEX (METRICS) */}
            <section className="relative z-10 bg-white border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-slate-100 border-y border-slate-100">
                        {persona.metrics.map((metric, i) => (
                            <div key={i} className="bg-white py-8 md:py-10 px-4 md:px-6 group hover:bg-slate-50 transition-colors duration-500">
                                <span className="block mono text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-blue-600 transition-colors">
                                    {metric.label}
                                </span>
                                <span className="text-xl md:text-3xl font-[900] text-slate-900 text-tighter tabular-nums">
                                    {metric.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>`;

let challengeTarget = `            {/* 03: THE BOTTLENECK (CHALLENGE) */}
            {persona.problemStatement && (
                <section className="py-24 md:py-40 bg-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                            <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
                                <div className="mb-8">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">The Bottleneck</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-[900] text-tighter leading-[1.05] text-slate-900">
                                    {persona.problemStatement.title}
                                </h2>
                            </div>

                            <div className="lg:col-span-7 space-y-16">
                                <p className="text-xl md:text-3xl text-slate-500 font-medium leading-[1.6]">
                                    {persona.problemStatement.description}
                                </p>

                                {persona.painPoints && persona.painPoints.length > 0 && (
                                    <div className="space-y-12 pt-12 border-t border-slate-200/60">
                                        {persona.painPoints.map((pt, i) => (
                                            <div key={i} className="group flex flex-col gap-4">
                                                <div className="text-[10px] font-bold text-blue-600 mono tracking-[0.2em]">0{i + 1} // PAIN POINT</div>
                                                <h4 className="text-xl md:text-2xl font-[900] text-slate-900 text-tight">
                                                    {pt.title}
                                                </h4>
                                                {pt.description && (
                                                    <p className="text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
                                                        {pt.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}`;

let challengeReplacement = `            {/* SECTION 03: THE BOTTLENECK (CHALLENGE) */}
            {persona.problemStatement && (
                <section className="relative z-10 py-16 md:py-32 bg-[#FBFBFA]">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-24">
                            <div className="col-span-12 lg:col-span-5 space-y-4 md:space-y-8 lg:sticky lg:top-32 h-fit">
                                <div className="mb-4 md:mb-6">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">The Bottleneck</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-[900] text-tighter leading-[1.1] text-slate-900 max-w-full md:max-w-none pr-2 md:pr-0 lg:-mr-24 xl:-mr-32 relative z-10 w-full lg:w-[130%]">
                                    {persona.problemStatement.title}
                                </h2>
                            </div>

                            <div className="col-span-12 lg:col-span-7 space-y-6 md:space-y-12">
                                <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed">
                                    {persona.problemStatement.description}
                                </p>

                                <div className="grid gap-4 md:gap-6">
                                    {(persona.painPoints && persona.painPoints.length > 0 ? persona.painPoints : [
                                        { title: 'Fragmented Communication', description: 'Communication channels lack structure.' },
                                        { title: 'Unclear Task Ownership', description: 'Decision loops are often left open.' },
                                        { title: 'Unfiltered Urgencies', description: 'High-value time lost to operational noise.' }
                                    ]).map((pt, i) => (
                                        <div key={i} className="p-5 md:p-8 bg-white border border-slate-200/60 rounded-lg group hover:border-blue-200 transition-all duration-300">
                                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-2 flex items-center gap-3">
                                                <span className="text-blue-600">0{i + 1}</span> {pt.title}
                                            </h4>
                                            {pt.description && (
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                                    {pt.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}`;

content = content.replace(metricsTarget, metricsReplacement);
content = content.replace(challengeTarget, challengeReplacement);

fs.writeFileSync('components/PersonaSpecificContent.tsx', content);
console.log('Update Complete!');

import fs from 'fs';

const filePath = 'c:/Users/abura/portfolio/components/PersonaSpecificContent.tsx';
const content = fs.readFileSync(filePath, 'utf-8');

const splitIndex = content.indexOf('const PersonaSpecificContent: React.FC<PersonaSpecificContentProps>');
const topPart = content.substring(0, splitIndex);

const newComponent = `const PersonaSpecificContent: React.FC<PersonaSpecificContentProps> = ({ personaId }) => {
    const persona = PERSONAS[personaId];

    if (!persona) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-6">
                    <p className="mono text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Error 404</p>
                    <h1 className="text-3xl font-[900] text-slate-900 tracking-tighter">Persona Not Found</h1>
                    <a href="/" className="inline-block text-blue-600 hover:text-blue-700 text-[11px] font-bold tracking-widest uppercase border-b border-blue-600/30 pb-1">Return to Index</a>
                </div>
            </div>
        );
    }

    const relevantCaseStudies = PROJECTS.filter(p => persona.relevantCaseStudies.includes(p.id));
    const relevantTestimonials = persona.relevantTestimonials.map(idx => TESTIMONIALS[idx]);

    return (
        <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white text-slate-900 font-sans">
            
            {/* 01: HERO / EXECUTIVE BRIEFING */}
            <section className="relative pt-40 md:pt-56 pb-24 md:pb-32 border-b border-slate-200/60 bg-[#FBFBFA]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-5xl"
                    >
                        <motion.div variants={revealVariants} className="mb-12 md:mb-16">
                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Executive Briefing</span>
                        </motion.div>

                        <motion.h1 variants={revealVariants} className="text-5xl md:text-7xl lg:text-[88px] font-[900] tracking-tighter leading-[1.05] text-slate-900 mb-10">
                            {persona.headline}
                        </motion.h1>

                        <motion.p variants={revealVariants} className="text-lg md:text-2xl text-slate-500 font-medium leading-[1.6] max-w-3xl">
                            {persona.subheadline}
                        </motion.p>

                        {persona.whoThisIsFor && (
                            <motion.div variants={revealVariants} className="pt-16 mt-16 border-t border-slate-200/60 flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                                <div className="shrink-0 pt-1 text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mono">
                                    Target Focus
                                </div>
                                <div className="flex flex-wrap gap-x-8 gap-y-4">
                                    {persona.whoThisIsFor.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 bg-blue-600/80" />
                                            <span className="text-xs md:text-sm font-bold text-slate-900 tracking-tight">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* 02: PERFORMANCE INDEX (METRICS) */}
            <section className="border-b border-slate-200/60 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/60">
                        {persona.metrics.map((metric, i) => (
                            <div key={i} className="py-12 md:py-16 px-4 md:px-8 group hover:bg-[#FBFBFA] transition-colors duration-700 flex flex-col justify-center">
                                <span className="mono text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 group-hover:text-blue-600 transition-colors duration-500">
                                    {metric.label}
                                </span>
                                <span className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tighter tabular-nums">
                                    {metric.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 03: THE BOTTLENECK (CHALLENGE) */}
            {persona.problemStatement && (
                <section className="py-24 md:py-40 bg-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                            <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
                                <div className="mb-8">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">The Bottleneck</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-[900] tracking-tighter leading-[1.05] text-slate-900">
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
                                                <h4 className="text-xl md:text-2xl font-[900] text-slate-900 tracking-tight">
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
            )}

            {/* 04: RESOLUTION ARCHITECTURE (SOLUTION) */}
            <section className="py-24 md:py-40 bg-[#FBFBFA] border-y border-slate-200/60">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                            <div className="mb-8">
                                <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Resolution</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-[900] tracking-tighter leading-[1.05] text-slate-900 mb-8">
                                {persona.solution.title}
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-[1.6]">
                                {persona.solution.description}
                            </p>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="border-t border-slate-200/60 flex flex-col">
                                {(persona.pillars || []).map((pillar, i) => (
                                    <div key={i} className="py-12 md:py-16 border-b border-slate-200/60 group">
                                        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                                            <div className="md:col-span-4">
                                                <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase block mb-4 group-hover:text-blue-600 transition-colors duration-500">
                                                    Pillar 0{i + 1}
                                                </span>
                                                <h3 className="text-2xl font-[900] text-slate-900 tracking-tight">
                                                    {pillar.title}
                                                </h3>
                                            </div>
                                            <div className="md:col-span-8 space-y-8">
                                                <p className="text-base text-slate-500 font-medium leading-[1.7]">
                                                    {pillar.positioning}
                                                </p>
                                                <ul className="space-y-4">
                                                    {pillar.outcomes.map((outcome, j) => (
                                                        <li key={j} className="flex items-start gap-4">
                                                            <div className="w-1.5 h-1.5 bg-blue-600/40 mt-2 shrink-0 group-hover:bg-blue-600 transition-colors duration-500" />
                                                            <span className="text-sm font-bold text-slate-900 tracking-tight leading-relaxed">
                                                                {outcome}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {!persona.pillars && persona.solution.features.map((feature, i) => (
                                    <div key={i} className="py-8 border-b border-slate-200/60 flex items-center justify-between group">
                                        <div className="flex items-center gap-6">
                                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em]">0{i + 1}</span>
                                            <span className="text-lg md:text-xl font-[900] text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-500">{feature}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 05: OPERATING PROTOCOL */}
            {persona.operatingModel && (
                <section className="py-24 md:py-40 bg-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200/60 pb-12">
                            <div>
                                <div className="mb-6">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Operating Protocol</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-[900] tracking-tighter leading-[1.05] text-slate-900">
                                    Execution Rhythm.
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200/60 border border-slate-200/60">
                            {persona.operatingModel.map((item, i) => (
                                <div key={i} className="p-8 md:p-10 space-y-8 group hover:bg-[#FBFBFA] transition-colors duration-500 relative overflow-hidden">
                                    <span className="mono text-[10px] font-bold text-slate-300 tracking-[0.2em]">STEP 0{i + 1}</span>
                                    <div>
                                        <h3 className="text-lg font-[900] text-slate-900 tracking-tight mb-4">
                                            {item.step}
                                        </h3>
                                        <p className="text-sm text-slate-500 font-medium leading-[1.6]">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {persona.compatibility && (
                            <div className="mt-32 pt-32 border-t border-slate-200/60">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
                                    <div className="md:col-span-12 lg:col-span-5 space-y-12">
                                        <div className="flex items-center gap-4">
                                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Governance</span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-[900] tracking-tighter leading-[1.05] text-slate-900">
                                            Operating <br />
                                            <span className="text-slate-400">Architecture.</span>
                                        </h2>
                                        <p className="text-2xl md:text-3xl font-[900] text-slate-900 tracking-tighter leading-[1.2] italic relative pl-8 border-l-2 border-blue-600/30">
                                            "{typeof persona.compatibility === 'object' ? persona.compatibility.statement : persona.compatibility}"
                                        </p>
                                    </div>

                                    <div className="md:col-span-12 lg:col-span-7">
                                        {typeof persona.compatibility === 'object' && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16">
                                                {persona.compatibility.environments.map((env, i) => (
                                                    <div key={i} className="space-y-8">
                                                        <div className="pb-6 border-b border-slate-200/60">
                                                            <h4 className="text-xs font-bold text-slate-900 tracking-[0.1em] uppercase">
                                                                {env.name}
                                                            </h4>
                                                        </div>
                                                        <ul className="space-y-5">
                                                            {env.attributes.map((attr, j) => (
                                                                <li key={j} className="flex items-start gap-4">
                                                                    <div className="w-1.5 h-1.5 bg-slate-200 mt-2 shrink-0 group-hover:bg-blue-600 transition-colors duration-500" />
                                                                    <span className="text-sm font-medium text-slate-600 leading-[1.6]">
                                                                        {attr}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 06: PRODUCTION EVIDENCE (CASE STUDIES) */}
            {relevantCaseStudies.length > 0 && (
                <section className="py-24 md:py-40 bg-[#FBFBFA] border-y border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12">
                            <div>
                                <div className="mb-6">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">The Ledger</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-[900] tracking-tighter leading-[1.05] text-slate-900">
                                    Production Evidence.
                                </h2>
                            </div>
                        </div>

                        <div className="border-t border-slate-200/60 flex flex-col">
                            {relevantCaseStudies.map((project, i) => (
                                <a
                                    key={project.id}
                                    href={\`/work/\${project.id}\`}
                                    className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-10 md:py-16 border-b border-slate-200/60 items-start lg:items-center hover:bg-white transition-all duration-700 md:-mx-12 md:px-12"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.history.pushState({}, '', \`/work/\${project.id}\`);
                                        window.dispatchEvent(new PopStateEvent('popstate'));
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    <div className="lg:col-span-2">
                                        <span className="mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600 transition-colors duration-500">
                                            {project.category}
                                        </span>
                                    </div>
                                    <div className="lg:col-span-6">
                                        <h3 className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tighter group-hover:pl-4 transition-all duration-500">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <div className="lg:col-span-3">
                                        <p className="text-sm text-slate-500 font-medium leading-[1.6] line-clamp-2">
                                            {project.headline}
                                        </p>
                                    </div>
                                    <div className="hidden lg:flex lg:col-span-1 justify-end">
                                        <div className="w-10 h-10 border border-slate-200/60 flex items-center justify-center group-hover:border-blue-600 transition-colors duration-500">
                                            <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 07: FIELD REFERENCES (SECTORS) */}
            {persona.caseReferences && (
                <section className="py-24 md:py-40 bg-white border-b border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                            <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-8">
                                <div className="mb-6">
                                    <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Field References</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-[900] tracking-tighter leading-[1.05] text-slate-900">
                                    Delivered in Practice.
                                </h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-[1.8] pt-8 border-t border-slate-200/60">
                                    Sector-level transparency. Client identity protected by NDA.
                                </p>
                            </div>

                            <div className="lg:col-span-8 flex flex-col">
                                {persona.caseReferences.map((ref, i) => (
                                    <div key={i} className="py-12 md:py-16 border-b border-slate-200/60 group first:border-t-0 border-t lg:first:border-t lg:first:pt-16">
                                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
                                            <span className="text-xs font-bold text-slate-900 uppercase tracking-[0.1em]">{ref.sector}</span>
                                            <span className="mono text-[9px] text-slate-300 font-bold tracking-[0.2em]">REF/0{i + 1}</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-12">
                                            <div className="space-y-6">
                                                <span className="mono text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block">The Challenge</span>
                                                <p className="text-base text-slate-500 font-medium leading-[1.7]">{ref.challenge}</p>
                                            </div>
                                            <div className="space-y-6">
                                                <span className="mono text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] block">The Outcome</span>
                                                <p className="text-base text-slate-900 font-bold leading-[1.7]">{ref.outcome}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 08: SOVEREIGNTY (DIFFERENTIATION) */}
            {(persona.differentiation || persona.toolStack) && (
                <section className="py-24 md:py-40 bg-[#FBFBFA]">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                            {persona.differentiation && (
                                <div className="lg:col-span-6 space-y-12">
                                    <div className="space-y-6">
                                        <div className="mb-8">
                                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">The Differential</span>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-[900] tracking-tighter leading-[1.05] text-slate-900">
                                            {persona.differentiation.title}
                                        </h3>
                                    </div>
                                    <p className="text-lg md:text-xl text-slate-500 font-medium leading-[1.7] pl-8 border-l-2 border-slate-200/60 italic">
                                        {persona.differentiation.description}
                                    </p>
                                </div>
                            )}

                            {persona.toolStack && (
                                <div className="lg:col-span-6 space-y-12">
                                    <div className="space-y-6">
                                        <div className="mb-8">
                                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Technical Sovereignty</span>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-[900] tracking-tighter leading-[1.05] text-slate-900">
                                            {persona.toolStack.title}
                                        </h3>
                                    </div>
                                    <div className="grid gap-6">
                                        {persona.toolStack.items.map((item, i) => {
                                            const [title, desc] = item.split(':');
                                            return (
                                                <div key={i} className="pb-6 border-b border-slate-200/60 group">
                                                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.1em] mb-3 block">{title}</span>
                                                    <p className="text-sm text-slate-500 font-medium leading-[1.6]">{desc}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* 09: VALIDATION (TESTIMONIALS) */}
            {relevantTestimonials.length > 0 && (
                <section className="py-24 md:py-40 bg-white border-y border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="mb-16 md:mb-24 text-center">
                            <span className="mono text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Validation Protocol</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                            {relevantTestimonials.map((testimonial, i) => (
                                <div key={i} className="space-y-12 group flex flex-col">
                                    <p className="text-2xl md:text-3xl text-slate-900 font-[900] tracking-tighter leading-[1.3] italic flex-1">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center gap-6 pt-10 border-t border-slate-200/60">
                                        <div className="w-14 h-14 bg-slate-100 flex-shrink-0">
                                            <OptimizedImage
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                width={56}
                                                height={56}
                                                className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 tracking-tight uppercase">{testimonial.name}</div>
                                            <div className="mono text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">{testimonial.position}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 10: DEPLOYMENT (CTA) */}
            <section className="py-32 md:py-48 bg-[#FBFBFA]">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-16">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-4 bg-white px-5 py-3 border border-slate-200/60">
                            <span className="w-1.5 h-1.5 bg-blue-600 animate-pulse" />
                            <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">Available for Engagement</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl lg:text-[88px] font-[900] tracking-tighter text-slate-900 leading-[1.05]">
                            {persona.finalStatement || 'I am the infrastructure that allows you to lead.'}
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
                        <a
                            href={persona.cta.primaryLink}
                            className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-500 text-center"
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState({}, '', persona.cta.primaryLink);
                                window.dispatchEvent(new PopStateEvent('popstate'));
                                window.scrollTo(0, 0);
                            }}
                        >
                            {persona.cta.primary}
                        </a>
                        <a
                            href={persona.cta.secondaryLink}
                            className="w-full sm:w-auto px-12 py-5 bg-white border border-slate-200/60 text-slate-500 font-bold text-[11px] uppercase tracking-[0.2em] hover:border-slate-900 hover:text-slate-900 transition-all duration-500 text-center"
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState({}, '', persona.cta.secondaryLink);
                                window.dispatchEvent(new PopStateEvent('popstate'));
                                window.scrollTo(0, 0);
                            }}
                        >
                            {persona.cta.secondary}
                        </a>
                    </div>

                    <div className="pt-24 mt-24 border-t border-slate-200/60">
                        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">
                            Established in Dhaka. Operating Worldwide.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PersonaSpecificContent;`

const finalContent = topPart + newComponent;
fs.writeFileSync(filePath, finalContent, 'utf-8');
console.log('Update Complete!');

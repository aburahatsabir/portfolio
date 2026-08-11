import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowUpRight,
    Award,
    BadgeCheck,
    BookOpenCheck,
    BriefcaseBusiness,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Code2,
    Database,
    LayoutGrid,
    Palette,
    Search,
    Users,
    X,
} from 'lucide-react';
import { CERTIFICATES, Certificate, CertificateCategory, CertificateType } from '../content/certificates';
import SectionLabel from './shared/SectionLabel';
import { trackCustomEvent } from '../utils/analytics';

const revealVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.045,
        },
    },
};

const GoogleLogo = () => (
    <svg className="h-6 md:h-7 w-auto fill-current text-white" viewBox="0 0 272 92" aria-label="Google">
        <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
        <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
        <path d="M209.75 26.34v41.02c0 16.89-9.99 23.78-21.75 23.78-11.09 0-17.65-7.48-20.17-13.61l8.57-3.57c1.51 3.61 5.21 7.9 11.6 7.9 7.65 0 12.44-4.71 12.44-13.61v-3.36h-.34c-2.27 2.77-6.64 5.29-12.18 5.29-11.51 0-21.68-10.08-21.68-22.02 0-12.02 10.17-22.18 21.68-22.18 5.55 0 9.92 2.52 12.18 5.21h.34v-3.87h9.33zm-8.82 21.01c0-7.82-5.21-13.44-11.93-13.44-6.81 0-12.52 5.63-12.52 13.44 0 7.73 5.71 13.44 12.52 13.44 6.72 0 11.93-5.71 11.93-13.44z"/>
        <path d="M225 3v65h-9.5V3h9.5z"/>
        <path d="M262.02 54.49l7.56 5.04c-2.44 3.61-8.32 9.83-18.49 9.83-12.6 0-22.02-9.83-22.02-22.18 0-13.19 9.5-22.18 20.92-22.18 11.51 0 17.14 9.16 18.91 14.12l.92 2.44-29.41 12.18c2.27 4.45 5.79 6.72 10.76 6.72 4.96 0 8.4-2.44 10.75-5.97zm-22.77-7.98l19.66-8.15c-1.09-2.77-4.29-6.72-9.16-6.72-5.88 0-10.67 4.71-10.5 14.87z"/>
        <path d="M35.29 41.59v11.75H56.7c-1.68 5.46-6.47 16.05-21.41 16.05-12.94 0-23.36-10.67-23.36-23.87S22.35 21.65 35.29 21.65c7.39 0 12.35 3.11 15.21 5.8l9.24-9.24C53.77 12.61 45.29 8 35.29 8 15.79 8 0 23.79 0 43.29s15.79 35.29 35.29 35.29c20.34 0 33.87-14.3 33.87-34.46 0-2.44-.25-4.29-.59-6.13H35.29z"/>
    </svg>
);

const MicrosoftLogo = () => (
    <div className="flex items-center gap-2 font-bold tracking-tight text-xl md:text-2xl text-white" aria-label="Microsoft">
        <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0" viewBox="0 0 23 23">
            <path fill="#f25022" d="M1 1h10v10H1z"/>
            <path fill="#7fba00" d="M12 1h10v10H1z"/>
            <path fill="#00a4ef" d="M1 12h10v10H1z"/>
            <path fill="#ffb900" d="M12 12h10v10H1z"/>
        </svg>
        <span>Microsoft</span>
    </div>
);

const MetaLogo = () => (
    <div className="flex items-center gap-2 font-bold tracking-tight text-xl md:text-2xl text-white" aria-label="Meta">
        <svg className="w-6 h-6 md:w-7 md:h-7 shrink-0 fill-current text-white" viewBox="0 0 24 24">
            <path d="M17.472 4.048c-2.457 0-4.607 1.258-6.155 3.125-1.547-1.867-3.697-3.125-6.155-3.125-4.241 0-7.662 3.421-7.662 7.662 0 4.887 4.294 9.176 10.428 12.062 1.092.513 2.686.513 3.778 0 6.134-2.886 10.428-7.175 10.428-12.062 0-4.241-3.421-7.662-7.662-7.662zm-6.155 17.065c-4.996-2.39-8.487-5.918-8.487-9.403 0-2.613 2.118-4.731 4.731-4.731 2.38 0 4.348 1.761 4.673 4.068.084.597.595 1.042 1.198 1.042s1.114-.445 1.198-1.042c.325-2.307 2.293-4.068 4.673-4.068 2.613 0 4.731 2.118 4.731 4.731 0 3.485-3.491 7.013-8.487 9.403-.687.329-1.543.329-2.23 0z"/>
        </svg>
        <span>Meta</span>
    </div>
);

const IBMLogo = () => (
    <div className="flex items-center text-white" aria-label="IBM">
        <svg className="h-6 md:h-7 w-auto fill-current" viewBox="0 0 100 40">
            <path d="M0 4h30v5H0zM0 11h30v5H0zM0 18h30v5H0zM0 25h30v5H0zM0 32h30v5H0zM35 4h30v5H35zM35 11h30v5H35zM35 18h30v5H35zM35 25h30v5H35zM35 32h30v5H35zM70 4h30v5H70zM70 11h30v5H70zM70 18h30v5H70zM70 25h30v5H70zM70 32h30v5H70z"/>
        </svg>
    </div>
);

const FILTER_OPTIONS: Array<'All' | CertificateCategory> = [
    'All',
    'Data',
    'Technical',
    'Business',
    'Design',
    'Leadership',
];

const CERTIFICATES_PER_PAGE = 30;

const CATEGORY_ICONS: Record<'All' | CertificateCategory, React.ReactNode> = {
    All: <LayoutGrid aria-hidden="true" />,
    Data: <Database aria-hidden="true" />,
    Technical: <Code2 aria-hidden="true" />,
    Business: <BriefcaseBusiness aria-hidden="true" />,
    Design: <Palette aria-hidden="true" />,
    Leadership: <Users aria-hidden="true" />,
};

const CERT_TYPE_LABELS: Record<CertificateType, string> = {
    professional: 'Professional Certificate',
    specialization: 'Specialization',
    course: 'Course Certificate',
};

const TYPE_ORDER: Record<CertificateType, number> = {
    professional: 0,
    specialization: 1,
    course: 2,
};

const CERTIFICATE_RELEVANCE_RANK: Record<string, number> = {
    'microsoft-it-support': 1,
    'google-it-support': 2,
    'datacamp-ai-engineer-developers-associate': 3,
    'datacamp-ai-engineer-data-scientists-associate': 4,
    'datacamp-data-engineer-associate': 5,
    'google-cloud-data-analytics': 6,
    'machine-learning-python': 7,
    'datacamp-data-scientist-associate': 8,
    'ibm-data-management': 9,
    'datacamp-data-analyst-associate': 10,
    'google-data-analytics': 11,
    'ibm-data-analyst': 12,
    'meta-data-analyst': 13,
    'python-basics-data-science': 14,
    'version-control-git': 15,
    'html-css-javascript-web': 16,
    'ibm-data-analytics-excel-r': 17,
    'excel-data-analytics-visualization': 18,
    'excel-business-forecasting': 19,
    'excel-skills-business': 20,
    'agile-atlassian-jira': 21,
    'introduction-to-linux': 22,
    'ai-for-everyone': 23,
    'career-success': 24,
    'english-communication-skills': 25,
    'understanding-modern-finance': 26,
    'udemy-photoshop-beginner-pro': 27,
};

const getPlatformLogoAlt = (certificate: Certificate) => {
    const logoPath = certificate.platformLogo.toLowerCase();
    if (logoPath.includes('coursera')) return 'Coursera logo';
    if (logoPath.includes('datacamp')) return 'DataCamp logo';
    if (logoPath.includes('edx')) return 'edX logo';
    if (logoPath.includes('udemy')) return 'Udemy logo';
    if (logoPath.includes('linkedin')) return 'LinkedIn Learning logo';
    return `${certificate.platform} logo`;
};

const getPlatformLogoClass = (certificate: Certificate) => {
    const logoPath = certificate.platformLogo.toLowerCase();
    if (logoPath.includes('datacamp')) return 'cert-logo--datacamp';
    if (logoPath.includes('edx')) return 'cert-logo--edx';
    if (logoPath.includes('udemy')) return 'cert-logo--udemy';
    if (logoPath.includes('linkedin')) return 'cert-logo--linkedin';
    return 'cert-logo--coursera';
};

const getRibbonLabel = (certificate: Certificate) => {
    if (certificate.certType === 'course') return null;
    if (certificate.platform === 'DataCamp') return 'Certification Exam';

    return CERT_TYPE_LABELS[certificate.certType];
};

const getCertificateFacts = (certificate: Certificate) => {
    if (certificate.platform === 'DataCamp') {
        return [
            { type: 'time' as const, label: '2hr' },
            { type: 'course' as const, label: '30 day' },
        ];
    }

    const facts: Array<{ type: 'time' | 'course'; label: string }> = [];

    if (certificate.hours) {
        facts.push({ type: 'time', label: `${certificate.hours}hrs` });
    }

    if (certificate.courses) {
        facts.push({ type: 'course', label: `${certificate.courses} courses` });
    } else if (certificate.certType === 'course') {
        facts.push({ type: 'course', label: '1 course' });
    }

    return facts;
};

const getCompletionYear = (certificate: Certificate) => {
    return new Date(certificate.completionDate).getFullYear();
};

const getPaginationItems = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, 'ellipsis-end', totalPages] as const;
    }

    if (currentPage >= totalPages - 3) {
        return [1, 'ellipsis-start', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
    }

    return [1, 'ellipsis-start', currentPage - 1, currentPage, currentPage + 1, 'ellipsis-end', totalPages] as const;
};

const Certifications: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<'All' | CertificateCategory>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const counts = useMemo(() => {
        const categoryCounts: Record<'All' | CertificateCategory, number> = {
            All: CERTIFICATES.length,
            Data: 0,
            Technical: 0,
            Business: 0,
            Design: 0,
            Leadership: 0,
        };

        CERTIFICATES.forEach((cert) => {
            categoryCounts[cert.category] += 1;
        });

        return categoryCounts;
    }, []);

    const filteredCertificates = useMemo(() => {
        const searchLower = searchQuery.trim().toLowerCase();

        return CERTIFICATES
            .filter((cert) => {
                const matchesFilter = activeFilter === 'All' || cert.category === activeFilter;
                const matchesSearch =
                    !searchLower ||
                    cert.name.toLowerCase().includes(searchLower) ||
                    cert.issuer.toLowerCase().includes(searchLower) ||
                    cert.platform.toLowerCase().includes(searchLower) ||
                    cert.description.toLowerCase().includes(searchLower) ||
                    cert.skills.some((skill) => skill.toLowerCase().includes(searchLower));

                return matchesFilter && matchesSearch;
            })
            .sort((a, b) => {
                const rankDiff =
                    (CERTIFICATE_RELEVANCE_RANK[a.id] ?? 999) -
                    (CERTIFICATE_RELEVANCE_RANK[b.id] ?? 999);
                if (rankDiff !== 0) return rankDiff;

                const typeDiff = TYPE_ORDER[a.certType] - TYPE_ORDER[b.certType];
                if (typeDiff !== 0) return typeDiff;

                return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
            });
    }, [activeFilter, searchQuery]);

    const stats = useMemo(() => {
        const totalHours = CERTIFICATES.reduce((sum, cert) => sum + (cert.hours || 0), 0);
        const uniqueIssuers = new Set(CERTIFICATES.map((cert) => cert.issuer)).size;
        const latestCert = [...CERTIFICATES].sort(
            (a, b) => new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime(),
        )[0];

        return {
            total: CERTIFICATES.length,
            hours: totalHours,
            issuers: uniqueIssuers,
            latest: latestCert,
        };
    }, []);

    const shouldPaginate = filteredCertificates.length > CERTIFICATES_PER_PAGE;
    const totalPages = Math.max(1, Math.ceil(filteredCertificates.length / CERTIFICATES_PER_PAGE));
    const paginatedCertificates = useMemo(() => {
        if (!shouldPaginate) return filteredCertificates;

        const startIndex = (currentPage - 1) * CERTIFICATES_PER_PAGE;
        return filteredCertificates.slice(startIndex, startIndex + CERTIFICATES_PER_PAGE);
    }, [currentPage, filteredCertificates, shouldPaginate]);
    const paginationItems = useMemo(
        () => (shouldPaginate ? getPaginationItems(currentPage, totalPages) : []),
        [currentPage, shouldPaginate, totalPages],
    );

    const handleFilterChange = (filter: 'All' | CertificateCategory) => {
        setActiveFilter(filter);
        setCurrentPage(1);
        trackCustomEvent('certifications_filter_change', {
            event_category: 'certifications',
            skill_area: filter,
        });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setCurrentPage(1);
        handleFilterChange('All');
    };

    const goToPage = (page: number) => {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    };

    return (
        <section id="certifications" className="cert-dc-page selection:bg-[#4f46e5] selection:text-white">
            <div className="cert-dc-container">
                <div className="cert-dc-hero">
                    <div style={{ fontVariantLigatures: 'none', fontFeatureSettings: '"liga" 0, "clig" 0' }}>
                        <div className="cert-dc-eyebrow">
                            <Award className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                            <SectionLabel className="!text-[16px] !font-medium !normal-case !tracking-normal !text-[#141414] !leading-[150%]">
                                Certifications
                            </SectionLabel>
                        </div>

                        <h1 className="cert-dc-title">
                            Verif&zwnj;ied <br />
                            Certif&zwnj;ications.
                        </h1>

                        <p className="cert-dc-description">
                            Industry-recognized credentials proving <strong>technical mastery</strong> across domains
                            from production-grade code to strategic execution.
                        </p>
                    </div>

                    <aside className="cert-dc-summary" aria-label="Certification portfolio summary">
                        <div className="cert-dc-summary__badge">
                            <BadgeCheck aria-hidden="true" />
                            Portfolio verified
                        </div>
                        <div className="cert-dc-summary__grid">
                            <div>
                                <span>Earned</span>
                                <strong>{stats.total}+</strong>
                            </div>
                            <div>
                                <span>Invested</span>
                                <strong>{stats.hours}hrs</strong>
                            </div>
                            <div>
                                <span>Issuers</span>
                                <strong>{stats.issuers}</strong>
                            </div>
                        </div>
                        <p className="cert-dc-summary__latest">
                            Latest: {stats.latest.name} ({getCompletionYear(stats.latest)})
                        </p>
                    </aside>
                </div>

                {/* DataCamp style Trust & Recognition Banner */}
                <div className="bg-[#4f46e5] text-white p-8 md:p-10 rounded-2xl mb-10 shadow-xl shadow-indigo-500/10 overflow-hidden relative border border-indigo-400/20" aria-label="Loved by learners at thousands of companies">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white text-center md:text-left max-w-md leading-snug">
                            Loved by learners at thousands of companies
                        </h2>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            <div className="flex items-center gap-2 opacity-95 hover:opacity-100 transition-all hover:-translate-y-0.5" title="Google">
                                <GoogleLogo />
                            </div>
                            <div className="flex items-center gap-2 opacity-95 hover:opacity-100 transition-all hover:-translate-y-0.5" title="Microsoft">
                                <MicrosoftLogo />
                            </div>
                            <div className="flex items-center gap-2 opacity-95 hover:opacity-100 transition-all hover:-translate-y-0.5" title="Meta">
                                <MetaLogo />
                            </div>
                            <div className="flex items-center gap-2 opacity-95 hover:opacity-100 transition-all hover:-translate-y-0.5" title="IBM">
                                <IBMLogo />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cert-dc-controls" aria-label="Certification search and filters">
                    <div className="cert-dc-search">
                        <Search aria-hidden="true" />
                        <label className="sr-only" htmlFor="certification-search">
                            Search certifications
                        </label>
                        <input
                            id="certification-search"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search certifications"
                        />
                        {searchQuery && (
                            <button type="button" onClick={clearSearch} aria-label="Clear search">
                                <X aria-hidden="true" />
                            </button>
                        )}
                    </div>

                    <div className="cert-dc-tabs" role="list" aria-label="Filter certifications by category">
                        {FILTER_OPTIONS.map((option) => (
                            <button
                                key={option}
                                type="button"
                                aria-pressed={activeFilter === option}
                                className={`cert-dc-tab ${activeFilter === option ? 'cert-dc-tab--active' : ''}`}
                                onClick={() => handleFilterChange(option)}
                            >
                                <span className="cert-dc-tab__icon">{CATEGORY_ICONS[option]}</span>
                                <span>{option}</span>
                                <span className="cert-dc-tab__count">{counts[option]}</span>
                            </button>
                        ))}
                    </div>

                    <div className="cert-dc-results">
                        <strong>{filteredCertificates.length}</strong>{' '}
                        {filteredCertificates.length === 1 ? 'Certification' : 'Certifications'}
                    </div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-5%' }}
                    className="cert-dc-grid"
                >
                    <AnimatePresence mode="popLayout">
                        {paginatedCertificates.map((cert) => {
                            const ribbonLabel = getRibbonLabel(cert);
                            const facts = getCertificateFacts(cert);

                            return (
                                <motion.article
                                    layout="position"
                                    key={cert.id}
                                    variants={revealVariants}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="cert-dc-card cert-card"
                                    aria-label={`${cert.name} certification`}
                                >
                                    {ribbonLabel && (
                                        <div className="cert-dc-ribbon">
                                            <Award aria-hidden="true" />
                                            {ribbonLabel}
                                        </div>
                                    )}

                                    <div className="cert-dc-card__body">
                                        <div className="cert-dc-card__top">
                                            <img
                                                src={cert.platformLogo}
                                                alt={getPlatformLogoAlt(cert)}
                                                className={`cert-logo ${getPlatformLogoClass(cert)}`}
                                            />
                                        </div>

                                        <h2 className="cert-dc-card__title">{cert.name}</h2>

                                        <div className="cert-dc-card__meta">
                                            <strong>{getCompletionYear(cert)}</strong>
                                            <span className="cert-dc-card__meta-divider" aria-hidden="true" />
                                            <span>with {cert.issuer}</span>
                                        </div>

                                        <p className="cert-dc-card__description">{cert.description}</p>

                                        {cert.skills.length > 0 && (
                                            <div className="cert-dc-skill-row" aria-label="Primary skills">
                                                {cert.skills.slice(0, 3).map((skill) => (
                                                    <span key={skill}>{skill}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="cert-dc-card__footer">
                                        {facts.length > 0 && (
                                            <div className="cert-dc-facts">
                                                {facts.map((fact) => (
                                                    <span key={`${cert.id}-${fact.label}`}>
                                                        {fact.type === 'time' ? (
                                                            <Clock3 aria-hidden="true" />
                                                        ) : (
                                                            <BookOpenCheck aria-hidden="true" />
                                                        )}
                                                        {fact.label}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {cert.credentialUrl && (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="cert-dc-link"
                                            >
                                                View Certificate
                                                <ArrowUpRight aria-hidden="true" />
                                            </a>
                                        )}
                                    </div>
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {shouldPaginate && (
                    <nav className="cert-dc-pagination" aria-label="Certification pagination">
                        <button
                            type="button"
                            className="cert-dc-pagination__arrow"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft aria-hidden="true" />
                            Previous
                        </button>

                        <div className="cert-dc-pagination__pages">
                            {paginationItems.map((item) =>
                                typeof item === 'number' ? (
                                    <button
                                        key={item}
                                        type="button"
                                        className={`cert-dc-pagination__page ${
                                            currentPage === item ? 'cert-dc-pagination__page--active' : ''
                                        }`}
                                        aria-current={currentPage === item ? 'page' : undefined}
                                        onClick={() => goToPage(item)}
                                    >
                                        {item}
                                    </button>
                                ) : (
                                    <span key={item} className="cert-dc-pagination__ellipsis" aria-hidden="true">
                                        ...
                                    </span>
                                ),
                            )}
                        </div>

                        <button
                            type="button"
                            className="cert-dc-pagination__arrow"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight aria-hidden="true" />
                        </button>
                    </nav>
                )}

                {filteredCertificates.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="cert-dc-empty"
                    >
                        <h2>No results found</h2>
                        <p>
                            We could not find any certificates matching "{searchQuery}" in the {activeFilter} category.
                        </p>
                        <button type="button" onClick={clearFilters}>
                            Reset filters
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Certifications;

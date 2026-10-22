import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
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

const FILTER_OPTIONS: Array<'All' | CertificateCategory> = [
    'All',
    'Data',
    'Technical',
    'Business',
    'Design',
    'Leadership',
];

const CERTIFICATES_PER_PAGE = 30;
const POPOVER_OPEN_DELAY_MS = 180;
const POPOVER_CLOSE_DELAY_MS = 220;
const POPOVER_GAP_PX = 14;
const POPOVER_MARGIN_PX = 16;
const POPOVER_WIDTH_PX = 340;
const LEARNING_MIN_LINES = 9;
const LEARNING_MAX_LINES = 10;
const LEARNING_APPROX_CHARS_PER_LINE = 42;
const LEARNING_TEXT_HORIZONTAL_PADDING = 61;
const LEARNING_MEASURE_FONT = '600 13px Arial, sans-serif';

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
    const logoSrc = getPlatformLogoSrc(certificate).toLowerCase();
    if (logoSrc.includes('coursera')) return 'Coursera logo';
    if (logoSrc.includes('datacamp') || logoSrc.includes('data camp')) return 'DataCamp logo';
    if (logoPath.includes('edx')) return 'edX logo';
    if (logoPath.includes('udemy')) return 'Udemy logo';
    if (logoPath.includes('linkedin')) return 'LinkedIn Learning logo';
    return `${certificate.platform} logo`;
};

const getPlatformLogoSrc = (certificate: Certificate) => {
    if (certificate.platformLogo.startsWith('/images/certificates/')) {
        return certificate.platformLogo;
    }

    return certificate.platform === 'edX'
        ? '/images/certificates/edx logo.webp'
        : '/images/certificates/coursera.webp';
};

const getPlatformLogoClass = (certificate: Certificate) => {
    const logoPath = getPlatformLogoSrc(certificate).toLowerCase();
    if (logoPath.includes('datacamp') || logoPath.includes('data camp')) return 'cert-logo--datacamp';
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

const getCredentialSource = (certificate: Certificate) => {
    return certificate.platform === 'Other' ? certificate.issuer : certificate.platform;
};

const getVisibleSkillLimit = (certificate: Certificate) => {
    if (certificate.skills.length <= 3) return certificate.skills.length;

    const contentLoad = certificate.name.length + certificate.description.length;

    if (contentLoad < 210) return Math.min(certificate.skills.length, 5);
    if (contentLoad < 245) return Math.min(certificate.skills.length, 4);

    return 3;
};

const getLearningItems = (certificate: Certificate) => {
    return certificate.whatILearned.map(finishSentence).filter(Boolean);
};

let learningMeasureContext: CanvasRenderingContext2D | null = null;

const getLearningMeasureContext = () => {
    if (typeof document === 'undefined') return null;

    if (!learningMeasureContext) {
        learningMeasureContext = document.createElement('canvas').getContext('2d');
    }

    if (learningMeasureContext) {
        learningMeasureContext.font = LEARNING_MEASURE_FONT;
    }

    return learningMeasureContext;
};

const getLearningLineCount = (learning: string, maxLineWidth?: number) => {
    const context = getLearningMeasureContext();
    if (!context || !maxLineWidth) {
        return Math.max(1, Math.ceil(learning.length / LEARNING_APPROX_CHARS_PER_LINE));
    }

    const words = learning.trim().split(/\s+/);
    let lines = 1;
    let currentLine = '';

    for (const word of words) {
        const nextLine = currentLine ? `${currentLine} ${word}` : word;

        if (context.measureText(nextLine).width > maxLineWidth && currentLine) {
            lines += 1;
            currentLine = word;
        } else {
            currentLine = nextLine;
        }
    }

    return lines;
};

const finishSentence = (text: string) => {
    const cleanText = text.trim().replace(/[,:;—-]+$/u, '');
    if (!cleanText) return '';

    return /[.!?]$/u.test(cleanText) ? cleanText : `${cleanText}.`;
};

const getConciseTakeawayCandidates = (certificate: Certificate) => {
    const category = certificate.category.toLowerCase();
    const primarySkill = certificate.skills[0];
    const secondarySkill = certificate.skills[1];
    const skillPhrase = primarySkill ? ` with ${primarySkill}` : '';
    const skillPairPhrase =
        primarySkill && secondarySkill ? `, ${primarySkill}, and ${secondarySkill}` : skillPhrase;

    return [
        certificate.keyTakeaways ? finishSentence(certificate.keyTakeaways) : '',
        finishSentence(
            `Connected ${certificate.issuer} training to practical ${category} workflows${skillPairPhrase} for job-ready execution`,
        ),
        finishSentence(`Applied ${certificate.issuer} training to practical ${category} workflows${skillPhrase}`),
        finishSentence(`Applied the credential to practical ${category} workflows`),
    ].filter(Boolean);
};

const getBestTakeawayForRemainingLines = (
    certificate: Certificate,
    remainingLines: number,
    neededLines: number,
    maxLineWidth?: number,
) => {
    const candidates = getConciseTakeawayCandidates(certificate)
        .map((item) => ({
            item,
            lineCount: getLearningLineCount(item, maxLineWidth),
        }))
        .filter(({ lineCount }) => lineCount <= remainingLines)
        .sort((a, b) => {
            const aMeetsNeed = a.lineCount >= neededLines ? 0 : 1;
            const bMeetsNeed = b.lineCount >= neededLines ? 0 : 1;
            if (aMeetsNeed !== bMeetsNeed) return aMeetsNeed - bMeetsNeed;

            return Math.abs(neededLines - a.lineCount) - Math.abs(neededLines - b.lineCount);
        });

    return candidates[0] ?? null;
};

const getVisibleLearningItems = (certificate: Certificate, maxLineWidth?: number) => {
    const visibleItems: string[] = [];
    let usedLines = 0;

    for (const learning of getLearningItems(certificate)) {
        const lineCount = getLearningLineCount(learning, maxLineWidth);
        if (usedLines + lineCount > LEARNING_MAX_LINES) break;

        visibleItems.push(learning);
        usedLines += lineCount;

        if (usedLines >= LEARNING_MIN_LINES) break;
    }

    while (usedLines < LEARNING_MIN_LINES) {
        const remainingLines = LEARNING_MAX_LINES - usedLines;
        const neededLines = LEARNING_MIN_LINES - usedLines;
        const takeaway = getBestTakeawayForRemainingLines(certificate, remainingLines, neededLines, maxLineWidth);

        if (!takeaway || visibleItems.includes(takeaway.item)) break;

        visibleItems.push(takeaway.item);
        usedLines += takeaway.lineCount;
    }

    return visibleItems;
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

const canShowLearningPopover = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return true;

    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};

const LearningPopover: React.FC<{
    certificate: Certificate;
    anchorElement: HTMLElement;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ certificate, anchorElement, onMouseEnter, onMouseLeave }) => {
    if (typeof document === 'undefined') return null;

    const anchorRect = anchorElement.getBoundingClientRect();
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    if (
        !document.body.contains(anchorElement) ||
        anchorRect.width <= 0 ||
        anchorRect.height <= 0 ||
        anchorRect.bottom <= 0 ||
        anchorRect.top >= viewportHeight - POPOVER_MARGIN_PX
    ) {
        return null;
    }

    const popoverWidth = Math.min(POPOVER_WIDTH_PX, viewportWidth - POPOVER_MARGIN_PX * 2);
    const canPlaceRight = viewportWidth - anchorRect.right >= popoverWidth + POPOVER_GAP_PX + POPOVER_MARGIN_PX;
    const placement = canPlaceRight ? 'right' : 'left';
    const left = canPlaceRight
        ? anchorRect.right + POPOVER_GAP_PX
        : Math.max(POPOVER_MARGIN_PX, anchorRect.left - popoverWidth - POPOVER_GAP_PX);
    const top = anchorRect.top;
    const learningTextWidth = Math.max(180, popoverWidth - LEARNING_TEXT_HORIZONTAL_PADDING);
    const visibleLearningItems = getVisibleLearningItems(certificate, learningTextWidth);

    return ReactDOM.createPortal(
        <motion.aside
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={
                {
                    left,
                    top,
                    height: anchorRect.height,
                    width: popoverWidth,
                    '--cert-dc-popover-gap': `${POPOVER_GAP_PX}px`,
                } as React.CSSProperties
            }
            data-side={placement}
            className="cert-dc-popover"
            aria-label={`What I learned from ${certificate.name}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="cert-dc-popover__panel">
                <div className="cert-dc-popover__eyebrow">
                    <BookOpenCheck aria-hidden="true" />
                    What I learned
                </div>

                <h3 className="cert-dc-popover__title">{certificate.name}</h3>

                <ul className="cert-dc-popover__list">
                    {visibleLearningItems.map((learning) => (
                        <li key={learning}>
                            <span>{learning}</span>
                        </li>
                    ))}
                </ul>

                {certificate.credentialUrl && (
                    <a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-dc-popover__link"
                    >
                        View Certificate
                        <ArrowUpRight aria-hidden="true" />
                    </a>
                )}
            </div>
        </motion.aside>,
        document.body,
    );
};

const Certifications: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<'All' | CertificateCategory>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [mounted, setMounted] = useState(false);
    const [learningPopover, setLearningPopover] = useState<{ cert: Certificate; anchor: HTMLElement } | null>(null);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isOverPopoverRef = useRef(false);
    const isLearningPopoverOpen = Boolean(learningPopover);

    const clearHoverTimeout = useCallback(() => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    }, []);

    const closeLearningPopover = useCallback(() => {
        isOverPopoverRef.current = false;
        clearHoverTimeout();
        setLearningPopover(null);
    }, [clearHoverTimeout]);

    useEffect(() => {
        setMounted(true);

        return () => {
            clearHoverTimeout();
        };
    }, [clearHoverTimeout]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeLearningPopover();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeLearningPopover]);

    useEffect(() => {
        if (!isLearningPopoverOpen) return undefined;

        let animationFrame = 0;
        const syncPopoverPosition = () => {
            if (animationFrame) return;

            animationFrame = window.requestAnimationFrame(() => {
                animationFrame = 0;
                setLearningPopover((current) => {
                    if (!current || !document.body.contains(current.anchor)) return null;

                    return { ...current };
                });
            });
        };

        window.addEventListener('scroll', syncPopoverPosition, true);
        window.addEventListener('resize', syncPopoverPosition);

        return () => {
            window.removeEventListener('scroll', syncPopoverPosition, true);
            window.removeEventListener('resize', syncPopoverPosition);
            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
            }
        };
    }, [isLearningPopoverOpen]);

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
        const uniqueSources = new Set(CERTIFICATES.map(getCredentialSource)).size;
        const latestCert = [...CERTIFICATES].sort(
            (a, b) => new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime(),
        )[0];

        return {
            total: CERTIFICATES.length,
            hours: totalHours,
            sources: uniqueSources,
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
        closeLearningPopover();
        setActiveFilter(filter);
        setCurrentPage(1);
        trackCustomEvent('certifications_filter_change', {
            event_category: 'certifications',
            skill_area: filter,
        });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        closeLearningPopover();
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        closeLearningPopover();
        setSearchQuery('');
        setCurrentPage(1);
    };

    const clearFilters = () => {
        closeLearningPopover();
        setSearchQuery('');
        setCurrentPage(1);
        handleFilterChange('All');
    };

    const goToPage = (page: number) => {
        closeLearningPopover();
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    };

    const openLearningPopover = useCallback(
        (certificate: Certificate, element: HTMLElement) => {
            if (!certificate.whatILearned.length || !canShowLearningPopover()) return;

            isOverPopoverRef.current = false;
            clearHoverTimeout();
            setLearningPopover(null);
            hoverTimeoutRef.current = setTimeout(() => {
                if (document.body.contains(element)) {
                    setLearningPopover({ cert: certificate, anchor: element });
                }
            }, POPOVER_OPEN_DELAY_MS);
        },
        [clearHoverTimeout],
    );

    const scheduleLearningPopoverClose = useCallback(
        (delay = POPOVER_CLOSE_DELAY_MS) => {
            clearHoverTimeout();
            hoverTimeoutRef.current = setTimeout(() => {
                if (!isOverPopoverRef.current) {
                    setLearningPopover(null);
                }
            }, delay);
        },
        [clearHoverTimeout],
    );

    const handlePopoverMouseEnter = useCallback(() => {
        isOverPopoverRef.current = true;
        clearHoverTimeout();
    }, [clearHoverTimeout]);

    const handlePopoverMouseLeave = useCallback(() => {
        isOverPopoverRef.current = false;
        scheduleLearningPopoverClose();
    }, [scheduleLearningPopoverClose]);

    const handleCardFocus = useCallback(
        (certificate: Certificate, event: React.FocusEvent<HTMLElement>) => {
            if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
            openLearningPopover(certificate, event.currentTarget);
        },
        [openLearningPopover],
    );

    const handleCardBlur = useCallback(
        (event: React.FocusEvent<HTMLElement>) => {
            if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
            scheduleLearningPopoverClose();
        },
        [scheduleLearningPopoverClose],
    );

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
                            Certifications I've earned
                        </h1>

                        <p className="cert-dc-description">
                            A record of formal training and certification exams I've completed, each one verifiable
                            through the issuing body. Filter by field below, or open a credential to check it directly.
                        </p>
                    </div>

                    <aside className="cert-dc-summary" aria-label="Certification portfolio summary">
                        <div className="cert-dc-summary__badge">
                            <BadgeCheck aria-hidden="true" />
                            Portfolio verified
                        </div>
                        <div className="cert-dc-summary__grid">
                            <div>
                                <span>Certificates</span>
                                <strong>{stats.total}</strong>
                            </div>
                            <div>
                                <span>Learning hours</span>
                                <strong>{Math.floor(stats.hours).toLocaleString()} hrs</strong>
                            </div>
                            <div>
                                <span>Platforms</span>
                                <strong>{stats.sources}</strong>
                            </div>
                        </div>
                        <p className="cert-dc-summary__latest">
                            Latest: {stats.latest.name} ({getCompletionYear(stats.latest)})
                        </p>
                    </aside>
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
                                    onMouseEnter={(event) => openLearningPopover(cert, event.currentTarget)}
                                    onMouseLeave={() => scheduleLearningPopoverClose()}
                                    onFocus={(event) => handleCardFocus(cert, event)}
                                    onBlur={handleCardBlur}
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
                                                src={getPlatformLogoSrc(cert)}
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
                                                {cert.skills.slice(0, getVisibleSkillLimit(cert)).map((skill) => (
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

            <AnimatePresence>
                {mounted && learningPopover && (
                    <LearningPopover
                        certificate={learningPopover.cert}
                        anchorElement={learningPopover.anchor}
                        onMouseEnter={handlePopoverMouseEnter}
                        onMouseLeave={handlePopoverMouseLeave}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { CERTIFICATES, PLATFORM_METADATA, CATEGORY_METADATA, CertificatePlatform, Certificate, CertificateCategory, CertificateType } from '../content/certificates';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from './shared/SectionLabel';
import { trackCustomEvent } from '../utils/analytics';

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
            staggerChildren: 0.1,
            delayChildren: 0.05,
        }
    }
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    All: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
    ),
    Technical: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
    ),
    Business: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
    ),
    Data: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4z" />
            <path d="M3 7v10c0 2.21 4.03 4 9 4s9-1.79 9-4V7" />
            <path d="M3 12c0 2.21 4.03 4 9 4s9-1.79 9-4" />
        </svg>
    ),
    Design: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10H12V2z" />
        </svg>
    ),
    Security: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
    ),
    Leadership: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
    )
};

const FilterMenu: React.FC<{
    anchorRef: React.RefObject<HTMLButtonElement>;
    activeFilter: string;
    counts: Record<string, number>;
    onSelect: (filter: 'All' | CertificateCategory) => void;
    onClose: () => void;
}> = ({ anchorRef, activeFilter, counts, onSelect, onClose }) => {
    const [rect, setRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        if (anchorRef.current) {
            setRect(anchorRef.current.getBoundingClientRect());
        }
    }, [anchorRef]);

    if (!rect) return null;

    const filterOptions: Array<'All' | CertificateCategory> = [
        'All', 'Technical', 'Business', 'Data', 'Design', 'Leadership'
    ];

    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 z-[9998]" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'absolute',
                    top: rect.bottom + window.scrollY + 8,
                    right: window.innerWidth - rect.right,
                    width: 240,
                    zIndex: 9999
                }}
                className="bg-white/80 backdrop-blur-3xl border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.1)] rounded-2xl p-2 overflow-hidden"
            >
                <div className="px-2 pt-2 space-y-1">
                    {filterOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => onSelect(option)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-500 group ${activeFilter === option
                                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20'
                                : 'hover:bg-slate-50 text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`${activeFilter === option ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-transform duration-500 group-hover:scale-110`}>
                                    {CATEGORY_ICONS[option]}
                                </div>
                                <span className={`text-[12px] font-black tracking-tight uppercase transition-all duration-500 ${activeFilter === option ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                                    {option}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold ${activeFilter === option ? 'text-white/30' : 'text-slate-200 group-hover:text-slate-400'}`}>
                                    {counts[option]}
                                </span>
                                {activeFilter === option && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>
        </>,
        document.body
    );
};

// Hover Popover Component — Udemy-style detailed preview, rendered via Portal
const HoverPopover: React.FC<{
    certificate: Certificate;
    anchorRect: DOMRect | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ certificate, anchorRect, onMouseEnter, onMouseLeave }) => {
    if (!anchorRect) return null;

    const popoverWidth = 360;
    const gap = 12;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    // Determine if popover should go left or right of the card
    const spaceRight = viewportWidth - anchorRect.right;
    const position: 'left' | 'right' = spaceRight > popoverWidth + gap ? 'right' : 'left';

    const style: React.CSSProperties = {
        position: 'absolute',
        top: anchorRect.top + window.scrollY,
        height: anchorRect.height,
        width: popoverWidth,
        zIndex: 50,
        pointerEvents: 'auto',
        ...(position === 'right'
            ? { left: anchorRect.right + gap }
            : { left: anchorRect.left - popoverWidth - gap }
        ),
    };

    return ReactDOM.createPortal(
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="z-[9999]"
        >
            <div className="bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-7 space-y-5 overflow-hidden">
                {/* Title */}
                <div>
                    <h4 className="text-[19px] font-black text-slate-900 leading-tight tracking-tighter">
                        {certificate.name}
                    </h4>
                </div>

                {/* Description */}
                <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                    {certificate.description}
                </p>

                {/* What I Learned */}
                {certificate.whatILearned.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">What I Learned</p>
                        <ul className="space-y-3">
                            {certificate.whatILearned.slice(0, 3).map((learning, idx) => (
                                <li key={idx} className="flex gap-3 text-[12px] text-slate-600 leading-snug items-start">
                                    <div className="mt-1.5 h-1 w-1 rounded-full bg-blue-600 flex-shrink-0" />
                                    <span className="font-medium">{learning}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* CTA */}
                {certificate.credentialUrl && (
                    <a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative flex items-center justify-center gap-3 w-full py-3.5 bg-slate-900 rounded-xl transition-all duration-300 hover:shadow-2xl active:scale-[0.98]"
                    >
                        <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">
                            View Certificate
                        </span>
                        <svg className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                )}
            </div>
        </motion.div>,
        document.body
    );
};


const Certifications: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<'All' | CertificateCategory>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [hoveredCert, setHoveredCert] = useState<{ cert: Certificate; rect: DOMRect } | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const filterButtonRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isOverPopover = useRef(false);
    const filterChangeTimeRef = useRef<number>(0);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const counts = useMemo(() => {
        const categoryCounts: Record<string, number> = { All: CERTIFICATES.length };
        CERTIFICATES.forEach(cert => {
            categoryCounts[cert.category] = (categoryCounts[cert.category] || 0) + 1;
        });
        return categoryCounts;
    }, []);

    const filteredCertificates = useMemo(() => {
        const TYPE_ORDER: Record<CertificateType, number> = {
            professional: 0,
            specialization: 1,
            course: 2,
        };
        return CERTIFICATES
            .filter(cert => {
                const matchesFilter = activeFilter === 'All' || cert.category === activeFilter;
                const searchLower = searchQuery.toLowerCase();
                const matchesSearch = !searchQuery ||
                    cert.name.toLowerCase().includes(searchLower) ||
                    cert.issuer.toLowerCase().includes(searchLower) ||
                    cert.skills.some(skill => skill.toLowerCase().includes(searchLower));
                return matchesFilter && matchesSearch;
            })
            .sort((a, b) => TYPE_ORDER[a.certType] - TYPE_ORDER[b.certType]);
    }, [activeFilter, searchQuery]);

    // Forcefully dismiss any popover whenever the active filter changes
    useEffect(() => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setHoveredCert(null);
        isOverPopover.current = false;
        filterChangeTimeRef.current = Date.now();
    }, [activeFilter]);

    const stats = useMemo(() => {
        const totalHours = CERTIFICATES.reduce((sum, cert) => sum + (cert.hours || 0), 0);
        const uniquePlatforms = new Set(CERTIFICATES.map(cert => cert.platform)).size - ['Google', 'Meta', 'Microsoft'].filter(p => CERTIFICATES.some(c => c.platform === p)).length;
        const latestCert = [...CERTIFICATES].sort((a, b) =>
            new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime()
        )[0];
        return {
            total: CERTIFICATES.length,
            hours: totalHours,
            platforms: uniquePlatforms,
            latest: latestCert
        };
    }, []);

    const handleFilterChange = (filter: 'All' | CertificateCategory) => {
        // Clear any active popover & hover state before switching filter
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setHoveredCert(null);
        isOverPopover.current = false;

        setActiveFilter(filter);
        trackCustomEvent('certifications_filter_change', {
            event_category: 'certifications',
            skill_area: filter
        });
    };

    const handleMouseEnter = useCallback((cert: Certificate, element: HTMLElement) => {
        // Suppress popover while the filter menu is open or within 500ms
        // after a filter change to prevent ghost popovers
        if (isFilterMenuOpen) return;
        if (Date.now() - filterChangeTimeRef.current < 500) return;
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
            const rect = element.getBoundingClientRect();
            setHoveredCert({ cert, rect });
        }, 300);
    }, [isFilterMenuOpen]);

    const handleMouseLeave = useCallback(() => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
            if (!isOverPopover.current) {
                setHoveredCert(null);
            }
        }, 200);
    }, []);

    const handlePopoverMouseEnter = useCallback(() => {
        isOverPopover.current = true;
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    }, []);

    const handlePopoverMouseLeave = useCallback(() => {
        isOverPopover.current = false;
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredCert(null);
        }, 150);
    }, []);

    const filterOptions: Array<'All' | CertificateCategory> = [
        'All',
        'Technical',
        'Business',
        'Data',
        'Design',
        'Leadership'
    ];

    return (
        <section id="certifications" className="py-24 md:py-40 bg-white selection:bg-blue-700 selection:text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-end mb-24">
                    <div className="space-y-10">
                        <div className="flex items-center gap-4">
                            <SectionLabel>Certifications</SectionLabel>
                            <div className="h-px bg-slate-100 flex-1"></div>
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-[100px] font-[900] tracking-[-0.04em] leading-[0.88] text-slate-900">
                            Verified <br />
                            <span className="text-slate-400">Expertise.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">
                            Industry-recognized credentials proving <span className="text-slate-900 font-bold">technical mastery</span> across domains—from production-grade code to strategic execution.
                        </p>
                    </div>

                    {/* Telemetry Stats */}
                    <div className="flex flex-wrap gap-x-12 gap-y-10 lg:justify-end pb-4">
                        <div className="space-y-2 group/meta">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover/meta:text-blue-700 transition-colors">Earned</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tight">{stats.total}<span className="text-blue-700 text-sm ml-1">+</span></p>
                        </div>
                        <div className="space-y-2 group/meta">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover/meta:text-blue-700 transition-colors">Invested</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tight">{stats.hours}<span className="text-blue-700 text-sm ml-1">Hrs</span></p>
                        </div>
                        <div className="space-y-2 group/meta">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover/meta:text-blue-700 transition-colors">Platforms</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tight">{stats.platforms}</p>
                        </div>
                    </div>
                </div>

                {/* Filter Control Bar — Architectural Breadcrumb Style */}
                <div className="mb-16">
                    <div className="flex items-center justify-between pb-8">
                        {/* Filter Status */}
                        <div className="flex items-center gap-4">
                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Showing</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeFilter}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="text-slate-900 font-black text-base tracking-tight"
                                >
                                    {activeFilter === 'All' ? 'All Certifications' : activeFilter}
                                </motion.span>
                            </AnimatePresence>
                            <div className="h-4 w-px bg-slate-200" />
                            <span className="text-[11px] font-semibold text-slate-400 tabular-nums">
                                {filteredCertificates.length}
                            </span>
                        </div>

                        {/* Minimalist Search & Filter Bar */}
                        <div className="flex items-center gap-4">
                            {/* Modern Search Input */}
                            <motion.div
                                animate={{
                                    width: isSearchFocused || searchQuery ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 280) : 48,
                                    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
                                }}
                                onClick={() => searchInputRef.current?.focus()}
                                className={`relative group flex items-center h-12 rounded-full border transition-[border-color,background-color] duration-300 cursor-text overflow-hidden ${isSearchFocused
                                    ? 'border-slate-900 bg-white shadow-2xl shadow-slate-900/5'
                                    : 'border-slate-200 bg-white/50 hover:border-slate-400'
                                    }`}
                            >
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors duration-300">
                                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21l-4.35-4.35" />
                                    </svg>
                                </div>

                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    placeholder="Search certifications..."
                                    className="w-full h-full pl-12 pr-10 bg-transparent text-[13px] font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none"
                                />

                                {searchQuery && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            searchInputRef.current?.focus();
                                        }}
                                        className="absolute right-3 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all duration-300"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </motion.div>

                            <AnimatePresence>
                                {activeFilter !== 'All' && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        onClick={() => handleFilterChange('All')}
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        Reset
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            <motion.button
                                ref={filterButtonRef}
                                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 overflow-hidden ${isFilterMenuOpen
                                    ? 'bg-slate-900 text-white shadow-2xl rotate-45'
                                    : 'bg-white border border-slate-200 text-slate-900 hover:border-slate-900'
                                    }`}
                            >
                                <div className="relative z-10 transition-transform duration-500">
                                    {isFilterMenuOpen ? (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <line x1="4" y1="8" x2="20" y2="8" />
                                            <line x1="4" y1="16" x2="20" y2="16" />
                                            <circle cx="9" cy="8" r="2.5" fill="currentColor" stroke="none" />
                                            <circle cx="15" cy="16" r="2.5" fill="currentColor" stroke="none" />
                                        </svg>
                                    )}
                                </div>
                                <motion.div
                                    className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-5 transition-opacity"
                                />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Faceted Filter Menu — Portal based */}
                <AnimatePresence>
                    {isFilterMenuOpen && (
                        <FilterMenu
                            anchorRef={filterButtonRef}
                            activeFilter={activeFilter}
                            counts={counts}
                            onSelect={(f) => {
                                handleFilterChange(f);
                                setIsFilterMenuOpen(false);
                            }}
                            onClose={() => setIsFilterMenuOpen(false)}
                        />
                    )}
                </AnimatePresence>

                {/* Certificates Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-5%" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                    style={{ pointerEvents: isFilterMenuOpen ? 'none' : 'auto' }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCertificates.map((cert) => (
                            <motion.div
                                layout="position"
                                key={cert.id}
                                variants={revealVariants}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="group cursor-pointer h-full"
                                onMouseEnter={(e) => handleMouseEnter(cert, e.currentTarget)}
                                onMouseLeave={handleMouseLeave}
                                role="article"
                                aria-label={`${cert.name} certification`}
                            >
                                <div className={`relative h-full bg-white border border-slate-200/60 rounded-2xl hover:border-slate-300 hover:executive-shadow transition-[border-color,box-shadow,transform] duration-700 flex flex-col p-9 group/card hover:-translate-y-2 cert-card`}>
                                    {/* Category Label + Platform Logo */}
                                    <div className="flex justify-between items-center mb-8">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400/50 group-hover/card:text-blue-700 transition-colors duration-500">
                                            {cert.category}
                                        </span>
                                        <img
                                            src={
                                                cert.platformLogo.startsWith('/images/certificates/')
                                                    ? cert.platformLogo
                                                    : cert.platform === 'edX'
                                                        ? '/images/certificates/edx logo.webp'
                                                        : '/images/certificates/coursera.webp'
                                            }
                                            alt={cert.platform}
                                            className="cert-logo object-contain ml-auto flex-shrink-0"
                                            style={{
                                                height: cert.platform === 'LinkedIn Learning' ? '16px'
                                                    : cert.platform === 'edX' ? '14px'
                                                        : cert.platform === 'Udemy' ? '14px'
                                                            : cert.platform === 'DataCamp' ? '18px'
                                                                : cert.id === 'bmet-computer-operation' ? '32px'
                                                                    : cert.id === 'it-aid-graphic-design' ? '18px'
                                                                        : undefined,
                                                width: 'auto',
                                                maxWidth: cert.id === 'bmet-computer-operation' ? '32px' : undefined,
                                            }}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-[22px] font-black text-slate-900 leading-[1.15] tracking-tighter mb-8 group-hover/card:text-blue-700 transition-colors duration-300">
                                        {cert.name}
                                    </h3>

                                    {/* Metadata */}
                                    <div className="space-y-6 mb-auto">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Issued By</span>
                                            <p className="text-[11px] font-black text-slate-900 tracking-tight">
                                                {cert.issuer}
                                            </p>
                                        </div>
                                        <div className={`grid gap-8 ${cert.courses ? 'grid-cols-3' : 'grid-cols-2'}`}>
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Completed</span>
                                                <p className="text-[11px] font-bold text-slate-500">
                                                    {new Date(cert.completionDate).getFullYear()}
                                                </p>
                                            </div>
                                            {cert.hours && (
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Hours</span>
                                                    <p className="text-[11px] font-bold text-slate-500">
                                                        {cert.hours}
                                                    </p>
                                                </div>
                                            )}
                                            {cert.courses && (
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Courses</span>
                                                    <p className="text-[11px] font-bold text-slate-500">
                                                        {cert.courses}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Description Preview */}
                                        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">
                                            {cert.description}
                                        </p>
                                    </div>

                                    {/* Skills */}
                                    {cert.skills.length > 0 && (
                                        <div className="mt-6 pt-8 border-t border-slate-50 group-hover/card:border-slate-100 transition-colors duration-500">
                                            <div className="flex flex-wrap gap-x-5 gap-y-2">
                                                {cert.skills.slice(0, 3).map((skill, i) => (
                                                    <span key={i} className="text-[9px] font-bold text-slate-400 tracking-tight flex items-center gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-slate-200 group-hover/card:bg-blue-400 transition-colors" />
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredCertificates.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-32 space-y-4"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-200 mb-6">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                                <path d="M8 8l6 6M14 8l-6 6" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">No results found</h3>
                        <p className="text-slate-400 font-medium max-w-sm mx-auto">
                            We couldn't find any certificates matching "{searchQuery}" in the {activeFilter} category.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                handleFilterChange('All');
                            }}
                            className="mt-8 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Udemy-style Hover Popover — rendered via Portal */}
            <AnimatePresence>
                {mounted && hoveredCert && (
                    <HoverPopover
                        certificate={hoveredCert.cert}
                        anchorRect={hoveredCert.rect}
                        onMouseEnter={handlePopoverMouseEnter}
                        onMouseLeave={handlePopoverMouseLeave}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;

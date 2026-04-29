import React, { useState, useEffect, useRef } from 'react';

type FlutedGlassWindow = Window & typeof globalThis & {
    initializeOptimizedShaders?: () => void;
    __erpLiteGlassRuntime?: Promise<void>;
    __erpLiteGlassInitScheduled?: Promise<void> | null;
};

function loadScriptOnce(id: string, src: string) {
    return new Promise<void>((resolve, reject) => {
        const existingScript = document.getElementById(id) as HTMLScriptElement | null;

        if (existingScript) {
            if (existingScript.dataset.loaded === 'true') {
                resolve();
                return;
            }

            existingScript.addEventListener('load', () => resolve(), { once: true });
            existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = true;

        script.addEventListener('load', () => {
            script.dataset.loaded = 'true';
            resolve();
        }, { once: true });

        script.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
        document.head.appendChild(script);
    });
}

function ensureErpLiteGlassRuntime() {
    const runtimeWindow = window as FlutedGlassWindow;

    if (!runtimeWindow.__erpLiteGlassRuntime) {
        runtimeWindow.__erpLiteGlassRuntime = loadScriptOnce(
            'erp-lite-three',
            '/glass-hero-runtime/three.r128.min.js'
        )
            .then(() => loadScriptOnce(
                'erp-lite-fluted-glass',
                '/glass-hero-runtime/fluted-glass-op.min.js'
            ));
    }

    return runtimeWindow.__erpLiteGlassRuntime.then(() => {
        if (!runtimeWindow.__erpLiteGlassInitScheduled) {
            runtimeWindow.__erpLiteGlassInitScheduled = new Promise<void>((resolve) => {
                window.requestAnimationFrame(() => {
                    try {
                        if (typeof runtimeWindow.initializeOptimizedShaders === 'function') {
                            runtimeWindow.initializeOptimizedShaders();
                        }
                    } finally {
                        runtimeWindow.__erpLiteGlassInitScheduled = null;
                        resolve();
                    }
                });
            });
        }

        return runtimeWindow.__erpLiteGlassInitScheduled;
    });
}

const ErpLiteHero: React.FC = () => {
    const glassRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<MutationObserver | null>(null);
    const [mounted, setMounted] = useState(false);
    const [glassReady, setGlassReady] = useState(false);

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => setMounted(true));

        let cancelled = false;

        const watchForCanvas = () => {
            const host = glassRef.current;
            if (!host) return;

            if (host.querySelector('canvas')) {
                setGlassReady(true);
                return;
            }

            observerRef.current?.disconnect();
            observerRef.current = new MutationObserver(() => {
                if (host.querySelector('canvas')) {
                    setGlassReady(true);
                    observerRef.current?.disconnect();
                    observerRef.current = null;
                }
            });

            observerRef.current.observe(host, { childList: true, subtree: true });
        };

        ensureErpLiteGlassRuntime()
            .then(() => {
                if (cancelled) return;

                window.setTimeout(() => {
                    if (cancelled) return;
                    watchForCanvas();
                }, 80);
            })
            .catch(() => {
                if (!cancelled) {
                    setGlassReady(false);
                }
            });

        return () => {
            cancelled = true;
            window.cancelAnimationFrame(frame);
            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, []);

    return (
        <header id="hero" aria-labelledby="erplite-hero-title" className={`erplite-hero-section ${mounted ? 'is-mounted' : ''}`}>
            <div className="max-w-7xl mx-auto px-6 w-full erplite-hero__container">
                <div className="erplite-hero__row">
                    <div className="erplite-hero__copy-col">
                        <div className="erplite-hero__copy">
                            <div className="erplite-hero__eyebrow-wrap">
                                <div className="erplite-hero__eyebrow">Case Study Ã¢â‚¬â€ HR Operations Platform Ã‚Â· 2025</div>
                            </div>

                            <div className="erplite-hero__heading-wrap">
                                <h1 id="erplite-hero-title" className="erplite-hero__heading">ERP-Lite Integrated HR Control System</h1>
                            </div>

                            <div className="erplite-hero__body-wrap">
                                <p className="erplite-hero__body">
                                    A controls-first HR operations platform for spreadsheet-heavy SMEs, unifying records, attendance, leave, payroll inputs, documentation, approvals, and audit trails in one governed workflow.
                                </p>
                            </div>

                            <div className="erplite-hero__button-wrap">
                                <div className="erplite-hero__button">
                                    <div aria-hidden="true" className="erplite-hero__button-text">Launch Live Demo</div>
                                    <a
                                        className="erplite-hero__button-link"
                                        href="#demo"
                                        rel="noreferrer"
                                    >
                                        <span className="erplite-hero__sr-only">Launch Live Demo</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="erplite-hero__spacer" aria-hidden="true" />

                <div className="erplite-hero__media-block">
                    <div className="erplite-hero__card">
                        <div className={`erplite-hero__glass-layer ${glassReady ? 'is-ready' : ''}`}>
                            <div className="erplite-hero__glass-fallback" aria-hidden="true" />
                            <div
                                ref={glassRef}
                                data-distortion="0.25"
                                data-shape-type-one="0"
                                data-size-two="1"
                                data-shininess="800"
                                data-use-blob-two="true"
                                data-gloss="0.3"
                                data-shape-type-two="0"
                                data-width-variation="1.8"
                                data-use-three-color="true"
                                data-sensitivity-three="0.15"
                                data-color-three="#002A6A"
                                data-sensitivity-one="0.15"
                                data-size-three="1.3"
                                data-fluted-glass="true"
                                data-noise="0.40"
                                data-hover="true"
                                data-color-one="#146ef5"
                                data-columns="6"
                                data-shape-type-three="0"
                                data-sensitivity-two="0.15"
                                data-size-one="0.85"
                                data-bg-color=""
                                data-hover-intensity="2.0"
                                data-color-two="#ffffff"
                                data-use-blob-one="true"
                                data-background-image=""
                                className="erplite-hero__glass-canvas fluted-glass-canvas"
                            />
                        </div>

                        <div className="erplite-hero__image-frame">
                            <img
                                src="/glass-hero-runtime/canvas-preview.webp"
                                alt="Screenshot of the ERP-Lite control dashboard with supporting workflow panels."
                                loading="eager"
                                fetchPriority="high"
                                className="erplite-hero__image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

type ErpLiteCmsTabCta = {
    label: string;
    href: string;
};

type ErpLiteCmsTab = {
    title: string;
    body: string;
    imageSrc: string;
    imageAlt: string;
    ctas: ErpLiteCmsTabCta[];
};

type ErpLiteWhyFeature = {
    anchorId: string;
    title: string;
    body: string[];
    imageSrc: string;
    imageAlt: string;
    imageObjectPosition: string;
    ctas?: ErpLiteCmsTabCta[];
};

type ErpLiteCustomerBadge = {
    imageSrc: string;
    imageAlt: string;
};

type ErpLiteTestimonial = {
    name: string;
    title: string;
    company: string;
    quote: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
};

type ErpLiteComparisonIcon = 'no' | 'minus' | 'check';

type ErpLiteComparisonCell = {
    icon: ErpLiteComparisonIcon;
    detail?: React.ReactNode;
};

type ErpLiteComparisonRow = {
    feature: string;
    legacyProcess: ErpLiteComparisonCell;
    standardApp: ErpLiteComparisonCell;
    erpLite: ErpLiteComparisonCell;
};

type ErpLiteG2Tab = {
    title: string;
    imageSrc: string;
    imageAlt: string;
};

type ErpLiteFaqItem = {
    question: string;
    answer: React.ReactNode[];
};

type ErpLiteDemoSupportItem = React.ReactNode;

const ERP_LITE_CMS_TABS_AUTOPLAY_MS = 6000;
const ERP_LITE_CMS_TABS_DESKTOP_QUERY = '(min-width: 768px)';
const erpLiteCmsTabs: ErpLiteCmsTab[] = [
    {
        title: 'Why Lite',
        body: 'ERP-Lite was not scoped as a smaller enterprise suite. It was scoped as a credible HR control system for SME operating realities. Deliberate exclusions keep the platform focused on what matters: immutable records and traceable approvals.',
        imageSrc: '/images/hr-docs/g2-document-control.webp',
        imageAlt: 'Deliberate exclusions',
        ctas: [],
    },
    {
        title: 'Connected Modules',
        body: 'Every module exists because it closes a dependency loop: records feed workflows, workflows feed payroll, and every state change feeds auditability. The 8 modules are not isolated apps; they are one connected operating model.',
        imageSrc: '/images/hr-docs/g2-approval-workflows.webp',
        imageAlt: 'Connected modules',
        ctas: [],
    },
    {
        title: 'Controls First',
        body: 'Compliance is enforced by architecture, not policy alone. Record retention, document expiry, payroll locking, export visibility, and immutable audit trails are core system behaviors built into the foundation.',
        imageSrc: '/images/hr-docs/g2-audit-trail.webp',
        imageAlt: 'Controls first',
        ctas: [],
    },
    {
        title: 'API-Level Access',
        body: 'Role-based access is enforced at the API layer, not just by hiding UI elements. This ensures that unauthorized actions are structurally impossible, regardless of how the system is accessed.',
        imageSrc: '/images/hr-docs/g2-document-control.webp',
        imageAlt: 'API-level access',
        ctas: [],
    },
];

const erpLiteMojibakeFixes: Array<[string, string]> = [
    ['\u00e2\u20ac\u201d', '\u2014'],
    ['\u00e2\u20ac\u2122', '\u2019'],
    ['\u00c2\u00a0', '\u00a0'],
];

function repairErpLiteCopy(value: string) {
    return erpLiteMojibakeFixes.reduce(
        (fixedValue, [from, to]) => fixedValue.split(from).join(to),
        value
    );
}

const erpLiteWhyFeatures: ErpLiteWhyFeature[] = [
    {
        anchorId: 'sticky-scroll-1',
        title: 'Payroll cannot be run with pending approvals',
        body: [
            'In legacy setups, payroll is often run while leave requests sit unapproved in an inbox, requiring retroactive corrections next month.',
            'ERP-Lite structurally blocks the payroll lock action if there are any unhandled attendance anomalies, missing document updates, or pending leave requests in the current cycle. The system forces operational hygiene.',
        ],
        imageSrc: '/images/hr-docs/g2-audit-trail.webp',
        imageAlt: 'Payroll logic check',
        imageObjectPosition: '0% 0%',
    },
    {
        anchorId: 'sticky-scroll-2',
        title: 'Expired documents freeze associated actions',
        body: [
            'If an employee\'s mandatory visa or certification expires, they cannot be scheduled or approved for specific operational tasks.',
            'The document control module isn\'t just a storage drive; it is an active state machine that feeds real-time compliance status to the attendance and payroll engines.',
        ],
        imageSrc: '/images/hr-docs/g2-document-control.webp',
        imageAlt: 'Expired document state',
        imageObjectPosition: '0% 0%',
    },
    {
        anchorId: 'sticky-scroll-3',
        title: 'Immutable event logs for every state change',
        body: [
            'Accountability requires traceability. When a leave request is approved, or an attendance record is overridden, the system creates a permanent cryptographic-style log.',
            'It records the exact timestamp, the user ID of the actor, the original state, and the new state. If a manager questions an anomaly three months later, the truth is indisputable.',
        ],
        imageSrc: '/images/hr-docs/g2-audit-trail.webp',
        imageAlt: 'Audit log view',
        imageObjectPosition: '0% 100%',
        ctas: [],
    },
    {
        anchorId: 'sticky-scroll-4',
        title: 'Role-based access enforced at the API layer',
        body: [
            'Security by hiding UI elements is insufficient. If a user inspects the network traffic, they should not be able to forge an approval request.',
            'ERP-Lite enforces all state-machine rules and role validations at the core server level, ensuring that even if an interface is bypassed, the system remains mathematically secure.',
        ],
        imageSrc: '/images/hr-docs/g2-approval-workflows.webp',
        imageAlt: 'Role access denied',
        imageObjectPosition: '0% 0%',
        ctas: [],
    },
];

const erpLiteCustomerBadges: ErpLiteCustomerBadge[] = [
    {
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/695d1a83f727ce7de53a4c8c_Enterprise%20Leader%20-%20Winter%202026%20G2.svg',
        imageAlt: 'G2 Enterprise Leader Winter 2026',
    },
    {
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/695d1aeb3253f22d5bbe6aab_g2-badge_overall-leader_winter-26.svg',
        imageAlt: 'G2 Overall Leader Winter 2026',
    },
    {
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/695d1aeb1bdcf54c2ba09181_g2-badge_regional-leader_emea_winter-26.svg',
        imageAlt: 'G2 Regional Leader for EMEA Winter 2026',
    },
];

const erpLiteTestimonials: ErpLiteTestimonial[] = [
    {
        name: 'Managing Director',
        title: 'Executive Oversight',
        company: 'SME Leadership',
        quote: '\u201CWe needed a single source of truth. Approvals were happening on WhatsApp and there was no way to trace them later. The lack of operational controls was creating real compliance risks.\u201D',
        imageSrc: '/images/placeholder-fallback.webp',
        imageAlt: 'Managing Director',
        href: '#',
    },
    {
        name: 'Sr. HR Executive',
        title: 'HR & Payroll',
        company: 'Core Operations',
        quote: '\u201CPayroll prep was a three-day ordeal of cross-referencing spreadsheets with leave balances and WhatsApp attendance drops. It was manually exhausting and prone to constant errors.\u201D',
        imageSrc: '/images/placeholder-fallback.webp',
        imageAlt: 'Sr. HR Executive',
        href: '#',
    },
    {
        name: 'Operations Manager',
        title: 'Department Head',
        company: 'Team Leadership',
        quote: '\u201CIt was impossible to pull cross-department reports. I couldn\'t tell who was on leave without messaging HR directly. We needed self-service visibility, not just another spreadsheet.\u201D',
        imageSrc: '/images/placeholder-fallback.webp',
        imageAlt: 'Operations Manager',
        href: '#',
    },
    {
        name: 'Operations Employee',
        title: 'Team Member',
        company: 'Field Operations',
        quote: '\u201CI just wanted to know my leave balance and get my payslip without having to email someone every month. Basic transparency was missing from our daily workflow.\u201D',
        imageSrc: '/images/placeholder-fallback.webp',
        imageAlt: 'Operations Employee',
        href: '#',
    },
];

const erpLiteComparisonRows: ErpLiteComparisonRow[] = [
    {
        feature: 'Document Compliance',
        legacyProcess: {
            icon: 'no',
            detail: 'Stored in personal Google Drives. Renewals tracked by memory.',
        },
        standardApp: {
            icon: 'minus',
            detail: 'Central repository with simple reminder notifications.',
        },
        erpLite: {
            icon: 'check',
            detail: 'Strict expiry tracking. Expired statuses automatically freeze associated operations.',
        },
    },
    {
        feature: 'Leave & Attendance',
        legacyProcess: {
            icon: 'no',
            detail: 'WhatsApp requests compiled into a master spreadsheet.',
        },
        standardApp: {
            icon: 'minus',
            detail: 'Independent portal requiring manual export for payroll processing.',
        },
        erpLite: {
            icon: 'check',
            detail: 'Integrated leave engine dynamically calculates accurate payroll inputs based on policies.',
        },
    },
    {
        feature: 'Approval Audits',
        legacyProcess: {
            icon: 'no',
            detail: '"Approved" text message from management. Zero traceability.',
        },
        standardApp: {
            icon: 'minus',
            detail: 'Simple state changes with basic timestamping.',
        },
        erpLite: {
            icon: 'check',
            detail: 'Immutable audit log capturing actor, time, and exact record state for every decision.',
        },
    },
    {
        feature: 'System Access',
        legacyProcess: {
            icon: 'no',
            detail: 'Shared credentials leading to zero accountability.',
        },
        standardApp: {
            icon: 'minus',
            detail: 'Basic UI-level feature toggles.',
        },
        erpLite: {
            icon: 'check',
            detail: 'Role-based access strictly enforced at the core API layer, preventing unauthorized bypasses.',
        },
    },
];

const erpLiteG2Tabs: ErpLiteG2Tab[] = [
    {
        title: 'Leave Management',
        imageSrc: '/images/hr-docs/g2-approval-workflows.webp',
        imageAlt: 'Leave Management Workflow',
    },
    {
        title: 'Payroll Processing',
        imageSrc: '/images/hr-docs/g2-audit-trail.webp',
        imageAlt: 'Payroll Processing Workflow',
    },
    {
        title: 'Document Control',
        imageSrc: '/images/hr-docs/g2-document-control.webp',
        imageAlt: 'Document Control Workflow',
    },
    {
        title: 'Attendance Tracking',
        imageSrc: '/images/hr-docs/g2-approval-workflows.webp',
        imageAlt: 'Attendance Tracking Workflow',
    },
];

const erpLiteFaqItems: ErpLiteFaqItem[] = [
    {
        question: 'Why PostgreSQL over NoSQL?',
        answer: [
            'ERP systems demand relational integrity. When a document expires, the payroll engine needs to know immediately via foreign key relationships and joined queries. A relational database structurally enforces these operational dependencies at the schema level, preventing orphaned data.',
        ],
    },
    {
        question: 'Why integrate WhatsApp for Attendance?',
        answer: [
            'Field employees operate on WhatsApp, not inside enterprise web portals. To achieve 100% attendance tracking compliance, the input mechanism had to match the user\'s reality. The API bridges low-friction user behavior with high-control system logging.',
        ],
    },
    {
        question: 'How does the Document Engine trigger Payroll blocks?',
        answer: [
            'Every document has an expiry state. A nightly CRON job updates the compliance status of every employee. The payroll compilation module checks this boolean state before allowing a manager to generate the final export. If compliance is false, the export button is disabled.',
        ],
    },
];

const erpLiteDemoSupportItems: ErpLiteDemoSupportItem[] = [
    'Relational database schema diagrams',
    'State machine definitions for all 8 modules',
    'Role-based API access control rules',
    'WhatsApp integration sequence diagrams',
];

const ErpLiteCmsTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabsListRef = useRef<HTMLDivElement>(null);
    const autoplayTimeoutRef = useRef<number | null>(null);
    const autoplayStartTimeRef = useRef<number | null>(null);
    const autoplayRemainingTimeRef = useRef(ERP_LITE_CMS_TABS_AUTOPLAY_MS);
    const isInViewRef = useRef(false);
    const activeTabRef = useRef(0);
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') {
            return true;
        }

        return window.matchMedia(ERP_LITE_CMS_TABS_DESKTOP_QUERY).matches;
    });
    const [isInView, setIsInView] = useState(false);

    const clearAutoplayTimer = () => {
        if (autoplayTimeoutRef.current !== null) {
            window.clearTimeout(autoplayTimeoutRef.current);
            autoplayTimeoutRef.current = null;
        }

        autoplayStartTimeRef.current = null;
    };

    const activateTab = (nextTab: number) => {
        if (nextTab === activeTabRef.current) {
            return;
        }

        activeTabRef.current = nextTab;
        setActiveTab(nextTab);
    };

    const scheduleAutoplay = (delay: number) => {
        clearAutoplayTimer();
        autoplayStartTimeRef.current = window.performance.now();
        autoplayTimeoutRef.current = window.setTimeout(() => {
            autoplayRemainingTimeRef.current = ERP_LITE_CMS_TABS_AUTOPLAY_MS;
            autoplayStartTimeRef.current = null;
            activateTab((activeTabRef.current + 1) % erpLiteCmsTabs.length);
        }, delay);
    };

    useEffect(() => {
        activeTabRef.current = activeTab;
    }, [activeTab]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQueryList = window.matchMedia(ERP_LITE_CMS_TABS_DESKTOP_QUERY);
        const updateIsDesktop = (event: MediaQueryList | MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        updateIsDesktop(mediaQueryList);

        if (typeof mediaQueryList.addEventListener === 'function') {
            mediaQueryList.addEventListener('change', updateIsDesktop);

            return () => {
                mediaQueryList.removeEventListener('change', updateIsDesktop);
            };
        }

        mediaQueryList.addListener(updateIsDesktop);

        return () => {
            mediaQueryList.removeListener(updateIsDesktop);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        erpLiteCmsTabs.forEach(tab => {
            const image = new window.Image();
            image.decoding = 'async';
            image.src = tab.imageSrc;
        });
    }, []);

    useEffect(() => {
        if (!isDesktop) {
            isInViewRef.current = false;
            setIsInView(false);
            return;
        }

        const listElement = tabsListRef.current;
        if (!listElement || typeof IntersectionObserver === 'undefined') {
            isInViewRef.current = true;
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.target !== listElement) {
                        return;
                    }

                    const nextIsInView = entry.isIntersecting && entry.intersectionRatio > 0;
                    isInViewRef.current = nextIsInView;
                    setIsInView(nextIsInView);
                });
            },
            {
                threshold: [0, 0.2, 0.5, 1],
                rootMargin: '0px 0px -20% 0px',
            }
        );

        observer.observe(listElement);

        return () => {
            observer.disconnect();
        };
    }, [isDesktop]);

    useEffect(() => {
        autoplayRemainingTimeRef.current = ERP_LITE_CMS_TABS_AUTOPLAY_MS;
        clearAutoplayTimer();

        if (!isDesktop || !isInViewRef.current) {
            return;
        }

        scheduleAutoplay(ERP_LITE_CMS_TABS_AUTOPLAY_MS);

        return () => {
            clearAutoplayTimer();
        };
    }, [activeTab, isDesktop]);

    useEffect(() => {
        if (!isDesktop) {
            autoplayRemainingTimeRef.current = ERP_LITE_CMS_TABS_AUTOPLAY_MS;
            clearAutoplayTimer();
            return;
        }

        if (!isInView) {
            if (autoplayStartTimeRef.current !== null) {
                const elapsed = window.performance.now() - autoplayStartTimeRef.current;
                autoplayRemainingTimeRef.current = Math.max(0, autoplayRemainingTimeRef.current - elapsed);
            }

            clearAutoplayTimer();
            return;
        }

        if (autoplayRemainingTimeRef.current <= 0) {
            autoplayRemainingTimeRef.current = ERP_LITE_CMS_TABS_AUTOPLAY_MS;
        }

        scheduleAutoplay(autoplayRemainingTimeRef.current);

        return () => {
            clearAutoplayTimer();
        };
    }, [isInView, isDesktop]);

    useEffect(() => {
        return () => {
            clearAutoplayTimer();
        };
    }, []);

    return (
        <section className="erplite-cms-tabs-section" aria-labelledby="erplite-cms-tabs-title">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="erplite-cms-tabs">
                    <div className="erplite-cms-tabs__spacer" aria-hidden="true" />

                    <div className="erplite-cms-tabs__menu">
                        <div className="erplite-cms-tabs__content">
                            <h3 id="erplite-cms-tabs-title" className="erplite-cms-tabs__title">Focused scope. Complete operations. No enterprise overhead.</h3>
                            <p className="erplite-cms-tabs__intro">
                                ERP-Lite was not scoped as a smaller enterprise suite. It was scoped as a credible HR control system for SME operating realities.
                            </p>
                        </div>

                        <div ref={tabsListRef} className="erplite-cms-tabs__list" role="list">
                            {erpLiteCmsTabs.map((tab, index) => {
                                const isActive = index === activeTab;
                                const buttonId = `erplite-cms-tab-button-${index}`;
                                const panelId = `erplite-cms-tab-panel-${index}`;

                                return (
                                    <article
                                        key={tab.title}
                                        className={`erplite-cms-tabs__item ${isActive ? 'cc-active' : ''}`}
                                        role="listitem"
                                    >
                                        <div className="erplite-cms-tabs__link-wrapper">
                                            <div className="erplite-cms-tabs__trigger">
                                                <button
                                                    id={buttonId}
                                                    type="button"
                                                    className="erplite-cms-tabs__button"
                                                    aria-controls={panelId}
                                                    aria-expanded={isDesktop ? isActive : true}
                                                    onClick={() => activateTab(index)}
                                                >
                                                    <span className="erplite-hero__sr-only">Select tab</span>
                                                </button>

                                                <div className="erplite-cms-tabs__progress-track" aria-hidden="true">
                                                    <div
                                                        className="erplite-cms-tabs__progress-bar"
                                                        style={isActive && isDesktop
                                                            ? {
                                                                animationName: 'erpliteCmsTabsProgress',
                                                                animationDuration: `${ERP_LITE_CMS_TABS_AUTOPLAY_MS}ms`,
                                                                animationTimingFunction: 'linear',
                                                                animationFillMode: 'forwards',
                                                                animationPlayState: isInView ? 'running' : 'paused',
                                                            }
                                                            : undefined}
                                                    />
                                                </div>

                                                <div className="erplite-cms-tabs__menu-text">
                                                    <h3 className="erplite-cms-tabs__tab-title">{tab.title}</h3>
                                                </div>
                                            </div>

                                            <div
                                                id={panelId}
                                                className="erplite-cms-tabs__interactive-content"
                                                aria-labelledby={buttonId}
                                            >
                                                <div className="erplite-cms-tabs__interactive-inner">
                                                    <p className="erplite-cms-tabs__body">{repairErpLiteCopy(tab.body)}</p>

                                                    <div className="erplite-cms-tabs__cta-row">
                                                        {tab.ctas.map(cta => (
                                                            <div
                                                                key={cta.label}
                                                                className="erplite-cms-tabs__cta-shell"
                                                            >
                                                                <div aria-hidden="true" className="erplite-cms-tabs__cta-text">{cta.label}</div>
                                                                <div className="erplite-cms-tabs__cta-icon" aria-hidden="true">
                                                                    <span className="erplite-cms-tabs__cta-icon-glyph is-arrow-right">&rarr;</span>
                                                                </div>
                                                                <a
                                                                    className="erplite-cms-tabs__cta-link"
                                                                    href={cta.href}
                                                                >
                                                                    <span className="erplite-hero__sr-only">{cta.label}</span>
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="erplite-cms-tabs__stage"
                                            aria-hidden={isDesktop ? !isActive : undefined}
                                            style={isDesktop
                                                ? {
                                                    opacity: isActive ? 1 : 0,
                                                    zIndex: isActive ? 2 : 1,
                                                }
                                                : undefined}
                                        >
                                            <div className="erplite-cms-tabs__image-frame">
                                                <img
                                                    src={tab.imageSrc}
                                                    alt={tab.imageAlt}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="erplite-cms-tabs__image"
                                                />
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ErpLiteWhySection: React.FC = () => {
    const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [activeFeature, setActiveFeature] = useState(0);
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') {
            return true;
        }

        return window.matchMedia(ERP_LITE_CMS_TABS_DESKTOP_QUERY).matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQueryList = window.matchMedia(ERP_LITE_CMS_TABS_DESKTOP_QUERY);
        const updateIsDesktop = (event: MediaQueryList | MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        updateIsDesktop(mediaQueryList);

        if (typeof mediaQueryList.addEventListener === 'function') {
            mediaQueryList.addEventListener('change', updateIsDesktop);

            return () => {
                mediaQueryList.removeEventListener('change', updateIsDesktop);
            };
        }

        mediaQueryList.addListener(updateIsDesktop);

        return () => {
            mediaQueryList.removeListener(updateIsDesktop);
        };
    }, []);

    useEffect(() => {
        if (!isDesktop) {
            setActiveFeature(0);
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                const visibleEntries = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio);

                if (visibleEntries.length === 0) {
                    return;
                }

                const nextIndex = Number((visibleEntries[0].target as HTMLElement).dataset.index);
                if (!Number.isNaN(nextIndex)) {
                    setActiveFeature(nextIndex);
                }
            },
            {
                threshold: [0.2, 0.35, 0.5, 0.65],
                rootMargin: '-20% 0px -20% 0px',
            }
        );

        rowRefs.current.forEach(row => {
            if (row) {
                observer.observe(row);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [isDesktop]);

    return (
        <section className="erplite-why-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="erplite-why__intro">
                    <h2 className="erplite-why__heading">Controls, not just features</h2>
                    <p className="erplite-why__summary">
                        Compliance isn&apos;t achieved by writing policies; it&apos;s achieved by making non-compliant operations structurally impossible.
                    </p>
                </div>

                <div className="erplite-why__rows">
                    {erpLiteWhyFeatures.map((feature, index) => {
                        const isCurrent = !isDesktop || activeFeature === index;

                        return (
                            <div
                                key={feature.anchorId}
                                id={feature.anchorId}
                                ref={element => {
                                    rowRefs.current[index] = element;
                                }}
                                data-index={index}
                                className="erplite-why__row"
                            >
                                <div className="erplite-why__copy-col">
                                    <h3 className="erplite-why__row-title">{feature.title}</h3>

                                    <div className="erplite-why__copy">
                                        {feature.body.map(paragraph => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                    </div>

                                    {feature.ctas && feature.ctas.length > 0 ? (
                                        <div className="erplite-why__cta-row">
                                            {feature.ctas.map(cta => (
                                                <a
                                                    key={cta.label}
                                                    className="erplite-why__cta"
                                                    href={cta.href}
                                                    target={cta.href.startsWith('http') ? '_blank' : undefined}
                                                    rel={cta.href.startsWith('http') ? 'noreferrer' : undefined}
                                                >
                                                    <span className="erplite-why__cta-text">{cta.label}</span>
                                                    <span className="erplite-why__cta-arrow" aria-hidden="true">
                                                        {'\u2192'}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="erplite-why__image-position" aria-hidden="true">
                                    <div className="erplite-why__image-track">
                                        <div className="erplite-why__image-sticky">
                                            <div className="erplite-why__image-wrap">
                                                <div className="erplite-why__image-frame">
                                                    <img
                                                        src={feature.imageSrc}
                                                        alt={feature.imageAlt}
                                                        loading="lazy"
                                                        className="erplite-why__image"
                                                        style={{ objectPosition: feature.imageObjectPosition }}
                                                    />
                                                </div>
                                                <a
                                                    aria-hidden="true"
                                                    tabIndex={-1}
                                                    href={`#${feature.anchorId}`}
                                                    className={`erplite-why__image-link ${isCurrent ? 'w--current' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const ErpLiteMigrationCta: React.FC = () => {
    const glassRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<MutationObserver | null>(null);
    const [glassReady, setGlassReady] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const watchForCanvas = () => {
            const host = glassRef.current;
            if (!host) return;

            if (host.querySelector('canvas')) {
                setGlassReady(true);
                return;
            }

            observerRef.current?.disconnect();
            observerRef.current = new MutationObserver(() => {
                if (host.querySelector('canvas')) {
                    setGlassReady(true);
                    observerRef.current?.disconnect();
                    observerRef.current = null;
                }
            });

            observerRef.current.observe(host, { childList: true, subtree: true });
        };

        ensureErpLiteGlassRuntime()
            .then(() => {
                if (cancelled) return;

                window.setTimeout(() => {
                    if (cancelled) return;
                    watchForCanvas();
                }, 80);
            })
            .catch(() => {
                if (!cancelled) {
                    setGlassReady(false);
                }
            });

        return () => {
            cancelled = true;
            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, []);

    return (
        <section className="erplite-migration-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="erplite-migration-card">
                    <div className={`erplite-migration-card__glass ${glassReady ? 'is-ready' : ''}`}>
                        <div className="erplite-migration-card__glass-fallback" aria-hidden="true" />
                        <div
                            ref={glassRef}
                            data-distortion="0.25"
                            data-shape-type-one="0"
                            data-size-two="1"
                            data-shininess="800"
                            data-use-blob-two="true"
                            data-gloss="0.3"
                            data-shape-type-two="3"
                            data-width-variation="1.8"
                            data-use-three-color="false"
                            data-sensitivity-three="0.15"
                            data-color-three="#002A6A"
                            data-sensitivity-one="0.15"
                            data-size-three="1.3"
                            data-fluted-glass="true"
                            data-noise="0.40"
                            data-hover="true"
                            data-color-one="#146ef5"
                            data-columns="4"
                            data-shape-type-three="0"
                            data-sensitivity-two="0.15"
                            data-size-one="0.85"
                            data-bg-color=""
                            data-hover-intensity=".2"
                            data-color-two="#146ef5"
                            data-use-blob-one="true"
                            data-background-image=""
                            className="erplite-migration-card__glass-canvas fluted-glass-canvas"
                        />
                    </div>

                    <div className="erplite-migration-card__body">
                        <div className="erplite-migration-card__content">
                            <div className="erplite-migration-card__copy-group">
                                <h2 className="erplite-migration-card__title">See the workflows in motion</h2>
                                <p className="erplite-migration-card__body-copy">
                                    The live demo is seeded with employees, pending approvals, payroll states, attendance anomalies, and document expiry conditions so the operating logic can be inspected end to end.
                                </p>
                            </div>

                            <div className="erplite-migration-card__button">
                                <div aria-hidden="true" className="erplite-migration-card__button-text">Launch Live Demo</div>
                                <a
                                    className="erplite-migration-card__button-link"
                                    href="#demo"
                                    aria-label="Launch Live Demo"
                                />
                            </div>
                        </div>

                        <div className="erplite-migration-card__cover-col">
                            <div className="erplite-migration-card__cover-wrap">
                                <img
                                    src="https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/68951473878f65991bb5f367_resources_ebook_worpress-migration.avif"
                                    alt='Cover art for the ERP-Lite workflow guide.'
                                    loading="lazy"
                                    className="erplite-migration-card__cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ErpLiteCustomersSection: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState(1);

    const goToSlide = (targetIndex: number) => {
        const totalSlides = erpLiteTestimonials.length;
        const clampedIndex = Math.max(0, Math.min(targetIndex, totalSlides - 1));
        setActiveSlide(clampedIndex);
    };

    return (
        <>
            <section className="erplite-customers-section">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="erplite-customers__intro-row">
                        <div className="erplite-customers__intro-col">
                            <h2 className="erplite-customers__heading">Four roles exposed the real operating failures</h2>
                            <p className="erplite-customers__summary">
                                Discovery showed that every user wanted the same thing in different language: one trusted system of record, clear approvals, and decisions that survive staff turnover.
                            </p>
                        </div>

                        <div className="erplite-customers__badges-col">
                            <div className="erplite-customers__badges-grid">
                                {erpLiteCustomerBadges.map(badge => (
                                    <div key={badge.imageAlt} className="erplite-customers__badge-frame">
                                        <img
                                            src={badge.imageSrc}
                                            alt={badge.imageAlt}
                                            loading="lazy"
                                            className="erplite-customers__badge-image"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="erplite-customers-slider-section">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="erplite-customers-slider">
                        <div className="erplite-customers-slider__controls">
                            <button
                                type="button"
                                className={`erplite-customers-slider__control circle-btn${activeSlide === 0 ? ' swiper-button-disabled' : ''}`}
                                data-direction="previous"
                                aria-label="Previous testimonial"
                                aria-disabled={activeSlide === 0}
                                onClick={() => goToSlide(activeSlide - 1)}
                                disabled={activeSlide === 0}
                            >
                                <div data-wf--button-icon--variant="arrow-left" className="button-icon-wrap">
                                    <div className="accordion-line-wrap">
                                        <div className="accordion-icon_line cc-horizontal cc-accordion-card"></div>
                                        <div className="accordion-icon_line cc-vertical cc-accordion-card"></div>
                                    </div>
                                    <div className="button-icon cc-arrow-right" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-up-right" aria-hidden="true"></div>
                                    <div className="button-icon cc-play" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-down" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-left" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-up" aria-hidden="true"></div>
                                </div>
                            </button>
                            <button
                                type="button"
                                className={`erplite-customers-slider__control circle-btn${activeSlide === erpLiteTestimonials.length - 1 ? ' swiper-button-disabled' : ''}`}
                                data-direction="next"
                                aria-label="Next testimonial"
                                aria-disabled={activeSlide === erpLiteTestimonials.length - 1}
                                onClick={() => goToSlide(activeSlide + 1)}
                                disabled={activeSlide === erpLiteTestimonials.length - 1}
                            >
                                <div data-wf--button-icon--variant="arrow-right" className="button-icon-wrap">
                                    <div className="accordion-line-wrap">
                                        <div className="accordion-icon_line cc-horizontal cc-accordion-card"></div>
                                        <div className="accordion-icon_line cc-vertical cc-accordion-card"></div>
                                    </div>
                                    <div className="button-icon cc-arrow-right" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-up-right" aria-hidden="true"></div>
                                    <div className="button-icon cc-play" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-down" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-left" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-up" aria-hidden="true"></div>
                                </div>
                            </button>
                        </div>

                        <div className="erplite-customers-slider__offset">
                            <div
                                className="erplite-customers-slider__track"
                                data-active-slide={activeSlide}
                                role="list"
                                aria-label="Customer testimonials"
                            >
                                {erpLiteTestimonials.map((testimonial, index) => (
                                    <a
                                        key={testimonial.name}
                                        data-index={index}
                                        className="erplite-customers-slider__slide"
                                        href={testimonial.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        role="listitem"
                                        aria-current={activeSlide === index ? 'true' : undefined}
                                    >
                                        <div className="erplite-customers-slider__card">
                                            <div className="erplite-customers-slider__card-body">
                                                <div className="erplite-customers-slider__meta-col">
                                                    <div className="erplite-customers-slider__avatar-row">
                                                        <div className="erplite-customers-slider__avatar-shell">
                                                            <img
                                                                src={testimonial.imageSrc}
                                                                alt={testimonial.imageAlt}
                                                                loading="lazy"
                                                                className="erplite-customers-slider__avatar-image"
                                                            />
                                                        </div>

                                                        <div className="erplite-customers-slider__person">
                                                            <div className="erplite-customers-slider__name">{testimonial.name}</div>
                                                            <div className="erplite-customers-slider__title-wrap">
                                                                <span>{testimonial.title}</span>
                                                                <span>, </span>
                                                                <span>{testimonial.company}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="erplite-customers-slider__quote-col">
                                                    <blockquote className="erplite-customers-slider__quote">
                                                        <p>{testimonial.quote}</p>
                                                    </blockquote>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const erpLiteComparisonIconSrc: Record<ErpLiteComparisonIcon, string> = {
    no: 'https://dhygzobemt712.cloudfront.net/Icons/Light/24px/CircleNo.svg',
    minus: 'https://dhygzobemt712.cloudfront.net/Icons/Light/24px/CircleMinus.svg',
    check: 'https://dhygzobemt712.cloudfront.net/Icons/Light/24px/CircleCheckYes.svg',
};

const ErpLiteComparisonTable: React.FC = () => {
    const [openRows, setOpenRows] = useState<number[]>([]);

    const toggleRow = (rowIndex: number) => {
        setOpenRows(currentRows =>
            currentRows.includes(rowIndex)
                ? currentRows.filter(index => index !== rowIndex)
                : [...currentRows, rowIndex]
        );
    };

    const isRowOpen = (rowIndex: number) => openRows.includes(rowIndex);

    return (
        <section className="erplite-compare-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="erplite-compare__intro-row">
                    <div className="erplite-compare__intro-col">
                        <h2 className="erplite-compare__heading">
                            Before (Chaos) vs. After
                            <br className="erplite-compare__heading-break" />
                            (ERP-Lite)
                        </h2>
                    </div>
                </div>

                <div className="erplite-compare__spacer" aria-hidden="true" />

                <div
                    className="erplite-compare__table-shell"
                    role="table"
                    aria-label="Comparing Legacy vs ERP-Lite"
                    aria-colcount={4}
                    aria-rowcount={erpLiteComparisonRows.length + 1}
                >
                    <div className="erplite-compare__table-slot" role="rowgroup">
                        <div className="erplite-compare__row erplite-compare__row--header">
                            <div role="row" className="erplite-compare__row-slot">
                                <div className="erplite-compare__cell erplite-compare__cell--header" role="columnheader">
                                    <div className="erplite-compare__cell-slot erplite-compare__cell-slot--feature">
                                        <div className="erplite-compare__rich-text erplite-compare__rich-text--header">
                                            <p>
                                                <strong>Workflow</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="erplite-compare__cell erplite-compare__cell--header-value" role="columnheader">
                                    <div className="erplite-compare__cell-slot erplite-compare__cell-slot--header-value">
                                        <div className="erplite-compare__rich-text erplite-compare__rich-text--header">
                                            <p>
                                                <strong>Legacy Process</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="erplite-compare__cell erplite-compare__cell--header-value" role="columnheader">
                                    <div className="erplite-compare__cell-slot erplite-compare__cell-slot--header-value">
                                        <div className="erplite-compare__rich-text erplite-compare__rich-text--header">
                                            <p>
                                                <strong>Standard App</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="erplite-compare__cell erplite-compare__cell--header-value is-highlighted" role="columnheader">
                                    <div className="erplite-compare__cell-slot erplite-compare__cell-slot--header-value">
                                        <div className="erplite-compare__rich-text erplite-compare__rich-text--header">
                                            <p>
                                                <strong>ERP-Lite</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {erpLiteComparisonRows.map((row, rowIndex) => {
                            const rowOpen = isRowOpen(rowIndex);
                            const cells = [
                                row.legacyProcess,
                                row.standardApp,
                                row.erpLite,
                            ];

                            return (
                                <div
                                    key={row.feature}
                                    className={`erplite-compare__row ${rowOpen ? 'is-open' : ''}`}
                                    data-interaction="tooltip-parent"
                                >
                                    <div role="row" className="erplite-compare__row-slot">
                                        <div className="erplite-compare__cell erplite-compare__cell--feature" role="cell">
                                            <div className="erplite-compare__cell-slot erplite-compare__cell-slot--feature">
                                                <div className="erplite-compare__rich-text">
                                                    <p>{row.feature}</p>
                                                </div>
                                                <div className="erplite-compare__tooltip-expand">
                                                    <button
                                                        type="button"
                                                        data-interaction="expand-tooltip"
                                                        className="erplite-compare__toggle"
                                                        aria-label="Tooltip"
                                                        aria-expanded={rowOpen}
                                                        onClick={() => toggleRow(rowIndex)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none" className="erplite-compare__toggle-icon" aria-hidden="true">
                                                            <path d="M7 0.181641C3.1402 0.181641 0 3.32188 0 7.18168C0 11.0414 3.1402 14.1816 7 14.1816C10.8598 14.1816 14 11.0414 14 7.18168C14 3.32188 10.8598 0.181641 7 0.181641ZM7 12.9089C3.84194 12.9089 1.27273 10.3397 1.27273 7.18168C1.27273 4.02366 3.84194 1.45437 7 1.45437C10.1581 1.45437 12.7273 4.02366 12.7273 7.18168C12.7273 10.3397 10.158 12.9089 7 12.9089Z" fill="currentColor" />
                                                            <path d="M7.00066 3.15137C6.53289 3.15137 6.15234 3.53217 6.15234 4.00023C6.15234 4.46788 6.53289 4.84834 7.00066 4.84834C7.46843 4.84834 7.84897 4.46788 7.84897 4.00023C7.84897 3.53217 7.46843 3.15137 7.00066 3.15137Z" fill="currentColor" />
                                                            <path d="M6.99964 6.12109C6.6482 6.12109 6.36328 6.40601 6.36328 6.75746V10.5756C6.36328 10.927 6.6482 11.212 6.99964 11.212C7.35108 11.212 7.636 10.927 7.636 10.5756V6.75746C7.636 6.40601 7.35108 6.12109 6.99964 6.12109Z" fill="currentColor" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {cells.map((cell, cellIndex) => {
                                            const isHighlightedColumn = cellIndex === 2;
                                            const hasDetail = Boolean(cell.detail);

                                            return (
                                                <div
                                                    key={`${row.feature}-${cellIndex}`}
                                                    className={`erplite-compare__cell erplite-compare__cell--value ${isHighlightedColumn ? 'is-highlighted' : ''}`}
                                                    role="cell"
                                                >
                                                    <div className="erplite-compare__cell-slot erplite-compare__cell-slot--value">
                                                        <img
                                                            src={erpLiteComparisonIconSrc[cell.icon]}
                                                            alt=""
                                                            role="presentation"
                                                            className={`erplite-compare__icon erplite-compare__icon--${cell.icon}`}
                                                        />

                                                        {hasDetail ? (
                                                            <div className="erplite-compare__tooltip-expand">
                                                                <div
                                                                    role="tooltip"
                                                                    data-interaction="tooltip-pane"
                                                                    aria-hidden={!rowOpen}
                                                                    className={`erplite-compare__tooltip-pane ${rowOpen ? 'is-active' : ''}`}
                                                                >
                                                                    <div className="erplite-compare__tooltip-pane-inner">
                                                                        <div className="erplite-compare__tooltip-copy">
                                                                            <p>{cell.detail}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ErpLiteBusinessImpactSection: React.FC = () => {
    const glassRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<MutationObserver | null>(null);
    const [glassReady, setGlassReady] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const watchForCanvas = () => {
            const host = glassRef.current;
            if (!host) return;

            if (host.querySelector('canvas')) {
                setGlassReady(true);
                return;
            }

            observerRef.current?.disconnect();
            observerRef.current = new MutationObserver(() => {
                if (host.querySelector('canvas')) {
                    setGlassReady(true);
                    observerRef.current?.disconnect();
                    observerRef.current = null;
                }
            });

            observerRef.current.observe(host, { childList: true, subtree: true });
        };

        ensureErpLiteGlassRuntime()
            .then(() => {
                if (cancelled) return;

                window.setTimeout(() => {
                    if (cancelled) return;
                    watchForCanvas();
                }, 80);
            })
            .catch(() => {
                if (!cancelled) {
                    setGlassReady(false);
                }
            });

        return () => {
            cancelled = true;
            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, []);

    return (
        <section className="erplite-business-impact-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="erplite-business-impact__card">
                    <div className={`erplite-business-impact__glass ${glassReady ? 'is-ready' : ''}`}>
                        <div className="erplite-business-impact__glass-fallback" aria-hidden="true" />
                        <div
                            ref={glassRef}
                            data-distortion="0.25"
                            data-shape-type-one="0"
                            data-size-two="1"
                            data-shininess="800"
                            data-use-blob-two="false"
                            data-gloss="0.3"
                            data-shape-type-two="0"
                            data-width-variation="1.8"
                            data-use-three-color="false"
                            data-sensitivity-three="0.15"
                            data-color-three="#FF6B00"
                            data-sensitivity-one="0.15"
                            data-size-three="1.3"
                            data-fluted-glass="true"
                            data-noise="0.40"
                            data-hover="false"
                            data-color-one="#146ef5"
                            data-columns="6"
                            data-shape-type-three="0"
                            data-sensitivity-two="0.15"
                            data-size-one="0.85"
                            data-bg-color="#000000"
                            data-hover-intensity="2.0"
                            data-color-two="#ffffff"
                            data-use-blob-one="true"
                            data-background-image=""
                            className="erplite-business-impact__glass-canvas fluted-glass-canvas"
                        />
                    </div>

                    <div className="erplite-business-impact__body">
                        <div className="erplite-business-impact__copy-col">
                            <h2 className="erplite-business-impact__title">
                                <span className="erplite-business-impact__title-line">From Chaos to Control:{' '}</span>
                                <span className="erplite-business-impact__title-line">Measurable Outcomes</span>
                            </h2>
                            <p className="erplite-business-impact__body-copy">
                                <span className="erplite-business-impact__copy-line">
                                    The implementation transformed HR from an administrative{' '}
                                </span>
                                <span className="erplite-business-impact__copy-line">
                                    bottleneck into an auditable, self-service operation,{' '}
                                </span>
                                <span className="erplite-business-impact__copy-line">
                                    eliminating weeks of manual payroll processing.
                                </span>
                            </p>
                            <div data-wf--button--variant="primary" className="erplite-business-impact__button btn">
                                <div aria-hidden="true" className="erplite-business-impact__button-text btn-text">
                                    Review Live Data
                                </div>
                                <div className="erplite-business-impact__button-icon btn-icon" aria-hidden="true">
                                    <div data-wf--button-icon--variant="arrow-right" className="button-icon-wrap">
                                        <div className="accordion-line-wrap">
                                            <div className="accordion-icon_line cc-horizontal cc-accordion-card"></div>
                                            <div className="accordion-icon_line cc-vertical cc-accordion-card"></div>
                                        </div>
                                        <div className="button-icon cc-arrow-right" aria-hidden="true"></div>
                                        <div className="button-icon cc-arrow-up-right" aria-hidden="true"></div>
                                        <div className="button-icon cc-play" aria-hidden="true"></div>
                                        <div className="button-icon cc-arrow-down" aria-hidden="true"></div>
                                        <div className="button-icon cc-arrow-left" aria-hidden="true"></div>
                                        <div className="button-icon cc-arrow-up" aria-hidden="true"></div>
                                    </div>
                                </div>
                                <a
                                    className="erplite-business-impact__link-cover u-link-cover w-inline-block"
                                    href="https://webflow.com/migrate/business-value-calculator#calculator"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="erplite-hero__sr-only">Use the calculator</span>
                                </a>
                            </div>
                        </div>

                        <div className="erplite-business-impact__media-col">
                            <div className="erplite-business-impact__image-offset">
                                <div className="erplite-business-impact__image-frame">
                                    <img
                                        src="https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/695e887fc945b678052de100_verifone.avif"
                                        alt=""
                                        loading="lazy"
                                        className="erplite-business-impact__image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ErpLiteG2Section: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') {
            return true;
        }

        return window.matchMedia(ERP_LITE_CMS_TABS_DESKTOP_QUERY).matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQueryList = window.matchMedia(ERP_LITE_CMS_TABS_DESKTOP_QUERY);
        const updateIsDesktop = (event: MediaQueryList | MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        updateIsDesktop(mediaQueryList);

        if (typeof mediaQueryList.addEventListener === 'function') {
            mediaQueryList.addEventListener('change', updateIsDesktop);

            return () => {
                mediaQueryList.removeEventListener('change', updateIsDesktop);
            };
        }

        mediaQueryList.addListener(updateIsDesktop);

        return () => {
            mediaQueryList.removeListener(updateIsDesktop);
        };
    }, []);

    useEffect(() => {
        if (!isDesktop) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setActiveTab(currentTab => (currentTab + 1) % erpLiteG2Tabs.length);
        }, ERP_LITE_CMS_TABS_AUTOPLAY_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [activeTab, isDesktop]);

    return (
        <section className="erplite-g2-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="erplite-g2-tabs">
                    <div className="erplite-g2-tabs__menu">
                        <div className="erplite-g2-tabs__content">
                            <h2 className="erplite-g2-tabs__title">Deep Dive: Workflows & Rules</h2>
                            <p className="erplite-g2-tabs__intro">
                                Each module enforces specific operational rules. Hover over the tabs below to inspect how Leave, Payroll, Documents, and Attendance are systematically governed.
                            </p>
                        </div>

                        <div className="erplite-g2-tabs__list" role="list">
                            {erpLiteG2Tabs.map((tab, index) => {
                                const isActive = index === activeTab;

                                return (
                                    <article
                                        key={tab.title}
                                        className={`erplite-g2-tabs__item ${isActive ? 'cc-active' : ''}`}
                                        role="listitem"
                                    >
                                        <div className="erplite-g2-tabs__link-wrapper">
                                            <button
                                                type="button"
                                                className="erplite-g2-tabs__button"
                                                aria-label={`Select ${tab.title} tab`}
                                                aria-pressed={isActive}
                                                onClick={() => setActiveTab(index)}
                                            />

                                            <div className="erplite-g2-tabs__progress-track" aria-hidden="true">
                                                <div
                                                    className="erplite-g2-tabs__progress-bar"
                                                    style={isActive && isDesktop
                                                        ? { animation: `erpliteCmsTabsProgress ${ERP_LITE_CMS_TABS_AUTOPLAY_MS}ms linear forwards` }
                                                        : undefined}
                                                />
                                            </div>

                                            <div className="erplite-g2-tabs__menu-text">
                                                <h3 className="erplite-g2-tabs__tab-title">{tab.title}</h3>
                                            </div>
                                        </div>

                                        <div
                                            className="erplite-g2-tabs__stage"
                                            aria-hidden={isDesktop ? !isActive : undefined}
                                        >
                                            <div className="erplite-g2-tabs__frame">
                                                <img
                                                    src={tab.imageSrc}
                                                    alt={tab.imageAlt}
                                                    loading="lazy"
                                                    className="erplite-g2-tabs__image"
                                                />
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    <div className="erplite-g2-tabs__spacer" aria-hidden="true" />
                </div>
            </div>
        </section>
    );
};

const ErpLiteFaqSection: React.FC = () => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (itemIndex: number) => {
        setOpenItems(currentItems =>
            currentItems.includes(itemIndex)
                ? currentItems.filter(index => index !== itemIndex)
                : [...currentItems, itemIndex]
        );
    };

    return (
        <section className="erplite-faq-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="erplite-faq__spacer" aria-hidden="true" />
                <div className="erplite-faq__row">
                    <div className="erplite-faq__heading-col">
                        <div className="erplite-faq__heading-sticky">
                            <h2 className="erplite-faq__heading">Technical<br />Decisions</h2>
                        </div>
                    </div>

                    <div className="erplite-faq__list-col">
                        <div className="erplite-faq__list">
                            {erpLiteFaqItems.map((item, index) => {
                                const isOpen = openItems.includes(index);
                                const contentId = `erplite-faq-panel-${index}`;
                                const triggerId = `erplite-faq-trigger-${index}`;

                                return (
                                    <details
                                        key={item.question}
                                        className="erplite-faq__item"
                                        open={isOpen}
                                    >
                                        <summary
                                            id={triggerId}
                                            className="erplite-faq__trigger"
                                            aria-controls={contentId}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                toggleItem(index);
                                            }}
                                        >
                                            <div className="erplite-faq__title-icon-wrap">
                                                <span className="erplite-faq__question">{item.question}</span>
                                            </div>
                                            <div className="erplite-faq__icon-wrap" aria-hidden="true">
                                                <span className="erplite-faq__icon-line erplite-faq__icon-line--horizontal" />
                                                <span className="erplite-faq__icon-line erplite-faq__icon-line--vertical" />
                                            </div>
                                        </summary>

                                        <div
                                            id={contentId}
                                            className="erplite-faq__content"
                                            aria-labelledby={triggerId}
                                            data-overflow-focus
                                        >
                                            <div className="erplite-faq__content-spacer">
                                                <div className="erplite-faq__answer">
                                                    {item.answer.map((paragraph, paragraphIndex) => (
                                                        <p key={`${item.question}-${paragraphIndex}`}>{paragraph}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </details>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ErpLiteScheduleDemoSection: React.FC = () => {
    const glassRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<MutationObserver | null>(null);
    const [glassReady, setGlassReady] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const watchForCanvas = () => {
            const host = glassRef.current;
            if (!host) return;

            if (host.querySelector('canvas')) {
                setGlassReady(true);
                return;
            }

            observerRef.current?.disconnect();
            observerRef.current = new MutationObserver(() => {
                if (host.querySelector('canvas')) {
                    setGlassReady(true);
                    observerRef.current?.disconnect();
                    observerRef.current = null;
                }
            });

            observerRef.current.observe(host, { childList: true, subtree: true });
        };

        ensureErpLiteGlassRuntime()
            .then(() => {
                if (cancelled) return;

                window.setTimeout(() => {
                    if (cancelled) return;
                    watchForCanvas();
                }, 80);
            })
            .catch(() => {
                if (!cancelled) {
                    setGlassReady(false);
                }
            });

        return () => {
            cancelled = true;
            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, []);

    return (
        <section className="erplite-demo-section">
            <div className="max-w-7xl mx-auto px-6 w-full erplite-demo-container">
                <div className={`erplite-demo-shell__glass fluted-glass-component u-bg-mode ${glassReady ? 'is-ready' : ''}`}>
                    <div className="erplite-demo-shell__glass-fallback" aria-hidden="true" />
                    <div
                        ref={glassRef}
                        data-distortion="0.25"
                        data-shape-type-one="0"
                        data-size-two="1"
                        data-shininess="800"
                        data-use-blob-two="false"
                        data-gloss="0.3"
                        data-shape-type-two="3"
                        data-width-variation="1.8"
                        data-use-three-color="true"
                        data-sensitivity-three="0.15"
                        data-color-three="#6BBE4D"
                        data-sensitivity-one="0.15"
                        data-size-three="1.3"
                        data-fluted-glass="true"
                        data-noise="0.40"
                        data-hover="true"
                        data-color-one="#146ef5"
                        data-columns="5"
                        data-shape-type-three="0"
                        data-sensitivity-two="0.15"
                        data-size-one="0.85"
                        data-bg-color=""
                        data-hover-intensity="2.0"
                        data-color-two="#6BBE4D"
                        data-use-blob-one="false"
                        data-background-image=""
                        className="erplite-demo-shell__glass-canvas fluted-glass-canvas"
                    />
                </div>

                <div className="erplite-demo-row">
                    <div className="erplite-demo-shell__copy-col">
                        <h2 className="erplite-demo-shell__title">View the full architecture</h2>

                        <p className="erplite-demo-shell__subheading">System Architecture &amp; API Specs</p>

                        <p className="erplite-demo-shell__body-copy">
                            Explore the complete database schema, module relationships, and API specifications that power ERP-Lite.
                        </p>

                        <div className="erplite-demo-shell__spacer" aria-hidden="true" />

                        <ul className="erplite-demo-shell__support-list">
                            {erpLiteDemoSupportItems.map((item, index) => (
                                <li key={index} className="erplite-demo-shell__support-item">
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="erplite-demo-shell__spacer" aria-hidden="true" />

                        <div data-wf--button--variant="primary" className="erplite-demo-shell__button btn">
                            <div aria-hidden="true" className="erplite-demo-shell__button-text btn-text">
                                View Documentation
                            </div>
                            <div className="erplite-demo-shell__button-icon btn-icon" aria-hidden="true">
                                <div data-wf--button-icon--variant="arrow-right" className="button-icon-wrap">
                                    <div className="accordion-line-wrap">
                                        <div className="accordion-icon_line cc-horizontal cc-accordion-card"></div>
                                        <div className="accordion-icon_line cc-vertical cc-accordion-card"></div>
                                    </div>
                                    <div className="button-icon cc-arrow-right" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-up-right" aria-hidden="true"></div>
                                    <div className="button-icon cc-play" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-down" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-left" aria-hidden="true"></div>
                                    <div className="button-icon cc-arrow-up" aria-hidden="true"></div>
                                </div>
                            </div>
                            <a
                                className="erplite-demo-shell__link-cover u-link-cover w-inline-block"
                                href="https://webflow.com/enterprise/contact-sales"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="erplite-hero__sr-only">Contact sales</span>
                            </a>
                        </div>
                    </div>

                    <div className="erplite-demo-shell__media-col">
                        <div className="erplite-demo-shell__media-wrap">
                            <div className="erplite-demo-shell__base-image-wrap">
                                <img
                                    src="/images/hr-docs/g2-audit-trail.webp"
                                    alt="API documentation snippet"
                                    loading="lazy"
                                    className="erplite-demo-shell__base-image"
                                />
                            </div>

                            <div className="erplite-demo-shell__floating-image-wrap" aria-hidden="true">
                                <img
                                    src="/images/hr-docs/g2-document-control.webp"
                                    alt="Code snippet"
                                    loading="lazy"
                                    className="erplite-demo-shell__floating-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ErpLiteCaseStudy: React.FC = () => {
    return (
        <div className="fmcg-case-study">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;700&display=swap');
                @font-face {
                    font-family: 'WF Visual Sans Variable';
                    src: url('https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/68c092dccb7bd070430a0910_WFVisualSans%5Bwght%2Copsz%5D.woff2') format('woff2');
                    font-weight: 100 900;
                    font-style: normal;
                    font-display: swap;
                }

                .fmcg-case-study {
                    --brand:#4F46E5;--brand-hover:#4338CA;--brand-light:#EEF2FF;--brand-border:#C7D2FE;
                    --w:#FFFFFF;--off:#F8FAFC;--off2:#F1F5F9;
                    --ink:#0F172A;--ink2:#1E293B;--ink3:#64748B;--ink4:#94A3B8;
                    --ln:#E2E8F0;--ln2:#CBD5E1;
                    --gm:#059669;--gbg:#ECFDF5;--gdk:#065F46;
                    --rm:#DC2626;--rbg:#FEF2F2;
                    --am:#D97706;--abg:#FFFBEB;
                    --bm:#2563EB;--bbg:#EFF6FF;
                    --serif:'Plus Jakarta Sans',system-ui,sans-serif;
                    --sans:'Plus Jakarta Sans',system-ui,sans-serif;
                    --mono:'JetBrains Mono',monospace;
                    --webflow-sans:'WF Visual Sans Variable',Arial,sans-serif;

                    font-family: var(--sans);
                    background: var(--w);
                    color: var(--ink);
                    -webkit-font-smoothing: antialiased;
                }

                .fmcg-case-study h1 {
                    font-family: var(--sans);
                    font-size: clamp(42px, 5vw, 76px);
                    line-height: 1.05;
                    letter-spacing: -0.04em;
                    color: var(--ink);
                    margin-bottom: 24px;
                    font-weight: 800;
                }
                .fmcg-case-study h1 em {
                    font-style: italic;
                    color: var(--ink4);
                    font-weight: 600;
                }
                .fmcg-case-study #hero {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    padding: 120px 0 80px;
                    position: relative;
                    overflow: hidden;
                }
                .fmcg-case-study #hero.erplite-hero-section {
                    --erplite-section-space-sm: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem);
                    --erplite-space-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    --erplite-space-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    --erplite-space-lg: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    --erplite-eyebrow-size: clamp(1rem, calc(0.9285714286rem + 0.3571428571vw), 1.25rem);
                    --erplite-title-size: clamp(2.75rem, calc(2.1071428571rem + 3.2142857143vw), 5rem);
                    --erplite-body-size: clamp(1.1rem, calc(1.0571428571rem + 0.2142857143vw), 1.25rem);
                    --erplite-hero-top-space: clamp(6.5rem, calc(5.9285714286rem + 2.8571428571vw), 8.5rem);
                    min-height: auto;
                    display: block;
                    padding: var(--erplite-hero-top-space) 0 var(--erplite-section-space-sm);
                    background: #ffffff;
                    position: relative;
                    overflow: hidden;
                }
                .fmcg-case-study .erplite-hero__container {
                    position: relative;
                    z-index: 1;
                }
                .fmcg-case-study .erplite-hero__row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    margin-left: 0;
                    margin-right: 0;
                }
                .fmcg-case-study .erplite-hero__copy-col {
                    flex: 0 0 83.3333%;
                    max-width: 83.3333%;
                    padding-left: 0;
                    padding-right: 0;
                    display: flex;
                }
                .fmcg-case-study .erplite-hero__copy {
                    max-width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    width: 100%;
                }
                .fmcg-case-study .erplite-hero__spacer {
                    width: 100%;
                    height: var(--erplite-section-space-sm);
                }
                .fmcg-case-study .erplite-hero__eyebrow-wrap,
                .fmcg-case-study .erplite-hero__heading-wrap,
                .fmcg-case-study .erplite-hero__body-wrap,
                .fmcg-case-study .erplite-hero__button-wrap,
                .fmcg-case-study .erplite-hero__media-block {
                    opacity: 0;
                    transform: translate3d(0, 24px, 0);
                    transition: opacity 0.82s cubic-bezier(0.16, 1, 0.3, 1), transform 0.82s cubic-bezier(0.16, 1, 0.3, 1);
                    will-change: opacity, transform;
                }
                .fmcg-case-study .erplite-hero__heading-wrap {
                    transform: translate3d(0, 32px, 0);
                    transition-duration: 0.92s;
                }
                .fmcg-case-study .erplite-hero__media-block {
                    transform: translate3d(0, 40px, 0) scale(0.985);
                    transition-duration: 1s;
                    transform-origin: 50% 50%;
                }
                .fmcg-case-study .erplite-hero-section.is-mounted .erplite-hero__eyebrow-wrap,
                .fmcg-case-study .erplite-hero-section.is-mounted .erplite-hero__heading-wrap,
                .fmcg-case-study .erplite-hero-section.is-mounted .erplite-hero__body-wrap,
                .fmcg-case-study .erplite-hero-section.is-mounted .erplite-hero__button-wrap,
                .fmcg-case-study .erplite-hero-section.is-mounted .erplite-hero__media-block {
                    opacity: 1;
                    transform: none;
                }
                .fmcg-case-study .erplite-hero-section.is-mounted .erplite-hero__eyebrow-wrap { transition-delay: 0.06s; }
                .fmcg-case-study .erplite-hero-section.is-mounted .erplite-hero__heading-wrap { transition-delay: 0.12s; }
                .fmcg-case-study .erplite-hero-section.is-mounted .erplite-hero__body-wrap { transition-delay: 0.2s; }
                .fmcg-case-study .erplite-hero-section.is-mounted .erplite-hero__button-wrap { transition-delay: 0.28s; }
                .fmcg-case-study .erplite-hero-section.is-mounted .erplite-hero__media-block { transition-delay: 0.22s; }
                .fmcg-case-study .erplite-hero__eyebrow-wrap {
                    align-self: flex-start;
                    display: inline-block;
                }
                .fmcg-case-study .erplite-hero__eyebrow {
                    margin: 0 0 var(--erplite-space-sm);
                    color: #5a5a5a;
                    font-family: var(--sans);
                    font-size: var(--erplite-eyebrow-size);
                    line-height: 1.4;
                    font-weight: 600;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-hero__heading-wrap {
                    margin-bottom: 0;
                }
                .fmcg-case-study .erplite-hero__heading {
                    margin: 0 0 var(--erplite-space-md);
                    max-width: none;
                    width: 100%;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: var(--erplite-title-size);
                    line-height: 1.04;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-hero__body-wrap {
                    max-width: 40ch;
                    margin-bottom: var(--erplite-space-sm);
                }
                .fmcg-case-study .erplite-hero__body {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: var(--erplite-body-size);
                    line-height: 1.5;
                    font-weight: 500;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-hero__button-wrap {
                    align-self: flex-start;
                }
                .fmcg-case-study .erplite-hero__button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    padding: 1em 1.5em;
                    border-radius: 4px;
                    border: none;
                    background: #146ef5;
                    box-shadow: none;
                    color: #ffffff;
                    font-family: var(--sans);
                    font-size: 16px;
                    line-height: 1.2;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    text-decoration: none;
                    transition: none;
                }
                .fmcg-case-study .erplite-hero__button:hover {
                    background: #146ef5;
                    transform: none;
                }
                .fmcg-case-study .erplite-hero__button-text {
                    pointer-events: none;
                    position: relative;
                }
                .fmcg-case-study .erplite-hero__button-link {
                    z-index: 1;
                    display: block;
                    cursor: pointer;
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                    text-decoration: none;
                }
                .fmcg-case-study .erplite-hero__button-link:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .erplite-hero__sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }
                .fmcg-case-study .erplite-hero__media-block {
                    position: relative;
                    width: 100%;
                    margin-top: 0;
                }
                .fmcg-case-study .erplite-hero__card {
                    position: relative;
                    overflow: clip;
                    border: 1px solid #d8d8d8;
                    border-radius: 8px;
                    background: #080808;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    width: 100%;
                }
                .fmcg-case-study .erplite-hero__glass-layer {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    overflow: hidden;
                    pointer-events: none;
                }
                .fmcg-case-study .erplite-hero__glass-fallback {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(circle at 32% 36%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 28%),
                        linear-gradient(120deg, #071225 0%, #133c87 34%, #0b2f72 69%, #04122a 100%);
                    transition: opacity 0.25s ease;
                }
                .fmcg-case-study .erplite-hero__glass-layer.is-ready .erplite-hero__glass-fallback {
                    opacity: 0;
                }
                .fmcg-case-study .erplite-hero__glass-canvas {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    min-height: 100%;
                }
                .fmcg-case-study .erplite-hero__image-frame {
                    position: relative;
                    z-index: 1;
                    aspect-ratio: 16 / 9;
                    width: 100%;
                    overflow: hidden;
                    border-radius: inherit;
                }
                .fmcg-case-study .erplite-hero__image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .fmcg-case-study .erplite-overview-section {
                    --erplite-overview-gap-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .erplite-overview-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: flex-start;
                    row-gap: 1.5rem;
                }
                .fmcg-case-study .erplite-overview-col {
                    flex: 0 0 41.6667%;
                    max-width: 41.6667%;
                }
                .fmcg-case-study .erplite-overview-heading {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(2rem, calc(1.5714285714rem + 2.1428571429vw), 3.5rem);
                    line-height: 1.04;
                    font-variation-settings: "wght" 700, "opsz" 100;
                    font-weight: 700;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-overview-copy {
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(1.1rem, calc(1.0571428571rem + 0.2142857143vw), 1.25rem);
                    line-height: 1.5;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-overview-copy p {
                    margin: 0 0 var(--erplite-overview-gap-sm);
                }
                .fmcg-case-study .erplite-overview-copy p:last-child {
                    margin-bottom: 0;
                }
                .fmcg-case-study .erplite-cms-tabs-section {
                    --erplite-tabs-gap-main: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    --erplite-tabs-gap-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    --erplite-tabs-gap-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .erplite-cms-tabs {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    gap: var(--erplite-tabs-gap-main);
                }
                .fmcg-case-study .erplite-cms-tabs__spacer {
                    aspect-ratio: 8 / 9;
                    width: calc((100% - var(--erplite-tabs-gap-main)) / 2);
                    flex: none;
                }
                .fmcg-case-study .erplite-cms-tabs__menu {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: stretch;
                    gap: var(--erplite-tabs-gap-md);
                    max-width: 28.75rem;
                }
                .fmcg-case-study .erplite-cms-tabs__content {
                    display: flex;
                    flex-direction: column;
                }
                .fmcg-case-study .erplite-cms-tabs__title {
                    margin: 0 0 var(--erplite-tabs-gap-sm);
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(1.75rem, calc(1.5357142857rem + 1.0714285714vw), 2.5rem);
                    line-height: 1.2;
                    font-variation-settings: "wght" 700, "opsz" 100;
                    font-weight: 700;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-cms-tabs__intro {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-cms-tabs__list {
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    gap: var(--erplite-tabs-gap-md);
                }
                .fmcg-case-study .erplite-cms-tabs__item {
                    flex: 0 0 auto;
                }
                .fmcg-case-study .erplite-cms-tabs__link-wrapper {
                    display: flex;
                    flex-direction: column;
                    transition: opacity 0.3s ease;
                }
                .fmcg-case-study .erplite-cms-tabs__trigger {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
                .fmcg-case-study .erplite-cms-tabs__progress-track {
                    margin-bottom: var(--erplite-tabs-gap-md);
                    background: #f0f0f0;
                    width: 100%;
                    height: 2px;
                    overflow: hidden;
                }
                .fmcg-case-study .erplite-cms-tabs__progress-bar {
                    background: #080808;
                    width: 0%;
                    height: 100%;
                }
                .fmcg-case-study .erplite-cms-tabs__button {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    border: 0;
                    background: transparent;
                    cursor: pointer;
                }
                .fmcg-case-study .erplite-cms-tabs__button:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .erplite-cms-tabs__menu-text {
                    position: relative;
                    z-index: 1;
                    filter: saturate(100%);
                    transition: filter 0.2s ease;
                }
                .fmcg-case-study .erplite-cms-tabs__tab-title {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(1.125rem, calc(1.0892857143rem + 0.1785714286vw), 1.25rem);
                    line-height: 1.4;
                    font-weight: 600;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-cms-tabs__interactive-content {
                    width: 100%;
                    max-height: 0;
                    overflow: hidden;
                    opacity: 0;
                    transition: max-height 0.5s cubic-bezier(0.45, 0, 0.55, 1), opacity 0.1s linear;
                }
                .fmcg-case-study .erplite-cms-tabs__interactive-inner {
                    padding-top: var(--erplite-tabs-gap-sm);
                    overflow: hidden;
                }
                .fmcg-case-study .erplite-cms-tabs__body {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-cms-tabs__cta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--erplite-tabs-gap-sm);
                    margin-top: var(--erplite-tabs-gap-sm);
                }
                .fmcg-case-study .erplite-cms-tabs__cta-shell {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.45rem;
                    color: inherit;
                    filter: saturate(100%);
                    transition-property: color, filter;
                    transition-duration: 0.3s, 0.3s;
                    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1), ease;
                }
                .fmcg-case-study .erplite-cms-tabs__cta-text {
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.2;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    text-decoration: none;
                    display: inline;
                    background-image: linear-gradient(currentColor, currentColor);
                    background-position: 0 1.1em;
                    background-repeat: no-repeat;
                    background-size: 100% 0.08em;
                    transition:
                        background-size 0.45s cubic-bezier(0.645, 0.045, 0.355, 1),
                        background-position 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
                .fmcg-case-study .erplite-cms-tabs__cta-icon {
                    position: relative;
                    width: 1.2em;
                    height: 1.2em;
                    flex: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 1;
                }
                .fmcg-case-study .erplite-cms-tabs__cta-icon-glyph {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
                .fmcg-case-study .erplite-cms-tabs__cta-icon-glyph.is-arrow-right {
                    transform: translateX(0);
                }
                .fmcg-case-study .erplite-cms-tabs__cta-link {
                    position: absolute;
                    inset: -0.125rem;
                    z-index: 1;
                    border-radius: 0.125rem;
                }
                .fmcg-case-study .erplite-cms-tabs__cta-link:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .erplite-cms-tabs__cta-shell:hover .erplite-cms-tabs__cta-text,
                .fmcg-case-study .erplite-cms-tabs__cta-shell:focus-within .erplite-cms-tabs__cta-text {
                    background-position: 100% 1.1em;
                    background-size: 0 0.08em;
                }
                .fmcg-case-study .erplite-cms-tabs__cta-shell:hover .erplite-cms-tabs__cta-icon-glyph.is-arrow-right,
                .fmcg-case-study .erplite-cms-tabs__cta-shell:focus-within .erplite-cms-tabs__cta-icon-glyph.is-arrow-right {
                    transform: translateX(6px);
                }
                .fmcg-case-study .erplite-cms-tabs__stage {
                    pointer-events: none;
                    position: absolute;
                    inset: 0 auto auto 0;
                    display: flex;
                    width: calc((100% - var(--erplite-tabs-gap-main)) / 2);
                    max-height: none;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: stretch;
                    opacity: 0;
                    transition: opacity 0.25s cubic-bezier(0.45, 0, 0.55, 1);
                    will-change: opacity;
                }
                .fmcg-case-study .erplite-cms-tabs__image-frame {
                    position: relative;
                    width: 100%;
                    max-height: 100%;
                    aspect-ratio: 8 / 9;
                    overflow: hidden;
                    background: #f0f0f0;
                }
                .fmcg-case-study .erplite-cms-tabs__image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 0% 0%;
                    display: block;
                    backface-visibility: hidden;
                }
                @keyframes erpliteCmsTabsProgress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                @media (hover: hover) and (pointer: fine) and (min-width: 768px) {
                    .fmcg-case-study .erplite-cms-tabs__item .erplite-cms-tabs__link-wrapper:hover {
                        opacity: 0.8;
                    }
                }
                @media (min-width: 768px) {
                    .fmcg-case-study .erplite-cms-tabs__item .erplite-cms-tabs__link-wrapper {
                        opacity: 0.5;
                    }
                    .fmcg-case-study .erplite-cms-tabs__item .erplite-cms-tabs__progress-bar {
                        opacity: 0.5;
                    }
                    .fmcg-case-study .erplite-cms-tabs__item .erplite-cms-tabs__menu-text,
                    .fmcg-case-study .erplite-cms-tabs__item .erplite-cms-tabs__cta-shell {
                        filter: saturate(0%);
                    }
                    .fmcg-case-study .erplite-cms-tabs__item.cc-active .erplite-cms-tabs__link-wrapper {
                        opacity: 1;
                    }
                    .fmcg-case-study .erplite-cms-tabs__item.cc-active .erplite-cms-tabs__progress-bar {
                        opacity: 1;
                    }
                    .fmcg-case-study .erplite-cms-tabs__item.cc-active .erplite-cms-tabs__menu-text,
                    .fmcg-case-study .erplite-cms-tabs__item.cc-active .erplite-cms-tabs__cta-shell {
                        filter: saturate(100%);
                    }
                    .fmcg-case-study .erplite-cms-tabs__item.cc-active .erplite-cms-tabs__interactive-content {
                        max-height: 24rem;
                        overflow: visible;
                        opacity: 1;
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .fmcg-case-study .erplite-cms-tabs__link-wrapper,
                    .fmcg-case-study .erplite-cms-tabs__menu-text,
                    .fmcg-case-study .erplite-cms-tabs__interactive-content,
                    .fmcg-case-study .erplite-cms-tabs__stage,
                    .fmcg-case-study .erplite-cms-tabs__cta-shell,
                    .fmcg-case-study .erplite-cms-tabs__cta-icon-glyph {
                        transition-duration: 0s;
                    }
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .erplite-cms-tabs {
                        display: block;
                    }
                    .fmcg-case-study .erplite-cms-tabs__spacer {
                        display: none;
                    }
                    .fmcg-case-study .erplite-cms-tabs__menu {
                        max-width: none;
                    }
                    .fmcg-case-study .erplite-cms-tabs__button {
                        display: none;
                    }
                    .fmcg-case-study .erplite-cms-tabs__interactive-content {
                        max-height: none;
                        overflow: visible;
                        opacity: 1;
                    }
                    .fmcg-case-study .erplite-cms-tabs__stage {
                        position: relative;
                        inset: auto;
                        width: auto;
                        margin-top: var(--erplite-tabs-gap-md);
                        display: block;
                        z-index: auto !important;
                        opacity: 1;
                        pointer-events: auto;
                    }
                }
                .fmcg-case-study .erplite-why-section {
                    --erplite-why-gap-main: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    --erplite-why-gap-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    --erplite-why-gap-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    --erplite-why-sticky-offset: clamp(3rem, calc(1.2857142857rem + 8.5714285714vw), 9rem);
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .erplite-why__intro {
                    width: 50%;
                    max-width: 50%;
                    margin: 0 auto;
                    text-align: center;
                }
                .fmcg-case-study .erplite-why__heading {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(2rem, calc(1.5714285714rem + 2.1428571429vw), 3.5rem);
                    line-height: 1.04;
                    font-variation-settings: "wght" 700, "opsz" 100;
                    font-weight: 700 !important;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-why__summary {
                    max-width: none;
                    margin: var(--erplite-why-gap-sm) auto 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-why__rows {
                    margin-top: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    position: relative;
                }
                .fmcg-case-study .erplite-why__row {
                    display: flex;
                    align-items: center;
                    min-height: 80vh;
                }
                .fmcg-case-study .erplite-why__copy-col {
                    position: relative;
                    z-index: 1;
                    width: 41.6667%;
                    max-width: 41.6667%;
                }
                .fmcg-case-study .erplite-why__row-title {
                    margin: 0 0 var(--erplite-why-gap-sm);
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(1.75rem, calc(1.5357142857rem + 1.0714285714vw), 2.5rem);
                    line-height: 1.2;
                    font-variation-settings: "wght" 700, "opsz" 100;
                    font-weight: 700 !important;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-why__copy {
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-why__copy p {
                    margin: 0 0 var(--erplite-why-gap-sm);
                }
                .fmcg-case-study .erplite-why__copy p:last-child {
                    margin-bottom: 0;
                }
                .fmcg-case-study .erplite-why__cta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--erplite-why-gap-sm);
                    margin-top: var(--erplite-why-gap-sm);
                }
                .fmcg-case-study .erplite-why__cta {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4em;
                    padding: 0;
                    border-radius: 0;
                    background: transparent;
                    color: inherit;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.2;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    text-decoration: none;
                    transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .fmcg-case-study .erplite-why__cta:hover {
                    color: #363636;
                }
                .fmcg-case-study .erplite-why__cta:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .erplite-why__cta-text {
                    position: relative;
                    display: inline;
                    background-image: linear-gradient(currentColor, currentColor);
                    background-position: 0 1.1em;
                    background-repeat: no-repeat;
                    background-size: 100% 0.08em;
                    transition:
                        background-size 0.45s cubic-bezier(0.645, 0.045, 0.355, 1),
                        background-position 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
                .fmcg-case-study .erplite-why__cta:hover .erplite-why__cta-text,
                .fmcg-case-study .erplite-why__cta:focus-visible .erplite-why__cta-text {
                    background-position: 100% 1.1em;
                    background-size: 0 0.08em;
                }
                .fmcg-case-study .erplite-why__cta-arrow {
                    flex: none;
                    line-height: 1;
                    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
                .fmcg-case-study .erplite-why__cta:hover .erplite-why__cta-arrow {
                    transform: translateX(0.35em);
                }
                .fmcg-case-study .erplite-why__image-position {
                    pointer-events: none;
                    position: absolute;
                    left: 0%;
                    right: 0%;
                    top: calc(0rem - var(--erplite-why-sticky-offset));
                    bottom: calc(0rem - var(--erplite-why-sticky-offset));
                }
                .fmcg-case-study .erplite-why__image-track {
                    height: 100%;
                    max-width: 80rem;
                    margin-left: calc(var(--erplite-why-gap-main) / 2 * -1);
                    margin-right: calc(var(--erplite-why-gap-main) / 2 * -1);
                }
                .fmcg-case-study .erplite-why__image-sticky {
                    position: sticky;
                    top: 0;
                    display: flex;
                    min-height: 100svh;
                    padding-left: calc(var(--erplite-why-gap-main) / 2);
                    padding-right: calc(var(--erplite-why-gap-main) / 2);
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;
                }
                .fmcg-case-study .erplite-why__image-wrap {
                    z-index: 1;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;
                    width: calc((100% - var(--erplite-why-gap-main)) * (5 / 12));
                    max-height: min(50rem, calc(100vh - (var(--erplite-why-sticky-offset) * 2)));
                    aspect-ratio: 3 / 4;
                    margin-bottom: var(--erplite-why-gap-md);
                    margin-left: auto;
                    overflow: hidden;
                    border-radius: 0.5rem;
                    background: #f0f0f0;
                    clip-path: inset(0% 0% 0% 100%);
                    transition-property: clip-path, opacity;
                    transition-duration: 0.35s, 0.25s;
                    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1), cubic-bezier(0.45, 0, 0.55, 1);
                    will-change: clip-path, opacity;
                }
                .fmcg-case-study .erplite-why__image-wrap:has(.erplite-why__image-link.w--current) {
                    clip-path: inset(0%);
                    width: calc((100% - var(--erplite-why-gap-main)) * (5 / 12));
                }
                .fmcg-case-study .erplite-why__image-frame {
                    position: relative;
                    width: 100%;
                    min-height: 100%;
                    aspect-ratio: 3 / 4;
                    border-radius: inherit;
                    overflow: hidden;
                }
                .fmcg-case-study .erplite-why__image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .fmcg-case-study .erplite-why__image-link {
                    display: none;
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                    background: transparent;
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .erplite-why__row {
                        display: block;
                        min-height: auto;
                        padding-bottom: var(--erplite-why-gap-main);
                    }
                    .fmcg-case-study .erplite-why__intro {
                        width: 100%;
                        max-width: none;
                    }
                    .fmcg-case-study .erplite-why__copy-col {
                        width: 100%;
                        max-width: 100%;
                    }
                    .fmcg-case-study .erplite-why__image-position {
                        position: static;
                        width: 100%;
                        margin-top: var(--erplite-why-gap-md);
                        pointer-events: auto;
                    }
                    .fmcg-case-study .erplite-why__image-track {
                        height: auto;
                        max-width: none;
                        margin-left: 0;
                        margin-right: 0;
                    }
                    .fmcg-case-study .erplite-why__image-sticky {
                        position: static;
                        min-height: 0;
                        padding-left: 0;
                        padding-right: 0;
                    }
                    .fmcg-case-study .erplite-why__image-wrap {
                        width: 100%;
                        max-height: 92vw;
                        margin-left: 0;
                        margin-bottom: 0;
                        clip-path: none;
                    }
                    .fmcg-case-study .erplite-why__image-wrap:has(.erplite-why__image-link.w--current) {
                        width: 100%;
                    }
                }
                .fmcg-case-study .erplite-migration-section {
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .erplite-migration-card {
                    position: relative;
                    overflow: clip;
                    border-radius: 0.5rem;
                    border: 1px solid transparent;
                    background: #080808;
                    color: #ffffff;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                }
                .fmcg-case-study .erplite-migration-card__glass {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    min-width: 800px;
                    overflow: hidden;
                }
                .fmcg-case-study .erplite-migration-card__glass-fallback {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(circle at 78% 26%, rgba(55, 137, 255, 0.28) 0%, rgba(55, 137, 255, 0) 34%),
                        linear-gradient(135deg, #060c18 0%, #0b1730 34%, #0a2347 67%, #050b16 100%);
                    transition: opacity 0.25s ease;
                }
                .fmcg-case-study .erplite-migration-card__glass.is-ready .erplite-migration-card__glass-fallback {
                    opacity: 0;
                }
                .fmcg-case-study .erplite-migration-card__glass-canvas {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    min-height: 100%;
                }
                .fmcg-case-study .erplite-migration-card__body {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-items: center;
                    row-gap: clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem);
                    margin-left: calc(clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem) / -2);
                    margin-right: calc(clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem) / -2);
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem);
                }
                .fmcg-case-study .erplite-migration-card__content {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    flex: 1 1 0;
                    max-width: 100%;
                    padding-left: calc(clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem) / 2);
                    padding-right: calc(clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem) / 2);
                }
                .fmcg-case-study .erplite-migration-card__copy-group {
                    margin-bottom: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                }
                .fmcg-case-study .erplite-migration-card__title {
                    margin: 0 0 clamp(0.375rem, calc(0.3392857143rem + 0.1785714286vw), 0.5rem);
                    color: #ffffff;
                    font-family: var(--sans);
                    font-size: clamp(1.375rem, calc(1.1964285714rem + 0.8928571429vw), 2rem);
                    line-height: 1.2;
                    font-variation-settings: "wght" 600, "opsz" 100;
                    font-weight: 600;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-migration-card__body-copy {
                    margin: 0;
                    color: rgba(255, 255, 255, 0.9);
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-migration-card__button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    flex: none;
                    position: relative;
                    padding: 1em 1.5em;
                    border-radius: 0.25rem;
                    background: #146ef5;
                    color: #ffffff;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.2em;
                    font-variation-settings: "wght" 500, "opsz" 20;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    text-decoration: none;
                    transition: background-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .fmcg-case-study .erplite-migration-card__button:hover,
                .fmcg-case-study .erplite-migration-card__button:has(.erplite-migration-card__button-link:focus-visible) {
                    background: #0055d4;
                    color: #ffffff;
                }
                .fmcg-case-study .erplite-migration-card__button-text {
                    pointer-events: none;
                    position: relative;
                }
                .fmcg-case-study .erplite-migration-card__button-link {
                    position: absolute;
                    inset: 0;
                    z-index: 3;
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                    cursor: pointer;
                    text-decoration: none;
                }
                .fmcg-case-study .erplite-migration-card__button-link:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .erplite-migration-card__cover-col {
                    display: flex;
                    justify-content: center;
                    flex: 1 1 0;
                    max-width: 100%;
                    padding-left: calc(clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem) / 2);
                    padding-right: calc(clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem) / 2);
                }
                .fmcg-case-study .erplite-migration-card__cover-wrap {
                    position: relative;
                    width: 100%;
                    max-width: 20rem;
                    aspect-ratio: 1;
                    margin: 0 auto;
                }
                .fmcg-case-study .erplite-migration-card__cover {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: 50% 50%;
                    display: block;
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .erplite-migration-card__content,
                    .fmcg-case-study .erplite-migration-card__cover-col {
                        flex-basis: 100%;
                    }
                    .fmcg-case-study .erplite-migration-card__body {
                        align-items: stretch;
                    }
                }
                .fmcg-case-study .erplite-customers-section {
                    --erplite-customers-gap-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .erplite-customers__intro-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                    row-gap: var(--erplite-customers-gap-md);
                }
                .fmcg-case-study .erplite-customers__intro-col {
                    flex: 0 1 41.6667%;
                    max-width: 41.6667%;
                }
                .fmcg-case-study .erplite-customers__heading {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(2rem, calc(1.5714285714rem + 2.1428571429vw), 3.5rem);
                    line-height: 1.04;
                    font-variation-settings: "wght" 600, "opsz" 100;
                    font-weight: 600;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-customers__summary {
                    margin: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem) 0 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-variation-settings: "wght" 400, "opsz" 16;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-customers__badges-col {
                    flex: 0 1 50%;
                    max-width: 50%;
                }
                .fmcg-case-study .erplite-customers__badges-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: var(--erplite-customers-gap-md);
                }
                .fmcg-case-study .erplite-customers__badge-frame {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 869 / 1000;
                }
                .fmcg-case-study .erplite-customers__badge-image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 50% 50%;
                    display: block;
                }
                .fmcg-case-study .erplite-customers-slider-section {
                    --erplite-customers-slider-gap-xs: clamp(0.375rem, calc(0.3392857143rem + 0.1785714286vw), 0.5rem);
                    --erplite-customers-slider-gap-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    --erplite-customers-slider-gap-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    --erplite-customers-slider-gap-main: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    --erplite-customers-slider-gap-xl: clamp(2.25rem, calc(2.0357142857rem + 1.0714285714vw), 3rem);
                    --erplite-customers-slider-card-width: min(100%, calc(100vw - clamp(10rem, 18vw, 16rem)));
                    padding: 0 0 clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem);
                    background: #ffffff;
                    position: relative;
                    overflow: hidden;
                }
                .fmcg-case-study .erplite-customers-slider {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    container-type: inline-size;
                }
                .fmcg-case-study .erplite-customers-slider__controls {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: var(--erplite-customers-slider-gap-md);
                    position: relative;
                    z-index: 1;
                }
                .fmcg-case-study .erplite-customers-slider__control {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.25rem;
                    height: 2.25rem;
                    border: 1px solid transparent;
                    border-radius: 50%;
                    background: #080808;
                    color: #ffffff;
                    cursor: pointer;
                    flex: none;
                    padding: 0;
                    position: relative;
                    font-family: var(--webflow-sans);
                    line-height: 1;
                    font-size: 0.875rem;
                    font-weight: 400;
                    opacity: 1;
                    box-shadow: none;
                    transition:
                        background-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
                        color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
                        box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
                        opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .fmcg-case-study .erplite-customers-slider__control:not(:disabled):hover,
                .fmcg-case-study .erplite-customers-slider__control:not(:disabled):focus-visible {
                    background: #146ef5;
                    color: #ffffff;
                    box-shadow:
                        rgba(8, 8, 8, 0.08) 0px 1px 1px 0px,
                        rgba(8, 8, 8, 0.2) 0px 1px 1px 0px,
                        rgba(255, 255, 255, 0.12) 0px 6px 12px 0px inset,
                        rgba(255, 255, 255, 0.2) 0px 1px 1px 0px inset;
                    opacity: 1;
                }
                .fmcg-case-study .erplite-customers-slider__control .button-icon-wrap {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    flex-flow: row;
                }
                .fmcg-case-study .erplite-customers-slider__control .accordion-line-wrap {
                    pointer-events: none;
                    justify-content: center;
                    align-items: center;
                    display: none;
                    position: absolute;
                    inset: 0;
                }
                .fmcg-case-study .erplite-customers-slider__control .accordion-icon_line {
                    background-color: #146ef5;
                    flex: none;
                    width: 1rem;
                    max-width: 50%;
                    height: 1.5px;
                }
                .fmcg-case-study .erplite-customers-slider__control .cc-vertical {
                    position: absolute;
                    transform: rotate(90deg);
                }
                .fmcg-case-study .erplite-customers-slider__control .button-icon {
                    pointer-events: none;
                    -webkit-user-select: none;
                    user-select: none;
                    line-height: 1;
                    position: relative;
                    display: none;
                    width: 1rem;
                    height: 1rem;
                    color: inherit;
                }
                .fmcg-case-study .erplite-customers-slider__control .button-icon::before,
                .fmcg-case-study .erplite-customers-slider__control .button-icon::after {
                    content: "";
                    position: absolute;
                    display: block;
                    background: currentColor;
                    border-radius: 999px;
                }
                .fmcg-case-study .erplite-customers-slider__control .cc-arrow-left,
                .fmcg-case-study .erplite-customers-slider__control .cc-arrow-right {
                    display: block;
                }
                .fmcg-case-study .erplite-customers-slider__control .cc-arrow-left::before,
                .fmcg-case-study .erplite-customers-slider__control .cc-arrow-right::before {
                    top: 50%;
                    left: 0.125rem;
                    right: 0.125rem;
                    height: 1.5px;
                    transform: translateY(-50%);
                    transform-origin: center;
                }
                .fmcg-case-study .erplite-customers-slider__control .cc-arrow-left::after,
                .fmcg-case-study .erplite-customers-slider__control .cc-arrow-right::after {
                    width: 0.45rem;
                    height: 0.45rem;
                    top: 50%;
                    border-top: 1.5px solid currentColor;
                    border-right: 1.5px solid currentColor;
                    background: transparent;
                    border-radius: 0;
                    transform-origin: center;
                }
                .fmcg-case-study .erplite-customers-slider__control .cc-arrow-left::after {
                    left: 0.18rem;
                    transform: translateY(-50%) rotate(-135deg);
                }
                .fmcg-case-study .erplite-customers-slider__control .cc-arrow-right::after {
                    right: 0.18rem;
                    transform: translateY(-50%) rotate(45deg);
                }
                .fmcg-case-study .erplite-customers-slider__control[data-direction="previous"] .cc-arrow-right,
                .fmcg-case-study .erplite-customers-slider__control[data-direction="next"] .cc-arrow-left {
                    display: none;
                }
                .fmcg-case-study .erplite-customers-slider__control:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .erplite-customers-slider__control:disabled,
                .fmcg-case-study .erplite-customers-slider__control.swiper-button-disabled {
                    opacity: 0.35;
                    cursor: default;
                    pointer-events: none;
                }
                .fmcg-case-study .erplite-customers-slider__offset {
                    flex: 1;
                    display: flex;
                    width: 100vw;
                    margin-left: calc((100vw - 100%) / -2);
                    margin-right: calc((100vw - 100%) / -2);
                    overflow: visible;
                }
                .fmcg-case-study .erplite-customers-slider__track {
                    display: flex;
                    align-items: stretch;
                    gap: var(--erplite-customers-slider-gap-md);
                    width: max-content;
                    overflow: visible;
                    transform: translate3d(calc((100vw - var(--erplite-customers-slider-card-width)) / 2), 0, 0);
                    transition: transform 0.55s cubic-bezier(0.165, 0.84, 0.44, 1);
                    will-change: transform;
                }
                .fmcg-case-study .erplite-customers-slider__track[data-active-slide="1"] {
                    transform: translate3d(calc((100vw - var(--erplite-customers-slider-card-width)) / 2 - var(--erplite-customers-slider-card-width) - var(--erplite-customers-slider-gap-md)), 0, 0);
                }
                .fmcg-case-study .erplite-customers-slider__track[data-active-slide="2"] {
                    transform: translate3d(calc((100vw - var(--erplite-customers-slider-card-width)) / 2 - var(--erplite-customers-slider-card-width) - var(--erplite-customers-slider-gap-md) - var(--erplite-customers-slider-card-width) - var(--erplite-customers-slider-gap-md)), 0, 0);
                }
                .fmcg-case-study .erplite-customers-slider__track[data-active-slide="3"] {
                    transform: translate3d(calc((100vw - var(--erplite-customers-slider-card-width)) / 2 - var(--erplite-customers-slider-card-width) - var(--erplite-customers-slider-gap-md) - var(--erplite-customers-slider-card-width) - var(--erplite-customers-slider-gap-md) - var(--erplite-customers-slider-card-width) - var(--erplite-customers-slider-gap-md)), 0, 0);
                }
                .fmcg-case-study .erplite-customers-slider__track::-webkit-scrollbar {
                    display: none;
                }
                .fmcg-case-study .erplite-customers-slider__slide {
                    flex: 0 0 var(--erplite-customers-slider-card-width);
                    width: var(--erplite-customers-slider-card-width);
                    color: inherit;
                    text-decoration: none;
                    display: block;
                }
                .fmcg-case-study .erplite-customers-slider__card {
                    height: 100%;
                    border: 1px solid #d8d8d8;
                    border-radius: 0.5rem;
                    background: #ffffff;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    position: relative;
                    overflow: clip;
                }
                .fmcg-case-study .erplite-customers-slider__card-body {
                    display: flex;
                    flex: 1;
                    flex-wrap: wrap;
                    align-items: center;
                    height: 100%;
                    min-height: 0;
                    row-gap: var(--erplite-customers-slider-gap-main);
                    margin-left: calc(var(--erplite-customers-slider-gap-main) / -2);
                    margin-right: calc(var(--erplite-customers-slider-gap-main) / -2);
                    padding: var(--erplite-customers-slider-gap-xl);
                }
                .fmcg-case-study .erplite-customers-slider__meta-col {
                    flex: 0 0 33.3333%;
                    max-width: 33.3333%;
                    align-self: stretch;
                    display: flex;
                    align-items: center;
                    padding-left: calc(var(--erplite-customers-slider-gap-main) / 2);
                    padding-right: calc(var(--erplite-customers-slider-gap-main) / 2);
                }
                .fmcg-case-study .erplite-customers-slider__avatar-row {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    row-gap: var(--erplite-customers-slider-gap-sm);
                    margin-left: calc(var(--erplite-customers-slider-gap-sm) / -2);
                    margin-right: calc(var(--erplite-customers-slider-gap-sm) / -2);
                }
                .fmcg-case-study .erplite-customers-slider__avatar-shell {
                    position: relative;
                    flex: none;
                    width: 3rem;
                    aspect-ratio: 1;
                    overflow: hidden;
                    border-radius: 999px;
                    background: #f0f0f0;
                    border: 1px solid #d8d8d8;
                    margin-left: calc(var(--erplite-customers-slider-gap-sm) / 2);
                    margin-right: calc(var(--erplite-customers-slider-gap-sm) / 2);
                }
                .fmcg-case-study .erplite-customers-slider__avatar-image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 50% 50%;
                    display: block;
                }
                .fmcg-case-study .erplite-customers-slider__person {
                    flex: 1;
                    min-width: 0;
                    margin-left: calc(var(--erplite-customers-slider-gap-sm) / 2);
                    margin-right: calc(var(--erplite-customers-slider-gap-sm) / 2);
                }
                .fmcg-case-study .erplite-customers-slider__name {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(1.125rem, calc(1.0892857143rem + 0.1785714286vw), 1.25rem);
                    line-height: 1.4;
                    font-variation-settings: "wght" 500, "opsz" 50;
                    font-weight: 500;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-customers-slider__title-wrap {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: 0.875rem;
                    line-height: 1.6;
                    font-variation-settings: "wght" 400, "opsz" 16;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-customers-slider__quote-col {
                    flex: 1 1 0;
                    max-width: 100%;
                    align-self: stretch;
                    display: flex;
                    align-items: center;
                    padding-left: calc(var(--erplite-customers-slider-gap-main) / 2);
                    padding-right: calc(var(--erplite-customers-slider-gap-main) / 2);
                }
                .fmcg-case-study .erplite-customers-slider__quote {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    line-height: 1.3;
                    font-variation-settings: "wght" 500, "opsz" 50;
                    font-weight: 500;
                    letter-spacing: 0;
                    text-indent: -0.3em;
                    border-left: 0;
                    padding: 0;
                }
                .fmcg-case-study .erplite-customers-slider__quote p {
                    margin: 0;
                    font-family: inherit;
                    font-size: inherit;
                    line-height: inherit;
                    font-weight: 500;
                    font-variation-settings: "wght" 500, "opsz" 24;
                    letter-spacing: inherit;
                }
                @media (max-width: 991px) {
                    .fmcg-case-study .erplite-customers__intro-col,
                    .fmcg-case-study .erplite-customers__badges-col {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                    .fmcg-case-study .erplite-customers-slider__meta-col,
                    .fmcg-case-study .erplite-customers-slider__quote-col {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                    .fmcg-case-study .erplite-customers-slider__card-body {
                        min-height: 0;
                    }
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .erplite-customers-slider-section {
                        --erplite-customers-slider-card-width: calc(100vw - 3rem);
                    }
                    .fmcg-case-study .erplite-customers-slider__offset {
                        width: 100vw;
                    }
                    .fmcg-case-study .erplite-customers-slider__card-body {
                        min-height: 0;
                    }
                }
                .fmcg-case-study .erplite-compare-section {
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .erplite-compare__intro-row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: flex-start;
                }
                .fmcg-case-study .erplite-compare__intro-col {
                    flex: 0 1 66.6667%;
                    max-width: 66.6667%;
                }
                .fmcg-case-study .erplite-compare__heading {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(2rem, calc(1.5714285714rem + 2.1428571429vw), 3.5rem);
                    line-height: 1.04;
                    font-weight: 700;
                    letter-spacing: 0;
                    text-wrap: balance;
                    max-width: none;
                }
                .fmcg-case-study .erplite-compare__heading-break {
                    display: inline;
                }
                .fmcg-case-study .erplite-compare__spacer {
                    height: clamp(0.75rem, calc(0.6785714286rem + 0.3571428571vw), 1rem);
                }
                .fmcg-case-study .erplite-compare__table-shell {
                    width: 100%;
                    border: 1px solid #d8d8d8;
                    border-radius: 0.75rem;
                    overflow: hidden;
                    scrollbar-width: thin;
                    background: #ffffff;
                }
                .fmcg-case-study .erplite-compare__table-slot {
                    width: 100%;
                    min-width: 0;
                    background: #ffffff;
                    border-radius: inherit;
                    overflow: hidden;
                }
                .fmcg-case-study .erplite-compare__row {
                    width: 100%;
                }
                .fmcg-case-study .erplite-compare__row-slot {
                    display: flex;
                    flex-flow: row nowrap;
                }
                .fmcg-case-study .erplite-compare__cell {
                    box-sizing: border-box;
                    position: relative;
                    flex: 1 1 0;
                    min-width: 0;
                    display: flex;
                    flex-flow: wrap;
                    justify-content: flex-start;
                    align-items: flex-start;
                    padding: 0.5rem 0.75rem;
                    border-bottom: 1px solid #d8d8d8;
                    border-left: 1px solid #d8d8d8;
                    background: #ffffff;
                    color: #080808;
                    text-align: left;
                    font-family: var(--sans);
                }
                .fmcg-case-study .erplite-compare__row--header .erplite-compare__cell {
                    border-top: 0;
                }
                .fmcg-case-study .erplite-compare__row-slot > .erplite-compare__cell:first-child {
                    border-left: 0;
                }
                .fmcg-case-study .erplite-compare__table-slot > .erplite-compare__row:last-child .erplite-compare__cell {
                    border-bottom: 0;
                }
                .fmcg-case-study .erplite-compare__cell.is-highlighted,
                .fmcg-case-study .erplite-compare__cell-slot.is-highlighted {
                    background: #f0f0f0;
                }
                .fmcg-case-study .erplite-compare__cell-slot {
                    position: relative;
                    display: flex;
                    width: 100%;
                    min-width: 0;
                }
                .fmcg-case-study .erplite-compare__cell-slot--feature {
                    padding-right: 2.75rem;
                }
                .fmcg-case-study .erplite-compare__cell-slot--header-value {
                    justify-content: center;
                }
                .fmcg-case-study .erplite-compare__cell-slot--value {
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    text-align: center;
                }
                .fmcg-case-study .erplite-compare__rich-text,
                .fmcg-case-study .erplite-compare__tooltip-copy {
                    font-family: var(--sans);
                    color: #080808;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-compare__rich-text p,
                .fmcg-case-study .erplite-compare__tooltip-copy p {
                    margin: 0;
                }
                .fmcg-case-study .erplite-compare__rich-text p {
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                }
                .fmcg-case-study .erplite-compare__rich-text strong {
                    font-weight: 700;
                }
                .fmcg-case-study .erplite-compare__rich-text--header p {
                    font-weight: 700;
                }
                .fmcg-case-study .erplite-compare__cell--header-value .erplite-compare__rich-text {
                    text-align: center;
                }
                .fmcg-case-study .erplite-compare__tooltip-expand {
                    display: contents;
                }
                .fmcg-case-study .erplite-compare__toggle {
                    position: absolute;
                    top: 0;
                    right: 0;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-start;
                    width: 2.75rem;
                    height: 2.75rem;
                    padding: 1rem 1rem 0 0;
                    border: 0;
                    background: transparent;
                    color: #5a5a5a;
                    opacity: 0.7;
                    transition:
                        opacity 0.3s cubic-bezier(.165, .84, .44, 1),
                        color 0.3s cubic-bezier(.165, .84, .44, 1);
                    cursor: pointer;
                }
                .fmcg-case-study .erplite-compare__row.is-open .erplite-compare__toggle {
                    color: #080808;
                    opacity: 1;
                }
                .fmcg-case-study .erplite-compare__toggle-icon {
                    width: 0.875rem;
                    height: 0.9375rem;
                    display: block;
                }
                .fmcg-case-study .erplite-compare__icon {
                    flex: none;
                    width: 24px;
                    height: 24px;
                    display: block;
                }
                .fmcg-case-study .erplite-compare__cell--value:not(.is-highlighted) .erplite-compare__icon--no,
                .fmcg-case-study .erplite-compare__cell--value:not(.is-highlighted) .erplite-compare__icon--minus {
                    opacity: 0.72;
                }
                .fmcg-case-study .erplite-compare__tooltip-pane {
                    display: grid;
                    grid-template-rows: 0fr;
                    width: 100%;
                    background: transparent;
                    overflow: hidden;
                    transition: grid-template-rows 0.4s cubic-bezier(.19, 1, .22, 1);
                }
                .fmcg-case-study .erplite-compare__tooltip-pane.is-active {
                    grid-template-rows: 1fr;
                }
                .fmcg-case-study .erplite-compare__tooltip-pane-inner {
                    display: flex;
                    justify-content: center;
                    min-height: 0;
                    overflow: hidden;
                    padding-top: 1rem;
                }
                .fmcg-case-study .erplite-compare__tooltip-copy {
                    width: 100%;
                    max-width: 18rem;
                    font-size: 0.75rem;
                    line-height: 1.6;
                    font-weight: 400;
                    text-align: center;
                }
                .fmcg-case-study .erplite-compare__tooltip-copy a {
                    color: inherit;
                    text-decoration: none;
                    background-image: linear-gradient(currentColor, currentColor);
                    background-position: 0 1.1em;
                    background-repeat: no-repeat;
                    background-size: 100% 0.08em;
                }
                @media (max-width: 991px) {
                    .fmcg-case-study .erplite-compare__intro-col {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                    .fmcg-case-study .erplite-compare__heading-break {
                        display: none;
                    }
                }
                @media (hover: hover) and (pointer: fine) {
                    .fmcg-case-study .erplite-compare__toggle:hover {
                        color: #080808;
                        opacity: 1;
                    }
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .erplite-compare__table-shell {
                        overflow-x: auto;
                        overflow-y: hidden;
                    }
                    .fmcg-case-study .erplite-compare__table-slot {
                        min-width: 40rem;
                    }
                }
                @media (max-width: 479px) {
                    .fmcg-case-study .erplite-compare__table-shell {
                        width: 100vw;
                        max-width: 100vw;
                        margin-left: calc(50% - 50vw);
                        padding-left: 1.5rem;
                        padding-right: 1.5rem;
                        overflow-x: auto;
                    }
                    .fmcg-case-study .erplite-compare__table-slot {
                        min-width: 38rem;
                    }
                }
                .fmcg-case-study .erplite-business-impact-section {
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .erplite-business-impact__card {
                    position: relative;
                    overflow: hidden;
                    border-radius: 0.5rem;
                    background: #000000;
                    color: #ffffff;
                }
                .fmcg-case-study .erplite-business-impact__glass {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    min-width: 800px;
                    overflow: hidden;
                }
                .fmcg-case-study .erplite-business-impact__glass-fallback {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(circle at 22% 26%, rgba(20, 110, 245, 0.32) 0%, rgba(20, 110, 245, 0) 34%),
                        linear-gradient(120deg, #050505 0%, #071225 32%, #0a1f46 70%, #040404 100%);
                    transition: opacity 0.25s ease;
                }
                .fmcg-case-study .erplite-business-impact__glass.is-ready .erplite-business-impact__glass-fallback {
                    opacity: 0;
                }
                .fmcg-case-study .erplite-business-impact__glass-canvas {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    min-height: 100%;
                }
                .fmcg-case-study .erplite-business-impact__body {
                    position: relative;
                    z-index: 1;
                    display: grid;
                    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
                    align-items: center;
                    gap: clamp(1.75rem, calc(1.3928571429rem + 1.7857142857vw), 3rem);
                    padding: clamp(2rem, calc(1.4285714286rem + 2.8571428571vw), 4rem);
                }
                .fmcg-case-study .erplite-business-impact__copy-col {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 100%;
                    max-width: none;
                }
                .fmcg-case-study .erplite-business-impact__title {
                    margin: 0 0 0.75rem;
                    max-width: none;
                    color: #ffffff;
                    font-family: var(--sans);
                    font-size: clamp(2rem, calc(1.5714285714rem + 2.1428571429vw), 3.5rem);
                    line-height: 1.05;
                    font-weight: 600;
                    letter-spacing: -0.02em;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-business-impact__title-line,
                .fmcg-case-study .erplite-business-impact__copy-line {
                    display: block;
                    white-space: nowrap;
                }
                .fmcg-case-study .erplite-business-impact__body-copy {
                    margin: 0 0 1.5rem;
                    max-width: 34ch;
                    color: rgba(255, 255, 255, 0.9);
                    font-family: var(--sans);
                    font-size: clamp(1rem, calc(0.9642857143rem + 0.1785714286vw), 1.125rem);
                    line-height: 1.5;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-business-impact__button {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.4em;
                    padding: 1em 1.5em;
                    border-radius: 0.25rem;
                    background: #146ef5;
                    box-shadow: none;
                    border: none;
                    color: #ffffff;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.2em;
                    font-variation-settings: "wght" 500, "opsz" 20;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    flex: none;
                    text-decoration: none;
                    position: relative;
                }
                .fmcg-case-study .erplite-business-impact__button-text {
                    pointer-events: none;
                    display: inline-flex;
                    align-items: center;
                    position: relative;
                }
                .fmcg-case-study .erplite-business-impact__button-icon {
                    flex: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    max-width: 1.2em;
                    line-height: 1;
                }
                .fmcg-case-study .erplite-business-impact__button .button-icon-wrap {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    flex-flow: row;
                    transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
                }
                .fmcg-case-study .erplite-business-impact__button:hover [data-wf--button-icon--variant="arrow-right"] {
                    transform: translateX(6px);
                }
                .fmcg-case-study .erplite-business-impact__button .accordion-line-wrap {
                    pointer-events: none;
                    justify-content: center;
                    align-items: center;
                    display: none;
                    position: absolute;
                    inset: 0;
                }
                .fmcg-case-study .erplite-business-impact__button .accordion-icon_line {
                    background-color: #ffffff;
                    flex: none;
                    width: 1rem;
                    max-width: 50%;
                    height: 1.5px;
                }
                .fmcg-case-study .erplite-business-impact__button .cc-vertical {
                    position: absolute;
                    transform: rotate(90deg);
                }
                .fmcg-case-study .erplite-business-impact__button .button-icon {
                    pointer-events: none;
                    -webkit-user-select: none;
                    user-select: none;
                    line-height: 1;
                    position: relative;
                    display: none;
                    width: 1em;
                    height: 1em;
                    color: inherit;
                }
                .fmcg-case-study .erplite-business-impact__button .button-icon::before,
                .fmcg-case-study .erplite-business-impact__button .button-icon::after {
                    content: "";
                    position: absolute;
                    display: block;
                    background: currentColor;
                    border-radius: 999px;
                }
                .fmcg-case-study .erplite-business-impact__button .cc-arrow-right {
                    display: block;
                }
                .fmcg-case-study .erplite-business-impact__button .cc-arrow-right::before {
                    top: 50%;
                    left: 0.125rem;
                    right: 0.125rem;
                    height: 1.5px;
                    transform: translateY(-50%);
                    transform-origin: center;
                }
                .fmcg-case-study .erplite-business-impact__button .cc-arrow-right::after {
                    width: 0.45rem;
                    height: 0.45rem;
                    top: 50%;
                    right: 0.18rem;
                    border-top: 1.5px solid currentColor;
                    border-right: 1.5px solid currentColor;
                    background: transparent;
                    border-radius: 0;
                    transform: translateY(-50%) rotate(45deg);
                    transform-origin: center;
                }
                .fmcg-case-study .erplite-business-impact__link-cover {
                    z-index: 3;
                    cursor: pointer;
                    border-radius: inherit;
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    position: absolute;
                    inset: 0;
                }
                .fmcg-case-study .erplite-business-impact__media-col {
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-end;
                    min-width: 0;
                }
                .fmcg-case-study .erplite-business-impact__image-offset {
                    width: 100%;
                    transform: translateX(clamp(0rem, calc(0.5357142857rem + 1.0714285714vw), 0.75rem));
                }
                .fmcg-case-study .erplite-business-impact__image-frame {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 2486 / 1534;
                }
                .fmcg-case-study .erplite-business-impact__image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 50% 50%;
                    display: block;
                }
                @media (max-width: 900px) {
                    .fmcg-case-study .erplite-business-impact__body {
                        grid-template-columns: 1fr;
                    }

                    .fmcg-case-study .erplite-business-impact__title {
                        max-width: none;
                    }

                    .fmcg-case-study .erplite-business-impact__image-offset {
                        transform: none;
                    }
                    .fmcg-case-study .erplite-business-impact__title-line,
                    .fmcg-case-study .erplite-business-impact__copy-line {
                        display: inline;
                        white-space: normal;
                    }
                }
                .fmcg-case-study .erplite-g2-section {
                    --erplite-g2-gap-main: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    --erplite-g2-gap-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    --erplite-g2-gap-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    --erplite-g2-stage-offset: 4.25rem;
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .erplite-g2-tabs {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    gap: var(--erplite-g2-gap-main);
                }
                .fmcg-case-study .erplite-g2-tabs__menu {
                    display: flex;
                    grid-column-gap: var(--erplite-g2-gap-md);
                    grid-row-gap: var(--erplite-g2-gap-md);
                    flex: 1;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: stretch;
                    max-width: 28rem;
                }
                .fmcg-case-study .erplite-g2-tabs__content {
                    display: flex;
                    flex-direction: column;
                }
                .fmcg-case-study .erplite-g2-tabs__title {
                    margin: 0 0 var(--erplite-g2-gap-sm);
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(2rem, calc(1.5714285714rem + 2.1428571429vw), 3.5rem);
                    line-height: 1.04;
                    font-weight: 600;
                    font-variation-settings: "wght" 600, "opsz" 100;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-g2-tabs__intro {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    font-variation-settings: "wght" 400, "opsz" 24;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-g2-tabs__list {
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    gap: var(--erplite-g2-gap-md);
                }
                .fmcg-case-study .erplite-g2-tabs__item {
                    flex: 0 0 auto;
                }
                .fmcg-case-study .erplite-g2-tabs__link-wrapper {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    transition: opacity 0.2s ease;
                }
                .fmcg-case-study .erplite-g2-tabs__progress-track {
                    margin-bottom: var(--erplite-g2-gap-md);
                    background: #f0f0f0;
                    width: 100%;
                    height: 2px;
                    overflow: hidden;
                }
                .fmcg-case-study .erplite-g2-tabs__progress-bar {
                    background: #080808;
                    width: 0%;
                    height: 100%;
                }
                .fmcg-case-study .erplite-g2-tabs__button {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    border: 0;
                    background: transparent;
                    cursor: pointer;
                }
                .fmcg-case-study .erplite-g2-tabs__button:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .erplite-g2-tabs__menu-text {
                    position: relative;
                    z-index: 1;
                }
                .fmcg-case-study .erplite-g2-tabs__tab-title {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(1.125rem, calc(1.0892857143rem + 0.1785714286vw), 1.25rem);
                    line-height: 1.4;
                    font-weight: 600;
                    font-variation-settings: "wght" 600, "opsz" 50;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-g2-tabs__spacer {
                    aspect-ratio: 8 / 9;
                    width: calc(((100% - var(--erplite-g2-gap-main)) / 2) - var(--erplite-g2-stage-offset));
                    flex: none;
                }
                .fmcg-case-study .erplite-g2-tabs__stage {
                    pointer-events: none;
                    position: absolute;
                    inset: auto 0 0 auto;
                    display: flex;
                    width: calc(((100% - var(--erplite-g2-gap-main)) / 2) - var(--erplite-g2-stage-offset));
                    max-height: 100%;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: stretch;
                    opacity: 0;
                    transition: opacity 0.25s ease;
                }
                .fmcg-case-study .erplite-g2-tabs__frame {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 8 / 9;
                    overflow: hidden;
                    background: #ffffff;
                }
                .fmcg-case-study .erplite-g2-tabs__image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                    background: #ffffff;
                    object-fit: cover;
                    object-position: center top;
                }
                @media (hover: hover) and (pointer: fine) and (min-width: 768px) {
                    .fmcg-case-study .erplite-g2-tabs__item .erplite-g2-tabs__link-wrapper:hover {
                        opacity: 0.8;
                    }
                }
                @media (min-width: 768px) {
                    .fmcg-case-study .erplite-g2-tabs__item .erplite-g2-tabs__link-wrapper {
                        opacity: 0.5;
                    }
                    .fmcg-case-study .erplite-g2-tabs__item.cc-active .erplite-g2-tabs__link-wrapper {
                        opacity: 1;
                    }
                    .fmcg-case-study .erplite-g2-tabs__item.cc-active .erplite-g2-tabs__stage {
                        pointer-events: auto;
                        opacity: 1;
                    }
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .erplite-g2-tabs {
                        display: block;
                    }
                    .fmcg-case-study .erplite-g2-tabs__spacer {
                        display: none;
                    }
                    .fmcg-case-study .erplite-g2-tabs__menu {
                        max-width: none;
                    }
                    .fmcg-case-study .erplite-g2-tabs__button {
                        display: none;
                    }
                    .fmcg-case-study .erplite-g2-tabs__stage {
                        position: relative;
                        inset: auto;
                        width: auto;
                        margin-top: var(--erplite-g2-gap-md);
                        display: block;
                        opacity: 1;
                        pointer-events: auto;
                    }
                }
                .fmcg-case-study .erplite-faq-section {
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .erplite-faq__spacer {
                    width: 100%;
                    height: clamp(2.25rem, calc(2.0357142857rem + 1.0714285714vw), 3rem);
                    padding: 0;
                }
                .fmcg-case-study .erplite-faq__row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: clamp(1.5rem, calc(1rem + 2.5vw), 3rem);
                }
                .fmcg-case-study .erplite-faq__heading-col {
                    flex: 0 1 33.3333%;
                    max-width: 33.3333%;
                }
                .fmcg-case-study .erplite-faq__heading-sticky {
                    position: sticky;
                    top: calc(4.25rem + 2rem);
                }
                .fmcg-case-study .erplite-faq__heading {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(2rem, calc(1.5714285714rem + 2.1428571429vw), 3.5rem);
                    line-height: 1.04;
                    font-weight: 600;
                    font-variation-settings: "wght" 600, "opsz" 100;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-faq__list-col {
                    flex: 0 1 58.3333%;
                    max-width: 58.3333%;
                }
                .fmcg-case-study .erplite-faq__list {
                    display: flex;
                    flex-direction: column;
                }
                .fmcg-case-study .erplite-faq__item {
                    border-bottom: 1px solid #d8d8d8;
                    text-align: left;
                    flex-direction: column;
                    width: 100%;
                    display: flex;
                }
                .fmcg-case-study .erplite-faq__trigger {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    padding: 1.5rem 0;
                    border-radius: 0.5rem;
                    border: 0;
                    background: transparent;
                    text-align: left;
                    cursor: pointer;
                    text-decoration: none;
                    overflow: hidden;
                    list-style: none;
                    color: #080808;
                }
                .fmcg-case-study .erplite-faq__trigger:focus-visible {
                    position: relative;
                    z-index: 2;
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .erplite-faq__trigger::-webkit-details-marker {
                    display: none;
                }
                .fmcg-case-study .erplite-faq__trigger::marker {
                    content: '';
                }
                .fmcg-case-study .erplite-faq__title-icon-wrap {
                    grid-column-gap: 1em;
                    grid-row-gap: 1em;
                    pointer-events: none;
                    justify-content: flex-start;
                    align-items: center;
                    display: flex;
                }
                .fmcg-case-study .erplite-faq__question {
                    color: currentColor;
                    pointer-events: none;
                    font-family: var(--webflow-sans);
                    font-size: clamp(1.125rem, calc(1.0892857143rem + 0.1785714286vw), 1.25rem);
                    line-height: 1.4;
                    font-weight: 500;
                    font-variation-settings: "wght" 500, "opsz" 50;
                    letter-spacing: 0;
                    text-wrap: pretty;
                }
                .fmcg-case-study .erplite-faq__icon-wrap {
                    position: relative;
                    aspect-ratio: 1;
                    pointer-events: none;
                    flex-flow: column;
                    flex: none;
                    justify-content: center;
                    align-items: center;
                    width: 2rem;
                    display: flex;
                }
                .fmcg-case-study .erplite-faq__icon-line {
                    background: #146ef5;
                    flex: none;
                    width: 1rem;
                    max-width: 50%;
                    height: 1.5px;
                }
                @media (hover: hover) and (pointer: fine) {
                    .fmcg-case-study .erplite-faq__trigger:hover {
                        color: #146ef5;
                    }
                }
                .fmcg-case-study .erplite-faq__icon-line--horizontal {
                }
                .fmcg-case-study .erplite-faq__icon-line--vertical {
                    position: absolute;
                    transform: rotate(90deg);
                }
                .fmcg-case-study .erplite-faq__item[open] .erplite-faq__icon-line--vertical {
                    opacity: 0;
                }
                .fmcg-case-study .erplite-faq__content {
                    width: 100%;
                    height: auto;
                    overflow: clip;
                }
                .fmcg-case-study .erplite-faq__content-spacer {
                    padding-bottom: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                }
                .fmcg-case-study .erplite-faq__answer {
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    font-variation-settings: "wght" 400, "opsz" 24;
                    letter-spacing: 0;
                    text-wrap: pretty;
                }
                .fmcg-case-study .erplite-faq__answer p {
                    margin: 0 0 1em;
                }
                .fmcg-case-study .erplite-faq__answer p:last-child {
                    margin-bottom: 0;
                }
                .fmcg-case-study .erplite-faq__answer strong {
                    font-variation-settings: "wght" 600, "opsz" 24;
                    font-weight: 600;
                }
                .fmcg-case-study .erplite-faq__answer a {
                    color: inherit;
                }
                @media (min-width: 768px) {
                    .fmcg-case-study .erplite-faq__item[open] {
                        border-bottom-color: transparent;
                    }
                }
                @media (max-width: 900px) {
                    .fmcg-case-study .erplite-faq__heading-col,
                    .fmcg-case-study .erplite-faq__list-col {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                    .fmcg-case-study .erplite-faq__heading-sticky {
                        position: static;
                    }
                }
                .fmcg-case-study .erplite-demo-section {
                    position: relative;
                    overflow: hidden;
                    padding-top: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem);
                    padding-bottom: 0;
                    border-top: 1px solid #d8d8d8;
                    background: #ffffff;
                }
                .fmcg-case-study .erplite-demo-container {
                    position: static;
                    z-index: 1;
                }
                .fmcg-case-study .erplite-demo-shell__glass {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    overflow: hidden;
                    background-color: #ffffff;
                }
                .fmcg-case-study .erplite-demo-shell__glass-fallback {
                    position: absolute;
                    inset: 0;
                    background: #ffffff;
                    transition: opacity 0.25s ease;
                }
                .fmcg-case-study .erplite-demo-shell__glass.is-ready .erplite-demo-shell__glass-fallback {
                    opacity: 0;
                }
                .fmcg-case-study .erplite-demo-shell__glass-canvas {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    width: 100%;
                    height: 100%;
                    min-height: 30vh;
                }
                .fmcg-case-study .erplite-demo-row {
                    position: relative;
                    z-index: 1;
                    display: grid;
                    width: 100%;
                    grid-template-columns: minmax(0, 41.6667%) minmax(0, 50%);
                    align-items: end;
                    column-gap: 8.3333%;
                    row-gap: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                }
                .fmcg-case-study .erplite-demo-shell__copy-col {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding-top: 0;
                    padding-bottom: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem);
                }
                .fmcg-case-study .erplite-demo-shell__title {
                    margin: 0 0 clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(2rem, calc(1.5714285714rem + 2.1428571429vw), 3.5rem);
                    line-height: 1.04;
                    font-variation-settings: "wght" 600, "opsz" 100;
                    font-weight: 600;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .erplite-demo-shell__subheading {
                    margin: 0 0 clamp(0.375rem, calc(0.3392857143rem + 0.1785714286vw), 0.5rem);
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(1.125rem, calc(1.0892857143rem + 0.1785714286vw), 1.25rem);
                    line-height: 1.4;
                    font-variation-settings: "wght" 500, "opsz" 50;
                    font-weight: 500;
                    letter-spacing: 0;
                }
                .fmcg-case-study .erplite-demo-shell__body-copy {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                    text-wrap: pretty;
                }
                .fmcg-case-study .erplite-demo-shell__spacer {
                    width: 100%;
                    height: clamp(2.25rem, calc(2.0357142857rem + 1.0714285714vw), 3rem);
                }
                .fmcg-case-study .erplite-demo-shell__support-list {
                    width: 100%;
                    margin: 0;
                    padding-left: 2.2em;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                    list-style: disc;
                }
                .fmcg-case-study .erplite-demo-shell__support-item {
                    margin-bottom: 0.3em;
                }
                .fmcg-case-study .erplite-demo-shell__support-item a {
                    color: inherit;
                    text-decoration: underline;
                    text-underline-offset: 0.08em;
                }
                .fmcg-case-study .erplite-demo-shell__button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4em;
                    padding: 1em 1.5em;
                    border-radius: 0.25rem;
                    background: #146ef5;
                    box-shadow: none;
                    border: none;
                    color: #ffffff;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.2em;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    flex: none;
                    text-decoration: none;
                    position: relative;
                }
                .fmcg-case-study .erplite-demo-shell__button-text {
                    pointer-events: none;
                    display: inline-flex;
                    align-items: center;
                    position: relative;
                }
                .fmcg-case-study .erplite-demo-shell__button-icon {
                    flex: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    max-width: 1.2em;
                    line-height: 1;
                }
                .fmcg-case-study .erplite-demo-shell__button .button-icon-wrap {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    flex-flow: row;
                    transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
                }
                .fmcg-case-study .erplite-demo-shell__button:hover [data-wf--button-icon--variant="arrow-right"] {
                    transform: translateX(6px);
                }
                .fmcg-case-study .erplite-demo-shell__button .accordion-line-wrap {
                    pointer-events: none;
                    justify-content: center;
                    align-items: center;
                    display: none;
                    position: absolute;
                    inset: 0;
                }
                .fmcg-case-study .erplite-demo-shell__button .accordion-icon_line {
                    background-color: #ffffff;
                    flex: none;
                    width: 1rem;
                    max-width: 50%;
                    height: 1.5px;
                }
                .fmcg-case-study .erplite-demo-shell__button .cc-vertical {
                    position: absolute;
                    transform: rotate(90deg);
                }
                .fmcg-case-study .erplite-demo-shell__button .button-icon {
                    pointer-events: none;
                    -webkit-user-select: none;
                    user-select: none;
                    line-height: 1;
                    position: relative;
                    display: none;
                    width: 1em;
                    height: 1em;
                    color: inherit;
                }
                .fmcg-case-study .erplite-demo-shell__button .button-icon::before,
                .fmcg-case-study .erplite-demo-shell__button .button-icon::after {
                    content: "";
                    position: absolute;
                    display: block;
                    background: currentColor;
                    border-radius: 999px;
                }
                .fmcg-case-study .erplite-demo-shell__button .cc-arrow-right {
                    display: block;
                }
                .fmcg-case-study .erplite-demo-shell__button .cc-arrow-right::before {
                    top: 50%;
                    left: 0.125rem;
                    right: 0.125rem;
                    height: 1.5px;
                    transform: translateY(-50%);
                    transform-origin: center;
                }
                .fmcg-case-study .erplite-demo-shell__button .cc-arrow-right::after {
                    width: 0.45rem;
                    height: 0.45rem;
                    top: 50%;
                    right: 0.18rem;
                    border-top: 1.5px solid currentColor;
                    border-right: 1.5px solid currentColor;
                    background: transparent;
                    border-radius: 0;
                    transform: translateY(-50%) rotate(45deg);
                    transform-origin: center;
                }
                .fmcg-case-study .erplite-demo-shell__link-cover {
                    z-index: 3;
                    cursor: pointer;
                    border-radius: inherit;
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    position: absolute;
                    inset: 0;
                }
                .fmcg-case-study .erplite-demo-shell__media-col {
                    position: relative;
                    min-width: 0;
                }
                .fmcg-case-study .erplite-demo-shell__media-wrap {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1 / 1;
                }
                .fmcg-case-study .erplite-demo-shell__base-image-wrap {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: auto;
                    width: 72vw;
                    height: auto;
                    aspect-ratio: 3 / 2;
                    border-radius: 0.25rem;
                    overflow: hidden;
                }
                .fmcg-case-study .erplite-demo-shell__base-image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 0% 0%;
                    display: block;
                }
                .fmcg-case-study .erplite-demo-shell__floating-image-wrap {
                    position: absolute;
                    left: max(-2vw, -3.5rem);
                    top: 50%;
                    z-index: 2;
                    width: max(30%, 6rem);
                    aspect-ratio: 489 / 594;
                    border-radius: 0.25rem;
                    overflow: hidden;
                    box-shadow:
                        -63px 93px 45px #08080808,
                        -35px 53px 38px #0808081a,
                        -16px 23px 28px #0808082b,
                        -4px 6px 15px #08080830;
                    transform: translateY(-50%);
                }
                .fmcg-case-study .erplite-demo-shell__floating-image {
                    position: static;
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    object-position: 50% 50%;
                    display: block;
                }
                @media (max-width: 991px) {
                    .fmcg-case-study .erplite-demo-row {
                        grid-template-columns: 1fr;
                        column-gap: 0;
                    }
                    .fmcg-case-study .erplite-demo-shell__base-image-wrap {
                        width: 160%;
                    }
                }
                @media (max-width: 479px) {
                    .fmcg-case-study .erplite-demo-shell__base-image-wrap {
                        width: 160%;
                    }
                }
                @media(max-width:991px){
                    .fmcg-case-study .erplite-hero__copy-col {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                }

                @media(max-width:900px){
                    .fmcg-case-study h1 { font-size: clamp(38px, 10vw, 60px); }
                    .fmcg-case-study #hero.erplite-hero-section { padding: var(--erplite-hero-top-space) 0 var(--erplite-section-space-sm); }
                    .fmcg-case-study .erplite-hero__heading { max-width: none; font-size: var(--erplite-title-size); }
                    .fmcg-case-study .erplite-hero__body { font-size: var(--erplite-body-size); }
                }

                @media(max-width:600px){
                    .fmcg-case-study #hero.erplite-hero-section { padding: var(--erplite-hero-top-space) 0 var(--erplite-section-space-sm); }
                    .fmcg-case-study .erplite-hero__heading { max-width: none; font-size: var(--erplite-title-size); }
                    .fmcg-case-study .erplite-hero__body { font-size: var(--erplite-body-size); }
                }
                @media(max-width:767px){
                    .fmcg-case-study .erplite-overview-col { flex-basis: 100%; max-width: 100%; }
                    .fmcg-case-study .erplite-overview-row { row-gap: 1.25rem; }
                }
            `}</style>
            <ErpLiteHero />

            <div id="main" className="erplite-page-main">
                <section className="erplite-overview-section">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="erplite-overview-row">
                            <div className="erplite-overview-col">
                                <h2 className="erplite-overview-heading">Build systems with control, clarity, and precision</h2>
                            </div>
                            <div className="erplite-overview-col">
                                <div className="erplite-overview-copy">
                                    <p>
                                        A 120-employee SME was running HR through spreadsheets, chat threads, and personal folders. Payroll was slow, approvals were untraceable, and compliance readiness depended on memory.
                                    </p>
                                    <p>
                                        ERP-Lite introduces a centralized system where employee records, workflows, and documentation operate in one controlled environment. Teams can manage, track, and validate actions with clarityÃ¢â‚¬â€ensuring faster operations, stronger compliance, and full visibility.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ErpLiteCustomersSection />

                <ErpLiteCmsTabs />

                <ErpLiteG2Section />

                <ErpLiteComparisonTable />

                <ErpLiteWhySection />

                <ErpLiteMigrationCta />

                <ErpLiteFaqSection />

                <ErpLiteBusinessImpactSection />

                <ErpLiteScheduleDemoSection />
            </div>
        </div>
    );
};

export default ErpLiteCaseStudy;


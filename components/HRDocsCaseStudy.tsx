import React, { useState, useEffect, useRef } from 'react';

type FlutedGlassWindow = Window & typeof globalThis & {
    initializeOptimizedShaders?: () => void;
    __webflowVsWordpressGlassRuntime?: Promise<void>;
    __webflowVsWordpressGlassInitScheduled?: Promise<void> | null;
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

function ensureWebflowVsWordpressGlassRuntime() {
    const runtimeWindow = window as FlutedGlassWindow;

    if (!runtimeWindow.__webflowVsWordpressGlassRuntime) {
        runtimeWindow.__webflowVsWordpressGlassRuntime = loadScriptOnce(
            'webflow-vs-wordpress-three',
            '/webflow-vs-wordpress-hero/three.r128.min.js'
        )
            .then(() => loadScriptOnce(
                'webflow-vs-wordpress-fluted-glass',
                '/webflow-vs-wordpress-hero/fluted-glass-op.min.js'
            ));
    }

    return runtimeWindow.__webflowVsWordpressGlassRuntime.then(() => {
        if (!runtimeWindow.__webflowVsWordpressGlassInitScheduled) {
            runtimeWindow.__webflowVsWordpressGlassInitScheduled = new Promise<void>((resolve) => {
                window.requestAnimationFrame(() => {
                    try {
                        if (typeof runtimeWindow.initializeOptimizedShaders === 'function') {
                            runtimeWindow.initializeOptimizedShaders();
                        }
                    } finally {
                        runtimeWindow.__webflowVsWordpressGlassInitScheduled = null;
                        resolve();
                    }
                });
            });
        }

        return runtimeWindow.__webflowVsWordpressGlassInitScheduled;
    });
}

const NativeWebflowVsWordpressHero: React.FC = () => {
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

        ensureWebflowVsWordpressGlassRuntime()
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
        <header id="hero" aria-labelledby="wfvwp-hero-title" className={`wfvwp-hero-section ${mounted ? 'is-mounted' : ''}`}>
            <div className="max-w-7xl mx-auto px-6 w-full wfvwp-hero__container">
                <div className="wfvwp-hero__row">
                    <div className="wfvwp-hero__copy-col">
                        <div className="wfvwp-hero__copy">
                            <div className="wfvwp-hero__eyebrow-wrap">
                                <div className="wfvwp-hero__eyebrow">Webflow vs WordPress</div>
                            </div>

                            <div className="wfvwp-hero__heading-wrap">
                                <h1 id="wfvwp-hero-title" className="wfvwp-hero__heading">A modern, scalable WordPress alternative</h1>
                            </div>

                            <div className="wfvwp-hero__body-wrap">
                                <p className="wfvwp-hero__body">
                                    Discover why leading agencies and organizations are switching from WordPress to Webflow.
                                </p>
                            </div>

                            <div className="wfvwp-hero__button-wrap">
                                <div className="wfvwp-hero__button">
                                    <div aria-hidden="true" className="wfvwp-hero__button-text">Contact sales</div>
                                    <a
                                        className="wfvwp-hero__button-link"
                                        href="https://webflow.com/enterprise/contact-sales"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="wfvwp-hero__sr-only">Contact sales</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wfvwp-hero__spacer" aria-hidden="true" />

                <div className="wfvwp-hero__media-block">
                    <div className="wfvwp-hero__card">
                        <div className={`wfvwp-hero__glass-layer ${glassReady ? 'is-ready' : ''}`}>
                            <div className="wfvwp-hero__glass-fallback" aria-hidden="true" />
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
                                className="wfvwp-hero__glass-canvas fluted-glass-canvas"
                            />
                        </div>

                        <div className="wfvwp-hero__image-frame">
                            <img
                                src="/webflow-vs-wordpress-hero/vs-wordpress-canvas-preview.webp"
                                alt="Screenshot of a website nested in the Webflow canvas with two floating panels."
                                loading="eager"
                                fetchPriority="high"
                                className="wfvwp-hero__image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

type WebflowVsWordpressCmsTabCta = {
    label: string;
    href: string;
};

type WebflowVsWordpressCmsTab = {
    title: string;
    body: string;
    imageSrc: string;
    imageAlt: string;
    ctas: WebflowVsWordpressCmsTabCta[];
};

type WebflowVsWordpressWhyFeature = {
    anchorId: string;
    title: string;
    body: string[];
    imageSrc: string;
    imageAlt: string;
    imageObjectPosition: string;
    ctas?: WebflowVsWordpressCmsTabCta[];
};

type WebflowVsWordpressCustomerBadge = {
    imageSrc: string;
    imageAlt: string;
};

type WebflowVsWordpressTestimonial = {
    name: string;
    title: string;
    company: string;
    quote: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
};

type WebflowVsWordpressComparisonIcon = 'no' | 'minus' | 'check';

type WebflowVsWordpressComparisonCell = {
    icon: WebflowVsWordpressComparisonIcon;
    detail?: React.ReactNode;
};

type WebflowVsWordpressComparisonRow = {
    feature: string;
    wordpress: WebflowVsWordpressComparisonCell;
    wordpressVip: WebflowVsWordpressComparisonCell;
    webflow: WebflowVsWordpressComparisonCell;
};

type WebflowVsWordpressG2Tab = {
    title: string;
    imageSrc: string;
    imageAlt: string;
};

type WebflowVsWordpressFaqItem = {
    question: string;
    answer: React.ReactNode[];
};

type WebflowVsWordpressDemoSupportItem = React.ReactNode;

const WEBFLOW_VS_WORDPRESS_CMS_TABS_AUTOPLAY_MS = 6000;
const WEBFLOW_VS_WORDPRESS_CMS_TABS_DESKTOP_QUERY = '(min-width: 768px)';
const webflowVsWordpressCmsTabs: WebflowVsWordpressCmsTab[] = [
    {
        title: 'Designers',
        body: 'Design and build sophisticated websites with or without writing custom code. Create design systems and components that drive brand consistency at scale.',
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/6895e78dd96d1469d0b6a628_wordpress-tab1-1.avif',
        imageAlt: '',
        ctas: [
            {
                label: 'Learn more about design in Webflow',
                href: '/feature/design',
            },
        ],
    },
    {
        title: 'Marketers',
        body: 'Build quickly with design-approved building blocks — plus write, edit, and update content directly on the canvas or generate it with the help of AI. Publish with just a click, then use Webflow’s native analytics and experimentation tools to optimize every piece of content without the need for plugins or developers.',
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/6895e78df34417242202e109_wordpress-tab1-2.avif',
        imageAlt: '',
        ctas: [
            {
                label: 'Explore Webflow\u00A0Optimize',
                href: '/feature/optimize',
            },
            {
                label: 'Explore page building',
                href: '/feature/page-building',
            },
        ],
    },
    {
        title: 'Developers',
        body: 'Add custom code into any page, programmatically serve content in and out of Webflow, and build bespoke integrations with MACH-certified APIs.',
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/6895e78deb7f2e1e2ec0168b_wordpress-tab1-3.avif',
        imageAlt: '',
        ctas: [
            {
                label: 'Learn more about developer tools',
                href: '/developers',
            },
        ],
    },
];

const webflowVsWordpressMojibakeFixes: Array<[string, string]> = [
    ['\u00e2\u20ac\u201d', '\u2014'],
    ['\u00e2\u20ac\u2122', '\u2019'],
    ['\u00c2\u00a0', '\u00a0'],
];

function repairWebflowVsWordpressCopy(value: string) {
    return webflowVsWordpressMojibakeFixes.reduce(
        (fixedValue, [from, to]) => fixedValue.split(from).join(to),
        value
    );
}

const webflowVsWordpressWhyFeatures: WebflowVsWordpressWhyFeature[] = [
    {
        anchorId: 'sticky-scroll-1',
        title: 'No more plugin, core, or PHP updates',
        body: [
            'With Webflow, you\'ll never need to update software or manage outdated plugins - you\'re always on the latest version, updated automatically in a secure sandbox with zero downtime.',
            'More importantly, you don\'t need to rely on plugins anymore - we built the most popular WordPress plugins straight into our platform as native features. Plus, we have a Marketplace with vetted apps and APIs to build your own bespoke integrations and logic.',
        ],
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/6895e78d6e55a19349eaaaad_wordpress-sticky2-1.avif',
        imageAlt: '',
        imageObjectPosition: '0% 0%',
    },
    {
        anchorId: 'sticky-scroll-2',
        title: 'Go live quickly and safely',
        body: [
            'Custom roles, page branching, private staging, and approval workflows ensure marketers and designers follow DevOps best practices as they go live with a few clicks.',
        ],
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/6895e78d6f8193e0964081a3_wordpress-sticky2-2.avif',
        imageAlt: '',
        imageObjectPosition: '0% 0%',
    },
    {
        anchorId: 'sticky-scroll-3',
        title: 'Enterprise-grade managed hosting and security included',
        body: [
            'Webflow offers a fully-managed, auto-cached, instantly-deployed hosting environment that automatically serves your site from a location near each visitor. 15,000 websites are published with Webflow every hour with 99.99% hosting uptime, reaching 95% of the world in <50ms.',
            'Webflow also offers enterprise-grade SOC 2 Type II along with a multitude of security features like global DDoS and bot protection - eliminating the engineering or IT burden of evaluating, implementing, and maintaining website infrastructure and security.',
        ],
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/6895e78d30d7de744c94878d_wordpress-sticky2-3.avif',
        imageAlt: '',
        imageObjectPosition: '0% 100%',
        ctas: [
            {
                label: 'Explore hosting',
                href: '/feature/hosting',
            },
            {
                label: 'Explore security',
                href: 'https://webflow.com/security',
            },
        ],
    },
    {
        anchorId: 'sticky-scroll-4',
        title: 'Launching your site is just the beginning',
        body: [
            'Webflow enables anyone on your team to expand your global reach with Localization, make data-driven decisions using native analytics, and run AI-powered tests and personalization with Optimize.',
        ],
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/6895e78d20825e8a37db9f5a_wordpress-sticky2-4.avif',
        imageAlt: '',
        imageObjectPosition: '0% 0%',
        ctas: [
            {
                label: 'Explore Webflow Optimize',
                href: '/feature/optimize',
            },
        ],
    },
];

const webflowVsWordpressCustomerBadges: WebflowVsWordpressCustomerBadge[] = [
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

const webflowVsWordpressTestimonials: WebflowVsWordpressTestimonial[] = [
    {
        name: 'Elyssa Albert',
        title: 'VP of Design',
        company: 'Attentive',
        quote: '\u201COur new designs didn\'t need to go through anyone else besides brand and marketing \u2014 no engineers needed. The freedom and flexibility we gained through Webflow was invaluable.\u201D',
        imageSrc: 'https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68921df8b7ed02975aa81f12_609b198fb3c3ab3989d51db6_elyssa-albert.jpeg',
        imageAlt: 'Elyssa Albert',
        href: 'https://webflow.com/customers/attentive',
    },
    {
        name: 'Curtis Anderson',
        title: 'Founder and CEO',
        company: 'Nursa',
        quote: '\u201CThe biggest value driver for us is speed. Webflow delivers the performance we need while giving us a flexible foundation that scales as our platform grows and the landscape of site discovery evolves \u2014 all without sacrificing team or cost efficiency.\u201D',
        imageSrc: 'https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68a49e6cc818ea3a30397ff2_WfS0vcSrwzZozkZeHQ8-2jJn48Cd_scrppPzRo8_Zcg.webp',
        imageAlt: 'Curtis Anderson',
        href: 'https://webflow.com/customers/nursa',
    },
    {
        name: 'Elizabeth Walton Egan',
        title: 'CMO',
        company: 'Lattice',
        quote: '\u201CRapid experimentation with Webflow is huge for us: We\'re able to test quickly which leads to sizable increases in our top-of-funnel metrics and drives more value for our prospects and customers.\u201D',
        imageSrc: 'https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68921d7f25a16ed1eae3e911_66952004d3d1489d86a9e1d7_1662084310247.jpeg',
        imageAlt: 'Elizabeth Walton Egan',
        href: 'https://webflow.com/customers/lattice',
    },
    {
        name: 'Kyle Johnston',
        title: 'Senior Graphic Designer',
        company: 'HireClix',
        quote: '\u201CWe don\'t need to hire engineers because we have Webflow, which allows us to push our creative limits and elevate our entire web experience.\u201D',
        imageSrc: 'https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68921e413356a6d78eeadedc_1719321093068.jpeg',
        imageAlt: 'Kyle Johnston',
        href: 'https://webflow.com/customers/hireclix',
    },
];

const webflowVsWordpressComparisonRows: WebflowVsWordpressComparisonRow[] = [
    {
        feature: 'Design flexibility',
        wordpress: {
            icon: 'no',
            detail: 'Developer-customized themes and blocks with support from 3rd party plugins.',
        },
        wordpressVip: {
            icon: 'no',
            detail: 'Developer-customized themes and blocks with support from 3rd party plugins.',
        },
        webflow: {
            icon: 'check',
            detail: 'Power of HTML, CSS, and JS in a visual canvas.',
        },
    },
    {
        feature: 'Development tools',
        wordpress: {
            icon: 'minus',
            detail: 'PHP with a script for every plugin and GitHub-managed code.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'PHP with a script for every plugin and GitHub-managed code.',
        },
        webflow: {
            icon: 'check',
            detail: 'SEO-optimized HTML, CSS, and JS generated that you can customize and extend with MACH-certified headless APIs.',
        },
    },
    {
        feature: 'Animations and interactions',
        wordpress: {
            icon: 'minus',
            detail: 'Requires plugins, integrations, or custom code.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Requires plugins, integrations, or custom code.',
        },
        webflow: {
            icon: 'check',
            detail: 'No-code scroll-based and multi-step interactions and animations. Easily work with Spline, GSAP, 3D, Lottie and Rive.',
        },
    },
    {
        feature: 'Scaled content',
        wordpress: {
            icon: 'minus',
            detail: 'Quick templated content with proper theme configuration from developers.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Quick templated content with proper theme and 3rd party plugin configuration from developers.',
        },
        webflow: {
            icon: 'check',
            detail: 'Rich design system features and a full-featured visual CMS.',
        },
    },
    {
        feature: 'Collaboration',
        wordpress: {
            icon: 'no',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Preset roles and permissions.',
        },
        webflow: {
            icon: 'check',
            detail: 'Custom roles and permissions along with no-code branching, staging, and approval workflows.',
        },
    },
    {
        feature: 'SEO tools',
        wordpress: {
            icon: 'minus',
            detail: 'Plugins required.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Plugins required.',
        },
        webflow: {
            icon: 'check',
            detail: 'Automatic SEO audits and warnings plus unbloated SEO-optimized code.',
        },
    },
    {
        feature: 'Analytics',
        wordpress: {
            icon: 'minus',
            detail: '3rd party with dev setup and ongoing dev maintenance.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: '3rd party with dev setup and ongoing dev maintenance.',
        },
        webflow: {
            icon: 'check',
            detail: 'Visual editor and native no-code setup.',
        },
    },
    {
        feature: 'Testing and personalization',
        wordpress: {
            icon: 'no',
        },
        wordpressVip: {
            icon: 'minus',
            detail: '3rd party with dev setup and ongoing dev maintenance.',
        },
        webflow: {
            icon: 'check',
            detail: 'Integrated with testing, advanced targeting, and AI-powered personalization with ability to integrate.',
        },
    },
    {
        feature: 'Localization',
        wordpress: {
            icon: 'minus',
            detail: 'Duplicated sites with multiple subdomains and subdirectories or plugins.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Duplicated sites with multiple subdomains and subdirectories or plugins.',
        },
        webflow: {
            icon: 'check',
            detail: 'Visual-first design and content localization, native AI-powered or extensible translation options, and best-in-class localized SEO.',
        },
    },
    {
        feature: 'AI',
        wordpress: {
            icon: 'no',
        },
        wordpressVip: {
            icon: 'minus',
            detail: '3rd party / integrated.',
        },
        webflow: {
            icon: 'check',
            detail: 'Integrated natively throughout Webflow, for content generation, audience personalization, and language translation in addition to 3rd party AI apps such as Jasper.',
        },
    },
    {
        feature: 'Hosting and security',
        wordpress: {
            icon: 'minus',
            detail: '3rd party with dev setup and ongoing dev maintenance.',
        },
        wordpressVip: {
            icon: 'check',
            detail: 'Provided and managed by WordPress VIP.',
        },
        webflow: {
            icon: 'check',
            detail: 'Native, integrated, auto-cached hosting for staging and production fully managed by Webflow’s infrastructure team.',
        },
    },
    {
        feature: 'Version control and workflows',
        wordpress: {
            icon: 'no',
        },
        wordpressVip: {
            icon: 'check',
            detail: 'Version control using GitHub and can be automated through GitHub Actions. Production and staging environments provided along with controlled deployment to production.',
        },
        webflow: {
            icon: 'check',
            detail: 'No-code page branching, branch staging, approval workflows, commenting, custom roles and permissions, private staging, site activity log, auto-saving and instant rollback.',
        },
    },
    {
        feature: 'Pricing',
        wordpress: {
            icon: 'minus',
            detail: 'Free for default WordPress. Plugins and hosting add ongoing unpredictable incremental costs.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Starts at $25k per year, typically more than 6 figures.',
        },
        webflow: {
            icon: 'check',
            detail: 'Flexible plans that scale into Enterprise.',
        },
    },
    {
        feature: 'Partner network',
        wordpress: {
            icon: 'check',
            detail: 'Extensive network of freelancers.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Small, but loyal pool of agency partners.',
        },
        webflow: {
            icon: 'check',
            detail: (
                <>
                    Extensive network of{' '}
                    <a href="https://webflow.com/certified-partners" target="_blank" rel="noreferrer">
                        certified partners.
                    </a>
                </>
            ),
        },
    },
    {
        feature: 'Support and education',
        wordpress: {
            icon: 'minus',
            detail: 'Strong open source community support.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Small partner network.',
        },
        webflow: {
            icon: 'check',
            detail: (
                <>
                    Industry-leading{' '}
                    <a href="https://help.webflow.com/hc/en-us" target="_blank" rel="noreferrer">
                        Knowledge Base
                    </a>{' '}
                    and{' '}
                    <a href="https://university.webflow.com/" target="_blank" rel="noreferrer">
                        University
                    </a>{' '}
                    provide extensive written and video documentation. Webflow Enterprise includes dedicated CMSs and SAs alongside specialist 24/7 support.
                </>
            ),
        },
    },
    {
        feature: 'Certifications',
        wordpress: {
            icon: 'no',
        },
        wordpressVip: {
            icon: 'check',
            detail: 'SOC1 and SOC2 Type 2.',
        },
        webflow: {
            icon: 'check',
            detail: 'SOC 2 Type 2 and MACH alliance-certified APIs.',
        },
    },
];

const webflowVsWordpressG2Tabs: WebflowVsWordpressG2Tab[] = [
    {
        title: 'Document control',
        imageSrc: '/images/hr-docs/g2-document-control.webp',
        imageAlt: 'HR Docs document library demo showing version history, expiry tracking, and document status controls.',
    },
    {
        title: 'Approval workflows',
        imageSrc: '/images/hr-docs/g2-approval-workflows.webp',
        imageAlt: 'HR Docs approval queue demo showing pending requests, SLA indicators, and approve or reject actions.',
    },
    {
        title: 'Audit trail',
        imageSrc: '/images/hr-docs/g2-audit-trail.webp',
        imageAlt: 'HR Docs audit log demo showing immutable event history, actors, and record-level change traces.',
    },
];

const webflowVsWordpressFaqItems: WebflowVsWordpressFaqItem[] = [
    {
        question: 'What’s the difference between Webflow and WordPress?',
        answer: [
            'WordPress is an open-source blogging platform with an extensive library of plugins that can extend it into a CMS offering. Marketers typically rely on prebuilt templates and themes while developers integrate with custom code, which requires significant upfront and ongoing engineering support and puts a low ceiling on what marketing can achieve.',
            'Moreover, because WordPress doesn’t include integrated hosting, developers must provision, secure, and deploy to their own hosting environments, which adds an additional resourcing burden. Separating the hosting from the vendor tool also opens up the possibility that the two may stop communicating with each other without warning, stranding users with sites and plugins that cannot be updated.',
            'Webflow is a website experience platform that gives teams the power to build, manage, and optimize websites in a visual-first canvas. On top of a composable CMS, Webflow offers optimization tools, managed hosting, native integrations, and more — plus industry-leading education and support.',
        ],
    },
    {
        question: 'Does Webflow have a CMS?',
        answer: [
            'Yes. Webflow’s visual-first, composable CMS empowers marketers and designers to create, edit, and publish CMS content and collections without writing code — so you can ship high-impact work, fast. Edit content directly on the canvas, create custom content collections with flexible data models, import content from any CMS instantly via CSV, and connect to your front-end templates visually without developer expertise.',
            'Our CMS also provides extensive value to engineering and IT by removing the burdens of pixel pushing and managing infrastructure, while still allowing for custom HTML, CSS, and JS to be written anywhere in the page and offering MACH-certified APIs to build bespoke logic and integrations.',
        ],
    },
    {
        question: 'Why switch from WordPress to Webflow?',
        answer: [
            'WordPress websites require significant engineering time to maintain and neither marketing or design have the autonomy or agility to build their own designs, experiments, or personalize content. Unoptimized content slowly rolls out leaving money on the table and your total cost of ownership inflates as more and more Engineering hours are spent just keeping the lights on.',
            'Webflow customers experience faster time-to-market, the ability to build more engaging and better-performing websites, and much-improved collaboration across every person or team who crafts websites.',
        ],
    },
    {
        question: 'WordPress has a huge plugin ecosystem and can connect to my martech tools. Will I lose this extensibility with Webflow?',
        answer: [
            'You won’t! In fact, Webflow improves on the traditional open-source plugin ecosystem model in 2 ways:',
            (
                <>
                    First, by offering a comprehensive, robust, and sanctioned set of APIs which can be used to create any kind of integration imaginable. Plus, our App Marketplace features fully-vetted and approved apps automatically updated by the developer, which use a sandboxed model to keep the code separate from the Webflow application. <strong>This means that any updates or crashes to the plugin will never affect your core site.</strong>
                </>
            ),
            'Second, a large diversity of plugins itself is an indication of missing functionality out of the box. Because so many features provided by plugins in a typical WordPress build are built natively in to Webflow, developers don’t need to fill as many product gaps in the first place.',
        ],
    },
    {
        question: 'Does Webflow provide Advanced Custom Fields?',
        answer: [
            'As a fully-featured CMS, Webflow includes custom post types (called CMS collections) natively. By contrast, default WordPress installations do not include this essential core functionality, so developers have to rely on plugins like Advanced Custom Fields to define and configure additional post types and data models.',
            'As a complete solution, Webflow offers native, flexible, and visual-first versions of all the crucial functionality WordPress developers are forced to cobble together or build themselves, from SEO to layout builders to custom content types. This not only saves development time, but empowers less technical users to do the same work which currently requires extensive developer expertise.',
        ],
    },
    {
        question: 'How is Webflow different from WordPress plugins like Elementor or Divi?',
        answer: [
            'Beyond the common issue where excess plugins create bloated sites, resulting in performance and security issues, Elementor, Divi, Bricks, Oxygen and other simplified versions of Webflow’s visual editor still face the same fundamental problem of any WordPress implementation: making adjustments to components or themes still requires writing code.',
            'With Webflow, marketing and design can import from Figma or create their own variables, components, templates, and even full atomic design systems that scale across your entire site.',
        ],
    },
    {
        question: 'What about site backup and restore?',
        answer: [
            (
                <>
                    As a complete, integrated solution, Webflow offers automatic and instant{' '}
                    <a href="https://help.webflow.com/hc/en-us/articles/33961244069395-Save-and-restore-backups" target="_blank" rel="noreferrer">
                        backups
                    </a>{' '}
                    every 10 minutes or every 10 changes – whichever comes first. Backups can be previewed in a new tab – like looking at a time capsule of your site – and one-click restored so that every atomic element of your design system and every asset are instantly restored, so you can design and develop without fear.
                </>
            ),
        ],
    },
];

const webflowVsWordpressDemoSupportItems: WebflowVsWordpressDemoSupportItem[] = [
    'Onboarding and training',
    'Technical consulting',
    'Personalized help from a dedicated CSM',
    'On-demand phone support',
    (
        <a href="https://webflow.com/certified-partners" target="_blank" rel="noreferrer">
            Certified Webflow partners
        </a>
    ),
];

const NativeWebflowVsWordpressCmsTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabsListRef = useRef<HTMLDivElement>(null);
    const autoplayTimeoutRef = useRef<number | null>(null);
    const autoplayStartTimeRef = useRef<number | null>(null);
    const autoplayRemainingTimeRef = useRef(WEBFLOW_VS_WORDPRESS_CMS_TABS_AUTOPLAY_MS);
    const isInViewRef = useRef(false);
    const activeTabRef = useRef(0);
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') {
            return true;
        }

        return window.matchMedia(WEBFLOW_VS_WORDPRESS_CMS_TABS_DESKTOP_QUERY).matches;
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
            autoplayRemainingTimeRef.current = WEBFLOW_VS_WORDPRESS_CMS_TABS_AUTOPLAY_MS;
            autoplayStartTimeRef.current = null;
            activateTab((activeTabRef.current + 1) % webflowVsWordpressCmsTabs.length);
        }, delay);
    };

    useEffect(() => {
        activeTabRef.current = activeTab;
    }, [activeTab]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQueryList = window.matchMedia(WEBFLOW_VS_WORDPRESS_CMS_TABS_DESKTOP_QUERY);
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

        webflowVsWordpressCmsTabs.forEach(tab => {
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
        autoplayRemainingTimeRef.current = WEBFLOW_VS_WORDPRESS_CMS_TABS_AUTOPLAY_MS;
        clearAutoplayTimer();

        if (!isDesktop || !isInViewRef.current) {
            return;
        }

        scheduleAutoplay(WEBFLOW_VS_WORDPRESS_CMS_TABS_AUTOPLAY_MS);

        return () => {
            clearAutoplayTimer();
        };
    }, [activeTab, isDesktop]);

    useEffect(() => {
        if (!isDesktop) {
            autoplayRemainingTimeRef.current = WEBFLOW_VS_WORDPRESS_CMS_TABS_AUTOPLAY_MS;
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
            autoplayRemainingTimeRef.current = WEBFLOW_VS_WORDPRESS_CMS_TABS_AUTOPLAY_MS;
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
        <section className="wfvwp-cms-tabs-section" aria-labelledby="wfvwp-cms-tabs-title">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="wfvwp-cms-tabs">
                    <div className="wfvwp-cms-tabs__spacer" aria-hidden="true" />

                    <div className="wfvwp-cms-tabs__menu">
                        <div className="wfvwp-cms-tabs__content">
                            <h3 id="wfvwp-cms-tabs-title" className="wfvwp-cms-tabs__title">Visual-first, composable CMS</h3>
                            <p className="wfvwp-cms-tabs__intro">
                                {'Webflow\u2019s CMS is designed for everyone who has a hand in crafting websites.'}
                            </p>
                        </div>

                        <div ref={tabsListRef} className="wfvwp-cms-tabs__list" role="list">
                            {webflowVsWordpressCmsTabs.map((tab, index) => {
                                const isActive = index === activeTab;
                                const buttonId = `wfvwp-cms-tab-button-${index}`;
                                const panelId = `wfvwp-cms-tab-panel-${index}`;

                                return (
                                    <article
                                        key={tab.title}
                                        className={`wfvwp-cms-tabs__item ${isActive ? 'cc-active' : ''}`}
                                        role="listitem"
                                    >
                                        <div className="wfvwp-cms-tabs__link-wrapper">
                                            <div className="wfvwp-cms-tabs__trigger">
                                                <button
                                                    id={buttonId}
                                                    type="button"
                                                    className="wfvwp-cms-tabs__button"
                                                    aria-controls={panelId}
                                                    aria-expanded={isDesktop ? isActive : true}
                                                    onClick={() => activateTab(index)}
                                                >
                                                    <span className="wfvwp-hero__sr-only">Select tab</span>
                                                </button>

                                                <div className="wfvwp-cms-tabs__progress-track" aria-hidden="true">
                                                    <div
                                                        className="wfvwp-cms-tabs__progress-bar"
                                                        style={isActive && isDesktop
                                                            ? {
                                                                animationName: 'wfvwpCmsTabsProgress',
                                                                animationDuration: `${WEBFLOW_VS_WORDPRESS_CMS_TABS_AUTOPLAY_MS}ms`,
                                                                animationTimingFunction: 'linear',
                                                                animationFillMode: 'forwards',
                                                                animationPlayState: isInView ? 'running' : 'paused',
                                                            }
                                                            : undefined}
                                                    />
                                                </div>

                                                <div className="wfvwp-cms-tabs__menu-text">
                                                    <h3 className="wfvwp-cms-tabs__tab-title">{tab.title}</h3>
                                                </div>
                                            </div>

                                            <div
                                                id={panelId}
                                                className="wfvwp-cms-tabs__interactive-content"
                                                aria-labelledby={buttonId}
                                            >
                                                <div className="wfvwp-cms-tabs__interactive-inner">
                                                    <p className="wfvwp-cms-tabs__body">{repairWebflowVsWordpressCopy(tab.body)}</p>

                                                    <div className="wfvwp-cms-tabs__cta-row">
                                                        {tab.ctas.map(cta => (
                                                            <div
                                                                key={cta.label}
                                                                className="wfvwp-cms-tabs__cta-shell"
                                                            >
                                                                <div aria-hidden="true" className="wfvwp-cms-tabs__cta-text">{cta.label}</div>
                                                                <div className="wfvwp-cms-tabs__cta-icon" aria-hidden="true">
                                                                    <span className="wfvwp-cms-tabs__cta-icon-glyph is-arrow-right">&rarr;</span>
                                                                </div>
                                                                <a
                                                                    className="wfvwp-cms-tabs__cta-link"
                                                                    href={cta.href}
                                                                >
                                                                    <span className="wfvwp-hero__sr-only">{cta.label}</span>
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="wfvwp-cms-tabs__stage"
                                            aria-hidden={isDesktop ? !isActive : undefined}
                                            style={isDesktop
                                                ? {
                                                    opacity: isActive ? 1 : 0,
                                                    zIndex: isActive ? 2 : 1,
                                                }
                                                : undefined}
                                        >
                                            <div className="wfvwp-cms-tabs__image-frame">
                                                <img
                                                    src={tab.imageSrc}
                                                    alt={tab.imageAlt}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="wfvwp-cms-tabs__image"
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

const NativeWebflowVsWordpressWhySection: React.FC = () => {
    const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [activeFeature, setActiveFeature] = useState(0);
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') {
            return true;
        }

        return window.matchMedia(WEBFLOW_VS_WORDPRESS_CMS_TABS_DESKTOP_QUERY).matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQueryList = window.matchMedia(WEBFLOW_VS_WORDPRESS_CMS_TABS_DESKTOP_QUERY);
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
        <section className="wfvwp-why-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="wfvwp-why__intro">
                    <h2 className="wfvwp-why__heading">Why teams choose Webflow</h2>
                    <p className="wfvwp-why__summary">
                        Discover why leading agencies and organizations trust Webflow&apos;s website experience platform over WordPress with their websites.
                    </p>
                </div>

                <div className="wfvwp-why__rows">
                    {webflowVsWordpressWhyFeatures.map((feature, index) => {
                        const isCurrent = !isDesktop || activeFeature === index;

                        return (
                            <div
                                key={feature.anchorId}
                                id={feature.anchorId}
                                ref={element => {
                                    rowRefs.current[index] = element;
                                }}
                                data-index={index}
                                className="wfvwp-why__row"
                            >
                                <div className="wfvwp-why__copy-col">
                                    <h3 className="wfvwp-why__row-title">{feature.title}</h3>

                                    <div className="wfvwp-why__copy">
                                        {feature.body.map(paragraph => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                    </div>

                                    {feature.ctas && feature.ctas.length > 0 ? (
                                        <div className="wfvwp-why__cta-row">
                                            {feature.ctas.map(cta => (
                                                <a
                                                    key={cta.label}
                                                    className="wfvwp-why__cta"
                                                    href={cta.href}
                                                    target={cta.href.startsWith('http') ? '_blank' : undefined}
                                                    rel={cta.href.startsWith('http') ? 'noreferrer' : undefined}
                                                >
                                                    <span className="wfvwp-why__cta-text">{cta.label}</span>
                                                    <span className="wfvwp-why__cta-arrow" aria-hidden="true">
                                                        {'\u2192'}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="wfvwp-why__image-position" aria-hidden="true">
                                    <div className="wfvwp-why__image-track">
                                        <div className="wfvwp-why__image-sticky">
                                            <div className="wfvwp-why__image-wrap">
                                                <div className="wfvwp-why__image-frame">
                                                    <img
                                                        src={feature.imageSrc}
                                                        alt={feature.imageAlt}
                                                        loading="lazy"
                                                        className="wfvwp-why__image"
                                                        style={{ objectPosition: feature.imageObjectPosition }}
                                                    />
                                                </div>
                                                <a
                                                    aria-hidden="true"
                                                    tabIndex={-1}
                                                    href={`#${feature.anchorId}`}
                                                    className={`wfvwp-why__image-link ${isCurrent ? 'w--current' : ''}`}
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

const NativeWebflowVsWordpressMigrationCta: React.FC = () => {
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

        ensureWebflowVsWordpressGlassRuntime()
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
        <section className="wfvwp-migration-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="wfvwp-migration-card">
                    <div className={`wfvwp-migration-card__glass ${glassReady ? 'is-ready' : ''}`}>
                        <div className="wfvwp-migration-card__glass-fallback" aria-hidden="true" />
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
                            className="wfvwp-migration-card__glass-canvas fluted-glass-canvas"
                        />
                    </div>

                    <div className="wfvwp-migration-card__body">
                        <div className="wfvwp-migration-card__content">
                            <div className="wfvwp-migration-card__copy-group">
                                <h2 className="wfvwp-migration-card__title">How to navigate the WordPress to Webflow migration</h2>
                                <p className="wfvwp-migration-card__body-copy">
                                    Modern teams need to unplug from WordPress&apos; technical burdens, dev dependencies, workflow bottlenecks, and performance issues that drain critical resources. Download our migration guide to learn why and how migrating to Webflow will refocus your teams on optimizing conversions and ROI.
                                </p>
                            </div>

                            <div className="wfvwp-migration-card__button">
                                <div aria-hidden="true" className="wfvwp-migration-card__button-text">Get the guide</div>
                                <a
                                    className="wfvwp-migration-card__button-link"
                                    href="/resources/ebooks/wordpress-webflow-migration"
                                    aria-label="Get the guide"
                                />
                            </div>
                        </div>

                        <div className="wfvwp-migration-card__cover-col">
                            <div className="wfvwp-migration-card__cover-wrap">
                                <img
                                    src="https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/68951473878f65991bb5f367_resources_ebook_worpress-migration.avif"
                                    alt='Cover art for an ebook that reads, "Navigating the WordPress to Webflow migration."'
                                    loading="lazy"
                                    className="wfvwp-migration-card__cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const NativeWebflowVsWordpressCustomersSection: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState(1);

    const goToSlide = (targetIndex: number) => {
        const totalSlides = webflowVsWordpressTestimonials.length;
        const clampedIndex = Math.max(0, Math.min(targetIndex, totalSlides - 1));
        setActiveSlide(clampedIndex);
    };

    return (
        <>
            <section className="wfvwp-customers-section">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wfvwp-customers__intro-row">
                        <div className="wfvwp-customers__intro-col">
                            <h2 className="wfvwp-customers__heading">Customers love us</h2>
                            <p className="wfvwp-customers__summary">
                                But don&apos;t just take our word for it — check out our latest G2 awards.
                            </p>
                        </div>

                        <div className="wfvwp-customers__badges-col">
                            <div className="wfvwp-customers__badges-grid">
                                {webflowVsWordpressCustomerBadges.map(badge => (
                                    <div key={badge.imageAlt} className="wfvwp-customers__badge-frame">
                                        <img
                                            src={badge.imageSrc}
                                            alt={badge.imageAlt}
                                            loading="lazy"
                                            className="wfvwp-customers__badge-image"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wfvwp-customers-slider-section">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wfvwp-customers-slider">
                        <div className="wfvwp-customers-slider__controls">
                            <button
                                type="button"
                                className={`wfvwp-customers-slider__control circle-btn${activeSlide === 0 ? ' swiper-button-disabled' : ''}`}
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
                                className={`wfvwp-customers-slider__control circle-btn${activeSlide === webflowVsWordpressTestimonials.length - 1 ? ' swiper-button-disabled' : ''}`}
                                data-direction="next"
                                aria-label="Next testimonial"
                                aria-disabled={activeSlide === webflowVsWordpressTestimonials.length - 1}
                                onClick={() => goToSlide(activeSlide + 1)}
                                disabled={activeSlide === webflowVsWordpressTestimonials.length - 1}
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

                        <div className="wfvwp-customers-slider__offset">
                            <div
                                className="wfvwp-customers-slider__track"
                                data-active-slide={activeSlide}
                                role="list"
                                aria-label="Customer testimonials"
                            >
                                {webflowVsWordpressTestimonials.map((testimonial, index) => (
                                    <a
                                        key={testimonial.name}
                                        data-index={index}
                                        className="wfvwp-customers-slider__slide"
                                        href={testimonial.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        role="listitem"
                                        aria-current={activeSlide === index ? 'true' : undefined}
                                    >
                                        <div className="wfvwp-customers-slider__card">
                                            <div className="wfvwp-customers-slider__card-body">
                                                <div className="wfvwp-customers-slider__meta-col">
                                                    <div className="wfvwp-customers-slider__avatar-row">
                                                        <div className="wfvwp-customers-slider__avatar-shell">
                                                            <img
                                                                src={testimonial.imageSrc}
                                                                alt={testimonial.imageAlt}
                                                                loading="lazy"
                                                                className="wfvwp-customers-slider__avatar-image"
                                                            />
                                                        </div>

                                                        <div className="wfvwp-customers-slider__person">
                                                            <div className="wfvwp-customers-slider__name">{testimonial.name}</div>
                                                            <div className="wfvwp-customers-slider__title-wrap">
                                                                <span>{testimonial.title}</span>
                                                                <span>, </span>
                                                                <span>{testimonial.company}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="wfvwp-customers-slider__quote-col">
                                                    <blockquote className="wfvwp-customers-slider__quote">
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

const webflowVsWordpressComparisonIconSrc: Record<WebflowVsWordpressComparisonIcon, string> = {
    no: 'https://dhygzobemt712.cloudfront.net/Icons/Light/24px/CircleNo.svg',
    minus: 'https://dhygzobemt712.cloudfront.net/Icons/Light/24px/CircleMinus.svg',
    check: 'https://dhygzobemt712.cloudfront.net/Icons/Light/24px/CircleCheckYes.svg',
};

const NativeWebflowVsWordpressComparisonTable: React.FC = () => {
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
        <section className="wfvwp-compare-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="wfvwp-compare__intro-row">
                    <div className="wfvwp-compare__intro-col">
                        <h2 className="wfvwp-compare__heading">
                            How do WordPress, WordPress
                            <br className="wfvwp-compare__heading-break" />
                            VIP, and Webflow compare?
                        </h2>
                    </div>
                </div>

                <div className="wfvwp-compare__spacer" aria-hidden="true" />

                <div
                    className="wfvwp-compare__table-shell"
                    role="table"
                    aria-label="Comparing Webflow vs Wordpress"
                    aria-colcount={4}
                    aria-rowcount={webflowVsWordpressComparisonRows.length + 1}
                >
                    <div className="wfvwp-compare__table-slot" role="rowgroup">
                        <div className="wfvwp-compare__row wfvwp-compare__row--header">
                            <div role="row" className="wfvwp-compare__row-slot">
                                <div className="wfvwp-compare__cell wfvwp-compare__cell--header" role="columnheader">
                                    <div className="wfvwp-compare__cell-slot wfvwp-compare__cell-slot--feature">
                                        <div className="wfvwp-compare__rich-text wfvwp-compare__rich-text--header">
                                            <p>
                                                <strong>Features</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="wfvwp-compare__cell wfvwp-compare__cell--header-value" role="columnheader">
                                    <div className="wfvwp-compare__cell-slot wfvwp-compare__cell-slot--header-value">
                                        <div className="wfvwp-compare__rich-text wfvwp-compare__rich-text--header">
                                            <p>
                                                <strong>WordPress</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="wfvwp-compare__cell wfvwp-compare__cell--header-value" role="columnheader">
                                    <div className="wfvwp-compare__cell-slot wfvwp-compare__cell-slot--header-value">
                                        <div className="wfvwp-compare__rich-text wfvwp-compare__rich-text--header">
                                            <p>
                                                <strong>WordPress VIP</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="wfvwp-compare__cell wfvwp-compare__cell--header-value is-webflow" role="columnheader">
                                    <div className="wfvwp-compare__cell-slot wfvwp-compare__cell-slot--header-value">
                                        <div className="wfvwp-compare__rich-text wfvwp-compare__rich-text--header">
                                            <p>
                                                <strong>Webflow</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {webflowVsWordpressComparisonRows.map((row, rowIndex) => {
                            const rowOpen = isRowOpen(rowIndex);
                            const cells = [
                                row.wordpress,
                                row.wordpressVip,
                                row.webflow,
                            ];

                            return (
                                <div
                                    key={row.feature}
                                    className={`wfvwp-compare__row ${rowOpen ? 'is-open' : ''}`}
                                    data-interaction="tooltip-parent"
                                >
                                    <div role="row" className="wfvwp-compare__row-slot">
                                        <div className="wfvwp-compare__cell wfvwp-compare__cell--feature" role="cell">
                                            <div className="wfvwp-compare__cell-slot wfvwp-compare__cell-slot--feature">
                                                <div className="wfvwp-compare__rich-text">
                                                    <p>{row.feature}</p>
                                                </div>
                                                <div className="wfvwp-compare__tooltip-expand">
                                                    <button
                                                        type="button"
                                                        data-interaction="expand-tooltip"
                                                        className="wfvwp-compare__toggle"
                                                        aria-label="Tooltip"
                                                        aria-expanded={rowOpen}
                                                        onClick={() => toggleRow(rowIndex)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15" fill="none" className="wfvwp-compare__toggle-icon" aria-hidden="true">
                                                            <path d="M7 0.181641C3.1402 0.181641 0 3.32188 0 7.18168C0 11.0414 3.1402 14.1816 7 14.1816C10.8598 14.1816 14 11.0414 14 7.18168C14 3.32188 10.8598 0.181641 7 0.181641ZM7 12.9089C3.84194 12.9089 1.27273 10.3397 1.27273 7.18168C1.27273 4.02366 3.84194 1.45437 7 1.45437C10.1581 1.45437 12.7273 4.02366 12.7273 7.18168C12.7273 10.3397 10.158 12.9089 7 12.9089Z" fill="currentColor" />
                                                            <path d="M7.00066 3.15137C6.53289 3.15137 6.15234 3.53217 6.15234 4.00023C6.15234 4.46788 6.53289 4.84834 7.00066 4.84834C7.46843 4.84834 7.84897 4.46788 7.84897 4.00023C7.84897 3.53217 7.46843 3.15137 7.00066 3.15137Z" fill="currentColor" />
                                                            <path d="M6.99964 6.12109C6.6482 6.12109 6.36328 6.40601 6.36328 6.75746V10.5756C6.36328 10.927 6.6482 11.212 6.99964 11.212C7.35108 11.212 7.636 10.927 7.636 10.5756V6.75746C7.636 6.40601 7.35108 6.12109 6.99964 6.12109Z" fill="currentColor" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {cells.map((cell, cellIndex) => {
                                            const isWebflowColumn = cellIndex === 2;
                                            const hasDetail = Boolean(cell.detail);

                                            return (
                                                <div
                                                    key={`${row.feature}-${cellIndex}`}
                                                    className={`wfvwp-compare__cell wfvwp-compare__cell--value ${isWebflowColumn ? 'is-webflow' : ''}`}
                                                    role="cell"
                                                >
                                                    <div className="wfvwp-compare__cell-slot wfvwp-compare__cell-slot--value">
                                                        <img
                                                            src={webflowVsWordpressComparisonIconSrc[cell.icon]}
                                                            alt=""
                                                            role="presentation"
                                                            className={`wfvwp-compare__icon wfvwp-compare__icon--${cell.icon}`}
                                                        />

                                                        {hasDetail ? (
                                                            <div className="wfvwp-compare__tooltip-expand">
                                                                <div
                                                                    role="tooltip"
                                                                    data-interaction="tooltip-pane"
                                                                    aria-hidden={!rowOpen}
                                                                    className={`wfvwp-compare__tooltip-pane ${rowOpen ? 'is-active' : ''}`}
                                                                >
                                                                    <div className="wfvwp-compare__tooltip-pane-inner">
                                                                        <div className="wfvwp-compare__tooltip-copy">
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

const NativeWebflowVsWordpressBusinessImpactSection: React.FC = () => {
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

        ensureWebflowVsWordpressGlassRuntime()
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
        <section className="wfvwp-business-impact-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="wfvwp-business-impact__card">
                    <div className={`wfvwp-business-impact__glass ${glassReady ? 'is-ready' : ''}`}>
                        <div className="wfvwp-business-impact__glass-fallback" aria-hidden="true" />
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
                            className="wfvwp-business-impact__glass-canvas fluted-glass-canvas"
                        />
                    </div>

                    <div className="wfvwp-business-impact__body">
                        <div className="wfvwp-business-impact__copy-col">
                            <h2 className="wfvwp-business-impact__title">
                                <span className="wfvwp-business-impact__title-line">See the business{' '}</span>
                                <span className="wfvwp-business-impact__title-line">impact of moving{' '}</span>
                                <span className="wfvwp-business-impact__title-line">to Webflow</span>
                            </h2>
                            <p className="wfvwp-business-impact__body-copy">
                                <span className="wfvwp-business-impact__copy-line">
                                    Use this calculator to estimate the impact of{' '}
                                </span>
                                <span className="wfvwp-business-impact__copy-line">
                                    Webflow&apos;s platform on your goals &mdash; backed{' '}
                                </span>
                                <span className="wfvwp-business-impact__copy-line">
                                    by real-world results.
                                </span>
                            </p>
                            <div data-wf--button--variant="primary" className="wfvwp-business-impact__button btn">
                                <div aria-hidden="true" className="wfvwp-business-impact__button-text btn-text">
                                    Use the calculator
                                </div>
                                <div className="wfvwp-business-impact__button-icon btn-icon" aria-hidden="true">
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
                                    className="wfvwp-business-impact__link-cover u-link-cover w-inline-block"
                                    href="https://webflow.com/migrate/business-value-calculator#calculator"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="wfvwp-hero__sr-only">Use the calculator</span>
                                </a>
                            </div>
                        </div>

                        <div className="wfvwp-business-impact__media-col">
                            <div className="wfvwp-business-impact__image-offset">
                                <div className="wfvwp-business-impact__image-frame">
                                    <img
                                        src="https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/695e887fc945b678052de100_verifone.avif"
                                        alt=""
                                        loading="lazy"
                                        className="wfvwp-business-impact__image"
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

const NativeWebflowVsWordpressG2Section: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') {
            return true;
        }

        return window.matchMedia(WEBFLOW_VS_WORDPRESS_CMS_TABS_DESKTOP_QUERY).matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQueryList = window.matchMedia(WEBFLOW_VS_WORDPRESS_CMS_TABS_DESKTOP_QUERY);
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
            setActiveTab(currentTab => (currentTab + 1) % webflowVsWordpressG2Tabs.length);
        }, WEBFLOW_VS_WORDPRESS_CMS_TABS_AUTOPLAY_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [activeTab, isDesktop]);

    return (
        <section className="wfvwp-g2-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="wfvwp-g2-tabs">
                    <div className="wfvwp-g2-tabs__menu">
                        <div className="wfvwp-g2-tabs__content">
                            <h2 className="wfvwp-g2-tabs__title">A G2 leader</h2>
                            <p className="wfvwp-g2-tabs__intro">
                                Three local ERP-Lite views now run inside the original Webflow autoplay pattern: document control, approval routing, and audit traceability.
                            </p>
                        </div>

                        <div className="wfvwp-g2-tabs__list" role="list">
                            {webflowVsWordpressG2Tabs.map((tab, index) => {
                                const isActive = index === activeTab;

                                return (
                                    <article
                                        key={tab.title}
                                        className={`wfvwp-g2-tabs__item ${isActive ? 'cc-active' : ''}`}
                                        role="listitem"
                                    >
                                        <div className="wfvwp-g2-tabs__link-wrapper">
                                            <button
                                                type="button"
                                                className="wfvwp-g2-tabs__button"
                                                aria-label={`Select ${tab.title} tab`}
                                                aria-pressed={isActive}
                                                onClick={() => setActiveTab(index)}
                                            />

                                            <div className="wfvwp-g2-tabs__progress-track" aria-hidden="true">
                                                <div
                                                    className="wfvwp-g2-tabs__progress-bar"
                                                    style={isActive && isDesktop
                                                        ? { animation: `wfvwpCmsTabsProgress ${WEBFLOW_VS_WORDPRESS_CMS_TABS_AUTOPLAY_MS}ms linear forwards` }
                                                        : undefined}
                                                />
                                            </div>

                                            <div className="wfvwp-g2-tabs__menu-text">
                                                <h3 className="wfvwp-g2-tabs__tab-title">{tab.title}</h3>
                                            </div>
                                        </div>

                                        <div
                                            className="wfvwp-g2-tabs__stage"
                                            aria-hidden={isDesktop ? !isActive : undefined}
                                        >
                                            <div className="wfvwp-g2-tabs__frame">
                                                <img
                                                    src={tab.imageSrc}
                                                    alt={tab.imageAlt}
                                                    loading="lazy"
                                                    className="wfvwp-g2-tabs__image"
                                                />
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    <div className="wfvwp-g2-tabs__spacer" aria-hidden="true" />
                </div>
            </div>
        </section>
    );
};

const NativeWebflowVsWordpressFaqSection: React.FC = () => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (itemIndex: number) => {
        setOpenItems(currentItems =>
            currentItems.includes(itemIndex)
                ? currentItems.filter(index => index !== itemIndex)
                : [...currentItems, itemIndex]
        );
    };

    return (
        <section className="wfvwp-faq-section">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="wfvwp-faq__spacer" aria-hidden="true" />
                <div className="wfvwp-faq__row">
                    <div className="wfvwp-faq__heading-col">
                        <div className="wfvwp-faq__heading-sticky">
                            <h2 className="wfvwp-faq__heading">Frequently asked<br />questions</h2>
                        </div>
                    </div>

                    <div className="wfvwp-faq__list-col">
                        <div className="wfvwp-faq__list">
                            {webflowVsWordpressFaqItems.map((item, index) => {
                                const isOpen = openItems.includes(index);
                                const contentId = `wfvwp-faq-panel-${index}`;
                                const triggerId = `wfvwp-faq-trigger-${index}`;

                                return (
                                    <details
                                        key={item.question}
                                        className="wfvwp-faq__item"
                                        open={isOpen}
                                    >
                                        <summary
                                            id={triggerId}
                                            className="wfvwp-faq__trigger"
                                            aria-controls={contentId}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                toggleItem(index);
                                            }}
                                        >
                                            <div className="wfvwp-faq__title-icon-wrap">
                                                <span className="wfvwp-faq__question">{item.question}</span>
                                            </div>
                                            <div className="wfvwp-faq__icon-wrap" aria-hidden="true">
                                                <span className="wfvwp-faq__icon-line wfvwp-faq__icon-line--horizontal" />
                                                <span className="wfvwp-faq__icon-line wfvwp-faq__icon-line--vertical" />
                                            </div>
                                        </summary>

                                        <div
                                            id={contentId}
                                            className="wfvwp-faq__content"
                                            aria-labelledby={triggerId}
                                            data-overflow-focus
                                        >
                                            <div className="wfvwp-faq__content-spacer">
                                                <div className="wfvwp-faq__answer">
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

const NativeWebflowVsWordpressScheduleDemoSection: React.FC = () => {
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

        ensureWebflowVsWordpressGlassRuntime()
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
        <section className="wfvwp-demo-section">
            <div className="max-w-7xl mx-auto px-6 w-full wfvwp-demo-container">
                <div className={`wfvwp-demo-shell__glass fluted-glass-component u-bg-mode ${glassReady ? 'is-ready' : ''}`}>
                    <div className="wfvwp-demo-shell__glass-fallback" aria-hidden="true" />
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
                        className="wfvwp-demo-shell__glass-canvas fluted-glass-canvas"
                    />
                </div>

                <div className="wfvwp-demo-row">
                    <div className="wfvwp-demo-shell__copy-col">
                        <h2 className="wfvwp-demo-shell__title">Schedule a product demo</h2>

                        <p className="wfvwp-demo-shell__subheading">We&apos;re invested in your success</p>

                        <p className="wfvwp-demo-shell__body-copy">
                            From implementation support to in-the-moment troubleshooting, we&apos;re here to help you build, scale, and optimize your sites.
                        </p>

                        <div className="wfvwp-demo-shell__spacer" aria-hidden="true" />

                        <ul className="wfvwp-demo-shell__support-list">
                            {webflowVsWordpressDemoSupportItems.map((item, index) => (
                                <li key={index} className="wfvwp-demo-shell__support-item">
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="wfvwp-demo-shell__spacer" aria-hidden="true" />

                        <div data-wf--button--variant="primary" className="wfvwp-demo-shell__button btn">
                            <div aria-hidden="true" className="wfvwp-demo-shell__button-text btn-text">
                                Contact sales
                            </div>
                            <div className="wfvwp-demo-shell__button-icon btn-icon" aria-hidden="true">
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
                                className="wfvwp-demo-shell__link-cover u-link-cover w-inline-block"
                                href="https://webflow.com/enterprise/contact-sales"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="wfvwp-hero__sr-only">Contact sales</span>
                            </a>
                        </div>
                    </div>

                    <div className="wfvwp-demo-shell__media-col">
                        <div className="wfvwp-demo-shell__media-wrap">
                            <div className="wfvwp-demo-shell__base-image-wrap">
                                <img
                                    src="https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/68a474eec7d84f46cb1f76cf_canvas-screenshot_jasper.avif"
                                    alt="Screenshot of the homepage for Jasper AI in the Webflow Designer"
                                    loading="lazy"
                                    className="wfvwp-demo-shell__base-image"
                                />
                            </div>

                            <div className="wfvwp-demo-shell__floating-image-wrap" aria-hidden="true">
                                <img
                                    src="https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/68964cac0629d1ad2da1ae18_canvas-ui_colorpicker.avif"
                                    alt=""
                                    loading="lazy"
                                    className="wfvwp-demo-shell__floating-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HRDocsCaseStudy: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [activeWorkflow, setActiveWorkflow] = useState('leave');
    const [activeResearchPersona, setActiveResearchPersona] = useState(0);

    const hypothesisData = [
        {
            tag: 'Observation Â· Month 1',
            title: 'The spreadsheet was the symptom, not the system',
            quote: `"We knew the payroll was probably right. We just couldn't prove it from the data."`,
            body: "A 120-employee company running HR through twelve disconnected spreadsheets, WhatsApp threads, and personal Google Drive folders. The real problem wasn't the tools â€” it was that there was no data model. Attendance lived in chat screenshots. Approvals vanished with the person who sent them. Document versions were indistinguishable. The first insight: this wasn't a UI problem. It was a structural one.",
            pills: ['Root cause identified', 'No shared data model', 'Compliance blind spot']
        },
        {
            tag: 'Hypothesis Â· Month 2',
            title: 'Business rules encoded in the schema outlast any spreadsheet',
            body: "The core question: what are the actual entities in this business? Employee, Attendance, Leave, Payroll Run, Document, Approval â€” six entities, not twelve spreadsheets. Once you define what a 'Payroll Run' is (period, lock state, variance threshold, approval chain) and what a 'Document' is (owner, version, expiry, access role), all the chaos in WhatsApp threads resolves into proper workflow states. The hypothesis: model the controls correctly and most of the compliance risk disappears without building anything clever.",
            pills: ['6 core entities defined', 'Relationships mapped', 'Hypothesis formed']
        },
        {
            tag: 'Design decision Â· Month 2',
            title: 'Build the controls first. UI second.',
            body: 'Audit logs and period locking were architected before the first interface component was drawn. Three deliberate exclusions kept the scope clean: no recruitment module, no accounting integration, no benefits marketplace. Every design decision was tested against one constraint â€” can a compliance auditor reconstruct exactly what happened and who approved it? If yes, ship. If no, redesign.',
            pills: ['Audit-first architecture', 'Period locking', 'Deliberate exclusions']
        },
        {
            tag: 'Validation Â· Month 3',
            title: 'Payroll cycle dropped from 3 days to 2 hours.',
            body: "The clearest validation was time. Before: a payroll computation spread across 12 spreadsheets took three working days. After: the structured payroll engine â€” pulling directly from the attendance module â€” produced the same output in under two hours, with an automatic variance alert if any department's figure deviated more than 15% from the prior period. The variance guard alone caught two data-entry errors in the first run.",
            pills: ['3 days â†’ 2 hours', 'Variance guard live', '2 errors caught on first run']
        },
        {
            tag: 'Surprise finding Â· Month 4',
            title: 'The audit log became the most-used feature.',
            body: "The audit log was built for compliance. What wasn't expected was how often HR used it for internal disputes. When an employee challenged their leave balance or a manager denied approving something they had approved, the append-only log ended the conversation in seconds. A feature built to satisfy auditors became the system's most trusted source of truth for everyday operations.",
            pills: ['Unexpected use case', 'Dispute resolution', 'Trust signal for staff']
        }
    ];

    const workflowWalkthroughs = [
        {
            id: 'leave',
            tab: 'Leave Request',
            title: 'Leave Request — Complete State Machine',
            steps: [
                {
                    type: 'state',
                    label: 'DRAFT',
                    tone: 'draft',
                    detail: 'Employee creates. Balance checked. Date overlap validated against locked periods.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Employee submits — system validates balance and period availability'
                },
                {
                    type: 'state',
                    label: 'SUBMITTED',
                    tone: 'pending',
                    detail: 'Enters workflow queue. Tier 1 (Team Lead) notified. 48-hour SLA countdown starts.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Team Lead acts — OR 48h passes → auto-escalates'
                },
                {
                    type: 'state',
                    label: 'UNDER REVIEW',
                    tone: 'review',
                    detail: 'Tier 2 (HR Manager) review. Validates policy eligibility and team coverage.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Approved → balance deducted, payroll notified | Rejected → reason mandatory'
                },
                {
                    type: 'state',
                    label: 'APPROVED',
                    tone: 'approved',
                    detail: 'Balance updated. Calendar flagged. Payroll engine notified for period impact.'
                },
                {
                    type: 'state',
                    label: 'REJECTED',
                    tone: 'rejected',
                    detail: 'Reason recorded immutably. Balance unchanged. Employee notified. Resubmission allowed.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Approved leave → applied in next payroll run'
                },
                {
                    type: 'state',
                    label: 'IN PAYROLL',
                    tone: 'locked',
                    detail: 'Leave days reflected in payroll computation. Unpaid leave creates deduction entry.'
                }
            ],
            rules: [
                {
                    tone: 'good',
                    typeLabel: 'Auto-Approve Rule',
                    title: 'Casual ≤1 day + prior month attendance ≥95%',
                    body: 'Bypasses Team Lead tier. Routes direct to HR stamp. Full audit entry still written — the shortcut is operational, not a compliance bypass.'
                },
                {
                    tone: 'alert',
                    typeLabel: 'Escalation Rule',
                    title: '48-hour inaction triggers automatic escalation',
                    body: 'The original approver receives a missed-action notification. Request routes to the next tier. This eliminates the "lost in inbox" failure structurally — not by policy, by system design.'
                },
                {
                    tone: 'risk',
                    typeLabel: 'Conflict Detection',
                    title: 'Submission blocked if preconditions fail',
                    body: 'Three hard blocks: insufficient balance, overlap with locked payroll period, leave type ineligible for contract type. These are not warnings — submission is structurally impossible when any condition fails.'
                },
                {
                    tone: 'good',
                    typeLabel: 'Payroll Integration',
                    title: 'Approval writes directly to payroll engine',
                    body: 'HR Manager never manually communicates leave status to payroll. The approved leave event triggers a payroll input flag automatically. The payroll run reads this flag during computation.'
                }
            ]
        },
        {
            id: 'payroll',
            tab: 'Payroll Run',
            title: 'Payroll Run — Complete State Machine',
            steps: [
                {
                    type: 'state',
                    label: 'INITIATED',
                    tone: 'draft',
                    detail: 'HR starts run. System validates: attendance finalized, no open leave, prior period locked.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Validation passes — computation begins per employee'
                },
                {
                    type: 'state',
                    label: 'COMPUTING',
                    tone: 'pending',
                    detail: 'Gross = base + overtime + allowances. Deductions = tax + PF + unpaid leave + penalties. Net computed.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Computation complete — variance check runs (>15% flags records)'
                },
                {
                    type: 'state',
                    label: 'PENDING APPROVAL',
                    tone: 'review',
                    detail: 'HR reviews totals. Flagged variances require Finance clearance before MD approval.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ HR clears flags → MD sign-off requested'
                },
                {
                    type: 'state',
                    label: 'APPROVED',
                    tone: 'approved',
                    detail: 'MD approves. Payslips generated per employee with entity branding.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ MD approval → period permanently locked'
                },
                {
                    type: 'state',
                    label: 'LOCKED',
                    tone: 'locked',
                    detail: 'Period locked at DB level. No edits possible. Post-lock corrections create Adjustment entries only.'
                }
            ],
            rules: [
                {
                    tone: 'risk',
                    typeLabel: 'Variance Alert — Mandatory',
                    title: '>15% net pay deviation vs prior month blocks progression',
                    body: 'Finance review is not optional. Run cannot proceed to MD while flagged records are uncleared. Catches errors without blocking legitimate changes (new hires, revisions).'
                },
                {
                    tone: 'risk',
                    typeLabel: 'Period Lock — Permanent',
                    title: 'Locked period cannot be modified — only adjustment entries',
                    body: 'Post-lock corrections create a new Adjustment PayrollEntry referencing the original run. The error cannot be silently fixed. Both the error and the correction are permanently in the audit log.'
                },
                {
                    tone: 'alert',
                    typeLabel: 'Exception: Expired Document',
                    title: 'Expired ID document blocks payslip release for that employee',
                    body: "Payroll run continues for all other employees. The specific employee's payslip is held in PENDING state until the document exception is resolved. This prevents one bad record from delaying the entire payroll cycle."
                }
            ]
        },
        {
            id: 'doc',
            tab: 'Document Control',
            title: 'Document — Complete Lifecycle State Machine',
            steps: [
                {
                    type: 'state',
                    label: 'DRAFT',
                    tone: 'draft',
                    detail: 'HR creates from template or blank. Version 1. Employee linked. Type defined.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ HR submits for MD sign-off — version number locked'
                },
                {
                    type: 'state',
                    label: 'PENDING SIGN-OFF',
                    tone: 'review',
                    detail: 'MD reviews. Revisions increment version. Every version preserved — no overwrite.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ MD signs → document issued'
                },
                {
                    type: 'state',
                    label: 'ISSUED',
                    tone: 'issued',
                    detail: 'Available in employee self-service. Physical copy tracked in custody register.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Employee signs / acknowledges'
                },
                {
                    type: 'state',
                    label: 'SIGNED',
                    tone: 'approved',
                    detail: 'Acknowledgement recorded with timestamp. Document legally executed.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ On expiry date → status automatically transitions'
                },
                {
                    type: 'state',
                    label: 'EXPIRED',
                    tone: 'expired',
                    detail: 'Alert generated. Renewal workflow triggered. Prior signed version preserved in archive.'
                },
                {
                    type: 'state',
                    label: 'ARCHIVED',
                    tone: 'archived',
                    detail: 'Still retrievable. Still attached to employee record. Never deleted. 5-year minimum retention.'
                }
            ],
            rules: [
                {
                    tone: 'good',
                    typeLabel: 'Version Control',
                    title: 'Every save is a new version — no overwrite',
                    body: '"FINAL_v3_ACTUAL.docx" is structurally impossible. The system never allows overwrite. Prior versions are always accessible with their author and timestamp.'
                },
                {
                    tone: 'risk',
                    typeLabel: 'Expiry Blocking',
                    title: 'Expired ID document blocks payslip release',
                    body: 'Document expiry is not cosmetic. An employee with an expired mandatory document has their payslip held in PENDING state until resolution. The block is enforced at payroll run time.'
                },
                {
                    tone: 'risk',
                    typeLabel: 'Exit Clearance',
                    title: 'Employee cannot exit with documents in Issued status',
                    body: 'Exit clearance checklist is system-generated. Every document in Issued status appears automatically. Completion of exit is blocked until all items are returned or marked as waived with a reason.'
                }
            ]
        },
        {
            id: 'att',
            tab: 'Attendance Exception',
            title: 'Attendance Exception — State Machine',
            steps: [
                {
                    type: 'state',
                    label: 'OPEN',
                    tone: 'exception',
                    detail: 'System auto-creates exception for missed punch, late beyond threshold, or invalid span.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Employee submits correction reason (or Team Lead initiates)'
                },
                {
                    type: 'state',
                    label: 'SUBMITTED',
                    tone: 'pending',
                    detail: 'Correction reason attached. Team Lead and HR notified for review.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Team Lead reviews correction reason'
                },
                {
                    type: 'state',
                    label: 'REVIEWED',
                    tone: 'review',
                    detail: 'Team Lead recommends approval or rejection with comments.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ HR finalizes — attendance status updates, payroll impact recalculates'
                },
                {
                    type: 'state',
                    label: 'RESOLVED',
                    tone: 'approved',
                    detail: 'Corrected attendance record created. Original exception preserved. Payroll impact updated if period open.'
                },
                {
                    type: 'state',
                    label: 'REJECTED',
                    tone: 'rejected',
                    detail: 'Original anomalous record stands. Absent/unpaid treatment applied. Audit entry written.'
                }
            ],
            rules: [
                {
                    tone: 'alert',
                    typeLabel: 'Auto-Exception Creation',
                    title: 'System creates exceptions automatically — no manual reporting',
                    body: 'Missed clock-out, late arrival beyond threshold, and negative/invalid time spans create AttendanceException records automatically at end of shift. No HR manual intervention required to catch anomalies.'
                },
                {
                    tone: 'risk',
                    typeLabel: 'Payroll Impact Rule',
                    title: 'Unresolved exception = absent treatment in payroll',
                    body: 'If an exception is still OPEN when the payroll period closes, the system treats that day as absent. The correction process must happen before the payroll period locks. This creates urgency without requiring manual tracking.'
                }
            ]
        }
    ];

    const complianceDesignCards = [
        {
            icon: '📋',
            title: 'Record Keeping',
            checks: [
                'Service records retained 5+ years post-exit — soft-delete only, no physical removal ever at any role level',
                'NID, DOB, blood group stored as verified fields — edits require HR Manager role and auto-write immutable audit entry',
                'Every salary revision records: effective date, prior amount, new amount, approved-by, and reason — full trail for any inspection',
                'Employment type tracked explicitly: Permanent / Probation / MTO / Contractual — each triggers different entitlement calculation rules'
            ]
        },
        {
            icon: '⚖️',
            title: 'Payroll & Leave Compliance',
            checks: [
                'Annual leave entitlement encoded per employment type and location — factory vs commercial rates applied at computation time',
                'Payroll period locking: locked months cannot be edited by anyone — corrections create adjustment entries with full approval chain',
                'Post-lock adjustments reference original run ID, reason, and actor — the error and correction both permanently in audit log',
                'Leave balance deducted only on approval, not on submission — pending requests do not prematurely reduce available balance'
            ]
        },
        {
            icon: '🔒',
            title: 'Data Protection',
            checks: [
                'NID, personal mobile, bank details masked in list views — full values only visible to HR Manager and above at API query level',
                'Photo and personal email optional with explicit consent flag — system enforces consent is set before data can be stored',
                'Data export requires HR Manager minimum — export events logged with actor, timestamp, data scope, and format',
                'Session tokens carry role claims — role checked at API query level, not at UI rendering level'
            ]
        },
        {
            icon: '🕵️',
            title: 'Audit Trail Architecture',
            checks: [
                'Every write operation writes to audit_log before main transaction commits — if audit write fails, main write rolls back atomically',
                'Full before/after state stored as JSONB — not just "field X changed" but complete record snapshot at that moment in time',
                'Append-only at database level — no UPDATE or DELETE permission on audit_log table, including for Super Admin role',
                'Audit entries exportable as structured CSV for labor authority submission — filterable by date, actor, entity, and event type'
            ]
        }
    ];

    const auditLogEntries = [
        {
            timestamp: '2025-11-01 09:02',
            event: 'PAYROLL_LOCK',
            tone: 'lock',
            actor: 'N. Sultana · HR',
            change: 'Nov 2025 · 15 employees · Gross BDT 1,104,800 · Period locked pending MD approval'
        },
        {
            timestamp: '2025-10-30 14:33',
            event: 'LEAVE_APPROVED',
            tone: 'approve',
            actor: 'M.I. Serwany',
            change: 'LR-089 · T.J. Parvez · Sick leave 3 days · Balance 8→5 · Payroll flag written'
        },
        {
            timestamp: '2025-10-28 11:15',
            event: 'SALARY_UPDATED',
            tone: 'update',
            actor: 'N. Sultana · HR',
            change: 'EMP-047 · gross_salary 8,000→12,000 BDT · Reason: post-probation · Effective Nov 2025'
        },
        {
            timestamp: '2025-10-15 08:55',
            event: 'EMP_CREATED',
            tone: 'create',
            actor: 'N. Sultana · HR',
            change: 'EMP-047 · A.J. Yeana · Entity: Operations · Type: MTO · Dept: People & HR'
        },
        {
            timestamp: '2025-10-10 10:22',
            event: 'DOC_EXPIRED',
            tone: 'expire',
            actor: 'System',
            change: 'DOC-031 · Sabbir Hassan · ID Document expired · Payslip hold flag activated · Renewal alert sent'
        },
        {
            timestamp: '2025-10-01 14:40',
            event: 'PAYROLL_LOCKED',
            tone: 'lock',
            actor: 'Tanvir Morshed · MD',
            change: 'Oct 2025 · 13 employees · Gross BDT 1,067,480 · MD signed off · Period permanently locked'
        }
    ];

    const problemStatementCards = [
        {
            label: 'PAIN — 01',
            title: 'Payroll preparation was a 3-day manual ordeal',
            desc: 'Twelve disconnected spreadsheets, each with different formula logic, maintained by different people. Cross-validating attendance with payroll required reading WhatsApp conversation history. A single mid-month salary change required manual updates across multiple files with no confirmation it was complete.',
            tag: '3 days \u2192 72 staff-hours lost monthly'
        },
        {
            label: 'PAIN — 02',
            title: 'Attendance lived in a WhatsApp group — unverifiable',
            desc: 'Daily attendance submitted as text messages. No timestamp integrity, no verification mechanism, no way to detect missed punches or late arrivals systematically. Leave balances were approximated from memory. A dispute about attendance three weeks ago was structurally impossible to resolve.',
            tag: 'Leave disputes unresolvable in ~40% of cases'
        },
        {
            label: 'PAIN — 03',
            title: 'HR documents stored in personal accounts',
            desc: 'Employment contracts, offer letters, and NID copies lived in personal Google Drive folders — not company-owned. When two employees left within three months, their contract files left with them. No version tracking. The "latest" file was whatever had most recently been renamed "FINAL." A compliance audit would have been a catastrophe.',
            tag: 'Doc recovery rate post-exit \u2192 ~60%'
        },
        {
            label: 'PAIN — 04',
            title: 'Approval decisions made on WhatsApp — no record',
            desc: 'Leave approvals, salary revisions, document issuances — all communicated via chat message. No formal record, no timestamp integrity, no way to reconstruct the decision chain six months later. The system literally could not answer: who approved this, when, and under what conditions?',
            tag: 'Approval audit trail recoverable \u2192 0%'
        },
        {
            label: 'PAIN — 05',
            title: 'Cross-department reporting was structurally impossible',
            desc: "Getting total headcount, payroll cost, or leave utilization across departments meant manually aggregating files with inconsistent structures. This report was never produced. Leadership made staffing decisions with no data. Finance couldn't predict monthly payroll cost with any precision.",
            tag: 'Consolidated HR report \u2192 never produced'
        },
        {
            label: 'PAIN — 06',
            title: 'Equipment custody invisible — no exit clearance',
            desc: 'Laptops, SIM cards, and mobile phones issued to employees and then forgotten. No custody register, no return workflow, no exit clearance checklist. Devices discovered missing only at the next procurement cycle. No mechanism for enforcing document or asset return on departure.',
            tag: 'Asset recovery rate on exit \u2192 below 70%'
        }
    ];

    const preSystemInfrastructure = [
        { label: '\u00D7 12 Google Sheets', tone: 'risk' },
        { label: '\u00D7 3 WhatsApp Groups', tone: 'risk' },
        { label: '\u00D7 4 Personal Drives', tone: 'risk' },
        { label: '0 Approval Records', tone: 'risk' },
        { label: '0 Audit Trail', tone: 'risk' },
        { label: 'Paper NID Copies', tone: 'warn' },
        { label: 'Email Thread Approvals', tone: 'warn' },
        { label: 'Unversioned Contracts', tone: 'warn' },
        { label: 'No Leave Balances', tone: 'warn' },
        { label: 'Memory-based Decisions', tone: 'neutral' },
        { label: 'No Cross-dept View', tone: 'neutral' },
        { label: 'No Exit Clearance', tone: 'neutral' }
    ];

    const researchPersonas = [
        {
            tabRole: 'Executive Leadership',
            tabName: 'Managing Director',
            tabDept: 'Strategic oversight · All departments',
            role: 'Executive Leadership · Strategic Oversight',
            name: 'Managing Director',
            meta: '8 years tenure · Final approver · Cross-department visibility',
            quote: `"I need total payroll cost across all departments in one view — not four files I have to add up. And when I ask how a decision was made, I should get a timestamped record, not a WhatsApp screenshot."`,
            needs: [
                'Consolidated cross-department analytics — headcount, payroll cost, leave utilization in one dashboard',
                'Final approval authority embedded in workflow chain — no parallel approval tracks',
                'Complete audit trail — every decision reconstructable with actor, timestamp, rationale'
            ]
        },
        {
            tabRole: 'HR Operations',
            tabName: 'Sr. HR Executive',
            tabDept: 'People ops · Payroll prep',
            role: 'HR Operations · Head Office',
            name: 'Sr. HR Executive',
            meta: 'Manages records, payroll prep, documentation for all staff',
            quote: `"Payroll takes three full days — opening twelve sheets, reading WhatsApp history for attendance, manually calculating deductions for each person. Every month. One missed punch can break the whole calculation chain."`,
            needs: [
                'Automated payroll run — system computes from attendance and contracts, HR reviews and approves',
                'Leave request management with real-time balance tracking — no memory-based decisions',
                'Document creation with versioning — generate letters from templates, track issuance and signatures'
            ]
        },
        {
            tabRole: 'Department Manager',
            tabName: 'Operations Manager',
            tabDept: 'Team management · 12 reports',
            role: 'Department Manager · Operations',
            name: 'Operations Manager',
            meta: '12 direct reports · Responsible for team attendance and leave decisions',
            quote: `"Someone requests leave on WhatsApp, I reply 'ok', and then nothing happens — HR doesn't know, payroll doesn't know. Three weeks later HR asks me and I've forgotten the conversation."`,
            needs: [
                'Team-scoped view — attendance and leave for my direct reports only',
                'In-app approval with automatic cascade to HR and payroll — no manual communication',
                'Mobile-ready — approve requests from phone, no desktop or special software needed'
            ]
        },
        {
            tabRole: 'Field / Factory Staff',
            tabName: 'Operations Employee',
            tabDept: 'Frontline · Mobile-primary user',
            role: 'Field Operations · Factory & Delivery',
            name: 'Operations Employee',
            meta: 'Permanent · Factory or field location · Smartphone-primary',
            quote: `"I don't know how many leave days I have left. My manager guesses. I find out leave was unpaid only when I see the payslip — nobody told me before. I don't even know what the deductions mean."`,
            needs: [
                'Self-service leave balance — real-time balance per leave type without asking anyone',
                'Itemized payslip with every line explained — understand every deduction before it happens',
                'Browser-based on any smartphone — no app install, fast on slow mobile connections'
            ]
        }
    ];

    const researchFindings = [
        {
            number: '01',
            title: 'Single source of truth was the unanimous demand',
            body: 'Every role cited data fragmentation as their primary pain. The architecture principle — one canonical employee record that all modules derive from — came directly from this convergence. No module was designed until the entity relationships were locked.'
        },
        {
            number: '02',
            title: 'Compliance controls were the actual business case',
            body: 'Leadership agreed to fund the system after calculating payroll ROI. But the compliance architecture — audit log, period locking, document versioning — was cited as the reason they would trust the system. Controls are not features; they are the foundation of credibility.'
        },
        {
            number: '03',
            title: 'Mobile-first was a structural requirement, not a preference',
            body: '40% of the workforce uses smartphones exclusively. A system requiring desktop access fails before deployment for nearly half its users. The progressive web architecture and mobile layout were specified before any screen was designed.'
        }
    ];
    const strategyCards = [
        {
            number: '1',
            title: 'Why "Lite" — Deliberate Exclusions',
            body: 'ERP-Lite v1 excludes recruitment/ATS, full accounting ledger, benefits marketplace, multi-country tax engine, and drag-and-drop workflow builder. These are excluded not because they are unimportant, but because including them would require enterprise infrastructure to operate and would dilute the credibility of the core operations system.',
            note: '→ The scope boundary creates the value proposition. "Lite but complete" beats "everything but unreliable."'
        },
        {
            number: '2',
            title: 'Why 8 Modules — Connected, Not Isolated',
            body: 'The 8 modules were selected because they form a complete operations loop: Employee Records feed Attendance and Leave; Attendance and Leave feed Payroll; Payroll and Documents feed Approval Workflows; Approvals and all state changes feed the Audit Log; the Audit Log feeds Analytics. Removing any module breaks the loop.',
            note: '→ Module selection was determined by data dependencies, not by feature checklists.'
        },
        {
            number: '3',
            title: 'Why Controls Were Designed First',
            body: `The audit log, soft-delete policy, payroll period locking, and approval workflow architecture were specified before any UI was designed. This is not standard product development practice — it reflects a deliberate choice that a system handling people's money and employment records must be trustworthy before it is convenient.`,
            note: '→ Compliance infrastructure is not overhead. It is the reason stakeholders will trust the system with real data.'
        },
        {
            number: '4',
            title: 'Why Role-Based Access at API Level',
            body: 'Access control enforced at UI level is cosmetic — a hidden button can be revealed with developer tools. ERP-Lite enforces access at the API query level: an Employee role session requesting the payroll endpoint receives a 403, not empty data. The salary figure never travels across the network to an unauthorized session.',
            note: '→ The distinction between UI-level and API-level access control is the difference between appearance and security.'
        }
    ];

    const moduleArchitectureCards = [
        {
            number: 'MOD-01',
            icon: '👤',
            title: 'Employee Records',
            desc: 'Canonical profile, contract, reporting line, status history, equipment custody, linked documents. Source of truth for all modules.',
            badge: 'Core',
            tone: 'core'
        },
        {
            number: 'MOD-02',
            icon: '📆',
            title: 'Attendance & Time',
            desc: 'Clock-in/out logs, shift assignment, anomaly detection (missed punch, late, overtime), manual correction requests with approval flow.',
            badge: 'Core',
            tone: 'core'
        },
        {
            number: 'MOD-03',
            icon: '🏖️',
            title: 'Leave & Absence',
            desc: 'Multi-type leave with real-time balance tracking, request lifecycle, overlap detection, payroll impact flag on approval.',
            badge: 'Core',
            tone: 'core'
        },
        {
            number: 'MOD-04',
            icon: '💰',
            title: 'Payroll Engine',
            desc: 'Pay-period batch computation, earnings + deductions pipeline, period locking, payslip generation, post-lock adjustment entries only.',
            badge: 'Core',
            tone: 'core'
        },
        {
            number: 'MOD-05',
            icon: '📄',
            title: 'Documentation',
            desc: 'Versioned document library, status pipeline (Draft→Issued→Signed→Archived), expiry alerts, acknowledgement tracking, custody register.',
            badge: 'Control',
            tone: 'control'
        },
        {
            number: 'MOD-06',
            icon: '✅',
            title: 'Approval Workflows',
            desc: 'Sequential approval steps with 48h escalation, rejection with mandatory reason, reassignment, full step-by-step decision history per request.',
            badge: 'Control',
            tone: 'control'
        },
        {
            number: 'MOD-07',
            icon: '📊',
            title: 'Analytics & Reporting',
            desc: 'Headcount, payroll cost by department, leave utilization, attendance compliance rate, document expiry risk, pending approval SLA count.',
            badge: 'Insight',
            tone: 'insight'
        },
        {
            number: 'MOD-08',
            icon: '🔍',
            title: 'Audit Log',
            desc: 'Immutable append-only event stream. Who changed what, to which record, with full before/after state as JSONB. Filterable, exportable.',
            badge: 'Control',
            tone: 'control'
        }
    ];

    const moduleConnections = [
        { label: 'Employee Records', active: true },
        { label: 'Attendance & Leave', active: false },
        { label: 'Document Vault', active: false },
        { label: 'Payroll Inputs', active: true },
        { label: 'Compliance Checks', active: false },
        { label: 'Payroll Run', active: true },
        { label: 'Payslips & Reports', active: false },
        { label: 'Audit Log', active: true }
    ];

    const liveSystemScenarios = [
        {
            label: 'Guided Scenario 1',
            name: 'Leave Approval Workflow',
            desc: 'Switch to Employee → submit leave → switch to Team Lead → approve it'
        },
        {
            label: 'Guided Scenario 2',
            name: 'Run Payroll for November',
            desc: 'Switch to HR Manager → go to Payroll → run the computation sequence'
        },
        {
            label: 'Guided Scenario 3',
            name: 'Document Expiry Review',
            desc: 'Switch to HR Manager → go to Documentation → review 3 expiring documents'
        }
    ];

    const activeWorkflowData =
        workflowWalkthroughs.find((workflow) => workflow.id === activeWorkflow) ?? workflowWalkthroughs[0];

    const dataFlowRows = [
        {
            layer: 'Input',
            cells: [
                {
                    title: 'Onboarding Data',
                    body: 'Name, NID, DOB, contract type, salary grade, department, reporting line, blood group, emergency contact',
                    tone: 'brand'
                },
                {
                    title: 'Daily Clock Record',
                    body: 'Timestamp, location flag, shift assignment, manager verify trigger'
                },
                {
                    title: 'Leave Request',
                    body: 'Employee ID, type, date range, reason, day count'
                },
                {
                    title: 'Period Definition',
                    body: 'Month, entity, run type — full or corrective'
                }
            ]
        },
        {
            layer: 'Compute',
            cells: [
                {
                    title: 'Record Validation',
                    body: 'NID uniqueness, department FK valid, reporting chain exists, employment type recognized'
                },
                {
                    title: 'Hours Calculation',
                    body: 'worked_hours = clock_out − clock_in. Anomaly flags: late, missed punch, overtime, negative span'
                },
                {
                    title: 'Balance Check',
                    body: 'Requested ≤ available? Overlaps locked period? Leave type eligible for contract?'
                },
                {
                    title: 'Deduction Pipeline',
                    body: 'gross = base + OT + allowances. deductions = tax + PF + unpaid_leave + penalties. net = gross − deductions',
                    tone: 'warn'
                }
            ]
        },
        {
            layer: 'Output',
            cells: [
                {
                    title: 'Employee Profile',
                    body: 'Fed to all modules via FK. Document templates, payslip headers, org chart, approval chains'
                },
                {
                    title: 'Attendance Score',
                    body: 'compliance_rate = present_days ÷ working_days. Monthly summary for HR. Anomaly list flagged.'
                },
                {
                    title: 'Payroll Input Flag',
                    body: 'Approved leave → payroll engine notified. Unpaid leave → deduction entry created automatically.'
                },
                {
                    title: 'Locked Payslip',
                    body: 'Itemized PDF per employee. Period locked. Run entry written to audit log. Finance notified.'
                }
            ]
        }
    ];

    const schemaEntities = [
        {
            name: 'employees',
            tone: 'core',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['employee_code', 'varchar'],
                ['department_id', 'uuid FK', 'fk'],
                ['employment_type', 'enum'],
                ['gross_salary', 'decimal'],
                ['status', 'enum']
            ]
        },
        {
            name: 'attendance_records',
            tone: 'core',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['employee_id', 'uuid FK', 'fk'],
                ['date', 'date'],
                ['status', 'enum'],
                ['late_minutes', 'integer']
            ]
        },
        {
            name: 'leave_requests',
            tone: 'core',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['employee_id', 'uuid FK', 'fk'],
                ['leave_type', 'enum'],
                ['status', 'enum'],
                ['approved_by', 'uuid FK', 'fk'],
                ['days_count', 'decimal']
            ]
        },
        {
            name: 'payroll_runs',
            tone: 'reference',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['period_month', 'date'],
                ['is_locked', 'boolean'],
                ['total_gross', 'decimal'],
                ['approved_by', 'uuid FK', 'fk']
            ]
        },
        {
            name: 'audit_log',
            tone: 'control',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['actor_id', 'uuid FK', 'fk'],
                ['event_type', 'enum'],
                ['before_state', 'jsonb'],
                ['after_state', 'jsonb']
            ]
        },
        {
            name: 'documents',
            tone: 'control',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['employee_id', 'uuid FK', 'fk'],
                ['doc_type', 'enum'],
                ['status', 'enum'],
                ['expiry_date', 'date']
            ]
        },
        {
            name: 'departments',
            tone: 'reference',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['name', 'varchar'],
                ['head_id', 'uuid FK', 'fk'],
                ['cost_center', 'varchar']
            ]
        }
    ];

    const results = [
        {
            value: '92%',
            unit: 'Payroll Processing Reduction',
            note: '3-day cycle â†’ 2-hour structured run'
        },
        {
            value: '0',
            unit: 'Compliance Blind Spots',
            note: 'Append-only log covers every state transition'
        },
        {
            value: '8',
            unit: 'Integrated Modules',
            note: 'Records, Attendance, Leave, Payroll, Docs, Approvals, Analytics, Audit'
        },
        {
            value: '4s',
            unit: 'Document Retrieval',
            note: 'Previously 15+ minutes per request'
        }
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = Array.from(container.querySelectorAll<HTMLElement>('.fade'));

        const hide = (el: HTMLElement) => {
            el.style.setProperty('opacity', '0', 'important');
            el.style.setProperty('transform', 'translateY(28px)', 'important');
            el.style.setProperty('transition', 'opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)', 'important');
            el.style.setProperty('will-change', 'opacity, transform', 'important');
            if (el.classList.contains('d1')) el.style.setProperty('transition-delay', '0.12s', 'important');
            else if (el.classList.contains('d2')) el.style.setProperty('transition-delay', '0.24s', 'important');
            else if (el.classList.contains('d3')) el.style.setProperty('transition-delay', '0.36s', 'important');
            else if (el.classList.contains('d4')) el.style.setProperty('transition-delay', '0.48s', 'important');
        };
        const reveal = (el: HTMLElement) => {
            el.style.setProperty('opacity', '1', 'important');
            el.style.setProperty('transform', 'none', 'important');
            el.classList.add('in');
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;
                    reveal(target);

                    target.querySelectorAll('.metric-ring-fill').forEach(ring => {
                        const val = ring.getAttribute('data-val');
                        if (val) (ring as HTMLElement).style.strokeDasharray = `${val} 314`;
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        elements.forEach(el => observer.observe(el));

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                elements.forEach(el => {
                    if (!el.classList.contains('in')) {
                        hide(el);
                    }
                });
            });
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="fmcg-case-study" ref={containerRef}>
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
                .fmcg-case-study .lead {
                    font-size: 17px;
                    color: var(--ink2);
                    line-height: 1.82;
                    font-weight: 300;
                    margin-top: 0;
                    max-width: 540px;
                    margin-bottom: 40px;
                }

                .fmcg-case-study #hero {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    padding: 120px 0 80px;
                    position: relative;
                    overflow: hidden;
                }
                .fmcg-case-study #hero.wfvwp-hero-section {
                    --wfvwp-section-space-sm: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem);
                    --wfvwp-space-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    --wfvwp-space-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    --wfvwp-space-lg: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    --wfvwp-eyebrow-size: clamp(1rem, calc(0.9285714286rem + 0.3571428571vw), 1.25rem);
                    --wfvwp-title-size: clamp(2.75rem, calc(2.1071428571rem + 3.2142857143vw), 5rem);
                    --wfvwp-body-size: clamp(1.1rem, calc(1.0571428571rem + 0.2142857143vw), 1.25rem);
                    --wfvwp-hero-top-space: clamp(6.5rem, calc(5.9285714286rem + 2.8571428571vw), 8.5rem);
                    min-height: auto;
                    display: block;
                    padding: var(--wfvwp-hero-top-space) 0 var(--wfvwp-section-space-sm);
                    background: #ffffff;
                    position: relative;
                    overflow: hidden;
                }
                .fmcg-case-study .wfvwp-hero__container {
                    position: relative;
                    z-index: 1;
                }
                .fmcg-case-study .wfvwp-hero__row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    margin-left: 0;
                    margin-right: 0;
                }
                .fmcg-case-study .wfvwp-hero__copy-col {
                    flex: 0 0 83.3333%;
                    max-width: 83.3333%;
                    padding-left: 0;
                    padding-right: 0;
                    display: flex;
                }
                .fmcg-case-study .wfvwp-hero__copy {
                    max-width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    width: 100%;
                }
                .fmcg-case-study .wfvwp-hero__spacer {
                    width: 100%;
                    height: var(--wfvwp-section-space-sm);
                }
                .fmcg-case-study .wfvwp-hero__eyebrow-wrap,
                .fmcg-case-study .wfvwp-hero__heading-wrap,
                .fmcg-case-study .wfvwp-hero__body-wrap,
                .fmcg-case-study .wfvwp-hero__button-wrap,
                .fmcg-case-study .wfvwp-hero__media-block {
                    opacity: 0;
                    transform: translate3d(0, 24px, 0);
                    transition: opacity 0.82s cubic-bezier(0.16, 1, 0.3, 1), transform 0.82s cubic-bezier(0.16, 1, 0.3, 1);
                    will-change: opacity, transform;
                }
                .fmcg-case-study .wfvwp-hero__heading-wrap {
                    transform: translate3d(0, 32px, 0);
                    transition-duration: 0.92s;
                }
                .fmcg-case-study .wfvwp-hero__media-block {
                    transform: translate3d(0, 40px, 0) scale(0.985);
                    transition-duration: 1s;
                    transform-origin: 50% 50%;
                }
                .fmcg-case-study .wfvwp-hero-section.is-mounted .wfvwp-hero__eyebrow-wrap,
                .fmcg-case-study .wfvwp-hero-section.is-mounted .wfvwp-hero__heading-wrap,
                .fmcg-case-study .wfvwp-hero-section.is-mounted .wfvwp-hero__body-wrap,
                .fmcg-case-study .wfvwp-hero-section.is-mounted .wfvwp-hero__button-wrap,
                .fmcg-case-study .wfvwp-hero-section.is-mounted .wfvwp-hero__media-block {
                    opacity: 1;
                    transform: none;
                }
                .fmcg-case-study .wfvwp-hero-section.is-mounted .wfvwp-hero__eyebrow-wrap { transition-delay: 0.06s; }
                .fmcg-case-study .wfvwp-hero-section.is-mounted .wfvwp-hero__heading-wrap { transition-delay: 0.12s; }
                .fmcg-case-study .wfvwp-hero-section.is-mounted .wfvwp-hero__body-wrap { transition-delay: 0.2s; }
                .fmcg-case-study .wfvwp-hero-section.is-mounted .wfvwp-hero__button-wrap { transition-delay: 0.28s; }
                .fmcg-case-study .wfvwp-hero-section.is-mounted .wfvwp-hero__media-block { transition-delay: 0.22s; }
                .fmcg-case-study .wfvwp-hero__eyebrow-wrap {
                    align-self: flex-start;
                    display: inline-block;
                }
                .fmcg-case-study .wfvwp-hero__eyebrow {
                    margin: 0 0 var(--wfvwp-space-sm);
                    color: #5a5a5a;
                    font-family: var(--sans);
                    font-size: var(--wfvwp-eyebrow-size);
                    line-height: 1.4;
                    font-weight: 600;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-hero__heading-wrap {
                    margin-bottom: 0;
                }
                .fmcg-case-study .wfvwp-hero__heading {
                    margin: 0 0 var(--wfvwp-space-md);
                    max-width: none;
                    width: 100%;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: var(--wfvwp-title-size);
                    line-height: 1.04;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    text-wrap: balance;
                }
                .fmcg-case-study .wfvwp-hero__body-wrap {
                    max-width: 40ch;
                    margin-bottom: var(--wfvwp-space-sm);
                }
                .fmcg-case-study .wfvwp-hero__body {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: var(--wfvwp-body-size);
                    line-height: 1.5;
                    font-weight: 500;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-hero__button-wrap {
                    align-self: flex-start;
                }
                .fmcg-case-study .wfvwp-hero__button {
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
                .fmcg-case-study .wfvwp-hero__button:hover {
                    background: #146ef5;
                    transform: none;
                }
                .fmcg-case-study .wfvwp-hero__button-text {
                    pointer-events: none;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-hero__button-link {
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
                .fmcg-case-study .wfvwp-hero__button-link:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .wfvwp-hero__sr-only {
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
                .fmcg-case-study .wfvwp-hero__media-block {
                    position: relative;
                    width: 100%;
                    margin-top: 0;
                }
                .fmcg-case-study .wfvwp-hero__card {
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
                .fmcg-case-study .wfvwp-hero__glass-layer {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    overflow: hidden;
                    pointer-events: none;
                }
                .fmcg-case-study .wfvwp-hero__glass-fallback {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(circle at 32% 36%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 28%),
                        linear-gradient(120deg, #071225 0%, #133c87 34%, #0b2f72 69%, #04122a 100%);
                    transition: opacity 0.25s ease;
                }
                .fmcg-case-study .wfvwp-hero__glass-layer.is-ready .wfvwp-hero__glass-fallback {
                    opacity: 0;
                }
                .fmcg-case-study .wfvwp-hero__glass-canvas {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    min-height: 100%;
                }
                .fmcg-case-study .wfvwp-hero__image-frame {
                    position: relative;
                    z-index: 1;
                    aspect-ratio: 16 / 9;
                    width: 100%;
                    overflow: hidden;
                    border-radius: inherit;
                }
                .fmcg-case-study .wfvwp-hero__image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .fmcg-case-study .wfvwp-overview-section {
                    --wfvwp-overview-gap-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-overview-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: flex-start;
                    row-gap: 1.5rem;
                }
                .fmcg-case-study .wfvwp-overview-col {
                    flex: 0 0 41.6667%;
                    max-width: 41.6667%;
                }
                .fmcg-case-study .wfvwp-overview-heading {
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
                .fmcg-case-study .wfvwp-overview-copy {
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(1.1rem, calc(1.0571428571rem + 0.2142857143vw), 1.25rem);
                    line-height: 1.5;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-overview-copy p {
                    margin: 0 0 var(--wfvwp-overview-gap-sm);
                }
                .fmcg-case-study .wfvwp-overview-copy p:last-child {
                    margin-bottom: 0;
                }
                .fmcg-case-study .wfvwp-cms-tabs-section {
                    --wfvwp-tabs-gap-main: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    --wfvwp-tabs-gap-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    --wfvwp-tabs-gap-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-cms-tabs {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    gap: var(--wfvwp-tabs-gap-main);
                }
                .fmcg-case-study .wfvwp-cms-tabs__spacer {
                    aspect-ratio: 8 / 9;
                    width: calc((100% - var(--wfvwp-tabs-gap-main)) / 2);
                    flex: none;
                }
                .fmcg-case-study .wfvwp-cms-tabs__menu {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: stretch;
                    gap: var(--wfvwp-tabs-gap-md);
                    max-width: 28.75rem;
                }
                .fmcg-case-study .wfvwp-cms-tabs__content {
                    display: flex;
                    flex-direction: column;
                }
                .fmcg-case-study .wfvwp-cms-tabs__title {
                    margin: 0 0 var(--wfvwp-tabs-gap-sm);
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(1.75rem, calc(1.5357142857rem + 1.0714285714vw), 2.5rem);
                    line-height: 1.2;
                    font-variation-settings: "wght" 700, "opsz" 100;
                    font-weight: 700;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .wfvwp-cms-tabs__intro {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-cms-tabs__list {
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    gap: var(--wfvwp-tabs-gap-md);
                }
                .fmcg-case-study .wfvwp-cms-tabs__item {
                    flex: 0 0 auto;
                }
                .fmcg-case-study .wfvwp-cms-tabs__link-wrapper {
                    display: flex;
                    flex-direction: column;
                    transition: opacity 0.3s ease;
                }
                .fmcg-case-study .wfvwp-cms-tabs__trigger {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
                .fmcg-case-study .wfvwp-cms-tabs__progress-track {
                    margin-bottom: var(--wfvwp-tabs-gap-md);
                    background: #f0f0f0;
                    width: 100%;
                    height: 2px;
                    overflow: hidden;
                }
                .fmcg-case-study .wfvwp-cms-tabs__progress-bar {
                    background: #080808;
                    width: 0%;
                    height: 100%;
                }
                .fmcg-case-study .wfvwp-cms-tabs__button {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    border: 0;
                    background: transparent;
                    cursor: pointer;
                }
                .fmcg-case-study .wfvwp-cms-tabs__button:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .wfvwp-cms-tabs__menu-text {
                    position: relative;
                    z-index: 1;
                    filter: saturate(100%);
                    transition: filter 0.2s ease;
                }
                .fmcg-case-study .wfvwp-cms-tabs__tab-title {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(1.125rem, calc(1.0892857143rem + 0.1785714286vw), 1.25rem);
                    line-height: 1.4;
                    font-weight: 600;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-cms-tabs__interactive-content {
                    width: 100%;
                    max-height: 0;
                    overflow: hidden;
                    opacity: 0;
                    transition: max-height 0.5s cubic-bezier(0.45, 0, 0.55, 1), opacity 0.1s linear;
                }
                .fmcg-case-study .wfvwp-cms-tabs__interactive-inner {
                    padding-top: var(--wfvwp-tabs-gap-sm);
                    overflow: hidden;
                }
                .fmcg-case-study .wfvwp-cms-tabs__body {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-cms-tabs__cta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--wfvwp-tabs-gap-sm);
                    margin-top: var(--wfvwp-tabs-gap-sm);
                }
                .fmcg-case-study .wfvwp-cms-tabs__cta-shell {
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
                .fmcg-case-study .wfvwp-cms-tabs__cta-text {
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
                .fmcg-case-study .wfvwp-cms-tabs__cta-icon {
                    position: relative;
                    width: 1.2em;
                    height: 1.2em;
                    flex: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 1;
                }
                .fmcg-case-study .wfvwp-cms-tabs__cta-icon-glyph {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
                .fmcg-case-study .wfvwp-cms-tabs__cta-icon-glyph.is-arrow-right {
                    transform: translateX(0);
                }
                .fmcg-case-study .wfvwp-cms-tabs__cta-link {
                    position: absolute;
                    inset: -0.125rem;
                    z-index: 1;
                    border-radius: 0.125rem;
                }
                .fmcg-case-study .wfvwp-cms-tabs__cta-link:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .wfvwp-cms-tabs__cta-shell:hover .wfvwp-cms-tabs__cta-text,
                .fmcg-case-study .wfvwp-cms-tabs__cta-shell:focus-within .wfvwp-cms-tabs__cta-text {
                    background-position: 100% 1.1em;
                    background-size: 0 0.08em;
                }
                .fmcg-case-study .wfvwp-cms-tabs__cta-shell:hover .wfvwp-cms-tabs__cta-icon-glyph.is-arrow-right,
                .fmcg-case-study .wfvwp-cms-tabs__cta-shell:focus-within .wfvwp-cms-tabs__cta-icon-glyph.is-arrow-right {
                    transform: translateX(6px);
                }
                .fmcg-case-study .wfvwp-cms-tabs__stage {
                    pointer-events: none;
                    position: absolute;
                    inset: 0 auto auto 0;
                    display: flex;
                    width: calc((100% - var(--wfvwp-tabs-gap-main)) / 2);
                    max-height: none;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: stretch;
                    opacity: 0;
                    transition: opacity 0.25s cubic-bezier(0.45, 0, 0.55, 1);
                    will-change: opacity;
                }
                .fmcg-case-study .wfvwp-cms-tabs__image-frame {
                    position: relative;
                    width: 100%;
                    max-height: 100%;
                    aspect-ratio: 8 / 9;
                    overflow: hidden;
                    background: #f0f0f0;
                }
                .fmcg-case-study .wfvwp-cms-tabs__image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 0% 0%;
                    display: block;
                    backface-visibility: hidden;
                }
                @keyframes wfvwpCmsTabsProgress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                @media (hover: hover) and (pointer: fine) and (min-width: 768px) {
                    .fmcg-case-study .wfvwp-cms-tabs__item .wfvwp-cms-tabs__link-wrapper:hover {
                        opacity: 0.8;
                    }
                }
                @media (min-width: 768px) {
                    .fmcg-case-study .wfvwp-cms-tabs__item .wfvwp-cms-tabs__link-wrapper {
                        opacity: 0.5;
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__item .wfvwp-cms-tabs__progress-bar {
                        opacity: 0.5;
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__item .wfvwp-cms-tabs__menu-text,
                    .fmcg-case-study .wfvwp-cms-tabs__item .wfvwp-cms-tabs__cta-shell {
                        filter: saturate(0%);
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__item.cc-active .wfvwp-cms-tabs__link-wrapper {
                        opacity: 1;
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__item.cc-active .wfvwp-cms-tabs__progress-bar {
                        opacity: 1;
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__item.cc-active .wfvwp-cms-tabs__menu-text,
                    .fmcg-case-study .wfvwp-cms-tabs__item.cc-active .wfvwp-cms-tabs__cta-shell {
                        filter: saturate(100%);
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__item.cc-active .wfvwp-cms-tabs__interactive-content {
                        max-height: 24rem;
                        overflow: visible;
                        opacity: 1;
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .fmcg-case-study .wfvwp-cms-tabs__link-wrapper,
                    .fmcg-case-study .wfvwp-cms-tabs__menu-text,
                    .fmcg-case-study .wfvwp-cms-tabs__interactive-content,
                    .fmcg-case-study .wfvwp-cms-tabs__stage,
                    .fmcg-case-study .wfvwp-cms-tabs__cta-shell,
                    .fmcg-case-study .wfvwp-cms-tabs__cta-icon-glyph {
                        transition-duration: 0s;
                    }
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .wfvwp-cms-tabs {
                        display: block;
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__spacer {
                        display: none;
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__menu {
                        max-width: none;
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__button {
                        display: none;
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__interactive-content {
                        max-height: none;
                        overflow: visible;
                        opacity: 1;
                    }
                    .fmcg-case-study .wfvwp-cms-tabs__stage {
                        position: relative;
                        inset: auto;
                        width: auto;
                        margin-top: var(--wfvwp-tabs-gap-md);
                        display: block;
                        z-index: auto !important;
                        opacity: 1;
                        pointer-events: auto;
                    }
                }
                .fmcg-case-study .wfvwp-why-section {
                    --wfvwp-why-gap-main: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    --wfvwp-why-gap-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    --wfvwp-why-gap-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    --wfvwp-why-sticky-offset: clamp(3rem, calc(1.2857142857rem + 8.5714285714vw), 9rem);
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-why__intro {
                    width: 50%;
                    max-width: 50%;
                    margin: 0 auto;
                    text-align: center;
                }
                .fmcg-case-study .wfvwp-why__heading {
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
                .fmcg-case-study .wfvwp-why__summary {
                    max-width: none;
                    margin: var(--wfvwp-why-gap-sm) auto 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-why__rows {
                    margin-top: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    position: relative;
                }
                .fmcg-case-study .wfvwp-why__row {
                    display: flex;
                    align-items: center;
                    min-height: 80vh;
                }
                .fmcg-case-study .wfvwp-why__copy-col {
                    position: relative;
                    z-index: 1;
                    width: 41.6667%;
                    max-width: 41.6667%;
                }
                .fmcg-case-study .wfvwp-why__row-title {
                    margin: 0 0 var(--wfvwp-why-gap-sm);
                    color: #080808;
                    font-family: var(--sans);
                    font-size: clamp(1.75rem, calc(1.5357142857rem + 1.0714285714vw), 2.5rem);
                    line-height: 1.2;
                    font-variation-settings: "wght" 700, "opsz" 100;
                    font-weight: 700 !important;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .wfvwp-why__copy {
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-why__copy p {
                    margin: 0 0 var(--wfvwp-why-gap-sm);
                }
                .fmcg-case-study .wfvwp-why__copy p:last-child {
                    margin-bottom: 0;
                }
                .fmcg-case-study .wfvwp-why__cta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--wfvwp-why-gap-sm);
                    margin-top: var(--wfvwp-why-gap-sm);
                }
                .fmcg-case-study .wfvwp-why__cta {
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
                .fmcg-case-study .wfvwp-why__cta:hover {
                    color: #363636;
                }
                .fmcg-case-study .wfvwp-why__cta:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .wfvwp-why__cta-text {
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
                .fmcg-case-study .wfvwp-why__cta:hover .wfvwp-why__cta-text,
                .fmcg-case-study .wfvwp-why__cta:focus-visible .wfvwp-why__cta-text {
                    background-position: 100% 1.1em;
                    background-size: 0 0.08em;
                }
                .fmcg-case-study .wfvwp-why__cta-arrow {
                    flex: none;
                    line-height: 1;
                    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
                .fmcg-case-study .wfvwp-why__cta:hover .wfvwp-why__cta-arrow {
                    transform: translateX(0.35em);
                }
                .fmcg-case-study .wfvwp-why__image-position {
                    pointer-events: none;
                    position: absolute;
                    left: 0%;
                    right: 0%;
                    top: calc(0rem - var(--wfvwp-why-sticky-offset));
                    bottom: calc(0rem - var(--wfvwp-why-sticky-offset));
                }
                .fmcg-case-study .wfvwp-why__image-track {
                    height: 100%;
                    max-width: 80rem;
                    margin-left: calc(var(--wfvwp-why-gap-main) / 2 * -1);
                    margin-right: calc(var(--wfvwp-why-gap-main) / 2 * -1);
                }
                .fmcg-case-study .wfvwp-why__image-sticky {
                    position: sticky;
                    top: 0;
                    display: flex;
                    min-height: 100svh;
                    padding-left: calc(var(--wfvwp-why-gap-main) / 2);
                    padding-right: calc(var(--wfvwp-why-gap-main) / 2);
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;
                }
                .fmcg-case-study .wfvwp-why__image-wrap {
                    z-index: 1;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;
                    width: calc((100% - var(--wfvwp-why-gap-main)) * (5 / 12));
                    max-height: min(50rem, calc(100vh - (var(--wfvwp-why-sticky-offset) * 2)));
                    aspect-ratio: 3 / 4;
                    margin-bottom: var(--wfvwp-why-gap-md);
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
                .fmcg-case-study .wfvwp-why__image-wrap:has(.wfvwp-why__image-link.w--current) {
                    clip-path: inset(0%);
                    width: calc((100% - var(--wfvwp-why-gap-main)) * (5 / 12));
                }
                .fmcg-case-study .wfvwp-why__image-frame {
                    position: relative;
                    width: 100%;
                    min-height: 100%;
                    aspect-ratio: 3 / 4;
                    border-radius: inherit;
                    overflow: hidden;
                }
                .fmcg-case-study .wfvwp-why__image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .fmcg-case-study .wfvwp-why__image-link {
                    display: none;
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                    background: transparent;
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .wfvwp-why__row {
                        display: block;
                        min-height: auto;
                        padding-bottom: var(--wfvwp-why-gap-main);
                    }
                    .fmcg-case-study .wfvwp-why__intro {
                        width: 100%;
                        max-width: none;
                    }
                    .fmcg-case-study .wfvwp-why__copy-col {
                        width: 100%;
                        max-width: 100%;
                    }
                    .fmcg-case-study .wfvwp-why__image-position {
                        position: static;
                        width: 100%;
                        margin-top: var(--wfvwp-why-gap-md);
                        pointer-events: auto;
                    }
                    .fmcg-case-study .wfvwp-why__image-track {
                        height: auto;
                        max-width: none;
                        margin-left: 0;
                        margin-right: 0;
                    }
                    .fmcg-case-study .wfvwp-why__image-sticky {
                        position: static;
                        min-height: 0;
                        padding-left: 0;
                        padding-right: 0;
                    }
                    .fmcg-case-study .wfvwp-why__image-wrap {
                        width: 100%;
                        max-height: 92vw;
                        margin-left: 0;
                        margin-bottom: 0;
                        clip-path: none;
                    }
                    .fmcg-case-study .wfvwp-why__image-wrap:has(.wfvwp-why__image-link.w--current) {
                        width: 100%;
                    }
                }
                .fmcg-case-study .wfvwp-migration-section {
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-migration-card {
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
                .fmcg-case-study .wfvwp-migration-card__glass {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    min-width: 800px;
                    overflow: hidden;
                }
                .fmcg-case-study .wfvwp-migration-card__glass-fallback {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(circle at 78% 26%, rgba(55, 137, 255, 0.28) 0%, rgba(55, 137, 255, 0) 34%),
                        linear-gradient(135deg, #060c18 0%, #0b1730 34%, #0a2347 67%, #050b16 100%);
                    transition: opacity 0.25s ease;
                }
                .fmcg-case-study .wfvwp-migration-card__glass.is-ready .wfvwp-migration-card__glass-fallback {
                    opacity: 0;
                }
                .fmcg-case-study .wfvwp-migration-card__glass-canvas {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    min-height: 100%;
                }
                .fmcg-case-study .wfvwp-migration-card__body {
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
                .fmcg-case-study .wfvwp-migration-card__content {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    flex: 1 1 0;
                    max-width: 100%;
                    padding-left: calc(clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem) / 2);
                    padding-right: calc(clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem) / 2);
                }
                .fmcg-case-study .wfvwp-migration-card__copy-group {
                    margin-bottom: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                }
                .fmcg-case-study .wfvwp-migration-card__title {
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
                .fmcg-case-study .wfvwp-migration-card__body-copy {
                    margin: 0;
                    color: rgba(255, 255, 255, 0.9);
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-migration-card__button {
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
                .fmcg-case-study .wfvwp-migration-card__button:hover,
                .fmcg-case-study .wfvwp-migration-card__button:has(.wfvwp-migration-card__button-link:focus-visible) {
                    background: #0055d4;
                    color: #ffffff;
                }
                .fmcg-case-study .wfvwp-migration-card__button-text {
                    pointer-events: none;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-migration-card__button-link {
                    position: absolute;
                    inset: 0;
                    z-index: 3;
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                    cursor: pointer;
                    text-decoration: none;
                }
                .fmcg-case-study .wfvwp-migration-card__button-link:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .wfvwp-migration-card__cover-col {
                    display: flex;
                    justify-content: center;
                    flex: 1 1 0;
                    max-width: 100%;
                    padding-left: calc(clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem) / 2);
                    padding-right: calc(clamp(1.75rem, calc(1.6071428571rem + 0.7142857143vw), 2.25rem) / 2);
                }
                .fmcg-case-study .wfvwp-migration-card__cover-wrap {
                    position: relative;
                    width: 100%;
                    max-width: 20rem;
                    aspect-ratio: 1;
                    margin: 0 auto;
                }
                .fmcg-case-study .wfvwp-migration-card__cover {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: 50% 50%;
                    display: block;
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .wfvwp-migration-card__content,
                    .fmcg-case-study .wfvwp-migration-card__cover-col {
                        flex-basis: 100%;
                    }
                    .fmcg-case-study .wfvwp-migration-card__body {
                        align-items: stretch;
                    }
                }
                .fmcg-case-study .wfvwp-customers-section {
                    --wfvwp-customers-gap-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-customers__intro-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                    row-gap: var(--wfvwp-customers-gap-md);
                }
                .fmcg-case-study .wfvwp-customers__intro-col {
                    flex: 0 1 41.6667%;
                    max-width: 41.6667%;
                }
                .fmcg-case-study .wfvwp-customers__heading {
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
                .fmcg-case-study .wfvwp-customers__summary {
                    margin: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem) 0 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-variation-settings: "wght" 400, "opsz" 16;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-customers__badges-col {
                    flex: 0 1 50%;
                    max-width: 50%;
                }
                .fmcg-case-study .wfvwp-customers__badges-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: var(--wfvwp-customers-gap-md);
                }
                .fmcg-case-study .wfvwp-customers__badge-frame {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 869 / 1000;
                }
                .fmcg-case-study .wfvwp-customers__badge-image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 50% 50%;
                    display: block;
                }
                .fmcg-case-study .wfvwp-customers-slider-section {
                    --wfvwp-customers-slider-gap-xs: clamp(0.375rem, calc(0.3392857143rem + 0.1785714286vw), 0.5rem);
                    --wfvwp-customers-slider-gap-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    --wfvwp-customers-slider-gap-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    --wfvwp-customers-slider-gap-main: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    --wfvwp-customers-slider-gap-xl: clamp(2.25rem, calc(2.0357142857rem + 1.0714285714vw), 3rem);
                    --wfvwp-customers-slider-card-width: min(100%, calc(100vw - clamp(10rem, 18vw, 16rem)));
                    padding: 0 0 clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem);
                    background: #ffffff;
                    position: relative;
                    overflow: hidden;
                }
                .fmcg-case-study .wfvwp-customers-slider {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    container-type: inline-size;
                }
                .fmcg-case-study .wfvwp-customers-slider__controls {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: var(--wfvwp-customers-slider-gap-md);
                    position: relative;
                    z-index: 1;
                }
                .fmcg-case-study .wfvwp-customers-slider__control {
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
                .fmcg-case-study .wfvwp-customers-slider__control:not(:disabled):hover,
                .fmcg-case-study .wfvwp-customers-slider__control:not(:disabled):focus-visible {
                    background: #146ef5;
                    color: #ffffff;
                    box-shadow:
                        rgba(8, 8, 8, 0.08) 0px 1px 1px 0px,
                        rgba(8, 8, 8, 0.2) 0px 1px 1px 0px,
                        rgba(255, 255, 255, 0.12) 0px 6px 12px 0px inset,
                        rgba(255, 255, 255, 0.2) 0px 1px 1px 0px inset;
                    opacity: 1;
                }
                .fmcg-case-study .wfvwp-customers-slider__control .button-icon-wrap {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    flex-flow: row;
                }
                .fmcg-case-study .wfvwp-customers-slider__control .accordion-line-wrap {
                    pointer-events: none;
                    justify-content: center;
                    align-items: center;
                    display: none;
                    position: absolute;
                    inset: 0;
                }
                .fmcg-case-study .wfvwp-customers-slider__control .accordion-icon_line {
                    background-color: #146ef5;
                    flex: none;
                    width: 1rem;
                    max-width: 50%;
                    height: 1.5px;
                }
                .fmcg-case-study .wfvwp-customers-slider__control .cc-vertical {
                    position: absolute;
                    transform: rotate(90deg);
                }
                .fmcg-case-study .wfvwp-customers-slider__control .button-icon {
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
                .fmcg-case-study .wfvwp-customers-slider__control .button-icon::before,
                .fmcg-case-study .wfvwp-customers-slider__control .button-icon::after {
                    content: "";
                    position: absolute;
                    display: block;
                    background: currentColor;
                    border-radius: 999px;
                }
                .fmcg-case-study .wfvwp-customers-slider__control .cc-arrow-left,
                .fmcg-case-study .wfvwp-customers-slider__control .cc-arrow-right {
                    display: block;
                }
                .fmcg-case-study .wfvwp-customers-slider__control .cc-arrow-left::before,
                .fmcg-case-study .wfvwp-customers-slider__control .cc-arrow-right::before {
                    top: 50%;
                    left: 0.125rem;
                    right: 0.125rem;
                    height: 1.5px;
                    transform: translateY(-50%);
                    transform-origin: center;
                }
                .fmcg-case-study .wfvwp-customers-slider__control .cc-arrow-left::after,
                .fmcg-case-study .wfvwp-customers-slider__control .cc-arrow-right::after {
                    width: 0.45rem;
                    height: 0.45rem;
                    top: 50%;
                    border-top: 1.5px solid currentColor;
                    border-right: 1.5px solid currentColor;
                    background: transparent;
                    border-radius: 0;
                    transform-origin: center;
                }
                .fmcg-case-study .wfvwp-customers-slider__control .cc-arrow-left::after {
                    left: 0.18rem;
                    transform: translateY(-50%) rotate(-135deg);
                }
                .fmcg-case-study .wfvwp-customers-slider__control .cc-arrow-right::after {
                    right: 0.18rem;
                    transform: translateY(-50%) rotate(45deg);
                }
                .fmcg-case-study .wfvwp-customers-slider__control[data-direction="previous"] .cc-arrow-right,
                .fmcg-case-study .wfvwp-customers-slider__control[data-direction="next"] .cc-arrow-left {
                    display: none;
                }
                .fmcg-case-study .wfvwp-customers-slider__control:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .wfvwp-customers-slider__control:disabled,
                .fmcg-case-study .wfvwp-customers-slider__control.swiper-button-disabled {
                    opacity: 0.35;
                    cursor: default;
                    pointer-events: none;
                }
                .fmcg-case-study .wfvwp-customers-slider__offset {
                    flex: 1;
                    display: flex;
                    width: 100vw;
                    margin-left: calc((100vw - 100%) / -2);
                    margin-right: calc((100vw - 100%) / -2);
                    overflow: visible;
                }
                .fmcg-case-study .wfvwp-customers-slider__track {
                    display: flex;
                    align-items: stretch;
                    gap: var(--wfvwp-customers-slider-gap-md);
                    width: max-content;
                    overflow: visible;
                    transform: translate3d(calc((100vw - var(--wfvwp-customers-slider-card-width)) / 2), 0, 0);
                    transition: transform 0.55s cubic-bezier(0.165, 0.84, 0.44, 1);
                    will-change: transform;
                }
                .fmcg-case-study .wfvwp-customers-slider__track[data-active-slide="1"] {
                    transform: translate3d(calc((100vw - var(--wfvwp-customers-slider-card-width)) / 2 - var(--wfvwp-customers-slider-card-width) - var(--wfvwp-customers-slider-gap-md)), 0, 0);
                }
                .fmcg-case-study .wfvwp-customers-slider__track[data-active-slide="2"] {
                    transform: translate3d(calc((100vw - var(--wfvwp-customers-slider-card-width)) / 2 - var(--wfvwp-customers-slider-card-width) - var(--wfvwp-customers-slider-gap-md) - var(--wfvwp-customers-slider-card-width) - var(--wfvwp-customers-slider-gap-md)), 0, 0);
                }
                .fmcg-case-study .wfvwp-customers-slider__track[data-active-slide="3"] {
                    transform: translate3d(calc((100vw - var(--wfvwp-customers-slider-card-width)) / 2 - var(--wfvwp-customers-slider-card-width) - var(--wfvwp-customers-slider-gap-md) - var(--wfvwp-customers-slider-card-width) - var(--wfvwp-customers-slider-gap-md) - var(--wfvwp-customers-slider-card-width) - var(--wfvwp-customers-slider-gap-md)), 0, 0);
                }
                .fmcg-case-study .wfvwp-customers-slider__track::-webkit-scrollbar {
                    display: none;
                }
                .fmcg-case-study .wfvwp-customers-slider__slide {
                    flex: 0 0 var(--wfvwp-customers-slider-card-width);
                    width: var(--wfvwp-customers-slider-card-width);
                    color: inherit;
                    text-decoration: none;
                    display: block;
                }
                .fmcg-case-study .wfvwp-customers-slider__card {
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
                .fmcg-case-study .wfvwp-customers-slider__card-body {
                    display: flex;
                    flex: 1;
                    flex-wrap: wrap;
                    align-items: center;
                    height: 100%;
                    min-height: 0;
                    row-gap: var(--wfvwp-customers-slider-gap-main);
                    margin-left: calc(var(--wfvwp-customers-slider-gap-main) / -2);
                    margin-right: calc(var(--wfvwp-customers-slider-gap-main) / -2);
                    padding: var(--wfvwp-customers-slider-gap-xl);
                }
                .fmcg-case-study .wfvwp-customers-slider__meta-col {
                    flex: 0 0 33.3333%;
                    max-width: 33.3333%;
                    align-self: stretch;
                    display: flex;
                    align-items: center;
                    padding-left: calc(var(--wfvwp-customers-slider-gap-main) / 2);
                    padding-right: calc(var(--wfvwp-customers-slider-gap-main) / 2);
                }
                .fmcg-case-study .wfvwp-customers-slider__avatar-row {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    row-gap: var(--wfvwp-customers-slider-gap-sm);
                    margin-left: calc(var(--wfvwp-customers-slider-gap-sm) / -2);
                    margin-right: calc(var(--wfvwp-customers-slider-gap-sm) / -2);
                }
                .fmcg-case-study .wfvwp-customers-slider__avatar-shell {
                    position: relative;
                    flex: none;
                    width: 3rem;
                    aspect-ratio: 1;
                    overflow: hidden;
                    border-radius: 999px;
                    background: #f0f0f0;
                    border: 1px solid #d8d8d8;
                    margin-left: calc(var(--wfvwp-customers-slider-gap-sm) / 2);
                    margin-right: calc(var(--wfvwp-customers-slider-gap-sm) / 2);
                }
                .fmcg-case-study .wfvwp-customers-slider__avatar-image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 50% 50%;
                    display: block;
                }
                .fmcg-case-study .wfvwp-customers-slider__person {
                    flex: 1;
                    min-width: 0;
                    margin-left: calc(var(--wfvwp-customers-slider-gap-sm) / 2);
                    margin-right: calc(var(--wfvwp-customers-slider-gap-sm) / 2);
                }
                .fmcg-case-study .wfvwp-customers-slider__name {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(1.125rem, calc(1.0892857143rem + 0.1785714286vw), 1.25rem);
                    line-height: 1.4;
                    font-variation-settings: "wght" 500, "opsz" 50;
                    font-weight: 500;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-customers-slider__title-wrap {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: 0.875rem;
                    line-height: 1.6;
                    font-variation-settings: "wght" 400, "opsz" 16;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-customers-slider__quote-col {
                    flex: 1 1 0;
                    max-width: 100%;
                    align-self: stretch;
                    display: flex;
                    align-items: center;
                    padding-left: calc(var(--wfvwp-customers-slider-gap-main) / 2);
                    padding-right: calc(var(--wfvwp-customers-slider-gap-main) / 2);
                }
                .fmcg-case-study .wfvwp-customers-slider__quote {
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
                .fmcg-case-study .wfvwp-customers-slider__quote p {
                    margin: 0;
                    font-family: inherit;
                    font-size: inherit;
                    line-height: inherit;
                    font-weight: 500;
                    font-variation-settings: "wght" 500, "opsz" 24;
                    letter-spacing: inherit;
                }
                @media (max-width: 991px) {
                    .fmcg-case-study .wfvwp-customers__intro-col,
                    .fmcg-case-study .wfvwp-customers__badges-col {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                    .fmcg-case-study .wfvwp-customers-slider__meta-col,
                    .fmcg-case-study .wfvwp-customers-slider__quote-col {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                    .fmcg-case-study .wfvwp-customers-slider__card-body {
                        min-height: 0;
                    }
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .wfvwp-customers-slider-section {
                        --wfvwp-customers-slider-card-width: calc(100vw - 3rem);
                    }
                    .fmcg-case-study .wfvwp-customers-slider__offset {
                        width: 100vw;
                    }
                    .fmcg-case-study .wfvwp-customers-slider__card-body {
                        min-height: 0;
                    }
                }
                .fmcg-case-study .wfvwp-compare-section {
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-compare__intro-row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: flex-start;
                }
                .fmcg-case-study .wfvwp-compare__intro-col {
                    flex: 0 1 66.6667%;
                    max-width: 66.6667%;
                }
                .fmcg-case-study .wfvwp-compare__heading {
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
                .fmcg-case-study .wfvwp-compare__heading-break {
                    display: inline;
                }
                .fmcg-case-study .wfvwp-compare__spacer {
                    height: clamp(0.75rem, calc(0.6785714286rem + 0.3571428571vw), 1rem);
                }
                .fmcg-case-study .wfvwp-compare__table-shell {
                    width: 100%;
                    border: 1px solid #d8d8d8;
                    border-radius: 0.75rem;
                    overflow: hidden;
                    scrollbar-width: thin;
                    background: #ffffff;
                }
                .fmcg-case-study .wfvwp-compare__table-slot {
                    width: 100%;
                    min-width: 0;
                    background: #ffffff;
                    border-radius: inherit;
                    overflow: hidden;
                }
                .fmcg-case-study .wfvwp-compare__row {
                    width: 100%;
                }
                .fmcg-case-study .wfvwp-compare__row-slot {
                    display: flex;
                    flex-flow: row nowrap;
                }
                .fmcg-case-study .wfvwp-compare__cell {
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
                .fmcg-case-study .wfvwp-compare__row--header .wfvwp-compare__cell {
                    border-top: 0;
                }
                .fmcg-case-study .wfvwp-compare__row-slot > .wfvwp-compare__cell:first-child {
                    border-left: 0;
                }
                .fmcg-case-study .wfvwp-compare__table-slot > .wfvwp-compare__row:last-child .wfvwp-compare__cell {
                    border-bottom: 0;
                }
                .fmcg-case-study .wfvwp-compare__cell.is-webflow,
                .fmcg-case-study .wfvwp-compare__cell-slot.is-webflow {
                    background: #f0f0f0;
                }
                .fmcg-case-study .wfvwp-compare__cell-slot {
                    position: relative;
                    display: flex;
                    width: 100%;
                    min-width: 0;
                }
                .fmcg-case-study .wfvwp-compare__cell-slot--feature {
                    padding-right: 2.75rem;
                }
                .fmcg-case-study .wfvwp-compare__cell-slot--header-value {
                    justify-content: center;
                }
                .fmcg-case-study .wfvwp-compare__cell-slot--value {
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    text-align: center;
                }
                .fmcg-case-study .wfvwp-compare__rich-text,
                .fmcg-case-study .wfvwp-compare__tooltip-copy {
                    font-family: var(--sans);
                    color: #080808;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-compare__rich-text p,
                .fmcg-case-study .wfvwp-compare__tooltip-copy p {
                    margin: 0;
                }
                .fmcg-case-study .wfvwp-compare__rich-text p {
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                }
                .fmcg-case-study .wfvwp-compare__rich-text strong {
                    font-weight: 700;
                }
                .fmcg-case-study .wfvwp-compare__rich-text--header p {
                    font-weight: 700;
                }
                .fmcg-case-study .wfvwp-compare__cell--header-value .wfvwp-compare__rich-text {
                    text-align: center;
                }
                .fmcg-case-study .wfvwp-compare__tooltip-expand {
                    display: contents;
                }
                .fmcg-case-study .wfvwp-compare__toggle {
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
                .fmcg-case-study .wfvwp-compare__row.is-open .wfvwp-compare__toggle {
                    color: #080808;
                    opacity: 1;
                }
                .fmcg-case-study .wfvwp-compare__toggle-icon {
                    width: 0.875rem;
                    height: 0.9375rem;
                    display: block;
                }
                .fmcg-case-study .wfvwp-compare__icon {
                    flex: none;
                    width: 24px;
                    height: 24px;
                    display: block;
                }
                .fmcg-case-study .wfvwp-compare__cell--value:not(.is-webflow) .wfvwp-compare__icon--no,
                .fmcg-case-study .wfvwp-compare__cell--value:not(.is-webflow) .wfvwp-compare__icon--minus {
                    opacity: 0.72;
                }
                .fmcg-case-study .wfvwp-compare__tooltip-pane {
                    display: grid;
                    grid-template-rows: 0fr;
                    width: 100%;
                    background: transparent;
                    overflow: hidden;
                    transition: grid-template-rows 0.4s cubic-bezier(.19, 1, .22, 1);
                }
                .fmcg-case-study .wfvwp-compare__tooltip-pane.is-active {
                    grid-template-rows: 1fr;
                }
                .fmcg-case-study .wfvwp-compare__tooltip-pane-inner {
                    display: flex;
                    justify-content: center;
                    min-height: 0;
                    overflow: hidden;
                    padding-top: 1rem;
                }
                .fmcg-case-study .wfvwp-compare__tooltip-copy {
                    width: 100%;
                    max-width: 18rem;
                    font-size: 0.75rem;
                    line-height: 1.6;
                    font-weight: 400;
                    text-align: center;
                }
                .fmcg-case-study .wfvwp-compare__tooltip-copy a {
                    color: inherit;
                    text-decoration: none;
                    background-image: linear-gradient(currentColor, currentColor);
                    background-position: 0 1.1em;
                    background-repeat: no-repeat;
                    background-size: 100% 0.08em;
                }
                @media (max-width: 991px) {
                    .fmcg-case-study .wfvwp-compare__intro-col {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                    .fmcg-case-study .wfvwp-compare__heading-break {
                        display: none;
                    }
                }
                @media (hover: hover) and (pointer: fine) {
                    .fmcg-case-study .wfvwp-compare__toggle:hover {
                        color: #080808;
                        opacity: 1;
                    }
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .wfvwp-compare__table-shell {
                        overflow-x: auto;
                        overflow-y: hidden;
                    }
                    .fmcg-case-study .wfvwp-compare__table-slot {
                        min-width: 40rem;
                    }
                }
                @media (max-width: 479px) {
                    .fmcg-case-study .wfvwp-compare__table-shell {
                        width: 100vw;
                        max-width: 100vw;
                        margin-left: calc(50% - 50vw);
                        padding-left: 1.5rem;
                        padding-right: 1.5rem;
                        overflow-x: auto;
                    }
                    .fmcg-case-study .wfvwp-compare__table-slot {
                        min-width: 38rem;
                    }
                }
                .fmcg-case-study .wfvwp-business-impact-section {
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-business-impact__card {
                    position: relative;
                    overflow: hidden;
                    border-radius: 0.5rem;
                    background: #000000;
                    color: #ffffff;
                }
                .fmcg-case-study .wfvwp-business-impact__glass {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    min-width: 800px;
                    overflow: hidden;
                }
                .fmcg-case-study .wfvwp-business-impact__glass-fallback {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(circle at 22% 26%, rgba(20, 110, 245, 0.32) 0%, rgba(20, 110, 245, 0) 34%),
                        linear-gradient(120deg, #050505 0%, #071225 32%, #0a1f46 70%, #040404 100%);
                    transition: opacity 0.25s ease;
                }
                .fmcg-case-study .wfvwp-business-impact__glass.is-ready .wfvwp-business-impact__glass-fallback {
                    opacity: 0;
                }
                .fmcg-case-study .wfvwp-business-impact__glass-canvas {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    min-height: 100%;
                }
                .fmcg-case-study .wfvwp-business-impact__body {
                    position: relative;
                    z-index: 1;
                    display: grid;
                    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
                    align-items: center;
                    gap: clamp(1.75rem, calc(1.3928571429rem + 1.7857142857vw), 3rem);
                    padding: clamp(2rem, calc(1.4285714286rem + 2.8571428571vw), 4rem);
                }
                .fmcg-case-study .wfvwp-business-impact__copy-col {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 100%;
                    max-width: none;
                }
                .fmcg-case-study .wfvwp-business-impact__title {
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
                .fmcg-case-study .wfvwp-business-impact__title-line,
                .fmcg-case-study .wfvwp-business-impact__copy-line {
                    display: block;
                    white-space: nowrap;
                }
                .fmcg-case-study .wfvwp-business-impact__body-copy {
                    margin: 0 0 1.5rem;
                    max-width: 34ch;
                    color: rgba(255, 255, 255, 0.9);
                    font-family: var(--sans);
                    font-size: clamp(1rem, calc(0.9642857143rem + 0.1785714286vw), 1.125rem);
                    line-height: 1.5;
                    font-weight: 400;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-business-impact__button {
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
                .fmcg-case-study .wfvwp-business-impact__button-text {
                    pointer-events: none;
                    display: inline-flex;
                    align-items: center;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-business-impact__button-icon {
                    flex: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    max-width: 1.2em;
                    line-height: 1;
                }
                .fmcg-case-study .wfvwp-business-impact__button .button-icon-wrap {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    flex-flow: row;
                    transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
                }
                .fmcg-case-study .wfvwp-business-impact__button:hover [data-wf--button-icon--variant="arrow-right"] {
                    transform: translateX(6px);
                }
                .fmcg-case-study .wfvwp-business-impact__button .accordion-line-wrap {
                    pointer-events: none;
                    justify-content: center;
                    align-items: center;
                    display: none;
                    position: absolute;
                    inset: 0;
                }
                .fmcg-case-study .wfvwp-business-impact__button .accordion-icon_line {
                    background-color: #ffffff;
                    flex: none;
                    width: 1rem;
                    max-width: 50%;
                    height: 1.5px;
                }
                .fmcg-case-study .wfvwp-business-impact__button .cc-vertical {
                    position: absolute;
                    transform: rotate(90deg);
                }
                .fmcg-case-study .wfvwp-business-impact__button .button-icon {
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
                .fmcg-case-study .wfvwp-business-impact__button .button-icon::before,
                .fmcg-case-study .wfvwp-business-impact__button .button-icon::after {
                    content: "";
                    position: absolute;
                    display: block;
                    background: currentColor;
                    border-radius: 999px;
                }
                .fmcg-case-study .wfvwp-business-impact__button .cc-arrow-right {
                    display: block;
                }
                .fmcg-case-study .wfvwp-business-impact__button .cc-arrow-right::before {
                    top: 50%;
                    left: 0.125rem;
                    right: 0.125rem;
                    height: 1.5px;
                    transform: translateY(-50%);
                    transform-origin: center;
                }
                .fmcg-case-study .wfvwp-business-impact__button .cc-arrow-right::after {
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
                .fmcg-case-study .wfvwp-business-impact__link-cover {
                    z-index: 3;
                    cursor: pointer;
                    border-radius: inherit;
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    position: absolute;
                    inset: 0;
                }
                .fmcg-case-study .wfvwp-business-impact__media-col {
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-end;
                    min-width: 0;
                }
                .fmcg-case-study .wfvwp-business-impact__image-offset {
                    width: 100%;
                    transform: translateX(clamp(0rem, calc(0.5357142857rem + 1.0714285714vw), 0.75rem));
                }
                .fmcg-case-study .wfvwp-business-impact__image-frame {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 2486 / 1534;
                }
                .fmcg-case-study .wfvwp-business-impact__image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 50% 50%;
                    display: block;
                }
                @media (max-width: 900px) {
                    .fmcg-case-study .wfvwp-business-impact__body {
                        grid-template-columns: 1fr;
                    }

                    .fmcg-case-study .wfvwp-business-impact__title {
                        max-width: none;
                    }

                    .fmcg-case-study .wfvwp-business-impact__image-offset {
                        transform: none;
                    }
                    .fmcg-case-study .wfvwp-business-impact__title-line,
                    .fmcg-case-study .wfvwp-business-impact__copy-line {
                        display: inline;
                        white-space: normal;
                    }
                }
                .fmcg-case-study .wfvwp-g2-section {
                    --wfvwp-g2-gap-main: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                    --wfvwp-g2-gap-md: clamp(1.25rem, calc(1.1785714286rem + 0.3571428571vw), 1.5rem);
                    --wfvwp-g2-gap-sm: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                    --wfvwp-g2-stage-offset: 4.25rem;
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-g2-tabs {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    gap: var(--wfvwp-g2-gap-main);
                }
                .fmcg-case-study .wfvwp-g2-tabs__menu {
                    display: flex;
                    grid-column-gap: var(--wfvwp-g2-gap-md);
                    grid-row-gap: var(--wfvwp-g2-gap-md);
                    flex: 1;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: stretch;
                    max-width: 28rem;
                }
                .fmcg-case-study .wfvwp-g2-tabs__content {
                    display: flex;
                    flex-direction: column;
                }
                .fmcg-case-study .wfvwp-g2-tabs__title {
                    margin: 0 0 var(--wfvwp-g2-gap-sm);
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(2rem, calc(1.5714285714rem + 2.1428571429vw), 3.5rem);
                    line-height: 1.04;
                    font-weight: 600;
                    font-variation-settings: "wght" 600, "opsz" 100;
                    letter-spacing: 0;
                    text-wrap: balance;
                }
                .fmcg-case-study .wfvwp-g2-tabs__intro {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    font-variation-settings: "wght" 400, "opsz" 24;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-g2-tabs__list {
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    gap: var(--wfvwp-g2-gap-md);
                }
                .fmcg-case-study .wfvwp-g2-tabs__item {
                    flex: 0 0 auto;
                }
                .fmcg-case-study .wfvwp-g2-tabs__link-wrapper {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    transition: opacity 0.2s ease;
                }
                .fmcg-case-study .wfvwp-g2-tabs__progress-track {
                    margin-bottom: var(--wfvwp-g2-gap-md);
                    background: #f0f0f0;
                    width: 100%;
                    height: 2px;
                    overflow: hidden;
                }
                .fmcg-case-study .wfvwp-g2-tabs__progress-bar {
                    background: #080808;
                    width: 0%;
                    height: 100%;
                }
                .fmcg-case-study .wfvwp-g2-tabs__button {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    border: 0;
                    background: transparent;
                    cursor: pointer;
                }
                .fmcg-case-study .wfvwp-g2-tabs__button:focus-visible {
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .wfvwp-g2-tabs__menu-text {
                    position: relative;
                    z-index: 1;
                }
                .fmcg-case-study .wfvwp-g2-tabs__tab-title {
                    margin: 0;
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(1.125rem, calc(1.0892857143rem + 0.1785714286vw), 1.25rem);
                    line-height: 1.4;
                    font-weight: 600;
                    font-variation-settings: "wght" 600, "opsz" 50;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-g2-tabs__spacer {
                    aspect-ratio: 8 / 9;
                    width: calc(((100% - var(--wfvwp-g2-gap-main)) / 2) - var(--wfvwp-g2-stage-offset));
                    flex: none;
                }
                .fmcg-case-study .wfvwp-g2-tabs__stage {
                    pointer-events: none;
                    position: absolute;
                    inset: auto 0 0 auto;
                    display: flex;
                    width: calc(((100% - var(--wfvwp-g2-gap-main)) / 2) - var(--wfvwp-g2-stage-offset));
                    max-height: 100%;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: stretch;
                    opacity: 0;
                    transition: opacity 0.25s ease;
                }
                .fmcg-case-study .wfvwp-g2-tabs__frame {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 8 / 9;
                    overflow: hidden;
                    background: #ffffff;
                }
                .fmcg-case-study .wfvwp-g2-tabs__image {
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
                    .fmcg-case-study .wfvwp-g2-tabs__item .wfvwp-g2-tabs__link-wrapper:hover {
                        opacity: 0.8;
                    }
                }
                @media (min-width: 768px) {
                    .fmcg-case-study .wfvwp-g2-tabs__item .wfvwp-g2-tabs__link-wrapper {
                        opacity: 0.5;
                    }
                    .fmcg-case-study .wfvwp-g2-tabs__item.cc-active .wfvwp-g2-tabs__link-wrapper {
                        opacity: 1;
                    }
                    .fmcg-case-study .wfvwp-g2-tabs__item.cc-active .wfvwp-g2-tabs__stage {
                        pointer-events: auto;
                        opacity: 1;
                    }
                }
                @media (max-width: 767px) {
                    .fmcg-case-study .wfvwp-g2-tabs {
                        display: block;
                    }
                    .fmcg-case-study .wfvwp-g2-tabs__spacer {
                        display: none;
                    }
                    .fmcg-case-study .wfvwp-g2-tabs__menu {
                        max-width: none;
                    }
                    .fmcg-case-study .wfvwp-g2-tabs__button {
                        display: none;
                    }
                    .fmcg-case-study .wfvwp-g2-tabs__stage {
                        position: relative;
                        inset: auto;
                        width: auto;
                        margin-top: var(--wfvwp-g2-gap-md);
                        display: block;
                        opacity: 1;
                        pointer-events: auto;
                    }
                }
                .fmcg-case-study .wfvwp-faq-section {
                    padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0;
                    background: #ffffff;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-faq__spacer {
                    width: 100%;
                    height: clamp(2.25rem, calc(2.0357142857rem + 1.0714285714vw), 3rem);
                    padding: 0;
                }
                .fmcg-case-study .wfvwp-faq__row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: clamp(1.5rem, calc(1rem + 2.5vw), 3rem);
                }
                .fmcg-case-study .wfvwp-faq__heading-col {
                    flex: 0 1 33.3333%;
                    max-width: 33.3333%;
                }
                .fmcg-case-study .wfvwp-faq__heading-sticky {
                    position: sticky;
                    top: calc(4.25rem + 2rem);
                }
                .fmcg-case-study .wfvwp-faq__heading {
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
                .fmcg-case-study .wfvwp-faq__list-col {
                    flex: 0 1 58.3333%;
                    max-width: 58.3333%;
                }
                .fmcg-case-study .wfvwp-faq__list {
                    display: flex;
                    flex-direction: column;
                }
                .fmcg-case-study .wfvwp-faq__item {
                    border-bottom: 1px solid #d8d8d8;
                    text-align: left;
                    flex-direction: column;
                    width: 100%;
                    display: flex;
                }
                .fmcg-case-study .wfvwp-faq__trigger {
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
                .fmcg-case-study .wfvwp-faq__trigger:focus-visible {
                    position: relative;
                    z-index: 2;
                    outline: 2px solid #146ef5;
                    outline-offset: 2px;
                }
                .fmcg-case-study .wfvwp-faq__trigger::-webkit-details-marker {
                    display: none;
                }
                .fmcg-case-study .wfvwp-faq__trigger::marker {
                    content: '';
                }
                .fmcg-case-study .wfvwp-faq__title-icon-wrap {
                    grid-column-gap: 1em;
                    grid-row-gap: 1em;
                    pointer-events: none;
                    justify-content: flex-start;
                    align-items: center;
                    display: flex;
                }
                .fmcg-case-study .wfvwp-faq__question {
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
                .fmcg-case-study .wfvwp-faq__icon-wrap {
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
                .fmcg-case-study .wfvwp-faq__icon-line {
                    background: #146ef5;
                    flex: none;
                    width: 1rem;
                    max-width: 50%;
                    height: 1.5px;
                }
                @media (hover: hover) and (pointer: fine) {
                    .fmcg-case-study .wfvwp-faq__trigger:hover {
                        color: #146ef5;
                    }
                }
                .fmcg-case-study .wfvwp-faq__icon-line--horizontal {
                }
                .fmcg-case-study .wfvwp-faq__icon-line--vertical {
                    position: absolute;
                    transform: rotate(90deg);
                }
                .fmcg-case-study .wfvwp-faq__item[open] .wfvwp-faq__icon-line--vertical {
                    opacity: 0;
                }
                .fmcg-case-study .wfvwp-faq__content {
                    width: 100%;
                    height: auto;
                    overflow: clip;
                }
                .fmcg-case-study .wfvwp-faq__content-spacer {
                    padding-bottom: clamp(0.625rem, calc(0.5178571429rem + 0.5357142857vw), 1rem);
                }
                .fmcg-case-study .wfvwp-faq__answer {
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    font-variation-settings: "wght" 400, "opsz" 24;
                    letter-spacing: 0;
                    text-wrap: pretty;
                }
                .fmcg-case-study .wfvwp-faq__answer p {
                    margin: 0 0 1em;
                }
                .fmcg-case-study .wfvwp-faq__answer p:last-child {
                    margin-bottom: 0;
                }
                .fmcg-case-study .wfvwp-faq__answer strong {
                    font-variation-settings: "wght" 600, "opsz" 24;
                    font-weight: 600;
                }
                .fmcg-case-study .wfvwp-faq__answer a {
                    color: inherit;
                }
                @media (min-width: 768px) {
                    .fmcg-case-study .wfvwp-faq__item[open] {
                        border-bottom-color: transparent;
                    }
                }
                @media (max-width: 900px) {
                    .fmcg-case-study .wfvwp-faq__heading-col,
                    .fmcg-case-study .wfvwp-faq__list-col {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                    .fmcg-case-study .wfvwp-faq__heading-sticky {
                        position: static;
                    }
                }
                .fmcg-case-study .wfvwp-demo-section {
                    position: relative;
                    overflow: hidden;
                    padding-top: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem);
                    padding-bottom: 0;
                    border-top: 1px solid #d8d8d8;
                    background: #ffffff;
                }
                .fmcg-case-study .wfvwp-demo-container {
                    position: static;
                    z-index: 1;
                }
                .fmcg-case-study .wfvwp-demo-shell__glass {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    overflow: hidden;
                    background-color: #ffffff;
                }
                .fmcg-case-study .wfvwp-demo-shell__glass-fallback {
                    position: absolute;
                    inset: 0;
                    background: #ffffff;
                    transition: opacity 0.25s ease;
                }
                .fmcg-case-study .wfvwp-demo-shell__glass.is-ready .wfvwp-demo-shell__glass-fallback {
                    opacity: 0;
                }
                .fmcg-case-study .wfvwp-demo-shell__glass-canvas {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    width: 100%;
                    height: 100%;
                    min-height: 30vh;
                }
                .fmcg-case-study .wfvwp-demo-row {
                    position: relative;
                    z-index: 1;
                    display: grid;
                    width: 100%;
                    grid-template-columns: minmax(0, 41.6667%) minmax(0, 50%);
                    align-items: end;
                    column-gap: 8.3333%;
                    row-gap: clamp(1.75rem, calc(1.6785714286rem + 0.3571428571vw), 2rem);
                }
                .fmcg-case-study .wfvwp-demo-shell__copy-col {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding-top: 0;
                    padding-bottom: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem);
                }
                .fmcg-case-study .wfvwp-demo-shell__title {
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
                .fmcg-case-study .wfvwp-demo-shell__subheading {
                    margin: 0 0 clamp(0.375rem, calc(0.3392857143rem + 0.1785714286vw), 0.5rem);
                    color: #080808;
                    font-family: var(--webflow-sans);
                    font-size: clamp(1.125rem, calc(1.0892857143rem + 0.1785714286vw), 1.25rem);
                    line-height: 1.4;
                    font-variation-settings: "wght" 500, "opsz" 50;
                    font-weight: 500;
                    letter-spacing: 0;
                }
                .fmcg-case-study .wfvwp-demo-shell__body-copy {
                    margin: 0;
                    color: #080808;
                    font-family: var(--sans);
                    font-size: 1rem;
                    line-height: 1.6;
                    font-weight: 400;
                    letter-spacing: 0;
                    text-wrap: pretty;
                }
                .fmcg-case-study .wfvwp-demo-shell__spacer {
                    width: 100%;
                    height: clamp(2.25rem, calc(2.0357142857rem + 1.0714285714vw), 3rem);
                }
                .fmcg-case-study .wfvwp-demo-shell__support-list {
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
                .fmcg-case-study .wfvwp-demo-shell__support-item {
                    margin-bottom: 0.3em;
                }
                .fmcg-case-study .wfvwp-demo-shell__support-item a {
                    color: inherit;
                    text-decoration: underline;
                    text-underline-offset: 0.08em;
                }
                .fmcg-case-study .wfvwp-demo-shell__button {
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
                .fmcg-case-study .wfvwp-demo-shell__button-text {
                    pointer-events: none;
                    display: inline-flex;
                    align-items: center;
                    position: relative;
                }
                .fmcg-case-study .wfvwp-demo-shell__button-icon {
                    flex: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    max-width: 1.2em;
                    line-height: 1;
                }
                .fmcg-case-study .wfvwp-demo-shell__button .button-icon-wrap {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    flex-flow: row;
                    transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
                }
                .fmcg-case-study .wfvwp-demo-shell__button:hover [data-wf--button-icon--variant="arrow-right"] {
                    transform: translateX(6px);
                }
                .fmcg-case-study .wfvwp-demo-shell__button .accordion-line-wrap {
                    pointer-events: none;
                    justify-content: center;
                    align-items: center;
                    display: none;
                    position: absolute;
                    inset: 0;
                }
                .fmcg-case-study .wfvwp-demo-shell__button .accordion-icon_line {
                    background-color: #ffffff;
                    flex: none;
                    width: 1rem;
                    max-width: 50%;
                    height: 1.5px;
                }
                .fmcg-case-study .wfvwp-demo-shell__button .cc-vertical {
                    position: absolute;
                    transform: rotate(90deg);
                }
                .fmcg-case-study .wfvwp-demo-shell__button .button-icon {
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
                .fmcg-case-study .wfvwp-demo-shell__button .button-icon::before,
                .fmcg-case-study .wfvwp-demo-shell__button .button-icon::after {
                    content: "";
                    position: absolute;
                    display: block;
                    background: currentColor;
                    border-radius: 999px;
                }
                .fmcg-case-study .wfvwp-demo-shell__button .cc-arrow-right {
                    display: block;
                }
                .fmcg-case-study .wfvwp-demo-shell__button .cc-arrow-right::before {
                    top: 50%;
                    left: 0.125rem;
                    right: 0.125rem;
                    height: 1.5px;
                    transform: translateY(-50%);
                    transform-origin: center;
                }
                .fmcg-case-study .wfvwp-demo-shell__button .cc-arrow-right::after {
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
                .fmcg-case-study .wfvwp-demo-shell__link-cover {
                    z-index: 3;
                    cursor: pointer;
                    border-radius: inherit;
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    position: absolute;
                    inset: 0;
                }
                .fmcg-case-study .wfvwp-demo-shell__media-col {
                    position: relative;
                    min-width: 0;
                }
                .fmcg-case-study .wfvwp-demo-shell__media-wrap {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1 / 1;
                }
                .fmcg-case-study .wfvwp-demo-shell__base-image-wrap {
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
                .fmcg-case-study .wfvwp-demo-shell__base-image {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 0% 0%;
                    display: block;
                }
                .fmcg-case-study .wfvwp-demo-shell__floating-image-wrap {
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
                .fmcg-case-study .wfvwp-demo-shell__floating-image {
                    position: static;
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    object-position: 50% 50%;
                    display: block;
                }
                @media (max-width: 991px) {
                    .fmcg-case-study .wfvwp-demo-row {
                        grid-template-columns: 1fr;
                        column-gap: 0;
                    }
                    .fmcg-case-study .wfvwp-demo-shell__base-image-wrap {
                        width: 160%;
                    }
                }
                @media (max-width: 479px) {
                    .fmcg-case-study .wfvwp-demo-shell__base-image-wrap {
                        width: 160%;
                    }
                }
                .fmcg-case-study .hero-grid {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(var(--ln) 1px, transparent 1px), linear-gradient(90deg, var(--ln) 1px, transparent 1px);
                    background-size: 64px 64px;
                    opacity: .4;
                    pointer-events: none;
                    mask-image: radial-gradient(circle at 75% 50%, rgba(0,0,0,0.6) 0%, transparent 50%);
                    -webkit-mask-image: radial-gradient(circle at 75% 50%, rgba(0,0,0,0.6) 0%, transparent 50%);
                }
                .fmcg-case-study .hero-inner {
                    display: grid;
                    grid-template-columns: 1.15fr 0.85fr;
                    gap: 60px;
                    align-items: center;
                    position: relative;
                    z-index: 1;
                }
                .fmcg-case-study .hero-meta {
                    display: grid;
                    grid-template-columns: repeat(4, auto);
                    gap: 0;
                    border-top: 1px solid var(--ln);
                    padding-top: 40px;
                    margin-top: 0;
                    width: fit-content;
                }
                .fmcg-case-study .hm {
                    padding: 0 40px 0 0;
                    border-right: 1px solid var(--ln);
                    margin-right: 40px;
                }
                .fmcg-case-study .hm:last-child {
                    border-right: none;
                    margin-right: 0;
                    padding-right: 0;
                }
                .fmcg-case-study .hm-label {
                    font-family: var(--mono);
                    font-size: 10px;
                    color: var(--ink4);
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }
                .fmcg-case-study .hm-val {
                    font-size: 14px;
                    color: var(--ink2);
                    font-weight: 400;
                }
                
                .fmcg-case-study section { padding: 100px 0; }
                .fmcg-case-study section.alt { background: var(--off); border-top: 1px solid var(--ln); border-bottom: 1px solid var(--ln); }
                .fmcg-case-study .wide { width: 100%; }
                
                .fmcg-case-study .eyebrow { font-family: var(--mono); font-size: 12px; color: var(--brand); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
                .fmcg-case-study .eyebrow::after { content: ''; width: 24px; height: 1px; background: var(--brand-border); }
                .fmcg-case-study .eyebrow.lt { color: rgba(255,255,255,.3); }
                .fmcg-case-study .eyebrow.lt::after { background: rgba(255,255,255,.15); }
                .fmcg-case-study h2 { font-family: var(--sans); font-size: clamp(28px, 4vw, 46px); line-height: 1.1; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 18px; font-weight: 700; }
                .fmcg-case-study h2 em { font-style: italic; color: var(--ink4); font-weight: 600; }
                .fmcg-case-study h2.lt { color: #FFFFFF; }
                .fmcg-case-study h2.lt em { color: rgba(255,255,255,.4); }
                .fmcg-case-study .body-copy { font-size: 16px; color: var(--ink2); line-height: 1.9; font-weight: 300; max-width: 600px; }

                .fmcg-case-study .two-col { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 64px; align-items: start; margin-top: 40px; }
                .fmcg-case-study .context-quote { border-left: 2px solid var(--brand); padding: 24px 28px; background: var(--w); border-radius: 0 12px 12px 0; font-family: var(--serif); font-size: 20px; color: var(--ink2); line-height: 1.62; margin: 32px 0; font-style: italic; }
                .fmcg-case-study .context-quote cite { display: block; font-family: var(--sans); font-size: 13px; font-style: normal; color: var(--ink4); margin-top: 12px; }

                .fmcg-case-study .stakeholders-list { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
                .fmcg-case-study .stakeholder-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 20px; transition: all .2s; }
                .fmcg-case-study .stakeholder-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.05); border-color: var(--ln2); }
                .fmcg-case-study .sh-role { font-family: var(--mono); font-size: 10px; color: var(--gm); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px; font-weight: 600; }
                .fmcg-case-study .sh-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; color: var(--ink); }
                .fmcg-case-study .sh-desc { font-size: 13px; color: var(--ink3); line-height: 1.6; }

                .fmcg-case-study .pain-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1px;
                    background: var(--ln);
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    overflow: hidden;
                    margin-top: 48px;
                }
                .fmcg-case-study .pain-card {
                    background: var(--w);
                    padding: 28px 24px;
                    transition: background .2s;
                }
                .fmcg-case-study .pain-card:hover {
                    background: var(--off);
                }
                .fmcg-case-study .pain-n {
                    display: block;
                    font-family: var(--mono);
                    font-size: 11px;
                    color: var(--ink4);
                    letter-spacing: .06em;
                    margin-bottom: 12px;
                }
                .fmcg-case-study .pain-t {
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    line-height: 1.35;
                    color: var(--ink);
                }
                .fmcg-case-study .pain-b {
                    font-size: 13px;
                    color: var(--ink3);
                    line-height: 1.7;
                    margin: 0 0 14px;
                }
                .fmcg-case-study .pain-tag {
                    display: inline-block;
                    font-family: var(--mono);
                    font-size: 11px;
                    color: var(--brand);
                    background: var(--brand-light);
                    padding: 3px 9px;
                    border-radius: 6px;
                    font-weight: 500;
                }
                .fmcg-case-study .chaos-strip {
                    grid-column: 1 / -1;
                    padding: 24px 28px;
                    background: var(--off);
                    border-top: 1px solid var(--ln);
                }
                .fmcg-case-study .chaos-label {
                    font-family: var(--mono);
                    font-size: 11px;
                    letter-spacing: .08em;
                    text-transform: uppercase;
                    color: var(--ink4);
                    margin-bottom: 14px;
                }
                .fmcg-case-study .chaos-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .fmcg-case-study .chaos-tag {
                    display: inline-flex;
                    align-items: center;
                    border: 1px solid;
                    border-radius: 999px;
                    padding: 5px 11px;
                    font-family: var(--mono);
                    font-size: 10px;
                    line-height: 1;
                }
                .fmcg-case-study .chaos-tag.risk {
                    border-color: rgba(220,38,38,.12);
                    color: var(--rm);
                    background: var(--rbg);
                }
                .fmcg-case-study .chaos-tag.warn {
                    border-color: rgba(217,119,6,.12);
                    color: var(--am);
                    background: var(--abg);
                }
                .fmcg-case-study .chaos-tag.neutral {
                    border-color: var(--ln);
                    color: var(--ink3);
                    background: var(--off2);
                }

                @media(max-width:1000px) {
                    .fmcg-case-study .two-col { grid-template-columns: 1fr; gap: 40px; }
                    .fmcg-case-study .pain-grid { grid-template-columns: 1fr 1fr; }
                }
                @media(max-width:600px) {
                    .fmcg-case-study .pain-grid { grid-template-columns: 1fr; }
                }
                
                .fmcg-case-study .arch-wrap { border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; background: var(--off); margin-top: 0; }
                
                .fmcg-case-study .feat-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: var(--ln); border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 48px; }
                .fmcg-case-study .feat { background: var(--w); padding: 26px 24px; transition: background .2s; }
                .fmcg-case-study .feat:hover { background: var(--off); }
                .fmcg-case-study .feat-n { font-family: var(--mono); font-size: 11px; color: var(--brand); letter-spacing: 0.08em; margin-bottom: 12px; font-weight: 500; }
                .fmcg-case-study .feat-t { font-size: 16px; font-weight: 500; color: var(--ink); margin-bottom: 8px; line-height: 1.35; }
                .fmcg-case-study .feat-d { font-size: 14px; color: var(--ink3); line-height: 1.78; font-weight: 300; }
                .fmcg-case-study .feat-tag { display: inline-block; margin-top: 14px; font-family: var(--mono); font-size: 11px; color: var(--brand); background: var(--brand-light); padding: 3px 9px; border-radius: 6px; font-weight: 500; }
                
                .fmcg-case-study .ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px; }
                .fmcg-case-study .ba-card { border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; }
                .fmcg-case-study .ba-head { padding: 12px 18px; border-bottom: 1px solid var(--ln); display: flex; align-items: center; gap: 9px; }
                .fmcg-case-study .ba-head.before { background: #fff7f7; }
                .fmcg-case-study .ba-head.after { background: #f5fbf6; }
                .fmcg-case-study .ba-dot { width: 7px; height: 7px; border-radius: 50%; }
                .fmcg-case-study .ba-head.before .ba-dot { background: var(--rm); }
                .fmcg-case-study .ba-head.after .ba-dot { background: var(--gm); }
                .fmcg-case-study .ba-lbl { font-family: var(--mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-weight: 500; }
                .fmcg-case-study .ba-head.before .ba-lbl { color: var(--rm); }
                .fmcg-case-study .ba-head.after .ba-lbl { color: var(--gdk); }
                .fmcg-case-study .ba-row { display: flex; gap: 11px; padding: 12px 18px; border-bottom: 1px solid var(--ln); font-size: 14px; color: var(--ink2); line-height: 1.65; font-weight: 300; }
                .fmcg-case-study .ba-row:last-child { border-bottom: none; }
                .fmcg-case-study .ba-mark { font-family: var(--mono); font-size: 12px; flex-shrink: 0; margin-top: 2px; }
                .fmcg-case-study .bm-bad { color: var(--rm); }
                .fmcg-case-study .bm-good { color: var(--gm); }

                .fmcg-case-study .g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; }

                .fmcg-case-study .tech-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 40px; }
                .fmcg-case-study .tech-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 24px; transition: background .2s, border-color .2s; }
                .fmcg-case-study .tech-card:hover { background: var(--off); border-color: var(--ln2); }
                .fmcg-case-study .tech-layer { font-family: var(--mono); font-size: 10px; color: var(--brand); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 10px; font-weight: 500; }
                .fmcg-case-study .tech-title { font-size: 15px; font-weight: 600; letter-spacing: -.01em; margin-bottom: 12px; color: var(--ink); }
                .fmcg-case-study .tech-items { display: flex; flex-direction: column; gap: 8px; }
                .fmcg-case-study .tech-item { font-size: 13px; font-weight: 300; color: var(--ink3); display: flex; align-items: flex-start; gap: 8px; line-height: 1.55; }
                .fmcg-case-study .tech-item::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--brand); flex-shrink: 0; display: block; margin-top: 6px; }
                @media(max-width:900px){ .fmcg-case-study .tech-grid { grid-template-columns: 1fr 1fr; gap: 16px; } }
                @media(max-width:600px){ .fmcg-case-study .tech-grid { grid-template-columns: 1fr; } }

                .fmcg-case-study .alerts { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 48px; }
                .fmcg-case-study .alert { border-radius: 8px; padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--w); border: 1px solid var(--ln); }
                .fmcg-case-study .al-icon { font-family: var(--mono); font-size: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; }
                .fmcg-case-study .alert.danger .al-icon { color: var(--rm); background: var(--rbg); border: 1px solid rgba(220, 38, 38, 0.1); }
                .fmcg-case-study .alert.warn .al-icon { color: var(--am); background: var(--abg); border: 1px solid rgba(217, 119, 6, 0.1); }
                .fmcg-case-study .alert.info .al-icon { color: var(--bm); background: var(--bbg); border: 1px solid rgba(37, 99, 235, 0.1); }
                .fmcg-case-study .al-title { font-size: 14px; color: var(--ink2); font-weight: 500; line-height: 1.5; letter-spacing: -0.01em; }

                .fmcg-case-study .impact-stat { padding: 32px 26px; border-right: 1px solid var(--ln); }
                .fmcg-case-study .impact-stat:last-child { border-right: none; }
                .fmcg-case-study .stat-num { font-family: var(--sans); font-size: 46px; line-height: 1; color: var(--ink); margin-bottom: 5px; font-weight: 800; letter-spacing: -0.05em; }
                .fmcg-case-study .stat-unit { font-family: var(--mono); font-size: 11px; color: var(--brand); letter-spacing: 0.08em; display: block; margin-bottom: 6px; font-weight: 500; text-transform: uppercase; }
                .fmcg-case-study .stat-desc { font-size: 14px; color: var(--ink3); line-height: 1.65; font-weight: 300; }

                .fmcg-case-study .learning-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
                .fmcg-case-study .learning-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 28px; display: flex; gap: 18px; transition: all .2s; }
                .fmcg-case-study .learning-card:hover { background: var(--off); border-color: var(--ln2); }
                .fmcg-case-study .lc-num { font-size: 38px; font-weight: 800; color: var(--ln2); line-height: 1; flex-shrink: 0; min-width: 46px; letter-spacing: -.04em; }
                .fmcg-case-study .lc-cat { font-family: var(--mono); font-size: 9px; color: var(--brand); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 6px; }
                .fmcg-case-study .lc-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; letter-spacing: -.01em; }
                .fmcg-case-study .lc-body { font-size: 13px; font-weight: 300; color: var(--ink3); line-height: 1.7; margin-bottom: 10px; }
                .fmcg-case-study .lc-rule { font-family: var(--mono); font-size: 10px; color: var(--gm); background: var(--gbg); padding: 5px 10px; border-radius: 4px; letter-spacing: .04em; display: inline-block; }

                .fmcg-case-study .sk-note { margin-top: 24px; padding: 18px 24px; border: 1px solid var(--ln); border-left: 3px solid var(--brand); border-radius: 0 8px 8px 0; background: var(--off); font-size: 14px; color: var(--ink2); line-height: 1.7; font-weight: 300; }

                .fmcg-case-study .chart-card { border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 14px; }
                .fmcg-case-study .cc-head { padding: 13px 18px; border-bottom: 1px solid var(--ln); display: flex; justify-content: space-between; align-items: center; }
                .fmcg-case-study .cc-t { font-size: 14px; font-weight: 500; color: var(--ink); }
                .fmcg-case-study .cc-s { font-family: var(--mono); font-size: 12px; color: var(--ink4); }
                .fmcg-case-study .cc-body { padding: 16px 18px; height: 196px; position: relative; }

                .fmcg-case-study .workflow-tabs { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 42px; }
                .fmcg-case-study .workflow-tab {
                    padding: 12px 18px;
                    border-radius: 999px;
                    border: 1px solid var(--ln);
                    background: var(--w);
                    color: var(--ink2);
                    font-family: var(--sans);
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    transition: background .2s, border-color .2s, color .2s;
                }
                .fmcg-case-study .workflow-tab:hover { background: var(--off); border-color: var(--ln2); }
                .fmcg-case-study .workflow-tab.is-active {
                    background: var(--brand-light);
                    border-color: var(--brand-border);
                    color: var(--brand);
                }
                .fmcg-case-study .workflow-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
                    gap: 20px;
                    margin-top: 28px;
                    align-items: start;
                }
                .fmcg-case-study .state-machine-card {
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    overflow: hidden;
                    background: var(--w);
                }
                .fmcg-case-study .state-machine-head {
                    padding: 16px 20px;
                    border-bottom: 1px solid var(--ln);
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    color: var(--ink);
                }
                .fmcg-case-study .state-machine-row {
                    display: grid;
                    grid-template-columns: 180px 1fr;
                    gap: 18px;
                    align-items: start;
                    padding: 16px 20px;
                    border-bottom: 1px solid var(--ln);
                }
                .fmcg-case-study .state-machine-row:last-child { border-bottom: none; }
                .fmcg-case-study .state-machine-arrow {
                    padding: 12px 20px;
                    border-bottom: 1px solid var(--ln);
                    background: var(--off);
                    font-family: var(--mono);
                    font-size: 11px;
                    line-height: 1.75;
                    letter-spacing: 0.04em;
                    color: var(--ink3);
                }
                .fmcg-case-study .state-pill {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 146px;
                    padding: 8px 12px;
                    border-radius: 999px;
                    border: 1px solid transparent;
                    font-family: var(--mono);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .fmcg-case-study .tone-draft { background: #f8fafc; border-color: #e2e8f0; color: #475569; }
                .fmcg-case-study .tone-pending { background: #fff7ed; border-color: #fed7aa; color: #c2410c; }
                .fmcg-case-study .tone-review { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
                .fmcg-case-study .tone-approved { background: #f0fdf4; border-color: #bbf7d0; color: #15803d; }
                .fmcg-case-study .tone-rejected { background: #fef2f2; border-color: #fecaca; color: #b91c1c; }
                .fmcg-case-study .tone-locked { background: #f8fafc; border-color: #cbd5e1; color: #0f172a; }
                .fmcg-case-study .tone-issued { background: #eef2ff; border-color: #c7d2fe; color: #4338ca; }
                .fmcg-case-study .tone-expired { background: #fff1f2; border-color: #fecdd3; color: #be123c; }
                .fmcg-case-study .tone-archived { background: #f8fafc; border-color: #e2e8f0; color: #64748b; }
                .fmcg-case-study .tone-exception { background: #fff7ed; border-color: #fdba74; color: #c2410c; }
                .fmcg-case-study .state-machine-detail {
                    font-size: 14px;
                    line-height: 1.8;
                    color: var(--ink3);
                    font-weight: 300;
                }
                .fmcg-case-study .workflow-rules { display: grid; gap: 16px; }
                .fmcg-case-study .workflow-rule {
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    background: var(--w);
                    padding: 22px;
                }
                .fmcg-case-study .workflow-rule-type {
                    display: inline-flex;
                    align-items: center;
                    padding: 4px 10px;
                    border-radius: 999px;
                    border: 1px solid transparent;
                    font-family: var(--mono);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .fmcg-case-study .workflow-rule-type.tone-good { background: #f0fdf4; border-color: #bbf7d0; color: #15803d; }
                .fmcg-case-study .workflow-rule-type.tone-alert { background: #fff7ed; border-color: #fed7aa; color: #c2410c; }
                .fmcg-case-study .workflow-rule-type.tone-risk { background: #fef2f2; border-color: #fecaca; color: #b91c1c; }
                .fmcg-case-study .workflow-rule-title {
                    margin-top: 14px;
                    font-size: 15px;
                    line-height: 1.5;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    color: var(--ink);
                }
                .fmcg-case-study .workflow-rule-body {
                    margin-top: 10px;
                    font-size: 13px;
                    line-height: 1.75;
                    font-weight: 300;
                    color: var(--ink3);
                }

                .fmcg-case-study .flow-table-wrap {
                    margin-top: 42px;
                    overflow-x: auto;
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    background: var(--w);
                }
                .fmcg-case-study .flow-table {
                    width: 100%;
                    min-width: 1050px;
                    border-collapse: collapse;
                    table-layout: fixed;
                }
                .fmcg-case-study .flow-table th,
                .fmcg-case-study .flow-table td {
                    border-right: 1px solid var(--ln);
                    border-bottom: 1px solid var(--ln);
                    padding: 18px 16px;
                    vertical-align: top;
                }
                .fmcg-case-study .flow-table th:last-child,
                .fmcg-case-study .flow-table td:last-child { border-right: none; }
                .fmcg-case-study .flow-table tbody tr:last-child td { border-bottom: none; }
                .fmcg-case-study .flow-table th {
                    background: var(--off);
                    font-size: 13px;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    color: var(--ink);
                    text-align: left;
                }
                .fmcg-case-study .flow-layer {
                    width: 110px;
                    font-family: var(--mono);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--brand);
                    background: var(--off);
                }
                .fmcg-case-study .flow-cell {
                    font-size: 13px;
                    line-height: 1.75;
                    font-weight: 300;
                    color: var(--ink3);
                }
                .fmcg-case-study .flow-cell.tone-brand { background: var(--brand-light); }
                .fmcg-case-study .flow-cell.tone-warn { background: var(--abg); }
                .fmcg-case-study .flow-cell-label {
                    display: block;
                    margin-bottom: 8px;
                    font-family: var(--mono);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--brand);
                }

                .fmcg-case-study .schema-box {
                    margin-top: 28px;
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    overflow: hidden;
                    background: var(--w);
                }
                .fmcg-case-study .schema-head {
                    padding: 16px 20px;
                    border-bottom: 1px solid var(--ln);
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--ink);
                    letter-spacing: -0.01em;
                }
                .fmcg-case-study .schema-body {
                    padding: 20px;
                    background: linear-gradient(180deg, rgba(248, 250, 252, 0.7) 0%, rgba(255, 255, 255, 1) 100%);
                }
                .fmcg-case-study .schema-legend {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 18px;
                }
                .fmcg-case-study .schema-legend-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 7px 10px;
                    border: 1px solid var(--ln);
                    border-radius: 999px;
                    background: var(--w);
                    font-family: var(--mono);
                    font-size: 10px;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--ink3);
                }
                .fmcg-case-study .schema-legend-swatch {
                    width: 10px;
                    height: 10px;
                    border-radius: 2px;
                    flex-shrink: 0;
                }
                .fmcg-case-study .schema-grid {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 14px;
                }
                .fmcg-case-study .schema-card {
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    overflow: hidden;
                    background: var(--w);
                }
                .fmcg-case-study .schema-card-head {
                    padding: 12px 14px;
                    font-family: var(--mono);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    color: #fff;
                }
                .fmcg-case-study .schema-card-head.tone-core { background: var(--brand); }
                .fmcg-case-study .schema-card-head.tone-control { background: var(--gm); }
                .fmcg-case-study .schema-card-head.tone-reference { background: var(--am); }
                .fmcg-case-study .schema-fields { padding: 6px 14px 10px; }
                .fmcg-case-study .schema-field {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 10px 0;
                    border-bottom: 1px solid var(--ln);
                }
                .fmcg-case-study .schema-field:last-child { border-bottom: none; }
                .fmcg-case-study .schema-field-name {
                    font-size: 13px;
                    color: var(--ink2);
                    line-height: 1.5;
                }
                .fmcg-case-study .schema-field-name.key-fk { color: var(--am); }
                .fmcg-case-study .schema-field-name.key-pk { color: var(--brand); font-weight: 600; }
                .fmcg-case-study .schema-field-type {
                    font-family: var(--mono);
                    font-size: 10px;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--ink4);
                    white-space: nowrap;
                }

                .fmcg-case-study .compliance-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-top: 40px;
                }
                .fmcg-case-study .compliance-card {
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    background: var(--w);
                    overflow: hidden;
                }
                .fmcg-case-study .compliance-card:hover { border-color: var(--ln2); }
                .fmcg-case-study .compliance-head {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 18px 20px;
                    border-bottom: 1px solid var(--ln);
                    background: var(--off);
                }
                .fmcg-case-study .compliance-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--brand-light);
                    font-size: 18px;
                    flex-shrink: 0;
                }
                .fmcg-case-study .compliance-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--ink);
                    letter-spacing: -0.01em;
                }
                .fmcg-case-study .compliance-body {
                    padding: 20px;
                    display: grid;
                    gap: 14px;
                }
                .fmcg-case-study .compliance-check {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    font-size: 13px;
                    line-height: 1.75;
                    font-weight: 300;
                    color: var(--ink3);
                }
                .fmcg-case-study .compliance-check-mark {
                    color: var(--gm);
                    font-weight: 700;
                    margin-top: 2px;
                    flex-shrink: 0;
                }

                .fmcg-case-study .audit-sample {
                    margin-top: 24px;
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    overflow: hidden;
                    background: var(--w);
                }
                .fmcg-case-study .audit-head {
                    padding: 16px 20px;
                    border-bottom: 1px solid var(--ln);
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--ink);
                    letter-spacing: -0.01em;
                }
                .fmcg-case-study .audit-list { padding: 2px; }
                .fmcg-case-study .audit-entry {
                    display: grid;
                    grid-template-columns: 132px 156px 148px 1fr;
                    gap: 14px;
                    align-items: start;
                    padding: 14px 16px;
                    border-bottom: 1px solid var(--ln);
                }
                .fmcg-case-study .audit-entry:last-child { border-bottom: none; }
                .fmcg-case-study .audit-ts,
                .fmcg-case-study .audit-actor {
                    font-family: var(--mono);
                    font-size: 11px;
                    line-height: 1.7;
                    color: var(--ink4);
                }
                .fmcg-case-study .audit-actor { color: var(--ink2); }
                .fmcg-case-study .audit-change {
                    font-size: 13px;
                    line-height: 1.75;
                    color: var(--ink3);
                    font-weight: 300;
                }
                .fmcg-case-study .audit-event {
                    display: inline-flex;
                    align-items: center;
                    padding: 6px 10px;
                    border-radius: 999px;
                    border: 1px solid transparent;
                    font-family: var(--mono);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .fmcg-case-study .audit-event.tone-lock { background: var(--off); border-color: var(--ln2); color: var(--ink2); }
                .fmcg-case-study .audit-event.tone-approve { background: #f0fdf4; border-color: #bbf7d0; color: #15803d; }
                .fmcg-case-study .audit-event.tone-update { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
                .fmcg-case-study .audit-event.tone-create { background: var(--brand-light); border-color: var(--brand-border); color: var(--brand); }
                .fmcg-case-study .audit-event.tone-expire { background: #fff1f2; border-color: #fecdd3; color: #be123c; }

                .fmcg-case-study .cta-section {
                    padding: 110px 0 120px;
                    background:
                        radial-gradient(circle at top, rgba(79, 70, 229, 0.08), transparent 42%),
                        linear-gradient(180deg, var(--off) 0%, var(--w) 100%);
                    text-align: center;
                }
                .fmcg-case-study .cta-inner {
                    max-width: 680px;
                    margin: 0 auto;
                }
                .fmcg-case-study .cta-kicker {
                    display: inline-flex;
                    align-items: center;
                    gap: 14px;
                    font-family: var(--mono);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: var(--brand);
                    margin-bottom: 24px;
                }
                .fmcg-case-study .cta-kicker::before,
                .fmcg-case-study .cta-kicker::after {
                    content: '';
                    display: block;
                    width: 32px;
                    height: 1.5px;
                    background: var(--brand);
                    opacity: 0.45;
                }
                .fmcg-case-study .cta-heading {
                    font-size: clamp(42px, 5vw, 70px);
                    line-height: 1.04;
                    letter-spacing: -0.04em;
                    font-weight: 800;
                    color: var(--ink);
                    margin-bottom: 22px;
                }
                .fmcg-case-study .cta-heading em { font-style: italic; color: var(--brand); }
                .fmcg-case-study .cta-sub {
                    font-size: 15px;
                    line-height: 1.82;
                    font-weight: 300;
                    color: var(--ink3);
                    margin: 0 auto 38px;
                    max-width: 620px;
                }
                .fmcg-case-study .cta-btns {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .fmcg-case-study .cta-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 48px;
                    padding: 0 18px;
                    border-radius: 999px;
                    border: 1px solid var(--ln);
                    font-size: 13px;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    text-decoration: none;
                    transition: background .2s, border-color .2s, color .2s, transform .2s;
                }
                .fmcg-case-study .cta-btn:hover { transform: translateY(-1px); }
                .fmcg-case-study .cta-btn.primary {
                    background: var(--brand);
                    border-color: var(--brand);
                    color: #fff;
                }
                .fmcg-case-study .cta-btn.primary:hover { background: var(--brand-hover); border-color: var(--brand-hover); }
                .fmcg-case-study .cta-btn.secondary {
                    background: var(--w);
                    color: var(--ink2);
                }
                .fmcg-case-study .cta-btn.secondary:hover {
                    background: var(--off);
                    border-color: var(--ln2);
                }
                
                .fmcg-case-study .fade {
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity .6s ease, transform .6s ease;
                    will-change: opacity, transform;
                }
                .fmcg-case-study .fade.in {
                    opacity: 1;
                    transform: none;
                }
                .fmcg-case-study .d1 { transition-delay: .1s; }
                .fmcg-case-study .d2 { transition-delay: .2s; }
                .fmcg-case-study .d3 { transition-delay: .3s; }
                .fmcg-case-study .d4 { transition-delay: .4s; }
                
                .fmcg-case-study .hero-visual {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: 520px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .fmcg-case-study .structure-container {
                   position: relative;
                   width: 100%;
                   max-width: 580px;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   animation: float-arch 15s ease-in-out infinite;
                }
                @keyframes float-arch {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .fmcg-case-study .structure-svg {
                    width: 100%;
                    height: auto;
                    display: block;
                    overflow: visible;
                }
                @keyframes dispatch-anim {
                    0%, 15% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
                    40%, 60% { transform: translateY(-120px) translateX(40px) scale(0.9); opacity: 0; }
                    70% { transform: translateY(-40px) translateX(0) scale(0.95); opacity: 0; }
                    85%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
                }
                .fmcg-case-study .dispatched-cube {
                    animation: dispatch-anim 6s cubic-bezier(0.25, 1, 0.5, 1) infinite;
                }

                @media(max-width:991px){
                    .fmcg-case-study .wfvwp-hero__copy-col {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                }
                
                @media(max-width:900px){
                    .fmcg-case-study section { padding: 80px 0; }
                    .fmcg-case-study .prob-grid, .fmcg-case-study .feat-grid, .fmcg-case-study .ba-grid { grid-template-columns: 1fr; gap: 32px; }
                    .fmcg-case-study .alerts, .fmcg-case-study .g4 { grid-template-columns: 1fr; }
                    .fmcg-case-study .impact-stat { border-right: none; border-bottom: 1px solid var(--ln); }
                    .fmcg-case-study h1 { font-size: clamp(38px, 10vw, 60px); }
                    .fmcg-case-study #hero.wfvwp-hero-section { padding: var(--wfvwp-hero-top-space) 0 var(--wfvwp-section-space-sm); }
                    .fmcg-case-study .wfvwp-hero__heading { max-width: none; font-size: var(--wfvwp-title-size); }
                    .fmcg-case-study .wfvwp-hero__body { font-size: var(--wfvwp-body-size); }
                    .fmcg-case-study .hero-meta { grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; border-top: none; padding-top: 0; }
                    .fmcg-case-study .hm { border-right: none; margin-right: 0; padding-right: 0; border-bottom: 1px solid var(--ln); padding-bottom: 14px; }
                    .fmcg-case-study .hero-inner { grid-template-columns: 1fr; gap: 48px; }
                    .fmcg-case-study #hero { padding: 100px 0 60px; min-height: auto; }
                    .fmcg-case-study .hero-visual { min-height: 400px; }
                    .fmcg-case-study .tech-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
                    .fmcg-case-study .learning-grid { grid-template-columns: 1fr 1fr; }
                    .fmcg-case-study .workflow-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .state-machine-row { grid-template-columns: 1fr; gap: 12px; }
                    .fmcg-case-study .schema-grid { grid-template-columns: 1fr 1fr; }
                    .fmcg-case-study .compliance-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .audit-entry { grid-template-columns: 1fr; gap: 8px; }
                    .fmcg-case-study .cta-section { padding: 90px 0 100px; }
                }
                @media(max-width:600px){
                    .fmcg-case-study #hero.wfvwp-hero-section { padding: var(--wfvwp-hero-top-space) 0 var(--wfvwp-section-space-sm); }
                    .fmcg-case-study .wfvwp-hero__heading { max-width: none; font-size: var(--wfvwp-title-size); }
                    .fmcg-case-study .wfvwp-hero__body { font-size: var(--wfvwp-body-size); }
                    .fmcg-case-study .tech-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .learning-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .g4 { grid-template-columns: 1fr; }
                    .fmcg-case-study .alerts { grid-template-columns: 1fr; }
                    .fmcg-case-study .workflow-tab { width: 100%; text-align: left; }
                    .fmcg-case-study .state-pill { min-width: 0; width: 100%; justify-content: flex-start; }
                    .fmcg-case-study .schema-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .cta-btn { width: 100%; }
                }
                @media(max-width:767px){
                    .fmcg-case-study .wfvwp-overview-col { flex-basis: 100%; max-width: 100%; }
                    .fmcg-case-study .wfvwp-overview-row { row-gap: 1.25rem; }
                }
            `}</style>

            <NativeWebflowVsWordpressHero />

            <main id="main" className="wfvwp-page-main">
                <section className="wfvwp-overview-section">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wfvwp-overview-row">
                        <div className="wfvwp-overview-col">
                            <h2 className="wfvwp-overview-heading">Build with more power, creativity, and agility</h2>
                        </div>
                        <div className="wfvwp-overview-col">
                            <div className="wfvwp-overview-copy">
                                <p>
                                    WordPress websites require engineering time to maintain and they don’t give marketing or design the autonomy to build their own designs, run experiments, or personalize content. Unoptimized content slowly rolls out — leaving money on the table — and your total cost of ownership inflates as engineering spends more and more hours just keeping the lights on.
                                </p>
                                <p>
                                    In Webflow’s visual-first, composable CMS, designers, developers, and marketers can come together to build, manage, and optimize websites that can drive conversions and fuel business growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

            <NativeWebflowVsWordpressCmsTabs />

            <NativeWebflowVsWordpressWhySection />

            <NativeWebflowVsWordpressMigrationCta />

            <NativeWebflowVsWordpressCustomersSection />

            <NativeWebflowVsWordpressComparisonTable />

            <NativeWebflowVsWordpressBusinessImpactSection />

            <NativeWebflowVsWordpressG2Section />

            <NativeWebflowVsWordpressFaqSection />

            <NativeWebflowVsWordpressScheduleDemoSection />
            </main>
        </div>
    );
};

export default HRDocsCaseStudy;



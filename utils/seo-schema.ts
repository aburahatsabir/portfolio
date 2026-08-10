/**
 * SEO Schema Markup Utilities
 * Generates JSON-LD structured data for rich search results
 */

interface PersonSchema {
    '@context': string;
    '@type': string;
    name: string;
    jobTitle: string;
    description: string;
    url: string;
    sameAs: string[];
    knowsAbout: string[];
    email?: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQPageSchema {
    '@context': string;
    '@type': string;
    mainEntity: Array<{
        '@type': string;
        name: string;
        acceptedAnswer: {
            '@type': string;
            text: string;
        };
    }>;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbListSchema {
    '@context': string;
    '@type': string;
    itemListElement: Array<{
        '@type': string;
        position: number;
        name: string;
        item: string;
    }>;
}

interface BlogPostingSchema {
    '@context': string;
    '@type': string;
    headline: string;
    description: string;
    author: {
        '@type': string;
        name: string;
    };
    datePublished: string;
    dateModified: string;
    image?: string;
    publisher: {
        '@type': string;
        name: string;
    };
}

interface ArticleSchema {
    '@context': string;
    '@type': string;
    headline: string;
    description: string;
    author: {
        '@type': string;
        name: string;
    };
    datePublished?: string;
    image?: string;
    publisher: {
        '@type': string;
        name: string;
    };
}

interface WebSiteSchema {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    url: string;
    potentialAction: {
        '@type': string;
        target: {
            '@type': string;
            urlTemplate: string;
        };
        'query-input': string;
    };
}


/**
 * Generate Person schema for professional profile
 */
export function generatePersonSchema(): PersonSchema {
    const baseUrl = 'https://aburahatsabir.vercel.app';

    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Abu Rahat Sabir',
        jobTitle: 'Executive Architect | Systems Governance & Operations',
        description: 'Strategic portfolio of a Corporate Operations Executive specializing in enterprise architecture, automation, and institutional governance.',
        url: baseUrl,
        sameAs: [
            'https://linkedin.com/in/aburahatsabir78',
            'https://github.com/aburahatsabir',
            'https://x.com/AbuRahatsabir'
        ],
        knowsAbout: [
            // Core Competencies (Executive Search Terms)
            'Enterprise Architecture',
            'Systems Governance',
            'Operational Automation',
            'Executive Administration',
            'C-Suite Support',

            // Technical Skills
            'VBA Development',
            'Google Apps Script',
            'Excel Automation',
            'Process Automation',
            'Workflow Optimization',

            // Domain Expertise
            'Administrative Operations',
            'Process Optimization',
            'Data Architecture',
            'Financial Systems',
            'HR Systems',
            'ERP Systems',
            'Operational Excellence',

            // Governance & Compliance
            'Audit Compliance',
            'Data Integrity',
            'Institutional Governance',
            'Risk Management',

            // Industry Applications
            'FMCG Operations',
            'Healthcare Logistics',
            'Trade Finance',
            'Multi-Entity Payroll'
        ],
        email: 'aburahatsabir178@gmail.com'
    };
}

/**
 * Generate WebSite schema for homepage and site-wide SEO
 */
export function generateWebSiteSchema(): WebSiteSchema {
    const baseUrl = 'https://aburahatsabir.vercel.app';

    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Abu Rahat Sabir - Executive Architect',
        description: 'Strategic portfolio of a Corporate Operations Executive specializing in enterprise architecture, automation, and institutional governance.',
        url: baseUrl,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/work?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    };
}


/**
 * Generate FAQPage schema for About page
 */
export function generateFAQSchema(): FAQPageSchema {
    const faqs: FAQItem[] = [
        {
            question: 'Who are you?',
            answer: 'Abu Rahat Sabir — I build zero-cost automation systems for operations teams. Based in Dhaka, work globally. B.S.S Economics (CGPA 3.21), 7+ years managing operations at Prominent Tec, Dreams IT Park, and I-Con Computer. Certified in AWS Cloud, Google Cloud, Cybersecurity, and Advanced Excel. I turn manual chaos into automated systems using Google Sheets, Apps Script, and Excel—no expensive software needed.'
        },
        {
            question: 'What can you build?',
            answer: 'Systems delivered: FMCG Distribution ERP (300+ items/day, 80% faster invoicing), Healthcare Patient Management (3,100+ patients, 49 hospitals, zero failures), Multi-Entity Payroll (80+ employees, 9 entities, 5 days to 2 hours), Trade Finance (15% revenue recovery), HR Compliance (Bangladesh Labour Act 2006). Tools: Google Sheets, Apps Script, Excel VBA, LaTeX. Why spreadsheets? You already own them—no vendor lock-in, no licenses, deploy in weeks.'
        },
        {
            question: 'How do you work?',
            answer: 'Process: Shadow your team 3-5 days, build prototype in 2 weeks, deploy in phases, train your team, provide 90-day support. Style: Weekly deliverables, detailed documentation, async updates. Values: You own the code 100%. I train your team to maintain it. Best fit: Data-driven leaders, scaling operations, governance rigor.'
        },
        {
            question: 'What results do you deliver?',
            answer: 'Time saved: 450+ hrs/year, 80% faster invoicing, 5 days to 2 hours payroll cycle. Errors eliminated: 0% failures (3,100 patients), 100% payroll accuracy, 98% order precision. Money recovered: 15% revenue gain, Taka 3L monthly leakage stopped, 100% commission visibility. Compliance: Zero audit findings, systems running 2+ years post-deployment.'
        },
        {
            question: 'How do I hire you?',
            answer: 'Contact: aburahatsabir.com/contact or aburahatsabir178@gmail.com (24-48 hour response). Pricing: Sprint projects $5K-$20K (4-12 weeks), Retainer $2K-$5K/month. Process: Submit inquiry, 30-min call, I show 2-3 high-impact opportunities, you decide. Availability: 10-20 hrs/week, selective (10x ROI minimum).'
        }
    ];

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbListSchema {
    const baseUrl = 'https://aburahatsabir.vercel.app';

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
        }))
    };
}

/**
 * Generate BlogPosting schema for blog articles
 */
export function generateBlogPostingSchema(
    title: string,
    description: string,
    datePublished: string,
    imageUrl?: string,
    dateModified?: string
): BlogPostingSchema {
    const baseUrl = 'https://aburahatsabir.vercel.app';

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        author: {
            '@type': 'Person',
            name: 'Abu Rahat Sabir'
        },
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        image: imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`) : undefined,
        publisher: {
            '@type': 'Person',
            name: 'Abu Rahat Sabir'
        }
    };
}

/**
 * Generate Article schema for case studies and projects
 */
export function generateArticleSchema(
    title: string,
    description: string,
    imageUrl?: string,
    datePublished?: string
): ArticleSchema {
    const baseUrl = 'https://aburahatsabir.vercel.app';

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        author: {
            '@type': 'Person',
            name: 'Abu Rahat Sabir'
        },
        datePublished: datePublished || new Date().toISOString().split('T')[0],
        image: imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`) : undefined,
        publisher: {
            '@type': 'Person',
            name: 'Abu Rahat Sabir'
        }
    };
}

/**
 * Inject JSON-LD schema into page head
 */
export function injectSchema(schema: object, id: string): void {
    // Remove existing schema with this ID
    const existing = document.getElementById(id);
    if (existing) {
        existing.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
}

/**
 * Remove schema from page head
 */
export function removeSchema(id: string): void {
    const existing = document.getElementById(id);
    if (existing) {
        existing.remove();
    }
}

/**
 * Generate Organization schema for brand credibility
 */
export function generateOrganizationSchema() {
    const baseUrl = 'https://aburahatsabir.vercel.app';

    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Abu Rahat Sabir Consulting',
        url: baseUrl,
        logo: `${baseUrl}/images/icon-512.webp`,
        sameAs: [
            'https://linkedin.com/in/aburahatsabir78',
            'https://github.com/aburahatsabir'
        ],
        founder: {
            '@type': 'Person',
            name: 'Abu Rahat Sabir'
        },
        description: 'Professional consulting services specializing in operations automation, Google Sheets development, and enterprise process optimization.'
    };
}

/**
 * Generate Service schema for SEO targeting
 */
export function generateServiceSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Google Sheets & Operations Automation',
        provider: {
            '@type': 'Person',
            name: 'Abu Rahat Sabir'
        },
        areaServed: 'Global',
        serviceType: 'Business Process Automation',
        description: 'Custom automation for Google Sheets, Apps Script, month-end close processes, and operational workflows. Proven results: 80%+ time savings for finance and operations teams.',
        offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: '5000-20000',
            description: 'Custom automation solutions including Google Sheets development, Apps Script systems, and operational workflow optimization'
        }
    };
}

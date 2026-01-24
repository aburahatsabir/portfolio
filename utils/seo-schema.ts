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

/**
 * Generate Person schema for professional profile
 */
export function generatePersonSchema(): PersonSchema {
    const baseUrl = 'https://abu-rahat-sabir.github.io';

    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Abu Rahat Sabir',
        jobTitle: 'Executive Architect | Systems Governance & Operations',
        description: 'Strategic portfolio of a Corporate Operations Executive specializing in enterprise architecture, automation, and institutional governance.',
        url: baseUrl,
        sameAs: [
            'https://linkedin.com/in/abu-rahat-sabir',
            'https://github.com/abu-rahat-sabir'
        ],
        knowsAbout: [
            'Enterprise Architecture',
            'Systems Governance',
            'Operational Automation',
            'VBA Development',
            'Google Apps Script',
            'Administrative Operations',
            'Process Optimization',
            'Data Architecture',
            'Financial Systems',
            'HR Systems'
        ]
    };
}

/**
 * Generate FAQPage schema for About page
 */
export function generateFAQSchema(): FAQPageSchema {
    const faqs: FAQItem[] = [
        {
            question: 'What is your core expertise?',
            answer: 'I specialize in enterprise architecture, administrative automation, and operational governance. My work focuses on building zero-cost ERP systems, automating complex workflows, and creating audit-ready governance frameworks using tools like VBA, Apps Script, and advanced Excel.'
        },
        {
            question: 'What types of systems do you build?',
            answer: 'I architect production-grade operational systems including: FMCG distribution ERPs, medical operations control systems, multi-entity payroll engines, trade finance ledgers, and HR documentation frameworks. All systems prioritize data integrity, audit compliance, and zero-error execution.'
        },
        {
            question: 'What industries have you worked in?',
            answer: 'I have delivered systems across multiple sectors including FMCG wholesale distribution, international healthcare logistics, corporate finance, trade finance, and HR operations. My solutions are industry-agnostic, focusing on relational data architecture and governance principles.'
        },
        {
            question: 'How do you approach automation projects?',
            answer: 'I follow an "Architecture Over Apps" philosophy, building logic kernels that organizations own completely. This ensures institutional sovereignty and prevents vendor lock-in. Every system includes idempotency guarantees, audit trails, and deterministic execution logic.'
        },
        {
            question: 'What is your availability for new projects?',
            answer: 'I am currently serving as Executive – Administration at Prominent Tec while selectively taking on strategic consulting engagements. I prioritize projects that involve complex operational governance, multi-entity systems, or mission-critical automation requirements.'
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
    const baseUrl = 'https://abu-rahat-sabir.github.io';

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
    imageUrl?: string
): BlogPostingSchema {
    const baseUrl = 'https://abu-rahat-sabir.github.io';

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
        dateModified: datePublished,
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

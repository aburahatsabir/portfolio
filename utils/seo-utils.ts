import { PROJECTS } from '../constants';

// Re-export schema utilities for centralized SEO management
export {
    generatePersonSchema,
    generateFAQSchema,
    generateBreadcrumbSchema,
    generateBlogPostingSchema,
    injectSchema,
    removeSchema
} from './seo-schema';

interface PageMetadata {
    title: string;
    description: string;
    ogImage?: string;
    ogType?: string;
}

// Default metadata
const DEFAULT_METADATA: PageMetadata = {
    title: 'Executive Architect | Systems Governance & Operations',
    description: 'Strategic portfolio of a Corporate Operations Executive specializing in enterprise architecture, automation, and institutional governance.',
    ogImage: './images/og-default.webp',
    ogType: 'website'
};

// Route-specific metadata
const ROUTE_METADATA: Record<string, PageMetadata> = {
    '#/': DEFAULT_METADATA,

    '#/work': {
        title: 'Work Portfolio | Abu Rahat Sabir',
        description: 'Case studies and project archives showcasing enterprise systems architecture, automation, and operational governance solutions.',
        ogImage: './images/og-work.webp',
        ogType: 'website'
    },

    '#/about': {
        title: 'About | Abu Rahat Sabir - Executive Architect',
        description: 'Executive Admin and Automation Specialist with expertise in institutional governance, VBA/Apps Script systems, and enterprise operations.',
        ogImage: './images/og-about.webp',
        ogType: 'profile'
    },

    '#/contact': {
        title: 'Contact | Abu Rahat Sabir',
        description: 'Get in touch for strategic consultation on enterprise architecture, automation systems, and operational governance.',
        ogImage: './images/og-contact.webp',
        ogType: 'website'
    },

    '#/solutions': {
        title: 'Solutions & Capabilities | Abu Rahat Sabir',
        description: 'Enterprise automation solutions, administrative ROI frameworks, and operational governance capabilities.',
        ogImage: './images/og-solutions.webp',
        ogType: 'website'
    },

    '#/diagnostic': {
        title: 'Systems Audit & Diagnostic | Abu Rahat Sabir',
        description: 'Comprehensive systems auditing and diagnostic services for enterprise operations and governance.',
        ogImage: './images/og-diagnostic.webp',
        ogType: 'website'
    },

    '#/governance': {
        title: 'Reliability Standards & Governance | Abu Rahat Sabir',
        description: 'Enterprise governance frameworks and reliability standards for institutional operations.',
        ogImage: './images/og-governance.webp',
        ogType: 'website'
    },

    '#/post-mortems': {
        title: 'Post-Mortems & Incident Analysis | Abu Rahat Sabir',
        description: 'Forensic analysis of operational incidents and system failures with preventative architecture solutions.',
        ogImage: './images/og-postmortems.webp',
        ogType: 'website'
    },

    '#/success-stories': {
        title: 'Success Stories & Endorsements | Abu Rahat Sabir',
        description: 'Client success stories, testimonials, and endorsements from enterprise operations and automation projects.',
        ogImage: './images/og-success.webp',
        ogType: 'website'
    },

    '#/blog': {
        title: 'Blog Series | Abu Rahat Sabir',
        description: 'Insights on enterprise architecture, operational governance, and administrative automation.',
        ogImage: './images/og-blog.webp',
        ogType: 'website'
    },

    '#/privacy': {
        title: 'Privacy Policy | Abu Rahat Sabir',
        description: 'Privacy policy and data protection information.',
        ogType: 'website'
    },

    '#/cookies': {
        title: 'Cookie Policy | Abu Rahat Sabir',
        description: 'Cookie policy and usage information.',
        ogType: 'website'
    },

    '#/persona/executive-assistants': {
        title: 'Reclaim 10+ Hours Every Week | Abu Rahat Sabir',
        description: 'Automated executive support systems that eliminate repetitive admin work and coordination chaos.',
        ogImage: './images/og-persona-ea.webp',
        ogType: 'website'
    },

    '#/persona/operations-leaders': {
        title: 'Build Systems That Scale Without Hiring | Abu Rahat Sabir',
        description: 'Enterprise-grade operational architecture that eliminates bottlenecks and multiplies team capacity.',
        ogImage: './images/og-persona-ops.webp',
        ogType: 'website'
    },

    '#/persona/founders': {
        title: 'Save $50K/Year in Unnecessary Overhead | Abu Rahat Sabir',
        description: 'Institutional sovereignty through owned logic kernels that eliminate SaaS sprawl and vendor lock-in.',
        ogImage: './images/og-persona-founders.webp',
        ogType: 'website'
    },

    '#/persona/hiring-managers': {
        title: 'Expert Executive Operations Professional | Abu Rahat Sabir',
        description: 'Proven track record in C-suite support, enterprise automation, and operational governance.',
        ogImage: './images/og-persona-hiring.webp',
        ogType: 'website'
    }
};

/**
 * Get metadata for a specific route, including dynamic case study metadata
 */
function getMetadataForRoute(hash: string): PageMetadata {
    // Handle case study routes: #/work/project-id
    if (hash.startsWith('#/work/')) {
        const projectId = hash.replace('#/work/', '');
        const project = PROJECTS.find(p => p.id === projectId);

        if (project) {
            return {
                title: `${project.title} | Case Study - Abu Rahat Sabir`,
                description: project.headline + ' - ' + project.description,
                ogImage: project.image,
                ogType: 'article'
            };
        }
    }

    // Handle blog post routes: #/blog/post-id
    if (hash.startsWith('#/blog/')) {
        return {
            title: 'Blog Post | Abu Rahat Sabir',
            description: 'Insights on enterprise architecture, operational governance, and administrative automation.',
            ogImage: './images/og-blog.webp',
            ogType: 'article'
        };
    }

    // Return route-specific metadata or default
    return ROUTE_METADATA[hash] || DEFAULT_METADATA;
}

/**
 * Update meta tag in the document head
 */
function updateMetaTag(selector: string, content: string): void {
    let element = document.querySelector(selector);

    if (!element) {
        // Create the meta tag if it doesn't exist
        element = document.createElement('meta');

        // Parse selector to set attributes
        if (selector.includes('property=')) {
            const property = selector.match(/property="([^"]+)"/)?.[1];
            if (property) {
                element.setAttribute('property', property);
            }
        } else if (selector.includes('name=')) {
            const name = selector.match(/name="([^"]+)"/)?.[1];
            if (name) {
                element.setAttribute('name', name);
            }
        }

        document.head.appendChild(element);
    }

    element.setAttribute('content', content);
}

/**
 * Update all page metadata based on current route
 */
export function updatePageMetadata(hash: string): void {
    const metadata = getMetadataForRoute(hash);
    const currentUrl = window.location.href;

    // Update document title
    document.title = metadata.title;

    // Update meta description
    updateMetaTag('meta[name="description"]', metadata.description);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', metadata.title);
    updateMetaTag('meta[property="og:description"]', metadata.description);
    updateMetaTag('meta[property="og:url"]', currentUrl);
    updateMetaTag('meta[property="og:type"]', metadata.ogType || 'website');

    if (metadata.ogImage) {
        const absoluteImageUrl = metadata.ogImage.startsWith('http')
            ? metadata.ogImage
            : window.location.origin + metadata.ogImage;
        updateMetaTag('meta[property="og:image"]', absoluteImageUrl);
    }

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', metadata.title);
    updateMetaTag('meta[name="twitter:description"]', metadata.description);

    if (metadata.ogImage) {
        const absoluteImageUrl = metadata.ogImage.startsWith('http')
            ? metadata.ogImage
            : window.location.origin + metadata.ogImage;
        updateMetaTag('meta[name="twitter:image"]', absoluteImageUrl);
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;
}


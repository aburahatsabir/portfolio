/**
 * Metadata Management System
 * Dynamically injects meta tags and schema.org JSON-LD
 */

class MetadataManager {
    constructor() {
        this.metadata = null;
    }

    async loadMetadata() {
        if (this.metadata) return this.metadata;
        try {
            const response = await fetch('assets/data/metadata.json');
            if (!response.ok) throw new Error('Metadata not found');
            this.metadata = await response.json();
            return this.metadata;
        } catch (error) {
            console.error('Failed to load metadata:', error);
            return null;
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('work.html')) return 'work';
        if (path.includes('case-studies/')) return 'caseStudy';
        return 'home';
    }

    injectMetaTags(pageKey) {
        const page = this.metadata.pages[pageKey];
        if (!page) return;

        // Update title
        document.title = page.title;

        // Update or create meta tags
        this.setMetaTag('description', page.description);

        // Canonical link
        this.setCanonical(page.canonical);

        // OG tags
        if (page.og) {
            Object.entries(page.og).forEach(([key, value]) => {
                this.setMetaTag(`og:${key}`, value, 'property');
            });
        }

        // Twitter tags
        if (page.twitter) {
            Object.entries(page.twitter).forEach(([key, value]) => {
                this.setMetaTag(`twitter:${key}`, value);
            });
        }
    }

    setMetaTag(name, content, attr = 'name') {
        const selector = `meta[${attr}="${name}"]`;
        let tag = document.querySelector(selector);

        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attr, name);
            document.head.appendChild(tag);
        }

        tag.setAttribute('content', content);
    }

    setCanonical(url) {
        let link = document.querySelector('link[rel="canonical"]');

        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }

        link.setAttribute('href', url);
    }

    generatePersonSchema() {
        const author = this.metadata.site.author;
        return {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": author.name,
            "jobTitle": author.jobTitle,
            "url": this.metadata.site.baseUrl,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": author.location.split(',')[0].trim(),
                "addressCountry": "BD"
            },
            "sameAs": Object.values(author.social)
        };
    }

    generateBreadcrumbSchema(items) {
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
        };
    }

    injectSchema(schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
    }

    async init() {
        await this.loadMetadata();
        if (!this.metadata) return;

        const pageKey = this.getCurrentPage();

        // Note: We don't inject meta tags dynamically as they're already in HTML
        // This is kept for future dynamic page generation
        // this.injectMetaTags(pageKey);

        // Inject common schemas (only if not already present)
        // Person schema and other schemas are already in HTML
        // This manager is here for future extensibility
    }
}

// Initialize
window.metadataManager = new MetadataManager();
document.addEventListener('DOMContentLoaded', () => {
    window.metadataManager.init();
});

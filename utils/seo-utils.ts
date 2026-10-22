import { BLOG_POSTS } from '../content/blog-posts';
import {
    DEFAULT_SITE_URL,
    getBlogPostRouteMetadata,
    getStaticRouteMetadata,
} from '../config/site-routes.js';

// Re-export schema utilities for centralized SEO management
export {
    generatePersonSchema,
    generateWebSiteSchema,
    generateOrganizationSchema,
    generateServiceSchema,
    generateFAQSchema,
    generateBreadcrumbSchema,
    generateBlogPostingSchema,
    generateArticleSchema,
    injectSchema,
    removeSchema
} from './seo-schema';


/**
 * Get metadata for a specific route, including dynamic case study metadata
 */
export function getMetadataForRoute(path: string) {
    // Handle blog post routes: /blog/post-id
    if (path.startsWith('/blog/')) {
        const rawRouteId = path.replace('/blog/', '').replace(/\/+$/, '');
        const post = BLOG_POSTS.find(p => p.id === rawRouteId);

        if (post) {
            return getBlogPostRouteMetadata(post);
        }
        // Unknown slug — do not overwrite with generic fallback; return null
        // so the caller can preserve existing prerendered meta tags.
        return null;
    }

    return getStaticRouteMetadata(path);
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

function updateOptionalMetaTag(selector: string, content?: string): void {
    if (content) {
        updateMetaTag(selector, content);
    } else {
        document.querySelector(selector)?.remove();
    }
}

/**
 * Update all page metadata based on current route
 */
export function updatePageMetadata(path: string): void {
    const metadata = getMetadataForRoute(path);

    // If no metadata resolved (e.g. unknown blog slug), preserve existing
    // prerendered meta tags rather than overwriting with generic values.
    if (!metadata) return;

    const cleanPath = path.split('?')[0].split('#')[0];
    const canonicalOrigin = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');
    const cleanUrl = new URL(cleanPath || '/', `${canonicalOrigin}/`).href;

    // Update document title
    document.title = metadata.title;

    // Update meta description
    updateMetaTag('meta[name="description"]', metadata.description);
    updateMetaTag('meta[name="robots"]', metadata.robots);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', metadata.title);
    updateMetaTag('meta[property="og:description"]', metadata.socialDescription || metadata.description);
    updateMetaTag('meta[property="og:url"]', cleanUrl);
    updateMetaTag('meta[property="og:type"]', metadata.ogType);

    if (metadata.ogImage) {
        const absoluteImageUrl = new URL(metadata.ogImage, `${canonicalOrigin}/`).href;
        updateMetaTag('meta[property="og:image"]', absoluteImageUrl);
    }
    updateOptionalMetaTag('meta[property="og:image:alt"]', metadata.ogImageAlt || metadata.title);

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', metadata.twitterCard);
    updateMetaTag('meta[name="twitter:url"]', cleanUrl);
    updateMetaTag('meta[name="twitter:title"]', metadata.title);
    updateMetaTag('meta[name="twitter:description"]', metadata.socialDescription || metadata.description);

    if (metadata.ogImage) {
        const absoluteImageUrl = new URL(metadata.ogImage, `${canonicalOrigin}/`).href;
        updateMetaTag('meta[name="twitter:image"]', absoluteImageUrl);
    }
    updateOptionalMetaTag('meta[name="twitter:image:alt"]', metadata.ogImageAlt || metadata.title);

    updateOptionalMetaTag('meta[name="author"]', metadata.author);
    updateOptionalMetaTag('meta[property="article:published_time"]', metadata.publishedTime);
    updateOptionalMetaTag('meta[property="article:modified_time"]', metadata.modifiedTime);
    updateOptionalMetaTag('meta[property="article:section"]', metadata.section);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = cleanUrl;
}


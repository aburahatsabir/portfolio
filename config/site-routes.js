// @ts-check

/** @typedef {'website' | 'profile' | 'article'} OpenGraphType */
/** @typedef {'summary' | 'summary_large_image'} TwitterCard */

/**
 * @typedef {object} RouteMetadata
 * @property {string} title
 * @property {string} description
 * @property {string} [socialDescription]
 * @property {string} [ogImage]
 * @property {string} [ogImageAlt]
 * @property {OpenGraphType} ogType
 * @property {TwitterCard} twitterCard
 * @property {string} robots
 * @property {string} [author]
 * @property {string} [publishedTime]
 * @property {string} [modifiedTime]
 * @property {string} [section]
 */

/**
 * @typedef {Omit<RouteMetadata, 'twitterCard' | 'robots'> & {
 *   twitterCard?: TwitterCard,
 *   robots?: string,
 * }} RouteMetadataInput
 */

/**
 * @typedef {object} BlogPostMetadataSource
 * @property {string} title
 * @property {string} excerpt
 * @property {string} [seoTitle]
 * @property {string} [seoDescription]
 * @property {string} [ogImage]
 * @property {string} [image]
 * @property {string} [publishedAt]
 * @property {string} [dateModified]
 * @property {string} [category]
 * @property {{ name?: string }} [author]
 */

export const DEFAULT_SITE_URL = 'https://aburahatsabir.vercel.app';

/**
 * @param {RouteMetadataInput} metadata
 * @returns {Readonly<RouteMetadata>}
 */
function defineRouteMetadata(metadata) {
  return Object.freeze({
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
    ...metadata,
  });
}

/**
 * Canonical, type-checked route contract shared by browser and Node build code.
 * @type {Readonly<Record<string, Readonly<RouteMetadata>>>}
 */
export const STATIC_ROUTE_METADATA = Object.freeze({
  "/": defineRouteMetadata({
    title: "Executive Administration & Operations | Abu Rahat Sabir",
    description:
      "Explore Abu Rahat Sabir's portfolio: 7+ years in executive administration, executive assistance, office management, reporting, and workflow automation.",
    socialDescription:
      "7+ years in executive administration, executive assistance, office management, reporting, and workflow automation.",
    ogImage: "/images/og-default.webp",
    ogType: "website",
  }),
  "/about": defineRouteMetadata({
    title: "About | Abu Rahat Sabir",
    description:
      "Learn about Abu Rahat Sabir's experience in executive administration, office operations, reporting, and workflow automation.",
    ogImage: "/images/og-about.webp",
    ogType: "profile",
  }),
  "/work": defineRouteMetadata({
    title: "Work Portfolio | Abu Rahat Sabir",
    description:
      "Selected administrative operations, reporting, coordination, procurement, and workflow automation projects by Abu Rahat Sabir.",
    ogImage: "/images/og-work.webp",
    ogType: "website",
  }),
  "/blog": defineRouteMetadata({
    title:
      "The Journal: Ideas, Guides, Resources, Articles and Notes | Abu Rahat Sabir",
    description:
      "Ideas, guides, resources, articles, and notes from Abu Rahat Sabir.",
    ogImage: "/images/og-blog.webp",
    ogImageAlt:
      "The Journal by Abu Rahat Sabir - ideas, guides, resources, articles, and notes",
    ogType: "website",
  }),
  "/contact": defineRouteMetadata({
    title: "Contact | Abu Rahat Sabir",
    description:
      "Contact Abu Rahat Sabir about executive assistance, office administration, operational support, reporting, and workflow automation.",
    ogImage: "/images/og-contact.webp",
    ogType: "website",
  }),
  "/certifications": defineRouteMetadata({
    title: "Certifications | Abu Rahat Sabir",
    description:
      "Professional certifications and continuing education completed by Abu Rahat Sabir.",
    ogImage: "/images/og-default.webp",
    ogType: "website",
  }),
  "/privacy": defineRouteMetadata({
    title: "Privacy Policy | Abu Rahat Sabir",
    description:
      "Privacy policy and information about how this portfolio handles visitor data.",
    ogImage: "/images/og-default.webp",
    ogType: "website",
  }),
  "/cookies": defineRouteMetadata({
    title: "Cookie Policy | Abu Rahat Sabir",
    description:
      "Cookie policy and information about storage and analytics used by this portfolio.",
    ogImage: "/images/og-default.webp",
    ogType: "website",
  }),
});

export const STATIC_ROUTES = Object.freeze(Object.keys(STATIC_ROUTE_METADATA));

/** @param {string} pathname */
export function isStaticRoute(pathname) {
  return Object.prototype.hasOwnProperty.call(STATIC_ROUTE_METADATA, pathname);
}

/**
 * @param {string} pathname
 * @returns {Readonly<RouteMetadata> | null}
 */
export function getStaticRouteMetadata(pathname) {
  return isStaticRoute(pathname) ? STATIC_ROUTE_METADATA[pathname] : null;
}

/**
 * Build dynamic article metadata with the same rules used by runtime and prerendering.
 * @param {BlogPostMetadataSource} post
 * @returns {Readonly<RouteMetadata>}
 */
export function getBlogPostRouteMetadata(post) {
  return defineRouteMetadata({
    title: post.seoTitle || `${post.title} | Abu Rahat Sabir`,
    description: post.seoDescription || post.excerpt,
    socialDescription: post.seoDescription || post.excerpt,
    ogImage: post.ogImage || post.image,
    ogImageAlt: post.title,
    ogType: 'article',
    author: post.author?.name || 'Abu Rahat Sabir',
    publishedTime: post.publishedAt || post.dateModified,
    modifiedTime: post.dateModified || post.publishedAt,
    section: post.category,
  });
}

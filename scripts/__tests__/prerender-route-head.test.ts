import { describe, expect, it } from "vitest";
import {
  buildCanonicalUrl,
  extractBlogPostMetadataEntries,
  extractBlogRouteAliasEntries,
  extractBlogRouteEntries,
  injectBlogPostHead,
  injectNotFoundHead,
  injectRouteHead,
} from "../prerender-route-head.js";

describe("prerender route head helpers", () => {
  it("builds a clean canonical URL from the site URL and route path", () => {
    expect(
      buildCanonicalUrl(
        "/work/hr-documentation-control-system",
        "https://aburahatsabir.vercel.app/",
      ),
    ).toBe("https://aburahatsabir.vercel.app/work/hr-documentation-control-system");
  });

  it("injects canonical, og:url, and twitter:url into raw HTML", () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta property="og:url" content="https://example.com/">
    <meta name="twitter:url" content="https://example.com/">
</head>
<body></body>
</html>`;

    const updatedHtml = injectRouteHead(
      html,
      "/blog/resume-writing-guide-getting-shortlisted",
      "https://aburahatsabir.vercel.app",
    );

    expect(updatedHtml).toContain(
      '<link rel="canonical" href="https://aburahatsabir.vercel.app/blog/resume-writing-guide-getting-shortlisted">',
    );
    expect(updatedHtml).toContain(
      '<meta property="og:url" content="https://aburahatsabir.vercel.app/blog/resume-writing-guide-getting-shortlisted">',
    );
    expect(updatedHtml).toContain(
      '<meta name="twitter:url" content="https://aburahatsabir.vercel.app/blog/resume-writing-guide-getting-shortlisted">',
    );
  });

  it("injects full blog index metadata into raw HTML", () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Executive Architect | Systems Governance & Operations</title>
    <meta name="description" content="Default description.">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Executive Architect | Systems Governance & Operations">
    <meta property="og:description" content="Default description.">
    <meta property="og:url" content="https://example.com/">
    <meta property="og:image" content="https://example.com/images/og-default.webp">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://example.com/">
    <meta name="twitter:title" content="Executive Architect | Systems Governance & Operations">
    <meta name="twitter:description" content="Default description.">
    <meta name="twitter:image" content="https://example.com/images/og-default.webp">
</head>
<body></body>
</html>`;

    const updatedHtml = injectRouteHead(
      html,
      "/blog",
      "https://aburahatsabir.vercel.app",
    );

    expect(updatedHtml).toContain(
      "<title>The Journal: Ideas, Guides, Resources, Articles and Notes | Abu Rahat Sabir</title>",
    );
    expect(updatedHtml).toContain(
      '<meta name="description" content="Ideas, guides, resources, articles, and notes from Abu Rahat Sabir.">',
    );
    expect(updatedHtml).toContain(
      '<link rel="canonical" href="https://aburahatsabir.vercel.app/blog">',
    );
    expect(updatedHtml).toContain(
      '<meta property="og:image" content="https://aburahatsabir.vercel.app/images/og-blog.webp">',
    );
    expect(updatedHtml).toContain(
      '<meta name="twitter:image" content="https://aburahatsabir.vercel.app/images/og-blog.webp">',
    );
    expect(updatedHtml).toContain('"@type": "Blog"');
    expect(updatedHtml).toContain(
      '"@id": "https://aburahatsabir.vercel.app/blog#blog"',
    );
    expect(updatedHtml).not.toContain(
      '<meta property="og:image" content="https://example.com/images/og-default.webp">',
    );
  });

  it("extracts blog route entries from the blog post source", () => {
    const routes = extractBlogRouteEntries(`
      export const BLOG_POSTS: BlogPost[] = [
        {
          id: "resume-writing-guide-getting-shortlisted",
          title: "Resume Guide",
          excerpt: "Resume guide excerpt.",
        },
        {
          id: "how-to-learn-computer-networking",
          title: "Networking Guide",
          excerpt: "Networking guide excerpt.",
        },
      ];
    `);

    expect(routes).toEqual([
      {
        routePath: "/blog/resume-writing-guide-getting-shortlisted",
        canonicalPath: "/blog/resume-writing-guide-getting-shortlisted",
      },
      {
        routePath: "/blog/how-to-learn-computer-networking",
        canonicalPath: "/blog/how-to-learn-computer-networking",
      },
    ]);
  });

  it("extracts legacy blog aliases with canonical targets", () => {
    const routes = extractBlogRouteAliasEntries(`
      export const BLOG_POST_ROUTE_ALIASES: Record<string, string> = {
        "blog-02": "resume-writing-guide-getting-shortlisted",
        "blog-semrush-bing-ai": "how-to-learn-computer-networking",
      };
    `);

    expect(routes).toEqual([
      {
        routePath: "/blog/blog-02",
        canonicalPath: "/blog/resume-writing-guide-getting-shortlisted",
      },
      {
        routePath: "/blog/blog-semrush-bing-ai",
        canonicalPath: "/blog/how-to-learn-computer-networking",
      },
    ]);
  });

  it("extracts blog post metadata from the content source", () => {
    const posts = extractBlogPostMetadataEntries(`
      export const BLOG_POSTS = [
        {
          id: "sample-post",
          title: "Sample Post",
          seoTitle: "Sample SEO Title | Abu Rahat Sabir",
          publishedAt: "2026-08-02",
          dateModified: "2026-08-03",
          category: "Testing",
          tags: ["SEO", "AEO"],
          excerpt: "Default excerpt.",
          seoDescription: "Search-focused description.",
          author: {
            name: "Abu Rahat Sabir",
            role: "Author",
          },
          content: \`A string with { braces } should not break extraction.\`,
          image: "/images/sample.webp",
          ogImage: "/images/sample-og.webp",
        },
      ];
    `);

    expect(posts).toEqual([
      expect.objectContaining({
        id: "sample-post",
        title: "Sample Post",
        seoTitle: "Sample SEO Title | Abu Rahat Sabir",
        seoDescription: "Search-focused description.",
        publishedAt: "2026-08-02",
        dateModified: "2026-08-03",
        category: "Testing",
        image: "/images/sample.webp",
        ogImage: "/images/sample-og.webp",
        tags: ["SEO", "AEO"],
        author: expect.objectContaining({
          name: "Abu Rahat Sabir",
          role: "Author",
        }),
      }),
    ]);
  });

  it("extracts blog post metadata with a global author reference", () => {
    const posts = extractBlogPostMetadataEntries(`
      export const BLOG_AUTHOR: BlogPost["author"] = {
        name: "Abu Rahat Sabir",
        role: "Author",
        avatar: "/images/hero/Abu Rahat Hero 01.webp",
      };

      export const BLOG_POSTS = [
        {
          id: "sample-post",
          title: "Sample Post",
          excerpt: "Default excerpt.",
          author: BLOG_AUTHOR,
          content: "Sample content.",
          image: "/images/sample.webp",
        },
      ];
    `);

    expect(posts).toEqual([
      expect.objectContaining({
        id: "sample-post",
        author: {
          name: "Abu Rahat Sabir",
          role: "Author",
          avatar: "/images/hero/Abu Rahat Hero 01.webp",
        },
      }),
    ]);
  });

  it("injects full blog article metadata into raw HTML", () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Executive Architect | Systems Governance & Operations</title>
    <meta name="description" content="Default description.">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Executive Architect | Systems Governance & Operations">
    <meta property="og:description" content="Default description.">
    <meta property="og:url" content="https://example.com/">
    <meta property="og:image" content="https://example.com/images/og-default.webp">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://example.com/">
    <meta name="twitter:title" content="Executive Architect | Systems Governance & Operations">
    <meta name="twitter:description" content="Default description.">
    <meta name="twitter:image" content="https://example.com/images/og-default.webp">
</head>
<body></body>
</html>`;

    const updatedHtml = injectBlogPostHead(
      html,
      {
        id: "sample-post",
        title: "Sample Post",
        seoTitle: "Sample SEO Title | Abu Rahat Sabir",
        excerpt: "Default excerpt.",
        seoDescription: "Search-focused description.",
        publishedAt: "2026-08-02",
        dateModified: "2026-08-03",
        category: "Testing",
        tags: ["SEO", "AEO"],
        image: "/images/sample.webp",
        ogImage: "/images/sample-og.webp",
        author: { name: "Abu Rahat Sabir" },
      },
      "/blog/sample-post",
      "https://aburahatsabir.vercel.app",
    );

    expect(updatedHtml).toContain(
      "<title>Sample SEO Title | Abu Rahat Sabir</title>",
    );
    expect(updatedHtml).toContain(
      '<meta name="description" content="Search-focused description.">',
    );
    expect(updatedHtml).toContain('<meta property="og:type" content="article">');
    expect(updatedHtml).toContain(
      '<meta property="og:image" content="https://aburahatsabir.vercel.app/images/sample-og.webp">',
    );
    expect(updatedHtml).toContain(
      '<meta name="twitter:image" content="https://aburahatsabir.vercel.app/images/sample-og.webp">',
    );
    expect(updatedHtml).toContain(
      '<meta property="article:published_time" content="2026-08-02">',
    );
    expect(updatedHtml).toContain('"@type": "BlogPosting"');
    expect(updatedHtml).toContain(
      '"@id": "https://aburahatsabir.vercel.app/blog/sample-post#blog-posting"',
    );
    expect(updatedHtml).not.toContain(
      '<meta property="og:image" content="https://example.com/images/og-default.webp">',
    );
  });

  it("injects noindex metadata for the generated 404 page", () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Executive Architect | Systems Governance & Operations</title>
    <meta name="description" content="Default description.">
    <meta property="og:title" content="Executive Architect | Systems Governance & Operations">
</head>
<body></body>
</html>`;

    const updatedHtml = injectNotFoundHead(
      html,
      "https://aburahatsabir.vercel.app",
    );

    expect(updatedHtml).toContain(
      "<title>Page Not Found | Abu Rahat Sabir</title>",
    );
    expect(updatedHtml).toContain(
      '<meta name="robots" content="noindex,follow">',
    );
    expect(updatedHtml).toContain(
      '<link rel="canonical" href="https://aburahatsabir.vercel.app/404">',
    );
    expect(updatedHtml).toContain(
      '<meta property="og:url" content="https://aburahatsabir.vercel.app/404">',
    );
  });
});

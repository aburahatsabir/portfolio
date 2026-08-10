import { describe, expect, it } from "vitest";
import {
  generateRobotsTxt,
  generateSitemap,
  getCanonicalSitemapRoutes,
} from "../generate-sitemap.js";

const BLOG_POSTS_SOURCE = `
export const BLOG_POST_ROUTE_ALIASES: Record<string, string> = {
  "blog-02": "resume-writing-guide-getting-shortlisted",
  "blog-semrush-bing-ai": "how-to-learn-computer-networking",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "resume-writing-guide-getting-shortlisted",
    title: "The Science of Getting Shortlisted",
    excerpt: "Resume guide excerpt.",
    publishedAt: "2026-04-01",
    dateModified: "2026-04-02",
  },
  {
    id: "how-to-learn-computer-networking",
    title: "How to Learn Computer Networking",
    excerpt: "Networking guide excerpt.",
    publishedAt: "2026-08-02",
    dateModified: "2026-08-03",
  },
];
`;

describe("generate sitemap", () => {
  it("lists only canonical live routes", () => {
    const paths = getCanonicalSitemapRoutes({
      blogPostsSource: BLOG_POSTS_SOURCE,
    }).map((route) => route.path);

    expect(paths).toContain("/blog/resume-writing-guide-getting-shortlisted");
    expect(paths).toContain("/blog/how-to-learn-computer-networking");
    expect(paths).toContain("/work/fmcg-erp");
    expect(paths).toContain("/work/mocs");
    expect(paths).toContain("/work/hr-documentation-control-system");
    expect(paths).toContain("/accessibility");
    expect(paths).toContain("/conduct");
    expect(paths).toContain("/certifications");

    expect(paths).not.toContain("/blog/blog-02");
    expect(paths).not.toContain("/blog/blog-semrush-bing-ai");
    expect(paths).not.toContain("/work/hr-docs");
    expect(paths).not.toContain("/work/erp-lite");
    expect(paths).not.toContain("/work/fmcg-distribution-erp");
    expect(paths).not.toContain("/post-mortems");
  });

  it("generates sitemap URLs from the configured site URL", () => {
    const sitemap = generateSitemap({
      siteUrl: "https://example.com/",
      generatedAt: new Date("2026-08-03T00:00:00.000Z"),
      routes: getCanonicalSitemapRoutes({
        blogPostsSource: BLOG_POSTS_SOURCE,
      }),
    });

    expect(sitemap).toContain(
      "<loc>https://example.com/blog/resume-writing-guide-getting-shortlisted</loc>",
    );
    expect(sitemap).toContain("<lastmod>2026-04-02</lastmod>");
    expect(sitemap).toContain(
      "<loc>https://example.com/work/hr-documentation-control-system</loc>",
    );
    expect(sitemap).not.toContain("github.io/portfolio");
    expect(sitemap).not.toContain("aburahatsabir.com");
    expect(sitemap).not.toContain("/blog/blog-02");
    expect(sitemap).not.toContain("/blog/blog-semrush-bing-ai");
  });

  it("generates robots.txt from the same site URL", () => {
    expect(generateRobotsTxt({ siteUrl: "https://example.com/" })).toContain(
      "Sitemap: https://example.com/sitemap.xml",
    );
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { BLOG_POSTS } from "../../content/blog-posts";
import {
  DEFAULT_SITE_URL,
  STATIC_ROUTE_METADATA,
  getBlogPostRouteMetadata,
} from "../../config/site-routes.js";
import { updatePageMetadata } from "../seo-utils";

describe("updatePageMetadata", () => {
  beforeEach(() => {
    window.history.pushState(
      {},
      "",
      "/work?ref=twitter#overview",
    );

    document
      .querySelector('link[rel="canonical"]')
      ?.parentElement
      ?.removeChild(document.querySelector('link[rel="canonical"]') as Node);

    document
      .querySelector('meta[property="og:url"]')
      ?.parentElement
      ?.removeChild(document.querySelector('meta[property="og:url"]') as Node);
  });

  it("sets canonical and og:url to the clean path URL without query or hash", () => {
    updatePageMetadata("/work");

    expect(
      document.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute(
      "href",
      `${DEFAULT_SITE_URL}/work`,
    );

    expect(
      document.querySelector('meta[property="og:url"]'),
    ).toHaveAttribute(
      "content",
      `${DEFAULT_SITE_URL}/work`,
    );
  });

  it("sets blog metadata from the selected post", () => {
    updatePageMetadata("/blog/how-to-learn-computer-networking");

    expect(document.title).toBe(
      "How to Learn Computer Networking: 2026 Roadmap | Abu Rahat Sabir",
    );
    expect(
      document.querySelector('meta[name="description"]'),
    ).toHaveAttribute(
      "content",
      "Learn computer networking with a practical 2026 roadmap covering the OSI model, home labs, subnetting, Network+ vs CCNA, troubleshooting, Linux, Python, and automation.",
    );
    expect(
      document.querySelector('meta[property="og:type"]'),
    ).toHaveAttribute("content", "article");
    expect(
      document.querySelector('meta[property="og:image"]'),
    ).toHaveAttribute(
      "content",
      `${DEFAULT_SITE_URL}/images/blogs/how-to-learn-computer-networking-og.webp`,
    );
  });

  it("sets broad blog index metadata", () => {
    updatePageMetadata("/blog");

    expect(document.title).toBe(
      "The Journal: Ideas, Guides, Resources, Articles and Notes | Abu Rahat Sabir",
    );
    expect(
      document.querySelector('meta[name="description"]'),
    ).toHaveAttribute(
      "content",
      "Ideas, guides, resources, articles, and notes from Abu Rahat Sabir.",
    );
    expect(
      document.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute("href", `${DEFAULT_SITE_URL}/blog`);
    expect(
      document.querySelector('meta[property="og:image"]'),
    ).toHaveAttribute("content", `${DEFAULT_SITE_URL}/images/og-blog.webp`);
  });

  it("hydrates every canonical route from the shared metadata registry", () => {
    const routes = [
      ...Object.entries(STATIC_ROUTE_METADATA),
      ...BLOG_POSTS.map((post) => [
        `/blog/${post.id}`,
        getBlogPostRouteMetadata(post),
      ] as const),
    ];

    for (const [routePath, metadata] of routes) {
      updatePageMetadata(routePath);

      const canonicalUrl = `${DEFAULT_SITE_URL}${routePath === "/" ? "/" : routePath}`;
      const socialDescription = metadata.socialDescription || metadata.description;

      expect(document.title, routePath).toBe(metadata.title);
      expect(document.querySelector('meta[name="description"]'), routePath)
        .toHaveAttribute("content", metadata.description);
      expect(document.querySelector('meta[name="robots"]'), routePath)
        .toHaveAttribute("content", metadata.robots);
      expect(document.querySelector('link[rel="canonical"]'), routePath)
        .toHaveAttribute("href", canonicalUrl);
      expect(document.querySelector('meta[property="og:title"]'), routePath)
        .toHaveAttribute("content", metadata.title);
      expect(document.querySelector('meta[property="og:description"]'), routePath)
        .toHaveAttribute("content", socialDescription);
      expect(document.querySelector('meta[property="og:type"]'), routePath)
        .toHaveAttribute("content", metadata.ogType);
      expect(document.querySelector('meta[property="og:url"]'), routePath)
        .toHaveAttribute("content", canonicalUrl);
      expect(document.querySelector('meta[name="twitter:title"]'), routePath)
        .toHaveAttribute("content", metadata.title);
      expect(document.querySelector('meta[name="twitter:description"]'), routePath)
        .toHaveAttribute("content", socialDescription);
      expect(document.querySelector('meta[name="twitter:url"]'), routePath)
        .toHaveAttribute("content", canonicalUrl);
    }
  });

  it("does not create canonical metadata for a removed blog route", () => {
    updatePageMetadata("/blog/blog-02");

    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.querySelector('meta[property="og:url"]')).toBeNull();
  });
});

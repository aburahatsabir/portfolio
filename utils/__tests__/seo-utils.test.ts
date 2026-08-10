import { beforeEach, describe, expect, it } from "vitest";
import { updatePageMetadata } from "../seo-utils";

describe("updatePageMetadata", () => {
  beforeEach(() => {
    window.history.pushState(
      {},
      "",
      "/work/hr-documentation-control-system?ref=twitter#overview",
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
    updatePageMetadata("/work/hr-documentation-control-system");

    expect(
      document.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute(
      "href",
      "http://localhost:3000/work/hr-documentation-control-system",
    );

    expect(
      document.querySelector('meta[property="og:url"]'),
    ).toHaveAttribute(
      "content",
      "http://localhost:3000/work/hr-documentation-control-system",
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
      "http://localhost:3000/images/blogs/how-to-learn-computer-networking-og.webp",
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
    ).toHaveAttribute("href", "http://localhost:3000/blog");
    expect(
      document.querySelector('meta[property="og:image"]'),
    ).toHaveAttribute("content", "http://localhost:3000/images/og-blog.webp");
  });

  it("sets old blog aliases to the canonical post URL", () => {
    updatePageMetadata("/blog/blog-02");

    expect(
      document.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute(
      "href",
      "http://localhost:3000/blog/resume-writing-guide-getting-shortlisted",
    );
    expect(
      document.querySelector('meta[property="og:url"]'),
    ).toHaveAttribute(
      "content",
      "http://localhost:3000/blog/resume-writing-guide-getting-shortlisted",
    );
  });
});

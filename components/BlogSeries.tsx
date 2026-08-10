import React, {
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { BLOG_POSTS, resolveBlogPostRouteId } from "../content/blog-posts";
import type { BlogBodyRenderer, BlogPost, BlogTemplate } from "../types";
import NotFoundPage from "./NotFoundPage";
import DOMPurify from "dompurify";

const BLOG_HERO_WEBFLOW_SHARED_CSS_URL =
  "/blog-hero/marketing-main.webflow.shared.156580216.min.css";
const BLOG_HERO_WEBFLOW_PAGE_CSS_URL =
  "/blog-hero/marketing-main.webflow.68813d0b2e88b04dedeb9769.706f17bf7.opt.min.css";
const BLOG_HERO_THREE_URL = "/blog-hero/three-r128.min.js";
const BLOG_HERO_FLUTED_RUNTIME_URL = "/blog-hero/fluted-glass-op.min.js";
const BLOG_HERO_FALLBACK_IMAGE =
  "/images/blogs/resume-writing-guide-getting-shortlisted-cover.webp";

type BlogSortBy = "recent" | "oldest";

type ArticleFaqItem = {
  question: React.ReactNode;
  answer: React.ReactNode;
};

type MarkdownFaqItem = {
  question: string;
  answer: string[];
};

const SUBSCRIBE_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBSCRIBE_SUCCESS_RESET_DELAY_MS = 5000;

const getBlogPostTimestamp = (post: BlogPost) => {
  const parsedTimestamp = Date.parse(post.publishedAt ?? post.date);
  return Number.isNaN(parsedTimestamp) ? 0 : parsedTimestamp;
};

const compareBlogPostsByPublishedDate = (a: BlogPost, b: BlogPost) =>
  getBlogPostTimestamp(b) - getBlogPostTimestamp(a);

const sortBlogPosts = (posts: BlogPost[], sortBy: BlogSortBy) => {
  const sortedPosts = [...posts].sort(compareBlogPostsByPublishedDate);
  return sortBy === "oldest" ? sortedPosts.reverse() : sortedPosts;
};

const getCuratedLeadPosts = (posts: BlogPost[], limit: number) => {
  if (posts.length === 0) return [];

  const featuredCandidates = posts
    .filter((post) => typeof post.featuredRank === "number")
    .sort(
      (a, b) =>
        (a.featuredRank ?? Number.MAX_SAFE_INTEGER) -
          (b.featuredRank ?? Number.MAX_SAFE_INTEGER) ||
        compareBlogPostsByPublishedDate(a, b),
    );

  const featuredPost = featuredCandidates[0] ?? posts[0];
  const remainingPosts = posts.filter((post) => post.id !== featuredPost.id);

  return [featuredPost, ...remainingPosts].slice(0, limit);
};

const navigateToBlogPost = (postId: string) => {
  window.history.pushState({}, "", `/blog/${postId}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

const handleBlogPostLinkClick = (
  event: React.MouseEvent<HTMLAnchorElement>,
  postId: string,
) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  navigateToBlogPost(postId);
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

type ContentBlock =
  | {
      type: "h2" | "h3" | "h4" | "p" | "ul" | "feature_ul" | "read_more";
      text?: string;
      items?: string[];
      url?: string;
      label?: string;
    }
  | { type: "quote"; lines: string[] }
  | { type: "image"; url: string; caption?: string }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { type: "faq"; items: MarkdownFaqItem[] }
  | {
      type: "buttons";
      buttons: Array<{
        label: string;
        url: string;
        variant: "download" | "demo";
      }>;
    };

type TocHeading = { id: string; text: string; level: "h2" | "h3" };

type StructuredArticleStatItem = {
  value: string;
  label: string;
  note?: string;
  accentClass?: string;
};

type StructuredArticleInsightItem = {
  step: string;
  title: string;
  description: React.ReactNode;
  note?: React.ReactNode;
  accentClass?: string;
};

type StructuredArticleCompare = {
  badLabel: string;
  badContent: React.ReactNode;
  badNote: React.ReactNode;
  goodLabel: string;
  goodContent: React.ReactNode;
  goodNote: React.ReactNode;
};

type StructuredArticleBlock =
  | { type: "paragraph"; body: React.ReactNode; className?: string }
  | { type: "subheading"; title: string; id?: string }
  | {
      type: "callout";
      eyebrow: React.ReactNode;
      paragraphs: React.ReactNode[];
      className?: string;
    }
  | { type: "divider"; className?: string }
  | { type: "statStrip"; items: StructuredArticleStatItem[] }
  | {
      type: "insightGrid";
      eyebrow: React.ReactNode;
      summary?: React.ReactNode;
      items: StructuredArticleInsightItem[];
    }
  | { type: "dropcapIntro"; lead: string; paragraphs: string[] }
  | {
      type: "pullQuote";
      quote: React.ReactNode;
      cite?: React.ReactNode;
      className?: string;
    }
  | {
      type: "ruleColumns";
      columns: Array<{
        title: string;
        items: React.ReactNode[];
        variant: "include" | "exclude";
      }>;
      className?: string;
    }
  | { type: "compare"; comparison: StructuredArticleCompare }
  | {
      type: "decisionTable";
      headers: string[];
      rows: React.ReactNode[][];
      caption?: string;
    }
  | { type: "faq"; items: ArticleFaqItem[] }
  | { type: "custom"; key: string; render: () => React.ReactNode };

type StructuredArticleSection = {
  sectionLabel: string;
  id: string;
  title: string;
  headingStyle?: "label" | "kicker";
  headingClassName?: string;
  blocks: StructuredArticleBlock[];
};

type StructuredArticleDocument = {
  leadBlocks: StructuredArticleBlock[];
  sections: StructuredArticleSection[];
  outroBlocks?: StructuredArticleBlock[];
};

const BLOG_POST_SCROLL_REVEAL_SELECTOR = [
  ".article-author-meta",
  ".article-footer-meta",
  ".article-body",
  ".article-h2",
  ".article-h3",
  ".article-h4",
  ".article-markdown-h2",
  ".article-markdown-h3",
  ".article-list",
  ".article-link-card",
  "figure",
  ".article-table-frame",
  ".article-table--legacy",
  ".article-stat-strip",
  ".article-insight-grid",
  ".article-pullquote-panel",
  ".article-panel--callout",
  ".article-compare",
  ".article-stage-flow",
  ".article-card-grid",
  ".article-workflow-list",
  ".article-info-grid",
  ".article-case-card--early",
  ".article-case-card--experienced",
  ".article-case-card--transition",
  ".article-final-prompt",
  ".article-checklist",
  ".article-faq",
  ".article-faq details",
].join(", ");

const BLOG_TEMPLATE_DEFAULT_RENDERER: Record<BlogTemplate, BlogBodyRenderer> = {
  standard: "markdown",
  flagship: "resumeGuide",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const BlogHeroBackground: React.FC<{
  image: string;
  title: string;
  isDark: boolean;
  isPaused: boolean;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ image, title, isDark, setReady }) => {
  const heroFrameRef = useRef<HTMLIFrameElement>(null);
  const heroReadyTimeoutRef = useRef<number | null>(null);
  const heroBackgroundSrcDoc = useMemo(() => {
    const fallbackBackground = isDark ? "#080808" : "#ffffff";
    const fallbackText = isDark ? "#f5f5f5" : "#080808";
    const safeImage = escapeHtml(image);
    const safeAlt = escapeHtml(title);

    return `<!doctype html>
<html lang="en"${isDark ? ' class="u-mode-dark"' : ""}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#146EF5">
  <script>
    (function () {
      var isDark = ${isDark ? "true" : "false"};
      document.documentElement.classList.toggle('u-mode-dark', isDark);
      try {
        localStorage.setItem('darkMode', String(isDark));
      } catch (error) {}
    })();
  </script>
  <link href="${BLOG_HERO_WEBFLOW_SHARED_CSS_URL}" rel="stylesheet" type="text/css">
  <link href="${BLOG_HERO_WEBFLOW_PAGE_CSS_URL}" rel="stylesheet" type="text/css">
  <style>
    html, body {
      margin: 0;
      width: 100%;
      height: 100%;
      min-height: 100%;
      overflow: hidden;
      background: var(--colors--background, ${fallbackBackground});
      color: var(--colors--text, ${fallbackText});
    }

    body {
      position: relative;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }

    .hero-bg {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--colors--background, ${fallbackBackground});
    }

    .fluted-glass-component,
    .fluted-glass-canvas,
    .fluted-glass-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .fluted-glass-image,
    .fluted-glass-canvas canvas {
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 160ms ease;
    }

    .fluted-glass-image {
      object-fit: cover;
      object-position: center;
      opacity: 0 !important;
    }

    html.hero-mounted .fluted-glass-canvas canvas {
      opacity: 1;
    }
  </style>
</head>
<body>
  <div class="hero-bg">
    <div class="fluted-glass-component">
      <div
        data-distortion="0.25"
        data-shape-type-one="0"
        class="fluted-glass-canvas"
        data-size-two="1"
        data-shininess="800"
        data-use-blob-two="false"
        data-gloss="0.3"
        data-shape-type-two="0"
        data-width-variation="1.8"
        data-use-three-color="true"
        data-sensitivity-three="0.15"
        data-color-three="var(--colors--background)"
        data-sensitivity-one="0.15"
        data-size-three="1.3"
        data-fluted-glass="true"
        data-noise="0.40"
        data-hover="true"
        data-color-one="var(--colors--background)"
        data-columns="6"
        data-shape-type-three="0"
        data-sensitivity-two="0.15"
        data-size-one="0.85"
        data-bg-color=""
        data-hover-intensity="2.0"
        data-color-two="#EEEEEE"
        data-use-blob-one="true"
        data-background-image="">
        <img
          src="${safeImage}"
          loading="eager"
          alt="${safeAlt}"
          sizes="100vw"
          class="fluted-glass-image">
      </div>
    </div>
    <div class="fluted-glass-overlay"></div>
  </div>

  <script>
    document.documentElement.classList.add('w-mod-js');
    (function () {
      var posted = false;
      function notifyReady() {
        if (posted) return;
        posted = true;
        document.documentElement.classList.add('hero-mounted');
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            try {
              window.parent.postMessage({ type: 'webflow-hero-ready' }, '*');
            } catch (error) {}
          });
        });
      }

      function watchCanvas() {
        var host = document.querySelector('.fluted-glass-canvas');
        if (!host) return;
        if (host.querySelector('canvas')) {
          notifyReady();
          return;
        }

        var observer = new MutationObserver(function () {
          if (host.querySelector('canvas')) {
            observer.disconnect();
            notifyReady();
          }
        });

        observer.observe(host, { childList: true, subtree: true });

        window.setTimeout(function () {
          if (host.querySelector('canvas')) {
            observer.disconnect();
            notifyReady();
          }
        }, 1800);
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', watchCanvas, { once: true });
      } else {
        watchCanvas();
      }

      window.addEventListener('load', function () {
        window.setTimeout(watchCanvas, 120);
      }, { once: true });
    })();
  </script>
  <script src="${BLOG_HERO_THREE_URL}"></script>
  <script src="${BLOG_HERO_FLUTED_RUNTIME_URL}"></script>
</body>
</html>`;
  }, [image, isDark, title]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== heroFrameRef.current?.contentWindow) return;
      if (event.data?.type !== "webflow-hero-ready") return;

      if (heroReadyTimeoutRef.current !== null) {
        window.clearTimeout(heroReadyTimeoutRef.current);
        heroReadyTimeoutRef.current = null;
      }

      setReady(true);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setReady]);

  useEffect(() => {
    if (heroReadyTimeoutRef.current !== null) {
      window.clearTimeout(heroReadyTimeoutRef.current);
      heroReadyTimeoutRef.current = null;
    }
  }, [heroBackgroundSrcDoc]);

  useEffect(() => {
    return () => {
      if (heroReadyTimeoutRef.current !== null) {
        window.clearTimeout(heroReadyTimeoutRef.current);
        heroReadyTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div className="blog-post-hero__bg absolute inset-0 overflow-hidden">
      <div className="blog-post-hero__fallback absolute inset-0"></div>
      <iframe
        ref={heroFrameRef}
        title="Webflow hero background"
        aria-hidden="true"
        tabIndex={-1}
        scrolling="no"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={heroBackgroundSrcDoc}
        className="blog-post-hero__frame absolute inset-0"
        onLoad={() => {
          if (heroReadyTimeoutRef.current !== null) {
            window.clearTimeout(heroReadyTimeoutRef.current);
          }

          heroReadyTimeoutRef.current = window.setTimeout(() => {
            setReady(true);
            heroReadyTimeoutRef.current = null;
          }, 5000);
        }}
      />
    </div>
  );
};

function parseContent(content: string): Array<ContentBlock> {
  const lines = content.split("\n");
  const blocks: Array<ContentBlock> = [];
  let currentList: string[] | null = null;
  let isFeatureList = false;
  let currentTable: { headers: string[]; rows: string[][] } | null = null;
  let currentQuote: string[] | null = null;

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      blocks.push({
        type: isFeatureList ? "feature_ul" : "ul",
        items: currentList,
      });
      currentList = null;
      isFeatureList = false;
    }
  };

  const flushTable = () => {
    if (currentTable) {
      blocks.push({ type: "table", ...currentTable });
      currentTable = null;
    }
  };

  const flushQuote = () => {
    if (currentQuote && currentQuote.length > 0) {
      blocks.push({ type: "quote", lines: currentQuote });
      currentQuote = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      flushList();
      flushTable();
      flushQuote();
      continue;
    }

    if (line.startsWith(">")) {
      flushList();
      flushTable();
      if (!currentQuote) currentQuote = [];
      const quoteLine = line.replace(/^>\s?/, "").trim();
      if (quoteLine) currentQuote.push(quoteLine);
      continue;
    } else {
      flushQuote();
    }

    // Check for Table
    if (line.startsWith("|")) {
      flushList();
      const parts = line
        .split("|")
        .map((s) => s.trim())
        .filter((s) => s !== "");
      // Handle the separator line
      if (parts.every((p) => p.match(/^-+$/))) {
        continue;
      }
      if (!currentTable) {
        currentTable = { headers: parts, rows: [] };
      } else {
        currentTable.rows.push(parts);
      }
      continue;
    } else {
      flushTable();
    }

    // Check for Image: ![caption](url)
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushList();
      flushQuote();
      blocks.push({ type: "image", caption: imgMatch[1], url: imgMatch[2] });
      continue;
    }

    // Check for Buttons: [Download](url) [Demo](url)
    const btnMatch = line.match(/\[(Download|Demo)\]\((.*?)\)/gi);
    if (btnMatch && line.includes("Download") && line.includes("Demo")) {
      flushList();
      flushQuote();
      const buttons: Array<{
        label: string;
        url: string;
        variant: "download" | "demo";
      }> = [];
      const matches = line.matchAll(/\[(Download|Demo)\]\((.*?)\)/gi);
      for (const m of matches) {
        buttons.push({
          label: m[1],
          url: m[2],
          variant: m[1].toLowerCase() as "download" | "demo",
        });
      }
      blocks.push({ type: "buttons", buttons });
      continue;
    }

    // Check for inline "Read more" link box
    const readMoreMatch = line.match(/^\[(Read more:[^\]]+)\]\(([^)]+)\)$/i);
    if (readMoreMatch) {
      flushList();
      flushQuote();
      blocks.push({
        type: "read_more",
        label: readMoreMatch[1],
        url: readMoreMatch[2],
      });
      continue;
    }

    if (line.startsWith("Feature:")) {
      flushList();
      flushQuote();
      isFeatureList = true;
      continue;
    }

    if (line.startsWith("#### ")) {
      flushList();
      flushQuote();
      blocks.push({ type: "h4", text: line.slice(5) });
    } else if (line.startsWith("### ")) {
      flushList();
      flushQuote();
      blocks.push({ type: "h3", text: line.slice(4) });
    } else if (line.startsWith("## ")) {
      flushList();
      flushQuote();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!currentList) currentList = [];
      currentList.push(line.slice(2));
    } else {
      flushList();
      flushQuote();
      blocks.push({ type: "p", text: line });
    }
  }
  flushList();
  flushTable();
  flushQuote();
  return blocks;
}

function extractHeadings(content: string): TocHeading[] {
  const lines = content.split("\n");
  const headings: TocHeading[] = [];
  let isInsideFaqSection = false;

  lines.forEach((l) => {
    const trimmed = l.trim();
    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      const level = trimmed.startsWith("### ") ? "h3" : "h2";
      const text = trimmed.replace(/^#+\s+/, "");

      if (level === "h2") {
        isInsideFaqSection = isFaqHeading(text);
      } else if (isInsideFaqSection) {
        return;
      }

      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ id, text, level });
    }
  });
  return headings;
}

function isFaqHeading(text?: string) {
  const normalizedText = (text ?? "")
    .trim()
    .toLowerCase()
    .replace(/[?.!]+$/g, "");

  return (
    normalizedText === "faq" || normalizedText === "frequently asked questions"
  );
}

const InlineText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\[.+?\]\(.+?\)|<br\s*\/?>)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.match(/<br\s*\/?>/i)) {
          return <br key={i} />;
        }
        const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/);
        if (linkMatch) {
          return (
            <a
              key={i}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue font-bold hover:underline underline-offset-4 decoration-2 transition-all"
            >
              {linkMatch[1]}
            </a>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
};

// ─── Blog Post Detail (100% Webflow Replica) ──────────────────────────────────

const BLOG_02_STATS = [
  {
    value: "42%",
    label: "of HR professionals decide in under 10 seconds",
    source: "Novoresume HR Survey 2025",
    accentClass: "text-blue-400",
  },
  {
    value: "82%",
    label: "of companies use ATS to screen resumes",
    source: "Novoresume HR Survey 2025",
    accentClass: "text-cyan-300",
  },
  {
    value: "79%",
    label: "of hiring managers check work experience first",
    source: "Novoresume HR Survey 2025",
    accentClass: "text-sky-300",
  },
  {
    value: "92.6%",
    label: "of HR professionals say LinkedIn is critical or useful",
    source: "Novoresume HR Survey 2025",
    accentClass: "text-indigo-300",
  },
  {
    value: "506",
    label: "average applications per job posting",
    source: "Testlify 2025",
    accentClass: "text-blue-200",
  },
  {
    value: "99%",
    label: "of hiring managers now use AI in some part of hiring",
    source: "Insight Global 2025",
    accentClass: "text-teal-300",
  },
] as const;

const BLOG_02_TESTS = [
  {
    step: "Test 01",
    title: "Target-role match",
    description:
      "Does this item help a reader evaluate fit for this specific role, not your career in general?",
    question: '"Is this relevant to the role I am applying for right now?"',
    accentClass: "bg-blue-500",
  },
  {
    step: "Test 02",
    title: "Strength of evidence",
    description:
      "Does it prove a claim with concrete detail, or just assert one with vague language?",
    question: '"Does this sentence actually demonstrate something?"',
    accentClass: "bg-cyan-400",
  },
  {
    step: "Test 03",
    title: "Recency",
    description:
      "Is this evidence recent enough to signal that your skills and judgment are current?",
    question: '"Is this still meaningful given how much has changed?"',
    accentClass: "bg-sky-400",
  },
  {
    step: "Test 04",
    title: "Space efficiency",
    description:
      "Does it earn its space against everything competing for it? Every line displaces something else.",
    question: '"Is this worth more than what it displaces?"',
    accentClass: "bg-indigo-400",
  },
] as const;

const BLOG_02_INTRO = {
  lead: "Most resume advice is a list of things someone did wrong. Don't use tables. Don't put your address. Don't go two pages if you have less than ten years. These rules float around without context, get passed between people, and become gospel — even when they contradict each other depending on who you ask.",
  paragraphs: [
    "The problem isn't that the rules are wrong. It's that rules without decision logic are nearly useless when you actually sit down to write. When you're staring at a draft that doesn't feel right, what you need isn't another rule. You need a framework for thinking.",
    "This guide gives you that. A complete system covering every resume element — plus the science of how resumes are actually screened, recruiter psychology, ATS intelligence, and the fatal mistakes that eliminate otherwise-qualified candidates before a human ever sees them.",
  ],
  quote:
    'A resume that answers "What have I done?" will always lose to one that answers "Why am I the right fit for this specific role?"',
  cite: "The core shift that changes every decision",
} as const;

const BLOG_02_INTRO_COPY = {
  lead: "Most resume advice is a list of things someone did wrong. Don't use tables. Don't put your address. Don't go two pages if you have less than ten years. These rules float around without context, get passed between people, and become gospel \u2014 even when they contradict each other depending on who you ask.",
  paragraphs: [
    "The problem isn't that the rules are wrong. It's that rules without decision logic are nearly useless when you actually sit down to write. When you're staring at a draft that doesn't feel right, what you need isn't another rule. You need a framework for thinking.",
    "This guide gives you that. A complete system covering every resume element \u2014 plus the science of how resumes are actually screened, recruiter psychology, ATS intelligence, and the fatal mistakes that eliminate otherwise-qualified candidates before a human ever sees them.",
  ],
} as const;

const BLOG_02_SECTION_TWO_PIPELINE = [
  {
    stage: "Stage 01",
    icon: "⚙",
    title: "ATS / AI filter",
    body: "82% of companies run every resume through an ATS. It scans for keywords, qualifications, and structure. No human sees it at this stage. Fail here and you're eliminated before a recruiter ever opens the file.",
    footer: "Eliminates: ~60–70% of applicants",
  },
  {
    stage: "Stage 02",
    icon: "⚡",
    title: "Recruiter skim",
    body: "42% of HR professionals spend under 10 seconds on initial review. They're scanning for fit signals, not reading. They use an F-pattern: top horizontal, second horizontal, then down the left edge. Top-left is everything.",
    footer: "Eliminates: ~70–80% of remaining pool",
  },
  {
    stage: "Stage 03",
    icon: "🔍",
    title: "Hiring manager deep read",
    body: "Only the shortlisted few get here. Now they're reading carefully — validating the signals from stage two. Every claim in your bullets will be tested against what the role requires and what they'd probe in interviews.",
    footer: "Results in: interview offers for ~2–5%",
  },
] as const;

const BLOG_02_SECTION_TWO_HEATMAP_ZONES = [
  { text: "YOUR NAME · Title / Headline", level: "hot", badge: "🔥 Hottest" },
  {
    text: "Contact info · Location · LinkedIn",
    level: "hot",
    badge: "🔥 Hottest",
  },
  {
    text: "Current / Most recent job title + Company",
    level: "warm",
    badge: "Hot",
  },
  { text: "Date range of current role", level: "warm", badge: "Hot" },
  {
    text: "Most recent bullet (first words only)",
    level: "warm",
    badge: "Hot",
  },
  { text: "Previous role title + Company", level: "mild" },
  { text: "Previous role bullet — scanned briefly", level: "mild" },
  { text: "Earlier roles — largely skipped", level: "cold" },
  { text: "Education — checked late if at all", level: "cold" },
  { text: "Skills / Certifications — bottom-right blind spot", level: "cold" },
] as const;

const BLOG_02_SECTION_TWO_FIXATIONS = [
  "Your name — first thing seen, every time",
  "Current or most recent job title",
  "Current or most recent company name",
  "Start and end date of current role",
  "Previous job title (if visible)",
  "Education level and institution",
] as const;

const BLOG_02_SECTION_FOUR_COMPARISONS = [
  {
    badLabel: "Responsibility framing",
    badText:
      "Responsible for managing various projects and coordinating with stakeholders to ensure timely delivery of team outcomes.",
    badNote:
      "Tells the reader nothing specific. Every PM could claim this. Zero evidence.",
    goodLabel: "Evidence framing",
    goodText:
      "Managed 6 concurrent product launches across 4 teams; delivered all on schedule with 0 scope creep incidents over 18 months.",
    goodNote:
      "Specific. Countable. Defensible in an interview. The claim is proven, not asserted.",
  },
  {
    badLabel: "Skills claim without proof",
    badText:
      "Proficient in Python. Strong analytical mindset. Great communicator with excellent cross-functional collaboration skills.",
    badNote:
      "Every candidate says this. It is not evidence. The skills section is not the place for this.",
    goodLabel: "Skills shown through work",
    goodText:
      "Built Python ETL pipeline processing 2M+ daily records; reduced data latency from 4 hrs to 8 min for 3 downstream analytics teams.",
    goodNote:
      "Python is named once as context. The proof is the outcome \u2014 specific, measurable, scoped.",
  },
] as const;

const BLOG_02_SECTION_FOUR_EVIDENCE_TIERS = [
  {
    label: "Weak",
    text: '"Contributed to team success and helped improve overall outcomes"',
    className: "bg-slate-50 text-slate-700",
    badgeClassName: "bg-slate-200 text-slate-700",
  },
  {
    label: "Better",
    text: '"Led internal tooling project used by 200+ employees daily"',
    className: "bg-blue-50 text-slate-700",
    badgeClassName: "bg-blue-100 text-blue-700",
  },
  {
    label: "Strong",
    text: '"Built data pipeline reducing manual reporting from 8 hrs/week to 20 min"',
    className: "bg-blue-100/80 text-slate-800",
    badgeClassName: "bg-blue-600/10 text-blue-700",
  },
  {
    label: "Strongest",
    text: '"Sole engineer on CMS migration; launched on schedule, zero downtime, eliminated 3 weekly manual tasks for 12-person team"',
    className: "bg-slate-900 text-white",
    badgeClassName: "bg-white/10 text-white",
  },
] as const;

const BLOG_02_SECTION_FOUR_DO = [
  "Start with a strong, specific action verb (Led, Rebuilt, Reduced, Shipped, Negotiated)",
  "Vary the opening verb \u2014 no repeated starts across bullets",
  "Lead with the outcome when it&apos;s compelling",
  "Use the before/after mindset: what changed because of your work?",
  "Keep bullets to 1&ndash;2 lines; 3 maximum",
  "Have a full STAR story ready for every bullet for interview prep",
  "Show scope, standards, or ownership when exact numbers aren&apos;t available",
  "Use present tense for current roles, past for previous",
  "Vary structure: PAR, STAR, result-first, action-first",
] as const;

const BLOG_02_SECTION_FOUR_DONT = [
  "Start with &quot;Responsible for,&quot; &quot;Assisted with,&quot; or &quot;Helped to&quot;",
  "Use long paragraphs instead of focused bullets",
  "List daily tasks without outcomes or proof of value",
  "Use buzzword filler: &quot;team player,&quot; &quot;results-oriented,&quot; &quot;passionate about&quot;",
  "Include fake or inflated metrics you can&apos;t defend in an interview",
  "Overload with 10+ bullets \u2014 4&ndash;6 is usually right for a strong recent role",
  "Write bullets that could appear on any resume for any company",
  "Use first-person pronouns (I, my, me)",
] as const;

const BLOG_02_SECTION_FOUR_COMPARISONS_EXACT = [
  {
    badLabel: "Responsibility framing",
    badText:
      "Responsible for managing various projects and coordinating with stakeholders to ensure timely delivery of team outcomes.",
    badNote:
      "Tells the reader nothing specific. Every PM could claim this. Zero evidence.",
    goodLabel: "Evidence framing",
    goodText:
      "Managed 6 concurrent product launches across 4 teams; delivered all on schedule with 0 scope creep incidents over 18 months.",
    goodNote:
      "Specific. Countable. Defensible in an interview. The claim is proven, not asserted.",
  },
  {
    badLabel: "Skills claim without proof",
    badText:
      "Proficient in Python. Strong analytical mindset. Great communicator with excellent cross-functional collaboration skills.",
    badNote:
      "Every candidate says this. It is not evidence. The skills section is not the place for this.",
    goodLabel: "Skills shown through work",
    goodText:
      "Built Python ETL pipeline processing 2M+ daily records; reduced data latency from 4 hrs to 8 min for 3 downstream analytics teams.",
    goodNote:
      "Python is named once as context. The proof is the outcome — specific, measurable, scoped.",
  },
] as const;

const BLOG_02_SECTION_FOUR_EVIDENCE_TIERS_EXACT = [
  {
    label: "Weak",
    text: '"Contributed to team success and helped improve overall outcomes"',
    className: "article-evidence-tier--weak",
    badgeClassName: "article-evidence-tier__badge--weak",
  },
  {
    label: "Better",
    text: '"Led internal tooling project used by 200+ employees daily"',
    className: "bg-slate-100 text-slate-700",
    badgeClassName: "text-slate-500",
  },
  {
    label: "Strong",
    text: '"Built data pipeline reducing manual reporting from 8 hrs/week to 20 min"',
    className: "bg-blue-50 text-blue-900",
    badgeClassName: "text-blue-700/80",
  },
  {
    label: "Strongest",
    text: '"Sole engineer on CMS migration; launched on schedule, zero downtime, eliminated 3 weekly manual tasks for 12-person team"',
    className: "bg-blue-100 text-blue-950 font-medium",
    badgeClassName: "text-blue-800/80",
  },
] as const;

const BLOG_02_SECTION_FOUR_DO_EXACT = [
  "Start with a strong, specific action verb (Led, Rebuilt, Reduced, Shipped, Negotiated)",
  "Vary the opening verb &mdash; no repeated starts across bullets",
  "Lead with the outcome when it&apos;s compelling",
  "Use the before/after mindset: what changed because of your work?",
  "Keep bullets to 1&ndash;2 lines; 3 maximum",
  "Have a full STAR story ready for every bullet for interview prep",
  "Show scope, standards, or ownership when exact numbers aren&apos;t available",
  "Use present tense for current roles, past for previous",
  "Vary structure: PAR, STAR, result-first, action-first",
] as const;

const BLOG_02_SECTION_FOUR_DONT_EXACT = [
  "Start with &quot;Responsible for,&quot; &quot;Assisted with,&quot; or &quot;Helped to&quot;",
  "Use long paragraphs instead of focused bullets",
  "List daily tasks without outcomes or proof of value",
  "Use buzzword filler: &quot;team player,&quot; &quot;results-oriented,&quot; &quot;passionate about&quot;",
  "Include fake or inflated metrics you can&apos;t defend in an interview",
  "Overload with 10+ bullets &mdash; 4&ndash;6 is usually right for a strong recent role",
  "Write bullets that could appear on any resume for any company",
  "Use first-person pronouns (I, my, me)",
] as const;

const BLOG_02_SECTION_FIVE_WEAK = [
  {
    label: "hides your contribution",
    text: "We delivered the project on time despite significant complexity.",
  },
  {
    label: "no ownership",
    text: "Collaborated with cross-functional teams to improve the process.",
  },
  {
    label: "passive framing",
    text: "Was involved in building the new onboarding system.",
  },
  {
    label: "no scope",
    text: "Helped the company scale its operations significantly.",
  },
  {
    label: "undefendable",
    text: "Contributed to a successful product launch.",
  },
] as const;

const BLOG_02_SECTION_FIVE_STRONG = [
  {
    label: "clear contribution",
    text: "Owned end-to-end delivery of a 6-month platform rebuild; launched 2 weeks early with no critical bugs.",
  },
  {
    label: "specific role",
    text: "Led process redesign across 3 teams, reducing approval time from 14 days to 3.",
  },
  {
    label: "agency shown",
    text: "Architected and built the onboarding system from scratch; used by 400+ new employees annually.",
  },
  {
    label: "scoped claim",
    text: "Scaled ops from 3 to 22 markets in 18 months; built the playbook used by every new market team.",
  },
  {
    label: "defensible",
    text: "Drove launch strategy for flagship product; 12,000 users in 30 days, exceeding target by 40%.",
  },
] as const;

const BLOG_02_SECTION_SIX_CONTACT_INCLUDE: React.ReactNode[] = [
  "Full name (largest element on the page)",
  <>
    One-line headline: role title + domain + years (e.g., Senior PM &middot; B2B
    SaaS &middot; 8 yrs)
  </>,
  "City and state or city/country (metro area is fine)",
  <>Professional email &mdash; name-based, easy to type</>,
  "Phone with professional voicemail set",
  "LinkedIn URL: linkedin.com/in/firstname-lastname",
  <>Portfolio, GitHub, or work samples &mdash; if directly relevant</>,
  <>
    Clean file name:{" "}
    <code className="rounded bg-slate-100 px-1 py-[1px] font-mono text-[0.74rem] text-slate-700">
      FirstName LastName Resume.pdf
    </code>
  </>,
];

const BLOG_02_SECTION_SIX_CONTACT_EXCLUDE: React.ReactNode[] = [
  "Street address (city/metro is sufficient everywhere)",
  <>Photo (US/Canada default &mdash; see regional notes)</>,
  "Age, date of birth, marital status, religion, nationality",
  "Government ID or Social Insurance Number (Canada: never)",
  "Personal social accounts unless professionally relevant",
  <>
    Labels like &quot;Phone:&quot; or &quot;Email:&quot; before contact details
  </>,
  <>
    File names like{" "}
    <code className="article-inline-code rounded px-1 py-[1px]">
      Resume_FINAL_v3_UPDATED.docx
    </code>
  </>,
  <>Salary requirements &mdash; never on a resume</>,
];

const BLOG_02_SECTION_SIX_WORK_ROWS: React.ReactNode[][] = [
  [
    "Strong, recent, directly related",
    <>
      4&ndash;6 achievement-first bullets, full date range, clear title, company
      context line
    </>,
  ],
  [
    <>Related but older (5&ndash;10 yrs)</>,
    <>2&ndash;3 bullets focused on strongest evidence only</>,
  ],
  [
    "Older, not directly related",
    <>1&ndash;2 lines or consider removing; run through Tests 1 and 4</>,
  ],
  [
    "Multiple roles at one employer",
    "Group under one employer, list each title and date range, bullets under relevant roles only",
  ],
  [
    "Freelance / contract work",
    <>
      Group as &quot;Freelance [Role]&quot; or &quot;Independent
      Consultant&quot; with dates and bullets
    </>,
  ],
  [
    "Employment gap",
    "Brief factual entry only if material, recent, or timeline-confusing. No reasons for leaving on the resume.",
  ],
];

const BLOG_02_SECTION_SIX_EDUCATION_ROWS: React.ReactNode[][] = [
  [
    <>
      Student / recent grad{" "}
      <span className="ml-1 inline-flex rounded-full bg-amber-100 px-2 py-[2px] font-mono text-[0.58rem] uppercase tracking-[0.08em] text-amber-700">
        early
      </span>
    </>,
    "Top of resume",
    "Degree, institution, date, GPA if 3.5+ and relevant, relevant coursework, honors",
  ],
  [
    <>
      5+ years experience{" "}
      <span className="ml-1 inline-flex rounded-full bg-sky-100 px-2 py-[2px] font-mono text-[0.58rem] uppercase tracking-[0.08em] text-sky-700">
        exp
      </span>
    </>,
    "After work experience",
    "Degree, institution, date. May omit date with strategic reason.",
  ],
  [
    <>
      Career changer{" "}
      <span className="ml-1 inline-flex rounded-full bg-indigo-100 px-2 py-[2px] font-mono text-[0.58rem] uppercase tracking-[0.08em] text-indigo-700">
        pivot
      </span>
    </>,
    "After experience unless new-field credential",
    "Include new-field certifications or courses prominently",
  ],
  [
    <>
      All candidates{" "}
      <span className="ml-1 inline-flex rounded-full bg-slate-200 px-2 py-[2px] font-mono text-[0.58rem] uppercase tracking-[0.08em] text-slate-600">
        all
      </span>
    </>,
    <>&mdash;</>,
    <>
      Omit high school once college started. Never self-rate degrees. Mark
      in-progress as &quot;Expected [Month YYYY]&quot;.
    </>,
  ],
];

const BLOG_02_SECTION_SIX_SKILLS_INCLUDE: React.ReactNode[] = [
  "Exact tool and software names (Salesforce, Figma, dbt, Kubernetes)",
  "Programming languages and frameworks",
  "Platforms and technical systems",
  "Named methodologies (Agile, Six Sigma, JTBD)",
  "Certifications relevant and formally recognized in the field",
  "Spoken languages with objective labels: Native, Fluent, Professional Working Proficiency, Conversational",
];

const BLOG_02_SECTION_SIX_SKILLS_EXCLUDE: React.ReactNode[] = [
  <>
    Soft skills: &quot;teamwork,&quot; &quot;communication,&quot;
    &quot;leadership&quot; &mdash; they prove nothing
  </>,
  "Self-ratings: stars, percentages, progress bars, skill scales",
  <>Tools you barely used or can&apos;t discuss credibly</>,
  <>
    Generic software everyone uses (Word, email, &quot;Microsoft Office&quot;)
  </>,
  <>Skills you&apos;re learning but can&apos;t yet defend on the job</>,
  "Buzzword lists that carry no information (innovative, driven, agile)",
];

const BLOG_02_SECTION_SIX_OPTIONAL_SECTIONS = [
  {
    badge: "Projects",
    title: "Treat like work experience",
    body: "Outcome-focused bullets. Real tech stack. Link to live work or GitHub when clean. Essential for students and career changers.",
    badgeClassName: "bg-blue-100 text-blue-700",
  },
  {
    badge: "Volunteer work",
    title: "Structure like paid experience",
    body: "If it involves directly relevant skills, give it full bullets. If dates overlap paid work, separate the section to avoid timeline confusion.",
    badgeClassName: "bg-cyan-100 text-cyan-700",
  },
  {
    badge: "Certifications",
    title: "Only if relevant and recognized",
    body: "Formally recognized in the field and directly relevant to the target role. Mark in-progress credentials clearly.",
    badgeClassName: "bg-indigo-100 text-indigo-700",
  },
  {
    badge: "Interests",
    title: "Specific only, if space allows",
    body: "&quot;Avid reader&quot; wastes space. &quot;Maintain open-source CLI tool with 800+ GitHub stars&quot; or &quot;National wheelchair basketball competitor&quot; might not.",
    badgeClassName: "bg-amber-100 text-amber-700",
  },
  {
    badge: "Publications / Speaking",
    title: "Include if role-adjacent",
    body: "Strong signal for thought leadership, research, or senior positions. Use full citations or link to accessible versions.",
    badgeClassName: "bg-sky-100 text-sky-700",
  },
  {
    badge: "References",
    title: "Never on the resume",
    body: "Don&apos;t include. Don&apos;t write &quot;References available upon request.&quot; Hiring teams know they can ask. The line wastes space and signals outdated practice.",
    badgeClassName: "bg-slate-200 text-slate-600",
  },
] as const;

const BLOG_02_SECTION_SEVEN_LENGTH_CARDS = [
  {
    label: "Students / early career",
    title: "One page, always",
    body: "No justification for two pages when experience is limited. Fill it with the strongest relevant evidence \u2014 projects, coursework, internships, relevant extracurriculars.",
    value: "1 page",
  },
  {
    label: "Mid-career (5\u201312 yrs)",
    title: "One page, usually",
    body: "Two pages only if cutting to one would force removal of strong, directly relevant evidence for this role. Not because you have a lot of experience \u2014 because it matters here.",
    value: "1\u20132 pages",
  },
  {
    label: "Senior / experienced (12+ yrs)",
    title: "Two pages, justified",
    body: "A second page is legitimate when you have substantial directly related experience and cutting it would lose strong evidence. Show leadership scale, scope, and major decisions \u2014 they need room.",
    value: "2 pages max",
  },
  {
    label: "Technical / gov / academia",
    title: "Different rules apply",
    body: "Technical roles and government applications may need more detail. Academia uses a multi-page CV, not a resume \u2014 treat it as a different document type entirely.",
    value: "Context-dependent",
  },
] as const;

type AtsItem = { title: string; body: string; isBad?: boolean };

const BLOG_02_SECTION_EIGHT_ATS_ITEMS: AtsItem[] = [
  {
    title: "Standard section headings",
    body: `Work Experience, Education, Skills, Certifications. Parsers look for these by name. "Where I've Been" is creative but won't parse reliably.`,
  },
  {
    title: "Single column for most applications",
    body: "Multi-column layouts often read in the wrong order when parsed. For corporate and government roles: one column, left-aligned, standard reading flow.",
  },
  {
    title: "Real text only — no image text",
    body: "Content in images, text boxes, headers/footers, or graphics is frequently skipped entirely. Contact info in a designed header may disappear in the parsed version.",
  },
  {
    title: "Standard fonts at readable sizes",
    body: "Garamond, Calibri, Aptos, Times New Roman, Georgia. 10–12pt body. Nothing below 10pt. No decorative fonts for content.",
  },
  {
    title: "Tables and text boxes — risky",
    body: "Many parsers cannot read content inside tables or text boxes. Popular two-column templates often use text boxes for the sidebar — all that content may be invisible to ATS.",
    isBad: true,
  },
  {
    title: "Skill bars, icons, and graphics — eliminate",
    body: "Progress bars and star ratings provide no information to a parser (or a human). Images are skipped entirely. Use text. Always text.",
    isBad: true,
  },
];

const BLOG_02_SECTION_EIGHT_FILE_ROWS: React.ReactNode[][] = [
  [
    "Employer specifies a format",
    "Whatever they asked for",
    "Follow instructions first, always",
  ],
  [
    "Uploading to ATS portal yourself",
    <code
      key="ats-docx-self"
      className="rounded bg-slate-100 px-1 py-[1px] font-mono text-[0.74rem] text-slate-700"
    >
      .docx
    </code>,
    "Parses more reliably in most ATS systems",
  ],
  [
    "Agency or recruiter requests .docx",
    <code
      key="ats-docx-agency"
      className="rounded bg-slate-100 px-1 py-[1px] font-mono text-[0.74rem] text-slate-700"
    >
      .docx
    </code>,
    "Many recruiters reformat before submission",
  ],
  [
    "Emailing directly to a human",
    <code
      key="ats-pdf-email"
      className="rounded bg-slate-100 px-1 py-[1px] font-mono text-[0.74rem] text-slate-700"
    >
      .pdf
    </code>,
    "Preserves formatting; won&apos;t drift in different Word versions",
  ],
  [
    "ATS and human reading both plausible",
    <code
      key="ats-docx-both"
      className="rounded bg-slate-100 px-1 py-[1px] font-mono text-[0.74rem] text-slate-700"
    >
      .docx
    </code>,
    "ATS risk outweighs formatting preference",
  ],
  [
    "Creative / portfolio submissions",
    "Regional / employer norm",
    "Some creative roles expect designed PDFs; confirm before submitting",
  ],
] as const;

const BLOG_02_SECTION_NINE_WORKFLOW = [
  {
    step: "1",
    title: "Read the posting as a human, not a keyword scanner",
    body: "What are the three most important responsibilities? Which skills are required vs. nice-to-have? What level of seniority and autonomy? What tools and methods are named? This reading shapes all your decisions.",
  },
  {
    step: "2",
    title: "Build and maintain a master resume",
    body: "Keep a complete master resume with everything. Tailor copies from it. Never edit your only document in place — you'll lose evidence you might need for a different application.",
  },
  {
    step: "3",
    title: "Re-order and re-weight based on what this role needs most",
    body: "Move your most relevant experience higher. Give it more bullets. Give less relevant experience fewer bullets or cut it. Reframe bullets to surface matching skills — truthfully.",
  },
  {
    step: "4",
    title: "Mirror language from the posting — naturally",
    body: `If the posting says "lifecycle marketing" and you've been writing "retention campaigns," update where accurate. Use their exact tool names. Match their seniority language. Don't use vocabulary you can't defend.`,
  },
  {
    step: "5",
    title: "Run the 10-second skim test before sending",
    body: "Step back and skim in 10 seconds. Does the top of page one immediately communicate your target role and strongest evidence? If a recruiter read nothing else, would they know what you do and why you're credible?",
  },
] as const;

const BLOG_02_SECTION_TEN_LINKEDIN_ITEMS = [
  {
    title: "Headline carries disproportionate weight",
    body: 'Your LinkedIn headline appears in search results and recruiter inboxes. "Engineer at Acme" is weak. "Senior Platform Engineer · Kubernetes · Distributed Systems · Open to roles" is specific and searchable.',
  },
  {
    title: "Dates and titles must match your resume",
    body: "Inconsistencies between your resume and LinkedIn create immediate credibility concerns. The dates, titles, and company names must align. The descriptions can vary in length, but the facts must match.",
  },
  {
    title: "Customize your URL",
    body: "linkedin.com/in/firstname-lastname instead of the default string. Put the clean URL on your resume. It signals attention to detail and makes it easy to type.",
  },
  {
    title: "LinkedIn can expand — it can&apos;t contradict",
    body: "Your profile can include more context, longer descriptions, testimonials, and media that wouldn&apos;t fit on a resume. Use this. But never let it tell a different story than your resume tells.",
  },
  {
    title: "Profile completeness affects recruiter search ranking",
    body: "Incomplete profiles rank lower in LinkedIn recruiter search. Fill in all sections: summary, experience (even brief entries), education, skills, and at least one recommendation per major role.",
  },
  {
    title: "Open To Work signal — use strategically",
    body: 'The "Open to Work" frame is visible to recruiters even when hidden from your network. If you&apos;re actively searching, enable it. If you&apos;re passively browsing, the specific "recruiters only" setting protects you from current employer visibility.',
  },
] as const;

const BLOG_02_SECTION_ELEVEN_CASES = [
  {
    label: "Early career / student",
    title: "Lead with your strongest available evidence",
    variant: "early",
    items: [
      "One page, always",
      "Put education first if it's your strongest credential",
      "GPA only if 3.5+ and relevant to your market",
      "Coursework, student projects, extracurriculars pass the four tests the same as work experience",
      "Internships and part-time work go under experience with full bullets",
      "Use projects to prove skills when formal work history is thin",
      "Volunteer roles with relevant skills go under work experience",
      "Omit high school once college has started",
    ],
  },
  {
    label: "Experienced (10+ years)",
    title: "Prioritize ruthlessly, not comprehensively",
    variant: "experienced",
    items: [
      "Education moves to the bottom — after experience",
      "Older jobs no longer central to fit can be condensed or cut entirely",
      "The resume isn't a work history — it's a case for this role",
      "Second page is legitimate when cutting would lose strong directly relevant evidence",
      "Senior roles need to show leadership scale, scope, major decisions — give those room",
      "Consider omitting graduation date if age bias is a concern in your market",
      "Outdated certifications or methods no longer reflecting the field: cut them",
    ],
  },
  {
    label: "Career changer",
    title: "Close the fit gap before the reader has to",
    variant: "changer",
    items: [
      "Summary earns its place here — name the transition and map transferable skills explicitly",
      "Build a portfolio — proof of skill in the new direction beats any summary",
      "Reframe work experience bullets around transferable skills, not previous industry jargon",
      "Projects, side work, freelance, and relevant volunteer work can go near the top",
      "Relevant certifications or courses in the new field appear prominently",
      "One-page default still applies unless you have substantial relevant evidence",
      "Be explicit about the pivot — ambiguity reads as confusion, not versatility",
    ],
  },
] as const;

const BLOG_02_SECTION_TWELVE_MISTAKES = [
  {
    number: "Mistake 01",
    title: "ATS-invisible content",
    body: "Putting contact info, key skills, or role titles inside headers, footers, text boxes, or graphics. The parsed version may be missing entire sections of your resume.",
  },
  {
    number: "Mistake 02",
    title: "Generic, untailored copy",
    body: "Sending the same resume to every role. 82% of companies use ATS that score keyword match. An unoptimized resume is eliminated before a human ever sees it.",
  },
  {
    number: "Mistake 03",
    title: "Responsibility framing",
    body: "Every bullet describes what the role required rather than what you delivered. Job descriptions already say what the role requires. Your bullets must say what you made happen.",
  },
  {
    number: "Mistake 04",
    title: "Broken or missing links",
    body: "Non-functioning LinkedIn, portfolio, or GitHub links. Testing links before every send takes 60 seconds. Broken links signal carelessness to people who are already triaging fast.",
  },
  {
    number: "Mistake 05",
    title: "Inconsistent formatting",
    body: "Mixed tenses, inconsistent date formats, varying bullet styles, spacing inconsistencies. Formatting inconsistency is the fastest proxy for carelessness in document work.",
  },
  {
    number: "Mistake 06",
    title: "LinkedIn contradicts resume",
    body: "92.6% of HR professionals check LinkedIn. Different titles, dates, or responsibilities between your resume and profile create immediate credibility questions — at the worst possible moment.",
  },
  {
    number: "Mistake 07",
    title: "Unprofessional contact info",
    body: "Amateur email addresses, no voicemail, sloppy filenames. These signal a lack of professional self-awareness. The contact section requires no creativity — just reliability.",
  },
  {
    number: "Mistake 08",
    title: "Listing skills you can't defend",
    body: "Every skill listed implies competency. Listing tools you've barely touched creates risk in screening calls and interviews. List only what you can use at a level you could defend under questioning.",
  },
  {
    number: "Mistake 09",
    title: "The top doesn't communicate fit",
    body: "When a recruiter skims in 7 seconds, they're looking for fit signals. If the top of page one doesn't immediately tell them your target role and strongest evidence, they move on. The fit argument must be visible before a single bullet is read.",
  },
] as const;

const BLOG_02_SECTION_THIRTEEN_WORKFLOW = [
  {
    icon: "→",
    title: "Cover letters: when they matter",
    body: "Many cover letters are never read (66% of recruiters spend under 30 seconds). But when competition is tight or your story is unusual, a sharp letter can matter. 3–4 short paragraphs: why this company, why this role, what unique value you bring. Don't summarize your resume — add context it can't carry.",
  },
  {
    icon: "→",
    title: "LinkedIn alignment (see Section 10)",
    body: "Your profile must tell the same story as your resume. It can expand — never contradict. 92.6% of HR will check.",
  },
  {
    icon: "→",
    title: "Application timing",
    body: "Networking, referrals, and fast application timing matter independently of resume quality. A strong resume submitted on day 14 after a role goes live often loses to a weaker resume submitted day 1 via a referral. Apply early. Build relationships continuously — not only when searching.",
  },
  {
    icon: "→",
    title: "Follow-up",
    body: "One polite, concise follow-up after 7–14 days of silence is usually acceptable. Name, role, one-line reiteration of fit, a clear ask. No more than one follow-up unless invited to reach out again.",
  },
  {
    icon: "→",
    title: "Tracking",
    body: "Track in a simple spreadsheet: company, role, job link, date applied, resume version used, status, follow-up date. This prevents duplicate applications, makes follow-up timely, and surfaces patterns in what's landing.",
  },
] as const;

const BLOG_02_SECTION_FOURTEEN_GROUPS = [
  {
    title: "Strategy & targeting",
    items: [
      {
        text: "The top of page one immediately communicates my target role and strongest evidence",
        priority: "always",
      },
      {
        text: "This resume is tailored to this specific posting — not a generic copy",
        priority: "always",
      },
      {
        text: "Every element passes all four tests: role match, evidence strength, recency, space efficiency",
        priority: "always",
      },
      {
        text: "Keywords from the job description appear naturally in summary, skills, and bullets where truthful",
        priority: "ats",
      },
      {
        text: "I ran the 10-second skim test — a quick reader knows who I am, what I do, and my top wins",
        priority: "always",
      },
      {
        text: "My headline / title sets the right frame for the entire read (confirmation bias working for me)",
        priority: "default",
      },
    ],
  },
  {
    title: "Content quality",
    items: [
      {
        text: 'Every bullet leads with a strong, specific action verb — no "Responsible for" or "Helped with"',
        priority: "always",
      },
      {
        text: "Bullets focus on achievements and outcomes, not just responsibilities",
        priority: "always",
      },
      {
        text: "Every quantified claim is real and I can defend it in an interview",
        priority: "always",
      },
      {
        text: 'Language uses ownership framing — "I led / built / owned" not "we / team" without clarity on my role',
        priority: "default",
      },
      {
        text: 'No vague filler phrases ("results-driven," "team player," "great communicator")',
        priority: "always",
      },
      {
        text: "Skills section contains only hard skills I can use and defend — no self-ratings",
        priority: "always",
      },
      {
        text: "Company context line added under each employer (what the company does + scale)",
        priority: "default",
      },
      {
        text: "Summary (if included) is factual and supported by work experience below it",
        priority: "default",
      },
      {
        text: "Everything on this resume is true — no fabricated experience, titles, or metrics",
        priority: "always",
      },
    ],
  },
  {
    title: "Formatting & ATS compliance",
    items: [
      {
        text: "Font, size, bullet style, spacing, and tense usage are consistent throughout",
        priority: "always",
      },
      {
        text: "Date format is consistent throughout (e.g., MMM YYYY or YYYY-MM, not mixed)",
        priority: "default",
      },
      {
        text: "Current roles use present tense; past roles use past tense",
        priority: "always",
      },
      {
        text: "No tables, text boxes, or complex columns for ATS-heavy submissions",
        priority: "ats",
      },
      {
        text: "No essential content in headers, footers, or graphics where ATS may skip it",
        priority: "ats",
      },
      {
        text: "Resume tested on mobile — legible and readable on a phone screen",
        priority: "default",
      },
      {
        text: "No personal pronouns (I, my, me) throughout",
        priority: "default",
      },
      {
        text: "No references section anywhere on the document",
        priority: "default",
      },
    ],
  },
  {
    title: "Contact, file & LinkedIn",
    items: [
      {
        text: "Contact details at top: name, headline, city/state, phone, professional email, LinkedIn",
        priority: "always",
      },
      {
        text: "All links tested and working (LinkedIn URL, portfolio, GitHub)",
        priority: "always",
      },
      {
        text: "Professional email address — name-based, easy to read and type",
        priority: "always",
      },
      {
        text: "Clean file name: FirstName LastName Resume.pdf (never Final_v3_UPDATED)",
        priority: "default",
      },
      {
        text: "File format matches submission context (employer request first, then .docx for ATS, PDF for email)",
        priority: "default",
      },
      {
        text: "File opens correctly, is not password-protected, and is not a shared Google Docs link",
        priority: "always",
      },
      {
        text: "LinkedIn dates, titles, and companies match the resume exactly",
        priority: "always",
      },
      {
        text: "No street address, photo (US/CA), or unnecessary personal information",
        priority: "default",
      },
    ],
  },
  {
    title: "Final review",
    items: [
      {
        text: "Proofread carefully — contact info errors are fatal and embarrassingly common",
        priority: "always",
      },
      {
        text: "A human reviewer has read the final version and checked for obvious flaws",
        priority: "always",
      },
    ],
  },
] as const;

const BLOG_02_SECTION_FOURTEEN_TOTAL_ITEMS =
  BLOG_02_SECTION_FOURTEEN_GROUPS.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );

type ArticleMetaItem = string;
type StructuredArticleVariant = "legacy" | "webflow";

const ArticleParagraph: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <p className={`article-body ${className}`.trim()}>{children}</p>
);

const ArticleSubheading: React.FC<{
  children: React.ReactNode;
  id?: string;
}> = ({ children, id }) => (
  <h3 id={id} className="article-h3">
    <span className="article-h3-accent">&mdash;</span>
    {children}
  </h3>
);

const ArticleWebflowQuote: React.FC<{
  quote: React.ReactNode;
  cite?: React.ReactNode;
  className?: string;
}> = ({ quote, cite, className = "" }) => {
  const quoteClassName = `article-webflow-quote ${className}`.trim();

  return (
    <blockquote className={quoteClassName}>
      <em>
        {quote}
        {cite && (
          <>
            <br />
            <br />
            {cite}
          </>
        )}
      </em>
    </blockquote>
  );
};

const ArticleCalloutPanel: React.FC<{
  eyebrow: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ eyebrow, children, className = "" }) => (
  <div className={`article-panel--callout ${className}`.trim()}>
    <div className="article-eyebrow">{eyebrow}</div>
    {children}
  </div>
);

const ArticleStatStrip: React.FC<{
  items: Array<{
    value: string;
    label: string;
    note?: string;
    accentClass?: string;
  }>;
}> = ({ items }) => (
  <section className="article-stat-strip mb-8">
    <div className="article-stat-strip__grid grid grid-cols-2 gap-px sm:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="article-stat-strip__cell px-4 py-6 text-center transition-colors duration-200 md:px-5"
        >
          <div
            className={`article-stat-strip__value ${item.accentClass ?? "text-blue-300"}`}
          >
            {item.value}
          </div>
          <div className="article-stat-strip__label">{item.label}</div>
          {item.note && (
            <div className="article-stat-strip__note">{item.note}</div>
          )}
        </div>
      ))}
    </div>
  </section>
);

const ArticleInsightGrid: React.FC<{
  eyebrow: React.ReactNode;
  summary?: React.ReactNode;
  items: Array<{
    step: string;
    title: string;
    description: React.ReactNode;
    note?: React.ReactNode;
    accentClass?: string;
  }>;
}> = ({ eyebrow, summary, items }) => (
  <section className="article-insight-grid mb-14 overflow-hidden">
    <div className="article-insight-grid__header flex flex-col gap-3 border-b px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
      <span className="article-insight-grid__header-label">{eyebrow}</span>
      {summary && (
        <span className="article-insight-grid__summary max-w-[660px] md:text-right">
          {summary}
        </span>
      )}
    </div>

    <div className="article-insight-grid__grid grid grid-cols-1 gap-px md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.step}
          className="article-insight-grid__item px-6 py-8 transition-colors duration-200 md:px-7 md:py-9"
        >
          <div
            className={`mb-4 h-[2px] w-7 rounded-full ${item.accentClass ?? "bg-blue-500"}`}
          ></div>
          <div className="article-insight-grid__step">{item.step}</div>
          <h2 className="article-insight-grid__title">{item.title}</h2>
          <p className="article-insight-grid__copy">{item.description}</p>
          {item.note && (
            <p className="article-insight-grid__note">{item.note}</p>
          )}
        </div>
      ))}
    </div>
  </section>
);

const ArticleDropcapIntro: React.FC<{ lead: string; paragraphs: string[] }> = ({
  lead,
  paragraphs,
}) => (
  <section className="mb-14 w-full">
    <ArticleParagraph className="article-dropcap-lead">{lead}</ArticleParagraph>

    <div className="space-y-0">
      {paragraphs.map((paragraph) => (
        <ArticleParagraph key={paragraph}>{paragraph}</ArticleParagraph>
      ))}
    </div>
  </section>
);

const ArticlePullQuote: React.FC<{
  quote: React.ReactNode;
  cite?: React.ReactNode;
  className?: string;
}> = ({ quote, cite, className = "" }) => (
  <section className={`mb-16 w-full ${className}`.trim()}>
    <div className="article-pullquote-panel relative my-12 overflow-hidden px-6 py-8 md:px-8 md:py-10">
      <div className="article-pullquote-mark pointer-events-none absolute left-6 top-[0.6rem] text-[7rem] leading-none md:left-8">
        &ldquo;
      </div>
      <p className="article-pullquote-text relative z-10 pl-[0.8rem]">
        {quote}
      </p>
      {cite && (
        <cite className="article-pullquote-cite relative z-10 mt-[0.9rem] block pl-[0.8rem]">
          {cite}
        </cite>
      )}
    </div>

    <div className="article-divider mt-12" aria-hidden="true"></div>
  </section>
);

const ArticleAuthorMeta: React.FC<{
  post: BlogPost;
  items: ArticleMetaItem[];
}> = ({ post, items }) => (
  <div className="article-author-meta mb-10 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-200">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="h-full w-full object-cover"
          style={{ objectPosition: "center top" }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="article-author-meta__name text-[15px] font-bold leading-none">
          {post.author.name}
        </span>
        {post.author.role && (
          <span className="article-author-meta__role text-[13px]">
            {post.author.role}
          </span>
        )}
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
      {items.map((item, index) => (
        <React.Fragment key={item}>
          <span
            className={
              index === 0
                ? "article-author-meta__item article-author-meta__item--accent"
                : "article-author-meta__item"
            }
          >
            {item}
          </span>
          {index < items.length - 1 && (
            <span
              aria-hidden="true"
              className="article-author-meta__separator h-[3px] w-[3px] rounded-full"
            ></span>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const ArticleFooterMeta: React.FC<{ post: BlogPost; tags: string[] }> = ({
  post,
  tags,
}) => {
  const showFooterDate = post.showFooterDate !== false;
  const footerTags = post.footerTagLimit
    ? tags.slice(0, post.footerTagLimit)
    : tags;
  const singleLineFooterTags = post.singleLineFooterTags === true;

  return (
    <div className="article-footer-meta mt-16 border-t pt-8">
      <div
        className={`grid gap-12 sm:gap-16 ${
          showFooterDate ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1"
        }`}
      >
        <div
          className={`flex flex-col gap-2 justify-center ${
            showFooterDate ? "col-span-1 sm:col-span-3" : "col-span-1"
          }`}
        >
          <div
            className={`${
              singleLineFooterTags
                ? "flex flex-nowrap overflow-hidden gap-x-6"
                : "flex flex-wrap gap-x-6 gap-y-2"
            }`}
          >
            {footerTags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className={`article-tag-link cursor-pointer text-[16px] font-medium transition-colors ${
                  singleLineFooterTags ? "shrink-0 whitespace-nowrap" : ""
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {showFooterDate && (
          <div className="flex flex-col gap-2 justify-center sm:text-right">
            <span className="article-footer-date whitespace-nowrap text-[16px] font-medium">
              {post.date}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const ArticleRuleColumn: React.FC<{
  title: string;
  items: React.ReactNode[];
  variant: "include" | "exclude";
}> = ({ title, items, variant }) => {
  const isInclude = variant === "include";

  return (
    <div
      className={`article-rule-column ${isInclude ? "article-rule-column--include" : "article-rule-column--exclude"}`}
    >
      <div className="article-rule-column__title">{title}</div>

      <ul className="space-y-0">
        {items.map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="article-rule-column__item relative py-3 pl-6"
          >
            <span
              className="article-rule-column__icon absolute left-0 top-[0.86rem]"
              aria-hidden="true"
            >
              {isInclude ? <>&rarr;</> : <>&times;</>}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ArticleCompareBlock: React.FC<{
  badLabel: string;
  badContent: React.ReactNode;
  badNote: React.ReactNode;
  goodLabel: string;
  goodContent: React.ReactNode;
  goodNote: React.ReactNode;
}> = ({ badLabel, badContent, badNote, goodLabel, goodContent, goodNote }) => {
  return (
    <div className="article-compare my-8 grid gap-px overflow-hidden border md:grid-cols-2">
      <div className="article-compare__pane article-compare__pane--bad">
        <div className="article-compare__label">{badLabel}</div>
        <div className="article-compare__content">{badContent}</div>
        <div className="article-compare__note">{badNote}</div>
      </div>

      <div className="article-compare__pane article-compare__pane--good">
        <div className="article-compare__label">{goodLabel}</div>
        <div className="article-compare__content">{goodContent}</div>
        <div className="article-compare__note">{goodNote}</div>
      </div>
    </div>
  );
};

const ArticleGlobalTable: React.FC<{
  headers: React.ReactNode[];
  rows: React.ReactNode[][];
  caption?: string;
  useFirstColumnAsRowHeader?: boolean;
}> = ({ headers, rows, caption, useFirstColumnAsRowHeader = true }) => (
  <figure className="article-table-frame article-table-frame--elementor wp-block-table table-bf-26">
    <table className="article-table article-table--legacy has-fixed-layout">
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr className="article-table__head-row">
          {headers.map((header, headerIndex) => (
            <th
              key={`header-${headerIndex}`}
              scope="col"
              className="article-table__head article-table__cell article-table__cell--head has-text-align-center"
              data-align="center"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`} className="article-table__row">
            {row.map((cell, cellIndex) => {
              if (useFirstColumnAsRowHeader && cellIndex === 0) {
                return (
                  <th
                    key={`cell-${rowIndex}-${cellIndex}`}
                    scope="row"
                    className="article-table__cell article-table__cell--key has-text-align-center"
                    data-align="center"
                  >
                    {cell}
                  </th>
                );
              }

              return (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className="article-table__cell has-text-align-center"
                  data-align="center"
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </figure>
);

const ArticleDecisionTable: React.FC<{
  headers: string[];
  rows: React.ReactNode[][];
  variant?: StructuredArticleVariant;
  caption?: string;
}> = ({ headers, rows, caption }) => (
  <ArticleGlobalTable headers={headers} rows={rows} caption={caption} />
);

const ArticleFaq: React.FC<{ items: ArticleFaqItem[] }> = ({ items }) => (
  <div className="article-faq">
    {items.map((item, index) => (
      <details key={`faq-${index}`}>
        <summary>{item.question}</summary>
        <div className="article-faq__answer">{item.answer}</div>
      </details>
    ))}
  </div>
);

const ArticleFinalPrompt: React.FC = () => {
  return (
    <div className="article-final-prompt relative mt-16 overflow-hidden bg-slate-950 px-8 py-16 md:px-10">
      <div className="pointer-events-none absolute -bottom-20 right-[-2rem] text-[14rem] font-bold leading-none text-white/[0.03] md:text-[22rem]">
        ?
      </div>
      <h2 className="mb-3 text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.2] text-white">
        One question before you send
      </h2>
      <p className="mb-4 max-w-[560px] font-sans text-[0.95rem] leading-[1.7] text-white/55">
        Before every application, ask this once:
      </p>
      <div className="relative z-10 my-8 max-w-[640px] border-l-[3px] border-blue-500 px-7 py-6 font-serif text-[clamp(1.1rem,2vw,1.4rem)] italic leading-[1.5] text-white">
        &quot;If a recruiter reads only the first ten seconds of this resume, do
        they know what role I&apos;m targeting, and why I&apos;m credible for
        it?&quot;
      </div>
      <p className="mb-4 max-w-[560px] font-sans text-[0.95rem] leading-[1.7] text-white/55">
        If the answer is &quot;not really,&quot; that&apos;s your revision
        target. Not the font, not the margins, not whether to use a summary.
        Start with what the resume communicates in ten seconds, and work
        backward from there.
      </p>
      <p className="max-w-[560px] font-sans text-[0.95rem] leading-[1.7] text-white/55">
        A resume that survives that test is built on decision logic, not rules.
        The rules will sometimes conflict. The decisions won&apos;t — because
        they&apos;re grounded in the same four tests, informed by the same
        recruiter reality, and pointed at the same goal: earning the
        conversation, not describing the past.
      </p>
    </div>
  );
};

const NetworkingGuideFinalPrompt: React.FC = () => {
  return (
    <div className="article-final-prompt relative mt-16 overflow-hidden bg-slate-950 px-8 py-16 md:px-10">
      <div className="pointer-events-none absolute -bottom-20 right-[-2rem] text-[14rem] font-bold leading-none text-white/[0.03] md:text-[22rem]">
        ?
      </div>
      <h2 className="mb-3 text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.2] text-white">
        One question before you study
      </h2>
      <p className="mb-4 max-w-[560px] font-sans text-[0.95rem] leading-[1.7] text-white/55">
        Before opening another course, ask this once:
      </p>
      <div className="relative z-10 my-8 max-w-[640px] border-l-[3px] border-blue-500 px-7 py-6 font-serif text-[clamp(1.1rem,2vw,1.4rem)] italic leading-[1.5] text-white">
        &quot;Can I build, break, and repair the smallest real version of the
        topic I am studying today?&quot;
      </div>
      <p className="mb-4 max-w-[560px] font-sans text-[0.95rem] leading-[1.7] text-white/55">
        If the answer is no, the next step is not more theory. Build a smaller
        lab until the concept becomes visible in the terminal, the router UI, or
        the packet trace.
      </p>
      <p className="max-w-[560px] font-sans text-[0.95rem] leading-[1.7] text-white/55">
        Networking sticks when every definition is attached to a fault you can
        reproduce, diagnose, and fix.
      </p>
    </div>
  );
};

const StandardArticleContent: React.FC<{ blocks: ContentBlock[] }> = ({
  blocks,
}) => {
  const articleBlocks = normalizeStandardArticleBlocks(blocks);

  return (
    <div className="article-markdown article-markdown--webflow article-rich-text article-webflow-static">
      {articleBlocks.map((block, i) => {
        if (block.type === "h2") {
          const id = (block.text || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          const rawText = block.text || "";
          const hasGradient = rawText.includes("[gradient]");
          const cleanText = rawText.replace("[gradient]", "").trim();
          return (
            <h2
              key={i}
              id={id}
              className={`article-markdown-h2 scroll-mt-32 ${
                hasGradient ? "blog-gradient-heading tracking-[-0.02em]" : ""
              }`}
            >
              {cleanText}
            </h2>
          );
        }
        if (block.type === "h3") {
          const id = (block.text || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          const rawText = block.text || "";
          const hasGradient = rawText.includes("[gradient]");
          const cleanText = rawText.replace("[gradient]", "").trim();
          return (
            <h3
              key={i}
              id={id}
              className={`article-markdown-h3 scroll-mt-32 ${
                hasGradient ? "blog-gradient-heading" : ""
              }`}
            >
              {cleanText}
            </h3>
          );
        }
        if (block.type === "h4") {
          return (
            <h4 key={i} className="article-h4">
              {block.text}
            </h4>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="article-list list-disc">
              {(block.items || []).map((item, j) => (
                <li key={j} className="article-list__item">
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "feature_ul") {
          return (
            <div key={i} className="my-5">
              <p className="article-feature-list-label">Feature:</p>
              <ul className="article-list list-none">
                {(block.items || []).map((item, j) => (
                  <li
                    key={j}
                    className="article-feature-list__item flex items-start gap-3"
                  >
                    <span className="article-feature-list__dot mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" />
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (block.type === "read_more" && block.url && block.label) {
          return (
            <div
              key={i}
              className="article-link-card group my-5 w-fit px-5 py-3 transition-all"
            >
              <a
                href={block.url}
                target="_blank"
                rel="noopener noreferrer"
                className="article-link-card__link flex items-center gap-2"
              >
                <span className="shrink-0">Read more:</span>
                <span className="group-hover:underline underline-offset-4 decoration-2">
                  {block.label.replace(/^Read more:\s*/i, "")}
                </span>
              </a>
            </div>
          );
        }
        if (block.type === "image" && block.url) {
          return (
            <figure key={i} className="my-10 text-center">
              <div className="rounded-lg overflow-hidden border border-slate-200 inline-block max-w-full">
                <img
                  src={block.url}
                  alt={block.caption || "Blog image"}
                  className="max-w-full h-auto"
                />
              </div>
              {block.caption && (
                <figcaption className="article-caption mt-4">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={i} className="article-webflow-quote">
              <em>
                {block.lines.map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    <InlineText text={line} />
                    {lineIndex < block.lines.length - 1 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </em>
            </blockquote>
          );
        }
        if (block.type === "table") {
          return (
            <ArticleGlobalTable
              key={i}
              caption={
                block.caption || `Table with columns: ${block.headers.join(", ")}`
              }
              headers={block.headers.map((header, headerIndex) => (
                <InlineText key={headerIndex} text={header} />
              ))}
              rows={block.rows.map((row) =>
                row.map((cell, cellIndex) => (
                  <InlineText key={cellIndex} text={cell} />
                )),
              )}
            />
          );
        }
        if (block.type === "faq") {
          return (
            <ArticleFaq
              key={i}
              items={block.items.map((item) => ({
                question: item.question,
                answer: (
                  <>
                    {item.answer.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>
                        <InlineText text={paragraph} />
                      </p>
                    ))}
                  </>
                ),
              }))}
            />
          );
        }
        if (block.type === "buttons") {
          return (
            <div key={i} className="flex flex-wrap gap-4 my-8">
              {block.buttons.map((btn, j) => (
                <a
                  key={j}
                  href={btn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-10 py-4 rounded-lg font-bold text-[17px] transition-all shadow-md hover:shadow-xl hover:-translate-y-1 ${
                    btn.variant === "download"
                      ? "article-button--download bg-brand-blue text-white"
                      : "bg-slate-900 text-white hover:bg-black"
                  }`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          );
        }
        if (!("text" in block)) return null;
        return (
          <p key={i} className="article-body">
            <InlineText text={block.text || ""} />
          </p>
        );
      })}
    </div>
  );
};

function normalizeStandardArticleBlocks(blocks: ContentBlock[]) {
  const normalizedBlocks: ContentBlock[] = [];

  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];

    if (block.type !== "h2" || !isFaqHeading(block.text)) {
      normalizedBlocks.push(block);
      continue;
    }

    const faqItems: MarkdownFaqItem[] = [];
    let activeItem: MarkdownFaqItem | null = null;
    let cursor = index + 1;

    while (cursor < blocks.length) {
      const nextBlock = blocks[cursor];

      if (nextBlock.type === "h2") {
        break;
      }

      if (nextBlock.type === "h3") {
        if (activeItem) {
          faqItems.push(activeItem);
        }

        activeItem = {
          question: nextBlock.text ?? "",
          answer: [],
        };
      } else if (activeItem && nextBlock.type === "p" && nextBlock.text) {
        activeItem.answer.push(nextBlock.text);
      }

      cursor++;
    }

    if (activeItem) {
      faqItems.push(activeItem);
    }

    normalizedBlocks.push(block);

    if (faqItems.length > 0) {
      normalizedBlocks.push({ type: "faq", items: faqItems });
      index = cursor - 1;
    }
  }

  return normalizedBlocks;
}

const StructuredArticleSectionHeading: React.FC<{
  section: StructuredArticleSection;
  variant?: StructuredArticleVariant;
}> = ({ section, variant = "legacy" }) => {
  if (variant !== "legacy") {
    return (
      <h2 id={section.id} className="article-markdown-h2 scroll-mt-32">
        {section.title}
      </h2>
    );
  }

  if (section.headingStyle === "kicker") {
    return (
      <h2
        id={section.id}
        className={`article-h2 ${section.headingClassName ?? ""}`.trim()}
      >
        <span className="article-section-kicker">{section.sectionLabel}</span>
        {section.title}
      </h2>
    );
  }

  return (
    <>
      <div className="article-label">{section.sectionLabel}</div>
      <h2
        id={section.id}
        className={`article-h2 ${section.headingClassName ?? ""}`.trim()}
      >
        {section.title}
      </h2>
    </>
  );
};

const StructuredArticleBlockRenderer: React.FC<{
  block: StructuredArticleBlock;
  variant?: StructuredArticleVariant;
}> = ({ block, variant = "legacy" }) => {
  switch (block.type) {
    case "paragraph":
      return (
        <ArticleParagraph className={block.className}>
          {block.body}
        </ArticleParagraph>
      );
    case "subheading":
      if (variant !== "legacy") {
        return (
          <h3 id={block.id} className="article-markdown-h3 scroll-mt-32">
            {block.title}
          </h3>
        );
      }
      return <ArticleSubheading id={block.id}>{block.title}</ArticleSubheading>;
    case "callout":
      return (
        <ArticleCalloutPanel
          eyebrow={block.eyebrow}
          className={block.className}
        >
          {block.paragraphs.map((paragraph, index) => (
            <p key={index} className="article-panel--callout-copy">
              {paragraph}
            </p>
          ))}
        </ArticleCalloutPanel>
      );
    case "divider":
      return (
        <div
          className={`article-divider ${block.className ?? "mt-12"}`.trim()}
          aria-hidden="true"
        ></div>
      );
    case "statStrip":
      return <ArticleStatStrip items={block.items} />;
    case "insightGrid":
      return (
        <ArticleInsightGrid
          eyebrow={block.eyebrow}
          summary={block.summary}
          items={block.items}
        />
      );
    case "dropcapIntro":
      return (
        <ArticleDropcapIntro lead={block.lead} paragraphs={block.paragraphs} />
      );
    case "pullQuote":
      if (variant !== "legacy") {
        return (
          <ArticleWebflowQuote
            quote={block.quote}
            cite={block.cite}
            className={block.className}
          />
        );
      }
      return (
        <ArticlePullQuote
          quote={block.quote}
          cite={block.cite}
          className={block.className}
        />
      );
    case "ruleColumns":
      return (
        <div
          className={
            block.className ??
            "my-10 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2"
          }
        >
          {block.columns.map((column, index) => (
            <ArticleRuleColumn
              key={`${column.title}-${index}`}
              title={column.title}
              items={column.items}
              variant={column.variant}
            />
          ))}
        </div>
      );
    case "compare":
      return <ArticleCompareBlock {...block.comparison} />;
    case "decisionTable":
      return (
        <ArticleDecisionTable
          headers={block.headers}
          rows={block.rows}
          variant={variant}
          caption={block.caption}
        />
      );
    case "faq":
      return <ArticleFaq items={block.items} />;
    case "custom":
      return <>{block.render()}</>;
    default:
      return null;
  }
};

function getStructuredArticleBlockKey(
  prefix: string,
  block: StructuredArticleBlock,
  index: number,
) {
  return block.type === "custom"
    ? `${prefix}-${block.key}`
    : `${prefix}-${block.type}-${index}`;
}

const StructuredArticleContent: React.FC<{
  document: StructuredArticleDocument;
  variant?: StructuredArticleVariant;
}> = ({ document, variant = "legacy" }) => {
  const content = (
    <>
      {document.leadBlocks.map((block, index) => (
        <StructuredArticleBlockRenderer
          key={getStructuredArticleBlockKey("lead", block, index)}
          block={block}
          variant={variant}
        />
      ))}

      {document.sections.map((section) => (
        <section
          key={section.id}
          className={`article-section article-section--${section.id} mb-16 w-full`}
        >
          <StructuredArticleSectionHeading
            section={section}
            variant={variant}
          />
          {section.blocks.map((block, index) => (
            <StructuredArticleBlockRenderer
              key={getStructuredArticleBlockKey(section.id, block, index)}
              block={block}
              variant={variant}
            />
          ))}
        </section>
      ))}

      {document.outroBlocks?.map((block, index) => (
        <StructuredArticleBlockRenderer
          key={getStructuredArticleBlockKey("outro", block, index)}
          block={block}
          variant={variant}
        />
      ))}
    </>
  );

  if (variant !== "legacy") {
    const className = [
      "article-markdown",
      "article-markdown--webflow",
      "article-rich-text",
      "article-rich-text--structured",
    ]
      .filter(Boolean)
      .join(" ");

    return <div className={className}>{content}</div>;
  }

  return content;
};

const ResumeGuideChecklistBlock: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  const toggleChecklistItem = (id: string) => {
    setCheckedItems((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <div className="article-checklist my-10 overflow-hidden border border-slate-300">
      <div className="flex items-center justify-between gap-4 bg-slate-950 px-[1.4rem] py-[0.9rem] font-mono text-[0.65rem] uppercase tracking-[0.1em] text-white/55">
        <span>Pre-submit checklist &mdash; 33 items</span>
        <span className="text-[0.6rem] text-white/35">
          {completedCount} of {BLOG_02_SECTION_FOURTEEN_TOTAL_ITEMS} complete
        </span>
      </div>

      {BLOG_02_SECTION_FOURTEEN_GROUPS.map((group, groupIndex) => (
        <div
          key={group.title}
          className={
            groupIndex < BLOG_02_SECTION_FOURTEEN_GROUPS.length - 1
              ? "border-b border-slate-300"
              : ""
          }
        >
          <div className="bg-slate-100 px-[1.4rem] py-[0.6rem] font-mono text-[0.6rem] uppercase tracking-[0.1em] text-slate-500">
            {group.title}
          </div>
          {group.items.map((item, itemIndex) => {
            const itemId = `${groupIndex}-${itemIndex}`;
            const isChecked = Boolean(checkedItems[itemId]);
            const badgeClassName =
              item.priority === "always"
                ? "bg-rose-100 text-rose-700"
                : item.priority === "ats"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-200 text-slate-500";

            const badgeLabel =
              item.priority === "always"
                ? "Always"
                : item.priority === "ats"
                  ? "ATS"
                  : "Default";

            return (
              <button
                key={item.text}
                type="button"
                onClick={() => toggleChecklistItem(itemId)}
                className={`flex w-full items-start gap-[0.9rem] border-b border-slate-200 px-[1.4rem] py-3 text-left transition-colors duration-150 last:border-b-0 hover:bg-slate-50 ${
                  isChecked ? "bg-slate-50/70" : "bg-white"
                }`}
              >
                <span
                  className={`mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border-[1.5px] ${
                    isChecked
                      ? "border-blue-600 bg-blue-600"
                      : "border-slate-300 bg-transparent"
                  }`}
                  aria-hidden="true"
                >
                  {isChecked && (
                    <svg
                      className="h-3 w-3 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6.5L4.5 9L10 3.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={`font-sans text-[0.85rem] leading-[1.5] ${
                    isChecked
                      ? "text-slate-400 line-through decoration-slate-400"
                      : "text-slate-600"
                  }`}
                >
                  {item.text}
                </span>
                <span
                  className={`ml-auto shrink-0 rounded-[2px] px-[6px] py-[2px] font-mono text-[0.55rem] uppercase tracking-[0.06em] ${badgeClassName}`}
                >
                  {badgeLabel}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const RESUME_GUIDE_DOCUMENT: StructuredArticleDocument = {
  leadBlocks: [
    {
      type: "dropcapIntro",
      lead: BLOG_02_INTRO_COPY.lead,
      paragraphs: [...BLOG_02_INTRO_COPY.paragraphs],
    },
    {
      type: "pullQuote",
      quote: BLOG_02_INTRO.quote,
      cite: BLOG_02_INTRO.cite,
    },
  ],
  sections: [
    {
      sectionLabel: "Section 01",
      id: "what-most-resume-advice-gets-wrong",
      title: "What most resume advice gets wrong",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              Generic guides spend most of their time on aesthetics. Fonts,
              margins, whether to use a summary. These details matter at the
              edges, but they aren&apos;t why resumes succeed or fail. Resumes
              fail because they answer the wrong question.
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              Most candidates write a resume that answers{" "}
              <em>What have I done?</em> A strong resume answers{" "}
              <em>Why am I the right fit for this specific role?</em> That shift
              changes almost every decision {"\u2014"} what to include, what to
              cut, how many bullets to write, which jobs to even mention.
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              The other failure mode: treating resume advice as universal when
              it isn&apos;t. Advice that&apos;s correct for a recent grad
              applying to a startup will give the wrong answer for a 20-year
              executive applying to a government agency. Good judgment requires
              knowing which rule applies to your situation {"\u2014"} and
              that&apos;s what this guide is built around.
            </>
          ),
        },
        {
          type: "callout",
          eyebrow: "Working definitions used throughout this guide",
          paragraphs: [
            <>
              <strong className="font-semibold text-slate-900">Relevant</strong>{" "}
              {"\u2014"} useful for evaluating fit for the target role.{" "}
              <strong className="font-semibold text-slate-900">
                Directly related
              </strong>{" "}
              {"\u2014"} uses the same or closely adjacent skills, tools, or
              responsibilities.{" "}
              <strong className="font-semibold text-slate-900">Fit</strong>{" "}
              {"\u2014"} the overall match between your background and the
              role&apos;s requirements. When this guide says &quot;include if it
              helps,&quot; the standard is: does it add relevant evidence for
              the target role, judged by the four tests above?
            </>,
          ],
        },
        { type: "divider", className: "mt-12" },
      ],
    },
    {
      sectionLabel: "Section 02",
      id: "science-of-how-resumes-are-screened",
      title: "The science of how resumes are screened",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              Before writing a single word, you need to understand how resumes
              are actually read {"\u2014"} because it changes every layout and
              prioritization decision you make.
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              Your resume doesn&apos;t travel a single path from submission to
              interview. It travels three distinct stages, each with completely
              different logic.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-two-pipeline",
          render: () => (
            <div className="article-stage-flow article-stage-flow--editorial">
              {BLOG_02_SECTION_TWO_PIPELINE.map((item, index) => (
                <React.Fragment key={item.stage}>
                  <div className="article-stage-card article-stage-card--editorial">
                    <div className="article-stage-card__label">
                      {item.stage}
                    </div>
                    <div className="article-stage-card__icon">{item.icon}</div>
                    <div className="article-stage-card__title">
                      {item.title}
                    </div>
                    <div className="article-stage-card__body">{item.body}</div>
                    <div className="article-stage-card__footer">
                      {item.footer}
                    </div>
                  </div>
                  {index < BLOG_02_SECTION_TWO_PIPELINE.length - 1 && (
                    <div className="article-stage-flow__arrow">&rarr;</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              This three-stage reality means your resume needs to be three
              things simultaneously:{" "}
              <strong className="font-semibold text-slate-900">
                machine-readable
              </strong>{" "}
              (ATS),{" "}
              <strong className="font-semibold text-slate-900">
                skim-optimized
              </strong>{" "}
              (recruiter), and{" "}
              <strong className="font-semibold text-slate-900">
                evidence-rich
              </strong>{" "}
              (hiring manager). These constraints don&apos;t contradict
              {"\u2014"} they layer. Get the structure right for stage one, lead
              with fit signals for stage two, and back everything with evidence
              for stage three.
            </>
          ),
        },
        {
          type: "subheading",
          id: "f-pattern-six-fixation-points",
          title: "The F-pattern and six fixation points",
        },
        {
          type: "paragraph",
          body: (
            <>
              Eye-tracking studies {"\u2014"} including TheLadders&apos; studies
              (2012, 2018) and a 2025 Wonsulting experiment using recruiters
              with tracking equipment {"\u2014"} show consistent patterns in how
              trained screeners read resumes. The findings have been replicated
              multiple times:
            </>
          ),
        },
        {
          type: "custom",
          key: "section-two-attention-grid",
          render: () => (
            <figure className="article-attention-figure article-attention-figure--compact">
              <figcaption className="article-attention-figure__header">
                <span className="article-attention-figure__eyebrow">
                  Eye-tracking research
                </span>
                <span className="article-attention-figure__note">
                  Where recruiters actually look, based on TheLadders,
                  Wonsulting, and Nielsen Norman Group research.
                </span>
              </figcaption>

              <div className="article-attention-figure__grid">
                <section className="article-attention-panel">
                  <h4 className="article-attention-panel__title">
                    Attention sequence
                  </h4>
                  <div
                    className="article-attention-table"
                    role="table"
                    aria-label="Resume attention sequence"
                  >
                    {BLOG_02_SECTION_TWO_HEATMAP_ZONES.map((zone, index) => {
                      const levelLabel =
                        zone.level === "hot"
                          ? "Highest"
                          : zone.level === "warm"
                            ? "Medium"
                            : zone.level === "mild"
                              ? "Low"
                              : "Rare";
                      const normalizedText = zone.text
                        .replace(/Â·/g, "·")
                        .replace(/\u2014/g, "—");

                      return (
                        <div
                          key={zone.text}
                          className={`article-attention-row article-attention-row--${zone.level}`}
                          role="row"
                        >
                          <span
                            className="article-attention-row__index"
                            role="cell"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="article-attention-row__text"
                            role="cell"
                          >
                            {normalizedText}
                          </span>
                          <span
                            className="article-attention-row__level"
                            role="cell"
                          >
                            {levelLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="article-attention-panel">
                  <h4 className="article-attention-panel__title">
                    Six fixation points
                  </h4>
                  <ol className="article-fixation-list">
                    {BLOG_02_SECTION_TWO_FIXATIONS.map((item, index) => (
                      <li key={item} className="article-fixation-list__item">
                        <span className="article-fixation-list__index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item.replace(/\u2014/g, "—")}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </figure>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              The implication:{" "}
              <strong className="font-semibold text-slate-900">
                the top-left quadrant of your resume receives the most attention
              </strong>
              . Content in the bottom-right {"\u2014"} skills lists, older
              certifications, interests {"\u2014"} is essentially invisible
              during initial screening. Design for where eyes go, not where you
              think they should go.
            </>
          ),
        },
        {
          type: "subheading",
          id: "confirmation-bias-mechanism",
          title: "The confirmation bias mechanism",
        },
        {
          type: "paragraph",
          body: (
            <>
              One powerful insight from screening research: your resume title or
              headline creates a confirmation bias that shapes how the entire
              resume is read. When a recruiter sees &quot;Senior Product Manager
              {"\u2014"} B2B SaaS&quot; before reading anything else, they start
              unconsciously looking for evidence that confirms that frame. They
              become predisposed to interpret ambiguous experiences positively.
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              This means your headline is doing psychological work, not just
              descriptive work. Set the right frame at the top, and everything
              below it reads more favorably. Set the wrong frame (or no frame at
              all), and the recruiter has to construct their own interpretation
              {"\u2014"} which is almost never as favorable as the one
              you&apos;d construct yourself.
            </>
          ),
        },
        {
          type: "callout",
          eyebrow: "What this means for your resume layout",
          paragraphs: [
            <>
              Put your name, target role title, and your single most credible
              fit signal in the top 20% of page one. Don&apos;t bury your
              strongest credential in the middle of a job from 2019. Don&apos;t
              leave the recruiter to infer your target role. Make the fit
              argument visible in the first horizontal sweep {"\u2014"} before a
              single bullet is read.
            </>,
            <>
              A short, specific headline under your name (e.g.,{" "}
              <em>Senior Product Manager &middot; B2B SaaS &middot; 8 years</em>
              ) costs one line and earns disproportionate returns in the skim
              stage.
            </>,
          ],
        },
        { type: "divider", className: "mt-12" },
      ],
    },
    {
      sectionLabel: "Section 03",
      id: "four-test-decision-system",
      title: "The four-test decision system",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              Before anything lands on your resume {"\u2014"} a job, a bullet, a
              skill, a certification, a project {"\u2014"} it passes four tests.
              Run them in sequence. When something fails one test clearly, stop
              there.
            </>
          ),
        },
        {
          type: "subheading",
          id: "test-1-target-role-match",
          title: "Test 1 \u2014 Target-role match",
        },
        {
          type: "paragraph",
          body: (
            <>
              Does this item help a reader evaluate whether you&apos;re right
              for <em>this</em> role? Not every role, not your career in
              general. This specific role, at this company, right now. Two
              candidates with identical histories will have different answers
              depending on where they&apos;re applying. Target-role match is the
              first filter because everything else is secondary to fit.
            </>
          ),
        },
        {
          type: "subheading",
          id: "test-2-strength-of-evidence",
          title: "Test 2 \u2014 Strength of evidence",
        },
        {
          type: "paragraph",
          body: (
            <>
              A resume is an evidence document, not a self-description. The
              question isn&apos;t whether a claim sounds impressive {"\u2014"}
              it&apos;s whether the sentence actually proves it.
              &quot;Results-driven professional&quot; proves nothing.
              &quot;Rebuilt the onboarding process, cutting time-to-productivity
              from 90 to 45 days across a 40-person team&quot; proves something
              specific.
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              Quantify when you have credible numbers. When exact metrics
              aren&apos;t available, show scope (team size, budget, customer
              base), standards (compliance bar, SLA, editorial quality),
              automation (what did you eliminate?), or level of ownership (did
              you lead this or support it?).
            </>
          ),
        },
        {
          type: "subheading",
          id: "test-3-recency",
          title: "Test 3 \u2014 Recency",
        },
        {
          type: "paragraph",
          body: (
            <>
              Evidence decays. A strong project from twelve years ago in a
              different field isn&apos;t strong evidence for a role today
              {"\u2014"} even if it was impressive at the time. Give more room
              to recent and directly related roles. A job from fifteen years ago
              might warrant one line; a job from last year might warrant six
              bullets.
            </>
          ),
        },
        {
          type: "subheading",
          id: "test-4-space-efficiency",
          title: "Test 4 \u2014 Space efficiency",
        },
        {
          type: "paragraph",
          body: (
            <>
              Every line displaces something else. It&apos;s not enough for
              something to be technically relevant {"\u2014"} it has to be
              relevant <em>enough given what it displaces</em>. When something
              passes the first three tests marginally, test four often tips
              toward cutting or condensing to one line.
            </>
          ),
        },
        { type: "divider", className: "mt-12" },
      ],
    },
    {
      sectionLabel: "Section 04",
      id: "writing-bullets-that-actually-prove-things",
      title: "Writing bullets that actually prove things",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              The biggest gap between a mediocre and a strong resume isn&apos;t
              formatting {"\u2014"} it&apos;s the bullets. Specifically: whether
              bullets show what you <em>made happen</em> versus what you were{" "}
              <em>supposed to do</em>. The job description already tells a
              reader what the role requires. Your bullets should tell them what
              you specifically delivered.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-four-formula",
          render: () => (
            <figure className="article-bullet-formula">
              <figcaption className="article-bullet-formula__caption">
                The bullet formula
              </figcaption>
              <div className="article-bullet-formula__parts">
                {["Action verb", "What you did", "Result / scope / proof"].map(
                  (part, index) => (
                    <React.Fragment key={part}>
                      <span className="article-bullet-formula__part">
                        {part}
                      </span>
                      {index < 2 && (
                        <span
                          className="article-bullet-formula__operator"
                          aria-hidden="true"
                        >
                          +
                        </span>
                      )}
                    </React.Fragment>
                  ),
                )}
              </div>
              <p className="article-bullet-formula__note">
                Leading with the outcome is stronger when you have a compelling
                one. Every bullet should have a full STAR story behind it in
                case you&apos;re interviewed on it.
              </p>
            </figure>
          ),
        },
        {
          type: "compare",
          comparison: {
            badLabel: BLOG_02_SECTION_FOUR_COMPARISONS[0].badLabel,
            badContent: BLOG_02_SECTION_FOUR_COMPARISONS[0].badText,
            badNote: BLOG_02_SECTION_FOUR_COMPARISONS[0].badNote,
            goodLabel: BLOG_02_SECTION_FOUR_COMPARISONS[0].goodLabel,
            goodContent: BLOG_02_SECTION_FOUR_COMPARISONS[0].goodText,
            goodNote: BLOG_02_SECTION_FOUR_COMPARISONS[0].goodNote,
          },
        },
        {
          type: "compare",
          comparison: {
            badLabel: BLOG_02_SECTION_FOUR_COMPARISONS[1].badLabel,
            badContent: BLOG_02_SECTION_FOUR_COMPARISONS[1].badText,
            badNote: BLOG_02_SECTION_FOUR_COMPARISONS[1].badNote,
            goodLabel: BLOG_02_SECTION_FOUR_COMPARISONS[1].goodLabel,
            goodContent: BLOG_02_SECTION_FOUR_COMPARISONS[1].goodText,
            goodNote: BLOG_02_SECTION_FOUR_COMPARISONS[1].goodNote,
          },
        },
        {
          type: "custom",
          key: "section-four-evidence-spectrum",
          render: () => (
            <figure className="article-evidence-spectrum">
              <figcaption className="article-evidence-spectrum__caption">
                Evidence quality spectrum
              </figcaption>
              <div className="article-evidence-spectrum__list">
                {BLOG_02_SECTION_FOUR_EVIDENCE_TIERS.map((tier) => (
                  <div
                    key={tier.label}
                    className="article-evidence-spectrum__row"
                  >
                    <div className="article-evidence-spectrum__label">
                      {tier.label}
                    </div>
                    <div className="article-evidence-spectrum__copy">
                      {tier.text}
                    </div>
                  </div>
                ))}
              </div>
            </figure>
          ),
        },
        {
          type: "custom",
          key: "section-four-do-dont",
          render: () => (
            <div className="article-bullet-guidance">
              <section className="article-bullet-guidance__column">
                <h4 className="article-bullet-guidance__title">Do</h4>
                <ul className="article-bullet-guidance__list">
                  {BLOG_02_SECTION_FOUR_DO.map((item) => (
                    <li key={item} className="article-bullet-guidance__item">
                      <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }} />
                    </li>
                  ))}
                </ul>
              </section>
              <section className="article-bullet-guidance__column">
                <h4 className="article-bullet-guidance__title">Don&apos;t</h4>
                <ul className="article-bullet-guidance__list">
                  {BLOG_02_SECTION_FOUR_DONT.map((item) => (
                    <li key={item} className="article-bullet-guidance__item">
                      <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }} />
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ),
        },
        {
          type: "callout",
          eyebrow: "When you can&apos;t quantify",
          paragraphs: [
            <>
              Not every role produces clean metrics. When numbers aren&apos;t
              available or would mislead, show:{" "}
              <strong className="font-semibold text-slate-900">scale</strong>{" "}
              (team size, customer count, system throughput),{" "}
              <strong className="font-semibold text-slate-900">
                standards
              </strong>{" "}
              (compliance, SLA, editorial bar),{" "}
              <strong className="font-semibold text-slate-900">
                automation
              </strong>{" "}
              you created, or{" "}
              <strong className="font-semibold text-slate-900">
                level of ownership
              </strong>{" "}
              you held. Any concrete detail beats a vague assertion.
            </>,
          ],
        },
        { type: "divider", className: "mt-12" },
      ],
    },
    {
      sectionLabel: "Section 05",
      id: "ownership",
      title: "The ownership language principle",
      headingStyle: "kicker",
      headingClassName: "article-section-heading-tight",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              One of the most consistent signals recruiters use in 2025
              {"\u2014"} particularly for senior roles {"\u2014"} is how
              candidates describe their work. Do you speak in terms of personal
              ownership and outcomes, or do you hide behind collective language?
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              &quot;We launched the product&quot; tells a hiring manager nothing
              about what <em>you</em> contributed. &quot;Led a 4-person team
              that launched the product to 10,000 users in week one&quot; is
              evidence. The distinction between collective diffusion and
              individual ownership shows up in language choices that are easy to
              make and rarely made consciously.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-five-ownership-grid",
          render: () => (
            <div className="my-8 grid overflow-hidden border border-slate-300 bg-slate-300 md:grid-cols-2">
              <div className="article-ownership-pane--weak px-[1.4rem] py-[1.2rem]">
                <div className="article-ownership-pane__eyebrow article-ownership-pane__eyebrow--weak">
                  Collective diffusion {"\u2014"} weak
                </div>
                {BLOG_02_SECTION_FIVE_WEAK.map((item, index) => (
                  <div
                    key={item.label}
                    className={`article-ownership-pane__copy--weak py-[0.4rem] ${
                      index < BLOG_02_SECTION_FIVE_WEAK.length - 1
                        ? "border-b border-slate-200"
                        : ""
                    }`}
                  >
                    <strong className="mb-[0.1rem] block font-mono text-[0.7rem] uppercase tracking-[0.06em] opacity-60">
                      {item.label}
                    </strong>
                    {item.text}
                  </div>
                ))}
              </div>

              <div className="article-ownership-pane--strong px-[1.4rem] py-[1.2rem]">
                <div className="article-ownership-pane__eyebrow article-ownership-pane__eyebrow--strong">
                  Personal ownership {"\u2014"} strong
                </div>
                {BLOG_02_SECTION_FIVE_STRONG.map((item, index) => (
                  <div
                    key={item.label}
                    className={`article-ownership-pane__copy--strong py-[0.4rem] ${
                      index < BLOG_02_SECTION_FIVE_STRONG.length - 1
                        ? "border-b border-slate-200"
                        : ""
                    }`}
                  >
                    <strong className="mb-[0.1rem] block font-mono text-[0.7rem] uppercase tracking-[0.06em] opacity-60">
                      {item.label}
                    </strong>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ],
    },
    {
      sectionLabel: "Section 06",
      id: "sections",
      title: "Every section, decided",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "subheading",
          id: "contact-information",
          title: "Contact information",
        },
        {
          type: "paragraph",
          body: (
            <>
              Top of the page. Plain text only &mdash; no embedded headers or
              graphic elements where ATS may skip it. Include: full name, a
              one-line headline or target title, city and state/metro,
              professional phone, professional email, LinkedIn URL (customized),
              and portfolio if directly relevant to the target role.
            </>
          ),
        },
        {
          type: "ruleColumns",
          columns: [
            {
              title: "Include",
              items: BLOG_02_SECTION_SIX_CONTACT_INCLUDE,
              variant: "include",
            },
            {
              title: "Exclude",
              items: BLOG_02_SECTION_SIX_CONTACT_EXCLUDE,
              variant: "exclude",
            },
          ],
        },
        {
          type: "subheading",
          id: "profile-summary",
          title: "Profile summary",
        },
        {
          type: "paragraph",
          body: (
            <>
              A summary earns its place only when it meaningfully improves fit
              perception at the top of the page. For most mid-career candidates
              applying to clearly-matching roles, it&apos;s optional. For career
              changers, senior candidates, or anyone whose background needs
              framing &mdash; include it. Never use a vague paragraph. Make it
              factual, specific, and supportable by everything below it.
            </>
          ),
        },
        {
          type: "compare",
          comparison: {
            badLabel: "Bland paragraph",
            badContent:
              "Results-driven marketing professional with a passion for innovation and a proven track record of driving business growth through strategic thinking and excellent collaboration.",
            badNote: "No specific claims. No evidence. Could be on any resume.",
            goodLabel: "Factual, specific summary",
            goodContent:
              "Performance marketing manager with 8 years in B2B SaaS. Led paid acquisition at two Series B companies; managed $4M annual ad budget with consistent 3.2x ROAS. Specializes in lifecycle marketing using HubSpot, Segment, and Looker.",
            goodNote:
              "Target title, years, domain, tools, scale \u2014 every claim supported by the experience below.",
          },
        },
        {
          type: "callout",
          eyebrow:
            "Summary elements &mdash; include only what applies and is true",
          paragraphs: [
            <>
              Target role title or domain &middot; Years of experience &middot;
              Relevant industries or company types &middot; 2&ndash;3 specific
              tools or methodologies &middot; One measurable highlight &middot;
              Certifications or languages if role-relevant &middot; Keep to
              3&ndash;5 lines maximum
            </>,
            <>
              Critical rule: everything in the summary must be substantiated by
              your work experience below. If it&apos;s in the summary and
              doesn&apos;t appear in the bullets, cut it from the summary.
            </>,
          ],
        },
        {
          type: "subheading",
          id: "company-context-line",
          title: "The company context line",
        },
        {
          type: "paragraph",
          body: (
            <>
              One underused tactic: under each company name, add a single line
              of context &mdash; what the company does and its scale. Not every
              recruiter knows every employer. &quot;Acme Corp&quot; tells them
              nothing. &quot;Acme Corp &mdash; B2B logistics SaaS, $200M ARR,
              800 employees&quot; gives the entire experience section more
              weight. Keep it one line. Keep it factual.
            </>
          ),
        },
        {
          type: "compare",
          comparison: {
            badLabel: "No company context",
            badContent: (
              <>
                <strong className="font-semibold">Nexbridge Solutions</strong>{" "}
                &middot; 2021&ndash;2024
                <br />
                Senior Engineer
                <br />
                &bull; Built infrastructure for core product...
              </>
            ),
            badNote:
              "Recruiter doesn't know if Nexbridge is a 5-person startup or a Fortune 500.",
            goodLabel: "With company context",
            goodContent: (
              <>
                <strong className="font-semibold">Nexbridge Solutions</strong>{" "}
                &middot; 2021&ndash;2024
                <br />
                <em className="text-[0.82rem] text-blue-900">
                  Series B cloud infrastructure company &middot; $40M ARR
                  &middot; 120 employees
                </em>
                <br />
                Senior Engineer
                <br />
                &bull; Built infrastructure for core product...
              </>
            ),
            goodNote:
              "One line gives the recruiter the scale and context to interpret every bullet that follows.",
          },
        },
        {
          type: "subheading",
          id: "work-experience",
          title: "Work experience",
        },
        {
          type: "paragraph",
          body: (
            <>
              Reverse chronological order. More bullets for recent, directly
              related roles; fewer for older or lower-relevance ones. Group
              multiple roles at one employer under a single employer header to
              show career progression.
            </>
          ),
        },
        {
          type: "decisionTable",
          headers: ["Role situation", "What to do"],
          rows: BLOG_02_SECTION_SIX_WORK_ROWS,
        },
        {
          type: "subheading",
          id: "education",
          title: "Education",
        },
        {
          type: "decisionTable",
          headers: ["Situation", "Placement", "What to include"],
          rows: BLOG_02_SECTION_SIX_EDUCATION_ROWS,
        },
        {
          type: "subheading",
          id: "skills-section",
          title: "Skills section",
        },
        {
          type: "paragraph",
          body: (
            <>
              Hard skills only. This means specific tools, software, programming
              languages, frameworks, platforms, technical systems,
              certifications, and named methodologies. If you list it,
              you&apos;re implying you can defend it in a screening call.
              Don&apos;t list what you can&apos;t back up.
            </>
          ),
        },
        {
          type: "ruleColumns",
          columns: [
            {
              title: "Include in skills",
              items: BLOG_02_SECTION_SIX_SKILLS_INCLUDE,
              variant: "include",
            },
            {
              title: "Never include",
              items: BLOG_02_SECTION_SIX_SKILLS_EXCLUDE,
              variant: "exclude",
            },
          ],
        },
        {
          type: "subheading",
          id: "optional-sections",
          title: "Optional sections",
        },
        {
          type: "custom",
          key: "section-six-optional-sections",
          render: () => (
            <div className="article-card-grid article-card-grid--optional">
              {BLOG_02_SECTION_SIX_OPTIONAL_SECTIONS.map((item) => (
                <div
                  key={item.badge}
                  className="article-card article-card--interactive"
                >
                  <span
                    className={`article-card__badge ${item.badgeClassName}`}
                  >
                    {item.badge}
                  </span>
                  <div className="article-card__title">{item.title}</div>
                  <div className="article-card__copy">
                    <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.body) }} />
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      sectionLabel: "Section 07",
      id: "length",
      title: "The length question, answered properly",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              One page is the default. Not a rule {"\u2014"} a default. A
              default means: start here, move away only when you have a clear
              reason grounded in evidence.
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              Note: a 2025 Novoresume survey of 418 HR professionals found 68%
              consider a two-page resume ideal versus only 22% preferring one
              page. This doesn&apos;t mean everyone should go to two pages
              {"\u2014"} it means that for candidates with substantial relevant
              experience, two pages are not penalized the way conventional
              wisdom suggests. The operative word is &quot;relevant.&quot; Two
              pages of relevant content is better than one page padded out. One
              tight page is better than two pages with filler.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-seven-length-cards",
          render: () => (
            <div className="article-card-grid article-card-grid--length">
              {BLOG_02_SECTION_SEVEN_LENGTH_CARDS.map((item) => (
                <div key={item.label} className="article-card">
                  <div className="article-card__badge">{item.label}</div>
                  <div className="article-card__title">{item.title}</div>
                  <div className="article-card__copy">{item.body}</div>
                  <span className="article-card__value">{item.value}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          type: "callout",
          eyebrow: "The right length question",
          paragraphs: [
            <>
              Don&apos;t ask: &quot;Have I worked long enough for a second
              page?&quot; Ask: &quot;Would cutting to one page force me to
              remove strong evidence that directly supports my fit for this
              specific role?&quot; If yes, keep it. If no, cut it. Never pad to
              reach a target. Never cram to hit one page. Readable whitespace is
              not wasted space.
            </>,
          ],
        },
      ],
    },
    {
      sectionLabel: "Section 08",
      id: "ats",
      title: "ATS and formatting rules that actually matter",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              With 82% of companies using ATS and 99% using AI in some part of
              hiring, optimizing for machine parsing is not optional {"\u2014"}{" "}
              it&apos;s table stakes. The practical guidance is straightforward:
              use a format parsers can read, and don&apos;t put content in
              places parsers skip.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-eight-ats-grid",
          render: () => (
            <div className="article-info-grid">
              <div className="article-info-grid__header article-info-grid__header--neutral">
                <div className="article-info-grid__badge article-info-grid__badge--neutral">
                  ATS
                </div>
                <div>
                  <div className="article-info-grid__heading">
                    ATS-safe formatting: what it actually means
                  </div>
                  <div className="article-info-grid__subheading">
                    Structural decisions that determine whether your resume is
                    parsed correctly
                  </div>
                </div>
              </div>

              <div className="article-info-grid__grid">
                {BLOG_02_SECTION_EIGHT_ATS_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className={`article-info-grid__item ${
                      item.isBad ? "article-info-grid__item--warning" : ""
                    }`}
                  >
                    <strong className="article-info-grid__item-title">
                      {item.title}
                    </strong>
                    {item.body}
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          type: "subheading",
          id: "file-format-decision-tree",
          title: "File format decision tree",
        },
        {
          type: "decisionTable",
          headers: ["Situation", "Format", "Why"],
          rows: BLOG_02_SECTION_EIGHT_FILE_ROWS as React.ReactNode[][],
        },
        {
          type: "callout",
          eyebrow: "Mobile screening \u2014 an overlooked factor",
          className: "article-panel--callout-indigo",
          paragraphs: [
            <>
              Over 50% of resumes are first opened on a smartphone in 2025. This
              affects formatting: tiny fonts, dense text blocks, and complex
              layouts that look clean on a desktop screen become illegible on
              mobile. Test your resume on your phone before sending. If you
              can&apos;t read it comfortably in one scroll, it needs work.
            </>,
          ],
        },
        {
          type: "callout",
          eyebrow: "Regional formatting exceptions",
          paragraphs: [
            <>
              <strong className="font-semibold text-slate-900">
                US and Canada:
              </strong>{" "}
              No photo (default). No street address. No Social Insurance Number
              (Canada: never).
            </>,
            <>
              <strong className="font-semibold text-slate-900">
                Parts of Europe, Japan:
              </strong>{" "}
              Photos may be expected. Research local norms before applying
              internationally.
            </>,
            <>
              <strong className="font-semibold text-slate-900">
                Creative roles:
              </strong>{" "}
              More formatting flexibility. A designed PDF is usually fine for
              portfolio submissions {"\u2014"} but keep a plain ATS version
              ready for upload fields.
            </>,
          ],
        },
      ],
    },
    {
      sectionLabel: "Section 09",
      id: "tailoring",
      title: "Tailoring without keyword stuffing",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              Tailoring advice {"\u2014"} &quot;customize every resume!&quot;
              {"\u2014"} gets repeated so often it becomes noise. Most people
              either ignore it or keyword-stuff blindly. Neither works. Real
              tailoring means aligning your language and priorities truthfully
              to the posting, so your strongest relevant evidence appears at the
              top and your vocabulary matches the role&apos;s vocabulary.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-nine-workflow",
          render: () => (
            <div className="article-workflow-list">
              {BLOG_02_SECTION_NINE_WORKFLOW.map((item) => (
                <div key={item.step} className="article-workflow-step">
                  <div className="article-workflow-step__marker">
                    {item.step}
                  </div>
                  <div className="article-workflow-step__content">
                    <div className="article-workflow-step__title">
                      {item.title}
                    </div>
                    <div className="article-workflow-step__body">
                      {item.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
        {
          type: "custom",
          key: "section-nine-variants-note",
          render: () => (
            <div className="my-8 border-l-[3px] border-slate-300 pl-[1.4rem]">
              <p className="font-sans text-[0.88rem] italic leading-[1.6] text-slate-500">
                For candidates targeting meaningfully different role families or
                industries, create 2&ndash;3 base resume variants. Tailor each
                serious application from the appropriate base. This is not
                spray-and-pray {"\u2014"} it&apos;s efficient targeting. Broad
                application volume only works if each serious target is properly
                tailored.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      sectionLabel: "Section 10",
      id: "linkedin",
      title: "LinkedIn as a strategic layer",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              With 92.6% of HR professionals saying LinkedIn is critical or
              useful to their recruitment decisions, your LinkedIn profile is
              effectively a second resume {"\u2014"} one that&apos;s checked
              independently of your application. The implication: it needs to
              tell the same story as your resume, or inconsistencies will create
              doubt at exactly the wrong moment.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-ten-linkedin-grid",
          render: () => (
            <div className="article-info-grid">
              <div className="article-info-grid__header article-info-grid__header--linkedin">
                <div className="article-info-grid__badge article-info-grid__badge--linkedin">
                  in
                </div>
                <div>
                  <div className="article-info-grid__heading article-info-grid__heading--inverse">
                    LinkedIn optimization {"\u2014"} what 92.6% of HR will check
                  </div>
                  <div className="article-info-grid__subheading article-info-grid__subheading--inverse">
                    Your profile should support your resume, not contradict it
                  </div>
                </div>
              </div>

              <div className="article-info-grid__grid">
                {BLOG_02_SECTION_TEN_LINKEDIN_ITEMS.map((item) => (
                  <div key={item.title} className="article-info-grid__item">
                    <strong className="article-info-grid__item-title">
                      {item.title}
                    </strong>
                    <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.body) }} />
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ],
    },
    {
      sectionLabel: "Section 11",
      id: "special-cases",
      title: "Special cases: when the standard rules change",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              The four-test system applies universally. But career stage and
              situation change how you apply it.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-eleven-cases-grid",
          render: () => (
            <div className="my-10 grid gap-px overflow-hidden border border-slate-300 bg-slate-300 xl:grid-cols-3">
              {BLOG_02_SECTION_ELEVEN_CASES.map((item) => (
                <div
                  key={item.label}
                  className={`px-6 py-7 ${
                    item.variant === "early"
                      ? "article-case-card--early"
                      : item.variant === "experienced"
                        ? "article-case-card--experienced"
                        : "article-case-card--transition"
                  }`}
                >
                  <div
                    className={`article-case-card__label ${
                      item.variant === "early"
                        ? "article-case-card__label--early"
                        : item.variant === "experienced"
                          ? "article-case-card__label--experienced"
                          : "article-case-card__label--transition"
                    }`}
                  >
                    {item.label}
                  </div>
                  <div className="mb-4 text-[1.05rem] font-bold leading-[1.25] text-slate-900">
                    {item.title}
                  </div>
                  <ul className="list-none">
                    {item.items.map((point, index) => (
                      <li
                        key={point}
                        className={`relative py-[0.45rem] pl-[1.2rem] font-sans text-[0.8rem] leading-[1.4] text-slate-600 ${
                          index < item.items.length - 1
                            ? "border-b border-slate-300/70"
                            : ""
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-[0.42rem] text-[1rem] ${
                            item.variant === "early"
                              ? "article-case-card__bullet--early"
                              : item.variant === "experienced"
                                ? "article-case-card__bullet--experienced"
                                : "article-case-card__bullet--transition"
                          }`}
                          aria-hidden="true"
                        >
                          &middot;
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ),
        },
        {
          type: "subheading",
          id: "employment-gaps",
          title: "Employment gaps",
        },
        {
          type: "paragraph",
          body: (
            <>
              Gaps are less stigmatized than they were five years ago. The
              practical guidance: be honest, be brief, and prepare to discuss it
              constructively. Use a factual entry when the gap is material,
              recent, or could confuse the timeline. &quot;Personal leave of
              absence&quot; or &quot;Family caregiving&quot; with dates is
              enough. No reasons for leaving on the resume {"\u2014"}{" "}
              that&apos;s for the interview.
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              On date formats: using year-only dates reduces attention on small
              gaps between roles. Other guidance says obvious gaps look worse
              when you try to obscure them. Both positions have merit depending
              on context. The safest approach: be consistent in whatever format
              you choose, and be ready to address any visible gap in a
              conversation.
            </>
          ),
        },
      ],
    },
    {
      sectionLabel: "Section 12",
      id: "mistakes",
      title:
        "Nine fatal mistakes that eliminate otherwise-qualified candidates",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              These aren&apos;t stylistic preferences. Each of these is a
              common, documentable reason for qualified candidates to be
              screened out before their experience is evaluated.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-twelve-mistakes-grid",
          render: () => (
            <div className="article-card-grid article-card-grid--mistakes">
              {BLOG_02_SECTION_TWELVE_MISTAKES.map((item) => (
                <div
                  key={item.number}
                  className="article-card article-card--mistake"
                >
                  <div className="article-mistake-number article-card__badge">
                    {item.number}
                  </div>
                  <div className="article-card__title">{item.title}</div>
                  <div className="article-card__copy">{item.body}</div>
                </div>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      sectionLabel: "Section 13",
      id: "workflow",
      title: "Application workflow beyond the resume",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              The resume is one component of a system. Here&apos;s how the
              surrounding workflow affects outcomes.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-thirteen-workflow",
          render: () => (
            <div className="article-workflow-list">
              {BLOG_02_SECTION_THIRTEEN_WORKFLOW.map((item) => (
                <div key={item.title} className="article-workflow-step">
                  <div className="article-workflow-step__marker">
                    {item.icon}
                  </div>
                  <div className="article-workflow-step__content">
                    <div className="article-workflow-step__title">
                      {item.title}
                    </div>
                    <div className="article-workflow-step__body">
                      {item.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      sectionLabel: "Section 14",
      id: "checklist",
      title: "The complete pre-submit checklist",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              Run through this before every serious application. Click each item
              to mark it complete. Organized by category and tagged by
              importance level.
            </>
          ),
        },
        {
          type: "custom",
          key: "section-fourteen-checklist",
          render: () => <ResumeGuideChecklistBlock />,
        },
      ],
    },
  ],
  outroBlocks: [
    {
      type: "custom",
      key: "resume-guide-final-prompt",
      render: () => <ArticleFinalPrompt />,
    },
  ],
};

const NETWORKING_GUIDE_STATS = [
  {
    value: "7",
    label: "OSI layers used as a troubleshooting map",
    note: "diagnostic stack",
    accentClass: "text-blue-400",
  },
  {
    value: "2-3",
    label: "months to solid fundamentals with consistent labs",
    note: "beginner range",
    accentClass: "text-cyan-300",
  },
  {
    value: "5-7",
    label: "months to CCNA-level foundation from zero",
    note: "realistic range",
    accentClass: "text-sky-300",
  },
  {
    value: "0",
    label: "hardware required before you start practicing",
    note: "simulators work",
    accentClass: "text-indigo-300",
  },
  {
    value: "4",
    label: "steps in the build, break, fix, theory loop",
    note: "learning engine",
    accentClass: "text-blue-200",
  },
  {
    value: "6",
    label: "core topics that break most often in real networks",
    note: "practice first",
    accentClass: "text-teal-300",
  },
] as const;

const NETWORKING_GUIDE_TESTS = [
  {
    step: "Test 01",
    title: "Can I build it?",
    description:
      "Turn the idea into a tiny working topology before you treat it as learned.",
    note: "If it only exists in notes, it is not skill yet.",
    accentClass: "bg-blue-500",
  },
  {
    step: "Test 02",
    title: "Can I break it?",
    description:
      "Misconfigure the gateway, unplug the link, block a port, or change the DNS path on purpose.",
    note: "Controlled failure makes the concept visible.",
    accentClass: "bg-cyan-400",
  },
  {
    step: "Test 03",
    title: "Can I diagnose it?",
    description:
      "Start at Layer 1 and climb. Guessing feels fast, but ordered troubleshooting is faster.",
    note: "The OSI model becomes useful only when something fails.",
    accentClass: "bg-sky-400",
  },
  {
    step: "Test 04",
    title: "Can I explain it?",
    description:
      "Read the theory after the lab so the definition answers a problem you already met.",
    note: "Theory sticks when it attaches to a real symptom.",
    accentClass: "bg-indigo-400",
  },
] as const;

const NETWORKING_GUIDE_STAGES = [
  {
    stage: "Stage 01",
    icon: "01",
    title: "Map the failure",
    body: "Use the OSI model as a bottom-to-top diagnostic checklist, not as trivia to recite.",
    footer: "Outcome: you know where to look first",
  },
  {
    stage: "Stage 02",
    icon: "02",
    title: "Build the lab",
    body: "Use a home router, Packet Tracer, GNS3, or a small VPN topology before you feel ready.",
    footer: "Outcome: theory becomes observable",
  },
  {
    stage: "Stage 03",
    icon: "03",
    title: "Break the path",
    body: "Create faults deliberately: wrong subnet, blocked port, DNS error, bad gateway, dead route.",
    footer: "Outcome: symptoms become patterns",
  },
  {
    stage: "Stage 04",
    icon: "04",
    title: "Automate the repeat",
    body: "Once a manual configuration works, ask how Linux, Python, JSON, YAML, or Ansible would reproduce it.",
    footer: "Outcome: skills stay current",
  },
] as const;

const NETWORKING_LAB_CARDS = [
  {
    badge: "Lab 01",
    title: "Home router subnet",
    body: "Create a separate subnet and attach two client devices. Watch DHCP, gateway, and routing behavior without buying gear.",
    badgeClassName: "text-blue-600",
  },
  {
    badge: "Lab 02",
    title: "Packet Tracer or GNS3",
    body: "Build two routers, one switch, and a shared network. Then add a second network and make the route explicit.",
    badgeClassName: "text-cyan-600",
  },
  {
    badge: "Lab 03",
    title: "DHCP on the wire",
    body: "Configure DHCP yourself, capture the lease process, and connect the request-offer-ack flow to the theory.",
    badgeClassName: "text-sky-600",
  },
  {
    badge: "Lab 04",
    title: "Small VPN tunnel",
    body: "Use WireGuard to connect two sites and verify reachability through the tunnel with ping and traceroute.",
    badgeClassName: "text-indigo-600",
  },
  {
    badge: "Lab 05",
    title: "Domain to server",
    body: "Point a cheap domain to a server you control. Make SSH work through the name, not only the raw IP.",
    badgeClassName: "text-blue-700",
  },
  {
    badge: "Lab 06",
    title: "DNS record practice",
    body: "Configure A, CNAME, and MX records, then test exactly what each record resolves and where it fails.",
    badgeClassName: "text-teal-600",
  },
] as const;

const NETWORKING_MISTAKES = [
  {
    number: "01",
    title: "Reading before labbing",
    body: "Theory creates false confidence when it is never tested against a working topology.",
  },
  {
    number: "02",
    title: "Chasing every certification",
    body: "Network+, CCNA, and cloud certs in parallel usually means none of them get enough depth.",
  },
  {
    number: "03",
    title: "Skipping DNS and DHCP",
    body: "The boring fundamentals are often the first things that break in real support work.",
  },
  {
    number: "04",
    title: "Guessing under pressure",
    body: "Random fixes feel fast and usually waste more time than a disciplined layer-by-layer pass.",
  },
  {
    number: "05",
    title: "Ignoring automation",
    body: "Pure box-by-box CLI skill is shrinking. Linux, Python, APIs, and Ansible now sit beside networking fundamentals.",
  },
  {
    number: "06",
    title: "Waiting to feel ready",
    body: "There is no readiness threshold. A small lab is what creates readiness.",
  },
] as const;

const NETWORKING_GUIDE_DOCUMENT: StructuredArticleDocument = {
  leadBlocks: [
    {
      type: "statStrip",
      items: NETWORKING_GUIDE_STATS.map((stat) => ({ ...stat })),
    },
    {
      type: "insightGrid",
      eyebrow: "Core learning system",
      summary:
        "Treat every networking topic as something to build, break, diagnose, and then explain",
      items: NETWORKING_GUIDE_TESTS.map((test) => ({ ...test })),
    },
    {
      type: "dropcapIntro",
      lead: "Most people who set out to learn networking read a chapter, watch a video, and feel like they understand something - right up until a real network breaks and they have no idea where to even start looking.",
      paragraphs: [
        'That gap between "I read about it" and "I can fix it" is the entire problem this guide is built to close.',
        "You do not learn networking by studying more. You learn it by building something small, breaking it on purpose, and troubleshooting your way back - using the OSI model as your map and a certification syllabus as your curriculum, not your goal.",
      ],
    },
    {
      type: "pullQuote",
      quote:
        "Networking sticks when every definition is attached to a fault you can reproduce, diagnose, and fix.",
      cite: "The learning principle behind this roadmap",
    },
  ],
  sections: [
    {
      sectionLabel: "Section 01",
      id: "why-most-self-taught-learners-stall-out",
      title: "Why most self-taught learners stall out",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              Ask ten people how to learn networking and you will get ten
              syllabi: OSI model, subnetting, routing protocols, VLANs, DNS, and
              so on. That list is not wrong. It is just not the thing that is
              actually holding most people back.
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              The real failure point is{" "}
              <strong className="font-semibold text-slate-900">method</strong>,
              not material. Networking is a physical, hands-on skill wearing a
              theoretical costume. Understanding forms in your hands, on a
              keyboard, in a terminal - not on a page.
            </>
          ),
        },
        {
          type: "callout",
          eyebrow: "The correction",
          paragraphs: [
            <>
              Before you pick a course or a certification, fix the method first:
              less reading, sooner labbing, and a deliberate habit of breaking
              things so you are forced to understand why they broke.
            </>,
          ],
        },
        { type: "divider", className: "mt-12" },
      ],
    },
    {
      sectionLabel: "Section 02",
      id: "learn-the-osi-model-as-a-tool-not-trivia",
      title: "Learn the OSI model as a tool, not trivia",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              Everyone tells beginners to learn the OSI model, and then most
              beginners memorize seven words in order and move on. That is the
              wrong use of it entirely. The OSI model is a{" "}
              <strong className="font-semibold text-slate-900">
                diagnostic checklist
              </strong>{" "}
              you reach for the instant something breaks.
            </>
          ),
        },
        {
          type: "decisionTable",
          headers: ["Layer", "Name", "What to check"],
          rows: [
            ["7", "Application", "The app itself is broken, not the network."],
            [
              "6",
              "Presentation",
              "Formatting, encryption, and TLS certificate issues.",
            ],
            [
              "5",
              "Session",
              "Sessions dropping, timeouts, and authentication handshakes.",
            ],
            [
              "4",
              "Transport",
              "Wrong port, blocked firewall rule, TCP vs UDP behavior.",
            ],
            [
              "3",
              "Network",
              "Routing table, gateway, subnet mismatch, and reachability.",
            ],
            [
              "2",
              "Data Link",
              "Wrong VLAN, switch port down, MAC or ARP problems.",
            ],
            [
              "1",
              "Physical",
              "Cable unplugged, dead port, bad transceiver. Check this first.",
            ],
          ],
        },
        {
          type: "callout",
          eyebrow: "Bottom-up rule",
          paragraphs: [
            <>
              When something is broken, resist the urge to guess at Layer 7
              first because that is where the symptom appeared. Start at Layer 1
              and climb. It feels slower early. It becomes instinct after that.
            </>,
          ],
        },
      ],
    },
    {
      sectionLabel: "Section 03",
      id: "network-plus-vs-ccna-which-certification-first",
      title: "Network+ vs. CCNA: which certification first",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              This is one of the most common questions in networking, and the
              honest answer is: it depends on where you are starting from, not
              on which cert is better.
            </>
          ),
        },
        {
          type: "decisionTable",
          headers: ["Situation", "Start here", "Why"],
          rows: [
            [
              <strong>Complete beginner with no IT background</strong>,
              "CompTIA Network+",
              "Vendor-neutral, broader, and lighter on hands-on configuration.",
            ],
            [
              <strong>Some IT, cloud, or sysadmin experience</strong>,
              "Cisco CCNA",
              "You already have the mental scaffolding; CCNA gets you into configuration and troubleshooting.",
            ],
            [
              <strong>Aiming for a Network Engineer or NOC role</strong>,
              "CCNA, Network+ optional",
              "CCNA is the stronger filter for networking-specific roles.",
            ],
            [
              <strong>Aiming for general IT or help desk first</strong>,
              "CompTIA Network+",
              "Broad, transferable, and recognized across support and junior sysadmin roles.",
            ],
          ],
        },
        {
          type: "compare",
          comparison: {
            badLabel: "Weak use of certification",
            badContent: "Study only to pass the exam.",
            badNote:
              "This produces recognition without operational confidence.",
            goodLabel: "Strong use of certification",
            goodContent:
              "Use the exam objectives as a syllabus while proving every topic in a lab.",
            goodNote:
              "The certificate becomes structure, not a substitute for skill.",
          },
        },
      ],
    },
    {
      sectionLabel: "Section 04",
      id: "build-a-home-lab-before-you-feel-ready",
      title: "Build a home lab before you feel ready",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              People wait too long to start labbing because they assume they
              need to know enough first. That is backwards. The lab is how you
              get to know enough.
            </>
          ),
        },
        {
          type: "custom",
          key: "networking-lab-cards",
          render: () => (
            <div className="article-card-grid article-card-grid--optional">
              {NETWORKING_LAB_CARDS.map((item) => (
                <div
                  key={item.badge}
                  className="article-card article-card--interactive"
                >
                  <span
                    className={`article-card__badge ${item.badgeClassName}`}
                  >
                    {item.badge}
                  </span>
                  <div className="article-card__title">{item.title}</div>
                  <div className="article-card__copy">{item.body}</div>
                </div>
              ))}
            </div>
          ),
        },
        {
          type: "callout",
          eyebrow: "Do not overbuild the lab",
          paragraphs: [
            <>
              None of this needs to look production-grade. It just needs to be
              yours, so that when it breaks, you diagnose it instead of
              following someone else&apos;s steps.
            </>,
          ],
        },
      ],
    },
    {
      sectionLabel: "Section 05",
      id: "the-build-break-fix-theory-loop",
      title: "The build, break, fix, theory loop",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "custom",
          key: "networking-stage-flow",
          render: () => (
            <div className="article-stage-flow">
              {NETWORKING_GUIDE_STAGES.map((item, index) => (
                <React.Fragment key={item.stage}>
                  <div className="article-stage-card">
                    <div className="article-stage-card__label">
                      {item.stage}
                    </div>
                    <div className="article-stage-card__icon">{item.icon}</div>
                    <div className="article-stage-card__title">
                      {item.title}
                    </div>
                    <div className="article-stage-card__body">{item.body}</div>
                    <div className="article-stage-card__footer">
                      {item.footer}
                    </div>
                  </div>
                  {index < NETWORKING_GUIDE_STAGES.length - 1 && (
                    <div className="article-stage-flow__arrow">&rarr;</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              Reading the theory first gives you a false sense of understanding.
              Struggling with a real, broken thing first means the theory
              finally answers a question you already have, which is why it
              sticks the second time around.
            </>
          ),
        },
        {
          type: "pullQuote",
          quote:
            "Build the smallest version of a concept, sabotage it, fix it using the OSI model, and then read the chapter that explains what you just did.",
          cite: "The loop that turns vocabulary into skill",
        },
      ],
    },
    {
      sectionLabel: "Section 06",
      id: "troubleshoot-like-an-engineer-not-a-guesser",
      title: "Troubleshoot like an engineer, not a guesser",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              Systematic troubleshooting is the habit that separates people who
              know networking vocabulary from people who can operate a network.
              Start at Layer 1 and climb: cable, interface, address, gateway,
              DNS, port, application.
            </>
          ),
        },
        {
          type: "custom",
          key: "networking-troubleshooting-workflow",
          render: () => (
            <div className="article-workflow-list">
              {[
                {
                  step: "01",
                  title: "Confirm physical link",
                  body: "Cable, port, interface state, power, link light, transceiver, and wireless association.",
                },
                {
                  step: "02",
                  title: "Confirm addressing",
                  body: "IP address, subnet mask, default gateway, duplicate address, and DHCP lease.",
                },
                {
                  step: "03",
                  title: "Confirm path",
                  body: "Ping gateway, trace route, check routing table, verify NAT and firewall rules.",
                },
                {
                  step: "04",
                  title: "Confirm names and ports",
                  body: "DNS lookup, service port, TCP vs UDP behavior, TLS, and application health.",
                },
              ].map((item) => (
                <div key={item.step} className="article-workflow-step">
                  <div className="article-workflow-step__marker">
                    {item.step}
                  </div>
                  <div className="article-workflow-step__content">
                    <div className="article-workflow-step__title">
                      {item.title}
                    </div>
                    <div className="article-workflow-step__body">
                      {item.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      sectionLabel: "Section 07",
      id: "do-not-skip-the-boring-fundamentals",
      title: "Do not skip the boring fundamentals",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "custom",
          key: "networking-fundamentals-grid",
          render: () => (
            <div className="article-info-grid">
              <div className="article-info-grid__header article-info-grid__header--neutral">
                <div className="article-info-grid__badge article-info-grid__badge--neutral">
                  L1
                </div>
                <div>
                  <div className="article-info-grid__heading">
                    Fundamentals that break most often
                  </div>
                  <div className="article-info-grid__subheading">
                    Master these before chasing advanced protocols
                  </div>
                </div>
              </div>

              <div className="article-info-grid__grid">
                {[
                  [
                    "Subnetting",
                    "Practice until you can do it in your head, no calculator, under time pressure.",
                  ],
                  [
                    "DNS",
                    "Run your own resolver and watch queries resolve in real time.",
                  ],
                  [
                    "DHCP",
                    "Understand lease times, scopes, reservations, and renewal behavior by configuring them.",
                  ],
                  [
                    "NAT and port forwarding",
                    "Trace exactly what happens to a packet as it crosses the boundary.",
                  ],
                ].map(([title, body]) => (
                  <div key={title} className="article-info-grid__item">
                    <strong className="article-info-grid__item-title">
                      {title}
                    </strong>
                    {body}
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          type: "callout",
          eyebrow: "Why this matters",
          paragraphs: [
            <>
              None of this is advanced. But fluency here is what makes you fast
              and confident once you move on to topics that feel advanced.
            </>,
          ],
        },
      ],
    },
    {
      sectionLabel: "Section 08",
      id: "layer-in-automation-early",
      title: "Layer in automation early",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              Traditional CLI-driven, box-by-box configuration is shrinking in
              relative importance. More of the real work now happens through
              automation, infrastructure-as-code, and cloud-native networking
              constructs.
            </>
          ),
        },
        {
          type: "ruleColumns",
          columns: [
            {
              title: "Add early",
              variant: "include",
              items: [
                "Linux fundamentals",
                "Python basics",
                "JSON and YAML",
                "Ansible playbooks",
                "Cloud VPC networking",
                "REST API authentication",
              ],
            },
            {
              title: "Avoid",
              variant: "exclude",
              items: [
                "Treating automation as someone else's job",
                "Memorizing commands without understanding state",
                "Copying scripts you cannot explain",
                "Skipping manual diagnosis because a tool exists",
              ],
            },
          ],
        },
      ],
    },
    {
      sectionLabel: "Section 09",
      id: "resources-and-realistic-timeline",
      title: "Resources and realistic timeline",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "decisionTable",
          headers: ["Milestone", "Typical timeframe"],
          rows: [
            ["OSI model, IP basics, simple subnetting", "3-5 weeks"],
            ["CompTIA Network+ ready", "2-3 months"],
            ["Cisco CCNA ready from a technical background", "3-4 months"],
            ["Cisco CCNA ready starting from zero", "5-7 months"],
            [
              "Troubleshooting unfamiliar networks",
              "Ongoing career-long skill",
            ],
          ],
        },
        {
          type: "custom",
          key: "networking-resource-workflow",
          render: () => (
            <div className="article-workflow-list">
              {[
                [
                  "Free video courses",
                  "Use them for vocabulary and sequencing, not as a substitute for lab time.",
                ],
                [
                  "Free simulators",
                  "Packet Tracer is friendlier for beginners; GNS3 scales better to realistic labs.",
                ],
                [
                  "Practice exams",
                  "Use them to expose gaps before certification, not to memorize answers.",
                ],
                [
                  "Official objectives",
                  "Use CompTIA and Cisco objectives as the most current syllabus reference.",
                ],
              ].map(([title, body], index) => (
                <div key={title} className="article-workflow-step">
                  <div className="article-workflow-step__marker">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="article-workflow-step__content">
                    <div className="article-workflow-step__title">{title}</div>
                    <div className="article-workflow-step__body">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      sectionLabel: "Section 10",
      id: "common-mistakes-that-slow-people-down",
      title: "Common mistakes that slow people down",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "custom",
          key: "networking-mistakes-grid",
          render: () => (
            <div className="article-card-grid article-card-grid--mistakes">
              {NETWORKING_MISTAKES.map((item) => (
                <div
                  key={item.number}
                  className="article-card article-card--mistake"
                >
                  <div className="article-mistake-number article-card__badge">
                    {item.number}
                  </div>
                  <div className="article-card__title">{item.title}</div>
                  <div className="article-card__copy">{item.body}</div>
                </div>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      sectionLabel: "Section 11",
      id: "faq",
      title: "Frequently asked questions",
      headingStyle: "kicker",
      headingClassName: "article-section-rule-heading",
      blocks: [
        {
          type: "faq",
          items: [
            {
              question: "What is the fastest way to learn computer networking?",
              answer:
                "Lab sooner. Learn the OSI model as a troubleshooting tool, then build small topologies immediately.",
            },
            {
              question: "Should I get Network+ before CCNA?",
              answer:
                "If you are completely new, Network+ is smoother. If you already have technical experience, go straight to CCNA.",
            },
            {
              question: "How long does fundamentals take?",
              answer:
                "Most learners reach solid fundamentals in 2-3 months with consistent hands-on study.",
            },
            {
              question: "Do I need to buy hardware?",
              answer:
                "No. Packet Tracer, GNS3, a home router, and one or two client devices are enough to start.",
            },
            {
              question: "Is networking still worth learning?",
              answer:
                "Yes. The strongest path now combines networking fundamentals with Linux, Python, APIs, and automation.",
            },
          ],
        },
      ],
    },
  ],
  outroBlocks: [
    {
      type: "custom",
      key: "networking-guide-final-prompt",
      render: () => <NetworkingGuideFinalPrompt />,
    },
  ],
};

function extractStructuredArticleHeadings(
  document: StructuredArticleDocument,
): TocHeading[] {
  const headings: TocHeading[] = [];

  document.sections.forEach((section) => {
    headings.push({
      id: section.id,
      text: section.title,
      level: "h2",
    });

    section.blocks.forEach((block) => {
      if (block.type === "subheading" && block.id) {
        headings.push({
          id: block.id,
          text: block.title,
          level: "h3",
        });
      }
    });
  });

  return headings;
}

const RESUME_GUIDE_TOC_HEADINGS: TocHeading[] = [
  {
    id: "core-shift",
    text: "The core shift that changes every decision",
    level: "h2",
  },
  {
    id: "how-screened",
    text: "The science of how resumes are screened",
    level: "h2",
  },
  {
    id: "eye-tracking",
    text: "The F-pattern and six fixation points",
    level: "h2",
  },
  {
    id: "confirmation-bias",
    text: "The confirmation-bias mechanism",
    level: "h3",
  },
  { id: "four-tests", text: "The four-test decision system", level: "h2" },
  {
    id: "bullets",
    text: "Writing bullets that actually prove things",
    level: "h2",
  },
  { id: "bullet-dos", text: "Do", level: "h3" },
  { id: "bullet-donts", text: "Don't", level: "h3" },
  { id: "ownership", text: "The ownership language principle", level: "h2" },
  { id: "every-section", text: "Every section, decided", level: "h2" },
  { id: "contact-info", text: "Contact information", level: "h3" },
  { id: "profile-summary", text: "Profile summary", level: "h3" },
  { id: "company-context-line", text: "The company context line", level: "h3" },
  { id: "work-experience", text: "Work experience", level: "h3" },
  { id: "education", text: "Education", level: "h3" },
  { id: "skills-section", text: "Skills section", level: "h3" },
  { id: "length", text: "The length question, answered properly", level: "h2" },
  {
    id: "ats",
    text: "ATS & formatting rules that actually matter",
    level: "h2",
  },
  { id: "file-format", text: "File format decision tree", level: "h3" },
  { id: "tailoring", text: "Tailoring without keyword stuffing", level: "h2" },
  { id: "linkedin", text: "LinkedIn as a strategic layer", level: "h2" },
  {
    id: "special-cases",
    text: "Special cases: when the standard rules change",
    level: "h2",
  },
  { id: "early-career", text: "Early career", level: "h3" },
  { id: "experienced", text: "Experienced (10+ years)", level: "h3" },
  { id: "career-changer", text: "Career changer", level: "h3" },
  { id: "employment-gaps", text: "Employment gaps", level: "h3" },
  {
    id: "mistakes",
    text: "Nine fatal mistakes that eliminate qualified candidates",
    level: "h2",
  },
  { id: "checklist", text: "The pre-submit checklist", level: "h2" },
  { id: "faq", text: "Frequently asked questions", level: "h2" },
];

const RESUME_GUIDE_ARTICLE_HTML = `
  <div class="article-markdown article-markdown--webflow article-rich-text article-webflow-static">
    <p class="article-body lede">Most resume advice is a list of things someone did wrong: <em>don't use tables, don't put your address, don't go two pages.</em> These rules circulate without context and become gospel &mdash; even when they contradict each other. The problem isn't that the rules are wrong. It's that rules without decision logic are nearly useless the moment you sit down to write. This is a framework for thinking, not another list.</p>

    <blockquote class="article-webflow-quote"><p>A resume that answers "What have I done?" will always lose to one that answers "Why am I the right fit for this specific role?"</p></blockquote>

    <section id="core-shift" class="article-section">
      <h2 class="article-markdown-h2">The core shift that changes every decision</h2>
      <p class="article-body">Generic guides spend most of their time on aesthetics &mdash; fonts, margins, whether to use a summary. Those details matter at the edges, but they aren't why resumes succeed or fail. Resumes fail because they answer the wrong question.</p>
      <p class="article-body">Most candidates write a resume that answers <em>what have I done?</em> A strong resume answers <em>why am I the right fit for this specific role?</em> That shift changes almost every decision that follows &mdash; what to include, what to cut, how many bullets to write, which jobs to even mention.</p>
      <p class="article-body"><strong>Working definitions used throughout this guide:</strong> <em>Relevant</em> means useful for evaluating fit for the target role. <em>Directly related</em> means it uses the same or closely adjacent skills, tools, or responsibilities. <em>Fit</em> is the overall match between your background and the role's requirements. Wherever this guide says "include if it helps," the standard is whether it adds relevant evidence for the target role.</p>
    </section>

    <section id="how-screened" class="article-section">
      <h2 class="article-markdown-h2">The science of how resumes are screened</h2>
      <p class="article-body">Before writing a single word, it helps to understand how resumes are actually read &mdash; because it changes every layout and prioritization decision. A resume doesn't travel one path from submission to interview. It travels three stages, each with its own logic.</p>
      <ol class="article-list">
        <li class="article-list__item"><strong>ATS / AI filter.</strong> Roughly 82% of companies run every resume through an ATS before a human opens it. It scans for keywords, qualifications, and structure &mdash; fail here and you never reach a recruiter. This stage eliminates an estimated 60&ndash;70% of applicants.</li>
        <li class="article-list__item"><strong>Recruiter skim.</strong> About 42% of HR professionals spend under 10 seconds on first review. They scan in an F-pattern for fit signals &mdash; top horizontal, second horizontal, then down the left edge. This stage eliminates roughly 70&ndash;80% of the remaining pool.</li>
        <li class="article-list__item"><strong>Hiring manager read.</strong> Only the shortlisted few reach this stage. Every claim in your bullets is now tested against what the role requires, and what they'd probe in an interview. This stage typically results in interview offers for about 2&ndash;5% of applicants.</li>
      </ol>
      <p class="article-body">The three-stage reality means a resume needs to be three things at once: machine-readable for the ATS, skim-optimized for the recruiter, and evidence-rich for the hiring manager. These constraints don't contradict each other &mdash; they layer.</p>
    </section>

    <section id="eye-tracking" class="article-section">
      <h2 class="article-markdown-h2">The F-pattern and six fixation points</h2>
      <p class="article-body">Eye-tracking research &mdash; including TheLadders' studies (2012, 2018) and a 2025 Wonsulting experiment using recruiters wired with tracking equipment &mdash; shows a consistent, repeatedly replicated pattern in how trained screeners read a resume. In order, the six fixation points are:</p>
      <ol class="article-list">
        <li class="article-list__item">Your name &mdash; the first thing seen, every time</li>
        <li class="article-list__item">Current or most recent job title</li>
        <li class="article-list__item">Current or most recent company name</li>
        <li class="article-list__item">Start and end date of the current role</li>
        <li class="article-list__item">Previous job title, if visible</li>
        <li class="article-list__item">Education level and institution</li>
      </ol>
      <p class="article-body">The implication: the top-left quadrant of page one receives the most attention. Content in the bottom-right &mdash; skills lists, older certifications, interests &mdash; is nearly invisible during first-pass screening. Design for where eyes actually go, not where you think they should.</p>
      <h3 id="confirmation-bias" class="article-markdown-h3">The confirmation-bias mechanism</h3>
      <p class="article-body">One of the sharper insights from screening research: your headline creates a confirmation bias that shapes how the entire resume gets read. See "Senior Product Manager &mdash; B2B SaaS" before anything else, and a recruiter starts unconsciously looking for evidence that confirms that frame, becoming predisposed to interpret ambiguous experience positively. Set the wrong frame, or none at all, and they construct their own interpretation, which is rarely as generous as the one you'd have written yourself.</p>
      <p class="article-body">Put your name, target role title, and single most credible fit signal in the top 20% of page one. Don't bury your strongest credential inside a job from 2019. A short, specific headline under your name &mdash; for example, <em>Senior Product Manager &middot; B2B SaaS &middot; 8 years</em> &mdash; costs one line and earns disproportionate returns.</p>
    </section>

    <section id="four-tests" class="article-section">
      <h2 class="article-markdown-h2">The four-test decision system</h2>
      <p class="article-body">Before anything lands on a resume &mdash; a job, a bullet, a skill, a certification &mdash; it should pass four tests, in sequence. When something clearly fails one, stop there.</p>
      <ol class="article-list">
        <li class="article-list__item"><strong>Target-role match.</strong> Does this help a reader evaluate fit for this role, at this company, right now &mdash; not your career in general?</li>
        <li class="article-list__item"><strong>Strength of evidence.</strong> Does the sentence actually prove the claim, or just assert it? A resume is an evidence document, not a self-description.</li>
        <li class="article-list__item"><strong>Recency.</strong> Evidence decays. A job from fifteen years ago might warrant one line; a job from last year might warrant six bullets.</li>
        <li class="article-list__item"><strong>Space efficiency.</strong> Every line displaces something else. Marginal relevance often tips toward cutting once you weigh what it costs.</li>
      </ol>
    </section>

    <section id="bullets" class="article-section">
      <h2 class="article-markdown-h2">Writing bullets that actually prove things</h2>
      <p class="article-body">The biggest gap between a mediocre and a strong resume isn't formatting &mdash; it's the bullets. Specifically, whether they show what you made happen versus what you were supposed to do. The job description already states the requirements; your bullets should state the delivery.</p>
      <p class="article-body"><strong>Weak:</strong> "Responsible for managing various projects and coordinating with stakeholders to ensure timely delivery." Tells the reader nothing specific &mdash; any PM could claim this.</p>
      <p class="article-body"><strong>Strong:</strong> "Managed 6 concurrent product launches across 4 teams; delivered all on schedule with 0 scope-creep incidents over 18 months." Specific, countable, and defensible in an interview.</p>
      <p class="article-body">Across an evidence-quality spectrum, this is roughly the progression: <em>"Contributed to team success"</em> (weak) &rarr; <em>"Led internal tooling project used by 200+ employees daily"</em> (better) &rarr; <em>"Built data pipeline reducing manual reporting from 8 hrs/week to 20 min"</em> (strong) &rarr; <em>"Sole engineer on CMS migration; launched on schedule, zero downtime, eliminated 3 weekly manual tasks"</em> (strongest).</p>
      <p class="article-body">Not every role produces clean metrics. When numbers aren't available, show scale (team size, customers, throughput), standards (compliance bar, SLA, editorial quality), automation you created, or the level of ownership you held. Any concrete detail beats a vague assertion.</p>
      <h3 id="bullet-dos" class="article-markdown-h3">Do</h3>
      <ul class="article-list">
        <li class="article-list__item">Start with a strong, specific action verb</li>
        <li class="article-list__item">Vary the opening verb across bullets</li>
        <li class="article-list__item">Lead with the outcome when it's compelling</li>
        <li class="article-list__item">Keep bullets to 1&ndash;2 lines, 3 maximum</li>
        <li class="article-list__item">Have a full STAR story ready for each bullet</li>
        <li class="article-list__item">Show scope, standards, or ownership when numbers aren't available</li>
      </ul>
      <h3 id="bullet-donts" class="article-markdown-h3">Don't</h3>
      <ul class="article-list">
        <li class="article-list__item">Open with "Responsible for" or "Assisted with"</li>
        <li class="article-list__item">List daily tasks with no outcome or proof of value</li>
        <li class="article-list__item">Use buzzword filler &mdash; "team player," "results-oriented"</li>
        <li class="article-list__item">Include metrics you can't defend in an interview</li>
        <li class="article-list__item">Overload with 10+ bullets per role</li>
        <li class="article-list__item">Write a bullet that could appear on anyone's resume</li>
      </ul>
    </section>

    <section id="ownership" class="article-section">
      <h2 class="article-markdown-h2">The ownership language principle</h2>
      <p class="article-body">One of the most consistent signals recruiters use for senior roles is how a candidate describes their work: personal ownership, or collective diffusion. "We launched the product" tells a hiring manager nothing about your contribution. "Led a 4-person team that launched the product to 10,000 users in week one" is evidence.</p>
      <p class="article-body"><strong>Collective diffusion:</strong> "Collaborated with cross-functional teams to improve the process." / "Was involved in building the new onboarding system." Hides your contribution, with no scope and nothing defendable in an interview.</p>
      <p class="article-body"><strong>Personal ownership:</strong> "Owned end-to-end delivery of a 6-month platform rebuild; launched 2 weeks early with no critical bugs." Clear contribution, clear agency, and a scoped, defensible claim.</p>
    </section>

    <section id="every-section" class="article-section">
      <h2 class="article-markdown-h2">Every section, decided</h2>

      <h3 id="contact-info" class="article-markdown-h3">Contact information</h3>
      <p class="article-body">Top of the page, plain text only &mdash; no embedded headers or graphics an ATS might skip.</p>
      <p class="article-body"><strong>Include:</strong> full name (largest element on the page), a one-line headline (role title, domain, years), city and state or metro area, a name-based professional email, a phone number with a professional voicemail, a customized LinkedIn URL, and a portfolio or GitHub link if directly relevant.</p>
      <p class="article-body"><strong>Exclude:</strong> street address, photo (US/Canada default), age or marital status, government ID or SIN (never, in Canada), labels like "Phone:" before details, messy file names such as "Resume_FINAL_v3," and salary requirements.</p>

      <h3 id="profile-summary" class="article-markdown-h3">Profile summary</h3>
      <p class="article-body">A summary earns its place only when it meaningfully improves fit perception. For most mid-career candidates in a clearly matching role, it's optional. For career changers, senior candidates, or anyone whose background needs framing, include it &mdash; factual and specific, never a vague paragraph.</p>
      <p class="article-body"><strong>Bland:</strong> "Results-driven marketing professional with a passion for innovation and a proven track record of driving business growth." No specific claims &mdash; could belong to anyone.</p>
      <p class="article-body"><strong>Factual:</strong> "Performance marketing manager with 8 years in B2B SaaS. Managed $4M annual ad budget with consistent 3.2x ROAS." Target title, years, and scale &mdash; every claim supportable by the experience below.</p>

      <h3 id="company-context-line" class="article-markdown-h3">The company context line</h3>
      <p class="article-body">Under each employer, add one line of context &mdash; what the company does and its scale. "Acme Corp" tells a recruiter nothing. "Acme Corp &mdash; B2B logistics SaaS, $200M ARR, 800 employees" gives the whole experience section more weight.</p>

      <h3 id="work-experience" class="article-markdown-h3">Work experience</h3>
      <p class="article-body">Reverse chronological order. More bullets for recent, directly related roles; fewer for older or lower-relevance ones.</p>
      <figure class="article-table-frame article-table-frame--elementor wp-block-table table-bf-26"><table class="article-table article-table--legacy has-fixed-layout"><caption class="sr-only">Work experience resume guidance</caption><thead>
        <tr><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">Role situation</th><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">What to do</th></tr>
      </thead><tbody>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Strong, recent, directly related</th><td>4&ndash;6 achievement-first bullets, full date range, company context line</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Related but older (5&ndash;10 yrs)</th><td>2&ndash;3 bullets, strongest evidence only</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Older, not directly related</th><td>1&ndash;2 lines, or consider removing entirely</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Multiple roles, one employer</th><td>Group under one header; list each title and date range</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Employment gap</th><td>Brief factual entry only if material or timeline-confusing &mdash; no reasons for leaving</td></tr>
      </tbody></table></figure>

      <h3 id="education" class="article-markdown-h3">Education</h3>
      <figure class="article-table-frame article-table-frame--elementor wp-block-table table-bf-26"><table class="article-table article-table--legacy has-fixed-layout"><caption class="sr-only">Education placement guidance</caption><thead>
        <tr><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">Situation</th><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">Placement</th><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">Include</th></tr>
      </thead><tbody>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Student / recent grad</th><td>Top of resume</td><td>Degree, institution, date, GPA if 3.5+, honors</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">5+ years experience</th><td>After experience</td><td>Degree, institution, date</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Career changer</th><td>After experience</td><td>New-field certifications, prominently</td></tr>
      </tbody></table></figure>

      <h3 id="skills-section" class="article-markdown-h3">Skills section</h3>
      <p class="article-body">Hard skills only. If you list it, you're implying you can defend it in a screening call.</p>
      <p class="article-body"><strong>Include:</strong> exact tool and software names, programming languages and frameworks, named methodologies (Agile, Six Sigma), certifications that are formally recognized, and languages with objective labels.</p>
      <p class="article-body"><strong>Never include:</strong> soft skills like "teamwork" or "leadership," self-ratings such as stars or percentages, tools you can't discuss credibly, generic software everyone uses, or buzzword lists that carry no information.</p>
    </section>

    <section id="length" class="article-section">
      <h2 class="article-markdown-h2">The length question, answered properly</h2>
      <p class="article-body">One page is the default &mdash; not a rule. A default means start here, and move away only for a clear reason grounded in evidence. For context: 82% of companies use an ATS before any human review, a 2025 Novoresume survey of 418 HR professionals found 68% prefer two pages over one, 92.6% of HR professionals check LinkedIn during evaluation, and over half of resumes are first opened on a smartphone.</p>
      <figure class="article-table-frame article-table-frame--elementor wp-block-table table-bf-26"><table class="article-table article-table--legacy has-fixed-layout"><caption class="sr-only">Resume length guidance by career stage</caption><thead>
        <tr><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">Career stage</th><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">Guidance</th></tr>
      </thead><tbody>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Students / early career</th><td>One page, always. No justification for two pages when experience is limited.</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Mid-career (5&ndash;12 yrs)</th><td>One page, usually. Two pages only if cutting to one removes strong, directly relevant evidence.</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Senior (12+ yrs)</th><td>Two pages max. A second page is legitimate to show leadership scale and major decisions.</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Technical / gov / academia</th><td>Context-dependent. Academia uses a multi-page CV &mdash; a different document type entirely.</td></tr>
      </tbody></table></figure>
      <blockquote class="article-webflow-quote"><p>Don't ask "have I worked long enough for a second page?" Ask: "would cutting to one page force me to remove strong evidence that supports my fit for this specific role?"</p></blockquote>
    </section>

    <section id="ats" class="article-section">
      <h2 class="article-markdown-h2">ATS &amp; formatting rules that actually matter</h2>
      <p class="article-body">With 82% of companies using an ATS, optimizing for machine parsing isn't optional. Use a format parsers can read, and keep content out of places parsers skip.</p>
      <figure class="article-table-frame article-table-frame--elementor wp-block-table table-bf-26"><table class="article-table article-table--legacy has-fixed-layout"><caption class="sr-only">ATS formatting rules</caption><thead>
        <tr><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">Rule</th><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">Why it matters</th></tr>
      </thead><tbody>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Standard section headings</th><td>Parsers look for "Work Experience," "Education," "Skills" by name</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Single column</th><td>Multi-column layouts often read in the wrong order when parsed</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Real text only</th><td>Content in images, headers, or footers is frequently skipped entirely</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Standard fonts, 10&ndash;12pt</th><td>Nothing below 10pt; no decorative fonts for content</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Avoid tables &amp; text boxes</th><td>Many parsers cannot read content placed inside them</td></tr>
      </tbody></table></figure>
      <h3 id="file-format" class="article-markdown-h3">File format decision tree</h3>
      <figure class="article-table-frame article-table-frame--elementor wp-block-table table-bf-26"><table class="article-table article-table--legacy has-fixed-layout"><caption class="sr-only">Resume file format guidance</caption><thead>
        <tr><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">Situation</th><th scope="col" class="article-table__head article-table__cell article-table__cell--head has-text-align-center" data-align="center">Format</th></tr>
      </thead><tbody>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Employer specifies a format</th><td>Whatever they asked for</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Uploading to an ATS portal yourself</th><td>.docx</td></tr>
        <tr><th scope="row" class="article-table__cell article-table__cell--key has-text-align-center" data-align="center">Emailing directly to a human</th><td>.pdf</td></tr>
      </tbody></table></figure>
    </section>

    <section id="tailoring" class="article-section">
      <h2 class="article-markdown-h2">Tailoring without keyword stuffing</h2>
      <p class="article-body">"Customize every resume" gets repeated so often it becomes noise. Real tailoring means aligning your language and priorities truthfully to the posting.</p>
      <ol class="article-list">
        <li class="article-list__item"><strong>Read the posting as a human</strong>, not a keyword scanner. What are the three most important responsibilities?</li>
        <li class="article-list__item"><strong>Build and maintain a master resume.</strong> Tailor copies from it &mdash; never edit your only document in place.</li>
        <li class="article-list__item"><strong>Re-order and re-weight</strong> based on what this role needs most.</li>
        <li class="article-list__item"><strong>Mirror language from the posting</strong>, naturally &mdash; use their exact tool names, match their seniority language.</li>
        <li class="article-list__item"><strong>Run the 10-second skim test</strong> before sending. Would a recruiter know what you do and why you're credible?</li>
      </ol>
    </section>

    <section id="linkedin" class="article-section">
      <h2 class="article-markdown-h2">LinkedIn as a strategic layer</h2>
      <p class="article-body">With 92.6% of HR professionals saying LinkedIn is critical or useful to their decisions, your profile is effectively a second resume &mdash; checked independently of your application.</p>
      <p class="article-body">LinkedIn can expand on your resume &mdash; longer descriptions, testimonials, media &mdash; but it can never contradict it. Titles, dates, and company names must match exactly, or inconsistencies create doubt at exactly the wrong moment.</p>
    </section>

    <section id="special-cases" class="article-section">
      <h2 class="article-markdown-h2">Special cases: when the standard rules change</h2>
      <p class="article-body">The four-test system applies universally. Career stage and situation change how you apply it.</p>
      <h3 id="early-career" class="article-markdown-h3">Early career</h3>
      <p class="article-body">Lead with your strongest available evidence. One page, always. Put education first if it's your strongest credential. Use projects to prove skills when formal work history is thin.</p>
      <h3 id="experienced" class="article-markdown-h3">Experienced (10+ years)</h3>
      <p class="article-body">Prioritize ruthlessly, not comprehensively. Education moves to the bottom. Older jobs no longer central to fit can be condensed or cut. The resume is a case for this role, not a work history.</p>
      <h3 id="career-changer" class="article-markdown-h3">Career changer</h3>
      <p class="article-body">Close the fit gap before the reader has to. A summary earns its place here &mdash; name the transition explicitly. Build a portfolio; proof of skill in the new direction beats any summary.</p>
      <h3 id="employment-gaps" class="article-markdown-h3">Employment gaps</h3>
      <p class="article-body">Be honest and be brief. Use a factual entry when the gap is material, recent, or could confuse the timeline. No reasons for leaving on the resume &mdash; that's for the interview.</p>
    </section>

    <section id="mistakes" class="article-section">
      <h2 class="article-markdown-h2">Nine fatal mistakes that eliminate qualified candidates</h2>
      <p class="article-body">Each of these is a common, documentable reason a qualified candidate gets screened out before their experience is ever evaluated.</p>
      <ol class="article-list">
        <li class="article-list__item"><strong>ATS-invisible content.</strong> Contact info or skills placed inside headers, footers, or graphics may parse as missing entirely.</li>
        <li class="article-list__item"><strong>Generic, untailored copy.</strong> The same resume sent everywhere gets eliminated by keyword-matching ATS before a human sees it.</li>
        <li class="article-list__item"><strong>Responsibility framing.</strong> Every bullet describes the role's requirements instead of what you actually delivered.</li>
        <li class="article-list__item"><strong>Broken links.</strong> A non-functioning LinkedIn or portfolio link signals carelessness to someone already triaging fast.</li>
        <li class="article-list__item"><strong>Inconsistent formatting.</strong> Mixed tenses and date formats are the fastest proxy for carelessness in document work.</li>
        <li class="article-list__item"><strong>LinkedIn contradicts resume.</strong> Different titles or dates between the two create credibility questions at the worst moment.</li>
        <li class="article-list__item"><strong>Unprofessional contact info.</strong> Amateur email addresses and sloppy filenames signal a lack of professional self-awareness.</li>
        <li class="article-list__item"><strong>Skills you can't defend.</strong> Every listed skill implies competency, and risk if it can't survive a screening question.</li>
        <li class="article-list__item"><strong>The top doesn't communicate fit.</strong> If the first seven seconds don't signal your target role, the recruiter moves on.</li>
      </ol>
    </section>

    <section id="checklist" class="article-section">
      <h2 class="article-markdown-h2">The pre-submit checklist</h2>
      <p class="article-body">Run through this before every serious application. Check items off as you confirm them.</p>

      <div class="article-checklist resume-framework-checklist">
        <div class="checklist-head">
          <h3 class="article-h4">Pre-submit checklist</h3>
          <span class="progress-text" id="progressPill">0 of 20 complete</span>
        </div>
        <div class="checklistGroups">
          <div class="cl-group-title">Strategy &amp; targeting</div>
          <div class="cl-item"><input type="checkbox" id="c1"><label for="c1">The top of page one immediately communicates my target role and strongest evidence</label></div>
          <div class="cl-item"><input type="checkbox" id="c2"><label for="c2">This resume is tailored to this specific posting, not a generic copy</label></div>
          <div class="cl-item"><input type="checkbox" id="c3"><label for="c3">Every element passes the four tests: role match, evidence, recency, space</label></div>
          <div class="cl-item"><input type="checkbox" id="c4"><label for="c4">I ran the 10-second skim test on the finished draft</label></div>

          <div class="cl-group-title">Content quality</div>
          <div class="cl-item"><input type="checkbox" id="c5"><label for="c5">Every bullet leads with a strong action verb &mdash; no "Responsible for"</label></div>
          <div class="cl-item"><input type="checkbox" id="c6"><label for="c6">Every quantified claim is real and defensible in an interview</label></div>
          <div class="cl-item"><input type="checkbox" id="c7"><label for="c7">Language uses ownership framing &mdash; "I led / built / owned"</label><span class="badge">Default</span></div>
          <div class="cl-item"><input type="checkbox" id="c8"><label for="c8">Skills section contains only hard skills I can defend</label></div>
          <div class="cl-item"><input type="checkbox" id="c9"><label for="c9">Everything on this resume is true &mdash; no fabricated claims</label></div>

          <div class="cl-group-title">Formatting &amp; ATS compliance</div>
          <div class="cl-item"><input type="checkbox" id="c10"><label for="c10">Font, spacing, and tense usage are consistent throughout</label></div>
          <div class="cl-item"><input type="checkbox" id="c11"><label for="c11">No tables, text boxes, or complex columns for ATS-heavy submissions</label><span class="badge">ATS</span></div>
          <div class="cl-item"><input type="checkbox" id="c12"><label for="c12">No essential content in headers, footers, or graphics</label><span class="badge">ATS</span></div>
          <div class="cl-item"><input type="checkbox" id="c13"><label for="c13">Resume tested on mobile &mdash; legible in one scroll</label><span class="badge">Default</span></div>

          <div class="cl-group-title">Contact, file &amp; LinkedIn</div>
          <div class="cl-item"><input type="checkbox" id="c14"><label for="c14">All links tested and working</label></div>
          <div class="cl-item"><input type="checkbox" id="c15"><label for="c15">Clean file name: FirstName LastName Resume.pdf</label><span class="badge">Default</span></div>
          <div class="cl-item"><input type="checkbox" id="c16"><label for="c16">LinkedIn dates, titles, and companies match the resume exactly</label></div>
          <div class="cl-item"><input type="checkbox" id="c17"><label for="c17">No street address, photo (US/CA), or unnecessary personal info</label><span class="badge">Default</span></div>

          <div class="cl-group-title">Final review</div>
          <div class="cl-item"><input type="checkbox" id="c18"><label for="c18">Proofread carefully &mdash; contact info errors are fatal and common</label></div>
          <div class="cl-item"><input type="checkbox" id="c19"><label for="c19">A second reviewer has checked the final version</label></div>
          <div class="cl-item"><input type="checkbox" id="c20"><label for="c20">File opens correctly and is not a live Google Docs link</label></div>
        </div>
      </div>
    </section>

    <div class="article-final-prompt article-final-question">
      <div class="k">One question before you send</div>
      <p>"If a recruiter reads only the first ten seconds of this resume, do they know what role I'm targeting, and why I'm credible for it?"</p>
    </div>

    <section id="faq" class="article-section article-faq">
      <h2 class="article-markdown-h2">Frequently asked questions</h2>
      <details>
        <summary>How long should a resume be in 2026?</summary>
        <p>One page is the default for students, early-career candidates, and most mid-career applicants. A second page is justified for senior candidates (12+ years) only when cutting it would remove strong, directly relevant evidence. A 2025 Novoresume survey of 418 HR professionals found 68% consider two pages ideal &mdash; but relevance decides the length, not tenure.</p>
      </details>
      <details>
        <summary>What is the biggest reason qualified candidates get rejected before a human reads their resume?</summary>
        <p>ATS-invisible content. About 82% of companies run resumes through applicant tracking software first. Contact details, skills, or titles placed inside headers, footers, text boxes, or graphics are frequently skipped by parsers.</p>
      </details>
      <details>
        <summary>Should I include a resume summary?</summary>
        <p>Optional for mid-career candidates in a clearly matching role; recommended for career changers, senior candidates, or anyone whose background needs framing. Every claim in it must be substantiated by the experience below.</p>
      </details>
      <details>
        <summary>Should soft skills like "team player" go on a resume?</summary>
        <p>No. List only hard skills you can defend under questioning &mdash; named tools, languages, frameworks, and recognized certifications. Demonstrate soft skills through evidenced bullets instead.</p>
      </details>
      <details>
        <summary>How does an ATS actually read a resume?</summary>
        <p>It parses for standard section headings, keyword matches, and structural clarity. Single-column, left-aligned, real-text layouts parse most reliably; tables, text boxes, and image-based content are frequently misread.</p>
      </details>
      <details>
        <summary>Does my LinkedIn profile need to match my resume?</summary>
        <p>Yes. About 92.6% of HR professionals check LinkedIn. Titles, dates, and companies must be consistent across both &mdash; any mismatch raises credibility questions.</p>
      </details>
      <details>
        <summary>What is the four-test system?</summary>
        <p>Target-role match, strength of evidence, recency, and space efficiency. Every job, bullet, skill, or certification should pass all four before it earns a place on the page.</p>
      </details>
    </section>

    <div class="article-link-card article-framework-cta">
      <h3>Build your resume against this framework</h3>
      <p>Run your current draft through the four-test system and the pre-submit checklist above before your next application.</p>
      <a href="#checklist">Use the checklist &rarr;</a>
    </div>
  </div>
`;

const ResumeGuideFlagshipContent: React.FC = () => {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = articleRef.current;
    if (!root) return;

    const boxes: HTMLInputElement[] = Array.from(
      root.querySelectorAll<HTMLInputElement>(
        '.cl-item input[type="checkbox"]',
      ),
    );
    const pill = root.querySelector<HTMLElement>("#progressPill");
    const total = boxes.length;

    const updateProgress = () => {
      const completedCount = boxes.reduce((count: number, box: HTMLInputElement) => {
        const item = box.closest(".cl-item");
        if (box.checked) {
          item?.classList.add("checked");
          return count + 1;
        }

        item?.classList.remove("checked");
        return count;
      }, 0);

      if (pill) {
        pill.textContent = `${completedCount} of ${total} complete`;
      }
    };

    boxes.forEach((box: HTMLInputElement) => box.addEventListener("change", updateProgress));
    updateProgress();

    return () => {
      boxes.forEach((box: HTMLInputElement) => box.removeEventListener("change", updateProgress));
    };
  }, []);

  return (
    <div
      ref={articleRef}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(RESUME_GUIDE_ARTICLE_HTML) }}
    />
  );
};

const NetworkingRoadmapFlagshipContent: React.FC = () => (
  <StructuredArticleContent document={NETWORKING_GUIDE_DOCUMENT} />
);

const BLOG_BODY_RENDERERS: Record<
  BlogBodyRenderer,
  {
    getHeadings: (post: BlogPost) => TocHeading[];
    renderBody: (post: BlogPost, blocks: ContentBlock[]) => React.ReactNode;
  }
> = {
  markdown: {
    getHeadings: (post) => extractHeadings(post.content),
    renderBody: (_post, blocks) => <StandardArticleContent blocks={blocks} />,
  },
  resumeGuide: {
    getHeadings: () => RESUME_GUIDE_TOC_HEADINGS,
    renderBody: () => <ResumeGuideFlagshipContent />,
  },
  networkingRoadmap: {
    getHeadings: (post) => extractHeadings(post.content),
    renderBody: (_post, blocks) => <StandardArticleContent blocks={blocks} />,
  },
};

const BlogPostDetail: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [activeToc, setActiveToc] = useState("");
  const [activeTocIndicator, setActiveTocIndicator] = useState<{
    top: number;
    height: number;
  } | null>(null);
  const [tocScrollState, setTocScrollState] = useState({
    canScrollUp: false,
    canScrollDown: false,
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [heroInteractionPaused, setHeroInteractionPaused] = useState(false);
  const [prefersDarkHero, setPrefersDarkHero] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tocNavRef = useRef<HTMLElement>(null);
  const heroInteractionResumeRef = useRef<number | null>(null);
  const tocAutoScrollReadyRef = useRef(false);

  useEffect(() => {
    // Check Web Share API support
    setCanShare(typeof navigator.share === "function");

    const originalTitle = document.title;
    document.title = `${post.title} | Thought Leadership`;

    // Inject OG + Twitter Card meta tags
    const pageUrl = window.location.href;
    const socialImage = post.ogImage ?? post.image;
    const absoluteSocialImage = socialImage.startsWith("http")
      ? socialImage
      : `${window.location.origin}${socialImage}`;
    const metaTags: { property?: string; name?: string; content: string }[] = [
      { property: "og:type", content: "article" },
      { property: "og:title", content: post.title },
      { property: "og:description", content: post.excerpt },
      { property: "og:image", content: absoluteSocialImage },
      { property: "og:image:secure_url", content: absoluteSocialImage },
      { property: "og:url", content: pageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: post.title },
      { name: "twitter:description", content: post.excerpt },
      { name: "twitter:image", content: absoluteSocialImage },
    ];

    let canonicalLink = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    const previousCanonicalHref = canonicalLink?.href ?? null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = pageUrl;

    const injected: HTMLMetaElement[] = [];
    metaTags.forEach(({ property, name, content }) => {
      const meta = document.createElement("meta");
      if (property) {
        meta.setAttribute("property", property);
        document.querySelector(`meta[property="${property}"]`)?.remove();
      } else if (name) {
        meta.setAttribute("name", name);
        document.querySelector(`meta[name="${name}"]`)?.remove();
      }
      meta.setAttribute("content", content);
      document.head.appendChild(meta);
      injected.push(meta);
    });

    return () => {
      document.title = originalTitle;
      injected.forEach((m) => m.remove());
      if (canonicalLink) {
        if (previousCanonicalHref) {
          canonicalLink.href = previousCanonicalHref;
        } else {
          canonicalLink.remove();
        }
      }
    };
  }, [post]);

  /*
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncScheme = (event?: MediaQueryListEvent) => {
      setPrefersDarkHero(event ? event.matches : mediaQuery.matches);
    };

    syncScheme();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncScheme);
      return () => mediaQuery.removeEventListener('change', syncScheme);
    }

    mediaQuery.addListener(syncScheme);
    return () => mediaQuery.removeListener(syncScheme);
  }, []);
  */

  const template = post.template ?? "standard";
  const bodyRenderer =
    post.bodyRenderer ?? BLOG_TEMPLATE_DEFAULT_RENDERER[template];
  const bodyConfig = BLOG_BODY_RENDERERS[bodyRenderer];
  const blocks = useMemo(() => parseContent(post.content), [post.content]);
  const heroImage = post.image || BLOG_HERO_FALLBACK_IMAGE;
  const headings = useMemo(
    () => bodyConfig.getHeadings(post),
    [bodyConfig, post],
  );

  // For the "Keep Reading" / Related Posts section
  const relatedPosts = useMemo(() => {
    const others = BLOG_POSTS.filter((p) => p.id !== post.id);
    return [
      ...others.filter((p) => p.category === post.category),
      ...others.filter((p) => p.category !== post.category),
    ].slice(0, 3);
  }, [post]);
  const postTags = post.tags ?? [];
  const shouldConstrainToc = headings.length > 12;
  const articleMetaItems = [post.category, post.readTime, post.date];
  const articleBody = useMemo(
    () => bodyConfig.renderBody(post, blocks),
    [bodyConfig, blocks, post],
  );

  useLayoutEffect(() => {
    const articleRoot = contentRef.current;
    const relatedRoot = pageRef.current?.querySelector(
      ".blog-post-related",
    ) as HTMLElement | null;

    if (!articleRoot) return;

    const revealNodes: HTMLElement[] = [
      ...Array.from(
        articleRoot.querySelectorAll<HTMLElement>(
          BLOG_POST_SCROLL_REVEAL_SELECTOR,
        ),
      ),
      ...(relatedRoot ? [relatedRoot] : []),
    ].filter(
      (node, index, list): node is HTMLElement =>
        Boolean(node) && list.indexOf(node) === index,
    );

    if (revealNodes.length === 0) return;

    revealNodes.forEach((node: HTMLElement) => {
      node.classList.add("blog-post-scroll-reveal");
      node.classList.remove("is-visible");
      node.style.removeProperty("transition-delay");
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.style.transitionDelay = `${index * 45}ms`;
          element.classList.add("is-visible");
          revealObserver.unobserve(element);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
    );

    revealNodes.forEach((node: HTMLElement) => revealObserver.observe(node));

    return () => {
      revealObserver.disconnect();
      revealNodes.forEach((node: HTMLElement) => {
        node.classList.remove("blog-post-scroll-reveal", "is-visible");
        node.style.removeProperty("transition-delay");
      });
    };
  }, [post.id, bodyRenderer]);

  useEffect(() => {
    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (headingElements.length === 0) {
      setActiveToc("");
      return;
    }

    const syncActiveHeading = () => {
      let currentId = headingElements[0].id;

      headingElements.forEach((element) => {
        if (element.getBoundingClientRect().top < 130) {
          currentId = element.id;
        }
      });

      setActiveToc(currentId);
    };

    syncActiveHeading();
    window.addEventListener("scroll", syncActiveHeading, { passive: true });
    window.addEventListener("resize", syncActiveHeading);

    return () => {
      window.removeEventListener("scroll", syncActiveHeading);
      window.removeEventListener("resize", syncActiveHeading);
    };
  }, [headings]);

  // Auto-scroll the active TOC item into view within the sidebar
  useEffect(() => {
    const nav = tocNavRef.current;

    if (!activeToc || !nav) return;

    const activeBtn = nav.querySelector(
      `[data-toc-id="${activeToc}"]`,
    ) as HTMLElement | null;

    if (!activeBtn) return;

    const itemTop = activeBtn.offsetTop;
    const itemBottom = itemTop + activeBtn.offsetHeight;
    const visibleTop = nav.scrollTop;
    const visibleBottom = visibleTop + nav.clientHeight;
    const isFullyVisible = itemTop >= visibleTop && itemBottom <= visibleBottom;

    if (!isFullyVisible) {
      const centeredTop = Math.max(
        0,
        itemTop - (nav.clientHeight - activeBtn.offsetHeight) / 2,
      );

      nav.scrollTo({
        top: centeredTop,
        behavior: tocAutoScrollReadyRef.current ? "smooth" : "auto",
      });
    }

    tocAutoScrollReadyRef.current = true;
  }, [activeToc]);

  useEffect(() => {
    const syncActiveTocIndicator = () => {
      if (!activeToc || !tocNavRef.current) {
        setActiveTocIndicator(null);
        return;
      }

      const activeBtn = tocNavRef.current.querySelector(
        `[data-toc-id="${activeToc}"]`,
      ) as HTMLElement | null;
      if (!activeBtn) {
        setActiveTocIndicator(null);
        return;
      }

      setActiveTocIndicator({
        top: activeBtn.offsetTop,
        height: activeBtn.offsetHeight,
      });
    };

    syncActiveTocIndicator();
    window.addEventListener("resize", syncActiveTocIndicator);

    return () => window.removeEventListener("resize", syncActiveTocIndicator);
  }, [activeToc, headings]);

  useEffect(() => {
    const nav = tocNavRef.current;

    if (!nav) {
      setTocScrollState({ canScrollUp: false, canScrollDown: false });
      return;
    }

    const syncTocScrollState = () => {
      const maxScrollTop = nav.scrollHeight - nav.clientHeight;
      setTocScrollState({
        canScrollUp: nav.scrollTop > 2,
        canScrollDown: maxScrollTop - nav.scrollTop > 2,
      });
    };

    syncTocScrollState();
    nav.addEventListener("scroll", syncTocScrollState, { passive: true });
    window.addEventListener("resize", syncTocScrollState);

    return () => {
      nav.removeEventListener("scroll", syncTocScrollState);
      window.removeEventListener("resize", syncTocScrollState);
    };
  }, [headings, activeToc]);

  useEffect(() => {
    setHeroReady(false);
  }, [heroImage, post.title, prefersDarkHero]);

  useEffect(() => {
    const pauseHeroInteraction = () => {
      setHeroInteractionPaused(true);

      if (heroInteractionResumeRef.current !== null) {
        window.clearTimeout(heroInteractionResumeRef.current);
      }

      heroInteractionResumeRef.current = window.setTimeout(() => {
        setHeroInteractionPaused(false);
        heroInteractionResumeRef.current = null;
      }, 140);
    };

    window.addEventListener("scroll", pauseHeroInteraction, { passive: true });
    window.addEventListener("wheel", pauseHeroInteraction, { passive: true });
    window.addEventListener("touchmove", pauseHeroInteraction, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", pauseHeroInteraction);
      window.removeEventListener("wheel", pauseHeroInteraction);
      window.removeEventListener("touchmove", pauseHeroInteraction);

      if (heroInteractionResumeRef.current !== null) {
        window.clearTimeout(heroInteractionResumeRef.current);
        heroInteractionResumeRef.current = null;
      }
    };
  }, []);

  const navigateBack = () => {
    // Reset scroll BEFORE navigating so the blog list opens at the top
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    window.history.pushState({}, "", "/blog");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleTocWheel = (event: React.WheelEvent<HTMLElement>) => {
    const nav = tocNavRef.current;
    if (!nav) return;

    const canScrollUp = nav.scrollTop > 0;
    const canScrollDown =
      nav.scrollTop + nav.clientHeight < nav.scrollHeight - 1;

    if (
      (event.deltaY < 0 && canScrollUp) ||
      (event.deltaY > 0 && canScrollDown)
    ) {
      event.preventDefault();
      nav.scrollTop += event.deltaY;
    }
  };

  return (
    <div
      ref={pageRef}
      className={`blog-post-detail-page selection-blue ${prefersDarkHero ? "is-dark" : "is-light"}`}
    >
      {/* ── HERO SECTION ── */}
      {/* Webflow exact: white base + fluted glass bars + blue bottom fade + diagonal white overlay */}
      <div
        key={prefersDarkHero ? "dark-hero" : "light-hero"}
        className={`blog-post-hero ${heroReady ? "is-ready" : ""} ${heroInteractionPaused ? "is-scrolling" : ""}`}
      >
        {/* EXACT WEBFLOW BACKGROUND REPLICATION (REFINED SHADER MATCH) */}
        <BlogHeroBackground
          key={`${post.id}-${prefersDarkHero ? "dark" : "light"}`}
          image={heroImage}
          title={post.title}
          isDark={prefersDarkHero}
          isPaused={heroInteractionPaused}
          setReady={setHeroReady}
        />

        <div className="blog-post-detail__container blog-post-hero__content">
          {/* Hero Content (Left) */}
          <div className="blog-post-hero__copy">
            {/* Breadcrumb - Exact Webflow URL Match: 16px, semibold, clean color */}
            <div className="blog-post-hero__breadcrumb">
              <button
                type="button"
                onClick={navigateBack}
                className="blog-post-hero__breadcrumb-link"
              >
                Blog
              </button>
              <span
                className="blog-post-hero__breadcrumb-sep"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    d="M9.29297 7.707L13.586 12L9.29297 16.293L10.707 17.707L16.414 12L10.707 6.293L9.29297 7.707Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="blog-post-hero__breadcrumb-current">
                {post.category}
              </span>
            </div>

            {/* H1: Webflow-exact — extrabold 800, tight -0.03em tracking, scaled to 56px lg */}
            <h1 className="blog-post-hero__title">{post.title}</h1>

            {/* Excerpt: 16px, medium weight, core theme color */}
            {post.excerpt && (
              <p className="blog-post-hero__excerpt">{post.excerpt}</p>
            )}
          </div>

          {/* Hero Image (Right) */}
          <div className="blog-post-hero__image-wrap">
            <div className="blog-post-hero__image-shell">
              <div className="blog-post-hero__image-frame">
                <img
                  src={heroImage}
                  alt={post.title}
                  className="blog-post-hero__image"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ARTICLE SECTION ── */}
      <div className="blog-post-detail__container blog-post-detail__section">
        <div className="blog-post-detail__layout">
          {/* ── MAIN CONTENT ── */}
          <article ref={contentRef} className="blog-post-detail__main">
            <ArticleAuthorMeta post={post} items={articleMetaItems} />
            {articleBody}

            <ArticleFooterMeta post={post} tags={postTags} />
            {false && (
              <>
                {/* Post Tags & Bottom Meta — Webflow-Inspired Premium Minimal */}
                <div className="mt-16 pt-8 border-t border-slate-100">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 sm:gap-16">
                    <div className="col-span-1 sm:col-span-3 flex flex-col gap-2 justify-center">
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {postTags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[16px] font-medium text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center sm:text-right">
                      <span className="text-[16px] font-medium text-slate-900 whitespace-nowrap">
                        {post.date}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </article>

          {/* ── RIGHT SIDEBAR (Sticky — non-scrollable, only TOC nav scrolls) ── */}
          <aside className="blog-post-detail__aside">
            {/* Author Info */}
            <div className="blog-post-detail__nav">
              <button
                type="button"
                onClick={navigateBack}
                className="blog-post-nav-back"
              >
                <div className="blog-post-nav-back__icon">
                  <svg
                    className="blog-post-nav-back__icon-svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </div>
                Back to blog
              </button>
            </div>

            {/* Table of Contents — multi-level */}
            {headings.length > 0 && (
              <div className="blog-post-toc">
                <p className="blog-post-toc__title article-toc-title">
                  Table of contents
                </p>
                <div className="blog-post-toc__frame">
                  <div
                    aria-hidden="true"
                    className={`blog-post-toc__fade blog-post-toc__fade--top ${
                      tocScrollState.canScrollUp ? "is-visible" : ""
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className={`blog-post-toc__fade blog-post-toc__fade--bottom ${
                      tocScrollState.canScrollDown ? "is-visible" : ""
                    }`}
                  />
                  <nav
                    ref={tocNavRef as React.RefObject<HTMLElement>}
                    onWheel={handleTocWheel}
                    data-lenis-prevent=""
                    data-lenis-prevent-wheel=""
                    className="blog-post-toc__scroll no-scrollbar"
                    style={{
                      maxHeight: shouldConstrainToc
                        ? "min(24rem, calc(100vh - 18rem))"
                        : undefined,
                      overflowY: "auto",
                      WebkitOverflowScrolling: "touch",
                      overscrollBehaviorY: "contain",
                    }}
                  >
                    <div aria-hidden="true" className="blog-post-toc__track" />
                    <motion.div
                      aria-hidden="true"
                      className="blog-post-toc__indicator"
                      initial={false}
                      animate={{
                        opacity: activeTocIndicator ? 1 : 0,
                        y: activeTocIndicator?.top ?? 0,
                        height: activeTocIndicator?.height ?? 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 38,
                      }}
                    />
                    {headings.map((h) => {
                      const isH3 = h.level === "h3";
                      const isActive = activeToc === h.id;
                      return (
                        <button
                          key={h.id}
                          type="button"
                          data-toc-id={h.id}
                          onClick={() => scrollToHeading(h.id)}
                          className={`blog-post-toc__item ${
                            isH3
                              ? "blog-post-toc__item--subsection"
                              : "blog-post-toc__item--section"
                          } ${isActive ? "blog-post-toc__item--active" : ""}`}
                        >
                          {h.text}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            )}

            {/* Share — Web Share API + Social Icons fallback */}
            <div className="blog-post-share">
              <p className="blog-post-share__title article-share-label">
                Share
              </p>

              {/* Mobile: Web Share API native sheet */}
              {canShare && (
                <button
                  type="button"
                  onClick={() =>
                    navigator
                      .share({
                        title: post.title,
                        text: post.excerpt,
                        url: window.location.href,
                      })
                      .catch(() => {})
                  }
                  className="blog-post-share__native"
                >
                  <svg
                    className="blog-post-share__native-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share this post
                </button>
              )}

              {/* Desktop: Social icon row */}
              <div className="blog-post-share__links">
                {/* X / Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${post.title}\n\n${post.excerpt}`)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="blog-post-share__link blog-post-share__link--x"
                >
                  <svg className="blog-post-share__icon" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/dialog/feed?app_id=145634995501895&link=${encodeURIComponent(window.location.href)}&name=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.excerpt)}&redirect_uri=${encodeURIComponent("https://www.facebook.com")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="blog-post-share__link blog-post-share__link--facebook article-share-link--facebook"
                >
                  <svg className="blog-post-share__icon" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="blog-post-share__link blog-post-share__link--linkedin article-share-link--linkedin"
                >
                  <svg className="blog-post-share__icon" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                {/* Copy link */}
                <div className="blog-post-share__copy">
                  <button
                    type="button"
                    aria-label="Copy link"
                    className={`blog-post-share__link blog-post-share__link--copy ${
                      copiedLink ? "is-copied" : ""
                    }`}
                    onClick={() => {
                      navigator.clipboard
                        .writeText(window.location.href)
                        .then(() => {
                          setCopiedLink(true);
                          setTimeout(() => setCopiedLink(false), 2000);
                        });
                    }}
                  >
                    {copiedLink ? (
                      <svg
                        className="blog-post-share__icon blog-post-share__icon--stroke"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg
                        className="blog-post-share__icon blog-post-share__icon--stroke"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    )}
                  </button>
                  {copiedLink && (
                    <span className="blog-post-share__tooltip">Copied!</span>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts — Webflow-Inspired Premium Minimal */}
        {relatedPosts.length > 0 && (
          <div className="blog-post-related">
            <div className="blog-post-related__header">
              <h2 className="blog-post-related__title">Read next</h2>
              <button
                onClick={navigateBack}
                className="blog-post-related__browse"
              >
                <span className="blog-post-related__browse-label">
                  Browse all
                </span>
                <svg
                  className="blog-post-related__browse-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            <div className="blog-post-related__grid">
              {relatedPosts.slice(0, 3).map((related, index) => (
                <BlogCard
                  key={related.id}
                  post={related}
                  index={index}
                  showMeta={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Blog Card ─────────────────────────────────────────────────────────────────

const BlogCard: React.FC<{
  post: BlogPost;
  index?: number;
  showMeta?: boolean;
}> = ({ post, showMeta = true }) => {
  return (
    <article className="h-full">
      <a
        href={`/blog/${post.id}`}
        aria-label={`Read article: ${post.title}`}
        onClick={(event) => handleBlogPostLinkClick(event, post.id)}
        className="blog-index-card group flex h-full flex-col overflow-hidden rounded-xl border shadow-sm outline-none transition-all duration-300 focus:outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2"
      >
        <div className="blog-index-card__media aspect-[16/10] shrink-0 overflow-hidden border-b">
          <img
            src={post.image || BLOG_HERO_FALLBACK_IMAGE}
            alt=""
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          {showMeta && (
            <p className="blog-index-card__meta mb-3 flex items-center gap-2 text-[13px] font-medium">
              <span className="blog-index-card__category font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="blog-index-card__separator h-1 w-1 rounded-full"></span>
              {post.date}
              <span className="blog-index-card__separator h-1 w-1 rounded-full"></span>
              {post.readTime}
            </p>
          )}
          <h4 className="blog-index-card__title mb-3 line-clamp-2 text-[20px] font-bold leading-[1.3] transition-colors">
            {post.title}
          </h4>
          <p className="blog-index-card__excerpt mb-6 line-clamp-2 text-[15px]">
            {post.excerpt}
          </p>
          <span className="blog-index-card__cta mt-auto flex items-center gap-1 text-[14px] font-semibold transition-all group-hover:gap-2">
            Read more{" "}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </div>
      </a>
    </article>
  );
};

// ─── Dropdown ──────────────────────────────────────────────────────────────────

const PremiumDropdown: React.FC<{
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}> = ({ value, options, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none min-w-[160px] justify-between group"
      >
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
              {icon}
            </span>
          )}
          <span>{selectedOption.label}</span>
        </div>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-[60] w-full mt-2 py-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden min-w-[200px]"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                  value === option.value
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {option.label}
                {value === option.value && (
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Blog Series (Index) ────────────────────────────────────────────────────────

const BlogSeries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.startsWith("/blog/") && path !== "/blog/") {
        return path.replace("/blog/", "");
      }
    }
    return null;
  });
  const [sortBy, setSortBy] = useState<BlogSortBy>("recent");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribeFeedback, setSubscribeFeedback] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);
  const subscribeResetTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const POSTS_PER_PAGE = 9;

  const allCategories = useMemo(() => {
    const cats = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));
    return ["All categories", ...cats];
  }, []);

  useEffect(() => {
    // Always force scroll to top on mount
    // NOTE: We do NOT add a popstate listener here because App.tsx already handles
    // routing by remounting this component entirely via key={currentPath}.
    // A duplicate popstate listener here was causing a race condition that froze
    // Framer Motion animations at opacity:0 (the blank page bug).
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    const matchingPosts = BLOG_POSTS.filter((post) => {
      const matchesSearch =
        normalizedSearchTerm.length === 0 ||
        post.title.toLowerCase().includes(normalizedSearchTerm) ||
        post.excerpt.toLowerCase().includes(normalizedSearchTerm) ||
        (post.tags ?? []).some((tag) =>
          tag.toLowerCase().includes(normalizedSearchTerm),
        );

      const matchesCategory =
        selectedCategory === "All categories" ||
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return sortBlogPosts(matchingPosts, sortBy);
  }, [normalizedSearchTerm, selectedCategory, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, selectedCategory]);

  useEffect(() => {
    if (subscribeResetTimeoutRef.current !== null) {
      window.clearTimeout(subscribeResetTimeoutRef.current);
      subscribeResetTimeoutRef.current = null;
    }

    if (subscribeFeedback?.tone !== "success") {
      return;
    }

    subscribeResetTimeoutRef.current = window.setTimeout(() => {
      setSubscribeFeedback(null);
      subscribeResetTimeoutRef.current = null;
    }, SUBSCRIBE_SUCCESS_RESET_DELAY_MS);

    return () => {
      if (subscribeResetTimeoutRef.current !== null) {
        window.clearTimeout(subscribeResetTimeoutRef.current);
        subscribeResetTimeoutRef.current = null;
      }
    };
  }, [subscribeFeedback]);

  const usesCuratedLatest =
    normalizedSearchTerm.length === 0 &&
    selectedCategory === "All categories" &&
    sortBy === "recent";

  const latestPosts = useMemo(
    () => (usesCuratedLatest ? getCuratedLeadPosts(filteredPosts, 4) : []),
    [filteredPosts, usesCuratedLatest],
  );

  const gridPosts = useMemo(() => {
    if (!usesCuratedLatest) return filteredPosts;

    const latestPostIds = new Set(latestPosts.map((post) => post.id));
    return filteredPosts.filter((post) => !latestPostIds.has(post.id));
  }, [filteredPosts, latestPosts, usesCuratedLatest]);

  const showLatestSection = usesCuratedLatest && currentPage === 1;
  const totalPages = Math.max(1, Math.ceil(gridPosts.length / POSTS_PER_PAGE));
  const pagedPosts = gridPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);

    if (nextPage === currentPage) return;

    setCurrentPage(nextPage);
    // Small timeout to let React update the DOM first, then scroll to the cards grid
    setTimeout(() => {
      const grid = document.getElementById("all-posts-grid");
      if (grid) {
        const top = grid.getBoundingClientRect().top + window.scrollY - 100;
        if (window.__lenis) {
          window.__lenis.scrollTo(top, { immediate: true });
        } else {
          window.scrollTo({ top, behavior: "instant" });
        }
      }
    }, 0);
  };

  const handleSubscribeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = subscriberEmail.trim();

    if (!SUBSCRIBE_EMAIL_PATTERN.test(normalizedEmail)) {
      setSubscribeFeedback({
        tone: "error",
        message: "Enter a valid email address.",
      });
      return;
    }

    setSubscriberEmail("");
    setSubscribeFeedback({
      tone: "success",
      message: "You are now subscribed.",
    });
  };

  const handleSubscriberEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSubscriberEmail(event.target.value);

    if (subscribeFeedback) {
      setSubscribeFeedback(null);
    }
  };

  const selectedCanonicalPostId = selectedPostId
    ? resolveBlogPostRouteId(selectedPostId)
    : null;

  useEffect(() => {
    if (!selectedPostId || selectedPostId === selectedCanonicalPostId) {
      return;
    }

    const hasCanonicalPost = BLOG_POSTS.some(
      (post) => post.id === selectedCanonicalPostId,
    );

    if (!hasCanonicalPost) {
      return;
    }

    window.history.replaceState({}, "", `/blog/${selectedCanonicalPostId}`);
    setSelectedPostId(selectedCanonicalPostId);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, [selectedCanonicalPostId, selectedPostId]);

  const selectedPost = useMemo(
    () => BLOG_POSTS.find((p) => p.id === selectedCanonicalPostId),
    [selectedCanonicalPostId],
  );

  if (selectedPost) {
    return <BlogPostDetail post={selectedPost} />;
  }

  if (selectedPostId) {
    return (
      <NotFoundPage
        title="Blog Post Not Found"
        message="This article URL is not available. Browse the blog index for current posts."
      />
    );
  }

  return (
    <section id="blog" className="bg-white min-h-screen pb-24">
      {/* Edge-to-edge Blue Hero */}
      <div className="bg-[#4f46e5] pt-32 pb-32 mb-20 relative overflow-hidden -mt-24">
        {/* Background Circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 -left-[10%] w-[1000px] h-[1000px] rounded-full border border-white/30"
          />
          <motion.div
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
            className="absolute top-1/2 -translate-y-1/2 -left-[5%] w-[600px] h-[600px] rounded-full border border-white/30"
          />
          <motion.div
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.25, 0.55, 0.25] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute top-1/2 -translate-y-1/2 right-[5%] w-[800px] h-[800px] rounded-full border border-white/30"
          />
          <motion.div
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1], opacity: [0.15, 0.4, 0.15] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            }}
            className="absolute top-1/2 -translate-y-1/2 right-[10%] w-[1200px] h-[1200px] rounded-full border border-white/30"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 lg:items-end">
            <div className="flex-1 max-w-[800px]">
              <p className="text-white font-semibold text-base mb-4">Blog</p>
              <h1
                aria-label="The Journal: Ideas, Guides, Resources, Articles and Notes"
                className="text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight text-white leading-[1.1]"
              >
                <span className="block">The Journal: Ideas,</span>
                <span className="block">Guides,</span>
                <span className="block">Resources, Articles</span>
                <span className="block">and Notes</span>
              </h1>
            </div>

            <div className="max-w-[400px] w-full shrink-0 flex flex-col justify-end mb-1">
              <p className="text-white/90 text-[17px] font-medium mb-6 leading-[1.6]">
                Subscribe to learn about new product features, the latest in
                technology, solutions, and updates.
              </p>
              {subscribeFeedback?.tone === "success" ? (
                <div
                  id="blog-subscribe-feedback"
                  role="status"
                  aria-live="polite"
                  className="inline-flex min-h-[56px] w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-600 text-blue-600">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                    >
                      <path
                        d="M7 12.5l3.2 3.2L17 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{subscribeFeedback.message}</span>
                </div>
              ) : (
                <>
                  <form
                    noValidate
                    onSubmit={handleSubscribeSubmit}
                    className="bg-white p-1.5 rounded-xl flex items-center shadow-sm w-full focus-within:ring-4 ring-white/20 transition-all"
                  >
                    <label htmlFor="blog-subscribe-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="blog-subscribe-email"
                      type="email"
                      value={subscriberEmail}
                      onChange={handleSubscriberEmailChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={subscribeFeedback?.tone === "error"}
                      aria-describedby={
                        subscribeFeedback?.tone === "error"
                          ? "blog-subscribe-feedback"
                          : undefined
                      }
                      className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-500 px-4 py-2 outline-none font-medium text-base h-11"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 h-11 transition-colors text-sm whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </form>
                  {subscribeFeedback?.tone === "error" ? (
                    <div
                      id="blog-subscribe-feedback"
                      role="alert"
                      className="mt-3 inline-flex items-center gap-3 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 shadow-sm"
                    >
                      <span>{subscribeFeedback.message}</span>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div className="relative flex-1 min-w-[240px] max-w-sm group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[15px] outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm hover:border-slate-300"
            />
          </div>

          <div className="flex items-center gap-3">
            <PremiumDropdown
              value={sortBy}
              onChange={(val) => setSortBy(val as "recent" | "oldest")}
              options={[
                { label: "Most recent", value: "recent" },
                { label: "Oldest first", value: "oldest" },
              ]}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
              }
            />
            <PremiumDropdown
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
              options={allCategories.map((cat) => ({ label: cat, value: cat }))}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              }
            />
          </div>
        </div>

        {/* Latest Featured Section */}
        {showLatestSection &&
          latestPosts.length > 0 &&
          (() => {
            const featured = latestPosts[0];
            const recent = latestPosts.slice(1);
            return (
              <div className="mb-20">
                <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-8">
                  Latest
                </h2>

                <a
                  href={`/blog/${featured.id}`}
                  aria-label={`Read article: ${featured.title}`}
                  onClick={(event) =>
                    handleBlogPostLinkClick(event, featured.id)
                  }
                  className="blog-index-card group mb-8 grid overflow-hidden rounded-xl border shadow-sm outline-none transition-all duration-300 focus:outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2 md:grid-cols-2"
                >
                  <div className="blog-index-card__media aspect-[4/3] overflow-hidden border-b md:aspect-auto md:border-b-0 md:border-r">
                    <img
                      src={featured.image || BLOG_HERO_FALLBACK_IMAGE}
                      alt=""
                      role="presentation"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-10">
                    <p className="blog-index-card__meta mb-4 flex items-center gap-2 text-[13px] font-medium">
                      <span className="blog-index-card__category font-bold uppercase tracking-wider">
                        {featured.category}
                      </span>
                      <span className="blog-index-card__separator h-1 w-1 rounded-full"></span>
                      {featured.date}
                      <span className="blog-index-card__separator h-1 w-1 rounded-full"></span>
                      {featured.readTime}
                    </p>
                    <h3 className="blog-index-card__title mb-4 text-2xl font-bold leading-[1.25] tracking-tight transition-colors md:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="blog-index-card__excerpt mb-6 line-clamp-3 text-[15px] leading-[1.7]">
                      {featured.excerpt}
                    </p>
                    <span className="blog-index-card__cta inline-flex items-center gap-1 text-[14px] font-semibold transition-all group-hover:gap-2">
                      Read more
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                    <div className="mt-8 flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
                        <img
                          src={featured.author.avatar}
                          alt={featured.author.name}
                          className="h-full w-full object-cover"
                          style={{ objectPosition: "center top" }}
                        />
                      </div>
                      <span className="text-[14px] font-semibold text-slate-900">
                        {featured.author.name}
                      </span>
                    </div>
                  </div>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {recent.map((post, index) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      index={index}
                      showMeta={true}
                    />
                  ))}
                </div>

                {gridPosts.length > 0 && (
                  <>
                    <div className="mt-12 border-t border-slate-100" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mt-8 mb-8">
                      All Posts
                    </p>
                  </>
                )}
              </div>
            );
          })()}

        {pagedPosts.length > 0 && (
          <div
            id="all-posts-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {pagedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">
              No results found for your search criteria.
            </p>
          </div>
        )}

        {gridPosts.length > 0 && totalPages > 1 && (
          <div className="mt-20 pt-8 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Previous
            </button>
            <span className="text-sm font-medium text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSeries;

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SITE_URL = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://aburahatsabir.vercel.app"
).replace(/\/+$/, "");

const NOT_FOUND_ROUTE_PATH = "/404";
const NOT_FOUND_TITLE = "Page Not Found | Abu Rahat Sabir";
const NOT_FOUND_DESCRIPTION =
  "The page you requested could not be found. Return to the portfolio index or browse the latest work and writing.";
const BLOG_INDEX_TITLE =
  "The Journal: Ideas, Guides, Resources, Articles and Notes | Abu Rahat Sabir";
const BLOG_INDEX_DESCRIPTION =
  "Ideas, guides, resources, articles, and notes from Abu Rahat Sabir.";

const STATIC_ROUTE_HEAD_METADATA = {
  "/blog": {
    title: BLOG_INDEX_TITLE,
    description: BLOG_INDEX_DESCRIPTION,
    ogImage: "/images/og-blog.webp",
    ogImageAlt:
      "The Journal by Abu Rahat Sabir — ideas, guides, resources, articles, and notes",
    ogType: "website",
    schema: (canonicalUrl, imageUrl, siteUrl) => ({
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${canonicalUrl}#blog`,
      name: "The Journal",
      headline: BLOG_INDEX_TITLE.replace(" | Abu Rahat Sabir", ""),
      description: BLOG_INDEX_DESCRIPTION,
      url: canonicalUrl,
      image: imageUrl,
      publisher: {
        "@type": "Person",
        name: "Abu Rahat Sabir",
        url: buildCanonicalUrl("/", siteUrl),
      },
      author: {
        "@type": "Person",
        name: "Abu Rahat Sabir",
        url: buildCanonicalUrl("/about", siteUrl),
      },
      inLanguage: "en",
    }),
  },
};

const STATIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/solutions",
  "/governance",
  "/blog",
  "/for",
  "/work",
  "/privacy",
  "/cookies",
  "/accessibility",
  "/conduct",
  "/certifications",
];

const PERSONA_ROUTES = [
  "/persona/executive-assistants",
  "/persona/operations-leaders",
  "/persona/founders",
  "/persona/hiring-managers",
];

const WORK_ROUTE_ENTRIES = [
  { routePath: "/work/fmcg-erp", canonicalPath: "/work/fmcg-erp" },
  { routePath: "/work/mocs", canonicalPath: "/work/mocs" },
  {
    routePath: "/work/hr-documentation-control-system",
    canonicalPath: "/work/hr-documentation-control-system",
  },
  // Legacy aliases preserved for direct requests; canonical points at the normalized route.
  {
    routePath: "/work/hr-docs",
    canonicalPath: "/work/hr-documentation-control-system",
  },
  {
    routePath: "/work/erp-lite",
    canonicalPath: "/work/hr-documentation-control-system",
  },
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtmlText(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function insertBeforeHeadEnd(html, content) {
  if (html.includes("</head>")) {
    return html.replace("</head>", `${content}\n</head>`);
  }

  return `${html}\n${content}`;
}

export function buildCanonicalUrl(routePath, siteUrl = SITE_URL) {
  const normalizedSiteUrl = siteUrl.replace(/\/+$/, "");
  const normalizedRoutePath =
    routePath === "/"
      ? "/"
      : `/${routePath.replace(/^\/+/, "").replace(/\/+$/, "")}`;

  return new URL(normalizedRoutePath, `${normalizedSiteUrl}/`).href;
}

function upsertMetaTag(html, attributeName, attributeValue, content) {
  const tagPattern = new RegExp(
    `<meta\\s+[^>]*${attributeName}=["']${escapeRegex(attributeValue)}["'][^>]*>`,
    "i",
  );
  const replacement = `    <meta ${attributeName}="${attributeValue}" content="${escapeAttribute(content)}">`;

  if (tagPattern.test(html)) {
    return html.replace(tagPattern, replacement);
  }

  return insertBeforeHeadEnd(html, replacement);
}

function upsertCanonicalLink(html, href) {
  const tagPattern = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  const replacement = `    <link rel="canonical" href="${escapeAttribute(href)}">`;

  if (tagPattern.test(html)) {
    return html.replace(tagPattern, replacement);
  }

  return insertBeforeHeadEnd(html, replacement);
}

function upsertTitle(html, title) {
  const replacement = `<title>${escapeHtmlText(title)}</title>`;

  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, replacement);
  }

  return insertBeforeHeadEnd(html, `    ${replacement}`);
}

function upsertJsonLdScript(html, id, schema) {
  const json = JSON.stringify(schema, null, 2).replace(/</g, "\\u003c");
  const indentedJson = json
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");
  const replacement = `    <script id="${escapeAttribute(id)}" type="application/ld+json">\n${indentedJson}\n    </script>`;
  const scriptPattern = new RegExp(
    `<script\\s+[^>]*id=["']${escapeRegex(id)}["'][^>]*>[\\s\\S]*?<\\/script>`,
    "i",
  );

  if (scriptPattern.test(html)) {
    return html.replace(scriptPattern, replacement);
  }

  return insertBeforeHeadEnd(html, replacement);
}

function toAbsoluteUrl(value, siteUrl = SITE_URL) {
  if (!value) {
    return undefined;
  }

  return new URL(value, `${siteUrl.replace(/\/+$/, "")}/`).href;
}

function getSeoTitleForBlogPost(post) {
  return post.seoTitle || `${post.title} | Abu Rahat Sabir`;
}

function getSeoDescriptionForBlogPost(post) {
  return post.seoDescription || post.excerpt;
}

function buildBlogPostingSchema(post, canonicalUrl, imageUrl, siteUrl = SITE_URL) {
  const datePublished = post.publishedAt || post.dateModified;
  const dateModified = post.dateModified || post.publishedAt;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#blog-posting`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: post.title,
    name: post.title,
    description: getSeoDescriptionForBlogPost(post),
    image: imageUrl ? [imageUrl] : undefined,
    author: {
      "@type": "Person",
      name: post.author?.name || "Abu Rahat Sabir",
      url: buildCanonicalUrl("/about", siteUrl),
    },
    publisher: {
      "@type": "Person",
      name: "Abu Rahat Sabir",
      url: buildCanonicalUrl("/", siteUrl),
    },
    datePublished,
    dateModified,
    articleSection: post.category,
    keywords: post.tags?.join(", "),
    inLanguage: "en",
    isAccessibleForFree: true,
  };
}

function buildBreadcrumbListSchema(post, canonicalUrl, siteUrl = SITE_URL) {
  const homeUrl = buildCanonicalUrl("/", siteUrl);
  const blogUrl = buildCanonicalUrl("/blog", siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: blogUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };
}

export function injectRouteHead(html, routePath, siteUrl = SITE_URL) {
  const canonicalUrl = buildCanonicalUrl(routePath, siteUrl);
  const routeMetadata = STATIC_ROUTE_HEAD_METADATA[routePath];
  const imageUrl = toAbsoluteUrl(routeMetadata?.ogImage, siteUrl);
  let updatedHtml = upsertCanonicalLink(html, canonicalUrl);
  updatedHtml = upsertMetaTag(updatedHtml, "property", "og:url", canonicalUrl);
  updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:url", canonicalUrl);

  if (routeMetadata) {
    updatedHtml = upsertTitle(updatedHtml, routeMetadata.title);
    updatedHtml = upsertMetaTag(
      updatedHtml,
      "name",
      "description",
      routeMetadata.description,
    );
    updatedHtml = upsertMetaTag(
      updatedHtml,
      "property",
      "og:type",
      routeMetadata.ogType || "website",
    );
    updatedHtml = upsertMetaTag(updatedHtml, "property", "og:title", routeMetadata.title);
    updatedHtml = upsertMetaTag(
      updatedHtml,
      "property",
      "og:description",
      routeMetadata.description,
    );
    updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:card", "summary_large_image");
    updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:title", routeMetadata.title);
    updatedHtml = upsertMetaTag(
      updatedHtml,
      "name",
      "twitter:description",
      routeMetadata.description,
    );

    if (imageUrl) {
      const imageAlt =
        routeMetadata.ogImageAlt || `${routeMetadata.title} — Abu Rahat Sabir`;
      updatedHtml = upsertMetaTag(updatedHtml, "property", "og:image", imageUrl);
      updatedHtml = upsertMetaTag(
        updatedHtml,
        "property",
        "og:image:alt",
        imageAlt,
      );
      updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:image", imageUrl);
      updatedHtml = upsertMetaTag(
        updatedHtml,
        "name",
        "twitter:image:alt",
        imageAlt,
      );
    }

    if (routeMetadata.schema) {
      updatedHtml = upsertJsonLdScript(
        updatedHtml,
        "route-schema",
        routeMetadata.schema(canonicalUrl, imageUrl, siteUrl),
      );
    }
  }

  return updatedHtml;
}

export function injectBlogPostHead(html, post, routePath, siteUrl = SITE_URL) {
  const canonicalUrl = buildCanonicalUrl(routePath, siteUrl);
  const seoTitle = getSeoTitleForBlogPost(post);
  const seoDescription = getSeoDescriptionForBlogPost(post);
  const imageUrl = toAbsoluteUrl(post.ogImage || post.image, siteUrl);
  const datePublished = post.publishedAt || post.dateModified;
  const dateModified = post.dateModified || post.publishedAt;

  let updatedHtml = injectRouteHead(html, routePath, siteUrl);
  updatedHtml = upsertTitle(updatedHtml, seoTitle);
  updatedHtml = upsertMetaTag(updatedHtml, "name", "description", seoDescription);
  updatedHtml = upsertMetaTag(updatedHtml, "name", "author", post.author?.name || "Abu Rahat Sabir");
  updatedHtml = upsertMetaTag(updatedHtml, "property", "og:type", "article");
  updatedHtml = upsertMetaTag(updatedHtml, "property", "og:title", seoTitle);
  updatedHtml = upsertMetaTag(updatedHtml, "property", "og:description", seoDescription);
  updatedHtml = upsertMetaTag(updatedHtml, "property", "og:url", canonicalUrl);
  updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:card", "summary_large_image");
  updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:url", canonicalUrl);
  updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:title", seoTitle);
  updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:description", seoDescription);

  if (imageUrl) {
    updatedHtml = upsertMetaTag(updatedHtml, "property", "og:image", imageUrl);
    updatedHtml = upsertMetaTag(updatedHtml, "property", "og:image:alt", post.title);
    updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:image", imageUrl);
    updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:image:alt", post.title);
  }

  if (datePublished) {
    updatedHtml = upsertMetaTag(
      updatedHtml,
      "property",
      "article:published_time",
      datePublished,
    );
  }

  if (dateModified) {
    updatedHtml = upsertMetaTag(
      updatedHtml,
      "property",
      "article:modified_time",
      dateModified,
    );
  }

  if (post.category) {
    updatedHtml = upsertMetaTag(updatedHtml, "property", "article:section", post.category);
  }

  updatedHtml = upsertJsonLdScript(
    updatedHtml,
    "blog-posting-schema",
    buildBlogPostingSchema(post, canonicalUrl, imageUrl, siteUrl),
  );

  updatedHtml = upsertJsonLdScript(
    updatedHtml,
    "blog-breadcrumb-schema",
    buildBreadcrumbListSchema(post, canonicalUrl, siteUrl),
  );

  return updatedHtml;
}

export function injectNotFoundHead(html, siteUrl = SITE_URL) {
  const canonicalUrl = buildCanonicalUrl(NOT_FOUND_ROUTE_PATH, siteUrl);
  let updatedHtml = injectRouteHead(html, NOT_FOUND_ROUTE_PATH, siteUrl);

  updatedHtml = upsertTitle(updatedHtml, NOT_FOUND_TITLE);
  updatedHtml = upsertMetaTag(
    updatedHtml,
    "name",
    "description",
    NOT_FOUND_DESCRIPTION,
  );
  updatedHtml = upsertMetaTag(updatedHtml, "name", "robots", "noindex,follow");
  updatedHtml = upsertMetaTag(updatedHtml, "property", "og:type", "website");
  updatedHtml = upsertMetaTag(updatedHtml, "property", "og:title", NOT_FOUND_TITLE);
  updatedHtml = upsertMetaTag(
    updatedHtml,
    "property",
    "og:description",
    NOT_FOUND_DESCRIPTION,
  );
  updatedHtml = upsertMetaTag(updatedHtml, "property", "og:url", canonicalUrl);
  updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:card", "summary");
  updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:url", canonicalUrl);
  updatedHtml = upsertMetaTag(updatedHtml, "name", "twitter:title", NOT_FOUND_TITLE);
  updatedHtml = upsertMetaTag(
    updatedHtml,
    "name",
    "twitter:description",
    NOT_FOUND_DESCRIPTION,
  );

  return updatedHtml;
}

export function extractBlogRouteEntries(sourceText) {
  return extractBlogPostMetadataEntries(sourceText).map((post) => ({
    routePath: `/blog/${post.id}`,
    canonicalPath: `/blog/${post.id}`,
  }));
}

export function extractBlogRouteAliasEntries(sourceText) {
  const aliasesBlock = sourceText.match(
    /BLOG_POST_ROUTE_ALIASES[^=]*=\s*\{([\s\S]*?)\};/,
  )?.[1];

  if (!aliasesBlock) {
    return [];
  }

  return [
    ...aliasesBlock.matchAll(/["']([^"']+)["']\s*:\s*["']([^"']+)["']/g),
  ].map((match) => ({
    routePath: `/blog/${match[1]}`,
    canonicalPath: `/blog/${match[2]}`,
  }));
}

function readBlogPostsSource() {
  return fs.readFileSync(
    path.join(__dirname, "..", "content", "blog-posts.ts"),
    "utf8",
  );
}

function findMatchingCodeDelimiter(sourceText, startIndex, openChar, closeChar) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let index = startIndex; index < sourceText.length; index += 1) {
    const char = sourceText[index];
    const nextChar = sourceText[index + 1];

    if (inLineComment) {
      if (char === "\n") {
        inLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (char === "*" && nextChar === "/") {
        inBlockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === "/" && nextChar === "/") {
      inLineComment = true;
      index += 1;
      continue;
    }

    if (char === "/" && nextChar === "*") {
      inBlockComment = true;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === openChar) {
      depth += 1;
    }

    if (char === closeChar) {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}

function extractBlogPostObjectBlocks(sourceText) {
  const blogPostsIndex = sourceText.indexOf("BLOG_POSTS");
  if (blogPostsIndex === -1) {
    return [];
  }

  const assignmentIndex = sourceText.indexOf("=", blogPostsIndex);
  if (assignmentIndex === -1) {
    return [];
  }

  const arrayStartIndex = sourceText.indexOf("[", assignmentIndex);
  if (arrayStartIndex === -1) {
    return [];
  }

  const arrayEndIndex = findMatchingCodeDelimiter(sourceText, arrayStartIndex, "[", "]");
  if (arrayEndIndex === -1) {
    return [];
  }

  const arraySource = sourceText.slice(arrayStartIndex + 1, arrayEndIndex);
  const blocks = [];
  let searchIndex = 0;

  while (searchIndex < arraySource.length) {
    const objectStartIndex = arraySource.indexOf("{", searchIndex);
    if (objectStartIndex === -1) {
      break;
    }

    const objectEndIndex = findMatchingCodeDelimiter(
      arraySource,
      objectStartIndex,
      "{",
      "}",
    );

    if (objectEndIndex === -1) {
      break;
    }

    const block = arraySource.slice(objectStartIndex, objectEndIndex + 1);
    if (/^\{\s*id\s*:/s.test(block)) {
      blocks.push(block);
    }

    searchIndex = objectEndIndex + 1;
  }

  return blocks;
}

function extractStringProperty(sourceText, propertyName) {
  const propertyPattern = new RegExp(`${escapeRegex(propertyName)}\\s*:\\s*(["'\`])`);
  const propertyMatch = propertyPattern.exec(sourceText);

  if (!propertyMatch) {
    return undefined;
  }

  const quote = propertyMatch[1];
  const valueStartIndex = propertyMatch.index + propertyMatch[0].length;
  let escaped = false;
  let value = "";

  for (let index = valueStartIndex; index < sourceText.length; index += 1) {
    const char = sourceText[index];

    if (escaped) {
      value += char;
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === quote) {
      return value.trim();
    }

    value += char;
  }

  return undefined;
}

function extractArrayStringProperty(sourceText, propertyName) {
  const propertyIndex = sourceText.search(
    new RegExp(`${escapeRegex(propertyName)}\\s*:\\s*\\[`),
  );

  if (propertyIndex === -1) {
    return [];
  }

  const arrayStartIndex = sourceText.indexOf("[", propertyIndex);
  const arrayEndIndex = findMatchingCodeDelimiter(sourceText, arrayStartIndex, "[", "]");

  if (arrayEndIndex === -1) {
    return [];
  }

  const arraySource = sourceText.slice(arrayStartIndex + 1, arrayEndIndex);
  return [...arraySource.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
}

function extractObjectProperty(sourceText, propertyName) {
  const propertyIndex = sourceText.search(
    new RegExp(`${escapeRegex(propertyName)}\\s*:\\s*\\{`),
  );

  if (propertyIndex === -1) {
    return "";
  }

  const objectStartIndex = sourceText.indexOf("{", propertyIndex);
  const objectEndIndex = findMatchingCodeDelimiter(sourceText, objectStartIndex, "{", "}");

  if (objectEndIndex === -1) {
    return "";
  }

  return sourceText.slice(objectStartIndex, objectEndIndex + 1);
}

function extractIdentifierProperty(sourceText, propertyName) {
  const propertyPattern = new RegExp(
    `${escapeRegex(propertyName)}\\s*:\\s*([A-Za-z_$][\\w$]*)`,
  );
  const propertyMatch = propertyPattern.exec(sourceText);

  return propertyMatch?.[1] || "";
}

function extractConstObjectBlock(sourceText, constName) {
  const constPattern = new RegExp(
    `(?:export\\s+)?const\\s+${escapeRegex(constName)}(?:\\s*:[^=]+)?\\s*=\\s*\\{`,
  );
  const constMatch = constPattern.exec(sourceText);

  if (!constMatch) {
    return "";
  }

  const objectStartIndex = sourceText.indexOf("{", constMatch.index);
  const objectEndIndex = findMatchingCodeDelimiter(sourceText, objectStartIndex, "{", "}");

  if (objectEndIndex === -1) {
    return "";
  }

  return sourceText.slice(objectStartIndex, objectEndIndex + 1);
}

export function extractBlogPostMetadataEntries(sourceText) {
  const constObjectBlocks = new Map();

  const getConstObjectBlock = (constName) => {
    if (!constObjectBlocks.has(constName)) {
      constObjectBlocks.set(constName, extractConstObjectBlock(sourceText, constName));
    }

    return constObjectBlocks.get(constName);
  };

  return extractBlogPostObjectBlocks(sourceText)
    .map((block) => {
      const inlineAuthorBlock = extractObjectProperty(block, "author");
      const authorReference = extractIdentifierProperty(block, "author");
      const authorBlock =
        inlineAuthorBlock || (authorReference ? getConstObjectBlock(authorReference) : "");

      return {
        id: extractStringProperty(block, "id"),
        title: extractStringProperty(block, "title"),
        seoTitle: extractStringProperty(block, "seoTitle"),
        excerpt: extractStringProperty(block, "excerpt"),
        seoDescription: extractStringProperty(block, "seoDescription"),
        publishedAt: extractStringProperty(block, "publishedAt"),
        dateModified: extractStringProperty(block, "dateModified"),
        category: extractStringProperty(block, "category"),
        image: extractStringProperty(block, "image"),
        ogImage: extractStringProperty(block, "ogImage"),
        tags: extractArrayStringProperty(block, "tags"),
        author: {
          name: extractStringProperty(authorBlock, "name"),
          role: extractStringProperty(authorBlock, "role"),
          avatar: extractStringProperty(authorBlock, "avatar"),
        },
      };
    })
    .filter((post) => post.id && post.title && post.excerpt);
}

export function getPrerenderRouteEntries(blogPostsSource = readBlogPostsSource()) {
  const routeEntries = [
    ...STATIC_ROUTES.map((routePath) => ({
      routePath,
      canonicalPath: routePath,
    })),
    ...PERSONA_ROUTES.map((routePath) => ({
      routePath,
      canonicalPath: routePath,
    })),
    ...WORK_ROUTE_ENTRIES,
    ...extractBlogRouteEntries(blogPostsSource),
    ...extractBlogRouteAliasEntries(blogPostsSource),
  ];

  const uniqueEntries = new Map();

  for (const entry of routeEntries) {
    uniqueEntries.set(entry.routePath, entry);
  }

  return [...uniqueEntries.values()];
}

function getOutputPathForRoute(outDir, routePath) {
  if (routePath === "/") {
    return path.join(outDir, "index.html");
  }

  return path.join(outDir, routePath.replace(/^\/+/, ""), "index.html");
}

export function prerenderRouteHeads({
  outDir = path.join(__dirname, "..", "dist"),
  siteUrl = SITE_URL,
} = {}) {
  const templatePath = path.join(outDir, "index.html");

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `Cannot prerender route heads without a built template at ${templatePath}`,
    );
  }

  const blogPostsSource = readBlogPostsSource();
  const blogPostsByCanonicalPath = new Map(
    extractBlogPostMetadataEntries(blogPostsSource).map((post) => [
      `/blog/${post.id}`,
      post,
    ]),
  );
  const templateHtml = fs.readFileSync(templatePath, "utf8");
  const routeEntries = getPrerenderRouteEntries(blogPostsSource).filter(
    (entry) => entry.routePath === entry.canonicalPath,
  );

  for (const { routePath, canonicalPath } of routeEntries) {
    const outputPath = getOutputPathForRoute(outDir, routePath);
    const blogPost = blogPostsByCanonicalPath.get(canonicalPath);
    const html = blogPost
      ? injectBlogPostHead(templateHtml, blogPost, canonicalPath, siteUrl)
      : injectRouteHead(templateHtml, canonicalPath, siteUrl);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html, "utf8");
  }

  fs.writeFileSync(
    path.join(outDir, "404.html"),
    injectNotFoundHead(templateHtml, siteUrl),
    "utf8",
  );

  return routeEntries;
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const routeEntries = prerenderRouteHeads();
  console.log(
    `Prerendered canonical head tags for ${routeEntries.length} routes and 404.html.`,
  );
}

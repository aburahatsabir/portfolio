/**
 * Generates valid RSS 2.0 feed for blog articles.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE_URL,
  extractBlogPostMetadataEntries,
} from "./prerender-route-head.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_OUTPUT_DIR = path.join(__dirname, "..", "public");

function readBlogPostsSource() {
  return fs.readFileSync(
    path.join(__dirname, "..", "content", "blog-posts.ts"),
    "utf8",
  );
}

function normalizeSiteUrl(siteUrl = SITE_URL) {
  return siteUrl.replace(/\/+$/, "");
}

function escapeXml(value) {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822Date(dateStr) {
  const date = dateStr ? new Date(dateStr) : new Date();
  return date.toUTCString();
}

export function generateRssXml({
  blogPostsSource = readBlogPostsSource(),
  siteUrl = SITE_URL,
} = {}) {
  const baseUrl = normalizeSiteUrl(siteUrl);
  const posts = extractBlogPostMetadataEntries(blogPostsSource);
  const latestPostDate = posts[0]
    ? posts[0].publishedAt || posts[0].dateModified
    : null;
  const lastBuildDate = toRfc822Date(latestPostDate);

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.id}`;
      const pubDate = toRfc822Date(post.publishedAt || post.dateModified);

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(postUrl)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(post.seoDescription || post.excerpt)}</description>`,
        post.category ? `      <category>${escapeXml(post.category)}</category>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>The Journal | Abu Rahat Sabir</title>",
    `    <link>${baseUrl}/blog</link>`,
    "    <description>Ideas, guides, resources, articles, and notes from Abu Rahat Sabir.</description>",
    "    <language>en-us</language>",
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    "    <image>",
    `      <url>${baseUrl}/favicon-512.png</url>`,
    "      <title>The Journal | Abu Rahat Sabir</title>",
    `      <link>${baseUrl}/blog</link>`,
    "    </image>",
    `    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />`,
    itemsXml,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

export function writeRssFiles({
  outputDir = DEFAULT_OUTPUT_DIR,
  siteUrl = SITE_URL,
} = {}) {
  const rssXml = generateRssXml({ siteUrl });
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "rss.xml"), rssXml, "utf8");

  return {
    outputDir,
    postCount: extractBlogPostMetadataEntries(readBlogPostsSource()).length,
  };
}

export function writeRssFeed({ siteUrl = SITE_URL } = {}) {
  const outputs = [writeRssFiles({ siteUrl })];
  const distDir = path.join(__dirname, "..", "dist");

  if (fs.existsSync(distDir)) {
    outputs.push(writeRssFiles({ outputDir: distDir, siteUrl }));
  }

  return outputs;
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const outputs = writeRssFeed();
  for (const output of outputs) {
    console.log(`Generated rss.xml at: ${output.outputDir}`);
  }
}

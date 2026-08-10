/**
 * Generates canonical SEO crawl files from the same route source used by prerendering.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE_URL,
  extractBlogPostMetadataEntries,
  getPrerenderRouteEntries,
} from "./prerender-route-head.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_OUTPUT_DIR = path.join(__dirname, "..", "public");

const ROUTE_CONFIG = {
  "/": { priority: "1.0", changefreq: "weekly" },
  "/about": { priority: "0.9", changefreq: "monthly" },
  "/work": { priority: "0.9", changefreq: "weekly" },
  "/solutions": { priority: "0.8", changefreq: "monthly" },
  "/blog": { priority: "0.8", changefreq: "weekly" },
  "/for": { priority: "0.7", changefreq: "monthly" },
  "/contact": { priority: "0.9", changefreq: "monthly" },
  "/governance": { priority: "0.7", changefreq: "monthly" },
  "/certifications": { priority: "0.6", changefreq: "monthly" },
  "/privacy": { priority: "0.3", changefreq: "yearly" },
  "/cookies": { priority: "0.3", changefreq: "yearly" },
  "/accessibility": { priority: "0.3", changefreq: "yearly" },
  "/conduct": { priority: "0.3", changefreq: "yearly" },
};

function readBlogPostsSource() {
  return fs.readFileSync(
    path.join(__dirname, "..", "content", "blog-posts.ts"),
    "utf8",
  );
}

function normalizeSiteUrl(siteUrl = SITE_URL) {
  return siteUrl.replace(/\/+$/, "");
}

function getDefaultRouteConfig(routePath) {
  if (routePath.startsWith("/blog/")) {
    return { priority: "0.7", changefreq: "monthly" };
  }

  if (routePath.startsWith("/work/")) {
    return { priority: "0.8", changefreq: "monthly" };
  }

  if (routePath.startsWith("/persona/")) {
    return { priority: "0.8", changefreq: "monthly" };
  }

  return { priority: "0.5", changefreq: "monthly" };
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function getCanonicalSitemapRoutes({
  blogPostsSource = readBlogPostsSource(),
} = {}) {
  const blogLastmodByPath = new Map(
    extractBlogPostMetadataEntries(blogPostsSource).map((post) => [
      `/blog/${post.id}`,
      post.dateModified || post.publishedAt,
    ]),
  );

  return getPrerenderRouteEntries(blogPostsSource)
    .filter((route) => route.routePath === route.canonicalPath)
    .map(({ routePath }) => ({
      path: routePath,
      ...(ROUTE_CONFIG[routePath] || getDefaultRouteConfig(routePath)),
      lastmod: blogLastmodByPath.get(routePath),
    }));
}

export function generateSitemap({
  routes = getCanonicalSitemapRoutes(),
  siteUrl = SITE_URL,
  generatedAt = new Date(),
} = {}) {
  const baseUrl = normalizeSiteUrl(siteUrl);
  const defaultLastmod = generatedAt.toISOString().split("T")[0];
  const uniqueRoutes = new Map(routes.map((route) => [route.path, route]));

  const urls = [...uniqueRoutes.values()]
    .map((route) => {
      const loc = `${baseUrl}${route.path}`;
      const lastmod = route.lastmod || defaultLastmod;

      return [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
        `    <changefreq>${escapeXml(route.changefreq)}</changefreq>`,
        `    <priority>${escapeXml(route.priority)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

export function generateRobotsTxt({ siteUrl = SITE_URL } = {}) {
  const baseUrl = normalizeSiteUrl(siteUrl);

  return [
    "# https://www.robotstxt.org/robotstxt.html",
    "User-agent: *",
    "Allow: /",
    "",
    "# Sitemap location",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    "",
  ].join("\n");
}

function writeSeoFiles({ outputDir = DEFAULT_OUTPUT_DIR, siteUrl = SITE_URL } = {}) {
  const sitemap = generateSitemap({ siteUrl });
  const robots = generateRobotsTxt({ siteUrl });

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "sitemap.xml"), sitemap, "utf8");
  fs.writeFileSync(path.join(outputDir, "robots.txt"), robots, "utf8");

  return {
    outputDir,
    routeCount: getCanonicalSitemapRoutes().length,
  };
}

export function writeSitemapAndRobots({ siteUrl = SITE_URL } = {}) {
  const outputs = [writeSeoFiles({ siteUrl })];
  const distDir = path.join(__dirname, "..", "dist");

  if (fs.existsSync(distDir)) {
    outputs.push(writeSeoFiles({ outputDir: distDir, siteUrl }));
  }

  return outputs;
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const outputs = writeSitemapAndRobots();
  const routeCount = outputs[0]?.routeCount ?? 0;

  for (const output of outputs) {
    console.log(`Generated sitemap.xml and robots.txt at: ${output.outputDir}`);
  }

  console.log(`Total canonical URLs: ${routeCount}`);
}

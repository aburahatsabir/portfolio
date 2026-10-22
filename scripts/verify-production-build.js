import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractBlogPostMetadataEntries,
  getPrerenderRouteEntries,
  SITE_URL,
} from './prerender-route-head.js';
import {
  STATIC_ROUTE_METADATA,
  getBlogPostRouteMetadata,
} from '../config/site-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const buildDir = path.join(projectRoot, 'dist');

const forbiddenRoutes = [
  'accessibility',
  'conduct',
  'for',
  'governance',
  'solutions',
  'postmortems',
  'work/erp-lite',
  'work/fmcg',
  'work/hr-doc-control',
  'work/hr-docs',
  'work/med-ops',
  'work/mocs',
  'blog/blog-02',
  'blog/blog-semrush-bing-ai',
];

const forbiddenArtifacts = [
  'erp-demo.html',
  'hr-docs-case-study.html',
  'set-api-key.html',
  'stats.html',
  'scripts/hash-redirect.js',
];

function fail(message) {
  throw new Error(`Production build verification failed: ${message}`);
}

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractMetaContent(html, attributeName, attributeValue) {
  const tag = html.match(new RegExp(
    `<meta\\s+[^>]*${attributeName}=["']${escapeRegex(attributeValue)}["'][^>]*>`,
    'i',
  ))?.[0];
  const content = tag?.match(/\bcontent=(["'])(.*?)\1/i)?.[2];
  return content === undefined ? null : decodeHtml(content);
}

function verifyMetadataValue(routePath, field, actual, expected) {
  if (actual !== expected) {
    fail(`${routePath} ${field} mismatch: expected "${expected}", received "${actual}"`);
  }
}

if (!fs.existsSync(buildDir)) {
  fail('dist/ does not exist. Run npm run build first.');
}

const canonicalRoutes = getPrerenderRouteEntries()
  .filter(({ routePath, canonicalPath }) => routePath === canonicalPath)
  .map(({ routePath }) => routePath);

const blogPostsSource = fs.readFileSync(
  path.join(projectRoot, 'content', 'blog-posts.ts'),
  'utf8',
);
const metadataByRoute = new Map([
  ...Object.entries(STATIC_ROUTE_METADATA),
  ...extractBlogPostMetadataEntries(blogPostsSource).map((post) => [
    `/blog/${post.id}`,
    getBlogPostRouteMetadata(post),
  ]),
]);

for (const routePath of canonicalRoutes) {
  const outputPath = routePath === '/'
    ? path.join(buildDir, 'index.html')
    : path.join(buildDir, routePath.slice(1), 'index.html');

  if (!fs.existsSync(outputPath)) {
    fail(`missing canonical route output for ${routePath}`);
  }
}

if (!fs.existsSync(path.join(buildDir, '404.html'))) {
  fail('missing 404.html');
}

for (const routePath of forbiddenRoutes) {
  if (fs.existsSync(path.join(buildDir, routePath))) {
    fail(`removed route was emitted: /${routePath}`);
  }
}

for (const artifactPath of forbiddenArtifacts) {
  if (fs.existsSync(path.join(buildDir, artifactPath))) {
    fail(`forbidden public artifact was emitted: ${artifactPath}`);
  }
}

const buildFiles = listFiles(buildDir);
const sourceMaps = buildFiles.filter((filePath) => filePath.endsWith('.map'));
if (sourceMaps.length > 0) {
  fail(`public source maps were emitted (${sourceMaps.length})`);
}

const htmlFiles = buildFiles.filter((filePath) => filePath.endsWith('.html'));
const expectedHtmlFiles = new Set([
  ...canonicalRoutes.map((routePath) => path.normalize(
    routePath === '/' ? 'index.html' : path.join(routePath.slice(1), 'index.html'),
  )),
  path.normalize('404.html'),
]);
const actualHtmlFiles = new Set(
  htmlFiles.map((filePath) => path.normalize(path.relative(buildDir, filePath))),
);

if (
  expectedHtmlFiles.size !== actualHtmlFiles.size
  || [...expectedHtmlFiles].some((filePath) => !actualHtmlFiles.has(filePath))
) {
  fail('HTML output contains a missing or non-allowlisted page artifact');
}

for (const htmlPath of htmlFiles) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const resourceUrls = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)]
    .map((match) => match[1]);
  const documentRelativeUrl = resourceUrls.find((url) => (
    !url.startsWith('/')
    && !url.startsWith('#')
    && !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(url)
  ));
  if (documentRelativeUrl) {
    fail(
      `document-relative resource URL found in ${path.relative(buildDir, htmlPath)}: ${documentRelativeUrl}`,
    );
  }
  if (html.includes('hash-redirect.js')) {
    fail(`legacy hash redirect found in ${path.relative(buildDir, htmlPath)}`);
  }
}

for (const routePath of canonicalRoutes) {
  const metadata = metadataByRoute.get(routePath);
  if (!metadata) {
    fail(`missing registry metadata for ${routePath}`);
  }

  const outputPath = routePath === '/'
    ? path.join(buildDir, 'index.html')
    : path.join(buildDir, routePath.slice(1), 'index.html');
  const html = fs.readFileSync(outputPath, 'utf8');
  const canonicalUrl = new URL(routePath, `${SITE_URL}/`).href;
  const socialDescription = metadata.socialDescription || metadata.description;
  const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const canonicalHref = decodeHtml(
    html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]
      ?? html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1]
      ?? '',
  );

  verifyMetadataValue(routePath, 'title', title, metadata.title);
  verifyMetadataValue(
    routePath,
    'description',
    extractMetaContent(html, 'name', 'description'),
    metadata.description,
  );
  verifyMetadataValue(
    routePath,
    'robots',
    extractMetaContent(html, 'name', 'robots'),
    metadata.robots,
  );
  verifyMetadataValue(routePath, 'canonical', canonicalHref, canonicalUrl);
  verifyMetadataValue(
    routePath,
    'og:title',
    extractMetaContent(html, 'property', 'og:title'),
    metadata.title,
  );
  verifyMetadataValue(
    routePath,
    'og:description',
    extractMetaContent(html, 'property', 'og:description'),
    socialDescription,
  );
  verifyMetadataValue(
    routePath,
    'og:type',
    extractMetaContent(html, 'property', 'og:type'),
    metadata.ogType,
  );
  verifyMetadataValue(
    routePath,
    'og:url',
    extractMetaContent(html, 'property', 'og:url'),
    canonicalUrl,
  );
  verifyMetadataValue(
    routePath,
    'twitter:card',
    extractMetaContent(html, 'name', 'twitter:card'),
    metadata.twitterCard,
  );
  verifyMetadataValue(
    routePath,
    'twitter:title',
    extractMetaContent(html, 'name', 'twitter:title'),
    metadata.title,
  );
  verifyMetadataValue(
    routePath,
    'twitter:description',
    extractMetaContent(html, 'name', 'twitter:description'),
    socialDescription,
  );
  verifyMetadataValue(
    routePath,
    'twitter:url',
    extractMetaContent(html, 'name', 'twitter:url'),
    canonicalUrl,
  );

  if (metadata.ogImage) {
    const imageUrl = new URL(metadata.ogImage, `${SITE_URL}/`).href;
    verifyMetadataValue(
      routePath,
      'og:image',
      extractMetaContent(html, 'property', 'og:image'),
      imageUrl,
    );
    verifyMetadataValue(
      routePath,
      'twitter:image',
      extractMetaContent(html, 'name', 'twitter:image'),
      imageUrl,
    );
  }
}

const manifestPath = path.join(buildDir, 'site.webmanifest');
if (!fs.existsSync(manifestPath)) {
  fail('missing site.webmanifest');
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (manifest.start_url !== '/' || manifest.scope !== '/') {
  fail('web manifest must use the canonical root for start_url and scope');
}

for (const icon of manifest.icons ?? []) {
  if (typeof icon.src !== 'string' || !icon.src.startsWith('/')) {
    fail(`web manifest icon is not root-relative: ${icon.src}`);
  }
  if (!fs.existsSync(path.join(buildDir, icon.src.slice(1)))) {
    fail(`web manifest icon is missing: ${icon.src}`);
  }
}

const javascript = buildFiles
  .filter((filePath) => filePath.endsWith('.js'))
  .map((filePath) => fs.readFileSync(filePath, 'utf8'))
  .join('\n');

for (const placeholder of [
  'service_portfolio',
  'template_portfolio',
  'public_key_portfolio',
]) {
  if (javascript.includes(placeholder)) {
    fail(`contact form placeholder leaked into the bundle: ${placeholder}`);
  }
}

const sitemap = fs.readFileSync(path.join(buildDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = canonicalRoutes.map(
  (routePath) => `${SITE_URL}${routePath === '/' ? '/' : routePath}`,
);

if (JSON.stringify([...sitemapUrls].sort()) !== JSON.stringify([...expectedUrls].sort())) {
  fail('sitemap URLs do not match the canonical route contract');
}

console.log(
  `Verified ${canonicalRoutes.length} canonical routes, ${htmlFiles.length} HTML files, one 404 page, and a clean public artifact.`,
);

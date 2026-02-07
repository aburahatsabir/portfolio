/**
 * Sitemap Generator for Abu Rahat Sabir Portfolio
 * Generates sitemap.xml for better SEO and search engine crawling
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL for the portfolio
const BASE_URL = 'https://aburahatsabir.github.io/portfolio';

// Static routes
const routes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.9', changefreq: 'monthly' },
    { path: '/work', priority: '0.9', changefreq: 'weekly' },
    { path: '/solutions', priority: '0.8', changefreq: 'monthly' },
    { path: '/governance', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog', priority: '0.8', changefreq: 'weekly' },
    { path: '/for', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.9', changefreq: 'monthly' },
    { path: '/post-mortems', priority: '0.6', changefreq: 'monthly' },
    { path: '/success-stories', priority: '0.7', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/cookies', priority: '0.3', changefreq: 'yearly' },
];

// Persona pages
const personaPages = [
    '/persona/executive-assistants',
    '/persona/operations-leaders',
    '/persona/founders',
    '/persona/hiring-managers'
];

personaPages.forEach(path => {
    routes.push({ path, priority: '0.8', changefreq: 'monthly' });
});

// Case study routes (add your project IDs here)
const caseStudies = [
    'fmcg-distribution-erp',
    'medical-ops-control',
    'payroll-engine',
    'trade-finance-ledger'
];

caseStudies.forEach(id => {
    routes.push({
        path: `/work/${id}`,
        priority: '0.8',
        changefreq: 'monthly'
    });
});

// Generate XML
function generateSitemap() {
    const lastmod = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    routes.forEach(route => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    return xml;
}

// Write sitemap to public directory
const sitemap = generateSitemap();
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log('✅ Sitemap generated successfully at:', outputPath);
console.log(`📊 Total URLs: ${routes.length}`);

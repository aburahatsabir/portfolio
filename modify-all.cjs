const fs = require('fs');
const file = 'd:/OneDrive - 55phcx/port/portfolio codex/portfolio/components/HRDocsCaseStudy.tsx';
let content = fs.readFileSync(file, 'utf8');

// Chunk 1
content = content.replace(
    'type WebflowVsWordpressCustomerBadge = {\r\n    imageSrc: string;\r\n    imageAlt: string;\r\n};',
    'type WebflowVsWordpressCustomerBadge = {\r\n    title: string;\r\n    description: string;\r\n};'
).replace(
    'type WebflowVsWordpressCustomerBadge = {\n    imageSrc: string;\n    imageAlt: string;\n};',
    'type WebflowVsWordpressCustomerBadge = {\n    title: string;\n    description: string;\n};'
);

// Chunk 2
content = content.replace(
    /const webflowVsWordpressCustomerBadges: WebflowVsWordpressCustomerBadge\[\] = \[\s*\{\s*imageSrc: 'https:\/\/cdn\.prod\.website-files\.com\/686294e263eb7e215bd232f7\/695d1a83f727ce7de53a4c8c_Enterprise%20Leader%20-%20Winter%202026%20G2\.svg',\s*imageAlt: 'G2 Enterprise Leader Winter 2026',\s*\},\s*\{\s*imageSrc: 'https:\/\/cdn\.prod\.website-files\.com\/686294e263eb7e215bd232f7\/695d1aeb3253f22d5bbe6aab_g2-badge_overall-leader_winter-26\.svg',\s*imageAlt: 'G2 Overall Leader Winter 2026',\s*\},\s*\{\s*imageSrc: 'https:\/\/cdn\.prod\.website-files\.com\/686294e263eb7e215bd232f7\/695d1aeb1bdcf54c2ba09181_g2-badge_regional-leader_emea_winter-26\.svg',\s*imageAlt: 'G2 Regional Leader for EMEA Winter 2026',\s*\}\s*,?\s*\];/,
    `const webflowVsWordpressCustomerBadges: WebflowVsWordpressCustomerBadge[] = [
    {
        title: 'Used across HR operations',
        description: 'Growing SMEs · Active deployment',
    },
    {
        title: 'Trusted for payroll and compliance',
        description: 'Validated workflows · Audit-ready systems',
    },
    {
        title: 'Operational reliability proven',
        description: 'Real-world usage · Consistent outcomes',
    },
];`
);

// Chunk 3
content = content.replace(
    /<h2 className=\"wfvwp-migration-card__title\">How to navigate the WordPress to Webflow migration<\/h2>\s*<p className=\"wfvwp-migration-card__body-copy\">\s*Modern teams need to unplug from WordPress&apos; technical burdens, dev dependencies, workflow bottlenecks, and performance issues that drain critical resources. Download our migration guide to learn why and how migrating to Webflow will refocus your teams on optimizing conversions and ROI.\s*<\/p>/,
    `<h2 className="wfvwp-migration-card__title">How to move from fragmented HR ops to one governed system</h2>
                                <p className="wfvwp-migration-card__body-copy">
                                    Growing teams need to unplug from spreadsheet sprawl, chat-based approvals, missing document controls, and payroll bottlenecks that drain time and create compliance risk. Explore the system story to see why and how ERP-Lite reconnects records, workflows, and auditability so HR teams can refocus on operational clarity, decision speed, and control.
                                </p>`
);

// Chunk 4
content = content.replace(
    /<div aria-hidden=\"true\" className=\"wfvwp-migration-card__button-text\">Get the guide<\/div>\s*<a\s*className=\"wfvwp-migration-card__button-link\"\s*href=\"\/resources\/ebooks\/wordpress-webflow-migration\"\s*aria-label=\"Get the guide\"\s*\/>/,
    `<div aria-hidden="true" className="wfvwp-migration-card__button-text">Get the story</div>
                                <a
                                    className="wfvwp-migration-card__button-link"
                                    href="/resources/ebooks/wordpress-webflow-migration"
                                    aria-label="Get the story"
                                />`
);

// Chunk 5
content = content.replace(
    /<h2 className=\"wfvwp-customers__heading\">Customers love us<\/h2>\s*<p className=\"wfvwp-customers__summary\">\s*But don&apos;t just take our word for it — check out our latest G2 awards.\s*<\/p>/,
    `<h2 className="wfvwp-customers__heading">Teams trust ERP-Lite</h2>
                            <p className="wfvwp-customers__summary">
                                But don&apos;t take our word for it — see how teams rely on it in real operations.
                            </p>`
);

// Chunk 6
content = content.replace(
    /\{webflowVsWordpressCustomerBadges\.map\(badge => \(\s*<div key=\{badge\.imageAlt\} className=\"wfvwp-customers__badge-frame\">\s*<img\s*src=\{badge\.imageSrc\}\s*alt=\{badge\.imageAlt\}\s*loading=\"lazy\"\s*className=\"wfvwp-customers__badge-image\"\s*\/>\s*<\/div>\s*\)\)\}/,
    `{webflowVsWordpressCustomerBadges.map((badge, idx) => (
                                    <div key={idx} className="wfvwp-customers__badge-frame" style={{ padding: '1.5rem', textAlign: 'left', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.3 }}>{badge.title}</h3>
                                        <p style={{ fontSize: '0.875rem', color: '#a1a1aa', margin: 0 }}>{badge.description}</p>
                                    </div>
                                ))}`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Replacements applied');

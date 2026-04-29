const fs = require('fs');
const file = 'd:/OneDrive - 55phcx/port/portfolio codex/portfolio/components/HRDocsCaseStudy.tsx';
let content = fs.readFileSync(file, 'utf8');

// Chunk 1
content = content.replace(
    'type WebflowVsWordpressCustomerBadge = {\r\n    title: string;\r\n    description: string;\r\n};',
    'type WebflowVsWordpressCustomerBadge = {\r\n    imageSrc: string;\r\n    imageAlt: string;\r\n};'
).replace(
    'type WebflowVsWordpressCustomerBadge = {\n    title: string;\n    description: string;\n};',
    'type WebflowVsWordpressCustomerBadge = {\n    imageSrc: string;\n    imageAlt: string;\n};'
);

// Chunk 2
content = content.replace(
    /const webflowVsWordpressCustomerBadges: WebflowVsWordpressCustomerBadge\[\] = \[\s*\{\s*title: 'Used across HR operations',\s*description: 'Growing SMEs · Active deployment',\s*\},\s*\{\s*title: 'Trusted for payroll and compliance',\s*description: 'Validated workflows · Audit-ready systems',\s*\},\s*\{\s*title: 'Operational reliability proven',\s*description: 'Real-world usage · Consistent outcomes',\s*\}\s*,?\s*\];/,
    `const webflowVsWordpressCustomerBadges: WebflowVsWordpressCustomerBadge[] = [
    {
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/695d1a83f727ce7de53a4c8c_Enterprise%20Leader%20-%20Winter%202026%20G2.svg',
        imageAlt: 'G2 Enterprise Leader Winter 2026',
    },
    {
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/695d1aeb3253f22d5bbe6aab_g2-badge_overall-leader_winter-26.svg',
        imageAlt: 'G2 Overall Leader Winter 2026',
    },
    {
        imageSrc: 'https://cdn.prod.website-files.com/686294e263eb7e215bd232f7/695d1aeb1bdcf54c2ba09181_g2-badge_regional-leader_emea_winter-26.svg',
        imageAlt: 'G2 Regional Leader for EMEA Winter 2026',
    },
];`
);

// Chunk 3
content = content.replace(
    /\{webflowVsWordpressCustomerBadges\.map\(\(badge, idx\) => \(\s*<div key=\{idx\} className=\"wfvwp-customers__badge-frame\" style=\{\{ padding: '1\.5rem', textAlign: 'left', border: '1px solid rgba\(255,255,255,0\.1\)', borderRadius: '12px', background: 'rgba\(255,255,255,0\.03\)' \}\}>\s*<h3 style=\{\{ fontSize: '1\.125rem', fontWeight: 600, color: '#fff', marginBottom: '0\.5rem', lineHeight: 1\.3 \}\}>\{badge\.title\}<\/h3>\s*<p style=\{\{ fontSize: '0\.875rem', color: '#a1a1aa', margin: 0 \}\}>\{badge\.description\}<\/p>\s*<\/div>\s*\)\)\}/,
    `{webflowVsWordpressCustomerBadges.map(badge => (
                                    <div key={badge.imageAlt} className="wfvwp-customers__badge-frame">
                                        <img
                                            src={badge.imageSrc}
                                            alt={badge.imageAlt}
                                            loading="lazy"
                                            className="wfvwp-customers__badge-image"
                                        />
                                    </div>
                                ))}`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Undo replacements applied');

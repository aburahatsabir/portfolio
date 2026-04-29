const fs = require('fs');
const file = 'd:/OneDrive - 55phcx/port/portfolio codex/portfolio/components/HRDocsCaseStudy.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Business impact heading
content = content.replace(
    `<span className=\"wfvwp-business-impact__title-line\">See the business{' '}</span>\r\n                                <span className=\"wfvwp-business-impact__title-line\">impact of moving{' '}</span>\r\n                                <span className=\"wfvwp-business-impact__title-line\">to Webflow</span>`,
    `<span className="wfvwp-business-impact__title-line">See the operational</span>\r\n                                <span className="wfvwp-business-impact__title-line">impact of ERP-Lite</span>`
);

// 2. Business impact body copy
content = content.replace(
    `<span className=\"wfvwp-business-impact__copy-line\">\r\n                                    Use this calculator to estimate the impact of{' '}\r\n                                </span>\r\n                                <span className=\"wfvwp-business-impact__copy-line\">\r\n                                    Webflow&apos;s platform on your goals &mdash; backed{' '}\r\n                                </span>\r\n                                <span className=\"wfvwp-business-impact__copy-line\">\r\n                                    by real-world results.\r\n                                </span>`,
    `<span className="wfvwp-business-impact__copy-line">\r\n                                    The implementation transformed HR from an administrative bottleneck{' '}\r\n                                </span>\r\n                                <span className="wfvwp-business-impact__copy-line">\r\n                                    into an auditable, self-service operation, eliminating weeks{' '}\r\n                                </span>\r\n                                <span className="wfvwp-business-impact__copy-line">\r\n                                    of manual payroll processing.\r\n                                </span>`
);

// 3. Business impact button text
content = content.replace(
    `<div aria-hidden=\"true\" className=\"wfvwp-business-impact__button-text btn-text\">\r\n                                    Use the calculator\r\n                                </div>`,
    `<div aria-hidden="true" className="wfvwp-business-impact__button-text btn-text">\r\n                                    View how it works\r\n                                </div>`
);

// 4. Business impact button SR-only text
content = content.replace(
    `<span className=\"wfvwp-hero__sr-only\">Use the calculator</span>`,
    `<span className="wfvwp-hero__sr-only">View how it works</span>`
);

// 5. Add Attendance Tracking to G2 tabs (append before closing bracket)
content = content.replace(
    `    {\r\n        title: 'Document Control',\r\n        imageSrc: '/images/hr-docs/g2-audit-trail.webp',\r\n        imageAlt: 'HR Docs audit log demo showing immutable event history, actors, and record-level change traces.',\r\n    },\r\n];\r\n\r\nconst webflowVsWordpressFaqItems`,
    `    {\r\n        title: 'Document Control',\r\n        imageSrc: '/images/hr-docs/g2-audit-trail.webp',\r\n        imageAlt: 'HR Docs audit log demo showing immutable event history, actors, and record-level change traces.',\r\n    },\r\n    {\r\n        title: 'Attendance Tracking',\r\n        imageSrc: '/images/hr-docs/g2-document-control.webp',\r\n        imageAlt: 'HR Docs attendance module showing daily logs, anomaly flags, and correction workflows.',\r\n    },\r\n];\r\n\r\nconst webflowVsWordpressFaqItems`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Business impact and G2 tabs updated successfully!');

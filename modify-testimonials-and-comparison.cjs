const fs = require('fs');
const file = 'd:/OneDrive - 55phcx/port/portfolio codex/portfolio/components/HRDocsCaseStudy.tsx';
let content = fs.readFileSync(file, 'utf8');

// Chunk 1: Testimonials
content = content.replace(
    /const webflowVsWordpressTestimonials: WebflowVsWordpressTestimonial\[\] = \[\s*\{[\s\S]*?\},\s*\];/,
    `const webflowVsWordpressTestimonials: WebflowVsWordpressTestimonial[] = [
    {
        name: 'Managing Director',
        title: 'Executive Oversight',
        company: 'SME Leadership',
        quote: '\\u201CWe needed a single source of truth. Approvals were happening on WhatsApp and there was no way to trace them later. The lack of operational controls was creating real compliance risks.\\u201D',
        imageSrc: 'https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68921df8b7ed02975aa81f12_609b198fb3c3ab3989d51db6_elyssa-albert.jpeg',
        imageAlt: 'Managing Director',
        href: '#',
    },
    {
        name: 'Sr. HR Executive',
        title: 'HR & Payroll',
        company: 'Core Operations',
        quote: '\\u201CPayroll prep was a three-day ordeal of cross-referencing spreadsheets with leave balances and WhatsApp attendance drops. It was manually exhausting and prone to constant errors.\\u201D',
        imageSrc: 'https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68a49e6cc818ea3a30397ff2_WfS0vcSrwzZozkZeHQ8-2jJn48Cd_scrppPzRo8_Zcg.webp',
        imageAlt: 'Sr. HR Executive',
        href: '#',
    },
    {
        name: 'Operations Manager',
        title: 'Department Head',
        company: 'Team Leadership',
        quote: '\\u201CIt was impossible to pull cross-department reports. I couldn\\'t tell who was on leave without messaging HR directly. We needed self-service visibility, not just another spreadsheet.\\u201D',
        imageSrc: 'https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68921d7f25a16ed1eae3e911_66952004d3d1489d86a9e1d7_1662084310247.jpeg',
        imageAlt: 'Operations Manager',
        href: '#',
    },
    {
        name: 'Operations Employee',
        title: 'Team Member',
        company: 'Field Operations',
        quote: '\\u201CI just wanted to know my leave balance and get my payslip without having to email someone every month. Basic transparency was missing from our daily workflow.\\u201D',
        imageSrc: 'https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68921e413356a6d78eeadedc_1719321093068.jpeg',
        imageAlt: 'Operations Employee',
        href: '#',
    },
];`
);

// Chunk 2: Comparison Rows
content = content.replace(
    /const webflowVsWordpressComparisonRows: WebflowVsWordpressComparisonRow\[\] = \[\s*\{[\s\S]*?\}\s*\];/m,
    `const webflowVsWordpressComparisonRows: WebflowVsWordpressComparisonRow[] = [
    {
        feature: 'Document Compliance',
        wordpress: {
            icon: 'minus',
            detail: 'Stored in personal Google Drives. Renewals tracked by memory.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Central repository with simple reminder notifications.',
        },
        webflow: {
            icon: 'check',
            detail: 'Strict expiry tracking. Expired statuses automatically freeze associated operations.',
        },
    },
    {
        feature: 'Leave & Attendance',
        wordpress: {
            icon: 'minus',
            detail: 'WhatsApp requests compiled into a master spreadsheet.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Independent portal requiring manual export for payroll processing.',
        },
        webflow: {
            icon: 'check',
            detail: 'Integrated leave engine dynamically calculates accurate payroll inputs based on policies.',
        },
    },
    {
        feature: 'Approval Audits',
        wordpress: {
            icon: 'no',
            detail: '"Approved" text message from management. Zero traceability.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Simple state changes with basic timestamping.',
        },
        webflow: {
            icon: 'check',
            detail: 'Immutable audit log capturing actor, time, and exact record state for every decision.',
        },
    },
    {
        feature: 'System Access',
        wordpress: {
            icon: 'no',
            detail: 'Shared credentials leading to zero accountability.',
        },
        wordpressVip: {
            icon: 'minus',
            detail: 'Basic UI-level feature toggles.',
        },
        webflow: {
            icon: 'check',
            detail: 'Role-based access strictly enforced at the core API layer, preventing unauthorized bypasses.',
        },
    },
];`
);

// Chunk 3: Comparison Heading
content = content.replace(
    /<h2 className=\"wfvwp-compare__heading\">\s*How do WordPress, WordPress\s*<br className=\"wfvwp-compare__heading-break\" \/>\s*VIP, and Webflow compare\?\s*<\/h2>/,
    `<h2 className="wfvwp-compare__heading">
                            Before (Chaos) vs. After
                            <br className="wfvwp-compare__heading-break" />
                            (ERP-Lite)
                        </h2>`
);

// Chunk 4: Comparison Table Columns
content = content.replace(/<strong>Features<\/strong>/, '<strong>Workflow</strong>');
content = content.replace(/<strong>WordPress<\/strong>/, '<strong>Legacy Process</strong>');
content = content.replace(/<strong>WordPress VIP<\/strong>/, '<strong>Standard App</strong>');
content = content.replace(/<strong>Webflow<\/strong>/, '<strong>ERP-Lite</strong>');

fs.writeFileSync(file, content, 'utf8');
console.log('Replacements applied successfully!');

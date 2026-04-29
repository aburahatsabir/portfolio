const fs = require('fs');
const file = 'd:/OneDrive - 55phcx/port/portfolio codex/portfolio/components/HRDocsCaseStudy.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = 'const webflowVsWordpressComparisonRows: WebflowVsWordpressComparisonRow[] = [';
const endStr = '];\r\n\r\nconst webflowVsWordpressG2Tabs';
const altEndStr = '];\n\nconst webflowVsWordpressG2Tabs';

let startIndex = content.indexOf(startStr);
let endIndex = content.indexOf(endStr, startIndex);
if (endIndex === -1) {
    endIndex = content.indexOf(altEndStr, startIndex);
}

if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `const webflowVsWordpressComparisonRows: WebflowVsWordpressComparisonRow[] = [
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
    }`;
    
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed comparison rows successfully!');
} else {
    console.log('Failed to find start or end index.');
}

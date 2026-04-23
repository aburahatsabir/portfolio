import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HRDocsCaseStudy: React.FC = () => {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 1000], [0, 250]);

    const containerRef = useRef<HTMLDivElement>(null);

    const [activeWorkflow, setActiveWorkflow] = useState('leave');
    const [activeResearchPersona, setActiveResearchPersona] = useState(0);

    const hypothesisData = [
        {
            tag: 'Observation Â· Month 1',
            title: 'The spreadsheet was the symptom, not the system',
            quote: `"We knew the payroll was probably right. We just couldn't prove it from the data."`,
            body: "A 120-employee company running HR through twelve disconnected spreadsheets, WhatsApp threads, and personal Google Drive folders. The real problem wasn't the tools â€” it was that there was no data model. Attendance lived in chat screenshots. Approvals vanished with the person who sent them. Document versions were indistinguishable. The first insight: this wasn't a UI problem. It was a structural one.",
            pills: ['Root cause identified', 'No shared data model', 'Compliance blind spot']
        },
        {
            tag: 'Hypothesis Â· Month 2',
            title: 'Business rules encoded in the schema outlast any spreadsheet',
            body: "The core question: what are the actual entities in this business? Employee, Attendance, Leave, Payroll Run, Document, Approval â€” six entities, not twelve spreadsheets. Once you define what a 'Payroll Run' is (period, lock state, variance threshold, approval chain) and what a 'Document' is (owner, version, expiry, access role), all the chaos in WhatsApp threads resolves into proper workflow states. The hypothesis: model the controls correctly and most of the compliance risk disappears without building anything clever.",
            pills: ['6 core entities defined', 'Relationships mapped', 'Hypothesis formed']
        },
        {
            tag: 'Design decision Â· Month 2',
            title: 'Build the controls first. UI second.',
            body: 'Audit logs and period locking were architected before the first interface component was drawn. Three deliberate exclusions kept the scope clean: no recruitment module, no accounting integration, no benefits marketplace. Every design decision was tested against one constraint â€” can a compliance auditor reconstruct exactly what happened and who approved it? If yes, ship. If no, redesign.',
            pills: ['Audit-first architecture', 'Period locking', 'Deliberate exclusions']
        },
        {
            tag: 'Validation Â· Month 3',
            title: 'Payroll cycle dropped from 3 days to 2 hours.',
            body: "The clearest validation was time. Before: a payroll computation spread across 12 spreadsheets took three working days. After: the structured payroll engine â€” pulling directly from the attendance module â€” produced the same output in under two hours, with an automatic variance alert if any department's figure deviated more than 15% from the prior period. The variance guard alone caught two data-entry errors in the first run.",
            pills: ['3 days â†’ 2 hours', 'Variance guard live', '2 errors caught on first run']
        },
        {
            tag: 'Surprise finding Â· Month 4',
            title: 'The audit log became the most-used feature.',
            body: "The audit log was built for compliance. What wasn't expected was how often HR used it for internal disputes. When an employee challenged their leave balance or a manager denied approving something they had approved, the append-only log ended the conversation in seconds. A feature built to satisfy auditors became the system's most trusted source of truth for everyday operations.",
            pills: ['Unexpected use case', 'Dispute resolution', 'Trust signal for staff']
        }
    ];

    const workflowWalkthroughs = [
        {
            id: 'leave',
            tab: 'Leave Request',
            title: 'Leave Request — Complete State Machine',
            steps: [
                {
                    type: 'state',
                    label: 'DRAFT',
                    tone: 'draft',
                    detail: 'Employee creates. Balance checked. Date overlap validated against locked periods.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Employee submits — system validates balance and period availability'
                },
                {
                    type: 'state',
                    label: 'SUBMITTED',
                    tone: 'pending',
                    detail: 'Enters workflow queue. Tier 1 (Team Lead) notified. 48-hour SLA countdown starts.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Team Lead acts — OR 48h passes → auto-escalates'
                },
                {
                    type: 'state',
                    label: 'UNDER REVIEW',
                    tone: 'review',
                    detail: 'Tier 2 (HR Manager) review. Validates policy eligibility and team coverage.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Approved → balance deducted, payroll notified | Rejected → reason mandatory'
                },
                {
                    type: 'state',
                    label: 'APPROVED',
                    tone: 'approved',
                    detail: 'Balance updated. Calendar flagged. Payroll engine notified for period impact.'
                },
                {
                    type: 'state',
                    label: 'REJECTED',
                    tone: 'rejected',
                    detail: 'Reason recorded immutably. Balance unchanged. Employee notified. Resubmission allowed.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Approved leave → applied in next payroll run'
                },
                {
                    type: 'state',
                    label: 'IN PAYROLL',
                    tone: 'locked',
                    detail: 'Leave days reflected in payroll computation. Unpaid leave creates deduction entry.'
                }
            ],
            rules: [
                {
                    tone: 'good',
                    typeLabel: 'Auto-Approve Rule',
                    title: 'Casual ≤1 day + prior month attendance ≥95%',
                    body: 'Bypasses Team Lead tier. Routes direct to HR stamp. Full audit entry still written — the shortcut is operational, not a compliance bypass.'
                },
                {
                    tone: 'alert',
                    typeLabel: 'Escalation Rule',
                    title: '48-hour inaction triggers automatic escalation',
                    body: 'The original approver receives a missed-action notification. Request routes to the next tier. This eliminates the "lost in inbox" failure structurally — not by policy, by system design.'
                },
                {
                    tone: 'risk',
                    typeLabel: 'Conflict Detection',
                    title: 'Submission blocked if preconditions fail',
                    body: 'Three hard blocks: insufficient balance, overlap with locked payroll period, leave type ineligible for contract type. These are not warnings — submission is structurally impossible when any condition fails.'
                },
                {
                    tone: 'good',
                    typeLabel: 'Payroll Integration',
                    title: 'Approval writes directly to payroll engine',
                    body: 'HR Manager never manually communicates leave status to payroll. The approved leave event triggers a payroll input flag automatically. The payroll run reads this flag during computation.'
                }
            ]
        },
        {
            id: 'payroll',
            tab: 'Payroll Run',
            title: 'Payroll Run — Complete State Machine',
            steps: [
                {
                    type: 'state',
                    label: 'INITIATED',
                    tone: 'draft',
                    detail: 'HR starts run. System validates: attendance finalized, no open leave, prior period locked.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Validation passes — computation begins per employee'
                },
                {
                    type: 'state',
                    label: 'COMPUTING',
                    tone: 'pending',
                    detail: 'Gross = base + overtime + allowances. Deductions = tax + PF + unpaid leave + penalties. Net computed.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Computation complete — variance check runs (>15% flags records)'
                },
                {
                    type: 'state',
                    label: 'PENDING APPROVAL',
                    tone: 'review',
                    detail: 'HR reviews totals. Flagged variances require Finance clearance before MD approval.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ HR clears flags → MD sign-off requested'
                },
                {
                    type: 'state',
                    label: 'APPROVED',
                    tone: 'approved',
                    detail: 'MD approves. Payslips generated per employee with entity branding.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ MD approval → period permanently locked'
                },
                {
                    type: 'state',
                    label: 'LOCKED',
                    tone: 'locked',
                    detail: 'Period locked at DB level. No edits possible. Post-lock corrections create Adjustment entries only.'
                }
            ],
            rules: [
                {
                    tone: 'risk',
                    typeLabel: 'Variance Alert — Mandatory',
                    title: '>15% net pay deviation vs prior month blocks progression',
                    body: 'Finance review is not optional. Run cannot proceed to MD while flagged records are uncleared. Catches errors without blocking legitimate changes (new hires, revisions).'
                },
                {
                    tone: 'risk',
                    typeLabel: 'Period Lock — Permanent',
                    title: 'Locked period cannot be modified — only adjustment entries',
                    body: 'Post-lock corrections create a new Adjustment PayrollEntry referencing the original run. The error cannot be silently fixed. Both the error and the correction are permanently in the audit log.'
                },
                {
                    tone: 'alert',
                    typeLabel: 'Exception: Expired Document',
                    title: 'Expired ID document blocks payslip release for that employee',
                    body: "Payroll run continues for all other employees. The specific employee's payslip is held in PENDING state until the document exception is resolved. This prevents one bad record from delaying the entire payroll cycle."
                }
            ]
        },
        {
            id: 'doc',
            tab: 'Document Control',
            title: 'Document — Complete Lifecycle State Machine',
            steps: [
                {
                    type: 'state',
                    label: 'DRAFT',
                    tone: 'draft',
                    detail: 'HR creates from template or blank. Version 1. Employee linked. Type defined.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ HR submits for MD sign-off — version number locked'
                },
                {
                    type: 'state',
                    label: 'PENDING SIGN-OFF',
                    tone: 'review',
                    detail: 'MD reviews. Revisions increment version. Every version preserved — no overwrite.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ MD signs → document issued'
                },
                {
                    type: 'state',
                    label: 'ISSUED',
                    tone: 'issued',
                    detail: 'Available in employee self-service. Physical copy tracked in custody register.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Employee signs / acknowledges'
                },
                {
                    type: 'state',
                    label: 'SIGNED',
                    tone: 'approved',
                    detail: 'Acknowledgement recorded with timestamp. Document legally executed.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ On expiry date → status automatically transitions'
                },
                {
                    type: 'state',
                    label: 'EXPIRED',
                    tone: 'expired',
                    detail: 'Alert generated. Renewal workflow triggered. Prior signed version preserved in archive.'
                },
                {
                    type: 'state',
                    label: 'ARCHIVED',
                    tone: 'archived',
                    detail: 'Still retrievable. Still attached to employee record. Never deleted. 5-year minimum retention.'
                }
            ],
            rules: [
                {
                    tone: 'good',
                    typeLabel: 'Version Control',
                    title: 'Every save is a new version — no overwrite',
                    body: '"FINAL_v3_ACTUAL.docx" is structurally impossible. The system never allows overwrite. Prior versions are always accessible with their author and timestamp.'
                },
                {
                    tone: 'risk',
                    typeLabel: 'Expiry Blocking',
                    title: 'Expired ID document blocks payslip release',
                    body: 'Document expiry is not cosmetic. An employee with an expired mandatory document has their payslip held in PENDING state until resolution. The block is enforced at payroll run time.'
                },
                {
                    tone: 'risk',
                    typeLabel: 'Exit Clearance',
                    title: 'Employee cannot exit with documents in Issued status',
                    body: 'Exit clearance checklist is system-generated. Every document in Issued status appears automatically. Completion of exit is blocked until all items are returned or marked as waived with a reason.'
                }
            ]
        },
        {
            id: 'att',
            tab: 'Attendance Exception',
            title: 'Attendance Exception — State Machine',
            steps: [
                {
                    type: 'state',
                    label: 'OPEN',
                    tone: 'exception',
                    detail: 'System auto-creates exception for missed punch, late beyond threshold, or invalid span.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Employee submits correction reason (or Team Lead initiates)'
                },
                {
                    type: 'state',
                    label: 'SUBMITTED',
                    tone: 'pending',
                    detail: 'Correction reason attached. Team Lead and HR notified for review.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ Team Lead reviews correction reason'
                },
                {
                    type: 'state',
                    label: 'REVIEWED',
                    tone: 'review',
                    detail: 'Team Lead recommends approval or rejection with comments.'
                },
                {
                    type: 'arrow',
                    label: '',
                    tone: 'arrow',
                    detail: '↓ HR finalizes — attendance status updates, payroll impact recalculates'
                },
                {
                    type: 'state',
                    label: 'RESOLVED',
                    tone: 'approved',
                    detail: 'Corrected attendance record created. Original exception preserved. Payroll impact updated if period open.'
                },
                {
                    type: 'state',
                    label: 'REJECTED',
                    tone: 'rejected',
                    detail: 'Original anomalous record stands. Absent/unpaid treatment applied. Audit entry written.'
                }
            ],
            rules: [
                {
                    tone: 'alert',
                    typeLabel: 'Auto-Exception Creation',
                    title: 'System creates exceptions automatically — no manual reporting',
                    body: 'Missed clock-out, late arrival beyond threshold, and negative/invalid time spans create AttendanceException records automatically at end of shift. No HR manual intervention required to catch anomalies.'
                },
                {
                    tone: 'risk',
                    typeLabel: 'Payroll Impact Rule',
                    title: 'Unresolved exception = absent treatment in payroll',
                    body: 'If an exception is still OPEN when the payroll period closes, the system treats that day as absent. The correction process must happen before the payroll period locks. This creates urgency without requiring manual tracking.'
                }
            ]
        }
    ];

    const complianceDesignCards = [
        {
            icon: '📋',
            title: 'Record Keeping',
            checks: [
                'Service records retained 5+ years post-exit — soft-delete only, no physical removal ever at any role level',
                'NID, DOB, blood group stored as verified fields — edits require HR Manager role and auto-write immutable audit entry',
                'Every salary revision records: effective date, prior amount, new amount, approved-by, and reason — full trail for any inspection',
                'Employment type tracked explicitly: Permanent / Probation / MTO / Contractual — each triggers different entitlement calculation rules'
            ]
        },
        {
            icon: '⚖️',
            title: 'Payroll & Leave Compliance',
            checks: [
                'Annual leave entitlement encoded per employment type and location — factory vs commercial rates applied at computation time',
                'Payroll period locking: locked months cannot be edited by anyone — corrections create adjustment entries with full approval chain',
                'Post-lock adjustments reference original run ID, reason, and actor — the error and correction both permanently in audit log',
                'Leave balance deducted only on approval, not on submission — pending requests do not prematurely reduce available balance'
            ]
        },
        {
            icon: '🔒',
            title: 'Data Protection',
            checks: [
                'NID, personal mobile, bank details masked in list views — full values only visible to HR Manager and above at API query level',
                'Photo and personal email optional with explicit consent flag — system enforces consent is set before data can be stored',
                'Data export requires HR Manager minimum — export events logged with actor, timestamp, data scope, and format',
                'Session tokens carry role claims — role checked at API query level, not at UI rendering level'
            ]
        },
        {
            icon: '🕵️',
            title: 'Audit Trail Architecture',
            checks: [
                'Every write operation writes to audit_log before main transaction commits — if audit write fails, main write rolls back atomically',
                'Full before/after state stored as JSONB — not just "field X changed" but complete record snapshot at that moment in time',
                'Append-only at database level — no UPDATE or DELETE permission on audit_log table, including for Super Admin role',
                'Audit entries exportable as structured CSV for labor authority submission — filterable by date, actor, entity, and event type'
            ]
        }
    ];

    const auditLogEntries = [
        {
            timestamp: '2025-11-01 09:02',
            event: 'PAYROLL_LOCK',
            tone: 'lock',
            actor: 'N. Sultana · HR',
            change: 'Nov 2025 · 15 employees · Gross BDT 1,104,800 · Period locked pending MD approval'
        },
        {
            timestamp: '2025-10-30 14:33',
            event: 'LEAVE_APPROVED',
            tone: 'approve',
            actor: 'M.I. Serwany',
            change: 'LR-089 · T.J. Parvez · Sick leave 3 days · Balance 8→5 · Payroll flag written'
        },
        {
            timestamp: '2025-10-28 11:15',
            event: 'SALARY_UPDATED',
            tone: 'update',
            actor: 'N. Sultana · HR',
            change: 'EMP-047 · gross_salary 8,000→12,000 BDT · Reason: post-probation · Effective Nov 2025'
        },
        {
            timestamp: '2025-10-15 08:55',
            event: 'EMP_CREATED',
            tone: 'create',
            actor: 'N. Sultana · HR',
            change: 'EMP-047 · A.J. Yeana · Entity: Operations · Type: MTO · Dept: People & HR'
        },
        {
            timestamp: '2025-10-10 10:22',
            event: 'DOC_EXPIRED',
            tone: 'expire',
            actor: 'System',
            change: 'DOC-031 · Sabbir Hassan · ID Document expired · Payslip hold flag activated · Renewal alert sent'
        },
        {
            timestamp: '2025-10-01 14:40',
            event: 'PAYROLL_LOCKED',
            tone: 'lock',
            actor: 'Tanvir Morshed · MD',
            change: 'Oct 2025 · 13 employees · Gross BDT 1,067,480 · MD signed off · Period permanently locked'
        }
    ];

    const problemStatementCards = [
        {
            label: 'PAIN — 01',
            title: 'Payroll preparation was a 3-day manual ordeal',
            desc: 'Twelve disconnected spreadsheets, each with different formula logic, maintained by different people. Cross-validating attendance with payroll required reading WhatsApp conversation history. A single mid-month salary change required manual updates across multiple files with no confirmation it was complete.',
            tag: '3 days \u2192 72 staff-hours lost monthly'
        },
        {
            label: 'PAIN — 02',
            title: 'Attendance lived in a WhatsApp group — unverifiable',
            desc: 'Daily attendance submitted as text messages. No timestamp integrity, no verification mechanism, no way to detect missed punches or late arrivals systematically. Leave balances were approximated from memory. A dispute about attendance three weeks ago was structurally impossible to resolve.',
            tag: 'Leave disputes unresolvable in ~40% of cases'
        },
        {
            label: 'PAIN — 03',
            title: 'HR documents stored in personal accounts',
            desc: 'Employment contracts, offer letters, and NID copies lived in personal Google Drive folders — not company-owned. When two employees left within three months, their contract files left with them. No version tracking. The "latest" file was whatever had most recently been renamed "FINAL." A compliance audit would have been a catastrophe.',
            tag: 'Doc recovery rate post-exit \u2192 ~60%'
        },
        {
            label: 'PAIN — 04',
            title: 'Approval decisions made on WhatsApp — no record',
            desc: 'Leave approvals, salary revisions, document issuances — all communicated via chat message. No formal record, no timestamp integrity, no way to reconstruct the decision chain six months later. The system literally could not answer: who approved this, when, and under what conditions?',
            tag: 'Approval audit trail recoverable \u2192 0%'
        },
        {
            label: 'PAIN — 05',
            title: 'Cross-department reporting was structurally impossible',
            desc: "Getting total headcount, payroll cost, or leave utilization across departments meant manually aggregating files with inconsistent structures. This report was never produced. Leadership made staffing decisions with no data. Finance couldn't predict monthly payroll cost with any precision.",
            tag: 'Consolidated HR report \u2192 never produced'
        },
        {
            label: 'PAIN — 06',
            title: 'Equipment custody invisible — no exit clearance',
            desc: 'Laptops, SIM cards, and mobile phones issued to employees and then forgotten. No custody register, no return workflow, no exit clearance checklist. Devices discovered missing only at the next procurement cycle. No mechanism for enforcing document or asset return on departure.',
            tag: 'Asset recovery rate on exit \u2192 below 70%'
        }
    ];

    const preSystemInfrastructure = [
        { label: '\u00D7 12 Google Sheets', tone: 'risk' },
        { label: '\u00D7 3 WhatsApp Groups', tone: 'risk' },
        { label: '\u00D7 4 Personal Drives', tone: 'risk' },
        { label: '0 Approval Records', tone: 'risk' },
        { label: '0 Audit Trail', tone: 'risk' },
        { label: 'Paper NID Copies', tone: 'warn' },
        { label: 'Email Thread Approvals', tone: 'warn' },
        { label: 'Unversioned Contracts', tone: 'warn' },
        { label: 'No Leave Balances', tone: 'warn' },
        { label: 'Memory-based Decisions', tone: 'neutral' },
        { label: 'No Cross-dept View', tone: 'neutral' },
        { label: 'No Exit Clearance', tone: 'neutral' }
    ];

    const researchPersonas = [
        {
            tabRole: 'Executive Leadership',
            tabName: 'Managing Director',
            tabDept: 'Strategic oversight · All departments',
            role: 'Executive Leadership · Strategic Oversight',
            name: 'Managing Director',
            meta: '8 years tenure · Final approver · Cross-department visibility',
            quote: `"I need total payroll cost across all departments in one view — not four files I have to add up. And when I ask how a decision was made, I should get a timestamped record, not a WhatsApp screenshot."`,
            needs: [
                'Consolidated cross-department analytics — headcount, payroll cost, leave utilization in one dashboard',
                'Final approval authority embedded in workflow chain — no parallel approval tracks',
                'Complete audit trail — every decision reconstructable with actor, timestamp, rationale'
            ]
        },
        {
            tabRole: 'HR Operations',
            tabName: 'Sr. HR Executive',
            tabDept: 'People ops · Payroll prep',
            role: 'HR Operations · Head Office',
            name: 'Sr. HR Executive',
            meta: 'Manages records, payroll prep, documentation for all staff',
            quote: `"Payroll takes three full days — opening twelve sheets, reading WhatsApp history for attendance, manually calculating deductions for each person. Every month. One missed punch can break the whole calculation chain."`,
            needs: [
                'Automated payroll run — system computes from attendance and contracts, HR reviews and approves',
                'Leave request management with real-time balance tracking — no memory-based decisions',
                'Document creation with versioning — generate letters from templates, track issuance and signatures'
            ]
        },
        {
            tabRole: 'Department Manager',
            tabName: 'Operations Manager',
            tabDept: 'Team management · 12 reports',
            role: 'Department Manager · Operations',
            name: 'Operations Manager',
            meta: '12 direct reports · Responsible for team attendance and leave decisions',
            quote: `"Someone requests leave on WhatsApp, I reply 'ok', and then nothing happens — HR doesn't know, payroll doesn't know. Three weeks later HR asks me and I've forgotten the conversation."`,
            needs: [
                'Team-scoped view — attendance and leave for my direct reports only',
                'In-app approval with automatic cascade to HR and payroll — no manual communication',
                'Mobile-ready — approve requests from phone, no desktop or special software needed'
            ]
        },
        {
            tabRole: 'Field / Factory Staff',
            tabName: 'Operations Employee',
            tabDept: 'Frontline · Mobile-primary user',
            role: 'Field Operations · Factory & Delivery',
            name: 'Operations Employee',
            meta: 'Permanent · Factory or field location · Smartphone-primary',
            quote: `"I don't know how many leave days I have left. My manager guesses. I find out leave was unpaid only when I see the payslip — nobody told me before. I don't even know what the deductions mean."`,
            needs: [
                'Self-service leave balance — real-time balance per leave type without asking anyone',
                'Itemized payslip with every line explained — understand every deduction before it happens',
                'Browser-based on any smartphone — no app install, fast on slow mobile connections'
            ]
        }
    ];

    const researchFindings = [
        {
            number: '01',
            title: 'Single source of truth was the unanimous demand',
            body: 'Every role cited data fragmentation as their primary pain. The architecture principle — one canonical employee record that all modules derive from — came directly from this convergence. No module was designed until the entity relationships were locked.'
        },
        {
            number: '02',
            title: 'Compliance controls were the actual business case',
            body: 'Leadership agreed to fund the system after calculating payroll ROI. But the compliance architecture — audit log, period locking, document versioning — was cited as the reason they would trust the system. Controls are not features; they are the foundation of credibility.'
        },
        {
            number: '03',
            title: 'Mobile-first was a structural requirement, not a preference',
            body: '40% of the workforce uses smartphones exclusively. A system requiring desktop access fails before deployment for nearly half its users. The progressive web architecture and mobile layout were specified before any screen was designed.'
        }
    ];
    const strategyCards = [
        {
            number: '1',
            title: 'Why "Lite" — Deliberate Exclusions',
            body: 'ERP-Lite v1 excludes recruitment/ATS, full accounting ledger, benefits marketplace, multi-country tax engine, and drag-and-drop workflow builder. These are excluded not because they are unimportant, but because including them would require enterprise infrastructure to operate and would dilute the credibility of the core operations system.',
            note: '→ The scope boundary creates the value proposition. "Lite but complete" beats "everything but unreliable."'
        },
        {
            number: '2',
            title: 'Why 8 Modules — Connected, Not Isolated',
            body: 'The 8 modules were selected because they form a complete operations loop: Employee Records feed Attendance and Leave; Attendance and Leave feed Payroll; Payroll and Documents feed Approval Workflows; Approvals and all state changes feed the Audit Log; the Audit Log feeds Analytics. Removing any module breaks the loop.',
            note: '→ Module selection was determined by data dependencies, not by feature checklists.'
        },
        {
            number: '3',
            title: 'Why Controls Were Designed First',
            body: `The audit log, soft-delete policy, payroll period locking, and approval workflow architecture were specified before any UI was designed. This is not standard product development practice — it reflects a deliberate choice that a system handling people's money and employment records must be trustworthy before it is convenient.`,
            note: '→ Compliance infrastructure is not overhead. It is the reason stakeholders will trust the system with real data.'
        },
        {
            number: '4',
            title: 'Why Role-Based Access at API Level',
            body: 'Access control enforced at UI level is cosmetic — a hidden button can be revealed with developer tools. ERP-Lite enforces access at the API query level: an Employee role session requesting the payroll endpoint receives a 403, not empty data. The salary figure never travels across the network to an unauthorized session.',
            note: '→ The distinction between UI-level and API-level access control is the difference between appearance and security.'
        }
    ];

    const moduleArchitectureCards = [
        {
            number: 'MOD-01',
            icon: '👤',
            title: 'Employee Records',
            desc: 'Canonical profile, contract, reporting line, status history, equipment custody, linked documents. Source of truth for all modules.',
            badge: 'Core',
            tone: 'core'
        },
        {
            number: 'MOD-02',
            icon: '📆',
            title: 'Attendance & Time',
            desc: 'Clock-in/out logs, shift assignment, anomaly detection (missed punch, late, overtime), manual correction requests with approval flow.',
            badge: 'Core',
            tone: 'core'
        },
        {
            number: 'MOD-03',
            icon: '🏖️',
            title: 'Leave & Absence',
            desc: 'Multi-type leave with real-time balance tracking, request lifecycle, overlap detection, payroll impact flag on approval.',
            badge: 'Core',
            tone: 'core'
        },
        {
            number: 'MOD-04',
            icon: '💰',
            title: 'Payroll Engine',
            desc: 'Pay-period batch computation, earnings + deductions pipeline, period locking, payslip generation, post-lock adjustment entries only.',
            badge: 'Core',
            tone: 'core'
        },
        {
            number: 'MOD-05',
            icon: '📄',
            title: 'Documentation',
            desc: 'Versioned document library, status pipeline (Draft→Issued→Signed→Archived), expiry alerts, acknowledgement tracking, custody register.',
            badge: 'Control',
            tone: 'control'
        },
        {
            number: 'MOD-06',
            icon: '✅',
            title: 'Approval Workflows',
            desc: 'Sequential approval steps with 48h escalation, rejection with mandatory reason, reassignment, full step-by-step decision history per request.',
            badge: 'Control',
            tone: 'control'
        },
        {
            number: 'MOD-07',
            icon: '📊',
            title: 'Analytics & Reporting',
            desc: 'Headcount, payroll cost by department, leave utilization, attendance compliance rate, document expiry risk, pending approval SLA count.',
            badge: 'Insight',
            tone: 'insight'
        },
        {
            number: 'MOD-08',
            icon: '🔍',
            title: 'Audit Log',
            desc: 'Immutable append-only event stream. Who changed what, to which record, with full before/after state as JSONB. Filterable, exportable.',
            badge: 'Control',
            tone: 'control'
        }
    ];

    const moduleConnections = [
        { label: 'Employee Records', active: true },
        { label: 'Attendance & Leave', active: false },
        { label: 'Document Vault', active: false },
        { label: 'Payroll Inputs', active: true },
        { label: 'Compliance Checks', active: false },
        { label: 'Payroll Run', active: true },
        { label: 'Payslips & Reports', active: false },
        { label: 'Audit Log', active: true }
    ];

    const liveSystemScenarios = [
        {
            label: 'Guided Scenario 1',
            name: 'Leave Approval Workflow',
            desc: 'Switch to Employee → submit leave → switch to Team Lead → approve it'
        },
        {
            label: 'Guided Scenario 2',
            name: 'Run Payroll for November',
            desc: 'Switch to HR Manager → go to Payroll → run the computation sequence'
        },
        {
            label: 'Guided Scenario 3',
            name: 'Document Expiry Review',
            desc: 'Switch to HR Manager → go to Documentation → review 3 expiring documents'
        }
    ];

    const activeWorkflowData =
        workflowWalkthroughs.find((workflow) => workflow.id === activeWorkflow) ?? workflowWalkthroughs[0];

    const dataFlowRows = [
        {
            layer: 'Input',
            cells: [
                {
                    title: 'Onboarding Data',
                    body: 'Name, NID, DOB, contract type, salary grade, department, reporting line, blood group, emergency contact',
                    tone: 'brand'
                },
                {
                    title: 'Daily Clock Record',
                    body: 'Timestamp, location flag, shift assignment, manager verify trigger'
                },
                {
                    title: 'Leave Request',
                    body: 'Employee ID, type, date range, reason, day count'
                },
                {
                    title: 'Period Definition',
                    body: 'Month, entity, run type — full or corrective'
                }
            ]
        },
        {
            layer: 'Compute',
            cells: [
                {
                    title: 'Record Validation',
                    body: 'NID uniqueness, department FK valid, reporting chain exists, employment type recognized'
                },
                {
                    title: 'Hours Calculation',
                    body: 'worked_hours = clock_out − clock_in. Anomaly flags: late, missed punch, overtime, negative span'
                },
                {
                    title: 'Balance Check',
                    body: 'Requested ≤ available? Overlaps locked period? Leave type eligible for contract?'
                },
                {
                    title: 'Deduction Pipeline',
                    body: 'gross = base + OT + allowances. deductions = tax + PF + unpaid_leave + penalties. net = gross − deductions',
                    tone: 'warn'
                }
            ]
        },
        {
            layer: 'Output',
            cells: [
                {
                    title: 'Employee Profile',
                    body: 'Fed to all modules via FK. Document templates, payslip headers, org chart, approval chains'
                },
                {
                    title: 'Attendance Score',
                    body: 'compliance_rate = present_days ÷ working_days. Monthly summary for HR. Anomaly list flagged.'
                },
                {
                    title: 'Payroll Input Flag',
                    body: 'Approved leave → payroll engine notified. Unpaid leave → deduction entry created automatically.'
                },
                {
                    title: 'Locked Payslip',
                    body: 'Itemized PDF per employee. Period locked. Run entry written to audit log. Finance notified.'
                }
            ]
        }
    ];

    const schemaEntities = [
        {
            name: 'employees',
            tone: 'core',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['employee_code', 'varchar'],
                ['department_id', 'uuid FK', 'fk'],
                ['employment_type', 'enum'],
                ['gross_salary', 'decimal'],
                ['status', 'enum']
            ]
        },
        {
            name: 'attendance_records',
            tone: 'core',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['employee_id', 'uuid FK', 'fk'],
                ['date', 'date'],
                ['status', 'enum'],
                ['late_minutes', 'integer']
            ]
        },
        {
            name: 'leave_requests',
            tone: 'core',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['employee_id', 'uuid FK', 'fk'],
                ['leave_type', 'enum'],
                ['status', 'enum'],
                ['approved_by', 'uuid FK', 'fk'],
                ['days_count', 'decimal']
            ]
        },
        {
            name: 'payroll_runs',
            tone: 'reference',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['period_month', 'date'],
                ['is_locked', 'boolean'],
                ['total_gross', 'decimal'],
                ['approved_by', 'uuid FK', 'fk']
            ]
        },
        {
            name: 'audit_log',
            tone: 'control',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['actor_id', 'uuid FK', 'fk'],
                ['event_type', 'enum'],
                ['before_state', 'jsonb'],
                ['after_state', 'jsonb']
            ]
        },
        {
            name: 'documents',
            tone: 'control',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['employee_id', 'uuid FK', 'fk'],
                ['doc_type', 'enum'],
                ['status', 'enum'],
                ['expiry_date', 'date']
            ]
        },
        {
            name: 'departments',
            tone: 'reference',
            fields: [
                ['id', 'uuid PK', 'pk'],
                ['name', 'varchar'],
                ['head_id', 'uuid FK', 'fk'],
                ['cost_center', 'varchar']
            ]
        }
    ];

    const results = [
        {
            value: '92%',
            unit: 'Payroll Processing Reduction',
            note: '3-day cycle â†’ 2-hour structured run'
        },
        {
            value: '0',
            unit: 'Compliance Blind Spots',
            note: 'Append-only log covers every state transition'
        },
        {
            value: '8',
            unit: 'Integrated Modules',
            note: 'Records, Attendance, Leave, Payroll, Docs, Approvals, Analytics, Audit'
        },
        {
            value: '4s',
            unit: 'Document Retrieval',
            note: 'Previously 15+ minutes per request'
        }
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = Array.from(container.querySelectorAll<HTMLElement>('.fade'));

        const hide = (el: HTMLElement) => {
            el.style.setProperty('opacity', '0', 'important');
            el.style.setProperty('transform', 'translateY(28px)', 'important');
            el.style.setProperty('transition', 'opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)', 'important');
            el.style.setProperty('will-change', 'opacity, transform', 'important');
            if (el.classList.contains('d1')) el.style.setProperty('transition-delay', '0.12s', 'important');
            else if (el.classList.contains('d2')) el.style.setProperty('transition-delay', '0.24s', 'important');
            else if (el.classList.contains('d3')) el.style.setProperty('transition-delay', '0.36s', 'important');
            else if (el.classList.contains('d4')) el.style.setProperty('transition-delay', '0.48s', 'important');
        };
        const reveal = (el: HTMLElement) => {
            el.style.setProperty('opacity', '1', 'important');
            el.style.setProperty('transform', 'none', 'important');
            el.classList.add('in');
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;
                    reveal(target);

                    target.querySelectorAll('.metric-ring-fill').forEach(ring => {
                        const val = ring.getAttribute('data-val');
                        if (val) (ring as HTMLElement).style.strokeDasharray = `${val} 314`;
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        elements.forEach(el => observer.observe(el));

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                elements.forEach(el => {
                    if (!el.classList.contains('in')) {
                        hide(el);
                    }
                });
            });
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="fmcg-case-study" ref={containerRef}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;700&display=swap');

                .fmcg-case-study {
                    --brand:#4F46E5;--brand-hover:#4338CA;--brand-light:#EEF2FF;--brand-border:#C7D2FE;
                    --w:#FFFFFF;--off:#F8FAFC;--off2:#F1F5F9;
                    --ink:#0F172A;--ink2:#1E293B;--ink3:#64748B;--ink4:#94A3B8;
                    --ln:#E2E8F0;--ln2:#CBD5E1;
                    --gm:#059669;--gbg:#ECFDF5;--gdk:#065F46;
                    --rm:#DC2626;--rbg:#FEF2F2;
                    --am:#D97706;--abg:#FFFBEB;
                    --bm:#2563EB;--bbg:#EFF6FF;
                    --serif:'Plus Jakarta Sans',system-ui,sans-serif;
                    --sans:'Plus Jakarta Sans',system-ui,sans-serif;
                    --mono:'JetBrains Mono',monospace;
                    
                    font-family: var(--sans);
                    background: var(--w);
                    color: var(--ink);
                    -webkit-font-smoothing: antialiased;
                }
                
                .fmcg-case-study h1 {
                    font-family: var(--sans);
                    font-size: clamp(42px, 5vw, 76px);
                    line-height: 1.05;
                    letter-spacing: -0.04em;
                    color: var(--ink);
                    margin-bottom: 24px;
                    font-weight: 800;
                }
                .fmcg-case-study h1 em {
                    font-style: italic;
                    color: var(--ink4);
                    font-weight: 600;
                }
                .fmcg-case-study .lead {
                    font-size: 17px;
                    color: var(--ink2);
                    line-height: 1.82;
                    font-weight: 300;
                    margin-top: 0;
                    max-width: 540px;
                    margin-bottom: 40px;
                }
                
                .fmcg-case-study #hero {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    padding: 120px 0 80px;
                    position: relative;
                    overflow: hidden;
                }
                .fmcg-case-study .hero-grid {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(var(--ln) 1px, transparent 1px), linear-gradient(90deg, var(--ln) 1px, transparent 1px);
                    background-size: 64px 64px;
                    opacity: .4;
                    pointer-events: none;
                    mask-image: radial-gradient(circle at 75% 50%, rgba(0,0,0,0.6) 0%, transparent 50%);
                    -webkit-mask-image: radial-gradient(circle at 75% 50%, rgba(0,0,0,0.6) 0%, transparent 50%);
                }
                .fmcg-case-study .hero-inner {
                    display: grid;
                    grid-template-columns: 1.15fr 0.85fr;
                    gap: 60px;
                    align-items: center;
                    position: relative;
                    z-index: 1;
                }
                .fmcg-case-study .hero-meta {
                    display: grid;
                    grid-template-columns: repeat(4, auto);
                    gap: 0;
                    border-top: 1px solid var(--ln);
                    padding-top: 40px;
                    margin-top: 0;
                    width: fit-content;
                }
                .fmcg-case-study .hm {
                    padding: 0 40px 0 0;
                    border-right: 1px solid var(--ln);
                    margin-right: 40px;
                }
                .fmcg-case-study .hm:last-child {
                    border-right: none;
                    margin-right: 0;
                    padding-right: 0;
                }
                .fmcg-case-study .hm-label {
                    font-family: var(--mono);
                    font-size: 10px;
                    color: var(--ink4);
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }
                .fmcg-case-study .hm-val {
                    font-size: 14px;
                    color: var(--ink2);
                    font-weight: 400;
                }
                
                .fmcg-case-study section { padding: 100px 0; }
                .fmcg-case-study section.alt { background: var(--off); border-top: 1px solid var(--ln); border-bottom: 1px solid var(--ln); }
                .fmcg-case-study .wide { width: 100%; }
                
                .fmcg-case-study .eyebrow { font-family: var(--mono); font-size: 12px; color: var(--brand); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
                .fmcg-case-study .eyebrow::after { content: ''; width: 24px; height: 1px; background: var(--brand-border); }
                .fmcg-case-study .eyebrow.lt { color: rgba(255,255,255,.3); }
                .fmcg-case-study .eyebrow.lt::after { background: rgba(255,255,255,.15); }
                .fmcg-case-study h2 { font-family: var(--sans); font-size: clamp(28px, 4vw, 46px); line-height: 1.1; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 18px; font-weight: 700; }
                .fmcg-case-study h2 em { font-style: italic; color: var(--ink4); font-weight: 600; }
                .fmcg-case-study h2.lt { color: #FFFFFF; }
                .fmcg-case-study h2.lt em { color: rgba(255,255,255,.4); }
                .fmcg-case-study .body-copy { font-size: 16px; color: var(--ink2); line-height: 1.9; font-weight: 300; max-width: 600px; }

                .fmcg-case-study .two-col { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 64px; align-items: start; margin-top: 40px; }
                .fmcg-case-study .context-quote { border-left: 2px solid var(--brand); padding: 24px 28px; background: var(--w); border-radius: 0 12px 12px 0; font-family: var(--serif); font-size: 20px; color: var(--ink2); line-height: 1.62; margin: 32px 0; font-style: italic; }
                .fmcg-case-study .context-quote cite { display: block; font-family: var(--sans); font-size: 13px; font-style: normal; color: var(--ink4); margin-top: 12px; }

                .fmcg-case-study .stakeholders-list { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
                .fmcg-case-study .stakeholder-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 20px; transition: all .2s; }
                .fmcg-case-study .stakeholder-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.05); border-color: var(--ln2); }
                .fmcg-case-study .sh-role { font-family: var(--mono); font-size: 10px; color: var(--gm); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px; font-weight: 600; }
                .fmcg-case-study .sh-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; color: var(--ink); }
                .fmcg-case-study .sh-desc { font-size: 13px; color: var(--ink3); line-height: 1.6; }

                .fmcg-case-study .pain-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1px;
                    background: var(--ln);
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    overflow: hidden;
                    margin-top: 48px;
                }
                .fmcg-case-study .pain-card {
                    background: var(--w);
                    padding: 28px 24px;
                    transition: background .2s;
                }
                .fmcg-case-study .pain-card:hover {
                    background: var(--off);
                }
                .fmcg-case-study .pain-n {
                    display: block;
                    font-family: var(--mono);
                    font-size: 11px;
                    color: var(--ink4);
                    letter-spacing: .06em;
                    margin-bottom: 12px;
                }
                .fmcg-case-study .pain-t {
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    line-height: 1.35;
                    color: var(--ink);
                }
                .fmcg-case-study .pain-b {
                    font-size: 13px;
                    color: var(--ink3);
                    line-height: 1.7;
                    margin: 0 0 14px;
                }
                .fmcg-case-study .pain-tag {
                    display: inline-block;
                    font-family: var(--mono);
                    font-size: 11px;
                    color: var(--brand);
                    background: var(--brand-light);
                    padding: 3px 9px;
                    border-radius: 6px;
                    font-weight: 500;
                }
                .fmcg-case-study .chaos-strip {
                    grid-column: 1 / -1;
                    padding: 24px 28px;
                    background: var(--off);
                    border-top: 1px solid var(--ln);
                }
                .fmcg-case-study .chaos-label {
                    font-family: var(--mono);
                    font-size: 11px;
                    letter-spacing: .08em;
                    text-transform: uppercase;
                    color: var(--ink4);
                    margin-bottom: 14px;
                }
                .fmcg-case-study .chaos-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .fmcg-case-study .chaos-tag {
                    display: inline-flex;
                    align-items: center;
                    border: 1px solid;
                    border-radius: 999px;
                    padding: 5px 11px;
                    font-family: var(--mono);
                    font-size: 10px;
                    line-height: 1;
                }
                .fmcg-case-study .chaos-tag.risk {
                    border-color: rgba(220,38,38,.12);
                    color: var(--rm);
                    background: var(--rbg);
                }
                .fmcg-case-study .chaos-tag.warn {
                    border-color: rgba(217,119,6,.12);
                    color: var(--am);
                    background: var(--abg);
                }
                .fmcg-case-study .chaos-tag.neutral {
                    border-color: var(--ln);
                    color: var(--ink3);
                    background: var(--off2);
                }

                @media(max-width:1000px) {
                    .fmcg-case-study .two-col { grid-template-columns: 1fr; gap: 40px; }
                    .fmcg-case-study .pain-grid { grid-template-columns: 1fr 1fr; }
                }
                @media(max-width:600px) {
                    .fmcg-case-study .pain-grid { grid-template-columns: 1fr; }
                }
                
                .fmcg-case-study .arch-wrap { border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; background: var(--off); margin-top: 0; }
                
                .fmcg-case-study .feat-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: var(--ln); border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 48px; }
                .fmcg-case-study .feat { background: var(--w); padding: 26px 24px; transition: background .2s; }
                .fmcg-case-study .feat:hover { background: var(--off); }
                .fmcg-case-study .feat-n { font-family: var(--mono); font-size: 11px; color: var(--brand); letter-spacing: 0.08em; margin-bottom: 12px; font-weight: 500; }
                .fmcg-case-study .feat-t { font-size: 16px; font-weight: 500; color: var(--ink); margin-bottom: 8px; line-height: 1.35; }
                .fmcg-case-study .feat-d { font-size: 14px; color: var(--ink3); line-height: 1.78; font-weight: 300; }
                .fmcg-case-study .feat-tag { display: inline-block; margin-top: 14px; font-family: var(--mono); font-size: 11px; color: var(--brand); background: var(--brand-light); padding: 3px 9px; border-radius: 6px; font-weight: 500; }
                
                .fmcg-case-study .ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px; }
                .fmcg-case-study .ba-card { border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; }
                .fmcg-case-study .ba-head { padding: 12px 18px; border-bottom: 1px solid var(--ln); display: flex; align-items: center; gap: 9px; }
                .fmcg-case-study .ba-head.before { background: #fff7f7; }
                .fmcg-case-study .ba-head.after { background: #f5fbf6; }
                .fmcg-case-study .ba-dot { width: 7px; height: 7px; border-radius: 50%; }
                .fmcg-case-study .ba-head.before .ba-dot { background: var(--rm); }
                .fmcg-case-study .ba-head.after .ba-dot { background: var(--gm); }
                .fmcg-case-study .ba-lbl { font-family: var(--mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-weight: 500; }
                .fmcg-case-study .ba-head.before .ba-lbl { color: var(--rm); }
                .fmcg-case-study .ba-head.after .ba-lbl { color: var(--gdk); }
                .fmcg-case-study .ba-row { display: flex; gap: 11px; padding: 12px 18px; border-bottom: 1px solid var(--ln); font-size: 14px; color: var(--ink2); line-height: 1.65; font-weight: 300; }
                .fmcg-case-study .ba-row:last-child { border-bottom: none; }
                .fmcg-case-study .ba-mark { font-family: var(--mono); font-size: 12px; flex-shrink: 0; margin-top: 2px; }
                .fmcg-case-study .bm-bad { color: var(--rm); }
                .fmcg-case-study .bm-good { color: var(--gm); }

                .fmcg-case-study .g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; }

                .fmcg-case-study .tech-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 40px; }
                .fmcg-case-study .tech-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 24px; transition: background .2s, border-color .2s; }
                .fmcg-case-study .tech-card:hover { background: var(--off); border-color: var(--ln2); }
                .fmcg-case-study .tech-layer { font-family: var(--mono); font-size: 10px; color: var(--brand); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 10px; font-weight: 500; }
                .fmcg-case-study .tech-title { font-size: 15px; font-weight: 600; letter-spacing: -.01em; margin-bottom: 12px; color: var(--ink); }
                .fmcg-case-study .tech-items { display: flex; flex-direction: column; gap: 8px; }
                .fmcg-case-study .tech-item { font-size: 13px; font-weight: 300; color: var(--ink3); display: flex; align-items: flex-start; gap: 8px; line-height: 1.55; }
                .fmcg-case-study .tech-item::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--brand); flex-shrink: 0; display: block; margin-top: 6px; }
                @media(max-width:900px){ .fmcg-case-study .tech-grid { grid-template-columns: 1fr 1fr; gap: 16px; } }
                @media(max-width:600px){ .fmcg-case-study .tech-grid { grid-template-columns: 1fr; } }

                .fmcg-case-study .alerts { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 48px; }
                .fmcg-case-study .alert { border-radius: 8px; padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--w); border: 1px solid var(--ln); }
                .fmcg-case-study .al-icon { font-family: var(--mono); font-size: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; }
                .fmcg-case-study .alert.danger .al-icon { color: var(--rm); background: var(--rbg); border: 1px solid rgba(220, 38, 38, 0.1); }
                .fmcg-case-study .alert.warn .al-icon { color: var(--am); background: var(--abg); border: 1px solid rgba(217, 119, 6, 0.1); }
                .fmcg-case-study .alert.info .al-icon { color: var(--bm); background: var(--bbg); border: 1px solid rgba(37, 99, 235, 0.1); }
                .fmcg-case-study .al-title { font-size: 14px; color: var(--ink2); font-weight: 500; line-height: 1.5; letter-spacing: -0.01em; }

                .fmcg-case-study .impact-stat { padding: 32px 26px; border-right: 1px solid var(--ln); }
                .fmcg-case-study .impact-stat:last-child { border-right: none; }
                .fmcg-case-study .stat-num { font-family: var(--sans); font-size: 46px; line-height: 1; color: var(--ink); margin-bottom: 5px; font-weight: 800; letter-spacing: -0.05em; }
                .fmcg-case-study .stat-unit { font-family: var(--mono); font-size: 11px; color: var(--brand); letter-spacing: 0.08em; display: block; margin-bottom: 6px; font-weight: 500; text-transform: uppercase; }
                .fmcg-case-study .stat-desc { font-size: 14px; color: var(--ink3); line-height: 1.65; font-weight: 300; }

                .fmcg-case-study .learning-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
                .fmcg-case-study .learning-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 28px; display: flex; gap: 18px; transition: all .2s; }
                .fmcg-case-study .learning-card:hover { background: var(--off); border-color: var(--ln2); }
                .fmcg-case-study .lc-num { font-size: 38px; font-weight: 800; color: var(--ln2); line-height: 1; flex-shrink: 0; min-width: 46px; letter-spacing: -.04em; }
                .fmcg-case-study .lc-cat { font-family: var(--mono); font-size: 9px; color: var(--brand); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 6px; }
                .fmcg-case-study .lc-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; letter-spacing: -.01em; }
                .fmcg-case-study .lc-body { font-size: 13px; font-weight: 300; color: var(--ink3); line-height: 1.7; margin-bottom: 10px; }
                .fmcg-case-study .lc-rule { font-family: var(--mono); font-size: 10px; color: var(--gm); background: var(--gbg); padding: 5px 10px; border-radius: 4px; letter-spacing: .04em; display: inline-block; }

                .fmcg-case-study .sk-note { margin-top: 24px; padding: 18px 24px; border: 1px solid var(--ln); border-left: 3px solid var(--brand); border-radius: 0 8px 8px 0; background: var(--off); font-size: 14px; color: var(--ink2); line-height: 1.7; font-weight: 300; }

                .fmcg-case-study .chart-card { border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 14px; }
                .fmcg-case-study .cc-head { padding: 13px 18px; border-bottom: 1px solid var(--ln); display: flex; justify-content: space-between; align-items: center; }
                .fmcg-case-study .cc-t { font-size: 14px; font-weight: 500; color: var(--ink); }
                .fmcg-case-study .cc-s { font-family: var(--mono); font-size: 12px; color: var(--ink4); }
                .fmcg-case-study .cc-body { padding: 16px 18px; height: 196px; position: relative; }

                .fmcg-case-study .workflow-tabs { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 42px; }
                .fmcg-case-study .workflow-tab {
                    padding: 12px 18px;
                    border-radius: 999px;
                    border: 1px solid var(--ln);
                    background: var(--w);
                    color: var(--ink2);
                    font-family: var(--sans);
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    transition: background .2s, border-color .2s, color .2s;
                }
                .fmcg-case-study .workflow-tab:hover { background: var(--off); border-color: var(--ln2); }
                .fmcg-case-study .workflow-tab.is-active {
                    background: var(--brand-light);
                    border-color: var(--brand-border);
                    color: var(--brand);
                }
                .fmcg-case-study .workflow-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
                    gap: 20px;
                    margin-top: 28px;
                    align-items: start;
                }
                .fmcg-case-study .state-machine-card {
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    overflow: hidden;
                    background: var(--w);
                }
                .fmcg-case-study .state-machine-head {
                    padding: 16px 20px;
                    border-bottom: 1px solid var(--ln);
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    color: var(--ink);
                }
                .fmcg-case-study .state-machine-row {
                    display: grid;
                    grid-template-columns: 180px 1fr;
                    gap: 18px;
                    align-items: start;
                    padding: 16px 20px;
                    border-bottom: 1px solid var(--ln);
                }
                .fmcg-case-study .state-machine-row:last-child { border-bottom: none; }
                .fmcg-case-study .state-machine-arrow {
                    padding: 12px 20px;
                    border-bottom: 1px solid var(--ln);
                    background: var(--off);
                    font-family: var(--mono);
                    font-size: 11px;
                    line-height: 1.75;
                    letter-spacing: 0.04em;
                    color: var(--ink3);
                }
                .fmcg-case-study .state-pill {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 146px;
                    padding: 8px 12px;
                    border-radius: 999px;
                    border: 1px solid transparent;
                    font-family: var(--mono);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .fmcg-case-study .tone-draft { background: #f8fafc; border-color: #e2e8f0; color: #475569; }
                .fmcg-case-study .tone-pending { background: #fff7ed; border-color: #fed7aa; color: #c2410c; }
                .fmcg-case-study .tone-review { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
                .fmcg-case-study .tone-approved { background: #f0fdf4; border-color: #bbf7d0; color: #15803d; }
                .fmcg-case-study .tone-rejected { background: #fef2f2; border-color: #fecaca; color: #b91c1c; }
                .fmcg-case-study .tone-locked { background: #f8fafc; border-color: #cbd5e1; color: #0f172a; }
                .fmcg-case-study .tone-issued { background: #eef2ff; border-color: #c7d2fe; color: #4338ca; }
                .fmcg-case-study .tone-expired { background: #fff1f2; border-color: #fecdd3; color: #be123c; }
                .fmcg-case-study .tone-archived { background: #f8fafc; border-color: #e2e8f0; color: #64748b; }
                .fmcg-case-study .tone-exception { background: #fff7ed; border-color: #fdba74; color: #c2410c; }
                .fmcg-case-study .state-machine-detail {
                    font-size: 14px;
                    line-height: 1.8;
                    color: var(--ink3);
                    font-weight: 300;
                }
                .fmcg-case-study .workflow-rules { display: grid; gap: 16px; }
                .fmcg-case-study .workflow-rule {
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    background: var(--w);
                    padding: 22px;
                }
                .fmcg-case-study .workflow-rule-type {
                    display: inline-flex;
                    align-items: center;
                    padding: 4px 10px;
                    border-radius: 999px;
                    border: 1px solid transparent;
                    font-family: var(--mono);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .fmcg-case-study .workflow-rule-type.tone-good { background: #f0fdf4; border-color: #bbf7d0; color: #15803d; }
                .fmcg-case-study .workflow-rule-type.tone-alert { background: #fff7ed; border-color: #fed7aa; color: #c2410c; }
                .fmcg-case-study .workflow-rule-type.tone-risk { background: #fef2f2; border-color: #fecaca; color: #b91c1c; }
                .fmcg-case-study .workflow-rule-title {
                    margin-top: 14px;
                    font-size: 15px;
                    line-height: 1.5;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    color: var(--ink);
                }
                .fmcg-case-study .workflow-rule-body {
                    margin-top: 10px;
                    font-size: 13px;
                    line-height: 1.75;
                    font-weight: 300;
                    color: var(--ink3);
                }

                .fmcg-case-study .flow-table-wrap {
                    margin-top: 42px;
                    overflow-x: auto;
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    background: var(--w);
                }
                .fmcg-case-study .flow-table {
                    width: 100%;
                    min-width: 1050px;
                    border-collapse: collapse;
                    table-layout: fixed;
                }
                .fmcg-case-study .flow-table th,
                .fmcg-case-study .flow-table td {
                    border-right: 1px solid var(--ln);
                    border-bottom: 1px solid var(--ln);
                    padding: 18px 16px;
                    vertical-align: top;
                }
                .fmcg-case-study .flow-table th:last-child,
                .fmcg-case-study .flow-table td:last-child { border-right: none; }
                .fmcg-case-study .flow-table tbody tr:last-child td { border-bottom: none; }
                .fmcg-case-study .flow-table th {
                    background: var(--off);
                    font-size: 13px;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    color: var(--ink);
                    text-align: left;
                }
                .fmcg-case-study .flow-layer {
                    width: 110px;
                    font-family: var(--mono);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--brand);
                    background: var(--off);
                }
                .fmcg-case-study .flow-cell {
                    font-size: 13px;
                    line-height: 1.75;
                    font-weight: 300;
                    color: var(--ink3);
                }
                .fmcg-case-study .flow-cell.tone-brand { background: var(--brand-light); }
                .fmcg-case-study .flow-cell.tone-warn { background: var(--abg); }
                .fmcg-case-study .flow-cell-label {
                    display: block;
                    margin-bottom: 8px;
                    font-family: var(--mono);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--brand);
                }

                .fmcg-case-study .schema-box {
                    margin-top: 28px;
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    overflow: hidden;
                    background: var(--w);
                }
                .fmcg-case-study .schema-head {
                    padding: 16px 20px;
                    border-bottom: 1px solid var(--ln);
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--ink);
                    letter-spacing: -0.01em;
                }
                .fmcg-case-study .schema-body {
                    padding: 20px;
                    background: linear-gradient(180deg, rgba(248, 250, 252, 0.7) 0%, rgba(255, 255, 255, 1) 100%);
                }
                .fmcg-case-study .schema-legend {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 18px;
                }
                .fmcg-case-study .schema-legend-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 7px 10px;
                    border: 1px solid var(--ln);
                    border-radius: 999px;
                    background: var(--w);
                    font-family: var(--mono);
                    font-size: 10px;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--ink3);
                }
                .fmcg-case-study .schema-legend-swatch {
                    width: 10px;
                    height: 10px;
                    border-radius: 2px;
                    flex-shrink: 0;
                }
                .fmcg-case-study .schema-grid {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 14px;
                }
                .fmcg-case-study .schema-card {
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    overflow: hidden;
                    background: var(--w);
                }
                .fmcg-case-study .schema-card-head {
                    padding: 12px 14px;
                    font-family: var(--mono);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    color: #fff;
                }
                .fmcg-case-study .schema-card-head.tone-core { background: var(--brand); }
                .fmcg-case-study .schema-card-head.tone-control { background: var(--gm); }
                .fmcg-case-study .schema-card-head.tone-reference { background: var(--am); }
                .fmcg-case-study .schema-fields { padding: 6px 14px 10px; }
                .fmcg-case-study .schema-field {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 10px 0;
                    border-bottom: 1px solid var(--ln);
                }
                .fmcg-case-study .schema-field:last-child { border-bottom: none; }
                .fmcg-case-study .schema-field-name {
                    font-size: 13px;
                    color: var(--ink2);
                    line-height: 1.5;
                }
                .fmcg-case-study .schema-field-name.key-fk { color: var(--am); }
                .fmcg-case-study .schema-field-name.key-pk { color: var(--brand); font-weight: 600; }
                .fmcg-case-study .schema-field-type {
                    font-family: var(--mono);
                    font-size: 10px;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--ink4);
                    white-space: nowrap;
                }

                .fmcg-case-study .compliance-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-top: 40px;
                }
                .fmcg-case-study .compliance-card {
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    background: var(--w);
                    overflow: hidden;
                }
                .fmcg-case-study .compliance-card:hover { border-color: var(--ln2); }
                .fmcg-case-study .compliance-head {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 18px 20px;
                    border-bottom: 1px solid var(--ln);
                    background: var(--off);
                }
                .fmcg-case-study .compliance-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--brand-light);
                    font-size: 18px;
                    flex-shrink: 0;
                }
                .fmcg-case-study .compliance-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--ink);
                    letter-spacing: -0.01em;
                }
                .fmcg-case-study .compliance-body {
                    padding: 20px;
                    display: grid;
                    gap: 14px;
                }
                .fmcg-case-study .compliance-check {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    font-size: 13px;
                    line-height: 1.75;
                    font-weight: 300;
                    color: var(--ink3);
                }
                .fmcg-case-study .compliance-check-mark {
                    color: var(--gm);
                    font-weight: 700;
                    margin-top: 2px;
                    flex-shrink: 0;
                }

                .fmcg-case-study .audit-sample {
                    margin-top: 24px;
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    overflow: hidden;
                    background: var(--w);
                }
                .fmcg-case-study .audit-head {
                    padding: 16px 20px;
                    border-bottom: 1px solid var(--ln);
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--ink);
                    letter-spacing: -0.01em;
                }
                .fmcg-case-study .audit-list { padding: 2px; }
                .fmcg-case-study .audit-entry {
                    display: grid;
                    grid-template-columns: 132px 156px 148px 1fr;
                    gap: 14px;
                    align-items: start;
                    padding: 14px 16px;
                    border-bottom: 1px solid var(--ln);
                }
                .fmcg-case-study .audit-entry:last-child { border-bottom: none; }
                .fmcg-case-study .audit-ts,
                .fmcg-case-study .audit-actor {
                    font-family: var(--mono);
                    font-size: 11px;
                    line-height: 1.7;
                    color: var(--ink4);
                }
                .fmcg-case-study .audit-actor { color: var(--ink2); }
                .fmcg-case-study .audit-change {
                    font-size: 13px;
                    line-height: 1.75;
                    color: var(--ink3);
                    font-weight: 300;
                }
                .fmcg-case-study .audit-event {
                    display: inline-flex;
                    align-items: center;
                    padding: 6px 10px;
                    border-radius: 999px;
                    border: 1px solid transparent;
                    font-family: var(--mono);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .fmcg-case-study .audit-event.tone-lock { background: var(--off); border-color: var(--ln2); color: var(--ink2); }
                .fmcg-case-study .audit-event.tone-approve { background: #f0fdf4; border-color: #bbf7d0; color: #15803d; }
                .fmcg-case-study .audit-event.tone-update { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
                .fmcg-case-study .audit-event.tone-create { background: var(--brand-light); border-color: var(--brand-border); color: var(--brand); }
                .fmcg-case-study .audit-event.tone-expire { background: #fff1f2; border-color: #fecdd3; color: #be123c; }

                .fmcg-case-study .cta-section {
                    padding: 110px 0 120px;
                    background:
                        radial-gradient(circle at top, rgba(79, 70, 229, 0.08), transparent 42%),
                        linear-gradient(180deg, var(--off) 0%, var(--w) 100%);
                    text-align: center;
                }
                .fmcg-case-study .cta-inner {
                    max-width: 680px;
                    margin: 0 auto;
                }
                .fmcg-case-study .cta-kicker {
                    display: inline-flex;
                    align-items: center;
                    gap: 14px;
                    font-family: var(--mono);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: var(--brand);
                    margin-bottom: 24px;
                }
                .fmcg-case-study .cta-kicker::before,
                .fmcg-case-study .cta-kicker::after {
                    content: '';
                    display: block;
                    width: 32px;
                    height: 1.5px;
                    background: var(--brand);
                    opacity: 0.45;
                }
                .fmcg-case-study .cta-heading {
                    font-size: clamp(42px, 5vw, 70px);
                    line-height: 1.04;
                    letter-spacing: -0.04em;
                    font-weight: 800;
                    color: var(--ink);
                    margin-bottom: 22px;
                }
                .fmcg-case-study .cta-heading em { font-style: italic; color: var(--brand); }
                .fmcg-case-study .cta-sub {
                    font-size: 15px;
                    line-height: 1.82;
                    font-weight: 300;
                    color: var(--ink3);
                    margin: 0 auto 38px;
                    max-width: 620px;
                }
                .fmcg-case-study .cta-btns {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .fmcg-case-study .cta-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 48px;
                    padding: 0 18px;
                    border-radius: 999px;
                    border: 1px solid var(--ln);
                    font-size: 13px;
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    text-decoration: none;
                    transition: background .2s, border-color .2s, color .2s, transform .2s;
                }
                .fmcg-case-study .cta-btn:hover { transform: translateY(-1px); }
                .fmcg-case-study .cta-btn.primary {
                    background: var(--brand);
                    border-color: var(--brand);
                    color: #fff;
                }
                .fmcg-case-study .cta-btn.primary:hover { background: var(--brand-hover); border-color: var(--brand-hover); }
                .fmcg-case-study .cta-btn.secondary {
                    background: var(--w);
                    color: var(--ink2);
                }
                .fmcg-case-study .cta-btn.secondary:hover {
                    background: var(--off);
                    border-color: var(--ln2);
                }
                
                .fmcg-case-study .fade {
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity .6s ease, transform .6s ease;
                    will-change: opacity, transform;
                }
                .fmcg-case-study .fade.in {
                    opacity: 1;
                    transform: none;
                }
                .fmcg-case-study .d1 { transition-delay: .1s; }
                .fmcg-case-study .d2 { transition-delay: .2s; }
                .fmcg-case-study .d3 { transition-delay: .3s; }
                .fmcg-case-study .d4 { transition-delay: .4s; }
                
                .fmcg-case-study .hero-visual {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: 520px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .fmcg-case-study .structure-container {
                   position: relative;
                   width: 100%;
                   max-width: 580px;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   animation: float-arch 15s ease-in-out infinite;
                }
                @keyframes float-arch {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .fmcg-case-study .structure-svg {
                    width: 100%;
                    height: auto;
                    display: block;
                    overflow: visible;
                }
                @keyframes dispatch-anim {
                    0%, 15% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
                    40%, 60% { transform: translateY(-120px) translateX(40px) scale(0.9); opacity: 0; }
                    70% { transform: translateY(-40px) translateX(0) scale(0.95); opacity: 0; }
                    85%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
                }
                .fmcg-case-study .dispatched-cube {
                    animation: dispatch-anim 6s cubic-bezier(0.25, 1, 0.5, 1) infinite;
                }
                
                @media(max-width:900px){
                    .fmcg-case-study section { padding: 80px 0; }
                    .fmcg-case-study .prob-grid, .fmcg-case-study .feat-grid, .fmcg-case-study .ba-grid { grid-template-columns: 1fr; gap: 32px; }
                    .fmcg-case-study .alerts, .fmcg-case-study .g4 { grid-template-columns: 1fr; }
                    .fmcg-case-study .impact-stat { border-right: none; border-bottom: 1px solid var(--ln); }
                    .fmcg-case-study h1 { font-size: clamp(38px, 10vw, 60px); }
                    .fmcg-case-study .hero-meta { grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; border-top: none; padding-top: 0; }
                    .fmcg-case-study .hm { border-right: none; margin-right: 0; padding-right: 0; border-bottom: 1px solid var(--ln); padding-bottom: 14px; }
                    .fmcg-case-study .hero-inner { grid-template-columns: 1fr; gap: 48px; }
                    .fmcg-case-study #hero { padding: 100px 0 60px; min-height: auto; }
                    .fmcg-case-study .hero-visual { min-height: 400px; }
                    .fmcg-case-study .tech-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
                    .fmcg-case-study .learning-grid { grid-template-columns: 1fr 1fr; }
                    .fmcg-case-study .workflow-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .state-machine-row { grid-template-columns: 1fr; gap: 12px; }
                    .fmcg-case-study .schema-grid { grid-template-columns: 1fr 1fr; }
                    .fmcg-case-study .compliance-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .audit-entry { grid-template-columns: 1fr; gap: 8px; }
                    .fmcg-case-study .cta-section { padding: 90px 0 100px; }
                }
                @media(max-width:600px){
                    .fmcg-case-study .tech-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .learning-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .g4 { grid-template-columns: 1fr; }
                    .fmcg-case-study .alerts { grid-template-columns: 1fr; }
                    .fmcg-case-study .workflow-tab { width: 100%; text-align: left; }
                    .fmcg-case-study .state-pill { min-width: 0; width: 100%; justify-content: flex-start; }
                    .fmcg-case-study .schema-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .cta-btn { width: 100%; }
                }
            `}</style>

            <section id="hero">
                <div className="hero-grid"></div>
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="hero-inner">
                        <div className="hero-content">
                            <h1 className="fade d2">
                                ERP-Lite Integrated HR<br />Control <em>System</em>
                            </h1>
                            <p className="lead fade d3">
                                A compliance-minded HR operations platform â€” unifying employee records, attendance, leave, payroll preparation, and controlled HR documentation in one traceable workflow for a 120-person SME.
                            </p>

                            <div className="hero-meta fade d4">
                                <div className="hm">
                                    <div className="hm-label">Role</div>
                                    <div className="hm-val">Systems Builder</div>
                                </div>
                                <div className="hm">
                                    <div className="hm-label">Industry</div>
                                    <div className="hm-val">HR & SME Operations</div>
                                </div>
                                <div className="hm">
                                    <div className="hm-label">Timeline</div>
                                    <div className="hm-val">2025</div>
                                </div>
                                <div className="hm">
                                    <div className="hm-label">Scale</div>
                                    <div className="hm-val">120 Employees</div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual fade d3">
                            <motion.div className="structure-container" style={{ y: heroY }}>
                                <svg viewBox="0 0 500 440" className="structure-svg" aria-hidden="true">
                                    <defs>
                                        <linearGradient id="topGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                                        </linearGradient>
                                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.08" />
                                        </filter>
                                    </defs>

                                    <g transform="translate(250 250)">
                                        <polygon points="-118,54 28,54 128,112 -18,112" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
                                        <polygon points="28,54 28,68 128,126 128,112" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.2" />
                                        <polygon points="-118,54 -118,68 -18,126 -18,112" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.2" />

                                        <g filter="url(#shadow)">
                                            <polygon points="-84,-6 30,-6 108,38 -6,38" fill="rgba(79, 70, 229, 0.22)" stroke="rgba(79, 70, 229, 0.18)" strokeWidth="1.5" />
                                            <polygon points="30,-6 30,10 108,54 108,38" fill="rgba(49, 46, 129, 0.62)" />
                                            <polygon points="-84,-6 -84,10 -6,54 -6,38" fill="rgba(79, 70, 229, 0.38)" />
                                            <polygon points="-84,-6 30,-6 108,38 -6,38" fill="url(#topGlow)" opacity="0.85" />

                                            <polygon points="-54,-54 38,-54 102,-18 10,-18" fill="rgba(79, 70, 229, 0.32)" stroke="rgba(79, 70, 229, 0.24)" strokeWidth="1.5" />
                                            <polygon points="38,-54 38,-40 102,-4 102,-18" fill="rgba(49, 46, 129, 0.72)" />
                                            <polygon points="-54,-54 -54,-40 10,-4 10,-18" fill="rgba(79, 70, 229, 0.46)" />
                                            <polygon points="-54,-54 38,-54 102,-18 10,-18" fill="url(#topGlow)" opacity="0.85" />

                                            <polygon points="-28,-96 46,-96 98,-66 24,-66" fill="rgba(79, 70, 229, 0.42)" stroke="rgba(79, 70, 229, 0.28)" strokeWidth="1.5" />
                                            <polygon points="46,-96 46,-84 98,-54 98,-66" fill="rgba(49, 46, 129, 0.82)" />
                                            <polygon points="-28,-96 -28,-84 24,-54 24,-66" fill="rgba(79, 70, 229, 0.56)" />
                                            <polygon points="-28,-96 46,-96 98,-66 24,-66" fill="url(#topGlow)" opacity="0.85" />
                                        </g>

                                        <g transform="translate(24 -66)">
                                            <circle cx="0" cy="0" r="2" fill="var(--brand)" />
                                            <path d="M 0 0 L 0 -28 L 26 -28" fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.5" />
                                            <rect x="30" y="-37" width="122" height="18" rx="2" fill="rgba(255,255,255,0.92)" stroke="var(--ln)" filter="url(#shadow)" />
                                            <circle cx="38" cy="-28" r="3.5" fill="var(--brand)" />
                                            <text x="48" y="-25" fontSize="8" fontFamily="var(--mono)" letterSpacing="0.05em" fill="var(--ink2)" fontWeight="600">EMPLOYEE RECORDS</text>
                                        </g>

                                        <g transform="translate(10 -18)">
                                            <circle cx="0" cy="0" r="2" fill="var(--brand)" />
                                            <path d="M 0 0 L 0 28 L -28 28" fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.5" />
                                            <rect x="-150" y="19" width="118" height="18" rx="2" fill="rgba(255,255,255,0.92)" stroke="var(--ln)" filter="url(#shadow)" />
                                            <circle cx="-142" cy="28" r="3.5" fill="#10B981" />
                                            <text x="-132" y="31" fontSize="8" fontFamily="var(--mono)" letterSpacing="0.05em" fill="var(--ink2)" fontWeight="600">PAYROLL ENGINE</text>
                                        </g>

                                        <g transform="translate(-18 112)">
                                            <circle cx="0" cy="0" r="2" fill="var(--brand)" />
                                            <path d="M 0 0 L 0 30 L 24 30" fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.5" />
                                            <rect x="28" y="21" width="90" height="18" rx="2" fill="rgba(255,255,255,0.92)" stroke="var(--ln)" filter="url(#shadow)" />
                                            <circle cx="36" cy="30" r="3.5" fill="var(--brand)" />
                                            <text x="46" y="33" fontSize="8" fontFamily="var(--mono)" letterSpacing="0.05em" fill="var(--ink2)" fontWeight="600">AUDIT LOG</text>
                                        </g>
                                    </g>
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="problem" className="alt">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide">
                        <div
                            className="eyebrow fade"
                            style={{ textTransform: 'none', letterSpacing: '0.06em' }}
                        >
                            01 — Problem Statement
                            <em style={{ fontStyle: 'italic', color: 'var(--ink4)', letterSpacing: '0.02em' }}>
                                / The operational case for building
                            </em>
                        </div>
                        <h2 className="fade d1">Fragmented records.<br />Delayed payroll.<br /><em>Zero traceability.</em></h2>
                        <p className="lead fade d2" style={{ maxWidth: 900, marginBottom: 0 }}>
                            A 120-employee SME was managing HR operations through a patchwork of spreadsheets, WhatsApp groups, and personal Google Drive folders. Compliance audits were panic events. Payroll took three days. Documents disappeared when staff left.
                        </p>

                        <div className="pain-grid fade d3">
                            {problemStatementCards.map(item => (
                                <div key={item.title} className="pain-card">
                                    <span className="pain-n">{item.label}</span>
                                    <div className="pain-t">{item.title}</div>
                                    <p className="pain-b">{item.desc}</p>
                                    <span className="pain-tag">{item.tag}</span>
                                </div>
                            ))}
                            <div className="chaos-strip">
                                <div className="chaos-label">Pre-System Infrastructure — Full Inventory</div>
                                <div className="chaos-tags">
                                {preSystemInfrastructure.map(item => {
                                    const toneClass =
                                        item.tone === 'risk'
                                            ? 'risk'
                                            : item.tone === 'warn'
                                                ? 'warn'
                                                : 'neutral';

                                    return (
                                        <span
                                            key={item.label}
                                            className={`chaos-tag ${toneClass}`}
                                        >
                                            {item.label}
                                        </span>
                                    );
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="research">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide">
                        <div
                            className="eyebrow fade"
                            style={{ textTransform: 'none', letterSpacing: '0.06em' }}
                        >
                            02 — User Research &amp; Discovery
                            <em style={{ fontStyle: 'italic', color: 'var(--ink4)', letterSpacing: '0.02em' }}>
                                / Before any module was specified
                            </em>
                        </div>
                        <h2 className="fade d1">Four roles.<br /><em>Three pain clusters.</em><br />One clear mandate.</h2>
                        <p className="lead fade d2" style={{ maxWidth: 920, marginBottom: 0 }}>
                            Discovery sessions with each user type shaped every architectural decision. The personas below are based on the actual roles operating the system — their language and frustrations drove the module priorities.
                        </p>

                        <div className="grid gap-5 lg:grid-cols-[320px_1fr] mt-12">
                            <div className="grid gap-3 fade d3">
                                {researchPersonas.map((persona, index) => {
                                    const active = activeResearchPersona === index;

                                    return (
                                        <button
                                            key={persona.tabName}
                                            type="button"
                                            className="stakeholder-card text-left"
                                            onClick={() => setActiveResearchPersona(index)}
                                            aria-pressed={active}
                                            style={{
                                                background: active ? 'var(--brand-light)' : 'var(--w)',
                                                borderColor: active ? 'var(--brand-border)' : 'var(--ln)'
                                            }}
                                        >
                                            <div className="sh-role" style={{ color: active ? 'var(--brand)' : 'var(--gm)' }}>
                                                {persona.tabRole}
                                            </div>
                                            <div className="sh-title">{persona.tabName}</div>
                                            <div className="sh-desc">{persona.tabDept}</div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="chart-card fade d4" style={{ marginTop: 0 }}>
                                <div className="p-6 md:p-8">
                                    <div className="tech-layer" style={{ color: 'var(--gm)' }}>
                                        {researchPersonas[activeResearchPersona].role}
                                    </div>
                                    <div
                                        className="tech-title"
                                        style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 6, lineHeight: 1.05 }}
                                    >
                                        {researchPersonas[activeResearchPersona].name}
                                    </div>
                                    <div className="cc-s" style={{ display: 'block', marginBottom: 20 }}>
                                        {researchPersonas[activeResearchPersona].meta}
                                    </div>

                                    <div className="context-quote" style={{ margin: '0 0 24px' }}>
                                        {researchPersonas[activeResearchPersona].quote}
                                    </div>

                                    <div className="tech-layer">Core requirements from this persona</div>
                                    <div className="grid gap-3 mt-4">
                                        {researchPersonas[activeResearchPersona].needs.map(need => (
                                            <div
                                                key={need}
                                                className="rounded-lg px-4 py-3 text-sm"
                                                style={{
                                                    background: 'var(--off)',
                                                    border: '1px solid var(--ln)',
                                                    color: 'var(--ink2)',
                                                    lineHeight: 1.75
                                                }}
                                            >
                                                {need}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="feat-grid fade d4" style={{ marginTop: 40 }}>
                            {researchFindings.map(item => (
                                <div key={item.number} className="feat">
                                    <div className="feat-n">{item.number}</div>
                                    <div className="feat-t">{item.title}</div>
                                    <div className="feat-d">{item.body}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="strategy">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide">
                        <div
                            className="eyebrow fade"
                            style={{ textTransform: 'none', letterSpacing: '0.06em' }}
                        >
                            03 — Product Strategy
                            <em style={{ fontStyle: 'italic', color: 'var(--ink4)', letterSpacing: '0.02em' }}>
                                / Why "lite" and why these modules
                            </em>
                        </div>
                        <h2 className="fade d1">Focused scope.<br /><em>Complete operations.</em><br />No enterprise overhead.</h2>
                        <p className="lead fade d2" style={{ maxWidth: 920, marginBottom: 0 }}>
                            ERP-Lite is not a smaller version of SAP. It is a complete HR operations system for the specific problems SMEs actually face — built with controls-first thinking and no features that would require a dedicated IT team to operate.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
                            {strategyCards.map((card, index) => (
                                <div key={card.number} className={`tech-card fade d${(index % 4) + 1}`}>
                                    <div className="tech-layer">{card.number}</div>
                                    <div className="tech-title">{card.title}</div>
                                    <div className="text-sm leading-7" style={{ color: 'var(--ink3)' }}>{card.body}</div>
                                    <div className="sk-note" style={{ marginTop: 18, padding: '14px 18px', fontSize: 13 }}>
                                        {card.note}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="architecture" className="alt">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide">
                        <div
                            className="eyebrow fade"
                            style={{ textTransform: 'none', letterSpacing: '0.06em' }}
                        >
                            04 — Module Architecture
                            <em style={{ fontStyle: 'italic', color: 'var(--ink4)', letterSpacing: '0.02em' }}>
                                / Eight modules. One connected system.
                            </em>
                        </div>
                        <h2 className="fade d1">Not eight screens.<br /><em>Eight connected</em><br />data flows.</h2>
                        <p className="lead fade d2" style={{ maxWidth: 920, marginBottom: 0 }}>
                            Every module is architecturally dependent on others. Employee Records are the gravitational center. Every other module references the employee entity — no record exists in isolation.
                        </p>

                        <div className="module-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
                            {moduleArchitectureCards.map((module, index) => {
                                const badgeStyles =
                                    module.tone === 'core'
                                        ? { background: 'var(--gbg)', color: 'var(--gdk)', borderColor: 'rgba(5,150,105,.12)' }
                                        : module.tone === 'insight'
                                            ? { background: 'var(--bbg)', color: 'var(--bm)', borderColor: 'rgba(37,99,235,.12)' }
                                            : { background: 'var(--abg)', color: 'var(--am)', borderColor: 'rgba(217,119,6,.12)' };

                                return (
                                    <div key={module.number} className={`tech-card fade d${(index % 4) + 1}`}>
                                        <div className="flex items-center justify-between gap-4 mb-4">
                                            <div className="tech-layer" style={{ marginBottom: 0 }}>{module.number}</div>
                                            <div
                                                className="flex items-center justify-center rounded-xl"
                                                style={{ width: 42, height: 42, background: 'var(--brand-light)', fontSize: 20 }}
                                                aria-hidden="true"
                                            >
                                                {module.icon}
                                            </div>
                                        </div>
                                        <div className="tech-title" style={{ marginBottom: 10 }}>{module.title}</div>
                                        <div className="text-sm leading-7" style={{ color: 'var(--ink3)' }}>{module.desc}</div>
                                        <span
                                            className="feat-tag"
                                            style={{ marginTop: 16, border: '1px solid', ...badgeStyles }}
                                        >
                                            {module.badge}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="chart-card fade d4" style={{ marginTop: 24 }}>
                            <div className="cc-head">
                                <div className="cc-t">System Data Flow — How modules connect</div>
                            </div>
                            <div className="p-5 flex flex-wrap items-center gap-3">
                                {moduleConnections.map((item, index) => (
                                    <React.Fragment key={item.label}>
                                        <div
                                            className="rounded-lg px-4 py-3 text-sm font-medium"
                                            style={{
                                                background: item.active ? 'var(--brand-light)' : 'var(--w)',
                                                border: '1px solid',
                                                borderColor: item.active ? 'var(--brand-border)' : 'var(--ln)',
                                                color: item.active ? 'var(--brand)' : 'var(--ink2)'
                                            }}
                                        >
                                            {item.label}
                                        </div>
                                        {index < moduleConnections.length - 1 && (
                                            <div className="cc-s" style={{ fontSize: 14 }}>→</div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="demo">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide">
                        <div
                            className="eyebrow fade"
                            style={{ textTransform: 'none', letterSpacing: '0.06em' }}
                        >
                            05 — Live System Demo
                            <em style={{ fontStyle: 'italic', color: 'var(--ink4)', letterSpacing: '0.02em' }}>
                                / The proof layer
                            </em>
                        </div>
                        <h2 className="fade d1">Don&apos;t read about it.<br /><em>Use it.</em><br /><span style={{ fontStyle: 'normal', color: 'var(--ink2)' }}>Switch roles. Run payroll. Approve leave.</span></h2>
                        <p className="lead fade d2" style={{ maxWidth: 980, marginBottom: 0 }}>
                            The system below is seeded with 15 employees, 2 payroll periods, 12 leave requests, 6 attendance anomalies, and 3 document expiries. Switch roles to see what each role can and cannot access. Complete a full workflow end-to-end.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
                            {liveSystemScenarios.map((scenario, index) => (
                                <div
                                    key={scenario.label}
                                    className={`tech-card fade d${(index % 4) + 1}`}
                                    style={{
                                        background: index === 0 ? 'linear-gradient(180deg, var(--brand-light) 0%, #FFFFFF 100%)' : 'var(--w)',
                                        borderColor: index === 0 ? 'var(--brand-border)' : 'var(--ln)'
                                    }}
                                >
                                    <div className="tech-layer">{scenario.label}</div>
                                    <div className="tech-title">{scenario.name}</div>
                                    <div className="text-sm leading-7" style={{ color: 'var(--ink3)' }}>{scenario.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="workflow" className="alt">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide">
                        <div
                            className="eyebrow fade"
                            style={{ textTransform: 'none', letterSpacing: '0.06em' }}
                        >
                            06 — Workflow Walkthroughs
                            <em style={{ fontStyle: 'italic', color: 'var(--ink4)', letterSpacing: '0.02em' }}>
                                / Four core operational flows
                            </em>
                        </div>
                        <h2 className="fade d1">Every workflow<br />has a<br /><em>complete state machine.</em></h2>
                        <p className="lead fade d2" style={{ maxWidth: 980, marginBottom: 0 }}>
                            State machines were designed before any UI. Every status transition is explicit, every actor is defined, every edge case has a handling rule. These are not happy-path flows — they include rejections, escalations, and conflicts.
                        </p>

                        <div className="workflow-tabs fade d3">
                            {workflowWalkthroughs.map((workflow) => {
                                const isActive = workflow.id === activeWorkflowData.id;
                                return (
                                    <button
                                        key={workflow.id}
                                        type="button"
                                        className={`workflow-tab${isActive ? ' is-active' : ''}`}
                                        onClick={() => setActiveWorkflow(workflow.id)}
                                        aria-pressed={isActive}
                                    >
                                        {workflow.tab}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="workflow-grid">
                            <div className="state-machine-card fade d2">
                                <div className="state-machine-head">{activeWorkflowData.title}</div>
                                <div>
                                    {activeWorkflowData.steps.map((step, index) => (
                                        step.type === 'arrow' ? (
                                            <div key={`${activeWorkflowData.id}-arrow-${index}`} className="state-machine-arrow">
                                                {step.detail}
                                            </div>
                                        ) : (
                                            <div key={`${activeWorkflowData.id}-${step.label}-${index}`} className="state-machine-row">
                                                <div>
                                                    <span className={`state-pill tone-${step.tone}`}>{step.label}</span>
                                                </div>
                                                <div className="state-machine-detail">{step.detail}</div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>

                            <div className="workflow-rules fade d3">
                                {activeWorkflowData.rules.map((rule) => (
                                    <article key={`${activeWorkflowData.id}-${rule.typeLabel}-${rule.title}`} className="workflow-rule">
                                        <div className={`workflow-rule-type tone-${rule.tone}`}>{rule.typeLabel}</div>
                                        <div className="workflow-rule-title">{rule.title}</div>
                                        <div className="workflow-rule-body">{rule.body}</div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="data">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide">
                        <div
                            className="eyebrow fade"
                            style={{ textTransform: 'none', letterSpacing: '0.06em' }}
                        >
                            07 — Data Flow &amp; Architecture
                            <em style={{ fontStyle: 'italic', color: 'var(--ink4)', letterSpacing: '0.02em' }}>
                                / How data moves between modules
                            </em>
                        </div>
                        <h2 className="fade d1">One data spine.<br /><em>Eight dependent</em><br />modules.</h2>
                        <p className="lead fade d2" style={{ maxWidth: 980, marginBottom: 0 }}>
                            The data model was defined before any UI. Entity relationships enforce business rules at the schema level — not at the application layer. Foreign keys are not optional; they are the system&apos;s first validation pass.
                        </p>

                        <div className="flow-table-wrap fade d3">
                            <table className="flow-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: 110 }}>Layer</th>
                                        <th>Employee Records</th>
                                        <th>Attendance &amp; Time</th>
                                        <th>Leave &amp; Absence</th>
                                        <th>Payroll Engine</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataFlowRows.map((row) => (
                                        <tr key={row.layer}>
                                            <td className="flow-layer">{row.layer}</td>
                                            {row.cells.map((cell) => (
                                                <td
                                                    key={`${row.layer}-${cell.title}`}
                                                    className={`flow-cell${cell.tone ? ` tone-${cell.tone}` : ''}`}
                                                >
                                                    <span className="flow-cell-label">{cell.title}</span>
                                                    {cell.body}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="schema-box fade d4">
                            <div className="schema-head">Entity Relationship Diagram — Core Schema (Simplified)</div>
                            <div className="schema-body">
                                <div className="schema-legend">
                                    <div className="schema-legend-item">
                                        <span className="schema-legend-swatch" style={{ background: 'var(--brand)' }}></span>
                                        Core entities
                                    </div>
                                    <div className="schema-legend-item">
                                        <span className="schema-legend-swatch" style={{ background: 'var(--gm)' }}></span>
                                        Control entities
                                    </div>
                                    <div className="schema-legend-item">
                                        <span className="schema-legend-swatch" style={{ background: 'var(--am)' }}></span>
                                        Reference entities
                                    </div>
                                </div>

                                <div className="schema-grid">
                                    {schemaEntities.map((entity) => (
                                        <div key={entity.name} className="schema-card">
                                            <div className={`schema-card-head tone-${entity.tone}`}>{entity.name}</div>
                                            <div className="schema-fields">
                                                {entity.fields.map(([fieldName, fieldType, fieldKey]) => (
                                                    <div key={`${entity.name}-${fieldName}`} className="schema-field">
                                                        <div className={`schema-field-name${fieldKey ? ` key-${fieldKey}` : ''}`}>{fieldName}</div>
                                                        <div className="schema-field-type">{fieldType}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="compliance" className="alt">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide">
                        <div
                            className="eyebrow fade"
                            style={{ textTransform: 'none', letterSpacing: '0.06em' }}
                        >
                            08 — Controls &amp; Compliance Design
                            <em style={{ fontStyle: 'italic', color: 'var(--ink4)', letterSpacing: '0.02em' }}>
                                / Architecture enforces behavior
                            </em>
                        </div>
                        <h2 className="fade d1">Compliance is<br /><em>architecture,</em><br />not a checkbox.</h2>
                        <p className="lead fade d2" style={{ maxWidth: 980, marginBottom: 0 }}>
                            Every compliance requirement — record retention, approval audit trails, document versioning, payroll lock integrity — is enforced at the schema and API level. Policies cannot be accidentally bypassed because the system does not provide the mechanism to do so.
                        </p>

                        <div className="compliance-grid">
                            {complianceDesignCards.map((card, index) => (
                                <div key={card.title} className={`compliance-card fade d${(index % 4) + 1}`}>
                                    <div className="compliance-head">
                                        <div className="compliance-icon">{card.icon}</div>
                                        <div className="compliance-title">{card.title}</div>
                                    </div>
                                    <div className="compliance-body">
                                        {card.checks.map((check) => (
                                            <div key={check} className="compliance-check">
                                                <span className="compliance-check-mark">✓</span>
                                                <span>{check}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="audit-sample fade d4">
                            <div className="audit-head">Sample Audit Log Entries — Immutable · Append-Only</div>
                            <div className="audit-list">
                                {auditLogEntries.map((entry) => (
                                    <div key={`${entry.timestamp}-${entry.event}`} className="audit-entry">
                                        <span className="audit-ts">{entry.timestamp}</span>
                                        <span><span className={`audit-event tone-${entry.tone}`}>{entry.event}</span></span>
                                        <span className="audit-actor">{entry.actor}</span>
                                        <span className="audit-change">{entry.change}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="results" className="results-band" style={{ borderTop: '1px solid var(--ln)', borderBottom: '1px solid var(--ln)' }}>
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide">
                        <div className="eyebrow fade">09 — Outcomes</div>
                        <h2 className="fade d1">What changed <em>in the numbers</em>.</h2>
                        <div className="results-grid g4 fade d2" style={{ marginTop: 48 }}>
                            {results.map(result => (
                                <div key={result.unit} className="impact-stat">
                                    <div className="stat-num">{result.value}</div>
                                    <span className="stat-unit">{result.unit}</span>
                                    <div className="stat-desc">{result.note}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="cta" className="cta-section">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="cta-inner">
                        <div className="cta-kicker fade">What Comes Next</div>
                        <h2 className="cta-heading fade d1">See it.<br /><em>Use it.</em><br />Build together.</h2>
                        <p className="cta-sub fade d2">
                            ERP-Lite demonstrates full-stack product systems thinking — problem framing, user research, architectural decisions, compliance design, and a live operational system. Open to product, systems engineering, and UX roles where this kind of thinking matters.
                        </p>
                        <div className="cta-btns fade d3">
                            <a href="#demo" className="cta-btn primary">Try Live Demo ↑</a>
                            <a
                                href="https://github.com/aburahatsabir/portfolio"
                                className="cta-btn secondary"
                                target="_blank"
                                rel="noreferrer"
                            >
                                ↗ GitHub Repository
                            </a>
                            <a href="/contact" className="cta-btn secondary">Contact Me</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HRDocsCaseStudy;



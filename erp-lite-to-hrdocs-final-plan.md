# ERP-Lite Content to HR Docs Build Plan

This file is the final plan for rebuilding the ERP-Lite case study using the current `HRDocsCaseStudy.tsx` design system only.

## Non-Negotiable Rule

The file below is **content only**:

- `D:\OneDrive - 55phcx\port\portfolio codex\erp-lite-v4-elite (1).html`

It is **not** the design source of truth.

The design, layout, spacing, component language, wrappers, font system, and visual grammar must come only from:

- [components/HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:2233)
- [hr-docs-case-study-verified-template.md](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/hr-docs-case-study-verified-template.md:1)
- [case-study-build-core-spec.md](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/case-study-build-core-spec.md:1)

## What Must Not Be Imported From ERP HTML

Do not carry over any of these as design decisions:

- `Instrument Serif`, `DM Sans`, `DM Mono`
- paper/beige color system
- fixed nav bar style
- editorial paper texture / grain treatment
- ERP hero split with right-side stat rail
- dark app-shell demo styling
- ERP-specific module grid visuals
- ERP-specific workflow card styling
- ERP-specific footer / CTA styling
- any ERP custom radii, chip styles, table treatments, or shadow system

Those are not allowed as UI source.

## What Can Be Imported From ERP HTML

Use the ERP file for:

- narrative
- section topics
- proof points
- KPIs
- workflow logic
- schema ideas
- compliance rules
- audit examples
- technical-decision copy
- role/persona content
- demo/artifact labels

## Final Build Principle

Build the new case study as:

- HR Docs structure
- HR Docs spacing
- HR Docs typography
- HR Docs class system
- HR Docs component language
- ERP-Lite content mapped into those existing components

## Core Narrative Theme

The new case study should read as:

- controls-first SME HR operating system
- unified employee records, attendance, leave, payroll, documentation, approvals, analytics, audit
- not “a pretty HR dashboard”
- not “an ERP landing page”
- a case study about replacing fragmented HR operations with a connected, auditable system

Three narrative pillars:

1. Fragmented HR operations created compliance and payroll risk.
2. ERP-Lite solved that with one connected data spine and explicit workflows.
3. Trust came from controls, auditability, and role-based access, not just interface polish.

## Recommended Final Section Order

This is the best build plan using current HR Docs sections and existing utility blocks only.

1. Hero
2. Overview
3. Problem Grid
4. Role-Based Research
5. Product Strategy
6. Core Modules
7. Mid CTA: Launch Demo
8. Workflow Deep Dive
9. Data Flow + Schema
10. Comparison
11. Compliance + Audit Evidence
12. Technical Decisions
13. Outcomes
14. Artifacts / Demo Screens
15. Reflections
16. Final CTA

This is longer than the default HR Docs page, but it still stays inside the current visual system because every added section comes from existing utility classes already present in the file.

## Section Mapping

Below is the exact mapping from ERP-Lite content to HR Docs structural sections.

---

## 1. Hero

Use:

- `NativeWebflowVsWordpressHero` structure
- `.wfvwp-hero__*` classes

Do not use:

- ERP hero right stat rail layout

Content source from ERP:

- eyebrow: `Case Study — HR Operations Platform · 2025`
- title:
  - `ERP-Lite`
  - `Integrated HR`
  - `Control System`
- summary:
  - the current hero thesis paragraph
- CTA 1:
  - `Launch Live Demo`
- CTA 2 if needed:
  - `Read the System Story`
- hero artifact:
  - one strong product artifact or dashboard screenshot

How to translate ERP hero stats:

- do **not** rebuild the ERP right-side stat panel
- move those four stats into either:
  - a hero meta strip using existing utility classes `.hero-meta`, `.hm`
  - or an outcomes stat band later in the page

Preferred choice:

- keep hero clean
- move hero metrics to the Outcomes section

Why:

- current HR Docs hero is cleaner and stronger
- the ERP right column is a different design language

---

## 2. Overview

Use:

- `.wfvwp-overview-section`
- `.wfvwp-overview-row`
- `.wfvwp-overview-col`

Purpose:

- compress the ERP hero thesis and the first problem framing into 2 paragraphs

Content:

- left heading:
  - something like `A unified HR control system for spreadsheet-heavy SMEs`
- right paragraph 1:
  - current ERP thesis + pain summary
- right paragraph 2:
  - one-sentence architecture summary + compliance summary

Do not:

- dump all problem detail here
- add cards or extra stats here

Keep it exactly as the current overview pattern.

---

## 3. Problem Grid

Use existing utility classes:

- `.pain-grid`
- `.pain-card`
- `.pain-n`
- `.pain-t`
- `.pain-b`
- `.pain-tag`
- `.chaos-strip`
- `.chaos-tags`

Content source:

- ERP section `01 PROBLEM`

Use all 6 pain cards:

1. Payroll preparation was a 3-day manual ordeal
2. Attendance lived in WhatsApp
3. HR documents stored in personal accounts
4. Approval decisions made on WhatsApp
5. Cross-department reporting impossible
6. Equipment custody invisible

Bottom chaos strip:

- use the pre-system infrastructure inventory as chaos tags

This section fits the current HR Docs utility library very well and should be used almost as-is at the content level.

---

## 4. Role-Based Research

Preferred component:

- `.wfvwp-cms-tabs-section`

Why this component:

- ERP research is structured by persona
- current CMS tabs component already supports:
  - title
  - intro
  - vertical tab list
  - expandable copy
  - stage visual

Final mapping:

- Tab 1: Managing Director
- Tab 2: Sr. HR Executive
- Tab 3: Operations Manager
- Tab 4: Operations Employee

Each tab should include:

- role label
- quote
- 2 to 3 distilled needs

Stage image for each tab:

- use a screenshot or artifact representing that role’s view

Suggested screenshots:

- MD: analytics overview / approval oversight
- HR: payroll + records
- Team Lead: leave approvals / attendance anomalies
- Employee: leave balance / payslip / self-service

Do not rebuild:

- ERP persona tab UI

You are only transferring the content structure, not the tab design.

Optional extra block after tabs:

- use `.alerts` for the 3 discovery findings

Those three findings are:

1. single source of truth was the unanimous demand
2. compliance controls were the actual business case
3. mobile-first was a structural requirement

---

## 5. Product Strategy

Preferred utility:

- `.feat-grid`

Why:

- ERP product strategy has 4 compact argument blocks
- current feature grid supports this exact density

Map the 4 strategy cards:

1. Why Lite: deliberate exclusions
2. Why 8 modules: connected, not isolated
3. Why controls were designed first
4. Why role-based access at API level

Each feature card should contain:

- mono label
- short title
- short body
- one short tag/rule if useful

Do not turn this into:

- FAQ
- long prose
- accordion unless the copy becomes too large

---

## 6. Core Modules

Use a combination of:

- `.tech-grid`
- optional `.wfvwp-why-section`

Recommended structure:

### 6A. Core Modules Grid

Use `.tech-grid` for the 8 modules:

1. Employee Records
2. Attendance & Time
3. Leave & Absence
4. Payroll Engine
5. Documentation
6. Approval Workflows
7. Analytics & Reporting
8. Audit Log

Why `.tech-grid`:

- existing 4-column card system
- clean enough for architectural modules
- no new design required

### 6B. If you want a more editorial explanation

Use `.wfvwp-why-section` after the grid for 3 deeper pillars:

1. Records as source of truth
2. Workflow orchestration across approvals/payroll/docs
3. Audit and compliance as trust layer

This lets the module grid stay dense while the Why section handles interpretation.

Do not import the ERP `module-connections` visual styling.

That belongs instead in Data Flow.

---

## 7. Mid CTA: Launch Demo

Use:

- `.wfvwp-migration-section`
- `.wfvwp-migration-card`

Purpose:

- transition from architecture explanation to proof

Content:

- title:
  - `Use the system live`
  - or `See the workflows in motion`
- body:
  - short explanation that the demo is seeded with employees, leave requests, document expiries, and approval states
- button:
  - `Launch Live Demo`

Important rule:

- do not reproduce the ERP live demo shell styling inside the case study page
- this section should link to or frame the demo, not redesign the page around it

If the live demo is embedded:

- keep the embed or screenshot inside an existing artifact/media frame
- do not bring in ERP demo chrome

---

## 8. Workflow Deep Dive

Use utility classes:

- `.workflow-tabs`
- `.workflow-tab`
- `.workflow-grid`
- `.state-machine-card`
- `.workflow-rules`

Content source:

- ERP section `06 WORKFLOWS`

Use exactly these 4 workflows:

1. Leave Request
2. Payroll Run
3. Document Control
4. Attendance Exception

For each workflow:

- state machine left side
- rules right side

This section should be preserved almost directly from the ERP logic, but rendered with the current HR Docs utility design.

This is one of the strongest content-to-existing-style fits.

---

## 9. Data Flow + Schema

Use:

- `.flow-table-wrap`
- `.flow-table`
- `.schema-box`
- `.schema-grid`

Content source:

- ERP section `07 DATA FLOW`

Recommended split:

### 9A. Data Flow Table

Use the layered table for:

- Employee Records
- Attendance & Time
- Leave & Absence
- Payroll Engine

Keep the 3 logical rows:

- Input
- Compute
- Output

### 9B. Schema Box

Use the schema section for the main entities:

- employees
- attendance_records
- leave_requests
- payroll_runs
- audit_log
- documents
- departments

Do not attempt to reproduce the ERP SVG style exactly.

Instead:

- use the existing schema card system from the HR Docs utility layer
- map entity content into `.schema-card` blocks

The ERP diagram is a content source, not a visual source.

---

## 10. Comparison

Use:

- `.wfvwp-compare-section`

This section should compare:

- old spreadsheet-heavy HR operations
- ERP-Lite target state

Recommended columns:

1. Feature / Domain
2. Before
3. After
4. Why it matters

Suggested rows:

- payroll processing
- leave management
- document control
- approval traceability
- cross-department reporting
- asset / exit clearance
- audit readiness

If you want a simpler section:

- use `.ba-grid` instead

Best choice:

- use `.wfvwp-compare-section` for formal structured comparison
- use `.ba-grid` later in Outcomes for concise before/after snapshots

---

## 11. Compliance + Audit Evidence

Use utility classes:

- `.compliance-grid`
- `.compliance-card`
- `.audit-sample`

Content source:

- ERP section `08 COMPLIANCE`

Compliance cards:

1. Record Keeping
2. Payroll & Leave Compliance
3. Data Protection
4. Audit Trail Architecture

Audit sample:

- use the sample audit log entries from ERP
- adapt wording only for consistency

This section should remain evidence-first, not marketing-first.

Do not lighten or simplify it too much.

This is one of the most important sections in the case study.

---

## 12. Technical Decisions

Preferred component:

- `.wfvwp-faq-section`

Why:

- ERP technical decisions are already structured as question/answer blocks
- current FAQ accordion can host this with no new design

Rename section:

- `Technical Decisions`
- or `Why The System Was Built This Way`

Suggested FAQ items:

1. Why PostgreSQL over a document database?
2. Why WhatsApp API for notifications?
3. Why separate records per entity for shared senior staff?
4. Why append-only audit log at database level?
5. Why API-level access control, not UI-level?

This is a clean reuse of an existing current component.

If you still need a second FAQ later:

- reserve the bottom FAQ only for implementation/adoption questions
- but if page length is too long, use FAQ only once here and skip a second FAQ

---

## 13. Outcomes

Use a combination of:

- `.g4` + `.impact-stat`
- `.wfvwp-business-impact-section`
- `.ba-grid`

Recommended internal structure:

### 13A. KPI Stat Band

Use `.g4` for the four major outcomes:

- 92% payroll processing reduction
- 100% audit coverage
- 4s document retrieval
- 0 post-exit document loss

### 13B. Business Impact Card

Use `.wfvwp-business-impact-section` for the strategic payoff:

- title around operational control and trust
- body around reduced processing, compliance confidence, and unified visibility
- CTA to see artifacts or launch demo

### 13C. Before / After Grid

Use `.ba-grid` for the four domains:

- Payroll Operations
- Leave Management
- Document Control
- Management Visibility

This is the correct place for the ERP before/after rows.

---

## 14. Artifacts / Demo Screens

Use:

- `.wfvwp-g2-section`

Purpose:

- artifact proof
- module screenshots
- demo screenshots

Do not:

- embed the ERP live demo shell styling

Instead use 3 to 5 clean artifact tabs such as:

1. Dashboard
2. Leave Workflow
3. Payroll Run
4. Document Control
5. Audit Log

Each tab:

- title
- short description
- one screenshot or artifact

This section becomes the “proof gallery” for the system.

---

## 15. Reflections

Use:

- `.learning-grid`

Content source:

- ERP section `11 REFLECTIONS`

Map the 3 reflection cards:

1. Compliance infrastructure is the product
2. Multi-entity isolation is harder and more important than it looks
3. Biometric integration and mobile-native are clear v2 priorities

This section should stay short and thoughtful.

Do not expand it into another full essay section.

---

## 16. Final CTA

Use:

- `.wfvwp-demo-section`

Purpose:

- final conversion point

Content:

- title around seeing, using, or building systems like this
- short supporting line
- one paragraph
- 3 support bullets
- one CTA

Suggested support bullets:

- workflow architecture
- compliance-first product thinking
- live operational demo

Suggested CTA:

- `Launch Live Demo`
- `View Repository`
- `Contact Me`

Use the current bottom CTA visual language only.

Do not use ERP CTA styling.

## Recommended Compression Version

If the full 16-section version feels too long, compress into this:

1. Hero
2. Overview
3. Problem Grid
4. Role-Based Research
5. Product Strategy + Core Modules
6. Mid CTA
7. Workflow Deep Dive
8. Data Flow + Schema
9. Comparison
10. Compliance + Audit Evidence
11. Technical Decisions
12. Outcomes
13. Artifacts
14. Final CTA

This is the best short version without losing the ERP content story.

## Content Source Map

Use this exact mapping from ERP HTML to rebuilt case study:

- ERP Hero → Hero + Outcomes stat band
- ERP Problem → Overview + Problem Grid
- ERP Research → Role-Based Research
- ERP Product Strategy → Product Strategy
- ERP Module Architecture → Core Modules
- ERP Live Demo → Mid CTA + Artifacts
- ERP Workflows → Workflow Deep Dive
- ERP Data Flow → Data Flow + Schema
- ERP Compliance → Compliance + Audit Evidence
- ERP Technical Decisions → Technical Decisions
- ERP Outcomes → Outcomes
- ERP Reflections → Reflections
- ERP CTA → Final CTA

## Final Decision

Yes, you should rebuild this case study in the HR Docs design system.

Do it like this:

1. Treat ERP HTML as content only.
2. Keep `HRDocsCaseStudy.tsx` as the structural and visual source of truth.
3. Use the existing major sections plus approved utility sections only.
4. Do not import any ERP styling decisions.
5. If a content block does not fit a current section, use an existing utility block instead of creating a new design.

That gives you the strongest outcome:

- richer case study content
- zero design drift
- full consistency with the current portfolio case-study system

## Section-by-Section Build Brief

This brief is the execution version of the plan above.

Important override:

- proceed without screenshots
- do not block layout planning on media availability
- where the current HR Docs system expects a media slot, keep the existing slot but treat it as optional, deferred, or reusable with current repo assets only
- copy structure must be finalizable before any artifact selection

Below, each section includes:

- component / pattern to use
- exact headline direction
- exact subhead direction
- copy limits
- required content blocks
- what to avoid

---

## 1. Hero Build Brief

Use:

- `NativeWebflowVsWordpressHero`
- existing `.wfvwp-hero__*` structure only

Headline:

- `ERP-Lite`
- `Integrated HR Documentation`
- `and Control System`

Subhead:

- `A controls-first HR operations platform for spreadsheet-heavy SMEs, unifying records, attendance, leave, payroll inputs, documentation, approvals, and audit trails in one governed workflow.`

Copy limits:

- eyebrow: max 8 words
- headline: 3 lines max
- subhead: 28 to 38 words
- primary CTA label: max 4 words
- secondary CTA label: max 5 words

CTA set:

- primary: `Launch Live Demo`
- secondary: `Read the System Story`

Hero notes:

- keep the hero clean
- do not place the 4 ERP metrics here
- do not add operational cards, rail stats, badges, or chips beyond what the current hero already supports

---

## 2. Overview Build Brief

Use:

- `.wfvwp-overview-section`

Headline:

- `A unified HR control system for fragmented SME operations`

Subhead behavior:

- none as a separate line
- use the standard two-paragraph overview copy on the right

Copy limits:

- left heading: 8 to 12 words
- paragraph 1: 55 to 75 words
- paragraph 2: 45 to 65 words
- total overview copy: max 140 words

Content intent:

- paragraph 1: summarize the pre-system operating problem
- paragraph 2: summarize the system solution and trust model

Must include:

- fragmented spreadsheets
- WhatsApp approvals
- scattered documents
- connected workflows
- auditability

Avoid:

- listing all 8 modules
- repeating hero language too closely

---

## 3. Problem Grid Build Brief

Use:

- `.pain-grid`
- `.pain-card`
- `.chaos-strip`

Headline:

- `Fragmented records. Delayed payroll. Zero traceability.`

Subhead:

- `A 120-employee SME was running HR through spreadsheets, chat threads, and personal folders. Payroll was slow, approvals were untraceable, and compliance readiness depended on memory.`

Copy limits:

- section subhead: 24 to 34 words
- each pain card title: max 9 words
- each pain card body: 40 to 65 words
- each pain tag: max 8 words
- chaos strip label: max 8 words
- chaos tags: max 12 tags, 2 to 4 words each

Required cards:

1. Payroll preparation was a 3-day manual ordeal
2. Attendance lived in WhatsApp and was unverifiable
3. HR documents were stored in personal accounts
4. Approval decisions existed only in chat history
5. Cross-department reporting was structurally impossible
6. Equipment custody and exit clearance were invisible

Avoid:

- adding a 7th card
- turning cards into long narrative blocks
- softening the operational severity

---

## 4. Research Personas Build Brief

Use:

- `.wfvwp-cms-tabs-section`

Headline:

- `Four roles exposed the real operating failures`

Subhead:

- `Discovery showed that every user wanted the same thing in different language: one trusted system of record, clear approvals, and decisions that survive staff turnover.`

Copy limits:

- section subhead: 28 to 36 words
- each tab label: max 3 words
- each persona quote: 22 to 36 words
- each persona need: 8 to 16 words
- needs per persona: exactly 3
- persona meta line: max 12 words

Tabs:

1. Managing Director
2. Sr. HR Executive
3. Operations Manager
4. Operations Employee

Follow-up findings block:

- use 3 compact finding cards below the tabs

Finding headlines:

1. `Single source of truth was the unanimous demand`
2. `Compliance controls were the real buying trigger`
3. `Mobile-first was a structural requirement`

Finding body limits:

- 24 to 40 words each

Avoid:

- extra personas
- screenshots as required inputs
- duplicating the ERP persona tab design

---

## 5. Product Strategy Build Brief

Use:

- existing feature grid / compact card pattern

Headline:

- `Focused scope. Complete operations. No enterprise overhead.`

Subhead:

- `ERP-Lite was not scoped as a smaller enterprise suite. It was scoped as a credible HR control system for SME operating realities.`

Copy limits:

- section subhead: 20 to 30 words
- strategy card title: max 9 words
- strategy card body: 35 to 55 words
- strategy note / kicker: max 14 words
- cards: exactly 4

Card set:

1. Why Lite: deliberate exclusions
2. Why 8 modules: connected, not isolated
3. Why controls were designed first
4. Why API-level role access matters

Avoid:

- FAQs here
- technical deep dives here
- introducing implementation detail too early

---

## 6. Core Modules Build Brief

Use:

- module grid using current HR Docs card language
- optional follow-up `.wfvwp-why-section` for interpretation

Headline:

- `Eight modules. One connected operating model.`

Subhead:

- `Every module exists because it closes a dependency loop: records feed workflows, workflows feed payroll, and every state change feeds auditability.`

Copy limits:

- section subhead: 24 to 32 words
- module card title: max 4 words where possible
- module description: 18 to 28 words
- badge label: 1 word preferred, 2 max
- total modules: exactly 8

Modules:

1. Employee Records
2. Attendance and Time
3. Leave and Absence
4. Payroll Engine
5. Documentation
6. Approval Workflows
7. Analytics and Reporting
8. Audit Log

Optional interpretation row:

- `Records are the source of truth`
- `Workflows carry operational decisions`
- `Audit and access control create trust`

Avoid:

- ERP module icons if they feel off-brand
- ERP module connection styling
- long descriptive cards

---

## 7. Mid CTA Build Brief

Use:

- `.wfvwp-migration-section`

Headline:

- `See the workflows in motion`

Subhead:

- `The live demo is seeded with employees, pending approvals, payroll states, attendance anomalies, and document expiry conditions so the operating logic can be inspected end to end.`

Copy limits:

- heading: max 7 words
- body: 28 to 40 words
- CTA label: max 4 words

CTA:

- `Launch Live Demo`

No-screenshot rule:

- this section must work with copy only
- media frame can stay empty, use current neutral asset, or be deferred

Avoid:

- embedding the ERP dark app shell style into the case study section itself

---

## 8. Workflow Deep Dive Build Brief

Use:

- `.workflow-tabs`
- `.workflow-grid`
- `.state-machine-card`
- `.workflow-rules`

Headline:

- `Every workflow has an explicit state machine`

Subhead:

- `The system was designed around irreversible states, approval boundaries, escalation rules, and payroll consequences rather than optimistic happy-path UI flows.`

Copy limits:

- section subhead: 22 to 32 words
- workflow tabs: max 3 words each
- state label: 1 to 3 words
- state detail: 10 to 22 words
- rule title: max 10 words
- rule body: 18 to 35 words
- rules per workflow: 2 to 4

Workflows:

1. Leave Request
2. Payroll Run
3. Document Control
4. Attendance Exception

Avoid:

- reducing the states too aggressively
- visual innovation beyond the current workflow utility styling

---

## 9. Data Flow and Schema Build Brief

Use:

- `.flow-table-wrap`
- `.flow-table`
- `.schema-box`
- `.schema-grid`

Headline:

- `One data spine supports every downstream decision`

Subhead:

- `The data model was defined before the UI so validation, approvals, payroll logic, and audit evidence could rely on the same canonical entities.`

Copy limits:

- section subhead: 24 to 32 words
- flow cell title: max 4 words
- flow cell body: 10 to 24 words
- entity title: max 2 words
- fields per entity: 4 to 6
- schema cards: 6 to 7

Flow table structure:

- rows: `Input`, `Compute`, `Output`
- columns: `Employee Records`, `Attendance and Time`, `Leave and Absence`, `Payroll Engine`

Schema entities:

- employees
- attendance_records
- leave_requests
- payroll_runs
- audit_log
- documents
- departments

Avoid:

- rebuilding the ERP SVG
- overexplaining the schema in paragraph form

---

## 10. Comparison Build Brief

Use:

- `.wfvwp-compare-section`

Headline:

- `Before and after the operating model changed`

Subhead:

- none required if the compare table already carries enough weight

Copy limits:

- row labels: max 4 words
- before cell: 8 to 18 words
- after cell: 8 to 18 words
- why it matters cell: 10 to 18 words
- rows: 6 or 7

Required rows:

1. Payroll processing
2. Leave management
3. Document control
4. Approval traceability
5. Cross-department reporting
6. Exit clearance
7. Audit readiness

Avoid:

- turning this into marketing copy
- vague labels like `better workflow`

---

## 11. Compliance and Audit Evidence Build Brief

Use:

- `.compliance-grid`
- `.compliance-card`
- `.audit-sample`

Headline:

- `Compliance is enforced by architecture, not policy alone`

Subhead:

- `Record retention, document expiry, payroll locking, export visibility, and immutable auditability are system behaviors, not team promises.`

Copy limits:

- section subhead: 18 to 28 words
- compliance card title: max 4 words
- checks per card: exactly 4
- each check: 12 to 24 words
- audit entry count: 5 to 6
- audit entry line: max 22 words after metadata

Compliance cards:

1. Record Keeping
2. Payroll and Leave Compliance
3. Data Protection
4. Audit Trail Architecture

Audit sample:

- keep it evidence-first
- short, log-like, specific

Avoid:

- softening the operational rigor
- generic compliance buzzwords with no mechanism

---

## 12. Technical Decisions Build Brief

Use:

- `.wfvwp-faq-section`

Headline:

- `Why the system was built this way`

Subhead:

- optional
- if used: `Every technical choice answered a real operating constraint rather than a stack preference.`

Copy limits:

- question: max 11 words
- answer: 45 to 90 words
- items: exactly 5

Questions:

1. Why PostgreSQL over a document database?
2. Why WhatsApp API for notifications?
3. Why separate records for shared senior staff?
4. Why append-only audit logging at database level?
5. Why API-level access control instead of UI-level hiding?

Avoid:

- adding framework trivia
- bloated engineering explanations

---

## 13. Outcomes Build Brief

Use:

- stat band
- `.wfvwp-business-impact-section`
- before/after support grid if needed

Headline:

- `The system changed both speed and trust`

Subhead:

- `The measurable gains came from structure: fewer handoffs, fewer invisible decisions, faster retrieval, and payroll logic driven by source data instead of reconciliation work.`

Copy limits:

- section subhead: 24 to 34 words
- KPI value: 1 short value
- KPI label: max 4 words
- KPI note: 6 to 12 words
- KPI count: exactly 4

KPI set:

1. `92%` Payroll processing reduction
2. `100%` Audit coverage
3. `4s` Document retrieval
4. `0` Post-exit document loss

Business impact body:

- 45 to 70 words

Avoid:

- adding ungrounded numbers not already supported by the ERP content

---

## 14. Artifacts and Proof Build Brief

Use:

- `.wfvwp-g2-section` or existing proof tab structure

Headline:

- `Operational proof, not feature theater`

Subhead:

- `This section should hold the strongest product evidence available, but the page structure must remain valid even before final media is added.`

Copy limits:

- artifact title: max 4 words
- artifact description: 16 to 28 words
- artifact count: 3 to 5

Artifact tab set:

1. Dashboard
2. Leave Workflow
3. Payroll Run
4. Document Control
5. Audit Log

No-screenshot execution rule:

- write all tab titles and descriptions now
- keep media slots optional
- if no image exists, use existing HR Docs framing and defer image insertion

Avoid:

- rebuilding the ERP demo inside this section

---

## 15. Reflections Build Brief

Use:

- 3-card reflection / learning grid using current utility styling

Headline:

- `What this project proved`

Subhead:

- none required

Copy limits:

- card title: max 10 words
- card body: 30 to 55 words
- cards: exactly 3

Card set:

1. Compliance infrastructure is the product
2. Multi-entity isolation is a real architecture problem
3. Biometric attendance and mobile-native are the right v2 bets

Avoid:

- long retrospective prose
- introducing new roadmap areas not grounded in the ERP narrative

---

## 16. Final CTA Build Brief

Use:

- `.wfvwp-demo-section`

Headline:

- `See it. Use it. Build with this level of system thinking.`

Subhead:

- `ERP-Lite demonstrates product thinking rooted in operations, controls, workflow design, and implementation realism.`

Copy limits:

- headline: max 12 words
- supporting sentence: 14 to 22 words
- paragraph: 26 to 40 words
- support bullets: exactly 3
- bullet length: 2 to 5 words each
- CTA count: 2 or 3 max

Support bullets:

- `Workflow architecture`
- `Compliance-first thinking`
- `Live operational proof`

CTAs:

- `Launch Live Demo`
- `View Repository`
- `Contact Me`

Avoid:

- decorative extra messaging
- new CTA styling

---

## Copy Discipline Rules

Apply these globally:

- no section should feel denser than the current HR Docs reading rhythm
- do not let any supporting paragraph exceed 90 words
- prefer 1 strong sentence over 2 soft ones
- card copy should explain one idea only
- if a section starts reading like documentation instead of case-study narrative, compress it

## Build Priority Order

Write content in this order:

1. Hero
2. Overview
3. Problem Grid
4. Research Personas
5. Product Strategy
6. Core Modules
7. Workflow Deep Dive
8. Data Flow and Schema
9. Compliance and Audit
10. Technical Decisions
11. Outcomes
12. Reflections
13. Final CTA
14. Mid CTA
15. Comparison
16. Artifacts

Why this order:

- it locks narrative first
- then operating logic
- then proof and conversion
- and it avoids getting blocked by missing media

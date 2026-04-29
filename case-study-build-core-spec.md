# Case Study Build Core Spec

This file is the practical build spec for creating a new case study using the current `HRDocsCaseStudy.tsx` system only.

The rule is simple:

- do not invent a new design system
- do not introduce new wrappers, typography, spacing logic, or component language
- build the new case study by reusing the current structure, classes, ratios, and visual vocabulary

Source of truth:

- [components/HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:2233)
- [hr-docs-case-study-verified-template.md](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/hr-docs-case-study-verified-template.md:1)

## Core Theme

The current case-study visual language is:

- clean white editorial SaaS case-study shell
- dark ink typography on white
- restrained indigo/blue accent system
- subtle slate borders and very light gray backgrounds
- medium-soft radii, mostly `8px`, `10px`, `12px`
- product-style artifact framing, not marketing-noise decoration
- mono labels for metadata, states, tags, and governance language
- heavy use of large, calm section headings with compact supporting body copy

The page should feel:

- operational
- governed
- credible
- systematic
- premium, but not flashy

Do not turn it into:

- startup landing-page hype
- glassmorphism-heavy redesign
- colorful card collage
- dark theme
- magazine-style experimental layout

## Global Design Tokens

Exact root tokens from the current page:

```css
--brand:#4F46E5;
--brand-hover:#4338CA;
--brand-light:#EEF2FF;
--brand-border:#C7D2FE;
--w:#FFFFFF;
--off:#F8FAFC;
--off2:#F1F5F9;
--ink:#0F172A;
--ink2:#1E293B;
--ink3:#64748B;
--ink4:#94A3B8;
--ln:#E2E8F0;
--ln2:#CBD5E1;
--gm:#059669;
--gbg:#ECFDF5;
--gdk:#065F46;
--rm:#DC2626;
--rbg:#FEF2F2;
--am:#D97706;
--abg:#FFFBEB;
--bm:#2563EB;
--bbg:#EFF6FF;
```

Usage rules:

- primary accent: `--brand`
- primary accent surface: `--brand-light`
- default page background: `--w`
- soft section/card surface: `--off`
- default heading/body ink: `--ink`
- secondary body text: `--ink2`
- supporting text: `--ink3`
- low-emphasis/meta text: `--ink4`
- structural borders: `--ln`
- hover/stronger border: `--ln2`
- semantic success: `--gm`, `--gbg`
- semantic danger: `--rm`, `--rbg`
- semantic warning: `--am`, `--abg`
- semantic info: `--bm`, `--bbg`

## Typography System

Exact font family stack:

- Sans: `Plus Jakarta Sans`
- Mono: `JetBrains Mono`
- Alternate visual font already present: `WF Visual Sans Variable`

Usage rules:

- use `Plus Jakarta Sans` for almost all body and heading content
- use `JetBrains Mono` only for labels, states, meta, tags, IDs, and system indicators
- use `WF Visual Sans Variable` only where the existing sections already use it

## Global Page Rules

Keep these unchanged:

- page root: `.fmcg-case-study`
- main width wrapper: `max-w-7xl mx-auto px-6 w-full`
- content wrapper: `.wfvwp-page-main`
- standard section rhythm: `padding: clamp(3rem, calc(2.4285714286rem + 2.8571428571vw), 5rem) 0`
- hero top rhythm: larger than all other sections

Do not change:

- base container width
- spacing rhythm
- section order unless using optional existing section types from the utility library
- radius system
- border color family
- type scale strategy

## Global Type Scale

These are the most important recurring text sizes in the current system.

### Primary Hero

- Hero eyebrow: `clamp(1rem, ..., 1.25rem)`, weight `600`
- Hero title: `clamp(2.75rem, ..., 5rem)`, line-height `1.04`, weight `700`
- Hero body: `clamp(1.1rem, ..., 1.25rem)`, line-height `1.5`, weight `500`
- Hero button: `16px`, line-height `1.2`, weight `600`

### Large Section Headers

- Overview heading: `clamp(2rem, ..., 3.5rem)`, line-height `1.04`, weight `700`
- Why heading: `clamp(2rem, ..., 3.5rem)`, line-height `1.04`, weight `700`
- G2/Artifacts heading: `clamp(2rem, ..., 3.5rem)`, line-height `1.04`, weight `600`
- FAQ heading: `clamp(2rem, ..., 3.5rem)`, line-height `1.04`, weight `600`
- Bottom CTA title: `clamp(2rem, ..., 3.5rem)`, line-height `1.04`, weight `600`

### Mid Section Headers

- CMS tabs title: `clamp(1.75rem, ..., 2.5rem)`, line-height `1.2`, weight `700`
- Why row title: `clamp(1.75rem, ..., 2.5rem)`, line-height `1.2`, weight `700`
- Migration CTA title: `clamp(1.375rem, ..., 2rem)`, line-height `1.2`, weight `600`
- Artifact/G2 tab title: `clamp(1.125rem, ..., 1.25rem)`, line-height `1.4`, weight `600`
- FAQ question: `clamp(1.125rem, ..., 1.25rem)`, line-height `1.4`, weight `500`

### Body Copy

- Overview body: `clamp(1.1rem, ..., 1.25rem)`, line-height `1.5`, weight `400`
- Standard section intro/body: `1rem`, line-height `1.6`, weight `400`
- Utility narrative body: `13px` to `16px`, usually weight `300-400`

### Mono / Meta

- Eyebrow meta labels: `10px` to `12px`
- Tags and pills: `10px` to `11px`
- State pills: `11px`

## Layout Language

The current page has 3 dominant layout patterns:

1. Centered hero copy plus wide artifact media
2. Split narrative sections with text on one side and image/media on the other
3. Grid-based evidence sections with cards, tables, tabs, or workflow blocks

Recurring ratios:

- overview columns: `41.6667% / 41.6667%`
- hero copy column: `83.3333%`
- why content column: `41.6667%`
- business impact: `5fr / 7fr`
- bottom CTA: grid split with copy + media

## Core Section Library

These are the approved major section types already present in the current system.

### 1. Hero

Class family:

- `.wfvwp-hero__*`

Structure:

- eyebrow
- H1
- summary
- CTA
- artifact image/card

Design:

- white section background
- dark artifact shell with framed visual
- subtle entrance animation
- blue CTA

Use for:

- case study title
- short framing statement
- first artifact or system screenshot

### 2. Overview

Class family:

- `.wfvwp-overview-*`

Structure:

- left column large heading
- right column two narrative paragraphs

Design:

- very clean
- no heavy card shell
- pure text-first section

Use for:

- context
- business problem
- transformation summary

### 3. Artifact Tabs

Class family:

- `.wfvwp-cms-tabs-*`

Structure:

- left stage/spacer
- right content stack
- title
- intro
- vertical tab list
- progress bars
- expandable copy

Design:

- editorial/product hybrid
- clean, interactive, vertical tab system

Use for:

- core modules
- product surfaces
- artifact walk-throughs
- platform capabilities

### 4. Principles

Class family:

- `.wfvwp-why-*`

Structure:

- centered intro
- repeated tall rows
- left copy
- right sticky image

Design:

- long-scroll explanatory section
- image changes with active content

Use for:

- principles
- architecture choices
- control logic
- reasons the system works

### 5. Mid CTA

Class family:

- `.wfvwp-migration-*`

Structure:

- dark premium card
- strong title
- supporting paragraph
- one CTA
- supporting cover image

Design:

- dark card
- blue button
- high-contrast interruption section

Use for:

- transition between narrative and proof
- push to deeper artifact review
- “see the system / book demo / explore module” type prompt

### 6. Proof

Class family:

- `.wfvwp-customers-*`
- `.wfvwp-customers-slider-*`

Structure:

- intro row
- supporting badge grid
- testimonial slider

Design:

- trust-building
- social proof
- clean panel cards

Use for:

- stakeholders
- user quotes
- validation
- outcome proof

### 7. Comparison

Class family:

- `.wfvwp-compare-*`

Structure:

- intro heading
- wide comparison table
- expandable notes

Design:

- table-first
- no replacement by stacked cards unless you accept reduced parity

Use for:

- before vs after
- old process vs new process
- spreadsheet vs governed system
- tool comparison

### 8. Impact

Class family:

- `.wfvwp-business-impact-*`

Structure:

- dark premium card
- left text column
- right product/impact image
- CTA

Design:

- large, high-contrast, premium payoff section

Use for:

- biggest measurable outcome
- strategic payoff
- value statement

### 9. Artifacts

Class family:

- `.wfvwp-g2-*`

Structure:

- title
- intro
- vertical tab list
- stage image tied to selected tab

Design:

- white background
- visual font variation
- artifact-first section

Use for:

- supporting screenshots
- evidence surfaces
- module screenshots
- operational screenshots

### 10. FAQ

Class family:

- `.wfvwp-faq-*`

Structure:

- left sticky heading
- right accordion list

Design:

- minimal, clean, border-driven
- strong information density

Use for:

- objections
- implementation questions
- audience qualification
- rollout clarifications

### 11. Bottom CTA

Class family:

- `.wfvwp-demo-shell-*`

Structure:

- title
- subheading
- body
- support bullet list
- CTA
- side media stack

Design:

- final closing section
- white background
- large editorial ending

Use for:

- final action
- next step
- contact/demo/request review

## Optional Existing Utility Section Library

You said the next case study is not required to use exactly the current 11-section sequence. That is fine, but any additional section must come from the existing utility vocabulary already present in the page style block.

Below are the approved optional structures.

### Hero Meta Strip

Classes:

- `.hero-meta`
- `.hm`
- `.hm-label`
- `.hm-val`

Design:

- horizontal metadata row
- top border
- mono labels
- small values

Use for:

- scope
- timeline
- users
- result

### Two-Column Context Block

Classes:

- `.two-col`
- `.context-quote`
- `.stakeholders-list`
- `.stakeholder-card`

Design:

- text + quote or stakeholder panel

Use for:

- problem framing
- stakeholder map
- executive quote

### Pain / Problem Grid

Classes:

- `.pain-grid`
- `.pain-card`
- `.pain-n`
- `.pain-t`
- `.pain-b`
- `.pain-tag`
- `.chaos-strip`
- `.chaos-tags`

Design:

- bordered 3-column evidence grid
- optional bottom strip for issue tags

Use for:

- initial diagnostic
- root causes
- operational failures

### Feature / Capability Grid

Classes:

- `.feat-grid`
- `.feat`
- `.feat-n`
- `.feat-t`
- `.feat-d`
- `.feat-tag`

Design:

- 3-column bordered grid

Use for:

- solution pillars
- governance capabilities
- system modules

### Before / After Grid

Classes:

- `.ba-grid`
- `.ba-card`
- `.ba-head`
- `.ba-row`

Design:

- 2-column comparison cards
- red/green visual polarity

Use for:

- operational change summary
- manual vs automated outcomes

### Tech / Layer Grid

Classes:

- `.tech-grid`
- `.tech-card`
- `.tech-layer`
- `.tech-title`
- `.tech-items`
- `.tech-item`

Design:

- 4-up card grid

Use for:

- stack breakdown
- architecture layers
- implementation surfaces

### Alert Strip

Classes:

- `.alerts`
- `.alert`
- `.al-icon`
- `.al-title`

Design:

- 3-up alert row

Use for:

- risks
- controls
- warnings
- operational notes

### Impact Stat Grid

Classes:

- `.g4`
- `.impact-stat`
- `.stat-num`
- `.stat-unit`
- `.stat-desc`

Design:

- 4-column numeric stat band

Use for:

- KPI outcomes
- time savings
- error reductions
- throughput gains

### Learning / Insight Cards

Classes:

- `.learning-grid`
- `.learning-card`
- `.lc-num`
- `.lc-cat`
- `.lc-title`
- `.lc-body`
- `.lc-rule`

Design:

- 2-column reflective card set

Use for:

- lessons learned
- implementation insights
- future rules

### Chart Card

Classes:

- `.chart-card`
- `.cc-head`
- `.cc-t`
- `.cc-s`
- `.cc-body`

Design:

- bordered analytics card

Use for:

- metric snapshots
- variance chart
- activity chart

### Workflow Deep Dive

Classes:

- `.workflow-tabs`
- `.workflow-tab`
- `.workflow-grid`
- `.state-machine-card`
- `.state-machine-head`
- `.state-machine-row`
- `.state-machine-arrow`
- `.state-pill`
- `.workflow-rules`
- `.workflow-rule`

Design:

- tabbed workflow selection
- state machine on one side
- rule cards on the other

Use for:

- approvals
- payroll flow
- document lifecycle
- access workflow

### Process Matrix Table

Classes:

- `.flow-table-wrap`
- `.flow-table`
- `.flow-layer`
- `.flow-cell`
- `.flow-cell-label`

Design:

- dense wide table

Use for:

- layered architecture
- process ownership
- responsibility mapping

### Schema Section

Classes:

- `.schema-box`
- `.schema-head`
- `.schema-body`
- `.schema-legend`
- `.schema-grid`
- `.schema-card`

Design:

- bordered schema box
- legend pills
- 4-column schema cards

Use for:

- data model
- document model
- workflow entities

### Compliance Grid

Classes:

- `.compliance-grid`
- `.compliance-card`
- `.compliance-head`
- `.compliance-body`

Design:

- 2-column governance/compliance cards

Use for:

- audit controls
- compliance checks
- legal safeguards

### Audit Sample

Classes:

- `.audit-sample`
- `.audit-head`
- `.audit-list`
- `.audit-entry`
- `.audit-event`

Design:

- dense evidence log sample

Use for:

- audit trail proof
- append-only history
- event evidence

### Legacy CTA Section

Classes:

- `.cta-section`
- `.cta-inner`
- `.cta-kicker`
- `.cta-heading`
- `.cta-sub`
- `.cta-btns`
- `.cta-btn`

Design:

- centered closing CTA block
- softer than the current demo shell

Use for:

- alternate final CTA
- secondary close

## Recommended Build Blueprint

If you want the strongest case study using only the current system, use this composition:

1. Hero
2. Overview
3. Pain Grid
4. Artifact Tabs
5. Principles
6. Workflow Deep Dive
7. Comparison
8. Impact Stat Grid
9. Business Impact
10. Artifacts
11. Compliance Grid
12. Audit Sample
13. FAQ
14. Bottom CTA

This keeps the design language strict while allowing more depth than the current default 11-section flow.

## Section-by-Section Content Guidance

### Hero

Content required:

- category eyebrow
- single strong headline
- one-paragraph framing
- one CTA
- one hero artifact

Avoid:

- multiple CTAs
- long copy
- decorative floating content outside existing pattern

### Overview

Content required:

- one high-level section heading
- exactly two paragraphs

Use it to answer:

- what was broken
- what was built

### Pain Grid

Content required:

- 3 core pains
- each pain gets a label, short title, short body, one tag

### Artifact Tabs

Content required:

- 3 to 5 artifact/module items
- each needs title, short body, optional CTA, optional stage visual

### Principles

Content required:

- 3 to 5 rows
- each row = one principle, one image

### Workflow Deep Dive

Content required:

- 2 to 4 workflow tabs
- each workflow = states + arrows + rules

### Comparison

Content required:

- 1 heading
- 3 or 4 columns
- 5 to 10 rows

### Impact Stat Grid

Content required:

- 3 to 4 KPIs only
- short descriptive line under each

### Business Impact

Content required:

- 2 or 3 headline lines
- short paragraph
- one CTA
- one large proof visual

### Artifacts

Content required:

- 3 artifacts minimum
- screenshots must be clean and related to operational proof

### Compliance Grid

Content required:

- 2 to 4 compliance blocks
- each block should feel like a control, not marketing copy

### Audit Sample

Content required:

- 4 to 8 realistic audit entries

### FAQ

Content required:

- 4 to 8 questions

### Bottom CTA

Content required:

- title
- short subheading
- paragraph
- 3 support bullets
- one CTA

## Strict Build Rules

Allowed:

- rearranging or adding sections from the approved existing library
- changing copy
- changing images
- changing data arrays
- changing case-study-specific content labels

Not allowed if you want strict consistency:

- new font families
- new color system
- new card radius logic
- new layout container widths
- new section wrapper naming
- new animation style
- new button language
- new component vocabulary outside current classes

## Final Build Method

Build the next case study like this:

1. Copy `HRDocsCaseStudy.tsx` into a new case-study file.
2. Keep the full inline style block unchanged.
3. Preserve the root wrappers and existing class names.
4. Decide which sections come from the core 11-section system.
5. Add only optional sections from the existing utility library above.
6. Replace content, artifacts, and data only.

That is the strictest way to rebuild a new case study with full parity and no new design.

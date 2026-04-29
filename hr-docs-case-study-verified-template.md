# HR Docs Case Study Template Audit

This file is a verified structural guide for building another case study by copying the current `HRDocsCaseStudy.tsx` system exactly.

No component code was changed during this audit. The source of truth remains:

- [components/HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:2233)

## Audit Status

Verified against the current repo file state:

- `HRDocsCaseStudy.tsx` is currently `6367` lines.
- The page root component starts at line `2233`.
- The inline style block starts at line `3189`.
- The `<main id="main" className="wfvwp-page-main">` wrapper starts at line `6589`.
- The inline overview section inside the main return starts at line `6590`.

This means the earlier guidance was structurally correct, but some line numbers had shifted.

## Source Anchors

Main structural component declarations:

- Hero component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:73)
- CMS tabs section component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:809)
- Why/principles section component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1106)
- Mid CTA section component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1267)
- Customers/proof section component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1392)
- Comparison section component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1547)
- Business impact section component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1712)
- G2/artifacts section component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1867)
- FAQ section component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1989)
- Bottom CTA/demo section component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:2067)
- Root page component: [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:2233)

Main section anchors in the rendered page:

- Hero markup begins at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:129)
- Hero title at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:139)
- Hero body at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:143)
- CMS tabs section markup at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:986)
- Why section markup at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1183)
- Mid CTA markup at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1319)
- Customers/proof markup at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1403)
- Comparison markup at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1561)
- Business impact markup at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1764)
- G2/artifacts markup at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1919)
- FAQ markup at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:2001)
- Bottom CTA/demo markup at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:2119)
- `<main>` wrapper at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:6589)
- Inline overview section at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:6590)

## Verified Core Shell

Use this page shell unchanged:

```tsx
<div className="fmcg-case-study">
  <style>{`...full inline style block copied unchanged...`}</style>

  <HeroComponent />

  <main id="main" className="wfvwp-page-main">
    <OverviewSection />
    <TabsSection />
    <WhySection />
    <MigrationCtaSection />
    <CustomersSection />
    <ComparisonTableSection />
    <BusinessImpactSection />
    <G2TabsSection />
    <FaqSection />
    <ScheduleDemoSection />
  </main>
</div>
```

## Verified Section Order

This is the current rendered order:

1. `NativeWebflowVsWordpressHero`
2. `wfvwp-overview-section`
3. `NativeWebflowVsWordpressCmsTabs`
4. `NativeWebflowVsWordpressWhySection`
5. `NativeWebflowVsWordpressMigrationCta`
6. `NativeWebflowVsWordpressCustomersSection`
7. `NativeWebflowVsWordpressComparisonTable`
8. `NativeWebflowVsWordpressBusinessImpactSection`
9. `NativeWebflowVsWordpressG2Section`
10. `NativeWebflowVsWordpressFaqSection`
11. `NativeWebflowVsWordpressScheduleDemoSection`

Keep that sequence exactly if the goal is full visual parity.

## Global Wrapper Rules

Do not change these:

- Page root: `.fmcg-case-study`
- Main content width wrapper: `max-w-7xl mx-auto px-6 w-full`
- Main content wrapper: `.wfvwp-page-main`

Do not swap to another container system.

## Typography and Base System

The page-level visual system starts in the inline style block at [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:3189).

Verified fonts:

- Body/headings: `Plus Jakarta Sans`
- Mono: `JetBrains Mono`
- Additional visual font available: `WF Visual Sans Variable`

Verified base tokens:

- Heading/body ink is driven by `#080808` and `var(--ink)`
- Border family is `#E2E8F0` and related tokens
- Background is white

## Style Block Chunks

Copy the entire inline style block unchanged, but use these chunk boundaries mentally when rebuilding:

1. Foundation: lines `3189-3232`
2. Hero: lines `3233-3471`
3. Overview: lines `3472-3513`
4. Artifact Tabs: lines `3514-3823`
5. Principles: lines `3824-4071`
6. Mid CTA: lines `4072-4231`
7. Proof: lines `4232-4630`
8. Comparison: lines `4631-4867`
9. Impact: lines `4868-5106`
10. Artifacts: lines `5107-5284`
11. FAQ: lines `5285-5463`
12. Bottom CTA: lines `5474-5750`
13. Legacy HR-docs utility blocks and responsive rules: lines `5751-6583`

Keep all of them if you want exact parity.

## Exact Hero Pattern

Hero markup anchor:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:129)

Keep this anatomy:

- `header#hero.wfvwp-hero-section`
- `.wfvwp-hero__container`
- `.wfvwp-hero__row`
- `.wfvwp-hero__copy-col`
- `.wfvwp-hero__copy`
- `.wfvwp-hero__eyebrow-wrap`
- `.wfvwp-hero__heading-wrap`
- `.wfvwp-hero__body-wrap`
- `.wfvwp-hero__button-wrap`
- `.wfvwp-hero__media-block`

Verified hero scale from current CSS:

- Eyebrow: `clamp(1rem, ..., 1.25rem)`, weight `600`
- Hero title: `clamp(2.75rem, ..., 5rem)`, line-height `1.04`, weight `700`
- Hero body: `clamp(1.1rem, ..., 1.25rem)`, line-height `1.5`, weight `500`
- Button text: `16px`, weight `600`

Verified hero card rules:

- Shell: `.wfvwp-hero__card`
- Border radius: `8px`
- Border: `1px solid #d8d8d8`
- Dark background shell
- Media image frame uses `aspect-ratio: 16 / 9`

## Exact Overview Pattern

Overview starts inline in the main return at:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:6590)

Keep this structure:

- `section.wfvwp-overview-section`
- `.wfvwp-overview-row`
- `.wfvwp-overview-col`
- `.wfvwp-overview-col`

Layout logic:

- Left column = large heading
- Right column = two narrative paragraphs

Verified scale:

- Heading: `clamp(2rem, ..., 3.5rem)`, weight `700`, line-height `1.04`
- Body: `clamp(1.1rem, ..., 1.25rem)`, weight `400`, line-height `1.5`

## Exact Artifact Tabs Pattern

Section anchor:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:986)

Keep this anatomy:

- `section.wfvwp-cms-tabs-section`
- `.wfvwp-cms-tabs`
- `.wfvwp-cms-tabs__spacer`
- `.wfvwp-cms-tabs__menu`
- `.wfvwp-cms-tabs__content`
- `.wfvwp-cms-tabs__list`
- `.wfvwp-cms-tabs__item`
- `.wfvwp-cms-tabs__trigger`
- `.wfvwp-cms-tabs__progress-track`
- `.wfvwp-cms-tabs__progress-bar`
- `.wfvwp-cms-tabs__tab-title`
- `.wfvwp-cms-tabs__interactive-content`
- `.wfvwp-cms-tabs__body`
- Optional `.wfvwp-cms-tabs__cta-row`

Use this for capabilities, workflow modules, artifact intros, or system surfaces.

## Exact Principles Pattern

Section anchor:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1183)

Keep this as the stacked reasoning section for:

- system principles
- architecture choices
- governance controls
- outcome themes

## Exact Mid CTA Pattern

Section anchor:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1319)

Keep this structure unchanged:

- one strong headline
- one supporting paragraph
- one action
- one cover image area

## Exact Proof Pattern

Section anchor:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1403)

Keep this split:

- intro area with heading and summary
- badge grid
- testimonial slider below

Use it for quotes, validation, proof, or trust signals.

## Exact Comparison Pattern

Section anchor:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1561)

Keep it as a comparison table, not cards.

Use it for:

- before vs after
- manual vs system
- old process vs new process
- fragmented tools vs governed workflow

## Exact Impact Pattern

Section anchor:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1764)

Use this for:

- time reduction
- error reduction
- throughput gain
- compliance improvement

Pattern:

- large title
- narrative copy
- CTA
- proof image/media

## Exact Artifacts Pattern

Section anchor:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:1919)

This is the closest current structure to an artifact showcase:

- section title
- section intro
- tabbed content
- image per tab

Current image references in the file:

- `/images/hr-docs/g2-document-control.webp`
- `/images/hr-docs/g2-approval-workflows.webp`
- `/images/hr-docs/g2-audit-trail.webp`

## Exact FAQ Pattern

Section anchor:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:2001)

Use this for:

- who it was for
- what changed
- what the system enforced
- how adoption worked

Keep the accordion layout unchanged.

## Exact Bottom CTA Pattern

Section anchor:

- [HRDocsCaseStudy.tsx](/d:/OneDrive%20-%2055phcx/port/portfolio%20codex/portfolio/components/HRDocsCaseStudy.tsx:2119)

Keep this ending structure:

- strong title
- short subheading
- one paragraph
- support list
- one CTA
- side media

## Spacing System

Verified spacing rule:

- Hero uses larger top spacing
- Main sections repeatedly use `padding: clamp(3rem, ..., 5rem) 0`
- Main container remains `max-w-7xl mx-auto px-6 w-full`

Do not introduce random spacing outside that rhythm.

## Naming System

Current naming system:

- Root namespace: `fmcg-case-study`
- Section namespace: `wfvwp-*`

For exact consistency, keep the classes exactly as they are, even if the names are semantically messy for a new case study.

## Replace vs Keep

Replace only content:

- Hero eyebrow
- Hero H1
- Hero summary
- Hero CTA label
- Hero image
- Overview heading
- Overview paragraphs
- Artifact tab titles
- Artifact tab body copy
- Principles headings and body copy
- Mid CTA copy and image
- Proof heading, summary, badges, testimonials
- Comparison heading, columns, rows, tooltip copy
- Impact heading lines, body lines, CTA, image
- Artifact section title, intro, labels, screenshots
- FAQ questions and answers
- Bottom CTA title, subheading, body, support list, CTA, images

Do not change:

- wrappers
- class names
- container widths
- section order
- clamp-based typography
- section spacing rhythm
- card radii
- button styling
- inline style block

## Data Model Template

If you want to drive repeated content from data instead of hardcoded JSX, this shape fits the current system without redesigning it:

```ts
const caseStudyData = {
  hero: {
    eyebrow: 'Case Study Category',
    title: 'Case study headline goes here',
    body: 'One clear summary paragraph.',
    ctaLabel: 'Primary action',
    imageSrc: '/images/projects/hr-docs.webp',
    imageAlt: 'Case study artifact preview',
  },
  overview: {
    title: 'Overview heading',
    paragraphs: ['Paragraph one.', 'Paragraph two.'],
  },
  artifactTabs: [
    { id: 'artifact-1', title: 'Artifact One', body: 'Explanation.', imageSrc: '/images/hr-docs/g2-document-control.webp' },
    { id: 'artifact-2', title: 'Artifact Two', body: 'Explanation.', imageSrc: '/images/hr-docs/g2-approval-workflows.webp' },
    { id: 'artifact-3', title: 'Artifact Three', body: 'Explanation.', imageSrc: '/images/hr-docs/g2-audit-trail.webp' },
  ],
  principles: [
    { id: 'p1', title: 'Principle One', body: ['Paragraph one.', 'Paragraph two.'], imageSrc: '/images/hr-docs/g2-document-control.webp', ctaLabel: 'Learn more' },
  ],
  proof: {
    badges: [
      { imageSrc: '/images/hr-docs/g2-document-control.webp', imageAlt: 'Badge' },
    ],
    testimonials: [
      { name: 'Name', title: 'Role', quote: 'Quote.', avatarSrc: '/images/placeholder-fallback.webp' },
    ],
  },
  comparison: {
    heading: 'How legacy, hybrid, and target-state compare',
    columns: ['Feature', 'Legacy', 'Hybrid', 'Target'],
    rows: [
      {
        feature: 'Audit trail',
        cells: [
          { icon: 'minus', copy: 'Partial' },
          { icon: 'no', copy: 'Manual' },
          { icon: 'yes', copy: 'Built in' },
        ],
      },
    ],
  },
  impact: {
    titleLines: ['Impact line one', 'Impact line two'],
    bodyLines: ['Line one.', 'Line two.', 'Line three.'],
    ctaLabel: 'See more',
    imageSrc: '/images/projects/hr-docs.webp',
  },
  artifacts: [
    { id: 'a1', title: 'Document Control', imageSrc: '/images/hr-docs/g2-document-control.webp' },
    { id: 'a2', title: 'Approval Workflows', imageSrc: '/images/hr-docs/g2-approval-workflows.webp' },
    { id: 'a3', title: 'Audit Trail', imageSrc: '/images/hr-docs/g2-audit-trail.webp' },
  ],
  faq: [
    { question: 'Question one?', answer: 'Answer one.' },
    { question: 'Question two?', answer: 'Answer two.' },
  ],
  bottomCta: {
    title: 'Bottom CTA',
    subheading: 'Short supporting line',
    body: 'Final close paragraph.',
    supportItems: ['Point one', 'Point two', 'Point three'],
    ctaLabel: 'Contact',
  },
};
```

Use arrays only where the current component already repeats UI:

- `artifactTabs`
- `principles`
- `proof.badges`
- `proof.testimonials`
- `comparison.rows`
- `artifacts`
- `faq`
- `bottomCta.supportItems`

Use single objects for:

- `hero`
- `overview`
- `impact`
- `bottomCta`

## Final Verdict

Yes, the approach is sound if your goal is exact parity.

The verified rule set is:

1. Copy `HRDocsCaseStudy.tsx` into a new file.
2. Keep the full inline style block unchanged.
3. Keep the section order unchanged.
4. Replace only content and assets.
5. Do not rename wrappers or redesign sections.

The only correction from the earlier draft is that the current file line numbers are now slightly different, and the overview section is inline in the root return rather than living as a separate named component.

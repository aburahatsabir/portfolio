# Release Gate Audit: `/work/hr-docs`

Date: 2026-04-29

## 1. Release Gate Verdict

- `BLOCKED`

`/work/hr-docs` is not production-ready. The route metadata and project registry identify an HR Documentation / docs-as-code hiring governance case study, but the visible page body is primarily an ERP-Lite HR operations platform narrative. The older Webflow/WordPress issue recorded in the previous audit file is no longer supported by current source evidence, but the route still fails release because its title, body content, proof points, FAQs, CTAs, and preserved source artifacts do not describe one coherent case study.

## 2. Scope Confirmation

- Audit restricted to `/work/hr-docs` only.
- Visuals preserved by policy. This audit does not recommend changes to layout, spacing, colors, typography, imagery treatment, responsive behavior, motion behavior, or section order.
- Exact files inspected:
  - `portfolio/App.tsx`
  - `portfolio/components/HRDocsCaseStudy.tsx`
  - `portfolio/content/projects.ts`
  - `portfolio/utils/seo-utils.ts`
  - `portfolio/hr-docs-page-audit.md`
  - `portfolio/components/HRDocsCaseStudy.source.html`
  - `portfolio/public/hr-docs-case-study.html`
  - `portfolio/components/Work.tsx`
- Shared route dependencies inspected because they directly affect this route:
  - `portfolio/content/work-route-titles.ts`
  - `portfolio/utils/seo-schema.ts`
  - `portfolio/public/sitemap.xml`
  - `portfolio/docs/sitemap.xml`
  - `portfolio/vercel.json`
- Live route cross-check:
  - `http://localhost:3001/work/hr-docs` responds.
  - Raw HTTP response is the Vite SPA shell before React hydration, so raw source does not expose route-specific rendered body content.

## 3. Critical Findings

### Finding 1

- Severity: `Critical`
- Finding title: Route identity and visible narrative are materially misaligned
- Evidence:
  - `content/projects.ts:309-315` defines `hr-docs` as `HR Documentation System`.
  - `content/projects.ts:311-314` defines the route headline and description as docs-as-code hiring governance using `LaTeX`, `TikZ`, and `BARS`.
  - `components/HRDocsCaseStudy.tsx:4686-4689` describes a centralized ERP-Lite HR system.
  - `components/HRDocsCaseStudy.tsx:1435-1437` labels the comparison section `Before (Chaos) vs. After (ERP-Lite)`.
  - `components/HRDocsCaseStudy.tsx:1672-1674` renders `impact of ERP-Lite`.
  - `components/HRDocsCaseStudy.tsx:1873` renders `About ERP-Lite`.
  - `components/HRDocsCaseStudy.tsx:2028` says the route exposes API specifications that power ERP-Lite.
- Why this needs fixing:
  - A portfolio case-study route cannot promise one project in metadata and explain a different product in the visible body.
- What is affected now:
  - Route trust, portfolio credibility, user comprehension, SEO alignment, and CTA intent.
- After-fix outcome:
  - The route will describe one project consistently from metadata through supporting sections.
- Safest fix path:
  - Treat `content/projects.ts` as route truth and rewrite page-local rendered copy inside `HRDocsCaseStudy.tsx` to match it.
- Blast radius risk:
  - Low if confined to `HRDocsCaseStudy.tsx`.
  - Higher if project metadata is changed instead, because `Work.tsx` and SEO metadata consume it.

### Finding 2

- Severity: `High`
- Finding title: The previous audit document is stale and no longer reflects the current source problem
- Evidence:
  - The prior `hr-docs-page-audit.md` claimed active Webflow/WordPress copy in `HRDocsCaseStudy.tsx`.
  - Current source search shows no active Webflow/WordPress/Jasper narrative in `components/HRDocsCaseStudy.tsx`.
  - Current source now shows ERP-Lite narrative conflicts instead.
- Why this needs fixing:
  - A stale audit drives the wrong remediation strategy.
- What is affected now:
  - Release decision quality and implementation targeting.
- After-fix outcome:
  - Remediation work will address the actual defect now present in source.
- Safest fix path:
  - Replace the stale audit with a current evidence-based audit before implementation.
- Blast radius risk:
  - None beyond documentation quality.

### Finding 3

- Severity: `High`
- Finding title: CTAs are incomplete or misleading for this case study
- Evidence:
  - `components/HRDocsCaseStudy.tsx:149` hero CTA goes to `/contact`, which is acceptable.
  - `components/HRDocsCaseStudy.tsx:1235-1239` labels `Get the story` but links to `/blog`.
  - `components/HRDocsCaseStudy.tsx:394`, `403`, `412`, `421` define testimonial links as `#`.
  - `components/HRDocsCaseStudy.tsx:1362-1365` renders those testimonial cards as clickable external-style links.
- Why this needs fixing:
  - A release candidate should not expose dead links or generic off-route CTAs where a route-specific action is expected.
- What is affected now:
  - Conversion flow, keyboard navigation, user trust, and analytic signal quality.
- After-fix outcome:
  - All visible calls to action will either be truthful links or non-link elements.
- Safest fix path:
  - Keep current button and card visuals.
  - Change only labels, destinations, or semantics.
- Blast radius risk:
  - Page-local.

### Finding 4

- Severity: `High`
- Finding title: Metadata intent and body content do not agree
- Evidence:
  - `utils/seo-utils.ts:140-153` derives `/work/*` metadata from the matching project entry.
  - `content/projects.ts:309-344` defines `hr-docs` as a docs-as-code hiring governance case study.
  - `components/HRDocsCaseStudy.tsx:135` renders `HR Documentation & Control System`, but the surrounding sections repeatedly describe ERP-Lite operations software.
  - Raw route HTML at `http://localhost:3001/work/hr-docs` returns the SPA shell with default site metadata before hydration.
- Why this needs fixing:
  - Search/social previews can describe one case study while the route body sells another.
- What is affected now:
  - Technical SEO, social preview accuracy, and trust on landing.
- After-fix outcome:
  - Title, meta description, OG/Twitter intent, H1, and body content will reinforce one subject.
- Safest fix path:
  - First align the body to existing metadata.
  - Treat route-specific prerender/static metadata improvement as a separate higher-risk step.
- Blast radius risk:
  - Low for body alignment.
  - Higher for shared SEO delivery changes.

### Finding 5

- Severity: `Medium`
- Finding title: Preserved source artifacts still describe ERP-Lite and contain mojibake
- Evidence:
  - `components/HRDocsCaseStudy.source.html:6` title is `ERP-Lite ... Case Study` with mojibake.
  - `components/HRDocsCaseStudy.source.html:875-877` hero content describes ERP-Lite HR operations.
  - `components/HRDocsCaseStudy.source.html:997-1002` presents ERP-Lite positioning and module logic.
  - `public/hr-docs-case-study.html:6`, `875-885`, and `997-1002` contain the same ERP-Lite and mojibake issues.
- Why this needs fixing:
  - These files are not safe to use as route truth and can reintroduce bad copy if reused.
- What is affected now:
  - Source-of-truth hygiene for this page and any future content migration work.
- After-fix outcome:
  - Preserved source files will no longer contradict the route they are meant to represent.
- Safest fix path:
  - Do not reuse these artifacts for `/work/hr-docs` until they are normalized and rewritten.
- Blast radius risk:
  - Low if handled as route-local content assets.

### Finding 6

- Severity: `Medium`
- Finding title: Accessibility semantics are functional but degraded
- Evidence:
  - `components/HRDocsCaseStudy.tsx:842-850` tab buttons expose only generic screen-reader text `Select tab`.
  - `components/HRDocsCaseStudy.tsx:1362-1365` testimonial cards are links even though destinations are `#`.
  - `components/HRDocsCaseStudy.tsx:1117-1122` image overlay anchors are `aria-hidden`, while the visible narrative relies on adjacent content; this is not fatal, but the structure is fragile.
  - `components/HRDocsCaseStudy.tsx:1514-1519` comparison toggle button uses generic `aria-label="Tooltip"`.
- Why this needs fixing:
  - Screen reader users should get purpose-specific control names, and dead links should not be exposed as meaningful navigation.
- What is affected now:
  - Accessibility clarity and navigation trust.
- After-fix outcome:
  - Controls will announce their purpose accurately, and non-links will stop behaving like links.
- Safest fix path:
  - Page-local aria-label and semantic cleanup only.
- Blast radius risk:
  - Page-local.

### Finding 7

- Severity: `Medium`
- Finding title: Route aliasing is intentional but creates release ambiguity if not documented
- Evidence:
  - `content/work-route-titles.ts:11` maps the canonical HR Docs segment to `hr-documentation-control-system`.
  - `content/work-route-titles.ts:15-18` keeps `hr-docs` as a legacy segment.
  - `content/work-route-titles.ts:47-57` normalizes `/work/hr-docs` to the canonical route.
  - `App.tsx:135-140` and `183-187` enforce the normalization in-browser.
- Why this needs fixing:
  - The requested audit target is `/work/hr-docs`, but the app intentionally rewrites it. That is acceptable only if content and canonical signals are consistent.
- What is affected now:
  - Route clarity, QA reproducibility, and canonical expectations.
- After-fix outcome:
  - QA and SEO will evaluate one canonical route identity instead of a partially legacy one.
- Safest fix path:
  - Keep current rewrite behavior unless there is a separate SEO reason to change it.
  - Ensure the route content is coherent first.
- Blast radius risk:
  - Shared routing behavior if changed. Do not change this before page content is corrected.

### Finding 8

- Severity: `Medium`
- Finding title: The page is monolithic and therefore risky to edit casually
- Evidence:
  - `components/HRDocsCaseStudy.tsx` is a single large file ending at `4719`.
  - Inline page-specific styles begin at `components/HRDocsCaseStudy.tsx:2100`.
- Why this needs fixing:
  - Large, mixed responsibility files increase accidental regression risk during remediation.
- What is affected now:
  - Change safety and release confidence.
- After-fix outcome:
  - A narrow page-local patch can be applied with lower regression risk.
- Safest fix path:
  - Limit the first remediation pass to content constants, labels, hrefs, alt text, and aria text only.
- Blast radius risk:
  - Low if no structural refactor is attempted.

### Finding 9

- Severity: `Low`
- Finding title: Sitemap evidence for this route is incomplete from the files inspected
- Evidence:
  - `public/sitemap.xml` and `docs/sitemap.xml` include multiple work routes in the visible excerpt, but the inspected content did not show an HR Docs route entry.
  - This audit did not validate the sitemap generator output beyond the checked files.
- Why this needs fixing:
  - If the canonical route is missing from sitemap output, discoverability suffers.
- What is affected now:
  - Potential route indexing consistency.
- After-fix outcome:
  - Sitemap and canonical route strategy will match.
- Safest fix path:
  - Validate after route content integrity is repaired.
- Blast radius risk:
  - Shared SEO generation if changed.

## 4. What Must Be Fixed Before Release

- Resolve the HR Docs vs ERP-Lite narrative conflict.
- Align hero, overview, section headings, body copy, FAQ copy, comparison labels, and proof text to one route identity.
- Remove or replace dead `#` testimonial links.
- Replace the `/blog` migration CTA with a truthful route-appropriate destination.
- Stop treating the mojibake ERP-Lite HTML artifacts as safe route source material.

## 5. Safest Page-Only Remediation Strategy

1. Freeze all visuals and interaction patterns.
2. Use `content/projects.ts` as route truth for `/work/hr-docs`.
3. Rewrite only page-local text in `components/HRDocsCaseStudy.tsx` so every visible section matches the HR Docs case-study identity.
4. Update page-local alt text, CTA labels, and CTA destinations to match the final route narrative.
5. Correct page-local accessibility labels and remove dead-link semantics from non-destinations.
6. Validate the route after content correction.
7. Only after the page is coherent, evaluate whether shared SEO delivery or preserved source artifacts need cleanup.

## 6. Visual Freeze Compliance

The recommended fix path preserves:

- layout
- spacing
- colors
- typography
- imagery treatment
- responsive behavior
- motion behavior
- section order

This audit recommends copy, metadata-alignment, CTA, alt-text, encoding-source, and semantic corrections only. No redesign is recommended.

## 7. Route Integrity Map

- URL slug: Partially aligned
  - `/work/hr-docs` is a legacy alias that normalizes to `/work/hr-documentation-control-system`.
- page title: Misaligned
  - Shared metadata says HR Docs; visible body says ERP-Lite.
- meta description: Misaligned
  - Metadata describes docs-as-code hiring governance; page body describes HR operations software.
- OG/Twitter preview intent: Misaligned
  - Shared intent is HR Docs, but route-level rendered body is ERP-Lite.
- H1: Partially aligned
  - `HR Documentation & Control System` is closer to the route name than the body sections are.
- hero body copy: Misaligned
  - Too generic for the docs-as-code metadata and surrounded by ERP-Lite proof imagery/text.
- CTA labels and destinations: Misaligned
  - `/contact` is acceptable; `/blog` and `#` are not.
- supporting sections: Misaligned
  - Repeated ERP-Lite references dominate the page.
- schema/breadcrumb naming: Mostly aligned
  - Shared breadcrumb logic resolves the project title correctly, but visible content still conflicts with that naming.

## 8. Risk of Doing Nothing

- trust risk:
  - Visitors will see one case study promised and another one explained.
- conversion risk:
  - Weak or dead CTA destinations reduce credibility and action quality.
- SEO risk:
  - Metadata/body mismatch weakens relevance and preview accuracy.
- accessibility risk:
  - Generic control labels and dead-link semantics reduce assistive clarity.
- maintainability risk:
  - The route remains costly and risky to edit under time pressure.
- portfolio credibility risk:
  - The page reads like an unresolved migration rather than a finished executive portfolio artifact.

## 9. Best and Safest Approach

- best approach:
  - Keep `/work/hr-docs` as the HR Documentation / docs-as-code case study and remove ERP-Lite narrative from this route.
- safest approach:
  - Apply a page-local content integrity pass in `components/HRDocsCaseStudy.tsx` first.
- why this is the right sequence:
  - It fixes the core release blocker with the lowest blast radius and avoids unnecessary shared refactors.
- what should explicitly not be changed yet:
  - Do not redesign the page.
  - Do not refactor the large component structure.
  - Do not change shared routing or SEO architecture before content integrity is repaired.

## 10. Non-Goals

- no redesign
- no sitewide cleanup
- no unrelated refactors
- no implementation in this response

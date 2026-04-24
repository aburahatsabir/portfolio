# Audit Report: `/work/hr-docs`

- Date: 2026-04-24
- Scope: only the `/work/hr-docs` route and the code/assets that directly shape that page.
- Change policy: no implementation, no code edits beyond creating this report.

## Audit method

- Checked route wiring in `App.tsx`.
- Audited the live route shell at `http://localhost:3001/work/hr-docs`.
- Read the page source in `components/HRDocsCaseStudy.tsx`.
- Cross-checked intended project metadata in `content/projects.ts`.
- Cross-checked the preserved source HTML in `components/HRDocsCaseStudy.source.html` and `public/hr-docs-case-study.html`.

## Executive summary

The `/work/hr-docs` page is in a broken hybrid state.

- The route slug, project metadata, and preserved source HTML point to an HR documentation / HR governance case study.
- The rendered component currently contains a large amount of unrelated Webflow vs WordPress marketing content.
- The same file also contains ERP-Lite HR operations content and leftover FMCG naming/styling.

This is not a minor polish issue. It is a content-integrity failure affecting trust, SEO, navigation, accessibility, and maintainability.

## Findings

### F1. Critical: the route renders the wrong product and the wrong narrative

Evidence:

- `components/HRDocsCaseStudy.tsx:135-145` renders the hero as `Webflow vs WordPress` with the H1 `A modern, scalable WordPress alternative`.
- `components/HRDocsCaseStudy.tsx:6594-6603` renders overview copy about WordPress and Webflow.
- `components/HRDocsCaseStudy.tsx:1565-1579` renders a comparison table labeled `Comparing Webflow vs Wordpress`.
- `components/HRDocsCaseStudy.tsx:732-770` renders a WordPress/Webflow FAQ.
- `components/HRDocsCaseStudy.tsx:2157-2211` renders `Schedule a product demo` plus a Jasper/Webflow image.

Why this needs fixing:

- A visitor opening `/work/hr-docs` is not getting an HR Docs case study. They are getting a different product pitch entirely.
- This breaks credibility immediately. The route slug, navbar context, portfolio framing, and body content do not agree.
- It also makes every downstream metric untrustworthy: scroll depth, engagement, and click-through no longer describe the intended page.

After fixing:

- The page will actually explain the HR Docs project users came to see.
- Trust, comprehension, and portfolio coherence will improve immediately.
- Analytics and qualitative feedback for this route will start reflecting the correct case study.

### F2. Critical: the page has three conflicting identities at once

Evidence:

- `content/projects.ts:308-340` defines `hr-docs` as `HR Documentation System` with the headline `Hiring Governance via Docs-as-Code`.
- `components/HRDocsCaseStudy.source.html:6, 876, 997` preserve an ERP-Lite HR operations case study (`Integrated HR Documentation & Control System`).
- `components/HRDocsCaseStudy.tsx:135-145, 1926, 2828-2847` mixes Webflow-vs-WordPress copy, ERP-Lite copy, and HR Docs image labels in one page.

Why this needs fixing:

- The route currently promises one thing in metadata, contains a different HR concept in legacy source, and shows a third concept in visible hero/body copy.
- This confuses humans and search engines alike.
- It also suggests regression drift: the repository still has coherent HR Docs source material, but the route component no longer matches it.

After fixing:

- The route will have one clear identity across slug, title, H1, description, visuals, CTA, and supporting sections.
- Portfolio cards, SEO metadata, and the actual page content will stop contradicting each other.

### F3. High: the page contains wrong CTAs and broken / misleading links

Evidence:

- External Webflow CTAs:
  - `components/HRDocsCaseStudy.tsx:153`
  - `components/HRDocsCaseStudy.tsx:664-666`
  - `components/HRDocsCaseStudy.tsx:803-805`
  - `components/HRDocsCaseStudy.tsx:1839`
  - `components/HRDocsCaseStudy.tsx:2197`
- Internal links to routes that do not exist in this app:
  - `components/HRDocsCaseStudy.tsx:295`
  - `components/HRDocsCaseStudy.tsx:307`
  - `components/HRDocsCaseStudy.tsx:311`
  - `components/HRDocsCaseStudy.tsx:323`
  - `components/HRDocsCaseStudy.tsx:377`
  - `components/HRDocsCaseStudy.tsx:397`
- `App.tsx:177-238` shows no route handling for `/feature/*` or `/developers`.

Why this needs fixing:

- Some links send the user off the portfolio to Webflow sales pages.
- Some links stay inside the app but land on unsupported routes, which will fall through to unrelated content instead of a valid destination.
- On a case-study page, this is a conversion and credibility problem, not just a navigation problem.

After fixing:

- Every CTA will support the portfolio goal instead of advertising a third-party vendor.
- Internal links will resolve to intentional destinations.
- Users will stop hitting dead-end or misleading navigation states.

### F4. High: SEO and visible page content are misaligned

Evidence:

- `utils/seo-utils.ts:139-151` builds `/work/hr-docs` metadata from the `hr-docs` project entry.
- `content/projects.ts:309-314` describes an HR Documentation / docs-as-code governance project.
- `components/HRDocsCaseStudy.tsx:139, 6594-6603, 732-770` visibly present a WordPress/Webflow page instead.

Why this needs fixing:

- Search, social previews, and browser title can describe one project while the visible body shows something else.
- That mismatch increases bounce risk and weakens topical relevance.
- It also undermines the case study as a portfolio artifact because the title and the substance do not agree.

After fixing:

- The title tag, description, H1, overview, and supporting sections will all reinforce the same subject.
- Search and sharing previews will stop overpromising and underdelivering.

### F5. Medium: the page has invalid landmark structure with nested `<main>` elements

Evidence:

- `App.tsx:282-284` wraps routed content in `<main id="main-content">`.
- `components/HRDocsCaseStudy.tsx:6589` renders another `<main id="main" className="wfvwp-page-main">` inside it.

Why this needs fixing:

- A page should not expose multiple nested main landmarks.
- This creates ambiguity for screen readers, landmark navigation, and skip-link behavior.
- It is also a sign that a self-contained imported template was dropped into an already-structured app shell without being adapted.

After fixing:

- Landmark navigation will be valid and clearer.
- The page will integrate correctly with the app shell and skip-to-content flow.

### F6. Medium: encoding / mojibake issues are still present in user-facing copy

Evidence:

- The file includes a repair helper at `components/HRDocsCaseStudy.tsx:335-339`, but it is only applied in one place at `components/HRDocsCaseStudy.tsx:1050`.
- Unrepaired bad text remains in multiple visible areas:
  - `components/HRDocsCaseStudy.tsx:734-758`
  - `components/HRDocsCaseStudy.tsx:2241-2263`
  - `components/HRDocsCaseStudy.tsx:2827-2829`
  - `components/HRDocsCaseStudy.tsx:3103`

Examples visible in source:

- `Whatâ€™s`
- `â€”`
- `Â·`
- `â†’`

Why this needs fixing:

- Even a technically correct layout looks broken when core copy renders with encoding garbage.
- This directly damages professionalism and readability.
- It also makes the page feel unreviewed and unstable.

After fixing:

- Copy will read cleanly.
- The page will look intentional instead of corrupted.

### F7. Medium: meaningful content images are being rendered with empty alt text

Evidence:

- Empty alt data is defined at:
  - `components/HRDocsCaseStudy.tsx:291`
  - `components/HRDocsCaseStudy.tsx:303`
  - `components/HRDocsCaseStudy.tsx:319`
  - `components/HRDocsCaseStudy.tsx:351`
  - `components/HRDocsCaseStudy.tsx:361`
  - `components/HRDocsCaseStudy.tsx:372`
  - `components/HRDocsCaseStudy.tsx:392`
- Those values are rendered directly into images at:
  - `components/HRDocsCaseStudy.tsx:1086-1089`
  - `components/HRDocsCaseStudy.tsx:1240-1243`

Why this needs fixing:

- These are not obviously decorative flourishes; they support the explanation of tabs/features.
- Screen-reader users lose that content entirely.
- On a case-study page, explanatory visuals should not disappear for non-visual users.

After fixing:

- Accessibility improves.
- The page communicates the same core ideas to more users.

### F8. Medium: the page is excessively large, over-coupled, and fragile

Evidence:

- `components/HRDocsCaseStudy.tsx` is `6,635` lines and `322,486` bytes.
- The component contains:
  - `8` `MutationObserver` references
  - `6` `matchMedia` calls
  - `6` `setTimeout` calls
  - `4` `requestAnimationFrame` calls
  - `10` `https://webflow.com` URLs
  - `5` `/feature/` links
  - `7` empty `imageAlt` values
- The page injects a very large inline `<style>` block starting at `components/HRDocsCaseStudy.tsx:3179`.
- The entire page is wrapped in a leftover class namespace from another project: `components/HRDocsCaseStudy.tsx:3178-3190` uses `fmcg-case-study`.

Why this needs fixing:

- This is a high-regression surface. The current state already shows what happens when multiple imported templates are fused together without a clean boundary.
- Route-level lazy loading does not remove the cost of shipping an oversized, self-contained page once the user opens it.
- The wrong namespace and imported template code make future fixes slower and riskier.

After fixing:

- The route will be easier to reason about, test, and maintain.
- Page-specific performance and QA confidence should improve.

### F9. Low: breadcrumb/schema naming for this route is too crude

Evidence:

- `App.tsx:63-68` derives the work breadcrumb from the slug by replacing hyphens with spaces.
- For `/work/hr-docs`, that becomes `hr docs`, not the actual project title from `content/projects.ts:309`.

Why this needs fixing:

- Structured data and breadcrumbs should use the actual project title, not a lower-quality slug expansion.
- This is a smaller issue than the content failures above, but it still reduces polish and consistency.

After fixing:

- Breadcrumbs and schema will reflect the same naming standard as the portfolio cards and metadata.

## Suggested fix order

1. Restore one correct narrative for `/work/hr-docs` and remove all Webflow/WordPress/Jasper content.
2. Align route metadata, H1, hero, overview, and CTA with the same HR Docs case study.
3. Remove or replace all broken `/feature/*` and `/developers` links plus all third-party Webflow sales links.
4. Fix nested landmarks and clean up accessibility issues like empty alt text.
5. Remove mojibake and normalize encoding.
6. Refactor the route into smaller page sections and add route-level tests so this regression cannot recur silently.

## Residual risk

- I could not complete a headless-browser screenshot capture because local browser launch was blocked by OS permission errors in this environment.
- The audit is still high-confidence because the route wiring, metadata, preserved source HTML, and the current `HRDocsCaseStudy.tsx` source all point to the same conclusion: this page is materially inconsistent and currently broken as a portfolio case-study route.

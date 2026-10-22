# Forensic Production-Readiness Audit

> **Audit date:** 2026-10-21
> **Verdict:** **Not ready for production deployment**
> **Scope:** Current worktree, local build output, tracked GitHub Pages output, live Vercel deployment, and live GitHub Pages deployment.

## Audit integrity

No repository files were edited, installed, staged, committed, deleted, or deployed during the audit. The isolated preview server and Chrome process used for browser checks were stopped afterward.

The final worktree matched its starting baseline:

| Status | Count |
|---|---:|
| Total entries | 348 |
| Deleted | 236 |
| Modified | 57 |
| Untracked | 55 |

## Contents

1. [Executive verdict](#1-executive-verdict)
2. [Repository truth and system architecture](#2-repository-truth-and-system-architecture)
3. [Route and deployment matrix](#3-route-and-deployment-matrix)
4. [Prioritized findings](#4-prioritized-findings)
5. [Keep, repair, or remove](#5-keep-repair-or-remove)
6. [Dead code, dependencies, assets, and artifacts](#6-dead-code-dependencies-assets-and-artifacts)
7. [Verification evidence](#7-verification-evidence)
8. [Remediation plan](#8-remediation-plan)
9. [Remaining uncertainty](#9-remaining-uncertainty)

---

## 1. Executive verdict

The portfolio is **not ready for production deployment**. No critical-severity defect was confirmed, but three high-severity blockers remain:

1. **There is no single production truth.** The current source exposes 10 canonical routes, the live Vercel deployment exposes 22 sitemap routes, and GitHub Pages exposes 19.
2. **The live Vercel contact form is highly likely to be nonfunctional.** Its production bundle falls back to placeholder EmailJS identifiers: `service_portfolio`, `template_portfolio`, and `public_key_portfolio`.
3. **The GitHub Pages deployment is broken at the application shell.** It requests `/assets/index-BTi4wfAR.js`, which returns 404. The existing asset is under `/portfolio/assets/...`, and the router does not strip the `/portfolio` base path.

Additional release facts:

- TypeScript validation, all 45 tests, and an isolated production build pass.
- Linting cannot start because the repository has no `eslint.config.*` file.
- The current user-owned redesign is very large: 293 tracked files differ, with approximately 3,069 additions and 49,733 deletions.
- Deploying the current worktree without a route decision would remove 12 routes still indexed by the live Vercel sitemap.

---

## 2. Repository truth and system architecture

### 2.1 Repository state

- The application repository is nested under the outer workspace in `portfolio/`.
- Local `HEAD`: `c451899a11153b71f3f90c6605a1d29cd9245fc9`
- Public remote `main`: `8d3730b577e9b1338941204d787f8ea94387329d`
- The local `origin/main` reference is stale, so an “ahead by 2” result based on it is not reliable.
- Existing changes are user-owned and were preserved.
- Local `dist/` and tracked `docs/` are byte-identical: 151 files totaling 19,459,554 bytes.
- `dist/` is ignored; `docs/` is tracked historical/generated output.
- The README’s GitHub Pages output guidance conflicts with [vite.config.ts:37](./vite.config.ts#L37) and the deployment workflow at [.github/workflows/deploy.yml:37](./.github/workflows/deploy.yml#L37) and [.github/workflows/deploy.yml:40](./.github/workflows/deploy.yml#L40).

### 2.2 Runtime architecture

```text
index.html
   ↓
index.tsx
   ↓
App.tsx
   ├─ reads window.location.pathname
   ├─ manually selects a page/component
   └─ has no router basename or trailing-slash normalization

content/blog-posts.ts
   ├─ runtime blog pages
   ├─ sitemap generation
   ├─ RSS generation
   └─ prerendered article output

npm run build
   ├─ prebuild generation
   ├─ Vite build → dist/
   └─ postbuild processing
```

Routing is implemented manually in [App.tsx:82](./App.tsx#L82), with the main route switch beginning around [App.tsx:153](./App.tsx#L153). It does not normalize a deployment basename or trailing slash.

### 2.3 Source, build, and deployment comparison

| Surface | Observed state | Interpretation |
|---|---|---|
| Current worktree | 10 canonical routes plus 2 migration aliases | Current redesign/source truth candidate |
| Clean isolated build | 10 routes plus generated 404; 151 files | Build succeeds and reflects current worktree |
| Local `dist/` | Byte-identical to tracked `docs/` | Historical local output, not current clean build truth |
| Tracked `docs/` | 151 generated files with substantial churn | Legacy GitHub Pages artifact committed to source control |
| Live Vercel | 22-route sitemap and older `index-CyUixsJl.js` bundle, 343,620 bytes | Older production generation |
| Live GitHub Pages | 19-route sitemap and older, broken bundle reference | Legacy deployment, currently unusable |
| README | Describes stale output/deployment behavior | Documentation no longer matches configuration |

The current build’s primary bundle is `index-CETQDxh1.js`, 303,073 bytes. The live Vercel bundle is `index-CyUixsJl.js`, 343,620 bytes. The public source map also exposes sources that have been deleted from the current worktree.

---

## 3. Route and deployment matrix

### Legend

- **SM C/V/G:** Present in the current, Vercel, or GitHub Pages sitemap.
- **200B:** HTTP 200 is returned, but the application shell is broken.
- **UI 404:** The Vite shell loads, then the application renders its 404 view.

### 3.1 Current canonical routes

| Route | Current component | Linked | SM C/V/G | Local build | Vercel | GitHub Pages | Recommendation |
|---|---|:---:|:---:|---|---|---|---|
| `/` | Home/App composition | Yes | Y/Y/Y | Generated and renders | 200 | 200B | Keep; repair deployment |
| `/about` | `About` + `Experience` | Yes | Y/Y/Y | Generated; renders; no H1 | 200 | 200B | Repair |
| `/work` | `Work` | Yes | Y/Y/Y | Generated; renders; no H1 | 200 | 200B | Repair |
| `/blog` | `BlogSeries` | Yes | Y/Y/Y | Generated and renders | 200 | 200B | Repair metadata consistency |
| `/blog/humanizing-hr-documentation` | Blog article | Yes | Y/Y/N | Generated; nested resources fail | 200 | 404 | Repair |
| `/blog/from-chaos-to-clarity` | Blog article | Yes | Y/Y/N | Generated; nested resources fail | 200 | 404 | Repair |
| `/contact` | `Contact` | Yes | Y/Y/Y | Generated; renders; no H1 | 200 | 200B | Repair before deploy |
| `/certifications` | Certifications | Footer | Y/Y/N | Generic metadata/title | 200 | 404 | Repair |
| `/privacy` | Privacy | Yes | Y/Y/Y | Duplicate static metadata/title | 200 | 200B | Repair claims and metadata |
| `/cookies` | Cookie policy | Yes | Y/Y/Y | Duplicate static metadata/title | 200 | 200B | Repair claims and metadata |

### 3.2 Migration aliases

| Route | Current sitemap | Vercel sitemap | GitHub sitemap | Local behavior | Vercel | GitHub Pages | Recommendation |
|---|:---:|:---:|:---:|---|---|---|---|
| `/blog/hr-documentation` | N | N | N | Resolves to current article | 308 to canonical article | 200B | Keep only as a redirect |
| `/blog/chaos-to-clarity` | N | N | N | Resolves to current article | 308 to canonical article | 200B | Keep only as a redirect |

The hash-migration logic in [public/scripts/hash-redirect.js:5](./public/scripts/hash-redirect.js#L5) performs a client-side rewrite. It should be treated only as a migration aid, not as canonical routing.

### 3.3 Routes present in older deployments but absent from current source

| Route | SM C/V/G | Vercel | GitHub Pages | Recommendation |
|---|:---:|---|---|---|
| `/solutions` | N/Y/Y | 200 | 200B | Owner decision: restore, redirect, or retire |
| `/governance` | N/Y/Y | 200 | 200B | Owner decision |
| `/for` | N/Y/Y | 200 | 200B | Consolidate or redirect |
| `/for/founders` | N/Y/Y | 200 | 200B | Consolidate or redirect |
| `/for/product-leaders` | N/Y/Y | 200 | 200B | Consolidate or redirect |
| `/for/hr-leaders` | N/Y/Y | 200 | 200B | Consolidate or redirect |
| `/for/engineering-leaders` | N/Y/Y | 200 | 200B | Consolidate or redirect |
| `/accessibility` | N/Y/N | 200 | 404 | Preserve policy or redirect |
| `/conduct` | N/Y/N | 200 | 404 | Preserve policy or redirect |
| `/work/fmcg` | N/Y/N | 200 | 404 | Owner decision |
| `/work/mocs` | N/Y/N | 200 | 404 | Owner decision |
| `/work/hr-doc-control` | N/Y/N | 200 | 404 | Owner decision |

### 3.4 Older and stale routes

| Route/group | Current sitemap | Vercel sitemap | GitHub sitemap | Observed behavior | Recommendation |
|---|:---:|:---:|:---:|---|---|
| `/work/hr-docs` | N | N | N | Local UI 404; Vercel 404; GitHub 200B | Redirect if it has backlinks |
| `/work/erp-lite` | N | N | N | Local UI 404; Vercel 404; GitHub 200B | Redirect if it has backlinks |
| `/work/med-ops` | N | N | N | Vercel 404; GitHub 404 | Remove or redirect |
| `/postmortems` | N | N | Y | Vercel 404; GitHub 404 | Remove from sitemap |
| Four additional old `/work/*` routes | N | N | Y | 404 on live hosts | Redirect or remove after owner decision |
| Success-story routes referenced only in metadata | N | N | N | 404 | Remove references or implement routes |

### 3.5 Standalone and debug artifacts

| Artifact | Vercel | GitHub Pages | Recommendation |
|---|---|---|---|
| Standalone ERP demo | 200 | 200 | Remove from public output or deliberately gate |
| Standalone HR demo | 200 | 200 | Remove from public output or deliberately gate |
| `set-api` utility | 404 | 200 | Remove from deployed output |
| Bundle statistics page | 200 | 200 | Remove from public output or deliberately gate |

### 3.6 Unknown paths and technical endpoints

| Endpoint/behavior | Current/local | Vercel | GitHub Pages | Assessment |
|---|---|---|---|---|
| Unknown SPA path | 200 shell, then UI 404/noindex | Real 404 | Real 404 | Keep UI fallback but repair status/title strategy |
| `robots.txt` | Present | 200 | 200 | Files differ across deployments |
| `sitemap.xml` | 10 URLs | 22 URLs | 19 URLs, including five 404s | Must converge |
| RSS | Present | 200 | 404 | Repair or retire on GitHub Pages |
| Manifest at root | Present | 200 | 200 | Valid only at root |
| Manifest from nested article paths | Relative request fails | 404 | 404 | Use base-aware/root-relative URL |
| Source maps | 15 maps, about 2.87 MB in current build | Reachable | Reachable | Remove from public deployment |
| Generated 404 page | Present | Real 404 behavior | Inconsistent | Standardize hosting behavior |

---

## 4. Prioritized findings

### F1 — High — Confirmed: no single source of deployment truth

**Evidence**

- Current source, Vercel, and GitHub Pages expose 10, 22, and 19 sitemap routes respectively.
- Each environment serves a different application bundle or artifact generation.
- `dist/`, `docs/`, README guidance, and workflow configuration disagree about the deployment model.

**Impact**

A normal deployment can silently remove indexed pages, preserve obsolete pages, or publish a different artifact from the one reviewed.

**Root cause**

Legacy tracked output and multiple hosting strategies coexist without an explicit canonical host, route contract, or artifact owner.

**Remediation**

Decide the canonical host and canonical route list. Create explicit redirects for retired URLs. Produce one deployment artifact through one reviewed workflow.

**Verification**

Compare the approved route manifest, generated sitemap, deployed files, and live route matrix after deployment.

**Attribution**

The divergence is pre-existing. The large current route removals are user-owned; their intended product direction is not documented.

### F2 — High — Highly likely: the live contact form cannot deliver

**Evidence**

- [components/ContactForm.tsx:53](./components/ContactForm.tsx#L53) and the live Vercel chunk contain fallback EmailJS identifiers.
- The production bundle falls back to `service_portfolio`, `template_portfolio`, and `public_key_portfolio`.

**Impact**

Prospective client messages may be lost while the UI appears to offer a working contact channel.

**Root cause**

Missing build-time configuration is accepted through placeholder defaults instead of failing the build or disabling the form.

**Remediation**

Remove placeholder fallbacks, validate required variables during the production build, and provide a direct email fallback when the form is unavailable.

**Verification**

Run a controlled production submission, verify the success response, confirm receipt, and verify error behavior with configuration intentionally absent.

**Attribution**

The fallback behavior is pre-existing. No real submission was made during this audit.

### F3 — High — Confirmed: GitHub Pages is unusable as an application deployment

**Evidence**

- The root page requests `/assets/index-BTi4wfAR.js`, which returns 404.
- The corresponding deployed asset exists under `/portfolio/assets/...`.
- [App.tsx](./App.tsx) consumes the raw pathname and does not remove `/portfolio`.
- [vite.config.ts](./vite.config.ts), the deployment workflows, and the tracked `docs/` artifact do not agree on base-path behavior.

**Impact**

The site presents a broken shell, deep routes fail, sitemap URLs fail, and RSS is unavailable.

**Root cause**

A legacy `docs/` artifact was deployed with incorrect asset URLs and without router basename support.

**Remediation**

Either retire GitHub Pages or rebuild it through Actions with the correct Vite base and basename-aware routing.

**Verification**

Test the root URL, every canonical deep link, hard refresh, back/forward navigation, assets, sitemap, RSS, and the 404 page on the scoped host.

### F4 — Medium — Confirmed: nested article pages request resources from the wrong paths

**Evidence**

Relative resource references occur in [index.html:13](./index.html#L13), [index.html:24](./index.html#L24), [index.html:25](./index.html#L25), [index.html:26](./index.html#L26), [index.html:27](./index.html#L27), [index.html:120](./index.html#L120), [index.html:143](./index.html#L143), and [index.html:184](./index.html#L184). Nested article checks produced 404 requests, including the manifest.

**Impact**

PWA metadata, icons, scripts, or supporting assets can fail only on deep routes, creating inconsistent behavior that root-page testing misses.

**Root cause**

Document-relative URLs are used where root- or base-aware URLs are required.

**Remediation**

Generate URLs from the configured base or use intentional root-relative references for the canonical host.

**Verification**

Load both article routes directly and confirm a clean network panel with no route-derived asset paths.

### F5 — Medium — Confirmed: metadata sources conflict

**Evidence**

- Prerendering is applied only to blog content around the generation logic at line 23.
- Six non-home routes share duplicate static titles or metadata.
- `/certifications` is absent from route-specific metadata.
- [components/BlogSeries.tsx:5466](./components/BlogSeries.tsx#L5466) performs an additional runtime override.

**Impact**

Search snippets, social previews, canonical URLs, and browser history titles can disagree across render paths.

**Root cause**

Metadata is distributed across static HTML, runtime component effects, and build-time generation.

**Remediation**

Create one typed route metadata registry used by runtime rendering, prerendering, sitemap generation, and social tags.

**Verification**

Inspect the raw HTML and hydrated DOM for every canonical route and validate canonical, title, description, Open Graph, and robots fields.

### F6 — Medium — Confirmed: debug and source artifacts are public

**Evidence**

- A live source map is approximately 1.37 MB.
- The bundle statistics page is 942,776 bytes.
- Standalone ERP and HR artifacts are 171,852 and 199,923 bytes.
- Current build source maps total approximately 2.87 MB.

**Impact**

Public artifacts expose implementation details, deleted source structure, and internal analysis output while increasing deployment size.

**Root cause**

Debug generation and standalone prototypes are copied into public deployment output without an allowlist.

**Remediation**

Use hidden/upload-only production maps, exclude statistics and prototypes, and gate intentionally public demos.

**Verification**

Probe the old URLs after deployment and confirm maps/debug artifacts return 404 unless explicitly authorized.

### F7 — Medium — Confirmed: mobile navigation has keyboard and layering defects

**Evidence**

- The menu button uses `z-60`, while the overlay uses `z-70`.
- Pointer and Escape interactions fail in the tested overlay state.
- Focus remained on `BODY` rather than being placed in the opened menu.
- Dialog/menu semantics and focus containment are incomplete.

**Impact**

Mobile and keyboard users can become unable to operate or dismiss primary navigation reliably.

**Root cause**

The visual overlay was implemented without a complete interaction, focus-management, and semantic state model.

**Remediation**

Correct stacking order, implement Escape and outside-click dismissal, move and contain focus, restore focus on close, and add appropriate expanded/control/dialog semantics.

**Verification**

Test keyboard-only operation, screen-reader state announcements, touch interaction, repeated open/close cycles, and focus restoration.

### F8 — Medium — Confirmed: page and form semantics are incomplete

**Evidence**

- No H1 was found in `About` around [components/About.tsx:244](./components/About.tsx#L244), `Work` around [components/Work.tsx:74](./components/Work.tsx#L74), or `Contact` around [components/Contact.tsx:84](./components/Contact.tsx#L84).
- Form errors are not fully connected with `aria-describedby` or live announcements.
- The skip link moves to `main`, but focus handling is incomplete.
- Smooth scrolling runs a continuing `requestAnimationFrame` loop.

**Impact**

Page structure, error recovery, skip navigation, and reduced-motion expectations are weaker for assistive-technology users.

**Root cause**

The redesign emphasizes visual sections without a consistent document-heading and focus contract.

**Remediation**

Add one meaningful H1 per page, bind errors to fields, announce submission state, make the main target focusable, and disable or remove Lenis when reduced motion is requested.

**Verification**

Run keyboard and screen-reader checks for page entry, skip navigation, invalid form submission, success/failure states, and reduced-motion mode.

### F9 — Medium — Confirmed: release gates do not protect the deployed product

**Evidence**

- ESLint exits with code 2 because no `eslint.config.*` exists.
- Duplicate Lighthouse workflows target hash routes instead of the application’s real pathname routes.

**Impact**

The pipeline can appear comprehensive while linting never runs and performance checks exercise the wrong URLs.

**Root cause**

Tooling and CI were not updated with the application’s routing and ESLint configuration changes.

**Remediation**

Add a valid lint configuration, consolidate Lighthouse into one workflow, and test actual canonical and deep-link paths against the built artifact.

**Verification**

Require lint, typecheck, unit tests, build, route probes, and Lighthouse to pass in one branch-protection workflow.

### F10 — Medium — Confirmed: privacy statements do not match observed behavior or business identity

**Evidence**

- [components/CookieConsent.tsx:64](./components/CookieConsent.tsx#L64) refers to advertising.
- [components/Privacy.tsx:178](./components/Privacy.tsx#L178) contains a company field that does not match an established legal entity in the repository.
- Cookie-policy statements around lines 165 and 231 claim behavior not clearly supported by the application.
- No complete Do Not Track or preference-revision behavior was found.

**Impact**

Visitors may receive inaccurate disclosures about tracking, advertising, legal identity, or consent controls.

**Root cause**

Policy copy appears broader than the actual implementation and has not been reconciled with the deployed analytics stack.

**Remediation**

Inventory every cookie, storage key, analytics request, and third-party service; then rewrite the notices to match reality and add a working preference-revision control.

**Verification**

Test a fresh session before consent, each consent choice, preference changes, withdrawal, and all resulting network/storage behavior.

### F11 — Low — Confirmed: repository history contains generated and personal artifacts

**Evidence**

- `.vscode_history`: 363 files, approximately 6.63 MB.
- `.lighthouseci`: 26 files, approximately 14.9 MB.
- `docs/`: 151 files, approximately 19.46 MB.
- Additional root-level reports, screenshots, and scratch utilities are present.
- README instructions are stale.

**Impact**

Repository review is noisy, clones are larger, accidental disclosure risk increases, and generated changes obscure source changes.

**Root cause**

Local history, audit output, and deployment output were committed instead of ignored or stored as CI artifacts.

**Remediation**

Untrack generated/personal folders, update `.gitignore`, preserve required reports as CI artifacts, and rewrite deployment documentation.

**Verification**

Run a clean clone and confirm that build/test/deploy work without tracked editor history, Lighthouse output, or generated site files.

---

## 5. Keep, repair, or remove

| Area | Decision | Reason/action |
|---|---|---|
| `Hero`, `Experience`, `Endorsements`, `AdminRoi`, `HomeBlog` | Keep | Current home experience and supporting content |
| `About`, `Work`, `Contact` | Repair | Add heading/metadata/accessibility consistency |
| `ContactForm` | Repair before deploy | Remove placeholder configuration and verify delivery |
| `BlogSeries` | Repair | Centralize metadata and validate article resources |
| Certifications page | Repair | Add route-specific metadata and heading contract |
| Privacy and cookie pages | Repair | Align statements with actual behavior |
| `Navbar` | Repair | Correct mobile interaction, focus, and semantics |
| `SmoothScroll` | Repair or remove | Respect reduced motion and avoid unnecessary continuous work |
| `Footer`, `ScrollToTop`, `Offline`, `ErrorBoundary`, `NotFound` | Keep | Useful production support components |
| Blog aliases | Keep only as redirects | Preserve migration value without duplicate content |
| Deleted live routes | Owner decision | Restore, map to successors, or retire explicitly |
| `docs/` | Remove as source of truth | Generate deployment output in CI |
| `dist/` | Keep ignored | Normal local build output |
| `.vscode_history`, `.lighthouseci` | Remove from version control | Personal/generated artifacts |
| Public source maps and bundle statistics | Remove from deployment | Debug exposure |
| Standalone demos | Remove or gate | Not part of the canonical portfolio surface |
| `set-api` | Remove | Deployment/debug utility |
| README | Repair | Document the actual build and deployment model |
| Duplicate Lighthouse workflows | Consolidate | One authoritative release check |

---

## 6. Dead code, dependencies, assets, and artifacts

### 6.1 Runtime-unreachable modules

The following modules were not found in the active runtime graph:

- `AdminStack`
- `ContactFormFallback`
- `DocumentationShowcase`
- `EngineeringStandards`
- `GlobalInfrastructure`
- `ObservabilityCharts`
- `ObservabilityMissionControl`
- `OptimizedImage`
- `RoiCalculator`
- `SecurityGovernance`
- `SovereigntyEfficiencyCTA`
- `SprawlDetector`
- `VerticalExplorer`
- `components/erp/ErpData`
- `components/shared/BentoCard`
- `utils/animations`
- `avatar-generator`
- `use-web-vitals`

`api-resilience` and `form-backup` appear to be test-only.

### 6.2 Likely removable dependencies

These packages appear to be used only by dead or non-runtime code:

- `chart.js`
- `jspdf`
- `jspdf-autotable`
- `recharts`
- `@types/dompurify`
- `@types/jspdf`

The Sentry Vite plugin is build-only and should be moved to `devDependencies`. `ContactForm` also contains an unused EmailJS import.

Scratch scripts import undeclared `puppeteer`; these scripts appear to be repository artifacts rather than supported product tooling.

### 6.3 Asset observations

- `public/` contains 104 files totaling approximately 15.55 MB.
- `178552...` and the used hero image are duplicate files of 802,772 bytes each.
- A “copy” PNG and its original are duplicate 1,751,727-byte files and appear unused.
- CSS totals approximately 252,203 bytes; the primary stylesheet is approximately 219,782 bytes.
- Current production source maps total approximately 2.87 MB.
- Tracked scratch reports, screenshots, editor history, and Lighthouse output should be reviewed for removal.

---

## 7. Verification evidence

| Check | Result | Notes |
|---|---|---|
| Worktree baseline | 348 status entries | 236 deleted, 57 modified, 55 untracked |
| TypeScript | Pass, exit 0 | No type errors |
| ESLint | Fail to start, exit 2 | Missing `eslint.config.*` |
| Vitest | Pass, exit 0 | 9 files, 45 tests, 54.87 seconds |
| Isolated production build | Pass, exit 0 | 2,467 modules; 10 routes plus 404; 10.78 seconds |
| Build warnings | Present | Non-module scripts and Browserslist data approximately 10 months old |
| `npm audit --omit=dev` | Final run exit 0 | 0 reported vulnerabilities across 707 dependencies |
| `dist/` versus `docs/` | Identical | 151 files; zero filename/content differences |
| Secret-pattern scan | No confirmed secrets | Only a README variable-name reference was found |
| Desktop visual check | Pass for basic rendering | 1,440×900; all 10 current routes; no horizontal overflow or visibly broken layout |
| Mobile visual check | Pass for basic rendering | 390×844 with representative reduced-motion checks |
| Nested article network check | Fail | Route-derived resource 404s observed |
| Vercel invalid path | Pass | Returns a real 404 |
| Vercel blog aliases | Pass | Permanent redirects observed |
| GitHub Pages main JavaScript | Fail | Wrong root asset URL returns 404; correctly scoped asset returns 200 |
| Vercel headers | Present | Expected production headers observed |
| Host route probes | Completed | 37 named paths plus wildcard behavior checked on both hosts |

The first Vitest attempt failed with a sandbox process-spawn `EPERM`. The unchanged test suite then passed outside that restriction. Build verification used an isolated directory under `C:\tmp` with existing dependencies so the user worktree remained untouched.

---

## 8. Remediation plan

### Must fix before production

1. Choose the canonical host and approve the canonical route inventory.
2. Define redirects or intentional removals for every legacy/live-only route.
3. Make contact configuration fail closed and verify a real controlled delivery.
4. Correct base-path and router behavior, or retire the GitHub Pages deployment.
5. Generate and deploy one reviewed artifact through one workflow.
6. Remove source maps, bundle statistics, debug utilities, and unintended standalone demos from public output.
7. Repair release gates: ESLint configuration, canonical-route probes, and one valid Lighthouse workflow.
8. Deploy only a committed, reviewable changeset and rerun the complete route matrix.

### Should fix soon

1. Introduce one typed metadata registry.
2. Repair mobile navigation, heading hierarchy, skip-link focus, and form announcements.
3. Reconcile privacy/cookie copy with actual network and storage behavior.
4. Add or harden Content Security Policy after third-party requirements are inventoried.
5. Add tests for routing, deep-link assets, form configuration, metadata, redirects, and accessibility interactions.

### Optional cleanup

1. Remove dead modules and their dependencies after a focused branch review.
2. Untrack local history and generated audit output.
3. Deduplicate large images and compress remaining assets.
4. Split or reduce the primary stylesheet.
5. Remove Lenis if native scrolling meets the design requirement.

---

## 9. Remaining uncertainty

| Question | Why it remains uncertain |
|---|---|
| Are the 12 live-only routes intentionally retired? | No product or redirect decision was documented. |
| Does EmailJS deliver in production? | No real submission was authorized; the bundle evidence makes failure highly likely but does not prove the provider response. |
| Which exact commit produced the live Vercel deployment? | The public deployment did not expose a definitive commit identifier. |
| What happened in the latest GitHub Pages action? | The relevant installation/log request returned 403 during inspection. |
| Are all color pairs contrast-compliant? | A complete automated and manual contrast inventory was not performed. |
| Does behavior match in Safari and Firefox? | Browser verification was performed in Chromium only. |
| Are offline and error-boundary flows production-safe? | Destructive/failure injection was not performed against the live site. |
| Is all browser history behavior correct? | Representative navigation was tested, not every back/forward transition. |
| Why did an earlier audit report differ from the final `npm audit` result? | The final direct run reported zero vulnerabilities; registry/advisory timing may have changed. |

---

## Final assessment

The codebase can compile, pass its current automated tests, and render the current route set, but the production system is not release-safe. The blocking issue is not a single component defect; it is the absence of an authoritative relationship between source, routes, generated artifacts, hosting configuration, and live deployments. Resolve that contract first, then fix contact delivery and the broken GitHub Pages path before treating the portfolio as production-ready.

The repository was left in the same state in which it was audited.

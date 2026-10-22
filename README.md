# Abu Rahat Sabir Portfolio

Production portfolio built with React, TypeScript, Vite, and Tailwind CSS.

- Production: <https://aburahatsabir.vercel.app>
- Hosting: Vercel
- Runtime: Node.js 20
- Package manager: npm

GitHub Pages and the legacy tracked `docs/` deployment are intentionally retired.

## Local development

```bash
git clone <repository-url>
cd portfolio
npm ci
copy .env.example .env.local
npm run dev
```

The development server uses <http://localhost:3001>.

On macOS or Linux, replace the `copy` command with:

```bash
cp .env.example .env.local
```

## Environment variables

The production contact form requires all three EmailJS values:

| Variable | Requirement | Purpose |
| --- | --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | Production required | EmailJS service |
| `VITE_EMAILJS_TEMPLATE_ID` | Production required | EmailJS template |
| `VITE_EMAILJS_PUBLIC_KEY` | Production required | EmailJS browser key |
| `VITE_SENTRY_DSN` | Optional | Error reporting |
| `SENTRY_AUTH_TOKEN` | Optional build secret | Upload hidden source maps |
| `SENTRY_ORG` | Optional build setting | Sentry organization |
| `SENTRY_PROJECT` | Optional build setting | Sentry project |

Production builds fail when required EmailJS values are absent or contain placeholders. Do not commit `.env.local` or provider secrets.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks |
| `npm run test:run` | Run the Vitest suite once |
| `npm run build` | Generate the production artifact in `dist/` |
| `npm run verify:build` | Verify routes and the public artifact |
| `npm run check` | Run lint, typecheck, tests, build, and artifact verification |

## Release process

Pull requests and pushes to `main` run `.github/workflows/ci.yml`. The workflow:

1. installs dependencies with `npm ci`;
2. runs lint, typecheck, and unit tests;
3. creates and verifies the production build;
4. runs Lighthouse against every canonical route;
5. stores Lighthouse reports as short-lived CI artifacts.

Configure repository branch protection so the `Production readiness / verify` job is required before merge.

Vercel is the only application deployment target:

1. connect the repository to Vercel;
2. set the required production environment variables;
3. use `npm run build` as the build command;
4. publish `dist/` as the output directory;
5. promote only a commit whose production-readiness workflow passed.

The repository does not contain a deployment workflow or a generated site snapshot. Deployment is performed by the Vercel project integration.

## Generated-artifact policy

The following are generated locally or in CI and must not be committed:

- `dist/` and the retired `docs/` directory;
- `.lighthouseci/` reports;
- `.vscode_history/` and other editor-local state;
- `coverage/`;
- `public/robots.txt`, `public/rss.xml`, and `public/sitemap.xml`;
- browser screenshots, scrape output, compiler logs, and temporary migration files.

`npm run build` regenerates the crawl files before Vite builds the application. Lighthouse reports are retained by GitHub Actions for 14 days rather than stored in Git.

## Application structure

```text
components/       React pages and reusable UI
config/           Typed runtime/build configuration
content/          Portfolio and article content
public/           Intentional static assets
scripts/          Sitemap, RSS, prerender, and verification tools
test/             Shared test setup
utils/            Analytics, SEO, resilience, and monitoring helpers
App.tsx           Route composition
index.tsx         Browser entry point
vite.config.ts    Production build configuration
vercel.json       Hosting headers and route behavior
```

## Privacy behavior

- Google Analytics is not requested until the visitor accepts analytics.
- Advertising and personalization storage remain disabled.
- Withdrawing consent clears the application's queued analytics state.
- Sentry is optional; performance tracing and session replay are disabled.
- Contact submissions are sent through EmailJS only after the visitor submits the form.

See the in-application Privacy Policy and Cookie Policy for visitor-facing disclosures.

## Documentation

- [Production-readiness audit](portfolio-production-readiness-audit.md)
- [Contributing guide](CONTRIBUTING.md)

## Ownership

Private repository. All rights reserved.

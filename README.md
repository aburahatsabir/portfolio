# Abu Rahat Sabir - Professional Portfolio

> **Enterprise Operations Automation & Systems Architecture Portfolio**  
> Showcasing institutional-grade infrastructure design, operations sovereignty, and business-driven technical solutions.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)

**Live Site**: [https://aburahatsabir.com](https://aburahatsabir.com)  
**Status**: ✅ Production-Ready | 🚀 Deployed on Vercel + GitHub Pages

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: Version 10.0.0 or higher (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))

**Verify your installation**:
```bash
node --version  # Should show v20.x.x or higher
npm --version   # Should show 10.x.x or higher
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aburahatsabir/portfolio.git
cd portfolio

# 2. Install dependencies (takes ~2-3 minutes)
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Configure EmailJS credentials (see Environment Variables section below)
# Edit .env.local with your actual EmailJS credentials

# 5. Start development server
npm run dev
```

**✅ Success!** Open [http://localhost:3000](http://localhost:3000) in your browser.

> **⚡ Dev Server Performance**: 
> - Cold start: < 1 second
> - Hot Module Replacement (HMR): < 50ms
> - Full page reload: < 200ms

---

## 📋 Environment Variables

### Required Configuration

Create `.env.local` in the project root and configure the following:

| Variable | Required | Description | How to Get It |
|----------|----------|-------------|---------------|
| `VITE_EMAILJS_SERVICE_ID` | **Yes** | EmailJS service identifier for contact form | 1. Create account at [EmailJS](https://www.emailjs.com/)<br/>2. Go to [Email Services](https://dashboard.emailjs.com/admin)<br/>3. Copy the Service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | **Yes** | Email template ID for form submissions | 1. Go to [Email Templates](https://dashboard.emailjs.com/admin/templates)<br/>2. Create or select a template<br/>3. Copy the Template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | **Yes** | EmailJS public API key | 1. Go to [Account Settings](https://dashboard.emailjs.com/admin/account)<br/>2. Copy the Public Key from API Keys section |
| `VITE_SENTRY_DSN` | No | Sentry error tracking DSN (optional) | 1. Create account at [Sentry.io](https://sentry.io/)<br/>2. Create a new React project<br/>3. Copy the DSN from project settings<br/><br/>**Note**: If not set, errors log to console only |

### Environment Setup Example

```env
# .env.local
VITE_EMAILJS_SERVICE_ID=service_abc123def
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=Zy1234567890AbCdEf
VITE_SENTRY_DSN=https://abc123@o123456.ingest.sentry.io/7654321
```

### Sentry Configuration (Optional)

For production builds with source map upload:

```bash
# Additional Sentry environment variables (optional)
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_ORG=abu-rahat-sabir
SENTRY_PROJECT=portfolio
```

> **Security Note**: Never commit `.env.local` to version control. It's already in `.gitignore`.

---

## 🛠️ Available Scripts

### Development

| Command | Description | Port | Performance |
|---------|-------------|------|-------------|
| `npm run dev` | Start development server with HMR | 3000 | Cold start < 1s |
| `npm run preview` | Preview production build locally | 4173 | Build required first |

### Building

| Command | Description | Output | Time |
|---------|-------------|--------|------|
| `npm run build` | Build for production with optimizations | `docs/` | ~6.5s |
| `npm run build:analyze` | Build and open bundle size analyzer | `docs/` + stats.html | ~7s |

**Build Output**:
- **Directory**: `docs/` (configured for GitHub Pages)
- **Bundle Size**: ~335 KB (gzipped)
- **Chunks**: React vendor, Framer Motion vendor, EmailJS vendor
- **Source Maps**: Enabled for debugging

### Testing

| Command | Description | Coverage |
|---------|-------------|----------|
| `npm test` | Run tests in watch mode | N/A |
| `npm run test:ui` | Open Vitest UI for interactive testing | N/A |
| `npm run test:run` | Run all tests once (CI mode) | N/A |
| `npm run test:coverage` | Generate coverage report | HTML + terminal |

**Testing Stack**:
- **Framework**: Vitest 4.0
- **DOM Environment**: Happy DOM
- **Testing Library**: React Testing Library 16.3
- **Coverage Tool**: Istanbul

### Image Optimization

| Command | Description | Target |
|---------|-------------|--------|
| `npm run optimize:images` | Optimize all images using Sharp | All directories |
| `npm run optimize:projects` | Optimize project images only | `public/images/projects` |
| `npm run optimize:testimonials` | Optimize testimonial images only | `public/images/testimonials` |
| `npm run optimize:logos` | Optimize logo images only | `public/images/logos` |
| `npm run convert:webp` | Convert images to WebP format | All images |

**Image Optimization**:
- **Tool**: Sharp (libvips-based)
- **Formats**: WebP (primary), JPEG fallback
- **Compression**: Lossless with quality 90
- **Size Reduction**: ~60-80% vs original

### SEO & Performance

| Command | Description | Tool |
|---------|-------------|------|
| `npm run generate-sitemap` | Regenerate XML sitemap | Custom Node script |
| `npm run lighthouse` | Run Lighthouse performance audit | Google Lighthouse |

**Lighthouse Scores** (Desktop):
- Performance: 98/100
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

---

## 📁 Project Structure

```
portfolio/
├── components/              # React components (42 files)
│   ├── shared/             # Reusable UI components
│   │   ├── Button.tsx      # Styled button component
│   │   ├── Card.tsx        # Card layout component
│   │   ├── Section.tsx     # Page section wrapper
│   │   └── Typography.tsx  # Typography components
│   ├── About.tsx           # About page component
│   ├── Contact.tsx         # Contact page component
│   ├── ContactForm.tsx     # EmailJS contact form
│   ├── ErrorBoundary.tsx   # React error boundary
│   ├── Hero.tsx            # Landing page hero section
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer component
│   ├── Work.tsx            # Work/Projects showcase
│   └── ...                 # Other page components
│
├── content/                # Content data (TypeScript objects)
│   ├── blog-posts.ts       # Blog/article content
│   ├── projects.ts         # Portfolio projects data
│   ├── testimonials.ts     # Client testimonials
│   ├── experiences.ts      # Work experience timeline
│   ├── tech-stack.ts       # Technology expertise
│   └── index.ts            # Content exports
│
├── hooks/                  # Custom React hooks
│   ├── useEngagementTime.ts     # Track user engagement time
│   ├── useExitIntent.ts         # Detect exit intent
│   └── useScrollDepth.ts        # Track scroll depth
│
├── utils/                  # Utility functions
│   ├── analytics.ts             # Google Analytics 4 tracking
│   ├── analytics-fallback.ts   # Offline analytics fallback
│   ├── sentry.ts               # Sentry error monitoring
│   ├── api-resilience.ts       # API retry logic
│   ├── form-backup.ts          # LocalStorage form backup
│   ├── network-status.ts       # Online/offline detection
│   ├── script-health-monitor.ts # Third-party script monitoring
│   ├── seo-schema.ts           # JSON-LD schema generation
│   ├── seo-utils.ts            # SEO helper functions
│   ├── animations.ts           # Framer Motion configs
│   ├── navigation.ts           # Routing utilities
│   └── lazy-loading.tsx        # Component lazy loading
│
├── public/                 # Static assets
│   ├── images/            # Optimized images (WebP + JPEG)
│   │   ├── projects/      # Project screenshots
│   │   ├── testimonials/  # Testimonial photos
│   │   └── logos/         # Company/tech logos
│   ├── pages/             # Prerendered HTML for SEO
│   ├── sitemap.xml        # XML sitemap (auto-generated)
│   ├── robots.txt         # Crawler instructions
│   └── favicon.ico        # Site favicon
│
├── scripts/               # Build scripts
│   ├── generate-sitemap.js      # Sitemap generator
│   ├── optimize-images.js       # Image optimizer
│   └── convert-to-webp.js       # WebP converter
│
├── test/                  # Test utilities
│   └── setup.ts           # Vitest setup
│
├── docs/                  # Build output (gitignored)
│   └── (generated by vite build)
│
├── App.tsx               # Main application component
├── index.tsx             # Application entry point
├── index.html            # HTML template
├── index.css            # Global styles (Tailwind base)
├── types.ts             # TypeScript type definitions
├── constants.tsx        # Application constants
│
├── vite.config.ts       # Vite build configuration
├── vitest.config.ts     # Vitest test configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
│
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies
└── README.md            # This file
```

---

## 🚢 Deployment

### Primary Deployment: Vercel

**Automatic Deployment** (Recommended):
1. Connect repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Push to `main` branch → Auto-deploys

**Manual Deployment**:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**Vercel Configuration** (vercel.json):
- Build command: `vite build`
- Output directory: `docs`
- Node.js version: 20.x
- Auto-assigns HTTPS domain

### Secondary Deployment: GitHub Pages

**Automatic Deployment** (via GitHub Actions):
```bash
# Simply push to main branch
git push origin main

# GitHub Actions will:
# 1. Run npm run build
# 2. Deploy docs/ to gh-pages branch
# 3. Serve at https://aburahatsabir.github.io/portfolio
```

**Manual Deployment**:
```bash
# Build the project
npm run build

# The docs/ folder is ready for GitHub Pages
# Enable GitHub Pages in repository settings
# Select 'main' branch and '/docs' folder
```

### Build Output

After running `npm run build`, the `docs/` directory contains:

```
docs/
├── index.html                 # Main HTML entry
├── assets/
│   ├── react-vendor-[hash].js     # React core (~130 KB)
│   ├── motion-vendor-[hash].js    # Framer Motion (~45 KB)
│   ├── emailjs-vendor-[hash].js   # EmailJS (~15 KB)
│   ├── index-[hash].js            # Application code
│   ├── index-[hash].css           # Tailwind styles
│   └── [name]-[hash].[ext]        # Other assets
├── images/                    # Optimized images
├── sitemap.xml               # SEO sitemap
└── stats.html                # Bundle analyzer (if using build:analyze)
```

**Bundle Analysis**:
- View bundle composition: `npm run build:analyze`
- Opens `docs/stats.html` with interactive sunburst chart
- Identifies large dependencies and optimization opportunities

---

## 🧪 Testing

### Running Tests

```bash
# Watch mode (recommended for development)
npm test

# Single run (for CI)
npm run test:run

# With coverage report
npm run test:coverage

# Interactive UI
npm run test:ui
```

### Test Coverage

Target coverage (based on Layer 10 audit):
- **Critical paths**: 80%+ (forms, analytics, error handling)
- **UI components**: 60%+ (visual components)
- **Utils**: 90%+ (pure functions)

**View Coverage Report**:
```bash
npm run test:coverage
# Opens coverage/index.html in browser
```

### Writing Tests

Tests are located in:
- Component tests: `components/__tests__/`
- Utility tests: `utils/__tests__/`

**Example Test**:
```typescript
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/Hero';

describe('Hero Component', () => {
  it('renders hero title', () => {
    render(<Hero />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Module not found" errors

**Cause**: Corrupted `node_modules` or cache  
**Solution**:
```bash
# Delete node_modules and lockfile
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

#### 2. Build fails with "out of memory"

**Cause**: Large bundle size or memory constraints  
**Solution**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### 3. Vite cache issues

**Cause**: Stale Vite cache  
**Solution**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

#### 4. EmailJS not working

**Cause**: Missing or incorrect environment variables  
**Solution**:
```bash
# 1. Verify .env.local exists
ls -la .env.local

# 2. Check variable names (must start with VITE_)
cat .env.local

# 3. Restart dev server after changing env vars
npm run dev  # Vite loads env vars on startup
```

**Debug EmailJS**:
```typescript
// In ContactForm.tsx, check console for errors
console.log('EmailJS Config:', {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  // Should show your actual service ID, not 'undefined'
});
```

#### 5. Port 3000 already in use

**Cause**: Another process using port 3000  
**Solution**:
```bash
# Option 1: Kill process on port 3000
npx kill-port 3000

# Option 2: Use different port
PORT=3001 npm run dev  # Starts on port 3001
```

#### 6. TypeScript errors in IDE

**Cause**: IDE not recognizing TypeScript config  
**Solution**:
```bash
# Run type check manually
npm run type-check  # (Add this script if missing)

# Or use TypeScript compiler
npx tsc --noEmit
```

#### 7. Images not loading

**Cause**: Incorrect path or missing optimization  
**Solution**:
```bash
# Verify image exists
ls -la public/images/

# Re-optimize images
npm run optimize:images

# Check browser console for 404 errors
```

---

## 📊 Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.3 | UI framework with latest concurrent features |
| **TypeScript** | 5.8.2 | Type-safe JavaScript with strict mode |
| **Vite** | 6.2.0 | Ultra-fast build tool with HMR < 50ms |
| **Tailwind CSS** | 3.4.19 | Utility-first CSS framework |

### Key Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| **Framer Motion** | 11.0.0 | Animation library (21 KB) |
| **EmailJS** | 4.4.1 | Contact form email service |
| **Sentry** | 10.38.0 | Error tracking and monitoring |
| **React Helmet Async** | 2.0.5 | SEO meta tag management |
| **Web Vitals** | 5.1.0 | Core Web Vitals measurement |
| **Recharts** | 2.12.0 | Data visualization charts |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **Vitest** | 4.0.18 | Unit testing framework |
| **Testing Library** | 16.3.2 | React component testing |
| **ESLint** | 9.39.2 | Code linting (already configured) |
| **Prettier** | 3.8.1 | Code formatting (already configured) |
| **Happy DOM** | 20.5.0 | Fast DOM environment for tests |

### Build Optimizations

- **Minifier**: Terser with 2-pass compression
- **CSS Minifier**: Lightning CSS
- **Bundle Analyzer**: Rollup Visualizer
- **Source Maps**: Enabled for production debugging
- **Code Splitting**: Manual chunks (react-vendor, motion-vendor, emailjs-vendor)
- **Tree Shaking**: Aggressive dead code elimination
- **Target Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Performance Features

- **Hot Module Replacement**: < 50ms updates
- **Build Time**: ~6.58 seconds
- **Bundle Size**: 335 KB (gzipped)
- **Lazy Loading**: Route-based code splitting
- **Image Optimization**: WebP with JPEG fallback
- **CDN Caching**: Vercel Edge Network

---

## 🔒 Security & Privacy

### Security Features

- **Content Security Policy (CSP)**: Defined in `vercel.json`
- **HTTPS Only**: Enforced by Vercel
- **Sentry Error Tracking**: PII scrubbing enabled
- **No Sensitive Data Storage**: All secrets in environment variables
- **Dependencies**: Regularly updated for security patches

### Privacy Compliance

- **Cookie Consent**: GDPR-compliant banner
- **Analytics**: Google Analytics 4 with anonymized IPs
- **Data Collection**: Minimal (only contact form submissions)
- **Third-Party Scripts**: Monitored for failures (GA4, EmailJS)

---

## 📖 Documentation

### Additional Resources

- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Development guidelines and PR process
- **[Layer 10 DX Report](https://github.com/aburahatsabir/portfolio/docs/layer10-dx-report.md)**: Developer Experience audit
- **[Architecture Overview](https://github.com/aburahatsabir/portfolio/docs/architecture.md)**: System design documentation (planned)

### External Documentation

- [Vite Documentation](https://vitejs.dev/)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Vitest Documentation](https://vitest.dev/)

---

## 📝 License

**Private** - All Rights Reserved

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

## 👤 Author

**Abu Rahat Sabir**  
Senior Systems Architect & Operations Automation Specialist

- **Website**: [https://aburahatsabir.com](https://aburahatsabir.com)
- **LinkedIn**: [linkedin.com/in/aburahatsabir](https://linkedin.com/in/aburahatsabir)
- **Email**: [contact@aburahatsabir.com](mailto:contact@aburahatsabir.com)
- **GitHub**: [github.com/aburahatsabir](https://github.com/aburahatsabir)

---

## 🙏 Acknowledgments

- **Vite Team**: For the incredible build tool
- **Vercel**: For seamless deployment infrastructure
- **EmailJS**: For serverless contact form solution
- **Sentry**: For production error monitoring

---

## 📈 Project Stats

- **Total Components**: 42 React components
- **Total Utilities**: 14 helper modules
- **Total Content Files**: 11 data modules
- **Custom Hooks**: 3 React hooks
- **Test Coverage**: Tracked via Vitest
- **Build Size**: ~335 KB (gzipped)
- **Lighthouse Score**: 98/100 (Desktop Performance)

---

## 🚀 Recent Updates

### Version 2.0.0 (Latest)
- ✅ Migrated to React 19
- ✅ Upgraded to Vite 6
- ✅ Added comprehensive error boundaries
- ✅ Implemented Sentry error tracking
- ✅ Added offline form backup
- ✅ Optimized bundle size to 335 KB
- ✅ Achieved 98/100 Lighthouse score

---

**Last Updated**: February 7, 2026  
**Maintained**: Actively  
**Status**: ✅ Production-Ready

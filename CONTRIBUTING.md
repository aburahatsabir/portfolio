# Contributing to Abu Rahat Sabir Portfolio

Thank you for your interest in contributing! This document provides guidelines for contributing to ensure consistency and quality across the codebase.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Conventions](#commit-message-conventions)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Project-Specific Guidelines](#project-specific-guidelines)

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

1. **Read the README.md** - Understand the project setup and architecture
2. **Set up your development environment** - Follow the Quick Start guide in README.md
3. **Verified your setup** - Can run `npm run dev` and access the site at localhost:3000
4. **Created a GitHub account** - Required for pull requests

### First-Time Setup

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# 3. Add upstream remote
git remote add upstream https://github.com/aburahatsabir/portfolio.git

# 4. Install dependencies
npm install

# 5. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your EmailJS credentials

# 6. Verify setup
npm run dev  # Should start on port 3000
npm test     # Should run tests successfully
```

---

## Development Workflow

### 1. Create a Feature Branch

**Always work on a feature branch, never directly on `main`.**

```bash
# Sync with upstream main
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Branch Naming Conventions

Use the following prefixes:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New features | `feature/add-blog-section` |
| `fix/` | Bug fixes | `fix/contact-form-validation` |
| `docs/` | Documentation updates | `docs/update-readme` |
| `refactor/` | Code refactoring | `refactor/simplify-analytics` |
| `perf/` | Performance improvements | `perf/optimize-images` |
| `test/` | Adding or updating tests | `test/add-form-tests` |
| `chore/` | Maintenance tasks | `chore/update-dependencies` |

### 2. Make Your Changes

**Follow these principles:**

- ✅ **Make small, focused commits** - Each commit should do one thing
- ✅ **Test your changes** - Run `npm test` and manually verify in browser
- ✅ **Update documentation** - If you change behavior, update README.md or comments
- ✅ **Follow code style** - Match existing patterns and conventions

### 3. Keep Your Branch Updated

```bash
# Regularly sync with upstream
git fetch upstream
git rebase upstream/main

# Resolve any conflicts
# Then:
git add .
git rebase --continue
```

### 4. Push Your Changes

```bash
# Push to your fork
git push origin feature/your-feature-name

# If you rebased:
git push --force-with-lease origin feature/your-feature-name
```

---

## Code Style Guidelines

### TypeScript

**Type Safety**:
```typescript
// ✅ Good: Explicit types for function parameters and returns
function trackEvent(eventName: string, params: EventParams): void {
  // ...
}

// ✅ Good: Use interfaces for object shapes
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// ❌ Bad: Using 'any' type
function trackEvent(eventName: any, params: any): any {
  // ...
}
```

**Strict Mode Compliance**:
- This project uses TypeScript strict mode
- All code must pass `tsc --noEmit` without errors
- No use of `@ts-ignore` without detailed justification in comments

### React Components

**Component Structure**:
```typescript
// ✅ Good: Functional component with proper typing
import { FC } from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
}

export const Hero: FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <section className="hero">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  );
};

// ❌ Bad: No types, no explicit exports
const Hero = ({ title, subtitle }) => {
  // ...
};
```

**File Naming**:
- Components: `PascalCase.tsx` (e.g., `ContactForm.tsx`)
- Utilities: `kebab-case.ts` (e.g., `analytics.ts`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useScrollDepth.ts`)
- Tests: `ComponentName.test.tsx` or `ComponentName.spec.tsx`

### CSS / Tailwind

**Use Tailwind Utility Classes**:
```tsx
// ✅ Good: Tailwind utilities
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Submit
</button>

// ⚠️ Acceptable: Custom CSS for complex animations
<div className="custom-animation">
  {/* Defined in index.css */}
</div>

// ❌ Avoid: Inline styles
<button style={{ padding: '8px 16px', backgroundColor: '#2563eb' }}>
  Submit
</button>
```

**Tailwind Organization**:
- Order: Layout → Positioning → Sizing → Colors → Typography → Effects
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Use arbitrary values sparingly: `w-[137px]` (prefer standard values)

### Code Comments

**When to Comment**:
```typescript
// ✅ Good: Explain WHY, not WHAT
// Prevent spam: 60-second cooldown between submissions
// Balances UX (not too restrictive) with abuse prevention
const COOLDOWN_PERIOD = 60000;

// ✅ Good: Document complex logic
/**
 * Tracks contact CTA clicks with contextual metadata
 * @param location - Where the CTA was clicked (e.g., 'hero_section', 'footer')
 * @param label - CTA identifier for differentiation (e.g., 'free_audit_cta')
 */
function trackContactCTA(location: string, label: string): void {
  // ...
}

// ❌ Bad: Stating the obvious
// Set cooldown period to 60000
const COOLDOWN_PERIOD = 60000;

// ❌ Bad: Commented-out code (delete instead)
// const oldFunction = () => { ... };
```

**JSDoc for Public Functions**:
```typescript
/**
 * Sends an email via EmailJS with retry logic and error handling
 * @param formData - Contact form submission data
 * @param formData.name - Sender's full name
 * @param formData.email - Sender's email address
 * @param formData.message - Message content (max 2000 chars)
 * @returns Promise resolving to submission status
 * @throws {EmailError} If EmailJS fails after 3 retry attempts
 * @example
 * await sendEmail({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   message: 'Hello!'
 * });
 */
async function sendEmail(formData: FormData): Promise<EmailStatus> {
  // Implementation...
}
```

### File Organization

**Component Organization**:
```typescript
// 1. Imports (grouped)
import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '@/utils/analytics';
import { MyComponent } from './MyComponent';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Constants
const ANIMATION_DURATION = 300;

// 4. Component
export const MyComponent: FC<Props> = ({ prop1, prop2 }) => {
  // 4a. State
  const [state, setState] = useState(false);
  
  // 4b. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 4c. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 4d. Return JSX
  return (
    // ...
  );
};

// 5. Helper functions (if not exported)
function helperFunction() {
  // ...
}
```

---

## Commit Message Conventions

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Usage | Example |
|------|-------|---------|
| `feat` | New feature | `feat(contact): add form validation` |
| `fix` | Bug fix | `fix(analytics): prevent duplicate events` |
| `docs` | Documentation | `docs(readme): update setup instructions` |
| `style` | Code style/formatting | `style(contact): format with Prettier` |
| `refactor` | Code restructuring | `refactor(utils): simplify analytics logic` |
| `perf` | Performance improvement | `perf(images): implement lazy loading` |
| `test` | Adding/updating tests | `test(form): add validation tests` |
| `chore` | Maintenance | `chore(deps): update React to 19.2.3` |

### Examples

**Good commit messages**:
```
feat(contact): add email validation with regex pattern

- Validates email format before submission
- Shows inline error message for invalid emails
- Prevents submission if validation fails

Closes #45
```

```
fix(analytics): prevent double-tracking on page load

GA4 was firing twice due to StrictMode in development.
Added deduplication logic to track each event only once.

Fixes #78
```

```
perf(images): optimize project screenshots to WebP

- Converted 15 PNG images to WebP format
- Reduced total image size from 2.3 MB to 680 KB
- Added JPEG fallback for older browsers

Performance improvement: ~70% smaller payload
```

**Bad commit messages**:
```
❌ "fixed stuff"
❌ "updates"
❌ "WIP"
❌ "asdf"
❌ "More changes to the form"
```

### Commit Size

- **Small commits**: 1-50 lines changed (ideal)
- **Medium commits**: 50-200 lines changed (acceptable)
- **Large commits**: 200+ lines changed (avoid; split into multiple commits)

**Exception**: Dependency updates (`package-lock.json`) can be large single commits.

---

## Pull Request Process

### Before Creating a PR

**Pre-submission Checklist**:

- [ ] Code follows style guidelines
- [ ] All tests pass (`npm test`)
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] No console errors in browser
- [ ] Tested in Chrome, Firefox, and Safari (if UI change)
- [ ] Updated README.md if adding new features or scripts
- [ ] Added JSDoc comments to new public functions
- [ ] Verified no sensitive data (API keys, tokens) in commits

### Creating a Pull Request

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open PR on GitHub**:
   - Go to https://github.com/aburahatsabir/portfolio
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template (see below)

### PR Title Format

```
<type>: <concise description>
```

Examples:
- `feat: Add dark mode toggle`
- `fix: Resolve contact form submission error`
- `perf: Optimize image loading with lazy loading`

### PR Description Template

```markdown
## Description
[Brief description of what this PR does]

## Changes Made
- [ ] Change 1
- [ ] Change 2
- [ ] Change 3

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing Done
- [ ] Tested locally on Chrome, Firefox, Safari
- [ ] Tested mobile viewport (if UI change)
- [ ] All existing tests pass
- [ ] Added new tests for new features

## Screenshots (if applicable)
[Add before/after screenshots for UI changes]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex logic
- [ ] Updated documentation (if needed)
- [ ] No new warnings or errors
- [ ] Tested on localhost:3000

## Related Issues
Closes #[issue_number]
Fixes #[issue_number]
```

### PR Review Process

1. **Automated Checks** (if configured):
   - Tests must pass
   - Build must succeed
   - No linting errors

2. **Code Review**:
   - Maintainer will review within 48 hours
   - Address feedback promptly
   - Push updates to the same branch

3. **Approval and Merge**:
   - Once approved, maintainer will merge
   - Your branch will be deleted
   - Changes go live on next deployment

---

## Testing Requirements

### Test Coverage Expectations

| Code Type | Minimum Coverage | Priority |
|-----------|------------------|----------|
| **Critical Paths** | 80% | High (forms, analytics, error handling) |
| **UI Components** | 60% | Medium (visual components) |
| **Utility Functions** | 90% | High (pure functions) |

### Writing Tests

**Test File Location**:
```
components/ContactForm.tsx
components/__tests__/ContactForm.test.tsx
```

**Test Structure**:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from '../ContactForm';

describe('ContactForm', () => {
  // Test what the component renders
  it('renders form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  // Test user interactions
  it('validates email format on blur', () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email/i);
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  // Test edge cases
  it('disables submit button during cooldown', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button', { name: /send/i });
    
    fireEvent.click(submitButton);
    
    // Should be disabled during cooldown
    expect(submitButton).toBeDisabled();
  });
});
```

### Running Tests

```bash
# Watch mode (runs on file save)
npm test

# Single run for CI
npm run test:run

# With coverage
npm run test:coverage

# Interactive UI
npm run test:ui
```

### Test Quality Standards

- **Descriptive test names**: `it('disables submit during cooldown')` not `it('works')`
- **Arrange-Act-Assert pattern**: Set up → Perform action → Verify result
- **No test interdependency**: Each test runs independently
- **Mock external services**: EmailJS, analytics, etc.

---

## Project-Specific Guidelines

### Analytics Tracking

**When adding new trackable events**:

```typescript
import { trackEvent } from '@/utils/analytics';

// Use consistent event naming
trackEvent('cta_click', {
  location: 'hero_section',  // Where clicked
  label: 'free_audit_cta',   // What was clicked
  value: 1                    // Optional: numeric value
});
```

**Event Naming Conventions**:
- Use `snake_case` for event names
- Be specific: `form_submit_success` not `submit`
- Include context in parameters

### Image Optimization

**Adding new images**:

1. Place image in appropriate directory:
   - Project images: `public/images/projects/`
   - Testimonials: `public/images/testimonials/`
   - Logos: `public/images/logos/`

2. Run optimization:
   ```bash
   npm run optimize:images
   ```

3. Use OptimizedImage component:
   ```tsx
   import { OptimizedImage } from '@/components/OptimizedImage';
   
   <OptimizedImage
     src="/images/projects/my-project.webp"
     alt="Descriptive alt text"
     width={800}
     height={600}
   />
   ```

### Error Handling

**Use Sentry for production errors**:

```typescript
import { captureException } from '@/utils/sentry';

try {
  await riskyOperation();
} catch (error) {
  // Log to Sentry with context
  captureException(error, {
    tags: { component: 'ContactForm' },
    extra: { formData: sanitizedData }
  });
  
  // Show user-friendly message
  setErrorMessage('Something went wrong. Please try again.');
}
```

### SEO Updates

**When adding new pages**:

1. Update sitemap generator:
   ```javascript
   // scripts/generate-sitemap.js
   const routes = [
     '/',
     '/about',
     '/work',
     '/your-new-page',  // Add here
   ];
   ```

2. Regenerate sitemap:
   ```bash
   npm run generate-sitemap
   ```

3. Add meta tags:
   ```tsx
   import { Helmet } from 'react-helmet-async';
   
   <Helmet>
     <title>Page Title | Abu Rahat Sabir</title>
     <meta name="description" content="Page description" />
   </Helmet>
   ```

---

## Questions?

If you have questions:

1. **Check the README.md** - Most setup issues are covered
2. **Search existing issues** - Someone may have asked before
3. **Open a new issue** - Use the question template
4. **Contact maintainer** - [contact@aburahatsabir.com](mailto:contact@aburahatsabir.com)

---

## Code of Conduct

This project adheres to a simple code of conduct:

- **Be respectful** - Treat all contributors with respect
- **Be constructive** - Provide helpful feedback
- **Be collaborative** - Work together to improve the codebase

---

**Thank you for contributing!** Your efforts help make this portfolio better. 🚀

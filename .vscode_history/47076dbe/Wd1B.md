# MASTER IMPLEMENTATION PROMPT
**Abu Rahat Sabir Portfolio | Conversion Optimization & Enterprise-Grade Upgrade**

---

## 🎯 MISSION DIRECTIVE

**Goal**: Transform portfolio from B-Grade (6.1/10) → A-Grade (8.5+/10)  
**Primary Focus**: Convert 300% more executive inquiries (email + contact form)  
**Timeline**: 4 weeks (staged rollout)  
**Success Metrics**:
- Organic search visibility: 50 → 250+ monthly visitors
- Contact conversions: 2-3 → 8-10 monthly submissions
- Email engagement rate: <10% → >40%
- Accessibility score: A → AAA (WCAG 2.1)
- Core Web Vitals: "GOOD" → "EXCELLENT"

---

## PHASE 1: CRITICAL FOUNDATION (Week 1 - 48 Hours)

### 1.1 Error Handling & Stability
**Owner**: Senior Front-End Engineer  
**Deliverable**: Error Boundary component + graceful fallbacks

#### 1.1.1 Create ErrorBoundary.tsx
```typescript
// components/ErrorBoundary.tsx
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => React.ReactNode;
}

interface State {
  error: Error | null;
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error logging service (Sentry)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback?.(this.state.error!, () => {
          this.setState({ hasError: false, error: null });
        }) ?? (
          <div className="min-h-screen flex items-center justify-center bg-white px-6">
            <div className="text-center space-y-6 max-w-md">
              <h1 className="text-4xl font-black text-slate-900">Oops!</h1>
              <p className="text-slate-600 text-lg">
                Something went wrong. Our team has been notified.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
              >
                Return Home
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### 1.1.2 Update App.tsx
```typescript
// Wrap renderContent() output with ErrorBoundary
<ErrorBoundary fallback={(error, retry) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-4 text-center">
      <p className="text-red-600">{error.message}</p>
      <button onClick={retry}>Retry</button>
    </div>
  </div>
)}>
  {renderContent()}
</ErrorBoundary>
```

---

### 1.2 API Resilience & UX
**Owner**: Senior Front-End Engineer  
**Deliverable**: Timeout handling + retry logic

#### 1.2.1 Update geminiService.ts
```typescript
// services/geminiService.ts

// Add timeout wrapper
const withTimeout = <T,>(
  promise: Promise<T>,
  timeoutMs: number = 30000
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Request timeout after ${timeoutMs}ms`)),
        timeoutMs
      )
    ),
  ]);
};

// Add retry logic
const withRetry = async <T,>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (attempt === maxAttempts) throw error;
      if (error?.message?.includes('quota')) throw error; // Don't retry quota
      await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
    }
  }
  throw new Error('Max retry attempts exceeded');
};

// Update getStrategyAdvice with timeout + retry
export const getStrategyAdvice = async (userProblem: string) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return "⚠️ **API Key Required**\n\nPlease configure your Gemini API key to use the AI Assistant.\n\n1. Click the settings icon (⚙️) below\n2. Enter your Gemini API key\n3. Get a free API key at: https://aistudio.google.com/apikey";
  }

  try {
    const response = await withRetry(
      () => withTimeout(
        (async () => {
          const ai = new GoogleGenAI({ apiKey });
          return await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `Perform an Executive System Audit for the following operational problem: ${userProblem}`,
            config: {
              thinkingConfig: {
                thinkingBudget: 32768,
              },
              systemInstruction: `... [existing system instruction] ...`,
              temperature: 0.7,
            }
          });
        })(),
        30000 // 30 second timeout
      ),
      2 // max 2 retries
    );

    return response.text || "Audit failed due to insufficient telemetry.";
  } catch (error: any) {
    console.error("Gemini Error:", error);

    if (error?.message?.includes('timeout')) {
      return "⏱️ **Request Timeout**\n\nThe AI engine took too long to respond. Please try again in a moment.\n\nIf this persists, check your internet connection or try a simpler query.";
    }

    if (error?.message?.includes('API key')) {
      return "❌ **Invalid API Key**\n\nThe provided API key appears to be invalid. Please check your API key and try again.\n\nGet a valid API key at: https://aistudio.google.com/apikey";
    }

    if (error?.message?.includes('quota')) {
      return "❌ **Quota Exceeded**\n\nYour API key has exceeded its quota. Please check your usage limits in Google AI Studio.";
    }

    return "❌ **Diagnostic Engine Offline**\n\nAn error occurred while processing your request. Please try again later.\n\nError: " + (error?.message || "Unknown error");
  }
};
```

---

### 1.3 Accessibility Compliance (Quick Wins)
**Owner**: Senior Accessibility Specialist  
**Deliverable**: WCAG 2.1 AA compliance for critical elements

#### 1.3.1 Add Alt Text to All Images
Search codebase for `<img` and `<Image` tags. Add descriptive alt text:

```tsx
// Example: Hero.tsx
<img 
  src={content[activeMandate].image}
  alt={`Abu Rahat Sabir - ${activeMandate === 'sovereignty' ? 'Engineering Institutional Sovereignty' : 'Reclaiming Operational Capital'}`}
  className="w-full h-auto rounded-2xl"
/>
```

#### 1.3.2 Add Form Labels to Contact.tsx
```tsx
// Replace input-only approach with labeled inputs
<div className="space-y-4">
  <div>
    <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
      Your Name
    </label>
    <input
      id="name"
      type="text"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
      required
    />
  </div>
  {/* Repeat for email, subject, message */}
</div>
```

#### 1.3.3 Add Focus Indicators (index.css)
```css
/* Add to index.css */

/* Visible focus indicators for keyboard navigation */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### 1.3.4 Add ARIA Labels to Icon Buttons
```tsx
// Navbar hamburger menu
<button
  onClick={() => setIsOpen(!isOpen)}
  className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 z-[310] relative focus:outline-none"
  aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>
  {/* Hamburger icon */}
</button>

<nav id="mobile-menu" aria-hidden={!isOpen}>
  {/* Mobile menu items */}
</nav>
```

---

### 1.4 Core Contact CTA Restructuring
**Owner**: Senior UX/Brand Strategist  
**Deliverable**: Simplified, high-converting Contact section

#### 1.4.1 Rewrite Contact.tsx (Simplified)
```tsx
// New Contact section structure
<section id="contact" className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* HERO SECTION: The Ask */}
    <div className="text-center space-y-6 mb-20 max-w-2xl mx-auto">
      <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">Let's Talk Strategy</h2>
      <h3 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-slate-900">
        Ready to fix your operational chaos?
      </h3>
      <p className="text-lg text-slate-600 leading-relaxed">
        Most conversations start with a 15-minute call. I'll diagnose your biggest bottleneck and show you exactly where to start.
      </p>
      <p className="text-sm font-bold text-blue-600">
        ⏰ I respond to all inquiries within 2 hours on business days.
      </p>
    </div>

    {/* PRIMARY CTA: EMAIL */}
    <div className="max-w-md mx-auto mb-16 text-center space-y-4">
      <a 
        href="mailto:aburahatsabir178@gmail.com?subject=Operations%20Optimization%20Inquiry"
        className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Email Abu Directly
      </a>
      <p className="text-[12px] text-slate-500">aburahatsabir178@gmail.com</p>
    </div>

    {/* SECONDARY: FORM WITH QUALIFICATION */}
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="text-center">
        <p className="text-sm font-bold text-slate-600 mb-6">Or tell me about your situation:</p>
      </div>

      <ContactForm /> {/* New optimized component below */}

      {/* TERTIARY: SOCIAL / LINKEDIN */}
      <div className="text-center pt-12 border-t border-slate-200">
        <p className="text-sm font-bold text-slate-600 mb-6">Connect on social</p>
        <SocialLinks />
      </div>
    </div>

  </div>
</section>
```

#### 1.4.2 Create ContactForm.tsx (New)
```tsx
// components/ContactForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '', // NEW: Qualification field
    challenge: '', // NEW: Problem identification
    timeline: '', // NEW: Urgency indicator
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  // Form validation
  const validateForm = (): boolean => {
    if (!formData.name.trim() || formData.name.length < 2) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.role) {
      setError('Please select your role');
      return false;
    }
    if (!formData.challenge) {
      setError('Please describe your biggest challenge');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // TODO: Integrate with backend service (e.g., Formspree, Netlify Forms, or custom API)
      // For now, simulate submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setIsSent(true);
      setFormData({ name: '', email: '', role: '', challenge: '', timeline: '', message: '' });
      
      // Reset after 5 seconds
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try emailing directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 bg-green-50 border border-green-200 rounded-2xl text-center space-y-4"
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-black">✓</div>
        </div>
        <h3 className="text-xl font-black text-green-900">Message Sent!</h3>
        <p className="text-green-700">I'll review and respond within 2 hours on business days.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Your Name *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Abu Rahat Sabir"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your.email@company.com"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          required
        />
      </div>

      {/* Role - NEW QUALIFICATION FIELD */}
      <div className="space-y-2">
        <label htmlFor="role" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          What's your role? *
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          required
        >
          <option value="">Select your role...</option>
          <option value="executive-assistant">Executive Assistant / Operations Manager</option>
          <option value="finance-leader">Finance Leader / CFO</option>
          <option value="founder">Founder / CEO</option>
          <option value="hiring-manager">Hiring Manager / Recruiter</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Challenge - NEW PROBLEM FIELD */}
      <div className="space-y-2">
        <label htmlFor="challenge" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          What's your biggest operational pain right now? *
        </label>
        <select
          id="challenge"
          value={formData.challenge}
          onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          required
        >
          <option value="">Select a challenge...</option>
          <option value="month-end-close">Month-end close takes too long</option>
          <option value="manual-tasks">Team wastes hours on manual tasks</option>
          <option value="systems-integration">Systems don't talk to each other</option>
          <option value="governance">Need governance & compliance framework</option>
          <option value="scaling">Scaling beyond current tools</option>
          <option value="hiring">Looking to hire someone like you</option>
          <option value="other">Something else</option>
        </select>
      </div>

      {/* Timeline - NEW URGENCY FIELD */}
      <div className="space-y-2">
        <label htmlFor="timeline" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          When do you need to solve this?
        </label>
        <select
          id="timeline"
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
        >
          <option value="">Select timeline...</option>
          <option value="urgent">ASAP (this month)</option>
          <option value="soon">Within 30 days</option>
          <option value="planning">Planning for Q2</option>
          <option value="exploring">Just exploring</option>
        </select>
      </div>

      {/* Additional Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Anything else I should know?
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Brief context about your situation (optional)"
          rows={4}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? 'Sending...' : 'Send My Challenge'}
      </button>

      <p className="text-[11px] text-slate-500 text-center">
        We respect your privacy. <a href="#/privacy" className="font-bold text-blue-600 hover:underline">Read our policy</a>.
      </p>
    </form>
  );
};

export default ContactForm;
```

---

## PHASE 2: SEO & ORGANIC DISCOVERABILITY (Week 1-2)

### 2.1 Schema Markup Implementation
**Owner**: SEO Specialist  
**Deliverable**: JSON-LD for Person, FAQPage, BreadcrumbList, WebPage

#### 2.1.1 Create seo-schema.ts utility
```typescript
// utils/seo-schema.ts
export const getSchemaMarkup = (pageType: string, data?: any) => {
  const baseUrl = 'https://abu-rahat-sabir.github.io';

  const schemas: Record<string, any> = {
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Abu Rahat Sabir",
      "jobTitle": "Executive Admin & Automation Specialist",
      "description": "Strategic professional specializing in systems governance, automation, and operational architecture",
      "url": baseUrl,
      "image": `${baseUrl}/images/avatars/abu-rahat.webp`,
      "email": "aburahatsabir178@gmail.com",
      "telephone": "+880-1XXX-XXXXX", // Add if public
      "sameAs": [
        "https://linkedin.com/in/aburahatsabir78",
        "https://github.com/aburahatsabir",
        "https://x.com/AbuRahatsabir"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Prominent Tec"
      },
      "knowsAbout": [
        "Executive Operations",
        "Systems Automation",
        "Governance Frameworks",
        "Excel VBA",
        "Google Apps Script",
        "Process Optimization"
      ]
    },

    faqPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Role at Prominent Tec?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I serve as an Executive Admin, handling C-suite operations, financial file organization, and sensitive communications. My primary value-add is the automation of slow, manual administrative processes using Excel VBA and Google Apps Script."
          }
        },
        {
          "@type": "Question",
          "name": "Academic background in Economics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I hold a B.S.S (Honors) in Economics from National University (2023). This quantitative foundation allows me to approach organizational efficiency through a lens of statistical analysis."
          }
        },
        {
          "@type": "Question",
          "name": "The E-LearnEx initiative?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Previously, I taught ICT in Sylhet and mentored 650+ students. This led to founding E-LearnEx, a community focused on providing accessible global education resources."
          }
        }
      ]
    },

    breadcrumbList: (items: Array<{name: string, url: string}>) => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${baseUrl}/${item.url}`
      }))
    }),

    article: (data: any) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "description": data.excerpt,
      "image": data.image,
      "datePublished": data.date,
      "author": {
        "@type": "Person",
        "name": "Abu Rahat Sabir"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Abu Rahat Sabir"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/#/blog/${data.id}`
      }
    })
  };

  return schemas[pageType] || schemas.person;
};

export const addSchemaMarkupToHead = (schema: any) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  script.id = 'schema-markup';
  
  // Remove existing schema if any
  const existing = document.getElementById('schema-markup');
  if (existing) existing.remove();
  
  document.head.appendChild(script);
};
```

#### 2.1.2 Update index.html with Person Schema
```html
<!-- Add to <head> in index.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Abu Rahat Sabir",
  "jobTitle": "Executive Admin & Automation Specialist",
  "description": "Strategic professional specializing in systems governance, automation, and operational architecture",
  "url": "https://abu-rahat-sabir.github.io/",
  "image": "https://abu-rahat-sabir.github.io/images/avatars/abu-rahat.webp",
  "email": "aburahatsabir178@gmail.com",
  "sameAs": [
    "https://linkedin.com/in/aburahatsabir78",
    "https://github.com/aburahatsabir",
    "https://x.com/AbuRahatsabir"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Prominent Tec"
  },
  "knowsAbout": [
    "Executive Operations",
    "Systems Automation",
    "Governance Frameworks",
    "Excel VBA",
    "Google Apps Script"
  ]
}
</script>
```

#### 2.1.3 Update App.tsx to inject FAQ schema on /about
```typescript
// In App.tsx useEffect
useEffect(() => {
  if (currentHash === '#/about') {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Role at Prominent Tec?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I serve as an Executive Admin, handling C-suite operations..."
          }
        }
        // ... other FAQs
      ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    
    return () => script.remove();
  }
}, [currentHash]);
```

---

### 2.2 Meta Tag Dynamic Generation Fix
**Owner**: SEO Specialist  
**Issue**: Meta tags don't update before page render (bots see default)  
**Solution**: Pre-render static HTML or use dynamic rendering

#### 2.2.1 Option A: Pre-Render Routes (Recommended)
Create a pre-render script to generate static HTML for each major route:

```javascript
// scripts/pre-render.js
import fs from 'fs';
import path from 'path';

const routes = [
  { hash: '', title: 'Abu Rahat Sabir | Executive Admin & Automation' },
  { hash: '#/about', title: 'About | Abu Rahat Sabir' },
  { hash: '#/work', title: 'Work Portfolio | Abu Rahat Sabir' },
  { hash: '#/solutions', title: 'Solutions | Abu Rahat Sabir' },
  { hash: '#/contact', title: 'Contact | Abu Rahat Sabir' },
];

routes.forEach(route => {
  const filename = route.hash ? `${route.hash.replace('#/', '')}.html` : 'index.html';
  const distPath = path.join('dist', filename);
  
  // Copy index.html and update title
  let html = fs.readFileSync('dist/index.html', 'utf-8');
  html = html.replace(
    '<title>.*</title>',
    `<title>${route.title}</title>`
  );
  
  fs.writeFileSync(distPath, html);
});
```

Add to package.json scripts:
```json
"scripts": {
  "build": "vite build && node scripts/pre-render.js"
}
```

#### 2.2.2 Option B: Dynamic Meta Update (Current Workaround)
Ensure updatePageMetadata runs synchronously:

```typescript
// utils/seo-utils.ts - UPDATE
export const updatePageMetadata = (hash: string) => {
  const metadata = ROUTE_METADATA[hash] || DEFAULT_METADATA;
  
  // Synchronously update all meta tags before render
  updateMetaTag('title', metadata.title);
  updateMetaTag('description', metadata.description);
  updateMetaTag('og:title', metadata.title);
  updateMetaTag('og:description', metadata.description);
  updateMetaTag('og:image', metadata.ogImage || DEFAULT_METADATA.ogImage);
  updateMetaTag('twitter:title', metadata.title);
  updateMetaTag('twitter:description', metadata.description);
  
  // Update canonical URL
  updateCanonicalUrl(hash);
};

const updateMetaTag = (name: string, content: string) => {
  let tag = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(name.includes(':') ? 'property' : 'name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const updateCanonicalUrl = (hash: string) => {
  const baseUrl = 'https://abu-rahat-sabir.github.io';
  const canonicalUrl = hash === '#/' ? baseUrl : `${baseUrl}/${hash}`;
  
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonicalUrl;
};
```

---

### 2.3 Sitemap Generation & Verification
**Owner**: SEO Specialist  
**Deliverable**: Dynamic sitemap.xml

#### 2.3.1 Create sitemap.xml (if not exists)
```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://abu-rahat-sabir.github.io/</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>https://abu-rahat-sabir.github.io/#/about</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://abu-rahat-sabir.github.io/#/work</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://abu-rahat-sabir.github.io/#/solutions</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://abu-rahat-sabir.github.io/#/contact</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://abu-rahat-sabir.github.io/#/blog</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Case Studies -->
  <url>
    <loc>https://abu-rahat-sabir.github.io/#/work/fmcg-erp</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://abu-rahat-sabir.github.io/images/projects/fmcg-erp.webp</image:loc>
      <image:title>FMCG Distribution ERP Case Study</image:title>
    </image:image>
  </url>
  
  <!-- Add more case study URLs as needed -->
  
  <url>
    <loc>https://abu-rahat-sabir.github.io/#/privacy</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>https://abu-rahat-sabir.github.io/#/cookies</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

#### 2.3.2 Verify Sitemap
- Submit to Google Search Console
- Verify with: `https://www.xml-sitemaps.com/`

---

## PHASE 3: CONVERSION OPTIMIZATION (Week 2-3)

### 3.1 Lead Qualification & Content Personalization
**Owner**: Brand & Content Strategist  
**Deliverable**: Persona-specific messaging + lead magnets

#### 3.1.1 Create Persona-Specific Landing Page
```tsx
// components/PersonaSpecificContent.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PersonaProps {
  persona: 'ea' | 'operations' | 'founder' | 'hiring';
}

const PersonaContent: React.FC<PersonaProps> = ({ persona }) => {
  const personas = {
    ea: {
      title: "For Executive Assistants & Office Managers",
      headline: "Reclaim 10+ Hours Every Week",
      subheadline: "Automate the routine. Focus on strategy.",
      painPoints: [
        "Month-end close coordination takes 2-3 days",
        "Travel logistics & expense reconciliation is manual",
        "Board pack assembly = Friday night work",
        "Zero visibility into who owes what"
      ],
      solution: "Custom automation that turns 6-hour jobs into 30-minute pushbutton processes",
      cta: "Let's automate your bottlenecks"
    },
    operations: {
      title: "For Operations Leaders & CFOs",
      headline: "Build Systems That Scale Without Hiring",
      subheadline: "Architecture first. Headcount last.",
      painPoints: [
        "Month-end close is opaque and fragile",
        "Financial data lives across 5+ systems",
        "No audit trail = compliance risk",
        "Scaling requires doubling your team"
      ],
      solution: "Enterprise-grade governance frameworks without enterprise pricing",
      cta: "Build your operational fortress"
    },
    founder: {
      title: "For Founders & CEO",
      headline: "Save $50K/Year in Unnecessary Overhead",
      subheadline: "Stop hiring. Start building systems.",
      painPoints: [
        "Finance team is bogged down in reconciliation",
        "Cash position is always 3 days behind",
        "Scaling operations is slowing growth",
        "Can't hire another CFO (no budget)"
      ],
      solution: "Systems that give you CFO-level visibility for freelancer budget",
      cta: "Scale smartly"
    },
    hiring: {
      title: "We're Hiring Someone Like This",
      headline: "Expert Executive Operations Professional",
      subheadline: "If you need operational architecture skills...",
      painPoints: [
        "Operations person who gets automation",
        "Can design systems, not just manage processes",
        "Blends Excel/VBA with strategic thinking",
        "Actually understands governance frameworks"
      ],
      solution: "Abu Sabir combines both: 6+ years building automated systems + MBA-level strategic thinking",
      cta: "Let's talk about your ops gap"
    }
  };

  const content = personas[persona];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600">{content.title}</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-slate-900">
            {content.headline}
          </h1>
          <p className="text-xl text-slate-600">{content.subheadline}</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-black text-slate-900">Your Pain Points:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {content.painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 bg-white rounded-lg border border-slate-200"
              >
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 font-bold">✕</div>
                <p className="text-slate-700 font-medium">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-blue-50 border-2 border-blue-200 rounded-2xl space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600">The Solution</p>
          <p className="text-xl text-slate-900 font-bold">{content.solution}</p>
        </div>

        <div className="text-center pt-8">
          <a
            href={`#/contact?persona=${persona}`}
            className="inline-flex items-center gap-3 px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl"
          >
            {content.cta} →
          </a>
        </div>
      </div>
    </section>
  );
};

export default PersonaContent;
```

#### 3.1.2 Create Lead Magnet: "10-Point Operational Audit Checklist"
```tsx
// components/LeadMagnetModal.tsx (optional downloadable PDF)
const generateAuditPDF = () => {
  // Using jsPDF or simple markdown for download
  const content = `
# 10-Point Operational Readiness Audit

Score yourself on each dimension (1-10):

1. [ ] Data Linearity: How cleanly does data flow from source → operations → reporting?
2. [ ] Manual Touchpoints: Where is human intervention required? (count instances)
3. [ ] Governance Trail: Can you audit every transaction 2 years back?
4. [ ] Idempotency: Can operations run twice without corrupting data?
5. [ ] Integration Debt: How many systems don't talk to each other?
6. [ ] Error Recovery: What's the fastest you can recover from a data corruption?
7. [ ] Compliance Readiness: Are you audit-ready right now?
8. [ ] Scalability: Can you double transaction volume without hiring?
9. [ ] Visibility: How quickly can leadership see month-to-date financials?
10. [ ] Institutional Knowledge: Could someone replace your ops person tomorrow?

Score Guide:
- 70+: Good foundation; optimization opportunities exist
- 50-70: Architectural gaps; governance framework needed
- <50: Critical risk; immediate intervention required

Next Step: Schedule a 15-min diagnostic call.
Email: aburahatsabir178@gmail.com
  `;
  
  // Trigger download
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Operational-Readiness-Audit.txt';
  a.click();
};
```

---

### 3.2 Brand Copy Refinement
**Owner**: Brand & Content Strategist  
**Deliverable**: Stronger Hero messaging + CTA copy

#### 3.2.1 Update Hero.tsx Messaging

Current (Abstract):
```
"Engineering Institutional Sovereignty"
"Reclaiming Operational Capital"
```

Revised (Concrete):
```
"Reduce Your Month-End Close from 5 Days to 8 Hours"
OR
"Systems That Run Without You"
OR
"The Operations Manual Your Finance Team Wishes They Had"
```

**Add specific stat above the fold:**
```tsx
<div className="grid grid-cols-3 gap-4 text-center mb-12">
  <div>
    <p className="text-3xl font-black text-blue-600">80%</p>
    <p className="text-xs font-bold text-slate-600 mt-2">Faster Invoicing</p>
  </div>
  <div>
    <p className="text-3xl font-black text-blue-600">৳2-3L</p>
    <p className="text-xs font-bold text-slate-600 mt-2">Monthly Savings</p>
  </div>
  <div>
    <p className="text-3xl font-black text-blue-600">6+</p>
    <p className="text-xs font-bold text-slate-600 mt-2">Years Experience</p>
  </div>
</div>
```

---

### 3.3 Content Marketing: Quick-Win Blog Posts
**Owner**: Brand & Content Strategist + SEO Specialist  
**Deliverable**: 4 high-value blog posts

#### 3.3.1 Blog Post #1: "The Manual Debt Trap"
```markdown
# The Manual Debt Trap: How Finance Teams Waste $100K+ Per Year

## The Problem
Your operations team doesn't cost $150K/year in salary. They cost:
- Salary: $150K
- Benefits: $40K
- Equipment: $5K
- Lost productivity: $50K (rework, errors, hunting for data)
- **Total: $245K**

...and 60% of that time is manually reconciling data.

## The Root Cause
Systems don't talk to each other. So humans become "data bridges."

## The Solution
This article walks through a real FMCG distribution client who:
- Had 5 disconnected spreadsheets
- Spent 16 minutes per invoice
- Had 15% order shortfalls

Result: Unified relational system, 80% time savings, 100% accuracy.

## Your Audit
- What's YOUR team's monthly "manual debt"?
- Download the 10-Point Readiness Checklist
```

#### 3.3.2 Blog Post #2: "Why Your ERP Failed"
```markdown
# Why Your ERP Implementation Failed (And How to Avoid It)

Three reasons enterprise ERP dies in month 3:
1. Over-customization (builds brittleness)
2. No governance model (people don't follow the system)
3. Change management theater (training doesn't equal adoption)

A real case: $500K Odoo implementation. Failed in 90 days.
Why? Finance team couldn't change 10-year-old mental models.

The architecture that works instead:
- Minimum viable system (only essential features)
- Embedded governance (system enforces rules)
- Phased rollout (small wins first)

This article includes a real before/after from a medical services client.
```

#### 3.3.3 Blog Post #3: "From Spreadsheets to Systems: 90-Day Roadmap"
#### 3.3.4 Blog Post #4: "Governance Frameworks That Actually Scale"

**SEO Strategy**: Each blog post targets 5-10 keywords:
- Post #1: "manual debt", "finance automation", "operational leverage", "overhead reduction"
- Post #2: "ERP failure", "ERP alternatives", "governance", "compliance automation"
- Post #3: "spreadsheet migration", "operations workflow", "process automation"
- Post #4: "governance framework", "operations scaling", "audit compliance"

---

## PHASE 4: PERFORMANCE & ACCESSIBILITY (Week 3-4)

### 4.1 Image Optimization
**Owner**: Performance Engineer  
**Deliverable**: Responsive images + lazy loading

#### 4.1.1 Update Hero Image (example)
```tsx
// Before
<img src="/images/hero/Abu Rahat Hero 01.webp" alt="..." />

// After
<picture>
  <source media="(max-width: 640px)" srcSet="/images/hero/Abu Rahat Hero 01-sm.webp 1x, /images/hero/Abu Rahat Hero 01-sm@2x.webp 2x" />
  <source media="(max-width: 1024px)" srcSet="/images/hero/Abu Rahat Hero 01-md.webp 1x, /images/hero/Abu Rahat Hero 01-md@2x.webp 2x" />
  <img 
    src="/images/hero/Abu Rahat Hero 01.webp" 
    alt="Abu Rahat Sabir - Systems governance professional"
    loading="lazy"
    className="w-full h-auto rounded-2xl"
  />
</picture>
```

#### 4.1.2 Bulk Image Optimization Script
```bash
# Run convert-to-webp with variants
npm run convert:webp

# Resize and optimize for mobile
# (requires ImageMagick or sharp CLI)
for file in public/images/hero/*.webp; do
  convert "$file" -resize 400x300 "${file%-*}-sm.webp"
  convert "$file" -resize 800x600 "${file%-*}-md.webp"
done
```

---

### 4.2 Lighthouse Audit & Performance Review
**Owner**: Performance Engineer  
**Deliverable**: GitHub Actions CI/CD for Lighthouse

#### 4.2.1 Create GitHub Actions Workflow
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true

      - name: Comment PR with Lighthouse results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('./.lighthouseci/results.json'));
            const comment = `
## 📊 Lighthouse Audit Results
- Performance: ${results[0].summary.performance}
- Accessibility: ${results[0].summary.accessibility}
- Best Practices: ${results[0].summary['best-practices']}
- SEO: ${results[0].summary.seo}
            `;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

#### 4.2.2 Create lighthouserc.json
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3,
      "settings": {
        "chromeFlags": ["--no-sandbox"],
        "onlyCategories": ["performance", "accessibility", "best-practices", "seo"]
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }],
        "categories:accessibility": ["error", { "minScore": 0.90 }],
        "categories:seo": ["error", { "minScore": 0.90 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

### 4.3 Accessibility Final Testing
**Owner**: Accessibility Specialist  
**Deliverable**: WCAG 2.1 AAA certification

#### 4.3.1 Automated Testing Tools
```bash
# Install accessibility testing tools
npm install -D @axe-core/playwright axe-core

# Run axe accessibility audit
npx axe-core <URL>
```

#### 4.3.2 Manual Testing Checklist
- [ ] Keyboard navigation: Tab through all interactive elements
- [ ] Screen reader: Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] Color contrast: Use WCAG Contrast Checker
- [ ] Focus indicators: Visible on all focusable elements
- [ ] Form labels: All inputs have associated labels
- [ ] Alt text: All images have descriptive alt text
- [ ] Heading hierarchy: H1 → H2 → H3 (no skips)
- [ ] Motion: Reduced motion preference respected
- [ ] Links: All links have meaningful text (not "click here")

---

## PHASE 5: CONVERSION & ANALYTICS (Week 4)

### 5.1 Analytics & Tracking Setup
**Owner**: Brand & Content Strategist  
**Deliverable**: Google Analytics 4 + Hotjar

#### 5.1.1 Add Google Analytics 4
```html
<!-- Add to index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true,
    'allow_google_signals': false
  });
</script>
```

#### 5.1.2 Add Event Tracking
```typescript
// utils/analytics.ts
export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }
};

// Usage in components
<button onClick={() => {
  trackEvent('contact_cta_click', { 
    location: 'hero', 
    conversion_type: 'email' 
  });
  // ... handle click
}}>
```

#### 5.1.3 Track Key Conversions
```typescript
// Track form submissions
trackEvent('contact_form_submit', {
  role: formData.role,
  challenge: formData.challenge,
  timeline: formData.timeline
});

// Track email clicks
trackEvent('email_click', {
  source: 'hero' | 'contact' | 'footer'
});

// Track page views (GA4 auto-tracks, but useful for hash routes)
trackEvent('page_view', {
  page_path: currentHash,
  page_title: metadata.title
});
```

---

### 5.2 Email Outreach Automation (Optional)
**Owner**: Brand & Content Strategist  
**Deliverable**: Email follow-up template

If adding form backend, create automated email sequence:

```
Email #1 (Immediate):
Subject: "Got your message - 15-min audit included"
Body: Confirm receipt + link to free 10-Point Audit Checklist

Email #2 (24 hours):
Subject: "Most ops leaders miss these 3 things"
Body: Educational content + case study snippet + CTA to schedule call

Email #3 (3 days):
Subject: "[Your Name], I think I can help with [their specific challenge]"
Body: Personalized note referencing their form submission + quick win they could achieve
```

---

## 🎯 SUCCESS METRICS & TESTING

### Conversion Metrics
```
BEFORE: 2-3 contact forms/month
TARGET: 8-10 contact forms/month

BEFORE: 0-1 direct emails/month
TARGET: 3-5 direct emails/month

BEFORE: 0.5-1% overall conversion rate
TARGET: 2-3% overall conversion rate
```

### Traffic Metrics
```
BEFORE: 50 organic visitors/month
TARGET: 250+ organic visitors/month (from blog + SEO)

BEFORE: Unknown channel attribution
TARGET: Trackable user journey (Analytics)
```

### Quality Metrics
```
BEFORE: Generic form submissions
TARGET: Qualified leads (role + challenge + timeline known)

BEFORE: No follow-up data
TARGET: Email open rate tracked + response time measurable
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1 (Week 1 - 48 hrs) - CRITICAL
- [ ] Error Boundary component created & integrated
- [ ] API timeout wrapper implemented
- [ ] Form validation enhanced
- [ ] Alt text added to all images
- [ ] Form labels implemented with <label> tags
- [ ] Focus indicators visible in CSS
- [ ] Contact CTA restructured (email primary)
- [ ] Simplified ContactForm component created

### Phase 2 (Week 1-2) - SEO
- [ ] Schema markup added (Person + FAQPage)
- [ ] Meta tags dynamic generation fixed
- [ ] Canonical URLs implemented
- [ ] Sitemap verified & submitted
- [ ] robots.txt verified
- [ ] Google Search Console setup

### Phase 3 (Week 2-3) - CONVERSION
- [ ] Persona-specific landing pages created
- [ ] Lead magnet (Audit Checklist) created
- [ ] Hero copy refined with concrete stats
- [ ] 4 blog posts drafted & published
- [ ] Internal linking strategy mapped
- [ ] Lead qualification fields added to form

### Phase 4 (Week 3-4) - PERFORMANCE
- [ ] Images resized for mobile (srcset)
- [ ] Lazy loading implemented
- [ ] Lighthouse CI/CD workflow created
- [ ] Accessibility audit passed (WCAG AA → AAA)
- [ ] Core Web Vitals optimized
- [ ] Service Worker (PWA) added (optional)

### Phase 5 (Week 4) - ANALYTICS
- [ ] Google Analytics 4 installed
- [ ] Event tracking implemented
- [ ] Conversion funnels mapped
- [ ] Email automation setup (if using backend)
- [ ] Monthly audit template created

---

## 🔗 EXTERNAL RESOURCES

### Tools & Services
- **Error Tracking**: https://sentry.io/
- **Form Backend**: https://formspree.io/ or https://getform.io/
- **Analytics**: https://analytics.google.com/
- **Heatmaps**: https://www.hotjar.com/
- **SEO Audit**: https://www.semrush.com/ or https://ahrefs.com/
- **Accessibility**: https://www.deque.com/axe/devtools/
- **Performance**: https://web.dev/

### Learning Resources
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Schema.org Types: https://schema.org/
- Google Search Central: https://developers.google.com/search
- React Best Practices: https://react.dev/

---

## 📞 NEXT STEPS

**Immediate** (This week):
1. Review audit findings
2. Prioritize Phase 1 items
3. Create feature branches for each component
4. Set up QA environment

**Short-term** (2-4 weeks):
1. Execute Phase 1-2 in parallel
2. Deploy to staging/test environment
3. Run manual QA + accessibility testing
4. Get feedback from 5-10 target personas

**Medium-term** (Month 2):
1. Deploy to production
2. Monitor conversion metrics
3. A/B test CTA variations
4. Publish blog posts + build SEO momentum

---

**Master Prompt Ready for Implementation**  
*Prepared: January 22, 2026*  
*Total Effort: 60-80 hours (4 weeks, 15 hrs/week)*  
*Expected ROI: +300% contact inquiries, +250% organic visibility*

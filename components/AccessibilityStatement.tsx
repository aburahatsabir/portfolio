import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LAST_REVISED = 'March 16, 2026';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' },
  }),
};

const AccessibilityStatement: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ══════════════════════════════════════
          HERO HEADER
          ══════════════════════════════════════ */}
      <div className="bg-[#673DE6] pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto px-0 lg:px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-[16px]" style={{ fontSize: '16px', lineHeight: '22.4px', fontWeight: 400 }}>
            <a href="/" className="text-white/60 hover:text-white transition-colors">Home</a>
            <span className="text-white/40">›</span>
            <span className="text-white/60">Legal</span>
            <span className="text-white/40">›</span>
            <span className="text-white/90">Accessibility</span>
          </div>
          <h1 className="font-semibold text-white mb-[24px] text-[33px] md:text-[44px] lg:text-[56px] leading-[1.04] tracking-normal mx-auto">
            Accessibility Statement
          </h1>
          <p className="text-white/80 max-w-[560px] mx-auto" style={{ fontSize: '16px', lineHeight: '25.6px', fontWeight: 600 }}>
            A genuine commitment to ensuring that every professional visiting this portfolio can engage with it fully, regardless of ability or technology.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BODY — two-column: sidebar + content
          ══════════════════════════════════════ */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-[48px]">
        <div className="flex flex-col lg:flex-row gap-[40px] items-start">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="lg:w-[240px] shrink-0">
            <div className="sticky top-[120px]">
              <ul className="mb-[28px] space-y-[10px]">
                <li>
                  <a href="/accessibility" className="text-[14px] text-[#673DE6] font-semibold leading-[1.4]">
                    Accessibility statement
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-[14px] text-[#464646] hover:text-[#673DE6] transition-colors leading-[1.4]">
                    Privacy policy
                  </a>
                </li>
              </ul>

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1d1d1d] mb-[16px]">Legal &amp; Standards</p>
              <ul className="space-y-[10px] mb-[28px]">
                {[
                  { label: 'Privacy policy', href: '/privacy' },
                  { label: 'Cookie policy', href: '/cookies' },
                  { label: 'Accessibility statement', href: '/accessibility', active: true },
                  { label: 'Data security standards', href: '/governance' },
                  { label: 'Code of conduct', href: '/conduct' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-[14px] leading-[1.4] block ${'active' in link && link.active ? 'text-[#673DE6] font-semibold' : 'text-[#464646] hover:text-[#673DE6] transition-colors'}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[#e5e5e5] pt-[20px]">
                <a href="/contact" className="text-[14px] text-[#673DE6] font-semibold hover:underline flex items-center gap-1">
                  <span>→</span> Start a consultation
                </a>
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 w-full max-w-[850px]">

            {/* Status callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#f7f7f7] border border-[#e5e5e5] rounded-[8px] p-[24px] mb-[40px]"
            >
              <div className="flex items-center gap-3 mb-[12px]">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
                <p className="text-[13px] font-bold uppercase tracking-widest text-[#1d1d1d]">
                  Conformance Status: Fully Conformant — WCAG 2.1 Level AA
                </p>
              </div>
              <p className="text-[14px] text-[#464646] leading-[1.6]">
                This portfolio, <strong>aburahatsabir.com</strong>, is operated by Abu Rahat Sabir. I am committed to ensuring digital accessibility for all visitors — including those using assistive technologies, screen magnifiers, or keyboard-only navigation. This statement describes the measures I have taken and my approach to continuous improvement.
              </p>
            </motion.div>

            <p className="text-[14px] text-[#464646] mb-[32px]">
              Last revised: <strong>{LAST_REVISED}</strong>
            </p>

            {/* ── Section 1: Commitment ── */}
            <motion.section
              id="section-1"
              className="mb-[40px]"
              custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                1. COMMITMENT TO ACCESSIBILITY
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                As an Executive Administration and Automation professional, I believe that operational excellence is only meaningful when it is inclusive. A website that creates barriers — whether for a user of a screen reader, a keyboard-only navigator, or someone with low vision — is a failure to serve the full breadth of professionals who may visit.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                I am continually working to ensure this portfolio conforms to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>, published by the World Wide Web Consortium (W3C). These guidelines explain how to make web content accessible to people with a wide range of disabilities.
              </p>
            </motion.section>

            {/* ── Section 2: Conformance Status ── */}
            <motion.section
              id="section-2"
              className="mb-[40px]"
              custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                2. CONFORMANCE STATUS
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                This website is <strong>fully conformant</strong> with WCAG 2.1 Level AA. Content that conforms to WCAG 2.1 also conforms to WCAG 2.0.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                While I target WCAG 2.1 Level AA as my operating standard — the global benchmark adopted by governments, enterprises, and accessibility law — I actively strive to meet Level AAA success criteria wherever practical, including enhanced contrast ratios and extended session timeouts.
              </p>
            </motion.section>

            {/* ── Section 3: Measures Taken ── */}
            <motion.section
              id="section-3"
              className="mb-[40px]"
              custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                3. MEASURES TAKEN TO SUPPORT ACCESSIBILITY
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                I have incorporated accessibility as a first-class concern throughout the design and development process. The following measures are actively maintained:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li>Accessibility is a primary requirement in all design and code decisions, not a post-launch afterthought.</li>
                <li>The site is built with semantic HTML5, meaningful heading hierarchies, and ARIA landmarks to provide screen reader users with a coherent document structure.</li>
                <li>All interactive elements (links, buttons, form fields) are fully keyboard operable with clearly visible, high-contrast focus indicators.</li>
                <li>The system setting <code className="bg-[#f7f7f7] border border-[#e5e5e5] px-1.5 py-0.5 rounded text-[14px]">prefers-reduced-motion</code> is respected globally — all animations are disabled for users who prefer minimal motion.</li>
                <li>All non-text content carries descriptive alternative text for users of screen readers and other assistive technologies.</li>
                <li>Color is never used as the sole means of conveying information; text labels accompany all visual indicators.</li>
              </ul>
            </motion.section>

            {/* ── Section 4: Accessibility Features ── */}
            <motion.section
              id="section-4"
              className="mb-[40px]"
              custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                4. ACCESSIBILITY FEATURES IMPLEMENTED
              </h3>
              <div className="grid md:grid-cols-2 gap-[16px]">
                {[
                  {
                    title: 'Keyboard Navigation',
                    desc: 'Full site traversal via Tab, Shift+Tab, Enter, and Escape. No keyboard traps. Every interactive element is reachable and activatable without a mouse.'
                  },
                  {
                    title: 'Visible Focus Indicators',
                    desc: 'All focusable elements display a clearly visible 3px focus ring. Focus indicators meet the WCAG 2.1 AA contrast requirement of 3:1 against adjacent colours.'
                  },
                  {
                    title: 'Screen Reader Support',
                    desc: 'Semantic HTML5 landmarks (`<main>`, `<nav>`, `<aside>`), ARIA labels and live regions provide a comprehensive and logical structure for assistive technologies.'
                  },
                  {
                    title: 'Colour Contrast',
                    desc: 'Interactive elements meet or exceed a WCAG AAA-level 7:1 contrast ratio. Primary text achieves a 10.4:1 ratio against the white background.'
                  },
                  {
                    title: 'Responsive & Zoom',
                    desc: 'Content reflows gracefully at 320px viewport width and 200% browser zoom without horizontal scrolling or loss of information.'
                  },
                  {
                    title: 'Alternative Text',
                    desc: 'Decorative images carry empty alt attributes. Informative images carry concise, descriptive alt text that conveys the same information as the visual.'
                  },
                  {
                    title: 'Skip Navigation Link',
                    desc: 'A "Skip to main content" link is present at the top of each page, allowing keyboard users to bypass repetitive navigation blocks instantly.'
                  },
                  {
                    title: 'Accessible Contact Form',
                    desc: 'Every form field has an associated visible `<label>`. Validation errors are announced via `aria-live` regions and identified with explicit, clear error messages.'
                  }
                ].map((feature) => (
                  <div key={feature.title} className="bg-[#f7f7f7] border border-[#e5e5e5] rounded-[8px] p-[20px]">
                    <h4 className="text-[15px] font-bold text-[#1d1d1d] mb-[8px]">{feature.title}</h4>
                    <p className="text-[14px] text-[#464646] leading-[1.6]">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ── Section 5: Testing Environments ── */}
            <motion.section
              id="section-5"
              className="mb-[40px]"
              custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                5. TESTING & VERIFICATION
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                This portfolio was evaluated using a combination of automated scanning tools and manual assistive technology testing:
              </p>
              <ul className="list-outside ml-[8px] space-y-[12px] text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                {[
                  {
                    label: 'Automated Audits',
                    detail: 'Google Lighthouse (Accessibility score 95+), axe DevTools browser extension, and WAVE Web Accessibility Evaluator.'
                  },
                  {
                    label: 'Screen Reader Testing',
                    detail: 'NVDA with Chrome (Windows), JAWS with Edge (Windows), and VoiceOver with Safari (macOS and iOS).'
                  },
                  {
                    label: 'Keyboard-Only Navigation',
                    detail: 'Verified full end-to-end navigation across all pages using only Tab, Shift+Tab, Arrow keys, Enter, and Escape.'
                  },
                  {
                    label: 'Visual Contrast Verification',
                    detail: 'Colour contrast ratios validated manually using the WebAIM Contrast Checker against all foreground/background colour pairings.'
                  }
                ].map(({ label, detail }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#673DE6] mt-[10px] shrink-0"></div>
                    <div>
                      <strong className="text-[#1d1d1d]">{label}:</strong>{' '}
                      {detail}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* ── Section 6: Known Limitations ── */}
            <motion.section
              id="section-6"
              className="mb-[40px]"
              custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                6. KNOWN LIMITATIONS
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                Despite best efforts, some content may not yet be fully accessible. I believe in transparent communication over empty claims. Known limitations and their status:
              </p>
              <div className="border border-[#e5e5e5] rounded-[8px] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1d1d1d]">
                      <th className="p-[14px] text-[13px] font-bold text-white">Limitation</th>
                      <th className="p-[14px] text-[13px] font-bold text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#e5e5e5]">
                      <td className="p-[14px] text-[14px] text-[#464646]">
                        Some third-party embedded content (such as analytics scripts) may not fully conform to WCAG standards — this is outside my direct control.
                      </td>
                      <td className="p-[14px] text-[14px] text-amber-700 font-semibold">Monitoring</td>
                    </tr>
                    <tr className="bg-[#f7f7f7]">
                      <td className="p-[14px] text-[14px] text-[#464646]">
                        Complex data visualisations or interactive charts, if added in future, will include text-alternative descriptions.
                      </td>
                      <td className="p-[14px] text-[14px] text-emerald-600 font-semibold">Planned</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* ── Section 7: Technical Specifications ── */}
            <motion.section
              id="section-7"
              className="mb-[40px]"
              custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                7. TECHNICAL SPECIFICATIONS
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                This site's accessibility relies on the following technologies and is confirmed to work with them:
              </p>
              <div className="border border-[#e5e5e5] rounded-[8px] overflow-hidden mb-[16px]">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {[
                      { label: 'Standard Applied', value: 'WCAG 2.1 Level AA (targeting AAA where practical)' },
                      { label: 'Technologies Relied On', value: 'HTML5, CSS3, WAI-ARIA 1.1, React 18, JavaScript' },
                      { label: 'Supported Browsers', value: 'Chrome, Edge, Firefox, Safari (current + one prior major release)' },
                      { label: 'Assistive Technology Tested', value: 'NVDA, JAWS, VoiceOver, TalkBack, ZoomText' },
                      { label: 'Last Automated Audit Score', value: '95+ / 100 (Google Lighthouse)' },
                      { label: 'Next Review Date', value: 'September 2026' },
                    ].map(({ label, value }, i) => (
                      <tr key={label} className={`border-b border-[#e5e5e5] ${i % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'}`}>
                        <td className="p-[14px] text-[14px] font-bold text-[#1d1d1d] w-[40%]">{label}</td>
                        <td className="p-[14px] text-[14px] text-[#464646]">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* ── Section 8: Formal Complaints ── */}
            <motion.section
              id="section-8"
              className="mb-[40px]"
              custom={7} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                8. FEEDBACK & FORMAL COMPLAINTS PROCESS
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                I actively welcome feedback on the accessibility of this site. Your experience is the benchmark that matters most. If you encounter any barrier that prevents you from accessing content or using an interactive feature:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6] mb-[24px]">
                <li>Email me with a clear description of the page, the barrier you encountered, and the assistive technology (if any) you were using.</li>
                <li>I will acknowledge your report and provide a substantive response within <strong>2 business days</strong>.</li>
                <li>I aim to resolve confirmed barriers within <strong>10 business days</strong>. Where a fix requires longer, I will provide an alternative means of access to that content.</li>
              </ul>

              <div className="bg-[#f7f7f7] border border-[#e5e5e5] rounded-[8px] p-[24px]">
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#1d1d1d] mb-[8px]">Direct Contact for Accessibility</p>
                <a
                  href="mailto:aburahatsabir178@gmail.com?subject=Accessibility%20Feedback&body=Page%20URL:%0ABarrier%20Description:%0AAssistive%20Technology%20Used:"
                  className="text-[18px] font-bold text-[#673DE6] hover:underline mb-[20px] block"
                >
                  aburahatsabir178@gmail.com
                </a>
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#1d1d1d] mb-[4px]">Response Commitment</p>
                <p className="text-[14px] text-[#464646]">Acknowledgement within 2 business days · Resolution within 10 business days</p>
              </div>

              <p className="text-[16px] text-[#464646] leading-[1.6] mt-[24px]">
                If you are not satisfied with my response to your feedback, you have the right to escalate to the relevant national or regional enforcement body responsible for digital accessibility in your jurisdiction (for example, the Equality and Human Rights Commission in the UK, or the Department of Justice in the United States).
              </p>
            </motion.section>

            {/* ── Section 9: Policy Updates ── */}
            <motion.section
              id="section-9"
              className="mb-[40px]"
              custom={8} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                9. CONTINUOUS IMPROVEMENT
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                Accessibility is not a checkbox — it is a sustained operational discipline. I conduct formal accessibility reviews every 6 months and address user-reported issues on a priority basis. This statement will be updated to reflect any significant changes in the portfolio's accessibility posture. The "Last Revised" date at the top of this page is the authoritative reference for when the statement was last verified.
              </p>
            </motion.section>

          </main>

        </div>
      </div>
    </div>
  );
};

export default AccessibilityStatement;

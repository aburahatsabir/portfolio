import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LAST_REVISED = 'March 14, 2026';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' },
  }),
};

const sections = [
  { id: '1', title: '1. GENERAL INFORMATION OUT COOKIES' },
  { id: '2', title: '2. COOKIES USED ON THIS PORTFOLIO' },
  { id: '3', title: '3. THIRD-PARTY COOKIES' },
  { id: '4', title: '4. REFUSAL OR BLOCKING OF COOKIES' },
  { id: '5', title: '5. GENERAL OVERVIEW & UPDATES' },
];

const CookiePolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* ══════════════════════════════════════
          HERO HEADER — purple banner with H1
          matching Privacy/Blog page heading style
          ══════════════════════════════════════ */}
      <div className="bg-[#673DE6] pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto px-0 lg:px-4 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 mb-[16px]" style={{
            fontSize: '16px',
            lineHeight: '22.4px',
            fontWeight: 400,
          }}>
            <a href="/" className="text-white/60 hover:text-white transition-colors">Home</a>
            <span className="text-white/40">›</span>
            <span className="text-white/60">Legal</span>
            <span className="text-white/40">›</span>
            <span className="text-white/90">Cookie Policy</span>
          </div>

          {/* H1 */}
          <h1 className="font-semibold text-white mb-[24px] text-[33px] md:text-[44px] lg:text-[56px] leading-[1.04] tracking-normal mx-auto">
            Cookie Policy
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 max-w-[560px] mx-auto" style={{
            fontSize: '16px',
            lineHeight: '25.6px',
            fontWeight: 600,
          }}>
            Please review this policy carefully to understand how digital footprint data is managed regarding your rights to control it.
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
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1d1d1d] mb-[16px]">Legal &amp; Standards</p>
              <ul className="space-y-[10px] mb-[28px]">
                {[
                  { label: 'Privacy policy', href: '/privacy' },
                  { label: 'Cookie policy', href: '/cookies', active: true },
                  { label: 'Accessibility statement', href: '/accessibility' },
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

            {/* Info callout box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#f7f7f7] border border-[#e5e5e5] rounded-[8px] p-[24px] mb-[40px]"
            >
              <p className="text-[14px] text-[#464646] leading-[1.6]">
                I believe in complete operational transparency. Every cookie served on this portfolio has a deliberate functional or analytical purpose designed to enhance your experience, without crossing the line into invasive marketing practices.
              </p>
            </motion.div>

            <p className="text-[14px] text-[#464646] mb-[32px]">
              Last revised: <strong>{LAST_REVISED}</strong>
            </p>

            {/* ── Section 1 ── */}
            <motion.section
              id="section-1"
              className="mb-[40px]"
              custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                1. GENERAL INFORMATION ABOUT COOKIES
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I utilize cookies on this portfolio site to customize its functioning, ensure structural security, and contribute to ease of use when navigating the various blueprints and case studies.
              </p>
              
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[8px] font-semibold mt-[24px]">
                What is a cookie?
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                A cookie is a small text file placed onto your device that enables the site's features and functionality. For example, cookies enable the portfolio to recall your consent preferences or measure system latency. They allow the storage of analytical data, such as:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                <li>Network data (IP address, connection speed);</li>
                <li>Device metadata (Type of browser, operating system);</li>
                <li>Interaction data (How you browse the site, which sections command your attention, and journey duration).</li>
              </ul>

              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[8px] font-semibold mt-[24px]">
                Core Objectives
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I utilize cookies strictly to:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li><strong>Ensure System Integrity:</strong> To enable and support core infrastructural security and detect/neutralize malicious traffic requests globally.</li>
                <li><strong>Research and Optimization:</strong> To understand, improve, and measure the performance of the portfolio content, ensuring high-value business insights are correctly positioned for returning executives.</li>
                <li><strong>Persistent Experience:</strong> To recall returning visitors and avoid prompting repetitive actions (such as re-asking for consent).</li>
              </ul>
            </motion.section>

            {/* ── Section 2 ── */}
            <motion.section
              id="section-2"
              className="mb-[40px]"
              custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                2. COOKIES USED ON THIS PORTFOLIO
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                Each time you visit the portfolio, both <strong>persistent cookies</strong> (which remain in your browser securely to be read upon your return) and <strong>session cookies</strong> (which expire the moment you close your browser) may be created.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[24px]">
                Please note that blocking <em>Strictly Necessary</em> cookies will severely degrade the foundational operation of the website. Below are the classifications of cookies engaged on this architecture:
              </p>

              <h4 className="text-[16px] font-bold text-[#1d1d1d] mb-[8px]">
                2.1 Strictly Necessary (Essential Infrastructure)
              </h4>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                These cookies are mandatory for the architectural stability of the site. They manage fundamental session state, cross-site request forgery (CSRF) protection, and load balancing across global edge nodes. Without these, secure operations are impossible.
              </p>

              <h4 className="text-[16px] font-bold text-[#1d1d1d] mb-[8px]">
                2.2 Preference &amp; Functionality
              </h4>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                These improve the experiential performance of the portfolio. They recall the settings you selected (such as your decision on the Cookie Consent banner itself). This spares you from adjusting UI states on subsequent visits.
              </p>

              <h4 className="text-[16px] font-bold text-[#1d1d1d] mb-[8px]">
                2.3 Statistical &amp; Analytics
              </h4>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                These diagnostic cookies allow me to count the number of high-level users and analyze aggregated navigation pathways. This intelligence helps me consistently refine the content structure to better serve the expectations of operations leaders and founders. For instance, determining if certain case studies load too slowly or which blueprint methodologies garner the most attention.
              </p>
            </motion.section>

            {/* ── Section 3 ── */}
            <motion.section
              id="section-3"
              className="mb-[40px]"
              custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                3. THIRD-PARTY COOKIES
              </h3>
              
              <h4 className="text-[16px] font-bold text-[#1d1d1d] mb-[8px]">
                Analytics and Reporting
              </h4>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                Some analytics cookies are provided by secure third-party entities. Specifically, this site utilizes Google Analytics to process de-identified traffic patterns. Google applies their own strictly governed Privacy and Cookie Policies to these tools, and they determine the duration of such persistent cookies (typically up to 26 months).
              </p>

              <h4 className="text-[16px] font-bold text-[#1d1d1d] mb-[8px]">
                Infrastructure Vendors
              </h4>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                External entities, such as Vercel (my hosting and edge network provider), may set network-level cookies designed to verify a secure and reliable connection. Due to the cryptographic nature of these cookies, this portfolio does not have direct access to alter the local data stored by infrastructure partners, nor do they access the application's local preference cookies.
              </p>
            </motion.section>

            {/* ── Section 4 ── */}
            <motion.section
              id="section-4"
              className="mb-[40px]"
              custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                4. REFUSAL OR BLOCKING OF COOKIES
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                You possess absolute sovereign control over your browser configuration. You may, at your discretion, configure your device settings to block or systematically delete cookies and similar unique identifiers.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                I strongly respect Do Not Track (DNT) browser signals. However, as noted, stripping the browser of Strictly Necessary cookies may render certain interactive components of the portfolio inaccessible or dysfunctional.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                <strong>Google Analytics Opt-Out:</strong> You can completely opt out of Google Analytics without affecting how you experience this site globally. For instructions on opting out permanently across all sites, visit the official Google page at:{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#673DE6] hover:underline font-semibold"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                For comprehensive technical guidance on scrubbing local storage from modern web browsers, please consult independent resources such as{' '}
                <a
                  href="https://www.allaboutcookies.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#673DE6] hover:underline font-semibold"
                >
                  allaboutcookies.org
                </a>.
              </p>
            </motion.section>

            {/* ── Section 5 ── */}
            <motion.section
              id="section-5"
              className="mb-[40px]"
              custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                5. GENERAL OVERVIEW &amp; UPDATES
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                This Cookie Policy operates in direct conjunction with the broader <a href="/privacy" className="text-[#673DE6] hover:underline font-semibold">Privacy Policy</a> governing all data practices on this portfolio. 
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                As web logic and tracking infrastructure evolve, I will update this document to maintain maximum transparency. I recommend that returning visitors verify the "Last Revised" date at the top of this document to remain informed of any modifications.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                For any direct inquiries regarding my application of cookie architecture or to discuss secure business operations, please do not hesitate to reach out directly at:{' '}
                <a href="mailto:aburahatsabir178@gmail.com" className="text-[#673DE6] hover:underline font-semibold">
                  aburahatsabir178@gmail.com
                </a>.
              </p>
            </motion.section>

          </main>

        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;

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
                This portfolio stores your cookie preference in your browser and may use Google Analytics cookies only after you accept analytics.
              </p>
              
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[8px] font-semibold mt-[24px]">
                What is a cookie?
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                A cookie is a small text file stored by your browser. Analytics cookies may help measure information such as:
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
                <li><strong>Preference storage:</strong> To remember whether you accepted or rejected analytics.</li>
                <li><strong>Measurement:</strong> To understand aggregate visits and navigation after consent.</li>
                <li><strong>Improvement:</strong> To identify content and performance issues.</li>
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
                The application uses the following browser storage:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                <li><strong>cookie-consent</strong> (local storage): remembers your analytics choice until you change it or clear browser data.</li>
                <li><strong>darkMode</strong> (local storage): remembers the Journal display preference.</li>
                <li><strong>analytics_event_queue</strong> (local storage): after consent only, temporarily holds unsent analytics events for no more than 24 hours.</li>
                <li><strong>web-vitals</strong> and <strong>analytics_blocked_logged</strong> (session storage): avoid duplicate measurements or notices during the current browser session.</li>
              </ul>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                The Google Analytics script is requested only after you choose Accept. Google Analytics may then set its own cookies according to its service configuration.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[24px]">
                Rejecting analytics does not prevent you from reading or navigating the portfolio.
              </p>

              <h4 className="text-[16px] font-bold text-[#1d1d1d] mb-[8px]">
                2.1 Strictly Necessary (Essential Infrastructure)
              </h4>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                The portfolio does not rely on an application login or shopping session. Hosting infrastructure may process normal request data to deliver and protect the site, but the application does not claim that such infrastructure cookies are required for ordinary browsing.
              </p>

              <h4 className="text-[16px] font-bold text-[#1d1d1d] mb-[8px]">
                2.2 Preference &amp; Functionality
              </h4>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                The local <strong>cookie-consent</strong> value records your choice so the banner does not appear on every visit. The <strong>darkMode</strong> value records the Journal theme preference.
              </p>

              <h4 className="text-[16px] font-bold text-[#1d1d1d] mb-[8px]">
                2.3 Statistical &amp; Analytics
              </h4>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                After consent, Google Analytics may collect usage and navigation measurements. Advertising storage, ad personalization, and ad user-data storage remain denied. Rejecting or withdrawing consent clears the application's pending analytics queue and accessible Google Analytics cookies.
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
                Google Analytics is the optional analytics provider. Google determines the cookies it sets and their duration under the Google Analytics configuration and Google's own privacy terms. This site does not claim a fixed provider-controlled retention period.
              </p>

              <h4 className="text-[16px] font-bold text-[#1d1d1d] mb-[8px]">
                Infrastructure Vendors
              </h4>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                Vercel hosts and delivers this portfolio and may process normal request and security logs under its own privacy terms. The portfolio does not use a Vercel cookie as its consent preference.
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
                You can configure your browser to block or delete cookies and similar identifiers.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                Browser Do Not Track signals are not currently used as a separate preference mechanism. Analytics remains denied unless you explicitly accept it through the site's preference control.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
                  className="font-semibold text-[#673DE6] underline underline-offset-4"
                >
                  Review or change analytics preferences
                </button>
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

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
  { id: '1', title: '1. INTRODUCTION' },
  { id: '2', title: '2. THE EXECUTIVE STANDARD OF CONFIDENTIALITY' },
  { id: '3', title: '3. INFORMATION I COLLECT' },
  { id: '4', title: '4. HOW YOUR DATA IS USED' },
  { id: '5', title: '5. LEGAL BASIS FOR PROCESSING' },
  { id: '6', title: '6. THIRD-PARTY INFRASTRUCTURE' },
  { id: '7', title: '7. INTERNATIONAL DATA TRANSFERS' },
  { id: '8', title: '8. SECURITY MEASURES' },
  { id: '9', title: '9. RETENTION PERIODS' },
  { id: '10', title: '10. YOUR RIGHTS AND CONTROL' },
  { id: '11', title: '11. CHILDREN\'S DATA' },
  { id: '12', title: '12. POLICY UPDATES' },
  { id: '13', title: '13. JURISDICTION & GOVERNING LAW' },
  { id: '14', title: '14. CONTACT FOR INQUIRIES' },
];

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ══════════════════════════════════════
          HERO HEADER — purple banner with H1
          matching blog page heading style exactly
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
            <span className="text-white/90">Privacy Policy</span>
          </div>

          {/* H1 */}
          <h1 className="font-semibold text-white mb-[24px] text-[33px] md:text-[44px] lg:text-[56px] leading-[1.04] tracking-normal mx-auto">
            Privacy Policy
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 max-w-[560px] mx-auto" style={{
            fontSize: '16px',
            lineHeight: '25.6px',
            fontWeight: 600,
          }}>
            Please read this agreement carefully, as it contains important information regarding your legal rights and remedies.
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
                  { label: 'Privacy policy', href: '/privacy', active: true },
                  { label: 'Cookie policy', href: '/cookies' },
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
                Welcome. As an Executive Admin &amp; Automation professional, I apply the same uncompromising standard of confidentiality to your data that I extend to my highest-level clients. This Privacy Policy details precisely how information is handled when you interact with this portfolio.
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
                1. INTRODUCTION
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                When you share your project details, business challenges, or contact information with me, you are trusting me with your data. This Privacy Policy explains what data I collect, why I collect it, how it is secured, and your enforceable rights concerning that information.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                Whether you are inquiring about a potential engagement or simply reviewing my portfolio case studies, I apply enterprise-grade discretion to all interactions.
              </p>
            </motion.section>

            {/* ── Section 2 ── */}
            <motion.section
              id="section-2"
              className="mb-[40px]"
              custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                2. THE EXECUTIVE STANDARD OF CONFIDENTIALITY
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                My professional practice operates on a baseline of zero-trust security and complete confidentiality. As a standard operating procedure:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li>Any business information disclosed during initial contact or consultation is treated as strictly classified.</li>
                <li>I do not sell, rent, or trade your contact information to data brokers or third parties under any circumstances.</li>
                <li>Data processed through automated workflows (if commissioned) is strictly siloed and never cross-pollinated between client environments.</li>
              </ul>
            </motion.section>

            {/* ── Section 3 ── */}
            <motion.section
              id="section-3"
              className="mb-[40px]"
              custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                3. INFORMATION I COLLECT
              </h3>

              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[8px] font-semibold">
                3.1 Information You Provide Directly
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                <li><strong>Contact Information:</strong> When you utilize the contact form, I collect your name, email address, company name, and the contents of your message to accurately assess your needs and respond professionally.</li>
              </ul>

              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[8px] font-semibold">
                3.2 Information Collected Automatically
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li><strong>Analytics Data:</strong> I utilize anonymized analytics (Google Analytics) to understand which case studies and pages are most relevant to visitors. This includes general device types, browser information, and aggregated traffic patterns. No personally identifiable information is stored.</li>
                <li><strong>Network Data:</strong> IP addresses and referral URLs are automatically captured by Vercel's edge network infrastructure solely for security monitoring, uptime, and performance purposes.</li>
                <li><strong>Cookies:</strong> Essential cookies manage site preferences (e.g., your Cookie Consent selection). Non-essential analytics cookies are only activated upon your explicit consent. Please review the <a href="/cookies" className="text-[#673DE6] hover:underline font-semibold">Cookie Policy</a> for full details.</li>
              </ul>
            </motion.section>

            {/* ── Section 4 ── */}
            <motion.section
              id="section-4"
              className="mb-[40px]"
              custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                4. HOW YOUR DATA IS USED
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                The information collected is used strictly for the following professional purposes:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li>To respond promptly and professionally to your inquiries regarding Executive Admin or Automation services.</li>
                <li>To schedule and facilitate consultations.</li>
                <li>To analyze portfolio performance, ensuring the content remains relevant and highly optimized for prospective clients.</li>
                <li>To secure the website against spam, abuse, or unauthorized access attempts.</li>
              </ul>
            </motion.section>

            {/* ── Section 5 — NEW ── */}
            <motion.section
              id="section-5"
              className="mb-[40px]"
              custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                5. LEGAL BASIS FOR PROCESSING
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I process your personal data on the following lawful bases:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li><strong>Legitimate Interests:</strong> Operating, improving, and securing this portfolio, and responding to professional inquiries — provided these interests are not overridden by your privacy rights.</li>
                <li><strong>Consent:</strong> When you submit the contact form, you explicitly consent to the processing of the information provided. When you accept non-essential cookies via the Cookie Consent banner, you consent to analytics tracking. You may withdraw this consent at any time.</li>
                <li><strong>Contractual Necessity:</strong> If a professional engagement is agreed upon, certain data may be processed as required to fulfill that contract.</li>
              </ul>
            </motion.section>

            {/* ── Section 6 ── */}
            <motion.section
              id="section-6"
              className="mb-[40px]"
              custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                6. THIRD-PARTY INFRASTRUCTURE
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                To provide a seamless, modern web experience, this portfolio utilizes industry-leading infrastructure. These providers process data strictly on my behalf and are bound by their own privacy commitments:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li><strong>EmailJS:</strong> Securely routes contact form submissions to my private inbox. EmailJS does not use your data for their own marketing purposes.</li>
                <li><strong>Vercel:</strong> Hosts this portfolio and processes standard server edge logs globally to maintain uptime and performance. Vercel's infrastructure is SOC 2 Type 2 certified.</li>
                <li>
                  <strong>Google Analytics</strong> (operated by Google LLC, Alphabet Inc.): Aggregates anonymized visitor behavior data to help refine the portfolio experience. You may opt out of Google Analytics tracking at any time via&nbsp;
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#673DE6] hover:underline font-semibold"
                  >
                    Google's opt-out tool
                  </a>.
                </li>
              </ul>
            </motion.section>

            {/* ── Section 7 — NEW ── */}
            <motion.section
              id="section-7"
              className="mb-[40px]"
              custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                7. INTERNATIONAL DATA TRANSFERS
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                This portfolio is operated from Bangladesh. However, some of the third-party services listed above — specifically Vercel and Google LLC — are headquartered in and may process data within the United States.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                Where data is transferred internationally, both Vercel and Google maintain Standard Contractual Clauses (SCCs) and other appropriate safeguards compliant with international data transfer requirements. By using this site, you acknowledge that your data may be transferred, stored, and processed in jurisdictions outside your country of residence.
              </p>
            </motion.section>

            {/* ── Section 8 ── */}
            <motion.section
              id="section-8"
              className="mb-[40px]"
              custom={7} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                8. SECURITY MEASURES
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                As an automation engineer specializing in operational efficiency, I understand that security is non-negotiable. This site enforces HTTPS encrypted connections globally. All contact form transmissions are secured via TLS encryption in transit.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                While absolute security cannot be guaranteed for any internet transmission, I apply industry-standard measures to protect your inquiries from the moment they are submitted to the moment they are processed.
              </p>
            </motion.section>

            {/* ── Section 9 ── */}
            <motion.section
              id="section-9"
              className="mb-[40px]"
              custom={8} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                9. RETENTION PERIODS
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I retain your personal data only as long as necessary to fulfill the purposes outlined in this Policy:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li><strong>Contact Inquiries (no engagement):</strong> Communication records are purged within 90 days from the date of last correspondence if a professional engagement is not pursued.</li>
                <li><strong>Contact Inquiries (active or completed engagement):</strong> Records may be retained for the duration of the engagement plus 12 months thereafter for professional accountability and reference purposes.</li>
                <li><strong>Analytics Data:</strong> Aggregated Google Analytics data is retained for 26 months per Google's default settings, after which older user data records are automatically purged.</li>
                <li><strong>Server / Edge Logs (Vercel):</strong> Retained for a short operational window, typically up to 30 days, then automatically deleted.</li>
              </ul>
            </motion.section>

            {/* ── Section 10 ── */}
            <motion.section
              id="section-10"
              className="mb-[40px]"
              custom={9} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                10. YOUR RIGHTS AND CONTROL
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                You have clear and enforceable rights over your personal data. Depending on your jurisdiction, these include:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                <li><strong>Right of Access:</strong> Request a copy of the personal information you have submitted to me.</li>
                <li><strong>Right to Erasure:</strong> Request that your communication records and contact data be permanently deleted.</li>
                <li><strong>Right to Rectification:</strong> Request correction of any inaccurate or incomplete personal data held about you.</li>
                <li><strong>Right to Restriction:</strong> Request that I limit the processing of your personal data under certain circumstances.</li>
                <li><strong>Right to Object:</strong> Object to processing carried out on the basis of legitimate interests.</li>
                <li><strong>Right to Portability:</strong> Request your data in a structured, commonly used, machine-readable format.</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for non-essential cookies at any time via the site's Cookie Consent banner.</li>
              </ul>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                To exercise any of these rights, simply email{' '}
                <a href="mailto:aburahatsabir178@gmail.com" className="text-[#673DE6] hover:underline font-semibold">
                  aburahatsabir178@gmail.com
                </a>. I will respond within 30 days.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                If you believe your data rights have not been adequately addressed, you have the right to lodge a complaint with your local data protection supervisory authority.
              </p>
            </motion.section>

            {/* ── Section 11 — NEW ── */}
            <motion.section
              id="section-11"
              className="mb-[40px]"
              custom={10} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                11. CHILDREN'S DATA
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                This portfolio is directed solely at professionals and is not intended for use by individuals under the age of 16. I do not knowingly collect personal data from minors. If you believe a minor has submitted information through this site, please contact me immediately at{' '}
                <a href="mailto:aburahatsabir178@gmail.com" className="text-[#673DE6] hover:underline font-semibold">
                  aburahatsabir178@gmail.com
                </a>{' '}
                and I will delete it promptly.
              </p>
            </motion.section>

            {/* ── Section 12 ── */}
            <motion.section
              id="section-12"
              className="mb-[40px]"
              custom={11} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                12. POLICY UPDATES
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                This Policy is a living document, subject to refinement as technology, legal requirements, and business practices evolve. When material changes are made, the <strong>"Last Revised"</strong> date at the top of this document will be prominently updated. For significant changes affecting your rights, I will endeavor to provide additional notice via the contact form confirmation page where practical.
              </p>
            </motion.section>

            {/* ── Section 13 — NEW ── */}
            <motion.section
              id="section-13"
              className="mb-[40px]"
              custom={12} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                13. JURISDICTION &amp; GOVERNING LAW
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                This Privacy Policy is governed by and construed in accordance with the laws of Bangladesh. Any disputes arising from the interpretation or application of this Policy shall be resolved under the applicable laws of Bangladesh, without prejudice to your rights under the data protection laws of your own jurisdiction.
              </p>
            </motion.section>

            {/* ── Section 14 ── */}
            <motion.section
              id="section-14"
              className="mb-[40px]"
              custom={13} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                14. CONTACT FOR INQUIRIES
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                For any questions regarding this Privacy Policy, data practices, or to request a standard NDA prior to a consultation, please contact me directly:{' '}
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

export default PrivacyPolicy;

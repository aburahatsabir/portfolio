import React, { useEffect } from 'react';

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
          {/* Breadcrumb — centered, 16px normal */}
          <div className="flex items-center justify-center gap-2 mb-[16px]" style={{
            fontSize: '16px',
            lineHeight: '22.4px',
            fontWeight: 400,
          }}>
            <a href="/" className="text-white/60 hover:text-white transition-colors">Home</a>
            <span className="text-white/40">›</span>
            <span className="text-white/60">Legal</span>
            <span className="text-white/40">›</span>
            <span className="text-white/90">Privacy policy</span>
          </div>

          {/* H1 — blog page spec: font-semibold, 56px, leading-[1.04], centered */}
          <h1 className="font-semibold text-white mb-[24px] text-[33px] md:text-[44px] lg:text-[56px] leading-[1.04] tracking-normal mx-auto">
            Privacy policy
          </h1>

          {/* Subtitle — 16px semibold, centered */}
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
              {/* Top flat links (no category label) */}
              <ul className="mb-[28px] space-y-[10px]">
                <li>
                  <a href="/accessibility" className="text-[14px] text-[#464646] hover:text-[#673DE6] transition-colors leading-[1.4]">
                    Accessibility statement
                  </a>
                </li>
                <li>
                  {/* Active link — purple + bold */}
                  <a href="/privacy" className="text-[14px] text-[#673DE6] font-semibold leading-[1.4]">
                    Privacy policy
                  </a>
                </li>
              </ul>

              {/* Policies Category */}
              <div className="mb-[24px]">
                <p className="text-[14px] font-bold text-[#1d1d1d] mb-[10px]">Policies</p>
                <ul className="space-y-[8px]">
                  {[
                    { label: "Cookie policy", href: "/cookies" },
                    { label: "Data security standards", href: "/governance" },
                  ].map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[14px] text-[#464646] hover:text-[#673DE6] transition-colors leading-[1.4]">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company's policies Category */}
              <div className="mb-[24px]">
                <p className="text-[14px] font-bold text-[#1d1d1d] mb-[10px]">Professional standards</p>
                <ul className="space-y-[8px]">
                  {[
                    { label: "Code of conduct", href: "#" },
                    { label: "Confidentiality agreement (NDA)", href: "#" },
                  ].map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[14px] text-[#464646] hover:text-[#673DE6] transition-colors leading-[1.4]">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 w-full max-w-[850px]">
            {/* Info callout box (matches Hostinger) */}
            <div className="bg-[#f7f7f7] border border-[#e5e5e5] rounded-[8px] p-[24px] mb-[40px]">
              <p className="text-[14px] text-[#464646] leading-[1.6]">
                Welcome. As an Executive Admin & Automation professional, I treat your data with the same uncompromising standard of strict confidentiality that I grant to my highest-level clients. This Privacy Policy details how data is handled when you interact with this portfolio.
              </p>
            </div>

            <p className="text-[14px] text-[#464646] mb-[32px]">
              Last revised: 2024-03-12 10:00:00
            </p>

            {/* Section 1 */}
            <section className="mb-[40px]">
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                1. INTRODUCTION
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                When you share your project details, business challenges, or contact information with me, you are trusting me with your data. This Privacy Policy explains what data I collect, why I collect it, how it is secured, and your rights concerning that information.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                Whether we are discussing a potential contract or you are simply reviewing my portfolio case studies, I apply enterprise-grade discretion to all interactions.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-[40px]">
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                2. THE EXECUTIVE STANDARD OF CONFIDENTIALITY
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                My business operates on a baseline of zero-trust security and complete confidentiality. As a standard operating procedure:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                <li>Any business information disclosed during initial contact or consultation is treated as strictly classified.</li>
                <li>I do not sell, rent, or trade your contact information to data brokers or third parties under any circumstances.</li>
                <li>Data processed through automated workflows (if commissioned) is strictly siloed and never cross-pollinated between client environments.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-[40px]">
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                3. INFORMATION I COLLECT
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[8px]">
                3.1 Information You Provide Directly
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                <li><strong>Contact Information:</strong> When you utilize the contact form, I collect your name, email address, company name, and the contents of your message to accurately assess your needs and respond.</li>
              </ul>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[8px]">
                3.2 Information Collected Automatically
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li><strong>Analytics Data:</strong> I utilize basic, anonymized analytics (such as Google Analytics) to understand which case studies and pages are most relevant to visitors. This includes general device types, browser information, and aggregated traffic patterns.</li>
                <li><strong>Cookies:</strong> Essential cookies are used to manage site preferences (e.g., your choice in the Cookie Consent banner). Please review the Cookie Policy for detailed specifics.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-[40px]">
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
            </section>

            {/* Section 5 */}
            <section className="mb-[40px]">
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                5. THIRD-PARTY INFRASTRUCTURE
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                To provide a seamless, modern web experience, this portfolio utilizes industry-leading infrastructure. These providers process data strictly on my behalf:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li><strong>EmailJS:</strong> securely routes your contact form submissions to my private inbox. They do not use your data for their own marketing.</li>
                <li><strong>Vercel:</strong> securely hosts this portfolio and processes standard server edge logs globally to maintain uptime and speed.</li>
                <li><strong>Google Analytics:</strong> aggregates visitor data to help me refine the user experience.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-[40px]">
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                6. SECURITY MEASURES
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                As an automation engineer specializing in operational efficiency, I understand that security is paramount. The site forces HTTPS encrypted connections globally. Contact form transmissions are secured via TLS.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                While no transmission over the internet is mathematically 100% secure, I deploy best-in-class security practices to safeguard your inquiries from the moment they are submitted.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-[40px]">
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                7. RETENTION PERIODS
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I retain your data only as long as necessary to fulfill the purposes outlined above:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li><strong>Inquiries:</strong> If a business engagement is not pursued, communication records are purged within a reasonable timeframe, typically 90 days.</li>
                <li><strong>Analytics:</strong> Aggregated Google Analytics data is set to strict data retention limits, automatically expiring older user data records.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-[40px]">
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                8. YOUR RIGHTS AND CONTROL
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                You possess full sovereign rights over your personal data. You have the right to:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                <li>Request a copy of the direct information you have submitted to me.</li>
                <li>Request that your communication records and contact data be permanently deleted.</li>
                <li>Withdraw consent for non-essential cookies via the site's Cookie Consent banner.</li>
              </ul>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                To exercise any of these rights, simply email <a href="mailto:hello@aburahatsabir.com" className="text-[#673DE6] hover:underline font-semibold">hello@aburahatsabir.com</a>.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-[40px]">
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                9. POLICY UPDATES
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                This policy represents a living document, subject to refinements as technology and legal requirements evolve. Significant changes will be reflected by the "Last revised" date at the top of this document. Continued engagement with the portfolio indicates acceptance of the active policy.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-[40px]">
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">
                10. CONTACT FOR INQUIRIES
              </h3>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                For any questions regarding confidentiality, data practices, or to request a standard NDA prior to a consultation, please reach out directly at: <a href="mailto:hello@aburahatsabir.com" className="text-[#673DE6] hover:underline font-semibold">hello@aburahatsabir.com</a>.
              </p>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

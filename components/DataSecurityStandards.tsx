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

const DataSecurityStandards: React.FC = () => {
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
            <span className="text-white/90">Data Security Standards</span>
          </div>
          <h1 className="font-semibold text-white mb-[24px] text-[33px] md:text-[44px] lg:text-[56px] leading-[1.04] tracking-normal mx-auto">
            Data Security Standards
          </h1>
          <p className="text-white/80 max-w-[580px] mx-auto" style={{ fontSize: '16px', lineHeight: '25.6px', fontWeight: 600 }}>
            The documented security practices governing how client data, credentials, and operational infrastructure are protected across every engagement.
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
                  { label: 'Cookie policy', href: '/cookies' },
                  { label: 'Accessibility statement', href: '/accessibility' },
                  { label: 'Data security standards', href: '/governance', active: true },
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

            {/* Callout box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#f7f7f7] border border-[#e5e5e5] rounded-[8px] p-[24px] mb-[40px]"
            >
              <p className="text-[14px] text-[#464646] leading-[1.6]">
                Operating at the executive level means working with data that carries genuine business risk. This document defines the concrete security standards I apply across every client engagement — not aspirational principles, but the actual practices in force. It draws on the spirit of ISO/IEC 27001 and SOC 2 Type II frameworks, applied proportionately to independent professional practice.
              </p>
            </motion.div>

            <p className="text-[14px] text-[#464646] mb-[32px]">
              Last revised: <strong>{LAST_REVISED}</strong>
            </p>

            {/* ── Section 1: Scope ── */}
            <motion.section className="mb-[40px]" custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">1. SCOPE & APPLICABILITY</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                These standards apply to all data — in any format — encountered during a professional engagement with a client. This includes, but is not limited to:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li>Employee records, payroll data, and HR documentation</li>
                <li>Business financial data, budget files, and invoice archives</li>
                <li>Client-facing communications and correspondence</li>
                <li>Access credentials, API keys, and system login details</li>
                <li>Proprietary processes, SOPs, and operational blueprints</li>
                <li>Strategic plans, board materials, and unreleased commercial data</li>
              </ul>
              <p className="text-[16px] text-[#464646] leading-[1.6] mt-[12px]">
                These standards govern data handled on behalf of clients regardless of the format (digital file, spreadsheet, cloud document, or verbal briefing reduced to writing).
              </p>
            </motion.section>

            {/* ── Section 2: Data Handling ── */}
            <motion.section className="mb-[40px]" custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">2. DATA HANDLING & CLASSIFICATION</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                All client data is treated as confidential by default. I apply a three-tier classification in practice:
              </p>
              <div className="border border-[#e5e5e5] rounded-[8px] overflow-hidden mb-[16px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1d1d1d]">
                      <th className="p-[14px] text-[13px] font-bold text-white w-[30%]">Classification</th>
                      <th className="p-[14px] text-[13px] font-bold text-white w-[40%]">Examples</th>
                      <th className="p-[14px] text-[13px] font-bold text-white">Handling Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#e5e5e5] bg-[#f7f7f7]">
                      <td className="p-[14px] text-[14px] font-semibold text-red-700">Restricted</td>
                      <td className="p-[14px] text-[14px] text-[#464646]">Credentials, API keys, salary data, board documents</td>
                      <td className="p-[14px] text-[14px] text-[#464646]">Zero-knowledge storage only. Never transmitted via unencrypted channels.</td>
                    </tr>
                    <tr className="border-b border-[#e5e5e5]">
                      <td className="p-[14px] text-[14px] font-semibold text-amber-700">Confidential</td>
                      <td className="p-[14px] text-[14px] text-[#464646]">SOPs, vendor contracts, HR records, financial reports</td>
                      <td className="p-[14px] text-[14px] text-[#464646]">Stored on approved platforms only. Shared only with explicitly authorized parties.</td>
                    </tr>
                    <tr className="bg-[#f7f7f7]">
                      <td className="p-[14px] text-[14px] font-semibold text-emerald-700">Internal</td>
                      <td className="p-[14px] text-[14px] text-[#464646]">Project plans, task logs, process documentation</td>
                      <td className="p-[14px] text-[14px] text-[#464646]">Standard secure handling. Not shared externally without client consent.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* ── Section 3: Access Control ── */}
            <motion.section className="mb-[40px]" custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">3. ACCESS CONTROL & CREDENTIAL HYGIENE</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                Credential mismanagement is the primary vector for operational data breaches. My access control standards:
              </p>
              <ul className="list-outside ml-[8px] space-y-[14px] text-[16px] text-[#464646] leading-[1.6]">
                {[
                  {
                    label: 'Minimum Necessary Access',
                    detail: 'I request only the permissions required to complete the specific task. Read-only access is requested where write access is not essential.'
                  },
                  {
                    label: 'Zero-Knowledge Password Management',
                    detail: 'All credentials shared with me are stored exclusively in a zero-knowledge, AES-256 encrypted password manager (Bitwarden). Credentials are never stored in plain text, email drafts, or spreadsheets.'
                  },
                  {
                    label: 'Multi-Factor Authentication',
                    detail: 'MFA is enabled on all platforms where I hold client-shared access. I will request MFA be enabled on any shared account before accepting access.'
                  },
                  {
                    label: 'Immediate Revocation on Request',
                    detail: 'All access credentials are revoked immediately upon client request or at engagement end — whichever comes first. I do not retain credentials post-engagement.'
                  },
                  {
                    label: 'No Credential Reuse',
                    detail: 'Credentials are never reused across clients or platforms. Each access point receives a unique, strong credential.'
                  }
                ].map(({ label, detail }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#673DE6] mt-[10px] shrink-0"></div>
                    <div>
                      <strong className="text-[#1d1d1d]">{label}: </strong>{detail}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* ── Section 4: Transmission ── */}
            <motion.section className="mb-[40px]" custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">4. DATA TRANSMISSION & ENCRYPTION</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                Data in transit is always encrypted. The following transmission standards are enforced:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li>All file transfers use TLS 1.2 or higher. Plain HTTP file transfer is never used for client data.</li>
                <li>Sensitive documents are shared via encrypted, permission-controlled cloud links (Google Drive or Notion) — not as email attachments where avoidable.</li>
                <li>Credentials are never transmitted via email, SMS, or unencrypted messaging apps. Where secure transfer is required, I use a time-limited, encrypted credential-share link.</li>
                <li>This portfolio and all associated web infrastructure is served over HTTPS with HSTS at the Vercel edge network level.</li>
              </ul>
            </motion.section>

            {/* ── Section 5: Tool & Vendor Posture ── */}
            <motion.section className="mb-[40px]" custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">5. TOOL & VENDOR SECURITY POSTURE</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                I operate on a curated stack of enterprise-grade tools. The following platforms are used in professional engagements and their applicable security certifications are noted:
              </p>
              <div className="border border-[#e5e5e5] rounded-[8px] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1d1d1d]">
                      <th className="p-[14px] text-[13px] font-bold text-white w-[25%]">Platform</th>
                      <th className="p-[14px] text-[13px] font-bold text-white w-[30%]">Use Case</th>
                      <th className="p-[14px] text-[13px] font-bold text-white">Security Posture</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { platform: 'Vercel', use: 'Portfolio hosting & edge delivery', security: 'SOC 2 Type II certified. Global CDN with DDoS protection and HSTS enforcement.' },
                      { platform: 'Google Workspace', use: 'Documents, Sheets, Drive, Gmail', security: 'ISO 27001, SOC 2/3, FedRAMP authorized. AES-256 encryption at rest.' },
                      { platform: 'Notion', use: 'SOPs, project documentation', security: 'SOC 2 Type II certified. Role-based permissions, audit logs, and SSO support.' },
                      { platform: 'Bitwarden', use: 'Credential management', security: 'SOC 2 Type II. Zero-knowledge architecture. AES-256 + PBKDF2 SHA-256 key derivation.' },
                      { platform: 'Google Apps Script', use: 'Automation & workflow logic', security: 'Operates within Google Workspace security perimeter. OAuth 2.0 scoped access only.' },
                      { platform: 'Make (Integromat)', use: 'Cross-platform automation', security: 'ISO 27001 certified. All data processed in transit over encrypted channels.' },
                    ].map(({ platform, use, security }, i) => (
                      <tr key={platform} className={`border-b border-[#e5e5e5] ${i % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'}`}>
                        <td className="p-[14px] text-[14px] font-bold text-[#1d1d1d]">{platform}</td>
                        <td className="p-[14px] text-[14px] text-[#464646]">{use}</td>
                        <td className="p-[14px] text-[14px] text-[#464646]">{security}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[14px] text-[#464646] leading-[1.6] mt-[12px]">
                Any additional tools introduced for a specific client engagement are evaluated for security posture before use and disclosed to the client in advance.
              </p>
            </motion.section>

            {/* ── Section 6: Retention & Deletion ── */}
            <motion.section className="mb-[40px]" custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">6. DATA RETENTION & DELETION</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I do not retain client data longer than operationally necessary. The following retention framework applies:
              </p>
              <ul className="list-outside ml-[8px] space-y-[14px] text-[16px] text-[#464646] leading-[1.6]">
                {[
                  {
                    label: 'Active Engagement',
                    detail: 'Data is retained for the duration of the project scope only, in the agreed platforms.'
                  },
                  {
                    label: 'Post-Engagement (Default)',
                    detail: 'Unless a written retention agreement exists for ongoing support, all client-specific files and credentials are deleted within 30 days of engagement close.'
                  },
                  {
                    label: 'On-Request Deletion',
                    detail: 'The client may request immediate deletion of all retained data at any point. I will confirm deletion in writing within 5 business days.'
                  },
                  {
                    label: 'Work Product Ownership',
                    detail: 'All deliverables created for a client are the client\'s intellectual property. I retain no right to reuse, redistribute, or reference them without explicit written permission.'
                  }
                ].map(({ label, detail }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#673DE6] mt-[10px] shrink-0"></div>
                    <div>
                      <strong className="text-[#1d1d1d]">{label}: </strong>{detail}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* ── Section 7: Incident Response ── */}
            <motion.section className="mb-[40px]" custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">7. INCIDENT RESPONSE</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                In the event of an actual or suspected security incident involving client data, the following response protocol is in effect:
              </p>
              <div className="space-y-[12px]">
                {[
                  { step: '01', title: 'Immediate Containment', desc: 'Upon detection, access that may be compromised is immediately suspended. Affected credentials are rotated or revoked within the hour.' },
                  { step: '02', title: 'Client Notification', desc: 'The client is notified within 24 hours of confirmed or suspected breach — not after internal investigation is complete. Transparency is non-negotiable.' },
                  { step: '03', title: 'Scope Assessment', desc: 'The scope of data potentially affected is assessed and documented. The client receives a full written account of what was involved.' },
                  { step: '04', title: 'Remediation', desc: 'Root cause is identified and eliminated. Affected systems or accounts are restored to a secure state before normal operations resume.' },
                  { step: '05', title: 'Post-Incident Review', desc: 'A written post-incident report is provided to the client within 5 business days, documenting cause, impact, response, and preventive measures.' },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex items-start gap-[16px] bg-[#f7f7f7] border border-[#e5e5e5] rounded-[8px] p-[16px]">
                    <div className="w-[32px] h-[32px] rounded-full bg-[#673DE6] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                      {step}
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-[#1d1d1d] mb-[4px]">{title}</p>
                      <p className="text-[14px] text-[#464646] leading-[1.6]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ── Section 8: Framework References ── */}
            <motion.section className="mb-[40px]" custom={7} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">8. SECURITY FRAMEWORK REFERENCES</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                These standards are designed with reference to internationally recognised information security frameworks, applied proportionately to independent professional practice:
              </p>
              <div className="grid md:grid-cols-2 gap-[16px] mb-[24px]">
                {[
                  {
                    title: 'ISO/IEC 27001',
                    desc: 'The international standard for Information Security Management Systems (ISMS). My data handling, access control, and incident response practices align with its core controls.'
                  },
                  {
                    title: 'SOC 2 Type II Principles',
                    desc: 'The AICPA Trust Service Criteria — Security, Availability, Confidentiality, and Privacy — are applied as design principles for all data handling procedures and vendor selection.'
                  },
                  {
                    title: 'GDPR / Data Protection',
                    desc: 'Where client data involves personal data of individuals in the EU/EEA or UK, GDPR-aligned data minimisation, lawful basis, and rights obligations apply. See my Privacy Policy for full details.'
                  },
                  {
                    title: 'NIST Cybersecurity Framework',
                    desc: 'The Identify → Protect → Detect → Respond → Recover model informs my security posture at the operational level, particularly for incident response and access management.'
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-[#f7f7f7] border border-[#e5e5e5] rounded-[8px] p-[20px]">
                    <h4 className="text-[15px] font-bold text-[#1d1d1d] mb-[8px]">{item.title}</h4>
                    <p className="text-[14px] text-[#464646] leading-[1.6]">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-[14px] text-[#464646] leading-[1.6]">
                These references do not constitute a formal certification claim. They indicate the standards I have studied and applied in designing my professional security practices.
              </p>
            </motion.section>

            {/* ── Section 9: Contact ── */}
            <motion.section className="mb-[40px]" custom={8} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">9. SECURITY INQUIRIES</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[24px]">
                If you have a question about these security standards, wish to audit my practices before an engagement, or need to report a security concern, please contact me directly.
              </p>
              <div className="bg-[#f7f7f7] border border-[#e5e5e5] rounded-[8px] p-[24px]">
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#1d1d1d] mb-[8px]">Security Contact</p>
                <a
                  href="mailto:aburahatsabir178@gmail.com?subject=Security%20Inquiry&body=Nature%20of%20inquiry:%0A%0ADetails:"
                  className="text-[18px] font-bold text-[#673DE6] hover:underline mb-[20px] block"
                >
                  aburahatsabir178@gmail.com
                </a>
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#1d1d1d] mb-[4px]">Response Commitment</p>
                <p className="text-[14px] text-[#464646]">Security inquiries are prioritised. I aim to respond within 1 business day.</p>
              </div>
            </motion.section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default DataSecurityStandards;

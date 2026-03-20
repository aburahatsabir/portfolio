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

const CodeOfConduct: React.FC = () => {
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
            <span className="text-white/90">Code of Conduct</span>
          </div>
          <h1 className="font-semibold text-white mb-[24px] text-[33px] md:text-[44px] lg:text-[56px] leading-[1.04] tracking-normal mx-auto">
            Code of Conduct
          </h1>
          <p className="text-white/80 max-w-[560px] mx-auto" style={{ fontSize: '16px', lineHeight: '25.6px', fontWeight: 600 }}>
            The written standard by which I conduct every professional engagement — with clarity, integrity, and complete accountability.
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
                  { label: 'Data security standards', href: '/governance' },
                  { label: 'Code of conduct', href: '/conduct', active: true },
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
                This Code of Conduct is the formal written standard that governs how I conduct every professional engagement. It sets out the expectations I hold for myself, the commitments I make to every client, and the principles I apply without exception — regardless of project size, client sector, or engagement length.
              </p>
            </motion.div>

            <p className="text-[14px] text-[#464646] mb-[32px]">
              Last revised: <strong>{LAST_REVISED}</strong>
            </p>

            {/* Section 1 */}
            <motion.section className="mb-[40px]" custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">1. PROFESSIONAL INTEGRITY</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I act with honesty in every interaction. I do not misrepresent my capabilities, experience, or the expected outcomes of any engagement. If a project is outside the scope of what I can deliver to a high standard, I will say so directly before accepting it.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                I do not overpromise to win business. An accurate assessment — even an unfavourable one — serves the client's best interests, and that always comes first.
              </p>
            </motion.section>

            {/* Section 2 */}
            <motion.section className="mb-[40px]" custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">2. CONFIDENTIALITY AS A NON-NEGOTIABLE</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                Any business information, financial data, personnel records, operational processes, or strategic plans shared with me during an engagement are treated as strictly classified. This obligation does not expire at the end of a contract.
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li>I do not discuss client specifics with third parties — including other clients.</li>
                <li>I do not use client business intelligence for personal gain or competitive advantage.</li>
                <li>I will sign a mutual NDA prior to any substantive consultation, upon request — no minimums, no conditions.</li>
                <li>Work product created for a client remains the client's intellectual property unless a separate written agreement specifies otherwise.</li>
              </ul>
            </motion.section>

            {/* Section 3 */}
            <motion.section className="mb-[40px]" custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">3. CONFLICTS OF INTEREST</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I will disclose any conflict of interest — real or perceived — before accepting an engagement. This includes existing relationships with competitors, personal financial interests that intersect with the client's business, or any other circumstance that a reasonable person in the client's position would consider material.
              </p>
              <p className="text-[16px] text-[#464646] leading-[1.6]">
                I do not accept referral fees, commissions, or kickbacks from any vendor or tool I recommend to a client without explicit, written disclosure and client consent. My recommendations are driven by operational merit alone.
              </p>
            </motion.section>

            {/* Section 4 */}
            <motion.section className="mb-[40px]" custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">4. COMMUNICATION STANDARDS</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I believe that the quality of communication is an indicator of the quality of work. I commit to:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li><strong>Timely responses:</strong> All client communications are acknowledged within 24 hours on business days.</li>
                <li><strong>Proactive updates:</strong> If a deadline is at risk, I will notify the client before the deadline, not after. No surprises.</li>
                <li><strong>Clarity over jargon:</strong> I communicate complex technical processes in plain language that enables informed decisions, not dependency on my interpretation.</li>
                <li><strong>Respectful discourse:</strong> I maintain a professional, respectful tone in all communications — independent of stress, disagreement, or difficulty.</li>
              </ul>
            </motion.section>

            {/* Section 5 */}
            <motion.section className="mb-[40px]" custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">5. QUALITY & DELIVERY STANDARDS</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I do not deliver work that I would not personally endorse or stand behind. Every deliverable — whether an automation workflow, a data system, or an administrative framework — must meet the following baseline:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li>It solves the problem it was commissioned to solve.</li>
                <li>It is documented sufficiently for the client's team to operate or maintain it independently.</li>
                <li>It is tested against likely failure conditions, not just the ideal-path scenario.</li>
                <li>If a deliverable does not meet the agreed scope, I will remediate it at no additional cost.</li>
              </ul>
            </motion.section>

            {/* Section 6 */}
            <motion.section className="mb-[40px]" custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">6. DATA RESPONSIBILITY</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                Engagements often require access to sensitive operational data — employee records, financial data, client databases, or proprietary workflows. I treat all such access with commensurate seriousness:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li>I request only the minimum level of access required to complete the work.</li>
                <li>I do not retain client data after an engagement concludes unless a written agreement requires it for ongoing support.</li>
                <li>Access credentials shared with me are stored in a zero-knowledge password manager and are immediately revoked upon request.</li>
                <li>I notify the client within 24 hours if I become aware of any actual or suspected breach involving their data.</li>
              </ul>
            </motion.section>

            {/* Section 7 */}
            <motion.section className="mb-[40px]" custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">7. FAIR & TRANSPARENT BILLING</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[12px]">
                I bill for what is agreed and nothing more without prior written approval. My billing standards:
              </p>
              <ul className="list-disc list-outside ml-[28px] space-y-[8px] text-[16px] text-[#464646] leading-[1.6]">
                <li>Scope changes that affect cost require explicit client sign-off before work proceeds.</li>
                <li>Invoices are itemised, clearly described, and submitted on the agreed schedule.</li>
                <li>I do not charge for rework caused by my own errors or omissions.</li>
              </ul>
            </motion.section>

            {/* Section 8 */}
            <motion.section className="mb-[40px]" custom={7} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] font-bold text-[#1d1d1d] mb-[16px]">8. COMPLAINTS & ESCALATION</h3>
              <p className="text-[16px] text-[#464646] leading-[1.6] mb-[16px]">
                If you believe I have fallen short of any commitment outlined in this Code of Conduct, I want to know. A complaint is an opportunity to address a failure directly — not a threat to be managed.
              </p>
              <div className="bg-[#f7f7f7] border border-[#e5e5e5] rounded-[8px] p-[24px]">
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#1d1d1d] mb-[8px]">Escalation Contact</p>
                <a href="mailto:aburahatsabir178@gmail.com?subject=Professional%20Conduct%20Concern" className="text-[18px] font-bold text-[#673DE6] hover:underline mb-[16px] block">
                  aburahatsabir178@gmail.com
                </a>
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#1d1d1d] mb-[4px]">Response Commitment</p>
                <p className="text-[14px] text-[#464646]">I will acknowledge all formal complaints within 1 business day and provide a substantive response within 5 business days.</p>
              </div>
            </motion.section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── DATA ─────────────────────────────────────────────────

const MocsCaseStudy: React.FC = () => {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 1000], [0, 250]);

    const [activeHypothesis, setActiveHypothesis] = useState(0);

    const hypothesisData = [
        {
            tag: "Observation · Stage 01",
            title: "The spreadsheet was collapsing under its own weight",
            quote: "\"We knew patients were falling through the cracks. We just couldn't prove it from the data.\"",
            body: "The existing Google Sheets system had grown organically — columns were added as needs arose, with no schema discipline. The Patient Track sheet had 21+ columns, the Hospital Rate sheet had 80+ columns per row. Data integrity was near-zero: dates were free-text, statuses were inconsistent strings, and follow-up history was buried in single cells.",
            pills: ["Data integrity near-zero", "No schema discipline", "Buried history"]
        },
        {
            tag: "Hypothesis · Stage 02",
            title: "Structure enables accountability. Accountability enables scale.",
            quote: "\"The coordinators weren't disorganised. The data was.\"",
            body: "If each patient had a structured record with a defined status taxonomy, a separate follow-up log, and a linked agent attribution — coordinators would stop losing context. If the finance engine was encoded directly in the system rather than in a reference sheet, commission errors would disappear. Operational chaos was a data modeling problem, not a people problem.",
            pills: ["Status taxonomy", "Encoded finance engine", "Linked attribution"]
        },
        {
            tag: "Design decision · Stage 03",
            title: "Model the data first. Build the interface around it.",
            quote: "\"The schema is the design. The UI is just the surface.\"",
            body: "The first month was spent designing the data schema — defining the Patient entity, the status state machine (7 stages), the service pricing model, and the agent attribution model. The interface was built after. Every screen in MOCS is a projection of the data model — not a UX exercise that happened to store data.",
            pills: ["Data schema first", "7-stage state machine", "UI as projection"]
        },
        {
            tag: "Validation · Stage 04",
            title: "Commission disputes dropped to zero within 60 days.",
            quote: "\"The agents stopped arguing because the numbers were now undeniable.\"",
            body: "The clearest validation was financial. Before MOCS, the operations team fielded 4–6 agent commission disputes per month. After deployment, disputes stopped entirely. The rate matrix was encoded once, correctly, and became the system of record. No ambiguity, no negotiation.",
            pills: ["Disputes → Zero", "Single system of record", "Financial validation"]
        },
        {
            tag: "Surprise finding · Stage 05",
            title: "The visa pipeline became a proactive, not reactive, tool.",
            quote: "\"The system made invisible problems visible — and that was enough.\"",
            body: "The kanban visa pipeline was expected to provide clarity. What wasn't expected was how it changed coordinator behaviour. Before, coordinators called patients reactively. After, the pipeline surfaced patients who had been in \"Applied\" for more than two weeks, prompting proactive outreach. Visa success rate improved from ~78% to 97%.",
            pills: ["Proactive outreach", "Pipeline visibility", "78% → 97% visa success"]
        }
    ];

    const [activeHowItWorks, setActiveHowItWorks] = useState(0);

    const hwData = [
        {
            title: "1. Agent submits patient for VIL",
            desc: "A travel agent submits a patient's details for a Visa Invitation Letter. The coordinator creates a patient record — name, passport, contact, hospital preference, department, and service type.",
            fields: [["Patient", "MD JASIM UDDIN KHAN"], ["Hospital", "APOLLO"], ["City", "Chennai"], ["Service", "VIL"]]
        },
        {
            title: "2. VIL is requested and tracked",
            desc: "The system flags the case as \"VIL Processing.\" The coordinator contacts the partner hospital to issue the invitation letter. The patient record updates to show VIL issued with timestamp.",
            fields: [["Status", "VIL Processing", true], ["Timestamp", "12 Oct · 10:45 AM"], ["Hospital Link", "Confirmed"], ["Action", "VIL Issued"]]
        },
        {
            title: "3. Patient enters Visa Pipeline",
            desc: "With VIL in hand, the patient submits a visa application at IVAC. The case moves to the Visa Kanban board — \"Applied.\" The pipeline surfaces this case automatically if it stalls beyond 14 days.",
            fields: [["Visa Status", "Applied", true], ["IVAC Setup", "Done"], ["Days in stage", "3 Days"], ["Next alert", "14 Days"]]
        },
        {
            title: "4. Visa approved → Coordination",
            desc: "Visa approval moves the case to \"Approved\" then \"Travelling.\" The coordinator activates at-hospital services — airport pickup booking, hospital guide assignment, doctor appointment confirmation.",
            fields: [["Visa Status", "Approved", true], ["Pickup", "Booked"], ["Guide", "Assigned"], ["Appointment", "Confirmed"]]
        },
        {
            title: "5. Treatment tracked as OPD/IPD",
            desc: "The patient receives treatment. The case is updated to \"Under Treatment\" with OPD/IPD designation. Follow-up calls are logged with date stamps and outcomes.",
            fields: [["Status", "Under Treatment", true], ["Type", "IPD"], ["Last Follow-up", "24 Oct · 09:15 AM"], ["Outcome", "Admitted"]]
        },
        {
            title: "6. Treatment Done → Commission",
            desc: "The case status updates to \"Treatment Done.\" The finance engine automatically applies the correct commission rate (e.g., 24% OP for Manipal Varthur), calculates CI and agent share, and flags for invoicing.",
            fields: [["Status", "Treatment Done", true], ["Hospital", "Manipal Varthur"], ["Comm Rate", "24%"], ["Agent split", "Auto-calc"]]
        }
    ];

    useEffect(() => {
        // IntersectionObserver for scroll-triggered staggered reveals
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    
                    // Trigger metric rings if this section contains them
                    const rings = entry.target.querySelectorAll('.metric-ring-fill');
                    if (rings.length > 0) {
                        rings.forEach(ring => {
                            const val = ring.getAttribute('data-val');
                            if (val) (ring as HTMLElement).style.strokeDasharray = `${val} 314`;
                        });
                    }
                    
                    // Stop observing once animated to avoid re-triggering repeatedly
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        const elements = document.querySelectorAll('.fade');
        elements.forEach(elt => observer.observe(elt));

        return () => observer.disconnect();
    }, []);


    return (
        <div className="fmcg-case-study">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;700&display=swap');

                .fmcg-case-study {
                    --brand:#4F46E5;--brand-hover:#4338CA;--brand-light:#EEF2FF;--brand-border:#C7D2FE;
                    --w:#FFFFFF;--off:#F8FAFC;--off2:#F1F5F9;
                    --ink:#0F172A;--ink2:#1E293B;--ink3:#64748B;--ink4:#94A3B8;
                    --ln:#E2E8F0;--ln2:#CBD5E1;
                    --gm:#059669;--gbg:#ECFDF5;--gdk:#065F46;
                    --rm:#DC2626;--rbg:#FEF2F2;
                    --am:#D97706;--abg:#FFFBEB;
                    --bm:#2563EB;--bbg:#EFF6FF;
                    --serif:'Plus Jakarta Sans',system-ui,sans-serif;
                    --sans:'Plus Jakarta Sans',system-ui,sans-serif;
                    --mono:'JetBrains Mono',monospace;
                    
                    font-family: var(--sans);
                    background: var(--w);
                    color: var(--ink);
                    -webkit-font-smoothing: antialiased;
                }
                
                .fmcg-case-study h1 {
                    font-family: var(--sans);
                    font-size: clamp(42px, 5vw, 76px);
                    line-height: 1.05;
                    letter-spacing: -0.04em;
                    color: var(--ink);
                    margin-bottom: 24px;
                    font-weight: 800;
                }
                .fmcg-case-study h1 em {
                    font-style: italic;
                    color: var(--ink4);
                    font-weight: 600;
                }
                .fmcg-case-study .lead {
                    font-size: 17px;
                    color: var(--ink2);
                    line-height: 1.82;
                    font-weight: 300;
                    margin-top: 0;
                    max-width: 540px;
                    margin-bottom: 40px;
                }
                
                .fmcg-case-study #hero {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    padding: 120px 0 80px;
                    position: relative;
                    overflow: hidden;
                }
                .fmcg-case-study .hero-grid {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(var(--ln) 1px, transparent 1px), linear-gradient(90deg, var(--ln) 1px, transparent 1px);
                    background-size: 64px 64px;
                    opacity: .4;
                    pointer-events: none;
                    mask-image: radial-gradient(circle at 75% 50%, rgba(0,0,0,0.6) 0%, transparent 50%);
                    -webkit-mask-image: radial-gradient(circle at 75% 50%, rgba(0,0,0,0.6) 0%, transparent 50%);
                }
                .fmcg-case-study .hero-inner {
                    display: grid;
                    grid-template-columns: 1.15fr 0.85fr;
                    gap: 60px;
                    align-items: center;
                    position: relative;
                    z-index: 1;
                }
                .fmcg-case-study .hero-meta {
                    display: grid;
                    grid-template-columns: repeat(4, auto);
                    gap: 0;
                    border-top: 1px solid var(--ln);
                    padding-top: 40px;
                    margin-top: 0;
                    width: fit-content;
                }
                .fmcg-case-study .hm {
                    padding: 0 40px 0 0;
                    border-right: 1px solid var(--ln);
                    margin-right: 40px;
                }
                .fmcg-case-study .hm:last-child {
                    border-right: none;
                    margin-right: 0;
                    padding-right: 0;
                }
                .fmcg-case-study .hm-label {
                    font-family: var(--mono);
                    font-size: 10px;
                    color: var(--ink4);
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }
                .fmcg-case-study .hm-val {
                    font-size: 14px;
                    color: var(--ink2);
                    font-weight: 400;
                }
                
                .fmcg-case-study section { padding: 100px 0; }
                .fmcg-case-study section.alt { background: var(--off); border-top: 1px solid var(--ln); border-bottom: 1px solid var(--ln); }
                .fmcg-case-study .wide { width: 100%; }

                .fmcg-case-study .eyebrow { font-family: var(--mono); font-size: 12px; color: var(--brand); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
                .fmcg-case-study .eyebrow::after { content: ''; width: 24px; height: 1px; background: var(--brand-border); }
                .fmcg-case-study h2 { font-family: var(--sans); font-size: clamp(28px, 4vw, 46px); line-height: 1.1; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 18px; font-weight: 700; }
                .fmcg-case-study h2 em { font-style: italic; color: var(--ink4); font-weight: 600; }
                .fmcg-case-study .body-copy { font-size: 16px; color: var(--ink2); line-height: 1.9; font-weight: 300; max-width: 600px; }
                
                /* EXACT PREMIUM MATCH FOR CONTEXT */

                .fmcg-case-study .context-quote { border-left: 2px solid var(--brand); padding: 24px 28px; background: var(--w); border-radius: 0 12px 12px 0; font-family: var(--serif); font-size: 22px; color: var(--ink2); line-height: 1.5; margin: 32px 0; font-style: italic; }
                .fmcg-case-study .context-quote cite { display: block; font-family: var(--sans); font-size: 13px; font-style: normal; color: var(--ink4); margin-top: 12px; }

                .fmcg-case-study .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }

                .fmcg-case-study .stakeholders-list { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
                .fmcg-case-study .stakeholder-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 20px; transition: all .2s; }
                .fmcg-case-study .stakeholder-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.05); border-color: var(--ln2); }
                .fmcg-case-study .sh-role { font-family: var(--mono); font-size: 10px; color: var(--gm); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px; font-weight: 600; }
                .fmcg-case-study .sh-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; color: var(--ink); }
                .fmcg-case-study .sh-desc { font-size: 13px; color: var(--ink3); line-height: 1.6; }

                .fmcg-case-study .problem-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--ln); border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 40px; }
                .fmcg-case-study .problem-cell { background: var(--w); padding: 28px; transition: background .2s; }
                .fmcg-case-study .problem-cell:hover { background: var(--off); }
                .fmcg-case-study .pc-number { font-family: var(--mono); font-size: 11px; color: var(--ink4); margin-bottom: 8px; letter-spacing: .06em; display: block; }
                .fmcg-case-study .pc-icon { font-size: 22px; margin-bottom: 14px; display: block; }
                .fmcg-case-study .pc-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; letter-spacing: -.01em; color: var(--ink); }
                .fmcg-case-study .pc-desc { font-size: 13px; color: var(--ink3); line-height: 1.6; margin: 0; }

                .fmcg-case-study .ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px; }
                .fmcg-case-study .ba-card { border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; }
                .fmcg-case-study .ba-head { padding: 12px 18px; border-bottom: 1px solid var(--ln); display: flex; align-items: center; gap: 9px; }
                .fmcg-case-study .ba-head.before { background: #fff7f7; }
                .fmcg-case-study .ba-head.after { background: #f5fbf6; }
                .fmcg-case-study .ba-dot { width: 7px; height: 7px; border-radius: 50%; }
                .fmcg-case-study .ba-head.before .ba-dot { background: var(--rm); }
                .fmcg-case-study .ba-head.after .ba-dot { background: var(--gm); }
                .fmcg-case-study .ba-lbl { font-family: var(--mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-weight: 500; }
                .fmcg-case-study .ba-head.before .ba-lbl { color: var(--rm); }
                .fmcg-case-study .ba-head.after .ba-lbl { color: var(--gdk); }
                .fmcg-case-study .ba-row { display: flex; gap: 11px; padding: 12px 18px; border-bottom: 1px solid var(--ln); font-size: 14px; color: var(--ink2); line-height: 1.65; font-weight: 300; }
                .fmcg-case-study .ba-row:last-child { border-bottom: none; }
                .fmcg-case-study .ba-mark { font-family: var(--mono); font-size: 12px; flex-shrink: 0; margin-top: 2px; }
                .fmcg-case-study .bm-bad { color: var(--rm); }
                .fmcg-case-study .bm-good { color: var(--gm); }

                .fmcg-case-study .hl { background: var(--brand-light); color: var(--brand); padding: 1px 6px; border-radius: 4px; font-size: 0.92em; font-weight: 500; }

                .fmcg-case-study .vis-impact { margin-top: 56px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
                .fmcg-case-study .vis-chart-wrap { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 32px; overflow: hidden; }
                .fmcg-case-study .vis-chart-title { font-family: var(--mono); font-size: 10px; color: var(--ink4); letter-spacing: .14em; text-transform: uppercase; margin-bottom: 28px; }
                .fmcg-case-study .vis-bars { display: flex; align-items: flex-end; gap: 16px; height: 140px; }
                .fmcg-case-study .vis-bar-group { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
                .fmcg-case-study .vis-bar { width: 100%; border-radius: 4px 4px 0 0; position: relative; cursor: default; transition: height 1.4s cubic-bezier(.16,1,.3,1); }
                .fmcg-case-study .vis-bar:hover { filter: brightness(1.08); }
                .fmcg-case-study .vis-bar-val { font-family: var(--serif); font-size: 14px; color: var(--ink); text-align: center; }
                .fmcg-case-study .vis-bar-lbl { font-family: var(--mono); font-size: 9px; color: var(--ink4); letter-spacing: .08em; text-align: center; text-transform: uppercase; }
                .fmcg-case-study .vis-axis { height: 1px; background: var(--ln); margin-top: 2px; width: 100%; }
                .fmcg-case-study .vis-comparison { display: flex; flex-direction: column; gap: 16px; }
                .fmcg-case-study .vis-comp-item { display: flex; flex-direction: column; gap: 6px; }
                .fmcg-case-study .vis-comp-label { display: flex; justify-content: space-between; align-items: center; }
                .fmcg-case-study .vis-comp-name { font-size: 13px; font-weight: 500; color: var(--ink); }
                .fmcg-case-study .vis-comp-vals { display: flex; gap: 8px; align-items: center; }
                .fmcg-case-study .vis-comp-before { font-family: var(--mono); font-size: 11px; color: var(--rm); text-decoration: line-through; opacity: .6; }
                .fmcg-case-study .vis-comp-after { font-family: var(--mono); font-size: 11px; color: var(--gm); font-weight: 600; }
                .fmcg-case-study .vis-comp-track { height: 8px; background: var(--off2); border-radius: 4px; overflow: hidden; position: relative; }
                .fmcg-case-study .vis-comp-fill { height: 100%; border-radius: 4px; }

                .fmcg-case-study .fade {
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity .6s ease, transform .6s ease;
                    will-change: opacity, transform;
                }
                .fmcg-case-study .fade.in {
                    opacity: 1;
                    transform: none;
                }
                .fmcg-case-study .d1 { transition-delay: .1s; }
                .fmcg-case-study .d2 { transition-delay: .2s; }
                .fmcg-case-study .d3 { transition-delay: .3s; }
                .fmcg-case-study .d4 { transition-delay: .4s; }
                
                .fmcg-case-study .hero-visual {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: 520px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .fmcg-case-study .structure-container {
                   position: relative;
                   width: 100%;
                   max-width: 580px;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   animation: float-arch 15s ease-in-out infinite;
                }
                @keyframes float-arch {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .fmcg-case-study .structure-svg {
                    width: 100%;
                    height: auto;
                    display: block;
                    overflow: visible;
                }

                .fmcg-case-study .journey-wrap {
                    margin-top: 48px;
                    padding: 0 20px;
                }
                .fmcg-case-study .journey-steps {
                    display: flex;
                    justify-content: space-between;
                    gap: 0;
                    position: relative;
                }
                .fmcg-case-study .journey-step {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    flex: 1;
                }
                .fmcg-case-study .journey-step::after {
                    content: '';
                    position: absolute;
                    top: 16px;
                    left: calc(50% + 16px);
                    width: calc(100% - 32px);
                    height: 1px;
                    background: var(--ln);
                    z-index: -1;
                }
                .fmcg-case-study .journey-step:last-child::after {
                    display: none;
                }
                .fmcg-case-study .step-circle {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--w);
                    border: 1px solid var(--ln2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                    font-family: var(--mono);
                    font-weight: 500;
                    color: var(--ink4);
                    margin-bottom: 12px;
                    transition: all .4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    z-index: 1;
                    flex-shrink: 0;
                }
                .fmcg-case-study .step-circle.done {
                    background: var(--w);
                    border-color: var(--gm);
                    color: var(--gm);
                }
                .fmcg-case-study .step-circle.active {
                    background: var(--brand);
                    border-color: var(--brand);
                    color: var(--w);
                    box-shadow: 0 0 0 4px var(--brand-light);
                    transform: scale(1.1);
                }
                .fmcg-case-study .step-label {
                    font-size: 11px;
                    font-weight: 600;
                    color: var(--ink);
                    text-align: center;
                    line-height: 1.3;
                    margin-bottom: 4px;
                    letter-spacing: -0.01em;
                }
                .fmcg-case-study .step-sub {
                    font-size: 10px;
                    color: var(--ink4);
                    text-align: center;
                    font-family: var(--mono);
                    letter-spacing: 0.02em;
                }

                .fmcg-case-study .journey-services {
                    margin-top: 40px;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 20px;
                }
                .fmcg-case-study .js-card {
                    background: var(--w);
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    padding: 24px;
                }
                .fmcg-case-study .js-card-title {
                    font-family: var(--mono);
                    font-size: 10px;
                    color: var(--gm);
                    letter-spacing: .12em;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                    font-weight: 600;
                }
                .fmcg-case-study .js-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    font-size: 13px;
                    color: var(--ink2);
                }
                .fmcg-case-study .js-list div {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                    line-height: 1.4;
                }
                .fmcg-case-study .js-list div::before {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: var(--brand);
                    flex-shrink: 0;
                    margin-top: 5px;
                }
                

                .fmcg-case-study .arch-diagram {
                    margin-top: 40px;
                }
                .fmcg-case-study .arch-layer {
                    margin-bottom: 2px;
                }
                .fmcg-case-study .arch-layer-row {
                    display: flex;
                    gap: 2px;
                }
                .fmcg-case-study .arch-layer-tag {
                    writing-mode: vertical-lr;
                    text-orientation: mixed;
                    font-family: var(--mono);
                    font-size: 10px;
                    letter-spacing: .14em;
                    text-transform: uppercase;
                    color: var(--ink4);
                    padding: 16px 10px;
                    background: var(--off);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 36px;
                    border: 1px solid var(--ln);
                    border-radius: 8px 0 0 8px;
                    font-weight: 400;
                }
                .fmcg-case-study .arch-modules {
                    display: flex;
                    flex: 1;
                    gap: 2px;
                }
                .fmcg-case-study .arch-mod {
                    flex: 1;
                    padding: 16px;
                    background: var(--w);
                    border: 1px solid var(--ln);
                    border-radius: 0 8px 8px 0;
                    transition: background .15s;
                }
                .fmcg-case-study .arch-mod:not(:first-child) {
                    border-radius: 8px;
                    border-left: 1px solid var(--ln);
                }
                .fmcg-case-study .arch-mod-name {
                    font-size: 13px;
                    font-weight: 600;
                    color: var(--ink);
                    margin-bottom: 3px;
                    letter-spacing: -.01em;
                    line-height: 1.35;
                }
                .fmcg-case-study .arch-mod-desc {
                    font-size: 11px;
                    color: var(--ink4);
                    line-height: 1.4;
                }
                .fmcg-case-study .arch-mod.hl {
                    background: var(--brand-light);
                    border-color: var(--brand-border);
                }
                .fmcg-case-study .arch-mod.hl .arch-mod-name {
                    color: var(--brand);
                }
                .fmcg-case-study .arch-connector {
                    height: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 36px;
                }
                .fmcg-case-study .arch-connector-line {
                    height: 16px;
                    width: 1px;
                    background: var(--ln2);
                    margin: 0 auto;
                }

                .fmcg-case-study .module-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-top: 40px;
                }
                .fmcg-case-study .module-card {
                    background: var(--w);
                    border: 1px solid var(--ln);
                    border-radius: 10px;
                    padding: 28px;
                    transition: all .2s;
                    cursor: default;
                }
                .fmcg-case-study .module-card:hover {
                    background: var(--off);
                    border-color: var(--ln2);
                }
                .fmcg-case-study .mc-icon {
                    width: 40px;
                    height: 40px;
                    background: var(--brand-light);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 16px;
                }
                .fmcg-case-study .mc-icon svg {
                    width: 18px;
                    height: 18px;
                    stroke: var(--brand);
                    fill: none;
                    stroke-width: 1.8;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }
                .fmcg-case-study .mc-title {
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    letter-spacing: -.01em;
                    color: var(--ink);
                }
                .fmcg-case-study .mc-desc {
                    font-size: 13px;
                    color: var(--ink3);
                    line-height: 1.6;
                    margin: 0 0 16px;
                }
                .fmcg-case-study .mc-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }
                .fmcg-case-study .mc-tag {
                    font-family: var(--mono);
                    font-size: 10px;
                    color: var(--brand);
                    background: var(--brand-light);
                    padding: 2px 8px;
                    border-radius: 4px;
                    letter-spacing: .04em;
                }

                .fmcg-case-study .service-matrix { margin-top: 40px; border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; }
                .fmcg-case-study .sm-header { display: grid; grid-template-columns: 200px repeat(4, 1fr); background: var(--off); border-bottom: 1px solid var(--ln); }
                .fmcg-case-study .sm-cell { padding: 14px 16px; font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink4); font-weight: 500; }
                .fmcg-case-study .sm-row { display: grid; grid-template-columns: 200px repeat(4, 1fr); border-bottom: 1px solid var(--ln); }
                .fmcg-case-study .sm-row:last-child { border-bottom: none; }
                .fmcg-case-study .sm-service { padding: 14px 16px; font-size: 13px; font-weight: 500; color: var(--ink); border-right: 1px solid var(--ln); }
                .fmcg-case-study .sm-val { padding: 14px 16px; font-size: 12px; color: var(--ink3); display: flex; align-items: center; gap: 8px; border-right: 1px solid var(--ln); }
                .fmcg-case-study .sm-val:last-child { border-right: none; }
                .fmcg-case-study .sm-check { color: var(--gm); font-size: 14px; }
                .fmcg-case-study .sm-price { font-family: var(--mono); font-weight: 600; color: var(--brand); }

                .fmcg-case-study .metrics-visual { margin-top: 56px; }
                .fmcg-case-study .metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; align-items: start; }
                .fmcg-case-study .metric-ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; }
                .fmcg-case-study .metric-ring { position: relative; width: 120px; height: 120px; flex-shrink: 0; }
                .fmcg-case-study .metric-ring svg { transform: rotate(-90deg); }
                .fmcg-case-study .metric-ring-bg { stroke: var(--ln); fill: none; stroke-width: 6; }
                .fmcg-case-study .metric-ring-fill { fill: none; stroke-width: 6; stroke-linecap: round; transition: stroke-dasharray 1.6s cubic-bezier(.16, 1, .3, 1); }
                .fmcg-case-study .metric-ring-label { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
                .fmcg-case-study .metric-ring-val { font-size: 38px; color: var(--ink); line-height: 1; font-weight: 400; letter-spacing: -.02em; }
                .fmcg-case-study .metric-ring-unit { font-size: 13px; font-weight: 500; color: var(--brand); letter-spacing: 0; margin-top: 4px; }
                .fmcg-case-study .metric-ring-title { font-size: 13px; font-weight: 600; color: var(--ink); text-align: center; }
                .fmcg-case-study .metric-ring-desc { font-size: 12px; color: var(--ink4); text-align: center; line-height: 1.5; }


                .fmcg-case-study .g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; background: var(--w); border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 40px; }
                .fmcg-case-study .impact-stat { padding: 32px 26px; border-right: 1px solid var(--ln); }
                .fmcg-case-study .impact-stat:last-child { border-right: none; }
                .fmcg-case-study .stat-num { font-family: var(--sans); font-size: 46px; font-weight: 800; color: var(--ink); line-height: 1; letter-spacing: -.05em; margin-bottom: 5px; }
                .fmcg-case-study .stat-unit { font-family: var(--mono); font-size: 11px; color: var(--brand); letter-spacing: 0.08em; display: block; margin-bottom: 6px; font-weight: 500; text-transform: uppercase; }
                .fmcg-case-study .stat-desc { font-size: 14px; color: var(--ink3); line-height: 1.65; font-weight: 300; }

                .fmcg-case-study .tech-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 40px; }
                .fmcg-case-study .tech-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 24px; transition: background .2s, border-color .2s; }
                .fmcg-case-study .tech-card:hover { background: var(--off); border-color: var(--ln2); }
                .fmcg-case-study .tech-layer { font-family: var(--mono); font-size: 10px; color: var(--brand); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 10px; font-weight: 500; }
                .fmcg-case-study .tech-title { font-size: 15px; font-weight: 600; letter-spacing: -.01em; margin-bottom: 12px; color: var(--ink); }
                .fmcg-case-study .tech-items { display: flex; flex-direction: column; gap: 8px; }
                .fmcg-case-study .tech-item { font-size: 13px; font-weight: 300; color: var(--ink3); display: flex; align-items: flex-start; gap: 8px; line-height: 1.55; }
                .fmcg-case-study .tech-item::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--brand); flex-shrink: 0; display: block; margin-top: 6px; }
                @media(max-width:900px){ .fmcg-case-study .tech-grid { grid-template-columns: 1fr 1fr; gap: 16px; } }
                @media(max-width:600px){ .fmcg-case-study .tech-grid { grid-template-columns: 1fr; } }

                .fmcg-case-study .learning-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
                .fmcg-case-study .learning-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 28px; display: flex; gap: 18px; transition: all .2s; }
                .fmcg-case-study .learning-card:hover { background: var(--off); border-color: var(--ln2); }
                .fmcg-case-study .lc-num { font-size: 38px; font-weight: 800; color: var(--ln2); line-height: 1; flex-shrink: 0; min-width: 46px; letter-spacing: -.04em; }
                .fmcg-case-study .lc-cat { font-family: var(--mono); font-size: 9px; color: var(--brand); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 6px; }
                .fmcg-case-study .lc-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; letter-spacing: -.01em; }
                .fmcg-case-study .lc-body { font-size: 13px; font-weight: 300; color: var(--ink3); line-height: 1.7; margin-bottom: 10px; }
                .fmcg-case-study .lc-rule { font-family: var(--mono); font-size: 10px; color: var(--gm); background: var(--gbg); padding: 5px 10px; border-radius: 4px; letter-spacing: .04em; }

                /* RESULTS BAND CSS */
                .fmcg-case-study .results-band { background: var(--w); color: var(--ink); padding: 100px 0; margin: 0; border-top: 1px solid var(--ln); border-bottom: 1px solid var(--ln); }
                .fmcg-case-study .results-band h2 { color: var(--ink); }
                .fmcg-case-study .results-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--ln); border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 60px; }
                .fmcg-case-study .result-cell { background: var(--w); padding: 32px 28px; transition: background .2s; position: relative; overflow: hidden; }
                .fmcg-case-study .result-cell::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--brand), transparent); opacity: 0; transition: opacity .3s; }
                .fmcg-case-study .result-cell:hover { background: var(--off); }
                .fmcg-case-study .result-cell:hover::after { opacity: 1; }
                .fmcg-case-study .result-num { font-size: 52px; color: var(--ink); line-height: 1; margin-bottom: 6px; letter-spacing: -0.02em; font-weight: 500; }
                .fmcg-case-study .result-num span { color: var(--brand); font-weight: 400; }
                .fmcg-case-study .result-label { font-size: 14px; color: var(--ink3); line-height: 1.4; font-weight: 500; }
                .fmcg-case-study .result-note { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--brand); margin-top: 6px; letter-spacing: .08em; text-transform: uppercase; }

                /* BROADER CONTEXT CSS */
                .fmcg-case-study .context-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
                .fmcg-case-study .ctx-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 24px; transition: all .2s; }
                .fmcg-case-study .ctx-card:hover { background: var(--off); border-color: var(--ln2); }
                .fmcg-case-study .ctx-icon { font-size: 24px; margin-bottom: 12px; display: block; }
                .fmcg-case-study .ctx-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; letter-spacing: -.01em; color: var(--ink); }
                .fmcg-case-study .ctx-body { font-size: 13px; font-weight: 300; color: var(--ink3); line-height: 1.65; margin: 0; }

                /* ROADMAP CSS */
                .fmcg-case-study .roadmap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
                .fmcg-case-study .rm-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 28px; position: relative; transition: all .2s; }
                .fmcg-case-study .rm-card:not(.current):hover { background: var(--off); border-color: var(--ln2); }
                .fmcg-case-study .rm-card.current { border-color: var(--brand-border); background: var(--brand-light); }
                .fmcg-case-study .rm-badge { position: absolute; top: 20px; right: 20px; font-family: 'JetBrains Mono', monospace; font-size: 9px; padding: 3px 9px; border-radius: 10px; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; }
                .fmcg-case-study .rm-badge.shipped { background: var(--gbg); color: var(--gm); }
                .fmcg-case-study .rm-badge.active { background: var(--brand); color: #fff; }
                .fmcg-case-study .rm-badge.planned { background: var(--off2); color: var(--ink3); }
                .fmcg-case-study .rm-phase { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--ink4); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 10px; font-weight: 500; }
                .fmcg-case-study .rm-title { font-size: 17px; font-weight: 600; letter-spacing: -.02em; margin-bottom: 14px; color: var(--ink); line-height: 1.3; }
                .fmcg-case-study .rm-items { display: flex; flex-direction: column; gap: 8px; }
                .fmcg-case-study .rm-item { font-size: 13px; font-weight: 300; color: var(--ink3); display: flex; align-items: flex-start; gap: 8px; line-height: 1.5; }
                .fmcg-case-study .rm-card.current .rm-item { color: var(--ink2); }
                .fmcg-case-study .rm-item::before { content: '→'; color: var(--brand); flex-shrink: 0; font-size: 12px; margin-top: 1px; font-weight: 600; }
                
                @media(max-width:900px){
                    .fmcg-case-study section { padding: 80px 0; }
                    .fmcg-case-study .two-col { grid-template-columns: 1fr; gap: 40px; }
                    .fmcg-case-study .g4 { grid-template-columns: 1fr; }
                    .fmcg-case-study .alerts { grid-template-columns: 1fr; }
                    .fmcg-case-study .impact-stat { border-right: none; border-bottom: 1px solid var(--ln); }
                    .fmcg-case-study .impact-stat:last-child { border-bottom: none; }
                    .fmcg-case-study .problem-grid, .fmcg-case-study .ba-grid, .fmcg-case-study .vis-impact, .fmcg-case-study .journey-services { grid-template-columns: 1fr; gap: 32px; }
                    .fmcg-case-study .journey-steps { overflow-x: auto; padding-bottom: 32px; gap: 32px; justify-content: flex-start; }
                    .fmcg-case-study .journey-steps::before { right: -300px; }
                    .fmcg-case-study .journey-step { min-width: 100px; flex: none; }
                    .fmcg-case-study .module-grid { grid-template-columns: 1fr 1fr; }
                    .fmcg-case-study .sm-header, .fmcg-case-study .sm-row { grid-template-columns: 140px repeat(2, 1fr); }
                    .fmcg-case-study .metrics-row { grid-template-columns: 1fr 1fr; }
                    .fmcg-case-study .results-grid { grid-template-columns: 1fr 1fr; }
                    .fmcg-case-study .tech-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
                    .fmcg-case-study .learning-grid { grid-template-columns: 1fr 1fr; }
                    .fmcg-case-study .roadmap-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .context-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study h1 { font-size: clamp(38px, 10vw, 60px); }
                    .fmcg-case-study .hero-meta { grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; border-top: none; padding-top: 0; }
                    .fmcg-case-study .hm { border-right: none; margin-right: 0; padding-right: 0; border-bottom: 1px solid var(--ln); padding-bottom: 14px; }
                    .fmcg-case-study .hero-inner { grid-template-columns: 1fr; gap: 48px; }
                    .fmcg-case-study #hero { padding: 100px 0 60px; min-height: auto; }
                    .fmcg-case-study .hero-visual { min-height: 400px; }
                }
                @media(max-width:600px){
                    .fmcg-case-study .tech-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .learning-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .module-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .metrics-row { grid-template-columns: 1fr; }
                    .fmcg-case-study .results-grid { grid-template-columns: 1fr; }
                    .fmcg-case-study .sm-header, .fmcg-case-study .sm-row { grid-template-columns: 1fr; }
                }
                
                @keyframes patient-anim {
                    0%, 15% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
                    40%, 60% { transform: translateY(-120px) translateX(40px) scale(0.9); opacity: 0; }
                    70% { transform: translateY(-40px) translateX(0) scale(0.95); opacity: 0; }
                    85%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
                }
                .fmcg-case-study .patient-cube {
                    animation: patient-anim 6s cubic-bezier(0.25, 1, 0.5, 1) infinite;
                }
            `}</style>

            <section id="hero">
                <div className="hero-grid"></div>
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="hero-inner">
                        <div className="hero-content">
                            <h1 className="fade d2">
                                Medical Operations<br />Control <em>System</em>
                            </h1>
                            <p className="lead fade d3">
                                How Cikitsa International rebuilt its cross-border healthcare infrastructure — replacing fragmented Google Sheets with a unified, real-time operations platform managing 2,100+ patient journeys from Bangladesh to India annually.
                            </p>
                            
                            <div className="hero-meta fade d4">
                                <div className="hm">
                                    <div className="hm-label">Industry</div>
                                    <div className="hm-val">Medical Tourism</div>
                                </div>
                                <div className="hm">
                                    <div className="hm-label">Location</div>
                                    <div className="hm-val">Dhaka, Bangladesh</div>
                                </div>
                                <div className="hm">
                                    <div className="hm-label">Timeline</div>
                                    <div className="hm-val">2022 – 2025</div>
                                </div>
                                <div className="hm">
                                    <div className="hm-label">Scale</div>
                                    <div className="hm-val">2,110+ Cases</div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual fade d3">
                            <motion.div className="structure-container" style={{ y: heroY }}>
                                {(() => {
                                    const s = 40;
                                    const dx = s * 0.866;
                                    const dy = s * 0.5;
                                    const iso = (c: number, r: number, h: number) => ({
                                        x: c * dx - r * dx,
                                        y: c * dy + r * dy - h * s
                                    });

                                    const cubes = [
                                        // Foundation Layer (Healthcare network)
                                        {c:0,r:0,h:0}, {c:1,r:0,h:0}, {c:2,r:0,h:0},
                                        {c:0,r:1,h:0}, {c:1,r:1,h:0}, {c:2,r:1,h:0},
                                        
                                        // Patient Coordination Layer
                                        {c:0,r:0,h:1}, {c:1,r:0,h:1},
                                        {c:0,r:1,h:1}, {c:1,r:1,h:1},
                                        
                                        // Central Control Layer
                                        {c:0,r:0,h:2}
                                    ];
                                    cubes.sort((a,b) => (a.h * 100 + a.r + a.c) - (b.h * 100 + b.r + b.c));

                                    const m = 0.5;
                                    const t = 12; // thickness
                                    const p0 = iso(-m, -m, -0.2);
                                    const p1 = iso(3+m, -m, -0.2);
                                    const p2 = iso(3+m, 3+m, -0.2);
                                    const p3 = iso(-m, 3+m, -0.2);

                                    return (
                                        <svg viewBox="0 0 500 440" className="structure-svg" aria-hidden="true">
                                            <defs>
                                                <linearGradient id="topGlowMocs" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                                                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                                                </linearGradient>
                                                <filter id="shadowMocs" x="-20%" y="-20%" width="140%" height="140%">
                                                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.08" />
                                                </filter>
                                            </defs>
                                            
                                            <g transform="translate(250, 260)">
                                                {/* Base Platform */}
                                                <polygon points={`${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`} fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
                                                <polygon points={`${p3.x},${p3.y} ${p2.x},${p2.y} ${p2.x},${p2.y+t} ${p3.x},${p3.y+t}`} fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5" />
                                                <polygon points={`${p2.x},${p2.y} ${p1.x},${p1.y} ${p1.x},${p1.y+t} ${p2.x},${p2.y+t}`} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                                                
                                                {/* Static Structure */}
                                                {cubes.map((cube, i) => {
                                                    const p = iso(cube.c, cube.r, cube.h);
                                                    return (
                                                        <g key={i} transform={`translate(${p.x}, ${p.y})`}>
                                                            <polygon points={`0,${-s} ${dx},${-dy} 0,0 ${-dx},${-dy}`} fill="rgba(79, 70, 229, 0.25)" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
                                                            <polygon points={`${-dx},${-dy} 0,0 0,${s} ${-dx},${dy}`} fill="rgba(79, 70, 229, 0.45)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
                                                            <polygon points={`0,0 ${dx},${-dy} ${dx},${dy} 0,${s}`} fill="rgba(49, 46, 129, 0.65)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
                                                            <polygon points={`0,${-s} ${dx},${-dy} 0,0 ${-dx},${-dy}`} fill="url(#topGlowMocs)" opacity="0.6"/>
                                                        </g>
                                                    );
                                                })}

                                                {/* UI Tag 3: Finance Engine */}
                                                <g className="ui-overlay" transform={`translate(${p2.x}, ${p2.y})`}>
                                                    <circle cx="0" cy="0" r="2" fill="var(--brand)" />
                                                    <path d="M 0 0 L 0 30 L -20 30" fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.5" />
                                                    <rect x="-116" y="21" width="92" height="18" rx="2" fill="rgba(255,255,255,0.9)" stroke="var(--ln)" filter="url(#shadowMocs)" />
                                                    <circle cx="-108" cy="30" r="3.5" fill="var(--brand)" />
                                                    <text x="-98" y="33" fontSize="8" fontFamily="var(--mono)" letterSpacing="0.05em" fill="var(--ink2)" fontWeight="600">FINANCE ENGINE</text>
                                                </g>

                                                {/* UI Tag 2: Visa Kanban */}
                                                {(() => {
                                                    const mid = iso(0, 1, 1);
                                                    return (
                                                        <g className="ui-overlay" transform={`translate(${mid.x}, ${mid.y - s})`}>
                                                            <circle cx="0" cy="0" r="2" fill="var(--brand)" />
                                                            <path d="M 0 0 L -30 0 L -30 20" fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.5" />
                                                            <rect x="-82" y="20" width="82" height="18" rx="2" fill="rgba(255,255,255,0.9)" stroke="var(--ln)" filter="url(#shadowMocs)" />
                                                            <circle cx="-74" cy="29" r="3.5" fill="var(--brand)" />
                                                            <text x="-64" y="32" fontSize="8" fontFamily="var(--mono)" letterSpacing="0.05em" fill="var(--ink2)" fontWeight="600">VISA KANBAN</text>
                                                        </g>
                                                    );
                                                })()}

                                                {/* UI Tag 1: Live Ops Dashboard */}
                                                {(() => {
                                                    const top = iso(0, 0, 2);
                                                    return (
                                                        <g className="ui-overlay" transform={`translate(${top.x}, ${top.y - s})`}>
                                                            <circle cx="0" cy="0" r="2" fill="var(--brand)" />
                                                            <path d="M 0 0 L 0 -30 L -20 -30" fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.5" />
                                                            <rect x="-136" y="-39" width="112" height="18" rx="2" fill="rgba(255,255,255,0.9)" stroke="var(--ln)" filter="url(#shadowMocs)" />
                                                            <circle cx="-128" cy="-30" r="3.5" fill="var(--brand)" />
                                                            <text x="-118" y="-27" fontSize="8" fontFamily="var(--mono)" letterSpacing="0.05em" fill="var(--ink2)" fontWeight="600">LIVE OPS DASHBOARD</text>
                                                        </g>
                                                    );
                                                })()}

                                                {/* Moving 'Patient Data' Cube */}
                                                <g className="patient-cube">
                                                    {(() => {
                                                        const p = iso(2, 2, 0); // Start layer 0
                                                        return (
                                                            <g transform={`translate(${p.x}, ${p.y})`}>
                                                                <polygon points={`0,${-s} ${dx},${-dy} 0,0 ${-dx},${-dy}`} fill="rgba(99, 102, 241, 0.4)" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="0.8" />
                                                                <polygon points={`${-dx},${-dy} 0,0 0,${s} ${-dx},${dy}`} fill="rgba(79, 70, 229, 0.6)" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
                                                                <polygon points={`0,0 ${dx},${-dy} ${dx},${dy} 0,${s}`} fill="rgba(49, 46, 129, 0.85)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
                                                                <polygon points={`0,${-s} ${dx},${-dy} 0,0 ${-dx},${-dy}`} fill="url(#topGlowMocs)" opacity="0.9"/>
                                                                
                                                                {/* UI Tag 4: Patient File */}
                                                                <g className="ui-overlay">
                                                                    <circle cx="0" cy={-s} r="2" fill="var(--brand)" />
                                                                    <path d={`M 0 ${-s} L 0 ${-s - 30} L 20 ${-s - 30}`} fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.5" />
                                                                    <rect x="24" y={-s - 39} width="92" height="18" rx="2" fill="rgba(255,255,255,0.9)" stroke="var(--ln)" filter="url(#shadowMocs)" />
                                                                    <circle cx="32" cy={-s - 30} r="3.5" fill="#10B981" />
                                                                    <text x="40" y={-s - 27} fontSize="8" fontFamily="var(--mono)" letterSpacing="0.05em" fill="var(--ink2)" fontWeight="600">PATIENT PIPELINE</text>
                                                                </g>
                                                            </g>
                                                        );
                                                    })()}
                                                </g>
                                            </g>
                                        </svg>
                                    );
                                })()}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="context" className="alt">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="eyebrow">01 — Context</div>
                    <div className="two-col">
                        <div className="fade d1">
                            <h2>Medical tourism from Bangladesh to India isn't just complex — it's a massive <em>coordination problem</em></h2>
                            <p className="body-copy">Every year, tens of thousands of Bangladeshi patients travel to India seeking treatment at Apollo, Manipal, Fortis, and other leading hospital chains. The journey involves visa procurement, hospital appointment booking, interpreter services, airport logistics, and ongoing treatment tracking.</p>
                            <p className="body-copy">Cikitsa International acts as the patient-side operations bridge — not a hospital, not a travel agency, but a specialist coordination layer between Bangladeshi patients (and their local travel agents) and the Indian healthcare system.</p>
                            <p className="body-copy">By 2022, the operation was processing hundreds of patients annually with no unified system. Case data lived across personal WhatsApp threads, spreadsheet columns, and agent contacts' memories. Critical information — passport numbers, visa statuses, treatment stages — was routinely lost or duplicated.</p>
                            
                            <div className="context-quote">
                                "The follow-up notes were buried in a single cell. The finance team couldn't see commission rates. There was no way to know which visa was pending without scrolling through 2,000 rows."
                                <cite>— Internal operational debrief, 2022</cite>
                            </div>
                            
                            <p className="body-copy">MOCS was conceived not as a software project, but as a <span className="hl">operational redesign</span> — the software is the artifact of that redesign.</p>
                        </div>
                        
                        <div className="fade d2">
                            <div className="eyebrow" style={{ marginTop: 0 }}>Key Stakeholders</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                                <div className="stakeholder-card">
                                    <div className="sh-role">Patients</div>
                                    <div className="sh-title">Bangladeshi Medical Travelers</div>
                                    <div className="sh-desc">Seeking treatment at Indian hospitals. Often unfamiliar with processes. Need visa, appointment, logistics, and translation support.</div>
                                </div>
                                <div className="stakeholder-card">
                                    <div className="sh-role">Agents</div>
                                    <div className="sh-title">Travel & Medical Agents (BD-side)</div>
                                    <div className="sh-desc">Companies like SADIA TOURS, INDIA TOURS, KAMAL TRAVEL — intermediaries who bring patients to Cikitsa in exchange for commission on referred services.</div>
                                </div>
                                <div className="stakeholder-card">
                                    <div className="sh-role">Partners</div>
                                    <div className="sh-title">Indian Hospital Networks</div>
                                    <div className="sh-desc">Apollo, Manipal, Fortis, Max, Artemis, Aster, and others — pay Cikitsa OP/IP commissions ranging from 5% to 24% depending on hospital and service category.</div>
                                </div>
                                <div className="stakeholder-card">
                                    <div className="sh-role">Operations Team</div>
                                    <div className="sh-title">Cikitsa Coordinators</div>
                                    <div className="sh-desc">Sayem, Atiq, Jafor, Dihan, Shela — each handling patient sub-portfolios across hospitals, tracking visa pipeline, treatment status, and follow-ups.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="problem">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide fade">
                        <div className="eyebrow">02 — Problem Space</div>
                        <h2>Six operational failures<br/>happening <em>simultaneously</em></h2>
                        <p className="body-copy">Before MOCS, the coordination failures weren't just inconveniences — they caused measurable patient harm, agent churn, and revenue leakage at every touchpoint of the journey.</p>
                        
                        <div className="problem-grid">
                            <div className="problem-cell">
                                <span className="pc-number">01</span>
                                <div className="pc-title">No Single Source of Truth</div>
                                <p className="pc-desc">Patient data lived across Google Sheets, WhatsApp groups, and email chains. Visa status for the same patient could be "pending" in one place and "approved" in another.</p>
                            </div>
                            <div className="problem-cell">
                                <span className="pc-number">02</span>
                                <div className="pc-title">Visa Pipeline Blindness</div>
                                <p className="pc-desc">The VIL (Visa Invitation Letter) process — from application to approval to travel — had no formal tracking. Teams discovered expired visas only when patients called confused.</p>
                            </div>
                            <div className="problem-cell">
                                <span className="pc-number">03</span>
                                <div className="pc-title">Commission Leakage</div>
                                <p className="pc-desc">Hospital commission rates (5–24% OP/IP) were undocumented. Coordinators used different rates for the same hospital across interactions, causing under-billing and agent disputes.</p>
                            </div>
                            <div className="problem-cell">
                                <span className="pc-number">04</span>
                                <div className="pc-title">Follow-up Chaos</div>
                                <p className="pc-desc">Treatment follow-ups were tracked as free-text remarks ("will go some days later", "not rcv"). No structured reminder system existed — critical callbacks fell through the cracks.</p>
                            </div>
                            <div className="problem-cell">
                                <span className="pc-number">05</span>
                                <div className="pc-title">Hospital Rate Fragmentation</div>
                                <p className="pc-desc">Each of 7 hospital chains had unique service structures — VIL fees, telemedicine rates, pickup charges, transplant packages. No unified view existed for accurate quoting.</p>
                            </div>
                            <div className="problem-cell">
                                <span className="pc-number">06</span>
                                <div className="pc-title">Agent Accountability Gap</div>
                                <p className="pc-desc">30+ travel agents referred patients with no systematic tracking of which agent brought which patient, making commission reconciliation impossible and accountability nonexistent.</p>
                            </div>
                        </div>

                        <div className="ba-grid fade" style={{ marginTop: 48 }}>
                            <div className="ba-card">
                                <div className="ba-head before"><div className="ba-dot"></div><div className="ba-lbl">Before — Spreadsheets</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Patient status</strong> — tracked in mixed-language WhatsApp notes. No unified record, no history.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Visa pipeline</strong> — invisible. Failures discovered reactively after applications expired.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Service pricing</strong> — coordinator-dependent quoting. No standard rate reference, disputes routine.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Follow-ups</strong> — written as free text with no dates or reminders. Operationally dead.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Agent commissions</strong> — reconciled manually at month-end. 4–6 disputes every month.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Coordinator onboarding</strong> — 3–4 weeks to get up to speed, no documented system.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Hospital rates</strong> — coverage unknown. No comparative rate view across chains or cities.</div></div>
                            </div>
                            <div className="ba-card">
                                <div className="ba-head after"><div className="ba-dot"></div><div className="ba-lbl">After — MOCS</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Patient status</strong> — unified record with structured fields, status taxonomy, and full history.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Visa pipeline</strong> — Kanban view with stage tracking, date-stamped history, and proactive alerts.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Service pricing</strong> — centralized rate matrix for 7 hospital chains across 30+ cities.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Follow-ups</strong> — structured log with date, outcome, and next action. Queryable history.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Agent commissions</strong> — agent attribution on every record. Auto-reconciled. Zero disputes.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Coordinator onboarding</strong> — operational in under 1 day with a guided, documented system.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Hospital rates</strong> — cross-hospital rate comparison at a glance for accurate quoting.</div></div>
                            </div>
                        </div>

                        <div className="vis-impact fade d3">
                            <div className="vis-chart-wrap">
                                <div className="vis-chart-title">Case Volume Growth · 2022 → 2025</div>
                                <div className="vis-bars">
                                    <div className="vis-bar-group">
                                        <div className="vis-bar-val">~600</div>
                                        <div className="vis-bar" style={{ height: 34, background: 'var(--ln)' }}></div>
                                        <div className="vis-bar-lbl">2022</div>
                                    </div>
                                    <div className="vis-bar-group">
                                        <div className="vis-bar-val">~1,100</div>
                                        <div className="vis-bar" style={{ height: 62, background: 'var(--ln2)' }}></div>
                                        <div className="vis-bar-lbl">2023</div>
                                    </div>
                                    <div className="vis-bar-group">
                                        <div className="vis-bar-val">~1,700</div>
                                        <div className="vis-bar" style={{ height: 96, background: 'var(--brand-border)' }}></div>
                                        <div className="vis-bar-lbl">2024</div>
                                    </div>
                                    <div className="vis-bar-group">
                                        <div className="vis-bar-val" style={{ color: 'var(--brand)', fontWeight: 600 }}>2,110+</div>
                                        <div className="vis-bar" style={{ height: 126, background: 'var(--brand)' }}></div>
                                        <div className="vis-bar-lbl" style={{ color: 'var(--brand)' }}>2025</div>
                                    </div>
                                </div>
                                <div className="vis-axis"></div>
                            </div>
                            <div className="vis-comparison">
                                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>Key Metric Improvements</div>
                                <div className="vis-comp-item">
                                    <div className="vis-comp-label">
                                        <span className="vis-comp-name">Visa Success Rate</span>
                                        <div className="vis-comp-vals"><span className="vis-comp-before">~78%</span><span className="vis-comp-after">97%</span></div>
                                    </div>
                                    <div className="vis-comp-track"><div className="vis-comp-fill" style={{ width: '97%', background: 'var(--brand)' }}></div></div>
                                </div>
                                <div className="vis-comp-item">
                                    <div className="vis-comp-label">
                                        <span className="vis-comp-name">Commission Disputes / Month</span>
                                        <div className="vis-comp-vals"><span className="vis-comp-before">4–6</span><span className="vis-comp-after">0</span></div>
                                    </div>
                                    <div className="vis-comp-track"><div className="vis-comp-fill" style={{ width: '2%', background: 'var(--brand)' }}></div></div>
                                </div>
                                <div className="vis-comp-item">
                                    <div className="vis-comp-label">
                                        <span className="vis-comp-name">Coordinator Onboarding</span>
                                        <div className="vis-comp-vals"><span className="vis-comp-before">3–4 wks</span><span className="vis-comp-after">&lt;1 day</span></div>
                                    </div>
                                    <div className="vis-comp-track"><div className="vis-comp-fill" style={{ width: '96%', background: 'var(--brand)' }}></div></div>
                                </div>
                                <div className="vis-comp-item">
                                    <div className="vis-comp-label">
                                        <span className="vis-comp-name">Rate Quoting Accuracy</span>
                                        <div className="vis-comp-vals"><span className="vis-comp-before">~60%</span><span className="vis-comp-after">100%</span></div>
                                    </div>
                                    <div className="vis-comp-track"><div className="vis-comp-fill" style={{ width: '100%', background: 'var(--brand)' }}></div></div>
                                </div>
                                <div className="vis-comp-item">
                                    <div className="vis-comp-label">
                                        <span className="vis-comp-name">Case Volume Growth</span>
                                        <div className="vis-comp-vals"><span className="vis-comp-before">baseline</span><span className="vis-comp-after">+340%</span></div>
                                    </div>
                                    <div className="vis-comp-track"><div className="vis-comp-fill" style={{ width: '80%', background: 'var(--brand)' }}></div></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="journey" className="alt">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide fade">
                        <div className="eyebrow">03 — Patient Journey</div>
                        <h2>Seven stages from <em>first contact</em><br/>to treatment completion</h2>
                        <p className="body-copy">MOCS maps every patient interaction to a discrete, trackable stage. Understanding the full journey was the foundation of the system design — each stage became a data entity.</p>
                        
                        <div className="journey-wrap fade d2">
                            <div className="journey-steps">
                                <div className="journey-step">
                                    <div className="step-circle done">1</div>
                                    <div className="step-label">Lead Intake</div>
                                    <div className="step-sub">Agent/direct</div>
                                </div>
                                <div className="journey-step">
                                    <div className="step-circle done">2</div>
                                    <div className="step-label">Medical Review</div>
                                    <div className="step-sub">Report analysis</div>
                                </div>
                                <div className="journey-step">
                                    <div className="step-circle done">3</div>
                                    <div className="step-label">VIL Issuance</div>
                                    <div className="step-sub">৳149 service</div>
                                </div>
                                <div className="journey-step">
                                    <div className="step-circle active">4</div>
                                    <div className="step-label">Visa Applied</div>
                                    <div className="step-sub">IVAC tracking</div>
                                </div>
                                <div className="journey-step">
                                    <div className="step-circle">5</div>
                                    <div className="step-label">Visa Approved</div>
                                    <div className="step-sub">→ travel ready</div>
                                </div>
                                <div className="journey-step">
                                    <div className="step-circle">6</div>
                                    <div className="step-label">Under Treatment</div>
                                    <div className="step-sub">OPD / IPD</div>
                                </div>
                                <div className="journey-step">
                                    <div className="step-circle">7</div>
                                    <div className="step-label">Treatment Done</div>
                                    <div className="step-sub">Commission filed</div>
                                </div>
                            </div>

                            <div className="journey-services fade d3">
                                <div className="js-card">
                                    <div className="js-card-title">Pre-Travel Services</div>
                                    <div className="js-list">
                                        <div>Visa Invitation Letter (VIL)</div>
                                        <div>Doctor Appointment Booking</div>
                                        <div>Report Review</div>
                                        <div>Telemedicine Consultation</div>
                                        <div>Cost Estimation</div>
                                        <div>Expert Advisory Call</div>
                                    </div>
                                </div>
                                <div className="js-card">
                                    <div className="js-card-title">At-Hospital Services</div>
                                    <div className="js-list">
                                        <div>Airport Pickup &amp; Drop</div>
                                        <div>Hospital Guide (Medical Expert)</div>
                                        <div>Local City Guide (Non-medical)</div>
                                        <div>Railway Station Pickup</div>
                                        <div>FRRO Assistance (visa extension)</div>
                                        <div>On-ground coordination</div>
                                    </div>
                                </div>
                                <div className="js-card">
                                    <div className="js-card-title">Specialty Packages</div>
                                    <div className="js-list">
                                        <div>Liver Transplant (23–27L INR)</div>
                                        <div>Kidney Transplant (14–18L INR)</div>
                                        <div>IVF – First Cycle (₹3.95L)</div>
                                        <div>OP Commission (5–24% by hosp.)</div>
                                        <div>IP Commission (5–24% by hosp.)</div>
                                        <div>Pharmacy & Lab Commission</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="system">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide fade">
                        <div className="eyebrow">04 — System Architecture</div>
                        <h2>Three layers, <em>one coherent</em><br/>operational picture</h2>
                        <p className="body-copy">MOCS is architected around the three distinct operational domains that define Cikitsa's business — Patient Lifecycle, Visa Operations, and Financial Engine — each feeding into a unified control dashboard.</p>
                        
                        <div className="arch-diagram fade d2">
                            <div className="arch-layer">
                                <div className="arch-layer-row">
                                    <div className="arch-layer-tag">Interface</div>
                                    <div className="arch-modules">
                                        <div className="arch-mod hl">
                                            <div className="arch-mod-name">Ops Dashboard</div>
                                            <div className="arch-mod-desc">Real-time KPIs · Recent activity · Alerts · Team workload</div>
                                        </div>
                                        <div className="arch-mod hl">
                                            <div className="arch-mod-name">Patient Tracker</div>
                                            <div className="arch-mod-desc">Full patient registry · Search/filter · Status management · Follow-up log</div>
                                        </div>
                                        <div className="arch-mod hl">
                                            <div className="arch-mod-name">Visa Pipeline</div>
                                            <div className="arch-mod-desc">Kanban view · Stage transitions · Date tracking · IVAC status</div>
                                        </div>
                                        <div className="arch-mod hl">
                                            <div className="arch-mod-name">Finance Engine</div>
                                            <div className="arch-mod-desc">Rate matrix · Commission calc · Agent ledger · Revenue tracking</div>
                                        </div>
                                        <div className="arch-mod hl">
                                            <div className="arch-mod-name">Hospital Network</div>
                                            <div className="arch-mod-desc">Partner hospital profiles · City coverage · Service availability</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="arch-connector"><div className="arch-connector-line"></div></div>
                            <div className="arch-layer">
                                <div className="arch-layer-row">
                                    <div className="arch-layer-tag">Core Logic</div>
                                    <div className="arch-modules">
                                        <div className="arch-mod">
                                            <div className="arch-mod-name">Patient State Machine</div>
                                            <div className="arch-mod-desc">Lead → VIL → Visa Applied → Approved → Travelling → Treatment → Done</div>
                                        </div>
                                        <div className="arch-mod">
                                            <div className="arch-mod-name">Service Pricing Engine</div>
                                            <div className="arch-mod-desc">Per-hospital rate rules · AIT/VAT/SSL layering · CI vs Agent split · MRP vs final</div>
                                        </div>
                                        <div className="arch-mod">
                                            <div className="arch-mod-name">Agent Attribution</div>
                                            <div className="arch-mod-desc">Agent → patient linking · Company tracking · Commission entitlement</div>
                                        </div>
                                        <div className="arch-mod">
                                            <div className="arch-mod-name">Follow-up Engine</div>
                                            <div className="arch-mod-desc">Date-stamped log entries · Status change triggers · Coordinator assignment</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="arch-connector"><div className="arch-connector-line"></div></div>
                            <div className="arch-layer">
                                <div className="arch-layer-row">
                                    <div className="arch-layer-tag">Data</div>
                                    <div className="arch-modules">
                                        <div className="arch-mod">
                                            <div className="arch-mod-name">Patient Registry</div>
                                            <div className="arch-mod-desc">2,110+ records · Passport · Contact · Hospital · Dept · Type · Handler</div>
                                        </div>
                                        <div className="arch-mod">
                                            <div className="arch-mod-name">Hospital Rate Table</div>
                                            <div className="arch-mod-desc">7 chains · 30+ cities · 15+ service types · BDT/INR conversion</div>
                                        </div>
                                        <div className="arch-mod">
                                            <div className="arch-mod-name">Visa Invitation List</div>
                                            <div className="arch-mod-desc">Active VIL applications · Call log · Remarks · Responsible coordinator</div>
                                        </div>
                                        <div className="arch-mod">
                                            <div className="arch-mod-name">Agent Directory</div>
                                            <div className="arch-mod-desc">30+ agent companies · Contact linkage · Referral history</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide fade">
                        <div className="eyebrow">05 — Service Model</div>
                        <h2>A <em>tiered service architecture</em><br/>across every touchpoint</h2>
                        <p className="body-copy">Cikitsa's revenue model is built on service fees and hospital commissions. MOCS encodes the full pricing matrix — from ৳149 VIL letters to 24% IPD commissions — ensuring every coordinator quotes accurately.</p>
                        
                        <div className="service-matrix fade d2">
                            <div className="sm-header">
                                <div className="sm-cell">Service</div>
                                <div className="sm-cell">Apollo Chennai</div>
                                <div className="sm-cell">Manipal Bangalore</div>
                                <div className="sm-cell">Fortis Delhi</div>
                                <div className="sm-cell">Max Saket Delhi</div>
                            </div>
                            <div className="sm-row">
                                <div className="sm-service">Visa Invitation Letter</div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳149</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳99</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳99</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳99</span></div>
                            </div>
                            <div className="sm-row">
                                <div className="sm-service">Doctor Appointment</div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳149</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳99</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳99</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳99</span></div>
                            </div>
                            <div className="sm-row">
                                <div className="sm-service">Telemedicine (Consultant)</div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳7,950</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳2,575</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳2,850</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳3,100</span></div>
                            </div>
                            <div className="sm-row">
                                <div className="sm-service">Airport Pickup (BDT)</div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳1,150–1,350</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳1,950–2,050</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳1,100–1,200</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳1,000–1,100</span></div>
                            </div>
                            <div className="sm-row">
                                <div className="sm-service">Hospital Guide (24hr)</div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳2,280</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳2,280</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳2,280</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">৳2,280</span></div>
                            </div>
                            <div className="sm-row">
                                <div className="sm-service">OP Commission (CI share)</div>
                                <div className="sm-val"><span className="sm-price">5%</span></div>
                                <div className="sm-val"><span className="sm-price">19–24%</span></div>
                                <div className="sm-val"><span className="sm-price">18%</span></div>
                                <div className="sm-val"><span className="sm-price">20%</span></div>
                            </div>
                            <div className="sm-row">
                                <div className="sm-service">IP Commission (CI share)</div>
                                <div className="sm-val"><span className="sm-price">5%</span></div>
                                <div className="sm-val"><span className="sm-price">19–24%</span></div>
                                <div className="sm-val"><span className="sm-price">18%</span></div>
                                <div className="sm-val"><span className="sm-price">20%</span></div>
                            </div>
                            <div className="sm-row">
                                <div className="sm-service">Liver Transplant (INR)</div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">23–27L</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">23–27L</span></div>
                                <div className="sm-val"><span style={{ color: 'var(--ink4)' }}>—</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">23–27L</span></div>
                            </div>
                            <div className="sm-row">
                                <div className="sm-service">IVF (1st cycle, ₹)</div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">₹3,95,000</span></div>
                                <div className="sm-val"><span style={{ color: 'var(--ink4)' }}>—</span></div>
                                <div className="sm-val"><span style={{ color: 'var(--ink4)' }}>—</span></div>
                                <div className="sm-val"><span className="sm-check">✓</span><span className="sm-price">₹3,95,000</span></div>
                            </div>
                        </div>

                        <div className="metrics-visual fade d3">
                            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink4)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 28 }}>Revenue &amp; Performance Snapshot</div>
                            <div className="metrics-row">
                                <div className="metric-ring-wrap">
                                    <div className="metric-ring">
                                        <svg viewBox="0 0 120 120" width="120" height="120">
                                            <circle className="metric-ring-bg" cx="60" cy="60" r="50"/>
                                            <circle className="metric-ring-fill" cx="60" cy="60" r="50" stroke="var(--brand)" strokeDasharray="0 314" data-val="304" id="ring-visa" style={{ transition: 'stroke-dasharray 1.6s cubic-bezier(.16, 1, .3, 1) 0.5s' }}/>
                                        </svg>
                                        <div className="metric-ring-label">
                                            <div className="metric-ring-val">97</div>
                                            <div className="metric-ring-unit">%</div>
                                        </div>
                                    </div>
                                    <div className="metric-ring-title">Visa Success</div>
                                    <div className="metric-ring-desc">vs. ~78% pre-MOCS</div>
                                </div>
                                
                                <div className="metric-ring-wrap">
                                    <div className="metric-ring">
                                        <svg viewBox="0 0 120 120" width="120" height="120">
                                            <circle className="metric-ring-bg" cx="60" cy="60" r="50"/>
                                            <circle className="metric-ring-fill" cx="60" cy="60" r="50" stroke="#f0a43a" strokeDasharray="0 314" data-val="170" id="ring-apollo" style={{ transition: 'stroke-dasharray 1.6s cubic-bezier(.16, 1, .3, 1) 0.6s' }}/>
                                        </svg>
                                        <div className="metric-ring-label">
                                            <div className="metric-ring-val" style={{ color: '#b06800' }}>54</div>
                                            <div className="metric-ring-unit" style={{ color: '#b06800' }}>%</div>
                                        </div>
                                    </div>
                                    <div className="metric-ring-title">Apollo Share</div>
                                    <div className="metric-ring-desc">of all patient cases</div>
                                </div>
                                
                                <div className="metric-ring-wrap">
                                    <div className="metric-ring">
                                        <svg viewBox="0 0 120 120" width="120" height="120">
                                            <circle className="metric-ring-bg" cx="60" cy="60" r="50"/>
                                            <circle className="metric-ring-fill" cx="60" cy="60" r="50" stroke="#b083f0" strokeDasharray="0 314" data-val="75" id="ring-ipd" style={{ transition: 'stroke-dasharray 1.6s cubic-bezier(.16, 1, .3, 1) 0.7s' }}/>
                                        </svg>
                                        <div className="metric-ring-label">
                                            <div className="metric-ring-val" style={{ color: '#6e47be' }}>24</div>
                                            <div className="metric-ring-unit" style={{ color: '#6e47be' }}>%</div>
                                        </div>
                                    </div>
                                    <div className="metric-ring-title">Max IP Commission</div>
                                    <div className="metric-ring-desc">Manipal Varthur/Whitefield</div>
                                </div>
                                
                                <div className="metric-ring-wrap">
                                    <div className="metric-ring">
                                        <svg viewBox="0 0 120 120" width="120" height="120">
                                            <circle className="metric-ring-bg" cx="60" cy="60" r="50"/>
                                            <circle className="metric-ring-fill" cx="60" cy="60" r="50" stroke="var(--brand)" strokeDasharray="0 314" data-val="251" id="ring-growth" style={{ transition: 'stroke-dasharray 1.6s cubic-bezier(.16, 1, .3, 1) 0.8s' }}/>
                                        </svg>
                                        <div className="metric-ring-label">
                                            <div className="metric-ring-val">340</div>
                                            <div className="metric-ring-unit">%</div>
                                        </div>
                                    </div>
                                    <div className="metric-ring-title">Volume Growth</div>
                                    <div className="metric-ring-desc">Since system launch in 2022</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 06 DESIGN HYPOTHESIS */}
            <div id="artifacts" className="artifact-section fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">06 — Design Hypothesis</div>
                        <h2>From observation<br/>to <em>intentional system</em></h2>
                        <p className="body-copy">The system wasn't built from a specification document. It was reverse-engineered from the operational failures of the spreadsheet era. Every major design decision directly answered a structural breakdown.</p>
                    </div>
                    <div className="artifact-content">
                        <div className="hs-tl" id="hs-tl">
                            {hypothesisData.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`hs-row ${activeHypothesis === index ? 'on' : ''}`}
                                    onClick={() => setActiveHypothesis(index)}
                                    tabIndex={0}
                                    role="button" 
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveHypothesis(index); }}
                                >
                                    <div className="hs-col">
                                        <div className="hs-node">0{index + 1}</div>
                                        <div className="hs-vl"></div>
                                    </div>
                                    <div className="hs-card">
                                        <div className="hs-tag">{item.tag}</div>
                                        <div className="hs-ct">{item.title}</div>
                                        <div className="hs-body">
                                            {item.quote && <div className="hs-quote">{item.quote}</div>}
                                            {item.body}
                                            <div className="hs-pills">
                                                {item.pills.map((pill, pIndex) => (
                                                    <span key={pIndex} className="hs-pill">{pill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 07 HOW IT WORKS */}
            <div className="artifact-section alt fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">07 — How It Works</div>
                        <h2>A patient arrives.<br/><em>Watch the system respond.</em></h2>
                        <p className="body-copy">Trace a single patient case through the full operational stack — from intake to commission filed — and see how each system layer activates in sequence.</p>
                    </div>
                    <div className="artifact-content">
                        <div className="hw-steps-grid" id="hw-steps">
                            {hwData.map((item, index) => (
                                <div 
                                    key={index}
                                    className={`hw-step ${activeHowItWorks === index ? 'on' : ''}`} 
                                    onClick={() => setActiveHowItWorks(index)} 
                                    tabIndex={0} 
                                    role="button" 
                                    onKeyDown={(e) => { if(e.key==='Enter') setActiveHowItWorks(index); }}
                                >
                                    <div className="hw-sn">Step 0{index + 1}</div>
                                    <div className="hw-st">{item.title}</div>
                                </div>
                            ))}
                        </div>
                        <div className="hw-detail" id="hw-detail">
                            <div>
                                <div className="hw-dtag">What happens</div>
                                <div className="hw-dl">{hwData[activeHowItWorks].desc}</div>
                            </div>
                            <div>
                                <div className="hw-dtag">Live system fields</div>
                                <div className="hw-dr">
                                    {hwData[activeHowItWorks].fields.map((f, i) => (
                                        <div key={i} className="hw-field">
                                            <span className="hw-fk">{f[0]}</span>
                                            <span className={`hw-fv${f[2] ? ' g' : ''}`}>{f[1]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RESULTS SECTION */}
            <div id="results" className="artifact-section fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">08 — Results</div>
                        <h2>Operational impact<br/>across <em>every metric</em></h2>
                    </div>
                    <div className="artifact-content">
                        <div className="context-grid fade d2">
                            <div className="ctx-card">
                                <div className="mc-icon">
                                    <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                </div>
                                <div className="ctx-title">Zero commission disputes since deployment</div>
                                <div className="ctx-body">Before MOCS, 4–6 agent commission disputes per month required manual reconciliation. Since deployment, disputes have dropped to zero — rate matrix is now the single source of truth.</div>
                            </div>
                            <div className="ctx-card">
                                <div className="mc-icon">
                                    <svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                                </div>
                                <div className="ctx-title">340% increase in tracked patient volume</div>
                                <div className="ctx-body">Cikitsa handled ~600 cases in 2022. MOCS enabled the same core team to manage 2,110+ cases by 2025 without proportional headcount growth.</div>
                            </div>
                            <div className="ctx-card">
                                <div className="mc-icon">
                                    <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15L11 17L15 13"/></svg>
                                </div>
                                <div className="ctx-title">Visa success rate improved to 97%</div>
                                <div className="ctx-body">From ~78% before MOCS. Proactive pipeline visibility allowed coordinators to intervene before visa applications expired or stalled.</div>
                            </div>
                        </div>

                        <div className="g4 fade d3" style={{ marginTop: '40px' }}>
                            <div className="impact-stat"><div className="stat-num">2,110+</div><span className="stat-unit">Patients tracked</span><div className="stat-desc">Across all hospital chains, cities, and coordinators in the system.</div></div>
                            <div className="impact-stat"><div className="stat-num">97%</div><span className="stat-unit">Visa success rate</span><div className="stat-desc">For patients with complete documentation submitted through MOCS.</div></div>
                            <div className="impact-stat"><div className="stat-num">0</div><span className="stat-unit">Commission disputes</span><div className="stat-desc">Down from 4–6/month before the system was deployed.</div></div>
                            <div className="impact-stat"><div className="stat-num">&lt;1d</div><span className="stat-unit">Coordinator onboarding</span><div className="stat-desc">New team members operational in under one day vs. 3–4 weeks previously.</div></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TECHNICAL APPROACH */}
            <div id="tech-approach" className="artifact-section alt fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">09 — Stack Used</div>
                        <h2>Designed for <em>operational longevity</em>,<br/>not technical novelty</h2>
                        <p className="body-copy">The stack was chosen explicitly to minimize maintenance burden on a small ops team — prioritizing reliability and access over sophistication.</p>
                    </div>
                    <div className="artifact-content">
                        <div className="tech-grid fade d2">
                            <div className="tech-card">
                                <div className="tech-layer">Data Layer</div>
                                <div className="tech-title">Source of Record</div>
                                <div className="tech-items">
                                    <div className="tech-item">Google Sheets — primary data store and patient registry</div>
                                    <div className="tech-item">TSV export → structured JSON ingestion pipeline</div>
                                    <div className="tech-item">BDT/INR dual-currency conversion engine</div>
                                    <div className="tech-item">AIT/VAT/SSL fee computation layer</div>
                                    <div className="tech-item">Structured schema migration from flat spreadsheet</div>
                                </div>
                            </div>
                            <div className="tech-card">
                                <div className="tech-layer">Frontend</div>
                                <div className="tech-title">Interface Layer</div>
                                <div className="tech-items">
                                    <div className="tech-item">Vanilla HTML / CSS / JS (v1) — no framework, no bundler</div>
                                    <div className="tech-item">React + Tailwind planned for v2 roadmap</div>
                                    <div className="tech-item">Responsive, mobile-first layout</div>
                                    <div className="tech-item">Light-theme operations shell</div>
                                    <div className="tech-item">Zero external dependencies in v1</div>
                                </div>
                            </div>
                            <div className="tech-card">
                                <div className="tech-layer">Design System</div>
                                <div className="tech-title">Hierarchy &amp; Tone</div>
                                <div className="tech-items">
                                    <div className="tech-item">Plus Jakarta Sans — narrative and display copy</div>
                                    <div className="tech-item">JetBrains Mono — all data fields and labels</div>
                                    <div className="tech-item">14 CSS design tokens across the system</div>
                                    <div className="tech-item">Semantic colour palette with ink hierarchy</div>
                                    <div className="tech-item">Consistent pill and badge system</div>
                                </div>
                            </div>
                            <div className="tech-card">
                                <div className="tech-layer">Roadmap</div>
                                <div className="tech-title">Planned Features</div>
                                <div className="tech-items">
                                    <div className="tech-item">WhatsApp Business API integration</div>
                                    <div className="tech-item">Automated follow-up reminders</div>
                                    <div className="tech-item">Agent self-service portal</div>
                                    <div className="tech-item">Commission invoice generation</div>
                                    <div className="tech-item">Analytics &amp; trend dashboard</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* KEY LEARNINGS */}
            <div id="learnings" className="artifact-section fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">10 — Key Learnings</div>
                        <h2>What MOCS taught us<br/>about <em>operational systems</em></h2>
                    </div>
                    <div className="artifact-content">
                        <div className="learning-grid fade d2">
                          <div className="learning-card"><div className="lc-num">01</div><div><div className="lc-cat">Data Modeling</div><div className="lc-title">The spreadsheet is the requirements doc</div><div className="lc-body">Every column in the patient sheet became a system field. Every remark pattern became a status enum. The spreadsheets — messy as they were — contained the full operational logic of the business.</div></div></div>
                          <div className="learning-card"><div className="lc-num">02</div><div><div className="lc-cat">Status Design</div><div className="lc-title">Status taxonomy is business-critical</div><div className="lc-body">The difference between “Under Treatment” and “Treatment Done” determines whether a coordinator follows up or files a commission. Getting the status set right was the single highest-impact design decision.</div></div></div>
                          <div className="learning-card"><div className="lc-num">03</div><div><div className="lc-cat">Finance</div><div className="lc-title">Commission complexity needs explicit modeling</div><div className="lc-body">The hospital rate sheet had 80+ columns — AIT, VAT, SSL layering on base rates, different CI vs. agent splits, MRP vs. final. This isn’t data entry. It’s financial logic. Encoding it wrong produces silent errors.</div></div></div>
                          <div className="learning-card"><div className="lc-num">04</div><div><div className="lc-cat">Follow-up Design</div><div className="lc-title">Structure is kindness to your future self</div><div className="lc-body">Unstructured notes like “will go some days later” are operationally dead. Date-stamped, outcome-typed follow-up entries transformed a narrative mess into queryable history.</div></div></div>
                          <div className="learning-card"><div className="lc-num">05</div><div><div className="lc-cat">Stakeholders</div><div className="lc-title">Multi-stakeholder systems need clear ownership</div><div className="lc-body">Every patient record touches four stakeholders — patient, agent, hospital, coordinator. The data model must be built for the most complex relationship, then simplified for simpler views.</div></div></div>
                          <div className="learning-card"><div className="lc-num">06</div><div><div className="lc-cat">Geography</div><div className="lc-title">City-branch granularity is non-negotiable</div><div className="lc-body">Apollo Chennai has different rates than Apollo Delhi. Manipal Varthur has different commissions than Manipal Kolkata. “Apollo” as a single entity is categorically wrong as a data model.</div></div></div>
                        </div>
                    </div>
                </div>
            </div>


            {/* BROADER CONTEXT */}
            <div id="broader-context" className="artifact-section alt fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">11 — Broader Context</div>
                        <h2>A massive industry<br/>still running on <em>spreadsheets</em></h2>
                        <p className="body-copy">Over 800,000 Bangladeshis travel overseas for medical care each year. Bangladesh is India's absolute largest source of medical tourists, accounting for over 50% of all inbound patients. Yet, the coordination infrastructure serving this massive volume is largely still informal.</p>
                    </div>
                    <div className="artifact-content">
                        <div className="context-grid fade d2">
                            <div className="ctx-card">
                                <div className="mc-icon">
                                    <svg viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
                                    </svg>
                                </div>
                                <div className="ctx-title">The market is enormous and growing</div>
                                <div className="ctx-body">Bangladesh accounts for over 50% of India's inbound medical tourists. On average, more than 1,300 Bangladeshis travel to India daily for medical treatment. Cikitsa International operates across 6 countries — India, Bangladesh, Singapore, Thailand, Dubai, and Turkey.</div>
                            </div>
                            <div className="ctx-card">
                                <div className="mc-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
                                    </svg>
                                </div>
                                <div className="ctx-title">The coordination gap is universal</div>
                                <div className="ctx-body">Every medical tourism facilitator — regardless of country — faces the same operational problems: fragmented patient data, manual commission tracking, informal follow-up systems, and no pipeline visibility. MOCS solves this for Cikitsa International. The same model applies to hundreds of similar operators globally.</div>
                            </div>
                            <div className="ctx-card">
                                <div className="mc-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                                <div className="ctx-title">Digitisation is the competitive moat</div>
                                <div className="ctx-body">In a sector dominated by informal coordination, a facilitator that can accurately track every patient, quote every commission, and proactively manage every visa application has a structural advantage. MOCS is not just an internal tool — it is Cikitsa's operational moat.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* 12 HOW I WORK */}
            <section style={{ padding: '80px 0', borderTop: '1px solid var(--ln)' }} className="bg-white fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="eyebrow" style={{ marginBottom: 16 }}>12 — How I Work</div>
                    <h2>From operational<br/>chaos to <em>structural clarity</em>.</h2>
                    <div className="process-row">
                        <div className="ps">
                            <div className="ps-num">01</div>
                            <div className="ps-title">Map the real workflow first</div>
                            <div className="ps-desc">I begin by tracing the actual operations — every WhatsApp thread, every manual column, every coordinator workaround. The existing chaos is the complete specification. Nothing gets designed until the real process is understood.</div>
                        </div>
                        <div className="ps">
                            <div className="ps-num">02</div>
                            <div className="ps-title">Define the data model before screens</div>
                            <div className="ps-desc">No interfaces until entities are settled. Patient, Agent, Hospital, Visa, Commission — each a distinct structured record, not a free-text column. A correct model makes every screen obvious. A wrong one makes every screen wrong by definition.</div>
                        </div>
                        <div className="ps">
                            <div className="ps-num">03</div>
                            <div className="ps-title">Encode the business logic explicitly</div>
                            <div className="ps-desc">Pricing rules, commission splits, status transitions — these aren't configurations, they are the business. I encode them once, correctly, so that every coordinator quotes the same rate, every agent gets the right commission, and nothing depends on memory.</div>
                        </div>
                        <div className="ps">
                            <div className="ps-num">04</div>
                            <div className="ps-title">Build for the team, not the builder</div>
                            <div className="ps-desc">Every system I build is trainable without my presence. MOCS brought onboarding from 3–4 weeks to under one day because the system documents itself through structure. A system only I can run is a liability — not an asset.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 md:py-32 bg-white border-t border-slate-200">
                <div className="max-w-[660px] mx-auto text-center fade">
                    <h2 className="font-sans text-[clamp(38px,5.5vw,62px)] text-slate-900 leading-[1.05] tracking-[-0.4px] mb-[18px] font-bold">
                        Built for real operations.<br/><em className="italic text-slate-400 font-semibold">Not a demo.</em>
                    </h2>
                    <p className="text-[16px] text-slate-500 leading-[1.82] font-light max-w-[540px] mx-auto mb-11">
                        MOCS is actively used by Cikitsa India's operations team to coordinate patient journeys daily across Bangladesh and India. Every data point in this case study reflects an actual patient, service, or hospital relationship.
                    </p>
                    <a
                        href="/contact"
                        className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#4F46E5] text-white rounded-full font-sans text-sm font-semibold transition-all hover:bg-[#4338CA] hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98]"
                    >
                        Start a conversation
                        <svg className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </a>
                </div>
            </section>

        </div>
    );
};

export default MocsCaseStudy;

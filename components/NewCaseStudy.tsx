import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import ErpDemo from './ErpDemo';
import { motion, AnimatePresence } from 'framer-motion';
import { trackContactCTA } from '../utils/analytics';
import SectionLabel from './shared/SectionLabel';

interface HeroContent {
  index: string;
  image: string;
  title: React.JSX.Element;
  subhead?: string;
  description: string;
  statLabel: string;
  statValue: string;
  statUnit: string;
}

const CS_MK = ['Sep 22','Oct 22','Nov 22','Dec 22','Jan 23','Feb 23','Mar 23','Apr 23','May 23','Jun 23','Jul 23','Aug 23','Sep 23','Oct 23'];
const CS_MR = [57640,213170,231246,307205,397325,547170,1237775,1130650,2727150,3064550,2142300,4451500,3324056,3870740];
const CS_MP = [59510,166200,182132,280342,515703,547475,1010680,1225595,3032364,3170390,1938850,4637350,3319535,4549324];

const NewCaseStudy: React.FC = () => {
  const [activeMandate, setActiveMandate] = useState<'sovereignty' | 'efficiency'>('sovereignty');
const content: Record<'sovereignty' | 'efficiency', HeroContent> = {
    sovereignty: {
      index: "01",
      image: "./images/hero/Abu Rahat Hero 01.webp",
      title: <>Engineering <br /><span className="text-blue-700">Institutional</span> <br />Sovereignty.</>,
      description: "I design self-governing operations infrastructure for organizations that refuse to hire their way out of inefficiency—eliminating the 'Human-Bridge' debt between silos.",
      statLabel: "Tenure in Operations",
      statValue: "6+",
      statUnit: "Years"
    },
    efficiency: {
      index: "02",
      image: "./images/hero/Abu Rahat Hero 02.webp",
      title: <>Reclaiming <br /><span className="text-blue-700">Operational</span> <br />Capital.</>,
      description: "I architect operational systems that eliminate administrative overhead—reclaiming executive time while your processes run flawlessly without constant supervision.",
      statLabel: "Average Efficiency",
      statValue: "90%",
      statUnit: "Gain"
    }
  };

    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    const [activeHypothesis, setActiveHypothesis] = useState(0);

    const hypothesisData = [
        {
            tag: "Observation · Sep 2022",
            title: "The sheet was the symptom, not the disease",
            quote: "\"The sheet has 106 columns. Nobody knows what half of them mean.\"",
            body: "The real problem wasn't the spreadsheet — it was that the business had no data model. Every person added a column to solve their own problem. Returns, salaries, commissions, and transport costs all shared one free-text notes field because there was nowhere else to put them. The first insight: this wasn't a UI problem. It was a structural one. The chaos would survive any redesign until the underlying entities were defined.",
            pills: ["Root cause identified", "Data model absent", "106 columns → 5 entities"]
        },
        {
            tag: "Hypothesis · Oct 2022",
            title: "Structure the entities and everything else resolves",
            body: "The core question: what are the actual objects in this business? Dealer, Order, Product, Payment, Staff — five entities, not 106 columns. Once you define what a \"Dealer\" is (code, name, balance, credit limit) and what an \"Order\" is (dealer reference, date, line items, memo number), all the chaos in the notes column resolves into proper fields. The hypothesis: model the data correctly and most of the manual work disappears on its own, without building anything clever.",
            pills: ["5 core entities defined", "Relationships mapped", "Hypothesis formed"]
        },
        {
            tag: "Design decision · Nov 2022",
            title: "Build for the field, not the office",
            body: "The SRs and managers using this are on motorcycles, in markets, on mobile phones with poor signal. The old sheet required a laptop and patience to scroll 200 rows. Key design constraint: every core workflow — placing an order, checking a balance, recording a payment — had to work in under 30 seconds on a small screen. This ruled out complex multi-step forms and drove the decision toward single-screen modules with inline calculation and no page reloads.",
            pills: ["Mobile-first constraint", "30-second rule", "Single-screen modules"]
        },
        {
            tag: "Validation · Feb–Apr 2023",
            title: "9 new dealers in one quarter, no balance lost",
            body: "The real stress test wasn't volume — it was simultaneous onboarding. Nine new dealer accounts in a single quarter. Revenue tripled (৳5.47L → ৳11.31L). Under the old sheet, nine more 106-column blocks — nine more places where commission math could go wrong. In the structured model, onboarding a new dealer meant adding one record to the dealers table. The rest of the system worked without modification. Hypothesis validated. The data model scaled; the sheet wouldn't have.",
            pills: ["9 dealers · 1 quarter", "Revenue ×3", "Hypothesis confirmed"]
        },
        {
            tag: "Surprise finding · Aug–Sep 2023",
            title: "Returns were a hidden quality-control signal",
            body: "Once returns had structure — reason, product, quantity, original memo — a pattern emerged: 10 of the 18 return events clustered in Aug–Sep 2023, the same months as peak volume (16,180 kg in August alone). High dispatch volume correlates with more returns. The sheet buried this in notes — invisible for 14 months. The structured system revealed a quality-control signal the business had never seen: when volume spikes, inspection time per delivery drops, and return rates follow.",
            pills: ["Unexpected correlation", "Volume ↔ returns signal", "New KPI discovered"]
        }
    ];

    const [activeHowItWorks, setActiveHowItWorks] = useState(0);
    const [activeLearning, setActiveLearning] = useState(0);

    const learningsData = [
        {
            cat: "Data modeling",
            title: "Free-text fields are not a data problem — they're a modeling failure",
            body: "Every \"notes\" column I've ever seen is a symptom of a missing entity. In R Group's sheet, one notes field held SR salaries, commission calculations, return reasons, transport costs, and offer adjustments — all in the same cell. Not because the team was sloppy. Because nobody had defined those as separate things yet. The fix wasn't better notes. It was five new entities. I'll spot this in every system I look at now.",
            verdict: "Rule: if two different things live in the same field, you're missing an entity."
        },
        {
            cat: "Scale",
            title: "Good structure absorbs scale; bad structure collapses under it",
            body: "Nine new dealers in one quarter (Feb–Apr 2023) would have created chaos in the old sheet — nine new 106-column blocks, each requiring manual formula updates. In the structured model, onboarding a new dealer meant adding one record to the dealers table. The rest of the system — commissions, ledger, inventory — worked without modification. Structure is leverage. It pays back on every new entity you add.",
            verdict: "Rule: if adding a new record breaks your system, you don't have a system — you have a document."
        },
        {
            cat: "Visibility",
            title: "The system doesn't just record reality — it reveals it",
            body: "Nobody planned to discover that return rates spike in high-volume months. That pattern was invisible in the old sheet because returns and dispatch volumes were never connected structurally. Once both were structured entities with a shared order_id, the correlation appeared automatically. The insight wasn't in the data — it was in the relationship between data points.",
            verdict: "Rule: what you can't structure, you can't measure. What you can't measure, you can't improve."
        },
        {
            cat: "Constraint",
            title: "The single-file constraint produced a better product",
            body: "Requiring the system to run as one deployable HTML file forced every decision toward simplicity. No backend meant all data had to be structured perfectly before embedding. No framework meant no abstraction layers hiding complexity. No build step meant every line of code had to earn its place. The constraint I imposed for practical reasons turned out to be the constraint that made the architecture clean.",
            verdict: "Rule: constraints clarify. An unbounded system is an undefined system."
        },
        {
            cat: "Reconciliation",
            title: "Payment channels matter as much as payment totals",
            body: "৳2,49,24,450 received — but across bank transfer (56.6%), bKash, Rocket, cash, and offer credits. The old sheet recorded totals but not channels. Reconciling actual bank statements with the sheet was impossible because channels weren't tracked. Structuring payments by channel made reconciliation exact and made fraud or error immediately visible as a discrepancy between bank statement and system record.",
            verdict: "Rule: total paid is not the same as reconciled paid."
        },
        {
            cat: "Handover",
            title: "A system that only you understand is a liability",
            body: "The old sheet was only navigable by the person who built it. When they weren't available, the business was partially blind. Every module in this ERP is self-documenting — the ledger shows exactly how a balance was reached, the commission module shows the formula behind every figure, the returns register shows who approved what credit and when. A system should be auditable by anyone in the business.",
            verdict: "Rule: if the business can't run without you, you built a dependency — not a system."
        }
    ];

    const hwData = [
        {
            title: "SR raises order",
            desc: "The SR selects a dealer from the registered account list. The system immediately loads that dealer's current outstanding balance, last memo date, and advance credit — no manual lookup needed. This single lookup replaced scrolling 200+ rows in the old sheet.",
            fields: [["Dealer", "Tasneem Ent. 965"], ["Current due", "৳0"], ["Advance credit", "৳1,26,988"], ["Last memo", "31 Oct 2023"]]
        },
        {
            title: "Dealer account loads",
            desc: "The dealer account card shows full context: manager name, address, phone, total orders, lifetime revenue, and current balance. The SR can see the complete credit picture before committing to the delivery quantity and product mix.",
            fields: [["Manager", "Shahin Ahmed"], ["Lifetime revenue", "৳1.30 Cr"], ["Total orders", "58"], ["Status", "ADV ৳1,26,988", true]]
        },
        {
            title: "SKU lines added",
            desc: "Products selected from a catalog of 6 DOHA Brand lines × 32+ SKU sizes. Each size has a live rate from the versioned price catalog. The SR enters quantity and the line total calculates instantly. Multiple products added to one memo.",
            fields: [["Product", "Chili Powder 5 kg"], ["Unit rate", "৳385"], ["Quantity", "500 kg"], ["Line total", "৳1,92,500"]]
        },
        {
            title: "Invoice builds live",
            desc: "As each line is added, the invoice builds in real time: order value, previous balance, payment received, and net outstanding all update without saving. The printed memo format matches the physical delivery book SRs carry in the field.",
            fields: [["Order value", "৳6,46,150"], ["Prev balance", "৳77,908"], ["Grand total", "৳7,24,058"], ["Net due", "৳0 (cleared)", true]]
        },
        {
            title: "Memo saved → ledger",
            desc: "On save, the delivery memo is numbered (#10108), timestamped, and written to the order ledger. The dealer's running balance updates immediately. Payment received (৳8,51,046) is reconciled against grand total, producing the new balance.",
            fields: [["Memo number", "#10108"], ["Date saved", "31 Oct 2023"], ["Paid this memo", "৳8,51,046", true], ["New balance", "ADV ৳1,26,988", true]]
        },
        {
            title: "Inventory updated",
            desc: "The 2,470 kg dispatched is deducted from chili, turmeric, and coriander stock counts. The inventory module shows real-time breakdown by product and month. The dispatch log records the exact split per SKU.",
            fields: [["Chili dispatched", "1,010 kg"], ["Turmeric dispatched", "820 kg"], ["Coriander dispatched", "640 kg"], ["Total this memo", "2,470 kg"]]
        },
        {
            title: "Commission queued",
            desc: "October 2023 SR commission calculated: 10,699 kg lifted in September × ৳15 rate = ৳1,60,485. Recorded as a commission event, linked to the memo, shown in the HR module as a payable item. No manual multiplication required.",
            fields: [["Sep kg lifted", "10,699 kg"], ["Commission rate", "৳15/kg"], ["Commission due", "৳1,60,485"], ["Status", "Paid via memo 10102", true]]
        },
        {
            title: "Returns flagged",
            desc: "If the delivery contains a return — turmeric 390 kg, chili 40 kg — the system creates a structured return record: product, quantity, estimated value, reason code, and settlement status. Inventory adjusted, credit note issued.",
            fields: [["Turmeric return", "390 kg"], ["Chili return", "40 kg"], ["Est. credit", "৳86,650"], ["Status", "Settled", true]]
        }
    ];

    useEffect(() => {
        // Trigger fade in animation after component mount
        const elements = document.querySelectorAll('.fade');
        setTimeout(() => {
            elements.forEach(elt => elt.classList.add('in'));
        }, 100);

        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: CS_MK,
                    datasets: [
                        {
                            label: 'Order value',
                            data: CS_MR.map(v => Math.round(v / 1000)),
                            backgroundColor: CS_MK.map((_, i) => i >= 11 ? '#0F172A' : '#E2E8F0'),
                            borderRadius: 2,
                            borderSkipped: false
                        },
                        {
                            label: 'Payments',
                            data: CS_MP.map(v => Math.round(v / 1000)),
                            backgroundColor: CS_MK.map((_, i) => i >= 11 ? 'rgba(45,148,96,.85)' : 'rgba(45,148,96,.28)'),
                            borderRadius: 2,
                            borderSkipped: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    family: "'JetBrains Mono', monospace",
                                    size: 10
                                },
                                color: '#64748B',
                                boxWidth: 9,
                                padding: 12
                            }
                        },
                        tooltip: {
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E2E8F0',
                            borderWidth: 1,
                            titleColor: '#64748B',
                            bodyColor: '#0F172A',
                            titleFont: { family: "'JetBrains Mono', monospace", size: 10 },
                            bodyFont: { family: "'JetBrains Mono', monospace", size: 11 },
                            callbacks: {
                                label: x => ` ${x.dataset.label}: ৳${x.raw}k`
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: {
                                color: '#CBD5E1',
                                font: { family: "'JetBrains Mono', monospace", size: 9 },
                                maxRotation: 45
                            },
                            border: { display: false }
                        },
                        y: {
                            grid: { color: '#F1F5F9' },
                            ticks: {
                                color: '#CBD5E1',
                                font: { family: "'JetBrains Mono', monospace", size: 9 },
                                callback: v => `৳${v}k`
                            },
                            border: { display: false }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
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
                .fmcg-case-study .eyebrow.lt { color: rgba(255,255,255,.3); }
                .fmcg-case-study .eyebrow.lt::after { background: rgba(255,255,255,.15); }
                .fmcg-case-study h2 { font-family: var(--sans); font-size: clamp(28px, 4vw, 46px); line-height: 1.1; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 18px; font-weight: 700; }
                .fmcg-case-study h2 em { font-style: italic; color: var(--ink4); font-weight: 600; }
                .fmcg-case-study h2.lt { color: #FFFFFF; }
                .fmcg-case-study h2.lt em { color: rgba(255,255,255,.4); }
                .fmcg-case-study .body-copy { font-size: 16px; color: var(--ink2); line-height: 1.9; font-weight: 300; max-width: 600px; }

                .fmcg-case-study .prob-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; margin-top: 48px; }
                .fmcg-case-study .prob-col-head { font-family: var(--mono); font-size: 11px; color: var(--ink4); letter-spacing: 1.5px; text-transform: uppercase; padding-bottom: 14px; border-bottom: 1px solid var(--ln); }
                .fmcg-case-study .prob-item { display: flex; gap: 13px; padding: 13px 0; border-bottom: 1px solid var(--ln); font-size: 15px; color: var(--ink2); line-height: 1.7; font-weight: 300; }
                .fmcg-case-study .prob-item:last-child { border-bottom: none; }
                .fmcg-case-study .prob-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 8px; }
                .fmcg-case-study .bad-col .prob-dot { background: var(--rm); }
                .fmcg-case-study .good-col .prob-dot { background: var(--brand); }
                
                .fmcg-case-study .arch-wrap { border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; background: var(--off); margin-top: 0; }
                
                .fmcg-case-study .feat-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: var(--ln); border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 48px; }
                .fmcg-case-study .feat { background: var(--w); padding: 26px 24px; transition: background .2s; }
                .fmcg-case-study .feat:hover { background: var(--off); }
                .fmcg-case-study .feat-n { font-family: var(--mono); font-size: 11px; color: var(--brand); letter-spacing: 0.08em; margin-bottom: 12px; font-weight: 500; }
                .fmcg-case-study .feat-t { font-size: 16px; font-weight: 500; color: var(--ink); margin-bottom: 8px; line-height: 1.35; }
                .fmcg-case-study .feat-d { font-size: 14px; color: var(--ink3); line-height: 1.78; font-weight: 300; }
                .fmcg-case-study .feat-tag { display: inline-block; margin-top: 14px; font-family: var(--mono); font-size: 11px; color: var(--brand); background: var(--brand-light); padding: 3px 9px; border-radius: 6px; font-weight: 500; }
                
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

                .fmcg-case-study .g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; }

                .fmcg-case-study .alerts { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 48px; }
                .fmcg-case-study .alert { border-radius: 8px; padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--w); border: 1px solid var(--ln); }
                .fmcg-case-study .al-icon { font-family: var(--mono); font-size: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; }
                .fmcg-case-study .alert.danger .al-icon { color: var(--rm); background: var(--rbg); border: 1px solid rgba(220, 38, 38, 0.1); }
                .fmcg-case-study .alert.warn .al-icon { color: var(--am); background: var(--abg); border: 1px solid rgba(217, 119, 6, 0.1); }
                .fmcg-case-study .alert.info .al-icon { color: var(--bm); background: var(--bbg); border: 1px solid rgba(37, 99, 235, 0.1); }
                .fmcg-case-study .al-title { font-size: 14px; color: var(--ink2); font-weight: 500; line-height: 1.5; letter-spacing: -0.01em; }

                .fmcg-case-study .impact-stat { padding: 32px 26px; border-right: 1px solid var(--ln); }
                .fmcg-case-study .impact-stat:last-child { border-right: none; }
                .fmcg-case-study .stat-num { font-family: var(--sans); font-size: 46px; line-height: 1; color: var(--ink); margin-bottom: 5px; font-weight: 800; letter-spacing: -0.05em; }
                .fmcg-case-study .stat-unit { font-family: var(--mono); font-size: 11px; color: var(--brand); letter-spacing: 0.08em; display: block; margin-bottom: 6px; font-weight: 500; }
                .fmcg-case-study .stat-desc { font-size: 14px; color: var(--ink3); line-height: 1.65; font-weight: 300; }

                .fmcg-case-study .chart-card { border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 14px; }
                .fmcg-case-study .cc-head { padding: 13px 18px; border-bottom: 1px solid var(--ln); display: flex; justify-content: space-between; align-items: center; }
                .fmcg-case-study .cc-t { font-size: 14px; font-weight: 500; color: var(--ink); }
                .fmcg-case-study .cc-s { font-family: var(--mono); font-size: 12px; color: var(--ink4); }
                .fmcg-case-study .cc-body { padding: 16px 18px; height: 196px; position: relative; }
                
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
                @keyframes dispatch-anim {
                    0%, 15% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
                    40%, 60% { transform: translateY(-120px) translateX(40px) scale(0.9); opacity: 0; }
                    70% { transform: translateY(-40px) translateX(0) scale(0.95); opacity: 0; }
                    85%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
                }
                .fmcg-case-study .dispatched-cube {
                    animation: dispatch-anim 6s cubic-bezier(0.25, 1, 0.5, 1) infinite;
                }
                
                @media(max-width:900px){
                    .fmcg-case-study section { padding: 80px 0; }
                    .fmcg-case-study .prob-grid, .fmcg-case-study .feat-grid, .fmcg-case-study .ba-grid { grid-template-columns: 1fr; gap: 32px; }
                    .fmcg-case-study .alerts, .fmcg-case-study .g4 { grid-template-columns: 1fr; }
                    .fmcg-case-study .impact-stat { border-right: none; border-bottom: 1px solid var(--ln); }
                    .fmcg-case-study h1 { font-size: clamp(38px, 10vw, 60px); }
                    .fmcg-case-study .hero-meta { grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; border-top: none; padding-top: 0; }
                    .fmcg-case-study .hm { border-right: none; margin-right: 0; padding-right: 0; border-bottom: 1px solid var(--ln); padding-bottom: 14px; }
                    .fmcg-case-study .hero-inner { grid-template-columns: 1fr; gap: 48px; }
                    .fmcg-case-study #hero { padding: 100px 0 60px; min-height: auto; }
                    .fmcg-case-study .hero-visual { min-height: 400px; }
                    .fmcg-case-study .topology-container { max-width: 440px; margin: 0 auto; }
                }
            `}</style>

            <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-40 pb-20 overflow-hidden bg-white selection:bg-blue-700 selection:text-white">
      {/* Sophisticated Background Architecture */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.3]"></div>
        <div className="absolute top-0 right-0 w-[45%] h-full bg-slate-50/50 border-l border-slate-100 hidden lg:block"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 w-full"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
          <div className="relative z-10 space-y-8 lg:space-y-10">
            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4"
              >
                <div className="inline-flex p-1 bg-white/50 backdrop-blur-xl border border-slate-100 rounded-xl relative overflow-hidden group/toggle max-w-fit">
                  {/* High-Precision Indicator */}
                  <div className="absolute inset-1 w-[calc(50%-4px)] h-[calc(100%-8px)] pointer-events-none">
                    <motion.div
                      layoutId="mandate-active"
                      initial={false}
                      animate={{
                        x: activeMandate === 'sovereignty' ? 0 : '100%',
                        marginLeft: activeMandate === 'sovereignty' ? 0 : '8px'
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 40, mass: 0.8 }}
                      className="absolute inset-0 bg-slate-900 rounded-lg shadow-2xl shadow-slate-900/20"
                    />
                  </div>

                  <button
                    onClick={() => setActiveMandate('sovereignty')}
                    className="relative px-6 py-2 transition-all duration-300 z-10"
                  >
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] font-mono transition-colors duration-500 ${activeMandate === 'sovereignty' ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                      Sovereignty
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveMandate('efficiency')}
                    className="relative px-6 py-2 transition-all duration-300 z-10"
                  >
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] font-mono transition-colors duration-500 ${activeMandate === 'efficiency' ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                      Efficiency
                    </span>
                  </button>
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMandate}
                  initial={{ opacity: 0, x: -15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <h1 className="text-6xl md:text-8xl lg:text-[105px] font-[900] tracking-[-0.04em] leading-[0.88] text-slate-900">
                    {content[activeMandate].title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">
                    {content[activeMandate].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-8">
              <a
                href="/contact"
                onClick={() => trackContactCTA({
                  location: 'hero_section',
                  conversionType: 'contact_form',
                  label: 'free_audit_cta'
                })}
                className="w-full sm:w-auto relative group active:scale-[0.97] transition-transform duration-200"
              >
                {/* Sophisticated Glow Layer */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative px-14 py-6 bg-slate-950 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all duration-300 border border-white/5 overflow-hidden">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                  <span className="relative z-10">Start Discussion</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </div>
              </a>

              <a
                href="/work"
                className="w-full sm:w-auto group relative flex items-center justify-center active:scale-[0.98] transition-transform"
              >
                <div className="relative px-12 py-6 bg-white border border-slate-100 rounded-xl font-black text-[11px] uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 flex items-center justify-center transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200">
                  <span className="relative z-10">Case Studies</span>
                </div>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-12 border-t border-slate-100 flex flex-wrap items-center gap-x-10 gap-y-6">
              <SectionLabel variant="muted">Core Expertise</SectionLabel>
              <div className="flex gap-8">
                {['Automation', 'Optimization', 'Integration'].map(name => (
                  <div key={name} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                    <span className="text-[11px] font-black text-slate-900 tracking-tight">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Architectural Frame */}
            <div className="absolute -inset-10 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <motion.div
              className="relative z-10 p-2 bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.08)] border border-slate-100 group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-50">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={content[activeMandate].image}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={content[activeMandate].image}
                    alt={`Abu Rahat Sabir - ${activeMandate}`}
                    width={800}
                    height={1000}
                    fetchPriority="high"
                    loading="eager"
                    className="w-full h-full object-cover grayscale brightness-[1.05] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  />
                </AnimatePresence>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Telemetry Node - Premium Card */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-4 z-20"
              >
                <div className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={content[activeMandate].statLabel}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                      >
                        {content[activeMandate].statLabel}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={content[activeMandate].statValue}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl font-black text-white tracking-tight"
                      >
                        {content[activeMandate].statValue}
                      </motion.p>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={content[activeMandate].statUnit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[9px] font-semibold uppercase text-blue-400 tracking-[0.108em]"
                      >
                        {content[activeMandate].statUnit}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
            
            <section id="problem" className="alt">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide fade">
                        <div className="eyebrow">01 — Problem</div>
                        <h2>One sheet.<br/>Too many moving parts.</h2>
                        <p className="body-copy">R Group managed ৳2,37,02,478 in annual sales through a single Google Sheet with 106 columns. It worked — until it didn't. SR commissions by hand. Returns in free-text notes. Dues hidden 200 rows deep. The sheet wasn't the problem. The absent data model underneath it was.</p>
                        
                        <div className="prob-grid">
                            <div className="bad-col">
                                <div className="prob-col-head">What broke</div>
                                <div className="prob-item"><div className="prob-dot"></div><div>Returns, commissions, transport costs, and salaries crammed into one notes column — unsearchable, unstructured, unauditable</div></div>
                                <div className="prob-item"><div className="prob-dot"></div><div>No inventory layer — stock availability unknown without physically counting the warehouse</div></div>
                                <div className="prob-item"><div className="prob-dot"></div><div>SR commission: "983×15=14,745" typed by hand into a memo field every month. No verification possible.</div></div>
                                <div className="prob-item"><div className="prob-dot"></div><div>৳15,46,032 outstanding across 9 accounts — visible only to someone who knew to scroll to the right row</div></div>
                                <div className="prob-item"><div className="prob-dot"></div><div>Same 5 kg chili at ৳320, ৳335, ৳345, ৳385 across four consecutive orders — no price catalog</div></div>
                                <div className="prob-item"><div className="prob-dot"></div><div>No cross-dealer view — the full business picture required reading 14 separate blocks manually</div></div>
                            </div>
                            
                            <div className="good-col">
                                <div className="prob-col-head">What the system now does</div>
                                <div className="prob-item"><div className="prob-dot"></div><div>Single source of truth for all 14 dealer accounts — balances, payment history, and running dues in one view</div></div>
                                <div className="prob-item"><div className="prob-dot"></div><div>Live inventory updated on every dispatch and return, linked to each delivery memo by order ID</div></div>
                                <div className="prob-item"><div className="prob-dot"></div><div>Commission engine: monthly kg × ৳15 per SR, auto-calculated on save — with advance deductions and multi-SR territories</div></div>
                                <div className="prob-item"><div className="prob-dot"></div><div>Dashboard shows every dealer's current due, advance credit, and last payment date in a single screen</div></div>
                                <div className="prob-item"><div className="prob-dot"></div><div>Versioned price catalog — one rate change applies forward to all dealers automatically</div></div>
                                <div className="prob-item"><div className="prob-dot"></div><div>Structured returns register with reason codes, credit status, and inventory linkage on every event</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="system">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide fade">
                        <div className="eyebrow">02 — System Design</div>
                        <h2>Eight modules.<br/>One data layer.</h2>
                        <p className="body-copy">Each module operates independently but shares a single data model. Creating an order triggers a ledger entry, adjusts inventory, and queues an SR commission calculation — automatically. No manual steps, no double-entry.</p>
                        
                        <div className="arch-wrap" style={{ marginTop: 48 }}>
                            <svg viewBox="0 0 1040 380" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
                                <defs>
                                    <marker id="a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                        <path d="M2 1L8 5L2 9" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </marker>
                                </defs>
                                <rect width="1040" height="380" fill="#F8FAFC"/>
                                
                                <rect x="40" y="312" width="960" height="46" rx="7" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1"/>
                                <text x="520" y="340" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="JetBrains Mono,monospace" letterSpacing="1.5">SHARED DATA LAYER · Dealers · Orders · Products · Payments · Inventory · Staff · Returns</text>
                                
                                <rect x="48" y="38" width="172" height="68" rx="7" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
                                <text x="134" y="66" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="JetBrains Mono,monospace">MODULE 01</text>
                                <text x="134" y="84" textAnchor="middle" fontSize="13" fill="#0F172A" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="500">Order Mgmt</text>
                                <text x="134" y="99" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Plus Jakarta Sans,sans-serif">Entry · invoice · memo</text>
                                
                                <rect x="240" y="38" width="172" height="68" rx="7" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
                                <text x="326" y="66" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="JetBrains Mono,monospace">MODULE 02</text>
                                <text x="326" y="84" textAnchor="middle" fontSize="13" fill="#0F172A" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="500">Dealer CRM</text>
                                <text x="326" y="99" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Plus Jakarta Sans,sans-serif">Profiles · credit · history</text>
                                
                                <rect x="432" y="38" width="172" height="68" rx="7" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
                                <text x="518" y="66" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="JetBrains Mono,monospace">MODULE 03</text>
                                <text x="518" y="84" textAnchor="middle" fontSize="13" fill="#0F172A" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="500">Product Catalog</text>
                                <text x="518" y="99" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Plus Jakarta Sans,sans-serif">SKUs · pricing · history</text>
                                
                                <rect x="624" y="38" width="172" height="68" rx="7" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
                                <text x="710" y="66" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="JetBrains Mono,monospace">MODULE 04</text>
                                <text x="710" y="84" textAnchor="middle" fontSize="13" fill="#0F172A" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="500">Inventory</text>
                                <text x="710" y="99" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Plus Jakarta Sans,sans-serif">Stock · dispatch · returns</text>
                                
                                <line x1="220" y1="72" x2="240" y2="72" stroke="#CBD5E1" strokeWidth="1" markerEnd="url(#a)"/>
                                <line x1="412" y1="72" x2="432" y2="72" stroke="#CBD5E1" strokeWidth="1" markerEnd="url(#a)"/>
                                <line x1="604" y1="72" x2="624" y2="72" stroke="#CBD5E1" strokeWidth="1" markerEnd="url(#a)"/>
                                
                                <rect x="48" y="200" width="172" height="68" rx="7" fill="#0F172A" stroke="#0F172A"/>
                                <text x="134" y="228" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="JetBrains Mono,monospace">MODULE 05</text>
                                <text x="134" y="246" textAnchor="middle" fontSize="13" fill="white" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="500">Finance Ledger</text>
                                <text x="134" y="261" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Plus Jakarta Sans,sans-serif">Balance · dues · bank</text>
                                
                                <rect x="240" y="200" width="172" height="68" rx="7" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
                                <text x="326" y="228" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="JetBrains Mono,monospace">MODULE 06</text>
                                <text x="326" y="246" textAnchor="middle" fontSize="13" fill="#0F172A" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="500">Returns</text>
                                <text x="326" y="261" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Plus Jakarta Sans,sans-serif">Credits · defects · damage</text>
                                
                                <rect x="432" y="200" width="172" height="68" rx="7" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
                                <text x="518" y="228" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="JetBrains Mono,monospace">MODULE 07</text>
                                <text x="518" y="246" textAnchor="middle" fontSize="13" fill="#0F172A" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="500">HR & Payroll</text>
                                <text x="518" y="261" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Plus Jakarta Sans,sans-serif">Staff · SR · commission</text>
                                
                                <rect x="624" y="200" width="172" height="68" rx="7" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
                                <text x="710" y="228" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="JetBrains Mono,monospace">MODULE 08</text>
                                <text x="710" y="246" textAnchor="middle" fontSize="13" fill="#0F172A" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="500">Analytics</text>
                                <text x="710" y="261" textAnchor="middle" fontSize="11" fill="#64748B" fontFamily="Plus Jakarta Sans,sans-serif">KPIs · trends · reports</text>
                                
                                <line x1="220" y1="234" x2="240" y2="234" stroke="#CBD5E1" strokeWidth="1" markerEnd="url(#a)"/>
                                <line x1="412" y1="234" x2="432" y2="234" stroke="#CBD5E1" strokeWidth="1" markerEnd="url(#a)"/>
                                <line x1="604" y1="234" x2="624" y2="234" stroke="#CBD5E1" strokeWidth="1" markerEnd="url(#a)"/>
                                
                                <line x1="134" y1="106" x2="134" y2="200" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#a)"/>
                                <line x1="326" y1="106" x2="326" y2="200" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#a)"/>
                                <line x1="518" y1="106" x2="518" y2="200" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#a)"/>
                                <line x1="710" y1="106" x2="710" y2="200" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#a)"/>
                                
                                <line x1="134" y1="268" x2="134" y2="312" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3"/>
                                <line x1="326" y1="268" x2="326" y2="312" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3"/>
                                <line x1="518" y1="268" x2="518" y2="312" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3"/>
                                <line x1="710" y1="268" x2="710" y2="312" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3"/>
                                
                                <rect x="840" y="110" width="154" height="78" rx="7" fill="#fef3e2" stroke="#E2E8F0" strokeWidth="1"/>
                                <text x="917" y="138" textAnchor="middle" fontSize="11" fill="#D97706" fontFamily="JetBrains Mono,monospace" letterSpacing="1">ALERT ENGINE</text>
                                <text x="917" y="158" textAnchor="middle" fontSize="13" fill="#92570a" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="500">Notifications</text>
                                <text x="917" y="175" textAnchor="middle" fontSize="12" fill="#D97706" fontFamily="Plus Jakarta Sans,sans-serif">Dues · stock · returns</text>
                                <line x1="796" y1="82" x2="840" y2="130" stroke="#CBD5E1" strokeWidth="1" markerEnd="url(#a)"/>
                                <line x1="796" y1="240" x2="840" y2="185" stroke="#CBD5E1" strokeWidth="1" markerEnd="url(#a)"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="features" className="alt">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide fade">
                        <div className="eyebrow">03 — Key Features</div>
                        <h2>Built for how FMCG<br/>distribution actually works.</h2>
                        <p className="body-copy">Every feature maps directly to a real workflow from the field — not a generic ERP template adapted from enterprise software.</p>
                        
                        <div className="feat-grid">
                            <div className="feat"><div className="feat-n">01</div><div className="feat-t">Multi-SKU order entry with live invoice</div><div className="feat-d">Select dealer, add any combination of product × size × quantity. Auto-calculates line totals, applies previous balance, generates a printed-quality memo. 7 product lines × 6 size variants, real-time total.</div><span className="feat-tag">Order management</span></div>
                            <div className="feat"><div className="feat-n">02</div><div className="feat-t">Rolling dealer ledger</div><div className="feat-d">Every dealer has a live account — 11 columns including prev balance, grand total, paid, running due, advance credit, and bank split. Payments via bank/bKash/cash reconciled. ৳2,49,24,450 total tracked.</div><span className="feat-tag">Finance</span></div>
                            <div className="feat"><div className="feat-n">03</div><div className="feat-t">Automated commission engine</div><div className="feat-d">SR commissions at ৳15/kg calculated automatically from monthly lifting volume. Handles partial months, advance deductions, and multi-SR territories. 22 commission events structured from raw notes.</div><span className="feat-tag">HR / Payroll</span></div>
                            <div className="feat"><div className="feat-n">04</div><div className="feat-t">Structured returns register</div><div className="feat-d">18 return events classified by type: product return, damage, production defect, short delivery. Each linked to original memo, with estimated kg and value, credit status, and resolution timeline.</div><span className="feat-tag">Returns</span></div>
                            <div className="feat"><div className="feat-n">05</div><div className="feat-t">Versioned price catalog</div><div className="feat-d">6 product lines × 32+ SKU variants with observed price evolution across 14 months. Chili +20.3%, Coriander +13.8%, Cumin +27.6% — tracked with effective dates and reason codes.</div><span className="feat-tag">Products</span></div>
                            <div className="feat"><div className="feat-n">06</div><div className="feat-t">Executive analytics dashboard</div><div className="feat-d">Monthly revenue + payments dual chart, outstanding dues by dealer, product mix donut, stacked volume trend, dealer performance ranking — all real data, zero manual work.</div><span className="feat-tag">Analytics</span></div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section>
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide fade">
                        <div className="eyebrow">04 — Before & After</div>
                        <h2>Same workflows.<br/>Completely different <em>outcomes</em>.</h2>
                        <p className="body-copy">The business didn't change. The structure around it did. Here's what the same daily tasks looked like before and after — in time, accuracy, and visibility.</p>
                        
                        <div className="ba-grid">
                            <div className="ba-card">
                                <div className="ba-head before"><div className="ba-dot"></div><div className="ba-lbl">Before — Google Sheet</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Checking a dealer's balance</strong> — scroll to their section, find the last row, add columns manually. 3–5 minutes per dealer.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Month-end commission</strong> — SR lifts kg manually totalled, multiplied by ৳15, typed into a notes cell. One wrong row ruins the figure.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Recording a return</strong> — note added to nearest memo cell. No quantity, no reason code, no credit link. Invisible to anyone who didn't write it.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Onboarding a new dealer</strong> — copy 106 columns from previous dealer block, adjust headers. Risk of formula error on every cell.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-bad">✕</span><div><strong style={{ fontWeight: 500 }}>Monthly business overview</strong> — impossible without manually summing across all 14 dealer sections. Never happened in practice.</div></div>
                            </div>
                            
                            <div className="ba-card">
                                <div className="ba-head after"><div className="ba-dot"></div><div className="ba-lbl">After — Integrated ERP</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Checking a dealer's balance</strong> — dashboard card shows current due, advance credit, last payment. Visible in under 3 seconds.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Month-end commission</strong> — calculated automatically from dispatch records. SR territory × monthly kg × ৳15 = confirmed total, no manual input.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Recording a return</strong> — structured entry: product, quantity, type, credit status. Linked to original memo. Inventory adjusted in real time.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Onboarding a new dealer</strong> — one record added to the dealers table. Ledger, commission tracking, inventory all work immediately.</div></div>
                                <div className="ba-row"><span className="ba-mark bm-good">✓</span><div><strong style={{ fontWeight: 500 }}>Monthly business overview</strong> — dashboard KPIs, revenue chart, product mix, and dealer ranking update automatically from live data.</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* IMPACT SECTION */}
            <section id="impact" className="alt">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="wide fade">
                        <div className="eyebrow">05 — Results</div>
                        <h2>Numbers from the system.<br/><em>Not</em> projections.</h2>
                        <p className="body-copy">109 transactions. 14 dealers. 14 months. All figures below are pulled directly from live operation — nothing estimated, nothing modelled.</p>
                        
                        <div className="alerts">
                            <div className="alert danger">
                                <div className="al-icon">!</div>
                                <div className="al-title">Outstanding Dues — ৳15,46,032 across 9 accounts</div>
                            </div>
                            <div className="alert warn">
                                <div className="al-icon">~</div>
                                <div className="al-title">18 Return Events · ~2,100 kg unresolved stock</div>
                            </div>
                            <div className="alert info">
                                <div className="al-icon">↑</div>
                                <div className="al-title">Revenue 66× growth — Sep 2022 to Oct 2023</div>
                            </div>
                        </div>
                        
                        <div className="g4" style={{ marginBottom: 14 }}>
                            <div className="impact-stat"><div className="stat-num">2.37</div><span className="stat-unit">Crore BDT · Total order value</span><div className="stat-desc">109 delivery memos fully reconciled with bank, bKash, and cash across 14 dealer accounts</div></div>
                            <div className="impact-stat"><div className="stat-num">88,699</div><span className="stat-unit">KG · Total dispatched</span><div className="stat-desc">Chili 52% · Turmeric 28% · Coriander 19% · Tea & others 2% — tracked per SKU per delivery</div></div>
                            <div className="impact-stat"><div className="stat-num">66×</div><span className="stat-unit">Revenue growth</span><div className="stat-desc">Monthly value from ৳57,640 (Sep 2022) to ৳38,70,740 (Oct 2023) — largest month on record</div></div>
                            <div className="impact-stat"><div className="stat-num">14</div><span className="stat-unit">Dealer accounts</span><div className="stat-desc">9 new accounts onboarded in one quarter (Feb–Apr 2023) without losing any balance history</div></div>
                        </div>
                        
                        <div className="chart-card">
                            <div className="cc-head"><div className="cc-t">Monthly order value vs payments received — Sep 2022 to Oct 2023</div><div className="cc-s">৳ actual · 14 months</div></div>
                            <div className="cc-body"><canvas ref={chartRef} id="impact-chart" role="img" aria-label="Monthly order value vs payments received, Sep 2022 to Oct 2023"></canvas></div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="demo" style={{ padding: 0, background: 'var(--off)', borderTop: '1px solid var(--ln)' }}>
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="demo-top">
                        <div>
                            <div className="eyebrow" style={{ marginBottom: 16 }}>06 — Live System</div>
                            <h2>The full ERP.<br/>Running real data.</h2>
                        </div>
                        <div className="demo-right">All 14 modules fully functional. Every figure is real — 14 months of R Group's actual operations. Use the sidebar to navigate between Dashboard, Ledger, Order Entry, Returns, Analytics, and more.</div>
                    </div>
                    <div className="browser-bar">
                        <div className="b-dots"><div className="b-dot"></div><div className="b-dot"></div><div className="b-dot"></div></div>
                        <div className="b-url">rgroup-erp.app / dashboard · DOHA Brand · Sylhet Division</div>
                        <div className="b-live">LIVE DATA</div>
                    </div>
                    <div className="erp-wrap" id="erp-container" style={{ minHeight: 720, overflow: 'hidden', marginBottom: 80 }}>
                        <ErpDemo />
                    </div>
                </div>
            </section>

            {/* 07 DESIGN HYPOTHESIS */}
            <div id="artifacts" className="artifact-section fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">07 — Design Hypothesis</div>
                        <h2>From a hunch to a<br/>working <em>system</em>.</h2>
                        <p className="body-copy">Five stages of real thinking — from noticing the problem to finding a pattern nobody saw before. Click each stage to read the actual reasoning.</p>
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

            {/* 08 HOW IT WORKS */}
            <div className="artifact-section alt fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">08 — How It Works</div>
                        <h2>One delivery.<br/><em>Eight system events.</em></h2>
                        <p className="body-copy">Creating a delivery memo isn't a single action — it cascades through eight modules automatically. Click each stage to see exactly what happens behind the interface.</p>
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

            {/* 09 DESIGN APPROACH */}
            <div className="artifact-section fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">09 — Design Approach</div>
                        <h2>Model the data.<br/><em>Then</em> the interface.</h2>
                        <p className="body-copy">Most tools are built interface-first — screens before systems, features before data models. This project reversed that order deliberately. Here's what that changed.</p>
                    </div>
                    <div className="artifact-content">
                        <div className="da-principles" style={{ marginBottom: 10 }}>
                            <div className="da-p">
                                <div className="da-pn">Principle 01</div>
                                <div className="da-pt">The current mess is the spec</div>
                                <div className="da-pd">Start with what's actually happening, not what should happen. The 106-column sheet wasn't wrong to study — it was a complete map of every workflow the business had ever needed. Read the mess before writing a single line.</div>
                            </div>
                            <div className="da-p">
                                <div className="da-pn">Principle 02</div>
                                <div className="da-pt">Model entities before screens</div>
                                <div className="da-pd">No wireframes until the data model is settled. A bad data model makes every screen wrong by definition. A good one makes the screens obvious — they're just views over the entities that already exist.</div>
                            </div>
                            <div className="da-p">
                                <div className="da-pn">Principle 03</div>
                                <div className="da-pt">One module, one concern</div>
                                <div className="da-pd">Ledger handles finance. Returns handles stock. Commission handles payroll. Each module owns its slice of the data model and surfaces only what's relevant. The dashboard aggregates — it doesn't own anything.</div>
                            </div>
                            <div className="da-p">
                                <div className="da-pn">Principle 04</div>
                                <div className="da-pt">Every number must be traceable</div>
                                <div className="da-pd">If a balance shows ৳1,26,988 advance, you must be able to click through to the exact memos that produced it. Numbers without provenance are guesses. The ledger shows prev_balance, order_total, paid, and net — all verifiable.</div>
                            </div>
                            <div className="da-p">
                                <div className="da-pn">Principle 05</div>
                                <div className="da-pt">Automate what repeats manually</div>
                                <div className="da-pd">Commission math done by hand every month: automate it. Outstanding balance found by scrolling: surface it. These aren't feature requests — they're failure modes of the current system that have a real cost every time they happen.</div>
                            </div>
                            <div className="da-p">
                                <div className="da-pn">Principle 06</div>
                                <div className="da-pt">The system must survive without me</div>
                                <div className="da-pd">Everything is documented inline. Every formula is visible. Every module can be understood by someone who didn't build it. A system that only makes sense to its builder is a liability, not an asset.</div>
                            </div>
                        </div>
                        <div className="da-contrast">
                            <div className="da-col">
                                <div className="da-ch bad">What I didn't do</div>
                                <div className="da-crow"><span className="da-cm x">✕</span><div>Start with a mockup and retrofit the data model around it</div></div>
                                <div className="da-crow"><span className="da-cm x">✕</span><div>Ask what features they wanted and build a feature list</div></div>
                                <div className="da-crow"><span className="da-cm x">✕</span><div>Adapt a generic ERP template to the workflow</div></div>
                                <div className="da-crow"><span className="da-cm x">✕</span><div>Use a framework that added abstraction without value</div></div>
                                <div className="da-crow"><span className="da-cm x">✕</span><div>Build for every possible future use case upfront</div></div>
                            </div>
                            <div className="da-col">
                                <div className="da-ch good">What I did instead</div>
                                <div className="da-crow"><span className="da-cm v">✓</span><div>Parsed the actual sheet — 109 rows, 106 columns, all data extracted</div></div>
                                <div className="da-crow"><span className="da-cm v">✓</span><div>Mapped what the business actually does, then modelled it</div></div>
                                <div className="da-crow"><span className="da-cm v">✓</span><div>Built from scratch around the exact workflow observed in the data</div></div>
                                <div className="da-crow"><span className="da-cm v">✓</span><div>Chose the minimal stack that could do the job cleanly</div></div>
                                <div className="da-crow"><span className="da-cm v">✓</span><div>Built exactly what the current process needs, nothing more</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 10 STACK USED */}
            <div className="artifact-section alt fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">10 — Stack Used</div>
                        <h2>No framework.<br/><em>No dependencies.</em></h2>
                        <p className="body-copy">Every tool chosen because it was the right fit — not because it was fashionable. The core constraint: must run in a browser, deploy as a file, require zero backend infrastructure.</p>
                    </div>
                    <div className="artifact-content">
                        <div className="sk-grid">
                            <div className="sk-card">
                                <div className="sk-ch"><span className="sk-cat">Data layer</span><span className="sk-why">Source of truth</span></div>
                                <div className="sk-row">
                                    <div className="sk-icon">GS</div>
                                    <div>
                                        <div className="sk-name">Google Sheets (source data)</div>
                                        <div className="sk-desc">109 transactions, 14 dealers, 14 months of raw data. The original 106-column TSV exported and parsed with Python to extract every figure used in the system.</div>
                                        <span className="sk-tag-sm">Python 3 · csv module</span>
                                    </div>
                                </div>
                                <div className="sk-row">
                                    <div className="sk-icon">JS</div>
                                    <div>
                                        <div className="sk-name">Inline JS data objects</div>
                                        <div className="sk-desc">All 109 orders, 14 dealer ledgers, 22 commission events, 18 returns — embedded as structured JS constants. No API, no database, no server calls. Zero latency.</div>
                                        <span className="sk-tag-sm">Works offline · Instant load</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sk-card">
                                <div className="sk-ch"><span className="sk-cat">Frontend</span><span className="sk-why">Render & interaction</span></div>
                                <div className="sk-row">
                                    <div className="sk-icon">H5</div>
                                    <div>
                                        <div className="sk-name">Vanilla HTML / CSS / JavaScript</div>
                                        <div className="sk-desc">No React, no Vue, no bundler. One HTML file — the entire ERP is 147KB including all data, styles, and logic. Loads instantly on any connection.</div>
                                        <span className="sk-tag-sm">Single file · No build step</span>
                                    </div>
                                </div>
                                <div className="sk-row">
                                    <div className="sk-icon">CJ</div>
                                    <div>
                                        <div className="sk-name">Chart.js 4.4</div>
                                        <div className="sk-desc">All data visualisations — dual revenue/payment bar, stacked volume, outstanding dues, product donut, commission events. Loaded from CDN, UMD global.</div>
                                        <span className="sk-tag-sm">cdnjs · 5 chart types</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sk-card">
                                <div className="sk-ch"><span className="sk-cat">Typography</span><span className="sk-why">Hierarchy & tone</span></div>
                                <div className="sk-row">
                                    <div className="sk-icon">IS</div>
                                    <div>
                                        <div className="sk-name">Plus Jakarta Sans</div>
                                        <div className="sk-desc">Used for all display headings, KPI numerics, and body copy. The portfolio-consistent choice — geometric but warm, heavy weights provide authority without being sterile.</div>
                                        <span className="sk-tag-sm">Google Fonts · 400–800 weight</span>
                                    </div>
                                </div>
                                <div className="sk-row">
                                    <div className="sk-icon">Ge</div>
                                    <div>
                                        <div className="sk-name">JetBrains Mono</div>
                                        <div className="sk-desc">Every data field, label, code value, and metric uses JetBrains Mono — the same monospace used across the portfolio. Creates instant visual separation between prose and data.</div>
                                        <span className="sk-tag-sm">JetBrains · Google Fonts · 400–700</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sk-card">
                                <div className="sk-ch"><span className="sk-cat">Design system</span><span className="sk-why">Consistency</span></div>
                                <div className="sk-row">
                                    <div className="sk-icon">CS</div>
                                    <div>
                                        <div className="sk-name">Custom CSS design tokens</div>
                                        <div className="sk-desc">All colours, spacing, and radius values stored as CSS custom properties. Entire visual language — off-white background, ink hierarchy, line weights — defined in one :root block.</div>
                                        <span className="sk-tag-sm">14 colour tokens · 3 radius values</span>
                                    </div>
                                </div>
                                <div className="sk-row">
                                    <div className="sk-icon">SC</div>
                                    <div>
                                        <div className="sk-name">Class-scoped ERP embedding</div>
                                        <div className="sk-desc">The ERP is embedded inside this case study page without an iframe. All ERP styles are namespace-scoped under .erp-embed to prevent cascade conflicts with the outer page.</div>
                                        <span className="sk-tag-sm">No iframe · Class scoping</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sk-note">
                            <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>Why no framework?</strong> The system needed to run as a single deployable file — no server, no build process, no dependency management. A React or Next.js app would add 300KB of runtime for zero user-visible benefit. Vanilla JS handles all 14 modules, live filtering, chart rendering, and form state in under 50KB of code. The constraint produced a better architecture.
                        </div>
                    </div>
                </div>
            </div>

            {/* 11 KEY LEARNINGS */}
            <div className="artifact-section fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">11 — Key Learnings</div>
                        <h2>Six things I know now<br/>I <em>didn't</em> before.</h2>
                        <p className="body-copy">Every project teaches something you can't learn from reading. These are the specific lessons that came from 14 months of real distribution data. Click each one.</p>
                    </div>
                    <div className="artifact-content">
                        <div className="lrn-list" id="lrn-list">
                            {learningsData.map((item, index) => (
                                <div 
                                    key={index}
                                    className={`lrn-item ${activeLearning === index ? 'on' : ''}`}
                                    onClick={() => setActiveLearning(index)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setActiveLearning(index); }}
                                >
                                    <div className="lrn-num">0{index + 1}</div>
                                    <div>
                                        <div className="lrn-cat">{item.cat}</div>
                                        <div className="lrn-title">{item.title}</div>
                                        <div className="lrn-body">
                                            {item.body}
                                            <div className="lrn-verdict">{item.verdict}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="lrn-note">
                            <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>What I'd do differently:</strong> I'd instrument the system from day one — log every balance change, every commission calculation, every return approval with a timestamp and a user. The current system is accurate but not auditable in the forensic sense. That's the next version.
                        </div>
                    </div>
                </div>
            </div>

            {/* 12 BROADER CONTEXT */}
            <div className="artifact-section alt fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">12 — Broader Context</div>
                        <h2>One business.<br/>A model for <em>hundreds</em>.</h2>
                        <p className="body-copy">R Group is one FMCG distributor in Sylhet. But the problems it had — and the system that fixed them — describe hundreds of similar operations across Bangladesh.</p>
                    </div>
                    <div className="artifact-content">
                        <div className="wb-two">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div className="wb-quote">
                                    <div className="wb-q">"We know the number is wrong. We just don't know which one, or by how much."</div>
                                    <div className="wb-src">— R Group management · Sep 2022</div>
                                </div>
                                <div className="wb-stats">
                                    <div className="wb-stat"><div className="wb-sn">৳15.5L</div><div className="wb-sl">Outstanding dues invisible in old sheet</div></div>
                                    <div className="wb-stat"><div className="wb-sn">106</div><div className="wb-sl">Columns in the original spreadsheet</div></div>
                                    <div className="wb-stat"><div className="wb-sn">18</div><div className="wb-sl">Returns buried in free-text notes</div></div>
                                    <div className="wb-stat"><div className="wb-sn">0</div><div className="wb-sl">Systems tracking commission automatically</div></div>
                                </div>
                            </div>
                            <div className="wb-reasons">
                                <div className="wb-rh">Why this matters beyond R Group</div>
                                <div className="wb-point">
                                    <div className="wb-pd"></div>
                                    <div>
                                        <div className="wb-pt">Most small FMCG distributors run on spreadsheets and memory</div>
                                        <div className="wb-pp">Off-the-shelf ERP software is too expensive, too complex, and built for completely different workflows. What works is a lean, purpose-built system that matches exactly how each business operates.</div>
                                    </div>
                                </div>
                                <div className="wb-point">
                                    <div className="wb-pd"></div>
                                    <div>
                                        <div className="wb-pt">The people aren't the problem — the tools are</div>
                                        <div className="wb-pp">The R Group team was smart and capable. They weren't failing due to incompetence. They were failing because the tool they had was never designed for their workflow. The system fixed that.</div>
                                    </div>
                                </div>
                                <div className="wb-point">
                                    <div className="wb-pd"></div>
                                    <div>
                                        <div className="wb-pt">This build is also a proof of concept</div>
                                        <div className="wb-pp">A system with 14 dealers, commission tracking, multi-channel payments, and real-time inventory doesn't need a developer and a database. It needs careful system thinking and the right constraints. This is the proof.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 13 HOW I WORK */}
            <section style={{ padding: '80px 0', borderTop: '1px solid var(--ln)' }} className="bg-white fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="eyebrow" style={{ marginBottom: 16 }}>13 — How I Work</div>
                    <h2 style={{ fontSize: 'clamp(38px,5vw,56px)', fontFamily: 'var(--serif)', color: 'var(--ink)', lineHeight: 1.1 }}>From messy<br/>to <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--brand)' }}>maintainable</em>.</h2>
                    <div className="process-row">
                        <div className="ps">
                            <div className="ps-num">01</div>
                            <div className="ps-title">Start with the mess</div>
                            <div className="ps-desc">I begin with what's actually happening — not the ideal version. The current chaos is the complete specification. Every column, every note, every workaround tells me something the business needed but never found a proper home for.</div>
                        </div>
                        <div className="ps">
                            <div className="ps-num">02</div>
                            <div className="ps-title">Define entities first</div>
                            <div className="ps-desc">No screens until the data model is settled. Dealer, Order, Product, Payment, Staff — five entities, not 106 columns. A correct model makes every screen obvious. A bad one makes every screen wrong by definition.</div>
                        </div>
                        <div className="ps">
                            <div className="ps-num">03</div>
                            <div className="ps-title">Ship the core loop early</div>
                            <div className="ps-desc">Order → ledger → balance. The minimum working system reaches real users with real data before anything else is built. Features come from actual friction in the field, not assumptions made at a desk.</div>
                        </div>
                        <div className="ps">
                            <div className="ps-num">04</div>
                            <div className="ps-title">Hand over with clarity</div>
                            <div className="ps-desc">Every system I build is self-documenting and trainable without me present. The client's business should never depend on my availability. A system that only I can run is a liability — not an asset.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 14 CTA */}
            <section className="py-24 md:py-32 bg-white border-t border-slate-200">
                <div className="max-w-[660px] mx-auto text-center fade">
                    <div className="font-mono text-[12px] text-slate-400 tracking-[2px] uppercase mb-6 flex items-center justify-center gap-2.5">
                        Get in touch
                    </div>
                    <h2 className="font-sans text-[clamp(38px,5.5vw,62px)] text-slate-900 leading-[1.05] tracking-[-0.4px] mb-[18px] font-bold">
                        Running on spreadsheets<br/>and <em className="italic text-slate-400 font-semibold">workarounds?</em>
                    </h2>
                    <p className="text-[16px] text-slate-500 leading-[1.82] font-light max-w-[520px] mx-auto mb-11">
                        If your business uses WhatsApp for orders, Excel for commissions, and memory for balances — I can help you understand what a proper system looks like. No jargon, no upsell. Just a conversation.
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

export default NewCaseStudy;

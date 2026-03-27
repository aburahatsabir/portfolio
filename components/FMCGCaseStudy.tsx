import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import ErpDemo from './ErpDemo';

const CS_MK = ['Sep 22','Oct 22','Nov 22','Dec 22','Jan 23','Feb 23','Mar 23','Apr 23','May 23','Jun 23','Jul 23','Aug 23','Sep 23','Oct 23'];
const CS_MR = [57640,213170,231246,307205,397325,547170,1237775,1130650,2727150,3064550,2142300,4451500,3324056,3870740];
const CS_MP = [59510,166200,182132,280342,515703,547475,1010680,1225595,3032364,3170390,1938850,4637350,3319535,4549324];

const FMCGCaseStudy: React.FC = () => {
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

                .fmcg-case-study .ta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 52px; }
                .fmcg-case-study .ta-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 28px 24px; }
                .fmcg-case-study .ta-cat { font-family: var(--mono); font-size: 10px; color: var(--brand); letter-spacing: 1.8px; text-transform: uppercase; margin-bottom: 14px; font-weight: 500; }
                .fmcg-case-study .ta-title { font-size: 17px; font-weight: 600; color: var(--ink); margin-bottom: 18px; line-height: 1.35; letter-spacing: -0.02em; }
                .fmcg-case-study .ta-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
                .fmcg-case-study .ta-item { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; color: var(--ink2); line-height: 1.65; font-weight: 300; }
                .fmcg-case-study .ta-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--brand); flex-shrink: 0; margin-top: 7px; }
                @media(max-width:900px){ .fmcg-case-study .ta-grid { grid-template-columns: 1fr 1fr; gap: 16px; } }
                @media(max-width:600px){ .fmcg-case-study .ta-grid { grid-template-columns: 1fr; } }

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

            <section id="hero">
                <div className="hero-grid"></div>
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="hero-inner">
                        <div className="hero-content">
                            <h1 className="fade d2">
                                Integrated FMCG<br />Distribution <em>ERP</em>
                            </h1>
                            <p className="lead fade d3">
                                A 106-column spreadsheet couldn't keep up with a business growing 66× in 14 months.
                                I replaced it with a modular, field-ready operations system — purpose-built for R Group's DOHA Brand distribution across Sylhet Division.
                            </p>
                            
                            <div className="hero-meta fade d4">
                                <div className="hm">
                                    <div className="hm-label">Role</div>
                                    <div className="hm-val">Systems Builder</div>
                                </div>
                                <div className="hm">
                                    <div className="hm-label">Industry</div>
                                    <div className="hm-val">FMCG Distribution</div>
                                </div>
                                <div className="hm">
                                    <div className="hm-label">Timeline</div>
                                    <div className="hm-val">Sep 2022 – Oct 2023</div>
                                </div>
                                <div className="hm">
                                    <div className="hm-label">Stack</div>
                                    <div className="hm-val">Sheets → Custom ERP</div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual fade d3">
                            <div className="structure-container">
                                {(() => {
                                    const s = 40;
                                    const dx = s * 0.866;
                                    const dy = s * 0.5;
                                    const iso = (c, r, h) => ({
                                        x: c * dx - r * dx,
                                        y: c * dy + r * dy - h * s
                                    });

                                    const cubes = [
                                        // layer 0 (3x3)
                                        {c:0,r:0,h:0}, {c:1,r:0,h:0}, {c:2,r:0,h:0},
                                        {c:0,r:1,h:0}, {c:1,r:1,h:0}, {c:2,r:1,h:0},
                                        {c:0,r:2,h:0}, {c:1,r:2,h:0}, {c:2,r:2,h:0},
                                        // layer 1
                                        {c:0,r:0,h:1}, {c:1,r:0,h:1}, {c:2,r:0,h:1},
                                        {c:0,r:1,h:1}, {c:1,r:1,h:1},
                                        {c:0,r:2,h:1},
                                        // layer 2
                                        {c:0,r:0,h:2}, {c:1,r:0,h:2},
                                        {c:0,r:1,h:2}
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
                                                <linearGradient id="topGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                                                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                                                </linearGradient>
                                                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
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
                                                            <polygon points={`0,${-s} ${dx},${-dy} 0,0 ${-dx},${-dy}`} fill="url(#topGlow)" opacity="0.6"/>
                                                        </g>
                                                    );
                                                })}

                                                {/* UI Tag 3: Database (Attached to front corner) */}
                                                <g className="ui-overlay" transform={`translate(${p2.x}, ${p2.y})`}>
                                                    <circle cx="0" cy="0" r="2" fill="var(--brand)" />
                                                    <path d="M 0 0 L 0 30 L -20 30" fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.5" />
                                                    <rect x="-116" y="21" width="92" height="18" rx="2" fill="rgba(255,255,255,0.9)" stroke="var(--ln)" filter="url(#shadow)" />
                                                    <circle cx="-108" cy="30" r="3.5" fill="var(--brand)" />
                                                    <text x="-98" y="33" fontSize="8" fontFamily="var(--mono)" letterSpacing="0.05em" fill="var(--ink2)" fontWeight="600">CENTRAL DATABASE</text>
                                                </g>

                                                {/* UI Tag 1: Inventory (Attached to top of static stack) */}
                                                {(() => {
                                                    const top = iso(0, 0, 2);
                                                    return (
                                                        <g className="ui-overlay" transform={`translate(${top.x}, ${top.y - s})`}>
                                                            <circle cx="0" cy="0" r="2" fill="var(--brand)" />
                                                            <path d="M 0 0 L 0 -30 L -20 -30" fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.5" />
                                                            <rect x="-106" y="-39" width="82" height="18" rx="2" fill="rgba(255,255,255,0.9)" stroke="var(--ln)" filter="url(#shadow)" />
                                                            <circle cx="-98" cy="-30" r="3.5" fill="var(--brand)" />
                                                            <text x="-88" y="-27" fontSize="8" fontFamily="var(--mono)" letterSpacing="0.05em" fill="var(--ink2)" fontWeight="600">LIVE INVENTORY</text>
                                                        </g>
                                                    );
                                                })()}

                                                {/* Moving 'Dispatched' Cube at (2,2,2) */}
                                                <g className="dispatched-cube">
                                                    {(() => {
                                                        const p = iso(2, 2, 2);
                                                        return (
                                                            <g transform={`translate(${p.x}, ${p.y})`}>
                                                                {/* Cube Poly */}
                                                                <polygon points={`0,${-s} ${dx},${-dy} 0,0 ${-dx},${-dy}`} fill="rgba(99, 102, 241, 0.4)" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="0.8" />
                                                                <polygon points={`${-dx},${-dy} 0,0 0,${s} ${-dx},${dy}`} fill="rgba(79, 70, 229, 0.6)" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
                                                                <polygon points={`0,0 ${dx},${-dy} ${dx},${dy} 0,${s}`} fill="rgba(49, 46, 129, 0.85)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
                                                                <polygon points={`0,${-s} ${dx},${-dy} 0,0 ${-dx},${-dy}`} fill="url(#topGlow)" opacity="0.9"/>
                                                                
                                                                {/* UI Tag 2: Dispatch */}
                                                                <g className="ui-overlay">
                                                                    <circle cx="0" cy={-s} r="2" fill="var(--brand)" />
                                                                    <path d={`M 0 ${-s} L 0 ${-s - 30} L 20 ${-s - 30}`} fill="none" stroke="var(--brand)" strokeWidth="1" opacity="0.5" />
                                                                    <rect x="24" y={-s - 39} width="84" height="18" rx="2" fill="rgba(255,255,255,0.9)" stroke="var(--ln)" filter="url(#shadow)" />
                                                                    <circle cx="32" cy={-s - 30} r="3.5" fill="#10B981" />
                                                                    <text x="40" y={-s - 27} fontSize="8" fontFamily="var(--mono)" letterSpacing="0.05em" fill="var(--ink2)" fontWeight="600">AUTO DISPATCH</text>
                                                                </g>
                                                            </g>
                                                        );
                                                    })()}
                                                </g>
                                            </g>
                                        </svg>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
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

            {/* 09 TECHNICAL APPROACH */}
            <div className="artifact-section fade">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="artifact-header">
                        <div className="eyebrow">09 · Technical Approach</div>
                        <h2>Built for <em>operational simplicity</em>,<br/>not technical novelty.</h2>
                        <p className="body-copy">Every tool was chosen to minimise maintenance burden on a small ops team — prioritising reliability, auditability, and field usability over sophistication.</p>
                    </div>
                    <div className="ta-grid">
                        <div className="ta-card">
                            <div className="ta-cat">Data Layer</div>
                            <div className="ta-title">Source of Truth</div>
                            <ul className="ta-list">
                                <li className="ta-item"><div className="ta-dot"></div>Google Sheets (109 rows × 106 columns, original source)</li>
                                <li className="ta-item"><div className="ta-dot"></div>Python 3 extraction — all 14 months parsed with csv module</li>
                                <li className="ta-item"><div className="ta-dot"></div>Inline JS constants — zero API, zero database, zero latency</li>
                                <li className="ta-item"><div className="ta-dot"></div>5 core entities: Dealer · Order · Product · Payment · Staff</li>
                                <li className="ta-item"><div className="ta-dot"></div>Works fully offline · Instant load on any connection</li>
                            </ul>
                        </div>
                        <div className="ta-card">
                            <div className="ta-cat">Frontend</div>
                            <div className="ta-title">Interface Layer</div>
                            <ul className="ta-list">
                                <li className="ta-item"><div className="ta-dot"></div>Vanilla HTML / CSS / JavaScript — no framework, no bundler</li>
                                <li className="ta-item"><div className="ta-dot"></div>Single deployable HTML file · 147 KB including all data</li>
                                <li className="ta-item"><div className="ta-dot"></div>Chart.js 4.4 — 5 chart types, loaded via CDN UMD global</li>
                                <li className="ta-item"><div className="ta-dot"></div>Mobile-first layout — every workflow operable in under 30 s</li>
                                <li className="ta-item"><div className="ta-dot"></div>No build step · No dependency management required</li>
                            </ul>
                        </div>
                        <div className="ta-card">
                            <div className="ta-cat">Design System</div>
                            <div className="ta-title">Hierarchy &amp; Tone</div>
                            <ul className="ta-list">
                                <li className="ta-item"><div className="ta-dot"></div>Plus Jakarta Sans — display, KPI numerics, body copy (400–800)</li>
                                <li className="ta-item"><div className="ta-dot"></div>JetBrains Mono — all data fields, labels &amp; code values</li>
                                <li className="ta-item"><div className="ta-dot"></div>14 CSS custom-property colour tokens · 3 radius values</li>
                                <li className="ta-item"><div className="ta-dot"></div>Class-scoped ERP embed — no iframe, no cascade conflicts</li>
                                <li className="ta-item"><div className="ta-dot"></div>Consistent ink hierarchy across all 8 modules</li>
                            </ul>
                        </div>
                        <div className="ta-card">
                            <div className="ta-cat">Deployment</div>
                            <div className="ta-title">Constraint by Design</div>
                            <ul className="ta-list">
                                <li className="ta-item"><div className="ta-dot"></div>Single file constraint — forces every decision toward simplicity</li>
                                <li className="ta-item"><div className="ta-dot"></div>No server infrastructure — runs on any static host or locally</li>
                                <li className="ta-item"><div className="ta-dot"></div>Self-documenting modules — auditable by anyone in the business</li>
                                <li className="ta-item"><div className="ta-dot"></div>Zero external dependencies beyond Chart.js CDN</li>
                                <li className="ta-item"><div className="ta-dot"></div>Survives without the builder — fully operable on handover</li>
                            </ul>
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

export default FMCGCaseStudy;

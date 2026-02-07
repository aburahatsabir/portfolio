import { Project, Experience, Testimonial, PostMortemEntry, SuccessStory, IndustryBlueprint, Standard, BlogPost } from '../types';

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'ss1',
    clientName: 'Prominent Tec',
    industry: 'Corporate',
    challenge: 'Handling complex C-suite schedules and sensitive board-level travel across multiple timezones manually.',
    solution: 'Engineered an automated Support Cluster using Apps Script to synchronize cross-timezone logic and confidential filings.',
    metrics: [
      { label: 'Time Reclaimed', value: '450+ Hrs/Yr' },
      { label: 'Error Rate', value: '0.00%' }
    ],
    logo: './images/logos/logo-prominent-tec.webp',
    outcomeDescription: 'Neutralized scheduling conflicts entirely while reclaiming 90% of manual compilation time.'
  },
  {
    id: 'ss2',
    clientName: 'Healthcare Logistics',
    industry: 'Medical Ops',
    challenge: 'Managing the complex lifecycle of 3,100+ patients with fragmented manual visa and clinical document checks.',
    solution: 'Architected a governed patient pipeline with automated verification gates and a unified relational ledger.',
    metrics: [
      { label: 'Volume Managed', value: '3,100+ Patients' },
      { label: 'Pipeline Failure', value: '0.0%' }
    ],
    logo: './images/logos/logo-greenotex.webp',
    outcomeDescription: 'Achieved 100% clinical documentation compliance and eliminated 48-hour reporting lags.'
  },
  {
    id: 'ss3',
    clientName: 'FMCG Wholesaler',
    industry: 'Supply Chain',
    challenge: 'High-volume wholesale invoicing with 15-20% order shortfalls due to manual ledger blindness.',
    solution: 'Deployed a "One Source of Truth" relational ERP layer that enforced credit limits and live stock validation.',
    metrics: [
      { label: 'Invoicing Speed', value: '80% Gain' },
      { label: 'Pricing Accuracy', value: '100%' }
    ],
    logo: './images/logos/logo-modern-accessories.webp',
    outcomeDescription: 'Eliminated ghost inventory sales and reclaimed à§³3L monthly in previously untracked revenue leakage.'
  }
];

import { Project, Experience, Testimonial, PostMortemEntry, SuccessStory, IndustryBlueprint, Standard, BlogPost } from '../types';

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'ss1',
    clientName: 'Prominent Tec',
    industry: 'Executive Operations',
    operationalRisk: 'Manual C-suite scheduling across time zones created conflict risk and overhead.',
    systemBuilt: 'Automated executive support cluster with timezone logic, travel controls, and routing.',
    measuredOutcome: 'Eliminated scheduling conflicts. Reduced board prep 90%, freeing leadership for strategic work.',
    metrics: [
      { label: 'Executive Time Reclaimed', value: '450+ hrs/year' },
      { label: 'Scheduling Error Rate', value: '0.00%' }
    ],
    logo: './images/logos/logo-prominent-tec.webp'
  },
  {
    id: 'ss2',
    clientName: 'Healthcare Logistics Network',
    industry: 'Medical Operations',
    operationalRisk: 'Fragmented manual checks for 3,100+ patient cases created compliance gaps and delays.',
    systemBuilt: 'Governed pipeline with automated verification gates, status controls, and unified ledger.',
    measuredOutcome: 'Achieved 100% compliance. Eliminated 48-hour reporting lag for near real-time visibility.',
    metrics: [
      { label: 'Records Governed', value: '3,100+ patients' },
      { label: 'Pipeline Failure Rate', value: '0.0%' }
    ],
    logo: './images/logos/logo-greenotex.webp'
  },
  {
    id: 'ss3',
    clientName: 'FMCG Wholesaler',
    industry: 'Distribution and Supply Chain',
    operationalRisk: 'Disconnected ledgers caused inventory blind spots, credit breaches, and order shortfalls.',
    systemBuilt: 'Single-source ERP layer with live stock validation, pricing controls, and credit-limit enforcement.',
    measuredOutcome: 'Eliminated ghost sales. Recovered BDT 300,000 monthly through tighter transactional control.',
    metrics: [
      { label: 'Invoicing Cycle Compression', value: '80% faster' },
      { label: 'Pricing Accuracy', value: '100%' }
    ],
    logo: './images/logos/logo-modern-accessories.webp'
  }
];

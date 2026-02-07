import { Project, Experience, Testimonial, PostMortemEntry, SuccessStory, IndustryBlueprint, Standard, BlogPost } from '../types';

export const INDUSTRY_BLUEPRINTS: IndustryBlueprint[] = [
  {
    id: 'supply-chain',
    industry: 'Supply Chain',
    title: 'Relational FMCG Inventory Hub',
    description: 'Architecting a relational ERP layer on top of legacy spreadsheets for high-volume wholesale distribution.',
    compliance: ['Financial Integrity', 'Audit Transparency'],
    coreStack: ['VBA', 'Query Language', 'Relational Schema'],
    architectureMap: [
      { layer: 'Ingestion', components: ['Point of Sale', 'Vendor EDI'] },
      { layer: 'Logic', components: ['Relational Ledger', 'Credit Controller'] },
      { layer: 'Output', components: ['Auto-Invoicing', 'Tax Compliance'] }
    ],
    nightmareScenario: 'Inventory lag causing double-selling of physical stock.',
    preventativeArchitecture: 'Implemented Atomic Locking logic that snapshots inventory state before transaction finalization.'
  },
  {
    id: 'healthcare-ops',
    industry: 'Healthcare',
    title: 'International Patient Pipeline',
    description: 'A governance engine for multi-national patient logistics, managing 3,100+ lifecycle records with zero pipeline failure.',
    compliance: ['HIPAA Equivalent', 'Process Sovereignty'],
    coreStack: ['Apps Script', 'Cloud Triggers', 'M365'],
    architectureMap: [
      { layer: 'Intake', components: ['Global Agent Portal', 'Hospital Webhooks'] },
      { layer: 'Operations', components: ['Visa Automation', 'Clinical Tracking'] },
      { layer: 'Financial', components: ['Commission Rec', 'Payout Ledger'] }
    ],
    nightmareScenario: 'Patient arriving at international borders without valid invitation artifacts.',
    preventativeArchitecture: 'Hard-coded artifact verification gates that block travel logistics until clinical documents are hash-verified.'
  },
  {
    id: 'corporate-fin',
    industry: 'Corporate Finance',
    title: 'Audit-Ready Payroll Kernel',
    description: 'A deterministic payroll engine for multi-entity enterprises that eliminates pro-rata variances across disparate regions.',
    compliance: ['Labour Act 2006', 'SOX Compliance'],
    coreStack: ['Deterministic Arithmetic', 'LaTeX', 'VBA'],
    architectureMap: [
      { layer: 'Policy', components: ['Salary Matrix', 'Grade Lock'] },
      { layer: 'Runtime', components: ['Pro-Rata Engine', 'Tax Calculator'] },
      { layer: 'Audit', components: ['LaTeX Payslips', 'Compliance Trace'] }
    ],
    nightmareScenario: 'Unauthorized salary promises creating multi-year legal liability.',
    preventativeArchitecture: 'Policy Kernel locking that requires RSA-style multi-sig approval for any deviation from the base matrix.'
  }
];

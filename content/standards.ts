import { Project, Experience, Testimonial, PostMortemEntry, SuccessStory, IndustryBlueprint, Standard, BlogPost } from '../types';

export const ENGINEERING_STANDARDS: Standard[] = [
  {
    title: 'Idempotency Guarantees',
    technicalTerm: 'Idempotency',
    executiveBenefit: 'Prevent Double-Billing & Duplicate Work.',
    description: 'Ensuring that even if an automation triggers twice due to a network glitch, the action is only executed once.',
    icon: 'idempotency'
  },
  {
    title: 'Zero Data Loss Protocol',
    technicalTerm: 'DLQ Management',
    executiveBenefit: '100% Operational Continuity.',
    description: 'When systems fail, data is diverted to a holding bay for automatic retry or manual review.',
    icon: 'dlq'
  }
];

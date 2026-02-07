import { Project, Experience, Testimonial, PostMortemEntry, SuccessStory, IndustryBlueprint, Standard, BlogPost } from '../types';

export const POST_MORTEMS: PostMortemEntry[] = [
  {
    id: 'INC-2024-012',
    title: 'Schedule Conflict Prevention: The Timezone Logic Gap',
    date: 'Feb 2024',
    severity: 'High',
    incident: 'A multi-national travel booking nearly conflicted with a Board of Directors meeting.',
    rootCause: 'Lack of automated TZ verification in the legacy scheduling sheet.',
    resolution: 'Developed an automated timezone normalization script in Google Apps Script.',
    failSafeBuilt: 'Implemented a "Meeting Collision Detection" system that blocks conflicting calendar invites.',
    impact: 'Zero board meeting misses and 100% accurate international travel coordination.',
    tags: ['C-Suite Support', 'Google Apps Script', 'Governance']
  }
];

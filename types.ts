export interface PostMortemEntry {
  id: string;
  title: string;
  date: string;
  severity: 'Critical' | 'High' | 'Medium';
  incident: string;
  rootCause: string;
  resolution: string;
  failSafeBuilt: string;
  impact: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
  tags?: string[];
  content: string;
  image: string; // Added image property
  author: {
    name: string;
    role: string;
    avatar?: string; // Added avatar property
  };
}

export interface Standard {
  title: string;
  executiveBenefit: string;
  technicalTerm: string;
  description: string;
  icon: string;
}

export interface IndustryBlueprint {
  id: string;
  industry: string;
  title: string;
  description: string;
  compliance: string[];
  coreStack: string[];
  architectureMap: {
    layer: string;
    components: string[];
  }[];
  nightmareScenario: string;
  preventativeArchitecture: string;
}

export interface SuccessStory {
  id: string;
  clientName: string;
  industry: string;
  operationalRisk: string;
  systemBuilt: string;
  measuredOutcome: string;
  metrics: { label: string; value: string }[];
  logo: string;
  // Legacy fields for backward compatibility
  challenge?: string;
  solution?: string;
  outcomeDescription?: string;
}

export interface GovernanceMetric {
  label: string;
  value: string;
  status: 'optimal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export interface Project {
  id: string;
  title: string;
  headline?: string;
  badge?: string;
  category: 'Automation' | 'Systems' | 'Governance' | 'Finance';
  description: string;
  image: string;
  client: string;
  impact: string;
  technologies: string[];
  relevantFor?: string[]; // Persona tags for discovery
  confidential?: boolean;
  performanceData?: number[];
  systemSpecs?: { label: string; value: string }[];
  dataSchema?: string[];
  auditControls?: string[];
  postMortem?: {
    risk: string;
    resolution: string;
  };
  fullCaseStudy?: {
    challenge: string;
    solution: string;
    result: string;
    painPoints?: string[];
  };
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  logo: string;
  philosophyEvolution: string;
  cumulativeAsset: string;
  hardLessonLearned: string;
  systemBuilt: string;
  complexityScale: 'Small Team' | 'Scaling Startup' | 'Enterprise Operations' | 'Global Architecture';
  narrativeStage: 'Chaos Remediation' | 'Standardized Architecture' | 'Autonomous Sovereignty';
  metrics?: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Testimonial {
  name: string;
  position: string;
  content: string;
  avatar: string;
  linkedInProfile?: string; // LinkedIn profile URL for the person
  companyLinkedIn?: string; // LinkedIn company page URL
}
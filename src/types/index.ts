export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: 'iot' | 'monitoring' | 'software' | 'automation' | 'consulting';
  scopePoints: string[];
  deliverables: string[];
  idealFor: string;
}

export interface WorkflowStageItem {
  id: string;
  stepNumber: string;
  layerBadge: string;
  title: string;
  shortDescription: string;
  detailPoints: string[];
  icon: 'device' | 'gateway' | 'processing' | 'dashboard';
}

export interface CapabilityBandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: 'device' | 'architecture' | 'visualization' | 'planning';
}

export interface PortfolioConceptItem {
  id: string;
  title: string;
  category: string;
  conceptBadge: string;
  thumbType: 'monitoring' | 'dashboard' | 'integration';
  shortSummary: string;
  fullExplanation: string;
  architectureHighlights: string[];
  tags: string[];
  disclaimer: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: 'context' | 'integration' | 'clarity' | 'scalability';
}

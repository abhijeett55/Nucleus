export type PlanId = 'build' | 'pro' | 'scale' | 'enterprise';

export type ToggleMode = 'sdk' | 'editor';
 
export interface PlanFeature {
  label: string;
  build: string | boolean;
  pro: string | boolean;
  scale: string | boolean;
  enterprise: string | boolean;
}
 
export interface PlanFeatureSection {
  title: string;
  rows: PlanFeature[];
}

export interface Plan {
    id: PlanId;
    name: string;
    description: string;
    price: string | 'Custom';
    priceSuffix?: string;
    ctaLabel: string;
    ctaVariant: 'neutral' | 'accent' | 'highlight';
    highlight?: boolean;
    usage: string[];
}
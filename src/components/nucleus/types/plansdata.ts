import type { Plan, PlanFeatureSection, ToggleMode } from '../types/plans';

export function getPlansForMode(mode: ToggleMode): Plan[] {
  if (mode === 'editor') {
    return [
      {
        id: 'build',
        name: 'Build',
        description: 'For learning and experimenting',
        price: '$0',
        ctaLabel: 'Continue on Build',
        ctaVariant: 'neutral',
        usage: ['Up to 40 hours of monthly VM credits', 'Unlimited Sandboxes & Devboxes'],
      },
      {
        id: 'pro',
        name: 'Pro',
        description: 'Pay as you go with a monthly subscription',
        price: '$12',
        priceSuffix: 'per month\nper workspace',
        ctaLabel: 'Start your Pro plan',
        ctaVariant: 'accent',
        highlight: true,
        usage: ['Start from 100 hours of monthly VM credits', 'Unlimited Sandboxes & Devboxes'],
      },
    ];
  }

  return [
    {
      id: 'build',
      name: 'Build',
      description: 'For learning and experimenting',
      price: '$0',
      ctaLabel: 'Continue on Build',
      ctaVariant: 'neutral',
      usage: ['Up to 40 hours of monthly VM credits', 'Unlimited Sandboxes & Devboxes'],
    },
    {
      id: 'scale',
      name: 'Scale',
      description: 'Use CodeSandbox SDK with higher limits',
      price: '$170',
      priceSuffix: 'per month\nper workspace',
      ctaLabel: 'Start your Scale plan',
      ctaVariant: 'accent',
      highlight: true,
      usage: ['Start from 1,000 hours of monthly VM credits', 'Unlimited Sandboxes & Devboxes'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Cloud development & code execution at scale',
      price: 'Custom',
      ctaLabel: 'Contact us',
      ctaVariant: 'highlight',
      usage: ['Custom VM credit allocation', 'Dedicated infrastructure & support'],
    },
  ];
}

export const PLAN_FEATURE_SECTIONS: PlanFeatureSection[] = [
  {
    title: 'Usage',
    rows: [
      { label: 'Members', build: '5', pro: '20', scale: '20', enterprise: 'Unlimited' },
      { label: 'Sandboxes', build: 'Unlimited', pro: 'Unlimited', scale: 'Unlimited', enterprise: 'Unlimited' },
      { label: 'Devboxes', build: 'Unlimited', pro: 'Unlimited', scale: 'Unlimited', enterprise: 'Unlimited' },
    ],
  },
  {
    title: 'Platform',
    rows: [
      { label: 'CodeSandbox SDK', build: true, pro: true, scale: true, enterprise: true },
      { label: 'Concurrent Devboxes', build: '5', pro: '20', scale: '50', enterprise: 'Unlimited' },
    ],
  },
];
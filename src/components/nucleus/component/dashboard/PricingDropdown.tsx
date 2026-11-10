import { useState, useRef } from 'react';
import './DropdownDashboard.css';
import type { DropdownItem } from '../../types/dropdown';

const ITEMS: DropdownItem[] = [
  {
    id: 'build',
    title: 'Build',
    description: 'Start free and ship your first project.',
    href: '/upgrade?plan=build',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 6l-4 6 4 6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 6l4 6-4 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'scale',
    title: 'Scale',
    description: 'Higher limits and priority support as you grow.',
    href: '/upgrade?plan=scale',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    description: 'Custom security, SSO, and dedicated support.',
    href: '/upgrade?plan=enterprise',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="3" width="10" height="18" rx="1" />
        <rect x="14" y="8" width="6" height="13" rx="1" />
        <path d="M7 7h1M7 11h1M7 15h1M10 7h1M10 11h1M10 15h1" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function PricingDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
  }

  function handleLeave() {
    closeTimeout.current = setTimeout(() => setIsOpen(false), 120);
  }

  return (
    <div className="dropdown-nav-item" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="dropdown-trigger" aria-expanded={isOpen}>
        Pricing
      </button>
      {isOpen && (
        <div className="dropdown-panel" role="menu">
          {ITEMS.map((item) => (
            <a key={item.id} href={item.href} className="dropdown-panel-item" role="menuitem">
              <span className="dropdown-panel-icon">{item.icon}</span>
              <span className="dropdown-panel-text">
                <span className="dropdown-panel-title">{item.title}</span>
                <span className="dropdown-panel-description">{item.description}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
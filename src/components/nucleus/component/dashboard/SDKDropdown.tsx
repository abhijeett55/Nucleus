import { useState, useRef } from 'react';
import './DropdownDashboard.css';
import type { DropdownItem } from '../../types/dropdown';

const ITEMS: DropdownItem[] = [
  {
    id: 'sdk-overview',
    title: 'SDK Overview',
    description: 'Programmatically spin up dev environments.',
    href: '/sdk',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" strokeLinejoin="round" />
        <path d="M12 3v9M12 12l8-4.5M12 12l-8-4.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'javascript-sdk',
    title: 'JavaScript SDK',
    description: 'Manage sandboxes from Node.js or the browser.',
    href: '/sdk/javascript',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 5l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 17h7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'python-sdk',
    title: 'Python SDK',
    description: 'Automate sandbox creation from Python scripts.',
    href: '/sdk/python',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8M12 8v8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'sdk-examples',
    title: 'Examples',
    description: 'Ready-to-run recipes for common integrations.',
    href: '/sdk/examples',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M9 9l-3 3 3 3M15 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'sdk-pricing',
    title: 'SDK Pricing',
    description: 'Usage-based pricing for programmatic sandboxes.',
    href: '/upgrade',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 4v16M8 8c0-1.7 1.8-3 4-3s4 1.3 4 3-1.8 3-4 3-4 1.3-4 3 1.8 3 4 3 4-1.3 4-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function SDKDropdown() {
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
        SDK
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
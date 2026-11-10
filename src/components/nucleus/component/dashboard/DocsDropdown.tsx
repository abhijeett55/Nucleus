import { useState, useRef } from 'react';
import './DropdownDashboard.css';
import type { DropdownItem } from '../../types/dropdown';

const ITEMS: DropdownItem[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Set up your first project in minutes.',
    href: '/docs/getting-started',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 4L2 9l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    description: 'Every endpoint, parameter, and response shape.',
    href: '/docs/api',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M9 9l-3 3 3 3M15 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'guides',
    title: 'Guides',
    description: 'Step-by-step walkthroughs for common tasks.',
    href: '/docs/guides',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 4h9l3 3v13H6V4z" strokeLinejoin="round" />
        <path d="M15 4v3h3" strokeLinejoin="round" />
        <path d="M9 11h6M9 15h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'cli',
    title: 'CLI Reference',
    description: 'Commands and flags for the command line tool.',
    href: '/docs/cli',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 5l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 17h7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'changelog-docs',
    title: 'Changelog',
    description: 'Check out our latest features and fixes.',
    href: '/changelog',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          d="M12 3l2 2 2.8-.5.8 2.7 2.7.8-.5 2.8 2 2-2 2 .5 2.8-2.7.8-.8 2.7-2.8-.5-2 2-2-2-2.8.5-.8-2.7-2.7-.8.5-2.8-2-2 2-2-.5-2.8 2.7-.8.8-2.7 2.8.5z"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function DocsDropdown() {
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
        Docs
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
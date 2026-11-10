import { useState, useRef } from 'react';
import './DropdownDashboard.css';
import type { DropdownItem } from '../../types/dropdown';

const ITEMS: DropdownItem[] = [
  {
    id: 'docs',
    title: 'Documentation',
    description: 'Guides and references to get you unblocked.',
    href: '/docs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 4h9l3 3v13H6V4z" strokeLinejoin="round" />
        <path d="M15 4v3h3" strokeLinejoin="round" />
        <path d="M9 11h6M9 15h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'help-center',
    title: 'Help Center',
    description: 'Answers to common questions and issues.',
    href: '/help',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path
          d="M9.5 9.5a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2-2.4 3.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Support',
    description: 'Reach our team for account or billing help.',
    href: '/contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 5h16v11H8l-4 4V5z" strokeLinejoin="round" />
        <path d="M8 9h8M8 12h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'status',
    title: 'System Status',
    description: 'Live uptime and incident history.',
    href: '/status',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 17l4-6 4 3 4-8 4 5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'community-support',
    title: 'Community',
    description: 'Ask other developers and share solutions.',
    href: '/community',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="9" cy="10" r="3" />
        <circle cx="16" cy="10" r="3" />
        <path
          d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5M11 19c0-2.8 2.2-5 5-5s5 2.2 5 5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function SupportDropdown() {
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
        Support
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
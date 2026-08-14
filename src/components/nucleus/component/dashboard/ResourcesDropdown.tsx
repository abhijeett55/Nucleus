import { useState, useRef } from 'react';
import './DropdownDashboard.css';
import type { DropdownItem } from '../types/dropdown';


const ITEMS: DropdownItem[] = [
  {
    id: 'templates',
    title: 'Templates',
    description: 'Find inspiration for your next project.',
    href: '/templates',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 6l-4 6 4 6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 6l4 6-4 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Read news and insights from our team.',
    href: '/blog',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 9h8M8 13h8M8 17h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Engage with other community members.',
    href: '/community',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="9" cy="10" r="3" />
        <circle cx="16" cy="10" r="3" />
        <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5M11 19c0-2.8 2.2-5 5-5s5 2.2 5 5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'changelog',
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

export function ResourcesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
  }

  function handleLeave() {
    // Small delay so moving the mouse from the trigger into the panel
    // doesn't flicker the dropdown closed in between.
    closeTimeout.current = setTimeout(() => setIsOpen(false), 120);
  }

  return (
    <div className="dropdown-nav-item" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="dropdown-trigger" aria-expanded={isOpen}>
        Resources
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
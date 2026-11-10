import { useState, useRef } from 'react';
import './DropdownDashboard.css';
import type { DropdownItem } from '../../types/dropdown';

const ITEMS: DropdownItem[] = [
  {
    id: 'sandboxes',
    title: 'Sandboxes',
    description: 'Instant, isolated environments for any stack.',
    href: '/features/sandboxes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M9 9l-3 3 3 3M15 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'devboxes',
    title: 'Devboxes',
    description: 'Full-power cloud dev environments, always on.',
    href: '/features/devboxes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" strokeLinejoin="round" />
        <path d="M12 3v9M12 12l8-4.5M12 12l-8-4.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'live-collaboration',
    title: 'Live Collaboration',
    description: 'Code together in real time, no setup needed.',
    href: '/features/collaboration',
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
  {
    id: 'preview-deploys',
    title: 'Preview Deploys',
    description: 'Share a live link to any branch instantly.',
    href: '/features/deploys',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v12" strokeLinecap="round" />
        <path d="M8 11l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Give agents real, isolated compute to run code.',
    href: '/features/ai-agents',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="5" y="7" width="14" height="11" rx="2" />
        <path d="M9 3v4M15 3v4" strokeLinecap="round" />
        <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export function FeaturesDropdown() {
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
        Features
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
import { useState, useRef } from 'react';
import './DropdownDashboard.css';
import type { DropdownItem } from '../types/dropdown';


const ITEMS: DropdownItem[] = [
  {
    id: 'sdk',
    title: 'CodeSandbox SDK',
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
    id: 'sandpack',
    title: 'Sandpack',
    description: 'Live coding in the browser.',
    href: '/sandpack',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 4l12 8-12 8V4z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'storybook',
    title: 'Storybook Integration',
    description: 'Give a code playground to every story.',
    href: '/storybook',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 4h7l3 3v13H7V4z" strokeLinejoin="round" />
        <path d="M14 4v3h3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'code-in-sandboxes',
    title: 'Code in Sandboxes',
    description: 'Prototype your ideas in record time.',
    href: '/code-in-sandboxes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M9 9l-3 3 3 3M15 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'learn-experiment',
    title: 'Learn & Experiment',
    description: 'Try frameworks and experiment new tools.',
    href: '/learn',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 4L2 9l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];



export function UseCasesDropdown() {
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
        Use Cases
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
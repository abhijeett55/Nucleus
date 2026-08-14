import { useState, useEffect, useRef } from 'react';
import './HeaderDashboard.css';
import { ResourcesDropdown } from './ResourcesDropdown';
import { UseCasesDropdown } from './UseCasesDropdown';
import logo from '@/assets/logo.png';


export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node) &&
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="header">
        {/* Left: Menu toggle + Logo */}
        <div className="header-left">
          <button
            className="menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars"></i>
          </button>

          <a href="/" className="logo">
            <img src={logo} alt="Nucleus" className="logo-box" />
            
            <div className="logo-text">
              <h2>Nucleus</h2>
              <span>v1.0</span>
            </div>
          </a>
        </div>

        {/* Navigation (desktop) */}
        <nav>
          <ul className="nav-links">
            <li><a href="/home">Features</a></li>
            <li> <UseCasesDropdown /></li>
            <li><a href="/sdk">SDK</a></li>
            <li> <ResourcesDropdown /></li>
            <li><a href="/docs">Docs</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/upgrade">Pricing</a></li>
          </ul>
        </nav>

        {/* Right: Search, icons, profile, actions */}
        <div className="header-right">

          <button className="icon-btn" aria-label="Notifications">
            <i className="far fa-bell"></i>
          </button>

          <div className="actions">
            <button className="signin">Sign In</button>
            <button className="signup">Try for Paid</button>
          </div>
        </div>
      </header>

      {/* Mobile slide‑out menu */}
      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        ref={overlayRef}
        onClick={closeMenu}
      ></div>

      <nav
        className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
        ref={mobileNavRef}
      >
        <button className="close-btn" onClick={closeMenu} aria-label="Close menu">
          <i className="fas fa-times"></i>
        </button>

        <a href="/">Features</a>
        <a href="/">Use Cases</a>
        <a href="/">SDK</a>
        <a href="/">Resources</a>
        <a href="/">Docs</a>
        <a href="/">Support</a>
        <a href="/">Pricing</a>

        <div className="mobile-actions">
          <button className="signin-mobile">Sign In</button>
          <button className="signup-mobile">Try for Paid</button>
        </div>
      </nav>
    </>
  );
}
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './Headerhome.css';
import type { HeaderHomeProps } from '../types/headerhome';


export function HeaderHome({ onSearch, userName }: HeaderHomeProps) {
  const { user, logout } = useAuth();
  const displayName = userName ?? user?.name ?? 'User';

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);



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


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  
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
      <header className="generic-header">
        {/* Left: Menu toggle + Logo */}
        <div className="header-left">
          <button
            className="menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-icon">☰</span>
          </button>

          <a href="/dashboard" className="logo">
            <div className="logo-box"></div>
            <div className="logo-text">
              <h2>Nucleus</h2>
              <span>workspace</span>
            </div>
          </a>
        </div>

        {/* Navigation (desktop) */}
        <nav>
          <ul className="nav-links">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/dashboard">Overview</a></li>
            <li><a href="/dashboard">Projects</a></li>
            <li><a href="/dashboard">Activity</a></li>
            <li><a href="/dashboard">Settings</a></li>
          </ul>
        </nav>

        {/* Right: Search, user, logout */}
        <div className="header-right">
          <div className="header-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search in workspace"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>

          <div className="header-user">
            <span className="avatar">👤</span>
            <span className="username">{displayName}</span>
          </div>

          <button className="logout-btn" onClick={logout} aria-label="Log out">
            Log out
          </button>
        </div>
      </header>

      {/* Mobile slide-out menu */}
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
          ✕
        </button>

        <a href="/dashboard">Overview</a>
        <a href="/dashboard">Projects</a>
        <a href="/dashboard">Activity</a>
        <a href="/dashboard">Settings</a>

        <div className="mobile-user">
          <span className="avatar">👤</span>
          <span className="username">{displayName}</span>
        </div>

        <div className="mobile-actions">
          <button className="logout-btn-mobile" onClick={logout}>
            Log out
          </button>
        </div>
      </nav>
    </>
  );
}
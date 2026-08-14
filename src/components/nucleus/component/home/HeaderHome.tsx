import { useAuth } from '../../hooks/useAuth';
import './Headerhome.css';
import type { HeaderHomeProps } from '../types/headerhome';
import logo from '@/assets/logo.png';


export function HeaderHome({ userName }: HeaderHomeProps) {
  const { user, logout } = useAuth();
  const displayName = userName ?? user?.name ?? 'User';

  return (
    <>
      <header className="generic-header">
        <div className="header-left">
          <button
            className="menu-btn"
            aria-label="Toggle menu"
          >
            <span className="hamburger-icon">☰</span>
          </button>

          <a href="/dashboard" className="logo">
            <img src={logo} alt="Nucleus" className="logo-box" />
            <div className="logo-text">
              <h2>Nucleus</h2>
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

          <div className="header-user">
            <span className="avatar">👤</span>
            <span className="username">{displayName}</span>
          </div>

          <button className="logout-btn" onClick={logout} aria-label="Log out">
            Log out
          </button>
        </div>
      </header>
    </>
  );
}
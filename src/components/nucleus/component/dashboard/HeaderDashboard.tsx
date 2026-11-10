import { useState } from 'react';
import axios from 'axios';
import './HeaderDashboard.css';
import { ResourcesDropdown } from './ResourcesDropdown';
import { UseCasesDropdown } from './UseCasesDropdown';
import { PricingDropdown } from './PricingDropdown';
import { SupportDropdown } from './SupportDropdown';
import { SDKDropdown } from './SDKDropdown';
import { FeaturesDropdown } from './FeaturesDropdown';
import { DocsDropdown } from './DocsDropdown';
import logo from '@/assets/logo.png';

type BellState = 'idle' | 'loading' | 'subscribed' | 'error';

export function Header() {
  const [bellState, setBellState] = useState<BellState>('idle');
  const handleBellClick = async () => {
    if (bellState === 'loading' || bellState === 'subscribed') return;

    setBellState('loading');
    try {
      const token = localStorage.getItem('token'); 
      await axios.post(
        `${import.meta.env.VITE_AUTH_API_BASE_URL}/notifications/subscribe`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBellState('subscribed');
    } catch (err) {
      console.error('Notification subscribe failed:', err);
      setBellState('error');
      setTimeout(() => setBellState('idle'), 3000);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="logo">
          <img src={logo} alt="Nucleus" className="logo-box" />
          <div className="logo-text">
            <h2>Nucleus</h2>
            <span>v1.0</span>
          </div>
        </a>
      </div>
      <nav>
        <ul className="nav-links">
          <li><FeaturesDropdown /></li>
          <li><UseCasesDropdown /></li>
          <li><SDKDropdown /></li>
          <li><ResourcesDropdown /></li>
          <li><DocsDropdown /></li>
          <li><SupportDropdown /></li>
          <li><PricingDropdown /></li>
        </ul>
      </nav>
      <div className="header-right">
        <button
          className={`icon-btn ${bellState === 'subscribed' ? 'active' : ''}`}
          aria-label="Notifications"
          onClick={handleBellClick}
          disabled={bellState === 'loading'}
          title={
            bellState === 'subscribed'
              ? 'Subscribed — check your email'
              : bellState === 'error'
              ? 'Something went wrong, try again'
              : 'Get notified by email'
          }
        >
          <i className={`fa-bell ${bellState === 'subscribed' ? 'fas' : 'far'}`}></i>
        </button>
        <div className="actions">
          <button className="signin">Sign In</button>
          <button className="signup">Try for Paid</button>
        </div>
      </div>
    </header>
  );
}
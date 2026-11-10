import "./FooterDashboard.css";
import logo from '@/assets/logo.png';

export function Footer() {
  return (
    <footer className="footer-dashboard">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
                <img src={logo} alt="Nucleus" className="footer-logo-box"/>
              <div>
                <div className="footer-logo-text">Nucleus</div>
                <div className="footer-logo-subtitle">
                  a together cool company
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="footer-column">
            <h3>Use Cases</h3>
            <a href="#">CodeSandbox SDK</a>
            <a href="#">Code in Sandboxes</a>
            <a href="#">Storybook Integration</a>
            <a href="#">Learn & Experiment</a>
          </div>

          <div className="footer-column">
            <h3>Ecosystem</h3>
            <a href="#">Features</a>
            <a href="#">VS Code Extension</a>
            <a href="#">Sandpack</a>
            <a href="#">Status</a>
            <a href="#">Pricing</a>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <a href="#">Discover</a>
            <a href="#">Changelog</a>
            <a href="#">Documentation</a>
            <a href="#">Blog</a>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <a href="#">About</a>
            <a href="#">Support</a>
            <a href="#">Careers</a>
            <a href="#">Brand kit</a>
          </div>
        </div>
        
        <div className="footer-divider">
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              Copyright © 2026 Nucleus. All rights reserved.
            </p>

            <div className="footer-legal">
              <a href="#">Terms of Use</a>
              <span>|</span>
              <a href="#">Privacy & Cookie Policy</a>
            </div>
          </div>
          <div className="footer-socials">
            <a href="#" aria-label="GitHub">GH</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Website">◎</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
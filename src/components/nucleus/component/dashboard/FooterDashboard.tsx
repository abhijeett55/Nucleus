import "./FooterDashboard.css";

export function Footer() {
  return (
    <footer className="footer-dashboard">
      <div className="footer-container">

        {/* Top footer */}
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-box"></div>
              <div>
                <div className="footer-logo-text">Nucleus</div>
                <div className="footer-logo-subtitle">
                  a together.ai company
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

          {/* Ecosystem */}
          <div className="footer-column">
            <h3>Ecosystem</h3>
            <a href="#">Features</a>
            <a href="#">VS Code Extension</a>
            <a href="#">Sandpack</a>
            <a href="#">Status</a>
            <a href="#">Pricing</a>
          </div>

          {/* Explore */}
          <div className="footer-column">
            <h3>Explore</h3>
            <a href="#">Discover</a>
            <a href="#">Changelog</a>
            <a href="#">Documentation</a>
            <a href="#">Blog</a>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h3>Company</h3>
            <a href="#">About</a>
            <a href="#">Support</a>
            <a href="#">Careers</a>
            <a href="#">Brand kit</a>
          </div>

        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom footer */}
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

          {/* Social links */}
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
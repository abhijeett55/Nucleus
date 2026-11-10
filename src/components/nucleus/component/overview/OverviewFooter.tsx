export function OverviewFooter() {
  return (
    <footer className="ov-footer">
      <div className="ov-footer-row">
        <span className="ov-footer-brand">Nucleus</span>
        <nav className="ov-footer-links">
          <a href="/playground">Playground</a>
          <a href="/docs">Docs</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/signup">Sign in</a>
        </nav>
      </div>
      <p className="ov-footer-note">
        Built for practicing and judging code, one test case at a time.
      </p>
    </footer>
  );
}
import './CentreDashboard.css';

export function Centre() {
  return (
    <main className="center-dashboard">
      <div className="center-dashboard-container">

        <h1 className="center-title">
          <span>Sandboxes</span>
          <br />
          built for scale
        </h1>

        <p className="center-description">
          Programmatically spin up isolated sandboxes for instant
          <br />
          code execution in your AI agents and code playgrounds.
        </p>

        <div className="center-actions">
          <button className="start-button">
            Start for free
          </button>

          <button className="sdk-button">
            Try CodeSandbox SDK
            <span>›</span>
          </button>
        </div>

      </div>
    </main>
  );
}
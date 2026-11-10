interface Feature {
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Multi-language execution',
    body: 'Send source code and stdin to a real execution backend and get stdout, stderr, and an exit code back — not a canned response.',
  },
  {
    title: 'Test case batches',
    body: 'Attach expected output to each case and run them together. Every case reports its own pass state, timing, and memory use.',
  },
  {
    title: 'Live verdicts',
    body: 'ACCEPTED, WRONG_ANSWER, and timeout states resolve the same way they would on a real judge, per case and overall.',
  },
  {
    title: 'Session-aware history',
    body: 'Authenticated sessions keep a record of what a user has run, so progress survives a refresh or a new device.',
  },
  {
    title: 'Graceful fallback',
    body: 'If the execution backend is unreachable, a simulated runner keeps the editor usable instead of failing outright.',
  },
  {
    title: 'Batch timing and memory',
    body: 'Aggregate totals — total time, peak memory — roll up automatically once every case in a batch has finished.',
  },
];

export function FeatureGrid() {
  return (
    <section className="ov-section">
      <h2>Everything a judge needs</h2>
      <div className="ov-feature-grid">
        {FEATURES.map((f) => (
          <div className="ov-feature" key={f.title}>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
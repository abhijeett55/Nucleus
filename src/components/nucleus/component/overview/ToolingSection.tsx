const TOOLS = [
  {
    name: 'Editor',
    body: 'Syntax highlighting and language switching live in one pane, so moving between languages doesn\u2019t break flow.',
  },
  {
    name: 'Language picker',
    body: 'Swap the target runtime per submission without leaving the problem you\u2019re working on.',
  },
  {
    name: 'Test runner',
    body: 'Run a whole batch at once and see pass counts, per-case results, and totals in a single response.',
  },
  {
    name: 'Dashboard',
    body: 'Every run and submission rolls up into a per-user view of what\u2019s been attempted and what still needs work.',
  },
];

export function ToolingSection() {
  return (
    <section className="ov-section ov-section-alt">
      <h2>Built for fast iteration</h2>
      <div className="ov-tool-list">
        {TOOLS.map((t) => (
          <div className="ov-tool-row" key={t.name}>
            <span className="ov-tool-name">{t.name}</span>
            <p>{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
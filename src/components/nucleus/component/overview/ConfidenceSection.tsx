const CASES = [
  { name: 'Empty input', status: 'ACCEPTED' as const },
  { name: 'Single element', status: 'ACCEPTED' as const },
  { name: 'Duplicate values', status: 'ACCEPTED' as const },
  { name: 'No valid pair', status: 'WRONG_ANSWER' as const },
];

export function ConfidenceSection() {
  const passed = CASES.filter((c) => c.status === 'ACCEPTED').length;

  return (
    <section className="ov-section">
      <h2>Know exactly why a submission failed</h2>
      <p className="ov-section-lead">
        A batch doesn't just pass or fail as a whole. Each case in the
        sequence reports its own result, so the first broken assumption is
        easy to find.
      </p>

      <div className="ov-case-list">
        {CASES.map((c, i) => (
          <div className="ov-case-row" key={c.name}>
            <span className="ov-case-index">{i + 1}</span>
            <span className="ov-case-name">{c.name}</span>
            <span
              className={
                c.status === 'ACCEPTED'
                  ? 'ov-verdict ov-verdict-accepted'
                  : 'ov-verdict ov-verdict-wrong'
              }
            >
              {c.status}
            </span>
          </div>
        ))}
      </div>

      <div className="ov-case-summary">
        {passed} of {CASES.length} test cases passed
      </div>
    </section>
  );
}
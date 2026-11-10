import { useEffect, useState } from 'react';

const SNIPPET = [
  'function twoSum(nums, target) {',
  '  const seen = new Map();',
  '  for (let i = 0; i < nums.length; i++) {',
  '    const need = target - nums[i];',
  '    if (seen.has(need)) return [seen.get(need), i];',
  '    seen.set(nums[i], i);',
  '  }',
  '}',
];

export function Hero() {
  const [verdict, setVerdict] = useState<'running' | 'accepted'>('running');

  useEffect(() => {
    const t = setTimeout(() => setVerdict('accepted'), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="ov-hero">
      <div className="ov-hero-copy">
        <h1>
          Write code. Run it against real test cases.
          <br />
          See the verdict.
        </h1>
        <p>
          Nucleus is a multi-language execution playground for practicing,
          judging, and shipping code with confidence — built around the same
          pass/fail signal a real online judge gives you.
        </p>
        <div className="ov-hero-actions">
          <a className="ov-btn ov-btn-primary" href="#playground">
            Open the playground
          </a>
          <a className="ov-btn ov-btn-ghost" href="#docs">
            Read the docs
          </a>
        </div>
      </div>

      <div className="ov-hero-panel" aria-hidden="true">
        <div className="ov-panel-titlebar">
          <span className="ov-dot" />
          <span className="ov-dot" />
          <span className="ov-dot" />
          <span className="ov-panel-filename">solution.js</span>
        </div>
        <pre className="ov-panel-code">
          {SNIPPET.map((line, i) => (
            <div className="ov-code-line" key={i}>
              <span className="ov-line-no">{i + 1}</span>
              <span>{line}</span>
            </div>
          ))}
        </pre>
        <div className="ov-panel-result">
          <div className="ov-panel-result-row">
            <span
              className={
                verdict === 'accepted'
                  ? 'ov-verdict ov-verdict-accepted'
                  : 'ov-verdict ov-verdict-pending'
              }
            >
              {verdict === 'accepted' ? 'ACCEPTED' : 'RUNNING'}
            </span>
            {verdict === 'accepted' && (
              <span className="ov-panel-stats">18ms · 12.6MB</span>
            )}
          </div>
          <div className="ov-panel-stdout">
            {verdict === 'accepted' ? 'stdout: [0, 1]' : ''}
          </div>
        </div>
      </div>
    </section>
  );
}
import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getPlansForMode, PLAN_FEATURE_SECTIONS } from '../../types/plansdata';
import type { ToggleMode, PlanId } from '../../types/plans';
import './Upgrade.css';

export function UpgradePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [mode, setMode] = useState<ToggleMode>('sdk');
  const plans = getPlansForMode(mode);

  const workspaceName = user?.name ?? 'your workspace';
  const currentPlanName = 'Build'; // wire this to real subscription state once available

  function handleSelectPlan(planId: PlanId) {
    if (planId === 'build') {
      navigate('/dashboard');
      return;
    }
    if (planId === 'enterprise') {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = 'mailto:sales@example.com?subject=Enterprise%20plan%20inquiry';
      return;
    }
    // Route into whatever payment/checkout step 2 of 3 actually is.
    navigate(`/upgrade/checkout?plan=${planId}`);
  }

  return (
    <div className="upgrade-page">
      <button className="upgrade-cancel" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i> Cancel
      </button>

      <div className="upgrade-heading">
        <span className="upgrade-step">Step 1 of 3</span>
        <h1>Choose a plan for {workspaceName}</h1>
        <p className="upgrade-subtitle">
          Your workspace is currently on the <strong>{currentPlanName}</strong> plan.
        </p>
      </div>

      <div className="upgrade-toggle">
        <button
          className={`upgrade-toggle-btn ${mode === 'sdk' ? 'active' : ''}`}
          onClick={() => setMode('sdk')}
        >
          SDK
        </button>
        <button
          className={`upgrade-toggle-btn ${mode === 'editor' ? 'active' : ''}`}
          onClick={() => setMode('editor')}
        >
          Editor
        </button>
      </div>

      <div className={`upgrade-plans-grid plans-${plans.length}`}>
        {plans.map((plan) => (
          <div key={plan.id} className={`plan-card ${plan.highlight ? 'plan-card-highlight' : ''}`}>
            <div className={`plan-card-bar bar-${plan.id}`}></div>
            <div className="plan-card-body">
              <h2>{plan.name}</h2>
              <p className="plan-description">{plan.description}</p>

              <div className="plan-price-block">
                {plan.price !== 'Custom' && <span className="plan-price-from">From</span>}
                <span className="plan-price">{plan.price}</span>
                {plan.priceSuffix && (
                  <span className="plan-price-suffix">
                    {plan.priceSuffix.split('\n').map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                )}
              </div>

              <button
                className={`plan-cta plan-cta-${plan.ctaVariant}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.ctaLabel}
              </button>

              <div className="plan-usage">
                <span className="plan-usage-label">Usage</span>
                {plan.usage.map((item) => (
                  <div key={item} className="plan-usage-row">
                    <i className="fas fa-check"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="upgrade-discount-banner">
        <div>
          <h3>Discounts for education, open source and non-profits.</h3>
          <p>
            Get special conditions and free or low-cost access if you're working on educational
            projects, licensed open-source software, developer community projects, or for
            non-profit organizations.
          </p>
        </div>
        <a
          className="upgrade-learn-more"
          href="mailto:discounts@example.com?subject=Discount%20eligibility"
        >
          Learn more
        </a>
      </div>

      <div className="plan-details">
        <h2>Plan details</h2>

        <table className="plan-details-table">
          <thead>
            <tr>
              <th></th>
              <th>Build</th>
              <th>Pro</th>
              <th>Scale</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {PLAN_FEATURE_SECTIONS.map((section) => (
              <Fragment key={section.title}>
                <tr className="plan-details-section-row">
                  <td colSpan={5}>{section.title}</td>
                </tr>
                {section.rows.map((row) => (
                  <tr key={row.label}>
                    <td className="plan-details-label">{row.label}</td>
                    <td>{renderCell(row.build)}</td>
                    <td>{renderCell(row.pro)}</td>
                    <td>{renderCell(row.scale)}</td>
                    <td>{renderCell(row.enterprise)}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderCell(value: string | boolean) {
  if (typeof value === 'boolean') {
    return value ? <i className="fas fa-check plan-details-check"></i> : <span>—</span>;
  }
  return value;
}
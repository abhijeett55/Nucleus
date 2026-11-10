import "./FeatureDashboard.css";

type Feature = {
  title: string;
  description: string;
  icon: "gear" | "lock" | "server" | "cloud" | "refresh" | "clock";
};

const features: Feature[] = [
  {
    title: "Powerful APIs",
    description:
      "Use our APIs to create isolated development environments (sandboxes) that can run any type of code you need.",
    icon: "gear",
  },
  {
    title: "Secure & isolated",
    description:
      "Every environment runs in isolation, so you can safely run untrusted code without it affecting your system.",
    icon: "lock",
  },
  {
    title: "Ready for scale",
    description:
      "We can handle millions of concurrent VMs and make it easy to provision, manage and decommission VMs.",
    icon: "server",
  },
  {
    title: "Continuous context",
    description:
      "Resume development within the same sandbox after periods of inactivity. With no loss thanks to our snapshots.",
    icon: "cloud",
  },
  {
    title: "Quick start & auto resume",
    description:
      "Our microVM infrastructure allows us to spin up entire VMs, clone them and restore snapshots within 2 seconds.",
    icon: "refresh",
  },
  {
    title: "Customizable hibernation",
    description:
      "Gain total control over periods of inactivity before auto hibernation kicks in.",
    icon: "clock",
  },
];

function FeatureIcon({ type }: { type: Feature["icon"] }) {
  if (type === "gear") {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon">
        <circle cx="32" cy="32" r="9" />
        <path d="M32 8v8M32 48v8M8 32h8M48 32h8M15 15l6 6M43 43l6 6M49 15l-6 6M21 43l-6 6" />
        <path d="M40 14l4 5-3 5 3 5-3 5 3 5-4 5-6-2-4 4-6-2-2-6-6-2 2-6-4-4 4-5-2-6 6-2 2-6 6 2 4-4z" />
      </svg>
    );
  }

  if (type === "lock") {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon">
        <rect x="17" y="27" width="30" height="27" rx="3" />
        <path d="M23 27V19a9 9 0 0 1 18 0v8" />
        <circle cx="32" cy="40" r="2" />
      </svg>
    );
  }

  if (type === "server") {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon">
        <rect x="15" y="13" width="34" height="15" rx="2" />
        <rect x="15" y="35" width="34" height="15" rx="2" />
        <circle cx="22" cy="20.5" r="2" fill="currentColor" stroke="none" />
        <circle cx="22" cy="42.5" r="2" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "cloud") {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon">
        <path d="M18 47h28a10 10 0 0 0 1-20 16 16 0 0 0-30-2 11 11 0 0 0 1 22z" />
      </svg>
    );
  }

  if (type === "refresh") {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon">
        <path d="M20 25a15 15 0 0 1 25-7l4 4" />
        <path d="M49 15v9h-9" />
        <path d="M44 39a15 15 0 0 1-25 7l-4-4" />
        <path d="M15 49v-9h9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="feature-icon">
      <circle cx="32" cy="32" r="19" />
      <path d="M32 21v12l8 6" />
    </svg>
  );
}

export function Feature() {
  return (
    <section className="features-dashboard">
      <div className="features-container">

        <h2 className="features-title">
          Secure code generation
          <br />
          at scale
        </h2>

        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>

              <div className="feature-icon-wrapper">
                <FeatureIcon type={feature.icon} />
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
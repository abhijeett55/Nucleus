import "./CompanyCarouselDashboard.css";

const companies = [
  {
    name: "Intuit",
    logo: "https://cdn.simpleicons.org/intuit",
  },
  {
    name: "Shopify",
    logo: "https://cdn.simpleicons.org/shopify",
  },
  {
    name: "Algolia",
    logo: "https://cdn.simpleicons.org/algolia",
  },
  {
    name: "Google",
    logo: "https://cdn.simpleicons.org/google",
  },
  {
    name: "Intel",
    logo: "https://cdn.simpleicons.org/intel",
  },
  {
    name: "NVIDIA",
    logo: "https://cdn.simpleicons.org/nvidia",
  },
  {
    name: "Atlassian",
    logo: "https://cdn.simpleicons.org/atlassian",
  },
  {
    name: "Uber",
    logo: "https://cdn.simpleicons.org/uber",
  },
];

export function CompanyCarousel() {
  return (
    <div className="company-carousel">
      <div className="company-carousel-track">
        {[...companies, ...companies].map((company, index) => (
          <div className="company-logo" key={index}>
            <img src={company.logo} alt={company.name} />
            <span>{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
import { Hero } from '../../component/overview/Hero';
import { FeatureGrid } from '../../component/overview/FeatureGrid';
import { ToolingSection } from '../../component/overview/ToolingSection';
import { ConfidenceSection } from '../../component/overview/ConfidenceSection';
import { OverviewFooter } from '../../component/overview/OverviewFooter';
import './OverviewPage.css';

export function OverviewPage() {
  return (
    <div className="ov-page">
      <Hero />
      <FeatureGrid />
      <ToolingSection />
      <ConfidenceSection />
      <OverviewFooter />
    </div>
  );
}
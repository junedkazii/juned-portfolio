import ToolLayout from '../../components/ToolLayout';
import MvpCalculator from '../../components/tools/MvpCalculator';
import { pageMeta } from '../../seo';

export const metadata = pageMeta({
  title: "SaaS MVP Cost Calculator (₹ and $)",
  description:
    "How much does a SaaS MVP cost? Pick the features you need and get an instant price and timeline in ₹ or $, based on real fixed-price packages.",
  path: '/tools/mvp-cost-calculator',
});

export default function Page() {
  return (
    <ToolLayout
      slug="mvp-cost-calculator"
      title={[{ t: 'What will your ' }, { t: 'MVP cost?', em: true }]}
      lead="Pick the features you need. You'll see a price range and timeline instantly, based on my real package prices."
    >
      <MvpCalculator />
    </ToolLayout>
  );
}

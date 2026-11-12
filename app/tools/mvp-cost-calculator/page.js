import ToolLayout from '../../components/ToolLayout';
import MvpCalculator from '../../components/tools/MvpCalculator';

export const metadata = {
  title: 'SaaS MVP cost calculator',
  description: 'Pick the features your SaaS needs and get an instant price and timeline estimate, in ₹ or $.',
};

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

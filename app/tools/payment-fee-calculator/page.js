import ToolLayout from '../../components/ToolLayout';
import FeeCalculator from '../../components/tools/FeeCalculator';

export const metadata = {
  title: 'Payment gateway fee calculator',
  description: 'Compare what Razorpay, Stripe India and Dodo Payments take from each sale, for customers in India or abroad.',
};

export default function Page() {
  return (
    <ToolLayout
      slug="payment-fee-calculator"
      title={[{ t: 'What does each gateway ' }, { t: 'really take?', em: true }]}
      lead="Enter your price and where your customers are. See the fee and what lands in your account for Razorpay, Stripe and Dodo Payments."
    >
      <FeeCalculator />
    </ToolLayout>
  );
}

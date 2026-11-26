import ToolLayout from '../../components/ToolLayout';
import FeeCalculator from '../../components/tools/FeeCalculator';
import { pageMeta } from '../../seo';

export const metadata = pageMeta({
  title: "Razorpay vs Stripe vs Dodo Fee Calculator",
  description:
    "Compare what Razorpay, Stripe India and Dodo Payments really take from each sale, including GST, for one-time payments and subscriptions.",
  path: '/tools/payment-fee-calculator',
});

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

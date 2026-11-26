import ToolLayout from '../../components/ToolLayout';
import RescueCheck from '../../components/tools/RescueCheck';
import { pageMeta } from '../../seo';

export const metadata = pageMeta({
  title: "Lovable, Bolt or Replit App Rescue Check",
  description:
    "Built your app with Lovable, Bolt, Emergent or Replit? See what's likely broken before launch: security, payments, hosting and more.",
  path: '/tools/ai-app-rescue-check',
});

export default function Page() {
  return (
    <ToolLayout
      slug="ai-app-rescue-check"
      title={[{ t: 'Built it with AI? ' }, { t: "Let's check it.", em: true }]}
      lead="Answer 8 quick questions about your Lovable, Bolt, Emergent or Replit app. You'll see what's likely broken, how serious it is, and a rough cost to fix."
    >
      <RescueCheck />
    </ToolLayout>
  );
}

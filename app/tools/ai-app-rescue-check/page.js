import ToolLayout from '../../components/ToolLayout';
import RescueCheck from '../../components/tools/RescueCheck';

export const metadata = {
  title: 'AI app rescue check',
  description:
    'Built your app with Lovable, Bolt, Emergent or Replit? Answer 8 quick questions to see what is likely broken and what it costs to fix.',
};

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

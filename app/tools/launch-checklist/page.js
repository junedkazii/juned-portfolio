import ToolLayout from '../../components/ToolLayout';
import LaunchChecklist from '../../components/tools/LaunchChecklist';

export const metadata = {
  title: 'Launch readiness checklist',
  description: '24 checks across domain, emails, payments, security and growth, with a live launch score.',
};

export default function Page() {
  return (
    <ToolLayout
      slug="launch-checklist"
      title={[{ t: 'Is your app ' }, { t: 'ready to launch?', em: true }]}
      lead="Tick what's done. Your score updates live, and the missing items show you exactly what to fix before real users arrive."
    >
      <LaunchChecklist />
    </ToolLayout>
  );
}

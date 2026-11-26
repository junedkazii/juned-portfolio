import ToolLayout from '../../components/ToolLayout';
import LaunchChecklist from '../../components/tools/LaunchChecklist';
import { pageMeta } from '../../seo';

export const metadata = pageMeta({
  title: "SaaS Launch Checklist: 24 Checks Before Going Live",
  description:
    "24 checks across domain, emails, payments and security, with a live score, so your SaaS is ready before real customers arrive.",
  path: '/tools/launch-checklist',
});

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

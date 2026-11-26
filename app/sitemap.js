import { site } from './data';
import { caseStudies, tools } from './content';
import { guides } from './guides/posts';

// Google reads this list at /sitemap.xml to find every page on the site.
// New case studies and tools are added automatically.
export default function sitemap() {
  const now = new Date();
  const pages = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/tools', priority: 0.8, changeFrequency: 'monthly' },
    ...tools.map((t) => ({ path: `/tools/${t.slug}`, priority: 0.7, changeFrequency: 'monthly' })),
    { path: '/guides', priority: 0.8, changeFrequency: 'weekly' },
    ...guides.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.8, changeFrequency: 'monthly' })),
    ...Object.keys(caseStudies).map((slug) => ({ path: `/work/${slug}`, priority: 0.7, changeFrequency: 'monthly' })),
  ];

  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}

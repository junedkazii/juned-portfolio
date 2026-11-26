import { site } from './data';

// Served at /robots.txt: lets every search engine read the whole site
// and tells them where the sitemap is.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

// ───────── Guides (/guides) ─────────
// Each guide is one page at /guides/<slug>. Facts were checked on the date in `updated`
// from the sources listed at the bottom of each guide. Re-check them every few months:
// these tools change fast.
//
// Blocks you can use inside a section:
//   { p: 'A paragraph.' }
//   { ul: ['Bullet', 'Bullet'] }          { ol: ['Step 1', 'Step 2'] }
//   { table: { head: ['A', 'B'], rows: [['1', '2']] } }
//   { note: 'A highlighted tip.' }

const checked = '2026-11-26';

export const guides = [
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'ai-built-app-to-production',
    platform: 'All builders',
    title: 'Built your app with AI? Here’s what breaks before launch',
    seoTitle: 'AI-Built App to Production: What Breaks Before Launch',
    description:
      'Built with Lovable, Bolt, Emergent or Replit? The 9 things that most often break when an AI-built app meets real users and payments, and how to fix them.',
    updated: checked,
    readMins: 7,
    intro:
      'AI app builders are brilliant for getting a first version on screen in a day. The trouble starts when real users, real data and real money arrive. Most AI-built apps are prototypes that look finished. This guide explains what usually breaks, why, and what to check before you launch.',
    sections: [
      {
        h: 'Prototype vs product: why it works in the preview but not at launch',
        blocks: [
          { p: 'In the builder’s preview, you are the only user, the data is fake and nobody is trying to break anything. A live product is different: strangers sign up, some of them poke at your app, payments must be exactly right, and emails must land in the inbox.' },
          { p: 'AI builders are good at screens and simple flows. They are weaker at the invisible parts: security rules, payment confirmation, email setup, backups and hosting you control. Those parts are exactly what decides whether your launch goes well.' },
        ],
      },
      {
        h: 'The 9 things that break most often',
        blocks: [
          { ol: [
            'Database security. Your data is open to anyone who knows where to look. Supabase-based apps need Row Level Security switched on for every table, because the public key ships inside your app’s JavaScript. In 2025 a security issue in Lovable-generated apps (CVE-2025-48757) was rated critical because weak Row Level Security let outsiders read or write database tables. Lovable disputes it, saying each customer is responsible for their own data rules.',
            'Secret keys in the browser. Any “secret” or “service” key that appears in the frontend code can be copied by anyone. A Supabase secret key, for example, skips all security rules.',
            'Payments without confirmation. The app unlocks Pro when the user returns from the payment page, not when the payment gateway confirms it. That means some people get Pro without paying, and some who paid never get it. The fix is a webhook: the gateway tells your server the payment really happened.',
            'Emails in spam, or not sent at all. Sign-up, password reset and receipt emails need a proper email service and DNS records (SPF, DKIM and DMARC) on your domain.',
            'Settings that only work in the preview. Values like API URLs often live in the builder’s environment. On a new host they are missing, or, in Vite apps, they must exist at build time, not just at run time.',
            'Pages that show 404 on refresh. Single-page apps need a fallback rule on the host, or a link like /dashboard breaks when someone refreshes or shares it.',
            'Files saved in the wrong place. Some hosts reset their local disk on every deploy, so uploaded files disappear. Files belong in proper storage.',
            'Lock-in. The database, hosting, AI features or logins may still run through the builder’s own services. If you stop paying, or the builder changes its plans, parts of your app stop working.',
            'No backups and test data in production. Fake accounts and sample records end up in the live database, and nobody has a way to restore data if something goes wrong.',
          ] },
        ],
      },
      {
        h: 'Which builder did you use? What you’re working with',
        blocks: [
          { table: {
            head: ['Builder', 'What it builds with', 'Getting your code out', 'Watch out for'],
            rows: [
              ['Lovable', 'New apps (since May 2026): TanStack Start. Older apps: React + Vite. Built-in backend, movable to Supabase', 'Git sync on all plans; zip download on paid plans', 'Row Level Security on every table; data and uploads are not in the export'],
              ['Bolt', 'Bolt hosting and Bolt Database by default; Netlify for browser-only sites', 'Zip download on desktop; GitHub sync', 'Netlify can’t host a database or backend; Bolt Database can pause after inactivity'],
              ['Emergent', 'React or Next.js frontend, FastAPI (Python) or Next.js API backend, MongoDB Atlas', 'Save to GitHub on paid plans; no download button', 'A Python backend needs its own host if you move it'],
              ['Replit', 'Your chosen stack, with separate PostgreSQL databases for development and production', 'Git, or copy the project; database via its connection string', 'Server must listen on 0.0.0.0; local disk resets on each publish'],
            ],
          } },
          { p: 'Each builder has its own guide with the exact steps. Pick yours from the list at the end of this page.' },
        ],
      },
      {
        h: 'A 10-minute check you can do yourself',
        blocks: [
          { ul: [
            'Open your app in a private browser window and try to open another user’s page or data. You should be blocked.',
            'Search your app’s code for words like “secret”, “service_role” or “sk_”. None of them should be in frontend files.',
            'Make a test payment, then close the tab before returning to the app. Does Pro still unlock correctly?',
            'Sign up with a new email. Did the welcome or verification email arrive, and in the inbox, not spam?',
            'Refresh a deep page like /dashboard or /settings on the live site. Does it load?',
            'Check who owns each account: hosting, database, domain, payment gateway, email. Is it you?',
          ] },
          { note: 'Want a quicker way? The free AI app rescue check asks a few questions and shows what is likely broken in your app.' },
        ],
      },
      {
        h: 'Fix it yourself, or get help?',
        blocks: [
          { p: 'If the app is a side project with no payments and no personal data, the checklist above may be enough. If real customers will pay you or trust you with their data, get a second pair of eyes before launch. A security hole or a payment bug found after launch costs far more than fixing it now.' },
          { p: 'I fix and launch AI-built apps: security rules, payments with webhooks, emails, your own domain and hosting in your name. A rescue starts at ₹10,000 ($300) and usually takes 3–7 days. Send me your app link for a free check first.' },
        ],
      },
    ],
    sources: [
      { name: 'Lovable docs: deployment, hosting and ownership', url: 'https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership' },
      { name: 'CVE-2025-48757 (Tenable)', url: 'https://www.tenable.com/cve/CVE-2025-48757' },
      { name: 'Bolt support: deploy', url: 'https://support.bolt.new/building/deploy' },
      { name: 'Emergent help: FAQs', url: 'https://help.emergent.sh/faqs' },
      { name: 'Replit docs: development and production databases', url: 'https://docs.replit.com/features/data-and-storage/development-and-production' },
      { name: 'Fly.io: taking a Lovable, Bolt or Replit app to production', url: 'https://fly.io/learn/lovable-bolt-replit-to-production/' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'lovable-app-to-production',
    platform: 'Lovable',
    title: 'Lovable app to production: move it to your own hosting and fix what breaks',
    seoTitle: 'Lovable App to Production: Hosting, Supabase & Fixes',
    description:
      'How to take a Lovable app live properly: export your code, choose hosting, move the backend to Supabase, lock down Row Level Security and avoid the common breakages.',
    updated: checked,
    readMins: 7,
    intro:
      'Lovable makes it easy to build and publish an app. Taking it to production, with your own hosting, a secure database and real payments, needs a few careful steps. Here is what you are working with and how to do it safely.',
    sections: [
      {
        h: 'What a Lovable app is made of',
        blocks: [
          { ul: [
            'Frontend: apps created from 13 May 2026 use TanStack Start, which runs server code. Older apps use React with Vite and build to static files.',
            'Backend: a built-in backend by default. Lovable supports moving it only to managed Supabase or self-hosted Supabase. Moving to plain PostgreSQL or another provider means rebuilding login, storage and services yourself.',
            'Ownership: Lovable’s docs say you own what you create, and that it does not rely on proprietary data stores.',
          ] },
        ],
      },
      {
        h: 'Step 1: Get your code out',
        blocks: [
          { ul: [
            'Git sync (GitHub, GitLab or Bitbucket) works on all plans. This is the best way: your code lives in a repository you control.',
            'A zip download of the codebase needs a paid plan.',
            'Neither includes your data or uploaded files. Export the database and storage separately.',
          ] },
          { note: 'Keep Lovable on its own branch if you also edit the code elsewhere. Lovable syncs one branch at a time, so editing the same branch in two places causes conflicts.' },
        ],
      },
      {
        h: 'Step 2: Choose how far to move',
        blocks: [
          { table: {
            head: ['Option', 'What moves', 'Good for'],
            rows: [
              ['Frontend only', 'The app is hosted elsewhere; the built-in backend stays', 'Your own domain and hosting quickly, while still editing in Lovable'],
              ['Frontend + Supabase', 'Hosting plus the backend, moved to your own Supabase project with a data migration', 'Full control of data and costs'],
              ['Full exit', 'Everything, including AI features and connectors that still run through Lovable', 'Long-term products that will be developed outside Lovable'],
            ],
          } },
          { p: 'Hosting: older Vite apps can go on any static host, such as Vercel, Netlify or Cloudflare Pages. TanStack Start apps need a host that also runs server code.' },
        ],
      },
      {
        h: 'Step 3: Lock down the database',
        blocks: [
          { p: 'This is the most important step. In a Supabase-based app, the public (publishable) key is inside your JavaScript, so anyone can talk to your database. Row Level Security rules are the only thing deciding what they can see or change.' },
          { ul: [
            'Turn on Row Level Security for every table, and write rules so users only read and write their own rows.',
            'Never put the Supabase secret key in frontend code or in your repository. It skips every rule. Keep it only in your host’s secret settings, for server code.',
            'Test it: log in as one user and try to read another user’s data. You should get nothing.',
          ] },
          { note: 'This is not a theory. CVE-2025-48757 was rated critical (9.3) because weak Row Level Security in Lovable-generated sites let unauthenticated outsiders read or write database tables. Lovable disputes the CVE, saying each customer is responsible for their own data rules, which is exactly why you need to check yours.' },
        ],
      },
      {
        h: 'Step 4: Fix what usually breaks on a new host',
        blocks: [
          { ul: [
            'Missing settings: Vite replaces VITE_ variables at build time, so they must be set in your host before the build, not only at run time.',
            '404 on refresh: a Vite single-page app needs a rule that sends every route to index.html.',
            'Previews touching live data: point test and preview builds at a separate Supabase project, never the production one.',
            'Login redirects: update the allowed redirect URLs in Supabase Auth to your new domain, or sign-in will fail after the move.',
          ] },
        ],
      },
      {
        h: 'Step 5: Payments, emails and launch',
        blocks: [
          { ol: [
            'Payments: confirm every payment with a webhook from Razorpay, Stripe or Dodo on your server before unlocking anything.',
            'Emails: use a proper email service, and add SPF, DKIM and DMARC records to your domain so emails reach the inbox.',
            'Domain: connect your own domain with HTTPS.',
            'Run one real payment end to end before announcing anything.',
          ] },
          { p: 'I take Lovable apps to production: code into your GitHub, hosting and Supabase in your name, Row Level Security checked table by table, payments with webhooks and emails that land. A rescue starts at ₹10,000 ($300), usually 3–7 days. Send me your app link for a free check.' },
        ],
      },
    ],
    sources: [
      { name: 'Lovable docs: deployment, hosting and ownership', url: 'https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership' },
      { name: 'CVE-2025-48757 (Tenable)', url: 'https://www.tenable.com/cve/CVE-2025-48757' },
      { name: 'Fly.io: taking a Lovable, Bolt or Replit app to production', url: 'https://fly.io/learn/lovable-bolt-replit-to-production/' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'bolt-app-to-production',
    platform: 'Bolt',
    title: 'Bolt.new app to production: hosting, database and launch checklist',
    seoTitle: 'Bolt.new App to Production: Hosting & Launch Checklist',
    description:
      'How to launch a Bolt.new app properly: Bolt hosting vs Netlify, exporting your code, database choices, and the security and payment checks to do before real users arrive.',
    updated: checked,
    readMins: 6,
    intro:
      'Bolt can publish your app in one click. Before you invite real users or take payments, it helps to understand where your app lives, how to get your code out, and what to check so launch day goes smoothly.',
    sections: [
      {
        h: 'Where a Bolt app lives',
        blocks: [
          { ul: [
            'New Bolt projects publish on Bolt hosting by default.',
            'You can publish to Netlify instead by connecting your Netlify account. Netlify suits browser-only sites like landing pages and small apps.',
            'Netlify can’t host a database or a traditional backend, so apps that need one should stay on Bolt hosting, or move the backend somewhere that can run it.',
            'Bolt Cloud provides built-in databases. Bolt notes that Bolt Database can pause after a period of inactivity, so check how that affects a live product.',
          ] },
        ],
      },
      {
        h: 'Step 1: Get your code out',
        blocks: [
          { ul: [
            'Download your project as a zip on desktop, then run it locally with Node.js: npm install, then npm run dev.',
            'Or connect Bolt to GitHub to sync the project, or create a new repository from it.',
            'Duplicated projects are not connected to GitHub automatically. Connect each one to its own repository.',
          ] },
          { note: 'Don’t push to the same GitHub branch while a Bolt session is editing it. If both sides change at nearly the same moment, one can overwrite the other.' },
        ],
      },
      {
        h: 'Step 2: Decide where it should run',
        blocks: [
          { table: {
            head: ['Your app', 'Sensible home'],
            rows: [
              ['Landing page or browser-only tool', 'Netlify or Vercel, with your own domain'],
              ['App with login and data, early stage', 'Bolt hosting with your own domain, after the security checks below'],
              ['App with payments, growing users', 'Hosting and database in your own accounts, so you control costs, backups and access'],
            ],
          } },
        ],
      },
      {
        h: 'Step 3: The checks before real users',
        blocks: [
          { ol: [
            'Data rules: one user must never see another user’s data. Test it by logging in as two different accounts.',
            'Secret keys: no secret or service keys in frontend code. Move them to your host’s secret settings.',
            'Payments: unlock paid features only after the gateway confirms the payment with a webhook.',
            'Emails: sign-up and reset emails arrive in the inbox, with SPF, DKIM and DMARC set on your domain.',
            'Deep links: refresh /dashboard on the live site. If it shows 404, add a fallback rule to index.html.',
            'Backups: know how you would restore your data if something went wrong.',
          ] },
        ],
      },
      {
        h: 'Step 4: Launch day',
        blocks: [
          { ul: [
            'Connect your own domain with HTTPS.',
            'Switch payments from test to live keys, and make one real payment together with someone you trust.',
            'Remove test accounts and sample data from the live database.',
            'Watch the logs for the first few days.',
          ] },
          { p: 'I launch Bolt apps properly: code in your GitHub, the right hosting for your app, secure data rules, payments with webhooks and emails that land. A rescue starts at ₹10,000 ($300), usually 3–7 days. Send me your app link for a free check.' },
        ],
      },
    ],
    sources: [
      { name: 'Bolt support: deploy', url: 'https://support.bolt.new/building/deploy' },
      { name: 'Bolt support: projects and files', url: 'https://support.bolt.new/building/using-bolt/projects-files' },
      { name: 'Fly.io: taking a Lovable, Bolt or Replit app to production', url: 'https://fly.io/learn/lovable-bolt-replit-to-production/' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'emergent-app-to-production',
    platform: 'Emergent',
    title: 'Emergent app to production: stay on Emergent or move it?',
    seoTitle: 'Emergent App to Production: Hosting, Export & Checks',
    description:
      'Built your app with Emergent? What it is made of (React, FastAPI, MongoDB), how to get your code out, whether to stay on Emergent hosting, and the checks before launch.',
    updated: checked,
    readMins: 6,
    intro:
      'Emergent builds full-stack apps, with a real backend and database, which is more than many builders do. That also means more moving parts when you take it to production. Here is how to decide where it should live and what to check first.',
    sections: [
      {
        h: 'What an Emergent app is made of',
        blocks: [
          { ul: [
            'Frontend: React and Next.js, styled with Tailwind CSS and shadcn/ui. Mobile apps use React Native with Expo.',
            'Backend: Python with FastAPI, or Next.js API routes.',
            'Database: MongoDB Atlas. Each app gets its own database, on a shared cluster by default, with a dedicated database as a paid upgrade.',
            'Hosting: web apps publish to an emergent.host address on Emergent’s infrastructure. Custom domains are supported, with DNS and SSL handled by Emergent.',
          ] },
        ],
      },
      {
        h: 'Step 1: Get your code out',
        blocks: [
          { ul: [
            'Save to GitHub is available on paid plans (Standard and above).',
            'There is no download or zip button. On any plan you can copy code from the built-in VS Code view, but GitHub is far easier and safer.',
          ] },
          { note: 'Even if you stay on Emergent, put your code on GitHub. It is your backup and your proof of ownership.' },
        ],
      },
      {
        h: 'Step 2: Stay on Emergent, or move?',
        blocks: [
          { table: {
            head: ['Choice', 'What it means', 'Good when'],
            rows: [
              ['Stay, with your own domain', 'Keep Emergent hosting, connect your domain, fix security and payments', 'You want to launch fast and keep building in Emergent'],
              ['Move the frontend', 'Host the React or Next.js part on Vercel, keep the backend running', 'You want your own hosting and speed for the pages users see'],
              ['Move everything', 'Frontend on Vercel, Python backend on a host that runs Python, MongoDB Atlas in your own account', 'A long-term product with growing users and its own developer'],
            ],
          } },
          { p: 'Moving a Python backend is the biggest job here, because it needs its own server and settings. Often the right first step is to launch on Emergent with your own domain, then move later if the product grows.' },
        ],
      },
      {
        h: 'Step 3: The checks before real users',
        blocks: [
          { ol: [
            'Access rules: every backend route checks who is asking. A logged-in user must never get another user’s data by changing an ID in the URL.',
            'Secrets: database passwords and API keys stay on the server, never in frontend code.',
            'Database access: in MongoDB Atlas, limit who and what can connect, and use a strong, unique database password.',
            'Payments: unlock paid features only after a webhook from the payment gateway confirms the payment.',
            'Emails: verified sending domain with SPF, DKIM and DMARC.',
            'Backups: know how your MongoDB data is backed up and how to restore it.',
          ] },
        ],
      },
      {
        h: 'Step 4: Launch',
        blocks: [
          { ul: [
            'Connect your domain and check HTTPS.',
            'Switch payments to live mode and make one real payment end to end.',
            'Remove test data, then watch errors and payments closely for the first week.',
          ] },
          { p: 'I help founders launch Emergent apps: code into your GitHub, your own domain, security checks, payments with webhooks and emails that land. If moving the backend makes sense, I tell you honestly what it involves first. A rescue starts at ₹10,000 ($300), usually 3–7 days. Send me your app link for a free check.' },
        ],
      },
    ],
    sources: [
      { name: 'Emergent help: FAQs', url: 'https://help.emergent.sh/faqs' },
      { name: 'Emergent help: platform documentation', url: 'https://help.emergent.sh/platform-documentation' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    slug: 'replit-app-to-production',
    platform: 'Replit',
    title: 'Replit Agent app to production: databases, hosting and what breaks',
    seoTitle: 'Replit Agent App to Production: Database & Hosting',
    description:
      'Built with Replit Agent? How Replit’s development and production databases work, the common breakages when you publish or move, and the checks to do before launch.',
    updated: checked,
    readMins: 6,
    intro:
      'Replit Agent can build and publish a working app quickly. Before you put real users and payments on it, it helps to understand how its databases work, what changes when you publish, and what breaks if you move it elsewhere.',
    sections: [
      {
        h: 'How Replit handles your data',
        blocks: [
          { ul: [
            'Every app gets two PostgreSQL databases: one for development and one for the live app. The current setup runs PostgreSQL 16.',
            'The production database is created when you publish, and your live app gets its own connection string (DATABASE_URL).',
            'The Agent cannot change production. It can only read it through a read-only copy, which may lag slightly behind.',
            'When you publish, structural changes from development are applied to production, but some items are skipped, such as triggers, functions and grants. Check these by hand.',
            'Publishing warns you about changes that could delete data, like dropping tables or columns, and lets you test on a migrated copy first.',
          ] },
          { note: 'Don’t copy development data into production unless it is clean. It often contains test accounts and sample records.' },
        ],
      },
      {
        h: 'What breaks most often',
        blocks: [
          { ul: [
            'Server not reachable: a published server must listen on 0.0.0.0, not localhost.',
            'Uploaded files disappearing: Replit’s local disk resets on each publish. Store files in proper object storage and data in your database.',
            'Missing database features: connection pooling is off by default, and a pooled connection doesn’t support features that need a persistent session.',
            'Leaked connection string: if your production DATABASE_URL is ever exposed, regenerate the production credentials straight away.',
            'Surprise costs: production compute pauses after five minutes of inactivity, but storage keeps costing money.',
          ] },
        ],
      },
      {
        h: 'Moving off Replit',
        blocks: [
          { p: 'Your app code can go to GitHub, and because the database is standard PostgreSQL, the data can be moved using its connection string with normal PostgreSQL tools. Replit’s own database page doesn’t describe an export, so plan the move and test it on a copy first.' },
          { ol: [
            'Put the code on GitHub.',
            'Create the new database and hosting in your own accounts.',
            'Copy the data across, then re-create triggers, functions and permissions that don’t come over automatically.',
            'Set the new connection string and secrets in the new host.',
            'Test logins, payments and emails on the new setup before switching your domain.',
          ] },
        ],
      },
      {
        h: 'The checks before real users',
        blocks: [
          { ol: [
            'Access rules: users only ever see their own data.',
            'Secrets in the host’s secret settings, never in the code.',
            'Payments confirmed by webhook before anything unlocks.',
            'Emails from a verified domain with SPF, DKIM and DMARC.',
            'Backups in place, and you know how to restore them.',
            'Your own domain connected with HTTPS.',
          ] },
          { p: 'I take Replit apps to production: code in your GitHub, database and hosting in your name, secure access rules, payments with webhooks and emails that land. A rescue starts at ₹10,000 ($300), usually 3–7 days. Send me your app link for a free check.' },
        ],
      },
    ],
    sources: [
      { name: 'Replit docs: development and production databases', url: 'https://docs.replit.com/features/data-and-storage/development-and-production' },
      { name: 'Fly.io: taking a Lovable, Bolt or Replit app to production', url: 'https://fly.io/learn/lovable-bolt-replit-to-production/' },
    ],
  },
];

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g]));

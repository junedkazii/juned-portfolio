// ─────────────────────────────────────────────────────────────
// TEXT FOR THE EXTRA PAGES: case studies, services details and tools.
// Your main text (prices, links, ship log) is still in data.js.
// ─────────────────────────────────────────────────────────────
import { links } from './data';

// Opens WhatsApp with a ready-made message.
export function waLink(message) {
  const base = String(links.whatsapp || '').split('?')[0];
  return `${base}?text=${encodeURIComponent(message)}`;
}

// ───────── Case studies (/work/dueblink, /work/offboardpro) ─────────
export const caseStudies = {
  dueblink: {
    name: 'DueBlink',
    tagline: 'A payment reminder SaaS that chases late invoices for freelancers.',
    url: 'https://dueblink.com',
    domain: 'dueblink.com',
    role: 'Solo founder: design, code, payments, launch',
    stack: ['Next.js', 'Firebase', 'Vercel', 'OpenAI', 'Razorpay', 'Dodo Payments', 'Google Analytics'],
    images: [
      { label: 'Landing page', src: '/dueblink-landing.png', path: '' },
      { label: 'Dashboard', src: '/dueblink-dashboard.png', path: '/dashboard' },
    ],
    problem:
      "Freelancers lose real money because nobody follows up on late invoices. Chasing clients feels awkward, so reminders get sent late or never. I wanted a tool that does the chasing politely and on time, so the freelancer doesn't have to.",
    built: [
      'A daily "who to chase" list on the dashboard, so you see exactly who owes you today',
      'Automatic email reminders on day 0, 3 and 7 that never skip a step',
      'An AI reminder writer that drafts polite, firm messages in seconds',
      'Reminders in 4 languages, including Hinglish',
      'Multiple currencies for clients in India and abroad',
      'An AI assistant and chatbot inside the app',
      'An installable phone app (PWA)',
      'Pro plan with Razorpay for India and Dodo Payments for international customers',
    ],
    hard: [
      {
        title: 'Two payment systems, both verified on the server',
        text: 'Razorpay for Indian customers and Dodo Payments for international ones. Every payment is confirmed on the server through webhooks, so nobody can unlock Pro by faking a request in the browser.',
      },
      {
        title: 'AI features with cost limits',
        text: "The AI writer and chatbot have usage limits per user, so a single heavy user can't run up a surprise OpenAI bill.",
      },
      {
        title: 'Reminders that never skip a stage',
        text: 'Scheduled emails have to fire on the right day, in order, even if something fails along the way. I built the scheduling so every invoice moves through each stage exactly once.',
      },
      {
        title: 'A false phishing flag on my own domain',
        text: 'Browsers started blocking the site with a phishing warning. I tracked down the cause, fixed it and got the domain cleared, which is exactly the kind of launch problem founders get stuck on.',
      },
      {
        title: 'Google sign-in on my own domain',
        text: "Login shows dueblink.com instead of a random Firebase address, so users trust what they're signing in to.",
      },
    ],
    outcome:
      'Live at dueblink.com and taking payments, built and run by me end to end. Everything I offer clients, from payments and AI to emails and launch fixes, I first did here for myself.',
  },
  offboardpro: {
    name: 'OffboardPro',
    tagline: 'Client offboarding for freelancers and agencies: never forget to remove access again.',
    url: 'https://offboardpro.com',
    domain: 'offboardpro.com',
    role: 'Solo founder: design, code, launch',
    stack: ['Next.js', 'TypeScript', 'Firebase Auth', 'Firestore', 'Tailwind CSS', 'jsPDF', 'Vercel'],
    images: [
      { label: 'Landing page', src: '/offboardpro-landing.png', path: '' },
      { label: 'Dashboard', src: '/offboardpro-dashboard.png', path: '/dashboard' },
    ],
    problem:
      "When a project ends, freelancers and agencies still have access to the client's ad accounts, analytics, hosting and code. Forgetting to remove it is a security risk and looks unprofessional. Most people track this in their head, or not at all.",
    built: [
      'Client and project tracking with statuses: Active, Ending soon, Offboarding, Ready to close, Closed',
      'Step-by-step access-removal checklists for 196 tools across 21 categories',
      'One-click templates for web development, marketing, SEO, design and social media agencies',
      'Deadline alerts and a live "Needs your attention" list',
      'A security rating (Secured, Warning, At risk) based on overdue access',
      'An activity timeline for every client',
      'PDF and CSV reports to hand to clients',
      'Dark mode that remembers your choice',
    ],
    hard: [
      {
        title: 'Turning 196 tools into clear checklists',
        text: 'Every tool removes access differently. I organised them into 21 categories, each with its own steps, so the app always knows what to tick off for any project.',
      },
      {
        title: 'Knowing what needs attention, automatically',
        text: 'The dashboard works out which clients are overdue, ready to close or ending soon from dates and task progress, and puts the most urgent first.',
      },
      {
        title: 'Mobile-friendly controls',
        text: "Phones open their own plain picker for standard dropdowns, which didn't match the app. I built custom dropdowns that look and work the same everywhere.",
      },
      {
        title: 'Reports clients can keep',
        text: 'One click turns an offboarding into a clean PDF or CSV, proof that access was removed properly.',
      },
    ],
    outcome:
      'Live at offboardpro.com, a SaaS I built and launched solo. It shows I can model complex real-world workflows, not just simple forms.',
  },
};

// ───────── Services page (/services) ─────────
// Extra detail for each package. Prices and short descriptions come from data.js.
export const serviceDetails = {
  'SaaS MVP': {
    bestFor: 'Founders with an idea who want a real, working product to show users and investors.',
    included: [
      'Landing page that explains your product',
      'Sign-up and login, including Google sign-in',
      'Your dashboard and one core feature',
      'Database and secure access rules',
      'Payments with Razorpay, Stripe or Dodo',
      'Deployed live on your own domain',
      'Basic analytics, so you can see who signs up',
    ],
    notIncluded: ['Native iOS or Android apps', 'Complex integrations beyond the core feature', 'Ongoing marketing'],
  },
  'Payments setup': {
    bestFor: 'Apps that are ready to charge money but payments are missing or half-working.',
    included: [
      'Checkout with Razorpay, Stripe or Dodo Payments',
      'Webhooks verified on the server',
      'Subscription status in your database (active, cancelled, failed)',
      'Pricing page and upgrade flow',
      'Testing in test mode, then switching to live',
    ],
    notIncluded: ['Payment gateway approval itself (that is between you and the gateway)', 'Accounting or tax filing'],
  },
  'AI feature': {
    bestFor: 'Products that want a chatbot, AI writer or assistant without a scary API bill.',
    included: [
      'A chatbot, AI writer or assistant inside your app',
      'Prompts tuned for your use case',
      'Usage limits per user, so costs stay predictable',
      'API keys kept safely on the server',
    ],
    notIncluded: ['Training custom AI models', 'The AI provider bill (paid on your own account)'],
  },
  'Landing page': {
    bestFor: 'New products and services that need a fast, clear page that turns visitors into sign-ups.',
    included: [
      'A fast Next.js page, mobile first',
      'Clear copy structure: problem, solution, proof, call to action',
      'SEO basics: titles, descriptions, share image',
      'Analytics events on your main buttons',
    ],
    notIncluded: ['Copywriting from scratch (I help shape yours)', 'Paid ads'],
  },
  'Fix and launch': {
    bestFor: 'Apps that are almost done but stuck before going live.',
    included: [
      'Bug fixes on your existing app',
      'Custom domain and HTTPS',
      'Email setup so messages stop landing in spam',
      'Google login on your own domain',
      'Speed and analytics checks',
    ],
    notIncluded: ['Rebuilding the whole app', 'New features (quoted separately)'],
  },
  'AI app rescue': {
    bestFor: 'Apps built with Lovable, Bolt, Emergent or Replit that work in the demo but break in real life.',
    included: [
      'A review of your code and what is broken',
      'Payments fixed and verified on the server',
      'Database rules and exposed keys locked down',
      'Moved to your own hosting and GitHub',
      'Domain and emails connected',
    ],
    notIncluded: ['Unlimited new features', 'Keeping the AI builder subscription'],
  },
  'Monthly care': {
    bestFor: 'Live products that need someone reliable to call when something breaks.',
    included: ['Small changes and fixes every month', 'Dependency and security updates', 'Quick help when something breaks'],
    notIncluded: ['Big new features (quoted separately)'],
  },
};

// ───────── Free tools (/tools) ─────────
export const tools = [
  {
    slug: 'mvp-cost-calculator',
    name: 'SaaS MVP cost calculator',
    short: 'Pick your features and get a price and timeline in seconds.',
    label: 'Planning',
  },
  {
    slug: 'payment-fee-calculator',
    name: 'Payment gateway fee calculator',
    short: 'See what Razorpay, Stripe and Dodo Payments really take from each sale.',
    label: 'Payments',
  },
  {
    slug: 'launch-checklist',
    name: 'Launch readiness checklist',
    short: '24 checks across domain, emails, payments and security, with a live score.',
    label: 'Launch',
  },
  {
    slug: 'ai-app-rescue-check',
    name: 'AI app rescue check',
    short: 'Built with Lovable, Bolt or Emergent? Find out what is likely broken.',
    label: 'AI-built apps',
  },
];

// ───── "Built it with AI?" section (home + services). Edit any time. ─────
export const aiBuilders = {
  label: 'Lovable, Bolt, Emergent, Replit',
  title: [{ t: 'Built it with AI? ' }, { t: "Here's what usually breaks.", em: true }],
  intro:
    'AI app builders are great for a first version. You can have a working demo in a day, and that is the right way to test an idea. The trouble starts when real users and real money arrive.',
  fair: 'I use AI every day too. The difference is that I read and own the code, so I can fix what the AI gets wrong.',
  problems: [
    {
      title: 'The demo works, the business doesn’t',
      text: 'The first 80% is fast. The last 20% is what makes money: payments confirmed on the server, failed payments, refunds, your own domain.',
      fix: 'I finish the last 20% properly.',
    },
    {
      title: 'Security holes',
      text: 'Open database rules let any user read other users’ data. API keys sit in the browser where anyone can copy them. Researchers have found hundreds of AI-built apps leaking data this way.',
      fix: 'I lock down the database and move keys to the server.',
    },
    {
      title: 'The prompt loop',
      text: 'Fix one thing, two others break. Hours and credits go in circles because nobody can read what changed.',
      fix: 'I fix it in the code, once.',
    },
    {
      title: 'Nobody to call',
      text: 'When payments stop at 2 AM, there is no developer. Just you and a chatbot.',
      fix: 'You get a real person who knows your app.',
    },
    {
      title: 'Hidden costs and lock-in',
      text: 'Credits and plans add up, and your app is tied to their hosting. Moving out later is hard.',
      fix: 'Your code on your GitHub, your hosting, your accounts.',
    },
    {
      title: 'Hard to grow',
      text: 'Messy code makes every new feature slower and riskier as the app gets bigger.',
      fix: 'Clean structure that’s easy to build on.',
    },
  ],
};

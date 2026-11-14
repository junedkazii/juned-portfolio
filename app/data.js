// ─────────────────────────────────────────────────────────────
// ALL YOUR WEBSITE TEXT LIVES HERE.
// To change any words, prices, links or ship log entries,
// edit this file only. You never need to touch page.js.
// Lines marked  // CHANGE  must be updated before you go live.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Juned Kazi',
  title: 'SaaS developer for founders',
  // Your live website address. Update it after your first Vercel deploy.
  url: 'https://www.junedkazi.in', // CHANGE
  description:
    'I build SaaS apps that go live and take payments. Next.js, Firebase, AI and payments, from idea to launch.',
  // Put your photo in the "public" folder as juned.jpg, then change null to '/juned.jpg'
  photo: '/juned.jpg',
};

const whatsappNumber = '918329367658';
const whatsappMessage = "Hi Juned, I saw your portfolio and I'd like to talk about a project.";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export const links = {
  // "Book a call" buttons open this Cal.com booking page
  booking: 'https://cal.com/junedkazi/20min',
  email: 'mailto:junedkaziofficiall@gmail.com',
  whatsapp: whatsappLink,
  // Social links: put your profile link in quotes to show it in the footer, or leave null to hide it.
  linkedin: null,
  x: null,
  github: null,
};

// The dark "Right now" card under your photo. Update it whenever things change.
export const status = {
  shipping: 'Multi-language reminders for DueBlink',
  slots: '2 projects for November',
  replies: 'within 24 hours',
};

export const stats = [
  { value: '2', label: 'SaaS products built and launched solo' },
  { value: '2', label: 'payment gateways, Razorpay and Dodo' },
  { value: '4', label: 'languages supported in one app' },
  { value: '100', accent: '%', label: 'of every product designed, built and shipped by me' },
];

export const stack = ['Next.js', 'Firebase', 'Vercel', 'OpenAI', 'Razorpay', 'Stripe', 'Dodo'];

export const projects = [
  {
    number: '01',
    name: 'DueBlink',
    line: 'A payment reminder SaaS for freelancers.',
    points: [
      'Payments with Razorpay and Dodo, verified on the server',
      'AI features with cost limits, so the bill stays under control',
      'Scheduled emails that never skip a step',
    ],
    url: 'https://dueblink.com',
    domain: 'dueblink.com',
    // Screenshots live in the "public" folder. The first one shows by default.
    images: [
      { label: 'Landing page', src: '/dueblink-landing.png', path: '' },
      { label: 'Dashboard', src: '/dueblink-dashboard.png', path: '/dashboard' },
    ],
    // Later, a link to your case study (Notion, LinkedIn post or a page). null hides the button.
    caseStudy: null,
  },
  {
    number: '02',
    name: 'OffboardPro',
    line: 'Client offboarding for freelancers and agencies.',
    points: [
      'Step-by-step access checklists for 196 tools in 21 categories',
      'Deadline alerts and a live "needs your attention" list',
      'Pro plan with PDF and CSV reports',
    ],
    url: 'https://offboardpro.com',
    domain: 'offboardpro.com',
    images: [
      { label: 'Landing page', src: '/offboardpro-landing.png', path: '' },
      { label: 'Dashboard', src: '/offboardpro-dashboard.png', path: '/dashboard' },
    ],
    caseStudy: null,
  },
];

export const reasons = [
  {
    title: "I've done it for myself",
    text: 'I built, launched and run my own SaaS products. I know where apps get stuck: payments, emails in spam, login on a custom domain.',
  },
  {
    title: 'Fixed price, clear scope',
    text: 'You know the cost and the date before I start. Anything new gets a price first, so there are no surprise bills.',
  },
  {
    title: 'You own everything',
    text: 'Code, hosting, database and payment accounts are in your name. You get it all, with a simple "how to run it" note.',
  },
];

export const featuredService = {
  name: 'SaaS MVP',
  promise: 'Your idea, live and taking payments.',
  text: 'Landing page, sign-up and login, dashboard, database, one core feature, payments, deployed live.',
  inr: '₹75,000',
  usd: '$2,500',
  time: '4–8 weeks',
};

export const services = [
  {
    name: 'Payments setup',
    text: 'Razorpay, Stripe or Dodo checkout, webhooks, subscriptions. 3–7 days.',
    inr: '₹15,000',
    usd: '$500',
  },
  {
    name: 'AI feature',
    text: 'A chatbot, AI writer or assistant inside your app, with usage limits. 1–2 weeks.',
    inr: '₹25,000',
    usd: '$800',
  },
  {
    name: 'Landing page',
    text: 'A fast Next.js page with SEO basics and analytics. About 1 week.',
    inr: '₹15,000',
    usd: '$500',
  },
  {
    name: 'Fix and launch',
    text: "Bugs, domain, email, Google login and speed, until it's live. 2–5 days.",
    inr: '₹10,000',
    usd: '$300',
  },
  {
    name: 'AI app rescue',
    text: 'Built with Lovable, Bolt, Emergent or Replit? I fix it, secure it and launch it on your own hosting. 3–7 days.',
    inr: '₹10,000',
    usd: '$300',
  },
  {
    name: 'Monthly care',
    text: 'Small changes, fixes and updates. Someone to call when it breaks.',
    inr: '₹5,000',
    usd: '$200 a month',
  },
];

export const processSteps = [
  { title: 'Free call, 20 min', text: 'You tell me the idea. I tell you honestly what it takes.' },
  { title: 'Written scope', text: "What's in, what's out, a fixed price and dates." },
  { title: '50% to start', text: 'Work begins once the advance arrives. Bigger projects split 40 / 30 / 30.' },
  { title: 'Weekly updates', text: 'A short message and a live link, every week.' },
  { title: 'Launch and handover', text: 'You get the code, all logins and a "how to run it" note.' },
  { title: '2 weeks of free fixes', text: 'Anything broken after launch, I fix. Then an optional care plan.' },
];

// Newest first. Add a new line at the TOP every time you ship something.
export const shipLog = [
  { date: 'Nov 2026', title: 'Fixed a false phishing flag on my domain', text: 'Browsers were blocking the site. Got it cleared.' },
  { date: 'Oct 2026', title: 'Started taking client projects', text: 'Same skills, now for other founders.' },
  { date: 'Sep 2026', title: 'Reminders in 4 languages', text: 'DueBlink users get reminders in their own language.' },
  { date: 'Sep 2026', title: 'Added AI cost limits', text: "The AI features can't run up a surprise bill." },
  { date: 'Aug 2026', title: 'Launched DueBlink', text: 'Live in production and taking payments.' },
  { date: 'Aug 2026', title: 'Added Razorpay payments', text: 'Indian customers can pay, verified on the server.' },
  { date: 'Jan 2026', title: 'Launched OffboardPro', text: 'Built and launched solo.' },
];

// The callout under Services, for people who already built something with an AI tool.
export const rescue = {
  label: 'Built it with AI?',
  title: 'Stuck with a Lovable, Bolt or Emergent app?',
  text: "AI builders get you a great first version. I make it production-ready: working payments, locked-down security, your own domain and hosting, and code you fully own. No more paying credits for every change.",
  points: ['Payments that actually work', 'Security and database rules fixed', 'Moved to your own hosting', 'Code you own on GitHub'],
  cta: 'Get a free app check →',
};

export const faqs = [
  {
    q: 'I already built my app with Lovable, Bolt or Emergent. Can you help?',
    a: "Yes, that's a big part of my work. I review your app, then fix payments and security, connect your domain, and move it to your own hosting so you own the code and stop paying credits for every change.",
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. I work with founders anywhere, over calls and chat. Prices are in ₹ or $.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. Everything runs on your own accounts, and I hand over the full code at the end.',
  },
  {
    q: 'Do you use AI to build?',
    a: 'Yes, to move faster and keep prices fair. I design, test and ship every part myself, and I fix what breaks.',
  },
  {
    q: 'What if I need changes later?',
    a: 'Small changes are fine during the project. New features get a quick price and date first, or take the monthly care plan.',
  },
  {
    q: "What don't you build?",
    a: 'Native iOS or Android apps and complex banking or health systems. I focus on web SaaS apps, and I do them well.',
  },
];

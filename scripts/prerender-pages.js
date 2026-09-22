import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const templateHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(templateHtmlPath)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templateHtmlPath, 'utf-8');

const SITE_URL = 'https://wa.namnilam.com';

const routes = [
  {
    path: '/',
    title: 'Nam Nilam WhatsApp AI | Let AI Talk to Your Customers',
    description: 'Connect your WhatsApp with AI and let Nam Nilam AI handle customer conversations, enquiries, follow-ups and business communication 24/7.',
    h1: 'Let AI Talk to Your Customers on WhatsApp',
  },
  {
    path: '/whatsapp-ai',
    title: 'What Is WhatsApp AI? | Nam Nilam',
    description: 'Learn what WhatsApp AI is, how it works for customer communication, and how automated AI replies compare with manual messaging.',
    h1: 'What Is WhatsApp AI?',
  },
  {
    path: '/whatsapp-ai-for-business',
    title: 'WhatsApp AI for Business | Customer Communication Automation',
    description: 'Discover how WhatsApp AI helps businesses get faster replies, handle higher message volume, follow up with leads, and maintain human control.',
    h1: 'WhatsApp AI for Your Business',
  },
  {
    path: '/how-it-works',
    title: 'How WhatsApp AI Works | Nam Nilam',
    description: 'Explore the 4-step process to connect your WhatsApp, teach the AI your business information, let AI talk, and take control anytime.',
    h1: 'How Does WhatsApp AI Work?',
  },
  {
    path: '/features',
    title: 'WhatsApp AI Features | Nam Nilam',
    description: 'Explore core features including instant AI replies, lead qualification, automatic follow-ups, custom business knowledge, and 24/7 availability.',
    h1: 'Everything You Need to Let AI Handle WhatsApp Conversations',
  },
  {
    path: '/use-cases',
    title: 'WhatsApp AI Use Cases | Nam Nilam',
    description: 'Explore practical WhatsApp AI use cases for customer support, sales enquiries, lead qualification, appointment booking, and product questions.',
    h1: 'What Can You Use WhatsApp AI For?',
  },
  {
    path: '/whatsapp-ai-for-real-estate',
    title: 'WhatsApp AI for Real Estate | Nam Nilam',
    description: 'Automate real estate property enquiries, pricing details, plot availability, site visit bookings, and lead follow-ups on WhatsApp.',
    h1: 'WhatsApp AI for Real Estate Businesses',
  },
  {
    path: '/whatsapp-ai-for-small-business',
    title: 'WhatsApp AI for Small Businesses | Nam Nilam',
    description: 'How small businesses and independent owners handle customer enquiries, share pricing, and answer questions 24/7 without a big team.',
    h1: 'WhatsApp AI for Small Businesses',
  },
  {
    path: '/whatsapp-ai-for-customer-support',
    title: 'AI Customer Support on WhatsApp | Nam Nilam',
    description: 'Provide instant, helpful customer support on WhatsApp. Answer common questions, share product details, and hand over to humans when needed.',
    h1: 'AI Customer Support on WhatsApp',
  },
  {
    path: '/faq',
    title: 'WhatsApp AI FAQ | Nam Nilam',
    description: 'Get answers to common questions about connecting your WhatsApp, teaching the AI, lead follow-ups, 24/7 availability, and human handover.',
    h1: 'Frequently Asked Questions About WhatsApp AI',
    isFaq: true,
  },
  {
    path: '/about',
    title: 'About Nam Nilam | WhatsApp AI for Businesses',
    description: 'Learn about Nam Nilam and our mission to make customer communication simpler, faster, and more reliable using WhatsApp AI.',
    h1: 'Making Business Conversations Simpler',
  },
  {
    path: '/contact',
    title: 'Contact Nam Nilam | WhatsApp AI',
    description: 'Get in touch with Nam Nilam or chat directly with our AI on WhatsApp (+91 97876 00221) to experience automated customer conversations.',
    h1: 'Talk to Nam Nilam',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What is WhatsApp AI?',
    answer: 'WhatsApp AI is an AI assistant that helps businesses communicate with customers through WhatsApp. It automatically responds to incoming customer enquiries, provides accurate business information, qualifies leads, and keeps conversations moving 24/7.',
  },
  {
    question: 'How does WhatsApp AI work?',
    answer: 'When a customer sends a message to your WhatsApp number, the AI reads and understands their intent, matches it with the business details you provided, and responds promptly. You remain in control and can take over the chat at any point.',
  },
  {
    question: 'Can AI reply to my WhatsApp customers?',
    answer: 'Yes. Nam Nilam WhatsApp AI is built specifically to converse naturally with your customers on WhatsApp on your behalf, providing helpful answers without manual typing.',
  },
  {
    question: 'Can I use my existing WhatsApp?',
    answer: 'Yes. You can connect your existing WhatsApp account directly using standard WhatsApp device linking, without needing to change your phone number.',
  },
  {
    question: 'What information does the AI use?',
    answer: 'The AI uses the specific information you provide about your business, including your products, services, pricing, operating policies, location, and answers to common customer questions.',
  },
  {
    question: 'Can I teach the AI about my business?',
    answer: 'Yes. You provide your business details, brochures, FAQs, price lists, and specific instructions so the AI accurately reflects your business tone and knowledge.',
  },
  {
    question: 'Can AI answer customer questions?',
    answer: 'Yes. It can answer routine and detailed questions regarding your products, service options, timings, pricing, location, and availability.',
  },
  {
    question: 'Can AI follow up with leads?',
    answer: 'Yes. The AI keeps conversations active by asking clarifying questions, qualifying requirements, and re-engaging interested customers who reached out.',
  },
  {
    question: 'Can a human take over a conversation?',
    answer: 'Yes. You retain 100% control. You can step into any WhatsApp conversation directly from your phone whenever a customer requires human attention.',
  },
  {
    question: 'Can WhatsApp AI be used for real estate?',
    answer: 'Yes. It is widely used by real estate businesses to handle property inquiries, share plot details, answer pricing questions, check budget preferences, and arrange site visits.',
  },
  {
    question: 'Can small businesses use WhatsApp AI?',
    answer: 'Yes. Small businesses and solo consultants use Nam Nilam WhatsApp AI to provide immediate, professional customer service around the clock without hiring a large support team.',
  },
  {
    question: 'Is WhatsApp AI available 24/7?',
    answer: 'Yes. The AI operates continuously, ensuring your business instantly welcomes and responds to customer inquiries late at night, on weekends, and during busy hours.',
  },
  {
    question: 'How do I get started?',
    answer: 'You can start immediately by chatting with our AI on WhatsApp at +91 97876 00221 to see it in action and connect your own business WhatsApp.',
  },
];

console.log('Generating static HTML pages for all 12 routes...');

for (const r of routes) {
  const canonicalUrl = `${SITE_URL}${r.path === '/' ? '/' : r.path}`;
  const ogImageUrl = `${SITE_URL}/og-image.png`;

  let html = templateHtml;

  // Replace title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${r.title}</title>`);

  // Replace description
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${r.description}" />`);

  // Replace canonical
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Replace OG tags
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${r.title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${r.description}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${ogImageUrl}" />`);

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${r.title}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${r.description}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${ogImageUrl}" />`);

  // Build JSON-LD schemas
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: r.title,
      description: r.description,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Nam Nilam WhatsApp AI',
        url: SITE_URL,
      },
    },
  ];

  if (r.path !== '/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: r.h1,
          item: canonicalUrl,
        },
      ],
    });
  }

  if (r.isFaq || r.path === '/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  const scriptTag = `\n    <!-- Page & Breadcrumbs JSON-LD -->\n    <script type="application/ld+json">\n    ${JSON.stringify(schemas, null, 2)}\n    </script>\n  </head>`;
  html = html.replace('</head>', scriptTag);

  if (r.path === '/') {
    fs.writeFileSync(templateHtmlPath, html, 'utf-8');
    console.log(`✓ Updated dist/index.html (/)`);
  } else {
    const routeDir = path.join(distDir, r.path.slice(1));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const routeHtmlPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(routeHtmlPath, html, 'utf-8');
    console.log(`✓ Generated ${routeHtmlPath} (${r.path})`);
  }
}

console.log('Prerendering completed successfully for all 12 routes!');

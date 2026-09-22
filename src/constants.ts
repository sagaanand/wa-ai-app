export const SITE_URL = 'https://wa.namnilam.com';
export const WHATSAPP_NUMBER = '+91 97876 00221';
export const WHATSAPP_RAW_NUMBER = '919787600221';
export const WHATSAPP_PREFILLED_TEXT = 'Hi Nam Nilam AI, I want to know more about WhatsApp AI.';
export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILLED_TEXT)}`;

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: '#', isPlaceholder: true },
  { name: 'Facebook', url: '#', isPlaceholder: true },
  { name: 'LinkedIn', url: '#', isPlaceholder: true },
  { name: 'YouTube', url: '#', isPlaceholder: true },
  { name: 'X', url: '#', isPlaceholder: true },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is WhatsApp AI?',
    answer:
      'WhatsApp AI is an AI assistant that helps businesses communicate with customers through WhatsApp. It automatically responds to incoming customer enquiries, provides accurate business information, qualifies leads, and keeps conversations moving 24/7.',
  },
  {
    question: 'How does WhatsApp AI work?',
    answer:
      'When a customer sends a message to your WhatsApp number, the AI reads and understands their intent, matches it with the business details you provided, and responds promptly. You remain in control and can take over the chat at any point.',
  },
  {
    question: 'Can AI reply to my WhatsApp customers?',
    answer:
      'Yes. Nam Nilam WhatsApp AI is built specifically to converse naturally with your customers on WhatsApp on your behalf, providing helpful answers without manual typing.',
  },
  {
    question: 'Can I use my existing WhatsApp?',
    answer:
      'Yes. You can connect your existing WhatsApp account directly using standard WhatsApp device linking, without needing to change your phone number.',
  },
  {
    question: 'What information does the AI use?',
    answer:
      'The AI uses the specific information you provide about your business, including your products, services, pricing, operating policies, location, and answers to common customer questions.',
  },
  {
    question: 'Can I teach the AI about my business?',
    answer:
      'Yes. You provide your business details, brochures, FAQs, price lists, and specific instructions so the AI accurately reflects your business tone and knowledge.',
  },
  {
    question: 'Can AI answer customer questions?',
    answer:
      'Yes. It can answer routine and detailed questions regarding your products, service options, timings, pricing, location, and availability.',
  },
  {
    question: 'Can AI follow up with leads?',
    answer:
      'Yes. The AI keeps conversations active by asking clarifying questions, qualifying requirements, and re-engaging interested customers who reached out.',
  },
  {
    question: 'Can a human take over a conversation?',
    answer:
      'Yes. You retain 100% control. You can step into any WhatsApp conversation directly from your phone whenever a customer requires human attention.',
  },
  {
    question: 'Can WhatsApp AI be used for real estate?',
    answer:
      'Yes. It is widely used by real estate businesses to handle property inquiries, share plot details, answer pricing questions, check budget preferences, and arrange site visits.',
  },
  {
    question: 'Can small businesses use WhatsApp AI?',
    answer:
      'Yes. Small businesses and solo consultants use Nam Nilam WhatsApp AI to provide immediate, professional customer service around the clock without hiring a large support team.',
  },
  {
    question: 'Is WhatsApp AI available 24/7?',
    answer:
      'Yes. The AI operates continuously, ensuring your business instantly welcomes and responds to customer inquiries late at night, on weekends, and during busy hours.',
  },
  {
    question: 'How do I get started?',
    answer:
      'You can start immediately by chatting with our AI on WhatsApp at +91 97876 00221 to see it in action and connect your own business WhatsApp.',
  },
];

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  h1: string;
}

export const PAGES_METADATA: Record<string, PageMeta> = {
  '/': {
    title: 'Nam Nilam WhatsApp AI | Let AI Talk to Your Customers',
    description:
      'Connect your WhatsApp with AI and let Nam Nilam AI handle customer conversations, enquiries, follow-ups and business communication 24/7.',
    canonical: `${SITE_URL}/`,
    h1: 'Let AI Talk to Your Customers on WhatsApp',
  },
  '/whatsapp-ai': {
    title: 'What Is WhatsApp AI? | Nam Nilam',
    description:
      'Learn what WhatsApp AI is, how it works for customer communication, and how automated AI replies compare with manual messaging.',
    canonical: `${SITE_URL}/whatsapp-ai`,
    h1: 'What Is WhatsApp AI?',
  },
  '/whatsapp-ai-for-business': {
    title: 'WhatsApp AI for Business | Customer Communication Automation',
    description:
      'Discover how WhatsApp AI helps businesses get faster replies, handle higher message volume, follow up with leads, and maintain human control.',
    canonical: `${SITE_URL}/whatsapp-ai-for-business`,
    h1: 'WhatsApp AI for Your Business',
  },
  '/how-it-works': {
    title: 'How WhatsApp AI Works | Nam Nilam',
    description:
      'Explore the 4-step process to connect your WhatsApp, teach the AI your business information, let AI talk, and take control anytime.',
    canonical: `${SITE_URL}/how-it-works`,
    h1: 'How Does WhatsApp AI Work?',
  },
  '/features': {
    title: 'WhatsApp AI Features | Nam Nilam',
    description:
      'Explore core features including instant AI replies, lead qualification, automatic follow-ups, custom business knowledge, and 24/7 availability.',
    canonical: `${SITE_URL}/features`,
    h1: 'Everything You Need to Let AI Handle WhatsApp Conversations',
  },
  '/use-cases': {
    title: 'WhatsApp AI Use Cases | Nam Nilam',
    description:
      'Explore practical WhatsApp AI use cases for customer support, sales enquiries, lead qualification, appointment booking, and product questions.',
    canonical: `${SITE_URL}/use-cases`,
    h1: 'What Can You Use WhatsApp AI For?',
  },
  '/whatsapp-ai-for-real-estate': {
    title: 'WhatsApp AI for Real Estate | Nam Nilam',
    description:
      'Automate real estate property enquiries, pricing details, plot availability, site visit bookings, and lead follow-ups on WhatsApp.',
    canonical: `${SITE_URL}/whatsapp-ai-for-real-estate`,
    h1: 'WhatsApp AI for Real Estate Businesses',
  },
  '/whatsapp-ai-for-small-business': {
    title: 'WhatsApp AI for Small Businesses | Nam Nilam',
    description:
      'How small businesses and independent owners handle customer enquiries, share pricing, and answer questions 24/7 without a big team.',
    canonical: `${SITE_URL}/whatsapp-ai-for-small-business`,
    h1: 'WhatsApp AI for Small Businesses',
  },
  '/whatsapp-ai-for-customer-support': {
    title: 'AI Customer Support on WhatsApp | Nam Nilam',
    description:
      'Provide instant, helpful customer support on WhatsApp. Answer common questions, share product details, and hand over to humans when needed.',
    canonical: `${SITE_URL}/whatsapp-ai-for-customer-support`,
    h1: 'AI Customer Support on WhatsApp',
  },
  '/faq': {
    title: 'WhatsApp AI FAQ | Nam Nilam',
    description:
      'Get answers to common questions about connecting your WhatsApp, teaching the AI, lead follow-ups, 24/7 availability, and human handover.',
    canonical: `${SITE_URL}/faq`,
    h1: 'Frequently Asked Questions About WhatsApp AI',
  },
  '/about': {
    title: 'About Nam Nilam | WhatsApp AI for Businesses',
    description:
      'Learn about Nam Nilam and our mission to make customer communication simpler, faster, and more reliable using WhatsApp AI.',
    canonical: `${SITE_URL}/about`,
    h1: 'Making Business Conversations Simpler',
  },
  '/contact': {
    title: 'Contact Nam Nilam | WhatsApp AI',
    description:
      'Get in touch with Nam Nilam or chat directly with our AI on WhatsApp (+91 97876 00221) to experience automated customer conversations.',
    canonical: `${SITE_URL}/contact`,
    h1: 'Talk to Nam Nilam',
  },
};

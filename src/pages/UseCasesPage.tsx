import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Headphones, ShoppingBag, Target, Repeat, Calendar, HelpCircle, Wrench, Info, ShieldCheck, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WHATSAPP_CHAT_URL, WHATSAPP_NUMBER } from '../constants';

export const UseCasesPage: React.FC = () => {
  const cards = [
    {
      icon: Headphones,
      title: 'Customer Support',
      desc: 'Answer everyday customer questions about timings, order status, return policies, and service details. Customers receive immediate help even outside normal working hours, reducing repetitive tickets for your staff.',
      link: '/whatsapp-ai-for-customer-support',
      linkText: 'Explore Customer Support AI →',
    },
    {
      icon: ShoppingBag,
      title: 'Sales Enquiries',
      desc: 'Welcome prospective buyers immediately when they message your business from an ad, website, or social post. Share current pricing, offers, and catalogs before the customer loses interest.',
    },
    {
      icon: Target,
      title: 'Lead Qualification',
      desc: 'Ask targeted questions to understand what the customer needs, their location, and their estimated budget. This ensures your sales team spends their time with serious, qualified buyers.',
    },
    {
      icon: Repeat,
      title: 'Lead Follow-Up',
      desc: 'Re-engage customers who inquired but did not complete their booking or purchase. Friendly automated follow-ups help answer remaining questions and turn dormant leads into paying clients.',
    },
    {
      icon: Calendar,
      title: 'Appointment Enquiries',
      desc: 'Coordinate consultation slots, showroom visits, or site inspections directly inside WhatsApp. The AI shares available times and gathers customer details for your review.',
    },
    {
      icon: HelpCircle,
      title: 'Product Questions',
      desc: 'Share detailed product specifications, sizes, available colors, and stock status instantly. Customers get the exact facts they need to make a confident purchasing decision.',
    },
    {
      icon: Wrench,
      title: 'Service Enquiries',
      desc: 'Explain what is included in your service packages, how long a project typically takes, and standard service fees. Customers get complete transparency before making a booking.',
      link: '/whatsapp-ai-for-small-business',
      linkText: 'See Small Business Use Cases →',
    },
    {
      icon: Info,
      title: 'Business Information',
      desc: 'Provide instant access to your office address, Google Maps location, bank transfer details, and operating hours. Routine enquiries are solved in seconds without taking up your phone time.',
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/use-cases" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Direct Statement */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Practical Applications</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            What Can You Use WhatsApp AI For?
          </h1>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-3">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              Businesses use Nam Nilam WhatsApp AI across every stage of the customer journey, from first contact and product inquiries to lead qualification, appointment booking, and customer support.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Explore the 8 primary use cases below to see how automated WhatsApp conversations can save your team hours every day.
            </p>
          </div>
        </div>

        {/* 8 Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-palegreen-200 shadow-2xs hover:border-gold-400 hover:shadow-card transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-palegreen-100 text-namnilam-900 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5 text-namnilam-800" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {card.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {card.link && (
                  <div className="pt-2 border-t border-palegreen-100">
                    <Link
                      to={card.link}
                      className="inline-flex items-center gap-1 text-xs font-bold text-namnilam-900 hover:text-gold-700 transition"
                    >
                      <span>{card.linkText}</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Featured Industry Callouts */}
        <section className="bg-palegreen-50/60 rounded-3xl p-6 sm:p-8 border border-palegreen-200 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Dedicated Industry Solutions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            See specific examples tailored to your industry:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Link
              to="/whatsapp-ai-for-real-estate"
              className="bg-white p-4 rounded-2xl border border-palegreen-200 hover:border-gold-400 font-bold text-sm text-slate-900 hover:text-namnilam-900 transition flex items-center justify-between"
            >
              <span>Real Estate AI</span>
              <ArrowRight className="w-4 h-4 text-gold-600" />
            </Link>
            <Link
              to="/whatsapp-ai-for-small-business"
              className="bg-white p-4 rounded-2xl border border-palegreen-200 hover:border-gold-400 font-bold text-sm text-slate-900 hover:text-namnilam-900 transition flex items-center justify-between"
            >
              <span>Small Businesses</span>
              <ArrowRight className="w-4 h-4 text-gold-600" />
            </Link>
            <Link
              to="/whatsapp-ai-for-customer-support"
              className="bg-white p-4 rounded-2xl border border-palegreen-200 hover:border-gold-400 font-bold text-sm text-slate-900 hover:text-namnilam-900 transition flex items-center justify-between"
            >
              <span>Customer Support</span>
              <ArrowRight className="w-4 h-4 text-gold-600" />
            </Link>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palegreen-50 text-namnilam-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Test Your Use Case</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Have a specific use case in mind?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Chat with Nam Nilam AI on WhatsApp ({WHATSAPP_NUMBER}) to see how it can handle your daily customer conversations.
          </p>
          <div className="pt-2">
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-namnilam-900 hover:bg-namnilam-950 text-white font-bold text-base shadow-md hover:shadow-lg ring-1 ring-gold-400/50 hover:ring-gold-400 transition-all active:scale-95 group"
            >
              <Sparkles className="w-5 h-5 text-gold-300 group-hover:rotate-12 transition-transform" />
              <span>Chat with Nam Nilam AI →</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

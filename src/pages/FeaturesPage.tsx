import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, Target, Repeat, BookOpen, UserCheck, History, Clock, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WHATSAPP_CHAT_URL, WHATSAPP_NUMBER } from '../constants';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Customer Replies',
      subtitle: 'Answer customer questions automatically.',
      desc: 'Nam Nilam WhatsApp AI responds to customer messages right as they arrive. It handles greetings, product queries, price requests, and FAQs with clarity and polite phrasing, ensuring your customers never experience long wait times.',
    },
    {
      icon: Target,
      title: 'Lead Qualification',
      subtitle: 'Understand what customers are looking for.',
      desc: 'The AI asks natural, structured questions to discover what each customer needs, their specific requirements, their preferred timeline, and their budget range. This lets you focus your personal attention on serious, qualified buyers.',
    },
    {
      icon: Repeat,
      title: 'Follow-Up',
      subtitle: 'Continue conversations with interested customers.',
      desc: 'Interested customers often get distracted before completing an order or booking an appointment. The AI sends gentle, helpful follow-up messages to check if they have further questions and keep the deal moving forward.',
    },
    {
      icon: BookOpen,
      title: 'Business Knowledge',
      subtitle: 'Give AI information about your business.',
      desc: 'You teach the AI using your actual business documentation, price sheets, service packages, and policies. The AI stays strictly within the facts you provide, ensuring reliable and accurate communication with every customer.',
    },
    {
      icon: UserCheck,
      title: 'Human Handover',
      subtitle: 'Move the conversation back to your team whenever needed.',
      desc: 'You retain full control over your WhatsApp. Whenever a conversation needs personal negotiation, custom pricing, or complex consultation, you can step in directly on your phone and reply seamlessly.',
    },
    {
      icon: History,
      title: 'Conversation History',
      subtitle: 'Keep track of customer conversations.',
      desc: 'Because everything runs on WhatsApp, you have a complete, readable record of every conversation, customer question, and lead qualification right in your chat list.',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      subtitle: 'Help customers even when your team is unavailable.',
      desc: 'Customers frequently browse and message late in the evening or on weekends. The AI remains active non-stop, greeting customers and gathering enquiries even while your physical office is closed.',
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/features" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Direct Statement */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Core Capabilities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Everything You Need to Let AI Handle WhatsApp Conversations
          </h1>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-3">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              Nam Nilam WhatsApp AI provides practical features designed to automate routine messages while keeping your customer interactions personal, polite, and trustworthy.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Every feature is built around the way real businesses use WhatsApp every day: clear answers, fast responses, lead qualification, and easy human takeover.
            </p>
          </div>
        </div>

        {/* 7 Feature Sections */}
        <div className="space-y-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <section
                key={feat.title}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs hover:border-gold-400 transition-all space-y-3"
                aria-labelledby={`feature-${feat.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-palegreen-100 text-namnilam-900 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5 text-namnilam-800" />
                  </div>
                  <div>
                    <h2
                      id={`feature-${feat.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xl sm:text-2xl font-bold text-slate-900"
                    >
                      {feat.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gold-700 font-semibold">{feat.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
                  {feat.desc}
                </p>
              </section>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palegreen-50 text-namnilam-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ready to Test?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            See these features in action
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Chat with Nam Nilam AI on WhatsApp ({WHATSAPP_NUMBER}) and experience real-time AI replies and lead follow-up.
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

        {/* Bottom Internal Links */}
        <div className="pt-8 border-t border-palegreen-200/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <Link to="/use-cases" className="hover:text-namnilam-900 font-semibold transition">
            Next: Review Use Cases by Industry →
          </Link>
          <Link to="/whatsapp-ai-for-real-estate" className="hover:text-namnilam-900 font-semibold transition">
            WhatsApp AI for Real Estate →
          </Link>
        </div>

      </div>
    </div>
  );
};

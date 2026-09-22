import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Store, Check, ShieldCheck, UserCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WHATSAPP_CHAT_URL, WHATSAPP_NUMBER } from '../constants';

export const SmallBusinessPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/whatsapp-ai-for-small-business" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Direct Statement */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Store className="w-3.5 h-3.5 text-gold-600" />
            <span>Small Business Automation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            WhatsApp AI for Small Businesses
          </h1>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-3">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              Small businesses and local business owners often juggle serving existing clients while fielding a stream of WhatsApp messages from new leads. Nam Nilam WhatsApp AI lets you provide prompt, professional customer communication without needing to hire a full-time support team.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Whether you run a consulting firm, clinic, local agency, or retail service, AI handles routine questions, shares prices, and keeps leads engaged while you focus on doing the work.
            </p>
          </div>
        </div>

        {/* 6 Everyday Benefits for Small Businesses */}
        <section className="space-y-6" aria-labelledby="small-biz-benefits">
          <div className="text-center space-y-2">
            <h2 id="small-biz-benefits" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How Small Businesses Use WhatsApp AI Every Day
            </h2>
            <p className="text-slate-600 text-base">
              Simple, reliable support that frees up your time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Answer customer questions',
                desc: 'Give instant responses about your location, opening hours, booking availability, and how to get started.',
              },
              {
                title: 'Share prices clearly',
                desc: 'Send exact rate cards, consultation fees, or product prices without having to type them out every single time.',
              },
              {
                title: 'Explain services in detail',
                desc: 'Describe what your packages include, deliverables, and terms so customers can decide faster.',
              },
              {
                title: 'Collect enquiries round the clock',
                desc: 'Gather customer contact details, specific requirements, and notes when customers text you in the evening or over weekends.',
              },
              {
                title: 'Follow up with customers',
                desc: 'Send polite follow-ups to people who asked for details but forgot to reply, re-opening valuable conversations.',
              },
              {
                title: 'Handle common repetitive questions',
                desc: 'Free up 2–3 hours every day by letting AI answer the routine questions you get asked 20 times a day.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-5 border border-palegreen-200 shadow-2xs hover:border-gold-400 transition-all flex items-start gap-3.5"
              >
                <div className="w-6 h-6 rounded-full bg-palegreen-100 text-namnilam-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Small Business Peace of Mind Box */}
        <div className="bg-palegreen-50/60 rounded-3xl p-6 sm:p-8 border border-palegreen-200 space-y-3">
          <div className="flex items-center gap-2 text-namnilam-900 font-bold text-base">
            <UserCheck className="w-5 h-5 text-gold-600" />
            <span>You Always Stay in Charge</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            As a small business owner, your personal relationship with clients matters. Nam Nilam WhatsApp AI does not replace you — it assists you. You can see all messages on your phone at any time and take over the conversation whenever you want to reply personally.
          </p>
        </div>

        {/* CTA Card */}
        <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palegreen-50 text-namnilam-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Designed for Small Businesses</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Grow your business without growing your workload
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Chat with Nam Nilam AI on WhatsApp ({WHATSAPP_NUMBER}) and see how easily you can connect your existing WhatsApp.
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
          <Link to="/whatsapp-ai-for-customer-support" className="hover:text-namnilam-900 font-semibold transition">
            See Customer Support Solutions →
          </Link>
          <Link to="/faq" className="hover:text-namnilam-900 font-semibold transition">
            Read Small Business FAQs →
          </Link>
        </div>

      </div>
    </div>
  );
};

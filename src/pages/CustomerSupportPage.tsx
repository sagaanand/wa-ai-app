import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Headphones, HelpCircle, Package, Wrench, LifeBuoy, UserCheck, ShieldCheck, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WHATSAPP_CHAT_URL, WHATSAPP_NUMBER } from '../constants';

export const CustomerSupportPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/whatsapp-ai-for-customer-support" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Direct Statement */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Headphones className="w-3.5 h-3.5 text-gold-600" />
            <span>Support Automation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            AI Customer Support on WhatsApp
          </h1>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-3">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              Your customers can ask questions on WhatsApp and AI can help provide quick answers based on the information you give it.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Customers hate waiting on hold or waiting hours for email replies. By bringing AI customer support to WhatsApp, you answer queries within seconds while maintaining complete human handover capability.
            </p>
          </div>
        </div>

        {/* 5 Core Customer Support Functions */}
        <section className="space-y-6" aria-labelledby="support-functions">
          <div className="text-center space-y-2">
            <h2 id="support-functions" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              What AI Support Handles on WhatsApp
            </h2>
            <p className="text-slate-600 text-base">
              Reliable, factual resolution for the majority of incoming client inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: HelpCircle,
                title: 'Frequently Asked Questions',
                desc: 'Instantly answers repeated customer questions such as operating hours, address, payment methods, delivery timelines, and return rules.',
              },
              {
                icon: Package,
                title: 'Product Information',
                desc: 'Shares dimensions, specifications, current pricing, color choices, and availability based directly on your product catalog.',
              },
              {
                icon: Wrench,
                title: 'Service Information',
                desc: 'Explains what services you provide, step-by-step service procedures, required documents, and quotation estimates.',
              },
              {
                icon: LifeBuoy,
                title: 'Basic Support & Troubleshooting',
                desc: 'Guides customers through common troubleshooting steps, registration questions, or how to access their account details.',
              },
              {
                icon: UserCheck,
                title: 'Seamless Human Handover',
                desc: 'When an inquiry requires personal consultation or specialized exception handling, the AI alerts your team and hands over the chat gracefully.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-6 border border-palegreen-200 shadow-2xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-palegreen-100 text-namnilam-900 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5 text-namnilam-800" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Real Examples of Common Questions Handled */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-4" aria-labelledby="common-q-heading">
          <h2 id="common-q-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
            Examples of Everyday Questions Handled by AI
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 pt-2">
            {[
              '“What are your operating hours on weekends?”',
              '“How much do you charge for a 1-on-1 consultation?”',
              '“Can you send your office address and location pin?”',
              '“Is the plot ready for registration immediately?”',
              '“What payment modes do you accept?”',
              '“How can I book an appointment with your senior team?”',
            ].map((q) => (
              <div key={q} className="p-3.5 rounded-2xl bg-palegreen-50/70 border border-palegreen-100 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium italic">{q}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palegreen-50 text-namnilam-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>24/7 Support Quality</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Provide instant support to every customer
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Try a live conversation with Nam Nilam AI on WhatsApp ({WHATSAPP_NUMBER}) and see how smoothly it resolves customer questions.
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
          <Link to="/faq" className="hover:text-namnilam-900 font-semibold transition">
            See the Complete WhatsApp AI FAQ →
          </Link>
          <Link to="/about" className="hover:text-namnilam-900 font-semibold transition">
            About Nam Nilam →
          </Link>
        </div>

      </div>
    </div>
  );
};

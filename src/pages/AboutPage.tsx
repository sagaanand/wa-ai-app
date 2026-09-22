import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ShieldCheck, Heart, UserCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WHATSAPP_CHAT_URL, WHATSAPP_NUMBER } from '../constants';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/about" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Direct Statement */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Our Purpose</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Making Business Conversations Simpler
          </h1>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-3">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              Nam Nilam was created with a straightforward purpose: to help businesses communicate with their customers more easily, quickly, and reliably on WhatsApp.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Every day, thousands of businesses receive WhatsApp messages from interested buyers. When business owners are busy, in meetings, or off duty, those messages go unanswered for hours. We build AI that takes the friction out of business conversations while keeping you firmly in control.
            </p>
          </div>
        </div>

        {/* What We Focus On (Core Pillars) */}
        <section className="space-y-6" aria-labelledby="core-values">
          <div className="text-center space-y-2">
            <h2 id="core-values" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              What We Believe In
            </h2>
            <p className="text-slate-600 text-base">
              The principles behind Nam Nilam WhatsApp AI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: MessageCircle,
                title: 'WhatsApp First',
                desc: 'WhatsApp is where your customers prefer to talk. We believe business software should adapt to the channels customers actually use every day.',
              },
              {
                icon: Sparkles,
                title: 'Practical AI',
                desc: 'We focus on practical, factual AI assistance that provides clear, accurate answers based on your real business information, not generic gimmicks.',
              },
              {
                icon: Heart,
                title: 'Simplicity',
                desc: 'No confusing developer dashboards or steep learning curves. Connecting your WhatsApp should take minutes and work seamlessly out of the box.',
              },
              {
                icon: UserCheck,
                title: 'Human Control',
                desc: 'Technology should empower business owners, not replace them. You always have full visibility into your chats and can take over anytime.',
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-palegreen-200 shadow-2xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-palegreen-100 text-namnilam-900 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5 text-namnilam-800" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Commitment to Transparency */}
        <section className="bg-palegreen-50/60 rounded-3xl p-6 sm:p-8 border border-palegreen-200 space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            A Clean, Business-Focused Approach
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            We do not make exaggerated claims. We focus on delivering responsive, dependable automated customer communication that helps you respond faster, qualify leads clearly, and serve your customers better.
          </p>
        </section>

        {/* CTA Card */}
        <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palegreen-50 text-namnilam-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Connect with Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Talk to Nam Nilam AI on WhatsApp
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Experience our conversational assistant firsthand at {WHATSAPP_NUMBER} and see how it works.
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
          <Link to="/contact" className="hover:text-namnilam-900 font-semibold transition">
            Next: Contact Us →
          </Link>
          <Link to="/faq" className="hover:text-namnilam-900 font-semibold transition">
            Review Questions & Answers →
          </Link>
        </div>

      </div>
    </div>
  );
};

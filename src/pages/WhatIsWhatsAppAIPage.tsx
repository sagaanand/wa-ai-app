import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowDown, Check, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WHATSAPP_CHAT_URL, WHATSAPP_NUMBER } from '../constants';

export const WhatIsWhatsAppAIPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/whatsapp-ai" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & AEO Direct Answer Section */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Guide & Definition</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            What Is WhatsApp AI?
          </h1>

          {/* Direct Answer Paragraph for AEO / GEO */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-4 ring-1 ring-gold-300/20">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              <strong className="text-namnilam-950 font-bold">WhatsApp AI</strong> is an AI assistant that can help a business communicate with customers through WhatsApp. Instead of answering every message manually, businesses can use AI to answer common questions, share information, collect customer details and follow up with enquiries.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Nam Nilam WhatsApp AI connects directly to your existing WhatsApp number, functioning like a round-the-clock team member that knows your business details, handles incoming chats, and lets you take over whenever human attention is needed.
            </p>
          </div>
        </div>

        {/* Section: How WhatsApp AI Works (Step-by-step Flow) */}
        <section className="space-y-6" aria-labelledby="flow-heading">
          <div className="text-center space-y-2">
            <h2 id="flow-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How WhatsApp AI Works
            </h2>
            <p className="text-slate-600 text-base">
              A simple sequence designed for reliable, accurate business conversations.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs max-w-xl mx-auto space-y-4">
            {[
              { step: '1', title: 'Customer sends a message.', desc: 'A customer reaches out on your WhatsApp asking about products, pricing, or services.' },
              { step: '2', title: 'AI understands the question.', desc: 'The assistant interprets the question accurately, without relying on rigid keyword menus.' },
              { step: '3', title: 'AI uses your business information.', desc: 'It references only the facts, pricing, and details you have taught it.' },
              { step: '4', title: 'AI replies to the customer.', desc: 'The customer receives a clear, polite, and immediate response within seconds.' },
              { step: '5', title: 'You can take over when needed.', desc: 'You remain notified and can reply directly in WhatsApp whenever human input is preferred.' },
            ].map((item, index, arr) => (
              <React.Fragment key={item.step}>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-palegreen-50/50 border border-palegreen-100">
                  <div className="w-8 h-8 rounded-xl bg-namnilam-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {index < arr.length - 1 && (
                  <div className="flex justify-center text-gold-500 py-0.5">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-namnilam-900 hover:text-gold-700 transition"
            >
              <span>See detailed step-by-step setup in How It Works</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section: What Can WhatsApp AI Do? */}
        <section className="space-y-6" aria-labelledby="capabilities-heading">
          <div className="text-center space-y-2">
            <h2 id="capabilities-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              What Can WhatsApp AI Do?
            </h2>
            <p className="text-slate-600 text-base">
              Key everyday communication tasks Nam Nilam WhatsApp AI handles for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Answer questions', desc: 'Provide immediate, accurate answers to questions about your pricing, timings, and business location.' },
              { title: 'Share business information', desc: 'Share product catalogs, service overviews, and project highlights with interested buyers.' },
              { title: 'Handle enquiries', desc: 'Engage new incoming enquiries instantly so visitors never feel ignored or wait for hours.' },
              { title: 'Qualify leads', desc: 'Ask helpful questions to discover what a customer wants, their budget, and when they plan to buy.' },
              { title: 'Follow up', desc: 'Send thoughtful follow-up messages to keep conversations moving with interested prospects.' },
              { title: 'Collect customer requirements', desc: 'Gather specific customer preferences, locations, or requirements before scheduling a call.' },
              { title: 'Help book appointments', desc: 'Coordinate suitable dates and timings for consultations, meetings, or site visits.' },
              { title: 'Escalate conversations to a human', desc: 'Hand over complex questions or high-value discussions to you or your staff seamlessly.' },
            ].map((cap) => (
              <div
                key={cap.title}
                className="bg-white rounded-2xl p-5 border border-palegreen-200/90 shadow-2xs hover:border-gold-400 transition-all flex items-start gap-3.5"
              >
                <div className="w-6 h-6 rounded-full bg-palegreen-100 text-namnilam-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/features"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-namnilam-900 hover:text-gold-700 transition"
            >
              <span>Explore all WhatsApp AI Features</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section: WhatsApp AI vs Manual Replies */}
        <section className="space-y-6" aria-labelledby="vs-heading">
          <div className="text-center space-y-2">
            <h2 id="vs-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              WhatsApp AI vs Manual Replies
            </h2>
            <p className="text-slate-600 text-base">
              A factual look at how AI assists your daily customer messaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manual Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-bold text-slate-700 text-sm uppercase tracking-wider">
                  Manual Replies
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  Human Only
                </span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-namnilam-900 font-bold">Flow:</span>
                  <span>Customer messages → You see it → You reply</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Replies take minutes or hours when you are busy or asleep</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Repetitive questions take up valuable daily business hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Follow-ups often get forgotten during busy weekdays</span>
                </div>
              </div>
            </div>

            {/* AI Assisted Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gold-400/80 shadow-card space-y-4 ring-1 ring-gold-400/20">
              <div className="flex items-center justify-between border-b border-palegreen-100 pb-3">
                <span className="font-bold text-namnilam-950 text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  Nam Nilam WhatsApp AI
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-palegreen-100 text-namnilam-900 font-bold">
                  AI + Human Control
                </span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-namnilam-900 font-bold">Flow:</span>
                  <span>Customer messages → AI understands → AI replies</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Replies sent instantly, 24 hours a day, 7 days a week</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Routine pricing, product, and timing questions handled automatically</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>You retain 100% control to take over any chat directly on your phone</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conversion CTA Box */}
        <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palegreen-50 text-namnilam-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Try It Live on WhatsApp</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Want to see how it answers your questions?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Chat with our AI assistant on WhatsApp ({WHATSAPP_NUMBER}) and experience the response speed firsthand.
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

        {/* Related Navigation Links for Internal Linking */}
        <div className="pt-8 border-t border-palegreen-200/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <Link to="/whatsapp-ai-for-business" className="hover:text-namnilam-900 font-semibold transition">
            Next: WhatsApp AI for Business →
          </Link>
          <Link to="/faq" className="hover:text-namnilam-900 font-semibold transition">
            Read Frequently Asked Questions →
          </Link>
        </div>

      </div>
    </div>
  );
};

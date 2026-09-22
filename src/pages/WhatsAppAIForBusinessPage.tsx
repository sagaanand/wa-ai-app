import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, MessageSquareShare, Clock, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WHATSAPP_CHAT_URL } from '../constants';

export const WhatsAppAIForBusinessPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/whatsapp-ai-for-business" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Direct Statement */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Business Growth</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            WhatsApp AI for Your Business
          </h1>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-3">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              If your customers already contact you on WhatsApp, AI can help you handle those conversations faster and more consistently.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Instead of losing potential deals because messages went unanswered while you were in meetings or on site, Nam Nilam WhatsApp AI keeps every customer engaged with accurate information and prompt answers.
            </p>
          </div>
        </div>

        {/* 5 Core Pillars with Practical Examples */}
        <div className="space-y-8">
          
          {/* 1. Get Faster Replies */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-4" aria-labelledby="faster-replies">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-palegreen-100 text-namnilam-900 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5 text-namnilam-800" />
              </div>
              <div>
                <h2 id="faster-replies" className="text-xl sm:text-2xl font-bold text-slate-900">
                  Get Faster Replies
                </h2>
                <p className="text-xs text-slate-500">Customers do not have to wait for every answer.</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              When prospective clients text your business, their interest is highest in the first few minutes. Nam Nilam WhatsApp AI responds within 5 seconds, answering pricing queries, providing catalog links, and confirming availability immediately.
            </p>
            <div className="bg-palegreen-50/60 rounded-2xl p-4 border border-palegreen-100 text-xs sm:text-sm text-slate-700 space-y-1">
              <span className="font-bold text-namnilam-950 block">Practical Example:</span>
              <p>A client texts at 9:30 PM: <em>"What are your consulting hours and rates?"</em> Within seconds, the AI shares your standard fee structure and available calendar slots.</p>
            </div>
          </section>

          {/* 2. Handle More Conversations */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-4" aria-labelledby="handle-more">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-palegreen-100 text-namnilam-900 flex items-center justify-center font-bold">
                <MessageSquareShare className="w-5 h-5 text-namnilam-800" />
              </div>
              <div>
                <h2 id="handle-more" className="text-xl sm:text-2xl font-bold text-slate-900">
                  Handle More Conversations
                </h2>
                <p className="text-xs text-slate-500">AI can help with routine customer questions.</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Up to 70% of business WhatsApp messages ask the same repetitive questions: <em>"Where is your office located?"</em>, <em>"Can you share brochure?"</em>, or <em>"Is this in stock?"</em>. Nam Nilam WhatsApp AI handles all of these simultaneously without getting tired.
            </p>
            <div className="bg-palegreen-50/60 rounded-2xl p-4 border border-palegreen-100 text-xs sm:text-sm text-slate-700 space-y-1">
              <span className="font-bold text-namnilam-950 block">Practical Example:</span>
              <p>During a promotion or marketing campaign, 50 people ask for details at the same time. The AI answers all 50 conversations concurrently without queuing or delay.</p>
            </div>
          </section>

          {/* 3. Follow Up With Leads */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-4" aria-labelledby="follow-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-palegreen-100 text-namnilam-900 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-namnilam-800" />
              </div>
              <div>
                <h2 id="follow-up" className="text-xl sm:text-2xl font-bold text-slate-900">
                  Follow Up With Leads
                </h2>
                <p className="text-xs text-slate-500">Keep conversations moving after the first enquiry.</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Most sales happen during follow-up, but busy business owners rarely have time to chase every enquiry. Nam Nilam WhatsApp AI continues the dialogue politely, asking if the customer reviewed the information and offering next steps.
            </p>
            <div className="bg-palegreen-50/60 rounded-2xl p-4 border border-palegreen-100 text-xs sm:text-sm text-slate-700 space-y-1">
              <span className="font-bold text-namnilam-950 block">Practical Example:</span>
              <p>If a customer asked for pricing yesterday but went silent, the AI can check in: <em>"Hi, did you have a chance to look over the pricing details? Let me know if you have any questions."</em></p>
            </div>
          </section>

          {/* 4. Stay Available */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-4" aria-labelledby="stay-available">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-palegreen-100 text-namnilam-900 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5 text-namnilam-800" />
              </div>
              <div>
                <h2 id="stay-available" className="text-xl sm:text-2xl font-bold text-slate-900">
                  Stay Available
                </h2>
                <p className="text-xs text-slate-500">Your business can continue responding outside your working hours.</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Customers often search for products in the evening, on weekends, or during holidays when your doors are closed. With WhatsApp AI active, your business remains attentive 24/7 without requiring overnight staff.
            </p>
            <div className="bg-palegreen-50/60 rounded-2xl p-4 border border-palegreen-100 text-xs sm:text-sm text-slate-700 space-y-1">
              <span className="font-bold text-namnilam-950 block">Practical Example:</span>
              <p>A weekend buyer reaches out on Sunday afternoon. The AI answers their question, gathers their name and requirement, and prepares the lead for Monday morning.</p>
            </div>
          </section>

          {/* 5. Keep Human Control */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-4" aria-labelledby="keep-control">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-palegreen-100 text-namnilam-900 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5 text-namnilam-800" />
              </div>
              <div>
                <h2 id="keep-control" className="text-xl sm:text-2xl font-bold text-slate-900">
                  Keep Human Control
                </h2>
                <p className="text-xs text-slate-500">You can step into a conversation whenever necessary.</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              AI doesn't lock you out. You can read any chat in real time directly from your phone's WhatsApp app. The moment you want to reply yourself or if a customer requests personal assistance, simply start typing.
            </p>
            <div className="bg-palegreen-50/60 rounded-2xl p-4 border border-palegreen-100 text-xs sm:text-sm text-slate-700 space-y-1">
              <span className="font-bold text-namnilam-950 block">Practical Example:</span>
              <p>A client asks for a custom wholesale discount. You see the chat notification and instantly take over the conversation to negotiate directly.</p>
            </div>
          </section>

        </div>

        {/* CTA Card */}
        <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palegreen-50 text-namnilam-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Connect in Minutes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Empower your business with WhatsApp AI
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Test the live AI assistant on WhatsApp (+91 97876 00221) and discover how it transforms customer communication.
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

        {/* Navigation & Contextual Links */}
        <div className="pt-8 border-t border-palegreen-200/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <Link to="/features" className="hover:text-namnilam-900 font-semibold transition">
            Next: Explore All Features →
          </Link>
          <Link to="/use-cases" className="hover:text-namnilam-900 font-semibold transition">
            See Industry Use Cases →
          </Link>
        </div>

      </div>
    </div>
  );
};

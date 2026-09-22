import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, QrCode, BookOpen, MessageSquare, UserCheck, CheckCheck, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WHATSAPP_CHAT_URL, WHATSAPP_NUMBER } from '../constants';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/how-it-works" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Direct Answer */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Step-By-Step Guide</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How Does WhatsApp AI Work?
          </h1>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-3">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              Nam Nilam WhatsApp AI works by pairing your WhatsApp number with a tailored AI assistant that references your business facts, responds to customer questions, and alerts you whenever personal intervention is helpful.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              There are no complex servers, APIs, or developer codes required. The entire setup is organized into 4 simple steps.
            </p>
          </div>
        </div>

        {/* 4 Simple Steps */}
        <section className="space-y-8" aria-labelledby="steps-heading">
          <div className="text-center space-y-1">
            <h2 id="steps-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The 4-Step Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From initial connection to live customer communication in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Step 1 — Connect */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-namnilam-900 text-white flex items-center justify-center font-bold">
                  <QrCode className="w-5 h-5 text-gold-300" />
                </div>
                <span className="text-xs font-mono font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
                  Step 01
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Step 1 — Connect
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect your WhatsApp. You simply scan a standard WhatsApp QR code using <em>Linked Devices</em> on your phone. Your existing number stays unchanged and active.
              </p>
            </div>

            {/* Step 2 — Teach */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-namnilam-900 text-white flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 text-gold-300" />
                </div>
                <span className="text-xs font-mono font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
                  Step 02
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Step 2 — Teach
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Give the AI information about your business. Add your product specifications, price lists, service descriptions, address, FAQs, and any specific conversational instructions.
              </p>
            </div>

            {/* Step 3 — AI Talks */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-namnilam-900 text-white flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5 text-gold-300" />
                </div>
                <span className="text-xs font-mono font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
                  Step 03
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Step 3 — AI Talks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Customers send messages and AI responds using your business information. Incoming questions receive clear, polite, and immediate answers around the clock.
              </p>
            </div>

            {/* Step 4 — Take Control */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-namnilam-900 text-white flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5 text-gold-300" />
                </div>
                <span className="text-xs font-mono font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
                  Step 04
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Step 4 — Take Control
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You can take over the conversation whenever you want. Simply open the chat on your phone and reply yourself. The AI pauses whenever a human is speaking.
              </p>
            </div>

          </div>
        </section>

        {/* Visual Conversation Example */}
        <section className="space-y-6" aria-labelledby="dialog-heading">
          <div className="text-center space-y-2">
            <h2 id="dialog-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Visual Conversation Example
            </h2>
            <p className="text-slate-600 text-base">
              See how a realistic customer interaction flows on WhatsApp.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 border border-palegreen-200 shadow-card space-y-4">
            {/* Header */}
            <div className="bg-[#075E54] text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <img
                  src="/nam-nilam-logo.png"
                  alt="Nam Nilam"
                  className="w-8 h-8 rounded-full bg-white p-0.5 object-contain"
                />
                <div>
                  <div className="text-xs font-bold">Nam Nilam AI</div>
                  <div className="text-[10px] text-emerald-100">+91 97876 00221 • Online</div>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-full">Active</span>
            </div>

            {/* Chat Body */}
            <div className="bg-[#EFEAE2]/70 p-4 rounded-2xl space-y-3.5 text-xs sm:text-sm">
              {/* Message 1 */}
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-slate-500 font-bold mb-1">Customer</span>
                <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs max-w-[85%] leading-relaxed">
                  Hi, I want to know more about your project.
                  <div className="text-[9px] text-slate-400 text-right mt-1">11:02 AM</div>
                </div>
              </div>

              {/* Reply 1 */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-[10px] font-bold text-namnilam-900 bg-white px-2 py-0.5 rounded-full mb-1 border border-gold-300">
                  <Sparkles className="w-2.5 h-2.5 text-gold-500" />
                  <span>AI Replying</span>
                </div>
                <div className="bg-[#D9FDD3] text-slate-900 rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-xs max-w-[85%] leading-relaxed">
                  Sure. I can help you with project details, pricing and availability. What information would you like to know?
                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 text-right mt-1">
                    <span>11:02 AM</span>
                    <CheckCheck className="w-3 h-3 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Message 2 */}
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-slate-500 font-bold mb-1">Customer</span>
                <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs max-w-[85%] leading-relaxed">
                  What is the price?
                  <div className="text-[9px] text-slate-400 text-right mt-1">11:03 AM</div>
                </div>
              </div>

              {/* Reply 2 */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-[10px] font-bold text-namnilam-900 bg-white px-2 py-0.5 rounded-full mb-1 border border-gold-300">
                  <Sparkles className="w-2.5 h-2.5 text-gold-500" />
                  <span>AI Replying</span>
                </div>
                <div className="bg-[#D9FDD3] text-slate-900 rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-xs max-w-[85%] leading-relaxed">
                  I can help with that. Let me know which project you're interested in.
                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 text-right mt-1">
                    <span>11:03 AM</span>
                    <CheckCheck className="w-3 h-3 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palegreen-50 text-namnilam-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ready to Test?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Experience the conversation yourself
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Chat with our AI on WhatsApp ({WHATSAPP_NUMBER}) right now and see how quickly it responds.
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
          <Link to="/features" className="hover:text-namnilam-900 font-semibold transition">
            Next: Review WhatsApp AI Features →
          </Link>
          <Link to="/use-cases" className="hover:text-namnilam-900 font-semibold transition">
            See Real-World Use Cases →
          </Link>
        </div>

      </div>
    </div>
  );
};

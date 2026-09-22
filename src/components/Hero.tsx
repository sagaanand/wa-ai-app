import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, CheckCheck } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_CHAT_URL } from '../constants';

interface HeroProps {
  onConnectClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Ambient background glow with pale green & gold */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-emerald-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-gold-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs"
            >
              <img src="/nam-nilam-logo.png" alt="" className="w-4 h-4 object-contain rounded-full" />
              <span>Nam Nilam WhatsApp AI</span>
            </motion.div>

            {/* Main Headline with Nam Nilam Forest & Gold Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
            >
              Let AI Talk to Your Customers{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-namnilam-800 via-gold-600 to-namnilam-700">
                on WhatsApp
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-xl"
            >
              Nam Nilam WhatsApp AI helps businesses use AI to answer customer messages, handle enquiries and follow up with leads on WhatsApp. Connect your WhatsApp and let your AI assistant keep conversations moving 24/7.
            </motion.p>

            {/* Primary CTA Block with Pale Green & Gold Theme */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 space-y-4"
            >
              {/* Value prompt box */}
              <div className="bg-white/95 border border-gold-300/70 rounded-3xl p-5 sm:p-6 max-w-xl space-y-3.5 shadow-card hover:border-gold-400 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-palegreen-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-namnilam-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-wa-light animate-ping" />
                    Live WhatsApp AI Demo
                  </span>
                  <a
                    href={WHATSAPP_CHAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-slate-800 hover:text-gold-700 transition"
                  >
                    {WHATSAPP_NUMBER}
                  </a>
                </div>

                <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                  Want to see how it works? Chat with our AI on WhatsApp and experience the conversation yourself.
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={WHATSAPP_CHAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-namnilam-900 hover:bg-namnilam-950 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg ring-1 ring-gold-400/50 hover:ring-gold-400 transition-all active:scale-95 group"
                  >
                    <Sparkles className="w-5 h-5 text-gold-300 group-hover:rotate-12 transition-transform" />
                    <span>Chat with Nam Nilam AI →</span>
                  </a>
                  <a
                    href="/how-it-works"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-palegreen-100/70 hover:bg-palegreen-200/80 text-namnilam-950 font-bold text-sm sm:text-base border border-palegreen-200 transition-all"
                  >
                    <span>How It Works</span>
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Connect in minutes. No technical setup required.</span>
              </p>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Conversation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 max-w-md mx-auto w-full"
          >
            {/* Phone/WhatsApp Chat Container */}
            <div className="bg-white rounded-3xl border border-palegreen-200/90 shadow-card p-4 sm:p-5 relative ring-1 ring-gold-300/30">
              {/* WhatsApp Header with Nam Nilam Official Logo */}
              <div className="bg-[#075E54] text-white rounded-2xl px-4 py-3 mb-4 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/nam-nilam-logo.png"
                      alt="Nam Nilam AI"
                      className="w-10 h-10 rounded-full bg-white p-0.5 object-contain ring-2 ring-gold-400/60"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                      <span>Nam Nilam AI</span>
                      <span className="text-[10px] text-gold-300 bg-emerald-950/60 px-1.5 py-0.2 rounded font-mono">
                        OFFICIAL
                      </span>
                    </h3>
                    <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-wa-light animate-pulse" />
                      +91 97876 00221 • Online
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold bg-emerald-800/80 px-2 py-0.5 rounded-full text-emerald-100">
                  AI Active
                </span>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3.5 bg-[#EFEAE2]/65 p-4 rounded-2xl border border-slate-100 min-h-[290px] flex flex-col justify-center">
                {/* 1. Customer Message */}
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-bold text-slate-500 mb-1 ml-1">Customer</span>
                  <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs text-xs sm:text-sm max-w-[85%] leading-relaxed">
                    Hi, I saw your project. Can you share the details?
                    <div className="text-[9px] text-slate-400 text-right mt-1">10:14 AM</div>
                  </div>
                </div>

                {/* 2. AI Assistant Message */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-namnilam-900 bg-white px-2.5 py-0.5 rounded-full mb-1 border border-gold-300/70 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-gold-500 fill-gold-500" />
                    <span>AI replying on your behalf</span>
                  </div>
                  <div className="bg-[#D9FDD3] text-slate-900 rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-xs text-xs sm:text-sm max-w-[85%] leading-relaxed">
                    Absolutely. I can help with the project details, pricing, availability, and site visit options.
                    <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 text-right mt-1">
                      <span>10:14 AM</span>
                      <CheckCheck className="w-3 h-3 text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* 3. Customer Message */}
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-bold text-slate-500 mb-1 ml-1">Customer</span>
                  <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs text-xs sm:text-sm max-w-[85%] leading-relaxed">
                    Can I visit this weekend?
                    <div className="text-[9px] text-slate-400 text-right mt-1">10:15 AM</div>
                  </div>
                </div>

                {/* 4. AI Assistant Message */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-namnilam-900 bg-white px-2.5 py-0.5 rounded-full mb-1 border border-gold-300/70 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-gold-500 fill-gold-500" />
                    <span>AI replying on your behalf</span>
                  </div>
                  <div className="bg-[#D9FDD3] text-slate-900 rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-xs text-xs sm:text-sm max-w-[85%] leading-relaxed">
                    Sure. Would Saturday morning or Sunday evening work better for you?
                    <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 text-right mt-1">
                      <span>10:15 AM</span>
                      <CheckCheck className="w-3 h-3 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Trust Badge */}
              <div className="mt-3 text-center">
                <span className="text-xs text-slate-600 font-medium">
                  Instant response • Personalized to your business
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

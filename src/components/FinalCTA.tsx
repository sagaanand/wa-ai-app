import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_CHAT_URL } from '../constants';

interface FinalCTAProps {
  onConnectClick?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = () => {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-palegreen-50/40 via-palegreen-100/50 to-palegreen-200/40 border-t border-palegreen-200 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-gold-200/20 rounded-full blur-3xl -z-10" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Small brand badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <img src="/nam-nilam-logo.png" alt="" className="w-4 h-4 object-contain rounded-full" />
          <span>Nam Nilam WhatsApp AI</span>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Your Customers Are Already on WhatsApp.
          </h2>
          <p className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-namnilam-900 via-gold-600 to-namnilam-800 tracking-tight">
            Let AI Talk to Them.
          </p>
        </div>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto font-normal leading-relaxed">
          Connect your WhatsApp and give your business a 24/7 AI assistant.
        </p>

        {/* Value prompt & Phone Callout */}
        <div className="max-w-xl mx-auto bg-white/95 border border-gold-300/90 rounded-3xl p-6 sm:p-7 shadow-card space-y-4">
          <p className="text-sm sm:text-base font-semibold text-slate-800">
            Want to see how it works? Chat with our AI on WhatsApp and experience the conversation yourself.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-800 bg-palegreen-50 py-1.5 px-3 rounded-full w-fit mx-auto border border-palegreen-200">
            <span className="w-2 h-2 rounded-full bg-wa-light animate-ping" />
            <span>{WHATSAPP_NUMBER}</span>
          </div>

          <div className="pt-1 flex justify-center">
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-namnilam-900 hover:bg-namnilam-950 text-white font-bold text-base shadow-lg hover:shadow-xl ring-1 ring-gold-400/50 hover:ring-gold-400 transition-all active:scale-95 group"
            >
              <Sparkles className="w-5 h-5 text-gold-300 group-hover:rotate-12 transition-transform" />
              <span>Chat with Nam Nilam AI →</span>
            </a>
          </div>
        </div>

        {/* Small text */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 pt-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Simple setup. Human control. AI-powered conversations.</span>
        </div>

      </div>
    </section>
  );
};

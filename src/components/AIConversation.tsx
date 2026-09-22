import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCheck, MessageSquareHeart } from 'lucide-react';

export const AIConversation: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <span>Conversational Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Customers Keep Talking. AI Keeps Responding.
          </h2>
          <p className="text-base sm:text-lg text-slate-700">
            Never leave a potential buyer waiting. AI handles the conversation with clarity, professionalism, and speed.
          </p>
        </div>

        {/* Simple Conversation UI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#EFEAE2]/70 rounded-3xl border border-palegreen-200 p-5 sm:p-8 max-w-lg mx-auto shadow-card space-y-4 ring-1 ring-gold-300/30"
        >
          {/* Conversation Header */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-palegreen-100 shadow-2xs mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-palegreen-100 text-namnilam-900 font-bold text-xs flex items-center justify-center ring-1 ring-gold-400/40">
                PB
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Prospective Buyer</span>
                <span className="text-[10px] text-slate-500 block">WhatsApp Chat</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <img src="/nam-nilam-logo.png" alt="" className="w-5 h-5 object-contain rounded-full" />
              <span className="text-[11px] font-semibold text-namnilam-900 bg-palegreen-50 px-2.5 py-0.5 rounded-full border border-palegreen-200">
                AI Active
              </span>
            </div>
          </div>

          {/* 1. Customer */}
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold text-slate-500 mb-1 ml-1">Customer</span>
            <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-xs text-sm max-w-[85%] leading-relaxed">
              Hi, what is the price?
              <div className="text-[9px] text-slate-400 text-right mt-1">2:41 PM</div>
            </div>
          </div>

          {/* 2. AI */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-[10px] font-bold text-namnilam-900 bg-white px-2.5 py-0.5 rounded-full mb-1 border border-gold-300/80 shadow-2xs">
              <Sparkles className="w-3 h-3 text-gold-500 fill-gold-500" />
              <span>AI replied</span>
            </div>
            <div className="bg-[#D9FDD3] text-slate-900 rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-xs text-sm max-w-[85%] leading-relaxed">
              Our plots start from ₹18.5 Lakhs. I can also share the available options with you.
              <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 text-right mt-1">
                <span>2:41 PM</span>
                <CheckCheck className="w-3 h-3 text-blue-500" />
              </div>
            </div>
          </div>

          {/* 3. Customer */}
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold text-slate-500 mb-1 ml-1">Customer</span>
            <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-xs text-sm max-w-[85%] leading-relaxed">
              Can I visit the site?
              <div className="text-[9px] text-slate-400 text-right mt-1">2:42 PM</div>
            </div>
          </div>

          {/* 4. AI */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-[10px] font-bold text-namnilam-900 bg-white px-2.5 py-0.5 rounded-full mb-1 border border-gold-300/80 shadow-2xs">
              <Sparkles className="w-3 h-3 text-gold-500 fill-gold-500" />
              <span>AI replied</span>
            </div>
            <div className="bg-[#D9FDD3] text-slate-900 rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-xs text-sm max-w-[85%] leading-relaxed">
              Of course. Would you prefer Saturday or Sunday?
              <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 text-right mt-1">
                <span>2:42 PM</span>
                <CheckCheck className="w-3 h-3 text-blue-500" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Small message highlight */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-gold-300/80 text-namnilam-900 font-semibold text-sm shadow-2xs">
            <MessageSquareHeart className="w-4 h-4 text-gold-600" />
            <span>Every conversation can become an opportunity.</span>
          </div>
        </div>

      </div>
    </section>
  );
};

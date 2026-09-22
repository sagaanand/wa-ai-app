import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { WHATSAPP_CHAT_URL } from '../constants';

interface WhatsAppConnectionProps {
  onConnectClick: () => void;
}

export const WhatsAppConnection: React.FC<WhatsAppConnectionProps> = ({ onConnectClick }) => {
  return (
    <section id="connection" className="py-20 bg-palegreen-50/70 border-y border-palegreen-200/70 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <span>Instant Linking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Connect Your Existing WhatsApp
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            No need to create a new number. Connect the WhatsApp you already use and let AI assist you with your customer conversations.
          </p>
        </div>

        {/* Clean WhatsApp Connection Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-palegreen-200 shadow-card max-w-md mx-auto text-center ring-1 ring-gold-300/30"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-palegreen-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <img src="/nam-nilam-logo.png" alt="Nam Nilam" className="w-6 h-6 object-contain rounded-full" />
              <h3 className="text-lg font-bold text-slate-900">
                Connect WhatsApp
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-palegreen-50 text-namnilam-900 border border-palegreen-200">
              <span className="w-2 h-2 rounded-full bg-wa-light animate-pulse" />
              Easy Pairing
            </span>
          </div>

          {/* QR Code Illustration with Nam Nilam Gold & Forest Accent */}
          <div className="relative p-4 rounded-2xl bg-white border border-palegreen-200 shadow-2xs inline-block mb-6 cursor-pointer group" onClick={onConnectClick}>
            <svg
              className="w-48 h-48 text-slate-900"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <rect x="15" y="15" width="50" height="50" rx="6" fill="#0C382A" />
              <rect x="25" y="25" width="30" height="30" rx="3" fill="#FFFFFF" />
              <rect x="33" y="33" width="14" height="14" rx="2" fill="#0C382A" />

              <rect x="135" y="15" width="50" height="50" rx="6" fill="#0C382A" />
              <rect x="145" y="25" width="30" height="30" rx="3" fill="#FFFFFF" />
              <rect x="153" y="33" width="14" height="14" rx="2" fill="#0C382A" />

              <rect x="15" y="135" width="50" height="50" rx="6" fill="#0C382A" />
              <rect x="25" y="145" width="30" height="30" rx="3" fill="#FFFFFF" />
              <rect x="33" y="153" width="14" height="14" rx="2" fill="#0C382A" />

              <rect x="75" y="20" width="12" height="12" rx="2" fill="#C5A25D" />
              <rect x="95" y="20" width="24" height="12" rx="2" fill="#0C382A" />
              <rect x="75" y="40" width="20" height="12" rx="2" fill="#0C382A" />
              <rect x="105" y="40" width="14" height="25" rx="2" fill="#C5A25D" />

              <rect x="20" y="75" width="14" height="20" rx="2" fill="#0C382A" />
              <rect x="42" y="75" width="20" height="12" rx="2" fill="#17644A" />
              <rect x="20" y="105" width="25" height="15" rx="2" fill="#0C382A" />
              <rect x="52" y="95" width="15" height="24" rx="2" fill="#C5A25D" />

              {/* Center Logo Backdrop */}
              <rect x="75" y="75" width="50" height="50" rx="10" fill="#F0F9F5" />
              <circle cx="100" cy="100" r="18" fill="#FFFFFF" stroke="#C5A25D" strokeWidth="2" />
              <path d="M92 106L100 95L108 106" stroke="#C5A25D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M96 106L100 101L104 106" stroke="#C5A25D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              <rect x="135" y="75" width="18" height="18" rx="2" fill="#0C382A" />
              <rect x="160" y="75" width="25" height="14" rx="2" fill="#C5A25D" />
              <rect x="140" y="102" width="22" height="12" rx="2" fill="#0C382A" />
              <rect x="170" y="98" width="15" height="20" rx="2" fill="#17644A" />

              <rect x="75" y="135" width="22" height="15" rx="2" fill="#0C382A" />
              <rect x="105" y="135" width="18" height="25" rx="2" fill="#C5A25D" />
              <rect x="75" y="158" width="24" height="22" rx="2" fill="#17644A" />

              <rect x="135" y="135" width="20" height="20" rx="2" fill="#0C382A" />
              <rect x="162" y="135" width="23" height="14" rx="2" fill="#0C382A" />
              <rect x="135" y="162" width="15" height="23" rx="2" fill="#C5A25D" />
              <rect x="156" y="156" width="29" height="29" rx="2" fill="#0C382A" />
            </svg>
            <div className="absolute left-3 right-3 h-1 bg-gradient-to-r from-transparent via-wa-light to-transparent rounded-full animate-laser pointer-events-none" />
          </div>

          {/* Linking text */}
          <div className="bg-palegreen-50 border border-palegreen-200 rounded-xl p-3 mb-5 text-xs font-semibold text-slate-800 flex items-center justify-center gap-2">
            <Smartphone className="w-4 h-4 text-namnilam-800 shrink-0" />
            <span>Scan with WhatsApp → Linked Devices → Link a Device</span>
          </div>

          {/* Connect Now Button */}
          <div className="space-y-2">
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-namnilam-900 hover:bg-namnilam-950 text-white font-bold text-sm shadow-md hover:shadow-lg ring-1 ring-gold-400/50 hover:ring-gold-400 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span>Connect Now (Chat with AI)</span>
              <ArrowRight className="w-4 h-4 text-gold-300" />
            </a>

            <button
              onClick={onConnectClick}
              className="w-full py-2.5 rounded-xl bg-palegreen-100/70 hover:bg-palegreen-200/70 text-namnilam-900 font-semibold text-xs transition"
            >
              Simulate QR Scanning Modal
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mt-3 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Works with your personal or business WhatsApp</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
};

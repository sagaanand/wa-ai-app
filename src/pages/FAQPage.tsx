import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { FAQ_ITEMS, WHATSAPP_CHAT_URL, WHATSAPP_NUMBER } from '../constants';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open for instant AEO answer

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/faq" faqList={FAQ_ITEMS} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Direct Statement */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
            <span>Frequently Asked Questions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions About WhatsApp AI
          </h1>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-3">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              Find concise, factual answers to common questions about connecting your WhatsApp, teaching the AI your business information, lead qualification, human handover, and 24/7 availability.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              If your question is not covered below, you can chat directly with our AI assistant on WhatsApp right away.
            </p>
          </div>
        </div>

        {/* FAQ Accordion List (All 13 items) */}
        <section className="space-y-4" aria-label="WhatsApp AI Questions and Answers">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const faqId = `faq-full-answer-${idx}`;
            const buttonId = `faq-full-question-${idx}`;

            return (
              <div
                key={item.question}
                className="bg-white rounded-2xl sm:rounded-3xl border border-palegreen-200/90 shadow-2xs hover:border-gold-400/80 transition-all overflow-hidden"
              >
                <button
                  id={buttonId}
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                  className="w-full px-6 py-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 hover:text-namnilam-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-namnilam-700"
                >
                  <span className="leading-snug">{item.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-gold-100 text-gold-800' : 'bg-palegreen-100/60 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={faqId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 sm:px-6 sm:pb-6 pt-1 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-palegreen-100">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </section>

        {/* CTA Card */}
        <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palegreen-50 text-namnilam-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Still Have Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ask our AI directly on WhatsApp
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Experience the AI firsthand by asking your questions to our official WhatsApp assistant ({WHATSAPP_NUMBER}).
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
          <Link to="/about" className="hover:text-namnilam-900 font-semibold transition">
            Learn About Nam Nilam →
          </Link>
          <Link to="/contact" className="hover:text-namnilam-900 font-semibold transition">
            Contact Our Team →
          </Link>
        </div>

      </div>
    </div>
  );
};

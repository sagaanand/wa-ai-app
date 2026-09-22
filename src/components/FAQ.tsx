import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../constants';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default for AEO/GEO clarity

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 relative bg-palegreen-50/50 border-t border-palegreen-200/70" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
            <span>Got Questions?</span>
          </div>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Everything you need to know about Nam Nilam WhatsApp AI and automated customer communication.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const faqId = `faq-answer-${idx}`;
            const buttonId = `faq-question-${idx}`;

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
                      <div className="px-6 pb-6 sm:px-6 sm:pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-palegreen-100">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, BookOpen, SlidersHorizontal } from 'lucide-react';

const FEATURES = [
  {
    icon: Clock,
    title: '24/7 Customer Replies',
    description: 'Your AI can respond even when you are unavailable. Never lose a high-intent buyer during nights or weekends.',
    badge: 'Always Online',
  },
  {
    icon: Zap,
    title: 'Instant Responses',
    description: 'Reply to customer enquiries within seconds. Immediate replies increase customer trust and lead conversion by 300%.',
    badge: '< 2 Seconds',
  },
  {
    icon: BookOpen,
    title: 'Your Business Knowledge',
    description: 'Train the AI with your business information, projects, plots, pricing, and locations for accurate, relevant answers.',
    badge: 'Custom Trained',
  },
  {
    icon: SlidersHorizontal,
    title: 'Human Control',
    description: 'Take over any conversation whenever you want with 1-click. Seamlessly switch between AI automation and manual chat.',
    badge: 'Full Control',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-100 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-namnilam-700 bg-namnilam-50 px-3 py-1 rounded-full border border-namnilam-200">
            Engineered for High-Touch Business
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your WhatsApp. Your AI Assistant.
          </h2>
          <p className="text-slate-600 text-base">
            Everything you need to automate inquiries while keeping every customer interaction personal, accurate, and prompt.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50/70 hover:bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/80 hover:border-namnilam-300 hover:shadow-card transition-all group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-namnilam-50 group-hover:bg-namnilam-800 text-namnilam-700 group-hover:text-emerald-300 flex items-center justify-center transition-colors duration-300 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-white group-hover:bg-namnilam-100 group-hover:text-namnilam-800 px-3 py-1 rounded-full border border-slate-200 group-hover:border-namnilam-200 transition">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-namnilam-900 transition">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

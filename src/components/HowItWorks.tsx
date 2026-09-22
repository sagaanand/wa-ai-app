import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, BookOpen, MessageCircle } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Connect',
    desc: 'Scan a QR code and connect your WhatsApp.',
    icon: QrCode,
  },
  {
    step: '02',
    title: 'Teach',
    desc: 'Give AI your business information, products, services, and instructions.',
    icon: BookOpen,
  },
  {
    step: '03',
    title: 'Let AI Talk',
    desc: 'Your AI assistant starts handling customer conversations for you.',
    icon: MessageCircle,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <span>Seamless Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Start in 3 Simple Steps
          </h2>
          <p className="text-base text-slate-600">
            Get your AI assistant active on your WhatsApp in minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                className="bg-white rounded-3xl p-8 border border-palegreen-200/90 hover:border-gold-400 hover:shadow-card transition-all relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-namnilam-900 text-white flex items-center justify-center shadow-xs ring-1 ring-gold-400/40">
                      <Icon className="w-6 h-6 text-gold-300" />
                    </div>
                    <span className="text-4xl font-extrabold text-gold-500/25 font-mono group-hover:text-gold-500/50 transition-colors">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-namnilam-900 transition">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

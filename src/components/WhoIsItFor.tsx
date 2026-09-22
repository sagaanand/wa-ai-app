import React from 'react';
import { motion } from 'framer-motion';
import { Building2, UserCheck, Wrench, Store } from 'lucide-react';

const AUDIENCES = [
  {
    icon: Building2,
    title: 'Real Estate',
    description: 'Handle enquiries, project details, pricing and site visits.',
  },
  {
    icon: UserCheck,
    title: 'Consultants',
    description: 'Answer enquiries and qualify potential customers.',
  },
  {
    icon: Wrench,
    title: 'Service Businesses',
    description: 'Handle customer questions and follow-ups.',
  },
  {
    icon: Store,
    title: 'Local Businesses',
    description: 'Stay connected with customers without being online all day.',
  },
];

export const WhoIsItFor: React.FC = () => {
  return (
    <section id="who-is-it-for" className="py-20 bg-palegreen-50/70 border-y border-palegreen-200/70 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <span>Industry Fits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Businesses That Get Customers on WhatsApp
          </h2>
          <p className="text-base sm:text-lg text-slate-700">
            If WhatsApp is where your clients discover you, Nam Nilam WhatsApp AI ensures they never drop off.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-7 border border-palegreen-200/90 shadow-2xs hover:shadow-card hover:border-gold-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-palegreen-100 text-namnilam-800 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-namnilam-800" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-namnilam-900 transition">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
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

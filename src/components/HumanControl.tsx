import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, CheckCircle2 } from 'lucide-react';

export const HumanControl: React.FC = () => {
  const [isAiActive, setIsAiActive] = useState(true);

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <span>Seamless Control</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI Handles the Conversation. You Stay in Control.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Let AI handle routine conversations. Whenever you want, step in and take over the chat yourself.
          </p>
        </div>

        {/* Simple Interactive Control Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card max-w-lg mx-auto ring-1 ring-gold-300/30"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-palegreen-50/60 p-5 rounded-2xl border border-palegreen-200">
            {/* Status indicator */}
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                  isAiActive
                    ? 'bg-white text-namnilam-800 shadow-2xs border border-gold-300/80'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {isAiActive ? (
                  <Bot className="w-6 h-6 text-namnilam-800" />
                ) : (
                  <User className="w-6 h-6 text-amber-600" />
                )}
              </div>

              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    AI Mode
                  </span>
                  <span className="text-slate-300">→</span>
                  <span
                    className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                      isAiActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isAiActive ? 'ON' : 'OFF'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">
                  {isAiActive ? 'AI is handling conversations' : 'You are now replying directly'}
                </p>
              </div>
            </div>

            {/* Take Over Button */}
            <button
              onClick={() => setIsAiActive(!isAiActive)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                isAiActive
                  ? 'bg-namnilam-900 hover:bg-namnilam-950 text-white ring-1 ring-gold-400/50'
                  : 'bg-namnilam-800 hover:bg-namnilam-900 text-white'
              }`}
            >
              {isAiActive ? 'Take Over' : 'Resume AI'}
            </button>
          </div>

          <p className="text-xs text-slate-600 mt-4 flex items-center justify-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Switch back and forth anytime with zero friction.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
};

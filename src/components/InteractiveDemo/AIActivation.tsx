import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AIActivationProps {
  onViewInbox: () => void;
}

export const AIActivation: React.FC<AIActivationProps> = ({ onViewInbox }) => {
  const [status, setStatus] = useState<'loading' | 'ready'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('ready');
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#25D366', '#128C7E', '#17644A', '#F59E0B'],
        });
      } catch (e) {
        // Confetti fallback
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card text-center my-6">
      {status === 'loading' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 py-6"
        >
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-namnilam-100 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-4 border-t-namnilam-700 animate-spin" />
            <Bot className="w-8 h-8 text-namnilam-800" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-slate-900">
              Setting up your AI assistant...
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Embedding Nam Nilam real estate information and Tanglish dialogue models.
            </p>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-namnilam-700 h-full rounded-full"
              initial={{ width: '10%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 py-4"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900">
              Your AI is ready.
            </h3>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-wa-light animate-ping" />
              <span>AI Assistant Active</span>
            </div>
            <p className="text-slate-600 text-sm max-w-xs mx-auto pt-1 font-medium">
              Your AI can now respond to your WhatsApp customers.
            </p>
          </div>

          <button
            onClick={onViewInbox}
            className="w-full py-4 rounded-xl bg-namnilam-800 hover:bg-namnilam-900 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <MessageSquare className="w-5 h-5 text-emerald-300" />
            <span>View AI Inbox</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

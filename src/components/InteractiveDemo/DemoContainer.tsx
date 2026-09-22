import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRModal } from './QRModal';
import { AISetupCard } from './AISetupCard';
import { AIActivation } from './AIActivation';
import { AIInboxDemo } from './AIInboxDemo';
import { AISettings, DemoStep } from '../../types';
import { QrCode, Sliders, MessageSquare, RefreshCw } from 'lucide-react';

interface DemoContainerProps {
  isQRModalOpen: boolean;
  onCloseQRModal: () => void;
  onOpenQRModal: () => void;
}

export const DemoContainer: React.FC<DemoContainerProps> = ({
  isQRModalOpen,
  onCloseQRModal,
  onOpenQRModal,
}) => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('active_inbox'); // Start showing the inbox or setup

  const handleQRConnected = () => {
    onCloseQRModal();
    setCurrentStep('ai_setup');
  };

  const handleActivateAI = (_settings: AISettings) => {
    setCurrentStep('activating');
  };

  const handleViewInbox = () => {
    setCurrentStep('active_inbox');
  };

  const handleRestartFullFlow = () => {
    setCurrentStep('qr_scan');
    onOpenQRModal();
  };

  return (
    <section id="demo-section" className="py-12 sm:py-20 bg-gradient-to-b from-white via-namnilam-50/30 to-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-namnilam-100/70 text-namnilam-800 text-xs font-bold border border-namnilam-200">
            <span>EXPERIENCE THE SIMULATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Interactive Product Demo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            See how your business WhatsApp connects with AI in under 60 seconds.
          </p>
        </div>

        {/* Step Navigation Pill Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 overflow-x-auto py-2 no-scrollbar">
          {[
            {
              step: 'qr_scan' as DemoStep,
              label: '1. Scan QR',
              icon: QrCode,
              action: onOpenQRModal,
            },
            {
              step: 'ai_setup' as DemoStep,
              label: '2. Teach AI',
              icon: Sliders,
              action: () => setCurrentStep('ai_setup'),
            },
            {
              step: 'active_inbox' as DemoStep,
              label: '3. AI Inbox & Takeover',
              icon: MessageSquare,
              action: () => setCurrentStep('active_inbox'),
            },
          ].map(({ step, label, icon: Icon, action }) => {
            const isActive =
              currentStep === step ||
              (step === 'qr_scan' && (currentStep === 'qr_scan' || currentStep === 'connected'));
            return (
              <button
                key={step}
                onClick={action}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs border ${
                  isActive
                    ? 'bg-namnilam-800 text-white border-namnilam-800 shadow-sm scale-102'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                <span>{label}</span>
              </button>
            );
          })}

          <button
            onClick={handleRestartFullFlow}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            title="Start from beginning"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Restart Flow</span>
          </button>
        </div>

        {/* Content Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {currentStep === 'ai_setup' && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AISetupCard onActivate={handleActivateAI} />
              </motion.div>
            )}

            {currentStep === 'activating' && (
              <motion.div
                key="activating"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
              >
                <AIActivation onViewInbox={handleViewInbox} />
              </motion.div>
            )}

            {currentStep === 'active_inbox' && (
              <motion.div
                key="inbox"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AIInboxDemo onRestartDemo={() => setCurrentStep('ai_setup')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* QR Modal (triggered by CTAs or Scan QR button) */}
        <QRModal
          isOpen={isQRModalOpen}
          onClose={onCloseQRModal}
          onConnected={handleQRConnected}
        />
      </div>
    </section>
  );
};

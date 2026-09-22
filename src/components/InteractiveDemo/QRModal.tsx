import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, CheckCircle, Loader2, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, onConnected }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleSimulateConnection = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setIsConnected(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#25D366', '#128C7E', '#54B791', '#0C382A'],
        });
      } catch (e) {
        // Confetti fallback
      }
    }, 1500);
  };

  const handleContinue = () => {
    onConnected();
  };

  const handleReset = () => {
    setIsConnected(false);
    setIsSimulating(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-namnilam-50 text-namnilam-800 flex items-center justify-center font-bold text-xs">
              WA
            </div>
            <span className="font-bold text-sm text-slate-800">
              {isConnected ? 'WhatsApp Linked' : 'Connect your WhatsApp'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {!isConnected ? (
              <motion.div
                key="qr-step"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Connect your WhatsApp
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs">
                    Scan this QR code using WhatsApp on your phone.
                  </p>
                </div>

                {/* QR Display Card with Laser */}
                <div className="relative p-4 rounded-2xl bg-white border-2 border-slate-100 shadow-inner group">
                  <svg
                    className="w-52 h-52 text-slate-900"
                    viewBox="0 0 200 200"
                    fill="currentColor"
                  >
                    {/* Corners */}
                    <rect x="15" y="15" width="50" height="50" rx="6" fill="#0C382A" />
                    <rect x="25" y="25" width="30" height="30" rx="3" fill="#FFFFFF" />
                    <rect x="33" y="33" width="14" height="14" rx="2" fill="#0C382A" />

                    <rect x="135" y="15" width="50" height="50" rx="6" fill="#0C382A" />
                    <rect x="145" y="25" width="30" height="30" rx="3" fill="#FFFFFF" />
                    <rect x="153" y="33" width="14" height="14" rx="2" fill="#0C382A" />

                    <rect x="15" y="135" width="50" height="50" rx="6" fill="#0C382A" />
                    <rect x="25" y="145" width="30" height="30" rx="3" fill="#FFFFFF" />
                    <rect x="33" y="153" width="14" height="14" rx="2" fill="#0C382A" />

                    {/* Matrix */}
                    <rect x="75" y="20" width="12" height="12" rx="2" fill="#17644A" />
                    <rect x="95" y="20" width="24" height="12" rx="2" fill="#0C382A" />
                    <rect x="75" y="40" width="20" height="12" rx="2" fill="#0C382A" />
                    <rect x="105" y="40" width="14" height="25" rx="2" fill="#17644A" />

                    <rect x="20" y="75" width="14" height="20" rx="2" fill="#0C382A" />
                    <rect x="42" y="75" width="20" height="12" rx="2" fill="#17644A" />
                    <rect x="20" y="105" width="25" height="15" rx="2" fill="#0C382A" />
                    <rect x="52" y="95" width="15" height="24" rx="2" fill="#17644A" />

                    {/* Center badge */}
                    <rect x="75" y="75" width="50" height="50" rx="8" fill="#F0F9F5" />
                    <circle cx="100" cy="100" r="16" fill="#17644A" />
                    <path d="M95 100L99 104L107 96" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                    <rect x="135" y="75" width="18" height="18" rx="2" fill="#0C382A" />
                    <rect x="160" y="75" width="25" height="14" rx="2" fill="#17644A" />
                    <rect x="140" y="102" width="22" height="12" rx="2" fill="#0C382A" />
                    <rect x="170" y="98" width="15" height="20" rx="2" fill="#17644A" />

                    <rect x="75" y="135" width="22" height="15" rx="2" fill="#0C382A" />
                    <rect x="105" y="135" width="18" height="25" rx="2" fill="#17644A" />
                    <rect x="75" y="158" width="24" height="22" rx="2" fill="#17644A" />

                    <rect x="135" y="135" width="20" height="20" rx="2" fill="#0C382A" />
                    <rect x="162" y="135" width="23" height="14" rx="2" fill="#0C382A" />
                    <rect x="135" y="162" width="15" height="23" rx="2" fill="#17644A" />
                    <rect x="156" y="156" width="29" height="29" rx="2" fill="#0C382A" />
                  </svg>

                  {/* Animated laser */}
                  {!isSimulating && (
                    <div className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-wa-light to-transparent rounded-full shadow-[0_0_12px_#25D366] animate-laser" />
                  )}

                  {/* Connecting overlay when clicked */}
                  {isSimulating && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center rounded-2xl">
                      <Loader2 className="w-10 h-10 text-namnilam-700 animate-spin mb-2" />
                      <span className="text-xs font-bold text-namnilam-800">
                        Pairing WhatsApp session...
                      </span>
                    </div>
                  )}
                </div>

                {/* Steps instructions */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 w-full text-left space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Instructions
                  </div>
                  <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-namnilam-700 shrink-0" />
                    <span>WhatsApp → Settings → Linked Devices → Link a Device</span>
                  </div>
                </div>

                {/* Waiting indicator */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Waiting for connection...</span>
                </div>

                {/* Simulate Button */}
                <button
                  onClick={handleSimulateConnection}
                  disabled={isSimulating}
                  className="w-full py-3.5 rounded-xl bg-namnilam-800 hover:bg-namnilam-900 disabled:opacity-75 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98"
                >
                  {isSimulating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <span>Simulate Connection</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="connected-step"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center space-y-5 py-2"
              >
                {/* Big Check Icon */}
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
                  <CheckCircle className="w-9 h-9" />
                </div>

                {/* WhatsApp Connected Title */}
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    WhatsApp Connected
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your phone session is securely paired and ready for AI setup.
                  </p>
                </div>

                {/* Status card */}
                <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                    <span className="text-xs text-slate-500">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-wa-light animate-pulse" />
                      Connected
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                    <span className="text-xs text-slate-500">Connected Number</span>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      +91 98765 43210
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Device</span>
                    <span className="text-xs font-semibold text-slate-700">
                      Android · WhatsApp
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="w-full space-y-2 pt-2">
                  <button
                    onClick={handleContinue}
                    className="w-full py-3.5 rounded-xl bg-namnilam-800 hover:bg-namnilam-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>Continue to AI Setup</span>
                    <ArrowRight className="w-4 h-4 text-emerald-300" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="text-xs font-medium text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 mx-auto py-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset connection simulation</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50/80 px-6 py-3 border-t border-slate-100 flex items-center justify-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Frontend demo — no personal data or actual WhatsApp session linked.</span>
        </div>
      </motion.div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WHATSAPP_NUMBER, WHATSAPP_CHAT_URL } from '../constants';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleSimulate = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#25D366', '#128C7E', '#17644A', '#54B791'],
        });
      } catch (e) {
        // Fallback
      }
    }, 1500);
  };

  const handleReset = () => {
    setIsConnected(false);
    setIsConnecting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-namnilam-50 text-namnilam-800 flex items-center justify-center font-bold text-xs">
              WA
            </div>
            <span className="font-bold text-sm text-slate-900">
              {isConnected ? 'WhatsApp Connected' : 'Connect Your WhatsApp'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {!isConnected ? (
              <motion.div
                key="qr"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Connect Your Existing WhatsApp
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs">
                    Scan this QR code using WhatsApp on your phone to link your AI assistant.
                  </p>
                </div>

                {/* QR Display Card */}
                <div className="relative p-4 rounded-2xl bg-white border-2 border-slate-100 shadow-inner group">
                  <svg
                    className="w-48 h-48 text-slate-900"
                    viewBox="0 0 200 200"
                    fill="currentColor"
                  >
                    {/* Corner 1 */}
                    <rect x="15" y="15" width="50" height="50" rx="6" fill="#0C382A" />
                    <rect x="25" y="25" width="30" height="30" rx="3" fill="#FFFFFF" />
                    <rect x="33" y="33" width="14" height="14" rx="2" fill="#0C382A" />

                    {/* Corner 2 */}
                    <rect x="135" y="15" width="50" height="50" rx="6" fill="#0C382A" />
                    <rect x="145" y="25" width="30" height="30" rx="3" fill="#FFFFFF" />
                    <rect x="153" y="33" width="14" height="14" rx="2" fill="#0C382A" />

                    {/* Corner 3 */}
                    <rect x="15" y="135" width="50" height="50" rx="6" fill="#0C382A" />
                    <rect x="25" y="145" width="30" height="30" rx="3" fill="#FFFFFF" />
                    <rect x="33" y="153" width="14" height="14" rx="2" fill="#0C382A" />

                    {/* Blocks */}
                    <rect x="75" y="20" width="12" height="12" rx="2" fill="#17644A" />
                    <rect x="95" y="20" width="24" height="12" rx="2" fill="#0C382A" />
                    <rect x="75" y="40" width="20" height="12" rx="2" fill="#0C382A" />
                    <rect x="105" y="40" width="14" height="25" rx="2" fill="#17644A" />

                    <rect x="20" y="75" width="14" height="20" rx="2" fill="#0C382A" />
                    <rect x="42" y="75" width="20" height="12" rx="2" fill="#17644A" />
                    <rect x="20" y="105" width="25" height="15" rx="2" fill="#0C382A" />
                    <rect x="52" y="95" width="15" height="24" rx="2" fill="#17644A" />

                    {/* Center Icon */}
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

                  {!isConnecting && (
                    <div className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-wa-light to-transparent rounded-full shadow-[0_0_12px_#25D366] animate-laser" />
                  )}

                  {isConnecting && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center rounded-2xl">
                      <Loader2 className="w-9 h-9 text-namnilam-700 animate-spin mb-2" />
                      <span className="text-xs font-bold text-slate-800">
                        Connecting to WhatsApp...
                      </span>
                    </div>
                  )}
                </div>

                {/* Instructions */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 w-full text-left space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    How to Link
                  </div>
                  <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-namnilam-700 shrink-0" />
                    <span>Scan with WhatsApp → Linked Devices → Link a Device</span>
                  </div>
                </div>

                {/* Action */}
                <div className="w-full space-y-2.5">
                  <a
                    href={WHATSAPP_CHAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-namnilam-800 hover:bg-namnilam-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>Chat with Nam Nilam AI →</span>
                  </a>

                  <button
                    onClick={handleSimulate}
                    disabled={isConnecting}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Connecting session...</span>
                      </>
                    ) : (
                      <>
                        <span>Simulate QR Pairing</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="connected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center space-y-4 py-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    WhatsApp Connected
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your AI assistant is now linked to your WhatsApp number.
                  </p>
                </div>

                <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-xs text-slate-500">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-wa-light animate-pulse" />
                      Connected
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-xs text-slate-500">Number</span>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {WHATSAPP_NUMBER}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Device</span>
                    <span className="text-xs font-semibold text-slate-700">
                      Android · WhatsApp
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-2 pt-2">
                  <a
                    href={WHATSAPP_CHAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-namnilam-800 hover:bg-namnilam-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>Chat with Nam Nilam AI →</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                  >
                    Close
                  </button>

                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-slate-600 block mx-auto pt-1"
                  >
                    Try scanning again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Marketing demonstration — no real WhatsApp credentials required.</span>
        </div>
      </motion.div>
    </div>
  );
};

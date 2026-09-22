import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Phone, 
  Video, 
  CheckCheck, 
  User, 
  RotateCcw
} from 'lucide-react';
import { HumanTakeoverBar } from './HumanTakeoverBar';
import { INITIAL_MOCK_CONVERSATION, QUICK_PROMPTS } from '../../data/mockChat';
import { ChatMessage } from '../../types';

interface AIInboxDemoProps {
  onRestartDemo?: () => void;
}

export const AIInboxDemo: React.FC<AIInboxDemoProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MOCK_CONVERSATION);
  const [isAiMode, setIsAiMode] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('');
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  // Handle quick prompt click
  const handleQuickPrompt = (prompt: typeof QUICK_PROMPTS[0]) => {
    if (isAiTyping) return;

    const newCustMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'customer',
      text: prompt.userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newCustMsg]);

    if (isAiMode) {
      setIsAiTyping(true);
      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: prompt.aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAiReplied: true,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsAiTyping(false);
      }, 1200);
    }
  };

  // Handle manual input
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isAiTyping) return;

    if (!isAiMode) {
      // Owner manual reply
      const ownerMsg: ChatMessage = {
        id: `owner-${Date.now()}`,
        sender: 'human',
        text: inputText.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, ownerMsg]);
      setInputText('');
    } else {
      // Customer sent custom message
      const customerMsg: ChatMessage = {
        id: `cust-${Date.now()}`,
        sender: 'customer',
        text: inputText.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, customerMsg]);
      const currentInput = inputText.trim();
      setInputText('');

      // Trigger simulated AI reply
      setIsAiTyping(true);
      setTimeout(() => {
        const aiReplyMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Nandri for your message! "${currentInput}" pathi details check pannitten. Namma Nam Nilam site manager ungalukku live photos and video call arrange pannuvaaru.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAiReplied: true,
        };
        setMessages((prev) => [...prev, aiReplyMsg]);
        setIsAiTyping(false);
      }, 1300);
    }
  };

  const handleResetConversation = () => {
    setMessages(INITIAL_MOCK_CONVERSATION);
    setIsAiMode(true);
    setIsAiTyping(false);
  };

  return (
    <div className="max-w-4xl mx-auto my-6">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
        {/* Section Title Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-namnilam-700 flex items-center justify-center text-white">
              <Bot className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>AI Inbox</span>
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Live Preview
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Priya Kumar with Nam Nilam Real Estate Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetConversation}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition"
              title="Reset sample chat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Chat</span>
            </button>
          </div>
        </div>

        {/* Human Takeover Control Bar */}
        <HumanTakeoverBar
          isAiMode={isAiMode}
          onToggleAiMode={() => setIsAiMode(!isAiMode)}
        />

        {/* WhatsApp Chat Simulation Container */}
        <div className="flex flex-col h-[520px] bg-[#EFEAE2] relative">
          {/* Subtle WhatsApp doodle pattern overlay */}
          <div className="absolute inset-0 wa-pattern opacity-40 pointer-events-none" />

          {/* WhatsApp Header */}
          <div className="relative z-10 bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-namnilam-900 text-sm ring-2 ring-white/50">
                  PK
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
              </div>

              <div>
                <h4 className="text-sm font-bold leading-tight">Priya Kumar</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-100/90">
                  <span>+91 98765 43210</span>
                  <span>•</span>
                  <span>Abirami Nagar Enquiry</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-emerald-100">
              <span className="text-[11px] font-semibold bg-emerald-800/80 px-2.5 py-1 rounded-full border border-emerald-600/50 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isAiMode ? 'bg-wa-light animate-pulse' : 'bg-amber-400'}`} />
                {isAiMode ? 'AI Active' : 'Human Control'}
              </span>
              <Phone className="w-4 h-4 opacity-75 cursor-not-allowed hidden sm:block" />
              <Video className="w-4 h-4 opacity-75 cursor-not-allowed hidden sm:block" />
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Date divider */}
            <div className="flex justify-center">
              <span className="text-[11px] font-semibold bg-white/90 text-slate-600 px-3 py-1 rounded-lg shadow-2xs border border-slate-200/40">
                Today
              </span>
            </div>

            {/* Conversation Messages */}
            {messages.map((msg) => {
              const isCust = msg.sender === 'customer';
              const isAi = msg.sender === 'ai';
              const isOwner = msg.sender === 'human';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isCust ? 'items-start' : 'items-end'}`}
                >
                  {/* AI Replied Pill Tag */}
                  {isAi && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-[10px] font-bold text-namnilam-700 bg-white/95 px-2.5 py-0.5 rounded-full mb-1 border border-namnilam-200 shadow-2xs"
                    >
                      <Sparkles className="w-3 h-3 text-wa-light fill-wa-light" />
                      <span>AI replied</span>
                    </motion.div>
                  )}

                  {/* Owner Replied Pill Tag */}
                  {isOwner && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full mb-1 border border-amber-200 shadow-2xs"
                    >
                      <User className="w-3 h-3 text-amber-600" />
                      <span>You (Owner) replied</span>
                    </motion.div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 shadow-xs relative text-sm ${
                      isCust
                        ? 'bg-white text-slate-800 rounded-tl-xs'
                        : isOwner
                        ? 'bg-[#FEF3C7] text-amber-950 rounded-tr-xs border border-amber-200/70'
                        : 'bg-[#D9FDD3] text-slate-900 rounded-tr-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {!isCust && (
                        <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {isAiTyping && (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-[10px] font-bold text-namnilam-700 bg-white/95 px-2.5 py-0.5 rounded-full mb-1 border border-namnilam-200 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-wa-light animate-spin" />
                  <span>AI generating reply...</span>
                </div>
                <div className="bg-[#D9FDD3] rounded-2xl rounded-tr-xs px-4 py-3 shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-namnilam-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-namnilam-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-namnilam-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick interactive test chips */}
          <div className="relative z-10 bg-white/90 backdrop-blur-xs px-4 py-2 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">
              Test Prompt:
            </span>
            {QUICK_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(p)}
                disabled={isAiTyping}
                className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-namnilam-50 text-slate-700 hover:text-namnilam-800 border border-slate-200 hover:border-namnilam-300 transition active:scale-95 disabled:opacity-50"
              >
                + "{p.label}"
              </button>
            ))}
          </div>

          {/* Message Input Footer */}
          <div className="relative z-10 bg-[#F0F2F5] px-4 py-3 border-t border-slate-200">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isAiMode
                    ? "Type as customer to test AI auto-reply, or switch mode above..."
                    : "Type a manual reply as business owner..."
                }
                className="flex-1 bg-white border border-slate-300 rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-namnilam-600 shadow-2xs"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isAiTyping}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition shadow-xs active:scale-95 ${
                  isAiMode
                    ? 'bg-namnilam-800 hover:bg-namnilam-900 disabled:opacity-50'
                    : 'bg-amber-600 hover:bg-amber-700 disabled:opacity-50'
                }`}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>

            <div className="mt-1.5 text-center">
              <span className="text-[11px] text-slate-400">
                {isAiMode
                  ? "⚡ AI Mode Active: incoming customer messages get instant Tanglish replies."
                  : "👤 Human Takeover Active: you have full direct control over the replies."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

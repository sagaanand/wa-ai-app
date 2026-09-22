import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bot,
  Send,
  Sparkles,
  CheckCheck,
  Smile,
  Paperclip,
  Mic,
  MoreVertical,
  Sliders,
  X,
  Smartphone,
  Save,
  LogOut,
  AlertCircle,
  Clock,
  MessageSquarePlus,
  ArrowRight,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/SEOHead';

export const InboxPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    conversations,
    activeConversationId,
    activeConversation,
    activeMessages,
    setActiveConversationId,
    sendMessage,
    whatsAppAccount,
    aiSettings,
    updateAiSettings,
    knowledgeBase,
    saveKnowledgeBase,
    disconnectWhatsApp,
    addToast,
  } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread'>('all');
  const [inputText, setInputText] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Settings form states inside popup
  const [promptInput, setPromptInput] = useState(knowledgeBase.instructions);
  const [bizNameInput, setBizNameInput] = useState(knowledgeBase.businessName);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactPhone.includes(searchQuery) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterType === 'unread' ? c.unreadCount > 0 : true;

    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  const handleToggleMasterAi = () => {
    const nextState = !aiSettings.aiEnabled;
    updateAiSettings({ aiEnabled: nextState });
    addToast(
      nextState ? 'success' : 'warning',
      nextState
        ? 'AI Assistant is now ON: Automatically replying to customer messages.'
        : 'AI Assistant is now OFF: Messages will appear, but AI will not reply.'
    );
  };

  const handleSaveSettingsPopup = () => {
    saveKnowledgeBase({
      businessName: bizNameInput.trim(),
      instructions: promptInput.trim(),
    });
    addToast('success', 'AI Assistant knowledge updated successfully!');
    setShowSettingsModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/app/login');
  };

  const isAiActive = aiSettings.aiEnabled;

  return (
    <>
      <SEOHead
        title="WhatsApp Web | Nam Nilam AI"
        description="Authentic Web WhatsApp interface with integrated AI Assistant auto-reply layer."
        canonicalUrl="https://wa.namnilam.com/app/inbox"
      />

      <div className="h-screen w-screen overflow-hidden flex bg-[#EFEAE2] font-sans antialiased text-slate-800">
        
        {/* ============================================================ */}
        {/* LEFT PANEL: WHATSAPP CHAT LIST (WhatsApp Web Style)          */}
        {/* ============================================================ */}
        <div className="w-full sm:w-96 lg:w-[420px] bg-white border-r border-[#E9EDEF] flex flex-col shrink-0 h-full overflow-hidden">
          
          {/* 1. Header (User DP, Status, New Chat, Menu) */}
          <div className="h-16 px-4 bg-[#F0F2F5] flex items-center justify-between border-b border-[#E9EDEF] shrink-0">
            {/* User Profile Avatar */}
            <div className="flex items-center gap-3">
              <div
                title={`${user?.fullName || 'User'} (${user?.businessName || 'Business'})`}
                className="w-10 h-10 rounded-full bg-namnilam-900 text-gold-300 font-extrabold text-sm flex items-center justify-center shadow-2xs ring-1 ring-gold-400/40"
              >
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <span className="font-extrabold text-xs text-slate-900 block truncate max-w-[140px]">
                  {user?.businessName || 'Nam Nilam'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono block">
                  {whatsAppAccount.phoneNumber}
                </span>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1.5 text-slate-600">
              {/* Quick AI status pill in left header */}
              <button
                type="button"
                onClick={() => setShowSettingsModal(true)}
                title="AI Assistant Settings"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow-2xs transition active:scale-95 ${
                  isAiActive
                    ? 'bg-[#E7FCE8] text-[#008069] border-[#008069]/40 hover:bg-[#d4f9d6]'
                    : 'bg-[#F0F2F5] text-slate-600 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isAiActive ? 'bg-[#25D366] animate-pulse' : 'bg-slate-400'
                  }`}
                />
                <span>{isAiActive ? 'AI ON' : 'AI OFF'}</span>
              </button>

              {/* Dedicated AI Knowledge Base Training Button */}
              <button
                type="button"
                onClick={() => navigate('/app/ai')}
                title="Open AI Knowledge Base & Training"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-namnilam-900 text-gold-300 hover:bg-namnilam-950 transition active:scale-95 shadow-2xs"
              >
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>Train AI</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/app/connect')}
                title="Link WhatsApp Device"
                className="p-1.5 rounded-full hover:bg-black/5 text-slate-600"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowSettingsModal(true)}
                title="AI Settings & Menu"
                className="p-1.5 rounded-full hover:bg-black/5 text-slate-600"
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Search Box & Filter Chips */}
          <div className="p-2 bg-white border-b border-[#F0F2F5] space-y-2 shrink-0">
            <div className="relative flex items-center bg-[#F0F2F5] rounded-lg px-3 py-1.5">
              <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search or start new chat"
                className="w-full text-xs bg-transparent border-none outline-none placeholder-slate-500"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2 pt-0.5">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  filterType === 'all'
                    ? 'bg-[#E7FCE8] text-[#008069] font-bold'
                    : 'bg-[#F0F2F5] text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('unread')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  filterType === 'unread'
                    ? 'bg-[#E7FCE8] text-[#008069] font-bold'
                    : 'bg-[#F0F2F5] text-slate-600 hover:bg-slate-200'
                }`}
              >
                Unread
              </button>
            </div>
          </div>

          {/* 3. Real WhatsApp Chats List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#F0F2F5] select-none">
            {filteredConversations.length === 0 ? (
              whatsAppAccount.status !== 'connected' ? (
                <div className="p-6 text-center text-xs space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">WhatsApp Not Linked</p>
                    <p className="text-slate-500 max-w-xs mx-auto text-[11px] mt-1">
                      Scan the QR code from WhatsApp on your phone to link your account.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/app/connect')}
                    className="px-4 py-2 bg-[#008069] hover:bg-[#00604f] text-white font-bold rounded-xl text-xs shadow-xs transition"
                  >
                    Scan WhatsApp QR Code
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center text-xs space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <MessageSquarePlus className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-slate-700">No chats yet</p>
                  <p className="text-slate-400 max-w-xs mx-auto text-[11px]">
                    When customers message your WhatsApp, their chats will appear here automatically.
                  </p>
                </div>
              )
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === activeConversationId;

                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`px-3 py-3 cursor-pointer transition-colors flex items-center gap-3 ${
                      isSelected ? 'bg-[#F0F2F5]' : 'hover:bg-[#F5F6F6] bg-white'
                    }`}
                  >
                    {/* Contact Avatar */}
                    <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 font-bold text-base flex items-center justify-center shrink-0">
                      {conv.contactName.charAt(0)}
                    </div>

                    {/* Chat Text Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-sm text-slate-900 truncate">
                          {conv.contactName}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-slate-500 truncate pr-2">
                          <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB] shrink-0" />
                          <span className="truncate">{conv.lastMessage}</span>
                        </div>
                        {conv.unreadCount > 0 && (
                          <span className="w-4 h-4 rounded-full bg-[#25D366] text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT PANEL: ACTIVE CHAT CONVERSATION (WhatsApp Web View)   */}
        {/* ============================================================ */}
        <div className="hidden sm:flex flex-1 flex-col h-full bg-[#EFEAE2] relative overflow-hidden">
          
          {activeConversation ? (
            <>
              {/* 1. Chat Top Header */}
              <div className="h-16 px-4 bg-[#F0F2F5] border-b border-[#E9EDEF] flex items-center justify-between shrink-0 z-10">
                {/* Contact Avatar & Name */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center shadow-2xs">
                    {activeConversation.contactName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-sm text-slate-900 leading-tight">
                      {activeConversation.contactName}
                    </h2>
                    <span className="text-[11px] text-slate-500 block">
                      online · {activeConversation.contactPhone}
                    </span>
                  </div>
                </div>

                {/* Right Corner: AI Settings Pill + Standard Icons */}
                <div className="flex items-center gap-3">
                  
                  {/* Top Corner AI Assistant Status Pill (Click opens Popup!) */}
                  <button
                    type="button"
                    onClick={() => setShowSettingsModal(true)}
                    title="Click to open AI Assistant Settings"
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold border shadow-2xs transition active:scale-95 cursor-pointer ${
                      isAiActive
                        ? 'bg-[#E7FCE8] text-[#008069] border-[#008069]/40 hover:bg-[#d4f9d6]'
                        : 'bg-[#F0F2F5] text-slate-600 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isAiActive ? 'bg-[#25D366] animate-pulse' : 'bg-slate-400'
                      }`}
                    />
                    <span>{isAiActive ? 'AI Assistant ON' : 'AI Assistant OFF'}</span>
                    <Sliders className="w-3 h-3 text-slate-500 ml-0.5" />
                  </button>

                  {/* WhatsApp standard header icons */}
                  <button
                    type="button"
                    title="Search within chat"
                    className="p-2 rounded-full hover:bg-black/5 text-slate-600"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettingsModal(true)}
                    title="Menu"
                    className="p-2 rounded-full hover:bg-black/5 text-slate-600"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 2. Message Conversation Viewport (WhatsApp Doodle Wallpaper) */}
              <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-3 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px]">
                
                {/* Yellow End-to-End Encryption Security Banner */}
                <div className="text-center my-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF9E6] border border-[#FFE7A3] rounded-lg text-[11px] text-[#54656F] shadow-2xs font-normal max-w-md mx-auto">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    Messages are end-to-end encrypted. AI Assistant automatically replies when enabled.
                  </span>
                </div>

                {/* Date Separator Pill */}
                <div className="text-center my-2">
                  <span className="px-3 py-1 bg-white/90 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider shadow-2xs">
                    Today
                  </span>
                </div>

                {/* Chat Bubbles */}
                {activeMessages.map((msg) => {
                  const isCustomer = msg.sender === 'customer';
                  const isAi = msg.sender === 'ai';

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg px-3 py-2 shadow-2xs relative text-xs sm:text-[13px] leading-relaxed select-text ${
                          isCustomer
                            ? 'bg-white text-slate-900 rounded-tl-xs'
                            : isAi
                            ? 'bg-[#D9FDD3] text-slate-900 rounded-tr-xs'
                            : 'bg-[#D9FDD3] text-slate-900 rounded-tr-xs'
                        }`}
                      >
                        {/* Label if replied by AI */}
                        {isAi && (
                          <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#008069] uppercase tracking-wider mb-0.5">
                            <Sparkles className="w-3 h-3 text-gold-600" />
                            <span>AI Assistant</span>
                          </div>
                        )}

                        <div className="whitespace-pre-wrap">{msg.text}</div>

                        <div className="text-[9px] text-slate-400 mt-0.5 flex items-center justify-end gap-1 font-medium select-none">
                          <span>{msg.timestamp}</span>
                          {!isCustomer && <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Notice if AI is OFF */}
                {!isAiActive && (
                  <div className="my-2 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200/90 rounded-full text-[10px] font-semibold text-slate-600">
                      <AlertCircle className="w-3 h-3" />
                      AI Assistant is OFF — Message received, no automated reply sent.
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* 3. Chat Footer (Emoji, Paperclip, Input Bar, Send/Mic) */}
              <form
                onSubmit={handleSendMessage}
                className="h-16 px-4 bg-[#F0F2F5] border-t border-[#E9EDEF] flex items-center gap-2 shrink-0 z-10"
              >
                <button
                  type="button"
                  title="Emoji"
                  className="p-2 text-slate-600 hover:text-slate-800"
                >
                  <Smile className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  title="Attach"
                  className="p-2 text-slate-600 hover:text-slate-800"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 h-10 px-4 text-xs sm:text-sm bg-white rounded-lg border-none outline-none shadow-2xs placeholder-slate-500"
                />

                {inputText.trim() ? (
                  <button
                    type="submit"
                    className="p-2 text-[#008069] hover:text-[#00604f] transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    title="Voice Note"
                    className="p-2 text-slate-600 hover:text-slate-800"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <img
                src="/nam-nilam-logo.png"
                alt="Nam Nilam"
                className="w-16 h-16 rounded-full mb-3 opacity-90"
              />
              <h3 className="font-bold text-slate-700 text-lg">Nam Nilam for WhatsApp</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                {whatsAppAccount.status === 'connected'
                  ? 'Select a conversation from the left to view messages and manage AI automated replies.'
                  : 'Link your WhatsApp using the QR code to sync your chats and turn on automated AI replies.'}
              </p>
              {whatsAppAccount.status !== 'connected' && (
                <button
                  type="button"
                  onClick={() => navigate('/app/connect')}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#008069] hover:bg-[#00604f] text-white font-bold rounded-xl text-xs shadow-md transition active:scale-95"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Scan QR Code to Connect</span>
                </button>
              )}
            </div>
          )}

        </div>

      </div>

      {/* ============================================================ */}
      {/* POPUP: AI ASSISTANT SETTINGS MODAL (Opens from Top Corner!)   */}
      {/* ============================================================ */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                    AI Assistant Settings
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Configure automated customer responses
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-left">
              
              {/* 1. Master AI Switch (ON / OFF) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      AI Auto-Reply
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        aiSettings.aiEnabled
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {aiSettings.aiEnabled ? 'ACTIVE (ON)' : 'PAUSED (OFF)'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs leading-snug">
                    {aiSettings.aiEnabled
                      ? 'AI will automatically answer incoming WhatsApp messages on your behalf.'
                      : 'AI is OFF. Messages will appear in your inbox, but AI will not send any reply.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleMasterAi}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-xs ${
                    aiSettings.aiEnabled
                      ? 'bg-[#008069] text-white ring-2 ring-emerald-400/40'
                      : 'bg-slate-300 text-slate-800 hover:bg-slate-400'
                  }`}
                >
                  {aiSettings.aiEnabled ? 'Switch OFF' : 'Switch ON'}
                </button>
              </div>

              {/* Full AI Training & Knowledge Base Page Shortcut */}
              <div className="p-4 bg-gradient-to-r from-[#E7FCE8] to-emerald-50 rounded-2xl border border-emerald-300/80 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#008069]" />
                    AI Training & Knowledge Base
                  </span>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    Train property listings, pricing, FAQs & test AI responses in simulator.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowSettingsModal(false);
                    navigate('/app/ai');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008069] hover:bg-[#00604f] text-white text-xs font-extrabold rounded-xl shadow-xs transition active:scale-95 shrink-0 ml-2"
                >
                  <span>Open Page</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-300" />
                </button>
              </div>

              {/* 2. Business Name & Knowledge Prompt */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={bizNameInput}
                    onChange={(e) => setBizNameInput(e.target.value)}
                    placeholder="e.g. Nam Nilam Properties"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    AI Knowledge & Instructions
                  </label>
                  <textarea
                    rows={4}
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="e.g. Answer questions about Abirami Nagar plots starting ₹18.5L. Mention weekend site inspection..."
                    className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-emerald-600 outline-none leading-relaxed font-mono"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">
                    The AI uses this information to formulate authentic replies to your customers.
                  </span>
                </div>
              </div>

              {/* 3. Connected WhatsApp Status & Reconnect */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-700" />
                  <div>
                    <span className="font-bold text-slate-900 block font-mono">
                      {whatsAppAccount.phoneNumber}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      Linked Device Connected
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSettingsModal(false);
                      navigate('/app/connect');
                    }}
                    className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition"
                  >
                    Scan QR
                  </button>
                  <button
                    type="button"
                    onClick={disconnectWhatsApp}
                    className="px-2.5 py-1 text-[11px] font-bold text-rose-700 bg-rose-50 rounded-lg hover:bg-rose-100 transition"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* 4. Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-800"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSettingsModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveSettingsPopup}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#008069] hover:bg-[#00604f] rounded-xl shadow-xs transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </>
  );
};

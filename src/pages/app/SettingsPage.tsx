import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  Smartphone,
  Bot,
  Save,
  LogOut,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { SEOHead } from '../../components/SEOHead';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, workspace, logout } = useAuth();
  const {
    whatsAppAccount,
    reconnectWhatsApp,
    disconnectWhatsApp,
    aiSettings,
    updateAiSettings,
    addToast,
  } = useWorkspace();

  const [businessName, setBusinessName] = useState(workspace?.name || 'Nam Nilam');
  const [location, setLocation] = useState(workspace?.location || 'Tamil Nadu, India');

  // AI settings
  const [autoReply, setAutoReply] = useState(aiSettings.autoReply);
  const [followUp, setFollowUp] = useState(aiSettings.followUp);
  const [humanHandover, setHumanHandover] = useState(aiSettings.humanHandover);
  const [businessHoursEnabled, setBusinessHoursEnabled] = useState(
    aiSettings.businessHours.enabled
  );
  const [startTime, setStartTime] = useState(aiSettings.businessHours.start);
  const [endTime, setEndTime] = useState(aiSettings.businessHours.end);

  const handleSaveSettings = () => {
    updateAiSettings({
      autoReply,
      followUp,
      humanHandover,
      businessHours: {
        ...aiSettings.businessHours,
        enabled: businessHoursEnabled,
        start: startTime,
        end: endTime,
      },
    });
    addToast('success', 'Workspace settings saved successfully.');
  };

  const handleLogout = () => {
    logout();
    navigate('/app/login');
  };

  return (
    <>
      <SEOHead
        title="Settings | Nam Nilam AI Workspace"
        description="Manage workspace preferences, WhatsApp connection, AI response rules, and team settings."
        canonicalUrl="https://wa.namnilam.com/app/settings"
      />

      <div className="h-full flex flex-col bg-[#F1F6F3] p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Workspace Settings
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Configure your business information, connected WhatsApp device, and AI preferences.
              </p>
            </div>

            <button
              onClick={handleSaveSettings}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-namnilam-900 hover:bg-namnilam-950 text-white rounded-xl text-xs font-bold shadow-xs ring-1 ring-gold-400/40 transition active:scale-95 shrink-0"
            >
              <Save className="w-4 h-4 text-gold-300" />
              <span>Save Changes</span>
            </button>
          </div>

          {/* Section 1: Business Profile */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-palegreen-200 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Building className="w-5 h-5 text-namnilam-800" />
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Business & Account Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Account Owner
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.fullName || 'User'}
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Registered Email
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || 'user@example.com'}
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location / City
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: WhatsApp Device Connection */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-palegreen-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-namnilam-800" />
                <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Connected WhatsApp Device
                </h2>
              </div>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                  whatsAppAccount.status === 'connected'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    whatsAppAccount.status === 'connected'
                      ? 'bg-wa-light animate-pulse'
                      : 'bg-rose-500'
                  }`}
                />
                {whatsAppAccount.status === 'connected' ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900 font-mono">
                  {whatsAppAccount.phoneNumber}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Device: {whatsAppAccount.device} · Linked{' '}
                  {whatsAppAccount.connectedAt
                    ? new Date(whatsAppAccount.connectedAt).toLocaleDateString()
                    : 'Today'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={reconnectWhatsApp}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 shadow-2xs transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Scan QR / Reconnect</span>
                </button>
                <button
                  type="button"
                  onClick={disconnectWhatsApp}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 transition"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: AI Automation Controls */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-palegreen-200 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Bot className="w-5 h-5 text-namnilam-800" />
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                AI Behavior & Working Hours
              </h2>
            </div>

            <div className="space-y-4">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">AI Auto-Reply</span>
                  <span className="text-[11px] text-slate-500">
                    Automatically reply to incoming customer messages on WhatsApp 24/7.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={autoReply}
                  onChange={(e) => setAutoReply(e.target.checked)}
                  className="h-5 w-5 text-namnilam-800 rounded cursor-pointer"
                />
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Automatic 24-Hour Follow-Up
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Send gentle reminder messages if customer stops responding mid-conversation.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={followUp}
                  onChange={(e) => setFollowUp(e.target.checked)}
                  className="h-5 w-5 text-namnilam-800 rounded cursor-pointer"
                />
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Auto-Handover to Human Agent
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Switch to Human Takeover when a customer explicitly requests a human or expresses distress.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={humanHandover}
                  onChange={(e) => setHumanHandover(e.target.checked)}
                  className="h-5 w-5 text-namnilam-800 rounded cursor-pointer"
                />
              </div>

              {/* Business Hours */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-namnilam-800" />
                    Office Business Hours
                  </span>
                  <input
                    type="checkbox"
                    checked={businessHoursEnabled}
                    onChange={(e) => setBusinessHoursEnabled(e.target.checked)}
                    className="h-4 w-4 text-namnilam-800 rounded cursor-pointer"
                  />
                </div>

                {businessHoursEnabled && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        Opens At
                      </label>
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        Closes At
                      </label>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Session & Logout */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-rose-100 space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Account Session
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Sign Out</span>
                <span className="text-[11px] text-slate-500">
                  Log out of this browser. Your AI automation will continue running in the background.
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Building2, UserCheck, CheckSquare, ArrowRight } from 'lucide-react';
import { AISettings, AIPersonality } from '../../types';

interface AISetupCardProps {
  onActivate: (settings: AISettings) => void;
  onBackToQR?: () => void;
}

export const AISetupCard: React.FC<AISetupCardProps> = ({ onActivate }) => {
  const [settings, setSettings] = useState<AISettings>({
    businessName: 'Nam Nilam',
    businessType: 'Real Estate',
    location: 'Tamil Nadu',
    personality: 'Professional',
    capabilities: {
      answerEnquiries: true,
      shareProjectInfo: true,
      answerPricing: true,
      collectRequirements: true,
      followUpLeads: true,
      bookSiteVisits: true,
    },
  });

  const toggleCapability = (key: keyof AISettings['capabilities']) => {
    setSettings((prev) => ({
      ...prev,
      capabilities: {
        ...prev.capabilities,
        [key]: !prev.capabilities[key],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onActivate(settings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card"
    >
      {/* Top Header */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-wa-light animate-pulse" />
          WhatsApp Connected (+91 98765 43210)
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Your WhatsApp is connected.
        </h2>
        <p className="text-slate-500 text-sm sm:text-base">
          Now teach your AI how to talk to your customers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Business Information */}
        <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base border-b border-slate-200/70 pb-3">
            <Building2 className="w-5 h-5 text-namnilam-700" />
            <span>Business Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Business Name
              </label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-namnilam-600 shadow-2xs"
                placeholder="Business Name"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Business Type
              </label>
              <input
                type="text"
                value={settings.businessType}
                onChange={(e) => setSettings({ ...settings, businessType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-namnilam-600 shadow-2xs"
                placeholder="Real Estate"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Location
              </label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-namnilam-600 shadow-2xs"
                placeholder="Tamil Nadu"
              />
            </div>
          </div>
        </div>

        {/* Card 2: AI Personality */}
        <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base border-b border-slate-200/70 pb-3">
            <UserCheck className="w-5 h-5 text-namnilam-700" />
            <span>AI Personality</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Tone & Communication Style
            </label>
            <select
              value={settings.personality}
              onChange={(e) => setSettings({ ...settings, personality: e.target.value as AIPersonality })}
              className="w-full sm:w-72 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-namnilam-600 shadow-2xs"
            >
              <option value="Professional">Professional (Default — Polite, accurate, courteous)</option>
              <option value="Friendly">Friendly (Warm, conversational Tanglish)</option>
              <option value="Sales Assistant">Sales Assistant (Proactive lead qualifier & site visit booker)</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>

        {/* Card 3: What should your AI do? */}
        <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base border-b border-slate-200/70 pb-3">
            <CheckSquare className="w-5 h-5 text-namnilam-700" />
            <span>What should your AI do?</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { key: 'answerEnquiries', label: 'Answer customer enquiries' },
              { key: 'shareProjectInfo', label: 'Share project information' },
              { key: 'answerPricing', label: 'Answer pricing questions' },
              { key: 'collectRequirements', label: 'Collect customer requirements' },
              { key: 'followUpLeads', label: 'Follow up with leads' },
              { key: 'bookSiteVisits', label: 'Book site visits' },
            ].map(({ key, label }) => {
              const checked = settings.capabilities[key as keyof AISettings['capabilities']];
              return (
                <label
                  key={key}
                  onClick={() => toggleCapability(key as keyof AISettings['capabilities'])}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition ${
                    checked
                      ? 'bg-namnilam-50/70 border-namnilam-300 text-namnilam-950 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 font-normal hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-namnilam-700 focus:ring-namnilam-600 border-slate-300"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Activate Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-namnilam-800 hover:bg-namnilam-900 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-98"
          >
            <Sparkles className="w-5 h-5 text-emerald-300 group-hover:rotate-12 transition" />
            <span>Activate AI</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

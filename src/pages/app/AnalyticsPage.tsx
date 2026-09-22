import React from 'react';
import {
  TrendingUp,
  Clock,
  Bot,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { SEOHead } from '../../components/SEOHead';

export const AnalyticsPage: React.FC = () => {
  const { conversations, contacts } = useWorkspace();

  const totalConvs = conversations.length;
  const aiHandledCount = conversations.filter((c) => c.isAiMode).length;
  const aiResolutionRate = Math.round((aiHandledCount / (totalConvs || 1)) * 100);

  const topQuestions = [
    { question: 'What is the price of the 2 BHK villa?', count: 48, percentage: 34 },
    { question: 'Can I schedule a site visit this weekend?', count: 32, percentage: 23 },
    { question: 'Are bank loans approved for this property?', count: 26, percentage: 18 },
    { question: 'Where is the site location and distance from city?', count: 21, percentage: 15 },
    { question: 'Is the title deed clear and verified?', count: 14, percentage: 10 },
  ];

  return (
    <>
      <SEOHead
        title="Analytics | Nam Nilam AI Workspace"
        description="Monitor WhatsApp conversation volume, AI resolution rate, and lead qualification metrics."
        canonicalUrl="https://wa.namnilam.com/app/analytics"
      />

      <div className="h-full flex flex-col bg-[#F1F6F3] p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                AI Performance & Analytics
              </h1>
              <span className="text-xs font-bold bg-palegreen-200 text-namnilam-900 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold-600" />
                Real-time Stats
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Track customer engagement, AI response efficiency, and lead conversion rates on WhatsApp.
            </p>
          </div>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Stat 1 */}
            <div className="bg-white p-5 rounded-3xl shadow-xs border border-palegreen-200">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Conversations</span>
                <MessageSquare className="w-4 h-4 text-namnilam-800" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">142</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> +18%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Across all WhatsApp leads</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-5 rounded-3xl shadow-xs border border-palegreen-200">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">AI Resolution Rate</span>
                <Bot className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-700">{aiResolutionRate}%</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> Auto
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Answered without human takeover</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-5 rounded-3xl shadow-xs border border-palegreen-200">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Average AI Response</span>
                <Clock className="w-4 h-4 text-namnilam-800" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">1.8s</span>
                <span className="text-xs font-bold text-emerald-600">vs 18m human</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Instant 24/7 turnaround</p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-5 rounded-3xl shadow-xs border border-palegreen-200">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Qualified Leads</span>
                <TrendingUp className="w-4 h-4 text-gold-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{contacts.length}</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> Captured
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">With budget & contact info</p>
            </div>

          </div>

          {/* Lead Funnel & Top Questions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Lead Stage Funnel */}
            <div className="bg-white p-6 rounded-3xl shadow-xs border border-palegreen-200 space-y-4">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Lead Conversion Funnel
              </h2>

              <div className="space-y-3">
                {[
                  { label: 'New Inquiries', count: 142, bar: 100, color: 'bg-slate-400' },
                  { label: 'Contacted & Engaged', count: 118, bar: 83, color: 'bg-namnilam-700' },
                  { label: 'Qualified (Budget & Timeline)', count: 74, bar: 52, color: 'bg-emerald-600' },
                  { label: 'Site Visits Scheduled', count: 32, bar: 23, color: 'bg-purple-600' },
                  { label: 'Converted to Customer', count: 18, bar: 13, color: 'bg-gold-500' },
                ].map((step) => (
                  <div key={step.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-700">{step.label}</span>
                      <span className="text-slate-900">{step.count} leads</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${step.color} rounded-full transition-all duration-500`}
                        style={{ width: `${step.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Top Customer Questions */}
            <div className="bg-white p-6 rounded-3xl shadow-xs border border-palegreen-200 space-y-4">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Top Inquiries Answered by AI
              </h2>

              <div className="space-y-3">
                {topQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                      <span className="truncate pr-2">"{q.question}"</span>
                      <span className="text-namnilam-900 font-bold shrink-0">{q.count} inquiries</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${q.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

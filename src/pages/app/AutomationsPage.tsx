import React, { useState } from 'react';
import {
  Zap,
  Plus,
  Play,
  Pause,
  Trash2,
  ArrowRight,
  X,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { SEOHead } from '../../components/SEOHead';

export const AutomationsPage: React.FC = () => {
  const { automations, toggleAutomation, addAutomation, deleteAutomation } =
    useWorkspace();

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('New incoming message from an unknown number');
  const [action, setAction] = useState('Send AI welcome message & ask for requirement');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addAutomation(name.trim(), trigger, action);
    setShowAddModal(false);
    setName('');
  };

  return (
    <>
      <SEOHead
        title="Automations | Nam Nilam AI Workspace"
        description="Configure automated WhatsApp triggers, follow-ups, and lead qualification workflows."
        canonicalUrl="https://wa.namnilam.com/app/automations"
      />

      <div className="h-full flex flex-col bg-[#F1F6F3] p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Automations & Workflows
                </h1>
                <span className="text-xs font-bold bg-palegreen-200 text-namnilam-900 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3 text-gold-600" />
                  {automations.filter((a) => a.status === 'Active').length} Active Rules
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Trigger instant actions based on customer messages, stages, and idle time on WhatsApp.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-namnilam-900 hover:bg-namnilam-950 text-white rounded-xl text-xs font-bold shadow-xs ring-1 ring-gold-400/40 transition active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4 text-gold-300" />
              <span>Create Automation Rule</span>
            </button>
          </div>

          {/* Automations Cards */}
          <div className="grid grid-cols-1 gap-4">
            {automations.map((auto) => {
              const isActive = auto.status === 'Active';
              return (
                <div
                  key={auto.id}
                  className={`bg-white rounded-2xl p-5 shadow-xs border transition-all ${
                    isActive
                      ? 'border-palegreen-300 ring-1 ring-palegreen-200/50'
                      : 'border-slate-200 opacity-75'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isActive ? 'bg-wa-light animate-pulse' : 'bg-slate-300'
                          }`}
                        />
                        <h3 className="font-extrabold text-sm text-slate-900">{auto.name}</h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {auto.status}
                        </span>
                      </div>

                      {/* Trigger -> Action Flow */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-namnilam-900">WHEN:</span>
                        <span>{auto.trigger}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-bold text-namnilam-900">THEN:</span>
                        <span>{auto.action}</span>
                      </div>

                      <div className="flex items-center gap-4 text-[11px] text-slate-400">
                        <span>Total Executions: <strong className="text-slate-700">{auto.executionsCount}</strong> times</span>
                      </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => toggleAutomation(auto.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          isActive
                            ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                            : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => deleteAutomation(auto.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Create Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-palegreen-200 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-base font-extrabold text-slate-900">Create Automation Rule</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Rule Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. VIP Lead Fast-Track"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Trigger Condition (When)
                  </label>
                  <select
                    value={trigger}
                    onChange={(e) => setTrigger(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none text-slate-800"
                  >
                    <option value="New incoming message from an unknown number">
                      New incoming message from an unknown number
                    </option>
                    <option value="Customer asks for brochure or pricing sheet">
                      Customer asks for brochure or pricing sheet
                    </option>
                    <option value="Customer asks to book site visit or inspection">
                      Customer asks to book site visit or inspection
                    </option>
                    <option value="No response from customer after 24 hours">
                      No response from customer after 24 hours
                    </option>
                    <option value="Customer expresses urgent buying intent">
                      Customer expresses urgent buying intent
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Automated Action (Then)
                  </label>
                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none text-slate-800"
                  >
                    <option value="Send AI welcome message & ask for requirement">
                      Send AI welcome message & ask for requirement
                    </option>
                    <option value="Attach and send project brochure PDF automatically">
                      Attach and send project brochure PDF automatically
                    </option>
                    <option value="Offer available Saturday / Sunday site visit time slots">
                      Offer available Saturday / Sunday site visit time slots
                    </option>
                    <option value="Send polite 24h follow-up message">
                      Send polite 24h follow-up message
                    </option>
                    <option value="Notify sales manager via SMS / alert and assign lead">
                      Notify sales manager via SMS / alert and assign lead
                    </option>
                  </select>
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-bold text-white bg-namnilam-900 hover:bg-namnilam-950 rounded-xl shadow-xs ring-1 ring-gold-400/40 transition"
                  >
                    Save Rule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

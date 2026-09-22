import React, { useState } from 'react';
import {
  Radio,
  Plus,
  AlertTriangle,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { SEOHead } from '../../components/SEOHead';

export const BroadcastsPage: React.FC = () => {
  const { broadcasts, createBroadcast, templates, contacts, addToast } = useWorkspace();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState('');
  const [templateId, setTemplateId] = useState(templates[0]?.id || '');
  const [targetGroup, setTargetGroup] = useState('all');

  const getRecipientCount = () => {
    if (targetGroup === 'hot') {
      return contacts.filter((c) => c.leadStage === 'Hot Lead').length || 3;
    }
    if (targetGroup === 'site_visit') {
      return contacts.filter((c) => c.leadStage === 'Site Visit').length || 2;
    }
    return contacts.length;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('warning', 'Please provide a campaign name.');
      return;
    }

    createBroadcast(name.trim(), templateId, getRecipientCount());
    setShowCreateModal(false);
    setName('');
  };

  return (
    <>
      <SEOHead
        title="Broadcasts | Nam Nilam AI Workspace"
        description="Send personalized WhatsApp updates and announcements to your opted-in contacts."
        canonicalUrl="https://wa.namnilam.com/app/broadcasts"
      />

      <div className="h-full flex flex-col bg-[#F1F6F3] p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  WhatsApp Broadcasts
                </h1>
                <span className="text-xs font-bold bg-palegreen-200 text-namnilam-900 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Radio className="w-3 h-3 text-gold-600" />
                  {broadcasts.length} Campaigns
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Send targeted announcements, property updates, and price alert messages to existing customers.
              </p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-namnilam-900 hover:bg-namnilam-950 text-white rounded-xl text-xs font-bold shadow-xs ring-1 ring-gold-400/40 transition active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4 text-gold-300" />
              <span>New Broadcast</span>
            </button>
          </div>

          {/* Compliance & Anti-Spam Safety Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex items-start gap-3.5 shadow-2xs">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong className="block font-bold mb-0.5">
                Responsible Messaging Guidelines
              </strong>
              Only send WhatsApp broadcasts to customers who have previously opted in or contacted your business. Avoid spamming cold lists to protect your WhatsApp number reputation and prevent account restrictions.
            </div>
          </div>

          {/* Broadcasts List */}
          <div className="bg-white rounded-3xl shadow-xs border border-palegreen-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-5">Campaign Name</th>
                    <th className="py-3.5 px-4">Template</th>
                    <th className="py-3.5 px-4">Recipients</th>
                    <th className="py-3.5 px-4">Delivered</th>
                    <th className="py-3.5 px-4">Replies</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-5">Sent Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {broadcasts.map((bc) => (
                    <tr key={bc.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4 px-5">
                        <div className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                          <Radio className="w-3.5 h-3.5 text-namnilam-800" />
                          <span>{bc.name}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-medium text-slate-700">
                        {bc.templateName}
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-800">{bc.recipientCount}</span>
                      </td>

                      <td className="py-4 px-4 text-emerald-700 font-bold">
                        {bc.deliveredCount} ({Math.round((bc.deliveredCount / (bc.recipientCount || 1)) * 100)}%)
                      </td>

                      <td className="py-4 px-4 text-namnilam-900 font-bold">
                        {bc.repliesCount}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            bc.status === 'Sent'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {bc.status}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-slate-400">
                        {new Date(bc.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Create Broadcast Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-palegreen-200 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-base font-extrabold text-slate-900">New Broadcast Campaign</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Weekend Villa Open House"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Message Template
                  </label>
                  <select
                    value={templateId}
                    onChange={(e) => setTemplateId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none font-medium text-slate-800"
                  >
                    {templates.map((tpl) => (
                      <option key={tpl.id} value={tpl.id}>
                        {tpl.name} ({tpl.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Contact Segment
                  </label>
                  <select
                    value={targetGroup}
                    onChange={(e) => setTargetGroup(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none font-medium text-slate-800"
                  >
                    <option value="all">All Contacts ({contacts.length} leads)</option>
                    <option value="hot">Hot Leads Only</option>
                    <option value="site_visit">Site Visit Leads</option>
                  </select>
                </div>

                <div className="p-3 bg-palegreen-50 rounded-xl border border-palegreen-200 text-xs text-namnilam-950">
                  Ready to send to <strong>{getRecipientCount()} recipients</strong> via connected WhatsApp number.
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-bold text-white bg-namnilam-900 hover:bg-namnilam-950 rounded-xl shadow-xs ring-1 ring-gold-400/40 transition"
                  >
                    Launch Campaign
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

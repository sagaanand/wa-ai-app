import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Copy,
  Check,
  X,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { Template } from '../../types/app';
import { SEOHead } from '../../components/SEOHead';

export const TemplatesPage: React.FC = () => {
  const { templates, addTemplate, deleteTemplate, addToast } = useWorkspace();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New template fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Template['category']>('Welcome');
  const [content, setContent] = useState('');

  const categories: Array<Template['category']> = [
    'Welcome',
    'Follow-up',
    'Site Visit',
    'General',
  ];

  const filteredTemplates = templates.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    addTemplate(name.trim(), category, content.trim());
    setShowAddModal(false);
    setName('');
    setContent('');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('info', 'Template copied to clipboard.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <SEOHead
        title="Templates | Nam Nilam AI Workspace"
        description="Manage standard WhatsApp message templates with dynamic customer placeholders."
        canonicalUrl="https://wa.namnilam.com/app/templates"
      />

      <div className="h-full flex flex-col bg-[#F1F6F3] p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Message Templates
                </h1>
                <span className="text-xs font-bold bg-palegreen-200 text-namnilam-900 px-2.5 py-0.5 rounded-full">
                  {templates.length} Saved
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Pre-configured WhatsApp message templates with dynamic variable insertion.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-namnilam-900 hover:bg-namnilam-950 text-white rounded-xl text-xs font-bold shadow-xs ring-1 ring-gold-400/40 transition active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4 text-gold-300" />
              <span>Create Template</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-namnilam-900 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-2xl p-5 shadow-xs border border-palegreen-200 flex flex-col justify-between space-y-4 hover:shadow-sm transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{tpl.name}</h3>
                      <span className="inline-block mt-1 text-[10px] font-bold text-namnilam-800 bg-palegreen-100 px-2 py-0.5 rounded-full">
                        {tpl.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(tpl.id, tpl.content)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                        title="Copy to clipboard"
                      >
                        {copiedId === tpl.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteTemplate(tpl.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete template"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
                    {tpl.content}
                  </div>
                </div>

                {/* Variables Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">Variables:</span>
                    {tpl.variables.map((v) => (
                      <span key={v} className="bg-slate-100 text-slate-600 px-1 rounded text-[10px]">
                        {v}
                      </span>
                    ))}
                  </div>
                  <span>Modified {tpl.lastModified}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Add Template Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-palegreen-200 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-base font-extrabold text-slate-900">New Message Template</h3>
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
                    Template Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Site Visit Direction Pin"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Template['category'])}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none font-medium text-slate-800"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Message Content *
                    </label>
                    <span className="text-[10px] text-slate-400">Use {`{{name}}`} for customer name</span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Hello {{name}}, thank you for reaching out to us..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none font-mono"
                  />
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
                    Save Template
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

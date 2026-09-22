import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Download,
  Upload,
  MessageSquare,
  Mail,
  X,
  Filter,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { LeadStage } from '../../types/app';
import { SEOHead } from '../../components/SEOHead';

export const ContactsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    contacts,
    addContact,
    setActiveConversationId,
    conversations,
    addToast,
  } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Contact Form
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStage, setNewStage] = useState<LeadStage>('New');
  const [newTags, setNewTags] = useState('');

  const leadStages: LeadStage[] = [
    'New',
    'Contacted',
    'Qualified',
    'Hot Lead',
    'Site Visit',
    'Customer',
    'Lost',
  ];

  // Filtered contacts
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStage = selectedStage === 'All' || c.leadStage === selectedStage;

    return matchesSearch && matchesStage;
  });

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      addToast('warning', 'Please provide a name and phone number.');
      return;
    }

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addContact({
      name: newName.trim(),
      phone: newPhone.trim(),
      email: newEmail.trim() || undefined,
      status: 'Active',
      leadStage: newStage,
      tags: tagsArray.length > 0 ? tagsArray : ['Inquiry'],
      assignedTo: 'AI Assistant',
    });

    setShowAddModal(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewTags('');
  };

  const handleGoToChat = (phone: string) => {
    const found = conversations.find((c) => c.contactPhone === phone);
    if (found) {
      setActiveConversationId(found.id);
    }
    navigate('/app/inbox');
  };

  const handleExportCSV = () => {
    const headers = ['Name,Phone,Email,LeadStage,Tags,Status\n'];
    const rows = contacts.map(
      (c) =>
        `"${c.name}","${c.phone}","${c.email || ''}","${c.leadStage}","${c.tags.join(';')}","${c.status}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nam_nilam_contacts_${Date.now()}.csv`;
    a.click();
    addToast('success', 'Contacts exported to CSV successfully.');
  };

  const handleImportSample = () => {
    addContact({
      name: 'Venkatesh Murugan',
      phone: '+91 98410 44221',
      email: 'venkat.m@gmail.com',
      status: 'Active',
      leadStage: 'Hot Lead',
      tags: ['Commercial', 'Chennai', 'High Budget'],
      assignedTo: 'AI Assistant',
    });
    addToast('success', 'Sample contact imported.');
  };

  return (
    <>
      <SEOHead
        title="Contacts & CRM | Nam Nilam AI Workspace"
        description="View and manage all customer leads captured through WhatsApp."
        canonicalUrl="https://wa.namnilam.com/app/contacts"
      />

      <div className="h-full flex flex-col bg-[#F1F6F3] p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Contacts & Leads
                </h1>
                <span className="text-xs font-bold bg-palegreen-200 text-namnilam-900 px-2.5 py-0.5 rounded-full">
                  {contacts.length} Total
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                All customer inquiries captured automatically from your WhatsApp conversations.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleImportSample}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs transition"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import CSV</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-namnilam-900 hover:bg-namnilam-950 text-white rounded-xl text-xs font-bold shadow-xs ring-1 ring-gold-400/40 transition active:scale-95"
              >
                <Plus className="w-4 h-4 text-gold-300" />
                <span>Add Contact</span>
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-palegreen-200 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, phone or email..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-namnilam-800 outline-none"
              />
            </div>

            {/* Stage Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3" />
                Stage:
              </span>
              {['All', ...leadStages].map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSelectedStage(stage)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedStage === stage
                      ? 'bg-namnilam-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* Contacts Table */}
          <div className="bg-white rounded-2xl shadow-xs border border-palegreen-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Phone</th>
                    <th className="py-3.5 px-4">Lead Stage</th>
                    <th className="py-3.5 px-4">Tags</th>
                    <th className="py-3.5 px-4">Assigned To</th>
                    <th className="py-3.5 px-4">Last Activity</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No contacts found. Click "Add Contact" to create one.
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-namnilam-800 text-gold-300 font-bold flex items-center justify-center shrink-0">
                              {contact.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-xs">
                                {contact.name}
                              </div>
                              {contact.email && (
                                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                                  <Mail className="w-2.5 h-2.5" />
                                  {contact.email}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                          {contact.phone}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              contact.leadStage === 'Hot Lead'
                                ? 'bg-rose-100 text-rose-800'
                                : contact.leadStage === 'Site Visit'
                                ? 'bg-purple-100 text-purple-800'
                                : contact.leadStage === 'Qualified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : contact.leadStage === 'Customer'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {contact.leadStage}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {contact.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-700 font-medium">
                          {contact.assignedTo}
                        </td>

                        <td className="py-3.5 px-4 text-slate-400">
                          {new Date(contact.lastConversationAt).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleGoToChat(contact.phone)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-namnilam-900 bg-palegreen-100 hover:bg-palegreen-200 transition"
                          >
                            <MessageSquare className="w-3 h-3 text-namnilam-800" />
                            <span>Chat</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Add Contact Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-palegreen-200 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-base font-extrabold text-slate-900">Add New Contact</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateContact} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Anandha Krishnan"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 98400 12345"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="anand@example.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Lead Stage
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as LeadStage)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none font-bold text-slate-800"
                  >
                    {leadStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="2 BHK, Coimbatore, Villa"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
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
                    Save Contact
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

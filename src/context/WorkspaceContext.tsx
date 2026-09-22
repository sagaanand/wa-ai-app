import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  WhatsAppAccount,
  Conversation,
  ChatMessage,
  Contact,
  LeadStage,
  KnowledgeBase,
  Automation,
  Template,
  Broadcast,
  AISettings,
  ToastNotification,
  Note,
} from '../types/app';

interface WorkspaceContextType {
  // WhatsApp connection
  whatsAppAccount: WhatsAppAccount;
  startWhatsAppConnection: () => void;
  disconnectWhatsApp: () => void;
  reconnectWhatsApp: () => void;

  // Conversations & Chat
  conversations: Conversation[];
  activeConversationId: string | null;
  activeConversation: Conversation | null;
  activeMessages: ChatMessage[];
  setActiveConversationId: (id: string) => void;
  sendMessage: (text: string) => void;
  simulateCustomerMessage: (text: string) => void;
  toggleAiMode: (conversationId: string) => void;
  suggestedAiReply: string;
  generateSuggestedReply: (conversationId: string) => void;
  useSuggestedReply: () => void;
  updateLeadStage: (conversationId: string, stage: LeadStage) => void;
  addNoteToConversation: (conversationId: string, text: string) => void;
  addTagToConversation: (conversationId: string, tag: string) => void;
  removeTagFromConversation: (conversationId: string, tag: string) => void;

  // Contacts
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id' | 'workspaceId' | 'lastConversationAt'>) => void;
  updateContact: (id: string, data: Partial<Contact>) => void;

  // AI Knowledge
  knowledgeBase: KnowledgeBase;
  saveKnowledgeBase: (data: Partial<KnowledgeBase>) => void;

  // Automations
  automations: Automation[];
  toggleAutomation: (id: string) => void;
  addAutomation: (name: string, trigger: string, action: string) => void;
  deleteAutomation: (id: string) => void;

  // Templates
  templates: Template[];
  addTemplate: (name: string, category: Template['category'], content: string) => void;
  updateTemplate: (id: string, content: string) => void;
  deleteTemplate: (id: string) => void;

  // Broadcasts
  broadcasts: Broadcast[];
  createBroadcast: (name: string, templateId: string, recipientCount: number) => void;

  // AI Settings
  aiSettings: AISettings;
  updateAiSettings: (data: Partial<AISettings>) => void;

  // Toast Notifications
  toasts: ToastNotification[];
  addToast: (type: ToastNotification['type'], message: string) => void;
  removeToast: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { workspace } = useAuth();
  const workspaceId = workspace?.id || 'default_ws';

  const KEY_PREFIX = `nn_ws_${workspaceId}_`;
  const KEY_KNOWLEDGE = `${KEY_PREFIX}knowledge`;
  const KEY_AUTOMATIONS = `${KEY_PREFIX}automations`;
  const KEY_TEMPLATES = `${KEY_PREFIX}templates`;
  const KEY_AI_SETTINGS = `${KEY_PREFIX}ai_settings`;

  // 1. Toast Notifications State
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = useCallback((type: ToastNotification['type'], message: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 2. Real WhatsApp Account State (Synced with Backend Baileys Session)
  const [whatsAppAccount, setWhatsAppAccount] = useState<WhatsAppAccount>({
    id: `wa_${workspaceId}`,
    workspaceId,
    phoneNumber: '',
    status: 'disconnected',
    device: 'WhatsApp Web · Baileys',
  });

  // 3. Real Conversations & Messages (Synced with Real WhatsApp Chats)
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({});

  // 4. Contacts State
  const [contacts, setContacts] = useState<Contact[]>([]);

  // 5. AI Settings State
  const [aiSettings, setAiSettings] = useState<AISettings>(() => {
    const saved = localStorage.getItem(KEY_AI_SETTINGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      aiEnabled: true,
      autoReply: true,
      followUp: true,
      humanHandover: true,
      responseStyle: 'Professional',
      businessHours: {
        enabled: true,
        start: '09:00',
        end: '20:00',
        outsideBehavior: 'ai_responds',
      },
    };
  });

  // 6. AI Knowledge Base
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase>(() => {
    const saved = localStorage.getItem(KEY_KNOWLEDGE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      workspaceId,
      businessName: workspace?.name || 'Nam Nilam Realty',
      description: 'DTCP & RERA approved residential plots and villa projects.',
      location: 'Tamil Nadu',
      contactDetails: '+91 97876 00221 | info@namnilam.com',
      instructions:
        'Politely answer customer questions about project details, plot availability, and pricing starting from ₹18.5 Lakhs. Offer free weekend site visits.',
      products: [
        {
          id: 'prod_1',
          name: 'Abirami Nagar Residential Plots',
          description: '1200 - 2400 sq.ft DTCP approved clear title plots with 40ft blacktop roads.',
          price: 'Starting from ₹18.5 Lakhs (₹1,540 / sq.ft)',
          availability: '14 plots available',
        },
      ],
      faqs: [
        {
          id: 'faq_1',
          question: 'Are bank loans available?',
          answer: 'Yes, up to 80% bank loan approval is ready with SBI, HDFC, and Indian Bank.',
        },
      ],
    };
  });

  // -------------------------------------------------------------
  // REAL-TIME BACKEND POLLING: STATUS, CHATS, ACTIVE MESSAGES
  // -------------------------------------------------------------

  // Poll 1: WhatsApp Connection Status & Master AI toggle
  useEffect(() => {
    let isMounted = true;

    const syncStatus = async () => {
      try {
        const res = await fetch('/api/status');
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted) return;

        setWhatsAppAccount((prev) => {
          if (
            prev.status === data.status &&
            prev.phoneNumber === (data.phoneNumber || '') &&
            prev.qrCode === data.qr
          ) {
            return prev;
          }
          return {
            ...prev,
            status: data.status,
            phoneNumber: data.phoneNumber || prev.phoneNumber || '',
            qrCode: data.qr || undefined,
            connectedAt: data.status === 'connected' ? (prev.connectedAt || new Date().toISOString()) : undefined,
          };
        });

        if (typeof data.aiEnabled === 'boolean') {
          setAiSettings((prev) => (prev.aiEnabled === data.aiEnabled ? prev : { ...prev, aiEnabled: data.aiEnabled }));
        }

        if (data.aiSettings?.businessName && data.aiSettings?.instructions) {
          setKnowledgeBase((prev) => ({
            ...prev,
            businessName: data.aiSettings.businessName,
            instructions: data.aiSettings.instructions,
          }));
        }
      } catch (err) {
        // Backend temporarily unavailable
      }
    };

    syncStatus();
    const interval = setInterval(syncStatus, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Poll 2: Real WhatsApp Chats List
  useEffect(() => {
    let isMounted = true;

    const syncChats = async () => {
      try {
        const res = await fetch('/api/chats');
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted || !Array.isArray(data.chats)) return;

        const mapped: Conversation[] = data.chats.map((c: any) => ({
          id: c.id,
          workspaceId,
          contactId: c.id,
          contactName: c.contactName || c.contactPhone || 'WhatsApp User',
          contactPhone: c.contactPhone || c.id.split('@')[0],
          lastMessage: c.lastMessage || '',
          lastMessageTime: c.lastMessageTime || '',
          unreadCount: c.unreadCount || 0,
          leadStage: 'New',
          isAiMode: c.isAiMode !== false,
          tags: [],
          notes: [],
          activities: [],
        }));

        setConversations(mapped);

        // Auto-select first chat if none selected
        setActiveConversationId((current) => {
          if (!current && mapped.length > 0) {
            return mapped[0].id;
          }
          return current;
        });
      } catch (err) {
        // silent
      }
    };

    syncChats();
    const interval = setInterval(syncChats, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [workspaceId]);

  // Poll 3: Messages for Currently Active Chat
  useEffect(() => {
    if (!activeConversationId) return;
    let isMounted = true;

    const syncActiveMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${encodeURIComponent(activeConversationId)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted || !Array.isArray(data.messages)) return;

        setMessagesMap((prev) => ({
          ...prev,
          [activeConversationId]: data.messages,
        }));
      } catch (err) {
        // silent
      }
    };

    syncActiveMessages();
    const interval = setInterval(syncActiveMessages, 1500);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeConversationId]);

  // -------------------------------------------------------------
  // WHATSAPP CONTROLS
  // -------------------------------------------------------------

  const startWhatsAppConnection = async () => {
    setWhatsAppAccount((prev) => ({ ...prev, status: 'connecting' }));
    try {
      const res = await fetch('/api/qr');
      if (res.ok) {
        const data = await res.json();
        setWhatsAppAccount((prev) => ({
          ...prev,
          status: data.status,
          qrCode: data.qr,
        }));
      }
    } catch (e) {}
  };

  const disconnectWhatsApp = async () => {
    try {
      await fetch('/api/disconnect', { method: 'POST' });
    } catch (e) {}

    setWhatsAppAccount({
      id: `wa_${workspaceId}`,
      workspaceId,
      phoneNumber: '',
      status: 'disconnected',
      device: 'WhatsApp Web · Baileys',
    });
    setConversations([]);
    setActiveConversationId(null);
    setMessagesMap({});
    addToast('warning', 'WhatsApp disconnected. Scan the new QR code to reconnect.');
  };

  const reconnectWhatsApp = () => {
    disconnectWhatsApp();
  };

  // -------------------------------------------------------------
  // REAL MESSAGE SENDING
  // -------------------------------------------------------------

  const sendMessage = async (text: string) => {
    if (!activeConversationId || !text.trim()) return;

    const trimmed = text.trim();
    const tempId = `temp_${Date.now()}`;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const localMsg: ChatMessage = {
      id: tempId,
      conversationId: activeConversationId,
      sender: 'human',
      text: trimmed,
      timestamp: timeNow,
      status: 'sent',
    };

    // Optimistic UI update
    setMessagesMap((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), localMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? { ...c, lastMessage: trimmed, lastMessageTime: timeNow }
          : c
      )
    );

    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: activeConversationId, text: trimmed }),
      });

      if (!res.ok) {
        const errData = await res.json();
        addToast('error', errData.error || 'Failed to send WhatsApp message.');
        return;
      }

      const data = await res.json();
      setMessagesMap((prev) => ({
        ...prev,
        [activeConversationId]: (prev[activeConversationId] || []).map((m) =>
          m.id === tempId ? { ...m, id: data.message?.id || m.id, status: 'read' } : m
        ),
      }));
    } catch (err: any) {
      addToast('error', 'Network error sending WhatsApp message.');
    }
  };

  // No-op for simulateCustomerMessage since real WhatsApp is active
  const simulateCustomerMessage = (_text: string) => {
    addToast('info', 'Real WhatsApp mode is active. Send a message to your WhatsApp from any phone to test live replies.');
  };

  // Toggle AI per conversation
  const toggleAiMode = async (convId: string) => {
    const conv = conversations.find((c) => c.id === convId);
    if (!conv) return;

    const nextMode = !conv.isAiMode;
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, isAiMode: nextMode } : c))
    );

    try {
      await fetch('/api/ai-toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: convId, enabled: nextMode }),
      });
    } catch (e) {}

    addToast(
      nextMode ? 'success' : 'warning',
      nextMode
        ? `AI Mode enabled for ${conv.contactName}.`
        : `Human Takeover: AI will not auto-reply to ${conv.contactName}.`
    );
  };

  // AI Master Settings update
  const updateAiSettings = async (data: Partial<AISettings>) => {
    const updated = { ...aiSettings, ...data };
    setAiSettings(updated);
    localStorage.setItem(KEY_AI_SETTINGS, JSON.stringify(updated));

    try {
      if (data.aiEnabled !== undefined) {
        await fetch('/api/ai-toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled: data.aiEnabled }),
        });
      }
    } catch (e) {}

    addToast(
      data.aiEnabled === false ? 'warning' : 'success',
      data.aiEnabled !== undefined
        ? data.aiEnabled
          ? 'AI Assistant is ON: Automatically replying to customer messages.'
          : 'AI Assistant is OFF: Messages received, no automated reply sent.'
        : 'AI settings updated.'
    );
  };

  // Save Knowledge Base
  const saveKnowledgeBase = async (data: Partial<KnowledgeBase>) => {
    const updated = { ...knowledgeBase, ...data };
    setKnowledgeBase(updated);
    localStorage.setItem(KEY_KNOWLEDGE, JSON.stringify(updated));

    try {
      await fetch('/api/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: updated.businessName,
          instructions: updated.instructions,
          description: updated.description,
          location: updated.location,
          contactDetails: updated.contactDetails,
          products: updated.products,
          faqs: updated.faqs,
          industry: updated.industry,
          officeAddress: updated.officeAddress,
          websiteUrl: updated.websiteUrl,
          languageStyle: updated.languageStyle,
          alwaysRules: updated.alwaysRules,
          neverRules: updated.neverRules,
          freeformDocument: updated.freeformDocument,
          responseStyle: updated.responseStyle,
          enabled: aiSettings.aiEnabled,
        }),
      });
    } catch (e) {}

    addToast('success', 'AI Knowledge & Training saved successfully!');
  };

  // Active conversation helpers
  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;
  const activeMessages = activeConversationId ? messagesMap[activeConversationId] || [] : [];

  // AI Suggested Reply
  const [suggestedAiReply, setSuggestedAiReply] = useState<string>(
    'Sure! I can share the project details, availability, and pricing with you.'
  );

  const generateSuggestedReply = (convId: string) => {
    const conv = conversations.find((c) => c.id === convId);
    const msgs = messagesMap[convId] || [];
    const lastMsg = msgs[msgs.length - 1]?.text.toLowerCase() || '';

    let suggestion = '';
    if (lastMsg.includes('price') || lastMsg.includes('cost')) {
      suggestion = `Our plots start from ₹18.5 Lakhs with 80% bank loan approval available. Would you like the complete rate card?`;
    } else if (lastMsg.includes('visit') || lastMsg.includes('weekend')) {
      suggestion = `Certainly! We have free site visits this Saturday and Sunday. Which time slot works best for you?`;
    } else {
      suggestion = `Hello ${conv?.contactName || 'there'}! I can help you with project brochures, available plots, and pricing. What would you like to know?`;
    }

    setSuggestedAiReply(suggestion);
  };

  const useSuggestedReply = () => {
    if (!suggestedAiReply) return;
    sendMessage(suggestedAiReply);
  };

  // Lead stage update
  const updateLeadStage = (convId: string, stage: LeadStage) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, leadStage: stage } : c))
    );
    addToast('success', `Lead stage updated to ${stage}`);
  };

  // Notes & Tags
  const addNoteToConversation = (convId: string, text: string) => {
    if (!text.trim()) return;
    const newNote: Note = {
      id: `note_${Date.now()}`,
      text: text.trim(),
      createdAt: 'Just now',
      author: 'Business Owner',
    };
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, notes: [newNote, ...c.notes] } : c))
    );
    addToast('success', 'Note added.');
  };

  const addTagToConversation = (convId: string, tag: string) => {
    if (!tag.trim()) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId && !c.tags.includes(tag.trim())
          ? { ...c, tags: [...c.tags, tag.trim()] }
          : c
      )
    );
  };

  const removeTagFromConversation = (convId: string, tag: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, tags: c.tags.filter((t) => t !== tag) } : c))
    );
  };

  // Contacts
  const addContact = (data: Omit<Contact, 'id' | 'workspaceId' | 'lastConversationAt'>) => {
    const newCnt: Contact = {
      ...data,
      id: `cnt_${Date.now()}`,
      workspaceId,
      lastConversationAt: 'Just added',
    };
    setContacts((prev) => [newCnt, ...prev]);
    addToast('success', `Contact ${newCnt.name} added.`);
  };

  const updateContact = (id: string, data: Partial<Contact>) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    addToast('success', 'Contact updated.');
  };

  // Automations
  const [automations, setAutomations] = useState<Automation[]>(() => {
    const saved = localStorage.getItem(KEY_AUTOMATIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'auto_1',
        workspaceId,
        name: 'New Lead Welcome',
        trigger: 'New customer message received',
        action: 'Send instant personalized welcome and share project overview',
        status: 'Active',
        executionsCount: 0,
      },
    ];
  });

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'Active' ? ('Paused' as const) : ('Active' as const) } : a
      )
    );
  };

  const addAutomation = (name: string, trigger: string, action: string) => {
    const newAuto: Automation = {
      id: `auto_${Date.now()}`,
      workspaceId,
      name,
      trigger,
      action,
      status: 'Active',
      executionsCount: 0,
    };
    setAutomations((prev) => [newAuto, ...prev]);
  };

  const deleteAutomation = (id: string) => {
    setAutomations((prev) => prev.filter((a) => a.id !== id));
  };

  // Templates
  const [templates, setTemplates] = useState<Template[]>(() => {
    const saved = localStorage.getItem(KEY_TEMPLATES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'tmpl_1',
        workspaceId,
        name: 'New Enquiry Welcome',
        category: 'Welcome',
        content: 'Hi {{name}}, thanks for contacting Nam Nilam. How can we help you today?',
        variables: ['name'],
        lastModified: 'Today',
      },
    ];
  });

  const addTemplate = (name: string, category: Template['category'], content: string) => {
    const newTmpl: Template = {
      id: `tmpl_${Date.now()}`,
      workspaceId,
      name,
      category,
      content,
      variables: content.match(/\{\{([^}]+)\}\}/g)?.map((v) => v.replace(/[{}]/g, '')) || [],
      lastModified: 'Just now',
    };
    setTemplates((prev) => [newTmpl, ...prev]);
  };

  const updateTemplate = (id: string, content: string) => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              content,
              variables: content.match(/\{\{([^}]+)\}\}/g)?.map((v) => v.replace(/[{}]/g, '')) || [],
              lastModified: 'Just now',
            }
          : t
      )
    );
  };

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  // Broadcasts
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);

  const createBroadcast = (name: string, templateId: string, recipientCount: number) => {
    const tmpl = templates.find((t) => t.id === templateId);
    const newBroadcast: Broadcast = {
      id: `bc_${Date.now()}`,
      workspaceId,
      name,
      templateId,
      templateName: tmpl?.name || 'General Template',
      recipientCount,
      sentCount: recipientCount,
      deliveredCount: recipientCount,
      repliesCount: 0,
      status: 'Sent',
      createdAt: 'Just now',
    };
    setBroadcasts((prev) => [newBroadcast, ...prev]);
    addToast('success', `Broadcast campaign "${name}" initiated.`);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        whatsAppAccount,
        startWhatsAppConnection,
        disconnectWhatsApp,
        reconnectWhatsApp,
        conversations,
        activeConversationId,
        activeConversation,
        activeMessages,
        setActiveConversationId,
        sendMessage,
        simulateCustomerMessage,
        toggleAiMode,
        suggestedAiReply,
        generateSuggestedReply,
        useSuggestedReply,
        updateLeadStage,
        addNoteToConversation,
        addTagToConversation,
        removeTagFromConversation,
        contacts,
        addContact,
        updateContact,
        knowledgeBase,
        saveKnowledgeBase,
        automations,
        toggleAutomation,
        addAutomation,
        deleteAutomation,
        templates,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        broadcasts,
        createBroadcast,
        aiSettings,
        updateAiSettings,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

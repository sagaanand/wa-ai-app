export type LeadStage =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Hot Lead'
  | 'Site Visit'
  | 'Customer'
  | 'Lost';

export type WhatsAppStatus =
  | 'disconnected'
  | 'initializing'
  | 'qr_ready'
  | 'connecting'
  | 'connected'
  | 'error';

export interface User {
  id: string;
  email: string;
  fullName: string;
  businessName: string;
  phone: string;
  workspaceId: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  currency: string;
  location: string;
  description: string;
  createdAt: string;
}

export interface WhatsAppAccount {
  id: string;
  workspaceId: string;
  phoneNumber: string;
  status: WhatsAppStatus;
  device: string;
  connectedAt?: string;
  qrCode?: string;
}

export interface Note {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface ActivityItem {
  id: string;
  type:
    | 'lead_created'
    | 'ai_replied'
    | 'customer_responded'
    | 'followup_scheduled'
    | 'status_changed'
    | 'human_takeover';
  text: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'customer' | 'ai' | 'human';
  text: string;
  timestamp: string;
  isAiReplied?: boolean;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  workspaceId: string;
  contactId: string;
  contactName: string;
  contactPhone: string;
  contactAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  leadStage: LeadStage;
  isAiMode: boolean; // true = AI handling, false = Human takeover
  interestedIn?: string;
  tags: string[];
  notes: Note[];
  activities: ActivityItem[];
}

export interface Contact {
  id: string;
  workspaceId: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  status: 'Active' | 'Inactive';
  leadStage: LeadStage;
  tags: string[];
  lastConversationAt: string;
  assignedTo: string;
}

export interface KnowledgeProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  availability: string;
  category?: string;
  location?: string;
  specs?: string;
}

export interface KnowledgeFAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface KnowledgeBase {
  workspaceId: string;
  businessName: string;
  description: string;
  location: string;
  contactDetails: string;
  instructions: string;
  products: KnowledgeProduct[];
  faqs: KnowledgeFAQ[];
  industry?: string;
  officeAddress?: string;
  websiteUrl?: string;
  languageStyle?: 'tanglish' | 'english' | 'tamil';
  alwaysRules?: string[];
  neverRules?: string[];
  freeformDocument?: string;
  responseStyle?: 'Professional' | 'Friendly' | 'Concise' | 'Sales Assistant';
}

export interface Automation {
  id: string;
  workspaceId: string;
  name: string;
  trigger: string;
  action: string;
  status: 'Active' | 'Paused';
  executionsCount: number;
}

export interface Template {
  id: string;
  workspaceId: string;
  name: string;
  category: 'Welcome' | 'Follow-up' | 'Site Visit' | 'General';
  content: string;
  variables: string[];
  lastModified: string;
}

export interface Broadcast {
  id: string;
  workspaceId: string;
  name: string;
  templateId: string;
  templateName: string;
  recipientCount: number;
  sentCount: number;
  deliveredCount: number;
  repliesCount: number;
  status: 'Scheduled' | 'Sent' | 'Draft';
  scheduledFor?: string;
  createdAt: string;
}

export interface AISettings {
  aiEnabled: boolean;
  autoReply: boolean;
  followUp: boolean;
  humanHandover: boolean;
  responseStyle: 'Professional' | 'Friendly' | 'Concise' | 'Sales Assistant';
  businessHours: {
    enabled: boolean;
    start: string;
    end: string;
    outsideBehavior: 'ai_responds' | 'business_hours_message';
  };
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export type DemoStep = 'landing' | 'qr_scan' | 'connected' | 'ai_setup' | 'activating' | 'active_inbox';

export type AIPersonality = 'Professional' | 'Friendly' | 'Sales Assistant' | 'Custom';

export interface AISettings {
  businessName: string;
  businessType: string;
  location: string;
  personality: AIPersonality;
  capabilities: {
    answerEnquiries: boolean;
    shareProjectInfo: boolean;
    answerPricing: boolean;
    collectRequirements: boolean;
    followUpLeads: boolean;
    bookSiteVisits: boolean;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'ai' | 'human';
  text: string;
  timestamp: string;
  isAiReplied?: boolean;
}

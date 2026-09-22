import { ChatMessage } from '../types';

export const INITIAL_MOCK_CONVERSATION: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'customer',
    text: 'Hi, Abirami Nagar plot details venum.',
    timestamp: '10:42 AM',
  },
  {
    id: 'msg-2',
    sender: 'ai',
    text: 'Hi Priya! Sure. Abirami Nagar project-oda plot details share panren. Ungalukku 1200 sq.ft plot interested-aa?',
    timestamp: '10:42 AM',
    isAiReplied: true,
  },
  {
    id: 'msg-3',
    sender: 'customer',
    text: 'Yes. Price enna?',
    timestamp: '10:43 AM',
  },
  {
    id: 'msg-4',
    sender: 'ai',
    text: '1200 sq.ft plots starting from ₹18.5 Lakhs. Site visit arrange pannava?',
    timestamp: '10:43 AM',
    isAiReplied: true,
  },
  {
    id: 'msg-5',
    sender: 'customer',
    text: 'Yes',
    timestamp: '10:44 AM',
  },
  {
    id: 'msg-6',
    sender: 'ai',
    text: 'Sure. Ungalukku Saturday morning or Sunday evening convenient-aa?',
    timestamp: '10:44 AM',
    isAiReplied: true,
  },
];

export const QUICK_PROMPTS = [
  {
    label: 'Saturday 10 AM confirm pannunga',
    userText: 'Saturday morning 10 AM confirm pannunga.',
    aiReply: 'Super Priya! Saturday 10:00 AM Abirami Nagar site visit confirm pannitten. Namma executive ungalukku call panni live location WhatsApp pannuvaaru. Nandri!',
  },
  {
    label: 'Bank loan facility irukka?',
    userText: 'Bank loan facility irukka? Evalo percent kedaikkum?',
    aiReply: 'Yes Priya! SBI, HDFC & Indian Bank-la upto 80% loan approval available. Namma team documentation free-aa arrange pannitharuvom.',
  },
  {
    label: 'DTCP & RERA approved-aa?',
    userText: 'Brochure and DTCP approval documents share panreengala?',
    aiReply: 'Kandippa! 100% DTCP and RERA approved clear title property. PDF brochure and layout approval copy unga WhatsApp-ku anupitten.',
  },
];

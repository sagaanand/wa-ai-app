import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from '@whiskeysockets/baileys';
import pino from 'pino';
import QRCode from 'qrcode';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const AUTH_DIR = path.join(__dirname, 'wa_session');
if (!fs.existsSync(AUTH_DIR)) {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
}

// In-Memory state
let sock = null;
let currentQr = null;
let currentQrImage = null;
let connectionStatus = 'disconnected'; // 'disconnected' | 'connecting' | 'qr_ready' | 'connected'
let connectedUser = null;

// Persistent Store Files
const CHATS_FILE = path.join(__dirname, 'chats_store.json');
const MSGS_FILE = path.join(__dirname, 'msgs_store.json');
const AI_SETTINGS_FILE = path.join(__dirname, 'ai_settings.json');

const loadJson = (file, fallback) => {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (e) {
    console.error(`Error loading ${file}:`, e.message);
  }
  return fallback;
};

const saveJson = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error(`Error saving ${file}:`, e.message);
  }
};

let chats = loadJson(CHATS_FILE, []);
let messagesMap = loadJson(MSGS_FILE, {});
let aiSettings = loadJson(AI_SETTINGS_FILE, {
  enabled: true,
  businessName: 'Nam Nilam Properties',
  instructions:
    'Politely answer questions about project details, plot availability, and pricing starting from ₹18.5 Lakhs. Offer free weekend site visits.',
});

// Helper: Sync chat recency & lastMessage from messagesMap on startup
const syncChatRecencyAndLastMessages = () => {
  for (const c of chats) {
    const msgs = messagesMap[c.id];
    if (Array.isArray(msgs) && msgs.length > 0) {
      const last = msgs[msgs.length - 1];
      if (last && last.text) {
        c.lastMessage = last.text;
        c.lastMessageTime = last.timestamp || c.lastMessageTime;
        c.rawTime = last.rawTime || c.rawTime || 0;
      }
    }
  }

  // Sort chats: chats with recent messages first
  chats.sort((a, b) => (b.rawTime || 0) - (a.rawTime || 0));
  saveJson(CHATS_FILE, chats);
};

syncChatRecencyAndLastMessages();


// Format Indian phone number for display
const formatPhoneNumber = (jid) => {
  if (!jid) return '';
  const num = jid.split('@')[0].split(':')[0];
  if (num.length === 12 && num.startsWith('91')) {
    return `+91 ${num.substring(2, 7)} ${num.substring(7)}`;
  }
  return `+${num}`;
};

// Generate AI response based on message text and business knowledge
const generateAiResponse = (text) => {
  const lower = (text || '').toLowerCase().trim();
  const biz = aiSettings.businessName || 'Nam Nilam';

  // 1. Check trained FAQs in knowledge base
  if (Array.isArray(aiSettings.faqs) && aiSettings.faqs.length > 0) {
    for (const faq of aiSettings.faqs) {
      if (!faq.question || !faq.answer) continue;
      const qLower = faq.question.toLowerCase().trim();
      const qWords = qLower.split(/\s+/).filter((w) => w.length > 3);
      const matchCount = qWords.filter((w) => lower.includes(w)).length;
      if (lower.includes(qLower) || (qWords.length > 0 && matchCount >= Math.ceil(qWords.length * 0.5))) {
        return faq.answer;
      }
    }
  }

  // 2. Check trained Products / Properties catalog
  if (Array.isArray(aiSettings.products) && aiSettings.products.length > 0) {
    for (const prod of aiSettings.products) {
      if (!prod.name) continue;
      const pNameLower = prod.name.toLowerCase().trim();
      const pWords = pNameLower.split(/\s+/).filter((w) => w.length > 3);
      const matches = lower.includes(pNameLower) || pWords.some((w) => lower.includes(w));
      if (matches) {
        let reply = `Here are the details for ${prod.name}:`;
        if (prod.price) reply += `\n• Price: ${prod.price}`;
        if (prod.specs) reply += `\n• Specs: ${prod.specs}`;
        if (prod.location) reply += `\n• Location: ${prod.location}`;
        if (prod.description) reply += `\n• Details: ${prod.description}`;
        reply += `\n\nWould you like to schedule a free site visit or receive the layout map on WhatsApp?`;
        return reply;
      }
    }
  }

  // 3. Domain pattern matching: Project details
  if (
    lower.includes('project') ||
    lower.includes('details') ||
    lower.includes('venum') ||
    lower.includes('detail') ||
    lower.includes('plot') ||
    lower.includes('villa')
  ) {
    if (Array.isArray(aiSettings.products) && aiSettings.products.length > 0) {
      const prodNames = aiSettings.products.map((p) => p.name).join(', ');
      return `Sure! At ${biz}, our featured projects include: ${prodNames}. Which one would you like more information on?`;
    }
    return `Sure! Which project are you interested in? We have Abirami Nagar residential plots and Green Valley duplex villas available.`;
  }

  // 4. Domain pattern matching: Pricing & Cost
  if (
    lower.includes('price') ||
    lower.includes('cost') ||
    lower.includes('rate') ||
    lower.includes('budget') ||
    lower.includes('vilai')
  ) {
    return `Our plots start from ₹18.5 Lakhs (approx ₹1,540 / sq.ft). DTCP and RERA approvals are clear, and bank loans are arranged. Would you like the complete price details?`;
  }

  // 5. Domain pattern matching: Site visits & Location
  if (
    lower.includes('visit') ||
    lower.includes('site') ||
    lower.includes('location') ||
    lower.includes('saturday') ||
    lower.includes('sunday') ||
    lower.includes('paaka')
  ) {
    return `Yes! We arrange free weekend site visits with pickup assistance. Would Saturday or Sunday morning work better for you?`;
  }

  // 6. Domain pattern matching: Bank Loans & EMI
  if (
    lower.includes('loan') ||
    lower.includes('bank') ||
    lower.includes('emi') ||
    lower.includes('interest')
  ) {
    return `Up to 80% bank loan approval is available with SBI, HDFC, and Indian Bank. Our team helps with all documentation free of cost.`;
  }

  // 7. Greetings
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('vanakkam') || lower.includes('hey')) {
    return `Vanakkam! Thank you for contacting ${biz}. How can I assist you today with our properties and investments?`;
  }

  // 8. General fallback using business knowledge instructions
  if (aiSettings.instructions && aiSettings.instructions.length > 10) {
    return `Thank you for contacting ${biz}! I can help you with project brochures, available plots, pricing, and scheduling free site visits. What information are you looking for?`;
  }

  return `Thank you for contacting ${biz}! How can I help you regarding our property and projects today?`;
};

// Start Baileys Connection
async function startWhatsAppSocket() {
  try {
    connectionStatus = 'connecting';
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    const { version } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: true,
      logger: pino({ level: 'silent' }),
      browser: ['Nam Nilam AI', 'Chrome', '1.0.0'],
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        currentQr = qr;
        connectionStatus = 'qr_ready';
        try {
          currentQrImage = await QRCode.toDataURL(qr, {
            width: 280,
            margin: 1,
            color: { dark: '#111B21', light: '#FFFFFF' },
            errorCorrectionLevel: 'M',
          });
        } catch (e) {
          console.error('[QR generation error]:', e.message);
        }
        console.log('[WhatsApp] New QR code generated & image ready. Ready for scanning from phone.');
      }

      if (connection === 'close') {
        const shouldReconnect =
          lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log(
          `[WhatsApp] Connection closed. Reason: ${lastDisconnect?.error?.message}. Reconnecting: ${shouldReconnect}`
        );
        connectionStatus = 'disconnected';
        currentQr = null;
        currentQrImage = null;

        if (shouldReconnect) {
          setTimeout(startWhatsAppSocket, 3000);
        } else {
          try {
            fs.rmSync(AUTH_DIR, { recursive: true, force: true });
          } catch (e) {}
          setTimeout(startWhatsAppSocket, 3000);
        }
      } else if (connection === 'open') {
        console.log('[WhatsApp] Connection established successfully!');
        connectionStatus = 'connected';
        currentQr = null;
        currentQrImage = null;
        connectedUser = {
          id: sock.user?.id ? formatPhoneNumber(sock.user.id) : '+91 97876 00221',
          name: sock.user?.name || 'Nam Nilam WhatsApp',
        };
      }
    });

    // Handle Initial History Sync (When WhatsApp Web connects and syncs chats)
    sock.ev.on('messaging-history.set', ({ chats: historyChats, contacts: historyContacts, messages: historyMessages }) => {
      console.log(`[WhatsApp] History sync received: ${historyChats?.length || 0} chats, ${historyContacts?.length || 0} contacts, ${historyMessages?.length || 0} messages`);
      
      // 1. Build contact phonebook name map
      const contactNamesMap = {};
      if (Array.isArray(historyContacts)) {
        for (const ct of historyContacts) {
          if (!ct.id) continue;
          const name = ct.name || ct.notify || ct.verifiedName;
          if (name) contactNamesMap[ct.id] = name;
        }
      }

      // 2. Process and Store Historical Messages
      if (Array.isArray(historyMessages)) {
        for (const m of historyMessages) {
          if (!m.message) continue;
          const remoteJid = m.key?.remoteJid;
          if (!remoteJid || remoteJid.endsWith('@g.us') || remoteJid === 'status@broadcast') continue;

          const text =
            m.message.conversation ||
            m.message.extendedTextMessage?.text ||
            m.message.imageMessage?.caption ||
            '';
          if (!text.trim()) continue;

          const isFromMe = Boolean(m.key?.fromMe);
          const tsSeconds = typeof m.messageTimestamp === 'number'
            ? m.messageTimestamp
            : (m.messageTimestamp?.low || Math.floor(Date.now() / 1000));
          const timeString = new Date(tsSeconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          const msgObj = {
            id: m.key.id || `hist_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            conversationId: remoteJid,
            sender: isFromMe ? 'human' : 'customer',
            text: text.trim(),
            timestamp: timeString,
            rawTime: tsSeconds,
            status: 'read',
          };

          if (!messagesMap[remoteJid]) messagesMap[remoteJid] = [];
          if (!messagesMap[remoteJid].some((x) => x.id === msgObj.id)) {
            messagesMap[remoteJid].push(msgObj);
          }
        }

        // Sort messages inside each chat chronologically
        for (const jid in messagesMap) {
          messagesMap[jid].sort((a, b) => (a.rawTime || 0) - (b.rawTime || 0));
        }
        saveJson(MSGS_FILE, messagesMap);
      }

      // 3. Process Chats and link lastMessage + contactName
      if (Array.isArray(historyChats)) {
        for (const c of historyChats) {
          if (!c.id || c.id.endsWith('@g.us') || c.id === 'status@broadcast') continue;
          const contactPhone = formatPhoneNumber(c.id);
          const contactName = contactNamesMap[c.id] || c.name || contactPhone;
          const chatMsgs = messagesMap[c.id];
          const lastMsg = Array.isArray(chatMsgs) && chatMsgs.length > 0 ? chatMsgs[chatMsgs.length - 1] : null;

          const convTs = c.conversationTimestamp?.low || c.conversationTimestamp || lastMsg?.rawTime || 0;
          const existingIdx = chats.findIndex((x) => x.id === c.id);

          const chatEntry = {
            id: c.id,
            contactName,
            contactPhone,
            lastMessage: lastMsg ? lastMsg.text : '',
            lastMessageTime: lastMsg ? lastMsg.timestamp : '',
            rawTime: convTs,
            unreadCount: c.unreadCount || 0,
            isAiMode: true,
          };

          if (existingIdx === -1) {
            chats.push(chatEntry);
          } else {
            chats[existingIdx] = {
              ...chats[existingIdx],
              contactName: contactNamesMap[c.id] || chats[existingIdx].contactName || contactName,
              lastMessage: lastMsg ? lastMsg.text : chats[existingIdx].lastMessage,
              lastMessageTime: lastMsg ? lastMsg.timestamp : chats[existingIdx].lastMessageTime,
              rawTime: Math.max(chats[existingIdx].rawTime || 0, convTs),
              unreadCount: c.unreadCount !== undefined ? c.unreadCount : chats[existingIdx].unreadCount,
            };
          }
        }

        // Sort chats by most recent message/activity
        chats.sort((a, b) => (b.rawTime || 0) - (a.rawTime || 0));
        saveJson(CHATS_FILE, chats);
      }
    });

    // Handle Chats Update/Upsert
    sock.ev.on('chats.upsert', (newChats) => {
      if (Array.isArray(newChats)) {
        for (const c of newChats) {
          if (!c.id || c.id.endsWith('@g.us') || c.id === 'status@broadcast') continue;
          const contactPhone = formatPhoneNumber(c.id);
          const contactName = c.name || contactPhone;
          const existingIdx = chats.findIndex((x) => x.id === c.id);
          if (existingIdx >= 0) {
            if (c.unreadCount !== undefined) chats[existingIdx].unreadCount = c.unreadCount;
          } else {
            chats.unshift({
              id: c.id,
              contactName,
              contactPhone,
              lastMessage: '',
              lastMessageTime: '',
              unreadCount: c.unreadCount || 0,
              isAiMode: true,
            });
          }
        }
        saveJson(CHATS_FILE, chats);
      }
    });

    // Handle Incoming / Outgoing Messages
    sock.ev.on('messages.upsert', async ({ messages: newMessages, type }) => {
      if (type !== 'notify' && type !== 'append') return;

      for (const m of newMessages) {
        if (!m.message) continue;

        const remoteJid = m.key.remoteJid;
        if (!remoteJid || remoteJid.endsWith('@g.us') || remoteJid === 'status@broadcast') continue;

        const text =
          m.message.conversation ||
          m.message.extendedTextMessage?.text ||
          m.message.imageMessage?.caption ||
          '';

        if (!text.trim()) continue;

        const isFromMe = Boolean(m.key.fromMe);
        const contactPhone = formatPhoneNumber(remoteJid);
        const contactName = m.pushName || contactPhone;
        const tsSeconds = typeof m.messageTimestamp === 'number'
          ? m.messageTimestamp
          : (m.messageTimestamp?.low || Math.floor(Date.now() / 1000));
        const timeString = new Date(tsSeconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const msgObj = {
          id: m.key.id || `msg_${Date.now()}`,
          conversationId: remoteJid,
          sender: isFromMe ? 'human' : 'customer',
          text: text.trim(),
          timestamp: timeString,
          rawTime: tsSeconds,
          status: 'read',
        };

        // Store message
        if (!messagesMap[remoteJid]) messagesMap[remoteJid] = [];
        if (!messagesMap[remoteJid].some((x) => x.id === msgObj.id)) {
          messagesMap[remoteJid].push(msgObj);
        }
        saveJson(MSGS_FILE, messagesMap);

        // Update chats list and MOVE TO TOP!
        const existingChatIndex = chats.findIndex((c) => c.id === remoteJid);
        let chatObj;
        if (existingChatIndex >= 0) {
          chatObj = chats.splice(existingChatIndex, 1)[0];
          chatObj.lastMessage = text.trim();
          chatObj.lastMessageTime = timeString;
          chatObj.rawTime = tsSeconds;
          if (contactName && (chatObj.contactName === contactPhone || !chatObj.contactName)) {
            chatObj.contactName = contactName;
          }
          if (!isFromMe && type === 'notify') {
            chatObj.unreadCount = (chatObj.unreadCount || 0) + 1;
          }
        } else {
          chatObj = {
            id: remoteJid,
            contactName,
            contactPhone,
            lastMessage: text.trim(),
            lastMessageTime: timeString,
            rawTime: tsSeconds,
            unreadCount: isFromMe || type === 'append' ? 0 : 1,
            isAiMode: true,
          };
        }
        chats.unshift(chatObj);
        saveJson(CHATS_FILE, chats);

        console.log(`[WhatsApp] ${isFromMe ? 'You' : contactName}: "${text}"`);

        // AI ASSISTANT RESPONSE ENGINE (Only reply for realtime incoming customer messages)
        if (!isFromMe && type === 'notify') {
          const chat = chats.find((c) => c.id === remoteJid);
          const isChatAiActive = chat ? chat.isAiMode !== false : true;

          if (aiSettings.enabled && isChatAiActive) {
            console.log(`[AI Assistant] Processing incoming message from ${contactName}...`);
            const aiAnswer = generateAiResponse(text);

            setTimeout(async () => {
              try {
                await sock.sendMessage(remoteJid, { text: aiAnswer });

                const aiMsgObj = {
                  id: `ai_${Date.now()}`,
                  conversationId: remoteJid,
                  sender: 'ai',
                  text: aiAnswer,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  rawTime: Math.floor(Date.now() / 1000),
                  isAiReplied: true,
                  status: 'read',
                };

                messagesMap[remoteJid].push(aiMsgObj);
                saveJson(MSGS_FILE, messagesMap);

                // Update chat snippet and move to top
                const cIdx = chats.findIndex((c) => c.id === remoteJid);
                if (cIdx >= 0) {
                  const c = chats.splice(cIdx, 1)[0];
                  c.lastMessage = aiAnswer;
                  c.lastMessageTime = aiMsgObj.timestamp;
                  c.rawTime = aiMsgObj.rawTime;
                  c.unreadCount = 0;
                  chats.unshift(c);
                  saveJson(CHATS_FILE, chats);
                }

                console.log(`[AI Assistant] Replied to ${contactName}: "${aiAnswer}"`);
              } catch (sendErr) {
                console.error('[AI Assistant] Error sending reply:', sendErr.message);
              }
            }, 1200);
          } else {
            console.log(`[AI Assistant] OFF — Received message from ${contactName}, no automated reply sent.`);
          }
        }
      }
    });
  } catch (err) {
    console.error('[WhatsApp] Initialization error:', err.message);
    connectionStatus = 'disconnected';
  }
}

// -------------------------------------------------------------
// REST API ENDPOINTS
// -------------------------------------------------------------

// 1. WhatsApp status & user details
app.get('/api/status', (req, res) => {
  res.json({
    status: connectionStatus,
    phoneNumber: connectedUser?.id || null,
    name: connectedUser?.name || null,
    qr: currentQr,
    qrImage: currentQrImage,
    aiEnabled: aiSettings.enabled,
    aiSettings,
  });
});

// 2. Real-time QR Code
app.get('/api/qr', (req, res) => {
  res.json({
    qr: currentQr,
    qrImage: currentQrImage,
    status: connectionStatus,
  });
});

// 2.1 Refresh QR Code
app.post('/api/refresh-qr', async (req, res) => {
  console.log('[WhatsApp] User requested manual QR refresh. Restarting Baileys socket...');
  try {
    if (sock) {
      try {
        sock.end();
      } catch (e) {}
    }
  } catch (e) {}
  currentQr = null;
  currentQrImage = null;
  connectionStatus = 'connecting';
  setTimeout(startWhatsAppSocket, 500);
  res.json({ success: true, message: 'Restarting session bridge...' });
});

// 3. Chats list
app.get('/api/chats', (req, res) => {
  res.json({
    chats,
  });
});

// 4. Messages for specific chat
app.get('/api/messages/:chatId', (req, res) => {
  const { chatId } = req.params;
  const msgs = messagesMap[chatId] || [];
  res.json({ messages: msgs });
});

// 5. Send message from Web UI
app.post('/api/send-message', async (req, res) => {
  const { chatId, text } = req.body;
  if (!chatId || !text || !text.trim()) {
    return res.status(400).json({ error: 'chatId and text required' });
  }

  if (connectionStatus !== 'connected' || !sock) {
    return res.status(503).json({ error: 'WhatsApp is not connected. Please scan QR first.' });
  }

  try {
    await sock.sendMessage(chatId, { text: text.trim() });

    const msgObj = {
      id: `manual_${Date.now()}`,
      conversationId: chatId,
      sender: 'human',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    if (!messagesMap[chatId]) messagesMap[chatId] = [];
    messagesMap[chatId].push(msgObj);
    saveJson(MSGS_FILE, messagesMap);

    const cIdx = chats.findIndex((c) => c.id === chatId);
    if (cIdx >= 0) {
      const c = chats.splice(cIdx, 1)[0];
      c.lastMessage = text.trim();
      c.lastMessageTime = msgObj.timestamp;
      c.rawTime = Math.floor(Date.now() / 1000);
      chats.unshift(c);
      saveJson(CHATS_FILE, chats);
    }

    res.json({ success: true, message: msgObj });
  } catch (err) {
    console.error('Error sending message:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 6. Toggle AI Assistant ON/OFF
app.post('/api/ai-toggle', (req, res) => {
  const { enabled, chatId } = req.body;

  if (chatId) {
    const cIdx = chats.findIndex((c) => c.id === chatId);
    if (cIdx >= 0) {
      chats[cIdx].isAiMode = Boolean(enabled);
      saveJson(CHATS_FILE, chats);
    }
  } else {
    aiSettings.enabled = Boolean(enabled);
    saveJson(AI_SETTINGS_FILE, aiSettings);
  }

  res.json({ success: true, aiEnabled: aiSettings.enabled });
});

// 7. Update AI Settings & Knowledge (Full Training Engine)
app.post('/api/ai-settings', (req, res) => {
  const {
    businessName,
    instructions,
    enabled,
    description,
    location,
    contactDetails,
    products,
    faqs,
    industry,
    officeAddress,
    websiteUrl,
    languageStyle,
    alwaysRules,
    neverRules,
    freeformDocument,
    responseStyle,
  } = req.body;

  if (businessName !== undefined) aiSettings.businessName = businessName;
  if (instructions !== undefined) aiSettings.instructions = instructions;
  if (enabled !== undefined) aiSettings.enabled = Boolean(enabled);
  if (description !== undefined) aiSettings.description = description;
  if (location !== undefined) aiSettings.location = location;
  if (contactDetails !== undefined) aiSettings.contactDetails = contactDetails;
  if (products !== undefined) aiSettings.products = products;
  if (faqs !== undefined) aiSettings.faqs = faqs;
  if (industry !== undefined) aiSettings.industry = industry;
  if (officeAddress !== undefined) aiSettings.officeAddress = officeAddress;
  if (websiteUrl !== undefined) aiSettings.websiteUrl = websiteUrl;
  if (languageStyle !== undefined) aiSettings.languageStyle = languageStyle;
  if (alwaysRules !== undefined) aiSettings.alwaysRules = alwaysRules;
  if (neverRules !== undefined) aiSettings.neverRules = neverRules;
  if (freeformDocument !== undefined) aiSettings.freeformDocument = freeformDocument;
  if (responseStyle !== undefined) aiSettings.responseStyle = responseStyle;

  saveJson(AI_SETTINGS_FILE, aiSettings);
  console.log('[AI Knowledge] Successfully updated AI training parameters.');
  res.json({ success: true, aiSettings });
});

// 7.1 Test AI Response Simulator
app.post('/api/ai-test', (req, res) => {
  const { text } = req.body;
  const reply = generateAiResponse(text || '');
  res.json({ success: true, reply });
});

// 8. Disconnect WhatsApp Session
app.post('/api/disconnect', async (req, res) => {
  try {
    if (sock) {
      await sock.logout();
      sock.end();
    }
    fs.rmSync(AUTH_DIR, { recursive: true, force: true });
    connectionStatus = 'disconnected';
    currentQr = null;
    connectedUser = null;
    setTimeout(startWhatsAppSocket, 1000);
    res.json({ success: true, message: 'WhatsApp disconnected. Restarting QR...' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Start Express Server and WhatsApp socket
app.listen(PORT, () => {
  console.log(`[Server] Nam Nilam WhatsApp Bridge listening on http://localhost:${PORT}`);
  startWhatsAppSocket();
});

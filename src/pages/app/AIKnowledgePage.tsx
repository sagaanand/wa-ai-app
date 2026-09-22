import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Sparkles,
  Save,
  Plus,
  Trash2,
  Building,
  HelpCircle,
  ShoppingBag,
  ArrowLeft,
  CheckCheck,
  Send,
  FileText,
  Sliders,
  MapPin,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { KnowledgeProduct, KnowledgeFAQ } from '../../types/app';
import { SEOHead } from '../../components/SEOHead';

export const AIKnowledgePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    knowledgeBase,
    saveKnowledgeBase,
    aiSettings,
    updateAiSettings,
    whatsAppAccount,
    addToast,
  } = useWorkspace();

  // Active Tab: 'profile' | 'behavior' | 'catalog' | 'faqs' | 'documents' | 'simulator'
  const [activeTab, setActiveTab] = useState<
    'profile' | 'behavior' | 'catalog' | 'faqs' | 'documents' | 'simulator'
  >('behavior');

  // Tab 1: Profile form state
  const [businessName, setBusinessName] = useState(knowledgeBase.businessName || 'Nam Nilam Realty');
  const [industry, setIndustry] = useState(knowledgeBase.industry || 'Real Estate & Property Development');
  const [description, setDescription] = useState(
    knowledgeBase.description || 'DTCP & RERA approved residential plots, villa communities, and investment land.'
  );
  const [location, setLocation] = useState(knowledgeBase.location || 'Chennai & Coimbatore, Tamil Nadu');
  const [contactDetails, setContactDetails] = useState(knowledgeBase.contactDetails || '+91 97876 00221');
  const [officeAddress, setOfficeAddress] = useState(
    knowledgeBase.officeAddress || 'No. 45, Anna Salai, Guindy, Chennai, Tamil Nadu - 600032'
  );
  const [websiteUrl, setWebsiteUrl] = useState(knowledgeBase.websiteUrl || 'https://namnilam.com');

  // Tab 2: AI Behavior & Prompt Rules
  const [instructions, setInstructions] = useState(
    knowledgeBase.instructions ||
      'Politely answer customer questions about project details, plot availability, and pricing starting from ₹18.5 Lakhs. Offer free weekend site visits with pickup assistance. Be professional and encouraging.'
  );
  const [languageStyle, setLanguageStyle] = useState<'tanglish' | 'english' | 'tamil'>(
    knowledgeBase.languageStyle || 'tanglish'
  );
  const [responseStyle, setResponseStyle] = useState<
    'Professional' | 'Friendly' | 'Concise' | 'Sales Assistant'
  >(knowledgeBase.responseStyle || 'Professional');

  const [alwaysRules, setAlwaysRules] = useState<string[]>(
    knowledgeBase.alwaysRules && knowledgeBase.alwaysRules.length > 0
      ? knowledgeBase.alwaysRules
      : [
          'Always mention 100% DTCP and RERA approval for all plots',
          'Always offer free Saturday & Sunday site visits with cab pickup',
          'Always ask for customer preferred location or budget if unclear',
        ]
  );
  const [newAlwaysRule, setNewAlwaysRule] = useState('');

  const [neverRules, setNeverRules] = useState<string[]>(
    knowledgeBase.neverRules && knowledgeBase.neverRules.length > 0
      ? knowledgeBase.neverRules
      : [
          'Never promise price discounts or reductions without management approval',
          'Never give unverified legal commitments or inaccurate plot sizes',
          'Never share personal phone numbers of field staff without verification',
        ]
  );
  const [newNeverRule, setNewNeverRule] = useState('');

  // Tab 3: Products / Properties Catalog
  const [products, setProducts] = useState<KnowledgeProduct[]>(
    knowledgeBase.products && knowledgeBase.products.length > 0
      ? knowledgeBase.products
      : [
          {
            id: 'prod_1',
            name: 'Abirami Nagar Residential Plots',
            category: 'Residential Plots',
            price: 'Starting from ₹18.5 Lakhs (₹1,540 / sq.ft)',
            location: 'Guduvanchery, Chennai',
            specs: '1200 - 2400 sq.ft · 40ft blacktop roads · DTCP & RERA Approved',
            availability: '14 plots available',
            description: 'Clear title DTCP approved residential gated community plots ready for immediate construction with 80% bank loan approval.',
          },
          {
            id: 'prod_2',
            name: 'Green Valley Duplex Villas',
            category: 'Villas',
            price: 'Starting from ₹54 Lakhs',
            location: 'Vandalur - Kelambakkam Road, Chennai',
            specs: '3 BHK · 1850 sq.ft Built-up · Private Garden · Clubhouse',
            availability: '6 villas available',
            description: 'Independent duplex luxury villas with covered car parking, 24/7 security, potable sweet water, and children play area.',
          },
        ]
  );
  const [showAddProd, setShowAddProd] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCat, setNewProdCat] = useState('Residential Plots');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdLoc, setNewProdLoc] = useState('');
  const [newProdSpecs, setNewProdSpecs] = useState('');
  const [newProdAvail, setNewProdAvail] = useState('Available');
  const [newProdDesc, setNewProdDesc] = useState('');

  // Tab 4: FAQs & Q&A Memory
  const [faqs, setFaqs] = useState<KnowledgeFAQ[]>(
    knowledgeBase.faqs && knowledgeBase.faqs.length > 0
      ? knowledgeBase.faqs
      : [
          {
            id: 'faq_1',
            category: 'Bank Loans',
            question: 'Are bank loans available?',
            answer: 'Yes! Up to 80% bank loan approval is pre-arranged with SBI, HDFC, and Indian Bank. Our team assists with complete legal paperwork free of cost.',
          },
          {
            id: 'faq_2',
            category: 'Site Visits',
            question: 'Do you arrange site visits?',
            answer: 'Yes, we provide free site inspection visits every Saturday and Sunday with cab pickup assistance. Would Saturday or Sunday morning work for you?',
          },
          {
            id: 'faq_3',
            category: 'Approvals',
            question: 'Are the plots DTCP and RERA approved?',
            answer: 'Yes, 100% of our layout plots have DTCP and RERA approvals with clear legal titles and immediate registration readiness.',
          },
          {
            id: 'faq_4',
            category: 'Pricing',
            question: 'What is the minimum plot size and starting price?',
            answer: 'Our standard residential plot sizes start from 1200 sq.ft with pricing starting at ₹18.5 Lakhs (approx ₹1,540 / sq.ft).',
          },
        ]
  );
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [newFaqCat, setNewFaqCat] = useState('General');
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  // Tab 5: Freeform Document Text
  const [freeformDocument, setFreeformDocument] = useState(
    knowledgeBase.freeformDocument ||
      `NAM NILAM PROPERTIES - BUSINESS BRIEF:
Nam Nilam is a trusted real estate development firm in Tamil Nadu specializing in DTCP and RERA approved residential layouts, gated communities, and luxury villas.
Standard Plot Sizes: 600, 1200, 1500, 1800, 2400 sq.ft.
Amenities: 40ft and 30ft tar roads, avenue trees, LED street lights, underground drainage provisions, 24/7 security.
Payment Structure: 10% booking advance, 80% through bank loan, 10% on registration.`
  );

  // Tab 6: Live Testing Simulator
  const [simMessages, setSimMessages] = useState<
    Array<{ id: string; sender: 'user' | 'ai'; text: string; timestamp: string }>
  >([
    {
      id: 's1',
      sender: 'ai',
      text: 'Vanakkam! I am your Nam Nilam AI Assistant. Ask me any question to test how I reply to your customers on WhatsApp.',
      timestamp: 'Just now',
    },
  ]);
  const [simInput, setSimInput] = useState('');
  const [isSimLoading, setIsSimLoading] = useState(false);

  // -----------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------

  const handleSaveAll = () => {
    saveKnowledgeBase({
      businessName: businessName.trim(),
      industry: industry.trim(),
      description: description.trim(),
      location: location.trim(),
      contactDetails: contactDetails.trim(),
      officeAddress: officeAddress.trim(),
      websiteUrl: websiteUrl.trim(),
      instructions: instructions.trim(),
      languageStyle,
      responseStyle,
      alwaysRules,
      neverRules,
      products,
      faqs,
      freeformDocument,
    });
    addToast('success', 'AI Knowledge Base updated! Your assistant is now trained with this information.');
  };

  const handleAddProduct = () => {
    if (!newProdName.trim()) return;
    const newProd: KnowledgeProduct = {
      id: `prod_${Date.now()}`,
      name: newProdName.trim(),
      category: newProdCat.trim(),
      price: newProdPrice.trim() || 'Contact for price',
      location: newProdLoc.trim() || location,
      specs: newProdSpecs.trim(),
      availability: newProdAvail.trim() || 'Available',
      description: newProdDesc.trim(),
    };
    setProducts([newProd, ...products]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdLoc('');
    setNewProdSpecs('');
    setNewProdDesc('');
    setShowAddProd(false);
    addToast('info', `Added "${newProd.name}" to catalog.`);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    addToast('info', 'Product removed from catalog.');
  };

  const handleAddFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    const newFaq: KnowledgeFAQ = {
      id: `faq_${Date.now()}`,
      category: newFaqCat.trim(),
      question: newFaqQ.trim(),
      answer: newFaqA.trim(),
    };
    setFaqs([newFaq, ...faqs]);
    setNewFaqQ('');
    setNewFaqA('');
    setShowAddFaq(false);
    addToast('info', 'New trained FAQ added.');
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id));
    addToast('info', 'FAQ removed.');
  };

  const handleAddAlwaysRule = () => {
    if (!newAlwaysRule.trim()) return;
    setAlwaysRules([...alwaysRules, newAlwaysRule.trim()]);
    setNewAlwaysRule('');
  };

  const handleAddNeverRule = () => {
    if (!newNeverRule.trim()) return;
    setNeverRules([...neverRules, newNeverRule.trim()]);
    setNewNeverRule('');
  };

  // Test AI in Simulator
  const handleSendSimulatorMessage = async (textToSend?: string) => {
    const q = (textToSend || simInput).trim();
    if (!q || isSimLoading) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: `user_${Date.now()}`, sender: 'user' as const, text: q, timestamp: time };
    setSimMessages((prev) => [...prev, userMsg]);
    setSimInput('');
    setIsSimLoading(true);

    try {
      const res = await fetch('/api/ai-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: q }),
      });

      let aiReply = 'Thank you for contacting us! How can I assist you with our projects today?';
      if (res.ok) {
        const data = await res.json();
        if (data.reply) aiReply = data.reply;
      }

      setSimMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (e) {
      setSimMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: 'Vanakkam! Yes, our plots start from ₹18.5 Lakhs with 80% bank loan approval and free weekend site visits.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsSimLoading(false);
    }
  };

  // Quick preset loader for prompt
  const loadPromptPreset = (type: 'real_estate' | 'villas' | 'support' | 'tanglish') => {
    if (type === 'real_estate') {
      setInstructions(
        'Politely answer customer questions about project details, plot availability, and pricing starting from ₹18.5 Lakhs. Emphasize DTCP and RERA approvals. Offer free weekend site visits with cab pickup. Always ask if they prefer Saturday or Sunday.'
      );
    } else if (type === 'villas') {
      setInstructions(
        'Focus on luxury duplex villas starting from ₹54 Lakhs. Highlight private garden, 3 BHK floor plans, clubhouse amenities, and bank loan approvals. Invite the customer to inspect the model villa this weekend.'
      );
    } else if (type === 'support') {
      setInstructions(
        'Answer customer questions promptly with accurate facts. Keep replies under 3 sentences for easy reading on mobile WhatsApp. If an issue requires manual assistance, ask for their preferred callback time.'
      );
    } else if (type === 'tanglish') {
      setInstructions(
        'Respond in friendly, polite Tanglish (Tamil + English mixed) such as "Vanakkam! Abirami Nagar plots 1200 sq.ft start from 18.5L. Free site visit intha weekend arrange panalama?". Keep it warm and authentic.'
      );
      setLanguageStyle('tanglish');
    }
    addToast('info', 'Loaded template prompt instructions.');
  };

  return (
    <>
      <SEOHead
        title="AI Knowledge Base & Training | Nam Nilam AI Workspace"
        description="Comprehensive training dashboard for your Nam Nilam WhatsApp AI Assistant. Configure business profile, prompts, property catalog, and FAQs."
        canonicalUrl="https://wa.namnilam.com/app/ai"
      />

      <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#F1F6F3] font-sans antialiased text-slate-900 select-none">
        
        {/* ============================================================ */}
        {/* TOP NAVBAR: Back, Title, Live Status & Save Action           */}
        {/* ============================================================ */}
        <header className="h-16 px-4 sm:px-6 bg-[#00a884] text-white flex items-center justify-between border-b border-white/10 shrink-0 shadow-xs z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/app/inbox')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to WhatsApp Inbox</span>
            </button>

            <div className="hidden sm:block h-6 w-px bg-white/20" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center shadow-xs">
                <Brain className="w-4 h-4 text-[#00a884]" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight leading-none text-white">
                  AI Knowledge Base & Training
                </h1>
                <span className="text-[10px] text-white/80 font-medium">
                  Train what your AI says to real customers on WhatsApp
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live WhatsApp Status Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/15 text-[11px] font-bold text-white">
              <span
                className={`w-2 h-2 rounded-full ${
                  whatsAppAccount.status === 'connected' ? 'bg-[#25D366] animate-pulse' : 'bg-amber-300'
                }`}
              />
              <span>
                {whatsAppAccount.status === 'connected'
                  ? `WhatsApp: ${whatsAppAccount.phoneNumber || 'Connected'}`
                  : 'WhatsApp Not Connected'}
              </span>
            </div>

            {/* AI Assistant Master ON/OFF Status */}
            <div
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                aiSettings.aiEnabled ? 'bg-emerald-950/40 text-emerald-100' : 'bg-slate-800/40 text-slate-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  aiSettings.aiEnabled ? 'bg-[#25D366]' : 'bg-slate-400'
                }`}
              />
              <span>AI {aiSettings.aiEnabled ? 'Active (ON)' : 'Paused (OFF)'}</span>
            </div>

            {/* Save & Apply Training Button */}
            <button
              type="button"
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-namnilam-900 hover:bg-namnilam-950 text-white rounded-xl text-xs font-extrabold shadow-md ring-1 ring-gold-400/60 transition active:scale-95"
            >
              <Save className="w-3.5 h-3.5 text-gold-300" />
              <span>Save & Train AI</span>
            </button>
          </div>
        </header>

        {/* ============================================================ */}
        {/* SUBHEADER TABS NAVIGATION                                    */}
        {/* ============================================================ */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between overflow-x-auto shrink-0 z-10 scrollbar-none">
          <nav className="flex space-x-1 sm:space-x-2 py-2">
            {[
              { id: 'behavior', label: '1. AI Behavior & Rules', icon: Sliders },
              { id: 'profile', label: '2. Business Profile', icon: Building },
              { id: 'catalog', label: '3. Products & Listings', icon: ShoppingBag, count: products.length },
              { id: 'faqs', label: '4. Trained FAQs (Q&A)', icon: HelpCircle, count: faqs.length },
              { id: 'documents', label: '5. Document Text', icon: FileText },
              { id: 'simulator', label: '6. Live Test Simulator', icon: Sparkles, highlight: true },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-namnilam-900 text-white shadow-xs'
                      : tab.highlight
                      ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-300' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ============================================================ */}
        {/* MAIN CONTENT AREA: TAB PANELS                                */}
        {/* ============================================================ */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F1F6F3]">
          <div className="max-w-5xl mx-auto w-full space-y-6">

            {/* -------------------------------------------------------- */}
            {/* TAB 1: AI BEHAVIOR, PROMPTS & INSTRUCTION RULES          */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'behavior' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* Master System Prompt Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-palegreen-200 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-emerald-700" />
                        <span>Master AI System Instructions</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        These instructions define how the AI thinks and replies to every incoming WhatsApp message.
                      </p>
                    </div>

                    {/* Preset buttons */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] text-slate-400 self-center mr-1">Presets:</span>
                      <button
                        type="button"
                        onClick={() => loadPromptPreset('real_estate')}
                        className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                      >
                        Real Estate Plots
                      </button>
                      <button
                        type="button"
                        onClick={() => loadPromptPreset('villas')}
                        className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                      >
                        Duplex Villas
                      </button>
                      <button
                        type="button"
                        onClick={() => loadPromptPreset('tanglish')}
                        className="px-2.5 py-1 text-[11px] font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg transition"
                      >
                        Tanglish Style
                      </button>
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={5}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="e.g. Always respond politely. Recommend our Abirami Nagar plots starting from 18.5 Lakhs. Ask the customer when they would like to visit the site..."
                      className="w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#00a884] outline-none font-mono leading-relaxed"
                    />
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                      <span>Live prompt length: {instructions.length} characters</span>
                      <span className="text-[#008069] font-medium">Applied instantly to incoming chats</span>
                    </div>
                  </div>

                  {/* Language Style & Tone Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Language Style
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'tanglish', label: 'Tanglish', sub: 'Tamil + English' },
                          { id: 'english', label: 'English', sub: 'Professional' },
                          { id: 'tamil', label: 'தமிழ்', sub: 'Pure Tamil' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setLanguageStyle(item.id as any)}
                            className={`p-2.5 rounded-xl border text-center transition ${
                              languageStyle === item.id
                                ? 'bg-[#E7FCE8] border-[#008069] text-[#008069] font-extrabold ring-1 ring-[#008069]'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold'
                            }`}
                          >
                            <span className="text-xs block">{item.label}</span>
                            <span className="text-[10px] opacity-75">{item.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Response Personality Tone
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['Professional', 'Friendly', 'Concise', 'Sales Assistant'] as const).map((style) => (
                          <button
                            key={style}
                            type="button"
                            onClick={() => {
                              setResponseStyle(style);
                              updateAiSettings({ responseStyle: style });
                            }}
                            className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
                              responseStyle === style
                                ? 'bg-namnilam-900 border-namnilam-900 text-white shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rules: Always Do vs Never Do */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Always Rules */}
                  <div className="bg-white rounded-3xl p-6 shadow-xs border border-emerald-200 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                        "Always Mention" Rules (கண்டிப்பாக கூற வேண்டியவை)
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {alwaysRules.map((rule, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-xs text-slate-800"
                        >
                          <span className="flex-1 pr-2">• {rule}</span>
                          <button
                            type="button"
                            onClick={() => setAlwaysRules(alwaysRules.filter((_, i) => i !== idx))}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newAlwaysRule}
                        onChange={(e) => setNewAlwaysRule(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddAlwaysRule()}
                        placeholder="e.g. Always ask for their budget range"
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddAlwaysRule}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                      >
                        Add Rule
                      </button>
                    </div>
                  </div>

                  {/* Never Rules */}
                  <div className="bg-white rounded-3xl p-6 shadow-xs border border-rose-200 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-rose-100">
                      <ShieldCheck className="w-4 h-4 text-rose-600" />
                      <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                        "Never Mention" Restrictions (கூடாதவை)
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {neverRules.map((rule, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 bg-rose-50/70 border border-rose-200/60 rounded-xl text-xs text-slate-800"
                        >
                          <span className="flex-1 pr-2">• {rule}</span>
                          <button
                            type="button"
                            onClick={() => setNeverRules(neverRules.filter((_, i) => i !== idx))}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newNeverRule}
                        onChange={(e) => setNewNeverRule(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddNeverRule()}
                        placeholder="e.g. Never give discount without owner approval"
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddNeverRule}
                        className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold"
                      >
                        Add Rule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB 2: BUSINESS IDENTITY & OVERVIEW                      */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-palegreen-200 space-y-6 animate-in fade-in duration-150">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building className="w-4 h-4 text-namnilam-800" />
                      <span>Business Profile & Contact Information</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      The AI quotes this information when customers ask where you are located or how to reach you.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Nam Nilam Properties"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Industry / Category
                    </label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="e.g. Real Estate & Plot Development"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Operating Locations / Cities
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Chennai, Coimbatore, Tamil Nadu"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Contact Number / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={contactDetails}
                      onChange={(e) => setContactDetails(e.target.value)}
                      placeholder="+91 97876 00221"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Business Description & Overview
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Summary of what your business does..."
                      className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Office / Head Office Address
                    </label>
                    <input
                      type="text"
                      value={officeAddress}
                      onChange={(e) => setOfficeAddress(e.target.value)}
                      placeholder="e.g. No. 45 Anna Salai, Guindy, Chennai"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Official Website URL
                    </label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://namnilam.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB 3: PRODUCTS & PROPERTIES CATALOG                     */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'catalog' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-palegreen-200 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-namnilam-800" />
                        <span>Products & Offerings Catalog ({products.length})</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Add properties, plot layouts, or services. The AI matches customer requests directly to these items.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddProd(!showAddProd)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-namnilam-900 hover:bg-namnilam-950 text-white rounded-xl text-xs font-bold shadow-xs transition"
                    >
                      <Plus className="w-3.5 h-3.5 text-gold-300" />
                      <span>Add New Listing / Product</span>
                    </button>
                  </div>

                  {/* Add Product Modal / Drawer */}
                  {showAddProd && (
                    <div className="p-5 bg-palegreen-50/80 rounded-2xl border border-palegreen-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-extrabold text-namnilam-900 uppercase tracking-wider">
                          New Product / Property Listing
                        </h3>
                        <button
                          type="button"
                          onClick={() => setShowAddProd(false)}
                          className="text-slate-400 hover:text-slate-600 text-xs"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Product / Project Name *</label>
                          <input
                            type="text"
                            value={newProdName}
                            onChange={(e) => setNewProdName(e.target.value)}
                            placeholder="e.g. Abirami Nagar Phase 2"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category / Type</label>
                          <select
                            value={newProdCat}
                            onChange={(e) => setNewProdCat(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none"
                          >
                            <option value="Residential Plots">Residential Plots</option>
                            <option value="Duplex Villas">Duplex Villas</option>
                            <option value="Commercial Space">Commercial Space</option>
                            <option value="Agricultural Land">Agricultural Land</option>
                            <option value="Custom Product">Custom Product</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Price / Rate *</label>
                          <input
                            type="text"
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(e.target.value)}
                            placeholder="e.g. Starting from ₹18.5 Lakhs"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Location</label>
                          <input
                            type="text"
                            value={newProdLoc}
                            onChange={(e) => setNewProdLoc(e.target.value)}
                            placeholder="e.g. Guduvanchery, Chennai"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Availability Status</label>
                          <select
                            value={newProdAvail}
                            onChange={(e) => setNewProdAvail(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none"
                          >
                            <option value="Available">Available (விற்பனைக்கு உள்ளது)</option>
                            <option value="Fast Selling">Fast Selling</option>
                            <option value="Few Units Left">Few Units Left</option>
                            <option value="Sold Out">Sold Out</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Key Specs / Approvals</label>
                          <input
                            type="text"
                            value={newProdSpecs}
                            onChange={(e) => setNewProdSpecs(e.target.value)}
                            placeholder="e.g. 1200 sq.ft · DTCP Approved · 80% Bank Loan Ready"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Description & Details</label>
                          <textarea
                            rows={2}
                            value={newProdDesc}
                            onChange={(e) => setNewProdDesc(e.target.value)}
                            placeholder="Detailed highlights for AI to share..."
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddProd(false)}
                          className="px-4 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleAddProduct}
                          className="px-5 py-1.5 text-xs font-extrabold text-white bg-namnilam-900 rounded-xl shadow-xs"
                        >
                          Add to Catalog
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-5 bg-slate-50/80 hover:bg-white border border-slate-200 rounded-2xl transition space-y-3 relative group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mb-1">
                              {prod.category || 'Product'}
                            </span>
                            <h3 className="font-extrabold text-sm text-slate-900">{prod.name}</h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 opacity-70 group-hover:opacity-100 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-1 text-xs text-slate-600">
                          <div className="flex items-center gap-1.5 font-bold text-slate-900">
                            <span className="text-emerald-700">₹ Price:</span>
                            <span>{prod.price}</span>
                          </div>
                          {prod.location && (
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{prod.location}</span>
                            </div>
                          )}
                          {prod.specs && (
                            <div className="text-[11px] text-slate-500 font-mono">
                              {prod.specs}
                            </div>
                          )}
                          {prod.description && (
                            <p className="text-xs text-slate-600 pt-1 leading-relaxed border-t border-slate-200/60">
                              {prod.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB 4: TRAINED FAQS & Q&A MEMORY                         */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'faqs' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-palegreen-200 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-namnilam-800" />
                        <span>Trained Question & Answer Pairs ({faqs.length})</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        When a customer asks a question matching one of these, the AI answers using your exact trained response.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddFaq(!showAddFaq)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-namnilam-900 hover:bg-namnilam-950 text-white rounded-xl text-xs font-bold shadow-xs transition"
                    >
                      <Plus className="w-3.5 h-3.5 text-gold-300" />
                      <span>Add New Q&A</span>
                    </button>
                  </div>

                  {/* Add FAQ Form */}
                  {showAddFaq && (
                    <div className="p-5 bg-palegreen-50/80 rounded-2xl border border-palegreen-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-extrabold text-namnilam-900 uppercase tracking-wider">
                          Train New Question & Answer
                        </h3>
                        <button
                          type="button"
                          onClick={() => setShowAddFaq(false)}
                          className="text-slate-400 hover:text-slate-600 text-xs"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category</label>
                          <select
                            value={newFaqCat}
                            onChange={(e) => setNewFaqCat(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none"
                          >
                            <option value="General">General</option>
                            <option value="Bank Loans">Bank Loans</option>
                            <option value="Site Visits">Site Visits</option>
                            <option value="Pricing">Pricing</option>
                            <option value="Approvals">Approvals & Legal</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Customer Question *</label>
                          <input
                            type="text"
                            value={newFaqQ}
                            onChange={(e) => setNewFaqQ(e.target.value)}
                            placeholder="e.g. Are bank loans available for these plots?"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Trained AI Answer *</label>
                          <textarea
                            rows={3}
                            value={newFaqA}
                            onChange={(e) => setNewFaqA(e.target.value)}
                            placeholder="e.g. Yes! Up to 80% bank loan approval is ready with SBI and HDFC..."
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowAddFaq(false)}
                          className="px-4 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleAddFaq}
                          className="px-5 py-1.5 text-xs font-extrabold text-white bg-namnilam-900 rounded-xl shadow-xs"
                        >
                          Train Question
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FAQs List */}
                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start justify-between gap-4 hover:bg-white transition"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                              {faq.category || 'General'}
                            </span>
                            <span className="font-extrabold text-xs text-slate-900">
                              Q: {faq.question}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 pl-2 border-l-2 border-emerald-500 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB 5: FREEFORM DOCUMENT & BROCHURE TEXT MEMORY          */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-palegreen-200 space-y-5 animate-in fade-in duration-150">
                <div className="pb-3 border-b border-slate-100">
                  <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-namnilam-800" />
                    <span>Freeform Brochure & Documentation Text</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Paste raw project descriptions, terms, rate cards, or policy notes. The AI parses this text to answer general customer inquiries.
                  </p>
                </div>

                <div>
                  <textarea
                    rows={12}
                    value={freeformDocument}
                    onChange={(e) => setFreeformDocument(e.target.value)}
                    placeholder="Paste brochure content, legal disclosures, price lists, or project details here..."
                    className="w-full p-4 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white outline-none font-mono leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>Word count: {freeformDocument.trim().split(/\s+/).length} words</span>
                    <span>Indexed into AI memory</span>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB 6: LIVE TESTING SIMULATOR & PLAYGROUND               */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'simulator' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-palegreen-200 space-y-5 animate-in fade-in duration-150">
                <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold-500" />
                      <span>Live AI Response Simulator (நேரடி சோதனை Playground)</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Type test questions to see the exact message your AI Assistant will reply to real WhatsApp customers.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSimMessages([
                        {
                          id: 's1',
                          sender: 'ai',
                          text: 'Vanakkam! Ask me any question to test how I reply to your customers on WhatsApp.',
                          timestamp: 'Just now',
                        },
                      ])
                    }
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Chat</span>
                  </button>
                </div>

                {/* Quick Test Prompt Chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500">Try asking:</span>
                  {[
                    'Hi, project details venum',
                    'Price range enna?',
                    'Abirami Nagar plot details',
                    'Weekend site visit timing?',
                    'Bank loans available?',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleSendSimulatorMessage(chip)}
                      className="px-2.5 py-1 bg-palegreen-100 hover:bg-palegreen-200 text-namnilam-950 text-xs font-semibold rounded-lg border border-palegreen-300 transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Simulated WhatsApp Conversation Box */}
                <div className="bg-[#EFEAE2] rounded-2xl p-4 sm:p-6 border border-slate-200 h-96 overflow-y-auto space-y-3 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px]">
                  {simMessages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl px-3.5 py-2.5 shadow-2xs text-xs sm:text-[13px] leading-relaxed relative ${
                            isUser
                              ? 'bg-[#D9FDD3] text-slate-900 rounded-tr-xs'
                              : 'bg-white text-slate-900 rounded-tl-xs'
                          }`}
                        >
                          {!isUser && (
                            <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#008069] uppercase tracking-wider mb-1">
                              <Sparkles className="w-3 h-3 text-gold-500" />
                              <span>AI Assistant Reply</span>
                            </div>
                          )}

                          <div className="whitespace-pre-wrap">{msg.text}</div>

                          <div className="text-[9px] text-slate-400 mt-1 flex items-center justify-end gap-1">
                            <span>{msg.timestamp}</span>
                            {isUser && <CheckCheck className="w-3 h-3 text-[#53BDEB]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {isSimLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-xl px-3 py-2 text-xs text-slate-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#008069] animate-ping" />
                        <span>AI formulating response from knowledge base...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Simulator Message Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendSimulatorMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={simInput}
                    onChange={(e) => setSimInput(e.target.value)}
                    placeholder="Type a test customer message (e.g. What is the price of 1200 sq.ft plot?)..."
                    className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00a884] outline-none shadow-2xs"
                  />
                  <button
                    type="submit"
                    disabled={isSimLoading || !simInput.trim()}
                    className="px-5 py-2.5 bg-[#008069] hover:bg-[#00604f] disabled:opacity-50 text-white rounded-xl text-xs font-extrabold shadow-xs transition flex items-center gap-1.5"
                  >
                    <span>Test Reply</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

          </div>
        </main>

      </div>
    </>
  );
};

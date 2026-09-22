import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Building2, CheckCheck, ShieldCheck, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WHATSAPP_CHAT_URL, WHATSAPP_NUMBER } from '../constants';

export const RealEstatePage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/whatsapp-ai-for-real-estate" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Direct Statement */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-gold-600" />
            <span>Real Estate Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            WhatsApp AI for Real Estate Businesses
          </h1>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-3">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              Real estate buyers discover projects online and reach out directly on WhatsApp. Nam Nilam WhatsApp AI helps real estate developers, builders, and property consultants instantly answer property enquiries, share plot details, qualify buyer budgets, and arrange site visits 24/7.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              With AI WhatsApp automation for real estate, you never lose an interested property buyer due to slow response times or delayed follow-up.
            </p>
          </div>
        </div>

        {/* How AI Helps Real Estate */}
        <section className="space-y-6" aria-labelledby="real-estate-capabilities">
          <div className="text-center space-y-2">
            <h2 id="real-estate-capabilities" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How WhatsApp AI Transforms Real Estate Communication
            </h2>
            <p className="text-slate-600 text-base">
              Key workflows automated for property developers, brokers, and land promoters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Property Enquiries', desc: 'Welcome property seekers immediately as soon as they click on your Facebook, Google, or portal ads.' },
              { title: 'Project Information', desc: 'Share project brochures, master layouts, location advantages, and project approvals in seconds.' },
              { title: 'Pricing Questions', desc: 'Answer price per square foot, starting prices, and payment schedule queries accurately.' },
              { title: 'Plot Availability', desc: 'Inform buyers which unit sizes (e.g. 1200 sq.ft, 1500 sq.ft, or villas) are currently open for booking.' },
              { title: 'Customer Requirements', desc: 'Identify whether the buyer is looking for immediate construction, investment, or long-term plots.' },
              { title: 'Lead Qualification', desc: 'Screen buyer budgets and financing readiness so your sales consultants meet ready-to-buy prospects.' },
              { title: 'Site Visit Enquiries', desc: 'Coordinate visit dates and times, send Google Maps directions, and prepare the site sales team.' },
              { title: 'Real Estate Lead Follow-Up', desc: 'Follow up with buyers who visited or showed interest, keeping conversations active until closing.' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-5 border border-palegreen-200 shadow-2xs hover:border-gold-400 transition-all flex items-start gap-3.5"
              >
                <div className="w-6 h-6 rounded-full bg-palegreen-100 text-namnilam-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real Estate Conversation Dialog Example */}
        <section className="space-y-6" aria-labelledby="re-dialog-heading">
          <div className="text-center space-y-2">
            <h2 id="re-dialog-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Real Estate Conversation Example
            </h2>
            <p className="text-slate-600 text-base">
              A real-world example of how the AI chatbot for real estate handles an incoming plot inquiry.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 border border-palegreen-200 shadow-card space-y-4">
            {/* Header */}
            <div className="bg-[#075E54] text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <img
                  src="/nam-nilam-logo.png"
                  alt="Nam Nilam"
                  className="w-8 h-8 rounded-full bg-white p-0.5 object-contain"
                />
                <div>
                  <div className="text-xs font-bold">Nam Nilam AI • Property Advisor</div>
                  <div className="text-[10px] text-emerald-100">+91 97876 00221 • Online</div>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-full">AI Active</span>
            </div>

            {/* Chat Body */}
            <div className="bg-[#EFEAE2]/70 p-4 rounded-2xl space-y-3.5 text-xs sm:text-sm">
              {/* Message 1 */}
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-slate-500 font-bold mb-1">Customer</span>
                <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs max-w-[85%] leading-relaxed">
                  Hi, I saw your project. Do you have 1200 sq.ft plots?
                  <div className="text-[9px] text-slate-400 text-right mt-1">3:15 PM</div>
                </div>
              </div>

              {/* Reply 1 */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-[10px] font-bold text-namnilam-900 bg-white px-2 py-0.5 rounded-full mb-1 border border-gold-300">
                  <Sparkles className="w-2.5 h-2.5 text-gold-500" />
                  <span>AI Replying</span>
                </div>
                <div className="bg-[#D9FDD3] text-slate-900 rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-xs max-w-[85%] leading-relaxed">
                  Yes. I can help you check the available options. Would you like the current price and project details?
                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 text-right mt-1">
                    <span>3:15 PM</span>
                    <CheckCheck className="w-3 h-3 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Message 2 */}
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-slate-500 font-bold mb-1">Customer</span>
                <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs max-w-[85%] leading-relaxed">
                  Yes
                  <div className="text-[9px] text-slate-400 text-right mt-1">3:16 PM</div>
                </div>
              </div>

              {/* Reply 2 */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-[10px] font-bold text-namnilam-900 bg-white px-2 py-0.5 rounded-full mb-1 border border-gold-300">
                  <Sparkles className="w-2.5 h-2.5 text-gold-500" />
                  <span>AI Replying</span>
                </div>
                <div className="bg-[#D9FDD3] text-slate-900 rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-xs max-w-[85%] leading-relaxed">
                  Sure. I can share the details. What's your preferred budget range?
                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 text-right mt-1">
                    <span>3:16 PM</span>
                    <CheckCheck className="w-3 h-3 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conversion CTA Box */}
        <div className="bg-white rounded-3xl p-8 border border-gold-300 shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palegreen-50 text-namnilam-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Real Estate Automation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Never lose another property buyer
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Chat with Nam Nilam AI on WhatsApp ({WHATSAPP_NUMBER}) to see how our real estate WhatsApp automation works.
          </p>
          <div className="pt-2">
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-namnilam-900 hover:bg-namnilam-950 text-white font-bold text-base shadow-md hover:shadow-lg ring-1 ring-gold-400/50 hover:ring-gold-400 transition-all active:scale-95 group"
            >
              <Sparkles className="w-5 h-5 text-gold-300 group-hover:rotate-12 transition-transform" />
              <span>Chat with Nam Nilam AI →</span>
            </a>
          </div>
        </div>

        {/* Bottom Internal Links */}
        <div className="pt-8 border-t border-palegreen-200/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <Link to="/whatsapp-ai-for-small-business" className="hover:text-namnilam-900 font-semibold transition">
            See WhatsApp AI for Small Businesses →
          </Link>
          <Link to="/how-it-works" className="hover:text-namnilam-900 font-semibold transition">
            Learn How It Works in 3 Steps →
          </Link>
        </div>

      </div>
    </div>
  );
};

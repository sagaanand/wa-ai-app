import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, CheckCircle2, Send } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WHATSAPP_CHAT_URL, WHATSAPP_NUMBER } from '../constants';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20">
      <SEOHead path="/contact" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Direct Statement */}
        <div className="space-y-6 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold-300/80 text-namnilam-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <MessageCircle className="w-3.5 h-3.5 text-gold-600" />
            <span>Get in Touch</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Talk to Nam Nilam
          </h1>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200/90 shadow-card text-left space-y-3">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium">
              The fastest way to reach us and experience automated customer communication is directly through WhatsApp.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              You can chat with our AI on WhatsApp ({WHATSAPP_NUMBER}) around the clock, or leave your details in the contact form below.
            </p>
          </div>
        </div>

        {/* Two Columns: WhatsApp Priority Box & Simple Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct WhatsApp Contact Card */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-gold-400/80 shadow-card space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-namnilam-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-wa-light animate-pulse" />
                Fastest Response
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Official WhatsApp
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with Nam Nilam AI on WhatsApp. Experience automated replies and lead qualification in seconds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-palegreen-50/70 border border-palegreen-200 space-y-1">
              <span className="text-xs text-slate-500 font-medium block">Official Number</span>
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-mono font-bold text-namnilam-950 hover:text-gold-700 transition block"
              >
                {WHATSAPP_NUMBER}
              </a>
            </div>

            <div className="space-y-2">
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-namnilam-900 hover:bg-namnilam-950 text-white font-bold text-sm shadow-md transition active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-gold-300" />
                <span>Chat with Nam Nilam AI</span>
              </a>
              <p className="text-[11px] text-slate-500 text-center">
                Pre-fills: "Hi Nam Nilam AI, I want to know more about WhatsApp AI."
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-palegreen-200 shadow-2xs space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900">
                Send a Message
              </h2>
              <p className="text-xs text-slate-500">
                Leave your business details and requirement.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-palegreen-50 border border-palegreen-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-base text-slate-900">
                  Thank You for Your Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Your message has been noted locally. For instant assistance without waiting, you can also start a direct conversation on WhatsApp right now.
                </p>
                <div className="pt-2">
                  <a
                    href={WHATSAPP_CHAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-namnilam-900 text-white text-xs font-bold shadow-xs hover:bg-namnilam-950 transition"
                  >
                    <span>Chat on WhatsApp Now →</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-namnilam-700 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="contact-business" className="block text-xs font-bold text-slate-700 mb-1">
                    Business Name
                  </label>
                  <input
                    id="contact-business"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Acme Properties or Solo Consulting"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-namnilam-700 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-namnilam-700 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1">
                    How can we help? *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what business you run and what you'd like WhatsApp AI to handle..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-namnilam-700 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-namnilam-900 hover:bg-namnilam-950 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-gold-300" />
                  <span>Submit Enquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Navigation Links */}
        <div className="pt-8 border-t border-palegreen-200/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <Link to="/" className="hover:text-namnilam-900 font-semibold transition">
            ← Back to Homepage
          </Link>
          <Link to="/faq" className="hover:text-namnilam-900 font-semibold transition">
            Frequently Asked Questions →
          </Link>
        </div>

      </div>
    </div>
  );
};

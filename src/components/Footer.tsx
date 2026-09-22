import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Youtube, MessageCircle, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_CHAT_URL, SOCIAL_LINKS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1F17] text-slate-300 border-t border-gold-500/20 pt-16 pb-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/nam-nilam-logo.png"
                alt="Nam Nilam official logo"
                className="w-10 h-10 object-contain rounded-full bg-white p-0.5 ring-2 ring-gold-400/60"
                width="40"
                height="40"
                loading="lazy"
              />
              <div>
                <span className="font-extrabold text-white text-lg block tracking-tight">
                  Nam Nilam
                </span>
                <span className="text-xs text-gold-300 font-semibold block">
                  WhatsApp AI for Businesses
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Connect your WhatsApp with AI and let it handle customer conversations for you.
            </p>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2">
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-namnilam-800 hover:bg-namnilam-700 text-white text-xs font-bold ring-1 ring-gold-400/50 hover:ring-gold-400 transition-all active:scale-95 group"
                aria-label="Chat with Nam Nilam AI on WhatsApp (+91 97876 00221)"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-300 group-hover:rotate-12 transition-transform" />
                <span>Chat with Nam Nilam AI</span>
              </a>
            </div>
          </div>

          {/* Column: Product */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/whatsapp-ai" className="text-slate-300 hover:text-white transition-colors">
                  WhatsApp AI
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-slate-300 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/use-cases" className="text-slate-300 hover:text-white transition-colors">
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Solutions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Solutions
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/whatsapp-ai-for-real-estate" className="text-slate-300 hover:text-white transition-colors">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link to="/whatsapp-ai-for-small-business" className="text-slate-300 hover:text-white transition-colors">
                  Small Business
                </Link>
              </li>
              <li>
                <Link to="/whatsapp-ai-for-customer-support" className="text-slate-300 hover:text-white transition-colors">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Connect */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Connect
            </h3>
            
            {/* WhatsApp Contact */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block font-medium">WhatsApp</span>
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono font-bold text-white hover:text-gold-300 transition-colors inline-flex items-center gap-1.5"
                aria-label={`Official WhatsApp: ${WHATSAPP_NUMBER}`}
              >
                <MessageCircle className="w-4 h-4 text-wa-light shrink-0" />
                <span>{WHATSAPP_NUMBER}</span>
              </a>
            </div>

            {/* Social Links with Accessible Labels (no fake URLs) */}
            <div className="pt-1">
              <span className="text-xs text-slate-400 block font-medium mb-2.5">Social Media</span>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href={SOCIAL_LINKS[0].url}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href={SOCIAL_LINKS[1].url}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href={SOCIAL_LINKS[2].url}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href={SOCIAL_LINKS[3].url}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>

                {/* X */}
                <a
                  href={SOCIAL_LINKS[4].url}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="X"
                  title="X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Nam Nilam. All rights reserved.
          </div>
          <div className="text-slate-500 text-center sm:text-right">
            Nam Nilam WhatsApp AI • Simple setup. Human control. AI-powered conversations.
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, ChevronDown } from 'lucide-react';
import { WHATSAPP_CHAT_URL } from '../constants';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProductDropdownOpen(false);
    setSolutionsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F1F6F3]/90 backdrop-blur-md border-b border-palegreen-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" onClick={closeMenus} className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/nam-nilam-logo.png"
              alt="Nam Nilam logo"
              className="w-11 h-11 object-contain rounded-full shadow-2xs ring-2 ring-gold-400/50 p-0.5 bg-white group-hover:scale-105 transition-transform"
              width="44"
              height="44"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-namnilam-900 transition">
              Nam Nilam
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-namnilam-900 bg-white/85 border border-gold-300/70 px-2.5 py-0.5 rounded-full shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-wa-light animate-pulse" />
              WhatsApp AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700" aria-label="Main Navigation">
          {/* Home */}
          <Link
            to="/"
            className={`hover:text-namnilam-800 transition ${isActive('/') ? 'text-namnilam-900 font-bold' : ''}`}
          >
            Home
          </Link>

          {/* Product Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductDropdownOpen(true)}
            onMouseLeave={() => setProductDropdownOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 hover:text-namnilam-800 transition py-2"
              aria-expanded={productDropdownOpen}
            >
              <span>Product</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {productDropdownOpen && (
              <div className="absolute top-full left-0 w-52 bg-white rounded-2xl shadow-xl border border-palegreen-200/80 p-2 space-y-1">
                <Link
                  to="/whatsapp-ai"
                  onClick={closeMenus}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold hover:bg-palegreen-50 text-slate-800 hover:text-namnilam-900 transition"
                >
                  What Is WhatsApp AI?
                </Link>
                <Link
                  to="/how-it-works"
                  onClick={closeMenus}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold hover:bg-palegreen-50 text-slate-800 hover:text-namnilam-900 transition"
                >
                  How It Works
                </Link>
                <Link
                  to="/features"
                  onClick={closeMenus}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold hover:bg-palegreen-50 text-slate-800 hover:text-namnilam-900 transition"
                >
                  Features
                </Link>
                <Link
                  to="/use-cases"
                  onClick={closeMenus}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold hover:bg-palegreen-50 text-slate-800 hover:text-namnilam-900 transition"
                >
                  Use Cases
                </Link>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsDropdownOpen(true)}
            onMouseLeave={() => setSolutionsDropdownOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 hover:text-namnilam-800 transition py-2"
              aria-expanded={solutionsDropdownOpen}
            >
              <span>Solutions</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {solutionsDropdownOpen && (
              <div className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-xl border border-palegreen-200/80 p-2 space-y-1">
                <Link
                  to="/whatsapp-ai-for-business"
                  onClick={closeMenus}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold hover:bg-palegreen-50 text-slate-800 hover:text-namnilam-900 transition"
                >
                  WhatsApp AI for Business
                </Link>
                <Link
                  to="/whatsapp-ai-for-real-estate"
                  onClick={closeMenus}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold hover:bg-palegreen-50 text-slate-800 hover:text-namnilam-900 transition"
                >
                  Real Estate
                </Link>
                <Link
                  to="/whatsapp-ai-for-small-business"
                  onClick={closeMenus}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold hover:bg-palegreen-50 text-slate-800 hover:text-namnilam-900 transition"
                >
                  Small Businesses
                </Link>
                <Link
                  to="/whatsapp-ai-for-customer-support"
                  onClick={closeMenus}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold hover:bg-palegreen-50 text-slate-800 hover:text-namnilam-900 transition"
                >
                  Customer Support
                </Link>
              </div>
            )}
          </div>

          {/* FAQ */}
          <Link
            to="/faq"
            className={`hover:text-namnilam-800 transition ${isActive('/faq') ? 'text-namnilam-900 font-bold' : ''}`}
          >
            FAQ
          </Link>

          {/* About */}
          <Link
            to="/about"
            className={`hover:text-namnilam-800 transition ${isActive('/about') ? 'text-namnilam-900 font-bold' : ''}`}
          >
            About
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            className={`hover:text-namnilam-800 transition ${isActive('/contact') ? 'text-namnilam-900 font-bold' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* Right: Primary WhatsApp CTA, Sign In & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/app"
            className="hidden sm:inline-flex items-center text-xs sm:text-sm font-bold text-namnilam-950 hover:text-namnilam-800 px-3.5 py-2 rounded-xl bg-white border border-palegreen-300 shadow-2xs hover:bg-palegreen-50 transition"
          >
            WhatsApp Web
          </Link>


          <a
            href={WHATSAPP_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-namnilam-900 hover:bg-namnilam-950 text-white px-4 sm:px-5 py-2.5 rounded-xl shadow-xs hover:shadow ring-1 ring-gold-400/40 hover:ring-gold-400 transition-all active:scale-95 group"
            aria-label="Chat with Nam Nilam AI on WhatsApp (+91 97876 00221)"
          >
            <Sparkles className="w-4 h-4 text-gold-300 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Chat with Nam Nilam AI →</span>
            <span className="sm:hidden">Chat AI →</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-palegreen-200 text-slate-800 hover:text-namnilam-900 focus:outline-none"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-palegreen-200 px-6 py-6 space-y-5 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Main Links */}
          <div className="space-y-1">
            <Link
              to="/"
              onClick={closeMenus}
              className={`block px-3 py-2 rounded-xl text-sm font-semibold hover:bg-palegreen-50 text-slate-800 ${
                isActive('/') ? 'text-namnilam-900 bg-palegreen-100/60 font-bold' : ''
              }`}
            >
              Home
            </Link>
          </div>

          {/* Product Category */}
          <div className="border-t border-palegreen-100 pt-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-namnilam-900 block px-3 mb-2">
              Product
            </span>
            <div className="space-y-1 pl-1">
              <Link
                to="/whatsapp-ai"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                What Is WhatsApp AI?
              </Link>
              <Link
                to="/how-it-works"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                How It Works
              </Link>
              <Link
                to="/features"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                Features
              </Link>
              <Link
                to="/use-cases"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                Use Cases
              </Link>
            </div>
          </div>

          {/* Solutions Category */}
          <div className="border-t border-palegreen-100 pt-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-namnilam-900 block px-3 mb-2">
              Solutions
            </span>
            <div className="space-y-1 pl-1">
              <Link
                to="/whatsapp-ai-for-business"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                WhatsApp AI for Business
              </Link>
              <Link
                to="/whatsapp-ai-for-real-estate"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                Real Estate
              </Link>
              <Link
                to="/whatsapp-ai-for-small-business"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                Small Businesses
              </Link>
              <Link
                to="/whatsapp-ai-for-customer-support"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                Customer Support
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="border-t border-palegreen-100 pt-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-namnilam-900 block px-3 mb-2">
              Resources
            </span>
            <div className="space-y-1 pl-1">
              <Link
                to="/faq"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                FAQ
              </Link>
              <Link
                to="/about"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={closeMenus}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-palegreen-50 hover:text-namnilam-900"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              to="/app"
              onClick={closeMenus}
              className="w-full flex items-center justify-center py-2.5 rounded-xl border border-palegreen-300 text-namnilam-900 font-bold text-sm bg-palegreen-50 hover:bg-palegreen-100 transition"
            >
              Open WhatsApp Web AI
            </Link>

            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-namnilam-900 hover:bg-namnilam-950 text-white font-bold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span>Chat with Nam Nilam AI</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

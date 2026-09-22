import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Sparkles, Building2, User, Mail, Phone, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/SEOHead';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service to continue.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        fullName: fullName.trim(),
        businessName: businessName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });
      // Navigate to connect WhatsApp onboarding
      navigate('/app/connect');
    } catch (err: any) {
      setError(err?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Sign Up | Nam Nilam WhatsApp AI"
        description="Create your Nam Nilam account to connect your WhatsApp with AI and automate customer responses."
        canonicalUrl="https://wa.namnilam.com/app/signup"
      />

      <div className="min-h-screen bg-[#F1F6F3] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-gold-200 selection:text-namnilam-950">
        {/* Back Link */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-namnilam-900 hover:text-namnilam-700 transition"
          >
            ← Back to namnilam.com
          </Link>
        </div>

        {/* Brand Header */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <img
              src="/nam-nilam-logo.png"
              alt="Nam Nilam Logo"
              className="w-12 h-12 rounded-full ring-2 ring-gold-400/60 p-0.5 bg-white shadow-sm"
            />
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-namnilam-900 uppercase tracking-widest bg-palegreen-200/80 px-3 py-0.5 rounded-full mb-2">
            <Sparkles className="w-3 h-3 text-gold-600" />
            AI WhatsApp Automation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create your Nam Nilam Account
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Set up your business workspace and connect your WhatsApp with AI in 60 seconds.
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
          <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-palegreen-200/80 relative">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-namnilam-800 via-gold-400 to-namnilam-900 rounded-t-3xl" />

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Senthil Kumar"
                    className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-namnilam-800 focus:border-namnilam-800 outline-none transition"
                  />
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Business Name
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Nam Nilam Properties / Chennai Homes"
                    className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-namnilam-800 focus:border-namnilam-800 outline-none transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Business Email
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@business.com"
                    className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-namnilam-800 focus:border-namnilam-800 outline-none transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  WhatsApp Business Number
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 97876 00221"
                    className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-namnilam-800 focus:border-namnilam-800 outline-none transition"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  The WhatsApp number you want to connect with your AI assistant.
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Password (min 8 characters)
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-namnilam-800 focus:border-namnilam-800 outline-none transition"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 text-namnilam-800 focus:ring-namnilam-700 border-slate-300 rounded cursor-pointer"
                  />
                </div>
                <div className="ml-3 text-xs">
                  <label htmlFor="terms" className="text-slate-600 cursor-pointer">
                    I agree to the{' '}
                    <span className="text-namnilam-900 font-semibold underline">Terms of Service</span> and{' '}
                    <span className="text-namnilam-900 font-semibold underline">Privacy Policy</span>.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-namnilam-900 hover:bg-namnilam-950 focus:ring-2 focus:ring-offset-2 focus:ring-namnilam-900 shadow-md ring-1 ring-gold-400/50 transition active:scale-95 disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Creating Workspace...</span>
                  ) : (
                    <>
                      <span>Create Account & Connect WhatsApp</span>
                      <ArrowRight className="w-4 h-4 text-gold-300" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Existing Account Footer */}
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-600">
                Already have an account?{' '}
                <Link
                  to="/app/login"
                  className="font-bold text-namnilam-900 hover:text-namnilam-700 underline"
                >
                  Sign In to Workspace →
                </Link>
              </p>
            </div>

            {/* Security Guarantee Badge */}
            <div className="mt-6 bg-palegreen-50 border border-palegreen-200 rounded-2xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-namnilam-800 shrink-0" />
              <p className="text-[11px] text-namnilam-950">
                <strong>Bank-grade tenant security:</strong> Passwords salted & hashed with SHA-256. Multi-tenant workspace data strictly isolated.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

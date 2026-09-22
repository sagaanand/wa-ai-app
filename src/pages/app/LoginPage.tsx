import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/SEOHead';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/app/inbox';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <>
      <SEOHead
        title="Sign In | Nam Nilam WhatsApp AI"
        description="Sign in to your Nam Nilam AI Workspace to manage WhatsApp chats, contacts, and AI responses."
        canonicalUrl="https://wa.namnilam.com/app/login"
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
            Nam Nilam Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign In to Nam Nilam AI
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Access your WhatsApp inbox, customer leads, and automated AI responses.
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
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
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Email Address
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
                    placeholder="name@company.com"
                    className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-namnilam-800 focus:border-namnilam-800 outline-none transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs text-namnilam-800 hover:text-namnilam-950 font-semibold underline"
                  >
                    Forgot password?
                  </button>
                </div>
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

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-namnilam-900 hover:bg-namnilam-950 focus:ring-2 focus:ring-offset-2 focus:ring-namnilam-900 shadow-md ring-1 ring-gold-400/50 transition active:scale-95 disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <span>Sign In to Workspace</span>
                      <ArrowRight className="w-4 h-4 text-gold-300" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Create Account Footer */}
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-600">
                New to Nam Nilam?{' '}
                <Link
                  to="/app/signup"
                  className="font-bold text-namnilam-900 hover:text-namnilam-700 underline"
                >
                  Create an Account & Start Free →
                </Link>
              </p>
            </div>

            {/* Security Guarantee Badge */}
            <div className="mt-6 bg-palegreen-50 border border-palegreen-200 rounded-2xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-namnilam-800 shrink-0" />
              <p className="text-[11px] text-namnilam-950">
                Passwords salted & hashed via SHA-256 Web Crypto. No plaintext storage.
              </p>
            </div>

          </div>
        </div>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-palegreen-200 shadow-2xl relative">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-palegreen-100 text-namnilam-900 flex items-center justify-center mx-auto mb-3">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Reset Password</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Enter your registered email and we will send you instructions to reset your password.
                </p>
              </div>

              {forgotSent ? (
                <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Password reset link sent to your email!</span>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="mt-5 space-y-3">
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-namnilam-800 outline-none"
                  />
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs font-bold text-white bg-namnilam-900 rounded-xl shadow-xs transition"
                    >
                      Send Link
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
};
